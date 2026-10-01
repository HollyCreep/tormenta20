# -*- coding: utf-8 -*-
"""
Extracts and generates complete src/data/spells.ts for Tormenta 20 JDA.
Extracts all spells from pages 184 to 217 of Tormenta20-Edicao-Jogo-do-Ano-v1.3.pdf.
"""
import fitz
import json
import re
import unicodedata

doc = fitz.open('Tormenta20-Edicao-Jogo-do-Ano-v1.3.pdf')

def clean(t):
    if not t:
        return ""
    t = t.replace('\xa0', ' ')
    t = re.sub(r'[\u2010\u2011\u2012\u2013\u2014]', '-', t)
    t = re.sub(r' +', ' ', t)
    return t.strip()

# School normalization map
SCHOOL_MAP = {
    'abjuraçao': 'Abjuração',
    'abjuração': 'Abjuração',
    'abjuracao': 'Abjuração',
    'adivinhaçao': 'Adivinhação',
    'adivinhação': 'Adivinhação',
    'adivinhacao': 'Adivinhação',
    'convocaçao': 'Convocação',
    'convocação': 'Convocação',
    'convocacao': 'Convocação',
    'encantamento': 'Encantamento',
    'evocaçao': 'Evocação',
    'evocação': 'Evocação',
    'evocacao': 'Evocação',
    'ilusao': 'Ilusão',
    'ilusão': 'Ilusão',
    'ilusao': 'Ilusão',
    'necromancia': 'Necromancia',
    'transmutaçao': 'Transmutação',
    'transmutação': 'Transmutação',
    'transmutacao': 'Transmutação',
}

def normalize_school(s):
    s_clean = clean(s).lower()
    return SCHOOL_MAP.get(s_clean, s.capitalize())

def slugify(text):
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
    text = re.sub(r'[^\w\s-]', '', text).lower()
    return re.sub(r'[-\s]+', '_', text).strip('_')

print("Parsing spells across pages 184 to 217...")

# We will collect text from page 184 to 217 in order
# and find pattern:
# <Title>
# (Arcana|Divina|Universal) [1-5] (<School>)
# Execução: ...; Alcance: ...; Alvo/Área: ...; Duração: ... [; Resistência: ...]
# <Description text...>
# [+X PM: ...]

all_spells = []

# Concatenate text block by block preserving positions
full_blocks = []
for p in range(183, 217):
    blocks = doc[p].get_text('blocks')
    for b in blocks:
        # b = (x0, y0, x1, y1, text, block_no, block_type)
        t = b[4].strip()
        if t:
            full_blocks.append({'page': p + 1, 'text': t, 'bbox': b[:4]})

