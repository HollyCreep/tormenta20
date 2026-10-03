import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import {
  Backpack,
  BookOpen,
  ChevronsUp,
  Dices,
  Download,
  FileText,
  MoreVertical,
  Pencil,
  Printer,
  ScrollText,
  Sparkles,
  Sword,
  Zap,
} from 'lucide-react';
import type { CharacterInventoryItem, CharacterSheet, CharacterSpell } from '../../types/character';
import type { EquipmentItem } from '../../types/rules';
import type { ChangeLogOptions } from '../../services/logService';
import { DetailModal, type DetailModalData } from '../common/DetailModal';
import { AppBar } from '../ui/AppBar';
import { MenuSheet } from '../ui/MenuSheet';
import { useFeedback } from '../ui/Feedback';
import { useDice } from '../../contexts/DiceContext';
import { CharacterHeader } from './CharacterHeader';
import { CharacterResourceBars } from './CharacterResourceBars';
import { CharacterConditions } from './CharacterConditions';
import { CharacterAttributes } from './CharacterAttributes';
import { CombatTab } from './tabs/CombatTab';
import { SkillsTab } from './tabs/SkillsTab';
import { PowersTab } from './tabs/PowersTab';
import { SpellsTab } from './tabs/SpellsTab';
import { InventoryTab } from './tabs/InventoryTab';
import { BioTab } from './tabs/BioTab';
import { LogsTab } from './LogsTab';
import { MoneySheet, type MoneyOperation } from './modals/MoneySheet';
import { VitalAdjustSheet, type HpMode, type MpMode, type VitalKind } from './modals/VitalAdjustSheet';
import {
  calculateWeaponAttack,
  calculateWeaponDamage,
  recalculateFullCharacterSheet,
} from '../../utils/rulesEngine';
import { RACES_LIST } from '../../data/races';
import { CLASSES_LIST } from '../../data/classes';
import { ORIGINS_LIST } from '../../data/origins';
import { DEITIES_LIST } from '../../data/deities';
import { RULES_CITATIONS } from '../../data/rulesCitations';
import { EQUIPMENT_LIST } from '../../data/equipment';
import { heroLine, skillName } from '../../utils/displayNames';
import { effectiveSize, osteonFormer } from '../../utils/raceAbilities';
import { scribeCost, spellBaseCost } from '../../utils/powerSpells';

const SpellCastModal = lazy(() => import('./SpellCastModal').then((m) => ({ default: m.SpellCastModal })));
const LevelUpModal = lazy(() => import('./LevelUpModal').then((m) => ({ default: m.LevelUpModal })));
const AddItemModal = lazy(() => import('./AddItemModal').then((m) => ({ default: m.AddItemModal })));
const ItemModifierModal = lazy(() =>
  import('../compendium/ItemModifierModal').then((m) => ({ default: m.ItemModifierModal }))
);

interface CharacterSheetViewProps {
  character: CharacterSheet;
  onUpdateCharacter: (char: CharacterSheet, logOptions?: ChangeLogOptions) => void;
  onEditInWizard: () => void;
  onBackToList: () => void;
  onExportJson: () => void;
  onRollDice: (title: string, diceSides: number, modifier: number, count?: number) => void;
  onNavigateToCompendium?: (tab: 'magias' | 'poderes' | 'itens', subTab?: 'gerais' | 'classe') => void;
}

type SheetTab = 'combate' | 'pericias' | 'poderes' | 'magias' | 'inventario' | 'notas' | 'registro';

