import { describe, expect, it } from 'vitest';
import {
  checkPowerPrerequisites,
  checkPrerequisiteText,
  canBeDevotee,
  grantedPowerCount,
  findDuplicatePowers,
  isRepeatablePower,
  powersWithUnmetPrerequisites,
  takenPowersExcept,
  type PrerequisiteContext,
} from '../rulesValidation';

const ATTRS = { for: 0, des: 0, con: 0, int: 0, sab: 1, car: 0 };

describe('Poderes repetidos (Cap. 1, pág. 33)', () => {
  it('acusa o mesmo poder vindo de raça (id) e origem (nome)', () => {
    const dups = findDuplicatePowers([
      { source: 'raça', powers: ['medicina'] },
      { source: 'origem', powers: ['Medicina'] },
      { source: 'divindade', powers: [] },
    ]);
    expect(dups).toEqual([{ name: 'Medicina', sources: ['raça', 'origem'] }]);
  });

  it('permite poderes que o livro declara repetíveis', () => {
    expect(isRepeatablePower('Treinamento em Perícia')).toBe(true);
    const dups = findDuplicatePowers([
      { source: 'raça', powers: ['Treinamento em Perícia'] },
      { source: 'origem', powers: ['Treinamento em Perícia'] },
    ]);
    expect(dups).toEqual([]);
  });

  it('lista o que já foi escolhido pelas outras fontes', () => {
    const taken = takenPowersExcept(
      [
        { source: 'raça', powers: ['medicina'] },
        { source: 'origem', powers: ['Medicina'] },
      ],
      'origem'
    );
    expect(taken.get('Medicina')).toBe('raça');
    expect(taken.size).toBe(1);
  });
});

describe('Pré-requisitos perdidos (Cap. 1, pág. 85)', () => {
  const ctx = (skills: string[]): PrerequisiteContext => ({ attributes: ATTRS, trainedSkillIds: skills });

  it('mantém o poder enquanto a perícia exigida está treinada', () => {
    expect(powersWithUnmetPrerequisites(['Medicina'], ctx(['cura']))).toEqual([]);
  });

  it('acusa o poder quando a perícia exigida deixa de ser treinada', () => {
    const res = powersWithUnmetPrerequisites(['Medicina', 'Poder único da origem'], ctx([]));
    expect(res).toEqual([{ name: 'Medicina', unmet: ['treinado em Cura'] }]);
  });
});

describe('Pré-requisitos lidos do texto do livro (Cap. 2)', () => {
  const base: PrerequisiteContext = { attributes: { for: 2, des: 2, con: 1, int: 0, sab: 1, car: 0 }, trainedSkillIds: ['luta'] };

  it('atributos, treinamento e alternativas com "ou"', () => {
    expect(checkPrerequisiteText('Des 2, treinado em Luta', base).isMet).toBe(true);
    expect(checkPrerequisiteText('Des 3, treinado em Luta', base).unmetRequirements).toEqual(['Des 3 (atual: 2)']);
    expect(checkPrerequisiteText('treinado em Luta ou Pontaria', base).isMet).toBe(true);
    expect(checkPrerequisiteText('Estilo de Disparo ou Estilo de Arremesso', { ...base, powerNames: ['Estilo de Arremesso'] }).isMet).toBe(true);
  });

  it('níveis de personagem e de classe', () => {
    expect(checkPrerequisiteText('6º nível de personagem', { ...base, level: 5 }).isMet).toBe(false);
    expect(checkPrerequisiteText('5º nível de bardo', { ...base, level: 5, classId: 'bardo' }).isMet).toBe(true);
    expect(checkPrerequisiteText('5º nível de bardo', { ...base, level: 5, classId: 'guerreiro' }).isMet).toBe(false);
  });

  it('poderes da Tormenta contam os poderes já possuídos', () => {
    const ctx = { ...base, powerNames: ['Antenas', 'Carapaça', 'Dentes Afiados'] };
    expect(checkPrerequisiteText('três outros poderes da Tormenta', ctx).isMet).toBe(true);
    expect(checkPrerequisiteText('quatro outros poderes da Tormenta', ctx).isMet).toBe(false);
  });

  it('Acrobático exige só Des 2 e Atlético exige For 2 (pág. 128)', () => {
    expect(checkPowerPrerequisites('Acrobático', base).isMet).toBe(true);
    expect(checkPowerPrerequisites('Atlético', base).isMet).toBe(true);
    expect(checkPowerPrerequisites('Atlético', { ...base, attributes: { ...base.attributes, for: 1 } }).isMet).toBe(false);
  });

  it('poderes de magia exigem lançar magias; concedidos exigem ser devoto do deus', () => {
    expect(checkPowerPrerequisites('Magia Ampliada', base).unmetRequirements).toContain('lançar magias');
    expect(checkPowerPrerequisites('Bênção do Mana', { ...base, deityId: 'wynna' }).isMet).toBe(true);
    expect(checkPowerPrerequisites('Bênção do Mana', { ...base, deityId: 'khalmyr' }).isMet).toBe(false);
  });
});

describe('Devotos (Cap. 1, pág. 96)', () => {
  it('raça ou classe precisa constar em Devotos; humanos e clérigos são exceção', () => {
    expect(canBeDevotee('allihanna', 'elfo', 'guerreiro').ok).toBe(true);
    expect(canBeDevotee('allihanna', 'anao', 'guerreiro').ok).toBe(false);
    expect(canBeDevotee('allihanna', 'humano', 'guerreiro').ok).toBe(true);
    expect(canBeDevotee('allihanna', 'anao', 'clerigo').ok).toBe(true);
  });
  it('druidas só seguem Allihanna, Megalokk ou Oceano; clérigos e druidas recebem 2 poderes', () => {
    expect(canBeDevotee('khalmyr', 'humano', 'druida').ok).toBe(false);
    expect(grantedPowerCount('druida')).toBe(2);
    expect(grantedPowerCount('guerreiro')).toBe(1);
  });
});
