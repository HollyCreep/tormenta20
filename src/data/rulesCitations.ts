export interface RuleCitation {
  id: string;
  title: string;
  book: string;
  chapter: string;
  section: string;
  page: string | number;
  quote: string;
  explanation: string;
}

export const RULES_CITATIONS: Record<string, RuleCitation> = {
  ORIGIN_SKILL_REPLACEMENT: {
    id: 'ORIGIN_SKILL_REPLACEMENT',
    title: 'Substituição de Perícias da Origem',
    book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
    chapter: 'Capítulo 1: Construção de Personagem',
    section: 'Origens — Benefícios & Sua Própria Origem',
    page: 'Página 95 (PDF pág. 101)',
    quote:
      '“Uma origem é algo que você pode mudar, negociando com o mestre, para ajustar melhor à história que você imaginou. Por exemplo, Kurt Snyder estudou como médico de Salistick — mais especificamente, como alienista. A origem Curandeiro oferece as perícias Cura e Vontade. Nesse caso, o jogador de Kurt poderia trocar uma dessas por Intuição.”',
    explanation:
      'Em Tormenta 20, uma perícia só pode ser treinada uma vez (+2 não é cumulativo). Quando a sua origem concede uma perícia que você já aprendeu por sua raça ou classe, o sistema bloqueia o treino duplicado e permite que você escolha livremente qualquer outra perícia não treinada para substituir.',
  },
  SKILL_TRAINING_NO_STACK: {
    id: 'SKILL_TRAINING_NO_STACK',
    title: 'Treinamento de Perícias & Não Cumulatividade',
    book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
    chapter: 'Capítulo 2: Perícias & Capítulo 5: Jogando',
    section: 'Valor de Perícia & Acumulando Efeitos',
    page: 'Páginas 114 e 226',
    quote:
      '“Nas perícias treinadas, você recebe um bônus de +2. No 7º nível, esse bônus aumenta para +4. No 15º nível, aumenta para +6. Efeitos de mesma função não se acumulam: uma perícia é treinada ou não treinada.”',
    explanation:
      'Não é permitido selecionar o treinamento de uma mesma perícia mais de uma vez. O aplicativo identifica qual fonte concedeu o treino (Classe, Raça ou Inteligência) e impede seleções duplicadas.',
  },
  GENERAL_POWER_PREREQUISITES: {
    id: 'GENERAL_POWER_PREREQUISITES',
    title: 'Pré-requisitos de Poderes Gerais',
    book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
    chapter: 'Capítulo 2: Perícias & Poderes',
    section: 'Poderes Gerais',
    page: 'Página 124',
    quote:
      '“Para poder escolher um poder geral, você precisa cumprir todos os seus pré-requisitos no momento em que o escolhe. Se perder um pré-requisito mais tarde, você não pode mais usar aquele poder até recuperá-lo.”',
    explanation:
      'O aplicativo calcula em tempo real seus atributos, perícias treinadas, proficiências com escudo/armadura pesada e habilidades de conjurador para garantir que você só adquira poderes cujos pré-requisitos foram estritamente atendidos.',
  },
  INTELLIGENCE_SKILLS: {
    id: 'INTELLIGENCE_SKILLS',
    title: 'Perícias Adicionais por Inteligência',
    book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
    chapter: 'Capítulo 2: Perícias',
    section: 'Escolhendo Perícias',
    page: 'Página 114',
    quote:
      '“Ao escolher sua classe, você recebe um número de perícias treinadas (ou seja, nas quais é mais competente). Você também recebe um número de perícias treinadas igual a sua Inteligência. Perícias ganhas por Inteligência não precisam pertencer à lista de sua classe.”',
    explanation:
      'Se o seu personagem possuir modificador positivo de Inteligência, ele ganha esse mesmo número de perícias adicionais, podendo escolher qualquer perícia da lista geral no Passo 6.',
  },
  HUMAN_VERSATILE: {
    id: 'HUMAN_VERSATILE',
    title: 'Habilidade Racial: Versátil (Humano)',
    book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
    chapter: 'Capítulo 1: Construção de Personagem',
    section: 'Raças — Humano',
    page: 'Página 19',
    quote:
      '“Versátil. Você se torna treinado em duas perícias a sua escolha (não precisam ser da sua classe). Você pode trocar uma dessas perícias por um poder geral a sua escolha.”',
    explanation:
      'Permite aos humanos escolherem entre 2 perícias treinadas de livre escolha (Opção A) ou 1 perícia treinada + 1 Poder Geral cujos pré-requisitos sejam cumpridos (Opção B).',
  },
  POINT_BUY_RULES: {
    id: 'POINT_BUY_RULES',
    title: 'Geração de Atributos por Compra de Pontos',
    book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
    chapter: 'Capítulo 1: Construção de Personagem',
    section: 'Atributos Básicos — Definindo seus Atributos',
    page: 'Página 17 (Tabela 1-1: Atributos)',
    quote:
      '“Pontos. Você começa com todos os atributos em 0 e recebe 10 pontos para aumentá-los. O custo para aumentar cada atributo está descrito na tabela abaixo. Você também pode reduzir um atributo para -1 para receber 1 ponto adicional.”\n\nCustos: 0 (0 pt) • 1 (1 pt) • 2 (2 pts) • 3 (4 pts) • 4 (7 pts). Reduzir um atributo para -1 concede +1 pt.',
    explanation:
      'Você tem 10 pontos totais para distribuir entre os 6 atributos. Cada valor possui custo progressivo. Reduzir no máximo um atributo para -1 libera 1 ponto extra para investir nos demais.',
  },
  ATTR_FOR: {
    id: 'ATTR_FOR',
    title: 'Força (FOR) — Regras e Aplicações',
    book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
    chapter: 'Capítulo 1: Construção de Personagem',
    section: 'Atributos Básicos — Força',
    page: 'Página 17',
    quote:
      '“Seu poder muscular. A Força é aplicada em testes de Atletismo e Luta; rolagens de dano corpo a corpo ou com armas de arremesso, e testes de Força para levantar peso e atos similares.”',
    explanation:
      'A Força é essencial para personagens combatentes corpo a corpo. Cada ponto de Força concede:\n• Bônus em testes de Luta e Atletismo.\n• Bônus direto no dano de ataques corpo a corpo e armas de arremesso.\n• +2 espaços adicionais de capacidade de carga de itens (Carga total = 10 + 2×FOR).\n• Bônus em manobras de combate (agarrar, derrubar, empurrar, desarmar).',
  },
  ATTR_DES: {
    id: 'ATTR_DES',
    title: 'Destreza (DES) — Regras e Aplicações',
    book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
    chapter: 'Capítulo 1: Construção de Personagem',
    section: 'Atributos Básicos — Destreza',
    page: 'Página 17',
    quote:
      '“Sua agilidade, reflexos, equilíbrio e coordenação motora. A Destreza é aplicada na Defesa e em testes de Acrobacia, Cavalgar, Furtividade, Iniciativa, Ladinagem, Pilotagem, Pontaria e Reflexos.”',
    explanation:
      'A Destreza determina sua capacidade de esquiva e velocidade de reação:\n• Soma diretamente no valor da sua Defesa básica (10 + DES, limitada pelo tipo de armadura).\n• Bônus em 8 perícias cruciais: Acrobacia, Cavalgar, Furtividade, Iniciativa, Ladinagem, Pilotagem, Pontaria e Reflexos.\n• Utilizada em testes de ataque com armas de disparo e arremesso.',
  },
  ATTR_CON: {
    id: 'ATTR_CON',
    title: 'Constituição (CON) — Regras e Aplicações',
    book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
    chapter: 'Capítulo 1: Construção de Personagem',
    section: 'Atributos Básicos — Constituição',
    page: 'Página 17',
    quote:
      '“Sua saúde e vigor. A Constituição é aplicada aos pontos de vida iniciais e por nível e em testes de Fortitude. Se a Constituição muda, seus pontos de vida aumentam ou diminuem retroativamente de acordo.”',
    explanation:
      'A Constituição garante a sobrevivência do aventureiro:\n• É somada diretamente aos seus Pontos de Vida (PV) no 1º nível e a cada novo nível alcançado.\n• É a chave para testes de resistência de Fortitude contra venenos, doenças, sangramentos e efeitos de morte.\n• Define quantas rodadas o personagem consegue correr sem fatiga (1 + CON rodadas).',
  },
  ATTR_INT: {
    id: 'ATTR_INT',
    title: 'Inteligência (INT) — Regras e Aplicações',
    book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
    chapter: 'Capítulo 1: Construção de Personagem',
    section: 'Atributos Básicos — Inteligência',
    page: 'Página 17',
    quote:
      '“Sua capacidade de raciocínio, memória e educação. A Inteligência é aplicada em testes de Conhecimento, Guerra, Investigação, Misticismo, Nobreza e Ofício. Além disso, se sua Inteligência for positiva, você recebe um número de perícias treinadas igual ao valor dela (não precisam ser da sua classe).”',
    explanation:
      'A Inteligência expande suas competências técnicas e intelectuais:\n• Concede perícias treinadas adicionais de livre escolha no 1º nível igual ao valor da INT (se positiva).\n• É aplicada em Conhecimento, Guerra, Investigação, Misticismo, Nobreza e testes de Ofício (artesanato e alquimia).\n• Atributo-chave de conjuração para Arcanistas (Mago) e de engenhocas para Inventores.',
  },
  ATTR_SAB: {
    id: 'ATTR_SAB',
    title: 'Sabedoria (SAB) — Regras e Aplicações',
    book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
    chapter: 'Capítulo 1: Construção de Personagem',
    section: 'Atributos Básicos — Sabedoria',
    page: 'Página 17',
    quote:
      '“Sua observação, ponderação e determinação. A Sabedoria é aplicada em testes de Cura, Intuição, Percepção, Religião, Sobrevivência e Vontade.”',
    explanation:
      'A Sabedoria governa sua sensibilidade e resistência espiritual:\n• Bônus em testes de Percepção (evitar surpresas), Intuição (detectar mentiras), Cura, Sobrevivência e Religião.\n• Determina sua resistência de Vontade contra magias mentais, ilusões, medo e encantamentos.\n• Atributo-chave de conjuração divina para Clérigos e Druidas.',
  },
  ATTR_CAR: {
    id: 'ATTR_CAR',
    title: 'Carisma (CAR) — Regras e Aplicações',
    book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
    chapter: 'Capítulo 1: Construção de Personagem',
    section: 'Atributos Básicos — Carisma',
    page: 'Página 17',
    quote:
      '“Sua força de personalidade e capacidade de persuasão, além de uma mistura de simpatia e beleza. O Carisma é aplicado em testes de Adestramento, Atuação, Diplomacia, Enganação, Intimidação e Jogatina.”',
    explanation:
      'O Carisma mede seu magnetismo pessoal e liderança:\n• Bônus em testes sociais vitais: Diplomacia, Enganação, Intimidação, Atuação, Adestramento e Jogatina.\n• Atributo-chave para habilidades heroicas de Bardo (Música de Bardo), Paladino (Aura Sagrada, Golpe Divino), Nobre (Autoconfiança, Orgulho) e Arcanista (Feiticeiro).',
  },
  EQUIPMENT_RULES: {
    id: 'EQUIPMENT_RULES',
    title: 'Equipamento, Carga e Armaduras',
    book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
    chapter: 'Capítulo 3: Equipamento',
    section: 'Capacidade de Carga & Tipos de Itens',
    page: 'Página 142-177',
    quote:
      '“Você pode carregar até 10 + 2×For espaços em itens sem penalidade. Itens empunhados contam em suas mãos disponíveis. Armaduras pesadas e escudos aplicam sua Penalidade de Armadura em testes de perícias baseadas em Destreza e Força (Acrobacia, Furtividade, Ladinagem).”',
    explanation:
      'Cada item ocupa um número determinado de espaços (slots) no inventário. O dinheiro padrão de Arton é o Tibar (T$). Armaduras fornecem bônus de Defesa, mas limitam seu bônus de Destreza e podem aplicar penalidades de armadura.',
  },
  WEAPON_ATTACK_DAMAGE: {
    id: 'WEAPON_ATTACK_DAMAGE',
    title: 'Teste de Ataque e Dano com Armas',
    book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
    chapter: 'Capítulo 5: Jogando & Capítulo 3: Equipamento',
    section: 'Estatísticas de Combate — Teste de Ataque e Dano; Melhorias',
    page: 'Página 230 (PDF pág. 236) e Páginas 164–165 (PDF págs. 170–171)',
    quote:
      '“Para ataques corpo a corpo ou com armas de arremesso, você soma sua Força na rolagem de dano. Dano com Arma Corpo a Corpo ou de Arremesso = Dano da Arma + Força do Atacante. Dano com Arma de Disparo = Dano da Arma.” — “Certeira. Fabricada para ser mais precisa e balanceada, a arma fornece +1 nos testes de ataque.”',
    explanation:
      'O teste de ataque é um teste de Luta (corpo a corpo) ou Pontaria (à distância) — por isso as penalidades de condições que já afetam essas perícias não são aplicadas de novo. Melhorias como Certeira (+1) e Pungente (+2) somam ao ataque; Cruel (+1) e Atroz (+2) somam ao dano. A Força entra no dano de armas corpo a corpo e de arremesso, mas não no de armas de disparo.',
  },
};
