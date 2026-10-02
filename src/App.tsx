import React, { useState, useEffect, useRef, lazy, Suspense, useCallback } from 'react';
import { BookOpen, Home, Settings2, Users } from 'lucide-react';
import { App as CapApp } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';
import type { CharacterSheet } from './types/character';
import { useCharacter } from './contexts/CharacterContext';
import { useDice } from './contexts/DiceContext';
import { CharacterList } from './components/hub/CharacterList';
import { HomeView } from './components/hub/HomeView';
import type { CompendiumTabType, PowersSubTabType } from './components/compendium/CompendiumView';
import { DiceRollerWidget } from './components/common/DiceRollerWidget';
import { SettingsSheet } from './components/settings/SettingsSheet';
import { Brand } from './components/ui/AppBar';
import { D20Icon } from './components/ui/Icons';
import { handleBack } from './components/ui/backStack';
import { useFeedback } from './components/ui/Feedback';

const WizardContainer = lazy(() =>
  import('./components/wizard/WizardContainer').then((m) => ({ default: m.WizardContainer }))
);
const CharacterSheetView = lazy(() =>
  import('./components/sheet/CharacterSheetView').then((m) => ({ default: m.CharacterSheetView }))
);
const CompendiumView = lazy(() =>
  import('./components/compendium/CompendiumView').then((m) => ({ default: m.CompendiumView }))
);

type View = 'home' | 'characters' | 'character-sheet' | 'compendium' | 'wizard';
type NavId = 'home' | 'heroes' | 'compendium' | 'settings';

interface NavDef {
  id: NavId;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavDef[] = [
  { id: 'home', label: 'Início', icon: <Home size={22} /> },
  { id: 'heroes', label: 'Heróis', icon: <Users size={22} /> },
  { id: 'compendium', label: 'Compêndio', icon: <BookOpen size={22} /> },
  { id: 'settings', label: 'Ajustes', icon: <Settings2 size={22} /> },
];

const ViewLoader: React.FC = () => (
  <div className="loader" role="status">
    <D20Icon className="loader-mark" size={44} />
    <span className="t-sm">Consultando os pergaminhos…</span>
  </div>
);

export function App() {
  const [view, setView] = useState<View>('home');
  const [compendiumTab, setCompendiumTab] = useState<CompendiumTabType>('magias');
  const [powersSubTab, setPowersSubTab] = useState<PowersSubTabType>('gerais');
  const [wizardCharacter, setWizardCharacter] = useState<CharacterSheet | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fabSpin, setFabSpin] = useState(false);

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

  const { recentRolls, rollDice, clearRecentRolls, isTrayOpen, openTray, closeTray } = useDice();
  const { toast } = useFeedback();

  const navigate = useCallback((next: View) => {
    setView(next);
    window.scrollTo({ top: 0 });
  }, []);

  // Refs para o listener nativo (evita closures obsoletas)
  const viewRef = useRef(view);
  viewRef.current = view;

  // O criador é um fluxo em tela cheia: some a navegação e os toasts sobem
  useEffect(() => {
    document.documentElement.dataset.flow = view === 'wizard' ? 'true' : 'false';
  }, [view]);

