import { describe, expect, it } from 'vitest';
import { validateAllWizardSteps, type WizardValidationInput } from '../rulesValidation';
import { spellLevelLimit, spellKeyAttribute } from '../rulesEngine';
import {
  formulaMaxCircle,
  learnableClassSpells,
  pendingSpellGrants,
  scribeCost,
  spellBaseCost,
  spellOptionsForGrant,
  spellsFromGrant,
  withFixedGrants,
} from '../powerSpells';
import { SPELLS_LIST } from '../../data/spells';
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
    const [sp] = withFixedGrants([{ id: 'dedo_verde', name: 'Dedo Verde' }], []);
    expect(sp.name).toBe('Controlar Plantas');
    expect(sp.learnedFrom).toBe('poder');
    expect(sp.keyAttribute).toBe('sab');
  });

  it('aprender de novo pelo poder concedido reduz o custo em –1 PM, sem duplicar', () => {
    const augurio = { ...SPELLS_LIST.find((s) => s.name === 'Augúrio')!, learnedFrom: 'classe' as const, sourceClassId: 'clerigo' };
    const out = withFixedGrants([{ id: 'dom_da_profecia', name: 'Dom da Profecia' }], [augurio]);
    expect(out).toHaveLength(1);
    expect(out[0].costReducedBy).toEqual(['Dom da Profecia']);
    expect(spellBaseCost(out[0])).toBe(2);
    // reaplicar não reduz de novo
    expect(withFixedGrants([{ id: 'dom_da_profecia', name: 'Dom da Profecia' }], out)[0].costReducedBy).toHaveLength(1);
  });

  it('custo nunca fica abaixo de 1 PM (Cap. 5, pág. 226)', () => {
    expect(spellBaseCost({ circle: 1, costReducedBy: ['A', 'B'] })).toBe(1);
  });
});

describe('Teurgista Místico (pág. 135)', () => {
  const owner = { classId: 'arcanista', level: 5, powers: [{ id: 'teurgista_mistico', name: 'Teurgista Místico' }], spells: [] };

  it('arcanista vê magias divinas, uma por círculo', () => {
    const list = learnableClassSpells(owner, 'arcanista', { maxCircle: 2 });
    expect(list.some((s) => s.type === 'divina' && s.circle === 1)).toBe(true);
    const cure = SPELLS_LIST.find((s) => s.type === 'divina' && s.circle === 1)!;
    const after = learnableClassSpells(owner, 'arcanista', { maxCircle: 2, selected: [cure] });
    expect(after.filter((s) => s.type === 'divina' && s.circle === 1).map((s) => s.id)).toEqual([cure.id]);
    expect(after.some((s) => s.type === 'divina' && s.circle === 2)).toBe(true);
  });

  it('sem o poder, só o tipo da classe', () => {
    expect(learnableClassSpells({ ...owner, powers: [] }, 'arcanista', { maxCircle: 2 }).some((s) => s.type === 'divina')).toBe(false);
  });
});

describe('Sopro do Mar (pág. 135)', () => {
  it('clérigo pode aprender Sopro das Uivantes como divina, com –1 PM', () => {
    const owner = { classId: 'clerigo', level: 5, powers: [{ id: 'sopro_do_mar', name: 'Sopro do Mar' }], spells: [] };
    const sp = learnableClassSpells(owner, 'clerigo', { maxCircle: 2 }).find((s) => s.name === 'Sopro das Uivantes');
    expect(sp?.type).toBe('divina');
    const g = spellGrantFor('Conhecimento Mágico', 'clerigo')!;
    const [learned] = spellsFromGrant(g, [sp!], owner);
    expect(learned.costReducedBy).toEqual(['Sopro do Mar']);
    expect(spellBaseCost(learned)).toBe(2);
  });

  it('não aparece antes do 2º círculo', () => {
    const owner = { classId: 'clerigo', level: 1, powers: [{ id: 'sopro_do_mar', name: 'Sopro do Mar' }], spells: [] };
    expect(learnableClassSpells(owner, 'clerigo', { maxCircle: 1 }).some((s) => s.name === 'Sopro das Uivantes')).toBe(false);
  });
});

describe('Fórmulas do inventor (pág. 70)', () => {
  it('círculo máximo: 1º; 2º no 6º nível; Mestre Alquimista +1 no 10º, 14º e 18º', () => {
    expect(formulaMaxCircle({ classId: 'inventor', level: 5 })).toBe(1);
    expect(formulaMaxCircle({ classId: 'inventor', level: 6 })).toBe(2);
    expect(formulaMaxCircle({ classId: 'inventor', level: 10 })).toBe(2);
    expect(formulaMaxCircle({ classId: 'inventor', level: 14, powers: [{ id: 'inventor_mestre_alquimista', name: 'Mestre Alquimista' }] })).toBe(4);
  });

  it('Alquimista Iniciado: três fórmulas de 1º círculo, arcanas ou divinas, que não são lançadas', () => {
    const g = spellGrantFor('Alquimista Iniciado', 'inventor')!;
    expect(g.choose?.count).toBe(3);
    const opts = spellOptionsForGrant(g, { classId: 'inventor', level: 2 });
    expect(opts.every((s) => s.circle === 1)).toBe(true);
    expect(new Set(opts.map((s) => s.type))).toEqual(new Set(['arcana', 'divina', 'universal']));
    const [f] = spellsFromGrant(g, [opts[0]]);
    expect(f.isFormula).toBe(true);
    expect(f.keyAttribute).toBe('int');
  });
});

describe('Escriba Arcano (pág. 38)', () => {
  it('um dia e T$ 250 por PM', () => {
    expect(scribeCost(3)).toEqual({ pm: 6, days: 6, tibares: 1500 });
  });
});
