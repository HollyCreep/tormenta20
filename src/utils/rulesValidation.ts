import { CharacterAttributes } from '../types/character';
import { RACES_LIST } from '../data/races';
import { CLASSES_LIST } from '../data/classes';
import { ORIGINS_LIST } from '../data/origins';
import { DEITIES_LIST } from '../data/deities';
import { GENERAL_POWERS_LIST } from '../data/generalPowers';
import { CLASS_POWERS_LIST } from '../data/classPowers';
import { SPELLS_LIST } from '../data/spells';

export interface PrerequisiteContext {
  attributes: CharacterAttributes;
  trainedSkillIds: Set<string> | string[];
  proficiencies?: {
    weapons?: string[];
    armor?: string[];
    shields?: boolean;
  };
  isSpellcaster?: boolean;
  /** Maior círculo de magia que o personagem pode lançar (0 = não conjura). */
  maxSpellCircle?: number;
  /** Nível de personagem (padrão 1). */
  level?: number;
  /** Níveis por classe (padrão: classId no nível do personagem). */
  classLevels?: Record<string, number>;
  classId?: string;
  classSubclass?: string;
  /** Nomes de poderes e habilidades que o personagem já possui. */
  powerNames?: string[];
  /** Divindade ('nenhum' se não for devoto). */
  deityId?: string;
}

export interface PrerequisiteResult {
  isMet: boolean;
  unmetRequirements: string[];
}

const ATTR_KEYS: Record<string, keyof CharacterAttributes> = { for: 'for', des: 'des', con: 'con', int: 'int', sab: 'sab', car: 'car' };
const NUMBER_WORDS: Record<string, number> = { um: 1, uma: 1, outro: 1, dois: 2, duas: 2, tres: 3, quatro: 4, cinco: 5 };

const normalizeText = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const SKILL_IDS: Record<string, string> = {
  acrobacia: 'acrobacia', adestramento: 'adestramento', atletismo: 'atletismo', atuacao: 'atuacao', cavalgar: 'cavalgar',
  conhecimento: 'conhecimento', cura: 'cura', diplomacia: 'diplomacia', enganacao: 'enganacao', fortitude: 'fortitude',
  furtividade: 'furtividade', guerra: 'guerra', iniciativa: 'iniciativa', intimidacao: 'intimidacao', intuicao: 'intuicao',
  investigacao: 'investigacao', jogatina: 'jogatina', ladinagem: 'ladinagem', luta: 'luta', misticismo: 'misticismo',
  nobreza: 'nobreza', oficio: 'oficio', percepcao: 'percepcao', pilotagem: 'pilotagem', pontaria: 'pontaria',
  reflexos: 'reflexos', religiao: 'religiao', sobrevivencia: 'sobrevivencia', vontade: 'vontade',
};

/** Perícia citada num pré-requisito ("Ofício (alquimista)" → oficio). */
const skillIdFromName = (name: string): string | undefined => SKILL_IDS[normalizeText(name.replace(/\(.*\)/, ''))];

const CLASS_NAME_TO_ID: Record<string, string> = {
  arcanista: 'arcanista', barbaro: 'barbaro', bardo: 'bardo', bucaneiro: 'bucaneiro', cacador: 'cacador',
  cavaleiro: 'cavaleiro', clerigo: 'clerigo', druida: 'druida', guerreiro: 'guerreiro', inventor: 'inventor',
  ladino: 'ladino', lutador: 'lutador', nobre: 'nobre', paladino: 'paladino',
};

/**
 * Avalia um único requisito (texto do livro) contra o contexto.
 * Retorna null se cumprido, ou o texto do requisito não cumprido (com o valor atual quando útil).
 */
