import { describe, expect, it } from 'vitest';
import { validateAllWizardSteps, type WizardValidationInput } from '../rulesValidation';
import { spellLevelLimit, spellKeyAttribute } from '../rulesEngine';
import { pendingSpellGrants, spellOptionsForGrant, fixedSpellsForPowers } from '../powerSpells';
import { spellGrantFor } from '../../data/powerSpellGrants';
import { CLASSES_LIST } from '../../data/classes';
import type { CharacterSpell } from '../../types/character';

const attrs = { for: 2, des: 1, con: 2, int: 0, sab: 0, car: 0 };
const baseInput: WizardValidationInput = {
  raceId: 'humano',
  selectedRacialAttributes: ['for', 'des', 'con'],
  selectedRacialSkills: ['atletismo'],
  selectedRacialPower: 'Estilo de Arma e Escudo',
  classId: 'guerreiro',
  selectedClassSkills: [],
  originId: 'guarda',
  selectedOriginBenefits: [
    { type: 'pericia', name: 'investigacao' },
    { type: 'poder', name: 'Bloqueio com Escudo' },
  ],
  deityId: 'nenhum',
  selectedDeityPowers: [],
  attributeMethod: 'point_buy',
  baseAttributes: attrs,
  totalAttributes: attrs,
  selectedIntSkills: [],
  selectedSpells: [],
  currentSpaces: 0,
  maxSpaces: 14,
  characterName: 'Teste',
};

describe('Pré-requisitos entre benefícios (Cap. 1, pág. 33)', () => {
  it('poder da origem aceita como requisito o poder escolhido na raça', () => {
    const origin = validateAllWizardSteps(baseInput)[3];
    expect(origin.errors.join(' ')).not.toMatch(/Bloqueio com Escudo/);
  });

  it('sem o poder da raça, o requisito continua faltando', () => {
    const origin = validateAllWizardSteps({ ...baseInput, selectedRacialPower: undefined })[3];
    expect(origin.errors.join(' ')).toMatch(/Bloqueio com Escudo/);
  });
});

describe('Tabela da classe (multiclasse)', () => {
  it('o 1º nível de nenhuma classe concede poder', () => {
    CLASSES_LIST.forEach((c) => expect(/poder d/i.test(c.progression?.find((p) => p.level === 1)?.features || '')).toBe(false));
  });

  it('guerreiro 1 tem Ataque Especial e o 3º nível tem Durão', () => {
    const g = CLASSES_LIST.find((c) => c.id === 'guerreiro')!;
    expect(g.abilities?.filter((a) => a.level === 1).map((a) => a.name)).toEqual(['Ataque especial']);
    expect(g.abilities?.find((a) => a.level === 3)?.name).toBe('Durão');
  });
});

describe('Limite de PM por magia (Cap. 5, pág. 224)', () => {
  const owner = {
    classId: 'guerreiro',
    level: 5,
    classes: [
      { classId: 'guerreiro', level: 2 },
      { classId: 'arcanista', level: 3, subclass: 'mago' },
    ],
  };

  it('magia de classe: nível na classe que a fornece', () => {
    const spell = { learnedFrom: 'classe' as const, sourceClassId: 'arcanista', type: 'arcana' as const };
    expect(spellLevelLimit(owner, spell).level).toBe(3);
    expect(spellKeyAttribute(owner, spell)).toBe('int');
  });

  it('ficha antiga sem sourceClassId: usa a classe conjuradora do tipo da magia', () => {
    expect(spellLevelLimit(owner, { learnedFrom: 'classe', type: 'arcana' }).level).toBe(3);
  });

  it('magia de poder ou raça: nível de personagem', () => {
    expect(spellLevelLimit(owner, { learnedFrom: 'poder', type: 'arcana' }).level).toBe(5);
  });
});

describe('Poderes que concedem magias', () => {
  it('Centelha Mágica: uma magia arcana ou divina de 1º círculo', () => {
    const g = spellGrantFor('Centelha Mágica')!;
    const opts = spellOptionsForGrant(g, { classId: 'guerreiro', level: 1 });
    expect(opts.length).toBeGreaterThan(0);
    expect(opts.every((s) => s.circle === 1)).toBe(true);
  });

  it('Conhecimento Mágico do arcanista 5: até o 2º círculo, só arcanas', () => {
    const g = spellGrantFor('Conhecimento Mágico', 'arcanista')!;
    const opts = spellOptionsForGrant(g, { classId: 'arcanista', level: 5 });
    expect(Math.max(...opts.map((s) => s.circle))).toBe(2);
    expect(opts.every((s) => s.type !== 'divina')).toBe(true);
  });

  it('pendências: Conhecimento Mágico escolhido duas vezes pede 4 magias', () => {
    const powers = [
      { id: 'arcanista_conhecimento_magico', name: 'Conhecimento Mágico' },
      { id: 'arcanista_conhecimento_magico', name: 'Conhecimento Mágico' },
    ];
    const [p] = pendingSpellGrants(powers, []);
    expect(p.needed).toBe(4);
    const have = [{ id: 'x', sourcePower: 'Conhecimento Mágico', sourceClassId: 'arcanista' }] as CharacterSpell[];
    expect(pendingSpellGrants(powers, have)[0].have).toBe(1);
  });

  it('poder concedido com magia fixa entra automaticamente (Dedo Verde)', () => {
    const [sp] = fixedSpellsForPowers([{ id: 'dedo_verde', name: 'Dedo Verde' }]);
    expect(sp.name).toBe('Controlar Plantas');
    expect(sp.learnedFrom).toBe('poder');
    expect(sp.keyAttribute).toBe('sab');
  });
});
