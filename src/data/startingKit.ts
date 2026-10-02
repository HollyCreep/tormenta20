import type { ClassDefinition, EquipmentItem } from '../types/rules';
import { EQUIPMENT_LIST } from './equipment';

/**
 * Equipamento inicial de personagens de 1º nível — T20 JdA, Cap. 3, pág. 140
 * ("Equipamento Inicial") e linhas "Itens." de cada origem (Cap. 1, págs. 85–95).
 */

export interface KitOption {
  /** Chave estável da opção dentro do espaço (slot). */
  key: string;
  name: string;
  /** Item do catálogo de onde vêm preço e estatísticas. */
  equipmentId?: string;
  /** Item próprio da origem que usa as estatísticas de uma arma do catálogo. */
  statsFrom?: string;
  category?: EquipmentItem['category'];
  spaces?: number;
  quantity?: number;
  note?: string;
}

export interface KitSlot {
  id: string;
  label: string;
  options: KitOption[];
  /** Item único concedido sem escolha: entra automaticamente na mochila. */
  fixed?: boolean;
  /** Item à escolha dentro de um limite de preço (ex.: Herança). */
  budget?: { max: number; multiple?: boolean };
  note?: string;
}

export interface KitGroup {
  id: 'inicial' | 'origem' | 'poder';
  title: string;
  citation: string;
  slots: KitSlot[];
}

export interface KitMoney {
  label: string;
  count: number;
  sides: number;
}

const eq = (id: string) => EQUIPMENT_LIST.find((e) => e.id === id);

const opt = (equipmentId: string, extra: Partial<KitOption> = {}): KitOption => ({
  key: equipmentId,
  name: eq(equipmentId)?.name || equipmentId,
  equipmentId,
  ...extra,
});

const custom = (key: string, name: string, extra: Partial<KitOption> = {}): KitOption => ({
  key,
  name,
  category: 'item_geral',
  spaces: 1,
  ...extra,
});

const fixed = (id: string, option: KitOption): KitSlot => ({ id, label: option.name, options: [option], fixed: true });
const choice = (id: string, label: string, options: KitOption[]): KitSlot => ({ id, label, options });

type WeaponGroup = 'arma_simples' | 'arma_marcial' | 'arma_exotica';
const weapons = (groups: WeaponGroup[], reach?: 'distancia' | 'corpo') =>
  EQUIPMENT_LIST.filter(
    (e) =>
      groups.includes(e.category as WeaponGroup) &&
      e.id !== 'escudo_leve_ataque' &&
      (!reach || (reach === 'distancia' ? e.subcategory === 'distancia' : e.subcategory !== 'distancia'))
  ).map((e) => opt(e.id));

const CRAFT_KITS = [
  opt('kit_oficio_alquimia'),
  opt('kit_oficio_armeiro'),
  custom('oficio_outro', 'Instrumentos de ofício (outro ofício)', { category: 'ferramenta' }),
];
const TRAVEL_GEAR = custom('equipamento_viagem', 'Equipamento de viagem');
const TENT = opt('tenda', { name: 'Barraca' });
const COMMONER_CLOTHES = custom('traje_plebeu', 'Traje de plebeu', { category: 'vestuario' });
const pet = (key: string, name: string) => custom(key, name, { category: 'animal', spaces: 0 });

