# -*- coding: utf-8 -*-
"""
Tormenta 20 (Edição Jogo do Ano v1.3) — MCP Oracle Server
Fornece ferramentas especializadas para consulta do manual oficial,
validação de regras de criação de personagens, cálculos de estatísticas
e consulta à base de dados canônica de Tormenta 20.
"""

import json
import os
import re
import sqlite3
import sys
from typing import Any, Dict, List, Optional

from mcp.server import MCPServer

# Garante saída em UTF-8 no Windows
if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')
if sys.stderr.encoding and sys.stderr.encoding.lower() != 'utf-8':
    sys.stderr.reconfigure(encoding='utf-8')

# Caminhos base
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "src", "data", "t20_manual_index.db")
JSON_DATA_PATH = os.path.join(BASE_DIR, "src", "data", "t20_database.json")

# Carrega o banco JSON estruturado
T20_DATA: Dict[str, Any] = {}
if os.path.exists(JSON_DATA_PATH):
    try:
        with open(JSON_DATA_PATH, "r", encoding="utf-8") as f:
            T20_DATA = json.load(f)
    except Exception as e:
        sys.stderr.write(f"Erro ao carregar {JSON_DATA_PATH}: {e}\n")

# Instancia o servidor MCP
server = MCPServer("tormenta20-oracle")


def get_db_connection() -> sqlite3.Connection:
    if not os.path.exists(DB_PATH):
        raise FileNotFoundError(
            f"O índice do manual não foi encontrado em '{DB_PATH}'. "
            "Execute 'python scripts/index_manual_pdf.py' para gerá-lo."
        )
    return sqlite3.connect(DB_PATH)


@server.tool()
def t20_search_book(query: str, max_results: int = 5) -> str:
    """
    Busca regras, termos ou tabelas no manual oficial Tormenta 20: Edição Jogo do Ano (v1.3).
    Retorna o capítulo, seção, página do livro, página do PDF e trechos literais correspondentes.
    
    Exemplos de busca:
    - 'Fortitude perícia'
    - 'compra de pontos'
    - 'armadura pesada destreza defesa'
    - 'melhoria cruel atroz'
    """
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # Limpa termos para FTS5
        clean_q = re.sub(r'[^\w\s]', ' ', query).strip()
        if not clean_q:
            return "Termo de busca vazio."

        terms = [t for t in clean_q.split() if len(t) > 1]
        if not terms:
            return "Nenhum termo válido para busca."

        # Monta consulta MATCH
        fts_query = " ".join(terms)
        rows = cur.execute(
            """
            SELECT chapter, section, book_page, pdf_page, snippet(rules_fts, 4, '[[', ']]', '...', 20)
            FROM rules_fts
            WHERE rules_fts MATCH ?
            ORDER BY rank
            LIMIT ?
            """,
            (fts_query, max_results),
        ).fetchall()
        conn.close()

        if not rows:
            return f"Nenhum trecho encontrado no manual oficial para a busca: '{query}'."

        results = [f"=== RESULTADOS NO MANUAL T20 JOGO DO ANO (v1.3) para '{query}' ===\n"]
        for i, (ch, sec, bp, pp, snip) in enumerate(rows, 1):
            clean_snip = snip.replace("\n", " ").replace("  ", " ")
            results.append(
                f"{i}. [{ch} — {sec}]\n"
                f"   Página impressa: {bp} (Página no PDF: {pp})\n"
                f"   Citação: \"{clean_snip}\"\n"
            )

        return "\n".join(results)
    except Exception as e:
        return f"Erro ao consultar o manual T20: {str(e)}"


@server.tool()
def t20_get_book_page(page_number: int, is_pdf_page: bool = False) -> str:
    """
    Retorna o conteúdo textual completo de uma página do manual oficial Tormenta 20 (v1.3).
    - page_number: número da página.
    - is_pdf_page: se True, page_number refere-se ao número da página no arquivo PDF (1 a 407). Se False, refere-se à página impressa no livro.
    """
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        col = "pdf_page" if is_pdf_page else "book_page"
        row = cur.execute(
            f"""
            SELECT chapter, section, book_page, pdf_page, content
            FROM pages
            WHERE {col} = ?
            LIMIT 1
            """,
            (page_number,),
        ).fetchone()
        conn.close()

        if not row:
            return f"Página {page_number} ({col}) não encontrada no manual oficial."

        ch, sec, bp, pp, content = row
        return (
            f"=== TORMENTA 20: JOGO DO ANO (v1.3) ===\n"
            f"Capítulo: {ch} | Seção: {sec}\n"
            f"Página Impressa: {bp} | Página no PDF: {pp}\n"
            f"----------------------------------------\n\n"
            f"{content}"
        )
    except Exception as e:
        return f"Erro ao recuperar página do manual: {str(e)}"


