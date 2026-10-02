"""Consulta o índice do livro T20 JdA.
Uso:
  python q.py find "<regex>" [ctx=250] [pdf_from] [pdf_to]   -> trechos que casam
  python q.py page <pdf_page> [pdf_page_fim]                  -> texto integral das páginas
  python q.py sec "<texto>" [chars=1500] [pdf_from] [pdf_to]  -> texto a partir do título/trecho
"""
import re, sqlite3, sys
sys.stdout.reconfigure(encoding='utf-8')
import os
DB = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'src', 'data', 't20_manual_index.db')
c = sqlite3.connect(DB)

def norm(t):
    t = t.replace('-\n', '')
    t = re.sub(r'\s+', ' ', t)
    return t

def rows(a=None, b=None):
    q = 'select pdf_page, book_page, chapter, section, content from pages'
    if a is not None:
        q += f' where pdf_page between {int(a)} and {int(b if b is not None else a)}'
    return c.execute(q + ' order by pdf_page').fetchall()

mode = sys.argv[1]
if mode == 'find':
    pat = re.compile(sys.argv[2], re.I)
    ctx = int(sys.argv[3]) if len(sys.argv) > 3 else 250
    a = sys.argv[4] if len(sys.argv) > 4 else None
    b = sys.argv[5] if len(sys.argv) > 5 else None
    for pdf, bp, ch, sec, t in rows(a, b):
        t = norm(t)
        for m in pat.finditer(t):
            print(f'[pdf {pdf} | pág {bp} | {ch} | {sec}]')
            print('  ' + t[max(0, m.start() - ctx): m.end() + ctx])
elif mode == 'page':
    a = int(sys.argv[2]); b = int(sys.argv[3]) if len(sys.argv) > 3 else a
    for pdf, bp, ch, sec, t in rows(a, b):
        print(f'===== pdf {pdf} | pág {bp} | {ch} | {sec}')
        print(norm(t))
elif mode == 'sec':
    needle = sys.argv[2]
    n = int(sys.argv[3]) if len(sys.argv) > 3 else 1500
    a = sys.argv[4] if len(sys.argv) > 4 else None
    b = sys.argv[5] if len(sys.argv) > 5 else None
    for pdf, bp, ch, sec, t in rows(a, b):
        t = norm(t)
        i = t.find(needle)
        while i >= 0:
            print(f'[pdf {pdf} | pág {bp}]')
            print('  ' + t[i:i + n])
            i = t.find(needle, i + 1)
