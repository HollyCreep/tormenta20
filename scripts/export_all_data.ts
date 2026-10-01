import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { RACES_LIST } from '../src/data/races';
import { CLASSES_LIST } from '../src/data/classes';
import { ORIGINS_LIST } from '../src/data/origins';
import { DEITIES_LIST } from '../src/data/deities';
import { SKILLS_LIST } from '../src/data/skills';
import { GENERAL_POWERS_LIST } from '../src/data/generalPowers';
import { CLASS_POWERS_LIST } from '../src/data/classPowers';
import { EQUIPMENT_LIST } from '../src/data/equipment';
import { ITEM_MODIFIERS_LIST } from '../src/data/itemModifiers';
import { SPELLS_LIST } from '../src/data/spells';
import { CONDITIONS_LIST } from '../src/data/conditions';
import { RULES_CITATIONS } from '../src/data/rulesCitations';

const database = {
  races: RACES_LIST,
  classes: CLASSES_LIST,
  origins: ORIGINS_LIST,
  deities: DEITIES_LIST,
  skills: SKILLS_LIST,
  generalPowers: GENERAL_POWERS_LIST,
  classPowers: CLASS_POWERS_LIST,
  equipment: EQUIPMENT_LIST,
  itemModifiers: ITEM_MODIFIERS_LIST,
  spells: SPELLS_LIST,
  conditions: CONDITIONS_LIST,
  rulesCitations: RULES_CITATIONS,
};

const outputPath = path.resolve('src/data/t20_database.json');
fs.writeFileSync(outputPath, JSON.stringify(database, null, 2), 'utf-8');
console.log(`Database exported successfully to ${outputPath}`);
console.log(`- Races: ${RACES_LIST.length}`);
console.log(`- Classes: ${CLASSES_LIST.length}`);
console.log(`- Origins: ${ORIGINS_LIST.length}`);
console.log(`- Deities: ${DEITIES_LIST.length}`);
console.log(`- Skills: ${SKILLS_LIST.length}`);
console.log(`- General Powers: ${GENERAL_POWERS_LIST.length}`);
console.log(`- Equipment: ${EQUIPMENT_LIST.length}`);
console.log(`- Spells: ${SPELLS_LIST.length}`);
console.log(`- Citations: ${Object.keys(RULES_CITATIONS).length}`);
