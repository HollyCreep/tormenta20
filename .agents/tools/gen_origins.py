"""Gera src/data/origins.ts a partir do livro (T20 JdA v1.3, Cap. 1, págs. 85–95).

Para cada origem: descrição (texto do livro), itens, perícias e poderes da lista de
benefícios e o texto literal do poder único. Poderes gerais recebem a descrição do
próprio livro (Cap. 2). Uso: python gen_origins.py <dir-audit>
"""
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from book_extract import load_lines, join_text, strip_captions  # noqa: E402

W = sys.argv[1]
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
app = json.load(open(os.path.join(W, 'origins.json'), encoding='utf-8'))
gp = {p['name'].lower(): p for p in json.load(open(os.path.join(W, 'generalPowers.json'), encoding='utf-8'))}
book_gp = json.load(open(os.path.join(W, 'book_generalPowers.json'), encoding='utf-8'))
book_gp_l = {k.lower(): v for k, v in book_gp.items()}

SKILLS = {'acrobacia': 'acrobacia', 'adestramento': 'adestramento', 'atletismo': 'atletismo', 'atuação': 'atuacao',
          'cavalgar': 'cavalgar', 'conhecimento': 'conhecimento', 'cura': 'cura', 'diplomacia': 'diplomacia',
          'enganação': 'enganacao', 'fortitude': 'fortitude', 'furtividade': 'furtividade', 'guerra': 'guerra',
          'iniciativa': 'iniciativa', 'intimidação': 'intimidacao', 'intuição': 'intuicao',
          'investigação': 'investigacao', 'jogatina': 'jogatina', 'ladinagem': 'ladinagem', 'luta': 'luta',
          'misticismo': 'misticismo', 'nobreza': 'nobreza', 'ofício': 'oficio', 'percepção': 'percepcao',
          'pilotagem': 'pilotagem', 'pontaria': 'pontaria', 'reflexos': 'reflexos', 'religião': 'religiao',
          'sobrevivência': 'sobrevivencia', 'vontade': 'vontade'}

text = join_text([l[2] for l in load_lines(91, 101)])
names = [o['name'] for o in app]
# As 35 origens aparecem em ordem alfabética, cada uma com uma linha "Itens." (âncora).
its = [m.start() for m in re.finditer(r'Itens\. ', text)]
assert len(its) == len(names), (len(its), len(names))  # noqa
starts = []
for k, n in enumerate(names):
    lo = its[k - 1] if k else 0
    # última ocorrência do nome que inicia a descrição (a tabela-resumo traz ";" logo depois)
    cands = [m.start() for m in re.finditer(re.escape(n) + ' ', text[lo:its[k]])]
    cands = [lo + c for c in cands if ';' not in text[lo + c: lo + c + 45]]
    if not cands:
        raise SystemExit('origem sem início: ' + n)
    starts.append(cands[-1])
blocks = {}
for k, n in enumerate(names):
    end = starts[k + 1] if k + 1 < len(names) else len(text)
    blocks[n] = text[starts[k] + len(n):end].strip()

def clean(s):
    s = strip_captions(re.sub(r'\s+', ' ', s).strip())
    s = re.sub(r'\s+e$', '', s)  # marcador de magia "e" ao fim do bloco
    return s


def unique_text(block, uname, next_names):
    i = block.find(uname + ' ', block.find('Benefícios.'))
    i = block.find(uname + ' ', block.find('(pode', block.find('Benefícios.')))
    if i < 0:
        return None
    rest = block[i + len(uname):].strip()
    return clean(rest)


