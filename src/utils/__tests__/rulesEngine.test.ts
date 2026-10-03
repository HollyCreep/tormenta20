import { describe, expect, it } from 'vitest';
import {
  calculateArmorPenalty,
  calculateDefense,
  calculateMaxHp,
  calculateMaxMp,
  calculateMaxSpaces,
  calculateSkillBonus,
  calculateSpeed,
  calculateSpellCircleUnlocked,
  calculateTotalAttributes,
  calculateWeaponAttack,
  calculateWeaponDamage,
  getAttackOnlyConditionPenalty,
  recalculateFullCharacterSheet,
  stepDamage,
  type RulesInput,
} from '../rulesEngine';
import { getConditionEffects } from '../conditionEffects';
import { tormentaCharismaLoss } from '../passiveEffects';
import type { CharacterInventoryItem, TrainedSkillData } from '../../types/character';

const ATTRS = { for: 0, des: 0, con: 0, int: 0, sab: 0, car: 0 };
const input = (over: Partial<RulesInput> = {}): RulesInput => ({
  level: 1,
  classId: 'guerreiro',
  raceId: 'humano',
  attributes: { ...ATTRS },
  inventory: [],
  powerNames: [],
  activeConditions: [],
  ...over,
});
const gear = (over: Partial<CharacterInventoryItem>): CharacterInventoryItem => ({
  id: over.name || 'x',
  name: 'Item',
  category: 'item_geral',
  spaces: 1,
  quantity: 1,
  isEquipped: true,
  ...over,
});
const LEATHER = gear({ name: 'Armadura de couro', category: 'armadura_leve', defenseBonus: 2, armorPenalty: 0, spaces: 2 });
const STUDDED = gear({ name: 'Couro batido', category: 'armadura_leve', defenseBonus: 3, armorPenalty: -1, spaces: 2 });
const CHAIN = gear({ name: 'Cota de malha', category: 'armadura_pesada', defenseBonus: 6, armorPenalty: -2, spaces: 5 });
const HEAVY_SHIELD = gear({ name: 'Escudo pesado', category: 'escudo', defenseBonus: 2, armorPenalty: -2, spaces: 2 });

describe('Atributos (Cap. 1, pág. 17)', () => {
  it('o valor do atributo é o próprio modificador', () => {
    expect(calculateTotalAttributes({ ...ATTRS, for: 3 }, { ...ATTRS, for: 2 }).for).toBe(5);
  });
  it('poderes da Tormenta: –1 Car pelo primeiro e –1 a cada dois outros (Cap. 2, pág. 136)', () => {
    expect(tormentaCharismaLoss(input({ powerNames: ['Antenas'] }))).toBe(1);
    expect(tormentaCharismaLoss(input({ powerNames: ['Antenas', 'Carapaça'] }))).toBe(1);
    expect(tormentaCharismaLoss(input({ powerNames: ['Antenas', 'Carapaça', 'Dentes Afiados'] }))).toBe(2);
    expect(tormentaCharismaLoss(input({ raceId: 'lefou', powerNames: ['Antenas'] }), 'Antenas')).toBe(0);
  });
});

describe('PV e PM (Cap. 1, classes)', () => {
  it('Guerreiro: 20 + Con no 1º nível e 5 + Con por nível (pág. 65)', () => {
    expect(calculateMaxHp(input({ attributes: { ...ATTRS, con: 2 } })).value).toBe(22);
    expect(calculateMaxHp(input({ level: 5, attributes: { ...ATTRS, con: 2 } })).value).toBe(22 + 4 * 7);
  });
  it('Anão: +3 PV no 1º nível e +1 por nível seguinte (pág. 20)', () => {
    expect(calculateMaxHp(input({ raceId: 'anao', level: 3 })).value).toBe(20 + 2 * 5 + 3 + 2);
  });
  it('Arcanista soma o atributo-chave do Caminho nos PM (pág. 37)', () => {
    expect(calculateMaxMp(input({ classId: 'arcanista', classSubclass: 'mago', attributes: { ...ATTRS, int: 4 } })).value).toBe(6 + 4);
    expect(calculateMaxMp(input({ classId: 'arcanista', classSubclass: 'feiticeiro', attributes: { ...ATTRS, car: 3, int: 4 } })).value).toBe(6 + 3);
  });
  it('Clérigo soma Sabedoria; Bardo soma Carisma; Paladino soma Carisma (págs. 57, 44, 82)', () => {
    expect(calculateMaxMp(input({ classId: 'clerigo', attributes: { ...ATTRS, sab: 3 } })).value).toBe(5 + 3);
    expect(calculateMaxMp(input({ classId: 'bardo', attributes: { ...ATTRS, car: 2 } })).value).toBe(4 + 2);
    expect(calculateMaxMp(input({ classId: 'paladino', attributes: { ...ATTRS, car: 2 } })).value).toBe(3 + 2);
  });
  it('Elfo +1 PM por nível; Bênção do Mana +1 PM a cada nível ímpar (págs. 22 e 132)', () => {
    expect(calculateMaxMp(input({ raceId: 'elfo', level: 3 })).value).toBe(9 + 3);
    expect(calculateMaxMp(input({ level: 3, powerNames: ['Bênção do Mana'] })).value).toBe(9 + 2);
  });
});

