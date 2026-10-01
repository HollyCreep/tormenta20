# -*- coding: utf-8 -*-
"""
Generates src/data/equipment.ts and src/data/itemModifiers.ts for Tormenta 20 JDA.
Contains the complete list of equipment, weapons, armors, gear, tools, esoterics,
alchemy, modifiers, and special materials according to the official manual.
"""
import json
import os

EQUIPMENT_DATA = [
  # =========================================================================
  # ARMAS SIMPLES - CORPO A CORPO (LEVES)
  # =========================================================================
  {
    "id": "adaga",
    "name": "Adaga",
    "category": "arma_simples",
    "subcategory": "leves",
    "price": "T$ 2",
    "damage": "1d4",
    "critical": "19",
    "damageType": "Perfuração",
    "range": "Curto",
    "spaces": 1,
    "description": "Faca afiada própria para estocadas rápidas. Pode ser arremessada em alcance curto e é fácil de ocultar (+5 em Ladinagem)."
  },
  {
    "id": "espada_curta",
    "name": "Espada curta",
    "category": "arma_simples",
    "subcategory": "leves",
    "price": "T$ 10",
    "damage": "1d6",
    "critical": "19",
    "damageType": "Perfuração",
    "spaces": 1,
    "description": "Lâmina reta e pontiaguda de cerca de 50 cm. Arma leve e ágil favorita de ladinos, soldados auxiliares e duelistas."
  },
  {
    "id": "foice",
    "name": "Foice",
    "category": "arma_simples",
    "subcategory": "leves",
    "price": "T$ 4",
    "damage": "1d6",
    "critical": "x3",
    "damageType": "Corte",
    "spaces": 1,
    "description": "Instrumento agrícola adaptado para combate. Sua lâmina curvada causa ferimentos terríveis quando atinge um ponto vital."
  },

  # =========================================================================
  # ARMAS SIMPLES - CORPO A CORPO (UMA MÃO)
  # =========================================================================
  {
    "id": "clava",
    "name": "Clava",
    "category": "arma_simples",
    "subcategory": "uma_mao",
    "price": "T$ 0",
    "damage": "1d6",
    "critical": "x2",
    "damageType": "Impacto",
    "spaces": 1,
    "description": "Pedaço de madeira pesada, osso ou galho resistente. Pode ser encontrada ou improvisada gratuitamente na natureza."
  },
  {
    "id": "lanca",
    "name": "Lança",
    "category": "arma_simples",
    "subcategory": "uma_mao",
    "price": "T$ 2",
    "damage": "1d6",
    "critical": "x2",
    "damageType": "Perfuração",
    "range": "Curto",
    "spaces": 1,
    "description": "Haste de madeira de 1,5m com ponta metálica afiada. Pode ser usada com uma mão, arremessada ou empunhada com as duas mãos (dano 1d8)."
  },
  {
    "id": "maca",
    "name": "Maça",
    "category": "arma_simples",
    "subcategory": "uma_mao",
    "price": "T$ 12",
    "damage": "1d8",
    "critical": "x2",
    "damageType": "Impacto",
    "spaces": 1,
    "description": "Bastão de madeira reforçada encimado por uma cabeça de ferro flangeada. Arma clássica de clérigos de deuses benevolentes."
  },

  # =========================================================================
  # ARMAS SIMPLES - CORPO A CORPO (DUAS MÃOS)
  # =========================================================================
  {
    "id": "bordao",
    "name": "Bordão",
    "category": "arma_simples",
    "subcategory": "duas_maos",
    "price": "T$ 0",
    "damage": "1d6/1d6",
    "critical": "x2",
    "damageType": "Impacto",
    "spaces": 2,
    "description": "Cajado longo de madeira roliça e polida. É uma arma dupla: permite atacar com ambas as pontas aplicando a penalidade de duas armas."
  },
  {
    "id": "pique",
    "name": "Pique",
    "category": "arma_simples",
    "subcategory": "duas_maos",
    "price": "T$ 2",
    "damage": "1d8",
    "critical": "x2",
    "damageType": "Perfuração",
    "spaces": 2,
    "description": "Haste muito longa (cerca de 3m a 4m) com ponta perfurante. Arma alongada: fornece alcance de 3m mas não ataca alvos adjacentes."
  },
  {
    "id": "tacape",
    "name": "Tacape",
    "category": "arma_simples",
    "subcategory": "duas_maos",
    "price": "T$ 0",
    "damage": "1d10",
    "critical": "x2",
    "damageType": "Impacto",
    "spaces": 2,
    "description": "Tronco rústico e pesado entalhado por bárbaros e povos primitivos. Exige as duas mãos para golpear com força esmagadora."
  },

  # =========================================================================
  # ARMAS SIMPLES - ATAQUE À DISTÂNCIA (DISPARO & ARREMESSO)
  # =========================================================================
  {
    "id": "arco_curto",
    "name": "Arco curto",
    "category": "arma_simples",
    "subcategory": "distancia",
    "price": "T$ 30",
    "damage": "1d6",
    "critical": "x3",
    "damageType": "Perfuração",
    "range": "Médio",
    "spaces": 2,
    "description": "Arco leve de madeira flexível. Exige as duas mãos para disparar e usa flechas como munição."
  },
  {
    "id": "besta_leve",
    "name": "Besta leve",
    "category": "arma_simples",
    "subcategory": "distancia",
    "price": "T$ 35",
    "damage": "1d8",
    "critical": "19",
    "damageType": "Perfuração",
    "range": "Médio",
    "spaces": 2,
    "description": "Mecanismo de arco metálico horizontal montado sobre coronha de madeira. Recarregar exige uma ação de movimento."
  },
  {
    "id": "funda",
    "name": "Funda",
    "category": "arma_simples",
    "subcategory": "distancia",
    "price": "T$ 0,5",
    "damage": "1d4",
    "critical": "x2",
    "damageType": "Impacto",
    "range": "Médio",
    "spaces": 1,
    "description": "Tira de couro onde se coloca uma pedra ou bala de chumbo girando com ímpeto para arremessar. Você soma sua Força nas rolagens de dano."
  },
  {
    "id": "azagaia",
    "name": "Azagaia",
    "category": "arma_simples",
    "subcategory": "distancia",
    "price": "T$ 1",
    "damage": "1d6",
    "critical": "x2",
    "damageType": "Perfuração",
    "range": "Médio",
    "spaces": 1,
    "description": "Lança curta e leve feita sob medida para arremesso à distância. Pode ser lançada com Força."
  },

  # =========================================================================
  # ARMAS MARCIAIS - CORPO A CORPO (LEVES)
  # =========================================================================
  {
    "id": "machadinha",
    "name": "Machadinha",
    "category": "arma_marcial",
    "subcategory": "leves",
    "price": "T$ 6",
    "damage": "1d6",
    "critical": "x3",
    "damageType": "Corte",
    "range": "Curto",
    "spaces": 1,
    "description": "Machado pequeno e veloz. Pode ser usado em combate corpo a corpo ou arremessado com precisão mortal."
  },
  {
    "id": "escudo_leve_ataque",
    "name": "Escudo leve (Golpe)",
    "category": "arma_marcial",
    "subcategory": "leves",
    "price": "T$ 5",
    "damage": "1d4",
    "critical": "x2",
    "damageType": "Impacto",
    "spaces": 1,
    "description": "Uso ofensivo do escudo leve como arma marcial secundária de impacto."
  },

  # =========================================================================
  # ARMAS MARCIAIS - CORPO A CORPO (UMA MÃO)
  # =========================================================================
  {
    "id": "cimitarra",
    "name": "Cimitarra",
    "category": "arma_marcial",
    "subcategory": "uma_mao",
    "price": "T$ 15",
    "damage": "1d6",
    "critical": "18",
    "damageType": "Corte",
    "spaces": 1,
    "description": "Espada de lâmina curva muito cortante. Excelente margem de ameaça para acertos críticos mortais."
  },
  {
    "id": "chicote",
    "name": "Chicote",
    "category": "arma_marcial",
    "subcategory": "uma_mao",
    "price": "T$ 2",
    "damage": "1d3",
    "critical": "x2",
    "damageType": "Corte",
    "spaces": 1,
    "description": "Arma flexível que ataca a até 4,5m de distância mas sem ser arma de disparo. Fornece +2 em manobras de derrubar e desarmar."
  },
  {
    "id": "espada_longa",
    "name": "Espada longa",
    "category": "arma_marcial",
    "subcategory": "uma_mao",
    "price": "T$ 15",
    "damage": "1d8",
    "critical": "19",
    "damageType": "Corte",
    "spaces": 1,
    "description": "A espada clássica dos cavaleiros e guerreiros artonianos. Lâmina reta e afiada com duplo gume e guarda em cruz."
  },
  {
    "id": "florete",
    "name": "Florete",
    "category": "arma_marcial",
    "subcategory": "uma_mao",
    "price": "T$ 20",
    "damage": "1d6",
    "critical": "18",
    "damageType": "Perfuração",
    "spaces": 1,
    "description": "Espada fina e veloz, focada em estocadas precisas. Considerada arma leve para efeito de Acuidade com Arma."
  },
  {
    "id": "machado_batalha",
    "name": "Machado de batalha",
    "category": "arma_marcial",
    "subcategory": "uma_mao",
    "price": "T$ 10",
    "damage": "1d8",
    "critical": "x3",
    "damageType": "Corte",
    "spaces": 1,
    "description": "Haste de madeira firme com lâmina pesada de ferro em formato de meia-lua. Causa impacto devastador no acerto crítico."
  },
  {
    "id": "mangual",
    "name": "Mangual",
    "category": "arma_marcial",
    "subcategory": "uma_mao",
    "price": "T$ 8",
    "damage": "1d8",
    "critical": "x2",
    "damageType": "Impacto",
    "spaces": 1,
    "description": "Haste curta conectada por corrente a uma esfera de ferro com cravos. Fornece +2 em testes para desarmar oponentes."
  },
  {
    "id": "martelo_guerra",
    "name": "Martelo de guerra",
    "category": "arma_marcial",
    "subcategory": "uma_mao",
    "price": "T$ 12",
    "damage": "1d8",
    "critical": "x3",
    "damageType": "Impacto",
    "spaces": 1,
    "description": "Arma maciça com cabeça de aço capaz de amassar placas de armaduras pesadas e crânios de monstros."
  },
  {
    "id": "picareta",
    "name": "Picareta",
    "category": "arma_marcial",
    "subcategory": "uma_mao",
    "price": "T$ 8",
    "damage": "1d6",
    "critical": "x4",
    "damageType": "Perfuração",
    "spaces": 1,
    "description": "Ponta de aço temperada extremamente aguçada. Multiplicador de crítico quadruplicado (x4)."
  },
  {
    "id": "tridente",
    "name": "Tridente",
    "category": "arma_marcial",
    "subcategory": "uma_mao",
    "price": "T$ 15",
    "damage": "1d8",
    "critical": "x2",
    "damageType": "Perfuração",
    "range": "Curto",
    "spaces": 1,
    "description": "Lança de três pontas cravadas. Arma favorecida pelos povos marinhos e devotos de Oceano. Pode ser arremessada."
  },

  # =========================================================================
  # ARMAS MARCIAIS - CORPO A CORPO (DUAS MÃOS)
  # =========================================================================
  {
    "id": "alabarda",
    "name": "Alabarda",
    "category": "arma_marcial",
    "subcategory": "duas_maos",
    "price": "T$ 10",
    "damage": "1d10",
    "critical": "x3",
    "damageType": "Corte ou Perfuração",
    "spaces": 2,
    "description": "Haste de 2m terminando em lâmina combinada de machado com ponta de lança. Arma alongada (alcance 3m)."
  },
  {
    "id": "alfange",
    "name": "Alfange",
    "category": "arma_marcial",
    "subcategory": "duas_maos",
    "price": "T$ 75",
    "damage": "2d4",
    "critical": "18",
    "damageType": "Corte",
    "spaces": 2,
    "description": "Versão gigantesca e de duas mãos da cimitarra. Une dano consistente a uma ampla margem de ameaça crítica (18)."
  },
  {
    "id": "foice_grande",
    "name": "Foice grande",
    "category": "arma_marcial",
    "subcategory": "duas_maos",
    "price": "T$ 18",
    "damage": "1d10",
    "critical": "x4",
    "damageType": "Corte",
    "spaces": 2,
    "description": "Grande lâmina curvada em haste longa. Multiplicador crítico monumental (x4). Arma símbolo de servos da morte e Tenebra."
  },
  {
    "id": "lanca_montada",
    "name": "Lança montada",
    "category": "arma_marcial",
    "subcategory": "duas_maos",
    "price": "T$ 10",
    "damage": "1d8",
    "critical": "x3",
    "damageType": "Perfuração",
    "spaces": 2,
    "description": "Feita especificamente para cargas de cavalaria. Quando usada numa investida montada causa +2d8 de dano adicional."
  },
  {
    "id": "machado_guerra",
    "name": "Machado de guerra",
    "category": "arma_marcial",
    "subcategory": "duas_maos",
    "price": "T$ 20",
    "damage": "1d12",
    "critical": "x3",
    "damageType": "Corte",
    "spaces": 2,
    "description": "Haste pesada com lâmina dupla formidável. Favorito dos anões guerreiros de Doherimm e bárbaros sanguinários."
  },
  {
    "id": "montante",
    "name": "Montante",
    "category": "arma_marcial",
    "subcategory": "duas_maos",
    "price": "T$ 50",
    "damage": "2d6",
    "critical": "19",
    "damageType": "Corte",
    "spaces": 2,
    "description": "Espada de lâmina enorme (mais de 1,5m de aço). Causa o dano mais alto entre espadas clássicas (2d6)."
  },

  # =========================================================================
  # ARMAS MARCIAIS - ATAQUE À DISTÂNCIA
  # =========================================================================
  {
    "id": "arco_longo",
    "name": "Arco longo",
    "category": "arma_marcial",
    "subcategory": "distancia",
    "price": "T$ 100",
    "damage": "1d8",
    "critical": "x3",
    "damageType": "Perfuração",
    "range": "Médio",
    "spaces": 2,
    "description": "Arco de grande envergadura feito de madeira nobre. Permite somar o bônus de Força nas rolagens de dano."
  },
  {
    "id": "besta_pesada",
    "name": "Besta pesada",
    "category": "arma_marcial",
    "subcategory": "distancia",
    "price": "T$ 50",
    "damage": "1d12",
    "critical": "19",
    "damageType": "Perfuração",
    "range": "Médio",
    "spaces": 2,
    "description": "Mecanismo potente com arco de aço forjado. Dano tremendo (1d12). Recarregar exige uma ação padrão."
  },
  {
    "id": "rede",
    "name": "Rede",
    "category": "arma_marcial",
    "subcategory": "distancia",
    "price": "T$ 20",
    "damage": "-",
    "critical": "-",
    "damageType": "Especial",
    "range": "Curto",
    "spaces": 2,
    "description": "Rede trançada com pesos nas bordas. Ao acertar, não causa dano mas deixa o alvo enredado e preso."
  },

  # =========================================================================
  # ARMAS EXÓTICAS
  # =========================================================================
  {
    "id": "adaga_taurica",
    "name": "Adaga táurica",
    "category": "arma_exotica",
    "subcategory": "leves",
    "price": "T$ 30",
    "damage": "1d4/1d4",
    "critical": "19",
    "damageType": "Perfuração",
    "spaces": 1,
    "description": "Adaga com lâminas gêmeas paralelas criada pelos minotauros de Tapista. Conta como arma dupla."
  },
  {
    "id": "katar",
    "name": "Katar",
    "category": "arma_exotica",
    "subcategory": "leves",
    "price": "T$ 12",
    "damage": "1d6",
    "critical": "x3",
    "damageType": "Perfuração",
    "spaces": 1,
    "description": "Punhal com empunhadura perpendicular em H. Desfere socos perfurantes e não pode ser desarmada."
  },
  {
    "id": "nunchaku",
    "name": "Nunchaku",
    "category": "arma_exotica",
    "subcategory": "leves",
    "price": "T$ 5",
    "damage": "1d6",
    "critical": "x3",
    "damageType": "Impacto",
    "spaces": 1,
    "description": "Dois bastões curtos unidos por corda ou corrente. Pode ser girado em alta velocidade para fintar e quebrar guardas."
  },
  {
    "id": "espada_bastarda",
    "name": "Espada bastarda",
    "category": "arma_exotica",
    "subcategory": "uma_mao",
    "price": "T$ 35",
    "damage": "1d10/1d12",
    "critical": "19",
    "damageType": "Corte",
    "spaces": 1,
    "description": "Maior que uma espada longa, menor que um montante. Pode ser empunhada com uma mão como arma exótica, ou com duas mãos como arma marcial (dano 1d12)."
  },
  {
    "id": "machado_taurico",
    "name": "Machado táurico",
    "category": "arma_exotica",
    "subcategory": "duas_maos",
    "price": "T$ 50",
    "damage": "2d8",
    "critical": "x3",
    "damageType": "Corte",
    "spaces": 2,
    "description": "Machado colossal com lâminas maciças forjadas em Tapista. Requer Força 3 para ser empunhado sem penalidade."
  },
  {
    "id": "corrente_espinhos",
    "name": "Corrente de espinhos",
    "category": "arma_exotica",
    "subcategory": "duas_maos",
    "price": "T$ 25",
    "damage": "2d4/2d4",
    "critical": "19",
    "damageType": "Perfuração",
    "spaces": 2,
    "description": "Arma dupla e alongada com 3m de alcance que pode atacar oponentes adjacentes. Fornece +2 em testes de derrubar e desarmar."
  },
  {
    "id": "espada_duas_laminas",
    "name": "Espada de duas lâminas",
    "category": "arma_exotica",
    "subcategory": "duas_maos",
    "price": "T$ 60",
    "damage": "1d8/1d8",
    "critical": "19",
    "damageType": "Corte",
    "spaces": 2,
    "description": "Empunhadura central com lâminas longas em ambas as pontas. Arma dupla exótica favorita de duelistas elfos."
  },

  # =========================================================================
  # ARMAS DE FOGO (EXÓTICAS)
  # =========================================================================
  {
    "id": "pistola",
    "name": "Pistola",
    "category": "arma_fogo",
    "subcategory": "distancia",
    "price": "T$ 250",
    "damage": "2d6",
    "critical": "19/x3",
    "damageType": "Perfuração",
    "range": "Curto",
    "spaces": 1,
    "description": "Arma de fogo portátil desenvolvida pelos gnomos de Smokestone e inventores de Zakharov. Recarregar exige uma ação padrão."
  },
  {
    "id": "mosquete",
    "name": "Mosquete",
    "category": "arma_fogo",
    "subcategory": "distancia",
    "price": "T$ 500",
    "damage": "2d8",
    "critical": "19/x3",
    "damageType": "Perfuração",
    "range": "Médio",
    "spaces": 2,
    "description": "Arma de fogo longa de cano raiado com devastador poder de parada. Recarregar exige ação padrão."
  },

  # =========================================================================
  # MUNIÇÕES
  # =========================================================================
  {
    "id": "flechas_20",
    "name": "Flechas (20)",
    "category": "item_geral",
    "price": "T$ 1",
    "spaces": 1,
    "description": "Aljava contendo 20 flechas de madeira com ponta de metal e penas de voo."
  },
  {
    "id": "virotes_20",
    "name": "Virotes (20)",
    "category": "item_geral",
    "price": "T$ 2",
    "spaces": 1,
    "description": "Pacote com 20 virotes curtos e pesados para bestas leves ou pesadas."
  },
  {
    "id": "balas_20",
    "name": "Balas e Pólvora (20)",
    "category": "item_geral",
    "price": "T$ 20",
    "spaces": 1,
    "description": "Bolsa com 20 esferas de chumbo e um chifre dosador de pólvora para pistolas e mosquetes."
  },
  {
    "id": "pedras_20",
    "name": "Pedras de Funda (20)",
    "category": "item_geral",
    "price": "T$ 0,5",
    "spaces": 1,
    "description": "Bolsa com 20 pedras roliças ou balas de chumbo moldadas para funda."
  },

  # =========================================================================
  # ARMADURAS LEVES
  # =========================================================================
  {
    "id": "armadura_acolchoada",
    "name": "Armadura acolchoada",
    "category": "armadura_leve",
    "price": "T$ 5",
    "defenseBonus": 1,
    "armorPenalty": 0,
    "spaces": 2,
    "damageType": "Armadura",
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
    "damageType": "Armadura",
    "description": "Peitoral de couro fervido em óleo para endurecer, com proteções de couro mais flexível nas articulações."
  },
  {
    "id": "couro_batido",
    "name": "Couro batido",
    "category": "armadura_leve",
    "price": "T$ 35",
    "defenseBonus": 3,
    "armorPenalty": -1,
    "spaces": 2,
    "damageType": "Armadura",
    "description": "Versão reforçada da armadura de couro com centenas de rebites metálicos cravados para deter cortes."
  },
  {
    "id": "gibao_peles",
    "name": "Gibão de peles",
    "category": "armadura_leve",
    "price": "T$ 25",
    "defenseBonus": 4,
    "armorPenalty": -3,
    "spaces": 2,
    "damageType": "Armadura",
    "description": "Traje rústico de couro cru grosso e camadas pesadas de peles de animais selvagens. Comum entre bárbaros."
  },
  {
    "id": "couraca",
    "name": "Couraça",
    "category": "armadura_leve",
    "price": "T$ 500",
    "defenseBonus": 5,
    "armorPenalty": -4,
    "spaces": 2,
    "damageType": "Armadura",
    "description": "Peitoral e espaldar de aço forjado que protegem o torso, presos sobre gibão almofadado. A armadura leve mais resistente."
  },

  # =========================================================================
  # ARMADURAS PESADAS (Reduzem deslocamento em -3m e não aplicam Des na Defesa)
  # =========================================================================
  {
    "id": "brunea",
    "name": "Brunea",
    "category": "armadura_pesada",
    "price": "T$ 50",
    "defenseBonus": 5,
    "armorPenalty": -2,
    "spaces": 5,
    "damageType": "Armadura",
    "description": "Colete de couro rígido recoberto de escamas de aço sobrepostas. Não permite aplicar Destreza e reduz deslocamento em -3m."
  },
  {
    "id": "cota_malha",
    "name": "Cota de malha",
    "category": "armadura_pesada",
    "price": "T$ 150",
    "defenseBonus": 6,
    "armorPenalty": -2,
    "spaces": 5,
    "damageType": "Armadura",
    "description": "Longa camisa de milhares de anéis de aço entrelaçados protegendo torso e braços sobre túnica grossa."
  },
  {
    "id": "loriga_segmentada",
    "name": "Loriga segmentada",
    "category": "armadura_pesada",
    "price": "T$ 250",
    "defenseBonus": 7,
    "armorPenalty": -3,
    "spaces": 5,
    "damageType": "Armadura",
    "description": "Tiras horizontais de lâminas de aço curvadas e rebitadas com tiras de couro. Excelente equilíbrio entre proteção e custo."
  },
  {
    "id": "meia_armadura",
    "name": "Meia armadura",
    "category": "armadura_pesada",
    "price": "T$ 600",
    "defenseBonus": 8,
    "armorPenalty": -4,
    "spaces": 5,
    "damageType": "Armadura",
    "description": "Placas de aço moldadas protegendo todas as áreas nobres com malha de aço flexível nas juntas."
  },
  {
    "id": "armadura_completa",
    "name": "Armadura completa",
    "category": "armadura_pesada",
    "price": "T$ 1500",
    "defenseBonus": 10,
    "armorPenalty": -5,
    "spaces": 5,
    "damageType": "Armadura",
    "description": "O ápice da metalurgia militar. Placas de aço cobrem integralmente o cavaleiro dos pés ao pescoço, incluindo elmo fechado e manoplas."
  },

  # =========================================================================
  # ESCUDOS
  # =========================================================================
  {
    "id": "escudo_leve",
    "name": "Escudo leve",
    "category": "escudo",
    "price": "T$ 5",
    "defenseBonus": 1,
    "armorPenalty": -1,
    "spaces": 1,
    "damageType": "Escudo",
    "description": "Escudo redondo de madeira preso ao antebraço. Permite segurar itens na mão do escudo, mas não armas ou disparos."
  },
  {
    "id": "escudo_pesado",
    "name": "Escudo pesado",
    "category": "escudo",
    "price": "T$ 15",
    "defenseBonus": 2,
    "armorPenalty": -2,
    "spaces": 2,
    "damageType": "Escudo",
    "description": "Grande escudo em formato de pipa ou gota feito de madeira revestida com ferro. Ocupa a mão empunhada inteiramente."
  },

  # =========================================================================
  # EQUIPAMENTO DE AVENTURA (ITENS GERAIS)
  # =========================================================================
  {
    "id": "mochila",
    "name": "Mochila",
    "category": "item_geral",
    "price": "T$ 2",
    "spaces": 0,
    "description": "Mochila de couro resistente para transporte. Não ocupa espaços de carga e permite organizar até 10 itens."
  },
  {
    "id": "saco_dormir",
    "name": "Saco de dormir",
    "category": "item_geral",
    "price": "T$ 1",
    "spaces": 1,
    "description": "Manta acolchoada impermeável que permite dormir a céu aberto sem penalidades de descanso."
  },
  {
    "id": "traje_viajante",
    "name": "Traje de viajante",
    "category": "vestuario",
    "price": "T$ 10",
    "spaces": 1,
    "description": "Calças de tecido firme, túnica resistente, capa com capuz e botas de couro reforçadas."
  },
  {
    "id": "corda",
    "name": "Corda de cânhamo (15m)",
    "category": "item_geral",
    "price": "T$ 1",
    "spaces": 1,
    "description": "Corda de 15 metros capaz de sustentar até 500 kg com segurança. Essencial para exploração de masmorras."
  },
  {
    "id": "tocha_6",
    "name": "Tochas (6)",
    "category": "item_geral",
    "price": "T$ 1",
    "spaces": 1,
    "description": "Pacote com 6 tochas de madeira embebidas em piche. Cada tocha ilumina um raio de 9m durante 1 hora."
  },
  {
    "id": "lanterna",
    "name": "Lanterna de óleo",
    "category": "item_geral",
    "price": "T$ 7",
    "spaces": 1,
    "description": "Lanterna de metal com janelas de vidro. Ilumina um cone de 12m por 6 horas com 1 frasco de óleo."
  },
  {
    "id": "oleo_frasco",
    "name": "Óleo combustível (frasco)",
    "category": "alquimia",
    "price": "T$ 0,1",
    "spaces": 1,
    "description": "Combustível para lanternas. Pode ser arremessado e incendiado causando 1d6 de dano de fogo por 2 rodadas."
  },
  {
    "id": "pederneira",
    "name": "Pederneira e isqueiro",
    "category": "item_geral",
    "price": "T$ 1",
    "spaces": 1,
    "description": "Pedra de sílex e chapa de ferro para acender fogueiras, tochas e pavios com uma ação padrão."
  },
  {
    "id": "pe_de_cabra",
    "name": "Pé de cabra",
    "category": "ferramenta",
    "price": "T$ 2",
    "spaces": 1,
    "description": "Barra de ferro curvada que concede +2 em testes de Força para arrombar portas e baús emperrados."
  },
  {
    "id": "arpeu",
    "name": "Arpéu",
    "category": "item_geral",
    "price": "T$ 1",
    "spaces": 1,
    "description": "Gancho de ferro com quatro pontas curvadas para ser amarrado em cordas e lançado em muralhas."
  },
  {
    "id": "algemas",
    "name": "Algemas de aço",
    "category": "item_geral",
    "price": "T$ 15",
    "spaces": 1,
    "description": "Par de braceletes de aço temperado com fechadura (Acrobacia ou Ladinagem CD 20 para escapar)."
  },
  {
    "id": "espelho_metal",
    "name": "Espelho de metal polido",
    "category": "item_geral",
    "price": "T$ 10",
    "spaces": 1,
    "description": "Espelho pequeno e reflexivo. Permite espiar ao redor de esquinas sem se expor a ataques."
  },
  {
    "id": "odre",
    "name": "Odre de água (2L)",
    "category": "item_geral",
    "price": "T$ 1",
    "spaces": 1,
    "description": "Bolsa de couro impermeabilizada que carrega água potável suficiente para 1 dia de jornada."
  },
  {
    "id": "racao_viagem_7",
    "name": "Rações de viagem (7 dias)",
    "category": "alimentacao",
    "price": "T$ 5",
    "spaces": 1,
    "description": "Carne seca, queijo curado, frutas secas e pão duro suficientes para nutrir um aventureiro por uma semana."
  },
  {
    "id": "tenda",
    "name": "Tenda de acampamento",
    "category": "item_geral",
    "price": "T$ 10",
    "spaces": 2,
    "description": "Tenda de lona encerada capaz de abrigar duas pessoas confortavelmente contra chuva e intempéries."
  },

  # =========================================================================
  # FERRAMENTAS & KITS DE PERÍCIA
  # =========================================================================
  {
    "id": "kit_ladrao",
    "name": "Gazuas (Kit de Ladrão)",
    "category": "ferramenta",
    "price": "T$ 30",
    "spaces": 1,
    "description": "Conjunto de arames, pinças e alavancas finas necessárias para abrir fechaduras com a perícia Ladinagem."
  },
  {
    "id": "maleta_medicamentos",
    "name": "Maleta de medicamentos",
    "category": "ferramenta",
    "price": "T$ 50",
    "spaces": 1,
    "description": "Contém bandagens limpas, agulhas, linhas cirúrgicas, unguentos e ervas medicinais. Concede +2 em Cura."
  },
  {
    "id": "instrumento_musical",
    "name": "Instrumento musical (Alaúde)",
    "category": "ferramenta",
    "price": "T$ 30",
    "spaces": 1,
    "description": "Instrumento de cordas finamente afinado. Essencial para bardos executarem músicas bárdicas e atuações."
  },
  {
    "id": "kit_disfarce",
    "name": "Kit de disfarce",
    "category": "ferramenta",
    "price": "T$ 50",
    "spaces": 1,
    "description": "Tinturas para cabelo, postiços, maquiagem e tecidos. Concede +2 em testes de Enganação para disfarces."
  },
  {
    "id": "kit_oficio_alquimia",
    "name": "Kit de Ofício (Alquimia)",
    "category": "ferramenta",
    "price": "T$ 30",
    "spaces": 1,
    "description": "Proveta, almofariz, almofariz de pedra e retortas de vidro para preparar compostos e elixires alquímicos."
  },
  {
    "id": "kit_oficio_armeiro",
    "name": "Kit de Ofício (Armeiro)",
    "category": "ferramenta",
    "price": "T$ 30",
    "spaces": 2,
    "description": "Martelos de forja, tenazes, limas de ferro e pedras de amolar para fabricar e reparar armas e armaduras."
  },

  # =========================================================================
  # ESOTÉRICOS & ITENS MÁGICOS BASE
  # =========================================================================
  {
    "id": "varinha_arcana",
    "name": "Varinha arcana",
    "category": "esoterico",
    "price": "T$ 50",
    "spaces": 1,
    "description": "Bastão fino de madeira nobre entalhado com runas. Se empunhado, concede +1 nos testes de Misticismo para magias arcanas."
  },
  {
    "id": "cajado_arcano",
    "name": "Cajado arcano",
    "category": "esoterico",
    "price": "T$ 100",
    "spaces": 2,
    "description": "Cajado de madeira antiga encimado por uma pedra mística. Fornece +1 na CD para resistir às suas magias."
  },
  {
    "id": "orbe_cristalino",
    "name": "Orbe cristalino",
    "category": "esoterico",
    "price": "T$ 75",
    "spaces": 1,
    "description": "Esfera perfeitamente polida de quartzo límpido que ressoa com energias de adivinhação e ilusão."
  },
  {
    "id": "tomo_hermetico",
    "name": "Tomo hermético",
    "category": "esoterico",
    "price": "T$ 150",
    "spaces": 1,
    "description": "Livro encadernado em couro com páginas repletas de cálculos arcanos que auxiliam no preparo de magias."
  },
  {
    "id": "simbolo_sagrado",
    "name": "Símbolo sagrado",
    "category": "esoterico",
    "price": "T$ 5",
    "spaces": 1,
    "description": "Insígnia sagrada de sua divindade patrona moldada em prata ou madeira abençoada. Canalizador divino."
  },

  # =========================================================================
  # ALQUÍMICOS & POÇÕES
  # =========================================================================
  {
    "id": "balsamo_restaurador",
    "name": "Bálsamo restaurador",
    "category": "alquimia",
    "price": "T$ 25",
    "spaces": 1,
    "description": "Pomada de ervas curativas e óleo de troll. Ao ser aplicada com ação padrão recupera 2d4 pontos de vida."
  },
  {
    "id": "essencia_mana",
    "name": "Essência de mana",
    "category": "alquimia",
    "price": "T$ 50",
    "spaces": 1,
    "description": "Líquido azul fosforescente de sabor adocicado. Ao ser ingerido recupera 1d4 pontos de mana instantaneamente."
  },
  {
    "id": "fogo_alquimico",
    "name": "Fogo alquímico (frasco)",
    "category": "alquimia",
    "price": "T$ 10",
    "spaces": 1,
    "description": "Líquido gelatinoso volátil que queima em contato com o ar. Ao arremessar causa 1d6 de dano de fogo e 1d6 na rodada seguinte."
  },
  {
    "id": "acido_frasco",
    "name": "Ácido (frasco)",
    "category": "alquimia",
    "price": "T$ 10",
    "spaces": 1,
    "description": "Substância corrosiva forte. Ao atingir o alvo causa 2d4 pontos de dano de ácido ignorando 5 pontos de dureza/RD."
  },
  {
    "id": "agua_benta",
    "name": "Água benta (frasco)",
    "category": "alquimia",
    "price": "T$ 25",
    "spaces": 1,
    "description": "Água consagrada por rituais divinos. Causa 2d6 de dano radiante em mortos-vivos e demônios ao ser arremessada."
  },

  # =========================================================================
  # VESTUÁRIO & ADORNOS
  # =========================================================================
  {
    "id": "traje_corte",
    "name": "Traje da corte",
    "category": "vestuario",
    "price": "T$ 100",
    "spaces": 1,
    "description": "Roupas caras de seda bordada com fios de ouro, botões de prata e joias. Concede +2 em Diplomacia e Nobreza em situações sociais."
  },
  {
    "id": "luvas_pelica",
    "name": "Luvas de pelica",
    "category": "vestuario",
    "price": "T$ 15",
    "spaces": 1,
    "description": "Luvas ultrafinas de couro suave que protegem as mãos sem perder a sensibilidade para truques de prestidigitação."
  },
  {
    "id": "manto_camuflado",
    "name": "Manto camuflado",
    "category": "vestuario",
    "price": "T$ 25",
    "spaces": 1,
    "description": "Capa pintada em tons de verde, marrom ou cinza rocha. Concede +2 em Furtividade no terreno apropriado."
  },
  {
    "id": "botas_reforcadas",
    "name": "Botas reforçadas",
    "category": "vestuario",
    "price": "T$ 20",
    "spaces": 1,
    "description": "Botas de cano alto em couro duro com solado cravado de aço. Fornecem +2 em testes para resistir a terreno difícil."
  }
]