out = []
for o in app:
    n = o['name']
    b = blocks.get(n)
    if not b:
        print('!! sem bloco', n)
        continue
    desc = b[:b.find('Itens.')]
    if ' Tabela 1-' in desc:  # a Tabela 1-19 (resumo das origens) cai no meio de uma descrição
        desc = desc[:desc.find(' Tabela 1-')]
    desc = clean(desc)
    ben = re.search(r'Benefícios\. (.+?)\((poderes?|poder)\)\.', b)
    skills, powers = [], []
    special = None
    if not ben and n != 'Amnésico':
        i = b.find('Benefícios')
        print('!! sem benefícios', n, '::', b[i:i + 300])
        continue
    if n == 'Amnésico':
        special = 'amnesico'
        unique_names = ['Lembranças Graduais']
    else:
        sk_txt, pw_txt = ben.group(1).split('(perícias);')
        for s in [x.strip() for x in sk_txt.split(',')]:
            base = re.sub(r'\s*\(.*\)', '', s).strip().lower()
            if base not in SKILLS:
                print('!! perícia desconhecida', n, s)
                continue
            skills.append(SKILLS[base])
        unique_names = []
        for p in [x.strip() for x in pw_txt.split(',') if x.strip()]:
            pl = p.lower()
            if pl.startswith('um poder de combate'):
                powers.append({'name': 'Poder de Combate', 'type': 'combate',
                               'description': 'Um poder de combate a sua escolha (Cap. 2).'})
            elif pl.startswith('um poder da tormenta'):
                powers.append({'name': 'Poder da Tormenta', 'type': 'tormenta',
                               'description': 'Um poder da Tormenta a sua escolha (Cap. 2).'})
            elif pl in gp:
                g = gp[pl]
                bt = book_gp_l.get(pl, {}).get('text') or g['description']
                powers.append({'name': g['name'], 'type': g['category'], 'description': clean(bt)})
            else:
                unique_names.append(p)
                powers.append({'name': p, 'type': 'origem', 'description': None})
    # textos dos poderes únicos (o último bloco após a lista de benefícios)
    tail = b[b.find('Benefícios.'):]
    tail = tail[tail.find('.', tail.find('(pode')) + 1:].strip() if n != 'Amnésico' else tail
    next_name = names[names.index(n) + 1] if names.index(n) + 1 < len(names) else None
    for u in unique_names:
        m = re.search(re.escape(u) + ' ', tail, re.I)
        t = None
        if m:
            t = tail[m.end():].strip()
            # o texto do poder termina antes da próxima origem, de legendas repetidas
            # ("Fulano. Fulano.") ou do quadro "Sua Própria Origem"
            cuts = [t.find(' Sua Própria Origem')]
            if next_name:
                cuts.append(t.find(' ' + next_name + ' '))
            rep = re.search(r'([A-ZÀ-Ú][^.]{2,60}\.) \1', t)
            if rep:
                cuts.append(rep.start())
            cuts = [c for c in cuts if c > 0]
            if cuts:
                t = t[:min(cuts)]
            # corta no próximo poder único (Busca Interior e outros não têm 2 por origem)
            for other in unique_names:
                if other != u:
                    j = t.find(other + ' ')
                    if j > 0:
                        t = t[:j]
            t = clean(t)
        if n == 'Amnésico':
            powers.append({'name': u, 'type': 'origem', 'description': t})
        else:
            for p in powers:
                if p['name'] == u:
                    p['description'] = t
        if not t:
            print('!! sem texto do poder único', n, u)
    rec = {'id': o['id'], 'name': n, 'description': desc, 'items': o['items'], 'skills': skills, 'powers': powers}
    if special:
        rec['benefitRule'] = special
    out.append(rec)

header = '''import { Origin } from '../types/rules';

/**
 * Origens — T20 JdA v1.3, Capítulo 1, págs. 85–95.
 * Gerado a partir do texto do livro por .agents/tools/gen_origins.py (não editar à mão).
 * Benefícios: escolha dois entre as perícias e poderes listados (pág. 85).
 */
export const ORIGINS_LIST: Origin[] = '''
body = json.dumps(out, ensure_ascii=False, indent=2)
open(os.path.join(ROOT, 'src', 'data', 'origins.ts'), 'w', encoding='utf-8').write(header + body + ';\n')
print('origens geradas:', len(out))
