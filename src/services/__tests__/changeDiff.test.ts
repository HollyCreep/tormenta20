import { describe, expect, it } from 'vitest';
import { computeChanges } from '../changeDiff';
import { createSampleCharacters } from '../sampleCharacters';
import { recalculateFullCharacterSheet } from '../../utils/rulesEngine';
import type { CharacterSheet } from '../../types/character';

const base = (): CharacterSheet => recalculateFullCharacterSheet(createSampleCharacters()[0]);

describe('Auditoria: computeChanges', () => {
  it('sem alteração, nada registrado', () => {
    const a = base();
    expect(computeChanges(a, JSON.parse(JSON.stringify(a)))).toEqual([]);
  });

  it('atributos, perícias e ajustes manuais', () => {
    const a = base();
    const b = JSON.parse(JSON.stringify(a)) as CharacterSheet;
    b.totalAttributes.for += 1;
    b.skills.acrobacia = { ...b.skills.acrobacia, isTrained: !a.skills.acrobacia.isTrained };
    b.customAdjustments = { defense: 2, skills: { percepcao: 3 } };
    const ch = computeChanges(a, b, { freeEdit: true, actionReason: 'Bênção do mestre' });
    const types = ch.map((c) => c.changeType);
    expect(types).toEqual(expect.arrayContaining(['atributos', 'pericias', 'estatisticas']));
    expect(ch.every((c) => c.freeEdit && c.origin === 'Edição livre' && c.reason === 'Bênção do mestre')).toBe(true);
    const skills = ch.find((c) => c.changeType === 'pericias')!;
    expect(skills.diff?.map((d) => d.field)).toEqual(expect.arrayContaining(['Acrobacia (treino)', 'Percepção (ajuste)']));
  });

  it('poderes adicionados e removidos, contando repetições', () => {
    const a = base();
    const b = JSON.parse(JSON.stringify(a)) as CharacterSheet;
    const removed = b.powers.shift()!;
    b.powers.push({ id: 'x', name: 'Foco em Arma', source: 'geral', description: '' }, { id: 'y', name: 'Foco em Arma', source: 'geral', description: '' });
    const ch = computeChanges(a, b);
    expect(ch.filter((c) => c.title === 'Novo Poder Adquirido: Foco em Arma')).toHaveLength(2);
    expect(ch.some((c) => c.title === `Poder Removido: ${removed.name}`)).toBe(true);
  });

  it('magia removida, quantidade de item e nível', () => {
    const a = base();
    const b = JSON.parse(JSON.stringify(a)) as CharacterSheet;
    b.spells = [{ ...(b.spells[0] || ({} as never)), id: 'bola_de_fogo', name: 'Bola de Fogo', circle: 2, school: 'Evocação' } as never];
    b.inventory[0] = { ...b.inventory[0], quantity: (b.inventory[0].quantity || 1) + 2 };
    b.level += 1;
    const ch = computeChanges(a, b);
    expect(ch.some((c) => c.title.startsWith('Quantidade de'))).toBe(true);
    expect(ch.some((c) => c.changeType === 'nivel')).toBe(true);
    expect(ch.some((c) => c.title === 'Nova Magia Aprendida: Bola de Fogo')).toBe(true);
  });

  it('ajustes manuais entram nos totais', () => {
    const a = base();
    const b = recalculateFullCharacterSheet({ ...a, customAdjustments: { defense: 2, maxHp: 5, skills: { percepcao: 3 } } });
    expect(b.stats.defense.value).toBe(a.stats.defense.value + 2);
    expect(b.stats.maxHp.value).toBe(a.stats.maxHp.value + 5);
    expect(b.skills.percepcao.total).toBe(a.skills.percepcao.total + 3);
  });
});
