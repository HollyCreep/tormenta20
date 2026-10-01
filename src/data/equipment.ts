import { EquipmentItem } from '../types/rules';

export const EQUIPMENT_LIST: EquipmentItem[] = [
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
    "description": "Peitoral e espaldar de aço forjado que protegem o torso, presos sobre gibão almofadado. A armadura leve mais resistente."
  },
  {
    "id": "brunea",
    "name": "Brunea",
    "category": "armadura_pesada",
    "price": "T$ 50",
    "defenseBonus": 5,
    "armorPenalty": -2,
    "spaces": 5,
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
    "description": "O ápice da metalurgia militar. Placas de aço cobrem integralmente o cavaleiro dos pés ao pescoço, incluindo elmo fechado e manoplas."
  },
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
];
