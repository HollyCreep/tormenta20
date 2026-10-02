import React, { useState } from 'react';
import { Calculator, ChevronRight } from 'lucide-react';
import type { StatBreakdown } from '../../types/character';
import { Sheet } from '../ui/Sheet';

interface StatBreakdownBadgeProps {
  label: string;
  breakdown: StatBreakdown;
  unit?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ruby' | 'gold' | 'blue' | 'green' | 'default';
  showLabel?: boolean;
  className?: string;
}

/** Valores que são totais (não recebem sinal "+"). */
const isAbsoluteStat = (label: string) =>
  /defesa|deslocamento|pv|pm|carga|espaço|cd/i.test(label);

export const formatBreakdownValue = (label: string, value: number, unit = '') => {
  const signed = value >= 0 && !isAbsoluteStat(label) ? `+${value}` : `${value}`;
  return unit ? `${signed} ${unit}` : signed;
};

interface CalcSheetProps {
  open: boolean;
  onClose: () => void;
  label: string;
  breakdown: StatBreakdown;
  unit?: string;
  footer?: React.ReactNode;
}

/** Sheet com a decomposição canônica de um valor (fórmula, parcelas e total). */
export const CalcSheet: React.FC<CalcSheetProps> = ({ open, onClose, label, breakdown, unit = '', footer }) => (
  <Sheet
    open={open}
    onClose={onClose}
    title={label}
    subtitle="Cálculo pelas regras do Jogo do Ano (v1.3)"
    icon={<Calculator size={22} />}
    size="sm"
    footer={footer}
  >
    <div className="stack">
      <div className="calc-total">
        <span className="t-label">Total</span>
        <span className="calc-total-value t-num">{formatBreakdownValue(label, breakdown.value, unit)}</span>
      </div>
      {breakdown.formula && <div className="calc-formula">{breakdown.formula}</div>}
      {breakdown.components.length > 0 && (
        <div className="stack-xs">
          <span className="eyebrow">Parcelas</span>
          <div className="list">
            {breakdown.components.map((comp, idx) => (
              <div key={idx} className="row row-compact">
                <ChevronRight size={14} className="t-3 shrink-0" />
                <span className="grow t-sm t-2">{comp.label}</span>
                <span className="calc-row-value">
                  {typeof comp.value === 'number' && comp.value > 0 ? `+${comp.value}` : comp.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </Sheet>
);

/**
 * Valor tocável que abre o cálculo discriminado.
 * (Antes era um popover acionado por hover — inviável no toque.)
 */
export const StatBreakdownBadge: React.FC<StatBreakdownBadgeProps> = ({
  label,
  breakdown,
  unit = '',
  size = 'md',
  variant = 'default',
  showLabel = true,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const tone = variant === 'default' ? '' : ` calc-trigger-${variant}`;
  const sizeClass = size === 'md' ? '' : ` calc-trigger-${size}`;

  return (
    <>
      <button
        type="button"
        className={`calc-trigger${tone}${sizeClass} ${className}`}
        onClick={() => setOpen(true)}
        aria-label={`${label}: ${formatBreakdownValue(label, breakdown.value, unit)}. Ver cálculo`}
      >
        {showLabel && <span className="calc-trigger-label">{label}</span>}
        <span className="calc-trigger-value">{formatBreakdownValue(label, breakdown.value, unit)}</span>
        <Calculator size={size === 'sm' ? 13 : 15} />
      </button>
      <CalcSheet open={open} onClose={() => setOpen(false)} label={label} breakdown={breakdown} unit={unit} />
    </>
  );
};
