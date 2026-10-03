"""Extrai blocos de texto do livro (T20 JdA v1.3) a partir de títulos conhecidos.

O índice guarda o texto de cada página com quebras de linha; títulos de poderes e
magias ocupam uma linha própria. Dado um conjunto de nomes, este módulo localiza a
linha-título de cada um e captura o texto até o próximo título conhecido.

Uso como biblioteca:  from book_extract import extract_blocks
"""
import os
import re
import sqlite3

DB = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'src', 'data', 't20_manual_index.db')

# Ruídos de diagramação que aparecem no meio do texto
_NOISE = re.compile(r'^(Capítulo (Um|Dois|Três|Quatro|Cinco|Seis|Sete|Oito|Nove)|Construção de Personagem|Perícias & Poderes|'
                    r'Poderes gerais|Equipamento|Magia|Jogando|Recompensas|\d{1,3})\s*$')


def load_lines(pdf_from, pdf_to):
    con = sqlite3.connect(DB)
    out = []
    for pdf, bp, txt in con.execute(
            'select pdf_page, book_page, content from pages where pdf_page between ? and ? order by pdf_page',
            (pdf_from, pdf_to)):
        for line in txt.split('\n'):
            s = line.strip()
            if s and not _NOISE.match(s):
                out.append((pdf, bp, s))
    return out


def _norm(s):
    return re.sub(r'\s+', ' ', s).strip().lower()


def join_text(parts):
    text = ''
    for p in parts:
        if text.endswith('-') and not text.endswith(' -'):
            text = text[:-1] + p          # hifenização de fim de linha
        elif text:
            text += ' ' + p
        else:
            text = p
    return re.sub(r'\s+', ' ', text).strip()


def extract_blocks(names, pdf_from, pdf_to, stop_titles=(), score=None):
    """Retorna {nome: {'text', 'pdf', 'page'}} para cada nome encontrado como linha-título."""
    # títulos seguidos de tabulação ("Êxtase da Loucura	 Aharadak, Nimb") viram duas linhas
    lines = []
    for pdf, bp, s in load_lines(pdf_from, pdf_to):
        if '	' in s:
            head, tail = s.split('	', 1)
            lines.append((pdf, bp, head.strip()))
            if tail.strip():
                lines.append((pdf, bp, tail.strip()))
        else:
            lines.append((pdf, bp, s))
    score = score or (lambda name, text: len(text))
    wanted = {_norm(n): n for n in names}
    stops = {_norm(n) for n in stop_titles} | set(wanted)
    starts = []
    for i, (pdf, bp, s) in enumerate(lines):
        key = _norm(s)
        if key in wanted:
            starts.append((i, wanted[key]))
        elif i + 1 < len(lines):
            # título quebrado em duas linhas ("Afinidade com" / "a Tormenta")
            key2 = _norm(s + ' ' + lines[i + 1][2])
            if key2 in wanted:
                starts.append((i + 1, wanted[key2]))
    result = {}
    for idx, (i, name) in enumerate(starts):
        parts = []
        j = i + 1
        while j < len(lines):
            if _norm(lines[j][2]) in stops:
                break
            if j + 1 < len(lines) and _norm(lines[j][2] + ' ' + lines[j + 1][2]) in stops:
                break
            parts.append(lines[j][2])
            j += 1
        text = join_text(parts)
        # Um mesmo nome aparece em tabelas-resumo e na descrição; a descrição é o bloco mais longo
        if name not in result or score(name, text) > score(name, result[name]['text']):
            result[name] = {'text': text, 'pdf': lines[i][0], 'page': lines[i][1]}
    return result


def split_prereq(text):
    """Separa 'Pré-requisito(s): ...' do fim da descrição."""
    m = re.search(r'Pré-requisitos?: (.+?)\.?\s*$', text)
    if not m:
        return text, None
    return text[:m.start()].strip(), m.group(1).strip().rstrip('.')


def strip_captions(text):
    """Remove legendas de ilustração, que o PDF repete em fragmentos lado a lado
    (ex.: "Ledd. Ele não Ledd. Ele não conhece seu conhece seu ...")."""
    toks = text.split(' ')
    drop = [False] * len(toks)
    i = 0
    while i < len(toks):
        hit = False
        for k in range(6, 0, -1):
            if i + 2 * k <= len(toks) and toks[i:i + k] == toks[i + k:i + 2 * k] and any(len(t) > 2 for t in toks[i:i + k]):
                for j in range(i, i + 2 * k):
                    drop[j] = True
                i += 2 * k
                hit = True
                break
        if not hit:
            i += 1
    return re.sub(r'\s+', ' ', ' '.join(t for t, d in zip(toks, drop) if not d)).strip()
