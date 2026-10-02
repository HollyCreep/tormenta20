import React, { useState } from 'react';
import { BookOpen, Plus, ShieldAlert, X } from 'lucide-react';
import { CONDITIONS_LIST } from '../../data/conditions';
import { Sheet } from '../ui/Sheet';
import { SearchField, Switch } from '../ui/controls';

interface CharacterConditionsProps {
  activeConditions: string[];
  onToggleCondition: (conditionId: string) => void;
  onOpenConditionRules: () => void;
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

/** Condições ativas (chips removíveis) + sheet com todas as condições do Apêndice. */
export const CharacterConditions: React.FC<CharacterConditionsProps> = ({
  activeConditions,
  onToggleCondition,
  onOpenConditionRules,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const active = CONDITIONS_LIST.filter((c) => activeConditions.includes(c.id));
  const q = normalize(search.trim());
  const visible = q
    ? CONDITIONS_LIST.filter((c) => normalize(`${c.name} ${c.description} ${c.effects.join(' ')}`).includes(q))
    : CONDITIONS_LIST;

  return (
    <section className="conditions-bar" aria-label="Condições">
      <div className="hstack between">
        <span className="t-label hstack-xs">
          <ShieldAlert size={14} />
          Condições
        </span>
        <button type="button" className="btn btn-ghost btn-xs" onClick={() => setOpen(true)}>
          <Plus size={14} />
          Gerenciar
        </button>
      </div>

      {active.length === 0 ? (
        <button type="button" className="conditions-empty" onClick={() => setOpen(true)}>
          Nenhuma condição ativa — toque para aplicar
        </button>
      ) : (
        <div className="chip-wrap">
          {active.map((cond) => (
            <button
              key={cond.id}
              type="button"
              className="chip chip-sm chip-condition"
              onClick={() => onToggleCondition(cond.id)}
              aria-label={`Remover condição ${cond.name}`}
              title={cond.effects.join(' ')}
            >
              {cond.name}
              <X size={14} />
            </button>
          ))}
        </div>
      )}

      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        title="Condições"
        subtitle={`${active.length} ativa${active.length === 1 ? '' : 's'} · efeitos recalculados na hora`}
        icon={<ShieldAlert size={22} />}
        size="md"
        full
        flush
        headerActions={
          <button type="button" className="icon-btn" onClick={onOpenConditionRules} aria-label="Regras de condições">
            <BookOpen size={20} />
          </button>
        }
        toolbar={<SearchField value={search} onChange={setSearch} placeholder="Buscar condição ou efeito…" />}
      >
        <div className="list list-plain">
          {visible.map((cond) => {
            const isOn = activeConditions.includes(cond.id);
            return (
              <label key={cond.id} className={`row condition-row${isOn ? ' is-selected' : ''}`}>
                <div className="row-main">
                  <span className="row-title">{cond.name}</span>
                  <span className="row-sub">{cond.description}</span>
                  {cond.effects.length > 0 && (
                    <ul className="condition-effects">
                      {cond.effects.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <Switch checked={isOn} onChange={() => onToggleCondition(cond.id)} ariaLabel={`Condição ${cond.name}`} />
              </label>
            );
          })}
          {visible.length === 0 && <p className="t-sm t-3" style={{ padding: 16 }}>Nenhuma condição encontrada.</p>}
        </div>
      </Sheet>
    </section>
  );
};
