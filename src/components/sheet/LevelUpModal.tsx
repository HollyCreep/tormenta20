import React, { useState, useMemo } from 'react';
import { CharacterSheet, CharacterPower, CharacterSpell } from '../../types/character';
import { CLASSES_LIST } from '../../data/classes';
import { CLASS_POWERS_LIST } from '../../data/classPowers';
import { GENERAL_POWERS_LIST } from '../../data/generalPowers';
import { SPELLS_LIST } from '../../data/spells';
import {
  recalculateFullCharacterSheet,
  calculateSpellCircleUnlocked,
} from '../../utils/rulesEngine';
import { checkPowerPrerequisites } from '../../utils/rulesValidation';
import {
  cleanT20Text,
  getClassPowerCitation,
  getGeneralPowerCitation,
  getSpellCitation,
} from '../../utils/textUtils';
import {
  SchoolBadge,
  SpellTypeBadge,
  CircleBadge,
  PowerCategoryBadge,
  ExecutionBadge,
  RangeBadge,
} from '../common/T20Badge';
import { DetailModal, DetailModalData } from '../common/DetailModal';
import { extractSpellDamage } from '../../utils/spellUtils';
import {
  TrendingUp,
  Heart,
  Zap,
  Sparkles,
  Shield,
  Award,
  BookOpen,
  X,
  Check,
  ChevronRight,
  HelpCircle,
  AlertCircle,
  Eye,
  Flame,
} from 'lucide-react';

