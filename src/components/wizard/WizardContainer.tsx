import React, { useEffect, useState } from 'react';
import { CharacterSheet, CharacterAttributes, CharacterInventoryItem, CharacterPower } from '../../types/character';
import { AttributeKey } from '../../types/rules';
import { RACES_LIST } from '../../data/races';
import { CLASSES_LIST } from '../../data/classes';
import { ORIGINS_LIST } from '../../data/origins';
import { DEITIES_LIST } from '../../data/deities';
import { SKILLS_LIST } from '../../data/skills';
import { SPELLS_LIST } from '../../data/spells';
import { GENERAL_POWERS_LIST } from '../../data/generalPowers';
import { validateAllWizardSteps, PrerequisiteContext } from '../../utils/rulesValidation';
import {
  calculateRacialModifiers,
  calculateTotalAttributes,
  calculateArmorPenalty,
  calculateDefense,
  calculateMaxHp,
  calculateMaxMp,
  calculateMaxSpaces,
  calculateSkillBonus,
  calculateSpeed,
} from '../../utils/rulesEngine';

import { StepRace } from './StepRace';
import { StepClass } from './StepClass';
import { StepOrigin } from './StepOrigin';
import { StepDeity } from './StepDeity';
import { StepAttributes } from './StepAttributes';
import { StepSkills } from './StepSkills';
import { StepSpells } from './StepSpells';
import { StepEquipment } from './StepEquipment';
import { StepFinal } from './StepFinal';
import { DetailModal, DetailModalData } from '../common/DetailModal';
import { AlertCircle, ArrowLeft, ArrowRight, Check, ListChecks, Save, X } from 'lucide-react';
import { AppBar } from '../ui/AppBar';
import { Sheet } from '../ui/Sheet';
import { useBackHandler } from '../ui/backStack';
import { useFeedback } from '../ui/Feedback';

interface WizardContainerProps {
  initialCharacter?: CharacterSheet | null;
  onSave: (character: CharacterSheet) => void;
  onCancel: () => void;
}

