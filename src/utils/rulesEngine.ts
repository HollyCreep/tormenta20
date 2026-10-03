/**
 * Motor de regras — Tormenta 20: Edição Jogo do Ano (v1.3).
 *
 * Toda fórmula cita o livro. Efeitos passivos de raças, classes e poderes ficam em
 * ./passiveEffects.ts; efeitos de condições, em ./conditionEffects.ts.
 */
import type { CharacterAttributes, StatBreakdown, TrainedSkillData, CharacterInventoryItem } from '../types/character';
import type { AttributeKey } from '../types/rules';
import { RACES_LIST } from '../data/races';
import { CLASSES_LIST } from '../data/classes';
import { SKILLS_LIST } from '../data/skills';
import { getConditionEffects } from './conditionEffects';
import {
  type Contribution,
  type RulesInput,
  classLevelOf,
  collectPassiveEffects,
  equippedArmor,
  equippedShield,
  skillAttributeFor,
  wearsHeavyArmor,
} from './passiveEffects';
import { hasRaceAbility } from './raceAbilities';

export type { RulesInput } from './passiveEffects';

const signed = (n: number) => (n >= 0 ? `+${n}` : `${n}`);

function breakdown(components: StatBreakdown['components'], total: number, suffix = ''): StatBreakdown {
  const formula = components.map((c) => `${c.value} (${c.label})`).join(' + ').replace(/\+ -/g, '- ');
  return { value: total, formula: `${formula} = ${total}${suffix}`, components };
}

/* ==========================================================================
   Atributos
   ========================================================================== */

/** Modificadores raciais (Tabela 1-2, Cap. 1, pág. 18). */
export function calculateRacialModifiers(
  raceId: string,
  subraceId?: string,
  selectedRacialAttributes?: AttributeKey[]
): CharacterAttributes {
  const mods: CharacterAttributes = { for: 0, des: 0, con: 0, int: 0, sab: 0, car: 0 };
  const race = RACES_LIST.find((r) => r.id === raceId);
  if (!race) return mods;
  Object.entries(race.attributeModifiers).forEach(([key, val]) => {
    if (val !== undefined && key in mods) mods[key as AttributeKey] += val;
  });
  // +1 em três atributos diferentes (Humano, Lefou exceto Car, Osteon exceto Con, Sereia)
  if (race.isSelectableAttributes && selectedRacialAttributes) {
    const bonus = race.selectableAttributesBonus || 1;
    selectedRacialAttributes
      .filter((k) => !race.selectableAttributesExclude?.includes(k))
      .forEach((k) => {
        if (k in mods) mods[k] += bonus;
      });
  }
  if (race.customSelections?.requiresSubrace) {
    const sub = race.customSelections.subraces?.find((s) => s.id === subraceId) || race.customSelections.subraces?.[0];
    Object.entries(sub?.attributeModifiers || {}).forEach(([key, val]) => {
      if (val !== undefined && key in mods) mods[key as AttributeKey] += val;
    });
  }
  return mods;
}

/** O valor do atributo É o modificador (Cap. 1, pág. 17). */
export function calculateTotalAttributes(base: CharacterAttributes, racial: CharacterAttributes): CharacterAttributes {
  return {
    for: (base.for || 0) + (racial.for || 0),
    des: (base.des || 0) + (racial.des || 0),
    con: (base.con || 0) + (racial.con || 0),
    int: (base.int || 0) + (racial.int || 0),
    sab: (base.sab || 0) + (racial.sab || 0),
    car: (base.car || 0) + (racial.car || 0),
  };
}

/* ==========================================================================
   Carga — Cap. 3, pág. 141
   ========================================================================== */

/** Espaços ocupados (cada item × quantidade). */
export const currentSpacesOf = (inventory: CharacterInventoryItem[]) =>
  inventory.reduce((acc, item) => acc + (item.spaces || 0) * (item.quantity || 1), 0);

/**
 * "Você pode carregar 10 espaços +2 por ponto de Força (ou –1 por ponto de Força negativo)."
 * A mochila não ocupa nem concede espaço. Máximo absoluto: o dobro do limite (pág. 141).
 */
export function calculateMaxSpaces(input: RulesInput, effects = collectPassiveEffects(input)): StatBreakdown {
  const f = input.attributes.for || 0;
  const base = 10 + (f >= 0 ? 2 * f : f);
  const components: StatBreakdown['components'] = [{ label: `Base (10 ${f >= 0 ? `+ 2×For` : '– 1 por For negativa'} [${f}])`, value: base }];
  let total = base;
  effects
    .filter((e) => e.spaces)
    .forEach((e) => {
      total += e.spaces!;
      components.push({ label: e.source, value: e.spaces! });
    });
  return breakdown(components, total, ' espaços');
}

/** Sobrecarregado: acima do limite de carga (pág. 141) ou pela condição (Apêndice, pág. 395). */
export function isOverloaded(input: RulesInput): boolean {
  return currentSpacesOf(input.inventory) > calculateMaxSpaces(input).value || (input.activeConditions || []).includes('sobrecarregado');
}

/* ==========================================================================
   Proficiências
   ========================================================================== */

const has = (input: RulesInput, name: string) => (input.powerNames || []).includes(name);
const classDef = (id: string) => CLASSES_LIST.find((c) => c.id === id);
/** Proficiências vêm só da primeira classe (Cap. 1, pág. 35). */
const proficienciesOf = (input: RulesInput) => classDef(input.classId)?.proficiencies;

