import React from 'react';
import { ChevronDown, Minus, Plus, Search, X } from 'lucide-react';

/* ---------------------------------------------------------------------------
   Segmented — escolha única entre poucas opções (2–6)
   --------------------------------------------------------------------------- */
export interface SegmentedOption<T extends string | number> {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
  count?: number;
  disabled?: boolean;
  title?: string;
}

interface SegmentedProps<T extends string | number> {
  value: T;
  onChange: (value: T) => void;
  options: SegmentedOption<T>[];
  ariaLabel: string;
  size?: 'md' | 'lg';
  accent?: boolean;
  className?: string;
}

export function Segmented<T extends string | number>({
  value,
  onChange,
  options,
  ariaLabel,
  size = 'md',
  accent = false,
  className = '',
}: SegmentedProps<T>) {
  return (
    <div
      className={`seg${size === 'lg' ? ' seg-lg' : ''}${accent ? ' seg-accent' : ''} ${className}`}
      role="radiogroup"
      aria-label={ariaLabel}
    >
      {options.map((opt) => (
        <button
          key={String(opt.value)}
          type="button"
          role="radio"
          aria-checked={opt.value === value}
          className="seg-btn"
          disabled={opt.disabled}
          title={opt.title}
          onClick={() => onChange(opt.value)}
        >
          {opt.icon}
          <span>{opt.label}</span>
          {typeof opt.count === 'number' && <span className="seg-count">{opt.count}</span>}
        </button>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   SearchField — busca com ícone e botão limpar
   --------------------------------------------------------------------------- */
interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  autoFocus?: boolean;
  className?: string;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  value,
  onChange,
  placeholder = 'Buscar…',
  ariaLabel,
  autoFocus,
  className = '',
}) => (
  <label className={`search ${className}`}>
    <Search size={18} aria-hidden="true" />
    <input
      type="search"
      inputMode="search"
      enterKeyHint="search"
      value={value}
      placeholder={placeholder}
      aria-label={ariaLabel || placeholder}
      autoFocus={autoFocus}
      onChange={(e) => onChange(e.target.value)}
    />
    {value && (
      <button type="button" className="icon-btn icon-btn-sm search-clear" onClick={() => onChange('')} aria-label="Limpar busca">
        <X size={16} />
      </button>
    )}
  </label>
);

/* ---------------------------------------------------------------------------
   SelectField — <select> nativo estilizado (ótimo no mobile)
   --------------------------------------------------------------------------- */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
  ariaLabel?: string;
  size?: 'sm' | 'md';
  className?: string;
  id?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  value,
  onChange,
  options,
  label,
  ariaLabel,
  size = 'md',
  className = '',
  id,
}) => {
  const select = (
    <div className={`select${size === 'sm' ? ' select-sm' : ''}`}>
      <select id={id} value={value} aria-label={label ? undefined : ariaLabel} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown size={18} aria-hidden="true" />
    </div>
  );

  if (!label) return <div className={className}>{select}</div>;

  return (
    <label className={`field ${className}`}>
      <span className="field-label">{label}</span>
      {select}
    </label>
  );
};

/* ---------------------------------------------------------------------------
   Switch / ToggleRow
   --------------------------------------------------------------------------- */
interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel?: string;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, ariaLabel, disabled }) => (
  <span className="switch">
    <input
      type="checkbox"
      role="switch"
      checked={checked}
      disabled={disabled}
      aria-label={ariaLabel}
      onChange={(e) => onChange(e.target.checked)}
    />
    <span className="switch-track" aria-hidden="true" />
  </span>
);

interface ToggleRowProps extends SwitchProps {
  label: React.ReactNode;
  description?: React.ReactNode;
}

export const ToggleRow: React.FC<ToggleRowProps> = ({ label, description, checked, onChange, disabled }) => (
  <label className="toggle-row">
    <span className="stack-xs grow">
      <span className="t-semibold">{label}</span>
      {description && <span className="t-sm t-3">{description}</span>}
    </span>
    <Switch checked={checked} onChange={onChange} disabled={disabled} />
  </label>
);

/* ---------------------------------------------------------------------------
   NumberStepper — − valor +
   --------------------------------------------------------------------------- */
interface NumberStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  format?: (value: number) => React.ReactNode;
  ariaLabel: string;
  decDisabled?: boolean;
  incDisabled?: boolean;
  decTitle?: string;
  incTitle?: string;
}

export const NumberStepper: React.FC<NumberStepperProps> = ({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  format,
  ariaLabel,
  decDisabled,
  incDisabled,
  decTitle,
  incTitle,
}) => (
  <div className="stepper" role="group" aria-label={ariaLabel}>
    <button
      type="button"
      onClick={() => onChange(Math.max(min, value - step))}
      disabled={decDisabled ?? value <= min}
      aria-label={decTitle || `Diminuir ${ariaLabel}`}
      title={decTitle}
    >
      <Minus size={18} />
    </button>
    <span className="stepper-value" aria-live="polite">
      {format ? format(value) : value}
    </span>
    <button
      type="button"
      onClick={() => onChange(Math.min(max, value + step))}
      disabled={incDisabled ?? value >= max}
      aria-label={incTitle || `Aumentar ${ariaLabel}`}
      title={incTitle}
    >
      <Plus size={18} />
    </button>
  </div>
);

/* ---------------------------------------------------------------------------
   EmptyState
   --------------------------------------------------------------------------- */
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action, className = '' }) => (
  <div className={`empty ${className}`}>
    {icon && <div className="empty-icon">{icon}</div>}
    <div className="empty-title">{title}</div>
    {description && <p className="t-sm t-3" style={{ maxWidth: 420 }}>{description}</p>}
    {action}
  </div>
);

/* ---------------------------------------------------------------------------
   SectionHeader
   --------------------------------------------------------------------------- */
interface SectionHeaderProps {
  title: React.ReactNode;
  icon?: React.ReactNode;
  eyebrow?: React.ReactNode;
  action?: React.ReactNode;
  as?: 'h2' | 'h3';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon, eyebrow, action, as = 'h2' }) => {
  const Tag = as;
  return (
    <div className="section-head">
      <div className="stack-xs" style={{ minWidth: 0 }}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <Tag className="section-title">
          {icon}
          <span className="truncate">{title}</span>
        </Tag>
      </div>
      {action}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   Counter — "2 de 3"
   --------------------------------------------------------------------------- */
export const Counter: React.FC<{ value: number; total: number; label?: string }> = ({ value, total, label }) => {
  const state = value === total ? ' is-done' : value > total ? ' is-over' : '';
  return (
    <span className={`counter${state}`} aria-label={`${value} de ${total}${label ? ` ${label}` : ''}`}>
      <span>{value}</span>
      <span className="t-3">/</span>
      <span>{total}</span>
      {label && <span className="t-3" style={{ marginLeft: 3, fontWeight: 600 }}>{label}</span>}
    </span>
  );
};
