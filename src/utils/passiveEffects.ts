/**
 * Registro de efeitos passivos (sempre ativos) de raças, classes e poderes — T20 JdA v1.3.
 *
 * Cada efeito cita a página do livro. Bônus situacionais ("no subterrâneo", "contra animais",
 * "quando tem a torcida a seu favor"...) NÃO entram nos totais da ficha; aparecem só no texto.
 * Bônus de perícia por poderes da Tormenta escalam com "cada dois outros poderes da Tormenta".
 */
import type { CharacterAttributes, CharacterInventoryItem } from '../types/character';
import type { AttributeKey } from '../types/rules';
import { GENERAL_POWERS_LIST } from '../data/generalPowers';
import { RACES_LIST } from '../data/races';
import { effectiveSize, hasRaceAbility, osteonFormer } from './raceAbilities';

export interface RulesInput {
  level: number;
  classId: string;
  classSubclass?: string;
  /** Níveis por classe (multiclasse). Padrão: classId no nível do personagem. */
  classLevels?: Record<string, number>;
  raceId: string;
  subraceId?: string;
  /** Atributos totais (base + raça + aumentos), antes da perda de Carisma da Tormenta. */
  attributes: CharacterAttributes;
  inventory: CharacterInventoryItem[];
  powerNames?: string[];
  activeConditions?: string[];
  /** Lefou (Deformidade): perícias com +2. */
  selectedRacialSkills?: string[];
  racialChoices?: Record<string, string[]>;
}

export interface Contribution {
  source: string;
  citation: string;
  defense?: number;
  /** Bônus em perícias (inclui Fortitude, Reflexos e Vontade). */
  skills?: Partial<Record<string, number>>;
  hp?: number;
  mp?: number;
  speed?: number;
  spaces?: number;
  armorPenalty?: number;
  /** Soma um atributo no total de PM / PV (uma vez por atributo — "mesmo atributo não acumula"). */
  mpAttribute?: AttributeKey;
  hpAttribute?: AttributeKey;
  /** Soma um atributo na Defesa, limitado pelo nível. */
  defenseAttribute?: AttributeKey;
  /** Usa outro atributo como atributo-chave da perícia (ex.: Destreza em Atletismo). */
  skillAttribute?: Partial<Record<string, AttributeKey>>;
}

const has = (input: RulesInput, name: string) => (input.powerNames || []).includes(name);
export const classLevelOf = (input: RulesInput, classId: string) =>
  input.classLevels?.[classId] ?? (input.classId === classId ? input.level : 0);

export const equippedArmor = (inv: CharacterInventoryItem[]) =>
  inv.find((i) => i.isEquipped && (i.category === 'armadura_leve' || i.category === 'armadura_pesada'));
export const equippedShield = (inv: CharacterInventoryItem[]) => inv.find((i) => i.isEquipped && i.category === 'escudo');
export const wearsHeavyArmor = (inv: CharacterInventoryItem[]) => equippedArmor(inv)?.category === 'armadura_pesada';

/** Quantos poderes da Tormenta o personagem possui. */
export const tormentaPowerCount = (input: RulesInput) =>
  GENERAL_POWERS_LIST.filter((p) => p.category === 'tormenta' && has(input, p.name)).length;

/** "+1, mais +1 para cada dois outros poderes da Tormenta que você possui" (Cap. 2, pág. 136). */
const tormentaScaling = (input: RulesInput) => 1 + Math.floor(Math.max(0, tormentaPowerCount(input) - 1) / 2);

/**
 * Perda de Carisma por poderes da Tormenta: 1 pelo primeiro e +1 para cada dois outros (Cap. 2, pág. 136).
 * Exceções: o poder trocado pela Deformidade do lefou (pág. 24) e o primeiro poder de quem tem
 * Afinidade com a Tormenta (pág. 132) não contam.
 */
export function tormentaCharismaLoss(input: RulesInput, racialPowerName?: string): number {
  let n = tormentaPowerCount(input);
  if (input.raceId === 'lefou' && racialPowerName && GENERAL_POWERS_LIST.some((p) => p.name === racialPowerName && p.category === 'tormenta')) n -= 1;
  if (has(input, 'Afinidade com a Tormenta')) n -= 1;
  return n > 0 ? 1 + Math.floor((n - 1) / 2) : 0;
}

