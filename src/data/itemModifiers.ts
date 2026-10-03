import { ItemModifier, EquipmentItem } from '../types/rules';

export const IMPROVEMENT_TIER_COSTS: Record<number, number> = {
  1: 300,
  2: 3000,
  3: 9000,
  4: 18000,
};

export const ENCHANTMENT_TIER_COSTS: Record<number, number> = {
  1: 18000,
  2: 36000,
  3: 72000,
};

export const ITEM_MODIFIERS_LIST: ItemModifier[] = [
  {
    "id": "certeira",
    "name": "Certeira",
    "type": "melhoria",
    "targetCategories": [
      "arma"
    ],
    "description": "Fabricada para ser mais precisa e balanceada, a arma fornece +1 nos testes de ataque.",
    "effect": {
      "attackBonus": 1
    }
  },
  {
    "id": "pungente",
    "name": "Pungente",
    "type": "melhoria",
    "targetCategories": [
      "arma"
    ],
    "description": "Temperada diversas vezes para adquirir o fio ou o equilíbrio perfeito, a arma fornece +2 nos testes de ataque.",
    "effect": {
      "attackBonus": 2
    },
    "requirementText": "Pré-requisito: Certeira"
  },
  {
    "id": "cruel",
    "name": "Cruel",
    "type": "melhoria",
    "targetCategories": [
      "arma"
    ],
    "description": "Banhado a Ouro. Uma melhoria favorita de nobres pomposos ou de aventureiros que acabaram de enriquecer. Fornece +2 em Diplomacia. O mestre pode mudar o bônus para uma penalidade de –2 contra pessoas que desprezam ostentação. Além disso, pode atrair a cobiça de ladrões.",
    "effect": {
      "damageBonus": 1
    }
  },
  {
    "id": "atroz",
    "name": "Atroz",
    "type": "melhoria",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma é um amontoado de pontas, ganchos e protuberâncias. É difícil empunhá-la sem se machucar, mas ela fornece +2 nas rolagens de dano.",
    "effect": {
      "damageBonus": 2
    },
    "requirementText": "Pré-requisito: Cruel"
  },
  {
    "id": "equilibrada",
    "name": "Equilibrada",
    "type": "melhoria",
    "targetCategories": [
      "arma"
    ],
    "description": "Uma arma equilibrada é forjada com o balanço perfeito, o que facilita movimentos complexos. Ela fornece +2 em testes de manobras (desarmar, quebrar etc.).",
    "effect": {
      "customText": "+2 em testes de manobras"
    }
  },
  {
    "id": "harmonizada",
    "name": "Harmonizada",
    "type": "melhoria",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma foi banhada em óleos alquímicos que a deixaram sintonizada com a aura de seu usuário. Escolha uma habilidade ativada ao se fazer um ataque ou usar a ação agredir e que custe pontos de mana. Esta habilidade tem seu custo em PM reduzido em –1 se utilizada com esta arma. Pré-requisito: outra melhoria qualquer.",
    "effect": {
      "customText": "Uma habilidade de ataque escolhida custa –1 PM com esta arma"
    },
    "requirementText": "Pré-requisito: outra melhoria qualquer"
  },
  {
    "id": "injecao_alquimica",
    "name": "Injeção Alquímica",
    "type": "melhoria",
    "targetCategories": [
      "arma"
    ],
    "description": "Um minúsculo frasco de cerâmica ou vidro é inserido ao longo da arma, junto com um mecanismo injetor ativado por impacto. Um ataque que acerte causa seu dano normal e libera uma carga de um preparado (como ácido ou fogo alquímico) ou de água benta, que atinge o alvo automaticamente. A melhoria tem espaço para 2 doses. Carregá-la exige uma ação completa e o gasto dos itens com os quais você quiser carregá-la.",
    "effect": {
      "customText": "Libera um preparado ao acertar (2 doses)"
    }
  },
  {
    "id": "macica",
    "name": "Maciça",
    "type": "melhoria",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma é feita com material denso, fazendo com que seus golpes tenham impacto terrível. O multiplicador de crítico da arma aumenta em 1 ponto. Uma arma não pode ser maciça e precisa.",
    "effect": {
      "critMultiplierBonus": 1
    },
    "incompatibleWith": [
      "precisa"
    ]
  },
  {
    "id": "mira_telescopica",
    "name": "Mira Telescópica",
    "type": "melhoria",
    "targetCategories": [
      "arma"
    ],
    "description": "Aumenta o alcance da arma em uma categoria (de curto para médio, de médio para longo) e o alcance da habilidade Ataque Furtivo para médio. Esta melhoria só pode ser aplicada em armas de disparo (exceto fundas).",
    "effect": {
      "rangeStepBonus": 1
    }
  },
  {
    "id": "precisa",
    "name": "Precisa",
    "type": "melhoria",
    "targetCategories": [
      "arma"
    ],
    "description": "Cuidado especial foi tomado ao temperar o aço desta arma, para que seu fio se mantenha sempre como uma navalha. A margem de ameaça aumenta em 1 ponto. Uma arma não pode ser precisa e maciça.",
    "effect": {
      "critThreatBonus": 1
    },
    "incompatibleWith": [
      "macica"
    ]
  },
  {
    "id": "ajustada",
    "name": "Ajustada",
    "type": "melhoria",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Feito com peças medidas com precisão, o item tem a sua penalidade de armadura diminuída em 1.",
    "effect": {
      "armorPenaltyBonus": 1
    }
  },
  {
    "id": "sob_medida",
    "name": "Sob Medida",
    "type": "melhoria",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Embora muitas armaduras sejam feitas especificamente para um usuário, esta passou por um período extenso de ajustes e refinamento, adequando-se com perfeição ao seu corpo. Reduz a penalidade de armadura em 2, mas apenas para o usuário específico (para outros, comporta-se como um item ajustado).",
    "effect": {
      "armorPenaltyBonus": 2
    },
    "requirementText": "Pré-requisito: Ajustada"
  },
  {
    "id": "delicada",
    "name": "Delicada",
    "type": "melhoria",
    "targetCategories": [
      "armadura_pesada"
    ],
    "description": "Apenas os materiais mais leves foram usados nesta armadura. As placas têm a espessura mínima necessária para oferecer a proteção que devem. Esta melhoria só pode ser aplicada a armaduras pesadas e permite que o personagem aplique 1 ponto de sua Destreza na Defesa (ou de outro atributo, caso o utilize em vez de Des). Uma armadura não pode ser delicada e reforçada.",
    "effect": {
      "customText": "Aplica 1 ponto de Destreza na Defesa"
    },
    "incompatibleWith": [
      "reforcada"
    ]
  },
  {
    "id": "espinhosa",
    "name": "Espinhosa",
    "type": "melhoria",
    "targetCategories": [
      "armadura"
    ],
    "description": "Uma armadura coberta de espinhos é uma visão impressionante — principalmente se os espinhos estiverem banhados com o sangue dos inimigos! Se o usuário agarrar ou for agarrado por uma criatura, causa dano de perfuração nesta criatura igual a sua Força. O dano é causado quando a manobra é feita e no início de cada turno do personagem, enquanto ela for mantida.",
    "effect": {
      "customText": "Causa dano de perfuração igual à Força ao agarrar ou ser agarrado"
    }
  },
  {
    "id": "espinhoso",
    "name": "Espinhoso",
    "type": "melhoria",
    "targetCategories": [
      "escudo"
    ],
    "description": "Aumenta o dano de um ataque com escudo em um passo.",
    "effect": {
      "customText": "Dano do ataque com escudo +1 passo"
    }
  },
  {
    "id": "polida",
    "name": "Polida",
    "type": "melhoria",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "A armadura ou escudo foi feito com metais reluzentes. Além de bonita, a luz refletida ofusca inimigos. Em ambientes iluminados, o bônus de Defesa do item aumenta em +5, mas apenas na primeira rodada de combate — após isso, os inimigos se acostumam ao reflexo.",
    "effect": {
      "customText": "+5 na Defesa na primeira rodada (ambientes iluminados)"
    }
  },
  {
    "id": "reforcada",
    "name": "Reforçada",
    "type": "melhoria",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Se for uma armadura, o item possui uma camada adicional de tecido, malha mais densa ou placas mais grossas. Se for um escudo, possui uma chapa mais espessa. O bônus na Defesa e a penalidade de armadura do item aumentam em 1. Um item não pode ser reforçado e delicado.",
    "effect": {
      "defenseBonus": 1,
      "armorPenaltyBonus": -1
    },
    "incompatibleWith": [
      "delicada"
    ]
  },
  {
    "id": "selada",
    "name": "Selada",
    "type": "melhoria",
    "targetCategories": [
      "armadura_pesada"
    ],
    "description": "A armadura foi forjada de forma a proteger todo o corpo do usuário, sem deixar espaço para nem mesmo um alfinete! Esta melhoria fornece um bônus de +1 em testes de resistência, mas só pode ser aplicado em armaduras pesadas.",
    "effect": {
      "resistanceBonus": 1
    }
  },
  {
    "id": "canalizador",
    "name": "Canalizador",
    "type": "melhoria",
    "targetCategories": [
      "esoterico"
    ],
    "description": "O esotérico possui uma gema mística que permite que você canalize mais mana do que normalmente seria capaz. O máximo de PM que você pode gastar em magias aumenta em +1.",
    "effect": {
      "maxMpBonus": 1
    }
  },
  {
    "id": "energetico",
    "name": "Energético",
    "type": "melhoria",
    "targetCategories": [
      "esoterico"
    ],
    "description": "Catalisadores alquímicos inseridos no item fazem com que ele potencialize energias mágicas. Suas magias que causam dano causam +1d6 pontos de dano do mesmo de tipo.",
    "effect": {
      "customText": "Magias que causam dano causam +1d6 do mesmo tipo"
    }
  },
  {
    "id": "harmonizado",
    "name": "Harmonizado",
    "type": "melhoria",
    "targetCategories": [
      "esoterico"
    ],
    "description": "Escolha uma magia. Seu custo diminui em –1 PM. Você pode mudar a magia afetada pelo item com um ritual que exige um dia e T$ 100 em ingredientes.",
    "effect": {
      "customText": "Uma magia escolhida custa –1 PM"
    }
  },
  {
    "id": "poderoso",
    "name": "Poderoso",
    "type": "melhoria",
    "targetCategories": [
      "esoterico"
    ],
    "description": "A CD para resistir a suas magias aumenta em +1.",
    "effect": {
      "customText": "+1 na CD de suas magias"
    }
  },
  {
    "id": "vigilante",
    "name": "Vigilante",
    "type": "melhoria",
    "targetCategories": [
      "esoterico"
    ],
    "description": "O item usa parte de sua mana pessoal para gerar um campo que desvia ataques. Você recebe +2 na Defesa.",
    "effect": {
      "customText": "+2 na Defesa do usuário"
    }
  },
  {
    "id": "aprimorado",
    "name": "Aprimorado",
    "type": "melhoria",
    "targetCategories": [
      "ferramenta",
      "vestuario"
    ],
    "description": "O item é construído de forma cuidadosa e com os melhores materiais. Esta melhoria só pode ser aplicada a uma ferramenta ou vestuário que modifique uma perícia (reduza uma penalidade ou forneça um bônus) e fornece um bônus de +1 nessa perícia (ou aumenta o bônus fornecido em +1). Por exemplo, uma maleta de medicamentos aprimorada fornece +1 em Cura e uma luva de pelica aprimorada fornece +2 em Ladinagem.",
    "effect": {
      "customText": "+1 na perícia que o item modifica"
    }
  },
  {
    "id": "banhado_ouro",
    "name": "Banhado a Ouro",
    "type": "melhoria",
    "targetCategories": [
      "qualquer"
    ],
    "description": "Uma melhoria favorita de nobres pomposos ou de aventureiros que acabaram de enriquecer. Fornece +2 em Diplomacia. O mestre pode mudar o bônus para uma penalidade de –2 contra pessoas que desprezam ostentação. Além disso, pode atrair a cobiça de ladrões.",
    "effect": {
      "skillBonus": {
        "skillName": "Diplomacia",
        "bonus": 2
      }
    }
  },
  {
    "id": "cravejado_gemas",
    "name": "Cravejado de Gemas",
    "type": "melhoria",
    "targetCategories": [
      "qualquer"
    ],
    "description": "É fácil ser persuadido por alguém opulento o bastante para ostentar um item cravejado de gemas. Fornece +2 em Enganação. Assim como um item banhado a ouro, um item cravejado de gemas pode atrair a cobiça de ladrões.",
    "effect": {
      "skillBonus": {
        "skillName": "Enganação",
        "bonus": 2
      }
    }
  },
  {
    "id": "discreto",
    "name": "Discreto",
    "type": "melhoria",
    "targetCategories": [
      "qualquer"
    ],
    "description": "O item é disfarçado como outro item inócuo (como um florete escondido em uma bengala) ou modificado para ser telescópico (podendo se dobrar em si mesmo para ocupar menos espaço). O item ocupa –1 espaço (mínimo 1) e fornece +5 em testes de Ladinagem para ser ocultado.",
    "effect": {
      "spacesModifier": -1,
      "customText": "+5 em Ladinagem para ocultar"
    }
  },
  {
    "id": "macabro",
    "name": "Macabro",
    "type": "melhoria",
    "targetCategories": [
      "qualquer"
    ],
    "description": "O macabro é pintado com sangue seco, esculpido na forma de uma caveira ou decorado com pedaços de orelhas, dedos e olhos. Essa aparência assustadora fornece +2 em Intimidação, mas impõe uma penalidade de –2 em Diplomacia.",
    "effect": {
      "customText": "+2 em Intimidação, –2 em Diplomacia"
    }
  },
  {
    "id": "aco_rubi",
    "name": "Aço-Rubi",
    "type": "material_especial",
    "targetCategories": [
      "arma",
      "armadura_leve",
      "armadura_pesada",
      "escudo",
      "esoterico"
    ],
    "description": "Este metal tem a aparência de vidro avermelhado, mas é duro como aço. Aço-rubi é caríssimo e comercializado apenas por uma guilda de ferreiros de Doherimm. Os anões mantém a origem deste material em segredo, mas suspeita-se de que ele seja minerado das profundezas de uma área de Tormenta. Arma. A arma ignora 10 pontos de redução de dano, além de ignorar a imunidade a crítico de lefeu. Armadura e Escudo. Fornece uma chance de ignorar o dano extra de acertos críticos e ataques furtivos: armaduras leves e escudos, 25% (1 em 1d4); armaduras pesadas, 50% (qualquer valor par em qualquer dado), cumulativas entre si. Esotérico. Quando lança uma magia que causa dano, ela ignora 10 pontos de redução de dano, além de ignorar as imunidades a dano de lefeu.",
    "effect": {},
    "priceByItemType": {
      "arma": 6000,
      "armadura_leve": 3000,
      "armadura_pesada": 6000,
      "escudo": 3000,
      "esoterico": 6000
    }
  },
  {
    "id": "adamante",
    "name": "Adamante",
    "type": "material_especial",
    "targetCategories": [
      "arma",
      "armadura_leve",
      "armadura_pesada",
      "escudo",
      "esoterico"
    ],
    "description": "Encontrado apenas em meteoritos (e por isso também chamado de “ferro-meteórico”), o adamante é um metal escuro, fosco e mais denso que o aço. Arma. Aumenta o dano em um passo. Armadura e Escudo. Fornece redução de dano: armaduras leves e escudos, RD 2; armaduras pesadas, RD 5. Esotérico. Quando lança uma magia que causa dano, você pode pagar +1 PM para rolar novamente qualquer resultado 1 na rolagem de dano dela. Gelo eterno As gélidas Montanhas Uivantes produzem gelo que nunca derrete. Expedições de aventureiros exploram essa região glacial perigosa à caça deste material fantástico. Arma. Causa +2 pontos de dano por frio. Armadura e Escudo. Fornece redução de fogo: armaduras leves e escudos, redução 5; armaduras pesadas, redução 10. Esotérico. Quando lança uma magia de frio que causa dano, você pode rolar novamente qualquer resultado 1 na rolagem de dano dela. Madeira Tollon A Floresta de Tollon produz um tipo de madeira negra, dura como aço e dotada de propriedades mágicas. Apenas armas de madeira — arcos, bordões, clavas, lanças, piques e tacapes —, escudos leves e esotéricos podem ser feitos com madeira Tollon. Arma. Conta como mágica para vencer redução de dano. Além disso, habilidades ativadas ao se fazer um ataque ou usar a ação agredir têm seu custo em PM reduzido em –1. Escudo e Esotérico. Fornece resistência a magia +2.",
    "effect": {},
    "priceByItemType": {
      "arma": 3000,
      "armadura_leve": 6000,
      "armadura_pesada": 18000,
      "escudo": 6000,
      "esoterico": 3000
    }
  },
  {
    "id": "gelo_eterno",
    "name": "Gelo Eterno",
    "type": "material_especial",
    "targetCategories": [
      "arma",
      "armadura_leve",
      "armadura_pesada",
      "escudo",
      "esoterico"
    ],
    "description": "Madeira Tollon",
    "effect": {},
    "priceByItemType": {
      "arma": 600,
      "armadura_leve": 1500,
      "armadura_pesada": 3000,
      "escudo": 1500,
      "esoterico": 3000
    }
  },
  {
    "id": "madeira_tollon",
    "name": "Madeira Tollon",
    "type": "material_especial",
    "targetCategories": [
      "arma",
      "escudo",
      "esoterico"
    ],
    "description": "A Floresta de Tollon produz um tipo de madeira negra, dura como aço e dotada de propriedades mágicas. Apenas armas de madeira — arcos, bordões, clavas, lanças, piques e tacapes —, escudos leves e esotéricos podem ser feitos com madeira Tollon. Arma. Conta como mágica para vencer redução de dano. Além disso, habilidades ativadas ao se fazer um ataque ou usar a ação agredir têm seu custo em PM reduzido em –1. Escudo e Esotérico. Fornece resistência a magia +2.",
    "effect": {},
    "priceByItemType": {
      "arma": 1500,
      "escudo": 1500,
      "esoterico": 1500
    }
  },
  {
    "id": "materia_vermelha",
    "name": "Matéria Vermelha",
    "type": "material_especial",
    "targetCategories": [
      "arma",
      "armadura_leve",
      "armadura_pesada",
      "escudo",
      "esoterico"
    ],
    "description": "Qualquer material de origem lefeu — desde suas garras e carapaças, até minérios e partes de estruturas encontradas em áreas de Tormenta — apresenta propriedades parecidas, sendo conhecido como “matéria vermelha”. Estes itens assustadores impõem ao usuário penalidade de –2 em perícias baseadas em Carisma (exceto Intimidação). Arma. Causa +1d6 de dano extra. Porém, sempre que você acerta um ataque com a arma, perde 1 ponto de vida. Lefou e lefeu são imunes tanto ao dano extra de matéria vermelha quanto à perda de vida por usar armas desse material. Armadura e Escudo. Por sua aparência “borrada”, fornecem chance de falha para cada ataque: 10% para escudos e armaduras leves, 25% para armaduras pesadas (cumulativas entre si). Lefeu ignoram este efeito. Esotérico. Você e todos os seus inimigos em alcance curto sofrem –2 em testes de resistência contra efeitos mágicos.",
    "effect": {},
    "priceByItemType": {
      "arma": 1500,
      "armadura_leve": 6000,
      "armadura_pesada": 18000,
      "escudo": 6000,
      "esoterico": 3000
    }
  },
  {
    "id": "mitral",
    "name": "Mitral",
    "type": "material_especial",
    "targetCategories": [
      "arma",
      "armadura_leve",
      "armadura_pesada",
      "escudo",
      "esoterico"
    ],
    "description": "Metal raro e valioso, o mitral é prateado, brilhante e mais leve que aço. Itens de mitral ocupam –1 espaço (mínimo 1). Arma. Aumenta sua margem de ameaça em 1. Por exemplo, uma espada longa de mitral tem margem de ameaça 18-20. Armadura e Escudo. Tem sua penalidade de armadura diminuída em 2. Armaduras pesadas de mitral permitem que você aplique até dois pontos de sua Destreza na Defesa. Esotérico. Permite que você pague +2 PM ao lançar uma magia para aumentar a CD dela em +2.",
    "effect": {},
    "priceByItemType": {
      "arma": 1500,
      "armadura_leve": 1500,
      "armadura_pesada": 12000,
      "escudo": 1500,
      "esoterico": 3000
    }
  },
  {
    "id": "enc_ameacadora",
    "name": "Ameaçadora",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "A margem de ameaça da arma duplica. Por exemplo, uma espada longa ameaçadora tem margem de ameaça 17. Efeitos que duplicam a margem de ameaça são aplicados antes de quaisquer efeitos que a aumentem.",
    "effect": {
      "critThreatBonus": 2
    }
  },
  {
    "id": "enc_anticriatura",
    "name": "Anticriatura",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma é letal contra um tipo de criatura (ou uma raça de humanoides). Uma vez por rodada, quando ataca uma criatura desse tipo, você pode gastar 2 PM. Se fizer isso e acertar o ataque, causa +4d8 de dano. Para determinar o tipo de criatura aleatoriamente, role 1d6: 1) animal; 2) construto; 3) espírito; 4) monstro; 5) morto-vivo; 6) uma raça de humanoides.",
    "effect": {
      "customText": "+2 em ataque e dano contra tipo de criatura"
    }
  },
  {
    "id": "enc_arremesso",
    "name": "Arremesso",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma pode ser arremessada em alcance curto. Caso já pudesse ser arremessada, seu alcance aumenta em uma categoria. Após o ataque, se estiver livre, a arma volta voando para você. Pegá-la é uma reação.",
    "effect": {
      "customText": "Pode ser arremessada e retorna à mão"
    }
  },
  {
    "id": "enc_assassina",
    "name": "Assassina",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma aumenta os dados de dano extra de um ataque furtivo para d8. Além disso, quando faz um Ataque Furtivo, você pode gastar 2 PM. Se fizer isso, pode rolar novamente quaisquer resultados 1 nesses dados de dano extra.",
    "effect": {
      "customText": "+2d6 de dano furtivo"
    }
  },
  {
    "id": "enc_cacadora",
    "name": "Caçadora",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma persegue o alvo, anulando penalidades por camuflagem leve e total e por cobertura leve. Caso a arma seja de ataque à distância, seu alcance também aumenta em uma categoria.",
    "effect": {
      "customText": "Ignora camuflagem e cobertura"
    }
  },
  {
    "id": "enc_congelante",
    "name": "Congelante",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma causa +1d6 de dano de frio. Uma vez por rodada, quando ataca, você pode gastar 2 PM. Se fizer isso e acertar o ataque, a vítima fica enredada por uma rodada. Uma arma congelante é coberta por uma camada de gelo e névoa.",
    "effect": {
      "customText": "+1d6 de dano de frio"
    }
  },
  {
    "id": "enc_conjuradora",
    "name": "Conjuradora",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "Um conjurador pode lançar na arma uma magia que tenha como alvo uma criatura ou que afete uma área. A magia não gera efeito na hora; em vez disso, fica guardada no item. Quando acerta um ataque com a arma, você pode descarregar a magia guardada como uma ação livre e sem pagar seu custo. Ela tem como alvo (ou como ponto de origem de sua área) a criatura ou ponto atingido pelo ataque. Uma vez que a magia seja descarregada, outra pode ser armazenada.",
    "effect": {
      "customText": "Armazena magia de até 3º círculo"
    }
  },
  {
    "id": "enc_corrosiva",
    "name": "Corrosiva",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma causa +1d6 de dano de ácido. Uma vez por rodada, quando ataca, você pode gastar 2 PM. Se fizer isso e acertar o ataque, a vítima sofre 4d4 pontos de dano de ácido na próxima rodada. Uma arma corrosiva exala vapores e goteja líquido tóxico.",
    "effect": {
      "customText": "+1d6 de dano de ácido"
    }
  },
  {
    "id": "enc_dancarina",
    "name": "Dançarina",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "Você pode gastar uma ação de movimento e 1 PM para fazer a arma flutuar e atacar uma criatura em alcance curto a sua escolha, com as mesmas estatísticas que teria se você a estivesse empunhando. Este efeito tem duração sustentada; se parar de sustentá-lo, a arma cai no chão.",
    "effect": {
      "customText": "Flutua e luta sozinha por 4 rodadas"
    }
  },
  {
    "id": "enc_defensora_arma",
    "name": "Defensora",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma se movimenta para aparar ataques contra você. Você recebe +2 na Defesa.",
    "effect": {
      "customText": "+2 na Defesa"
    }
  },
  {
    "id": "enc_destruidora",
    "name": "Destruidora",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "Se usada contra construtos e objetos (com a manobra quebrar), a arma fornece +2 no teste de ataque e causa +2d8 de dano.",
    "effect": {
      "critMultiplierBonus": 1
    }
  },
  {
    "id": "enc_dilacerante",
    "name": "Dilacerante",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma inflige ferimentos profundos. Quando faz um acerto crítico com a arma, você causa +10 pontos de dano.",
    "effect": {
      "customText": "+10 de dano em acertos críticos"
    }
  },
  {
    "id": "enc_drenante",
    "name": "Drenante",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "Quando você faz um acerto crítico em uma criatura viva, a criatura fica fraca e você ganha 2d10 pontos de vida temporários. Uma arma drenante emite um brilho púrpura.",
    "effect": {
      "customText": "Recupera 1 PM em acertos críticos"
    }
  },
  {
    "id": "enc_eletrica",
    "name": "Elétrica",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma causa +1d6 de dano de eletricidade. Uma vez por rodada, quando ataca, você pode gastar 2 PM. Se fizer isso e acertar o ataque, um raio atinge outra criatura em alcance curto, causando 3d8 pontos de dano de eletricidade. Uma arma elétrica emite faíscas e é coberta de arcos voltaicos.",
    "effect": {
      "customText": "+1d6 de dano de eletricidade"
    }
  },
  {
    "id": "enc_energetica",
    "name": "Energética",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma tem sua parte perigosa (a lâmina de uma espada, a ponta de uma lança...) transformada em magia pura. Ela fornece +4 em testes de ataque, ignora 20 pontos de redução de dano, converte todo o dano causado para essência e emana luz como uma tocha.",
    "effect": {
      "customText": "Dano de essência pura; ignora armaduras e RD"
    },
    "countsAs": 2,
    "requirementText": "Pré-requisito: formidável"
  },
  {
    "id": "enc_excruciante",
    "name": "Excruciante",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma inflige dor terrível. Uma criatura viva atingida fica fraca. Se já estiver fraca, mesmo por este efeito, fica debilitada (a condição máxima que esta arma pode causar).",
    "effect": {
      "customText": "Deixa o alvo fraco (teste de Fortitude)"
    }
  },
  {
    "id": "enc_flamejante",
    "name": "Flamejante",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma causa +1d6 de dano de fogo. Uma vez por rodada, quando ataca, você pode gastar 2 PM. Se fizer isso, em vez do ataque normal você dispara uma bola de fogo contra um alvo em alcance médio. O alvo sofre 6d6 pontos de dano. Um teste de Reflexos (CD For ou Des, à sua escolha) reduz à metade. Uma arma flamejante emana chamas como uma tocha.",
    "effect": {
      "customText": "+1d6 de dano de fogo"
    }
  },
  {
    "id": "enc_formidavel",
    "name": "Formidável",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma é encantada para desferir golpes precisos. Ela fornece +2 em testes de ataque e rolagens de dano.",
    "effect": {
      "attackBonus": 2,
      "damageBonus": 2
    }
  },
  {
    "id": "enc_lancinante",
    "name": "Lancinante",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma inflige ferimentos mortais. Quando faz um acerto crítico com a arma, você causa +10 pontos de dano ou, além de multiplicar os dados de dano, multiplica também quaisquer bônus numéricos, a sua escolha. Este efeito substitui o efeito de dilacerante.",
    "effect": {},
    "countsAs": 2,
    "requirementText": "Pré-requisito: dilacerante"
  },
  {
    "id": "enc_magnifica",
    "name": "Magnífica",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma é encantada para desferir golpes perfeitos. Ela fornece +4 em testes de ataque e rolagens de dano.",
    "effect": {
      "attackBonus": 4,
      "damageBonus": 4
    },
    "countsAs": 2,
    "requirementText": "Pré-requisito: formidável"
  },
  {
    "id": "enc_piedosa",
    "name": "Piedosa",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma causa +1d8 de dano, mas todo o dano causado é não letal. Você pode gastar 1 PM para desativar e ativar este encanto.",
    "effect": {}
  },
  {
    "id": "enc_profana",
    "name": "Profana",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma causa +2d8 de dano contra devotos de deuses que canalizam apenas energia positiva e criaturas bondosas (a critério do mestre). Uma arma profana emite luz rubra pulsante.",
    "effect": {
      "customText": "+2d6 de trevas contra devotos do Bem"
    }
  },
  {
    "id": "enc_sagrada",
    "name": "Sagrada",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma causa +2d8 de dano contra devotos de deuses que canalizam apenas energia negativa e criaturas malignas (a critério do mestre). Uma arma sagrada emite uma sutil luz pura.",
    "effect": {
      "customText": "+2d6 radiante contra mortos-vivos e devotos do Mal"
    }
  },
  {
    "id": "enc_sanguinaria",
    "name": "Sanguinária",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "Uma criatura viva atingida fica sangrando. A perda de PV por sangramento causada pela arma é cumulativa — uma criatura atingida duas vezes perde 2d6 PV por sangramento por rodada.",
    "effect": {
      "customText": "Aplica condição sangrando (1d6/rodada)"
    }
  },
  {
    "id": "enc_trovejante",
    "name": "Trovejante",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma emite um trovão ribombante a cada golpe. Quando você faz um acerto crítico, a vítima fica atordoada por uma rodada (apenas uma vez por cena; Fort CD For ou Des, a sua escolha, evita).",
    "effect": {
      "customText": "+1d8 de trovão e ensurdece em acertos críticos"
    }
  },
  {
    "id": "enc_tumular",
    "name": "Tumular",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "A arma causa +1d8 de dano de trevas. Uma vez por rodada, quando ataca, você pode gastar 2 PM. Se fizer isso, o bônus de dano aumenta para +2d8, mas você perde 1d8 pontos de vida. Uma arma tumular drena o calor ao redor.",
    "effect": {
      "customText": "+1d8 de dano de trevas"
    }
  },
  {
    "id": "enc_veloz",
    "name": "Veloz",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "Você recebe a habilidade Ataque Extra, do guerreiro, mas só pode usá-la com esta arma. Se já a possui, em vez disso, o custo para usá-la com esta arma diminui em –1 PM.",
    "effect": {
      "customText": "Concede ataque extra ou reduz custo em -1 PM"
    }
  },
  {
    "id": "enc_venenosa",
    "name": "Venenosa",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "Uma vez por rodada, quando ataca, você pode gastar 2 PM. Se fizer isso e acertar o ataque, a vítima fica envenenada, perdendo 1d12 pontos de vida por rodada durante 3 rodadas. Uma arma venenosa verte um líquido verde e viscoso.",
    "effect": {
      "customText": "Gasta 2 PM para envenenar (1d12 por 3 rodadas)"
    }
  },
  {
    "id": "enc_abascanto",
    "name": "Abascanto",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Você recebe resistência a magia +5.",
    "effect": {
      "customText": "Resistência a Magia +5"
    }
  },
  {
    "id": "enc_abencoado",
    "name": "Abençoado",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Você recebe redução de trevas 10 e +5 em testes de resistência contra efeitos de necromancia. Um item abençoado é decorado com gravuras de símbolos sagrados de deuses do Bem.",
    "effect": {
      "customText": "Redução de Trevas 10 e +5 contra necromancia"
    }
  },
  {
    "id": "enc_acrobatico",
    "name": "Acrobático",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Você recebe +5 em Acrobacia e ignora a penalidade de armadura do item para testes dessa perícia.",
    "effect": {
      "customText": "+5 em Acrobacia e anula penalidade na perícia"
    }
  },
  {
    "id": "enc_alado",
    "name": "Alado",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Você pode gastar 2 PM para fazer asas emergirem de suas costas e receber deslocamento de voo 12m com duração sustentada.",
    "effect": {
      "customText": "Gasta 2 PM para voo 12m sustentado"
    }
  },
  {
    "id": "enc_animado",
    "name": "Animado",
    "type": "encanto",
    "targetCategories": [
      "escudo"
    ],
    "description": "Você pode gastar uma ação de movimento e 1 PM para fazer o escudo flutuar ao seu redor até o fim da cena. Você recebe o mesmo bônus na Defesa que receberia se estivesse empunhando o escudo, mas fica com as duas mãos livres. Você só pode ser protegido por um escudo ao mesmo tempo.",
    "effect": {
      "customText": "Escudo flutua sozinho (duas mãos livres)"
    }
  },
  {
    "id": "enc_assustador",
    "name": "Assustador",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Você pode gastar uma ação de movimento e 2 PM para gerar uma onda de medo. Inimigos em alcance curto devem passar num teste de Vontade (CD Car) ou ficarão abalados até o fim da cena. Um item assustador possui manchas de sangue, ossos pendurados e outras decorações horripilantes.",
    "effect": {
      "customText": "Onda de medo: deixa inimigos abalados (CD Car)"
    }
  },
  {
    "id": "enc_caustica",
    "name": "Cáustica",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Você recebe redução de ácido 10 e pode gastar uma ação de movimento e 2 PM para fazer o item gotejar ácido. Se fizer isso, seus ataques causam +1d4 de dano de ácido até o fim da cena.",
    "effect": {
      "customText": "Redução de Ácido 10 e +1d4 ácido em ataques"
    }
  },
  {
    "id": "enc_defensor_armadura",
    "name": "Defensor",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "O item é encantado para desviar golpes. O bônus na Defesa do item aumenta em +2.",
    "effect": {
      "defenseBonus": 2
    }
  },
  {
    "id": "enc_escorregadio",
    "name": "Escorregadio",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Você recebe +10 em testes de Acrobacia para escapar e em testes de manobra contra agarrar. Um item escorregadio parece estar sempre coberto de óleo levemente gorduroso. Lâmina da Luz. De lâmina prateada e reluzente, esta espada bastarda formidável é concedida a cavaleiros da Luz de honra e virtude comprovadas. Você pode gastar uma ação de movimento e 2 PM para erguer a lâmina da luz acima de sua cabeça. Se fizer isso, ela irradia luz brilhante em alcance médio até o fim da cena. Todos os inimigos dentro da luz ficam ofuscados. Lança Animalesca. Espinhos e folhas vivas brotam desta lança formidável. Se você usar a habilidade Forma Selvagem, aplica o bônus de +2 em ataque e dano da lança animalesca em suas armas naturais. Língua do Deserto. Esta cimitarra formidável é originária do Deserto da Perdição. Você pode gastar uma ação de movimento e 1 PM para transformar a lâmina dela em chamas até o fim da cena. Nessa condição, o dano da arma aumenta em um passo e passa a ser do tipo fogo. Você pode gastar uma ação de movimento e 2 PM para fazer as chamas brilharem com muita força. Isso deixa os inimigos em alcance curto desprevenidos por uma rodada. Maça do Terror. Esta maça formidável é feita com um osso e um crânio e permite que você lance a magia Amedrontar (CD For ou Car a sua escolha). Caso já conheça a magia, o custo para lançá-la diminui em –1 PM. Machado Silvestre. O cabo e a lâmina deste machado de batalha formidável são cobertos de gravuras representando plantas e animais selvagens. Quando você usa o machado silvestre em um ambiente ermo e ao ar livre, causa +1d8 de dano e recebe o poder Trespassar. Caso já possua este poder, pode utilizá-lo sem pagar pontos de mana. Martelo de Doherimm. Este martelo de guerra formidável é feito de pedra e aço. Quando empunhado por um anão, adquire o encanto arremesso e aumenta seu dano em +1d8 (ou +2d8 se usado contra criaturas Grandes ou maiores). Punhal Sszzaazita. Esta adaga assassina formidável venenosa tem lâmina negra e ondulada. Você pode gastar uma ação padrão e 2 PM para transformar o punhal sszzaazita em um objeto inofensivo de tamanho similar, como uma colher ou pena. Nenhuma magia é capaz de detectar essa transformação. Transformar o punhal em arma é uma ação livre. Vingadora",
    "effect": {
      "customText": "+10 para escapar e contra manobras de agarrar"
    }
  },
  {
    "id": "enc_esmagador",
    "name": "Esmagador",
    "type": "encanto",
    "targetCategories": [
      "escudo"
    ],
    "description": "Este escudo fornece +2 em ataques e dano e tem seu dano aumentado em um passo.",
    "effect": {
      "customText": "+2 ataque/dano e aumenta o passo de dano"
    }
  },
  {
    "id": "enc_fantasmagorico",
    "name": "Fantasmagórico",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Você pode lançar a magia Manto de Sombras. Um item fantasmagórico é cinzento e esfumaçado.",
    "effect": {
      "customText": "Permite lançar Manto de Sombras"
    }
  },
  {
    "id": "enc_fortificado",
    "name": "Fortificado",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Você recebe 25% de chance (para escudos) e 50% de chance (para armaduras) de ignorar o dano extra de acertos críticos e ataques furtivos.",
    "effect": {
      "customText": "25% (escudo) ou 50% (armadura) de anular críticos e furtivos"
    }
  },
  {
    "id": "enc_gelido",
    "name": "Gélido",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Você recebe redução de frio 10 e pode gastar uma ação de movimento e 2 PM para se cobrir de gelo até o fim da cena. Se fizer isso, recebe 10 PV temporários. Um item gélido é azulado e frio ao toque.",
    "effect": {
      "customText": "Redução de Frio 10 e +10 PV temporários"
    }
  },
  {
    "id": "enc_guardiao_armadura",
    "name": "Guardião",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "O item emite um campo de força que desvia ataques. O bônus na Defesa do item aumenta em +4.",
    "effect": {
      "defenseBonus": 4
    },
    "countsAs": 2,
    "requirementText": "Pré-requisito: defensor"
  },
  {
    "id": "enc_hipnotico",
    "name": "Hipnótico",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Você pode gastar uma ação padrão e 3 PM para emitir luzes coloridas. Inimigos em alcance curto devem passar num teste de Vontade (CD Car) ou ficarão fascinados por 1d6 rodadas. O efeito termina se qualquer criatura afetada for atacada. Um item hipnótico é espalhafatoso e colorido.",
    "effect": {
      "customText": "Gasta 3 PM para fascinar inimigos (CD Car)"
    }
  },
  {
    "id": "enc_ilusorio",
    "name": "Ilusório",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Você pode gastar uma ação de movimento e 1 PM para fazer o item adquirir a aparência de uma roupa comum, mas mantendo suas propriedades (bônus na Defesa, penalidade de armadura...). A magia Visão da Verdade revela o item disfarçado.",
    "effect": {
      "customText": "Disfarça a armadura como roupa comum"
    }
  },
  {
    "id": "enc_incandescente",
    "name": "Incandescente",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Você recebe redução de fogo 10 e pode gastar uma ação de movimento e 2 PM para fazer o item emitir labaredas até o fim da cena. Se fizer isso, no início de cada um de seus turnos você causa 1d6 pontos de dano de fogo em todas as criaturas adjacentes. Um item incandescente é avermelhado e quente ao toque.",
    "effect": {
      "customText": "Redução de Fogo 10 e causa 1d6 de fogo adjacente"
    }
  },
  {
    "id": "enc_invulneravel",
    "name": "Invulnerável",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Você recebe redução de dano 2 (para escudos) ou 5 (para armaduras).",
    "effect": {
      "customText": "Redução de Dano RD 2 (escudo) ou RD 5 (armadura)"
    }
  },
  {
    "id": "enc_opaco",
    "name": "Opaco",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Você recebe redução de ácido, eletricidade, fogo e frio 10. Um item opaco parece sem cor, totalmente comum e desinteressante.",
    "effect": {
      "customText": "Redução elemental 10 (ácido, fogo, frio, choque)"
    }
  },
  {
    "id": "enc_protetor",
    "name": "Protetor",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Você recebe +2 em testes de resistência.",
    "effect": {
      "resistanceBonus": 2
    }
  },
  {
    "id": "enc_refletor",
    "name": "Refletor",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Uma vez por rodada, quando você é alvo de uma magia, pode gastar PM igual ao custo dela para refleti-la de volta ao conjurador. As características da magia (efeitos, CD...) se mantêm, mas você toma qualquer decisão exigida por ela. Um item refletor parece espelhado.",
    "effect": {
      "customText": "Permite refletir magias de volta ao conjurador"
    }
  },
  {
    "id": "enc_relampejante",
    "name": "Relampejante",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Você recebe redução de eletricidade 10 e pode gastar uma ação de movimento e 2 PM para gerar arcos voltaicos até o fim da cena. Se fizer isso, qualquer criatura que o ataque em corpo a",
    "effect": {
      "customText": "Redução Eletricidade 10 e contra-ataque de 2d6 elétrico"
    }
  },
  {
    "id": "enc_reluzente",
    "name": "Reluzente",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Você pode gastar uma ação de movimento e 2 PM para emitir um clarão de luz. Todos os inimigos em alcance curto devem passar num teste de Reflexos (CD Car) ou ficarão cegos por uma rodada. Um item reluzente é polido e brilhante.",
    "effect": {
      "customText": "Clarão ofuscante: cega inimigos por 1 rodada"
    }
  },
  {
    "id": "enc_sombrio",
    "name": "Sombrio",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Você recebe +5 em Furtividade e ignora a penalidade de armadura do item para testes dessa perícia. Um item sombrio é escuro, fosco e bem lubrificado, para não fazer barulho.",
    "effect": {
      "customText": "+5 em Furtividade e anula penalidade na perícia"
    }
  },
  {
    "id": "enc_zeloso",
    "name": "Zeloso",
    "type": "encanto",
    "targetCategories": [
      "armadura",
      "escudo"
    ],
    "description": "Uma vez por rodada, se um aliado adjacente for alvo de um ataque, você pode gastar 1 PM para se tornar o alvo do ataque, que então é resolvido normalmente.",
    "effect": {
      "customText": "Gasta 1 PM para proteger aliado adjacente"
    }
  }
];

