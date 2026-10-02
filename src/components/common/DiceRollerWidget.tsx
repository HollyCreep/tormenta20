import React, { useEffect, useRef, useState } from 'react';
import { History, Trash2, X } from 'lucide-react';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Sheet } from '../ui/Sheet';
import { NumberStepper } from '../ui/controls';
import { D20Icon } from '../ui/Icons';

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
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const DICE = [4, 6, 8, 10, 12, 20, 100] as const;
const TOAST_MS = 5200;

const parseCleanTitle = (rawTitle: string) => {
  const match = rawTitle.match(/^(.*?)\s*\[(.*)\]$/);
  return match ? match[1].trim() : rawTitle.trim();
};

const formatMod = (v: number) => (v > 0 ? `+${v}` : `${v}`);

/** Silhuetas dos dados — cada tipo tem sua forma. */
const DieShape: React.FC<{ sides: number }> = ({ sides }) => {
  const common = {
    width: 34,
    height: 34,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinejoin: 'round' as const,
    strokeLinecap: 'round' as const,
    'aria-hidden': true,
  };
  switch (sides) {
    case 4:
      return (
        <svg {...common}>
          <path d="M12 3 21.5 19.5h-19Z" />
          <path d="M12 3v16.5" opacity=".45" />
        </svg>
      );
    case 6:
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="3.5" />
          <circle cx="9" cy="9" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="15" cy="15" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case 8:
      return (
        <svg {...common}>
          <path d="M12 2 21 12 12 22 3 12Z" />
          <path d="M3 12h18M12 2l-4 10 4 10 4-10Z" opacity=".45" />
        </svg>
      );
    case 10:
    case 100:
      return (
        <svg {...common}>
          <path d="M12 2 21 10.5 12 22 3 10.5Z" />
          <path d="M3 10.5 12 14l9-3.5M12 14v8M12 2 8 11.8M12 2l4 9.8" opacity=".45" />
          {sides === 100 && <circle cx="12" cy="12" r="10.5" opacity=".35" />}
        </svg>
      );
    case 12:
      return (
        <svg {...common}>
          <path d="M12 2.5 21 9.1 17.6 20H6.4L3 9.1Z" />
          <path d="M12 7l4.3 3.1-1.6 5H9.3l-1.6-5Z" opacity=".55" />
        </svg>
      );
    default:
      return <D20Icon size={34} strokeWidth={1.6} />;
  }
};

function fireHaptics(roll: RollResult) {
  try {
    const p = roll.isCrit
      ? Haptics.notification({ type: NotificationType.Success })
      : roll.isFumble
        ? Haptics.notification({ type: NotificationType.Error })
        : Haptics.impact({ style: ImpactStyle.Light });
    Promise.resolve(p).catch(() => {});
  } catch {
    // Web sem suporte a vibração: ignora
  }
}

async function celebrateCrit() {
  try {
    const { default: confetti } = await import('canvas-confetti');
    const styles = getComputedStyle(document.documentElement);
    const colors = [styles.getPropertyValue('--accent').trim(), styles.getPropertyValue('--gold').trim(), '#ffffff'].filter(Boolean);
    confetti({ particleCount: 90, spread: 70, startVelocity: 38, origin: { y: 0.75 }, colors, scalar: 0.9, zIndex: 1000 });
  } catch {
    // efeito opcional
  }
}