function checkRequirement(req: string, ctx: PrerequisiteContext): string | null {
  const r = req.trim().replace(/\.$/, '');
  if (!r) return null;
  const n = normalizeText(r);
  // Alternativas: "Estilo de Disparo ou Estilo de Arremesso", "Bruxo ou Mago", "treinado em Luta ou Pontaria"
  if (/\sou\s/.test(n)) {
    const tm = /^treinad[oa] em (.+)$/i.exec(r);
    const parts = tm ? tm[1].split(/\s+ou\s+/).map((x) => `treinado em ${x}`) : r.split(/\s+ou\s+/);
    return parts.some((p) => checkRequirement(p, ctx) === null) ? null : r;
  }
  const attrs = ctx.attributes || { for: 0, des: 0, con: 0, int: 0, sab: 0, car: 0 };
  const skills = new Set(Array.isArray(ctx.trainedSkillIds) ? ctx.trainedSkillIds : Array.from(ctx.trainedSkillIds || []));
  const level = ctx.level || 1;
  const powers = new Set((ctx.powerNames || []).map(normalizeText));

  // Atributo: "Des 2", "For 1", "Int –1"
  let m = /^(for|des|con|int|sab|car)\s+([-–]?\d+)$/.exec(n);
  if (m) {
    const v = parseInt(m[2].replace('–', '-'), 10);
    const cur = attrs[ATTR_KEYS[m[1]]];
    return cur >= v ? null : `${r} (atual: ${cur})`;
  }
  // "treinado na perícia escolhida" depende da escolha feita no próprio poder
  if (/^treinad[oa] na pericia escolhida/.test(n)) return null;
  // Treinamento: "treinado em Luta", "treinado em Ofício (alquimista)"
  m = /^treinad[oa] em (.+)$/.exec(n);
  if (m) {
    const id = skillIdFromName(m[1]);
    if (!id) return null;
    return skills.has(id) ? null : r;
  }
  // Nível: "6º nível de personagem", "5º nível de bardo"
  m = /^(\d+)\s*[º°o]?\s*nivel de (personagem|[a-z]+)/.exec(n);
  if (m) {
    const need = parseInt(m[1], 10);
    if (m[2] === 'personagem') return level >= need ? null : `${r} (atual: ${level}º)`;
    const cid = CLASS_NAME_TO_ID[m[2]];
    const cl = ctx.classLevels?.[cid] ?? (ctx.classId === cid ? level : 0);
    return cl >= need ? null : r;
  }
  // Magias
  if (/^(habilidade de classe magias|lancar magias)$/.test(n)) return ctx.isSpellcaster ? null : r;
  m = /^lancar magias de (\d)\s*[º°o]? circulo$/.exec(n);
  if (m) return (ctx.maxSpellCircle ?? (ctx.isSpellcaster ? 1 : 0)) >= parseInt(m[1], 10) ? null : r;
  // Proficiências
  if (n === 'proficiencia com armaduras pesadas') return ctx.proficiencies?.armor?.includes('pesadas') ? null : r;
  if (n === 'proficiencia com escudos') return ctx.proficiencies?.shields ? null : r;
  if (n === 'proficiencia com a arma') return null; // depende da arma escolhida no poder
  // Devoção
  if (n === 'devoto de um deus maior') return ctx.deityId && ctx.deityId !== 'nenhum' ? null : r;
  // Contagem de poderes da Tormenta: "quatro outros poderes da Tormenta", "um poder da Tormenta"
  m = /^(um|uma|outro|dois|duas|tres|quatro|cinco|\d+)\s+(?:outros?\s+)?poder(?:es)? da tormenta$/.exec(n);
  if (m) {
    const need = NUMBER_WORDS[m[1]] ?? parseInt(m[1], 10);
    const have = GENERAL_POWERS_LIST.filter((p) => p.category === 'tormenta' && powers.has(normalizeText(p.name))).length;
    return have >= need ? null : `${r} (possui ${have})`;
  }
  // Grupos de poderes: "um poder de armadilha", "qualquer poder de Missa"
  m = /^(?:um|qualquer) poder de (.+)$/.exec(n);
  if (m) {
    const group = m[1];
    return [...powers].some((p) => p.includes(group)) ? null : r;
  }
  // Subclasse (Caminho do Arcanista etc.)
  if (ctx.classSubclass && normalizeText(ctx.classSubclass) === n) return null;
  // Demais: nome de poder ou habilidade ("Estilo de Arremesso", "Música: Balada Fascinante")
  const plain = n.replace(/^[a-z ]+:\s*/, '');
  return powers.has(n) || powers.has(plain) ? null : r;
}

/** Avalia uma linha de pré-requisitos do livro ("Des 2, treinado em Luta"). */
export function checkPrerequisiteText(text: string | undefined, ctx: PrerequisiteContext): PrerequisiteResult {
  if (!text) return { isMet: true, unmetRequirements: [] };
  // ignora observações após um ponto ("... Magias lançadas como rituais não podem ...")
  const main = text.split(/\.\s+(?=[A-ZÀ-Ú])/)[0];
  const unmet = main
    .split(/,\s*/)
    .map((req) => checkRequirement(req, ctx))
    .filter((x): x is string => !!x);
  return { isMet: unmet.length === 0, unmetRequirements: unmet };
}

/**
 * Valida os pré-requisitos de um poder geral segundo o texto do livro (T20 JdA v1.3, Cap. 2).
 * Além do texto, aplica os requisitos implícitos de cada grupo:
 * - Poderes de magia: "Todos os poderes deste grupo possuem como pré-requisito lançar magias" (pág. 131).
 * - Poderes concedidos: ser devoto de um dos deuses indicados (pág. 132).
 * "Você pode escolher um poder no nível em que atinge seus pré-requisitos" (Cap. 1, pág. 33).
 */