describe('Defesa (Cap. 1, pág. 106; Cap. 3, pág. 152)', () => {
  it('10 + Destreza + armadura + escudo', () => {
    expect(calculateDefense(input({ attributes: { ...ATTRS, des: 3 }, inventory: [LEATHER, HEAVY_SHIELD] })).value).toBe(10 + 3 + 2 + 2);
  });
  it('armadura pesada não aplica Destreza', () => {
    expect(calculateDefense(input({ attributes: { ...ATTRS, des: 3 }, inventory: [CHAIN] })).value).toBe(16);
  });
  it('tamanho NÃO altera a Defesa (Tabela 1-21, pág. 107)', () => {
    expect(calculateDefense(input({ raceId: 'goblin' })).value).toBe(10);
    expect(calculateDefense(input({ raceId: 'silfide' })).value).toBe(10);
  });
  it('Nobre usa Carisma EM VEZ de Destreza (Autoconfiança, pág. 79)', () => {
    expect(calculateDefense(input({ classId: 'nobre', attributes: { ...ATTRS, des: 1, car: 4 } })).value).toBe(14);
  });
  it('Minotauro +1, Golem +2, Trog +1 (págs. 25, 27, 31)', () => {
    expect(calculateDefense(input({ raceId: 'minotauro' })).value).toBe(11);
    expect(calculateDefense(input({ raceId: 'golem' })).value).toBe(12);
    expect(calculateDefense(input({ raceId: 'trog' })).value).toBe(11);
  });
  it('Estilo de Arma e Escudo +2 e Carapaça +1 (+1 a cada dois outros poderes da Tormenta)', () => {
    expect(calculateDefense(input({ inventory: [HEAVY_SHIELD], powerNames: ['Estilo de Arma e Escudo'] })).value).toBe(14);
    expect(calculateDefense(input({ powerNames: ['Carapaça'] })).value).toBe(11);
    expect(calculateDefense(input({ powerNames: ['Carapaça', 'Antenas', 'Dentes Afiados'] })).value).toBe(12);
  });
  it('condições com o mesmo efeito não acumulam: desprevenido + vulnerável = –5 (Apêndice, pág. 394)', () => {
    expect(calculateDefense(input({ activeConditions: ['desprevenido', 'vulneravel'] })).value).toBe(5);
    expect(calculateDefense(input({ activeConditions: ['imovel'] })).value).toBe(10);
    expect(calculateDefense(input({ activeConditions: ['exausto'] })).value).toBe(8); // exausto ⇒ vulnerável
  });
});

describe('Carga, sobrecarga e deslocamento (Cap. 3, pág. 141)', () => {
  it('10 espaços + 2 por ponto de Força, –1 por ponto negativo; mochila não dá espaço', () => {
    expect(calculateMaxSpaces(input({ attributes: { ...ATTRS, for: 2 } })).value).toBe(14);
    expect(calculateMaxSpaces(input({ attributes: { ...ATTRS, for: -2 } })).value).toBe(8);
    expect(calculateMaxSpaces(input({ inventory: [gear({ name: 'Mochila', equipmentId: 'mochila', spaces: 0 })] })).value).toBe(10);
  });
  it('sobrecarregado: penalidade de armadura –5 e deslocamento –3m', () => {
    const heavyLoad = input({ inventory: [gear({ name: 'Baú', spaces: 11, isEquipped: false })] });
    expect(calculateArmorPenalty(heavyLoad).value).toBe(-5);
    expect(calculateSpeed(heavyLoad).value).toBe(6);
  });
  it('anão e golem não perdem deslocamento por armadura nem carga', () => {
    expect(calculateSpeed(input({ raceId: 'anao', inventory: [CHAIN] })).value).toBe(6);
    expect(calculateSpeed(input({ raceId: 'golem', inventory: [CHAIN] })).value).toBe(6);
    expect(calculateSpeed(input({ inventory: [CHAIN] })).value).toBe(6);
  });
  it('Atlético +3m; lento divide por dois em incrementos de 1,5m', () => {
    expect(calculateSpeed(input({ powerNames: ['Atlético'] })).value).toBe(12);
    expect(calculateSpeed(input({ activeConditions: ['lento'] })).value).toBe(4.5);
  });
});

