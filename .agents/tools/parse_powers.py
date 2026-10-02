"""Extrai os poderes gerais do livro (T20 JdA v1.3, Cap. 2, págs. 124–137 / PDF 130–143).

Detecta títulos pela diagramação: linha curta, iniciada em maiúscula, sem ponto final,
precedida pelo fim de uma frase. Retorna lista de dicts:
  {name, category, deities?, description, prerequisites, pdf, page}
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from book_extract import load_lines, join_text, strip_captions  # noqa: E402

SECTIONS = [
    ('Poderes de Combate', 'combate'),
    ('Poderes de Destino', 'destino'),
    ('Poderes de Magia', 'magia'),
    ('Poderes Concedidos', 'concedido'),
    ('Poderes da Tormenta', 'tormenta'),
]
DEITIES = ['Aharadak', 'Allihanna', 'Arsenal', 'Azgher', 'Hyninn', 'Kallyadranoch', 'Khalmyr', 'Lena', 'Lin-Wu',
           'Marah', 'Megalokk', 'Nimb', 'Oceano', 'Sszzaas', 'Tanna-Toh', 'Tenebra', 'Thwor', 'Thyatis',
           'Valkaria', 'Wynna']
NOT_TITLES = {'Pré-requisito', 'Pré-requisitos', 'Aprimoramento', 'Poder', 'Poderes gerais', 'Escolhendo',
              'Grupos de Poderes', 'Poderes Gerais: Usar ou Não?'}

_deity_line = re.compile(r'^(' + '|'.join(re.escape(d) for d in DEITIES) + r')(, (' + '|'.join(re.escape(d) for d in DEITIES) + r'))*$')


def is_title(line, prev):
    s = line.strip()
    if not s or len(s) > 38 or s in NOT_TITLES:
        return False
    if s.endswith(('.', ',', ';', ':', '-', '–')):
        return False
    if not re.match(r'^[A-ZÀ-Ú]', s):
        return False
    if _deity_line.match(s):
        return False
    # palavras: máximo 6, maioria iniciada em maiúscula ou conectivo
    words = s.split()
    if len(words) > 6:
        return False
    if re.search(r'\d', s):
        return False
    return prev is None or prev.rstrip().endswith(('.', ')', '!', '?', '”', 'e'))


def parse(pdf_from=130, pdf_to=143):
    lines = load_lines(pdf_from, pdf_to)
    section = None
    powers = []
    cur = None
    prev = None
    for pdf, bp, s in lines:
        hdr = next((cat for title, cat in SECTIONS if s.strip() == title or s.strip().startswith(title)), None)
        if hdr and len(s.strip()) <= len('Poderes Concedidos') + 2:
            section = hdr
            prev = s
            continue
        if section and is_title(s, prev):
            cur = {'name': s.strip(), 'category': section, 'parts': [], 'pdf': pdf, 'page': bp, 'deities': []}
            powers.append(cur)
        elif cur is not None:
            if section == 'concedido' and not cur['parts'] and _deity_line.match(s.strip()):
                cur['deities'] = [d.strip() for d in s.split(',')]
            else:
                cur['parts'].append(s)
        prev = s
    out = []
    for p in powers:
        text = strip_captions(join_text(p.pop('parts')))
        m = re.search(r'Pré-requisitos?: (.+?)\.?\s*$', text)
        pre = None
        if m:
            pre = m.group(1).strip().rstrip('.')
            text = text[:m.start()].strip()
        p['description'] = text
        p['prerequisites'] = pre
        out.append(p)
    return out


if __name__ == '__main__':
    import json
    sys.stdout.reconfigure(encoding='utf-8')
    res = parse()
    print(len(res))
    print(json.dumps(res, ensure_ascii=False, indent=1)[:3000])
