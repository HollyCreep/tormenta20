import { CharacterAttributes } from '../types/character';
import { RACES_LIST } from '../data/races';
import { CLASSES_LIST } from '../data/classes';
import { ORIGINS_LIST } from '../data/origins';
import { DEITIES_LIST } from '../data/deities';
import { GENERAL_POWERS_LIST } from '../data/generalPowers';

export interface PrerequisiteContext {
  attributes: CharacterAttributes;
  trainedSkillIds: Set<string> | string[];
  proficiencies?: {
    weapons?: string[];
    armor?: string[];
    shields?: boolean;
  };
  isSpellcaster?: boolean;
}

export interface PrerequisiteResult {
  isMet: boolean;
  unmetRequirements: string[];
}

/**
 * Valida estritamente os pré-requisitos de um poder geral segundo o livro T20 Jogo do Ano v1.3.
 */
export function checkPowerPrerequisites(
  powerIdOrName: string,
  context: PrerequisiteContext
): PrerequisiteResult {
  const unmet: string[] = [];
  const skillsSet = new Set(
    Array.isArray(context.trainedSkillIds)
      ? context.trainedSkillIds
      : Array.from(context.trainedSkillIds || [])
  );
  const attrs = context.attributes || { for: 0, des: 0, con: 0, int: 0, sab: 0, car: 0 };
  const hasShield = Boolean(context.proficiencies?.shields);
  const hasHeavyArmor = Boolean(context.proficiencies?.armor?.includes('pesadas'));
  const hasSpells = Boolean(context.isSpellcaster);

  // Normaliza o identificador
  const normalized = powerIdOrName.toLowerCase().replace(/\s+/g, '_');

  switch (normalized) {
    case 'estilo_uma_arma':
    case 'estilo_de_uma_arma':
      if (!skillsSet.has('luta')) unmet.push('Treinado em Luta');
      break;

    case 'estilo_duas_armas':
    case 'estilo_de_duas_armas':
      if (attrs.des < 2) unmet.push(`Des 2 (atual: ${attrs.des})`);
      if (!skillsSet.has('luta')) unmet.push('Treinado em Luta');
      break;

    case 'estilo_disparo':
    case 'estilo_de_disparo':
      if (!skillsSet.has('pontaria')) unmet.push('Treinado em Pontaria');
      break;

    case 'estilo_arma_escudo':
    case 'estilo_de_arma_e_escudo':
      if (!skillsSet.has('luta')) unmet.push('Treinado em Luta');
      if (!hasShield) unmet.push('Proficiência com Escudos');
      break;

    case 'ataque_poderoso':
      if (attrs.for < 1) unmet.push(`For 1 (atual: ${attrs.for})`);
      break;

    case 'ataque_preciso':
      if (attrs.des < 1) unmet.push(`Des 1 (atual: ${attrs.des})`);
      if (!skillsSet.has('luta') && !skillsSet.has('pontaria')) {
        unmet.push('Treinado em Luta ou Pontaria');
      }
      break;

    case 'esquiva':
      if (attrs.des < 1) unmet.push(`Des 1 (atual: ${attrs.des})`);
      break;

    case 'combate_defensivo':
      if (attrs.int < 1) unmet.push(`Int 1 (atual: ${attrs.int})`);
      break;

    case 'vitalidade':
      if (attrs.con < 1) unmet.push(`Con 1 (atual: ${attrs.con})`);
      break;

    case 'saque_rapido':
      if (!skillsSet.has('iniciativa')) unmet.push('Treinado em Iniciativa');
      break;

    case 'disparo_certeiro':
      if (!skillsSet.has('pontaria')) unmet.push('Treinado em Pontaria');
      break;

    case 'encouracado':
    case 'encouraçado':
      if (!hasHeavyArmor) unmet.push('Proficiência com Armaduras Pesadas');
      break;

    case 'acrobatico':
    case 'acrobático':
      if (attrs.des < 2) unmet.push(`Des 2 (atual: ${attrs.des})`);
      if (!skillsSet.has('acrobacia')) unmet.push('Treinado em Acrobacia');
      break;

    case 'aparencia_inofensiva':
    case 'aparência_inofensiva':
    case 'atraente':
    case 'comandar':
    case 'torcida':
      if (attrs.car < 1) unmet.push(`Car 1 (atual: ${attrs.car})`);
      break;

    case 'medico_de_campo':
    case 'médico_de_campo':
    case 'medicina':
      if (attrs.sab < 1) unmet.push(`Sab 1 (atual: ${attrs.sab})`);
      if (!skillsSet.has('cura')) unmet.push('Treinado em Cura');
      break;

    case 'negociacao':
    case 'negociação':
      if (!skillsSet.has('diplomacia')) unmet.push('Treinado em Diplomacia');
      break;

    case 'vontade_de_ferro':
      if (attrs.sab < 1) unmet.push(`Sab 1 (atual: ${attrs.sab})`);
      break;

    case 'atletico':
    case 'atlético':
      if (attrs.for < 1) unmet.push(`For 1 (atual: ${attrs.for})`);
      if (!skillsSet.has('atletismo')) unmet.push('Treinado em Atletismo');
      break;

    case 'veneficio':
    case 'venefício':
      if (!skillsSet.has('oficio')) unmet.push('Treinado em Ofício');
      break;

    case 'foco_em_magia':
    case 'magia_ampliada':
    case 'magia_discreta':
    case 'magia_ilimitada':
      if (!hasSpells) unmet.push('Habilidade de classe Magias');
      break;

    default:
      break;
  }

  return {
    isMet: unmet.length === 0,
    unmetRequirements: unmet,
  };
}

