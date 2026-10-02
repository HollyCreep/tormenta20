import { RACES_LIST } from '../data/races';
import { CLASSES_LIST } from '../data/classes';
import { ORIGINS_LIST } from '../data/origins';
import { DEITIES_LIST } from '../data/deities';
import { SKILLS_LIST } from '../data/skills';
import type { CharacterSheet } from '../types/character';

/**
 * Nomes de exibição a partir dos ids canônicos (evita mostrar "ANAO" em vez de "Anão").
 */

const titleCase = (raw: string) =>
  raw
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\p{L}/gu, (c) => c.toUpperCase());

export const raceName = (id?: string): string => {
  if (!id) return '—';
  return RACES_LIST.find((r) => r.id === id)?.name ?? titleCase(id);
};

export const classDisplayName = (id?: string): string => {
  if (!id) return '—';
  return CLASSES_LIST.find((c) => c.id === id)?.name ?? titleCase(id);
};

export const originName = (id?: string): string => {
  if (!id) return '—';
  return ORIGINS_LIST.find((o) => o.id === id)?.name ?? titleCase(id);
};

export const deityName = (id?: string): string => {
  if (!id || id === 'nenhum' || id === 'nenhuma') return 'Sem divindade';
  return DEITIES_LIST.find((d) => d.id === id)?.name ?? titleCase(id);
};

export const skillName = (id?: string): string => {
  if (!id) return '—';
  return SKILLS_LIST.find((s) => s.id === id)?.name ?? titleCase(id);
};

/** "Guerreiro 3" ou, em multiclasse, "Guerreiro 3 / Arcanista 2". */
export const classLine = (char: Pick<CharacterSheet, 'classId' | 'level' | 'classes'>): string => {
  if (char.classes && char.classes.length > 1) {
    return char.classes.map((c) => `${c.className || classDisplayName(c.classId)} ${c.level}`).join(' / ');
  }
  return `${classDisplayName(char.classId)} ${char.level}`;
};

/** "Anão · Guerreiro 3" */
export const heroLine = (char: Pick<CharacterSheet, 'raceId' | 'classId' | 'level' | 'classes'>): string =>
  `${raceName(char.raceId)} · ${classLine(char)}`;

export const formatSigned = (value: number): string => (value > 0 ? `+${value}` : `${value}`);

export const percent = (value: number, max: number): string => {
  if (!max || max <= 0) return '0%';
  return `${Math.max(0, Math.min(100, (value / max) * 100))}%`;
};
