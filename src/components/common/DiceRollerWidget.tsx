import React, { useState } from 'react';
import { Dices, RotateCcw, X, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export interface RollResult {
  id: string;
  title: string;
  formula: string;
  diceResult: number;
  modifier: number;
  total: number;
  isCrit: boolean;
  isFumble: boolean;
  timestamp: string;
}

interface DiceRollerWidgetProps {
  rolls: RollResult[];
  onRoll: (title: string, diceSides: number, modifier: number, count?: number) => void;
  onClearHistory: () => void;
}

export const DiceRollerWidget: React.FC<DiceRollerWidgetProps> = ({
  rolls,
  onRoll,
  onClearHistory,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [customMod, setCustomMod] = useState<number>(0);
  const [lastRollAnimation, setLastRollAnimation] = useState<number | null>(null);

  const handleQuickRoll = (sides: number) => {
    setLastRollAnimation(sides);
    setTimeout(() => setLastRollAnimation(null), 600);
    onRoll(`Rolagem d${sides}`, sides, customMod);
  };

  const latestRoll = rolls[0];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '5.25rem',
        right: '1.5rem',
        zIndex: 900,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.5rem',
      }}
    >
      {/* Toast / Resultado recente flutuante se recolhido */}
      {!isExpanded && latestRoll && (
        <div
          onClick={() => setIsExpanded(true)}
          style={{
            background: 'var(--bg-surface-elevated)',
            border: latestRoll.isCrit ? '2px solid var(--t20-gold)' : latestRoll.isFumble ? '2px solid #ef4444' : '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-lg)',
            borderRadius: 'var(--radius-lg)',
            padding: '0.65rem 1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            maxWidth: '320px',
            animation: 'popoverFadeIn 0.25s ease-out',
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: latestRoll.isCrit ? 'rgba(245, 158, 11, 0.2)' : latestRoll.isFumble ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '1.1rem',
              color: latestRoll.isCrit ? 'var(--t20-gold-light)' : latestRoll.isFumble ? '#f87171' : '#ffffff',
            }}
          >
            {latestRoll.total}
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>{latestRoll.title}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{latestRoll.formula}</div>
          </div>
        </div>
      )}

      {/* Painel Expandido do Rolador de Dados */}
      {isExpanded && (
        <div
          className="t20-card"
          style={{
            width: '320px',
            maxHeight: '480px',
            boxShadow: 'var(--shadow-lg)',
            background: '#121524',
            border: '1px solid var(--border-gold)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            animation: 'modalSlideUp 0.2s ease-out',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: 'var(--t20-gold-light)' }}>
              <Dices size={18} />
              <span>Rolador de Dados</span>
            </div>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <button
                type="button"
                onClick={onClearHistory}
                className="btn btn-ghost"
                style={{ padding: '0.25rem', fontSize: '0.75rem' }}
                title="Limpar histórico"
              >
                <RotateCcw size={14} />
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="btn btn-ghost"
                style={{ padding: '0.25rem' }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Seletor de Dados Rápidos */}
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.35rem' }}>Escolha o dado:</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem' }}>
              {[4, 6, 8, 10, 12, 20, 100].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => handleQuickRoll(d)}
                  className={`btn ${d === 20 ? 'btn-gold' : 'btn-secondary'}`}
                  style={{
                    padding: '0.5rem 0.25rem',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                  }}
                >
                  d{d}
                </button>
              ))}
            </div>
          </div>

          {/* Modificador extra */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Modificador bônus:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button
                type="button"
                onClick={() => setCustomMod((prev) => prev - 1)}
                className="btn btn-secondary"
                style={{ padding: '0.15rem 0.5rem', height: 26 }}
              >
                -
              </button>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, minWidth: 28, textAlign: 'center' }}>
                {customMod >= 0 ? `+${customMod}` : customMod}
              </span>
              <button
                type="button"
                onClick={() => setCustomMod((prev) => prev + 1)}
                className="btn btn-secondary"
                style={{ padding: '0.15rem 0.5rem', height: 26 }}
              >
                +
              </button>
            </div>
          </div>

          {/* Histórico de Rolagens */}
          <div style={{ flex: 1, overflowY: 'auto', minHeight: '120px', maxHeight: '180px', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Histórico recente:</div>
            {rolls.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.8rem', padding: '1rem 0' }}>
                Nenhum dado rolado ainda.
              </div>
            ) : (
              rolls.map((r) => (
                <div
                  key={r.id}
                  style={{
                    background: r.isCrit ? 'rgba(245, 158, 11, 0.12)' : r.isFumble ? 'rgba(239, 68, 68, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: r.isCrit ? '1px solid rgba(245, 158, 11, 0.4)' : r.isFumble ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                    padding: '0.45rem 0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)' }}>{r.title}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{r.formula}</div>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      color: r.isCrit ? 'var(--t20-gold-light)' : r.isFumble ? '#f87171' : '#ffffff',
                    }}
                  >
                    {r.total}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Botão Flutuante de Abrir Rolador */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="btn btn-gold"
        style={{
          borderRadius: '9999px',
          padding: '0.75rem 1.25rem',
          boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4)',
          gap: '0.5rem',
        }}
        aria-label="Abrir Rolador de Dados"
      >
        <Dices size={20} />
        <span>Rolar Dados</span>
        {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </button>
    </div>
  );
};
