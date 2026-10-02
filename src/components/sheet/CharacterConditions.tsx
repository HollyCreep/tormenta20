import React from 'react';
import { Info } from 'lucide-react';
import { CONDITIONS_LIST } from '../../data/conditions';

interface CharacterConditionsProps {
  activeConditions: string[];
  onToggleCondition: (conditionId: string) => void;
  onOpenConditionRules: () => void;
}

export const CharacterConditions: React.FC<CharacterConditionsProps> = ({
  activeConditions,
  onToggleCondition,
  onOpenConditionRules,
}) => {
  return (
    <div
      className="t20-card"
      style={{
        marginBottom: '1.5rem',
        padding: '0.85rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          Condições Ativas:
        </span>
        <button
          type="button"
          onClick={onOpenConditionRules}
          className="char-info-btn"
          title="Ver regras canônicas de Condições"
        >
          <Info size={13} />
        </button>
      </div>
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        {CONDITIONS_LIST.slice(0, 10).map((cond) => {
          const isActive = activeConditions.includes(cond.id);
          return (
            <button
              key={cond.id}
              type="button"
              onClick={() => onToggleCondition(cond.id)}
              className={`badge ${isActive ? 'badge-ruby' : 'badge-slate'}`}
              style={{
                cursor: 'pointer',
                border: isActive ? '1px solid var(--t20-ruby)' : '1px solid var(--border-color)',
                opacity: isActive ? 1 : 0.6,
              }}
              title={cond.effects.join(' ')}
            >
              {isActive ? '● ' : ''}{cond.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