/**
 * Valida se um modificador pode ser aplicado a um item específico (estilo The Bazaar)
 */
export function canApplyModifier(
  item: EquipmentItem,
  modifier: ItemModifier,
  alreadyAppliedIds: string[]
): { allowed: boolean; reason?: string } {
  const isWeapon = item.category.startsWith('arma');
  const isArmor = item.category.startsWith('armadura');
  const isShield = item.category === 'escudo';
  const isEsoteric = item.category === 'esoterico';
  const isAlchemy = item.category === 'alquimia';
  const isGeneral = item.category === 'item_geral';

  // 1. Limite de slots
  if (modifier.type === 'melhoria' || modifier.type === 'material_especial') {
    const currentImprovementsCount = alreadyAppliedIds.filter((id) => {
      const m = ITEM_MODIFIERS_LIST.find((x) => x.id === id);
      return m && (m.type === 'melhoria' || m.type === 'material_especial');
    }).length;

    if (currentImprovementsCount >= 4) {
      return { allowed: false, reason: 'Um item pode receber no máximo 4 melhorias (incluindo material especial).' };
    }
  } else if (modifier.type === 'encanto') {
    // Encantos com * contam como dois (Tabelas 8-8 e 8-10, Cap. 8)
    const currentEnchantmentsCount = alreadyAppliedIds.reduce((sum, id) => {
      const m = ITEM_MODIFIERS_LIST.find((x) => x.id === id);
      return m && m.type === 'encanto' ? sum + (m.countsAs || 1) : sum;
    }, 0);

    if (currentEnchantmentsCount + (modifier.countsAs || 1) > 3) {
      return { allowed: false, reason: 'Um item mágico pode possuir no máximo 3 encantos (item maior).' };
    }
  }

  // 2. Apenas 1 material especial por item
  if (modifier.type === 'material_especial') {
    const hasMaterial = alreadyAppliedIds.some((id) => {
      const m = ITEM_MODIFIERS_LIST.find((x) => x.id === id);
      return m && m.type === 'material_especial';
    });
    if (hasMaterial) {
      return { allowed: false, reason: 'Um item só pode ser forjado com um único material especial.' };
    }
  }

  // 3. Validação de categorias alvo
  let categoryMatches = false;
  for (const cat of modifier.targetCategories) {
    if (cat === 'arma' && isWeapon) categoryMatches = true;
    else if (cat === 'armadura' && isArmor) categoryMatches = true;
    else if (cat === item.category) categoryMatches = true;
    else if (cat === 'escudo' && isShield) categoryMatches = true;
    else if (cat === 'esoterico' && isEsoteric) categoryMatches = true;
    else if (cat === 'alquimia' && isAlchemy) categoryMatches = true;
    else if (cat === 'item_geral' && isGeneral) categoryMatches = true;
    // "Melhorias para qualquer das categorias acima": armas, armaduras, escudos, esotéricos, ferramentas e vestuário (Tabela 3-8)
    else if (cat === 'qualquer' && (isWeapon || isArmor || isShield || isEsoteric || item.category === 'ferramenta' || item.category === 'vestuario'))
      categoryMatches = true;
  }

  if (!categoryMatches) {
    return {
      allowed: false,
      reason: `Incompatível: aplicável apenas a ${modifier.targetCategories.join(', ').replace(/_/g, ' ')}.`,
    };
  }

  // 4. Pré-requisitos de encantos e melhorias avançadas
  if (modifier.id === 'pungente' && !alreadyAppliedIds.includes('certeira')) {
    return { allowed: false, reason: 'Requer Certeira previamente aplicada.' };
  }
  if (modifier.id === 'atroz' && !alreadyAppliedIds.includes('cruel')) {
    return { allowed: false, reason: 'Requer Cruel previamente aplicada.' };
  }
  if (modifier.id === 'harmonizada' && !alreadyAppliedIds.some((id) => ITEM_MODIFIERS_LIST.find((x) => x.id === id)?.type === 'melhoria')) {
    return { allowed: false, reason: 'Requer outra melhoria qualquer (Cap. 3, pág. 165).' };
  }
  // Pré-requisito por nome ("Pré-requisito: Formidável", "Pré-requisito: Defensor"...)
  const req = /^Pré-requisito: (.+)$/.exec(modifier.requirementText || '');
  if (req && !/outra melhoria/i.test(req[1])) {
    const needed = ITEM_MODIFIERS_LIST.find((x) => x.name.toLowerCase() === req[1].toLowerCase());
    if (needed && !alreadyAppliedIds.includes(needed.id)) {
      return { allowed: false, reason: `Requer ${needed.name} previamente aplicado.` };
    }
  }
  const clash = (modifier.incompatibleWith || []).find((id) => alreadyAppliedIds.includes(id));
  if (clash) {
    return { allowed: false, reason: `Incompatível com ${ITEM_MODIFIERS_LIST.find((x) => x.id === clash)?.name || clash}.` };
  }
  if (modifier.id === 'sob_medida' && !alreadyAppliedIds.includes('ajustada')) {
    return { allowed: false, reason: 'Requer Ajustada previamente aplicada.' };
  }
  if (modifier.id === 'enc_magnifica' && !alreadyAppliedIds.includes('enc_formidavel')) {
    return { allowed: false, reason: 'Requer encanto Formidável previamente aplicado.' };
  }
  if (modifier.id === 'enc_guardiana_arma' && !alreadyAppliedIds.includes('enc_defensora_arma')) {
    return { allowed: false, reason: 'Requer encanto Defensora previamente aplicado.' };
  }
  if (modifier.id === 'enc_guardiao_armadura' && !alreadyAppliedIds.includes('enc_defensor_armadura')) {
    return { allowed: false, reason: 'Requer encanto Defensor previamente aplicado.' };
  }

  // 5. Restrições específicas de itens
  if (modifier.id === 'delicada' && item.category !== 'armadura_pesada') {
    return { allowed: false, reason: 'Apenas armaduras pesadas podem receber Delicada.' };
  }
  if (modifier.id === 'selada' && item.category !== 'armadura_pesada') {
    return { allowed: false, reason: 'Apenas armaduras pesadas podem ser Seladas.' };
  }
  if (modifier.id === 'vigilante' && !isShield) {
    return { allowed: false, reason: 'Apenas escudos podem receber a melhoria Vigilante.' };
  }
  if (modifier.id === 'enc_animado' && !isShield) {
    return { allowed: false, reason: 'O encanto Animado só pode ser aplicado a escudos.' };
  }
  if (modifier.id === 'enc_esmagador' && !isShield) {
    return { allowed: false, reason: 'O encanto Esmagador só pode ser aplicado a escudos.' };
  }
  if (modifier.id === 'enc_refletor' && !isShield) {
    return { allowed: false, reason: 'O encanto Refletor só pode ser aplicado a escudos.' };
  }
  if (modifier.id === 'madeira_tollon') {
    if (isArmor && item.category !== 'armadura_leve') {
      return { allowed: false, reason: 'Madeira Tollon não pode ser usada para forjar armaduras pesadas metálicas.' };
    }
    if (isShield && item.id !== 'escudo_leve') {
      return { allowed: false, reason: 'Apenas escudos leves podem ser feitos de Madeira Tollon.' };
    }
  }

  return { allowed: true };
}