export const WizardContainer: React.FC<WizardContainerProps> = ({
  initialCharacter,
  onSave,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [modalDetail, setModalDetail] = useState<DetailModalData | null>(null);
  const [visited, setVisited] = useState<Set<number>>(() => new Set(initialCharacter ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : []));
  const [stepsOpen, setStepsOpen] = useState(false);
  const { confirm } = useFeedback();

  // Estados da Ficha
  const [name, setName] = useState(initialCharacter?.name || '');
  const [playerName, setPlayerName] = useState(initialCharacter?.playerName || '');
  const [concept, setConcept] = useState(initialCharacter?.concept || '');
  const [bio, setBio] = useState<CharacterSheet['bio']>(initialCharacter?.bio || {});

  // Raça
  const [raceId, setRaceId] = useState(initialCharacter?.raceId || 'humano');
  const [subraceId, setSubraceId] = useState(initialCharacter?.subraceId || 'aggelus');
  const [selectedRacialAttributes, setSelectedRacialAttributes] = useState<AttributeKey[]>(
    initialCharacter?.selectedRacialAttributes || ['for', 'des', 'con']
  );
  const [selectedRacialSkills, setSelectedRacialSkills] = useState<string[]>(
    initialCharacter?.selectedRacialSkills || ['iniciativa', 'percepcao']
  );
  const [selectedRacialPower, setSelectedRacialPower] = useState<string | undefined>(
    initialCharacter?.selectedRacialPower
  );

  const handleSelectRace = (newRaceId: string) => {
    setRaceId(newRaceId);
    const newRace = RACES_LIST.find((r) => r.id === newRaceId);
    if (newRace) {
      if (newRace.id === 'humano') {
        setSelectedRacialAttributes(['for', 'des', 'con']);
        setSelectedRacialSkills(['iniciativa', 'percepcao']);
        setSelectedRacialPower(undefined);
      } else if (newRace.id === 'lefou') {
        setSelectedRacialAttributes(['for', 'des', 'con']);
        setSelectedRacialSkills(['luta', 'fortitude']);
        setSelectedRacialPower(undefined);
      } else if (newRace.id === 'osteon') {
        setSelectedRacialAttributes(['for', 'des', 'int']);
        setSelectedRacialSkills(['iniciativa']);
        setSelectedRacialPower(undefined);
      } else if (newRace.id === 'sereia') {
        setSelectedRacialAttributes(['car', 'des', 'con']);
        setSelectedRacialSkills([]);
        setSelectedRacialPower(undefined);
      } else {
        setSelectedRacialAttributes([]);
        setSelectedRacialSkills([]);
        setSelectedRacialPower(undefined);
      }
    }
  };

  // Classe
  const [classId, setClassId] = useState(initialCharacter?.classId || 'guerreiro');
  const [classSubclass, setClassSubclass] = useState<string | undefined>(
    initialCharacter?.classSubclass || 'mago'
  );
  const [selectedClassSkills, setSelectedClassSkills] = useState<string[]>(
    initialCharacter?.selectedClassSkills || []
  );

  // Trocar de classe invalida perícias de classe, magias e subclasse escolhidas
  const handleSelectClass = (newClassId: string) => {
    if (newClassId === classId) return;
    const def = CLASSES_LIST.find((c) => c.id === newClassId);
    setClassId(newClassId);
    setSelectedClassSkills([]);
    setSelectedSpells([]);
    setClassSubclass(def?.subclasses?.options[0]?.id);
  };

  // Origem
  const [originId, setOriginId] = useState(initialCharacter?.originId || 'soldado');
  const [selectedOriginBenefits, setSelectedOriginBenefits] = useState<{ type: 'pericia' | 'poder'; name: string }[]>(
    initialCharacter?.selectedOriginBenefits || [
      { type: 'pericia', name: 'guerra' },
      { type: 'poder', name: 'Influência Militar' },
    ]
  );

  // Divindade
  const [deityId, setDeityId] = useState(initialCharacter?.deityId || 'arsenal');
  const [selectedDeityPowers, setSelectedDeityPowers] = useState<string[]>(
    initialCharacter?.selectedDeityPowers || ['Sangue de Ferro']
  );

  // Atributos
  const [attributeMethod, setAttributeMethod] = useState<'point_buy' | 'standard' | 'roll' | 'free'>(
    initialCharacter?.attributeMethod || 'point_buy'
  );
  const [baseAttributes, setBaseAttributes] = useState<CharacterAttributes>(
    initialCharacter?.baseAttributes || { for: 0, des: 0, con: 0, int: 0, sab: 0, car: 0 }
  );

  // Perícias por Inteligência
  const [selectedIntSkills, setSelectedIntSkills] = useState<string[]>(
    initialCharacter?.selectedIntSkills || []
  );

  // Magias
  const [selectedSpells, setSelectedSpells] = useState<string[]>(
    initialCharacter?.spells.map((s) => s.id) || []
  );

  // Equipamento & Inventário
  const [inventory, setInventory] = useState<CharacterInventoryItem[]>(
    initialCharacter?.inventory || [
      {
        id: 'inv_init_1',
        equipmentId: 'espada_longa',
        name: 'Espada longa',
        category: 'arma_marcial',
        spaces: 1,
        quantity: 1,
        isEquipped: true,
        damage: '1d8',
        critical: '19',
        price: 'T$ 15',
        isFree: true,
        source: 'inicial',
      },
      {
        id: 'inv_init_2',
        equipmentId: 'armadura_couro',
        name: 'Armadura de couro',
        category: 'armadura_leve',
        spaces: 2,
        quantity: 1,
        isEquipped: true,
        defenseBonus: 2,
        armorPenalty: 0,
        price: 'T$ 20',
        isFree: true,
        source: 'inicial',
      },
      {
        id: 'inv_init_3',
        equipmentId: 'mochila',
        name: 'Mochila de Aventureiro',
        category: 'item_geral',
        spaces: 0,
        quantity: 1,
        isEquipped: true,
        price: 'T$ 2',
        isFree: true,
        source: 'inicial',
      },
    ]
  );
  const [tibares, setTibares] = useState<number>(initialCharacter?.tibares || (classId === 'nobre' ? 200 : 100));

  // Entidades e Cálculos Dinâmicos
  const currentRace = RACES_LIST.find((r) => r.id === raceId) || RACES_LIST[0];
  const currentClass = CLASSES_LIST.find((c) => c.id === classId) || CLASSES_LIST[0];
  const currentOrigin = ORIGINS_LIST.find((o) => o.id === originId) || ORIGINS_LIST[0];
  const currentDeity = DEITIES_LIST.find((d) => d.id === deityId);

  // Modificadores raciais e Atributos totais
  const racialModifiers = calculateRacialModifiers(raceId, subraceId, selectedRacialAttributes);
  const totalAttributes = calculateTotalAttributes(baseAttributes, racialModifiers);

  // Poder geral racial (Humano, Osteon, Lefou)
  const racialGeneralPower = GENERAL_POWERS_LIST.find(
    (gp) => gp.id === selectedRacialPower || gp.name === selectedRacialPower
  );

  // Lista de poderes ativos para regras de cálculo
  const powerNames: string[] = [
    ...currentRace.abilities.map((a) => a.name),
    ...(racialGeneralPower ? [racialGeneralPower.name] : []),
    ...selectedOriginBenefits.filter((b) => b.type === 'poder').map((b) => b.name),
    ...selectedDeityPowers,
  ];

  // Cálculos Derivados
  const armorPenalty = calculateArmorPenalty(inventory);
  const maxHp = calculateMaxHp(1, totalAttributes, classId, raceId, powerNames);
  const maxMp = calculateMaxMp(1, classId, raceId, powerNames);
  const defense = calculateDefense(1, totalAttributes, inventory, raceId, classId, powerNames);
  const speed = calculateSpeed(raceId, inventory, powerNames);
  const maxSpaces = calculateMaxSpaces(totalAttributes, inventory, powerNames);
  const currentSpaces = inventory.reduce((acc, item) => acc + item.spaces * item.quantity, 0);

  // Perícias Treinadas
  const trainedSkillIds = new Set<string>([
    ...currentClass.mandatorySkills,
    ...selectedClassSkills,
    ...(currentRace.id === 'humano' || currentRace.id === 'osteon' ? selectedRacialSkills : []),
    ...selectedOriginBenefits.filter((b) => b.type === 'pericia').map((b) => b.name),
    ...selectedIntSkills,
  ]);

  const isSpellcaster = Boolean(currentClass.spellcaster);
  const allowedSpellsCount = currentClass.spellcaster?.circle1Count || 0;

  // Contexto de pré-requisitos para validação de poderes
  const prereqContext: PrerequisiteContext = {
    attributes: totalAttributes,
    trainedSkillIds,
    proficiencies: currentClass.proficiencies,
    isSpellcaster,
  };

  // Mapa reativo de validação de todas as etapas (Anexo 3)
  const validationMap = validateAllWizardSteps({
    raceId,
    selectedRacialAttributes,
    selectedRacialSkills,
    selectedRacialPower,
    classId,
    selectedClassSkills,
    originId,
    selectedOriginBenefits,
    deityId,
    selectedDeityPowers,
    attributeMethod,
    baseAttributes,
    totalAttributes,
    selectedIntSkills,
    selectedSpells,
    currentSpaces,
    maxSpaces: maxSpaces.value,
    characterName: name,
  });

  const currentStepStatus = validationMap[currentStep] || {
    step: currentStep,
    isValid: true,
    isIncomplete: false,
    hasError: false,
    errors: [],
    warnings: [],
  };

  const hasAnyErrors = Object.values(validationMap).some((v) => v.hasError);

  // Passos do Wizard
  const steps = [
    { num: 1, title: 'Raça' },
    { num: 2, title: 'Classe' },
    { num: 3, title: 'Origem' },
    { num: 4, title: 'Divindade' },
    { num: 5, title: 'Atributos' },
    { num: 6, title: 'Perícias' },
    ...(isSpellcaster ? [{ num: 7, title: 'Magias' }] : []),
    { num: 8, title: 'Equipamento' },
    { num: 9, title: 'Toques Finais' },
  ];

  const stepIndex = Math.max(0, steps.findIndex((st) => st.num === currentStep));
  const isLastStep = stepIndex === steps.length - 1;

  // Se a classe deixar de ser conjuradora estando no passo de magias, avança
  useEffect(() => {
    if (!steps.some((st) => st.num === currentStep)) setCurrentStep(8);
  }, [isSpellcaster]); // eslint-disable-line react-hooks/exhaustive-deps

  const goToStep = (num: number) => {
    setVisited((prev) => new Set(prev).add(currentStep));
    setCurrentStep(num);
    window.scrollTo({ top: 0 });
  };

  const handleNextStep = () => {
    if (!isLastStep) goToStep(steps[stepIndex + 1].num);
  };

  const handlePrevStep = () => {
    if (stepIndex > 0) goToStep(steps[stepIndex - 1].num);
  };

  // Salvar Personagem
  const handleSaveCharacter = () => {
    const finalName = name.trim() || `${currentRace.name} ${currentClass.name}`;

    // Monta mapa de perícias completo com somatórias
    const fullSkillsRecord: Record<string, any> = {};
    SKILLS_LIST.forEach((s) => {
      const isTrained = trainedSkillIds.has(s.id);
      const bonus = calculateSkillBonus(
        s.id,
        1,
        totalAttributes,
        isTrained,
        armorPenalty.value,
        raceId,
        powerNames,
        selectedRacialSkills
      );
      fullSkillsRecord[s.id] = {
        id: s.id,
        name: s.name,
        attribute: s.attribute,
        isTrained,
        total: bonus.total,
        breakdown: bonus.breakdown,
        source: isTrained ? 'classe' : 'custom',
      };
    });

    // Monta lista de poderes do personagem
    const allPowers: CharacterPower[] = [
      ...currentRace.abilities.map((a) => ({
        id: a.id,
        name: a.name,
        source: 'raca' as const,
        description: a.description,
        cost: a.cost,
        type: a.type,
      })),
      ...(racialGeneralPower
        ? [
            {
              id: 'raca_poder_' + racialGeneralPower.id,
              name: racialGeneralPower.name,
              source: (currentRace.id === 'lefou' ? 'tormenta' : 'geral') as any,
              description: racialGeneralPower.description,
              type: (racialGeneralPower.category === 'combate' ? 'combate' : 'passiva') as any,
            },
          ]
        : []),
      ...currentClass.abilitiesLevel1.map((a) => ({
        id: a.id,
        name: a.name,
        source: 'classe' as const,
        description: a.description,
        cost: a.cost,
        type: a.type,
      })),
      ...selectedOriginBenefits
        .filter((b) => b.type === 'poder')
        .map((b) => {
          const powDef = currentOrigin.powers.find((p) => p.name === b.name);
          const generalPowDef = GENERAL_POWERS_LIST.find((gp) => gp.name === b.name || gp.id === b.name);
          return {
            id: 'origem_' + b.name.toLowerCase().replace(/\s+/g, '_'),
            name: b.name,
            source: 'origem' as const,
            description: powDef?.description || generalPowDef?.description || 'Poder garantido por sua origem.',
            type: powDef?.type || generalPowDef?.category,
          };
        }),
      ...selectedDeityPowers.map((powName) => {
        const pDef = currentDeity?.grantedPowers.find((p) => p.name === powName);
        return {
          id: 'deity_' + powName.toLowerCase().replace(/\s+/g, '_'),
          name: powName,
          source: 'divindade' as const,
          description: pDef?.description || 'Poder concedido por sua divindade.',
        };
      }),
    ];

    // Monta magias aprendidas
    const finalSpells = isSpellcaster
      ? selectedSpells.map((sId) => {
          const spDef = SPELLS_LIST.find((s) => s.id === sId)!;
          return {
            ...spDef,
            learnedFrom: 'classe' as const,
          };
        })
      : [];

    const newCharacter: CharacterSheet = {
      id: initialCharacter?.id || 'char_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      name: finalName,
      playerName: playerName.trim() || 'Jogador',
      concept: concept.trim() || `${currentRace.name} ${currentClass.name}`,
      level: 1,
      xp: 0,
      raceId,
      subraceId,
      selectedRacialAttributes,
      selectedRacialSkills,
      selectedRacialPower,
      classId,
      classSubclass,
      selectedClassSkills,
      selectedIntSkills,
      originId,
      selectedOriginBenefits,
      deityId,
      selectedDeityPowers,
      attributeMethod,
      baseAttributes,
      racialModifiers,
      totalAttributes,
      stats: {
        maxHp,
        currentHp: maxHp.value,
        tempHp: 0,
        maxMp,
        currentMp: maxMp.value,
        tempMp: 0,
        defense,
        speed,
        armorPenalty,
        maxSpaces,
        currentSpaces,
      },
      skills: fullSkillsRecord,
      powers: allPowers,
      spells: finalSpells,
      inventory,
      tibares,
      activeConditions: [],
      bio,
      notes: initialCharacter?.notes,
      createdAt: initialCharacter?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Confete de celebração (carregado sob demanda)
    import('canvas-confetti')
      .then(({ default: confetti }) => {
        const css = getComputedStyle(document.documentElement);
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.7 },
          zIndex: 1000,
          colors: [css.getPropertyValue('--accent').trim(), css.getPropertyValue('--gold').trim(), '#ffffff'].filter(Boolean),
        });
      })
      .catch(() => {});

    onSave(newCharacter);
  };

  const requestCancel = async () => {
    const ok = await confirm({
      title: initialCharacter ? 'Descartar alterações?' : 'Descartar este herói?',
      message: 'As escolhas feitas no criador serão perdidas.',
      confirmLabel: 'Descartar',
      cancelLabel: 'Continuar criando',
      tone: 'danger',
    });
    if (ok) onCancel();
  };

  // Botão voltar (Android): volta um passo; no primeiro, pergunta se descarta
  useBackHandler(true, () => (stepIndex > 0 ? handlePrevStep() : requestCancel()), 'flow');

  const stepState = (num: number) => {
    const st = validationMap[num];
    if (num === currentStep) return 'current';
    if (st?.hasError && visited.has(num)) return 'error';
    if (visited.has(num) && st?.isValid) return 'done';
    return 'todo';
  };

  const errorSteps = steps.filter((st) => validationMap[st.num]?.hasError);
  const showErrors = currentStepStatus.errors.length > 0 && (visited.has(currentStep) || isLastStep);

  return (
    <>
      <AppBar
        leading={
          <button type="button" className="icon-btn" onClick={requestCancel} aria-label="Fechar criador">
            <X size={22} />
          </button>
        }
        title={initialCharacter ? 'Editar herói' : 'Novo herói'}
        subtitle={`Passo ${stepIndex + 1} de ${steps.length} · ${steps[stepIndex]?.title}`}
        actions={
          <button type="button" className="wiz-summary-chip" onClick={() => setStepsOpen(true)} aria-label="Resumo e etapas">
            <span>PV {maxHp.value}</span>
            <span>PM {maxMp.value}</span>
            <span>Def {defense.value}</span>
          </button>
        }
      />

      <div className="wiz-progress no-print" role="list" aria-label="Etapas do criador">
        {steps.map((st) => (
          <button
            key={st.num}
            type="button"
            role="listitem"
            className={`wiz-seg is-${stepState(st.num)}`}
            onClick={() => goToStep(st.num)}
            aria-label={`${st.title}${validationMap[st.num]?.hasError ? ' (pendente)' : ''}`}
            aria-current={st.num === currentStep ? 'step' : undefined}
          >
            <span className="wiz-seg-bar" />
            <span className="wiz-seg-label">{st.title}</span>
          </button>
        ))}
      </div>

      <main className="page page-flow wizard-page">
        {initialCharacter && initialCharacter.level > 1 && currentStep === 1 && (
          <div className="callout callout-warning" style={{ marginBottom: 16 }}>
            <AlertCircle size={18} />
            <span>
              O criador refaz as escolhas de 1º nível. Ao salvar, {initialCharacter.name} volta ao nível 1 (as anotações são mantidas).
            </span>
          </div>
        )}

        {showErrors && (
          <div className="callout callout-danger animate-in" style={{ marginBottom: 16 }}>
            <AlertCircle size={18} />
            <div className="stack-xs">
              <span className="callout-title">Pendências deste passo</span>
              {currentStepStatus.errors.map((e, i) => (
                <span key={i}>• {e}</span>
              ))}
            </div>
          </div>
        )}
        {currentStepStatus.warnings.length > 0 && (
          <div className="callout callout-warning" style={{ marginBottom: 16 }}>
            <AlertCircle size={18} />
            <div className="stack-xs">
              {currentStepStatus.warnings.map((w, i) => (
                <span key={i}>{w}</span>
              ))}
            </div>
          </div>
        )}

        <div key={currentStep} className="animate-in">
          {currentStep === 1 && (
            <StepRace
              selectedRaceId={raceId}
              selectedSubraceId={subraceId}
              selectedRacialAttributes={selectedRacialAttributes}
              selectedRacialSkills={selectedRacialSkills}
              selectedRacialPower={selectedRacialPower}
              prerequisiteContext={prereqContext}
              classMandatorySkills={currentClass.mandatorySkills}
              onSelectRace={handleSelectRace}
              onSelectSubrace={setSubraceId}
              onSelectRacialAttributes={setSelectedRacialAttributes}
              onSelectRacialSkills={setSelectedRacialSkills}
              onSelectRacialPower={setSelectedRacialPower}
              onOpenDetail={setModalDetail}
            />
          )}
          {currentStep === 2 && (
            <StepClass
              selectedClassId={classId}
              selectedSubclass={classSubclass}
              selectedClassSkills={selectedClassSkills}
              raceSkills={selectedRacialSkills}
              intSkills={selectedIntSkills}
              alreadyTrainedSkills={[...selectedRacialSkills, ...selectedIntSkills]}
              onSelectClass={handleSelectClass}
              onSelectSubclass={setClassSubclass}
              onSelectClassSkills={setSelectedClassSkills}
              onOpenDetail={setModalDetail}
            />
          )}
          {currentStep === 3 && (
            <StepOrigin
              selectedOriginId={originId}
              selectedOriginBenefits={selectedOriginBenefits}
              raceSkills={selectedRacialSkills}
              classSkills={[...currentClass.mandatorySkills, ...selectedClassSkills]}
              intSkills={selectedIntSkills}
              alreadyTrainedSkills={[...selectedRacialSkills, ...currentClass.mandatorySkills, ...selectedClassSkills, ...selectedIntSkills]}
              prerequisiteContext={prereqContext}
              onSelectOrigin={setOriginId}
              onSelectOriginBenefits={setSelectedOriginBenefits}
              onOpenDetail={setModalDetail}
            />
          )}
          {currentStep === 4 && (
            <StepDeity
              selectedDeityId={deityId}
              selectedDeityPowers={selectedDeityPowers}
              characterClassId={classId}
              characterRaceId={raceId}
              onSelectDeity={setDeityId}
              onSelectDeityPowers={setSelectedDeityPowers}
              onOpenDetail={setModalDetail}
            />
          )}
          {currentStep === 5 && (
            <StepAttributes
              method={attributeMethod}
              baseAttributes={baseAttributes}
              racialModifiers={racialModifiers}
              onSelectMethod={setAttributeMethod}
              onChangeBaseAttributes={setBaseAttributes}
              onOpenDetail={setModalDetail}
            />
          )}
          {currentStep === 6 && (
            <StepSkills
              totalAttributes={totalAttributes}
              raceSkills={raceId === 'humano' || raceId === 'osteon' ? selectedRacialSkills : []}
              classSkills={[...currentClass.mandatorySkills, ...selectedClassSkills]}
              originSkills={selectedOriginBenefits.filter((b) => b.type === 'pericia').map((b) => b.name)}
              selectedIntSkills={selectedIntSkills}
              onSelectIntSkills={setSelectedIntSkills}
              onOpenDetail={setModalDetail}
            />
          )}
          {currentStep === 7 && isSpellcaster && (
            <StepSpells
              isSpellcaster={isSpellcaster}
              spellcasterType={currentClass.spellcaster?.type}
              allowedCount={allowedSpellsCount}
              selectedSpells={selectedSpells}
              onSelectSpells={setSelectedSpells}
              onOpenDetail={setModalDetail}
            />
          )}
          {currentStep === 8 && (
            <StepEquipment
              inventory={inventory}
              tibares={tibares}
              maxSpaces={maxSpaces.value}
              currentSpaces={currentSpaces}
              classId={classId}
              originId={originId}
              onUpdateInventory={setInventory}
              onUpdateTibares={setTibares}
              onOpenDetail={setModalDetail}
            />
          )}
          {currentStep === 9 && (
            <StepFinal
              name={name}
              playerName={playerName}
              concept={concept}
              bio={bio}
              raceId={raceId}
              classId={classId}
              originId={originId}
              deityId={deityId}
              totalAttributes={totalAttributes}
              stats={{
                maxHp,
                currentHp: maxHp.value,
                tempHp: 0,
                maxMp,
                currentMp: maxMp.value,
                tempMp: 0,
                defense,
                speed,
                armorPenalty,
                maxSpaces,
                currentSpaces,
              }}
              trainedSkillsCount={trainedSkillIds.size}
              powersCount={powerNames.length}
              spellsCount={isSpellcaster ? selectedSpells.length : 0}
              onChangeName={setName}
              onChangePlayerName={setPlayerName}
              onChangeConcept={setConcept}
              onChangeBio={setBio}
            />
          )}
        </div>
      </main>

      <div className="action-bar no-print">
        <div className="action-bar-inner">
          <button type="button" className="btn btn-secondary" onClick={handlePrevStep} disabled={stepIndex === 0} aria-label="Passo anterior">
            <ArrowLeft size={18} />
            <span className="hide-xs">Voltar</span>
          </button>
          {isLastStep ? (
            <button type="button" className="btn btn-primary btn-lg grow" onClick={hasAnyErrors ? () => setStepsOpen(true) : handleSaveCharacter}>
              {hasAnyErrors ? (
                <>
                  <AlertCircle size={18} />
                  {errorSteps.length} {errorSteps.length === 1 ? 'etapa pendente' : 'etapas pendentes'}
                </>
              ) : (
                <>
                  <Save size={18} />
                  {initialCharacter ? 'Salvar alterações' : 'Criar herói'}
                </>
              )}
            </button>
          ) : (
            <button type="button" className="btn btn-primary btn-lg grow" onClick={handleNextStep}>
              {steps[stepIndex + 1]?.title}
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>

      <Sheet open={stepsOpen} onClose={() => setStepsOpen(false)} title="Resumo do herói" icon={<ListChecks size={22} />} size="sm" flush>
        <div className="wiz-summary grid-3">
          <div className="stat">
            <span className="stat-label">PV</span>
            <span className="stat-value t-hp">{maxHp.value}</span>
          </div>
          <div className="stat">
            <span className="stat-label">PM</span>
            <span className="stat-value t-mp">{maxMp.value}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Defesa</span>
            <span className="stat-value">{defense.value}</span>
          </div>
        </div>
        <div className="list list-plain">
          {steps.map((st, i) => {
            const status = validationMap[st.num];
            return (
              <button
                key={st.num}
                type="button"
                className={`row${st.num === currentStep ? ' is-selected' : ''}`}
                onClick={() => {
                  setStepsOpen(false);
                  goToStep(st.num);
                }}
              >
                <span className={`step-dot${status?.hasError ? ' is-error' : status?.isValid ? ' is-ok' : ''}`}>
                  {status?.hasError ? '!' : status?.isValid ? <Check size={13} strokeWidth={3} /> : i + 1}
                </span>
                <span className="row-main">
                  <span className="row-title">{st.title}</span>
                  {status?.hasError && <span className="row-sub t-danger">{status.errors.join(' · ')}</span>}
                </span>
              </button>
            );
          })}
        </div>
      </Sheet>

      <DetailModal data={modalDetail} onClose={() => setModalDetail(null)} />
    </>
  );
};
