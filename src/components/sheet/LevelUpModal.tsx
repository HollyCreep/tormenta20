import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronsUp,
  Heart,
  Info,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from 'lucide-react';
import type { CharacterPower, CharacterSheet, CharacterSpell } from '../../types/character';
import type { AttributeKey, ClassPower, GeneralPower, Spell } from '../../types/rules';
import { ATTRIBUTES_LIST } from '../../data/attributes';
import { CLASSES_LIST } from '../../data/classes';
import { CLASS_POWERS_LIST } from '../../data/classPowers';
import { GENERAL_POWERS_LIST } from '../../data/generalPowers';
import { SPELLS_LIST } from '../../data/spells';
import { calculateSpellCircleUnlocked, recalculateFullCharacterSheet, rulesInputFromCharacter, startingSpellCount } from '../../utils/rulesEngine';
import { tormentaCharismaLoss } from '../../utils/passiveEffects';
import { checkPowerPrerequisites } from '../../utils/rulesValidation';
import { prerequisiteContextFor } from '../../utils/characterContext';
import { fixedSpellsForPowers, grantForPower } from '../../utils/powerSpells';
import { PowerSpellPicker } from './PowerSpellPicker';
import { cleanT20Text, getClassPowerCitation, getGeneralPowerCitation, getSpellCitation } from '../../utils/textUtils';
import { PowerCategoryBadge, SchoolBadge } from '../common/T20Badge';
import { DetailModal, type DetailModalData } from '../common/DetailModal';
import { ClassSigil, classColorVars } from '../common/ClassSigil';
import { Sheet } from '../ui/Sheet';
import { EmptyState, SearchField, Segmented, SelectField } from '../ui/controls';

interface LevelUpModalProps {
  character: CharacterSheet;
  isOpen: boolean;
  onClose: () => void;
  onSaveLevelUp: (updatedCharacter: CharacterSheet) => void;
}

type Step = 'classe' | 'poder' | 'magia';
type AnyPower = ClassPower | GeneralPower;

const BASE_COST_BY_CIRCLE: Record<number, number> = { 1: 1, 2: 3, 3: 6, 4: 10, 5: 15 };
const SPELL_SCHOOLS = ['Abjuração', 'Adivinhação', 'Convocação', 'Encantamento', 'Evocação', 'Ilusão', 'Necromancia', 'Transmutação'];