export function checkPowerPrerequisites(powerIdOrName: string, context: PrerequisiteContext): PrerequisiteResult {
  const power = GENERAL_POWERS_LIST.find((p) => p.id === powerIdOrName || p.name === powerIdOrName);
  if (!power) {
    // Poderes de classe (Cap. 1): o pré-requisito vem do texto do livro
    const cp = CLASS_POWERS_LIST.find((p) => p.id === powerIdOrName || p.name === powerIdOrName);
    return checkPrerequisiteText(cp?.prerequisites, context);
  }
  const unmet = [...checkPrerequisiteText(power.prerequisites, context).unmetRequirements];
  if (power.category === 'magia' && !context.isSpellcaster && !unmet.includes('lançar magias')) unmet.unshift('lançar magias');
  if (power.category === 'concedido' && power.deities?.length && context.deityId !== undefined) {
    const deity = DEITIES_LIST.find((d) => d.id === context.deityId);
    if (!deity || !power.deities.some((d) => normalizeText(d) === normalizeText(deity.name))) {
      unmet.unshift(`devoto de ${power.deities.join(' ou ')}`);
    }
  }
  return { isMet: unmet.length === 0, unmetRequirements: unmet };
}

/** Deuses disponíveis por classe (Cap. 1: druida pág. 61, paladino pág. 82). */
const CLASS_DEITIES: Record<string, string[]> = {
  druida: ['allihanna', 'megalokk', 'oceano'],
  paladino: ['azgher', 'khalmyr', 'lena', 'lin_wu', 'marah', 'tanna_toh', 'thyatis', 'valkaria'],
};

/**
 * Pode ser devoto? "Para ser devoto de um deus, sua raça ou sua classe devem estar listadas na seção
 * Devotos do deus em questão. Humanos e clérigos são exceção" (Cap. 1, pág. 96). Druidas e paladinos
 * só podem seguir os deuses disponíveis para a classe.
 */
export function canBeDevotee(deityId: string, raceId: string, classId: string): { ok: boolean; reason?: string } {
  const deity = DEITIES_LIST.find((d) => d.id === deityId);
  if (!deity) return { ok: true };
  const restricted = CLASS_DEITIES[classId];
  if (restricted && !restricted.includes(deityId)) {
    return { ok: false, reason: `${classId === 'druida' ? 'Druidas' : 'Paladinos'} só podem ser devotos de ${restricted.map((id) => DEITIES_LIST.find((d) => d.id === id)?.name).join(', ')}.` };
  }
  if (raceId === 'humano' || classId === 'clerigo') return { ok: true };
  const races = deity.allowedRaces || [];
  const classes = deity.allowedClasses || [];
  // Listas vazias: "Quaisquer", "membros de todas as classes", "qualquer duyshidakk"
  if (!races.length && !classes.length) return { ok: true };
  if (races.includes(raceId) || classes.includes(classId)) return { ok: true };
  return { ok: false, reason: `Sua raça ou classe não está entre os devotos de ${deity.name} (${deity.allowedDevoteesText}).` };
}

/** Quantos poderes concedidos o devoto recebe: 1; clérigos e druidas recebem 2 (Cap. 1, págs. 57 e 61). */
export const grantedPowerCount = (classId: string) => (classId === 'clerigo' || classId === 'druida' ? 2 : 1);

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
  classSubclass?: string;
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
  spellSchools?: string[];
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
  const allowedSpellsCount = (currentClass.spellcaster?.circle1Count || 0) + (input.classId === 'arcanista' && input.classSubclass === 'mago' ? 1 : 0);

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
    const alt = currentClass.skillAlternative;
    const requiredSkills = currentClass.skillChoicesCount + (alt ? 1 : 0);

    if (input.selectedClassSkills.length !== requiredSkills) {
      errors.push(`Escolha ${requiredSkills} perícias da classe (atualmente ${input.selectedClassSkills.length}).`);
    }
    if (alt && !alt.some((s) => input.selectedClassSkills.includes(s))) {
      errors.push(`Escolha ${alt.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ou ')} (obrigatória da classe).`);
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
      const need = grantedPowerCount(input.classId);
      if (input.selectedDeityPowers.length !== need) {
        errors.push(`Escolha ${need} poder${need > 1 ? 'es' : ''} concedido${need > 1 ? 's' : ''} pela sua divindade (Cap. 1, pág. 96).`);
      }
      const elig = canBeDevotee(input.deityId, input.raceId, input.classId);
      if (!elig.ok) errors.push(elig.reason!);
    } else if (['clerigo', 'druida', 'paladino'].includes(input.classId)) {
      // Clérigos, druidas e paladinos são devotos automaticamente (pág. 96)
      errors.push('Sua classe é devota: escolha uma divindade (Cap. 1, pág. 96).');
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
      const schoolsNeeded = currentClass.spellcaster?.schoolsCount || 0;
      if (schoolsNeeded) {
        const schools = input.spellSchools || [];
        if (schools.length !== schoolsNeeded) errors.push(`Escolha ${schoolsNeeded} escolas de magia (atualmente ${schools.length}).`);
        const outside = input.selectedSpells
          .map((id) => SPELLS_LIST.find((sp) => sp.id === id))
          .filter((sp) => sp && !schools.includes(sp.school));
        if (outside.length) errors.push(`Magias fora das escolas escolhidas: ${outside.map((sp) => sp!.name).join(', ')}.`);
      }
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
