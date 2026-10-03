import type { CharacterInventoryItem, CharacterPower, CharacterSheet } from '../types/character';
import { calculateRacialModifiers, calculateTotalAttributes, recalculateFullCharacterSheet } from '../utils/rulesEngine';
import { CLASSES_LIST } from '../data/classes';
import { EQUIPMENT_LIST } from '../data/equipment';
import { GENERAL_POWERS_LIST } from '../data/generalPowers';
import { ORIGINS_LIST } from '../data/origins';
import { RACES_LIST } from '../data/races';
import { SKILLS_LIST } from '../data/skills';
import { SPELLS_LIST } from '../data/spells';

/** Item do catálogo como item da mochila (equipamento inicial é gratuito — Cap. 3, pág. 140). */
function item(equipmentId: string, extra: Partial<CharacterInventoryItem> = {}): CharacterInventoryItem {
  const eq = EQUIPMENT_LIST.find((e) => e.id === equipmentId);
  if (!eq) throw new Error(`Item inexistente: ${equipmentId}`);
  return {
    id: `inv_${equipmentId}`,
    equipmentId,
    name: eq.name,
    category: eq.category,
    subcategory: eq.subcategory,
    spaces: eq.spaces,
    quantity: 1,
    isEquipped: eq.category.startsWith('arma') || eq.category.startsWith('armadura') || eq.category === 'escudo',
    damage: eq.damage,
    critical: eq.critical,
    damageType: eq.damageType,
    range: eq.range,
    defenseBonus: eq.defenseBonus,
    armorPenalty: eq.armorPenalty,
    description: eq.description,
    price: eq.price,
    isFree: true,
    source: 'inicial',
    ...extra,
  };
}

function racePowers(raceId: string): CharacterPower[] {
  const race = RACES_LIST.find((r) => r.id === raceId)!;
  return race.abilities.map((a) => ({ id: a.id, name: a.name, source: 'raca', description: a.description, cost: a.cost }));
}

function classPowers(classId: string): CharacterPower[] {
  const cls = CLASSES_LIST.find((c) => c.id === classId)!;
  return cls.abilitiesLevel1.map((a) => ({ id: a.id, name: a.name, source: 'classe', description: a.description, cost: a.cost }));
}

function generalPower(name: string, source: CharacterPower['source']): CharacterPower {
  const p = GENERAL_POWERS_LIST.find((g) => g.name === name);
  const fromOrigin = ORIGINS_LIST.flatMap((o) => o.powers).find((o) => o.name === name);
  return {
    id: `${source}_${name.toLowerCase().replace(/\s+/g, '_')}`,
    name,
    source,
    description: p?.description || fromOrigin?.description || '',
    type: p?.category || fromOrigin?.type,
  };
}

function skillsRecord(trained: string[]): CharacterSheet['skills'] {
  return Object.fromEntries(
    SKILLS_LIST.map((s) => [
      s.id,
      { id: s.id, name: s.name, attribute: s.attribute, isTrained: trained.includes(s.id), total: 0, breakdown: { value: 0, formula: '', components: [] }, source: trained.includes(s.id) ? ('classe' as const) : ('custom' as const) },
    ])
  );
}

const emptyStats = (): CharacterSheet['stats'] => {
  const z = { value: 0, formula: '', components: [] };
  return { maxHp: z, currentHp: 0, tempHp: 0, maxMp: z, currentMp: 0, tempMp: 0, defense: z, speed: z, armorPenalty: z, maxSpaces: z, currentSpaces: 0 };
};

