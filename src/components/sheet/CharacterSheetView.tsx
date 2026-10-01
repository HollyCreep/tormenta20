import React, { useState } from 'react';
import { CharacterSheet, CharacterSpell, CharacterInventoryItem } from '../../types/character';
import { StatBreakdownBadge } from '../common/StatBreakdownBadge';
import { DetailModal, DetailModalData } from '../common/DetailModal';
import { SpellCastModal } from './SpellCastModal';
import { LevelUpModal } from './LevelUpModal';
import { AddItemModal } from './AddItemModal';
import { NotebookSection } from './NotebookSection';
import { recalculateFullCharacterSheet, getAttackConditionPenalty } from '../../utils/rulesEngine';
import { CONDITIONS_LIST } from '../../data/conditions';
import { ATTRIBUTES_LIST } from '../../data/attributes';
import { SKILLS_LIST } from '../../data/skills';
import { RULES_CITATIONS } from '../../data/rulesCitations';
import { RACES_LIST } from '../../data/races';
import { CLASSES_LIST } from '../../data/classes';
import { ORIGINS_LIST } from '../../data/origins';
import { DEITIES_LIST } from '../../data/deities';
import { cleanT20Text } from '../../utils/textUtils';
import { ChangeLogOptions } from '../../services/logService';
import { ItemModifierModal } from '../compendium/ItemModifierModal';
import { EQUIPMENT_LIST } from '../../data/equipment';
import { getEquipmentDetailModalData } from '../../utils/equipmentDetail';
import { EquipmentItem } from '../../types/rules';
import {
  SchoolBadge,
  SpellTypeBadge,
  CircleBadge,
  PowerCategoryBadge,
  ExecutionBadge,
  RangeBadge,
} from '../common/T20Badge';
import {
  Heart,
  Zap,
  Shield,
  Dices,
  Edit,
  Download,
  Printer,
  ChevronLeft,
  Sword,
  Sparkles,
  Package,
  BookOpen,
  Info,
  Award,
  TrendingUp,
  Plus,
  Compass,
  User,
  Coins,
  Wrench,
  ShieldAlert,
  Check,
  X,
} from 'lucide-react';

interface CharacterSheetViewProps {
  character: CharacterSheet;
  onUpdateCharacter: (char: CharacterSheet, logOptions?: ChangeLogOptions) => void;
  onEditInWizard: () => void;
  onBackToList: () => void;
  onExportJson: () => void;
  onRollDice: (title: string, diceSides: number, modifier: number, count?: number) => void;
}

