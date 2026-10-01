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
export function calculateArmorPenalty(
  inventory: CharacterInventoryItem[],
  activeConditions: string[] = []
): StatBreakdown {
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

  // Condição: Sobrecarregado (-5 penalidade de armadura e -3m deslocamento, pág. 395)
  if (activeConditions.includes('sobrecarregado')) {
    penalty -= 5;
    components.push({
      label: 'Condição: Sobrecarregado',
      value: -5,
    });
  }

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
    formula: `${formulaParts.join(' + ').replace(/\+ -/g, '- ')} = ${penalty}`,
    components,
  };
}

/**
 * Calcula a Defesa do personagem com fórmula e somatória detalhada.
 * Defesa = 10 + Des (se não usar armadura pesada) + Armadura + Escudo + Bônus Raciais/Classes/Poderes + Penalidades de Condições.
 * Referência: Tormenta 20 JDA Apêndice págs. 394–395.
 */
export function calculateDefense(
  level: number,
  attributes: CharacterAttributes,
  inventory: CharacterInventoryItem[],
  raceId: string,
  classId: string,
  powerNames: string[] = [],
  activeConditions: string[] = []
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

  // Penalidades Canônicas de Condições (T20 JDA Apêndice pág. 394–395)
  // Regra geral de não cumulatividade: aplica a condição mais severa
  let defenseCondPenalty = 0;
  let defenseCondLabel = '';
  if (activeConditions.includes('indefeso')) {
    defenseCondPenalty = -10;
    defenseCondLabel = 'Indefeso (-10)';
  } else if (
    activeConditions.includes('desprevenido') ||
    activeConditions.includes('imovel') ||
    activeConditions.includes('surpreendido') ||
    activeConditions.includes('cego') ||
    activeConditions.includes('agarrado') ||
    activeConditions.includes('atordoado')
  ) {
    defenseCondPenalty = -5;
    const condName = ['desprevenido', 'imovel', 'surpreendido', 'cego', 'agarrado', 'atordoado'].find((c) => activeConditions.includes(c)) || 'desprevenido';
    defenseCondLabel = `${condName.charAt(0).toUpperCase() + condName.slice(1)} (-5)`;
  } else if (
    activeConditions.includes('vulneravel') ||
    activeConditions.includes('enredado') ||
    activeConditions.includes('fatigado') ||
    activeConditions.includes('exausto')
  ) {
    defenseCondPenalty = -2;
    const condName = ['vulneravel', 'enredado', 'fatigado', 'exausto'].find((c) => activeConditions.includes(c)) || 'vulneravel';
    defenseCondLabel = `${condName.charAt(0).toUpperCase() + condName.slice(1)} (-2)`;
  }

  if (defenseCondPenalty !== 0) {
    total += defenseCondPenalty;
    components.push({ label: `Condição: ${defenseCondLabel}`, value: defenseCondPenalty });
  }

  const formulaParts = components.map((c) => `${c.value} (${c.label})`);
  return {
    value: total,
    formula: `${formulaParts.join(' + ').replace(/\+ -/g, '- ')} = ${total}`,
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
  powerNames: string[] = [],
  activeConditions: string[] = []
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

  // Condições que afetam deslocamento (T20 JDA Apêndice pág. 394–395)
  if (activeConditions.includes('imovel') || activeConditions.includes('paralisado')) {
    total = 0;
    components.push({ label: 'Condição: Imóvel', value: '0m' });
  } else if (activeConditions.includes('caido')) {
    total = 1.5;
    components.push({ label: 'Condição: Caído', value: '1,5m' });
  } else {
    if (activeConditions.includes('sobrecarregado')) {
      total = Math.max(1.5, total - 3);
      components.push({ label: 'Condição: Sobrecarregado', value: '-3m' });
    }
    if (
      activeConditions.includes('lento') ||
      activeConditions.includes('cego') ||
      activeConditions.includes('enredado') ||
      activeConditions.includes('exausto')
    ) {
      const condName = ['lento', 'cego', 'enredado', 'exausto'].find((c) => activeConditions.includes(c)) || 'lento';
      total = Math.max(1.5, Math.floor((total / 2) / 1.5) * 1.5);
      components.push({ label: `Condição: ${condName.charAt(0).toUpperCase() + condName.slice(1)} (Metade)`, value: `${total}m` });
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
  selectedRacialSkills: string[] = [],
  activeConditions: string[] = []
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

  // --- APLICAÇÃO CANÔNICA DE CONDIÇÕES (T20 JDA Apêndice págs. 394–395) ---
  // 1. Condições Mentais (INT, SAB, CAR) - Esmorecido (-5) / Frustrado (-2)
  if (['int', 'sab', 'car'].includes(skillDef.attribute)) {
    if (activeConditions.includes('esmorecido')) {
      total -= 5;
      components.push({ label: 'Condição: Esmorecido (Mental)', value: -5 });
    } else if (activeConditions.includes('frustrado')) {
      total -= 2;
      components.push({ label: 'Condição: Frustrado (Mental)', value: -2 });
    }
  }

  // 2. Condições Físicas (FOR, DES, CON) - Debilitado/Exausto (-5) / Fraco/Fatigado (-2)
  if (['for', 'des', 'con'].includes(skillDef.attribute)) {
    if (activeConditions.includes('debilitado') || activeConditions.includes('exausto')) {
      total -= 5;
      const label = activeConditions.includes('debilitado') ? 'Debilitado' : 'Exausto';
      components.push({ label: `Condição: ${label} (Físico)`, value: -5 });
    } else if (activeConditions.includes('fraco') || activeConditions.includes('fatigado')) {
      total -= 2;
      const label = activeConditions.includes('fraco') ? 'Fraco' : 'Fatigado';
      components.push({ label: `Condição: ${label} (Físico)`, value: -2 });
    }
  }

  // 3. Condições de Testes de Perícia Gerais - Apavorado (-5) / Abalado (-2)
  if (activeConditions.includes('apavorado')) {
    total -= 5;
    components.push({ label: 'Condição: Apavorado (Medo)', value: -5 });
  } else if (activeConditions.includes('abalado')) {
    total -= 2;
    components.push({ label: 'Condição: Abalado (Medo)', value: -2 });
  }

  // 4. Condições Específicas por Perícia
  if (skillId === 'percepcao') {
    if (activeConditions.includes('fascinado')) {
      total -= 5;
      components.push({ label: 'Condição: Fascinado', value: -5 });
    } else if (activeConditions.includes('ofuscado')) {
      total -= 2;
      components.push({ label: 'Condição: Ofuscado', value: -2 });
    }
    if (activeConditions.includes('cego')) {
      components.push({ label: 'Condição: Cego (Impossibilitado de testes visuais)', value: '0' });
    }
  }

  if (skillId === 'iniciativa' && activeConditions.includes('surdo')) {
    total -= 5;
    components.push({ label: 'Condição: Surdo', value: -5 });
  }

  if (skillId === 'reflexos') {
    if (activeConditions.includes('indefeso')) {
      components.push({ label: 'Condição: Indefeso (Falha automática)', value: 'Falha' });
    } else if (activeConditions.includes('desprevenido')) {
      total -= 5;
      components.push({ label: 'Condição: Desprevenido', value: -5 });
    }
  }

  if ((skillDef.attribute === 'for' || skillDef.attribute === 'des') && activeConditions.includes('cego')) {
    // Cego: -5 em perícias físicas (se já não penalizado por debilitado)
    if (!activeConditions.includes('debilitado') && !activeConditions.includes('exausto')) {
      total -= 5;
      components.push({ label: 'Condição: Cego (Perícia Física)', value: -5 });
    }
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

/**
 * Retorna a penalidade de ataque acumulada de condições para rolagens de ataque.
 * Referência: Tormenta 20 JDA Apêndice págs. 394–395.
 */
export function getAttackConditionPenalty(activeConditions: string[] = [], isMelee: boolean = true): { penalty: number; reasons: string[] } {
  const reasons: string[] = [];
  let penalty = 0;

  if (activeConditions.includes('debilitado') || activeConditions.includes('exausto')) {
    penalty -= 5;
    reasons.push(activeConditions.includes('debilitado') ? 'Debilitado (-5)' : 'Exausto (-5)');
  } else if (activeConditions.includes('fraco') || activeConditions.includes('fatigado')) {
    penalty -= 2;
    reasons.push(activeConditions.includes('fraco') ? 'Fraco (-2)' : 'Fatigado (-2)');
  }

  if (activeConditions.includes('apavorado')) {
    penalty -= 5;
    reasons.push('Apavorado (-5)');
  } else if (activeConditions.includes('abalado')) {
    penalty -= 2;
    reasons.push('Abalado (-2)');
  }

  if (activeConditions.includes('enredado')) {
    penalty -= 2;
    reasons.push('Enredado (-2)');
  }

  if (activeConditions.includes('ofuscado')) {
    penalty -= 2;
    reasons.push('Ofuscado (-2)');
  }

  if (activeConditions.includes('agarrado')) {
    penalty -= 2;
    reasons.push('Agarrado (-2)');
  }

  if (isMelee && activeConditions.includes('caido')) {
    penalty -= 5;
    reasons.push('Caído (-5 corpo a corpo)');
  }

  return { penalty, reasons };
}

/**
 * Retorna o atributo-chave de conjuração de uma classe.
 * Referência: Tormenta 20: Edição Jogo do Ano (v1.3), Capítulo 1 e Capítulo 4.
 */
export function getSpellcastingKeyAttribute(classId: string, subclass?: string): AttributeKey {
  const normClass = classId.toLowerCase();
  if (normClass === 'arcanista') {
    if (subclass && subclass.toLowerCase().includes('feiticeiro')) {
      return 'car';
    }
    return 'int'; // Mago ou Bruxo
  }
  if (normClass === 'bardo') return 'car';
  if (normClass === 'clerigo' || normClass === 'clérigo') return 'sab';
  if (normClass === 'druida') return 'sab';
  if (normClass === 'paladino') return 'car';
  return 'int';
}

/**
 * Calcula a Classe de Dificuldade (CD) para resistir às magias do conjurador.
 * Fórmula Oficial T20 JDA (Cap. 4, pág. 179):
 * CD = 10 + Metade do Nível + Modificador do Atributo-Chave + Outros Modificadores
 */
export function calculateSpellSaveDc(
  level: number,
  keyAttrMod: number,
  keyAttrName: string = 'Atributo-Chave',
  otherBonus: number = 0,
  otherBonusLabel: string = 'Outros'
): StatBreakdown {
  const halfLevel = Math.floor(level / 2);
  const components: { label: string; value: number | string }[] = [
    { label: 'Base', value: 10 },
    { label: `Metade do Nível (${halfLevel})`, value: halfLevel },
    { label: `${keyAttrName} (${keyAttrMod >= 0 ? '+' : ''}${keyAttrMod})`, value: keyAttrMod },
  ];

  let total = 10 + halfLevel + keyAttrMod;
  if (otherBonus !== 0) {
    total += otherBonus;
    components.push({ label: `${otherBonusLabel} (${otherBonus >= 0 ? '+' : ''}${otherBonus})`, value: otherBonus });
  }

  const formulaParts = components.map((c) => `${c.value} (${c.label})`);
  return {
    value: total,
    formula: `${formulaParts.join(' + ').replace(/\+ -/g, '- ')} = CD ${total}`,
    components,
  };
}

/**
 * Calcula o limite máximo de PM que um personagem pode gastar numa mesma magia.
 * Referência Oficial T20 JDA (Cap. 4, pág. 178):
 * Limite de PM = Nível do Personagem (+ Atributo se possuir Magia Ilimitada)
 */
export function calculateMaxSpellCost(
  characterLevel: number,
  hasUnlimitedMagic: boolean = false,
  keyAttrMod: number = 0
): { maxCost: number; breakdown: StatBreakdown } {
  const components: { label: string; value: number | string }[] = [
    { label: `Nível do Personagem (${characterLevel})`, value: characterLevel },
  ];
  let maxCost = characterLevel;

  if (hasUnlimitedMagic && keyAttrMod > 0) {
    maxCost += keyAttrMod;
    components.push({ label: `Magia Ilimitada (+${keyAttrMod})`, value: keyAttrMod });
  }

  const formulaParts = components.map((c) => `${c.value} (${c.label})`);
  return {
    maxCost,
    breakdown: {
      value: maxCost,
      formula: `${formulaParts.join(' + ')} = ${maxCost} PM máximo por magia`,
      components,
    },
  };
}

/**
 * Retorna o círculo máximo de magias que uma classe conjuradora atinge com base no seu nível.
 * Referência Oficial T20 JDA (Cap. 1 e Cap. 4, pág. 178):
 * 1º ao 4º nível: 1º círculo
 * 5º ao 8º nível: 2º círculo
 * 9º ao 12º nível: 3º círculo
 * 13º ao 16º nível: 4º círculo
 * 17º ao 20º nível: 5º círculo
 */
export function calculateSpellCircleUnlocked(classLevel: number): 1 | 2 | 3 | 4 | 5 {
  if (classLevel >= 17) return 5;
  if (classLevel >= 13) return 4;
  if (classLevel >= 9) return 3;
  if (classLevel >= 5) return 2;
  return 1;
}

/**
 * Recalcula integralmente todas as estatísticas da ficha do personagem,
 * garantindo coerência matemática após level-up, mudanças de itens ou poderes.
 */
export function recalculateFullCharacterSheet(character: any): any {
  const level = character.level || 1;
  const attrs = character.totalAttributes || { for: 0, des: 0, con: 0, int: 0, sab: 0, car: 0 };
  const raceId = character.raceId;
  const classId = character.classId;
  const inventory = character.inventory || [];
  const powerNames = (character.powers || []).map((p: any) => p.name);
  const selectedRacialSkills = character.selectedRacialSkills || [];
  const activeConditions = character.activeConditions || [];

  // Cálculos de Defesa, PV, PM, Velocidade, Penalidade e Carga (incorporando condições ativas)
  const armorPenaltyBreakdown = calculateArmorPenalty(inventory, activeConditions);
  const defenseBreakdown = calculateDefense(level, attrs, inventory, raceId, classId, powerNames, activeConditions);
  const maxHpBreakdown = calculateMaxHp(level, attrs, classId, raceId, powerNames);
  const maxMpBreakdown = calculateMaxMp(level, classId, raceId, powerNames);
  const speedBreakdown = calculateSpeed(raceId, inventory, powerNames, activeConditions);
  const maxSpacesBreakdown = calculateMaxSpaces(attrs, inventory, powerNames);

  // Espaços ocupados atuais
  let currentSpaces = 0;
  inventory.forEach((item: any) => {
    currentSpaces += (item.spaces || 0) * (item.quantity || 1);
  });

  // Recalcula todas as 29 perícias com bônus e penalidades canônicas de condições
  const recalculatedSkills: Record<string, any> = {};
  SKILLS_LIST.forEach((skDef) => {
    const existing = character.skills?.[skDef.id];
    const isTrained = Boolean(existing?.isTrained);
    const { total, breakdown } = calculateSkillBonus(
      skDef.id,
      level,
      attrs,
      isTrained,
      armorPenaltyBreakdown.value,
      raceId,
      powerNames,
      selectedRacialSkills,
      activeConditions
    );

    recalculatedSkills[skDef.id] = {
      id: skDef.id,
      name: skDef.name,
      attribute: skDef.attribute,
      isTrained,
      total,
      breakdown,
      source: existing?.source || 'custom',
    };
  });

  return {
    ...character,
    stats: {
      ...character.stats,
      maxHp: maxHpBreakdown,
      currentHp: Math.min(maxHpBreakdown.value, character.stats?.currentHp ?? maxHpBreakdown.value),
      tempHp: character.stats?.tempHp ?? 0,
      maxMp: maxMpBreakdown,
      currentMp: Math.min(maxMpBreakdown.value, character.stats?.currentMp ?? maxMpBreakdown.value),
      tempMp: character.stats?.tempMp ?? 0,
      defense: defenseBreakdown,
      speed: speedBreakdown,
      armorPenalty: armorPenaltyBreakdown,
      maxSpaces: maxSpacesBreakdown,
      currentSpaces,
    },
    skills: recalculatedSkills,
    activeConditions,
    updatedAt: new Date().toISOString(),
  };
}
