import { AttributeKey, EquipmentItem, GeneralPower, Spell } from './rules';

export interface BreakdownComponent {
  label: string;
  value: number | string;
}

export interface StatBreakdown {
  value: number;
  formula: string;
  components: BreakdownComponent[];
}

export interface CharacterAttributes {
  for: number;
  des: number;
  con: number;
  int: number;
  sab: number;
  car: number;
}

export interface TrainedSkillData {
  id: string;
  name: string;
  attribute: AttributeKey;
  isTrained: boolean;
  total: number;
  breakdown: StatBreakdown;
  source: 'classe' | 'inteligencia' | 'origem' | 'raca' | 'humano' | 'custom';
}

export interface CharacterInventoryItem {
  id: string;
  equipmentId?: string;
  name: string;
  category: EquipmentItem['category'];
  subcategory?: string;
  spaces: number;
  quantity: number;
  isEquipped: boolean;
  damage?: string;
  attackBonus?: number;
  critical?: string;
  damageType?: string;
  range?: string;
  defenseBonus?: number;
  armorPenalty?: number;
  description?: string;
  price?: string;
  source?: 'origem' | 'classe' | 'compra' | 'inicial' | string;
  isFree?: boolean;
  appliedModifiers?: string[];
  specialMaterial?: string;
  /** Espaço do equipamento inicial que este item preenche (ver data/startingKit.ts). */
  kitSlot?: string;
  /** Opção escolhida dentro do espaço do equipamento inicial. */
  kitOption?: string;
}

export interface CharacterPower {
  id: string;
  name: string;
  source: 'raca' | 'classe' | 'origem' | 'divindade' | 'geral';
  description: string;
  cost?: string;
  type?: string;
}

export interface CharacterSpell extends Spell {
  learnedFrom: 'classe' | 'raca' | 'origem' | 'poder';
  /** Classe que concedeu a magia (magias de classe). Define o limite de PM e o atributo-chave. */
  sourceClassId?: string;
  /** Poder que concedeu a magia (ex.: Centelha Mágica, Conhecimento Mágico). */
  sourcePower?: string;
  /** Atributo-chave próprio (magias raciais: ex. Tatuagem Mística usa Carisma). */
  keyAttribute?: AttributeKey;
}

export interface CharacterClassLevel {
  classId: string;
  className: string;
  level: number;
  subclass?: string;
}

export interface CharacterSheet {
  id: string;
  name: string;
  playerName: string;
  concept?: string;
  level: number;
  xp: number;

  // Raça
  raceId: string;
  subraceId?: string;
  selectedRacialAttributes?: AttributeKey[];
  selectedRacialSkills?: string[];
  selectedRacialPower?: string;
  /** Escolhas de habilidades raciais (RaceAbilityChoice.key → valores escolhidos). */
  racialChoices?: Record<string, string[]>;

  // Classe e Multiclasse
  classId: string;
  classSubclass?: string; // e.g. Bruxo, Feiticeiro (Dracônico), Mago
  classes?: CharacterClassLevel[]; // Suporte completo a multiclasse (Cap. 1, pág. 37)
  selectedClassSkills: string[];
  selectedIntSkills: string[]; // skills picked because of INT > 0

  // Origem
  originId: string;
  selectedOriginBenefits: {
    type: 'pericia' | 'poder';
    name: string;
  }[];

  // Divindade
  deityId: string; // 'nenhum' or deity id
  selectedDeityPowers: string[];

  // Atributos
  attributeMethod: 'point_buy' | 'standard' | 'roll' | 'free';
  baseAttributes: CharacterAttributes;
  racialModifiers: CharacterAttributes;
  totalAttributes: CharacterAttributes;

  // Estatísticas calculadas
  stats: {
    maxHp: StatBreakdown;
    currentHp: number;
    tempHp: number;
    maxMp: StatBreakdown;
    currentMp: number;
    tempMp: number;
    defense: StatBreakdown;
    speed: StatBreakdown;
    armorPenalty: StatBreakdown;
    maxSpaces: StatBreakdown;
    currentSpaces: number;
  };

  // Perícias
  skills: Record<string, TrainedSkillData>;

  // Poderes e Habilidades
  powers: CharacterPower[];

  // Magias (se aplicável)
  spells: CharacterSpell[];
  spellSchools?: string[];

  // Inventário
  inventory: CharacterInventoryItem[];
  tibares: number; // Dinheiro T$

  // Condições ativas
  activeConditions: string[];

  // Detalhes & Biografia
  bio: {
    gender?: string;
    age?: string;
    height?: string;
    weight?: string;
    eyes?: string;
    hair?: string;
    appearance?: string;
    personality?: string;
    history?: string;
    allies?: string;
    notes?: string;
  };

  // Caderno de Anotações Rico
  notes?: CharacterNote[];

  createdAt: string;
  updatedAt: string;
}

export interface CharacterNoteImage {
  id: string;
  dataUrl: string;
  caption?: string;
  createdAt: string;
}

export interface CharacterNote {
  id: string;
  title: string;
  content: string;
  category: 'missao' | 'npc' | 'local' | 'loot' | 'lore' | 'geral';
  images?: CharacterNoteImage[];
  createdAt: string;
  updatedAt: string;
}

export interface RollHistoryEntry {
  id: string;
  characterId?: string;
  characterName?: string;
  userName?: string;
  category: 'ataque' | 'dano' | 'pericia' | 'atributo' | 'magia' | 'livre';
  rollType: 'd20' | 'd6' | 'd8' | 'd10' | 'd12' | 'd4' | 'd100' | 'multiplo';
  title: string;
  formula: string;
  components?: string;
  diceResults: number[];
  modifier: number;
  total: number;
  isCrit: boolean;
  isFumble: boolean;
  timestamp: string; // ISO 8601
  timeFormatted: string; // HH:mm:ss
  dateFormatted: string; // DD/MM/YYYY
  annotation?: string; // Anotação personalizada do usuário
}

export interface CharacterChangeLogEntry {
  id: string;
  characterId: string;
  characterName: string;
  userName?: string;
  timestamp: string; // ISO 8601
  timeFormatted: string; // HH:mm:ss
  dateFormatted: string; // DD/MM/YYYY
  changeType: 'recursos' | 'atributos' | 'pericias' | 'poderes' | 'magias' | 'inventario' | 'nivel' | 'condicoes' | 'notas' | 'geral';
  title: string;
  description: string;
  diff?: {
    field: string;
    from: string | number;
    to: string | number;
  }[];
  annotation?: string; // Anotação personalizada do usuário
}