/** Modificador de Furtividade por tamanho (Tabela 1-21, pág. 107). */
const SIZE_STEALTH: Record<string, number> = { Minúsculo: 5, Pequeno: 2, Médio: 0, Grande: -2 };

type EffectFn = (input: RulesInput) => Contribution | null;

/**
 * Efeitos por habilidade racial das raças humanoides. Ficam ligados ao id da habilidade porque o osteon
 * pode herdar uma delas pela Memória Póstuma (Cap. 1, pág. 29).
 */
const ABILITY_EFFECTS: Record<string, EffectFn> = {
  anao_duro_como_pedra: (i) => ({ source: 'Duro como Pedra (Anão)', citation: 'Cap. 1, pág. 20', hp: 3 + Math.max(0, i.level - 1) }),
  elfo_sangue_magico: (i) => ({ source: 'Sangue Mágico (Elfo)', citation: 'Cap. 1, pág. 22', mp: i.level }),
  elfo_sentidos_elficos: () => ({ source: 'Sentidos Élficos (Elfo)', citation: 'Cap. 1, pág. 22', skills: { misticismo: 2, percepcao: 2 } }),
  goblin_rato_ruas: () => ({ source: 'Rato das Ruas (Goblin)', citation: 'Cap. 1, pág. 23', skills: { fortitude: 2 } }),
  minotauro_couro_rigido: () => ({ source: 'Couro Rígido (Minotauro)', citation: 'Cap. 1, pág. 25', defense: 1 }),
  hynne_pequeno_rechonchudo: () => ({
    source: 'Pequeno e Rechonchudo (Hynne)',
    citation: 'Cap. 1, pág. 28',
    skills: { enganacao: 2 },
    skillAttribute: { atletismo: 'des' },
  }),
  kliren_vanguardista: () => ({ source: 'Vanguardista (Kliren)', citation: 'Cap. 1, pág. 28', skills: { oficio: 2 } }),
};

/** Efeitos das raças não humanoides, que o osteon não pode herdar. */
const RACE_EFFECTS: Record<string, EffectFn[]> = {
  lefou: [
    (i) =>
      i.selectedRacialSkills?.length
        ? { source: 'Deformidade (Lefou)', citation: 'Cap. 1, pág. 24', skills: Object.fromEntries(i.selectedRacialSkills.map((s) => [s, 2])) }
        : null,
  ],
  golem: [() => ({ source: 'Chassi (Golem)', citation: 'Cap. 1, pág. 27', defense: 2, armorPenalty: -2 })],
  suraggel: [
    (i) =>
      (i.subraceId || 'aggelus') === 'aggelus'
        ? { source: 'Luz Sagrada (Aggelus)', citation: 'Cap. 1, pág. 31', skills: { diplomacia: 2, intuicao: 2 } }
        : { source: 'Sombras Profanas (Sulfure)', citation: 'Cap. 1, pág. 31', skills: { enganacao: 2, furtividade: 2 } },
  ],
  trog: [
    () => ({ source: 'Reptiliano (Trog)', citation: 'Cap. 1, pág. 31', defense: 1 }),
    (i) => (equippedArmor(i.inventory) ? null : { source: 'Reptiliano — sem armadura (Trog)', citation: 'Cap. 1, pág. 31', skills: { furtividade: 5 } }),
  ],
};

