import { Spell } from '../types/rules';

export const SPELLS_LIST: Spell[] = [
  {
    "id": "abencoar_alimentos",
    "name": "Abençoar Alimentos",
    "circle": 1,
    "type": "divina",
    "school": "Transmutação",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "alimento para 1 criatura",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: curto; \nAlvo: alimento para 1 criatura; Dura-\nção: cena.\nVocê purifica e abençoa uma porção de \ncomida ou dose de bebida. Isso torna \num alimento sujo, estragado ou enve-\nnenado próprio para consumo. Além \ndisso, se for consumido até o final da \nduração, o alimento oferece 5 PV tem-\nporários ou 1 PM temporário (além de \nquaisquer bônus que já oferecesse). \nBônus de alimentação duram um dia e \ncada personagem só pode receber um \nbônus de alimentação por dia.",
    "upgrades": [
      {
        "cost": "Truque",
        "description": "o alimento é purificado (não \ncausa nenhum efeito nocivo se estava \nestragado ou envenenado), mas não \nfornece bônus ao ser consumido."
      },
      {
        "cost": "+1 PM",
        "description": "aumenta o número de alvos \nem"
      }
    ]
  },
  {
    "id": "acalmar_animal",
    "name": "Acalmar Animal",
    "circle": 1,
    "type": "divina",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 animal",
    "duration": "cena",
    "description": "Execução: padrão; Alcance: curto; \nAlvo: 1 animal; Duração: cena; Resis-\ntência: Vontade anula.\nO animal fica prestativo em relação a \nvocê. Ele não fica sob seu controle, mas \npercebe suas palavras e ações da manei-\nra mais favorável possível. Você recebe \n+10 nos testes de Adestramento e Di-\nplomacia que fizer contra o animal.\nUm alvo hostil ou que esteja envolvido \nem um combate recebe +5 em seu teste \nde resistência. Se você ou seus aliados \ntomarem qualquer ação hostil contra o \nalvo, a magia é dissipada e ele retorna à \natitude que tinha antes (ou piorada, de \nacordo com o mestre). Se tratar bem o \nalvo, a atitude pode permanecer mesmo \napós o término da magia.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "muda o alcance para médio."
      },
      {
        "cost": "+1 PM",
        "description": "muda o alvo para 1 monstro ou \nespírito com Inteligência -5 ou -4.\nDescrição das magias"
      },
      {
        "cost": "+2 PM",
        "description": "aumenta o número de alvos \nem"
      }
    ]
  },
  {
    "id": "adaga_mental",
    "name": "Adaga Mental",
    "circle": 1,
    "type": "arcana",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 criatura",
    "duration": "instantâ-\nnea",
    "description": "Você manifesta e dispara uma adaga \nimaterial contra a mente do alvo, que \nsofre 2d6 pontos de dano psíquico e \nfica atordoado por uma rodada. Se pas-\nsar no teste de resistência, sofre ape-\nnas metade do dano e evita a condição. \nUma criatura só pode ficar atordoada \npor esta magia uma vez por cena.",
    "resistance": "Vontade parcial",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "você lança a magia sem gesticu-\nlar ou pronunciar palavras (o que per-\nmite lançar esta magia de armadura) e \na adaga se torna invisível. Se o alvo fa-\nlhar no teste de resistência, não percebe \nque você lançou uma magia contra ele."
      },
      {
        "cost": "+2 PM",
        "description": "muda a duração para um dia. \nAlém do normal, você “finca” a adaga \nna mente do alvo. Enquanto a magia \ndurar, você sabe a direção e localização \ndo alvo, desde que ele esteja no mes-\nmo mundo."
      }
    ]
  },
  {
    "id": "alarme",
    "name": "Alarme",
    "circle": 1,
    "type": "arcana",
    "school": "Abjuração",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "esfera com 9m de raio",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: curto; \nÁrea: esfera com 9m de raio; Dura-\nção: 1 dia.\nVocê cria uma barreira protetora in-\nvisível que detecta qualquer criatura \nque tocar ou entrar na área protegida. \nAo lançar a magia, você pode escolher \nquais criaturas podem entrar na área \nsem ativar seus efeitos. Alarme pode \nemitir um aviso telepático ou sono-\nro, decidido quando a magia é lança-\nda. Um aviso telepático alerta apenas \nvocê, inclusive acordando-o se estiver \ndormindo, mas apenas se estiver a até \n1km da área protegida. Um aviso so-\nnoro alerta todas as criaturas em al-\ncance longo.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "muda o alcance para pessoal. \nA área é emanada a partir de você."
      },
      {
        "cost": "+5 PM",
        "description": "além do normal, você também \npercebe qualquer efeito de adivinhação \nque seja usado dentro da área ou atra-\nvesse a área. Você pode fazer um tes-\nte oposto de Misticismo contra quem \nusou o efeito; se passar, tem um vis-\nlumbre de seu rosto e uma ideia apro-\nximada de sua localização (“três dias \nde viagem ao norte”, por exemplo)."
      }
    ]
  },
  {
    "id": "aliado_animal",
    "name": "Aliado Animal",
    "circle": 2,
    "type": "divina",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 animal prestativo",
    "duration": "1 dia",
    "description": "Execução: padrão; Alcance: curto; \nAlvo: 1 animal prestativo; Duração: \n1 dia.\nVocê cria um vínculo mental com um \nanimal prestativo em relação a você. \nO Aliado Animal obedece a você no \nmelhor de suas capacidades, mesmo \nque isso arrisque a vida dele. Ele fun-\nciona como um parceiro veterano, de \num tipo a sua escolha entre ajudante, \ncombatente, fortão, guardião, monta-\nria ou perseguidor.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "muda o alvo para 1 animal Mi-\nnúsculo e a duração para 1 semana. Em \nvez do normal, o animal se desloca no \nmelhor de suas capacidades até um lo-\ncal designado por você - em geral, para \nlevar um item, carta ou similar. Quando \no animal chega ao destino, fica esperan-\ndo até o fim da magia, permitindo ape-\nnas que uma ou mais criaturas escolhi-\ndas por você se aproximem e peguem o \nque ele estiver carregando."
      },
      {
        "cost": "+7 PM",
        "description": "muda o parceiro para mestre. \nRequer 3º círculo."
      },
      {
        "cost": "+12 PM",
        "description": "muda o alvo para 2 animais \nprestativos. Cada animal funciona \ncomo um parceiro de um tipo diferen-\nte, e você pode receber a ajuda de am-\nbos (mas ainda precisa seguir o limite \nde parceiros de acordo com o seu ní-\nvel de personagem). Requer 4º círculo.\n178\nMagia"
      }
    ]
  },
  {
    "id": "alterar_destino",
    "name": "Alterar Destino",
    "circle": 5,
    "type": "arcana",
    "school": "Adivinhação",
    "execution": "reação",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "instantânea",
    "description": ""
  },
  {
    "id": "alterar_memoria",
    "name": "Alterar Memória",
    "circle": 4,
    "type": "arcana",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura",
    "duration": "instantânea",
    "description": "Você invade a mente do alvo e altera ou \napaga suas memórias da última hora.",
    "resistance": "Vontade anula",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "muda o alcance para pessoal e \no alvo para área cone de 4,5m."
      }
    ]
  },
  {
    "id": "alterar_tamanho",
    "name": "Alterar Tamanho",
    "circle": 2,
    "type": "arcana",
    "school": "Transmutação",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 objeto",
    "duration": "1 dia",
    "description": "Esta magia aumenta ou diminui o \ntamanho de um item mundano em \naté três categorias (um objeto Enor-\nme vira Pequeno, por exemplo). Você \ntambém pode mudar a consistência \ndo item, deixando-o rígido como pe-\ndra ou flexível como seda (isso não al-\ntera sua RD ou PV, apenas suas pro-\npriedades físicas). Se lançar a magia \nnum objeto de uma criatura involun-\ntária, ela pode fazer um teste de Von-\ntade para anulá-la.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "aumenta o número de alvos \nem"
      },
      {
        "cost": "+2 PM",
        "description": "muda o alcance para toque e \no alvo para 1 criatura. Em vez do nor-\nmal, o alvo aumenta uma categoria de \ntamanho (seu equipamento se ajusta \nao novo tamanho). O alvo também re-\ncebe Força"
      },
      {
        "cost": "+3 PM",
        "description": "muda o alcance para toque e \no alvo para 1 criatura. Em vez do nor-\nmal, o alvo diminui uma categoria de \ntamanho (seu equipamento se ajus-\nta ao novo tamanho). O alvo também \nrecebe Destreza"
      }
    ]
  },
  {
    "id": "amarras_etereas",
    "name": "Amarras Etéreas",
    "circle": 2,
    "type": "arcana",
    "school": "Convocação",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "1 criatura",
    "duration": "cena",
    "description": "Execução: padrão; Alcance: médio; \nAlvo: 1 criatura; Duração: cena; Re-\nsistência: Reflexos anula.\nTrês laços de energia surgem e se en-\nroscam no alvo, deixando-o agarra-\ndo. A vítima pode tentar se livrar, gas-\ntando uma ação padrão para fazer um \nteste de Atletismo. Se passar, destrói \num laço, mais um laço adicional para \ncada 5 pontos pelos quais superou a \nCD. Os laços também podem ser ata-\ncados e destruídos: cada um tem De-\nfesa 10, 10 PV, RD 5 e imunidade a \ndano mágico. Se todos os laços forem \ndestruídos, a magia é dissipada. Por \nserem feitos de energia, os laços afe-\ntam criaturas incorpóreas.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o número de alvos \nem"
      },
      {
        "cost": "+2 PM",
        "description": "aumenta o número de laços em \num alvo a sua escolha em"
      }
    ]
  },
  {
    "id": "amedrontar",
    "name": "Amedrontar",
    "circle": 1,
    "type": "arcana",
    "school": "Necromancia",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 animal ou humanoide",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: curto; \nAlvo: 1 animal ou humanoide; Du-\nração: cena; Resistência: Vontade \nparcial.\nO alvo é envolvido por energias som-\nbrias e assustadoras. Se falhar na re-\nsistência, fica apavorado por 1 rodada, \ndepois abalado. Se passar, fica abalado \npor 1d4 rodadas.",
    "resistance": "Vontade \nparcial",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "alvos que falhem na resis-\ntência ficam apavorados por 1d4"
      },
      {
        "cost": "+2 PM",
        "description": "muda o alvo para 1 criatura."
      },
      {
        "cost": "+5 PM",
        "description": "afeta todos os alvos válidos a \nsua escolha dentro do alcance."
      }
    ]
  },
  {
    "id": "ancora_dimensional",
    "name": "Âncora Dimensional",
    "circle": 3,
    "type": "arcana",
    "school": "Abjuração",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 criatura ou objeto",
    "duration": "cena",
    "description": "Execução: padrão; Alcance: curto; \nAlvo: 1 criatura ou objeto; Duração: \ncena.\nO alvo é envolvido por um campo de \nforça cor de esmeralda que impede \nqualquer movimento planar. Isso in-\nclui magias de convocação (como Sal-\nto Dimensional e Teletransporte), viagens \nastrais e a habilidade incorpóreo.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "muda o alcance para médio, \na área para esfera com 3m de raio e o \nalvo para criaturas escolhidas."
      },
      {
        "cost": "+2 PM",
        "description": "muda o efeito para criar um \nfio de energia cor de esmeralda que \nprende o alvo a um ponto no espaço \ndentro do alcance. O ponto precisa ser \nfixo, mas não precisa de nenhum apoio \nou superfície (pode simplesmente flu-\ntuar no ar). O alvo não pode se afas-\ntar mais de 3m do ponto, nem fisica-\nmente, nem com movimento planar. \nO fio possui 20 PV e redução de dano \n20 (mas pode ser dissipado por efei-\ntos que libertam criaturas, como o Jul-\ngamento Divino: Libertação do paladino)."
      },
      {
        "cost": "+4 PM",
        "description": "como acima, mas em vez de \num fio, cria uma corrente de energia, \ncom 20 PV e redução de dano 40."
      },
      {
        "cost": "+4 PM",
        "description": "muda o alvo para área de cubo \nde 9m, a duração para permanente e \nadiciona componente material (chave \nde esmeralda no valor de T$ 2.000). \nEm vez do normal, nenhum tipo de \nmovimento planar pode ser feito para \nentrar ou sair da área."
      }
    ]
  },
  {
    "id": "animar_objetos",
    "name": "Animar Objetos",
    "circle": 4,
    "type": "arcana",
    "school": "Transmutação",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "até 8 objetos Minúsculos ou Pe-\nquenos, 4 objetos Médios, 2 objetos \nGrandes ou 1 objeto Enorme",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: médio; \nAlvo: até 8 objetos Minúsculos ou Pe-\nquenos, 4 objetos Médios, 2 objetos \nGrandes ou 1 objeto Enorme; Dura-\nção: cena.\nVocê concede vida a objetos inanima-\ndos. Cada objeto se torna um parceiro \nsob seu controle. O tipo dele é escolhi-\ndo da lista de tamanho e ele não conta \nem seu limite de parceiros. Com uma \nação de movimento, você pode coman-\ndar mentalmente qualquer objeto ani-\nmado dentro do alcance para que au-\nxilie você ou outra criatura. Outros \nusos criativos para os objetos ficam \na cargo do mestre. Objetos animados\n179\nCapítulo Quatro\nsão construtos com valores de Força, \nDestreza e PV de acordo com seu ta-\nmanho. Todos os outros atributos são \nnulos, eles não têm valor de Defesa ou \ntestes de resistência e falham automati-\ncamente em qualquer teste oposto. Di-\nferente de parceiros comuns, um obje-\nto pode ser alvo de ações hostis.\nEsta magia não afeta itens mágicos, \nnem objetos que estejam sendo carre-\ngados por outra criatura.",
    "upgrades": [
      {
        "cost": "+5 PM",
        "description": "muda a duração para perma-\nnente e adiciona componente material \n(prataria no valor de T$ 1.000). Você \npode ter um máximo de objetos ani-\nmados igual à metade do seu nível.\nEstatísticas de objetos animados\nMinúsculo: For -3, Des 4, 5 PV; Assas-\nsino ou Combatente Iniciante.\nPequeno: For -2, Des 2, 10 PV; Comba-\ntente ou Guardião Iniciante.\nMédio: For 0, Des 1, 20 PV; Combaten-\nte ou Guardião Veterano.\nGrande: For 2, Des 0, 40 PV; Fortão, \nGuardião ou Montaria (cavalo) Veterano."
      }
    ]
  },
  {
    "id": "anular_a_luz",
    "name": "Anular a Luz",
    "circle": 3,
    "type": "divina",
    "school": "Necromancia",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "esfera com 6m de raio",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: pessoal; \nÁrea: esfera com 6m de raio; Dura-\nção: ver texto.\nEsta magia cria uma onda de escuridão \nque causa diversos efeitos. Magias de \naté 3º círculo na área são dissipadas se \nvocê passar num teste de Religião contra \na CD de cada uma. Seus aliados na área \nsão protegidos por uma aura sombria e \nrecebem +4 na Defesa até o fim da cena. \nInimigos na área ficam enjoados por \n1d4 rodadas (apenas uma vez por cena). \nAnular a Luz anula Dispersar as Trevas (este \nefeito tem duração instantânea).",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o bônus na Defesa \nem"
      },
      {
        "cost": "+4 PM",
        "description": "muda as magias dissipadas \npara até 4º círculo. Requer 4º círculo."
      }
    ]
  },
  {
    "id": "aparencia_perfeita",
    "name": "Aparência Perfeita",
    "circle": 2,
    "type": "arcana",
    "school": "Ilusão",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "cena",
    "description": "Esta magia lhe concede um rosto idea-\nlizado, porte físico garboso, voz me-\nlodiosa e olhar sedutor. Caso seu Ca-\nrisma seja 5 ou mais, você recebe +2 \nneste atributo. Do contrário, ele se tor-\nna 5 (isso conta como um bônus). Além \ndisso, você recebe +5 em Diploma-\ncia e Enganação. Quando a magia aca-\nba, quaisquer observadores percebem a \nmudança e tendem a suspeitar de você. \nDa mesma maneira, pessoas que o vi-\nram sob o efeito da magia sentirão que \n“algo está errado” ao vê-lo em condi-\nções normais. Quando a cena acabar, \nvocê pode gastar os PM da magia nova-\nmente como uma ação livre para man-\ntê-la ativa. Este efeito não fornece PV \nou PM adicionais."
  },
  {
    "id": "aprisionamento",
    "name": "Aprisionamento",
    "circle": 5,
    "type": "arcana",
    "school": "Abjuração",
    "execution": "completa",
    "range": "curto",
    "targetArea": "1 criatura",
    "duration": "permanente",
    "description": "Você cria uma prisão mágica para apri-\nsionar uma criatura. Se falhar no teste \nde resistência, o alvo sofre o efeito da \nmagia; se passar, fica imune a esta ma-\ngia por uma semana. Enquanto estiver \naprisionada, a criatura não precisa res-\npirar e alimentar-se, e não envelhece. \nMagias de adivinhação não conseguem \nlocalizar ou perceber o alvo. Ao lançar a \nmagia, você escolhe uma das seguintes \nformas de prisão. O componente mate-\nrial varia, mas todos custam T$ 1.000.\nAcorrentamento: o alvo é preso por cor-\nrentes firmemente enraizadas no chão, \nque o mantém no lugar. O alvo fica pa-\nralisado e não pode se mover ou ser \nmovido por qualquer meio. Componente \nMaterial: uma fina corrente de mitral.\nContenção Mínima: o alvo diminui para \n2 cm de altura e é preso dentro de uma \npedra preciosa ou objeto semelhante. \nLuz passa através da pedra, permitin-\ndo que o alvo veja o lado de fora e seja \nvisto, mas nada mais pode passar, nem \npor meio de teletransporte ou viagem \nplanar. A pedra não pode ser quebrada \nenquanto o alvo estiver dentro. Com-\nponente Material: uma pedra preciosa, \ncomo um diamante ou rubi.\nPrisão Dimensional: o alvo é transporta-\ndo para um semiplano protegido contra \nteletransporte e viagens planares. Pode \nser um labirinto, uma gaiola, uma torre \nou qualquer estrutura ou área confina-\nda e pequena a sua escolha. Componente \nMaterial: uma representação em minia-\ntura da prisão, feita de jade.\nSepultamento: o alvo é sepultado nas \nprofundezas da terra, em uma esfera \nmágica. Nada pode destruir ou atraves-\nsar a esfera, nem mesmo teletranspor-\nte ou viagens planares. Componente Ma-\nterial: um pequeno orbe de adamante.\nSono Eterno: o alvo adormece e não pode \nser acordado. Componente Material: fruta \npreparada com ervas soníferas raras.",
    "resistance": "Vontade anula"
  },
  {
    "id": "area_escorregadia",
    "name": "Área Escorregadia",
    "circle": 1,
    "type": "arcana",
    "school": "Convocação",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "quadrado de 3m ou 1 \nobjeto",
    "duration": "cena",
    "description": "Execução: padrão; Alcance: curto; \nAlvo ou Área: quadrado de 3m ou 1 \nobjeto; Duração: cena; Resistência: \nReflexos (veja texto).\nEsta magia recobre uma superfície com \numa substância gordurosa e escorrega-\ndia. Criaturas na área devem passar na \nresistência para não cair. Nas rodadas \nseguintes, criaturas que tentem movi-\nmentar-se pela área devem fazer testes \nde Acrobacia para equilíbrio (CD 10).\nÁrea Escorregadia pode tornar um item \nescorregadio. Uma criatura seguran-\ndo um objeto afetado deve passar na \nresistência para não deixar o item cair \ncada vez que usá-lo.",
    "resistance": "Reflexos (veja texto)",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "aumenta a área em"
      },
      {
        "cost": "+2 PM",
        "description": "muda a CD dos testes de \nAcrobacia para 15."
      }
    ]
  },
  {
    "id": "arma_espiritual",
    "name": "Arma Espiritual",
    "circle": 1,
    "type": "divina",
    "school": "Convocação",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "cena",
    "description": "Você invoca a arma preferida de sua \ndivindade (caso sua divindade possua \numa), que surge flutuando a seu lado. \nUma vez por rodada, quando você so-\nfre um ataque corpo a corpo, pode \nusar uma reação para que a arma cau-\nse automaticamente 2d6 pontos de \ndano do tipo da arma - por exemplo, \numa espada longa causa dano de corte \n- no oponente que fez o ataque. Esta \nmagia se dissipa se você morrer.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "além do normal, a arma o pro-\ntege. Você recebe"
      },
      {
        "cost": "+2 PM",
        "description": "aumenta o bônus na Defesa \nem"
      },
      {
        "cost": "+2 PM",
        "description": "muda a duração para susten-\ntada. Além do normal, uma vez por ro-\ndada, você pode gastar uma ação livre \npara fazer a arma acertar automatica-\nmente um alvo adjacente. Se a arma \natacar, não poderá contra-atacar até \nseu próximo turno. Requer 2º círculo."
      },
      {
        "cost": "+2 PM",
        "description": "muda o tipo do dano para es-\nsência. Requer 2º círculo."
      },
      {
        "cost": "+2 PM",
        "description": "aumenta o dano causado pela \narma em"
      }
    ]
  },
  {
    "id": "arma_magica",
    "name": "Arma Mágica",
    "circle": 1,
    "type": "universal",
    "school": "Transmutação",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 arma empunhada",
    "duration": "cena",
    "description": "A arma é considerada mágica e fornece \n+1 nos testes de ataque e rolagens de \ndano (isso conta como um bônus de en-\ncanto). Caso você esteja empunhando a \narma, pode usar seu atributo-chave de \nmagias em vez do atributo original nos \ntestes de ataque (não cumulativo com \nefeitos que somam este atributo).",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o bônus em"
      },
      {
        "cost": "+2 PM",
        "description": "a arma causa"
      }
    ]
  },
  {
    "id": "armadura_arcana",
    "name": "Armadura Arcana",
    "circle": 1,
    "type": "arcana",
    "school": "Abjuração",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "cena",
    "description": "Esta magia cria uma película proteto-\nra invisível, mas tangível, fornecendo \n+5 na Defesa. Esse bônus é cumula-\ntivo com outras magias, mas não com \nbônus fornecido por armaduras.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "muda a execução para reação. \nEm vez do normal, quando sofre um \nataque, você cria um escudo mágico que \nfornece"
      },
      {
        "cost": "+2 PM",
        "description": "aumenta o bônus na Defesa \nem"
      },
      {
        "cost": "+2 PM",
        "description": "muda a duração para um dia."
      }
    ]
  },
  {
    "id": "armamento_da_natureza",
    "name": "Armamento da Natureza",
    "circle": 1,
    "type": "divina",
    "school": "Transmutação",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 arma (veja texto)",
    "duration": "cena",
    "description": "Execução: padrão; Alcance: toque; \nAlvo: 1 arma (veja texto); Duração: \ncena.\nVocê fortalece uma arma mundana pri-\nmitiva (sem custo em T$, como bor-\ndão, clava, funda ou tacape), uma arma \nnatural ou um ataque desarmado. O \ndano da arma aumenta em um passo \ne ela é considerada mágica. Ao lançar a \nmagia, você pode mudar o tipo de dano \nda arma (escolhendo entre corte, im-\npacto ou perfuração).",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "fornece"
      },
      {
        "cost": "+2 PM",
        "description": "muda a execução para ação de \nmovimento."
      },
      {
        "cost": "+3 PM",
        "description": "aumenta o bônus nos testes de \nataque em"
      }
    ]
  },
  {
    "id": "fantasmagorico",
    "name": "Fantasmagórico",
    "circle": 4,
    "type": "arcana",
    "school": "Necromancia",
    "execution": "padrão",
    "range": "longo",
    "targetArea": "1 criatura",
    "duration": "cena, até \nser descarregada",
    "description": "Execução: padrão; Alcance: longo; \nAlvo: 1 criatura; Duração: cena, até \nser descarregada; Resistência: Vonta-\nde anula, Fortitude parcial.\nUsando os medos subconscientes do \nalvo, você cria uma imagem daquilo \nque ele mais teme. Apenas a própria \nvítima pode ver o Assassino Fantasmagó-\nrico com nitidez; outras criaturas pre-\nsentes (incluindo o conjurador) enxer-\ngam apenas um espectro sombrio.\nQuando você lança a magia, o espec-\ntro surge adjacente a você e a vítima \nfaz um teste de Vontade. Se ela passar, \npercebe que o espectro é uma ilusão e \na magia é dissipada. Se falhar, acredi-\nta na existência do espectro, que então \nflutua 18m por rodada em direção à ví-\ntima, sempre no fim do seu turno. Ele \né incorpóreo e imune a magias (exceto \nmagias que dissipam outras).\nSe o espectro terminar seu turno adja-\ncente à vítima, ela deve fazer um teste \nde Fortitude. Se passar, sofre 6d6 pon-\ntos de dano de trevas (este dano não \npode reduzir o alvo a menos de 0 PV e \nnão o deixa sangrando). Se falhar, so-\nfre um colapso, ficando imediatamente \ncom -1 PV e sangrando.\nO espectro persegue o alvo implacavel-\nmente. Ele desaparece se o alvo ficar \ninconsciente ou se afastar além de al-\ncance longo dele, ou se for dissipado.",
    "resistance": "Vonta-\nde anula, Fortitude parcial"
  },
  {
    "id": "augurio",
    "name": "Augúrio",
    "circle": 2,
    "type": "divina",
    "school": "Adivinhação",
    "execution": "completa",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "instantânea",
    "description": "Esta magia diz se uma ação que você \ntomará em breve - no máximo uma \nhora no futuro - trará resultados bons \nou ruins. O mestre rola 1d6 em segre-\ndo; com um resultado de 2 a 6, a ma-\ngia funciona e você recebe uma das se-\nguintes respostas: “felicidade” (a ação \ntrará bons resultados); “miséria” (a \nação trará maus resultados); “felicida-\nde e miséria” (para ambos) ou “nada” \n(para ações que não trarão resultados \nbons ou ruins).\nCom um resultado 1, a magia falha \ne oferece o resultado “nada”. Não há \ncomo saber se esse resultado foi dado \nporque a magia falhou ou não. Lan-\nçar esta magia múltiplas vezes sobre \no mesmo assunto gera sempre o pri-\nmeiro resultado.\nPor exemplo, se o grupo está prestes \na entrar em uma câmara, o augúrio \ndirá “felicidade” se a câmara contém \num tesouro desprotegido, “miséria” \nse contém um monstro, “felicidade e \nmiséria” se houver um tesouro e um \nmonstro ou “nada” se a câmara esti-\nver vazia.",
    "upgrades": [
      {
        "cost": "+3 PM",
        "description": "muda a execução para 1 minu-\nto. Em vez do normal, você pode con-\nsultar uma divindade, fazendo uma \npergunta sobre um evento que acon-\ntecerá até um dia no futuro. O mestre \nrola a chance de falha; com um resul-\ntado de 2 a 6, você recebe uma respos-\nta, desde uma simples frase até uma \nprofecia ou enigma. Em geral, este \nuso sempre oferece pistas, indicando \num caminho a tomar para descobrir a \nresposta que se procura. Numa falha \nvocê não recebe resposta alguma. Re-\nquer 3º círculo."
      },
      {
        "cost": "+7 PM",
        "description": "muda a execução para 10 mi-\nnutos e a duração para 1 minuto. Em \nvez do normal, você consulta uma di-\nvindade, podendo fazer uma pergun-\nta por rodada, desde que ela possa ser \nrespondida com “sim”, “não” ou “não \nsei” (embora poderosos, os deuses \nnão são oniscientes). O mestre rola \na chance de falha para cada pergunta. \nEm caso de falha, a resposta também \né “não sei”. Requer 4º círculo."
      },
      {
        "cost": "+7 PM",
        "description": "o mestre rola 1d12; a magia só \nfalha em um resultado 1."
      },
      {
        "cost": "+12 PM",
        "description": "o mestre rola 1d20; a magia \nsó falha em um resultado 1.\n181\nCapítulo Quatro"
      }
    ]
  },
  {
    "id": "aura_divina",
    "name": "Aura Divina",
    "circle": 5,
    "type": "divina",
    "school": "Abjuração",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "esfera com 9m de raio",
    "duration": "cena",
    "description": "Você se torna um conduíte da energia \nde sua divindade, emanando uma aura \nbrilhante. Você e aliados devotos da \nmesma divindade ficam imunes a en-\ncantamento e recebem +10 na Defesa \ne em testes de resistência. Aliados não \ndevotos da mesma divindade recebem \n+5 na Defesa e em testes de resistên-\ncia. Além disso, inimigos que entrem \nna área devem fazer um teste de Vonta-\nde; em caso de falha, recebem uma con-\ndição a sua escolha entre esmorecido, \ndebilitado ou lento até o fim da cena. \nO teste deve ser refeito cada vez que a \ncriatura entrar novamente na área.",
    "resistance": "Vontade parcial"
  },
  {
    "id": "aviso",
    "name": "Aviso",
    "circle": 1,
    "type": "universal",
    "school": "Adivinhação",
    "execution": "movimento",
    "range": "longo",
    "targetArea": "1 criatura",
    "duration": "instantânea",
    "description": "Envia um aviso telepático para uma \ncriatura, mesmo que não possa vê-la \nnem tenha linha de efeito. Escolha um:\nAlerta: o alvo recebe +5 em seu próxi-\nmo teste de Iniciativa e de Percepção \n até o fim da próxima cena.\nMensagem: o alvo recebe uma mensa-\ngem sua de até 25 palavras. Vocês de-\nvem ter um idioma em comum para o \nalvo poder entendê-lo.\nLocalização: o alvo sabe onde você está \nnaquele momento. Se você mudar de \nposição, ele não saberá.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "aumenta o alcance em um fa-\ntor de 10 (90m para 900m, 900m para \n9km e assim por diante)."
      },
      {
        "cost": "+1 PM",
        "description": "se escolher mensagem, o alvo \npode enviar uma resposta de até 25 pa-\nlavras para você até o fim de seu pró-\nximo turno."
      },
      {
        "cost": "+2 PM",
        "description": "se escolher localização, muda \na duração para cena. O alvo sabe onde \nvocê está mesmo que você mude de \nposição."
      }
    ]
  },
  {
    "id": "banimento",
    "name": "Banimento",
    "circle": 3,
    "type": "divina",
    "school": "Abjuração",
    "execution": "1d3+1 rodadas",
    "range": "curto",
    "targetArea": "1 criatura",
    "duration": "ins-\ntantânea",
    "description": "Você expulsa uma criatura não nati-\nva de Arton. Um alvo nativo de outro \nmundo (como muitos espíritos), é te-\nletransportado de volta para um lugar \naleatório de seu mundo de origem. Já \num alvo morto-vivo tem sua conexão \ncom as energias negativas rompidas, \nsendo reduzido a 0 PV. Se passar na re-\nsistência, em vez dos efeitos acima, o \nalvo fica enjoado por 1d4 rodadas.\nSe você tiver um ou mais itens que se \noponham ao alvo de alguma maneira, a \nCD do teste de resistência aumenta em \n+2 por item. Por exemplo, se lançar a \nmagia contra demônios do frio (vul-\nneráveis a água benta e que odeiam \nluz e calor) enquanto segura um fras-\nco de água benta e uma tocha acesa, a \nCD aumenta em +4. O mestre decide \nse determinado item é forte o bastante \ncontra a criatura para isso.",
    "resistance": "Vontade parcial"
  },
  {
    "id": "barragem_elemental_de_vectorius",
    "name": "Barragem Elemental de Vectorius",
    "circle": 5,
    "type": "arcana",
    "school": "Evocação",
    "execution": "padrão",
    "range": "longo",
    "targetArea": "4 esferas elementais",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: longo; \nEfeito: 4 esferas elementais; Dura-\nção: instantânea; Resistência: Refle-\nxos parcial.\nCriada pelo arquimago Vectorius, esta \nmagia produz quatro esferas, de áci-\ndo, eletricidade, fogo e frio, que voam \naté um ponto a sua escolha. Quando \natingem o ponto escolhido, explodem \ncausando 6d6 pontos de dano de seu \nrespectivo tipo numa área com 12m \nde raio. Um teste de Reflexos reduz o \ndano à metade. Você pode mirar cada \nesfera em uma criatura ou ponto dife-\nrente. Uma criatura ao alcance da ex-\nplosão de mais de uma esfera deve fa-\nzer um teste de resistência para cada \numa. Além disso, as esferas causam os \nseguintes efeitos em criaturas que fa-\nlharem em seus testes de resistência:\n•\t Ácido: vulnerável até o fim da cena.\n•\t Elétrica: atordoado por 1 rodada \n(apenas uma vez por cena).\n•\t Fogo: em chamas.\n•\t Frio: lento até o fim da cena.",
    "resistance": "Refle-\nxos parcial",
    "upgrades": [
      {
        "cost": "+5 PM",
        "description": "aumenta o dano de cada esfe-\nra em"
      },
      {
        "cost": "+5 PM",
        "description": "muda o tipo de dano de todas \nas esferas para essência (mas elas ain-\nda causam os outros efeitos como se \nseu tipo de dano não mudasse)."
      }
    ]
  },
  {
    "id": "bencao",
    "name": "Bênção",
    "circle": 1,
    "type": "divina",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 criatura",
    "duration": "cena",
    "description": "Abençoa seus aliados, que recebem \n+1 em testes de ataque e rolagens de \ndano. Bênção anula Perdição.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "muda o alvo para 1 cadáver e a \nduração para 1 semana. O cadáver não \nse decompõe nem pode ser transfor-\nmado em morto-vivo."
      }
    ]
  },
  {
    "id": "bola_de_fogo",
    "name": "Bola de Fogo",
    "circle": 2,
    "type": "arcana",
    "school": "Evocação",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "esfera com 6m de raio",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: médio; \nÁrea: esfera com 6m de raio; Dura-\nção: instantânea; Resistência: Refle-\nxos reduz à metade.\nEsta famosa magia de ataque cria uma \npoderosa explosão, causando 6d6 pon-\ntos de dano de fogo em todas as criatu-\nras e objetos livres na área.",
    "resistance": "Refle-\nxos reduz à metade",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o dano em"
      },
      {
        "cost": "+2 PM",
        "description": "muda a área para efeito de es-\nfera flamejante com tamanho Médio e \na duração para cena. Em vez do nor-\nmal, cria uma esfera flamejante com \n1,5m de diâmetro que causa 3d6 pon-\ntos de dano a qualquer criatura no \nmesmo espaço. Você pode gastar uma \nação de movimento para fazer a esfe-\nra voar 9m em qualquer direção. Ela é \nimune a dano, mas pode ser apagada \ncom água. Uma criatura só pode sofrer \ndano da esfera uma vez por rodada."
      }
    ]
  },
  {
    "id": "buraco_negro",
    "name": "Buraco Negro",
    "circle": 5,
    "type": "universal",
    "school": "Convocação",
    "execution": "completa",
    "range": "longo",
    "targetArea": "buraco negro",
    "duration": "3 ro-\ndadas",
    "description": "Esta magia cria um vácuo capaz de su-\ngar tudo nas proximidades. Escolha \num espaço desocupado para o buraco \nnegro. No início de cada um de seus \ntrês turnos seguintes, todas as criatu-\nras a até alcance longo do buraco ne-\ngro, incluindo você, devem fazer um\n182\nMagia",
    "resistance": "Fortitude parcial"
  },
  {
    "id": "caminhos_da_natureza",
    "name": "Caminhos da Natureza",
    "circle": 1,
    "type": "divina",
    "school": "Convocação",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "criaturas escolhidas",
    "duration": "1 dia",
    "description": "Você invoca espíritos da natureza, pe-\ndindo que eles abram seu caminho. As \ncriaturas afetadas recebem deslocamen-\nto +3m e ignoram penalidades por ter-\nreno difícil em terrenos naturais.",
    "upgrades": [
      {
        "cost": "Truque",
        "description": "muda o alcance para pessoal \ne o alvo para você. Em vez do normal, \nvocê recebe"
      },
      {
        "cost": "+1 PM",
        "description": "além do normal, a CD para \nrastrear os alvos em terreno natural \naumenta em"
      }
    ]
  },
  {
    "id": "campo_antimagia",
    "name": "Campo Antimagia",
    "circle": 4,
    "type": "arcana",
    "school": "Abjuração",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "sustentada",
    "description": "Você é cercado por uma barreira invisí-\nvel com 3m de raio que o acompanha. \nQualquer habilidade mágica ou item \nmágico que entre na área da barreira é \nsuprimida enquanto estiver lá.\nCriaturas convocadas que entrem em \num Campo Antimagia desaparecem. Elas \nreaparecem na mesma posição quando \na duração do Campo termina - supon-\ndo que a duração da magia que as con-\nvocou ainda não tenha terminado.\nCriaturas mágicas ou imbuídas com \nmagia durante sua criação não são di-\nretamente afetadas pelo Campo An-\ntimagia. Entretanto, como qualquer \ncriatura, não poderão usar magias ou \nhabilidades mágicas dentro dele."
  },
  {
    "id": "campo_de_forca",
    "name": "Campo de Força",
    "circle": 2,
    "type": "arcana",
    "school": "Abjuração",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "cena",
    "description": "Esta magia cria uma película protetora \nsobre você. Você recebe 30 pontos de \nvida temporários.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "muda a execução para reação \ne a duração para instantânea. Em vez \ndo normal, você recebe RD 30 contra o \npróximo dano que sofrer."
      },
      {
        "cost": "+3 PM",
        "description": "muda os PV temporários ou a \nRD para 50. Requer 3º círculo."
      },
      {
        "cost": "+7 PM",
        "description": "muda os PV temporários ou a \nRD para 70. Requer 4º círculo."
      },
      {
        "cost": "+7 PM",
        "description": "muda o alcance para curto, o \nalvo para outra criatura ou objeto solto \nEnorme ou menor e a duração para sus-\ntentada. Em vez do normal, cria uma \nesfera imóvel e tremeluzente ao redor \ndo alvo. Nenhuma criatura, objeto ou \nefeito de dano pode passar pela esfera, \nembora criaturas possam respirar nor-\nmalmente. Criaturas na área podem fa-\nzer um teste de Reflexos para evitar se-\nrem aprisionadas e sempre que você se \nconcentrar. Requer 4º círculo."
      }
    ]
  },
  {
    "id": "camuflagem_ilusoria",
    "name": "Camuflagem Ilusória",
    "circle": 2,
    "type": "arcana",
    "school": "Ilusão",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura",
    "duration": "cena",
    "description": "O alvo fica com sua imagem nublada, \ncomo se vista através de um líquido, re-\ncebendo os efeitos de camuflagem leve.",
    "upgrades": [
      {
        "cost": "+3 PM",
        "description": "muda a duração para sustenta-\nda. A imagem do alvo fica mais distor-\ncida, aumentando a chance de falha da \ncamuflagem leve para 50%."
      },
      {
        "cost": "+7 PM",
        "description": "muda o alcance para curto e o \nalvo para criaturas escolhidas. Requer \n4º círculo."
      }
    ]
  },
  {
    "id": "chuva_de_meteoros",
    "name": "Chuva de Meteoros",
    "circle": 5,
    "type": "arcana",
    "school": "Convocação",
    "execution": "completa",
    "range": "longo",
    "targetArea": "quadrado com 18m de lado",
    "duration": "Instantânea",
    "description": "Execução: completa; Alcance: longo; \nÁrea: quadrado com 18m de lado; Du-\nração: instantânea; Resistência: Re-\nflexos parcial.\nMeteoros caem dos céus, devastando \na área afetada. Criaturas na área so-\nfrem 15d6 pontos de dano de impac-\nto, 15d6 pontos de dano de fogo e fi-\ncam caídas e presas sob os escombros \n(agarradas). Uma criatura que passe \nno teste de resistência sofre metade \ndo dano total e não fica caída e agarra-\nda. Uma criatura agarrada pode esca-\npar gastando uma ação padrão e pas-\nsando em um teste de Atletismo. Toda \na área afetada fica coberta de escom-\nbros, sendo considerada terreno di-\nfícil, e imersa numa nuvem de poei-\nra (camuflagem leve). Esta magia só \npode ser utilizada a céu aberto.",
    "resistance": "Re-\nflexos parcial"
  },
  {
    "id": "circulo_da_justica",
    "name": "Círculo da Justiça",
    "circle": 2,
    "type": "divina",
    "school": "Abjuração",
    "execution": "completa",
    "range": "curto",
    "targetArea": "esfera com 9m de raio",
    "duration": "1 dia",
    "description": "Também conhecida como Lágrimas de \nHyninn, esta magia é usada em tribu-\nnais e para proteger áreas sensíveis. \nCriaturas na área sofrem -10 em tes-\ntes de Acrobacia, Enganação, Furtivi-\ndade e Ladinagem e não podem mentir \ndeliberadamente - mas podem tentar \nevitar perguntas que normalmente res-\nponderiam com uma mentira (sendo \nevasivas ou cometendo omissões, por \nexemplo). Uma criatura que passe na \nresistência tem as penalidades reduzi-\ndas para -5 e pode mentir.",
    "resistance": "Vontade parcial",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "muda a execução para ação \npadrão, o alcance para pessoal, o alvo \npara você, a duração para cena e a re-\nsistência para nenhuma. Em vez do \nnormal, qualquer criatura ou objeto \ninvisível em alcance curto se torna vi-\nsível. Isso não dissipa o efeito mágico; \nse sair do seu alcance, a criatura ou ob-\njeto voltam a ficar invisíveis."
      },
      {
        "cost": "+3 PM",
        "description": "muda a penalidade nas perí-\ncias para -10 (se passar na resistência) \ne -20 (se falhar). Requer 4º círculo."
      },
      {
        "cost": "+7 PM",
        "description": "muda a duração para perma-\nnente e adiciona componente material \n(balança de prata no valor de T$ 5.000).\n183\nCapítulo Quatro"
      }
    ]
  },
  {
    "id": "circulo_da_restauracao",
    "name": "Círculo da Restauração",
    "circle": 4,
    "type": "divina",
    "school": "Evocação",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "esfera com 3m de raio",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: curto; \nÁrea: esfera com 3m de raio; Dura-\nção: 5 rodadas.\nVocê evoca um círculo de luz que \nemana uma energia poderosa. Qual-\nquer criatura viva que termine o tur-\nno dentro do círculo recupera 3d8+3 \nPV e 1 PM. Mortos-vivos e criaturas \nque sofrem dano por luz perdem PV e \nPM na mesma quantidade. Uma cria-\ntura pode recuperar no máximo 5 PM \npor dia com esta magia."
  },
  {
    "id": "colera_de_azgher",
    "name": "Cólera de Azgher",
    "circle": 4,
    "type": "divina",
    "school": "Evocação",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "esfera com 6m de raio",
    "duration": "instantânea",
    "description": "Execução: padrão; Alcance: médio; \nÁrea: esfera com 6m de raio; Duração: \ninstantânea. Resistência: Reflexos par-\ncial.\nVocê cria um fulgor dourado e intenso. \nCriaturas na área ficam cegas por 1d4 \nrodadas e em chamas, e sofrem 10d6 \npontos de dano de fogo (mortos-vivos \nsofrem 10d8 pontos de dano). Uma \ncriatura que passe no teste de resistên-\ncia não fica cega nem em chamas e so-\nfre metade do dano.",
    "resistance": "Reflexos par-\ncial",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o dano em"
      },
      {
        "cost": "+2 PM",
        "description": "aumenta a área em"
      }
    ]
  },
  {
    "id": "coluna_de_chamas",
    "name": "Coluna de Chamas",
    "circle": 3,
    "type": "divina",
    "school": "Evocação",
    "execution": "padrão",
    "range": "longo",
    "targetArea": "cilindro com 3m de raio e 30m \nde altura",
    "duration": "instantânea",
    "description": "Execução: padrão; Alcance: longo; \nÁrea: cilindro com 3m de raio e 30m \nde altura; Duração: instantânea; Re-\nsistência: Reflexos reduz à metade.\nUm pilar de fogo sagrado desce dos \ncéus, causando 6d6 pontos de dano de \nfogo mais 6d6 pontos de dano de luz \nnas criaturas e objetos livres na área.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "aumenta o dano de fogo em"
      }
    ]
  },
  {
    "id": "comando",
    "name": "Comando",
    "circle": 1,
    "type": "divina",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 humanoide",
    "duration": "1 roda-\nda",
    "description": "Você dá uma ordem irresistível, que o \nalvo deve ser capaz de ouvir (mas não\nprecisa entender). Se falhar na resis-\ntência, ele deve obedecer ao comando \nem seu próprio turno da melhor ma-\nneira possível. Escolha um dos efeitos.\nFuja: o alvo gasta seu turno se afastando \nde você (usando todas as suas ações).\nLargue: o alvo solta quaisquer itens que \nesteja segurando e não pode pegá-los \nnovamente até o início de seu próximo \nturno. Como esta é uma ação livre, ele \nainda pode executar outras ações (ex-\nceto pegar aquilo que largou).\nPare: o alvo fica pasmo (apenas uma \nvez por cena).\nSenta: com uma ação livre, o alvo senta \nno chão (se estava pendurado ou voan-\ndo, desce até o chão). Ele pode fazer \noutras ações, mas não se levantar até o \ninício de seu próximo turno.\nVenha: o alvo gasta seu turno se apro-\nximando de você (usando todas as \nsuas ações).",
    "resistance": "Vontade anula",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "muda o alvo para 1 criatura."
      }
    ]
  },
  {
    "id": "compreensao",
    "name": "Compreensão",
    "circle": 1,
    "type": "universal",
    "school": "Adivinhação",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura ou texto",
    "duration": "cena",
    "description": "Execução: padrão; Alcance: toque; \nAlvo: 1 criatura ou texto; Duração: \ncena; Resistência: Vontade anula (veja \ndescrição).\nEssa magia lhe confere compreensão \nsobrenatural. Você pode tocar um tex-\nto e entender as palavras mesmo que \nnão conheça o idioma. Se tocar numa \ncriatura inteligente, pode se comunicar \ncom ela mesmo que não tenham um \nidioma em comum. Se tocar uma cria-\ntura não inteligente, como um animal, \npode perceber seus sentimentos.\nVocê também pode gastar uma ação de \nmovimento para ouvir os pensamentos \nde uma criatura tocada (você “ouve” \no que o alvo está pensando), mas um \nalvo involuntário tem direito a um tes-\nte de Vontade para proteger seus pen-\nsamentos e evitar este efeito.",
    "resistance": "Vontade anula (veja \ndescrição)",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "muda o alcance para curto."
      },
      {
        "cost": "+2 PM",
        "description": "muda o alcance para curto e \no alvo para criaturas escolhidas. Você \npode entender todas as criaturas afeta-\ndas, mas só pode ouvir os pensamen-\ntos de uma por vez."
      },
      {
        "cost": "+2 PM",
        "description": "muda o alvo para 1 criatura. \nEm vez do normal, pode vasculhar os \npensamentos do alvo para extrair in-\nformações. O alvo tem direito a um \nteste de Vontade para anular este efei-\nto. O mestre decide se a criatura sabe\nou não a informação que você procura. \nRequer 2º círculo."
      }
    ]
  },
  {
    "id": "comunhao_com_a_natureza",
    "name": "Comunhão com a Natureza",
    "circle": 3,
    "type": "divina",
    "school": "Adivinhação",
    "execution": "completa",
    "range": "pes-\nsoal",
    "targetArea": "você",
    "duration": "1 dia",
    "description": "Após uma breve união com a natureza \nlocal, você obtém informações e intui-\nções sobre a região em que está, numa \ndistância equivalente a um dia de via-\ngem. Você recebe 6d4 dados de auxílio. \nEnquanto a magia durar, sempre que for \nrealizar um teste de perícia em áreas na-\nturais, você pode gastar 2d4 (mais 2d4 \npara cada círculo de magias acima do 3º \nque puder lançar) e adicionar o resulta-\ndo rolado como bônus no teste. A magia \ntermina se você ficar sem dados.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "muda a execução para 1 minu-\nto e a duração para instantânea. Em vez \ndo normal, você descobre 1d4"
      },
      {
        "cost": "+3 PM",
        "description": "aumenta o número de dados \nde auxílio em"
      },
      {
        "cost": "+4 PM",
        "description": "muda o tipo dos dados de \nauxílio para d6."
      }
    ]
  },
  {
    "id": "conceder_milagre",
    "name": "Conceder Milagre",
    "circle": 4,
    "type": "divina",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura",
    "duration": "permanen-\nte até ser descarregada",
    "description": "Execução: padrão; Alcance: toque; \nAlvo: 1 criatura; Duração: permanen-\nte até ser descarregada.\nVocê transfere um pouco de seu poder \ndivino a outra criatura. Escolha uma \nmagia de até 2º círculo que você co-\nnheça; o alvo pode lançar essa magia \numa vez, sem pagar o custo dela em \nPM (aprimoramentos podem ser usa-\ndos, mas o alvo deve gastar seus pró-\nprios PM). Você sofre uma penalidade \nde -3 PM até que o alvo lance a magia.",
    "upgrades": [
      {
        "cost": "+4 PM",
        "description": "muda o círculo da magia con-\ncedida para 3º e a penalidade de PM \npara -6.\n184\nMagia"
      }
    ]
  },
  {
    "id": "concentracao_de_combate",
    "name": "Concentração de Combate",
    "circle": 1,
    "type": "arcana",
    "school": "Adivinhação",
    "execution": "livre",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "1 rodada",
    "description": "Você amplia sua percepção, antecipan-\ndo movimentos dos inimigos e achan-\ndo brechas em sua defesa. Quando faz \num teste de ataque, você rola dois da-\ndos e usa o melhor resultado.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "muda a execução para padrão e \na duração para cena. Requer 2º círculo."
      },
      {
        "cost": "+5 PM",
        "description": "além do normal, ao atacar \nvocê, um inimigo deve rolar dois da-\ndos e usar o pior resultado. Requer 3º \ncírculo."
      },
      {
        "cost": "+9 PM",
        "description": "muda a execução para pa-\ndrão, o alcance para curto, o alvo para \ncriaturas escolhidas e a duração para \ncena. Requer 4º círculo."
      }
    ]
  },
  {
    "id": "condicao",
    "name": "Condição",
    "circle": 2,
    "type": "divina",
    "school": "Adivinhação",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "até 5 criaturas",
    "duration": "cena",
    "description": "Pela duração da magia, você sabe a po-\nsição e status (PV atuais, se estão com \numa condição ou sob efeito de ma-\ngia...) dos alvos. Depois de lançada, a \ndistância dos alvos não importa - a \nmagia só deixa de detectar um alvo se \nele morrer ou for para outro plano.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "aumenta o número de alvos \nem"
      }
    ]
  },
  {
    "id": "conjurar_elemental",
    "name": "Conjurar Elemental",
    "circle": 4,
    "type": "arcana",
    "school": "Convocação",
    "execution": "completa",
    "range": "médio",
    "targetArea": "parceiro elemental",
    "duration": "sustentada",
    "description": "Execução: completa; Alcance: médio; \nEfeito: parceiro elemental; Duração: \nsustentada.\nEsta magia transforma uma porção de \num elemento inerte em uma criatura \nelemental Grande do tipo do elemen-\nto alvo. Por exemplo, lançar esta ma-\ngia numa fogueira ou tocha cria um \nelemental do fogo. Você pode criar ele-\nmentais do ar, água, fogo e terra com \nessa magia. O elemental obedece a to-\ndos os seus comandos e pode funcio-\nnar como um parceiro do tipo destrui-\ndor (cuja habilidade custa apenas 2 PM \npara ser usada) e mais um tipo entre os \nindicados na lista abaixo, ambos mes-\ntres. O elemental auxilia apenas você e \nnão conta em seu limite de parceiros.\nAr: assassino, perseguidor ou vigilante. \nDano de eletricidade.\nÁgua: ajudante, guardião ou médico. \nDano de frio.\nFogo: atirador, combatente ou fortão. \nDano de fogo.\nTerra: combatente, guardião ou montaria. \nDano de impacto.",
    "upgrades": [
      {
        "cost": "+5 PM",
        "description": "o elemental muda para Enor-\nme e recebe dois tipos de parceiro indi-\ncados no seu elemento."
      }
    ]
  },
  {
    "id": "conjurar_monstro",
    "name": "Conjurar Monstro",
    "circle": 1,
    "type": "arcana",
    "school": "Convocação",
    "execution": "completa",
    "range": "curto",
    "targetArea": "1 criatura conjurada",
    "duration": "sustentada",
    "description": "Execução: completa; Alcance: curto; \nEfeito: 1 criatura conjurada; Duração: \nsustentada.\nVocê conjura um monstro Pequeno \nque ataca seus inimigos. Você esco-\nlhe a aparência do monstro e o tipo de \ndano que ele pode causar, entre cor-\nte, impacto e perfuração. No entan-\nto, ele não é uma criatura real, e sim \n uma criatura feita de energia. Se for \ndestruído, ou quando a magia acaba, \ndesaparece com um brilho, sem dei-\nxar nada para trás. Você só pode ter \num monstro conjurado por esta ma-\ngia por vez.\nO monstro surge em um espaço de-\nsocupado a sua escolha dentro do al-\ncance e age no início de cada um de \nseus turnos, a partir da próxima roda-\nda. O monstro tem deslocamento 9m \ne pode fazer uma ação de movimen-\nto por rodada. Você pode gastar uma \nação padrão para dar uma das seguin-\ntes ordens a ele.\nMover: o monstro se movimenta o do-\nbro do deslocamento nessa rodada.\nAtacar: o monstro causa 2d4+2 pontos \nde dano de corte, impacto ou perfura-\nção a uma criatura adjacente.\nLançar Magia: o monstro pode servir \ncomo ponto de origem para uma ma-\ngia lançada por você com execução de \numa ação padrão ou menor. Ele pode \ndescarregar um Toque Chocante em um\ninimigo distante, ou mesmo “cuspir” \numa Bola de Fogo! Você gasta PM nor-\nmalmente para lançar a magia.\nOutros usos criativos para o monstro \nconjurado ficam a critério do mestre. \nEle não age sem receber uma ordem.\nPara efeitos de jogo, o monstro conju-\nrado tem For 2, Des 3 e todos os ou-\ntros atributos nulos. Ele tem Defesa \nigual a sua, 20 PV, usa o seu valor em \nReflexos e é imune a efeitos que pe-\ndem um teste de Fortitude ou Vontade.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "o monstro ganha deslocamen-\nto de escalada ou natação igual ao seu \ndeslocamento terrestre."
      },
      {
        "cost": "+1 PM",
        "description": "aumenta o deslocamento do \nmonstro em"
      },
      {
        "cost": "+1 PM",
        "description": "muda o tipo de dano do ata-\nque do monstro para ácido, fogo, frio \nou eletricidade."
      },
      {
        "cost": "+2 PM",
        "description": "aumenta os PV do monstro \nem"
      },
      {
        "cost": "+2 PM",
        "description": "aumenta o tamanho do mons-\ntro para Médio. Ele tem For 4, Des 3, \n45 PV, deslocamento 12m e seu ataque \ncausa 2d6"
      },
      {
        "cost": "+2 PM",
        "description": "o monstro ganha redução 5 \ncontra dois tipos de dano (por exem-\nplo, corte e frio)."
      },
      {
        "cost": "+4 PM",
        "description": "o monstro ganha uma nova \nordem: Arma de Sopro. Para dar essa or-\ndem você gasta 1 PM, e faz o monstro \ncausar o dobro de seu dano de ataque \nem um cone de 6m a partir de si (Re-\nflexos reduz à metade)."
      },
      {
        "cost": "+5 PM",
        "description": "aumenta o tamanho do mons-\ntro para Grande. Ele tem For 7, Des 2, \n75 PV, deslocamento 12m e seu ata-\nque causa 4d6"
      },
      {
        "cost": "+9 PM",
        "description": "o monstro ganha desloca-\nmento de voo igual ao dobro do des-\nlocamento."
      },
      {
        "cost": "+9 PM",
        "description": "o monstro ganha imunidade \ncontra dois tipos de dano."
      },
      {
        "cost": "+9 PM",
        "description": "aumenta o tamanho do \nmonstro para Enorme. Ele tem For \n11, Des 1, 110 PV, deslocamento 15m \ne seu ataque causa 4d8"
      },
      {
        "cost": "+14 PM",
        "description": "aumenta o tamanho do \nmonstro para Colossal. Ele tem For \n15, Des 0, 180 PV, deslocamento 15m \ne seu ataque causa 4d12"
      }
    ]
  },
  {
    "id": "mortos_vivos",
    "name": "Mortos-Vivos",
    "circle": 2,
    "type": "universal",
    "school": "Necromancia",
    "execution": "completa",
    "range": "cur-\nto",
    "targetArea": "6 mortos-vivos",
    "duration": "sustentada",
    "description": "Execução: completa; Alcance: cur-\nto; Efeito: 6 mortos-vivos; Duração: \nsustentada.\nVocê conjura seis esqueletos capangas \nde tamanho Médio feitos de energia \nnegativa em espaços desocupados den-\ntro do alcance. Você pode gastar uma \nação de movimento para fazer os mor-\ntos-vivos andarem (eles têm desloca-\nmento 9m) ou uma ação padrão para \nfazê-los causar dano a criaturas adja-\ncentes (1d6+2 pontos de dano de tre-\nvas cada). Os esqueletos têm For 2, \nDes 2, Defesa 18 e todos os outros \natributos nulos; eles têm 1 PV e fa-\nlham automaticamente em qualquer \nteste de resistência ou oposto, mas são \nimunes a atordoamento, cansaço, dano \nnão letal, doença, encantamento , frio, \nilusão, paralisia, sono e veneno. Eles \ndesaparecem quando são reduzidos a \n0 PV ou no fim da cena. Os mortos-\n-vivos não agem sem receber uma or-\ndem. Usos criativos para capangas fora \nde combate ficam a critério do mestre.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o número de mortos-\n-vivos conjurados em"
      },
      {
        "cost": "+3 PM",
        "description": "em vez de esqueletos, conjura \ncarniçais. Requer 3º círculo."
      },
      {
        "cost": "+7 PM",
        "description": "em vez de esqueletos, conjura \nsombras. Requer 4º círculo.\nCarniçal: como esqueletos, mas têm \nFor 3, Des 3, Defesa 27 e causam \n1d8"
      }
    ]
  },
  {
    "id": "consagrar",
    "name": "Consagrar",
    "circle": 1,
    "type": "divina",
    "school": "Evocação",
    "execution": "padrão",
    "range": "longo",
    "targetArea": "esfera com 9m de raio",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: longo; \nÁrea: esfera com 9m de raio; Dura-\nção: 1 dia.\nVocê enche a área com energia posi-\ntiva. Pontos de vida curados por efei-\ntos de luz são maximizados dentro da\nárea. Isso também afeta dano causa-\ndo em mortos-vivos por esses efeitos. \nPor exemplo, Curar Ferimentos cura au-\ntomaticamente 18 PV. Esta magia não \npode ser lançada em uma área con-\ntendo um símbolo visível dedicado a \numa divindade que não a sua. Consa-\ngrar anula Profanar.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "além do normal, mortos-vivos \nna área sofrem -2 em testes e Defesa."
      },
      {
        "cost": "+2 PM",
        "description": "aumenta as penalidades para \nmortos-vivos em -1 (penalidade má-\nxima limitada pelo círculo máximo de \nmagia que você pode lançar)."
      }
    ]
  },
  {
    "id": "contato_extraplanar",
    "name": "Contato Extraplanar",
    "circle": 3,
    "type": "arcana",
    "school": "Adivinhação",
    "execution": "completa",
    "range": "pes-\nsoal",
    "targetArea": "você",
    "duration": "1 dia",
    "description": "Sua mente viaja até outro plano de \nexistência, onde entra em contato com \nseres como gênios e demônios. Você \nfirma um contrato com uma dessas en-\ntidades para que o auxilie, em troca de \nse alimentar de seu mana. Quando a \nmagia é lançada, você recebe 6d6 da-\ndos de auxílio. Enquanto a magia du-\nrar, sempre que for realizar um teste \nde perícia, você pode gastar 1d6 (mais \n1d6 para cada círculo de magias acima \ndo 3º que puder lançar) e adicionar o \nresultado como bônus no teste. No en-\ntanto, sempre que rolar um “6” num \ndesses dados, a entidade “suga” 1 PM \nde você. A magia termina se você gas-\ntar todos os dados, ficar sem PM ou no \nfim do dia (o que acontecer primeiro).",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o número de dados \nde auxílio em"
      }
    ]
  },
  {
    "id": "controlar_a_gravidade",
    "name": "Controlar a Gravidade",
    "circle": 4,
    "type": "arcana",
    "school": "Transmutação",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "cubo de 12m de lado",
    "duration": "sustentada",
    "description": "Execução: padrão; Alcance: médio; \nÁrea: cubo de 12m de lado; Duração: \nsustentada.\nVocê controla os efeitos da gravidade \ndentro da área. Ao lançar a magia, es-\ncolha um dos efeitos abaixo. Enquan-\nto a magia durar, você pode gastar uma \nação padrão para mudar o efeito.\nAumentar: no início de seus turnos, \ncada criatura na área deve fazer um \nteste de Atletismo. Se passar, fica fa-\ntigada. Se falhar, fica fatigada e caída.\nInverter: inverte a gravidade da área, \nfazendo com que criaturas e objetos \n“caiam” para cima, atingindo o topo \n(12m) em uma rodada. Se um obstá-\nculo (como um teto) impedir o movi-\nmento das criaturas, elas sofrem 1d6 \npontos de dano de impacto para cada \n1,5m de “queda”. Elas podem então se \nlevantar e caminhar no obstáculo, de \ncabeça para baixo. Se não houver obs-\ntáculo, as criaturas e objetos ficam ﬂu-\ntuando no topo da área afetada, sem \npoder sair do lugar. Criaturas voado-\nras podem se movimentar normalmen-\nte. Alguém adjacente a algo que possa \nagarrar tem direito a um teste de Reﬂe-\nxos para evitar a “queda”. A criatura \ndeve permanecer presa pela duração da \nmagia; caso contrário “cairá”."
  },
  {
    "id": "controlar_agua",
    "name": "Controlar Água",
    "circle": 3,
    "type": "divina",
    "school": "Transmutação",
    "execution": "padrão",
    "range": "longo",
    "targetArea": "esfera com 30m de raio",
    "duration": "Instantânea",
    "description": "Você controla os movimentos e com-\nportamentos da água. Ao lançar a ma-\ngia, escolha um dos efeitos abaixo.\nCongelar: toda a água mundana na área \né congelada. Criaturas nadando na \nárea ficam imóveis; escapar exige gas-\ntar uma ação padrão e passar num tes-\nte de Atletismo ou Acrobacia.\nDerreter: gelo mundano na área vira \nágua e a magia termina. A critério do \nmestre, isso pode criar terreno difícil.\nEnchente: eleva o nível da água munda-\nna na área em até 4,5m. A sua escolha, \nmuda área para alvo: uma embarcação. \nO alvo recebe +3m em seu desloca-\nmento pela duração do efeito.\nEvaporar: toda a água e gelo mundano \nna área evaporam instantaneamente e \na magia termina. Elementais da água, \nplantas monstruosas e criaturas com \nimunidade a frio na área sofrem 10d8 \npontos de dano de fogo; outras criatu-\nras vivas recebem metade desse dano \n(Fortitude reduz à metade).\n186\nMagia\nPartir: diminui o nível de toda água \nmundana na área em até 4,5m. Em um \ncorpo d’água raso, isso abre um cami-\nnho seco, que pode ser atravessado a \npé. Em um corpo d’água profundo, cria \num redemoinho que pode prender bar-\ncos (um teste de Pilotagem permite ao \npiloto livrar a embarcação). Elemen-\ntais da água na área ficam lentos.",
    "resistance": "veja texto"
  },
  {
    "id": "controlar_fogo",
    "name": "Controlar Fogo",
    "circle": 2,
    "type": "divina",
    "school": "Evocação",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "veja texto",
    "duration": "cena",
    "description": "Você pode criar, moldar, mover ou extin-\nguir chamas e emanações de calor. Ao \nlançar a magia, escolha um dos efeitos.\nChamejar: o alvo é armas escolhidas. \nElas causam +1d6 de dano de fogo. \nTambém afeta armas naturais e ata-\nques desarmados.\nEsquentar: o alvo é 1 objeto, que come-\nça a esquentar. Ele sofre 1d6 pontos de \ndano de fogo por rodada e causa o mes-\nmo dano a qualquer criatura que o es-\nteja segurando ou vestindo. A critério \ndo mestre, o objeto ou a criatura ves-\ntindo-o também podem ficar em cha-\nmas. Uma criatura pode gastar uma \nação completa para resfriar o obje-\nto (jogando areia ou se jogando numa \nfonte de água próxima, por exemplo) e \ncancelar o efeito da magia.\nExtinguir: o alvo é 1 chama de tamanho \nGrande ou menor, que é apagada. Isso \ncria uma nuvem de fumaça que ocu-\npa uma esfera com 3m de raio centra-\nda onde estava a chama. Dentro da fu-\nmaça, criaturas têm camuflagem leve.\nModelar: o alvo é 1 chama de tama-\nnho Grande ou menor. A cada roda-\nda, você pode gastar uma ação livre \npara movimentá-la 9m em qualquer \ndireção. Se atravessar o espaço ocupa-\ndo por uma criatura, causa 2d6 pon-\ntos de dano de fogo. Uma criatura só \npode receber dano dessa maneira uma \nvez por rodada.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "muda a duração para susten-\ntada e a resistência para Reflexos re-\nduz à metade. Em vez do normal, você \ndeve escolher o seguinte efeito. Laba-\nredas: a cada rodada, você pode gastar \numa ação de movimento para proje-\ntar uma labareda, acertando um alvo \nem alcance curto a partir da chama. O \nalvo sofre 4d6 pontos de dano de fogo \n(Reflexos reduz à metade)."
      },
      {
        "cost": "+2 PM",
        "description": "aumenta o dano em"
      }
    ]
  },
  {
    "id": "controlar_madeira",
    "name": "Controlar Madeira",
    "circle": 2,
    "type": "divina",
    "school": "Transmutação",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "1 objeto de madeira Grande ou \nmenor",
    "duration": "cena",
    "description": "Você molda, retorce, altera ou repele \nmadeira. Se lançar esta magia num ob-\njeto de uma criatura involuntária, ela \ntem direito a um teste de Vontade para \nanulá-la. Ao lançar a magia, escolha.\nFortalecer: deixa o alvo mais resistente. \nArmas têm seu dano aumentado em \num passo. Escudos têm seu bônus de \nDefesa aumentado em +2 (isso é uma \nmelhoria no item, portanto é cumula-\ntiva com outras magias). Esses e ou-\ntros itens de madeira recebem +5 na \nRD e dobram seus PV.\nModelar: muda a forma do alvo. Pode \ntransformar um galho em espada, \ncriar uma porta onde antes havia ape-\nnas uma parede, transformar um tron-\nco em uma caixa... Mas não pode criar \nmecanismos complexos (como uma \nbesta) ou itens consumíveis.\nRepelir: o alvo é repelido por você. Se \nfor uma arma, ataques feitos com ela \ncontra você falham automaticamente. \nSe for uma porta ou outro objeto que \npossa ser aberto, ele vai se abrir quan-\ndo você se aproximar, mesmo que es-\nteja trancado. Um objeto que vá atin-\ngi-lo, como uma carroça, tronco ou \nbarril, vai desviar ou parar adjacente a \nvocê, sem lhe causar dano. Os efeitos \nde regras em outros objetos de madei-\nra ficam a cargo do mestre.\nRetorcer: estraga o alvo. Uma porta re-\ntorcida emperra (exigindo um teste \nde Força contra CD 25 para ser aber-\nta). Armas e itens retorcidos impõem \n-5 em testes de perícia. Escudos retor-\ncidos deixam de oferecer bônus (mas \nainda impõem penalidades). Um barco \nretorcido começa a afundar e naufraga \nao final da cena. Os efeitos de regras \nem outros objetos de madeira ficam a \ncargo do mestre.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "muda o alcance para pessoal, \no alvo para você e a duração para um \ndia. Você e seu equipamento se trans-\nformam em uma árvore de tamanho \nGrande. Nessa forma, você não pode\nfalar ou fazer ações físicas, mas con-\nsegue perceber seus arredores normal-\nmente. Se for atacado nessa forma, a \nmagia é dissipada. Um teste de Sobre-\nvivência (CD 30) revela que você não é \numa árvore verdadeira."
      },
      {
        "cost": "+3 PM",
        "description": "muda o alvo para área de qua-\ndrado com 9m de lado e a duração para \ncena. Em vez do normal, qualquer \nvegetação na área fica rígida e afia-\nda. A área é considerada terreno difí-\ncil e criaturas que andem nela sofrem \n1d6 pontos de dano de corte para cada \n1,5m que avancem."
      },
      {
        "cost": "+7 PM",
        "description": "muda o tamanho do alvo para \nEnorme ou menor. Requer 3º círculo."
      }
    ]
  },
  {
    "id": "controlar_o_clima",
    "name": "Controlar o Clima",
    "circle": 4,
    "type": "divina",
    "school": "Transmutação",
    "execution": "completa",
    "range": "2km",
    "targetArea": "esfera com 2km de raio",
    "duration": "Instantânea",
    "description": "Execução: completa; Alcance: 2km; \nÁrea: esfera com 2km de raio; Dura-\nção: 4d12 horas.\nVocê muda o clima da área onde se \nencontra, podendo criar qualquer \ncondição climática: chuva, neve, ven-\ntos, névoas... Veja o Capítulo 6: O \nMestre para os efeitos do clima."
  },
  {
    "id": "controlar_o_tempo",
    "name": "Controlar o Tempo",
    "circle": 5,
    "type": "arcana",
    "school": "Transmutação",
    "execution": "padrão",
    "range": "veja texto",
    "targetArea": "veja texto",
    "duration": "veja texto",
    "description": "Escolha um dos efeitos a seguir.\nCongelar o tempo: você gera uma bolha \ndo seu tamanho na qual o tempo passa \nmais lentamente. Para outras criaturas, \na bolha surge e desaparece instantanea-\nmente, mas, para você, ela dura 3 roda-\ndas (o que fornece 2 turnos extras após \no atual), durante as quais você pode \nagir e não é afetado por efeitos contí-\nnuos (como chamas). Porém, durante \nessas 3 rodadas, você e quaisquer efei-\ntos que você gerar não podem sair da \nárea que você ocupava quando lançou \nesta magia. Efeitos de área com dura-\nção maior que a da bolha voltam a agir \nnormalmente quando ela termina. Você \nnão pode congelar o tempo nem preparar \nações enquanto está sob esse efeito.\nSaltar no tempo: você e até 5 criaturas \nvoluntárias são transportadas de 1 a \n24 horas para o futuro, desaparecen-\ndo com um brilho. Vocês ressurgem \nno mesmo lugar, com a mesma velo-\ncidade e orientação; do seu ponto de\n187\nCapítulo Quatro\nvista, nenhum tempo se passou. Se \num objeto sólido agora ocupa o es-\npaço de uma criatura, ela ressurge na \nárea vazia mais próxima."
  },
  {
    "id": "controlar_plantas",
    "name": "Controlar Plantas",
    "circle": 1,
    "type": "divina",
    "school": "Transmutação",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "quadrado com 9m de lado",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: curto; \nÁrea: quadrado com 9m de lado; Du-\nração: cena; Resistência: Reflexos \nanula.\nEsta magia só pode ser lançada em \numa área com vegetação. As plantas \nse enroscam nas criaturas da área. \nAquelas que falharem na resistência \nficam enredadas. Uma vítima pode \nse libertar com uma ação padrão e \num teste de Acrobacia ou Atletismo. \nAlém disso, a área é considerada ter-\nreno difícil. No início de seus turnos, \na vegetação tenta enredar novamen-\nte qualquer criatura na área, exigindo \num novo teste de Reflexos.",
    "resistance": "Reflexos \nanula",
    "upgrades": [
      {
        "cost": "Truque",
        "description": "muda a área para alvo de 1 \nplanta e a resistência para nenhuma. \nEm vez do normal, você pode fazer a \nplanta se mover como se fosse animada. \nEla não pode causar dano ou atrapalhar \na concentração de um conjurador."
      },
      {
        "cost": "+1 PM",
        "description": "muda a duração para instantâ-\nnea. Em vez do normal, as plantas na \nárea diminuem, como se tivessem sido \npodadas. Terreno difícil muda para ter-\nreno normal e não fornece camufla-\ngem. Esse efeito dissipa o uso normal \nde Controlar Plantas."
      },
      {
        "cost": "+1 PM",
        "description": "além do normal, criaturas que \nfalhem na resistência também ficam \nimóveis."
      },
      {
        "cost": "+2 PM",
        "description": "muda o alcance para pessoal, a \nárea para alvo (você) e a resistência para \nnenhuma. Em vez do normal, você con-\nsegue se comunicar com plantas, que \ncomeçam com atitude prestativa em re-\nlação a você. Além disso, você pode fa-\nzer testes de Diplomacia com plantas. \nEm geral, plantas têm uma percepção \nlimitada de seus arredores e normal-\nmente fornecem respostas simplórias."
      }
    ]
  },
  {
    "id": "controlar_terra",
    "name": "Controlar Terra",
    "circle": 3,
    "type": "divina",
    "school": "Transmutação",
    "execution": "padrão",
    "range": "longo",
    "targetArea": "9 cubos com 1,5m de lado",
    "duration": "instantânea",
    "description": "Execução: padrão; Alcance: longo; \nÁrea: 9 cubos com 1,5m de lado; \nDuração: instantânea; Resistência: \nveja texto.\nVocê manipula a densidade e a forma de \ntoda terra, pedra, lama, argila ou areia \nna área. Ao lançar a magia, escolha.\nAmolecer: se afetar o teto, uma coluna \nou suporte, provoca um desabamen-\nto que causa 10d6 pontos de dano de \nimpacto às criaturas na área (Reflexos \nreduz à metade). Se afetar um piso de \nterra ou pedra, cria terreno difícil de \nareia ou argila, respectivamente.\nModelar: pode usar pedra ou argila para \ncriar um ou mais objetos simples de ta-\nmanho Enorme ou menor (sem meca-\nnismos ou partes móveis). Por exem-\nplo, pode transformar um tijolo em \numa maça, criar uma passagem onde \nantes havia apenas uma parede ou le-\nvantar uma ou mais paredes que ofe-\nrecem cobertura total (RD 8 e 50 PV \npara cada 3m).\nSolidificar: transforma lama ou areia em \nterra ou pedra. Criaturas com os pés \nna superfície ficam agarradas. Elas po-\ndem se soltar com uma ação padrão e \num teste de Acrobacia ou Atletismo.",
    "resistance": "veja texto",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "aumenta o número de cubos \nde 1,5m em"
      }
    ]
  },
  {
    "id": "convocacao_instantanea",
    "name": "Convocação Instantânea",
    "circle": 3,
    "type": "arcana",
    "school": "Convocação",
    "execution": "padrão",
    "range": "ilimitado",
    "targetArea": "1 objeto de até 2 espaços",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: ilimitado; \nAlvo: 1 objeto de até 2 espaços; Dura-\nção: instantânea.\nVocê invoca um objeto de qualquer lu-\ngar para sua mão. O item deve ter sido \npreviamente preparado com uma runa \npessoal sua (ao custo de T$ 5).\nA magia não funciona se o objeto es-\ntiver com outra criatura, mas você sa-\nberá onde ele está e quem o está car-\nregando (ou sua descrição física, caso \nnão conheça a criatura).",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "além do normal, até 1 hora \napós ter lançado a magia, você pode \ngastar uma ação de movimento para \nenviar o objeto de volta para o local em \nque ele estava antes."
      },
      {
        "cost": "+1 PM",
        "description": "muda o alvo para um baú Mé-\ndio, a duração para permanente e adi-\nciona sacrifício de 1 PM. Em vez do nor-\nmal, você esconde o baú no Éter Entre \nMundos, com até 20 espaços de equipa-\nmento. A magia faz com que qualquer \nobjeto caiba no baú, independentemen-\nte do seu tamanho. Uma vez escondido, \nvocê pode convocar o baú para um es-\npaço livre adjacente, ou de volta para o \nÉter, com uma ação padrão. Componen-\nte material: baú construído com matéria-\n-prima da melhor qualidade (T$ 1.000). \nVocê deve ter em mãos uma miniatura \ndo baú, no valor de T$ 100, para invo-\ncar o baú verdadeiro."
      },
      {
        "cost": "+2 PM",
        "description": "aumenta o número de alvos \nem"
      }
    ]
  },
  {
    "id": "cranio_voador_de_vladislav",
    "name": "Crânio Voador de Vladislav",
    "circle": 2,
    "type": "arcana",
    "school": "Necromancia",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "1 criatura",
    "duration": "instantânea",
    "description": "Esta magia cria um crânio envolto em \nenergia negativa. Quando atinge o \nalvo, ele causa 4d8+4 pontos de dano \nde trevas e se desfaz emitindo um som \nhorrendo, deixando abalado o alvo e \ntodos os inimigos num raio de 3m dele \n(criaturas já abaladas ficam apavoradas \npor 1d4 rodadas). Passar no teste de \nresistência diminui o dano à metade e \nevita a condição (as demais criaturas \nna área também tem direito ao teste \nde resistência, para evitar a condição).",
    "resistance": "Fortitude parcial",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o dano em"
      }
    ]
  },
  {
    "id": "criar_elementos",
    "name": "Criar Elementos",
    "circle": 1,
    "type": "divina",
    "school": "Convocação",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "elemento escolhido",
    "duration": "instantânea",
    "description": "Execução: padrão; Alcance: curto; \nEfeito: elemento escolhido; Duração: \ninstantânea.\n188\nMagia\nVocê cria uma pequena porção de um \nelemento, a sua escolha. Os elemen-\ntos criados são reais, não mágicos. Ele-\nmentos físicos devem surgir em uma \nsuperfície. Em vez de um cubo, pode-\n-se criar objetos simples (sem partes \nmóveis) feitos de gelo, terra ou pedra.\nÁgua: enche um recipiente de tamanho \nMinúsculo (como um odre) com água \npotável ou cria um cubo de gelo de ta-\nmanho Minúsculo.\nAr: cria um vento fraco em um qua-\ndrado de 1,5m. Isso purifica a área de \nqualquer gás ou fumaça, ou remove \nnévoa por uma rodada.\nFogo: cria uma chama que ilumina \ncomo uma tocha. Você pode segurá-la \nna palma de sua mão sem se queimar, \nou fazê-la surgir em um quadrado de \n1,5m. Se uma criatura ou objeto esti-\nver no quadrado, sofre 1d6 pontos de \ndano de fogo; se falhar num teste de \nReflexos, fica em chamas.\nTerra: cria um cubo de tamanho Minús-\nculo feito de terra, argila ou pedra.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "aumenta a quantidade do ele-\nmento em um passo (uma categoria de \ntamanho para água ou terra,"
      },
      {
        "cost": "+1 PM",
        "description": "muda o efeito para alvo 1 cria-\ntura ou objeto e a resistência para Re-\nflexos reduz à metade. Se escolher \nágua ou terra, você arremessa o cubo \nou objeto criado no alvo, causando 2d4 \npontos de dano de impacto. Para cada \ncategoria de tamanho acima de Minús-\nculo, o dano aumenta em um passo. O \ncubo se desfaz em seguida."
      }
    ]
  },
  {
    "id": "criar_ilusao",
    "name": "Criar Ilusão",
    "circle": 1,
    "type": "arcana",
    "school": "Ilusão",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "ilusão que se estende a até 4 \ncubos de 1,5m",
    "duration": "cena",
    "description": "Execução: padrão; Alcance: médio; \nEfeito: ilusão que se estende a até 4 \ncubos de 1,5m; Duração: cena; Resis-\ntência: Vontade desacredita.\nEsta magia cria uma ilusão visual (uma \ncriatura, uma parede...) ou sonora (um \ngrito de socorro, um uivo assustador...). \nA magia cria apenas imagens ou sons \nsimples, com volume equivalente ao \ntom de voz normal para cada cubo de \n1,5m no efeito. Não é possível criar \ncheiros, texturas ou temperaturas, nem \nsons complexos, como uma música ou \ndiálogo. Criaturas e objetos atravessam \numa ilusão sem sofrer dano, mas a ma-\ngia pode, por exemplo, esconder uma \narmadilha ou inimigo. A magia é dissi-\npada se você sair do alcance.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "muda a duração para susten-\ntada. A cada rodada você pode gastar \numa ação livre para mover a imagem \nou alterar levemente o som, como au-\nmentar o volume ou fazer com que pa-\nreça se afastar ou se aproximar, ain-\nda dentro dos limites do efeito. Você \npode, por exemplo, criar a ilusão de \num fantasma que anda pela sala, con-\ntrolando seus movimentos. Quando \nvocê para de sustentar a magia, a ima-\ngem ou som persistem por mais uma \nrodada antes de a magia se dissipar."
      },
      {
        "cost": "+1 PM",
        "description": "aumenta o efeito da ilusão em"
      },
      {
        "cost": "+1 PM",
        "description": "também pode criar ilusões de \nimagem e sons combinados."
      },
      {
        "cost": "+1 PM",
        "description": "também pode criar sons com-\nplexos com volume máximo equivalen-\nte ao que cinco pessoas podem produ-\nzir para cada cubo de 1,5m no efeito. \nCom uma ação livre, você pode alterar \no volume do som ou fazê-lo se apro-\nximar ou se afastar dentro do alcance."
      },
      {
        "cost": "+2 PM",
        "description": "também pode criar odores e \nsensações térmicas, que são percebi-\ndos a uma distância igual ao dobro do \ntamanho máximo do efeito. Por exem-\nplo, uma miragem de uma fogueira \ncom 4 cubos de 1,5m poderia emanar \ncalor e cheiro de queimado a até 12m."
      },
      {
        "cost": "+2 PM",
        "description": "muda o alcance para longo e o \nefeito para esfera com 30m de raio. Em \nvez do normal, você cria um som mui-\nto alto, equivalente a uma multidão. \nCriaturas na área lançam magias como \nse estivessem em uma condição ruim e \na CD de testes de Percepção para ouvir \naumenta em"
      },
      {
        "cost": "+2 PM",
        "description": "também criar sensações táteis, \ncomo texturas; criaturas que não sai-\nbam que é uma ilusão não conseguem \natravessá-la sem passar em um teste de \nVontade (objetos ainda a atravessam). \nA ilusão ainda é incapaz de causar ou \nsofrer dano. Requer 2º círculo."
      }
    ]
  },
  {
    "id": "cupula_de_repulsao",
    "name": "Cúpula de Repulsão",
    "circle": 4,
    "type": "divina",
    "school": "Abjuração",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "sustentada",
    "description": "Execução: padrão; Alcance: pessoal; \nAlvo: você; Duração: sustentada; Re-\nsistência: Vontade anula.\nUma cúpula de energia invisível o cer-\nca, impedindo a aproximação de cer-\ntas criaturas. Escolha um tipo de cria-\ntura (animais, espíritos, monstros...) \nou uma raça de humanoides (elfos, go-\nblins, minotauros..). Criaturas do gru-\npo escolhido que tentem se aproximar \na menos de 3m de você (ou seja, que \ntentem ficar adjacentes a você) devem \nfazer um teste de Vontade. Se falha-\nrem, não conseguem, gastam a ação e \nsó podem tentar novamente na rodada \nseguinte. Isso impede ataques corpo a \ncorpo, mas não ataques ou outros efei-\ntos à distância. Se você tentar se apro-\nximar além do limite de 3m, rompe a \ncúpula e a magia é dissipada.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "a cúpula impede criaturas de \nse aproximarem a menos de 4,5m de \nvocê (ou seja, deve haver dois quadra-\ndos entre você e as criaturas)."
      }
    ]
  },
  {
    "id": "curar_ferimentos",
    "name": "Curar Ferimentos",
    "circle": 1,
    "type": "divina",
    "school": "Evocação",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura",
    "duration": "instantânea",
    "description": "Você canaliza luz que recupera 2d8+2 \npontos de vida na criatura tocada.\n Curar Ferimentos anula Infligir Ferimentos.",
    "upgrades": [
      {
        "cost": "Truque",
        "description": "muda o alvo para 1 morto-\n-vivo. Em vez do normal, causa 1d8 \npontos de dano de luz (Vontade reduz \nà metade)."
      },
      {
        "cost": "+1 PM",
        "description": "aumenta a cura em"
      },
      {
        "cost": "+2 PM",
        "description": "também remove uma condi-\nção de cansaço do alvo."
      },
      {
        "cost": "+2 PM",
        "description": "muda o alcance para curto."
      }
    ]
  },
  {
    "id": "deflagracao_de_mana",
    "name": "Deflagração de Mana",
    "circle": 5,
    "type": "arcana",
    "school": "Evocação",
    "execution": "completa",
    "range": "pes-\nsoal",
    "targetArea": "esfera com 15m de raio",
    "duration": "instantânea",
    "description": "Execução: completa; Alcance: pes-\nsoal; Área: esfera com 15m de raio; \nDuração: instantânea; Resistência: \nFortitude parcial.\nApós concentrar seu mana, você ema-\nna energia, como uma estrela em ple-\nna terra. Todas as criaturas na área so-\nfrem 150 pontos de dano de essência e \ntodos os itens mágicos (exceto artefa-\ntos) tornam-se mundanos. Você não é \nafetado pela magia. Alvos que passem \nno teste de Fortitude sofrem metade \ndo dano e seus itens mágicos voltam a \nfuncionar após um dia.\n189\nCapítulo Quatro",
    "resistance": "Fortitude parcial",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "aumenta o dano em"
      }
    ]
  },
  {
    "id": "desejo",
    "name": "Desejo",
    "circle": 5,
    "type": "arcana",
    "school": "Transmutação",
    "execution": "completa",
    "range": "veja \ntexto",
    "targetArea": "veja texto",
    "duration": "veja \ntexto",
    "description": "Esta é a mais poderosa das magias ar-\ncanas, permitindo alterar a realidade a \nseu bel-prazer. Você pode:\n•\t Dissipar os efeitos de qualquer ma-\ngia de 4º círculo ou menor.\n•\t Transportar até 10 criaturas volun-\ntárias em alcance longo para qualquer \noutro local, em qualquer plano.\n•\t Desfazer um acontecimento recen-\nte. A magia permite que um teste re-\nalizado por uma criatura em alcance \nlongo na última rodada seja realizado \nnovamente. Por exemplo, se um alia-\ndo morreu na última rodada devido ao \nataque de um inimigo, você pode obri-\ngar o inimigo a refazer esse ataque.\nVocê pode desejar por algo ainda mais \npoderoso. Nesse caso, a magia requer \no sacrifício de 2 PM e pode fazer coi-\nsas como:\n•\t Criar um item mundano de até T$ \n30.000.\n•\t Duplicar os efeitos de qualquer ma-\ngia de até 4º círculo. Caso a magia pre-\ncise de um componente material para \nser lançada, ainda é necessário provi-\ndenciar o componente.\n• Aumentar um atributo de uma cria-\ntura em +1. Cada atributo só pode ser \naumentado uma vez com Desejo.",
    "resistance": "veja texto"
  },
  {
    "id": "desespero_esmagador",
    "name": "Desespero Esmagador",
    "circle": 2,
    "type": "arcana",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "cone de 6m",
    "duration": "instan-\ntânea",
    "description": "Humanoides na área são acometidos de \ngrande tristeza, ficando fracos e frustra-\ndos até o fim da cena (ou por uma roda-\nda, se passarem no teste de resistência).",
    "resistance": "Vontade parcial",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "em vez do normal, as condi-\nções adquiridas são debilitado e es-\nmorecido."
      },
      {
        "cost": "+3 PM",
        "description": "em vez do normal, afeta qual-\nquer tipo de criatura."
      }
    ]
  },
  {
    "id": "desintegrar",
    "name": "Desintegrar",
    "circle": 4,
    "type": "arcana",
    "school": "Transmutação",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "1 criatura ou objeto",
    "duration": "instantânea",
    "description": "Execução: padrão; Alcance: médio; \nAlvo: 1 criatura ou objeto; Duração: \ninstantânea; Resistência: Fortitude \nparcial.\nVocê dispara um raio fino e esverdeado \nque causa 10d12 pontos de dano de \nessência. Se o alvo passar no teste de \nresistência, em vez disso sofre 2d12 \npontos de dano.\nIndependentemente do resultado do \nteste de Fortitude, se os PV do alvo fo-\nrem reduzidos a 0 ou menos, ele será \ncompletamente desintegrado, restando \napenas pó.",
    "resistance": "Fortitude \nparcial"
  },
  {
    "id": "despedacar",
    "name": "Despedaçar",
    "circle": 1,
    "type": "divina",
    "school": "Evocação",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 criatura ou objeto mundano \nPequeno",
    "duration": "instantânea",
    "description": "Execução: padrão; Alcance: curto; \nAlvo: 1 criatura ou objeto mundano \nPequeno; Duração: instantânea; Re-\nsistência: Fortitude parcial.\nEsta magia emite um som alto e agu-\ndo. O alvo sofre 1d8+2 pontos de dano \nde impacto (ou o dobro disso e igno-\nra RD se for um construto ou objeto \nmundano) e fica atordoado por uma \nrodada (apenas uma vez por cena). Um \nteste de Fortitude reduz o dano à me-\ntade e evita o atordoamento. Despeda-\nçar anula Transmutar Objetos.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o dano em"
      },
      {
        "cost": "+2 PM",
        "description": "muda o alvo para objeto mun-\ndano Médio. Requer 2º círculo."
      },
      {
        "cost": "+5 PM",
        "description": "muda o alvo para objeto mun-\ndano Grande. Requer 3º círculo."
      },
      {
        "cost": "+9 PM",
        "description": "muda o alvo para objeto mun-\ndano Enorme. Requer 4º círculo."
      },
      {
        "cost": "+14 PM",
        "description": "muda o alvo para objeto \nmundano Colossal. Requer 5º círculo."
      },
      {
        "cost": "+5 PM",
        "description": "muda o alcance para pessoal \ne o alvo para área: esfera com 6m de \nraio. Todas as criaturas e objetos mun-\ndanos na área são afetados."
      }
    ]
  },
  {
    "id": "despertar_consciencia",
    "name": "Despertar Consciência",
    "circle": 3,
    "type": "divina",
    "school": "Encantamento",
    "execution": "completa",
    "range": "toque",
    "targetArea": "1 animal ou planta",
    "duration": "1 dia",
    "description": "Execução: completa; Alcance: toque; \nAlvo: 1 animal ou planta; Duração: \n1 dia.\nVocê desperta a consciência de um ani-\nmal ou planta. O alvo se torna um par-\nceiro veterano de um tipo a sua esco-\nlha entre ajudante, combatente, fortão, \nguardião, médico, perseguidor ou vigi-\nlante. Se usar esta magia em outro par-\nceiro que já possua, o nível de poder de \num de seus tipos aumenta em um pas-\nso (apenas uma vez por parceiro). Se já \nfor um parceiro mestre, recebe o bônus \nde outro tipo de parceiro iniciante (en-\ntre as escolhas acima). O alvo se torna \numa criatura racional, com Inteligência \n-1, e pode falar.",
    "upgrades": [
      {
        "cost": "+4 PM",
        "description": "muda o alvo para 1 escultura \nmundana inanimada. Além do normal, \no alvo tem as mesmas características de \num construto."
      }
    ]
  },
  {
    "id": "detectar_ameacas",
    "name": "Detectar Ameaças",
    "circle": 1,
    "type": "divina",
    "school": "Adivinhação",
    "execution": "Padrão",
    "range": "Curto",
    "targetArea": "1 criatura",
    "duration": "Instantânea",
    "description": ""
  },
  {
    "id": "dificultar_deteccao",
    "name": "Dificultar Detecção",
    "circle": 3,
    "type": "arcana",
    "school": "Abjuração",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura ou objeto",
    "duration": "1 dia",
    "description": "Execução: padrão; Alcance: toque; \nAlvo: 1 criatura ou objeto; Duração: \n1 dia.\n190\nMagia\nEsta magia oculta a presença do alvo \ncontra qualquer meio mágico de detec-\nção, inclusive detectar magia. Um con-\njurador que lance uma magia de adi-\nvinhação para detectar a presença ou \nlocalização do alvo deve fazer um teste \nde Vontade. Se falhar, a magia não fun-\nciona, mas os PM são gastos mesmo \nassim. Se for lançada sobre uma cria-\ntura, Dificultar Detecção protege tanto a \ncriatura quanto seu equipamento.",
    "upgrades": [
      {
        "cost": "+4 PM",
        "description": "muda o alvo para área de cubo \nde 9m. Qualquer criatura ou objeto na \nárea recebe o efeito da magia enquanto \nestiver dentro dela."
      }
    ]
  },
  {
    "id": "disfarce_ilusorio",
    "name": "Disfarce Ilusório",
    "circle": 1,
    "type": "arcana",
    "school": "Ilusão",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "cena",
    "description": "Execução: padrão; Alcance: pessoal; \nAlvo: você; Duração: cena; Resistên-\ncia: Vontade desacredita.\nVocê muda a aparência do alvo, in-\ncluindo seu equipamento. Isso inclui \naltura, peso, tom de pele, cor de ca-\nbelo, timbre de voz etc. O alvo rece-\nbe +10 em testes de Enganação para \ndisfarce. O alvo não recebe novas habi-\nlidades (você pode ficar parecido com \noutra raça, mas não ganhará as habi-\nlidades dela), nem modifica o equipa-\nmento (uma espada longa disfarçada \nde bordão continua funcionando e cau-\nsando dano como uma espada).",
    "upgrades": [
      {
        "cost": "Truque",
        "description": "muda o alcance para toque, \no alvo para 1 criatura e a duração para \n1 semana. Em vez do normal, você faz \numa pequena alteração na aparência \ndo alvo, como deixar o nariz vermelho \nou fazer brotar um gerânio no alto da \ncabeça. A mudança é inofensiva, mas \npersistente - se a flor for arrancada, \npor exemplo, outra nascerá no local."
      },
      {
        "cost": "+1 PM",
        "description": "muda o alcance para curto e o \nalvo para 1 objeto. Você pode, por exem-\nplo, transformar pedaços de ferro em \nmoedas de ouro. Você recebe"
      },
      {
        "cost": "+2 PM",
        "description": "muda o alcance para curto e o \nalvo para 1 criatura. Uma criatura in-\nvoluntária pode anular o efeito com \num teste de Vontade."
      },
      {
        "cost": "+2 PM",
        "description": "a ilusão inclui odores e sensa-\nções. Isso muda o bônus em testes de \nEnganação para disfarce para"
      },
      {
        "cost": "+3 PM",
        "description": "muda o alcance para curto e \no alvo para criaturas escolhidas. Cada \ncriatura pode ter uma aparência dife-\nrente. Criaturas involuntárias podem \nanular o efeito com um teste de Von-\ntade. Requer 2º círculo."
      }
    ]
  },
  {
    "id": "dispersar_as_trevas",
    "name": "Dispersar as Trevas",
    "circle": 3,
    "type": "divina",
    "school": "Evocação",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "esfera com 6m de raio",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: pessoal; \nÁrea: esfera com 6m de raio; Dura-\nção: veja texto.\nEsta magia cria um forte brilho (mul-\nticolorido ou de uma cor que remeta a \nsua divindade) que causa diversos efei-\ntos. Todas as magias de 3º círculo ou \nmenor ativas na área são dissipadas se \nvocê passar num teste de Religião con-\ntra a CD de cada magia. Seus aliados \nna área recebem +4 em testes de re-\nsistência e redução de trevas 10 até o \nfim da cena, protegidos por uma aura \nsutil da mesma cor. Inimigos na área \nficam cegos por 1d4 rodadas (apenas \numa vez por cena). Dispersar as Trevas \nanula Anular a Luz (este efeito tem du-\nração instantânea).",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o bônus nas resistên-\ncias em"
      },
      {
        "cost": "+4 PM",
        "description": "muda o alcance para curto, a \nárea para alvo 1 criatura e a duração \npara cena. O alvo fica imune a efeitos \nde trevas."
      },
      {
        "cost": "+4 PM",
        "description": "muda o círculo máximo de \nmagias dissipadas para 4º. Requer 4º \ncírculo."
      }
    ]
  },
  {
    "id": "dissipar_magia",
    "name": "Dissipar Magia",
    "circle": 2,
    "type": "universal",
    "school": "Abjuração",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "1 criatura ou 1 obje-\nto mágico ou esfera com 3m de raio",
    "duration": "instantânea",
    "description": "Você dissipa outras magias que este-\njam ativas, como se sua duração tives-\nse acabado. Note que efeitos de magias \ninstantâneas não podem ser dissipados \n(não se pode dissipar uma Bola de Fogo \nou Relâmpago depois que já causaram \ndano...). Se lançar essa magia em uma \ncriatura ou área, faça um teste de Misti-\ncismo; você dissipa as magias com CD \nigual ou menor que o resultado do tes-\nte. Se lançada contra um item mágico, o \ntransforma em um item mundano por \n1d6 rodadas (Vontade anula).",
    "upgrades": [
      {
        "cost": "+12 PM",
        "description": "muda a área para esfera com \n9m de raio. Em vez do normal, cria um \nefeito de disjunção. Todas as magias na \nárea são automaticamente dissipadas e \ntodos os itens mágicos na área, exce-\nto aqueles que você estiver carregando, \nviram itens mundanos por uma cena \n(com direito a um teste de Vontade para \nevitar esse efeito). Requer 5º círculo."
      }
    ]
  },
  {
    "id": "duplicata_ilusoria",
    "name": "Duplicata Ilusória",
    "circle": 4,
    "type": "arcana",
    "school": "Ilusão",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "cópia ilusória",
    "duration": "cena",
    "description": "Você cria uma cópia ilusória semir-\nreal de... você mesmo! Ela é idêntica \nem aparência, som e cheiro, mas é in-\ntangível. A cada turno, você escolhe se \nverá e ouvirá através da duplicata ou \nde seu corpo original. A cópia repro-\nduz todas as suas ações, incluindo fala. \nQualquer magia com alcance de toque \nou maior que você lançar pode se origi-\nnar da duplicata, em vez do seu corpo \noriginal. As magias afetam outros al-\nvos normalmente, com a única diferen-\nça de se originarem da cópia, em vez \nde você. Se quiser que a duplicata faça \nalgo diferente de você, você deve gas-\ntar uma ação de movimento. Qualquer \ncriatura que interagir com a cópia tem \ndireito a um teste de Vontade para per-\nceber que é uma ilusão. As magias que \nse originam dela, no entanto, são reais. \nA cópia desaparece se sair do alcance."
  },
  {
    "id": "enfeiticar",
    "name": "Enfeitiçar",
    "circle": 1,
    "type": "arcana",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 humanoide",
    "duration": "cena",
    "description": "O alvo fica enfeitiçado (veja a pági-\nna 394). Um alvo hostil ou que esteja \nenvolvido em um combate recebe +5 \nem seu teste de resistência. Se você ou \nseus aliados tomarem qualquer ação \nhostil contra o alvo, a magia é dissi-\npada e o alvo retorna à atitude que ti-\nnha antes (ou piorada, de acordo com \no mestre).",
    "resistance": "Vontade anula",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "em vez do normal, você suge-\nre uma ação para o alvo e ele obede-\nce. A sugestão deve ser feita de modo \nque pareça aceitável, a critério do mes-\ntre. Pedir ao alvo que pule de um pre-\ncipício, por exemplo, dissipa a magia. \nJá sugerir a um guarda que descanse \num pouco, de modo que você e seus \naliados passem por ele, é aceitável. \nQuando o alvo executa a ação, a ma-\ngia termina. Você pode determinar \numa condição específica para a suges-\ntão: por exemplo, que um rico merca-\ndor doe suas moedas para o primeiro \nmendigo que encontrar."
      },
      {
        "cost": "+5 PM",
        "description": "muda o alvo para 1 espírito ou \nmonstro. Requer 3º círculo."
      },
      {
        "cost": "+5 PM",
        "description": "afeta todos os alvos dentro do \nalcance.\n191\nCapítulo Quatro"
      }
    ]
  },
  {
    "id": "engenho_de_mana",
    "name": "Engenho de Mana",
    "circle": 5,
    "type": "arcana",
    "school": "Abjuração",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "disco de energia com 1,5m de \ndiâmetro",
    "duration": "sustentada",
    "description": "Você cria um disco de energia que lem-\nbra uma roda de engenho e flutua no \nponto em que foi conjurado. O disco é \nimune a dano, não pode ser movido e \nfaz uma contramágica automática con-\ntra qualquer magia lançada em alcan-\nce médio dele (exceto as suas), usan-\ndo seu teste de Misticismo. Caso vença \no teste, o engenho não só anula a ma-\ngia como absorve os PM usados para \nlançá-la, acumulando PM temporários. \nNo seu turno, se estiver ao alcance do \ndisco, você pode gastar PM nele para \nlançar magias.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "em vez de flutuar no ponto em \nque foi conjurado, o disco flutua atrás de \nvocê, mantendo-se sempre adjacente."
      }
    ]
  },
  {
    "id": "enxame_de_pestes",
    "name": "Enxame de Pestes",
    "circle": 2,
    "type": "divina",
    "school": "Convocação",
    "execution": "completa",
    "range": "médio",
    "targetArea": "1 enxame Médio (quadrado de \n1,5m)",
    "duration": "sustentada",
    "description": "Resis-\ntência: Fortitude reduz à metade.\nVocê conjura um enxame de criaturas \na sua escolha, como besouros, gafa-\nnhotos, ratos, morcegos ou serpentes. \nO enxame pode passar pelo espaço de \noutras criaturas e não impede que ou-\ntras criaturas entrem no espaço dele. \nNo final de seus turnos, o enxame \ncausa 2d12 pontos de dano de corte a \nqualquer criatura em seu espaço (For-\ntitude reduz à metade). Você pode gas-\ntar uma ação de movimento para mo-\nver o enxame 12m.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o dano em"
      },
      {
        "cost": "+3 PM",
        "description": "muda a resistência para Refle-\nxos reduz à metade e o enxame para \ncriaturas maiores, como gatos, guaxi-\nnins, compsognatos ou kobolds. Ele \ncausa 3d12 pontos de dano (a sua es-\ncolha entre corte, impacto ou perfura-\nção). O resto da magia segue normal."
      },
      {
        "cost": "+5 PM",
        "description": "aumenta o número de enxa-\nmes em"
      },
      {
        "cost": "+7 PM",
        "description": "muda a resistência para Refle-\nxos reduz à metade e o enxame para \ncriaturas elementais. Ele causa 5d12 \npontos do dano (a sua escolha entre \nácido, eletricidade, fogo ou frio). O \nresto da magia segue normal. Requer \n4º círculo."
      }
    ]
  },
  {
    "id": "enxame_rubro_de_ichabod",
    "name": "Enxame Rubro de Ichabod",
    "circle": 3,
    "type": "arcana",
    "school": "Convocação",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "1 enxame Grande (quadrado \nde 3m)",
    "duration": "sustentada",
    "description": "Execução: padrão; Alcance: médio; \nEfeito: 1 enxame Grande (quadrado \nde 3m); Duração: sustentada; Resis-\ntência: Reflexos reduz à metade.\nVocê conjura um enxame de pequenas \ncriaturas da Tormenta. O enxame pode \npassar pelo espaço de outras criaturas \ne não impede que outras criaturas en-\ntrem no espaço dele. No final de cada \num de seus turnos, o enxame causa \n4d12 pontos de dano de ácido a qual-\nquer criatura em seu espaço (Refle-\nxos reduz à metade). Você pode gastar \numa ação de movimento para mover o \nenxame com deslocamento de 12m.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "além do normal, uma criatura \nque falhe no teste de Reflexos fica agar-\nrada (o enxame escala e cobre o corpo \ndela). A criatura pode gastar uma ação \npadrão e fazer um teste de Acrobacia \nou Atletismo para escapar. Se você mo-\nver o enxame, a criatura fica livre."
      },
      {
        "cost": "+2 PM",
        "description": "aumenta o dano em"
      },
      {
        "cost": "+2 PM",
        "description": "muda o dano para trevas."
      },
      {
        "cost": "+3 PM",
        "description": "o enxame vira Enorme (qua-\ndrado de 6m de lado)."
      },
      {
        "cost": "+3 PM",
        "description": "o enxame ganha deslocamento \nde voo 18m e passa a ocupar um cubo \nao invés de um quadrado."
      }
    ]
  },
  {
    "id": "erupcao_glacial",
    "name": "Erupção Glacial",
    "circle": 3,
    "type": "arcana",
    "school": "Evocação",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "quadrado de 6m de lado",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: médio; \nÁrea: quadrado de 6m de lado; Dura-\nção: instantânea; Resistência: Refle-\nxos parcial.\nEstacas de gelo irrompem do chão. \nCriaturas na área sofrem 4d6 de dano \nde corte, 4d6 de dano de frio e ficam \ncaídas. Passar no teste de Reflexos evi-\nta o dano de corte e a queda. As esta-\ncas duram pela cena, o que torna a área \nafetada terreno difícil, e concedem co-\nbertura leve para criaturas dentro da \nárea ou atrás dela. As estacas são des-\ntruídas caso sofram qualquer quanti-\ndade de dano por fogo mágico.",
    "resistance": "Refle-\nxos parcial",
    "upgrades": [
      {
        "cost": "+3 PM",
        "description": "aumenta o dano de frio em"
      }
    ]
  },
  {
    "id": "escudo_da_fe",
    "name": "Escudo da Fé",
    "circle": 1,
    "type": "divina",
    "school": "Abjuração",
    "execution": "reação",
    "range": "curto",
    "targetArea": "1 criatura",
    "duration": "1 turno",
    "description": "Um escudo místico se manifesta mo-\nmentaneamente para bloquear um gol-\npe. O alvo recebe +2 na Defesa.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "muda a execução para ação pa-\ndrão, o alcance para toque e a duração \npara cena."
      },
      {
        "cost": "+1 PM",
        "description": "também fornece ao alvo camu-\nflagem leve contra ataques à distância."
      },
      {
        "cost": "+2 PM",
        "description": "aumenta o bônus na Defesa \nem"
      },
      {
        "cost": "+2 PM",
        "description": "muda a execução para ação pa-\ndrão, o alcance para toque e a duração \npara cena. A magia cria uma conexão \nmística entre você e o alvo. Além do \nefeito normal, o alvo sofre metade do \ndano por ataques e efeitos; a outra me-\ntade do dano é transferida a você. Se \no alvo sair de alcance curto de você, a \nmagia é dissipada. Requer 2º círculo."
      }
    ]
  },
  {
    "id": "esculpir_sons",
    "name": "Esculpir Sons",
    "circle": 2,
    "type": "arcana",
    "school": "Ilusão",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "1 criatura ou objeto",
    "duration": "cena",
    "description": "Esta magia altera os sons emitidos \npelo alvo. Ela não é capaz de criar \nsons, mas pode omiti-los (como fazer \numa carroça ficar silenciosa) ou trans-\nformá-los (como fazer uma pessoa fi-\ncar com voz de passarinho). Você não \npode criar sons que não conhece (não \npode fazer uma criatura falar num idio-\nma que não conheça). Uma vez que es-\ncolha a alteração, ela não pode ser mu-\ndada. Um conjurador que tenha a voz \nmodificada drasticamente não poderá \nlançar magias.\n192\nMagia",
    "resistance": "Vontade anula",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o número de alvos \nem"
      }
    ]
  },
  {
    "id": "escuridao",
    "name": "Escuridão",
    "circle": 1,
    "type": "universal",
    "school": "Necromancia",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 objeto",
    "duration": "cena",
    "description": "Execução: padrão; Alcance: curto; \nAlvo: 1 objeto; Duração: cena; Resis-\ntência: Vontade anula (veja texto).\nO alvo emana sombras em uma área \ncom 6m de raio. Criaturas dentro da área \nrecebem camuflagem leve por escuridão \nleve. As sombras não podem ser ilumi-\nnadas por nenhuma fonte de luz natu-\nral. O objeto pode ser guardado (em um \nbolso, por exemplo) para interromper a \nescuridão, que voltará a funcionar caso \no objeto seja revelado. Se lançar a ma-\ngia num objeto de uma criatura involun-\ntária, ela tem direito a um teste de Von-\ntade para anulá-la. Escuridão anula Luz.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "aumenta a área da escuridão \nem"
      },
      {
        "cost": "+2 PM",
        "description": "muda o efeito para fornecer \ncamuflagem total por escuridão total. \n O alvo emana escuridão total e ela blo-\nqueia a visão na área e através dela."
      },
      {
        "cost": "+2 PM",
        "description": "muda o alvo para 1 criatura \ne a resistência para Fortitude parcial. \nVocê lança a magia nos olhos do alvo, \nque fica cego pela cena. Se passar na \nresistência, fica cego por 1 rodada. \nRequer 2º círculo."
      },
      {
        "cost": "+3 PM",
        "description": "muda a duração para um dia."
      }
    ]
  },
  {
    "id": "caleidoscopica",
    "name": "Caleidoscópica",
    "circle": 4,
    "type": "arcana",
    "school": "Ilusão",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "esfera com 6m de raio",
    "duration": "instan-\ntânea",
    "description": "Esta magia cria uma forte explosão de \nluzes estroboscópicas e sons cacofôni-\ncos que desorientam as criaturas atin-\ngidas. O efeito que cada criatura sofre \ndepende do nível ou ND dela.\nNível ou ND 4 ou menor: se falhar no tes-\nte de resistência, fica inconsciente. Se \npassar, fica atordoada por 1d4 rodadas \ne enjoada pelo resto da cena.\nNível ou ND entre 5 e 9: se falhar no teste \nde resistência, fica atordoada por 1d4 \nrodadas e enjoada pelo resto da cena. \nSe passar, fica atordoada por 1 rodada \ne enjoada por 1d4 rodadas.\nNível ou ND 10 ou maior: se falhar no \nteste de resistência, fica atordoada por \n1 rodada e enjoada por 1d4 rodadas. \nSe passar, fica desprevenida e enjoada \npor 1 rodada.",
    "resistance": "Fortitude parcial"
  },
  {
    "id": "explosao_de_chamas",
    "name": "Explosão de Chamas",
    "circle": 1,
    "type": "arcana",
    "school": "Evocação",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "cone de 6m",
    "duration": "instan-\ntânea",
    "description": "Execução: padrão; Alcance: pessoal; \nÁrea: cone de 6m; Duração: instan-\ntânea; Resistência: Reflexos reduz à \nmetade.\nUm leque de chamas irrompe de suas \nmãos, causando 2d6 pontos de dano de \nfogo às criaturas na área.",
    "resistance": "Reflexos reduz à \nmetade",
    "upgrades": [
      {
        "cost": "Truque",
        "description": "muda o alcance para curto, \na área para alvo de 1 objeto e a resis-\ntência para Reflexos anula. Você gera \numa pequena explosão que não causa \ndano mas pode acender uma vela, to-\ncha ou fogueira. Também pode fazer \num objeto inflamável com RD 0 (como \numa corda ou pergaminho) ficar em \nchamas. Uma criatura em posse de um \nobjeto pode evitar esse efeito se passar \nno teste de resistência."
      },
      {
        "cost": "+1 PM",
        "description": "aumenta o dano em"
      }
    ]
  },
  {
    "id": "ferver_sangue",
    "name": "Ferver Sangue",
    "circle": 3,
    "type": "arcana",
    "school": "Necromancia",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 criatura",
    "duration": "sustenta-\nda",
    "description": "O sangue do alvo aquece até entrar em \nebulição. Quando a magia é lançada, e \nno início de cada um de seus turnos, o \nalvo sofre 4d8 pontos de dano de fogo \ne fica enjoado por uma rodada (Fortitu-\nde reduz o dano à metade e evita a con-\ndição). Se o alvo passar em dois testes \nde Fortitude seguidos, dissipa a magia. \nSe o alvo for reduzido a 0 PV pelo dano \ndesta magia, seu corpo explode, matan-\ndo-o e causando 6d6 pontos de dano de \nfogo em todas as criaturas a até 3m (Re-\nflexos reduz à metade). Essa magia não \nafeta criaturas sem sangue, como cons-\ntrutos ou mortos-vivos.",
    "resistance": "Fortitude parcial",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o dano em"
      },
      {
        "cost": "+9 PM",
        "description": "muda alvo para criaturas esco-\nlhidas. Requer 5º círculo."
      }
    ]
  },
  {
    "id": "fisico_divino",
    "name": "Físico Divino",
    "circle": 2,
    "type": "divina",
    "school": "Transmutação",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura",
    "duration": "cena",
    "description": "Você fortalece o corpo do alvo. Ele re-\ncebe +2 em Força, Destreza ou Cons-\ntituição, a sua escolha. Esse aumento \nnão oferece PV ou PM adicionais.",
    "upgrades": [
      {
        "cost": "+3 PM",
        "description": "muda o alcance para curto e o \nalvo para criaturas escolhidas."
      },
      {
        "cost": "+3 PM",
        "description": "em vez do normal, o alvo \nrecebe"
      },
      {
        "cost": "+7 PM",
        "description": "em vez do normal, o alvo re-\ncebe"
      }
    ]
  },
  {
    "id": "flecha_acida",
    "name": "Flecha Ácida",
    "circle": 2,
    "type": "arcana",
    "school": "Evocação",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "1 criatura ou objeto",
    "duration": "instantânea",
    "description": "Execução: padrão; Alcance: médio; \nAlvo: 1 criatura ou objeto; Duração: \ninstantânea; Resistência: \nReflexos \nparcial.\nVocê dispara um projétil que causa 4d6 \npontos de dano de ácido. Se falhar no \nteste de resistência, o alvo fica coberto \npor um muco corrosivo, sofrendo mais \n2d6 de dano de ácido no início de seus \ndois próximos turnos. Se lançada con-\ntra um objeto que não esteja em pos-\nse de uma criatura a magia causa dano \ndobrado e ignora a RD do objeto.",
    "resistance": "Reflexos \nparcial",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "além do normal, se o alvo co-\nberto pelo muco ácido estiver usando \narmadura ou escudo, o item é corroí-\ndo. Isso reduz o bônus na Defesa do \nitem em 1 ponto permanentemente. O \nitem pode ser consertado, restaurando \nseu bônus (veja Ofício, na página 121)."
      },
      {
        "cost": "+2 PM",
        "description": "aumenta a redução na Defesa \nem"
      }
    ]
  },
  {
    "id": "forma_eterea",
    "name": "Forma Etérea",
    "circle": 4,
    "type": "arcana",
    "school": "Transmutação",
    "execution": "completa",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "sustentada",
    "description": "Você e todo o equipamento que está \ncom você são transportados para o pla-\nno etéreo, que existe paralelamente ao \nplano material (o mundo físico). Na \nprática, é como ser transformado em \num fantasma (mas você ainda é con-\nsiderado uma criatura viva). Uma cria-\ntura etérea é invisível (pode alterar en-\n193\nCapítulo Quatro\ntre visível e invisível como ação livre), \nincorpórea e capaz de se mover em \nqualquer direção, inclusive para cima \ne para baixo. Ela enxerga o plano ma-\nterial, mas tudo parece cinza e insubs-\ntancial, reduzindo o alcance da visão \ne audição para 18m. Magias de abju-\nração e essência afetam criaturas eté-\nreas, mas outras magias, não. Da mes-\nma forma, uma criatura etérea não \npode atacar nem lançar magias contra \ncriaturas no plano material. Duas cria-\nturas etéreas podem se afetar normal-\nmente. Uma criatura afetada pode se \nmaterializar como uma ação de movi-\nmento, encerrando a magia. Uma cria-\ntura etérea que se materialize em um \nespaço ocupado é jogada para o espaço \nnão ocupado mais próximo e sofre 1d6 \npontos de dano de impacto para cada \n1,5m de deslocamento."
  },
  {
    "id": "furia_do_panteao",
    "name": "Fúria do Panteão",
    "circle": 5,
    "type": "divina",
    "school": "Evocação",
    "execution": "completa",
    "range": "longo",
    "targetArea": "cubo de 90m",
    "duration": "susten-\ntada",
    "description": "Você cria uma nuvem de tempesta-\nde violenta. Os ventos tornam ata-\nques à distância impossíveis e fazem \na área contar como condição terrível \npara lançar magia. Além disso, inimi-\ngos na área têm a visibilidade reduzi-\nda (como a magia Névoa). Uma vez por \nturno, você pode gastar uma ação de \nmovimento para gerar um dos efeitos \na seguir.\nNevasca. Inimigos na área sofrem 10d6 \npontos de dano de frio (Fortitude re-\nduz à metade). A área fica coberta de \nneve, virando terreno difícil até o fim \nda cena ou até você usar siroco.\nRaios. Até 6 inimigos a sua escolha na \nárea sofrem 10d8 pontos de dano de \neletricidade (Reflexos reduz à metade).\nSiroco. Transforma a chuva em uma \ntempestade de areia escaldante. Ini-\nmigos na área sofrem 10d6 pontos \nde dano (metade corte, metade fogo) \ne ficam sangrando (Fortitude reduz o \ndano à metade e evita a condição).\nTrovões. Inimigos sofrem 10d6 pontos \nde dano de impacto e ficam despreve-\nnidos por uma rodada (Fortitude reduz \no dano à metade e evita a condição).",
    "resistance": "veja texto"
  },
  {
    "id": "globo_da_verdade_de_gwen",
    "name": "Globo da Verdade de Gwen",
    "circle": 2,
    "type": "divina",
    "school": "Adivinhação",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 globo",
    "duration": "cena",
    "description": "Cria um globo flutuante e intangível, \ncom 50cm de diâmetro. O globo mostra \numa cena vista até uma semana atrás \npor você ou por uma criatura que você \ntoque ao lançar a magia (mediante uma \npergunta; a criatura pode fazer um teste \nde Vontade para anular o efeito), permi-\ntindo que outras pessoas a vejam.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "o globo mostra uma cena vista \naté um mês atrás."
      },
      {
        "cost": "+2 PM",
        "description": "como acima, até um ano atrás."
      },
      {
        "cost": "+2 PM",
        "description": "ao lançar a magia, você pode \ntocar um cadáver. O globo mostra a úl-\ntima cena vista por essa criatura."
      }
    ]
  },
  {
    "id": "globo_de_invulnerabilidade",
    "name": "Globo de Invulnerabilidade",
    "circle": 3,
    "type": "arcana",
    "school": "Abjuração",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "sustentada",
    "description": "Você é envolto por uma esfera mági-\nca brilhante com 3m de raio, que de-\ntém qualquer magia de 2º círculo ou \nmenor. Nenhuma magia pode ser lan-\nçada contra um alvo dentro do globo \ne magias de área não têm efeito den-\ntro dele. No entanto, magias ainda po-\ndem ser lançadas de dentro para fora.\nUma magia que dissipe outras magias \nsó dissipa o globo se for usada direta-\nmente sobre você, não o afetando se \nusada em área. Efeitos mágicos não \nsão dissipados quando entram na es-\nfera, apenas suprimidos (voltam a fun-\ncionar fora do globo, caso sua duração \nnão tenha acabado). O globo é imóvel \ne não tem efeito sobre criaturas ou ob-\njetos. Após lançá-lo, você pode entrar \nou sair livremente.",
    "upgrades": [
      {
        "cost": "+4 PM",
        "description": "muda o efeito para afetar ma-\ngias de até 3º círculo. Requer 4º círculo."
      }
    ]
  },
  {
    "id": "guardiao_divino",
    "name": "Guardião Divino",
    "circle": 4,
    "type": "divina",
    "school": "Convocação",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "elemental de luz invocado",
    "duration": "cena ou até ser descarregado",
    "description": "A magia invoca um elemental Pequeno, \ncom a forma de um orbe feito de luz di-\nvina. A criatura é incorpórea, imune a \ndano e ilumina como uma tocha. O ele-\nmental tem 100 pontos de luz."
  },
  {
    "id": "heroismo",
    "name": "Heroísmo",
    "circle": 3,
    "type": "divina",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura",
    "duration": "cena",
    "description": "Esta magia imbui uma criatura com \ncoragem e valentia. O alvo fica imune a \nmedo e recebe 40 PV temporários e +4 \nem testes de ataque e rolagens de dano \ncontra o inimigo de maior ND na cena."
  },
  {
    "id": "hipnotismo",
    "name": "Hipnotismo",
    "circle": 1,
    "type": "arcana",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 criatura",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: curto; \nAlvos: 1 animal ou humanoide; Du-\nração: 1d4 rodadas; Resistência: \nVontade anula.\nSuas palavras e movimentos ritmados \ndeixam o alvo fascinado. Esta magia só \nafeta criaturas que possam perceber \nvocê. Se usar esta magia em combate, \no alvo recebe +5 em seu teste de resis-\ntência. Se a criatura passar, fica imune \na este efeito por um dia.",
    "resistance": "Vontade anula",
    "upgrades": [
      {
        "cost": "Truque",
        "description": "muda a duração para 1 ro-\ndada. Em vez de fascinado, o alvo fica \npasmo (apenas uma vez por cena)."
      },
      {
        "cost": "+1 PM",
        "description": "como o normal, mas alvos que \npassem na resistência não sabem que \nforam vítimas de uma magia."
      },
      {
        "cost": "+2 PM",
        "description": "muda o alvo para animais ou \nhumanoides escolhidos."
      },
      {
        "cost": "+2 PM",
        "description": "muda a duração para susten-\ntada."
      },
      {
        "cost": "+2 PM",
        "description": "também afeta espíritos e \nmonstros na área. Requer 2º círculo."
      },
      {
        "cost": "+5 PM",
        "description": "também afeta construtos, es-\npíritos, monstros e mortos-vivos na \nárea. Requer 3º círculo.\n194\nMagia"
      }
    ]
  },
  {
    "id": "ilusao_lacerante",
    "name": "Ilusão Lacerante",
    "circle": 3,
    "type": "arcana",
    "school": "Ilusão",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "cubo de 9m",
    "duration": "sustenta-\nda",
    "description": "Você cria uma ilusão de algum peri-\ngo mortal. Quando a magia é lança-\nda, criaturas na área devem fazer um \nteste de Vontade; uma falha signifi-\nca que a criatura acredita que a ilusão \né real e sofre 3d6 pontos de dano psí-\nquico não letal. Sempre que uma cria-\ntura iniciar seu turno dentro da área, \ndeve repetir o teste de Vontade. Se fa-\nlhar, sofre o dano novamente. Somen-\nte criaturas que falham veem a ilusão, \ne racionalizam o efeito sempre que fa-\nlham no teste (por exemplo, acredita \nque o mesmo teto pode cair sobre ela \nvárias vezes).",
    "resistance": "Vontade anula",
    "upgrades": [
      {
        "cost": "+3 PM",
        "description": "aumenta o dano em"
      }
    ]
  },
  {
    "id": "imagem_espelhada",
    "name": "Imagem Espelhada",
    "circle": 1,
    "type": "arcana",
    "school": "Ilusão",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "cena",
    "description": "Três cópias ilusórias suas aparecem. \nAs duplicatas ficam ao seu redor e imi-\ntam suas ações, tornando difícil para \num inimigo saber quem atacar. Você \nrecebe +6 na Defesa. Cada vez que um \nataque contra você erra, uma das ima-\ngens desaparece e o bônus na Defe-\nsa diminui em 2. Um oponente deve \nver as cópias para ser confundido. Se \nvocê estiver invisível, ou o atacante fe-\nchar os olhos, você não recebe o bônus \n(mas o atacante ainda sofre penalida-\ndes normais por não enxergar).",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o número de cópias \nem"
      }
    ]
  },
  {
    "id": "imobilizar",
    "name": "Imobilizar",
    "circle": 3,
    "type": "universal",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 humanoide ou animal",
    "duration": "Instantânea",
    "description": "O alvo fica paralisado; se passar na re-\nsistência, em vez disso fica lento. A \ncada rodada, pode gastar uma ação \ncompleta para fazer um novo teste de \nVontade. Se passar, se liberta do efeito.",
    "resistance": "Vontade parcial",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "muda o alvo para 1 espírito."
      },
      {
        "cost": "+2 PM",
        "description": "aumenta o número de alvos \nem"
      }
    ]
  },
  {
    "id": "infligir_ferimentos",
    "name": "Infligir Ferimentos",
    "circle": 1,
    "type": "divina",
    "school": "Necromancia",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura",
    "duration": "instantânea",
    "description": "Você canaliza energia negativa contra \num alvo, causando 2d8+2 pontos de \ndano de trevas (ou curando 2d8+2 PV, \nse for um morto-vivo). Infligir Ferimentos \nanula Curar Ferimentos.",
    "resistance": "Fortitude reduz à metade",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "além do normal , o alvo fica fra-\nco pela cena (passar no teste de resis-\ntência evita)."
      },
      {
        "cost": "+2 PM",
        "description": "aumenta o dano em"
      },
      {
        "cost": "+2 PM",
        "description": "muda a resistência para ne-\nnhum. Como parte da execução da ma-\ngia, você pode fazer um ataque corpo a \ncorpo contra o alvo. Se acertar, causa o \ndano do ataque e o efeito da magia."
      }
    ]
  },
  {
    "id": "intervencao_divina",
    "name": "Intervenção Divina",
    "circle": 5,
    "type": "divina",
    "school": "Convocação",
    "execution": "completa",
    "range": "veja \ntexto",
    "targetArea": "veja texto",
    "duration": "veja \ntexto",
    "description": "Você pede a sua divindade para inter-\nceder diretamente. Você pode:\n•\t Curar todos os PV e condições de \naté 10 criaturas em alcance longo (este \nefeito cura mortos-vivos, em vez de \ncausar dano).\n•\t Dissipar os efeitos de qualquer ma-\ngia de 4º círculo ou menor.\nVocê pode implorar por algo ainda \nmais poderoso. Nesse caso, a magia re-\nquer o sacrifício de 2 PM e pode fazer \ncoisas como:\n•\t Criar um item mundano de até T$ \n30.000.\n•\t Duplicar os efeitos de qualquer ma-\ngia de até 4º círculo. Caso a magia pre-\ncise de um componente material para \nser lançada, ainda é necessário provi-\ndenciar o componente.\n•\t Proteger uma cidade de um desas-\ntre, como uma erupção vulcânica, en-\nchente ou terremoto.\n•\t Ressuscitar uma criatura em alcance \nlongo que tenha morrido há até uma \nrodada. A criatura acorda com 1 PV.\n•\t Qualquer outra coisa que o mestre \nautorize, conforme os desejos e objeti-\nvos da divindade do conjurador.",
    "resistance": "veja texto"
  },
  {
    "id": "invisibilidade",
    "name": "Invisibilidade",
    "circle": 2,
    "type": "arcana",
    "school": "Ilusão",
    "execution": "livre",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "1 rodada",
    "description": "O alvo fica invisível (incluindo seu equi-\npamento). Um personagem invisível re-\ncebe camuflagem total, +10 em testes \nde Furtividade contra ouvir e criaturas \nque não possam percebê-lo ficam des-\nprevenidas contra seus ataques.\nA magia termina se o alvo faz uma ação \nhostil contra uma criatura. Ações con-\ntra objetos livres não dissipam a Invi-\nsibilidade (você pode tocar ou apanhar \nobjetos que não estejam sendo segura-\ndos por outras criaturas). Causar dano \nindiretamente - por exemplo, acen-\ndendo o pavio de um barril de pólvo-\nra que vai detonar mais tarde - não é \nconsiderado um ataque.\nObjetos soltos pelo alvo voltam a ser \nvisíveis e objetos apanhados por ele fi-\ncam invisíveis. Qualquer parte de um \nitem carregado que se estenda além de \nseu alcance corpo a corpo natural se \ntorna visível. Uma luz nunca fica invi-\nsível (mesmo que sua fonte seja).",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "muda a execução para ação pa-\ndrão, o alcance para toque e o alvo para \n1 criatura ou 1 objeto Grande ou menor."
      },
      {
        "cost": "+3 PM",
        "description": "muda a duração para cena. \nRequer 3º círculo."
      },
      {
        "cost": "+3 PM",
        "description": "muda a duração para sustenta-\nda. Em vez do normal, o alvo gera uma \nesfera de invisibilidade. Não pode ser \nusado em conjunto com outros apri-\nmoramentos. O alvo e todas as criatu-\nras a até 3m dele se tornam invisíveis, \ncomo no efeito normal da magia (ain-\nda ficam visíveis caso façam uma ação \nhostial). A esfera se move juntamen-\nte com o alvo; qualquer coisa que saia \nda esfera fica visível. Requer 3º círculo."
      }
    ]
  },
  {
    "id": "invulnerabilidade",
    "name": "Invulnerabilidade",
    "circle": 5,
    "type": "universal",
    "school": "Abjuração",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "cena",
    "description": "Esta magia cria uma barreira mágica \nimpenetrável que protege você contra \nefeitos nocivos mentais ou físicos, a \nsua escolha.\nProteção mental: você fica imune às con-\ndições abalado, alquebrado, apavora-\ndo, atordoado, confuso, esmorecido,\n195\nCapítulo Quatro\nfascinado, frustrado e pasmo, além de \nefeitos de encantamento e ilusão.\nProteção física: você fica imune às con-\ndições atordoado, cego, debilitado, en-\njoado, envenenado, exausto, fatiga-\ndo, fraco, lento, ofuscado e paralisado, \nalém de acertos críticos, ataques furti-\nvos e doenças."
  },
  {
    "id": "lagrimas_de_wynna",
    "name": "Lágrimas de Wynna",
    "circle": 5,
    "type": "divina",
    "school": "Abjuração",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 criatura",
    "duration": "instantânea",
    "description": "Se falhar no teste de resistência, o alvo \nperde a habilidade de lançar magias ar-\ncanas até o fim da cena. Se passar, per-\nde a habilidade por uma rodada.",
    "resistance": "Vontade parcial",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "muda a área para esfera com \n6m de raio e o alvo para criaturas es-\ncolhidas."
      }
    ]
  },
  {
    "id": "lanca_ignea_de_aleph",
    "name": "Lança Ígnea de Aleph",
    "circle": 3,
    "type": "arcana",
    "school": "Evocação",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "1 criatura",
    "duration": "instantâ-\nnea",
    "description": "Esta magia foi desenvolvida pelo mago \nimortal Aleph Olhos Vermelhos, um \nentusiasta dos estudos vulcânicos. Ela \ndispara um projétil de magma contra o \nalvo, que sofre 4d6 pontos de dano de \nfogo e 4d6 pontos de dano de perfura-\nção e fica em chamas. As chamas cau-\nsam 2d6 pontos de dano por rodada, \nem vez do dano normal. Se passar no \nteste de resistência, o alvo sofre meta-\nde do dano e não fica em chamas.\nRespingos de rocha incandescente se \nespalham com a explosão, atingindo \ntodas as criaturas adjacentes ao alvo, \nque devem fazer um teste de Reflexos. \nSe falharem, ficam em chamas, como \ndescrito acima.",
    "resistance": "Reflexos parcial",
    "upgrades": [
      {
        "cost": "+3 PM",
        "description": "aumenta o dano inicial em"
      }
    ]
  },
  {
    "id": "legiao",
    "name": "Legião",
    "circle": 5,
    "type": "arcana",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "até 10 criaturas na área",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: médio; \nAlvo: até 10 criaturas na área; Dura-\nção: sustentada. Resistência: Vonta-\nde parcial.\nVocê domina a mente dos alvos. Os al-\nvos obedecem cegamente a seus co-\nmandos, exceto ordens claramente sui-\ncidas. Um alvo tem direito a um teste \nno final de cada um de seus turnos para \nse livrar do efeito. Alvos que passarem \nno teste ficam abalados por 1 rodada \nenquanto recuperam a consciência.",
    "resistance": "Vonta-\nde parcial"
  },
  {
    "id": "lendas_e_historias",
    "name": "Lendas e Histórias",
    "circle": 3,
    "type": "universal",
    "school": "Adivinhação",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura, objeto ou local",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: toque; \nAlvo: 1 criatura, objeto ou local; Du-\nração: sustentada.\nVocê descobre informações sobre uma \ncriatura, objeto ou local que esteja to-\ncando. O que exatamente você desco-\nbre depende do mestre: talvez você não \ndescubra tudo que há para saber, mas \nganhe pistas para continuar a investi-\ngação. A cada rodada que mantiver a \nmagia, você descobre:\n•\t Todas as informações sobre o alvo, \ncomo se tivesse passado em todos os \ntestes de Conhecimento para tal.\n•\t Todas as habilidades do alvo. Se for \numa criatura, você sabe suas estatís-\nticas de jogo como raça, classe, nível, \natributos, magias, resistências e fra-\nquezas. Se for um item mágico, apren-\nde seu efeito e funcionamento.\n•\t Se o alvo está sob influência de algu-\nma magia e todas as informações sobre \nas magias ativas, se houver alguma.",
    "upgrades": [
      {
        "cost": "+4 PM",
        "description": "muda a execução para um dia, \no alcance para ilimitado e adiciona com-\nponente material (cuba de ouro cheia \nd’água e ingredientes mágicos, no va-\nlor de T$ 1.000). Você ainda precisa ter \nalguma informação sobre o alvo, como \num nome, descrição ou localização."
      }
    ]
  },
  {
    "id": "leque_cromatico",
    "name": "Leque Cromático",
    "circle": 1,
    "type": "arcana",
    "school": "Ilusão",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "cone de 4,5m",
    "duration": "instan-\ntânea",
    "description": "Um cone de luzes brilhantes surge \ndas suas mãos, deixando os animais \ne humanoides na área atordoados por \n1 rodada (apenas uma vez por cena, \nVontade anula) e ofuscados pela cena. \nEsta magia não afeta criaturas cegas.",
    "resistance": "Vontade parcial",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "além do normal, as criaturas \nafetadas ficam vulneráveis pela cena."
      },
      {
        "cost": "+2 PM",
        "description": "também afeta espíritos e \nmonstros na área. Requer 2º círculo."
      }
    ]
  },
  {
    "id": "libertacao",
    "name": "Libertação",
    "circle": 4,
    "type": "universal",
    "school": "Abjuração",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 criatura",
    "duration": "cena",
    "description": "O alvo fica imune a efeitos de movi-\nmento e ignora qualquer efeito que \nimpeça ou restrinja seu deslocamen-\nto. Por fim, pode usar habilidades \nque exigem liberdade de movimen-\ntos mesmo se estiver usando arma-\ndura ou escudo.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "além do normal, o alvo pode \ncaminhar sobre a água ou outros lí-\nquidos com seu deslocamento nor-\nmal. Entretanto, isso não protege con-\ntra qualquer efeito que o líquido possa \ncausar (o alvo pode andar sobre lava, \nmas ainda vai sofrer dano)."
      },
      {
        "cost": "+2 PM",
        "description": "além do normal, o alvo pode \nescolher 20 em todos os testes de \nAtletismo."
      },
      {
        "cost": "+2 PM",
        "description": "além do normal, o alvo pode \nescolher 20 em todos os testes de Acro-\nbacia e pode fazer todas as manobras \ndesta perícia mesmo sem treinamento."
      },
      {
        "cost": "+5 PM",
        "description": "muda o alvo para até 5 criaturas."
      }
    ]
  },
  {
    "id": "ligacao_sombria",
    "name": "Ligação Sombria",
    "circle": 4,
    "type": "divina",
    "school": "Necromancia",
    "execution": "padrão",
    "range": "longo",
    "targetArea": "1 criatura",
    "duration": "1 dia",
    "description": "Execução: padrão; Alcance: longo; \nAlvo: 1 criatura; Duração: 1 dia; Re-\nsistência: Fortitude anula.\nCria uma conexão entre seu corpo e o \nda criatura alvo, deixando uma mar-\nca idêntica na pele de ambos. Enquan-\nto a magia durar, sempre que você so-\nfrer qualquer dano ou condição, o alvo \ndesta magia deve fazer um teste de For-\ntitude; se falhar, sofre o mesmo dano \nque você ou adquire a mesma condição.\n196\nMagia\nA magia termina se o alvo chegar a 0 \npontos de vida."
  },
  {
    "id": "ligacao_telepatica",
    "name": "Ligação Telepática",
    "circle": 2,
    "type": "arcana",
    "school": "Adivinhação",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "2 criaturas voluntárias",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: toque; \nAlvo: 2 criaturas voluntárias; Dura-\nção: 1 dia.\nVocê cria um elo mental entre duas \ncriaturas com Inteligência - 3 ou maior \n(você pode ser uma delas). As criatu-\nras podem se comunicar independen-\nte de idioma ou distância, mas não em \nmundos diferentes.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o número de alvos \nem"
      }
    ]
  },
  {
    "id": "localizacao",
    "name": "Localização",
    "circle": 2,
    "type": "arcana",
    "school": "Adivinhação",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "esfera com 90m de raio",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: pessoal; \nÁrea: esfera com 90m de raio; Dura-\nção: cena.\nEsta magia pode encontrar uma cria-\ntura ou objeto a sua escolha. Você \npode pensar em termos gerais (“um \nelfo”, “algo de metal”) ou específicos \n(“Gwen, a elfa”, “uma espada longa”). \nA magia indica a direção e distân-\ncia da criatura ou objeto mais próxi-\nmo desse tipo, caso esteja ao alcance. \nVocê pode movimentar-se para conti-\nnuar procurando. Procurar algo mui-\nto específico (“a espada longa encan-\ntada do Barão Rulyn”) exige que você \ntenha em mente uma imagem preci-\nsa do objeto; caso a imagem não seja \nmuito próxima da verdade, a magia fa-\nlha, mas você gasta os PM mesmo as-\nsim. Esta magia pode ser bloqueada \npor uma fina camada de chumbo.",
    "upgrades": [
      {
        "cost": "Truque",
        "description": "muda a área para alvo você. \nEm vez do normal, você sabe onde fica \no norte e recebe"
      },
      {
        "cost": "+5 PM",
        "description": "aumenta a área em um fator \nde 10 (90m para 900m, 900m para \n9km e assim por diante)."
      }
    ]
  },
  {
    "id": "luz",
    "name": "Luz",
    "circle": 1,
    "type": "universal",
    "school": "Evocação",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 objeto",
    "duration": "cena",
    "description": "Você fica coberto por um manto de \nenergia sombria. Nesta forma, torna-se \nincorpóreo (inclui seu equipamento): \nsó pode ser afetado por armas e habili-\ndades mágicas, ou por outras criaturas \nincorpóreas, e pode atravessar objetos \nsólidos, mas não manipulá-los. Tam-\nbém não pode atacar criaturas normais \n(mas ainda pode lançar magias nelas). \nAlém disso, se torna vulnerável à luz di-\nreta: se exposto a uma fonte de luz, so-\nfre 1 ponto de dano por rodada.\nVocê pode gastar uma ação de movi-\nmento e 1 PM para “entrar” em uma \nsombra do seu tamanho ou maior e \nse teletransportar para outra sombra, \ntambém do seu tamanho ou maior, em \nalcance médio."
  },
  {
    "id": "manto_do_cruzado",
    "name": "Manto do Cruzado",
    "circle": 4,
    "type": "divina",
    "school": "Evocação",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "sustentada",
    "description": "Você invoca o poder de sua divinda-\nde na forma de um manto de energia \nque reveste seu corpo. Esta magia tem \nduas versões. Você escolhe qual versão \npode lançar quando aprende esta ma-\ngia. Ela não pode ser mudada.\nManto de Luz: um manto dourado e lu-\nminoso. No início de cada um de seus \nturnos, você e todos os seus aliados \nem alcance curto recuperam 2d8 PV. \nVocê recebe imunidade a dano de tre-\nvas e seus ataques corpo a corpo cau-\nsam +2d8 pontos de dano de luz."
  },
  {
    "id": "mao_poderosa_de_talude",
    "name": "Mão Poderosa de Talude",
    "circle": 4,
    "type": "arcana",
    "school": "Convocação",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "mão gigante de energia",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: médio; \nEfeito: mão gigante de energia; Dura-\nção: sustentada.\nEsta magia cria uma mão flutuante \nGrande que sempre se posiciona entre \nvocê e um oponente a sua escolha. A \nmão fornece cobertura leve (+5 na De-\nfesa) contra esse oponente. Nada é ca-\npaz de enganar a mão - coisas como \nescuridão, invisibilidade, metamorfose \ne disfarces mundanos não a impedem \nde protegê-lo. A mão tem Defesa 20 e \nPV e resistências iguais aos seus. Com\n197\nCapítulo Quatro\numa ação de movimento, você pode \ncomandar a mão para que o proteja \nde outro oponente ou para que realize \numa das ações a seguir.\nAgarrar: a mão usa uma manobra agar-\nrar contra o oponente, usando o seu \nMisticismo com um bônus adicional \nde +10. A mão mantém o oponente \nagarrado, mas não causa dano.\nEsmagar: a mão esmaga um oponente \nagarrado, causando 2d6+10 pontos de \ndano de impacto.\nEmpurrar: a mão afasta o oponente \n(manobra empurrar usando o seu Mis-\nticismo com um bônus adicional de \n+10). A mão acompanha o oponente \npara empurrá-lo o máximo que conse-\nguir, dentro do alcance da magia.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o dano em"
      }
    ]
  },
  {
    "id": "mapear",
    "name": "Mapear",
    "circle": 2,
    "type": "arcana",
    "school": "Adivinhação",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "superfície ou objeto plano, como \numa mesa ou papel",
    "duration": "cena",
    "description": "Uma fagulha percorre a superfície afe-\ntada, queimando-a enquanto esboça \num mapa da região onde o conjurador \nestá. Se você conhece o lugar, o mapa \nserá completo. Caso contrário, apre-\nsentará apenas um esboço geral, além \nde um ponto de referência (para pos-\nsibilitar localização) e um lugar de in-\nteresse, ambos definidos pelo mestre. \nA região representada no mapa tem ta-\nmanho máximo de um quadrado de \n10km de lado. Caso você esteja dentro \nde uma construção, o mapa mostrará o \nandar no qual você se encontra."
  },
  {
    "id": "marca_da_obediencia",
    "name": "Marca da Obediência",
    "circle": 2,
    "type": "universal",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura",
    "duration": "cena",
    "description": "Execução: padrão; Alcance: toque; \nAlvo: 1 criatura; Duração: cena; Re-\nsistência: Vontade anula.\nVocê toca uma criatura, gravando uma \nmarca mística no corpo dela enquanto \nprofere uma ordem, como “não ataque \na mim ou meus aliados”, “siga-me” ou \n“não saia desta sala”. A criatura deve \nseguir essa ordem, gastando todas as \nações de seu turno para isso. A ordem \nnão pode ser genérica demais (como \n“ajude-me”, por exemplo), nem forçar \no alvo a atos suicidas. A cada rodada, \no alvo pode fazer um teste de Vonta-\nde. Se passar, a magia é dissipada.",
    "upgrades": [
      {
        "cost": "+3 PM",
        "description": "muda a duração para um dia. \nSe não estiver em combate, a criatura \nsó pode fazer o teste de Vontade a cada \nhora. Requer 3º círculo."
      }
    ]
  },
  {
    "id": "marionete",
    "name": "Marionete",
    "circle": 4,
    "type": "arcana",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "1 criatura",
    "duration": "sustenta-\nda",
    "description": "Esta magia manipula o sistema ner-\nvoso do alvo. Ao sofrer a magia, e no \ninício de cada um de seus turnos, a \nvítima faz um teste de Fortitude. Se \npassar, a magia é anulada. Se falhar, \ntodas as suas ações físicas naquele \nturno estarão sob controle do conju-\nrador. A vítima ainda tem consciência \nde tudo que acontece à sua volta, po-\ndendo ver, ouvir e até falar com certo \nesforço (mas não para lançar magias). \nContudo, seu corpo realiza apenas os \nmovimentos que o conjurador dese-\nja. A vítima pode ser manipulada para \nse movimentar, lutar, usar habilidades \nde combate... Enfim, qualquer coisa \nde que seja fisicamente capaz.",
    "resistance": "Fortitude anula"
  },
  {
    "id": "mata_dragao",
    "name": "Mata-Dragão",
    "circle": 5,
    "type": "arcana",
    "school": "Evocação",
    "execution": "duas rodadas",
    "range": "pessoal",
    "targetArea": "cone de 30m",
    "duration": "instantânea",
    "description": "Execução: duas rodadas; Alcance: \npessoal; Área: cone de 30m; Duração: \ninstantânea; Resistência: Reflexos re-\nduz à metade.\nEsta é uma das mais poderosas ma-\ngias de destruição existentes. Após \nentoar longos cânticos, o conjurador \ndispara uma carga de energia que var-\nre uma enorme área à sua frente, cau-\nsando 20d12 pontos de dano de essên-\ncia em todas as criaturas, construções \ne objetos livres atingidos. Sempre que \nrola um resultado 12 em um dado de \ndano, a magia causa +1d12 pontos de \ndano. Apesar de seu poder destrutivo, \nesta magia é lenta, tornando seu uso \ndifícil em combate.",
    "resistance": "Reflexos re-\nduz à metade"
  },
  {
    "id": "mente_divina",
    "name": "Mente Divina",
    "circle": 2,
    "type": "divina",
    "school": "Adivinhação",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura",
    "duration": "cena",
    "description": "Você fortalece a mente do alvo. Ele re-\ncebe +2 em Inteligência, Sabedoria \nou Carisma, a sua escolha. Esse au-\nmento não oferece PV, PM ou perícias \nadicionais.",
    "upgrades": [
      {
        "cost": "+3 PM",
        "description": "muda o alcance para curto e o \nalvo para criaturas escolhidas."
      },
      {
        "cost": "+3 PM",
        "description": "em vez do normal, o alvo re-\ncebe"
      },
      {
        "cost": "+7 PM",
        "description": "em vez do normal, o alvo re-\ncebe"
      }
    ]
  },
  {
    "id": "metamorfose",
    "name": "Metamorfose",
    "circle": 2,
    "type": "arcana",
    "school": "Transmutação",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "cena",
    "description": "Você muda sua aparência e forma - in-\ncluindo seu equipamento - para qual-\nquer outra criatura, existente ou ima-\nginada. Independentemente da forma \nescolhida, você recebe +20 em testes \nde Enganação para disfarce. Caracte-\nrísticas não mencionadas não mudam.\nSe mudar para uma forma humanoi-\nde, pode mudar o tipo de dano (entre \ncorte, impacto e perfuração) de suas \narmas (se usa uma maça e transfor-\nmá-la em espada longa, ela pode cau-\nsar dano de corte, por exemplo). Se \nquiser, pode assumir uma forma hu-\nmanoide com uma categoria de ta-\nmanho acima ou abaixo da sua; nes-\nse caso aplique os modificadores em \nFurtividade e testes de manobra.\nSe mudar para outras formas, você \npode escolher uma Forma Selvagem do \ndruida (veja no Capítulo 1). Nesse \ncaso você não pode atacar com suas ar-\nmas, falar ou lançar magias até voltar \nao normal, mas recebe uma ou mais ar-\nmas naturais e os bônus da forma sel-\nvagem escolhida.\n198\nMagia",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "a forma escolhida recebe uma \nhabilidade de sentidos entre faro, visão \nna penumbra e visão no escuro."
      },
      {
        "cost": "+3 PM",
        "description": "a forma escolhida recebe per-\ncepção às cegas. Requer 3º círculo."
      },
      {
        "cost": "+3 PM",
        "description": "muda o alcance para toque, o \nalvo para 1 criatura e adiciona resistên-\ncia (Vontade anula)."
      },
      {
        "cost": "+3 PM",
        "description": "muda o alcance para médio, \no alvo para 1 criatura e a resistência \npara Vontade anula. Em vez do nor-\nmal, transforma o alvo em uma cria-\ntura ou objeto inofensivo (ovelha, \nsapo, galinha, pudim de ameixa etc.). \nA criatura não pode atacar, falar e lan-\nçar magias; seu deslocamento vira 3m \ne sua Defesa vira 10. Suas outras ca-\nracterísticas não mudam. No início de \nseus turnos, o alvo pode fazer um tes-\nte de Vontade; se passar, retorna à sua \nforma normal e a magia termina. Re-\nquer 3º círculo."
      },
      {
        "cost": "+5 PM",
        "description": "se mudar para formas não \nhumanoides, pode escolher uma For-\nma Selvagem Aprimorada. Requer 3º \ncírculo."
      },
      {
        "cost": "+9 PM",
        "description": "se mudar para formas não hu-\nmanoides, pode escolher uma Forma \nSelvagem Superior. Requer 4º círculo."
      }
    ]
  },
  {
    "id": "miasma_mefitico",
    "name": "Miasma Mefítico",
    "circle": 2,
    "type": "divina",
    "school": "Necromancia",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "nuvem com 6m de raio",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: médio; \nÁrea: nuvem com 6m de raio; Dura-\nção: instantânea; Resistência: Forti-\ntude (veja texto).\nA área é coberta por emanações le-\ntais. Criaturas na área sofrem 5d6 \npontos de dano de ácido e ficam en-\njoadas por 1 rodada. Se passarem na \nresistência, sofrem metade do dano e \nnão ficam enjoadas.",
    "resistance": "Forti-\ntude (veja texto)",
    "upgrades": [
      {
        "cost": "Truque",
        "description": "muda o alcance para toque, \na área para alvo (1 criatura com 0 PV \nou menos), a duração para instantâ-\nnea, a resistência para Fortitude anu-\nla e adiciona componente material (pó \nde ônix no valor de T$ 10). Em vez do \nnormal, você canaliza o Miasma contra \numa vítima. Se falhar na resistência, \nela morre e você recebe"
      },
      {
        "cost": "+2 PM",
        "description": "aumenta o dano em"
      },
      {
        "cost": "+3 PM",
        "description": "muda o tipo do dano para \ntrevas."
      }
    ]
  },
  {
    "id": "miragem",
    "name": "Miragem",
    "circle": 3,
    "type": "arcana",
    "school": "Ilusão",
    "execution": "padrão",
    "range": "longo",
    "targetArea": "cubo de até 90m de lado",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: longo; \nÁrea: cubo de até 90m de lado; Du-\nração: 1 dia; Resistência: Vontade \ndesacredita.\nVocê faz um terreno parecer outro, in-\ncluindo sons e cheiros. Uma planície \npode parecer um pântano, uma floresta \npode parecer uma montanha etc. Esta \nmagia pode ser usada para criar arma-\ndilhas: areia movediça pode parecer \nterra firme ou um precipício pode pare-\ncer um lago. Você pode alterar, incluir \ne esconder estruturas dentro da área, \nmas não criaturas (embora elas possam \nse esconder nas estruturas ilusórias).",
    "resistance": "Vontade \ndesacredita",
    "upgrades": [
      {
        "cost": "+4 PM",
        "description": "além do normal, pode alterar \na aparência de criaturas escolhidas na \nárea, como se usando Disfarce Ilusório."
      }
    ]
  },
  {
    "id": "missao_divina",
    "name": "Missão Divina",
    "circle": 3,
    "type": "divina",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 criatura",
    "duration": "1 semana \nou até ser descarregada",
    "description": "Execução: padrão; Alcance: curto; \nAlvo: 1 criatura; Duração: 1 semana \nou até ser descarregada; Resistência: \nVontade anula (veja texto)\nEsta magia obriga o alvo a cumprir uma \ntarefa a sua escolha. Ela dura uma se-\nmana ou até o alvo cumprir a tarefa, o \nque vier primeiro. O alvo pode recusar \na missão - mas, no fim de cada dia em \nque não se esforçar para cumprir a ta-\nrefa, deve fazer um teste de Vontade; se \nfalhar, sofre uma penalidade cumulati-\nva de -2 em todos os testes e rolagens.\nA Missão Divina não pode forçar um ato \nsuicida, nem uma missão impossível \n(como matar um ser que não existe).",
    "resistance": "Vontade anula (veja texto)\nEsta magia obriga o alvo a cumprir uma \ntarefa a sua escolha",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "muda o alcance para toque, a \nduração para permanente e adiciona \npenalidade de -1 PM. Em vez do nor-\nmal, você inscreve uma marca (como \numa tatuagem) na pele do alvo e esco-\nlhe um tipo de ação que ativará a mar-\nca. Normalmente, será cometer um \ncrime (roubar, matar...) ou outra coisa \ncontrária às Obrigações & Restrições \nde sua divindade. Sempre que a marca \né ativada, o alvo recebe uma penalida-\nde cumulativa de -2 em todos os tes-\ntes. Muitas vezes, portar essa marca é \num estigma por si só, já que esta magia \nnormalmente é lançada em criminosos \nou traidores. Uma magia que dissipe \noutras suprime a marca e suas pena-\nlidades por um dia; elas só podem ser\ntotalmente removidas pelo conjurador \noriginal ou pela magia Purificação."
      }
    ]
  },
  {
    "id": "montaria_arcana",
    "name": "Montaria Arcana",
    "circle": 2,
    "type": "arcana",
    "school": "Convocação",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 criatura",
    "duration": "1 dia",
    "description": "Esta magia convoca um parceiro cava-\nlo (ou pônei) de guerra veterano. Sua \naparência é de um animal negro com \ncrina e cauda cinzentas e cascos feitos \nde fumaça, mas você pode mudá-la se \nquiser. Além dos benefícios normais, a \nMontaria Arcana pode atravessar terre-\nno difícil sem redução em seu deslo-\ncamento. Você pode usar Misticismo \nno lugar de Cavalgar para efeitos des-\nta montaria (incluindo ser considera-\ndo treinado).",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "além do normal, criaturas do \ntipo animal em alcance curto da mon-\ntaria devem fazer um teste de Vontade. \nSe passarem, ficam abaladas pela cena; \nse falharem, ficam apavoradas por 1d4 \nrodadas, depois abaladas pela cena."
      },
      {
        "cost": "+3 PM",
        "description": "muda a duração para perma-\nnente e adiciona penalidade de -3 PM."
      },
      {
        "cost": "+3 PM",
        "description": "aumenta o tamanho da mon-\ntaria em uma categoria. Isso também \naumenta o número de criaturas que ela \npode carregar - duas para uma cria-\ntura Enorme, seis para Colossal. Uma \núnica criatura controla a montaria; as \noutras apenas são deslocadas."
      }
    ]
  },
  {
    "id": "muralha_de_ossos",
    "name": "Muralha de Ossos",
    "circle": 4,
    "type": "universal",
    "school": "Necromancia",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "muro de ossos",
    "duration": "cena",
    "description": "Uma parede de ossos se eleva da ter-\nra. A parede tem 15m de comprimen-\nto, 9m de altura e 1,5m de espessu-\nra. Ela pode ter qualquer forma - não \nprecisa ser uma linha reta -, mas sua \nbase precisa estar sempre tocando o \nsolo. Quando a parede surge, criatu-\nras na área ocupada ou adjacentes so-\nfrem 4d8 pontos de dano de corte e \nprecisam fazer um teste de Reflexos \npara não ficarem presas no emaranha-\ndo de ossos. Uma criatura presa des-\nsa maneira fica agarrada, e pode gastar \numa ação padrão para fazer um teste \nde Atletismo para se soltar. Se passar \nno teste, sai da muralha para um dos \nlados adjacentes. Se falhar, sofre 4d8 \npontos de dano de corte.\n199\nCapítulo Quatro\nÉ possível destruir o muro para atra-\nvessá-lo ou libertar uma criatura agar-\nrada. Cada trecho de 3m do muro tem \nDefesa 8, 40 PV e redução de corte, \nfrio e perfuração 10. Também é possí-\nvel escalar a parede. Isso exige um tes-\nte de Atletismo e causa 4d8 pontos de \ndano de corte para cada 3m escalados.",
    "upgrades": [
      {
        "cost": "+3 PM",
        "description": "aumenta o comprimento em"
      }
    ]
  },
  {
    "id": "muralha_elemental",
    "name": "Muralha Elemental",
    "circle": 3,
    "type": "arcana",
    "school": "Evocação",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "muralha de energia",
    "duration": "cena",
    "description": "Uma muralha de um elemento a sua \nescolha se eleva da terra. Ela pode ser \num muro de até 30m de comprimento \ne 3m de altura (ou o contrário) ou uma \ncúpula de 3m de raio. Os efeitos va-\nriam conforme o elemento escolhido.\nFogo. Faz surgir uma violenta cortina de \nchamas. Um lado da muralha (a sua es-\ncolha) emite ondas de calor, que cau-\nsam 2d6 pontos de dano de fogo em \ncriaturas a até 6m quando você lança a \nmagia e no início de seus turnos. Atra-\nvessar a muralha causa 8d6 pontos de \ndano de fogo. Caso seja criada em uma \nárea onde existem criaturas, elas sofrem \ndano como se estivessem atravessando \na muralha, mas podem fazer um teste \nde Reflexos para reduzir o dano à meta-\nde e escapar para um lado (a criatura es-\ncolhe, mas se escapar para o lado quente \nsofrerá mais 2d6 pontos de dano).\nGelo. Evoca uma parede grossa de gelo \ndenso com 15cm de espessura. Na for-\nma de cúpula, pode prender uma ou \nmais criaturas, mas elas têm direito a \num teste de Reflexos para escapar an-\ntes que a cúpula se forme. Cada tre-\ncho de 3m da muralha tem Defesa 8, \n40 PV e RD 5. Um trecho da muralha \nque atinja 0 PV será rompido. Qual-\nquer efeito de fogo causa dano dobra-\ndo à muralha. Uma criatura que atra-\nvesse um trecho rompido da muralha \nsofre 4d6 pontos de dano de frio.",
    "resistance": "veja texto",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o dano por atravessar \na muralha em"
      },
      {
        "cost": "+2 PM",
        "description": "aumenta o comprimento em"
      }
    ]
  },
  {
    "id": "nevoa",
    "name": "Névoa",
    "circle": 1,
    "type": "universal",
    "school": "Convocação",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "nuvem com 6m de raio e 6m \nde altura",
    "duration": "cena",
    "description": "Uma névoa espessa eleva-se de um pon-\nto a sua escolha, obscurecendo toda a \nvisão - criaturas a até 1,5m têm camu-\nflagem leve e criaturas a partir de 3m \ntêm camuflagem total. Um vento for-\nte dispersa a névoa em 4 rodadas e um \nvendaval a dispersa em 1 rodada. Esta \nmagia não funciona sob a água.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "a magia também funciona sob \na água, criando uma nuvem de tinta."
      },
      {
        "cost": "+2 PM",
        "description": "você pode escolher criaturas \nno alcance ao lançar a magia; elas en-\nxergam através do efeito. Requer 2º \ncírculo."
      },
      {
        "cost": "+2 PM",
        "description": "a nuvem tem um cheiro horrí-\nvel. No início de seus turnos, qualquer \ncriatura dentro dela, ou qualquer cria-\ntura com faro em alcance curto da nu-\nvem, deve fazer um teste de Fortitude. \nSe falhar, fica enjoada por uma rodada."
      },
      {
        "cost": "+2 PM",
        "description": "a nuvem tem um tom esver-\ndeado e se torna cáustica. No início de \nseus turnos, criaturas dentro dela so-\nfrem 2d4 pontos de dano de ácido."
      },
      {
        "cost": "+3 PM",
        "description": "aumenta o dano de ácido em"
      }
    ]
  },
  {
    "id": "oracao",
    "name": "Oração",
    "circle": 2,
    "type": "divina",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 criatura",
    "duration": "sustentada",
    "description": "Você e os seus aliados no alcance re-\ncebem +2 em testes de perícia e rola-\ngens de dano, e todos os seus inimigos \nno alcance sofrem -2 em testes de pe-\nrícia e rolagens de dano. Esse efeito é \ncumulativo com outras magias. Compo-\nnente material: T$ 20 por PM gasto em \nincensos ou outras oferendas.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta os bônus em"
      },
      {
        "cost": "+2 PM",
        "description": "aumenta as penalidades em \n-1 (penalidade máxima limitada pelo \ncírculo máximo de magia que você \npode lançar)."
      },
      {
        "cost": "+7 PM",
        "description": "muda o alcance para médio. \nRequer 3º círculo."
      }
    ]
  },
  {
    "id": "orientacao",
    "name": "Orientação",
    "circle": 1,
    "type": "divina",
    "school": "Adivinhação",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 criatura",
    "duration": "1 rodada",
    "description": "Em seu próximo teste de perícia, o \nalvo pode rolar dois dados e ficar com \no melhor resultado.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "muda a duração para cena. \nEm vez do normal, escolha um atri-\nbuto. Sempre que o alvo fizer um tes-\nte de perícia baseado no atributo es-\ncolhido, pode rolar dois dados e ficar \ncom o melhor resultado. Não se apli-\nca a testes de ataque ou resistência. \nRequer 2º círculo."
      },
      {
        "cost": "+5 PM",
        "description": "como acima, mas, em vez de \num atributo, escolha entre atributos \nfísicos (Força, Destreza e Constitui-\nção) ou mentais (Inteligência, Sabe-\ndoria e Carisma). Requer 3º círculo."
      }
    ]
  },
  {
    "id": "palavra_primordial",
    "name": "Palavra Primordial",
    "circle": 5,
    "type": "universal",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 criatura com menos níveis que \nvocê",
    "duration": "instantânea ou veja \ntexto",
    "description": "Você pronuncia uma palavra do idioma \nprimordial da Criação, que causa um \ndos efeitos abaixo, a sua escolha.\nAtordoar: a criatura fica atordoada por \n1d4+1 rodadas (apenas uma vez por \ncena). Se passar no teste de resistên-\ncia, ou se já foi atordoada por esta ma-\ngia, fica desprevenida por 1d4 rodadas.\nCegar: a criatura fica cega. Se passar no \nteste de resistência, fica ofuscada por \n1d4 rodadas.\n200\nMagia",
    "resistance": "Vontade parcial"
  },
  {
    "id": "pele_de_pedra",
    "name": "Pele de Pedra",
    "circle": 3,
    "type": "universal",
    "school": "Transmutação",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "cena",
    "description": "Sua pele ganha aspecto e dureza de \nrocha. Você recebe redução de dano 5.",
    "resistance": "Forti-\ntude anula",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "muda o alcance para toque e o \nalvo para 1 criatura."
      },
      {
        "cost": "+4 PM",
        "description": "muda a duração para um dia."
      },
      {
        "cost": "+4 PM",
        "description": "sua pele ganha aspecto e dure-\nza de aço. Você recebe redução de dano \n10. Requer 4º círculo."
      },
      {
        "cost": "+4 PM",
        "description": "muda o alcance para toque, o \nalvo para 1 criatura, a duração para 1d4 \nrodadas e adiciona Resistência: Forti-\ntude anula. Em vez do efeito normal, \na magia transforma o alvo e seu equi-\npamento em uma estátua inerte e sem \nconsciência. A estátua possui os mes-\nmos PV da criatura e redução de dano \n8; se for quebrada, a criatura morrerá. \nRequer 4º círculo."
      }
    ]
  },
  {
    "id": "perdicao",
    "name": "Perdição",
    "circle": 1,
    "type": "divina",
    "school": "Necromancia",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 criatura",
    "duration": "cena",
    "description": "Amaldiçoa os alvos, que recebem -1 \nem testes de ataque e rolagens de \ndano. Perdição anula Bênção.",
    "resistance": "nenhuma"
  },
  {
    "id": "poeira_da_podridao",
    "name": "Poeira da Podridão",
    "circle": 3,
    "type": "divina",
    "school": "Necromancia",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "nuvem com 6m de raio",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: médio; \nÁrea: nuvem com 6m de raio; Dura-\nção: cena; Resistência: Fortitude (veja \ntexto).\nVocê manifesta uma nuvem de poei-\nra carregada de energia negativa, que \napodrece lentamente as criaturas na \nárea. Ao lançar a magia, e no início de \nseus turnos, criaturas na área sofrem \n2d8+8 pontos de dano de trevas (For-\ntitude reduz à metade). Alvos que fa-\nlharem no teste não podem recuperar \nPV por uma rodada.",
    "resistance": "Fortitude (veja \ntexto)",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o dano em"
      }
    ]
  },
  {
    "id": "possessao",
    "name": "Possessão",
    "circle": 5,
    "type": "arcana",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "longo",
    "targetArea": "1 criatura",
    "duration": "1 dia",
    "description": "Execução: padrão; Alcance: longo; \nAlvo: 1 criatura; Duração: 1 dia; Re-\nsistência: Vontade anula.\nVocê projeta sua consciência no corpo \ndo alvo. Enquanto possuir uma criatu-\nra, você assume o controle total do cor-\npo dela. O seu próprio corpo fica in-\nconsciente e a consciência do alvo fica \ninerte. Em termos de jogo, você con-\ntinua usando a sua ficha, mas com os \natributos físicos e deslocamento da \ncriatura. Se o alvo passar no teste de \nresistência, sabe que você tentou pos-\nsuí-lo e fica imune a esta magia por um \ndia. Caso o corpo da criatura morra en-\nquanto você a possui, a criatura morre \ne você deve fazer um teste de Vontade \ncontra a CD da sua própria magia. Se \npassar, sua consciência retorna para o \nseu corpo (contanto que esteja dentro \ndo alcance). Do contrário, você tam-\nbém morre. Retornar para o seu cor-\npo voluntariamente é uma ação livre.",
    "upgrades": [
      {
        "cost": "+5 PM",
        "description": "você ganha acesso às habilida-\ndes de raça e classe da criatura."
      },
      {
        "cost": "+5 PM",
        "description": "enquanto a magia durar e você \nestiver dentro do alcance do seu corpo \noriginal, pode “saltar” de uma criatura \npossuída para outra. O novo alvo tem \ndireito a um teste de Vontade. Se falhar, \nvocê assume o controle do corpo dele \ne o alvo anterior recobra a consciência."
      }
    ]
  },
  {
    "id": "potencia_divina",
    "name": "Potência Divina",
    "circle": 3,
    "type": "divina",
    "school": "Transmutação",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "sustentada",
    "description": "Você canaliza o poder de sua divinda-\nde. Você aumenta uma categoria de ta-\nmanho (seu equipamento muda de \nacordo) e recebe Força +4 e RD 10. \nVocê não pode lançar magias enquan-\nto estiver sob efeito de Potência Divina.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o bônus de Força \nem"
      },
      {
        "cost": "+5 PM",
        "description": "aumenta a RD em"
      }
    ]
  },
  {
    "id": "premonicao",
    "name": "Premonição",
    "circle": 4,
    "type": "divina",
    "school": "Adivinhação",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "cena",
    "description": "Vislumbres do futuro permitem que \nvocê reavalie suas ações. Uma vez por \nrodada, você pode rolar novamente um \nteste recém realizado, mas deve aceitar \no resultado da nova rolagem.",
    "upgrades": [
      {
        "cost": "+3 PM",
        "description": "muda a execução para reação, \no alcance para curto, o alvo para 1 cria-\ntura e a duração para instantânea. Esta \nmagia só pode ser usada em uma criatu-\nra que tenha acabado de fazer um teste. \nObriga a criatura a fazer uma nova rola-\ngem de dados e aceitar o novo resulta-\ndo, seja ele um sucesso ou falha. Cria-\nturas involuntárias têm direito a um \nteste de Vontade para negar o efeito."
      }
    ]
  },
  {
    "id": "primor_atletico",
    "name": "Primor Atlético",
    "circle": 1,
    "type": "arcana",
    "school": "Transmutação",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura",
    "duration": "cena",
    "description": "Você modifica os limites físicos do \nalvo, que recebe deslocamento +9m e \n+10 em testes de Atletismo.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "além do normal, o alvo rece-\nbe um bônus adicional de"
      },
      {
        "cost": "+1 PM",
        "description": "além do normal, o alvo pode \nescalar paredes e tetos sem precisar \nfazer testes de Atletismo. Para isso, \nprecisa estar com as mãos livres, mas \npode usar uma única mão se ficar para-\ndo no lugar. O alvo não fica despreve-\nnido enquanto escala."
      },
      {
        "cost": "+1 PM",
        "description": "muda a execução para ação de \nmovimento, o alcance para pessoal, o \nalvo para você e a duração para instan-\ntânea. Você salta muito alto e pousa \nem alcance corpo a corpo de uma cria-\ntura em alcance curto. Se fizer um ata-\nque corpo a corpo contra essa criatura \nneste turno, recebe os benefícios e pe-\nnalidades de uma investida e sua arma \ncausa um dado extra de dano do mes-\nmo tipo durante este ataque."
      },
      {
        "cost": "+3 PM",
        "description": "além do normal, ao fazer tes-\ntes de perícias baseadas em Força, \nDestreza ou Constituição, o alvo pode \nrolar dois dados e escolher o melhor. \nNão afeta testes de ataque ou resistên-\ncia. Requer 2º círculo.\n201\nCapítulo Quatro"
      }
    ]
  },
  {
    "id": "profanar",
    "name": "Profanar",
    "circle": 1,
    "type": "divina",
    "school": "Necromancia",
    "execution": "padrão",
    "range": "longo",
    "targetArea": "esfera com 9m de raio",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: longo; \nÁrea: esfera com 9m de raio; Dura-\nção: 1 dia.\nVocê enche a área com energia ne-\ngativa. Dano de trevas é maximiza-\ndo dentro da área. Isso também afeta \nPV curados em mortos-vivos por esses \nefeitos. Esta magia não pode ser lança-\nda em uma área contendo um símbolo \nvisível dedicado a uma divindade que \nnão a sua. Profanar anula Consagrar.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "além do normal, mortos-vivos \nna área recebem"
      },
      {
        "cost": "+2 PM",
        "description": "aumenta os bônus para mor-\ntos-vivos em"
      }
    ]
  },
  {
    "id": "projetar_consciencia",
    "name": "Projetar Consciência",
    "circle": 5,
    "type": "universal",
    "school": "Adivinhação",
    "execution": "padrão",
    "range": "ilimitado \n(veja texto)",
    "targetArea": "local ou criatura co-\nnhecidos",
    "duration": "sustentada",
    "description": "Esta magia faz com que sua consciência \ndeixe seu corpo e se transporte instan-\ntaneamente para um local ou para per-\nto de uma criatura. Se escolher um lo-\ncal, ele precisa ser conhecido por você. \nSe escolher uma criatura, você trans-\nporta sua consciência até onde ela esti-\nver, desde que esteja no mesmo plano.\nVocê adquire uma forma fantasmagórica \ninvisível, mas pode se mostrar usando \numa ação de movimento. Pode se mover \nem qualquer direção com deslocamen-\nto de voo 18m e, por ser incorpóreo, é \ncapaz de atravessar objetos sólidos, mas \nfica limitado a se mover dentro dos li-\nmites do local, ou dentro de alcance cur-\nto da criatura alvo. Você pode ver e ou-\nvir como se estivesse presente no local \ne pode falar mentalmente com qualquer \ncriatura que possa ver, contanto que te-\nnham um idioma em comum.",
    "upgrades": [
      {
        "cost": "+10 PM",
        "description": "além do normal, sua proje-\nção é capaz de lançar magias que não \nprecisem de componentes materiais e \ntenham duração diferente de sustenta-\nda. Sua forma fantasmagórica funciona \ncomo na magia Forma Etérea, sendo afe-\ntada por magias de abjuração e essên-\ncia, mas as magias que ela lança podem \nafetar criaturas corpóreas."
      }
    ]
  },
  {
    "id": "protecao_contra_magia",
    "name": "Proteção contra Magia",
    "circle": 3,
    "type": "divina",
    "school": "Abjuração",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura",
    "duration": "cena",
    "description": "Você protege o alvo contra efeitos má-\ngicos nocivos. O alvo recebe +5 em \ntestes de resistência contra magias.",
    "upgrades": [
      {
        "cost": "+4 PM",
        "description": "muda o bônus para"
      },
      {
        "cost": "+4 PM",
        "description": "em vez do normal, o alvo fica \nimune a uma escola de magia a sua es-\ncolha. Requer 4º Círculo."
      }
    ]
  },
  {
    "id": "protecao_divina",
    "name": "Proteção Divina",
    "circle": 1,
    "type": "divina",
    "school": "Abjuração",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura",
    "duration": "cena",
    "description": "Esta magia cria uma barreira mística \ninvisível que fornece ao alvo +2 em \ntestes de resistência.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o bônus concedido \nem"
      },
      {
        "cost": "+2 PM",
        "description": "muda a execução para reação, \no alcance para curto e a duração para 1 \nrodada. Em vez do normal, o alvo rece-\nbe"
      },
      {
        "cost": "+2 PM",
        "description": "muda o alvo para área de es-\nfera com 3m de raio. Todos os aliados \ndentro do círculo recebem o bônus da \nmagia. Requer 2º círculo."
      }
    ]
  },
  {
    "id": "purificacao",
    "name": "Purificação",
    "circle": 2,
    "type": "divina",
    "school": "Evocação",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura",
    "duration": "instantânea",
    "description": "Você purifica a criatura tocada, remo-\nvendo uma condição dela entre abala-\ndo, apavorado, alquebrado, atordoado, \ncego, confuso, debilitado, enjoado, en-\nvenenado, esmorecido, exausto, fasci-\nnado, fatigado, fraco, frustrado, lento, \nofuscado, paralisado, pasmo ou surdo.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "também recupera todos os PV \nperdidos por veneno."
      },
      {
        "cost": "+2 PM",
        "description": "em vez de uma, remove todas \nas condições listadas."
      },
      {
        "cost": "+3 PM",
        "description": "também permite que o alvo \nsolte qualquer item amaldiçoado que \nesteja segurando (mas não remove a \nmaldição do item em si)."
      }
    ]
  },
  {
    "id": "queda_suave",
    "name": "Queda Suave",
    "circle": 1,
    "type": "arcana",
    "school": "Transmutação",
    "execution": "reação",
    "range": "curto",
    "targetArea": "1 criatura",
    "duration": "até chegar ao solo \nou cena, o que vier primeiro",
    "description": "Execução: reação; Alcance: curto; Al-\nvos: 1 criatura ou objeto Grande ou \nmenor; Duração: até chegar ao solo \nou cena, o que vier primeiro.\nO alvo cai lentamente. A velocidade da \nqueda é reduzida para 18m por rodada \n- o suficiente para não causar dano. \nComo lançar esta magia é uma reação, \nvocê pode lançá-la rápido o bastante \npara salvar a si ou um aliado de quedas \ninesperadas. Lançada sobre um projétil \n- como uma flecha ou uma rocha lar-\ngada do alto de um penhasco -, a ma-\ngia faz com que ele cause metade do \ndano normal, devido à lentidão.\nQueda Suave só funciona em criaturas e \nobjetos em queda livre; a magia não vai \nfrear um golpe de espada ou o mergu-\nlho rasante de um atacante voador.",
    "upgrades": [
      {
        "cost": "Truque",
        "description": "muda o alvo para objeto \nMinúsculo. Em vez do normal, você \npode gastar uma ação de movimento \npara levitar o alvo até 4,5m em qual-\nquer direção."
      },
      {
        "cost": "+2 PM",
        "description": "muda o alvo para até 10 cria-\nturas ou objetos adequados."
      }
    ]
  },
  {
    "id": "enfraquecimento",
    "name": "Enfraquecimento",
    "circle": 1,
    "type": "arcana",
    "school": "Necromancia",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 criatura",
    "duration": "cena",
    "description": "Execução: padrão; Alcance: curto; \nAlvo: 1 criatura; Duração: cena; Re-\nsistência: Fortitude parcial.\nVocê dispara um raio púrpura que dre-\nna as forças do alvo. Se falhar na resis-\ntência, o alvo fica fatigado. Se passar, \nfica vulnerável. Note que, como efeitos \nde magia não acumulam, lançar esta \nmagia duas vezes contra o mesmo alvo \nnão irá deixá-lo exausto.",
    "upgrades": [
      {
        "cost": "Truque",
        "description": "muda o alcance para toque e \na resistência para Fortitude anula. Em \nvez do normal, sua mão emana um bri-\nlho púrpura e, ao tocar o alvo, ele fica \nfatigado."
      },
      {
        "cost": "+2 PM",
        "description": "em vez do normal, se falhar na \nresistência o alvo fica exausto. Se pas-\nsar, fica fatigado. Requer 2º círculo."
      },
      {
        "cost": "+5 PM",
        "description": "como acima, mas muda o alvo \npara criaturas escolhidas. Requer 3º \ncírculo.\n202\nMagia"
      }
    ]
  },
  {
    "id": "raio_polar",
    "name": "Raio Polar",
    "circle": 4,
    "type": "arcana",
    "school": "Evocação",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "1 criatura",
    "duration": "instantânea",
    "description": "Resistência: Fortitude parcial.\nVocê dispara um raio azul esbranqui-\nçado de gelo e ar congelante. O alvo \nsofre 10d8 pontos de dano de frio e \nfica preso em um bloco de gelo (para-\nlisado). Se passar no teste de resistên-\ncia, sofre metade do dano e, em vez de \nparalisado, fica lento por uma rodada.\nÉ possível quebrar o gelo para libertar \numa criatura presa: o bloco tem 20 PV, \nRD 10 e é vulnerável a fogo. Uma cria-\ntura presa pode gastar uma ação com-\npleta para fazer um teste de Atletismo \ne se libertar do gelo; cada vez que pas-\nsar no teste causa 10 pontos de dano \nao bloco, ignorando a RD.",
    "resistance": "Fortitude parcial",
    "upgrades": [
      {
        "cost": "+3 PM",
        "description": "aumenta o dano em"
      }
    ]
  },
  {
    "id": "raio_solar",
    "name": "Raio Solar",
    "circle": 2,
    "type": "divina",
    "school": "Evocação",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "linha de 30m",
    "duration": "instantâ-\nnea",
    "description": "Você canaliza uma poderosa rajada de \nenergia positiva que ilumina o campo \nde batalha. Criaturas na área sofrem \n4d8 pontos de dano de luz (ou 4d12, \nse forem mortos-vivos) e ficam ofus-\ncadas por uma rodada. Se passarem na \nresistência, sofrem metade do dano e \nnão ficam ofuscadas.",
    "resistance": "Reflexos (veja texto)",
    "upgrades": [
      {
        "cost": "Truque",
        "description": "muda a duração para cena e \na resistência para nenhuma. Em vez do \nnormal, cria um facho de luz que ilu-\nmina a área da magia. Uma vez por ro-\ndada, você pode mudar a direção do fa-\ncho como uma ação livre."
      },
      {
        "cost": "+2 PM",
        "description": "aumenta o dano ou cura em"
      },
      {
        "cost": "+3 PM",
        "description": "em vez do normal, criaturas \nvivas a sua escolha na área curam 4d8 \npontos de vida; o restante sofre o dano \nnormalmente."
      }
    ]
  },
  {
    "id": "reanimacao_impura",
    "name": "Reanimação Impura",
    "circle": 5,
    "type": "divina",
    "school": "Necromancia",
    "execution": "completa",
    "range": "toque",
    "targetArea": "1 criatura",
    "duration": "cena",
    "description": ""
  },
  {
    "id": "refugio",
    "name": "Refúgio",
    "circle": 2,
    "type": "arcana",
    "school": "Abjuração",
    "execution": "completa",
    "range": "curto",
    "targetArea": "domo com 6m de raio",
    "duration": "Instantânea",
    "description": "Execução: completa; Alcance: curto; \nEfeito: domo com 6m de raio; Dura-\nção: 1 dia.\nEsta magia cria um domo imóvel e \nquase opaco por fora, mas transpa-\nrente pelo lado de dentro. Ele prote-\nge contra calor, frio e forças pequenas, \nmas não contra qualquer coisa capaz \nde causar dano. Assim, o domo pro-\ntege contra neve e vento comuns, mas \nnão contra uma flecha ou Bola de Fogo. \nPorém, como o domo é quase opaco, \nqualquer criatura dentro dele tem ca-\nmuflagem total contra ataques vindos \nde fora. Criaturas podem entrar e sair \ndo domo livremente. Descansar dentro \ndo Refúgio concede recuperação normal \nde PV e PM.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "além do normal, os limites do \ndomo são envoltos por uma fumaça es-\ncura e espessa, que impede criaturas do \nlado de fora de enxergar ou ouvir o que \nestá dentro. Criaturas do lado de dentro \nenxergam e ouvem normalmente o que \nestá do lado de fora. A fumaça também \nbloqueia magias de adivinhação."
      },
      {
        "cost": "+3 PM",
        "description": "em vez do normal, cria uma \ncabana que comporta até 10 criaturas \nMédias. Descansar nesse espaço con-\ncede recuperação confortável (recupe-\nra PV e PM igual ao dobro do nível). \nPara todos os efeitos é uma cabana \nnormal, com paredes de madeira, te-\nlhado, uma porta, duas janelas e al-\nguma mobília (camas, uma mesa com \nbancos e uma lareira). A porta e as ja-\nnelas têm 15 PV, RD 5 e são protegidas \npor um efeito idêntico à magia Tranca \nArcana. As paredes têm 200 PV e RD 5."
      },
      {
        "cost": "+3 PM",
        "description": "em vez do normal, cria um es-\npaço extradimensional, similar a uma\ncaverna vazia e escura, que compor-\nta até 10 criaturas Médias. A entrada \npara o espaço precisa estar desenhada \nem um objeto fixo como uma grande \npedra ou árvore. Qualquer criatura que \natravesse a entrada consegue entrar \nno espaço. Nenhum efeito a partir do \nmundo real afeta o espaço e vice-ver-\nsa, mas aqueles que estiverem dentro \npodem observar o mundo real como \nse uma janela de 1m estivesse centra-\nda na entrada. Qualquer coisa que es-\nteja no espaço extradimensional surge \nno mundo real na área vazia mais pró-\nxima da entrada quando a duração da \nmagia acaba. Requer 3º círculo."
      }
    ]
  },
  {
    "id": "relampago",
    "name": "Relâmpago",
    "circle": 2,
    "type": "arcana",
    "school": "Evocação",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "linha de 30m",
    "duration": "instan-\ntânea",
    "description": "Execução: padrão; Alcance: pessoal; \nÁrea: linha de 30m; Duração: instan-\ntânea; Resistência: Reflexos reduz à \nmetade.\nVocê dispara um poderoso raio que \ncausa 6d6 pontos de dano de eletrici-\ndade em todas as criaturas e objetos li-\nvres na área.",
    "resistance": "Reflexos reduz à \nmetade",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o dano em"
      }
    ]
  },
  {
    "id": "flamejante_de_reynard",
    "name": "Flamejante de Reynard",
    "circle": 4,
    "type": "arcana",
    "school": "Evocação",
    "execution": "duas rodadas",
    "range": "médio",
    "targetArea": "bolas de fogo e relâm-\npagos",
    "duration": "sustentada",
    "description": "Execução: duas rodadas; Alcance: \nmédio; Efeito: bolas de fogo e relâm-\npagos; Duração: sustentada; Resis-\ntência: Reflexos reduz à metade.\nEsta é uma magia poderosa, desenvol-\nvida pelo metódico e impassível arqui-\nmago Reynard. Você invoca as energias \nelementais do fogo e do relâmpago, fa-\nzendo com que uma de suas mãos fi-\n203\nCapítulo Quatro\nque em chamas e a outra mão eletrifi-\ncada. Pela duração da magia, você pode \ngastar uma ação de movimento para \ndisparar uma bola de fogo (10d6 pon-\ntos de dano de fogo numa esfera com \n6m de raio) ou um relâmpago (10d6 \npontos de dano de eletricidade numa \nlinha). Você também pode, como uma \nação padrão, usar as duas mãos num \nataque de energia mista (20d12 pon-\ntos de dano, metade de fogo e meta-\nde de eletricidade, numa esfera com \n9m de raio). Você precisa estar com as \nduas mãos livres para invocar o efeito \nmisto e isso consome toda a energia \nda magia, terminando-a imediatamen-\nte. Por se tratar de um ritual comple-\nxo, o tempo de execução dessa magia \nnão pode ser reduzido."
  },
  {
    "id": "requiem",
    "name": "Réquiem",
    "circle": 5,
    "type": "arcana",
    "school": "Ilusão",
    "execution": "completa",
    "range": "curto",
    "targetArea": "criaturas escolhidas",
    "duration": "sustentada",
    "description": "",
    "resistance": "Vontade anula"
  },
  {
    "id": "resistencia_a_energia",
    "name": "Resistência a Energia",
    "circle": 1,
    "type": "universal",
    "school": "Abjuração",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura",
    "duration": "cena",
    "description": "Ao lançar esta magia, escolha entre \nácido, eletricidade, fogo, frio, luz ou \ntrevas. O alvo recebe redução de dano \n10 contra o tipo de dano escolhido.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta a redução de dano \nem"
      },
      {
        "cost": "+2 PM",
        "description": "muda a duração para um dia. \nRequer 2º círculo."
      },
      {
        "cost": "+5 PM",
        "description": "muda o alcance para curto e o \nalvo para criaturas escolhidas. Requer \n3º círculo."
      },
      {
        "cost": "+5 PM",
        "description": "muda o efeito para redução de \ndano contra todos os tipos listados na \nmagia. Requer 3º círculo."
      }
    ]
  },
  {
    "id": "rogar_maldicao",
    "name": "Rogar Maldição",
    "circle": 2,
    "type": "divina",
    "school": "Necromancia",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 criatura",
    "duration": "sustenta-\nda",
    "description": "Você entoa cânticos maléficos que \namaldiçoam uma vítima, criando efei-\ntos variados. Ao lançar a magia, escolha \nentre os seguintes.\nDebilidade: o alvo fica esmorecido e não \npode se comunicar ou lançar magias. \nAinda reconhece seus aliados e pode \nsegui-los e ajudá-los, mas sempre de \nmaneira simplória.\nDoença: muda a duração para instantâ-\nnea. O alvo contrai uma doença a sua \nescolha, que o afeta imediatamente \n(sem período de incubação).\nFraqueza: o alvo fica debilitado e lento.\nIsolamento: o alvo perde o uso de um \nde seus cinco sentidos a sua escolha. \nSe perder a visão, fica cego. Se perder a \naudição, fica surdo. Se perder o olfato \nou paladar, não pode usar a habilidade \nfaro. Se perder o tato, fica caído e não \npode se levantar.\nVocê também pode inventar sua pró-\npria maldição, usando esses exemplos \ncomo sugestões, mas o mestre tem a \npalavra final sobre o efeito.",
    "resistance": "Fortitude anula",
    "upgrades": [
      {
        "cost": "+3 PM",
        "description": "aumenta o número de efeitos \nque você pode escolher em"
      }
    ]
  },
  {
    "id": "roubar_a_alma",
    "name": "Roubar a Alma",
    "circle": 5,
    "type": "universal",
    "school": "Necromancia",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 criatura",
    "duration": "permanente",
    "description": "Você rouba a alma da vítima, arma-\nzenando-a em um objeto. Se o alvo \npassar no teste de resistência, sente o\nimpacto de sua alma ser puxada para \nfora do corpo e fica abalado por 1 roda-\nda. Se falhar, seu corpo fica caído, in-\nconsciente e inerte, enquanto sua alma \né transportada para dentro do obje-\nto. O corpo não envelhece nem se de-\ncompõe, permanecendo em estase. Ele \npode ser atacado e destruído normal-\nmente. O objeto escolhido deve custar \nT$ 1.000 por nível ou ND da criatu-\nra e não possuir uma alma presa ou se \nquebrará quando a magia for lançada \n(embora personagens não conheçam \no conceito de “nível” dentro do mun-\ndo de jogo, podem ter noção do poder \ngeral de uma criatura, estimando as-\nsim o valor do objeto). Se o objeto for \ndestruído, a magia se esvai. Se o cor-\npo ainda estiver disponível, a alma re-\ntorna para ele. Caso contrário, escapa \npara os Mundos dos Deuses.\nCusto adicional: sacrifício de 1 PM.",
    "resistance": "Vontade parcial",
    "upgrades": [
      {
        "cost": "+5 PM",
        "description": "o objeto que abriga a alma de-\ntém os mesmos PM totais que o alvo. \nSe estiver empunhando o objeto, você \npode usar esses PM para pagar o cus-\nto de PM para lançar magias. O objeto \nrecupera PM por dia como se o perso-\nnagem estivesse em descanso normal."
      }
    ]
  },
  {
    "id": "runa_de_protecao",
    "name": "Runa de Proteção",
    "circle": 2,
    "type": "universal",
    "school": "Abjuração",
    "execution": "1 hora",
    "range": "toque",
    "targetArea": "uma área de 6m de raio",
    "duration": "Instantânea",
    "description": "Você escreve uma runa pessoal em \numa superfície fixa, como uma parede \nou o chão, que protege uma pequena \nárea ao redor. Quando uma criatura \nentra na área afetada a runa explode, \ncausando 6d6 pontos de dano em to-\ndos os alvos a até 6m. A criatura que \nativa a runa não tem direi­to a teste de \nresistência; outras criatu­ras na área \ntêm direito a um teste de Reflexos \npara reduzir o dano à metade. Quando \nlança a magia, você escolhe o tipo de \ndano, entre ácido, eletricidade, fogo, \nfrio, luz ou trevas.\nVocê pode determinar que a runa se \native apenas em condições específicas \n- por exemplo, apenas por goblins ou \napenas por mortos-vivos. Você tam­\nbém pode criar uma palavra mágica \nque impeça a runa de se ativar.\n204\nMagia\nUm personagem pode encontrar a runa \ncom um teste de Investigação e desar­\nmá-la com um teste de Ladinagem.\nComponente material: pó de diamante no \nvalor de T$ 200, com o qual o conjura­\ndor desenha a runa, que brilha por al­\nguns instantes e depois se torna prati­\ncamente invisível.",
    "resistance": "varia (veja o texto)",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "aumenta o dano em"
      },
      {
        "cost": "+1 PM",
        "description": "muda o alvo para “você” e o \nalcance para “pessoal”. Ao invés do \nnormal, escolha uma magia de 1º cír-\nculo que você conhece e pode lan-\nçar, com tempo de execução de uma \nação padrão ou menor. Você escre-\nve a runa em seu corpo e especifica \numa condição de ativação como, por \nexemplo, “quando eu for alvo de um \nataque” ou “quando for alvo de uma \nmagia”. Quando a condição for cum-\nprida, você pode ativar a runa e lançar \na magia escolhida como uma reação. \nVocê só pode escrever uma runa em \nseu corpo ao mesmo tempo."
      }
    ]
  },
  {
    "id": "salto_dimensional",
    "name": "Salto Dimensional",
    "circle": 2,
    "type": "arcana",
    "school": "Convocação",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "você",
    "duration": "instantânea",
    "description": "Esta magia transporta você para outro \nlugar dentro do alcance. Você não pre-\ncisa perceber nem ter linha de efeito \nao seu destino, podendo simplesmen-\nte imaginá-lo. Por exemplo, pode se \ntransportar 3m adiante para ultrapas-\nsar uma porta fechada. Uma vez trans-\nportadas, criaturas não podem agir até \na rodada seguinte. Esta magia não per-\nmite que você apareça dentro de um \ncorpo sólido; se o ponto de chegada \nnão tem espaço livre, você ressurge na \nárea vazia mais próxima.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "muda o alcance para médio."
      },
      {
        "cost": "+1 PM",
        "description": "muda o alvo para você e uma \ncriatura voluntária. Você pode esco-\nlher este aprimoramento mais vezes \npara aumentar o número de alvos adi-\ncionais em"
      },
      {
        "cost": "+2 PM",
        "description": "muda a execução para reação. \nEm vez do normal, você recebe"
      },
      {
        "cost": "+3 PM",
        "description": "muda o alcance para longo."
      }
    ]
  },
  {
    "id": "santuario",
    "name": "Santuário",
    "circle": 1,
    "type": "divina",
    "school": "Abjuração",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura",
    "duration": "cena",
    "description": "Execução: padrão; Alcance: toque; \nAlvo: 1 criatura; Duração: cena; Re-\nsistência: Vontade anula.\nQualquer criatura que tente fazer uma \nação hostil contra o alvo deve fazer um \nteste de Vontade. Se falhar, não conse-\ngue, perde a ação e não pode tentar no-\nvamente enquanto a magia durar. San-\ntuário não protege o alvo de efeitos de \nárea. Além disso, o próprio alvo tam-\nbém não pode fazer ações hostis (in-\ncluindo forçar outras criaturas a ata-\ncá-lo), ou a magia é dissipada - mas \npode usar habilidades e magias de cura \ne suporte, como Curar Ferimentos e Bên-\nção.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "além do normal, escolha um \ntipo de criatura entre animal, constru-\nto ou morto-vivo. Você não pode ser \npercebido por criaturas não inteligen-\ntes (Int -4 ou menor) do tipo escolhido."
      }
    ]
  },
  {
    "id": "segunda_chance",
    "name": "Segunda Chance",
    "circle": 5,
    "type": "divina",
    "school": "Evocação",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura",
    "duration": "instantânea",
    "description": "Um brilho de luz, na forma de asas de \nfênix, emana do alvo. Ele recupera 200 \npontos de vida e se cura de qualquer \ndas seguintes condições: abalado, apa-\nvorado, alquebrado, atordoado, cego, \nconfuso, debilitado, enjoado, envene-\nnado, esmorecido, exausto, fascinado, \nfatigado, fraco, frustrado, lento, ofus-\ncado, paralisado, pasmo ou surdo.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "aumenta a cura em"
      },
      {
        "cost": "+2 PM",
        "description": "muda o alcance para curto e o \nalvo para até 5 criaturas."
      }
    ]
  },
  {
    "id": "selo_de_mana",
    "name": "Selo de Mana",
    "circle": 3,
    "type": "universal",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura",
    "duration": "cena",
    "description": "Execução: padrão; Alcance: toque; \nAlvo: 1 criatura; Duração: cena; Resis-\ntência: Vontade parcial.\nSeu toque manifesta um selo mágico \nna pele do alvo, que atrapalha o fluxo \nde mana. Pela duração da magia, sem-\npre que o alvo realizar qualquer ação \nque gaste PM, deve fazer um teste de\nVontade; se passar, faz a ação normal-\nmente. Se falhar, a ação não tem efeito \n(mas os PM são gastos mesmo assim)."
  },
  {
    "id": "semiplano",
    "name": "Semiplano",
    "circle": 5,
    "type": "arcana",
    "school": "Convocação",
    "execution": "completa",
    "range": "curto",
    "targetArea": "semiplano com 30m de lado",
    "duration": "1 dia",
    "description": "Você cria uma dimensão particular. \nVocê pode entrar no semiplano gastan-\ndo uma ação padrão e 10 PM, desapa-\nrecendo do plano material como se ti-\nvesse se teletransportado. Você pode \nlevar criaturas voluntárias que esteja \ntocando, ao custo de 1 PM por criatu-\nra extra. Você também pode levar ob-\njetos que esteja tocando, ao custo de 1 \nPM por objeto Médio ou menor, 2 PM \npor objeto Grande, 5 PM por Enorme e \n10 PM por Colossal. Uma vez no semi-\nplano, pode gastar uma ação completa \npara voltar ao plano material, no mes-\nmo local onde estava. Caso conheça a \nmagia Viagem Planar, pode lançá-la para \nvoltar ao plano material em outro local.\nVocê escolhe a forma e a aparência do \nsemiplano - uma caverna, um aste-\nroide que singra o éter, um palacete \nde cristal etc. Ele contém ar, luz e ca-\nlor, mas além disso é vazio. Entretan-\nto, você pode levar itens (mobília, fer-\nramentas etc.) a cada viagem.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "adiciona alvo (1 criatura). Você \ncria uma semiplano labiríntico e expulsa \no alvo para ele. A cada rodada, a vítima \ntem direito a um teste de Investigação \nou Sobrevivência, com bônus cumula-\ntivo de"
      }
    ]
  },
  {
    "id": "servo_divino",
    "name": "Servo Divino",
    "circle": 3,
    "type": "divina",
    "school": "Convocação",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "criatura conjurada",
    "duration": "cena ou até ser descarregada",
    "description": "Execução: padrão; Alcance: curto; \nEfeito: criatura conjurada; Duração: \ncena ou até ser descarregada.\n205\nCapítulo Quatro\nVocê pede a sua divindade que envie \num espírito para ajudá-lo. Esse espíri-\nto realiza uma tarefa a sua escolha que \npossa ser cumprida em até uma hora \n- desde algo simples como “use suas \nasas para nos levar até o topo da mon-\ntanha” até algo complexo como “es-\ncolte esses camponeses até o castelo”. \nA magia é descarregada quando a cria-\ntura cumpre a tarefa, retornando a seu \nplano natal. O tipo de criatura é esco-\nlhido pelo mestre, de acordo com as \nnecessidades da tarefa.\nComponente material: um pagamento de \nT$ 100 ao espírito. A forma de paga-\nmento varia - doações a um templo, \num item mágico ou mesmo dinheiro.",
    "upgrades": [
      {
        "cost": "+4 PM",
        "description": "muda a duração para um dia \nou até ser descarregada. O espírito reali-\nza uma tarefa a sua escolha que exija até \num dia. O custo do pagamento aumen-\nta para T$ 500. O resto segue normal."
      }
    ]
  },
  {
    "id": "servo_morto_vivo",
    "name": "Servo Morto-Vivo",
    "circle": 3,
    "type": "universal",
    "school": "Necromancia",
    "execution": "completa",
    "range": "toque",
    "targetArea": "1 cadáver",
    "duration": "instantânea",
    "description": "Esta magia transforma o cadáver de \num humanoide, animal ou monstro \nem um esqueleto ou zumbi (conforme \no estado de conservação do corpo). O \nmorto-vivo então obedece a todos os \nseus comandos, mesmo suicidas. Se \nquiser que o morto-vivo o acompanhe, \nele funciona como um parceiro inician-\nte, de um tipo a sua escolha entre aju-\ndante, atirador, combatente, fortão, \nguardião ou montaria.\nUma vez por rodada, quando sofre \ndano, você pode sacrificar um servo \nmorto-vivo e evitar esse dano. O ser-\nvo é destruído no processo e não pode \nser reanimado\nComponente material: um ônix negro \n(T$ 100), inserido na boca ou olho \ndo cadáver.",
    "upgrades": [
      {
        "cost": "+3 PM",
        "description": "muda o componente material \npara pó de ônix negro (T$ 500). Em \nvez de um zumbi ou esqueleto, cria um \ncarniçal. Ele pode funcionar como um \nparceiro veterano, escolhido entre aju-\ndante, atirador, combatente, fortão ou \nguardião. O resto segue normal."
      },
      {
        "cost": "+3 PM",
        "description": "muda o componente material \npara pó de ônix negro (T$ 500). Em \nvez de um zumbi ou esqueleto, cria\numa sombra. Ela pode funcionar como \num parceiro veterano, escolhido entre \nassassino, combatente ou perseguidor. \nO restante da magia segue normal."
      }
    ]
  },
  {
    "id": "servos_invisiveis",
    "name": "Servos Invisíveis",
    "circle": 2,
    "type": "arcana",
    "school": "Convocação",
    "execution": "padrão",
    "range": "longo",
    "targetArea": "criaturas conjuradas",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: longo; \nEfeito: criaturas conjuradas; Dura-\nção: 1 cena.\nVocê cria até três servos invisíveis e \nsilenciosos, capazes de realizar tare-\nfas simples como apanhar lenha, co-\nlher frutos, varrer o chão ou alimentar \num cavalo. Os servos podem ser usa-\ndos para manter arrumada e organiza-\nda uma mansão ou pequena torre ou \npara preparar um acampamento nos \nermos para você e seus aliados (veja a \nperícia Sobrevivência, na página 123).\nEles também podem ajudá-lo em tare-\nfas mais complexas, como fazer uma \npesquisa ou preparar uma poção, mas \nisso consome sua energia mágica. Você \npode “gastar” um servo para receber \num bônus não cumulativo de +2 em \num teste de perícia (exceto testes de \nataque e resistência). Os servos não \nsão criaturas reais; não podem lutar, \nnem resistir a qualquer dano ou efei-\nto que exija um teste de resistência ou \nteste oposto - falharão automatica-\nmente no teste e serão destruídos.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o número de servos \nconjurados em 1."
      }
    ]
  },
  {
    "id": "seta_infalivel_de_talude",
    "name": "Seta Infalível de Talude",
    "circle": 1,
    "type": "arcana",
    "school": "Evocação",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "1 criatura",
    "duration": "instantânea",
    "description": "Execução: padrão; Alcance: médio; \nAlvos: criaturas escolhidas; Duração: \ninstantânea.\nFavorita entre arcanistas iniciantes, \nesta magia lança duas setas de energia\nque causam 1d4+1 pontos de dano de \nessência cada. Você pode lançar as se-\ntas em alvos diferentes ou concentrá-las \nnum mesmo alvo. Caso você possua um \nbônus no dano de magias, como pelo \npoder Arcano de Batalha, ele é aplicado \nem apenas uma seta (o bônus vale para \na magia, não cada alvo).",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "muda as setas para lanças de \nenergia que surgem e caem do céu. \nCada lança causa 1d8"
      },
      {
        "cost": "+2 PM",
        "description": "muda o número de setas/lan-\nças para três."
      },
      {
        "cost": "+4 PM",
        "description": "muda o número de setas/lan-\nças para cinco. Requer 2º círculo."
      }
    ]
  },
  {
    "id": "silencio",
    "name": "Silêncio",
    "circle": 2,
    "type": "divina",
    "school": "Ilusão",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "esfera com 6m de raio",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: médio; \nÁrea: esfera com 6m de raio; Dura-\nção: sustentada.\nUm silêncio sepulcral recai sobre a \nárea e nenhum som é produzido nela. \nEnquanto estiverem na área, todas as \ncriaturas ficam surdas. Além disso, \ncomo lançar magias exige palavras má-\ngicas, normalmente nenhuma magia \npode ser lançada dentro da área.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "muda a área para alvo de 1 ob-\njeto. Em vez do normal, o alvo emana \numa área de silêncio com 3m de raio. \nSe lançar a magia num objeto de uma \ncriatura involuntária, ela tem direito a \num teste de Vontade para anulá-la."
      }
    ]
  },
  {
    "id": "soco_de_arsenal",
    "name": "Soco de Arsenal",
    "circle": 2,
    "type": "divina",
    "school": "Convocação",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "1 criatura",
    "duration": "instantânea",
    "description": "Ninguém sabe se Mestre Arsenal foi \nrealmente o criador desta magia - \nmas ele foi o primeiro a utilizá-la. \nVocê fecha o punho e gesticula como \nse estivesse golpeando o alvo, causan-\ndo dano de impacto igual a 4d6 + sua \nForça. A vítima é empurrada 3m na \ndireção oposta à sua. Passar no teste \nde resistência reduz o dano à metade \ne evita o empurrão.",
    "resistance": "Fortitude parcial",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "muda o alcance para pessoal, \no alvo para você, a duração para cena\n206\nMagia\ne a resistência para nenhuma. Em vez \ndo normal, seus ataques corpo a corpo \npassam a acertar inimigos distantes. \nSeu alcance natural aumenta em 3m; \numa criatura Média pode atacar adver-\nsários a até 4,5m, por exemplo."
      },
      {
        "cost": "+2 PM",
        "description": "aumenta o dano em"
      },
      {
        "cost": "+4 PM",
        "description": "aumenta o empurrão em"
      }
    ]
  },
  {
    "id": "sombra_assassina",
    "name": "Sombra Assassina",
    "circle": 5,
    "type": "arcana",
    "school": "Ilusão",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 criatura",
    "duration": "cena",
    "description": "Execução: padrão; Alcance: curto; \nAlvo: 1 criatura; Duração: cena; Re-\nsistência: Vontade parcial.\nEsta magia cria uma duplicata ilusória \ndo alvo na forma de uma silhueta, li-\ngada a ele como se fosse uma manifes-\ntação sólida de sua própria sombra. A \nduplicata de sombras segue automati-\ncamente o alvo. Sempre que o alvo faz \numa ação hostil - fazer um ataque, \nusar uma habilidade, lançar uma ma-\ngia - a sombra imediatamente realiza \na mesma ação contra o alvo, usando as \nmesmas estatísticas e rolagens. A som-\nbra pode ser atacada, tem as mesmas \nestatísticas do alvo e é destruída quan-\ndo chega a 0 PV. Se o alvo passar no \nteste de resistência, a sombra desapa-\nrece no final do turno do alvo, depois \nde copiar sua ação dessa rodada."
  },
  {
    "id": "sonho",
    "name": "Sonho",
    "circle": 4,
    "type": "arcana",
    "school": "Adivinhação",
    "execution": "10 minutos",
    "range": "ili-\nmitado",
    "targetArea": "1 criatura viva",
    "duration": "Instantânea",
    "description": "Execução: 10 minutos; Alcance: ili-\nmitado; Alvo: 1 criatura viva; Dura-\nção: veja texto.\nVocê entra nos sonhos de uma criatu-\nra. Uma vez lá, pode conversar com \nela até que ela acorde. Se o alvo não \nestiver dormindo quando você lançar \na magia, você pode permanecer em \ntranse até que ele adormeça. Duran-\nte o transe, você fica indefeso e sem \nconsciência dos arredores. Você pode \nsair do transe quando quiser, mas a \nmagia termina.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "transforma o sonho do alvo \nem um pesadelo. A vítima deve fazer \num teste de Vontade. Se falhar, não \nrecupera PV ou PM pela noite, sofre \n1d10 pontos de dano de trevas e acor-\nda fatigada. A vítima recebe bônus ou \npenalidades em seu teste de resistên-\ncia, dependendo do conhecimento que \nvocê tiver dela. Use os mesmos modi-\nficadores da magia Vidência."
      }
    ]
  },
  {
    "id": "sono",
    "name": "Sono",
    "circle": 1,
    "type": "arcana",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 humanoide",
    "duration": "cena",
    "description": "Um cansaço místico recai sobre o alvo. \nSe falhar na resistência, ele fica incons-\nciente e caído ou, se estiver envolvido \nem combate ou outra situação perigo-\nsa, fica exausto por 1 rodada, depois fa-\ntigado. Em ambos os casos, se passar, \no alvo fica fatigado por 1d4 rodadas.",
    "resistance": "Vontade parcial",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "alvos que falhem na resistên-\ncia ficam exaustos por 1d4"
      },
      {
        "cost": "+2 PM",
        "description": "muda o alvo para criatura."
      }
    ]
  },
  {
    "id": "sopro_da_salvacao",
    "name": "Sopro da Salvação",
    "circle": 3,
    "type": "divina",
    "school": "Evocação",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "cone de 9m",
    "duration": "instan-\ntânea",
    "description": "Execução: padrão; Alcance: pessoal; \nÁrea: cone de 9m; Duração: instan-\ntânea.\nVocê enche seus pulmões de luz e \nenergia positiva e sopra um cone de \npoeira reluzente. O sopro afeta apenas \nseus aliados na área, curando 2d8+4 \npontos de vida e removendo uma das \nseguintes condições de todos os alvos: \nabalado, atordoado, apavorado, alque-\nbrado, cego, confuso, debilitado, enfei-\ntiçado, enjoado, esmorecido, exausto, \nfascinado, fatigado, fraco, frustrado, \nlento, paralisado, pasmo e surdo.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta a cura em"
      },
      {
        "cost": "+4 PM",
        "description": "além do normal, se um aliado \nestiver com PV negativos, seus PV são \nlevados a 0 e então a cura é aplicada."
      }
    ]
  },
  {
    "id": "sopro_das_uivantes",
    "name": "Sopro das Uivantes",
    "circle": 2,
    "type": "arcana",
    "school": "Evocação",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "cone de 9m",
    "duration": "instan-\ntânea",
    "description": "Você sopra ar gélido que causa 4d6 \npontos de dano de frio (Fortitude re-\nduz à metade). Criaturas de tamanho \nMédio ou menor que falhem na resis-\ntência ficam caídas e são empurradas \n6m na direção oposta. Se houver uma \nparede ou outro objeto sólido (mas\nnão uma criatura) no caminho, a cria-\ntura para de se mover, mas sofre +2d6 \npontos de dano de impacto.",
    "resistance": "Fortitude parcial",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o dano de frio em"
      }
    ]
  },
  {
    "id": "suporte_ambiental",
    "name": "Suporte Ambiental",
    "circle": 1,
    "type": "divina",
    "school": "Abjuração",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura",
    "duration": "1 dia",
    "description": "Esta magia facilita a sobrevivência em \nambientes hostis. O alvo fica imune \naos efeitos de calor e frio extremos, \npode respirar na água se respirar ar \n(ou vice-versa) e não sufoca em fuma-\nça densa."
  },
  {
    "id": "sussurros_insanos",
    "name": "Sussurros Insanos",
    "circle": 2,
    "type": "arcana",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 humanoide",
    "duration": "cena",
    "description": "Você murmura palavras desconexas \nque afetam a mente do alvo. O alvo \nfica confuso.",
    "resistance": "Vontade anula",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o número de alvos \nem"
      },
      {
        "cost": "+3 PM",
        "description": "muda o alvo para 1 criatura."
      }
    ]
  },
  {
    "id": "talho_invisivel_de_edauros",
    "name": "Talho Invisível de Edauros",
    "circle": 4,
    "type": "arcana",
    "school": "Evocação",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "cone de 9m",
    "duration": "instan-\ntânea",
    "description": "Esta magia cruel foi desenvolvida pelo \nmago de combate Edauros, quando \nainda era um bípede. Você faz um ges-\nto rápido e dispara uma lâmina de ar \nem alta velocidade. Criaturas na área \nsofrem 10d8 pontos de dano de corte e \nficam sangrando. Alvos que passem no \nteste de resistência sofrem metade do \ndano e não ficam sangrando.",
    "resistance": "Fortitude parcial",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o dano em"
      },
      {
        "cost": "+2 PM",
        "description": "muda o alvo para você, a dura-\nção para sustentada e o efeito para uma \nvez por rodada, como uma ação de mo-\nvimento, você pode disparar uma lâ-\nmina de ar contra um alvo em alcance \nmédio, causando 6d8 pontos de dano \nde corte (Fortitude reduz à metade).\n207\nCapítulo Quatro"
      }
    ]
  },
  {
    "id": "teia",
    "name": "Teia",
    "circle": 1,
    "type": "arcana",
    "school": "Convocação",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "cubo com 6m de lado",
    "duration": "cena",
    "description": "Teia cria várias camadas de fibras entre-\nlaçadas e pegajosas na área. Qualquer \ncriatura na área que falhar na resistên-\ncia fica enredada. Uma vítima pode se \nlibertar com uma ação padrão e um \nteste de Acrobacia ou Atletismo. A \nárea ocupada por Teia é terreno difícil.\nA Teia é inflamável. Qualquer ataque \nque cause dano de fogo destrói as teias \npor onde passar, libertando as criaturas \nenredadas mas deixando-as em chamas.",
    "resistance": "Reflexos anula",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "além do normal, criaturas que \nfalhem na resistência também ficam \nimóveis."
      },
      {
        "cost": "+2 PM",
        "description": "além do normal, no início de \nseus turnos a magia afeta novamen-\nte qualquer criatura na área, exigindo \num novo teste de Reflexos. Requer 2º \ncírculo."
      }
    ]
  },
  {
    "id": "telecinesia",
    "name": "Telecinesia",
    "circle": 3,
    "type": "arcana",
    "school": "Transmutação",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "veja texto",
    "duration": "sustentada \nou instantânea (veja texto)",
    "description": "Empurrão Violento: nesta versão a ener-\ngia mágica é expelida de uma única vez \ne arremessa até 10 objetos (no máximo \n10 espaços). Os objetos devem estar a \naté 3m uns dos outros e podem ser ar-\nremessados até o alcance da magia.\nObjetos arremessados podem atingir \ncriaturas em seu caminho, causando \nde 1 ponto de dano de impacto por es-\npaço (objetos macios, sem pontas ou \nsem fio) até 1d6 pontos de dano por \nespaço (objetos duros, pontudos ou \nafiados). Criaturas atingidas têm direi-\nto a um teste de Reflexos para reduzir \no dano à metade.\nCriaturas Médias ou menores podem \nser arremessadas, mas têm direito a \num teste de Vontade para evitar o efei-\nto (em si mesmas ou em objetos que \nestejam segurando). Uma criatura ar-\nremessada contra uma superfície só-\nlida sofre 1d6 pontos de dano de im-\npacto para cada 3m que “voou” no \ndeslocamento (incluindo outras cria-\nturas; nesse caso, ambas sofrem o \ndano). Duração: instantânea."
  },
  {
    "id": "teletransporte",
    "name": "Teletransporte",
    "circle": 3,
    "type": "arcana",
    "school": "Convocação",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "até 5 criaturas voluntárias",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: toque; \nAlvo: até 5 criaturas voluntárias; Du-\nração: instantânea.\nEsta magia transporta os alvos para um \nlugar a sua escolha a até 1.000km. Você \nprecisa fazer um teste de Misticismo, \ncom dificuldade que depende de seu \nconhecimento sobre o local de destino.\nCD 20. Um lugar familiar, que você \nvisita com frequência.\nCD 30. Um lugar conhecido, que você \njá visitou pelo menos uma vez.\nCD 40. Um lugar que você nunca visi-\ntou e só conhece a partir da descrição \nde outra pessoa que esteve lá.\nVocê não pode se teletransportar para \num lugar que nunca visitou sem a des-\ncrição de alguém. Ou seja, não pode \nse transportar para a “sala de tesouro \ndo rei” se nunca esteve nela nem falou \ncom alguém que esteve.\nSe passar no teste, os alvos chegam ao \nlugar desejado. Se falhar, os alvos sur-\ngem 1d10 x 10km afastados em qual-\nquer direção (se o destino é uma ci-\ndade costeira, você pode surgir em \nalto-mar). Se falhar por 5 ou mais, \nvocê chega em um lugar parecido, mas \nerrado. E se você rolar 1 natural no \nteste a magia falha (mas você gasta os \nPM) e fica atordoado por 1d4 rodadas.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o número de alvos \nem"
      },
      {
        "cost": "+2 PM",
        "description": "em vez do normal, a magia te-\nletransporta os alvos para seu santuá-\nrio - um local familiar e previamen-\nte preparado. A magia pode ser usada \nsem limite de distância ou necessidade \nde testes, mas apenas dentro do mes-\nmo plano. Preparar um local como seu \nsantuário exige um ritual de um dia e \no gasto de T$ 1.000. Você só pode ter \num santuário por vez."
      }
    ]
  },
  {
    "id": "tempestade_divina",
    "name": "Tempestade Divina",
    "circle": 2,
    "type": "divina",
    "school": "Evocação",
    "execution": "completa",
    "range": "longo",
    "targetArea": "cilindro com 15m de raio e 15m \nde altura",
    "duration": "sustentada",
    "description": "Esta magia só pode ser usada em am-\nbientes abertos. A área fica sujeita a \num vendaval - ataques à distância \nsofrem penalidade de -5, chamas são \napagadas e névoas são dissipadas. Você \ntambém pode gerar chuva (-5 em tes-\ntes de Percepção), neve (como chuva, e \na área se torna terreno difícil) ou grani-\nzo (como chuva, mais 1 ponto de dano \nde impacto por rodada, no início de \nseus turnos).",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "além do normal, uma vez por \nrodada você pode gastar uma ação pa-\ndrão para fazer um raio cair sobre um \nalvo na área, causando 3d8 pontos de \ndano de eletricidade (Reflexos reduz \nà metade)."
      },
      {
        "cost": "+2 PM",
        "description": "aumenta o dano de raios (veja \nacima) em"
      },
      {
        "cost": "+3 PM",
        "description": "se escolheu causar chuva, ela \nse torna mais grossa, revelando a si-\nlhueta de criaturas invisíveis na área. \nCriaturas Médias ou menores ficam \nlentas e criaturas voadoras precisam \npassar num teste de Atletismo por ro-\ndada ou caem ao solo (mas podem fa-\nzer testes de Acrobacia para reduzir o \ndano de queda, como o normal)."
      },
      {
        "cost": "+3 PM",
        "description": "se escolheu causar granizo, \nmuda o dano para 2d6 por rodada."
      },
      {
        "cost": "+3 PM",
        "description": "se escolheu causar neve, cria-\nturas na área sofrem 2d6 pontos de \ndano de frio no início de seus turnos."
      },
      {
        "cost": "+3 PM",
        "description": "muda a área para cilindro com \n90m de raio e 90m de altura.\n208\nMagia"
      }
    ]
  },
  {
    "id": "tentaculos_de_trevas",
    "name": "Tentáculos de Trevas",
    "circle": 3,
    "type": "arcana",
    "school": "Necromancia",
    "execution": "padrão",
    "range": "médio",
    "targetArea": "esfera com 6m de raio",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: médio; \nÁrea: esfera com 6m de raio; Dura-\nção: cena.\nUm círculo de energias sombrias se \nabre no chão, de onde surgem tentácu-\nlos feitos de treva viscosa. Ao lançar a \nmagia e no início de cada um de seus \nturnos, você faz um teste da manobra \nagarrar (usando seu valor de Misticis-\nmo) contra cada criatura na área. Se \nvocê passar, a criatura é agarrada; se \na vítima já está agarrada, é esmagada, \nsofrendo 4d6 pontos de dano de tre-\nvas. A área conta como terreno difícil. \nOs tentáculos são imunes a dano.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta o raio da área em"
      }
    ]
  },
  {
    "id": "terremoto",
    "name": "Terremoto",
    "circle": 4,
    "type": "divina",
    "school": "Evocação",
    "execution": "padrão",
    "range": "longo",
    "targetArea": "esfera com 30m de raio",
    "duration": "Instantânea",
    "description": "Esta magia cria um tremor de terra que \nrasga o solo. O terremoto dura uma ro-\ndada, durante a qual criaturas sobre o \nsolo ficam atordoadas (apenas uma vez \npor cena). Barreiras físicas não inter-\nrompem a área de Terremoto.\nO efeito exato depende do terreno.\nCaverna ou subterrâneo: a magia derru-\nba o teto, causando 12d6 pontos de \ndano de impacto e agarrando todas as \ncriaturas na área. Um teste de Refle-\nxos reduz o dano à metade e evita a \ncondição.\nConstrução: todas as estruturas na área \nsofrem 200 pontos de dano de impac-\nto, o suficiente para derrubar constru-\nções de madeira ou alvenaria simples, \nmas não de alvenaria reforçada. Cria-\nturas em uma construção que desmo-\nrone sofrem o mesmo efeito de criatu-\nras em uma caverna (veja acima).\nEspaço aberto: fendas se abrem no \nchão. Cada criatura na área precisa ro-\nlar um dado; em um resultado ímpar, \numa fenda se abre sob ela e ela precisa \nfazer um teste de Reflexos; se falhar, \ncai na fenda. A criatura pode escapar \ngastando uma ação completa e pas-\nsando em um teste de Atletismo. No \ninício do seu próximo turno as fendas \nse fecham, matando todos que este-\njam dentro delas.\nPenhasco: o penhasco racha, criando um \ndesmoronamento que percorre uma \ndistância horizontal igual à distância da \nqueda. Por exemplo, um penhasco com \n30m de altura desmorona em uma área \nde 30m de comprimento além da base. \nQualquer criatura no caminho sofre \n12d6 pontos de dano de impacto e fica \nagarrada. Um teste de Reflexos reduz o \ndano à metade e evita ficar agarrado.\nRio, lago ou pântano: fissuras se abrem \nsob a água, drenando-a e formando um \nlamaçal. Criaturas na área precisam fa-\nzer um teste de Reflexos para não afun-\ndarem na lama e ficarem agarradas. No \ninício do seu próximo turno as fissuras \nse fecham, possivelmente afogando as \ncriaturas que ficaram agarradas.",
    "resistance": "veja texto"
  },
  {
    "id": "toque_chocante",
    "name": "Toque Chocante",
    "circle": 1,
    "type": "arcana",
    "school": "Evocação",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura",
    "duration": "instantâ-\nnea",
    "description": "Execução: padrão; Alcance: toque; \nAlvo: 1 criatura; Duração: instantâ-\nnea; Resistência: Fortitude reduz à \nmetade.\nArcos elétricos envolvem sua mão, \ncausando 2d8+2 pontos de dano de \neletricidade. Se o alvo usa armadura de \nmetal (ou carrega muito metal, a crité-\nrio do mestre), sofre uma penalidade \nde -5 no teste de resistência.",
    "resistance": "Fortitude reduz à \nmetade",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "aumenta o dano em"
      },
      {
        "cost": "+2 PM",
        "description": "muda a resistência para ne-\nnhum. Como parte da execução da ma-\ngia, você faz um ataque corpo a corpo \ncontra o alvo. Se acertar, causa o dano \ndo ataque e da magia."
      }
    ]
  },
  {
    "id": "toque_da_morte",
    "name": "Toque da Morte",
    "circle": 5,
    "type": "universal",
    "school": "Necromancia",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura",
    "duration": "instantâ-\nnea",
    "description": "Sua mão exala energias letais. A cria-\ntura sofre 10d8+10 pontos de dano de \ntrevas. Se estiver com menos da meta-\nde de seus PV, em vez disso deve fazer \num teste de Fortitude. Se passar, sofre\no dano normal. Se falhar, seus PV são \nreduzidos a -10.",
    "resistance": "veja texto",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "muda o alcance para curto. \nEm vez de tocar no alvo, você dispara \num raio púrpura da ponta de seu dedo \nindicador."
      }
    ]
  },
  {
    "id": "toque_vampirico",
    "name": "Toque Vampírico",
    "circle": 2,
    "type": "arcana",
    "school": "Necromancia",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 criatura",
    "duration": "instantâ-\nnea",
    "description": "Execução: padrão; Alcance: toque; \nAlvo: 1 criatura; Duração: instantâ-\nnea; Resistência: Fortitude reduz à \nmetade.\nSua mão brilha com energia sombria, \ncausando 6d6 pontos de dano de tre-\nvas. Você recupera pontos de vida \niguais à metade do dano causado (se \ncausou algum dano).",
    "resistance": "Fortitude reduz à \nmetade",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "muda a resistência para ne-\nnhum . Como parte da execução da ma-\ngia, você pode fazer um ataque corpo \na corpo contra o alvo. Se acertar, cau-\nsa o dano do ataque e da magia, e recu-\npera pontos de vida iguais à metade do \ndano da magia."
      },
      {
        "cost": "+2 PM",
        "description": "aumenta o dano em"
      }
    ]
  },
  {
    "id": "tranca_arcana",
    "name": "Tranca Arcana",
    "circle": 1,
    "type": "arcana",
    "school": "Abjuração",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 objeto Grande ou menor",
    "duration": "Instantânea",
    "description": "Execução: padrão; Alcance: toque; \nAlvo: 1 objeto Grande ou menor; Du-\nração: permanente.\nEsta magia tranca uma porta ou outro \nitem que possa ser aberto ou fechado \n(como um baú, caixa etc.), aumentan-\ndo a CD de testes de Força ou Ladina-\ngem para abri-lo em +10. Você pode \nabrir livremente sua própria tranca \nsem problemas.\nComponente material: chave de bronze \nno valor de T$ 25.",
    "upgrades": [
      {
        "cost": "Truque",
        "description": "muda o alcance para curto. \nEm vez do normal, pode abrir ou fe-\nchar um objeto de tamanho Grande ou \nmenor, como uma porta ou baú. Não \nafeta objetos trancados."
      },
      {
        "cost": "+1 PM",
        "description": "muda o alcance para curto e a \nduração para instantânea. Em vez do\n209\nCapítulo Quatro\nnormal, a magia abre portas, baús e ja-\nnelas trancadas, presas, barradas ou \nprotegidas por Tranca Arcana (o efeito é \ndissipado) a sua escolha. Ela também \nafrouxa grilhões e solta correntes."
      },
      {
        "cost": "+5 PM",
        "description": "aumenta a CD para abrir o \nalvo em"
      }
    ]
  },
  {
    "id": "tranquilidade",
    "name": "Tranquilidade",
    "circle": 1,
    "type": "divina",
    "school": "Encantamento",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 animal ou humanoide",
    "duration": "Instantânea",
    "description": "Você emana ondas de serenidade. Se \nfalhar na resistência, o alvo tem sua \natitude mudada para indiferente (veja \na página 259) e não pode atacar ou rea-\nlizar qualquer ação agressiva. Se pas-\nsar, sofre -2 em testes de ataque. Qual-\nquer ação hostil contra o alvo ou seus \naliados dissipa a magia e faz ele retor-\nnar à atitude que tinha antes (ou pior, \nde acordo com o mestre).",
    "resistance": "Vontade parcial",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "muda o alvo para 1 criatura."
      },
      {
        "cost": "+1 PM",
        "description": "aumenta o número de alvos \nem"
      }
    ]
  },
  {
    "id": "transformacao_de_guerra",
    "name": "Transformação de Guerra",
    "circle": 3,
    "type": "arcana",
    "school": "Transmutação",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "sustentada",
    "description": "Você se torna uma máquina de comba-\nte, ficando mais forte, rápido e resis-\ntente. Você recebe +6 na Defesa, tes-\ntes de ataque e rolagens de dano corpo \na corpo, e 30 PV temporários. Durante \na Transformação de Guerra você não pode \nlançar magias, mas se torna proficiente \nem todas as armas.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta os bônus na Defe-\nsa, testes de ataque e rolagens de dano \ncorpo a corpo em"
      },
      {
        "cost": "+2 PM",
        "description": "adiciona componente mate-\nrial (barra de adamante no valor de \nT$ 100). Sua forma de combate ganha \num aspecto metálico e sem expressões. \nAlém do normal, você recebe redução \nde dano 10 e imunidade a atordoamen-\nto e efeitos de cansaço, encantamento, \nmetabolismo, trevas e veneno, e não \nprecisa respirar."
      }
    ]
  },
  {
    "id": "transmutar_objetos",
    "name": "Transmutar Objetos",
    "circle": 1,
    "type": "arcana",
    "school": "Transmutação",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "matéria-prima, como madeira, \nrochas, ossos",
    "duration": "cena",
    "description": "A magia transforma matéria bru-\nta para moldar um novo objeto. Você \npode usar matéria-prima mundana \npara criar um objeto de tamanho Pe-\nqueno ou menor e preço máximo de \nT$ 25, como um balde ou uma espa-\nda. O objeto reverte à matéria-prima \nno final da cena, ou se for tocado por \num objeto feito de chumbo. Esta ma-\ngia não pode ser usada para criar ob-\njetos consumíveis, como alimentos \nou itens alquímicos, nem objetos com \nmecanismos complexos, como bestas \nou armas de fogo. Transmutar Objetos \nanula Despedaçar.",
    "upgrades": [
      {
        "cost": "Truque",
        "description": "muda o alvo para 1 objeto \nmundano Mínusculo (ou material em \nquantidade equivalente) e a duração \npara instantânea. Em vez do normal, \nvocê pode alterar as propriedades físi-\ncas do alvo, como colorir, limpar ou su-\njar itens pequenos (incluindo peças de \nroupa), aquecer, esfriar e/ou temperar \n(mas não produzir) ou curar 1 PV do \nobjeto, consertando pequenas falhas \ncomo colar um frasco de cerâmica que-\nbrado, unir os elos de uma corrente ou \ncosturar uma roupa rasgada. Um obje-\nto só pode ser afetado por este truque \numa vez por dia."
      },
      {
        "cost": "+1 PM",
        "description": "muda o alcance para toque, o \nalvo para 1 construto e a duração para \ninstantânea. Em vez do normal, cura \n2d8 PV do alvo. Você pode gastar 2 PM \nadicionais para aumentar a cura em"
      },
      {
        "cost": "+2 PM",
        "description": "aumenta o limite de tamanho \ndo objeto em uma categoria."
      },
      {
        "cost": "+3 PM",
        "description": "aumenta o preço máximo do \nobjeto criado em um fator de x10 ("
      },
      {
        "cost": "+5 PM",
        "description": "muda o alvo para 1 objeto \nmundano e a duração para instantâ-\nnea. Em vez do normal, você cura to-\ndos os PV do alvo, restaurando o ob-\njeto totalmente. Este aprimoramento \nestá sujeito aos limites de tamanho e \npreço do objeto conforme a magia ori-\nginal e não funciona se o objeto tiver \nsido completamente destruído (quei-\nmado até virar cinzas ou desintegrado, \npor exemplo). Requer 3º círculo."
      },
      {
        "cost": "+9 PM",
        "description": "como o aprimoramento ante-\nrior, mas passa a afetar itens mágicos."
      }
    ]
  },
  {
    "id": "velocidade",
    "name": "Velocidade",
    "circle": 2,
    "type": "arcana",
    "school": "Transmutação",
    "execution": "padrão",
    "range": "curto",
    "targetArea": "1 criatura",
    "duration": "sustentada",
    "description": "O alvo pode realizar uma ação padrão \nou de movimento adicional por turno. \nEsta ação não pode ser usada para lan-\nçar magias e ativar engenhocas.",
    "upgrades": [
      {
        "cost": "+0 PM",
        "description": "muda a duração para cena. \nA ação adicional que você pode fazer \né apenas de movimento. Uma criatu-\nra só pode receber uma ação adicional \npor turno como efeito de Velocidade."
      },
      {
        "cost": "+7 PM",
        "description": "muda o alvo para criaturas es-\ncolhidas no alcance. Requer 4º círculo."
      }
    ]
  },
  {
    "id": "vestimenta_da_fe",
    "name": "Vestimenta da Fé",
    "circle": 2,
    "type": "divina",
    "school": "Abjuração",
    "execution": "padrão",
    "range": "toque",
    "targetArea": "1 armadura, escudo ou vestuário",
    "duration": "1 dia",
    "description": "Você fortalece um item, aumentando o \nbônus de Defesa de uma armadura ou \nescudo em +2. No caso de um vestuá-\nrio, ele passa a oferecer +2 na Defe-\nsa (não cumulativo com armadura). Os \nefeitos desta magia contam como um \nbônus de encanto.",
    "upgrades": [
      {
        "cost": "+3 PM",
        "description": "o objeto oferece o mesmo \nbônus em testes de resistência. Requer \n3º círculo."
      },
      {
        "cost": "+4 PM",
        "description": "aumenta o bônus em"
      }
    ]
  },
  {
    "id": "viagem_arborea",
    "name": "Viagem Arbórea",
    "circle": 3,
    "type": "divina",
    "school": "Convocação",
    "execution": "completa",
    "range": "pes-\nsoal",
    "targetArea": "você",
    "duration": "cena",
    "description": "Como parte da execução, você en-\ntra em uma árvore adjacente que seja \nmaior do que você. Você pode perma-\nnecer dentro da árvore, percebendo os \narredores de forma normal (mas sem \npoder fazer ações). Você pode gastar \numa ação de movimento para sair des-\nsa árvore, ou de qualquer outra dentro \nde 1km. Se estiver dentro de uma ár-\nvore que seja destruída, a magia termi-\nna e você sofre 10d6 pontos de dano de \nimpacto. Enquanto a magia durar você \npode gastar uma ação de movimento \ne 1 PM para entrar em outras árvores.\n210\nMagia"
  },
  {
    "id": "viagem_planar",
    "name": "Viagem Planar",
    "circle": 4,
    "type": "universal",
    "school": "Convocação",
    "execution": "completa",
    "range": "toque",
    "targetArea": "pessoal",
    "duration": "instantânea",
    "description": "Você viaja instantaneamente para outro \nplano da Criação. Lá, você chega de 10 \na 1.000km do destino pretendido (role \n1d100 e multiplique por 10km).\nComponente material: um bastão de me-\ntal precioso em forma de forquilha (no \nvalor de T$ 1.000). O tipo de metal de-\ntermina para qual plano de existência \nvocê será enviado. Os metais que le-\nvam a dimensões específicas podem \nser difíceis de encontrar, de acordo \ncom o mestre."
  },
  {
    "id": "videncia",
    "name": "Vidência",
    "circle": 3,
    "type": "universal",
    "school": "Adivinhação",
    "execution": "completa",
    "range": "ilimita-\ndo",
    "targetArea": "1 criatura",
    "duration": "susten-\ntada",
    "description": "Através de uma superfície reflexi-\nva (bacia de água benta para clérigos, \nlago para druidas, bola de cristal para \nmagos, espelho para feiticeiros etc.) \nvocê pode ver e ouvir uma criatura es-\ncolhida e seus arredores (cerca de 6m \nem qualquer direção), mesmo que ela \nse mova. O alvo pode estar a qualquer \ndistância, mas se passar em um teste \nde Vontade, a magia falha. A vítima re-\ncebe bônus ou penalidades em seu tes-\nte de resistência, dependendo do co-\nnhecimento que você tiver dela.\n• Não conhece o alvo: +10.\n• Ouviu falar do alvo: +5.\n• O alvo está em outro plano ou \nmundo: +5.\n• Já encontrou o alvo pessoalmente: +0.\n• Tem uma pintura, escultura ou outra \nrepresentação do alvo: -2.\n• Conhece bem o alvo: -5.\n• Tem um pertence pessoal ou peça de \nroupa do alvo: -5.\n• Tem uma parte do corpo do alvo \n(unhas, cabelos...): -10.",
    "resistance": "Vontade anula"
  },
  {
    "id": "visao_da_verdade",
    "name": "Visão da Verdade",
    "circle": 4,
    "type": "universal",
    "school": "Adivinhação",
    "execution": "movimento",
    "range": "pes-\nsoal",
    "targetArea": "você",
    "duration": "cena",
    "description": "Você enxerga a forma real das coisas. \nVocê pode ver através de camuflagem e \nescuridão (normais e mágicas), assim \ncomo efeitos de ilusão e transmutação \n(enxergando a verdade como formas \ntranslúcidas ou sobrepostas).",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "muda o alcance para toque e o \nalvo para 1 criatura."
      },
      {
        "cost": "+1 PM",
        "description": "além do normal, o alvo fica \ncom sentidos apurados; ele recebe"
      },
      {
        "cost": "+2 PM",
        "description": "além do normal, o alvo escuta \nfalsidades; ele recebe"
      }
    ]
  },
  {
    "id": "visao_mistica",
    "name": "Visão Mística",
    "circle": 1,
    "type": "universal",
    "school": "Adivinhação",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "cena",
    "description": "Seus olhos brilham com uma luz azul e \npassam a enxergar auras mágicas. Este \nefeito é similar ao uso de Misticismo \npara detectar magia, mas você detecta \ntodas as auras mágicas em alcance mé-\ndio e recebe todas as informações so-\nbre elas sem gastar ações. Além disso, \nvocê pode gastar uma ação de movi-\nmento para descobrir se uma criatura \nque possa perceber em alcance médio \né capaz de lançar magias e qual a aura \ngerada pelas magias de círculo mais \nalto que ela pode lançar.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "recebe visão no escuro."
      },
      {
        "cost": "+2 PM",
        "description": "muda a duração para um dia."
      }
    ]
  },
  {
    "id": "vitalidade_fantasma",
    "name": "Vitalidade Fantasma",
    "circle": 1,
    "type": "arcana",
    "school": "Necromancia",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "instantânea",
    "description": "Você suga energia vital da terra, rece-\nbendo 2d10 pontos de vida temporá-\nrios. Os PV temporários desaparecem \nao final da cena.",
    "upgrades": [
      {
        "cost": "+2 PM",
        "description": "aumenta os PV temporários \nrecebidos em"
      }
    ]
  },
  {
    "id": "voo",
    "name": "Voo",
    "circle": 3,
    "type": "arcana",
    "school": "Transmutação",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "cena",
    "description": "Você recebe deslocamento de voo 12m. \nVoar por meio desta magia é simples \ncomo andar - você pode atacar e lan-\nçar magias normalmente enquanto \nvoa. Quando a magia termina, você \ndesce lentamente até o chão, como se \nestivesse sob efeito de Queda Suave.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "muda o alcance para toque e o \nalvo para 1 criatura."
      },
      {
        "cost": "+4 PM",
        "description": "muda a duração para um dia. \nRequer 4º círculo."
      }
    ]
  },
  {
    "id": "voz_divina",
    "name": "Voz Divina",
    "circle": 2,
    "type": "divina",
    "school": "Adivinhação",
    "execution": "padrão",
    "range": "pessoal",
    "targetArea": "você",
    "duration": "cena",
    "description": "Você pode conversar com criaturas de \nqualquer raça e tipo: animal, constru-\nto, espírito, humanoide, monstro ou \nmorto-vivo. Pode fazer perguntas e en-\ntende suas respostas, mesmo sem um \nidioma em comum ou se a criatura não \nfor capaz de falar, mas respeitando os \nlimites da Inteligência dela. A atitude \ndessas criaturas não é alterada, mas \nvocê pode usar a perícia Diplomacia \npara tentar mudar sua atitude.",
    "upgrades": [
      {
        "cost": "+1 PM",
        "description": "você concede um pouco de \nvida a um cadáver, suficiente para \nque ele responda a suas perguntas. \nO conhecimento do corpo é limita-\ndo ao que ele tinha enquanto vivo e \nsuas respostas são curtas e enigmáti-\ncas. Um corpo só pode ser alvo desta \nmagia uma vez. Ela também não fun-\nciona em um corpo cuja cabeça tenha \nsido destruída."
      },
      {
        "cost": "+1 PM",
        "description": "você pode falar com plantas \n(normais ou monstruosas) e rochas. \nPlantas e rochas têm percepção limi-\ntada de seus arredores e normalmente \nfornecem respostas simplórias.\n211"
      }
    ]
  }
];
