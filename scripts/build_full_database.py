# -*- coding: utf-8 -*-
"""
Full Database Builder for Tormenta 20 Edição Jogo do Ano (v1.3)
Extracts and builds complete datasets for:
1. Equipment (weapons, armor, shields, adventuring gear, tools, clothing, esoterics, alchemy, etc.)
2. Item Modifiers (improvements & special materials)
3. General Powers (Combat, Destiny, Magic, Conceded, Tormenta)
4. Class Powers (All 14 classes)
5. Spells (1st to 5th circles, Arcane & Divine)
"""
import fitz
import json
import re
import os

doc = fitz.open('Tormenta20-Edicao-Jogo-do-Ano-v1.3.pdf')

def clean(t):
    if not t:
        return ""
    t = t.replace('\xa0', ' ')
    t = re.sub(r'[\u2010\u2011\u2012\u2013\u2014]', '-', t)
    t = re.sub(r' +', ' ', t)
    return t.strip()

print(f"Loaded PDF with {len(doc)} pages.")

# We will build modular generators for each component
