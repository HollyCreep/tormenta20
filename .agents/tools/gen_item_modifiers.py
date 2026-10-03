"""Reconstrói melhorias e materiais especiais de src/data/itemModifiers.ts a partir do livro
(T20 JdA v1.3, Cap. 3, págs. 164–167: Tabela 3-8, descrições e Tabela 3-9). Os encantos (Cap. 8)
são mantidos. Uso: python gen_item_modifiers.py <mods.json>
"""
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from book_extract import load_lines, join_text, strip_captions  # noqa: E402

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
mods = json.load(open(sys.argv[1], encoding='utf-8'))
text = strip_captions(join_text([l[2] for l in load_lines(169, 174)]))

# (id, nome no livro, categorias, efeito, pré-requisito, incompatível)
IMPROVEMENTS = [
    ('certeira', 'Certeira', ['arma'], {'attackBonus': 1}, None, None),
    ('pungente', 'Pungente', ['arma'], {'attackBonus': 2}, 'Certeira', None),
    ('cruel', 'Cruel', ['arma'], {'damageBonus': 1}, None, None),
    ('atroz', 'Atroz', ['arma'], {'damageBonus': 2}, 'Cruel', None),
    ('equilibrada', 'Equilibrada', ['arma'], {'customText': '+2 em testes de manobras'}, None, None),
    ('harmonizada', 'Harmonizada (Arma)', ['arma'], {'customText': 'Uma habilidade de ataque escolhida custa –1 PM com esta arma'}, 'outra melhoria qualquer', None),
    ('injecao_alquimica', 'Injeção Alquímica', ['arma'], {'customText': 'Libera um preparado ao acertar (2 doses)'}, None, None),
    ('macica', 'Maciça', ['arma'], {'critMultiplierBonus': 1}, None, ['precisa']),
    ('mira_telescopica', 'Mira Telescópica', ['arma'], {'rangeStepBonus': 1}, None, None),
    ('precisa', 'Precisa', ['arma'], {'critThreatBonus': 1}, None, ['macica']),
    ('ajustada', 'Ajustada', ['armadura', 'escudo'], {'armorPenaltyBonus': 1}, None, None),
    ('sob_medida', 'Sob Medida', ['armadura', 'escudo'], {'armorPenaltyBonus': 2}, 'Ajustada', None),
    ('delicada', 'Delicada', ['armadura_pesada'], {'customText': 'Aplica 1 ponto de Destreza na Defesa'}, None, ['reforcada']),
    ('espinhosa', 'Espinhosa (Armadura)', ['armadura'], {'customText': 'Causa dano de perfuração igual à Força ao agarrar ou ser agarrado'}, None, None),
    ('espinhoso', 'Espinhoso (Escudo)', ['escudo'], {'customText': 'Dano do ataque com escudo +1 passo'}, None, None),
    ('polida', 'Polida', ['armadura', 'escudo'], {'customText': '+5 na Defesa na primeira rodada (ambientes iluminados)'}, None, None),
    ('reforcada', 'Reforçada', ['armadura', 'escudo'], {'defenseBonus': 1, 'armorPenaltyBonus': -1}, None, ['delicada']),
    ('selada', 'Selada', ['armadura_pesada'], {'resistanceBonus': 1}, None, None),
    ('canalizador', 'Canalizador', ['esoterico'], {'maxMpBonus': 1}, None, None),
    ('energetico', 'Energético', ['esoterico'], {'customText': 'Magias que causam dano causam +1d6 do mesmo tipo'}, None, None),
    ('harmonizado', 'Harmonizado (Esotérico)', ['esoterico'], {'customText': 'Uma magia escolhida custa –1 PM'}, None, None),
    ('poderoso', 'Poderoso', ['esoterico'], {'customText': '+1 na CD de suas magias'}, None, None),
    ('vigilante', 'Vigilante', ['esoterico'], {'customText': '+2 na Defesa do usuário'}, None, None),
    ('aprimorado', 'Aprimorado', ['ferramenta', 'vestuario'], {'customText': '+1 na perícia que o item modifica'}, None, None),
    ('banhado_ouro', 'Banhado a Ouro', ['qualquer'], {'skillBonus': {'skillName': 'Diplomacia', 'bonus': 2}}, None, None),
    ('cravejado_gemas', 'Cravejado de Gemas', ['qualquer'], {'skillBonus': {'skillName': 'Enganação', 'bonus': 2}}, None, None),
    ('discreto', 'Discreto', ['qualquer'], {'spacesModifier': -1, 'customText': '+5 em Ladinagem para ocultar'}, None, None),
    ('macabro', 'Macabro', ['qualquer'], {'customText': '+2 em Intimidação, –2 em Diplomacia'}, None, None),
]
# Tabela 3-9: Aço-Rubi, Adamante, Gelo Eterno, Madeira Tollon, Matéria Vermelha, Mitral
MATERIAL_PRICES = {
    'aco_rubi': {'arma': 6000, 'armadura_leve': 3000, 'armadura_pesada': 6000, 'escudo': 3000, 'esoterico': 6000},
    'adamante': {'arma': 3000, 'armadura_leve': 6000, 'armadura_pesada': 18000, 'escudo': 6000, 'esoterico': 3000},
    'gelo_eterno': {'arma': 600, 'armadura_leve': 1500, 'armadura_pesada': 3000, 'escudo': 1500, 'esoterico': 3000},
    'madeira_tollon': {'arma': 1500, 'escudo': 1500, 'esoterico': 1500},
    'materia_vermelha': {'arma': 1500, 'armadura_leve': 6000, 'armadura_pesada': 18000, 'escudo': 6000, 'esoterico': 3000},
    'mitral': {'arma': 1500, 'armadura_leve': 1500, 'armadura_pesada': 12000, 'escudo': 1500, 'esoterico': 3000},
}
MATERIAL_NAMES = {'aco_rubi': 'Aço-Rubi', 'adamante': 'Adamante', 'gelo_eterno': 'Gelo Eterno', 'madeira_tollon': 'Madeira Tollon',
                  'materia_vermelha': 'Matéria Vermelha', 'mitral': 'Mitral'}