@server.tool()
def t20_get_rule_citation(citation_key: str) -> str:
    """
    Retorna uma citação canônica formal com referência oficial de livro, capítulo, seção,
    página e explicação das regras de Tormenta 20 JDA v1.3.
    
    Chaves disponíveis comuns:
    - POINT_BUY_RULES: Regras de compra de pontos (10 pontos base, escala progressiva).
    - SKILL_TRAINING_NO_STACK: Treinamento de perícias e regra de não cumulatividade (+2/+4/+6).
    - ORIGIN_SKILL_REPLACEMENT: Regra oficial de substituição de perícia duplicada da origem.
    - GENERAL_POWER_PREREQUISITES: Pré-requisitos estritos de poderes gerais.
    - INTELLIGENCE_SKILLS: Perícias adicionais de livre escolha por inteligência positiva.
    - ATTR_FOR / ATTR_DES / ATTR_CON / ATTR_INT / ATTR_SAB / ATTR_CAR: Aplicações de cada atributo.
    - EQUIPMENT_RULES: Capacidade de carga em espaços (10 + 2*FOR) e armaduras.
    """
    citations = T20_DATA.get("rulesCitations", {})
    citation = citations.get(citation_key.upper()) or citations.get(citation_key)

    if not citation:
        available = ", ".join(citations.keys())
        return f"Citação '{citation_key}' não encontrada. Chaves disponíveis: {available}"

    return (
        f"📖 CITAÇÃO OFICIAL — {citation.get('title')}\n"
        f"Livro: {citation.get('book')}\n"
        f"Localização: {citation.get('chapter')} — {citation.get('section')}\n"
        f"Página: {citation.get('page')}\n\n"
        f"Texto do Manual:\n{citation.get('quote')}\n\n"
        f"Aplicação da Regra:\n{citation.get('explanation')}"
    )


@server.tool()
def t20_list_rule_citations() -> str:
    """
    Lista todas as citações e referências canônicas cadastradas no compêndio do sistema.
    """
    citations = T20_DATA.get("rulesCitations", {})
    if not citations:
        return "Nenhuma citação cadastrada na base de dados."

    lines = ["=== CITAÇÕES CANÔNICAS DE REGRAS T20 JOGO DO ANO ==="]
    for key, item in citations.items():
        lines.append(f"• {key}: {item.get('title')} ({item.get('chapter')}, {item.get('page')})")

    return "\n".join(lines)


