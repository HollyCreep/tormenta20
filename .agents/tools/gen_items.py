"""Reconstrói os itens não bélicos de src/data/equipment.ts a partir da Tabela 3-6: Itens Gerais
(T20 JdA v1.3, Cap. 3, págs. 156–157) e das descrições das seções (págs. 157–163).
A tabela tem duas colunas; o texto vem linha a linha (esquerda, direita), então cada célula
(cabeçalho ou item) alterna de coluna. Uso: python gen_items.py <dir-audit> [--write]
"""
import json
import os
import re
import sqlite3
import sys
import unicodedata

sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from book_extract import DB, load_lines, join_text, strip_captions  # noqa: E402

W = sys.argv[1]
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
app = json.load(open(os.path.join(W, 'equipment.json'), encoding='utf-8'))


def norm(s):
    s = unicodedata.normalize('NFD', s.lower())
    return re.sub(r'[^a-z0-9]+', ' ', ''.join(c for c in s if unicodedata.category(c) != 'Mn')).strip()


con = sqlite3.connect(DB)
raw = re.sub(r'\s+', ' ', ' '.join(r[0] for r in con.execute('select content from pages where pdf_page between 162 and 163 order by pdf_page')))
a = raw.find('Tabela 3-6: Itens Gerais')
b = raw.find('sabem onde vão passar a noite', a)
tab = raw[a:b]
tab = tab.replace('Tabela 3-6: Itens Gerais (Continuação)', '').replace('Tabela 3-6: Itens Gerais', '')
tab = re.sub(r'Item Preço Espaços', ' ', tab)
tab = re.sub(r' \d{3} Equipamento ', ' ', tab)

HEADERS = {
    'Equipamento de Aventura': 'item_geral', 'Ferramentas': 'ferramenta', 'Vestuário': 'vestuario',
    'Vestuário (continuação)': 'vestuario', 'Esotéricos': 'esoterico', 'Alquímicos — Preparados': 'alquimia',
    'Alquímicos — Catalisadores': 'alquimia', 'Alquímicos — Catalisadores (continuação)': 'alquimia',
    'Alquímicos — Venenos': 'alquimia', 'Alimentação': 'alimentacao', 'Animais': 'animal', 'Veículos': 'veiculo',
    'Serviços': 'servico',
}
hdr_alt = '|'.join(sorted((re.escape(h) for h in HEADERS), key=len, reverse=True))
cell = re.compile(r'(' + hdr_alt + r')|([A-ZÀ-Ú<][^$]*?) (T\$ [\d.,]+(?: por km)?) (\d+(?:,\d)?|—)')
cats = ['item_geral', 'vestuario']
slot = 0
items = []
for m in cell.finditer(tab):
    if m.group(1):
        cats[slot] = HEADERS[m.group(1)]
    else:
        name = m.group(2).strip()
        sub = re.match(r'(Estadia \(por noite\) |Magia )?(.*)', name).group(2)
        items.append({'name': sub, 'price': m.group(3), 'spaces': m.group(4), 'category': cats[slot]})
    slot = 1 - slot

for it in items:
    print(it['category'][:10].ljust(10), '|', it['name'], '|', it['price'], '|', it['spaces'])
