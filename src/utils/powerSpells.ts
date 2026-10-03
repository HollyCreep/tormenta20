import { CLASSES_LIST } from '../data/classes';
import { CLASS_POWERS_LIST } from '../data/classPowers';
import { SPELLS_LIST } from '../data/spells';
import { spellGrantFor, type PowerSpellGrant } from '../data/powerSpellGrants';
import type { CharacterPower, CharacterSpell } from '../types/character';
import type { Spell } from '../types/rules';
import { calculateSpellCircleUnlocked } from './rulesEngine';

type SpellType = 'arcana' | 'divina';

/** Dados mínimos da ficha usados para resolver as magias concedidas por poderes. */
export interface SpellGrantOwner {
  classId: string;
  level: number;
  classes?: { classId: string; level: number }[];
  spellSchools?: string[];
  spells?: CharacterSpell[];
  powers?: Pick<CharacterPower, 'id' | 'name'>[];
}

export const TEURGIST = 'Teurgista Místico';
export const SEA_BREATH = 'Sopro do Mar';
export const SEA_BREATH_SPELL = 'Sopro das Uivantes';

const hasPower = (owner: SpellGrantOwner, name: string) => (owner.powers || []).some((p) => p.name === name);

/** Classe que fornece um poder de classe (pelo id do catálogo, ex.: "arcanista_conhecimento_magico"). */
export function powerClassId(power: Pick<CharacterPower, 'id' | 'name'>): string | undefined {
  const byId = CLASS_POWERS_LIST.find((p) => p.id === power.id);
  if (byId) return byId.classId;
  return CLASSES_LIST.find((c) => power.id.startsWith(`${c.id}_`) && CLASS_POWERS_LIST.some((p) => p.classId === c.id && p.name === power.name))?.id;
}

export function grantForPower(power: Pick<CharacterPower, 'id' | 'name'>): PowerSpellGrant | undefined {
  return spellGrantFor(power.name, powerClassId(power));
}

export const classLevelOf = (owner: SpellGrantOwner, classId: string) =>
  owner.classes?.find((c) => c.classId === classId)?.level ?? (owner.classId === classId ? owner.level : 0);

/**
 * Círculo máximo de fórmulas (Livro de Fórmulas, pág. 70): 1º círculo; 2º a partir do 6º nível de
 * inventor; com Mestre Alquimista, um círculo maior a cada quatro níveis (10º, 14º e 18º).
 */
export function formulaMaxCircle(owner: SpellGrantOwner): number {
  const lv = classLevelOf(owner, 'inventor');
  let circle = lv >= 6 ? 2 : 1;
  if (hasPower(owner, 'Mestre Alquimista')) circle += [10, 14, 18].filter((x) => lv >= x).length;
  return Math.min(5, circle);
}

/** Fórmulas já no livro. */
export const formulasOf = (owner: SpellGrantOwner) => (owner.spells || []).filter((s) => s.isFormula);

/** Magias que a ficha conhece (excluindo fórmulas, que são um livro à parte). */
const knownSpells = (owner: SpellGrantOwner) => (owner.spells || []).filter((s) => !s.isFormula);

const otherType = (t: SpellType): SpellType => (t === 'arcana' ? 'divina' : 'arcana');

/**
 * Teurgista Místico (Cap. 2, pág. 135): "Até uma magia de cada círculo que você aprender poderá ser
 * escolhida entre magias divinas (se você for um conjurador arcano) ou entre magias arcanas (se for um
 * conjurador divino)." Retorna se ainda há vaga do outro tipo no círculo, contando as já escolhidas.
 */
export function teurgistSlotFree(owner: SpellGrantOwner, classType: SpellType, circle: number, pending: Pick<Spell, 'type' | 'circle'>[] = []): boolean {
  if (!hasPower(owner, TEURGIST)) return false;
  const other = otherType(classType);
  const used = [...knownSpells(owner).filter((s) => s.learnedFrom === 'classe'), ...pending].filter((s) => s.type === other && s.circle === circle).length;
  return used < 1;
}

