import { Origin } from '../types/rules';

/**
 * Origens — T20 JdA v1.3, Capítulo 1, págs. 85–95.
 * Gerado a partir do texto do livro por .agents/tools/gen_origins.py (não editar à mão).
 * Benefícios: escolha dois entre as perícias e poderes listados (pág. 85).
 */
export const ORIGINS_LIST: Origin[] = [
  {
    "id": "acolito",
    "name": "Acólito",
    "description": "Neste mundo agraciado com tantos deuses e igrejas, muitos ingressam cedo em alguma ordem religiosa — o que, dependendo de quem é seu deus padroeiro, pode ser motivo de admiração ou repulsa. Talvez você tenha ouvido o chamado da fé, seguiu a tradição espiritual de sua família, ou apenas foi abandonado quando pequeno às portas de um templo ou mosteiro. Tenha ou não se tornado um devoto, suas lembranças são carregadas de orações, evangelhos e outros ensinamentos.",
    "items": [
      "Símbolo sagrado",
      "Traje de sacerdote"
    ],
    "skills": [
      "cura",
      "religiao",
      "vontade"
    ],
    "powers": [
      {
        "name": "Medicina",
        "type": "destino",
        "description": "Você pode gastar uma ação completa para fazer um teste de Cura (CD 15) em uma criatura. Se você passar, ela recupera 1d6 PV, mais 1d6 para cada 5 pontos pelos quais o resultado do teste exceder a CD (2d6 com um resultado 20, 3d6 com um resultado 25 e assim por diante). Você só pode usar este poder uma vez por dia numa mesma criatura. Pré-requisitos: Sab 1, treinado em Cura."
      },
      {
        "name": "Membro da Igreja",
        "type": "origem",
        "description": "Você consegue hospedagem confortável e informação em qualquer templo de sua divindade, para você e seus aliados."
      },
      {
        "name": "Vontade de Ferro",
        "type": "destino",
        "description": "Você recebe +1 PM para cada dois níveis de personagem e +2 em Vontade. Pré-requisito: Sab 1. Poderes de Magia Todos os poderes deste grupo possuem como pré-requisito lançar magias."
      }
    ]
  },
  {
    "id": "amigo_dos_animais",
    "name": "Amigo dos Animais",
    "description": "Você pode ter sido cavalariço no estábulo de um castelo, criador de gado em uma fazenda, ginete de Namalkah ou mesmo tratador em um zoológico ou circo — em Arton, existem espetáculos circenses com animais em jaulas, que talvez você tenha desejado libertar. Ou então nada disso: desde criança você tem facilidade em lidar com animais, sempre conversou com eles, sentiu ser capaz de compreendê-los. Em certos lugares ou tribos, alguma montaria especial seria destinada a você.",
    "items": [
      "Cão de caça, cavalo, pônei ou trobo (escolha um)"
    ],
    "skills": [
      "adestramento",
      "cavalgar"
    ],
    "powers": [
      {
        "name": "Amigo Especial",
        "type": "origem",
        "description": "Você recebe +5 em testes de Adestramento com animais. Além disso, possui um animal de estimação que o auxilia e o acompanha em suas aventuras. Em termos de jogo, é um parceiro que fornece +2 em uma perícia a sua escolha (exceto Luta ou Pontaria e aprovada pelo mestre) e não conta em seu limite de parceiros."
      }
    ]
  },
  {
    "id": "amnesico",
    "name": "Amnésico",
    "description": "Você perdeu a maior parte da memória. Sabe apenas o próprio nome ou nem isso. Talvez tenha alguns itens pessoais, mas nenhuma ideia de como os conseguiu — podem ser relíquias de família, presentes de um ente querido ou apenas coisas que pegou de viajantes mortos lá atrás. Você não sabe como recebeu seu treinamento; apenas tem uma intuição sobre aquilo que consegue fazer. Seus atuais companheiros são a única família que conhece. Talvez viajando com eles você descubra algo sobre seu passado.",
    "items": [
      "Um ou mais itens (somando até T$ 500), aprovados pelo mestre"
    ],
    "skills": [],
    "powers": [
      {
        "name": "Lembranças Graduais",
        "type": "origem",
        "description": "Durante suas aventuras, em determinados momentos a critério do mestre, você pode fazer um teste de Sabedoria (CD 10) para reconhecer pessoas, criaturas ou lugares que tenha encontrado antes de perder a memória."
      }
    ],
    "benefitRule": "amnesico"
  },
  {
    "id": "aristocrata",
    "name": "Aristocrata",
    "description": "Você nasceu na nobreza. Recebeu educação sofisticada em assuntos acadêmicos, política mercantil, torneios de cavalaria ou mesmo conjuração arcana, dependendo das tradições em sua linhagem e desejos de seus pais. Você ainda procura cumprir seus compromissos como nobre? Luta para conciliar as expectativas da família com a vida de aventuras? Ou cortou totalmente seus laços com o passado, mantendo apenas alguns pertences valiosos e contatos úteis?",
    "items": [
      "Joia de família no valor de T$ 300",
      "Traje da corte"
    ],
    "skills": [
      "diplomacia",
      "enganacao",
      "nobreza"
    ],
    "powers": [
      {
        "name": "Comandar",
        "type": "destino",
        "description": "Você pode gastar uma ação de movimento e 1 PM para gritar ordens para seus aliados em alcance médio. Eles recebem +1 em testes de perícia até o fim da cena. Pré-requisito: Car 1."
      },
      {
        "name": "Sangue Azul",
        "type": "origem",
        "description": "Você tem alguma influência política, suficiente para ser tratado com mais leniência pela guarda, conseguir uma audiência com o nobre local etc."
      }
    ]
  },
  {
    "id": "artesao",
    "name": "Artesão",
    "description": "Do alfaiate habilidoso em costurar as vestes da nobreza ao armeiro que forja armas letais, você foi treinado por um parente, mestre ou guilda para fabricar itens importantes no mundo civilizado. Suas habilidades podem ter sido aprendidas para o trabalho, mas se mostraram úteis durante as aventuras.",
    "items": [
      "Instrumentos de ofício (qualquer)",
      "Um item que você possa fabricar de até T$ 50"
    ],
    "skills": [
      "oficio",
      "vontade"
    ],
    "powers": [
      {
        "name": "Frutos do Trabalho",
        "type": "origem",
        "description": "No início de cada aventura, você recebe até 5 itens gerais que possa fabricar num valor total de até T$ 50. Esse valor aumenta para T$ 100 no patamar veterano, T$ 300 no campeão e T$ 500 no lenda."
      },
      {
        "name": "Sortudo",
        "type": "destino",
        "description": "Quando faz um teste, você pode gastar 3 PM para rolá-lo novamente."
      }
    ]
  },
  {
    "id": "artista",
    "name": "Artista",
    "description": "Você possui talento, nasceu com um “dom” — pelo menos é o que outras pessoas gostam de pensar. Será verdade? Ou será que você apenas sentiu atração por certa forma de arte e treinou muito, muito mesmo? Enquanto o artesão fabrica itens “mundanos”, o artista produz entretenimento, alimento para o coração e a alma. Talvez você apenas saiba entoar belas canções, aprendidas na infância com pais amorosos, ou ouvindo fadas na floresta. Ou talvez seja um ator ou dançarino formado em alguma escola de artes prestigiada.",
    "items": [
      "Estojo de disfarces ou um instrumento musical a sua escolha"
    ],
    "skills": [
      "atuacao",
      "enganacao"
    ],
    "powers": [
      {
        "name": "Atraente",
        "type": "destino",
        "description": "Você recebe +2 em testes de perícias baseadas em Carisma contra criaturas que possam se sentir fisicamente atraídas por você. Pré-requisito: Car 1."
      },
      {
        "name": "Dom Artístico",
        "type": "origem",
        "description": "Você recebe +2 em testes de Atuação, e recebe o dobro de tibares em apresentações."
      },
      {
        "name": "Sortudo",
        "type": "destino",
        "description": "Quando faz um teste, você pode gastar 3 PM para rolá-lo novamente."
      },
      {
        "name": "Torcida",
        "type": "destino",
        "description": "Você recebe +2 em testes de perícia e Defesa quando tem a torcida a seu favor. Entenda-se por “torcida” qualquer número de criaturas inteligentes em alcance médio que não esteja realizando nenhuma ação além de torcer por você. Pré-requisito: Car 1."
      }
    ]
  },
  {
    "id": "assistente_laboratorio",
    "name": "Assistente de Laboratório",
    "description": "Você atuou como ajudante para um alquimista, inventor ou mago. Costumava tomar notas, limpar o laboratório, arrumar as ferramentas, vasculhar mercados em busca de ingredientes exóticos, recapturar a aberração antinatural que fugiu da jaula... enfim, não era o trabalho mais fácil, limpo ou seguro do mundo. Exposição prolongada a substâncias e experimentos perigosos talvez tenham prejudicado sua saúde (ou despertado suas habilidades de classe...).",
    "items": [
      "Instrumentos de ofício (alquimista)"
    ],
    "skills": [
      "oficio",
      "misticismo"
    ],
    "powers": [
      {
        "name": "Esse Cheiro...",
        "type": "origem",
        "description": "Você recebe +2 em Fortitude e detecta automaticamente a presença (mas não a localização ou natureza) de itens alquímicos em alcance curto."
      },
      {
        "name": "Venefício",
        "type": "destino",
        "description": "Quando usa um veneno, você não corre risco de se envenenar acidentalmente. Além disso, a CD para resistir aos seus venenos aumenta em +2. Pré-requisito: treinado em Ofício (alquimista)."
      },
      {
        "name": "Poder da Tormenta",
        "type": "tormenta",
        "description": "Um poder da Tormenta a sua escolha (Cap. 2)."
      }
    ]
  },
  {
    "id": "batedor",
    "name": "Batedor",
    "description": "Seja conduzindo caravanas através dos reinos, rastreando inimigos nos campos de batalha ou guiando exploradores nas vastidões selvagens, você aprendeu a achar caminhos e dirigir outros com segurança. Batedores podem surgir nas tribos mais primitivas, acompanhando grupos de caça, como profissionais sofisticados nas grandes cidades e forças militares ou ainda na perigosa atividade de caça-recompensas. Pouco importando a carreira que adotou mais tarde, como aventureiro, seu antigo treino acaba se revelando útil em numerosas ocasiões.",
    "items": [
      "Barraca",
      "Equipamento de viagem",
      "Uma arma simples ou marcial de ataque à distância"
    ],
    "skills": [
      "furtividade",
      "percepcao",
      "sobrevivencia"
    ],
    "powers": [
      {
        "name": "À Prova de Tudo",
        "type": "origem",
        "description": "Você não sofre penalidade em deslocamento e Sobrevivência por clima ruim e por terreno difícil natural."
      },
      {
        "name": "Estilo de Disparo",
        "type": "combate",
        "description": "Se estiver usando uma arma de disparo, você soma sua Destreza nas rolagens de dano. Pré-requisito: treinado em Pontaria."
      },
      {
        "name": "Sentidos Aguçados",
        "type": "destino",
        "description": "Você recebe +2 em Percepção, não fica desprevenido contra inimigos que não possa perceber e, sempre que erra um ataque devido a camuflagem, pode rolar mais uma vez o dado da chance de falha. Pré-requisitos: Sab 1, treinado em Percepção."
      }
    ]
  },
  {
    "id": "capanga",
    "name": "Capanga",
    "description": "Agilidade e esperteza são importantes no mundo do crime, mas não são tudo; às vezes é preciso esmurrar alguém. Por ser grande, forte ou mal-encarado, você acabou trabalhando como músculos para algum bandido, ou integrando um bando, quadrilha ou guilda de ladrões. Talvez você não fosse muito bom em bater carteiras nas ruas de Ahlen, mas sabia erguer alguém pelo tornozelo e sacudir até as moedas caírem. Hoje, como aventureiro, você provavelmente deixou essa época para trás — pelo menos até que alguém precise ser “convencido” a colaborar.",
    "items": [
      "Tatuagem ou outro adereço de sua gangue (+1 em Intimidação)",
      "Uma arma simples corpo a corpo"
    ],
    "skills": [
      "luta",
      "intimidacao"
    ],
    "powers": [
      {
        "name": "Confissão",
        "type": "origem",
        "description": "Você pode usar Intimidação para interrogar sem custo e em um minuto (veja Investigação)."
      },
      {
        "name": "Poder de Combate",
        "type": "combate",
        "description": "Um poder de combate a sua escolha (Cap. 2)."
      }
    ]
  },
  {
    "id": "charlatao",
    "name": "Charlatão",
    "description": "Você sempre teve talento para resolver problemas com conversa, sincera ou nem tanto. Talvez tenha aprendido andando com más companhias. Por ser pequeno e fraco em meio a guerreiros truculentos, talvez fosse pura questão de sobrevivência. Ou foi tocado por Hyninn, Sszzaas ou outra entidade traiçoeira. Seja como for, após um pouco de diálogo, você percebe o que as pessoas mais querem ou temem, usando palavras para vencer obstáculos tão facilmente quanto espadas e magias. Ou melhor.",
    "items": [
      "Estojo de disfarces",
      "Joia falsificada (valor aparente de T$ 100, sem valor real)"
    ],
    "skills": [
      "enganacao",
      "jogatina"
    ],
    "powers": [
      {
        "name": "Alpinista Social",
        "type": "origem",
        "description": "Você pode substituir testes de Diplomacia por testes de Enganação."
      },
      {
        "name": "Aparência Inofensiva",
        "type": "destino",
        "description": "A primeira criatura inteligente (Int –3 ou maior) que atacar você em uma cena deve fazer um teste de Vontade (CD Car). Se falhar, perderá sua ação. Este poder só funciona uma vez por cena; independentemente de a criatura falhar ou não no teste, poderá atacá-lo nas rodadas seguintes. Pré-requisito: Car 1."
      },
      {
        "name": "Sortudo",
        "type": "destino",
        "description": "Quando faz um teste, você pode gastar 3 PM para rolá-lo novamente."
      }
    ]
  },
  {
    "id": "circense",
    "name": "Circense",
    "description": "Você treinou acrobacia, malabarismo, mágica ou outra forma de arte circense. Talvez tenha aprendido sozinho, durante as brincadeiras de infância. Talvez tenha sido ensinado por um ente querido, tornando essa arte uma forte ligação com seu passado. Ou ainda, é possível que tenha sido forçado a aprender seus truques para sobreviver nas ruas. De qualquer forma, são aptidões que podem ser úteis em suas aventuras.",
    "items": [
      "Três bolas coloridas para malabarismo (+1 em Atuação)"
    ],
    "skills": [
      "acrobacia",
      "atuacao",
      "reflexos"
    ],
    "powers": [
      {
        "name": "Acrobático",
        "type": "destino",
        "description": "Você pode usar sua Destreza em vez de Força em testes de Atletismo. Além disso, terreno difícil não reduz seu deslocamento nem o impede de realizar investidas. Pré-requisito: Des 2."
      },
      {
        "name": "Torcida",
        "type": "destino",
        "description": "Você recebe +2 em testes de perícia e Defesa quando tem a torcida a seu favor. Entenda-se por “torcida” qualquer número de criaturas inteligentes em alcance médio que não esteja realizando nenhuma ação além de torcer por você. Pré-requisito: Car 1."
      },
      {
        "name": "Truque de Mágica",
        "type": "origem",
        "description": "Você pode lançar Explosão de Chamas, Hipnotismo e Queda Suave, mas apenas com o aprimoramento Truque. Esta não é uma habilidade mágica — os efeitos provêm de prestidigitação."
      }
    ]
  },
  {
    "id": "criminoso",
    "name": "Criminoso",
    "description": "Fazer o bem é bonito, mas não enche barriga — pelo menos, assim você foi ensinado. Por necessidade, ambição ou apenas sem conhecer outra vida, você foi um bandido durante boa parte da juventude. Furtava bolsas, trapaceava em jogos de taverna, emboscava viajantes nas estradas ou até aceitava contratos para matar. Agia sozinho, com seu próprio bando, pertencia a uma guilda de ladrões. Tornar-se aventureiro talvez seja uma forma de expiar por seus crimes, ou apenas o passo seguinte; em vez de mercadores, roubar tesouros de dragões!",
    "items": [
      "Estojo de disfarces ou gazua"
    ],
    "skills": [
      "enganacao",
      "furtividade",
      "ladinagem"
    ],
    "powers": [
      {
        "name": "Punguista",
        "type": "origem",
        "description": "Você pode fazer testes de Ladinagem para sustento (como a perícia Ofício), mas em apenas um dia. Se passar, recebe o dobro do dinheiro, mas, se falhar, pode ter problemas com a lei (a critério do mestre)."
      },
      {
        "name": "Venefício",
        "type": "destino",
        "description": "Quando usa um veneno, você não corre risco de se envenenar acidentalmente. Além disso, a CD para resistir aos seus venenos aumenta em +2. Pré-requisito: treinado em Ofício (alquimista)."
      }
    ]
  },
  {
    "id": "curandeiro",
    "name": "Curandeiro",
    "description": "Que bom seria se a cura milagrosa dos clérigos estivesse ao alcance de todos! Talvez você tenha sido ajudante do curandeiro da vila, testemunhando quando ele tratava doenças e lesões sem conjurar qualquer magia. Ou teve um estudo formal e sofisticado de medicina no Colégio Real de Médicos em Salistick. De qualquer modo, você é treinado em curar com remédios e tratamentos naturais — algo sempre útil, mesmo quando há um clérigo por perto.",
    "items": [
      "Bálsamo restaurador x2",
      "Maleta de medicamentos"
    ],
    "skills": [
      "cura",
      "vontade"
    ],
    "powers": [
      {
        "name": "Medicina",
        "type": "destino",
        "description": "Você pode gastar uma ação completa para fazer um teste de Cura (CD 15) em uma criatura. Se você passar, ela recupera 1d6 PV, mais 1d6 para cada 5 pontos pelos quais o resultado do teste exceder a CD (2d6 com um resultado 20, 3d6 com um resultado 25 e assim por diante). Você só pode usar este poder uma vez por dia numa mesma criatura. Pré-requisitos: Sab 1, treinado em Cura."
      },
      {
        "name": "Médico de Campo",
        "type": "origem",
        "description": "Você soma sua Sabedoria aos PV restaurados por suas habilidades e itens mundanos de cura."
      },
      {
        "name": "Venefício",
        "type": "destino",
        "description": "Quando usa um veneno, você não corre risco de se envenenar acidentalmente. Além disso, a CD para resistir aos seus venenos aumenta em +2. Pré-requisito: treinado em Ofício (alquimista)."
      }
    ]
  },
  {
    "id": "eremita",
    "name": "Eremita",
    "description": "Você passou parte da vida isolado, afastado da sociedade. Foi banido ainda criança, por nascer lefou ou com alguma deformidade da Tormenta. Ouviu um chamado dos deuses, buscando o isolamento para meditar sobre seu significado. Viveu enclausurado em um mosteiro, mantendo contato apenas com monges silenciosos. Ou foi praticante de artes arcanas proibidas, mantendo-se longe de olhares curiosos. A vida simples o tornou forte de corpo e espírito. Mas, em algum momento, você decidiu que bastava — ou teve sua tranquilidade interrompida.",
    "items": [
      "Barraca",
      "Equipamento de viagem"
    ],
    "skills": [
      "misticismo",
      "religiao",
      "sobrevivencia"
    ],
    "powers": [
      {
        "name": "Busca Interior",
        "type": "origem",
        "description": "Quando você e seus companheiros estão diante de um mistério, incapazes de prosseguir, você pode gastar 1 PM para meditar sozinho durante algum tempo e receber uma dica do mestre."
      },
      {
        "name": "Lobo Solitário",
        "type": "destino",
        "description": "Você recebe +1 em testes de perícia e Defesa se estiver sem nenhum aliado em alcance curto. Você não sofre penalidade por usar Cura em si mesmo."
      }
    ]
  },
  {
    "id": "escravo",
    "name": "Escravo",
    "description": "De minotauros odiosos no Império de Tauron aos cruéis mestres subterrâneos de Trollkyrka, várias culturas praticam a escravidão. Você já nasceu escravo, fez parte de um povo derrotado na guerra ou foi capturado em alguma rua escura para depois despertar na jaula, em algum mercado clandestino? Encontrou uma chance de escapar, tornando-se agora um escravo foragido? Recebeu a liberdade como recompensa por realizar um grande favor a seu algoz? Foi resgatado por aventureiros que agora se tornaram sua nova família?",
    "items": [
      "Algemas",
      "Uma ferramenta pesada (mesmas estatísticas de uma maça)"
    ],
    "skills": [
      "atletismo",
      "fortitude",
      "furtividade"
    ],
    "powers": [
      {
        "name": "Desejo de Liberdade",
        "type": "origem",
        "description": "Ninguém voltará a torná-lo um escravo! Você recebe +5 em testes contra a manobra agarrar e efeitos de movimento."
      },
      {
        "name": "Vitalidade",
        "type": "combate",
        "description": "Você recebe +1 PV por nível de personagem e +2 em Fortitude. Pré-requisito: Con 1. Poderes de Destino"
      }
    ]
  },
  {
    "id": "estudioso",
    "name": "Estudioso",
    "description": "Não importa se você já nasceu apaixonado por certo assunto, testemunhou um evento incrível que atiçou sua curiosidade ou se viu forçado a estudar por imposição familiar. Longos anos de sua vida foram gastos em meio a livros e pergaminhos. Da engenharia dos anões à geopolítica do Reinado, das táticas militares puristas aos sistemas de conjuração da Academia Arcana, da anatomia dos dragões aos enigmas cósmicos da Tormenta... em Arton não faltam campos a conquistar, segredos a desvendar. Agora, como aventureiro, você tem a chance de vivenciar aquilo que aprendeu e também auxiliar o grupo com o fruto de seus estudos.",
    "items": [
      "Coleção de livros (+1 em Conhecimento, Guerra, Misticismo ou Nobreza, a sua escolha)"
    ],
    "skills": [
      "conhecimento",
      "guerra",
      "misticismo"
    ],
    "powers": [
      {
        "name": "Aparência Inofensiva",
        "type": "destino",
        "description": "A primeira criatura inteligente (Int –3 ou maior) que atacar você em uma cena deve fazer um teste de Vontade (CD Car). Se falhar, perderá sua ação. Este poder só funciona uma vez por cena; independentemente de a criatura falhar ou não no teste, poderá atacá-lo nas rodadas seguintes. Pré-requisito: Car 1."
      },
      {
        "name": "Palpite Fundamentado",
        "type": "origem",
        "description": "Quando vai fazer um teste de perícia originalmente baseada em Inteligência ou Sabedoria, você pode gastar 2 PM para substituí-la por Conhecimento."
      }
    ]
  },
  {
    "id": "fazendeiro",
    "name": "Fazendeiro",
    "description": "Boa parte da população de Arton jamais conheceu outro modo de viver. Em algum lugar na perigosa transição entre os ermos e as cidades, você trabalhou duro em campos e fazendas. Cultivando a terra ou criando animais, viveu longos anos em contato com a natureza, orando e trabalhando por boas colheitas ou gado saudável, só ocasionalmente visitando povoados para negociar sua produção. Por que essa vida tranquila acabou? Sua família foi assassinada por goblins? Sua fazenda foi devastada por um dragão? Ou você apenas foi atraído pelo chamado da aventura?",
    "items": [
      "Carroça",
      "Uma ferramenta agrícola (mesmas estatísticas de uma lança)",
      "10 rações de viagem",
      "Um animal não combativo (como uma galinha, porco ou ovelha)"
    ],
    "skills": [
      "adestramento",
      "cavalgar",
      "oficio",
      "sobrevivencia"
    ],
    "powers": [
      {
        "name": "Água no Feijão",
        "type": "origem",
        "description": "Você não sofre a penalidade de –5 e não gasta matéria-prima adicional para fabricar pratos para cinco pessoas."
      },
      {
        "name": "Ginete",
        "type": "combate",
        "description": "Você passa automaticamente em testes de Cavalgar para não cair da montaria quando sofre dano. Além disso, não sofre penalidades para atacar à distância ou lançar magias quando montado. Pré-requisito: treinado em Cavalgar."
      }
    ]
  },
  {
    "id": "forasteiro",
    "name": "Forasteiro",
    "description": "Você veio de longe. Sua cultura nativa é quase ou totalmente desconhecida no Reinado, tornando-o uma figura exótica, de hábitos estranhos. Você pertence a uma tribo perdida nas Montanhas Sanguinárias? Nasceu em uma bela cidade de cúpulas douradas no Deserto da Perdição? Navegou em navios audazes desde os Reinos de Moreania? Talvez você até tenha chegado de outro mundo, através de algum portal mágico. Será que conseguiu ajustar-se a este Reinado, agora chamando-o de lar? Ou procura até hoje o caminho de volta para casa?",
    "items": [
      "Equipamento de viagem",
      "Instrumento musical exótico (+1 em uma perícia de Carisma aprovada pelo mestre)",
      "Traje estrangeiro"
    ],
    "skills": [
      "cavalgar",
      "pilotagem",
      "sobrevivencia"
    ],
    "powers": [
      {
        "name": "Cultura Exótica",
        "type": "origem",
        "description": "Por sua diferente visão de mundo, você encontra soluções inesperadas. Quando vai fazer um teste de perícia que requer treinamento, você pode gastar 1 PM para ignorar esse requerimento para esse teste."
      },
      {
        "name": "Lobo Solitário",
        "type": "destino",
        "description": "Você recebe +1 em testes de perícia e Defesa se estiver sem nenhum aliado em alcance curto. Você não sofre penalidade por usar Cura em si mesmo."
      }
    ]
  },
  {
    "id": "gladiador",
    "name": "Gladiador",
    "description": "Combates de arena são um entretenimento popular em Arton — a ponto de atrair muitos jovens praticantes. Podem ser combates até a morte ou apenas encenações elaboradas ou ainda corridas de cavalo, arquearia e outros esportes menos sangrentos. Você se envolveu nesse mundo glamoroso por ser tradição em sua família, por admirar algum gladiador renomado ou apenas por sede de fama e fortuna. Um evento traumático, uma desilusão ou o puro tédio levou você a abandonar as arenas e aplausos, usando sua experiência em torneios para viver aventuras.",
    "items": [
      "Uma arma marcial ou exótica",
      "Um item sem valor recebido de um admirador"
    ],
    "skills": [
      "atuacao",
      "luta"
    ],
    "powers": [
      {
        "name": "Atraente",
        "type": "destino",
        "description": "Você recebe +2 em testes de perícias baseadas em Carisma contra criaturas que possam se sentir fisicamente atraídas por você. Pré-requisito: Car 1."
      },
      {
        "name": "Pão e Circo",
        "type": "origem",
        "description": "Por seu treino em combates de exibição, você sabe “bater sem machucar”. Pode escolher causar dano não letal sem sofrer a penalidade de –5."
      },
      {
        "name": "Torcida",
        "type": "destino",
        "description": "Você recebe +2 em testes de perícia e Defesa quando tem a torcida a seu favor. Entenda-se por “torcida” qualquer número de criaturas inteligentes em alcance médio que não esteja realizando nenhuma ação além de torcer por você. Pré-requisito: Car 1."
      },
      {
        "name": "Poder de Combate",
        "type": "combate",
        "description": "Um poder de combate a sua escolha (Cap. 2)."
      }
    ]
  },
  {
    "id": "guarda",
    "name": "Guarda",
    "description": "Você atuou como agente da lei em uma vila ou cidade. Nem de longe uma profissão tão glamorosa ou emocionante quanto parece; boa parte de seu trabalho resumia-se a guardar um portão, fazer rondas tediosas ou recolher bêbados em tavernas. Pelo menos você recebeu algum treino em investigação e combate. Também tem consigo alguma boa arma, que “esqueceu” de devolver quando abandonou a milícia para se tornar aventureiro.",
    "items": [
      "Apito",
      "Insígnia da milícia",
      "Uma arma marcial"
    ],
    "skills": [
      "investigacao",
      "luta",
      "percepcao"
    ],
    "powers": [
      {
        "name": "Detetive",
        "type": "origem",
        "description": "Você pode gastar 1 PM para substituir testes de Percepção e Intuição por testes de Investigação até o fim da cena."
      },
      {
        "name": "Investigador",
        "type": "destino",
        "description": "Você recebe +2 em Investigação e soma sua Inteligência em Intuição. Pré-requisito: Int 1."
      },
      {
        "name": "Poder de Combate",
        "type": "combate",
        "description": "Um poder de combate a sua escolha (Cap. 2)."
      }
    ]
  },
  {
    "id": "herdeiro",
    "name": "Herdeiro",
    "description": "Você pertence a uma linhagem de nobres, mercadores, conjuradores, acadêmicos, assassinos, ou outra atividade tradicional em sua família — tão tradicional que, de você, não se espera outra coisa. Pode ser uma longa e antiquíssima ascendência, traçada até antes da Grande Batalha, ou você apenas é filho de uma importante personalidade. Talvez tenha nascido em alguma ordem de cavalaria em Bielefeld, ou uma influente estirpe da nobreza de Deheon, ou como filho de um célebre arquimago com planos de enviá-lo à Academia Arcana, ou até cresceu em um culto familiar secreto a um deus maligno. Graças a essa herança, recebeu treino e equipamento adequados. Mas você pretende mesmo seguir esse caminho?",
    "items": [
      "Um símbolo de sua herança, como um anel de sinete ou manto cerimonial"
    ],
    "skills": [
      "misticismo",
      "nobreza",
      "oficio"
    ],
    "powers": [
      {
        "name": "Comandar",
        "type": "destino",
        "description": "Você pode gastar uma ação de movimento e 1 PM para gritar ordens para seus aliados em alcance médio. Eles recebem +1 em testes de perícia até o fim da cena. Pré-requisito: Car 1."
      },
      {
        "name": "Herança",
        "type": "origem",
        "description": "Você herdou um item de preço de até T$ 1.000. Você pode escolher este poder duas vezes, para um item de até T$ 2.000."
      }
    ]
  },
  {
    "id": "heroi_campones",
    "name": "Herói Camponês",
    "description": "Quando o povoado foi atacado por goblins, você empunhou o forcado para expulsá-los. Quando o estábulo pegou fogo, você se arriscou para salvar todos os animais. Quando todos temiam a mansão assombrada na colina, você encontrou a carta de amor perdida que trouxe descanso à alma torturada. Você era o campeão local, amado pelo povo, mas também destinado a feitos maiores. Houve comoção quando você partiu para uma vida de aventuras, mas ninguém deixou de orar por seu sucesso. Talvez você até tenha sido presenteado com alguma arma ou item há tempos guardado no povoado.",
    "items": [
      "Instrumentos de ofício ou uma arma simples",
      "Traje de plebeu"
    ],
    "skills": [
      "adestramento",
      "oficio"
    ],
    "powers": [
      {
        "name": "Coração Heroico",
        "type": "origem",
        "description": "Você recebe +3 pontos de mana. Quando atinge um novo patamar (no 5º, 11º e 17º níveis), recebe +3 PM."
      },
      {
        "name": "Sortudo",
        "type": "destino",
        "description": "Quando faz um teste, você pode gastar 3 PM para rolá-lo novamente."
      },
      {
        "name": "Surto Heroico",
        "type": "destino",
        "description": "Uma vez por rodada, você pode gastar 5 PM para realizar uma ação padrão ou de movimento adicional."
      },
      {
        "name": "Torcida",
        "type": "destino",
        "description": "Você recebe +2 em testes de perícia e Defesa quando tem a torcida a seu favor. Entenda-se por “torcida” qualquer número de criaturas inteligentes em alcance médio que não esteja realizando nenhuma ação além de torcer por você. Pré-requisito: Car 1."
      }
    ]
  },
  {
    "id": "marujo",
    "name": "Marujo",
    "description": "Você foi tripulante em uma embarcação — um barco pesqueiro, galé pirata, caravela exploradora, trirreme dos minotauros... — no Mar Negro, no Mar do Dragão-Rei ou mesmo ao longo do imenso Rio dos Deuses. Você também pode ter trabalhado em um veículo exótico, como um dirigível goblin, ou mesmo em uma embarcação mágica, como as naves vivas gog’magogue que viajam entre mundos!",
    "items": [
      "T$ 2d6 (seu último salário)",
      "Corda"
    ],
    "skills": [
      "atletismo",
      "jogatina",
      "pilotagem"
    ],
    "powers": [
      {
        "name": "Acrobático",
        "type": "destino",
        "description": "Você pode usar sua Destreza em vez de Força em testes de Atletismo. Além disso, terreno difícil não reduz seu deslocamento nem o impede de realizar investidas. Pré-requisito: Des 2."
      },
      {
        "name": "Passagem de Navio",
        "type": "origem",
        "description": "Você consegue transporte marítimo para você e seus aliados, sem custos, desde que todos paguem com trabalho (passar em pelo menos um teste de perícia adequado durante a viagem)."
      }
    ]
  },
  {
    "id": "mateiro",
    "name": "Mateiro",
    "description": "Nem todos em Arton vivem em cidades confortavelmente abastecidas por fazendeiros, mineiros ou pescadores — muitas comunidades ainda obtêm sustento através da caça. Você aprendeu cedo a abater animais selvagens para colocar comida na mesa, ou como esporte de gosto duvidoso. Se você caça com reverência a Allihanna ou apenas coleciona troféus com orgulho, a escolha é sua. De qualquer forma, para alguém habituado a flechar cervos e colocar armadilhas para coelhos, combater ogros, demônios e dragões seria apenas o passo seguinte.",
    "items": [
      "Arco curto",
      "Barraca",
      "Equipamento de viagem",
      "20 flechas"
    ],
    "skills": [
      "atletismo",
      "furtividade",
      "sobrevivencia"
    ],
    "powers": [
      {
        "name": "Lobo Solitário",
        "type": "destino",
        "description": "Você recebe +1 em testes de perícia e Defesa se estiver sem nenhum aliado em alcance curto. Você não sofre penalidade por usar Cura em si mesmo."
      },
      {
        "name": "Sentidos Aguçados",
        "type": "destino",
        "description": "Você recebe +2 em Percepção, não fica desprevenido contra inimigos que não possa perceber e, sempre que erra um ataque devido a camuflagem, pode rolar mais uma vez o dado da chance de falha. Pré-requisitos: Sab 1, treinado em Percepção."
      },
      {
        "name": "Vendedor de Carcaças",
        "type": "origem",
        "description": "Você pode extrair recursos de criaturas em um minuto, em vez de uma hora, e recebe +5 no teste."
      }
    ]
  },
  {
    "id": "membro_guilda",
    "name": "Membro de Guilda",
    "description": "Você foi, ou ainda é, membro atuante em uma grande guilda — uma associação de artesãos, mercadores, magos, criminosos ou mesmo aventureiros. A guilda forneceu o treinamento e equipamento necessários para suas atividades, esperando que você seja útil em troca. Você se manteve fiel a seus patronos, cumprindo missões e colhendo os benefícios de pertencer a uma vasta organização? Ou deixou essa vida para trás, sendo agora desprezado ou até caçado por seus antigos mestres?",
    "items": [
      "Gazua ou instrumentos de ofício"
    ],
    "skills": [
      "diplomacia",
      "enganacao",
      "misticismo",
      "oficio"
    ],
    "powers": [
      {
        "name": "Foco em Perícia",
        "type": "destino",
        "description": "Escolha uma perícia. Quando faz um teste dessa perícia, você pode gastar 1 PM para rolar dois dados e usar o melhor resultado. Você pode escolher este poder outras vezes para perícias diferentes. Este poder não pode ser aplicado em Luta e Pontaria (mas veja Foco em Arma). Pré-requisito: treinado na perícia escolhida."
      },
      {
        "name": "Rede de Contatos",
        "type": "origem",
        "description": "Graças à influência de sua guilda, você pode usar Diplomacia para interrogar sem custo e em um minuto (veja Investigação)."
      }
    ]
  },
  {
    "id": "mercador",
    "name": "Mercador",
    "description": "Seguindo uma tradição de família, após herdar um estabelecimento ou apenas como um jovem empregado, você atuou como comerciante — pelo menos por algum tempo. Uma tenda modesta em algum grande mercado urbano? Uma caravana mercante cruzando o Reinado? Um belo bazar na prestigiada cidade voadora de Vectora? Após alguns anos de negociações e jornadas (nem tão tranquilas quanto outros imaginam), você talvez não tenha ficado rico, mas reuniu algum equipamento e dinheiro suficientes para começar carreira como aventureiro.",
    "items": [
      "Carroça",
      "Trobo",
      "Mercadorias para vender no valor de T$ 100"
    ],
    "skills": [
      "diplomacia",
      "intuicao",
      "oficio"
    ],
    "powers": [
      {
        "name": "Negociação",
        "type": "origem",
        "description": "Você pode vender itens 10% mais caro (não cumulativo com barganha)."
      },
      {
        "name": "Proficiência",
        "type": "combate",
        "description": "Escolha uma proficiência: armas marciais, armas de fogo, armaduras pesadas ou escudos (se for proficiente em armas marciais, você também pode escolher armas exóticas). Você recebe essa proficiência. Você pode escolher este poder outras vezes para proficiências diferentes."
      },
      {
        "name": "Sortudo",
        "type": "destino",
        "description": "Quando faz um teste, você pode gastar 3 PM para rolá-lo novamente."
      }
    ]
  },
  {
    "id": "minerador",
    "name": "Minerador",
    "description": "Ser aventureiro é a profissão mais perigosa de todas; ser mineiro, talvez a segunda mais perigosa. Você mergulhou nas profundezas da terra atrás de metais necessários à civilização ou riquezas em gemas preciosas. Enquanto humanos e outras raças consideram essa vida um pesadelo, quase todos os anões acreditam ser a mais feliz das carreiras. A escuridão e o sufocamento dos subterrâneos talvez tenham sido assustadores, mas trouxeram a você bens materiais valiosos, bem como informação profunda (sem trocadilhos) sobre túneis e masmorras.",
    "items": [
      "Gemas preciosas no valor de T$ 100",
      "Picareta"
    ],
    "skills": [
      "atletismo",
      "fortitude",
      "oficio"
    ],
    "powers": [
      {
        "name": "Ataque Poderoso",
        "type": "combate",
        "description": "Sempre que faz um ataque corpo a corpo, você pode sofrer –2 no teste de ataque para receber +5 na rolagem de dano. Pré-requisito: For 1."
      },
      {
        "name": "Escavador",
        "type": "origem",
        "description": "Você se torna proficiente em picaretas, causa +1 de dano com elas e não é afetado por terreno difícil em masmorras e subterrâneos."
      },
      {
        "name": "Sentidos Aguçados",
        "type": "destino",
        "description": "Você recebe +2 em Percepção, não fica desprevenido contra inimigos que não possa perceber e, sempre que erra um ataque devido a camuflagem, pode rolar mais uma vez o dado da chance de falha. Pré-requisitos: Sab 1, treinado em Percepção."
      }
    ]
  },
  {
    "id": "nomade",
    "name": "Nômade",
    "description": "Até onde se lembra, você nunca pertenceu a um só lugar. Sua família viajava constantemente, como parte de alguma grande caravana comercial, peregrinação religiosa ou algum povo primitivo que nunca praticou agricultura. Ou talvez suas razões para viajar sejam bastante diferentes e pessoais — após a quase extinção de seu povo, muitos elfos temem criar raízes, enquanto a deusa Valkaria exige que seus devotos se mantenham sempre em viagem. Para você, habituado às estradas e sem laços com nenhuma terra, bastou um pequeno passo para se tornar aventureiro.",
    "items": [
      "Bordão",
      "Equipamento de viagem"
    ],
    "skills": [
      "cavalgar",
      "pilotagem",
      "sobrevivencia"
    ],
    "powers": [
      {
        "name": "Lobo Solitário",
        "type": "destino",
        "description": "Você recebe +1 em testes de perícia e Defesa se estiver sem nenhum aliado em alcance curto. Você não sofre penalidade por usar Cura em si mesmo."
      },
      {
        "name": "Mochileiro",
        "type": "origem",
        "description": "Seu limite de carga aumenta em 5 espaços."
      },
      {
        "name": "Sentidos Aguçados",
        "type": "destino",
        "description": "Você recebe +2 em Percepção, não fica desprevenido contra inimigos que não possa perceber e, sempre que erra um ataque devido a camuflagem, pode rolar mais uma vez o dado da chance de falha. Pré-requisitos: Sab 1, treinado em Percepção."
      }
    ]
  },
  {
    "id": "pivete",
    "name": "Pivete",
    "description": "Você era uma criança de rua. Não conheceu seus pais, foi abandonado por eles ou fugiu para evitar maus tratos. Sem muitas escolhas na vida, aprendeu cedo a sobreviver em grandes cidades, pedindo esmolas, roubando bolsas ou cumprindo pequenas tarefas para bandidos. Tornar-se aventureiro não parecia apenas um jeito de ficar rico e famoso, mas também a única chance de uma vida melhor. Talvez você não tenha as armaduras e mantos chiques de seus companheiros, mas sabe se virar nas ruas melhor que ninguém.",
    "items": [
      "Gazua",
      "Traje de plebeu",
      "Um animal urbano (como um cão, gato, rato ou pombo)"
    ],
    "skills": [
      "furtividade",
      "iniciativa",
      "ladinagem"
    ],
    "powers": [
      {
        "name": "Acrobático",
        "type": "destino",
        "description": "Você pode usar sua Destreza em vez de Força em testes de Atletismo. Além disso, terreno difícil não reduz seu deslocamento nem o impede de realizar investidas. Pré-requisito: Des 2."
      },
      {
        "name": "Aparência Inofensiva",
        "type": "destino",
        "description": "A primeira criatura inteligente (Int –3 ou maior) que atacar você em uma cena deve fazer um teste de Vontade (CD Car). Se falhar, perderá sua ação. Este poder só funciona uma vez por cena; independentemente de a criatura falhar ou não no teste, poderá atacá-lo nas rodadas seguintes. Pré-requisito: Car 1."
      },
      {
        "name": "Quebra-Galho",
        "type": "origem",
        "description": "Em cidades ou metrópoles, você pode comprar qualquer item mundano não superior por metade do preço normal. Esses itens não podem ser matérias-primas e não podem ser revendidos (são velhos, sujos, furtados...)."
      }
    ]
  },
  {
    "id": "refugiado",
    "name": "Refugiado",
    "description": "Neste mundo assolado por tantas guerras e tragédias, você acabou sobrevivendo a alguma delas. Sendo elfo, estava presente durante a sofrida queda de Lenórienn. Escapou à destruição de Tamu-ra. Teve sorte em sair do caminho de Mestre Arsenal, conseguiu esconder-se das forças puristas ou testemunhou a chegada da Flecha de Fogo e viveu para contar a história. Trauma e privações talvez tenham tornado você amargo, sombrio, embrutecido... mas também um sobrevivente tenaz, acostumado a uma vida perigosa.",
    "items": [
      "Um item estrangeiro de até T$ 100"
    ],
    "skills": [
      "fortitude",
      "reflexos",
      "vontade"
    ],
    "powers": [
      {
        "name": "Estoico",
        "type": "origem",
        "description": "Sua condição de descanso é uma categoria acima do padrão pela situação (normal em condições ruins, confortável em condições normais e luxuosa em condições confortáveis ou melhores). Veja as regras de recuperação na página 106."
      },
      {
        "name": "Vontade de Ferro",
        "type": "destino",
        "description": "Você recebe +1 PM para cada dois níveis de personagem e +2 em Vontade. Pré-requisito: Sab 1. Poderes de Magia Todos os poderes deste grupo possuem como pré-requisito lançar magias."
      }
    ]
  },
  {
    "id": "seguidor",
    "name": "Seguidor",
    "description": "Você não nasceu herói, mas viveu algum tempo na companhia de um. Pode ter sido escudeiro de um cavaleiro de Khalmyr, garoto de recados para um ladino, criado de um nobre... enfim, um ajudante para um aventureiro de verdade. Durante esse tempo adquiriu aprendizado valioso, testemunhou eventos incríveis, mas você não seria um seguidor para sempre. Como ocorreu a separação? Você apenas disse adeus e trilhou seu próprio caminho? Seu mestre desapareceu de forma misteriosa ou foi assassinado diante de seus olhos? Você ficou com parte de seus itens, como presente ou lembrança?",
    "items": [
      "Um item recebido de seu mestre de até T$ 100"
    ],
    "skills": [
      "adestramento",
      "oficio"
    ],
    "powers": [
      {
        "name": "Antigo Mestre",
        "type": "origem",
        "description": "Você ainda mantém contato com o herói que costumava servir. Uma vez por aventura, ele surge para ajudá-lo por uma cena. Ele é um parceiro mestre de um tipo a sua escolha (definido ao obter este poder) que não conta em seu limite de aliados."
      },
      {
        "name": "Proficiência",
        "type": "combate",
        "description": "Escolha uma proficiência: armas marciais, armas de fogo, armaduras pesadas ou escudos (se for proficiente em armas marciais, você também pode escolher armas exóticas). Você recebe essa proficiência. Você pode escolher este poder outras vezes para proficiências diferentes."
      },
      {
        "name": "Surto Heroico",
        "type": "destino",
        "description": "Uma vez por rodada, você pode gastar 5 PM para realizar uma ação padrão ou de movimento adicional."
      }
    ]
  },
  {
    "id": "selvagem",
    "name": "Selvagem",
    "description": "Você nasceu em uma tribo de bárbaros incultos ou tem uma origem bem mais exótica. Perdeu-se dos pais verdadeiros em alguma região remota, sobrevivendo graças aos cuidados de um eremita, ou criado por animais, ou por pura bondade dos deuses. Você pode nem mesmo ter nascido de pais humanoides — talvez seja cria de dragões, demônios ou deuses, com poderes a serem revelados no momento certo. Será que você ainda teme a civilização, assustando-se com uma simples fogueira? Ou já aprendeu algumas coisas, graças a seus novos companheiros?",
    "items": [
      "Uma arma simples",
      "Um pequeno animal de estimação como um pássaro ou esquilo"
    ],
    "skills": [
      "percepcao",
      "reflexos",
      "sobrevivencia"
    ],
    "powers": [
      {
        "name": "Lobo Solitário",
        "type": "destino",
        "description": "Você recebe +1 em testes de perícia e Defesa se estiver sem nenhum aliado em alcance curto. Você não sofre penalidade por usar Cura em si mesmo."
      },
      {
        "name": "Vida Rústica",
        "type": "origem",
        "description": "Você come coisas que fariam um avestruz vomitar (sendo imune a efeitos prejudiciais de itens ingeríveis) e também consegue descansar nos lugares mais desconfortáveis (mesmo dormindo ao relento, sua recuperação de PV e PM nunca é inferior a seu próprio nível)."
      },
      {
        "name": "Vitalidade",
        "type": "combate",
        "description": "Você recebe +1 PV por nível de personagem e +2 em Fortitude. Pré-requisito: Con 1. Poderes de Destino"
      }
    ]
  },
  {
    "id": "soldado",
    "name": "Soldado",
    "description": "Deheon. Bielefeld. A Supremacia Purista. Em Arton existem vastas forças militares. Ainda jovem, você se alistou (ou foi convocado) como soldado em um grande exército. Independentemente de sua função exata dentro da máquina de guerra — infantaria, cavalaria, arqueiro, cozinheiro... —, você recebeu treinamento em combate e equipamento decente. Mas em alguma ocasião você abandonou a vida militar para se tornar aventureiro. Foi dispensado com honras, após uma grande façanha? Sobreviveu a um conflito sangrento? Desertou antes de um massacre?",
    "items": [
      "Uma arma marcial",
      "Um uniforme militar",
      "Uma insígnia de seu exército"
    ],
    "skills": [
      "fortitude",
      "guerra",
      "luta",
      "pontaria"
    ],
    "powers": [
      {
        "name": "Influência Militar",
        "type": "origem",
        "description": "Você fez amigos nas forças armadas. Onde houver acampamentos ou bases militares, você pode conseguir hospedagem e informações para você e seus aliados."
      },
      {
        "name": "Poder de Combate",
        "type": "combate",
        "description": "Um poder de combate a sua escolha (Cap. 2)."
      }
    ]
  },
  {
    "id": "taverneiro",
    "name": "Taverneiro",
    "description": "Não é incomum que heróis aposentados se tornem donos de tavernas ou estalagens, mas o contrário também pode ocorrer. Você foi dono, filho do dono ou empregado em algum lugar frequentado por aventureiros — esses tipos sempre cheios de ouro e bravatas, atiçando sua ambição. Claro, eles nem sempre mencionam os horrores, amputações e mortes! Ainda assim, parece bem melhor que a vida atrás do balcão, limpando canecas sujas. Você ouviu todas as grandes histórias, trocou socos em algumas brigas e até ganhou uma lembrança ou outra de algum herói bêbado.",
    "items": [
      "Rolo de macarrão ou martelo de carne (mesmas estatísticas de uma clava)",
      "Uma panela, um avental, uma caneca e um pano sujo"
    ],
    "skills": [
      "diplomacia",
      "jogatina",
      "oficio"
    ],
    "powers": [
      {
        "name": "Gororoba",
        "type": "origem",
        "description": "Você não sofre a penalidade de –5 para fabricar um prato especial adiconal."
      },
      {
        "name": "Proficiência",
        "type": "combate",
        "description": "Escolha uma proficiência: armas marciais, armas de fogo, armaduras pesadas ou escudos (se for proficiente em armas marciais, você também pode escolher armas exóticas). Você recebe essa proficiência. Você pode escolher este poder outras vezes para proficiências diferentes."
      },
      {
        "name": "Vitalidade",
        "type": "combate",
        "description": "Você recebe +1 PV por nível de personagem e +2 em Fortitude. Pré-requisito: Con 1. Poderes de Destino"
      }
    ]
  },
  {
    "id": "trabalhador",
    "name": "Trabalhador",
    "description": "Nenhum glamour aqui, apenas trabalho braçal pesado. De origem humilde, sem grandes chances na vida, você trabalhou duro desde muito jovem. Transportou pedras na construção de templos e castelos, carregou sacas de grãos em fazendas, empilhou cargas em portos, puxou arado feito um animal de tração. Talvez sua vida tenha sido um pouco melhor, como servo em um palácio. Ou muito pior, arrastando ou queimando corpos em campos de batalha. Não é surpresa que a carreira como aventureiro, mesmo perigosa, tenha parecido muito mais atraente.",
    "items": [
      "Uma ferramenta pesada (mesmas estatísticas de uma maça ou lança, a sua escolha)"
    ],
    "skills": [
      "atletismo",
      "fortitude"
    ],
    "powers": [
      {
        "name": "Atlético",
        "type": "destino",
        "description": "Você recebe +2 em Atletismo e +3m em seu deslocamento. Pré-requisito: For 2."
      },
      {
        "name": "Esforçado",
        "type": "origem",
        "description": "Você não teme trabalho duro, nem prazos apertados. Você recebe um bônus de +2 em todos os testes de perícias estendidos (incluindo perigos complexos)."
      }
    ]
  }
];
