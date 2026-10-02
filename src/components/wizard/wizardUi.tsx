import React, { useMemo, useState } from 'react';
import { Check, ChevronDown, Info, Lock, RefreshCw } from 'lucide-react';
import { Sheet } from '../ui/Sheet';
import { Counter, SearchField } from '../ui/controls';

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

/* ---------------------------------------------------------------------------
   Introdução da etapa
   --------------------------------------------------------------------------- */
export const StepIntro: React.FC<{ title: string; description: React.ReactNode; action?: React.ReactNode }> = ({
  title,
  description,
  action,
}) => (
  <header className="step-intro">
    <div className="stack-xs grow">
      <h2 className="step-title">{title}</h2>
      <p className="t-sm t-2">{description}</p>
    </div>
    {action}
  </header>
);

/* ---------------------------------------------------------------------------
   Cartão da escolha atual (raça, classe, origem, divindade)
   --------------------------------------------------------------------------- */
interface ChoiceCardProps {
  eyebrow: string;
  title: string;
  subtitle?: React.ReactNode;
  badges?: React.ReactNode;
  description?: string;
  leading?: React.ReactNode;
  onChange: () => void;
  changeLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ChoiceCard: React.FC<ChoiceCardProps> = ({
  eyebrow,
  title,
  subtitle,
  badges,
  description,
  leading,
  onChange,
  changeLabel = 'Trocar',
  className = '',
  style,
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className={`card choice-card ${className}`} style={style}>
      <div className="hstack-lg items-start">
        {leading}
        <div className="stack-xs grow">
          <span className="eyebrow">{eyebrow}</span>
          <h3 className="choice-title">{title}</h3>
          {subtitle && <span className="t-sm t-2">{subtitle}</span>}
        </div>
        <button type="button" className="btn btn-tonal btn-sm shrink-0" onClick={onChange}>
          <RefreshCw size={15} />
          {changeLabel}
        </button>
      </div>
      {badges && <div className="chip-wrap">{badges}</div>}
      {description && (
        <button type="button" className="choice-desc" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
          <span className={expanded ? 'pre-line' : 'clamp-3'}>{description}</span>
          <span className="choice-desc-more">
            {expanded ? 'Mostrar menos' : 'Ler mais'}
            <ChevronDown size={14} style={{ transform: expanded ? 'rotate(180deg)' : undefined }} />
          </span>
        </button>
      )}
    </section>
  );
};

/* ---------------------------------------------------------------------------
   Seção de sub-escolha com status
   --------------------------------------------------------------------------- */
interface ChoiceSectionProps {
  title: string;
  description?: React.ReactNode;
  count?: { value: number; total: number };
  children: React.ReactNode;
  action?: React.ReactNode;
}

export const ChoiceSection: React.FC<ChoiceSectionProps> = ({ title, description, count, children, action }) => {
  const done = count ? count.value === count.total : false;
  return (
    <section className={`choice-section${count ? (done ? ' is-done' : ' is-pending') : ''}`}>
      <div className="section-head">
        <div className="stack-xs grow">
          <h4 className="choice-section-title">{title}</h4>
          {description && <span className="t-xs t-3">{description}</span>}
        </div>
        {count && <Counter value={count.value} total={count.total} />}
        {action}
      </div>
      {children}
    </section>
  );
};

/* ---------------------------------------------------------------------------
   Picker genérico em sheet (escolha única ou múltipla, com busca)
   --------------------------------------------------------------------------- */
export interface PickerOption {
  id: string;
  title: string;
  subtitle?: string;
  meta?: React.ReactNode;
  leading?: React.ReactNode;
  disabled?: boolean;
  disabledReason?: string;
  searchText?: string;
}

interface OptionPickerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  options: PickerOption[];
  value: string[];
  onChange: (next: string[]) => void;
  multiple?: boolean;
  max?: number;
  searchPlaceholder?: string;
  toolbarExtra?: React.ReactNode;
  onInfo?: (id: string) => void;
  /** Permite marcar opções desabilitadas mediante confirmação (ex.: requisitos não atendidos). */
  allowDisabled?: boolean;
  emptyText?: string;
}

