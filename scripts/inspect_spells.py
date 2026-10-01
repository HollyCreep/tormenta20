import re

with open('src/data/spells.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Match each object { ... }
spell_blocks = re.findall(r'\{\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)",\s*"circle":\s*(\d+),\s*"type":\s*"([^"]+)",\s*"school":\s*"([^"]+)"', content)
print(f"Total spells regex matched: {len(spell_blocks)}")

for sp in spell_blocks:
    if 'invulnerabilidade' in sp[0].lower() or 'invulnerabilidade' in sp[1].lower():
        print("Found:", sp)

from collections import Counter
id_counts = Counter([s[0] for s in spell_blocks])
for k, v in id_counts.items():
    if v > 1:
        print("Duplicate ID:", k, v)

name_counts = Counter([s[1] for s in spell_blocks])
for k, v in name_counts.items():
    if v > 1:
        print("Duplicate Name:", k, v)