export const CharacterSheetView: React.FC<CharacterSheetViewProps> = ({
  character,
  onUpdateCharacter,
  onEditInWizard,
  onBackToList,
  onExportJson,
  onRollDice,
  onNavigateToCompendium,
}) => {
  const { toast, confirm } = useFeedback();
  const { recentRolls } = useDice();
  const [activeTab, setActiveTab] = useState<SheetTab>('combate');
  const [modalDetail, setModalDetail] = useState<DetailModalData | null>(null);
  const [selectedCastSpell, setSelectedCastSpell] = useState<CharacterSpell | null>(null);
  const [isLevelUpOpen, setIsLevelUpOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<CharacterInventoryItem | null>(null);
  const [isMoneyOpen, setIsMoneyOpen] = useState(false);
  const [adjustKind, setAdjustKind] = useState<VitalKind | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const heroSentinelRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);

  // O nome aparece na app bar só depois que o cartão do herói sai da tela
  useEffect(() => {
    const el = heroSentinelRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), {
      rootMargin: '-64px 0px 0px 0px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hasSpells = (character.spells || []).length > 0;
  const currentTab: SheetTab = activeTab === 'magias' && !hasSpells ? 'combate' : activeTab;

  const selectTab = (tab: SheetTab) => {
    setActiveTab(tab);
    // Se a barra de abas já está "grudada", leva o conteúdo novo para o topo
    const el = tabsRef.current;
    if (el) {
      const stickyTop = parseFloat(getComputedStyle(el).top) || 0;
      const docTop = el.getBoundingClientRect().top + window.scrollY - stickyTop;
      if (window.scrollY > docTop) window.scrollTo({ top: docTop });
    }
  };

  /* ------------------------------------------------------------------------
     Vida, mana e temporários (auditáveis)
     ------------------------------------------------------------------------ */
  const handleModifyHp = (delta: number, customReason?: string) => {
    const currentHp = character.stats.currentHp;
    const currentTemp = character.stats.tempHp || 0;
    const suffix = customReason ? ` — ${customReason}` : '';

    if (delta < 0) {
      // Dano: PV temporários são consumidos primeiro
      const damage = Math.abs(delta);
      const absorbed = Math.min(currentTemp, damage);
      const remainingDamage = damage - absorbed;
      const newTempHp = currentTemp - absorbed;
      const newHp = Math.max(0, currentHp - remainingDamage);
      const actionReason =
        absorbed > 0
          ? `Sofreu ${damage} de dano: ${absorbed} absorvido por PV temporário (${newTempHp} temp restante), ${remainingDamage} no PV normal.${suffix}`
          : `Sofreu ${damage} de dano direto aos Pontos de Vida.${suffix}`;
      onUpdateCharacter(
        { ...character, stats: { ...character.stats, currentHp: newHp, tempHp: newTempHp } },
        { actionReason }
      );
      return;
    }

    const newHp = Math.min(character.stats.maxHp.value, Math.max(0, currentHp + delta));
    onUpdateCharacter(
      { ...character, stats: { ...character.stats, currentHp: newHp } },
      { actionReason: `Recuperou +${delta} Pontos de Vida.${suffix}` }
    );
  };

  const handleApplyTempHp = (amount: number, operation: 'add' | 'set', reason?: string) => {
    const currentTemp = character.stats.tempHp || 0;
    const newTemp = operation === 'add' ? currentTemp + amount : Math.max(0, amount);
    onUpdateCharacter(
      { ...character, stats: { ...character.stats, tempHp: newTemp } },
      {
        actionReason:
          reason ||
          (operation === 'add' ? `Recebeu +${amount} PV temporários (Total: ${newTemp}).` : `PV temporários ajustados para ${newTemp}.`),
      }
    );
  };

  const handleModifyMp = (delta: number, logOptions?: ChangeLogOptions) => {
    const newMp = Math.min(character.stats.maxMp.value, Math.max(0, character.stats.currentMp + delta));
    onUpdateCharacter({ ...character, stats: { ...character.stats, currentMp: newMp } }, logOptions);
  };

  const handleApplyHpSheet = (mode: HpMode, amount: number, reason: string, tempOp: 'add' | 'set') => {
    if (mode === 'dano') handleModifyHp(-amount, reason);
    else if (mode === 'cura') handleModifyHp(amount, reason);
    else handleApplyTempHp(amount, tempOp, reason || undefined);
  };

  const handleApplyMpSheet = (mode: MpMode, amount: number, reason: string) => {
    const delta = mode === 'gastar' ? -amount : amount;
    const base = mode === 'gastar' ? `Gastou ${amount} PM.` : `Recuperou ${amount} PM.`;
    handleModifyMp(delta, { actionReason: reason ? `${base} — ${reason}` : base });
  };

  /* ------------------------------------------------------------------------
     Magias
     ------------------------------------------------------------------------ */
  const handleCastSpellFromModal = (
    spellName: string,
    pmCost: number,
    rollInfo?: { title: string; sides: number; count: number; modifier: number }
  ) => {
    handleModifyMp(-pmCost, { spellCast: { spellName, pmCost, circle: selectedCastSpell?.circle } });
    if (rollInfo) onRollDice(rollInfo.title, rollInfo.sides, rollInfo.modifier, rollInfo.count);
    else onRollDice(`Lançamento da magia ${spellName} (Custo: ${pmCost} PM)`, 20, 0, 1);
  };

  const handleCastStandardSpell = (sp: CharacterSpell) => {
    const baseCost = spellBaseCost(sp);
    if (character.stats.currentMp < baseCost) {
      toast(`PM insuficientes para ${sp.name}: custa ${baseCost} PM, você tem ${character.stats.currentMp}.`, { tone: 'warning' });
      return;
    }
    handleModifyMp(-baseCost, { spellCast: { spellName: sp.name, pmCost: baseCost, circle: sp.circle } });

    // Detecta o dado de dano/efeito padrão no texto canônico da magia
    const match = (sp.description || '').match(/(\d+)d(\d+)(?:\s*\+\s*(\d+))?/i);
    if (match) {
      const count = parseInt(match[1], 10);
      const sides = parseInt(match[2], 10);
      const mod = match[3] ? parseInt(match[3], 10) : 0;
      onRollDice(
        `Lançamento da magia ${sp.name} [Dano/Efeito - ${count}d${sides}${mod > 0 ? `+${mod}` : ''} (${baseCost} PM)]`,
        sides,
        mod,
        count
      );
    } else {
      onRollDice(`Lançamento da magia ${sp.name} [Padrão - ${baseCost} PM]`, 20, 0, 1);
    }
  };

  /* ------------------------------------------------------------------------
     Inventário, condições e rolagens
     ------------------------------------------------------------------------ */
  const handleToggleEquip = (itemId: string) => {
    const updatedInventory = character.inventory.map((item) =>
      item.id === itemId ? { ...item, isEquipped: !item.isEquipped } : item
    );
    onUpdateCharacter(recalculateFullCharacterSheet({ ...character, inventory: updatedInventory }));
  };

  const handleRemoveItem = async (item: CharacterInventoryItem) => {
    const ok = await confirm({
      title: `Remover ${item.name}?`,
      message: 'O item sai da mochila. A remoção fica registrada na auditoria.',
      confirmLabel: 'Remover',
      tone: 'danger',
    });
    if (!ok) return;
    const updated = recalculateFullCharacterSheet({
      ...character,
      inventory: character.inventory.filter((i) => i.id !== item.id),
    });
    onUpdateCharacter(updated, { actionReason: `Removeu ${item.name} do inventário.` });
    toast(`${item.name} removido da mochila.`);
  };

  const handleToggleCondition = (condId: string) => {
    const isPresent = character.activeConditions.includes(condId);
    const updated = isPresent
      ? character.activeConditions.filter((c) => c !== condId)
      : [...character.activeConditions, condId];
    onUpdateCharacter(recalculateFullCharacterSheet({ ...character, activeConditions: updated }));
  };

  const handleRollSkill = (name: string, totalMod: number, formula: string) => {
    onRollDice(`Teste de ${name} [${formula}]`, 20, totalMod);
  };

  // Ataque: Luta/Pontaria + bônus da arma + condições exclusivas de ataque (Cap. 5, pág. 230)
  const handleRollAttack = (weapon: CharacterInventoryItem) => {
    const attack = calculateWeaponAttack(character, weapon);
    const condNote = attack.conditionReasons.length > 0 ? ` [${attack.conditionReasons.join(', ')}]` : '';
    onRollDice(`Ataque com ${weapon.name}${condNote}`, 20, attack.value);
  };

  // Dano: dado da arma + Força (corpo a corpo/arremesso) + bônus de melhorias (Cap. 5, pág. 230)
  const handleRollDamage = (weapon: CharacterInventoryItem) => {
    const dmg = calculateWeaponDamage(character, weapon);
    if (!dmg) {
      toast(`${weapon.name} não causa dano direto.`);
      return;
    }
    const parts = dmg.components
      .slice(1)
      .map((c) => `${c.label} ${typeof c.value === 'number' && c.value >= 0 ? '+' : ''}${c.value}`)
      .join(', ');
    onRollDice(`Dano de ${weapon.name} [${dmg.count}d${dmg.sides}${parts ? ` + ${parts}` : ''}]`, dmg.sides, dmg.modifier, dmg.count);
  };

  const handleConfirmMoney = (operation: MoneyOperation, amount: number, reason: string) => {
    const current = character.tibares ?? 0;
    const newAmount =
      operation === 'add' ? current + amount : operation === 'remove' ? Math.max(0, current - amount) : Math.max(0, amount);
    const base =
      operation === 'add' ? `Ganho de T$ ${amount}` : operation === 'remove' ? `Gasto de T$ ${amount}` : `Saldo ajustado para T$ ${newAmount}`;
    onUpdateCharacter({ ...character, tibares: newAmount }, { actionReason: reason ? `${base} - ${reason}` : base });
  };

  // Oficina / forja (auditável)
  const handleSaveCustomizedItem = (customizedItem: EquipmentItem, appliedModifierIds: string[], totalCost: number) => {
    if (!customizingItem) return;
    const newTibares = Math.max(0, (character.tibares ?? 0) - totalCost);
    const updatedInventory = character.inventory.map((item) =>
      item.id === customizingItem.id
        ? {
            ...item,
            name: customizedItem.name,
            appliedModifiers: appliedModifierIds,
            specialMaterial: customizedItem.specialMaterial,
            defenseBonus: customizedItem.defenseBonus,
            armorPenalty: customizedItem.armorPenalty,
            attackBonus: customizedItem.attackBonus,
            damage: customizedItem.damage,
            critical: customizedItem.critical,
            spaces: customizedItem.spaces,
            price: customizedItem.price,
          }
        : item
    );
    const updatedSheet = recalculateFullCharacterSheet({ ...character, tibares: newTibares, inventory: updatedInventory });
    const modsText = appliedModifierIds.length > 0 ? ` [Modificações: ${appliedModifierIds.join(', ')}]` : '';
    const matText = customizedItem.specialMaterial ? ` [Material: ${customizedItem.specialMaterial}]` : '';
    const costText = totalCost > 0 ? ` (Custo de forja: T$ ${totalCost})` : '';
    onUpdateCharacter(updatedSheet, {
      actionReason: `Modificação de equipamento na Oficina/Forja: ${customizedItem.name}${modsText}${matText}${costText}`,
    });
    setCustomizingItem(null);
    toast(`${customizedItem.name} saiu da forja.`, { tone: 'success' });
  };

  /* ------------------------------------------------------------------------
     Detalhes de raça, classe, origem, divindade e condições
     ------------------------------------------------------------------------ */
  const handleOpenRaceDetail = () => {
    const race = RACES_LIST.find((r) => r.id === character.raceId);
    if (!race) return;
    setModalDetail({
      title: race.name,
      category: 'Raça',
      subtitle: `Tamanho ${effectiveSize(character)} · Deslocamento ${race.speed}m${
        osteonFormer(character) ? ` · Osteon ${osteonFormer(character)!.raceName.toLowerCase()}` : ''
      }`,
      description:
        race.description + '\n\n' + race.abilities.map((a) => `• ${a.name} (${a.type}): ${a.description}`).join('\n\n'),
      ruleCitation: {
        id: `RACE_${race.id.toUpperCase()}`,
        title: `Raça: ${race.name}`,
        book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
        chapter: 'Capítulo 1: Construção de Personagem',
        section: 'Raças de Arton',
        page: 'Página 18 a 33',
        quote: race.description,
        explanation: `Habilidades raciais ativas para ${race.name}. Os modificadores de atributo raciais já estão aplicados aos atributos totais da ficha.`,
      },
    });
  };

  const handleOpenClassDetail = () => {
    const cls = CLASSES_LIST.find((c) => c.id === character.classId);
    if (!cls) return;
    setModalDetail({
      title: cls.name,
      category: 'Classe',
      subtitle: `${cls.role} · PV ${cls.hpInitial} (+${cls.hpPerLevel}/nível) · PM ${cls.mpInitial} (+${cls.mpPerLevel}/nível)`,
      description:
        cls.description +
        `\n\nPerícias obrigatórias: ${cls.mandatorySkills.map(skillName).join(', ')}.\nPerícias adicionais: ${cls.skillChoicesCount} à escolha da lista da classe.`,
      ruleCitation: {
        id: `CLASS_${cls.id.toUpperCase()}`,
        title: `Classe: ${cls.name}`,
        book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
        chapter: 'Capítulo 1: Construção de Personagem',
        section: 'Classes de Arton',
        page: 'Página 34 a 93',
        quote: cls.description,
        explanation: `Avanço canônico da classe ${cls.name}. Magias e poderes de classe devem respeitar círculos e pré-requisitos canônicos.`,
      },
    });
  };

  const handleOpenOriginDetail = () => {
    const origin = ORIGINS_LIST.find((o) => o.id === character.originId);
    if (!origin) return;
    setModalDetail({
      title: origin.name,
      category: 'Origem',
      subtitle: `Itens iniciais: ${origin.items.join(', ')}`,
      description:
        origin.description +
        '\n\n' +
        `Perícias concedidas: ${origin.skills.map(skillName).join(', ')}.\n\n` +
        `Poderes da origem:\n${origin.powers.map((p) => `• ${p.name} (${p.type}): ${p.description}`).join('\n')}`,
      ruleCitation: RULES_CITATIONS.ORIGIN_SKILL_REPLACEMENT,
    });
  };

  const handleOpenDeityDetail = () => {
    const deity = DEITIES_LIST.find((d) => d.id === character.deityId);
    if (!deity) return;
    setModalDetail({
      title: `${deity.name}, ${deity.title}`,
      category: 'Divindade',
      subtitle: `Símbolo: ${deity.symbol} · Energia ${deity.energyChannel}`,
      description:
        deity.description +
        (deity.obligations ? `\n\nObrigações e restrições:\n${deity.obligations}` : '') +
        `\n\nPoderes concedidos:\n` +
        deity.grantedPowers.map((p) => `• ${p.name}: ${p.description}`).join('\n\n'),
      ruleCitation: {
        id: `DEITY_${deity.id.toUpperCase()}`,
        title: `Divindade: ${deity.name}`,
        book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
        chapter: 'Capítulo 2: O Panteão',
        section: 'As 20 Divindades Maiores',
        page: 'Página 102 a 113',
        quote: deity.description,
        explanation: `Devotos de ${deity.name} devem respeitar suas crenças e restrições para manter seus poderes concedidos e canalização divina.`,
      },
    });
  };

  const handleOpenConditionRules = () => {
    setModalDetail({
      title: 'Condições',
      category: 'Regra oficial',
      subtitle: 'Apêndice: Lista de Condições (págs. 394–395)',
      description:
        'Condições alteram as capacidades do personagem de forma temporária ou contínua. Elas podem impor penalidades em testes, impedir ações ou conceder vulnerabilidades.\n\nCondições iguais não se acumulam; apenas seus efeitos mais severos se aplicam.',
      ruleCitation: {
        id: 'RULES_CONDITIONS',
        title: 'Condições do Sistema',
        book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
        chapter: 'Apêndice',
        section: 'Lista de Condições',
        page: 'Páginas 394 a 395',
        quote: '“Uma condição é um estado passageiro que afeta o personagem...”',
        explanation: 'Ative ou desative uma condição para recalcular perícias, Defesa e ataques em tempo real.',
      },
      initialTab: 'rules',
    });
  };

  const customizingEquipment: EquipmentItem | null = customizingItem
    ? EQUIPMENT_LIST.find((e) => e.id === (customizingItem.equipmentId || customizingItem.id)) || {
        id: customizingItem.equipmentId || customizingItem.id,
        name: customizingItem.name,
        category: customizingItem.category as EquipmentItem['category'],
        subcategory: customizingItem.subcategory,
        spaces: customizingItem.spaces,
        price: customizingItem.price || 'T$ 0',
        damage: customizingItem.damage,
        critical: customizingItem.critical,
        damageType: customizingItem.damageType,
        range: customizingItem.range,
        defenseBonus: customizingItem.defenseBonus,
        armorPenalty: customizingItem.armorPenalty,
        attackBonus: customizingItem.attackBonus,
        description: customizingItem.description || '',
      }
    : null;

  const tabs: { id: SheetTab; label: string; icon: React.ReactNode; hidden?: boolean }[] = [
    { id: 'combate', label: 'Combate', icon: <Sword size={17} /> },
    { id: 'pericias', label: 'Perícias', icon: <Dices size={17} /> },
    { id: 'poderes', label: 'Poderes', icon: <Sparkles size={17} /> },
    { id: 'magias', label: 'Magias', icon: <Zap size={17} />, hidden: !hasSpells },
    { id: 'inventario', label: 'Mochila', icon: <Backpack size={17} /> },
    { id: 'notas', label: 'Notas', icon: <BookOpen size={17} /> },
    { id: 'registro', label: 'Registro', icon: <ScrollText size={17} /> },
  ];

  return (
    <>
      <AppBar
        onBack={onBackToList}
        backLabel="Voltar aos heróis"
        title={character.name}
        subtitle={heroLine(character)}
        headingHidden={heroVisible}
        actions={
          <button type="button" className="icon-btn" onClick={() => setMenuOpen(true)} aria-label="Mais ações da ficha">
            <MoreVertical size={22} />
          </button>
        }
      />

      <main className="page page-wide sheet-page">
        <div className="sheet-layout">
          <div className="sheet-side stack-lg">
            <CharacterHeader
              character={character}
              onOpenLevelUp={() => setIsLevelUpOpen(true)}
              onOpenRaceDetail={handleOpenRaceDetail}
              onOpenClassDetail={handleOpenClassDetail}
              onOpenOriginDetail={handleOpenOriginDetail}
              onOpenDeityDetail={handleOpenDeityDetail}
            />
            <div ref={heroSentinelRef} aria-hidden="true" />
            <CharacterResourceBars
              character={character}
              onModifyHp={(d) => handleModifyHp(d)}
              onModifyMp={(d) => handleModifyMp(d)}
              onOpenAdjust={setAdjustKind}
            />
            <CharacterConditions
              activeConditions={character.activeConditions}
              onToggleCondition={handleToggleCondition}
              onOpenConditionRules={handleOpenConditionRules}
            />
            <CharacterAttributes character={character} onRollDice={onRollDice} onSetModalDetail={setModalDetail} />
          </div>

          <div className="sheet-main">
            <div className="subbar subbar-tabs no-print" ref={tabsRef}>
              <div className="tabs" role="tablist" aria-label="Seções da ficha">
                {tabs
                  .filter((t) => !t.hidden)
                  .map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={currentTab === tab.id}
                      className="tab"
                      onClick={() => selectTab(tab.id)}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
              </div>
            </div>

            <div className="sheet-tab-panel animate-in" key={currentTab} role="tabpanel">
              {currentTab === 'combate' && (
                <CombatTab
                  character={character}
                  onRollAttack={handleRollAttack}
                  onRollDamage={handleRollDamage}
                  onRollSkill={handleRollSkill}
                  onGoToInventory={() => selectTab('inventario')}
                  onSetModalDetail={setModalDetail}
                />
              )}
              {currentTab === 'pericias' && (
                <SkillsTab character={character} onRollSkill={handleRollSkill} onSetModalDetail={setModalDetail} />
              )}
              {currentTab === 'poderes' && (
                <PowersTab
                  character={character}
                  onSetModalDetail={setModalDetail}
                  onNavigateToCompendium={onNavigateToCompendium}
                  onUpdateSpells={(spells, reason) =>
                    onUpdateCharacter(recalculateFullCharacterSheet({ ...character, spells }), {
                      actionReason: reason,
                    })
                  }
                />
              )}
              {currentTab === 'magias' && (
                <SpellsTab
                  character={character}
                  onScribeSpell={(sp) => {
                    // Escriba Arcano (pág. 38): um dia de trabalho e T$ 250 por PM da magia
                    const c = scribeCost(sp.circle);
                    onUpdateCharacter(
                      recalculateFullCharacterSheet({ ...character, tibares: character.tibares - c.tibares, spells: [...(character.spells || []), sp] }),
                      { actionReason: `Escriba Arcano: copiou ${sp.name} (${c.days} dia${c.days > 1 ? 's' : ''} de trabalho, T$ ${c.tibares.toLocaleString('pt-BR')}).` }
                    );
                  }}
                  onCastStandardSpell={handleCastStandardSpell}
                  onSelectCastSpell={setSelectedCastSpell}
                  onSetModalDetail={setModalDetail}
                />
              )}
              {currentTab === 'inventario' && (
                <InventoryTab
                  character={character}
                  onOpenAddItemModal={() => setIsAddItemOpen(true)}
                  onOpenMoneyModal={() => setIsMoneyOpen(true)}
                  onCustomizeItem={setCustomizingItem}
                  onToggleEquip={handleToggleEquip}
                  onRemoveItem={handleRemoveItem}
                  onSetModalDetail={setModalDetail}
                />
              )}
              {currentTab === 'notas' && (
                <BioTab character={character} onUpdateCharacter={(updated) => onUpdateCharacter(updated)} />
              )}
              {currentTab === 'registro' && (
                <LogsTab
                  characterId={character.id}
                  characterName={character.name}
                  revision={`${character.updatedAt}-${recentRolls.length}-${recentRolls[0]?.id || ''}`}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <MenuSheet
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        title={character.name}
        subtitle={heroLine(character)}
        items={[
          {
            id: 'levelup',
            label: `Subir para o nível ${character.level + 1}`,
            icon: <ChevronsUp size={20} />,
            hidden: character.level >= 20,
            onSelect: () => setIsLevelUpOpen(true),
          },
          {
            id: 'edit',
            label: 'Editar no criador',
            description: 'Refaz as escolhas de 1º nível',
            icon: <Pencil size={20} />,
            onSelect: onEditInWizard,
          },
          { id: 'export', label: 'Exportar JSON', icon: <Download size={20} />, onSelect: onExportJson },
          { id: 'print', label: 'Imprimir / salvar PDF', icon: <Printer size={20} />, onSelect: () => window.print() },
          { id: 'logs', label: 'Ver registro', icon: <FileText size={20} />, onSelect: () => selectTab('registro') },
        ]}
      />

      <DetailModal data={modalDetail} onClose={() => setModalDetail(null)} />

      <VitalAdjustSheet
        open={!!adjustKind}
        kind={adjustKind || 'hp'}
        current={adjustKind === 'mp' ? character.stats.currentMp : character.stats.currentHp}
        max={adjustKind === 'mp' ? character.stats.maxMp.value : character.stats.maxHp.value}
        temp={character.stats.tempHp || 0}
        onClose={() => setAdjustKind(null)}
        onApplyHp={handleApplyHpSheet}
        onApplyMp={handleApplyMpSheet}
      />

      <MoneySheet
        open={isMoneyOpen}
        currentTibares={character.tibares ?? 0}
        onClose={() => setIsMoneyOpen(false)}
        onConfirm={handleConfirmMoney}
      />

      <Suspense fallback={null}>
        {selectedCastSpell && (
          <SpellCastModal
            spell={selectedCastSpell}
            character={character}
            isOpen={Boolean(selectedCastSpell)}
            onClose={() => setSelectedCastSpell(null)}
            onCastSpell={handleCastSpellFromModal}
          />
        )}

        {isLevelUpOpen && (
          <LevelUpModal
            character={character}
            isOpen={isLevelUpOpen}
            onClose={() => setIsLevelUpOpen(false)}
            onSaveLevelUp={(updated) => {
              onUpdateCharacter(updated);
              toast(`${updated.name} alcançou o nível ${updated.level}!`, { tone: 'success' });
            }}
          />
        )}

        {isAddItemOpen && (
          <AddItemModal
            character={character}
            isOpen={isAddItemOpen}
            onClose={() => setIsAddItemOpen(false)}
            onSaveCharacter={(updated) => onUpdateCharacter(updated)}
          />
        )}

        {customizingItem && customizingEquipment && (
          <ItemModifierModal
            key={customizingItem.id}
            item={customizingEquipment}
            initialModifiers={customizingItem.appliedModifiers || []}
            initialMaterial={customizingItem.specialMaterial}
            characterTibares={character.tibares ?? 0}
            isOpen={Boolean(customizingItem)}
            onClose={() => setCustomizingItem(null)}
            onApply={handleSaveCustomizedItem}
          />
        )}
      </Suspense>
    </>
  );
};
