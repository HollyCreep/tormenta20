import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import type { CharacterSheet } from './types/character';
import { useCharacter } from './contexts/CharacterContext';
import { useDice } from './contexts/DiceContext';
import { CharacterList } from './components/hub/CharacterList';
import { HomeView } from './components/hub/HomeView';
import type { CompendiumTabType, PowersSubTabType } from './components/compendium/CompendiumView';

const WizardContainer = lazy(() =>
  import('./components/wizard/WizardContainer').then((m) => ({ default: m.WizardContainer }))
);
const CharacterSheetView = lazy(() =>
  import('./components/sheet/CharacterSheetView').then((m) => ({ default: m.CharacterSheetView }))
);
const CompendiumView = lazy(() =>
  import('./components/compendium/CompendiumView').then((m) => ({ default: m.CompendiumView }))
);
import { ThemeSelector } from './components/common/ThemeSelector';
import { DiceRollerWidget } from './components/common/DiceRollerWidget';
import { Shield, Users, BookOpen, Home } from 'lucide-react';
import { App as CapApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';

export function App() {
  const [view, setView] = useState<'home' | 'characters' | 'character-sheet' | 'compendium' | 'wizard'>('home');
  const [compendiumTab, setCompendiumTab] = useState<CompendiumTabType>('magias');
  const [powersSubTab, setPowersSubTab] = useState<PowersSubTabType>('gerais');
  const [wizardCharacter, setWizardCharacter] = useState<CharacterSheet | null>(null);

  const {
    characters,
    activeCharacter,
    activeCharacterId,
    setActiveCharacterId,
    updateCharacter,
    saveCharacter,
    deleteCharacter,
    duplicateCharacter,
    exportCharacter,
    importCharacter,
  } = useCharacter();

  const { recentRolls, rollDice, clearRecentRolls } = useDice();

  // Refs para evitar stale closures no listener do botão voltar nativo
  const viewRef = useRef(view);
  const activeCharacterIdRef = useRef(activeCharacterId);
  viewRef.current = view;
  activeCharacterIdRef.current = activeCharacterId;

  // Integração com Recursos Nativos do Mobile (Status Bar, Splash Screen e Botão Voltar)
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
      StatusBar.setBackgroundColor({ color: '#090d16' }).catch(() => {});
      SplashScreen.hide().catch(() => {});
    }

    const backListener = CapApp.addListener('backButton', () => {
      if (viewRef.current === 'character-sheet') {
        setView('characters');
      } else if (viewRef.current === 'wizard') {
        if (activeCharacterIdRef.current) {
          setView('character-sheet');
        } else {
          setView('characters');
        }
      } else if (viewRef.current !== 'home') {
        setView('home');
      } else {
        CapApp.exitApp();
      }
    });

    return () => {
      backListener.then((sub) => sub.remove()).catch(() => {});
    };
  }, []);

  // Ações de Navegação e Fichas
  const handleOpenCharacter = (char: CharacterSheet) => {
    setActiveCharacterId(char.id);
    setView('character-sheet');
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

  const handleSaveWizardCharacter = (char: CharacterSheet) => {
    saveCharacter(char);
    setView('character-sheet');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteCharacter = (id: string) => {
    deleteCharacter(id);
    setView('characters');
  };

  const handleDuplicateCharacter = (char: CharacterSheet) => {
    duplicateCharacter(char);
    setView('character-sheet');
  };

  const handleImportFile = async (file: File) => {
    try {
      await importCharacter(file);
      setView('character-sheet');
    } catch (err: any) {
      alert(err.message || 'Erro ao importar arquivo JSON de personagem.');
    }
  };

  const handleNavigateToCompendium = (tab: CompendiumTabType, subTab?: PowersSubTabType) => {
    setCompendiumTab(tab);
    if (subTab) setPowersSubTab(subTab);
    setView('compendium');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoll = (title: string, sides: number, modifier: number, count?: number) => {
    rollDice(title, sides, modifier, count || 1, activeCharacter);
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
              setView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            title="Ir para a página inicial"
            style={{ cursor: 'pointer' }}
          >
            <Shield size={24} style={{ color: 'var(--t20-ruby)' }} />
            <span className="app-brand-title">Tormenta 20</span>
          </div>

          {/* Navegação Desktop (3 Grupos de Navegação) */}
          <div className="btn-group desktop-nav-group">
            <button
              type="button"
              onClick={() => {
                setView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`btn ${view === 'home' ? 'active' : ''}`}
            >
              <Home size={15} />
              <span>Home</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (view === 'character-sheet') {
                  setView('characters');
                } else if (activeCharacterId) {
                  setView('character-sheet');
                } else {
                  setView('characters');
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`btn ${view === 'characters' || view === 'character-sheet' || view === 'wizard' ? 'active' : ''}`}
            >
              <Users size={15} />
              <span>{view === 'character-sheet' && activeCharacter ? `Ficha (${activeCharacter.name})` : 'Personagens'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setView('compendium');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`btn ${view === 'compendium' ? 'active' : ''}`}
            >
              <BookOpen size={15} />
              <span>Compêndio</span>
            </button>
          </div>

          {/* Seletor de Tema Visual */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ThemeSelector />
          </div>
        </div>
      </header>

      {/* Visualização: Home */}
      {view === 'home' && (
        <HomeView
          characters={characters}
          activeCharacter={activeCharacter}
          onNavigateToCharacters={() => {
            setView('characters');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenCharacterSheet={handleOpenCharacter}
          onCreateNewCharacter={handleCreateNew}
          onNavigateToCompendium={handleNavigateToCompendium}
        />
      )}

      {/* Visualização: Lista de Personagens */}
      {view === 'characters' && (
        <CharacterList
          characters={characters}
          onOpenCharacter={handleOpenCharacter}
          onEditCharacter={handleEditInWizard}
          onCreateNew={handleCreateNew}
          onDuplicateCharacter={handleDuplicateCharacter}
          onDeleteCharacter={handleDeleteCharacter}
          onExportCharacter={exportCharacter}
          onImportCharacter={handleImportFile}
        />
      )}

      {/* Visualizações Dinâmicas com Suspense */}
      <Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '60vh',
              color: 'var(--t20-gold)',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <Shield
                size={36}
                style={{
                  color: 'var(--t20-ruby)',
                  marginBottom: '0.75rem',
                  filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.5))',
                }}
              />
              <div style={{ fontFamily: 'var(--font-fantasy)', fontSize: '1.15rem', color: '#ffffff' }}>
                Carregando...
              </div>
            </div>
          </div>
        }
      >
        {/* Visualização: Wizard Passo a Passo */}
        {view === 'wizard' && (
          <WizardContainer
            initialCharacter={wizardCharacter}
            onSave={handleSaveWizardCharacter}
            onCancel={() => {
              if (activeCharacterId) {
                setView('character-sheet');
              } else {
                setView('characters');
              }
            }}
          />
        )}

        {/* Visualização: Ficha Interativa do Personagem */}
        {view === 'character-sheet' && activeCharacter && (
          <CharacterSheetView
            character={activeCharacter}
            onUpdateCharacter={updateCharacter}
            onEditInWizard={() => handleEditInWizard(activeCharacter)}
            onBackToList={() => {
              setView('characters');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExportJson={() => exportCharacter(activeCharacter)}
            onRollDice={handleRoll}
            onNavigateToCompendium={handleNavigateToCompendium}
          />
        )}

        {/* Visualização: Compêndio Unificado (Magias, Poderes, Itens) */}
        {view === 'compendium' && (
          <CompendiumView
            activeTab={compendiumTab}
            onTabChange={setCompendiumTab}
            activeCharacter={activeCharacter}
            characters={characters}
            initialPowersSubTab={powersSubTab}
            onBack={() => setView('home')}
          />
        )}
      </Suspense>

      {/* Rolador de Dados Flutuante em Todas as Telas */}
      <DiceRollerWidget
        rolls={recentRolls}
        onRoll={(title, sides, mod) => handleRoll(title, sides, mod)}
        onClearHistory={clearRecentRolls}
      />

      {/* Barra de Navegação Inferior Nativa / Mobile (3 Botões Conforme Wireframe) */}
      <nav className="app-bottom-nav no-print" aria-label="Navegação Mobile">
        <button
          type="button"
          onClick={() => {
            setView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`app-bottom-nav-item ${view === 'home' ? 'active' : ''}`}
        >
          <Home size={20} />
          <span>Home</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (view === 'character-sheet') {
              setView('characters');
            } else if (activeCharacterId) {
              setView('character-sheet');
            } else {
              setView('characters');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`app-bottom-nav-item ${view === 'characters' || view === 'character-sheet' || view === 'wizard' ? 'active' : ''}`}
        >
          {view === 'character-sheet' && activeCharacter ? <Shield size={20} /> : <Users size={20} />}
          <span>{view === 'character-sheet' && activeCharacter ? 'Ficha' : 'Personagens'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setView('compendium');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`app-bottom-nav-item ${view === 'compendium' ? 'active' : ''}`}
        >
          <BookOpen size={20} />
          <span>Compêndio</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
