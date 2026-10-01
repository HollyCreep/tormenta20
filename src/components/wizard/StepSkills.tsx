import React from 'react';
import { SKILLS_LIST } from '../../data/skills';
import { CharacterAttributes } from '../../types/character';
import { Check, ShieldAlert, Info, RotateCcw } from 'lucide-react';
import { DetailModalData } from '../common/DetailModal';

interface StepSkillsProps {
  totalAttributes: CharacterAttributes;
  raceSkills?: string[];
  classSkills?: string[];
  originSkills?: string[];
  selectedIntSkills: string[];
  onSelectIntSkills: (skills: string[]) => void;
  onOpenDetail: (data: DetailModalData) => void;
}

export const StepSkills: React.FC<StepSkillsProps> = ({
  totalAttributes,
  raceSkills = [],
  classSkills = [],
  originSkills = [],
  selectedIntSkills,
  onSelectIntSkills,
  onOpenDetail,
}) => {
  const intBonus = Math.max(0, totalAttributes.int);
  const remainingIntPicks = intBonus - selectedIntSkills.length;

  const handleToggleIntSkill = (skillId: string) => {
    if (selectedIntSkills.includes(skillId)) {
      onSelectIntSkills(selectedIntSkills.filter((s) => s !== skillId));
    } else {
      if (selectedIntSkills.length < intBonus) {
        onSelectIntSkills([...selectedIntSkills, skillId]);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Cabeçalho */}
      <div>
        <h2>Passo 6: Perícias Treinadas</h2>
        <p>
          Perícias medem suas competências em situações de combate, sobrevivência e exploração. Além das perícias de classe, raça e origem, sua <strong>Inteligência positiva ({intBonus > 0 ? `+${intBonus}` : '0'})</strong> concede <strong>{intBonus} perícia(s) treinada(s) adicional(is) de livre escolha</strong>!
        </p>
      </div>

      {/* Status da Inteligência */}
      <div
        style={{
          background: intBonus > 0 ? 'rgba(59, 130, 246, 0.08)' : 'rgba(255, 255, 255, 0.03)',
          border: intBonus > 0 ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ fontWeight: 700, color: intBonus > 0 ? 'var(--t20-mana-light)' : 'var(--text-main)' }}>
            Bônus de Perícias por Inteligência (+{intBonus}):
          </div>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {intBonus > 0
              ? `Você pode escolher ${intBonus} perícia(s) de qualquer área para se tornar treinado. Clique no botão de cada card para alternar (toggle).`
              : 'Sua Inteligência não é positiva, portanto não há perícias extras por Inteligência.'}
          </p>
        </div>
        {intBonus > 0 && (
          <span className={`badge ${remainingIntPicks === 0 ? 'badge-green' : 'badge-blue'}`}>
            {selectedIntSkills.length} de {intBonus} escolhida(s)
          </span>
        )}
      </div>

      {/* Grade de Perícias */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '0.75rem',
        }}
      >
        {SKILLS_LIST.map((skill) => {
          // Identifica a fonte específica de treinamento
          let sourceLabel = '';
          let sourceBadgeClass = 'badge-ruby';

          if (classSkills.includes(skill.id)) {
            sourceLabel = 'Treinada por Classe';
            sourceBadgeClass = 'badge-ruby';
          } else if (originSkills.includes(skill.id)) {
            sourceLabel = 'Treinada por Origem';
            sourceBadgeClass = 'badge-gold';
          } else if (raceSkills.includes(skill.id)) {
            sourceLabel = 'Treinada por Raça';
            sourceBadgeClass = 'badge-green';
          }

          const isFixedTrained = Boolean(sourceLabel);
          const isTrainedByInt = selectedIntSkills.includes(skill.id);
          const isTrained = isFixedTrained || isTrainedByInt;

          return (
            <div
              key={skill.id}
              className="t20-card"
              style={{
                padding: '0.75rem 1rem',
                borderColor: isTrained
                  ? isTrainedByInt
                    ? 'var(--t20-mana-light)'
                    : isFixedTrained && sourceBadgeClass === 'badge-gold'
                    ? 'var(--t20-gold)'
                    : 'var(--t20-ruby)'
                  : 'var(--border-color)',
                background: isTrained ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0,0,0,0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.5rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: isTrained ? '#ffffff' : 'var(--text-muted)' }}>
                      {skill.name}
                    </span>
                    <span className="badge badge-slate" style={{ fontSize: '0.65rem' }}>
                      {skill.attribute.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.25rem' }}>
                    {skill.trainedOnly && (
                      <span style={{ fontSize: '0.65rem', color: 'var(--t20-gold)' }}>
                        ★ Somente Treinada
                      </span>
                    )}
                    {skill.armorPenalty && (
                      <span style={{ fontSize: '0.65rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        <ShieldAlert size={10} /> Penalidade Armadura
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onOpenDetail({
                      title: skill.name,
                      category: `Perícia (${skill.attribute.toUpperCase()})`,
                      subtitle: skill.trainedOnly ? 'Exige treinamento para testes complexos' : 'Pode ser usada destreinada',
                      description: skill.description,
                    })
                  }
                  className="btn btn-ghost"
                  style={{ padding: '0.2rem', color: 'var(--text-dim)' }}
                  title="Ver regras da perícia"
                >
                  <Info size={14} />
                </button>
              </div>

              {/* Status de Treinamento com Especificação Exata da Origem */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.4rem' }}>
                {isFixedTrained ? (
                  <span className={`badge ${sourceBadgeClass}`} style={{ fontSize: '0.725rem', padding: '0.25rem 0.5rem' }}>
                    <Check size={12} /> {sourceLabel}
                  </span>
                ) : isTrainedByInt ? (
                  <button
                    type="button"
                    onClick={() => handleToggleIntSkill(skill.id)}
                    className="btn btn-primary"
                    style={{
                      padding: '0.3rem 0.65rem',
                      fontSize: '0.75rem',
                      width: '100%',
                      justifyContent: 'center',
                      background: 'rgba(59, 130, 246, 0.25)',
                      borderColor: 'var(--t20-mana-light)',
                      color: '#ffffff',
                    }}
                    title="Clique para desmarcar e escolher outra perícia"
                  >
                    <Check size={12} /> Treinada por Inteligência (Remover)
                  </button>
                ) : intBonus > 0 && remainingIntPicks > 0 ? (
                  <button
                    type="button"
                    onClick={() => handleToggleIntSkill(skill.id)}
                    className="btn btn-secondary"
                    style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem', width: '100%', justifyContent: 'center' }}
                  >
                    + Treinar com Inteligência
                  </button>
                ) : (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Não treinada</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
