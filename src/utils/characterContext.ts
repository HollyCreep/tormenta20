import { CLASSES_LIST } from '../data/classes';
import type { CharacterSheet } from '../types/character';
import { calculateSpellCircleUnlocked } from './rulesEngine';
import type { PrerequisiteContext } from './rulesValidation';

/** Níveis por classe da ficha (multiclasse) ou a classe única no nível do personagem. */
export function classLevelsOf(char: Pick<CharacterSheet, 'classId' | 'level' | 'classes'>): Record<string, number> {
  if (char.classes?.length) return Object.fromEntries(char.classes.map((c) => [c.classId, c.level]));
  return { [char.classId]: char.level || 1 };
}

/**
 * Contexto de pré-requisitos a partir de uma ficha salva: atributos, perícias treinadas,
 * proficiências da classe, conjuração, níveis, poderes e divindade.
 */
export function prerequisiteContextFor(char: CharacterSheet, extraPowerNames: string[] = []): PrerequisiteContext {
  const levels = classLevelsOf(char);
  const classDefs = Object.keys(levels)
    .map((id) => CLASSES_LIST.find((c) => c.id === id))
    .filter((c): c is (typeof CLASSES_LIST)[number] => !!c);
  // Proficiências: apenas as da primeira classe (Cap. 1, pág. 35: nova classe não concede proficiências)
  const first = CLASSES_LIST.find((c) => c.id === char.classId);
  const maxCircle = Math.max(
    0,
    ...classDefs.filter((c) => c.spellcaster).map((c) => calculateSpellCircleUnlocked(levels[c.id], c.id))
  );
  return {
    attributes: char.totalAttributes,
    trainedSkillIds: Object.values(char.skills || {})
      .filter((s) => s.isTrained)
      .map((s) => s.id),
    proficiencies: first ? { weapons: first.proficiencies.weapons, armor: first.proficiencies.armor, shields: first.proficiencies.shields } : undefined,
    isSpellcaster: maxCircle > 0 || (char.spells || []).some((s) => s.learnedFrom === 'classe'),
    maxSpellCircle: maxCircle,
    level: char.level || 1,
    classLevels: levels,
    classId: char.classId,
    classSubclass: char.classSubclass,
    powerNames: [...(char.powers || []).map((p) => p.name), ...extraPowerNames],
    deityId: char.deityId || 'nenhum',
  };
}
