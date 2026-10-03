import { ClassDefinition } from '../types/rules';

/**
 * Classes — T20 JdA v1.3, Capítulo 1, págs. 36–84.
 * PV, PM, perícias, proficiências, habilidades de 1º nível e progressão gerados a partir do livro
 * por .agents/tools/gen_classes.py. Todos os personagens sabem usar armas simples e armaduras leves (pág. 32).
 */
export const CLASSES_LIST: ClassDefinition[] = [
  {
    "id": "arcanista",
    "name": "Arcanista",
    "description": "Um conjurador mestre das artes arcanas, capaz de dobrar as leis da realidade através de estudo meticuloso, foco mágico ou linhagem sobrenatural.",
    "role": "Conjurador e Danificador de Área",
    "primaryAttributes": [
      "int",
      "car"
    ],
    "hpInitial": 8,
    "hpPerLevel": 2,
    "mpInitial": 6,
    "mpPerLevel": 6,
    "proficiencies": {
      "weapons": [
        "simples"
      ],
      "armor": [
        "leves"
      ],
      "shields": false
    },
    "mandatorySkills": [
      "misticismo",
      "vontade"
    ],
    "skillChoicesCount": 2,
    "skillOptions": [
      "conhecimento",
      "diplomacia",
      "enganacao",
      "guerra",
      "iniciativa",
      "intimidacao",
      "intuicao",
      "investigacao",
      "nobreza",
      "oficio",
      "percepcao"
    ],
    "abilitiesLevel1": [
      {
        "id": "arcanista_caminho_do_arcanista",
        "name": "Caminho do arcanista",
        "level": 1,
        "description": "A magia é um poder incrível, capaz de alterar a realidade. Esse poder tem fontes distintas e cada uma opera conforme suas próprias regras. Escolha uma das opções a seguir. Uma vez feita, essa escolha não pode ser mudada. • Bruxo. Você lança magias através de um foco — uma varinha, cajado, chapéu... Para lançar uma magia, você precisa empunhar o foco com uma mão (e gesticular com a outra) ou fazer um teste de Misticismo (CD 20 + o custo em PM da magia; se falhar, a magia não funciona, mas você gasta os PM mesmo assim). O foco tem RD 10 e PV iguais à metade dos seus, independentemente de seu material ou forma. Se for danificado, é totalmente restaurado na próxima vez que você recuperar seus PM por descanso. Se for destruído (reduzido a 0 PV), você fica atordoado por uma rodada. Você pode recuperar um foco destruído ou perdido com uma semana de trabalho e T$ 100. Seu atributo-chave para magias é Inteligência. • Feiticeiro. Você lança magias através de um poder inato que corre em seu sangue. Escolha uma linhagem como origem de seus poderes (veja a página 39). Você recebe a herança básica da linhagem escolhida. Você não depende de nenhum item ou estudo, mas sua capacidade de aprender magias é limitada — você aprende uma magia nova a cada nível ímpar (3º, 5º, 7º etc.), em vez de a cada nível. Seu atributo-chave para magias é Carisma. • Mago. Você lança magias através de estudo e memorização de fórmulas arcanas. Você só pode lançar magias memorizadas; suas outras magias não podem ser lançadas, mesmo que você tenha pontos de mana para tal. Para memorizar magias, você precisa estudar seu grimório por uma hora. Quando faz isso, escolhe metade das magias que conhece (por exemplo, se conhece 7 magias, escolhe 3). Essas serão suas magias memorizadas. Você pode memorizar magias uma vez por dia. Caso não possa estudar (por não ter tempo, por ter perdido o grimório...), não poderá trocar suas magias memorizadas. Um grimório tem as mesmas estatísticas de um foco (veja acima) e pode ser recuperado da mesma forma. Você começa com uma magia adicional (para um total de 4) e, sempre que ganha acesso a um novo círculo de magias, aprende uma magia adicional daquele círculo. Seu atributo-chave para magias é Inteligência.",
        "type": "passiva"
      },
      {
        "id": "arcanista_magias",
        "name": "Magias",
        "level": 1,
        "description": "Você pode lançar magias arcanas de 1º círculo. A cada quatro níveis, pode lançar magias de um círculo maior (2º círculo no 5º nível, 3º círculo no 9º nível e assim por diante). Você começa com três magias de 1º círculo. A cada nível, aprende uma magia de qualquer círculo que possa lançar. Seu atributo-chave para lançar magias é definido pelo seu Caminho (veja acima) e você soma seu atributo-chave no seu total de PM. Veja o Capítulo 4 para as regras de magia.",
        "type": "passiva"
      }
    ],
    "spellcaster": {
      "type": "arcana",
      "circle1Count": 3,
      "keyAttribute": "choice"
    },
    "subclasses": {
      "title": "Caminho Arcano",
      "options": [
        {
          "id": "bruxo",
          "name": "Bruxo",
          "description": "Você canaliza suas magias através de um objeto especial: seu foco arcano (como uma varinha, anel, cajado ou crânio). Seu atributo-chave é Inteligência.",
          "keyAttribute": "int"
        },
        {
          "id": "feiticeiro",
          "name": "Feiticeiro",
          "description": "A magia corre em suas veias de forma inata devido a ancestrais dragões, fadas ou criaturas da Tormenta. Seu atributo-chave é Carisma.",
          "keyAttribute": "car"
        },
        {
          "id": "mago",
          "name": "Mago",
          "description": "Você aprendeu magia através de estudo árduo e anota seus feitiços em um grimório detalhado. Você prepara suas magias e seu atributo-chave é Inteligência.",
          "keyAttribute": "int"
        }
      ]
    },
    "progression": [
      {
        "level": 1,
        "features": "Caminho do arcanista, magias (1º círculo)"
      },
      {
        "level": 2,
        "features": "Poder de arcanista"
      },
      {
        "level": 3,
        "features": "Poder de arcanista"
      },
      {
        "level": 4,
        "features": "Poder de arcanista"
      },
      {
        "level": 5,
        "features": "Magias (2º círculo), poder de arcanista"
      },
      {
        "level": 6,
        "features": "Poder de arcanista"
      },
      {
        "level": 7,
        "features": "Poder de arcanista"
      },
      {
        "level": 8,
        "features": "Poder de arcanista"
      },
      {
        "level": 9,
        "features": "Magias (3º círculo), poder de arcanista"
      },
      {
        "level": 10,
        "features": "Poder de arcanista"
      },
      {
        "level": 11,
        "features": "Poder de arcanista"
      },
      {
        "level": 12,
        "features": "Poder de arcanista"
      },
      {
        "level": 13,
        "features": "Magias (4º círculo), poder de arcanista"
      },
      {
        "level": 14,
        "features": "Poder de arcanista"
      },
      {
        "level": 15,
        "features": "Poder de arcanista"
      },
      {
        "level": 16,
        "features": "Poder de arcanista"
      },
      {
        "level": 17,
        "features": "Magias (5º círculo), poder de arcanista"
      },
      {
        "level": 18,
        "features": "Poder de arcanista"
      },
      {
        "level": 19,
        "features": "Poder de arcanista"
      },
      {
        "level": 20,
        "features": "Alta arcana, poder de arcanista • Arcano de Batalha. Quando lança uma magia"
      }
    ],
    "page": 37
  },
  {
    "id": "barbaro",
    "name": "Bárbaro",
    "description": "Um combatente primitivo e feroz que canaliza sua fúria interior e instintos selvagens para aniquilar inimigos no campo de batalha.",
    "role": "Combatente Corpo a Corpo e Tanque",
    "primaryAttributes": [
      "for",
      "con"
    ],
    "hpInitial": 24,
    "hpPerLevel": 6,
    "mpInitial": 3,
    "mpPerLevel": 3,
    "proficiencies": {
      "weapons": [
        "simples",
        "marciais"
      ],
      "armor": [
        "leves"
      ],
      "shields": true
    },
    "mandatorySkills": [
      "fortitude",
      "luta"
    ],
    "skillChoicesCount": 4,
    "skillOptions": [
      "adestramento",
      "atletismo",
      "cavalgar",
      "iniciativa",
      "intimidacao",
      "oficio",
      "percepcao",
      "pontaria",
      "sobrevivencia",
      "vontade"
    ],
    "abilitiesLevel1": [
      {
        "id": "barbaro_furia",
        "name": "Fúria",
        "level": 1,
        "description": "Você pode gastar 2 PM para invocar uma fúria selvagem. Você recebe +2 em testes de ataque e rolagens de dano corpo a corpo, mas não pode fazer nenhuma ação que exija calma e concentração (como usar a perícia Furtividade ou lançar magias). A cada cinco níveis, pode gastar +1 PM para aumentar os bônus em +1. A Fúria termina se, ao fim da rodada, você não tiver atacado nem sido alvo de um efeito (ataque, habilidade, magia...) hostil.",
        "type": "ativa",
        "cost": "2 PM"
      }
    ],
    "progression": [
      {
        "level": 1,
        "features": "Fúria +2"
      },
      {
        "level": 2,
        "features": "Poder de bárbaro"
      },
      {
        "level": 3,
        "features": "Instinto selvagem +1, poder de bárbaro"
      },
      {
        "level": 4,
        "features": "Poder de bárbaro"
      },
      {
        "level": 5,
        "features": "Poder de bárbaro, redução de dano 2"
      },
      {
        "level": 6,
        "features": "Fúria +3, poder de bárbaro"
      },
      {
        "level": 7,
        "features": "Poder de bárbaro"
      },
      {
        "level": 8,
        "features": "Poder de bárbaro, redução de dano 4"
      },
      {
        "level": 9,
        "features": "Instinto selvagem +2, poder de bárbaro"
      },
      {
        "level": 10,
        "features": "Poder de bárbaro"
      },
      {
        "level": 11,
        "features": "Fúria +4, poder de bárbaro, redução de dano 6"
      },
      {
        "level": 12,
        "features": "Poder de bárbaro"
      },
      {
        "level": 13,
        "features": "Poder de bárbaro"
      },
      {
        "level": 14,
        "features": "Poder de bárbaro, redução de dano 8"
      },
      {
        "level": 15,
        "features": "Instinto selvagem +3, poder de bárbaro"
      },
      {
        "level": 16,
        "features": "Fúria +5, poder de bárbaro"
      },
      {
        "level": 17,
        "features": "Poder de bárbaro, redução de dano 10"
      },
      {
        "level": 18,
        "features": "Poder de bárbaro"
      },
      {
        "level": 19,
        "features": "Poder de bárbaro"
      },
      {
        "level": 20,
        "features": "Fúria titânica, poder de bárbaro • Alma de Bronze. Quando entra em fúria"
      }
    ],
    "page": 41
  },
  {
    "id": "bardo",
    "name": "Bardo",
    "description": "Artista errante, contador de histórias e faz-tudo versátil, sempre com a canção certa, o truque perfeito ou a magia oportuna para salvar o grupo.",
    "role": "Suporte, Conjurador e Perito Social",
    "primaryAttributes": [
      "car",
      "des"
    ],
    "hpInitial": 12,
    "hpPerLevel": 3,
    "mpInitial": 4,
    "mpPerLevel": 4,
    "proficiencies": {
      "weapons": [
        "simples",
        "marciais"
      ],
      "armor": [
        "leves"
      ],
      "shields": false
    },
    "mandatorySkills": [
      "atuacao",
      "reflexos"
    ],
    "skillChoicesCount": 6,
    "skillOptions": [
      "acrobacia",
      "cavalgar",
      "conhecimento",
      "diplomacia",
      "enganacao",
      "furtividade",
      "iniciativa",
      "intuicao",
      "investigacao",
      "jogatina",
      "ladinagem",
      "luta",
      "misticismo",
      "nobreza",
      "percepcao",
      "pontaria",
      "vontade"
    ],
    "abilitiesLevel1": [
      {
        "id": "bardo_inspiracao",
        "name": "Inspiração",
        "level": 1,
        "description": "Você pode gastar uma ação padrão e 2 PM para inspirar as pessoas com sua arte. Você e todos os seus aliados em alcance curto ganham +1 em testes de perícia até o fim da cena. A cada quatro níveis, pode gastar +2 PM para aumentar o bônus em +1.",
        "type": "ativa",
        "cost": "2 PM"
      },
      {
        "id": "bardo_magias",
        "name": "Magias",
        "level": 1,
        "description": "Escolha três escolas de magia. Uma vez feita, essa escolha não pode ser mudada. Você pode lançar magias arcanas de 1º círculo que pertençam a essas escolas. À medida que sobe de nível, pode lançar magias de círculos maiores (2º círculo no 6º nível, 3º círculo no 10º nível e 4º círculo no 14º nível). Você começa com duas magias de 1º círculo. A cada nível par (2º, 4º etc.), aprende uma magia de qualquer círculo e escola que possa lançar. Você pode lançar essas magias vestindo armaduras leves sem precisar de testes de Misticismo. Seu atributo-chave para lançar magias é Carisma e você soma seu Carisma no seu total de PM. Veja o Capítulo 4 para as regras de magia.",
        "type": "passiva"
      }
    ],
    "spellcaster": {
      "type": "arcana",
      "circle1Count": 2,
      "keyAttribute": "car",
      "schoolsCount": 3
    },
    "progression": [
      {
        "level": 1,
        "features": "Inspiração +1, magias (1º círculo)"
      },
      {
        "level": 2,
        "features": "Poder de bardo, eclético"
      },
      {
        "level": 3,
        "features": "Poder de bardo"
      },
      {
        "level": 4,
        "features": "Poder de bardo"
      },
      {
        "level": 5,
        "features": "Inspiração +2, poder de bardo"
      },
      {
        "level": 6,
        "features": "Magias (2º círculo), poder de bardo"
      },
      {
        "level": 7,
        "features": "Poder de bardo"
      },
      {
        "level": 8,
        "features": "Poder de bardo"
      },
      {
        "level": 9,
        "features": "Inspiração +3, poder de bardo"
      },
      {
        "level": 10,
        "features": "Magias (3º círculo), poder de bardo"
      },
      {
        "level": 11,
        "features": "Poder de bardo"
      },
      {
        "level": 12,
        "features": "Poder de bardo"
      },
      {
        "level": 13,
        "features": "Inspiração +4, poder de bardo"
      },
      {
        "level": 14,
        "features": "Magias (4º círculo), poder de bardo"
      },
      {
        "level": 15,
        "features": "Poder de bardo"
      },
      {
        "level": 16,
        "features": "Poder de bardo"
      },
      {
        "level": 17,
        "features": "Inspiração +5, poder de bardo"
      },
      {
        "level": 18,
        "features": "Poder de bardo"
      },
      {
        "level": 19,
        "features": "Poder de bardo"
      },
      {
        "level": 20,
        "features": "Artista completo, poder de bardo • Melodia Restauradora. Quando você usa Música: Melodia Curativa"
      }
    ],
    "page": 44
  },
  {
    "id": "bucaneiro",
    "name": "Bucaneiro",
    "description": "Navegador audacioso, duelista galante e espadachim ousado, sempre em busca de tesouros lendários, fama e um bom duelo acrobático.",
    "role": "Combatente Ágil e Perito",
    "primaryAttributes": [
      "des",
      "car"
    ],
    "hpInitial": 16,
    "hpPerLevel": 4,
    "mpInitial": 3,
    "mpPerLevel": 3,
    "proficiencies": {
      "weapons": [
        "simples",
        "marciais"
      ],
      "armor": [
        "leves"
      ],
      "shields": false
    },
    "mandatorySkills": [
      "reflexos"
    ],
    "skillChoicesCount": 4,
    "skillOptions": [
      "acrobacia",
      "atletismo",
      "atuacao",
      "enganacao",
      "fortitude",
      "furtividade",
      "iniciativa",
      "intimidacao",
      "jogatina",
      "luta",
      "oficio",
      "percepcao",
      "pilotagem",
      "pontaria"
    ],
    "abilitiesLevel1": [
      {
        "id": "bucaneiro_audacia",
        "name": "Audácia",
        "level": 1,
        "description": "Quando faz um teste de perícia, você pode gastar 2 PM para somar seu Carisma no teste. Você não pode usar esta habilidade em testes de ataque.",
        "type": "ativa",
        "cost": "2 PM"
      },
      {
        "id": "bucaneiro_insolencia",
        "name": "Insolência",
        "level": 1,
        "description": "Você soma seu Carisma na Defesa, limitado pelo seu nível. Esta habilidade exige liberdade de movimentos; você não pode usá-la se estiver de armadura pesada ou na condição imóvel.",
        "type": "passiva"
      }
    ],
    "progression": [
      {
        "level": 1,
        "features": "Audácia, insolência"
      },
      {
        "level": 2,
        "features": "Evasão, poder de bucaneiro"
      },
      {
        "level": 3,
        "features": "Esquiva sagaz +1, poder de bucaneiro"
      },
      {
        "level": 4,
        "features": "Poder de bucaneiro"
      },
      {
        "level": 5,
        "features": "Panache, poder de bucaneiro"
      },
      {
        "level": 6,
        "features": "Poder de bucaneiro"
      },
      {
        "level": 7,
        "features": "Esquiva sagaz +2, poder de bucaneiro"
      },
      {
        "level": 8,
        "features": "Poder de bucaneiro"
      },
      {
        "level": 9,
        "features": "Poder de bucaneiro"
      },
      {
        "level": 10,
        "features": "Evasão aprimorada, poder de bucaneiro"
      },
      {
        "level": 11,
        "features": "Esquiva sagaz +3, poder de bucaneiro"
      },
      {
        "level": 12,
        "features": "Poder de bucaneiro"
      },
      {
        "level": 13,
        "features": "Poder de bucaneiro"
      },
      {
        "level": 14,
        "features": "Poder de bucaneiro"
      },
      {
        "level": 15,
        "features": "Esquiva sagaz +4, poder de bucaneiro"
      },
      {
        "level": 16,
        "features": "Poder de bucaneiro"
      },
      {
        "level": 17,
        "features": "Poder de bucaneiro"
      },
      {
        "level": 18,
        "features": "Poder de bucaneiro"
      },
      {
        "level": 19,
        "features": "Esquiva sagaz +5, poder de bucaneiro"
      },
      {
        "level": 20,
        "features": "Poder de bucaneiro, sorte de Nimb Bravatas"
      }
    ],
    "page": 47,
    "skillAlternative": [
      "luta",
      "pontaria"
    ]
  },
  {
    "id": "cacador",
    "name": "Caçador",
    "description": "Rastreador implacável dos ermos e exterminador impiedoso de feras e monstros, perito em emboscadas letais na natureza.",
    "role": "Atacante de Precisão e Batedor",
    "primaryAttributes": [
      "des",
      "sab",
      "for"
    ],
    "hpInitial": 16,
    "hpPerLevel": 4,
    "mpInitial": 4,
    "mpPerLevel": 4,
    "proficiencies": {
      "weapons": [
        "simples",
        "marciais"
      ],
      "armor": [
        "leves"
      ],
      "shields": true
    },
    "mandatorySkills": [
      "sobrevivencia"
    ],
    "skillChoicesCount": 6,
    "skillOptions": [
      "adestramento",
      "atletismo",
      "cavalgar",
      "cura",
      "fortitude",
      "furtividade",
      "iniciativa",
      "investigacao",
      "luta",
      "oficio",
      "percepcao",
      "pontaria",
      "reflexos"
    ],
    "abilitiesLevel1": [
      {
        "id": "cacador_marca_da_presa",
        "name": "Marca da presa",
        "level": 1,
        "description": "Você pode gastar uma ação de movimento e 1 PM para analisar uma criatura em alcance curto. Até o fim da cena, você recebe +1d4 nas rolagens de dano contra essa criatura. A cada quatro níveis, você pode gastar +1 PM para aumentar o bônus de dano (veja a tabela da classe).",
        "type": "ativa",
        "cost": "1 PM"
      },
      {
        "id": "cacador_rastreador",
        "name": "Rastreador",
        "level": 1,
        "description": "Você recebe +2 em Sobrevivência. Além disso, pode se mover com seu deslocamento normal enquanto rastreia sem sofrer penalidades no teste de Sobrevivência.",
        "type": "passiva"
      }
    ],
    "progression": [
      {
        "level": 1,
        "features": "Marca da presa +1d4, rastreador"
      },
      {
        "level": 2,
        "features": "Poder de caçador"
      },
      {
        "level": 3,
        "features": "Explorador, poder de caçador"
      },
      {
        "level": 4,
        "features": "Poder de caçador"
      },
      {
        "level": 5,
        "features": "Caminho do explorador, marca da presa +1d8, poder de caçador"
      },
      {
        "level": 6,
        "features": "Poder de caçador"
      },
      {
        "level": 7,
        "features": "Explorador, poder de caçador"
      },
      {
        "level": 8,
        "features": "Poder de caçador"
      },
      {
        "level": 9,
        "features": "Marca da presa +1d12, poder de caçador"
      },
      {
        "level": 10,
        "features": "Poder de caçador"
      },
      {
        "level": 11,
        "features": "Explorador, poder de caçador"
      },
      {
        "level": 12,
        "features": "Poder de caçador"
      },
      {
        "level": 13,
        "features": "Marca da presa +2d8, poder de caçador"
      },
      {
        "level": 14,
        "features": "Poder de caçador"
      },
      {
        "level": 15,
        "features": "Explorador, poder de caçador"
      },
      {
        "level": 16,
        "features": "Poder de caçador"
      },
      {
        "level": 17,
        "features": "Marca da presa +2d10, poder de caçador"
      },
      {
        "level": 18,
        "features": "Poder de caçador"
      },
      {
        "level": 19,
        "features": "Explorador, poder de caçador"
      },
      {
        "level": 20,
        "features": "Mestre caçador, poder de caçador • Ponto Fraco. Quando usa a habilidade"
      }
    ],
    "page": 50,
    "skillAlternative": [
      "luta",
      "pontaria"
    ]
  },
  {
    "id": "cavaleiro",
    "name": "Cavaleiro",
    "description": "Nobre guerreiro de armadura pesada e valores imutáveis de cavalaria, treinado para absorver os golpes mais devastadores e proteger seus aliados.",
    "role": "Tanque Supremo e Protetor",
    "primaryAttributes": [
      "for",
      "con",
      "car"
    ],
    "hpInitial": 20,
    "hpPerLevel": 5,
    "mpInitial": 3,
    "mpPerLevel": 3,
    "proficiencies": {
      "weapons": [
        "simples",
        "marciais"
      ],
      "armor": [
        "leves",
        "pesadas"
      ],
      "shields": true
    },
    "mandatorySkills": [
      "fortitude",
      "luta"
    ],
    "skillChoicesCount": 2,
    "skillOptions": [
      "adestramento",
      "atletismo",
      "cavalgar",
      "diplomacia",
      "guerra",
      "iniciativa",
      "intimidacao",
      "nobreza",
      "percepcao",
      "vontade"
    ],
    "abilitiesLevel1": [
      {
        "id": "cavaleiro_baluarte",
        "name": "Baluarte",
        "level": 1,
        "description": "Quando sofre um ataque ou faz um teste de resistência, você pode gastar 1 PM para receber +2 na Defesa e nos testes de resistência até o início do seu próximo turno. A cada quatro níveis, pode gastar +1 PM para aumentar o bônus em +2. A partir do 7º nível, quando usa esta habilidade, você pode gastar 2 PM adicionais para fornecer o mesmo bônus a todos os aliados adjacentes. Por exemplo, pode gastar 4 PM ao todo para receber +4 na Defesa e nos testes de resistência e fornecer este mesmo bônus aos outros. A partir do 15º nível, você pode gastar 5 PM adicionais para fornecer o mesmo bônus a todos os aliados em alcance curto.",
        "type": "ativa",
        "cost": "1 PM"
      },
      {
        "id": "cavaleiro_codigo_de_honra",
        "name": "Código de honra",
        "level": 1,
        "description": "Cavaleiros distinguem-se de meros combatentes por seguir um código de conduta. Fazem isto para mostrar que estão acima dos mercenários e bandoleiros que infestam os campos de batalha. Você não pode atacar um oponente pelas costas (em termos de jogo, não pode se beneficiar do bônus de flanquear), caído, desprevenido ou incapaz de lutar. Se violar o código, você perde todos os seus PM e só pode recuperá-los a partir do próximo dia. Rebaixar-se ao nível dos covardes e desesperados abala a autoconfiança que eleva o cavaleiro.",
        "type": "passiva"
      }
    ],
    "progression": [
      {
        "level": 1,
        "features": "Baluarte +2, código de honra"
      },
      {
        "level": 2,
        "features": "Duelo +2, poder de cavaleiro"
      },
      {
        "level": 3,
        "features": "Poder de cavaleiro"
      },
      {
        "level": 4,
        "features": "Poder de cavaleiro"
      },
      {
        "level": 5,
        "features": "Caminho do cavaleiro, baluarte +4, poder de cavaleiro"
      },
      {
        "level": 6,
        "features": "Poder de cavaleiro"
      },
      {
        "level": 7,
        "features": "Baluarte (aliados adjacentes), duelo +3 poder de cavaleiro"
      },
      {
        "level": 8,
        "features": "Poder de cavaleiro"
      },
      {
        "level": 9,
        "features": "Baluarte +6, poder de cavaleiro"
      },
      {
        "level": 10,
        "features": "Poder de cavaleiro"
      },
      {
        "level": 11,
        "features": "Poder de cavaleiro, resoluto"
      },
      {
        "level": 12,
        "features": "Duelo +4, poder de cavaleiro"
      },
      {
        "level": 13,
        "features": "Baluarte +8, poder de cavaleiro"
      },
      {
        "level": 14,
        "features": "Poder de cavaleiro"
      },
      {
        "level": 15,
        "features": "Baluarte (aliados em alcance curto), poder de cavaleiro"
      },
      {
        "level": 16,
        "features": "Poder de cavaleiro"
      },
      {
        "level": 17,
        "features": "Baluarte +10, duelo +5, poder de cavaleiro"
      },
      {
        "level": 18,
        "features": "Poder de cavaleiro"
      },
      {
        "level": 19,
        "features": "Poder de cavaleiro"
      },
      {
        "level": 20,
        "features": "Bravura final, poder de cavaleiro • Aumento de Atributo. Você recebe +1 em um atributo. Você pode escolher este poder várias vezes"
      }
    ],
    "page": 53
  },
  {
    "id": "clerigo",
    "name": "Clérigo",
    "description": "Voz ungida e braço armado dos deuses em Arton, investido de milagres divinos para curar feridos, abençoar aliados e expurgar heresias.",
    "role": "Curandeiro, Suporte e Conjurador Divino",
    "primaryAttributes": [
      "sab",
      "con",
      "for"
    ],
    "hpInitial": 16,
    "hpPerLevel": 4,
    "mpInitial": 5,
    "mpPerLevel": 5,
    "proficiencies": {
      "weapons": [
        "simples"
      ],
      "armor": [
        "leves",
        "pesadas"
      ],
      "shields": true
    },
    "mandatorySkills": [
      "religiao",
      "vontade"
    ],
    "skillChoicesCount": 2,
    "skillOptions": [
      "conhecimento",
      "cura",
      "diplomacia",
      "fortitude",
      "iniciativa",
      "intuicao",
      "luta",
      "misticismo",
      "nobreza",
      "oficio",
      "percepcao"
    ],
    "abilitiesLevel1": [
      {
        "id": "clerigo_devoto_fiel",
        "name": "Devoto fiel",
        "level": 1,
        "description": "Você se torna devoto de um deus maior. Veja as regras de devotos na página 96. Ao contrário de devotos normais, você recebe dois poderes concedidos por se tornar devoto, em vez de apenas um. Como alternativa, você pode cultuar o Panteão como um todo. Não recebe nenhum Poder Concedido, mas sua única obrigação e restrição é não usar armas cortantes ou perfurantes (porque derramam sangue, algo que clérigos do Panteão consideram proibido). Sua arma preferida é a maça e você pode canalizar energia positiva ou negativa a sua escolha (uma vez feita, essa escolha não pode ser mudada). Cultuar o Panteão conta como sua devoção.",
        "type": "passiva"
      },
      {
        "id": "clerigo_magias",
        "name": "Magias",
        "level": 1,
        "description": "Você pode lançar magias divinas de 1º círculo. A cada quatro níveis, pode lançar magias de um círculo maior (2º círculo no 5º nível, 3º círculo no 9º nível e assim por diante). Você começa com três magias de 1º círculo. A cada nível, aprende uma magia de qualquer círculo que possa lançar. Seu atributo-chave para lançar magias é Sabedoria e você soma sua Sabedoria no seu total de PM. Veja o Capítulo 4 para as regras de magia.",
        "type": "passiva"
      }
    ],
    "spellcaster": {
      "type": "divina",
      "circle1Count": 3,
      "keyAttribute": "sab"
    },
    "progression": [
      {
        "level": 1,
        "features": "Devoto fiel, magias (1º círculo)"
      },
      {
        "level": 2,
        "features": "Poder de clérigo"
      },
      {
        "level": 3,
        "features": "Poder de clérigo"
      },
      {
        "level": 4,
        "features": "Poder de clérigo"
      },
      {
        "level": 5,
        "features": "Magias (2º círculo), poder de clérigo"
      },
      {
        "level": 6,
        "features": "Poder de clérigo"
      },
      {
        "level": 7,
        "features": "Poder de clérigo"
      },
      {
        "level": 8,
        "features": "Poder de clérigo"
      },
      {
        "level": 9,
        "features": "Magias (3º círculo), poder de clérigo"
      },
      {
        "level": 10,
        "features": "Poder de clérigo"
      },
      {
        "level": 11,
        "features": "Poder de clérigo"
      },
      {
        "level": 12,
        "features": "Poder de clérigo"
      },
      {
        "level": 13,
        "features": "Magias (4º círculo), poder de clérigo"
      },
      {
        "level": 14,
        "features": "Poder de clérigo"
      },
      {
        "level": 15,
        "features": "Poder de clérigo"
      },
      {
        "level": 16,
        "features": "Poder de clérigo"
      },
      {
        "level": 17,
        "features": "Magias (5º círculo), poder de clérigo"
      },
      {
        "level": 18,
        "features": "Poder de clérigo"
      },
      {
        "level": 19,
        "features": "Poder de clérigo"
      },
      {
        "level": 20,
        "features": "Mão da divindade, poder de clérigo (Vontade CD Sab reduz o dano à metade). Trevas tem o efeito inverso — causa dano de trevas a criaturas vivas e cura mortos-vivos. e • Canalizar Amplo. Quando vo"
      }
    ],
    "page": 57
  },
  {
    "id": "druida",
    "name": "Druida",
    "description": "Guardião sagrado das florestas, montanhas e rios artonianos, capaz de conjurar os elementos primordiais e se transformar em feras ferozes.",
    "role": "Metamorfo, Suporte e Controle",
    "primaryAttributes": [
      "sab",
      "con"
    ],
    "hpInitial": 16,
    "hpPerLevel": 4,
    "mpInitial": 4,
    "mpPerLevel": 4,
    "proficiencies": {
      "weapons": [
        "simples"
      ],
      "armor": [
        "leves"
      ],
      "shields": true
    },
    "mandatorySkills": [
      "sobrevivencia",
      "vontade"
    ],
    "skillChoicesCount": 4,
    "skillOptions": [
      "adestramento",
      "atletismo",
      "cavalgar",
      "conhecimento",
      "cura",
      "fortitude",
      "iniciativa",
      "intuicao",
      "luta",
      "misticismo",
      "oficio",
      "percepcao",
      "religiao"
    ],
    "abilitiesLevel1": [
      {
        "id": "druida_devoto_fiel",
        "name": "Devoto fiel",
        "level": 1,
        "description": "Você se torna devoto de um deus disponível para druidas (Allihanna, Megalokk ou Oceano). Veja as regras de devotos na página 96. Ao contrário de devotos normais, você recebe dois poderes concedidos por se tornar devoto, em vez de apenas um.",
        "type": "passiva"
      },
      {
        "id": "druida_empatia_selvagem",
        "name": "Empatia selvagem",
        "level": 1,
        "description": "Você pode se comunicar com animais por meio de linguagem corporal e vocalizações. Você pode usar Adestramento com animais para mudar atitude e persuasão (veja a página 118).",
        "type": "passiva"
      },
      {
        "id": "druida_magias",
        "name": "Magias",
        "level": 1,
        "description": "Escolha três escolas de magia. Uma vez feita, essa escolha não pode ser mudada. Você pode lançar magias divinas de 1º círculo que pertençam a essas escolas. À medida que sobe de nível, pode lançar magias de círculos maiores (2º círculo no 6º nível, 3º círculo no 10º nível e 4º círculo no 14º nível). Você começa com duas magias de 1º círculo. A cada nível par (2º, 4º etc.), aprende uma magia de qualquer círculo e escola que possa lançar. Seu atributo-chave para lançar magias é Sabedoria e você soma sua Sabedoria no seu total de PM. Veja o Capítulo 4 para as regras de magia.",
        "type": "passiva"
      }
    ],
    "spellcaster": {
      "type": "divina",
      "circle1Count": 2,
      "keyAttribute": "sab"
    },
    "progression": [
      {
        "level": 1,
        "features": "Devoto fiel, empatia selvagem, magias (1º círculo)"
      },
      {
        "level": 2,
        "features": "Caminho dos ermos, poder de druida"
      },
      {
        "level": 3,
        "features": "Poder de druida"
      },
      {
        "level": 4,
        "features": "Poder de druida"
      },
      {
        "level": 5,
        "features": "Poder de druida"
      },
      {
        "level": 6,
        "features": "Magias (2º círculo), poder de druida"
      },
      {
        "level": 7,
        "features": "Poder de druida"
      },
      {
        "level": 8,
        "features": "Poder de druida"
      },
      {
        "level": 9,
        "features": "Poder de druida"
      },
      {
        "level": 10,
        "features": "Magias (3º círculo), poder de druida"
      },
      {
        "level": 11,
        "features": "Poder de druida"
      },
      {
        "level": 12,
        "features": "Poder de druida"
      },
      {
        "level": 13,
        "features": "Poder de druida"
      },
      {
        "level": 14,
        "features": "Magias (4º círculo), poder de druida"
      },
      {
        "level": 15,
        "features": "Poder de druida"
      },
      {
        "level": 16,
        "features": "Poder de druida"
      },
      {
        "level": 17,
        "features": "Poder de druida"
      },
      {
        "level": 18,
        "features": "Poder de druida"
      },
      {
        "level": 19,
        "features": "Poder de druida"
      },
      {
        "level": 20,
        "features": "Força da natureza, poder de druida ao limite de parceiros que pode ter (veja a página 260). Pré-requisitos: Car 1"
      }
    ],
    "page": 61
  },
  {
    "id": "guerreiro",
    "name": "Guerreiro",
    "description": "O mestre incontestável das armas e táticas de combate marcial, adaptável e devastador em qualquer distância de combate.",
    "role": "Combatente Principal e Danificador",
    "primaryAttributes": [
      "for",
      "des",
      "con"
    ],
    "hpInitial": 20,
    "hpPerLevel": 5,
    "mpInitial": 3,
    "mpPerLevel": 3,
    "proficiencies": {
      "weapons": [
        "simples",
        "marciais"
      ],
      "armor": [
        "leves",
        "pesadas"
      ],
      "shields": true
    },
    "mandatorySkills": [
      "fortitude"
    ],
    "skillChoicesCount": 2,
    "skillOptions": [
      "adestramento",
      "atletismo",
      "cavalgar",
      "guerra",
      "iniciativa",
      "intimidacao",
      "luta",
      "oficio",
      "percepcao",
      "pontaria",
      "reflexos"
    ],
    "abilitiesLevel1": [
      {
        "id": "guerreiro_ataque_especial",
        "name": "Ataque especial",
        "level": 1,
        "description": "Quando faz um ataque, você pode gastar 1 PM para receber +4 no teste de ataque ou na rolagem de dano. A cada quatro níveis, pode gastar +1 PM para aumentar o bônus em +4. Você pode dividir os bônus igualmente. Por exemplo, no 17º nível, pode gastar 5 PM para receber +20 no ataque, +20 no dano ou +10 no ataque e +10 no dano.",
        "type": "ativa",
        "cost": "1 PM"
      }
    ],
    "progression": [
      {
        "level": 1,
        "features": "Ataque especial +4"
      },
      {
        "level": 2,
        "features": "Poder de guerreiro"
      },
      {
        "level": 3,
        "features": "Durão, poder de guerreiro"
      },
      {
        "level": 4,
        "features": "Poder de guerreiro"
      },
      {
        "level": 5,
        "features": "Ataque especial +8, poder de guerreiro"
      },
      {
        "level": 6,
        "features": "Ataque extra, poder de guerreiro"
      },
      {
        "level": 7,
        "features": "Poder de guerreiro"
      },
      {
        "level": 8,
        "features": "Poder de guerreiro"
      },
      {
        "level": 9,
        "features": "Ataque especial +12, poder de guerreiro"
      },
      {
        "level": 10,
        "features": "Poder de guerreiro"
      },
      {
        "level": 11,
        "features": "Poder de guerreiro"
      },
      {
        "level": 12,
        "features": "Poder de guerreiro"
      },
      {
        "level": 13,
        "features": "Ataque especial +16, poder de guerreiro"
      },
      {
        "level": 14,
        "features": "Poder de guerreiro"
      },
      {
        "level": 15,
        "features": "Poder de guerreiro"
      },
      {
        "level": 16,
        "features": "Poder de guerreiro"
      },
      {
        "level": 17,
        "features": "Ataque especial +20, poder de guerreiro"
      },
      {
        "level": 18,
        "features": "Poder de guerreiro"
      },
      {
        "level": 19,
        "features": "Poder de guerreiro"
      },
      {
        "level": 20,
        "features": "Campeão, poder de guerreiro Golpe"
      }
    ],
    "page": 65,
    "skillAlternative": [
      "luta",
      "pontaria"
    ]
  },
  {
    "id": "inventor",
    "name": "Inventor",
    "description": "Engenheiro visionário, alquimista brilhante e forjador audaz capaz de criar geringonças extraordinárias e poções milagrosas.",
    "role": "Especialista, Suporte Tecnológico e Artesão",
    "primaryAttributes": [
      "int",
      "des"
    ],
    "hpInitial": 12,
    "hpPerLevel": 3,
    "mpInitial": 4,
    "mpPerLevel": 4,
    "proficiencies": {
      "weapons": [
        "simples"
      ],
      "armor": [
        "leves"
      ],
      "shields": false
    },
    "mandatorySkills": [
      "oficio",
      "vontade"
    ],
    "skillChoicesCount": 4,
    "skillOptions": [
      "conhecimento",
      "cura",
      "diplomacia",
      "fortitude",
      "iniciativa",
      "investigacao",
      "luta",
      "misticismo",
      "oficio",
      "pilotagem",
      "percepcao",
      "pontaria"
    ],
    "abilitiesLevel1": [
      {
        "id": "inventor_engenhosidade",
        "name": "Engenhosidade",
        "level": 1,
        "description": "Quando faz um teste de perícia, você pode gastar 2 PM para somar a sua Inteligência no teste. Você não pode usar esta habilidade em testes de ataque.",
        "type": "ativa",
        "cost": "2 PM"
      },
      {
        "id": "inventor_prototipo",
        "name": "Protótipo",
        "level": 1,
        "description": "Você começa o jogo com um item superior, ou com 10 itens alquímicos, com preço total de até T$ 500. Veja o Capítulo 3: Equipamento para a lista de itens.",
        "type": "passiva"
      }
    ],
    "progression": [
      {
        "level": 1,
        "features": "Engenhosidade, protótipo"
      },
      {
        "level": 2,
        "features": "Fabricar item superior (1 melhoria), poder de inventor"
      },
      {
        "level": 3,
        "features": "Comerciante, poder de inventor"
      },
      {
        "level": 4,
        "features": "Poder de inventor"
      },
      {
        "level": 5,
        "features": "Fabricar item superior (2 melhorias), poder de inventor"
      },
      {
        "level": 6,
        "features": "Poder de inventor"
      },
      {
        "level": 7,
        "features": "Encontrar fraqueza, poder de inventor"
      },
      {
        "level": 8,
        "features": "Fabricar item superior (3 melhorias), poder de inventor"
      },
      {
        "level": 9,
        "features": "Fabricar item mágico (menor), poder de inventor"
      },
      {
        "level": 10,
        "features": "Olho do dragão, poder de inventor"
      },
      {
        "level": 11,
        "features": "Fabricar item superior (4 melhorias), poder de inventor"
      },
      {
        "level": 12,
        "features": "Poder de inventor"
      },
      {
        "level": 13,
        "features": "Fabricar item mágico (médio), poder de inventor"
      },
      {
        "level": 14,
        "features": "Poder de inventor"
      },
      {
        "level": 15,
        "features": "Poder de inventor"
      },
      {
        "level": 16,
        "features": "Poder de inventor"
      },
      {
        "level": 17,
        "features": "Fabricar item mágico (maior), poder de inventor"
      },
      {
        "level": 18,
        "features": "Poder de inventor"
      },
      {
        "level": 19,
        "features": "Poder de inventor"
      },
      {
        "level": 20,
        "features": "Obra-prima, poder de inventor • Autômato. Você fabrica um autômato"
      }
    ],
    "page": 68
  },
  {
    "id": "ladino",
    "name": "Ladino",
    "description": "Especialista em truques, infiltrações, desativação de armadilhas e ataques de oportunidade cirúrgicos pelas sombras.",
    "role": "Especialista em Perícias e Atacante Furtivo",
    "primaryAttributes": [
      "des",
      "int"
    ],
    "hpInitial": 12,
    "hpPerLevel": 3,
    "mpInitial": 4,
    "mpPerLevel": 4,
    "proficiencies": {
      "weapons": [
        "simples"
      ],
      "armor": [
        "leves"
      ],
      "shields": false
    },
    "mandatorySkills": [
      "ladinagem",
      "reflexos"
    ],
    "skillChoicesCount": 8,
    "skillOptions": [
      "acrobacia",
      "atletismo",
      "atuacao",
      "cavalgar",
      "conhecimento",
      "diplomacia",
      "enganacao",
      "furtividade",
      "iniciativa",
      "intimidacao",
      "intuicao",
      "investigacao",
      "jogatina",
      "luta",
      "oficio",
      "percepcao",
      "pilotagem",
      "pontaria"
    ],
    "abilitiesLevel1": [
      {
        "id": "ladino_ataque_furtivo",
        "name": "Ataque furtivo",
        "level": 1,
        "description": "Você sabe atingir os pontos vitais de inimigos distraídos. Uma vez por rodada, quando atinge uma criatura desprevenida com um ataque corpo a corpo ou em alcance curto, ou uma criatura que esteja flanqueando, você causa 1d6 pontos de dano extra. A cada dois níveis, esse dano extra aumenta em +1d6. Uma criatura imune a acertos críticos também é imune a ataques furtivos.",
        "type": "passiva"
      },
      {
        "id": "ladino_especialista",
        "name": "Especialista",
        "level": 1,
        "description": "Escolha um número de perícias treinadas igual a sua Inteligência, exceto bônus temporários (mínimo 1). Ao fazer um teste de uma dessas perícias, você pode gastar 1 PM para dobrar seu bônus de treinamento. Você não pode usar esta habilidade em testes de ataque.",
        "type": "ativa",
        "cost": "1 PM"
      }
    ],
    "progression": [
      {
        "level": 1,
        "features": "Ataque furtivo +1d6, especialista"
      },
      {
        "level": 2,
        "features": "Evasão, poder de ladino"
      },
      {
        "level": 3,
        "features": "Ataque furtivo +2d6, poder de ladino"
      },
      {
        "level": 4,
        "features": "Esquiva sobrenatural, poder de ladino"
      },
      {
        "level": 5,
        "features": "Ataque furtivo +3d6, poder de ladino"
      },
      {
        "level": 6,
        "features": "Poder de ladino"
      },
      {
        "level": 7,
        "features": "Ataque furtivo +4d6, poder de ladino"
      },
      {
        "level": 8,
        "features": "Olhos nas costas, poder de ladino"
      },
      {
        "level": 9,
        "features": "Ataque furtivo +5d6, poder de ladino"
      },
      {
        "level": 10,
        "features": "Evasão aprimorada, poder de ladino"
      },
      {
        "level": 11,
        "features": "Ataque furtivo +6d6, poder de ladino"
      },
      {
        "level": 12,
        "features": "Poder de ladino"
      },
      {
        "level": 13,
        "features": "Ataque furtivo +7d6, poder de ladino"
      },
      {
        "level": 14,
        "features": "Poder de ladino"
      },
      {
        "level": 15,
        "features": "Ataque furtivo +8d6, poder de ladino"
      },
      {
        "level": 16,
        "features": "Poder de ladino"
      },
      {
        "level": 17,
        "features": "Ataque furtivo +9d6, poder de ladino"
      },
      {
        "level": 18,
        "features": "Poder de ladino"
      },
      {
        "level": 19,
        "features": "Ataque furtivo +10d6, poder de ladino"
      },
      {
        "level": 20,
        "features": "A pessoa certa para o trabalho, poder de ladino penalidades em movimento por terreno difícil. Você perde esses benefícios se fizer uma ação que não seja diretamente relacionada a fugir. Por exemp"
      }
    ],
    "page": 73
  },
  {
    "id": "lutador",
    "name": "Lutador",
    "description": "Mestre da briga de rua, das artes marciais corpo a corpo e de golpes desarmados avassaladores capazes de derrubar gigantes.",
    "role": "Combatente Desarmado e Manobrista",
    "primaryAttributes": [
      "for",
      "con"
    ],
    "hpInitial": 20,
    "hpPerLevel": 5,
    "mpInitial": 3,
    "mpPerLevel": 3,
    "proficiencies": {
      "weapons": [
        "simples"
      ],
      "armor": [
        "leves"
      ],
      "shields": false
    },
    "mandatorySkills": [
      "fortitude",
      "luta"
    ],
    "skillChoicesCount": 4,
    "skillOptions": [
      "acrobacia",
      "adestramento",
      "atletismo",
      "enganacao",
      "furtividade",
      "iniciativa",
      "intimidacao",
      "oficio",
      "percepcao",
      "pontaria",
      "reflexos"
    ],
    "abilitiesLevel1": [
      {
        "id": "lutador_briga",
        "name": "Briga",
        "level": 1,
        "description": "Seus ataques desarmados causam 1d6 pontos de dano e podem causar dano letal ou não letal (sem penalidades). A cada quatro níveis, seu dano desarmado aumenta, conforme a tabela. O dano na tabela é para criaturas Pequenas e Médias. Criaturas Minúsculas diminuem esse dano em um passo, Grandes e Enormes aumentam em um passo e Colossais aumentam em dois passos.",
        "type": "passiva"
      },
      {
        "id": "lutador_golpe_relampago",
        "name": "Golpe relâmpago",
        "level": 1,
        "description": "Quando usa a ação agredir para fazer um ataque desarmado, você pode gastar 1 PM para realizar um ataque desarmado adicional.",
        "type": "ativa",
        "cost": "1 PM"
      }
    ],
    "progression": [
      {
        "level": 1,
        "features": "Briga (1d6), golpe relâmpago"
      },
      {
        "level": 2,
        "features": "Poder de lutador"
      },
      {
        "level": 3,
        "features": "Casca grossa (Con), poder de lutador"
      },
      {
        "level": 4,
        "features": "Poder de lutador"
      },
      {
        "level": 5,
        "features": "Briga (1d8), golpe cruel, poder de lutador"
      },
      {
        "level": 6,
        "features": "Poder de lutador"
      },
      {
        "level": 7,
        "features": "Casca grossa (Con+1), poder de lutador"
      },
      {
        "level": 8,
        "features": "Poder de lutador"
      },
      {
        "level": 9,
        "features": "Briga (1d10), golpe violento, poder de lutador"
      },
      {
        "level": 10,
        "features": "Poder de lutador"
      },
      {
        "level": 11,
        "features": "Casca grossa (Con+2), poder de lutador"
      },
      {
        "level": 12,
        "features": "Poder de lutador"
      },
      {
        "level": 13,
        "features": "Briga (2d6), poder de lutador"
      },
      {
        "level": 14,
        "features": "Poder de lutador"
      },
      {
        "level": 15,
        "features": "Casca grossa (Con+3), poder de lutador"
      },
      {
        "level": 16,
        "features": "Poder de lutador"
      },
      {
        "level": 17,
        "features": "Briga (2d8), poder de lutador"
      },
      {
        "level": 18,
        "features": "Poder de lutador"
      },
      {
        "level": 19,
        "features": "Casca grossa (Con+4), poder de lutador"
      },
      {
        "level": 20,
        "features": "Dono da rua (2d10), poder de lutador ataques igual ao número dito"
      }
    ],
    "page": 76
  },
  {
    "id": "nobre",
    "name": "Nobre",
    "description": "Comandante nato da alta corte de Arton, cujas principais armas são o prestígio, a oratória imponente e a presença de espírito.",
    "role": "Líder de Grupo, Suporte Social e Defensor",
    "primaryAttributes": [
      "car",
      "int",
      "sab"
    ],
    "hpInitial": 16,
    "hpPerLevel": 4,
    "mpInitial": 4,
    "mpPerLevel": 4,
    "proficiencies": {
      "weapons": [
        "simples",
        "marciais"
      ],
      "armor": [
        "leves",
        "pesadas"
      ],
      "shields": true
    },
    "mandatorySkills": [
      "vontade"
    ],
    "skillChoicesCount": 4,
    "skillOptions": [
      "adestramento",
      "atuacao",
      "cavalgar",
      "conhecimento",
      "diplomacia",
      "enganacao",
      "fortitude",
      "guerra",
      "iniciativa",
      "intimidacao",
      "intuicao",
      "investigacao",
      "jogatina",
      "luta",
      "nobreza",
      "oficio",
      "percepcao",
      "pontaria"
    ],
    "abilitiesLevel1": [
      {
        "id": "nobre_autoconfianca",
        "name": "Autoconfiança",
        "level": 1,
        "description": "Você pode usar seu Carisma em vez de Destreza na Defesa (mas continua não podendo somar um atributo na Defesa quando usa armadura pesada).",
        "type": "passiva"
      },
      {
        "id": "nobre_espolio",
        "name": "Espólio",
        "level": 1,
        "description": "Você recebe um item a sua escolha com preço de até T$ 2.000.",
        "type": "passiva"
      },
      {
        "id": "nobre_orgulho",
        "name": "Orgulho",
        "level": 1,
        "description": "Quando faz um teste de perícia, você pode gastar uma quantidade de PM a sua escolha (limitado pelo seu Carisma). Para cada PM que gastar, recebe +2 no teste.",
        "type": "passiva"
      }
    ],
    "progression": [
      {
        "level": 1,
        "features": "Autoconfiança, espólio, orgulho"
      },
      {
        "level": 2,
        "features": "Palavras afiadas (2d6), poder de nobre"
      },
      {
        "level": 3,
        "features": "Poder de nobre, riqueza"
      },
      {
        "level": 4,
        "features": "Gritar ordens, poder de nobre"
      },
      {
        "level": 5,
        "features": "Poder de nobre, presença aristocrática"
      },
      {
        "level": 6,
        "features": "Palavras afiadas (4d6), poder de nobre"
      },
      {
        "level": 7,
        "features": "Poder de nobre"
      },
      {
        "level": 8,
        "features": "Poder de nobre"
      },
      {
        "level": 9,
        "features": "Poder de nobre"
      },
      {
        "level": 10,
        "features": "Palavras afiadas (6d6), poder de nobre"
      },
      {
        "level": 11,
        "features": "Poder de nobre"
      },
      {
        "level": 12,
        "features": "Poder de nobre"
      },
      {
        "level": 13,
        "features": "Poder de nobre"
      },
      {
        "level": 14,
        "features": "Palavras afiadas (8d6), poder de nobre"
      },
      {
        "level": 15,
        "features": "Poder de nobre"
      },
      {
        "level": 16,
        "features": "Poder de nobre"
      },
      {
        "level": 17,
        "features": "Poder de nobre"
      },
      {
        "level": 18,
        "features": "Palavras afiadas (10d6), poder de nobre"
      },
      {
        "level": 19,
        "features": "Poder de nobre"
      },
      {
        "level": 20,
        "features": "Realeza, poder de nobre • Grito Tirânico. Você pode usar Palavras"
      }
    ],
    "page": 79,
    "skillAlternative": [
      "diplomacia",
      "intimidacao"
    ]
  },
  {
    "id": "paladino",
    "name": "Paladino",
    "description": "Campeão sagrado da justiça, honra e bondade, que empunha a bênção dos deuses para punir o mal e proteger os inocentes.",
    "role": "Tanque Sagrado e Danificador Divino",
    "primaryAttributes": [
      "for",
      "car",
      "con"
    ],
    "hpInitial": 20,
    "hpPerLevel": 5,
    "mpInitial": 3,
    "mpPerLevel": 3,
    "proficiencies": {
      "weapons": [
        "simples",
        "marciais"
      ],
      "armor": [
        "leves",
        "pesadas"
      ],
      "shields": true
    },
    "mandatorySkills": [
      "luta",
      "vontade"
    ],
    "skillChoicesCount": 2,
    "skillOptions": [
      "adestramento",
      "atletismo",
      "cavalgar",
      "cura",
      "diplomacia",
      "fortitude",
      "guerra",
      "iniciativa",
      "intuicao",
      "nobreza",
      "percepcao",
      "religiao"
    ],
    "abilitiesLevel1": [
      {
        "id": "paladino_abencoado",
        "name": "Abençoado",
        "level": 1,
        "description": "Você soma seu Carisma no seu total de pontos de mana no 1º nível. Além disso, torna-se devoto de um deus disponível para paladinos (Azgher, Khalmyr, Lena, Lin-Wu, Marah, Tanna-Toh, Thyatis, Valkaria). Veja as regras de devotos na página 96. Ao contrário de devotos normais, você recebe dois poderes concedidos por se tornar devoto, em vez de apenas um. Como alternativa, você pode ser um paladino do bem, lutando em prol da bondade e da justiça como um todo. Não recebe nenhum Poder Concedido, mas não precisa seguir nenhuma Obrigação & Restrição (além do Código do Herói, abaixo). Cultuar o bem conta como sua devoção.",
        "type": "passiva"
      },
      {
        "id": "paladino_codigo_do_heroi",
        "name": "Código do herói",
        "level": 1,
        "description": "Você deve sempre manter sua palavra e nunca pode recusar um pedido de ajuda de alguém inocente. Além disso, nunca pode mentir, trapacear ou roubar. Se violar o código, você perde todos os seus PM e só pode recuperá-los a partir do próximo dia.",
        "type": "passiva"
      },
      {
        "id": "paladino_golpe_divino",
        "name": "Golpe divino",
        "level": 1,
        "description": "Quando faz um ataque corpo a corpo, você pode gastar 2 PM para desferir um golpe destruidor. Você soma seu Carisma no teste de ataque e +1d8 na rolagem de dano. A cada quatro níveis, pode gastar +1 PM para aumentar o dano em +1d8.",
        "type": "ativa",
        "cost": "2 PM"
      }
    ],
    "progression": [
      {
        "level": 1,
        "features": "Abençoado, código do herói, golpe divino (+1d8)"
      },
      {
        "level": 2,
        "features": "Cura pelas mãos (1d8+1 PV), poder de paladino"
      },
      {
        "level": 3,
        "features": "Aura sagrada, poder de paladino"
      },
      {
        "level": 4,
        "features": "Poder de paladino"
      },
      {
        "level": 5,
        "features": "Bênção da justiça, golpe divino (+2d8), poder de paladino"
      },
      {
        "level": 6,
        "features": "Cura pelas mãos (2d8+2 PV), poder de paladino"
      },
      {
        "level": 7,
        "features": "Poder de paladino"
      },
      {
        "level": 8,
        "features": "Poder de paladino"
      },
      {
        "level": 9,
        "features": "Golpe divino (+3d8), poder de paladino"
      },
      {
        "level": 10,
        "features": "Cura pelas mãos (3d8+3 PV), poder de paladino"
      },
      {
        "level": 11,
        "features": "Poder de paladino"
      },
      {
        "level": 12,
        "features": "Poder de paladino"
      },
      {
        "level": 13,
        "features": "Golpe divino (+4d8), poder de paladino"
      },
      {
        "level": 14,
        "features": "Cura pelas mãos (4d8+4 PV), poder de paladino"
      },
      {
        "level": 15,
        "features": "Poder de paladino"
      },
      {
        "level": 16,
        "features": "Poder de paladino"
      },
      {
        "level": 17,
        "features": "Golpe divino (+5d8), poder de paladino"
      },
      {
        "level": 18,
        "features": "Cura pelas mãos (5d8+5 PV), poder de paladino"
      },
      {
        "level": 19,
        "features": "Poder de paladino"
      },
      {
        "level": 20,
        "features": "Poder de paladino, vingador sagrado • Julgamento Divino: Salvação. Você pode gastar 2 PM para marcar um inimigo em alcance curto. Até o fim da cena"
      }
    ],
    "page": 82
  }
];