/**
 * Poderes que o livro permite escolher mais de uma vez (sempre com alvos diferentes).
 * Regra geral: "A menos que especificado o contrário, você não pode escolher um mesmo
 * poder mais de uma vez" — T20 JdA, Cap. 1, pág. 33.
 */
export const REPEATABLE_POWER_NAMES = new Set([
  'Foco em Arma',
  'Foco em Magia',
  'Foco em Perícia',
  'Proficiência',
  'Treinamento em Perícia',
]);

/** Nome canônico de um poder geral a partir do id ou do nome. */
export const resolvePowerName = (idOrName: string): string =>
  GENERAL_POWERS_LIST.find((p) => p.id === idOrName || p.name === idOrName)?.name ?? idOrName;

export const isRepeatablePower = (idOrName: string): boolean => REPEATABLE_POWER_NAMES.has(resolvePowerName(idOrName));

/** Fontes de poderes escolhidos no criador (raça, origem, divindade). */
export interface PowerSource {
  source: string;
  powers: string[];
}

/**
 * Mapa nome do poder → fonte que já o escolheu, ignorando a fonte informada.
 * Usado para bloquear o mesmo poder em dois benefícios diferentes (Cap. 1, pág. 33).
 */
export function takenPowersExcept(sources: PowerSource[], except: string): Map<string, string> {
  const taken = new Map<string, string>();
  sources
    .filter((s) => s.source !== except)
    .forEach((s) =>
      s.powers.forEach((p) => {
        const name = resolvePowerName(p);
        if (!isRepeatablePower(name) && !taken.has(name)) taken.set(name, s.source);
      })
    );
  return taken;
}

/** Poderes não repetíveis escolhidos por mais de uma fonte. */
export function findDuplicatePowers(sources: PowerSource[]): { name: string; sources: string[] }[] {
  const seen = new Map<string, string[]>();
  sources.forEach((s) =>
    s.powers.forEach((p) => {
      const name = resolvePowerName(p);
      seen.set(name, [...(seen.get(name) || []), s.source]);
    })
  );
  return [...seen.entries()]
    .filter(([name, srcs]) => srcs.length > 1 && !isRepeatablePower(name))
    .map(([name, srcs]) => ({ name, sources: srcs }));
}

/** Poderes gerais selecionados que deixaram de cumprir os pré-requisitos (Cap. 1, pág. 85). */
export function powersWithUnmetPrerequisites(
  powers: string[],
  context: PrerequisiteContext
): { name: string; unmet: string[] }[] {
  return powers
    .filter((p) => GENERAL_POWERS_LIST.some((g) => g.id === p || g.name === p))
    .map((p) => ({ name: resolvePowerName(p), unmet: checkPowerPrerequisites(p, context).unmetRequirements }))
    .filter((r) => r.unmet.length > 0);
}