describe('Perícias (Cap. 2, págs. 114–115)', () => {
  it('metade do nível + atributo + treino (+2, +4 no 7º, +6 no 15º)', () => {
    expect(calculateSkillBonus('luta', false, input({ level: 3, attributes: { ...ATTRS, for: 2 } })).total).toBe(3);
    expect(calculateSkillBonus('vontade', true, input({ level: 7, attributes: { ...ATTRS, sab: 2 } })).total).toBe(9);
    expect(calculateSkillBonus('fortitude', true, input({ level: 20, attributes: { ...ATTRS, con: 4 } })).total).toBe(20);
  });
  it('penalidade de armadura só em Acrobacia, Furtividade e Ladinagem (não Pilotagem)', () => {
    const i = input({ inventory: [STUDDED] });
    expect(calculateSkillBonus('furtividade', false, i).total).toBe(-1);
    expect(calculateSkillBonus('pilotagem', false, i).total).toBe(0);
    expect(calculateSkillBonus('atletismo', false, i).total).toBe(0);
  });
  it('sem proficiência: penalidade em todas as perícias de For e Des (pág. 152)', () => {
    const i = input({ classId: 'arcanista', inventory: [CHAIN] });
    expect(calculateSkillBonus('luta', false, i).total).toBe(-2);
  });
  it('tamanho: Pequeno +2 e Minúsculo +5 em Furtividade (Tabela 1-21)', () => {
    expect(calculateSkillBonus('furtividade', false, input({ raceId: 'goblin' })).total).toBe(2);
    expect(calculateSkillBonus('furtividade', false, input({ raceId: 'silfide' })).total).toBe(5);
  });
  it('Hynne usa Destreza em Atletismo; Elfo +2 em Misticismo e Percepção', () => {
    expect(calculateSkillBonus('atletismo', false, input({ raceId: 'hynne', attributes: { ...ATTRS, for: -1, des: 3 } })).total).toBe(3);
    expect(calculateSkillBonus('misticismo', false, input({ raceId: 'elfo' })).total).toBe(2);
  });
  it('cego (–5 For/Des) e fraco (–2) não acumulam; vale o mais severo', () => {
    expect(calculateSkillBonus('luta', false, input({ activeConditions: ['cego', 'fraco'] })).total).toBe(-5);
  });
});

describe('Condições (Apêndice, págs. 394–395)', () => {
  it('exausto implica debilitado, lento e vulnerável; agarrado implica desprevenido e imóvel', () => {
    const e = getConditionEffects(['exausto']);
    expect(['debilitado', 'lento', 'vulneravel'].every((c) => e.set.has(c))).toBe(true);
    expect(getConditionEffects(['agarrado']).speedZero).toBe(true);
  });
  it('penalidades exclusivas de ataque não acumulam', () => {
    expect(getAttackOnlyConditionPenalty(['enredado', 'agarrado', 'ofuscado']).penalty).toBe(-2);
    expect(getAttackOnlyConditionPenalty(['enredado', 'caido'], true).penalty).toBe(-5);
    expect(getAttackOnlyConditionPenalty(['abalado'], true).penalty).toBe(0);
  });
});

describe('Magias (Cap. 1 e Cap. 4)', () => {
  it('Arcanista: 2º círculo no 5º nível; Bardo/Druida: 2º no 6º, máximo 4º', () => {
    expect(calculateSpellCircleUnlocked(5, 'arcanista')).toBe(2);
    expect(calculateSpellCircleUnlocked(5, 'bardo')).toBe(1);
    expect(calculateSpellCircleUnlocked(6, 'druida')).toBe(2);
    expect(calculateSpellCircleUnlocked(20, 'bardo')).toBe(4);
  });
});