all_heads = [n for _, n, *_ in IMPROVEMENTS] + list(MATERIAL_NAMES.values()) + ['Material Especial']


def describe(name, material=False):
    m = re.search(re.escape(name) + (r' (?=[A-ZÀ-Ú])' if material else r'\. '), text)
    if not m:
        return ''
    rest = text[m.end():]
    cut = len(rest)
    for other in all_heads:
        if other == name:
            continue
        j = re.search(r' ' + re.escape(other) + (r' (?=[A-ZÀ-Ú][a-zà-ú]+ )' if other in MATERIAL_NAMES.values() else r'\. '), rest)
        if j:
            cut = min(cut, j.start())
    for marker in (' Tabela 3-', ' Itens Superiores', ' Materiais Especiais Armas'):
        j = rest.find(marker)
        if 0 < j < cut:
            cut = j
    d = rest[:cut].strip()
    return re.sub(r'\s*Pré-requisito:\s*$', '', d)


out = []
for mid, name, cats, eff, pre, inc in IMPROVEMENTS:
    rec = {'id': mid, 'name': re.sub(r' \((Arma|Esotérico|Armadura|Escudo)\)', '', name), 'type': 'melhoria', 'targetCategories': cats,
           'description': describe(name), 'effect': eff}
    if pre:
        rec['requirementText'] = f'Pré-requisito: {pre}'
    if inc:
        rec['incompatibleWith'] = inc
    if not rec['description']:
        print('!! sem descrição', name)
    out.append(rec)
for mid, name in MATERIAL_NAMES.items():
    prices = MATERIAL_PRICES[mid]
    cats = [c for c in ('arma', 'armadura_leve', 'armadura_pesada', 'escudo', 'esoterico') if c in prices]
    rec = {'id': mid, 'name': name, 'type': 'material_especial', 'targetCategories': cats, 'description': describe(name, True),
           'effect': {}, 'priceByItemType': prices}
    if not rec['description']:
        print('!! sem descrição', name)
    out.append(rec)
out += [m for m in mods if m['type'] == 'encanto']

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
print('melhorias', len(IMPROVEMENTS), 'materiais', len(MATERIAL_NAMES), 'encantos', len([m for m in mods if m['type'] == 'encanto']))
