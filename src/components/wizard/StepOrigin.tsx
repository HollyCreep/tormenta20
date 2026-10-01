import React, { useState } from 'react';
import { ORIGINS_LIST } from '../../data/origins';
import { SKILLS_LIST } from '../../data/skills';
import { RULES_CITATIONS } from '../../data/rulesCitations';
import { Origin } from '../../types/rules';
import { Check, Info, Package, Sparkles } from 'lucide-react';
import { DetailModalData } from '../common/DetailModal';

interface StepOriginProps {
  selectedOriginId: string;
  selectedOriginBenefits: { type: 'pericia' | 'poder'; name: string }[];
  raceSkills?: string[];
  classSkills?: string[];
  intSkills?: string[];
  alreadyTrainedSkills?: string[];
  onSelectOrigin: (originId: string) => void;
  onSelectOriginBenefits: (benefits: { type: 'pericia' | 'poder'; name: string }[]) => void;
  onOpenDetail: (data: DetailModalData) => void;
}

export const StepOrigin: React.FC<StepOriginProps> = ({
  selectedOriginId,
  selectedOriginBenefits,
  raceSkills = [],
  classSkills = [],
  intSkills = [],
  alreadyTrainedSkills = [],
  onSelectOrigin,
  onSelectOriginBenefits,
  onOpenDetail,
}) => {
  const [search, setSearch] = useState('');
  const [showSubstitutions, setShowSubstitutions] = useState(false);

  const currentOrigin = ORIGINS_LIST.find((o) => o.id === selectedOriginId) || ORIGINS_LIST[0];

  const filteredOrigins = ORIGINS_LIST.filter(
    (o) =>
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleBenefit = (type: 'pericia' | 'poder', name: string) => {
    const isSelected = selectedOriginBenefits.some((b) => b.type === type && b.name === name);
    // Sempre permite desmarcar/remover um benefício previamente selecionado
    if (isSelected) {
      onSelectOriginBenefits(selectedOriginBenefits.filter((b) => !(b.type === type && b.name === name)));
      return;
    }

    // Não permite selecionar nova perícia se ela já for treinada pela raça ou classe
    if (type === 'pericia' && alreadyTrainedSkills.includes(name)) return;

    if (selectedOriginBenefits.length < 2) {
      onSelectOriginBenefits([...selectedOriginBenefits, { type, name }]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Cabeçalho */}
      <div>
        <h2>Passo 3: Escolha sua Origem</h2>
        <p>
          O que você fazia antes de se tornar um aventureiro? Sua origem concede itens iniciais e dois benefícios à sua escolha entre as perícias e poderes listados.
        </p>
      </div>

      {/* Busca */}
      <div style={{ maxWidth: '300px' }}>
        <input
          type="text"
          placeholder="Buscar origem..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '0.45rem 0.8rem', fontSize: '0.9rem' }}
        />
      </div>

      {/* Grade de Origens */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
          gap: '0.75rem',
          maxHeight: '260px',
          overflowY: 'auto',
          padding: '0.25rem',
        }}
      >
        {filteredOrigins.map((orig) => {
          const isSelected = orig.id === selectedOriginId;
          return (
            <div
              key={orig.id}
              onClick={() => {
                onSelectOrigin(orig.id);
                // Reseta os benefícios ao mudar de origem
                onSelectOriginBenefits([]);
              }}
              className="t20-card"
              style={{
                cursor: 'pointer',
                borderColor: isSelected ? 'var(--t20-ruby)' : 'var(--border-color)',
                background: isSelected ? 'rgba(230, 57, 70, 0.12)' : 'var(--bg-card)',
                boxShadow: isSelected ? '0 0 15px rgba(230, 57, 70, 0.35)' : 'none',
                padding: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '0.95rem', color: isSelected ? 'var(--t20-gold-light)' : '#ffffff' }}>
                {orig.name}
              </div>
              {isSelected && <Check size={16} style={{ color: 'var(--t20-ruby)' }} />}
            </div>
          );
        })}
      </div>

      {/* Detalhes da Origem Selecionada */}
      {currentOrigin && (
        <div className="t20-card t20-card-gold" style={{ marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--t20-gold-light)', margin: 0 }}>
                {currentOrigin.name}
              </h3>
              <p style={{ marginTop: '0.35rem', fontSize: '0.925rem', color: '#cbd5e1' }}>
                {currentOrigin.description}
              </p>
            </div>
          </div>

          {/* Itens Iniciais da Origem */}
          <div style={{ marginBottom: '1.25rem', background: 'rgba(0,0,0,0.3)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--t20-gold)', fontWeight: 700, marginBottom: '0.35rem' }}>
              <Package size={16} />
              <span>Itens Iniciais Garantidos:</span>
            </div>
            <ul style={{ paddingLeft: '1.25rem', color: '#cbd5e1', fontSize: '0.875rem' }}>
              {currentOrigin.items.map((it, idx) => (
                <li key={idx}>{it}</li>
              ))}
            </ul>
          </div>

          {/* Seleção dos 2 Benefícios */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontWeight: 700, color: 'var(--t20-gold-light)', fontSize: '1rem' }}>
                Escolha 2 Benefícios (Perícias ou Poderes):
              </span>
              <span className={`badge ${selectedOriginBenefits.length === 2 ? 'badge-green' : 'badge-gold'}`}>
                {selectedOriginBenefits.length} de 2 benefícios escolhidos
              </span>
            </div>

            {/* Opções de Perícias */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Perícias Disponíveis:
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {currentOrigin.skills.map((skId) => {
                  const skDef = SKILLS_LIST.find((s) => s.id === skId);
                  const isChecked = selectedOriginBenefits.some((b) => b.type === 'pericia' && b.name === skId);
                  const isAlreadyTrained = alreadyTrainedSkills.includes(skId);

                  if (isAlreadyTrained) {
                    const getTrainedSource = () => {
                      if (classSkills.includes(skId)) {
                        return { label: 'Classe', badgeClass: 'badge-ruby', title: 'Perícia já treinada por sua Classe' };
                      }
                      if (raceSkills.includes(skId)) {
                        return { label: 'Raça', badgeClass: 'badge-green', title: 'Perícia já treinada por sua Raça' };
                      }
                      if (intSkills.includes(skId)) {
                        return { label: 'Inteligência', badgeClass: 'badge-blue', title: 'Perícia já treinada por sua Inteligência' };
                      }
                      return { label: 'Já Treinada', badgeClass: 'badge-slate', title: 'Perícia já treinada' };
                    };

                    const source = getTrainedSource();

                    if (isChecked) {
                      return (
                        <div
                          key={skId}
                          className="btn"
                          style={{
                            padding: '0.45rem 0.75rem',
                            fontSize: '0.85rem',
                            borderColor: '#ef4444',
                            background: 'rgba(239, 68, 68, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                          }}
                        >
                          <span style={{ fontWeight: 700, color: '#fca5a5' }}>{skDef?.name || skId}</span>
                          <span className={`badge ${source.badgeClass}`} style={{ fontSize: '0.65rem', padding: '0.12rem 0.4rem' }}>
                            {source.label}
                          </span>
                          <span className="badge badge-ruby" style={{ fontSize: '0.65rem', padding: '0.12rem 0.4rem' }}>
                            Conflito
                          </span>
                          <button
                            type="button"
                            onClick={() => handleToggleBenefit('pericia', skId)}
                            className="btn btn-secondary"
                            style={{
                              padding: '0.15rem 0.45rem',
                              fontSize: '0.75rem',
                              color: '#fca5a5',
                              borderColor: '#ef4444',
                              marginLeft: '0.25rem',
                              cursor: 'pointer',
                            }}
                            title="Esta perícia já foi concedida por sua classe/raça. Clique para desmarcá-la."
                          >
                            ✕ Desmarcar
                          </button>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={skId}
                        className="btn btn-secondary"
                        style={{
                          padding: '0.45rem 0.75rem',
                          fontSize: '0.85rem',
                          opacity: 0.75,
                          cursor: 'not-allowed',
                          borderColor: 'var(--border-color)',
                          background: 'rgba(0,0,0,0.35)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                        }}
                        title={`${skDef?.name || skId}: ${source.title}`}
                      >
                        <span style={{ textDecoration: 'line-through' }}>{skDef?.name || skId}</span>
                        <span className={`badge ${source.badgeClass}`} style={{ fontSize: '0.65rem', padding: '0.12rem 0.4rem' }}>
                          {source.label}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenDetail({
                              title: `${skDef?.name || skId} — Perícia Já Treinada (${source.label})`,
                              category: 'Regra Oficial • Tormenta 20 JDA',
                              subtitle: `Fonte de Treinamento: ${source.label}`,
                              description: `Esta perícia já foi concedida como treinada por sua ${source.label}. Em Tormenta 20, não é possível acumular treinamento duplicado na mesma perícia.`,
                              ruleCitation: RULES_CITATIONS.SKILL_TRAINING_NO_STACK,
                            });
                          }}
                          className="btn btn-ghost"
                          style={{ padding: '0.1rem 0.25rem', color: 'var(--text-dim)', cursor: 'pointer' }}
                          title="Consultar regra de não cumulatividade no manual oficial"
                        >
                          <Info size={13} />
                        </button>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={skId}
                      type="button"
                      onClick={() => handleToggleBenefit('pericia', skId)}
                      className={`btn ${isChecked ? 'btn-gold' : 'btn-secondary'}`}
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
                    >
                      <span>{skDef?.name || skId}</span>
                      {isChecked && <Check size={14} />}
                    </button>
                  );
                })}
              </div>

              {/* Substituição livre caso já possua a perícia da origem */}
              {currentOrigin.skills.some((skId) => alreadyTrainedSkills.includes(skId)) && (
                <div style={{ marginTop: '0.75rem', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: 'var(--radius-sm)', padding: '0.65rem 0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--t20-gold-light)', fontWeight: 600 }}>
                        Regra T20: Como você já possui perícia da origem treinada, pode escolher outra qualquer:
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          onOpenDetail({
                            title: 'Regra de Substituição de Perícia da Origem',
                            category: 'Regra Oficial • Tormenta 20 JDA',
                            subtitle: 'Capítulo 1: Construção de Personagem — Origens (Manual pág. 95)',
                            description:
                              'Em Tormenta 20, uma perícia só pode ser treinada uma vez (não é cumulativa). Quando a sua origem fornece uma perícia que você já aprendeu pela sua raça ou classe, você tem o direito de substituí-la por qualquer outra perícia à sua escolha.',
                            ruleCitation: RULES_CITATIONS.ORIGIN_SKILL_REPLACEMENT,
                          })
                        }
                        className="btn btn-ghost"
                        style={{
                          padding: '0.15rem 0.45rem',
                          fontSize: '0.75rem',
                          color: 'var(--t20-gold)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          background: 'rgba(245, 158, 11, 0.12)',
                          border: '1px solid rgba(245, 158, 11, 0.35)',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                        }}
                        title="Clique para ver o trecho completo da regra e página no manual oficial"
                      >
                        <Info size={14} />
                        <span>Ver Regra no Manual (pág. 95)</span>
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowSubstitutions(!showSubstitutions)}
                      className="btn btn-ghost"
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', color: 'var(--t20-gold)', border: '1px solid rgba(245, 158, 11, 0.3)' }}
                    >
                      {showSubstitutions ? 'Ocultar Lista' : 'Escolher Outra Perícia'}
                    </button>
                  </div>
                  {showSubstitutions && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.35rem', maxHeight: '150px', overflowY: 'auto', marginTop: '0.5rem' }}>
                      {SKILLS_LIST.filter((s) => !alreadyTrainedSkills.includes(s.id)).map((sk) => {
                        const isChecked = selectedOriginBenefits.some((b) => b.type === 'pericia' && b.name === sk.id);
                        return (
                          <button
                            key={sk.id}
                            type="button"
                            onClick={() => handleToggleBenefit('pericia', sk.id)}
                            className={`btn ${isChecked ? 'btn-gold' : 'btn-secondary'}`}
                            style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem', justifyContent: 'space-between' }}
                          >
                            <span>{sk.name}</span>
                            {isChecked && <Check size={12} />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Opções de Poderes */}
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Poderes Disponíveis:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {currentOrigin.powers.map((pow, idx) => {
                  const isChecked = selectedOriginBenefits.some((b) => b.type === 'poder' && b.name === pow.name);
                  return (
                    <div
                      key={idx}
                      onClick={() => handleToggleBenefit('poder', pow.name)}
                      className="t20-card"
                      style={{
                        cursor: 'pointer',
                        padding: '0.85rem 1rem',
                        borderColor: isChecked ? 'var(--t20-gold)' : 'var(--border-color)',
                        background: isChecked ? 'rgba(245, 158, 11, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.35rem',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontWeight: 700, color: isChecked ? 'var(--t20-gold-light)' : '#ffffff' }}>
                            {pow.name}
                          </span>
                          <span className="badge badge-slate" style={{ fontSize: '0.65rem' }}>
                            {pow.type}
                          </span>
                          {isChecked && <Check size={16} style={{ color: 'var(--t20-gold)' }} />}
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenDetail({
                              title: pow.name,
                              category: `Poder de Origem (${pow.type})`,
                              description: pow.description,
                            });
                          }}
                          className="btn btn-ghost"
                          style={{ padding: '0.2rem 0.4rem', fontSize: '0.75rem', gap: '0.25rem' }}
                        >
                          <Info size={14} />
                          Ver Detalhes
                        </button>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1' }}>
                        {pow.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
