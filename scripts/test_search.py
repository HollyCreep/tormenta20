# -*- coding: utf-8 -*-
import sqlite3
import sys

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

conn = sqlite3.connect("src/data/t20_manual_index.db")
cur = conn.cursor()

def search(q):
    print(f"=== BUSCA: '{q}' ===")
    rows = cur.execute("""
        SELECT chapter, section, book_page, pdf_page, snippet(rules_fts, 4, '[[', ']]', '...', 12)
        FROM rules_fts
        WHERE rules_fts MATCH ?
        ORDER BY rank
        LIMIT 2
    """, (q,)).fetchall()
    for ch, sec, bp, pp, snip in rows:
        print(f"[{ch} -> {sec}] Pág Livro: {bp} (PDF: {pp})")
        print("Trecho:", snip.replace("\n", " "))
        print()

search("Fortitude pericia")
search("compra de pontos")
search("Atroz Cruel")
search("Armadura pesada destreza defesa")
