"""Confere se cada citação de src/data/rulesCitations.ts existe literalmente no livro e em que página.
Uso: python verify_citations.py
"""
import json
import os
import re
import sqlite3
import subprocess
import sys
import unicodedata

sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from book_extract import DB  # noqa: E402

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
js = r"""
const fs=require('fs');const s=fs.readFileSync('src/data/rulesCitations.ts','utf8');
const a=s.indexOf('export const RULES_CITATIONS');const st=s.indexOf('{',s.indexOf('=',a));let d=0,e=st;
for(;e<s.length;e++){if(s[e]=='{')d++;if(s[e]=='}'){d--;if(!d)break}}
console.log(JSON.stringify(eval('('+s.slice(st,e+1)+')')));
"""
data = json.loads(subprocess.check_output(['node', '-e', js], cwd=ROOT).decode('utf-8'))


def norm(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    s = s.replace('-\n', '')
    return re.sub(r'[^a-z0-9]+', ' ', s).strip()


con = sqlite3.connect(DB)
pages = [(pdf, bp, norm(t.replace('-\n', ''))) for pdf, bp, t in con.execute('select pdf_page, book_page, content from pages')]

for key, c in data.items():
    q = re.sub(r'[“”"]', '', c['quote'])
    parts = [p for p in re.split(r'\s*(?:\.\.\.|…|\[…\]|\(\.\.\.\))\s*', q) if len(p) > 25]
    found = []
    missing = []
    for p in parts:
        np_ = norm(p)
        hit = next(((pdf, bp) for pdf, bp, t in pages if np_ in t), None)
        if hit:
            found.append(hit)
        else:
            # tenta por frases
            sents = [x for x in re.split(r'(?<=[.!?])\s+', p) if len(x) > 20]
            for sn in sents:
                h2 = next(((pdf, bp) for pdf, bp, t in pages if norm(sn) in t), None)
                (found if h2 else missing).append(h2 or sn[:90])
    pg = sorted({bp for _, bp in found if isinstance(bp, int)})
    status = 'OK' if not missing else 'DIVERGE'
    print(f'[{status}] {key} | declarado: {c["page"]} | encontrado nas págs.: {pg}')
    for m in missing:
        print('     não encontrado:', m)