/** Usa armadura ou escudo sem proficiência? (Cap. 3, pág. 152) */
export function armorNonProficiency(input: RulesInput): string[] {
  const prof = proficienciesOf(input);
  const out: string[] = [];
  const armor = equippedArmor(input.inventory);
  // Todos sabem usar armaduras leves (Cap. 1, pág. 32)
  if (armor?.category === 'armadura_pesada' && !prof?.armor.includes('pesadas') && !has(input, 'Proficiência')) out.push(armor.name);
  const shield = equippedShield(input.inventory);
  if (shield && !prof?.shields && !has(input, 'Proficiência')) out.push(shield.name);
  return out;
}

/** Proficiente na arma? Simples para todos; marciais por classe; Anão e Sereia tratam algumas como simples. */
export function isWeaponProficient(input: RulesInput, weapon: Pick<CharacterInventoryItem, 'category' | 'name' | 'equipmentId'>): boolean {
  const cat = weapon.category;
  if (!cat.startsWith('arma')) return true;
  if (cat === 'arma_simples') return true;
  const name = `${weapon.name} ${weapon.equipmentId || ''}`.toLowerCase();
  // Tradição de Heredrimm: machados, martelos, marretas e picaretas são armas simples (pág. 20)
  if (hasRaceAbility(input, 'anao_tradicao_heredrimm') && /machad|martel|marreta|picareta/.test(name)) return true;
  // Mestre do Tridente: o tridente é uma arma simples (pág. 30)
  if (hasRaceAbility(input, 'sereia_mestre_tridente') && /tridente/.test(name)) return true;
  const weapons = proficienciesOf(input)?.weapons || [];
  if (cat === 'arma_marcial') return weapons.includes('marciais') || has(input, 'Proficiência');
  if (cat === 'arma_fogo') return weapons.includes('fogo') || hasRaceAbility(input, 'kliren_vanguardista') || has(input, 'Proficiência');
  if (cat === 'arma_exotica') return weapons.includes('exoticas') || has(input, 'Proficiência');
  return true;
}

/* ==========================================================================
   Penalidade de armadura — Cap. 3, págs. 141 e 152–153
   ========================================================================== */

export function calculateArmorPenalty(input: RulesInput, effects = collectPassiveEffects(input)): StatBreakdown {
  const components: StatBreakdown['components'] = [];
  let total = 0;
  // "Penalidades de armaduras e escudos se acumulam" (pág. 153)
  input.inventory
    .filter((it) => it.isEquipped && it.armorPenalty && (it.category.startsWith('armadura') || it.category === 'escudo'))
    .forEach((it) => {
      total += it.armorPenalty!;
      components.push({ label: it.name, value: it.armorPenalty! });
    });
  effects
    .filter((e) => e.armorPenalty)
    .forEach((e) => {
      total += e.armorPenalty!;
      components.push({ label: e.source, value: e.armorPenalty! });
    });
  if (isOverloaded(input)) {
    total -= 5;
    components.push({ label: 'Sobrecarregado (Cap. 3, pág. 141)', value: -5 });
  }
  if (!components.length) return { value: 0, formula: '0 (sem penalidade de armadura)', components: [{ label: 'Sem penalidade', value: 0 }] };
  return breakdown(components, total);
}

/* ==========================================================================
   Deslocamento
   ========================================================================== */

export function calculateSpeed(input: RulesInput, effects = collectPassiveEffects(input)): StatBreakdown {
  const race = RACES_LIST.find((r) => r.id === input.raceId);
  const base = race ? race.speed : 9;
  const components: StatBreakdown['components'] = [{ label: `Raça (${race?.name || 'base'})`, value: `${base}m` }];
  let total = base;
  // Anão (Devagar e Sempre, pág. 20) e Golem (Chassi, pág. 27): não reduz por armadura nem carga
  const immune = hasRaceAbility(input, 'anao_devagar_sempre') || input.raceId === 'golem';

  effects
    .filter((e) => e.speed)
    .forEach((e) => {
      total += e.speed!;
      components.push({ label: e.source, value: `${signed(e.speed!)}m` });
    });
  // Armadura pesada: deslocamento –3m (Cap. 3, pág. 152); Fanático anula (Cap. 2, pág. 128)
  const armor = equippedArmor(input.inventory);
  if (armor?.category === 'armadura_pesada') {
    if (immune) components.push({ label: `${armor.name} (sem redução: ${race?.name})`, value: '0m' });
    else if (has(input, 'Fanático')) components.push({ label: `${armor.name} (sem redução: Fanático)`, value: '0m' });
    else {
      total -= 3;
      components.push({ label: `Armadura pesada (${armor.name})`, value: '-3m' });
    }
  }
  if (isOverloaded(input)) {
    if (immune) components.push({ label: `Sobrecarregado (sem redução: ${race?.name})`, value: '0m' });
    else {
      total -= 3;
      components.push({ label: 'Sobrecarregado (Cap. 3, pág. 141)', value: '-3m' });
    }
  }
  const cond = getConditionEffects(input.activeConditions);
  if (cond.speedZero) {
    total = 0;
    components.push({ label: 'Imóvel', value: '0m' });
  } else {
    if (cond.speedProne) {
      total = Math.min(total, 1.5);
      components.push({ label: 'Caído (deslocamento 1,5m)', value: '1,5m' });
    }
    if (cond.speedHalf) {
      // "reduzidas à metade (arredonde para baixo para o primeiro incremento de 1,5m)" (pág. 395)
      total = Math.max(1.5, Math.floor(total / 2 / 1.5) * 1.5);
      components.push({ label: 'Lento (metade)', value: `${total}m` });
    }
  }
  total = Math.max(0, total);
  return { value: total, formula: `${components.map((c) => `${c.value} (${c.label})`).join(' ')} = ${total}m`, components };
}