export const CharacterSheetView: React.FC<CharacterSheetViewProps> = ({
  character,
  onUpdateCharacter,
  onEditInWizard,
  onBackToList,
  onExportJson,
  onRollDice,
}) => {
  const [activeTab, setActiveTab] = useState<'combate' | 'pericias' | 'poderes' | 'magias' | 'inventario' | 'bio'>('combate');
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
  const [skillSearch, setSkillSearch] = useState('');
  const [skillFilter, setSkillFilter] = useState<'todas' | 'treinadas'>('treinadas');

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

  // Custo canônico base por círculo (T20 JDA Cap. 4, pág. 178)
  const BASE_SPELL_COST_BY_CIRCLE: Record<number, number> = { 1: 1, 2: 3, 3: 6, 4: 10, 5: 15 };

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
          price: customizedItem.price,
          spaces: customizedItem.spaces,
          defenseBonus: customizedItem.defenseBonus,
          armorPenalty: customizedItem.armorPenalty,
          damage: customizedItem.damage,
          attackBonus: customizedItem.attackBonus,
          critical: customizedItem.critical,
          appliedModifiers: appliedModifierIds,
          specialMaterial: customizedItem.specialMaterial,
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

  // Armas equipadas (exclui armaduras e escudos)
  const equippedWeapons = character.inventory.filter(
    (item) => item.isEquipped && item.category.startsWith('arma_') && !item.category.startsWith('armadura')
  );

  // Perícias filtradas
  const filteredSkills = Object.values(character.skills).filter((sk) => {
    const matchesFilter = skillFilter === 'todas' || sk.isTrained;
    const matchesSearch = sk.name.toLowerCase().includes(skillSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Handlers para abrir detalhes de Raça, Classe, Origem e Divindade
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

  return (
    <div className="container" style={{ padding: '1.5rem 1.5rem 6rem 1.5rem', maxWidth: '1280px' }}>
      {/* Barra de Ações Superior */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button
          type="button"
          onClick={onBackToList}
          className="btn btn-secondary"
          style={{ gap: '0.4rem' }}
        >
          <ChevronLeft size={18} />
          Voltar às Fichas
        </button>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={onEditInWizard}
            className="btn btn-secondary"
            style={{ gap: '0.4rem' }}
          >
            <Edit size={16} />
            Editar no Criador
          </button>
          <button
            type="button"
            onClick={onExportJson}
            className="btn btn-secondary"
            style={{ gap: '0.4rem' }}
          >
            <Download size={16} />
            Exportar JSON
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="btn btn-gold"
            style={{ gap: '0.4rem' }}
          >
            <Printer size={16} />
            Imprimir / Salvar PDF
          </button>
        </div>
      </div>

      {/* Cartão de Cabeçalho do Personagem (Hero Card Estruturado) */}
      <div
        className="t20-card t20-card-gold"
        style={{
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
          border: '1px solid var(--border-gold)',
          padding: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
              <h1 style={{ fontSize: '2.1rem', margin: 0, lineHeight: 1.1 }}>{character.name}</h1>
              <span className="badge badge-gold" style={{ fontSize: '0.825rem', padding: '0.25rem 0.75rem' }}>
                Nível {character.level}
              </span>
              <button
                type="button"
                onClick={() => setIsLevelUpModalOpen(true)}
                className="btn btn-gold no-print"
                style={{
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  gap: '0.4rem',
                  boxShadow: '0 0 15px rgba(217, 119, 6, 0.4)',
                }}
              >
                <TrendingUp size={15} />
                Subir de Nível
              </button>
            </div>
            {character.concept && (
              <p style={{ margin: '0.15rem 0 0.85rem 0', fontSize: '0.95rem', color: 'var(--t20-gold-light)', fontStyle: 'italic' }}>
                "{character.concept}"
              </p>
            )}

            {/* Grid Organizado de Identidade do Personagem */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '0.6rem',
                marginTop: '0.75rem',
              }}
            >
              {/* Raça */}
              <div className="char-info-pill">
                <Shield size={14} style={{ color: 'var(--t20-gold)' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="char-info-label">Raça</span>
                  <span className="char-info-value">{character.raceId.toUpperCase()}</span>
                </div>
                <button
                  type="button"
                  onClick={handleOpenRaceDetail}
                  className="char-info-btn"
                  title="Ver regras e habilidades raciais completas"
                >
                  <Info size={13} />
                </button>
              </div>

              {/* Classe */}
              <div className="char-info-pill">
                <Sword size={14} style={{ color: 'var(--artonian-gold, #f59e0b)' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="char-info-label">Classe</span>
                  <span className="char-info-value">
                    {character.classes && character.classes.length > 1
                      ? character.classes.map((c) => `${c.className} ${c.level}`).join(' / ')
                      : `${character.classId.toUpperCase()} ${character.level}`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleOpenClassDetail}
                  className="char-info-btn"
                  title="Ver características e progressão da classe"
                >
                  <Info size={13} />
                </button>
              </div>

              {/* Origem */}
              <div className="char-info-pill">
                <Compass size={14} style={{ color: 'var(--t20-life-light, #34d399)' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="char-info-label">Origem</span>
                  <span className="char-info-value">{character.originId.toUpperCase()}</span>
                </div>
                <button
                  type="button"
                  onClick={handleOpenOriginDetail}
                  className="char-info-btn"
                  title="Ver benefícios e itens da origem"
                >
                  <Info size={13} />
                </button>
              </div>

              {/* Divindade */}
              <div className="char-info-pill">
                <Sparkles size={14} style={{ color: 'var(--t20-mana-light, #60a5fa)' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="char-info-label">Divindade</span>
                  <span className="char-info-value" style={{ color: character.deityId !== 'nenhum' ? 'var(--t20-gold)' : undefined }}>
                    {character.deityId !== 'nenhum' ? character.deityId.toUpperCase() : 'NENHUMA'}
                  </span>
                </div>
                {character.deityId !== 'nenhum' && (
                  <button
                    type="button"
                    onClick={handleOpenDeityDetail}
                    className="char-info-btn"
                    title="Ver poderes concedidos e obrigações da divindade"
                  >
                    <Info size={13} />
                  </button>
                )}
              </div>

              {/* Jogador */}
              <div className="char-info-pill">
                <User size={14} style={{ color: 'var(--text-dim)' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="char-info-label">Jogador</span>
                  <span className="char-info-value">{character.playerName || 'Lucas'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vitais: PV, PM, Defesa, Deslocamento e Carga */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Caixa de PV */}
        <div
          className="t20-card"
          style={{
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f87171', fontWeight: 700 }}>
                <Heart size={18} />
                <span>Pontos de Vida</span>
              </div>
              <StatBreakdownBadge label="PV Máximo" breakdown={character.stats.maxHp} variant="ruby" size="sm" />
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', margin: '0.5rem 0', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: character.stats.currentHp <= 5 ? '#ef4444' : '#ffffff' }}>
                {character.stats.currentHp}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                / {character.stats.maxHp.value} PV
              </span>
              {(character.stats.tempHp || 0) > 0 && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    background: 'rgba(56, 189, 248, 0.18)',
                    border: '1px solid #38bdf8',
                    color: '#38bdf8',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '9999px',
                    marginLeft: '0.2rem',
                    fontFamily: 'var(--font-mono)',
                  }}
                  title="Pontos de Vida Temporários (absorvem dano antes do PV normal)"
                >
                  +{character.stats.tempHp} Temp
                </span>
              )}
            </div>

            {/* Barra de Progresso de Vida */}
            <div style={{ height: 8, background: 'rgba(0,0,0,0.4)', borderRadius: 4, overflow: 'hidden', marginBottom: '0.75rem' }}>
              <div
                style={{
                  height: '100%',
                  width: `${Math.max(0, Math.min(100, (character.stats.currentHp / character.stats.maxHp.value) * 100))}%`,
                  background: 'linear-gradient(90deg, #ef4444 0%, #10b981 100%)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button type="button" onClick={() => handleModifyHp(-5)} className="btn btn-secondary" style={{ flex: 1, padding: '0.3rem', fontSize: '0.8rem' }}>-5</button>
            <button type="button" onClick={() => handleModifyHp(-1)} className="btn btn-secondary" style={{ flex: 1, padding: '0.3rem', fontSize: '0.8rem' }}>-1</button>
            <button type="button" onClick={() => handleModifyHp(1)} className="btn btn-secondary" style={{ flex: 1, padding: '0.3rem', fontSize: '0.8rem' }}>+1</button>
            <button type="button" onClick={() => handleModifyHp(5)} className="btn btn-secondary" style={{ flex: 1, padding: '0.3rem', fontSize: '0.8rem' }}>+5</button>
          </div>

          <div style={{ marginTop: '0.4rem' }}>
            <button
              type="button"
              onClick={() => {
                setTempHpAmount((character.stats.tempHp || 0) > 0 ? character.stats.tempHp : 5);
                setTempHpReason('');
                setIsTempHpModalOpen(true);
              }}
              className="btn btn-ghost"
              style={{
                width: '100%',
                padding: '0.25rem 0.5rem',
                fontSize: '0.75rem',
                color: '#38bdf8',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                border: '1px dashed rgba(56, 189, 248, 0.4)',
                borderRadius: 'var(--radius-sm)',
              }}
              title="Gerenciar PV temporários (auditável conforme regras de T20)"
            >
              <ShieldAlert size={13} />
              <span>{(character.stats.tempHp || 0) > 0 ? `PV Temporário: ${character.stats.tempHp} (Editar)` : '+ PV Temporário'}</span>
            </button>
          </div>
        </div>

        {/* Caixa de PM */}
        <div
          className="t20-card"
          style={{
            background: 'rgba(59, 130, 246, 0.08)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#60a5fa', fontWeight: 700 }}>
                <Zap size={18} />
                <span>Pontos de Mana</span>
              </div>
              <StatBreakdownBadge label="PM Máximo" breakdown={character.stats.maxMp} variant="blue" size="sm" />
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', margin: '0.5rem 0' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>
                {character.stats.currentMp}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                / {character.stats.maxMp.value} PM
              </span>
            </div>

            {/* Barra de Progresso de Mana */}
            <div style={{ height: 8, background: 'rgba(0,0,0,0.4)', borderRadius: 4, overflow: 'hidden', marginBottom: '0.75rem' }}>
              <div
                style={{
                  height: '100%',
                  width: `${Math.max(0, Math.min(100, (character.stats.currentMp / character.stats.maxMp.value) * 100))}%`,
                  background: 'linear-gradient(90deg, #3b82f6 0%, #93c5fd 100%)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button type="button" onClick={() => handleModifyMp(-5)} className="btn btn-secondary" style={{ flex: 1, padding: '0.3rem', fontSize: '0.8rem' }}>-5</button>
            <button type="button" onClick={() => handleModifyMp(-1)} className="btn btn-secondary" style={{ flex: 1, padding: '0.3rem', fontSize: '0.8rem' }}>-1</button>
            <button type="button" onClick={() => handleModifyMp(1)} className="btn btn-secondary" style={{ flex: 1, padding: '0.3rem', fontSize: '0.8rem' }}>+1</button>
            <button type="button" onClick={() => handleModifyMp(5)} className="btn btn-secondary" style={{ flex: 1, padding: '0.3rem', fontSize: '0.8rem' }}>+5</button>
          </div>
        </div>

        {/* Caixa de Defesa (com badge interativo de somatória transparente) */}
        <div
          className="t20-card t20-card-gold"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--t20-gold)', fontWeight: 700, marginBottom: '0.25rem' }}>
            <Shield size={20} />
            <span style={{ fontSize: '1.1rem' }}>Defesa Total</span>
          </div>
          <div style={{ margin: '0.5rem 0' }}>
            <StatBreakdownBadge label="Defesa" breakdown={character.stats.defense} variant="gold" size="lg" />
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            Passe o mouse ou clique para ver os componentes
          </div>
        </div>

        {/* Deslocamento, Penalidade e Carga */}
        <div
          className="t20-card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            gap: '0.5rem',
            padding: '1rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Deslocamento:</span>
            <StatBreakdownBadge label="Deslocamento" breakdown={character.stats.speed} unit="m" size="sm" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Penalidade Armadura:</span>
            <StatBreakdownBadge label="Penalidade" breakdown={character.stats.armorPenalty} size="sm" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Carga de Inventário:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: character.stats.currentSpaces > character.stats.maxSpaces.value ? '#ef4444' : 'var(--t20-gold-light)' }}>
                {character.stats.currentSpaces} esp.
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>/</span>
              <StatBreakdownBadge label="Capacidade Máxima de Carga" breakdown={character.stats.maxSpaces} unit=" esp." size="sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Condições Ativas Rápidas */}
      <div
        className="t20-card"
        style={{
          marginBottom: '1.5rem',
          padding: '0.85rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Condições Ativas:
          </span>
          <button
            type="button"
            onClick={() => {
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
            }}
            className="char-info-btn"
            title="Ver regras canônicas de Condições"
          >
            <Info size={13} />
          </button>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {CONDITIONS_LIST.slice(0, 10).map((cond) => {
            const isActive = character.activeConditions.includes(cond.id);
            return (
              <button
                key={cond.id}
                type="button"
                onClick={() => handleToggleCondition(cond.id)}
                className={`badge ${isActive ? 'badge-ruby' : 'badge-slate'}`}
                style={{
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--t20-ruby)' : '1px solid var(--border-color)',
                  opacity: isActive ? 1 : 0.6,
                }}
                title={cond.effects.join(' ')}
              >
                {isActive ? '● ' : ''}{cond.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Atributos (6 caixas com roll button e breakdown) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '0.75rem',
          marginBottom: '1.5rem',
        }}
      >
        {ATTRIBUTES_LIST.map((attr) => {
          const mod = character.totalAttributes[attr.key] || 0;
          const base = character.baseAttributes[attr.key] || 0;
          const racial = character.racialModifiers[attr.key] || 0;

          return (
            <div
              key={attr.key}
              className="t20-card"
              style={{
                textAlign: 'center',
                padding: '0.85rem 0.5rem',
                border: mod >= 3 ? '1px solid var(--border-gold)' : '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.35rem', position: 'relative' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-fantasy)', color: '#ffffff' }}>
                    {attr.shortName}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const citationKey = 'ATTR_' + attr.key.toUpperCase();
                      const citation = RULES_CITATIONS[citationKey];
                      setModalDetail({
                        title: `${attr.name} (${attr.shortName})`,
                        category: 'Atributo Básico • Tormenta 20 JDA',
                        subtitle: `Cálculo: Base (${base >= 0 ? '+' + base : base}) + Raça (${racial >= 0 ? '+' + racial : racial}) = Total (${mod >= 0 ? '+' + mod : mod})`,
                        description:
                          attr.description +
                          '\n\n' +
                          (citation ? citation.explanation : '') +
                          `\n\nTestes e regras associadas: ${attr.appliedTo.join(', ')}.`,
                        ruleCitation: citation,
                        stats: [
                          { label: 'Valor Base', value: base >= 0 ? `+${base}` : base },
                          { label: 'Modificador Racial', value: racial >= 0 ? `+${racial}` : racial },
                          { label: 'Valor Total', value: mod >= 0 ? `+${mod}` : mod },
                        ],
                      });
                    }}
                    className="btn btn-ghost"
                    style={{ padding: '0.1rem', color: 'var(--t20-gold)', position: 'absolute', right: 0, top: 0 }}
                    title={`Ver regras e testes afetados por ${attr.name}`}
                  >
                    <Info size={13} />
                  </button>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '0.4rem' }}>
                  {attr.name}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '2rem',
                    fontWeight: 900,
                    color: mod > 0 ? 'var(--t20-gold-light)' : mod < 0 ? '#f87171' : '#cbd5e1',
                    lineHeight: 1,
                    marginBottom: '0.4rem',
                  }}
                >
                  {mod > 0 ? `+${mod}` : mod}
                </div>

                <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>
                  Base {base} {racial !== 0 ? `| Raça ${racial > 0 ? `+${racial}` : racial}` : ''}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onRollDice(`Teste de ${attr.name}`, 20, mod)}
                className="btn btn-secondary"
                style={{ padding: '0.25rem 0.4rem', fontSize: '0.75rem', gap: '0.25rem', width: '100%', justifyContent: 'center' }}
                title={`Rolar 1d20 + ${mod}`}
              >
                <Dices size={12} />
                Rolar
              </button>
            </div>
          );
        })}
      </div>

      {/* Abas de Navegação Interna da Ficha */}
      <div
        className="no-print"
        style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0.5rem',
          marginBottom: '1.5rem',
          overflowX: 'auto',
        }}
      >
        {[
          { id: 'combate', label: 'Combate & Ataques', icon: Sword },
          { id: 'pericias', label: 'Perícias (29)', icon: Award },
          { id: 'poderes', label: `Poderes (${character.powers.length})`, icon: Sparkles },
          ...(character.spells.length > 0 ? [{ id: 'magias', label: `Grimório (${character.spells.length})`, icon: Zap }] : []),
          { id: 'inventario', label: `Inventário (${character.inventory.length})`, icon: Package },
          { id: 'bio', label: 'Biografia & Notas', icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', gap: '0.4rem', whiteSpace: 'nowrap' }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* CONTEÚDO DAS ABAS */}

      {/* 1. ABA DE COMBATE & ATAQUES */}
      {activeTab === 'combate' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--t20-gold-light)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sword size={18} />
              Armas & Ataques Equipados
            </h3>

            {equippedWeapons.length === 0 ? (
              <div className="t20-card" style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-dim)' }}>
                Nenhuma arma equipada no momento. Vá até a aba <strong>Inventário</strong> e equipe uma arma!
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
                {equippedWeapons.map((wp) => {
                  // Ataque: Luta (se corpo a corpo) ou Pontaria (se distância)
                  const isRanged = wp.subcategory === 'distancia';
                  const skillKey = isRanged ? 'pontaria' : 'luta';
                  const skillData = character.skills[skillKey];
                  const attackBonus = skillData ? skillData.total : 0;

                  return (
                    <div
                      key={wp.id}
                      className="t20-card t20-card-gold"
                      style={{ padding: '1.1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.75rem' }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h4 style={{ fontSize: '1.15rem', color: '#ffffff', margin: 0 }}>{wp.name}</h4>
                          <span className="badge badge-gold">{wp.subcategory || 'Corpo a corpo'}</span>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '0.35rem' }}>
                          {wp.description}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '1rem', background: 'rgba(0,0,0,0.3)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)' }}>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Ataque Total:</div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--t20-gold-light)', fontSize: '1.1rem' }}>
                            {attackBonus >= 0 ? `+${attackBonus}` : attackBonus}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Dano:</div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#f87171', fontSize: '1.1rem' }}>
                            {wp.damage || '1d6'}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Crítico:</div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#fbbf24', fontSize: '1.1rem' }}>
                            {wp.critical || 'x2'}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => handleRollAttack(wp.name, attackBonus)}
                          className="btn btn-primary"
                          style={{ flex: 1, padding: '0.45rem', fontSize: '0.85rem', gap: '0.35rem' }}
                        >
                          <Dices size={14} />
                          Rolar Ataque
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRollDamage(wp.name, wp.damage)}
                          className="btn btn-secondary"
                          style={{ flex: 1, padding: '0.45rem', fontSize: '0.85rem', gap: '0.35rem' }}
                        >
                          Rolar Dano
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. ABA DE PERÍCIAS (29 perícias com tabela, busca e rolagem com somatória) */}
      {activeTab === 'pericias' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                type="button"
                onClick={() => setSkillFilter('treinadas')}
                className={`btn ${skillFilter === 'treinadas' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
              >
                Apenas Treinadas
              </button>
              <button
                type="button"
                onClick={() => setSkillFilter('todas')}
                className={`btn ${skillFilter === 'todas' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
              >
                Todas as Perícias (29)
              </button>
            </div>

            <div style={{ maxWidth: '240px', width: '100%' }}>
              <input
                type="text"
                placeholder="Buscar perícia..."
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                style={{ padding: '0.35rem 0.65rem', fontSize: '0.85rem' }}
              />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '0.65rem',
            }}
          >
            {filteredSkills.map((sk) => {
              const skDef = SKILLS_LIST.find((s) => s.id === sk.id);
              return (
                <div
                  key={sk.id}
                  className="t20-card"
                  style={{
                    padding: '0.65rem 0.85rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: sk.isTrained ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0,0,0,0.15)',
                    borderColor: sk.isTrained ? 'var(--border-gold)' : 'var(--border-color)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() =>
                        setModalDetail({
                          title: sk.name,
                          category: `Perícia (${sk.attribute.toUpperCase()})`,
                          subtitle: sk.isTrained ? 'Personagem Treinado (+2 de bônus base)' : 'Destreinado',
                          description: skDef?.description || 'Perícia padrão de Tormenta 20.',
                        })
                      }
                      className="btn btn-ghost"
                      style={{ padding: '0.2rem', color: 'var(--text-dim)' }}
                      title="Ver regras da perícia"
                    >
                      <Info size={14} />
                    </button>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.925rem', color: sk.isTrained ? '#ffffff' : 'var(--text-muted)' }}>
                          {sk.name}
                        </span>
                        <span className="badge badge-slate" style={{ fontSize: '0.6rem', padding: '0.1rem 0.3rem' }}>
                          {sk.attribute.toUpperCase()}
                        </span>
                      </div>
                      {sk.isTrained && (
                        <span style={{ fontSize: '0.65rem', color: 'var(--t20-gold)' }}>
                          ★ Treinada
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <StatBreakdownBadge label={sk.name} breakdown={sk.breakdown} variant={sk.isTrained ? 'gold' : 'default'} size="sm" showLabel={false} />
                    <button
                      type="button"
                      onClick={() => handleRollSkill(sk.name, sk.total, sk.breakdown.formula)}
                      className="btn btn-secondary"
                      style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem', gap: '0.25rem' }}
                      title="Rolar teste com d20"
                    >
                      <Dices size={13} />
                      Rolar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. ABA DE PODERES & HABILIDADES */}
      {activeTab === 'poderes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '0.85rem',
            }}
          >
            {character.powers.map((pow) => (
              <div
                key={pow.id}
                className="t20-card"
                style={{
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: '1rem', color: 'var(--t20-gold-light)' }}>{cleanT20Text(pow.name)}</strong>
                      <PowerCategoryBadge category={pow.type || pow.source} />
                      {pow.cost && (
                        <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>
                          {pow.cost}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setModalDetail({
                          title: cleanT20Text(pow.name),
                          category: `Habilidade / Poder (${pow.source.toUpperCase()})`,
                          cost: pow.cost,
                          description: cleanT20Text(pow.description),
                        })
                      }
                      className="btn btn-ghost"
                      style={{ padding: '0.2rem', color: 'var(--text-dim)' }}
                      title="Ver descrição completa"
                    >
                      <Info size={14} />
                    </button>
                  </div>
                  <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                    {cleanT20Text(pow.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. ABA DE GRIMÓRIO & MAGIAS */}
      {activeTab === 'magias' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1rem',
            }}
          >
            {character.spells.map((sp) => {
              const baseCost = BASE_SPELL_COST_BY_CIRCLE[sp.circle || 1] || 1;
              return (
                <div
                  key={sp.id || Math.random().toString()}
                  className="t20-card t20-card-gold"
                  style={{
                    padding: '1.1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <strong style={{ fontSize: '1.1rem', color: '#ffffff' }}>{cleanT20Text(sp.name) || 'Magia'}</strong>
                      <span className="badge badge-blue">{baseCost} PM</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', margin: '0.45rem 0' }}>
                      <CircleBadge circle={sp.circle || 1} />
                      <SchoolBadge school={sp.school} />
                      <SpellTypeBadge type={sp.type} />
                      {sp.execution && <ExecutionBadge execution={sp.execution} />}
                      {sp.range && <RangeBadge range={sp.range} />}
                    </div>
                    <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                      {cleanT20Text(sp.description) || 'Nenhuma descrição disponível.'}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() =>
                        setModalDetail({
                          title: cleanT20Text(sp.name),
                          category: `Magia ${sp.type} (${sp.circle || 1}º Círculo)`,
                          subtitle: `${sp.school} • ${sp.execution}`,
                          cost: `${baseCost} PM`,
                          range: sp.range,
                          duration: sp.duration,
                          resistance: sp.resistance,
                          targetArea: sp.targetArea,
                          description: cleanT20Text(sp.description),
                          upgrades: sp.upgrades,
                        })
                      }
                      className="btn btn-ghost"
                      style={{ padding: '0.2rem 0.4rem', fontSize: '0.75rem', gap: '0.25rem' }}
                    >
                      <Info size={14} /> Detalhes
                    </button>

                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => handleCastStandardSpell(sp)}
                        className="btn btn-primary"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', gap: '0.35rem', fontWeight: 700 }}
                        title={`Lançar no estado padrão gastando ${baseCost} PM`}
                      >
                        <Zap size={14} />
                        Lançar Magia ({baseCost} PM)
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedCastSpell(sp)}
                        className="btn btn-gold"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', gap: '0.35rem', fontWeight: 700 }}
                        title="Abrir opções de aprimoramentos, limite de PM e cálculo de CD"
                      >
                        <Sparkles size={14} />
                        Aprimorar...
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. ABA DE INVENTÁRIO & EQUIPAMENTO */}
      {activeTab === 'inventario' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Riqueza Total:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--t20-gold-light)', fontFamily: 'var(--font-mono)' }}>
                    T$ {character.tibares ?? 0}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMoneyAmount(10);
                      setMoneyReason('');
                      setMoneyOperation('add');
                      setIsMoneyModalOpen(true);
                    }}
                    className="btn btn-secondary"
                    style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem', gap: '0.3rem', color: 'var(--t20-gold)' }}
                    title="Editar dinheiro (ganhos, gastos ou ajuste com auditoria)"
                  >
                    <Coins size={13} />
                    Editar
                  </button>
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Carga de Espaços:</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                  {character.stats.currentSpaces} / {character.stats.maxSpaces.value} espaços
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsAddItemModalOpen(true)}
              className="btn btn-gold"
              style={{ padding: '0.45rem 1rem', fontSize: '0.85rem', gap: '0.35rem', fontWeight: 700 }}
            >
              <Plus size={16} />
              Adicionar Equipamento
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {character.inventory.map((item) => {
              const isModifiable =
                item.category.startsWith('arma') ||
                item.category.startsWith('armadura') ||
                item.category === 'escudo' ||
                item.category === 'esoterico';

              return (
                <div
                  key={item.id}
                  className="t20-card"
                  style={{
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: item.isEquipped ? 'rgba(245, 158, 11, 0.08)' : 'rgba(255,255,255,0.02)',
                    borderColor: item.isEquipped ? 'var(--border-gold)' : 'var(--border-color)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: '0.95rem', color: item.isEquipped ? 'var(--t20-gold-light)' : '#ffffff' }}>
                        {item.name}
                      </strong>
                      {item.isEquipped && (
                        <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
                          Equipado
                        </span>
                      )}
                      <span className="badge badge-slate" style={{ fontSize: '0.65rem' }}>
                        {item.spaces} esp.
                      </span>
                      {item.quantity > 1 && (
                        <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>
                          x{item.quantity}
                        </span>
                      )}
                      {item.specialMaterial && (
                        <span
                          className="badge"
                          style={{
                            background: 'rgba(230, 57, 70, 0.15)',
                            border: '1px solid #e63946',
                            color: '#ff6b7b',
                            fontSize: '0.65rem',
                          }}
                        >
                          {item.specialMaterial}
                        </span>
                      )}
                      {item.appliedModifiers && item.appliedModifiers.length > 0 && (
                        <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>
                          {item.appliedModifiers.join(', ')}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                        {item.description}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() =>
                        setModalDetail(
                          getEquipmentDetailModalData(
                            item as unknown as EquipmentItem,
                            undefined,
                            item.appliedModifiers,
                            item.specialMaterial
                          )
                        )
                      }
                      className="btn btn-ghost"
                      style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem', gap: '0.25rem', color: 'var(--text-muted)' }}
                      title="Ver Detalhes Canônicos do Item"
                    >
                      <Info size={13} />
                      Detalhes
                    </button>

                    {isModifiable && (
                      <button
                        type="button"
                        onClick={() => setCustomizingInventoryItem(item)}
                        className="btn btn-secondary"
                        style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem', gap: '0.25rem', color: 'var(--t20-gold)' }}
                        title="Modificar na Oficina / Forja (melhorias, materiais especiais e encantos)"
                      >
                        <Wrench size={13} />
                        Oficina
                      </button>
                    )}

                    {(item.category.startsWith('arma') || item.category.startsWith('armadura') || item.category === 'escudo') && (
                      <button
                        type="button"
                        onClick={() => handleToggleEquip(item.id)}
                        className={`btn ${item.isEquipped ? 'btn-gold' : 'btn-secondary'}`}
                        style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem' }}
                      >
                        {item.isEquipped ? 'Desequipar' : 'Equipar'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. ABA DE BIOGRAFIA & NOTAS */}
      {activeTab === 'bio' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
            <div className="t20-card">
              <h3 style={{ fontSize: '1.15rem', color: 'var(--t20-gold-light)', marginBottom: '0.5rem' }}>
                Histórico & Personalidade
              </h3>
              <p style={{ color: '#e2e8f0', whiteSpace: 'pre-line', lineHeight: 1.6, margin: 0 }}>
                {character.bio.history || 'Nenhum histórico anotado ainda.'}
              </p>
            </div>

            <div className="t20-card">
              <h3 style={{ fontSize: '1.15rem', color: 'var(--t20-gold-light)', marginBottom: '0.5rem' }}>
                Aparência Física & Detalhes
              </h3>
              <p style={{ color: '#e2e8f0', whiteSpace: 'pre-line', lineHeight: 1.6, margin: 0 }}>
                {character.bio.appearance || 'Nenhuma aparência física descrita ainda.'}
              </p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span>Idade: <strong>{character.bio.age || '—'}</strong></span>
                <span>Gênero: <strong>{character.bio.gender || '—'}</strong></span>
              </div>
            </div>
          </div>

          {/* Caderno de Anotações Rico com Imagens e Câmera */}
          <NotebookSection
            notes={character.notes || []}
            onUpdateNotes={(updatedNotes) => {
              onUpdateCharacter({
                ...character,
                notes: updatedNotes,
              });
            }}
          />
        </div>
      )}

      {/* Modal de Detalhes Canônicos */}
      <DetailModal data={modalDetail} onClose={() => setModalDetail(null)} />

      {/* Modal de Lançamento de Magias com Cálculos Canônicos, Limite de PM e Aprimoramentos */}
      {selectedCastSpell && (
        <SpellCastModal
          spell={selectedCastSpell}
          character={character}
          isOpen={Boolean(selectedCastSpell)}
          onClose={() => setSelectedCastSpell(null)}
          onCastSpell={handleCastSpellFromModal}
        />
      )}

      {/* Modal de Subida de Nível e Multiclasse */}
      <LevelUpModal
        character={character}
        isOpen={isLevelUpModalOpen}
        onClose={() => setIsLevelUpModalOpen(false)}
        onSaveLevelUp={(updated) => onUpdateCharacter(updated)}
      />

      {/* Modal de Adição / Compra de Equipamento */}
      <AddItemModal
        character={character}
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        onSaveCharacter={(updated) => onUpdateCharacter(updated)}
      />

      {/* Modal da Oficina / Forja para Modificar Equipamento do Inventário */}
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

      {/* Modal de Gerenciamento e Edição de Dinheiro (Tibares T$) com Auditoria */}
      {isMoneyModalOpen && (
        <div className="modal-overlay" onClick={() => setIsMoneyModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '480px',
              width: '95%',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-gold)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(245, 158, 11, 0.15)',
              padding: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--t20-gold)' }}>
                  <Coins size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff', fontFamily: 'var(--font-fantasy)' }}>
                    Gerenciar Tibares (T$)
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Saldo Atual: <strong style={{ color: 'var(--t20-gold-light)', fontFamily: 'var(--font-mono)' }}>T$ {character.tibares ?? 0}</strong>
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMoneyModalOpen(false)}
                className="btn btn-ghost"
                style={{ padding: '0.35rem', borderRadius: '50%', color: 'var(--text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Seleção do Tipo de Operação */}
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.35rem', display: 'block' }}>
                  Tipo de Operação
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setMoneyOperation('add')}
                    className="btn"
                    style={{
                      fontSize: '0.8rem',
                      padding: '0.5rem',
                      background: moneyOperation === 'add' ? 'rgba(52, 211, 153, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                      border: moneyOperation === 'add' ? '1px solid #34d399' : '1px solid var(--border-color)',
                      color: moneyOperation === 'add' ? '#34d399' : 'var(--text-muted)',
                      fontWeight: moneyOperation === 'add' ? 700 : 500,
                    }}
                  >
                    + Receber
                  </button>
                  <button
                    type="button"
                    onClick={() => setMoneyOperation('remove')}
                    className="btn"
                    style={{
                      fontSize: '0.8rem',
                      padding: '0.5rem',
                      background: moneyOperation === 'remove' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                      border: moneyOperation === 'remove' ? '1px solid #ef4444' : '1px solid var(--border-color)',
                      color: moneyOperation === 'remove' ? '#ef4444' : 'var(--text-muted)',
                      fontWeight: moneyOperation === 'remove' ? 700 : 500,
                    }}
                  >
                    - Gastar
                  </button>
                  <button
                    type="button"
                    onClick={() => setMoneyOperation('set')}
                    className="btn"
                    style={{
                      fontSize: '0.8rem',
                      padding: '0.5rem',
                      background: moneyOperation === 'set' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                      border: moneyOperation === 'set' ? '1px solid var(--t20-gold)' : '1px solid var(--border-color)',
                      color: moneyOperation === 'set' ? 'var(--t20-gold-light)' : 'var(--text-muted)',
                      fontWeight: moneyOperation === 'set' ? 700 : 500,
                    }}
                  >
                    = Definir
                  </button>
                </div>
              </div>

              {/* Valor / Quantidade */}
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.35rem', display: 'block' }}>
                  {moneyOperation === 'set' ? 'Novo Saldo Total (T$)' : 'Quantidade de Tibares (T$)'}
                </label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={moneyAmount}
                  onChange={(e) => setMoneyAmount(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  className="input-field"
                  style={{ width: '100%', fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
                />

                {/* Botões de Incremento Rápido */}
                <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem' }}>
                  {[1, 5, 10, 50, 100].map((inc) => (
                    <button
                      key={inc}
                      type="button"
                      onClick={() => setMoneyAmount((prev) => prev + inc)}
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '0.25rem', fontSize: '0.75rem' }}
                    >
                      +{inc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Justificativa / Motivo da Transação */}
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.35rem', display: 'block' }}>
                  Motivo / Justificativa (Auditável no Histórico)
                </label>
                <input
                  type="text"
                  value={moneyReason}
                  onChange={(e) => setMoneyReason(e.target.value)}
                  placeholder="Ex: Recompensa de missão, compra de suprimentos, forja..."
                  className="input-field"
                  style={{ width: '100%', fontSize: '0.85rem' }}
                />
              </div>

              {/* Pré-visualização do Novo Saldo */}
              <div
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Novo Saldo Estimado:</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--t20-gold-light)', fontFamily: 'var(--font-mono)' }}>
                  T${' '}
                  {moneyOperation === 'add'
                    ? (character.tibares ?? 0) + moneyAmount
                    : moneyOperation === 'remove'
                      ? Math.max(0, (character.tibares ?? 0) - moneyAmount)
                      : moneyAmount}
                </span>
              </div>

              {/* Botões de Ação */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setIsMoneyModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveMoney}
                  className="btn btn-gold"
                  style={{ flex: 1.5, gap: '0.4rem', fontWeight: 700 }}
                >
                  <Check size={16} />
                  Confirmar Transação
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Gerenciamento de PV Temporários com Auditoria */}
      {isTempHpModalOpen && (
        <div className="modal-overlay" onClick={() => setIsTempHpModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '480px',
              width: '95%',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(56, 189, 248, 0.15)',
              padding: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff', fontFamily: 'var(--font-fantasy)' }}>
                    Pontos de Vida Temporários
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Atual: <strong style={{ color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>+{character.stats.tempHp || 0} PV Temp</strong>
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsTempHpModalOpen(false)}
                className="btn btn-ghost"
                style={{ padding: '0.35rem', borderRadius: '50%', color: 'var(--text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: 'var(--radius-md)', padding: '0.75rem', fontSize: '0.8rem', color: '#e0f2fe', lineHeight: 1.5 }}>
                <strong>Regra Canônica T20 JDA (Apêndice: Condições, pág. 394):</strong>
                <br />
                PV temporários absorvem dano antes do seu PV normal. Não são recuperados por cura comum e não se acumulam de uma mesma fonte (aplica-se o maior).
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.35rem', display: 'block' }}>
                  Quantidade de PV Temporários
                </label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={tempHpAmount}
                  onChange={(e) => setTempHpAmount(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  className="input-field"
                  style={{ width: '100%', fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
                />

                <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem' }}>
                  {[5, 10, 15, 20].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setTempHpAmount(val)}
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '0.25rem', fontSize: '0.75rem' }}
                    >
                      {val} PV
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.35rem', display: 'block' }}>
                  Origem / Magia / Efeito (Auditável no Histórico)
                </label>
                <input
                  type="text"
                  value={tempHpReason}
                  onChange={(e) => setTempHpReason(e.target.value)}
                  placeholder="Ex: Magia Vitalidade das Fadas, Pele de Pedra, Poção..."
                  className="input-field"
                  style={{ width: '100%', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                {(character.stats.tempHp || 0) > 0 && (
                  <button
                    type="button"
                    onClick={() => handleApplyTempHp(0, 'set', 'PV Temporários zerados/expirados.')}
                    className="btn btn-secondary"
                    style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.4)' }}
                  >
                    Zerar PV
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsTempHpModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyTempHp(tempHpAmount, 'set', tempHpReason.trim() || undefined)}
                  className="btn btn-primary"
                  style={{ flex: 1.5, gap: '0.4rem', fontWeight: 700, background: '#0284c7', borderColor: '#38bdf8' }}
                >
                  <Check size={16} />
                  Definir ({tempHpAmount})
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyTempHp(tempHpAmount, 'add', tempHpReason.trim() || undefined)}
                  className="btn btn-primary"
                  style={{ flex: 1.5, gap: '0.4rem', fontWeight: 700 }}
                >
                  <Plus size={16} />
                  Somar (+{tempHpAmount})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