/** Efeitos de classe (habilidades automáticas por nível). */
const CLASS_EFFECTS: EffectFn[] = [
  // Caçador — Rastreador: +2 em Sobrevivência (Cap. 1, pág. 50)
  (i) => (classLevelOf(i, 'cacador') >= 1 ? { source: 'Rastreador (Caçador)', citation: 'Cap. 1, pág. 50', skills: { sobrevivencia: 2 } } : null),
  // Bárbaro — Instinto Selvagem: 3º nível +1 em dano, Percepção e Reflexos; +1 a cada seis níveis (pág. 42)
  (i) => {
    const lv = classLevelOf(i, 'barbaro');
    if (lv < 3) return null;
    const b = 1 + Math.floor((lv - 3) / 6);
    return { source: 'Instinto Selvagem (Bárbaro)', citation: 'Cap. 1, pág. 42', skills: { percepcao: b, reflexos: b } };
  },
  // Bucaneiro — Esquiva Sagaz: 3º nível +1 Defesa e Reflexos, +1 a cada quatro níveis; sem armadura pesada nem imóvel (pág. 48)
  (i) => {
    const lv = classLevelOf(i, 'bucaneiro');
    if (lv < 3 || wearsHeavyArmor(i.inventory) || (i.activeConditions || []).includes('imovel')) return null;
    const b = 1 + Math.floor((lv - 3) / 4);
    return { source: 'Esquiva Sagaz (Bucaneiro)', citation: 'Cap. 1, pág. 48', defense: b, skills: { reflexos: b } };
  },
  // Lutador — Casca Grossa: 7º nível +1 na Defesa, +1 a cada quatro níveis (a parte da Constituição fica na Defesa) (pág. 77)
  (i) => {
    const lv = classLevelOf(i, 'lutador');
    if (lv < 7) return null;
    return { source: 'Casca Grossa (Lutador)', citation: 'Cap. 1, pág. 77', defense: 1 + Math.floor((lv - 7) / 4) };
  },
];

