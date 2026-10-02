"""Gera src/data/generalPowers.ts a partir do livro (T20 JdA v1.3, Cap. 2, págs. 124–137).

- Nomes e grupos (combate, destino, magia, Tormenta) partem da lista do app, conferida contra o livro;
  os poderes concedidos vêm da linha "Poderes Concedidos." de cada divindade (Cap. 1, págs. 96–105).
- Textos e pré-requisitos são extraídos literalmente do livro.
Uso: python gen_general_powers.py <dir-audit>
"""
import json
import os
import re
import sys
import unicodedata

sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from book_extract import extract_blocks, load_lines, join_text, strip_captions  # noqa: E402

W = sys.argv[1]
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
app = json.load(open(os.path.join(W, 'generalPowers.json'), encoding='utf-8'))

DEITIES = ['Aharadak', 'Allihanna', 'Arsenal', 'Azgher', 'Hyninn', 'Kallyadranoch', 'Khalmyr', 'Lena', 'Lin-Wu',
           'Marah', 'Megalokk', 'Nimb', 'Oceano', 'Sszzaas', 'Tanna-Toh', 'Tenebra', 'Thwor', 'Thyatis',
           'Valkaria', 'Wynna']

# ---- poderes concedidos: lista oficial a partir das divindades
dt = join_text([l[2] for l in load_lines(100, 111)])
granted_by = {}
for m in re.finditer(r'Poderes Concedidos\. (.+?)\. Obrigações', dt):
    # deus = último nome de divindade citado como título antes do bloco
    head = dt[:m.start()]
    god = max(DEITIES, key=lambda d: head.rfind(d + ' ') if head.rfind(d + ' ') >= 0 else -1)
    for p in [x.strip() for x in m.group(1).split(',')]:
        granted_by.setdefault(p, [])
granted_names = list(granted_by)

# nomes corretos para entradas antigas do app
RENAME = {'Enciclopédico': 'Conhecimento Enciclopédico', 'Amedrontador': 'Olhar Amedrontador', 'Presas': 'Presas Primordiais',
          'Armas da ambição': 'Armas da Ambição', 'Arsenal das profundezas': 'Arsenal das Profundezas',
          'Presas venenosas': 'Presas Venenosas', 'Sorte dos loucos': 'Sorte dos Loucos', 'Membros extras': 'Membros Extras',
          'Arma Secundária grande': 'Arma Secundária Grande'}

base = []
for p in app:
    name = RENAME.get(p['name'], p['name'])
    if p['category'] == 'concedido':
        continue
    base.append({'name': name, 'category': p['category'], 'id': p['id']})
for g in granted_names:
    base.append({'name': g, 'category': 'concedido', 'id': None})

names = [b['name'] for b in base]
granted_set = set(granted_names)
_dstart = re.compile(r'^(' + '|'.join(re.escape(d) for d in DEITIES) + r')', re.I)


def score(name, text):
    # poder concedido: a descrição começa com o nome da(s) divindade(s); tabelas não
    bonus = 100000 if name in granted_set and _dstart.match(text) else 0
    return bonus + len(text)


blocks = extract_blocks(names, 130, 143, score=score)


def slug(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', '_', s).strip('_')


deity_re = re.compile(r'^((?:' + '|'.join(re.escape(d) for d in DEITIES) + r')(?:, (?:' + '|'.join(re.escape(d) for d in DEITIES) + r'))*)\s+', re.I)
canon = {d.lower(): d for d in DEITIES}
out = []
missing = []
for b in base:
    blk = blocks.get(b['name'])
    if not blk:
        missing.append(b['name'])
        continue
    text = strip_captions(blk['text'])
    deities = None
    if b['category'] == 'concedido':
        m = deity_re.match(text)
        if m:
            deities = [canon[d.strip().lower()] for d in m.group(1).split(',')]
            text = text[m.end():]
    # o bloco pode arrastar cabeçalhos/quadros seguintes; corta em marcadores conhecidos
    for marker in [' Poderes de Destino', ' Poderes de Magia', ' Poderes Concedidos Todos', ' Poderes da Tormenta Estes',
                   ' Poderes de Aprimoramento', ' Poderes Gerais: Usar ou Não?', ' Poder Pré-requisitos', ' Um Inexpugnável']:
        i = text.find(marker)
        if i > 0:
            text = text[:i]
    text = re.sub(r'\s+e$', '', text.strip())  # ícone de magia "e"
    pre = None
    m = re.search(r'Pré-requisitos?: (.+?)\.?\s*$', text)
    if m:
        pre = m.group(1).strip().rstrip('.')
        text = text[:m.start()].strip()
    rec = {
        'id': b['id'] or slug(b['name']),
        'name': b['name'],
        'category': b['category'],
        'description': text,
    }
    if pre:
        rec['prerequisites'] = pre
    if deities:
        rec['deities'] = deities
    rec['page'] = blk['page']
    out.append(rec)

if missing:
    print('!! sem texto no livro:', missing)

header = '''import { GeneralPower } from '../types/rules';

/**
 * Poderes gerais — T20 JdA v1.3, Capítulo 2, págs. 124–137 (combate, destino, magia,
 * concedidos e Tormenta). Gerado por .agents/tools/gen_general_powers.py a partir do texto
 * do livro (não editar à mão). `deities`: divindades que concedem o poder (Cap. 1, págs. 96–105).
 */
export const GENERAL_POWERS_LIST: GeneralPower[] = '''
open(os.path.join(ROOT, 'src', 'data', 'generalPowers.ts'), 'w', encoding='utf-8').write(
    header + json.dumps(out, ensure_ascii=False, indent=2) + ';\n')
from collections import Counter
print('poderes gerados:', len(out), Counter(o['category'] for o in out))
