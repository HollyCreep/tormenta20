# -*- coding: utf-8 -*-
import fitz

doc = fitz.open('Tormenta20-Edicao-Jogo-do-Ano-v1.3.pdf')
page = doc[183] # Page 184
blocks = page.get_text("blocks")
for b in blocks[:15]:
    text = b[4].strip()
    if text:
        first_line = text.split('\n')[0]
        print(f"Spell block: {first_line[:40]}... (len: {len(text)})")
