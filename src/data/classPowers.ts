import { ClassPower } from '../types/rules';

/**
 * Poderes de classe — T20 JdA v1.3, Capítulo 1, págs. 36–84 ("Poder de <Classe>").
 * Gerado por .agents/tools/gen_class_powers.py a partir do texto do livro (não editar à mão).
 */
export const CLASS_POWERS_LIST: ClassPower[] = [
  {
    "id": "arcanista_arcano_de_batalha",
    "name": "Arcano de Batalha",
    "classId": "arcanista",
    "className": "Arcanista",
    "description": "Quando lança uma magia, você soma seu atributo-chave na rolagem de dano."
  },
  {
    "id": "arcanista_aumento_de_atributo",
    "name": "Aumento de Atributo",
    "classId": "arcanista",
    "className": "Arcanista",
    "description": "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
  },
  {
    "id": "arcanista_caldeirao_do_bruxo",
    "name": "Caldeirão do Bruxo",
    "classId": "arcanista",
    "className": "Arcanista",
    "description": "Você pode criar poções, como se tivesse o poder geral Preparar Poção. Se tiver ambos, pode criar poções de até 5º círculo.",
    "prerequisites": "Bruxo, treinado em Ofício (alquimista)"
  },
  {
    "id": "arcanista_conhecimento_magico",
    "name": "Conhecimento Mágico",
    "classId": "arcanista",
    "className": "Arcanista",
    "description": "Você aprende duas magias de qualquer círculo que possa lançar. Você pode escolher este poder quantas vezes quiser."
  },
  {
    "id": "arcanista_contramagica_aprimorada",
    "name": "Contramágica Aprimorada",
    "classId": "arcanista",
    "className": "Arcanista",
    "description": "Uma vez por rodada, você pode fazer uma contramágica como uma reação (veja a página 173).",
    "prerequisites": "Dissipar Magia"
  },
  {
    "id": "arcanista_envolto_em_misterio",
    "name": "Envolto em Mistério",
    "classId": "arcanista",
    "className": "Arcanista",
    "description": "Sua aparência e postura assombrosas o permitem manipular e assustar pessoas ignorantes ou supersticiosas. O mestre define o que exatamente você pode fazer e quem se encaixa nessa descrição. Como regra geral, você recebe +5 em Enganação e Intimidação contra pessoas não treinadas em Conhecimento ou Misticismo."
  },
  {
    "id": "arcanista_escriba_arcano",
    "name": "Escriba Arcano",
    "classId": "arcanista",
    "className": "Arcanista",
    "description": "Você pode aprender magias copiando os textos de pergaminhos e grimórios de outros magos. Aprender uma magia dessa forma exige um dia de trabalho e T$ 250 em matérias-primas por PM necessário para lançar a magia. Assim, aprender uma magia de 3º círculo (6 PM) exige 6 dias de trabalho e o gasto de T$ 1.500.",
    "prerequisites": "Mago, treinado em Ofício (escriba)"
  },
  {
    "id": "arcanista_especialista_em_escola",
    "name": "Especialista em Escola",
    "classId": "arcanista",
    "className": "Arcanista",
    "description": "Escolha uma escola de magia. A CD para resistir a suas magias dessa escola aumenta em +2.",
    "prerequisites": "Bruxo ou Mago"
  },
  {
    "id": "arcanista_familiar",
    "name": "Familiar",
    "classId": "arcanista",
    "className": "Arcanista",
    "description": "Você possui um animal de estimação mágico. Veja o quadro para detalhes."
  },
  {
    "id": "arcanista_fluxo_de_mana",
    "name": "Fluxo de Mana",
    "classId": "arcanista",
    "className": "Arcanista",
    "description": "Você pode manter dois efeitos sustentados ativos simultaneamente com apenas uma ação livre, pagando o custo de cada efeito separadamente.",
    "prerequisites": "10º nível de arcanista"
  },
  {
    "id": "arcanista_foco_vital",
    "name": "Foco Vital",
    "classId": "arcanista",
    "className": "Arcanista",
    "description": "Se você estiver segurando seu foco e sofrer dano que o levaria a 0 PV ou menos, você fica com 1 PV e o foco perde PV igual ao valor excedente ou até ser destruído (se o foco for destruído, você sofre o dano excedente).",
    "prerequisites": "Bruxo"
  },
  {
    "id": "arcanista_fortalecimento_arcano",
    "name": "Fortalecimento Arcano",
    "classId": "arcanista",
    "className": "Arcanista",
    "description": "A CD para resistir a suas magias aumenta em +1. Se você puder lançar magias de 4º círculo, em vez disso ela aumenta em +2.",
    "prerequisites": "5º nível de arcanista"
  },
  {
    "id": "arcanista_heranca_aprimorada",
    "name": "Herança Aprimorada",
    "classId": "arcanista",
    "className": "Arcanista",
    "description": "Você recebe a herança aprimorada de sua linhagem sobrenatural.",
    "prerequisites": "Feiticeiro, 6º nível de arcanista"
  },
  {
    "id": "arcanista_heranca_superior",
    "name": "Herança Superior",
    "classId": "arcanista",
    "className": "Arcanista",
    "description": "Você recebe a herança superior de sua linhagem sobrenatural.",
    "prerequisites": "Herança Aprimorada, 11º nível de arcanista"
  },
  {
    "id": "arcanista_magia_pungente",
    "name": "Magia Pungente",
    "classId": "arcanista",
    "className": "Arcanista",
    "description": "Quando lança uma magia, você pode pagar 1 PM para aumentar em +2 a CD para resistir a ela."
  },
  {
    "id": "arcanista_mestre_em_escola",
    "name": "Mestre em Escola",
    "classId": "arcanista",
    "className": "Arcanista",
    "description": "Escolha uma escola de magia. O custo para lançar magias dessa escola diminui em –1 PM.",
    "prerequisites": "Especialista em Escola com a escola escolhida, 8º nível de arcanista"
  },
  {
    "id": "arcanista_poder_magico",
    "name": "Poder Mágico",
    "classId": "arcanista",
    "className": "Arcanista",
    "description": "Você recebe +1 ponto de mana por nível de arcanista. Quando sobe de nível, os PM que recebe por este poder aumentam de acordo. Por exemplo, se escolher este poder no 4º nível, recebe 4 PM. Quando subir para o 5º nível, recebe +1 PM e assim por diante."
  },
  {
    "id": "arcanista_raio_arcano",
    "name": "Raio Arcano",
    "classId": "arcanista",
    "className": "Arcanista",
    "description": "Você pode gastar uma ação padrão para causar 1d8 pontos de dano de essência num alvo em alcance curto. Esse dano aumenta em +1d8 para cada círculo de magia acima do 1º que você puder lançar. O alvo pode fazer um teste de Reflexos (CD atributo-chave) para reduzir o dano à metade. O raio arcano conta como uma magia para efeitos de habilidades e itens que beneficiem suas magias."
  },
  {
    "id": "arcanista_raio_elemental",
    "name": "Raio Elemental",
    "classId": "arcanista",
    "className": "Arcanista",
    "description": "Quando usa Raio Arcano, você pode pagar 1 PM para que ele cause dano de ácido, eletricidade, fogo, frio ou trevas, a sua escolha. Se o alvo falhar no teste de Reflexos, sofre uma condição, de acordo com o tipo de dano (veja a descrição das condições na página 394). Ácido: vulnerável por 1 rodada. Eletricidade: ofuscado por 1 rodada. Fogo: fica em chamas. Frio: lento por 1 rodada. Trevas: não pode curar PV por 1 rodada.",
    "prerequisites": "Raio Arcano"
  },
  {
    "id": "arcanista_raio_poderoso",
    "name": "Raio Poderoso",
    "classId": "arcanista",
    "className": "Arcanista",
    "description": "Os dados de dano do seu Raio Arcano aumentam para d12 e o alcance dele aumenta para médio.",
    "prerequisites": "Raio Arcano"
  },
  {
    "id": "arcanista_tinta_do_mago",
    "name": "Tinta do Mago",
    "classId": "arcanista",
    "className": "Arcanista",
    "description": "Você pode criar pergaminhos, como se tivesse o poder Escrever Pergaminho. Se tiver ambos, seu custo para criar pergaminhos é reduzido à metade.",
    "prerequisites": "Mago, treinado em Ofício (escriba)"
  },
  {
    "id": "barbaro_alma_de_bronze",
    "name": "Alma de Bronze",
    "classId": "barbaro",
    "className": "Bárbaro",
    "description": "Quando entra em fúria, você recebe uma quantidade de pontos de vida temporários igual a seu nível + sua Força."
  },
  {
    "id": "barbaro_aumento_de_atributo",
    "name": "Aumento de Atributo",
    "classId": "barbaro",
    "className": "Bárbaro",
    "description": "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
  },
  {
    "id": "barbaro_brado_assustador",
    "name": "Brado Assustador",
    "classId": "barbaro",
    "className": "Bárbaro",
    "description": "Você pode gastar uma ação de movimento e 1 PM para soltar um berro feroz. Todos os inimigos em alcance curto ficam vulneráveis até o fim da cena.",
    "prerequisites": "treinado em Intimidação"
  },
  {
    "id": "barbaro_critico_brutal",
    "name": "Crítico Brutal",
    "classId": "barbaro",
    "className": "Bárbaro",
    "description": "Seu multiplicador de crítico com armas corpo a corpo e de arremesso aumenta em +1. Por exemplo, seu multiplicador com um machado de batalha (normalmente x3) será x4.",
    "prerequisites": "6º nível de bárbaro"
  },
  {
    "id": "barbaro_destruidor",
    "name": "Destruidor",
    "classId": "barbaro",
    "className": "Bárbaro",
    "description": "Quando causa dano com uma arma corpo a corpo de duas mãos, você pode rolar novamente qualquer resultado 1 ou 2 das rolagens de dano da arma.",
    "prerequisites": "For 1"
  },
  {
    "id": "barbaro_espirito_inquebravel",
    "name": "Espírito Inquebrável",
    "classId": "barbaro",
    "className": "Bárbaro",
    "description": "Enquanto está em fúria, você não fica inconsciente por estar com 0 PV ou menos (você ainda morre se chegar em um valor negativo igual à metade de seus pontos de vida máximos).",
    "prerequisites": "Alma de Bronze"
  },
  {
    "id": "barbaro_esquiva_sobrenatural",
    "name": "Esquiva Sobrenatural",
    "classId": "barbaro",
    "className": "Bárbaro",
    "description": "Seus instintos são tão apurados que você consegue reagir ao perigo antes que seus sentidos o percebam. Você nunca fica surpreendido."
  },
  {
    "id": "barbaro_forca_indomavel",
    "name": "Força Indomável",
    "classId": "barbaro",
    "className": "Bárbaro",
    "description": "Quando faz um teste de Força ou Atletismo, você pode gastar 1 PM para somar seu nível nele. Você pode usar esta habilidade depois de rolar o dado, mas deve usá-la antes de o mestre dizer se você passou ou não."
  },
  {
    "id": "barbaro_frenesi",
    "name": "Frenesi",
    "classId": "barbaro",
    "className": "Bárbaro",
    "description": "Uma vez por rodada, se estiver em fúria e usar a ação agredir para fazer um ataque corpo a corpo ou com uma arma de arremesso, você pode gastar 2 PM para fazer um ataque adicional."
  },
  {
    "id": "barbaro_furia_da_savana",
    "name": "Fúria da Savana",
    "classId": "barbaro",
    "className": "Bárbaro",
    "description": "Seu deslocamento aumenta em +3m. Quando usa Fúria, você aplica o bônus em ataque e dano também a armas de arremesso."
  },
  {
    "id": "barbaro_furia_raivosa",
    "name": "Fúria Raivosa",
    "classId": "barbaro",
    "className": "Bárbaro",
    "description": "Se sua Fúria for terminar por você não ter atacado nem sido alvo de um efeito hostil, você pode pagar 1 PM para continuar em fúria nesta rodada. Se você atacar ou for atacado na rodada seguinte, sua fúria continua normalmente."
  },
  {
    "id": "barbaro_golpe_poderoso",
    "name": "Golpe Poderoso",
    "classId": "barbaro",
    "className": "Bárbaro",
    "description": "Ao acertar um ataque corpo a corpo ou com uma arma de arremesso, você pode gastar 1 PM para causar um dado extra de dano do mesmo tipo (por exemplo, com um montante, causa +1d6, para um dano total de 3d6; com um machado de guerra, causa +1d12, para um dano total de 2d12)."
  },
  {
    "id": "barbaro_impeto",
    "name": "Ímpeto",
    "classId": "barbaro",
    "className": "Bárbaro",
    "description": "Você pode gastar 1 PM para aumentar seu deslocamento em +6m por uma rodada."
  },
  {
    "id": "barbaro_investida_imprudente",
    "name": "Investida Imprudente",
    "classId": "barbaro",
    "className": "Bárbaro",
    "description": "Quando faz uma investida, você pode aumentar sua penalidade na Defesa pela investida para –5 para receber um bônus de +1d12 na rolagem de dano deste ataque."
  },
  {
    "id": "barbaro_pele_de_aco",
    "name": "Pele de Aço",
    "classId": "barbaro",
    "className": "Bárbaro",
    "description": "O bônus de Pele de Ferro aumenta para +8.",
    "prerequisites": "Pele de Ferro, 8º nível de bárbaro"
  },
  {
    "id": "barbaro_pele_de_ferro",
    "name": "Pele de Ferro",
    "classId": "barbaro",
    "className": "Bárbaro",
    "description": "Você recebe +4 na Defesa, mas apenas se não estiver usando armadura pesada."
  },
  {
    "id": "barbaro_sangue_dos_inimigos",
    "name": "Sangue dos Inimigos",
    "classId": "barbaro",
    "className": "Bárbaro",
    "description": "Enquanto está em fúria, quando faz um acerto crítico ou reduz um inimigo a 0 PV, você recebe um bônus cumulativo de +1 em testes de ataque e rolagens de dano, limitado pelo seu nível, até o fim da cena."
  },
  {
    "id": "barbaro_supersticao",
    "name": "Superstição",
    "classId": "barbaro",
    "className": "Bárbaro",
    "description": "Você odeia magia, o que faz com que seja mais resistente a ela. Você recebe resistência a magia +5."
  },
  {
    "id": "barbaro_totem_espiritual",
    "name": "Totem Espiritual",
    "classId": "barbaro",
    "className": "Bárbaro",
    "description": "Você soma sua Sabedoria no seu total de pontos de mana. Escolha um animal totêmico (veja o quadro ao lado). Você aprende e pode lançar uma magia definida pelo animal escolhido (atributo-chave Sabedoria) e pode lançá-la mesmo em fúria.",
    "prerequisites": "Sab 1, 4º nível de bárbaro"
  },
  {
    "id": "barbaro_vigor_primal",
    "name": "Vigor Primal",
    "classId": "barbaro",
    "className": "Bárbaro",
    "description": "Você pode gastar uma ação de movimento e uma quantidade de PM limitada por sua Constituição. Para cada PM que gastar, você recupera 1d12 pontos de vida."
  },
  {
    "id": "bardo_arte_magica",
    "name": "Arte Mágica",
    "classId": "bardo",
    "className": "Bardo",
    "description": "Enquanto você estiver sob efeito de sua Inspiração, a CD para resistir a suas habilidades de bardo aumenta em +2."
  },
  {
    "id": "bardo_aumentar_repertorio",
    "name": "Aumentar Repertório",
    "classId": "bardo",
    "className": "Bardo",
    "description": "Você aprende duas magias de qualquer círculo que possa lançar. Elas devem pertencer às escolas que você sabe usar, mas podem ser arcanas ou divinas. Você pode escolher este poder quantas vezes quiser."
  },
  {
    "id": "bardo_aumento_de_atributo",
    "name": "Aumento de Atributo",
    "classId": "bardo",
    "className": "Bardo",
    "description": "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
  },
  {
    "id": "bardo_danca_das_laminas",
    "name": "Dança das Lâminas",
    "classId": "bardo",
    "className": "Bardo",
    "description": "Quando você lança uma magia com execução de uma ação padrão, pode gastar 1 PM para fazer um ataque corpo a corpo como uma ação livre.",
    "prerequisites": "Esgrima Mágica, 10º nível de bardo"
  },
  {
    "id": "bardo_esgrima_magica",
    "name": "Esgrima Mágica",
    "classId": "bardo",
    "className": "Bardo",
    "description": "Sua arte mescla esgrima e magia, transformando dança em golpes. Se estiver sob efeito de Inspiração, você pode substituir testes de Luta por testes de Atuação, mas apenas para ataques com armas corpo a corpo leves ou de uma mão."
  },
  {
    "id": "bardo_estrelato",
    "name": "Estrelato",
    "classId": "bardo",
    "className": "Bardo",
    "description": "Suas apresentações o tornaram famoso, fazendo com que você seja reconhecido e bem tratado por aqueles que apreciam a arte. Por outro lado, pode ser difícil passar despercebido, especialmente em grandes cidades. Quando usa Atuação para impressionar uma plateia, o bônus recebido em perícias baseadas em Carisma aumenta para +5.",
    "prerequisites": "6º nível de bardo"
  },
  {
    "id": "bardo_fascinar_em_massa",
    "name": "Fascinar em Massa",
    "classId": "bardo",
    "className": "Bardo",
    "description": "Quando usa Música: Balada Fascinante, você pode gastar +2 PM. Se fizer isso, afeta todas as criaturas a sua escolha no alcance da música (você faz um único teste de Atuação, oposto pelo teste de Vontade de cada criatura).",
    "prerequisites": "Música: Balada Fascinante"
  },
  {
    "id": "bardo_melodia_restauradora",
    "name": "Melodia Restauradora",
    "classId": "bardo",
    "className": "Bardo",
    "description": "Quando você usa Música: Melodia Curativa, pode gastar +2 PM. Se fizer isso, escolha uma das condições a seguir: abalado, alquebrado, apavorado, atordoado, cego, confuso, enfeitiçado, esmorecido, exausto, fatigado, frustrado, pasmo ou surdo. Você remove a condição escolhida das criaturas afetadas pela música.",
    "prerequisites": "Música: Melodia Curativa"
  },
  {
    "id": "bardo_mestre_dos_sussurros",
    "name": "Mestre dos Sussurros",
    "classId": "bardo",
    "className": "Bardo",
    "description": "Você é dissimulado, atento para rumores e ótimo em espalhar fofocas. Quando faz um teste de Investigação para interrogar ou um teste de Enganação para intriga, você rola dois dados e usa o melhor resultado. Além disso, pode fazer esses testes em ambientes sociais (taverna, festival, corte...) sem custo e em apenas um minuto.",
    "prerequisites": "Car 1, treinado em Enganação e Investigação"
  },
  {
    "id": "bardo_parodia",
    "name": "Paródia",
    "classId": "bardo",
    "className": "Bardo",
    "description": "Uma vez por rodada, quando vê outra criatura lançando uma magia em alcance médio, você pode pagar 1 PM e fazer um teste de Atuação (CD 15 + custo em PM da magia). Se passar, até o final de seu próximo turno você pode lançar essa magia."
  },
  {
    "id": "bardo_prestidigitacao",
    "name": "Prestidigitação",
    "classId": "bardo",
    "className": "Bardo",
    "description": "Quando faz uma ação padrão, você pode aproveitar seus gestos para lançar uma magia com execução de ação completa ou menor. Faça um teste de Atuação (CD 15 + custo em PM da magia). Se passar, você lança a magia como uma ação livre. Se falhar, a magia não funciona, mas você gasta os PM mesmo assim. Outros personagens só percebem que você lançou uma magia com um teste de Misticismo (CD 20).",
    "prerequisites": "6º nível de bardo"
  },
  {
    "id": "bardo_golpe_elemental",
    "name": "Golpe Elemental",
    "classId": "bardo",
    "className": "Bardo",
    "description": "Enquanto estiver sob efeito de Inspiração, sempre que você acertar um ataque corpo a corpo, pode gastar 1 PM para causar 1d6 de dano extra de ácido, eletricidade, fogo ou frio, a sua escolha. Para cada quatro níveis que possuir, pode gastar +1 PM para aumentar o dano em +1d6.",
    "prerequisites": "Golpe Mágico"
  },
  {
    "id": "bardo_golpe_magico",
    "name": "Golpe Mágico",
    "classId": "bardo",
    "className": "Bardo",
    "description": "Enquanto estiver sob efeito de Inspiração, sempre que você acertar um ataque corpo a corpo em um inimigo, recebe 2 PM temporários cumulativos. Você pode ganhar um máximo de PM temporários por cena igual ao seu nível. Esses pontos temporários desaparecem no final da cena.",
    "prerequisites": "Esgrima Mágica"
  },
  {
    "id": "bardo_inspiracao_marcial",
    "name": "Inspiração Marcial",
    "classId": "bardo",
    "className": "Bardo",
    "description": "Quando você usa Inspiração, você e seus aliados aplicam o bônus recebido em rolagens de dano (além de testes de perícia)."
  },
  {
    "id": "bardo_lendas_e_historias",
    "name": "Lendas e Histórias",
    "classId": "bardo",
    "className": "Bardo",
    "description": "Você é um arquivo vivo de relatos, canções e folclore. Além de outros benefícios a critério do mestre, quando faz um teste de Conhecimento, Misticismo, Nobreza ou Religião para informação, identificar criaturas ou identificar itens mágicos, você pode gastar 1 PM para rolá-lo novamente.",
    "prerequisites": "Int 1"
  },
  {
    "id": "bardo_manipular",
    "name": "Manipular",
    "classId": "bardo",
    "className": "Bardo",
    "description": "Você pode gastar 1 PM para fazer uma criatura fascinada por você ficar enfeitiçada até o fim da cena (Von CD Car anula). Se a criatura passar, fica imune a este efeito por um dia. Usar esta habilidade não conta como ameaça à criatura fascinada.",
    "prerequisites": "Música: Balada Fascinante"
  },
  {
    "id": "bardo_manipular_em_massa",
    "name": "Manipular em Massa",
    "classId": "bardo",
    "className": "Bardo",
    "description": "Quando usa Manipular, você pode gastar +2 PM. Se fizer isso, afeta todas as criaturas a sua escolha em alcance curto.",
    "prerequisites": "Fascinar em Massa, Manipular, 10º nível de bardo"
  },
  {
    "id": "bardo_musica_balada_fascinante",
    "name": "Música: Balada Fascinante",
    "classId": "bardo",
    "className": "Bardo",
    "description": "Faça um teste de Atuação oposto pelo teste de Vontade de uma criatura no alcance. Se você passar, ela fica fascinada enquanto você se concentrar (uma ação padrão por rodada). Um alvo hostil ou envolvido em combate recebe +5 no teste de resistência e tem direito a um novo teste sempre que você se concentrar. Se a criatura passar, fica imune a este efeito por um dia."
  },
  {
    "id": "bardo_musica_cancao_assustadora",
    "name": "Música: Canção Assustadora",
    "classId": "bardo",
    "className": "Bardo",
    "description": "Faça um teste de Atuação oposto pelo teste de Vontade de cada criatura a sua escolha dentro do alcance (você faz um único teste). Alvos que falhem ficam abalados até o fim da cena. Alvos que passem ficam imunes a este efeito por um dia."
  },
  {
    "id": "bardo_musica_melodia_curativa",
    "name": "Música: Melodia Curativa",
    "classId": "bardo",
    "className": "Bardo",
    "description": "Criaturas a sua escolha no alcance recuperam 1d6 PV. Quando usa esta habilidade, você pode gastar mais pontos de mana. Para cada PM extra, aumente a cura em +1d6 PV. Músicas de Bardo Alguns poderes do bardo são Músicas. Esses poderes compartilham as seguintes regras."
  },
  {
    "id": "bucaneiro_apostador",
    "name": "Apostador",
    "classId": "bucaneiro",
    "className": "Bucaneiro",
    "description": "Você pode gastar um dia para encontrar e participar de uma mesa de wyrt ou outro jogo de azar. Escolha um valor e faça um teste de Jogatina contra a CD correspondente: T$ 100 (CD 15), T$ 200 (CD 20), T$ 400 (CD 25), T$ 800 (CD 30), T$ 1.600 (CD 35) e assim por diante. Se passar, você ganha o valor escolhido (ou um item ou favor equivalente, a critério do mestre). Se falhar, perde esse mesmo o valor. A critério do mestre, o lugar onde você está pode limitar ou impossibilitar o uso deste poder.",
    "prerequisites": "treinado em Jogatina"
  },
  {
    "id": "bucaneiro_ataque_acrobatico",
    "name": "Ataque Acrobático",
    "classId": "bucaneiro",
    "className": "Bucaneiro",
    "description": "Quando se aproxima de um inimigo com um salto ou pirueta (em termos de jogo, usando Atletismo ou Acrobacia para se mover) e o ataca no mesmo turno, você recebe +2 nesse teste de ataque e na rolagem de dano."
  },
  {
    "id": "bucaneiro_aumento_de_atributo",
    "name": "Aumento de Atributo",
    "classId": "bucaneiro",
    "className": "Bucaneiro",
    "description": "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
  },
  {
    "id": "bucaneiro_aventureiro_avido",
    "name": "Aventureiro Ávido",
    "classId": "bucaneiro",
    "className": "Bucaneiro",
    "description": "Uma vez por rodada, você pode gastar 5 PM para realizar uma ação padrão ou de movimento adicional. Se possuir o poder Surto Heroico, em vez disso seu custo diminui em –2 PM. Características de Classe"
  },
  {
    "id": "bucaneiro_abusar_dos_fracos",
    "name": "Abusar dos Fracos",
    "classId": "bucaneiro",
    "className": "Bucaneiro",
    "description": "Quando ataca uma criatura sob efeito de uma condição de medo, seu dano aumenta em um passo.",
    "prerequisites": "Flagelo dos Mares"
  },
  {
    "id": "bucaneiro_amigos_no_porto",
    "name": "Amigos no Porto",
    "classId": "bucaneiro",
    "className": "Bucaneiro",
    "description": "Quando chega em uma comunidade portuária, você pode fazer um teste de Carisma (CD 10). Se passar, encontra um amigo para o qual pode pedir um favor ou que pode ajudá-lo como parceiro veterano de um tipo a sua escolha por um dia.",
    "prerequisites": "Car 1, 6º nível de bucaneiro"
  },
  {
    "id": "bucaneiro_aparar",
    "name": "Aparar",
    "classId": "bucaneiro",
    "className": "Bucaneiro",
    "description": "Uma vez por rodada, quando é atingido por um ataque, você pode gastar 1 PM para fazer um teste de ataque com bônus igual ao seu nível (além do normal). Se o resultado do seu teste for maior que o do oponente, você evita o ataque. Você só pode usar este poder se estiver usando uma arma corpo a corpo leve ou ágil.",
    "prerequisites": "Esgrimista"
  },
  {
    "id": "bucaneiro_bravata_audaz",
    "name": "Bravata Audaz",
    "classId": "bucaneiro",
    "className": "Bucaneiro",
    "description": "Você jura fazer uma façanha específica, como roubar o tesouro de Sckhar ou ganhar um beijo do príncipe e da princesa até o fim do baile. Se cumprir a bravata, seus PM aumentam em +2 por nível de bucaneiro até o fim da aventura."
  },
  {
    "id": "bucaneiro_bravata_imprudente",
    "name": "Bravata Imprudente",
    "classId": "bucaneiro",
    "className": "Bucaneiro",
    "description": "Na primeira rodada de um combate, você pode jurar derrotar seus inimigos com uma restrição a sua escolha, como lutar com uma mão nas costas, de guarda aberta (em termos de jogo, desprevenido), de olhos vendados (cego) etc. Uma restrição só é válida se prejudicá-lo (por exemplo, lutar com uma mão nas costas só vale como restrição se você luta com duas armas). O mestre tem a palavra final sobre a validade de uma restrição. Você sofre a penalidade durante todo o combate, mas, se vencer, recebe +2 nos testes de ataque e na margem de ameaça até o fim da aventura."
  },
  {
    "id": "bucaneiro_en_garde",
    "name": "En Garde",
    "classId": "bucaneiro",
    "className": "Bucaneiro",
    "description": "Você pode gastar uma ação de movimento e 1 PM para assumir postura de luta. Até o fim da cena, se estiver usando uma arma corpo a corpo leve ou ágil, você recebe +2 na margem de ameaça com essas armas e +2 na Defesa.",
    "prerequisites": "Esgrimista"
  },
  {
    "id": "bucaneiro_esgrimista",
    "name": "Esgrimista",
    "classId": "bucaneiro",
    "className": "Bucaneiro",
    "description": "Quando usa uma arma corpo a corpo leve ou ágil, você soma sua Inteligência nas rolagens de dano (limitado pelo seu nível).",
    "prerequisites": "Int 1"
  },
  {
    "id": "bucaneiro_flagelo_dos_mares",
    "name": "Flagelo dos Mares",
    "classId": "bucaneiro",
    "className": "Bucaneiro",
    "description": "Você aprende e pode lançar Amedrontar (atributo-chave Carisma). Esta não é uma habilidade mágica e provém de sua capacidade de incutir medo em seus inimigos.",
    "prerequisites": "treinado em Intimidação"
  },
  {
    "id": "bucaneiro_foliao",
    "name": "Folião",
    "classId": "bucaneiro",
    "className": "Bucaneiro",
    "description": "Você sabe fazer amizades durante festas, de noitadas em tavernas a bailes na corte. Nesses locais, você recebe +2 em testes de perícias de Carisma e a atitude de todas as pessoas em relação a você melhora em uma categoria.",
    "prerequisites": "Car 1"
  },
  {
    "id": "bucaneiro_grudar_o_cano",
    "name": "Grudar o Cano",
    "classId": "bucaneiro",
    "className": "Bucaneiro",
    "description": "Quando faz um ataque à distância com uma arma de fogo contra um oponente adjacente, você não sofre a penalidade de –5 no teste de ataque e aumenta seu dano em um passo.",
    "prerequisites": "treinado em Luta, Pistoleiro"
  },
  {
    "id": "bucaneiro_pernas_do_mar",
    "name": "Pernas do Mar",
    "classId": "bucaneiro",
    "className": "Bucaneiro",
    "description": "Você recebe +2 em Acrobacia e Atletismo. Além disso, quando está se equilibrando ou escalando, você não fica desprevenido e seu deslocamento não é reduzido à metade."
  },
  {
    "id": "bucaneiro_pistoleiro",
    "name": "Pistoleiro",
    "classId": "bucaneiro",
    "className": "Bucaneiro",
    "description": "Você recebe proficiência com armas de fogo e +2 nas rolagens de dano com essas armas."
  },
  {
    "id": "bucaneiro_presenca_paralisante",
    "name": "Presença Paralisante",
    "classId": "bucaneiro",
    "className": "Bucaneiro",
    "description": "Você soma seu Carisma em Iniciativa e, se for o primeiro na iniciativa, ganha uma ação padrão extra na primeira rodada.",
    "prerequisites": "Car 1, 4º nível de bucaneiro"
  },
  {
    "id": "bucaneiro_ripostar",
    "name": "Ripostar",
    "classId": "bucaneiro",
    "className": "Bucaneiro",
    "description": "Quando usa a habilidade aparar e evita o ataque, você pode gastar 1 PM. Se fizer isso, pode fazer um ataque corpo a corpo imediato contra o inimigo que o atacou (se ele estiver em alcance).",
    "prerequisites": "Aparar, 12º nível de bucaneiro"
  },
  {
    "id": "bucaneiro_touche",
    "name": "Touché",
    "classId": "bucaneiro",
    "className": "Bucaneiro",
    "description": "Quando se aproxima de um inimigo e o ataca com uma arma corpo a corpo leve ou ágil no mesmo turno, você pode gastar 2 PM para aumentar seu dano em um passo e receber +5 na margem de ameaça neste ataque.",
    "prerequisites": "Esgrimista, 10º nível de bucaneiro"
  },
  {
    "id": "cacador_ambidestria",
    "name": "Ambidestria",
    "classId": "cacador",
    "className": "Caçador",
    "description": "Se estiver empunhando duas armas (e pelo menos uma delas for leve) e fizer a ação agredir, você pode fazer dois ataques, um com cada arma. Se fizer isso, sofre –2 em todos os testes de ataque até o seu próximo turno.",
    "prerequisites": "Des 2"
  },
  {
    "id": "cacador_armadilha_arataca",
    "name": "Armadilha: Arataca",
    "classId": "cacador",
    "className": "Caçador",
    "description": "A vítima sofre 2d6 pontos de dano de perfuração e fica agarrada. Uma criatura agarrada pode escapar com uma ação padrão e um teste de Força ou Acrobacia (CD Sab)."
  },
  {
    "id": "cacador_armadilha_espinhos",
    "name": "Armadilha: Espinhos",
    "classId": "cacador",
    "className": "Caçador",
    "description": "A vítima sofre 6d6 pontos de dano de perfuração. Um teste de Reflexos (CD Sab) reduz o dano à metade."
  },
  {
    "id": "cacador_armadilha_laco",
    "name": "Armadilha: Laço",
    "classId": "cacador",
    "className": "Caçador",
    "description": "A vítima deve fazer um teste de Reflexos (CD Sab). Se passar, fica caída. Se falhar, fica agarrada. Uma criatura agarrada pode se soltar com uma ação padrão e um teste de Força ou Acrobacia (CD Sab)."
  },
  {
    "id": "cacador_armadilha_rede",
    "name": "Armadilha: Rede",
    "classId": "cacador",
    "className": "Caçador",
    "description": "Todas as criaturas na área ficam enredadas e não podem sair da área. Uma vítima pode se libertar com uma ação padrão e um teste de Força ou Acrobacia (CD 25). Além disso, a área ocupada pela rede é considerada terreno difícil. Nesta armadilha você escolhe quantas criaturas precisam estar na área para ativá-la."
  },
  {
    "id": "cacador_armadilheiro",
    "name": "Armadilheiro",
    "classId": "cacador",
    "className": "Caçador",
    "description": "Você soma sua Sabedoria no dano e na CD de suas armadilhas (cumulativo).",
    "prerequisites": "um poder de armadilha, 5º nível de caçador"
  },
  {
    "id": "cacador_arqueiro",
    "name": "Arqueiro",
    "classId": "cacador",
    "className": "Caçador",
    "description": "Se estiver usando uma arma de ataque à distância, você soma sua Sabedoria nas rolagens de dano (limitado pelo seu nível).",
    "prerequisites": "Sab 1"
  },
  {
    "id": "cacador_aumento_de_atributo",
    "name": "Aumento de Atributo",
    "classId": "cacador",
    "className": "Caçador",
    "description": "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
  },
  {
    "id": "cacador_bote",
    "name": "Bote",
    "classId": "cacador",
    "className": "Caçador",
    "description": "Se estiver empunhando duas armas e fizer uma investida, você pode pagar 1 PM para fazer um ataque adicional com sua arma secundária.",
    "prerequisites": "Ambidestria, 6º nível de caçador"
  },
  {
    "id": "cacador_camuflagem",
    "name": "Camuflagem",
    "classId": "cacador",
    "className": "Caçador",
    "description": "Você pode gastar 2 PM para se esconder mesmo sem camuflagem ou cobertura disponível.",
    "prerequisites": "6º nível de caçador"
  },
  {
    "id": "cacador_chuva_de_laminas",
    "name": "Chuva de Lâminas",
    "classId": "cacador",
    "className": "Caçador",
    "description": "Uma vez por rodada, quando usa Ambidestria, você pode pagar 2 PM para fazer um ataque adicional com sua arma primária.",
    "prerequisites": "Des 4, Ambidestria, 12º nível de caçador"
  },
  {
    "id": "cacador_ponto_fraco",
    "name": "Ponto Fraco",
    "classId": "cacador",
    "className": "Caçador",
    "description": "Quando usa a habilidade Marca da Presa, seus ataques contra a criatura marcada recebem +2 na margem de ameaça. Esse bônus dobra com a habilidade Inimigo."
  },
  {
    "id": "cacador_companheiro_animal",
    "name": "Companheiro Animal",
    "classId": "cacador",
    "className": "Caçador",
    "description": "Você recebe um companheiro animal. Veja o quadro na página 62.",
    "prerequisites": "Car 1, treinado em Adestramento"
  },
  {
    "id": "cacador_elo_com_a_natureza",
    "name": "Elo com a Natureza",
    "classId": "cacador",
    "className": "Caçador",
    "description": "Você soma sua Sabedoria em seu total de pontos de mana e aprende e pode lançar Caminhos da Natureza (atributo-chave Sabedoria).",
    "prerequisites": "Sab 1, 3º nível de caçador"
  },
  {
    "id": "cacador_emboscar",
    "name": "Emboscar",
    "classId": "cacador",
    "className": "Caçador",
    "description": "Você pode gastar 2 PM para realizar uma ação padrão adicional em seu turno. Você só pode usar este poder na primeira rodada de um combate.",
    "prerequisites": "treinado em Furtividade"
  },
  {
    "id": "cacador_empatia_selvagem",
    "name": "Empatia Selvagem",
    "classId": "cacador",
    "className": "Caçador",
    "description": "Você pode se comunicar com animais por meio de linguagem corporal e vocalizações. Você pode usar Adestramento com animais para mudar atitude e persuasão (veja Diplomacia, na página 118)."
  },
  {
    "id": "cacador_escaramuca",
    "name": "Escaramuça",
    "classId": "cacador",
    "className": "Caçador",
    "description": "Quando se move 6m ou mais, você recebe +2 na Defesa e Reflexos e +1d8 nas rolagens de dano de ataques corpo a corpo e à distância em alcance curto até o início de seu próximo turno. Você não pode usar esta habilidade se estiver vestindo armadura pesada.",
    "prerequisites": "Des 2, 6º nível de caçador"
  },
  {
    "id": "cacador_escaramuca_superior",
    "name": "Escaramuça Superior",
    "classId": "cacador",
    "className": "Caçador",
    "description": "Quando usa Escaramuça, seus bônus aumentam para +5 na Defesa e Reflexos e +1d12 em rolagens de dano.",
    "prerequisites": "Escaramuça, 12º nível de caçador"
  },
  {
    "id": "cacador_espreitar",
    "name": "Espreitar",
    "classId": "cacador",
    "className": "Caçador",
    "description": "Quando usa a habilidade Marca da Presa, você recebe um bônus de +1 em testes de perícia contra a criatura marcada. Esse bônus aumenta em +1 para cada PM adicional gasto na habilidade e também dobra com a habilidade Inimigo."
  },
  {
    "id": "cacador_ervas_curativas",
    "name": "Ervas Curativas",
    "classId": "cacador",
    "className": "Caçador",
    "description": "Você pode gastar uma ação completa e uma quantidade de PM a sua escolha (limitado por sua Sabedoria) para aplicar ervas que curam ou desintoxicam em você ou num aliado adjacente. Para cada PM que gastar, cura 2d6 PV ou remove uma condição envenenado afetando o alvo."
  },
  {
    "id": "cacador_impeto",
    "name": "Ímpeto",
    "classId": "cacador",
    "className": "Caçador",
    "description": "Você pode gastar 1 PM para aumentar seu deslocamento em +6m por uma rodada."
  },
  {
    "id": "cacador_inimigo_de_criatura",
    "name": "Inimigo de (Criatura)",
    "classId": "cacador",
    "className": "Caçador",
    "description": "Escolha um tipo de criatura entre animal, construto, espírito, monstro ou morto-vivo, ou duas raças humanoides (por exemplo, orcs e gnolls, ou elfos e qareen). Quando você usa a habilidade Marca da Presa contra uma criatura do tipo ou da raça escolhida, dobra os dados de bônus no dano. O nome desta habilidade varia de acordo com o tipo de criatura escolhida (Inimigo de Monstros, Inimigo de Mortos-Vivos etc.). Você pode escolher este poder outras vezes para inimigos diferentes."
  },
  {
    "id": "cacador_olho_do_falcao",
    "name": "Olho do Falcão",
    "classId": "cacador",
    "className": "Caçador",
    "description": "Você pode usar a habilidade Marca da Presa em criaturas em alcance longo. Armadilhas Alguns poderes do caçador são Armadilhas. Esses poderes compartilham as seguintes regras."
  },
  {
    "id": "cavaleiro_armadura_da_honra",
    "name": "Armadura da Honra",
    "classId": "cavaleiro",
    "className": "Cavaleiro",
    "description": "No início de cada cena, você recebe uma quantidade de pontos de vida temporários igual a seu nível + seu Carisma. Os PV temporários duram até o final da cena."
  },
  {
    "id": "cavaleiro_aumento_de_atributo",
    "name": "Aumento de Atributo",
    "classId": "cavaleiro",
    "className": "Cavaleiro",
    "description": "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
  },
  {
    "id": "cavaleiro_autoridade_feudal",
    "name": "Autoridade Feudal",
    "classId": "cavaleiro",
    "className": "Cavaleiro",
    "description": "Você pode gastar uma hora e 2 PM para conclamar o povo a ajudá-lo (qualquer pessoa sem um título de nobreza ou uma posição numa igreja reconhecida pelo seu reino). Em termos de jogo, essas pessoas contam como um parceiro iniciante de um tipo a sua escolha (aprovado pelo mestre) que lhe acompanha até o fim da aventura. Esta habilidade só pode ser usada em locais onde sua posição carregue alguma influência (a critério do mestre).",
    "prerequisites": "6º nível de cavaleiro"
  },
  {
    "id": "cavaleiro_desprezar_os_covardes",
    "name": "Desprezar os Covardes",
    "classId": "cavaleiro",
    "className": "Cavaleiro",
    "description": "Você recebe redução de dano 5 se estiver caído, desprevenido ou flanqueado."
  },
  {
    "id": "cavaleiro_escudeiro",
    "name": "Escudeiro",
    "classId": "cavaleiro",
    "className": "Cavaleiro",
    "description": "Você recebe os serviços de um escudeiro, um parceiro especial que cuida de seu equipamento. Suas armas fornecem +1 em rolagens de dano e sua armadura concede +1 na Defesa. Além disso, você pode pagar 1 PM para receber ajuda do escudeiro em combate. Você recebe uma ação de movimento que pode usar para se levantar, sacar um item ou trazer sua montaria. O escudeiro não conta em seu limite de parceiros. Caso ele morra, você pode treinar outro com um mês de trabalho."
  },
  {
    "id": "cavaleiro_especializacao_em_armadura",
    "name": "Especialização em Armadura",
    "classId": "cavaleiro",
    "className": "Cavaleiro",
    "description": "Se estiver usando armadura pesada, você recebe redução de dano 5 (cumulativa com a RD fornecida por Bastião).",
    "prerequisites": "12º nível de cavaleiro"
  },
  {
    "id": "cavaleiro_estandarte",
    "name": "Estandarte",
    "classId": "cavaleiro",
    "className": "Cavaleiro",
    "description": "Sua flâmula torna-se um símbolo de inspiração. No início de cada cena, você e todos os aliados que possam ver seu estandarte recebem um número de PM temporários igual ao seu Carisma (mínimo 1). Esses pontos temporários desaparecem no final da cena.",
    "prerequisites": "Título, 14º nível de cavaleiro"
  },
  {
    "id": "cavaleiro_etiqueta",
    "name": "Etiqueta",
    "classId": "cavaleiro",
    "className": "Cavaleiro",
    "description": "Você recebe +2 em Diplomacia e Nobreza e quando faz um teste dessas perícias pode gastar 1 PM para rolá-lo novamente."
  },
  {
    "id": "cavaleiro_investida_destruidora",
    "name": "Investida Destruidora",
    "classId": "cavaleiro",
    "className": "Cavaleiro",
    "description": "Quando faz a ação investida, você pode gastar 2 PM. Se fizer isso, causa +2d8 pontos de dano. Você deve usar esta habilidade antes de rolar o ataque."
  },
  {
    "id": "cavaleiro_montaria_corajosa",
    "name": "Montaria Corajosa",
    "classId": "cavaleiro",
    "className": "Cavaleiro",
    "description": "Sua montaria concede +1d6 em rolagens de dano corpo a corpo (cumulativo com qualquer bônus que ela já forneça como parceiro).",
    "prerequisites": "Montaria"
  },
  {
    "id": "cavaleiro_pajem",
    "name": "Pajem",
    "classId": "cavaleiro",
    "className": "Cavaleiro",
    "description": "Você recebe os serviços de um pajem, um parceiro que o auxilia em pequenos afazeres. Você recebe +2 em Diplomacia, por estar sempre aprumado, e sua condição de descanso é uma categoria acima do padrão pela situação (veja a página 106). O pajem pode executar pequenas tarefas, como entregar mensagens e comprar itens, e não conta em seu limite de parceiros. Caso ele morra, você pode treinar outro com uma semana de trabalho."
  },
  {
    "id": "cavaleiro_postura_de_combate_ariete_implacavel",
    "name": "Postura de Combate: Aríete Implacável",
    "classId": "cavaleiro",
    "className": "Cavaleiro",
    "description": "Ao assumir esta postura, você aumenta o bônus de ataque em investidas em +2. Para cada 2 PM adicionais que gastar quando assumir a postura, aumenta o bônus de ataque em +1. Além disso, se fizer uma investida contra um construto ou objeto, causa +2d8 de dano. Você precisa se deslocar todos os turnos para manter esta postura ativa."
  },
  {
    "id": "cavaleiro_postura_de_combate_castigo_de_ferro",
    "name": "Postura de Combate: Castigo de Ferro",
    "classId": "cavaleiro",
    "className": "Cavaleiro",
    "description": "Sempre que um aliado adjacente sofrer um ataque corpo a corpo, você pode gastar 1 PM para fazer um ataque na criatura que o atacou."
  },
  {
    "id": "cavaleiro_postura_de_combate_foco_de_batalha",
    "name": "Postura de Combate: Foco de Batalha",
    "classId": "cavaleiro",
    "className": "Cavaleiro",
    "description": "Sempre que um inimigo atacá-lo, você recebe 1 PM temporário (cumulativos). Você pode ganhar um máximo de PM temporários por cena igual ao seu nível. Esses pontos temporários desaparecem no final da cena."
  },
  {
    "id": "cavaleiro_postura_de_combate_muralha_intransponivel",
    "name": "Postura de Combate: Muralha Intransponível",
    "classId": "cavaleiro",
    "className": "Cavaleiro",
    "description": "Para assumir esta postura você precisa estar empunhando um escudo. Você recebe +1 na Defesa e em Reflexos. Além disso, quando sofre um efeito que permite um teste de Reflexos para reduzir o dano à metade, não sofre nenhum dano se passar. Para cada 2 PM adicionais que gastar quando assumir a postura, aumente esse bônus em +1. Por fim, enquanto mantiver esta postura, seu deslocamento é reduzido para 3m."
  },
  {
    "id": "cavaleiro_postura_de_combate_provocacao_petulante",
    "name": "Postura de Combate: Provocação Petulante",
    "classId": "cavaleiro",
    "className": "Cavaleiro",
    "description": "Enquanto esta postura estiver ativa, todos os inimigos que iniciarem seus turnos em alcance curto devem fazer um teste de Vontade (CD Car). Se falharem, qualquer ação hostil que realizarem deve ter você como alvo (mas suas outras ações não têm esta restrição). Ações hostis incluem ataques e outras ações que causem dano e/ou condições negativas. Mental. Posturas de Combate Alguns poderes do cavaleiro são Posturas de Combate. Esses poderes compartilham as seguintes regras."
  },
  {
    "id": "cavaleiro_postura_de_combate_torre_inabalavel",
    "name": "Postura de Combate: Torre Inabalável",
    "classId": "cavaleiro",
    "className": "Cavaleiro",
    "description": "Você assume uma postura defensiva que o torna imune a qualquer tentativa de tirá-lo do lugar, de forma mundana ou mágica. Enquanto mantiver a postura, você não pode se deslocar, mas soma sua Constituição na Defesa e pode substituir testes de Reflexos e Vontade por testes de Fortitude."
  },
  {
    "id": "cavaleiro_solidez",
    "name": "Solidez",
    "classId": "cavaleiro",
    "className": "Cavaleiro",
    "description": "Se estiver usando um escudo, você soma o bônus na Defesa recebido pelo escudo em testes de resistência."
  },
  {
    "id": "cavaleiro_titulo",
    "name": "Título",
    "classId": "cavaleiro",
    "className": "Cavaleiro",
    "description": "Você adquire um título de nobreza. Converse com o mestre para definir os benefícios exatos de seu título. Como regra geral, no início de cada aventura você recebe 20 TO por nível de cavaleiro (rendimentos dos impostos) ou a ajuda de um parceiro veterano (um membro de sua corte).",
    "prerequisites": "Autoridade Feudal, 10º nível de cavaleiro, ter conquistado terras ou realizado um serviço para um nobre que possa se tornar seu suserano"
  },
  {
    "id": "cavaleiro_torre_armada",
    "name": "Torre Armada",
    "classId": "cavaleiro",
    "className": "Cavaleiro",
    "description": "Quando um inimigo erra um ataque contra você, você pode gastar 1 PM. Se fizer isso, recebe +5 em rolagens de dano contra esse inimigo até o fim de seu próximo turno."
  },
  {
    "id": "clerigo_abencoar_arma",
    "name": "Abençoar Arma",
    "classId": "clerigo",
    "className": "Clérigo",
    "description": "Você se torna proficiente na arma preferida de sua divindade. Se estiver empunhando essa arma, pode gastar uma ação de movimento e 3 PM para infundi-la com poder divino. Até o final da cena, a arma é considerada mágica e emite luz dourada ou púrpura (como uma tocha). Além disso, o dano da arma aumenta em um passo e você pode usar sua Sabedoria em testes de ataque e rolagens de dano com ela, em vez do atributo padrão (não cumulativo com efeitos que somam este atributo)."
  },
  {
    "id": "clerigo_aumento_de_atributo",
    "name": "Aumento de Atributo",
    "classId": "clerigo",
    "className": "Clérigo",
    "description": "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
  },
  {
    "id": "clerigo_autoridade_eclesiastica",
    "name": "Autoridade Eclesiástica",
    "classId": "clerigo",
    "className": "Clérigo",
    "description": "Você possui uma posição formal em uma igreja reconhecida pelos outros membros de sua fé. Os efeitos deste poder variam de acordo com a igreja e o deus — clérigos de Khalmyr, por exemplo, possuem autoridade como juízes no Reinado — e ficam a cargo do mestre. Como regra geral, você recebe +5 em testes de Diplomacia ou Intimidação ao lidar com devotos de sua divindade e paga metade do preço de itens alquímicos, poções e serviços em templos de sua divindade.",
    "prerequisites": "5º nível de clérigo, devoto de um deus maior"
  },
  {
    "id": "clerigo_canalizar_energia_positiva_negativa",
    "name": "Canalizar Energia Positiva/Negativa",
    "classId": "clerigo",
    "className": "Clérigo",
    "description": "Você pode gastar uma ação padrão e PM para liberar uma onda de luz (se sua divindade canaliza energia positiva) ou trevas (se canaliza energia negativa) que afeta criaturas a sua escolha em alcance curto. Para cada PM que gastar, luz cura 1d6 PV em criaturas vivas e causa 1d6 pontos de dano de luz em mortos-vivos"
  },
  {
    "id": "clerigo_canalizar_amplo",
    "name": "Canalizar Amplo",
    "classId": "clerigo",
    "className": "Clérigo",
    "description": "Quando você usa a habilidade Canalizar Energia, pode gastar +2 PM para aumentar o alcance dela para médio.",
    "prerequisites": "Canalizar Energia Positiva ou Negativa"
  },
  {
    "id": "clerigo_comunhao_vital",
    "name": "Comunhão Vital",
    "classId": "clerigo",
    "className": "Clérigo",
    "description": "Quando lança uma magia que cure uma criatura, você pode pagar +2 PM para que outra criatura em alcance curto (incluindo você mesmo) recupere uma quantidade de pontos de vida igual à metade dos PV da cura original."
  },
  {
    "id": "clerigo_conhecimento_magico",
    "name": "Conhecimento Mágico",
    "classId": "clerigo",
    "className": "Clérigo",
    "description": "Você aprende duas magias de qualquer círculo que possa lançar. Você pode escolher este poder quantas vezes quiser."
  },
  {
    "id": "clerigo_expulsar_comandar_mortos_vivos",
    "name": "Expulsar/Comandar Mortos-Vivos",
    "classId": "clerigo",
    "className": "Clérigo",
    "description": "Você pode gastar uma ação padrão e 3 PM para expulsar (se sua divindade canaliza energia positiva) ou comandar (se canaliza energia negativa) todos os mortos-vivos em alcance curto. Mortos-vivos expulsos ficam apavorados por 1d6 rodadas. Mortos-vivos comandados não inteligentes (Int –4 ou menor) ficam sob suas ordens por um dia (até um limite de ND somados igual a seu nível +3; dar uma ordem a todos eles é uma ação de movimento) e mortos-vivos comandados inteligentes ficam fascinados por uma rodada. Mortos-vivos têm direito a um teste de Vontade (CD Sab) para evitar qualquer destes efeitos.",
    "prerequisites": "Canalizar Energia Positiva ou Negativa"
  },
  {
    "id": "clerigo_liturgia_magica",
    "name": "Liturgia Mágica",
    "classId": "clerigo",
    "className": "Clérigo",
    "description": "Você pode gastar uma ação de movimento para executar uma breve liturgia de sua fé. Se fizer isso, a CD para resistir à sua próxima habilidade de clérigo (desde que usada até o final de seu próximo turno) aumenta em +2."
  },
  {
    "id": "clerigo_magia_sagrada_profana",
    "name": "Magia Sagrada/Profana",
    "classId": "clerigo",
    "className": "Clérigo",
    "description": "Quando lança uma magia divina que causa dano, você pode gastar +1 PM. Se fizer isso, muda o tipo de dano da magia para luz (se sua divindade canaliza energia positiva) ou trevas (se canaliza energia negativa)."
  },
  {
    "id": "clerigo_mestre_celebrante",
    "name": "Mestre Celebrante",
    "classId": "clerigo",
    "className": "Clérigo",
    "description": "O número de pessoas que você afeta com uma missa aumenta em dez vezes e os benefícios que elas recebem dobram.",
    "prerequisites": "qualquer poder de Missa, 12º nível de clérigo"
  },
  {
    "id": "clerigo_missa_bencao_da_vida",
    "name": "Missa: Bênção da Vida",
    "classId": "clerigo",
    "className": "Clérigo",
    "description": "Os participantes recebem pontos de vida temporários em um valor igual ao seu nível + sua Sabedoria."
  },
  {
    "id": "clerigo_missa_chamado_as_armas",
    "name": "Missa: Chamado às Armas",
    "classId": "clerigo",
    "className": "Clérigo",
    "description": "Os participantes recebem +1 em testes de ataque e rolagens de dano."
  },
  {
    "id": "clerigo_missa_elevacao_do_espirito",
    "name": "Missa: Elevação do Espírito",
    "classId": "clerigo",
    "className": "Clérigo",
    "description": "Os participantes recebem pontos de mana temporários em um valor igual a sua Sabedoria."
  },
  {
    "id": "clerigo_missa_escudo_divino",
    "name": "Missa: Escudo Divino",
    "classId": "clerigo",
    "className": "Clérigo",
    "description": "Os participantes recebem +1 na Defesa e testes de resistência."
  },
  {
    "id": "clerigo_missa_superar_as_limitacoes",
    "name": "Missa: Superar as Limitações",
    "classId": "clerigo",
    "className": "Clérigo",
    "description": "Cada participante recebe +1d6 num único teste a sua escolha e pode usá-lo mesmo após rolar o dado."
  },
  {
    "id": "clerigo_prece_de_combate",
    "name": "Prece de Combate",
    "classId": "clerigo",
    "className": "Clérigo",
    "description": "Quando lança uma magia divina com tempo de conjuração de uma ação padrão em si mesmo, você pode gastar +2 PM para lançá-la como uma ação de movimento."
  },
  {
    "id": "clerigo_simbolo_sagrado_energizado",
    "name": "Símbolo Sagrado Energizado",
    "classId": "clerigo",
    "className": "Clérigo",
    "description": "Você pode gastar uma ação de movimento e 1 PM para fazer uma prece e energizar seu símbolo sagrado até o fim da cena. Um símbolo sagrado energizado emite uma luz dourada ou prateada (se sua divindade canaliza energia positiva) ou púrpura ou avermelhada (se canaliza energia negativa) que ilumina como uma tocha. Enquanto você estiver empunhando um símbolo sagrado energizado, o custo em PM para lançar suas magias divinas diminui em 1."
  },
  {
    "id": "druida_aspecto_do_inverno",
    "name": "Aspecto do Inverno",
    "classId": "druida",
    "className": "Druida",
    "description": "Você aprende e pode lançar uma magia de convocação ou evocação, arcana ou divina, de qualquer círculo que possa lançar. Além disso, recebe redução de frio 5 e suas magias que causam dano de frio causam +1 ponto de dano por dado."
  },
  {
    "id": "druida_aspecto_do_outono",
    "name": "Aspecto do Outono",
    "classId": "druida",
    "className": "Druida",
    "description": "Você aprende e pode lançar uma magia de necromancia, arcana ou divina, de qualquer círculo que possa lançar. Além disso, pode gastar 1 PM para impor uma penalidade de –2 nos testes de resistência de todos os inimigos em alcance curto até o início do seu próximo turno."
  },
  {
    "id": "druida_aspecto_da_primavera",
    "name": "Aspecto da Primavera",
    "classId": "druida",
    "className": "Druida",
    "description": "Você aprende e pode lançar uma magia de encantamento ou ilusão, arcana ou divina, de qualquer círculo que possa lançar. Além disso, escolha uma quantidade de magias igual ao seu Carisma (mínimo 1). O custo dessas magias é reduzido em −1 PM."
  },
  {
    "id": "druida_aspecto_do_verao",
    "name": "Aspecto do Verão",
    "classId": "druida",
    "className": "Druida",
    "description": "Você aprende e pode lançar uma magia de transmutação, arcana ou divina, de qualquer círculo que possa lançar. Além disso, pode gastar 1 PM para cobrir uma de suas armas com chamas até o fim da cena. A arma causa +1d6 pontos de dano de fogo. Sempre que você acertar um ataque com ela em combate, recebe 1 PM temporário. Você pode ganhar um máximo de PM temporários por cena igual ao seu nível e eles desaparecem no fim da cena."
  },
  {
    "id": "druida_aumento_de_atributo",
    "name": "Aumento de Atributo",
    "classId": "druida",
    "className": "Druida",
    "description": "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
  },
  {
    "id": "druida_companheiro_animal",
    "name": "Companheiro Animal",
    "classId": "druida",
    "className": "Druida",
    "description": "Você recebe um companheiro animal. Veja o quadro para detalhes. Você pode escolher este poder quantas vezes quiser, mas deve escolher companheiros diferentes e ainda está sujeito",
    "prerequisites": "Car 1, treinado em Adestramento"
  },
  {
    "id": "druida_companheiro_animal_aprimorado",
    "name": "Companheiro Animal Aprimorado",
    "classId": "druida",
    "className": "Druida",
    "description": "Escolha um de seus companheiros animais. Ele recebe um segundo tipo, ganhando os bônus de seu nível. Por exemplo, se você tiver um companheiro guardião veterano, pode adicionar o tipo fortão a ele, tornando-o um guardião fortão veterano que concede +3 na Defesa e +1d12 em uma rolagem de dano corpo a corpo.",
    "prerequisites": "Companheiro Animal, 6º nível de druida"
  },
  {
    "id": "druida_companheiro_animal_lendario",
    "name": "Companheiro Animal Lendário",
    "classId": "druida",
    "className": "Druida",
    "description": "Escolha um de seus companheiros animais. Esse animal passa a dobrar os bônus concedidos de seu tipo original.",
    "prerequisites": "Companheiro Animal, 18º nível de druida"
  },
  {
    "id": "druida_companheiro_animal_magico",
    "name": "Companheiro Animal Mágico",
    "classId": "druida",
    "className": "Druida",
    "description": "Escolha um de seus companheiros animais. Ele recebe um segundo tipo diferente, entre adepto, destruidor, magivocador ou médico, ganhando os bônus de seu nível.",
    "prerequisites": "Companheiro Animal, 8º nível de druida"
  },
  {
    "id": "druida_coracao_da_selva",
    "name": "Coração da Selva",
    "classId": "druida",
    "className": "Druida",
    "description": "A CD para resistir a seus efeitos de veneno aumenta em +2 e estes efeitos causam +1 de perda de vida por dado."
  },
  {
    "id": "druida_espirito_dos_equinocios",
    "name": "Espírito dos Equinócios",
    "classId": "druida",
    "className": "Druida",
    "description": "Você pode gastar 4 PM para ficar em equilíbrio com o mundo. Até o final da cena, quando rola um dado, pode rolar novamente qualquer resultado 1.",
    "prerequisites": "Aspecto da Primavera, Aspecto do Outono, 10º nível de druida"
  },
  {
    "id": "druida_espirito_dos_solsticios",
    "name": "Espírito dos Solstícios",
    "classId": "druida",
    "className": "Druida",
    "description": "Você transita entre os extremos do mundo natural. Quando lança uma magia, pode gastar +4 PM para maximizar os efeitos numéricos variáveis dela. Por exemplo, uma magia Curar Ferimentos aprimorada para curar 5d8+5 PV irá curar automaticamente 45 PV, sem a necessidade de rolar dados. Uma magia sem efeitos variáveis não pode ser afetada por este poder.",
    "prerequisites": "Aspecto do Inverno, Aspecto do Verão, 10º nível de druida"
  },
  {
    "id": "druida_forca_dos_penhascos",
    "name": "Força dos Penhascos",
    "classId": "druida",
    "className": "Druida",
    "description": "Você recebe +2 em Fortitude. Quando sofre dano enquanto em contato com o solo ou uma superfície de pedra, pode gastar uma quantidade de PM limitada por sua Sabedoria. Para cada PM gasto, reduz esse dano em 10.",
    "prerequisites": "4º nível de druida"
  },
  {
    "id": "druida_forma_primal",
    "name": "Forma Primal",
    "classId": "druida",
    "className": "Druida",
    "description": "Quando usa Forma Selvagem, você pode se transformar em uma fera primal. Você recebe os benefícios de dois tipos de animais (bônus iguais não se acumulam; use o que você quiser de cada tipo).",
    "prerequisites": "18º nível de druida"
  },
  {
    "id": "druida_forma_selvagem",
    "name": "Forma Selvagem",
    "classId": "druida",
    "className": "Druida",
    "description": "Você pode se transformar em animais (veja a seguir)."
  },
  {
    "id": "druida_forma_selvagem_aprimorada",
    "name": "Forma Selvagem Aprimorada",
    "classId": "druida",
    "className": "Druida",
    "description": "Quando usa Forma Selvagem, você pode gastar 6 PM ao todo para assumir uma forma aprimorada.",
    "prerequisites": "Forma Selvagem, 6º nível de druida"
  },
  {
    "id": "druida_forma_selvagem_superior",
    "name": "Forma Selvagem Superior",
    "classId": "druida",
    "className": "Druida",
    "description": "Quando usa Forma Selvagem, você pode gastar 10 PM ao todo para assumir uma forma superior.",
    "prerequisites": "Forma Selvagem Aprimorada, 12º nível de druida"
  },
  {
    "id": "druida_liberdade_da_pradaria",
    "name": "Liberdade da Pradaria",
    "classId": "druida",
    "className": "Druida",
    "description": "Você recebe +2 em Reflexos. Se estiver ao ar livre, sempre que lança uma magia, pode gastar 1 PM para aumentar o alcance dela em um passo (de toque para curto, de curto para médio ou de médio para longo)."
  },
  {
    "id": "druida_magia_natural",
    "name": "Magia Natural",
    "classId": "druida",
    "className": "Druida",
    "description": "Em forma selvagem, você pode lançar magias e empunhar catalisadores e esotéricos.",
    "prerequisites": "Forma Selvagem"
  },
  {
    "id": "druida_presas_afiadas",
    "name": "Presas Afiadas",
    "classId": "druida",
    "className": "Druida",
    "description": "A margem de ameaça de suas armas naturais aumenta em +2."
  },
  {
    "id": "druida_segredos_da_natureza",
    "name": "Segredos da Natureza",
    "classId": "druida",
    "className": "Druida",
    "description": "Você aprende duas magias de qualquer círculo que possa lançar. Elas devem pertencer às escolas que você sabe usar, mas podem ser arcanas ou divinas. Você pode escolher este poder quantas vezes quiser."
  },
  {
    "id": "druida_tranquilidade_dos_lagos",
    "name": "Tranquilidade dos Lagos",
    "classId": "druida",
    "className": "Druida",
    "description": "Você recebe +2 em Vontade. Se estiver portando um recipiente com água (não precisa estar empunhando), uma vez por rodada, quando faz um teste de resistência, pode pagar 1 PM para refazer a rolagem."
  },
  {
    "id": "guerreiro_ambidestria",
    "name": "Ambidestria",
    "classId": "guerreiro",
    "className": "Guerreiro",
    "description": "Se estiver empunhando duas armas (e pelo menos uma delas for leve) e fizer a ação agredir, você pode fazer dois ataques, um com cada arma. Se fizer isso, sofre –2 em todos os testes de ataque até o seu próximo turno.",
    "prerequisites": "Des 2"
  },
  {
    "id": "guerreiro_arqueiro",
    "name": "Arqueiro",
    "classId": "guerreiro",
    "className": "Guerreiro",
    "description": "Se estiver usando uma arma de ataque à distância, você soma sua Sabedoria em rolagens de dano (limitado pelo seu nível).",
    "prerequisites": "Sab 1"
  },
  {
    "id": "guerreiro_ataque_reflexo",
    "name": "Ataque Reflexo",
    "classId": "guerreiro",
    "className": "Guerreiro",
    "description": "Se um alvo em alcance de seus ataques corpo a corpo ficar desprevenido ou se mover voluntariamente para fora do seu alcance, você pode gastar 1 PM para fazer um ataque corpo a corpo contra esse alvo (apenas uma vez por alvo a cada rodada).",
    "prerequisites": "Des 1"
  },
  {
    "id": "guerreiro_aumento_de_atributo",
    "name": "Aumento de Atributo",
    "classId": "guerreiro",
    "className": "Guerreiro",
    "description": "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
  },
  {
    "id": "guerreiro_bater_e_correr",
    "name": "Bater e Correr",
    "classId": "guerreiro",
    "className": "Guerreiro",
    "description": "Quando faz uma investida, você pode continuar se movendo após o ataque, até o limite de seu deslocamento. Se gastar 2 PM, pode fazer uma investida sobre terreno difícil e sem sofrer a penalidade de Defesa."
  },
  {
    "id": "guerreiro_destruidor",
    "name": "Destruidor",
    "classId": "guerreiro",
    "className": "Guerreiro",
    "description": "Quando causa dano com uma arma corpo a corpo de duas mãos, você pode rolar novamente qualquer resultado 1 ou 2 da rolagem de dano da arma.",
    "prerequisites": "For 1"
  },
  {
    "id": "guerreiro_esgrimista",
    "name": "Esgrimista",
    "classId": "guerreiro",
    "className": "Guerreiro",
    "description": "Quando usa uma arma corpo a corpo leve ou ágil, você soma sua Inteligência em rolagens de dano (limitado pelo seu nível).",
    "prerequisites": "Int 1"
  },
  {
    "id": "guerreiro_especializacao_em_arma",
    "name": "Especialização em Arma",
    "classId": "guerreiro",
    "className": "Guerreiro",
    "description": "Escolha uma arma. Você recebe +2 em rolagens de dano com essa arma. Você pode escolher este poder outras vezes para armas diferentes."
  },
  {
    "id": "guerreiro_especializacao_em_armadura",
    "name": "Especialização em Armadura",
    "classId": "guerreiro",
    "className": "Guerreiro",
    "description": "Você recebe redução de dano 5 se estiver usando uma armadura pesada.",
    "prerequisites": "12º nível de guerreiro"
  },
  {
    "id": "guerreiro_golpe_de_raspao",
    "name": "Golpe de Raspão",
    "classId": "guerreiro",
    "className": "Guerreiro",
    "description": "Uma vez por rodada, quando erra um ataque, você pode gastar 2 PM. Se fizer isso, causa metade do dano que causaria (ignorando efeitos que se aplicariam caso o ataque acertasse)."
  },
  {
    "id": "guerreiro_golpe_demolidor",
    "name": "Golpe Demolidor",
    "classId": "guerreiro",
    "className": "Guerreiro",
    "description": "Quando usa a manobra quebrar ou ataca um objeto, você pode gastar 2 PM para ignorar a redução de dano dele."
  },
  {
    "id": "guerreiro_golpe_pessoal",
    "name": "Golpe Pessoal",
    "classId": "guerreiro",
    "className": "Guerreiro",
    "description": "Quando faz um ataque, você pode desferir seu Golpe Pessoal, uma técnica única, com efeitos determinados por você. Você constrói seu Golpe Pessoal escolhendo efeitos da lista a seguir. Cada efeito possui um custo; a soma deles será o custo do Golpe Pessoal (mínimo 1 PM). O",
    "prerequisites": "5º nível de guerreiro"
  },
  {
    "id": "guerreiro_impeto",
    "name": "Ímpeto",
    "classId": "guerreiro",
    "className": "Guerreiro",
    "description": "Você pode gastar 1 PM para aumentar seu deslocamento em +6m por uma rodada."
  },
  {
    "id": "guerreiro_mestre_em_arma",
    "name": "Mestre em Arma",
    "classId": "guerreiro",
    "className": "Guerreiro",
    "description": "Escolha uma arma. Com esta arma, seu dano aumenta em um passo e quando faz um teste de ataque você pode gastar 2 PM para rolá-lo novamente.",
    "prerequisites": "Especialização em Arma com a arma escolhida, 12º nível de guerreiro"
  },
  {
    "id": "guerreiro_planejamento_marcial",
    "name": "Planejamento Marcial",
    "classId": "guerreiro",
    "className": "Guerreiro",
    "description": "Uma vez por dia, você pode gastar uma hora e 3 PM para escolher um poder de guerreiro ou de combate cujos pré-requisitos cumpra. Você recebe os benefícios desse poder até o próximo dia.",
    "prerequisites": "treinado em Guerra, 10º nível de guerreiro"
  },
  {
    "id": "guerreiro_romper_resistencias",
    "name": "Romper Resistências",
    "classId": "guerreiro",
    "className": "Guerreiro",
    "description": "Quando faz um Ataque Especial, você pode gastar 1 PM adicional para ignorar 10 pontos de redução de dano."
  },
  {
    "id": "guerreiro_solidez",
    "name": "Solidez",
    "classId": "guerreiro",
    "className": "Guerreiro",
    "description": "Se estiver usando um escudo, você aplica o bônus na Defesa recebido pelo escudo em testes de resistência."
  },
  {
    "id": "guerreiro_tornado_de_dor",
    "name": "Tornado de Dor",
    "classId": "guerreiro",
    "className": "Guerreiro",
    "description": "Você pode gastar uma ação padrão e 2 PM para desferir uma série de golpes giratórios. Faça um ataque corpo a corpo e compare-o com a Defesa de cada inimigo em seu alcance natural. Então faça uma rolagem de dano com um bônus cumulativo de +2 para cada acerto e aplique-a em cada inimigo atingido.",
    "prerequisites": "6º nível de guerreiro"
  },
  {
    "id": "guerreiro_valentao",
    "name": "Valentão",
    "classId": "guerreiro",
    "className": "Guerreiro",
    "description": "Você recebe +2 em testes de ataque e rolagens de dano contra oponentes caídos, desprevenidos, flanqueados ou indefesos. Durão. A partir do 3ª nível, sua rijeza muscular permite que você absorva ferimentos. Sempre que sofre dano, você pode gastar 3 PM para reduzir esse dano à metade."
  },
  {
    "id": "inventor_agite_antes_de_usar",
    "name": "Agite Antes de Usar",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Quando usa um preparado alquímico que cause dano, você pode gastar uma quantidade de PM a sua escolha (limitado por sua Inteligência). Para cada PM que gastar, o item causa um dado extra de dano do mesmo tipo.",
    "prerequisites": "treinado em Ofício (alquimista)"
  },
  {
    "id": "inventor_ajuste_de_mira",
    "name": "Ajuste de Mira",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Você pode gastar uma ação padrão e uma quantidade de PM a sua escolha (limitado pela sua Inteligência) para aprimorar uma arma de ataque à distância. Para cada PM que gastar, você recebe +1 em rolagens de dano com a arma até o final da cena.",
    "prerequisites": "Balística"
  },
  {
    "id": "inventor_alquimista_de_batalha",
    "name": "Alquimista de Batalha",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Quando usa um preparado alquímico ou poção que cause dano, você soma sua Inteligência na rolagem de dano.",
    "prerequisites": "Alquimista Iniciado"
  },
  {
    "id": "inventor_alquimista_iniciado",
    "name": "Alquimista Iniciado",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Você recebe um livro de fórmulas e pode fabricar poções com fórmulas que conheça de 1º e 2º círculos. Veja as páginas 333 e 341 para as regras de poções.",
    "prerequisites": "Int 1, Sab 1, treinado em Ofício (alquimista)"
  },
  {
    "id": "inventor_armeiro",
    "name": "Armeiro",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Você recebe proficiência com armas marciais corpo a corpo. Quando empunha uma arma corpo a corpo, pode usar sua Inteligência em vez de Força nos testes de ataque e rolagens de dano.",
    "prerequisites": "treinado em Luta e Ofício (armeiro)"
  },
  {
    "id": "inventor_ativacao_rapida",
    "name": "Ativação Rápida",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Ao ativar uma engenhoca com ação padrão, você pode pagar 2 PM para ativá-la com uma ação de movimento, em vez disto.",
    "prerequisites": "Engenhoqueiro, 7º nível de inventor"
  },
  {
    "id": "inventor_aumento_de_atributo",
    "name": "Aumento de Atributo",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
  },
  {
    "id": "inventor_automato",
    "name": "Autômato",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Você fabrica um autômato, um construto que obedece a seus comandos. Ele é um parceiro iniciante de um tipo a sua escolha entre ajudante, assassino, atirador, combatente, guardião, montaria ou vigilante. No 7º nível, ele muda para veterano e, no 15º nível, para mestre. Se o autômato for destruído, você pode fabricar um novo com uma semana de trabalho e T$ 100.",
    "prerequisites": "Engenhoqueiro"
  },
  {
    "id": "inventor_automato_prototipado",
    "name": "Autômato Prototipado",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Você pode gastar uma ação padrão e 2 PM para ativar uma melhoria experimental em seu autômato. Role 1d6. Em um resultado 2 a 6, você aumenta o nível de parceiro do autômato em um passo (até mestre), ou concede a ele a habilidade iniciante de outro de seus tipos, até o fim da cena. Em um resultado 1, o autômato enguiça como uma engenhoca.",
    "prerequisites": "Autômato"
  },
  {
    "id": "inventor_balistica",
    "name": "Balística",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Você recebe proficiência com armas marciais de ataque à distância ou com armas de fogo. Quando usa uma arma de ataque à distância, pode usar sua Inteligência em vez de Destreza nos testes de ataque (e, caso possua o poder Estilo de Disparo, nas rolagens de dano).",
    "prerequisites": "treinado em Pontaria e Ofício (armeiro)"
  },
  {
    "id": "inventor_blindagem",
    "name": "Blindagem",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Você pode usar sua Inteligência na Defesa quando usa armadura pesada. Se fizer isso, não pode somar sua Destreza, mesmo que outras habilidades ou efeitos permitam isso.",
    "prerequisites": "Couraceiro, 8º nível de inventor"
  },
  {
    "id": "inventor_cano_raiado",
    "name": "Cano Raiado",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Quando usa uma arma de disparo feita por você mesmo, ela recebe +1 na margem de ameaça.",
    "prerequisites": "Balística, 5º nível de inventor"
  },
  {
    "id": "inventor_catalisador_instavel",
    "name": "Catalisador Instável",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Você pode gastar uma ação completa e 3 PM para fabricar um preparado alquímico ou poção cuja fórmula conheça instantaneamente. O custo do item é reduzido à metade e você não precisa fazer o teste de Ofício (alquimista), mas ele só dura até o fim da cena.",
    "prerequisites": "Alquimista Iniciado"
  },
  {
    "id": "inventor_chutes_e_palavroes",
    "name": "Chutes e Palavrões",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Uma vez por rodada, quando faz um teste de Ofício (engenhoqueiro) para ativar uma engenhoca, você pode gastar 1 PM para rolá-lo novamente.",
    "prerequisites": "Engenhoqueiro"
  },
  {
    "id": "inventor_conhecimento_de_formulas",
    "name": "Conhecimento de Fórmulas",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Você aprende três fórmulas de quaisquer círculos que possa aprender. Você pode escolher este poder quantas vezes quiser.",
    "prerequisites": "Alquimista Iniciado"
  },
  {
    "id": "inventor_couraceiro",
    "name": "Couraceiro",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Você recebe proficiência com armaduras pesadas e escudos. Quando usa armadura, pode usar sua Inteligência em vez de Destreza na Defesa (mas continua não podendo somar um atributo na Defesa quando usa armadura pesada).",
    "prerequisites": "treinado em Ofício (armeiro)"
  },
  {
    "id": "inventor_engenhoqueiro",
    "name": "Engenhoqueiro",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Você pode fabricar engenhocas. Veja as regras para isso na página 70.",
    "prerequisites": "Int 3, treinado em Ofício (engenhoqueiro)"
  },
  {
    "id": "inventor_farmaceutico",
    "name": "Farmacêutico",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Quando usa um item alquímico que cure pontos de vida, você pode gastar uma quantidade de PM a sua escolha (limitado por sua Inteligência). Para cada PM que gastar, o item cura um dado extra do mesmo tipo.",
    "prerequisites": "Sab 1, treinado em Ofício (alquimista)"
  },
  {
    "id": "inventor_ferreiro",
    "name": "Ferreiro",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Quando usa uma arma corpo a corpo feita por você mesmo, o dano dela aumenta em um passo.",
    "prerequisites": "Armeiro, 5º nível de inventor"
  },
  {
    "id": "inventor_granadeiro",
    "name": "Granadeiro",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Você pode arremessar itens alquímicos e poções em alcance médio. Você pode usar sua Inteligência em vez de Destreza para calcular a CD do teste de resistência desses itens.",
    "prerequisites": "Alquimista de Batalha"
  },
  {
    "id": "inventor_homunculo",
    "name": "Homúnculo",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Você possui um homúnculo, uma criatura Minúscula feita de alquimia. Vocês podem se comunicar telepaticamente em alcance longo e ele obedece a suas ordens, mas ainda está limitado ao que uma criatura de seu tamanho pode fazer. Um homúnculo é um parceiro ajudante iniciante. Você pode perder 1d6 pontos de vida para seu homúnculo assumir uma forma capaz de protegê-lo e se tornar também um parceiro guardião iniciante até o fim da cena.",
    "prerequisites": "Alquimista Iniciado"
  },
  {
    "id": "inventor_invencao_potente",
    "name": "Invenção Potente",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Quando usa um item ou engenhoca fabricado por você mesmo, você pode pagar 1 PM para aumentar em +2 a CD para resistir a ele."
  },
  {
    "id": "inventor_maestria_em_pericia",
    "name": "Maestria em Perícia",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Escolha um número de perícias treinadas igual a sua Inteligência, exceto bônus temporários. Quando faz um teste dessas perícias, você pode gastar 1 PM para escolher 10 em qualquer situação, exceto testes de ataque."
  },
  {
    "id": "inventor_manutencao_eficiente",
    "name": "Manutenção Eficiente",
    "classId": "inventor",
    "className": "Inventor",
    "description": "A quantidade de engenhocas que você pode manter aumenta em +3. Além disso, cada engenhoca passa a ocupar meio espaço.",
    "prerequisites": "Engenhoqueiro, 5º nível de inventor"
  },
  {
    "id": "inventor_mestre_alquimista",
    "name": "Mestre Alquimista",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Você pode fabricar poções com fórmulas que conheça de qualquer círculo.",
    "prerequisites": "Int 3, Sab 3, Alquimista Iniciado, 10º nível de inventor"
  },
  {
    "id": "inventor_mestre_cuca",
    "name": "Mestre Cuca",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Todas as comidas que você cozinha têm seu bônus numérico aumentado em +1.",
    "prerequisites": "treinado em Ofício (cozinheiro)"
  },
  {
    "id": "inventor_mistura_fervilhante",
    "name": "Mistura Fervilhante",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Quando usa um item alquímico ou poção, você pode gastar 2 PM para dobrar a área de efeito dele.",
    "prerequisites": "Alquimista Iniciado, 5º nível de inventor"
  },
  {
    "id": "inventor_oficina_de_campo",
    "name": "Oficina de Campo",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Você pode gastar uma hora e 2 PM para fazer a manutenção do equipamento de seu grupo. Cada membro do grupo escolhe uma arma, armadura ou escudo para manutenção. Armas recebem +1 em testes de ataque, armaduras e escudos aumentam seu bônus na Defesa em +1. Os benefícios duram um dia.",
    "prerequisites": "treinado em Ofício (armeiro)"
  },
  {
    "id": "inventor_pedra_de_amolar",
    "name": "Pedra de Amolar",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Você pode gastar uma ação de movimento e uma quantidade de PM a sua escolha (limitado por sua Inteligência) para aprimorar uma arma corpo a corpo que esteja empunhando. Para cada PM que gastar, você recebe +1 em rolagens de dano com a arma até o final da cena.",
    "prerequisites": "Armeiro"
  },
  {
    "id": "inventor_sintese_rapida",
    "name": "Síntese Rápida",
    "classId": "inventor",
    "className": "Inventor",
    "description": "Quando fabrica um item alquímico ou poção, você pode fabricar o dobro de doses no mesmo tempo (pagando o custo de matéria-prima de cada uma).",
    "prerequisites": "Alquimista Iniciado"
  },
  {
    "id": "ladino_assassinar",
    "name": "Assassinar",
    "classId": "ladino",
    "className": "Ladino",
    "description": "Você pode gastar uma ação de movimento e 3 PM para analisar uma criatura em alcance curto. Até o fim de seu próximo turno, seu primeiro Ataque Furtivo que causar dano a ela tem seus dados de dano extras dessa habilidade dobrados.",
    "prerequisites": "5º nível de ladino"
  },
  {
    "id": "ladino_aumento_de_atributo",
    "name": "Aumento de Atributo",
    "classId": "ladino",
    "className": "Ladino",
    "description": "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
  },
  {
    "id": "ladino_contatos_no_submundo",
    "name": "Contatos no Submundo",
    "classId": "ladino",
    "className": "Ladino",
    "description": "Quando chega em uma comunidade equivalente a uma vila ou maior, você pode gastar 2 PM para fazer um teste de Carisma (CD 10). Se passar, enquanto estiver nessa comunidade, recebe +5 em testes de Investigação para interrogar, pode comprar itens mundanos, poções e pergaminhos com 20% de desconto (não cumulativo com barganha e outros descontos) e, de acordo com o mestre, tem acesso a itens e serviços proibidos (como armas de pólvora e venenos)."
  },
  {
    "id": "ladino_emboscar",
    "name": "Emboscar",
    "classId": "ladino",
    "className": "Ladino",
    "description": "Na primeira rodada de cada combate, você pode gastar 2 PM para executar uma ação padrão adicional em seu turno.",
    "prerequisites": "treinado em Furtividade"
  },
  {
    "id": "ladino_escapista",
    "name": "Escapista",
    "classId": "ladino",
    "className": "Ladino",
    "description": "Você recebe +5 em testes de Acrobacia para escapar, passar por espaço apertado e passar por inimigo e em testes para resistir a efeitos de movimento."
  },
  {
    "id": "ladino_fuga_formidavel",
    "name": "Fuga Formidável",
    "classId": "ladino",
    "className": "Ladino",
    "description": "Você pode gastar uma ação completa e 1 PM para analisar o lugar no qual está (um castelo, um porto, a praça de uma cidade...). Até o fim da cena, recebe +3m em seu deslocamento, +5 em Acrobacia e Atletismo e ignora",
    "prerequisites": "Int 1"
  },
  {
    "id": "ladino_gatuno",
    "name": "Gatuno",
    "classId": "ladino",
    "className": "Ladino",
    "description": "Você recebe +2 em Atletismo. Quando escala, não fica desprevenido e avança seu deslocamento normal, em vez de metade dele."
  },
  {
    "id": "ladino_ladrao_arcano",
    "name": "Ladrão Arcano",
    "classId": "ladino",
    "className": "Ladino",
    "description": "Quando causa dano com um ataque furtivo em uma criatura capaz de lançar magias, você pode “roubar” uma magia que já a tenha visto lançar. Você precisa pagar 1 PM por círculo da magia e pode roubar magias de até 4º círculo. Até o fim da cena, você pode lançar a magia roubada (atributo-chave Inteligência).",
    "prerequisites": "Roubo de Mana, 13º nível de ladino"
  },
  {
    "id": "ladino_mao_na_boca",
    "name": "Mão na Boca",
    "classId": "ladino",
    "className": "Ladino",
    "description": "Você recebe +2 em testes de agarrar. Quando acerta um ataque furtivo contra uma criatura desprevenida, você pode fazer um teste de agarrar como uma ação livre. Se agarrar a criatura, ela não poderá falar enquanto estiver agarrada.",
    "prerequisites": "treinado em Luta"
  },
  {
    "id": "ladino_maos_rapidas",
    "name": "Mãos Rápidas",
    "classId": "ladino",
    "className": "Ladino",
    "description": "Uma vez por rodada, ao fazer um teste de Ladinagem para abrir fechaduras, ocultar item, punga ou sabotar, você pode pagar 1 PM para fazê-lo como uma ação livre.",
    "prerequisites": "Des 2, treinado em Ladinagem"
  },
  {
    "id": "ladino_mente_criminosa",
    "name": "Mente Criminosa",
    "classId": "ladino",
    "className": "Ladino",
    "description": "Você soma sua Inteligência em Ladinagem e Furtividade.",
    "prerequisites": "Int 1"
  },
  {
    "id": "ladino_oportunismo",
    "name": "Oportunismo",
    "classId": "ladino",
    "className": "Ladino",
    "description": "Uma vez por rodada, quando um inimigo adjacente sofre dano de um de seus aliados, você pode gastar 2 PM para fazer um ataque corpo a corpo contra este inimigo.",
    "prerequisites": "6º nível de ladino"
  },
  {
    "id": "ladino_rolamento_defensivo",
    "name": "Rolamento Defensivo",
    "classId": "ladino",
    "className": "Ladino",
    "description": "Sempre que sofre dano, você pode gastar 2 PM para reduzir esse dano à metade. Após usar este poder, você fica caído.",
    "prerequisites": "treinado em Reflexos"
  },
  {
    "id": "ladino_roubo_de_mana",
    "name": "Roubo de Mana",
    "classId": "ladino",
    "className": "Ladino",
    "description": "Quando você causa dano com um ataque furtivo, para cada 1d6 de dano de seu ataque furtivo, você recebe 1 PM temporário e a criatura perde 1 ponto de mana (se tiver). Você só pode usar este poder uma vez por cena contra uma mesma criatura.",
    "prerequisites": "Truque Mágico, 7º nível de ladino"
  },
  {
    "id": "ladino_saqueador_de_tumbas",
    "name": "Saqueador de Tumbas",
    "classId": "ladino",
    "className": "Ladino",
    "description": "Você recebe +5 em testes de Investigação para encontrar armadilhas e em testes de resistência contra elas. Além disso, gasta uma ação padrão para desabilitar mecanismos, em vez de 1d4 rodadas (veja a perícia Ladinagem)."
  },
  {
    "id": "ladino_sombra",
    "name": "Sombra",
    "classId": "ladino",
    "className": "Ladino",
    "description": "Você recebe +2 em Furtividade, não sofre penalidade em testes de Furtividade por se mover no seu deslocamento normal e reduz a penalidade por atacar e fazer outras ações chamativas para –10.",
    "prerequisites": "treinado em Furtividade"
  },
  {
    "id": "ladino_truque_magico",
    "name": "Truque Mágico",
    "classId": "ladino",
    "className": "Ladino",
    "description": "Você aprende e pode lançar uma magia arcana de 1º círculo a sua escolha, pagando seu custo normal em PM. Seu atributo-chave para esta magia é Inteligência. Você pode escolher este poder quantas vezes quiser.",
    "prerequisites": "Int 1"
  },
  {
    "id": "ladino_velocidade_ladina",
    "name": "Velocidade Ladina",
    "classId": "ladino",
    "className": "Ladino",
    "description": "Uma vez por rodada, você pode gastar 2 PM para realizar uma ação de movimento adicional em seu turno.",
    "prerequisites": "Des 2, treinado em Iniciativa"
  },
  {
    "id": "ladino_veneno_persistente",
    "name": "Veneno Persistente",
    "classId": "ladino",
    "className": "Ladino",
    "description": "Quando aplica uma dose de veneno a uma arma, este veneno dura por três ataques (em vez de apenas um).",
    "prerequisites": "Veneno Potente, 8º nível de ladino"
  },
  {
    "id": "ladino_veneno_potente",
    "name": "Veneno Potente",
    "classId": "ladino",
    "className": "Ladino",
    "description": "A CD para resistir aos venenos que você usa aumenta em +5.",
    "prerequisites": "treinado em Ofício (alquimista)"
  },
  {
    "id": "lutador_arma_improvisada",
    "name": "Arma Improvisada",
    "classId": "lutador",
    "className": "Lutador",
    "description": "Para você, atacar com armas improvisadas conta como fazer um ataque desarmado, mas seu dano aumenta em um passo. Você pode gastar uma ação de movimento para procurar uma pedra, cadeira, garrafa ou qualquer coisa que possa usar como arma. Faça um teste de Percepção (CD 20). Se você passar, encontra uma arma improvisada. Armas improvisadas são frágeis; se você errar um ataque e o resultado do d20 for um número ímpar, a arma quebra."
  },
  {
    "id": "lutador_ate_acertar",
    "name": "Até Acertar",
    "classId": "lutador",
    "className": "Lutador",
    "description": "Se você errar um ataque desarmado, recebe um bônus cumulativo de +2 em testes de ataque e rolagens de dano desarmado contra o mesmo oponente. Os bônus terminam quando você acertar um ataque ou no fim da cena, o que acontecer primeiro."
  },
  {
    "id": "lutador_aumento_de_atributo",
    "name": "Aumento de Atributo",
    "classId": "lutador",
    "className": "Lutador",
    "description": "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
  },
  {
    "id": "lutador_bracos_calejados",
    "name": "Braços Calejados",
    "classId": "lutador",
    "className": "Lutador",
    "description": "Se você não estiver usando armadura, soma sua Força na Defesa, limitado pelo seu nível."
  },
  {
    "id": "lutador_cabecada",
    "name": "Cabeçada",
    "classId": "lutador",
    "className": "Lutador",
    "description": "Quando faz um ataque desarmado, você pode gastar 2 PM. Se fizer isso, o oponente fica desprevenido contra este ataque. Você só pode usar este poder uma vez por cena contra um mesmo alvo."
  },
  {
    "id": "lutador_chave",
    "name": "Chave",
    "classId": "lutador",
    "className": "Lutador",
    "description": "Se estiver agarrando uma criatura e fizer um teste de manobra contra ela para causar dano, o dano desarmado aumenta em um passo.",
    "prerequisites": "Int 1, Lutador de Chão, 4º nível de lutador"
  },
  {
    "id": "lutador_confianca_dos_ringues",
    "name": "Confiança dos Ringues",
    "classId": "lutador",
    "className": "Lutador",
    "description": "Quando um inimigo erra um ataque corpo a corpo contra você, você recebe 2 PM temporários (cumulativos). Você pode ganhar um máximo de PM temporários por cena igual ao seu nível. Esses pontos temporários desaparecem no final da cena.",
    "prerequisites": "8º nível de lutador"
  },
  {
    "id": "lutador_convencido",
    "name": "Convencido",
    "classId": "lutador",
    "className": "Lutador",
    "description": "Acostumado a contar apenas com seus músculos, você adquiriu certo desdém por artes mais sofisticadas. Você recebe resistência a medo e mental +5."
  },
  {
    "id": "lutador_golpe_baixo",
    "name": "Golpe Baixo",
    "classId": "lutador",
    "className": "Lutador",
    "description": "Quando faz um ataque desarmado, você pode gastar 2 PM. Se fizer isso e acertar o ataque, o oponente deve fazer um teste de Fortitude (CD For). Se ele falhar, fica atordoado por uma rodada (apenas uma vez por cena).",
    "prerequisites": "Trocação, 12º nível de lutador"
  },
  {
    "id": "lutador_trincado",
    "name": "Trincado",
    "classId": "lutador",
    "className": "Lutador",
    "description": "Esculpido à exaustão, seu corpo se tornou uma máquina. Você soma sua Constituição nas rolagens de dano desarmado.",
    "prerequisites": "Con 3, Sarado, 10º nível de lutador"
  },
  {
    "id": "lutador_trocacao",
    "name": "Trocação",
    "classId": "lutador",
    "className": "Lutador",
    "description": "Quando você começa a bater, não para mais. Ao acertar um ataque desarmado, pode fazer outro ataque desarmado contra o mesmo alvo, pagando uma quantidade de PM igual à quantidade de ataques já realizados por você na rodada. Ou seja, pode fazer o primeiro ataque extra gastando 1 PM, um segundo ataque extra gastando mais 2 PM e assim por diante, até errar um ataque ou não ter mais pontos de mana.",
    "prerequisites": "6º nível de lutador"
  },
  {
    "id": "lutador_trocacao_tumultuosa",
    "name": "Trocação Tumultuosa",
    "classId": "lutador",
    "className": "Lutador",
    "description": "Quando usa a ação agredir para fazer um ataque desarmado, você pode gastar 2 PM para atingir todas as criaturas adjacentes — incluindo aliados! Você deve usar este poder antes de rolar o ataque e compara o resultado de seu teste contra a Defesa de cada criatura.",
    "prerequisites": "Trocação, 8º nível de lutador"
  },
  {
    "id": "lutador_valentao",
    "name": "Valentão",
    "classId": "lutador",
    "className": "Lutador",
    "description": "Você recebe +2 em testes de ataque e rolagens de dano contra oponentes caídos, desprevenidos, flanqueados ou indefesos."
  },
  {
    "id": "lutador_voadora",
    "name": "Voadora",
    "classId": "lutador",
    "className": "Lutador",
    "description": "Quando faz uma investida desarmada, você pode gastar 2 PM. Se fizer isso, recebe +1d6 no dano para cada 3m que se deslocar até chegar ao oponente, limitado pelo seu nível."
  },
  {
    "id": "lutador_golpe_imprudente",
    "name": "Golpe Imprudente",
    "classId": "lutador",
    "className": "Lutador",
    "description": "Quando usa Golpe Relâmpago, você pode atacar de forma impulsiva. Se fizer isso, seus ataques desarmados recebem um dado de dano extra do mesmo tipo (por exemplo, se o seu dano é 2d6, você causa 3d6), mas você sofre –5 na Defesa até o início de seu próximo turno."
  },
  {
    "id": "lutador_imobilizacao",
    "name": "Imobilização",
    "classId": "lutador",
    "className": "Lutador",
    "description": "Se estiver agarrando uma criatura, você pode gastar uma ação completa para imobilizá-la. Faça um teste de manobra contra ela. Se você passar, imobiliza a criatura — ela fica indefesa e não pode realizar nenhuma ação, exceto tentar se soltar (o que exige um teste de manobra). Se a criatura se soltar da imobilização, ainda fica agarrada. Enquanto estiver imobilizando uma criatura, você sofre as penalidades de agarrar.",
    "prerequisites": "Chave, 8º nível de lutador"
  },
  {
    "id": "lutador_lingua_dos_becos",
    "name": "Língua dos Becos",
    "classId": "lutador",
    "className": "Lutador",
    "description": "Quando faz um teste de perícia baseada em Carisma, você pode pagar 1 PM para usar sua Força no lugar deste atributo.",
    "prerequisites": "For 1, treinado em Intimidação"
  },
  {
    "id": "lutador_lutador_de_chao",
    "name": "Lutador de Chão",
    "classId": "lutador",
    "className": "Lutador",
    "description": "Você recebe +2 em testes de ataque para agarrar e derrubar. Quando agarra uma criatura, pode gastar 1 PM para fazer uma manobra derrubar contra ela como uma ação livre."
  },
  {
    "id": "lutador_nome_na_arena",
    "name": "Nome na Arena",
    "classId": "lutador",
    "className": "Lutador",
    "description": "Você construiu uma reputação no circuito de lutas de Arton. Uma vez por cena, pode gastar uma ação completa para fazer um teste de Luta (CD 10) e impressionar os presentes. Se passar, você recebe +2 em todos os seus testes de perícias originalmente baseadas em Carisma até o fim da cena e a atitude de qualquer pessoa que seja fã de lutas aumenta em uma categoria em relação a você (veja a página 259). Esse bônus aumenta em +2 para cada 10 pontos pelos quais o resultado do teste exceder a CD (+4 para um resultado 20, +6 para 30 e assim por diante).",
    "prerequisites": "11º nível de lutador"
  },
  {
    "id": "lutador_punhos_de_adamante",
    "name": "Punhos de Adamante",
    "classId": "lutador",
    "className": "Lutador",
    "description": "Seus ataques desarmados ignoram 10 pontos de redução de dano do alvo, se houver.",
    "prerequisites": "8º nível de lutador"
  },
  {
    "id": "lutador_rasteira",
    "name": "Rasteira",
    "classId": "lutador",
    "className": "Lutador",
    "description": "Quando faz um ataque desarmado contra uma criatura até uma categoria de tamanho maior que a sua, você pode gastar 2 PM. Se fizer isso e acertar o ataque, a criatura fica caída."
  },
  {
    "id": "lutador_sarado",
    "name": "Sarado",
    "classId": "lutador",
    "className": "Lutador",
    "description": "Você soma sua Força no seu total de pontos de vida e em Fortitude. Você pode usar Força em vez de Carisma em testes de Diplomacia com pessoas que se atraiam por físicos bem definidos.",
    "prerequisites": "For 3"
  },
  {
    "id": "lutador_sequencia_destruidora",
    "name": "Sequência Destruidora",
    "classId": "lutador",
    "className": "Lutador",
    "description": "No início do seu turno, você pode gastar 2 PM para dizer um número (no mínimo 2). Se fizer e acertar uma quantidade de"
  },
  {
    "id": "nobre_armadura_brilhante",
    "name": "Armadura Brilhante",
    "classId": "nobre",
    "className": "Nobre",
    "description": "Você pode usar seu Carisma na Defesa quando usa armadura pesada. Se fizer isso, não pode somar sua Destreza, mesmo que outras habilidades ou efeitos permitam isso.",
    "prerequisites": "8º nível de nobre"
  },
  {
    "id": "nobre_aumento_de_atributo",
    "name": "Aumento de Atributo",
    "classId": "nobre",
    "className": "Nobre",
    "description": "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
  },
  {
    "id": "nobre_autoridade_feudal",
    "name": "Autoridade Feudal",
    "classId": "nobre",
    "className": "Nobre",
    "description": "Você pode gastar uma hora e 2 PM para conclamar o povo a ajudá-lo (qualquer pessoa sem um título de nobreza ou uma posição numa igreja reconhecida pelo seu reino). Em termos de jogo, essas pessoas contam como um parceiro iniciante de um tipo a sua escolha (aprovado pelo mestre) que lhe acompanha até o fim da aventura. Esta habilidade só pode ser usada em locais onde sua posição carregue alguma influência (a critério do mestre).",
    "prerequisites": "6º nível de nobre"
  },
  {
    "id": "nobre_educacao_privilegiada",
    "name": "Educação Privilegiada",
    "classId": "nobre",
    "className": "Nobre",
    "description": "Você se torna treinado em duas perícias de nobre a sua escolha."
  },
  {
    "id": "nobre_estrategista",
    "name": "Estrategista",
    "classId": "nobre",
    "className": "Nobre",
    "description": "Você pode direcionar aliados em alcance curto. Gaste uma ação padrão e 1 PM por aliado que quiser direcionar (limitado pelo seu Carisma). No próximo turno do aliado, ele ganha uma ação de movimento.",
    "prerequisites": "Int 1, treinado em Guerra, 6º nível de nobre"
  },
  {
    "id": "nobre_favor",
    "name": "Favor",
    "classId": "nobre",
    "className": "Nobre",
    "description": "Você pode usar sua influência para pedir favores a pessoas poderosas. Isso gasta 5 PM e uma hora de conversa e bajulação, ou mais, de acordo com o mestre, e funciona como o uso persuasão de Diplomacia (veja a página 118). Porém, você pode pedir favores ainda mais caros, difíceis ou perigosos — um convite para uma festa particular, uma carona de barco até Galrasia ou mesmo acesso aos planos militares do reino. Se você falhar, não pode pedir o mesmo favor por pelo menos uma semana."
  },
  {
    "id": "nobre_general",
    "name": "General",
    "classId": "nobre",
    "className": "Nobre",
    "description": "Quando você usa o poder Estrategista, aliados direcionados recebem 1d4 PM temporários. Esses PM duram até o fim do turno do aliado e não podem ser usados em efeitos que concedam PM.",
    "prerequisites": "Estrategista, 12º nível de nobre"
  },
  {
    "id": "nobre_grito_tiranico",
    "name": "Grito Tirânico",
    "classId": "nobre",
    "className": "Nobre",
    "description": "Você pode usar Palavras Afiadas como uma ação completa, em vez de padrão. Se fizer isso, seus dados de dano aumentam para d8 e você atinge todos os inimigos em alcance curto.",
    "prerequisites": "8º nível de nobre"
  },
  {
    "id": "nobre_inspirar_confianca",
    "name": "Inspirar Confiança",
    "classId": "nobre",
    "className": "Nobre",
    "description": "Sua presença faz as pessoas darem o melhor de si. Quando um aliado em alcance curto faz um teste, você pode gastar 2 PM para fazer com que ele possa rolar esse teste novamente."
  },
  {
    "id": "nobre_inspirar_gloria",
    "name": "Inspirar Glória",
    "classId": "nobre",
    "className": "Nobre",
    "description": "A presença de um nobre motiva as pessoas a realizarem grandes façanhas. Uma vez por rodada, você pode gastar 5 PM para fazer um aliado em alcance curto ganhar uma ação padrão adicional no próximo turno dele. Você só pode usar esta habilidade uma vez por cena em cada aliado.",
    "prerequisites": "Inspirar Confiança, 8º nível de nobre"
  },
  {
    "id": "nobre_jogo_da_corte",
    "name": "Jogo da Corte",
    "classId": "nobre",
    "className": "Nobre",
    "description": "Quando faz um teste de Diplomacia, Intuição ou Nobreza, você pode gastar 1 PM para rolá-lo novamente."
  },
  {
    "id": "nobre_liderar_pelo_exemplo",
    "name": "Liderar pelo Exemplo",
    "classId": "nobre",
    "className": "Nobre",
    "description": "Você pode gastar 2 PM para servir de inspiração. Até o início de seu próximo turno, sempre que você passar em um teste de perícia, aliados em alcance curto que fizerem um teste da mesma perícia podem usar o resultado do seu teste em vez de fazer o seu próprio.",
    "prerequisites": "6º nível de nobre"
  },
  {
    "id": "nobre_lingua_de_ouro",
    "name": "Língua de Ouro",
    "classId": "nobre",
    "className": "Nobre",
    "description": "Você pode gastar uma ação padrão e 4 PM para gerar o efeito da magia Enfeitiçar com os aprimoramentos de sugerir ação e afetar todas as criaturas dentro do alcance (CD Car). Esta não é uma habilidade mágica e provém de sua capacidade de influenciar outras pessoas.",
    "prerequisites": "Língua de Prata, 8º nível de nobre"
  },
  {
    "id": "nobre_lingua_de_prata",
    "name": "Língua de Prata",
    "classId": "nobre",
    "className": "Nobre",
    "description": "Quando faz um teste de perícia baseada em Carisma, você pode gastar 2 PM para receber um bônus no teste igual a metade do seu nível."
  },
  {
    "id": "nobre_lingua_rapida",
    "name": "Língua Rápida",
    "classId": "nobre",
    "className": "Nobre",
    "description": "Quando faz um teste de Diplomacia para mudar atitude como uma ação completa, você sofre uma penalidade de –5, em vez de –10."
  },
  {
    "id": "nobre_presenca_majestosa",
    "name": "Presença Majestosa",
    "classId": "nobre",
    "className": "Nobre",
    "description": "Sua Presença Aristocrática passa a funcionar contra qualquer criatura com valor de Inteligência (passa a afetar até mesmo animais, embora continue não funcionando contra criaturas sem Int). Além disso, você pode usá-la mais de uma vez contra uma mesma criatura na mesma cena.",
    "prerequisites": "16º nível de nobre"
  },
  {
    "id": "nobre_titulo",
    "name": "Título",
    "classId": "nobre",
    "className": "Nobre",
    "description": "Você adquire um título de nobreza. Converse com o mestre para definir os benefícios exatos de seu título. Como regra geral, no início de cada aventura você recebe 20 TO por nível de nobre (rendimentos dos impostos) ou a ajuda de um parceiro veterano (um membro de sua corte).",
    "prerequisites": "Autoridade Feudal, 10º nível de nobre, ter conquistado terras ou realizado um serviço para um nobre que possa se tornar seu suserano"
  },
  {
    "id": "nobre_voz_poderosa",
    "name": "Voz Poderosa",
    "classId": "nobre",
    "className": "Nobre",
    "description": "Você recebe +2 em Diplomacia e Intimidação. Suas habilidades de nobre com alcance curto passam para alcance médio."
  },
  {
    "id": "paladino_arma_sagrada",
    "name": "Arma Sagrada",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Quando usa Golpe Divino para atacar com a arma preferida de sua divindade, o dado de dano que você rola por Golpe Divino aumenta para d12.",
    "prerequisites": "devoto de uma divindade (exceto Lena e Marah)"
  },
  {
    "id": "paladino_aumento_de_atributo",
    "name": "Aumento de Atributo",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
  },
  {
    "id": "paladino_aura_antimagia",
    "name": "Aura Antimagia",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Enquanto sua aura estiver ativa, você e os aliados dentro da aura podem rolar novamente qualquer teste de resistência contra magia recém realizado.",
    "prerequisites": "14° nível de paladino"
  },
  {
    "id": "paladino_julgamento_divino_salvacao",
    "name": "Julgamento Divino: Salvação",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Você pode gastar 2 PM para marcar um inimigo em alcance curto. Até o fim da cena, quando você acerta um ataque corpo a corpo nesse inimigo, recupera 5 pontos de vida."
  },
  {
    "id": "paladino_julgamento_divino_vindicacao",
    "name": "Julgamento Divino: Vindicação",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Você pode gastar 2 PM para marcar um inimigo que tenha causado dano a você ou a seus aliados na cena. Você recebe +1 em testes de ataque e +1d8 em rolagens de dano contra o inimigo escolhido, mas sofre –5 em testes de ataque contra quaisquer outros alvos. No 5º nível, e a cada cinco níveis seguintes, você pode pagar +1 PM para aumentar o bônus de ataque em +1 e o bônus de dano em +1d8. O efeito termina caso o alvo fique inconsciente."
  },
  {
    "id": "paladino_julgamento_divino_zelo",
    "name": "Julgamento Divino: Zelo",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Você pode gastar 1 PM para marcar um alvo em alcance longo. Pelo restante da cena, sempre que se mover na direção desse alvo, você se move com o dobro de seu deslocamento."
  },
  {
    "id": "paladino_orar",
    "name": "Orar",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Você aprende e pode lançar uma magia divina de 1º círculo a sua escolha. Seu atributo-chave para esta magia é Sabedoria. Você pode escolher este poder quantas vezes quiser."
  },
  {
    "id": "paladino_virtude_paladinesca_caridade",
    "name": "Virtude Paladinesca: Caridade",
    "classId": "paladino",
    "className": "Paladino",
    "description": "O custo de suas habilidades de paladino que tenham um aliado como alvo é reduzido em –1 PM."
  },
  {
    "id": "paladino_virtude_paladinesca_castidade",
    "name": "Virtude Paladinesca: Castidade",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Você se torna imune a efeitos de encantamento e recebe +5 em testes de Intuição para perceber blefes."
  },
  {
    "id": "paladino_virtude_paladinesca_compaixao",
    "name": "Virtude Paladinesca: Compaixão",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Você pode usar Cura pelas Mãos em alcance curto e, para cada PM que gastar, cura 2d6+1 (em vez de 1d8+1)."
  },
  {
    "id": "paladino_virtude_paladinesca_humildade",
    "name": "Virtude Paladinesca: Humildade",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Na primeira rodada de um combate, você pode gastar uma ação completa para rezar e pedir orientação. Você recebe uma quantidade de PM temporários igual ao seu Carisma (duram até o fim da cena)."
  },
  {
    "id": "paladino_aura_ardente",
    "name": "Aura Ardente",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Enquanto sua aura estiver ativa, no início de cada um de seus turnos, espíritos e mortos-vivos a sua escolha dentro dela sofrem dano de luz igual a 5 + seu Carisma.",
    "prerequisites": "10° nível de paladino"
  },
  {
    "id": "paladino_aura_de_cura",
    "name": "Aura de Cura",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Enquanto sua aura estiver ativa, no início de seus turnos, você e os aliados a sua escolha dentro dela curam um número de PV igual a 5 + seu Carisma.",
    "prerequisites": "6° nível de paladino"
  },
  {
    "id": "paladino_aura_de_invencibilidade",
    "name": "Aura de Invencibilidade",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Enquanto sua aura estiver ativa, você ignora o primeiro dano que sofrer na cena. O mesmo se aplica a seus aliados dentro da aura.",
    "prerequisites": "18° nível de paladino"
  },
  {
    "id": "paladino_aura_poderosa",
    "name": "Aura Poderosa",
    "classId": "paladino",
    "className": "Paladino",
    "description": "O raio da sua aura aumenta para 30m.",
    "prerequisites": "6° nível de paladino"
  },
  {
    "id": "paladino_fulgor_divino",
    "name": "Fulgor Divino",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Quando usa Golpe Divino, todos os inimigos em alcance curto ficam ofuscados até o início do seu próximo turno."
  },
  {
    "id": "paladino_julgamento_divino_arrependimento",
    "name": "Julgamento Divino: Arrependimento",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Você pode gastar 2 PM para marcar um inimigo em alcance curto. Na próxima vez que esse inimigo acertar um ataque em você ou em um de seus aliados, deve fazer um teste de Vontade (CD Car). Se falhar, fica atordoado no próximo turno dele (apenas uma vez por cena)."
  },
  {
    "id": "paladino_julgamento_divino_autoridade",
    "name": "Julgamento Divino: Autoridade",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Você pode gastar 1 PM para comandar uma criatura em alcance curto. Faça um teste de Diplomacia oposto pelo teste de Vontade do alvo. Se você vencer, ele obedece a um comando simples, como “pare” ou “largue a arma” (apenas uma vez por cena). Mental."
  },
  {
    "id": "paladino_julgamento_divino_coragem",
    "name": "Julgamento Divino: Coragem",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Você pode gastar 2 PM para inspirar coragem em uma criatura em alcance curto, incluindo você mesmo. A criatura fica imune a efeitos de medo e recebe +2 em testes de ataque contra o inimigo com maior ND na cena."
  },
  {
    "id": "paladino_julgamento_divino_iluminacao",
    "name": "Julgamento Divino: Iluminação",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Você pode marcar um inimigo em alcance curto. Quando acerta um ataque corpo a corpo nesse inimigo, você recebe 2 PM temporários. Você só pode proferir este julgamento uma vez por cena."
  },
  {
    "id": "paladino_julgamento_divino_justica",
    "name": "Julgamento Divino: Justiça",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Você pode gastar 2 PM para marcar um inimigo em alcance curto. A próxima vez que esse inimigo causar dano em você ou em um de seus aliados, deve fazer um teste de Vontade (CD Car). Se falhar, sofre dano de luz igual à metade do dano que causou."
  },
  {
    "id": "paladino_julgamento_divino_libertacao",
    "name": "Julgamento Divino: Libertação",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Você pode gastar 5 PM para cancelar uma condição negativa qualquer (como abalado, paralisado etc.) que esteja afetando uma criatura em alcance curto. Julgamentos Divinos Alguns poderes do paladino são Julgamentos Divinos. Esses poderes compartilham as seguintes regras."
  },
  {
    "id": "paladino_virtude_paladinesca_temperanca",
    "name": "Virtude Paladinesca: Temperança",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Quando ingere um alimento, item alquímico ou poção, você consome apenas metade do item. Na prática, cada item desses rende duas “doses” para você."
  },
  {
    "id": "paladino_egide_sagrada",
    "name": "Égide Sagrada",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Você pode gastar uma ação de movimento e 2 PM para recobrir de energia seu escudo ou símbolo sagrado. Até o fim da cena, você e todos os aliados adjacentes somam seu Carisma na Defesa (cumulativo com outros efeitos). A partir do 11º nível, quando faz um teste de resistência contra uma magia lançada contra você, você pode gastar 5 PM para rolá-lo novamente. Se você passar no teste de resistência e a magia tiver você como único alvo, ela é revertida de volta ao conjurador (que se torna o novo alvo da magia; todas as demais características da magia, incluindo CD do teste de resistência, se mantêm)."
  },
  {
    "id": "paladino_montaria_sagrada",
    "name": "Montaria Sagrada",
    "classId": "paladino",
    "className": "Paladino",
    "description": "Você pode gastar uma ação de movimento e 2 PM para invocar uma montaria sagrada. Veja o quadro para mais detalhes."
  }
];
