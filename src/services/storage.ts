import { CharacterSheet } from '../types/character';
import { createSampleCharacters } from './sampleCharacters';
import { SPELLS_LIST } from '../data/spells';
import { logService } from './logService';

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
        let hasFixedCorruptions = false;
        const sanitized = parsed.map((char: CharacterSheet) => {
          if (char && Array.isArray(char.spells)) {
            const healedSpells = char.spells
              .map((sp) => {
                if (!sp || !sp.id || !sp.name) {
                  hasFixedCorruptions = true;
                  const fallback = SPELLS_LIST.find((s) => s.id === 'explosao_de_chamas');
                  if (fallback) {
                    // Registra no audit log que uma magia corrompida foi substituída
                    logService.addChangeLog({
                      characterId: char.id,
                      characterName: char.name,
                      userName: 'Sistema',
                      changeType: 'magias',
                      title: 'Magia Corrompida Recuperada (Auto-Reparo)',
                      description: `Uma magia com dados inválidos (id: ${sp?.id || 'desconhecido'}) foi detectada e substituída por "${fallback.name}" para evitar perda de dados. Revise seu grimório.`,
                    });
                    return { ...fallback, learnedFrom: sp?.learnedFrom || 'classe' };
                  }
                }
                const canonical = SPELLS_LIST.find((s) => s.id === sp.id);
                if (canonical && (!sp.description || !sp.upgrades)) {
                  hasFixedCorruptions = true;
                  return { ...canonical, ...sp, description: canonical.description, upgrades: canonical.upgrades };
                }
                return sp;
              })
              .filter((sp) => Boolean(sp && sp.id && sp.name));

            return { ...char, spells: healedSpells };
          }
          return char;
        });

        if (hasFixedCorruptions) {
          this.saveAll(sanitized);
        }
        return sanitized;
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
    char.updatedAt = new Date().toISOString();

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const list: CharacterSheet[] = JSON.parse(raw);
        const index = list.findIndex((c) => c.id === char.id);
        if (index >= 0) {
          list[index] = char;
        } else {
          list.unshift(char);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      } else {
        // Não há dados — salva como novo array
        localStorage.setItem(STORAGE_KEY, JSON.stringify([char]));
      }
    } catch (e) {
      console.error('Erro ao salvar personagem:', e);
      // Fallback: carrega e salva tudo (seguro mas lento)
      const list = this.loadCharacters();
      const index = list.findIndex((c) => c.id === char.id);
      if (index >= 0) {
        list[index] = char;
      } else {
        list.unshift(char);
      }
      this.saveAll(list);
    }
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
