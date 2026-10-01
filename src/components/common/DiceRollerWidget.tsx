import React, { useState, useEffect, useRef } from 'react';
import { Dices, RotateCcw, X, Sparkles, ChevronDown, ChevronUp, History, AlertTriangle, FileText } from 'lucide-react';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

export interface RollResult {
  id: string;
  title: string;
  cleanTitle?: string;
  formula: string;
  diceResult: number;
  modifier: number;
  total: number;
  isCrit: boolean;
  isFumble: boolean;
  timestamp: string;
  breakdown?: string;
}

interface DiceRollerWidgetProps {
  rolls: RollResult[];
  onRoll: (title: string, diceSides: number, modifier: number, count?: number) => void;
  onClearHistory: () => void;
  onOpenFullHistory?: () => void;
  onOpenChangeLog?: () => void;
}

export const DiceRollerWidget: React.FC<DiceRollerWidgetProps> = ({
  rolls,
  onRoll,
  onClearHistory,
  onOpenFullHistory,
  onOpenChangeLog,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [customMod, setCustomMod] = useState<number>(0);
  const [lastRollAnimation, setLastRollAnimation] = useState<number | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  const dismissTimerRef = useRef<any>(null);
  const progressIntervalRef = useRef<any>(null);

  const latestRoll = rolls[0];

  // Helper para limpar títulos longos que contenham fórmulas entre colchetes
  const parseCleanTitle = (rawTitle: string) => {
    const match = rawTitle.match(/^(.*?)\s*\[(.*)\]$/);
    if (match) {
      return {
        title: match[1].trim(),
        formulaDetail: match[2].trim(),
      };
    }
    return {
      title: rawTitle.trim(),
      formulaDetail: '',
    };
  };

  // Quando surge uma nova rolagem, ativa o toast com temporizador de fade out (6 segundos)
  useEffect(() => {
    if (latestRoll) {
      setIsToastVisible(true);
      setProgress(100);

      // Vibração tátil nativa no dispositivo mobile
      try {
        if (latestRoll.isCrit) {
          Haptics.notification({ type: NotificationType.Success });
        } else if (latestRoll.isFumble) {
          Haptics.notification({ type: NotificationType.Error });
        } else {
          Haptics.impact({ style: ImpactStyle.Light });
        }
      } catch {
        // Fallback transparente na web
      }

      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

      const totalDuration = 6000;
      const step = 50;
      const decrement = (step / totalDuration) * 100;

      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev <= decrement) {
            clearInterval(progressIntervalRef.current);
            return 0;
          }
          return prev - decrement;
        });
      }, step);

      dismissTimerRef.current = setTimeout(() => {
        setIsToastVisible(false);
      }, totalDuration);
    }

    return () => {
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [latestRoll?.id]);

  const handleQuickRoll = (sides: number) => {
    setLastRollAnimation(sides);
    setTimeout(() => setLastRollAnimation(null), 600);
    onRoll(`Rolagem d${sides}`, sides, customMod);
  };

  const parsedTitleInfo = latestRoll ? parseCleanTitle(latestRoll.title) : { title: '', formulaDetail: '' };

  return (
    <div
      className="dice-roller-widget-container"
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
      {/* Toast Flutuante com Fade Time e Fechar (Anexo 1) */}
      {!isExpanded && latestRoll && isToastVisible && (
        <div
          onMouseEnter={() => {
            // Pausa o auto-dismiss ao passar o mouse
            if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          }}
          style={{
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: latestRoll.isCrit
              ? '2px solid var(--t20-gold)'
              : latestRoll.isFumble
              ? '2px solid #ef4444'
              : '1px solid rgba(245, 158, 11, 0.3)',
            boxShadow: latestRoll.isCrit
              ? '0 10px 30px rgba(245, 158, 11, 0.35)'
              : '0 10px 30px rgba(0, 0, 0, 0.6)',
            borderRadius: 'var(--radius-lg)',
            padding: '0.65rem 0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            width: '320px',
            position: 'relative',
            overflow: 'hidden',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          {/* Barra de Progresso do Fade Time */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '3px',
              width: `${progress}%`,
              background: latestRoll.isCrit ? 'var(--t20-gold)' : latestRoll.isFumble ? '#ef4444' : 'var(--t20-mana)',
              transition: 'width 0.05s linear',
            }}
          />

          {/* Círculo com o Total */}
          <div
            onClick={() => setIsExpanded(true)}
            style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: latestRoll.isCrit
                ? 'rgba(245, 158, 11, 0.25)'
                : latestRoll.isFumble
                ? 'rgba(239, 68, 68, 0.25)'
                : 'rgba(255, 255, 255, 0.08)',
              border: latestRoll.isCrit
                ? '2px solid var(--t20-gold)'
                : latestRoll.isFumble
                ? '2px solid #ef4444'
                : '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '1.2rem',
              color: latestRoll.isCrit ? 'var(--t20-gold-light)' : latestRoll.isFumble ? '#f87171' : '#ffffff',
              cursor: 'pointer',
              flexShrink: 0,
            }}
            title="Clique para ver o rolador de dados e histórico"
          >
            {latestRoll.total}
          </div>

          {/* Título Limpo e Subtítulo Sintético */}
          <div
            onClick={() => setIsExpanded(true)}
            style={{ flex: 1, minWidth: 0, cursor: 'pointer' }}
            title="Clique para abrir detalhes da rolagem"
          >
            <div
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#ffffff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {parsedTitleInfo.title}
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--t20-mana-light)',
                fontFamily: 'var(--font-mono)',
                marginTop: '0.15rem',
              }}
            >
              {latestRoll.formula}
            </div>
          </div>

          {/* Botão de Fechar 'X' Imediato */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsToastVisible(false);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-dim)',
              cursor: 'pointer',
              padding: '0.25rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            title="Fechar resultado flutuante"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Painel Expandido do Rolador de Dados */}
      {isExpanded && (
        <div
          className="t20-card"
          style={{
            width: '330px',
            maxHeight: '520px',
            boxShadow: 'var(--shadow-xl)',
            background: 'rgba(15, 23, 42, 0.98)',
            backdropFilter: 'blur(16px)',
            border: '1px solid var(--border-gold)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            animation: 'modalSlideUp 0.2s ease-out',
            zIndex: 950,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: 'var(--t20-gold-light)' }}>
              <Dices size={18} />
              <span>Rolador de Dados</span>
            </div>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {onOpenFullHistory && (
                <button
                  type="button"
                  onClick={onOpenFullHistory}
                  className="btn btn-ghost"
                  style={{ padding: '0.25rem 0.4rem', fontSize: '0.75rem', color: 'var(--t20-gold)' }}
                  title="Abrir Histórico Completo de Rolagens"
                >
                  <History size={14} />
                </button>
              )}
              {onOpenChangeLog && (
                <button
                  type="button"
                  onClick={onOpenChangeLog}
                  className="btn btn-ghost"
                  style={{ padding: '0.25rem 0.4rem', fontSize: '0.75rem', color: 'var(--t20-mana-light)' }}
                  title="Abrir Log de Alterações de Ficha"
                >
                  <FileText size={14} />
                </button>
              )}
              <button
                type="button"
                onClick={onClearHistory}
                className="btn btn-ghost"
                style={{ padding: '0.25rem', fontSize: '0.75rem', color: '#f87171' }}
                title="Limpar histórico rápido"
              >
                <RotateCcw size={14} />
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="btn btn-ghost"
                style={{ padding: '0.25rem', color: 'var(--text-dim)' }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Seletor de Dados Rápidos */}
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.35rem' }}>Dados rápidos:</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem' }}>
              {[4, 6, 8, 10, 12, 20, 100].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => handleQuickRoll(d)}
                  className={`btn ${lastRollAnimation === d ? 'btn-gold animate-shake' : 'btn-secondary'}`}
                  style={{
                    padding: '0.45rem 0.2rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    border: d === 20 ? '1px solid var(--t20-gold)' : undefined,
                  }}
                >
                  d{d}
                </button>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-sm)', padding: '0 0.4rem' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginRight: '0.2rem' }}>Mod:</span>
                <input
                  type="number"
                  value={customMod}
                  onChange={(e) => setCustomMod(parseInt(e.target.value, 10) || 0)}
                  style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', fontSize: '0.8rem', padding: '0.2rem 0', fontFamily: 'var(--font-mono)' }}
                />
              </div>
            </div>
          </div>

          {/* Histórico Recente */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.45rem', minHeight: '120px', maxHeight: '220px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Últimas Rolagens
              </span>
              {onOpenFullHistory && (
                <button
                  type="button"
                  onClick={onOpenFullHistory}
                  style={{ background: 'transparent', border: 'none', color: 'var(--t20-gold)', fontSize: '0.72rem', cursor: 'pointer', padding: 0 }}
                >
                  Ver todas ➔
                </button>
              )}
            </div>

            {rolls.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.8rem', padding: '1.5rem 0' }}>
                Nenhum dado rolado ainda.
              </div>
            ) : (
              rolls.slice(0, 10).map((r) => {
                const info = parseCleanTitle(r.title);
                return (
                  <div
                    key={r.id}
                    style={{
                      background: r.isCrit
                        ? 'rgba(245, 158, 11, 0.1)'
                        : r.isFumble
                        ? 'rgba(239, 68, 68, 0.1)'
                        : 'rgba(255, 255, 255, 0.03)',
                      border: r.isCrit
                        ? '1px solid rgba(245, 158, 11, 0.3)'
                        : r.isFumble
                        ? '1px solid rgba(239, 68, 68, 0.3)'
                        : '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.45rem 0.65rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: '0.78rem', color: '#ffffff', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {info.title}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--t20-mana-light)', fontFamily: 'var(--font-mono)' }}>
                        {r.formula}
                      </div>
                      {info.formulaDetail && (
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '0.1rem' }}>
                          {info.formulaDetail}
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        color: r.isCrit ? 'var(--t20-gold-light)' : r.isFumble ? '#f87171' : '#ffffff',
                        marginLeft: '0.5rem',
                      }}
                    >
                      {r.total}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Botões do Rodapé */}
          <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.35rem', borderTop: '1px solid var(--border-color)' }}>
            {onOpenFullHistory && (
              <button
                type="button"
                onClick={onOpenFullHistory}
                className="btn btn-secondary"
                style={{ flex: 1, padding: '0.35rem', fontSize: '0.75rem', gap: '0.3rem' }}
              >
                <History size={13} />
                Histórico Geral
              </button>
            )}
            {onOpenChangeLog && (
              <button
                type="button"
                onClick={onOpenChangeLog}
                className="btn btn-secondary"
                style={{ flex: 1, padding: '0.35rem', fontSize: '0.75rem', gap: '0.3rem' }}
              >
                <FileText size={13} />
                Log da Ficha
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
