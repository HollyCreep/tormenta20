import { EquipmentItem } from '../types/rules';

/**
 * Equipamento — T20 JdA v1.3, Capítulo 3. Armas (Tabela 3-3, págs. 144–145), munições (Tabela 3-4),
 * armaduras e escudos (Tabela 3-5, pág. 153) e itens gerais (Tabela 3-6, págs. 156–157), gerados por
 * .agents/tools/gen_equipment.py e .agents/tools/gen_items.py a partir do texto do livro.
 */
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
    "spaces": 1,
    "description": "Mecanismo de arco metálico horizontal montado sobre coronha de madeira. Recarregar exige uma ação de movimento."
  },
  {
    "id": "funda",
    "name": "Funda",
    "category": "arma_simples",
    "subcategory": "distancia",
    "price": "T$ 0",
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
    "category": "arma_exotica",
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
    "damageType": "Corte/perfuração",
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
    "category": "arma_exotica",
    "subcategory": "distancia",
    "price": "T$ 20",
    "damage": "-",
    "critical": "-",
    "damageType": "Especial",
    "range": "Curto",
    "spaces": 1,
    "description": "Rede trançada com pesos nas bordas. Ao acertar, não causa dano mas deixa o alvo enredado e preso."
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
    "damageType": "Corte",
    "spaces": 2,
    "description": "Arma dupla e alongada com 3m de alcance que pode atacar oponentes adjacentes. Fornece +2 em testes de derrubar e desarmar."
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
    "description": "Aljava contendo 20 flechas de madeira com ponta de metal e penas de voo.",
    "damage": "-",
    "critical": "-"
  },
  {
    "id": "virotes_20",
    "name": "Virotes (20)",
    "category": "item_geral",
    "price": "T$ 2",
    "spaces": 1,
    "description": "Pacote com 20 virotes curtos e pesados para bestas leves ou pesadas.",
    "damage": "-",
    "critical": "-"
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
    "price": "T$ 3.000",
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
    "id": "gadanho",
    "name": "Gadanho",
    "category": "arma_marcial",
    "subcategory": "duas_maos",
    "price": "T$ 18",
    "damage": "2d4",
    "critical": "x4",
    "damageType": "Corte",
    "spaces": 2,
    "description": "Outra ferramenta agrícola, o gadanho é uma versão maior da foice, para uso com as duas mãos. Foi criada para ceifar cereais, mas também pode ceifar vidas."
  },
  {
    "id": "marreta",
    "name": "Marreta",
    "category": "arma_marcial",
    "subcategory": "duas_maos",
    "price": "T$ 20",
    "damage": "3d4",
    "critical": "x2",
    "damageType": "Impacto",
    "spaces": 2,
    "description": "Uma haste de madeira resistente com uma pesada cabeça de metal ou pedra."
  },
  {
    "id": "katana",
    "name": "Katana",
    "category": "arma_exotica",
    "subcategory": "uma_mao",
    "price": "T$ 100",
    "damage": "1d8/1d10",
    "critical": "19",
    "damageType": "Corte",
    "spaces": 1,
    "description": "A espada tradicional do samurai tem lâmina levemente curva e apenas um gume. A katana é uma arma adaptável e ágil. É muito grande para ser empunhada com uma só mão sem treinamento especial; por isso, é uma arma exótica. Ela pode ser usada como uma arma marcial de duas mãos."
  },
  {
    "id": "machado_anao",
    "name": "Machado anão",
    "category": "arma_exotica",
    "subcategory": "uma_mao",
    "price": "T$ 30",
    "damage": "1d10",
    "critical": "x3",
    "damageType": "Corte",
    "spaces": 1,
    "description": "A arma preferida de onze entre dez guerreiros anões. Um machado anão é muito grande para ser usado com uma só mão sem treinamento especial; por isso é uma arma exótica. Ele pode ser usado como uma arma marcial de duas mãos."
  },
  {
    "id": "agua_benta",
    "name": "Água benta",
    "category": "item_geral",
    "price": "T$ 10",
    "spaces": 0.5,
    "description": "Produzida com a magia Abençoar Alimentos, esta água sagrada é um poderoso recurso na luta contra o mal. Para usar a água benta, você gasta uma ação padrão e escolhe um morto-vivo ou abissal em alcance curto (a água benta é inofensiva contra outras criaturas). O alvo sofre 2d10 pontos de dano de luz (Reflexos CD Sab reduz à metade)."
  },
  {
    "id": "algemas",
    "name": "Algemas",
    "category": "item_geral",
    "price": "T$ 15",
    "spaces": 1,
    "description": "Um par de algemas para criaturas Médias. Prender uma criatura que não esteja indefesa exige empunhar a algema, agarrar o alvo (veja “Manobras de Combate”, no Capítulo 5) e vencer um novo teste de agarrar contra ela. Você pode prender os dois pulsos da pessoa (–5 em testes que exijam o uso das mãos, impede conjuração) ou um dos pulsos dela em um objeto imóvel adjacente, caso haja, para impedir que ela se mova. Escapar das algemas exige uma ação completa e um teste de Acrobacia contra CD 30 ou de Força contra CD 25 — ou ter as chaves..."
  },
  {
    "id": "arpeu",
    "name": "Arpéu",
    "category": "item_geral",
    "price": "T$ 5",
    "spaces": 1,
    "description": "Um gancho de aço amarrado na ponta de uma corda para se fixar em muros, janelas, parapeitos de prédios... Prender um arpéu exige um teste de Pontaria (CD 15). Subir um muro com a ajuda de uma corda fornece +5 no teste de Atletismo."
  },
  {
    "id": "bandoleira_de_pocoes",
    "name": "Bandoleira de poções",
    "category": "item_geral",
    "price": "T$ 20",
    "spaces": 1,
    "description": "Um cinto de couro com bolsos que comportam pequenos frascos. Se você estiver vestindo uma bandoleira, pode sacar itens alquímicos e poções como uma ação livre. Itens gerais"
  },
  {
    "id": "tenda",
    "name": "Barraca",
    "category": "item_geral",
    "price": "T$ 10",
    "spaces": 1,
    "description": "Esta barraca de lona conta como um saco de dormir para duas pessoas e fornece +2 em testes de Sobrevivência para acampar."
  },
  {
    "id": "corda",
    "name": "Corda",
    "category": "item_geral",
    "price": "T$ 1",
    "spaces": 1,
    "description": "Um rolo com 10 metros de corda de cânhamo, o mesmo tipo usado em navios. Possui diversas utilidades: pode ajudar a descer um buraco ou muro (+5 em testes de Atletismo nessas situações), amarrar pessoas etc. Dar um nó firme ou especial (por exemplo, capaz de deslizar, se desfazer com um puxão etc.) exige um teste de Destreza (CD 15). Arrebentar a corda exige 2 pontos de dano de corte ou uma ação padrão e um teste de Força (CD 20)."
  },
  {
    "id": "espelho_metal",
    "name": "Espelho",
    "category": "item_geral",
    "price": "T$ 10",
    "spaces": 1,
    "description": "Este pequeno espelho possui diversas utilidades: observar cantos, fazer sinais de luz e, claro, garantir que você esteja apresentável."
  },
  {
    "id": "lanterna",
    "name": "Lampião",
    "category": "item_geral",
    "price": "T$ 7",
    "spaces": 1,
    "description": "Um cilindro com uma alça e duas portinholas. Uma chama alimentada por óleo é acesa dentro do cilindro e uma das portinholas aberta deixa a luz sair. Acender um lampião é uma ação padrão e sua luz ilumina um raio com 15m. Carregar um lampião com óleo é uma ação padrão e ele dura uma cena."
  },
  {
    "id": "mochila",
    "name": "Mochila",
    "category": "item_geral",
    "price": "T$ 2",
    "spaces": 0,
    "description": "Uma bolsa de lona com tiras para ser carregada nas costas. Não conta como item vestido."
  },
  {
    "id": "mochila_de_aventureiro",
    "name": "Mochila de aventureiro",
    "category": "item_geral",
    "price": "T$ 50",
    "spaces": 0,
    "description": "Feita de couro resistente, esta mochila é repleta de bolsos para prender equipamento. Vestir uma mochila de aventureiro aumenta sua capacidade de carga em 2 espaços (ela própria não gasta um espaço)."
  },
  {
    "id": "oleo_frasco",
    "name": "Óleo",
    "category": "item_geral",
    "price": "T$ 0,1",
    "spaces": 0.5,
    "description": "Um frasco com óleo inflamável para"
  },
  {
    "id": "organizador_de_pergaminhos",
    "name": "Organizador de pergaminhos",
    "category": "item_geral",
    "price": "T$ 25",
    "spaces": 1,
    "description": "Um estojo de madeira ou couro rígido. Se você estiver vestindo um organizador de pergaminhos, pode sacar pergaminhos como uma ação livre."
  },
  {
    "id": "pe_de_cabra",
    "name": "Pé de cabra",
    "category": "item_geral",
    "price": "T$ 2",
    "spaces": 1,
    "description": "Esta barra de ferro fornece +5 em testes de Força para abrir portas, janelas e baús fechados. Um pé de cabra pode ser usado como arma, com as estatísticas de uma clava."
  },
  {
    "id": "saco_dormir",
    "name": "Saco de dormir",
    "category": "item_geral",
    "price": "T$ 1",
    "spaces": 1,
    "description": "Um colchão com uma coberta fina o bastante para ser enrolada e amarrada, é especialmente útil para aventureiros, que nunca Tabela 3-6: Itens Gerais Equipamento de Aventura Vestuário (continuação) Água benta T$ 10 0,5 Chapéu arcano T$ 50 Algemas T$ 15 Enfeite de elmo T$ 15 Arpéu T$ 5 Farrapos de ermitão T$ 1 Bandoleira de poções T$ 20 Gorro de ervas T$ 75 Barraca T$ 10 Luva de pelica T$ 5 Corda T$ 1 Manopla T$ 10 Espelho T$ 10 Manto camuflado T$ 12 Lampião T$ 7 Manto eclesiástico T$ 20 Mochila T$ 2 — Robe místico T$ 50 Mochila de aventureiro T$ 50 — Sapatos de camurça T$ 8 Óleo T$ 0,1 0,5 Tabardo T$ 10 Organizador de pergaminhos T$ 25 Traje da corte T$ 100 Pé de cabra T$ 2 Traje de viajante T$ 10 — Saco de dormir T$ 1 Veste de seda T$ 25 Símbolo sagrado T$ 5 Tocha T$ 0,1"
  },
  {
    "id": "simbolo_sagrado",
    "name": "Símbolo sagrado",
    "category": "item_geral",
    "price": "T$ 5",
    "spaces": 1,
    "description": "Um medalhão de madeira ou metal com o símbolo de uma divindade. Se você estiver vestindo (normalmente com uma corrente ao redor do pescoço) ou empunhando o símbolo sagrado de um deus do qual é devoto, recebe +1 em testes de resistência."
  },
  {
    "id": "tocha",
    "name": "Tocha",
    "category": "item_geral",
    "price": "T$ 0,1",
    "spaces": 1,
    "description": "Um bastão de madeira com algum combustível na ponta (geralmente trapos embebidos em parafina). Acender uma tocha é uma ação padrão. Ela ilumina um raio de 9m e dura uma cena. Pode ser usada como uma arma simples leve (dano 1d4 de impacto mais 1 de fogo, crítico x2)."
  },
  {
    "id": "vara_de_madeira_3m",
    "name": "Vara de madeira (3m)",
    "category": "item_geral",
    "price": "T$ 0,2",
    "spaces": 1,
    "description": "Uma haste com 3m de comprimento. Útil para alcançar pontos distantes, mas frágil demais para servir como arma."
  },
  {
    "id": "alaude_elfico",
    "name": "Alaúde élfico",
    "category": "ferramenta",
    "price": "T$ 300",
    "spaces": 1,
    "description": "Feito com madeira de alta qualidade e manufatura delicada, este alaúde gera notas vívidas e emocionantes. Enquanto empunha este item, você pode usar a habilidade Inspiração como uma ação de movimento. Conta como um"
  },
  {
    "id": "colecao_de_livros",
    "name": "Coleção de livros",
    "category": "ferramenta",
    "price": "T$ 75",
    "spaces": 1,
    "description": "Uma pequena coleção de tomos e tratados sobre um assunto. Fornece +1 em Conhecimento, Guerra, Misticismo, Nobreza ou Religião (definido quando o item é comprado ou fabricado)."
  },
  {
    "id": "equipamento_de_viagem",
    "name": "Equipamento de viagem",
    "category": "ferramenta",
    "price": "T$ 10",
    "spaces": 1,
    "description": "Um saco de lona contendo instrumentos úteis para sobreviver nos ermos, como pederneira (pedra para fazer fogo), panelas e talheres para cozinhar, anzól e linha para pescar e uma pequena pá. Um personagem sem este item sofre –5 em testes de Sobrevivência para fazer um acampamento. Não inclui saco de dormir ou"
  },
  {
    "id": "kit_disfarce",
    "name": "Estojo de disfarces",
    "category": "ferramenta",
    "price": "T$ 50",
    "spaces": 1,
    "description": "Um conjunto de cosméticos, tintas para cabelo e algumas próteses simples (como bigodes e narizes falsos). Um personagem sem este item sofre –5 em testes de Enganação para disfarce."
  },
  {
    "id": "flauta_mistica",
    "name": "Flauta mística",
    "category": "ferramenta",
    "price": "T$ 150",
    "spaces": 1,
    "description": "Um instrumento delicado, repleto de runas e pequenas gemas místicas. Um bardo que empunhe este item aumenta a CD para resistir às magias lançadas por ele em +1. Conta como um"
  },
  {
    "id": "kit_ladrao",
    "name": "Gazua",
    "category": "ferramenta",
    "price": "T$ 5",
    "spaces": 1,
    "description": "Uma barra fina de ferro, com a ponta torta ou em forma de gancho. Um personagem sem este item sofre –5 em testes de Ladinagem para abrir fechaduras."
  },
  {
    "id": "instrumentos_de_oficio",
    "name": "Instrumentos de ofício",
    "category": "ferramenta",
    "price": "T$ 30",
    "spaces": 1,
    "description": "Existe uma versão deste item para cada perícia de Ofício. Por exemplo, martelo, pregos e serrote para Ofício (carpinteiro), pergaminhos em branco, tinta e pena para Ofício (escriba) e assim por diante. Um personagem sem os instrumentos de seu Ofício sofre –5 nessa perícia."
  },
  {
    "id": "instrumento_musical",
    "name": "Instrumento musical",
    "category": "ferramenta",
    "price": "T$ 35",
    "spaces": 1,
    "description": "Coleção de Livros. Uma pequena coleção de tomos e tratados sobre um assunto. Fornece +1 em Conhecimento, Guerra, Misticismo, Nobreza ou Religião (definido quando o item é comprado ou fabricado)."
  },
  {
    "id": "luneta",
    "name": "Luneta",
    "category": "ferramenta",
    "price": "T$ 100",
    "spaces": 1,
    "description": "Este instrumento valioso consiste de um cilindro metálico com duas lentes. Fornece +5 em testes de Percepção para observar coisas em alcance longo ou além."
  },
  {
    "id": "maleta_medicamentos",
    "name": "Maleta de medicamentos",
    "category": "ferramenta",
    "price": "T$ 50",
    "spaces": 1,
    "description": "Caixa de madeira com ervas, unguentos, bandagens e outros materiais úteis. Um personagem sem este item sofre –5 em Cura."
  },
  {
    "id": "sela",
    "name": "Sela",
    "category": "ferramenta",
    "price": "T$ 20",
    "spaces": 1,
    "description": "Uma peça de couro e pelego colocada sobre o lombo da montaria, sobre a qual o cavaleiro se senta. Inclui arreios para conduzir o animal. Um personagem montado em uma montaria sem sela sofre –5 em testes de Cavalgar. Usada no animal, a sela não ocupa espaço de carga do personagem."
  },
  {
    "id": "tambor_das_profundezas",
    "name": "Tambor das profundezas",
    "category": "ferramenta",
    "price": "T$ 80",
    "spaces": 1,
    "description": "Um instrumento típico de anões de Doherimm, capaz de sons graves e retumbantes. Enquanto empunha este item, o alcance da habilidade Inspiração e de qualquer Música de Bardo é dobrado. Conta como um"
  },
  {
    "id": "andrajos_de_aldeao",
    "name": "Andrajos de aldeão",
    "category": "vestuario",
    "price": "T$ 1",
    "spaces": 1,
    "description": "Roupas típicas de camponês. Consiste de camisa larga e calças soltas ou blusa e saia e não inclui botas — os mais pobres andam descalços. Fornece +2 em testes de Investigação para interrogar (ninguém se importa com o que um aldeão escuta) e, se você possuir o poder Aparência Inofensiva, a CD para resistir a ele aumenta em +2. Porém, impõe –2 em perícias baseadas em Carisma contra pessoas que se importam com classe social."
  },
  {
    "id": "bandana",
    "name": "Bandana",
    "category": "vestuario",
    "price": "T$ 5",
    "spaces": 1,
    "description": "Um lenço tipicamente usado por bandidos e piratas. Fornece +1 em Intimidação."
  },
  {
    "id": "botas_reforcadas",
    "name": "Botas reforçadas",
    "category": "vestuario",
    "price": "T$ 20",
    "spaces": 1,
    "description": "Grossas e resistentes, estas botas de cano alto protegem contra perigos do terreno. Aumentam seu deslocamento em +1,5m se ele for reduzido por terreno difícil (após a redução)."
  },
  {
    "id": "camisa_bufante",
    "name": "Camisa bufante",
    "category": "vestuario",
    "price": "T$ 25",
    "spaces": 1,
    "description": "Blusa colorida, com mangas e golas longas e encrespadas. Fornece +1 em Atuação."
  },
  {
    "id": "capa_esvoacante",
    "name": "Capa esvoaçante",
    "category": "vestuario",
    "price": "T$ 25",
    "spaces": 1,
    "description": "Favorita entre heróis ousados, esta capa de seda produz movimentos amplos e chamativos, que fornecem +1 em Enganação."
  },
  {
    "id": "capa_pesada",
    "name": "Capa pesada",
    "category": "vestuario",
    "price": "T$ 15",
    "spaces": 1,
    "description": "Uma capa de couro grossa e resistente. Protege e aquece o corpo, fornecendo +1 em Fortitude."
  },
  {
    "id": "casaco_longo",
    "name": "Casaco longo",
    "category": "vestuario",
    "price": "T$ 20",
    "spaces": 1,
    "description": "Feito de peles ou couro grosso forrado com lã, e impermeabilizado com óleo, este casaco é quente e pesado. Fornece +5 em testes de Fortitude para resistir a efeitos de frio, mas impõe penalidade de armadura de –2."
  },
  {
    "id": "chapeu_arcano",
    "name": "Chapéu arcano",
    "category": "vestuario",
    "price": "T$ 50",
    "spaces": 1,
    "description": "Com pinturas e bordados de símbolos místicos, este chapéu pontudo ajuda a canalizar energias mágicas. Ele fornece +1 ponto de mana, mas apenas se você possuir a habilidade de classe Caminho do Arcanista."
  },
  {
    "id": "enfeite_de_elmo",
    "name": "Enfeite de elmo",
    "category": "vestuario",
    "price": "T$ 15",
    "spaces": 1,
    "description": "Um adorno chamativo, como crina de cavalo, plumas, asas ou um totem de animal. Fornece resistência a medo +2."
  },
  {
    "id": "farrapos_de_ermitao",
    "name": "Farrapos de ermitão",
    "category": "vestuario",
    "price": "T$ 1",
    "spaces": 1,
    "description": "Trapos “adornados” com plantas e raízes. Uma pessoa vestindo farrapos de ermitão não parece muito civilizada, e sofre –2 em Diplomacia e em testes de Investigação para interrogar. Entretanto, recebe +2 em Adestramento."
  },
  {
    "id": "gorro_de_ervas",
    "name": "Gorro de ervas",
    "category": "vestuario",
    "price": "T$ 75",
    "spaces": 1,
    "description": "Formado por duas camadas de tecido, este chapéu é preenchido com ervas preparadas para auxiliar a concentração do usuário. Fornece +1 em Vontade."
  },
  {
    "id": "luvas_pelica",
    "name": "Luva de pelica",
    "category": "vestuario",
    "price": "T$ 5",
    "spaces": 1,
    "description": "Estas luvas delicadas preservam o tato e impedem que o suor deixe os dedos escorregadios. Fornecem +1 em Ladinagem."
  },
  {
    "id": "manopla",
    "name": "Manopla",
    "category": "vestuario",
    "price": "T$ 10",
    "spaces": 1,
    "description": "Luva metálica que permite socos mais perigosos — o dano de seus ataques desarmados torna-se letal. Uma manopla conta como uma arma para receber melhorias e encantos para usá-los em seus ataques desarmados."
  },
  {
    "id": "manto_camuflado",
    "name": "Manto camuflado",
    "category": "vestuario",
    "price": "T$ 12",
    "spaces": 1,
    "description": "Um manto camuflado é feito para um tipo de terreno específico (veja a habilidade Explorador, na página 51). Por exemplo, um manto camuflado para floresta pode ser verde e marrom e coberto de folhas, enquanto um manto urbano pode ser cinza ou negro. Usar um manto camuflado no terreno correto fornece +2 em Furtividade."
  },
  {
    "id": "manto_eclesiastico",
    "name": "Manto eclesiástico",
    "category": "vestuario",
    "price": "T$ 20",
    "spaces": 1,
    "description": "Um manto típico de igrejas e templos. Fornece +1 em Religião."
  },
  {
    "id": "robe_mistico",
    "name": "Robe místico",
    "category": "vestuario",
    "price": "T$ 50",
    "spaces": 1,
    "description": "Um manto longo, adornado com temas arcanos. Fornece +1 em Misticismo."
  },
  {
    "id": "sapatos_de_camurca",
    "name": "Sapatos de camurça",
    "category": "vestuario",
    "price": "T$ 8",
    "spaces": 1,
    "description": "Leves e resistentes, aprimoram o equilíbrio e a firmeza dos pés, fornecendo +1 em Acrobacia."
  },
  {
    "id": "tabardo",
    "name": "Tabardo",
    "category": "vestuario",
    "price": "T$ 10",
    "spaces": 1,
    "description": "Uma peça de tecido usada como um colete, cobrindo o peito e as costas. Geralmente ostenta a heráldica de um reino, igreja, casa nobre ou ordem de cavaleiros. Fornece +1 em Diplomacia."
  },
  {
    "id": "traje_corte",
    "name": "Traje da corte",
    "category": "vestuario",
    "price": "T$ 100",
    "spaces": 1,
    "description": "Roupas de luxo, feitas sob medida e adequadas à nobreza e realeza. Inclui algumas joias, como aneis e colares. Em certos ambientes (um baile, um salão de palácio), um personagem que não esteja vestindo este item sofre –5 em perícias baseadas em Carisma."
  },
  {
    "id": "traje_viajante",
    "name": "Traje de viajante",
    "category": "vestuario",
    "price": "T$ 10",
    "spaces": 0,
    "description": "Inclui botas, calças ou saias, cinto, camisa de linho e capa com capuz. A roupa padrão de aventureiros."
  },
  {
    "id": "veste_de_seda",
    "name": "Veste de seda",
    "category": "vestuario",
    "price": "T$ 25",
    "spaces": 1,
    "description": "Esta roupa leve e elegante deixa seus movimentos os mais livres possíveis. Fornece +1 em Reflexos."
  },
  {
    "id": "bolsa_de_po",
    "name": "Bolsa de pó",
    "category": "esoterico",
    "price": "T$ 300",
    "spaces": 1,
    "description": "Uma bolsa com pó multicolorido, fabricado a partir das pétalas trituradas de flores que nascem apenas na Pondsmânia. Quando lança uma magia de encantamento ou ilusão, você recebe +2 PM para gastar em aprimoramentos."
  },
  {
    "id": "cajado_arcano",
    "name": "Cajado arcano",
    "category": "esoterico",
    "price": "T$ 1.000",
    "spaces": 2,
    "description": "Um cajado típico, feito de madeira de boa qualidade e entalhado com runas. O limite de PM que você pode gastar em magias arcanas e a CD para resistir a elas aumentam em +1. Para fornecer seus benefícios, um cajado precisa ser empunhado com as duas mãos. Ele pode ser usado como arma, com as estatísticas de um bordão."
  },
  {
    "id": "cetro_elemental",
    "name": "Cetro elemental",
    "category": "esoterico",
    "price": "T$ 750",
    "spaces": 1,
    "description": "Este cetro possui uma pedra preciosa em sua ponta: esmeralda (ácido), topázio (eletricidade), rubi (fogo) ou safira (frio). Quando lança uma magia que causa dano do tipo da pedra, o dano aumenta em um dado do mesmo tipo."
  },
  {
    "id": "costela_de_lich",
    "name": "Costela de lich",
    "category": "esoterico",
    "price": "T$ 300",
    "spaces": 1,
    "description": "Esta varinha é feita a partir do osso de um morto-vivo. Quando lança uma magia, ela causa +1d6 pontos de dano de trevas. Se estiver empunhando esta varinha você não recupera PV por efeitos mágicos de cura."
  },
  {
    "id": "dedo_de_ente",
    "name": "Dedo de ente",
    "category": "esoterico",
    "price": "T$ 200",
    "spaces": 1,
    "description": "Uma varinha feita da madeira de uma árvore senciente. Sempre que gastar pelo menos 1 PM para lançar uma magia, role 1d4. Com um resultado 4, você recupera 1 PM."
  },
  {
    "id": "luva_de_ferro",
    "name": "Luva de ferro",
    "category": "esoterico",
    "price": "T$ 150",
    "spaces": 1,
    "description": "Um conjunto de dedais interligados por correntes. Suas magias arcanas pessoais que concedem bônus na Defesa ou em testes de resistências têm esse bônus aumentado em +1."
  },
  {
    "id": "medalhao_de_prata",
    "name": "Medalhão de prata",
    "category": "esoterico",
    "price": "T$ 750",
    "spaces": 1,
    "description": "Gravado com uma runa pessoal do conjurador, este medalhão de prata diminui em –1 PM o custo de magias de alcance pessoal."
  },
  {
    "id": "orbe_cristalino",
    "name": "Orbe cristalino",
    "category": "esoterico",
    "price": "T$ 750",
    "spaces": 1,
    "description": "Esta esfera perfeita concentra seu poder mágico. O limite de PM que você pode gastar em magias arcanas aumenta em +1."
  },
  {
    "id": "tomo_hermetico",
    "name": "Tomo hermético",
    "category": "esoterico",
    "price": "T$ 1.500",
    "spaces": 1,
    "description": "Um livro de tratados que aumentam a sua compreensão sobre uma escola de magia específica. A CD para resistir a suas magias arcanas dessa escola aumenta em +2."
  },
  {
    "id": "varinha_arcana",
    "name": "Varinha arcana",
    "category": "esoterico",
    "price": "T$ 100",
    "spaces": 1,
    "description": "Uma varinha típica, feita de madeira de boa qualidade e entalhada com runas. A CD para resistir a suas magias arcanas aumenta em +1."
  },
  {
    "id": "acido",
    "name": "Ácido",
    "category": "alquimia",
    "price": "T$ 10",
    "spaces": 0.5,
    "description": "Frasco de vidro contendo um ácido alquímico altamente corrosivo. Para usar o ácido, você gasta uma ação padrão e escolhe uma criatura em alcance curto. Essa criatura sofre 2d4 pontos de dano de ácido (Reflexos CD Des reduz à metade)."
  },
  {
    "id": "balsamo_restaurador",
    "name": "Bálsamo restaurador",
    "category": "alquimia",
    "price": "T$ 10",
    "spaces": 0.5,
    "description": "Uma pasta verde e fedorenta, feita de ervas medicinais. Usá-la é uma ação completa e recupera 2d4 pontos de vida."
  },
  {
    "id": "bomba",
    "name": "Bomba",
    "category": "alquimia",
    "price": "T$ 50",
    "spaces": 0.5,
    "description": "Uma granada rudimentar. Para usar a bomba, você precisa empunhá-la, gastar uma ação de movimento para acender seu pavio e uma ação padrão para arremessá-la em um ponto em alcance curto. Criaturas a até 3m desse ponto sofrem 6d6 pontos de dano de impacto (Reflexos CD Des reduz à metade)."
  },
  {
    "id": "cosmetico",
    "name": "Cosmético",
    "category": "alquimia",
    "price": "T$ 30",
    "spaces": 0.5,
    "description": "Perfume ou maquiagem. Usá-lo é uma ação completa e fornece +2 em testes de perícias baseadas em Carisma até o fim da cena."
  },
  {
    "id": "elixir_do_amor",
    "name": "Elixir do amor",
    "category": "alquimia",
    "price": "T$ 100",
    "spaces": 0.5,
    "description": "Um humanoide que beba este líquido adocicado fica apaixonado pela primeira criatura que enxergar (condição enfeitiçado; Vontade CD Car anula). O efeito dura 1d3 dias."
  },
  {
    "id": "essencia_mana",
    "name": "Essência de mana",
    "category": "alquimia",
    "price": "T$ 50",
    "spaces": 0.5,
    "description": "Esta poção feita de ervas raras e compostos alquímicos recupera energia pessoal. Beber a essência de mana é uma ação padrão e recupera 1d4 pontos de mana."
  },
  {
    "id": "fogo_alquimico",
    "name": "Fogo alquímico",
    "category": "alquimia",
    "price": "T$ 10",
    "spaces": 0.5,
    "description": "Frasco de cerâmica contendo uma substância que entra em combustão em contato com o ar. Para usar o fogo alquímico, você gasta uma ação padrão e escolhe uma criatura em alcance curto. Essa criatura sofre 1d6 pontos de dano de fogo e fica em chamas. Um teste de Reflexos (CD Des) reduz o dano à metade e evita as chamas."
  },
  {
    "id": "po_do_desaparecimento",
    "name": "Pó do desaparecimento",
    "category": "alquimia",
    "price": "T$ 100",
    "spaces": 0.5,
    "description": "Uma criatura ou objeto coberto por este pó torna-se invisível (como em Invisibilidade) por 2d6 rodadas. O usuário não sabe quando a invisibilidade vai terminar. Catalisadores Substâncias preparadas através de processos alquímicos, catalisadores são itens de uso único que melhoram o efeito de uma magia quando ela é lançada. Você precisa estar empunhando um catalisador para usá-lo e só pode usar um catalisador por vez. Reduções de custo de catalisadores acumulam com outras reduções de custo. Catalisadores que aumentam o dano só funcionam em magias que já causem dano. A CD para fabricar qualquer catalisador é 15 e para fabricá-lo você deve ser treinado em Misticismo."
  },
  {
    "id": "baga_de_fogo",
    "name": "Baga-de-fogo",
    "category": "alquimia",
    "price": "T$ 30",
    "spaces": 0.5,
    "description": "Pequeno fruto vermelho, apreciado por seu sabor picante. Usado como catalisador, adiciona +1d6 de dano de fogo a magias."
  },
  {
    "id": "dente_de_dragao",
    "name": "Dente-de-dragão",
    "category": "alquimia",
    "price": "T$ 45",
    "spaces": 0.5,
    "description": "Uma flor comum em regiões montanhosas, especialmente nas Sanguinárias, possui formato parecido com uma presa de monstro. Suas propriedades místicas aumentam o dano de magias em um dado do mesmo tipo."
  },
  {
    "id": "essencia_abissal",
    "name": "Essência abissal",
    "category": "alquimia",
    "price": "T$ 150",
    "spaces": 0.5,
    "description": "Um líquido espesso, produzido através do sangue de criaturas demoníacas. Aumenta os dados de dano de magias de fogo em uma categoria — d4 para d6, d6 para d8, d8 para d10 e d10 para d12 (o máximo)."
  },
  {
    "id": "liquen_lilas",
    "name": "Líquen lilás",
    "category": "alquimia",
    "price": "T$ 30",
    "spaces": 0.5,
    "description": "Esta estranha planta tem aspecto cristalino e cresce em abundância na região das Uivantes. Adiciona +1d6 de dano de frio a magias."
  },
  {
    "id": "musgo_purpura",
    "name": "Musgo púrpura",
    "category": "alquimia",
    "price": "T$ 45",
    "spaces": 0.5,
    "description": "Encontrado em florestas fechadas, esse fungo cintilante possui propriedades que fornecem +2 na CD de magias de ilusão."
  },
  {
    "id": "ossos_de_monstro",
    "name": "Ossos de monstro",
    "category": "alquimia",
    "price": "T$ 45",
    "spaces": 0.5,
    "description": "Pequenas falanges de criaturas monstruosas, tratadas com óleos alquímicos. Fornece +2 na CD de magias de necromancia."
  },
  {
    "id": "po_de_cristal",
    "name": "Pó de cristal",
    "category": "alquimia",
    "price": "T$ 30",
    "spaces": 0.5,
    "description": "Uma pitada de pó de um mineral cristalino puro, como quartzo ou topázio. Diminui o custo de magias de encantamento em –1 PM."
  },
  {
    "id": "po_de_giz",
    "name": "Pó de giz",
    "category": "alquimia",
    "price": "T$ 30",
    "spaces": 0.5,
    "description": "Calcário esmagado em pó, uma substância comum que, usada como catalisador, diminui o custo de magias de convocação em –1 PM."
  },
  {
    "id": "ramo_verdejante",
    "name": "Ramo verdejante",
    "category": "alquimia",
    "price": "T$ 45",
    "spaces": 0.5,
    "description": "Esta combinação de ervas potencializa magias de cura, aumentando sua cura em +1 PV por dado."
  },
  {
    "id": "saco_de_sal",
    "name": "Saco de sal",
    "category": "alquimia",
    "price": "T$ 45",
    "spaces": 0.5,
    "description": "Um pequeno saco de couro com sal marinho. Fornece +2 na CD de magias de abjuração."
  },
  {
    "id": "seixo_de_ambar",
    "name": "Seixo de âmbar",
    "category": "alquimia",
    "price": "T$ 30",
    "spaces": 0.5,
    "description": "Essa “gema” feita de seiva de árvore fossilizada diminui o custo de magias de transmutação em –1 PM."
  },
  {
    "id": "terra_de_cemiterio",
    "name": "Terra de cemitério",
    "category": "alquimia",
    "price": "T$ 30",
    "spaces": 0.5,
    "description": "Um punhado de terra cinzenta, colhida à noite de um cemitério. Adiciona +1d6 de dano de trevas a magias. Venenos Substâncias naturais ou preparadas perigosas para seres vivos. Exceto se indicado o contrário, a CD para fabricar qualquer veneno é 20."
  },
  {
    "id": "beladona",
    "name": "Beladona",
    "category": "alquimia",
    "price": "T$ 1.500",
    "spaces": 0.5,
    "description": "Planta extremamente tóxica que afeta o sistema nervoso da vítima. Ingestão, vítima fica paralisada (lenta) por 3 rodadas. A CD para fabricar e para resistir a este veneno aumenta em +5."
  },
  {
    "id": "bruma_sonolenta",
    "name": "Bruma sonolenta",
    "category": "alquimia",
    "price": "T$ 150",
    "spaces": 0.5,
    "description": "Um gás sonífero. Inalação, vítima fica inconsciente (enjoada por 1 rodada)."
  },
  {
    "id": "cicuta",
    "name": "Cicuta",
    "category": "alquimia",
    "price": "T$ 60",
    "spaces": 0.5,
    "description": "Planta cuja ingestão pode causar náusea, dores e até morte. Ingestão, perde 1d12 PV por rodada durante 3 rodadas (perde 1d12 PV)."
  },
  {
    "id": "essencia_de_sombra",
    "name": "Essência de sombra",
    "category": "alquimia",
    "price": "T$ 100",
    "spaces": 0.5,
    "description": "Produzido a partir de compostos alquímicos que canalizam energia de trevas. Contato, vítima fica debilitada (fraca)."
  },
  {
    "id": "nevoa_toxica",
    "name": "Névoa tóxica",
    "category": "alquimia",
    "price": "T$ 30",
    "spaces": 0.5,
    "description": "Este gás verde queima e corrói a pele e os pulmões. Inalação, perde 1d12 PV por rodada durante 3 rodadas (perde 1d12 PV)."
  },
  {
    "id": "peconha_comum",
    "name": "Peçonha comum",
    "category": "alquimia",
    "price": "T$ 15",
    "spaces": 0.5,
    "description": "Veneno típico, extraído de animais ou plantas tóxicas. Contato, perde 1d12 PV."
  },
  {
    "id": "peconha_concentrada",
    "name": "Peçonha concentrada",
    "category": "alquimia",
    "price": "T$ 90",
    "spaces": 0.5,
    "description": "Dose concentrada da"
  },
  {
    "id": "peconha_potente",
    "name": "Peçonha potente",
    "category": "alquimia",
    "price": "T$ 600",
    "spaces": 0.5,
    "description": "Veneno poderoso, extraído de animais ou plantas perigosos. Contato, perde 2d12 PV por rodada durante 3 rodadas (perde 2d12 PV)."
  },
  {
    "id": "po_de_lich",
    "name": "Pó de lich",
    "category": "alquimia",
    "price": "T$ 3.000",
    "spaces": 0.5,
    "description": "Veneno letal, usado para assassinar alvos poderosos. Ingestão, perde 4d12 PV por rodada durante 5 rodadas (perde 4d12 PV). A CD para fabricar e para resistir a este veneno aumenta em +5."
  },
  {
    "id": "riso_de_nimb",
    "name": "Riso de Nimb",
    "category": "alquimia",
    "price": "T$ 150",
    "spaces": 0.5,
    "description": "Este gás púrpura faz a vítima rir descontroladamente e agir de forma caótica. Inalação, vítima fica confusa (lenta por 1 rodada)."
  },
  {
    "id": "batata_valkariana",
    "name": "Batata valkariana",
    "category": "alimentacao",
    "price": "T$ 2",
    "spaces": 0.5,
    "description": "Batatas cortadas em tiras e mergulhadas em óleo fervente. Gordurentas e pouco nutritivas, são o tipo de prato que só é servido numa metrópole como Valkaria. Apesar disso, são gostosas e deixam qualquer um empolgado. Você recebe +1d6 em um teste a sua escolha realizado até o fim do dia. Para não esquecer, deixe 1d6 em cima da sua ficha. De preferência, amarelo."
  },
  {
    "id": "gorad_quente",
    "name": "Gorad quente",
    "category": "alimentacao",
    "price": "T$ 18",
    "spaces": 0.5,
    "description": "Gorad e leite, servidos quentes. Não tem erro. O gorad ativa o cérebro, fornecendo +2 PM temporários."
  },
  {
    "id": "macarrao_de_yuvalin",
    "name": "Macarrão de Yuvalin",
    "category": "alimentacao",
    "price": "T$ 6",
    "spaces": 0.5,
    "description": "Yuvalin é uma cidade mineradora em Zakharov, na fronteira com as Montanhas Uivantes. Seus habitantes criaram este prato reforçado (macarrão, bacon e creme de leite!) para encarar suas árduas jornadas de trabalho nas minas. Delicioso, o prato se espalhou por outras cidades e reinos. Você recebe +5 PV temporários."
  },
  {
    "id": "prato_do_aventureiro",
    "name": "Prato do aventureiro",
    "category": "alimentacao",
    "price": "T$ 1",
    "spaces": 0.5,
    "description": "Um cozido de galinha com legumes, esta é uma refeição simples, mas nutritiva. Em sua próxima noite de sono, você aumenta a sua recuperação de pontos de vida em +1 por nível."
  },
  {
    "id": "racao_de_viagem_por_dia",
    "name": "Ração de viagem (por dia)",
    "category": "alimentacao",
    "price": "T$ 0,5",
    "spaces": 0.5,
    "description": "Própria para viagens, uma porção desta ração alimenta uma pessoa por um dia. É feita de alimentos conservados, como carne defumada, frutas secas, pão, queijo e biscoitos. Se mantida seca dura bastante, mas quando molhada se estraga em 24 horas."
  },
  {
    "id": "refeicao_comum",
    "name": "Refeição comum",
    "category": "alimentacao",
    "price": "T$ 0,3",
    "spaces": 0.5,
    "description": "Uma refeição típica inclui pão, queijo, cozido de carne ou galinha com legumes e uma caneca de bebida, geralmente cidra, vinho ou cerveja."
  },
  {
    "id": "sopa_de_peixe",
    "name": "Sopa de peixe",
    "category": "alimentacao",
    "price": "T$ 1",
    "spaces": 0.5,
    "description": "Um cozido de peixe com verduras. É um prato humilde, mas garante um descanso relaxante. Em sua próxima noite de sono, você aumenta a sua recuperação de pontos de mana em +1 por nível. funcionam como parceiros (veja a página 260)."
  },
  {
    "id": "alforje",
    "name": "Alforje",
    "category": "animal",
    "price": "T$ 30",
    "spaces": 0,
    "description": "Sacos de couro feitos para serem presos em uma"
  },
  {
    "id": "cao_de_caca",
    "name": "Cão de caça",
    "category": "animal",
    "price": "T$ 150",
    "spaces": 0,
    "description": "Este cachorro valente e leal pode ser usado como parceiro perseguidor por personagens treinados em Adestramento ou montaria por personagens Pequenos e Minúsculos."
  },
  {
    "id": "cavalo",
    "name": "Cavalo",
    "category": "animal",
    "price": "T$ 75",
    "spaces": 0,
    "description": "A montaria mais comum no Reinado. Pode ser usado como parceiro montaria (veja a página 262). Cavalos sem treinamento se assustam facilmente, sendo necessário um teste de Cavalgar (CD 20) por rodada para permanecer montado durante um combate. Cavalos de guerra dispensam esse teste. Estábulo. Inclui alimentação para o animal."
  },
  {
    "id": "cavalo_de_guerra",
    "name": "Cavalo de guerra",
    "category": "animal",
    "price": "T$ 400",
    "spaces": 0,
    "description": "Cavalos sem treinamento se assustam facilmente, sendo necessário um teste de Cavalgar (CD 20) por rodada para permanecer montado durante um combate. Cavalos de guerra dispensam esse teste."
  },
  {
    "id": "ponei",
    "name": "Pônei",
    "category": "animal",
    "price": "T$ 5",
    "spaces": 0,
    "description": "A montaria mais comum entre raças Pequenas. Pode ser usado como parceiro montaria."
  },
  {
    "id": "ponei_de_guerra",
    "name": "Pônei de guerra",
    "category": "animal",
    "price": "T$ 30",
    "spaces": 0,
    "description": "Pode ser usado como parceiro montaria. Cavalos sem treinamento se assustam facilmente, sendo necessário um teste de Cavalgar (CD 20) por rodada para permanecer montado durante um combate. Cavalos de guerra dispensam esse teste."
  },
  {
    "id": "trobo",
    "name": "Trobo",
    "category": "animal",
    "price": "T$ 60",
    "spaces": 0,
    "description": "Estas enormes aves, também chamadas de pássaros-touros, são parecidas com avestruzes com chifres, couro e cascos. Não têm asas. Possuem poucas penas, que servem apenas como ornamento. Muito dóceis, trobos são usados em áreas rurais como animais de carga e tração, mas também podem ser usados como montaria (veja a página 262)."
  },
  {
    "id": "balao_goblin",
    "name": "Balão goblin",
    "category": "veiculo",
    "price": "T$ 200",
    "spaces": 0,
    "description": "Feito de imensas bolsas de couro e outros tecidos remendados, com uma gôndola parecida com um grande cesto, o balão goblin é um engenho tecnológico sem igual em Arton. Um balão tem tamanho Enorme, deslocamento voo 12m, Defesa 5 (+ Des do baloeiro), 100 PV e pode carregar até 8 criaturas Médias ou 160 espaços. Ao contrário do que possa parecer, quedas de balões raramente são fatais. Quando o balão perde mais da metade de seus PV, começa a perder ar e flutua lentamente na direção do solo. Cada ocupante sofre 4d6 pontos de dano de impacto (Ref CD 15 reduz à metade). Um balão só cai de forma perigosa caso perca todos os seus PV. Neste caso, os ocupantes sofrem dano normal pela queda, de acordo com a altura. Remendar um balão em pleno voo exige uma ação completa e um teste de Ofício (artesão) contra CD 15. Se você passar no teste, recupera 1d8 PV do balão."
  },
  {
    "id": "carroca",
    "name": "Carroça",
    "category": "veiculo",
    "price": "T$ 150",
    "spaces": 0,
    "description": "Veículo de duas ou quatro rodas, aberto, normalmente usado para transportar cargas pesadas. É puxada por dois cavalos ou um"
  },
  {
    "id": "carruagem",
    "name": "Carruagem",
    "category": "veiculo",
    "price": "T$ 500",
    "spaces": 0,
    "description": "Veículo de quatro rodas, capaz de transportar até quatro pessoas em uma cabine fechada, mais dois condutores do lado de fora. É puxada por dois cavalos ou um"
  },
  {
    "id": "canoa",
    "name": "Canoa",
    "category": "veiculo",
    "price": "T$ 70",
    "spaces": 0,
    "description": "Construída a partir de um único tronco de árvore, é a mais simples das embarcações. Tem as mesmas estatísticas de uma carroça, mas com deslocamento de natação."
  },
  {
    "id": "veleiro",
    "name": "Veleiro",
    "category": "veiculo",
    "price": "T$ 10.000",
    "spaces": 0,
    "description": "Com três mastros, é o típico navio de viagem, muito popular entre mercadores."
  },
  {
    "id": "kit_oficio_alquimia",
    "name": "Instrumentos de ofício (alquimista)",
    "category": "ferramenta",
    "price": "T$ 30",
    "spaces": 1,
    "description": "Existe uma versão deste item para cada perícia de Ofício. Por exemplo, martelo, pregos e serrote para Ofício (carpinteiro), pergaminhos em branco, tinta e pena para Ofício (escriba) e assim por diante. Um personagem sem os instrumentos de seu Ofício sofre –5 nessa perícia."
  },
  {
    "id": "kit_oficio_armeiro",
    "name": "Instrumentos de ofício (armeiro)",
    "category": "ferramenta",
    "price": "T$ 30",
    "spaces": 1,
    "description": "Existe uma versão deste item para cada perícia de Ofício. Por exemplo, martelo, pregos e serrote para Ofício (carpinteiro), pergaminhos em branco, tinta e pena para Ofício (escriba) e assim por diante. Um personagem sem os instrumentos de seu Ofício sofre –5 nessa perícia."
  }
];
