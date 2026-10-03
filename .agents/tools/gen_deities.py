"""Gera src/data/deities.ts a partir do livro (T20 JdA v1.3, Cap. 1, págs. 96–105).

Para cada divindade: descrição, crenças, símbolo, energia, arma preferida, devotos (texto e
listas de raças/classes), poderes concedidos (texto de generalPowers.ts) e obrigações.
Uso: python gen_deities.py <dir-audit>
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
app = {d['id']: d for d in json.load(open(os.path.join(W, 'deities.json'), encoding='utf-8'))}
gp = {p['name']: p for p in json.load(open(os.path.join(W, 'generalPowers.json'), encoding='utf-8'))}

NAMES = {'aharadak': 'Aharadak', 'allihanna': 'Allihanna', 'arsenal': 'Arsenal', 'azgher': 'Azgher', 'hyninn': 'Hyninn',
         'kallyadranoch': 'Kallyadranoch', 'khalmyr': 'Khalmyr', 'lena': 'Lena', 'lin_wu': 'Lin-Wu', 'marah': 'Marah',
         'megalokk': 'Megalokk', 'nimb': 'Nimb', 'oceano': 'Oceano', 'sszzaas': 'Sszzaas', 'tanna_toh': 'Tanna-Toh',
         'tenebra': 'Tenebra', 'thwor': 'Thwor', 'thyatis': 'Thyatis', 'valkaria': 'Valkaria', 'wynna': 'Wynna'}
RACE_WORDS = {'humanos': 'humano', 'anões': 'anao', 'dahllan': 'dahllan', 'elfos': 'elfo', 'goblins': 'goblin',
              'lefou': 'lefou', 'minotauros': 'minotauro', 'qareen': 'qareen', 'golens': 'golem', 'hynne': 'hynne',
              'kliren': 'kliren', 'medusas': 'medusa', 'osteon': 'osteon', 'sereias': 'sereia', 'tritões': 'sereia',
              'sílfides': 'silfide', 'suraggel': 'suraggel', 'aggelus': 'suraggel', 'sulfure': 'suraggel', 'trogs': 'trog'}
CLASS_WORDS = {'arcanistas': 'arcanista', 'bárbaros': 'barbaro', 'bardos': 'bardo', 'bucaneiros': 'bucaneiro',
               'caçadores': 'cacador', 'cavaleiros': 'cavaleiro', 'clérigos': 'clerigo', 'druidas': 'druida',
               'guerreiros': 'guerreiro', 'inventores': 'inventor', 'ladinos': 'ladino', 'lutadores': 'lutador',
               'nobres': 'nobre', 'paladinos': 'paladino'}

text = strip_captions(join_text([l[2] for l in load_lines(100, 111)]))

# Tabela 1-20: Deuses (pág. 97) — energia e poderes concedidos de cada divindade
tab_start = text.find('Tabela 1-20: Deuses')
tab_end = text.find('Teurgista Místico', tab_start) + len('Teurgista Místico')
tab = text[tab_start: tab_end]
TABLE = {}
names_alt = '|'.join(re.escape(n) for n in NAMES.values())
for m in re.finditer(r'(' + names_alt + r') (Positiva|Negativa|Qualquer) (.+?)(?= (?:' + names_alt + r') (?:Positiva|Negativa|Qualquer) |$)', tab):
    items = [x.strip() for x in m.group(3).split(',')][:4]
    items = [next((g for g in gp if it == g or it.startswith(g + ' ')), it) for it in items]
    TABLE[m.group(1)] = (m.group(2), items)
# Thyatis/Valkaria/Wynna podem ficar após o corte do quadro: completa pelo texto corrido
for did, name in NAMES.items():
    if name not in TABLE:
        print('!! fora da tabela', name)


def field(seg, name, nxt):
    m = re.search(re.escape(name) + r'\. (.+?)\. (?=' + nxt + r'\.)', seg, re.S)
    return m.group(1).strip() if m else None


headings = {}
for did, name in NAMES.items():
    best = None
    for m in re.finditer(re.escape(name) + r' (?=[A-ZÀ-Ú“])', text):
        if tab_start <= m.start() < tab_end:
            continue
        c = text.find('Crenças e Objetivos. ', m.end())
        if c < 0 or c - m.end() > 2500:
            continue
        between = text[m.end():c]
        if 'Crenças e Objetivos' in between or 'Poderes Concedidos.' in between:
            continue
        if best is None or c - m.end() < best[1] - best[0]:
            best = (m.end(), c)
    headings[did] = best

out = []
for did, name in NAMES.items():
    energy, plist = TABLE.get(name, ('Qualquer', []))
    h = headings.get(did)
    desc = text[h[0]:h[1]].strip() if h else ''
    nxt_c = text.find('Crenças e Objetivos. ', h[1] + 10) if h else -1
    seg = text[h[1]: (nxt_c if nxt_c > 0 else h[1] + 6000)] if h else ''
    beliefs = field(seg, 'Crenças e Objetivos', 'Símbolo Sagrado')
    symbol = field(seg, 'Símbolo Sagrado', 'Canalizar Energia')
    weapon = field(seg, 'Arma Preferida', 'Devotos')
    dm = re.search(r'Devotos\. (.+?\.)(?= [A-ZÀ-Ú][a-zà-ú]+ |$)', seg)
    devotees = dm.group(1).rstrip('.') if dm else None
    p = text.find('Poderes Concedidos. ' + ', '.join(plist))
    obligations = ''
    if p >= 0:
        o = text.find('Obrigações & Restrições. ', p)
        rest = text[o + len('Obrigações & Restrições. '):]
        stops = [rest.find(' Poderes Concedidos.')]
        for other_id, (st, _) in [(k, v) for k, v in headings.items() if v]:
            pos = text.find(NAMES[other_id] + ' ', st - len(NAMES[other_id]) - 1)
        for other in NAMES.values():
            mm = re.search(r' ' + re.escape(other) + r' (?=[A-ZÀ-Ú“][a-zà-ú]* [A-Za-zà-ú])', rest)
            if mm and other != name:
                stops.append(mm.start())
        mm = re.search(r' (Deuses Menores|Panteão|Tabela 1-)', rest)
        if mm:
            stops.append(mm.start())
        stops = [x for x in stops if x > 0]
        base_pos = o + len('Obrigações & Restrições. ')
        for other_id, hh in headings.items():
            if hh and other_id != did:
                title_pos = text.rfind(NAMES[other_id], 0, hh[0])
                if title_pos > base_pos:
                    stops.append(title_pos - base_pos)
        stops = [x for x in stops if x > 0]
        obligations = rest[:min(stops)] if stops else rest[:1200]
        obligations = re.sub(r'\s*\d{2,3}$', '', obligations.strip())
    else:
        print('!! poderes não localizados', name)
    dl = (devotees or '').lower()
    races = sorted({v for w, v in RACE_WORDS.items() if re.search(r'\b' + w + r'\b', dl)})
    classes = sorted({v for w, v in CLASS_WORDS.items() if re.search(r'\b' + w + r'\b', dl)})
    base = app.get(did, {})
    missing = [x for x in plist if x not in gp]
    if missing:
        print('!! poder concedido sem texto', did, missing)
    out.append({
        'id': did, 'name': name, 'title': base.get('title', ''), 'description': desc or base.get('description', ''),
        'beliefs': beliefs, 'symbol': symbol, 'energyChannel': energy, 'favoredWeapon': weapon,
        'allowedDevoteesText': devotees, 'allowedRaces': races, 'allowedClasses': classes,
        'grantedPowers': [{'id': gp[x]['id'] if x in gp else x, 'name': x, 'description': gp[x]['description'] if x in gp else ''} for x in plist],
        'obligations': obligations,
    })
    print(did, '|', energy, '|', weapon, '|', (devotees or '')[:70], '|', races, classes, '| obr:', obligations[:60], '…', obligations[-40:])

ids = {d['id'] for d in out}
print('faltando:', [i for i in NAMES if i not in ids])
order = list(NAMES)
out.sort(key=lambda d: order.index(d['id']))
header = '''import { Deity } from '../types/rules';

/**
 * Divindades — T20 JdA v1.3, Capítulo 1, págs. 96–105.
 * Gerado por .agents/tools/gen_deities.py a partir do texto do livro (não editar à mão).
 * Devoto: escolhe um poder concedido da lista do deus (clérigos e druidas escolhem dois) e segue as
 * Obrigações & Restrições (pág. 96).
 */
export const DEITIES_LIST: Deity[] = '''
if '--write' in sys.argv:
    open(os.path.join(ROOT, 'src', 'data', 'deities.ts'), 'w', encoding='utf-8').write(header + json.dumps(out, ensure_ascii=False, indent=2) + ';\n')
    print('escrito')