json.dump(items, open(os.path.join(W, 'book_items.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


# ---- categorias conforme os cabeçalhos da Tabela 3-6 (págs. 156–157)
CATEGORY_OF = {}
for cat, names in {
    'item_geral': ['Água benta', 'Algemas', 'Arpéu', 'Bandoleira de poções', 'Barraca', 'Corda', 'Espelho', 'Lampião', 'Mochila',
                   'Mochila de aventureiro', 'Óleo', 'Organizador de pergaminhos', 'Pé de cabra', 'Saco de dormir',
                   'Símbolo sagrado', 'Tocha', 'Vara de madeira (3m)'],
    'ferramenta': ['Alaúde élfico', 'Coleção de livros', 'Equipamento de viagem', 'Estojo de disfarces', 'Flauta mística', 'Gazua',
                   'Instrumentos de <ofício>', 'Instrumento musical', 'Luneta', 'Maleta de medicamentos', 'Sela', 'Tambor das profundezas'],
    'vestuario': ['Andrajos de aldeão', 'Bandana', 'Botas reforçadas', 'Camisa bufante', 'Capa esvoaçante', 'Capa pesada', 'Casaco longo',
                  'Chapéu arcano', 'Enfeite de elmo', 'Farrapos de ermitão', 'Gorro de ervas', 'Luva de pelica', 'Manopla',
                  'Manto camuflado', 'Manto eclesiástico', 'Robe místico', 'Sapatos de camurça', 'Tabardo', 'Traje da corte',
                  'Traje de viajante', 'Veste de seda'],
    'esoterico': ['Bolsa de pó', 'Cajado arcano', 'Cetro elemental', 'Costela de lich', 'Dedo de ente', 'Luva de ferro',
                  'Medalhão de prata', 'Orbe cristalino', 'Tomo hermético', 'Varinha arcana'],
    'alquimia': ['Ácido', 'Bálsamo restaurador', 'Bomba', 'Cosmético', 'Elixir do amor', 'Essência de mana', 'Fogo alquímico',
                 'Pó do desaparecimento', 'Baga-de-fogo', 'Dente-de-dragão', 'Essência abissal', 'Líquen lilás', 'Musgo púrpura',
                 'Ossos de monstro', 'Pó de cristal', 'Pó de giz', 'Ramo verdejante', 'Saco de sal', 'Seixo de âmbar',
                 'Terra de cemitério', 'Beladona', 'Bruma sonolenta', 'Cicuta', 'Essência de sombra', 'Névoa tóxica',
                 'Peçonha comum', 'Peçonha concentrada', 'Peçonha potente', 'Pó de lich', 'Riso de Nimb'],
    'alimentacao': ['Batata valkariana', 'Gorad quente', 'Macarrão de Yuvalin', 'Prato do aventureiro', 'Ração de viagem (por dia)',
                    'Refeição comum', 'Sopa de peixe'],
    'animal': ['Alforje', 'Cão de caça', 'Cavalo', 'Cavalo de guerra', 'Pônei', 'Pônei de guerra', 'Trobo'],
    'veiculo': ['Balão goblin', 'Carroça', 'Carruagem', 'Canoa', 'Veleiro'],
}.items():
    for n in names:
        CATEGORY_OF[n] = cat

# ids antigos preservados (fichas salvas e kit inicial)
KEEP_ID = {'Gazua': 'kit_ladrao', 'Barraca': 'tenda', 'Estojo de disfarces': 'kit_disfarce', 'Instrumento musical': 'instrumento_musical',
           'Lampião': 'lanterna', 'Óleo': 'oleo_frasco', 'Espelho': 'espelho_metal', 'Luva de pelica': 'luvas_pelica',
           'Corda': 'corda', 'Algemas': 'algemas', 'Tocha': 'tocha', 'Água benta': 'agua_benta'}

desc_text = strip_captions(join_text([l[2] for l in load_lines(160, 172)]))
all_names = sorted(CATEGORY_OF, key=len, reverse=True)


def base_name(n):
    return re.sub(r'\s*\(.*\)', '', n).replace('<ofício>', '').strip()


def describe(name):
    base = base_name(name)
    m = re.search(r'(?<![\w])' + re.escape(base) + r'\. (.+)', desc_text, re.I)
    if not m:
        return ''
    rest = m.group(1)
    cut = len(rest)
    for other in all_names:
        ob = base_name(other)
        if norm(ob) == norm(base):
            continue
        j = re.search(r' ' + re.escape(ob) + r'\. ', rest, re.I)
        if j:
            cut = min(cut, j.start())
    for marker in (' Ferramentas Itens desta', ' Esotéricos ', ' Alquímicos ', ' Alimentação ', ' Animais ', ' Veículos ', ' Serviços ', ' Capítulo Três'):
        j = rest.find(marker)
        if 0 < j < cut:
            cut = j
    return rest[:cut].strip()


# Textos que o extrator não separa sozinho (conferidos no livro, págs. 157–161)
DESC_FIX = {
    'Instrumentos de <ofício>': 'Existe uma versão deste item para cada perícia de Ofício. Por exemplo, martelo, pregos e serrote para Ofício (carpinteiro), pergaminhos em branco, tinta e pena para Ofício (escriba) e assim por diante. Um personagem sem os instrumentos de seu Ofício sofre –5 nessa perícia.',
    'Cavalo de guerra': 'Cavalos sem treinamento se assustam facilmente, sendo necessário um teste de Cavalgar (CD 20) por rodada para permanecer montado durante um combate. Cavalos de guerra dispensam esse teste.',
    'Pônei de guerra': 'Pode ser usado como parceiro montaria. Cavalos sem treinamento se assustam facilmente, sendo necessário um teste de Cavalgar (CD 20) por rodada para permanecer montado durante um combate. Cavalos de guerra dispensam esse teste.',
    'Pônei': 'A montaria mais comum entre raças Pequenas. Pode ser usado como parceiro montaria.',
    'Peçonha comum': 'Veneno típico, extraído de animais ou plantas tóxicas. Contato, perde 1d12 PV.',
}

if '--write' in sys.argv:
    book = {it['name']: it for it in items if it['name'] in CATEGORY_OF}
    missing = [n for n in CATEGORY_OF if n not in book]
    if missing:
        print('!! não lidos da tabela:', missing)
    app_by = {norm(a['name']): a for a in app}
    weapons = [a for a in app if a['category'].startswith(('arma', 'armadura', 'escudo')) or '(20)' in a['name']]
    out = list(weapons)
    used = set()
    for name, cat in CATEGORY_OF.items():
        it = book.get(name)
        if not it:
            continue
        sp = 0 if it['spaces'] == '—' else float(it['spaces'].replace(',', '.'))
        sp = int(sp) if sp == int(sp) else sp
        old = app_by.get(norm(name))
        iid = KEEP_ID.get(name) or (old['id'] if old else re.sub(r'\s+', '_', norm(name.replace('<ofício>', 'oficio'))))
        used.add(iid)
        d = DESC_FIX.get(name) or describe(name) or (old or {}).get('description', '')
        d = d.split(' Instrumentos de <Ofício>')[0].split(' Regras de Venenos')[0].strip()
        out.append({'id': iid, 'name': name.replace('<ofício>', 'ofício'), 'category': cat, 'price': it['price'], 'spaces': sp,
                    'description': d})
    # instrumentos de ofício específicos usados pelo kit inicial (mesmo preço e espaço da Tabela 3-6)
    for kid, label in (('kit_oficio_alquimia', 'Instrumentos de ofício (alquimista)'), ('kit_oficio_armeiro', 'Instrumentos de ofício (armeiro)')):
        out.append({'id': kid, 'name': label, 'category': 'ferramenta', 'price': 'T$ 30', 'spaces': 1,
                    'description': DESC_FIX['Instrumentos de <ofício>']})
        used.add(kid)
    header = ("import { EquipmentItem } from '../types/rules';\n\n/**\n"
              " * Equipamento — T20 JdA v1.3, Capítulo 3. Armas (Tabela 3-3, págs. 144–145), munições (Tabela 3-4),\n"
              " * armaduras e escudos (Tabela 3-5, pág. 153) e itens gerais (Tabela 3-6, págs. 156–157), gerados por\n"
              " * .agents/tools/gen_equipment.py e .agents/tools/gen_items.py a partir do texto do livro.\n */\n"
              "export const EQUIPMENT_LIST: EquipmentItem[] = ")
    open(os.path.join(ROOT, 'src', 'data', 'equipment.ts'), 'w', encoding='utf-8').write(header + json.dumps(out, ensure_ascii=False, indent=2) + ';\n')
    removed = [a['name'] for a in app if a not in weapons and a['id'] not in used]
    print('escrito', len(out), '| removidos (fora da Tabela 3-6):', removed)
