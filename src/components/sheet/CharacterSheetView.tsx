import React, { useState } from 'react';
import { CharacterSheet } from '../../types/character';
import { StatBreakdownBadge } from '../common/StatBreakdownBadge';
import { DetailModal, DetailModalData } from '../common/DetailModal';
import { CONDITIONS_LIST } from '../../data/conditions';
import { ATTRIBUTES_LIST } from '../../data/attributes';
import { SKILLS_LIST } from '../../data/skills';
import { RULES_CITATIONS } from '../../data/rulesCitations';
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
} from 'lucide-react';

interface CharacterSheetViewProps {
  character: CharacterSheet;
  onUpdateCharacter: (char: CharacterSheet) => void;
  onEditInWizard: () => void;
  onBackToList: () => void;
  onExportJson: () => void;
  onRollDice: (title: string, diceSides: number, modifier: number) => void;
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
  const [skillSearch, setSkillSearch] = useState('');
  const [skillFilter, setSkillFilter] = useState<'todas' | 'treinadas'>('treinadas');

  // Ajustes de Vida e Mana
  const handleModifyHp = (delta: number) => {
    const newHp = Math.min(character.stats.maxHp.value, Math.max(0, character.stats.currentHp + delta));
    onUpdateCharacter({
      ...character,
      stats: {
        ...character.stats,
        currentHp: newHp,
      },
    });
  };

  const handleModifyMp = (delta: number) => {
    const newMp = Math.min(character.stats.maxMp.value, Math.max(0, character.stats.currentMp + delta));
    onUpdateCharacter({
      ...character,
      stats: {
        ...character.stats,
        currentMp: newMp,
      },
    });
  };

  // Lançar Magia e gastar PM
  const handleCastSpell = (spellName: string, costStr: string = '1 PM') => {
    const cost = parseInt(costStr.replace(/\D/g, ''), 10) || 1;
    if (character.stats.currentMp < cost) {
      alert('Pontos de Mana insuficientes para lançar esta magia!');
      return;
    }
    handleModifyMp(-cost);
    onRollDice(`Lançar Magia: ${spellName} (Gasto: ${cost} PM)`, 20, 0);
  };

  // Alternar Condição Ativa
  const handleToggleCondition = (condId: string) => {
    const isPresent = character.activeConditions.includes(condId);
    const updated = isPresent
      ? character.activeConditions.filter((c) => c !== condId)
      : [...character.activeConditions, condId];
    onUpdateCharacter({
      ...character,
      activeConditions: updated,
    });
  };

  // Rolar Perícia
  const handleRollSkill = (skillName: string, totalMod: number, formula: string) => {
    onRollDice(`Teste de ${skillName} [${formula}]`, 20, totalMod);
  };

  // Rolar Ataque
  const handleRollAttack = (weaponName: string, attackMod: number) => {
    onRollDice(`Ataque com ${weaponName}`, 20, attackMod);
  };

  // Rolar Dano
  const handleRollDamage = (weaponName: string, damageStr: string = '1d8') => {
    const match = damageStr.match(/(\d+)d(\d+)/);
    if (match) {
      const count = parseInt(match[1], 10);
      const sides = parseInt(match[2], 10);
      onRollDice(`Dano de ${weaponName} (${damageStr})`, sides, 0);
    } else {
      onRollDice(`Dano de ${weaponName}`, 8, 0);
    }
  };

  // Armas equipadas
  const equippedWeapons = character.inventory.filter(
    (item) => item.isEquipped && item.category.startsWith('arma')
  );