/** Personagens de exemplo, montados segundo as regras de criação (Cap. 1) e calculados pelo motor. */
export function createSampleCharacters(): CharacterSheet[] {
  // 1. Thuran — Anão Guerreiro, origem Minerador, devoto de Arsenal
  // Compra de pontos: For 3 (4) + Con 3 (4) + Sab 1 (1) + Car –1 (–1) = 8 de 10 pontos (Cap. 1, pág. 17)
  const thuranBase = { for: 3, des: 0, con: 3, int: 0, sab: 1, car: -1 };
  const thuranRacial = calculateRacialModifiers('anao');
  const thuranDraft: CharacterSheet = {
    id: 'char_thuran_01',
    name: 'Thuran Martelo-de-Prata',
    playerName: 'Mestre da Masmorra',
    concept: 'Defensor de Doherimm com martelo e escudo',
    level: 1,
    xp: 0,
    raceId: 'anao',
    classId: 'guerreiro',
    originId: 'minerador',
    deityId: 'arsenal',
    selectedDeityPowers: ['Sangue de Ferro'],
    attributeMethod: 'point_buy',
    baseAttributes: thuranBase,
    racialModifiers: thuranRacial,
    totalAttributes: calculateTotalAttributes(thuranBase, thuranRacial),
    // Guerreiro: Luta (ou Pontaria) e Fortitude + 2 da lista (Cap. 1, pág. 65)
    selectedClassSkills: ['luta', 'iniciativa', 'intimidacao'],
    selectedIntSkills: [],
    selectedOriginBenefits: [
      { type: 'pericia', name: 'atletismo' },
      { type: 'poder', name: 'Ataque Poderoso' },
    ],
    stats: emptyStats(),
    skills: skillsRecord(['luta', 'fortitude', 'iniciativa', 'intimidacao', 'atletismo']),
    powers: [
      ...racePowers('anao'),
      ...classPowers('guerreiro'),
      generalPower('Ataque Poderoso', 'origem'),
      generalPower('Sangue de Ferro', 'divindade'),
    ],
    spells: [],
    // Kit (Cap. 3, pág. 140): mochila, saco de dormir, traje, arma simples, arma marcial, brunea, escudo leve
    // + itens do Minerador: gemas (T$ 100) e picareta (Cap. 1, pág. 93)
    inventory: [
      item('martelo_guerra', { kitSlot: 'c_arma_marcial', kitOption: 'martelo_guerra' }),
      item('lanca', { isEquipped: false, kitSlot: 'c_arma_simples', kitOption: 'lanca' }),
      item('brunea', { kitSlot: 'c_armadura', kitOption: 'brunea' }),
      item('escudo_leve', { kitSlot: 'c_escudo', kitOption: 'escudo_leve' }),
      item('mochila', { kitSlot: 'c_mochila', kitOption: 'mochila' }),
      item('saco_dormir', { kitSlot: 'c_saco', kitOption: 'saco_dormir' }),
      item('traje_viajante', { kitSlot: 'c_traje', kitOption: 'traje_viajante' }),
      item('picareta', { isEquipped: false, source: 'origem', kitSlot: 'o_picareta', kitOption: 'picareta' }),
    ],
    tibares: 14, // média de 4d6
    activeConditions: [],
    bio: {
      gender: 'Masculino',
      age: '72 anos',
      appearance: 'Um anão atarracado com cicatrizes de minas e um escudo marcado por anos de túneis.',
      history: 'Nascido nos túneis profundos de Doherimm, trabalhou na extração de minérios antes de atender ao chamado das armas para honrar Arsenal na superfície.',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // 2. Lyra — Humana Arcanista (Mago), origem Estudiosa, devota de Wynna
  // Compra de pontos: For –1 (–1) + Des 1 (1) + Con 1 (1) + Int 4 (7) + Sab 1 (1) + Car 1 (1) = 10 pontos
  const lyraBase = { for: -1, des: 1, con: 1, int: 4, sab: 1, car: 1 };
  const lyraRacial = calculateRacialModifiers('humano', undefined, ['des', 'int', 'car']);
  const lyraSpells = ['armadura_arcana', 'adaga_mental', 'explosao_de_chamas', 'seta_infalivel_de_talude']
    .map((id) => SPELLS_LIST.find((s) => s.id === id))
    .filter((s): s is (typeof SPELLS_LIST)[number] => Boolean(s))
    .map((s) => ({ ...s, learnedFrom: 'classe' as const }));
  const lyraDraft: CharacterSheet = {
    id: 'char_lyra_02',
    name: 'Lyra Stardust',
    playerName: 'Mestre da Masmorra',
    concept: 'Erudita arcanista com vasto conhecimento teórico e grimório reluzente',
    level: 1,
    xp: 0,
    raceId: 'humano',
    selectedRacialAttributes: ['des', 'int', 'car'],
    // Versátil: duas perícias (Cap. 1, pág. 19)
    selectedRacialSkills: ['iniciativa', 'percepcao'],
    classId: 'arcanista',
    classSubclass: 'mago',
    originId: 'estudioso',
    deityId: 'wynna',
    selectedDeityPowers: ['Bênção do Mana'],
    attributeMethod: 'point_buy',
    baseAttributes: lyraBase,
    racialModifiers: lyraRacial,
    totalAttributes: calculateTotalAttributes(lyraBase, lyraRacial),
    // Arcanista: Misticismo e Vontade + 2 da lista (Cap. 1, pág. 37)
    selectedClassSkills: ['conhecimento', 'investigacao'],
    // Int 5: cinco perícias treinadas a escolha (Cap. 1, pág. 17)
    selectedIntSkills: ['diplomacia', 'guerra', 'nobreza', 'intuicao', 'religiao'],
    // Estudioso: Conhecimento já é treinada pela classe, então os dois benefícios são poderes (Cap. 1, pág. 90)
    selectedOriginBenefits: [
      { type: 'poder', name: 'Palpite Fundamentado' },
      { type: 'poder', name: 'Aparência Inofensiva' },
    ],
    stats: emptyStats(),
    skills: skillsRecord(['misticismo', 'vontade', 'conhecimento', 'investigacao', 'iniciativa', 'percepcao', 'diplomacia', 'guerra', 'nobreza', 'intuicao', 'religiao']),
    powers: [
      ...racePowers('humano'),
      ...classPowers('arcanista'),
      generalPower('Palpite Fundamentado', 'origem'),
      generalPower('Aparência Inofensiva', 'origem'),
      generalPower('Bênção do Mana', 'divindade'),
    ],
    spells: lyraSpells,
    // Kit (Cap. 3, pág. 140) — arcanistas começam sem armadura — + coleção de livros do Estudioso (pág. 90)
    inventory: [
      item('adaga', { kitSlot: 'c_arma_simples', kitOption: 'adaga' }),
      item('mochila', { kitSlot: 'c_mochila', kitOption: 'mochila' }),
      item('saco_dormir', { kitSlot: 'c_saco', kitOption: 'saco_dormir' }),
      item('traje_viajante', { kitSlot: 'c_traje', kitOption: 'traje_viajante' }),
    ],
    tibares: 14,
    activeConditions: [],
    bio: {
      gender: 'Feminino',
      age: '23 anos',
      appearance: 'Túnica de viagem escura bordada com constelações de Arton e manto de lã leve.',
      history: 'Estudou na Academia Arcana, onde se destacou pela rápida assimilação das escolas de Evocação e Abjuração antes de partir em expedição.',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return [thuranDraft, lyraDraft].map((c) => {
    const full = recalculateFullCharacterSheet(c) as CharacterSheet;
    return { ...full, stats: { ...full.stats, currentHp: full.stats.maxHp.value, currentMp: full.stats.maxMp.value } };
  });
}
