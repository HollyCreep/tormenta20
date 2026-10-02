import { GeneralPower } from '../types/rules';

/**
 * Poderes gerais — T20 JdA v1.3, Capítulo 2, págs. 124–137 (combate, destino, magia,
 * concedidos e Tormenta). Gerado por .agents/tools/gen_general_powers.py a partir do texto
 * do livro (não editar à mão). `deities`: divindades que concedem o poder (Cap. 1, págs. 96–105).
 */
export const GENERAL_POWERS_LIST: GeneralPower[] = [
  {
    "id": "acuidade_com_arma",
    "name": "Acuidade com Arma",
    "category": "combate",
    "description": "Quando usa uma arma corpo a corpo leve ou uma arma de arremesso, você pode usar sua Destreza em vez de Força nos testes de ataque e rolagens de dano.",
    "prerequisites": "Des 1",
    "page": 124
  },
  {
    "id": "arma_secundaria_grande",
    "name": "Arma Secundária Grande",
    "category": "combate",
    "description": "Você pode empunhar duas armas de uma mão com o poder Estilo de Duas Armas.",
    "prerequisites": "Estilo de Duas Armas",
    "page": 124
  },
  {
    "id": "arremesso_potente",
    "name": "Arremesso Potente",
    "category": "combate",
    "description": "Quando usa uma arma de arremesso, você pode usar sua Força em vez de Destreza nos testes de ataque. Se você possuir o poder Ataque Poderoso, poderá usá-lo com armas de arremesso.",
    "prerequisites": "For 1, Estilo de Arremesso",
    "page": 124
  },
  {
    "id": "arremesso_multiplo",
    "name": "Arremesso Múltiplo",
    "category": "combate",
    "description": "Uma vez por rodada, quando faz um ataque com uma arma de arremesso, você pode gastar 1 PM para fazer um ataque adicional contra o mesmo alvo, arremessando outra arma de arremesso.",
    "prerequisites": "Des 1, Estilo de Arremesso",
    "page": 124
  },
  {
    "id": "ataque_com_escudo",
    "name": "Ataque com Escudo",
    "category": "combate",
    "description": "Uma vez por rodada, se estiver empunhando um escudo e fizer a ação agredir, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com o escudo. Este ataque não faz você perder o bônus do escudo na Defesa.",
    "prerequisites": "Estilo de Arma e Escudo",
    "page": 124
  },
  {
    "id": "ataque_pesado",
    "name": "Ataque Pesado",
    "category": "combate",
    "description": "Quando faz um ataque corpo a corpo com uma arma de duas mãos, você pode pagar 1 PM. Se fizer isso e acertar o ataque, além do dano você faz uma manobra derrubar ou empurrar contra o alvo como uma ação livre (use o resultado do ataque como o teste de manobra).",
    "prerequisites": "Estilo de Duas Mãos",
    "page": 124
  },
  {
    "id": "ataque_poderoso",
    "name": "Ataque Poderoso",
    "category": "combate",
    "description": "Sempre que faz um ataque corpo a corpo, você pode sofrer –2 no teste de ataque para receber +5 na rolagem de dano.",
    "prerequisites": "For 1",
    "page": 124
  },
  {
    "id": "ataque_preciso",
    "name": "Ataque Preciso",
    "category": "combate",
    "description": "Se estiver empunhando uma arma corpo a corpo em uma das mãos e nada na outra, você recebe +2 na margem de ameaça e +1 no multiplicador de crítico com ela.",
    "prerequisites": "Estilo de Uma Arma",
    "page": 124
  },
  {
    "id": "bloqueio_com_escudo",
    "name": "Bloqueio com Escudo",
    "category": "combate",
    "description": "Quando sofre dano, você pode gastar 1 PM para receber redução de dano igual ao bônus na Defesa que seu escudo fornece contra este dano. Você só pode usar este poder se estiver usando um escudo.",
    "prerequisites": "Estilo de Arma e Escudo",
    "page": 124
  },
  {
    "id": "carga_de_cavalaria",
    "name": "Carga de Cavalaria",
    "category": "combate",
    "description": "Quando faz uma investida montada, você causa +2d8 pontos de dano. Além disso, pode continuar se movendo depois do ataque. Você deve se mover em linha reta e seu movimento máximo ainda é o dobro do seu deslocamento.",
    "prerequisites": "Ginete",
    "page": 124
  },
  {
    "id": "combate_defensivo",
    "name": "Combate Defensivo",
    "category": "combate",
    "description": "Quando usa a ação agredir, você pode usar este poder. Se fizer isso, até seu próximo turno, sofre –2 em todos os testes de ataque, mas recebe +5 na Defesa.",
    "prerequisites": "Int 1",
    "page": 125
  },
  {
    "id": "derrubar_aprimorado",
    "name": "Derrubar Aprimorado",
    "category": "combate",
    "description": "Você recebe +2 em testes de ataque para derrubar. Quando derruba uma criatura com essa manobra, pode gastar 1 PM para fazer um ataque extra contra ela.",
    "prerequisites": "Combate Defensivo",
    "page": 125
  },
  {
    "id": "desarmar_aprimorado",
    "name": "Desarmar Aprimorado",
    "category": "combate",
    "description": "Você recebe +2 em testes de ataque para desarmar. Quando desarma uma criatura, pode gastar 1 PM para arremessar a arma dela para longe. Para definir onde a arma cai, role 1d8 para a direção (sendo “1” diretamente à sua frente, “2” à frente e à direita e assim por diante) e 1d6 para a distância (medida em quadrados de 1,5m a partir da criatura desarmada).",
    "prerequisites": "Combate Defensivo",
    "page": 125
  },
  {
    "id": "disparo_preciso",
    "name": "Disparo Preciso",
    "category": "combate",
    "description": "Você pode fazer ataques à distância contra oponentes envolvidos em combate corpo a corpo sem sofrer a penalidade de –5 no teste de ataque.",
    "prerequisites": "Estilo de Disparo ou Estilo de Arremesso",
    "page": 125
  },
  {
    "id": "disparo_rapido",
    "name": "Disparo Rápido",
    "category": "combate",
    "description": "Se estiver empunhando uma arma de disparo que possa recarregar como ação livre e gastar uma ação completa para agredir, pode fazer um ataque adicional com ela. Se fizer isso, sofre –2 em todos os testes de ataque até o seu próximo turno.",
    "prerequisites": "Des 1, Estilo de Disparo",
    "page": 125
  },
  {
    "id": "empunhadura_poderosa",
    "name": "Empunhadura Poderosa",
    "category": "combate",
    "description": "Ao usar uma arma feita para uma categoria de tamanho maior que a sua, a penalidade que você sofre nos testes de ataque diminui para –2 (normalmente, usar uma arma de uma categoria de tamanho maior impõe –5 nos testes de ataque).",
    "prerequisites": "For 3",
    "page": 125
  },
  {
    "id": "encouracado",
    "name": "Encouraçado",
    "category": "combate",
    "description": "Se estiver usando uma armadura pesada, você recebe +2 na Defesa. Esse bônus aumenta em +2 para cada outro poder que você possua que tenha Encouraçado como pré-requisito.",
    "prerequisites": "proficiência com armaduras pesadas",
    "page": 125
  },
  {
    "id": "esquiva",
    "name": "Esquiva",
    "category": "combate",
    "description": "Você recebe +2 na Defesa e Reflexos.",
    "prerequisites": "Des 1",
    "page": 125
  },
  {
    "id": "estilo_de_arma_e_escudo",
    "name": "Estilo de Arma e Escudo",
    "category": "combate",
    "description": "Se você estiver usando um escudo, o bônus na Defesa que ele fornece aumenta em +2.",
    "prerequisites": "treinado em Luta, proficiência com escudos",
    "page": 125
  },
  {
    "id": "estilo_de_arma_longa",
    "name": "Estilo de Arma Longa",
    "category": "combate",
    "description": "Você recebe +2 em testes de ataque com armas alongadas e pode atacar alvos adjacentes com essas armas.",
    "prerequisites": "For 1, treinado em Luta",
    "page": 125
  },
  {
    "id": "estilo_de_arremesso",
    "name": "Estilo de Arremesso",
    "category": "combate",
    "description": "Você pode sacar armas de arremesso como uma ação livre e recebe +2 nas rolagens de dano com elas. Se também possuir o poder Saque Rápido, também recebe +2 nos testes de ataque com essas armas.",
    "prerequisites": "treinado em Pontaria",
    "page": 125
  },
  {
    "id": "estilo_de_disparo",
    "name": "Estilo de Disparo",
    "category": "combate",
    "description": "Se estiver usando uma arma de disparo, você soma sua Destreza nas rolagens de dano.",
    "prerequisites": "treinado em Pontaria",
    "page": 125
  },
  {
    "id": "estilo_de_duas_armas",
    "name": "Estilo de Duas Armas",
    "category": "combate",
    "description": "Se estiver empunhando duas armas (e pelo menos uma delas for leve) e fizer a ação agredir, você pode fazer dois ataques, um com cada arma. Se fizer isso, sofre –2 em todos os testes de ataque até o seu próximo turno. Se possuir Ambidestria, em vez disso não sofre penalidade para usá-lo.",
    "prerequisites": "Des 2, treinado em Luta",
    "page": 125
  },
  {
    "id": "ginete",
    "name": "Ginete",
    "category": "combate",
    "description": "Você passa automaticamente em testes de Cavalgar para não cair da montaria quando sofre dano. Além disso, não sofre penalidades para atacar à distância ou lançar magias quando montado.",
    "prerequisites": "treinado em Cavalgar",
    "page": 128
  },
  {
    "id": "inexpugnavel",
    "name": "Inexpugnável",
    "category": "combate",
    "description": "Se estiver usando uma armadura pesada, você recebe +2 em todos os testes de resistência.",
    "prerequisites": "Encouraçado, 6º nível de personagem",
    "page": 128
  },
  {
    "id": "mira_apurada",
    "name": "Mira Apurada",
    "category": "combate",
    "description": "Quando usa a ação mirar, você recebe +2 em testes de ataque e na margem de ameaça com ataques à distância até o fim do turno.",
    "prerequisites": "Sab 1, Disparo Preciso",
    "page": 128
  },
  {
    "id": "piqueiro",
    "name": "Piqueiro",
    "category": "combate",
    "description": "Uma vez por rodada, se estiver empunhando uma arma alongada e um inimigo entrar voluntariamente em seu alcance corpo a corpo, você pode gastar 1 PM para fazer um ataque corpo a corpo contra este oponente com esta arma. Se o oponente tiver se aproximado fazendo uma investida, seu ataque causa dois dados de dano extra do mesmo tipo.",
    "prerequisites": "Estilo de Arma Longa",
    "page": 128
  },
  {
    "id": "presenca_aterradora",
    "name": "Presença Aterradora",
    "category": "combate",
    "description": "Você pode gastar uma ação padrão e 1 PM para assustar todas as criaturas a sua escolha em alcance curto. Veja a perícia Intimidação para as regras de assustar.",
    "prerequisites": "treinado em Intimidação",
    "page": 128
  },
  {
    "id": "estilo_de_duas_maos",
    "name": "Estilo de Duas Mãos",
    "category": "combate",
    "description": "Se estiver usando uma arma corpo a corpo com as duas mãos, você recebe +5 nas rolagens de dano. Este poder não pode ser usado com armas leves.",
    "prerequisites": "For 2, Treinado em Luta",
    "page": 128
  },
  {
    "id": "estilo_de_uma_arma",
    "name": "Estilo de Uma Arma",
    "category": "combate",
    "description": "Se estiver usando uma arma corpo a corpo em uma das mãos e nada na outra, você recebe +2 na Defesa e nos testes de ataque com essa arma (exceto ataques desarmados).",
    "prerequisites": "treinado em Luta",
    "page": 128
  },
  {
    "id": "estilo_desarmado",
    "name": "Estilo Desarmado",
    "category": "combate",
    "description": "Seus ataques desarmados causam 1d6 pontos de dano e podem causar dano letal ou não letal (sem penalidades).",
    "prerequisites": "treinado em Luta",
    "page": 128
  },
  {
    "id": "fanatico",
    "name": "Fanático",
    "category": "combate",
    "description": "Seu deslocamento não é reduzido por usar armaduras pesadas.",
    "prerequisites": "12º nível de personagem, Encouraçado",
    "page": 128
  },
  {
    "id": "finta_aprimorada",
    "name": "Finta Aprimorada",
    "category": "combate",
    "description": "Você recebe +2 em testes de Enganação para fintar e pode fintar como uma ação de movimento.",
    "prerequisites": "treinado em Enganação",
    "page": 128
  },
  {
    "id": "foco_em_arma",
    "name": "Foco em Arma",
    "category": "combate",
    "description": "Escolha uma arma. Você recebe +2 em testes de ataque com essa arma. Você pode escolher este poder outras vezes para armas diferentes.",
    "prerequisites": "proficiência com a arma",
    "page": 128
  },
  {
    "id": "proficiencia",
    "name": "Proficiência",
    "category": "combate",
    "description": "Escolha uma proficiência: armas marciais, armas de fogo, armaduras pesadas ou escudos (se for proficiente em armas marciais, você também pode escolher armas exóticas). Você recebe essa proficiência. Você pode escolher este poder outras vezes para proficiências diferentes.",
    "page": 129
  },
  {
    "id": "quebrar_aprimorado",
    "name": "Quebrar Aprimorado",
    "category": "combate",
    "description": "Você recebe +2 em testes de ataque para quebrar. Quando reduz os PV de uma arma para 0 ou menos, você pode gastar 1 PM para realizar um ataque extra contra o usuário dela. O ataque adicional usa os mesmos valores de ataque e dano, mas os dados devem ser rolados novamente.",
    "prerequisites": "Ataque Poderoso",
    "page": 129
  },
  {
    "id": "reflexos_de_combate",
    "name": "Reflexos de Combate",
    "category": "combate",
    "description": "Você ganha uma ação de movimento extra no seu primeiro turno de cada combate.",
    "prerequisites": "Des 1",
    "page": 129
  },
  {
    "id": "saque_rapido",
    "name": "Saque Rápido",
    "category": "combate",
    "description": "Você recebe +2 em Iniciativa e pode sacar ou guardar itens como uma ação livre (em vez de ação de movimento). Além disso, a ação que você gasta para recarregar armas de disparo diminui em uma categoria (ação completa para padrão, padrão para movimento, movimento para livre).",
    "prerequisites": "treinado em Iniciativa",
    "page": 129
  },
  {
    "id": "trespassar",
    "name": "Trespassar",
    "category": "combate",
    "description": "Quando você faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode gastar 1 PM para fazer um ataque adicional contra outra criatura dentro do seu alcance.",
    "prerequisites": "Ataque Poderoso",
    "page": 129
  },
  {
    "id": "vitalidade",
    "name": "Vitalidade",
    "category": "combate",
    "description": "Você recebe +1 PV por nível de personagem e +2 em Fortitude.",
    "prerequisites": "Con 1",
    "page": 129
  },
  {
    "id": "acrobatico",
    "name": "Acrobático",
    "category": "destino",
    "description": "Você pode usar sua Destreza em vez de Força em testes de Atletismo. Além disso, terreno difícil não reduz seu deslocamento nem o impede de realizar investidas.",
    "prerequisites": "Des 2",
    "page": 129
  },
  {
    "id": "ao_sabor_do_destino",
    "name": "Ao Sabor do Destino",
    "category": "destino",
    "description": "Confiando em suas próprias habilidades (ou em sua própria sorte), você abre mão de usar itens mágicos. Sua autoconfiança fornece diversos benefícios, de acordo com seu nível de personagem e a tabela da página seguinte. Nível Benefício 6º +2 em uma perícia 7º +1 na Defesa 8º +1 nas rolagens de dano 9º +1 em um atributo 11º +2 em uma perícia 12º +2 na Defesa 13º +2 nas rolagens de dano 14º +1 em um atributo 16º +2 em uma perícia 17º +3 na Defesa 18º +3 nas rolagens de dano 19º +1 em um atributo Os bônus não são cumulativos (os bônus em atributos e perícias devem ser aplicados num atributo ou perícia diferente a cada vez). Se você utilizar voluntariamente qualquer item mágico (exceto poções), perde o benefício deste poder até o fim da aventura. Você ainda pode lançar magias, receber magias benéficas ou beneficiar-se de itens usados por outros — por exemplo, pode “ir de carona” em um tapete voador, mas não pode você mesmo conduzi-lo.",
    "prerequisites": "6º nível de personagem",
    "page": 129
  },
  {
    "id": "aparencia_inofensiva",
    "name": "Aparência Inofensiva",
    "category": "destino",
    "description": "A primeira criatura inteligente (Int –3 ou maior) que atacar você em uma cena deve fazer um teste de Vontade (CD Car). Se falhar, perderá sua ação. Este poder só funciona uma vez por cena; independentemente de a criatura falhar ou não no teste, poderá atacá-lo nas rodadas seguintes.",
    "prerequisites": "Car 1",
    "page": 130
  },
  {
    "id": "atletico",
    "name": "Atlético",
    "category": "destino",
    "description": "Você recebe +2 em Atletismo e +3m em seu deslocamento.",
    "prerequisites": "For 2",
    "page": 130
  },
  {
    "id": "atraente",
    "name": "Atraente",
    "category": "destino",
    "description": "Você recebe +2 em testes de perícias baseadas em Carisma contra criaturas que possam se sentir fisicamente atraídas por você.",
    "prerequisites": "Car 1",
    "page": 130
  },
  {
    "id": "comandar",
    "name": "Comandar",
    "category": "destino",
    "description": "Você pode gastar uma ação de movimento e 1 PM para gritar ordens para seus aliados em alcance médio. Eles recebem +1 em testes de perícia até o fim da cena.",
    "prerequisites": "Car 1",
    "page": 130
  },
  {
    "id": "costas_largas",
    "name": "Costas Largas",
    "category": "destino",
    "description": "Seu limite de carga aumenta em 5 espaços e você pode se beneficiar de um item vestido adicional.",
    "prerequisites": "Con 1, For 1",
    "page": 130
  },
  {
    "id": "foco_em_pericia",
    "name": "Foco em Perícia",
    "category": "destino",
    "description": "Escolha uma perícia. Quando faz um teste dessa perícia, você pode gastar 1 PM para rolar dois dados e usar o melhor resultado. Você pode escolher este poder outras vezes para perícias diferentes. Este poder não pode ser aplicado em Luta e Pontaria (mas veja Foco em Arma).",
    "prerequisites": "treinado na perícia escolhida",
    "page": 130
  },
  {
    "id": "inventario_organizado",
    "name": "Inventário Organizado",
    "category": "destino",
    "description": "Você soma sua Inteligência no limite de espaços que pode carregar. Para você, itens muito leves ou pequenos, que normalmente ocupam meio espaço, em vez disso ocupam 1/4 de espaço.",
    "prerequisites": "Int 1",
    "page": 130
  },
  {
    "id": "investigador",
    "name": "Investigador",
    "category": "destino",
    "description": "Você recebe +2 em Investigação e soma sua Inteligência em Intuição.",
    "prerequisites": "Int 1",
    "page": 130
  },
  {
    "id": "lobo_solitario",
    "name": "Lobo Solitário",
    "category": "destino",
    "description": "Você recebe +1 em testes de perícia e Defesa se estiver sem nenhum aliado em alcance curto. Você não sofre penalidade por usar Cura em si mesmo.",
    "page": 130
  },
  {
    "id": "medicina",
    "name": "Medicina",
    "category": "destino",
    "description": "Você pode gastar uma ação completa para fazer um teste de Cura (CD 15) em uma criatura. Se você passar, ela recupera 1d6 PV, mais 1d6 para cada 5 pontos pelos quais o resultado do teste exceder a CD (2d6 com um resultado 20, 3d6 com um resultado 25 e assim por diante). Você só pode usar este poder uma vez por dia numa mesma criatura.",
    "prerequisites": "Sab 1, treinado em Cura",
    "page": 130
  },
  {
    "id": "parceiro",
    "name": "Parceiro",
    "category": "destino",
    "description": "Você possui um parceiro animal ou humanoide que o acompanha em aventuras. Escolha os detalhes dele, como nome, aparência e personalidade. Em termos de jogo, é um parceiro iniciante de um tipo a sua escolha (veja a página 260). O parceiro obedece às suas ordens e se arrisca para ajudá-lo, mas, se for maltratado, pode parar de segui-lo (de acordo com o mestre). Se perder seu parceiro, você recebe outro no início da próxima aventura.",
    "prerequisites": "treinado em Adestramento (parceiro animal) ou Diplomacia (parceiro humanoide), 5º nível de personagem",
    "page": 130
  },
  {
    "id": "sentidos_agucados",
    "name": "Sentidos Aguçados",
    "category": "destino",
    "description": "Você recebe +2 em Percepção, não fica desprevenido contra inimigos que não possa perceber e, sempre que erra um ataque devido a camuflagem, pode rolar mais uma vez o dado da chance de falha.",
    "prerequisites": "Sab 1, treinado em Percepção",
    "page": 130
  },
  {
    "id": "sortudo",
    "name": "Sortudo",
    "category": "destino",
    "description": "Quando faz um teste, você pode gastar 3 PM para rolá-lo novamente.",
    "page": 131
  },
  {
    "id": "surto_heroico",
    "name": "Surto Heroico",
    "category": "destino",
    "description": "Uma vez por rodada, você pode gastar 5 PM para realizar uma ação padrão ou de movimento adicional.",
    "page": 131
  },
  {
    "id": "torcida",
    "name": "Torcida",
    "category": "destino",
    "description": "Você recebe +2 em testes de perícia e Defesa quando tem a torcida a seu favor. Entenda-se por “torcida” qualquer número de criaturas inteligentes em alcance médio que não esteja realizando nenhuma ação além de torcer por você.",
    "prerequisites": "Car 1",
    "page": 131
  },
  {
    "id": "treinamento_em_pericia",
    "name": "Treinamento em Perícia",
    "category": "destino",
    "description": "Você se torna treinado em uma perícia a sua escolha. Você pode escolher este poder outras vezes para perícias diferentes.",
    "page": 131
  },
  {
    "id": "veneficio",
    "name": "Venefício",
    "category": "destino",
    "description": "Quando usa um veneno, você não corre risco de se envenenar acidentalmente. Além disso, a CD para resistir aos seus venenos aumenta em +2.",
    "prerequisites": "treinado em Ofício (alquimista)",
    "page": 131
  },
  {
    "id": "vontade_de_ferro",
    "name": "Vontade de Ferro",
    "category": "destino",
    "description": "Você recebe +1 PM para cada dois níveis de personagem e +2 em Vontade.",
    "prerequisites": "Sab 1",
    "page": 131
  },
  {
    "id": "celebrar_ritual",
    "name": "Celebrar Ritual",
    "category": "magia",
    "description": "Você pode lançar magias como rituais. Isso dobra seu limite de PM, mas muda a execução para 1 hora (ou o dobro, o que for maior) e exige um gasto de T$ 10 por PM gasto (em incensos, ofe­rendas...). Assim, um arcanista de 8º nível pode lançar uma magia de 16 PM gastando T$ 160.",
    "prerequisites": "treinado em Misticismo ou Religião, 8º nível de personagem. Magias lançadas como rituais não podem ser armazenadas em itens",
    "page": 131
  },
  {
    "id": "escrever_pergaminho",
    "name": "Escrever Pergaminho",
    "category": "magia",
    "description": "Você pode usar a perícia Ofício (escriba) para fabricar pergaminhos com magias que conheça. Veja a página 121 para a regra de fabricar itens e as páginas 333 e 341 para as regras de pergaminhos. De acordo com o mestre, você pode usar objetos similares, como runas, tabuletas de argila etc.",
    "prerequisites": "habilidade de classe Magias, treinado em Ofício (escriba)",
    "page": 131
  },
  {
    "id": "foco_em_magia",
    "name": "Foco em Magia",
    "category": "magia",
    "description": "Escolha uma magia que possa lançar. Seu custo diminui em –1 PM (cumulativo com outras reduções de custo). Você pode escolher este poder outras vezes para magias diferentes.",
    "page": 131
  },
  {
    "id": "magia_acelerada",
    "name": "Magia Acelerada",
    "category": "magia",
    "description": "Aprimoramento Muda a execução da magia para ação livre. Você só pode aplicar este aprimoramento em magias com execução de movimento, padrão ou completa e só pode lançar uma magia como ação livre por rodada. Custo: +4 PM.",
    "prerequisites": "lançar magias de 2º círculo",
    "page": 131
  },
  {
    "id": "magia_ampliada",
    "name": "Magia Ampliada",
    "category": "magia",
    "description": "Aprimoramento Aumenta o alcance da magia em um passo (de curto para médio, de médio para longo) ou dobra a área de efeito da magia. Por exemplo, uma Bola de Fogo ampliada tem seu alcance aumentado para longo ou sua área aumentada para 12m de raio. Custo: +2 PM.",
    "page": 131
  },
  {
    "id": "magia_discreta",
    "name": "Magia Discreta",
    "category": "magia",
    "description": "Aprimoramento Você lança a magia sem gesticular e falar, usando apenas concentração. Isso permite lançar magias com as mãos presas, amordaçado etc. Também permite lançar magias arcanas usando armadura sem teste de Misticismo. Outros personagens só percebem que você lançou uma magia se passarem num teste de Misticismo (CD 20). Custo: +2 PM.",
    "page": 131
  },
  {
    "id": "magia_ilimitada",
    "name": "Magia Ilimitada",
    "category": "magia",
    "description": "Você soma seu atributo-chave no limite de PM que pode gastar numa magia. Por exemplo, um arcanista de 5º nível com Int 4 e este poder pode gastar até 9 PM em cada magia.",
    "page": 131
  },
  {
    "id": "preparar_pocao",
    "name": "Preparar Poção",
    "category": "magia",
    "description": "Você pode usar a perícia Ofício (alquimista) para fabricar poções com magias que conheça de 1º e 2º círculos. Veja a página 121 para a regra de fabricar itens e as páginas 333 e 341 para as regras de poções.",
    "prerequisites": "habilidade de classe Magias, treinado em Ofício (alquimista)",
    "page": 131
  },
  {
    "id": "antenas",
    "name": "Antenas",
    "category": "tormenta",
    "description": "Você recebe +1 em Iniciativa, Percepção e Vontade. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.",
    "page": 136
  },
  {
    "id": "armamento_aberrante",
    "name": "Armamento Aberrante",
    "category": "tormenta",
    "description": "Você pode gastar uma ação de movimento e 1 PM para produzir uma versão orgânica de qualquer arma corpo a corpo ou de arremesso com a qual seja proficiente — ela brota do seu braço, ombro ou costas como uma planta grotesca e então se desprende. O dano da arma aumenta em um passo para cada dois outros poderes da Tormenta que você possui. A arma dura pela cena, então se desfaz numa poça de gosma.",
    "prerequisites": "outro poder da Tormenta",
    "page": 136
  },
  {
    "id": "articulacoes_flexiveis",
    "name": "Articulações Flexíveis",
    "category": "tormenta",
    "description": "Você recebe +1 em Acrobacia, Furtividade e Reflexos. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.",
    "page": 136
  },
  {
    "id": "asas_insetoides",
    "name": "Asas Insetoides",
    "category": "tormenta",
    "description": "Você pode gastar 1 PM para receber deslocamento de voo 9m até o fim do seu turno. O deslocamento aumenta em +1,5m para cada outro poder da Tormenta que você possui.",
    "prerequisites": "quatro outros poderes da Tormenta",
    "page": 136
  },
  {
    "id": "carapaca",
    "name": "Carapaça",
    "category": "tormenta",
    "description": "Sua pele é recoberta por placas quitinosas. Você recebe +1 na Defesa. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.",
    "page": 136
  },
  {
    "id": "corpo_aberrante",
    "name": "Corpo Aberrante",
    "category": "tormenta",
    "description": "Crostas vermelhas em várias partes de seu corpo tornam seus ataques mais perigosos. Seu dano desarmado aumenta em um passo, mais um passo para cada quatro outros poderes da Tormenta que você possui.",
    "prerequisites": "outro poder da Tormenta",
    "page": 136
  },
  {
    "id": "cuspir_enxame",
    "name": "Cuspir Enxame",
    "category": "tormenta",
    "description": "Você pode gastar uma ação completa e 2 PM para criar um enxame de insetos rubros em um ponto a sua escolha em alcance curto e com duração sustentada. O enxame tem tamanho Médio e pode passar pelo espaço de outras criaturas. Uma vez por rodada, você pode gastar uma ação de movimento para mover o enxame 9m. No final do seu turno, o enxame causa 2d6 pontos de dano de ácido a qualquer criatura no espaço que ele estiver ocupando. Para cada dois outros poderes da Tormenta que possui, você pode gastar +1 PM quando usa este poder para aumentar o dano do enxame em +1d6.",
    "page": 136
  },
  {
    "id": "anatomia_insana",
    "name": "Anatomia Insana",
    "category": "tormenta",
    "description": "Você tem 25% de chance (resultado “1” em 1d4) de ignorar o dano adicional de um acerto crítico ou ataque furtivo. A chance aumenta em +25% para cada dois outros poderes da Tormenta que você possui.",
    "page": 136
  },
  {
    "id": "dentes_afiados",
    "name": "Dentes Afiados",
    "category": "tormenta",
    "description": "Você recebe uma arma natural de mordida (dano 1d4, crítico x2, corte). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida.",
    "page": 137
  },
  {
    "id": "desprezar_a_realidade",
    "name": "Desprezar a Realidade",
    "category": "tormenta",
    "description": "Você pode gastar 2 PM para ficar no limiar da realidade até o início de seu próximo turno. Nesse estado, você ignora terreno difícil e causa 20% de chance de falha em efeitos usados contra você (não apenas ataques). Para cada dois outros poderes de Tormenta que você possuir, essa chance aumenta em 5% (máximo de 50%).",
    "prerequisites": "quatro outros poderes da Tormenta",
    "page": 137
  },
  {
    "id": "empunhadura_rubra",
    "name": "Empunhadura Rubra",
    "category": "tormenta",
    "description": "Você pode gastar 1 PM para cobrir suas mãos com uma carapaça rubra. Até o final da cena, você recebe +1 em Luta. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.",
    "page": 137
  },
  {
    "id": "fome_de_mana",
    "name": "Fome de Mana",
    "category": "tormenta",
    "description": "Quando passa em um teste de resistência para resistir a uma habilidade mágica de um inimigo, você recebe 1 PM temporário cumulativo. Você pode ganhar um máximo de PM temporários por cena desta forma igual ao número de poderes da Tormenta que possui.",
    "page": 137
  },
  {
    "id": "larva_explosiva",
    "name": "Larva Explosiva",
    "category": "tormenta",
    "description": "Se uma criatura que tenha sofrido dano de sua mordida nesta cena for reduzida a 0 ou menos PV, ela explode em chuva cáustica, morrendo e causando 4d4 pontos de dano de ácido em criaturas adjacentes. Para cada dois outros poderes da Tormenta que você possui, o dano aumenta em +2d4. Você é imune a esse dano.",
    "prerequisites": "Dentes Afiados",
    "page": 137
  },
  {
    "id": "legiao_aberrante",
    "name": "Legião Aberrante",
    "category": "tormenta",
    "description": "Seu corpo se transforma em uma massa de insetos rubros. Você pode atravessar qualquer espaço por onde seja possível passar uma moeda (mas considera esses espaços como terreno difícil) e recebe +1 em testes contra manobras de combate e de resistência contra efeitos que tenham você como alvo (mas não efeitos de área). Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.",
    "prerequisites": "Anatomia Insana, três outros poderes da Tormenta",
    "page": 137
  },
  {
    "id": "maos_membranosas",
    "name": "Mãos Membranosas",
    "category": "tormenta",
    "description": "Você recebe +1 em Atletismo, Fortitude e testes de agarrar. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.",
    "page": 137
  },
  {
    "id": "membros_estendidos",
    "name": "Membros Estendidos",
    "category": "tormenta",
    "description": "Seus braços e armas naturais são grotescamente mais longos que o normal, o que aumenta seu alcance natural para ataques corpo a corpo em +1,5m. Para cada quatro outros poderes da Tormenta que você possui, esse alcance aumenta em +1,5m.",
    "page": 137
  },
  {
    "id": "membros_extras",
    "name": "Membros Extras",
    "category": "tormenta",
    "description": "Você possui duas armas naturais de patas insetoides que saem de suas costas, ombros ou flancos. Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 2 PM para fazer um ataque corpo a corpo extra com cada uma (dano 1d4, crítico x2, corte). Se possuir Ambidestria ou Estilo de Duas Armas, pode empunhar armas leves em suas patas insetoides (mas ainda precisa pagar 2 PM para atacar com elas e sofre a penalidade de –2 em todos os ataques).",
    "prerequisites": "quatro outros poderes da Tormenta",
    "page": 137
  },
  {
    "id": "mente_aberrante",
    "name": "Mente Aberrante",
    "category": "tormenta",
    "description": "Você recebe resistência a efeitos mentais +1. Além disso, sempre que precisa fazer um teste de Vontade para resistir a uma habilidade, a criatura que usou essa habilidade sofre 1d6 pontos de dano psíquico. Para cada dois outros poderes da Tormenta que você possui o bônus em testes de resistência aumenta em +1 e o dano aumenta em +1d6.",
    "page": 137
  },
  {
    "id": "olhos_vermelhos",
    "name": "Olhos Vermelhos",
    "category": "tormenta",
    "description": "Você recebe visão no escuro e +1 em Intimidação. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.",
    "page": 137
  },
  {
    "id": "pele_corrompida",
    "name": "Pele Corrompida",
    "category": "tormenta",
    "description": "Sua carne foi mesclada à matéria vermelha. Você recebe redução de ácido, eletricidade, fogo, frio, luz e trevas 2. Esta RD aumenta em +2 para cada dois outros poderes da Tormenta que você possui.",
    "page": 137
  },
  {
    "id": "sangue_acido",
    "name": "Sangue Ácido",
    "category": "tormenta",
    "description": "Quando você sofre dano por um ataque corpo a corpo, o atacante sofre 1 ponto de dano de ácido por poder da Tormenta que você possui.",
    "page": 137
  },
  {
    "id": "visco_rubro",
    "name": "Visco Rubro",
    "category": "tormenta",
    "description": "Você pode gastar 1 PM para expelir um líquido grosso e corrosivo. Até o final da cena, você recebe +1 nas rolagens de dano corpo a corpo. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.",
    "page": 137
  },
  {
    "id": "afinidade_com_a_tormenta",
    "name": "Afinidade com a Tormenta",
    "category": "concedido",
    "description": "Você recebe +10 em testes de resistência contra efeitos da Tormenta, de suas criaturas e de devotos de Aharadak. Além disso, seu primeiro poder da Tormenta não conta para perda de Carisma. Almejar o Impossível Thwor, Valkaria Quando faz um teste de perícia, um resultado de 19 ou mais no dado sempre é um sucesso, não importando o valor a ser alcançado.",
    "deities": [
      "Aharadak"
    ],
    "page": 132
  },
  {
    "id": "extase_da_loucura",
    "name": "Êxtase da Loucura",
    "category": "concedido",
    "description": "Toda vez que uma ou mais criaturas falham em um teste de Vontade contra uma de suas habilidades mágicas, você recebe 1 PM temporário cumulativo. Você pode ganhar um máximo de PM temporários por cena desta forma igual a sua Sabedoria.",
    "deities": [
      "Aharadak",
      "Nimb"
    ],
    "page": 133
  },
  {
    "id": "percepcao_temporal",
    "name": "Percepção Temporal",
    "category": "concedido",
    "description": "Você pode gastar 3 PM para somar sua Sabedoria (limitado por seu nível e não cumulativo com efeitos que somam este atributo) a seus ataques, Defesa e testes de Reflexos até o fim da cena.",
    "deities": [
      "Aharadak"
    ],
    "page": 134
  },
  {
    "id": "rejeicao_divina",
    "name": "Rejeição Divina",
    "category": "concedido",
    "description": "Você recebe resistência a magia divina +5.",
    "deities": [
      "Aharadak"
    ],
    "page": 135
  },
  {
    "id": "compreender_os_ermos",
    "name": "Compreender os Ermos",
    "category": "concedido",
    "description": "Você recebe +2 em Sobrevivência e pode usar Sabedoria para Adestramento (em vez de Carisma). Conhecimento Enciclopédico Tanna-Toh Você se torna treinado em duas perícias baseadas em Inteligência a sua escolha.",
    "deities": [
      "Allihanna"
    ],
    "page": 132
  },
  {
    "id": "dedo_verde",
    "name": "Dedo Verde",
    "category": "concedido",
    "description": "Você aprende e pode lançar Controlar Plantas. Caso aprenda novamente essa magia, seu custo diminui em –1 PM.",
    "deities": [
      "Allihanna"
    ],
    "page": 133
  },
  {
    "id": "descanso_natural",
    "name": "Descanso Natural",
    "category": "concedido",
    "description": "Para você, dormir ao relento conta como condição de descanso confortável.",
    "deities": [
      "Allihanna"
    ],
    "page": 133
  },
  {
    "id": "voz_da_natureza",
    "name": "Voz da Natureza",
    "category": "concedido",
    "description": "Você pode falar com animais (como o efeito da magia Voz Divina) e aprende e pode lançar Acalmar Animal, mas só contra animais. Caso aprenda novamente essa magia, seu custo diminui em –1 PM.",
    "deities": [
      "Allihanna"
    ],
    "page": 136
  },
  {
    "id": "conjurar_arma",
    "name": "Conjurar Arma",
    "category": "concedido",
    "description": "Você pode gastar 1 PM para invocar uma arma corpo a corpo ou de arremesso com a qual seja proficiente. A arma surge em sua mão, fornece +1 em testes de ataque e rolagens de dano, é considerada mágica e dura pela cena. Você não pode criar armas de disparo, mas pode criar 20 munições.",
    "deities": [
      "Arsenal"
    ],
    "page": 132
  },
  {
    "id": "coragem_total",
    "name": "Coragem Total",
    "category": "concedido",
    "description": "Você é imune a efeitos de medo, mágicos ou não. Este poder não elimina fobias raciais (como o medo de altura dos minotauros).",
    "deities": [
      "Arsenal",
      "Khalmyr",
      "Lin-Wu",
      "Valkaria"
    ],
    "page": 133
  },
  {
    "id": "fe_guerreira",
    "name": "Fé Guerreira",
    "category": "concedido",
    "description": "Você pode usar Sabedoria para Guerra (em vez de Inteligência). Além disso, em combate, quando vai fazer um teste de perícia, você pode gastar 2 PM para substituí-lo por um teste de Guerra (exceto para testes de ataque).",
    "deities": [
      "Arsenal"
    ],
    "page": 133
  },
  {
    "id": "sangue_de_ferro",
    "name": "Sangue de Ferro",
    "category": "concedido",
    "description": "Você pode pagar 3 PM para receber +2 em rolagens de dano e redução de dano 5 até o fim da cena.",
    "deities": [
      "Arsenal"
    ],
    "page": 135
  },
  {
    "id": "espada_solar",
    "name": "Espada Solar",
    "category": "concedido",
    "description": "Você pode gastar 1 PM para fazer uma arma corpo a corpo de corte que esteja empunhando causar +1d6 de dano por fogo até o fim da cena.",
    "deities": [
      "Azgher"
    ],
    "page": 133
  },
  {
    "id": "fulgor_solar",
    "name": "Fulgor Solar",
    "category": "concedido",
    "description": "Você recebe redução de frio e trevas 5. Além disso, quando é alvo de um ataque você pode gastar 1 PM para emitir um clarão solar que deixa o atacante ofuscado por uma rodada.",
    "deities": [
      "Azgher"
    ],
    "page": 134
  },
  {
    "id": "habitante_do_deserto",
    "name": "Habitante do Deserto",
    "category": "concedido",
    "description": "Você recebe redução de fogo 10 e pode pagar 1 PM para criar água pura e potável suficiente para um odre (ou outro recipiente pequeno).",
    "deities": [
      "Azgher"
    ],
    "page": 134
  },
  {
    "id": "inimigo_de_tenebra",
    "name": "Inimigo de Tenebra",
    "category": "concedido",
    "description": "Seus ataques e habilidades causam +1d6 pontos de dano contra mortos-vivos. Quando você usa um efeito que gera luz, o alcance da iluminação dobra.",
    "deities": [
      "Azgher"
    ],
    "page": 134
  },
  {
    "id": "apostar_com_o_trapaceiro",
    "name": "Apostar com o Trapaceiro",
    "category": "concedido",
    "description": "Quando faz um teste de perícia, você pode gastar 1 PM para apostar com Hyninn. Você e o mestre rolam 1d20, mas o mestre mantém o resultado dele em segredo. Você então escolhe entre usar seu próprio resultado ou o resultado oculto do mestre (neste caso, ele revela o resultado).",
    "deities": [
      "Hyninn"
    ],
    "page": 132
  },
  {
    "id": "farsa_do_fingidor",
    "name": "Farsa do Fingidor",
    "category": "concedido",
    "description": "Você aprende e pode lançar Criar Ilusão. Caso aprenda novamente essa magia, seu custo diminui em –1 PM.",
    "deities": [
      "Hyninn"
    ],
    "page": 133
  },
  {
    "id": "forma_de_macaco",
    "name": "Forma de Macaco",
    "category": "concedido",
    "description": "Você pode gastar uma ação completa e 2 PM para se transformar em um macaco. Você adquire tamanho Minúsculo (o que fornece +5 em Furtividade e –5 em testes de manobra) e recebe deslocamento de escalar 9m. Seu equipamento desaparece (e você perde seus benefícios) até você voltar ao normal, mas suas outras estatísticas não são alteradas. A transformação dura indefinidamente, mas termina caso você faça um ataque, lance uma magia ou sofra dano.",
    "deities": [
      "Hyninn"
    ],
    "page": 134
  },
  {
    "id": "golpista_divino",
    "name": "Golpista Divino",
    "category": "concedido",
    "description": "Você recebe +2 em Enganação, Jogatina e Ladinagem.",
    "deities": [
      "Hyninn"
    ],
    "page": 134
  },
  {
    "id": "aura_de_medo",
    "name": "Aura de Medo",
    "category": "concedido",
    "description": "Você pode gastar 2 PM para gerar uma aura de medo de 9m de raio e duração até o fim da cena. Todos os inimigos que entrem na aura devem fazer um teste de Vontade (CD Car) ou ficam abalados até o fim da cena. Uma criatura que passe no teste de Vontade fica imune a esta habilidade por um dia.",
    "deities": [
      "Kallyadranoch"
    ],
    "page": 132
  },
  {
    "id": "escamas_draconicas",
    "name": "Escamas Dracônicas",
    "category": "concedido",
    "description": "Você recebe +2 na Defesa e em Fortitude.",
    "deities": [
      "Kallyadranoch"
    ],
    "page": 133
  },
  {
    "id": "presas_primordiais",
    "name": "Presas Primordiais",
    "category": "concedido",
    "description": "Você pode gastar 1 PM para transformar seus dentes em presas afiadas até o fim da cena. Você recebe uma arma natural de mordida (dano 1d6, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir com outra arma, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida. Se já possuir outro ataque natural de mordida, em vez disso, o dano desse ataque aumenta em dois passos.",
    "deities": [
      "Kallyadranoch",
      "Megalokk"
    ],
    "page": 135
  },
  {
    "id": "servos_do_dragao",
    "name": "Servos do Dragão",
    "category": "concedido",
    "description": "Você pode gastar uma ação completa e 2 PM para invocar 2d4+1 kobolds capangas em espaços desocupados em alcance curto. Você pode gastar uma ação de movimento para fazer os kobolds andarem (eles têm deslocamento 9m) ou uma ação padrão para fazê-los causar dano a criaturas adjacentes (1d6–1 pontos de dano de perfuração cada). Os kobolds têm For –1, Des 1, Defesa 12, 1 PV e falham automaticamente em qualquer teste de resistência ou oposto. Eles desaparecem quando morrem ou no fim da cena. Os kobolds não agem sem receber uma ordem. Usos criativos para capangas fora de combate ficam a critério do mestre.",
    "deities": [
      "Kallyadranoch"
    ],
    "page": 135
  },
  {
    "id": "dom_da_verdade",
    "name": "Dom da Verdade",
    "category": "concedido",
    "description": "Você pode pagar 2 PM para receber +5 em testes de Intuição, e em testes de Percepção contra Enganação e Furtividade, até o fim da cena.",
    "deities": [
      "Khalmyr"
    ],
    "page": 133
  },
  {
    "id": "espada_justiceira",
    "name": "Espada Justiceira",
    "category": "concedido",
    "description": "Você pode gastar 1 PM para encantar sua espada (ou outra arma corpo a corpo de corte que esteja empunhando). Ela tem seu dano aumentado em um passo até o fim da cena.",
    "deities": [
      "Khalmyr"
    ],
    "page": 133
  },
  {
    "id": "reparar_injustica",
    "name": "Reparar Injustiça",
    "category": "concedido",
    "description": "Uma vez por rodada, quando um oponente em alcance curto acerta um ataque em você ou em um de seus aliados, você pode gastar 2 PM para fazer este oponente repetir o ataque, escolhendo o pior entre os dois resultados.",
    "deities": [
      "Khalmyr"
    ],
    "page": 135
  },
  {
    "id": "ataque_piedoso",
    "name": "Ataque Piedoso",
    "category": "concedido",
    "description": "Você pode usar armas corpo a corpo para causar dano não letal sem sofrer a penalidade de –5 no teste de ataque.",
    "deities": [
      "Lena",
      "Thyatis"
    ],
    "page": 132
  },
  {
    "id": "aura_restauradora",
    "name": "Aura Restauradora",
    "category": "concedido",
    "description": "Efeitos de cura usados por você e seus aliados em um raio de 9m recuperam +1 PV por dado.",
    "deities": [
      "Lena"
    ],
    "page": 132
  },
  {
    "id": "cura_gentil",
    "name": "Cura Gentil",
    "category": "concedido",
    "description": "Você soma seu Carisma aos PV restaurados por seus efeitos mágicos de cura.",
    "deities": [
      "Lena"
    ],
    "page": 133
  },
  {
    "id": "curandeira_perfeita",
    "name": "Curandeira Perfeita",
    "category": "concedido",
    "description": "Você sempre pode escolher 10 em testes de Cura. Além disso, não sofre penalidade por usar essa perícia sem uma maleta de medicamentos. Se possuir o item, recebe +2 no teste de Cura (ou +5, se ele for aprimorado).",
    "deities": [
      "Lena"
    ],
    "page": 133
  },
  {
    "id": "kiai_divino",
    "name": "Kiai Divino",
    "category": "concedido",
    "description": "Uma vez por rodada, quando faz um ataque corpo a corpo, você pode pagar 3 PM. Se acertar o ataque, causa dano máximo, sem necessidade de rolar dados.",
    "deities": [
      "Lin-Wu"
    ],
    "page": 134
  },
  {
    "id": "mente_vazia",
    "name": "Mente Vazia",
    "category": "concedido",
    "description": "Você recebe +2 em Iniciativa, Percepção e Vontade.",
    "deities": [
      "Lin-Wu"
    ],
    "page": 134
  },
  {
    "id": "tradicao_de_lin_wu",
    "name": "Tradição de Lin-Wu",
    "category": "concedido",
    "description": "Você considera a katana uma arma simples e, se for proficiente em armas marciais, recebe +1 na margem de ameaça com ela.",
    "deities": [
      "Lin-Wu"
    ],
    "page": 135
  },
  {
    "id": "aura_de_paz",
    "name": "Aura de Paz",
    "category": "concedido",
    "description": "Você pode gastar 2 PM para gerar uma aura de paz com 9m de raio e duração de uma cena. Qualquer inimigo dentro da aura que tente fazer uma ação hostil contra você deve fazer um teste de Vontade (CD Car). Se falhar, perderá sua ação. Se passar, fica imune a esta habilidade por um dia.",
    "deities": [
      "Marah"
    ],
    "page": 132
  },
  {
    "id": "dom_da_esperanca",
    "name": "Dom da Esperança",
    "category": "concedido",
    "description": "Você soma sua Sabedoria em seus PV em vez de Constituição, e se torna imune às condições alquebrado, esmorecido e frustrado.",
    "deities": [
      "Marah"
    ],
    "page": 133
  },
  {
    "id": "palavras_de_bondade",
    "name": "Palavras de Bondade",
    "category": "concedido",
    "description": "Você aprende e pode lançar Enfeitiçar. Caso aprenda novamente essa magia, seu custo diminui em –1 PM.",
    "deities": [
      "Marah"
    ],
    "page": 134
  },
  {
    "id": "talento_artistico",
    "name": "Talento Artístico",
    "category": "concedido",
    "description": "Você recebe +2 em Acrobacia, Atuação e Diplomacia.",
    "deities": [
      "Marah"
    ],
    "page": 135
  },
  {
    "id": "olhar_amedrontador",
    "name": "Olhar Amedrontador",
    "category": "concedido",
    "description": "Você aprende e pode lançar Amedrontar. Caso aprenda novamente essa magia, seu custo diminui em –1 PM.",
    "deities": [
      "Megalokk",
      "Thwor"
    ],
    "page": 134
  },
  {
    "id": "urro_divino",
    "name": "Urro Divino",
    "category": "concedido",
    "description": "Quando faz um ataque ou lança uma magia, você pode pagar 1 PM para somar sua Constituição (mínimo +1) à rolagem de dano desse ataque ou magia.",
    "deities": [
      "Megalokk"
    ],
    "page": 136
  },
  {
    "id": "voz_dos_monstros",
    "name": "Voz dos Monstros",
    "category": "concedido",
    "description": "Você conhece os idiomas de todos os monstros inteligentes e pode se comunicar livremente com monstros não inteligentes (Int –4 ou menor), como se estivesse sob efeito da magia Voz Divina.",
    "deities": [
      "Megalokk"
    ],
    "page": 136
  },
  {
    "id": "poder_oculto",
    "name": "Poder Oculto",
    "category": "concedido",
    "description": "Você pode gastar uma ação de movimento e 2 PM para invocar a força, a rapidez ou o vigor dos loucos. Role 1d6 para receber +2 em Força (1 ou 2), Destreza (3 ou 4) ou Constituição (5 ou 6) até o fim da cena. Você pode usar este poder várias vezes, mas bônus no mesmo atributo não são cumulativos.",
    "deities": [
      "Nimb"
    ],
    "page": 134
  },
  {
    "id": "sorte_dos_loucos",
    "name": "Sorte dos Loucos",
    "category": "concedido",
    "description": "Quando faz um teste, você pode pagar 1 PM para rolá-lo novamente (você pode fazer isso mais de uma vez por teste). Se ainda assim falhar, perde 1d6 PM para cada vez que utilizou este poder neste teste.",
    "deities": [
      "Nimb"
    ],
    "page": 135
  },
  {
    "id": "transmissao_da_loucura",
    "name": "Transmissão da Loucura",
    "category": "concedido",
    "description": "Você pode lançar Sussurros Insanos (CD Car). Caso aprenda novamente essa magia, seu custo diminui em –1 PM.",
    "deities": [
      "Nimb"
    ],
    "page": 135
  },
  {
    "id": "anfibio",
    "name": "Anfíbio",
    "category": "concedido",
    "description": "Você pode respirar embaixo d’água e adquire deslocamento de natação igual a seu deslocamento terrestre. Apostar com o Trapaceiro Hyninn Quando faz um teste de perícia, você pode gastar 1 PM para apostar com Hyninn. Você e o mestre rolam 1d20, mas o mestre mantém o resultado dele em segredo. Você então escolhe entre usar seu próprio resultado ou o resultado oculto do mestre (neste caso, ele revela o resultado).",
    "deities": [
      "Oceano"
    ],
    "page": 132
  },
  {
    "id": "arsenal_das_profundezas",
    "name": "Arsenal das Profundezas",
    "category": "concedido",
    "description": "Você recebe +2 nas rolagens de dano com azagaias, lanças e tridentes e seu multiplicador de crítico com essas armas aumenta em +1.",
    "deities": [
      "Oceano"
    ],
    "page": 132
  },
  {
    "id": "mestre_dos_mares",
    "name": "Mestre dos Mares",
    "category": "concedido",
    "description": "Você pode falar com animais aquáticos (como o efeito da magia Voz Divina) e aprende e pode lançar Acalmar Animal, mas só contra criaturas aquáticas. Caso aprenda novamente essa magia, seu custo diminui em –1 PM. e Olhar Amedrontador Megalokk, Thwor Você aprende e pode lançar Amedrontar. Caso aprenda novamente essa magia, seu custo diminui em –1 PM.",
    "deities": [
      "Oceano"
    ],
    "page": 134
  },
  {
    "id": "sopro_do_mar",
    "name": "Sopro do Mar",
    "category": "concedido",
    "description": "Você pode gastar uma ação padrão e 1 PM para soprar vento marinho em um cone de 6m. Criaturas na área sofrem 2d6 pontos de dano de frio (Reflexos CD Sab reduz à metade). Você pode aprender Sopro das Uivantes como uma magia divina. Se fizer isso, o custo dela diminui em –1 PM.",
    "deities": [
      "Oceano"
    ],
    "page": 135
  },
  {
    "id": "astucia_da_serpente",
    "name": "Astúcia da Serpente",
    "category": "concedido",
    "description": "Você recebe +2 em Enganação, Furtividade e Intuição.",
    "deities": [
      "Sszzaas"
    ],
    "page": 132
  },
  {
    "id": "familiar_ofidico",
    "name": "Familiar Ofídico",
    "category": "concedido",
    "description": "Você recebe um familiar cobra (veja a página 38) que não conta em seu limite de parceiros.",
    "deities": [
      "Sszzaas"
    ],
    "page": 133
  },
  {
    "id": "presas_venenosas",
    "name": "Presas Venenosas",
    "category": "concedido",
    "description": "Você pode gastar uma ação de movimento e 1 PM para envenenar uma arma corpo a corpo que esteja empunhando. Em caso de acerto, a arma causa perda de 1d12 pontos de vida. A arma permanece envenenada até atingir uma criatura ou até o fim da cena, o que acontecer primeiro.",
    "deities": [
      "Sszzaas"
    ],
    "page": 135
  },
  {
    "id": "sangue_ofidico",
    "name": "Sangue Ofídico",
    "category": "concedido",
    "description": "Você recebe resistência a veneno +5 e a CD para resistir aos seus venenos aumenta em +2.",
    "deities": [
      "Sszzaas"
    ],
    "page": 135
  },
  {
    "id": "conhecimento_enciclopedico",
    "name": "Conhecimento Enciclopédico",
    "category": "concedido",
    "description": "Você se torna treinado em duas perícias baseadas em Inteligência a sua escolha.",
    "deities": [
      "Tanna-Toh"
    ],
    "page": 132
  },
  {
    "id": "mente_analitica",
    "name": "Mente Analítica",
    "category": "concedido",
    "description": "Você recebe +2 em Intuição, Investigação e Vontade.",
    "deities": [
      "Tanna-Toh"
    ],
    "page": 134
  },
  {
    "id": "pesquisa_abencoada",
    "name": "Pesquisa Abençoada",
    "category": "concedido",
    "description": "Se passar uma hora pesquisando seus livros e anotações, você pode rolar novamente um teste de perícia baseada em Inteligência ou Sabedoria que tenha feito desde a última cena. Se tiver acesso a mais livros, você recebe um bônus no teste: +2 para uma coleção particular ou biblioteca pequena e +5 para a biblioteca de um templo ou universidade.",
    "deities": [
      "Tanna-Toh"
    ],
    "page": 134
  },
  {
    "id": "voz_da_civilizacao",
    "name": "Voz da Civilização",
    "category": "concedido",
    "description": "Você está sempre sob efeito de Compreensão.",
    "deities": [
      "Tanna-Toh"
    ],
    "page": 136
  },
  {
    "id": "caricia_sombria",
    "name": "Carícia Sombria",
    "category": "concedido",
    "description": "Você pode gastar 1 PM e uma ação padrão para cobrir sua mão com energia negativa e tocar uma criatura em alcance corpo a corpo. A criatura sofre 2d6 pontos de dano de trevas (Fortitude CD Sab reduz à metade) e você recupera PV iguais à metade do dano causado. Você pode aprender Toque Vampírico como uma magia divina. Se fizer isso, o custo dela diminui em –1 PM.",
    "deities": [
      "Tenebra"
    ],
    "page": 132
  },
  {
    "id": "manto_da_penumbra",
    "name": "Manto da Penumbra",
    "category": "concedido",
    "description": "Você aprende e pode lançar Escuridão. Caso aprenda novamente essa magia, seu custo diminui em –1 PM.",
    "deities": [
      "Tenebra"
    ],
    "page": 134
  },
  {
    "id": "visao_nas_trevas",
    "name": "Visão nas Trevas",
    "category": "concedido",
    "description": "Você enxerga perfeitamente no escuro, incluindo em magias de escuridão.",
    "deities": [
      "Tenebra"
    ],
    "page": 136
  },
  {
    "id": "zumbificar",
    "name": "Zumbificar",
    "category": "concedido",
    "description": "Você pode gastar uma ação completa e 3 PM para reanimar o cadáver de uma criatura Pequena ou Média adjacente por um dia. O cadáver funciona como um parceiro iniciante de um tipo a sua escolha entre combatente, fortão ou guardião. Além disso, quando sofre dano, você pode sacrificar esse parceiro; se fizer isso, você sofre apenas metade do dano, mas o cadáver é destruído.",
    "deities": [
      "Tenebra"
    ],
    "page": 136
  },
  {
    "id": "almejar_o_impossivel",
    "name": "Almejar o Impossível",
    "category": "concedido",
    "description": "Quando faz um teste de perícia, um resultado de 19 ou mais no dado sempre é um sucesso, não importando o valor a ser alcançado.",
    "deities": [
      "Thwor",
      "Valkaria"
    ],
    "page": 132
  },
  {
    "id": "furia_divina",
    "name": "Fúria Divina",
    "category": "concedido",
    "description": "Você pode gastar 2 PM para invocar uma fúria selvagem, tornando-se temível em combate. Até o fim da cena, você recebe +2 em testes de ataque e rolagens de dano corpo a corpo, mas não pode executar nenhuma ação que exija paciência ou concentração (como usar a perícia Furtividade ou lançar magias). Se usar este poder em conjunto com a habilidade Fúria, ela também dura uma cena (e não termina se você não atacar ou for alvo de uma ação hostil).",
    "deities": [
      "Thwor"
    ],
    "page": 134
  },
  {
    "id": "tropas_duyshidakk",
    "name": "Tropas Duyshidakk",
    "category": "concedido",
    "description": "Você pode gastar uma ação completa e 2 PM para invocar 1d4+1 goblinoides capangas em espaços desocupados em alcance curto. Você pode gastar uma ação de movimento para fazer os goblinoides andarem (eles têm deslocamento 9m) ou uma ação padrão para fazê-los causar dano a criaturas adjacentes (1d6+1 pontos de dano de corte cada). Os goblinoides têm For 1, Des 1, Defesa 15, 1 PV e falham automaticamente em qualquer teste de resistência ou oposto. Eles desaparecem quando morrem ou no fim da cena. Os goblinoides não agem sem receber uma ordem. Usos criativos para capangas fora de combate ficam a critério do mestre. e Presas Primordiais Kallyadranoch, Megalokk Você pode gastar 1 PM para transformar seus dentes em presas afiadas até o fim da cena. Você recebe uma arma natural de mordida (dano 1d6, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir com outra arma, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida. Se já possuir outro ataque natural de mordida, em vez disso, o dano desse ataque aumenta em dois passos.",
    "deities": [
      "Thwor"
    ],
    "page": 135
  },
  {
    "id": "bencao_do_mana",
    "name": "Bênção do Mana",
    "category": "concedido",
    "description": "Você recebe +1 PM a cada nível ímpar.",
    "deities": [
      "Wynna"
    ],
    "page": 132
  },
  {
    "id": "centelha_magica",
    "name": "Centelha Mágica",
    "category": "concedido",
    "description": "Escolha uma magia arcana ou divina de 1º círculo. Você aprende e pode lançar essa magia. Compreender os Ermos Allihanna Você recebe +2 em Sobrevivência e pode usar Sabedoria para Adestramento (em vez de Carisma). Conhecimento Enciclopédico Tanna-Toh Você se torna treinado em duas perícias baseadas em Inteligência a sua escolha.",
    "deities": [
      "Wynna"
    ],
    "page": 132
  },
  {
    "id": "escudo_magico",
    "name": "Escudo Mágico",
    "category": "concedido",
    "description": "Quando lança uma magia, você recebe um bônus na Defesa igual ao círculo da magia lançada até o início do seu próximo turno.",
    "deities": [
      "Wynna"
    ],
    "page": 133
  },
  {
    "id": "teurgista_mistico",
    "name": "Teurgista Místico",
    "category": "concedido",
    "description": "Até uma magia de cada círculo que você aprender poderá ser escolhida entre magias divinas (se você for um conjurador arcano) ou entre magias arcanas (se for um conjurador divino).",
    "prerequisites": "habilidade de classe Magias",
    "deities": [
      "Wynna"
    ],
    "page": 135
  },
  {
    "id": "dom_da_imortalidade",
    "name": "Dom da Imortalidade",
    "category": "concedido",
    "description": "Você é imortal. Sempre que morre, não importando o motivo, volta à vida após 3d6 dias. Apenas paladinos podem escolher este poder. Um personagem pode ter Dom da Imortalidade ou Dom da Ressurreição, mas não ambos.",
    "deities": [
      "Thyatis"
    ],
    "page": 133
  },
  {
    "id": "dom_da_profecia",
    "name": "Dom da Profecia",
    "category": "concedido",
    "description": "Você pode lançar Augúrio. Caso aprenda novamente essa magia, seu custo diminui em –1 PM. Você também pode gastar 2 PM para receber +2 em um teste.",
    "deities": [
      "Thyatis"
    ],
    "page": 133
  },
  {
    "id": "dom_da_ressurreicao",
    "name": "Dom da Ressurreição",
    "category": "concedido",
    "description": "Você pode gastar uma ação completa e todos os PM que possui (mínimo 1 PM) para tocar o corpo de uma criatura morta há menos de um ano e ressuscitá-la. A criatura volta à vida com 1 PV e 0 PM, e perde 1 ponto de Constituição permanentemente. Este poder só pode ser usado uma vez em cada criatura. Apenas clérigos podem escolher este poder. Um personagem pode ter Dom da Imortalidade ou Dom da Ressurreição, mas não ambos.",
    "deities": [
      "Thyatis"
    ],
    "page": 133
  },
  {
    "id": "armas_da_ambicao",
    "name": "Armas da Ambição",
    "category": "concedido",
    "description": "Você recebe +1 em testes de ataque e na margem de ameaça com armas nas quais é proficiente.",
    "deities": [
      "Valkaria"
    ],
    "page": 132
  },
  {
    "id": "liberdade_divina",
    "name": "Liberdade Divina",
    "category": "concedido",
    "description": "Você pode gastar 2 PM para receber imunidade a efeitos de movimento por uma rodada.",
    "deities": [
      "Valkaria"
    ],
    "page": 134
  }
];