/** Efeitos de poderes gerais, concedidos, da Tormenta e de origem. */
const POWER_EFFECTS: Record<string, EffectFn> = {
  // Combate (Cap. 2, págs. 124–129)
  Esquiva: () => ({ source: 'Esquiva', citation: 'Cap. 2, pág. 125', defense: 2, skills: { reflexos: 2 } }),
  Encouraçado: (i) => {
    if (!wearsHeavyArmor(i.inventory)) return null;
    const extra = GENERAL_POWERS_LIST.filter((p) => has(i, p.name) && /Encouraçado/.test(p.prerequisites || '')).length;
    return { source: 'Encouraçado', citation: 'Cap. 2, pág. 125', defense: 2 + 2 * extra };
  },
  'Estilo de Arma e Escudo': (i) =>
    equippedShield(i.inventory) ? { source: 'Estilo de Arma e Escudo', citation: 'Cap. 2, pág. 125', defense: 2 } : null,
  'Estilo de Uma Arma': (i) => {
    const weapons = i.inventory.filter((it) => it.isEquipped && it.category.startsWith('arma'));
    const one = weapons.length === 1 && weapons[0].subcategory !== 'duas_maos' && weapons[0].subcategory !== 'distancia';
    return one && !equippedShield(i.inventory) ? { source: 'Estilo de Uma Arma', citation: 'Cap. 2, pág. 128', defense: 2 } : null;
  },
  Inexpugnável: (i) =>
    wearsHeavyArmor(i.inventory)
      ? { source: 'Inexpugnável', citation: 'Cap. 2, pág. 128', skills: { fortitude: 2, reflexos: 2, vontade: 2 } }
      : null,
  'Saque Rápido': () => ({ source: 'Saque Rápido', citation: 'Cap. 2, pág. 129', skills: { iniciativa: 2 } }),
  Vitalidade: (i) => ({ source: 'Vitalidade', citation: 'Cap. 2, pág. 129', hp: i.level, skills: { fortitude: 2 } }),
  // Destino (Cap. 2, págs. 129–131)
  Acrobático: () => ({ source: 'Acrobático', citation: 'Cap. 2, pág. 129', skillAttribute: { atletismo: 'des' } }),
  Atlético: () => ({ source: 'Atlético', citation: 'Cap. 2, pág. 130', skills: { atletismo: 2 }, speed: 3 }),
  'Costas Largas': () => ({ source: 'Costas Largas', citation: 'Cap. 2, pág. 130', spaces: 5 }),
  'Inventário Organizado': (i) => ({ source: 'Inventário Organizado', citation: 'Cap. 2, pág. 130', spaces: Math.max(0, i.attributes.int) }),
  Investigador: () => ({ source: 'Investigador', citation: 'Cap. 2, pág. 130', skills: { investigacao: 2 } }),
  'Sentidos Aguçados': () => ({ source: 'Sentidos Aguçados', citation: 'Cap. 2, pág. 130', skills: { percepcao: 2 } }),
  'Vontade de Ferro': (i) => ({ source: 'Vontade de Ferro', citation: 'Cap. 2, pág. 131', mp: Math.floor(i.level / 2), skills: { vontade: 2 } }),
  // Concedidos (Cap. 2, págs. 132–135)
  'Bênção do Mana': (i) => ({ source: 'Bênção do Mana', citation: 'Cap. 2, pág. 132', mp: Math.ceil(i.level / 2) }),
  'Compreender os Ermos': () => ({
    source: 'Compreender os Ermos',
    citation: 'Cap. 2, pág. 132',
    skills: { sobrevivencia: 2 },
    skillAttribute: { adestramento: 'sab' },
  }),
  'Escamas Dracônicas': () => ({ source: 'Escamas Dracônicas', citation: 'Cap. 2, pág. 133', defense: 2, skills: { fortitude: 2 } }),
  'Fé Guerreira': () => ({ source: 'Fé Guerreira', citation: 'Cap. 2, pág. 133', skillAttribute: { guerra: 'sab' } }),
  'Golpista Divino': () => ({ source: 'Golpista Divino', citation: 'Cap. 2, pág. 134', skills: { enganacao: 2, jogatina: 2, ladinagem: 2 } }),
  'Mente Analítica': () => ({ source: 'Mente Analítica', citation: 'Cap. 2, pág. 134', skills: { intuicao: 2, investigacao: 2, vontade: 2 } }),
  'Mente Vazia': () => ({ source: 'Mente Vazia', citation: 'Cap. 2, pág. 134', skills: { iniciativa: 2, percepcao: 2, vontade: 2 } }),
  'Talento Artístico': () => ({ source: 'Talento Artístico', citation: 'Cap. 2, pág. 135', skills: { acrobacia: 2, atuacao: 2, diplomacia: 2 } }),
  'Astúcia da Serpente': () => ({ source: 'Astúcia da Serpente', citation: 'Cap. 2, pág. 132', skills: { enganacao: 2, furtividade: 2, intuicao: 2 } }),
  // Tormenta (Cap. 2, págs. 136–137)
  Antenas: (i) => {
    const b = tormentaScaling(i);
    return { source: 'Antenas', citation: 'Cap. 2, pág. 136', skills: { iniciativa: b, percepcao: b, vontade: b } };
  },
  'Articulações Flexíveis': (i) => {
    const b = tormentaScaling(i);
    return { source: 'Articulações Flexíveis', citation: 'Cap. 2, pág. 136', skills: { acrobacia: b, furtividade: b, reflexos: b } };
  },
  Carapaça: (i) => ({ source: 'Carapaça', citation: 'Cap. 2, pág. 136', defense: tormentaScaling(i) }),
  'Mãos Membranosas': (i) => {
    const b = tormentaScaling(i);
    return { source: 'Mãos Membranosas', citation: 'Cap. 2, pág. 137', skills: { atletismo: b, fortitude: b } };
  },
  'Olhos Vermelhos': (i) => ({ source: 'Olhos Vermelhos', citation: 'Cap. 2, pág. 137', skills: { intimidacao: tormentaScaling(i) } }),
  // Poderes de classe (Cap. 1)
  'Pele de Ferro': (i) =>
    wearsHeavyArmor(i.inventory) ? null : { source: 'Pele de Ferro', citation: 'Cap. 1, pág. 42', defense: 4 },
  'Totem Espiritual': () => ({ source: 'Totem Espiritual', citation: 'Cap. 1, pág. 42', mpAttribute: 'sab' }),
  'Poder Mágico': (i) => ({ source: 'Poder Mágico', citation: 'Cap. 1, pág. 38', mp: classLevelOf(i, 'arcanista') }),
  'Pernas do Mar': () => ({ source: 'Pernas do Mar', citation: 'Cap. 1, pág. 48', skills: { acrobacia: 2, atletismo: 2 } }),
  'Elo com a Natureza': () => ({ source: 'Elo com a Natureza', citation: 'Cap. 1, pág. 51', mpAttribute: 'sab' }),
  Pajem: () => ({ source: 'Pajem', citation: 'Cap. 1, pág. 54', skills: { diplomacia: 2 } }),
  'Força dos Penhascos': () => ({ source: 'Força dos Penhascos', citation: 'Cap. 1, pág. 62', skills: { fortitude: 2 } }),
  Gatuno: () => ({ source: 'Gatuno', citation: 'Cap. 1, pág. 74', skills: { atletismo: 2 } }),
  Sombra: () => ({ source: 'Sombra', citation: 'Cap. 1, pág. 74', skills: { furtividade: 2 } }),
  'Braços Calejados': (i) =>
    equippedArmor(i.inventory) ? null : { source: 'Braços Calejados', citation: 'Cap. 1, pág. 76', defenseAttribute: 'for' },
  Sarado: (i) => ({ source: 'Sarado', citation: 'Cap. 1, pág. 77', hpAttribute: 'for', skills: { fortitude: i.attributes.for } }),
  'Voz Poderosa': () => ({ source: 'Voz Poderosa', citation: 'Cap. 1, pág. 80', skills: { diplomacia: 2, intimidacao: 2 } }),
  // Origem (Cap. 1, págs. 85–95)
  'Coração Heroico': (i) => ({
    source: 'Coração Heroico',
    citation: 'Cap. 1, pág. 92',
    mp: 3 + 3 * [5, 11, 17].filter((lv) => i.level >= lv).length,
  }),
  'Dom Artístico': () => ({ source: 'Dom Artístico', citation: 'Cap. 1, pág. 87', skills: { atuacao: 2 } }),
  'Esse Cheiro...': () => ({ source: 'Esse Cheiro...', citation: 'Cap. 1, pág. 88', skills: { fortitude: 2 } }),
  Mochileiro: () => ({ source: 'Mochileiro', citation: 'Cap. 1, pág. 93', spaces: 5 }),
};