/* ==========================================================================
   Defesa — Cap. 1, pág. 106; Cap. 3, pág. 152
   ========================================================================== */

export function calculateDefense(input: RulesInput, effects = collectPassiveEffects(input)): StatBreakdown {
  const a = input.attributes;
  const components: StatBreakdown['components'] = [{ label: 'Base', value: 10 }];
  let total = 10;
  const heavy = wearsHeavyArmor(input.inventory);
  const cond = getConditionEffects(input.activeConditions);
  const nobleLevel = classLevelOf(input, 'nobre');

  // "Sua Defesa é 10 + sua Destreza + seu bônus de armadura e escudo"; armadura pesada não aplica atributo
  let defAttr: AttributeKey | null = heavy ? null : 'des';
  // Nobre — Autoconfiança: pode usar Carisma em vez de Destreza (Cap. 1, pág. 79)
  if (defAttr && nobleLevel > 0 && a.car > a.des) defAttr = 'car';
  if (defAttr) {
    total += a[defAttr];
    components.push({ label: defAttr === 'car' ? 'Carisma (Autoconfiança)' : 'Destreza', value: a[defAttr] });
  } else {
    components.push({ label: 'Atributo (não se aplica com armadura pesada)', value: 0 });
  }

  const armor = equippedArmor(input.inventory);
  if (armor?.defenseBonus) {
    total += armor.defenseBonus;
    components.push({ label: armor.name, value: armor.defenseBonus });
  }
  const shield = equippedShield(input.inventory);
  if (shield?.defenseBonus) {
    total += shield.defenseBonus;
    components.push({ label: shield.name, value: shield.defenseBonus });
  }

  // Bucaneiro — Insolência: soma Carisma, limitado pelo nível; não com armadura pesada nem imóvel (Cap. 1, pág. 47)
  const bucLevel = classLevelOf(input, 'bucaneiro');
  if (bucLevel > 0 && !heavy && !cond.speedZero && defAttr !== 'car' && a.car > 0) {
    const v = Math.min(a.car, input.level);
    total += v;
    components.push({ label: 'Insolência (Bucaneiro)', value: v });
  }
  // Lutador — Casca Grossa: 3º nível soma Constituição, limitado pelo nível, sem armadura pesada (Cap. 1, pág. 77)
  if (classLevelOf(input, 'lutador') >= 3 && !heavy && a.con > 0) {
    const v = Math.min(a.con, input.level);
    total += v;
    components.push({ label: 'Casca Grossa — Constituição (Lutador)', value: v });
  }

  effects
    .filter((e) => e.defense)
    .forEach((e) => {
      total += e.defense!;
      components.push({ label: e.source, value: e.defense! });
    });
  // Atributo extra na Defesa, limitado pelo nível (Braços Calejados); não soma o mesmo atributo duas vezes
  effects
    .filter((e) => e.defenseAttribute && e.defenseAttribute !== defAttr && a[e.defenseAttribute] > 0)
    .forEach((e) => {
      const v = Math.min(a[e.defenseAttribute!], input.level);
      total += v;
      components.push({ label: e.source, value: v });
    });

  // Condições: mesmo efeito não acumula, vale o mais severo (Apêndice, pág. 394)
  if (cond.defense) {
    total += cond.defense.value;
    components.push({ label: `Condição: ${cond.defense.label}`, value: cond.defense.value });
  }
  if (cond.prone) components.push({ label: 'Caído: –5 contra corpo a corpo, +5 contra distância', value: '±5' });

  return breakdown(components, total);
}

/* ==========================================================================
   Pontos de vida e de mana — Cap. 1 (classes)
   ========================================================================== */

/** Classes em ordem: a primeira usa PV iniciais; as demais, PV por nível (Cap. 1, pág. 35). */
function classEntries(input: RulesInput): { id: string; levels: number }[] {
  const levels = input.classLevels && Object.keys(input.classLevels).length ? input.classLevels : { [input.classId]: input.level };
  const first = input.classId in levels ? input.classId : Object.keys(levels)[0];
  return [first, ...Object.keys(levels).filter((k) => k !== first)].map((id) => ({ id, levels: levels[id] }));
}

