import React, { useState, useMemo } from 'react';
import { CharacterSheet, CharacterSpell } from '../../types/character';
import {
  calculateSpellSaveDc,
  calculateMaxSpellCost,
  getSpellcastingKeyAttribute,
} from '../../utils/rulesEngine';
import { Zap, Shield, AlertTriangle, Sparkles, X, Dices, HelpCircle, ChevronRight } from 'lucide-react';
import { cleanT20Text } from '../../utils/textUtils';
import {
  SchoolBadge,
  SpellTypeBadge,
  CircleBadge,
  ExecutionBadge,
  RangeBadge,
} from '../common/T20Badge';

interface SpellCastModalProps {
  spell: CharacterSpell;
  character: CharacterSheet;
  isOpen: boolean;
  onClose: () => void;
  onCastSpell: (spellName: string, pmCost: number, rollInfo?: { title: string; sides: number; count: number; modifier: number }) => void;
}

export const SpellCastModal: React.FC<SpellCastModalProps> = ({
  spell,
  character,
  isOpen,
  onClose,
  onCastSpell,
}) => {
  // Custo base por círculo (Cap. 4, pág. 178)
  const baseCostByCircle: Record<number, number> = { 1: 1, 2: 3, 3: 6, 4: 10, 5: 15 };
  const baseCost = baseCostByCircle[spell?.circle || 1] || 1;

  // Atributo-chave de conjuração do personagem
  const keyAttrKey = getSpellcastingKeyAttribute(character.classId, character.classSubclass);
  const keyAttrMod = character.totalAttributes[keyAttrKey] || 0;
  const keyAttrName = keyAttrKey.toUpperCase();

  // Poderes especiais de magia
  const powerNames = (character.powers || []).map((p) => p.name);
  const hasUnlimitedMagic = powerNames.includes('Magia Ilimitada');

  // Estado dos aprimoramentos selecionados: index -> quantidade
  const [selectedUpgrades, setSelectedUpgrades] = useState<Record<number, number>>({});
  // Modificador customizado de custo de PM (ex: esotérico com desconto)
  const [customCostModifier, setCustomCostModifier] = useState<number>(0);
  // Bônus customizado na CD
  const [customDcModifier, setCustomDcModifier] = useState<number>(0);
  // Tooltip ativa
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Calcula CD da magia com breakdown canônico (10 + 1/2 nível + atributo-chave)
  const saveDcBreakdown = useMemo(() => {
    return calculateSpellSaveDc(
      character.level,
      keyAttrMod,
      keyAttrName,
      customDcModifier,
      'Modificador Manual'
    );
  }, [character.level, keyAttrMod, keyAttrName, customDcModifier]);

  // Calcula limite máximo de PM por magia (Cap. 4, pág. 178)
  const maxPmBreakdown = useMemo(() => {
    return calculateMaxSpellCost(character.level, hasUnlimitedMagic, keyAttrMod);
  }, [character.level, hasUnlimitedMagic, keyAttrMod]);

  // Extrai custo numérico de um texto de aprimoramento (ex: "+2 PM" -> 2)
  const parseUpgradeCost = (costStr?: string): number => {
    if (!costStr) return 0;
    const match = costStr.match(/\+(\d+)\s*PM/i);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Calcula o custo adicional dos aprimoramentos
  const upgradesCost = useMemo(() => {
    let cost = 0;
    if (spell?.upgrades) {
      spell.upgrades.forEach((upg, idx) => {
        const qty = selectedUpgrades[idx] || 0;
        const perCost = parseUpgradeCost(upg.cost);
        cost += perCost * qty;
      });
    }
    return cost;
  }, [spell?.upgrades, selectedUpgrades]);

  // Custo Total de PM
  const totalCost = Math.max(1, baseCost + upgradesCost + customCostModifier);

  // Validações de Regras T20 JDA
  const exceedsMaxPm = totalCost > maxPmBreakdown.maxCost;
  const exceedsCurrentPm = totalCost > character.stats.currentMp;
  const canCast = !exceedsMaxPm && !exceedsCurrentPm;

  // Detecta rolagem de dano ou cura básica no texto da magia (ex: 2d6, 6d6, 1d8+1)
  const detectedDamageRoll = useMemo(() => {
    if (!spell || !spell.description) return null;
    const match = spell.description.match(/(\d+)d(\d+)(?:\s*\+\s*(\d+))?/i);
    if (match) {
      let count = parseInt(match[1], 10);
      const sides = parseInt(match[2], 10);
      const mod = match[3] ? parseInt(match[3], 10) : 0;

      // Se houver aprimoramentos selecionados que aumentam dados
      if (spell.upgrades) {
        spell.upgrades.forEach((upg, idx) => {
          const qty = selectedUpgrades[idx] || 0;
          if (qty > 0 && upg.description) {
            const extraMatch = upg.description.match(/aumenta o dano em \+(\d+)d(\d+)/i) || upg.description.match(/\+(\d+)d(\d+)/i);
            if (extraMatch && parseInt(extraMatch[2], 10) === sides) {
              count += parseInt(extraMatch[1], 10) * qty;
            }
          }
        });
      }

      return { count, sides, mod, label: `${count}d${sides}${mod > 0 ? `+${mod}` : ''}` };
    }
    return null;
  }, [spell?.description, spell?.upgrades, selectedUpgrades]);

  const toggleUpgrade = (idx: number, isMulti: boolean) => {
    const current = selectedUpgrades[idx] || 0;
    if (isMulti) {
      setSelectedUpgrades((prev) => ({ ...prev, [idx]: current + 1 }));
    } else {
      setSelectedUpgrades((prev) => ({ ...prev, [idx]: current > 0 ? 0 : 1 }));
    }
  };

  const decrementUpgrade = (idx: number) => {
    const current = selectedUpgrades[idx] || 0;
    if (current > 0) {
      setSelectedUpgrades((prev) => ({ ...prev, [idx]: current - 1 }));
    }
  };

  const handleExecuteCast = () => {
    if (!canCast || !spell) return;

    let rollInfo: { title: string; sides: number; count: number; modifier: number } | undefined = undefined;
    if (detectedDamageRoll) {
      rollInfo = {
        title: `Dano/Efeito de ${spell.name} (${detectedDamageRoll.label})`,
        sides: detectedDamageRoll.sides,
        count: detectedDamageRoll.count,
        modifier: detectedDamageRoll.mod,
      };
    }

    onCastSpell(spell.name, totalCost, rollInfo);
    onClose();
  };

  if (!isOpen || !spell || !spell.name) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(5, 7, 15, 0.85)',
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
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '1.75rem',
          background: 'linear-gradient(145deg, rgba(20, 24, 40, 0.98) 0%, rgba(28, 22, 38, 0.98) 100%)',
          border: '1px solid var(--border-gold)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(217, 119, 6, 0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
              <CircleBadge circle={spell.circle || 1} />
              <SchoolBadge school={spell.school} />
              <SpellTypeBadge type={spell.type} />
            </div>
            <h2 style={{ fontSize: '1.75rem', color: '#ffffff', margin: '0.4rem 0 0 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={22} color="var(--t20-gold-light)" />
              {cleanT20Text(spell.name)}
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

        {/* Parâmetros Básicos da Magia */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '0.6rem',
            padding: '0.75rem',
            background: 'rgba(0, 0, 0, 0.35)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            marginBottom: '1.25rem',
            fontSize: '0.8rem',
          }}
        >
          <div>
            <span style={{ color: 'var(--text-dim)', display: 'block', marginBottom: '0.2rem' }}>Execução:</span>
            <ExecutionBadge execution={spell.execution} />
          </div>
          <div>
            <span style={{ color: 'var(--text-dim)', display: 'block', marginBottom: '0.2rem' }}>Alcance:</span>
            <RangeBadge range={spell.range} />
          </div>
          <div>
            <span style={{ color: 'var(--text-dim)', display: 'block' }}>Alvo/Área:</span>
            <strong style={{ color: '#ffffff' }}>{cleanT20Text(spell.targetArea) || 'Criatura'}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-dim)', display: 'block' }}>Duração:</span>
            <strong style={{ color: '#ffffff' }}>{cleanT20Text(spell.duration) || 'Instantânea'}</strong>
          </div>
        </div>

        {/* Vitais de Conjuração: CD da Magia e Custo de PM */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          {/* Card CD do Teste de Resistência */}
          <div
            className="t20-card"
            style={{
              padding: '1rem',
              background: 'rgba(234, 179, 8, 0.06)',
              border: '1px solid rgba(234, 179, 8, 0.3)',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--t20-gold-light)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Shield size={15} />
                Resistência & CD
              </span>
              <button
                type="button"
                className="btn btn-ghost"
                style={{ padding: '0.1rem', color: 'var(--text-dim)' }}
                onClick={() => setActiveTooltip(activeTooltip === 'dc' ? null : 'dc')}
                title="Ver fórmula canônica de CD"
              >
                <HelpCircle size={14} />
              </button>
            </div>

            <div style={{ margin: '0.4rem 0' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--t20-gold-light)' }}>
                CD {saveDcBreakdown.value}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                {spell.resistance ? `${spell.resistance}` : 'Sem teste de resistência'}
              </div>
            </div>

            {/* Tooltip explicativa canônica */}
            {activeTooltip === 'dc' && (
              <div
                style={{
                  marginTop: '0.5rem',
                  padding: '0.5rem',
                  background: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  lineHeight: 1.4,
                  color: '#e2e8f0',
                }}
              >
                <strong style={{ color: 'var(--t20-gold)', display: 'block', marginBottom: '0.2rem' }}>
                  Fórmula Oficial (Cap. 4, pág. 179):
                </strong>
                <div>{saveDcBreakdown.formula}</div>
                <div style={{ marginTop: '0.3rem', color: 'var(--text-dim)', fontSize: '0.7rem' }}>
                  CD = 10 + Metade do Nível + Modificador de {keyAttrName} ({keyAttrMod})
                </div>
              </div>
            )}
          </div>

          {/* Card Custo de PM e Limite de Gastos */}
          <div
            className="t20-card"
            style={{
              padding: '1rem',
              background: exceedsMaxPm || exceedsCurrentPm ? 'rgba(239, 68, 68, 0.08)' : 'rgba(59, 130, 246, 0.06)',
              border: exceedsMaxPm || exceedsCurrentPm ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(59, 130, 246, 0.3)',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--t20-mana-light)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Zap size={15} />
                Custo de Conjuração
              </span>
              <button
                type="button"
                className="btn btn-ghost"
                style={{ padding: '0.1rem', color: 'var(--text-dim)' }}
                onClick={() => setActiveTooltip(activeTooltip === 'pm' ? null : 'pm')}
                title="Ver regras de limite de PM"
              >
                <HelpCircle size={14} />
              </button>
            </div>

            <div style={{ margin: '0.4rem 0' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: exceedsMaxPm || exceedsCurrentPm ? '#f87171' : 'var(--t20-mana-light)' }}>
                {totalCost} PM
              </div>
              <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                Limite: <strong>{maxPmBreakdown.maxCost} PM</strong> por magia (Disponível: {character.stats.currentMp} PM)
              </div>
            </div>

            {/* Tooltip explicativa canônica */}
            {activeTooltip === 'pm' && (
              <div
                style={{
                  marginTop: '0.5rem',
                  padding: '0.5rem',
                  background: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  lineHeight: 1.4,
                  color: '#e2e8f0',
                }}
              >
                <strong style={{ color: 'var(--t20-mana-light)', display: 'block', marginBottom: '0.2rem' }}>
                  Limite Canônico (Cap. 4, pág. 178):
                </strong>
                <div>{maxPmBreakdown.breakdown.formula}</div>
                <div style={{ marginTop: '0.3rem', color: 'var(--text-dim)', fontSize: '0.7rem' }}>
                  Custo Base: {baseCost} PM • Aprimoramentos: +{upgradesCost} PM
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Alerta de Violação de Regras de PM */}
        {exceedsMaxPm && (
          <div
            style={{
              padding: '0.75rem 1rem',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #ef4444',
              borderRadius: 'var(--radius-sm)',
              color: '#fca5a5',
              fontSize: '0.85rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
            }}
          >
            <AlertTriangle size={18} color="#ef4444" style={{ flexShrink: 0 }} />
            <div>
              <strong>Violação de Limite de PM (Cap. 4, pág. 178):</strong> O custo total ({totalCost} PM) excede o limite máximo permitido de {maxPmBreakdown.maxCost} PM para o seu nível ({character.level}). Reduza os aprimoramentos para conjurar.
            </div>
          </div>
        )}

        {exceedsCurrentPm && !exceedsMaxPm && (
          <div
            style={{
              padding: '0.75rem 1rem',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #ef4444',
              borderRadius: 'var(--radius-sm)',
              color: '#fca5a5',
              fontSize: '0.85rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
            }}
          >
            <AlertTriangle size={18} color="#ef4444" style={{ flexShrink: 0 }} />
            <div>
              <strong>Pontos de Mana Insuficientes:</strong> Você possui {character.stats.currentMp} PM atuais, mas a magia requer {totalCost} PM.
            </div>
          </div>
        )}

        {/* Aprimoramentos Oficiais de Magia */}
        <div style={{ marginBottom: '1.25rem' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--t20-gold-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sparkles size={15} />
            Aprimoramentos Disponíveis
          </h4>

          {!spell.upgrades || spell.upgrades.length === 0 ? (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
              Esta magia não possui aprimoramentos descritos no manual.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {spell.upgrades.map((upg, idx) => {
                const count = selectedUpgrades[idx] || 0;
                const isSelected = count > 0;
                const perCost = parseUpgradeCost(upg.cost);
                const isScalable = upg.description.toLowerCase().includes('para cada') || upg.description.toLowerCase().includes('aumenta o dano');

                return (
                  <div
                    key={idx}
                    style={{
                      padding: '0.75rem 0.9rem',
                      background: isSelected ? 'rgba(217, 119, 6, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? '1px solid var(--border-gold)' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '0.75rem',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className={`badge ${isSelected ? 'badge-gold' : 'badge-slate'}`} style={{ fontSize: '0.75rem', fontWeight: 800 }}>
                          {upg.cost}
                        </span>
                        {isSelected && count > 1 && (
                          <span className="badge badge-ruby" style={{ fontSize: '0.7rem' }}>
                            x{count} (+{perCost * count} PM)
                          </span>
                        )}
                      </div>
                      <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.4 }}>
                        {upg.description}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      {isScalable && count > 0 && (
                        <button
                          type="button"
                          onClick={() => decrementUpgrade(idx)}
                          className="btn btn-secondary"
                          style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
                        >
                          -
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => toggleUpgrade(idx, isScalable)}
                        className={`btn ${isSelected ? 'btn-gold' : 'btn-secondary'}`}
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                      >
                        {isScalable ? (count > 0 ? `+1 (x${count})` : 'Adicionar') : (isSelected ? 'Aplicado' : 'Aplicar')}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modificadores Manuais Opcionais */}
        <div
          style={{
            padding: '0.75rem 1rem',
            background: 'rgba(0,0,0,0.25)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1.25rem',
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, minWidth: '160px' }}>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.2rem' }}>
              Modificador Manual de PM (Ex: -1 Foco):
            </label>
            <input
              type="number"
              value={customCostModifier}
              onChange={(e) => setCustomCostModifier(parseInt(e.target.value, 10) || 0)}
              style={{ width: '100%', padding: '0.3rem 0.5rem', fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ flex: 1, minWidth: '160px' }}>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.2rem' }}>
              Bônus Manual na CD da Magia:
            </label>
            <input
              type="number"
              value={customDcModifier}
              onChange={(e) => setCustomDcModifier(parseInt(e.target.value, 10) || 0)}
              style={{ width: '100%', padding: '0.3rem 0.5rem', fontSize: '0.85rem' }}
            />
          </div>
        </div>

        {/* Dano Previsto / Rolagem Automática */}
        {detectedDamageRoll && (
          <div
            style={{
              padding: '0.75rem 1rem',
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', color: '#fca5a5', textTransform: 'uppercase', fontWeight: 700 }}>
                Rolagem Automática Prevista:
              </span>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#ffffff' }}>
                {detectedDamageRoll.label} de dano/efeito
              </div>
            </div>
            <span className="badge badge-ruby" style={{ fontSize: '0.75rem' }}>
              Calculado com Aprimoramentos
            </span>
          </div>
        )}

        {/* Botões de Ação */}
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
            onClick={handleExecuteCast}
            disabled={!canCast}
            className="btn btn-gold"
            style={{
              padding: '0.5rem 1.5rem',
              fontWeight: 800,
              gap: '0.5rem',
              opacity: canCast ? 1 : 0.5,
              cursor: canCast ? 'pointer' : 'not-allowed',
            }}
          >
            <Zap size={18} />
            Lançar Magia ({totalCost} PM)
          </button>
        </div>
      </div>
    </div>
  );
};
