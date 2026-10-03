import {
  BLOODLINE_PAGE,
  DRACONIC_DAMAGE,
  HERANCA_APRIMORADA,
  HERANCA_SUPERIOR,
  TIER_LABEL,
  bloodlineDef,
  type BloodlineTier,
} from '../data/bloodlines';
import type { CharacterBloodline, CharacterPower } from '../types/character';
import type { AttributeKey, Spell } from '../types/rules';
import type { PowerSpellGrant } from '../data/powerSpellGrants';

/** Herança atual: básica; aprimorada e superior vêm dos poderes de arcanista (pág. 38). */
export function bloodlineTier(powerNames: string[] = []): BloodlineTier {
  if (powerNames.includes(HERANCA_SUPERIOR)) return 'superior';
  if (powerNames.includes(HERANCA_APRIMORADA)) return 'aprimorada';
  return 'basica';
}

const tierRank: Record<BloodlineTier, number> = { basica: 0, aprimorada: 1, superior: 2 };
export const hasTier = (powerNames: string[] | undefined, tier: BloodlineTier) => tierRank[bloodlineTier(powerNames)] >= tierRank[tier];

/**
 * Linhagem Rubra: as heranças aprimorada e superior "contam como um poder da Tormenta (exceto para perda
 * de Carisma)" (pág. 39).
 */
export function bloodlineTormentaBonus(bloodline: CharacterBloodline | undefined, powerNames: string[] = []): number {
  if (bloodline?.id !== 'rubra') return 0;
  return (hasTier(powerNames, 'aprimorada') ? 1 : 0) + (hasTier(powerNames, 'superior') ? 1 : 0);
}

/** Linhagem Rubra (básica): "pode perder outro atributo em vez de Carisma por poderes da Tormenta". */
export const tormentaLossAttribute = (bloodline?: CharacterBloodline): AttributeKey =>
  bloodline?.id === 'rubra' && bloodline.tormentaAttribute ? bloodline.tormentaAttribute : 'car';

const DAMAGE_RE: Record<string, RegExp> = {
  acido: /dano de [áa]cido/i,
  eletricidade: /dano de eletricidade/i,
  fogo: /dano de fogo/i,
  frio: /dano de frio/i,
};

/** A magia causa dano do tipo? (texto da magia: "pontos de dano de fogo"). */
export const spellDealsDamage = (spell: Partial<Pick<Spell, 'description'>>, type: string) => !!DAMAGE_RE[type]?.test(spell.description || '');

export interface BloodlineSpellMods {
  costReduction: number;
  dcBonus: number;
  /** Dano extra por dado (Dracônica aprimorada). */
  damagePerDie: number;
  sources: string[];
}

/**
 * Modificadores da linhagem numa magia:
 * - Dracônica aprimorada: magias do tipo escolhido custam –1 PM e causam +1 de dano por dado;
 * - Feérica aprimorada: encantamento e ilusão com CD +2 e –1 PM.
 * A Rubra aprimorada reduz magias escolhidas (registradas em `costReducedBy`).
 */
export function bloodlineSpellMods(
  owner: { bloodline?: CharacterBloodline; powers?: Pick<CharacterPower, 'name'>[] },
  spell: Partial<Pick<Spell, 'description' | 'school'>>
): BloodlineSpellMods {
  const mods: BloodlineSpellMods = { costReduction: 0, dcBonus: 0, damagePerDie: 0, sources: [] };
  const b = owner.bloodline;
  const names = (owner.powers || []).map((p) => p.name);
  if (!b || !hasTier(names, 'aprimorada')) return mods;
  if (b.id === 'draconica' && b.damageType && spellDealsDamage(spell, b.damageType)) {
    mods.costReduction = 1;
    mods.damagePerDie = 1;
    mods.sources.push('Linhagem Dracônica');
  }
  if (b.id === 'feerica' && (spell.school === 'Encantamento' || spell.school === 'Ilusão')) {
    mods.costReduction = 1;
    mods.dcBonus = 2;
    mods.sources.push('Linhagem Feérica');
  }
  return mods;
}

const damageLabel = (t?: string) => DRACONIC_DAMAGE.find((d) => d.id === t)?.label.toLowerCase() || '—';

/** Reduções e imunidades da linhagem (Dracônica: RD 5; superior: imunidade). */
export function bloodlineResistances(bloodline: CharacterBloodline | undefined, powerNames: string[] = []): string[] {
  if (bloodline?.id !== 'draconica' || !bloodline.damageType) return [];
  return hasTier(powerNames, 'superior') ? [`Imunidade a ${damageLabel(bloodline.damageType)}`] : [`Redução de ${damageLabel(bloodline.damageType)} 5`];
}

/** Poder que representa a linhagem na ficha, com o texto das heranças já recebidas. */
export function bloodlinePower(bloodline: CharacterBloodline, powerNames: string[] = []): CharacterPower {
  const def = bloodlineDef(bloodline.id)!;
  const tier = bloodlineTier(powerNames);
  const choice =
    bloodline.id === 'draconica'
      ? ` Tipo escolhido: ${damageLabel(bloodline.damageType)}.`
      : bloodline.id === 'rubra' && bloodline.tormentaAttribute && bloodline.tormentaAttribute !== 'car'
        ? ` Perde ${bloodline.tormentaAttribute.toUpperCase()} em vez de Carisma por poderes da Tormenta.`
        : '';
  const parts = (['basica', 'aprimorada', 'superior'] as BloodlineTier[])
    .filter((t) => tierRank[t] <= tierRank[tier])
    .map((t) => `${TIER_LABEL[t]}. ${def.tiers[t]}`);
  return {
    id: `arcanista_linhagem_${bloodline.id}`,
    name: def.name,
    source: 'classe',
    description: `${def.intro}${choice}\n\n${parts.join('\n\n')}\n\n(Cap. 1, pág. ${BLOODLINE_PAGE})`,
    type: 'passiva',
  };
}

/** Feérica (básica): magia de 1º círculo de encantamento ou ilusão, arcana ou divina (pág. 39). */
export const FEERICA_SPELL_GRANT: PowerSpellGrant = {
  power: 'Linhagem Feérica',
  classId: 'arcanista',
  choose: { count: 1, circle: 1, types: ['arcana', 'divina'], schools: ['Encantamento', 'Ilusão'] },
  page: BLOODLINE_PAGE,
};

/** Linhagem Rubra (aprimorada): quantas magias com –1 PM o personagem pode ter (uma por poder da Tormenta). */
export const RUBRA_SPELL_SOURCE = 'Linhagem Rubra';

/** Pendências da linhagem para a validação do criador/subida de nível. */
export function bloodlineErrors(bloodline: CharacterBloodline | undefined): string[] {
  if (!bloodline) return [`Escolha a linhagem sobrenatural do feiticeiro (Cap. 1, pág. ${BLOODLINE_PAGE}).`];
  const errors: string[] = [];
  if (bloodline.id === 'draconica' && !bloodline.damageType) errors.push('Linhagem Dracônica: escolha o tipo de dano.');
  if (bloodline.id === 'feerica' && !bloodline.spellId) errors.push('Linhagem Feérica: escolha a magia de encantamento ou ilusão.');
  if (bloodline.id === 'rubra' && !bloodline.tormentaPower) errors.push('Linhagem Rubra: escolha o poder da Tormenta.');
  return errors;
}