export function calculateMaxHp(input: RulesInput, effects = collectPassiveEffects(input)): StatBreakdown {
  // Dom da Esperança: soma Sabedoria em vez de Constituição (Cap. 2, pág. 133)
  const useSab = has(input, 'Dom da Esperança');
  const attr = useSab ? input.attributes.sab : input.attributes.con;
  const attrLabel = useSab ? 'Sab (Dom da Esperança)' : 'Con';
  const components: StatBreakdown['components'] = [];
  let total = 0;
  classEntries(input).forEach(({ id, levels }, idx) => {
    const cls = classDef(id);
    if (!cls || levels <= 0) return;
    if (idx === 0) {
      total += cls.hpInitial + attr;
      components.push({ label: `${cls.name} 1º nível (${cls.hpInitial} + ${attrLabel})`, value: cls.hpInitial + attr });
      if (levels > 1) {
        const v = (levels - 1) * (cls.hpPerLevel + attr);
        total += v;
        components.push({ label: `${cls.name} níveis 2–${levels} (${levels - 1} × ${cls.hpPerLevel + attr})`, value: v });
      }
    } else {
      // Nova classe: PV de um nível subsequente, não do primeiro (Cap. 1, pág. 35)
      const v = levels * (cls.hpPerLevel + attr);
      total += v;
      components.push({ label: `${cls.name} (${levels} × ${cls.hpPerLevel + attr})`, value: v });
    }
  });
  effects
    .filter((e) => e.hp)
    .forEach((e) => {
      total += e.hp!;
      components.push({ label: e.source, value: e.hp! });
    });
  // Sarado: soma Força no total de PV (Cap. 1, pág. 77)
  effects
    .filter((e) => e.hpAttribute)
    .forEach((e) => {
      total += input.attributes[e.hpAttribute!];
      components.push({ label: e.source, value: input.attributes[e.hpAttribute!] });
    });
  return breakdown(components, Math.max(1, total));
}

/** Atributo-chave de magias da classe (Cap. 1: arcanista pág. 37, bardo pág. 44, clérigo pág. 57, druida pág. 61). */
export function getSpellcastingKeyAttribute(classId: string, subclass?: string): AttributeKey {
  const c = classId.toLowerCase();
  if (c === 'arcanista') return (subclass || '').toLowerCase().includes('feiticeiro') ? 'car' : 'int'; // Bruxo e Mago: Int
  if (c === 'bardo') return 'car';
  if (c === 'clerigo' || c === 'clérigo' || c === 'druida') return 'sab';
  if (c === 'paladino') return 'car';
  return 'int';
}

export function calculateMaxMp(input: RulesInput, effects = collectPassiveEffects(input)): StatBreakdown {
  const components: StatBreakdown['components'] = [];
  let total = 0;
  const summedAttrs = new Set<AttributeKey>();
  classEntries(input).forEach(({ id, levels }) => {
    const cls = classDef(id);
    if (!cls || levels <= 0) return;
    // "Some os PM fornecidos por cada classe" (Cap. 1, pág. 35)
    const v = cls.mpPerLevel * levels;
    total += v;
    components.push({ label: `${cls.name} (${cls.mpPerLevel} × ${levels})`, value: v });
    // Conjuradores somam o atributo-chave no total de PM; Paladino (Abençoado) soma Carisma (pág. 82)
    const key: AttributeKey | null = cls.spellcaster ? getSpellcastingKeyAttribute(id, id === input.classId ? input.classSubclass : undefined) : id === 'paladino' ? 'car' : null;
    if (key && !summedAttrs.has(key)) {
      summedAttrs.add(key);
      total += input.attributes[key];
      components.push({ label: `${key === 'car' ? 'Carisma' : key === 'sab' ? 'Sabedoria' : 'Inteligência'} (${cls.name})`, value: input.attributes[key] });
    }
  });
  effects
    .filter((e) => e.mp)
    .forEach((e) => {
      total += e.mp!;
      components.push({ label: e.source, value: e.mp! });
    });
  // Poderes que somam atributo nos PM (Totem Espiritual, Elo com a Natureza): mesmo atributo não acumula
  effects
    .filter((e) => e.mpAttribute && !summedAttrs.has(e.mpAttribute))
    .forEach((e) => {
      summedAttrs.add(e.mpAttribute!);
      total += input.attributes[e.mpAttribute!];
      components.push({ label: e.source, value: input.attributes[e.mpAttribute!] });
    });
  return breakdown(components, Math.max(0, total));
}

/* ==========================================================================
   Perícias — Cap. 2, págs. 114–115
   ========================================================================== */

const FOR_DES_SKILLS = new Set(SKILLS_LIST.filter((s) => s.attribute === 'for' || s.attribute === 'des').map((s) => s.id));

/**
 * Valor de perícia = metade do nível + atributo-chave + treino (+2; +4 no 7º; +6 no 15º) + outros (pág. 114).
 * Penalidade de armadura em Acrobacia, Furtividade e Ladinagem (Tabela 2-1); sem proficiência, em todas as
 * perícias de Força e Destreza (Cap. 3, pág. 152). Condições: Apêndice, págs. 394–395.
 */
