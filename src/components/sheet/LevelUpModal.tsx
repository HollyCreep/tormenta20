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
import type { ClassPower, GeneralPower, Spell } from '../../types/rules';
import { CLASSES_LIST } from '../../data/classes';
import { CLASS_POWERS_LIST } from '../../data/classPowers';
import { GENERAL_POWERS_LIST } from '../../data/generalPowers';
import { SPELLS_LIST } from '../../data/spells';
import { calculateSpellCircleUnlocked, recalculateFullCharacterSheet } from '../../utils/rulesEngine';
import { checkPowerPrerequisites } from '../../utils/rulesValidation';
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
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
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
  const nextCircle = calculateSpellCircleUnlocked(nextClassLevel);
  const unlockedNewCircle = isSpellcaster && nextCircle > calculateSpellCircleUnlocked(currentClassLevel);

  const steps: Step[] = isSpellcaster ? ['classe', 'poder', 'magia'] : ['classe', 'poder'];
  const stepIndex = Math.max(0, steps.indexOf(step));
  const isLast = stepIndex === steps.length - 1;

  const validationContext = useMemo(() => {
    const trainedIds = Object.values(character.skills)
      .filter((s) => s.isTrained)
      .map((s) => s.id);
    return {
      attributes: character.totalAttributes,
      trainedSkillIds: trainedIds,
      proficiencies: {
        weapons: chosenClassDef.proficiencies.weapons,
        armor: chosenClassDef.proficiencies.armor,
        shields: chosenClassDef.proficiencies.shields,
      },
      isSpellcaster: isSpellcaster || Boolean(character.spells && character.spells.length > 0),
    };
  }, [character, chosenClassDef, isSpellcaster]);

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

  const availableSpells = useMemo(() => {
    if (!isSpellcaster) return [];
    const type = chosenClassDef.spellcaster?.type || 'arcana';
    const circle = parseInt(spellCircleFilter, 10);
    const q = spellSearch.toLowerCase();
    return SPELLS_LIST.filter((s) => {
      const matchesType = s.type === type || s.type === 'universal';
      const withinCircle = s.circle <= nextCircle;
      const circleMatches = circle === 0 || s.circle === circle;
      const matchesQuery = !q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
      const alreadyKnown = character.spells.some((cs) => cs.id === s.id);
      return matchesType && withinCircle && circleMatches && matchesQuery && !alreadyKnown;
    }).sort((a, b) => a.circle - b.circle || a.name.localeCompare(b.name, 'pt-BR'));
  }, [isSpellcaster, chosenClassDef, nextCircle, spellCircleFilter, spellSearch, character.spells]);

  const selectedPowerPrereq = selectedPower ? checkPowerPrerequisites(selectedPower.name, validationContext) : null;

  const handleConfirmLevelUp = () => {
    const existingIndex = existingClasses.findIndex((c) => c.classId === selectedClassId);
    const updatedClasses = [...existingClasses];
    if (existingIndex >= 0) {
      updatedClasses[existingIndex] = { ...updatedClasses[existingIndex], level: updatedClasses[existingIndex].level + 1 };
    } else {
      updatedClasses.push({ classId: selectedClassId, className: chosenClassDef.name, level: 1 });
    }

    const updatedPowers: CharacterPower[] = [...(character.powers || [])];
    if (selectedPower) {
      updatedPowers.push({
        id: selectedPower.id || `pow_${Date.now()}`,
        name: selectedPower.name,
        source: powerTypeTab === 'classe' ? 'classe' : 'geral',
        description: selectedPower.description,
        type: 'category' in selectedPower ? selectedPower.category : undefined,
      });
    }

    const updatedSpells: CharacterSpell[] = [...(character.spells || [])];
    if (selectedSpell) updatedSpells.push({ ...selectedSpell, learnedFrom: 'classe' });

    onSaveLevelUp(
      recalculateFullCharacterSheet({
        ...character,
        level: nextTotalLevel,
        classes: updatedClasses,
        powers: updatedPowers,
        spells: updatedSpells,
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
                    setSelectedPower(null);
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
            {(selectedPower || selectedSpell) && (
              <div className="levelup-picks">
                {selectedPower && (
                  <span className="badge badge-accent badge-lg">
                    <Star size={12} />
                    {selectedPower.name}
                  </span>
                )}
                {selectedSpell && (
                  <span className="badge badge-mp badge-lg">
                    <Zap size={12} />
                    {selectedSpell.name}
                  </span>
                )}
              </div>
            )}
            <div className="hstack">
              {stepIndex > 0 && (
                <button type="button" className="btn btn-secondary" onClick={goBack}>
                  <ArrowLeft size={18} />
                  Voltar
                </button>
              )}
              <button type="button" className="btn btn-primary grow" onClick={goNext}>
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
                setSelectedPower(null);
                setSelectedSpell(null);
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
                  setSelectedPower(null);
                  setSelectedSpell(null);
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
                  Pré-requisitos não atendidos: {selectedPowerPrereq.unmetRequirements.join(', ')}. Confirme com o mestre.
                </span>
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
                        onClick={() => setSelectedPower(isSelected ? null : pow)}
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
              <div className="list list-plain" role="radiogroup" aria-label="Magias disponíveis">
                {availableSpells.map((sp) => {
                  const isSelected = selectedSpell?.id === sp.id;
                  return (
                    <div key={sp.id} className={`row pick-row${isSelected ? ' is-selected' : ''}`}>
                      <button
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        className="pick-main"
                        onClick={() => setSelectedSpell(isSelected ? null : sp)}
                      >
                        <span className={`mark mark-radio${isSelected ? ' is-on' : ''}`}>{isSelected && <Check size={14} strokeWidth={3} />}</span>
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
    </>
  );
};
