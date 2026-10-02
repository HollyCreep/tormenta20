import React from 'react';
import { Info, Zap, Sparkles } from 'lucide-react';
import type { CharacterSheet, CharacterSpell } from '../../../types/character';
import { cleanT20Text } from '../../../utils/textUtils';
import {
  CircleBadge,
  SchoolBadge,
  SpellTypeBadge,
  ExecutionBadge,
  RangeBadge,
} from '../../common/T20Badge';
import type { DetailModalData } from '../../common/DetailModal';

// Custo canônico base por círculo (T20 JDA Cap. 4, pág. 178)
export const BASE_SPELL_COST_BY_CIRCLE: Record<number, number> = {
  1: 1,
  2: 3,
  3: 6,
  4: 10,
  5: 15,
};

interface SpellsTabProps {
  character: CharacterSheet;
  onCastStandardSpell: (spell: CharacterSpell) => void;
  onSelectCastSpell: (spell: CharacterSpell) => void;
  onSetModalDetail: (data: DetailModalData) => void;
}

export const SpellsTab: React.FC<SpellsTabProps> = ({
  character,
  onCastStandardSpell,
  onSelectCastSpell,
  onSetModalDetail,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1rem',
        }}
      >
        {character.spells.map((sp) => {
          const baseCost = BASE_SPELL_COST_BY_CIRCLE[sp.circle || 1] || 1;
          return (
            <div
              key={sp.id || Math.random().toString()}
              className="t20-card t20-card-gold"
              style={{
                padding: '1.1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.75rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <strong style={{ fontSize: '1.1rem', color: '#ffffff' }}>
                    {cleanT20Text(sp.name) || 'Magia'}
                  </strong>
                  <span className="badge badge-blue">{baseCost} PM</span>
                </div>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', margin: '0.45rem 0' }}>
                  <CircleBadge circle={sp.circle || 1} />
                  <SchoolBadge school={sp.school} />
                  <SpellTypeBadge type={sp.type} />
                  {sp.execution && <ExecutionBadge execution={sp.execution} />}
                  {sp.range && <RangeBadge range={sp.range} />}
                </div>
                <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                  {cleanT20Text(sp.description) || 'Nenhuma descrição disponível.'}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: '0.5rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    onSetModalDetail({
                      title: cleanT20Text(sp.name),
                      category: `Magia ${sp.type} (${sp.circle || 1}º Círculo)`,
                      subtitle: `${sp.school} • ${sp.execution}`,
                      cost: `${baseCost} PM`,
                      range: sp.range,
                      duration: sp.duration,
                      resistance: sp.resistance,
                      targetArea: sp.targetArea,
                      description: cleanT20Text(sp.description),
                      upgrades: sp.upgrades,
                    })
                  }
                  className="btn btn-ghost"
                  style={{ padding: '0.2rem 0.4rem', fontSize: '0.75rem', gap: '0.25rem' }}
                >
                  <Info size={14} /> Detalhes
                </button>

                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => onCastStandardSpell(sp)}
                    className="btn btn-primary"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', gap: '0.35rem', fontWeight: 700 }}
                    title={`Lançar no estado padrão gastando ${baseCost} PM`}
                  >
                    <Zap size={14} />
                    Lançar Magia ({baseCost} PM)
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectCastSpell(sp)}
                    className="btn btn-gold"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', gap: '0.35rem', fontWeight: 700 }}
                    title="Abrir opções de aprimoramentos, limite de PM e cálculo de CD"
                  >
                    <Sparkles size={14} />
                    Aprimorar...
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
