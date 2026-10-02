import React, { createContext, useContext, useState, useCallback } from 'react';
import type { RollResult } from '../components/common/DiceRollerWidget';
import { logService } from '../services/logService';
import type { CharacterSheet } from '../types/character';

interface DiceContextValue {
  recentRolls: RollResult[];
  rollDice: (
    title: string,
    sides: number,
    modifier: number,
    count?: number,
    activeCharacter?: CharacterSheet | null
  ) => RollResult;
  clearRecentRolls: () => void;
}

const DiceContext = createContext<DiceContextValue | undefined>(undefined);

export const DiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recentRolls, setRecentRolls] = useState<RollResult[]>([]);

  const rollDice = useCallback(
    (
      rawTitle: string,
      sides: number,
      modifier: number,
      count: number = 1,
      activeCharacter?: CharacterSheet | null
    ): RollResult => {
      let rollSum = 0;
      const rollsArray: number[] = [];
      for (let i = 0; i < count; i++) {
        const r = Math.floor(Math.random() * sides) + 1;
        rollsArray.push(r);
        rollSum += r;
      }

      const total = rollSum + modifier;
      const isCrit = sides === 20 && count === 1 && rollsArray[0] === 20;
      const isFumble = sides === 20 && count === 1 && rollsArray[0] === 1;

      let title = rawTitle.trim();
      let components = '';
      const match = rawTitle.match(/^(.*?)\s*\[(.*)\]$/);
      if (match) {
        title = match[1].trim();
        components = match[2].trim();
      }

      let category: 'ataque' | 'dano' | 'pericia' | 'atributo' | 'magia' | 'livre' = 'livre';
      const low = title.toLowerCase();
      if (low.includes('ataque')) category = 'ataque';
      else if (low.includes('dano')) category = 'dano';
      else if (low.includes('teste de') || low.includes('perícia') || low.includes('pericia')) category = 'pericia';
      else if (low.includes('magia') || low.includes('lançar')) category = 'magia';
      else if (low.includes('força') || low.includes('destreza') || low.includes('constituição') || low.includes('inteligência') || low.includes('sabedoria') || low.includes('carisma')) category = 'atributo';

      const rollType = sides === 20 ? 'd20' : sides === 6 ? 'd6' : sides === 8 ? 'd8' : sides === 10 ? 'd10' : sides === 12 ? 'd12' : sides === 4 ? 'd4' : sides === 100 ? 'd100' : 'multiplo';

      const formula =
        modifier !== 0
          ? `${count > 1 ? `${count}d${sides}` : `d${sides}`} [${rollsArray.join(', ')}] ${modifier > 0 ? `+ ${modifier}` : `- ${Math.abs(modifier)}`} = ${total}`
          : `${count > 1 ? `${count}d${sides}` : `d${sides}`} [${rollsArray.join(', ')}] = ${total}`;

      const newRoll: RollResult = {
        id: 'roll_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        title: rawTitle,
        cleanTitle: title,
        formula,
        diceResult: rollSum,
        modifier,
        total,
        isCrit,
        isFumble,
        timestamp: new Date().toLocaleTimeString(),
        breakdown: components,
      };

      setRecentRolls((prev) => [newRoll, ...prev.slice(0, 19)]);

      logService.addRoll({
        characterId: activeCharacter?.id,
        characterName: activeCharacter?.name,
        userName: activeCharacter?.playerName || 'Jogador',
        category,
        rollType: rollType as any,
        title,
        formula,
        components,
        diceResults: rollsArray,
        modifier,
        total,
        isCrit,
        isFumble,
      });

      return newRoll;
    },
    []
  );

  const clearRecentRolls = useCallback(() => {
    setRecentRolls([]);
  }, []);

  return (
    <DiceContext.Provider value={{ recentRolls, rollDice, clearRecentRolls }}>
      {children}
    </DiceContext.Provider>
  );
};

export const useDice = (): DiceContextValue => {
  const context = useContext(DiceContext);
  if (!context) {
    throw new Error('useDice must be used within a DiceProvider');
  }
  return context;
};
