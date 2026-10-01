import React, { useState } from 'react';
import confetti from 'canvas-confetti';
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

import { ChevronLeft, ChevronRight, Save, X, AlertCircle } from 'lucide-react';

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
    initialCharacter?.spells.map((s) => s.id) || ['armadura_arcana', 'adaga_mental', 'explosao_chamas']
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

  // Validação de Avanço - Permite navegação fluida entre passos, bloqueando apenas o salvamento final se houver erros
  const canProceed = () => {
    if (currentStep === 9) {
      return !hasAnyErrors;
    }
    return true;
  };

  const handleNextStep = () => {
    let next = currentStep + 1;
    // Se não for conjurador e próximo for 7 (Magias), pula para 8
    if (!isSpellcaster && next === 7) {
      next = 8;
    }
    if (next <= 9) {
      setCurrentStep(next);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    let prev = currentStep - 1;
    if (!isSpellcaster && prev === 7) {
      prev = 6;
    }
    if (prev >= 1) {
      setCurrentStep(prev);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
          return {
            id: 'origem_' + b.name.toLowerCase().replace(/\s+/g, '_'),
            name: b.name,
            source: 'origem' as const,
            description: powDef?.description || 'Poder garantido por sua origem.',
            type: powDef?.type,
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
      createdAt: initialCharacter?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Confetti de celebração épica!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e63946', '#fbbf24', '#3b82f6', '#10b981'],
      });
    } catch (e) {
      // Ignora se confetti não carregar
    }

    onSave(newCharacter);
  };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 6rem 1.5rem', maxWidth: '1200px' }}>
      {/* Barra Superior com Título e Fechar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', margin: 0 }}>
            {initialCharacter ? 'Editar Personagem' : 'Criador de Personagem'}
          </h1>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.9rem' }}>
            Tormenta 20: Edição Jogo do Ano (v1.3)
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary"
          style={{ gap: '0.4rem' }}
        >
          <X size={16} />
          Cancelar
        </button>
      </div>

      {/* Navegador Visual de Passos */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        {steps.map((st) => {
          const isActive = st.num === currentStep;
          const status = validationMap[st.num];
          const hasError = status?.hasError;
          const isValid = status?.isValid;

          let badgeBg = 'rgba(255, 255, 255, 0.1)';
          let badgeText = `${st.num}`;
          let borderCol = 'var(--border-color)';
          let btnBg = 'rgba(255, 255, 255, 0.04)';
          let textColor = 'var(--text-muted)';

          if (hasError) {
            borderCol = '#ef4444';
            btnBg = isActive ? 'rgba(239, 68, 68, 0.28)' : 'rgba(239, 68, 68, 0.12)';
            textColor = '#f87171';
            badgeBg = '#ef4444';
            badgeText = '!';
          } else if (isActive) {
            borderCol = 'var(--t20-ruby-hover)';
            btnBg = 'var(--t20-ruby)';
            textColor = '#ffffff';
            badgeBg = 'rgba(0,0,0,0.3)';
            badgeText = `${st.num}`;
          } else if (isValid) {
            borderCol = 'rgba(16, 185, 129, 0.5)';
            btnBg = 'rgba(16, 185, 129, 0.08)';
            textColor = 'var(--t20-gold-light)';
            badgeBg = 'rgba(16, 185, 129, 0.3)';
            badgeText = '✓';
          }

          return (
            <button
              key={st.num}
              type="button"
              onClick={() => {
                setCurrentStep(st.num);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                background: btnBg,
                color: textColor,
                border: `1px solid ${borderCol}`,
                borderRadius: 'var(--radius-md)',
                padding: '0.5rem 0.85rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition)',
              }}
              title={hasError ? `Erros/Pendências: ${status.errors.join('; ')}` : undefined}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: badgeBg,
                  color: hasError ? '#ffffff' : undefined,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                }}
              >
                {badgeText}
              </span>
              <span>{st.title}</span>
            </button>
          );
        })}
      </div>

      {/* Conteúdo da Etapa Atual */}
      <div style={{ minHeight: '520px', paddingBottom: '3rem' }}>
        {/* Banner Reativo de Alerta/Erro na Etapa Atual (Anexo 3) */}
        {currentStepStatus.hasError && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid #ef4444',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1.25rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              animation: 'popoverFadeIn 0.2s ease-out',
            }}
          >
            <AlertCircle size={22} style={{ color: '#ef4444', marginTop: '2px', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, color: '#f87171', fontSize: '0.95rem' }}>
                Atenção: Pendências ou pré-requisitos não atendidos nesta etapa:
              </div>
              <ul style={{ margin: '0.35rem 0 0 0', paddingLeft: '1.25rem', color: '#fca5a5', fontSize: '0.85rem' }}>
                {currentStepStatus.errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {currentStepStatus.warnings.length > 0 && !currentStepStatus.hasError && (
          <div
            style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid var(--t20-gold)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 1.25rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <AlertCircle size={20} style={{ color: 'var(--t20-gold)', flexShrink: 0 }} />
            <div style={{ color: '#fef3c7', fontSize: '0.85rem' }}>
              {currentStepStatus.warnings.join(' ')}
            </div>
          </div>
        )}

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
            onSelectClass={setClassId}
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
            classSkills={[
              ...currentClass.mandatorySkills,
              ...selectedClassSkills,
            ]}
            intSkills={selectedIntSkills}
            alreadyTrainedSkills={[
              ...selectedRacialSkills,
              ...currentClass.mandatorySkills,
              ...selectedClassSkills,
              ...selectedIntSkills,
            ]}
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

      {/* Barra Inferior Fixa de Navegação */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(12, 14, 23, 0.95)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid var(--border-color)',
          padding: '1rem 2rem',
          zIndex: 800,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.5)',
        }}
      >
        <button
          type="button"
          disabled={currentStep === 1}
          onClick={handlePrevStep}
          className="btn btn-secondary"
          style={{ gap: '0.4rem' }}
        >
          <ChevronLeft size={18} />
          Voltar
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {currentStep === 9 && hasAnyErrors && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f87171', fontSize: '0.85rem' }}>
              <AlertCircle size={16} />
              <span>Corrija as etapas com pendências antes de salvar o personagem</span>
            </div>
          )}

          {currentStep === 9 ? (
            <button
              type="button"
              disabled={hasAnyErrors}
              onClick={handleSaveCharacter}
              className="btn btn-gold"
              style={{
                padding: '0.75rem 1.75rem',
                fontSize: '1rem',
                gap: '0.5rem',
                opacity: hasAnyErrors ? 0.5 : 1,
                cursor: hasAnyErrors ? 'not-allowed' : 'pointer',
              }}
            >
              <Save size={18} />
              Salvar Personagem
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextStep}
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.5rem', gap: '0.5rem' }}
            >
              Próximo Passo
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Modal de Detalhes Globais */}
      <DetailModal data={modalDetail} onClose={() => setModalDetail(null)} />
    </div>
  );
};
