import { AttributeDefinition, AttributeKey } from '../types/rules';

export const ATTRIBUTES_LIST: AttributeDefinition[] = [
  {
    key: 'for',
    name: 'Força',
    shortName: 'FOR',
    description: 'Seu poder muscular. A Força é aplicada em testes de Atletismo e Luta; rolagens de dano corpo a corpo ou com armas de arremesso, e testes de Força para levantar peso e atos similares.',
    appliedTo: ['Atletismo', 'Luta', 'Dano Corpo a Corpo', 'Dano de Arremesso', 'Capacidade de Carga'],
  },
  {
    key: 'des',
    name: 'Destreza',
    shortName: 'DES',
    description: 'Sua agilidade, reflexos, equilíbrio e coordenação motora. A Destreza é aplicada na Defesa e em testes de Acrobacia, Cavalgar, Furtividade, Iniciativa, Ladinagem, Pilotagem, Pontaria e Reflexos.',
    appliedTo: ['Defesa', 'Acrobacia', 'Cavalgar', 'Furtividade', 'Iniciativa', 'Ladinagem', 'Pilotagem', 'Pontaria', 'Reflexos'],
  },
  {
    key: 'con',
    name: 'Constituição',
    shortName: 'CON',
    description: 'Sua saúde e vigor. A Constituição é aplicada aos pontos de vida iniciais e por nível e em testes de Fortitude. Se a Constituição muda, seus pontos de vida aumentam ou diminuem retroativamente.',
    appliedTo: ['Pontos de Vida Iniciais e por Nível', 'Fortitude', 'Fôlego', 'Resistência Física'],
  },
  {
    key: 'int',
    name: 'Inteligência',
    shortName: 'INT',
    description: 'Sua capacidade de raciocínio, memória e educação. A Inteligência é aplicada em testes de Conhecimento, Guerra, Investigação, Misticismo, Nobreza e Ofício. Além disso, se for positiva, você recebe perícias treinadas adicionais iguais ao valor dela.',
    appliedTo: ['Conhecimento', 'Guerra', 'Investigação', 'Misticismo', 'Nobreza', 'Ofício', 'Perícias Treinadas Extras'],
  },
  {
    key: 'sab',
    name: 'Sabedoria',
    shortName: 'SAB',
    description: 'Sua observação, ponderação e determinação. A Sabedoria é aplicada em testes de Cura, Intuição, Percepção, Religião, Sobrevivência e Vontade.',
    appliedTo: ['Cura', 'Intuição', 'Percepção', 'Religião', 'Sobrevivência', 'Vontade', 'Percepção Passiva'],
  },
  {
    key: 'car',
    name: 'Carisma',
    shortName: 'CAR',
    description: 'Sua força de personalidade e capacidade de persuasão, além de uma mistura de simpatia e beleza. O Carisma é aplicado em testes de Adestramento, Atuação, Diplomacia, Enganação, Intimidação e Jogatina.',
    appliedTo: ['Adestramento', 'Atuação', 'Diplomacia', 'Enganação', 'Intimidação', 'Jogatina', 'Habilidades de Classe'],
  },
];

// Custos para o método Compra de Pontos (Tabela 1-1: Atributos, p. 23)
// No Tormenta 20 JDA:
// - Atributo começa em 0 com 10 pontos disponíveis.
// - Reduzir para -1 concede +1 ponto (custo -1).
// - 1 custa 1 ponto.
// - 2 custa 2 pontos.
// - 3 custa 4 pontos.
// - 4 custa 7 pontos.
export const POINT_BUY_COSTS: Record<number, number> = {
  [-1]: -1,
  0: 0,
  1: 1,
  2: 2,
  3: 4,
  4: 7,
};

export const STANDARD_ARRAY = [3, 2, 1, 1, 0, -1];
