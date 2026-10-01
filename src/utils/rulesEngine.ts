import {
  CharacterAttributes,
  StatBreakdown,
  TrainedSkillData,
  CharacterInventoryItem,
} from '../types/character';
import { RACES_LIST } from '../data/races';
import { CLASSES_LIST } from '../data/classes';
import { SKILLS_LIST } from '../data/skills';
import { DEITIES_LIST } from '../data/deities';
import { AttributeKey } from '../types/rules';

/**
 * Retorna os modificadores de atributos baseados na raça e escolhas do jogador.
 */
export function calculateRacialModifiers(
  raceId: string,
  subraceId?: string,
  selectedRacialAttributes?: AttributeKey[]
): CharacterAttributes {
  const mods: CharacterAttributes = { for: 0, des: 0, con: 0, int: 0, sab: 0, car: 0 };
  const race = RACES_LIST.find((r) => r.id === raceId);
  if (!race) return mods;

  // Modificadores fixos da raça
  Object.entries(race.attributeModifiers).forEach(([key, val]) => {
    if (val !== undefined && key in mods) {
      mods[key as AttributeKey] += val;
    }
  });

  // Atributos selecionáveis (Humano, Lefou, Osteon, Sereia)
  if (race.isSelectableAttributes && selectedRacialAttributes) {
    const bonus = race.selectableAttributesBonus || 1;
    selectedRacialAttributes.forEach((attrKey) => {
      if (attrKey in mods) {
        mods[attrKey] += bonus;
      }
    });
  }

  // Sub-raças (ex: Suraggel - Aggelus / Sulfure)
  if (race.customSelections?.requiresSubrace && subraceId) {
    const subrace = race.customSelections.subraces?.find((s) => s.id === subraceId);
    if (subrace) {
      Object.entries(subrace.attributeModifiers).forEach(([key, val]) => {
        if (val !== undefined && key in mods) {
          mods[key as AttributeKey] += val;
        }
      });
    }
  }

  return mods;
}

/**
 * Calcula os atributos totais somando a base e os modificadores raciais.
 * No Tormenta 20 Edição Jogo do Ano, o valor do atributo É o próprio modificador!
 */
export function calculateTotalAttributes(
  base: CharacterAttributes,
  racial: CharacterAttributes
): CharacterAttributes {
  return {
    for: (base.for || 0) + (racial.for || 0),
    des: (base.des || 0) + (racial.des || 0),
    con: (base.con || 0) + (racial.con || 0),
    int: (base.int || 0) + (racial.int || 0),
    sab: (base.sab || 0) + (racial.sab || 0),
    car: (base.car || 0) + (racial.car || 0),
  };
}

/**
 * Calcula a Penalidade de Armadura total com base nos itens equipados.
 */
export function calculateArmorPenalty(inventory: CharacterInventoryItem[]): StatBreakdown {
  let penalty = 0;
  const components: { label: string; value: number }[] = [];

  inventory.forEach((item) => {
    if (item.isEquipped && item.armorPenalty && item.armorPenalty !== 0) {
      penalty += item.armorPenalty;
      components.push({
        label: item.name,
        value: item.armorPenalty,
      });
    }
  });

  if (components.length === 0) {
    return {
      value: 0,
      formula: '0 (Sem penalidade de armaduras ou escudos)',
      components: [{ label: 'Nenhuma armadura com penalidade', value: 0 }],
    };
  }

  const formulaParts = components.map((c) => `${c.value} (${c.label})`);
  return {
    value: penalty,
    formula: `${formulaParts.join(' + ')} = ${penalty}`,
    components,
  };
}

/**
 * Calcula a Defesa do personagem com fórmula e somatória detalhada.
 * Defesa = 10 + Des (se não usar armadura pesada) + Armadura + Escudo + Bônus Raciais/Classes/Poderes.
 */