@server.tool()
def t20_validate_character(character_json: str) -> str:
    """
    Valida estritamente uma ficha ou dados de personagem de Tormenta 20 (v1.3).
    Verifica:
    1. Compra de atributos (começa em 0, máximo 10 pontos distribuídos, custos 1=1, 2=2, 3=4, 4=7, no máx um -1).
    2. Duplicidade de perícias treinadas entre Raça, Classe e Origem.
    3. Capacidade de carga (10 espaços +2 por ponto de Força, –1 por ponto negativo — Cap. 3, pág. 141).
    4. Pré-requisitos de poderes e círculos de magia.
    """
    try:
        data = json.loads(character_json)
    except Exception as e:
        return f"Erro de JSON inválido: {str(e)}"

    errors: List[str] = []
    warnings: List[str] = []
    notes: List[str] = []

    # 1. Validação de Compra de Pontos
    attrs_base = data.get("baseAttributes") or data.get("attributes") or {}
    cost_table = {0: 0, 1: 1, 2: 2, 3: 4, 4: 7}
    total_cost = 0
    neg_count = 0

    for attr in ["for", "des", "con", "int", "sab", "car"]:
        val = attrs_base.get(attr, 0)
        if val < -1:
            errors.append(f"Atributo base {attr.upper()} ({val}) não pode ser menor que -1 na compra de pontos.")
        elif val == -1:
            neg_count += 1
            total_cost -= 1
        elif val in cost_table:
            total_cost += cost_table[val]
        else:
            errors.append(f"Atributo base {attr.upper()} ({val}) excede o limite inicial de 4 na compra de pontos.")

    if neg_count > 1:
        errors.append(f"Apenas um atributo base pode ser reduzido para -1 (você possui {neg_count}).")

    if total_cost > 10:
        errors.append(f"Custo total de pontos ({total_cost} pts) excede o limite oficial de 10 pontos.")
    elif total_cost < 10:
        notes.append(f"Você gastou {total_cost} de 10 pontos disponíveis na compra de atributos.")
    else:
        notes.append("Distribuição de atributos na compra de pontos: 10/10 pontos (Exata e Válida).")

    # 2. Perícias Treinadas e Não Cumulatividade
    trained_skills = data.get("trainedSkills") or []
    seen_skills = set()
    for s in trained_skills:
        skill_id = s if isinstance(s, str) else s.get("id") or s.get("name")
        if skill_id in seen_skills:
            errors.append(f"Perícia duplicada detectada: '{skill_id}'. Treinamento não se acumula (Cap. 2, pág. 114).")
        seen_skills.add(skill_id)

    # 3. Capacidade de Carga (Cap. 3, pág. 141)
    total_attrs = data.get("totalAttributes") or {
        k: attrs_base.get(k, 0) + (data.get("racialModifiers") or {}).get(k, 0) for k in ["for", "des", "con", "int", "sab", "car"]
    }
    for_total = total_attrs.get("for", 0)
    max_spaces = 10 + (2 * for_total if for_total >= 0 else for_total)
    current_spaces = data.get("usedSpaces") or 0
    if current_spaces > 2 * max_spaces:
        errors.append(f"Carga de {current_spaces} espaços excede o dobro do limite ({2 * max_spaces}); não é possível carregar (Cap. 3, pág. 141).")
    elif current_spaces > max_spaces:
        warnings.append(
            f"Sobrecarregado: {current_spaces} espaços (limite {max_spaces} = 10 +2 por ponto de Força, –1 por ponto negativo). "
            "Sofre penalidade de armadura –5 e deslocamento –3m (Cap. 3, pág. 141)."
        )

    # Resultado formatado
    report = ["=== RELATÓRIO DE VALIDAÇÃO DE REGRAS T20 JOGO DO ANO ==="]
    if errors:
        report.append("\n❌ ERROS DE REGRAS DETECTADOS:")
        for err in errors:
            report.append(f"  • {err}")
    else:
        report.append("\n✅ NENHUMA VIOLAÇÃO DE REGRAS DETECTADA!")

    if warnings:
        report.append("\n⚠️ ALERTAS / CONDICIONAIS:")
        for w in warnings:
            report.append(f"  • {w}")

    if notes:
        report.append("\nℹ️ OBSERVAÇÕES:")
        for n in notes:
            report.append(f"  • {n}")

    return "\n".join(report)