export const OptionPickerSheet: React.FC<OptionPickerProps> = ({
  open,
  onClose,
  title,
  subtitle,
  options,
  value,
  onChange,
  multiple = false,
  max = Infinity,
  searchPlaceholder = 'Buscar…',
  toolbarExtra,
  onInfo,
  emptyText = 'Nada encontrado.',
}) => {
  const [search, setSearch] = useState('');
  const visible = useMemo(() => {
    const q = normalize(search.trim());
    if (!q) return options;
    return options.filter((o) => normalize(`${o.title} ${o.subtitle || ''} ${o.searchText || ''}`).includes(q));
  }, [options, search]);

  const toggle = (opt: PickerOption) => {
    const isOn = value.includes(opt.id);
    if (!multiple) {
      if (!opt.disabled) {
        onChange([opt.id]);
        onClose();
      }
      return;
    }
    if (isOn) onChange(value.filter((v) => v !== opt.id));
    else if (!opt.disabled && value.length < max) onChange([...value, opt.id]);
  };

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      size="md"
      full
      flush
      toolbar={
        <>
          {options.length > 7 && <SearchField value={search} onChange={setSearch} placeholder={searchPlaceholder} />}
          {toolbarExtra}
        </>
      }
      footer={
        multiple ? (
          <button type="button" className="btn btn-primary" onClick={onClose}>
            <Check size={18} />
            Concluir {Number.isFinite(max) ? `(${value.length}/${max})` : ''}
          </button>
        ) : undefined
      }
    >
      {visible.length === 0 ? (
        <p className="t-sm t-3" style={{ padding: 20 }}>
          {emptyText}
        </p>
      ) : (
        <div className="list list-plain" role={multiple ? 'group' : 'radiogroup'} aria-label={title}>
          {visible.map((opt) => {
            const isOn = value.includes(opt.id);
            const blocked = !isOn && (opt.disabled || (multiple && value.length >= max));
            return (
              <div key={opt.id} className={`row pick-row${isOn ? ' is-selected' : ''}${opt.disabled && !isOn ? ' is-disabled' : ''}`}>
                <button
                  type="button"
                  role={multiple ? 'checkbox' : 'radio'}
                  aria-checked={isOn}
                  aria-disabled={blocked || undefined}
                  className="pick-main"
                  onClick={() => toggle(opt)}
                >
                  <span className={`mark${multiple ? '' : ' mark-radio'}${isOn ? ' is-on' : ''}${opt.disabled && !isOn ? ' mark-locked' : ''}`}>
                    {isOn ? <Check size={14} strokeWidth={3} /> : opt.disabled ? <Lock size={11} /> : null}
                  </span>
                  {opt.leading}
                  <span className="row-main">
                    <span className="row-title">{opt.title}</span>
                    {opt.subtitle && <span className="row-sub clamp-2">{opt.subtitle}</span>}
                    {opt.meta && <span className="hstack-xs wrap">{opt.meta}</span>}
                    {opt.disabled && opt.disabledReason && !isOn && <span className="t-xs t-warning">{opt.disabledReason}</span>}
                  </span>
                </button>
                {onInfo && (
                  <button type="button" className="icon-btn icon-btn-sm" onClick={() => onInfo(opt.id)} aria-label={`Detalhes de ${opt.title}`}>
                    <Info size={18} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Sheet>
  );
};

/* ---------------------------------------------------------------------------
   Chips das escolhas atuais + botão para abrir o picker
   --------------------------------------------------------------------------- */
interface SelectedChipsProps {
  labels: { id: string; label: string }[];
  placeholder: string;
  onOpen: () => void;
  onRemove?: (id: string) => void;
}

export const SelectedChips: React.FC<SelectedChipsProps> = ({ labels, placeholder, onOpen, onRemove }) => (
  <div className="selected-chips">
    {labels.map((l) => (
      <span key={l.id} className="chip chip-sm is-active">
        {l.label}
        {onRemove && (
          <button type="button" className="chip-x" onClick={() => onRemove(l.id)} aria-label={`Remover ${l.label}`}>
            ×
          </button>
        )}
      </span>
    ))}
    <button type="button" className="chip chip-sm chip-add" onClick={onOpen}>
      {labels.length === 0 ? placeholder : 'Alterar'}
    </button>
  </div>
);