/**
 * Sopro do Mar (Oceano, pág. 135): "Você pode aprender Sopro das Uivantes como uma magia divina. Se fizer
 * isso, o custo dela diminui em –1 PM." Disponível para conjuradores divinos que possam lançar o círculo.
 */
export function seaBreathOption(owner: SpellGrantOwner, classType: SpellType, maxCircle: number): Spell | undefined {
  if (classType !== 'divina' || !hasPower(owner, SEA_BREATH)) return undefined;
  const sp = SPELLS_LIST.find((s) => s.name === SEA_BREATH_SPELL);
  if (!sp || sp.circle > maxCircle || knownSpells(owner).some((s) => s.id === sp.id)) return undefined;
  return { ...sp, type: 'divina' };
}

/** Ajusta uma magia aprendida pela classe: Sopro das Uivantes como divina recebe a redução do Sopro do Mar. */
export function asClassSpell(sp: Spell, classId: string, owner?: SpellGrantOwner): CharacterSpell {
  const seaBreath = sp.name === SEA_BREATH_SPELL && sp.type === 'divina' && (!owner || hasPower(owner, SEA_BREATH));
  return { ...sp, learnedFrom: 'classe', sourceClassId: classId, ...(seaBreath ? { costReducedBy: [SEA_BREATH] } : {}) };
}

/**
 * Magias de classe que podem ser aprendidas (nível, escolas, Teurgista Místico e Sopro do Mar).
 * "Você pode escolher qualquer magia de um tipo e círculo que possa lançar com aquela classe" (pág. 170).
 */
export function learnableClassSpells(
  owner: SpellGrantOwner,
  classId: string,
  opts: { maxCircle: number; exactCircle?: boolean; schools?: string[]; types?: SpellType[]; selected?: Spell[] }
): Spell[] {
  const cls = CLASSES_LIST.find((c) => c.id === classId);
  const classType = (cls?.spellcaster?.type || 'arcana') as SpellType;
  const types = opts.types || [classType];
  const known = new Set(knownSpells(owner).map((s) => s.id));
  const selected = opts.selected || [];
  const circleOk = (c: number) => (opts.exactCircle ? c === opts.maxCircle : c <= opts.maxCircle);
  const list = SPELLS_LIST.filter((s) => {
    if (!circleOk(s.circle) || known.has(s.id)) return false;
    if (opts.schools?.length && !opts.schools.includes(s.school)) return false;
    if (s.type === 'universal' || types.includes(s.type as SpellType)) return true;
    // Teurgista: uma do outro tipo por círculo (a já selecionada continua visível)
    if (s.type === otherType(classType) && types.length === 1) {
      return selected.some((x) => x.id === s.id) || teurgistSlotFree(owner, classType, s.circle, selected.filter((x) => x.id !== s.id));
    }
    return false;
  });
  const sea = seaBreathOption(owner, classType, opts.maxCircle);
  if (sea && circleOk(sea.circle) && (!opts.schools?.length || opts.schools.includes(sea.school))) {
    return [...list.filter((s) => s.id !== sea.id), sea].sort((a, b) => a.circle - b.circle || a.name.localeCompare(b.name, 'pt-BR'));
  }
  return list.sort((a, b) => a.circle - b.circle || a.name.localeCompare(b.name, 'pt-BR'));
}

/**
 * Magias que o poder permite escolher: tipo e círculo que a classe pode lançar (Cap. 4, pág. 170),
 * escolas do bardo/druida quando o poder exige, sem repetir magias que o personagem já conhece.
 */
