/**
 * Efeitos mecânicos das condições — T20 JdA v1.3, Apêndice: Lista de Condições, págs. 394–395.
 *
 * Regras centrais do apêndice:
 * - Algumas condições incluem outras (exausto = debilitado + lento + vulnerável, por exemplo).
 * - "Condições com os mesmos efeitos não se acumulam; aplique apenas os mais severos."
 *   Ex.: desprevenido (–5) e vulnerável (–2) resultam em –5 na Defesa, não –7.
 */

/** Condições que fazem o personagem ficar em outras condições (pág. 394–395). */
const IMPLIES: Record<string, string[]> = {
  agarrado: ['desprevenido', 'imovel'],
  atordoado: ['desprevenido'],
  cego: ['desprevenido', 'lento'],
  enredado: ['lento', 'vulneravel'],
  exausto: ['debilitado', 'lento', 'vulneravel'],
  fatigado: ['fraco', 'vulneravel'],
  inconsciente: ['indefeso'],
  indefeso: ['desprevenido'],
  paralisado: ['imovel', 'indefeso'],
  petrificado: ['inconsciente'],
  surpreendido: ['desprevenido'],
};

/** Expande as condições ativas incluindo as condições implicadas (transitivamente). */
export function expandConditions(active: string[] = []): Set<string> {
  const result = new Set<string>();
  const stack = [...active];
  while (stack.length) {
    const c = stack.pop()!;
    if (result.has(c)) continue;
    result.add(c);
    (IMPLIES[c] || []).forEach((x) => stack.push(x));
  }
  return result;
}

export interface ConditionPenalty {
  value: number;
  label: string;
}

/** Escolhe a penalidade mais severa entre candidatas presentes (mesmo efeito não acumula). */
function worst(set: Set<string>, candidates: [string, number, string][]): ConditionPenalty | null {
  let best: ConditionPenalty | null = null;
  for (const [cond, value, label] of candidates) {
    if (set.has(cond) && (!best || value < best.value)) best = { value, label };
  }
  return best;
}

export interface ConditionEffects {
  set: Set<string>;
  /** Penalidade na Defesa (indefeso –10 > desprevenido –5 > vulnerável –2). */
  defense: ConditionPenalty | null;
  /** Caído: –5 na Defesa contra corpo a corpo e +5 contra distância (cumulativo com outras). */
  prone: boolean;
  /** Medo: apavorado –5 / abalado –2 em testes de perícia (inclui ataques). */
  allSkills: ConditionPenalty | null;
  /** Força, Destreza e Constituição: debilitado –5 / fraco –2. */
  physical: ConditionPenalty | null;
  /** Inteligência, Sabedoria e Carisma: esmorecido –5 / frustrado –2. */
  mental: ConditionPenalty | null;
  /** Perícias de Força e Destreza: cego –5 (mesmo efeito que debilitado; não acumula). */
  blindPhysical: boolean;
  /** Percepção: fascinado –5 / ofuscado –2. */
  perception: ConditionPenalty | null;
  /** Iniciativa: surdo –5. */
  initiative: ConditionPenalty | null;
  /** Reflexos: desprevenido –5; indefeso falha automaticamente. */
  reflex: ConditionPenalty | null;
  reflexAutoFail: boolean;
  /** Testes de ataque: enredado, agarrado e ofuscado –2 (mesmo efeito); caído –5 corpo a corpo. */
  attack: ConditionPenalty | null;
  meleeAttack: ConditionPenalty | null;
  /** Deslocamento. */
  speedZero: boolean;
  speedHalf: boolean;
  speedProne: boolean;
  /** Sobrecarregado: penalidade de armadura –5 e deslocamento –3m. */
  overloaded: boolean;
  /** Alquebrado: custo em PM das habilidades +1. */
  mpCostIncrease: number;
}

export function getConditionEffects(active: string[] = []): ConditionEffects {
  const set = expandConditions(active);
  const attack = worst(set, [
    ['enredado', -2, 'Enredado'],
    ['agarrado', -2, 'Agarrado'],
    ['ofuscado', -2, 'Ofuscado'],
  ]);
  return {
    set,
    defense: worst(set, [
      ['indefeso', -10, 'Indefeso'],
      ['desprevenido', -5, 'Desprevenido'],
      ['vulneravel', -2, 'Vulnerável'],
    ]),
    prone: set.has('caido'),
    allSkills: worst(set, [
      ['apavorado', -5, 'Apavorado'],
      ['abalado', -2, 'Abalado'],
    ]),
    physical: worst(set, [
      ['debilitado', -5, 'Debilitado'],
      ['fraco', -2, 'Fraco'],
    ]),
    mental: worst(set, [
      ['esmorecido', -5, 'Esmorecido'],
      ['frustrado', -2, 'Frustrado'],
    ]),
    blindPhysical: set.has('cego'),
    perception: worst(set, [
      ['fascinado', -5, 'Fascinado'],
      ['ofuscado', -2, 'Ofuscado'],
    ]),
    initiative: worst(set, [['surdo', -5, 'Surdo']]),
    reflex: worst(set, [['desprevenido', -5, 'Desprevenido']]),
    reflexAutoFail: set.has('indefeso'),
    attack,
    meleeAttack: set.has('caido') ? { value: -5, label: 'Caído (corpo a corpo)' } : null,
    speedZero: set.has('imovel'),
    speedHalf: set.has('lento'),
    speedProne: set.has('caido'),
    overloaded: set.has('sobrecarregado'),
    mpCostIncrease: set.has('alquebrado') ? 1 : 0,
  };
}
