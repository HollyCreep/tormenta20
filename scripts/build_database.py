# -*- coding: utf-8 -*-
"""
Database builder script for Tormenta 20 Jogo do Ano v1.3
Extracts and structures full rule details from the official PDF.
"""
import fitz
import json
import os
import re

doc = fitz.open('Tormenta20-Edicao-Jogo-do-Ano-v1.3.pdf')
print(f"Loaded PDF with {len(doc)} pages.")

def clean_text(text):
    text = text.replace('\xa0', ' ')
    text = re.sub(r' +', ' ', text)
    text = text.replace('–', '-').replace('—', '-')
    return text.strip()

print("Extraction script ready.")