export const MODIFIER_DEPENDENTS: Record<string, string[]> = {
  certeira: ['pungente'],
  cruel: ['atroz'],
  ajustada: ['sob_medida'],
  enc_formidavel: ['enc_magnifica'],
  enc_defensora_arma: ['enc_guardiana_arma'],
  enc_defensor_armadura: ['enc_guardiao_armadura'],
};

/**
 * Retorna todos os IDs de modificadores que dependem direta ou indiretamente de um modificador.
 */
export function getDependentModifierIds(modifierId: string): string[] {
  const result: string[] = [];
  const queue = [...(MODIFIER_DEPENDENTS[modifierId] || [])];
  while (queue.length > 0) {
    const current = queue.shift()!;
    if (!result.includes(current)) {
      result.push(current);
      if (MODIFIER_DEPENDENTS[current]) {
        queue.push(...MODIFIER_DEPENDENTS[current]);
      }
    }
  }
  return result;
}

/**
 * Remove um modificador e todos os seus dependentes de uma lista de modificadores ativos.
 */
export function removeModifierWithDependents(modifierId: string, currentList: string[]): string[] {
  const dependents = getDependentModifierIds(modifierId);
  const toRemove = new Set([modifierId, ...dependents]);
  return currentList.filter((id) => !toRemove.has(id));
}