/** Subida de nível em 3 passos: classe (ou multiclasse), poder e magia. Cap. 1, págs. 36–37. */
export const LevelUpModal: React.FC<LevelUpModalProps> = ({ character, isOpen, onClose, onSaveLevelUp }) => {
  const currentTotalLevel = character.level;
  const nextTotalLevel = currentTotalLevel + 1;

  const existingClasses = useMemo(
    () =>
      character.classes || [
        {
          classId: character.classId,
          className: CLASSES_LIST.find((c) => c.id === character.classId)?.name || character.classId,
          level: character.level,
          subclass: character.classSubclass,
        },
      ],
    [character.classes, character.classId, character.level, character.classSubclass]
  );

  const [step, setStep] = useState<Step>('classe');
  const [selectedClassId, setSelectedClassId] = useState<string>(character.classId);
  const [isMulticlass, setIsMulticlass] = useState(false);
  const [powerTypeTab, setPowerTypeTab] = useState<'classe' | 'geral'>('classe');
  const [powerSearch, setPowerSearch] = useState('');
  const [selectedPower, setSelectedPower] = useState<AnyPower | null>(null);
  // Aumento de Atributo: +1 em um atributo, uma vez por patamar para o mesmo atributo (Cap. 1, págs. 35 e 38)
  const [increaseAttr, setIncreaseAttr] = useState<AttributeKey | null>(null);
  const [selectedSpells, setSelectedSpells] = useState<Spell[]>([]);
  // Magias escolhidas para um poder que concede magias (Conhecimento Mágico, Orar...)
  const [powerSpells, setPowerSpells] = useState<CharacterSpell[]>([]);
  const [powerSpellPickerOpen, setPowerSpellPickerOpen] = useState(false);
  // Multiclasse em arcanista: escolhe o caminho (Cap. 1, pág. 37)
  const [newSubclass, setNewSubclass] = useState('');
  // Multiclasse em bardo/druida: três escolas (Cap. 1, págs. 44 e 61)
  const [newSchools, setNewSchools] = useState<string[]>([]);
  const [spellSearch, setSpellSearch] = useState('');
  const [spellCircleFilter, setSpellCircleFilter] = useState('0');
  const [modalDetail, setModalDetail] = useState<DetailModalData | null>(null);

  const chosenClassDef = CLASSES_LIST.find((c) => c.id === selectedClassId) || CLASSES_LIST[0];
  const currentClassLevel = existingClasses.find((c) => c.classId === selectedClassId)?.level || 0;
  const nextClassLevel = currentClassLevel + 1;

  // Ganhos (Cap. 1, pág. 36)
  const conMod = character.totalAttributes.con || 0;
  const hpGain = Math.max(1, (chosenClassDef.hpPerLevel || 4) + conMod);
  const mpGain = chosenClassDef.mpPerLevel || 3;
  const halfLevelIncreased = Math.floor(nextTotalLevel / 2) > Math.floor(currentTotalLevel / 2);
  const trainingOf = (lvl: number) => (lvl >= 15 ? 6 : lvl >= 7 ? 4 : 2);
  const trainingIncreased = trainingOf(nextTotalLevel) > trainingOf(currentTotalLevel);

  const isSpellcaster = Boolean(chosenClassDef.spellcaster);
  const nextCircle = calculateSpellCircleUnlocked(nextClassLevel, selectedClassId);
  const unlockedNewCircle = isSpellcaster && nextCircle > calculateSpellCircleUnlocked(currentClassLevel, selectedClassId);

  // Tabela da classe: o que o novo nível concede. Poderes de classe só nos níveis em que a tabela
  // indica "poder de <classe>" — no 1º nível de qualquer classe não há poder (tabelas do Cap. 1).
  const progressionRow = chosenClassDef.progression?.find((p) => p.level === nextClassLevel);
  const grantsPower = /poder d/i.test(progressionRow?.features || '');
  const newAbilities = (chosenClassDef.abilities || chosenClassDef.abilitiesLevel1).filter((a) => a.level === nextClassLevel);
  const subclassOptions = nextClassLevel === 1 && selectedClassId !== character.classId ? chosenClassDef.subclasses?.options : undefined;
  const subclassForSpells =
    newSubclass ||
    existingClasses.find((c) => c.classId === selectedClassId)?.subclass ||
    (selectedClassId === character.classId ? character.classSubclass : undefined);
  const needsSchools = nextClassLevel === 1 && !!chosenClassDef.spellcaster?.schoolsCount && !character.spellSchools?.length;
  const knownSchools = needsSchools ? newSchools : character.spellSchools;
  // Magias por nível: 1º nível da classe → magias iniciais; arcanista e clérigo → uma por nível;
  // bardo e druida → uma nos níveis pares (Cap. 1, págs. 37, 44, 57 e 61)
  const spellsToLearn = !isSpellcaster
    ? 0
    : nextClassLevel === 1
      ? startingSpellCount(selectedClassId, subclassForSpells)
      : selectedClassId === 'bardo' || selectedClassId === 'druida'
        ? nextClassLevel % 2 === 0
          ? 1
          : 0
        : 1;

  const steps: Step[] = ['classe', ...(grantsPower ? (['poder'] as Step[]) : []), ...(spellsToLearn > 0 ? (['magia'] as Step[]) : [])];
  const stepIndex = Math.max(0, steps.indexOf(step));
  const isLast = stepIndex === steps.length - 1;

  // Pré-requisitos avaliados no novo nível: "você pode escolher um poder no nível em que
  // atinge seus pré-requisitos" (Cap. 1, pág. 33)
  const validationContext = useMemo(() => {
    const ctx = prerequisiteContextFor(character);
    return {
      ...ctx,
      level: (character.level || 1) + 1,
      classLevels: { ...(ctx.classLevels || {}), [selectedClassId]: nextClassLevel },
      isSpellcaster: ctx.isSpellcaster || isSpellcaster,
      maxSpellCircle: Math.max(ctx.maxSpellCircle || 0, isSpellcaster ? nextCircle : 0),
    };
  }, [character, selectedClassId, nextClassLevel, isSpellcaster, nextCircle]);

  const currentPowerNames = useMemo(
    () => new Set((character.powers || []).map((p) => p.name.toLowerCase())),
    [character.powers]
  );

  // Poderes disponíveis (exclui os já possuídos, exceto repetíveis)
  const availableClassPowers = useMemo(
    () =>
      CLASS_POWERS_LIST.filter((p) => {
        if (p.classId !== selectedClassId) return false;
        if (p.name.toLowerCase().includes('aumento de atributo')) return true;
        return !currentPowerNames.has(p.name.toLowerCase());
      }),
    [selectedClassId, currentPowerNames]
  );
  const availableGeneralPowers = useMemo(
    () =>
      GENERAL_POWERS_LIST.filter((p) => {
        const n = p.name.toLowerCase();
        if (n.includes('treinamento em perícia') || n.includes('proficiência')) return true;
        return !currentPowerNames.has(n);
      }),
    [currentPowerNames]
  );

  const filteredPowers: AnyPower[] = useMemo(() => {
    const list: AnyPower[] = powerTypeTab === 'classe' ? availableClassPowers : availableGeneralPowers;
    const q = powerSearch.toLowerCase().trim();
    if (!q) return list;
    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.prerequisites && p.prerequisites.toLowerCase().includes(q))
    );
  }, [powerTypeTab, availableClassPowers, availableGeneralPowers, powerSearch]);

  const availableSpells = (() => {
    if (!isSpellcaster) return [];
    const type = chosenClassDef.spellcaster?.type || 'arcana';
    const circle = parseInt(spellCircleFilter, 10);
    const q = spellSearch.toLowerCase();
    return SPELLS_LIST.filter((s) => {
      const matchesType = s.type === type || s.type === 'universal';
      const withinCircle = s.circle <= nextCircle;
      const circleMatches = circle === 0 || s.circle === circle;
      const matchesQuery = !q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
      const alreadyKnown = character.spells.some((cs) => cs.id === s.id) || powerSpells.some((ps) => ps.id === s.id);
      // Bardo e druida só aprendem magias das três escolas escolhidas
      const inSchools = !chosenClassDef.spellcaster?.schoolsCount || !knownSchools?.length || knownSchools.includes(s.school);
      return matchesType && withinCircle && circleMatches && matchesQuery && !alreadyKnown && inSchools;
    }).sort((a, b) => a.circle - b.circle || a.name.localeCompare(b.name, 'pt-BR'));
  })();

  const tierOf = (lv: number) => (lv <= 4 ? 1 : lv <= 10 ? 2 : lv <= 16 ? 3 : 4);
  const increasedInTier = (attr: AttributeKey) =>
    (character.powers || []).some((p) => {
      const m = /^aumento_atributo_([a-z]+)_(\d+)$/.exec(p.id);
      return m && m[1] === attr && tierOf(parseInt(m[2], 10)) === tierOf(nextTotalLevel);
    });
  const selectedPowerPrereq = selectedPower ? checkPowerPrerequisites(selectedPower.name, validationContext) : null;

  // Poder escolhido que concede magias à escolha: precisa escolher antes de avançar (Cap. 4, pág. 170)
  const selectedGrant = selectedPower ? grantForPower({ id: selectedPower.id, name: selectedPower.name }) : undefined;
  const grantNeeded = selectedGrant?.choose ? selectedGrant.choose.count : selectedGrant?.options ? 1 : 0;
  // Ficha como ficará no novo nível, para o círculo máximo das magias do poder
  const ownerAfter = {
    ...character,
    level: nextTotalLevel,
    classes: existingClasses.some((c) => c.classId === selectedClassId)
      ? existingClasses.map((c) => (c.classId === selectedClassId ? { ...c, level: c.level + 1 } : c))
      : [...existingClasses, { classId: selectedClassId, className: chosenClassDef.name, level: 1 }],
    spellSchools: knownSchools,
    spells: [...(character.spells || []), ...selectedSpells.map((sp) => ({ ...sp, learnedFrom: 'classe' as const }))],
  };
  const choosePower = (pow: AnyPower | null) => {
    setSelectedPower(pow);
    setPowerSpells([]);
  };
  const spellsRequired = Math.min(spellsToLearn, availableSpells.length + selectedSpells.length);
  const blockNext =
    (step === 'classe' && ((!!subclassOptions && !newSubclass) || (needsSchools && newSchools.length !== 3))) ||
    (step === 'poder' && (!selectedPower || (selectedPower.name === 'Aumento de Atributo' && !increaseAttr) || powerSpells.length < grantNeeded)) ||
    (step === 'magia' && selectedSpells.length < spellsRequired);

  const handleConfirmLevelUp = () => {
    const existingIndex = existingClasses.findIndex((c) => c.classId === selectedClassId);
    const updatedClasses = [...existingClasses];
    if (existingIndex >= 0) {
      updatedClasses[existingIndex] = { ...updatedClasses[existingIndex], level: updatedClasses[existingIndex].level + 1 };
    } else {
      updatedClasses.push({ classId: selectedClassId, className: chosenClassDef.name, level: 1, ...(newSubclass ? { subclass: newSubclass } : {}) });
    }

    // Habilidades automáticas do novo nível da classe (tabela da classe)
    const abilityPowers: CharacterPower[] = newAbilities
      .filter((a) => !(character.powers || []).some((p) => p.id === a.id))
      .map((a) => ({ id: a.id, name: a.name, source: 'classe', description: a.description, cost: a.cost, type: a.type }));
    const updatedPowers: CharacterPower[] = [...(character.powers || []), ...abilityPowers];
    if (selectedPower) {
      updatedPowers.push({
        id: selectedPower.id || selectedPower.name,
        name: selectedPower.name,
        source: powerTypeTab === 'classe' ? 'classe' : 'geral',
        description: selectedPower.description,
        type: 'category' in selectedPower ? selectedPower.category : undefined,
      });
    }

    // Poder da Tormenta: perde Carisma conforme a contagem (Cap. 2, pág. 136)
    const inputBefore = rulesInputFromCharacter(character);
    const inputAfter = { ...inputBefore, powerNames: updatedPowers.map((p) => p.name) };
    const racialPower = character.selectedRacialPower;
    const carLoss = tormentaCharismaLoss(inputAfter, racialPower) - tormentaCharismaLoss(inputBefore, racialPower);
    const totalAttributes = carLoss > 0 ? { ...character.totalAttributes, car: character.totalAttributes.car - carLoss } : character.totalAttributes;

    const isIncrease = selectedPower?.name === 'Aumento de Atributo' && increaseAttr;
    if (isIncrease) {
      const last = updatedPowers[updatedPowers.length - 1];
      updatedPowers[updatedPowers.length - 1] = {
        ...last,
        id: `aumento_atributo_${increaseAttr}_${nextTotalLevel}`,
        description: `+1 em ${ATTRIBUTES_LIST.find((a) => a.key === increaseAttr)?.name} (${nextTotalLevel}º nível). ${last.description}`,
      };
    }
    const finalAttributes = isIncrease ? { ...totalAttributes, [increaseAttr!]: totalAttributes[increaseAttr!] + 1 } : totalAttributes;

    const updatedSpells: CharacterSpell[] = [...(character.spells || [])];
    selectedSpells.forEach((sp) => updatedSpells.push({ ...sp, learnedFrom: 'classe', sourceClassId: selectedClassId }));
    // Magias concedidas pelo poder escolhido: as escolhidas e as fixas (ex.: Elo com a Natureza)
    updatedSpells.push(...powerSpells);
    updatedSpells.push(...fixedSpellsForPowers(updatedPowers, updatedSpells));

    onSaveLevelUp(
      recalculateFullCharacterSheet({
        ...character,
        level: nextTotalLevel,
        totalAttributes: finalAttributes,
        classes: updatedClasses,
        powers: updatedPowers,
        spells: updatedSpells,
        ...(needsSchools ? { spellSchools: newSchools } : {}),
      })
    );
    onClose();
  };

  const goNext = () => (isLast ? handleConfirmLevelUp() : setStep(steps[stepIndex + 1]));
  const goBack = () => setStep(steps[Math.max(0, stepIndex - 1)]);

  const openPowerDetail = (pow: AnyPower) => {
    const category = 'category' in pow ? pow.category : 'classe';
    const citation =
      powerTypeTab === 'classe'
        ? getClassPowerCitation(chosenClassDef.id, chosenClassDef.name, pow.name)
        : getGeneralPowerCitation(category || 'geral', pow.name);
    setModalDetail({
      title: cleanT20Text(pow.name),
      category: powerTypeTab === 'classe' ? `Poder de ${chosenClassDef.name}` : 'Poder geral',
      subtitle: citation,
      prerequisites: pow.prerequisites ? cleanT20Text(pow.prerequisites) : undefined,
      description: cleanT20Text(pow.description),
    });
  };

  const openSpellDetail = (sp: Spell) => {
    setModalDetail({
      title: cleanT20Text(sp.name),
      category: `Magia ${sp.type} · ${sp.circle}º círculo`,
      subtitle: getSpellCitation(cleanT20Text(sp.name), sp.circle),
      description: cleanT20Text(sp.description),
      cost: `${BASE_COST_BY_CIRCLE[sp.circle] || 1} PM`,
      execution: sp.execution,
      range: sp.range,
      duration: sp.duration,
      resistance: sp.resistance,
      targetArea: sp.targetArea,
      upgrades: sp.upgrades,
    });
  };

  const stepLabels: Record<Step, string> = { classe: 'Classe', poder: 'Poder', magia: 'Magia' };

  return (
    <>
      <Sheet
        open={isOpen}
        onClose={onClose}
        title={`Nível ${currentTotalLevel} → ${nextTotalLevel}`}
        subtitle={`${chosenClassDef.name} ${nextClassLevel}${isMulticlass ? ' · multiclasse' : ''}`}
        icon={<ChevronsUp size={22} />}
        size="lg"
        full
        flush={step !== 'classe'}
        toolbar={
          <>
            <ol className="mini-stepper" aria-label="Etapas da subida de nível">
              {steps.map((s, i) => (
                <li key={s}>
                  <button
                    type="button"
                    className={`mini-step${s === step ? ' is-current' : ''}${i < stepIndex ? ' is-done' : ''}`}
                    onClick={() => setStep(s)}
                    aria-current={s === step ? 'step' : undefined}
                  >
                    <span className="mini-step-num">{i < stepIndex ? <Check size={13} strokeWidth={3} /> : i + 1}</span>
                    {stepLabels[s]}
                  </button>
                </li>
              ))}
            </ol>
            {step === 'poder' && (
              <>
                <Segmented<'classe' | 'geral'>
                  value={powerTypeTab}
                  onChange={(v) => {
                    setPowerTypeTab(v);
                    choosePower(null);
                  }}
                  ariaLabel="Tipo de poder"
                  options={[
                    { value: 'classe', label: `De ${chosenClassDef.name}`, count: availableClassPowers.length },
                    { value: 'geral', label: 'Gerais', count: availableGeneralPowers.length },
                  ]}
                />
                <SearchField value={powerSearch} onChange={setPowerSearch} placeholder="Buscar poder ou pré-requisito…" />
              </>
            )}
            {step === 'magia' && (
              <div className="filter-row">
                <SearchField value={spellSearch} onChange={setSpellSearch} placeholder="Buscar magia…" />
                <SelectField
                  value={spellCircleFilter}
                  onChange={setSpellCircleFilter}
                  ariaLabel="Círculo"
                  options={[
                    { value: '0', label: 'Todos' },
                    ...Array.from({ length: nextCircle }, (_, i) => ({ value: String(i + 1), label: `${i + 1}º círculo` })),
                  ]}
                />
              </div>
            )}
          </>
        }
        footer={
          <div className="levelup-footer">
            {(selectedPower || selectedSpells.length > 0) && (
              <div className="levelup-picks">
                {selectedPower && (
                  <span className="badge badge-accent badge-lg">
                    <Star size={12} />
                    {selectedPower.name}
                  </span>
                )}
                {[...powerSpells, ...selectedSpells].map((sp) => (
                  <span key={sp.id} className="badge badge-mp badge-lg">
                    <Zap size={12} />
                    {sp.name}
                  </span>
                ))}
              </div>
            )}
            <div className="hstack">
              {stepIndex > 0 && (
                <button type="button" className="btn btn-secondary" onClick={goBack}>
                  <ArrowLeft size={18} />
                  Voltar
                </button>
              )}
              <button type="button" className="btn btn-primary grow" onClick={goNext} disabled={blockNext}>
                {isLast ? (
                  <>
                    <TrendingUp size={18} />
                    Confirmar nível {nextTotalLevel}
                  </>
                ) : (
                  <>
                    Próximo: {stepLabels[steps[stepIndex + 1]]}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        }
      >
        {step === 'classe' && (
          <div className="stack-lg animate-in">
            <Segmented<'mesma' | 'multi'>
              value={isMulticlass ? 'multi' : 'mesma'}
              onChange={(v) => {
                if (v === 'mesma') {
                  setIsMulticlass(false);
                  setSelectedClassId(character.classId);
                } else {
                  setIsMulticlass(true);
                }
                choosePower(null);
                setSelectedSpells([]);
                setNewSubclass('');
                setNewSchools([]);
              }}
              ariaLabel="Classe do novo nível"
              size="lg"
              options={[
                { value: 'mesma', label: 'Mesma classe' },
                { value: 'multi', label: 'Multiclasse' },
              ]}
            />

            {isMulticlass && (
              <SelectField
                label="Classe para o novo nível"
                value={selectedClassId}
                onChange={(v) => {
                  setSelectedClassId(v);
                  choosePower(null);
                  setSelectedSpells([]);
                  setNewSubclass('');
                  setNewSchools([]);
                }}
                options={CLASSES_LIST.map((cls) => {
                  const lvl = existingClasses.find((c) => c.classId === cls.id)?.level;
                  return { value: cls.id, label: `${cls.name}${lvl ? ` (nível ${lvl})` : ''}` };
                })}
              />
            )}

            <div className="card classed hstack-lg" style={classColorVars(selectedClassId)}>
              <ClassSigil classId={selectedClassId} size="lg" />
              <div className="stack-xs grow">
                <span className="t-label">Você será</span>
                <span className="t-heading t-lg">
                  {chosenClassDef.name} {nextClassLevel}
                </span>
                <span className="t-xs t-3">Personagem de {nextTotalLevel}º nível</span>
              </div>
            </div>

            <div className="gain-grid">
              <div className="gain gain-hp">
                <Heart size={18} />
                <span className="gain-value">+{hpGain} PV</span>
                <span className="gain-sub">
                  {chosenClassDef.hpPerLevel} da classe {conMod >= 0 ? '+' : '−'} {Math.abs(conMod)} de Con
                </span>
              </div>
              <div className="gain gain-mp">
                <Sparkles size={18} />
                <span className="gain-value">+{mpGain} PM</span>
                <span className="gain-sub">por nível de {chosenClassDef.name}</span>
              </div>
              <div className={`gain${halfLevelIncreased ? ' is-up' : ''}`}>
                <TrendingUp size={18} />
                <span className="gain-value">{halfLevelIncreased ? '+1' : '='} perícias</span>
                <span className="gain-sub">{halfLevelIncreased ? 'Metade do nível aumentou' : 'Metade do nível mantida (nível ímpar)'}</span>
              </div>
              <div className={`gain${trainingIncreased ? ' is-up' : ''}`}>
                <Star size={18} />
                <span className="gain-value">Treino +{trainingOf(nextTotalLevel)}</span>
                <span className="gain-sub">{trainingIncreased ? 'Novo patamar de treino!' : 'Patamar mantido'}</span>
              </div>
            </div>

            {subclassOptions && (
              <SelectField
                label={`${chosenClassDef.subclasses!.title} (1º nível de ${chosenClassDef.name})`}
                value={newSubclass}
                onChange={(v) => {
                  setNewSubclass(v);
                  setSelectedSpells([]);
                }}
                options={[{ value: '', label: 'Escolha…' }, ...subclassOptions.map((o) => ({ value: o.id, label: o.name }))]}
              />
            )}

            {needsSchools && (
              <div className="card stack-sm">
                <span className="t-label">Escolas de magia ({newSchools.length}/3)</span>
                <span className="t-xs t-3">
                  {chosenClassDef.name}: escolha três escolas de magia; você só aprende magias delas (Cap. 1, pág. {chosenClassDef.page}).
                </span>
                <div className="chip-wrap">
                  {SPELL_SCHOOLS.map((sc) => {
                    const on = newSchools.includes(sc);
                    return (
                      <button
                        key={sc}
                        type="button"
                        className="chip"
                        aria-pressed={on}
                        disabled={!on && newSchools.length >= 3}
                        onClick={() => {
                          setNewSchools(on ? newSchools.filter((x) => x !== sc) : [...newSchools, sc]);
                          setSelectedSpells([]);
                        }}
                      >
                        {sc}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <section className="stack-sm">
              <span className="eyebrow">Habilidades de {chosenClassDef.name} no {nextClassLevel}º nível</span>
              {progressionRow && <span className="t-sm t-2">{progressionRow.features}</span>}
              {newAbilities.length > 0 ? (
                <div className="stack-sm">
                  {newAbilities.map((a) => (
                    <article key={a.id} className="card stack-xs">
                      <span className="row-title hstack-xs wrap">
                        {a.name}
                        {a.cost && <span className="badge badge-mp">{a.cost}</span>}
                      </span>
                      <p className="t-sm t-2 pre-line">{cleanT20Text(a.description)}</p>
                    </article>
                  ))}
                </div>
              ) : (
                !grantsPower && <span className="t-xs t-3">Nenhuma habilidade nova neste nível.</span>
              )}
              <span className="t-xs t-3">
                {grantsPower
                  ? `Este nível concede um poder de ${chosenClassDef.name.toLowerCase()} (ou um poder geral) — próxima etapa.`
                  : `Sem poder neste nível: na tabela da classe, o ${nextClassLevel}º nível não concede poder de ${chosenClassDef.name.toLowerCase()}.`}
                {spellsToLearn > 0 ? ` Você aprende ${spellsToLearn} magia${spellsToLearn > 1 ? 's' : ''}.` : ''}
              </span>
            </section>

            {chosenClassDef.progression && (
              <details className="card" open>
                <summary className="t-sm t-semibold">Tabela: {chosenClassDef.name} (Cap. 1, pág. {chosenClassDef.page})</summary>
                <table className="class-table">
                  <thead>
                    <tr>
                      <th>Nível</th>
                      <th>Habilidades de Classe</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chosenClassDef.progression.map((row) => (
                      <tr key={row.level} className={row.level === nextClassLevel ? 'is-current' : row.level <= currentClassLevel ? 'is-done' : undefined}>
                        <td>{row.level}º</td>
                        <td>{row.features}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </details>
            )}

            {unlockedNewCircle && (
              <div className="callout callout-accent">
                <Zap size={18} />
                <span>
                  <strong>{nextCircle}º círculo desbloqueado!</strong> Novas magias disponíveis para {chosenClassDef.name}.
                </span>
              </div>
            )}

            <p className="t-xs t-3">
              Referência: Tormenta 20 JDA (v1.3), Capítulo 1 — Subindo de nível e multiclasse, págs. 36–37.
            </p>
          </div>
        )}

        {step === 'poder' && (
          <div className="animate-in">
            {selectedPowerPrereq && !selectedPowerPrereq.isMet && (
              <div className="callout callout-warning" style={{ margin: 16 }}>
                <AlertTriangle size={18} />
                <span>
                  Pré-requisitos não atendidos: {selectedPowerPrereq.unmetRequirements.join(', ')}. Um poder só pode ser escolhido quando os pré-requisitos são cumpridos (Cap. 1, pág. 33).
                </span>
              </div>
            )}
            {selectedGrant && grantNeeded > 0 && (
              <div className="card stack-sm" style={{ margin: 16 }}>
                <span className="t-label">
                  {selectedGrant.options ? 'Animal totêmico' : `Magias de ${selectedPower?.name}`} ({powerSpells.length}/{grantNeeded})
                </span>
                {powerSpells.length > 0 && (
                  <div className="chip-wrap">
                    {powerSpells.map((sp) => (
                      <span key={sp.id} className="badge badge-mp">
                        <Zap size={12} />
                        {sp.name}
                      </span>
                    ))}
                  </div>
                )}
                <button type="button" className="btn btn-tonal btn-sm" onClick={() => setPowerSpellPickerOpen(true)}>
                  <Zap size={16} />
                  {powerSpells.length ? 'Trocar escolha' : selectedGrant.options ? 'Escolher animal' : 'Escolher magias'}
                </button>
              </div>
            )}
            {selectedGrant?.fixed && (
              <div className="callout callout-accent" style={{ margin: 16 }}>
                <Zap size={18} />
                <span>
                  Você aprende {selectedGrant.fixed.join(', ')} (pág. {selectedGrant.page}).
                </span>
              </div>
            )}
            {selectedPower?.name === 'Aumento de Atributo' && (
              <div className="card stack-sm" style={{ margin: 16 }}>
                <span className="t-label">Atributo que recebe +1</span>
                <div className="attr-chips">
                  {ATTRIBUTES_LIST.map((attr) => {
                    const used = increasedInTier(attr.key);
                    return (
                      <button
                        key={attr.key}
                        type="button"
                        className="attr-chip"
                        aria-pressed={increaseAttr === attr.key}
                        disabled={used}
                        title={used ? 'Já aumentado neste patamar (Cap. 1, pág. 35)' : attr.name}
                        onClick={() => setIncreaseAttr(attr.key)}
                      >
                        <span className="attr-chip-key">{attr.shortName}</span>
                        <span className="attr-chip-sub">{used ? 'neste patamar' : `${character.totalAttributes[attr.key]} → ${character.totalAttributes[attr.key] + 1}`}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {filteredPowers.length === 0 ? (
              <div style={{ padding: 16 }}>
                <EmptyState title="Nenhum poder encontrado" description="Ajuste a busca ou troque o tipo de poder." />
              </div>
            ) : (
              <div className="list list-plain" role="radiogroup" aria-label="Poderes disponíveis">
                {filteredPowers.map((pow) => {
                  const isSelected = selectedPower?.name === pow.name;
                  const prereq = checkPowerPrerequisites(pow.name, validationContext);
                  return (
                    <div key={pow.id || pow.name} className={`row pick-row${isSelected ? ' is-selected' : ''}`}>
                      <button
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        className="pick-main"
                        disabled={!prereq.isMet && !isSelected}
                        onClick={() => choosePower(isSelected ? null : pow)}
                      >
                        <span className={`mark mark-radio${isSelected ? ' is-on' : ''}`}>{isSelected && <Check size={14} strokeWidth={3} />}</span>
                        <span className="row-main">
                          <span className="row-title">{cleanT20Text(pow.name)}</span>
                          <span className="row-sub clamp-2">{cleanT20Text(pow.description)}</span>
                          <span className="hstack-xs wrap">
                            {'category' in pow && <PowerCategoryBadge category={pow.category} />}
                            {pow.prerequisites ? (
                              <span className={`badge ${prereq.isMet ? 'badge-success' : 'badge-warning'}`}>
                                {prereq.isMet ? 'Requisitos ok' : `Falta: ${prereq.unmetRequirements.join(', ')}`}
                              </span>
                            ) : (
                              <span className="badge">Sem pré-requisito</span>
                            )}
                          </span>
                        </span>
                      </button>
                      <button type="button" className="icon-btn icon-btn-sm" onClick={() => openPowerDetail(pow)} aria-label={`Detalhes de ${pow.name}`}>
                        <Info size={18} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {step === 'magia' && (
          <div className="animate-in">
            {availableSpells.length === 0 ? (
              <div style={{ padding: 16 }}>
                <EmptyState icon={<BookOpen size={24} />} title="Nenhuma magia disponível" description="Ajuste o círculo ou a busca." />
              </div>
            ) : (
              <div className="list list-plain" role="group" aria-label="Magias disponíveis">
                <p className="t-xs t-3" style={{ padding: '12px 16px 0' }}>
                  Escolha {spellsToLearn} magia{spellsToLearn > 1 ? 's' : ''} ({selectedSpells.length}/{spellsToLearn}).
                </p>
                {availableSpells.map((sp) => {
                  const isSelected = selectedSpells.some((x) => x.id === sp.id);
                  const full = !isSelected && selectedSpells.length >= spellsToLearn;
                  return (
                    <div key={sp.id} className={`row pick-row${isSelected ? ' is-selected' : ''}`}>
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={isSelected}
                        aria-disabled={full || undefined}
                        className="pick-main"
                        onClick={() =>
                          isSelected
                            ? setSelectedSpells(selectedSpells.filter((x) => x.id !== sp.id))
                            : spellsToLearn === 1
                              ? setSelectedSpells([sp])
                              : !full && setSelectedSpells([...selectedSpells, sp])
                        }
                      >
                        <span className={`mark${spellsToLearn === 1 ? ' mark-radio' : ''}${isSelected ? ' is-on' : ''}`}>{isSelected && <Check size={14} strokeWidth={3} />}</span>
                        <span className="row-main">
                          <span className="row-title">{cleanT20Text(sp.name)}</span>
                          <span className="hstack-xs wrap">
                            <span className="badge badge-mp">{sp.circle}º · {BASE_COST_BY_CIRCLE[sp.circle] || 1} PM</span>
                            <SchoolBadge school={sp.school} />
                          </span>
                        </span>
                      </button>
                      <button type="button" className="icon-btn icon-btn-sm" onClick={() => openSpellDetail(sp)} aria-label={`Detalhes de ${sp.name}`}>
                        <Info size={18} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </Sheet>

      <DetailModal data={modalDetail} onClose={() => setModalDetail(null)} />
      {selectedGrant && powerSpellPickerOpen && (
        <PowerSpellPicker
          open
          grant={selectedGrant}
          owner={ownerAfter}
          remaining={grantNeeded}
          onClose={() => setPowerSpellPickerOpen(false)}
          onConfirm={setPowerSpells}
        />
      )}
    </>
  );
};