  // Recursos nativos: splash e botão voltar (sheets/fluxos consomem o voltar primeiro)
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      SplashScreen.hide().catch(() => {});
    }

    const backListener = CapApp.addListener('backButton', () => {
      if (handleBack()) return;
      const current = viewRef.current;
      if (current === 'character-sheet' || current === 'wizard') {
        navigate('characters');
      } else if (current !== 'home') {
        navigate('home');
      } else {
        CapApp.exitApp();
      }
    });

    return () => {
      backListener.then((sub) => sub.remove()).catch(() => {});
    };
  }, [navigate]);

  // Ações de navegação e fichas
  const handleOpenCharacter = (char: CharacterSheet) => {
    setActiveCharacterId(char.id);
    navigate('character-sheet');
  };

  const handleCreateNew = () => {
    setWizardCharacter(null);
    navigate('wizard');
  };

  const handleEditInWizard = (char?: CharacterSheet) => {
    setWizardCharacter(char || activeCharacter);
    navigate('wizard');
  };

  const handleSaveWizardCharacter = (char: CharacterSheet) => {
    saveCharacter(char);
    navigate('character-sheet');
    toast(`${char.name} está pronto para a aventura!`, { tone: 'success' });
  };

  const handleDeleteCharacter = (id: string) => {
    const name = characters.find((c) => c.id === id)?.name;
    deleteCharacter(id);
    navigate('characters');
    if (name) toast(`${name} foi removido.`, { tone: 'info' });
  };

  const handleDuplicateCharacter = (char: CharacterSheet) => {
    duplicateCharacter(char);
    navigate('character-sheet');
    toast('Cópia criada.', { tone: 'success' });
  };

  const handleImportFile = async (file: File) => {
    try {
      const imported = await importCharacter(file);
      navigate('character-sheet');
      toast(`${imported.name} importado com sucesso.`, { tone: 'success' });
    } catch (err) {
      const message = err instanceof Error ? err.message : '';
      toast(message || 'Não foi possível importar o arquivo JSON.', { tone: 'danger' });
    }
  };

  const handleNavigateToCompendium = (tab: CompendiumTabType, subTab?: PowersSubTabType) => {
    setCompendiumTab(tab);
    if (subTab) setPowersSubTab(subTab);
    navigate('compendium');
  };

  const handleRoll = (title: string, sides: number, modifier: number, count?: number) => {
    rollDice(title, sides, modifier, count || 1, activeCharacter);
  };

  const handleOpenDice = () => {
    setFabSpin(true);
    window.setTimeout(() => setFabSpin(false), 650);
    openTray();
  };

  const activeNav: NavId | null = settingsOpen
    ? 'settings'
    : view === 'home'
      ? 'home'
      : view === 'compendium'
        ? 'compendium'
        : view === 'characters' || view === 'character-sheet'
          ? 'heroes'
          : null;

  const onNav = (id: NavId) => {
    if (id === 'settings') {
      setSettingsOpen(true);
      return;
    }
    setSettingsOpen(false);
    if (id === 'home') navigate('home');
    if (id === 'heroes') navigate('characters');
    if (id === 'compendium') navigate('compendium');
  };

  const renderNavItem = (item: NavDef) => (
    <button
      key={item.id}
      type="button"
      className="nav-item"
      aria-current={activeNav === item.id ? 'page' : undefined}
      onClick={() => onNav(item.id)}
    >
      <span className="nav-pill">{item.icon}</span>
      <span>{item.label}</span>
    </button>
  );

  const diceFab = (
    <button
      type="button"
      className={`dice-fab${fabSpin ? ' is-rolling' : ''}`}
      onClick={handleOpenDice}
      aria-label="Abrir bandeja de dados"
      title="Rolar dados"
    >
      <D20Icon />
    </button>
  );

  const isFlow = view === 'wizard';

  return (
    <div className="app" data-flow={isFlow ? 'true' : 'false'}>
      {/* Nav rail (desktop) */}
      <nav className="rail no-print" aria-label="Navegação principal">
        <Brand onClick={() => onNav('home')} compact />
        {diceFab}
        {NAV_ITEMS.filter((i) => i.id !== 'settings').map(renderNavItem)}
        <span className="rail-spacer" />
        {renderNavItem(NAV_ITEMS[3])}
      </nav>

      <div className="app-main">
        {view === 'home' && (
          <HomeView
            characters={characters}
            activeCharacter={activeCharacter}
            onNavigateToCharacters={() => navigate('characters')}
            onOpenCharacterSheet={handleOpenCharacter}
            onCreateNewCharacter={handleCreateNew}
            onNavigateToCompendium={handleNavigateToCompendium}
            onOpenDice={handleOpenDice}
            onOpenSettings={() => setSettingsOpen(true)}
          />
        )}

        {view === 'characters' && (
          <CharacterList
            characters={characters}
            activeCharacterId={activeCharacterId}
            onOpenCharacter={handleOpenCharacter}
            onEditCharacter={handleEditInWizard}
            onCreateNew={handleCreateNew}
            onDuplicateCharacter={handleDuplicateCharacter}
            onDeleteCharacter={handleDeleteCharacter}
            onExportCharacter={exportCharacter}
            onImportCharacter={handleImportFile}
          />
        )}

        <Suspense fallback={<ViewLoader />}>
          {view === 'wizard' && (
            <WizardContainer
              initialCharacter={wizardCharacter}
              onSave={handleSaveWizardCharacter}
              onCancel={() => navigate(wizardCharacter && activeCharacterId ? 'character-sheet' : 'characters')}
            />
          )}

          {view === 'character-sheet' && activeCharacter && (
            <CharacterSheetView
              character={activeCharacter}
              onUpdateCharacter={updateCharacter}
              onEditInWizard={() => handleEditInWizard(activeCharacter)}
              onBackToList={() => navigate('characters')}
              onExportJson={() => exportCharacter(activeCharacter)}
              onRollDice={handleRoll}
              onNavigateToCompendium={handleNavigateToCompendium}
            />
          )}

          {view === 'compendium' && (
            <CompendiumView
              activeTab={compendiumTab}
              onTabChange={setCompendiumTab}
              activeCharacter={activeCharacter}
              characters={characters}
              initialPowersSubTab={powersSubTab}
            />
          )}
        </Suspense>
      </div>

      {/* Navegação inferior (mobile) */}
      {!isFlow && (
        <nav className="bottom-nav no-print" aria-label="Navegação principal">
          {renderNavItem(NAV_ITEMS[0])}
          {renderNavItem(NAV_ITEMS[1])}
          <div className="nav-fab-slot">{diceFab}</div>
          {renderNavItem(NAV_ITEMS[2])}
          {renderNavItem(NAV_ITEMS[3])}
        </nav>
      )}

      <DiceRollerWidget
        rolls={recentRolls}
        onRoll={(title, sides, mod, count) => handleRoll(title, sides, mod, count)}
        onClearHistory={clearRecentRolls}
        isOpen={isTrayOpen}
        onOpen={openTray}
        onClose={closeTray}
      />

      <SettingsSheet open={settingsOpen} onClose={() => setSettingsOpen(false)} heroCount={characters.length} />
    </div>
  );
}

export default App;
