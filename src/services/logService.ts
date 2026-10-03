import { CharacterSheet, RollHistoryEntry, CharacterChangeLogEntry } from '../types/character';

const ROLLS_STORAGE_KEY = 't20_roll_history';
const CHANGELOG_STORAGE_KEY = 't20_character_changelog';
const MAX_STORED_LOGS = 500;

import { computeChanges, type ChangeLogOptions } from './changeDiff';

export type { ChangeLogOptions };

export const logService = {
  // === HISTÓRICO DE ROLAGENS ===
  getRolls(): RollHistoryEntry[] {
    try {
      const data = localStorage.getItem(ROLLS_STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as RollHistoryEntry[];
    } catch {
      return [];
    }
  },

  addRoll(entry: Omit<RollHistoryEntry, 'id' | 'timestamp' | 'timeFormatted' | 'dateFormatted'> & { id?: string; timestamp?: string }): RollHistoryEntry {
    const now = new Date();
    const fullEntry: RollHistoryEntry = {
      ...entry,
      id: entry.id || `roll_${now.getTime()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: entry.timestamp || now.toISOString(),
      timeFormatted: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      dateFormatted: now.toLocaleDateString(),
      userName: entry.userName || 'Jogador',
    };

    try {
      const existing = this.getRolls();
      const updated = [fullEntry, ...existing.slice(0, MAX_STORED_LOGS - 1)];
      localStorage.setItem(ROLLS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erro ao salvar rolagem no histórico:', e);
    }

    return fullEntry;
  },

  clearRolls(characterId?: string): void {
    if (characterId) {
      const remaining = this.getRolls().filter((r) => r.characterId !== characterId);
      localStorage.setItem(ROLLS_STORAGE_KEY, JSON.stringify(remaining));
    } else {
      localStorage.removeItem(ROLLS_STORAGE_KEY);
    }
  },

  updateRollAnnotation(rollId: string, annotation: string): void {
    try {
      const rolls = this.getRolls();
      const updated = rolls.map((r) => (r.id === rollId ? { ...r, annotation: annotation.trim() || undefined } : r));
      localStorage.setItem(ROLLS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erro ao atualizar anotação da rolagem:', e);
    }
  },

  // === HISTÓRICO DE ALTERAÇÕES DA FICHA (AUDIT LOG) ===
  getChangeLogs(): CharacterChangeLogEntry[] {
    try {
      const data = localStorage.getItem(CHANGELOG_STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as CharacterChangeLogEntry[];
    } catch {
      return [];
    }
  },

  addChangeLog(entry: Omit<CharacterChangeLogEntry, 'id' | 'timestamp' | 'timeFormatted' | 'dateFormatted'> & { id?: string; timestamp?: string }): CharacterChangeLogEntry {
    const now = new Date();
    const fullEntry: CharacterChangeLogEntry = {
      ...entry,
      id: entry.id || `chg_${now.getTime()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: entry.timestamp || now.toISOString(),
      timeFormatted: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      dateFormatted: now.toLocaleDateString(),
      userName: entry.userName || 'Jogador',
    };

    try {
      const existing = this.getChangeLogs();
      const updated = [fullEntry, ...existing.slice(0, MAX_STORED_LOGS - 1)];
      localStorage.setItem(CHANGELOG_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erro ao salvar log de alteração da ficha:', e);
    }

    return fullEntry;
  },

  clearChangeLogs(characterId?: string): void {
    if (characterId) {
      const remaining = this.getChangeLogs().filter((c) => c.characterId !== characterId);
      localStorage.setItem(CHANGELOG_STORAGE_KEY, JSON.stringify(remaining));
    } else {
      localStorage.removeItem(CHANGELOG_STORAGE_KEY);
    }
  },

  updateChangeLogAnnotation(logId: string, annotation: string): void {
    try {
      const logs = this.getChangeLogs();
      const updated = logs.map((l) => (l.id === logId ? { ...l, annotation: annotation.trim() || undefined } : l));
      localStorage.setItem(CHANGELOG_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erro ao atualizar anotação do log de auditoria:', e);
    }
  },

  /** Compara as versões da ficha e registra cada alteração na auditoria (ver `computeChanges`). */
  diffAndLogChanges(
    oldSheet: CharacterSheet,
    newSheet: CharacterSheet,
    authorOrOptions?: string | ChangeLogOptions,
    maybeOptions?: ChangeLogOptions
  ): CharacterChangeLogEntry[] {
    const author = typeof authorOrOptions === 'string' ? authorOrOptions : 'Jogador';
    const options = typeof authorOrOptions === 'object' && authorOrOptions !== null ? authorOrOptions : maybeOptions;
    return computeChanges(oldSheet, newSheet, options).map((e) =>
      this.addChangeLog({ ...e, characterId: newSheet.id, characterName: newSheet.name, userName: author })
    );
  },
};