export function calculateDefense(
  level: number,
  attributes: CharacterAttributes,
  inventory: CharacterInventoryItem[],
  raceId: string,
  classId: string,
  powerNames: string[] = []
): StatBreakdown {
  const components: { label: string; value: number | string }[] = [];
  let total = 10;
  components.push({ label: 'Base', value: 10 });

  // Verifica armadura pesada equipada
  const equippedArmor = inventory.find(
    (item) => item.isEquipped && (item.category === 'armadura_leve' || item.category === 'armadura_pesada')
  );
  const isHeavyArmor = equippedArmor?.category === 'armadura_pesada';

  // Destreza na Defesa
  if (isHeavyArmor) {
    components.push({ label: `Destreza (0 por usar ${equippedArmor.name})`, value: 0 });
  } else {
    const desMod = attributes.des;
    total += desMod;
    components.push({ label: `Destreza (${desMod >= 0 ? '+' : ''}${desMod})`, value: desMod });
  }

  // Bônus de Armadura
  if (equippedArmor && equippedArmor.defenseBonus) {
    total += equippedArmor.defenseBonus;
    components.push({ label: `Armadura (${equippedArmor.name})`, value: equippedArmor.defenseBonus });
  }

  // Bônus de Escudo
  const equippedShield = inventory.find((item) => item.isEquipped && item.category === 'escudo');
  if (equippedShield && equippedShield.defenseBonus) {
    let shieldBonus = equippedShield.defenseBonus;
    if (powerNames.includes('Estilo de Arma e Escudo')) {
      shieldBonus += 1;
      components.push({ label: `Escudo (${equippedShield.name} + Estilo)`, value: shieldBonus });
    } else {
      components.push({ label: `Escudo (${equippedShield.name})`, value: shieldBonus });
    }
    total += shieldBonus;
  }

  // Bônus Raciais de Defesa
  if (raceId === 'minotauro') {
    total += 1;
    components.push({ label: 'Couro Rígido (Minotauro)', value: 1 });
  } else if (raceId === 'trog') {
    total += 1;
    components.push({ label: 'Pele Escamosa (Trog)', value: 1 });
  } else if (raceId === 'golem') {
    total += 2;
    components.push({ label: 'Chassi (Golem)', value: 2 });
  } else if (raceId === 'silfide') {
    total += 2;
    components.push({ label: 'Tamanho Minúsculo (Sílfide)', value: 2 });
  } else if (raceId === 'goblin' || raceId === 'hynne') {
    total += 1;
    components.push({ label: 'Tamanho Pequeno', value: 1 });
  }

  // Bônus de Classe de Defesa
  if (classId === 'nobre' && !isHeavyArmor) {
    // Nobre Autoconfiança: soma Carisma se não usar armadura pesada
    const carMod = attributes.car;
    if (carMod > 0) {
      total += carMod;
      components.push({ label: 'Autoconfiança (Nobre)', value: carMod });
    }
  }

  // Bônus de Poderes Gerais
  if (powerNames.includes('Esquiva')) {
    total += 2;
    components.push({ label: 'Esquiva', value: 2 });
  }
  if (powerNames.includes('Estilo de Uma Arma') && !equippedShield) {
    total += 2;
    components.push({ label: 'Estilo de Uma Arma', value: 2 });
  }
  if (isHeavyArmor && powerNames.includes('Encouraçado')) {
    total += 2;
    components.push({ label: 'Encouraçado', value: 2 });
  }
  if (powerNames.includes('Carapaça')) {
    total += 2;
    components.push({ label: 'Carapaça (Tormenta)', value: 2 });
  }

  const formulaParts = components.map((c) => `${c.value} (${c.label})`);
  return {
    value: total,
    formula: `${formulaParts.join(' + ')} = ${total}`,
    components,
  };
}

/**
 * Calcula os Pontos de Vida Máximos (PV) com formulação detalhada.
 */
export function calculateMaxHp(
  level: number,
  attributes: CharacterAttributes,
  classId: string,
  raceId: string,
  powerNames: string[] = []
): StatBreakdown {
  const cls = CLASSES_LIST.find((c) => c.id === classId);
  const hpBaseClassInitial = cls ? cls.hpInitial : 16;
  const hpPerLvl = cls ? cls.hpPerLevel : 4;
  const conMod = attributes.con;

  const components: { label: string; value: number | string }[] = [];

  // Nível 1: PV inicial da classe + Con
  let total = hpBaseClassInitial + conMod;
  components.push({ label: `PV Inicial (${cls?.name || 'Classe'})`, value: hpBaseClassInitial });
  components.push({ label: `Constituição (${conMod >= 0 ? '+' : ''}${conMod})`, value: conMod });

  // Níveis adicionais (se nível > 1)
  if (level > 1) {
    const additionalHp = (level - 1) * (hpPerLvl + conMod);
    total += additionalHp;
    components.push({ label: `Níveis 2 a ${level} (${level - 1} × ${hpPerLvl + conMod})`, value: additionalHp });
  }

  // Anão: Duro como Pedra (+3 PV no 1º nível, +1 por nível seguinte)
  if (raceId === 'anao') {
    const dwarfBonus = 3 + (level - 1);
    total += dwarfBonus;
    components.push({ label: 'Duro como Pedra (Anão)', value: dwarfBonus });
  }

  // Poder Geral: Vitalidade (+1 PV por nível)
  if (powerNames.includes('Vitalidade')) {
    total += level;
    components.push({ label: 'Vitalidade', value: level });
  }

  // Devoção Megalokk: Vitalidade Monstruosa (+2 PV por nível)
  if (powerNames.includes('Vitalidade Monstruosa')) {
    total += level * 2;
    components.push({ label: 'Vitalidade Monstruosa (Megalokk)', value: level * 2 });
  }

  const formulaParts = components.map((c) => `${c.value} (${c.label})`);
  return {
    value: Math.max(1, total),
    formula: `${formulaParts.join(' + ')} = ${total}`,
    components,
  };
}