describe('Ataque e dano (Cap. 3, págs. 142–148)', () => {
  const skills = {
    luta: { id: 'luta', name: 'Luta', attribute: 'for', isTrained: true, total: 5, breakdown: { value: 5, formula: '', components: [] }, source: 'classe' },
    pontaria: { id: 'pontaria', name: 'Pontaria', attribute: 'des', isTrained: false, total: 1, breakdown: { value: 1, formula: '', components: [] }, source: 'custom' },
  } as unknown as Record<string, TrainedSkillData>;
  const attrs = { for: 3, des: 1, con: 2, int: 0, sab: 0, car: 0 };

  it('corpo a corpo: Luta + bônus da arma (Certeira +1)', () => {
    const atk = calculateWeaponAttack({ skills, activeConditions: [] }, { name: 'Espada longa', subcategory: 'uma_mao', attackBonus: 1 });
    expect(atk.value).toBe(6);
    expect(atk.isMelee).toBe(true);
  });
  it('sem proficiência: –5 no ataque; anão trata martelos como simples e recebe +2', () => {
    const base = { skills, activeConditions: [], classId: 'arcanista', level: 1, totalAttributes: attrs, inventory: [], powers: [] };
    expect(calculateWeaponAttack({ ...base, raceId: 'humano' }, { name: 'Espada longa', subcategory: 'uma_mao', category: 'arma_marcial' }).value).toBe(0);
    expect(calculateWeaponAttack({ ...base, raceId: 'anao' }, { name: 'Martelo de guerra', subcategory: 'uma_mao', category: 'arma_marcial' }).value).toBe(7);
  });
  it('não reaplica Abalado (já na perícia), mas aplica Caído no corpo a corpo', () => {
    expect(calculateWeaponAttack({ skills, activeConditions: ['abalado', 'caido'] }, { name: 'Espada longa', subcategory: 'uma_mao' }).value).toBe(0);
  });
  it('à distância usa Pontaria e ignora Caído', () => {
    const atk = calculateWeaponAttack({ skills, activeConditions: ['caido'] }, { name: 'Arco curto', subcategory: 'distancia' });
    expect(atk.value).toBe(1);
    expect(atk.isMelee).toBe(false);
  });
  it('dano corpo a corpo soma Força: 1d8 com Força 3 = 1d8+3', () => {
    expect(calculateWeaponDamage({ totalAttributes: attrs }, { damage: '1d8', subcategory: 'uma_mao' })).toMatchObject({ formula: '1d8+3', addsStrength: true });
  });
  it('disparo não soma Força, exceto arco longo e funda (págs. 146 e 148)', () => {
    expect(calculateWeaponDamage({ totalAttributes: attrs }, { name: 'Besta leve', damage: '1d8', subcategory: 'distancia' })?.formula).toBe('1d8');
    expect(calculateWeaponDamage({ totalAttributes: attrs }, { name: 'Arco longo', damage: '1d8', subcategory: 'distancia' })?.formula).toBe('1d8+3');
    expect(calculateWeaponDamage({ totalAttributes: attrs }, { name: 'Funda', damage: '1d4', subcategory: 'distancia' })?.formula).toBe('1d4+3');
  });
  it('arremesso soma Força e melhorias de dano', () => {
    expect(calculateWeaponDamage({ totalAttributes: attrs }, { name: 'Azagaia', damage: '1d6 + 1', subcategory: 'distancia' })?.formula).toBe('1d6+4');
  });
  it('Hynne (Arremessador): +1 passo de dano com funda (Tabela 3-2)', () => {
    expect(stepDamage('1d4', 1)).toBe('1d6');
    expect(calculateWeaponDamage({ totalAttributes: attrs, raceId: 'hynne' }, { name: 'Funda', damage: '1d4', subcategory: 'distancia' })?.formula).toBe('1d6+3');
  });
  it('armas sem dano (rede) retornam null', () => {
    expect(calculateWeaponDamage({ totalAttributes: attrs }, { damage: '-', subcategory: 'distancia' })).toBeNull();
  });
});

describe('Recálculo completo', () => {
  it('recalcula PV, PM, Defesa e perícias de forma coerente', () => {
    const sheet = recalculateFullCharacterSheet({
      level: 1,
      classId: 'guerreiro',
      raceId: 'anao',
      totalAttributes: { for: 3, des: -1, con: 5, int: 0, sab: 2, car: -1 },
      inventory: [CHAIN],
      powers: [],
      skills: { luta: { isTrained: true } },
      stats: {},
    });
    expect(sheet.stats.maxHp.value).toBe(20 + 5 + 3);
    expect(sheet.stats.defense.value).toBe(16);
    expect(sheet.stats.speed.value).toBe(6);
    expect(sheet.skills.luta.total).toBe(5);
  });
});