export function calculateSkillBonus(
  skillId: string,
  isTrained: boolean,
  input: RulesInput,
  effects = collectPassiveEffects(input)
): { total: number; breakdown: StatBreakdown } {
  const def = SKILLS_LIST.find((s) => s.id === skillId);
  if (!def) return { total: 0, breakdown: { value: 0, formula: '0', components: [] } };
  const a = input.attributes;
  const components: StatBreakdown['components'] = [];
  let total = 0;

  const half = Math.floor(input.level / 2);
  total += half;
  components.push({ label: `Metade do nível (${input.level})`, value: half });

  const attr = skillAttributeFor(skillId, def.attribute, effects, a);
  total += a[attr];
  components.push({ label: `${attr.toUpperCase()}${attr !== def.attribute ? ' (em vez de ' + def.attribute.toUpperCase() + ')' : ''}`, value: a[attr] });

  if (isTrained) {
    const t = input.level >= 15 ? 6 : input.level >= 7 ? 4 : 2;
    total += t;
    components.push({ label: 'Treinamento', value: t });
  }

  effects.forEach((e) => {
    const v = e.skills?.[skillId];
    if (v) {
      total += v;
      components.push({ label: e.source, value: v });
    }
  });
  // Investigador: soma Inteligência em Intuição (Cap. 2, pág. 130)
  if (skillId === 'intuicao' && has(input, 'Investigador') && a.int) {
    total += a.int;
    components.push({ label: 'Investigador (Int)', value: a.int });
  }

  const penalty = calculateArmorPenalty(input, effects).value;
  const nonProf = armorNonProficiency(input).length > 0;
  if (penalty && (def.armorPenalty || (nonProf && FOR_DES_SKILLS.has(skillId)))) {
    total += penalty;
    components.push({ label: nonProf && !def.armorPenalty ? 'Penalidade de armadura (sem proficiência)' : 'Penalidade de armadura', value: penalty });
  }

  const cond = getConditionEffects(input.activeConditions);
  const add = (p: { value: number; label: string } | null) => {
    if (!p) return;
    total += p.value;
    components.push({ label: `Condição: ${p.label}`, value: p.value });
  };
  add(cond.allSkills);
  if (['for', 'des', 'con'].includes(attr)) {
    // Cego (–5 em perícias de For/Des) e debilitado/fraco têm o mesmo efeito: vale o mais severo
    const blind = cond.blindPhysical && (attr === 'for' || attr === 'des') ? { value: -5, label: 'Cego' } : null;
    add([cond.physical, blind].filter(Boolean).sort((x, y) => x!.value - y!.value)[0] || null);
  }
  if (['int', 'sab', 'car'].includes(attr)) add(cond.mental);
  if (skillId === 'percepcao') add(cond.perception);
  if (skillId === 'iniciativa') add(cond.initiative);
  if (skillId === 'reflexos') {
    if (cond.reflexAutoFail) components.push({ label: 'Condição: Indefeso (falha automática)', value: 'falha' });
    else add(cond.reflex);
  }

  return { total, breakdown: { ...breakdown(components, total), formula: `${breakdown(components, total).formula.replace(/ = -?\d+$/, '')} = ${signed(total)}` } };
}

/* ==========================================================================
   Magias — Cap. 4
   ========================================================================== */

/** CD = 10 + metade do nível + atributo-chave da magia (Cap. 4, pág. 173). */
export function calculateSpellSaveDc(
  level: number,
  keyAttrMod: number,
  keyAttrName: string = 'Atributo-chave',
  otherBonus: number = 0,
  otherBonusLabel: string = 'Outros'
): StatBreakdown {
  const half = Math.floor(level / 2);
  const components: StatBreakdown['components'] = [
    { label: 'Base', value: 10 },
    { label: `Metade do nível (${half})`, value: half },
    { label: `${keyAttrName} (${signed(keyAttrMod)})`, value: keyAttrMod },
  ];
  let total = 10 + half + keyAttrMod;
  if (otherBonus) {
    total += otherBonus;
    components.push({ label: `${otherBonusLabel} (${signed(otherBonus)})`, value: otherBonus });
  }
  const b = breakdown(components, total);
  return { ...b, formula: b.formula.replace(/= (\d+)$/, '= CD $1') };
}

/**
 * Limite de PM por magia: "o máximo de PM que você pode gastar por uso é igual ao seu nível na classe que
 * fornece a habilidade"; para raça, origem e poderes gerais, o nível de personagem (Cap. 5, pág. 224;
 * Cap. 4, pág. 171). Magia Ilimitada soma o atributo-chave (Cap. 2, pág. 131).
 */
export function calculateMaxSpellCost(
  levelLimit: number,
  hasUnlimitedMagic: boolean = false,
  keyAttrMod: number = 0
): { maxCost: number; breakdown: StatBreakdown } {
  const components: StatBreakdown['components'] = [{ label: `Nível (${levelLimit})`, value: levelLimit }];
  let maxCost = levelLimit;
  if (hasUnlimitedMagic && keyAttrMod > 0) {
    maxCost += keyAttrMod;
    components.push({ label: `Magia Ilimitada (${signed(keyAttrMod)})`, value: keyAttrMod });
  }
  const b = breakdown(components, maxCost, ' PM por magia');
  return { maxCost, breakdown: b };
}

/**
 * Círculo máximo de magias que a classe pode lançar no nível de classe informado.
 * - Arcanista e Clérigo: 2º no 5º nível, 3º no 9º, 4º no 13º, 5º no 17º (Cap. 1, págs. 37 e 57).
 * - Bardo e Druida: 2º no 6º nível, 3º no 10º e 4º no 14º (máximo 4º) (Cap. 1, págs. 44 e 61).
 */