/**
 * Calcula os Pontos de Mana Máximos (PM) com formulação detalhada.
 */
export function calculateMaxMp(
  level: number,
  classId: string,
  raceId: string,
  powerNames: string[] = []
): StatBreakdown {
  const cls = CLASSES_LIST.find((c) => c.id === classId);
  const mpPerLevel = cls ? cls.mpPerLevel : 3;

  const components: { label: string; value: number | string }[] = [];
  let total = mpPerLevel * level;
  components.push({ label: `PM da Classe (${cls?.name || 'Classe'} Nível ${level})`, value: total });

  // Elfo: Sangue Mágico (+1 PM por nível)
  if (raceId === 'elfo') {
    total += level;
    components.push({ label: 'Sangue Mágico (Elfo)', value: level });
  }

  // Devoção Wynna: Bênção do Mana (+1 PM por nível)
  if (powerNames.includes('Bênção do Mana')) {
    total += level;
    components.push({ label: 'Bênção do Mana (Wynna)', value: level });
  }

  // Poder Geral: Vontade de Ferro (+1 PM a cada dois níveis)
  if (powerNames.includes('Vontade de Ferro')) {
    const ironWill = Math.floor(level / 2);
    if (ironWill > 0) {
      total += ironWill;
      components.push({ label: 'Vontade de Ferro', value: ironWill });
    }
  }

  const formulaParts = components.map((c) => `${c.value} (${c.label})`);
  return {
    value: Math.max(1, total),
    formula: `${formulaParts.join(' + ')} = ${total}`,
    components,
  };
}

/**
 * Calcula o Deslocamento com bônus de raça e penalidades de armadura.
 */
export function calculateSpeed(
  raceId: string,
  inventory: CharacterInventoryItem[],
  powerNames: string[] = []
): StatBreakdown {
  const race = RACES_LIST.find((r) => r.id === raceId);
  const baseSpeed = race ? race.speed : 9;

  let total = baseSpeed;
  const components: { label: string; value: number | string }[] = [];
  components.push({ label: `Raça (${race?.name || 'Base'})`, value: `${baseSpeed}m` });

  // Poder Atlético (+1,5m)
  if (powerNames.includes('Atlético')) {
    total += 1.5;
    components.push({ label: 'Atlético', value: '+1,5m' });
  }

  // Armadura pesada reduz deslocamento em 3m (exceto para Anão por "Devagar e Sempre")
  const equippedArmor = inventory.find(
    (item) => item.isEquipped && item.category === 'armadura_pesada'
  );
  if (equippedArmor) {
    if (raceId === 'anao') {
      components.push({ label: 'Devagar e Sempre (Anão ignora redução de armadura)', value: '0m' });
    } else {
      total -= 3;
      components.push({ label: `Armadura pesada (${equippedArmor.name})`, value: '-3m' });
    }
  }

  const formulaParts = components.map((c) => `${c.value} (${c.label})`);
  return {
    value: total,
    formula: `${formulaParts.join(' ')} = ${total}m`,
    components,
  };
}

/**
 * Calcula a Capacidade de Carga (Espaços de inventário).
 * Base 10 + 3 * Força (mínimo 10). Mochila dá +2 espaços. Mochileiro dá +5.
 */
export function calculateMaxSpaces(
  attributes: CharacterAttributes,
  inventory: CharacterInventoryItem[],
  powerNames: string[] = []
): StatBreakdown {
  const forMod = attributes.for;
  let baseSpaces = 10 + forMod * 3;
  if (baseSpaces < 10) baseSpaces = 10;

  let total = baseSpaces;
  const components: { label: string; value: number | string }[] = [];
  components.push({ label: `Base (10 + 3×FOR [${forMod}])`, value: baseSpaces });

  // Mochila equipada / no inventário
  const hasBackpack = inventory.some((item) => item.equipmentId === 'mochila');
  if (hasBackpack) {
    total += 2;
    components.push({ label: 'Mochila de Aventureiro', value: 2 });
  }

  // Origem Mochileiro
  if (powerNames.includes('Mochileiro')) {
    total += 5;
    components.push({ label: 'Mochileiro', value: 5 });
  }

  const formulaParts = components.map((c) => `${c.value} (${c.label})`);
  return {
    value: total,
    formula: `${formulaParts.join(' + ')} = ${total} espaços`,
    components,
  };
}

