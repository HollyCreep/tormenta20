export type AttributeKey = 'for' | 'des' | 'con' | 'int' | 'sab' | 'car';

export interface AttributeDefinition {
  key: AttributeKey;
  name: string;
  shortName: string;
  description: string;
  appliedTo: string[];
}

/** Escolha que uma habilidade racial exige do jogador (guardada em CharacterSheet.racialChoices). */
export interface RaceAbilityChoice {
  /** Chave de armazenamento em racialChoices. */
  key: string;
  label: string;
  kind: 'option' | 'spell' | 'skill';
  count: number;
  /** Opções fixas (ids de magia, ids de perícia ou rótulos livres). Vazio = qualquer uma do tipo. */
  options?: string[];
  /** Para kind 'spell' sem lista fixa: círculo máximo permitido. */
  spellCircle?: number;
}

export interface RaceAbility {
  id: string;
  name: string;
  description: string;
  type: 'passiva' | 'ativa' | 'reacao';
  cost?: string;
  choice?: RaceAbilityChoice;
  /** Magias que a habilidade permite lançar (ids do catálogo) e seu atributo-chave. */
  grantedSpells?: { spellIds: string[]; keyAttribute: AttributeKey };
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
  /** Golem (Propósito de Criação): não escolhe origem e recebe um poder geral (pág. 27). */
  noOrigin?: boolean;
  /** Tipo de criatura (humanoide por padrão). */
  creatureType?: 'humanoide' | 'monstro' | 'construto' | 'morto-vivo' | 'espírito';
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
  /**
   * Regra especial de benefícios. 'amnesico': em vez de dois benefícios da lista, recebe
   * uma perícia e um poder escolhidos pelo mestre e o poder Lembranças Graduais (pág. 86).
   */
  benefitRule?: 'amnesico';
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
  /** Poderes concedidos: divindades cujos devotos podem escolhê-lo. */
  deities?: string[];
  /** Página do livro (T20 JdA v1.3). */
  page?: number;
}

export interface Condition {
  id: string;
  name: string;
  description: string;
  effects: string[];
}