export function calculateSpellCircleUnlocked(classLevel: number, classId?: string): 1 | 2 | 3 | 4 | 5 {
  if (classId === 'bardo' || classId === 'druida') {
    if (classLevel >= 14) return 4;
    if (classLevel >= 10) return 3;
    if (classLevel >= 6) return 2;
    return 1;
  }
  if (classLevel >= 17) return 5;
  if (classLevel >= 13) return 4;
  if (classLevel >= 9) return 3;
  if (classLevel >= 5) return 2;
  return 1;
}

/**
 * Magias de 1º círculo no 1º nível: Arcanista 3 (Mago 4), Bardo 2, Clérigo 3, Druida 2
 * (Cap. 1, págs. 37, 44, 57 e 61).
 */
export function startingSpellCount(classId: string, subclass?: string): number {
  const cls = CLASSES_LIST.find((c) => c.id === classId);
  const base = cls?.spellcaster?.circle1Count || 0;
  return classId === 'arcanista' && subclass === 'mago' ? base + 1 : base;
}

/* ==========================================================================
   Ficha completa
   ========================================================================== */

/** Entrada do motor a partir de uma ficha salva. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function rulesInputFromCharacter(character: any): RulesInput {
  const classLevels = character.classes?.length
    ? Object.fromEntries(character.classes.map((c: { classId: string; level: number }) => [c.classId, c.level]))
    : undefined;
  return {
    level: character.level || 1,
    classId: character.classId,
    classSubclass: character.classSubclass,
    classLevels,
    raceId: character.raceId,
    subraceId: character.subraceId,
    attributes: character.totalAttributes || { for: 0, des: 0, con: 0, int: 0, sab: 0, car: 0 },
    inventory: character.inventory || [],
    powerNames: (character.powers || []).map((p: { name: string }) => p.name),
    activeConditions: character.activeConditions || [],
    selectedRacialSkills: character.raceId === 'lefou' ? character.selectedRacialSkills || [] : [],
    racialChoices: character.racialChoices,
  };
}

/** Todas as estatísticas derivadas de uma entrada. */
export function computeDerivedStats(input: RulesInput) {
  const effects = collectPassiveEffects(input);
  return {
    effects,
    armorPenalty: calculateArmorPenalty(input, effects),
    defense: calculateDefense(input, effects),
    maxHp: calculateMaxHp(input, effects),
    maxMp: calculateMaxMp(input, effects),
    speed: calculateSpeed(input, effects),
    maxSpaces: calculateMaxSpaces(input, effects),
    currentSpaces: currentSpacesOf(input.inventory),
  };
}

/**
 * Recalcula integralmente todas as estatísticas da ficha, garantindo coerência após subir de nível,
 * mudanças de itens, poderes ou condições.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function recalculateFullCharacterSheet(character: any): any {
  const input = rulesInputFromCharacter(character);
  const d = computeDerivedStats(input);
  const skills: Record<string, TrainedSkillData> = {};
  SKILLS_LIST.forEach((sk) => {
    const existing = character.skills?.[sk.id];
    const isTrained = Boolean(existing?.isTrained);
    const { total, breakdown: b } = calculateSkillBonus(sk.id, isTrained, input, d.effects);
    skills[sk.id] = { ...(existing || {}), id: sk.id, name: sk.name, attribute: sk.attribute, isTrained, total, breakdown: b, source: existing?.source || 'custom' };
  });
  return {
    ...character,
    stats: {
      ...character.stats,
      maxHp: d.maxHp,
      currentHp: Math.min(d.maxHp.value, character.stats?.currentHp ?? d.maxHp.value),
      tempHp: character.stats?.tempHp ?? 0,
      maxMp: d.maxMp,
      currentMp: Math.min(d.maxMp.value, character.stats?.currentMp ?? d.maxMp.value),
      tempMp: character.stats?.tempMp ?? 0,
      defense: d.defense,
      speed: d.speed,
      armorPenalty: d.armorPenalty,
      maxSpaces: d.maxSpaces,
      currentSpaces: d.currentSpaces,
    },
    skills,
    activeConditions: input.activeConditions,
    updatedAt: new Date().toISOString(),
  };
}

/* ==========================================================================
   Ataque e dano — Cap. 3, págs. 142–143; Cap. 5, pág. 230
   ========================================================================== */

/** Penalidades exclusivas de ataque (enredado, agarrado, ofuscado –2; caído –5 corpo a corpo). Não acumulam. */
export function getAttackOnlyConditionPenalty(activeConditions: string[] = [], isMelee: boolean = true): { penalty: number; reasons: string[] } {
  const cond = getConditionEffects(activeConditions);
  const options = [cond.attack, isMelee ? cond.meleeAttack : null].filter(Boolean) as { value: number; label: string }[];
  const worst = options.sort((x, y) => x.value - y.value)[0];
  return worst ? { penalty: worst.value, reasons: [`${worst.label} (${worst.value})`] } : { penalty: 0, reasons: [] };
}

/** Armas de disparo (arcos, bestas, funda, armas de fogo); as demais à distância são de arremesso (pág. 142). */
const DISPARO = /arco|besta|funda|pistola|mosquete/i;

/** Arma de ataque à distância (Pontaria)? */
export function isRangedWeapon(weapon: Pick<CharacterInventoryItem, 'subcategory'>): boolean {
  return weapon.subcategory === 'distancia';
}

/**
 * Força no dano: armas corpo a corpo e de arremesso somam; armas de disparo não, exceto arco longo
 * e funda (Cap. 3, págs. 142, 146 e 148).
 */