export interface StepStatus {
  step: number;
  isValid: boolean;
  isIncomplete: boolean;
  hasError: boolean;
  errors: string[];
  warnings: string[];
}

export interface WizardValidationInput {
  raceId: string;
  selectedRacialAttributes: string[];
  selectedRacialSkills: string[];
  selectedRacialPower?: string;
  racialChoices?: Record<string, string[]>;
  subraceId?: string;
  classId: string;
  selectedClassSkills: string[];
  originId: string;
  selectedOriginBenefits: { type: 'pericia' | 'poder'; name: string }[];
  deityId: string;
  selectedDeityPowers: string[];
  attributeMethod: 'point_buy' | 'standard' | 'roll' | 'free';
  baseAttributes: CharacterAttributes;
  totalAttributes: CharacterAttributes;
  selectedIntSkills: string[];
  selectedSpells: string[];
  currentSpaces: number;
  maxSpaces: number;
  characterName: string;
  /** Escolhas do equipamento inicial ainda não feitas (rótulos dos espaços). */
  pendingKitChoices?: string[];
}

/**
 * Validação reativa completa de todas as etapas do Wizard de Criação.
 */
export function validateAllWizardSteps(input: WizardValidationInput): Record<number, StepStatus> {
  const currentRace = RACES_LIST.find((r) => r.id === input.raceId) || RACES_LIST[0];
  const currentClass = CLASSES_LIST.find((c) => c.id === input.classId) || CLASSES_LIST[0];
  const isSpellcaster = Boolean(currentClass.spellcaster);
  const allowedSpellsCount = currentClass.spellcaster?.circle1Count || 0;

  // Contexto para pré-requisitos de poderes
  const allTrainedSkillsSet = new Set<string>([
    ...currentClass.mandatorySkills,
    ...input.selectedClassSkills,
    ...(input.raceId === 'humano' || input.raceId === 'osteon' ? input.selectedRacialSkills : []),
    ...input.selectedOriginBenefits.filter((b) => b.type === 'pericia').map((b) => b.name),
    ...input.selectedIntSkills,
  ]);

  const prereqContext: PrerequisiteContext = {
    attributes: input.totalAttributes,
    trainedSkillIds: allTrainedSkillsSet,
    proficiencies: currentClass.proficiencies,
    isSpellcaster,
  };

  const powerSources: PowerSource[] = [
    { source: 'raça', powers: input.selectedRacialPower ? [input.selectedRacialPower] : [] },
    { source: 'origem', powers: input.selectedOriginBenefits.filter((b) => b.type === 'poder').map((b) => b.name) },
    { source: 'divindade', powers: input.selectedDeityPowers },
  ];

  const results: Record<number, StepStatus> = {};

  // PASSO 1: RAÇA
  {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (currentRace.isSelectableAttributes) {
      const required = currentRace.selectableAttributesCount || 3;
      if (input.selectedRacialAttributes.length !== required) {
        errors.push(`Escolha ${required} atributos para receber o bônus racial (atualmente ${input.selectedRacialAttributes.length}).`);
      }
    }

    const powerName = (id: string) => GENERAL_POWERS_LIST.find((p) => p.id === id || p.name === id)?.name || id;
    const checkRacialPower = () => {
      if (!input.selectedRacialPower) return;
      const prereq = checkPowerPrerequisites(input.selectedRacialPower, prereqContext);
      if (!prereq.isMet) errors.push(`Pré-requisito não atendido para ${powerName(input.selectedRacialPower)}: ${prereq.unmetRequirements.join(', ')}.`);
    };
    const skills = input.selectedRacialSkills.length;

    if (currentRace.id === 'humano') {
      // Versátil: 2 perícias, ou 1 perícia + 1 poder geral (pág. 19)
      const need = input.selectedRacialPower ? 1 : 2;
      if (skills !== need) errors.push(`Versátil: escolha ${need} perícia${need > 1 ? 's' : ''} treinada${need > 1 ? 's' : ''} (atualmente ${skills}).`);
      checkRacialPower();
    } else if (currentRace.id === 'lefou') {
      // Deformidade: +2 em 2 perícias; pode trocar um bônus por um poder da Tormenta (pág. 24)
      const need = input.selectedRacialPower ? 1 : 2;
      if (skills !== need) errors.push(`Deformidade: escolha ${need} perícia${need > 1 ? 's' : ''} para receber +2 (atualmente ${skills}).`);
      if (input.selectedRacialPower) {
        const pw = GENERAL_POWERS_LIST.find((p) => p.id === input.selectedRacialPower || p.name === input.selectedRacialPower);
        if (pw && pw.category !== 'tormenta') errors.push('Deformidade só permite trocar um bônus por um poder da Tormenta.');
      }
      checkRacialPower();
    } else if (currentRace.id === 'osteon') {
      // Memória Póstuma: 1 perícia ou 1 poder geral (pág. 29)
      if (!input.selectedRacialPower && skills !== 1) errors.push('Memória Póstuma: escolha 1 perícia treinada ou 1 poder geral.');
      checkRacialPower();
    } else if (currentRace.noOrigin) {
      // Golem — Propósito de Criação: um poder geral a sua escolha (pág. 27)
      if (!input.selectedRacialPower) errors.push('Propósito de Criação: escolha um poder geral.');
      checkRacialPower();
    }

    // Escolhas de habilidades (elemento, magias, perícia do Kliren...)
    const subrace = currentRace.customSelections?.subraces?.find((sr) => sr.id === (input.subraceId || currentRace.customSelections?.subraces?.[0].id));
    [...currentRace.abilities, ...(subrace?.abilities || [])].forEach((ab) => {
      if (!ab.choice) return;
      const got = input.racialChoices?.[ab.choice.key]?.length || 0;
      if (got !== ab.choice.count) errors.push(`${ab.name}: escolha ${ab.choice.count} (${ab.choice.label.toLowerCase()}).`);
    });

    results[1] = {
      step: 1,
      isValid: errors.length === 0,
      isIncomplete: errors.length > 0,
      hasError: errors.length > 0,
      errors,
      warnings,
    };
  }

  // PASSO 2: CLASSE
  {
    const errors: string[] = [];
    const warnings: string[] = [];
    const requiredSkills = currentClass.skillChoicesCount;

    if (input.selectedClassSkills.length !== requiredSkills) {
      errors.push(`Escolha ${requiredSkills} perícias opcionais da lista de classe (atualmente ${input.selectedClassSkills.length}).`);
    }

    // Checa duplicação com raça
    if (input.raceId === 'humano') {
      const overlap = input.selectedClassSkills.filter((s) => input.selectedRacialSkills.includes(s));
      if (overlap.length > 0) {
        errors.push(`A(s) perícia(s) "${overlap.join(', ')}" já foi(ram) selecionada(s) na Raça.`);
      }
    }

    results[2] = {
      step: 2,
      isValid: errors.length === 0,
      isIncomplete: errors.length > 0,
      hasError: errors.length > 0,
      errors,
      warnings,
    };
  }

  // PASSO 3: ORIGEM
  {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Golem não escolhe origem (Propósito de Criação, pág. 27)
    if (!currentRace.noOrigin && input.selectedOriginBenefits.length !== 2) {
      errors.push(`Escolha 2 benefícios de origem (atualmente ${input.selectedOriginBenefits.length}).`);
    }

    // Checa duplicação de perícias já treinadas por raça ou classe
    const priorSkills = new Set<string>([
      ...currentClass.mandatorySkills,
      ...input.selectedClassSkills,
      ...(input.raceId === 'humano' ? input.selectedRacialSkills : []),
    ]);

    input.selectedOriginBenefits
      .filter((b) => b.type === 'pericia')
      .forEach((b) => {
        if (priorSkills.has(b.name)) {
          errors.push(`A perícia "${b.name}" já foi treinada por sua Classe ou Raça. Escolha outro benefício.`);
        }
      });

    const originPowers = input.selectedOriginBenefits.filter((b) => b.type === 'poder').map((b) => b.name);
    powersWithUnmetPrerequisites(originPowers, prereqContext).forEach((r) => {
      errors.push(`Pré-requisito não atendido para ${r.name}: ${r.unmet.join(', ')}.`);
    });
    findDuplicatePowers(powerSources.filter((s) => s.source !== 'divindade')).forEach((d) => {
      errors.push(`O poder "${d.name}" já foi escolhido como benefício de raça (um poder não pode ser escolhido duas vezes).`);
    });

    results[3] = {
      step: 3,
      isValid: errors.length === 0,
      isIncomplete: errors.length > 0,
      hasError: errors.length > 0,
      errors,
      warnings,
    };
  }

  // PASSO 4: DIVINDADE
  {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (input.deityId !== 'nenhum') {
      if (input.selectedDeityPowers.length === 0) {
        errors.push('Escolha pelo menos 1 poder concedido pela sua divindade.');
      }
    }

    findDuplicatePowers(powerSources)
      .filter((d) => d.sources.includes('divindade'))
      .forEach((d) => {
        errors.push(`O poder "${d.name}" já foi escolhido em outro benefício (um poder não pode ser escolhido duas vezes).`);
      });

    results[4] = {
      step: 4,
      isValid: errors.length === 0,
      isIncomplete: errors.length > 0,
      hasError: errors.length > 0,
      errors,
      warnings,
    };
  }

  // PASSO 5: ATRIBUTOS
  {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (input.attributeMethod === 'point_buy') {
      let spent = 0;
      Object.values(input.baseAttributes).forEach((v) => {
        spent += (v === -1 ? -1 : v === 1 ? 1 : v === 2 ? 2 : v === 3 ? 4 : v === 4 ? 7 : 0);
      });

      if (spent > 10) {
        errors.push(`Você gastou ${spent} pontos de compra (máximo permitido é 10).`);
      } else if (spent < 10) {
        warnings.push(`Você ainda tem ${10 - spent} pontos de compra disponíveis para distribuir.`);
      }
    }

    results[5] = {
      step: 5,
      isValid: errors.length === 0,
      isIncomplete: warnings.length > 0,
      hasError: errors.length > 0,
      errors,
      warnings,
    };
  }

  // PASSO 6: PERÍCIAS POR INTELIGÊNCIA
  {
    const errors: string[] = [];
    const warnings: string[] = [];
    const intBonus = Math.max(0, input.totalAttributes.int);

    if (intBonus > 0 && input.selectedIntSkills.length !== intBonus) {
      errors.push(`Sua Inteligência (+${intBonus}) concede ${intBonus} perícia(s) treinada(s) extra(s) (atualmente ${input.selectedIntSkills.length}).`);
    }

    results[6] = {
      step: 6,
      isValid: errors.length === 0,
      isIncomplete: errors.length > 0,
      hasError: errors.length > 0,
      errors,
      warnings,
    };
  }

  // PASSO 7: MAGIAS (se conjurador)
  {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (isSpellcaster) {
      if (input.selectedSpells.length !== allowedSpellsCount) {
        errors.push(`Escolha ${allowedSpellsCount} magias de 1º círculo (atualmente ${input.selectedSpells.length}).`);
      }
    }

    results[7] = {
      step: 7,
      isValid: errors.length === 0,
      isIncomplete: errors.length > 0,
      hasError: errors.length > 0,
      errors,
      warnings,
    };
  }

  // PASSO 8: EQUIPAMENTO
  {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (input.currentSpaces > input.maxSpaces) {
      errors.push(`Carga excedida: você está carregando ${input.currentSpaces} espaços de ${input.maxSpaces} permitidos.`);
    }
    if (input.pendingKitChoices?.length) {
      warnings.push(`Equipamento inicial sem escolha: ${input.pendingKitChoices.join(', ')}.`);
    }

    results[8] = {
      step: 8,
      isValid: errors.length === 0,
      isIncomplete: errors.length > 0,
      hasError: errors.length > 0,
      errors,
      warnings,
    };
  }

  // PASSO 9: TOQUES FINAIS
  {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!input.characterName.trim()) {
      errors.push('Dê um nome para o seu personagem.');
    }

    results[9] = {
      step: 9,
      isValid: errors.length === 0,
      isIncomplete: errors.length > 0,
      hasError: errors.length > 0,
      errors,
      warnings,
    };
  }

  return results;
}