/** Itens de origem conforme o livro (Cap. 1, págs. 85–95). */
const ORIGIN_SLOTS: Record<string, KitSlot[]> = {
  acolito: [fixed('o_simbolo', opt('simbolo_sagrado')), fixed('o_traje', custom('traje_sacerdote', 'Traje de sacerdote', { category: 'vestuario' }))],
  amigo_dos_animais: [
    choice('o_animal', 'Animal (escolha um)', [
      pet('cao_caca', 'Cão de caça'),
      pet('cavalo', 'Cavalo'),
      pet('ponei', 'Pônei'),
      pet('trobo', 'Trobo'),
    ]),
  ],
  amnesico: [
    {
      id: 'o_pista',
      label: 'Itens do passado (somando até T$ 500, aprovados pelo mestre)',
      options: [],
      budget: { max: 500, multiple: true },
    },
  ],
  aristocrata: [
    fixed('o_joia', custom('joia_familia', 'Joia de família (T$ 300)', { note: 'Vale T$ 300.' })),
    fixed('o_traje', opt('traje_corte')),
  ],
  artesao: [
    choice('o_instrumentos', 'Instrumentos de ofício (qualquer)', CRAFT_KITS),
    { id: 'o_fabricado', label: 'Item que você possa fabricar (até T$ 50)', options: [], budget: { max: 50 } },
  ],
  artista: [choice('o_arte', 'Estojo de disfarces ou instrumento musical', [opt('kit_disfarce'), opt('instrumento_musical')])],
  assistente_laboratorio: [fixed('o_instrumentos', opt('kit_oficio_alquimia'))],
  batedor: [
    fixed('o_barraca', TENT),
    fixed('o_viagem', TRAVEL_GEAR),
    choice('o_arma', 'Arma simples ou marcial de ataque à distância', weapons(['arma_simples', 'arma_marcial'], 'distancia')),
  ],
  capanga: [
    fixed('o_tatuagem', custom('tatuagem_gangue', 'Tatuagem ou adereço da gangue', { spaces: 0, note: '+1 em Intimidação.' })),
    choice('o_arma', 'Arma simples corpo a corpo', weapons(['arma_simples'], 'corpo')),
  ],
  charlatao: [
    fixed('o_disfarces', opt('kit_disfarce')),
    fixed('o_joia', custom('joia_falsa', 'Joia falsificada', { note: 'Valor aparente de T$ 100, sem valor real.' })),
  ],
  circense: [fixed('o_bolas', custom('bolas_malabarismo', 'Três bolas coloridas para malabarismo', { note: '+1 em Atuação.' }))],
  criminoso: [choice('o_ferramenta', 'Estojo de disfarces ou gazua', [opt('kit_disfarce'), opt('kit_ladrao')])],
  curandeiro: [fixed('o_balsamo', opt('balsamo_restaurador', { quantity: 2 })), fixed('o_maleta', opt('maleta_medicamentos'))],
  eremita: [fixed('o_barraca', TENT), fixed('o_viagem', TRAVEL_GEAR)],
  escravo: [
    fixed('o_algemas', opt('algemas')),
    fixed('o_ferramenta', custom('ferramenta_pesada', 'Ferramenta pesada', { statsFrom: 'maca', note: 'Mesmas estatísticas de uma maça.' })),
  ],
  estudioso: [
    fixed(
      'o_livros',
      custom('colecao_livros', 'Coleção de livros', { note: '+1 em Conhecimento, Guerra, Misticismo ou Nobreza, a sua escolha.' })
    ),
  ],
  fazendeiro: [
    fixed('o_carroca', custom('carroca', 'Carroça', { category: 'veiculo', spaces: 0 })),
    fixed('o_ferramenta', custom('ferramenta_agricola', 'Ferramenta agrícola', { statsFrom: 'lanca', note: 'Mesmas estatísticas de uma lança.' })),
    fixed('o_racoes', custom('racoes_10', 'Rações de viagem (10)', { category: 'alimentacao' })),
    fixed('o_animal', pet('animal_fazenda', 'Animal não combativo (galinha, porco ou ovelha)')),
  ],
  forasteiro: [
    fixed('o_viagem', TRAVEL_GEAR),
    fixed('o_instrumento', custom('instrumento_exotico', 'Instrumento musical exótico', { category: 'ferramenta', note: '+1 em uma perícia de Carisma aprovada pelo mestre.' })),
    fixed('o_traje', custom('traje_estrangeiro', 'Traje estrangeiro', { category: 'vestuario' })),
  ],
  gladiador: [
    choice('o_arma', 'Arma marcial ou exótica', weapons(['arma_marcial', 'arma_exotica'])),
    fixed('o_lembranca', custom('item_admirador', 'Item sem valor de um admirador', { spaces: 0 })),
  ],
  guarda: [
    fixed('o_apito', custom('apito', 'Apito', { spaces: 0 })),
    fixed('o_insignia', custom('insignia_milicia', 'Insígnia da milícia', { spaces: 0 })),
    choice('o_arma', 'Arma marcial', weapons(['arma_marcial'])),
  ],
  herdeiro: [fixed('o_simbolo', custom('simbolo_heranca', 'Símbolo da sua herança', { spaces: 0, note: 'Anel de sinete ou manto cerimonial.' }))],
  heroi_campones: [
    choice('o_ferramenta', 'Instrumentos de ofício ou arma simples', [...CRAFT_KITS, ...weapons(['arma_simples'])]),
    fixed('o_traje', COMMONER_CLOTHES),
  ],
  marujo: [fixed('o_corda', opt('corda'))],
  mateiro: [fixed('o_arco', opt('arco_curto')), fixed('o_barraca', TENT), fixed('o_viagem', TRAVEL_GEAR), fixed('o_flechas', opt('flechas_20'))],
  membro_guilda: [choice('o_ferramenta', 'Gazua ou instrumentos de ofício', [opt('kit_ladrao'), ...CRAFT_KITS])],
  mercador: [
    fixed('o_carroca', custom('carroca', 'Carroça', { category: 'veiculo', spaces: 0 })),
    fixed('o_trobo', pet('trobo', 'Trobo')),
    fixed('o_mercadorias', custom('mercadorias', 'Mercadorias para vender (T$ 100)', { note: 'Valem T$ 100.' })),
  ],
  minerador: [fixed('o_gemas', custom('gemas', 'Gemas preciosas (T$ 100)', { spaces: 0, note: 'Valem T$ 100.' })), fixed('o_picareta', opt('picareta'))],
  nomade: [fixed('o_bordao', opt('bordao')), fixed('o_viagem', TRAVEL_GEAR)],
  pivete: [fixed('o_gazua', opt('kit_ladrao')), fixed('o_traje', COMMONER_CLOTHES), fixed('o_animal', pet('animal_urbano', 'Animal urbano (cão, gato, rato ou pombo)'))],
  refugiado: [{ id: 'o_estrangeiro', label: 'Item estrangeiro (até T$ 100)', options: [], budget: { max: 100 } }],
  seguidor: [{ id: 'o_presente', label: 'Item recebido do seu mestre (até T$ 100)', options: [], budget: { max: 100 } }],
  selvagem: [choice('o_arma', 'Arma simples', weapons(['arma_simples'])), fixed('o_animal', pet('animal_selvagem', 'Pequeno animal de estimação (pássaro ou esquilo)'))],
  soldado: [
    choice('o_arma', 'Arma marcial', weapons(['arma_marcial'])),
    fixed('o_uniforme', custom('uniforme_militar', 'Uniforme militar', { category: 'vestuario' })),
    fixed('o_insignia', custom('insignia_exercito', 'Insígnia do seu exército', { spaces: 0 })),
  ],
  taverneiro: [
    fixed('o_rolo', custom('rolo_macarrao', 'Rolo de macarrão ou martelo de carne', { statsFrom: 'clava', note: 'Mesmas estatísticas de uma clava.' })),
    fixed('o_utensilios', custom('utensilios_taverna', 'Panela, avental, caneca e pano sujo')),
  ],
  trabalhador: [
    choice('o_ferramenta', 'Ferramenta pesada', [
      custom('ferramenta_pesada_maca', 'Ferramenta pesada (como maça)', { statsFrom: 'maca' }),
      custom('ferramenta_pesada_lanca', 'Ferramenta pesada (como lança)', { statsFrom: 'lanca' }),
    ]),
  ],
};

