import { CLASSES_LIST } from '../data/classes';
import { CLASS_POWERS_LIST } from '../data/classPowers';
import { SPELLS_LIST } from '../data/spells';
import { spellGrantFor, type PowerSpellGrant } from '../data/powerSpellGrants';
import type { CharacterPower, CharacterSpell } from '../types/character';
import type { Spell } from '../types/rules';
import { calculateSpellCircleUnlocked } from './rulesEngine';

/** Dados mínimos da ficha usados para resolver as magias concedidas por poderes. */
export interface SpellGrantOwner {
  classId: string;
  level: number;
  classes?: { classId: string; level: number }[];
  spellSchools?: string[];
  spells?: CharacterSpell[];
}

/** Classe que fornece um poder de classe (pelo id do catálogo, ex.: "arcanista_conhecimento_magico"). */
export function powerClassId(power: Pick<CharacterPower, 'id' | 'name'>): string | undefined {
  const byId = CLASS_POWERS_LIST.find((p) => p.id === power.id);
  if (byId) return byId.classId;
  return CLASSES_LIST.find((c) => power.id.startsWith(`${c.id}_`) && CLASS_POWERS_LIST.some((p) => p.classId === c.id && p.name === power.name))?.id;
}

export function grantForPower(power: Pick<CharacterPower, 'id' | 'name'>): PowerSpellGrant | undefined {
  return spellGrantFor(power.name, powerClassId(power));
}

const classLevelOf = (owner: SpellGrantOwner, classId: string) =>
  owner.classes?.find((c) => c.classId === classId)?.level ?? (owner.classId === classId ? owner.level : 0);

/**
 * Magias que o poder permite escolher: tipo e círculo que a classe pode lançar (Cap. 4, pág. 170),
 * escolas do bardo/druida quando o poder exige, sem repetir magias que o personagem já conhece.
 */
export function spellOptionsForGrant(grant: PowerSpellGrant, owner: SpellGrantOwner): Spell[] {
  const c = grant.choose;
  if (!c) return [];
  const cls = grant.classId ? CLASSES_LIST.find((x) => x.id === grant.classId) : undefined;
  const maxCircle = c.circle === 'castable' ? calculateSpellCircleUnlocked(Math.max(1, classLevelOf(owner, grant.classId || owner.classId)), grant.classId) : c.circle;
  const types = c.types === 'class' ? [cls?.spellcaster?.type || 'arcana'] : c.types;
  const schools = c.schools === 'known' ? (owner.spellSchools?.length ? owner.spellSchools : undefined) : c.schools;
  const known = new Set((owner.spells || []).map((s) => s.id));
  return SPELLS_LIST.filter(
    (s) =>
      (c.circle === 'castable' ? s.circle <= maxCircle : s.circle === maxCircle) &&
      (s.type === 'universal' || types.includes(s.type as 'arcana' | 'divina')) &&
      (!schools || schools.includes(s.school)) &&
      !known.has(s.id)
  ).sort((a, b) => a.circle - b.circle || a.name.localeCompare(b.name, 'pt-BR'));
}

/** Converte magias escolhidas/definidas por um poder em magias da ficha. */
export function spellsFromGrant(grant: PowerSpellGrant, spells: Spell[]): CharacterSpell[] {
  const isClassPower = !!grant.classId;
  return spells.map((s) => ({
    ...s,
    // Habilidade de classe: limite de PM = nível na classe; poder concedido: nível de personagem (Cap. 5, pág. 224)
    learnedFrom: isClassPower ? ('classe' as const) : ('poder' as const),
    ...(isClassPower ? { sourceClassId: grant.classId } : {}),
    ...(grant.keyAttribute ? { keyAttribute: grant.keyAttribute } : {}),
    sourcePower: grant.power,
  }));
}

export const spellByName = (name: string) => SPELLS_LIST.find((s) => s.name === name);

/** Magias fixas dos poderes (ex.: Dedo Verde → Controlar Plantas) que ainda não estão na ficha. */
export function fixedSpellsForPowers(powers: Pick<CharacterPower, 'id' | 'name'>[], current: CharacterSpell[] = []): CharacterSpell[] {
  const out: CharacterSpell[] = [];
  powers.forEach((p) => {
    const g = grantForPower(p);
    if (!g?.fixed) return;
    g.fixed.forEach((name) => {
      const sp = spellByName(name);
      if (!sp) return;
      if ([...current, ...out].some((s) => s.id === sp.id && s.sourcePower === g.power)) return;
      out.push(...spellsFromGrant(g, [sp]));
    });
  });
  return out;
}

export interface PendingSpellGrant {
  grant: PowerSpellGrant;
  /** Quantas magias o poder concede no total (poderes repetíveis: por vez escolhida). */
  needed: number;
  have: number;
}

/** Poderes de escolha (Conhecimento Mágico, Centelha Mágica, Totem Espiritual...) com magias pendentes. */
export function pendingSpellGrants(powers: Pick<CharacterPower, 'id' | 'name'>[], spells: CharacterSpell[] = []): PendingSpellGrant[] {
  const byKey = new Map<string, PendingSpellGrant>();
  powers.forEach((p) => {
    const grant = grantForPower(p);
    if (!grant || (!grant.choose && !grant.options)) return;
    const key = `${grant.power}|${grant.classId || ''}`;
    const per = grant.choose?.count || 1;
    const entry = byKey.get(key) || { grant, needed: 0, have: 0 };
    entry.needed += per;
    byKey.set(key, entry);
  });
  byKey.forEach((e) => {
    e.have = spells.filter((s) => s.sourcePower === e.grant.power && (!e.grant.classId || s.sourceClassId === e.grant.classId)).length;
  });
  return [...byKey.values()].filter((e) => e.have < e.needed);
}
