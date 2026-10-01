import { Deity } from '../types/rules';

export const DEITIES_LIST: Deity[] = [
  {
    "id": "aharadak",
    "name": "Aharadak",
    "title": "O Deus da Tormenta",
    "description": "Entidade de loucura e corrupção antinatural proveniente da tempestade rubra lefeu que ascendeu ao Panteão após a queda de Tauron.",
    "symbol": "Olho macabro de pupila vertical cercado por espinhos quitinosos",
    "energyChannel": "Negativa",
    "favoredWeapon": "Corrente de espinhos",
    "allowedDevoteesText": "Quaisquer criaturas. A Tormenta aceita e devora a todos.",
    "grantedPowers": [
      {
        "id": "afinidade_tormenta",
        "name": "Afinidade com a Tormenta",
        "description": "Você recebe +1 ponto de mana para cada poder da Tormenta que possui e é imune aos efeitos climáticos da tempestade rubra.",
        "prerequisites": "Devoto de Aharadak"
      },
      {
        "id": "extase_loucura",
        "name": "Êxtase da Loucura",
        "description": "Quando você sofre dano, pode gastar 1 PM para entrar em um transe eufórico e receber +2 em seus testes de ataque e rolagens de dano até o fim do seu próximo turno.",
        "prerequisites": "Devoto de Aharadak"
      },
      {
        "id": "percepcao_temporal",
        "name": "Percepção Temporal",
        "description": "Você pode gastar 1 PM para somar sua Sabedoria na Defesa e em testes de Iniciativa até o fim da cena.",
        "prerequisites": "Devoto de Aharadak"
      },
      {
        "id": "rejeicao_divina",
        "name": "Rejeição Divina",
        "description": "Você recebe resistência a magia +5 contra magias divinas lançadas por devotos de outros deuses do Panteão.",
        "prerequisites": "Devoto de Aharadak"
      }
    ],
    "obligations": "Cultistas de Aharadak devem cometer profanações, sacrifícios cruéis ou propagar a matéria vermelha pelo mundo."
  },
  {
    "id": "allihanna",
    "name": "Allihanna",
    "title": "A Deusa da Natureza",
    "description": "Mãe carinhosa das feras, árvores e rios, deusa que protege a pureza primordial do mundo natural contra a devastação predatória.",
    "symbol": "Uma pequena árvore frondosa ou a imagem de um animal sagrado",
    "energyChannel": "Positiva",
    "favoredWeapon": "Bordão",
    "allowedDevoteesText": "Dahllan, elfos, sílfides, bárbaros, caçadores, cavaleiros, clérigos, druidas.",
    "grantedPowers": [
      {
        "id": "dedo_verde",
        "name": "Dedo Verde",
        "description": "Você aprende e pode lançar a magia Controlar Plantas gastando 1 PM. Se já conhecer essa magia, seu custo diminui em -1 PM.",
        "prerequisites": "Devoto de Allihanna"
      },
      {
        "id": "descanso_natural",
        "name": "Descanso Natural",
        "description": "Para você e seus companheiros, dormir ao ar livre sob a copa das árvores conta como condições de descanso confortáveis.",
        "prerequisites": "Devoto de Allihanna"
      },
      {
        "id": "voz_natureza",
        "name": "Voz da Natureza",
        "description": "Você pode falar com animais e plantas como se compartilhassem um idioma comum.",
        "prerequisites": "Devoto de Allihanna"
      }
    ],
    "obligations": "Devotos de Allihanna não podem usar armaduras ou escudos feitos de metal e não podem matar animais selvagens a menos que em legítima defesa."
  },
  {
    "id": "arsenal",
    "name": "Arsenal",
    "title": "O Deus da Guerra",
    "description": "Antigo sumo-sacerdote de Keenn que forjou a lendária Espada Deus e derrotou o antigo Deus da Guerra para assumir seu manto supremo.",
    "symbol": "Um martelo de guerra e uma espada longa cruzados sobre um escudo",
    "energyChannel": "Qualquer",
    "favoredWeapon": "Martelo de guerra",
    "allowedDevoteesText": "Bárbaros, cavaleiros, clérigos, guerreiros, lutadores.",
    "grantedPowers": [
      {
        "id": "conjurar_arma",
        "name": "Conjurar Arma",
        "description": "Você pode gastar 1 PM para conjurar qualquer arma de combate corpo a corpo em sua mão por uma cena.",
        "prerequisites": "Devoto de Arsenal"
      },
      {
        "id": "coragem_total",
        "name": "Coragem Total",
        "description": "Você é imune a efeitos de medo mundanos e mágicos.",
        "prerequisites": "Devoto de Arsenal"
      },
      {
        "id": "fe_guerreira",
        "name": "Fé Guerreira",
        "description": "Você pode gastar 1 PM para somar sua Sabedoria no dano de seus ataques corpo a corpo com armas martelo ou espada.",
        "prerequisites": "Devoto de Arsenal"
      },
      {
        "id": "sangue_ferro",
        "name": "Sangue de Ferro",
        "description": "Você pode gastar 1 PM para receber redução de dano 2 e +2 em testes de Fortitude até o fim da cena.",
        "prerequisites": "Devoto de Arsenal"
      }
    ],
    "obligations": "Devotos de Arsenal nunca recusam um desafio de batalha justo e devem sempre portar armas de qualidade superior."
  },
  {
    "id": "azgher",
    "name": "Azgher",
    "title": "O Deus do Sol",
    "description": "O Vigilante solar que viaja em sua carruagem de fogo cruzando os céus de Arton, expurgando as trevas e os mortos-vivos com luz dourada.",
    "symbol": "Um sol dourado com rosto sereno esculpido",
    "energyChannel": "Positiva",
    "favoredWeapon": "Cimitarra",
    "allowedDevoteesText": "Qareen, arcanistas, batedores, cavaleiros, clérigos, guerreiros, nobres, paladinos.",
    "grantedPowers": [
      {
        "id": "espada_solar",
        "name": "Espada Solar",
        "description": "Você pode gastar 1 PM para fazer sua lâmina queimar com chamas radiantes solares, causando +1d6 de dano de fogo e luz até o fim da cena.",
        "prerequisites": "Devoto de Azgher"
      },
      {
        "id": "habitante_deserto",
        "name": "Habitante do Deserto",
        "description": "Você recebe resistência a fogo 10 e não sofre penalidades em calor extremo.",
        "prerequisites": "Devoto de Azgher"
      },
      {
        "id": "inimigo_tenebra",
        "name": "Inimigo de Tenebra",
        "description": "Seus ataques causam +1d8 de dano adicional contra mortos-vivos e servos da deusa da noite.",
        "prerequisites": "Devoto de Azgher"
      }
    ],
    "obligations": "Devotos de Azgher devem cobrir o rosto com máscaras ou véus na presença de estranhos para que ninguém veja a face dos filhos do sol."
  },
  {
    "id": "hyninn",
    "name": "Hyninn",
    "title": "O Deus dos Ladrões",
    "description": "O Trapaceiro divino que celebra a esperteza, a audácia, os golpes audazes e as travessuras bem-humoradas contra os arrogantes.",
    "symbol": "Uma raposa estilizada ou uma máscara sorridente de duas cores",
    "energyChannel": "Qualquer",
    "favoredWeapon": "Adaga",
    "allowedDevoteesText": "Goblins, hynne, bardos, bucaneiros, ladinos, nobres.",
    "grantedPowers": [
      {
        "id": "apostar_trapaceiro",
        "name": "Apostar com o Trapaceiro",
        "description": "Quando faz um teste de d20, você pode apostar gastando 1 PM: declare um número ímpar ou par. Se acertar o resultado do d20, recebe +5 no teste.",
        "prerequisites": "Devoto de Hyninn"
      },
      {
        "id": "forma_sorrateira",
        "name": "Forma Sorrateira",
        "description": "Você pode gastar 1 PM para receber +5 em testes de Furtividade e Ladinagem até o fim da cena.",
        "prerequisites": "Devoto de Hyninn"
      },
      {
        "id": "golpista_divino",
        "name": "Golpista Divino",
        "description": "Você recebe +2 em testes de Enganação e Jogatina e pode usar Enganação para fintar como ação livre uma vez por combate.",
        "prerequisites": "Devoto de Hyninn"
      }
    ],
    "obligations": "Devotos de Hyninn nunca cumprem uma promessa se puderem escapar dela com esperteza e devem cometer um furto ou trapaça semanalmente."
  },
  {
    "id": "kallyadranoch",
    "name": "Kallyadranoch",
    "title": "O Deus dos Dragões",
    "description": "O soberano das criaturas mais poderosas de Arton, patrono do poder tirânico, do sopro elemental e da magia de destruição absoluta.",
    "symbol": "Uma cabeça de dragão de cinco cores com olhos reluzentes",
    "energyChannel": "Qualquer",
    "favoredWeapon": "Lança",
    "allowedDevoteesText": "Lefou, arcanistas, cavaleiros, clérigos, guerreiros, nobres.",
    "grantedPowers": [
      {
        "id": "aura_medo",
        "name": "Aura de Medo",
        "description": "Inimigos que se aproximem a até alcance curto de você devem passar em Vontade (CD Car) ou ficam abalados.",
        "prerequisites": "Devoto de Kallyadranoch"
      },
      {
        "id": "escamas_draconicas",
        "name": "Escamas Dracônicas",
        "description": "Sua pele ganha escamas reluzentes que concedem +2 na Defesa e resistência elemental 5 a um elemento escolhido.",
        "prerequisites": "Devoto de Kallyadranoch"
      },
      {
        "id": "sopro_dragao",
        "name": "Sopro do Dragão",
        "description": "Você pode gastar 1 PM para exalar um cone de fogo, frio ou ácido que causa 2d6 de dano a todas as criaturas na área.",
        "prerequisites": "Devoto de Kallyadranoch"
      }
    ],
    "obligations": "Devotos de Kallyadranoch devem acumular riquezas em tesouros pessoais e nunca se curvar perante seres considerados inferiores."
  },
  {
    "id": "khalmyr",
    "name": "Khalmyr",
    "title": "O Deus da Justiça",
    "description": "Líder solene do Panteão, juiz supremo das leis divinas e terrenas, protetor da ordem, dos contratos sagrados e da retidão.",
    "symbol": "Uma espada de dois gumes com uma balança de pratos no pomo",
    "energyChannel": "Positiva",
    "favoredWeapon": "Espada longa",
    "allowedDevoteesText": "Anões, cavaleiros, clérigos, guerreiros, nobres, paladinos.",
    "grantedPowers": [
      {
        "id": "coragem_total_khalmyr",
        "name": "Coragem Total",
        "description": "Você é imune a efeitos de medo mundanos e mágicos.",
        "prerequisites": "Devoto de Khalmyr"
      },
      {
        "id": "dom_verdade",
        "name": "Dom da Verdade",
        "description": "Você pode gastar 1 PM para saber se uma criatura está mentindo ou tentando enganá-lo deliberadamente.",
        "prerequisites": "Devoto de Khalmyr"
      },
      {
        "id": "espada_justiceira",
        "name": "Espada Justiceira",
        "description": "Você pode gastar 1 PM para abençoar sua espada com o poder da lei, aumentando o dano da arma em um passo.",
        "prerequisites": "Devoto de Khalmyr"
      },
      {
        "id": "reparacao_justa",
        "name": "Reparação Justa",
        "description": "Quando você sofre dano de um ataque inimigo, pode gastar 1 PM para receber +2 em seu próximo ataque de retaliação contra o agressor.",
        "prerequisites": "Devoto de Khalmyr"
      }
    ],
    "obligations": "Devotos de Khalmyr nunca quebram uma lei justa, nunca contam mentiras deliberadas e devem zelar pelo cumprimento de contratos."
  },
  {
    "id": "lena",
    "name": "Lena",
    "title": "A Deusa da Vida",
    "description": "A deusa do nascimento, da maternidade, da cura suprema e da fertilidade do mundo, que chora por qualquer vida ceifada.",
    "symbol": "Uma mulher grávida sorrindo envolta por um círculo de flores",
    "energyChannel": "Positiva",
    "favoredWeapon": "Nenhuma (Bordão ou Desarmado)",
    "allowedDevoteesText": "Mulheres de qualquer raça (exceto lefou), clérigas, druidas, nobres, paladinas.",
    "grantedPowers": [
      {
        "id": "ataque_piedoso",
        "name": "Ataque Piedoso",
        "description": "Você pode desferir ataques não-letais sem sofrer a penalidade padrão de -5 no teste de ataque.",
        "prerequisites": "Devoto de Lena"
      },
      {
        "id": "aura_restauradora",
        "name": "Aura Restauradora",
        "description": "Todas as magias e efeitos de cura realizados por você e seus aliados adjacentes recuperam +1 PV por dado rolado.",
        "prerequisites": "Devoto de Lena"
      },
      {
        "id": "cura_gentil",
        "name": "Cura Gentil",
        "description": "Você soma seu modificador de Carisma a todos os pontos de vida que cura com magias ou primeiros socorros.",
        "prerequisites": "Devoto de Lena"
      },
      {
        "id": "curandeira_perfeita",
        "name": "Curandeira Perfeita",
        "description": "Suas habilidades de cura nunca falham criticamente e estabilizam automaticamente criaturas à beira da morte.",
        "prerequisites": "Devoto de Lena"
      }
    ],
    "obligations": "Devotos de Lena são proibidos de causar dano letal a qualquer criatura viva (apenas mortos-vivos e constructos podem ser destruídos)."
  },
  {
    "id": "lin_wu",
    "name": "Lin-Wu",
    "title": "O Deus da Honra",
    "description": "O Dragão Celeste de Tamu-ra, patrono da lealdade inabalável, da bravura serena, do dever sagrado e do caminho dos samurais.",
    "symbol": "Um dragão serpentino oriental dourado empunhando uma katana",
    "energyChannel": "Qualquer",
    "favoredWeapon": "Katana",
    "allowedDevoteesText": "Humanos, cavaleiros, clérigos, guerreiros, nobres, paladinos.",
    "grantedPowers": [
      {
        "id": "coragem_total_linwu",
        "name": "Coragem Total",
        "description": "Você é imune a medo e efeitos de abalo psicológico.",
        "prerequisites": "Devoto de Lin-Wu"
      },
      {
        "id": "mente_vazia",
        "name": "Mente Vazia",
        "description": "Você recebe +2 em testes de Vontade e Iniciativa por manter foco mental imperturbável.",
        "prerequisites": "Devoto de Lin-Wu"
      },
      {
        "id": "golpe_honroso",
        "name": "Golpe Honroso",
        "description": "Ao desafiar um oponente em duelo individual honrado, você soma sua Sabedoria no dano de seus golpes.",
        "prerequisites": "Devoto de Lin-Wu"
      }
    ],
    "obligations": "Devotos de Lin-Wu devem seguir o código do Bushido: lealdade, honra, respeito e jamais recorrer a venenos ou ataques furtivos covardes."
  },
  {
    "id": "marah",
    "name": "Marah",
    "title": "A Deusa da Paz",
    "description": "A deusa do amor, da concórdia, da alegria festiva e do fim de todas as guerras que dilaceram os povos mortais.",
    "symbol": "Uma pomba branca em voo ou uma taça de vinho dourada",
    "energyChannel": "Positiva",
    "favoredWeapon": "Nenhuma",
    "allowedDevoteesText": "Bardos, clérigos, nobres, paladinos de qualquer raça.",
    "grantedPowers": [
      {
        "id": "aura_paz",
        "name": "Aura de Paz",
        "description": "Qualquer criatura que tente atacar você deve passar em teste de Vontade (CD Car) ou desiste do ataque e perde sua ação.",
        "prerequisites": "Devoto de Marah"
      },
      {
        "id": "dom_esperanca",
        "name": "Dom da Esperança",
        "description": "Você pode gastar 1 PM para inspirar um aliado abalado, curando condições mentais negativas imediatamente.",
        "prerequisites": "Devoto de Marah"
      },
      {
        "id": "palavras_concordia",
        "name": "Palavras de Concórdia",
        "description": "Você recebe +5 em testes de Diplomacia para mediar conflitos e cessar combates antes que vidas sejam perdidas.",
        "prerequisites": "Devoto de Marah"
      }
    ],
    "obligations": "Devotos de Marah são pacifistas absolutos: não podem portar armas mortais nem causar dano a nenhum ser vivo inteligente."
  },
  {
    "id": "megalokk",
    "name": "Megalokk",
    "title": "O Deus dos Monstros",
    "description": "O criador primal de todas as bestas colossais, quimeras sanguinárias e predadores vorazes que habitam as profundezas de Arton.",
    "symbol": "Uma pata monstruosa com garras gigantescas gotejando sangue",
    "energyChannel": "Negativa",
    "favoredWeapon": "Clava ou arma natural",
    "allowedDevoteesText": "Trogs, minotauros, bárbaros, caçadores, clérigos, druidas, lutadores.",
    "grantedPowers": [
      {
        "id": "garras_monstro",
        "name": "Garras de Monstro",
        "description": "Suas mãos se transformam em garras afiadas (dano 1d6, crítico x2, corte) que contam como armas naturais.",
        "prerequisites": "Devoto de Megalokk"
      },
      {
        "id": "olhar_amedrontador",
        "name": "Olhar Amedrontador",
        "description": "Você pode gastar 1 PM para rugir furiosamente e deixar todos os inimigos em alcance curto abalados.",
        "prerequisites": "Devoto de Megalokk"
      },
      {
        "id": "vitalidade_monstruosa",
        "name": "Vitalidade Monstruosa",
        "description": "Você recebe +2 pontos de vida por nível de personagem e recuperação acelerada de ferimentos.",
        "prerequisites": "Devoto de Megalokk"
      }
    ],
    "obligations": "Devotos de Megalokk não podem viver em cidades civilizadas por mais de uma semana consecutiva e devem respeitar a lei da sobrevivência do mais forte."
  },
  {
    "id": "nimb",
    "name": "Nimb",
    "title": "O Deus do Caos e da Sorte",
    "description": "Senhor dos dados rolados, do imprevisível, da loucura inofensiva e das reviravoltas cósmicas que zombam de todo planejamento mortal.",
    "symbol": "Um dado de seis faces equilibrado sobre uma das suas quinas",
    "energyChannel": "Qualquer",
    "favoredWeapon": "Adaga ou cajado",
    "allowedDevoteesText": "Goblins, hynne, arcanistas, bardos, bucaneiros, clérigos, ladinos.",
    "grantedPowers": [
      {
        "id": "poder_oculto",
        "name": "Poder Oculto",
        "description": "Você pode gastar 1 PM para invocar a sorte de Nimb: role 1d6 para receber um bônus aleatório de +4 em um atributo por uma cena.",
        "prerequisites": "Devoto de Nimb"
      },
      {
        "id": "sorte_loucos",
        "name": "Sorte dos Loucos",
        "description": "Você pode rolar 1d20 adicional em qualquer teste. Se o resultado for 11 ou mais, soma no teste; se for 10 ou menos, nada acontece.",
        "prerequisites": "Devoto de Nimb"
      },
      {
        "id": "transmissao_loucura",
        "name": "Transmissão da Loucura",
        "description": "Você pode gastar 1 PM para confundir a mente de um inimigo que tente atacar você, forçando-o a atacar um alvo aleatório.",
        "prerequisites": "Devoto de Nimb"
      }
    ],
    "obligations": "Devotos de Nimb devem tomar decisões críticas rolando dados ou jogando moedas e nunca podem manter rotinas previsíveis."
  },
  {
    "id": "oceano",
    "name": "Oceano",
    "title": "O Deus dos Mares",
    "description": "O monarca das profundezas aquáticas salgadas, das marés revoltas e de todos os mistérios submersos nos abismos oceânicos.",
    "symbol": "Uma onda espumante que se ergue em formato de tridente",
    "energyChannel": "Qualquer",
    "favoredWeapon": "Tridente",
    "allowedDevoteesText": "Sereias, tritões, bárbaros, bucaneiros, clérigos, druidas, marinheiros.",
    "grantedPowers": [
      {
        "id": "anfibio",
        "name": "Anfíbio",
        "description": "Você pode respirar debaixo d’água e ganha deslocamento de natação igual ao seu deslocamento terrestre.",
        "prerequisites": "Devoto do Oceano"
      },
      {
        "id": "arsenal_profundezas",
        "name": "Arsenal das Profundezas",
        "description": "Você recebe +2 em testes de ataque e rolagens de dano quando luta debaixo d’água ou empunha tridentes e lanças.",
        "prerequisites": "Devoto do Oceano"
      },
      {
        "id": "mestre_ondas",
        "name": "Mestre das Ondas",
        "description": "Você pode conjurar rajadas de água sob pressão gastando 1 PM para empurrar inimigos a até 6m.",
        "prerequisites": "Devoto do Oceano"
      }
    ],
    "obligations": "Devotos do Oceano devem mergulhar no mar pelo menos uma vez por mês e nunca podem poluir águas limpas naturais."
  },
  {
    "id": "sszzaas",
    "name": "Sszzaas",
    "title": "O Deus da Traição",
    "description": "O Corruptor astuto que trama nas sombras com venenos silenciosos, mentiras elaboradas e cultos secretos que corroem impérios por dentro.",
    "symbol": "Uma serpente verde esmeralda mordendo a própria cauda",
    "energyChannel": "Negativa",
    "favoredWeapon": "Adaga",
    "allowedDevoteesText": "Medusas, arcanistas, bucaneiros, clérigos, ladinos, nobres.",
    "grantedPowers": [
      {
        "id": "astucia_serpente",
        "name": "Astúcia da Serpente",
        "description": "Você recebe +2 em testes de Enganação e Furtividade e a CD para resistir aos seus venenos aumenta em +2.",
        "prerequisites": "Devoto de Sszzaas"
      },
      {
        "id": "veneno_potente",
        "name": "Veneno Potente",
        "description": "Você pode gastar 1 PM para aumentar o dano de qualquer veneno aplicado em sua arma em +1d12.",
        "prerequisites": "Devoto de Sszzaas"
      },
      {
        "id": "lingua_bifurcada",
        "name": "Língua Bifurcada",
        "description": "Suas mentiras são indetectáveis por magias de adivinhação mundanas ou divinas comuns.",
        "prerequisites": "Devoto de Sszzaas"
      }
    ],
    "obligations": "Devotos de Sszzaas devem manter sua fé em segredo absoluto e semear a discórdia e a quebra de confiança entre os poderosos."
  },
  {
    "id": "tanna_toh",
    "name": "Tanna-Toh",
    "title": "A Deusa do Conhecimento",
    "description": "Mestra das academias, escribas, filósofos e historiadores, protetora de todos os livros e guardiã do saber absoluto.",
    "symbol": "Um livro aberto iluminado por uma tocha de pergaminho",
    "energyChannel": "Positiva",
    "favoredWeapon": "Bordão",
    "allowedDevoteesText": "Kliren, arcanistas, bardos, clérigos, inventores, nobres.",
    "grantedPowers": [
      {
        "id": "conhecimento_enciclopedico",
        "name": "Conhecimento Enciclopédico",
        "description": "Você se torna treinado em duas perícias baseadas em Inteligência à sua escolha.",
        "prerequisites": "Devoto de Tanna-Toh"
      },
      {
        "id": "mente_analitica",
        "name": "Mente Analítica",
        "description": "Você recebe +2 em testes de Investigação, Percepção e Conhecimento.",
        "prerequisites": "Devoto de Tanna-Toh"
      },
      {
        "id": "voz_sabedoria",
        "name": "Voz da Sabedoria",
        "description": "Você pode gastar 1 PM para dar um conselho erudito a um aliado, concedendo-lhe +2 em seu próximo teste.",
        "prerequisites": "Devoto de Tanna-Toh"
      }
    ],
    "obligations": "Devotos de Tanna-Toh nunca podem destruir livros, ocultar a verdade factual deliberadamente ou se recusar a responder a uma pergunta educada."
  },
  {
    "id": "tenebra",
    "name": "Tenebra",
    "title": "A Deusa da Noite",
    "description": "A Mãe Noite que envolve Arton em seu manto estrelado, protetora dos povos subterrâneos, dos mortos-vivos e dos segredos noturnos.",
    "symbol": "Uma lua nova prateada com três estrelas cintilantes",
    "energyChannel": "Negativa",
    "favoredWeapon": "Adaga ou foice",
    "allowedDevoteesText": "Anões, osteon, trogs, arcanistas, clérigos, ladinos.",
    "grantedPowers": [
      {
        "id": "caricia_sombria",
        "name": "Carícia Sombria",
        "description": "Você pode gastar 1 PM para desferir um toque gélido de energia negativa que causa 2d6 de dano de trevas e cura mortos-vivos.",
        "prerequisites": "Devoto de Tenebra"
      },
      {
        "id": "visao_nas_trevas",
        "name": "Visão nas Trevas",
        "description": "Você enxerga perfeitamente na escuridão mundana e mágica.",
        "prerequisites": "Devoto de Tenebra"
      },
      {
        "id": "manto_noite",
        "name": "Manto da Noite",
        "description": "Você recebe +2 na Defesa e em testes de Furtividade quando estiver em áreas de penumbra ou escuridão.",
        "prerequisites": "Devoto de Tenebra"
      }
    ],
    "obligations": "Devotos de Tenebra nunca expõem a pele desprotegida à luz direta do sol e devem celebrar os mistérios sob as sombras da lua."
  },
  {
    "id": "thwor",
    "name": "Thwor",
    "title": "O Deus dos Goblinoides",
    "description": "O conquistador messiânico que uniu as tribos sob a bandeira da Flecha de Fogo e ascendeu para liderar os povos outrora oprimidos rumo a um novo destino.",
    "symbol": "Uma flecha de ferro em chamas cravada em uma coroa quebrada",
    "energyChannel": "Qualquer",
    "favoredWeapon": "Machado de batalha",
    "allowedDevoteesText": "Goblins, bárbaros, caçadores, clérigos, guerreiros, ladinos, lutadores.",
    "grantedPowers": [
      {
        "id": "almejar_impossivel_thwor",
        "name": "Almejar o Impossível",
        "description": "Quando você falha em um teste de perícia por 1 ponto, você pode gastar 1 PM para ser considerado bem-sucedido.",
        "prerequisites": "Devoto de Thwor ou Valkaria"
      },
      {
        "id": "furia_flecha",
        "name": "Fúria da Flecha",
        "description": "Você recebe +2 em testes de ataque e rolagens de dano contra humanos, elfos e anões.",
        "prerequisites": "Devoto de Thwor"
      },
      {
        "id": "uniao_rejeitados",
        "name": "União dos Rejeitados",
        "description": "Você e seus aliados recebem +1 em testes de ataque para cada aliado que esteja flanqueando o mesmo alvo.",
        "prerequisites": "Devoto de Thwor"
      }
    ],
    "obligations": "Devotos de Thwor lutam para derrubar velhas tiranias racistas e nunca abandonam companheiros da mesma bandeira à própria sorte."
  },
  {
    "id": "thyatis",
    "name": "Thyatis",
    "title": "O Deus da Ressurreição e Profecia",
    "description": "A Fênix imortal de chamas douradas que oferece uma segunda chance para todos os arrependidos e revela os fios dourados do destino.",
    "symbol": "Uma fênix dourada renascendo de uma fogueira ardente",
    "energyChannel": "Positiva",
    "favoredWeapon": "Espada curta",
    "allowedDevoteesText": "Cavaleiros, clérigos, nobres, paladinos de qualquer raça.",
    "grantedPowers": [
      {
        "id": "ataque_piedoso_thyatis",
        "name": "Ataque Piedoso",
        "description": "Você pode realizar ataques não-letais sem penalidades no teste de ataque.",
        "prerequisites": "Devoto de Thyatis ou Lena"
      },
      {
        "id": "dom_imortalidade",
        "name": "Dom da Imortalidade",
        "description": "Se você morrer, seu corpo entra em combustão divina e renasce das cinzas no início do próximo dia com vida plena.",
        "prerequisites": "Devoto de Thyatis, paladino"
      },
      {
        "id": "dom_profecia",
        "name": "Dom da Profecia",
        "description": "Você pode gastar 1 PM para ter vislumbres do futuro imediato, recebendo +2 em um teste de d20 qualquer.",
        "prerequisites": "Devoto de Thyatis"
      },
      {
        "id": "dom_ressurreicao",
        "name": "Dom da Ressurreição",
        "description": "Você pode trazer criaturas recém-falecidas de volta à vida sem custo de componentes materiais raros.",
        "prerequisites": "Devoto de Thyatis, clérigo"
      }
    ],
    "obligations": "Devotos de Thyatis nunca tiram a vida de um ser inteligente, pois todo pecador tem o direito sagrado à redenção e a uma segunda chance."
  },
  {
    "id": "valkaria",
    "name": "Valkaria",
    "title": "A Deusa da Ambição",
    "description": "Criadora da humanidade, patrona de todos os aventureiros arrojados, exploradores impávidos e almas que desafiam o impossível.",
    "symbol": "Uma estátua de mulher erguendo uma tocha flamejante para as estrelas",
    "energyChannel": "Positiva",
    "favoredWeapon": "Chicote ou espada longa",
    "allowedDevoteesText": "Humanos e membros de qualquer raça e classe que vivam como aventureiros.",
    "grantedPowers": [
      {
        "id": "almejar_impossivel",
        "name": "Almejar o Impossível",
        "description": "Quando você falha em um teste de perícia por apenas 1 ou 2 pontos, você pode gastar 1 PM para transformar a falha em sucesso.",
        "prerequisites": "Devoto de Valkaria"
      },
      {
        "id": "armas_ambicao",
        "name": "Armas da Ambição",
        "description": "Você recebe +1 no teste de ataque e na margem de ameaça de acertos críticos com sua arma favorita.",
        "prerequisites": "Devoto de Valkaria"
      },
      {
        "id": "coragem_total_valkaria",
        "name": "Coragem Total",
        "description": "Você é imune a efeitos de medo.",
        "prerequisites": "Devoto de Valkaria"
      }
    ],
    "obligations": "Devotos de Valkaria nunca podem recusar um convite para uma aventura desafiadora e nunca podem permanecer na mesma cidade por mais de um mês seguido."
  },
  {
    "id": "wynna",
    "name": "Wynna",
    "title": "A Deusa da Magia",
    "description": "A deusa benevolente e apaixonada pelo fluxo místico que presenteou o mundo com os segredos dos feitiços e energias arcanas.",
    "symbol": "Um anel de cinco cores representando as energias mágicas primordiais",
    "energyChannel": "Qualquer",
    "favoredWeapon": "Adaga ou cajado",
    "allowedDevoteesText": "Elfos, qareen, sílfides, arcanistas, bardos, clérigos, druidas, inventores.",
    "grantedPowers": [
      {
        "id": "bencao_mana",
        "name": "Bênção do Mana",
        "description": "Você recebe +1 ponto de mana para cada nível de personagem.",
        "prerequisites": "Devoto de Wynna"
      },
      {
        "id": "centelha_magica",
        "name": "Centelha Mágica",
        "description": "Você aprende uma magia de 1º círculo de qualquer tipo (arcana ou divina) que não pertença à sua lista usual de classe.",
        "prerequisites": "Devoto de Wynna"
      },
      {
        "id": "escudo_magico",
        "name": "Escudo Mágico",
        "description": "Quando lança uma magia, você recebe +2 na Defesa até o início do seu próximo turno.",
        "prerequisites": "Devoto de Wynna"
      }
    ],
    "obligations": "Devotos de Wynna nunca podem negar a alguém o acesso ao aprendizado da magia e nunca matam seres mágicos ou fadas deliberadamente."
  }
];
