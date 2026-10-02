import React, { useEffect, useState } from 'react';
import { RACES_LIST } from '../../data/races';
import type { AttributeKey } from '../../types/rules';
import { ATTRIBUTES_LIST } from '../../data/attributes';
import { SKILLS_LIST } from '../../data/skills';
import { GENERAL_POWERS_LIST } from '../../data/generalPowers';
import { RULES_CITATIONS } from '../../data/rulesCitations';
import type { DetailModalData } from '../common/DetailModal';
import { checkPowerPrerequisites, type PrerequisiteContext } from '../../utils/rulesValidation';
import { POWER_CATEGORY_META } from '../common/T20Badge';
import { Segmented, SelectField } from '../ui/controls';
import { ChoiceCard, ChoiceSection, OptionPickerSheet, SelectedChips, StepIntro, type PickerOption } from './wizardUi';
import { formatSigned } from '../../utils/displayNames';

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
  /** Poderes já escolhidos em outros benefícios (nome → fonte). */
  takenPowers?: Map<string, string>;
  onOpenDetail: (data: DetailModalData) => void;
}

const VERSATILITY: Record<string, { title: string; text: string; a: string; b: string }> = {
  humano: {
    title: 'Versátil',
    text: 'Treinado em 2 perícias à escolha — ou troque uma delas por um poder geral.',
    a: '2 perícias',
    b: '1 perícia + 1 poder',
  },
  osteon: {
    title: 'Memória póstuma',
    text: 'Uma perícia treinada ou um poder geral da sua antiga vida.',
    a: '1 perícia',
    b: '1 poder geral',
  },
  lefou: {
    title: 'Deformidade',
    text: '+2 em duas perícias à escolha, ou um poder da Tormenta.',
    a: '+2 em 2 perícias',
    b: '1 poder da Tormenta',
  },
};

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
  takenPowers,
  onOpenDetail,
}) => {
  const [filter, setFilter] = useState<'todas' | 'padrao' | 'rara'>('todas');
  const [racialOption, setRacialOption] = useState<'skills' | 'power'>(selectedRacialPower ? 'power' : 'skills');
  const [powerCategory, setPowerCategory] = useState('todas');
  const [picker, setPicker] = useState<'race' | 'skills' | 'power' | null>(null);

  const race = RACES_LIST.find((r) => r.id === selectedRaceId) || RACES_LIST[0];
  const versatility = VERSATILITY[race.id];

  useEffect(() => {
    if (selectedRacialPower) setRacialOption('power');
  }, [selectedRacialPower]);

  const maxSkills =
    race.id === 'humano'
      ? racialOption === 'power'
        ? 1
        : 2
      : race.id === 'osteon' || race.id === 'lefou'
        ? racialOption === 'power'
          ? 0
          : race.id === 'osteon'
            ? 1
            : 2
        : race.customSelections?.skillChoiceCount || 0;

  const selectOption = (opt: 'skills' | 'power') => {
    setRacialOption(opt);
    if (opt === 'skills') onSelectRacialPower('');
    else if (race.id === 'humano' && selectedRacialSkills.length > 1) onSelectRacialSkills(selectedRacialSkills.slice(0, 1));
    else if (race.id === 'osteon' || race.id === 'lefou') onSelectRacialSkills([]);
  };

  const toggleAttribute = (attr: AttributeKey) => {
    const limit = race.selectableAttributesCount || 3;
    if (selectedRacialAttributes.includes(attr)) onSelectRacialAttributes(selectedRacialAttributes.filter((a) => a !== attr));
    else if (selectedRacialAttributes.length < limit) onSelectRacialAttributes([...selectedRacialAttributes, attr]);
  };

  const modBadges = (r: (typeof RACES_LIST)[number]) =>
    r.isSelectableAttributes ? (
      <span className="badge badge-gold">+1 em {r.selectableAttributesCount} à escolha</span>
    ) : (
      Object.entries(r.attributeModifiers).map(([attr, val]) => (
        <span key={attr} className={`badge ${(val || 0) > 0 ? 'badge-success' : 'badge-danger'}`}>
          {attr.toUpperCase()} {formatSigned(val || 0)}
        </span>
      ))
    );

  const raceOptions: PickerOption[] = RACES_LIST.filter((r) => filter === 'todas' || r.category === filter).map((r) => ({
    id: r.id,
    title: r.name,
    subtitle: `${r.category === 'padrao' ? 'Comum' : 'Rara'} · ${r.size} · ${r.speed}m`,
    meta: modBadges(r),
    searchText: r.description,
  }));

  const skillOptions: PickerOption[] = SKILLS_LIST.map((s) => ({
    id: s.id,
    title: s.name,
    subtitle: s.attribute.toUpperCase(),
    disabled: classMandatorySkills.includes(s.id),
    disabledReason: 'Já é treinada pela sua classe (treino não acumula).',
  }));

  const powerOptions: PickerOption[] = GENERAL_POWERS_LIST.filter((p) => {
    if (race.id === 'lefou') return p.category === 'tormenta';
    if (p.category === 'concedido') return false; // poderes concedidos vêm de divindades
    return powerCategory === 'todas' || p.category === powerCategory;
  }).map((p) => {
    const prereq = prerequisiteContext ? checkPowerPrerequisites(p.id, prerequisiteContext) : { isMet: true, unmetRequirements: [] };
    const takenBy = takenPowers?.get(p.name);
    return {
      id: p.id,
      title: p.name,
      subtitle: p.description,
      meta: <span className="badge">{POWER_CATEGORY_META[p.category]?.label || p.category}</span>,
      disabled: !prereq.isMet || !!takenBy,
      disabledReason: takenBy ? `Já escolhido como benefício de ${takenBy}` : `Falta: ${prereq.unmetRequirements.join(', ')}`,
      searchText: p.prerequisites,
    };
  });

  const chosenPower = GENERAL_POWERS_LIST.find((p) => p.id === selectedRacialPower);

  return (
    <div className="stack-lg">
      <StepIntro
        title="Raça"
        description="Sua origem biológica: modificadores de atributo, tamanho, deslocamento e habilidades ancestrais."
      />

      <ChoiceCard
        eyebrow="Sua raça"
        title={race.name}
        subtitle={`${race.category === 'padrao' ? 'Raça comum' : 'Raça rara'} · ${race.size} · Deslocamento ${race.speed}m`}
        badges={modBadges(race)}
        description={race.description}
        onChange={() => setPicker('race')}
      />

      {race.isSelectableAttributes && (
        <ChoiceSection
          title={`Atributos +${race.selectableAttributesBonus || 1}`}
          description={`Escolha ${race.selectableAttributesCount} atributos diferentes.`}
          count={{ value: selectedRacialAttributes.length, total: race.selectableAttributesCount || 3 }}
        >
          <div className="attr-chips">
            {ATTRIBUTES_LIST.map((attr) => {
              const excluded = race.selectableAttributesExclude?.includes(attr.key);
              const on = selectedRacialAttributes.includes(attr.key);
              return (
                <button
                  key={attr.key}
                  type="button"
                  className="attr-chip"
                  aria-pressed={on}
                  disabled={excluded}
                  onClick={() => toggleAttribute(attr.key)}
                  title={excluded ? `${race.name} não pode escolher ${attr.name}` : attr.name}
                >
                  <span className="attr-chip-key">{attr.shortName}</span>
                  <span className="attr-chip-sub">{excluded ? '—' : on ? `+${race.selectableAttributesBonus || 1}` : attr.name}</span>
                </button>
              );
            })}
          </div>
        </ChoiceSection>
      )}

      {race.customSelections?.requiresSubrace && race.customSelections.subraces && (
        <ChoiceSection title="Linhagem">
          <Segmented<string>
            value={selectedSubraceId || race.customSelections.subraces[0].id}
            onChange={onSelectSubrace}
            ariaLabel="Linhagem"
            size="lg"
            options={race.customSelections.subraces.map((s) => ({ value: s.id, label: s.name }))}
          />
          {race.customSelections.subraces
            .filter((s) => s.id === (selectedSubraceId || race.customSelections?.subraces?.[0].id))
            .map((s) => (
              <div key={s.id} className="stack-sm">
                <p className="t-sm t-2">{s.description}</p>
                <div className="chip-wrap">
                  {Object.entries(s.attributeModifiers).map(([attr, val]) => (
                    <span key={attr} className="badge badge-success">
                      {attr.toUpperCase()} {formatSigned(val as number)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </ChoiceSection>
      )}

      {race.customSelections?.requiresSkillChoice && (
        <ChoiceSection
          title={versatility?.title || 'Perícias raciais'}
          description={versatility?.text}
          action={
            race.id === 'humano' ? (
              <button
                type="button"
                className="btn btn-ghost btn-xs"
                onClick={() =>
                  onOpenDetail({
                    title: RULES_CITATIONS.HUMAN_VERSATILE?.title || 'Versátil',
                    category: 'Regra oficial',
                    description: RULES_CITATIONS.HUMAN_VERSATILE?.explanation || '',
                    ruleCitation: RULES_CITATIONS.HUMAN_VERSATILE,
                    initialTab: 'rules',
                  })
                }
              >
                Regra
              </button>
            ) : undefined
          }
        >
          {race.customSelections.allowsGeneralPowerChoice && versatility && (
            <Segmented<'skills' | 'power'>
              value={racialOption}
              onChange={selectOption}
              ariaLabel="Benefício racial"
              options={[
                { value: 'skills', label: versatility.a },
                { value: 'power', label: versatility.b },
              ]}
            />
          )}

          {maxSkills > 0 && (
            <div className="stack-xs">
              <div className="hstack between">
                <span className="t-sm t-semibold">
                  {race.id === 'lefou' ? 'Perícias com +2' : `Perícia${maxSkills > 1 ? 's' : ''} treinada${maxSkills > 1 ? 's' : ''}`}
                </span>
                <span className={`counter${selectedRacialSkills.length === maxSkills ? ' is-done' : ''}`}>
                  {selectedRacialSkills.length}/{maxSkills}
                </span>
              </div>
              <SelectedChips
                labels={selectedRacialSkills.map((id) => ({ id, label: SKILLS_LIST.find((s) => s.id === id)?.name || id }))}
                placeholder={`Escolher ${maxSkills > 1 ? `${maxSkills} perícias` : 'perícia'}`}
                onOpen={() => setPicker('skills')}
                onRemove={(id) => onSelectRacialSkills(selectedRacialSkills.filter((s) => s !== id))}
              />
            </div>
          )}

          {racialOption === 'power' && race.customSelections?.allowsGeneralPowerChoice && (
            <div className="stack-xs">
              <div className="hstack between">
                <span className="t-sm t-semibold">{race.id === 'lefou' ? 'Poder da Tormenta' : 'Poder geral'}</span>
                <span className={`counter${chosenPower ? ' is-done' : ''}`}>{chosenPower ? 1 : 0}/1</span>
              </div>
              <SelectedChips
                labels={chosenPower ? [{ id: chosenPower.id, label: chosenPower.name }] : []}
                placeholder="Escolher poder"
                onOpen={() => setPicker('power')}
                onRemove={() => onSelectRacialPower('')}
              />
            </div>
          )}
        </ChoiceSection>
      )}

      <ChoiceSection title="Habilidades de raça">
        <div className="list">
          {race.abilities.map((ab) => (
            <button
              key={ab.id}
              type="button"
              className="row items-start"
              onClick={() => onOpenDetail({ title: ab.name, category: `Habilidade de ${race.name}`, cost: ab.cost, description: ab.description })}
            >
              <span className="row-main">
                <span className="row-title hstack-xs wrap">
                  {ab.name}
                  {ab.cost && <span className="badge badge-mp">{ab.cost}</span>}
                </span>
                <span className="row-sub clamp-3">{ab.description}</span>
              </span>
            </button>
          ))}
        </div>
      </ChoiceSection>

      <OptionPickerSheet
        open={picker === 'race'}
        onClose={() => setPicker(null)}
        title="Escolha sua raça"
        subtitle={`${RACES_LIST.length} raças de Arton`}
        options={raceOptions}
        value={[race.id]}
        onChange={([id]) => id && onSelectRace(id)}
        searchPlaceholder="Buscar raça…"
        toolbarExtra={
          <Segmented<'todas' | 'padrao' | 'rara'>
            value={filter}
            onChange={setFilter}
            ariaLabel="Raridade"
            options={[
              { value: 'todas', label: 'Todas' },
              { value: 'padrao', label: 'Comuns', count: RACES_LIST.filter((r) => r.category === 'padrao').length },
              { value: 'rara', label: 'Raras', count: RACES_LIST.filter((r) => r.category === 'rara').length },
            ]}
          />
        }
      />

      <OptionPickerSheet
        open={picker === 'skills'}
        onClose={() => setPicker(null)}
        title={race.id === 'lefou' ? 'Perícias com +2' : 'Perícias raciais'}
        options={skillOptions}
        value={selectedRacialSkills}
        onChange={onSelectRacialSkills}
        multiple
        max={maxSkills}
        searchPlaceholder="Buscar perícia…"
      />

      <OptionPickerSheet
        open={picker === 'power'}
        onClose={() => setPicker(null)}
        title={race.id === 'lefou' ? 'Poder da Tormenta' : 'Poder geral'}
        subtitle="Poderes com requisitos não atendidos ficam bloqueados"
        options={powerOptions}
        value={selectedRacialPower ? [selectedRacialPower] : []}
        onChange={([id]) => id && onSelectRacialPower(id)}
        searchPlaceholder="Buscar poder ou requisito…"
        toolbarExtra={
          race.id !== 'lefou' ? (
            <SelectField
              value={powerCategory}
              onChange={setPowerCategory}
              ariaLabel="Categoria"
              size="sm"
              options={[
                { value: 'todas', label: 'Todas as categorias' },
                ...['combate', 'destino', 'magia', 'tormenta'].map((c) => ({ value: c, label: POWER_CATEGORY_META[c].label })),
              ]}
            />
          ) : undefined
        }
        onInfo={(id) => {
          const p = GENERAL_POWERS_LIST.find((x) => x.id === id);
          if (p)
            onOpenDetail({
              title: p.name,
              category: `Poder geral · ${POWER_CATEGORY_META[p.category]?.label || p.category}`,
              prerequisites: p.prerequisites,
              description: p.description,
              ruleCitation: RULES_CITATIONS.GENERAL_POWER_PREREQUISITES,
            });
        }}
      />
    </div>
  );
};
