import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { CharacterSheet } from '../types/character';
import { storageService } from '../services/storage';
import { logService, type ChangeLogOptions } from '../services/logService';

interface CharacterContextValue {
  characters: CharacterSheet[];
  activeCharacter: CharacterSheet | null;
  activeCharacterId: string | null;
  setActiveCharacterId: (id: string | null) => void;
  updateCharacter: (char: CharacterSheet, logOptions?: ChangeLogOptions) => void;
  saveCharacter: (char: CharacterSheet) => void;
  deleteCharacter: (id: string) => void;
  duplicateCharacter: (char: CharacterSheet) => CharacterSheet;
  refreshCharacters: () => void;
  exportCharacter: (char: CharacterSheet) => void;
  importCharacter: (file: File) => Promise<CharacterSheet>;
}

const CharacterContext = createContext<CharacterContextValue | undefined>(undefined);

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [characters, setCharacters] = useState<CharacterSheet[]>([]);
  const [activeCharacterId, setActiveCharacterId] = useState<string | null>(null);

  const refreshCharacters = useCallback(() => {
    const loaded = storageService.loadCharacters();
    setCharacters(loaded);
    return loaded;
  }, []);

  useEffect(() => {
    const loaded = refreshCharacters();
    if (loaded.length > 0 && !activeCharacterId) {
      setActiveCharacterId(loaded[0].id);
    }
  }, [refreshCharacters, activeCharacterId]);

  const activeCharacter = characters.find((c) => c.id === activeCharacterId) || null;

  const updateCharacter = useCallback(
    (updated: CharacterSheet, logOptions?: ChangeLogOptions) => {
      if (activeCharacter) {
        logService.diffAndLogChanges(
          activeCharacter,
          updated,
          updated.playerName || 'Jogador',
          logOptions
        );
      }
      storageService.saveCharacter(updated);
      setCharacters(storageService.loadCharacters());
    },
    [activeCharacter]
  );

  const saveCharacter = useCallback((char: CharacterSheet) => {
    // Auditoria: criação ou edição pelo criador de personagem
    const previous = storageService.loadCharacters().find((c) => c.id === char.id);
    if (previous) {
      logService.diffAndLogChanges(previous, char, char.playerName || 'Jogador', { origin: 'Criador de personagem' });
    } else {
      logService.addChangeLog({
        characterId: char.id,
        characterName: char.name,
        userName: char.playerName || 'Jogador',
        changeType: 'geral',
        title: `Personagem criado: ${char.name}`,
        description: `Criado no nível ${char.level}.`,
        origin: 'Criador de personagem',
      });
    }
    storageService.saveCharacter(char);
    const updated = storageService.loadCharacters();
    setCharacters(updated);
    setActiveCharacterId(char.id);
  }, []);

  const deleteCharacter = useCallback(
    (id: string) => {
      storageService.deleteCharacter(id);
      const updated = storageService.loadCharacters();
      setCharacters(updated);
      if (activeCharacterId === id) {
        setActiveCharacterId(updated.length > 0 ? updated[0].id : null);
      }
    },
    [activeCharacterId]
  );

  const duplicateCharacter = useCallback((char: CharacterSheet) => {
    const copy = storageService.duplicateCharacter(char);
    const updated = storageService.loadCharacters();
    setCharacters(updated);
    setActiveCharacterId(copy.id);
    return copy;
  }, []);

  const exportCharacter = useCallback((char: CharacterSheet) => {
    storageService.exportCharacterJson(char);
  }, []);

  const importCharacter = useCallback((file: File): Promise<CharacterSheet> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const imported = storageService.importCharacterJson(text);
          const updated = storageService.loadCharacters();
          setCharacters(updated);
          setActiveCharacterId(imported.id);
          resolve(imported);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error('Erro ao ler arquivo.'));
      reader.readAsText(file);
    });
  }, []);

  return (
    <CharacterContext.Provider
      value={{
        characters,
        activeCharacter,
        activeCharacterId,
        setActiveCharacterId,
        updateCharacter,
        saveCharacter,
        deleteCharacter,
        duplicateCharacter,
        refreshCharacters,
        exportCharacter,
        importCharacter,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = (): CharacterContextValue => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
};