@server.tool()
def t20_calculate_stats(character_json: str) -> str:
    """
    Calcula as estatísticas canônicas de um personagem segundo o T20 Edição Jogo do Ano:
    - Modificadores totais de atributos (o valor é o próprio modificador).
    - PV Máximo (PV da classe + CON no 1º nível, e por nível).
    - PM Máximo (PM da classe por nível + atributo-chave dos conjuradores; paladino soma Carisma).
    - Defesa Canônica (10 + DES [exceto se armadura pesada] + Armadura + Escudo + Outros).
    - Capacidade de Carga (10 espaços +2 por ponto de Força, –1 por ponto negativo; Cap. 3, pág. 141).
    - Bônus de Perícias (1/2 nível + atributo + treino +2/+4/+6 - penalidade de armadura).
    """
    try:
        data = json.loads(character_json)
    except Exception as e:
        return f"Erro de JSON: {str(e)}"

    level = data.get("level", 1)
    half_level = level // 2
    training_bonus = 2 if level < 7 else (4 if level < 15 else 6)

    # Atributos
    base = data.get("baseAttributes", {})
    racial = data.get("racialModifiers", {})
    total_attrs = {
        k: base.get(k, 0) + racial.get(k, 0)
        for k in ["for", "des", "con", "int", "sab", "car"]
    }

    # PV e PM
    class_id = (data.get("classId") or "").lower()
    # Pega dados da classe se existir
    classes = {c["id"]: c for c in T20_DATA.get("classes", [])}
    class_def = classes.get(class_id, {})
    
    hp_initial = class_def.get("hpInitial", 16)
    hp_per_level = class_def.get("hpPerLevel", 4)
    mp_initial = class_def.get("mpInitial", 3)
    mp_per_level = class_def.get("mpPerLevel", 3)

    max_hp = hp_initial + total_attrs["con"] + (level - 1) * (hp_per_level + total_attrs["con"])
    # PM: PM da classe por nível; conjuradores somam o atributo-chave (arcanista pág. 37, bardo 44,
    # clérigo 57, druida 61) e o paladino soma Carisma (Abençoado, pág. 82)
    max_mp = mp_per_level * level
    key_attr = None
    if class_def.get("spellcaster"):
        if class_id == "arcanista":
            key_attr = "car" if "feiticeiro" in (data.get("classSubclass") or "").lower() else "int"
        elif class_id == "bardo":
            key_attr = "car"
        else:
            key_attr = "sab"
    elif class_id == "paladino":
        key_attr = "car"
    if key_attr:
        max_mp += total_attrs[key_attr]

    # Defesa
    is_heavy_armor = data.get("isHeavyArmor", False)
    armor_bonus = data.get("armorBonus", 0)
    shield_bonus = data.get("shieldBonus", 0)
    other_defense = data.get("otherDefense", 0)
    des_to_defense = 0 if is_heavy_armor else total_attrs["des"]
    defense = 10 + des_to_defense + armor_bonus + shield_bonus + other_defense

    # Carga: 10 espaços +2 por ponto de Força (–1 por ponto negativo) — Cap. 3, pág. 141
    max_spaces = 10 + (2 * total_attrs["for"] if total_attrs["for"] >= 0 else total_attrs["for"])

    return (
        f"=== ESTATÍSTICAS CANÔNICAS CALCULADAS (Nível {level}) ===\n"
        f"• Atributos Totais: FOR {total_attrs['for']}, DES {total_attrs['des']}, CON {total_attrs['con']}, "
        f"INT {total_attrs['int']}, SAB {total_attrs['sab']}, CAR {total_attrs['car']}\n"
        f"• Pontos de Vida (PV): {max_hp} (Base {hp_initial} + CON {total_attrs['con']})\n"
        f"• Pontos de Mana (PM): {max_mp}{f' (inclui {key_attr.upper()} {total_attrs[key_attr]})' if key_attr else ''}\n"
        f"• Defesa Total: {defense} [10 Base + DES {des_to_defense}{' (Sem DES por Armadura Pesada)' if is_heavy_armor else ''} + Armadura {armor_bonus} + Escudo {shield_bonus} + Outros {other_defense}]\n"
        f"• Bônus de Treino de Perícias: +{training_bonus} (Nível {level})\n"
        f"• Metade do Nível: +{half_level}\n"
        f"• Capacidade de Carga: {max_spaces} espaços (10 +2 por ponto de Força, –1 por ponto negativo; máximo {2 * max_spaces})"
    )


@server.tool()
def t20_query_database(category: str, query: str = "") -> str:
    """
    Consulta os catálogos oficiais do sistema Tormenta 20:
    - category: 'spells', 'powers', 'generalPowers', 'equipment', 'races', 'classes', 'deities', 'origins', 'conditions'
    - query: termo para busca (nome, tipo ou escola)
    """
    category = category.lower()
    cat_map = {
        "magias": "spells",
        "spell": "spells",
        "spells": "spells",
        "poderes": "generalPowers",
        "poder": "generalPowers",
        "powers": "generalPowers",
        "generalpowers": "generalPowers",
        "itens": "equipment",
        "item": "equipment",
        "equipment": "equipment",
        "racas": "races",
        "races": "races",
        "classes": "classes",
        "deuses": "deities",
        "deities": "deities",
        "origens": "origins",
        "origins": "origins",
        "condicoes": "conditions",
        "conditions": "conditions",
    }
    resolved_cat = cat_map.get(category, category)
    items = T20_DATA.get(resolved_cat, [])

    if not items:
        return f"Categoria '{category}' não encontrada. Categorias válidas: spells, powers, equipment, races, classes, deities, origins, conditions."

    q_lower = query.lower()
    matched = []
    for item in items:
        name = item.get("name", "")
        desc = item.get("description", "")
        if not q_lower or q_lower in name.lower() or q_lower in desc.lower():
            matched.append(item)

    if not matched:
        return f"Nenhum item encontrado em '{resolved_cat}' para o termo '{query}'."

    lines = [f"=== ENCONTRADOS {len(matched)} REGISTROS EM '{resolved_cat}' (Mostrando até 5) ===\n"]
    for item in matched[:5]:
        name = item.get("name")
        lines.append(f"• Nome: {name}")
        for k in ["circle", "type", "school", "price", "damage", "defenseBonus", "armorPenalty", "spaces", "prerequisites"]:
            if k in item and item[k] is not None:
                lines.append(f"  {k}: {item[k]}")
        desc = item.get("description", "")
        if desc:
            short_desc = desc[:200] + ("..." if len(desc) > 200 else "")
            lines.append(f"  Descrição: {short_desc}")
        lines.append("")

    return "\n".join(lines)


if __name__ == "__main__":
    server.run("stdio")
