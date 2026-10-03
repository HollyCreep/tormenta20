import { Condition } from '../types/rules';

/**
 * Condições — T20 JdA v1.3, Apêndice: Lista de Condições (págs. 394–395). Gerado por
 * .agents/tools/gen_conditions.py. "Condições com os mesmos efeitos não se acumulam; aplique apenas
 * os mais severos." Efeitos mecânicos em src/utils/conditionEffects.ts.
 */
export const CONDITIONS_LIST: Condition[] = [
  {
    "id": "abalado",
    "name": "Abalado",
    "description": "O personagem sofre –2 em testes de perícia. Se ficar abalado novamente, em vez disso fica apavorado.",
    "effects": [
      "O personagem sofre –2 em testes de perícia.",
      "Se ficar abalado novamente, em vez disso fica apavorado."
    ],
    "effectType": "Medo"
  },
  {
    "id": "agarrado",
    "name": "Agarrado",
    "description": "O personagem fica desprevenido e imóvel, sofre –2 em testes de ataque e só pode atacar com armas leves. Ataques à distância contra um alvo envolvido em uma manobra agarrar têm 50% de chance de acertar o alvo errado.",
    "effects": [
      "O personagem fica desprevenido e imóvel, sofre –2 em testes de ataque e só pode atacar com armas leves.",
      "Ataques à distância contra um alvo envolvido em uma manobra agarrar têm 50% de chance de acertar o alvo errado."
    ],
    "effectType": "Movimento"
  },
  {
    "id": "alquebrado",
    "name": "Alquebrado",
    "description": "O custo em pontos de mana das habilidades do personagem aumenta em +1.",
    "effects": [
      "O custo em pontos de mana das habilidades do personagem aumenta em +1."
    ],
    "effectType": "Mental"
  },
  {
    "id": "apavorado",
    "name": "Apavorado",
    "description": "O personagem sofre –5 em testes de perícia e não pode se aproximar voluntariamente da fonte do medo.",
    "effects": [
      "O personagem sofre –5 em testes de perícia e não pode se aproximar voluntariamente da fonte do medo."
    ],
    "effectType": "Medo"
  },
  {
    "id": "atordoado",
    "name": "Atordoado",
    "description": "O personagem fica desprevenido e não pode fazer ações.",
    "effects": [
      "O personagem fica desprevenido e não pode fazer ações."
    ],
    "effectType": "Mental"
  },
  {
    "id": "caido",
    "name": "Caído",
    "description": "O personagem sofre –5 na Defesa contra ataques corpo a corpo e recebe +5 na Defesa contra ataques à distância (cumulativos com outras condições). Além disso, sofre –5 em ataques corpo a corpo e seu deslocamento é reduzido a 1,5m.",
    "effects": [
      "O personagem sofre –5 na Defesa contra ataques corpo a corpo e recebe +5 na Defesa contra ataques à distância (cumulativos com outras condições).",
      "Além disso, sofre –5 em ataques corpo a corpo e seu deslocamento é reduzido a 1,5m."
    ]
  },
  {
    "id": "cego",
    "name": "Cego",
    "description": "O personagem fica desprevenido e lento, não pode fazer testes de Percepção para observar e sofre –5 em testes de perícias baseadas em Força ou Destreza. Todos os alvos de seus ataques recebem camuflagem total. Você é considerado cego enquanto estiver em uma área de escuridão total, a menos que algo lhe permita perceber no escuro.",
    "effects": [
      "O personagem fica desprevenido e lento, não pode fazer testes de Percepção para observar e sofre –5 em testes de perícias baseadas em Força ou Destreza.",
      "Todos os alvos de seus ataques recebem camuflagem total.",
      "Você é considerado cego enquanto estiver em uma área de escuridão total, a menos que algo lhe permita perceber no escuro."
    ],
    "effectType": "Sentidos"
  },
  {
    "id": "confuso",
    "name": "Confuso",
    "description": "O personagem comporta-se de modo aleatório. Role 1d6 no início de seus turnos: 1) Movimenta-se em uma direção escolhida por uma rolagem de 1d8; 2-3) Não pode fazer ações, e fica balbuciando incoerentemente; 4-5) Usa a arma que estiver empunhando para atacar a criatura mais próxima, ou a si mesmo se estiver sozinho (nesse caso, apenas role o dano); 6) A condição termina e pode agir normalmente.",
    "effects": [
      "O personagem comporta-se de modo aleatório.",
      "Role 1d6 no início de seus turnos: 1) Movimenta-se em uma direção escolhida por uma rolagem de 1d8; 2-3) Não pode fazer ações, e fica balbuciando incoerentemente; 4-5) Usa a arma que estiver empunhando para atacar a criatura mais próxima, ou a si mesmo se estiver sozinho (nesse caso, apenas role o dano); 6) A condição termina e pode agir normalmente."
    ],
    "effectType": "Mental"
  },
  {
    "id": "debilitado",
    "name": "Debilitado",
    "description": "O personagem sofre –5 em testes de Força, Destreza e Constituição e de perícias baseadas nesses atributos. Se o personagem ficar debilitado novamente, em vez disso fica inconsciente.",
    "effects": [
      "O personagem sofre –5 em testes de Força, Destreza e Constituição e de perícias baseadas nesses atributos.",
      "Se o personagem ficar debilitado novamente, em vez disso fica inconsciente."
    ]
  },
  {
    "id": "desprevenido",
    "name": "Desprevenido",
    "description": "O personagem sofre –5 na Defesa e em Reflexos. Você fica desprevenido contra inimigos que não possa perceber.",
    "effects": [
      "O personagem sofre –5 na Defesa e em Reflexos.",
      "Você fica desprevenido contra inimigos que não possa perceber."
    ]
  },
  {
    "id": "doente",
    "name": "Doente",
    "description": "Sob efeito de uma doença.",
    "effects": [
      "Sob efeito de uma doença."
    ],
    "effectType": "Metabolismo"
  },
  {
    "id": "em_chamas",
    "name": "Em Chamas",
    "description": "O personagem está pegando fogo. No início de seus turnos, sofre 1d6 pontos de dano de fogo. O personagem pode gastar uma ação padrão para apagar o fogo com as mãos. Imersão em água também apaga as chamas.",
    "effects": [
      "O personagem está pegando fogo.",
      "No início de seus turnos, sofre 1d6 pontos de dano de fogo.",
      "O personagem pode gastar uma ação padrão para apagar o fogo com as mãos.",
      "Imersão em água também apaga as chamas."
    ]
  },
  {
    "id": "enfeiticado",
    "name": "Enfeitiçado",
    "description": "O personagem se torna prestativo em relação à fonte da condição. Ele não fica sob controle da fonte, mas percebe suas palavras e ações da maneira mais favorável possível. A fonte da condição recebe +10 em testes de Diplomacia com o personagem.",
    "effects": [
      "O personagem se torna prestativo em relação à fonte da condição.",
      "Ele não fica sob controle da fonte, mas percebe suas palavras e ações da maneira mais favorável possível.",
      "A fonte da condição recebe +10 em testes de Diplomacia com o personagem."
    ],
    "effectType": "Mental"
  },
  {
    "id": "enjoado",
    "name": "Enjoado",
    "description": "O personagem só pode realizar uma ação padrão ou de movimento (não ambas) por rodada. Ele pode gastar uma ação padrão para fazer uma investida, mas pode avançar no máximo seu deslocamento (e não o dobro).",
    "effects": [
      "O personagem só pode realizar uma ação padrão ou de movimento (não ambas) por rodada.",
      "Ele pode gastar uma ação padrão para fazer uma investida, mas pode avançar no máximo seu deslocamento (e não o dobro)."
    ],
    "effectType": "Metabolismo"
  },
  {
    "id": "enredado",
    "name": "Enredado",
    "description": "O personagem fica lento, vulnerável e sofre –2 em testes de ataque.",
    "effects": [
      "O personagem fica lento, vulnerável e sofre –2 em testes de ataque."
    ],
    "effectType": "Movimento"
  },
  {
    "id": "envenenado",
    "name": "Envenenado",
    "description": "O efeito desta condição varia de acordo com o veneno. Pode ser perda de vida recorrente ou outra condição (como fraco ou enjoado). Perda de vida recorrente por venenos é cumulativa.",
    "effects": [
      "O efeito desta condição varia de acordo com o veneno.",
      "Pode ser perda de vida recorrente ou outra condição (como fraco ou enjoado).",
      "Perda de vida recorrente por venenos é cumulativa."
    ],
    "effectType": "Veneno"
  },
  {
    "id": "esmorecido",
    "name": "Esmorecido",
    "description": "O personagem sofre –5 em testes de Inteligência, Sabedoria e Carisma e de perícias baseadas nesses atributos.",
    "effects": [
      "O personagem sofre –5 em testes de Inteligência, Sabedoria e Carisma e de perícias baseadas nesses atributos."
    ],
    "effectType": "Mental"
  },
  {
    "id": "exausto",
    "name": "Exausto",
    "description": "O personagem fica debilitado, lento e vulnerável. Se ficar exausto novamente, em vez disso fica inconsciente.",
    "effects": [
      "O personagem fica debilitado, lento e vulnerável.",
      "Se ficar exausto novamente, em vez disso fica inconsciente."
    ],
    "effectType": "Cansaço"
  },
  {
    "id": "fascinado",
    "name": "Fascinado",
    "description": "Com a atenção presa em alguma coisa. O personagem sofre –5 em Percepção e não pode fazer ações, exceto observar aquilo que o fascinou. Esta condição é anulada por ações hostis contra o personagem ou se o que o fascinou não estiver mais visível. Balançar uma criatura fascinada para tirá-la desse estado gasta uma ação padrão.",
    "effects": [
      "Com a atenção presa em alguma coisa.",
      "O personagem sofre –5 em Percepção e não pode fazer ações, exceto observar aquilo que o fascinou.",
      "Esta condição é anulada por ações hostis contra o personagem ou se o que o fascinou não estiver mais visível.",
      "Balançar uma criatura fascinada para tirá-la desse estado gasta uma ação padrão."
    ],
    "effectType": "Mental"
  },
  {
    "id": "fatigado",
    "name": "Fatigado",
    "description": "O personagem fica fraco e vulnerável. Se ficar fatigado novamente, em vez disso fica exausto.",
    "effects": [
      "O personagem fica fraco e vulnerável.",
      "Se ficar fatigado novamente, em vez disso fica exausto."
    ],
    "effectType": "Cansaço"
  },
  {
    "id": "fraco",
    "name": "Fraco",
    "description": "O personagem sofre –2 em testes de Força, Destreza e Constituição e de perícias baseadas nesses atributos. Se ficar fraco novamente, em vez disso fica debilitado.",
    "effects": [
      "O personagem sofre –2 em testes de Força, Destreza e Constituição e de perícias baseadas nesses atributos.",
      "Se ficar fraco novamente, em vez disso fica debilitado."
    ]
  },
  {
    "id": "frustrado",
    "name": "Frustrado",
    "description": "O personagem sofre –2 em testes de Inteligência, Sabedoria e Carisma e de perícias baseadas nesses atributos. Se ficar frustrado novamente, em vez disso fica esmorecido.",
    "effects": [
      "O personagem sofre –2 em testes de Inteligência, Sabedoria e Carisma e de perícias baseadas nesses atributos.",
      "Se ficar frustrado novamente, em vez disso fica esmorecido."
    ],
    "effectType": "Mental"
  },
  {
    "id": "imovel",
    "name": "Imóvel",
    "description": "Todas as formas de deslocamento do personagem são reduzidas a 0m.",
    "effects": [
      "Todas as formas de deslocamento do personagem são reduzidas a 0m."
    ],
    "effectType": "Movimento"
  },
  {
    "id": "inconsciente",
    "name": "Inconsciente",
    "description": "O personagem fica indefeso e não pode fazer ações, incluindo reações (mas ainda pode fazer testes que sejam naturalmente feitos quando se está inconsciente, como testes de Constituição para estabilizar sangramento). Balançar uma criatura para acordá-la gasta uma ação padrão.",
    "effects": [
      "O personagem fica indefeso e não pode fazer ações, incluindo reações (mas ainda pode fazer testes que sejam naturalmente feitos quando se está inconsciente, como testes de Constituição para estabilizar sangramento).",
      "Balançar uma criatura para acordá-la gasta uma ação padrão."
    ]
  },
  {
    "id": "indefeso",
    "name": "Indefeso",
    "description": "O personagem fica desprevenido, mas sofre –10 na Defesa, falha automaticamente em testes de Reflexos e pode sofrer golpes de misericórdia.",
    "effects": [
      "O personagem fica desprevenido, mas sofre –10 na Defesa, falha automaticamente em testes de Reflexos e pode sofrer golpes de misericórdia."
    ]
  },
  {
    "id": "lento",
    "name": "Lento",
    "description": "Todas as formas de deslocamento do personagem são reduzidas à metade (arredonde para baixo para o primeiro incremento de 1,5m) e ele não pode correr ou fazer investidas.",
    "effects": [
      "Todas as formas de deslocamento do personagem são reduzidas à metade (arredonde para baixo para o primeiro incremento de 1,5m) e ele não pode correr ou fazer investidas."
    ],
    "effectType": "Movimento"
  },
  {
    "id": "ofuscado",
    "name": "Ofuscado",
    "description": "O personagem sofre –2 em testes de ataque e de Percepção.",
    "effects": [
      "O personagem sofre –2 em testes de ataque e de Percepção."
    ],
    "effectType": "Sentidos"
  },
  {
    "id": "paralisado",
    "name": "Paralisado",
    "description": "Fica imóvel e indefeso e só pode realizar ações puramente mentais.",
    "effects": [
      "Fica imóvel e indefeso e só pode realizar ações puramente mentais."
    ],
    "effectType": "Movimento"
  },
  {
    "id": "pasmo",
    "name": "Pasmo",
    "description": "Não pode fazer ações.",
    "effects": [
      "Não pode fazer ações."
    ],
    "effectType": "Mental"
  },
  {
    "id": "petrificado",
    "name": "Petrificado",
    "description": "O personagem fica inconsciente e recebe redução de dano 8.",
    "effects": [
      "O personagem fica inconsciente e recebe redução de dano 8."
    ],
    "effectType": "Metamorfose"
  },
  {
    "id": "sangrando",
    "name": "Sangrando",
    "description": "No início de seu turno, o personagem deve fazer um teste de Constituição (CD 15). Se falhar, perde 1d6 pontos de vida e continua sangrando. Se passar, remove essa condição.",
    "effects": [
      "No início de seu turno, o personagem deve fazer um teste de Constituição (CD 15).",
      "Se falhar, perde 1d6 pontos de vida e continua sangrando.",
      "Se passar, remove essa condição."
    ],
    "effectType": "Metabolismo"
  },
  {
    "id": "sobrecarregado",
    "name": "Sobrecarregado",
    "description": "O personagem sofre penalidade de armadura –5 e seu deslocamento é reduzido em –3m.",
    "effects": [
      "O personagem sofre penalidade de armadura –5 e seu deslocamento é reduzido em –3m."
    ],
    "effectType": "Movimento"
  },
  {
    "id": "surdo",
    "name": "Surdo",
    "description": "O personagem não pode fazer testes de Percepção para ouvir e sofre –5 em testes de Iniciativa. Além disso, é considerado em condição ruim para lançar magias.",
    "effects": [
      "O personagem não pode fazer testes de Percepção para ouvir e sofre –5 em testes de Iniciativa.",
      "Além disso, é considerado em condição ruim para lançar magias."
    ],
    "effectType": "Sentidos"
  },
  {
    "id": "surpreendido",
    "name": "Surpreendido",
    "description": "O personagem fica desprevenido e não pode fazer ações.",
    "effects": [
      "O personagem fica desprevenido e não pode fazer ações."
    ]
  },
  {
    "id": "vulneravel",
    "name": "Vulnerável",
    "description": "O personagem sofre –2 na Defesa.",
    "effects": [
      "O personagem sofre –2 na Defesa."
    ]
  }
];