# Scan blocks and reconstruct spells
i = 0
while i < len(full_blocks):
    b_text = full_blocks[i]['text']
    # Check if this block contains the header "(Arcana|Divina|Universal) [1-5]"
    m = re.search(r'(Arcana|Divina|Universal)\s+([1-5])\s*\(([^\)]+)\)', b_text, re.IGNORECASE)
    if m:
        spell_type = m.group(1).lower()
        circle = int(m.group(2))
        school = normalize_school(m.group(3))
        
        # Determine title: lines in this block before the match, or previous block
        parts = b_text.split(m.group(0))
        before_text = parts[0].strip()
        after_text = parts[1].strip() if len(parts) > 1 else ""
        
        if before_text:
            title_lines = [clean(l) for l in before_text.split('\n') if clean(l)]
            title = ' '.join(title_lines[-2:]) if len(title_lines) >= 2 and len(title_lines[-1]) < 12 else title_lines[-1]
        else:
            # Look at previous block
            if i > 0:
                prev_lines = [clean(l) for l in full_blocks[i-1]['text'].split('\n') if clean(l)]
                title = ' '.join(prev_lines[-2:]) if len(prev_lines) >= 2 and len(prev_lines[-1]) < 12 else (prev_lines[-1] if prev_lines else "Magia")
            else:
                title = "Magia"
        
        # Filter out noise from title like "Capítulo Quatro" or page numbers
        title = re.sub(r'^(Captulo\s+\w+|Descrio\s+das\s+magias)\s*', '', title, flags=re.IGNORECASE).strip()
        if not title:
            title = "Magia Desconhecida"
        
        # Now collect lines for stats and description
        # Stats usually start with "Execução:"
        # Let's gather text from after_text and subsequent blocks until next spell header
        content_parts = [after_text]
        j = i + 1
        while j < len(full_blocks):
            next_t = full_blocks[j]['text']
            if re.search(r'(Arcana|Divina|Universal)\s+([1-5])\s*\(([^\)]+)\)', next_t, re.IGNORECASE):
                # Don't consume next spell
                # Check if last line of current block was the title of the next spell
                break
            content_parts.append(next_t)
            j += 1
        
        full_content = '\n'.join(content_parts).strip()
        
        # Parse Execução, Alcance, Alvo/Área, Duração, Resistência
        execution = "Padrão"
        range_val = "Curto"
        target_area = ""
        duration = "Instantânea"
        resistance = ""
        
        m_exec = re.search(r'Execu[çc][ãa]o:\s*([^;]+);', full_content, re.IGNORECASE)
        if m_exec: execution = clean(m_exec.group(1))
        
        m_range = re.search(r'Alcance:\s*([^;]+);', full_content, re.IGNORECASE)
        if m_range: range_val = clean(m_range.group(1))
        
        m_target = re.search(r'(?:Alvo|Área|Efeito):\s*([^;]+);', full_content, re.IGNORECASE)
        if m_target: target_area = clean(m_target.group(1))
        
        m_dur = re.search(r'Dura[çc][ãa]o:\s*([^;\.]+)(?:;|\.|$)', full_content, re.IGNORECASE)
        if m_dur: duration = clean(m_dur.group(1))
        
        m_res = re.search(r'Resist[êe]ncia:\s*([^;\.]+)(?:;|\.|$)', full_content, re.IGNORECASE)
        if m_res: resistance = clean(m_res.group(1))
        
        # Remove stats header from content to get description and upgrades
        desc_text = full_content
        # Find where stats header ends
        m_end_header = re.search(r'(?:Dura[çc][ãa]o|Resist[êe]ncia):[^\.\n]+\.', desc_text, re.IGNORECASE)
        if m_end_header:
            desc_text = desc_text[m_end_header.end():].strip()
        
        # Extract upgrades (+X PM: ... / Truque: ...)
        upgrades = []
        upgrade_matches = re.finditer(r'(\+\d+\s+PM|Truque):\s*([^\+\n]+(?:\n(?!\+\d+\s+PM|Truque)[^\+\n]+)*)', desc_text)
        for um in upgrade_matches:
            cost = clean(um.group(1))
            up_desc = clean(um.group(2))
            upgrades.append({"cost": cost, "description": up_desc})
        
        # Clean description by trimming out upgrades if present
        m_first_upgrade = re.search(r'(\+\d+\s+PM|Truque):', desc_text)
        if m_first_upgrade:
            main_desc = clean(desc_text[:m_first_upgrade.start()])
        else:
            main_desc = clean(desc_text)
            
        # Clean up title if it contains accents like 'Alimentos' -> 'Abençoar Alimentos'
        if title == 'Alimentos':
            title = 'Abençoar Alimentos'
        
        spell_id = slugify(title)
        if not spell_id:
            spell_id = f"spell_{len(all_spells)+1}"
            
        all_spells.append({
            "id": spell_id,
            "name": title,
            "circle": circle,
            "type": spell_type,
            "school": school,
            "execution": execution,
            "range": range_val,
            "targetArea": target_area or "1 criatura",
            "duration": duration,
            "resistance": resistance or None,
            "description": main_desc,
            "upgrades": upgrades
        })
        
        i = j - 1 # advance
    i += 1

print(f"Total spells successfully processed: {len(all_spells)}")

# Clean up resistances with None
cleaned_spells = []
for s in all_spells:
    item = {
        "id": s["id"],
        "name": s["name"],
        "circle": s["circle"],
        "type": s["type"],
        "school": s["school"],
        "execution": s["execution"],
        "range": s["range"],
        "targetArea": s["targetArea"],
        "duration": s["duration"],
        "description": s["description"],
    }
    if s["resistance"] and s["resistance"] != "undefined":
        item["resistance"] = s["resistance"]
    if s["upgrades"]:
        item["upgrades"] = s["upgrades"]
    cleaned_spells.append(item)

# Write to src/data/spells.ts
ts_content = f"""import {{ Spell }} from '../types/rules';

export const SPELLS_LIST: Spell[] = {json.dumps(cleaned_spells, indent=2, ensure_ascii=False)};
"""

with open('src/data/spells.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Generated src/data/spells.ts with {len(cleaned_spells)} spells.")
