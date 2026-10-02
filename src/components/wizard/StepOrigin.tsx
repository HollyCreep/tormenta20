import React, { useState } from 'react';
import { BookOpen, Check, Info, Package, Sparkles, X } from 'lucide-react';
import { ORIGINS_LIST } from '../../data/origins';
import { SKILLS_LIST } from '../../data/skills';
import { RULES_CITATIONS } from '../../data/rulesCitations';
import { GENERAL_POWERS_LIST } from '../../data/generalPowers';
import type { GeneralPower } from '../../types/rules';
import { checkPowerPrerequisites, type PrerequisiteContext } from '../../utils/rulesValidation';
import type { DetailModalData } from '../common/DetailModal';
import { POWER_CATEGORY_META } from '../common/T20Badge';
import { ChoiceCard, ChoiceSection, OptionPickerSheet, StepIntro, type PickerOption } from './wizardUi';
import { skillName } from '../../utils/displayNames';

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
  /** Poderes já escolhidos em outros benefícios (nome → fonte). */
  takenPowers?: Map<string, string>;
}

type Category = 'combate' | 'tormenta' | 'destino' | 'magia' | 'geral';

export const isGenericOriginPower = (powName: string): boolean => {
  const lower = powName.toLowerCase().trim();
  return lower === 'poder geral' || lower.startsWith('poder de ') || lower.startsWith('poder da ');
};

