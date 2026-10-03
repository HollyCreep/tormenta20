"""Gera armas, munições, armaduras e escudos de src/data/equipment.ts a partir das Tabelas 3-3
(Armas), 3-4 (Munições) e 3-5 (Armaduras & Escudos) do livro (T20 JdA v1.3, Cap. 3, págs. 144–153).
Os demais itens (gerais, esotéricos, alquimia, vestuário...) são conferidos contra a Tabela 3-6.
Uso: python gen_equipment.py <dir-audit> [--write]
"""
import json
import os
import re
import sys
import unicodedata

sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from book_extract import load_lines, join_text, strip_captions  # noqa: E402

W = sys.argv[1]
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
app = json.load(open(os.path.join(W, 'equipment.json'), encoding='utf-8'))
by_name = {}


def norm(s):
    s = unicodedata.normalize('NFD', s.lower())
    return re.sub(r'[^a-z0-9]+', ' ', ''.join(c for c in s if unicodedata.category(c) != 'Mn')).strip()


for a in app:
    by_name[norm(a['name'])] = a

import sqlite3
from book_extract import DB
_con = sqlite3.connect(DB)
# tabelas: texto bruto (load_lines descarta linhas numéricas, que aqui são críticos e espaços)
text = re.sub(r'\s+', ' ', ' '.join(r[0] for r in _con.execute(
    'select content from pages where pdf_page between 148 and 160 order by pdf_page')))
t3 = text[text.find('Tabela 3-3: Armas'):]
t3 = t3[:t3.find('Tabela 3-4')] if 'Tabela 3-4' in t3 else t3[:6000]

CAT = {'Armas Simples': 'arma_simples', 'Armas Marciais': 'arma_marcial', 'Armas Exóticas': 'arma_exotica', 'Armas de Fogo': 'arma_fogo'}
SUB = {'Leves': 'leves', 'Leve': 'distancia', 'Uma Mão': 'uma_mao', 'Duas Mãos': 'duas_maos'}
TYPES = {'Perfuração': 'Perfuração', 'Corte': 'Corte', 'Impacto': 'Impacto', 'Corte/perfuração': 'Corte/Perfuração'}

tokens = re.split(r'(Armas Simples|Armas Marciais|Armas Exóticas|Armas de Fogo|Corpo a Corpo — Leves|Corpo a Corpo — Uma Mão|'
                  r'Corpo a Corpo — Duas Mãos|Ataque à Distância — Uma Mão|Ataque à Distância — Duas Mãos|Ataque à Distância — Leve)', t3)
cat, sub = None, None
weapons, ammo = [], []
row = re.compile(r'([A-ZÀ-Ú][a-zà-úA-Z ]+?(?: \(20\))?) (T\$ [\d.,]+|—) (\d+d\d+(?:/\d+d\d+)?|—) (\d+(?:/x\d)?|x\d|—) (Curto|Médio|Longo|—) '
                 r'(Perfuração|Corte/perfuração|Corte|Impacto|—) (\d)')
for tok in tokens:
    tok = tok.strip()
    if tok in CAT:
        cat = CAT[tok]
        continue
    m = re.match(r'(Corpo a Corpo|Ataque à Distância) — (.+)', tok)
    if m:
        sub = 'distancia' if m.group(1) == 'Ataque à Distância' else SUB[m.group(2)]
        continue
    for r in row.finditer(tok):
        name, price, dmg, crit, rng, typ, sp = r.groups()
        name = name.replace('Preço Dano Crítico Alcance Tipo Espaços', '').strip()
        rec = {'name': name, 'price': 'T$ 0' if price == '—' else price, 'damage': dmg if dmg != '—' else '-',
               'critical': crit if crit != '—' else '-', 'range': rng if rng != '—' else None,
               'damageType': typ if typ != '—' else None, 'spaces': int(sp), 'category': cat, 'subcategory': sub}
        (ammo if '(20)' in name else weapons).append(rec)

# armaduras e escudos (Tabela 3-5)
t5 = text[text.find('Tabela 3-5: Armaduras & Escudos'):]
armors = []
grp = None
for m in re.finditer(r'(Armaduras Leves|Armaduras Pesadas|Escudos)|([A-ZÀ-Ú][a-zà-ú ]+?) (T\$ [\d.]+) \+(\d+) ([–-]?\d) (\d)', t5[:1500]):
    if m.group(1):
        grp = {'Armaduras Leves': 'armadura_leve', 'Armaduras Pesadas': 'armadura_pesada', 'Escudos': 'escudo'}[m.group(1)]
        continue
    name, price, defb, pen, sp = m.group(2).strip(), m.group(3), int(m.group(4)), int(m.group(5).replace('–', '-')), int(m.group(6))
    armors.append({'name': name, 'price': price, 'defenseBonus': defb, 'armorPenalty': pen, 'spaces': sp, 'category': grp})

