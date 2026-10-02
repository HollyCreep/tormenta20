import { describe, expect, it } from 'vitest';
import {
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
    expect(res).toEqual([{ name: 'Medicina', unmet: ['Treinado em Cura'] }]);
  });
});