export function spellOptionsForGrant(grant: PowerSpellGrant, owner: SpellGrantOwner, selected: Spell[] = []): Spell[] {
  const c = grant.choose;
  if (!c) return [];
  const schools = c.schools === 'known' ? (owner.spellSchools?.length ? owner.spellSchools : undefined) : c.schools;
  if (grant.formula) {
    // Fórmulas: magias arcanas ou divinas, sem repetir as do livro (pág. 70)
    const max = c.circle === 'formula' ? formulaMaxCircle(owner) : (c.circle as number);
    const inBook = new Set(formulasOf(owner).map((s) => s.id));
    return SPELLS_LIST.filter((s) => (c.circle === 'formula' ? s.circle <= max : s.circle === max) && !inBook.has(s.id)).sort(
      (a, b) => a.circle - b.circle || a.name.localeCompare(b.name, 'pt-BR')
    );
  }
  const classId = grant.classId || owner.classId;
  const maxCircle =
    c.circle === 'castable' ? calculateSpellCircleUnlocked(Math.max(1, classLevelOf(owner, classId)), classId) : (c.circle as number);
  if (c.types === 'class') {
    return learnableClassSpells(owner, classId, { maxCircle, schools, selected });
  }
  const known = new Set(knownSpells(owner).map((s) => s.id));
  return SPELLS_LIST.filter(
    (s) =>
      (c.circle === 'castable' ? s.circle <= maxCircle : s.circle === maxCircle) &&
      (s.type === 'universal' || (c.types as SpellType[]).includes(s.type as SpellType)) &&
      (!schools || schools.includes(s.school)) &&
      !known.has(s.id)
  ).sort((a, b) => a.circle - b.circle || a.name.localeCompare(b.name, 'pt-BR'));
}

/** Converte magias escolhidas/definidas por um poder em magias da ficha. */
export function spellsFromGrant(grant: PowerSpellGrant, spells: Spell[], owner?: SpellGrantOwner): CharacterSpell[] {
  if (grant.formula) {
    return spells.map((s) => ({ ...s, learnedFrom: 'poder' as const, isFormula: true, keyAttribute: 'int' as const, sourcePower: grant.power }));
  }
  const isClassPower = !!grant.classId;
  return spells.map((s) => ({
    ...(isClassPower ? asClassSpell(s, grant.classId!, owner) : s),
    // Habilidade de classe: limite de PM = nível na classe; poder concedido: nível de personagem (Cap. 5, pág. 224)
    learnedFrom: isClassPower ? ('classe' as const) : ('poder' as const),
    ...(isClassPower ? { sourceClassId: grant.classId } : {}),
    ...(grant.keyAttribute ? { keyAttribute: grant.keyAttribute } : {}),
    sourcePower: grant.power,
  }));
}

export const spellByName = (name: string) => SPELLS_LIST.find((s) => s.name === name);

/** Magia fixa de poder: aprender (nova) ou reduzir o custo de uma já conhecida. */
export interface FixedGrantAction {
  power: string;
  spell: CharacterSpell;
  kind: 'learn' | 'reduce';
}

/**
 * Magias fixas dos poderes (ex.: Dedo Verde → Controlar Plantas) ainda não aplicadas à ficha. Nos poderes
 * concedidos, "caso aprenda novamente essa magia, seu custo diminui em –1 PM" (Cap. 2, págs. 133–136).
 */
export function pendingFixedGrants(powers: Pick<CharacterPower, 'id' | 'name'>[], current: CharacterSpell[] = []): FixedGrantAction[] {
  const out: FixedGrantAction[] = [];
  const seen = new Set<string>();
  powers.forEach((p) => {
    const g = grantForPower(p);
    if (!g?.fixed || seen.has(g.power)) return;
    seen.add(g.power);
    g.fixed.forEach((name) => {
      const sp = spellByName(name);
      if (!sp) return;
      const learnedHere = [...current, ...out.map((a) => a.spell)].find((s) => s.id === sp.id && !s.isFormula);
      if (!learnedHere) {
        out.push({ power: g.power, kind: 'learn', spell: spellsFromGrant(g, [sp])[0] });
      } else if (g.relearnReduces && learnedHere.sourcePower !== g.power && !(learnedHere.costReducedBy || []).includes(g.power)) {
        out.push({ power: g.power, kind: 'reduce', spell: learnedHere });
      }
    });
  });
  return out;
}

