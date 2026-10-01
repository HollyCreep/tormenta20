---
trigger: always_on
glob:
description: Mecânicas Oficiais e Fórmulas de Tormenta 20 (Edição Jogo do Ano v1.3)
---

# ⚔️ Compêndio de Mecânicas — Tormenta 20 Jogo do Ano (v1.3)

Este documento estabelece as regras e fórmulas matemáticas canônicas que devem ser rigorosamente seguidas pelos agentes.

---

## 1. Atributos Básicos (Capítulo 1, pág. 17)

- **O valor do atributo É o modificador**.
- Atributos: **Força (FOR)**, **Destreza (DES)**, **Constituição (CON)**, **Inteligência (INT)**, **Sabedoria (SAB)** e **Carisma (CAR)**.
- **Compra de Pontos**:
  - Todos os atributos começam em 0.
  - O jogador tem **10 pontos** para distribuir.
  - Custo progressivo:
    - Atributo 1: custa 1 ponto
    - Atributo 2: custa 2 pontos
    - Atributo 3: custa 4 pontos
    - Atributo 4: custa 7 pontos
  - É permitido reduzir no máximo um atributo para -1, ganhando +1 ponto adicional para gastar (totalizando 11 pontos).

---

## 2. Resistências e Testes de Perícia (Capítulo 2, pág. 114)

- **Não existem testes de resistência como em D&D**:
  - **Fortitude**: Perícia baseada em CON.
  - **Reflexos**: Perícia baseada em DES.
  - **Vontade**: Perícia baseada em SAB.
- **Fórmula de Teste de Perícia**:
  $$\text{Bônus} = \lfloor \frac{\text{Nível}}{2} \rfloor + \text{Modificador de Atributo} + \text{Treino} + \text{Outros Bônus}$$
  - **Treino**:
    - Níveis 1 a 6: **+2**
    - Níveis 7 a 14: **+4**
    - Níveis 15 a 20: **+6**
  - **Somente Treinada**: Algumas perícias (Ladinagem, Misticismo, Nobreza, Pilotagem, Religião, etc.) só podem ser usadas se o personagem for treinado.
  - **Penalidade de Armadura**: Aplica-se a perícias de FOR e DES que envolvem agilidade (Acrobacia, Furtividade, Ladinagem).

---

## 3. Defesa (Capítulo 5: Jogando & Capítulo 3: Equipamento)

$$\text{Defesa} = 10 + \text{DES} + \text{Bônus de Armadura} + \text{Bônus de Escudo} + \text{Outros}$$

- **Armaduras Pesadas**: Se o personagem vestir uma armadura pesada, ele **NÃO** soma seu modificador de Destreza na Defesa (a menos que uma habilidade expressamente diga o contrário).
- **Armaduras Leves**: Somam o modificador de Destreza integralmente.
- **Escudos**: Somam à Defesa e acumulam com armadura, mas possuem sua própria penalidade de armadura.
- **Empilhamento de Defesa**: Bônus de armadura e escudo não acumulam com outros bônus de mesma categoria (ex: duas armaduras não acumulam).

---

## 4. Pontos de Vida (PV) e Pontos de Mana (PM) (Capítulo 1, pág. 34)

- **PV Iniciais (Nível 1)**: $\text{PV Base da Classe} + \text{CON}$.
- **PV por Nível Subsequente**: $\text{PV por Nível da Classe} + \text{CON}$.
- **PM Iniciais (Nível 1)**: $\text{PM Base da Classe} + \text{Atributo Chave (se conjurador)}$.
- **PM por Nível Subsequente**: $\text{PM por Nível da Classe}$.
- **Mudança retroativa**: Se a CON aumentar permanentemente, os PV sobem retroativamente para todos os níveis.

---

## 5. Capacidade de Carga (Capítulo 3, pág. 142)

- **Capacidade em Espaços (Slots)**:
  $$\text{Espaços Máximos} = 10 + 2 \times \text{FOR}$$
  *(Se Força for negativa, reduz a capacidade).*
- **Sobrecarga**: Carregar mais itens do que o limite impõe penalidade de -2 em todos os testes e deslocamento reduzido.

---

## 6. Magias e Círculos (Capítulo 4: Magia, pág. 178)

- Círculos vão do **1º ao 5º círculo** (Arcana, Divina ou Universal).
- Custo básico:
  - 1º Círculo: 1 PM
  - 2º Círculo: 3 PM
  - 3º Círculo: 6 PM
  - 4º Círculo: 10 PM
  - 5º Círculo: 15 PM
- **Limite de Gasto**: O total de PM que um personagem pode gastar numa mesma magia (custo base + aprimoramentos) é limitado pelo seu **Nível de Personagem**.

---

## 7. Oficina de Itens Superiores & Encantos (Capítulo 3, pág. 164 & Capítulo 8, pág. 332)

- Uma arma, armadura ou escudo pode ter no máximo **4 melhorias mecânicas** (ex: Certeira, Cruel, Atroz, Maciça, Precisa, Equilibrada, Reforçada, Ajustada, Selada).
- **Remoção em cascata**: Pré-requisitos de melhorias são estritos (ex: *Atroz* exige *Cruel*; remover Cruel remove Atroz automaticamente).
- **Materiais Especiais**: Adamante (+1 passo de dano em armas / RD 2 em armaduras pesadas), Mitral, Gelo Eterno, Madeira Tollon, Matéria Vermelha.
- **Encantos Mágicos**: Adicionam propriedades mágicas sobrenaturais conforme Capítulo 8.

---

## 8. Regra Geral de Acúmulo de Efeitos (Capítulo 5, pág. 226)

- **Mesma Fonte Não Acumula**: Bônus provenientes da mesma magia, do mesmo poder ou de itens idênticos **não** se acumulam; aplica-se apenas o maior valor.
- **Mesmo Atributo Não Acumula**: Não é permitido somar o mesmo atributo duas vezes na mesma característica (por exemplo, somar Carisma duas vezes na Defesa), a menos que a regra especifique explicitamente.
