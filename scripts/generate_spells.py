# -*- coding: utf-8 -*-
"""
Generates src/data/spells.ts for Tormenta 20 JDA 1st Circle Spells.
"""
import json

spells_raw = [
  # Arcanas
  {
    "id": "armadura_arcana",
    "name": "Armadura Arcana",
    "circle": 1,
    "type": "arcana",
    "school": "Abjuração",
    "execution": "Padrão",
    "range": "Pessoal",
    "targetArea": "Você",
    "duration": "Cena",
    "description": "Você cria uma barreira de força invisível e impenetrável que envolve seu corpo, concedendo +5 na Defesa. Este bônus não se acumula com bônus concedidos por armaduras normais.",
    "upgrades": [
      {"cost": "+1 PM", "description": "Muda a execução para reação. Em vez do efeito padrão, você recebe +5 na Defesa contra o próximo ataque que sofrer."},
      {"cost": "+2 PM", "description": "Aumenta o bônus na Defesa em +1."},
      {"cost": "+2 PM", "description": "Muda a duração para 1 dia."}
    ]
  },
  {
    "id": "concentracao_combate",
    "name": "Concentração de Combate",
    "circle": 1,
    "type": "arcana",
    "school": "Adivinhação",
    "execution": "Livre",
    "range": "Pessoal",
    "targetArea": "Você",
    "duration": "1 rodada",
    "description": "Sua mente vislumbra as fraquezas iminentes na guarda do inimigo. Ao fazer um teste de ataque nesta rodada, você rola dois dados e escolhe o melhor resultado.",
    "upgrades": [
      {"cost": "+2 PM", "description": "Muda a duração para cena."},
      {"cost": "+5 PM", "description": "Muda a execução para reação. Você pode lançar esta magia quando for alvo de um ataque para forçar o atacante a rolar dois dados e ficar com o pior resultado."}
    ]
  },
  {
    "id": "explosao_chamas",
    "name": "Explosão de Chamas",
    "circle": 1,
    "type": "arcana",
    "school": "Evocação",
    "execution": "Padrão",
    "range": "6m",
    "targetArea": "Cone de 6m",
    "duration": "Instantânea",
    "resistance": "Reflexos reduz à metade",
    "description": "Você estende as mãos espalmadas e conjura uma onda crepitante de fogo rubro. Criaturas na área sofrem 2d6 pontos de dano de fogo.",
    "upgrades": [
      {"cost": "+1 PM", "description": "Aumenta o dano em +1d6 de fogo."},
      {"cost": "+2 PM", "description": "Muda o alcance para 9m e o cone para 9m."}
    ]
  },
  {
    "id": "adaga_mental",
    "name": "Adaga Mental",
    "circle": 1,
    "type": "arcana",
    "school": "Encantamento",
    "execution": "Padrão",
    "range": "Curto",
    "targetArea": "1 criatura",
    "duration": "Instantânea",
    "resistance": "Vontade parcial",
    "description": "Você dispara uma lâmina de pura energia psíquica na mente do alvo. Ele sofre 2d6 pontos de dano psíquico e fica atordoado por 1 rodada. Se passar no teste de Vontade, sofre apenas metade do dano e não fica atordoado.",
    "upgrades": [
      {"cost": "+1 PM", "description": "Aumenta o dano em +1d6 psíquico."},
      {"cost": "+2 PM", "description": "Se o alvo falhar no teste de resistência, fica atordoado por 1d4 rodadas."}
    ]
  },
  {
    "id": "toque_chocante",
    "name": "Toque Chocante",
    "circle": 1,
    "type": "arcana",
    "school": "Evocação",
    "execution": "Padrão",
    "range": "Toque",
    "targetArea": "1 criatura",
    "duration": "Instantânea",
    "resistance": "Fortitude reduz à metade",
    "description": "Faíscas azuladas dançam em suas mãos. Você desfecha um toque eletrificado que causa 2d8+2 pontos de dano de eletricidade no alvo. Se o alvo estiver usando armadura de metal, você recebe +2 no teste de ataque.",
    "upgrades": [
      {"cost": "+1 PM", "description": "Como parte da execução da magia, você pode fazer um ataque corpo a corpo com uma arma. Se acertar, causa o dano da arma mais o efeito da magia."},
      {"cost": "+1 PM", "description": "Aumenta o dano em +1d8+1 de eletricidade."}
    ]
  },
  {
    "id": "criar_ilusao",
    "name": "Criar Ilusão",
    "circle": 1,
    "type": "arcana",
    "school": "Ilusão",
    "execution": "Padrão",
    "range": "Médio",
    "targetArea": "Ilusão que cabe em 1 cubo de 1,5m",
    "duration": "Sustentada",
    "resistance": "Vontade desacredita",
    "description": "Você cria uma imagem visual estática ilusória no espaço indicado. Uma criatura que interaja com a ilusão tem direito a um teste de Vontade para perceber que ela é falsa.",
    "upgrades": [
      {"cost": "+1 PM", "description": "A ilusão passa a incluir sons e odores convincentes."},
      {"cost": "+1 PM", "description": "A ilusão pode se mover dentro do alcance sob seu comando."},
      {"cost": "+2 PM", "description": "Aumenta a área da ilusão para até 4 cubos de 1,5m."}
    ]
  },
  {
    "id": "imagem_espelhada",
    "name": "Imagem Espelhada",
    "circle": 1,
    "type": "arcana",
    "school": "Ilusão",
    "execution": "Padrão",
    "range": "Pessoal",
    "targetArea": "Você",
    "duration": "Cena",
    "description": "Você cria três cópias ilusórias idênticas de si mesmo que se movem em harmonia para confundi-lo com elas. Você recebe +6 na Defesa. Cada vez que um ataque erra você por uma margem igual ou menor que o bônus, uma das imagens se desfaz e o bônus na Defesa diminui em 2.",
    "upgrades": [
      {"cost": "+2 PM", "description": "Aumenta o número de cópias em +1 (concedendo +2 na Defesa inicial)."}
    ]
  },
  {
    "id": "area_escorregadia",
    "name": "Área Escorregadia",
    "circle": 1,
    "type": "arcana",
    "school": "Convocação",
    "execution": "Padrão",
    "range": "Curto",
    "targetArea": "Quadrado de 3m de lado",
    "duration": "Cena",
    "resistance": "Reflexos",
    "description": "O chão da área fica coberto por uma camada de graxa mágica ultraescorregadia. Criaturas na área ou que entrem nela devem passar num teste de Reflexos ou caem no chão.",
    "upgrades": [
      {"cost": "+1 PM", "description": "Aumenta a área em +1,5m de lado."},
      {"cost": "+2 PM", "description": "A graxa se torna inflamável. Se sofrer dano de fogo, queima causando 2d6 de fogo em quem estiver na área."}
    ]
  },
  {
    "id": "enfeitiçar",
    "name": "Enfeitiçar",
    "circle": 1,
    "type": "arcana",
    "school": "Encantamento",
    "execution": "Padrão",
    "range": "Curto",
    "targetArea": "1 criatura humanoide",
    "duration": "Cena",
    "resistance": "Vontade anula",
    "description": "O alvo passa a enxergá-lo como um amigo íntimo e confiável. Ele não o atacará e atenderá a pedidos razoáveis que não ameacem sua própria vida.",
    "upgrades": [
      {"cost": "+2 PM", "description": "Afeta criaturas de qualquer tipo, não apenas humanoides."},
      {"cost": "+5 PM", "description": "Muda a duração para 1 dia."}
    ]
  },
  {
    "id": "sono",
    "name": "Sono",
    "circle": 1,
    "type": "arcana",
    "school": "Encantamento",
    "execution": "Padrão",
    "range": "Curto",
    "targetArea": "1 criatura",
    "duration": "Cena",
    "resistance": "Vontade parcial",
    "description": "Uma onda de torpor sobrenatural abate o alvo. Se falhar no teste de Vontade, ele cai no chão adormecido (inconsciente) até sofrer dano ou ser sacudido com uma ação padrão.",
    "upgrades": [
      {"cost": "+2 PM", "description": "Afeta todas as criaturas em um círculo de 3m de raio."},
      {"cost": "+2 PM", "description": "Alvos que passem na resistência ficam fatigados em vez de não sofrerem nenhum efeito."}
    ]
  },
  {
    "id": "nevoa",
    "name": "Névoa",
    "circle": 1,
    "type": "universal",
    "school": "Convocação",
    "execution": "Padrão",
    "range": "Curto",
    "targetArea": "Esfera com 6m de raio",
    "duration": "Cena",
    "description": "Uma névoa espessa e úmida brota do chão. Criaturas a até 1,5m têm camuflagem leve (20% de chance de erro); criaturas a mais de 1,5m têm camuflagem total (50% de chance de erro).",
    "upgrades": [
      {"cost": "+1 PM", "description": "A névoa se torna ácida, causando 1d6 de dano de ácido no início do turno de cada criatura na área."},
      {"cost": "+2 PM", "description": "A névoa se torna tão densa que conta como terreno difícil."}
    ]
  },
  {
    "id": "visao_mistica",
    "name": "Visão Mística",
    "circle": 1,
    "type": "universal",
    "school": "Adivinhação",
    "execution": "Padrão",
    "range": "Pessoal",
    "targetArea": "Você",
    "duration": "Cena",
    "description": "Seus olhos brilham com luz azulada. Você enxerga auras mágicas em itens e criaturas no seu campo de visão e pode fazer testes de Misticismo para discernir escolas e intensidade de feitiços ativos.",
    "upgrades": [
      {"cost": "+1 PM", "description": "Você também enxerga criaturas invisíveis e através de ilusões visuais."},
      {"cost": "+2 PM", "description": "Muda a duração para 1 dia."}
    ]
  },
  {
    "id": "arma_magica",
    "name": "Arma Mágica",
    "circle": 1,
    "type": "universal",
    "school": "Transmutação",
    "execution": "Padrão",
    "range": "Toque",
    "targetArea": "1 arma",
    "duration": "Cena",
    "description": "Você imbui uma arma com poder mágico vibrante. A arma recebe +1 nos testes de ataque e rolagens de dano e é considerada mágica para superar resistências a dano.",
    "upgrades": [
      {"cost": "+2 PM", "description": "Aumenta o bônus de ataque e dano em +1."},
      {"cost": "+2 PM", "description": "A arma causa +1d6 pontos de dano elemental adicional (fogo, frio ou eletricidade)."}
    ]
  },

  # Divinas
  {
    "id": "curar_ferimentos",
    "name": "Curar Ferimentos",
    "circle": 1,
    "type": "divina",
    "school": "Evocação",
    "execution": "Padrão",
    "range": "Toque",
    "targetArea": "1 criatura",
    "duration": "Instantânea",
    "description": "Você canaliza energia positiva sagrada através das mãos, curando 2d8+2 pontos de vida na criatura tocada. Se usada contra mortos-vivos, causa 2d8+2 de dano de luz (Vontade reduz à metade).",
    "upgrades": [
      {"cost": "+1 PM", "description": "Aumenta a cura em +1d8+1 PV."},
      {"cost": "+2 PM", "description": "Muda o alcance para Curto."},
      {"cost": "+2 PM", "description": "Além de curar PV, remove uma condição negativa: abalado, apavorado, fatigado ou sangrando."}
    ]
  },
  {
    "id": "bencao",
    "name": "Bênção",
    "circle": 1,
    "type": "divina",
    "school": "Encantamento",
    "execution": "Padrão",
    "range": "Curto",
    "targetArea": "Aliados no alcance",
    "duration": "Cena",
    "description": "Você invoca a benevolência dos deuses sobre seus companheiros. Você e todos os aliados no alcance curto recebem +1 em testes de ataque e rolagens de dano até o fim da cena.",
    "upgrades": [
      {"cost": "+2 PM", "description": "Aumenta os bônus concedidos em +1 (total +2 no ataque e dano)."},
      {"cost": "+2 PM", "description": "Concede também +1 em todos os testes de resistência dos aliados afetados."}
    ]
  },
  {
    "id": "escudo_da_fe",
    "name": "Escudo da Fé",
    "circle": 1,
    "type": "divina",
    "school": "Abjuração",
    "execution": "Reação",
    "range": "Curto",
    "targetArea": "1 criatura",
    "duration": "Cena",
    "description": "Um escudo luminoso etéreo surge para proteger o alvo. Ele recebe +2 na Defesa até o fim da cena.",
    "upgrades": [
      {"cost": "+2 PM", "description": "Aumenta o bônus na Defesa em +1."},
      {"cost": "+1 PM", "description": "Pode ser lançado como reação quando você ou um aliado for atacado, concedendo +5 na Defesa contra aquele ataque específico."}
    ]
  },
  {
    "id": "infligir_ferimentos",
    "name": "Infligir Ferimentos",
    "circle": 1,
    "type": "divina",
    "school": "Evocação",
    "execution": "Padrão",
    "range": "Toque",
    "targetArea": "1 criatura",
    "duration": "Instantânea",
    "resistance": "Fortitude reduz à metade",
    "description": "Você canaliza energia negativa profana nas palmas das mãos. O alvo tocado sofre 2d8+2 pontos de dano de trevas. Se usado em um morto-vivo, cura 2d8+2 pontos de vida em vez de causar dano.",
    "upgrades": [
      {"cost": "+1 PM", "description": "Aumenta o dano em +1d8+1 de trevas."},
      {"cost": "+2 PM", "description": "Muda o alcance para Curto."}
    ]
  },
  {
    "id": "comando",
    "name": "Comando",
    "circle": 1,
    "type": "divina",
    "school": "Encantamento",
    "execution": "Padrão",
    "range": "Curto",
    "targetArea": "1 criatura",
    "duration": "1 rodada",
    "resistance": "Vontade anula",
    "description": "Você pronuncia uma ordem divina irresistível: Fuja (o alvo gasta seu turno fugindo em disparada), Caia (o alvo cai no chão e encerra seu turno), Largue (o alvo solta o que estiver segurando) ou Pare (o alvo fica imóvel e não realiza ações).",
    "upgrades": [
      {"cost": "+2 PM", "description": "Muda o alvo para até 3 criaturas no alcance curto."},
      {"cost": "+5 PM", "description": "O comando pode incluir uma ordem mais complexa de até 3 palavras."}
    ]
  },
  {
    "id": "santuario",
    "name": "Santuário",
    "circle": 1,
    "type": "divina",
    "school": "Abjuração",
    "execution": "Padrão",
    "range": "Toque",
    "targetArea": "1 criatura",
    "duration": "Cena",
    "resistance": "Vontade anula",
    "description": "Uma aura de serenidade inviolável cerca o alvo. Qualquer inimigo que tente atacar o alvo diretamente deve passar num teste de Vontade ou não consegue atacá-lo e deve escolher outro alvo ou perder a ação. Se o alvo realizar qualquer ataque, a magia é dissipada.",
    "upgrades": [
      {"cost": "+2 PM", "description": "A magia não se dissipa mesmo que o alvo lance magias de cura ou suporte em aliados."}
    ]
  },
  {
    "id": "arma_espiritual",
    "name": "Arma Espiritual",
    "circle": 1,
    "type": "divina",
    "school": "Convocação",
    "execution": "Padrão",
    "range": "Curto",
    "targetArea": "Arma luminosa convocada",
    "duration": "Cena",
    "description": "Você conjura uma réplica fantasmagórica brilhante da arma sagrada de sua divindade. Como ação de movimento, você pode fazê-la atacar um inimigo no alcance curto usando seu teste de ataque místico (Sabedoria + nível) causando 2d6 de dano sagrado de essência.",
    "upgrades": [
      {"cost": "+2 PM", "description": "Aumenta o dano da arma espiritual em +1d6."},
      {"cost": "+2 PM", "description": "A arma concede bônus de flanqueamento aos aliados adjacentes ao alvo atacado."}
    ]
  },
  {
    "id": "controlar_plantas",
    "name": "Controlar Plantas",
    "circle": 1,
    "type": "divina",
    "school": "Transmutação",
    "execution": "Padrão",
    "range": "Curto",
    "targetArea": "Raio de 3m",
    "duration": "Cena",
    "resistance": "Reflexos anula",
    "description": "Você ordena que raízes, galhos e cipós brotem do solo para agarrar os pés de seus inimigos. A área se torna terreno difícil e criaturas nela que falharem no teste de Reflexos ficam enredadas.",
    "upgrades": [
      {"cost": "+1 PM", "description": "Aumenta o raio da área afetada em +1,5m."},
      {"cost": "+2 PM", "description": "Plantas com espinhos venenosos causam 1d6 de dano de corte e veneno a quem começar o turno na área."}
    ]
  },
  {
    "id": "protecao_divina",
    "name": "Proteção Divina",
    "circle": 1,
    "type": "divina",
    "school": "Abjuração",
    "execution": "Padrão",
    "range": "Toque",
    "targetArea": "1 criatura",
    "duration": "Cena",
    "description": "A divindade estende seu manto protetor sobre o corpo e alma do alvo. Ele recebe +2 em todos os testes de resistência (Fortitude, Reflexos e Vontade).",
    "upgrades": [
      {"cost": "+2 PM", "description": "Aumenta o bônus em testes de resistência em +1."},
      {"cost": "+2 PM", "description": "Muda a execução para reação ao fazer um teste de resistência, concedendo +5 no teste."}
    ]
  }
]

ts_content = "import { Spell } from '../types/rules';\n\n"
ts_content += "export const SPELLS_LIST: Spell[] = " + json.dumps(spells_raw, indent=2, ensure_ascii=False) + ";\n"

with open('src/data/spells.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Generated src/data/spells.ts with {len(spells_raw)} spells.")
