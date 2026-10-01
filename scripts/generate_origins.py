# -*- coding: utf-8 -*-
"""
Generates src/data/origins.ts from official Tormenta 20 JDA rules.
"""
import fitz
import json
import re

doc = fitz.open('Tormenta20-Edicao-Jogo-do-Ano-v1.3.pdf')

def clean(t):
    if not t:
        return ""
    t = t.replace('\xa0', ' ')
    t = re.sub(r'[\u2010\u2011\u2012\u2013\u2014]', '-', t)
    t = re.sub(r' +', ' ', t)
    return t.strip()

# Full 35 origins definitions with items, skills, and powers
origins_raw = [
    {
        "id": "acolito",
        "name": "Acólito",
        "description": "Você foi criado em um templo, mosteiro ou convento, instruído nas doutrinas e ritos de uma divindade desde jovem.",
        "items": ["Símbolo sagrado", "Traje de sacerdote"],
        "skills": ["cura", "religiao", "vontade"],
        "powers": [
            {"name": "Medicina", "type": "destino", "description": "Você pode gastar uma ação completa e fazer um teste de Cura (CD 15) para recuperar 1d6 PV de uma criatura (mais 1d6 para cada 5 pontos pelos quais o resultado do teste exceder a CD)."},
            {"name": "Membro da Igreja", "type": "origem", "description": "Você pode conseguir hospedagem e alimentação de graça para você e seus companheiros em qualquer templo de sua divindade."},
            {"name": "Vontade de Ferro", "type": "destino", "description": "Você recebe +1 ponto de mana para cada dois níveis de personagem e +2 em testes de Vontade."}
        ]
    },
    {
        "id": "amigo_dos_animais",
        "name": "Amigo dos Animais",
        "description": "Você cresceu cercado de animais no campo ou floresta e desenvolveu uma empatia genuína pelas criaturas da natureza.",
        "items": ["Cão de caça, cavalo, pônei ou trobo (escolha um)"],
        "skills": ["adestramento", "cavalgar"],
        "powers": [
            {"name": "Amigo Especial", "type": "origem", "description": "Você recebe +5 em testes de Adestramento com animais de sua espécie de companhia e seu animal parceiro ganha +2 em testes de perícia."}
        ]
    },
    {
        "id": "amnesico",
        "name": "Amnésico",
        "description": "Você não se lembra do seu passado, acordando com memórias fragmentadas e habilidades instintivas que você mal compreende.",
        "items": ["Um ou mais itens somando até T$ 500"],
        "skills": ["vontade"],
        "powers": [
            {"name": "Lembranças Graduais", "type": "origem", "description": "Durante suas aventuras, em momentos dramáticos a critério do mestre, você pode recordar uma técnica, perícia ou segredo de seu passado esquecido."}
        ]
    },
    {
        "id": "aristocrata",
        "name": "Aristocrata",
        "description": "Você nasceu em berço de ouro na nobreza ou alta aristocracia de Arton, acostumado ao luxo, etiqueta e intrigas da corte.",
        "items": ["Joia de família no valor de T$ 300", "Traje de gala"],
        "skills": ["diplomacia", "enganacao", "nobreza"],
        "powers": [
            {"name": "Comandar", "type": "destino", "description": "Você pode gastar uma ação de movimento e 1 PM para dar uma ordem a um aliado em alcance curto, concedendo-lhe +2 em sua próxima ação."},
            {"name": "Sangue Azul", "type": "origem", "description": "Você tem influência política e prestígio. Em comunidades com governo aristocrático, você recebe hospedagem de alto padrão gratuita e +2 em testes de Diplomacia e Nobreza."}
        ]
    },
    {
        "id": "artesao",
        "name": "Artesão",
        "description": "Você aprendeu a trabalhar com ferramentas manuais, forjando armas, moldando madeira, tecendo tecidos ou soprando vidro.",
        "items": ["Instrumentos de ofício (qualquer)", "Um item que você mesmo fabricou"],
        "skills": ["oficio", "vontade"],
        "powers": [
            {"name": "Frutos do Trabalho", "type": "origem", "description": "No início de cada aventura, você recebe até 5 itens gerais que você mesmo fabricou sem pagar custo de matéria-prima, somando até T$ 100."},
            {"name": "Sortudo", "type": "destino", "description": "Você pode gastar 3 PM para rolar novamente um teste recém-realizado (apenas uma vez por teste)."}
        ]
    },
    {
        "id": "artista",
        "name": "Artista",
        "description": "Você viajou pelas cidades cantando, atuando em peças, dançando ou pintando obras que encantam os corações do público.",
        "items": ["Estojo de disfarces ou instrumento musical à escolha"],
        "skills": ["atuacao", "enganacao"],
        "powers": [
            {"name": "Atraente", "type": "destino", "description": "Você recebe +2 em testes de perícias baseadas em Carisma contra criaturas que possam se sentir atraídas por você."},
            {"name": "Dom Artístico", "type": "origem", "description": "Você recebe +2 em testes de Atuação e recebe o dobro de tibares ao se apresentar publicamente."},
            {"name": "Sortudo", "type": "destino", "description": "Você pode gastar 3 PM para rolar novamente um teste recém-realizado."},
            {"name": "Torcida", "type": "combate", "description": "Você recebe +2 em testes de ataque e Defesa quando houver pelo menos um aliado torcendo por você em combate."}
        ]
    },
    {
        "id": "assistente_laboratorio",
        "name": "Assistente de Laboratório",
        "description": "Você trabalhou como aprendiz ou serviçal de um mago, alquimista ou inventor brilhante e perigoso.",
        "items": ["Instrumentos de ofício (alquimista)"],
        "skills": ["oficio", "misticismo"],
        "powers": [
            {"name": "Esse Cheiro...", "type": "origem", "description": "Você recebe +2 em testes de resistência contra venenos e gases tóxicos e pode identificar substâncias pelo cheiro."},
            {"name": "Venefício", "type": "destino", "description": "Você não corre risco de se envenenar acidentalmente ao aplicar veneno em armas e a CD para resistir aos seus venenos aumenta em +2."},
            {"name": "Poder da Tormenta", "type": "tormenta", "description": "Você pode escolher um poder da Tormenta à sua escolha como resultado de experimentos proibidos com matéria rubra."}
        ]
    },
    {
        "id": "batedor",
        "name": "Batedor",
        "description": "Você marchou na vanguarda de expedições e patrulhas, reconhecendo terrenos desconhecidos e evitando armadilhas para seus aliados.",
        "items": ["Barraca", "Equipamento de viagem"],
        "skills": ["furtividade", "percepcao", "sobrevivencia"],
        "powers": [
            {"name": "À Prova de Tudo", "type": "origem", "description": "Você não sofre penalidade em deslocamento por terreno difícil natural."},
            {"name": "Estilo de Disparo", "type": "combate", "description": "Se você estiver usando uma arma de ataque à distância, soma sua Destreza nas rolagens de dano."},
            {"name": "Sentidos Aguçados", "type": "destino", "description": "Você recebe +2 em Percepção e Iniciativa e não fica desprevenido contra inimigos que não possa ver."}
        ]
    },
    {
        "id": "capanga",
        "name": "Capanga",
        "description": "Você trabalhou como guarda-costas violento, cobrador de dívidas para criminosos ou leão de chácara em tavernas perigosas.",
        "items": ["Tatuagem ou outro adereço de sua gangue"],
        "skills": ["luta", "intimidacao"],
        "powers": [
            {"name": "Confissão", "type": "origem", "description": "Você pode gastar 1 PM para receber +5 em um teste de Intimidação feito para interrogar alguém."},
            {"name": "Poder de Combate", "type": "combate", "description": "Você pode escolher qualquer Poder de Combate à sua escolha com pré-requisitos cumpridos."}
        ]
    },
    {
        "id": "charlatao",
        "name": "Charlatão",
        "description": "Você viveu de pequenos golpes, vendendo elixires falsos da juventude e contando lorotas para separar os tolos de seu dinheiro.",
        "items": ["Estojo de disfarces", "Frascos falsos de poções"],
        "skills": ["enganacao", "jogatina"],
        "powers": [
            {"name": "Alpinista Social", "type": "origem", "description": "Você recebe +2 em testes de Enganação e Nobreza para se passar por membro de classe social mais alta."},
            {"name": "Aparência Inofensiva", "type": "destino", "description": "A primeira criatura que tentar atacá-lo em uma cena deve fazer um teste de Vontade (CD Car). Se falhar, perde a ação e não ataca você."},
            {"name": "Sortudo", "type": "destino", "description": "Você pode gastar 3 PM para rolar novamente um teste recém-realizado."}
        ]
    },
    {
        "id": "circense",
        "name": "Circense",
        "description": "Você viajou com uma trupe de acrobatas, ilusionistas, cuspidores de fogo e contorcionistas debaixo das lonas coloridas.",
        "items": ["Três bolas coloridas para malabarismo", "Traje espalhafatoso"],
        "skills": ["acrobacia", "atuacao", "reflexos"],
        "powers": [
            {"name": "Acrobático", "type": "destino", "description": "Você pode se levantar do chão como uma ação livre sem teste. Você também não sofre penalidade na Defesa por estar caído."},
            {"name": "Torcida", "type": "combate", "description": "Você recebe +2 em testes de ataque e Defesa quando alguém da plateia ou aliados torcerem por você."},
            {"name": "Truque de Mágica", "type": "origem", "description": "Você aprende uma magia de 1º círculo de Ilusão ou Transmutação (atributo-chave Carisma) e pode lançá-la por 1 PM."}
        ]
    },
    {
        "id": "criminoso",
        "name": "Criminoso",
        "description": "Você viveu à margem da lei como ladrão, contrabandista ou membro de uma guilda secreta de assassinos.",
        "items": ["Gazua", "Estojo de disfarces"],
        "skills": ["enganacao", "furtividade", "ladinagem"],
        "powers": [
            {"name": "Punguista", "type": "origem", "description": "Você pode gastar uma ação de movimento para fazer um teste de Ladinagem e surrupiar um item pequeno ou bolsa de alguém sem ser notado."},
            {"name": "Venefício", "type": "destino", "description": "Você não corre risco de se envenenar acidentalmente ao aplicar veneno em armas e a CD de seus venenos aumenta em +2."}
        ]
    },
    {
        "id": "curandeiro",
        "name": "Curandeiro",
        "description": "Você aprendeu a tratar doentes e feridos em aldeias remotas usando ervas medicinais, compressas e conhecimento empírico.",
        "items": ["Bálsamo restaurador x2", "Maleta de medicamentos"],
        "skills": ["cura", "vontade"],
        "powers": [
            {"name": "Medicina", "type": "destino", "description": "Você pode gastar uma ação completa e fazer um teste de Cura (CD 15) para recuperar 1d6 PV de uma criatura (mais 1d6 a cada 5 pontos acima da CD)."},
            {"name": "Médico de Campo", "type": "origem", "description": "Você pode gastar uma ação padrão e 1 PM para estabilizar e curar 2d4+2 PV de uma criatura adjacente."},
            {"name": "Venefício", "type": "destino", "description": "Você manipula ervas e toxinas com facilidade, recebendo +2 em testes de resistência contra venenos."}
        ]
    },
    {
        "id": "eremita",
        "name": "Eremita",
        "description": "Você viveu em isolamento profundo no topo de montanhas escarpadas ou no coração de florestas esquecidas buscando iluminação interior.",
        "items": ["Barraca", "Equipamento de viagem"],
        "skills": ["misticismo", "religiao", "sobrevivencia"],
        "powers": [
            {"name": "Busca Interior", "type": "origem", "description": "Você aprende a encontrar paz através da meditação. Uma vez por dia ao descansar, você recupera o dobro de PM normais."},
            {"name": "Lobo Solitário", "type": "destino", "description": "Você recebe +1 em testes de perícia e Defesa se não houver nenhum aliado adjacente a você em combate."}
        ]
    },
    {
        "id": "escravo",
        "name": "Escravo",
        "description": "Você suportou a dor, humilhação e correntes da escravidão em reinos implacáveis como Tapista ou nos subterrâneos de Doherimm antes de conquistar a liberdade.",
        "items": ["Algemas quebradas", "Ferramenta pesada (estatísticas de maça ou lança)"],
        "skills": ["atletismo", "fortitude", "furtividade"],
        "powers": [
            {"name": "Desejo de Liberdade", "type": "origem", "description": "Você recebe +5 em testes para escapar de manobras de agarrar, imobilizações, paralisia e amarras."},
            {"name": "Vitalidade", "type": "combate", "description": "Você recebe +1 ponto de vida para cada nível de personagem e +2 em testes de Fortitude."}
        ]
    },
    {
        "id": "estudioso",
        "name": "Estudioso",
        "description": "Você passou anos lendo tomos antigos, mapas empoeirados e tratados filosóficos na Grande Academia Real ou bibliotecas monásticas.",
        "items": ["Coleção de livros (+1 em Conhecimento)", "Pena e tinteiro"],
        "skills": ["conhecimento", "guerra", "misticismo"],
        "powers": [
            {"name": "Aparência Inofensiva", "type": "destino", "description": "Inimigos hesitam antes de agredir seu aspecto frágil de acadêmico."},
            {"name": "Palpite Fundamentado", "type": "origem", "description": "Você pode gastar 1 PM para fazer um teste de Conhecimento em vez de qualquer outro teste de perícia de Inteligência ou Sabedoria."}
        ]
    },
    {
        "id": "fazendeiro",
        "name": "Fazendeiro",
        "description": "Você lavrou a terra, cuidou do gado e protegeu suas plantações contra o clima e invasores em terras rurais.",
        "items": ["Carroça", "Ferramenta agrícola"],
        "skills": ["adestramento", "cavalgar", "oficio", "sobrevivencia"],
        "powers": [
            {"name": "Água no Feijão", "type": "origem", "description": "Você sabe racionar suprimentos com maestria. Você e seu grupo gastam apenas metade dos suprimentos de comida necessários em viagens."},
            {"name": "Ginete", "type": "combate", "description": "Você pode montar ou desmontar como uma ação livre e recebe +2 em testes de Cavalgar."}
        ]
    },
    {
        "id": "forasteiro",
        "name": "Forasteiro",
        "description": "Você veio de além das fronteiras do Reinado, de terras misteriosas como as ilhas de Tamu-ra, o Império de Tauron ou os desertos do sul.",
        "items": ["Equipamento de viagem", "Instrumento musical ou vestimenta típica de sua terra natal"],
        "skills": ["cavalgar", "pilotagem", "sobrevivencia"],
        "powers": [
            {"name": "Cultura Exótica", "type": "origem", "description": "Por conhecer costumes de terras distantes, você recebe +2 em testes de Diplomacia e Conhecimento ao lidar com estrangeiros e culturas incomuns."},
            {"name": "Lobo Solitário", "type": "destino", "description": "Você recebe +1 em perícias e Defesa quando não houver aliados adjacentes."}
        ]
    },
    {
        "id": "gladiador",
        "name": "Gladiador",
        "description": "Você lutou nas grandes arenas de Tiberus, Valkaria ou Zakharov sob aplausos de multidões sedentas por sangue e glória.",
        "items": ["Arma marcial ou exótica à escolha", "Item cosmético de combate"],
        "skills": ["atuacao", "luta"],
        "powers": [
            {"name": "Atraente", "type": "destino", "description": "Você possui porte atlético imponente, recebendo +2 em perícias sociais baseadas em Carisma."},
            {"name": "Pão e Circo", "type": "origem", "description": "Quando faz um teste de Atuação para impressionar uma plateia, você recebe tibares e prestígio equivalentes ao dobro do normal."},
            {"name": "Torcida", "type": "combate", "description": "Você ganha +2 em ataques e Defesa quando há público torcendo por você."},
            {"name": "Poder de Combate", "type": "combate", "description": "Você pode escolher um Poder de Combate à sua escolha com pré-requisitos cumpridos."}
        ]
    },
    {
        "id": "guarda",
        "name": "Guarda",
        "description": "Você patrulhou ruas, fez rondas nas muralhas da cidade e manteve a ordem da milícia urbana contra criminosos e monstros.",
        "items": ["Apito de guarda", "Insígnia da milícia", "Arma marcial à escolha"],
        "skills": ["investigacao", "luta", "percepcao"],
        "powers": [
            {"name": "Detetive", "type": "origem", "description": "Você pode gastar 1 PM para encontrar pistas e detalhes em uma cena de investigação sem precisar de testes demorados."},
            {"name": "Investigador", "type": "destino", "description": "Você recebe +2 em testes de Investigação e Percepção para notar detalhes ocultos."},
            {"name": "Poder de Combate", "type": "combate", "description": "Você pode escolher qualquer Poder de Combate à sua escolha."}
        ]
    },
    {
        "id": "herdeiro",
        "name": "Herdeiro",
        "description": "Você é o sucessor de uma grande linhagem ou família abastada, destinado a herdar riquezas e relíquias de prestígio.",
        "items": ["Símbolo de sua linhagem nobre", "Herança valiosa"],
        "skills": ["misticismo", "nobreza", "oficio"],
        "powers": [
            {"name": "Comandar", "type": "destino", "description": "Você pode gastar uma ação de movimento e 1 PM para conceder +2 a um aliado."},
            {"name": "Herança", "type": "origem", "description": "Você começa o jogo com um item de até T$ 1.000 à sua escolha, ou um item superior com uma modificação de mestre."}
        ]
    },
    {
        "id": "heroi_campones",
        "name": "Herói Camponês",
        "description": "Você era um plebeu comum que se levantou corajosamente contra monstros ou tiranos para salvar sua aldeia natal da destruição.",
        "items": ["Arma improvisada ou ferramenta de trabalho", "Amuleto de boa sorte"],
        "skills": ["adestramento", "oficio"],
        "powers": [
            {"name": "Coração Heroico", "type": "origem", "description": "Você recebe +1 ponto de mana para cada dois níveis de personagem e é imune ao efeito de condição Abalado."},
            {"name": "Sortudo", "type": "destino", "description": "Você pode gastar 3 PM para rolar novamente um teste recém-realizado."},
            {"name": "Surto Heroico", "type": "destino", "description": "Uma vez por rodada, você pode gastar 5 PM para realizar uma ação padrão ou de movimento adicional em seu turno."},
            {"name": "Torcida", "type": "combate", "description": "Recebe +2 em testes com plateia torcendo por você."}
        ]
    },
    {
        "id": "marujo",
        "name": "Marujo",
        "description": "Você enfrentou tempestades marinhas, monstros marinhos e piratas nos mares tempestuosos de Arton a bordo de navios veleiros.",
        "items": ["T$ 2d6 (seu último soldo)", "Corda de 15m", "Pederneira"],
        "skills": ["atletismo", "jogatina", "pilotagem"],
        "powers": [
            {"name": "Acrobático", "type": "destino", "description": "Você tem equilíbrio impecável no balanço das ondas e pode se levantar como ação livre."},
            {"name": "Passagem de Navio", "type": "origem", "description": "Você pode conseguir passagem gratuita de navio para você e seus companheiros trabalhando a bordo durante a viagem."}
        ]
    },
    {
        "id": "mateiro",
        "name": "Mateiro",
        "description": "Você viveu de caçar peles preciosas e ervas raras nas matas fechadas e colinas inexploradas longe da civilização.",
        "items": ["Arco curto ou machadinha", "Barraca", "Equipamento de viagem"],
        "skills": ["atletismo", "furtividade", "sobrevivencia"],
        "powers": [
            {"name": "Lobo Solitário", "type": "destino", "description": "Você recebe +1 em perícias e Defesa quando luta sozinho."},
            {"name": "Sentidos Aguçados", "type": "destino", "description": "Você recebe +2 em Percepção e Iniciativa."},
            {"name": "Vendedor de Carcaças", "type": "origem", "description": "Você sabe extrair couro, presas e órgãos de monstros abatidos, vendendo-os por 50% a mais do valor padrão."}
        ]
    },
    {
        "id": "membro_guilda",
        "name": "Membro de Guilda",
        "description": "Você pertence a uma respeitada ou clandestina guilda de mercadores, ladrões, artesãos ou conjuradores com contatos em várias cidades.",
        "items": ["Gazua ou instrumentos de ofício", "Símbolo secreto da guilda"],
        "skills": ["diplomacia", "enganacao", "misticismo", "oficio"],
        "powers": [
            {"name": "Foco em Perícia", "type": "destino", "description": "Escolha uma perícia. Ao fazer testes dela, você pode gastar 1 PM para rolar dois dados e escolher o melhor resultado."},
            {"name": "Rede de Contatos", "type": "origem", "description": "Você pode gastar 1 dia em qualquer cidade grande para obter informações confidenciais ou itens raros através dos contatos de sua guilda com desconto de 10%."}
        ]
    },
    {
        "id": "mercador",
        "name": "Mercador",
        "description": "Você viajou em caravanas vendendo especiarias, tecidos finos e armas, acumulando faro afiado para bons negócios e lucros.",
        "items": ["Carroça ou trobo", "Mercadorias para comércio no valor de T$ 100"],
        "skills": ["diplomacia", "intuicao", "oficio"],
        "powers": [
            {"name": "Negociação", "type": "origem", "description": "Você pode comprar itens com 10% de desconto e vender seus espólios por 10% a mais que o valor de mercado."},
            {"name": "Proficiência", "type": "combate", "description": "Você recebe proficiência com armas marciais ou armaduras pesadas."},
            {"name": "Sortudo", "type": "destino", "description": "Você pode gastar 3 PM para rolar novamente um teste recém-realizado."}
        ]
    },
    {
        "id": "minerador",
        "name": "Minerador",
        "description": "Você escavou túneis profundos à procura de ouro, pedras preciosas e aço-rubi nas entranhas montanhosas de Arton.",
        "items": ["Picareta", "Gemas preciosas no valor de T$ 100", "Lampião"],
        "skills": ["atletismo", "fortitude", "oficio"],
        "powers": [
            {"name": "Ataque Poderoso", "type": "combate", "description": "Você pode sofrer -2 no teste de ataque para receber +5 na rolagem de dano corpo a corpo."},
            {"name": "Escavador", "type": "origem", "description": "Você recebe deslocamento de escavação de 3m através de terra e rocha macia e +2 em testes de Percepção em masmorras."},
            {"name": "Sentidos Aguçados", "type": "destino", "description": "Você recebe +2 em Percepção e Iniciativa."}
        ]
    },
    {
        "id": "nomade",
        "name": "Nômade",
        "description": "Você nunca teve um lar fixo, cavalgando livre pelas estepes, savanas ou deserto sob as estrelas cintilantes de Arton.",
        "items": ["Bordão ou lança", "Equipamento de viagem", "Montaria (cavalo ou trobo)"],
        "skills": ["cavalgar", "pilotagem", "sobrevivencia"],
        "powers": [
            {"name": "Lobo Solitário", "type": "destino", "description": "Recebe +1 em testes de perícia e Defesa quando sozinho."},
            {"name": "Mochileiro", "type": "origem", "description": "Sua capacidade de carga aumenta em +5 espaços e você nunca sofre penalidade por carregar carga pesada."},
            {"name": "Sentidos Aguçados", "type": "destino", "description": "Recebe +2 em Percepção e Iniciativa."}
        ]
    },
    {
        "id": "pivete",
        "name": "Pivete",
        "description": "Você cresceu órfão e sobreviveu nas vielas sujas das metrópoles roubando maçãs, fugindo da guarda e dormindo nos telhados.",
        "items": ["Gazua", "Traje de plebeu", "Um pequeno animal urbano de estimação (rato ou pássaro)"],
        "skills": ["furtividade", "iniciativa", "ladinagem"],
        "powers": [
            {"name": "Acrobático", "type": "destino", "description": "Levanta-se como ação livre e ignora penalidades por estar caído."},
            {"name": "Aparência Inofensiva", "type": "destino", "description": "Criaturas hesitam em atacar você."},
            {"name": "Quebra-Galho", "type": "origem", "description": "Você pode improvisar ferramentas para testes de perícia gastando 1 PM sem sofrer penalidades por falta de equipamento."}
        ]
    },
    {
        "id": "refugiado",
        "name": "Refugiado",
        "description": "Sua terra natal foi destruída por guerras cruéis, áreas de Tormenta ou monstros, forçando-o a fugir apenas com a roupa do corpo.",
        "items": ["Um item estrangeiro de valor sentimental no valor de até T$ 100"],
        "skills": ["fortitude", "reflexos", "vontade"],
        "powers": [
            {"name": "Estoico", "type": "origem", "description": "Você aprendeu a suportar a fome, frio e dor. Você recebe +2 em testes de Fortitude e recupera +1 PV e PM por hora de descanso normal."},
            {"name": "Vontade de Ferro", "type": "destino", "description": "Você recebe +1 ponto de mana a cada dois níveis e +2 em testes de Vontade."}
        ]
    },
    {
        "id": "seguidor",
        "name": "Seguidor",
        "description": "Você foi escudeiro, pajem ou servo dedicado de um grande herói lendário, aprendendo com seu exemplo brilhante.",
        "items": ["Um item recebido de seu mestre no valor de até T$ 100"],
        "skills": ["adestramento", "oficio"],
        "powers": [
            {"name": "Antigo Mestre", "type": "origem", "description": "Você pode gastar 1 PM para se lembrar de um conselho de seu mestre e receber +2 em um teste de perícia qualquer."},
            {"name": "Proficiência", "type": "combate", "description": "Você recebe proficiência com uma categoria de armas ou armaduras à sua escolha."},
            {"name": "Surto Heroico", "type": "destino", "description": "Você pode gastar 5 PM para realizar uma ação padrão extra no seu turno."}
        ]
    },
    {
        "id": "selvagem",
        "name": "Selvagem",
        "description": "Você viveu em tribos isoladas nos confins mais remotos do continente, caçando feras com lanças de pedra e venerando os espíritos da terra.",
        "items": ["Uma arma simples", "Pequeno animal de estimação selvagem", "Vestimentas de peles"],
        "skills": ["percepcao", "reflexos", "sobrevivencia"],
        "powers": [
            {"name": "Lobo Solitário", "type": "destino", "description": "Recebe +1 em testes de perícia e Defesa quando sozinho."},
            {"name": "Vida Rústica", "type": "origem", "description": "Você não sofre penalidades por condições climáticas naturais adversas e pode se alimentar de qualquer substância orgânica natural."},
            {"name": "Vitalidade", "type": "combate", "description": "Recebe +1 PV por nível de personagem e +2 em Fortitude."}
        ]
    },
    {
        "id": "soldado",
        "name": "Soldado",
        "description": "Você serviu no exército de um dos reinos de Arton, marchando em formação sob estandartes e participando de batalhas campais épicas.",
        "items": ["Uma arma marcial à escolha", "Uniforme militar oficial", "Insígnia de seu regimento"],
        "skills": ["fortitude", "guerra", "luta", "pontaria"],
        "powers": [
            {"name": "Influência Militar", "type": "origem", "description": "Militares e guardas reconhecem sua patente ou serviço pregresso, concedendo hospedagem em quartéis e cooperação em investigações."},
            {"name": "Poder de Combate", "type": "combate", "description": "Você pode escolher um Poder de Combate à sua escolha com pré-requisitos cumpridos."}
        ]
    },
    {
        "id": "taverneiro",
        "name": "Taverneiro",
        "description": "Você serviu canecas de hidromel espumante, ensopados de javali e ouviu conversas de viajantes e aventureiros atrás do balcão.",
        "items": ["Rolo de macarrão ou martelo de carne (maça leve)", "Avental de taverneiro", "Caneca de cerâmica"],
        "skills": ["diplomacia", "jogatina", "oficio"],
        "powers": [
            {"name": "Gororoba", "type": "origem", "description": "Você sabe preparar banquetes nutritivos com qualquer ingrediente. Você não sofre a penalidade de -5 para fabricar pratos especiais com Ofício (cozinheiro)."},
            {"name": "Proficiência", "type": "combate", "description": "Você recebe proficiência em armas marciais ou armaduras pesadas."},
            {"name": "Vitalidade", "type": "combate", "description": "Recebe +1 PV por nível de personagem e +2 em testes de Fortitude."}
        ]
    },
    {
        "id": "trabalhador",
        "name": "Trabalhador",
        "description": "Você realizou trabalho braçal pesado como carregador de docas, carvoeiro ou estivador, fortalecendo seus músculos com o suor do rosto.",
        "items": ["Ferramenta pesada de trabalho (estatísticas de maça ou lança à escolha)"],
        "skills": ["atletismo", "fortitude"],
        "powers": [
            {"name": "Atlético", "type": "destino", "description": "Você recebe +2 em Atletismo e seu deslocamento aumenta em +1,5m."},
            {"name": "Esforçado", "type": "origem", "description": "Você não teme trabalho duro. Você recebe um bônus de +2 em todos os testes estendidos de perícias e perigos complexos."}
        ]
    }
]

ts_content = "import { Origin } from '../types/rules';\n\n"
ts_content += "export const ORIGINS_LIST: Origin[] = " + json.dumps(origins_raw, indent=2, ensure_ascii=False) + ";\n"

with open('src/data/origins.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Generated src/data/origins.ts with {len(origins_raw)} origins successfully.")
