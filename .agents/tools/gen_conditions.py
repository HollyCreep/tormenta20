"""Gera src/data/conditions.ts a partir do Apêndice: Lista de Condições (T20 JdA v1.3, págs. 394–395)."""
import json
import os
import re
import sys
import unicodedata

sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from book_extract import DB  # noqa: E402
import sqlite3  # noqa: E402

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
con = sqlite3.connect(DB)
t = re.sub(r'\s+', ' ', ' '.join(r[0] for r in con.execute('select content from pages where pdf_page between 400 and 401 order by pdf_page')))
t = re.sub(r"([a-zà-ú])- ([a-zà-ú])", lambda m: m.group(1) + m.group(2), t)  # hifenização de fim de linha
# remove legendas e numeração das páginas
t = re.sub(r'Cegueira, envenenamento, petrificação, medo\. ', '', t)
t = re.sub(r'Aventureiros enfrentam todo tipo de situação adversa ', '', t)
t = re.sub(r' Lista de Condições \d{3} Apêndice ', ' ', t)
t = re.sub(r' \d{3}$', '', t.strip())

NAMES = ['Abalado', 'Agarrado', 'Alquebrado', 'Apavorado', 'Atordoado', 'Caído', 'Cego', 'Confuso', 'Debilitado', 'Desprevenido',
         'Doente', 'Em Chamas', 'Enfeitiçado', 'Enjoado', 'Enredado', 'Envenenado', 'Esmorecido', 'Exausto', 'Fascinado', 'Fatigado',
         'Fraco', 'Frustrado', 'Imóvel', 'Inconsciente', 'Indefeso', 'Lento', 'Ofuscado', 'Paralisado', 'Pasmo', 'Petrificado',
         'Sangrando', 'Sobrecarregado', 'Surdo', 'Surpreendido', 'Vulnerável']
TYPES = ['Medo', 'Mental', 'Movimento', 'Sentidos', 'Metabolismo', 'Cansaço', 'Veneno', 'Metamorfose']


def slug(s):
    s = unicodedata.normalize('NFD', s.lower())
    return re.sub(r'[^a-z0-9]+', '_', ''.join(c for c in s if unicodedata.category(c) != 'Mn')).strip('_')


pos = []
for n in NAMES:
    m = re.search(r'(?<![\w])' + re.escape(n) + r'\. ', t)
    if not m:
        print('!! sem', n)
        continue
    pos.append((m.start(), n, m.end()))
pos.sort()
out = []
for k, (st, n, body) in enumerate(pos):
    end = pos[k + 1][0] if k + 1 < len(pos) else len(t)
    txt = t[body:end].strip()
    eff_type = None
    m = re.search(r'\. (' + '|'.join(TYPES) + r')\.$', txt)
    if m:
        eff_type = m.group(1)
        txt = txt[:m.start() + 1]
    sentences = [s.strip() for s in re.split(r'(?<=\.)\s+(?=[A-ZÀ-Ú])', txt) if s.strip()]
    rec = {'id': slug(n), 'name': n, 'description': txt, 'effects': sentences}
    if eff_type:
        rec['effectType'] = eff_type
    out.append(rec)
    print(n, '|', eff_type, '|', txt[:100])

header = '''import { Condition } from '../types/rules';

/**
 * Condições — T20 JdA v1.3, Apêndice: Lista de Condições (págs. 394–395). Gerado por
 * .agents/tools/gen_conditions.py. "Condições com os mesmos efeitos não se acumulam; aplique apenas
 * os mais severos." Efeitos mecânicos em src/utils/conditionEffects.ts.
 */
export const CONDITIONS_LIST: Condition[] = '''
open(os.path.join(ROOT, 'src', 'data', 'conditions.ts'), 'w', encoding='utf-8').write(header + json.dumps(out, ensure_ascii=False, indent=2) + ';\n')
print('condições', len(out))
