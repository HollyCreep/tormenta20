import { describe, expect, it } from 'vitest';
import { OSTEON_FORMER_KEY, OSTEON_FORMER_RACES, effectiveSize, hasRaceAbility } from '../raceAbilities';
import { collectPassiveEffects, type RulesInput } from '../passiveEffects';
import { isRepeatablePower } from '../rulesValidation';

const osteon = (raceId: string, abilityId: string): RulesInput =>
  ({
    level: 1,
    classId: 'guerreiro',
    raceId: 'osteon',
    attributes: { for: 0, des: 0, con: 0, int: 0, sab: 0, car: 0 },
    inventory: [],
    powerNames: [],
    racialChoices: { [OSTEON_FORMER_KEY]: [raceId, abilityId] },
  }) as unknown as RulesInput;

describe('Memória Póstuma (Osteon, Cap. 1, pág. 29)', () => {
  it('só aceita raças humanoides que não humano', () => {
    const ids = OSTEON_FORMER_RACES.map((r) => r.id);
    expect(ids).toContain('anao');
    expect(ids).not.toContain('humano');
    expect(ids).not.toContain('lefou');
    expect(ids).not.toContain('golem');
  });

  it('herda só a habilidade escolhida', () => {
    const i = osteon('elfo', 'elfo_sentidos_elficos');
    expect(hasRaceAbility(i, 'elfo_sentidos_elficos')).toBe(true);
    expect(hasRaceAbility(i, 'elfo_sangue_magico')).toBe(false);
    const fx = collectPassiveEffects(i);
    expect(fx.some((e) => e.skills?.percepcao === 2)).toBe(true);
    expect(fx.some((e) => e.mp)).toBe(false);
  });

  it('assume o tamanho da raça anterior quando não é Médio', () => {
    const i = osteon('goblin', 'goblin_rato_ruas');
    expect(effectiveSize(i)).toBe('Pequeno');
    expect(collectPassiveEffects(i).some((e) => e.skills?.furtividade === 2)).toBe(true);
  });
});

describe('Herança (Cap. 1, pág. 91)', () => {
  it('pode ser escolhida duas vezes', () => {
    expect(isRepeatablePower('Herança')).toBe(true);
  });
});
