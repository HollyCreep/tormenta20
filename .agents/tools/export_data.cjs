// Exporta os catálogos de src/data/*.ts para JSON (para scripts de auditoria em Python).
// Uso: node .agents/tools/export_data.cjs <dir-saida>
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..', 'src', 'data');
const out = process.argv[2] || '.';
fs.mkdirSync(out, { recursive: true });

const files = {
  generalPowers: 'generalPowers.ts',
  classPowers: 'classPowers.ts',
  races: 'races.ts',
  classes: 'classes.ts',
  origins: 'origins.ts',
  deities: 'deities.ts',
  spells: 'spells.ts',
  equipment: 'equipment.ts',
  itemModifiers: 'itemModifiers.ts',
  conditions: 'conditions.ts',
  skills: 'skills.ts',
};

for (const [key, file] of Object.entries(files)) {
  const src = fs.readFileSync(path.join(root, file), 'utf8');
  // primeiro array exportado do arquivo
  const start = src.indexOf('= [');
  const end = src.lastIndexOf('];');
  if (start < 0 || end < 0) {
    console.warn('sem array em', file);
    continue;
  }
  const body = src.slice(start + 2, end + 1).replace(/^\s*\/\/.*$/gm, '');
  let data;
  try {
    data = eval(body);
  } catch (e) {
    console.warn('falha ao avaliar', file, e.message);
    continue;
  }
  fs.writeFileSync(path.join(out, key + '.json'), JSON.stringify(data, null, 1));
  console.log(key, Array.isArray(data) ? data.length : typeof data);
}