export const DiceRollerWidget: React.FC<DiceRollerWidgetProps> = ({
  rolls,
  onRoll,
  onClearHistory,
  isOpen,
  onOpen,
  onClose,
}) => {
  const [count, setCount] = useState(1);
  const [modifier, setModifier] = useState(0);
  const [toastRollId, setToastRollId] = useState<string | null>(null);
  const timerRef = useRef<number | undefined>(undefined);
  const seenRef = useRef<string | null>(null);

  const latest = rolls[0];

  // Reage a cada rolagem nova: vibração, confete no 20 natural e toast (se a bandeja estiver fechada)
  useEffect(() => {
    if (!latest || seenRef.current === latest.id) return;
    seenRef.current = latest.id;
    fireHaptics(latest);
    if (latest.isCrit) celebrateCrit();
    if (!isOpen) {
      setToastRollId(latest.id);
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setToastRollId(null), TOAST_MS);
    }
  }, [latest, isOpen]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  // Abrir a bandeja esconde o toast
  useEffect(() => {
    if (isOpen) setToastRollId(null);
  }, [isOpen]);

  const toastRoll = toastRollId ? rolls.find((r) => r.id === toastRollId) : undefined;

  const holdToast = () => window.clearTimeout(timerRef.current);
  const releaseToast = () => {
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setToastRollId(null), 2500);
  };

  const quickRoll = (sides: number) => {
    const label = `${count > 1 ? count : ''}d${sides}`;
    onRoll(`Rolagem ${label}`, sides, modifier, count);
  };

  const stageTone = latest?.isCrit ? 'crit' : latest?.isFumble ? 'fumble' : 'normal';

  return (
    <>
      {toastRoll && (
        <div
          className="roll-toast no-print"
          data-tone={toastRoll.isCrit ? 'crit' : toastRoll.isFumble ? 'fumble' : 'normal'}
          role="status"
          aria-live="polite"
          onPointerEnter={holdToast}
          onPointerDown={holdToast}
          onPointerLeave={releaseToast}
        >
          <button type="button" className="roll-toast-main" onClick={onOpen} aria-label="Abrir bandeja de dados">
            <span className="roll-toast-total t-num">{toastRoll.total}</span>
            <span className="roll-toast-text">
              <span className="roll-toast-title truncate">
                {toastRoll.isCrit ? 'Crítico! · ' : toastRoll.isFumble ? 'Falha crítica · ' : ''}
                {toastRoll.cleanTitle || parseCleanTitle(toastRoll.title)}
              </span>
              <span className="roll-toast-formula truncate">{toastRoll.formula}</span>
            </span>
          </button>
          <button type="button" className="icon-btn icon-btn-sm" onClick={() => setToastRollId(null)} aria-label="Dispensar">
            <X size={18} />
          </button>
          <span className="roll-toast-timer" style={{ animationDuration: `${TOAST_MS}ms` }} />
        </div>
      )}

      <Sheet
        open={isOpen}
        onClose={onClose}
        title="Bandeja de Dados"
        subtitle="Toque em um dado para rolar"
        icon={<D20Icon size={24} />}
        size="md"
      >
        <div className="stack-lg">
          {/* Palco do resultado */}
          <div className="dice-stage" data-tone={stageTone} aria-live="polite">
            {latest ? (
              <>
                <span className="t-label">{latest.cleanTitle || parseCleanTitle(latest.title)}</span>
                <span key={latest.id} className="dice-total t-num">
                  {latest.total}
                </span>
                <span className="dice-formula t-mono">{latest.formula}</span>
                {latest.breakdown && <span className="t-xs t-3 t-center">{latest.breakdown}</span>}
                {latest.isCrit && <span className="badge badge-gold badge-lg badge-upper">20 natural — crítico!</span>}
                {latest.isFumble && <span className="badge badge-danger badge-lg badge-upper">1 natural — falha crítica</span>}
              </>
            ) : (
              <>
                <D20Icon size={56} strokeWidth={1.2} className="dice-stage-idle" />
                <span className="t-sm t-3">Nenhuma rolagem ainda. Os deuses aguardam.</span>
              </>
            )}
          </div>

          {/* Quantidade e modificador */}
          <div className="grid-2">
            <div className="field">
              <span className="field-label">Quantidade</span>
              <NumberStepper value={count} onChange={setCount} min={1} max={20} ariaLabel="quantidade de dados" />
            </div>
            <div className="field">
              <span className="field-label">Modificador</span>
              <NumberStepper
                value={modifier}
                onChange={setModifier}
                min={-30}
                max={30}
                format={formatMod}
                ariaLabel="modificador"
              />
            </div>
          </div>

          {/* Dados */}
          <div className="dice-grid">
            {DICE.map((sides) => (
              <button
                key={sides}
                type="button"
                className={`die${sides === 20 ? ' die-hero' : ''}`}
                onClick={() => quickRoll(sides)}
                aria-label={`Rolar ${count > 1 ? count : ''}d${sides}${modifier ? ` ${formatMod(modifier)}` : ''}`}
              >
                <DieShape sides={sides} />
                <span className="die-label">d{sides}</span>
              </button>
            ))}
          </div>

          {/* Histórico da sessão */}
          <section className="stack-sm">
            <div className="section-head">
              <h3 className="section-title t-md">
                <History size={18} />
                Rolagens recentes
              </h3>
              {rolls.length > 0 && (
                <button type="button" className="btn btn-ghost btn-sm" onClick={onClearHistory}>
                  <Trash2 size={16} />
                  Limpar
                </button>
              )}
            </div>
            {rolls.length === 0 ? (
              <p className="t-sm t-3">As rolagens desta sessão aparecem aqui.</p>
            ) : (
              <div className="list">
                {rolls.slice(0, 12).map((r) => (
                  <div key={r.id} className="row row-compact">
                    <span className="roll-chip t-num" data-tone={r.isCrit ? 'crit' : r.isFumble ? 'fumble' : 'normal'}>
                      {r.total}
                    </span>
                    <div className="row-main">
                      <span className="row-title truncate">{r.cleanTitle || parseCleanTitle(r.title)}</span>
                      <span className="row-sub t-mono truncate">{r.formula}</span>
                    </div>
                    <span className="t-xs t-3 t-num">{r.timestamp}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </Sheet>
    </>
  );
};
