import { RACES_LIST } from '../data/races';
import type { RaceAbility } from '../types/rules';

/**
 * Memória Póstuma (Osteon, Cap. 1, pág. 29): "Como alternativa, você pode ser um osteon de outra raça
 * humanoide que não humano. Neste caso, você ganha uma habilidade dessa raça a sua escolha. Se a raça
 * era de tamanho diferente de Médio, você também possui sua categoria de tamanho."
 * A escolha fica em `racialChoices[OSTEON_FORMER_KEY] = [raceId, abilityId]`.
 */
export const OSTEON_FORMER_KEY = 'osteon_memoria_postuma';

/** Raças humanoides (sem tipo de criatura próprio), exceto humano e osteon. */
export const OSTEON_FORMER_RACES = RACES_LIST.filter((r) => !r.creatureType && r.id !== 'humano' && r.id !== 'osteon');

interface RaceRef {
  raceId?: string;
  racialChoices?: Record<string, string[]>;
}

/** Raça e habilidade herdadas pelo osteon, se escolhidas. */
export function osteonFormer(ref: RaceRef): { raceId: string; raceName: string; size: string; ability?: RaceAbility } | null {
  if (ref.raceId !== 'osteon') return null;
  const [raceId, abilityId] = ref.racialChoices?.[OSTEON_FORMER_KEY] || [];
  const race = OSTEON_FORMER_RACES.find((r) => r.id === raceId);
  if (!race) return null;
  return { raceId: race.id, raceName: race.name, size: race.size, ability: race.abilities.find((a) => a.id === abilityId) };
}

/** O personagem tem a habilidade racial (própria ou herdada pela Memória Póstuma)? */
export function hasRaceAbility(ref: RaceRef, abilityId: string): boolean {
  const race = RACES_LIST.find((r) => r.id === ref.raceId);
  if (race?.abilities.some((a) => a.id === abilityId)) return true;
  return osteonFormer(ref)?.ability?.id === abilityId;
}

/** Tamanho efetivo: o da raça, ou o da raça anterior do osteon quando diferente de Médio. */
export function effectiveSize(ref: RaceRef): string {
  const former = osteonFormer(ref);
  if (former && former.size !== 'Médio') return former.size;
  return RACES_LIST.find((r) => r.id === ref.raceId)?.size || 'Médio';
}
