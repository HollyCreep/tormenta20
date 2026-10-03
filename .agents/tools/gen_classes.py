"""Gera src/data/classes.ts a partir do livro (T20 JdA v1.3, Cap. 1, págs. 36–84).

Do livro: PV, PM, perícias (obrigatórias, alternativa "X ou Y", quantidade e lista),
proficiências (além de armas simples e armaduras leves, que todos sabem usar — pág. 32),
habilidades de 1º nível (texto literal) e a progressão de habilidades por nível (tabela da classe).
Do app (não são regras): descrição, papel, atributos principais, subclasses e metadados de magia.
Uso: python gen_classes.py <dir-audit>
"""
import json
import os
import re
import sys
import unicodedata

sys.stdout.reconfigure(encoding='utf-8')
W = sys.argv[1]
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
book = json.load(open(os.path.join(W, 'book_classes.json'), encoding='utf-8'))
app = {c['id']: c for c in json.load(open(os.path.join(W, 'classes.json'), encoding='utf-8'))}
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from book_extract import load_lines, join_text, strip_captions  # noqa: E402

SKILLS = {'Acrobacia': 'acrobacia', 'Adestramento': 'adestramento', 'Atletismo': 'atletismo', 'Atuação': 'atuacao',
          'Cavalgar': 'cavalgar', 'Conhecimento': 'conhecimento', 'Cura': 'cura', 'Diplomacia': 'diplomacia',
          'Enganação': 'enganacao', 'Fortitude': 'fortitude', 'Furtividade': 'furtividade', 'Guerra': 'guerra',
          'Iniciativa': 'iniciativa', 'Intimidação': 'intimidacao', 'Intuição': 'intuicao', 'Investigação': 'investigacao',
          'Jogatina': 'jogatina', 'Ladinagem': 'ladinagem', 'Luta': 'luta', 'Misticismo': 'misticismo', 'Nobreza': 'nobreza',
          'Ofício': 'oficio', 'Percepção': 'percepcao', 'Pilotagem': 'pilotagem', 'Pontaria': 'pontaria',
          'Reflexos': 'reflexos', 'Religião': 'religiao', 'Sobrevivência': 'sobrevivencia', 'Vontade': 'vontade'}
NUM = {'2': 2, '4': 4, '6': 6, '8': 8, 'dois': 2, 'quatro': 4}
PAGES = {'arcanista': 37, 'barbaro': 41, 'bardo': 44, 'bucaneiro': 47, 'cacador': 50, 'cavaleiro': 53, 'clerigo': 57,
         'druida': 61, 'guerreiro': 65, 'inventor': 68, 'ladino': 73, 'lutador': 76, 'nobre': 79, 'paladino': 82}
RANGES = {'arcanista': (42, 47), 'barbaro': (46, 50), 'bardo': (49, 53), 'bucaneiro': (52, 56), 'cacador': (55, 59),
          'cavaleiro': (58, 63), 'clerigo': (62, 67), 'druida': (66, 71), 'guerreiro': (70, 74), 'inventor': (73, 79),
          'ladino': (78, 82), 'lutador': (81, 85), 'nobre': (84, 88), 'paladino': (87, 92)}


