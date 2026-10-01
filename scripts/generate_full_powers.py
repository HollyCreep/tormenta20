# -*- coding: utf-8 -*-
"""
Extracts and builds complete General Powers (src/data/generalPowers.ts)
and Class Powers (src/data/classPowers.ts) from Tormenta20-Edicao-Jogo-do-Ano-v1.3.pdf.
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

def slugify(text):
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
    text = re.sub(r'[^\w\s-]', '', text).lower()
    return re.sub(r'[-\s]+', '_', text).strip('_')

print("Extracting General Powers from pages 130 to 144...")

sections = [
    ('combate', 129, 135),
    ('destino', 134, 137),
    ('magia', 136, 138),
    ('concedido', 137, 142),
    ('tormenta', 141, 144)
]

general_powers = []
seen_power_ids = set()

for category, p_start, p_end in sections:
    for p in range(p_start, p_end):
        blocks = doc[p].get_text('blocks')
        for b in blocks:
            b_text = b[4].strip()
            lines = [clean(l) for l in b_text.split('\n') if clean(l)]
            if not lines: continue
            first_line = lines[0]
            if any(h in first_line.lower() for h in ['capítulo', 'perícias & poderes', 'tabela 2-', 'poderes de', 'poderes concedidos', 'poderes da tormenta']):
                continue
            
            if len(first_line) < 45 and not first_line.endswith('.') and not first_line.endswith(':') and len(lines) > 1:
                title = first_line
                desc_lines = lines[1:]
                full_desc = ' '.join(desc_lines)
                
                prereq = ""
                m_pre = re.search(r'Pr[ée]-requisitos?:\s*(.+)$', full_desc, re.IGNORECASE)
                if m_pre:
                    prereq = clean(m_pre.group(1))
                    full_desc = clean(full_desc[:m_pre.start()])
                
                pid = slugify(title)
                if pid and pid not in seen_power_ids and len(full_desc) > 20:
                    seen_power_ids.add(pid)
                    item = {
                        "id": pid,
                        "name": title,
                        "category": category,
                        "description": full_desc
                    }
                    if prereq:
                        item["prerequisites"] = prereq
                    general_powers.append(item)

print(f"Extracted {len(general_powers)} general powers.")

# Write to src/data/generalPowers.ts
gen_powers_ts = f"""import {{ GeneralPower }} from '../types/rules';

export const GENERAL_POWERS_LIST: GeneralPower[] = {json.dumps(general_powers, indent=2, ensure_ascii=False)};
"""

with open('src/data/generalPowers.ts', 'w', encoding='utf-8') as f:
    f.write(gen_powers_ts)

print(f"Generated src/data/generalPowers.ts with {len(general_powers)} general powers.")

# =============================================================================
# CLASS POWERS (TODAS AS 14 CLASSES)
# =============================================================================
CLASSES_PAGES = [
    ('arcanista', 'Arcanista', 42, 46),
    ('barbaro', 'Bárbaro', 46, 49),
    ('bardo', 'Bardo', 49, 52),
    ('bucaneiro', 'Bucaneiro', 52, 55),
    ('cacador', 'Caçador', 55, 58),
    ('cavaleiro', 'Cavaleiro', 58, 62),
    ('clerigo', 'Clérigo', 62, 66),
    ('druida', 'Druida', 66, 70),
    ('guerreiro', 'Guerreiro', 70, 73),
    ('inventor', 'Inventor', 73, 78),
    ('ladino', 'Ladino', 78, 81),
    ('lutador', 'Lutador', 81, 84),
    ('nobre', 'Nobre', 84, 87),
    ('paladino', 'Paladino', 87, 91)
]

print("Extracting Class Powers across all 14 classes...")

class_powers = []
seen_cp_ids = set()

for class_id, class_name, p_start, p_end in CLASSES_PAGES:
    for p in range(p_start - 1, p_end):
        blocks = doc[p].get_text('blocks')
        for b in blocks:
            b_text = b[4].strip()
            # In class sections, powers start with bullet "• Name. Description..." or "Name. Description..."
            lines = [clean(l) for l in b_text.split('\n') if clean(l)]
            if not lines: continue
            
            # Check pattern: starts with bullet or bold title with dot
            m = re.match(r'^(?:[•\-\*]\s*)?([A-ZÀ-Ú][a-zà-úA-ZÀ-Ú\s\/\-]+)\.\s+(.*)', b_text, re.DOTALL)
            if m:
                p_name = clean(m.group(1))
                p_body = clean(m.group(2))
                
                # Filter out standard abilities like "Pontos de Vida", "Perícias", "Proficiências"
                if p_name.lower() in ['pontos de vida', 'pontos de mana', 'perícias', 'pericias', 'proficiências', 'proficiencias', 'características de classe', 'habilidades de classe', 'multiclasse']:
                    continue
                if len(p_name) > 35 or len(p_body) < 15:
                    continue
                
                # Check for Prerequisite
                prereq = ""
                m_pre = re.search(r'Pr[ée]-requisitos?:\s*(.+)$', p_body, re.IGNORECASE)
                if m_pre:
                    prereq = clean(m_pre.group(1))
                    p_body = clean(p_body[:m_pre.start()])
                
                cp_id = f"{class_id}_{slugify(p_name)}"
                if cp_id not in seen_cp_ids:
                    seen_cp_ids.add(cp_id)
                    cp_item = {
                        "id": cp_id,
                        "name": p_name,
                        "classId": class_id,
                        "className": class_name,
                        "description": p_body
                    }
                    if prereq:
                        cp_item["prerequisites"] = prereq
                    class_powers.append(cp_item)

print(f"Extracted {len(class_powers)} class powers across 14 classes.")

# Write to src/data/classPowers.ts
class_powers_ts = f"""import {{ ClassPower }} from '../types/rules';

export const CLASS_POWERS_LIST: ClassPower[] = {json.dumps(class_powers, indent=2, ensure_ascii=False)};
"""

with open('src/data/classPowers.ts', 'w', encoding='utf-8') as f:
    f.write(class_powers_ts)

print(f"Generated src/data/classPowers.ts with {len(class_powers)} class powers.")