  // Perícias filtradas
  const filteredSkills = Object.values(character.skills).filter((sk) => {
    const matchesFilter = skillFilter === 'todas' || sk.isTrained;
    const matchesSearch = sk.name.toLowerCase().includes(skillSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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

      {/* Cartão de Cabeçalho do Personagem */}
      <div
        className="t20-card t20-card-gold"
        style={{
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, rgba(20, 23, 38, 0.95) 0%, rgba(30, 25, 45, 0.9) 100%)',
          border: '1px solid var(--border-gold)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '2rem', margin: 0 }}>{character.name}</h1>
              <span className="badge badge-ruby" style={{ fontSize: '0.8rem' }}>
                Nível {character.level}
              </span>
            </div>
            {character.concept && (
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '1rem', color: 'var(--t20-gold-light)', fontStyle: 'italic' }}>
                "{character.concept}"
              </p>
            )}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
              <span>Raça: <strong style={{ color: '#ffffff' }}>{character.raceId.toUpperCase()}</strong></span>
              <span>•</span>
              <span>Classe: <strong style={{ color: '#ffffff' }}>{character.classId.toUpperCase()}</strong></span>
              <span>•</span>
              <span>Origem: <strong style={{ color: '#ffffff' }}>{character.originId.toUpperCase()}</strong></span>
              <span>•</span>
              <span>Divindade: <strong style={{ color: 'var(--t20-gold)' }}>{character.deityId !== 'nenhum' ? character.deityId.toUpperCase() : 'NENHUMA'}</strong></span>
              <span>•</span>
              <span>Jogador: <strong>{character.playerName}</strong></span>
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

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', margin: '0.5rem 0' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: character.stats.currentHp <= 5 ? '#ef4444' : '#ffffff' }}>
                {character.stats.currentHp}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                / {character.stats.maxHp.value} PV
              </span>
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
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--t20-gold-light)' }}>
              {character.stats.currentSpaces} / {character.stats.maxSpaces.value} esp.
            </span>
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
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          Condições:
        </span>
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
                      <strong style={{ fontSize: '1rem', color: 'var(--t20-gold-light)' }}>{pow.name}</strong>
                      <span className="badge badge-slate" style={{ fontSize: '0.65rem' }}>
                        {pow.source}
                      </span>
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
                          title: pow.name,
                          category: `Habilidade / Poder (${pow.source.toUpperCase()})`,
                          cost: pow.cost,
                          description: pow.description,
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
                    {pow.description}
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
            {character.spells.map((sp) => (
              <div
                key={sp.id}
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
                    <strong style={{ fontSize: '1.1rem', color: '#ffffff' }}>{sp.name}</strong>
                    <span className="badge badge-blue">1 PM</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', margin: '0.35rem 0' }}>
                    <span className="badge badge-slate" style={{ fontSize: '0.65rem' }}>{sp.school}</span>
                    <span className="badge badge-slate" style={{ fontSize: '0.65rem' }}>{sp.execution}</span>
                    <span className="badge badge-slate" style={{ fontSize: '0.65rem' }}>{sp.range}</span>
                  </div>
                  <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                    {sp.description}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() =>
                      setModalDetail({
                        title: sp.name,
                        category: `Magia ${sp.type} (1º Círculo)`,
                        subtitle: `${sp.school} • ${sp.execution}`,
                        cost: '1 PM',
                        range: sp.range,
                        duration: sp.duration,
                        resistance: sp.resistance,
                        targetArea: sp.targetArea,
                        description: sp.description,
                        upgrades: sp.upgrades,
                      })
                    }
                    className="btn btn-ghost"
                    style={{ padding: '0.2rem 0.4rem', fontSize: '0.75rem', gap: '0.25rem' }}
                  >
                    <Info size={14} /> Detalhes & Aprimoramentos
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCastSpell(sp.name, '1 PM')}
                    className="btn btn-primary"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', gap: '0.35rem' }}
                  >
                    <Zap size={13} />
                    Lançar (1 PM)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. ABA DE INVENTÁRIO & EQUIPAMENTO */}
      {activeTab === 'inventario' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Riqueza Total:</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--t20-gold-light)', fontFamily: 'var(--font-mono)' }}>
                T$ {character.tibares}
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Carga de Espaços:</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                {character.stats.currentSpaces} / {character.stats.maxSpaces.value} espaços
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {character.inventory.map((item) => (
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
                  </div>
                  {item.description && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                      {item.description}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {(item.category.startsWith('arma') || item.category.startsWith('armadura') || item.category === 'escudo') && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                      {item.isEquipped ? '✓ Em uso' : 'Na mochila'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. ABA DE BIOGRAFIA & NOTAS */}
      {activeTab === 'bio' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="t20-card">
            <h3 style={{ fontSize: '1.15rem', color: 'var(--t20-gold-light)', marginBottom: '0.5rem' }}>
              Histórico & Personalidade
            </h3>
            <p style={{ color: '#e2e8f0', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
              {character.bio.history || 'Nenhum histórico anotado ainda.'}
            </p>
          </div>

          <div className="t20-card">
            <h3 style={{ fontSize: '1.15rem', color: 'var(--t20-gold-light)', marginBottom: '0.5rem' }}>
              Aparência Física & Detalhes
            </h3>
            <p style={{ color: '#e2e8f0', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
              {character.bio.appearance || 'Nenhuma aparência física descrita ainda.'}
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span>Idade: <strong>{character.bio.age || '—'}</strong></span>
              <span>Gênero: <strong>{character.bio.gender || '—'}</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes */}
      <DetailModal data={modalDetail} onClose={() => setModalDetail(null)} />
    </div>
  );
};