# =============================================================================
# MODIFICADORES DE ITENS (MELHORIAS & MATERIAIS ESPECIAIS - TABELA 3-8 & 3-9)
# =============================================================================
ITEM_MODIFIERS_DATA = [
  # --- MELHORIAS PARA ARMAS ---
  {
    "id": "certeira",
    "name": "Certeira",
    "type": "melhoria",
    "targetCategories": ["arma"],
    "description": "A arma é fabricada para ser mais precisa e perfeitamente balanceada, fornecendo +1 em testes de ataque.",
    "effect": { "attackBonus": 1 }
  },
  {
    "id": "pungente",
    "name": "Pungente",
    "type": "melhoria",
    "targetCategories": ["arma"],
    "requirementText": "Requer: Certeira",
    "description": "Temperada diversas vezes para adquirir o fio ou equilíbrio cirúrgico, fornecendo +2 em testes de ataque (substitui Certeira).",
    "effect": { "attackBonus": 2 }
  },
  {
    "id": "cruel",
    "name": "Cruel",
    "type": "melhoria",
    "targetCategories": ["arma"],
    "description": "Rebarbas serrilhadas, espinhos e pontas adicionais aumentam a letalidade, fornecendo +1 nas rolagens de dano.",
    "effect": { "damageBonus": 1 }
  },
  {
    "id": "atroz",
    "name": "Atroz",
    "type": "melhoria",
    "targetCategories": ["arma"],
    "requirementText": "Requer: Cruel",
    "description": "A arma é um amontoado brutal de ganchos e protuberâncias mortais, fornecendo +2 nas rolagens de dano.",
    "effect": { "damageBonus": 2 }
  },
  {
    "id": "equilibrada",
    "name": "Equilibrada",
    "type": "melhoria",
    "targetCategories": ["arma"],
    "description": "Fornece +2 em testes de manobras de combate (derrubar, desarmar, empurrar ou quebrar).",
    "effect": { "customText": "+2 em testes de manobras de combate." }
  },
  {
    "id": "harmonizada",
    "name": "Harmonizada",
    "type": "melhoria",
    "targetCategories": ["arma", "esoterico"],
    "description": "O custo de habilidades de ataque ou lançamento ativadas com este item diminui em -1 PM (mínimo 1 PM).",
    "effect": { "customText": "-1 PM no custo de habilidades com este item." }
  },
  {
    "id": "injecao_alquimica",
    "name": "Injeção alquímica",
    "type": "melhoria",
    "targetCategories": ["arma"],
    "description": "Possui um reservatório para até 2 preparados alquímicos que são liberados automaticamente no acerto.",
    "effect": { "customText": "Reservatório para 2 preparados alquímicos liberados no impacto." }
  },
  {
    "id": "macica",
    "name": "Maciça",
    "type": "melhoria",
    "targetCategories": ["arma"],
    "incompatibleWith": ["precisa"],
    "requirementText": "Incompatível com: Precisa",
    "description": "A arma é forjada com aço densificado de alto impacto. O multiplicador de crítico aumenta em +1 (ex: de x2 para x3).",
    "effect": { "critMultiplierBonus": 1 }
  },
  {
    "id": "precisa",
    "name": "Precisa",
    "type": "melhoria",
    "targetCategories": ["arma"],
    "incompatibleWith": ["macica"],
    "requirementText": "Incompatível com: Maciça",
    "description": "Afiação impecável de navalha. Aumenta a margem de ameaça crítica em +1 (ex: de 19 para 18).",
    "effect": { "critThreatBonus": 1 }
  },
  {
    "id": "mira_telescopica",
    "name": "Mira telescópica",
    "type": "melhoria",
    "targetCategories": ["arma"],
    "requirementText": "Apenas armas de disparo (arcos, bestas, armas de fogo)",
    "description": "Aumenta o alcance da arma em uma categoria (de curto para médio, ou de médio para longo).",
    "effect": { "rangeStepBonus": 1 }
  },

  # --- MELHORIAS PARA ARMADURAS E ESCUDOS ---
  {
    "id": "ajustada",
    "name": "Ajustada",
    "type": "melhoria",
    "targetCategories": ["armadura", "escudo"],
    "description": "Peças forjadas e medidas com exatidão milimétrica. Reduz a penalidade de armadura em 1 ponto (ex: de -2 para -1).",
    "effect": { "armorPenaltyBonus": 1 }
  },
  {
    "id": "sob_medida",
    "name": "Sob medida",
    "type": "melhoria",
    "targetCategories": ["armadura", "escudo"],
    "requirementText": "Requer: Ajustada",
    "description": "Feita especificamente para a anatomia do portador. Reduz a penalidade de armadura em 2 pontos.",
    "effect": { "armorPenaltyBonus": 2 }
  },
  {
    "id": "delicada",
    "name": "Delicada",
    "type": "melhoria",
    "targetCategories": ["armadura"],
    "requirementText": "Apenas Armaduras Pesadas. Incompatível com: Reforçada",
    "incompatibleWith": ["reforcada"],
    "description": "Placas de espessura mínima ultra-leve. Permite que o portador aplique até +1 de Destreza na Defesa mesmo em armadura pesada.",
    "effect": { "customText": "Permite aplicar até +1 de Destreza na Defesa em armadura pesada." }
  },
  {
    "id": "reforcada",
    "name": "Reforçada",
    "type": "melhoria",
    "targetCategories": ["armadura", "escudo"],
    "incompatibleWith": ["delicada"],
    "requirementText": "Incompatível com: Delicada",
    "description": "Camada adicional de placas espessas. O bônus na Defesa aumenta em +1, mas a penalidade de armadura piora em -1.",
    "effect": { "defenseBonus": 1, "armorPenaltyBonus": -1 }
  },
  {
    "id": "polida",
    "name": "Polida",
    "type": "melhoria",
    "targetCategories": ["armadura", "escudo"],
    "description": "Superfície espelhada ultra-reflexiva. Em ambientes iluminados, fornece +5 na Defesa durante a primeira rodada de combate.",
    "effect": { "customText": "+5 na Defesa na primeira rodada de combate em locais iluminados." }
  },
  {
    "id": "selada",
    "name": "Selada",
    "type": "melhoria",
    "targetCategories": ["armadura"],
    "requirementText": "Apenas Armaduras Pesadas",
    "description": "Articulações completamente vedadas e forjadas sem brechas. Concede +1 em todos os testes de resistência.",
    "effect": { "resistanceBonus": 1 }
  },
  {
    "id": "espinhosa",
    "name": "Espinhosa",
    "type": "melhoria",
    "targetCategories": ["armadura", "escudo"],
    "description": "Revestida de cravos de aço pontiagudos. Causa 1d6 de dano de perfuração ao agarrar ou fazer manobra com escudo.",
    "effect": { "customText": "Causa 1d6 de dano de perfuração em agarrões ou ataques de escudo." }
  },

  # --- MELHORIAS PARA ESOTÉRICOS, FERRAMENTAS E VESTUÁRIO ---
  {
    "id": "canalizador",
    "name": "Canalizador",
    "type": "melhoria",
    "targetCategories": ["esoterico"],
    "description": "Possui uma gema mística ressonante. O limite máximo de PM que você pode gastar ao lançar magias aumenta em +1.",
    "effect": { "maxMpBonus": 1 }
  },
  {
    "id": "poderoso",
    "name": "Poderoso",
    "type": "melhoria",
    "targetCategories": ["esoterico"],
    "description": "Aumenta a CD para resistir às suas magias em +1.",
    "effect": { "customText": "+1 na CD para resistir às suas magias." }
  },
  {
    "id": "vigilante",
    "name": "Vigilante",
    "type": "melhoria",
    "targetCategories": ["esoterico"],
    "description": "Usa um fluxo contínuo de mana pessoal para defletir ataques, concedendo +2 na Defesa enquanto empunhado.",
    "effect": { "defenseBonus": 2 }
  },
  {
    "id": "aprimorado",
    "name": "Aprimorado",
    "type": "melhoria",
    "targetCategories": ["ferramenta", "vestuario"],
    "description": "Construído de forma primorosa. Fornece +1 na perícia modificada pela ferramenta ou vestuário.",
    "effect": { "customText": "+1 de bônus na perícia afetada pelo item." }
  },
  {
    "id": "banhado_ouro",
    "name": "Banhado a ouro",
    "type": "melhoria",
    "targetCategories": ["qualquer"],
    "description": "Acabamento suntuoso e brilhante. Fornece +2 em testes de Diplomacia contra quem valoriza riqueza e pompa.",
    "effect": { "customText": "+2 em testes de Diplomacia." }
  },
  {
    "id": "cravejado_gemas",
    "name": "Cravejado de gemas",
    "type": "melhoria",
    "targetCategories": ["qualquer"],
    "description": "Adornado com pedras preciosas reluzentes. Concede +2 em testes de Enganação.",
    "effect": { "customText": "+2 em testes de Enganação." }
  },
  {
    "id": "discreto",
    "name": "Discreto",
    "type": "melhoria",
    "targetCategories": ["qualquer"],
    "description": "Oculto, disfarçado ou telescópico. Ocupa -1 espaço (mínimo 1) e concede +5 em Ladinagem para ser escondido.",
    "effect": { "spacesModifier": -1 }
  },

  # =========================================================================
  # MATERIAIS ESPECIAIS (TABELA 3-9)
  # =========================================================================
  {
    "id": "aco_rubi",
    "name": "Aço-rubi",
    "type": "material_especial",
    "targetCategories": ["arma", "armadura", "escudo", "esoterico"],
    "description": "Metal avermelhado minerado das profundezas de áreas de Tormenta pelos anões de Doherimm. Em armas ignora 10 pontos de RD e imunidade a críticos de lefeu. Em armaduras e escudos fornece 25% de chance de ignorar acertos críticos.",
    "priceByItemType": {
      "arma": 6000,
      "armadura_leve": 3000,
      "armadura_pesada": 6000,
      "escudo": 3000,
      "esoterico": 6000
    },
    "effect": {
      "customText": "Ignora 10 de RD (arma) ou 25% de chance de ignorar críticos (armadura/escudo)."
    }
  },
  {
    "id": "adamante",
    "name": "Adamante",
    "type": "material_especial",
    "targetCategories": ["arma", "armadura", "escudo", "esoterico"],
    "description": "O metal mais duro conhecido em Arton. Armas aumentam o dado de dano em um passo (ex: 1d8 para 1d10). Armaduras leves concedem RD 2, pesadas concedem RD 5, e escudos aumentam a Defesa em +1.",
    "priceByItemType": {
      "arma": 3000,
      "armadura_leve": 6000,
      "armadura_pesada": 18000,
      "escudo": 6000,
      "esoterico": 3000
    },
    "effect": {
      "customText": "Aumenta o dado de dano em um passo (arma) ou concede Redução de Dano (armadura)."
    }
  },
  {
    "id": "gelo_eterno",
    "name": "Gelo eterno",
    "type": "material_especial",
    "targetCategories": ["arma", "armadura", "escudo", "esoterico"],
    "description": "Gelo sobrenaturalmente endurecido das Montanhas Uivantes que nunca derrete. Armas causam +1d6 de dano de frio. Armaduras e escudos fornecem resistência a fogo 5.",
    "priceByItemType": {
      "arma": 600,
      "armadura_leve": 1500,
      "armadura_pesada": 3000,
      "escudo": 1500,
      "esoterico": 3000
    },
    "effect": {
      "customText": "+1d6 dano de frio (arma) ou Resistência a Fogo 5 (armadura/escudo)."
    }
  },
  {
    "id": "madeira_tollon",
    "name": "Madeira Tollon",
    "type": "material_especial",
    "targetCategories": ["arma", "escudo", "esoterico"],
    "requirementText": "Apenas armas de madeira (arcos, bordões, lanças, clavas), escudos leves ou esotéricos",
    "description": "Madeira negra e dura da Floresta de Tollon com forte ressonância mágica. Armas reduzem o custo de ataques em -1 PM. Escudos e esotéricos fornecem Resistência a Magia +2.",
    "priceByItemType": {
      "arma": 1500,
      "escudo": 1500,
      "esoterico": 1500
    },
    "effect": {
      "customText": "-1 PM no custo de habilidades de ataque (arma) ou +2 em resistência a magia (escudo/esotérico)."
    }
  },
  {
    "id": "materia_vermelha",
    "name": "Matéria vermelha",
    "type": "material_especial",
    "targetCategories": ["arma", "armadura", "escudo", "esoterico"],
    "description": "Matéria aberrante da tempestade alienígena. Causa +1d6 de dano extra em armas (mas o portador perde 1 PV por acerto a menos que seja Lefou). Armaduras fornecem chance de falha (10% leve, 25% pesada).",
    "priceByItemType": {
      "arma": 1500,
      "armadura_leve": 6000,
      "armadura_pesada": 18000,
      "escudo": 6000,
      "esoterico": 3000
    },
    "effect": {
      "customText": "+1d6 de dano e perda de 1 PV (arma) ou chance de camuflagem defensiva (armadura)."
    }
  },
  {
    "id": "mitral",
    "name": "Mitral",
    "type": "material_especial",
    "targetCategories": ["arma", "armadura", "escudo", "esoterico"],
    "description": "Metal prateado, brilhante e extremamente leve. Itens ocupam -1 espaço (mínimo 1). Armas aumentam a margem de ameaça em +1. Armaduras reduzem a penalidade em -2 e pesadas permitem aplicar até +2 de Destreza na Defesa.",
    "priceByItemType": {
      "arma": 1500,
      "armadura_leve": 1500,
      "armadura_pesada": 12000,
      "escudo": 1500,
      "esoterico": 3000
    },
    "effect": {
      "spacesModifier": -1,
      "critThreatBonus": 1,
      "armorPenaltyBonus": 2,
      "customText": "-1 espaço, +1 margem de ameaça (arma) ou -2 penalidade de armadura."
    }
  }
]

