import React, { useState, lazy, Suspense } from 'react';
import type { CharacterSheet, CharacterSpell, CharacterInventoryItem } from '../../types/character';
import { DetailModal, type DetailModalData } from '../common/DetailModal';
import { MoneyModal } from './modals/MoneyModal';
import { TempHpModal } from './modals/TempHpModal';

const SpellCastModal = lazy(() => import('./SpellCastModal').then(m => ({ default: m.SpellCastModal })));
const LevelUpModal = lazy(() => import('./LevelUpModal').then(m => ({ default: m.LevelUpModal })));
const AddItemModal = lazy(() => import('./AddItemModal').then(m => ({ default: m.AddItemModal })));
import { CharacterHeader } from './CharacterHeader';
import { CharacterResourceBars } from './CharacterResourceBars';
import { CharacterConditions } from './CharacterConditions';
import { CharacterAttributes } from './CharacterAttributes';
import { CombatTab } from './tabs/CombatTab';
import { SkillsTab } from './tabs/SkillsTab';
import { PowersTab } from './tabs/PowersTab';
import { SpellsTab, BASE_SPELL_COST_BY_CIRCLE } from './tabs/SpellsTab';
import { InventoryTab } from './tabs/InventoryTab';
import { BioTab } from './tabs/BioTab';
import { LogsTab } from './LogsTab';
import { recalculateFullCharacterSheet, getAttackConditionPenalty } from '../../utils/rulesEngine';
import { RACES_LIST } from '../../data/races';
import { CLASSES_LIST } from '../../data/classes';
import { ORIGINS_LIST } from '../../data/origins';
import { DEITIES_LIST } from '../../data/deities';
import { RULES_CITATIONS } from '../../data/rulesCitations';
import { EQUIPMENT_LIST } from '../../data/equipment';
import type { ChangeLogOptions } from '../../services/logService';
import type { EquipmentItem } from '../../types/rules';
const ItemModifierModal = lazy(() => import('../compendium/ItemModifierModal').then(m => ({ default: m.ItemModifierModal })));
import {
  Sword,
  Dices,
  Sparkles,
  Zap,
  Package,
  BookOpen,
  FileText,
} from 'lucide-react';

interface CharacterSheetViewProps {
  character: CharacterSheet;
  onUpdateCharacter: (char: CharacterSheet, logOptions?: ChangeLogOptions) => void;
  onEditInWizard: () => void;
  onBackToList: () => void;
  onExportJson: () => void;
  onRollDice: (title: string, diceSides: number, modifier: number, count?: number) => void;
  onNavigateToCompendium?: (tab: 'magias' | 'poderes' | 'itens', subTab?: 'gerais' | 'classe') => void;
}