export const getGenericPowerCategory = (powName: string, powType: string): Category => {
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
  takenPowers,
}) => {
  const [picker, setPicker] = useState<'origin' | 'swap' | null>(null);
  const [powerSlot, setPowerSlot] = useState<{ name: string; category: Category } | null>(null);

  const origin = ORIGINS_LIST.find((o) => o.id === selectedOriginId) || ORIGINS_LIST[0];
  const full = selectedOriginBenefits.length >= 2;

  const sourceOf = (skId: string) =>
    classSkills.includes(skId) ? 'Classe' : raceSkills.includes(skId) ? 'Raça' : intSkills.includes(skId) ? 'Inteligência' : 'Já treinada';

  const toggleBenefit = (type: 'pericia' | 'poder', name: string) => {
    const isSelected = selectedOriginBenefits.some((b) => b.type === type && b.name === name);
    if (isSelected) {
      onSelectOriginBenefits(selectedOriginBenefits.filter((b) => !(b.type === type && b.name === name)));
      return;
    }
    if (type === 'pericia' && alreadyTrainedSkills.includes(name)) return;
    if (!full) onSelectOriginBenefits([...selectedOriginBenefits, { type, name }]);
  };

  /** Benefício já escolhido para um "Poder de X" genérico da origem. */
  const slotBenefit = (slotName: string, category: Category) =>
    selectedOriginBenefits.find((b) => {
      if (b.type !== 'poder') return false;
      if (b.name === slotName) return true;
      if (origin.powers.some((op) => op.name === b.name && !isGenericOriginPower(op.name))) return false;
      const gp = GENERAL_POWERS_LIST.find((g) => g.name === b.name || g.id === b.name);
      return !!gp && (gp.category === category || category === 'geral');
    });

  const pickGenericPower = (p: GeneralPower) => {
    if (!powerSlot) return;
    // "Você recebe o poder escolhido, mas ainda precisa cumprir seus pré-requisitos" (Cap. 1, pág. 85)
    if (prerequisiteContext && !checkPowerPrerequisites(p.id, prerequisiteContext).isMet) return;
    if (takenPowers?.has(p.name)) return;
    const existing = slotBenefit(powerSlot.name, powerSlot.category);
    if (existing) onSelectOriginBenefits(selectedOriginBenefits.map((b) => (b === existing ? { type: 'poder' as const, name: p.name } : b)));
    else if (!full) onSelectOriginBenefits([...selectedOriginBenefits, { type: 'poder' as const, name: p.name }]);
    setPowerSlot(null);
  };

  const originOptions: PickerOption[] = ORIGINS_LIST.map((o) => ({
    id: o.id,
    title: o.name,
    subtitle: o.description,
    meta: <span className="badge">{o.skills.map(skillName).join(', ')}</span>,
    searchText: o.powers.map((p) => p.name).join(' '),
  }));

  const swapOptions: PickerOption[] = SKILLS_LIST.filter((s) => !alreadyTrainedSkills.includes(s.id)).map((s) => ({
    id: s.id,
    title: s.name,
    subtitle: s.attribute.toUpperCase(),
  }));

  const slotOptions: PickerOption[] = powerSlot
    ? GENERAL_POWERS_LIST.filter((p) => p.category !== 'concedido' && (powerSlot.category === 'geral' || p.category === powerSlot.category)).map((p) => {
        const res = prerequisiteContext ? checkPowerPrerequisites(p.id, prerequisiteContext) : { isMet: true, unmetRequirements: [] };
        const takenBy = takenPowers?.get(p.name);
        return {
          id: p.id,
          title: p.name,
          subtitle: p.description,
          disabled: !res.isMet || !!takenBy,
          disabledReason: takenBy ? `Já escolhido como benefício de ${takenBy}` : `Falta: ${res.unmetRequirements.join(', ')}`,
          meta: (
            <>
              <span className="badge">{POWER_CATEGORY_META[p.category]?.label}</span>
              {p.prerequisites && (
                <span className={`badge ${res.isMet ? 'badge-success' : 'badge-warning'}`}>
                  {res.isMet ? 'Requisitos ok' : `Falta: ${res.unmetRequirements.join(', ')}`}
                </span>
              )}
            </>
          ),
          searchText: p.prerequisites,
        };
      })
    : [];

  const hasTrainedOriginSkill = origin.skills.some((s) => alreadyTrainedSkills.includes(s));
  const swapped = selectedOriginBenefits.filter((b) => b.type === 'pericia' && !origin.skills.includes(b.name));

  return (
    <div className="stack-lg">
      <StepIntro
        title="Origem"
        description="O que você fazia antes da aventura: itens iniciais e 2 benefícios entre as perícias e poderes da origem."
      />

      <ChoiceCard
        eyebrow="Sua origem"
        title={origin.name}
        description={origin.description}
        onChange={() => setPicker('origin')}
        onDetails={() =>
          onOpenDetail({
            title: origin.name,
            category: 'Origem',
            description: [
              origin.description,
              `Itens: ${origin.items.join('; ')}.`,
              `Perícias: ${origin.skills.map(skillName).join(', ')}.`,
              `Poderes: ${origin.powers.map((p) => p.name).join(', ')}.`,
              'Escolha 2 benefícios entre as perícias e poderes listados (Cap. 1, Origens, pág. 85).',
            ].join('\n\n'),
          })
        }
        badges={
          <>
            <Package size={14} className="t-3" />
            {origin.items.map((it, i) => (
              <span key={i} className="badge">
                {it}
              </span>
            ))}
          </>
        }
      />

      <ChoiceSection title="Benefícios" description="Escolha 2 entre perícias e poderes." count={{ value: selectedOriginBenefits.length, total: 2 }}>
        <span className="t-label">Perícias</span>
        <div className="list">
          {origin.skills.map((skId) => {
            const trained = alreadyTrainedSkills.includes(skId);
            const checked = selectedOriginBenefits.some((b) => b.type === 'pericia' && b.name === skId);
            if (trained) {
              return (
                <div key={skId} className={`row pick-row is-disabled${checked ? ' is-conflict' : ''}`}>
                  <div className="pick-main">
                    <span className="mark mark-locked">{checked ? <X size={12} /> : null}</span>
                    <span className="row-main">
                      <span className="row-title t-strike">{skillName(skId)}</span>
                      <span className="t-xs t-warning">
                        {checked ? 'Conflito: ' : ''}já treinada por {sourceOf(skId)} — troque por outra perícia
                      </span>
                    </span>
                  </div>
                  {checked ? (
                    <button type="button" className="btn btn-ghost btn-xs" onClick={() => toggleBenefit('pericia', skId)}>
                      Desmarcar
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="icon-btn icon-btn-sm"
                      aria-label="Regra de treinamento"
                      onClick={() =>
                        onOpenDetail({
                          title: `${skillName(skId)} — já treinada (${sourceOf(skId)})`,
                          category: 'Regra oficial',
                          description:
                            'Em Tormenta 20 uma perícia é treinada ou não — o treinamento não se acumula. Escolha outra perícia no lugar (Cap. 1, pág. 95).',
                          ruleCitation: RULES_CITATIONS.SKILL_TRAINING_NO_STACK,
                          initialTab: 'rules',
                        })
                      }
                    >
                      <Info size={17} />
                    </button>
                  )}
                </div>
              );
            }
            return (
              <button
                key={skId}
                type="button"
                role="checkbox"
                aria-checked={checked}
                className={`row${checked ? ' is-selected' : ''}`}
                disabled={!checked && full}
                onClick={() => toggleBenefit('pericia', skId)}
              >
                <span className={`mark${checked ? ' is-on' : ''}`}>{checked && <Check size={14} strokeWidth={3} />}</span>
                <span className="row-main">
                  <span className="row-title">{skillName(skId)}</span>
                </span>
              </button>
            );
          })}
          {swapped.map((b) => (
            <button key={b.name} type="button" role="checkbox" aria-checked className="row is-selected" onClick={() => toggleBenefit('pericia', b.name)}>
              <span className="mark is-on">
                <Check size={14} strokeWidth={3} />
              </span>
              <span className="row-main">
                <span className="row-title">{skillName(b.name)}</span>
                <span className="row-sub">Substituição (Cap. 1, pág. 95)</span>
              </span>
            </button>
          ))}
        </div>

        {hasTrainedOriginSkill && (
          <div className="callout callout-gold">
            <BookOpen size={18} />
            <div className="stack-sm grow">
              <span>Uma perícia da origem você já tem — pode trocá-la por qualquer outra perícia não treinada.</span>
              <div className="hstack wrap">
                <button type="button" className="btn btn-gold btn-sm" disabled={full} onClick={() => setPicker('swap')}>
                  Escolher outra perícia
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() =>
                    onOpenDetail({
                      title: RULES_CITATIONS.ORIGIN_SKILL_REPLACEMENT.title,
                      category: 'Regra oficial',
                      description: RULES_CITATIONS.ORIGIN_SKILL_REPLACEMENT.explanation,
                      ruleCitation: RULES_CITATIONS.ORIGIN_SKILL_REPLACEMENT,
                      initialTab: 'rules',
                    })
                  }
                >
                  Regra (pág. 95)
                </button>
              </div>
            </div>
          </div>
        )}

        <span className="t-label">Poderes</span>
        <div className="list">
          {origin.powers.map((pow, idx) => {
            if (isGenericOriginPower(pow.name)) {
              const category = getGenericPowerCategory(pow.name, pow.type);
              const chosen = slotBenefit(pow.name, category);
              const chosenDef = chosen && chosen.name !== pow.name ? GENERAL_POWERS_LIST.find((g) => g.name === chosen.name || g.id === chosen.name) : null;
              return (
                <div key={idx} className={`row pick-row${chosenDef ? ' is-selected' : ''}`}>
                  <button
                    type="button"
                    className="pick-main"
                    disabled={!chosen && full}
                    onClick={() => setPowerSlot({ name: pow.name, category })}
                  >
                    <span className={`mark${chosenDef ? ' is-on' : ''}`}>{chosenDef ? <Check size={14} strokeWidth={3} /> : <Sparkles size={12} />}</span>
                    <span className="row-main">
                      <span className="row-title">{pow.name}</span>
                      <span className="row-sub">{chosenDef ? `Escolhido: ${chosenDef.name}` : 'Toque para escolher o poder'}</span>
                    </span>
                  </button>
                  {chosen && (
                    <button
                      type="button"
                      className="icon-btn icon-btn-sm"
                      aria-label="Remover poder"
                      onClick={() => onSelectOriginBenefits(selectedOriginBenefits.filter((b) => b !== chosen))}
                    >
                      <X size={17} />
                    </button>
                  )}
                </div>
              );
            }
            const checked = selectedOriginBenefits.some((b) => b.type === 'poder' && b.name === pow.name);
            const takenBy = takenPowers?.get(pow.name);
            const prereq = prerequisiteContext && GENERAL_POWERS_LIST.some((g) => g.name === pow.name)
              ? checkPowerPrerequisites(pow.name, prerequisiteContext)
              : { isMet: true, unmetRequirements: [] as string[] };
            const blocked = !!takenBy || !prereq.isMet;
            return (
              <div key={idx} className={`row pick-row${checked ? ' is-selected' : ''}${blocked ? (checked ? ' is-conflict' : ' is-disabled') : ''}`}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={checked}
                  className="pick-main"
                  disabled={!checked && (full || blocked)}
                  onClick={() => toggleBenefit('poder', pow.name)}
                >
                  <span className={`mark${checked ? ' is-on' : ''}`}>{checked && <Check size={14} strokeWidth={3} />}</span>
                  <span className="row-main">
                    <span className="row-title">{pow.name}</span>
                    {takenBy ? (
                      <span className="t-xs t-warning">Já escolhido como benefício de {takenBy}</span>
                    ) : !prereq.isMet ? (
                      <span className="t-xs t-warning">Falta: {prereq.unmetRequirements.join(', ')}</span>
                    ) : (
                      <span className="row-sub clamp-2">{pow.description}</span>
                    )}
                  </span>
                </button>
                <button
                  type="button"
                  className="icon-btn icon-btn-sm"
                  aria-label={`Detalhes de ${pow.name}`}
                  onClick={() => onOpenDetail({ title: pow.name, category: `Poder de origem · ${origin.name}`, description: pow.description })}
                >
                  <Info size={17} />
                </button>
              </div>
            );
          })}
        </div>
      </ChoiceSection>

      <OptionPickerSheet
        open={picker === 'origin'}
        onClose={() => setPicker(null)}
        title="Escolha sua origem"
        subtitle={`${ORIGINS_LIST.length} origens`}
        options={originOptions}
        value={[origin.id]}
        onChange={([id]) => {
          if (id && id !== origin.id) {
            onSelectOrigin(id);
            onSelectOriginBenefits([]);
          }
        }}
        searchPlaceholder="Buscar origem…"
      />
      <OptionPickerSheet
        open={picker === 'swap'}
        onClose={() => setPicker(null)}
        title="Perícia substituta"
        subtitle="Qualquer perícia ainda não treinada"
        options={swapOptions}
        value={[]}
        onChange={([id]) => id && toggleBenefit('pericia', id)}
        searchPlaceholder="Buscar perícia…"
      />
      <OptionPickerSheet
        open={!!powerSlot}
        onClose={() => setPowerSlot(null)}
        title={powerSlot ? `Escolher ${powerSlot.name}` : ''}
        subtitle="Só aparecem liberados os poderes cujos requisitos você cumpre"
        options={slotOptions}
        value={[]}
        onChange={([id]) => {
          const p = GENERAL_POWERS_LIST.find((g) => g.id === id);
          if (p) pickGenericPower(p);
        }}
        searchPlaceholder="Buscar poder ou requisito…"
        onInfo={(id) => {
          const p = GENERAL_POWERS_LIST.find((g) => g.id === id);
          if (p)
            onOpenDetail({
              title: p.name,
              category: `Poder geral · ${POWER_CATEGORY_META[p.category]?.label}`,
              prerequisites: p.prerequisites,
              description: p.description,
              ruleCitation: RULES_CITATIONS.GENERAL_POWER_PREREQUISITES,
            });
        }}
      />
    </div>
  );
};