# descrições: "Nome. texto" nas páginas de armas (146–149) e armaduras (152–153)
desc_text = strip_captions(join_text([l[2] for l in load_lines(150, 160)]))


def describe(name):
    m = re.search(r'(?<![\w])' + re.escape(name) + r'\. (.+?)(?= [A-ZÀ-Ú][a-zà-ú]+(?: [a-zà-ú]+)?(?: [A-ZÀ-Ú]?[a-zà-ú]+)?\. [A-ZÀ-Ú]|$)', desc_text, re.I)
    return m.group(1).strip() if m else None


print('armas', len(weapons), 'munições', len(ammo), 'armaduras/escudos', len(armors))
issues = []
for w in weapons + armors:
    a = by_name.get(norm(w['name']))
    if not a:
        issues.append(('NOVO', w['name']))
        continue
    for f in ('price', 'damage', 'critical', 'range', 'spaces', 'category', 'defenseBonus', 'armorPenalty'):
        if f in w and w[f] is not None and str(a.get(f)) != str(w[f]):
            issues.append((w['name'], f, a.get(f), w[f]))
app_weapons = [a for a in app if a['category'].startswith(('arma', 'armadura', 'escudo')) and 'golpe' not in norm(a['name'])]
book_names = {norm(w['name']) for w in weapons + armors}
for a in app_weapons:
    if norm(a['name']) not in book_names:
        issues.append(('FORA DO LIVRO', a['name'], a['category']))
for i in issues:
    print(' ', i)
json.dump({'weapons': weapons, 'ammo': ammo, 'armors': armors}, open(os.path.join(W, 'book_equipment.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

if '--write' in sys.argv:
    REMOVE = {'foice grande', 'adaga taurica', 'katar', 'nunchaku', 'espada de duas laminas', 'escudo leve golpe'}
    NEW_IDS = {'gadanho': 'gadanho', 'marreta': 'marreta', 'katana': 'katana', 'machado anao': 'machado_anao'}
    book_rows = {norm(r['name']): r for r in weapons + armors + ammo}
    out = []
    for a in app:
        key = norm(a['name'])
        if key in REMOVE:
            continue
        r = book_rows.pop(key, None)
        if r:
            merged = dict(a)
            for f in ('price', 'damage', 'critical', 'damageType', 'spaces', 'category', 'subcategory', 'defenseBonus', 'armorPenalty'):
                if f in r and r[f] is not None and not ('(20)' in r['name'] and f in ('category', 'subcategory')):
                    merged[f] = r[f]
            if 'range' in r:
                if r['range']:
                    merged['range'] = r['range']
                else:
                    merged.pop('range', None)
            out.append(merged)
        else:
            out.append(a)
    for key, r in book_rows.items():
        if '(20)' in r['name']:
            continue
        rec = {'id': NEW_IDS.get(key, re.sub(r'\s+', '_', key)), 'name': r['name'], 'category': r['category'],
               'subcategory': r['subcategory'], 'price': r['price'], 'damage': r['damage'], 'critical': r['critical'],
               'damageType': r['damageType'], 'spaces': r['spaces'], 'description': describe(r['name']) or ''}
        if r.get('range'):
            rec['range'] = r['range']
        out.append(rec)
        print('adicionado', rec['name'], '|', rec['description'][:80])
    header = '''import { EquipmentItem } from '../types/rules';

/**
 * Equipamento — T20 JdA v1.3, Capítulo 3. Armas (Tabela 3-3, págs. 144–145), munições (Tabela 3-4),
 * armaduras e escudos (Tabela 3-5, pág. 153) conferidos por .agents/tools/gen_equipment.py.
 */
export const EQUIPMENT_LIST: EquipmentItem[] = '''
    open(os.path.join(ROOT, 'src', 'data', 'equipment.ts'), 'w', encoding='utf-8').write(header + json.dumps(out, ensure_ascii=False, indent=2) + ';\n')
    print('escrito', len(out))