def slug(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', '_', s).strip('_')


def skill_ids(txt):
    return [SKILLS[m] for m in re.findall(r'([A-ZÀ-Ú][a-zà-ú]+) \((?:For|Des|Con|Int|Sab|Car)\)', txt) if m in SKILLS]


def parse_header(h):
    hp = re.search(r'começa com (\d+) pontos de vida.*?ganha (\d+) PV', h)
    mp = re.search(r'Pontos de Mana\. (\d+) PM por nível', h)
    sk = re.search(r'Perícias\. (.+?) mais (\d+|dois|quatro) a sua escolha entre (.+?)\. Proficiências', h)
    prof = re.search(r'Proficiências\. (.+?)\.', h).group(1)
    fixed_txt = sk.group(1)
    alt = None
    m = re.search(r'([A-ZÀ-Ú][a-zà-ú]+) \(\w+\) ou ([A-ZÀ-Ú][a-zà-ú]+) \(\w+\)', fixed_txt)
    if m:
        alt = [SKILLS[m.group(1)], SKILLS[m.group(2)]]
        fixed_txt = fixed_txt.replace(m.group(0), '')
    weapons, armor, shields = ['simples'], ['leves'], False
    pl = prof.lower()
    if 'armas marciais' in pl:
        weapons.append('marciais')
    if 'armaduras pesadas' in pl:
        armor.append('pesadas')
    if 'escudos' in pl:
        shields = True
    return {
        'hpInitial': int(hp.group(1)), 'hpPerLevel': int(hp.group(2)), 'mp': int(mp.group(1)),
        'mandatory': skill_ids(fixed_txt), 'alternative': alt, 'choices': NUM[sk.group(2)],
        'options': skill_ids(sk.group(3)), 'proficiencies': {'weapons': weapons, 'armor': armor, 'shields': shields},
        'profText': prof,
    }


def parse_table(t):
    rows = {}
    for m in re.finditer(r'(\d{1,2})º (.+?)(?= \d{1,2}º |$)', t or ''):
        lv = int(m.group(1))
        if 1 <= lv <= 20 and lv not in rows:
            rows[lv] = m.group(2).strip()
    if 20 in rows:  # corta o texto que vem depois da tabela
        # lista de opções de poder (•) e o título "Bravatas" do bucaneiro vêm logo depois da tabela no PDF
        rows[20] = re.sub(r'\s*•.*$| Bravatas.*$', '', rows[20])
        parts = [x.strip() for x in rows[20].split(',')[:2]]
        # "poder de <classe>" tem sempre três palavras; o que segue é texto de outra coluna do PDF
        parts = [' '.join(x.split()[:3]) if x.lower().startswith('poder de') else x for x in parts]
        rows[20] = ', '.join(parts)
    return rows


def ability_names(entry):
    names = []
    for part in entry.split(','):
        p = re.sub(r'\s*\(.*?\)|\s*[+–-]\s*\d.*$|\s+\d+d\d+.*$|\s+\d+$', '', part).strip()
        if p and not p.lower().startswith('poder de') and not p.lower().startswith('aumento de atributo'):
            names.append(p)
    return names


out = []
for cid, a in app.items():
    b = book[cid]
    h = parse_header(b['header'])
    table = parse_table(b['table'])
    full = strip_captions(join_text([l[2] for l in load_lines(*RANGES[cid])]))
    lvl1 = []
    all_names = sorted({n for lv in table.values() for n in ability_names(lv)}, key=len, reverse=True)
    first_level = {}
    for lv in sorted(table):
        for n in ability_names(table[lv]):
            first_level.setdefault(n.lower(), (lv, n))
    for lv, n in sorted(first_level.values()):
        base = full.find('Habilidades de Classe')
        m = re.search(r'(?<![\w])' + re.escape(n) + r'\. ', full[base:], re.I)
        if not m:
            print('!! sem texto', cid, n)
            continue
        txt = full[base + m.end():]
        cut = len(txt)
        for other in all_names + [f'Poder de {b["name"]}']:
            j = re.search(r' ' + re.escape(other) + r'\. ', txt, re.I)
            if j and other.lower() != n.lower():
                cut = min(cut, j.start())
        txt = txt[:cut]
        if lv == 20:
            # A habilidade de 20º nível é um parágrafo só; no PDF ela é seguida por um quadro
            # ("Linhagens Sobrenaturais", "• Golpe…", "e Missas") ou pela abertura da próxima classe.
            end = re.search(r'(?<=[.)]) (?=•|e [A-ZÀ-Ú•]|[A-ZÀ-Ú][\wà-ú]+ [A-ZÀ-Ú]|Efeitos do )', txt)
            if end:
                txt = txt[:end.start()]
        txt = re.sub(r'\s+e$', '', txt.strip())  # ícone de magia "e"
        rep = re.match(r'^(.{30,}?)\s+$', txt, re.S)  # o PDF repete alguns parágrafos
        if rep:
            txt = rep.group(1)
        cost = re.search(r'(?:gastar|pagar)[^.]{0,40}?(\d+ PM)', txt)
        lvl1.append({'id': f'{cid}_{slug(n)}', 'name': n[0].upper() + n[1:], 'level': lv, 'description': txt,
                     'type': 'ativa' if cost else 'passiva', **({'cost': cost.group(1)} if cost else {})})
    rec = dict(a)
    rec.update({
        'hpInitial': h['hpInitial'], 'hpPerLevel': h['hpPerLevel'], 'mpInitial': h['mp'], 'mpPerLevel': h['mp'],
        'proficiencies': h['proficiencies'], 'mandatorySkills': h['mandatory'],
        'skillChoicesCount': h['choices'], 'skillOptions': h['options'],
        'abilitiesLevel1': [x for x in lvl1 if x['level'] == 1],
        # Habilidades automáticas de todos os níveis (tabela da classe), com o nível em que aparecem
        'abilities': lvl1,
        'progression': [{'level': lv, 'features': table[lv]} for lv in sorted(table)],
        'page': PAGES[cid],
    })
    if h['alternative']:
        rec['skillAlternative'] = h['alternative']
    else:
        rec.pop('skillAlternative', None)
    out.append(rec)
    print(cid, 'PV', h['hpInitial'], h['hpPerLevel'], 'PM', h['mp'], 'obr', h['mandatory'], 'alt', h['alternative'],
          'esc', h['choices'], len(h['options']), h['proficiencies'], '|', [(x['level'], x['name']) for x in lvl1])

header = '''import { ClassDefinition } from '../types/rules';

/**
 * Classes — T20 JdA v1.3, Capítulo 1, págs. 36–84.
 * PV, PM, perícias, proficiências, habilidades automáticas (por nível) e progressão gerados a partir do livro
 * por .agents/tools/gen_classes.py. Todos os personagens sabem usar armas simples e armaduras leves (pág. 32).
 */
export const CLASSES_LIST: ClassDefinition[] = '''
open(os.path.join(ROOT, 'src', 'data', 'classes.ts'), 'w', encoding='utf-8').write(header + json.dumps(out, ensure_ascii=False, indent=2) + ';\n')
