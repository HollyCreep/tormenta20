import React from 'react';
import { Heart, Zap, Shield, ShieldAlert } from 'lucide-react';
import type { CharacterSheet } from '../../types/character';
import { StatBreakdownBadge } from '../common/StatBreakdownBadge';

interface CharacterResourceBarsProps {
  character: CharacterSheet;
  onModifyHp: (delta: number) => void;
  onModifyMp: (delta: number) => void;
  onOpenTempHpModal: () => void;
}

export const CharacterResourceBars: React.FC<CharacterResourceBarsProps> = ({
  character,
  onModifyHp,
  onModifyMp,
  onOpenTempHpModal,
}) => {
  return (
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f87171', fontWeight: 700 }}>
              <Heart size={18} />
              <span>Pontos de Vida</span>
            </div>
            <StatBreakdownBadge label="PV Máximo" breakdown={character.stats.maxHp} variant="ruby" size="sm" />
          </div>

          {/* Barra de Progresso de Vida com Overheal/Barreira e Valores Internos */}
          <div
            style={{
              position: 'relative',
              height: 32,
              background: 'rgba(0, 0, 0, 0.65)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              marginBottom: '0.75rem',
              border: (character.stats.tempHp || 0) > 0 ? '1.5px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow:
                (character.stats.tempHp || 0) > 0
                  ? '0 0 14px rgba(56, 189, 248, 0.4), inset 0 2px 8px rgba(0,0,0,0.8)'
                  : 'inset 0 2px 8px rgba(0,0,0,0.8)',
            }}
          >
            {/* Barra Base de Vida (Vermelha) */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: `${Math.max(0, Math.min(100, (character.stats.currentHp / character.stats.maxHp.value) * 100))}%`,
                background: 'linear-gradient(90deg, #b91c1c 0%, #ef4444 100%)',
                transition: 'width 0.3s ease',
                zIndex: 1,
              }}
            />

            {/* Camada de Sobrevida / Barreira / Overheal */}
            {(character.stats.tempHp || 0) > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: `${Math.max(0, Math.min(100, (character.stats.currentHp / character.stats.maxHp.value) * 100))}%`,
                  width: `${Math.max(
                    0,
                    Math.min(
                      100 - (character.stats.currentHp / character.stats.maxHp.value) * 100,
                      (character.stats.tempHp / character.stats.maxHp.value) * 100
                    )
                  )}%`,
                  background:
                    'repeating-linear-gradient(135deg, rgba(56, 189, 248, 0.95) 0px, rgba(56, 189, 248, 0.95) 6px, rgba(14, 165, 233, 0.95) 6px, rgba(14, 165, 233, 0.95) 12px)',
                  boxShadow: '0 0 10px rgba(56, 189, 248, 0.8)',
                  transition: 'all 0.3s ease',
                  zIndex: 2,
                }}
                title={`Sobrevida / Barreira ativa: +${character.stats.tempHp} PV Temporários`}
              />
            )}

            {/* Efeito Glow de Overheal Total quando ultrapassa 100% de PV */}
            {(character.stats.tempHp || 0) > 0 &&
              character.stats.currentHp + character.stats.tempHp > character.stats.maxHp.value && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.15) 60%, rgba(56, 189, 248, 0.35) 100%)',
                    boxShadow: 'inset 0 0 10px rgba(56, 189, 248, 0.6)',
                    pointerEvents: 'none',
                    zIndex: 3,
                  }}
                />
              )}

            {/* Valor Numérico Centralizado Dentro da Barra */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 4,
                pointerEvents: 'none',
                fontFamily: 'var(--font-mono)',
                fontWeight: 900,
                fontSize: '0.95rem',
                color: '#ffffff',
                textShadow: '0 1px 4px rgba(0,0,0,0.95), 0 0 3px #000',
                gap: '0.35rem',
              }}
            >
              <span>
                {character.stats.currentHp} / {character.stats.maxHp.value} PV
              </span>
              {(character.stats.tempHp || 0) > 0 && (
                <span
                  style={{
                    color: '#7dd3fc',
                    background: 'rgba(0, 0, 0, 0.55)',
                    padding: '0.05rem 0.35rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(56, 189, 248, 0.6)',
                    fontSize: '0.85rem',
                    fontWeight: 900,
                  }}
                >
                  [+{character.stats.tempHp}]
                </span>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.35rem' }}>
          <button type="button" onClick={() => onModifyHp(-5)} className="btn btn-secondary" style={{ flex: 1, padding: '0.3rem', fontSize: '0.8rem' }}>-5</button>
          <button type="button" onClick={() => onModifyHp(-1)} className="btn btn-secondary" style={{ flex: 1, padding: '0.3rem', fontSize: '0.8rem' }}>-1</button>
          <button type="button" onClick={() => onModifyHp(1)} className="btn btn-secondary" style={{ flex: 1, padding: '0.3rem', fontSize: '0.8rem' }}>+1</button>
          <button type="button" onClick={() => onModifyHp(5)} className="btn btn-secondary" style={{ flex: 1, padding: '0.3rem', fontSize: '0.8rem' }}>+5</button>
        </div>

        <div style={{ marginTop: '0.4rem' }}>
          <button
            type="button"
            onClick={onOpenTempHpModal}
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
            <span>
              {(character.stats.tempHp || 0) > 0
                ? `PV Temporário: ${character.stats.tempHp} (Editar)`
                : '+ PV Temporário'}
            </span>
          </button>
        </div>
      </div>

      {/* Caixa de PM */}
      <div
        className="t20-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#60a5fa', fontWeight: 700 }}>
              <Zap size={18} />
              <span>Pontos de Mana</span>
            </div>
            <StatBreakdownBadge label="PM Máximo" breakdown={character.stats.maxMp} variant="blue" size="sm" />
          </div>

          {/* Barra de Progresso de Mana com Valor Centralizado */}
          <div
            style={{
              position: 'relative',
              height: 32,
              background: 'rgba(0, 0, 0, 0.65)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              marginBottom: '0.75rem',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.8)',
            }}
          >
            {/* Barra de Preenchimento Azul */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: `${Math.max(0, Math.min(100, (character.stats.currentMp / character.stats.maxMp.value) * 100))}%`,
                background: 'linear-gradient(90deg, #1d4ed8 0%, #3b82f6 100%)',
                transition: 'width 0.3s ease',
                zIndex: 1,
              }}
            />

            {/* Valor Numérico Centralizado Dentro da Barra */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 4,
                pointerEvents: 'none',
                fontFamily: 'var(--font-mono)',
                fontWeight: 900,
                fontSize: '0.95rem',
                color: '#ffffff',
                textShadow: '0 1px 4px rgba(0,0,0,0.95), 0 0 3px #000',
              }}
            >
              <span>
                {character.stats.currentMp} / {character.stats.maxMp.value} PM
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.35rem' }}>
          <button type="button" onClick={() => onModifyMp(-5)} className="btn btn-secondary" style={{ flex: 1, padding: '0.3rem', fontSize: '0.8rem' }}>-5</button>
          <button type="button" onClick={() => onModifyMp(-1)} className="btn btn-secondary" style={{ flex: 1, padding: '0.3rem', fontSize: '0.8rem' }}>-1</button>
          <button type="button" onClick={() => onModifyMp(1)} className="btn btn-secondary" style={{ flex: 1, padding: '0.3rem', fontSize: '0.8rem' }}>+1</button>
          <button type="button" onClick={() => onModifyMp(5)} className="btn btn-secondary" style={{ flex: 1, padding: '0.3rem', fontSize: '0.8rem' }}>+5</button>
        </div>
      </div>

      {/* Caixa de Defesa */}
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
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: character.stats.currentSpaces > character.stats.maxSpaces.value ? '#ef4444' : 'var(--t20-gold-light)',
              }}
            >
              {character.stats.currentSpaces} esp.
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>/</span>
            <StatBreakdownBadge label="Capacidade Máxima de Carga" breakdown={character.stats.maxSpaces} unit=" esp." size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
};
