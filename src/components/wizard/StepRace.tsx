import React, { useState } from 'react';
import { RACES_LIST } from '../../data/races';
import { Race, AttributeKey } from '../../types/rules';
import { ATTRIBUTES_LIST } from '../../data/attributes';
import { SKILLS_LIST } from '../../data/skills';
import { GENERAL_POWERS_LIST } from '../../data/generalPowers';
import { HelpCircle, Check, Info, AlertCircle, Sparkles } from 'lucide-react';
import { DetailModalData } from '../common/DetailModal';
import { PrerequisiteContext, checkPowerPrerequisites } from '../../utils/rulesValidation';
import { RULES_CITATIONS } from '../../data/rulesCitations';

interface StepRaceProps {
  selectedRaceId: string;
  selectedSubraceId?: string;
  selectedRacialAttributes?: AttributeKey[];
  selectedRacialSkills?: string[];
  selectedRacialPower?: string;
  prerequisiteContext?: PrerequisiteContext;
  classMandatorySkills?: string[];
  onSelectRace: (raceId: string) => void;
  onSelectSubrace: (subraceId: string) => void;
  onSelectRacialAttributes: (attrs: AttributeKey[]) => void;
  onSelectRacialSkills: (skills: string[]) => void;
  onSelectRacialPower: (powerId: string) => void;
  onOpenDetail: (data: DetailModalData) => void;
}

