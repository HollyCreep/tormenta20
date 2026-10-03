"""Gera src/data/classPowers.ts a partir do livro (T20 JdA v1.3, Cap. 1, págs. 36–84).

Cada poder de classe aparece como "• Nome. Texto. Pré-requisito(s): ...". O pré-requisito vai para
um campo próprio (lido pelo validador genérico). Uso: python gen_class_powers.py <dir-audit>
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
app = json.load(open(os.path.join(W, 'classPowers.json'), encoding='utf-8'))
classes = json.load(open(os.path.join(W, 'classes.json'), encoding='utf-8'))
RANGES = {'arcanista': (42, 47), 'barbaro': (46, 50), 'bardo': (49, 53), 'bucaneiro': (52, 56), 'cacador': (55, 59),
          'cavaleiro': (58, 63), 'clerigo': (62, 67), 'druida': (66, 71), 'guerreiro': (70, 74), 'inventor': (73, 79),
          'ladino': (78, 82), 'lutador': (81, 85), 'nobre': (84, 88), 'paladino': (87, 92)}


def slug(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', '_', s).strip('_')


out = []
report = {}
chapter = strip_captions(join_text([l[2] for l in load_lines(42, 92)]))
order = [c['id'] for c in classes]
names = {c['id']: c['name'] for c in classes}
NOTE_START = re.compile(r'^(Os?|As?|Uma?|Você|Efeitos|Alguns|Cada|Se|Quando|Esta|Este|Para)\b')
SUBOPTIONS = {
    'arcanista': {'Borboleta', 'Cobra', 'Coruja', 'Corvo', 'Falcão', 'Gato', 'Lagarto', 'Morcego', 'Rato', 'Sapo', 'Básica', 'Aprimorada', 'Superior'},
    'barbaro': {'Coruja', 'Corvo', 'Falcão', 'Grifo', 'Lobo', 'Raposa', 'Tartaruga', 'Urso'},
    'druida': {'Ajudante', 'Assassino', 'Atirador', 'Fortão', 'Guardião', 'Perseguidor', 'Aprimorada', 'Superior'},
    'cavaleiro': {'Bastião', 'Montaria'},
}
HEADERS = {'arcanista': 43, 'barbaro': 47, 'bardo': 50, 'bucaneiro': 53, 'cacador': 56, 'cavaleiro': 59, 'clerigo': 63,
           'druida': 67, 'guerreiro': 71, 'inventor': 74, 'ladino': 79, 'lutador': 82, 'nobre': 85, 'paladino': 88}
for idx, cls in enumerate(classes):
    cid, cname = cls['id'], cls['name']
    # páginas da classe: da página anterior ao cabeçalho até a véspera do cabeçalho seguinte
    lo = HEADERS[cid] - 1
    hi = HEADERS[order[idx + 1]] - 2 if idx + 1 < len(classes) else 92
    T = strip_captions(join_text([l[2] for l in load_lines(lo, hi)]))
    hab = T.find('Habilidades de Classe')
    pod = T.find(f'Poder de {cname}.')
    if pod < 0:
        print('!! sem lista de poderes', cid)
        continue
    # remove o trecho das habilidades (subopções com marcador), mantendo o que vem antes e depois
    seg = (T[:hab] if hab >= 0 else '') + ' ' + T[pod:]
    items = re.split(r'\s•\s', seg)[1:]
    found = []
    for it in items:
        m = re.match(r'([A-ZÀ-Ú][^.]{1,60}?)\. (.+)', it.strip(), re.S)
        if not m:
            continue
        name = m.group(1).strip()
        if name in SUBOPTIONS.get(cid, set()):
            continue  # subopção de habilidade (familiar, totem, herança, companheiro, caminho), não é poder
        if len(name.split()) > 7 or NOTE_START.match(name):
            continue  # marcador de nota, não é poder
        body = m.group(2).strip()
        pre = None
        pm = re.search(r'Pré-requisitos?: (.+?)\.(?:\s|$)', body)
        if pm:
            pre = pm.group(1).strip()
            body_main = body[:pm.start()].strip()
        else:
            # o último poder arrasta o texto seguinte; corta em habilidade "Nome. No Nº nível"
            cut = re.search(r' [A-ZÀ-Ú][\wÀ-ú ]{2,40}\. (?:No|A partir do) \d+º nível', body)
            body_main = body[:cut.start()].strip() if cut else body
        for marker in (' Tabela 1-', ' Pontos de Vida', ' Poder de ', ' Habilidades de Classe', ' Familiares Arcanos', ' Totens', ' Companheiros Animais'):
            k = body_main.find(marker)
            if k > 0:
                body_main = body_main[:k]
        body_main = re.sub(r'\s+e$', '', body_main.strip())
        found.append({'name': name, 'description': body_main, 'prerequisites': pre})
    report[cid] = found
    for f in found:
        rec = {'id': f'{cid}_{slug(f["name"])}', 'name': f['name'], 'classId': cid, 'className': cname,
               'description': f['description']}
        if f['prerequisites']:
            rec['prerequisites'] = f['prerequisites']
        out.append(rec)

# Textos que o PDF interrompe com quadros (continuação conferida no livro)
FIXUPS = {
    'arcanista_poder_magico': ('Quando sobe de nível, os PM',
        'Quando sobe de nível, os PM que recebe por este poder aumentam de acordo. Por exemplo, se escolher este poder no 4º nível, recebe 4 PM. Quando subir para o 5º nível, recebe +1 PM e assim por diante.'),
}
for rec in out:
    fx = FIXUPS.get(rec['id'])
    if fx and rec['description'].endswith(fx[0]):
        rec['description'] = rec['description'][: -len(fx[0])] + fx[1]

appn = {(p['classId'], p['name'].lower()) for p in app}
bookn = {(p['classId'], p['name'].lower()) for p in out}
print('livro', len(out), 'app', len(app))
print('só no livro:', sorted(bookn - appn)[:60])
print('só no app:', sorted(appn - bookn)[:60])
json.dump(out, open(os.path.join(W, 'book_classPowers.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
if '--write' in sys.argv:
    header = '''import { ClassPower } from '../types/rules';

/**
 * Poderes de classe — T20 JdA v1.3, Capítulo 1, págs. 36–84 ("Poder de <Classe>").
 * Gerado por .agents/tools/gen_class_powers.py a partir do texto do livro (não editar à mão).
 */
export const CLASS_POWERS_LIST: ClassPower[] = '''
    open(os.path.join(ROOT, 'src', 'data', 'classPowers.ts'), 'w', encoding='utf-8').write(
        header + json.dumps(out, ensure_ascii=False, indent=2) + ';\n')
    print('escrito')