/** Todos os efeitos passivos aplicáveis ao personagem. */
export function collectPassiveEffects(input: RulesInput): Contribution[] {
  const out: Contribution[] = [];
  // Mochila de aventureiro: vestida, aumenta a capacidade de carga em 2 espaços (Cap. 3, pág. 157)
  if (input.inventory.some((it) => it.isEquipped && /mochila de aventureiro/i.test(it.name))) {
    out.push({ source: 'Mochila de aventureiro', citation: 'Cap. 3, pág. 157', spaces: 2 });
  }
  const size = effectiveSize(input);
  const stealth = SIZE_STEALTH[size] || 0;
  if (stealth) out.push({ source: `Tamanho ${size}`, citation: 'Tabela 1-21, Cap. 1, pág. 107', skills: { furtividade: stealth } });
  Object.entries(ABILITY_EFFECTS).forEach(([abilityId, fn]) => {
    if (!hasRaceAbility(input, abilityId)) return;
    const c = fn(input);
    if (c) out.push(c);
  });
  (RACE_EFFECTS[input.raceId] || []).forEach((fn) => {
    const c = fn(input);
    if (c) out.push(c);
  });
  // Osteon com habilidade de deslocamento herdada (Memória Póstuma, pág. 29): ajusta os 9m do osteon
  const former = osteonFormer(input);
  const formerSpeed: Record<string, number> = { elfo_graca_glorienn: 12, anao_devagar_sempre: 6, hynne_pequeno_rechonchudo: 6 };
  if (former?.ability && formerSpeed[former.ability.id]) {
    out.push({ source: `${former.ability.name} (Memória Póstuma)`, citation: 'Cap. 1, pág. 29', speed: formerSpeed[former.ability.id] - 9 });
  }
  CLASS_EFFECTS.forEach((fn) => {
    const c = fn(input);
    if (c) out.push(c);
  });
  new Set(input.powerNames || []).forEach((name) => {
    const fn = POWER_EFFECTS[name];
    const c = fn?.(input);
    if (c) out.push(c);
  });
  return out;
}

/** Atributo-chave efetivo de uma perícia, considerando trocas (Acrobático, Hynne, Fé Guerreira...). */
export function skillAttributeFor(skillId: string, defaultAttr: AttributeKey, effects: Contribution[], attrs: CharacterAttributes): AttributeKey {
  const options = effects.map((e) => e.skillAttribute?.[skillId]).filter((a): a is AttributeKey => !!a);
  // As trocas dizem "pode usar"; usa a melhor opção disponível
  return [defaultAttr, ...options].reduce((best, a) => (attrs[a] > attrs[best] ? a : best), defaultAttr);
}