export const CharacterSheetView: React.FC<CharacterSheetViewProps> = ({
  character,
  onUpdateCharacter,
  onEditInWizard,
  onBackToList,
  onExportJson,
  onRollDice,
  onNavigateToCompendium,
}) => {
  const [activeTab, setActiveTab] = useState<'combate' | 'pericias' | 'poderes' | 'magias' | 'inventario' | 'bio' | 'logs'>('combate');
  const [modalDetail, setModalDetail] = useState<DetailModalData | null>(null);
  const [selectedCastSpell, setSelectedCastSpell] = useState<CharacterSpell | null>(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState<boolean>(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState<boolean>(false);
  const [customizingInventoryItem, setCustomizingInventoryItem] = useState<CharacterInventoryItem | null>(null);
  const [isMoneyModalOpen, setIsMoneyModalOpen] = useState<boolean>(false);
  const [moneyOperation, setMoneyOperation] = useState<'add' | 'remove' | 'set'>('add');
  const [moneyAmount, setMoneyAmount] = useState<number>(10);
  const [moneyReason, setMoneyReason] = useState<string>('');
  const [isTempHpModalOpen, setIsTempHpModalOpen] = useState<boolean>(false);
  const [tempHpAmount, setTempHpAmount] = useState<number>(5);
  const [tempHpReason, setTempHpReason] = useState<string>('');

  // Ajustes de Vida com consumo prioritário de PV Temporários (auditável)
  const handleModifyHp = (delta: number) => {
    const currentHp = character.stats.currentHp;
    const currentTemp = character.stats.tempHp || 0;

    if (delta < 0) {
      // Dano: em Tormenta 20 JDA, PV temporários são consumidos primeiro
      const damage = Math.abs(delta);
      const absorbed = Math.min(currentTemp, damage);
      const remainingDamage = damage - absorbed;
      const newTempHp = currentTemp - absorbed;
      const newHp = Math.max(0, currentHp - remainingDamage);

      const actionReason = absorbed > 0
        ? `Sofreu ${damage} de dano: ${absorbed} absorvido por PV Temporário (${newTempHp} temp restante), ${remainingDamage} no PV normal.`
        : `Sofreu ${damage} de dano direto aos Pontos de Vida.`;

      onUpdateCharacter(
        {
          ...character,
          stats: {
            ...character.stats,
            currentHp: newHp,
            tempHp: newTempHp,
          },
        },
        { actionReason }
      );
    } else {
      // Cura: recupera PV normal (não ultrapassa maxHp)
      const newHp = Math.min(character.stats.maxHp.value, Math.max(0, currentHp + delta));
      onUpdateCharacter(
        {
          ...character,
          stats: {
            ...character.stats,
            currentHp: newHp,
          },
        },
        { actionReason: `Recuperou +${delta} Pontos de Vida.` }
      );
    }
  };

  // Gerenciamento direto de PV Temporários (auditável)
  const handleApplyTempHp = (amount: number, operation: 'add' | 'set', reason?: string) => {
    const currentTemp = character.stats.tempHp || 0;
    const newTemp = operation === 'add' ? currentTemp + amount : Math.max(0, amount);
    onUpdateCharacter(
      {
        ...character,
        stats: {
          ...character.stats,
          tempHp: newTemp,
        },
      },
      {
        actionReason:
          reason ||
          (operation === 'add'
            ? `Recebeu +${amount} PV temporários (Total: ${newTemp}).`
            : `PV Temporários ajustados para ${newTemp}.`),
      }
    );
    setIsTempHpModalOpen(false);
    setTempHpReason('');
  };

  const handleModifyMp = (delta: number, logOptions?: ChangeLogOptions) => {
    const newMp = Math.min(character.stats.maxMp.value, Math.max(0, character.stats.currentMp + delta));
    onUpdateCharacter(
      {
        ...character,
        stats: {
          ...character.stats,
          currentMp: newMp,
        },
      },
      logOptions
    );
  };

  // Lançar Magia via Modal Completo de Conjuração com Aprimoramentos
  const handleCastSpellFromModal = (
    spellName: string,
    pmCost: number,
    rollInfo?: { title: string; sides: number; count: number; modifier: number }
  ) => {
    handleModifyMp(-pmCost, {
      spellCast: {
        spellName,
        pmCost,
        circle: selectedCastSpell?.circle,
      },
    });
    if (rollInfo) {
      onRollDice(rollInfo.title, rollInfo.sides, rollInfo.modifier, rollInfo.count);
    } else {
      onRollDice(`Lançamento da magia ${spellName} (Custo: ${pmCost} PM)`, 20, 0, 1);
    }
  };

  // Lançar Magia no Estado Padrão (direto, sem aprimoramentos adicionais)
  const handleCastStandardSpell = (sp: CharacterSpell) => {
    const baseCost = BASE_SPELL_COST_BY_CIRCLE[sp.circle || 1] || 1;

    if (character.stats.currentMp < baseCost) {
      alert(`Pontos de Mana insuficientes para lançar ${sp.name}! Custo: ${baseCost} PM, Disponível: ${character.stats.currentMp} PM.`);
      return;
    }

    handleModifyMp(-baseCost, {
      spellCast: {
        spellName: sp.name,
        pmCost: baseCost,
        circle: sp.circle,
      },
    });

    // Detecta dados de dano ou cura padrão no texto canônico da magia
    const match = (sp.description || '').match(/(\d+)d(\d+)(?:\s*\+\s*(\d+))?/i);
    if (match) {
      const count = parseInt(match[1], 10);
      const sides = parseInt(match[2], 10);
      const mod = match[3] ? parseInt(match[3], 10) : 0;
      onRollDice(`Lançamento da magia ${sp.name} [Dano/Efeito - ${count}d${sides}${mod > 0 ? `+${mod}` : ''} (${baseCost} PM)]`, sides, mod, count);
    } else {
      onRollDice(`Lançamento da magia ${sp.name} [Padrão - ${baseCost} PM]`, 20, 0, 1);
    }
  };

  // Alternar Equipamento Equipado/Desequipado com recálculo automático de estatísticas
  const handleToggleEquip = (itemId: string) => {
    const updatedInventory = character.inventory.map((item) => {
      if (item.id === itemId) {
        return { ...item, isEquipped: !item.isEquipped };
      }
      return item;
    });
    const updatedSheet = recalculateFullCharacterSheet({
      ...character,
      inventory: updatedInventory,
    });
    onUpdateCharacter(updatedSheet);
  };

  // Alternar Condição Ativa com recálculo canônico integral imediato
  const handleToggleCondition = (condId: string) => {
    const isPresent = character.activeConditions.includes(condId);
    const updated = isPresent
      ? character.activeConditions.filter((c) => c !== condId)
      : [...character.activeConditions, condId];
    const updatedSheet = recalculateFullCharacterSheet({
      ...character,
      activeConditions: updated,
    });
    onUpdateCharacter(updatedSheet);
  };

  // Rolar Perícia (bônus já com cálculo de condições canônicas)
  const handleRollSkill = (skillName: string, totalMod: number, formula: string) => {
    onRollDice(`Teste de ${skillName} [${formula}]`, 20, totalMod);
  };

  // Rolar Ataque (com verificação e aplicação de condições ativas)
  const handleRollAttack = (weaponName: string, attackMod: number, isMelee: boolean = true) => {
    const { penalty, reasons } = getAttackConditionPenalty(character.activeConditions, isMelee);
    const totalAttack = attackMod + penalty;
    const condNote = reasons.length > 0 ? ` [${reasons.join(', ')}]` : '';
    onRollDice(`Ataque com ${weaponName}${condNote}`, 20, totalAttack);
  };

  // Rolar Dano
  const handleRollDamage = (weaponName: string, damageStr: string = '1d8') => {
    const match = damageStr.match(/(\d+)d(\d+)/);
    if (match) {
      const count = parseInt(match[1], 10);
      const sides = parseInt(match[2], 10);
      onRollDice(`Dano de ${weaponName} (${damageStr})`, sides, 0, count);
    } else {
      onRollDice(`Dano de ${weaponName}`, 8, 0, 1);
    }
  };

  // Gerenciamento e Edição de Dinheiro (Tibares T$)
  const handleSaveMoney = () => {
    const current = character.tibares ?? 0;
    let newAmount = current;
    if (moneyOperation === 'add') {
      newAmount = current + Math.max(0, moneyAmount);
    } else if (moneyOperation === 'remove') {
      newAmount = Math.max(0, current - Math.max(0, moneyAmount));
    } else {
      newAmount = Math.max(0, moneyAmount);
    }

    const defaultReason = moneyOperation === 'add'
      ? `Ganho de T$ ${moneyAmount}`
      : moneyOperation === 'remove'
        ? `Gasto de T$ ${moneyAmount}`
        : `Saldo ajustado para T$ ${newAmount}`;

    const reasonText = moneyReason.trim() ? `${defaultReason} - ${moneyReason.trim()}` : defaultReason;

    onUpdateCharacter(
      {
        ...character,
        tibares: newAmount,
      },
      {
        actionReason: reasonText,
      }
    );
    setIsMoneyModalOpen(false);
    setMoneyReason('');
  };

  // Salvamento de Item Customizado na Oficina / Forja (auditável)
  const handleSaveCustomizedItem = (
    customizedItem: EquipmentItem,
    appliedModifierIds: string[],
    totalCost: number
  ) => {
    if (!customizingInventoryItem) return;

    const currentTibares = character.tibares ?? 0;
    const newTibares = Math.max(0, currentTibares - totalCost);

    const updatedInventory = character.inventory.map((item) => {
      if (item.id === customizingInventoryItem.id) {
        return {
          ...item,
          name: customizedItem.name,
          appliedModifiers: appliedModifierIds,
          specialMaterial: customizedItem.specialMaterial,
          defenseBonus: customizedItem.defenseBonus,
          damage: customizedItem.damage,
          critical: customizedItem.critical,
          spaces: customizedItem.spaces,
          price: customizedItem.price,
        };
      }
      return item;
    });

    const updatedSheet = recalculateFullCharacterSheet({
      ...character,
      tibares: newTibares,
      inventory: updatedInventory,
    });

    const modsText = appliedModifierIds.length > 0 ? ` [Modificações: ${appliedModifierIds.join(', ')}]` : '';
    const matText = customizedItem.specialMaterial ? ` [Material: ${customizedItem.specialMaterial}]` : '';
    const costText = totalCost > 0 ? ` (Custo de forja: T$ ${totalCost})` : '';

    onUpdateCharacter(updatedSheet, {
      actionReason: `Modificação de equipamento na Oficina/Forja: ${customizedItem.name}${modsText}${matText}${costText}`,
    });

    setCustomizingInventoryItem(null);
  };

  // Handlers para abrir detalhes de Raça, Classe, Origem, Divindade e Condições
  const handleOpenRaceDetail = () => {
    const race = RACES_LIST.find((r) => r.id === character.raceId);
    if (!race) return;
    setModalDetail({
      title: race.name,
      category: 'Raça Canônica • Tormenta 20 JDA',
      subtitle: `Tamanho: ${race.size} • Deslocamento: ${race.speed}m`,
      description:
        race.description +
        '\n\n' +
        race.abilities.map((a) => `• ${a.name} (${a.type}): ${a.description}`).join('\n\n'),
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
      category: 'Classe Canônica • Tormenta 20 JDA',
      subtitle: `Função: ${cls.role} • PV Inicial: ${cls.hpInitial} (+${cls.hpPerLevel}/nível) • PM: ${cls.mpInitial} (+${cls.mpPerLevel}/nível)`,
      description:
        cls.description +
        `\n\nPerícias obrigatórias: ${cls.mandatorySkills.join(', ')}.\nPerícias adicionais de classe: ${cls.skillChoicesCount} à escolha da lista da classe.`,
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
      category: 'Origem • Tormenta 20 JDA',
      subtitle: `Itens Iniciais: ${origin.items.join(', ')}`,
      description:
        origin.description +
        '\n\n' +
        `Perícias concedidas: ${origin.skills.join(', ')}.\n\n` +
        `Poderes da Origem:\n${origin.powers.map((p) => `• ${p.name} (${p.type}): ${p.description}`).join('\n')}`,
      ruleCitation: RULES_CITATIONS.ORIGIN_SKILL_REPLACEMENT || {
        id: `ORIGIN_${origin.id.toUpperCase()}`,
        title: `Origem: ${origin.name}`,
        book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
        chapter: 'Capítulo 1: Construção de Personagem',
        section: 'Origens',
        page: 'Página 94 a 101',
        quote: origin.description,
        explanation: 'Origens concedem 2 benefícios (perícias ou poderes) e itens iniciais característicos.',
      },
    });
  };

  const handleOpenDeityDetail = () => {
    const deity = DEITIES_LIST.find((d) => d.id === character.deityId);
    if (!deity) return;
    setModalDetail({
      title: `${deity.name}, ${deity.title}`,
      category: 'Divindade do Panteão • Tormenta 20 JDA',
      subtitle: `Símbolo Sagrado: ${deity.symbol} • Canalização: Energia ${deity.energyChannel}`,
      description:
        deity.description +
        (deity.obligations ? `\n\nObrigações e Restrições:\n${deity.obligations}` : '') +
        `\n\nPoderes Concedidos:\n` +
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
      title: 'Regras de Condições • Tormenta 20',
      category: 'Regras Oficiais • Tormenta 20 JDA',
      subtitle: 'Capítulo 5: Jogando — Condições (pág. 394)',
      description:
        'Condições alteram as capacidades do personagem de forma temporária ou contínua. Elas podem impor penalidades em testes, impedir ações ou conceder vulnerabilidades.\n\nCondições iguais não se acumulam; apenas seus efeitos mais severos se aplicam.',
      ruleCitation: {
        id: 'RULES_CONDITIONS',
        title: 'Condições do Sistema',
        book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
        chapter: 'Capítulo 5: Jogando',
        section: 'Condições',
        page: 'Página 394 a 397 (Apêndice)',
        quote: '“Uma condição é um estado passageiro que afeta o personagem...”',
        explanation: 'Clique nas condições abaixo para ativar ou desativar o efeito em tempo real na ficha.',
      },
    });
  };

  return (
    <div className="container" style={{ padding: '1.5rem 1.5rem 6rem 1.5rem', maxWidth: '1280px' }}>
      {/* Cabeçalho e Barra Superior */}
      <CharacterHeader
        character={character}
        activeTab={activeTab}
        onBackToList={onBackToList}
        onSelectTab={setActiveTab}
        onEditInWizard={onEditInWizard}
        onExportJson={onExportJson}
        onOpenLevelUp={() => setIsLevelUpModalOpen(true)}
        onOpenRaceDetail={handleOpenRaceDetail}
        onOpenClassDetail={handleOpenClassDetail}
        onOpenOriginDetail={handleOpenOriginDetail}
        onOpenDeityDetail={handleOpenDeityDetail}
      />

      {/* Vitais: PV, PM, Defesa, Deslocamento e Carga */}
      <CharacterResourceBars
        character={character}
        onModifyHp={handleModifyHp}
        onModifyMp={handleModifyMp}
        onOpenTempHpModal={() => {
          setTempHpAmount((character.stats.tempHp || 0) > 0 ? character.stats.tempHp : 5);
          setTempHpReason('');
          setIsTempHpModalOpen(true);
        }}
      />

      {/* Condições Ativas Rápidas */}
      <CharacterConditions
        activeConditions={character.activeConditions}
        onToggleCondition={handleToggleCondition}
        onOpenConditionRules={handleOpenConditionRules}
      />

      {/* Atributos (6 caixas com roll button e breakdown) */}
      <CharacterAttributes
        character={character}
        onRollDice={onRollDice}
        onSetModalDetail={setModalDetail}
      />

      {/* Abas de Navegação Interna da Ficha */}
      <div
        className="no-print"
        style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0.75rem',
          overflowX: 'auto',
        }}
      >
        {[
          { id: 'combate', label: 'Combate', icon: Sword },
          { id: 'pericias', label: 'Perícias', icon: Dices },
          { id: 'poderes', label: 'Poderes & Habilidades', icon: Sparkles },
          ...(character.spells && character.spells.length > 0
            ? [{ id: 'magias', label: 'Grimório & Magias', icon: Zap }]
            : []),
          { id: 'inventario', label: 'Inventário & Carga', icon: Package },
          { id: 'bio', label: 'Biografia & Notas', icon: BookOpen },
          { id: 'logs', label: 'Logs', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
              style={{ gap: '0.4rem', whiteSpace: 'nowrap' }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Conteúdo das Abas */}
      {activeTab === 'combate' && (
        <CombatTab
          character={character}
          onRollAttack={handleRollAttack}
          onRollDamage={handleRollDamage}
        />
      )}

      {activeTab === 'pericias' && (
        <SkillsTab
          character={character}
          onRollSkill={handleRollSkill}
          onSetModalDetail={setModalDetail}
        />
      )}

      {activeTab === 'poderes' && (
        <PowersTab
          character={character}
          onSetModalDetail={setModalDetail}
          onNavigateToCompendium={onNavigateToCompendium}
        />
      )}

      {activeTab === 'magias' && (
        <SpellsTab
          character={character}
          onCastStandardSpell={handleCastStandardSpell}
          onSelectCastSpell={setSelectedCastSpell}
          onSetModalDetail={setModalDetail}
        />
      )}

      {activeTab === 'inventario' && (
        <InventoryTab
          character={character}
          onOpenAddItemModal={() => setIsAddItemModalOpen(true)}
          onOpenMoneyModal={() => {
            setMoneyAmount(10);
            setMoneyReason('');
            setMoneyOperation('add');
            setIsMoneyModalOpen(true);
          }}
          onCustomizeItem={setCustomizingInventoryItem}
          onToggleEquip={handleToggleEquip}
          onSetModalDetail={setModalDetail}
        />
      )}

      {activeTab === 'bio' && (
        <BioTab
          character={character}
          onUpdateCharacter={(updatedChar) => onUpdateCharacter(updatedChar)}
        />
      )}

      {activeTab === 'logs' && (
        <LogsTab
          characterId={character.id}
          characterName={character.name}
        />
      )}

      {/* Modais */}
      <DetailModal data={modalDetail} onClose={() => setModalDetail(null)} />

      {/* Modais com Lazy Loading */}
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

        <LevelUpModal
          character={character}
          isOpen={isLevelUpModalOpen}
          onClose={() => setIsLevelUpModalOpen(false)}
          onSaveLevelUp={(updated) => onUpdateCharacter(updated)}
        />

        <AddItemModal
          character={character}
          isOpen={isAddItemModalOpen}
          onClose={() => setIsAddItemModalOpen(false)}
          onSaveCharacter={(updated) => onUpdateCharacter(updated)}
        />

        {customizingInventoryItem && (
          <ItemModifierModal
            key={customizingInventoryItem.id}
            item={(() => {
              const match = EQUIPMENT_LIST.find(
                (e) => e.id === (customizingInventoryItem.equipmentId || customizingInventoryItem.id)
              );
              if (match) return match;
              return {
                id: customizingInventoryItem.equipmentId || customizingInventoryItem.id,
                name: customizingInventoryItem.name,
                category: customizingInventoryItem.category as EquipmentItem['category'],
                subcategory: customizingInventoryItem.subcategory,
                spaces: customizingInventoryItem.spaces,
                price: customizingInventoryItem.price || 'T$ 0',
                damage: customizingInventoryItem.damage,
                critical: customizingInventoryItem.critical,
                damageType: customizingInventoryItem.damageType,
                range: customizingInventoryItem.range,
                defenseBonus: customizingInventoryItem.defenseBonus,
                armorPenalty: customizingInventoryItem.armorPenalty,
                attackBonus: customizingInventoryItem.attackBonus,
                description: customizingInventoryItem.description || '',
              };
            })()}
            initialModifiers={customizingInventoryItem.appliedModifiers || []}
            initialMaterial={customizingInventoryItem.specialMaterial}
            characterTibares={character.tibares ?? 0}
            isOpen={Boolean(customizingInventoryItem)}
            onClose={() => setCustomizingInventoryItem(null)}
            onApply={handleSaveCustomizedItem}
          />
        )}
      </Suspense>

      <MoneyModal
        isOpen={isMoneyModalOpen}
        currentTibares={character.tibares ?? 0}
        moneyOperation={moneyOperation}
        moneyAmount={moneyAmount}
        moneyReason={moneyReason}
        onSetOperation={setMoneyOperation}
        onSetAmount={setMoneyAmount}
        onSetReason={setMoneyReason}
        onConfirm={handleSaveMoney}
        onClose={() => setIsMoneyModalOpen(false)}
      />

      <TempHpModal
        isOpen={isTempHpModalOpen}
        currentTempHp={character.stats.tempHp || 0}
        tempHpAmount={tempHpAmount}
        tempHpReason={tempHpReason}
        onSetAmount={setTempHpAmount}
        onSetReason={setTempHpReason}
        onApply={handleApplyTempHp}
        onClose={() => setIsTempHpModalOpen(false)}
      />
    </div>
  );
};
