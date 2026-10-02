import React, { useState } from 'react';
import type { CharacterSheet } from '../../types/character';
import { SpellsCompendium } from './SpellsCompendium';
import { PowersCompendium } from './PowersCompendium';
import { ClassPowersCompendium } from './ClassPowersCompendium';
import { ItemsCompendium } from './ItemsCompendium';
import { BookOpen, Sparkles, Package, Sword } from 'lucide-react';

export type CompendiumTabType = 'magias' | 'poderes' | 'itens';
export type PowersSubTabType = 'gerais' | 'classe';

interface CompendiumViewProps {
  activeTab: CompendiumTabType;
  onTabChange: (tab: CompendiumTabType) => void;
  activeCharacter: CharacterSheet | null;
  characters: CharacterSheet[];
  initialPowersSubTab?: PowersSubTabType;
  onBack?: () => void;
}

export const CompendiumView: React.FC<CompendiumViewProps> = ({
  activeTab,
  onTabChange,
  activeCharacter,
  characters,
  initialPowersSubTab = 'gerais',
  onBack,
}) => {
  const [powersSubTab, setPowersSubTab] = useState<PowersSubTabType>(initialPowersSubTab);

  return (
    <div className="container" style={{ padding: '1.5rem 1.5rem 6rem 1.5rem', maxWidth: '1280px' }}>
      {/* Sub-abas do Compêndio (Nível 2) */}
      <div className="sub-tabs" style={{ marginBottom: '1.5rem' }}>
        <button
          type="button"
          className={activeTab === 'magias' ? 'active' : ''}
          onClick={() => onTabChange('magias')}
        >
          <BookOpen size={16} />
          <span>Magias</span>
        </button>
        <button
          type="button"
          className={activeTab === 'poderes' ? 'active' : ''}
          onClick={() => onTabChange('poderes')}
        >
          <Sparkles size={16} />
          <span>Poderes</span>
        </button>
        <button
          type="button"
          className={activeTab === 'itens' ? 'active' : ''}
          onClick={() => onTabChange('itens')}
        >
          <Package size={16} />
          <span>Itens & Equipamentos</span>
        </button>
      </div>

      {/* Conteúdo da Sub-Aba Ativa */}
      {activeTab === 'magias' && <SpellsCompendium onBack={onBack || (() => {})} />}

      {activeTab === 'poderes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Sub-sub-abas de Poderes: Gerais | Por Classe (Nível 3) */}
          <div className="sub-tabs sub-tabs-nested">
            <button
              type="button"
              className={powersSubTab === 'gerais' ? 'active' : ''}
              onClick={() => setPowersSubTab('gerais')}
            >
              <Sparkles size={15} />
              <span>Poderes Gerais</span>
            </button>
            <button
              type="button"
              className={powersSubTab === 'classe' ? 'active' : ''}
              onClick={() => setPowersSubTab('classe')}
            >
              <Sword size={15} />
              <span>Poderes Por Classe</span>
            </button>
          </div>

          {powersSubTab === 'gerais' && (
            <PowersCompendium
              activeCharacter={activeCharacter}
              characters={characters}
              onBack={onBack || (() => {})}
            />
          )}

          {powersSubTab === 'classe' && (
            <ClassPowersCompendium
              activeCharacter={activeCharacter}
              characters={characters}
              onBack={onBack || (() => {})}
            />
          )}
        </div>
      )}

      {activeTab === 'itens' && <ItemsCompendium onBack={onBack || (() => {})} />}
    </div>
  );
};
