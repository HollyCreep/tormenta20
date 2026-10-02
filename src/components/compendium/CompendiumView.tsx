import React, { useState } from 'react';
import { BookOpen, Package, Sparkles, Swords } from 'lucide-react';
import type { CharacterSheet } from '../../types/character';
import { AppBar } from '../ui/AppBar';
import { Segmented } from '../ui/controls';
import { SpellsCompendium } from './SpellsCompendium';
import { PowersCompendium } from './PowersCompendium';
import { ClassPowersCompendium } from './ClassPowersCompendium';
import { ItemsCompendium } from './ItemsCompendium';

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
}) => {
  const [powersSubTab, setPowersSubTab] = useState<PowersSubTabType>(initialPowersSubTab);

  const switcher = (
    <div className="stack-sm">
      <Segmented<CompendiumTabType>
        value={activeTab}
        onChange={(t) => {
          onTabChange(t);
          window.scrollTo({ top: 0 });
        }}
        ariaLabel="Seção do compêndio"
        accent
        options={[
          { value: 'magias', label: 'Magias', icon: <Sparkles size={16} /> },
          { value: 'poderes', label: 'Poderes', icon: <Swords size={16} /> },
          { value: 'itens', label: 'Itens', icon: <Package size={16} /> },
        ]}
      />
      {activeTab === 'poderes' && (
        <Segmented<PowersSubTabType>
          value={powersSubTab}
          onChange={setPowersSubTab}
          ariaLabel="Tipo de poder"
          options={[
            { value: 'gerais', label: 'Gerais' },
            { value: 'classe', label: 'De classe' },
          ]}
        />
      )}
    </div>
  );

  const subtitle =
    activeTab === 'magias'
      ? 'Grimório · Capítulo 4'
      : activeTab === 'itens'
        ? 'Equipamento · Capítulo 3'
        : powersSubTab === 'gerais'
          ? 'Poderes gerais · Capítulo 2'
          : 'Poderes de classe · Capítulo 1';

  return (
    <>
      <AppBar title="Compêndio" subtitle={subtitle} leading={<span className="appbar-icon"><BookOpen size={20} /></span>} />
      <main className="page page-wide stack compendium-page">
        {activeTab === 'magias' && <SpellsCompendium switcher={switcher} />}
        {activeTab === 'poderes' && powersSubTab === 'gerais' && (
          <PowersCompendium switcher={switcher} activeCharacter={activeCharacter} characters={characters} />
        )}
        {activeTab === 'poderes' && powersSubTab === 'classe' && (
          <ClassPowersCompendium switcher={switcher} activeCharacter={activeCharacter} />
        )}
        {activeTab === 'itens' && <ItemsCompendium switcher={switcher} />}
      </main>
    </>
  );
};
