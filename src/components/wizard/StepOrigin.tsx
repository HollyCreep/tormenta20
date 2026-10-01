import React, { useState } from 'react';
import { ORIGINS_LIST } from '../../data/origins';
import { SKILLS_LIST } from '../../data/skills';
import { RULES_CITATIONS } from '../../data/rulesCitations';
import { Origin, GeneralPower } from '../../types/rules';
import { GENERAL_POWERS_LIST } from '../../data/generalPowers';
import { PrerequisiteContext, checkPowerPrerequisites } from '../../utils/rulesValidation';
import { Check, Info, Package, Sparkles, Search, X, ChevronRight } from 'lucide-react';
import { DetailModalData } from '../common/DetailModal';

interface StepOriginProps {
  selectedOriginId: string;
  selectedOriginBenefits: { type: 'pericia' | 'poder'; name: string }[];
  raceSkills?: string[];
  classSkills?: string[];
  intSkills?: string[];
  alreadyTrainedSkills?: string[];
  prerequisiteContext?: PrerequisiteContext;
  onSelectOrigin: (originId: string) => void;
  onSelectOriginBenefits: (benefits: { type: 'pericia' | 'poder'; name: string }[]) => void;
  onOpenDetail: (data: DetailModalData) => void;
}

export const isGenericOriginPower = (powName: string): boolean => {
  const lower = powName.toLowerCase().trim();
  return (
    lower === 'poder de combate' ||
    lower === 'poder da tormenta' ||
    lower === 'poder geral' ||
    lower === 'poder de destino' ||
    lower.startsWith('poder de ') ||
    lower.startsWith('poder da ')
  );
};

export const getGenericPowerCategory = (
  powName: string,
  powType: string
): 'combate' | 'tormenta' | 'destino' | 'magia' | 'geral' => {
  const lower = powName.toLowerCase();
  if (lower.includes('combate') || powType === 'combate') return 'combate';
  if (lower.includes('tormenta') || powType === 'tormenta') return 'tormenta';
  if (lower.includes('destino') || powType === 'destino') return 'destino';
  if (lower.includes('magia') || powType === 'magia') return 'magia';
  return 'geral';
};

