import React from 'react';
import { Dices, Info } from 'lucide-react';
import type { CharacterSheet } from '../../types/character';
import { ATTRIBUTES_LIST } from '../../data/attributes';
import { RULES_CITATIONS } from '../../data/rulesCitations';
import type { DetailModalData } from '../common/DetailModal';

interface CharacterAttributesProps {
  character: CharacterSheet;
  onRollDice: (title: string, diceSides: number, modifier: number, count?: number) => void;
  onSetModalDetail: (data: DetailModalData) => void;
}

export const CharacterAttributes: React.FC<CharacterAttributesProps> = ({
  character,
  onRollDice,
  onSetModalDetail,
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '0.75rem',
        marginBottom: '1.5rem',
      }}
    >
      {ATTRIBUTES_LIST.map((attr) => {
        const mod = character.totalAttributes[attr.key] || 0;
        const base = character.baseAttributes[attr.key] || 0;
        const racial = character.racialModifiers[attr.key] || 0;

        return (
          <div
            key={attr.key}
            className="t20-card"
            style={{
              textAlign: 'center',
              padding: '0.85rem 0.5rem',
              border: mod >= 3 ? '1px solid var(--border-gold)' : '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.35rem', position: 'relative' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-fantasy)', color: '#ffffff' }}>
                  {attr.shortName}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const citationKey = 'ATTR_' + attr.key.toUpperCase();
                    const citation = RULES_CITATIONS[citationKey];
                    onSetModalDetail({
                      title: `${attr.name} (${attr.shortName})`,
                      category: 'Atributo Básico • Tormenta 20 JDA',
                      subtitle: `Cálculo: Base (${base >= 0 ? '+' + base : base}) + Raça (${racial >= 0 ? '+' + racial : racial}) = Total (${mod >= 0 ? '+' + mod : mod})`,
                      description:
                        attr.description +
                        '\n\n' +
                        (citation ? citation.explanation : '') +
                        `\n\nTestes e regras associadas: ${attr.appliedTo.join(', ')}.`,
                      ruleCitation: citation,
                      stats: [
                        { label: 'Valor Base', value: base >= 0 ? `+${base}` : base },
                        { label: 'Modificador Racial', value: racial >= 0 ? `+${racial}` : racial },
                        { label: 'Valor Total', value: mod >= 0 ? `+${mod}` : mod },
                      ],
                    });
                  }}
                  className="btn btn-ghost"
                  style={{ padding: '0.1rem', color: 'var(--t20-gold)', position: 'absolute', right: 0, top: 0 }}
                  title={`Ver regras e testes afetados por ${attr.name}`}
                >
                  <Info size={13} />
                </button>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '0.4rem' }}>
                {attr.name}
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: mod > 0 ? 'var(--t20-gold-light)' : mod < 0 ? '#f87171' : '#cbd5e1',
                  lineHeight: 1,
                  marginBottom: '0.4rem',
                }}
              >
                {mod > 0 ? `+${mod}` : mod}
              </div>

              <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>
                Base {base} {racial !== 0 ? `| Raça ${racial > 0 ? `+${racial}` : racial}` : ''}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onRollDice(`Teste de ${attr.name}`, 20, mod)}
              className="btn btn-secondary"
              style={{ padding: '0.25rem 0.4rem', fontSize: '0.75rem', gap: '0.25rem', width: '100%', justifyContent: 'center' }}
              title={`Rolar 1d20 + ${mod}`}
            >
              <Dices size={12} />
              Rolar
            </button>
          </div>
        );
      })}
    </div>
  );
};