export const StepRace: React.FC<StepRaceProps> = ({
  selectedRaceId,
  selectedSubraceId,
  selectedRacialAttributes = [],
  selectedRacialSkills = [],
  selectedRacialPower,
  prerequisiteContext,
  classMandatorySkills = [],
  onSelectRace,
  onSelectSubrace,
  onSelectRacialAttributes,
  onSelectRacialSkills,
  onSelectRacialPower,
  onOpenDetail,
}) => {
  const [filter, setFilter] = useState<'todas' | 'padrao' | 'rara'>('todas');
  const [search, setSearch] = useState('');
  const [racialOption, setRacialOption] = useState<'skills' | 'power'>(
    selectedRacialPower ? 'power' : 'skills'
  );
  const [powerCategoryFilter, setPowerCategoryFilter] = useState<'todas' | 'combate' | 'destino' | 'magia' | 'tormenta'>('todas');
  const [powerSearch, setPowerSearch] = useState('');
  const [onlyEligiblePowers, setOnlyEligiblePowers] = useState(false);

  const currentRace = RACES_LIST.find((r) => r.id === selectedRaceId) || RACES_LIST[0];

  // Sincroniza modo quando mudar o selectedRacialPower
  React.useEffect(() => {
    if (selectedRacialPower) {
      setRacialOption('power');
    }
  }, [selectedRacialPower]);

  const filteredRaces = RACES_LIST.filter((r) => {
    const matchesFilter = filter === 'todas' || r.category === filter;
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleToggleAttribute = (attr: AttributeKey) => {
    const limit = currentRace.selectableAttributesCount || 3;
    if (selectedRacialAttributes.includes(attr)) {
      onSelectRacialAttributes(selectedRacialAttributes.filter((a) => a !== attr));
    } else {
      if (selectedRacialAttributes.length < limit) {
        onSelectRacialAttributes([...selectedRacialAttributes, attr]);
      }
    }
  };

  const maxSkills =
    currentRace.id === 'humano'
      ? racialOption === 'power'
        ? 1
        : 2
      : currentRace.id === 'osteon'
      ? racialOption === 'power'
        ? 0
        : 1
      : currentRace.id === 'lefou'
      ? racialOption === 'power'
        ? 0
        : 2
      : currentRace.customSelections?.skillChoiceCount || 0;

  const handleSelectOption = (opt: 'skills' | 'power') => {
    setRacialOption(opt);
    if (opt === 'skills') {
      onSelectRacialPower('');
    } else {
      if (currentRace.id === 'humano' && selectedRacialSkills.length > 1) {
        onSelectRacialSkills(selectedRacialSkills.slice(0, 1));
      } else if (currentRace.id === 'osteon' || currentRace.id === 'lefou') {
        onSelectRacialSkills([]);
      }
    }
  };

  const handleToggleSkill = (skillId: string) => {
    if (classMandatorySkills.includes(skillId)) return;
    if (selectedRacialSkills.includes(skillId)) {
      onSelectRacialSkills(selectedRacialSkills.filter((s) => s !== skillId));
    } else {
      if (selectedRacialSkills.length < maxSkills) {
        onSelectRacialSkills([...selectedRacialSkills, skillId]);
      }
    }
  };

  const handleTogglePower = (powerId: string) => {
    if (selectedRacialPower === powerId) {
      onSelectRacialPower('');
      return;
    }
    if (prerequisiteContext) {
      const res = checkPowerPrerequisites(powerId, prerequisiteContext);
      if (!res.isMet) {
        alert(`Você não atende aos pré-requisitos deste poder:\n• ${res.unmetRequirements.join('\n• ')}`);
        return;
      }
    }
    onSelectRacialPower(powerId);
  };

  const availablePowers = GENERAL_POWERS_LIST.filter((p) => {
    if (currentRace.id === 'lefou' && p.category !== 'tormenta') return false;
    const matchesCat =
      currentRace.id === 'lefou'
        ? true
        : powerCategoryFilter === 'todas' || p.category === powerCategoryFilter;
    const matchesSearch =
      p.name.toLowerCase().includes(powerSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(powerSearch.toLowerCase()) ||
      (p.prerequisites && p.prerequisites.toLowerCase().includes(powerSearch.toLowerCase()));
    if (!matchesCat || !matchesSearch) return false;

    if (onlyEligiblePowers && prerequisiteContext) {
      const res = checkPowerPrerequisites(p.id, prerequisiteContext);
      if (!res.isMet) return false;
    }

    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Cabeçalho da Etapa */}
      <div>
        <h2>Passo 1: Escolha sua Raça</h2>
        <p>
          Enquanto a classe define sua vocação de aventureiro, a raça determina sua origem biológica, traços físicos, bônus nos atributos e habilidades ancestrais únicas de Arton.
        </p>
      </div>

      {/* Filtros e Busca */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => setFilter('todas')}
            className={`btn ${filter === 'todas' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
          >
            Todas (17)
          </button>
          <button
            type="button"
            onClick={() => setFilter('padrao')}
            className={`btn ${filter === 'padrao' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
          >
            Comuns (8)
          </button>
          <button
            type="button"
            onClick={() => setFilter('rara')}
            className={`btn ${filter === 'rara' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
          >
            Raras / Míticas (9)
          </button>
        </div>
        <div style={{ maxWidth: '280px', width: '100%' }}>
          <input
            type="text"
            placeholder="Buscar raça..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '0.45rem 0.8rem', fontSize: '0.9rem' }}
          />
        </div>
      </div>

      {/* Grade de Raças */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '0.85rem',
        }}
      >
        {filteredRaces.map((race) => {
          const isSelected = race.id === selectedRaceId;
          return (
            <div
              key={race.id}
              onClick={() => onSelectRace(race.id)}
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                  <h3 style={{ fontSize: '1.05rem', color: isSelected ? 'var(--t20-gold-light)' : '#ffffff', margin: 0 }}>
                    {race.name}
                  </h3>
                  {isSelected && <Check size={18} style={{ color: 'var(--t20-ruby)' }} />}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>
                  {race.category === 'padrao' ? 'Raça Comum' : 'Raça Rara'} • {race.size}
                </div>
              </div>

              {/* Modificadores resumidos */}
              <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                {race.isSelectableAttributes ? (
                  <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
                    +1 em {race.selectableAttributesCount} livres
                  </span>
                ) : (
                  Object.entries(race.attributeModifiers).map(([attr, val]) => (
                    <span
                      key={attr}
                      className="badge"
                      style={{
                        fontSize: '0.65rem',
                        padding: '0.15rem 0.4rem',
                        background: val! > 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: val! > 0 ? '#34d399' : '#f87171',
                      }}
                    >
                      {attr.toUpperCase()} {val! > 0 ? `+${val}` : val}
                    </span>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detalhes da Raça Selecionada */}
      {currentRace && (
        <div className="t20-card t20-card-gold" style={{ marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--t20-gold-light)', margin: 0 }}>
                  {currentRace.name}
                </h3>
                <span className="badge badge-ruby">{currentRace.size}</span>
                <span className="badge badge-blue">Deslocamento {currentRace.speed}m</span>
              </div>
              <p style={{ marginTop: '0.5rem', fontSize: '0.925rem', color: '#cbd5e1' }}>
                {currentRace.description}
              </p>
            </div>
          </div>

          {/* Configuração de Atributos Selecionáveis (Humano, Lefou, Osteon, Sereia) */}
          {currentRace.isSelectableAttributes && (
            <div style={{ marginBottom: '1.5rem', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-gold)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--t20-gold-light)', fontSize: '0.95rem' }}>
                  Escolha {currentRace.selectableAttributesCount} atributos diferentes para receber +{currentRace.selectableAttributesBonus || 1}:
                </span>
                <span className="badge badge-gold">
                  {selectedRacialAttributes.length} de {currentRace.selectableAttributesCount} escolhidos
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem' }}>
                {ATTRIBUTES_LIST.map((attr) => {
                  const isExcluded = currentRace.selectableAttributesExclude?.includes(attr.key);
                  const isChecked = selectedRacialAttributes.includes(attr.key);
                  return (
                    <button
                      key={attr.key}
                      type="button"
                      disabled={isExcluded}
                      onClick={() => handleToggleAttribute(attr.key)}
                      className={`btn ${isChecked ? 'btn-gold' : 'btn-secondary'}`}
                      style={{
                        padding: '0.6rem 0.25rem',
                        fontSize: '0.85rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        opacity: isExcluded ? 0.3 : 1,
                      }}
                    >
                      <span style={{ fontWeight: 800 }}>{attr.shortName}</span>
                      <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>+1</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Escolha de Sub-raça (Suraggel: Aggelus ou Sulfure) */}
          {currentRace.customSelections?.requiresSubrace && (
            <div style={{ marginBottom: '1.5rem', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 700, color: 'var(--t20-gold-light)', marginBottom: '0.5rem' }}>
                Escolha a sua Linhagem Suraggel:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {currentRace.customSelections.subraces?.map((sub) => {
                  const isSelected = selectedSubraceId === sub.id;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => onSelectSubrace(sub.id)}
                      className="t20-card"
                      style={{
                        cursor: 'pointer',
                        borderColor: isSelected ? 'var(--t20-gold)' : 'var(--border-color)',
                        background: isSelected ? 'rgba(245, 158, 11, 0.12)' : 'var(--bg-surface)',
                      }}
                    >
                      <div style={{ fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>{sub.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{sub.description}</div>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        {Object.entries(sub.attributeModifiers).map(([attr, val]) => (
                          <span key={attr} className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                            {attr.toUpperCase()} +{val}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Versatilidade / Perícias e Poderes Raciais Extras (Humano, Lefou, Osteon) */}
          {currentRace.customSelections?.requiresSkillChoice && (
            <div
              style={{
                marginBottom: '1.5rem',
                background: 'rgba(0,0,0,0.35)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-gold)',
              }}
            >
              {/* Opções de escolha se a raça permite trocar perícia por poder (Humano, Lefou, Osteon) */}
              {currentRace.customSelections?.allowsGeneralPowerChoice && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <h4 style={{ margin: 0, fontWeight: 700, color: 'var(--t20-gold-light)', fontSize: '1.05rem' }}>
                        {currentRace.id === 'humano' && 'Versátil: Escolha o benefício racial'}
                        {currentRace.id === 'osteon' && 'Memória Póstuma: Escolha sua herança do passado'}
                        {currentRace.id === 'lefou' && 'Deformidade: Escolha sua adaptação da Tormenta'}
                      </h4>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#cbd5e1' }}>
                        {currentRace.id === 'humano' && 'Humanos se tornam treinados em 2 perícias OU trocam 1 perícia por 1 Poder Geral.'}
                        {currentRace.id === 'osteon' && 'Osteons recebem 1 perícia treinada OU 1 Poder Geral da sua antiga raça biológica.'}
                        {currentRace.id === 'lefou' && 'Lefou recebem +2 de bônus em 2 perícias OU 1 Poder da Tormenta à escolha.'}
                      </p>
                    </div>
                  </div>

                  {/* Botões de Alternância de Opção A / Opção B */}
                  <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => handleSelectOption('skills')}
                      className={`btn ${racialOption === 'skills' ? 'btn-gold' : 'btn-secondary'}`}
                      style={{
                        padding: '0.55rem 1.1rem',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        border: racialOption === 'skills' ? '1px solid var(--t20-gold-light)' : '1px solid var(--border-color)',
                      }}
                    >
                      {currentRace.id === 'humano' && 'Opção A: 2 Perícias Treinadas'}
                      {currentRace.id === 'osteon' && 'Opção A: 1 Perícia Treinada'}
                      {currentRace.id === 'lefou' && 'Opção A: 2 Perícias (+2 de Bônus)'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelectOption('power')}
                      className={`btn ${racialOption === 'power' ? 'btn-gold' : 'btn-secondary'}`}
                      style={{
                        padding: '0.55rem 1.1rem',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        border: racialOption === 'power' ? '1px solid var(--t20-gold-light)' : '1px solid var(--border-color)',
                      }}
                    >
                      {currentRace.id === 'humano' && 'Opção B: 1 Perícia Treinada + 1 Poder Geral'}
                      {currentRace.id === 'osteon' && 'Opção B: 1 Poder Geral'}
                      {currentRace.id === 'lefou' && 'Opção B: 1 Poder da Tormenta'}
                    </button>
                  </div>
                </div>
              )}

              {/* SELEÇÃO DE PERÍCIAS (quando maxSkills > 0) */}
              {maxSkills > 0 && (
                <div style={{ marginBottom: racialOption === 'power' && currentRace.id === 'humano' ? '1.5rem' : '0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>
                      {currentRace.id === 'lefou'
                        ? 'Escolha 2 perícias para receber +2 de bônus:'
                        : `Escolha ${maxSkills} perícia${maxSkills > 1 ? 's' : ''} treinada${maxSkills > 1 ? 's' : ''} a sua escolha:`}
                    </span>
                    <span className={`badge ${selectedRacialSkills.length === maxSkills ? 'badge-gold' : 'badge-ruby'}`}>
                      {selectedRacialSkills.length} de {maxSkills} escolhida{maxSkills > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.4rem', maxHeight: '175px', overflowY: 'auto', paddingRight: '0.25rem' }}>
                    {SKILLS_LIST.map((s) => {
                      const isMandatoryClass = classMandatorySkills.includes(s.id);
                      if (isMandatoryClass) {
                        return (
                          <div
                            key={s.id}
                            className="btn btn-secondary"
                            style={{
                              padding: '0.35rem 0.5rem',
                              fontSize: '0.8rem',
                              justifyContent: 'space-between',
                              opacity: 0.7,
                              cursor: 'not-allowed',
                              borderColor: 'var(--border-color)',
                              background: 'rgba(0,0,0,0.35)',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                            title="Esta perícia já é obrigatória de sua classe."
                          >
                            <span style={{ textDecoration: 'line-through' }}>{s.name}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <span className="badge badge-ruby" style={{ fontSize: '0.625rem', padding: '0.1rem 0.35rem' }}>
                                Classe
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenDetail({
                                    title: `${s.name} — Já Treinada por Classe`,
                                    category: 'Regra Oficial • Tormenta 20 JDA',
                                    subtitle: 'Treinamento Obrigatório de Classe (Não Cumulativo)',
                                    description: `Esta perícia é obrigatória da classe que você escolheu. O manual oficial estabelece que o bônus de treino (+2) não se acumula, portanto você deve escolher outra perícia para o bônus racial.`,
                                    ruleCitation: RULES_CITATIONS.SKILL_TRAINING_NO_STACK,
                                  });
                                }}
                                className="btn btn-ghost"
                                style={{ padding: '0.1rem 0.2rem', color: 'var(--text-dim)', cursor: 'pointer' }}
                                title="Ver regra no manual oficial"
                              >
                                <Info size={12} />
                              </button>
                            </div>
                          </div>
                        );
                      }

                      const isChecked = selectedRacialSkills.includes(s.id);
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => handleToggleSkill(s.id)}
                          className={`btn ${isChecked ? 'btn-ruby' : 'btn-secondary'}`}
                          style={{
                            padding: '0.35rem 0.5rem',
                            fontSize: '0.8rem',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span>{s.name}</span>
                          {isChecked && <Check size={14} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SELEÇÃO DE PODER GERAL (quando racialOption === 'power') */}
              {racialOption === 'power' && currentRace.customSelections?.allowsGeneralPowerChoice && (
                <div style={{ borderTop: maxSkills > 0 ? '1px solid var(--border-color)' : 'none', paddingTop: maxSkills > 0 ? '1.25rem' : '0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--t20-gold-light)', fontSize: '0.95rem' }}>
                      {currentRace.id === 'lefou' ? 'Escolha 1 Poder da Tormenta:' : 'Escolha 1 Poder Geral:'}
                    </span>
                    <span className={`badge ${selectedRacialPower ? 'badge-gold' : 'badge-ruby'}`}>
                      {selectedRacialPower
                        ? `Poder Escolhido: ${GENERAL_POWERS_LIST.find((p) => p.id === selectedRacialPower)?.name || selectedRacialPower}`
                        : '1 poder obrigatório pendente'}
                    </span>
                  </div>

                  {/* Filtros de Categoria e Busca de Poderes */}
                  <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '0.75rem', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      {currentRace.id !== 'lefou' && (
                        <div className="btn-group" style={{ display: 'inline-flex', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                          {(['todas', 'combate', 'destino', 'magia', 'tormenta'] as const).map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setPowerCategoryFilter(cat)}
                              className={`btn ${powerCategoryFilter === cat ? 'btn-primary' : 'btn-secondary'}`}
                              style={{
                                padding: '0.3rem 0.65rem',
                                fontSize: '0.75rem',
                                textTransform: 'capitalize',
                                borderRadius: 0,
                                borderRight: '1px solid rgba(255,255,255,0.08)',
                              }}
                            >
                              {cat === 'todas' ? 'Todos os Poderes' : cat}
                            </button>
                          ))}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => setOnlyEligiblePowers(!onlyEligiblePowers)}
                        className={`btn ${onlyEligiblePowers ? 'btn-gold' : 'btn-secondary'}`}
                        style={{
                          padding: '0.3rem 0.65rem',
                          fontSize: '0.75rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          borderColor: onlyEligiblePowers ? 'var(--t20-gold)' : 'var(--border-color)',
                          boxShadow: onlyEligiblePowers ? '0 0 10px rgba(245, 158, 11, 0.3)' : 'none',
                        }}
                      >
                        <Sparkles size={12} />
                        <span>{onlyEligiblePowers ? '✓ Somente os que posso aprender' : 'Somente os que posso aprender'}</span>
                      </button>
                    </div>

                    <div style={{ maxWidth: '240px', width: '100%' }}>
                      <input
                        type="text"
                        placeholder="Buscar poder..."
                        value={powerSearch}
                        onChange={(e) => setPowerSearch(e.target.value)}
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
                      />
                    </div>
                  </div>

                  {/* Grade de Poderes Gerais com Validação de Pré-requisitos em Tempo Real */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                      gap: '0.75rem',
                      maxHeight: '260px',
                      overflowY: 'auto',
                      paddingRight: '0.35rem',
                    }}
                  >
                    {availablePowers.map((p) => {
                      const isSelected = selectedRacialPower === p.id;
                      const prereq = prerequisiteContext
                        ? checkPowerPrerequisites(p.id, prerequisiteContext)
                        : { isMet: true, unmetRequirements: [] };

                      return (
                        <div
                          key={p.id}
                          onClick={() => {
                            if (!prereq.isMet) {
                              alert(`Você não atende aos pré-requisitos para ${p.name}:\n• ${prereq.unmetRequirements.join('\n• ')}`);
                              return;
                            }
                            handleTogglePower(p.id);
                          }}
                          className="t20-card"
                          style={{
                            cursor: prereq.isMet ? 'pointer' : 'not-allowed',
                            padding: '0.85rem',
                            borderColor: isSelected
                              ? 'var(--t20-gold)'
                              : !prereq.isMet
                              ? 'rgba(239, 68, 68, 0.4)'
                              : 'var(--border-color)',
                            background: isSelected
                              ? 'rgba(245, 158, 11, 0.15)'
                              : !prereq.isMet
                              ? 'rgba(20, 10, 10, 0.4)'
                              : 'var(--bg-surface)',
                            opacity: prereq.isMet || isSelected ? 1 : 0.65,
                            boxShadow: isSelected ? '0 0 12px rgba(245, 158, 11, 0.25)' : 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '0.4rem',
                            transition: 'var(--transition)',
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.35rem' }}>
                              <strong style={{ fontSize: '0.95rem', color: isSelected ? 'var(--t20-gold-light)' : !prereq.isMet ? '#cbd5e1' : '#ffffff' }}>
                                {p.name}
                              </strong>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                <span className="badge badge-slate" style={{ fontSize: '0.65rem', textTransform: 'capitalize' }}>
                                  {p.category}
                                </span>
                                {isSelected && <Check size={16} style={{ color: 'var(--t20-gold)' }} />}
                              </div>
                            </div>

                            {/* Feedback claro sobre Pré-requisitos */}
                            {!prereq.isMet ? (
                              <div style={{ fontSize: '0.725rem', color: '#f87171', fontWeight: 600, marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <AlertCircle size={12} />
                                <span>Falta: {prereq.unmetRequirements.join(', ')}</span>
                              </div>
                            ) : p.prerequisites ? (
                              <div style={{ fontSize: '0.725rem', color: '#34d399', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Check size={12} />
                                <span>Requisitos atendidos ({p.prerequisites})</span>
                              </div>
                            ) : null}

                            <p
                              style={{
                                margin: '0.35rem 0 0 0',
                                fontSize: '0.785rem',
                                color: '#94a3b8',
                                lineHeight: 1.35,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {p.description}
                            </p>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.35rem' }}>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenDetail({
                                  title: p.name,
                                  category: `Poder Geral (${p.category.toUpperCase()})`,
                                  prerequisites: p.prerequisites,
                                  description: p.description,
                                });
                              }}
                              className="btn btn-ghost"
                              style={{ padding: '0.2rem 0.5rem', fontSize: '0.725rem', gap: '0.25rem' }}
                            >
                              <Info size={13} />
                              Ver Detalhes
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Lista de Habilidades de Raça */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Habilidades de Raça
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {currentRace.abilities.map((ability) => (
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
                          category: 'Habilidade de Raça',
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
