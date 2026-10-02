import React, { useState } from 'react';
import { Info, Dices } from 'lucide-react';
import type { CharacterSheet } from '../../../types/character';
import { SKILLS_LIST } from '../../../data/skills';
import { StatBreakdownBadge } from '../../common/StatBreakdownBadge';
import type { DetailModalData } from '../../common/DetailModal';

interface SkillsTabProps {
  character: CharacterSheet;
  onRollSkill: (skillName: string, totalMod: number, formula: string) => void;
  onSetModalDetail: (data: DetailModalData) => void;
}

export const SkillsTab: React.FC<SkillsTabProps> = ({
  character,
  onRollSkill,
  onSetModalDetail,
}) => {
  const [skillSearch, setSkillSearch] = useState('');
  const [skillFilter, setSkillFilter] = useState<'todas' | 'treinadas'>('treinadas');

  const filteredSkills = Object.values(character.skills).filter((sk) => {
    const matchesFilter = skillFilter === 'todas' || sk.isTrained;
    const matchesSearch = sk.name.toLowerCase().includes(skillSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            type="button"
            onClick={() => setSkillFilter('treinadas')}
            className={`btn ${skillFilter === 'treinadas' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
          >
            Apenas Treinadas
          </button>
          <button
            type="button"
            onClick={() => setSkillFilter('todas')}
            className={`btn ${skillFilter === 'todas' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
          >
            Todas as Perícias (29)
          </button>
        </div>

        <div style={{ maxWidth: '240px', width: '100%' }}>
          <input
            type="text"
            placeholder="Buscar perícia..."
            value={skillSearch}
            onChange={(e) => setSkillSearch(e.target.value)}
            style={{ padding: '0.35rem 0.65rem', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '0.65rem',
        }}
      >
        {filteredSkills.map((sk) => {
          const skDef = SKILLS_LIST.find((s) => s.id === sk.id);
          return (
            <div
              key={sk.id}
              className="t20-card"
              style={{
                padding: '0.65rem 0.85rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: sk.isTrained ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0,0,0,0.15)',
                borderColor: sk.isTrained ? 'var(--border-gold)' : 'var(--border-color)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() =>
                    onSetModalDetail({
                      title: sk.name,
                      category: `Perícia (${sk.attribute.toUpperCase()})`,
                      subtitle: sk.isTrained ? 'Personagem Treinado (+2 de bônus base)' : 'Destreinado',
                      description: skDef?.description || 'Perícia padrão de Tormenta 20.',
                    })
                  }
                  className="btn btn-ghost"
                  style={{ padding: '0.2rem', color: 'var(--text-dim)' }}
                  title="Ver regras da perícia"
                >
                  <Info size={14} />
                </button>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: '0.925rem',
                        color: sk.isTrained ? '#ffffff' : 'var(--text-muted)',
                      }}
                    >
                      {sk.name}
                    </span>
                    <span className="badge badge-slate" style={{ fontSize: '0.6rem', padding: '0.1rem 0.3rem' }}>
                      {sk.attribute.toUpperCase()}
                    </span>
                  </div>
                  {sk.isTrained && (
                    <span style={{ fontSize: '0.65rem', color: 'var(--t20-gold)' }}>
                      ★ Treinada
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <StatBreakdownBadge
                  label={sk.name}
                  breakdown={sk.breakdown}
                  variant={sk.isTrained ? 'gold' : 'default'}
                  size="sm"
                  showLabel={false}
                />
                <button
                  type="button"
                  onClick={() => onRollSkill(sk.name, sk.total, sk.breakdown.formula)}
                  className="btn btn-secondary"
                  style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem', gap: '0.25rem' }}
                  title="Rolar teste com d20"
                >
                  <Dices size={13} />
                  Rolar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