export function weaponAddsStrengthToDamage(weapon: Pick<CharacterInventoryItem, 'subcategory' | 'description' | 'name' | 'equipmentId'>): boolean {
  if (!isRangedWeapon(weapon)) return true;
  const id = `${weapon.equipmentId || ''} ${weapon.name || ''}`;
  if (!DISPARO.test(id)) return true; // arremesso
  return /arco[ _]longo|funda/i.test(id);
}

const isAxeHammerPick = (w: { name: string; equipmentId?: string }) => /machad|martel|marreta|picareta/i.test(`${w.name} ${w.equipmentId || ''}`);

/**
 * Teste de ataque = Luta (corpo a corpo) ou Pontaria (à distância) + bônus da arma + bônus de poderes/raça
 * – 5 sem proficiência (Cap. 3, pág. 142) + condições exclusivas de ataque.
 */
export function calculateWeaponAttack(
  character: { skills: Record<string, TrainedSkillData>; activeConditions?: string[]; raceId?: string; classId?: string; powers?: { name: string }[]; inventory?: CharacterInventoryItem[]; level?: number; totalAttributes?: CharacterAttributes },
  weapon: Pick<CharacterInventoryItem, 'subcategory' | 'attackBonus' | 'name'> & Partial<Pick<CharacterInventoryItem, 'category' | 'equipmentId' | 'description'>>
): StatBreakdown & { isMelee: boolean; conditionReasons: string[] } {
  const isMelee = !isRangedWeapon(weapon);
  const skillKey = isMelee ? 'luta' : 'pontaria';
  const skillTotal = character.skills?.[skillKey]?.total ?? 0;
  const components: StatBreakdown['components'] = [{ label: isMelee ? 'Luta' : 'Pontaria', value: skillTotal }];
  let value = skillTotal;
  const push = (label: string, v: number) => {
    if (!v) return;
    value += v;
    components.push({ label, value: v });
  };
  push('Bônus da arma (melhorias)', weapon.attackBonus || 0);

  const powers = (character.powers || []).map((p) => p.name);
  const input: RulesInput | null = character.classId
    ? {
        level: character.level || 1,
        classId: character.classId,
        raceId: character.raceId || '',
        attributes: character.totalAttributes || { for: 0, des: 0, con: 0, int: 0, sab: 0, car: 0 },
        inventory: character.inventory || [],
        powerNames: powers,
      }
    : null;
  if (input && weapon.category) {
    const proficient = isWeaponProficient(input, { category: weapon.category, name: weapon.name, equipmentId: weapon.equipmentId });
    if (!proficient) push('Sem proficiência (Cap. 3, pág. 142)', -5);
    // Tradição de Heredrimm: +2 em ataques com machados, martelos, marretas e picaretas (pág. 20)
    if (hasRaceAbility(input, 'anao_tradicao_heredrimm') && isAxeHammerPick({ name: weapon.name, equipmentId: weapon.equipmentId })) push('Tradição de Heredrimm', 2);
    // Armas da Ambição: +1 com armas em que é proficiente (pág. 132)
    if (proficient && powers.includes('Armas da Ambição')) push('Armas da Ambição', 1);
    // Estilo de Uma Arma: +2 com a arma corpo a corpo empunhada sozinha (pág. 128)
    if (isMelee && powers.includes('Estilo de Uma Arma')) {
      const equipped = input.inventory.filter((it) => it.isEquipped && it.category.startsWith('arma'));
      if (equipped.length === 1 && !equippedShield(input.inventory) && weapon.subcategory !== 'duas_maos') push('Estilo de Uma Arma', 2);
    }
    // Estilo de Arma Longa: +2 com armas alongadas (pág. 125)
    if (powers.includes('Estilo de Arma Longa') && /alongada/i.test(weapon.description || '')) push('Estilo de Arma Longa', 2);
  }

  const { penalty, reasons } = getAttackOnlyConditionPenalty(character.activeConditions || [], isMelee);
  if (penalty) push(`Condição: ${reasons[0].replace(/\s*\(.*\)$/, '')}`, penalty);

  const formula = `1d20 ${components.map((c) => `${signed(Number(c.value))} (${c.label})`).join(' ')}`;
  return { value, formula, components, isMelee, conditionReasons: reasons };
}

export interface WeaponDamageRoll {
  /** Quantidade e faces do dado principal (ex.: 1d8). */
  count: number;
  sides: number;
  /** Modificador fixo total. */
  modifier: number;
  /** Texto pronto para exibir: "1d8+3". */
  formula: string;
  components: StatBreakdown['components'];
  addsStrength: boolean;
}

/** Tabela 3-2: Dano de Armas — passos (Cap. 3, pág. 143). Índice 2 = dano normal. */
const DAMAGE_STEPS: Record<string, string[]> = {
  '1d3': ['1', '1d2', '1d3', '1d4', '1d6', '1d8'],
  '1d4': ['1d2', '1d3', '1d4', '1d6', '1d8', '1d10'],
  '1d6': ['1d3', '1d4', '1d6', '1d8', '1d10', '1d12'],
  '1d8': ['1d4', '1d6', '1d8', '1d10', '1d12', '3d6'],
  '2d4': ['1d4', '1d6', '2d4', '1d10', '1d12', '3d6'],
  '1d10': ['1d6', '1d8', '1d10', '1d12', '3d6', '4d6'],
  '1d12': ['1d8', '1d10', '1d12', '3d6', '4d6', '4d8'],
  '2d6': ['1d8', '1d10', '2d6', '3d6', '4d6', '4d8'],
  '3d4': ['1d8', '1d10', '3d4', '3d6', '4d6', '4d8'],
  '2d8': ['1d10', '2d6', '2d8', '3d8', '4d8', '4d10'],
  '2d10': ['2d6', '2d8', '2d10', '3d10', '4d10', '4d12'],
};