/**
 * Calcula o bônus e breakdown completo de uma Perícia.
 * Fórmula T20 JdA:
 * Bônus = Metade do Nível + Modificador do Atributo-chave + Treinamento (+2) + Bônus Raciais/Poderes - Penalidade de Armadura (se aplicável).
 */
export function calculateSkillBonus(
  skillId: string,
  level: number,
  attributes: CharacterAttributes,
  isTrained: boolean,
  armorPenalty: number,
  raceId: string,
  powerNames: string[] = [],
  selectedRacialSkills: string[] = []
): { total: number; breakdown: StatBreakdown } {
  const skillDef = SKILLS_LIST.find((s) => s.id === skillId);
  if (!skillDef) {
    return {
      total: 0,
      breakdown: { value: 0, formula: '0', components: [] },
    };
  }

  const components: { label: string; value: number | string }[] = [];
  let total = 0;

  // Metade do nível arredondado para baixo
  const halfLevel = Math.floor(level / 2);
  total += halfLevel;
  components.push({ label: `Metade do Nível (Nível ${level})`, value: halfLevel });

  // Modificador de atributo
  const attrMod = attributes[skillDef.attribute] || 0;
  total += attrMod;
  components.push({
    label: `${skillDef.attribute.toUpperCase()} (${attrMod >= 0 ? '+' : ''}${attrMod})`,
    value: attrMod,
  });

  // Treinamento (+2 nos níveis 1-6; +4 nos níveis 7-14; +6 a partir do 15)
  if (isTrained) {
    let trainingBonus = 2;
    if (level >= 15) trainingBonus = 6;
    else if (level >= 7) trainingBonus = 4;

    total += trainingBonus;
    components.push({ label: 'Treinamento', value: trainingBonus });
  }

  // Bônus Raciais Específicos
  if (raceId === 'elfo' && (skillId === 'percepcao' || skillId === 'misticismo')) {
    total += 2;
    components.push({ label: 'Sentidos Élficos (Elfo)', value: 2 });
  } else if (raceId === 'goblin' && (skillId === 'ladinagem' || skillId === 'furtividade')) {
    total += 2;
    components.push({ label: 'Peste Esguia (Goblin)', value: 2 });
  } else if (raceId === 'hynne' && (skillId === 'furtividade' || skillId === 'reflexos')) {
    total += 2;
    components.push({ label: 'Pequeno e Ágil (Hynne)', value: 2 });
  } else if (raceId === 'kliren' && ['conhecimento', 'guerra', 'investigacao', 'misticismo', 'nobreza', 'oficio'].includes(skillId)) {
    total += 2;
    components.push({ label: 'Engenhosidade Kliren', value: 2 });
  } else if (raceId === 'lefou' && selectedRacialSkills.includes(skillId)) {
    total += 2;
    components.push({ label: 'Deformidade (Lefou)', value: 2 });
  }

  // Bônus de Poderes Gerais
  if (powerNames.includes('Esquiva') && skillId === 'reflexos') {
    total += 2;
    components.push({ label: 'Esquiva', value: 2 });
  }
  if (powerNames.includes('Vitalidade') && skillId === 'fortitude') {
    total += 2;
    components.push({ label: 'Vitalidade', value: 2 });
  }
  if (powerNames.includes('Vontade de Ferro') && skillId === 'vontade') {
    total += 2;
    components.push({ label: 'Vontade de Ferro', value: 2 });
  }
  if (powerNames.includes('Saque Rápido') && skillId === 'iniciativa') {
    total += 2;
    components.push({ label: 'Saque Rápido', value: 2 });
  }
  if (powerNames.includes('Atlético') && skillId === 'atletismo') {
    total += 2;
    components.push({ label: 'Atlético', value: 2 });
  }

  // Penalidade de Armadura (se perícia tem armorPenalty)
  if (skillDef.armorPenalty && armorPenalty !== 0) {
    total += armorPenalty; // armorPenalty já é negativo
    components.push({ label: 'Penalidade de Armadura', value: armorPenalty });
  }

  const formulaParts = components.map((c) => `${c.value} (${c.label})`);
  return {
    total,
    breakdown: {
      value: total,
      formula: `${formulaParts.join(' + ').replace(/\+ -/g, '- ')} = ${total >= 0 ? '+' : ''}${total}`,
      components,
    },
  };
}
