import { describe, expect, it } from 'vitest';
import { collectPassiveEffects, tormentaCharismaLoss, tormentaPowerCount, type RulesInput } from '../passiveEffects';
import { bloodlineErrors, bloodlineSpellMods, bloodlineTier, tormentaLossAttribute } from '../bloodline';
import { spellBaseCost } from '../powerSpells';
import { checkPowerPrerequisites } from '../rulesValidation';
import { SPELLS_LIST } from '../../data/spells';
import type { CharacterBloodline } from '../../types/character';

const input = (bloodline: CharacterBloodline, powerNames: string[] = [], car = 3): RulesInput => ({
  level: 1,
  classId: 'arcanista',
  classSubclass: 'feiticeiro',
  raceId: 'humano',
  attributes: { for: 0, des: 0, con: 0, int: 0, sab: 0, car },
  inventory: [],
  powerNames,
  bloodline,
});

const sum = (i: RulesInput, k: 'hp' | 'mp') => collectPassiveEffects(i).reduce((a, c) => a + (c[k] || 0), 0);

describe('Linhagens sobrenaturais (Cap. 1, pág. 39)', () => {
  it('herança vem dos poderes Herança Aprimorada e Herança Superior', () => {
    expect(bloodlineTier([])).toBe('basica');
    expect(bloodlineTier(['Herança Aprimorada'])).toBe('aprimorada');
    expect(bloodlineTier(['Herança Aprimorada', 'Herança Superior'])).toBe('superior');
  });

  it('Dracônica: Carisma nos PV iniciais (dobro na superior), RD 5 e imunidade', () => {
    const b: CharacterBloodline = { id: 'draconica', damageType: 'fogo' };
    expect(sum(input(b), 'hp')).toBe(3);
    expect(collectPassiveEffects(input(b)).flatMap((c) => c.resistances || [])).toEqual(['Redução de fogo 5']);
    const sup = input(b, ['Herança Aprimorada', 'Herança Superior']);
    expect(sum(sup, 'hp')).toBe(6);
    expect(collectPassiveEffects(sup).flatMap((c) => c.resistances || [])).toEqual(['Imunidade a fogo']);
  });

  it('Dracônica aprimorada: magias do tipo custam –1 PM e +1 de dano por dado', () => {
    const owner = { bloodline: { id: 'draconica', damageType: 'fogo' } as CharacterBloodline, powers: [{ name: 'Herança Aprimorada' }] };
    const fire = SPELLS_LIST.find((s) => /dano de fogo/i.test(s.description) && s.circle === 2)!;
    expect(bloodlineSpellMods(owner, fire)).toMatchObject({ costReduction: 1, damagePerDie: 1 });
    expect(spellBaseCost(fire, owner)).toBe(2);
    expect(bloodlineSpellMods({ ...owner, powers: [] }, fire).costReduction).toBe(0);
  });

  it('Feérica aprimorada: encantamento e ilusão com CD +2 e –1 PM', () => {
    const owner = { bloodline: { id: 'feerica' } as CharacterBloodline, powers: [{ name: 'Herança Aprimorada' }] };
    const ench = SPELLS_LIST.find((s) => s.school === 'Encantamento' && s.circle === 2)!;
    expect(bloodlineSpellMods(owner, ench)).toMatchObject({ costReduction: 1, dcBonus: 2 });
    const evoc = SPELLS_LIST.find((s) => s.school === 'Evocação')!;
    expect(bloodlineSpellMods(owner, evoc).dcBonus).toBe(0);
  });

  it('Rubra: heranças contam como poderes da Tormenta, exceto para perda de Carisma; superior +4 PM por poder', () => {
    const b: CharacterBloodline = { id: 'rubra', tormentaPower: 'Antenas', tormentaAttribute: 'for' };
    const basic = input(b, ['Antenas']);
    expect(tormentaPowerCount(basic)).toBe(1);
    expect(tormentaCharismaLoss(basic)).toBe(1);
    const sup = input(b, ['Antenas', 'Herança Aprimorada', 'Herança Superior']);
    expect(tormentaPowerCount(sup)).toBe(3);
    expect(tormentaCharismaLoss(sup)).toBe(1);
    expect(sum(sup, 'mp')).toBe(12);
    expect(tormentaLossAttribute(b)).toBe('for');
  });

  it('pendências da herança básica', () => {
    expect(bloodlineErrors(undefined)).toHaveLength(1);
    expect(bloodlineErrors({ id: 'draconica' })[0]).toMatch(/tipo de dano/);
    expect(bloodlineErrors({ id: 'feerica', spellId: 'x' })).toHaveLength(0);
  });

  it('Herança Aprimorada exige feiticeiro e 6º nível de arcanista (também em multiclasse)', () => {
    const ctx = { attributes: { for: 0, des: 0, con: 0, int: 0, sab: 0, car: 0 }, trainedSkillIds: [] as string[], level: 8, classId: 'guerreiro', classLevels: { guerreiro: 2, arcanista: 6 }, subclasses: ['feiticeiro'] };
    expect(checkPowerPrerequisites('Herança Aprimorada', ctx).isMet).toBe(true);
    expect(checkPowerPrerequisites('Herança Aprimorada', { ...ctx, subclasses: ['mago'] }).isMet).toBe(false);
  });
});