/** Aumenta ou diminui o dano em passos (–2 a +3), conforme a Tabela 3-2. */
export function stepDamage(dice: string, steps: number): string {
  const row = DAMAGE_STEPS[dice];
  if (!row) return dice;
  return row[Math.max(0, Math.min(row.length - 1, 2 + steps))];
}

/**
 * Dano com arma: dado da arma (com passos) + Força quando aplicável + bônus de melhorias e poderes.
 * Para armas duplas/versáteis ("1d10/1d12") usa o primeiro valor. Retorna null se a arma não causa dano.
 */
export function calculateWeaponDamage(
  character: { totalAttributes: CharacterAttributes; raceId?: string; racialChoices?: Record<string, string[]>; classId?: string; classes?: { classId: string; level: number }[]; level?: number; powers?: { name: string }[] },
  weapon: Pick<CharacterInventoryItem, 'damage' | 'subcategory' | 'description'> & Partial<Pick<CharacterInventoryItem, 'name' | 'equipmentId'>>
): WeaponDamageRoll | null {
  const raw = (weapon.damage || '').split('/')[0].trim();
  const m = raw.match(/(\d+)\s*d\s*(\d+)/i);
  if (!m) return null;
  let diceStr = `${m[1]}d${m[2]}`;
  const rest = raw.slice((m.index || 0) + m[0].length);
  const flatMatch = rest.match(/([+-])\s*(\d+)/);
  const flat = flatMatch ? (flatMatch[1] === '-' ? -1 : 1) * parseInt(flatMatch[2], 10) : 0;
  const name = `${weapon.name || ''} ${weapon.equipmentId || ''}`;
  const powers = (character.powers || []).map((p) => p.name);
  const components: StatBreakdown['components'] = [];
  let modifier = flat;

  // Hynne — Arremessador: dano +1 passo com funda ou arma de arremesso à distância (pág. 28)
  const ranged = isRangedWeapon(weapon);
  if (hasRaceAbility(character, 'hynne_arremessador') && ranged && (!DISPARO.test(name) || /funda/i.test(name))) {
    const stepped = stepDamage(diceStr, 1);
    if (stepped !== diceStr) {
      components.push({ label: 'Arremessador (Hynne): +1 passo', value: `${diceStr}→${stepped}` });
      diceStr = stepped;
    }
  }
  const dm = diceStr.match(/(\d+)d(\d+)/);
  const count = dm ? parseInt(dm[1], 10) : 1;
  const sides = dm ? parseInt(dm[2], 10) : 1;
  components.unshift({ label: 'Dado da arma', value: diceStr });
  if (flat) components.push({ label: 'Bônus da arma (melhorias)', value: flat });

  const addsStrength = weaponAddsStrengthToDamage({ ...weapon, name: weapon.name || '', equipmentId: weapon.equipmentId });
  if (addsStrength) {
    const f = character.totalAttributes?.for || 0;
    modifier += f;
    components.push({ label: 'Força', value: f });
  }
  // Estilo de Disparo: soma Destreza no dano com armas de disparo (pág. 125)
  if (ranged && DISPARO.test(name) && powers.includes('Estilo de Disparo')) {
    const d = character.totalAttributes?.des || 0;
    modifier += d;
    components.push({ label: 'Estilo de Disparo (Des)', value: d });
  }
  // Mestre do Tridente (Sereia, pág. 30) e Arsenal das Profundezas (pág. 132): +2 com azagaias, lanças e tridentes
  if (/azagaia|lan[cç]a(?! montada)|tridente/i.test(name)) {
    if (hasRaceAbility(character, 'sereia_mestre_tridente')) {
      modifier += 2;
      components.push({ label: 'Mestre do Tridente', value: 2 });
    }
    if (powers.includes('Arsenal das Profundezas')) {
      modifier += 2;
      components.push({ label: 'Arsenal das Profundezas', value: 2 });
    }
  }
  // Bárbaro — Instinto Selvagem: +1 em rolagens de dano no 3º nível, +1 a cada seis níveis (pág. 42)
  const barbLevel = character.classes?.find((c) => c.classId === 'barbaro')?.level ?? (character.classId === 'barbaro' ? character.level || 1 : 0);
  if (barbLevel >= 3) {
    const b = 1 + Math.floor((barbLevel - 3) / 6);
    modifier += b;
    components.push({ label: 'Instinto Selvagem', value: b });
  }

  const formula = `${count}d${sides}${modifier > 0 ? `+${modifier}` : modifier < 0 ? `${modifier}` : ''}`;
  return { count, sides, modifier, formula, components, addsStrength };
}

/* ==========================================================================
   Compatibilidade: entrada posicional antiga (criador e personagens de exemplo)
   ========================================================================== */

export type { Contribution };
