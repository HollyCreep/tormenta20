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
    "description": "A arma é balanceada com precisão absoluta, fornecendo +1 em testes de ataque.",
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
    "requirementText": "Requer: Certeira",
    "description": "Fio cirúrgico e tempera máxima, fornecendo +2 em testes de ataque (substitui Certeira).",
    "effect": {
      "attackBonus": 2
    }
  },
  {
    "id": "cruel",
    "name": "Cruel",
    "type": "melhoria",
    "targetCategories": [
      "arma"
    ],
    "description": "Serrilhas e farpas brutais adicionam +1 nas rolagens de dano.",
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
    "requirementText": "Requer: Cruel",
    "description": "Lâmina implacável ou peso esmagador, fornecendo +2 nas rolagens de dano (substitui Cruel).",
    "effect": {
      "damageBonus": 2
    }
  },
  {
    "id": "macica",
    "name": "Maciça",
    "type": "melhoria",
    "targetCategories": [
      "arma"
    ],
    "description": "O multiplicador de crítico da arma aumenta em +1 (ex: de x2 para x3).",
    "effect": {
      "critMultiplierBonus": 1
    }
  },
  {
    "id": "precisa",
    "name": "Precisa",
    "type": "melhoria",
    "targetCategories": [
      "arma"
    ],
    "description": "A margem de ameaça da arma aumenta em +1 (ex: de 20 para 19-20).",
    "effect": {
      "critThreatBonus": 1
    }
  },
  {
    "id": "equilibrada",
    "name": "Equilibrada",
    "type": "melhoria",
    "targetCategories": [
      "arma"
    ],
    "description": "Fornece +2 em testes de manobras de combate realizadas com a arma (como derrubar ou desarmar).",
    "effect": {
      "customText": "+2 em testes de manobra"
    }
  },
  {
    "id": "alongada",
    "name": "Alongada",
    "type": "melhoria",
    "targetCategories": [
      "arma"
    ],
    "description": "Armas de disparo ou arremesso têm seu alcance aumentado em um passo (de curto para médio, etc.).",
    "effect": {
      "customText": "Alcance aumentado em um passo"
    }
  },
  {
    "id": "harmonizada",
    "name": "Harmonizada",
    "type": "melhoria",
    "targetCategories": [
      "arma",
      "esoterico"
    ],
    "description": "O custo em PM de uma habilidade ou magia usada através deste item diminui em -1 PM.",
    "effect": {
      "customText": "-1 PM no custo de habilidade ou magia"
    }
  },
  {
    "id": "injetora",
    "name": "Injetora",
    "type": "melhoria",
    "targetCategories": [
      "arma"
    ],
    "description": "Possui um compartimento que permite aplicar veneno ou óleo como uma ação livre.",
    "effect": {
      "customText": "Aplica venenos como ação livre"
    }
  },
  {
    "id": "recarregavel",
    "name": "Recarregável",
    "type": "melhoria",
    "targetCategories": [
      "arma"
    ],
    "description": "Diminui a ação para recarregar a arma de disparo (ex: ação de movimento vira livre).",
    "effect": {
      "customText": "Reduz tempo de recarga"
    }
  },
  {
    "id": "discreta",
    "name": "Discreta",
    "type": "melhoria",
    "targetCategories": [
      "arma",
      "item_geral"
    ],
    "description": "Pode ser camuflada ou dobrada facilmente, concedendo +5 em testes de Ladinagem para ocultá-la.",
    "effect": {
      "customText": "+5 em Ladinagem para ocultar"
    }
  },
  {
    "id": "reforcada",
    "name": "Reforçada",
    "type": "melhoria",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "Camadas extras de placas e rebites resistentes, fornecendo +1 no bônus de Defesa.",
    "effect": {
      "defenseBonus": 1
    }
  },
  {
    "id": "ajustada",
    "name": "Ajustada",
    "type": "melhoria",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "Modelada com perfeição milimétrica para o usuário, reduz a penalidade de armadura em 1.",
    "effect": {
      "armorPenaltyBonus": 1
    }
  },
  {
    "id": "sob_medida",
    "name": "Sob Medida",
    "type": "melhoria",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "requirementText": "Requer: Ajustada",
    "description": "Confeccionada sob medida ergonômica máxima, reduz a penalidade de armadura em 2 (substitui Ajustada).",
    "effect": {
      "armorPenaltyBonus": 2
    }
  },
  {
    "id": "polida",
    "name": "Polida",
    "type": "melhoria",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "Superfície espelhada que ofusca inimigos na primeira rodada de combate, fornecendo +1 na Defesa durante a primeira rodada.",
    "effect": {
      "customText": "+1 na Defesa na 1ª rodada"
    }
  },
  {
    "id": "espinhosa",
    "name": "Espinhosa",
    "type": "melhoria",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "Cravada de lâminas afiadas, causa 1d6 de dano de perfuração ao agarrar ou ser agarrado.",
    "effect": {
      "customText": "1d6 de perfuração ao agarrar"
    }
  },
  {
    "id": "macia",
    "name": "Macia",
    "type": "melhoria",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada"
    ],
    "description": "Forro aveludado e acolchoamento térmico, permitindo dormir com a armadura sem ficar fatigado.",
    "effect": {
      "customText": "Permite descansar de armadura sem penalidade"
    }
  },
  {
    "id": "selada",
    "name": "Selada",
    "type": "melhoria",
    "targetCategories": [
      "armadura_pesada"
    ],
    "description": "Juntas herméticas que fornecem +2 em testes de resistência contra efeitos gasosos e inalados.",
    "effect": {
      "customText": "+2 contra gases e venenos inalados"
    }
  },
  {
    "id": "delicada",
    "name": "Delicada",
    "type": "melhoria",
    "targetCategories": [
      "armadura_pesada"
    ],
    "description": "Feita com placas articuladas de extrema maleabilidade, reduz a penalidade e anula a restrição de deslocamento da armadura pesada.",
    "effect": {
      "customText": "Não reduz o deslocamento básico"
    }
  },
  {
    "id": "vigilante",
    "name": "Vigilante",
    "type": "melhoria",
    "targetCategories": [
      "escudo"
    ],
    "description": "Possui visores e ranhuras táticas que fornecem +2 em testes de Iniciativa e Percepção.",
    "effect": {
      "customText": "+2 em Iniciativa e Percepção"
    }
  },
  {
    "id": "abundante",
    "name": "Abundante",
    "type": "melhoria",
    "targetCategories": [
      "alquimia",
      "esoterico"
    ],
    "description": "O frasco ou componente é feito para render mais doses ou amplificar a eficácia dos preparos.",
    "effect": {
      "customText": "Aumenta rendimento ou CD em +1"
    }
  },
  {
    "id": "resistente",
    "name": "Resistente",
    "type": "melhoria",
    "targetCategories": [
      "arma",
      "armadura_leve",
      "armadura_pesada",
      "escudo",
      "item_geral"
    ],
    "description": "O item recebe +5 em sua Redução de Dano e o dobro de pontos de vida contra testes de Quebrar Objeto.",
    "effect": {
      "customText": "+5 na Redução de Dano contra quebra"
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
      "escudo"
    ],
    "priceByItemType": {
      "arma": 3000,
      "armadura_leve": 3000,
      "armadura_pesada": 6000,
      "escudo": 3000,
      "esoterico": 3000
    },
    "description": "Minério lendário avermelhado. Armas ignoram até 10 pontos de RD de alvos. Armaduras e escudos fornecem RD 2 contra dano de criaturas da Tormenta e reduzem perda de sanidade.",
    "effect": {
      "customText": "Ignora RD 10 ou concede RD 2 contra Tormenta"
    }
  },
  {
    "id": "adamante",
    "name": "Adamante",
    "type": "material_especial",
    "targetCategories": [
      "arma",
      "armadura_pesada",
      "escudo"
    ],
    "priceByItemType": {
      "arma": 4500,
      "armadura_leve": 4500,
      "armadura_pesada": 7500,
      "escudo": 4500,
      "esoterico": 4500
    },
    "description": "O metal mais duro de Arton. Armas aumentam o passo de dano em um passo. Armaduras pesadas e escudos recebem Redução de Dano (RD 5 para armadura pesada, RD 2 para escudo).",
    "effect": {
      "customText": "Aumenta passo de dano ou fornece RD 5/2"
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
      "escudo"
    ],
    "priceByItemType": {
      "arma": 3000,
      "armadura_leve": 3000,
      "armadura_pesada": 6000,
      "escudo": 3000,
      "esoterico": 3000
    },
    "description": "Gelo perene das Montanhas Uivantes. Armas causam +1d6 de dano de frio adicional. Armaduras e escudos fornecem Resistência a Frio 5.",
    "effect": {
      "customText": "+1d6 de frio ou Resistência a Frio 5"
    }
  },
  {
    "id": "madeira_tollon",
    "name": "Madeira Tollon",
    "type": "material_especial",
    "targetCategories": [
      "arma",
      "armadura_leve",
      "escudo",
      "esoterico"
    ],
    "priceByItemType": {
      "arma": 1500,
      "armadura_leve": 1500,
      "armadura_pesada": 1500,
      "escudo": 1500,
      "esoterico": 1500
    },
    "description": "Madeira leve e mística das florestas de Tollon. O custo de habilidades de combate ou magias usadas através da arma/esotérico diminui em -1 PM. Escudos leves feitos de Tollon reduzem penalidade em 1.",
    "effect": {
      "customText": "-1 PM no custo de habilidades/magias"
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
      "escudo"
    ],
    "priceByItemType": {
      "arma": 3000,
      "armadura_leve": 3000,
      "armadura_pesada": 6000,
      "escudo": 3000,
      "esoterico": 3000
    },
    "description": "Carapaça quitinosa viva arrancada da Área de Tormenta. Fornece +2 em testes de ataque e dano ou +2 na Defesa, mas drena 1 PV do usuário em caso de falha em testes.",
    "effect": {
      "attackBonus": 2,
      "damageBonus": 2,
      "customText": "+2 ataque/dano ou Defesa (Drena 1 PV em falhas)"
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
      "escudo"
    ],
    "priceByItemType": {
      "arma": 3000,
      "armadura_leve": 3000,
      "armadura_pesada": 6000,
      "escudo": 3000,
      "esoterico": 3000
    },
    "description": "Prata verdadeira, reluzente e levíssima. Armas aumentam a margem de ameaça em +1. Armaduras e escudos reduzem sua penalidade de armadura em 2 e têm seu peso/espaço reduzido à metade.",
    "effect": {
      "critThreatBonus": 1,
      "armorPenaltyBonus": 2,
      "spacesModifier": -1
    }
  },
  {
    "id": "enc_ameacadora",
    "name": "Ameaçadora",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "A margem de ameaça do item é duplicada (por exemplo, uma espada longa 19 vira 17, uma adaga 19 vira 17).",
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
    "description": "Fornece +2 nos testes de ataque e rolagens de dano contra um tipo escolhido de criatura.",
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
    "description": "Uma arma corpo a corpo com este encanto pode ser arremessada com alcance curto e retorna voando para sua mão após o ataque.",
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
    "description": "A arma causa +2d6 pontos de dano em ataques nos quais o portador utilize a habilidade Ataque Furtivo.",
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
    "description": "Os ataques desta arma ignoram camuflagem (mesmo total) e cobertura leve ou média de alvos.",
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
    "description": "A lâmina ou projétil é envolto em névoa glacial, causando +1d6 pontos de dano de frio em cada acerto.",
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
    "description": "Pode armazenar uma magia de até 3º círculo lançada nela. Ao acertar um ataque, o portador pode descarregar a magia como ação livre.",
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
    "description": "Goteja ácido verde efervescente, causando +1d6 pontos de dano de ácido a cada acerto.",
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
    "description": "Com uma ação de movimento e 1 PM, a arma flutua e luta sozinha usando as estatísticas do usuário durante 4 rodadas.",
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
    "description": "A arma é encantada com feitiços de proteção e deflexão, fornecendo +2 na Defesa do portador.",
    "effect": {
      "defenseBonus": 2
    }
  },
  {
    "id": "enc_destruidora",
    "name": "Destruidora",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "O multiplicador de acerto crítico da arma aumenta em +1 (ex: de x2 para x3, ou de x3 para x4).",
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
    "description": "Quando acerta um acerto crítico com esta arma, ela causa +10 de dano extra direto aos pontos de vida.",
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
    "description": "Ao acertar um acerto crítico, a arma rouba a energia vital da vítima, restaurando 1 Ponto de Mana do usuário.",
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
    "description": "Relâmpagos azuis estalam pela arma, causando +1d6 pontos de dano de eletricidade a cada acerto.",
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
    "description": "A arma converte seu dano físico em puro dano de essência luminosa, ignorando a Redução de Dano e o bônus na Defesa concedido por armaduras e escudos.",
    "effect": {
      "customText": "Dano de essência pura; ignora armaduras e RD"
    }
  },
  {
    "id": "enc_excruciante",
    "name": "Excruciante",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "Causa uma dor lancinante e paralisante. Uma vítima que sofra dano desta arma deve passar em Fortitude ou fica na condição fraco até o fim da cena.",
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
    "description": "A arma se inflama em labaredas místicas, causando +1d6 pontos de dano de fogo em cada golpe.",
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
    "description": "Encantada com puro poder marcial arcano, concede +2 em todos os testes de ataque e rolagens de dano.",
    "effect": {
      "attackBonus": 2,
      "damageBonus": 2
    }
  },
  {
    "id": "enc_guardiana_arma",
    "name": "Guardiã",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "requirementText": "Requer: Defensora",
    "description": "Campos arcanos de força interceptam projéteis e lâminas, fornecendo +4 na Defesa do portador (substitui Defensora).",
    "effect": {
      "defenseBonus": 4
    }
  },
  {
    "id": "enc_magnifica",
    "name": "Magnífica",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "requirementText": "Requer: Formidável",
    "description": "A arma atinge a perfeição do combate, concedendo +4 em todos os testes de ataque e rolagens de dano (substitui Formidável).",
    "effect": {
      "attackBonus": 4,
      "damageBonus": 4
    }
  },
  {
    "id": "enc_profana",
    "name": "Profana",
    "type": "encanto",
    "targetCategories": [
      "arma"
    ],
    "description": "Banhada em energias profanas do mal, causa +2d6 de dano de trevas contra devotos dos deuses da bondade e alvos bondosos.",
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
    "description": "Consagrada pela justiça divina, causa +2d6 de dano radiante contra mortos-vivos e devotos dos deuses do Mal.",
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
    "description": "Ao causar dano, o alvo começa a sangrar, sofrendo a condição sangrando (1d6 por rodada cumulativo).",
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
    "description": "Ressoa com estrondos ensurdecedores de tempestade, causando +1d8 de dano de trovão em acertos críticos e ensurdecendo inimigos.",
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
    "description": "A arma drena o calor e emana frio fúnebre, causando +1d8 de dano de trevas a cada golpe.",
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
    "description": "O portador pode realizar um ataque adicional por rodada como se tivesse a habilidade Ataque Extra, ou reduz o custo dela em -1 PM.",
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
    "description": "Gaste 2 PM para untar a lâmina instantaneamente com um veneno virulento: a vítima atingida sofre 1d12 de veneno durante 3 rodadas.",
    "effect": {
      "customText": "Gasta 2 PM para envenenar (1d12 por 3 rodadas)"
    }
  },
  {
    "id": "enc_abascanto",
    "name": "Abascanto",
    "type": "encanto",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "Imbuída de runas antimagia artonianas, concede Resistência a Magia +5 nos testes de resistência.",
    "effect": {
      "customText": "Resistência a Magia +5"
    }
  },
  {
    "id": "enc_abencoado",
    "name": "Abençoado",
    "type": "encanto",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "Decorada com símbolos sagrados da Luz, concede Redução de Trevas 10 e +5 contra efeitos de necromancia.",
    "effect": {
      "customText": "Redução de Trevas 10 e +5 contra necromancia"
    }
  },
  {
    "id": "enc_acrobatico",
    "name": "Acrobático",
    "type": "encanto",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "Concede +5 em testes de Acrobacia e anula completamente a penalidade de armadura em testes dessa perícia.",
    "effect": {
      "customText": "+5 em Acrobacia e anula penalidade na perícia"
    }
  },
  {
    "id": "enc_alado",
    "name": "Alado",
    "type": "encanto",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada"
    ],
    "description": "Com uma ação de movimento e 2 PM, asas etéreas brotam das costas concedendo deslocamento de voo de 12m.",
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
    "description": "Apenas escudos. Com uma ação de movimento e 1 PM, o escudo flutua e defende o personagem mantendo ambas as mãos livres.",
    "effect": {
      "customText": "Escudo flutua sozinho (duas mãos livres)"
    }
  },
  {
    "id": "enc_assustador",
    "name": "Assustador",
    "type": "encanto",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "Com uma ação de movimento e 2 PM, gera uma onda de horror que deixa todos os inimigos em alcance curto abalados (CD Car).",
    "effect": {
      "customText": "Onda de medo: deixa inimigos abalados (CD Car)"
    }
  },
  {
    "id": "enc_caustica",
    "name": "Cáustica",
    "type": "encanto",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "Fornece Redução de Ácido 10. Gaste 2 PM para imbuir seus ataques com +1d4 de dano de ácido até o fim da cena.",
    "effect": {
      "customText": "Redução de Ácido 10 e +1d4 ácido em ataques"
    }
  },
  {
    "id": "enc_defensor_armadura",
    "name": "Defensor",
    "type": "encanto",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "O item é encantado para desviar golpes com barreiras invisíveis, aumentando seu bônus na Defesa em +2.",
    "effect": {
      "defenseBonus": 2
    }
  },
  {
    "id": "enc_escorregadio",
    "name": "Escorregadio",
    "type": "encanto",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada"
    ],
    "description": "Revestida de um fluido místico antiaderente, concede +10 em testes de Acrobacia para escapar e contra manobra de agarrar.",
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
    "description": "Apenas escudos. Fornece +2 em testes de ataque e dano com o escudo e aumenta seu dano em um passo.",
    "effect": {
      "customText": "+2 ataque/dano e aumenta o passo de dano"
    }
  },
  {
    "id": "enc_fantasmagorico",
    "name": "Fantasmagórico",
    "type": "encanto",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "Permite ao portador lançar a magia Manto de Sombras, tornando-se incorpóreo e envolto em brumas espectrais.",
    "effect": {
      "customText": "Permite lançar Manto de Sombras"
    }
  },
  {
    "id": "enc_fortificado",
    "name": "Fortificado",
    "type": "encanto",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "Concede 25% de chance (em escudos) ou 50% de chance (em armaduras) de anular completamente o dano extra de ataques furtivos e acertos críticos.",
    "effect": {
      "customText": "25% (escudo) ou 50% (armadura) de anular críticos e furtivos"
    }
  },
  {
    "id": "enc_gelido",
    "name": "Gélido",
    "type": "encanto",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "Fornece Redução de Frio 10. Com 2 PM, o portador cobre-se de gelo místico e ganha 10 PV temporários até o fim da cena.",
    "effect": {
      "customText": "Redução de Frio 10 e +10 PV temporários"
    }
  },
  {
    "id": "enc_guardiao_armadura",
    "name": "Guardião",
    "type": "encanto",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "requirementText": "Requer: Defensor",
    "description": "Cria um poderoso campo estático repulsor, aumentando a Defesa em +4 (substitui Defensor).",
    "effect": {
      "defenseBonus": 4
    }
  },
  {
    "id": "enc_hipnotico",
    "name": "Hipnótico",
    "type": "encanto",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "Com 3 PM, emite padrões multicoloridos pulsantes, deixando todos os inimigos em alcance curto fascinados (CD Car).",
    "effect": {
      "customText": "Gasta 3 PM para fascinar inimigos (CD Car)"
    }
  },
  {
    "id": "enc_ilusorio",
    "name": "Ilusório",
    "type": "encanto",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "Com 1 PM, a armadura assume a aparência ilusória de roupas finas da nobreza ou trajes de plebeu mantendo suas estatísticas.",
    "effect": {
      "customText": "Disfarça a armadura como roupa comum"
    }
  },
  {
    "id": "enc_incandescente",
    "name": "Incandescente",
    "type": "encanto",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "Fornece Redução de Fogo 10. Emite labaredas que causam 1d6 de dano de fogo em todas as criaturas adjacentes no início de cada turno.",
    "effect": {
      "customText": "Redução de Fogo 10 e causa 1d6 de fogo adjacente"
    }
  },
  {
    "id": "enc_invulneravel",
    "name": "Invulnerável",
    "type": "encanto",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "Fornece Redução de Dano permanente: RD 2 para escudos ou RD 5 para armaduras contra qualquer dano físico.",
    "effect": {
      "customText": "Redução de Dano RD 2 (escudo) ou RD 5 (armadura)"
    }
  },
  {
    "id": "enc_opaco",
    "name": "Opaco",
    "type": "encanto",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "Fornece Redução de Dano 10 contra os quatro elementos clássicos: ácido, eletricidade, fogo e frio.",
    "effect": {
      "customText": "Redução elemental 10 (ácido, fogo, frio, choque)"
    }
  },
  {
    "id": "enc_protetor",
    "name": "Protetor",
    "type": "encanto",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "Aura divina de preservação, concedendo +2 em todos os testes de resistência (Fortitude, Reflexos, Vontade).",
    "effect": {
      "customText": "+2 em todos os testes de resistência"
    }
  },
  {
    "id": "enc_refletor",
    "name": "Refletor",
    "type": "encanto",
    "targetCategories": [
      "escudo"
    ],
    "description": "Apenas escudos. Quando for alvo de uma magia inimiga, gaste PM igual ao custo dela para refleti-la de volta ao conjurador.",
    "effect": {
      "customText": "Permite refletir magias de volta ao conjurador"
    }
  },
  {
    "id": "enc_relampejante",
    "name": "Relampejante",
    "type": "encanto",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "Fornece Redução de Eletricidade 10. Qualquer criatura que acerte o portador em corpo a corpo sofre 2d6 de dano de eletricidade.",
    "effect": {
      "customText": "Redução Eletricidade 10 e contra-ataque de 2d6 elétrico"
    }
  },
  {
    "id": "enc_reluzente",
    "name": "Reluzente",
    "type": "encanto",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "Com 2 PM, emite um clarão ofuscante: todos os inimigos em alcance curto que falharem num teste de Reflexos ficam cegos por 1 rodada.",
    "effect": {
      "customText": "Clarão ofuscante: cega inimigos por 1 rodada"
    }
  },
  {
    "id": "enc_sombrio",
    "name": "Sombrio",
    "type": "encanto",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "Acolchoada com tecidos das sombras, concede +5 em Furtividade e ignora totalmente a penalidade de armadura em testes da perícia.",
    "effect": {
      "customText": "+5 em Furtividade e anula penalidade na perícia"
    }
  },
  {
    "id": "enc_zeloso",
    "name": "Zeloso",
    "type": "encanto",
    "targetCategories": [
      "armadura_leve",
      "armadura_pesada",
      "escudo"
    ],
    "description": "Uma vez por rodada, se um aliado adjacente for alvo de um ataque, você pode gastar 1 PM para se tornar o alvo do ataque em seu lugar.",
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
    const currentEnchantmentsCount = alreadyAppliedIds.filter((id) => {
      const m = ITEM_MODIFIERS_LIST.find((x) => x.id === id);
      return m && m.type === 'encanto';
    }).length;

    if (currentEnchantmentsCount >= 3) {
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
  const enchantmentsCount = appliedModifiers.filter((m) => m.type === 'encanto').length;
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

  // Matéria Vermelha (+2 ataque e +2 dano)
  if (appliedModifierIds.includes('materia_vermelha')) {
    attackBonus += 2;
    flatDamageBonus += 2;
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

  if (appliedModifierIds.includes('reforcada')) {
    defenseBonus += 1;
  }

  // Penalidade de armadura: Sob Medida substitui Ajustada
  if (appliedModifierIds.includes('sob_medida')) {
    armorPenalty = Math.min(0, armorPenalty + 2); // reduz penalidade
  } else if (appliedModifierIds.includes('ajustada')) {
    armorPenalty = Math.min(0, armorPenalty + 1);
  }

  if (appliedModifierIds.includes('mitral') && !isWeapon) {
    armorPenalty = Math.min(0, armorPenalty + 2);
    spaces = Math.max(1, spaces - 1);
  }

  // Encantos de dano extra elemental
  if (appliedModifierIds.includes('enc_flamejante')) extraDamageTypes.push('+1d6 fogo');
  if (appliedModifierIds.includes('enc_congelante') || appliedModifierIds.includes('gelo_eterno')) extraDamageTypes.push('+1d6 frio');
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
