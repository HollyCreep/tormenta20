"""Reconstrói os encantos de armas e de armaduras/escudos de src/data/itemModifiers.ts a partir do livro
(T20 JdA v1.3, Cap. 8, Tabelas 8-8 e 8-10 e descrições, págs. 334–340).
Uso: python gen_enchantments.py <mods.json>
"""
import json
import os
import re
import sys
import unicodedata

sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from book_extract import load_lines, join_text, strip_captions  # noqa: E402

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
mods = json.load(open(sys.argv[1], encoding='utf-8'))
text = strip_captions(join_text([l[2] for l in load_lines(338, 346)]))

WEAPON = ['Ameaçadora', 'Anticriatura', 'Arremesso', 'Assassina', 'Caçadora', 'Congelante', 'Conjuradora', 'Corrosiva', 'Dançarina',
          'Defensora', 'Destruidora', 'Dilacerante', 'Drenante', 'Elétrica', 'Energética', 'Excruciante', 'Flamejante', 'Formidável',
          'Lancinante', 'Magnífica', 'Piedosa', 'Profana', 'Sagrada', 'Sanguinária', 'Trovejante', 'Tumular', 'Veloz', 'Venenosa']
ARMOR = ['Abascanto', 'Abençoado', 'Acrobático', 'Alado', 'Animado', 'Assustador', 'Cáustica', 'Defensor', 'Escorregadio', 'Esmagador',
         'Fantasmagórico', 'Fortificado', 'Gélido', 'Guardião', 'Hipnótico', 'Ilusório', 'Incandescente', 'Invulnerável', 'Opaco',
         'Protetor', 'Refletor', 'Relampejante', 'Reluzente', 'Sombrio', 'Zeloso']
DOUBLE = {'Energética', 'Lancinante', 'Magnífica', 'Guardião'}  # "*Conta como dois encantos" (Tabelas 8-8 e 8-10)
SHIELD_ONLY = {'Animado', 'Esmagador'}
EFFECTS = {'Formidável': {'attackBonus': 2, 'damageBonus': 2}, 'Magnífica': {'attackBonus': 4, 'damageBonus': 4},
           'Defensora': {'customText': '+2 na Defesa'}, 'Defensor': {'defenseBonus': 2}, 'Guardião': {'defenseBonus': 4},
           'Protetor': {'resistanceBonus': 2}}


def slug(s):
    s = unicodedata.normalize('NFD', s.lower())
    return re.sub(r'[^a-z0-9]+', '_', ''.join(c for c in s if unicodedata.category(c) != 'Mn')).strip('_')


def describe(name, group):
    # a descrição aparece depois da tabela: "Nome. texto"
    hits = [m for m in re.finditer(r'(?<![\w])' + re.escape(name) + r'\. ', text)]
    if not hits:
        return '', None
    # Itens específicos citam encantos ("Esta espada longa formidável..."); a descrição do encanto
    # de arma começa tipicamente com "A arma"
    pref = [h for h in hits if text[h.end():h.end() + 6] == 'A arma'] if group == 'arma' else []
    m = pref[0] if pref else hits[-1]
    rest = text[m.end():]
    cut = len(rest)
    for other in WEAPON + ARMOR:
        if other == name:
            continue
        j = re.search(r' ' + re.escape(other) + r'\. ', rest)
        if j:
            cut = min(cut, j.start())
    for marker in (' Tabela 8-', ' Armas Específicas', ' Armaduras Específicas', ' Encantos de '):
        j = rest.find(marker)
        if 0 < j < cut:
            cut = j
    d = re.sub(r'\s+e$', '', rest[:cut].strip())
    pre = re.search(r'Pré-requisito: (.+?)\.?$', d)
    if pre:
        d = d[:pre.start()].strip()
    return d, (pre.group(1) if pre else None)


old_by = {m['name']: m for m in mods if m['type'] == 'encanto'}
out_ench = []
for group, names in (('arma', WEAPON), ('armadura', ARMOR)):
    for n in names:
        d, pre = describe(n, group)
        old = old_by.get(n)
        rec = {'id': (old or {}).get('id') or f'enc_{slug(n)}', 'name': n, 'type': 'encanto',
               'targetCategories': ['escudo'] if n in SHIELD_ONLY else (['arma'] if group == 'arma' else ['armadura', 'escudo']),
               'description': d or (old or {}).get('description', ''), 'effect': EFFECTS.get(n, (old or {}).get('effect', {}))}
        if n in DOUBLE:
            rec['countsAs'] = 2
        if pre:
            rec['requirementText'] = f'Pré-requisito: {pre}'
        if not d:
            print('!! sem descrição', n)
        out_ench.append(rec)

out = [m for m in mods if m['type'] != 'encanto'] + out_ench
src_path = os.path.join(ROOT, 'src', 'data', 'itemModifiers.ts')
src = open(src_path, encoding='utf-8').read()
a = src.index('export const ITEM_MODIFIERS_LIST')
st = src.index('= [', a) + 2
depth, e = 0, st
while e < len(src):
    if src[e] == '[':
        depth += 1
    elif src[e] == ']':
        depth -= 1
        if depth == 0:
            break
    e += 1
src = src[:st] + json.dumps(out, ensure_ascii=False, indent=2) + src[e + 1:]
open(src_path, 'w', encoding='utf-8').write(src)
print('encantos', len(out_ench), '| removidos:', [n for n in old_by if n not in WEAPON + ARMOR])
for r in out_ench:
    print(' ', r['name'], r.get('countsAs', ''), r.get('requirementText', ''), '::', r['description'][:90])
