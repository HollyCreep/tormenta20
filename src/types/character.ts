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

  // Classe
  classId: string;
  classSubclass?: string; // e.g. Bruxo, Feiticeiro (Dracônico), Mago
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

  createdAt: string;
  updatedAt: string;
}
