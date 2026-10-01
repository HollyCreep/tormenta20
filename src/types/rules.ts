export type AttributeKey = 'for' | 'des' | 'con' | 'int' | 'sab' | 'car';

export interface AttributeDefinition {
  key: AttributeKey;
  name: string;
  shortName: string;
  description: string;
  appliedTo: string[];
}

export interface RaceAbility {
  id: string;
  name: string;
  description: string;
  type: 'passiva' | 'ativa' | 'reacao';
  cost?: string;
  effects?: {
    defenseBonus?: number;
    speedBonus?: number;
    hpBonusInitial?: number;
    hpBonusPerLevel?: number;
    mpBonusPerLevel?: number;
    skillsGranted?: string[];
    spellsGranted?: string[];
  };
}

export interface Race {
  id: string;
  name: string;
  description: string;
  category: 'padrao' | 'rara';
  size: 'Minúsculo' | 'Pequeno' | 'Médio' | 'Grande';
  speed: number; // em metros
  attributeModifiers: Partial<Record<AttributeKey, number>>;
  isSelectableAttributes?: boolean;
  selectableAttributesCount?: number;
  selectableAttributesBonus?: number;
  selectableAttributesExclude?: AttributeKey[];
  abilities: RaceAbility[];
  customSelections?: {
    requiresSkillChoice?: boolean;
    skillChoiceCount?: number;
    requiresSubrace?: boolean;
    subraces?: {
      id: string;
      name: string;
      description: string;
      attributeModifiers: Partial<Record<AttributeKey, number>>;
      abilities: RaceAbility[];
    }[];
    allowsGeneralPowerChoice?: boolean;
  };
}

export interface ClassAbility {
  id: string;
  name: string;
  level: number;
  description: string;
  type: 'passiva' | 'ativa' | 'reacao';
  cost?: string;
}

export interface ClassDefinition {
  id: string;
  name: string;
  description: string;
  role: string;
  primaryAttributes: AttributeKey[];
  hpInitial: number;
  hpPerLevel: number;
  mpInitial: number;
  mpPerLevel: number;
  proficiencies: {
    weapons: ('simples' | 'marciais' | 'exoticas' | 'fogo')[];
    armor: ('leves' | 'pesadas')[];
    shields: boolean;
  };
  mandatorySkills: string[];
  skillChoicesCount: number;
  skillOptions: string[];
  abilitiesLevel1: ClassAbility[];
  spellcaster?: {
    type: 'arcana' | 'divina';
    circle1Count: number;
    keyAttribute: AttributeKey | 'choice';
    schoolsCount?: number;
    allowedSchools?: string[];
  };
  subclasses?: {
    title: string;
    options: {
      id: string;
      name: string;
      description: string;
      keyAttribute?: AttributeKey;
    }[];
  };
}

export interface OriginBenefit {
  type: 'pericia' | 'poder';
  name: string;
  description?: string;
}

export interface Origin {
  id: string;
  name: string;
  description: string;
  items: string[];
  skills: string[];
  powers: {
    name: string;
    description: string;
    type: 'origem' | 'combate' | 'destino' | 'magia' | 'tormenta';
  }[];
}

export interface DeityPower {
  id: string;
  name: string;
  description: string;
  prerequisites?: string;
}

export interface Deity {
  id: string;
  name: string;
  title: string;
  description: string;
  symbol: string;
  energyChannel: 'Positiva' | 'Negativa' | 'Qualquer';
  favoredWeapon: string;
  allowedDevoteesText: string;
  allowedClasses?: string[];
  allowedRaces?: string[];
  grantedPowers: DeityPower[];
  obligations: string;
}

export interface Skill {
  id: string;
  name: string;
  attribute: AttributeKey;
  trainedOnly: boolean;
  armorPenalty: boolean;
  description: string;
}

export interface Spell {
  id: string;
  name: string;
  circle: 1 | 2 | 3 | 4 | 5;
  type: 'arcana' | 'divina' | 'universal';
  school: 'Abjuração' | 'Adivinhação' | 'Convocação' | 'Encantamento' | 'Evocação' | 'Ilusão' | 'Necromancia' | 'Transmutação';
  execution: 'Padrão' | 'Movimento' | 'Completa' | 'Reação' | 'Livre' | string;
  range: string;
  targetArea: string;
  duration: 'Instantânea' | 'Cena' | 'Sustentada' | '1 dia' | 'Permanente' | string;
  resistance?: string;
  description: string;
  upgrades?: {
    cost: string;
    description: string;
  }[];
}

export interface EquipmentItem {
  id: string;
  name: string;
  category:
    | 'arma_simples'
    | 'arma_marcial'
    | 'arma_exotica'
    | 'arma_fogo'
    | 'armadura_leve'
    | 'armadura_pesada'
    | 'escudo'
    | 'item_geral'
    | 'esoterico'
    | 'alquimia'
    | 'ferramenta'
    | 'vestuario'
    | 'alimentacao'
    | 'animal'
    | 'veiculo'
    | 'servico';
  subcategory?: string;
  price: string;
  damage?: string;
  attackBonus?: number;
  critical?: string;
  range?: string;
  damageType?: string;
  defenseBonus?: number;
  armorPenalty?: number;
  spaces: number;
  description?: string;
  modifiers?: string[];
  specialMaterial?: string;
}

export interface ItemModifier {
  id: string;
  name: string;
  type: 'melhoria' | 'material_especial' | 'encanto';
  targetCategories: (
    | 'arma'
    | 'armadura'
    | 'armadura_leve'
    | 'armadura_pesada'
    | 'escudo'
    | 'esoterico'
    | 'alquimia'
    | 'item_geral'
    | 'ferramenta'
    | 'vestuario'
    | 'qualquer'
  )[];
  requirementText?: string;
  incompatibleWith?: string[];
  description: string;
  effect: {
    attackBonus?: number;
    damageBonus?: number;
    critMultiplierBonus?: number;
    critThreatBonus?: number;
    defenseBonus?: number;
    armorPenaltyBonus?: number;
    spacesModifier?: number;
    rangeStepBonus?: number;
    skillBonus?: { skillName: string; bonus: number };
    resistanceBonus?: number;
    maxMpBonus?: number;
    customText?: string;
  };
  additionalPrice?: number;
  priceByItemType?: {
    arma?: number;
    armadura_leve?: number;
    armadura_pesada?: number;
    escudo?: number;
    esoterico?: number;
  };
}

export interface ClassPower {
  id: string;
  name: string;
  classId: string;
  className: string;
  prerequisites?: string;
  description: string;
  cost?: string;
}

export interface GeneralPower {
  id: string;
  name: string;
  category: 'combate' | 'destino' | 'magia' | 'tormenta' | 'concedido';
  prerequisites?: string;
  description: string;
}

export interface Condition {
  id: string;
  name: string;
  description: string;
  effects: string[];
}
