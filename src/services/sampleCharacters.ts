import { CharacterSheet } from '../types/character';
import {
  calculateArmorPenalty,
  calculateDefense,
  calculateMaxHp,
  calculateMaxMp,
  calculateMaxSpaces,
  calculateRacialModifiers,
  calculateSkillBonus,
  calculateSpeed,
  calculateTotalAttributes,
} from '../utils/rulesEngine';
import { SKILLS_LIST } from '../data/skills';
import { SPELLS_LIST } from '../data/spells';

export function createSampleCharacters(): CharacterSheet[] {
  // 1. Thuran: Anão Guerreiro
  const thuranBaseAttrs = { for: 3, des: 0, con: 3, int: 0, sab: 1, car: -1 };
  const thuranRacial = calculateRacialModifiers('anao');
  const thuranTotalAttrs = calculateTotalAttributes(thuranBaseAttrs, thuranRacial);

  const thuranInventory = [
    {
      id: 'inv_1',
      equipmentId: 'martelo_guerra',
      name: 'Martelo de guerra',
      category: 'arma_marcial' as const,
      damage: '1d8',
      critical: 'x3',
      spaces: 1,
      quantity: 1,
      isEquipped: true,
      price: 'T$ 12',
      description: 'Martelo de guerra pesado consagrado ao Deus Arsenal.',
    },
    {
      id: 'inv_2',
      equipmentId: 'cota_malha',
      name: 'Cota de malha',
      category: 'armadura_pesada' as const,
      defenseBonus: 6,
      armorPenalty: -2,
      spaces: 5,
      quantity: 1,
      isEquipped: true,
      price: 'T$ 150',
      description: 'Armadura pesada de anéis metálicos. Não aplica Destreza na Defesa.',
    },
    {
      id: 'inv_3',
      equipmentId: 'escudo_pesado',
      name: 'Escudo pesado',
      category: 'escudo' as const,
      defenseBonus: 2,
      armorPenalty: -2,
      spaces: 2,
      quantity: 1,
      isEquipped: true,
      price: 'T$ 15',
      description: 'Escudo de carvalho revestido com aço.',
    },
    {
      id: 'inv_4',
      equipmentId: 'mochila',
      name: 'Mochila de Aventureiro',
      category: 'item_geral' as const,
      spaces: 0,
      quantity: 1,
      isEquipped: true,
      price: 'T$ 2',
      description: 'Aumenta capacidade de carga em +2.',
    },
    {
      id: 'inv_5',
      equipmentId: 'balsamo_restaurador',
      name: 'Bálsamo restaurador',
      category: 'item_geral' as const,
      spaces: 1,
      quantity: 2,
      isEquipped: false,
      price: 'T$ 10',
      description: 'Recupera 2d4 PV ao ser aplicado.',
    },
  ];

  const thuranPowers = [
    {
      id: 'anao_conhecimento_rochas',
      name: 'Conhecimento das Rochas',
      source: 'raca' as const,
      description: 'Você recebe visão no escuro e +2 em testes de Percepção e Sobrevivência realizados no subterrâneo.',
    },
    {
      id: 'anao_devagar_sempre',
      name: 'Devagar e Sempre',
      source: 'raca' as const,
      description: 'Seu deslocamento é 6m e não é reduzido por armadura pesada ou carga.',
    },
    {
      id: 'anao_duro_como_pedra',
      name: 'Duro como Pedra',
      source: 'raca' as const,
      description: 'Você recebe +3 pontos de vida no 1º nível e +1 por nível seguinte.',
    },
    {
      id: 'anao_tradicao_heredrimm',
      name: 'Tradição de Heredrimm',
      source: 'raca' as const,
      description: 'Para você, machados, martelos e picaretas contam como armas simples.',
    },
    {
      id: 'guerreiro_ataque_especial',
      name: 'Ataque Especial',
      source: 'classe' as const,
      cost: '1 PM',
      description: 'Gaste 1 PM para receber +4 no teste de ataque ou +4 na rolagem de dano.',
    },
    {
      id: 'minerador_ataque_poderoso',
      name: 'Ataque Poderoso',
      source: 'origem' as const,
      description: 'Sofre -2 no teste de ataque para receber +5 no dano corpo a corpo.',
    },
    {
      id: 'arsenal_sangue_ferro',
      name: 'Sangue de Ferro',
      source: 'divindade' as const,
      cost: '1 PM',
      description: 'Gaste 1 PM para receber redução de dano 2 e +2 em Fortitude até o fim da cena.',
    },
  ];

  const thuranArmorPenalty = calculateArmorPenalty(thuranInventory);
  const thuranPowerNames = thuranPowers.map((p) => p.name);
  const thuranMaxHp = calculateMaxHp(1, thuranTotalAttrs, 'guerreiro', 'anao', thuranPowerNames);
  const thuranMaxMp = calculateMaxMp(1, 'guerreiro', 'anao', thuranPowerNames);
  const thuranDefense = calculateDefense(1, thuranTotalAttrs, thuranInventory, 'anao', 'guerreiro', thuranPowerNames);
  const thuranSpeed = calculateSpeed('anao', thuranInventory, thuranPowerNames);
  const thuranMaxSpaces = calculateMaxSpaces(thuranTotalAttrs, thuranInventory, thuranPowerNames);

  // Perícias treinadas de Thuran: Luta, Fortitude (classe), Atletismo (origem Minerador), Iniciativa
  const thuranTrained = ['luta', 'fortitude', 'atletismo', 'iniciativa'];
  const thuranSkills: Record<string, any> = {};
  SKILLS_LIST.forEach((s) => {
    const isTrained = thuranTrained.includes(s.id);
    const bonus = calculateSkillBonus(
      s.id,
      1,
      thuranTotalAttrs,
      isTrained,
      thuranArmorPenalty.value,
      'anao',
      thuranPowerNames
    );
    thuranSkills[s.id] = {
      id: s.id,
      name: s.name,
      attribute: s.attribute,
      isTrained,
      total: bonus.total,
      breakdown: bonus.breakdown,
      source: isTrained ? 'classe' : 'custom',
    };
  });

  const thuran: CharacterSheet = {
    id: 'char_thuran_01',
    name: 'Thuran Martelo-de-Prata',
    playerName: 'Mestre da Masmorra',
    concept: 'Defensor de Doherimm com martelo e escudo pesado',
    level: 1,
    xp: 0,
    raceId: 'anao',
    classId: 'guerreiro',
    originId: 'minerador',
    deityId: 'arsenal',
    selectedDeityPowers: ['Sangue de Ferro'],
    attributeMethod: 'point_buy',
    baseAttributes: thuranBaseAttrs,
    racialModifiers: thuranRacial,
    totalAttributes: thuranTotalAttrs,
    selectedClassSkills: ['luta', 'fortitude', 'iniciativa'],
    selectedIntSkills: [],
    selectedOriginBenefits: [
      { type: 'pericia', name: 'atletismo' },
      { type: 'poder', name: 'Ataque Poderoso' },
    ],
    stats: {
      maxHp: thuranMaxHp,
      currentHp: thuranMaxHp.value,
      tempHp: 0,
      maxMp: thuranMaxMp,
      currentMp: thuranMaxMp.value,
      tempMp: 0,
      defense: thuranDefense,
      speed: thuranSpeed,
      armorPenalty: thuranArmorPenalty,
      maxSpaces: thuranMaxSpaces,
      currentSpaces: 9,
    },
    skills: thuranSkills,
    powers: thuranPowers,
    spells: [],
    inventory: thuranInventory,
    tibares: 45,
    activeConditions: [],
    bio: {
      gender: 'Masculino',
      age: '72 anos',
      height: '1,38m',
      weight: '84kg',
      eyes: 'Castanhos escuros',
      hair: 'Barba espessa trançada com anéis de prata',
      appearance: 'Um anão atarracado com cicatrizes de minas e cota de malha impecavelmente polida.',
      personality: 'Leal aos companheiros, teimoso como uma rocha e apaixonado pela forja de armas.',
      history: 'Nascido nos túneis profundos de Doherimm, trabalhou na extração de minérios raros antes de atender ao chamado das armas para honrar Arsenal na superfície.',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // 2. Lyra Stardust: Humana Arcanista (Maga)
  const lyraBaseAttrs = { for: -1, des: 1, con: 1, int: 4, sab: 1, car: 1 };
  const lyraRacial = { for: 0, des: 1, con: 0, int: 1, sab: 0, car: 1 }; // +1 em DES, INT, CAR
  const lyraTotalAttrs = calculateTotalAttributes(lyraBaseAttrs, lyraRacial);

  const lyraInventory = [
    {
      id: 'inv_l1',
      equipmentId: 'adaga',
      name: 'Adaga cerimonial',
      category: 'arma_simples' as const,
      damage: '1d4',
      critical: '19',
      spaces: 1,
      quantity: 1,
      isEquipped: true,
      price: 'T$ 2',
      description: 'Lâmina de prata gravada com runas arcanas.',
    },
    {
      id: 'inv_l2',
      equipmentId: 'mochila',
      name: 'Mochila de Aventureiro',
      category: 'item_geral' as const,
      spaces: 0,
      quantity: 1,
      isEquipped: true,
      price: 'T$ 2',
      description: 'Contém pergaminhos, penas e tinta.',
    },
    {
      id: 'inv_l3',
      equipmentId: 'essencia_mana',
      name: 'Essência de mana',
      category: 'item_geral' as const,
      spaces: 1,
      quantity: 1,
      isEquipped: false,
      price: 'T$ 50',
      description: 'Restaura 2d4 PM.',
    },
  ];

  const lyraPowers = [
    {
      id: 'humano_versatil',
      name: 'Versátil (Humano)',
      source: 'raca' as const,
      description: 'Treinada em perícias adicionais pelo dinamismo humano.',
    },
    {
      id: 'arcanista_mago',
      name: 'Caminho do Mago (Grimório)',
      source: 'classe' as const,
      description: 'Prepara suas magias em um grimório detalhado com base em sua alta Inteligência.',
    },
    {
      id: 'estudioso_palpite',
      name: 'Palpite Fundamentado',
      source: 'origem' as const,
      description: 'Gasta 1 PM para usar Conhecimento no lugar de testes mentais.',
    },
    {
      id: 'wynna_bencao_mana',
      name: 'Bênção do Mana (Wynna)',
      source: 'divindade' as const,
      description: 'Recebe +1 PM por nível de personagem pela bênção da Deusa da Magia.',
    },
  ];

  const lyraArmorPenalty = calculateArmorPenalty(lyraInventory);
  const lyraPowerNames = lyraPowers.map((p) => p.name);
  const lyraMaxHp = calculateMaxHp(1, lyraTotalAttrs, 'arcanista', 'humano', lyraPowerNames);
  const lyraMaxMp = calculateMaxMp(1, 'arcanista', 'humano', lyraPowerNames);
  const lyraDefense = calculateDefense(1, lyraTotalAttrs, lyraInventory, 'humano', 'arcanista', lyraPowerNames);
  const lyraSpeed = calculateSpeed('humano', lyraInventory, lyraPowerNames);
  const lyraMaxSpaces = calculateMaxSpaces(lyraTotalAttrs, lyraInventory, lyraPowerNames);

  // Perícias de Lyra: Misticismo, Vontade (obrigatórias) + Conhecimento, Investigação (classe) + 5 perícias por INT > 0 (Diplomacia, Guerra, Percepção, Nobreza, Iniciativa)
  const lyraTrained = ['misticismo', 'vontade', 'conhecimento', 'investigacao', 'diplomacia', 'guerra', 'percepcao', 'nobreza', 'iniciativa'];
  const lyraSkills: Record<string, any> = {};
  SKILLS_LIST.forEach((s) => {
    const isTrained = lyraTrained.includes(s.id);
    const bonus = calculateSkillBonus(
      s.id,
      1,
      lyraTotalAttrs,
      isTrained,
      lyraArmorPenalty.value,
      'humano',
      lyraPowerNames
    );
    lyraSkills[s.id] = {
      id: s.id,
      name: s.name,
      attribute: s.attribute,
      isTrained,
      total: bonus.total,
      breakdown: bonus.breakdown,
      source: isTrained ? 'classe' : 'custom',
    };
  });

  // Magias aprendidas de Lyra (T20 JDA Cap. 4: Magia)
  const lyraSpells = [
    SPELLS_LIST.find((s) => s.id === 'armadura_arcana'),
    SPELLS_LIST.find((s) => s.id === 'adaga_mental'),
    SPELLS_LIST.find((s) => s.id === 'explosao_de_chamas'),
  ]
    .filter((s): s is (typeof SPELLS_LIST)[number] => Boolean(s))
    .map((s) => ({ ...s, learnedFrom: 'classe' as const }));

  const lyra: CharacterSheet = {
    id: 'char_lyra_02',
    name: 'Lyra Stardust',
    playerName: 'Mestre da Masmorra',
    concept: 'Erudita arcanista com vasto conhecimento teórico e grimório reluzente',
    level: 1,
    xp: 0,
    raceId: 'humano',
    selectedRacialAttributes: ['des', 'int', 'car'],
    classId: 'arcanista',
    classSubclass: 'mago',
    originId: 'estudioso',
    deityId: 'wynna',
    selectedDeityPowers: ['Bênção do Mana'],
    attributeMethod: 'point_buy',
    baseAttributes: lyraBaseAttrs,
    racialModifiers: lyraRacial,
    totalAttributes: lyraTotalAttrs,
    selectedClassSkills: ['conhecimento', 'investigacao'],
    selectedIntSkills: ['diplomacia', 'guerra', 'percepcao', 'nobreza', 'iniciativa'],
    selectedOriginBenefits: [
      { type: 'pericia', name: 'conhecimento' },
      { type: 'poder', name: 'Palpite Fundamentado' },
    ],
    stats: {
      maxHp: lyraMaxHp,
      currentHp: lyraMaxHp.value,
      tempHp: 0,
      maxMp: lyraMaxMp,
      currentMp: lyraMaxMp.value,
      tempMp: 0,
      defense: lyraDefense,
      speed: lyraSpeed,
      armorPenalty: lyraArmorPenalty,
      maxSpaces: lyraMaxSpaces,
      currentSpaces: 2,
    },
    skills: lyraSkills,
    powers: lyraPowers,
    spells: lyraSpells,
    inventory: lyraInventory,
    tibares: 85,
    activeConditions: [],
    bio: {
      gender: 'Feminino',
      age: '23 anos',
      height: '1,65m',
      weight: '55kg',
      eyes: 'Violeta luminoso',
      hair: 'Cabelos castanhos presos com fitas azuis',
      appearance: 'Túnica de viagem escura bordada com constelações de Arton e manto de lã leve.',
      personality: 'Curiosa, metódica e sempre fascinada por fenômenos sobrenaturais inexplicados.',
      history: 'Estudou na Academia Arcana de Valkaria, onde se destacou pela rápida assimilação das escolas de Evocação e Abjuração antes de partir em expedição exploratória.',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return [thuran, lyra];
}