/** Dinheiro extra concedido pela origem (ex.: Marujo, "T$ 2d6"). */
const ORIGIN_MONEY: Record<string, KitMoney> = {
  marujo: { label: 'Marujo: último salário', count: 2, sides: 6 },
};

/** Equipamento básico de todo personagem de 1º nível (Cap. 3, pág. 140). */
function classSlots(cls: ClassDefinition): KitSlot[] {
  const slots: KitSlot[] = [
    fixed('c_mochila', opt('mochila')),
    fixed('c_saco', opt('saco_dormir')),
    fixed('c_traje', opt('traje_viajante')),
    choice('c_arma_simples', 'Arma simples', weapons(['arma_simples'])),
  ];
  if (cls.proficiencies.weapons.includes('marciais')) {
    slots.push(choice('c_arma_marcial', 'Arma marcial (proficiência)', weapons(['arma_marcial'])));
  }
  // Exceção: arcanistas começam sem armadura
  if (cls.id !== 'arcanista') {
    const armor = [opt('armadura_couro'), opt('couro_batido'), opt('gibao_peles')];
    if (cls.proficiencies.armor.includes('pesadas')) armor.push(opt('brunea'));
    slots.push(choice('c_armadura', 'Armadura', armor));
  }
  if (cls.proficiencies.shields) slots.push(fixed('c_escudo', opt('escudo_leve')));
  return slots;
}

/** Poderes de origem que concedem itens (Herança, Herdeiro — Cap. 1, pág. 91). */
function powerSlots(originPowers: string[]): KitSlot[] {
  const heranca = originPowers.filter((p) => p === 'Herança').length;
  if (heranca === 0) return [];
  const max = heranca >= 2 ? 2000 : 1000;
  return [{ id: 'p_heranca', label: `Herança: item de até T$ ${max.toLocaleString('pt-BR')}`, options: [], budget: { max } }];
}

export function getStartingKit(cls: ClassDefinition, originId: string, originPowers: string[]): KitGroup[] {
  const groups: KitGroup[] = [
    { id: 'inicial', title: 'Kit de aventureiro', citation: 'Cap. 3, pág. 140', slots: classSlots(cls) },
  ];
  const origin = ORIGIN_SLOTS[originId];
  if (origin?.length) groups.push({ id: 'origem', title: 'Itens da origem', citation: 'Cap. 1, págs. 85–95', slots: origin });
  const powers = powerSlots(originPowers);
  if (powers.length) groups.push({ id: 'poder', title: 'Poder Herança', citation: 'Cap. 1, pág. 91', slots: powers });
  return groups;
}

export function getStartingMoney(originId: string): KitMoney[] {
  const list: KitMoney[] = [{ label: 'Dinheiro inicial', count: 4, sides: 6 }];
  if (ORIGIN_MONEY[originId]) list.push(ORIGIN_MONEY[originId]);
  return list;
}