# Custos por faixa de melhoria conforme Tabela 3-7 do Livro JDA
IMPROVEMENT_TIER_COSTS = {
  1: 300,
  2: 3000,
  3: 9000,
  4: 18000
}

# Write equipment.ts
equipment_ts_content = f"""import {{ EquipmentItem }} from '../types/rules';

export const EQUIPMENT_LIST: EquipmentItem[] = {json.dumps(EQUIPMENT_DATA, indent=2, ensure_ascii=False)};
"""

with open('src/data/equipment.ts', 'w', encoding='utf-8') as f:
    f.write(equipment_ts_content)

print(f"Generated src/data/equipment.ts with {len(EQUIPMENT_DATA)} equipment items.")

# Write itemModifiers.ts
item_modifiers_ts_content = f"""import {{ ItemModifier, EquipmentItem }} from '../types/rules';

export const IMPROVEMENT_TIER_COSTS: Record<number, number> = {json.dumps(IMPROVEMENT_TIER_COSTS, indent=2)};

export const ITEM_MODIFIERS_LIST: ItemModifier[] = {json.dumps(ITEM_MODIFIERS_DATA, indent=2, ensure_ascii=False)};

/**
 * Verifica se um modificador pode ser aplicado a um determinado item.
 */
export function canApplyModifier(item: EquipmentItem, modifier: ItemModifier, currentModifiers: string[] = []): {{ allowed: boolean; reason?: string }} {{
  // 1. Limite de 4 melhorias
  if (currentModifiers.length >= 4 && !currentModifiers.includes(modifier.id)) {{
    return {{ allowed: false, reason: 'Itens superiores suportam no máximo 4 melhorias (Tabela 3-7).' }};
  }}

  // 2. Modificador já aplicado
  if (currentModifiers.includes(modifier.id)) {{
    return {{ allowed: false, reason: 'Este modificador já foi aplicado ao item.' }};
  }}

  // 3. Apenas um material especial por item
  if (modifier.type === 'material_especial') {{
    const hasSpecialMaterial = currentModifiers.some((modId) => {{
      const m = ITEM_MODIFIERS_LIST.find((x) => x.id === modId);
      return m && m.type === 'material_especial';
    }});
    if (hasSpecialMaterial) {{
      return {{ allowed: false, reason: 'Um item só pode ser feito de um único material especial.' }};
    }}
  }}

  // 4. Incompatibilidade direta
  if (modifier.incompatibleWith) {{
    for (const incomp of modifier.incompatibleWith) {{
      if (currentModifiers.includes(incomp)) {{
        const incompName = ITEM_MODIFIERS_LIST.find((x) => x.id === incomp)?.name || incomp;
        return {{ allowed: false, reason: `Incompatível com ${{incompName}}.` }};
      }}
    }}
  }}

  // 5. Categoria de destino
  const isWeapon = item.category.startsWith('arma');
  const isArmor = item.category.startsWith('armadura');
  const isShield = item.category === 'escudo';
  const isEsoteric = item.category === 'esoterico';
  const isTool = item.category === 'ferramenta';
  const isClothing = item.category === 'vestuario';

  const matchesCategory = modifier.targetCategories.some((cat) => {{
    if (cat === 'qualquer') return true;
    if (cat === 'arma' && isWeapon) return true;
    if (cat === 'armadura' && isArmor) return true;
    if (cat === 'escudo' && isShield) return true;
    if (cat === 'esoterico' && isEsoteric) return true;
    if (cat === 'ferramenta' && isTool) return true;
    if (cat === 'vestuario' && isClothing) return true;
    return false;
  }});

  if (!matchesCategory) {{
    return {{ allowed: false, reason: `Este modificador não pode ser aplicado à categoria ${{item.category.replace('_', ' ')}}.` }};
  }}

  // 6. Regras específicas
  if (modifier.id === 'delicada' || modifier.id === 'selada') {{
    if (item.category !== 'armadura_pesada') {{
      return {{ allowed: false, reason: 'Esta melhoria só pode ser aplicada a armaduras pesadas.' }};
    }}
  }}

  if (modifier.id === 'mira_telescopica') {{
    if (item.subcategory !== 'distancia' && item.category !== 'arma_fogo') {{
      return {{ allowed: false, reason: 'Apenas armas de disparo (arcos, bestas e armas de fogo) podem receber mira telescópica.' }};
    }}
  }}

  if (modifier.id === 'pungente' && !currentModifiers.includes('certeira')) {{
    return {{ allowed: false, reason: 'Requer que o item já possua a melhoria Certeira.' }};
  }}

  if (modifier.id === 'atroz' && !currentModifiers.includes('cruel')) {{
    return {{ allowed: false, reason: 'Requer que o item já possua a melhoria Cruel.' }};
  }}

  if (modifier.id === 'sob_medida' && !currentModifiers.includes('ajustada')) {{
    return {{ allowed: false, reason: 'Requer que o item já possua a melhoria Ajustada.' }};
  }}

  if (modifier.id === 'madeira_tollon') {{
    const woodenWeapons = ['arco_curto', 'arco_longo', 'bordao', 'lanca', 'pique', 'clava', 'tacape'];
    if (isWeapon && !woodenWeapons.includes(item.id)) {{
      return {{ allowed: false, reason: 'Apenas armas de madeira (arcos, bordões, lanças, clavas) podem ser feitas de Madeira Tollon.' }};
    }}
    if (isShield && item.id !== 'escudo_leve') {{
      return {{ allowed: false, reason: 'Apenas escudos leves podem ser feitos de Madeira Tollon.' }};
    }}
  }}

  return {{ allowed: true }};
}}

/**
 * Calcula o custo total e as estatísticas de um item com modificadores aplicados.
 */
export function calculateModifiedItem(item: EquipmentItem, appliedModifierIds: string[]): {{
  name: string;
  totalPrice: number;
  totalPriceStr: string;
  defenseBonus: number;
  armorPenalty: number;
  spaces: number;
  critThreat: number;
  critMultiplier: number;
  additionalEffects: string[];
}} {{
  // Converte preço base
  const cleanPrice = parseFloat(item.price.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
  let totalPrice = cleanPrice;

  const improvementsCount = appliedModifierIds.length;
  if (improvementsCount > 0 && improvementsCount <= 4) {{
    totalPrice += IMPROVEMENT_TIER_COSTS[improvementsCount] || 0;
  }}

  let defenseBonus = item.defenseBonus || 0;
  let armorPenalty = item.armorPenalty || 0;
  let spaces = item.spaces;
  let critThreat = 20;
  let critMultiplier = 2;

  // Analisa crítico base da arma
  if (item.critical) {{
    if (item.critical.includes('/x')) {{
      const parts = item.critical.split('/x');
      critThreat = parseInt(parts[0], 10) || 20;
      critMultiplier = parseInt(parts[1], 10) || 2;
    }} else if (item.critical.startsWith('x')) {{
      critMultiplier = parseInt(item.critical.replace('x', ''), 10) || 2;
    }} else {{
      critThreat = parseInt(item.critical, 10) || 20;
    }}
  }}

  const appliedModifiers = appliedModifierIds
    .map((id) => ITEM_MODIFIERS_LIST.find((m) => m.id === id))
    .filter(Boolean) as ItemModifier[];

  const additionalEffects: string[] = [];
  const namePrefixes: string[] = [];
  const nameSuffixes: string[] = [];

  for (const mod of appliedModifiers) {{
    if (mod.type === 'material_especial') {{
      nameSuffixes.push(`de ${{mod.name}}`);
      // Custo adicional do material
      if (mod.priceByItemType) {{
        let itemCatKey: 'arma' | 'armadura_leve' | 'armadura_pesada' | 'escudo' | 'esoterico' = 'arma';
        if (item.category.startsWith('arma')) itemCatKey = 'arma';
        else if (item.category === 'armadura_leve') itemCatKey = 'armadura_leve';
        else if (item.category === 'armadura_pesada') itemCatKey = 'armadura_pesada';
        else if (item.category === 'escudo') itemCatKey = 'escudo';
        else if (item.category === 'esoterico') itemCatKey = 'esoterico';

        totalPrice += mod.priceByItemType[itemCatKey] || 0;
      }}
    }} else {{
      namePrefixes.push(mod.name);
    }}

    // Aplica efeitos
    if (mod.effect.defenseBonus) defenseBonus += mod.effect.defenseBonus;
    if (mod.effect.armorPenaltyBonus) armorPenalty += mod.effect.armorPenaltyBonus; // reduz penalidade
    if (mod.effect.spacesModifier) spaces = Math.max(1, spaces + mod.effect.spacesModifier);
    if (mod.effect.critThreatBonus) critThreat -= mod.effect.critThreatBonus;
    if (mod.effect.critMultiplierBonus) critMultiplier += mod.effect.critMultiplierBonus;
    if (mod.effect.customText) additionalEffects.push(mod.effect.customText);
  }}

  // Monta nome composto
  let compiledName = item.name;
  if (namePrefixes.length > 0) {{
    compiledName = `${{compiledName}} ${{namePrefixes.join(' ')}}`;
  }}
  if (nameSuffixes.length > 0) {{
    compiledName = `${{compiledName}} ${{nameSuffixes.join(' ')}}`;
  }}

  return {{
    name: compiledName,
    totalPrice,
    totalPriceStr: `T$ ${{totalPrice.toLocaleString('pt-BR')}}`,
    defenseBonus,
    armorPenalty,
    spaces,
    critThreat,
    critMultiplier,
    additionalEffects,
  }};
}}
"""

with open('src/data/itemModifiers.ts', 'w', encoding='utf-8') as f:
    f.write(item_modifiers_ts_content)

print(f"Generated src/data/itemModifiers.ts with {len(ITEM_MODIFIERS_DATA)} modifiers & materials.")