/**
 * Garante que nenhum modificador filho permaneça selecionado caso seu pré-requisito não esteja presente.
 */
export function sanitizeModifiers(modifierIds: string[]): string[] {
  let list = [...modifierIds];
  let changed = true;
  while (changed) {
    changed = false;
    for (const [parentId, dependents] of Object.entries(MODIFIER_DEPENDENTS)) {
      if (!list.includes(parentId)) {
        for (const dep of dependents) {
          if (list.includes(dep)) {
            list = list.filter((id) => id !== dep);
            changed = true;
          }
        }
      }
    }
  }
  return list;
}

/**
 * Tabela de passos de dano oficiais de Tormenta 20 (Capítulo 3, pág. 144)
 */
const DAMAGE_STEPS: Record<string, string> = {
  '1': '1d2',
  '1d2': '1d3',
  '1d3': '1d4',
  '1d4': '1d6',
  '1d6': '1d8',
  '1d8': '1d10',
  '1d10': '1d12',
  '1d12': '3d6',
  '2d4': '2d6',
  '2d6': '2d8',
  '2d8': '3d8',
  '2d10': '3d10',
  '2d12': '4d10',
};

/**
 * Calcula o custo total e as estatísticas de um item com modificadores aplicados.
 */
export function calculateModifiedItem(
  item: EquipmentItem,
  appliedModifierIds: string[]
): {
  name: string;
  totalPrice: number;
  totalPriceStr: string;
  defenseBonus: number;
  armorPenalty: number;
  spaces: number;
  critThreat: number;
  critMultiplier: number;
  criticalStr: string;
  attackBonus: number;
  damage: string;
  additionalEffects: string[];
} {
  const cleanPrice = parseFloat(item.price.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
  let totalPrice = cleanPrice;

  const appliedModifiers = appliedModifierIds
    .map((id) => ITEM_MODIFIERS_LIST.find((m) => m.id === id))
    .filter(Boolean) as ItemModifier[];

  // Contagem de melhorias (incluindo materiais especiais que ocupam slot)
  const improvementsCount = appliedModifiers.filter(
    (m) => m.type === 'melhoria' || m.type === 'material_especial'
  ).length;

  if (improvementsCount > 0 && improvementsCount <= 4) {
    totalPrice += IMPROVEMENT_TIER_COSTS[improvementsCount] || 0;
  }

  // Contagem de encantos mágicos
  const enchantmentsCount = appliedModifiers.filter((m) => m.type === 'encanto').reduce((sum, m) => sum + (m.countsAs || 1), 0);
  if (enchantmentsCount > 0 && enchantmentsCount <= 3) {
    totalPrice += ENCHANTMENT_TIER_COSTS[enchantmentsCount] || 0;
  }

  let defenseBonus = item.defenseBonus || 0;
  let armorPenalty = item.armorPenalty || 0;
  let spaces = item.spaces;
  let critThreat = 20;
  let critMultiplier = 2;

  // Analisa crítico base da arma
  if (item.critical) {
    if (item.critical.includes('/x')) {
      const parts = item.critical.split('/x');
      critThreat = parseInt(parts[0], 10) || 20;
      critMultiplier = parseInt(parts[1], 10) || 2;
    } else if (item.critical.startsWith('x')) {
      critMultiplier = parseInt(item.critical.replace('x', ''), 10) || 2;
    } else {
      critThreat = parseInt(item.critical, 10) || 20;
    }
  }

  // Dano base e passos
  let baseDamageDice = item.damage || '';
  const isWeapon = item.category.startsWith('arma');
  const hasAdamante = appliedModifiers.some((m) => m.id === 'adamante');
  if (hasAdamante && isWeapon && baseDamageDice) {
    const cleanDice = baseDamageDice.toLowerCase().trim();
    if (DAMAGE_STEPS[cleanDice]) {
      baseDamageDice = DAMAGE_STEPS[cleanDice];
    }
  }

  let attackBonus = item.attackBonus || 0;
  let flatDamageBonus = 0;
  const extraDamageTypes: string[] = [];

  // Cálculos de bônus cumulativos e substituições
  // Ataque: Pungente substitui Certeira; Magnífica substitui Formidável
  if (appliedModifierIds.includes('pungente')) {
    attackBonus += 2;
  } else if (appliedModifierIds.includes('certeira')) {
    attackBonus += 1;
  }

  if (appliedModifierIds.includes('enc_magnifica')) {
    attackBonus += 4;
    flatDamageBonus += 4;
  } else if (appliedModifierIds.includes('enc_formidavel')) {
    attackBonus += 2;
    flatDamageBonus += 2;
  }

  // Dano: Atroz substitui Cruel
  if (appliedModifierIds.includes('atroz')) {
    flatDamageBonus += 2;
  } else if (appliedModifierIds.includes('cruel')) {
    flatDamageBonus += 1;
  }

  // Matéria Vermelha — arma: +1d6 de dano extra, mas o usuário perde 1 PV a cada acerto (Cap. 3, pág. 167)
  if (appliedModifierIds.includes('materia_vermelha') && isWeapon) {
    extraDamageTypes.push('+1d6 (matéria vermelha; perde 1 PV a cada acerto)');
  }

  // Margem de Ameaça e Multiplicador de Crítico
  let threatBonus = 0;
  if (appliedModifierIds.includes('precisa')) threatBonus += 1;
  if (appliedModifierIds.includes('mitral') && isWeapon) threatBonus += 1;

  // Aplica redução na margem de ameaça antes de Ameaçadora
  critThreat = Math.max(12, critThreat - threatBonus);

  // Ameaçadora duplica a margem de ameaça (o intervalo de números que ameaçam)
  if (appliedModifierIds.includes('enc_ameacadora') && isWeapon) {
    const margin = (21 - critThreat); // ex: se critThreat é 19, margem é 2 (19, 20)
    const newMargin = margin * 2;     // vira 4 -> novo critThreat é 21 - 4 = 17
    critThreat = Math.max(10, 21 - newMargin);
  }

  // Multiplicador de crítico
  if (appliedModifierIds.includes('macica')) critMultiplier += 1;
  if (appliedModifierIds.includes('enc_destruidora')) critMultiplier += 1;

  // Defesa: Guardião substitui Defensor
  if (appliedModifierIds.includes('enc_guardiao_armadura')) {
    defenseBonus += 4;
  } else if (appliedModifierIds.includes('enc_defensor_armadura')) {
    defenseBonus += 2;
  }

  if (appliedModifierIds.includes('enc_guardiana_arma')) {
    defenseBonus += 4;
  } else if (appliedModifierIds.includes('enc_defensora_arma')) {
    defenseBonus += 2;
  }

  // Reforçada: bônus na Defesa e penalidade de armadura aumentam em 1 (Cap. 3, pág. 166)
  if (appliedModifierIds.includes('reforcada')) {
    defenseBonus += 1;
    armorPenalty -= 1;
  }

  // Penalidade de armadura: Sob Medida substitui Ajustada
  if (appliedModifierIds.includes('sob_medida')) {
    armorPenalty = Math.min(0, armorPenalty + 2); // reduz penalidade
  } else if (appliedModifierIds.includes('ajustada')) {
    armorPenalty = Math.min(0, armorPenalty + 1);
  }

  // Mitral: itens ocupam –1 espaço (mínimo 1); armaduras e escudos têm penalidade –2 menor (Cap. 3, pág. 167)
  if (appliedModifierIds.includes('mitral')) {
    spaces = Math.max(1, spaces - 1);
    if (!isWeapon) armorPenalty = Math.min(0, armorPenalty + 2);
  }
  // Discreto: –1 espaço (mínimo 1) (Cap. 3, pág. 165)
  if (appliedModifierIds.includes('discreto')) spaces = Math.max(1, spaces - 1);

  // Encantos de dano extra elemental
  if (appliedModifierIds.includes('enc_flamejante')) extraDamageTypes.push('+1d6 fogo');
  if (appliedModifierIds.includes('enc_congelante')) extraDamageTypes.push('+1d6 frio');
  // Gelo Eterno — arma: +2 pontos de dano por frio (Cap. 3, pág. 167)
  if (appliedModifierIds.includes('gelo_eterno') && isWeapon) extraDamageTypes.push('+2 frio');
  if (appliedModifierIds.includes('enc_corrosiva')) extraDamageTypes.push('+1d6 ácido');
  if (appliedModifierIds.includes('enc_eletrica')) extraDamageTypes.push('+1d6 eletricidade');
  if (appliedModifierIds.includes('enc_trovejante')) extraDamageTypes.push('+1d8 trovão');
  if (appliedModifierIds.includes('enc_tumular')) extraDamageTypes.push('+1d8 trevas');
  if (appliedModifierIds.includes('enc_sagrada')) extraDamageTypes.push('+2d6 radiante');
  if (appliedModifierIds.includes('enc_profana')) extraDamageTypes.push('+2d6 trevas');

  const additionalEffects: string[] = [];
  const namePrefixes: string[] = [];
  const nameSuffixes: string[] = [];

  for (const mod of appliedModifiers) {
    if (mod.type === 'material_especial') {
      nameSuffixes.push(`de ${mod.name}`);
      if (mod.priceByItemType) {
        let itemCatKey: 'arma' | 'armadura_leve' | 'armadura_pesada' | 'escudo' | 'esoterico' = 'arma';
        if (item.category.startsWith('arma')) itemCatKey = 'arma';
        else if (item.category === 'armadura_leve') itemCatKey = 'armadura_leve';
        else if (item.category === 'armadura_pesada') itemCatKey = 'armadura_pesada';
        else if (item.category === 'escudo') itemCatKey = 'escudo';
        else if (item.category === 'esoterico') itemCatKey = 'esoterico';

        totalPrice += mod.priceByItemType[itemCatKey] || 0;
      }
    } else if (mod.type === 'encanto') {
      nameSuffixes.push(mod.name);
    } else {
      namePrefixes.push(mod.name);
    }

    if (mod.effect.customText) additionalEffects.push(mod.effect.customText);
  }

  // Monta nome composto
  let compiledName = item.name;
  if (namePrefixes.length > 0) {
    compiledName = `${compiledName} ${namePrefixes.join(' ')}`;
  }
  if (nameSuffixes.length > 0) {
    compiledName = `${compiledName} ${nameSuffixes.join(' ')}`;
  }

  // Monta string de dano final formatada
  let compiledDamage = baseDamageDice;
  if (baseDamageDice) {
    if (flatDamageBonus > 0) {
      compiledDamage = `${baseDamageDice} + ${flatDamageBonus}`;
    }
    if (extraDamageTypes.length > 0) {
      compiledDamage = `${compiledDamage} (${extraDamageTypes.join(', ')})`;
    }
  }

  // Monta string de crítico formatada
  let criticalStr = item.critical || 'x2';
  if (critThreat < 20) {
    criticalStr = `${critThreat}/x${critMultiplier}`;
  } else {
    criticalStr = `x${critMultiplier}`;
  }

  return {
    name: compiledName,
    totalPrice,
    totalPriceStr: `T$ ${totalPrice.toLocaleString('pt-BR')}`,
    defenseBonus,
    armorPenalty,
    spaces,
    critThreat,
    critMultiplier,
    criticalStr,
    attackBonus,
    damage: compiledDamage,
    additionalEffects,
  };
}
