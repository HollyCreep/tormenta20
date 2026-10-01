# -*- coding: utf-8 -*-
"""
Script de indexação do manual Tormenta 20: Edição Jogo do Ano (v1.3)
Gera uma base SQLite com Full-Text Search (FTS5) mapeando:
- Número da página no PDF e número da página impressa no livro
- Capítulo (TOC nível 1) e Seção (TOC nível 2/3)
- Texto completo da página para busca e recuperação instantânea
"""
import os
import sqlite3
import time
import pymupdf

def build_pdf_index(pdf_path: str = "Tormenta20-Edicao-Jogo-do-Ano-v1.3.pdf", db_path: str = "src/data/t20_manual_index.db"):
    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"PDF não encontrado no caminho: {pdf_path}")
    
    t0 = time.time()
    print(f"[Indexador T20] Lendo '{pdf_path}'...")
    doc = pymupdf.open(pdf_path)
    total_pages = len(doc)
    print(f"[Indexador T20] Total de páginas: {total_pages}")
    
    toc = doc.get_toc()
    
    def get_location(page_num):
        cur_ch = "Introdução"
        cur_sec = "Geral"
        for item in toc:
            lvl, title, p = item
            if p <= page_num:
                if lvl == 1:
                    cur_ch = title
                    cur_sec = "Geral"
                elif lvl in (2, 3):
                    cur_sec = title
            else:
                break
        return cur_ch, cur_sec

    # Cria ou recria o banco SQLite
    os.makedirs(os.path.dirname(db_path), exist_ok=True)
    if os.path.exists(db_path):
        os.remove(db_path)

    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    # Tabela FTS5 para busca textual ultra-rápida
    cur.execute("""
        CREATE VIRTUAL TABLE rules_fts USING fts5(
            chapter,
            section,
            book_page UNINDEXED,
            pdf_page UNINDEXED,
            content,
            tokenize = 'unicode61 remove_diacritics 2'
        )
    """)
    
    # Tabela regular para leitura rápida de página inteira por ID
    cur.execute("""
        CREATE TABLE pages (
            pdf_page INTEGER PRIMARY KEY,
            book_page INTEGER,
            chapter TEXT,
            section TEXT,
            content TEXT
        )
    """)
    
    fts_entries = []
    page_entries = []
    
    for i, page in enumerate(doc):
        pdf_page = i + 1
        ch, sec = get_location(pdf_page)
        content = page.get_text("text").strip()
        
        # Livro oficial: até pág 13 são capas/índice; pág 20 do PDF é pág 14 do livro (offset de -6)
        book_page = max(1, pdf_page - 6)
        
        fts_entries.append((ch, sec, book_page, pdf_page, content))
        page_entries.append((pdf_page, book_page, ch, sec, content))
        
    cur.executemany("INSERT INTO rules_fts(chapter, section, book_page, pdf_page, content) VALUES (?, ?, ?, ?, ?)", fts_entries)
    cur.executemany("INSERT INTO pages(pdf_page, book_page, chapter, section, content) VALUES (?, ?, ?, ?, ?)", page_entries)
    
    conn.commit()
    conn.close()
    
    dt = time.time() - t0
    db_size = os.path.getsize(db_path) / (1024 * 1024)
    print(f"[Indexador T20] Concluído em {dt:.2f}s!")
    print(f"[Indexador T20] Banco gerado em '{db_path}' ({db_size:.2f} MB)")

if __name__ == "__main__":
    build_pdf_index()
