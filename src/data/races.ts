import { Race } from '../types/rules';

/**
 * Raças — T20 JdA v1.3, Capítulo 1, págs. 18–31 (Tabela 1-2 e descrições).
 * Os textos das habilidades são literais do livro. Efeitos numéricos passivos são aplicados
 * pelo motor de regras (src/utils/passiveEffects.ts), que cita a mesma página.
 */
export const RACES_LIST: Race[] = [
  {
    id: 'humano',
    name: 'Humano',
    description:
      'O povo mais numeroso em Arton, humanos são considerados os escolhidos dos deuses, aqueles que governam o mundo. Em sua variedade e adaptabilidade, são encontrados em quase todos os pontos do continente — dos vales férteis do Reinado às vastidões áridas do Deserto da Perdição. São exploradores e desbravadores ambiciosos, sempre buscando algo além.',
    category: 'padrao',
    size: 'Médio',
    speed: 9,
    attributeModifiers: {},
    isSelectableAttributes: true,
    selectableAttributesCount: 3,
    selectableAttributesBonus: 1,
    abilities: [
      {
        id: 'humano_versatil',
        name: 'Versátil',
        type: 'passiva',
        description:
          'Você se torna treinado em duas perícias a sua escolha (não precisam ser da sua classe). Você pode trocar uma dessas perícias por um poder geral a sua escolha.',
      },
    ],
    customSelections: {
      requiresSkillChoice: true,
      skillChoiceCount: 2,
      allowsGeneralPowerChoice: true,
    },
  },
  {
    id: 'anao',
    name: 'Anão',
    description:
      'Anões são o mais resiliente dos povos. Em suas cidadelas subterrâneas, trabalham duro escavando minas e forjando metal em belas armas, armaduras e joias. São honestos e determinados, honrando a família e a tradição. Apesar de sua profunda paixão por forja e cerveja, pouca coisa é mais preciosa para um anão que cultivar uma barba longa e orgulhosa.',
    category: 'padrao',
    size: 'Médio',
    speed: 6,
    attributeModifiers: { con: 2, sab: 1, des: -1 },
    abilities: [
      {
        id: 'anao_conhecimento_rochas',
        name: 'Conhecimento das Rochas',
        type: 'passiva',
        description: 'Você recebe visão no escuro e +2 em testes de Percepção e Sobrevivência realizados no subterrâneo.',
      },
      {
        id: 'anao_devagar_sempre',
        name: 'Devagar e Sempre',
        type: 'passiva',
        description: 'Seu deslocamento é 6m (em vez de 9m). Porém, seu deslocamento não é reduzido por uso de armadura ou excesso de carga.',
      },
      {
        id: 'anao_duro_como_pedra',
        name: 'Duro como Pedra',
        type: 'passiva',
        description: 'Você recebe +3 pontos de vida no 1º nível e +1 por nível seguinte.',
      },
      {
        id: 'anao_tradicao_heredrimm',
        name: 'Tradição de Heredrimm',
        type: 'passiva',
        description:
          'Você é perito nas armas tradicionais anãs, seja por ter treinado com elas, seja por usá-las como ferramentas de ofício. Para você, todos os machados, martelos, marretas e picaretas são armas simples. Você recebe +2 em ataques com essas armas.',
      },
    ],
  },
  {
    id: 'dahllan',
    name: 'Dahllan',
    description:
      'Parte humanas, parte fadas, as dahllan são uma raça de mulheres com a seiva de árvores correndo nas veias. Falam com os animais, controlam as plantas — mas também são ferozes em batalha, retorcendo madeira para formar armaduras.',
    category: 'padrao',
    size: 'Médio',
    speed: 9,
    attributeModifiers: { sab: 2, des: 1, int: -1 },
    abilities: [
      {
        id: 'dahllan_amiga_plantas',
        name: 'Amiga das Plantas',
        type: 'ativa',
        description: 'Você pode lançar a magia Controlar Plantas (atributo-chave Sabedoria). Caso aprenda novamente essa magia, seu custo diminui em –1 PM.',
        grantedSpells: { spellIds: ['controlar_plantas'], keyAttribute: 'sab' },
      },
      {
        id: 'dahllan_armadura_allihanna',
        name: 'Armadura de Allihanna',
        type: 'ativa',
        cost: '1 PM',
        description: 'Você pode gastar uma ação de movimento e 1 PM para transformar sua pele em casca de árvore, recebendo +2 na Defesa até o fim da cena.',
      },
      {
        id: 'dahllan_empatia_selvagem',
        name: 'Empatia Selvagem',
        type: 'passiva',
        description:
          'Você pode se comunicar com animais por meio de linguagem corporal e vocalizações. Você pode usar Adestramento para mudar atitude e persuasão com animais (veja Diplomacia, na página 118). Caso receba esta habilidade novamente, recebe +2 em Adestramento.',
      },
    ],
  },
  {
    id: 'elfo',
    name: 'Elfo',
    description:
      'Elfos são seres feitos para a beleza e para a guerra, tão habilidosos com magia quanto com espadas e arcos. Elegantes, astutos, de vidas quase eternas, parecem superiores aos humanos em tudo. Poderiam ter governado toda Arton, não fosse a arrogância herdada de sua deusa.',
    category: 'padrao',
    size: 'Médio',
    speed: 12,
    attributeModifiers: { int: 2, des: 1, con: -1 },
    abilities: [
      { id: 'elfo_graca_glorienn', name: 'Graça de Glórienn', type: 'passiva', description: 'Seu deslocamento é 12m (em vez de 9m).' },
      { id: 'elfo_sangue_magico', name: 'Sangue Mágico', type: 'passiva', description: 'Você recebe +1 ponto de mana por nível.' },
      { id: 'elfo_sentidos_elficos', name: 'Sentidos Élficos', type: 'passiva', description: 'Você recebe visão na penumbra e +2 em Misticismo e Percepção.' },
    ],
  },
  {
    id: 'goblin',
    name: 'Goblin',
    description:
      'Estes pequenos seres feiosos conseguiram um lugar entre os povos do Reinado. Podem ser encontrados em todas as grandes cidades, muitos vivendo na imundície, outros prosperando em carreiras que quase ninguém tentaria: espiões, aeronautas, engenhoqueiros. Onde o anão teimoso e o elfo empolado falham, o goblin pode dar um jeito.',
    category: 'padrao',
    size: 'Pequeno',
    speed: 9,
    attributeModifiers: { des: 2, int: 1, car: -1 },
    abilities: [
      {
        id: 'goblin_engenhoso',
        name: 'Engenhoso',
        type: 'passiva',
        description: 'Você não sofre penalidades em testes de perícia por não usar ferramentas. Se usar a ferramenta necessária, recebe +2 no teste de perícia.',
      },
      { id: 'goblin_espelunqueiro', name: 'Espelunqueiro', type: 'passiva', description: 'Você recebe visão no escuro e deslocamento de escalada igual ao seu deslocamento terrestre.' },
      {
        id: 'goblin_peste_esguia',
        name: 'Peste Esguia',
        type: 'passiva',
        description: 'Seu tamanho é Pequeno (veja a página 106), mas seu deslocamento se mantém 9m. Apesar de pequenos, goblins são rápidos.',
      },
      { id: 'goblin_rato_ruas', name: 'Rato das Ruas', type: 'passiva', description: 'Você recebe +2 em Fortitude e sua recuperação de PV e PM nunca é inferior ao seu nível.' },
    ],
  },
  {
    id: 'lefou',
    name: 'Lefou',
    description:
      'Com a influência macabra da Tormenta permeando cada vez mais o mundo, surgiram os lefou. Estes meios-demônios de aparência grotesca passaram a nascer em famílias de outras raças, sendo logo sacrificados ou expulsos. Entre os que escapam, por sua facilidade em manifestar poderes aberrantes, muitos escolhem abraçar o mal, enquanto outros decidem combatê-lo.',
    category: 'padrao',
    size: 'Médio',
    speed: 9,
    attributeModifiers: { car: -1 },
    isSelectableAttributes: true,
    selectableAttributesCount: 3,
    selectableAttributesBonus: 1,
    selectableAttributesExclude: ['car'],
    creatureType: 'monstro',
    abilities: [
      {
        id: 'lefou_cria_tormenta',
        name: 'Cria da Tormenta',
        type: 'passiva',
        description: 'Você é uma criatura do tipo monstro e recebe +5 em testes de resistência contra efeitos causados por lefeu e pela Tormenta.',
      },
      {
        id: 'lefou_deformidade',
        name: 'Deformidade',
        type: 'passiva',
        description:
          'Todo lefou possui defeitos físicos que, embora desagradáveis, conferem certas vantagens. Você recebe +2 em duas perícias a sua escolha. Cada um desses bônus conta como um poder da Tormenta (exceto para perda de Carisma). Você pode trocar um desses bônus por um poder da Tormenta a sua escolha (ele também não conta para perda de Carisma).',
      },
    ],
    customSelections: {
      requiresSkillChoice: true,
      skillChoiceCount: 2,
      allowsGeneralPowerChoice: true,
    },
  },
  {
    id: 'minotauro',
    name: 'Minotauro',
    description:
      'Povo guerreiro, orgulhoso e poderoso, criadores de uma civilização avançada, com a missão sagrada de proteger e governar os fracos — ou assim se enxergavam. Em seus tempos áureos, tomaram grande parte de Arton. Hoje, após a morte de sua divindade e a decadência de seu Império, os minotauros lutam para recuperar a glória perdida ou encontrar um novo papel no mundo.',
    category: 'padrao',
    size: 'Médio',
    speed: 9,
    attributeModifiers: { for: 2, con: 1, sab: -1 },
    abilities: [
      {
        id: 'minotauro_chifres',
        name: 'Chifres',
        type: 'ativa',
        cost: '1 PM',
        description:
          'Você possui uma arma natural de chifres (dano 1d6, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com os chifres.',
      },
      { id: 'minotauro_couro_rigido', name: 'Couro Rígido', type: 'passiva', description: 'Sua pele é dura como a de um touro. Você recebe +1 na Defesa.' },
      {
        id: 'minotauro_faro',
        name: 'Faro',
        type: 'passiva',
        description:
          'Você tem olfato apurado. Contra inimigos em alcance curto que não possa perceber, você não fica desprevenido e camuflagem total lhe causa apenas 20% de chance de falha.',
      },
      {
        id: 'minotauro_medo_altura',
        name: 'Medo de Altura',
        type: 'passiva',
        description: 'Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), você fica abalado.',
      },
    ],
  },
  {
    id: 'qareen',
    name: 'Qareen',
    description:
      'Descendentes de poderosos gênios, os qareen são otimistas, generosos e prestativos, sempre ansiosos por ajudar. Consideram-se abençoados pela Deusa da Magia, exibindo como evidência a marca de Wynna em seus corpos. Sua magia é mais poderosa quando usada para realizar desejos de outros.',
    category: 'padrao',
    size: 'Médio',
    speed: 9,
    attributeModifiers: { car: 2, int: 1, sab: -1 },
    abilities: [
      {
        id: 'qareen_desejos',
        name: 'Desejos',
        type: 'passiva',
        description: 'Se lançar uma magia que alguém tenha pedido desde seu último turno, o custo da magia diminui em –1 PM. Fazer um desejo ao qareen é uma ação livre.',
      },
      {
        id: 'qareen_resistencia_elemental',
        name: 'Resistência Elemental',
        type: 'passiva',
        description:
          'Conforme sua ascendência, você recebe redução 10 a um tipo de dano. Escolha uma: frio (qareen da água), eletricidade (do ar), fogo (do fogo), ácido (da terra), luz (da luz) ou trevas (qareen das trevas).',
        choice: {
          key: 'qareen_resistencia_elemental',
          label: 'Ascendência (redução 10)',
          kind: 'option',
          count: 1,
          options: ['Frio (água)', 'Eletricidade (ar)', 'Fogo (fogo)', 'Ácido (terra)', 'Luz (luz)', 'Trevas (trevas)'],
        },
      },
      {
        id: 'qareen_tatuagem_mistica',
        name: 'Tatuagem Mística',
        type: 'ativa',
        description: 'Você pode lançar uma magia de 1º círculo a sua escolha (atributo-chave Carisma). Caso aprenda novamente essa magia, seu custo diminui em –1 PM.',
        choice: { key: 'qareen_tatuagem_mistica', label: 'Magia de 1º círculo', kind: 'spell', count: 1, spellCircle: 1 },
      },
    ],
  },
  {
    id: 'golem',
    name: 'Golem',
    description:
      'Diz-se que estes seres são apenas construtos sem vida, criados não pelos deuses, mas por mortais. No entanto, são movidos por forças vivas — espíritos elementais selvagens, capturados e lacrados por meios mágicos em corpos de pedra e metal. Muitos conformam-se com seus papéis como trabalhadores e soldados, enquanto outros demonstram alta inteligência, personalidade e iniciativa.',
    category: 'rara',
    size: 'Médio',
    speed: 6,
    attributeModifiers: { for: 2, con: 1, car: -1 },
    creatureType: 'construto',
    noOrigin: true,
    abilities: [
      {
        id: 'golem_chassi',
        name: 'Chassi',
        type: 'passiva',
        description:
          'Seu corpo artificial é resistente, mas rígido. Seu deslocamento é 6m, mas não é reduzido por uso de armadura ou excesso de carga. Você recebe +2 na Defesa, mas possui penalidade de armadura –2. Você leva um dia para vestir ou remover uma armadura (pois precisa acoplar as peças dela a seu chassi). Por ser acoplada, sua armadura não conta no limite de itens que você pode usar (mas você continua só podendo usar uma armadura).',
      },
      {
        id: 'golem_criatura_artificial',
        name: 'Criatura Artificial',
        type: 'passiva',
        description:
          'Você é uma criatura do tipo construto. Recebe visão no escuro e imunidade a efeitos de cansaço, metabólicos e de veneno. Além disso, não precisa respirar, alimentar-se ou dormir, mas não se beneficia de cura mundana e de itens da categoria alimentação. Você precisa ficar inerte por oito horas por dia para recarregar sua fonte de energia. Se fizer isso, recupera PV e PM por descanso em condições normais (golens não são afetados por condições boas ou ruins de descanso). Por fim, a perícia Cura não funciona em você, mas Ofício (artesão) pode ser usada no lugar dela.',
      },
      {
        id: 'golem_fonte_elemental',
        name: 'Fonte Elemental',
        type: 'passiva',
        description:
          'Você possui um espírito elemental preso em seu corpo. Escolha entre água (frio), ar (eletricidade), fogo (fogo) e terra (ácido). Você é imune a dano desse tipo. Se fosse sofrer dano mágico desse tipo, em vez disso cura PV em quantidade igual à metade do dano. Por exemplo, se um golem com espírito elemental do fogo é atingido por uma Bola de Fogo que causa 30 pontos de dano, em vez de sofrer esse dano, ele recupera 15 PV.',
        choice: {
          key: 'golem_fonte_elemental',
          label: 'Espírito elemental',
          kind: 'option',
          count: 1,
          options: ['Água (frio)', 'Ar (eletricidade)', 'Fogo (fogo)', 'Terra (ácido)'],
        },
      },
      {
        id: 'golem_proposito_criacao',
        name: 'Propósito de Criação',
        type: 'passiva',
        description: 'Você foi construído “pronto” para um propósito específico e não teve uma infância. Você não tem direito a escolher uma origem, mas recebe um poder geral a sua escolha.',
      },
    ],
    customSelections: {
      allowsGeneralPowerChoice: true,
    },
  },
  {
    id: 'hynne',
    name: 'Hynne',
    description:
      'Também conhecidos como halflings ou “pequeninos”, os hynne são apreciadores de boa comida e casas aconchegantes, raras vezes escolhendo sair pelo mundo em aventuras perigosas. Quando decidem fazê-lo, contudo, recorrem à agilidade e encanto naturais para ludibriar os inimigos.',
    category: 'rara',
    size: 'Pequeno',
    speed: 6,
    attributeModifiers: { des: 2, car: 1, for: -1 },
    abilities: [
      {
        id: 'hynne_arremessador',
        name: 'Arremessador',
        type: 'passiva',
        description: 'Quando faz um ataque à distância com uma funda ou uma arma de arremesso, seu dano aumenta em um passo.',
      },
      {
        id: 'hynne_pequeno_rechonchudo',
        name: 'Pequeno e Rechonchudo',
        type: 'passiva',
        description:
          'Seu tamanho é Pequeno (veja a página 106) e seu deslocamento é 6m. Você recebe +2 em Enganação e pode usar Destreza como atributo-chave de Atletismo (em vez de Força).',
      },
      {
        id: 'hynne_sorte_salvadora',
        name: 'Sorte Salvadora',
        type: 'ativa',
        cost: '1 PM',
        description: 'Quando faz um teste de resistência, você pode gastar 1 PM para rolar este teste novamente.',
      },
    ],
  },
  {
    id: 'kliren',
    name: 'Kliren',
    description:
      'Estes visitantes de outro mundo seriam uma combinação entre humanos e gnomos. Os kliren somam a alta inteligência gnômica e a curiosidade humana, resultando em seres de extrema engenhosidade, criatividade e talento com aparatos mecânicos. Seriam capazes de grandes feitos, talvez até dominar Arton, não fossem a impulsividade e imprudência que por vezes abreviam suas vidas...',
    category: 'rara',
    size: 'Médio',
    speed: 9,
    attributeModifiers: { int: 2, car: 1, for: -1 },
    abilities: [
      {
        id: 'kliren_hibrido',
        name: 'Híbrido',
        type: 'passiva',
        description:
          'Sua natureza multifacetada fez com que você aprendesse conhecimentos variados. Você se torna treinado em uma perícia a sua escolha (não precisa ser da sua classe).',
        choice: { key: 'kliren_hibrido', label: 'Perícia treinada', kind: 'skill', count: 1 },
      },
      {
        id: 'kliren_engenhosidade',
        name: 'Engenhosidade',
        type: 'ativa',
        cost: '2 PM',
        description:
          'Quando faz um teste de perícia, você pode gastar 2 PM para somar sua Inteligência no teste. Você não pode usar esta habilidade em testes de ataque. Caso receba esta habilidade novamente, seu custo é reduzido em –1 PM.',
      },
      {
        id: 'kliren_ossos_frageis',
        name: 'Ossos Frágeis',
        type: 'passiva',
        description:
          'Você sofre 1 ponto de dano adicional por dado de dano de impacto. Por exemplo, se for atingido por uma clava (dano 1d6), sofre 1d6+1 pontos de dano. Se cair de 3m de altura (dano 2d6), sofre 2d6+2 pontos de dano.',
      },
      {
        id: 'kliren_vanguardista',
        name: 'Vanguardista',
        type: 'passiva',
        description: 'Você recebe proficiência em armas de fogo e +2 em Ofício (um qualquer, a sua escolha).',
      },
    ],
  },
  {
    id: 'medusa',
    name: 'Medusa',
    description:
      'Ainda que estas criaturas reclusas sejam famosas por transformar suas vítimas em pedra com um simples olhar, apenas as mais antigas e poderosas o fazem. Jovens medusas por vezes rejeitam a solidão e crueldade racial, aventurando-se no Reinado, até mesmo fazendo amigos ou integrando equipes de heróis.',
    category: 'rara',
    size: 'Médio',
    speed: 9,
    attributeModifiers: { des: 2, car: 1 },
    creatureType: 'monstro',
    abilities: [
      { id: 'medusa_cria_megalokk', name: 'Cria de Megalokk', type: 'passiva', description: 'Você é uma criatura do tipo monstro e recebe visão no escuro.' },
      {
        id: 'medusa_natureza_venenosa',
        name: 'Natureza Venenosa',
        type: 'ativa',
        cost: '1 PM',
        description:
          'Você recebe resistência a veneno +5 e pode gastar uma ação de movimento e 1 PM para envenenar uma arma que esteja usando. A arma causa perda de 1d12 pontos de vida. O veneno dura até você acertar um ataque ou até o fim da cena (o que acontecer primeiro). Veneno.',
      },
      {
        id: 'medusa_olhar_atordoante',
        name: 'Olhar Atordoante',
        type: 'ativa',
        cost: '1 PM',
        description:
          'Você pode gastar uma ação de movimento e 1 PM para forçar uma criatura em alcance curto a fazer um teste de Fortitude (CD Car). Se a criatura falhar, fica atordoada por uma rodada (apenas uma vez por cena).',
      },
    ],
  },
  {
    id: 'osteon',
    name: 'Osteon',
    description:
      'Esqueletos sempre foram temidos como monstros profanos, movidos por puro rancor pelos vivos. Isso mudou; conhecidos como osteon, estes esqueletos demonstram a inteligência e a consciência das raças vivas, sendo capazes de adotar quaisquer de suas profissões e devoções.',
    category: 'rara',
    size: 'Médio',
    speed: 9,
    attributeModifiers: { con: -1 },
    isSelectableAttributes: true,
    selectableAttributesCount: 3,
    selectableAttributesBonus: 1,
    selectableAttributesExclude: ['con'],
    creatureType: 'morto-vivo',
    abilities: [
      { id: 'osteon_armadura_ossea', name: 'Armadura Óssea', type: 'passiva', description: 'Você recebe redução de corte, frio e perfuração 5.' },
      {
        id: 'osteon_memoria_postuma',
        name: 'Memória Póstuma',
        type: 'passiva',
        description:
          'Você se torna treinado em uma perícia (não precisa ser da sua classe) ou recebe um poder geral a sua escolha. Como alternativa, você pode ser um osteon de outra raça humanoide que não humano. Neste caso, você ganha uma habilidade dessa raça a sua escolha. Se a raça era de tamanho diferente de Médio, você também possui sua categoria de tamanho.',
      },
      {
        id: 'osteon_natureza_esqueletica',
        name: 'Natureza Esquelética',
        type: 'passiva',
        description:
          'Você é uma criatura do tipo morto-vivo. Recebe visão no escuro e imunidade a efeitos de cansaço, metabólicos, de trevas e de veneno. Além disso, não precisa respirar, alimentar-se ou dormir. Por fim, efeitos mágicos de cura de luz causam dano a você e você não se beneficia de itens da categoria alimentação, mas dano de trevas recupera seus PV.',
      },
      {
        id: 'osteon_preco_nao_vida',
        name: 'Preço da Não Vida',
        type: 'passiva',
        description:
          'Você precisa passar oito horas sob a luz de estrelas ou no subterrâneo. Se fizer isso, recupera PV e PM por descanso em condições normais (osteon não são afetados por condições boas ou ruins de descanso). Caso contrário, sofre os efeitos de fome.',
      },
    ],
    customSelections: {
      requiresSkillChoice: true,
      skillChoiceCount: 1,
      allowsGeneralPowerChoice: true,
    },
  },
  {
    id: 'sereia',
    name: 'Sereia/Tritão',
    description:
      'Sendo chamadas sereias quando femininas e tritões quando masculinos, os membros desta raça de torso humanoide e corpo de peixe podem adotar forma bípede para caminhar em terras emersas — algo que têm feito com cada vez mais frequência.',
    category: 'rara',
    size: 'Médio',
    speed: 9,
    attributeModifiers: {},
    isSelectableAttributes: true,
    selectableAttributesCount: 3,
    selectableAttributesBonus: 1,
    abilities: [
      {
        id: 'sereia_cancao_mares',
        name: 'Canção dos Mares',
        type: 'ativa',
        description:
          'Você pode lançar duas das magias a seguir: Amedrontar, Comando, Despedaçar, Enfeitiçar, Hipnotismo ou Sono (atributo-chave Carisma). Caso aprenda novamente uma dessas magias, seu custo diminui em –1 PM.',
        choice: {
          key: 'sereia_cancao_mares',
          label: 'Duas magias',
          kind: 'spell',
          count: 2,
          options: ['amedrontar', 'comando', 'despedacar', 'enfeiticar', 'hipnotismo', 'sono'],
        },
      },
      {
        id: 'sereia_mestre_tridente',
        name: 'Mestre do Tridente',
        type: 'passiva',
        description: 'Para você, o tridente é uma arma simples. Além disso, você recebe +2 em rolagens de dano com azagaias, lanças e tridentes.',
      },
      {
        id: 'sereia_transformacao_anfibia',
        name: 'Transformação Anfíbia',
        type: 'passiva',
        description:
          'Você pode respirar debaixo d’água e possui uma cauda que fornece deslocamento de natação 12m. Quando fora d’água, sua cauda desaparece e dá lugar a pernas (deslocamento 9m). Se permanecer mais de um dia sem contato com água, você não recupera PM com descanso até voltar para a água (ou, pelo menos, tomar um bom banho!).',
      },
    ],
  },
  {
    id: 'silfide',
    name: 'Sílfide',
    description:
      'As mais numerosas fadas em Arton são estas criaturinhas esvoaçantes, com suas delicadas asas de inseto e grandes olhos escuros. Curiosas e brincalhonas, parecem sempre à procura de alguma diversão, levando todos a subestimá-las quando o assunto exige seriedade.',
    category: 'rara',
    size: 'Minúsculo',
    speed: 9,
    attributeModifiers: { car: 2, des: 1, for: -2 },
    creatureType: 'espírito',
    abilities: [
      {
        id: 'silfide_asas_borboleta',
        name: 'Asas de Borboleta',
        type: 'passiva',
        description:
          'Seu tamanho é Minúsculo. Você pode pairar a 1,5m do chão com deslocamento 9m. Isso permite que você ignore terreno difícil e o torna imune a dano por queda (a menos que esteja inconsciente). Você pode gastar 1 PM por rodada para voar com deslocamento de 12m.',
      },
      {
        id: 'silfide_espirito_natureza',
        name: 'Espírito da Natureza',
        type: 'passiva',
        description: 'Você é uma criatura do tipo espírito, recebe visão na penumbra e pode falar com animais livremente.',
      },
      {
        id: 'silfide_magia_fadas',
        name: 'Magia das Fadas',
        type: 'ativa',
        description:
          'Você pode lançar duas das magias a seguir (atributo-chave Carisma): Criar Ilusão, Enfeitiçar, Luz (como uma magia arcana) e Sono. Caso aprenda novamente uma dessas magias, seu custo diminui em –1 PM.',
        choice: { key: 'silfide_magia_fadas', label: 'Duas magias', kind: 'spell', count: 2, options: ['criar_ilusao', 'enfeiticar', 'luz', 'sono'] },
      },
    ],
  },
  {
    id: 'suraggel',
    name: 'Suraggel',
    description:
      'Descendentes de extraplanares divinos, esta raça é formada por seres com traços angelicais ou demoníacos — ou ambos. Por serem ligados às forças opostas da luz e trevas, suraggel têm traços diferentes quando orientados para seu lado celestial, sendo então conhecidos como aggelus; ou para o lado abissal, assim sendo chamados sulfure.',
    category: 'rara',
    size: 'Médio',
    speed: 9,
    attributeModifiers: {},
    creatureType: 'espírito',
    abilities: [
      { id: 'suraggel_heranca_divina', name: 'Herança Divina', type: 'passiva', description: 'Você é uma criatura do tipo espírito e recebe visão no escuro.' },
    ],
    customSelections: {
      requiresSubrace: true,
      subraces: [
        {
          id: 'aggelus',
          name: 'Aggelus',
          description: 'Suraggel orientado para seu lado celestial.',
          attributeModifiers: { sab: 2, car: 1 },
          abilities: [
            {
              id: 'aggelus_luz_sagrada',
              name: 'Luz Sagrada',
              type: 'passiva',
              description:
                'Você recebe +2 em Diplomacia e Intuição. Além disso, pode lançar Luz (como uma magia divina; atributo-chave Carisma). Caso aprenda novamente essa magia, seu custo diminui em –1 PM.',
              grantedSpells: { spellIds: ['luz'], keyAttribute: 'car' },
            },
          ],
        },
        {
          id: 'sulfure',
          name: 'Sulfure',
          description: 'Suraggel orientado para seu lado abissal.',
          attributeModifiers: { des: 2, int: 1 },
          abilities: [
            {
              id: 'sulfure_sombras_profanas',
              name: 'Sombras Profanas',
              type: 'passiva',
              description:
                'Você recebe +2 em Enganação e Furtividade. Além disso, pode lançar Escuridão (como uma magia divina; atributo-chave Inteligência). Caso aprenda novamente essa magia, seu custo diminui em –1 PM.',
              grantedSpells: { spellIds: ['escuridao'], keyAttribute: 'int' },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'trog',
    name: 'Trog',
    description:
      'Trogloditas (ou “trogs”) são homens-lagarto primitivos e subterrâneos que odeiam todos os outros seres — especialmente os que sabem forjar aço, aquilo que mais cobiçam. Uns poucos, no entanto, divergem da crueldade e selvageria inerentes à raça. Abandonam a tribo ou são expulsos e acabam aceitos como colegas por aventureiros tão estranhos e deslocados quanto eles próprios.',
    category: 'rara',
    size: 'Médio',
    speed: 9,
    attributeModifiers: { con: 2, for: 1, int: -1 },
    creatureType: 'monstro',
    abilities: [
      {
        id: 'trog_mau_cheiro',
        name: 'Mau Cheiro',
        type: 'ativa',
        cost: '2 PM',
        description:
          'Você pode gastar uma ação padrão e 2 PM para expelir um gás fétido. Todas as criaturas (exceto trogs) em alcance curto devem passar em um teste de Fortitude contra veneno (CD Con) ou ficarão enjoadas durante 1d6 rodadas. Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia.',
      },
      {
        id: 'trog_mordida',
        name: 'Mordida',
        type: 'ativa',
        cost: '1 PM',
        description:
          'Você possui uma arma natural de mordida (dano 1d6, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida.',
      },
      {
        id: 'trog_reptiliano',
        name: 'Reptiliano',
        type: 'passiva',
        description: 'Você é uma criatura do tipo monstro e recebe visão no escuro, +1 na Defesa e, se estiver sem armadura ou roupas pesadas, +5 em Furtividade.',
      },
      { id: 'trog_sangue_frio', name: 'Sangue Frio', type: 'passiva', description: 'Você sofre 1 ponto de dano adicional por dado de dano de frio.' },
    ],
  },
];
