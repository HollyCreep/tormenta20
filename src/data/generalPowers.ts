import { GeneralPower } from '../types/rules';

export const GENERAL_POWERS_LIST: GeneralPower[] = [
  {
    "id": "combate_poderes_que_melhoram_caracteristi",
    "name": "Combate. Poderes que melhoram característi-",
    "category": "combate",
    "description": "cas relacionadas a combate."
  },
  {
    "id": "destino_poderes_que_melhoram_caracteristi",
    "name": "Destino. Poderes que melhoram característi-",
    "category": "combate",
    "description": "cas não relacionadas a combate."
  },
  {
    "id": "voce_pode_empunhar_duas_armas_de_uma_mao",
    "name": "Você pode empunhar duas armas de uma mão",
    "category": "combate",
    "description": "com o poder Estilo de Duas Armas.",
    "prerequisites": "Estilo de Duas Armas. Arremesso Potente"
  },
  {
    "id": "quando_usa_uma_arma_de_arremesso_voce_pode",
    "name": "Quando usa uma arma de arremesso, você pode",
    "category": "combate",
    "description": "usar sua Força em vez de Destreza nos testes de ataque. Se você possuir o poder Ataque Poderoso, poderá usá-lo com armas de arremesso.",
    "prerequisites": "For 1, Estilo de Arremesso."
  },
  {
    "id": "uma_vez_por_rodada_quando_faz_um_ataque_com",
    "name": "Uma vez por rodada, quando faz um ataque com",
    "category": "combate",
    "description": "uma arma de arremesso, você pode gastar 1 PM para fazer um ataque adicional contra o mesmo alvo, ar- remessando outra arma de arremesso.",
    "prerequisites": "Des 1, Estilo de Arremesso. Ataque com Escudo"
  },
  {
    "id": "uma_vez_por_rodada_se_estiver_empunhando_um",
    "name": "Uma vez por rodada, se estiver empunhando um",
    "category": "combate",
    "description": "escudo e fizer a ação agredir, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com o escu- do. Este ataque não faz você perder o bônus do escudo na Defesa.",
    "prerequisites": "Estilo de Arma e Escudo. Ataque Pesado"
  },
  {
    "id": "quando_faz_um_ataque_corpo_a_corpo_com_uma",
    "name": "Quando faz um ataque corpo a corpo com uma",
    "category": "combate",
    "description": "arma de duas mãos, você pode pagar 1 PM. Se fizer isso e acertar o ataque, além do dano você faz uma manobra derrubar ou empurrar contra o alvo como uma ação livre (use o resultado do ataque como o teste de manobra).",
    "prerequisites": "Estilo de Duas Mãos. Ataque Poderoso"
  },
  {
    "id": "sempre_que_faz_um_ataque_corpo_a_corpo_voce",
    "name": "Sempre que faz um ataque corpo a corpo, você",
    "category": "combate",
    "description": "pode sofrer -2 no teste de ataque para receber +5 na rolagem de dano.",
    "prerequisites": "For 1. Ataque Preciso"
  },
  {
    "id": "se_estiver_empunhando_uma_arma_corpo_a_corpo",
    "name": "Se estiver empunhando uma arma corpo a corpo",
    "category": "combate",
    "description": "em uma das mãos e nada na outra, você recebe +2 na margem de ameaça e +1 no multiplicador de crítico com ela.",
    "prerequisites": "Estilo de Uma Arma. Bloqueio com Escudo"
  },
  {
    "id": "quando_faz_uma_investida_montada_voce_causa",
    "name": "Quando faz uma investida montada, você causa",
    "category": "combate",
    "description": "+2d8 pontos de dano. Além disso, pode continuar se movendo depois do ataque. Você deve se mover em linha reta e seu movimento máximo ainda é o dobro do seu deslocamento.",
    "prerequisites": "Ginete."
  },
  {
    "id": "voce_recebe_2_em_testes_de_ataque_para_der",
    "name": "Você recebe +2 em testes de ataque para der-",
    "category": "combate",
    "description": "rubar. Quando derruba uma criatura com essa ma- nobra, pode gastar 1 PM para fazer um ataque extra contra ela.",
    "prerequisites": "Combate Defensivo. Desarmar Aprimorado"
  },
  {
    "id": "se_estiver_empunhando_uma_arma_de_disparo",
    "name": "Se estiver empunhando uma arma de disparo",
    "category": "combate",
    "description": "que possa recarregar como ação livre e gastar uma ação completa para agredir, pode fazer um ataque adicional com ela. Se fizer isso, sofre -2 em todos os testes de ataque até o seu próximo turno. Pré-requi- sitos: Des 1, Estilo de Disparo. Empunhadura Poderosa"
  },
  {
    "id": "se_estiver_usando_uma_armadura_pesada_voce",
    "name": "Se estiver usando uma armadura pesada, você",
    "category": "combate",
    "description": "recebe +2 na Defesa. Esse bônus aumenta em +2 para cada outro poder que você possua que tenha Encouraçado como pré-requisito.",
    "prerequisites": "profi- ciência com armaduras pesadas. Esquiva"
  },
  {
    "id": "se_voce_estiver_usando_um_escudo_o_bonus_na",
    "name": "Se você estiver usando um escudo, o bônus na",
    "category": "combate",
    "description": "Defesa que ele fornece aumenta em +2.",
    "prerequisites": "treinado em Luta, proficiência com escudos. Estilo de Arma Longa"
  },
  {
    "id": "voce_recebe_2_em_testes_de_ataque_com_armas",
    "name": "Você recebe +2 em testes de ataque com armas",
    "category": "combate",
    "description": "alongadas e pode atacar alvos adjacentes com essas armas.",
    "prerequisites": "For 1, treinado em Luta. Estilo de Arremesso"
  },
  {
    "id": "voce_pode_sacar_armas_de_arremesso_como_uma",
    "name": "Você pode sacar armas de arremesso como uma",
    "category": "combate",
    "description": "ação livre e recebe +2 nas rolagens de dano com elas. Se também possuir o poder Saque Rápido, também recebe +2 nos testes de ataque com essas armas.",
    "prerequisites": "treinado em Pontaria. Estilo de Disparo"
  },
  {
    "id": "se_estiver_usando_uma_arma_de_disparo_voce",
    "name": "Se estiver usando uma arma de disparo, você",
    "category": "combate",
    "description": "soma sua Destreza nas rolagens de dano.",
    "prerequisites": "treinado em Pontaria. Estilo de Duas Armas"
  },
  {
    "id": "se_estiver_empunhando_duas_armas_e_pelo_me",
    "name": "Se estiver empunhando duas armas (e pelo me-",
    "category": "combate",
    "description": "nos uma delas for leve) e fizer a ação agredir, você pode fazer dois ataques, um com cada arma. Se fizer isso, sofre -2 em todos os testes de ataque até o seu próximo turno. Se possuir Ambidestria, em vez disso não sofre penalidade para usá-lo.",
    "prerequisites": "Des 2, treinado em Luta."
  },
  {
    "id": "poderes_gerais_permitem_diferenciar_ainda",
    "name": "Poderes gerais permitem diferenciar ainda",
    "category": "combate",
    "description": "mais seu personagem, trazendo novas opções e estratégias. No entanto, seu uso deixa o jogo mais pesado - construir o personagem e subir de nível será mais trabalhoso."
  },
  {
    "id": "se_voce_esta_experimentando_suas",
    "name": "Se você está experimentando suas",
    "category": "combate",
    "description": "primeiras aventuras, pode ser melhor evitar poderes gerais. Suas escolhas de raça, classe e origem já oferecem um enorme número de combinações."
  },
  {
    "id": "no_entanto_se_voce_e_um_veterano_de_varias",
    "name": "No entanto, se você é um veterano de várias",
    "category": "combate",
    "description": "campanhas, talvez queira mais capacidade de personalização. Nesse caso, fique à vontade para ler esta seção e escolher os poderes que preferir - seja para melhor representar o conceito de seu herói, seja para conseguir combinações mais efetivas."
  },
  {
    "id": "acuidade_com_arma",
    "name": "Acuidade com Arma",
    "category": "combate",
    "description": "Des 1 Ataque Poderoso For 1 Quebrar Aprimorado - Trespassar - Combate Defensivo Int 1 Derrubar Aprimorado - Desarmar Aprimorado - Empunhadura Poderosa For 3 Encouraçado Armaduras pesadas Fanático 12º nível de personagem Inexpugnável 6º nível de personagem Esquiva Des 1 Estilo Desarmado Luta Estilo de Arma e Escudo Escudos Ataque com Escudo - Bloqueio com Escudo - Estilo de Arma Longa For 1, Luta Piqueiro - Estilo de Uma Arma Luta Ataque Preciso"
  },
  {
    "id": "estilo_de_duas_armas",
    "name": "Estilo de Duas Armas",
    "category": "combate",
    "description": "Des 2, Luta Arma Secundária Grande - Estilo de Duas Mãos For 2, Luta Ataque Pesado Estilo de Arremesso Pontaria Arremesso Múltiplo Des 1 Arremesso Potente For 1 Estilo de Disparo Pontaria Disparo Preciso - Mira Apurada Sab 1 Disparo Rápido Des 1 Finta Aprimorada Enganação Foco em Arma Proficiência com a arma Ginete Cavalgar Carga de Cavalaria Ginete Presença Aterradora Intimidação Proficiência - Reflexos de Combate Des 1 Saque Rápido Iniciativa Vitalidade Con 1"
  },
  {
    "id": "ao_sabor_do_destino",
    "name": "Ao Sabor do Destino",
    "category": "combate",
    "description": "6º nível de personagem"
  },
  {
    "id": "foco_em_pericia",
    "name": "Foco em Perícia",
    "category": "combate",
    "description": "Treinado na perícia escolhida"
  },
  {
    "id": "celebrar_ritual",
    "name": "Celebrar Ritual",
    "category": "combate",
    "description": "Habilidade Magias, Misticismo ou Religião, 8º nível de personagem Escrever Pergaminho Habilidade Magias, Ofício (escriba) Foco em Magia Lançar magias"
  },
  {
    "id": "medicina",
    "name": "Medicina",
    "category": "combate",
    "description": "Sab 1, treinado em Cura"
  },
  {
    "id": "parceiro",
    "name": "Parceiro",
    "category": "combate",
    "description": "Adestramento ou Diplomacia, 5º nível de personagem Sentidos Aguçados Sab 1, Percepção"
  },
  {
    "id": "magia_acelerada",
    "name": "Magia Acelerada",
    "category": "combate",
    "description": "Lançar magias de 2º círculo"
  },
  {
    "id": "preparar_pocao",
    "name": "Preparar Poção",
    "category": "combate",
    "description": "Habilidade Magias, Ofício (alquimista)"
  },
  {
    "id": "almejar_o_impossivel",
    "name": "Almejar o Impossível",
    "category": "combate",
    "description": "Devoto de Valkaria ou Thwor"
  },
  {
    "id": "ataque_piedoso",
    "name": "Ataque Piedoso",
    "category": "combate",
    "description": "Devoto de Lena ou Thyatis"
  },
  {
    "id": "aura_de_medo",
    "name": "Aura de Medo",
    "category": "combate",
    "description": "Devoto de Kallyadranoch"
  },
  {
    "id": "coragem_total",
    "name": "Coragem Total",
    "category": "combate",
    "description": "Devoto de Arsenal, Khalmyr, Lin-Wu ou Valkaria"
  },
  {
    "id": "dom_da_imortalidade",
    "name": "Dom da Imortalidade",
    "category": "combate",
    "description": "Devoto de Thyatis, paladino"
  },
  {
    "id": "dom_da_ressurreicao",
    "name": "Dom da Ressurreição",
    "category": "combate",
    "description": "Devoto de Thyatis, clérigo"
  },
  {
    "id": "escamas_draconicas",
    "name": "Escamas Dracônicas",
    "category": "combate",
    "description": "Devoto de Kallyadranoch"
  },
  {
    "id": "estase_da_loucura",
    "name": "Êstase da Loucura",
    "category": "combate",
    "description": "Devoto de Aharadak ou Nimb"
  },
  {
    "id": "olhar_amedrontador",
    "name": "Olhar Amedrontador",
    "category": "combate",
    "description": "Devoto de Megalokk ou Thwor"
  },
  {
    "id": "presas_primordiais",
    "name": "Presas Primordiais",
    "category": "combate",
    "description": "Devoto de Kallyadranoch ou Megalokk"
  },
  {
    "id": "servos_do_dragao",
    "name": "Servos do Dragão",
    "category": "combate",
    "description": "Devoto de Kallyadranoch"
  },
  {
    "id": "teurgista_mistico",
    "name": "Teurgista Místico",
    "category": "combate",
    "description": "Devoto de Wynna, habilidade de classe Magias"
  },
  {
    "id": "voce_passa_automaticamente_em_testes_de",
    "name": "Você passa automaticamente em testes de",
    "category": "combate",
    "description": "Cavalgar para não cair da montaria quando sofre dano. Além disso, não sofre penalidades para ata- car à distância ou lançar magias quando montado.",
    "prerequisites": "treinado em Cavalgar."
  },
  {
    "id": "uma_vez_por_rodada_se_estiver_empunhando",
    "name": "Uma vez por rodada, se estiver empunhando",
    "category": "combate",
    "description": "uma arma alongada e um inimigo entrar voluntaria- mente em seu alcance corpo a corpo, você pode gas- tar 1 PM para fazer um ataque corpo a corpo contra este oponente com esta arma. Se o oponente tiver se aproximado fazendo uma investida, seu ataque causa dois dados de dano extra do mesmo tipo. Pré- -requisito: Estilo de Arma Longa. Presença Aterradora"
  },
  {
    "id": "voce_pode_gastar_uma_acao_padrao_e_1_pm_para",
    "name": "Você pode gastar uma ação padrão e 1 PM para",
    "category": "combate",
    "description": "assustar todas as criaturas a sua escolha em alcance curto. Veja a perícia Intimidação para as regras de as- sustar.",
    "prerequisites": "treinado em Intimidação."
  },
  {
    "id": "se_estiver_usando_uma_arma_corpo_a_corpo_com",
    "name": "Se estiver usando uma arma corpo a corpo com",
    "category": "combate",
    "description": "as duas mãos, você recebe +5 nas rolagens de dano. Este poder não pode ser usado com armas leves.",
    "prerequisites": "For 2, Treinado em Luta. Estilo de Uma Arma"
  },
  {
    "id": "se_estiver_usando_uma_arma_corpo_a_corpo_em",
    "name": "Se estiver usando uma arma corpo a corpo em",
    "category": "combate",
    "description": "uma das mãos e nada na outra, você recebe +2 na Defesa e nos testes de ataque com essa arma (exceto ataques desarmados).",
    "prerequisites": "treinado em Luta. Estilo Desarmado"
  },
  {
    "id": "seus_ataques_desarmados_causam_1d6_pontos_de",
    "name": "Seus ataques desarmados causam 1d6 pontos de",
    "category": "combate",
    "description": "dano e podem causar dano letal ou não letal (sem pe- nalidades).",
    "prerequisites": "treinado em Luta."
  },
  {
    "id": "voce_recebe_2_em_testes_de_enganacao_para",
    "name": "Você recebe +2 em testes de Enganação para",
    "category": "combate",
    "description": "fintar e pode fintar como uma ação de movimento.",
    "prerequisites": "treinado em Enganação. Foco em Arma"
  },
  {
    "id": "legiao_aberrante",
    "name": "Legião Aberrante",
    "category": "combate",
    "description": "Três poderes da Tormenta"
  },
  {
    "id": "asas_insetoides",
    "name": "Asas Insetoides",
    "category": "combate",
    "description": "Quatro poderes da Tormenta"
  },
  {
    "id": "desprezar_a_realidade",
    "name": "Desprezar a Realidade",
    "category": "combate",
    "description": "Quatro poderes da Tormenta"
  },
  {
    "id": "membros_extras",
    "name": "Membros Extras",
    "category": "combate",
    "description": "Quatro poderes da Tormenta"
  },
  {
    "id": "escolha_uma_proficiencia_armas_marciais",
    "name": "Escolha uma proficiência: armas marciais,",
    "category": "combate",
    "description": "armas de fogo, armaduras pesadas ou escudos (se for proficiente em armas marciais, você também pode escolher armas exóticas). Você recebe essa proficiência. Você pode escolher este poder outras vezes para proficiências diferentes. Quebrar Aprimorado"
  },
  {
    "id": "voce_recebe_2_em_testes_de_ataque_para_que",
    "name": "Você recebe +2 em testes de ataque para que-",
    "category": "combate",
    "description": "brar. Quando reduz os PV de uma arma para 0 ou menos, você pode gastar 1 PM para realizar um ata- que extra contra o usuário dela. O ataque adicional usa os mesmos valores de ataque e dano, mas os dados devem ser rolados novamente.",
    "prerequisites": "Ataque Poderoso. Reflexos de Combate"
  },
  {
    "id": "voce_recebe_2_em_iniciativa_e_pode_sacar_ou",
    "name": "Você recebe +2 em Iniciativa e pode sacar ou",
    "category": "combate",
    "description": "guardar itens como uma ação livre (em vez de ação de movimento). Além disso, a ação que você gasta para recarregar armas de disparo diminui em uma categoria (ação completa para padrão, padrão para movimento, movimento para livre).",
    "prerequisites": "treinado em Iniciativa."
  },
  {
    "id": "quando_voce_faz_um",
    "name": "Quando você faz um",
    "category": "combate",
    "description": "ataque corpo a corpo e re- duz os pontos de vida do alvo para 0 ou me- nos, pode gastar 1 PM para fazer um ataque adicional contra outra cria- tura dentro do seu alcance.",
    "prerequisites": "Ataque Poderoso."
  },
  {
    "id": "voce_recebe_1",
    "name": "Você recebe +1",
    "category": "combate",
    "description": "PV por nível de perso- nagem e +2 em Fortitude. Pré-re- quisito: Con 1."
  },
  {
    "id": "cavaleiro",
    "name": "cavaleiro",
    "category": "combate",
    "description": "cavaleiro de Khalmyr de Khalmyr"
  },
  {
    "id": "confiando_em_suas_proprias_habilidades",
    "name": "Confiando em suas próprias habilidades",
    "category": "combate",
    "description": "(ou em sua própria sorte), você abre mão de usar itens mágicos. Sua autoconfiança fornece diversos benefícios, de acordo com seu nível de personagem e a tabela da página seguinte."
  },
  {
    "id": "8o",
    "name": "8º",
    "category": "destino",
    "description": "+1 nas rolagens de dano"
  },
  {
    "id": "13o",
    "name": "13º",
    "category": "destino",
    "description": "+2 nas rolagens de dano"
  },
  {
    "id": "18o",
    "name": "18º",
    "category": "destino",
    "description": "+3 nas rolagens de dano"
  },
  {
    "id": "os_bonus_nao_sao_cumulativos_os_bonus_em",
    "name": "Os bônus não são cumulativos (os bônus em",
    "category": "destino",
    "description": "atributos e perícias devem ser aplicados num atri- buto ou perícia diferente a cada vez). Se você utilizar voluntariamente qualquer item mágico (exceto poções), perde o benefício deste poder até o fim da aventura. Você ainda pode lançar magias, receber magias benéficas ou beneficiar-se de itens usados por outros - por exemplo, pode “ir de carona” em um tapete voador, mas não pode você mesmo conduzi-lo.",
    "prerequisites": "6º nível de personagem. Aparência Inofensiva"
  },
  {
    "id": "voce_pode_gastar_uma_acao_de_movimento_e_1",
    "name": "Você pode gastar uma ação de movimento e 1",
    "category": "destino",
    "description": "PM para gritar ordens para seus aliados em alcance médio. Eles recebem +1 em testes de perícia até o fim da cena.",
    "prerequisites": "Car 1. Costas Largas"
  },
  {
    "id": "voce_possui_um_parceiro_animal_ou_humanoide",
    "name": "Você possui um parceiro animal ou humanoide",
    "category": "destino",
    "description": "que o acompanha em aventuras. Escolha os detalhes dele, como nome, aparência e personalidade. Em termos de jogo, é um parceiro iniciante de um tipo a sua escolha (veja a página 260). O parceiro obedece às suas ordens e se arrisca para ajudá-lo, mas, se for maltratado, pode parar de segui-lo (de acordo com o mestre). Se perder seu parceiro, você recebe outro no início da próxima aventura.",
    "prerequisites": "treinado em Adestramento (parceiro animal) ou Diplomacia (parceiro humanoide), 5º nível de personagem. Sentidos Aguçados"
  },
  {
    "id": "voce_recebe_2_em_testes_de_pericia_e_defesa",
    "name": "Você recebe +2 em testes de perícia e Defesa",
    "category": "destino",
    "description": "quando tem a torcida a seu favor. Entenda-se por “torcida” qualquer número de criaturas inteligentes em alcance médio que não esteja realizando nenhu- ma ação além de torcer por você.",
    "prerequisites": "Car 1. Treinamento em Perícia"
  },
  {
    "id": "voce_se_torna_treinado_em_uma_pericia_a_sua",
    "name": "Você se torna treinado em uma perícia a sua",
    "category": "destino",
    "description": "escolha. Você pode escolher este poder outras vezes para perícias diferentes. Venefício"
  },
  {
    "id": "voce_recebe_1_pm_para_cada_dois_niveis_de",
    "name": "Você recebe +1 PM para cada dois níveis de",
    "category": "destino",
    "description": "personagem e +2 em Vontade.",
    "prerequisites": "Sab 1. Poderes de Magia"
  },
  {
    "id": "aumenta_o_alcance_da_magia_em_um_passo_de",
    "name": "Aumenta o alcance da magia em um passo (de",
    "category": "destino",
    "description": "curto para médio, de médio para longo) ou dobra a área de efeito da magia. Por exemplo, uma Bola de Fogo ampliada tem seu alcance aumentado para longo ou sua área aumentada para 12m de raio. Custo: +2 PM. Magia Discreta Aprimoramento"
  },
  {
    "id": "voce_soma_seu_atributo_chave_no_limite_de_pm",
    "name": "Você soma seu atributo-chave no limite de PM",
    "category": "destino",
    "description": "que pode gastar numa magia. Por exemplo, um arca- nista de 5º nível com Int 4 e este poder pode gastar até 9 PM em cada magia. Preparar Poção"
  },
  {
    "id": "voce_pode_usar_a_pericia_oficio_alquimista",
    "name": "Você pode usar a perícia Ofício (alquimista)",
    "category": "destino",
    "description": "para fabricar poções com magias que conheça de 1º e 2º círculos. Veja a página 121 para a regra de fa- bricar itens e as páginas 333 e 341 para as regras de poções.",
    "prerequisites": "habilidade de classe Magias, treinado em Ofício (alquimista)."
  },
  {
    "id": "estes_poderes_acrescentam_melhorias_as",
    "name": "Estes poderes acrescentam melhorias às",
    "category": "destino",
    "description": "magias conhecidas pelo conjurador. Eles seguem todas as regras para aprimoramentos (veja o Capítulo 4: Magia). Você pode aplicar quantos aprimoramentos quiser, desde que não ultrapasse seu limite de PM."
  },
  {
    "id": "quando_faz_um_teste_de_pericia_um_resultado",
    "name": "Quando faz um teste de perícia, um resultado",
    "category": "magia",
    "description": "de 19 ou mais no dado sempre é um sucesso, não importando o valor a ser alcançado."
  },
  {
    "id": "voce_pode_respirar_embaixo_dagua_e_adquire",
    "name": "Você pode respirar embaixo d’água e adquire",
    "category": "magia",
    "description": "deslocamento de natação igual a seu deslocamento terrestre. Apostar com o Trapaceiro Hyninn"
  },
  {
    "id": "voce_recebe_2_nas_rolagens_de_dano_com",
    "name": "Você recebe +2 nas rolagens de dano com",
    "category": "magia",
    "description": "azagaias, lanças e tridentes e seu multiplicador de crítico com essas armas aumenta em +1. Astúcia da Serpente Sszzaas"
  },
  {
    "id": "voce_recebe_2_em_enganacao_furtividade_e",
    "name": "Você recebe +2 em Enganação, Furtividade e",
    "category": "magia",
    "description": "Intuição. Ataque Piedoso Lena, Thyatis"
  },
  {
    "id": "voce_pode_gastar_2_pm_para_gerar_uma_aura_de",
    "name": "Você pode gastar 2 PM para gerar uma aura de",
    "category": "magia",
    "description": "medo de 9m de raio e duração até o fim da cena. Todos os inimigos que entrem na aura devem fazer um teste de Vontade (CD Car) ou ficam abalados até o fim da cena. Uma criatura que passe no teste de Vontade fica imune a esta habilidade por um dia. e Aura de Paz Marah"
  },
  {
    "id": "voce_recebe_2_em_sobrevivencia_e_pode_usar",
    "name": "Você recebe +2 em Sobrevivência e pode usar",
    "category": "magia",
    "description": "Sabedoria para Adestramento (em vez de Carisma). Conhecimento Enciclopédico Tanna-Toh"
  },
  {
    "id": "voce_pode_gastar_1_pm_para_invocar_uma_arma",
    "name": "Você pode gastar 1 PM para invocar uma arma",
    "category": "magia",
    "description": "corpo a corpo ou de arremesso com a qual seja pro- ficiente. A arma surge em sua mão, fornece +1 em testes de ataque e rolagens de dano, é considerada mágica e dura pela cena. Você não pode criar armas de disparo, mas pode criar 20 munições. e"
  },
  {
    "id": "voce_soma_seu_carisma_aos_pv_restaurados_por",
    "name": "Você soma seu Carisma aos PV restaurados por",
    "category": "concedido",
    "description": "seus efeitos mágicos de cura."
  },
  {
    "id": "voce_sempre_pode_escolher_10_em_testes_de",
    "name": "Você sempre pode escolher 10 em testes de",
    "category": "concedido",
    "description": "Cura. Além disso, não sofre penalidade por usar essa perícia sem uma maleta de medicamentos. Se possuir o item, recebe +2 no teste de Cura (ou +5, se ele for aprimorado)."
  },
  {
    "id": "voce_soma_sua_sabedoria_em_seus_pv_em_vez_de",
    "name": "Você soma sua Sabedoria em seus PV em vez de",
    "category": "concedido",
    "description": "Constituição, e se torna imune às condições alque- brado, esmorecido e frustrado."
  },
  {
    "id": "voce_e_imortal_sempre_que_morre_nao_impor",
    "name": "Você é imortal. Sempre que morre, não impor-",
    "category": "concedido",
    "description": "tando o motivo, volta à vida após 3d6 dias. Apenas paladinos podem escolher este poder. Um perso- nagem pode ter Dom da Imortalidade ou Dom da Ressurreição, mas não ambos. e"
  },
  {
    "id": "voce_pode_lancar_augurio_caso_aprenda_nova",
    "name": "Você pode lançar Augúrio. Caso aprenda nova-",
    "category": "concedido",
    "description": "mente essa magia, seu custo diminui em -1 PM. Você também pode gastar 2 PM para receber +2 em um teste. e Dom da Ressurreição Thyatis"
  },
  {
    "id": "quando_lanca_uma_magia_voce_recebe_um_bonus",
    "name": "Quando lança uma magia, você recebe um bônus",
    "category": "concedido",
    "description": "na Defesa igual ao círculo da magia lançada até o início do seu próximo turno. e"
  },
  {
    "id": "toda_vez_que_uma_ou_mais_criaturas_falham_em",
    "name": "Toda vez que uma ou mais criaturas falham em",
    "category": "concedido",
    "description": "um teste de Vontade contra uma de suas habilidades mágicas, você recebe 1 PM temporário cumulativo. Você pode ganhar um máximo de PM temporários por cena desta forma igual a sua Sabedoria."
  },
  {
    "id": "voce_pode_usar_sabedoria_para_guerra_em_vez",
    "name": "Você pode usar Sabedoria para Guerra (em vez",
    "category": "concedido",
    "description": "de Inteligência). Além disso, em combate, quando vai fazer um teste de perícia, você pode gastar 2 PM para substituí-lo por um teste de Guerra (exceto para testes de ataque)."
  },
  {
    "id": "voce_recebe_reducao_de_frio_e_trevas_5_alem",
    "name": "Você recebe redução de frio e trevas 5. Além",
    "category": "concedido",
    "description": "disso, quando é alvo de um ataque você pode gastar 1 PM para emitir um clarão solar que deixa o atacante ofuscado por uma rodada. Fúria Divina Thwor"
  },
  {
    "id": "voce_pode_gastar_2_pm_para_invocar_uma_furia",
    "name": "Você pode gastar 2 PM para invocar uma fúria",
    "category": "concedido",
    "description": "selvagem, tornando-se temível em combate. Até o fim da cena, você recebe +2 em testes de ataque e rolagens de dano corpo a corpo, mas não pode executar nenhuma ação que exija paciência ou concentração (como usar a perícia Furtividade ou lançar magias). Se usar este poder em conjunto com a habilidade Fúria, ela também dura uma cena (e não termina se você não atacar ou for alvo de uma ação hostil). e Golpista Divino Hyninn"
  },
  {
    "id": "voce_recebe_2_em_enganacao_jogatina_e",
    "name": "Você recebe +2 em Enganação, Jogatina e",
    "category": "concedido",
    "description": "Ladinagem. Habitante do Deserto Azgher"
  },
  {
    "id": "uma_vez_por_rodada_quando_faz_um_ataque",
    "name": "Uma vez por rodada, quando faz um ataque",
    "category": "concedido",
    "description": "corpo a corpo, você pode pagar 3 PM. Se acertar o ataque, causa dano máximo, sem necessidade de rolar dados. Liberdade Divina Valkaria"
  },
  {
    "id": "voce_pode_gastar_2_pm_para_receber_imunidade",
    "name": "Você pode gastar 2 PM para receber imunidade",
    "category": "concedido",
    "description": "a efeitos de movimento por uma rodada. e"
  },
  {
    "id": "voce_aprende_e_pode_lancar_escuridao_caso",
    "name": "Você aprende e pode lançar Escuridão. Caso",
    "category": "concedido",
    "description": "aprenda novamente essa magia, seu custo diminui em -1 PM. e Mente Analítica Tanna-Toh"
  },
  {
    "id": "voce_recebe_2_em_intuicao_investigacao_e",
    "name": "Você recebe +2 em Intuição, Investigação e",
    "category": "concedido",
    "description": "Vontade. Mente Vazia Lin-Wu"
  },
  {
    "id": "voce_recebe_2_em_iniciativa_percepcao_e",
    "name": "Você recebe +2 em Iniciativa, Percepção e",
    "category": "concedido",
    "description": "Vontade. Mestre dos Mares Oceano"
  },
  {
    "id": "voce_aprende_e_pode_lancar_amedrontar_caso",
    "name": "Você aprende e pode lançar Amedrontar. Caso",
    "category": "concedido",
    "description": "aprenda novamente essa magia, seu custo diminui em -1 PM. e Palavras de Bondade Marah"
  },
  {
    "id": "voce_aprende_e_pode_lancar_enfeiticar_caso",
    "name": "Você aprende e pode lançar Enfeitiçar. Caso",
    "category": "concedido",
    "description": "aprenda novamente essa magia, seu custo diminui em -1 PM. e Percepção Temporal Aharadak"
  },
  {
    "id": "se_passar_uma_hora_pesquisando_seus_livros_e",
    "name": "Se passar uma hora pesquisando seus livros e",
    "category": "concedido",
    "description": "anotações, você pode rolar novamente um teste de perícia baseada em Inteligência ou Sabedoria que tenha feito desde a última cena. Se tiver acesso a mais livros, você recebe um bônus no teste: +2 para uma coleção particular ou biblioteca pequena e +5 para a biblioteca de um templo ou universidade. Poder Oculto Nimb"
  },
  {
    "id": "voce_pode_gastar_uma_acao_de_movimento_e_2",
    "name": "Você pode gastar uma ação de movimento e 2",
    "category": "concedido",
    "description": "PM para invocar a força, a rapidez ou o vigor dos loucos. Role 1d6 para receber +2 em Força (1 ou 2), Destreza (3 ou 4) ou Constituição (5 ou 6) até o fim da cena. Você pode usar este poder várias vezes, mas bônus no mesmo atributo não são cumulativos. e"
  },
  {
    "id": "voce_considera_a_katana_uma_arma_simples_e",
    "name": "Você considera a katana uma arma simples e,",
    "category": "concedido",
    "description": "se for proficiente em armas marciais, recebe +1 na margem de ameaça com ela."
  },
  {
    "id": "presas",
    "name": "Presas",
    "category": "concedido",
    "description": "Primordiais\t Kallyadranoch, Megalokk"
  },
  {
    "id": "voce_pode_gastar_1_pm_para_transformar_seus",
    "name": "Você pode gastar 1 PM para transformar seus",
    "category": "concedido",
    "description": "dentes em presas afiadas até o fim da cena. Você recebe uma arma natural de mordida (dano 1d6, crítico x2, perfuração). Uma vez por rodada, quan- do usa a ação agredir com outra arma, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida. Se já possuir outro ataque natural de mordida, em vez disso, o dano desse ataque aumenta em dois passos. e"
  },
  {
    "id": "uma_vez_por_rodada_quando_um_oponente_em",
    "name": "Uma vez por rodada, quando um oponente em",
    "category": "concedido",
    "description": "alcance curto acerta um ataque em você ou em um de seus aliados, você pode gastar 2 PM para fazer este oponente repetir o ataque, escolhendo o pior entre os dois resultados."
  },
  {
    "id": "voce_recebe_resistencia_a_veneno_5_e_a_cd",
    "name": "Você recebe resistência a veneno +5 e a CD",
    "category": "concedido",
    "description": "para resistir aos seus venenos aumenta em +2."
  },
  {
    "id": "voce_recebe_1_em_acrobacia_furtividade_e",
    "name": "Você recebe +1 em Acrobacia, Furtividade e",
    "category": "concedido",
    "description": "Reflexos. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui. Asas Insetoides"
  },
  {
    "id": "voce_conhece_os_idiomas_de_todos_os_monstros",
    "name": "Você conhece os idiomas de todos os monstros",
    "category": "concedido",
    "description": "inteligentes e pode se comunicar livremente com monstros não inteligentes (Int -4 ou menor), como se estivesse sob efeito da magia Voz Divina. e"
  },
  {
    "id": "voce_pode_gastar_uma_acao_completa_e_3_pm",
    "name": "Você pode gastar uma ação completa e 3 PM",
    "category": "concedido",
    "description": "para reanimar o cadáver de uma criatura Pequena ou Média adjacente por um dia. O cadáver funciona como um parceiro iniciante de um tipo a sua es- colha entre combatente, fortão ou guardião. Além disso, quando sofre dano, você pode sacrificar esse parceiro; se fizer isso, você sofre apenas metade do dano, mas o cadáver é destruído. e Poderes da Tormenta"
  },
  {
    "id": "estes_poderes_oferecem_habilidades_ligadas",
    "name": "Estes poderes oferecem habilidades ligadas",
    "category": "concedido",
    "description": "à tempestade rubra. Quando escolhe um poder da Tormenta, você perde 1 de Carisma. Para cada dois outros poderes da Tormenta, você perde mais 1 de Carisma. Essa perda representa deformidades físicas e o desaparecimento gradual de sua própria identidade. Um personagem reduzido a menos que Car -5 torna-se um NPC sob controle do mestre. Anatomia Insana"
  },
  {
    "id": "voce_recebe_uma_arma_natural_de_mordida",
    "name": "Você recebe uma arma natural de mordida",
    "category": "tormenta",
    "description": "(dano 1d4, crítico x2, corte). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida. Desprezar a Realidade"
  },
  {
    "id": "quando_passa_em_um_teste_de_resistencia_para",
    "name": "Quando passa em um teste de resistência para",
    "category": "tormenta",
    "description": "resistir a uma habilidade mágica de um inimigo, você recebe 1 PM temporário cumulativo. Você pode ganhar um máximo de PM temporários por cena desta forma igual ao número de poderes da Tormenta que possui. Larva Explosiva"
  },
  {
    "id": "voce_recebe_visao_no_escuro_e_1_em_intimi",
    "name": "Você recebe visão no escuro e +1 em Intimi-",
    "category": "tormenta",
    "description": "dação. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui. Pele Corrompida"
  },
  {
    "id": "quando_voce_sofre_dano_por_um_ataque_corpo_a",
    "name": "Quando você sofre dano por um ataque corpo a",
    "category": "tormenta",
    "description": "corpo, o atacante sofre 1 ponto de dano de ácido por poder da Tormenta que você possui. Visco Rubro"
  }
];
