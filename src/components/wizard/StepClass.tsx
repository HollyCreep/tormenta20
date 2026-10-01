import React, { useState } from 'react';
import { CLASSES_LIST } from '../../data/classes';
import { SKILLS_LIST } from '../../data/skills';
import { RULES_CITATIONS } from '../../data/rulesCitations';
import { ClassDefinition } from '../../types/rules';
import { Check, Info, Shield, Heart, Zap, Award, Sparkles } from 'lucide-react';
import { DetailModalData } from '../common/DetailModal';

interface StepClassProps {
  selectedClassId: string;
  selectedSubclass?: string;
  selectedClassSkills: string[];
  raceSkills?: string[];
  intSkills?: string[];
  alreadyTrainedSkills?: string[];
  onSelectClass: (classId: string) => void;
  onSelectSubclass: (subclassId: string) => void;
  onSelectClassSkills: (skills: string[]) => void;
  onOpenDetail: (data: DetailModalData) => void;
}

export const StepClass: React.FC<StepClassProps> = ({
  selectedClassId,
  selectedSubclass,
  selectedClassSkills,
  raceSkills = [],
  intSkills = [],
  alreadyTrainedSkills = [],
  onSelectClass,
  onSelectSubclass,
  onSelectClassSkills,
  onOpenDetail,
}) => {
  const [search, setSearch] = useState('');

  const currentClass = CLASSES_LIST.find((c) => c.id === selectedClassId) || CLASSES_LIST[0];

  const filteredClasses = CLASSES_LIST.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleClassSkill = (skillId: string) => {
    // Perícias obrigatórias ou já treinadas na raça não podem ser selecionadas aqui
    if (currentClass.mandatorySkills.includes(skillId) || alreadyTrainedSkills.includes(skillId)) return;

    if (selectedClassSkills.includes(skillId)) {
      onSelectClassSkills(selectedClassSkills.filter((s) => s !== skillId));
    } else {
      if (selectedClassSkills.length < currentClass.skillChoicesCount) {
        onSelectClassSkills([...selectedClassSkills, skillId]);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Cabeçalho */}
      <div>
        <h2>Passo 2: Escolha sua Classe</h2>
        <p>
          A classe é a profissão do seu herói em Arton. Ela define seus pontos de vida, pontos de mana, armas e armaduras que você sabe usar, perícias treinadas e habilidades marciais ou mágicas.
        </p>
      </div>

      {/* Busca */}
      <div style={{ maxWidth: '300px' }}>
        <input
          type="text"
          placeholder="Buscar classe ou função..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '0.45rem 0.8rem', fontSize: '0.9rem' }}
        />
      </div>

      {/* Grade de Classes */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '0.85rem',
        }}
      >
        {filteredClasses.map((cls) => {
          const isSelected = cls.id === selectedClassId;
          return (
            <div
              key={cls.id}
              onClick={() => onSelectClass(cls.id)}
              className="t20-card"
              style={{
                cursor: 'pointer',
                borderColor: isSelected ? 'var(--t20-ruby)' : 'var(--border-color)',
                background: isSelected ? 'rgba(230, 57, 70, 0.12)' : 'var(--bg-card)',
                boxShadow: isSelected ? '0 0 15px rgba(230, 57, 70, 0.35)' : 'none',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                  <h3 style={{ fontSize: '1.15rem', color: isSelected ? 'var(--t20-gold-light)' : '#ffffff', margin: 0 }}>
                    {cls.name}
                  </h3>
                  {isSelected && <Check size={18} style={{ color: 'var(--t20-ruby)' }} />}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>
                  {cls.role}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                <span className="badge badge-ruby" style={{ fontSize: '0.65rem' }}>
                  <Heart size={10} />
                  {cls.hpInitial} PV
                </span>
                <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>
                  <Zap size={10} />
                  {cls.mpInitial} PM
                </span>
                <span className="badge badge-slate" style={{ fontSize: '0.65rem' }}>
                  {cls.skillChoicesCount + cls.mandatorySkills.length} Perícias
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detalhes da Classe Selecionada */}
      {currentClass && (
        <div className="t20-card t20-card-gold" style={{ marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--t20-gold-light)', margin: 0 }}>
                  {currentClass.name}
                </h3>
                <span className="badge badge-ruby">{currentClass.role}</span>
                <span className="badge badge-slate">
                  Atributos-chave: {currentClass.primaryAttributes.map((a) => a.toUpperCase()).join(' e ')}
                </span>
              </div>
              <p style={{ marginTop: '0.5rem', fontSize: '0.925rem', color: '#cbd5e1' }}>
                {currentClass.description}
              </p>
            </div>
          </div>

          {/* Vigor e Proficiências */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f87171', fontWeight: 700, marginBottom: '0.25rem' }}>
                <Heart size={16} />
                <span>Pontos de Vida (PV)</span>
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Inicial: <strong style={{ color: '#ffffff' }}>{currentClass.hpInitial} + Constituição</strong>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                Por nível: {currentClass.hpPerLevel} + Con
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#60a5fa', fontWeight: 700, marginBottom: '0.25rem' }}>
                <Zap size={16} />
                <span>Pontos de Mana (PM)</span>
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Inicial: <strong style={{ color: '#ffffff' }}>{currentClass.mpInitial} PM</strong>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                Por nível: {currentClass.mpPerLevel} PM
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--t20-gold-light)', fontWeight: 700, marginBottom: '0.25rem' }}>
                <Shield size={16} />
                <span>Proficiências</span>
              </div>
              <div style={{ fontSize: '0.825rem', color: '#cbd5e1' }}>
                Armas: {currentClass.proficiencies.weapons.join(', ')}
              </div>
              <div style={{ fontSize: '0.825rem', color: '#cbd5e1' }}>
                Armaduras: {currentClass.proficiencies.armor.length > 0 ? currentClass.proficiencies.armor.join(', ') : 'Nenhuma'}
                {currentClass.proficiencies.shields ? ', Escudos' : ''}
              </div>
            </div>
          </div>

          {/* Subclasse / Caminho Arcano (se Arcanista) */}
          {currentClass.subclasses && (
            <div style={{ marginBottom: '1.5rem', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-gold)' }}>
              <div style={{ fontWeight: 700, color: 'var(--t20-gold-light)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={16} />
                <span>{currentClass.subclasses.title}:</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                {currentClass.subclasses.options.map((opt) => {
                  const isSelected = selectedSubclass === opt.id || (!selectedSubclass && opt.id === 'mago');
                  return (
                    <div
                      key={opt.id}
                      onClick={() => onSelectSubclass(opt.id)}
                      className="t20-card"
                      style={{
                        cursor: 'pointer',
                        borderColor: isSelected ? 'var(--t20-gold)' : 'var(--border-color)',
                        background: isSelected ? 'rgba(245, 158, 11, 0.12)' : 'var(--bg-surface)',
                        padding: '0.85rem',
                      }}
                    >
                      <div style={{ fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>{opt.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{opt.description}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Seleção de Perícias da Classe */}
          <div style={{ marginBottom: '1.5rem', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <span style={{ fontWeight: 700, color: 'var(--t20-gold-light)', fontSize: '0.95rem' }}>
                  Perícias de Classe:
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginLeft: '0.5rem' }}>
                  Obrigatórias ({currentClass.mandatorySkills.join(', ')}) mais {currentClass.skillChoicesCount} à sua escolha
                </span>
              </div>
              <span className="badge badge-gold">
                {selectedClassSkills.length} de {currentClass.skillChoicesCount} opcionais escolhidas
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.5rem' }}>
              {/* Perícias Obrigatórias */}
              {currentClass.mandatorySkills.map((skId) => {
                const skDef = SKILLS_LIST.find((s) => s.id === skId);
                return (
                  <div
                    key={skId}
                    className="btn btn-secondary"
                    style={{
                      padding: '0.45rem 0.65rem',
                      fontSize: '0.825rem',
                      justifyContent: 'space-between',
                      borderColor: 'var(--t20-ruby)',
                      background: 'rgba(230, 57, 70, 0.15)',
                      cursor: 'default',
                    }}
                  >
                    <span>{skDef?.name || skId}</span>
                    <span className="badge badge-ruby" style={{ fontSize: '0.6rem', padding: '0.1rem 0.3rem' }}>
                      Obrigatória
                    </span>
                  </div>
                );
              })}

              {/* Perícias Opcionais da Lista da Classe */}
              {currentClass.skillOptions.map((skId) => {
                const isMandatory = currentClass.mandatorySkills.includes(skId);
                if (isMandatory) return null;

                const skDef = SKILLS_LIST.find((s) => s.id === skId);
                const isChecked = selectedClassSkills.includes(skId);
                const isTrainedByRace = raceSkills.includes(skId) || alreadyTrainedSkills.includes(skId);
                const isTrainedByInt = intSkills.includes(skId);

                if (isTrainedByRace || isTrainedByInt) {
                  const sourceLabel = isTrainedByInt ? 'Inteligência' : 'Raça';
                  const badgeClass = isTrainedByInt ? 'badge-blue' : 'badge-green';

                  return (
                    <div
                      key={skId}
                      className="btn btn-secondary"
                      style={{
                        padding: '0.45rem 0.65rem',
                        fontSize: '0.825rem',
                        justifyContent: 'space-between',
                        opacity: 0.7,
                        cursor: 'not-allowed',
                        borderColor: 'var(--border-color)',
                        background: 'rgba(0,0,0,0.35)',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      title={`Esta perícia já foi escolhida como bônus de sua ${sourceLabel}.`}
                    >
                      <span style={{ textDecoration: 'line-through' }}>{skDef?.name || skId}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span className={`badge ${badgeClass}`} style={{ fontSize: '0.625rem', padding: '0.12rem 0.35rem' }}>
                          {sourceLabel}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenDetail({
                              title: `${skDef?.name || skId} — Já Treinada por ${sourceLabel}`,
                              category: 'Regra Oficial • Tormenta 20 JDA',
                              subtitle: `Treinada por ${sourceLabel} (Não Cumulativo)`,
                              description: `Esta perícia já foi aprendida através de sua ${sourceLabel}. O manual de Tormenta 20 estabelece que bônus de treinamento não se acumulam.`,
                              ruleCitation: RULES_CITATIONS.SKILL_TRAINING_NO_STACK,
                            });
                          }}
                          className="btn btn-ghost"
                          style={{ padding: '0.1rem 0.2rem', color: 'var(--text-dim)', cursor: 'pointer' }}
                          title="Ver regra de não cumulatividade no manual oficial"
                        >
                          <Info size={12} />
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <button
                    key={skId}
                    type="button"
                    onClick={() => handleToggleClassSkill(skId)}
                    className={`btn ${isChecked ? 'btn-gold' : 'btn-secondary'}`}
                    style={{
                      padding: '0.45rem 0.65rem',
                      fontSize: '0.825rem',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{skDef?.name || skId}</span>
                    {isChecked && <Check size={14} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Habilidades de 1º Nível */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Habilidades de 1º Nível
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {currentClass.abilitiesLevel1.map((ability) => (
                <div
                  key={ability.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 700, color: 'var(--t20-gold-light)', fontSize: '0.95rem' }}>
                        {ability.name}
                      </span>
                      {ability.cost && (
                        <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>
                          {ability.cost}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenDetail({
                          title: ability.name,
                          category: 'Habilidade de Classe',
                          cost: ability.cost,
                          description: ability.description,
                        })
                      }
                      className="btn btn-ghost"
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', gap: '0.25rem' }}
                    >
                      <Info size={14} />
                      Detalhes
                    </button>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#cbd5e1' }}>
                    {ability.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
