import { CharacterSheet } from '../types/character';
import { createSampleCharacters } from './sampleCharacters';

const STORAGE_KEY = 'tormenta20_characters_v1';

export const storageService = {
  loadCharacters(): CharacterSheet[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        const samples = createSampleCharacters();
        this.saveAll(samples);
        return samples;
      }
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      const samples = createSampleCharacters();
      this.saveAll(samples);
      return samples;
    } catch (e) {
      console.error('Erro ao carregar fichas do LocalStorage:', e);
      return createSampleCharacters();
    }
  },

  saveCharacter(char: CharacterSheet): void {
    const list = this.loadCharacters();
    const index = list.findIndex((c) => c.id === char.id);
    char.updatedAt = new Date().toISOString();

    if (index >= 0) {
      list[index] = char;
    } else {
      list.unshift(char);
    }
    this.saveAll(list);
  },

  deleteCharacter(id: string): void {
    const list = this.loadCharacters();
    const filtered = list.filter((c) => c.id !== id);
    this.saveAll(filtered);
  },

  duplicateCharacter(char: CharacterSheet): CharacterSheet {
    const copy: CharacterSheet = {
      ...JSON.parse(JSON.stringify(char)),
      id: 'char_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      name: `${char.name} (Cópia)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.saveCharacter(copy);
    return copy;
  },

  saveAll(list: CharacterSheet[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Erro ao salvar fichas no LocalStorage:', e);
    }
  },

  exportCharacterJson(char: CharacterSheet): void {
    const jsonStr = JSON.stringify(char, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${char.name.toLowerCase().replace(/\s+/g, '_')}_ficha_t20.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  importCharacterJson(jsonString: string): CharacterSheet {
    const parsed = JSON.parse(jsonString) as CharacterSheet;
    if (!parsed.name || !parsed.raceId || !parsed.classId) {
      throw new Error('Arquivo JSON inválido. Certifique-se de que é uma ficha válida de Tormenta 20.');
    }
    parsed.id = 'char_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    parsed.updatedAt = new Date().toISOString();
    this.saveCharacter(parsed);
    return parsed;
  },
};
