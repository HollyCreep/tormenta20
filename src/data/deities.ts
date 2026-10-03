import { Deity } from '../types/rules';

/**
 * Divindades — T20 JdA v1.3, Capítulo 1, págs. 96–105.
 * Gerado por .agents/tools/gen_deities.py a partir do texto do livro (não editar à mão).
 * Devoto: escolhe um poder concedido da lista do deus (clérigos e druidas escolhem dois) e segue as
 * Obrigações & Restrições (pág. 96).
 */
export const DEITIES_LIST: Deity[] = [
  {
    "id": "aharadak",
    "name": "Aharadak",
    "title": "O Deus da Tormenta",
    "description": "Outrora um dos terríveis Lordes da Tormenta, esta aberração monstruosa ambicionava o grande poder divino oferecido pelos devotos de Arton. Após anos liderando seu próprio culto profano, Aharadak matou Tauron, o Deus da Força, e ascendeu como o novo e macabro Deus da Tormenta. Agora ocupando uma posição importante no Panteão, os invasores lefeu avançam mais uma etapa em seus planos para corromper Arton. Apenas os devotos mais depravados ousam cultuar esta divindade de escatologia e sadismo.",
    "beliefs": "Reverenciar a Tormenta, apregoar a inevitabilidade de sua chegada ao mundo. Praticar a devassidão e a perversão. Deturpar tudo que é correto, desfigurar tudo que é normal. Abraçar a agonia, crueldade e loucura",
    "symbol": "Um olho macabro de pupila vertical e cercado de espinhos",
    "energyChannel": "Negativa",
    "favoredWeapon": "Corrente de espinhos",
    "allowedDevoteesText": "Quaisquer. A Tormenta aceita tudo e todos",
    "allowedRaces": [],
    "allowedClasses": [],
    "grantedPowers": [
      {
        "id": "afinidade_com_a_tormenta",
        "name": "Afinidade com a Tormenta",
        "description": "Você recebe +10 em testes de resistência contra efeitos da Tormenta, de suas criaturas e de devotos de Aharadak. Além disso, seu primeiro poder da Tormenta não conta para perda de Carisma."
      },
      {
        "id": "extase_da_loucura",
        "name": "Êxtase da Loucura",
        "description": "Toda vez que uma ou mais criaturas falham em um teste de Vontade contra uma de suas habilidades mágicas, você recebe 1 PM temporário cumulativo. Você pode ganhar um máximo de PM temporários por cena desta forma igual a sua Sabedoria."
      },
      {
        "id": "percepcao_temporal",
        "name": "Percepção Temporal",
        "description": "Você pode gastar 3 PM para somar sua Sabedoria (limitado por seu nível e não cumulativo com efeitos que somam este atributo) a seus ataques, Defesa e testes de Reflexos até o fim da cena."
      },
      {
        "id": "rejeicao_divina",
        "name": "Rejeição Divina",
        "description": "Você recebe resistência a magia divina +5."
      }
    ],
    "obligations": "Quase todos os cultistas de Aharadak são maníacos insanos, compelidos a praticar os atos mais abomináveis. No entanto, talvez devido à natureza alienígena e incompreensível deste deus, alguns devotos conseguem se resguardar. Preservam sua humanidade, abstendo-se de cometer crimes ou profanações. Ainda assim, o devoto paga um preço. No início de qualquer cena de ação, role 1d6. Com um resultado ímpar, você fica fascinado na primeira rodada, perdido em devaneios sobre a futilidade da vida (mesmo que seja imune a esta condição). Deuses Em Arton, você pode trabalhar a serviço dos deuses, cumprindo seus desígnios. Um personagem que serve a uma divindade é chamado devoto e, em troca de seguir certas obrigações, recebe poderes. Ser devoto é uma escolha. Por exemplo, você pode ser um cavaleiro normal, sem obrigações, ou um cavaleiro devoto de Khalmyr, com obrigações e poderes. Escolhendo seu deus Você pode se tornar devoto na construção de seu personagem ou sempre que subir de nível. Porém, só pode ter uma devoção e não pode mudá-la (exceto sob critério do mestre). Se você for clérigo, druida ou paladino, automaticamente será um devoto. Para ser devoto de um deus, sua raça ou sua classe devem estar listadas na seção “Devotos” do deus em questão. Humanos e clérigos são exceção — podem ser devotos de qualquer divindade. Ao se tornar devoto, você recebe um poder concedido a sua escolha da lista do deus e passa a seguir as Obrigações & Restrições dele. Se violá-las, perde todos os seus PM e só pode recuperá-los a partir do próximo dia. Se violá-las de novo na mesma aventura, perde todos os seus PM e não pode recuperá-los até fazer uma penitência (veja a perícia Religião). Poderes concedidos são descritos no Capítulo 2. Multiclasse. No caso de classes com listas de devoções permitidas, a classe com menos opções determina a que deve ser seguida (isso permite que uma devoção anterior seja mudada). Se não houver devoções compatíveis, a multiclasse não pode ser feita. Características dos deuses Crenças e Objetivos. Um resumo da doutrina da divindade, aquilo em que os devotos creem. Símbolo Sagrado. O símbolo do deus, normalmente usado como um medalhão ou na roupa. Canalizar Energia. O tipo de energia que a divindade canaliza. Devotos de alguns deuses podem escolher o tipo de energia (nesse caso, uma vez feita, a escolha não pode ser mudada). Arma Preferida. A arma típica de devotos do deus, importante para certas habilidades e magias."
  },
  {
    "id": "allihanna",
    "name": "Allihanna",
    "title": "A Deusa da Natureza",
    "description": "A Deusa da Natureza representa a bondade inerente ao mundo natural, a pureza das plantas e animais. Mesmo os animais predadores são considerados puros, inocentes — pois matam apenas para sobreviver, ao contrário dos monstros e seres civilizados. A divindade principal dos druidas, Allihanna também é cultuada por povos bárbaros. Estes veneram faces variadas desta deusa, que pode se manifestar como um majestoso animal (diferente para cada culto) ou uma criatura quimérica de muitas cabeças.",
    "beliefs": "Reverenciar os seres da natureza. Proteger a vida selvagem. Promover harmonia entre a natureza e a civilização. Combater monstros, mortos-vivos e outras criaturas que perturbam o equilíbrio natural",
    "symbol": "Para bárbaros e outros adoradores de animais, o símbolo corresponde ao respectivo animal. Para outros, uma pequena árvore",
    "energyChannel": "Positiva",
    "favoredWeapon": "Bordão",
    "allowedDevoteesText": "Dahllan, elfos, sílfides, bárbaros, caçadores, druidas",
    "allowedRaces": [
      "dahllan",
      "elfo",
      "silfide"
    ],
    "allowedClasses": [
      "barbaro",
      "cacador",
      "druida"
    ],
    "grantedPowers": [
      {
        "id": "compreender_os_ermos",
        "name": "Compreender os Ermos",
        "description": "Você recebe +2 em Sobrevivência e pode usar Sabedoria para Adestramento (em vez de Carisma)."
      },
      {
        "id": "dedo_verde",
        "name": "Dedo Verde",
        "description": "Você aprende e pode lançar Controlar Plantas. Caso aprenda novamente essa magia, seu custo diminui em –1 PM."
      },
      {
        "id": "descanso_natural",
        "name": "Descanso Natural",
        "description": "Para você, dormir ao relento conta como condição de descanso confortável."
      },
      {
        "id": "voz_da_natureza",
        "name": "Voz da Natureza",
        "description": "Você pode falar com animais (como o efeito da magia Voz Divina) e aprende e pode lançar Acalmar Animal, mas só contra animais. Caso aprenda novamente essa magia, seu custo diminui em –1 PM."
      }
    ],
    "obligations": "Devotos de Allihanna não podem usar armaduras e escudos feitos de metal. Assim, você só pode usar armadura acolchoada, de couro, gibão de peles e escudo leve, ou itens feitos de materiais especiais não metálicos. Devotos de Allihanna não podem descansar em nenhuma comunidade maior que uma aldeia (não perdem seus poderes, mas também não recuperam pontos de vida ou mana). Por isso, sempre preferem o relento a um quarto de estalagem."
  },
  {
    "id": "arsenal",
    "name": "Arsenal",
    "title": "O Deus da Guerra",
    "description": "Outrora um infame clérigo guerreiro, o vilão conhecido apenas como Mestre Arsenal se tornou sumo-sacerdote do violento deus Keenn. No entanto, após uma longa campanha que envolveu a conquista da mais poderosa espada mágica de Arton, o clérigo derrotou seu próprio patrono em combate durante um torneio épico, ascendendo ao Panteão como o novo Deus da Guerra. Com o objetivo de tornar Arton mais forte, capaz de confrontar qualquer inimigo, Arsenal e seus devotos seguem deflagrando conflitos por todo o Reinado e além.",
    "beliefs": "Promover a guerra e o conflito. Vencer a qualquer custo, pela força ou estratégia. Jamais oferecer ou aceitar rendição. Eliminar as próprias fraquezas. Conhecer o inimigo como a si mesmo. Sempre encontrar condições de vitória; quando não existirem, criá-las",
    "symbol": "Um martelo de guerra e uma espada longa cruzados sobre um escudo",
    "energyChannel": "Qualquer",
    "favoredWeapon": "Martelo de guerra",
    "allowedDevoteesText": "Anões, minotauros, bárbaros, cavaleiros, guerreiros, lutadores",
    "allowedRaces": [
      "anao",
      "minotauro"
    ],
    "allowedClasses": [
      "barbaro",
      "cavaleiro",
      "guerreiro",
      "lutador"
    ],
    "grantedPowers": [
      {
        "id": "conjurar_arma",
        "name": "Conjurar Arma",
        "description": "Você pode gastar 1 PM para invocar uma arma corpo a corpo ou de arremesso com a qual seja proficiente. A arma surge em sua mão, fornece +1 em testes de ataque e rolagens de dano, é considerada mágica e dura pela cena. Você não pode criar armas de disparo, mas pode criar 20 munições."
      },
      {
        "id": "coragem_total",
        "name": "Coragem Total",
        "description": "Você é imune a efeitos de medo, mágicos ou não. Este poder não elimina fobias raciais (como o medo de altura dos minotauros)."
      },
      {
        "id": "fe_guerreira",
        "name": "Fé Guerreira",
        "description": "Você pode usar Sabedoria para Guerra (em vez de Inteligência). Além disso, em combate, quando vai fazer um teste de perícia, você pode gastar 2 PM para substituí-lo por um teste de Guerra (exceto para testes de ataque)."
      },
      {
        "id": "sangue_de_ferro",
        "name": "Sangue de Ferro",
        "description": "Você pode pagar 3 PM para receber +2 em rolagens de dano e redução de dano 5 até o fim da cena."
      }
    ],
    "obligations": "Um devoto de Arsenal é proibido de ser derrotado em qualquer tipo de combate ou disputa (como um teste oposto para ver quem é mais forte). Caso seu grupo seja derrotado, isso também constitui uma violação das obrigações."
  },
  {
    "id": "azgher",
    "name": "Azgher",
    "title": "O Deus do Sol",
    "description": "Venerado pelos povos do Deserto da Perdição, o Deus-Sol é também cultuado por viajantes, mercadores honestos e todos aqueles que combatem as trevas. É um deus generoso; sua jornada diária derrama calor e conforto sobre Arton. Azgher é como um pai severo: responsável, provedor, mas que também exige respeito de seus filhos. Como um olho sempre vigilante nos céus, nada acontece à luz do dia sem que Azgher perceba.",
    "beliefs": "Praticar a gratidão pela proteção e generosidade do sol. Promover a honestidade, expor embustes e mentiras. Praticar a caridade e o altruísmo. Proteger os necessitados. Oferecer clemência, perdão e redenção. Combater o mal",
    "symbol": "Um sol dourado",
    "energyChannel": "Positiva",
    "favoredWeapon": "Cimitarra",
    "allowedDevoteesText": "Aggelus, qareen, arcanistas, bárbaros, caçadores, cavaleiros, guerreiros, nobres, paladinos",
    "allowedRaces": [
      "qareen",
      "suraggel"
    ],
    "allowedClasses": [
      "arcanista",
      "barbaro",
      "cacador",
      "cavaleiro",
      "guerreiro",
      "nobre",
      "paladino"
    ],
    "grantedPowers": [
      {
        "id": "espada_solar",
        "name": "Espada Solar",
        "description": "Você pode gastar 1 PM para fazer uma arma corpo a corpo de corte que esteja empunhando causar +1d6 de dano por fogo até o fim da cena."
      },
      {
        "id": "fulgor_solar",
        "name": "Fulgor Solar",
        "description": "Você recebe redução de frio e trevas 5. Além disso, quando é alvo de um ataque você pode gastar 1 PM para emitir um clarão solar que deixa o atacante ofuscado por uma rodada."
      },
      {
        "id": "habitante_do_deserto",
        "name": "Habitante do Deserto",
        "description": "Você recebe redução de fogo 10 e pode pagar 1 PM para criar água pura e potável suficiente para um odre (ou outro recipiente pequeno)."
      },
      {
        "id": "inimigo_de_tenebra",
        "name": "Inimigo de Tenebra",
        "description": "Seus ataques e habilidades causam +1d6 pontos de dano contra mortos-vivos. Quando você usa um efeito que gera luz, o alcance da iluminação dobra."
      }
    ],
    "obligations": "O devoto de Azgher deve manter o rosto sempre coberto (com uma máscara, capuz ou trapos). Sua face pode ser revelada apenas ao sumo-sacerdote ou em seu funeral. Devotos do Sol também devem doar para a igreja de Azgher 20% de qualquer tesouro obtido. Essa doação deve ser feita em ouro, seja na forma de moedas ou itens."
  },
  {
    "id": "hyninn",
    "name": "Hyninn",
    "title": "O Deus dos Ladrões",
    "description": "Capaz de enganar até mesmo outros deuses, o ardiloso Deus da Trapaça é uma divindade favorita de foras da lei — seus clérigos atuam como conselheiros, ou até mesmo líderes, em guildas criminosas ou navios piratas. Também é louvado por regentes e mercadores não muito honestos, orando por vantagens ilícitas. No entanto, mesmo pessoas honradas eventualmente simpatizam com Hyninn por sua esperteza, despreocupação e ousadia.",
    "beliefs": "Praticar a astúcia e a esperteza. Demonstrar que honestidade e sinceridade levam ao fracasso. Desafiar a lei e a ordem. Ser vitorioso sem seguir regras. Fazer aos outros antes que façam a você. Levar vantagem em tudo",
    "symbol": "Uma adaga atravessando uma máscara, ou uma raposa",
    "energyChannel": "Qualquer",
    "favoredWeapon": "Adaga",
    "allowedDevoteesText": "Hynne, goblins, sílfides, bardos, bucaneiros, ladinos, inventores, nobres",
    "allowedRaces": [
      "goblin",
      "hynne",
      "silfide"
    ],
    "allowedClasses": [
      "bardo",
      "bucaneiro",
      "inventor",
      "ladino",
      "nobre"
    ],
    "grantedPowers": [
      {
        "id": "apostar_com_o_trapaceiro",
        "name": "Apostar com o Trapaceiro",
        "description": "Quando faz um teste de perícia, você pode gastar 1 PM para apostar com Hyninn. Você e o mestre rolam 1d20, mas o mestre mantém o resultado dele em segredo. Você então escolhe entre usar seu próprio resultado ou o resultado oculto do mestre (neste caso, ele revela o resultado)."
      },
      {
        "id": "farsa_do_fingidor",
        "name": "Farsa do Fingidor",
        "description": "Você aprende e pode lançar Criar Ilusão. Caso aprenda novamente essa magia, seu custo diminui em –1 PM."
      },
      {
        "id": "forma_de_macaco",
        "name": "Forma de Macaco",
        "description": "Você pode gastar uma ação completa e 2 PM para se transformar em um macaco. Você adquire tamanho Minúsculo (o que fornece +5 em Furtividade e –5 em testes de manobra) e recebe deslocamento de escalar 9m. Seu equipamento desaparece (e você perde seus benefícios) até você voltar ao normal, mas suas outras estatísticas não são alteradas. A transformação dura indefinidamente, mas termina caso você faça um ataque, lance uma magia ou sofra dano."
      },
      {
        "id": "golpista_divino",
        "name": "Golpista Divino",
        "description": "Você recebe +2 em Enganação, Jogatina e Ladinagem."
      }
    ],
    "obligations": "Um devoto de Hyninn não recusa participação em um golpe, trapaça ou artimanha (o que muitas vezes inclui missões para roubar... hã, resgatar tesouros), exceto quando prejudica seus próprios aliados. O devoto também deve fazer um ato furtivo, ousado ou proibido por dia (ou por sessão de jogo, o que demorar mais), como oferenda a Hyninn. Roubar uma bolsa, enganar um miliciano, invadir o quarto de um nobre... Em termos de jogo, uma ação exigindo um teste de Enganação ou Ladinagem com CD mínima 15 + metade do seu nível."
  },
  {
    "id": "kallyadranoch",
    "name": "Kallyadranoch",
    "title": "O Deus dos Dragões",
    "description": "Como punição imposta por Khalmyr pelo crime de criar a Tormenta, o Deus dos Dragões estava esquecido até poucos anos atrás, conhecido apenas como “o Terceiro”. Restaurado em tempos recentes durante um combate épico contra os invasores aberrantes, Kallyadranoch agora governa não apenas os dragões, mas todos que cultuam o poder elemental das grandes feras. Além disso, enquanto Wynna representa o lado bondoso e generoso da magia arcana, Kally é cultuado por arcanistas malignos.",
    "beliefs": "Praticar a soberania. Demonstrar orgulho, superioridade, majestade. Praticar o acúmulo de riquezas. Proteger suas posses e sua dignidade. Ser implacável com seus inimigos. Reverenciar os dragões e suas crias",
    "symbol": "Escamas de cinco cores diferentes",
    "energyChannel": "Negativa",
    "favoredWeapon": "Lança",
    "allowedDevoteesText": "Elfos, medusas, sulfure, arcanistas, cavaleiros, guerreiros, lutadores, nobres",
    "allowedRaces": [
      "elfo",
      "medusa",
      "suraggel"
    ],
    "allowedClasses": [
      "arcanista",
      "cavaleiro",
      "guerreiro",
      "lutador",
      "nobre"
    ],
    "grantedPowers": [
      {
        "id": "aura_de_medo",
        "name": "Aura de Medo",
        "description": "Você pode gastar 2 PM para gerar uma aura de medo de 9m de raio e duração até o fim da cena. Todos os inimigos que entrem na aura devem fazer um teste de Vontade (CD Car) ou ficam abalados até o fim da cena. Uma criatura que passe no teste de Vontade fica imune a esta habilidade por um dia."
      },
      {
        "id": "escamas_draconicas",
        "name": "Escamas Dracônicas",
        "description": "Você recebe +2 na Defesa e em Fortitude."
      },
      {
        "id": "presas_primordiais",
        "name": "Presas Primordiais",
        "description": "Você pode gastar 1 PM para transformar seus dentes em presas afiadas até o fim da cena. Você recebe uma arma natural de mordida (dano 1d6, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir com outra arma, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida. Se já possuir outro ataque natural de mordida, em vez disso, o dano desse ataque aumenta em dois passos."
      },
      {
        "id": "servos_do_dragao",
        "name": "Servos do Dragão",
        "description": "Você pode gastar uma ação completa e 2 PM para invocar 2d4+1 kobolds capangas em espaços desocupados em alcance curto. Você pode gastar uma ação de movimento para fazer os kobolds andarem (eles têm deslocamento 9m) ou uma ação padrão para fazê-los causar dano a criaturas adjacentes (1d6–1 pontos de dano de perfuração cada). Os kobolds têm For –1, Des 1, Defesa 12, 1 PV e falham automaticamente em qualquer teste de resistência ou oposto. Eles desaparecem quando morrem ou no fim da cena. Os kobolds não agem sem receber uma ordem. Usos criativos para capangas fora de combate ficam a critério do mestre."
      }
    ],
    "obligations": "Para subir de nível, além de acumular XP suficiente, o devoto de Kally deve realizar uma oferenda em tesouro. O valor é igual à 20% da diferença do dinheiro inicial do nível que vai alcançar para o nível atual (por exemplo, T$ 80 para subir para o 4° nível). Sabe-se, também, de devotos malignos que sacrificam vítimas a Kally (não permitido para personagens jogadores)."
  },
  {
    "id": "khalmyr",
    "name": "Khalmyr",
    "title": "O Deus da Justiça",
    "description": "Antigo líder do Panteão, o Deus da Justiça já foi considerado a divindade mais popular no Reinado. Isso mudaria com a vitória dos minotauros nas Guerras Táuricas, bem como a recente ascensão de Valkaria como nova líder dos deuses. Mesmo assim, Khalmyr ainda é louvado por aqueles que lutam pela ordem e justiça. As duas maiores ordens de cavaleiros em Arton foram criadas em sua honra: a Ordem da Luz e a Ordem de Khalmyr. Esta é também uma das divindades principais dos anões, junto de Tenebra — conforme a crença, ambos teriam gerado juntos a raça anã.",
    "beliefs": "Praticar a caridade e o altruísmo. Defender a lei, a ordem e os necessitados. Combater a mentira, o crime e o mal. Oferecer clemência, perdão e redenção. Lutar o bom combate",
    "symbol": "Espada sobreposta a uma balança",
    "energyChannel": "Positiva",
    "favoredWeapon": "Espada longa",
    "allowedDevoteesText": "Aggelus, anões, cavaleiros, guerreiros, nobres, paladinos",
    "allowedRaces": [
      "anao",
      "suraggel"
    ],
    "allowedClasses": [
      "cavaleiro",
      "guerreiro",
      "nobre",
      "paladino"
    ],
    "grantedPowers": [
      {
        "id": "coragem_total",
        "name": "Coragem Total",
        "description": "Você é imune a efeitos de medo, mágicos ou não. Este poder não elimina fobias raciais (como o medo de altura dos minotauros)."
      },
      {
        "id": "dom_da_verdade",
        "name": "Dom da Verdade",
        "description": "Você pode pagar 2 PM para receber +5 em testes de Intuição, e em testes de Percepção contra Enganação e Furtividade, até o fim da cena."
      },
      {
        "id": "espada_justiceira",
        "name": "Espada Justiceira",
        "description": "Você pode gastar 1 PM para encantar sua espada (ou outra arma corpo a corpo de corte que esteja empunhando). Ela tem seu dano aumentado em um passo até o fim da cena."
      },
      {
        "id": "reparar_injustica",
        "name": "Reparar Injustiça",
        "description": "Uma vez por rodada, quando um oponente em alcance curto acerta um ataque em você ou em um de seus aliados, você pode gastar 2 PM para fazer este oponente repetir o ataque, escolhendo o pior entre os dois resultados."
      }
    ],
    "obligations": "Devotos de Khalmyr não podem recusar pedidos de ajuda de pessoas inocentes. Também devem cumprir as ordens de superiores na hierarquia da igreja (devotos do Deus da Justiça de nível maior) e só podem usar itens mágicos permanentes criados por devotos do mesmo deus."
  },
  {
    "id": "lena",
    "name": "Lena",
    "title": "A Deusa da Vida",
    "description": "Mesmo os deuses mais violentos e cruéis são respeitosos com a Deusa Criança, provedora da fertilidade, do sustento, da própria vida. Lena não é venerada apenas por aventureiros necessitados de curas mágicas, mas também por fazendeiros que imploram por colheitas fartas, criadores desejosos de saúde para seus animais e cada grávida prestes a dar à luz. Servida quase exclusivamente por mulheres, a Deusa da Vida oferece os mais poderosos milagres de cura presenciados em Arton.",
    "beliefs": "Reverenciar e proteger a vida em todas as suas formas. Reverenciar a fertilidade, a fecundidade, a maternidade e a infância. Praticar a caridade e o altruísmo. Oferecer clemência, perdão e redenção. Aliviar a dor e o sofrimento físico, mental ou espiritual",
    "symbol": "Lua crescente prateada",
    "energyChannel": "Positiva",
    "favoredWeapon": "Não há. Servos desta deusa não podem lançar a magia Arma Espiritual e similares",
    "allowedDevoteesText": "Dahllan, qareen, nobres, paladinos",
    "allowedRaces": [
      "dahllan",
      "qareen"
    ],
    "allowedClasses": [
      "nobre",
      "paladino"
    ],
    "grantedPowers": [
      {
        "id": "ataque_piedoso",
        "name": "Ataque Piedoso",
        "description": "Você pode usar armas corpo a corpo para causar dano não letal sem sofrer a penalidade de –5 no teste de ataque."
      },
      {
        "id": "aura_restauradora",
        "name": "Aura Restauradora",
        "description": "Efeitos de cura usados por você e seus aliados em um raio de 9m recuperam +1 PV por dado."
      },
      {
        "id": "cura_gentil",
        "name": "Cura Gentil",
        "description": "Você soma seu Carisma aos PV restaurados por seus efeitos mágicos de cura."
      },
      {
        "id": "curandeira_perfeita",
        "name": "Curandeira Perfeita",
        "description": "Você sempre pode escolher 10 em testes de Cura. Além disso, não sofre penalidade por usar essa perícia sem uma maleta de medicamentos. Se possuir o item, recebe +2 no teste de Cura (ou +5, se ele for aprimorado)."
      }
    ],
    "obligations": "Devotos de Lena não podem causar dano letal ou perda de PV a criaturas vivas (fornecer bônus em dano letal também é proibido). Podem causar dano não letal e prejudicar seus inimigos (em termos de jogo, impondo condições), desde que não causem dano letal ou perda de PV. Para um devoto de Lena, é preferível perder a própria vida a tirá-la de outros. Apenas mulheres podem ser devotas de Lena. Uma clériga precisa dar à luz pelo menos uma vez antes de receber seus poderes divinos. A fecundação é um mistério bem guardado pelas sacerdotisas; conta-se que a própria deusa vem semear suas discípulas. Paladinos de Lena podem ser homens (são os únicos devotos masculinos permitidos) ou mulheres."
  },
  {
    "id": "lin_wu",
    "name": "Lin-Wu",
    "title": "O Deus da Honra",
    "description": "Mesmo com a quase extinção de seu povo pela Tormenta, o honrado Deus Samurai nunca fraquejou, nunca perdeu sua dignidade. Hoje, o Império de Jade está livre da tempestade, seus habitantes retornam para a grande reconstrução. Lin-Wu e seu povo sempre serão gratos aos campeões gaijin, por sua amizade e suporte durante os anos de pesadelo. Talvez por esse motivo, conforme especulam seus servos shugenja, devotos de Lin-Wu atuando longe de Tamu-ra recebem poderes diferentes, mais convenientes para suas missões.",
    "beliefs": "Promover a honra acima de tudo. Proteger Tamu-ra e o Reinado de Arton. Praticar honestidade, coragem, cortesia e compaixão. Demonstrar integridade e dignidade. Ser leal a seus companheiros. Buscar redenção após cometer desonra",
    "symbol": "Placa de metal com a silhueta de um dragão-serpente celestial",
    "energyChannel": "Qualquer",
    "favoredWeapon": "Katana",
    "allowedDevoteesText": "Anões, cavaleiros, guerreiros, nobres, paladinos",
    "allowedRaces": [
      "anao"
    ],
    "allowedClasses": [
      "cavaleiro",
      "guerreiro",
      "nobre",
      "paladino"
    ],
    "grantedPowers": [
      {
        "id": "coragem_total",
        "name": "Coragem Total",
        "description": "Você é imune a efeitos de medo, mágicos ou não. Este poder não elimina fobias raciais (como o medo de altura dos minotauros)."
      },
      {
        "id": "kiai_divino",
        "name": "Kiai Divino",
        "description": "Uma vez por rodada, quando faz um ataque corpo a corpo, você pode pagar 3 PM. Se acertar o ataque, causa dano máximo, sem necessidade de rolar dados."
      },
      {
        "id": "mente_vazia",
        "name": "Mente Vazia",
        "description": "Você recebe +2 em Iniciativa, Percepção e Vontade."
      },
      {
        "id": "tradicao_de_lin_wu",
        "name": "Tradição de Lin-Wu",
        "description": "Você considera a katana uma arma simples e, se for proficiente em armas marciais, recebe +1 na margem de ameaça com ela."
      }
    ],
    "obligations": "Antigas proibições quanto a devotos estrangeiros ou do gênero feminino não mais se aplicam. No entanto, devotos de Lin-Wu ainda devem demonstrar comportamento honrado, jamais recorrendo a mentiras e subterfúgios. Em termos de jogo, são proibidos de tentar qualquer ação que exigiria um teste de Enganação, Furtividade ou Ladinagem."
  },
  {
    "id": "marah",
    "name": "Marah",
    "title": "A Deusa da Paz",
    "description": "Neste mundo sempre em guerra, devotos da Deusa da Paz talvez sejam os mais corajosos e perseverantes, buscando inspiração em sua padroeira para proteger Arton sem usar de violência. Marah ensina a suportar qualquer provação, demonstrar que brutalidade nunca é a única resposta. Ainda assim, esta não é apenas uma divindade de placidez e indolência; devotos de Marah costumam ser plenos de bom humor e atitude positiva, sempre prontos para uma nova celebração ou romance...",
    "beliefs": "Praticar o amor e a gratidão pela vida e pela bondade. Promover a paz, harmonia e felicidade. Aliviar a dor e o sofrimento, trazer conforto aos aflitos. Praticar a caridade e o altruísmo. Oferecer clemência, perdão e redenção",
    "symbol": "Um coração vermelho",
    "energyChannel": "Positiva",
    "favoredWeapon": "Não há. Devotos desta deusa não podem lançar a magia Arma Espiritual e similares",
    "allowedDevoteesText": "Aggelus, elfos, hynne, qareen, bardos, nobres, paladinos",
    "allowedRaces": [
      "elfo",
      "hynne",
      "qareen",
      "suraggel"
    ],
    "allowedClasses": [
      "bardo",
      "nobre",
      "paladino"
    ],
    "grantedPowers": [
      {
        "id": "aura_de_paz",
        "name": "Aura de Paz",
        "description": "Você pode gastar 2 PM para gerar uma aura de paz com 9m de raio e duração de uma cena. Qualquer inimigo dentro da aura que tente fazer uma ação hostil contra você deve fazer um teste de Vontade (CD Car). Se falhar, perderá sua ação. Se passar, fica imune a esta habilidade por um dia."
      },
      {
        "id": "dom_da_esperanca",
        "name": "Dom da Esperança",
        "description": "Você soma sua Sabedoria em seus PV em vez de Constituição, e se torna imune às condições alquebrado, esmorecido e frustrado."
      },
      {
        "id": "palavras_de_bondade",
        "name": "Palavras de Bondade",
        "description": "Você aprende e pode lançar Enfeitiçar. Caso aprenda novamente essa magia, seu custo diminui em –1 PM."
      },
      {
        "id": "talento_artistico",
        "name": "Talento Artístico",
        "description": "Você recebe +2 em Acrobacia, Atuação e Diplomacia."
      }
    ],
    "obligations": "Devotos de Marah não podem causar dano, perda de PV e condições a criaturas, exceto enfeitiçado, fascinado e pasmo (fornecer bônus em dano também é proibido). Em combate, só podem recorrer a ações como proteger ou curar — ou fugir, render-se ou aceitar a morte. Um devoto de Marah jamais vai causar violência, nem mesmo para se salvar."
  },
  {
    "id": "megalokk",
    "name": "Megalokk",
    "title": "O Deus dos Monstros",
    "description": "O Deus dos Monstros é uma divindade de selvageria e descontrole — quando bárbaros entram em fúria, diz-se que estão apenas canalizando seu rancor primordial. Enquanto servos de Allihanna promovem harmonia entre a natureza e os povos civilizados, devotos de seu irmão sanguinário buscam apenas o extermínio de seus inimigos. E, para um servo do Deus dos Monstros, quase tudo que se move é um inimigo...",
    "beliefs": "Praticar a violência, a soberania do mais forte. Jamais reprimir os próprios instintos e desejos. Jamais ser domado, desafiar qualquer forma de controle. Jamais oferecer perdão ou rendição. Eliminar os fracos. Destruir seus inimigos",
    "symbol": "A garra de um monstro",
    "energyChannel": "Negativa",
    "favoredWeapon": "Maça",
    "allowedDevoteesText": "Goblins, medusas, minotauros, sulfure, trogs, bárbaros, caçadores, druidas, lutadores",
    "allowedRaces": [
      "goblin",
      "medusa",
      "minotauro",
      "suraggel",
      "trog"
    ],
    "allowedClasses": [
      "barbaro",
      "cacador",
      "druida",
      "lutador"
    ],
    "grantedPowers": [
      {
        "id": "olhar_amedrontador",
        "name": "Olhar Amedrontador",
        "description": "Você aprende e pode lançar Amedrontar. Caso aprenda novamente essa magia, seu custo diminui em –1 PM."
      },
      {
        "id": "presas_primordiais",
        "name": "Presas Primordiais",
        "description": "Você pode gastar 1 PM para transformar seus dentes em presas afiadas até o fim da cena. Você recebe uma arma natural de mordida (dano 1d6, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir com outra arma, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida. Se já possuir outro ataque natural de mordida, em vez disso, o dano desse ataque aumenta em dois passos."
      },
      {
        "id": "urro_divino",
        "name": "Urro Divino",
        "description": "Quando faz um ataque ou lança uma magia, você pode pagar 1 PM para somar sua Constituição (mínimo +1) à rolagem de dano desse ataque ou magia."
      },
      {
        "id": "voz_dos_monstros",
        "name": "Voz dos Monstros",
        "description": "Você conhece os idiomas de todos os monstros inteligentes e pode se comunicar livremente com monstros não inteligentes (Int –4 ou menor), como se estivesse sob efeito da magia Voz Divina."
      }
    ],
    "obligations": "Devotos de Megalokk devem rejeitar os modos civilizados e se entregar à ferocidade, descontrole e impaciência. Você é proibido de usar perícias baseadas em Inteligência ou Carisma (exceto Adestramento e Intimidação) e não pode preparar uma ação, escolher 10 ou 20 em testes e sustentar efeitos (pois são ações que exigem foco e paciência)."
  },
  {
    "id": "nimb",
    "name": "Nimb",
    "title": "O Deus do Caos e da Sorte",
    "description": "“Khalmyr tem o tabuleiro, mas quem move as peças é Nimb” — provérbio dos tempos em que o Deus da Justiça governava o Panteão, sua liderança sempre desafiada pelo insano Deus do Caos. Nada é certo sobre esta entidade do acaso, sorte e azar. Teria Nimb cuidadosamente tramado a queda de Khalmyr, enfim derrotando o eterno rival? Seria ele capaz de um plano tão louco e brilhante? Ou não? Nimb é mais temido do que venerado pelos artonianos, cautelosos quanto as suas constantes mudanças de humor. Muitos desejam que ele lhes sorria, mas poucos escolhem ser seus devotos. Ainda assim, há quem abrace sua loucura libertadora.",
    "beliefs": "Reverenciar o caos, a aleatoriedade, a sorte e o azar. Praticar a ousadia e a rebeldia, desafiar regras e leis. Rejeitar o bom senso. Tornar o mundo mais interessante. Ou divertido. Ou terrível. Ou não",
    "symbol": "Um dado de seis faces",
    "energyChannel": "Qualquer",
    "favoredWeapon": "Nenhuma e todas! Ao usar um efeito que dependa de arma preferida, qualquer arma (ou outro objeto!) pode aparecer, de acordo com o mestre",
    "allowedDevoteesText": "Goblins, qareen, sílfides, arcanistas, bárbaros, bardos, bucaneiros, inventores, ladinos",
    "allowedRaces": [
      "goblin",
      "qareen",
      "silfide"
    ],
    "allowedClasses": [
      "arcanista",
      "barbaro",
      "bardo",
      "bucaneiro",
      "inventor",
      "ladino"
    ],
    "grantedPowers": [
      {
        "id": "extase_da_loucura",
        "name": "Êxtase da Loucura",
        "description": "Toda vez que uma ou mais criaturas falham em um teste de Vontade contra uma de suas habilidades mágicas, você recebe 1 PM temporário cumulativo. Você pode ganhar um máximo de PM temporários por cena desta forma igual a sua Sabedoria."
      },
      {
        "id": "poder_oculto",
        "name": "Poder Oculto",
        "description": "Você pode gastar uma ação de movimento e 2 PM para invocar a força, a rapidez ou o vigor dos loucos. Role 1d6 para receber +2 em Força (1 ou 2), Destreza (3 ou 4) ou Constituição (5 ou 6) até o fim da cena. Você pode usar este poder várias vezes, mas bônus no mesmo atributo não são cumulativos."
      },
      {
        "id": "sorte_dos_loucos",
        "name": "Sorte dos Loucos",
        "description": "Quando faz um teste, você pode pagar 1 PM para rolá-lo novamente (você pode fazer isso mais de uma vez por teste). Se ainda assim falhar, perde 1d6 PM para cada vez que utilizou este poder neste teste."
      },
      {
        "id": "transmissao_da_loucura",
        "name": "Transmissão da Loucura",
        "description": "Você pode lançar Sussurros Insanos (CD Car). Caso aprenda novamente essa magia, seu custo diminui em –1 PM."
      }
    ],
    "obligations": "Por serem incapazes de seguir regras, estes devotos não têm “obrigações” verdadeiras (portanto, nunca perdem PM por descumprirem suas O&R). No entanto, sofrem certas restrições que não podem ignorar. Devotos de Nimb são loucos (ou agem como se fossem), não conseguindo convencer ninguém de coisa alguma. Você sofre –5 em testes de perícias baseadas em Carisma. Além disso, no início de cada cena de ação, role 1d6. Com um resultado 1, você fica confuso (mesmo que seja imune a esta condição)."
  },
  {
    "id": "oceano",
    "name": "Oceano",
    "title": "O Deus dos Mares",
    "description": "Nestes tempos de grande tumulto no plano divino, em meio a deuses caindo e ascendendo, o Deus dos Mares está entre os poucos ainda imutáveis. Sua época de fúria, quando arrasava civilizações inteiras, foi quase esquecida. Hoje o Oceano é sereno, pleno em si mesmo, alienado dos conflitos no Panteão — acha os outros deuses mesquinhos, disputando ninharias, frente à vastidão de seus domínios. Ainda assim, recebe preces de marinheiros, piratas e povos marinhos, orando por sua tranquilidade, rogando que suas tempestades sejam breves.",
    "beliefs": "Reverenciar os mares, o oceano e os seres que ali habitam. Promover harmonia entre o oceano e o mundo seco. Proteger os seres marinhos, mas também os seres do mundo seco que se aventuram sobre as ondas. Demandar devido respeito ao mar e seu poder",
    "symbol": "Uma concha",
    "energyChannel": "Qualquer",
    "favoredWeapon": "Tridente",
    "allowedDevoteesText": "Dahllan, hynne, minotauros, sereias/ tritões, bárbaros, bucaneiros, caçadores, druidas",
    "allowedRaces": [
      "dahllan",
      "hynne",
      "minotauro",
      "sereia"
    ],
    "allowedClasses": [
      "barbaro",
      "bucaneiro",
      "cacador",
      "druida"
    ],
    "grantedPowers": [
      {
        "id": "anfibio",
        "name": "Anfíbio",
        "description": "Você pode respirar embaixo d’água e adquire deslocamento de natação igual a seu deslocamento terrestre."
      },
      {
        "id": "arsenal_das_profundezas",
        "name": "Arsenal das Profundezas",
        "description": "Você recebe +2 nas rolagens de dano com azagaias, lanças e tridentes e seu multiplicador de crítico com essas armas aumenta em +1."
      },
      {
        "id": "mestre_dos_mares",
        "name": "Mestre dos Mares",
        "description": "Você pode falar com animais aquáticos (como o efeito da magia Voz Divina) e aprende e pode lançar Acalmar Animal, mas só contra criaturas aquáticas. Caso aprenda novamente essa magia, seu custo diminui em –1 PM."
      },
      {
        "id": "sopro_do_mar",
        "name": "Sopro do Mar",
        "description": "Você pode gastar uma ação padrão e 1 PM para soprar vento marinho em um cone de 6m. Criaturas na área sofrem 2d6 pontos de dano de frio (Reflexos CD Sab reduz à metade). Você pode aprender Sopro das Uivantes como uma magia divina. Se fizer isso, o custo dela diminui em –1 PM."
      }
    ],
    "obligations": "As únicas armas permitidas para devotos do Oceano são a azagaia, a lança, o tridente e a rede. Podem usar apenas armaduras leves. O devoto também não pode se manter afastado do oceano por mais de um mês."
  },
  {
    "id": "sszzaas",
    "name": "Sszzaas",
    "title": "O Deus da Traição",
    "description": "O sibilante Deus da Traição não é apenas o mais inteligente entre os deuses, mas também o mais perigoso. Tão perigoso que, certa vez, tentou reunir os Rubis da Virtude — vinte gemas de poder contendo a essência de todos os deuses. Chegou a ser expulso do Panteão por esse crime, mas sua astúcia não conhecia limites; Sszzaas conseguiu tramar um novo plano para ser aceito de volta. Hoje, mesmo após a quase extinção de seu culto, os sszzaazitas voltam a se espalhar sobre Arton, agindo em nome do Grande Corruptor. Mas será prudente devotar-se a um Deus da Traição? Apenas os mais ousados e astutos acreditam que sim.",
    "beliefs": "Praticar a mentira e a trapaça. Buscar sempre a solução mais inteligente. Demonstrar que lealdade e confiança são fraquezas, devem ser eliminadas. Promover competição, rivalidade, desconfiança. Usar os recursos do inimigo para alcançar seus objetivos. Levar outros a se sacrificarem em seu lugar",
    "symbol": "Uma naja vertendo veneno pelas presas",
    "energyChannel": "Negativa",
    "favoredWeapon": "Adaga",
    "allowedDevoteesText": "Medusas, arcanistas, bardos, bucaneiros, inventores, ladinos, nobres",
    "allowedRaces": [
      "medusa"
    ],
    "allowedClasses": [
      "arcanista",
      "bardo",
      "bucaneiro",
      "inventor",
      "ladino",
      "nobre"
    ],
    "grantedPowers": [
      {
        "id": "astucia_da_serpente",
        "name": "Astúcia da Serpente",
        "description": "Você recebe +2 em Enganação, Furtividade e Intuição."
      },
      {
        "id": "familiar_ofidico",
        "name": "Familiar Ofídico",
        "description": "Você recebe um familiar cobra (veja a página 38) que não conta em seu limite de parceiros."
      },
      {
        "id": "presas_venenosas",
        "name": "Presas Venenosas",
        "description": "Você pode gastar uma ação de movimento e 1 PM para envenenar uma arma corpo a corpo que esteja empunhando. Em caso de acerto, a arma causa perda de 1d12 pontos de vida. A arma permanece envenenada até atingir uma criatura ou até o fim da cena, o que acontecer primeiro."
      },
      {
        "id": "sangue_ofidico",
        "name": "Sangue Ofídico",
        "description": "Você recebe resistência a veneno +5 e a CD para resistir aos seus venenos aumenta em +2."
      }
    ],
    "obligations": "O devoto deve fazer um ato de traição, intriga ou corrupção por dia (ou por sessão de jogo, o que demorar mais) como oferenda a Sszzaas. Pouco importa se o alvo é aliado ou inimigo — uns poucos sszzaazitas usam seus métodos torpes para ajudar colegas aventureiros em suas missões, às vezes sem que eles próprios saibam. Sugerir a alguém que foi traído pelo cônjuge, influenciar um guarda a aceitar suborno, instruir um mercador a roubar nos preços, incriminar alguém por um crime que não cometeu, enganar um guerreiro para que mate um oponente rendido e inofensivo... Em termos de jogo, uma ação exigindo um teste de Enganação com CD mínima 15 + metade do seu nível."
  },
  {
    "id": "tanna_toh",
    "name": "Tanna-Toh",
    "title": "A Deusa do Conhecimento",
    "description": "Em uma sociedade medieval típica, apenas membros do clero ou da nobreza teriam acesso a boa educação — camponeses jamais saberiam ler e escrever. Não é assim no Reinado de Arton, graças ao empenho da igreja de Tanna-Toh. Devotos da Deusa do Conhecimento atuam como professores, catequistas e pesquisadores, tomando a missão sagrada de levar educação e cultura para todos. Tanna-Toh é amplamente venerada pelos povos civilizados, amada por aqueles que se devotam aos estudos ou artes. Ainda assim, esta deusa é inimiga de povos bárbaros que escolhem permanecer ignorantes e selvagens.",
    "beliefs": "Reverenciar a mente racional, o conhecimento, a civilização, a verdade. Proteger o progresso, o avanço dos povos civilizados. Promover o ensino e a prática das artes e das ciências. Solucionar todos os mistérios, revelar todas as mentiras. Buscar novo conhecimento. Não tolerar a ignorância",
    "symbol": "Pergaminho e pena",
    "energyChannel": "Qualquer",
    "favoredWeapon": "Bordão",
    "allowedDevoteesText": "Golens, kliren, arcanistas, bardos, inventores, nobres, paladinos",
    "allowedRaces": [
      "golem",
      "kliren"
    ],
    "allowedClasses": [
      "arcanista",
      "bardo",
      "inventor",
      "nobre",
      "paladino"
    ],
    "grantedPowers": [
      {
        "id": "conhecimento_enciclopedico",
        "name": "Conhecimento Enciclopédico",
        "description": "Você se torna treinado em duas perícias baseadas em Inteligência a sua escolha."
      },
      {
        "id": "mente_analitica",
        "name": "Mente Analítica",
        "description": "Você recebe +2 em Intuição, Investigação e Vontade."
      },
      {
        "id": "pesquisa_abencoada",
        "name": "Pesquisa Abençoada",
        "description": "Se passar uma hora pesquisando seus livros e anotações, você pode rolar novamente um teste de perícia baseada em Inteligência ou Sabedoria que tenha feito desde a última cena. Se tiver acesso a mais livros, você recebe um bônus no teste: +2 para uma coleção particular ou biblioteca pequena e +5 para a biblioteca de um templo ou universidade."
      },
      {
        "id": "voz_da_civilizacao",
        "name": "Voz da Civilização",
        "description": "Você está sempre sob efeito de Compreensão."
      }
    ],
    "obligations": "Devotos de Tanna-Toh jamais podem recusar uma missão que envolva a busca por um novo conhecimento ou informação; investigar rumores sobre um livro perdido, procurar uma aldeia lendária, pesquisar os hábitos de uma criatura desconhecida... Além disso, o devoto sempre deve dizer a verdade e nunca pode se recusar a responder uma pergunta direta, pouco importando as consequências. É proibido para ele esconder qualquer conhecimento."
  },
  {
    "id": "tenebra",
    "name": "Tenebra",
    "title": "A Deusa da Noite",
    "description": "Assim como seu inimigo Azgher vigia e protege Arton durante o dia, Tenebra é atenta sob as estrelas; nada acontece na noite sem seu conhecimento. A sedutora e misteriosa Deusa das Trevas é mãe de tudo que anda e rasteja no escuro, dos nobres anões aos sinistros mortos-vivos e trogloditas. Ainda que muitas vezes temida, Tenebra sempre protegeu as criaturas noturnas e subterrâneas, bondosas ou malignas. No entanto, com a recente destruição de Ragnar, antigo Deus da Morte, cada vez mais cultos necromantes começam a oferecer sacrifícios à Mãe Noite.",
    "beliefs": "Reverenciar a noite, a escuridão, a lua e as estrelas. Proteger segredos e mistérios, proteger tudo que é oculto e invisível. Reverenciar a não vida e os mortos-vivos, propagar a prática da necromancia. Rejeitar o sol e a luz",
    "symbol": "Estrela negra de cinco pontas",
    "energyChannel": "Negativa",
    "favoredWeapon": "Adaga",
    "allowedDevoteesText": "Anões, medusas, qareen, osteon, sulfure, trogs, arcanistas, bardos, ladinos",
    "allowedRaces": [
      "anao",
      "medusa",
      "osteon",
      "qareen",
      "suraggel",
      "trog"
    ],
    "allowedClasses": [
      "arcanista",
      "bardo",
      "ladino"
    ],
    "grantedPowers": [
      {
        "id": "caricia_sombria",
        "name": "Carícia Sombria",
        "description": "Você pode gastar 1 PM e uma ação padrão para cobrir sua mão com energia negativa e tocar uma criatura em alcance corpo a corpo. A criatura sofre 2d6 pontos de dano de trevas (Fortitude CD Sab reduz à metade) e você recupera PV iguais à metade do dano causado. Você pode aprender Toque Vampírico como uma magia divina. Se fizer isso, o custo dela diminui em –1 PM."
      },
      {
        "id": "manto_da_penumbra",
        "name": "Manto da Penumbra",
        "description": "Você aprende e pode lançar Escuridão. Caso aprenda novamente essa magia, seu custo diminui em –1 PM."
      },
      {
        "id": "visao_nas_trevas",
        "name": "Visão nas Trevas",
        "description": "Você enxerga perfeitamente no escuro, incluindo em magias de escuridão."
      },
      {
        "id": "zumbificar",
        "name": "Zumbificar",
        "description": "Você pode gastar uma ação completa e 3 PM para reanimar o cadáver de uma criatura Pequena ou Média adjacente por um dia. O cadáver funciona como um parceiro iniciante de um tipo a sua escolha entre combatente, fortão ou guardião. Além disso, quando sofre dano, você pode sacrificar esse parceiro; se fizer isso, você sofre apenas metade do dano, mas o cadáver é destruído."
      }
    ],
    "obligations": "Tenebra proíbe que seus devotos sejam tocados por Azgher, o odiado rival. O devoto deve se cobrir inteiramente durante o dia, sem expor ao sol nenhum pedaço de pele."
  },
  {
    "id": "thwor",
    "name": "Thwor",
    "title": "O Deus dos Goblinoides",
    "description": "Khoshkothruk ascendeu ao Panteão como o Deus dos Goblinoides. Agora protegidos e governados por uma poderosa divindade, os povos duyshidakk erguem sua própria civilização no continente de Lamnor, e o Reinado de Arton deverá lidar com o futuro que surgir disso.",
    "beliefs": "Reverenciar a lealdade, a força e a coragem. Promover a união entre goblins, hobgoblins, bugbears, orcs, ogros e outros povos humanoides. Reverenciar o caos, a mutação, a vida sempre em movimento. Proteger a cultura e o modo de vida goblinoide. Destruir os elfos",
    "symbol": "Um grande punho fechado",
    "energyChannel": "Qualquer",
    "favoredWeapon": "Machado de guerra",
    "allowedDevoteesText": "Qualquer duyshidakk (veja abaixo)",
    "allowedRaces": [],
    "allowedClasses": [],
    "grantedPowers": [
      {
        "id": "almejar_o_impossivel",
        "name": "Almejar o Impossível",
        "description": "Quando faz um teste de perícia, um resultado de 19 ou mais no dado sempre é um sucesso, não importando o valor a ser alcançado."
      },
      {
        "id": "furia_divina",
        "name": "Fúria Divina",
        "description": "Você pode gastar 2 PM para invocar uma fúria selvagem, tornando-se temível em combate. Até o fim da cena, você recebe +2 em testes de ataque e rolagens de dano corpo a corpo, mas não pode executar nenhuma ação que exija paciência ou concentração (como usar a perícia Furtividade ou lançar magias). Se usar este poder em conjunto com a habilidade Fúria, ela também dura uma cena (e não termina se você não atacar ou for alvo de uma ação hostil)."
      },
      {
        "id": "olhar_amedrontador",
        "name": "Olhar Amedrontador",
        "description": "Você aprende e pode lançar Amedrontar. Caso aprenda novamente essa magia, seu custo diminui em –1 PM."
      },
      {
        "id": "tropas_duyshidakk",
        "name": "Tropas Duyshidakk",
        "description": "Você pode gastar uma ação completa e 2 PM para invocar 1d4+1 goblinoides capangas em espaços desocupados em alcance curto. Você pode gastar uma ação de movimento para fazer os goblinoides andarem (eles têm deslocamento 9m) ou uma ação padrão para fazê-los causar dano a criaturas adjacentes (1d6+1 pontos de dano de corte cada). Os goblinoides têm For 1, Des 1, Defesa 15, 1 PV e falham automaticamente em qualquer teste de resistência ou oposto. Eles desaparecem quando morrem ou no fim da cena. Os goblinoides não agem sem receber uma ordem. Usos criativos para capangas fora de combate ficam a critério do mestre."
      }
    ],
    "obligations": "Não importando sua raça, o devoto de Thwor deve ser duyshidakk — ou seja, aceito como membro do povo goblinoide. Também deve se esforçar para que o “Mundo Como Deve Ser” tome o continente (veja a página 386). Deve sempre procurar fazer alianças com goblinoides e só lutar contra eles em último caso."
  },
  {
    "id": "thyatis",
    "name": "Thyatis",
    "title": "O Deus da Ressurreição e Profecia",
    "description": "O generoso Deus da Ressurreição e Profecia representa o perdão, a tolerância, as segundas chances. Seu dom maior é a prevenção ou correção dos erros — através de predições que evitam esses erros ou reversão das mortes que tenham causado. Para Thyatis, ninguém deve ser castigado por errar e todos merecem a chance de aprender com suas falhas, em vez de morrer por elas. Dizem que seus clérigos são contemplados com poderosos dons de profecia e ressurreição, e seus paladinos nunca morrem!",
    "beliefs": "Proteger a vida e aqueles necessitados de novas chances. Renegar a morte e a mentira. Ajudar os perdidos a encontrar seus caminhos e alcançar seus destinos. Oferecer clemência, perdão e redenção",
    "symbol": "Uma ave fênix",
    "energyChannel": "Positiva",
    "favoredWeapon": "Espada longa",
    "allowedDevoteesText": "Aggelus, cavaleiros, guerreiros, inventores, lutadores, paladinos",
    "allowedRaces": [
      "suraggel"
    ],
    "allowedClasses": [
      "cavaleiro",
      "guerreiro",
      "inventor",
      "lutador",
      "paladino"
    ],
    "grantedPowers": [
      {
        "id": "ataque_piedoso",
        "name": "Ataque Piedoso",
        "description": "Você pode usar armas corpo a corpo para causar dano não letal sem sofrer a penalidade de –5 no teste de ataque."
      },
      {
        "id": "dom_da_imortalidade",
        "name": "Dom da Imortalidade",
        "description": "Você é imortal. Sempre que morre, não importando o motivo, volta à vida após 3d6 dias. Apenas paladinos podem escolher este poder. Um personagem pode ter Dom da Imortalidade ou Dom da Ressurreição, mas não ambos."
      },
      {
        "id": "dom_da_profecia",
        "name": "Dom da Profecia",
        "description": "Você pode lançar Augúrio. Caso aprenda novamente essa magia, seu custo diminui em –1 PM. Você também pode gastar 2 PM para receber +2 em um teste."
      },
      {
        "id": "dom_da_ressurreicao",
        "name": "Dom da Ressurreição",
        "description": "Você pode gastar uma ação completa e todos os PM que possui (mínimo 1 PM) para tocar o corpo de uma criatura morta há menos de um ano e ressuscitá-la. A criatura volta à vida com 1 PV e 0 PM, e perde 1 ponto de Constituição permanentemente. Este poder só pode ser usado uma vez em cada criatura. Apenas clérigos podem escolher este poder. Um personagem pode ter Dom da Imortalidade ou Dom da Ressurreição, mas não ambos."
      }
    ],
    "obligations": "Devotos de Thyatis são proibidos de matar criaturas inteligentes (Int –3 ou maior). Podem atacar e causar dano, mas jamais levar à morte. Por esse motivo, devotos de Thyatis preferem armas e ataques que apenas incapacitam seus oponentes ou causam dano não letal."
  },
  {
    "id": "valkaria",
    "name": "Valkaria",
    "title": "A Deusa da Ambição",
    "description": "A Deusa da Ambição sempre foi a mais ousada entre os seus. Ajudaria a criar os lefeu, a própria Tormenta. Criaria os seres humanos, povo mais impetuoso e beligerante de todos. Acabaria condenada ao cativeiro, até ser resgatada por seus próprios protegidos, elevando ainda mais sua glória (ou teria assim planejado desde o início?). Mas, quando Mestre Arsenal derrotou Keenn para tomar seu lugar como Deus da Guerra, o maior objetivo de Valkaria foi enfim alcançado: um humano superou um deus. Esse evento, e também a morte do antigo líder Tauron, levou os deuses a reconhecerem Valkaria como a nova liderança do Panteão.",
    "beliefs": "Praticar o otimismo, a evolução, a rebeldia. Desafiar limites, almejar o impossível. Combater o mal, a opressão e a tirania. Proteger a liberdade. Aceitar o novo e diferente e adaptar-se a ele. Demonstrar ambição, paixão e coragem. Desfrutar e amar a vida",
    "symbol": "A Estátua de Valkaria ou seis faixas entrelaçadas",
    "energyChannel": "Positiva",
    "favoredWeapon": "Mangual",
    "allowedDevoteesText": "Aventureiros; membros de todas as classes podem ser devotos de Valkaria",
    "allowedRaces": [],
    "allowedClasses": [],
    "grantedPowers": [
      {
        "id": "almejar_o_impossivel",
        "name": "Almejar o Impossível",
        "description": "Quando faz um teste de perícia, um resultado de 19 ou mais no dado sempre é um sucesso, não importando o valor a ser alcançado."
      },
      {
        "id": "armas_da_ambicao",
        "name": "Armas da Ambição",
        "description": "Você recebe +1 em testes de ataque e na margem de ameaça com armas nas quais é proficiente."
      },
      {
        "id": "coragem_total",
        "name": "Coragem Total",
        "description": "Você é imune a efeitos de medo, mágicos ou não. Este poder não elimina fobias raciais (como o medo de altura dos minotauros)."
      },
      {
        "id": "liberdade_divina",
        "name": "Liberdade Divina",
        "description": "Você pode gastar 2 PM para receber imunidade a efeitos de movimento por uma rodada."
      }
    ],
    "obligations": "Valkaria odeia o conformismo. Seus devotos são proibidos de fixar moradia em um mesmo lugar, não podendo permanecer mais de 2d10+10 dias na mesma cidade (ou vila, aldeia, povoado...) ou 1d4+2 meses no mesmo reino. Devotos de Valkaria também são proibidos de se casar ou formar qualquer união estável."
  },
  {
    "id": "wynna",
    "name": "Wynna",
    "title": "A Deusa da Magia",
    "description": "Depois de abandonados por Glórienn, a antiga Deusa dos Elfos, muitos membros desta raça estão oferecendo sua devoção à bondosa Wynna. Ela é a exuberante Deusa da Magia, louvada por fadas, qareen, gênios e todos aqueles que empregam poder arcano. Generosa e liberal além dos limites, Wynna concede mágica a todos que pedem, não importando se usada para o bem ou para o mal — pois a magia é mais importante que a vida e nunca deve ser negada a ninguém. Talvez por esse motivo Arton seja um mundo tão intenso em energias mágicas e tão povoado por arcanistas.",
    "beliefs": "Reverenciar a magia arcana e seus praticantes. Promover o ensino da magia. Usar a magia para proteger os necessitados e trazer felicidade ao mundo",
    "symbol": "Um anel metálico",
    "energyChannel": "Qualquer",
    "favoredWeapon": "Adaga",
    "allowedDevoteesText": "Elfos, golens, qareen, sílfides, arcanistas, bardos",
    "allowedRaces": [
      "elfo",
      "golem",
      "qareen",
      "silfide"
    ],
    "allowedClasses": [
      "arcanista",
      "bardo"
    ],
    "grantedPowers": [
      {
        "id": "bencao_do_mana",
        "name": "Bênção do Mana",
        "description": "Você recebe +1 PM a cada nível ímpar."
      },
      {
        "id": "centelha_magica",
        "name": "Centelha Mágica",
        "description": "Escolha uma magia arcana ou divina de 1º círculo. Você aprende e pode lançar essa magia."
      },
      {
        "id": "escudo_magico",
        "name": "Escudo Mágico",
        "description": "Quando lança uma magia, você recebe um bônus na Defesa igual ao círculo da magia lançada até o início do seu próximo turno."
      },
      {
        "id": "teurgista_mistico",
        "name": "Teurgista Místico",
        "description": "Até uma magia de cada círculo que você aprender poderá ser escolhida entre magias divinas (se você for um conjurador arcano) ou entre magias arcanas (se for um conjurador divino)."
      }
    ],
    "obligations": "Assim como a magia jamais deva ser negada para quem a busca, devotos de Wynna devem praticar a bondade e a generosidade de sua deusa, jamais recusando um pedido de ajuda de alguém inocente. Além disso, devotos de Wynna são proibidos de matar seres mágicos (elfos, qareen, sílfides e outros a critério do mestre) e conjuradores arcanos."
  }
];
