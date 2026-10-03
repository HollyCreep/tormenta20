"""Extrai do livro, por classe: linha de PV/PM/Perícias/Proficiências, habilidades automáticas
(texto entre "Habilidades de Classe" e "Poder de <Classe>.") e a tabela de progressão.
Uso: python extract_classes.py <saida.json>   (T20 JdA v1.3, Cap. 1, págs. 36–84)
"""
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from book_extract import load_lines, join_text, strip_captions  # noqa: E402

CLASSES = [
    ('arcanista', 'Arcanista', 42, 47), ('barbaro', 'Bárbaro', 46, 50), ('bardo', 'Bardo', 49, 53),
    ('bucaneiro', 'Bucaneiro', 52, 56), ('cacador', 'Caçador', 55, 59), ('cavaleiro', 'Cavaleiro', 58, 63),
    ('clerigo', 'Clérigo', 62, 67), ('druida', 'Druida', 66, 71), ('guerreiro', 'Guerreiro', 70, 74),
    ('inventor', 'Inventor', 73, 79), ('ladino', 'Ladino', 78, 82), ('lutador', 'Lutador', 81, 85),
    ('nobre', 'Nobre', 84, 88), ('paladino', 'Paladino', 87, 92),
]

out = {}
for cid, name, a, b in CLASSES:
    t = strip_captions(join_text([l[2] for l in load_lines(a, b)]))
    i = t.find(f'Pontos de Vida. Um{"a" if cid == "arcanista" and False else ""}')
    i = t.find('Pontos de Vida. ')
    hdr = t[i:t.find('Habilidades de Classe', i)]
    start = t.find('Habilidades de Classe', i) + len('Habilidades de Classe')
    stop = t.find(f'Poder de {name}.', start)
    abilities = t[start:stop].strip() if stop > 0 else t[start:start + 6000]
    tab = re.search(r'Tabela 1-\d+: O[as]? ' + re.escape(name) + r' Nível Habilidades de Classe (.+?) 20º (.+?)(?= \d{2,3}$| [A-ZÀ-Ú][a-zà-ú]+ [a-zà-ú]|$)', t)
    table = None
    m = re.search(r'Tabela 1-\d+: O[as]? ' + re.escape(name) + r' Nível Habilidades de Classe (.{0,1600})', t)
    if m:
        table = m.group(1)
        j = table.find(' 20º ')
        if j > 0:
            k = table.find(' ', j + 5)
            table = table[:j + 200]
    out[cid] = {'name': name, 'header': hdr.strip(), 'abilities': abilities, 'table': table}
    print(cid, len(abilities), 'tabela' if table else 'SEM TABELA')

json.dump(out, open(sys.argv[1], 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
