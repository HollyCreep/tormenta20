import type { AttributeKey } from '../types/rules';

/**
 * Poderes que concedem magias — T20 JdA v1.3.
 *
 * "Algumas habilidades permitem que você aprenda magias novas. Caso a habilidade não diga qual magia
 * você aprende, você pode escolher qualquer magia de um tipo e círculo que possa lançar com aquela
 * classe." (Cap. 4, pág. 170). Poderes concedidos usam Sabedoria como atributo-chave (Cap. 2, pág. 132).
 */
export interface PowerSpellGrant {
  /** Nome do poder (como em generalPowers/classPowers/deities). */
  power: string;
  /** Poder de classe: classe que o fornece (o mesmo nome existe em mais de uma classe). */
  classId?: string;
  /** Magias definidas pelo poder (nomes do catálogo). */
  fixed?: string[];
  /** Opções nomeadas que definem a magia (ex.: animal totêmico). */
  options?: { label: string; spell: string }[];
  /** Magias à escolha. */
  choose?: {
    count: number;
    /** 'castable' = qualquer círculo que a classe possa lançar; número = círculo fixo. */
    circle: 'castable' | number;
    /** Tipos permitidos; 'class' = o tipo da classe (arcana para arcanista, divina para clérigo). */
    types: ('arcana' | 'divina')[] | 'class';
    /** Escolas permitidas; 'known' = as três escolas do bardo/druida. */
    schools?: string[] | 'known';
  };
  /** Atributo-chave. Sem valor: o da classe que fornece o poder. */
  keyAttribute?: AttributeKey;
  page: number;
}

const ASPECT = (power: string, schools: string[], page = 61): PowerSpellGrant => ({
  power,
  classId: 'druida',
  choose: { count: 1, circle: 'castable', types: ['arcana', 'divina'], schools },
  page,
});

export const POWER_SPELL_GRANTS: PowerSpellGrant[] = [
  // Poderes de classe
  { power: 'Conhecimento Mágico', classId: 'arcanista', choose: { count: 2, circle: 'castable', types: 'class' }, page: 38 },
  { power: 'Conhecimento Mágico', classId: 'clerigo', choose: { count: 2, circle: 'castable', types: 'class' }, page: 58 },
  {
    power: 'Aumentar Repertório',
    classId: 'bardo',
    choose: { count: 2, circle: 'castable', types: ['arcana', 'divina'], schools: 'known' },
    page: 44,
  },
  {
    power: 'Segredos da Natureza',
    classId: 'druida',
    choose: { count: 2, circle: 'castable', types: ['arcana', 'divina'], schools: 'known' },
    page: 63,
  },
  ASPECT('Aspecto do Inverno', ['Convocação', 'Evocação']),
  ASPECT('Aspecto do Outono', ['Necromancia']),
  ASPECT('Aspecto da Primavera', ['Encantamento', 'Ilusão']),
  ASPECT('Aspecto do Verão', ['Transmutação']),
  { power: 'Truque Mágico', classId: 'ladino', choose: { count: 1, circle: 1, types: ['arcana'] }, keyAttribute: 'int', page: 74 },
  { power: 'Orar', classId: 'paladino', choose: { count: 1, circle: 1, types: ['divina'] }, keyAttribute: 'sab', page: 83 },
  {
    power: 'Totem Espiritual',
    classId: 'barbaro',
    keyAttribute: 'sab',
    options: [
      { label: 'Coruja', spell: 'Orientação' },
      { label: 'Corvo', spell: 'Visão Mística' },
      { label: 'Falcão', spell: 'Detectar Ameaças' },
      { label: 'Grifo', spell: 'Primor Atlético' },
      { label: 'Lobo', spell: 'Concentração de Combate' },
      { label: 'Raposa', spell: 'Imagem Espelhada' },
      { label: 'Tartaruga', spell: 'Armadura Arcana' },
      { label: 'Urso', spell: 'Vitalidade Fantasma' },
    ],
    page: 42,
  },
  { power: 'Elo com a Natureza', classId: 'cacador', fixed: ['Caminhos da Natureza'], keyAttribute: 'sab', page: 51 },
  { power: 'Flagelo dos Mares', classId: 'bucaneiro', fixed: ['Amedrontar'], keyAttribute: 'car', page: 47 },

  // Poderes concedidos (atributo-chave Sabedoria, pág. 132)
  { power: 'Centelha Mágica', choose: { count: 1, circle: 1, types: ['arcana', 'divina'] }, keyAttribute: 'sab', page: 132 },
  { power: 'Dedo Verde', fixed: ['Controlar Plantas'], keyAttribute: 'sab', page: 133 },
  { power: 'Voz da Natureza', fixed: ['Acalmar Animal'], keyAttribute: 'sab', page: 136 },
  { power: 'Mestre dos Mares', fixed: ['Acalmar Animal'], keyAttribute: 'sab', page: 134 },
  { power: 'Farsa do Fingidor', fixed: ['Criar Ilusão'], keyAttribute: 'sab', page: 133 },
  { power: 'Palavras de Bondade', fixed: ['Enfeitiçar'], keyAttribute: 'sab', page: 134 },
  { power: 'Olhar Amedrontador', fixed: ['Amedrontar'], keyAttribute: 'sab', page: 134 },
  // "Você pode lançar Sussurros Insanos (CD Car)"
  { power: 'Transmissão da Loucura', fixed: ['Sussurros Insanos'], keyAttribute: 'car', page: 135 },
  { power: 'Manto da Penumbra', fixed: ['Escuridão'], keyAttribute: 'sab', page: 134 },
  { power: 'Dom da Profecia', fixed: ['Augúrio'], keyAttribute: 'sab', page: 133 },
];

/** Concessão de magias de um poder (poderes de classe são identificados também pela classe). */
export function spellGrantFor(powerName: string, classId?: string): PowerSpellGrant | undefined {
  const all = POWER_SPELL_GRANTS.filter((g) => g.power === powerName);
  return all.find((g) => !g.classId || !classId || g.classId === classId) || all[0];
}
