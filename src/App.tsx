import React, { useState, useEffect } from 'react';
import { CharacterSheet } from './types/character';
import { storageService } from './services/storage';
import { CharacterList } from './components/hub/CharacterList';
import { WizardContainer } from './components/wizard/WizardContainer';
import { CharacterSheetView } from './components/sheet/CharacterSheetView';
import { PowersCompendium } from './components/compendium/PowersCompendium';
import { ItemsCompendium } from './components/compendium/ItemsCompendium';
import { ThemeSelector } from './components/common/ThemeSelector';
import { DiceRollerWidget, RollResult } from './components/common/DiceRollerWidget';
import { SpellsCompendium } from './components/compendium/SpellsCompendium';
import { Shield, Sparkles, Package, Users, BookOpen } from 'lucide-react';

export function App() {
  const [view, setView] = useState<'list' | 'wizard' | 'sheet' | 'powers' | 'items' | 'spells'>('list');
  const [prevView, setPrevView] = useState<'list' | 'sheet'>('list');
  const [characters, setCharacters] = useState<CharacterSheet[]>([]);
  const [activeCharacterId, setActiveCharacterId] = useState<string | null>(null);
  const [wizardCharacter, setWizardCharacter] = useState<CharacterSheet | null>(null);
  const [diceRolls, setDiceRolls] = useState<RollResult[]>([]);

  // Carrega personagens do LocalStorage na montagem
  useEffect(() => {
    const loaded = storageService.loadCharacters();
    setCharacters(loaded);
  }, []);

  const activeCharacter = characters.find((c) => c.id === activeCharacterId) || null;

  // Ações de Navegação e Fichas
  const handleOpenCharacter = (char: CharacterSheet) => {
    setActiveCharacterId(char.id);
    setView('sheet');
    setPrevView('sheet');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateNew = () => {
    setWizardCharacter(null);
    setView('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditInWizard = (char?: CharacterSheet) => {
    setWizardCharacter(char || activeCharacter);
    setView('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveCharacter = (char: CharacterSheet) => {
    storageService.saveCharacter(char);
    const updated = storageService.loadCharacters();
    setCharacters(updated);
    setActiveCharacterId(char.id);
    setView('sheet');
    setPrevView('sheet');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteCharacter = (id: string) => {
    storageService.deleteCharacter(id);
    const updated = storageService.loadCharacters();
    setCharacters(updated);
    if (activeCharacterId === id) {
      setActiveCharacterId(null);
      setView('list');
      setPrevView('list');
    }
  };

  const handleDuplicateCharacter = (char: CharacterSheet) => {
    const copy = storageService.duplicateCharacter(char);
    const updated = storageService.loadCharacters();
    setCharacters(updated);
    setActiveCharacterId(copy.id);
    setView('sheet');
    setPrevView('sheet');
  };

  const handleExportCharacter = (char: CharacterSheet) => {
    storageService.exportCharacterJson(char);
  };

  const handleImportCharacter = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const imported = storageService.importCharacterJson(text);
        const updated = storageService.loadCharacters();
        setCharacters(updated);
        setActiveCharacterId(imported.id);
        setView('sheet');
        setPrevView('sheet');
      } catch (err: any) {
        alert(err.message || 'Erro ao importar arquivo JSON de personagem.');
      }
    };
    reader.readAsText(file);
  };

  const handleOpenCompendium = (target: 'powers' | 'items' | 'spells') => {
    if (view === 'sheet' || view === 'list') {
      setPrevView(view);
    }
    setView(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Rolador de Dados Global
  const handleRoll = (title: string, sides: number, modifier: number, count: number = 1) => {
    let rollSum = 0;
    const rollsArray = [];
    for (let i = 0; i < count; i++) {
      const r = Math.floor(Math.random() * sides) + 1;
      rollsArray.push(r);
      rollSum += r;
    }

    const total = rollSum + modifier;
    const isCrit = sides === 20 && rollSum === 20;
    const isFumble = sides === 20 && rollSum === 1;

    const formula =
      modifier !== 0
        ? `${count > 1 ? `${count}d${sides}` : `d${sides}`} [${rollsArray.join(', ')}] ${modifier > 0 ? `+ ${modifier}` : `- ${Math.abs(modifier)}`} = ${total}`
        : `${count > 1 ? `${count}d${sides}` : `d${sides}`} [${rollsArray.join(', ')}] = ${total}`;

    const newRoll: RollResult = {
      id: 'roll_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      title,
      formula,
      diceResult: rollSum,
      modifier,
      total,
      isCrit,
      isFumble,
      timestamp: new Date().toLocaleTimeString(),
    };

    setDiceRolls((prev) => [newRoll, ...prev.slice(0, 19)]);
  };

  return (
    <div className="app-layout">
      {/* Barra de Navegação Superior Global */}
      <header className="app-topbar no-print">
        <div className="app-topbar-inner">
          {/* Logo / Marca */}
          <div
            className="app-brand"
            onClick={() => {
              if (activeCharacterId && view !== 'sheet') {
                setView('sheet');
              } else {
                setView('list');
              }
            }}
            title="Ir para tela inicial de personagens"
          >
            <Shield size={24} style={{ color: 'var(--t20-ruby)' }} />
            <span className="app-brand-title">Tormenta 20</span>
          </div>

          {/* Navegação por Abas Principais (Button Group Segmentado) */}
          <div className="btn-group">
            <button
              type="button"
              onClick={() => {
                if (view === 'powers' || view === 'items' || view === 'spells') {
                  setView(prevView);
                } else if (view !== 'list' && view !== 'sheet') {
                  setView('list');
                }
              }}
              className={`btn ${view === 'list' || view === 'sheet' || view === 'wizard' ? 'active' : ''}`}
            >
              <Users size={15} />
              <span>Personagens</span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenCompendium('powers')}
              className={`btn ${view === 'powers' ? 'active' : ''}`}
            >
              <Sparkles size={15} />
              <span>Poderes Gerais</span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenCompendium('spells')}
              className={`btn ${view === 'spells' ? 'active' : ''}`}
            >
              <BookOpen size={15} />
              <span>Magias</span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenCompendium('items')}
              className={`btn ${view === 'items' ? 'active' : ''}`}
            >
              <Package size={15} />
              <span>Itens & Equipamento</span>
            </button>
          </div>

          {/* Seletor de Tema Visual */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ThemeSelector />
          </div>
        </div>
      </header>

      {/* Visualização de Lista / Dashboard */}
      {view === 'list' && (
        <CharacterList
          characters={characters}
          onOpenCharacter={handleOpenCharacter}
          onEditCharacter={handleEditInWizard}
          onCreateNew={handleCreateNew}
          onDuplicateCharacter={handleDuplicateCharacter}
          onDeleteCharacter={handleDeleteCharacter}
          onExportCharacter={handleExportCharacter}
          onImportCharacter={handleImportCharacter}
        />
      )}

      {/* Visualização do Wizard Passo a Passo */}
      {view === 'wizard' && (
        <WizardContainer
          initialCharacter={wizardCharacter}
          onSave={handleSaveCharacter}
          onCancel={() => {
            if (activeCharacterId) {
              setView('sheet');
            } else {
              setView('list');
            }
          }}
        />
      )}

      {/* Visualização da Ficha Interativa */}
      {view === 'sheet' && activeCharacter && (
        <CharacterSheetView
          character={activeCharacter}
          onUpdateCharacter={(updated) => {
            storageService.saveCharacter(updated);
            setCharacters(storageService.loadCharacters());
          }}
          onEditInWizard={() => handleEditInWizard(activeCharacter)}
          onBackToList={() => {
            setView('list');
            setPrevView('list');
          }}
          onExportJson={() => handleExportCharacter(activeCharacter)}
          onRollDice={(title, sides, mod) => handleRoll(title, sides, mod)}
        />
      )}

      {/* Compêndio de Poderes Gerais */}
      {view === 'powers' && (
        <PowersCompendium
          onBack={() => setView(prevView)}
          activeCharacter={activeCharacter}
          characters={characters}
        />
      )}

      {/* Magias */}
      {view === 'spells' && (
        <SpellsCompendium
          onBack={() => setView(prevView)}
        />
      )}

      {/* Compêndio de Itens e Equipamentos */}
      {view === 'items' && (
        <ItemsCompendium
          onBack={() => setView(prevView)}
        />
      )}

      {/* Rolador de Dados Flutuante em Todas as Telas */}
      <DiceRollerWidget
        rolls={diceRolls}
        onRoll={(title, sides, mod) => handleRoll(title, sides, mod)}
        onClearHistory={() => setDiceRolls([])}
      />
    </div>
  );
}

export default App;