export const StepOrigin: React.FC<StepOriginProps> = ({
  selectedOriginId,
  selectedOriginBenefits,
  raceSkills = [],
  classSkills = [],
  intSkills = [],
  alreadyTrainedSkills = [],
  prerequisiteContext,
  onSelectOrigin,
  onSelectOriginBenefits,
  onOpenDetail,
}) => {
  const [search, setSearch] = useState('');
  const [showSubstitutions, setShowSubstitutions] = useState(false);

  // Estado para o modal de escolha de poder genérico da origem
  const [powerPicker, setPowerPicker] = useState<{
    originPowerName: string;
    category: 'combate' | 'tormenta' | 'destino' | 'magia' | 'geral';
    title: string;
  } | null>(null);
  const [powerSearch, setPowerSearch] = useState('');
  const [onlyEligiblePowers, setOnlyEligiblePowers] = useState(false);

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

  const handleSelectGenericPower = (
    p: GeneralPower,
    originPowerName: string,
    category: 'combate' | 'tormenta' | 'destino' | 'magia' | 'geral'
  ) => {
    if (prerequisiteContext) {
      const res = checkPowerPrerequisites(p.id, prerequisiteContext);
      if (!res.isMet) {
        const confirmPick = window.confirm(
          `Atenção: Você não cumpre todos os pré-requisitos deste poder:\n• ${res.unmetRequirements.join('\n• ')}\n\nEm Tormenta 20, para escolher um poder geral você precisa cumprir seus pré-requisitos.\n\nDeseja selecionar mesmo assim?`
        );
        if (!confirmPick) return;
      }
    }

    // Encontra se já havia uma seleção vinculada a este slot genérico
    const existingSlotBenefit = selectedOriginBenefits.find((b) => {
      if (b.type !== 'poder') return false;
      if (b.name === originPowerName) return true;
      const isOtherOriginPower = currentOrigin.powers.some(
        (op) => op.name === b.name && !isGenericOriginPower(op.name)
      );
      if (isOtherOriginPower) return false;
      const genPower = GENERAL_POWERS_LIST.find((gp) => gp.name === b.name || gp.id === b.name);
      return genPower && (genPower.category === category || category === 'geral');
    });

    if (existingSlotBenefit) {
      const next = selectedOriginBenefits.map((b) =>
        b === existingSlotBenefit ? { type: 'poder' as const, name: p.name } : b
      );
      onSelectOriginBenefits(next);
    } else {
      if (selectedOriginBenefits.length < 2) {
        onSelectOriginBenefits([...selectedOriginBenefits, { type: 'poder' as const, name: p.name }]);
      }
    }

    setPowerPicker(null);
    setPowerSearch('');
  };

  // Poderes filtrados para o modal de escolha genérica
  const modalPowers = powerPicker
    ? GENERAL_POWERS_LIST.filter((p) => {
        if (powerPicker.category !== 'geral' && p.category !== powerPicker.category) return false;
        const matchesSearch =
          p.name.toLowerCase().includes(powerSearch.toLowerCase()) ||
          p.description.toLowerCase().includes(powerSearch.toLowerCase()) ||
          (p.prerequisites && p.prerequisites.toLowerCase().includes(powerSearch.toLowerCase()));
        if (!matchesSearch) return false;

        if (onlyEligiblePowers && prerequisiteContext) {
          const res = checkPowerPrerequisites(p.id, prerequisiteContext);
          if (!res.isMet) return false;
        }

        return true;
      })
    : [];

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
                  const isGeneric = isGenericOriginPower(pow.name);
                  const genericCategory = isGeneric ? getGenericPowerCategory(pow.name, pow.type) : 'geral';

                  if (isGeneric) {
                    // Verifica se já há um benefício de poder escolhido para este slot genérico
                    const selectedGenericBenefit = selectedOriginBenefits.find((b) => {
                      if (b.type !== 'poder') return false;
                      if (b.name === pow.name) return true;
                      const isOtherOriginPower = currentOrigin.powers.some(
                        (op) => op.name === b.name && !isGenericOriginPower(op.name)
                      );
                      if (isOtherOriginPower) return false;
                      const genPower = GENERAL_POWERS_LIST.find((gp) => gp.name === b.name || gp.id === b.name);
                      return genPower && (genPower.category === genericCategory || genericCategory === 'geral');
                    });

                    const chosenPowerDef = selectedGenericBenefit && selectedGenericBenefit.name !== pow.name
                      ? GENERAL_POWERS_LIST.find((gp) => gp.name === selectedGenericBenefit.name || gp.id === selectedGenericBenefit.name)
                      : null;

                    if (selectedGenericBenefit) {
                      const isPendingSelection = selectedGenericBenefit.name === pow.name;

                      return (
                        <div
                          key={idx}
                          className="t20-card"
                          style={{
                            padding: '0.85rem 1rem',
                            borderColor: 'var(--t20-gold)',
                            background: 'rgba(245, 158, 11, 0.12)',
                            boxShadow: '0 0 12px rgba(245, 158, 11, 0.25)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                              <Check size={16} style={{ color: 'var(--t20-gold)' }} />
                              <span style={{ fontWeight: 700, color: 'var(--t20-gold-light)', fontSize: '0.95rem' }}>
                                {pow.name}:{' '}
                                <span style={{ color: '#ffffff', textDecoration: isPendingSelection ? 'none' : 'underline' }}>
                                  {isPendingSelection ? '(Poder ainda não escolhido)' : (chosenPowerDef?.name || selectedGenericBenefit.name)}
                                </span>
                              </span>
                              <span className={`badge ${isPendingSelection ? 'badge-ruby' : 'badge-gold'}`} style={{ fontSize: '0.65rem' }}>
                                {isPendingSelection ? 'Escolha Pendente' : (chosenPowerDef?.category || pow.type)}
                              </span>
                            </div>

                            <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                              <button
                                type="button"
                                onClick={() =>
                                  setPowerPicker({
                                    originPowerName: pow.name,
                                    category: genericCategory,
                                    title: `Escolher ${pow.name}`,
                                  })
                                }
                                className="btn btn-gold"
                                style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem', gap: '0.3rem' }}
                              >
                                <Sparkles size={13} />
                                {isPendingSelection ? 'Selecionar Poder Agora' : 'Trocar Poder'}
                              </button>

                              {chosenPowerDef && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    onOpenDetail({
                                      title: chosenPowerDef.name,
                                      category: `Poder Geral (${chosenPowerDef.category}) • Origem`,
                                      subtitle: chosenPowerDef.prerequisites ? `Pré-requisitos: ${chosenPowerDef.prerequisites}` : 'Sem pré-requisitos',
                                      description: chosenPowerDef.description,
                                      prerequisites: chosenPowerDef.prerequisites,
                                      ruleCitation: RULES_CITATIONS.GENERAL_POWER_PREREQUISITES,
                                    })
                                  }
                                  className="btn btn-ghost"
                                  style={{ padding: '0.2rem 0.4rem', fontSize: '0.75rem', gap: '0.25rem' }}
                                >
                                  <Info size={14} />
                                  Ver Detalhes
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() =>
                                  onSelectOriginBenefits(selectedOriginBenefits.filter((b) => b !== selectedGenericBenefit))
                                }
                                className="btn btn-ghost"
                                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: '#f87171' }}
                                title="Desmarcar este benefício"
                              >
                                ✕ Desmarcar
                              </button>
                            </div>
                          </div>

                          <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1' }}>
                            {chosenPowerDef?.description || pow.description}
                          </p>

                          {chosenPowerDef?.prerequisites && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--t20-gold-light)', fontStyle: 'italic' }}>
                              Pré-requisitos: {chosenPowerDef.prerequisites}
                            </div>
                          )}

                          {isPendingSelection && (
                            <div style={{ fontSize: '0.8rem', color: '#fca5a5', fontWeight: 600 }}>
                              ⚠️ Atenção: Clique em &quot;Selecionar Poder Agora&quot; acima para escolher seu poder de {genericCategory}.
                            </div>
                          )}
                        </div>
                      );
                    }

                    // Se não está selecionado
                    return (
                      <div
                        key={idx}
                        className="t20-card"
                        onClick={() => {
                          if (selectedOriginBenefits.length < 2) {
                            setPowerPicker({
                              originPowerName: pow.name,
                              category: genericCategory,
                              title: `Escolher ${pow.name}`,
                            });
                          }
                        }}
                        style={{
                          cursor: selectedOriginBenefits.length < 2 ? 'pointer' : 'default',
                          padding: '0.85rem 1rem',
                          borderColor: 'var(--border-color)',
                          background: 'rgba(255, 255, 255, 0.02)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.35rem',
                          opacity: selectedOriginBenefits.length >= 2 ? 0.75 : 1,
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontWeight: 700, color: '#ffffff' }}>
                              {pow.name}
                            </span>
                            <span className="badge badge-slate" style={{ fontSize: '0.65rem' }}>
                              {pow.type}
                            </span>
                          </div>

                          <button
                            type="button"
                            disabled={selectedOriginBenefits.length >= 2}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPowerPicker({
                                originPowerName: pow.name,
                                category: genericCategory,
                                title: `Escolher ${pow.name}`,
                              });
                            }}
                            className="btn btn-gold"
                            style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem', gap: '0.3rem' }}
                          >
                            <Sparkles size={13} />
                            Escolher {pow.name}
                          </button>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1' }}>
                          {pow.description}
                        </p>
                      </div>
                    );
                  }

                  // Poderes específicos tradicionais da origem (ex: Confissão, Sangue Azul, Medicina, etc.)
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

      {/* Modal de Escolha de Poder Genérico */}
      {powerPicker && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            padding: '1rem',
          }}
          onClick={() => {
            setPowerPicker(null);
            setPowerSearch('');
          }}
        >
          <div
            className="t20-card t20-card-gold"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '820px',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.85), 0 0 25px rgba(245, 158, 11, 0.3)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '1rem 1.25rem',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--t20-gold-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={20} style={{ color: 'var(--t20-gold)' }} />
                  {powerPicker.title}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                  Origem: <strong style={{ color: '#ffffff' }}>{currentOrigin.name}</strong> • Categoria Oficial: <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>{powerPicker.category}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPowerPicker(null);
                  setPowerSearch('');
                }}
                className="btn btn-ghost"
                style={{ padding: '0.35rem', borderRadius: '50%', color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Filters */}
            <div
              style={{
                padding: '0.85rem 1.25rem',
                borderBottom: '1px solid var(--border-color)',
                background: 'rgba(0, 0, 0, 0.2)',
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
                <Search
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-dim)',
                  }}
                />
                <input
                  type="text"
                  placeholder="Buscar por nome, efeito ou pré-requisito..."
                  value={powerSearch}
                  onChange={(e) => setPowerSearch(e.target.value)}
                  style={{
                    paddingLeft: '2.25rem',
                    paddingRight: powerSearch ? '2rem' : '0.8rem',
                    fontSize: '0.85rem',
                    width: '100%',
                  }}
                />
                {powerSearch && (
                  <button
                    type="button"
                    onClick={() => setPowerSearch('')}
                    style={{
                      position: 'absolute',
                      right: '0.5rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-dim)',
                      cursor: 'pointer',
                    }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {prerequisiteContext && (
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', color: '#cbd5e1', cursor: 'pointer', userSelect: 'none' }}>
                  <input
                    type="checkbox"
                    checked={onlyEligiblePowers}
                    onChange={(e) => setOnlyEligiblePowers(e.target.checked)}
                  />
                  <span>Apenas poderes com pré-requisitos cumpridos</span>
                </label>
              )}
            </div>

            {/* Modal Powers List */}
            <div
              style={{
                padding: '1rem 1.25rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                maxHeight: '55vh',
              }}
            >
              {modalPowers.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-dim)' }}>
                  Nenhum poder encontrado com os filtros atuais.
                </div>
              ) : (
                modalPowers.map((p) => {
                  const prereqResult = prerequisiteContext
                    ? checkPowerPrerequisites(p.id, prerequisiteContext)
                    : { isMet: true, unmetRequirements: [] };
                  const isCurrentChosen = selectedOriginBenefits.some(
                    (b) => b.type === 'poder' && (b.name === p.name || b.name === p.id)
                  );

                  return (
                    <div
                      key={p.id}
                      className="t20-card"
                      style={{
                        padding: '0.85rem 1rem',
                        borderColor: isCurrentChosen ? 'var(--t20-gold)' : 'var(--border-color)',
                        background: isCurrentChosen ? 'rgba(245, 158, 11, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: isCurrentChosen ? 'var(--t20-gold-light)' : '#ffffff' }}>
                            {p.name}
                          </span>
                          <span className="badge badge-slate" style={{ fontSize: '0.65rem' }}>
                            {p.category}
                          </span>
                          {p.prerequisites ? (
                            prereqResult.isMet ? (
                              <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>
                                ✓ Pré-requisito atendido
                              </span>
                            ) : (
                              <span className="badge badge-ruby" style={{ fontSize: '0.65rem' }}>
                                ✕ Requer: {prereqResult.unmetRequirements.join(', ')}
                              </span>
                            )
                          ) : (
                            <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>
                              Sem pré-requisitos
                            </span>
                          )}
                        </div>

                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button
                            type="button"
                            onClick={() =>
                              onOpenDetail({
                                title: p.name,
                                category: `Poder Geral (${p.category})`,
                                subtitle: p.prerequisites ? `Pré-requisitos: ${p.prerequisites}` : 'Sem pré-requisitos',
                                description: p.description,
                                prerequisites: p.prerequisites,
                                ruleCitation: RULES_CITATIONS.GENERAL_POWER_PREREQUISITES,
                              })
                            }
                            className="btn btn-ghost"
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', gap: '0.25rem' }}
                          >
                            <Info size={14} />
                            Regras
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectGenericPower(p, powerPicker.originPowerName, powerPicker.category)}
                            className={`btn ${isCurrentChosen ? 'btn-secondary' : 'btn-gold'}`}
                            style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem', gap: '0.3rem' }}
                          >
                            {isCurrentChosen ? (
                              <>
                                <Check size={14} /> Selecionado
                              </>
                            ) : (
                              'Selecionar Este Poder'
                            )}
                          </button>
                        </div>
                      </div>

                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1' }}>
                        {p.description}
                      </p>
                      {p.prerequisites && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                          <strong>Pré-requisitos oficiais:</strong> {p.prerequisites}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: '0.75rem 1.25rem',
                borderTop: '1px solid var(--border-color)',
                background: 'rgba(0, 0, 0, 0.4)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                Mostrando {modalPowers.length} poderes disponíveis
              </span>
              <button
                type="button"
                onClick={() => {
                  setPowerPicker(null);
                  setPowerSearch('');
                }}
                className="btn btn-secondary"
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.825rem' }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