/** Aplica as magias fixas pendentes: novas entram na lista; repetidas recebem –1 PM. */
export function applyFixedGrants(spells: CharacterSpell[], actions: FixedGrantAction[]): CharacterSpell[] {
  let out = [...spells];
  actions.forEach((a) => {
    if (a.kind === 'learn') out.push(a.spell);
    else out = out.map((s) => (s.id === a.spell.id && !s.isFormula ? { ...s, costReducedBy: [...(s.costReducedBy || []), a.power] } : s));
  });
  return out;
}

/** Atalho: lista final com as magias fixas dos poderes aplicadas. */
export const withFixedGrants = (powers: Pick<CharacterPower, 'id' | 'name'>[], spells: CharacterSpell[]) =>
  applyFixedGrants(spells, pendingFixedGrants(powers, spells));

export interface PendingSpellGrant {
  grant: PowerSpellGrant;
  /** Quantas magias o poder concede no total (poderes repetíveis: por vez escolhida). */
  needed: number;
  have: number;
}

/** Poderes de escolha (Conhecimento Mágico, Centelha Mágica, Totem Espiritual...) com magias pendentes. */
export function pendingSpellGrants(powers: Pick<CharacterPower, 'id' | 'name'>[], spells: CharacterSpell[] = []): PendingSpellGrant[] {
  const byKey = new Map<string, PendingSpellGrant>();
  powers.forEach((p) => {
    const grant = grantForPower(p);
    if (!grant || (!grant.choose && !grant.options)) return;
    const key = `${grant.power}|${grant.classId || ''}`;
    const per = grant.choose?.count || 1;
    const entry = byKey.get(key) || { grant, needed: 0, have: 0 };
    entry.needed += per;
    byKey.set(key, entry);
  });
  byKey.forEach((e) => {
    e.have = spells.filter((s) => s.sourcePower === e.grant.power && (!e.grant.classId || s.sourceClassId === e.grant.classId || s.isFormula)).length;
  });
  return [...byKey.values()].filter((e) => e.have < e.needed);
}

/** Custo base de uma magia com as reduções de poderes (mínimo 0 — Cap. 4, pág. 170). */
export const spellCostReduction = (sp: Pick<CharacterSpell, 'costReducedBy'>) => (sp.costReducedBy || []).length;

/**
 * Escriba Arcano (pág. 38): "Aprender uma magia dessa forma exige um dia de trabalho e T$ 250 em
 * matérias-primas por PM necessário para lançar a magia."
 */
export const SCRIBE_GRANT: PowerSpellGrant = {
  power: 'Escriba Arcano',
  classId: 'arcanista',
  choose: { count: 1, circle: 'castable', types: 'class' },
  page: 38,
};
export const scribeCost = (circle: number) => {
  const pm = ({ 1: 1, 2: 3, 3: 6, 4: 10, 5: 15 } as Record<number, number>)[circle] || 1;
  return { pm, days: pm, tibares: pm * 250 };
};

const CIRCLE_COST: Record<number, number> = { 1: 1, 2: 3, 3: 6, 4: 10, 5: 15 };

/**
 * Custo base de uma magia já com as reduções de poderes (Tabela 4-1, pág. 170). "Uma habilidade nunca
 * pode ter seu custo reduzido para menos de 1 PM" (Cap. 5, pág. 226).
 */
export const spellBaseCost = (sp: Pick<CharacterSpell, 'circle' | 'costReducedBy'>) =>
  Math.max(1, (CIRCLE_COST[sp.circle || 1] || 1) - spellCostReduction(sp));
