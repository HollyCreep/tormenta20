# -*- coding: utf-8 -*-
"""
Generates src/data/equipment.ts for Tormenta 20 JDA.
"""
import json

equipment_raw = [
  # Armaduras Leves
  {
    "id": "armadura_acolchoada",
    "name": "Armadura acolchoada",
    "category": "armadura_leve",
    "price": "T$ 5",
    "defenseBonus": 1,
    "armorPenalty": 0,
    "spaces": 2,
    "description": "Feita de várias camadas de tecido acolchoado. Leve, flexível e discreta, não impõe penalidades em perícias de agilidade."
  },
  {
    "id": "armadura_couro",
    "name": "Armadura de couro",
    "category": "armadura_leve",
    "price": "T$ 20",
    "defenseBonus": 2,
    "armorPenalty": 0,
    "spaces": 2,
    "description": "O peitoral desta armadura é feito de couro curtido fervido em óleo para endurecer, com proteções de couro mais flexível nas articulações."
  },
  {
    "id": "couro_batido",
    "name": "Couro batido",
    "category": "armadura_leve",
    "price": "T$ 35",
    "defenseBonus": 3,
    "armorPenalty": -1,
    "spaces": 2,
    "description": "Uma versão reforçada da armadura de couro, com rebites metálicos densamente cravados para deter cortes de lâminas."
  },
  {
    "id": "gibao_peles",
    "name": "Gibão de peles",
    "category": "armadura_leve",
    "price": "T$ 25",
    "defenseBonus": 4,
    "armorPenalty": -3,
    "spaces": 2,
    "description": "Traje rústico de couro cru grosso e camadas pesadas de peles de animais selvagens. Comum entre bárbaros e povos das montanhas."
  },
  {
    "id": "couraca",
    "name": "Couraça",
    "category": "armadura_leve",
    "price": "T$ 500",
    "defenseBonus": 5,
    "armorPenalty": -4,
    "spaces": 2,
    "description": "Uma placa de aço moldada que cobre o peito e as costas, presa com tiras de couro sobre uma túnica almofadada. A armadura leve mais resistente."
  },

  # Armaduras Pesadas (não aplicam Destreza na Defesa e reduzem deslocamento em -3m)
  {
    "id": "brunea",
    "name": "Brunea",
    "category": "armadura_pesada",
    "price": "T$ 50",
    "defenseBonus": 5,
    "armorPenalty": -2,
    "spaces": 5,
    "description": "Colete de couro pesado coberto com escamas de metal sobrepostas. Não permite aplicar Destreza na Defesa e reduz deslocamento em -3m."
  },
  {
    "id": "cota_malha",
    "name": "Cota de malha",
    "category": "armadura_pesada",
    "price": "T$ 150",
    "defenseBonus": 6,
    "armorPenalty": -2,
    "spaces": 5,
    "description": "Longa camisa feita de milhares de anéis de aço entrelaçados que cobre o torso e as pernas. Não permite aplicar Destreza na Defesa e reduz deslocamento em -3m."
  },
  {
    "id": "loriga_segmentada",
    "name": "Loriga segmentada",
    "category": "armadura_pesada",
    "price": "T$ 250",
    "defenseBonus": 7,
    "armorPenalty": -3,
    "spaces": 5,
    "description": "Composta por tiras horizontais de aço rebitadas sobre couro grosso. Não permite aplicar Destreza na Defesa e reduz deslocamento em -3m."
  },
  {
    "id": "meia_armadura",
    "name": "Meia armadura",
    "category": "armadura_pesada",
    "price": "T$ 600",
    "defenseBonus": 8,
    "armorPenalty": -4,
    "spaces": 5,
    "description": "Combinação de placas de aço protegendo partes vitais com cota de malha flexível nas juntas. Não permite aplicar Destreza na Defesa e reduz deslocamento em -3m."
  },
  {
    "id": "armadura_completa",
    "name": "Armadura completa",
    "category": "armadura_pesada",
    "price": "T$ 3.000",
    "defenseBonus": 10,
    "armorPenalty": -5,
    "spaces": 5,
    "description": "O auge da proteção pessoal em Arton: placas de aço forjadas sob medida que cobrem todo o corpo dos pés à cabeça, com elmo fechado e luvas de ferro."
  },

  # Escudos
  {
    "id": "escudo_leve",
    "name": "Escudo leve",
    "category": "escudo",
    "price": "T$ 5",
    "defenseBonus": 1,
    "armorPenalty": -1,
    "spaces": 1,
    "description": "Escudo redondo ou broquel de madeira reforçado com ferro. Deixa a mão livre para segurar objetos pequenos."
  },
  {
    "id": "escudo_pesado",
    "name": "Escudo pesado",
    "category": "escudo",
    "price": "T$ 15",
    "defenseBonus": 2,
    "armorPenalty": -2,
    "spaces": 2,
    "description": "Escudo grande de aço ou madeira densa com reforço metálico. Ocupa uma das mãos completamente."
  },

  # Armas Simples - Leves
  {
    "id": "adaga",
    "name": "Adaga",
    "category": "arma_simples",
    "subcategory": "leves",
    "price": "T$ 2",
    "damage": "1d4",
    "critical": "19",
    "range": "Curto",
    "damageType": "Perfuração",
    "spaces": 1,
    "description": "Lâmina curta fácil de esconder em botas ou mangas. Pode ser arremessada a alcance curto."
  },
  {
    "id": "espada_curta",
    "name": "Espada curta",
    "category": "arma_simples",
    "subcategory": "leves",
    "price": "T$ 10",
    "damage": "1d6",
    "critical": "19",
    "range": "Corpo a corpo",
    "damageType": "Perfuração",
    "spaces": 1,
    "description": "Espada ágil comum entre soldados de infantaria e patrulheiros urbanos."
  },
  {
    "id": "foice",
    "name": "Foice",
    "category": "arma_simples",
    "subcategory": "leves",
    "price": "T$ 4",
    "damage": "1d6",
    "critical": "x3",
    "range": "Corpo a corpo",
    "damageType": "Corte",
    "spaces": 1,
    "description": "Ferramenta agrícola de lâmina curva adaptada para a defesa pessoal de camponeses."
  },

  # Armas Simples - Uma Mão
  {
    "id": "clava",
    "name": "Clava",
    "category": "arma_simples",
    "subcategory": "uma_mao",
    "price": "T$ 0",
    "damage": "1d6",
    "critical": "x2",
    "range": "Corpo a corpo",
    "damageType": "Impacto",
    "spaces": 1,
    "description": "Pedaço de madeira pesado e nodoso, fácil de encontrar ou improvisar."
  },
  {
    "id": "lanca",
    "name": "Lança",
    "category": "arma_simples",
    "subcategory": "uma_mao",
    "price": "T$ 2",
    "damage": "1d6",
    "critical": "x2",
    "range": "Curto",
    "damageType": "Perfuração",
    "spaces": 1,
    "description": "Haste de madeira com ponta afiada de aço. Pode ser usada em combate corpo a corpo ou arremessada."
  },
  {
    "id": "maca",
    "name": "Maça",
    "category": "arma_simples",
    "subcategory": "uma_mao",
    "price": "T$ 12",
    "damage": "1d8",
    "critical": "x2",
    "range": "Corpo a corpo",
    "damageType": "Impacto",
    "spaces": 1,
    "description": "Arma pesada com cabeça maciça de ferro cheia de arestas, perfeita para amassar armaduras."
  },

  # Armas Simples - Duas Mãos
  {
    "id": "bordao",
    "name": "Bordão",
    "category": "arma_simples",
    "subcategory": "duas_maos",
    "price": "T$ 0",
    "damage": "1d6/1d6",
    "critical": "x2",
    "range": "Corpo a corpo",
    "damageType": "Impacto",
    "spaces": 2,
    "description": "Cajado longo de madeira resistente. Arma dupla que pode ser usada para desferir dois ataques em conjunto."
  },
  {
    "id": "pique",
    "name": "Pique",
    "category": "arma_simples",
    "subcategory": "duas_maos",
    "price": "T$ 2",
    "damage": "1d8",
    "critical": "x2",
    "range": "Corpo a corpo",
    "damageType": "Perfuração",
    "spaces": 2,
    "description": "Lança muito longa de infantaria, excelente para deter investidas montadas."
  },
  {
    "id": "tacape",
    "name": "Tacape",
    "category": "arma_simples",
    "subcategory": "duas_maos",
    "price": "T$ 0",
    "damage": "1d10",
    "critical": "x2",
    "range": "Corpo a corpo",
    "damageType": "Impacto",
    "spaces": 2,
    "description": "Bastão rústico gigantesco entalhado de tronco maciço por bárbaros e trogs."
  },

  # Armas Simples - Distância
  {
    "id": "besta_leve",
    "name": "Besta leve",
    "category": "arma_simples",
    "subcategory": "distancia",
    "price": "T$ 35",
    "damage": "1d8",
    "critical": "19",
    "range": "Médio",
    "damageType": "Perfuração",
    "spaces": 1,
    "description": "Arma mecânica com arco montado sobre coronha de madeira. Dispara virotes com tensão de gatilho."
  },
  {
    "id": "arco_curto",
    "name": "Arco curto",
    "category": "arma_simples",
    "subcategory": "distancia",
    "price": "T$ 30",
    "damage": "1d6",
    "critical": "x3",
    "range": "Médio",
    "damageType": "Perfuração",
    "spaces": 2,
    "description": "Arco simples de madeira flexível, ideal para caçadores e milicianos."
  },
  {
    "id": "funda",
    "name": "Funda",
    "category": "arma_simples",
    "subcategory": "distancia",
    "price": "T$ 0",
    "damage": "1d4",
    "critical": "x2",
    "range": "Médio",
    "damageType": "Impacto",
    "spaces": 1,
    "description": "Tira de couro usada para girar e arremessar pedras esféricas em alta velocidade."
  },

  # Armas Marciais - Uma Mão
  {
    "id": "espada_longa",
    "name": "Espada longa",
    "category": "arma_marcial",
    "subcategory": "uma_mao",
    "price": "T$ 15",
    "damage": "1d8",
    "critical": "19",
    "range": "Corpo a corpo",
    "damageType": "Corte",
    "spaces": 1,
    "description": "A lâmina de combate definitiva do cavaleiro e soldado de Arton, símbolo de coragem e retidão."
  },
  {
    "id": "cimitarra",
    "name": "Cimitarra",
    "category": "arma_marcial",
    "subcategory": "uma_mao",
    "price": "T$ 15",
    "damage": "1d6",
    "critical": "18",
    "range": "Corpo a corpo",
    "damageType": "Corte",
    "spaces": 1,
    "description": "Lâmina curva refinada originária das terras desérticas de Azgher. Margem de crítico ampliada."
  },
  {
    "id": "florete",
    "name": "Florete",
    "category": "arma_marcial",
    "subcategory": "uma_mao",
    "price": "T$ 20",
    "damage": "1d6",
    "critical": "18",
    "range": "Corpo a corpo",
    "damageType": "Perfuração",
    "spaces": 1,
    "description": "Lâmina fina e flexível com guarda em sino, a arma predileta dos bucaneiros e duelistas nobres."
  },
  {
    "id": "machado_batalha",
    "name": "Machado de batalha",
    "category": "arma_marcial",
    "subcategory": "uma_mao",
    "price": "T$ 10",
    "damage": "1d8",
    "critical": "x3",
    "range": "Corpo a corpo",
    "damageType": "Corte",
    "spaces": 1,
    "description": "Machado pesado de lâmina ampla forjado para golpes violentos de impacto demolidor."
  },
  {
    "id": "martelo_guerra",
    "name": "Martelo de guerra",
    "category": "arma_marcial",
    "subcategory": "uma_mao",
    "price": "T$ 12",
    "damage": "1d8",
    "critical": "x3",
    "range": "Corpo a corpo",
    "damageType": "Impacto",
    "spaces": 1,
    "description": "Arma favorita de guerreiros e anões devotos de Arsenal, com cabeça de martelo e bico perfurador."
  },
  {
    "id": "tridente",
    "name": "Tridente",
    "category": "arma_marcial",
    "subcategory": "uma_mao",
    "price": "T$ 15",
    "damage": "1d8",
    "critical": "x2",
    "range": "Curto",
    "damageType": "Perfuração",
    "spaces": 1,
    "description": "Arma de três pontas perfurantes consagrada ao Deus dos Mares."
  },

  # Armas Marciais - Duas Mãos
  {
    "id": "montante",
    "name": "Montante",
    "category": "arma_marcial",
    "subcategory": "duas_maos",
    "price": "T$ 50",
    "damage": "2d6",
    "critical": "19",
    "range": "Corpo a corpo",
    "damageType": "Corte",
    "spaces": 2,
    "description": "Espada de duas mãos gigantesca com quase dois metros de comprimento total, capaz de decepar cavalos e cavaleiros."
  },
  {
    "id": "machado_guerra",
    "name": "Machado de guerra",
    "category": "arma_marcial",
    "subcategory": "duas_maos",
    "price": "T$ 20",
    "damage": "1d12",
    "critical": "x3",
    "range": "Corpo a corpo",
    "damageType": "Corte",
    "spaces": 2,
    "description": "Machado de duas mãos colossal com cabeça de ferro dupla afiada para decapitações violentas."
  },
  {
    "id": "arco_longo",
    "name": "Arco longo",
    "category": "arma_marcial",
    "subcategory": "distancia",
    "price": "T$ 100",
    "damage": "1d8",
    "critical": "x3",
    "range": "Longo",
    "damageType": "Perfuração",
    "spaces": 2,
    "description": "Arma de alta envergadura com alcance espetacular, a marca registrada dos caçadores élficos."
  },
  {
    "id": "besta_pesada",
    "name": "Besta pesada",
    "category": "arma_marcial",
    "subcategory": "distancia",
    "price": "T$ 50",
    "damage": "1d12",
    "critical": "19",
    "range": "Médio",
    "damageType": "Perfuração",
    "spaces": 2,
    "description": "Besta de grande porte armada com manivela de aço que dispara com força avassaladora."
  },

  # Armas de Fogo
  {
    "id": "pistola",
    "name": "Pistola",
    "category": "arma_fogo",
    "subcategory": "distancia",
    "price": "T$ 250",
    "damage": "2d6",
    "critical": "19/x3",
    "range": "Curto",
    "damageType": "Perfuração",
    "spaces": 1,
    "description": "Arma de fogo de cano curto forjada com pólvora negra artoniana desenvolvida em Portsmouth."
  },
  {
    "id": "mosquete",
    "name": "Mosquete",
    "category": "arma_fogo",
    "subcategory": "distancia",
    "price": "T$ 500",
    "damage": "2d8",
    "critical": "19/x3",
    "range": "Médio",
    "damageType": "Perfuração",
    "spaces": 2,
    "description": "Arma longa de pólvora com dano devastador e crítico explosivo."
  },

  # Itens Gerais
  {
    "id": "mochila",
    "name": "Mochila de Aventureiro",
    "category": "item_geral",
    "price": "T$ 2",
    "spaces": 0,
    "description": "Mochila reforçada de lona e tiras de couro. Aumenta a capacidade de carga em +2 espaços."
  },
  {
    "id": "saco_dormir",
    "name": "Saco de dormir",
    "category": "item_geral",
    "price": "T$ 1",
    "spaces": 1,
    "description": "Forrado de lã quente para noites de descanso confortável no acampamento."
  },
  {
    "id": "corda_15m",
    "name": "Corda de cânhamo (15m)",
    "category": "item_geral",
    "price": "T$ 1",
    "spaces": 1,
    "description": "Corda resistente essencial para rapel, escaladas e amarras de prisioneiros."
  },
  {
    "id": "tochas_5",
    "name": "Tochas (5 unidades)",
    "category": "item_geral",
    "price": "T$ 1",
    "spaces": 1,
    "description": "Gravetos de madeira embebidos em resina inflamável. Cada uma queima por 1 hora iluminando 6m."
  },
  {
    "id": "racao_viagem",
    "name": "Ração de viagem (1 semana)",
    "category": "item_geral",
    "price": "T$ 5",
    "spaces": 1,
    "description": "Carne seca, nozes, queijo duro e pão de centeio para uma semana inteira de sobrevivência."
  },
  {
    "id": "balsamo_restaurador",
    "name": "Bálsamo restaurador",
    "category": "item_geral",
    "price": "T$ 10",
    "spaces": 1,
    "description": "Pomada de ervas medicinais aromáticas. Uma ação completa para aplicar recupera 2d4 pontos de vida."
  },
  {
    "id": "essencia_mana",
    "name": "Essência de mana",
    "category": "item_geral",
    "price": "T$ 50",
    "spaces": 1,
    "description": "Líquido cintilante azul engarrafado. Uma ação completa para beber recupera 2d4 pontos de mana."
  },
  {
    "id": "gazua",
    "name": "Gazua e ferramentas de ladino",
    "category": "item_geral",
    "price": "T$ 30",
    "spaces": 1,
    "description": "Ganchos e palhetas finas de metal necessárias para abrir fechaduras e sabotar armadilhas."
  }
]

ts_content = "import { EquipmentItem } from '../types/rules';\n\n"
ts_content += "export const EQUIPMENT_LIST: EquipmentItem[] = " + json.dumps(equipment_raw, indent=2, ensure_ascii=False) + ";\n"

with open('src/data/equipment.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Generated src/data/equipment.ts with {len(equipment_raw)} equipment items.")
