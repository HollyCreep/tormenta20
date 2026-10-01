# -*- coding: utf-8 -*-
"""
Generates src/data/generalPowers.ts for Tormenta 20 JDA.
"""
import json

powers_raw = [
  # Poderes de Combate
  {
    "id": "estilo_uma_arma",
    "name": "Estilo de Uma Arma",
    "category": "combate",
    "prerequisites": "Treinado em Luta",
    "description": "Se estiver empunhando uma arma corpo a corpo em uma das mãos e nada na outra, você recebe +2 na Defesa e +2 em testes de ataque com essa arma."
  },
  {
    "id": "estilo_duas_armas",
    "name": "Estilo de Duas Armas",
    "category": "combate",
    "prerequisites": "Des 2, treinado em Luta",
    "description": "Se você estiver empunhando duas armas (e pelo menos uma for leve) e fizer a ação agredir, pode gastar 1 PM para fazer um ataque extra com a arma secundária."
  },
  {
    "id": "estilo_disparo",
    "name": "Estilo de Disparo",
    "category": "combate",
    "prerequisites": "Treinado em Pontaria",
    "description": "Se você estiver usando uma arma de disparo (arco, besta, funda ou arma de fogo), você soma o seu modificador de Destreza nas rolagens de dano."
  },
  {
    "id": "estilo_arma_escudo",
    "name": "Estilo de Arma e Escudo",
    "category": "combate",
    "prerequisites": "Treinado em Luta, proficiência com escudos",
    "description": "Se você estiver empunhando uma arma em uma mão e um escudo na outra, o bônus na Defesa concedido pelo escudo aumenta em +1."
  },
  {
    "id": "ataque_poderoso",
    "name": "Ataque Poderoso",
    "category": "combate",
    "prerequisites": "For 1",
    "description": "Ao declarar um ataque corpo a corpo, você pode sofrer -2 no teste de ataque para desferir um golpe demolidor que recebe +5 na rolagem de dano."
  },
  {
    "id": "ataque_preciso",
    "name": "Ataque Preciso",
    "category": "combate",
    "prerequisites": "Des 1, treinado em Luta ou Pontaria",
    "description": "Seus ataques com uma arma corpo a corpo ou de arremesso escolhida recebem +1 na margem de ameaça de acerto crítico (por exemplo, de 19 para 18)."
  },
  {
    "id": "esquiva",
    "name": "Esquiva",
    "category": "combate",
    "prerequisites": "Des 1",
    "description": "Você recebe +2 na Defesa e +2 em testes de Reflexos devido à sua agilidade excepcional para evitar golpes."
  },
  {
    "id": "combate_defensivo",
    "name": "Combate Defensivo",
    "category": "combate",
    "prerequisites": "Int 1",
    "description": "Quando faz a ação agredir, você pode sofrer -2 em todos os seus testes de ataque até o início do seu próximo turno para receber +5 na Defesa."
  },
  {
    "id": "vitalidade",
    "name": "Vitalidade",
    "category": "combate",
    "prerequisites": "Con 1",
    "description": "Você recebe +1 ponto de vida para cada nível de personagem e +2 em testes de Fortitude."
  },
  {
    "id": "saque_rapido",
    "name": "Saque Rápido",
    "category": "combate",
    "prerequisites": "Treinado em Iniciativa",
    "description": "Você pode sacar ou guardar armas e itens como uma ação livre (em vez de ação de movimento) e recebe +2 em testes de Iniciativa."
  },
  {
    "id": "disparo_certeiro",
    "name": "Disparo Certeiro",
    "category": "combate",
    "prerequisites": "Treinado em Pontaria",
    "description": "Você não sofre a penalidade padrão de -5 no teste de ataque à distância ao disparar contra um inimigo engajado em combate corpo a corpo com um aliado."
  },
  {
    "id": "encouracado",
    "name": "Encouraçado",
    "category": "combate",
    "prerequisites": "Proficiência com armaduras pesadas",
    "description": "Se estiver vestindo uma armadura pesada, o bônus na Defesa concedido por ela aumenta em +2."
  },

  # Poderes de Destino
  {
    "id": "acrobatico",
    "name": "Acrobático",
    "category": "destino",
    "prerequisites": "Des 2, treinado em Acrobacia",
    "description": "Você pode se levantar do chão como uma ação livre sem precisar fazer testes. Além disso, não sofre penalidade na Defesa por estar caído."
  },
  {
    "id": "aparencia_inofensiva",
    "name": "Aparência Inofensiva",
    "category": "destino",
    "prerequisites": "Car 1",
    "description": "A primeira criatura que tentar atacar você em uma cena de combate deve fazer um teste de Vontade (CD Car). Se falhar, ela perde a ação e não consegue atacá-lo."
  },
  {
    "id": "atraente",
    "name": "Atraente",
    "category": "destino",
    "prerequisites": "Car 1",
    "description": "Você recebe +2 em testes de perícias baseadas em Carisma contra criaturas que possam se sentir atraídas por você."
  },
  {
    "id": "comandar",
    "name": "Comandar",
    "category": "destino",
    "prerequisites": "Car 1",
    "description": "Você pode gastar uma ação de movimento e 1 PM para berrar instruções a um aliado em alcance curto. Ele recebe +2 no próximo teste que realizar nesta rodada."
  },
  {
    "id": "foco_em_pericia",
    "name": "Foco em Perícia",
    "category": "destino",
    "prerequisites": "Treinado na perícia escolhida",
    "description": "Escolha uma perícia na qual seja treinado. Ao fazer um teste dessa perícia, você pode gastar 1 PM para rolar dois dados e ficar com o melhor resultado."
  },
  {
    "id": "lobo_solitario",
    "name": "Lobo Solitário",
    "category": "destino",
    "description": "Você recebe +1 em todos os testes de perícia e +1 na Defesa se não houver nenhum aliado adjacente a você em combate."
  },
  {
    "id": "medico_de_campo",
    "name": "Médico de Campo",
    "category": "destino",
    "prerequisites": "Treinado em Cura, Sab 1",
    "description": "Você pode gastar uma ação padrão e 1 PM para estabilizar e curar 2d4+2 pontos de vida em uma criatura adjacente em perigo iminente."
  },
  {
    "id": "medicina",
    "name": "Medicina",
    "category": "destino",
    "prerequisites": "Treinado em Cura, Sab 1",
    "description": "Você pode gastar uma ação completa e fazer um teste de Cura (CD 15) em uma criatura para recuperar 1d6 PV (mais 1d6 para cada 5 pontos pelos quais exceder a CD)."
  },
  {
    "id": "negociacao",
    "name": "Negociação",
    "category": "destino",
    "prerequisites": "Treinado em Diplomacia",
    "description": "Você pode comprar itens mundanos com 10% de desconto e vender seus espólios e tesouros por 10% a mais do que o valor padrão de mercado."
  },
  {
    "id": "sortudo",
    "name": "Sortudo",
    "category": "destino",
    "description": "Você pode gastar 3 PM para rolar novamente um teste recém-realizado (apenas uma vez por teste). Você fica com o melhor resultado."
  },
  {
    "id": "surto_heroico",
    "name": "Surto Heroico",
    "category": "destino",
    "description": "Uma vez por rodada, você pode gastar 5 PM para realizar uma ação padrão ou uma ação de movimento adicional em seu turno."
  },
  {
    "id": "torcida",
    "name": "Torcida",
    "category": "destino",
    "prerequisites": "Car 1",
    "description": "Você recebe +2 em testes de ataque e Defesa quando houver pelo menos um aliado adjacente ou membro do público torcendo ativamente por você."
  },
  {
    "id": "veneficio",
    "name": "Venefício",
    "category": "destino",
    "prerequisites": "Treinado em Ofício (alquimista)",
    "description": "Você não corre o risco usual de se envenenar acidentalmente ao aplicar venenos em suas armas, e a CD para resistir aos venenos que você fabrica aumenta em +2."
  },
  {
    "id": "vontade_de_ferro",
    "name": "Vontade de Ferro",
    "category": "destino",
    "prerequisites": "Sab 1",
    "description": "Você recebe +1 ponto de mana para cada dois níveis de personagem e recebe +2 em testes de Vontade."
  },
  {
    "id": "atletico",
    "name": "Atlético",
    "category": "destino",
    "prerequisites": "For 1, treinado em Atletismo",
    "description": "Você recebe +2 em testes de Atletismo e seu deslocamento base aumenta em +1,5m."
  },

  # Poderes de Magia
  {
    "id": "foco_em_magia",
    "name": "Foco em Magia",
    "category": "magia",
    "prerequisites": "Habilidade de classe Magias",
    "description": "Escolha uma magia que você conheça. O custo para lançar essa magia diminui em -1 PM (não cumulativo com outras reduções de custo além do mínimo de 1 PM)."
  },
  {
    "id": "magia_ampliada",
    "name": "Magia Ampliada",
    "category": "magia",
    "prerequisites": "Habilidade de classe Magias",
    "description": "Você pode gastar +1 PM ao lançar uma magia para dobrar o seu alcance ou aumentar a sua área de efeito em 50%."
  },
  {
    "id": "magia_discreta",
    "name": "Magia Discreta",
    "category": "magia",
    "prerequisites": "Habilidade de classe Magias",
    "description": "Você pode gastar +2 PM ao lançar uma magia para conjurá-la sem gesticular e sem pronunciar palavras mágicas audíveis."
  },
  {
    "id": "magia_ilimitada",
    "name": "Magia Ilimitada",
    "category": "magia",
    "prerequisites": "Habilidade de classe Magias",
    "description": "O limite máximo de pontos de mana que você pode gastar em uma única conjuração aumenta em um valor igual ao seu modificador de atributo-chave de magia."
  },

  # Poderes da Tormenta
  {
    "id": "anatomia_insana",
    "name": "Anatomia Insana",
    "category": "tormenta",
    "description": "Seus órgãos internos mudaram de lugar e foram corrompidos por matéria vermelha. Você tem 25% de chance (resultado 1 em 1d4) de ignorar o dano extra de acertos críticos e ataques furtivos."
  },
  {
    "id": "carapaca",
    "name": "Carapaça",
    "category": "tormenta",
    "description": "Placas de quitina avermelhada brotam de sua pele. Você recebe +2 na Defesa, mas sofre penalidade de -1 em Carisma para cada dois poderes da Tormenta que possuir."
  },
  {
    "id": "dentes_afiados",
    "name": "Dentes Afiados",
    "category": "tormenta",
    "description": "Sua mandíbula se desfigura em presas pontiagudas monstruosas. Você ganha uma arma natural de mordida (dano 1d4, perfuração) que goteja matéria ácida."
  },
  {
    "id": "empunhadura_rubra",
    "name": "Empunhadura Rubra",
    "category": "tormenta",
    "description": "Fibras musculares rubras brotam dos seus punhos e se entrelaçam na empunhadura de suas armas. Você recebe +2 em testes de ataque corpo a corpo."
  },
  {
    "id": "visco_rubro",
    "name": "Visco Rubro",
    "category": "tormenta",
    "description": "Você pode gastar 1 PM para fazer seus membros ou armas expelirem uma secreção corrosiva da Tormenta, causando +1d6 de dano de ácido no seu próximo ataque."
  }
]

ts_content = "import { GeneralPower } from '../types/rules';\n\n"
ts_content += "export const GENERAL_POWERS_LIST: GeneralPower[] = " + json.dumps(powers_raw, indent=2, ensure_ascii=False) + ";\n"

with open('src/data/generalPowers.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Generated src/data/generalPowers.ts with {len(powers_raw)} general powers.")
