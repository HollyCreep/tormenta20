"""Extrai as magias do livro (T20 JdA v1.3, Cap. 4, págs. 176–211 / PDF 182–217) e, com --write,
regera src/data/spells.ts mantendo os ids do app. Uso: python gen_spells.py <dir-audit> [--write]
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
app = json.load(open(os.path.join(W, 'spells.json'), encoding='utf-8'))

HDR = re.compile(r'^(Arcana|Divina|Universal) (\d) \(([A-Za-zÀ-ú]+)\)\s*$', re.I)
NOISE = re.compile(r'^(Capítulo Quatro|Magia|Descrição das magias|\d{1,3})$')


def norm(s):
    s = unicodedata.normalize('NFD', s.lower())
    return re.sub(r'[^a-z0-9]+', ' ', ''.join(c for c in s if unicodedata.category(c) != 'Mn')).strip()


lines = [(pdf, bp, s.strip()) for pdf, bp, s in load_lines(182, 217) if s.strip() and not NOISE.match(s.strip())]
heads = []
for i, (pdf, bp, s) in enumerate(lines):
    m = HDR.match(s)
    if not m:
        continue
    # título: até 3 linhas anteriores curtas sem pontuação final
    t = []
    j = i - 1
    while j >= 0 and len(t) < 3:
        prev = lines[j][2]
        if len(prev) > 34 or re.search(r'[.:;,!?)]$', prev) or HDR.match(prev):
            break
        t.insert(0, prev)
        j -= 1
    # Linhas iniciais podem ser resto do texto anterior: prefere a variante que corresponde a um nome
    # conhecido; sem correspondência, exige que o título comece em maiúscula
    known = {norm(a['name']) for a in app}
    match = next((k for k in range(len(t)) if norm(' '.join(t[k:])) in known), None)
    if match is not None:
        t, j = t[match:], j + match
    else:
        while len(t) > 1 and not re.match(r'^[A-ZÀ-Ú]', t[0]):
            t.pop(0)
            j += 1
    heads.append({'i': i, 'title_start': j + 1, 'name': ' '.join(t).strip(), 'type': m.group(1).lower(),
                  'circle': int(m.group(2)), 'school': m.group(3).capitalize(), 'page': bp})

spells = []
for k, h in enumerate(heads):
    end = heads[k + 1]['title_start'] if k + 1 < len(heads) else len(lines)
    body = strip_captions(join_text([l[2] for l in lines[h['i'] + 1:end]]))
    st = re.match(r'(Execução: .+?)\. (?=[A-ZÀ-Ú“])', body)
    stats = st.group(1) if st else ''
    rest = body[st.end():] if st else body
    fields = {}
    for part in re.split(r';\s*', stats):
        if ':' in part:
            key, val = part.split(':', 1)
            fields[key.strip()] = val.strip()
    ups = []
    m = re.search(r'\s(Truque|\+\d+ PM):', rest)
    desc = rest[:m.start()].strip() if m else rest.strip()
    if m:
        for um in re.finditer(r'(Truque|\+\d+ PM): (.+?)(?=\s(?:Truque|\+\d+ PM):|$)', rest[m.start():].strip(), re.S):
            ups.append({'cost': um.group(1), 'description': um.group(2).strip()})
    target_key = next((key for key in fields if key in ('Alvo', 'Alvos', 'Área', 'Efeito', 'Alvo ou Área', 'Área ou Alvo')), None)
    spells.append({
        'name': h['name'], 'circle': h['circle'], 'type': h['type'], 'school': h['school'], 'page': h['page'],
        'execution': fields.get('Execução'), 'range': fields.get('Alcance'),
        'targetArea': f"{target_key}: {fields[target_key]}" if target_key else None,
        'duration': fields.get('Duração'), 'resistance': fields.get('Resistência'),
        'description': desc, 'upgrades': ups,
    })

print('livro', len(spells), 'app', len(app))
bn = {norm(s['name']): s for s in spells}
an = {norm(s['name']): s for s in app}
print('só no livro:', [s['name'] for s in spells if norm(s['name']) not in an])
print('só no app:', [s['name'] for s in app if norm(s['name']) not in bn])
diffs = []
for key, a in an.items():
    b = bn.get(key)
    if not b:
        continue
    for f in ('circle', 'type', 'school'):
        if str(a.get(f) or '').lower() != str(b.get(f) or '').lower():
            diffs.append((a['name'], f, a.get(f), b.get(f)))
print('diferenças de círculo/tipo/escola:', len(diffs))
for d in diffs[:60]:
    print('  ', d)
json.dump(spells, open(os.path.join(W, 'book_spells.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

if '--write' in sys.argv:
    out = []
    for b in spells:
        a = an.get(norm(b['name']))
        rec = {'id': a['id'] if a else re.sub(r'\s+', '_', norm(b['name'])),
               'name': (a['name'] if a and len(a['name']) >= len(b['name']) else b['name']), 'circle': b['circle'],
               'type': b['type'], 'school': b['school'], 'execution': b['execution'] or '', 'range': b['range'] or '',
               'targetArea': b['targetArea'] or '', 'duration': b['duration'] or '', 'description': b['description'],
               'upgrades': b['upgrades'], 'page': b['page']}
        if b['resistance']:
            rec['resistance'] = b['resistance']
        out.append(rec)
    header = '''import { Spell } from '../types/rules';

/**
 * Magias — T20 JdA v1.3, Capítulo 4, págs. 176–211. Gerado por .agents/tools/gen_spells.py a partir
 * do texto do livro (não editar à mão). Custo por círculo: Tabela 4-1 (pág. 170).
 */
export const SPELLS_LIST: Spell[] = '''
    open(os.path.join(ROOT, 'src', 'data', 'spells.ts'), 'w', encoding='utf-8').write(header + json.dumps(out, ensure_ascii=False, indent=2) + ';\n')
    print('escrito', len(out))