interface LevelUpModalProps {
  character: CharacterSheet;
  isOpen: boolean;
  onClose: () => void;
  onSaveLevelUp: (updatedCharacter: CharacterSheet) => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  character,
  isOpen,
  onClose,
  onSaveLevelUp,
}) => {
  const currentTotalLevel = character.level;
  const nextTotalLevel = currentTotalLevel + 1;

  // Multi-classes existentes ou classe inicial
  const existingClasses = useMemo(() => {
    return (
      character.classes || [
        {
          classId: character.classId,
          className: CLASSES_LIST.find((c) => c.id === character.classId)?.name || character.classId,
          level: character.level,
          subclass: character.classSubclass,
        },
      ]
    );
  }, [character.classes, character.classId, character.level, character.classSubclass]);

  // Estado da evolução
  const [selectedClassId, setSelectedClassId] = useState<string>(character.classId);
  const [isMulticlass, setIsMulticlass] = useState<boolean>(false);
  const [powerTypeTab, setPowerTypeTab] = useState<'classe' | 'geral'>('classe');
  const [powerSearch, setPowerSearch] = useState<string>('');
  const [selectedPower, setSelectedPower] = useState<any | null>(null);

  // Accordion e visualização expandida de poderes e magias
  const [expandedPowerId, setExpandedPowerId] = useState<string | null>(null);
  const [expandedSpellId, setExpandedSpellId] = useState<string | null>(null);
  const [modalDetail, setModalDetail] = useState<DetailModalData | null>(null);

  // Seleção de magias (se conjurador)
  const [selectedSpell, setSelectedSpell] = useState<any | null>(null);
  const [spellSearch, setSpellSearch] = useState<string>('');
  const [spellCircleFilter, setSpellCircleFilter] = useState<number>(0);

  // Definição da classe escolhida para este nível
  const chosenClassDef = useMemo(() => {
    return CLASSES_LIST.find((c) => c.id === selectedClassId) || CLASSES_LIST[0];
  }, [selectedClassId]);

  // Nível na classe selecionada após o level-up
  const currentClassLevel = useMemo(() => {
    const found = existingClasses.find((c) => c.classId === selectedClassId);
    return found ? found.level : 0;
  }, [existingClasses, selectedClassId]);
  const nextClassLevel = currentClassLevel + 1;

  // Ganhos calculados de PV e PM (Cap. 1, pág. 36)
  const conMod = character.totalAttributes.con || 0;
  const hpGain = Math.max(1, (chosenClassDef.hpPerLevel || 4) + conMod);
  const mpGain = chosenClassDef.mpPerLevel || 3;

  // Mudança em Metade do Nível
  const currentHalfLevel = Math.floor(currentTotalLevel / 2);
  const nextHalfLevel = Math.floor(nextTotalLevel / 2);
  const halfLevelIncreased = nextHalfLevel > currentHalfLevel;

  // Mudança no bônus de treino (+2 nos níveis 1-6, +4 nos 7-14, +6 nos 15+)
  const currentTraining = currentTotalLevel >= 15 ? 6 : currentTotalLevel >= 7 ? 4 : 2;
  const nextTraining = nextTotalLevel >= 15 ? 6 : nextTotalLevel >= 7 ? 4 : 2;
  const trainingIncreased = nextTraining > currentTraining;

  // Verifica se a classe é conjuradora e calcula o círculo acessível
  const isSpellcaster = Boolean(chosenClassDef.spellcaster);
  const currentCircle = calculateSpellCircleUnlocked(currentClassLevel);
  const nextCircle = calculateSpellCircleUnlocked(nextClassLevel);
  const unlockedNewCircle = isSpellcaster && nextCircle > currentCircle;

  // Contexto para validação de pré-requisitos de poderes
  const validationContext = useMemo(() => {
    const trainedIds = Object.values(character.skills)
      .filter((s) => s.isTrained)
      .map((s) => s.id);
    return {
      attributes: character.totalAttributes,
      trainedSkillIds: trainedIds,
      proficiencies: {
        weapons: chosenClassDef.proficiencies.weapons,
        armor: chosenClassDef.proficiencies.armor,
        shields: chosenClassDef.proficiencies.shields,
      },
      isSpellcaster: isSpellcaster || Boolean(character.spells && character.spells.length > 0),
    };
  }, [character, chosenClassDef, isSpellcaster]);

  const currentPowerNames = useMemo(() => {
    return new Set((character.powers || []).map((p) => p.name.toLowerCase()));
  }, [character.powers]);

  // Lista de poderes de classe disponíveis (excluindo poderes já possuídos, exceto repetíveis)
  const availableClassPowers = useMemo(() => {
    return CLASS_POWERS_LIST.filter((p) => {
      if (p.classId !== selectedClassId) return false;
      if (p.name.toLowerCase().includes('aumento de atributo')) return true;
      return !currentPowerNames.has(p.name.toLowerCase());
    });
  }, [selectedClassId, currentPowerNames]);

  // Poderes gerais disponíveis (excluindo poderes já possuídos, exceto repetíveis)
  const availableGeneralPowers = useMemo(() => {
    return GENERAL_POWERS_LIST.filter((p) => {
      if (p.name.toLowerCase().includes('treinamento em perícia') || p.name.toLowerCase().includes('proficiência')) return true;
      return !currentPowerNames.has(p.name.toLowerCase());
    });
  }, [currentPowerNames]);

  // Lista filtrada de poderes
  const filteredPowers = useMemo(() => {
    const list = powerTypeTab === 'classe' ? availableClassPowers : availableGeneralPowers;
    return list.filter((p) => {
      const q = powerSearch.toLowerCase().trim();
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.prerequisites && p.prerequisites.toLowerCase().includes(q))
      );
    });
  }, [powerTypeTab, availableClassPowers, availableGeneralPowers, powerSearch]);

  // Lista de magias disponíveis para conjuradores
  const availableSpells = useMemo(() => {
    if (!isSpellcaster) return [];
    const type = chosenClassDef.spellcaster?.type || 'arcana';
    return SPELLS_LIST.filter((s) => {
      // Magias do tipo da classe ou universal, até o círculo máximo acessível
      const matchesType = s.type === type || s.type === 'universal';
      const withinCircle = s.circle <= nextCircle;
      const circleMatches = spellCircleFilter === 0 || s.circle === spellCircleFilter;
      const matchesQuery = !spellSearch || s.name.toLowerCase().includes(spellSearch.toLowerCase()) || s.description.toLowerCase().includes(spellSearch.toLowerCase());
      // Não mostrar magias que o personagem já conhece
      const alreadyKnown = character.spells.some((cs) => cs.id === s.id);
      return matchesType && withinCircle && circleMatches && matchesQuery && !alreadyKnown;
    });
  }, [isSpellcaster, chosenClassDef, nextCircle, spellCircleFilter, spellSearch, character.spells]);

  // Confirma a evolução do personagem
  const handleConfirmLevelUp = () => {
    // 1. Atualiza classes e níveis
    const existingIndex = existingClasses.findIndex((c) => c.classId === selectedClassId);
    let updatedClasses = [...existingClasses];

    if (existingIndex >= 0) {
      updatedClasses[existingIndex] = {
        ...updatedClasses[existingIndex],
        level: updatedClasses[existingIndex].level + 1,
      };
    } else {
      updatedClasses.push({
        classId: selectedClassId,
        className: chosenClassDef.name,
        level: 1,
      });
    }

    // 2. Adiciona o novo poder
    const updatedPowers: CharacterPower[] = [...(character.powers || [])];
    if (selectedPower) {
      updatedPowers.push({
        id: selectedPower.id || `pow_${Date.now()}`,
        name: selectedPower.name,
        source: powerTypeTab === 'classe' ? 'classe' : 'geral',
        description: selectedPower.description,
        type: selectedPower.category || selectedPower.type,
      });
    }

    // 3. Adiciona a nova magia (se selecionada)
    const updatedSpells: CharacterSpell[] = [...(character.spells || [])];
    if (selectedSpell) {
      updatedSpells.push({
        ...selectedSpell,
        learnedFrom: 'classe',
      });
    }

    // 4. Monta a ficha atualizada e recalcula todas as fórmulas canônicas
    const updatedDraft: CharacterSheet = {
      ...character,
      level: nextTotalLevel,
      classes: updatedClasses,
      powers: updatedPowers,
      spells: updatedSpells,
    };

    const finalSheet = recalculateFullCharacterSheet(updatedDraft);
    onSaveLevelUp(finalSheet);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(5, 7, 15, 0.88)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1100,
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        className="t20-card t20-card-gold"
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '1.75rem',
          background: 'linear-gradient(145deg, rgba(20, 24, 40, 0.98) 0%, rgba(28, 22, 38, 0.98) 100%)',
          border: '1px solid var(--border-gold)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.85), 0 0 35px rgba(217, 119, 6, 0.25)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho de Level-Up */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="badge badge-ruby" style={{ fontSize: '0.75rem', fontWeight: 800 }}>
                SUBIR DE NÍVEL (LEVEL UP)
              </span>
              <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
                Tormenta 20 JDA (Cap. 1, pág. 36)
              </span>
            </div>
            <h2 style={{ fontSize: '1.85rem', color: '#ffffff', margin: '0.4rem 0 0 0', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <TrendingUp size={24} color="var(--t20-gold-light)" />
              {character.name}: Nível {currentTotalLevel} ➔ <span style={{ color: 'var(--t20-gold-light)' }}>Nível {nextTotalLevel}</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost"
            style={{ padding: '0.4rem', color: 'var(--text-dim)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Passo 1: Seleção de Classe e Multiclasse */}
        <div
          style={{
            padding: '1rem',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255,255,255,0.06)',
            marginBottom: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--t20-gold-light)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              1. Escolha da Classe para o Nível {nextTotalLevel}
            </h3>

            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                type="button"
                onClick={() => {
                  setIsMulticlass(false);
                  setSelectedClassId(character.classId);
                }}
                className={`btn ${!isMulticlass ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}
              >
                Classe Atual ({character.classId.toUpperCase()})
              </button>
              <button
                type="button"
                onClick={() => setIsMulticlass(true)}
                className={`btn ${isMulticlass ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}
              >
                Multiclasse
              </button>
            </div>
          </div>

          {isMulticlass && (
            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.3rem' }}>
                Selecione a classe da Multiclasse (Capítulo 1, pág. 37):
              </label>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', fontSize: '0.9rem' }}
              >
                {CLASSES_LIST.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name} ({cls.hpPerLevel} PV/nível, {cls.mpPerLevel} PM/nível)
                  </option>
                ))}
              </select>
            </div>
          )}

          <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
            Você evoluirá como <strong>{chosenClassDef.name}</strong> (Nível {currentClassLevel} ➔ {nextClassLevel}).
          </div>
        </div>

        {/* Resumo de Ganhos Automáticos com Tooltips */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '0.75rem',
            marginBottom: '1.25rem',
          }}
        >
          <div
            className="t20-card"
            style={{
              padding: '0.75rem',
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '0.75rem', color: '#f87171', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.3rem' }}>
              <Heart size={14} /> Pontos de Vida
            </span>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#ffffff', margin: '0.2rem 0' }}>
              +{hpGain} PV
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
              {chosenClassDef.hpPerLevel} classe + {conMod} CON
            </span>
          </div>

          <div
            className="t20-card"
            style={{
              padding: '0.75rem',
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '0.75rem', color: '#60a5fa', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.3rem' }}>
              <Zap size={14} /> Pontos de Mana
            </span>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#ffffff', margin: '0.2rem 0' }}>
              +{mpGain} PM
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
              +{chosenClassDef.mpPerLevel} da classe
            </span>
          </div>

          <div
            className="t20-card"
            style={{
              padding: '0.75rem',
              background: 'rgba(234, 179, 8, 0.08)',
              border: '1px solid rgba(234, 179, 8, 0.3)',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '0.75rem', color: 'var(--t20-gold-light)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.3rem' }}>
              <Award size={14} /> Metade do Nível
            </span>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#ffffff', margin: '0.2rem 0' }}>
              +{nextHalfLevel}
            </div>
            <span style={{ fontSize: '0.7rem', color: halfLevelIncreased ? '#34d399' : 'var(--text-dim)' }}>
              {halfLevelIncreased ? '▲ Aumentou (+1 em testes)' : 'Mantido (nível par)'}
            </span>
          </div>

          <div
            className="t20-card"
            style={{
              padding: '0.75rem',
              background: 'rgba(168, 85, 247, 0.08)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '0.75rem', color: '#c084fc', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.3rem' }}>
              <Sparkles size={14} /> Treino de Perícias
            </span>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#ffffff', margin: '0.2rem 0' }}>
              +{nextTraining}
            </div>
            <span style={{ fontSize: '0.7rem', color: trainingIncreased ? '#34d399' : 'var(--text-dim)' }}>
              {trainingIncreased ? '▲ Aumentou de patamar!' : `Patamar nível ${nextTotalLevel}`}
            </span>
          </div>
        </div>

        {/* Desbloqueio de Novo Círculo de Magia */}
        {unlockedNewCircle && (
          <div
            style={{
              padding: '0.75rem 1rem',
              background: 'rgba(59, 130, 246, 0.15)',
              border: '1px solid #3b82f6',
              borderRadius: 'var(--radius-sm)',
              color: '#93c5fd',
              fontSize: '0.85rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
            }}
          >
            <Sparkles size={20} color="#60a5fa" style={{ flexShrink: 0 }} />
            <div>
              <strong>Novo Círculo de Magia Desbloqueado!</strong> Ao atingir o {nextClassLevel}º nível de {chosenClassDef.name}, você agora pode lançar magias de <strong>{nextCircle}º Círculo</strong> (Capítulo 4, pág. 178)!
            </div>
          </div>
        )}

        {/* Passo 2: Seleção de Novo Poder */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--t20-gold-light)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              2. Escolha do Novo Poder (Nível {nextTotalLevel})
            </h3>

            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                type="button"
                onClick={() => setPowerTypeTab('classe')}
                className={`btn ${powerTypeTab === 'classe' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem' }}
              >
                Poderes de {chosenClassDef.name}
              </button>
              <button
                type="button"
                onClick={() => setPowerTypeTab('geral')}
                className={`btn ${powerTypeTab === 'geral' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem' }}
              >
                Poderes Gerais
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '0.6rem' }}>
            <input
              type="text"
              placeholder="Buscar poder por nome ou efeito..."
              value={powerSearch}
              onChange={(e) => setPowerSearch(e.target.value)}
              style={{ width: '100%', padding: '0.4rem 0.65rem', fontSize: '0.85rem' }}
            />
          </div>

          <div
            style={{
              maxHeight: '280px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.5rem',
              background: 'rgba(0,0,0,0.25)',
            }}
          >
            {filteredPowers.length === 0 ? (
              <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                Nenhum poder encontrado com os filtros atuais.
              </div>
            ) : (
              filteredPowers.slice(0, 60).map((pow) => {
                const isSelected = selectedPower?.name === pow.name;
                const isExpanded = expandedPowerId === pow.id;
                const prereqResult = checkPowerPrerequisites(pow.name, validationContext);
                const powerCategory = 'category' in pow ? (pow as any).category : 'classe';
                const citation =
                  powerTypeTab === 'classe'
                    ? getClassPowerCitation(chosenClassDef.id, chosenClassDef.name, pow.name)
                    : getGeneralPowerCitation(powerCategory || 'geral', pow.name);

                return (
                  <div
                    key={pow.id || pow.name}
                    style={{
                      background: isSelected ? 'rgba(217, 119, 6, 0.12)' : 'rgba(255,255,255,0.02)',
                      border: isSelected ? '1px solid var(--border-gold)' : '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 'var(--radius-sm)',
                      transition: 'all 0.2s ease',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    {/* Linha Principal com Seleção */}
                    <div
                      onClick={() => setSelectedPower(isSelected ? null : pow)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1 }}>
                        <div
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            border: isSelected ? '2px solid var(--t20-gold)' : '2px solid rgba(255,255,255,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: isSelected ? 'var(--t20-gold)' : 'transparent',
                            flexShrink: 0,
                          }}
                        >
                          {isSelected && <Check size={12} color="#0f172a" strokeWidth={3} />}
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <strong style={{ fontSize: '0.92rem', color: isSelected ? 'var(--t20-gold-light)' : '#ffffff' }}>
                              {cleanT20Text(pow.name)}
                            </strong>
                            <PowerCategoryBadge category={powerCategory} />
                            {!prereqResult.isMet && (
                              <span className="badge badge-ruby" style={{ fontSize: '0.65rem' }}>
                                Requisitos Pendentes
                              </span>
                            )}
                          </div>
                          {!isExpanded && (
                            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: 'var(--text-dim)', lineHeight: 1.35 }}>
                              {cleanT20Text(pow.description)?.substring(0, 110)}...
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Botão de Expandir Accordion / Ver Detalhes */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedPowerId(isExpanded ? null : pow.id);
                        }}
                        className="btn btn-ghost"
                        style={{
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.75rem',
                          gap: '0.25rem',
                          color: isExpanded ? 'var(--t20-gold-light)' : 'var(--text-muted)',
                          flexShrink: 0,
                        }}
                        title={isExpanded ? 'Recolher detalhes' : 'Expandir efeito completo e citação'}
                      >
                        <BookOpen size={13} />
                        <span>{isExpanded ? 'Menos' : 'Efeito & Regras'}</span>
                        <ChevronRight
                          size={14}
                          style={{
                            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease',
                          }}
                        />
                      </button>
                    </div>

                    {/* Accordion Expandido */}
                    {isExpanded && (
                      <div
                        style={{
                          padding: '0.75rem 1rem',
                          background: 'rgba(0, 0, 0, 0.35)',
                          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.6rem',
                          fontSize: '0.825rem',
                        }}
                      >
                        <div style={{ color: '#e2e8f0', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
                          {cleanT20Text(pow.description)}
                        </div>

                        {pow.prerequisites && (
                          <div
                            style={{
                              padding: '0.4rem 0.65rem',
                              background: prereqResult.isMet ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                              border: `1px solid ${prereqResult.isMet ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                              borderRadius: 'var(--radius-sm)',
                              fontSize: '0.75rem',
                              color: prereqResult.isMet ? '#a7f3d0' : '#fca5a5',
                            }}
                          >
                            <strong>Pré-requisito:</strong> {cleanT20Text(pow.prerequisites)}
                            {!prereqResult.isMet && prereqResult.unmetRequirements && prereqResult.unmetRequirements.length > 0 && (
                              <div style={{ marginTop: '0.2rem', color: '#f87171' }}>
                                ⚠️ Requer: {prereqResult.unmetRequirements.join(', ')}
                              </div>
                            )}
                          </div>
                        )}

                        <div
                          style={{
                            padding: '0.45rem 0.75rem',
                            background: 'rgba(245, 158, 11, 0.08)',
                            borderLeft: '3px solid var(--t20-gold)',
                            borderRadius: '0 4px 4px 0',
                            fontSize: '0.725rem',
                            color: 'var(--t20-gold-light)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '0.5rem',
                            flexWrap: 'wrap',
                          }}
                        >
                          <span>📜 <em>{citation}</em></span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalDetail({
                                title: cleanT20Text(pow.name),
                                category: powerTypeTab === 'classe' ? `Poder de ${chosenClassDef.name}` : `Poder Geral (${powerCategory})`,
                                subtitle: citation,
                                description: cleanT20Text(pow.description),
                                cost: pow.prerequisites ? `Pré-requisito: ${cleanT20Text(pow.prerequisites)}` : 'Sem pré-requisito',
                              });
                            }}
                            className="btn btn-ghost"
                            style={{ padding: '0.15rem 0.4rem', fontSize: '0.7rem' }}
                          >
                            Ver em Janela
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Passo 3: Escolha de Nova Magia (se conjurador) */}
        {isSpellcaster && (
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h3 style={{ fontSize: '1rem', color: 'var(--t20-mana-light)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                3. Grimório: Aprender Nova Magia (Até {nextCircle}º Círculo)
              </h3>

              <div style={{ display: 'flex', gap: '0.3rem' }}>
                {[0, 1, 2, 3, 4, 5].filter((c) => c <= nextCircle).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSpellCircleFilter(c)}
                    className={`btn ${spellCircleFilter === c ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
                  >
                    {c === 0 ? 'Todos' : `${c}º`}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '0.6rem' }}>
              <input
                type="text"
                placeholder="Buscar magia por nome ou escola..."
                value={spellSearch}
                onChange={(e) => setSpellSearch(e.target.value)}
                style={{ width: '100%', padding: '0.4rem 0.65rem', fontSize: '0.85rem' }}
              />
            </div>

            <div
              style={{
                maxHeight: '280px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.5rem',
                background: 'rgba(0,0,0,0.25)',
              }}
            >
              {availableSpells.length === 0 ? (
                <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                  Nenhuma magia encontrada para os filtros selecionados.
                </div>
              ) : (
                availableSpells.slice(0, 50).map((sp) => {
                  const isSelected = selectedSpell?.id === sp.id;
                  const isExpanded = expandedSpellId === sp.id;
                  const baseCost = [0, 1, 3, 6, 10, 15][sp.circle] || 1;
                  const citation = getSpellCitation(cleanT20Text(sp.name), sp.circle);
                  const damageInfo = extractSpellDamage(sp.description);

                  return (
                    <div
                      key={sp.id}
                      style={{
                        background: isSelected ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255,255,255,0.02)',
                        border: isSelected ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.06)',
                        borderRadius: 'var(--radius-sm)',
                        transition: 'all 0.2s ease',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                    >
                      {/* Linha Principal de Seleção */}
                      <div
                        onClick={() => setSelectedSpell(isSelected ? null : sp)}
                        style={{
                          padding: '0.65rem 0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1 }}>
                          <div
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              border: isSelected ? '2px solid #60a5fa' : '2px solid rgba(255,255,255,0.3)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: isSelected ? '#60a5fa' : 'transparent',
                              flexShrink: 0,
                            }}
                          >
                            {isSelected && <Check size={12} color="#0f172a" strokeWidth={3} />}
                          </div>

                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                              <strong style={{ fontSize: '0.92rem', color: isSelected ? '#93c5fd' : '#ffffff' }}>
                                {cleanT20Text(sp.name)}
                              </strong>
                              <CircleBadge circle={sp.circle} />
                              <SchoolBadge school={sp.school} />
                              <SpellTypeBadge type={sp.type} />
                              <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>{baseCost} PM</span>
                              {damageInfo && (
                                <span
                                  className="badge badge-ruby"
                                  style={{
                                    fontSize: '0.72rem',
                                    fontWeight: 800,
                                    fontFamily: 'var(--font-mono)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.3rem',
                                    background: 'rgba(239, 68, 68, 0.22)',
                                    border: '1px solid #ef4444',
                                    color: '#fca5a5',
                                    boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)',
                                  }}
                                  title={`Dano da magia: ${damageInfo.badgeText}`}
                                >
                                  <Flame size={12} style={{ color: '#f87171' }} />
                                  <span>{damageInfo.dice} {damageInfo.type ? `(${damageInfo.type})` : ''}</span>
                                </span>
                              )}
                            </div>
                            {!isExpanded && (
                              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: 'var(--text-dim)', lineHeight: 1.35 }}>
                                {cleanT20Text(sp.description)?.substring(0, 110)}...
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Botão de Expandir Accordion */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedSpellId(isExpanded ? null : sp.id);
                          }}
                          className="btn btn-ghost"
                          style={{
                            padding: '0.25rem 0.5rem',
                            fontSize: '0.75rem',
                            gap: '0.25rem',
                            color: isExpanded ? '#93c5fd' : 'var(--text-muted)',
                            flexShrink: 0,
                          }}
                          title={isExpanded ? 'Recolher detalhes' : 'Expandir descrição completa, upgrades e regras'}
                        >
                          <BookOpen size={13} />
                          <span>{isExpanded ? 'Menos' : 'Efeito & Upgrades'}</span>
                          <ChevronRight
                            size={14}
                            style={{
                              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                              transition: 'transform 0.2s ease',
                            }}
                          />
                        </button>
                      </div>

                      {/* Accordion Expandido */}
                      {isExpanded && (
                        <div
                          style={{
                            padding: '0.75rem 1rem',
                            background: 'rgba(0, 0, 0, 0.35)',
                            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.65rem',
                            fontSize: '0.825rem',
                          }}
                        >
                          {/* DESTAQUE DE DANO COM MAIOR ÊNFASE (Anexos 1 e 2) */}
                          {damageInfo && (
                            <div
                              style={{
                                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(153, 27, 27, 0.18) 100%)',
                                border: '1.5px solid rgba(239, 68, 68, 0.6)',
                                borderRadius: 'var(--radius-md)',
                                padding: '0.75rem 1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '0.75rem',
                                boxShadow: '0 4px 18px rgba(239, 68, 68, 0.3)',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div
                                  style={{
                                    width: 38,
                                    height: 38,
                                    borderRadius: '50%',
                                    background: 'rgba(239, 68, 68, 0.35)',
                                    border: '1.5px solid #ef4444',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#ffffff',
                                    flexShrink: 0,
                                    boxShadow: '0 0 12px rgba(239, 68, 68, 0.4)',
                                  }}
                                >
                                  <Flame size={22} />
                                </div>
                                <div>
                                  <span style={{ fontSize: '0.68rem', color: '#fca5a5', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 800, display: 'block' }}>
                                    ⚔️ Dano Base da Magia
                                  </span>
                                  <span style={{ fontSize: '1.45rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#ffffff', letterSpacing: '0.02em', lineHeight: 1.1 }}>
                                    {damageInfo.dice}
                                  </span>
                                </div>
                              </div>

                              {damageInfo.type && (
                                <div style={{ textAlign: 'right' }}>
                                  <span style={{ fontSize: '0.68rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.2rem' }}>
                                    Tipo de Dano
                                  </span>
                                  <span
                                    className="badge badge-ruby"
                                    style={{
                                      fontSize: '0.8rem',
                                      fontWeight: 800,
                                      textTransform: 'uppercase',
                                      padding: '0.25rem 0.65rem',
                                      border: '1px solid #ef4444',
                                      background: 'rgba(239, 68, 68, 0.3)',
                                      color: '#ffffff',
                                    }}
                                  >
                                    {damageInfo.type}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}

                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            <ExecutionBadge execution={sp.execution} />
                            <RangeBadge range={sp.range} />
                            {sp.duration && <span className="badge badge-slate" style={{ fontSize: '0.65rem' }}>Duração: {cleanT20Text(sp.duration)}</span>}
                            {sp.targetArea && <span className="badge badge-slate" style={{ fontSize: '0.65rem' }}>Alvo/Área: {cleanT20Text(sp.targetArea)}</span>}
                            {sp.resistance && <span className="badge badge-slate" style={{ fontSize: '0.65rem' }}>Resistência: {cleanT20Text(sp.resistance)}</span>}
                          </div>

                          <div style={{ color: '#e2e8f0', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
                            {cleanT20Text(sp.description)}
                          </div>

                          {sp.upgrades && sp.upgrades.length > 0 && (
                            <div style={{ marginTop: '0.25rem' }}>
                              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--t20-gold-light)', marginBottom: '0.35rem' }}>
                                Aprimoramentos Canônicos:
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                {sp.upgrades.map((upg, uIdx) => (
                                  <div
                                    key={uIdx}
                                    style={{
                                      padding: '0.35rem 0.6rem',
                                      background: 'rgba(255,255,255,0.03)',
                                      borderRadius: 'var(--radius-sm)',
                                      fontSize: '0.75rem',
                                      borderLeft: '2px solid #3b82f6',
                                    }}
                                  >
                                    <strong style={{ color: '#93c5fd' }}>{cleanT20Text(upg.cost)}:</strong> {cleanT20Text(upg.description)}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div
                            style={{
                              padding: '0.45rem 0.75rem',
                              background: 'rgba(59, 130, 246, 0.08)',
                              borderLeft: '3px solid #3b82f6',
                              borderRadius: '0 4px 4px 0',
                              fontSize: '0.725rem',
                              color: '#93c5fd',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '0.5rem',
                              flexWrap: 'wrap',
                            }}
                          >
                            <span>📜 <em>{citation}</em></span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setModalDetail({
                                  title: cleanT20Text(sp.name),
                                  category: `Magia ${sp.type} (${sp.circle}º Círculo)`,
                                  subtitle: `${sp.school} • ${sp.execution}`,
                                  description: cleanT20Text(sp.description),
                                  cost: `${baseCost} PM`,
                                  range: sp.range,
                                  duration: sp.duration,
                                  resistance: sp.resistance,
                                  targetArea: sp.targetArea,
                                  upgrades: sp.upgrades,
                                });
                              }}
                              className="btn btn-ghost"
                              style={{ padding: '0.15rem 0.4rem', fontSize: '0.7rem' }}
                            >
                              Ver em Janela
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Rodapé e Confirmação */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1.25rem' }}
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleConfirmLevelUp}
            className="btn btn-gold"
            style={{ padding: '0.5rem 1.5rem', fontWeight: 800, gap: '0.5rem' }}
          >
            <TrendingUp size={18} />
            Confirmar Subida para Nível {nextTotalLevel}
          </button>
        </div>
      </div>

      {/* Modal de Detalhes Canônicos em Pop-up */}
      <DetailModal data={modalDetail} onClose={() => setModalDetail(null)} />
    </div>
  );
};
