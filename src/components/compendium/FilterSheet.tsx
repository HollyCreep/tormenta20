import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Sheet } from '../ui/Sheet';

interface FilterSheetProps {
  open: boolean;
  onClose: () => void;
  onClear: () => void;
  resultCount: number;
  children: React.ReactNode;
}

/** Sheet de filtros do compêndio (selects e segmentados no lugar de fileiras de botões). */
export const FilterSheet: React.FC<FilterSheetProps> = ({ open, onClose, onClear, resultCount, children }) => (
  <Sheet
    open={open}
    onClose={onClose}
    title="Filtros"
    icon={<SlidersHorizontal size={22} />}
    size="sm"
    footer={
      <>
        <button type="button" className="btn btn-secondary" onClick={onClear}>
          Limpar
        </button>
        <button type="button" className="btn btn-primary" onClick={onClose}>
          Ver {resultCount} {resultCount === 1 ? 'resultado' : 'resultados'}
        </button>
      </>
    }
  >
    <div className="stack-lg">{children}</div>
  </Sheet>
);

interface FilterButtonProps {
  activeCount: number;
  onClick: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ activeCount, onClick }) => (
  <button
    type="button"
    className={`icon-btn icon-btn-filled filter-btn${activeCount > 0 ? ' has-active' : ''}`}
    onClick={onClick}
    aria-label={activeCount > 0 ? `Filtros (${activeCount} ativos)` : 'Filtros'}
  >
    <SlidersHorizontal size={19} />
    {activeCount > 0 && <span className="filter-btn-count">{activeCount}</span>}
  </button>
);

export interface ActiveFilterChip {
  key: string;
  label: string;
  onRemove: () => void;
}

export const ActiveFilters: React.FC<{ chips: ActiveFilterChip[] }> = ({ chips }) =>
  chips.length === 0 ? null : (
    <div className="chip-row active-filters">
      {chips.map((c) => (
        <button key={c.key} type="button" className="chip chip-sm chip-removable is-active" onClick={c.onRemove} aria-label={`Remover filtro ${c.label}`}>
          {c.label}
          <X size={14} />
        </button>
      ))}
    </div>
  );

export const normalizeSearch = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
