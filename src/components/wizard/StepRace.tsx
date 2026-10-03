import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { RACES_LIST } from '../../data/races';
import type { AttributeKey, RaceAbility, RaceAbilityChoice } from '../../types/rules';
import { SPELLS_LIST } from '../../data/spells';
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
import { OSTEON_FORMER_KEY, OSTEON_FORMER_RACES, osteonFormer } from '../../utils/raceAbilities';

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
  racialChoices?: Record<string, string[]>;
  onChangeRacialChoices?: (choices: Record<string, string[]>) => void;
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
    text: 'Uma perícia treinada, um poder geral ou — se você era de outra raça humanoide que não humano — uma habilidade dessa raça (e o tamanho dela, se não era Médio). Cap. 1, pág. 29.',
    a: '1 perícia',
    b: '1 poder geral',
  },
  lefou: {
    title: 'Deformidade',
    text: '+2 em duas perícias à escolha; você pode trocar um desses bônus por um poder da Tormenta (Cap. 1, pág. 24).',
    a: '+2 em 2 perícias',
    b: '+2 em 1 perícia + 1 poder',
  },
};

type RacialOption = 'skills' | 'power' | 'former';

/** Todas as habilidades com escolha (incluindo as da sub-raça). */
const abilitiesWithChoice = (abilities: RaceAbility[]) => abilities.filter((a) => a.choice);

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
  racialChoices = {},
  onChangeRacialChoices,
  onOpenDetail,
}) => {
  const [choicePicker, setChoicePicker] = useState<RaceAbilityChoice | null>(null);
  const [filter, setFilter] = useState<'todas' | 'padrao' | 'rara'>('todas');
  const [racialOption, setRacialOption] = useState<RacialOption>(
    racialChoices[OSTEON_FORMER_KEY]?.length ? 'former' : selectedRacialPower ? 'power' : 'skills'
  );
  const [powerCategory, setPowerCategory] = useState('todas');
  const [picker, setPicker] = useState<'race' | 'skills' | 'power' | 'formerRace' | 'formerAbility' | null>(null);

  const race = RACES_LIST.find((r) => r.id === selectedRaceId) || RACES_LIST[0];
  const versatility = VERSATILITY[race.id];
  const subrace = race.customSelections?.subraces?.find((s) => s.id === (selectedSubraceId || race.customSelections?.subraces?.[0].id));
  const former = osteonFormer({ raceId: race.id, racialChoices });
  const formerRaceDef = OSTEON_FORMER_RACES.find((r) => r.id === racialChoices[OSTEON_FORMER_KEY]?.[0]);
  const choiceAbilities = abilitiesWithChoice([...race.abilities, ...(subrace?.abilities || []), ...(former?.ability ? [former.ability] : [])]);
  const isGolem = race.id === 'golem';

  useEffect(() => {
    if (selectedRacialPower) setRacialOption('power');
  }, [selectedRacialPower]);

  // Humano: 2 perícias ou 1 + poder geral · Lefou: +2 em 2 perícias ou 1 + poder da Tormenta
  // Osteon: 1 perícia ou 1 poder geral · Golem: apenas o poder geral (Propósito de Criação)
  const maxSkills = isGolem
    ? 0
    : race.id === 'humano' || race.id === 'lefou'
      ? racialOption === 'power'
        ? 1
        : 2
      : race.id === 'osteon'
        ? racialOption === 'skills'
          ? 1
          : 0
        : race.customSelections?.skillChoiceCount || 0;

  /** Remove a raça anterior do osteon (e a escolha da habilidade herdada, se tiver). */
  const clearFormer = () => {
    if (!racialChoices[OSTEON_FORMER_KEY]) return;
    const next = { ...racialChoices };
    delete next[OSTEON_FORMER_KEY];
    if (former?.ability?.choice) delete next[former.ability.choice.key];
    onChangeRacialChoices?.(next);
  };

  const setFormer = (raceId: string, abilityId = '') => {
    const next: Record<string, string[]> = { ...racialChoices, [OSTEON_FORMER_KEY]: [raceId, abilityId] };
    if (former?.ability?.choice && former.ability.id !== abilityId) delete next[former.ability.choice.key];
    onChangeRacialChoices?.(next);
  };

  const selectOption = (opt: RacialOption) => {
    setRacialOption(opt);
    if (opt !== 'former') clearFormer();
    if (opt === 'former') {
      onSelectRacialPower('');
      onSelectRacialSkills([]);
    } else if (opt === 'skills') onSelectRacialPower('');
    else if ((race.id === 'humano' || race.id === 'lefou') && selectedRacialSkills.length > 1) onSelectRacialSkills(selectedRacialSkills.slice(0, 1));
    else if (race.id === 'osteon') onSelectRacialSkills([]);
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

      {isGolem && (
        <ChoiceSection
          title="Propósito de Criação"
          description="Você não escolhe uma origem, mas recebe um poder geral a sua escolha (Cap. 1, pág. 27)."
          count={{ value: chosenPower ? 1 : 0, total: 1 }}
        >
          <SelectedChips
            labels={chosenPower ? [{ id: chosenPower.id, label: chosenPower.name }] : []}
            placeholder="Escolher poder geral"
            onOpen={() => setPicker('power')}
            onRemove={() => onSelectRacialPower('')}
          />
        </ChoiceSection>
      )}

      {choiceAbilities.map((ab) => {
        const ch = ab.choice!;
        const chosen = racialChoices[ch.key] || [];
        const labelOf = (v: string) =>
          ch.kind === 'spell' ? SPELLS_LIST.find((sp) => sp.id === v)?.name || v : ch.kind === 'skill' ? SKILLS_LIST.find((sk) => sk.id === v)?.name || v : v;
        return (
          <ChoiceSection key={ch.key} title={`${ab.name}: ${ch.label}`} description={ab.description} count={{ value: chosen.length, total: ch.count }}>
            <SelectedChips
              labels={chosen.map((v) => ({ id: v, label: labelOf(v) }))}
              placeholder={`Escolher ${ch.count > 1 ? ch.count : ''} ${ch.kind === 'spell' ? (ch.count > 1 ? 'magias' : 'magia') : ch.kind === 'skill' ? 'perícia' : 'opção'}`}
              onOpen={() => setChoicePicker(ch)}
              onRemove={(id) => onChangeRacialChoices?.({ ...racialChoices, [ch.key]: chosen.filter((v) => v !== id) })}
            />
          </ChoiceSection>
        );
      })}

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
                <Info size={14} />
                Regra
              </button>
            ) : undefined
          }
        >
          {race.customSelections.allowsGeneralPowerChoice && versatility && (
            <Segmented<RacialOption>
              value={racialOption}
              onChange={selectOption}
              ariaLabel="Benefício racial"
              options={[
                { value: 'skills', label: versatility.a },
                { value: 'power', label: versatility.b },
                ...(race.id === 'osteon' ? [{ value: 'former' as const, label: 'Raça anterior' }] : []),
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

          {race.id === 'osteon' && racialOption === 'former' && (
            <div className="stack-xs">
              <span className="t-sm t-semibold">Raça anterior</span>
              <SelectedChips
                labels={formerRaceDef ? [{ id: formerRaceDef.id, label: `${formerRaceDef.name} · ${formerRaceDef.size}` }] : []}
                placeholder="Escolher raça humanoide"
                onOpen={() => setPicker('formerRace')}
                onRemove={clearFormer}
              />
              {formerRaceDef && (
                <>
                  <span className="t-sm t-semibold">Habilidade herdada</span>
                  <SelectedChips
                    labels={former?.ability ? [{ id: former.ability.id, label: former.ability.name }] : []}
                    placeholder={`Escolher habilidade de ${formerRaceDef.name.toLowerCase()}`}
                    onOpen={() => setPicker('formerAbility')}
                    onRemove={() => setFormer(formerRaceDef.id)}
                  />
                  {formerRaceDef.size !== 'Médio' && <span className="t-xs t-2">Seu tamanho passa a ser {formerRaceDef.size}.</span>}
                </>
              )}
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
              className="row items-start has-detail"
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
        open={picker === 'formerRace'}
        onClose={() => setPicker(null)}
        title="Raça anterior"
        subtitle="Raça humanoide que não humano (Memória Póstuma, pág. 29)"
        options={OSTEON_FORMER_RACES.map((r) => ({ id: r.id, title: r.name, subtitle: `${r.size} · ${r.abilities.length} habilidades` }))}
        value={formerRaceDef ? [formerRaceDef.id] : []}
        onChange={([id]) => {
          if (!id) return;
          if (id !== formerRaceDef?.id) setFormer(id);
          setPicker('formerAbility');
        }}
        searchPlaceholder="Buscar raça…"
      />

      <OptionPickerSheet
        open={picker === 'formerAbility'}
        onClose={() => setPicker(null)}
        title={`Habilidade de ${formerRaceDef?.name.toLowerCase() || 'raça'}`}
        subtitle="Você ganha uma habilidade dessa raça a sua escolha"
        options={(formerRaceDef?.abilities || []).map((a) => ({ id: a.id, title: a.name, subtitle: a.description }))}
        value={former?.ability ? [former.ability.id] : []}
        onChange={([id]) => {
          if (id && formerRaceDef) setFormer(formerRaceDef.id, id);
          setPicker(null);
        }}
        searchPlaceholder="Buscar habilidade…"
      />

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
        open={!!choicePicker}
        onClose={() => setChoicePicker(null)}
        title={choicePicker?.label || ''}
        options={
          !choicePicker
            ? []
            : choicePicker.kind === 'spell'
              ? SPELLS_LIST.filter((sp) =>
                  choicePicker.options?.length ? choicePicker.options.includes(sp.id) : sp.circle <= (choicePicker.spellCircle || 1)
                ).map((sp) => ({ id: sp.id, title: sp.name, subtitle: `${sp.circle}º círculo · ${sp.school} · ${sp.type}`, searchText: sp.description }))
              : choicePicker.kind === 'skill'
                ? SKILLS_LIST.map((sk) => ({ id: sk.id, title: sk.name, subtitle: sk.attribute.toUpperCase() }))
                : (choicePicker.options || []).map((o) => ({ id: o, title: o }))
        }
        value={choicePicker ? racialChoices[choicePicker.key] || [] : []}
        onChange={(vals) => choicePicker && onChangeRacialChoices?.({ ...racialChoices, [choicePicker.key]: vals.slice(0, choicePicker.count) })}
        multiple={(choicePicker?.count || 1) > 1}
        max={choicePicker?.count || 1}
        searchPlaceholder="Buscar…"
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
