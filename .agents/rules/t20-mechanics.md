---
trigger: always_on
glob:
description: Mecânicas oficiais de Tormenta 20 (Edição Jogo do Ano v1.3), conferidas com o livro
---

# Compêndio de Mecânicas — Tormenta 20 Jogo do Ano (v1.3)

Todas as regras abaixo foram conferidas no texto do livro (índice `src/data/t20_manual_index.db`).
As páginas são as do livro impresso (PDF = página + 6). Na dúvida, consulte o livro com
`python .agents/tools/q.py find "<regex>"` — **nunca** complete uma regra de memória.

Implementação: fórmulas em `src/utils/rulesEngine.ts`; efeitos passivos de raças, classes, poderes e
itens em `src/utils/passiveEffects.ts` (cada efeito cita a página); condições em
`src/utils/conditionEffects.ts`; pré-requisitos em `src/utils/rulesValidation.ts`.

---

## 1. Atributos (Cap. 1, pág. 17)

- O valor do atributo **é** o modificador. Atributos: For, Des, Con, Int, Sab, Car.
- **Pontos:** todos começam em 0; 10 pontos. Custo (Tabela 1-1): 1 → 1 pt, 2 → 2 pts, 3 → 4 pts, 4 → 7 pts.
  Você pode reduzir **um** atributo para –1 e receber 1 ponto adicional.
- **Rolagem:** 4d6, descarta o menor, seis vezes; converte pela Tabela 1-1 (7 ou menos –2; 8–9 –1;
  10–11 0; 12–13 1; 14–15 2; 16–17 3; 18 4). Se os atributos somarem menos de 6, rola de novo o menor valor.
- **Inteligência positiva:** número de perícias treinadas a escolha igual ao valor (pág. 17).
- **Mínimos:** valor menor que –5 → For/Des paralisado; Con morre; Int/Sab inconsciente; Car vira NPC.
- **Aumento de Atributo** (poder de classe): +1 em um atributo, uma vez por **patamar** para o mesmo
  atributo (pág. 38). Patamares: iniciante 1º–4º, veterano 5º–10º, campeão 11º–16º, lenda 17º–20º (pág. 35).

## 2. Raças (Cap. 1, págs. 18–31)

- Modificadores na Tabela 1-2 (pág. 18). Humano, Lefou (exceto Car), Osteon (exceto Con) e Sereia/Tritão:
  +1 em três atributos diferentes.
- Habilidades com texto literal em `src/data/races.ts`. Destaques mecânicos:
  Anão +3 PV no 1º nível e +1 por nível seguinte, deslocamento 6m não reduzido por armadura ou carga;
  Elfo +1 PM por nível, +2 Misticismo e Percepção, deslocamento 12m; Goblin Pequeno (deslocamento 9m),
  +2 Fortitude; Hynne Pequeno, 6m, +2 Enganação, Des em Atletismo; Kliren uma perícia treinada extra,
  +2 Ofício; Minotauro +1 Defesa; Golem +2 Defesa, penalidade de armadura –2, 6m, **sem origem** e
  +1 poder geral; Trog +1 Defesa e +5 Furtividade sem armadura; Lefou +2 em duas perícias (pode trocar
  um bônus por um poder da Tormenta).

## 3. Classes (Cap. 1, págs. 36–84)

- PV iniciais = PV da classe + Con; por nível = PV por nível + Con. Mudança de Con é retroativa.
- **PM** = PM da classe × nível. **Conjuradores somam o atributo-chave no total de PM**
  (arcanista: Int para Bruxo e Mago, Car para Feiticeiro; bardo Car; clérigo e druida Sab).
  Paladino soma Car (Abençoado, pág. 82).
- **Proficiências:** todos sabem usar armas simples e armaduras leves (pág. 32). Armas marciais:
  bárbaro, bardo, bucaneiro, caçador, cavaleiro, guerreiro, nobre, paladino (pág. 142). Ladino,
  arcanista, clérigo, druida, inventor e lutador não têm armas marciais.
- **Multiclasse** (pág. 35): nova classe dá PV de nível subsequente, soma os PM, não concede perícias
  nem proficiências. Nível de classe ≠ nível de personagem (arcanista 3/guerreiro 2 = personagem de 5º).
- **Tabela da classe:** o que cada nível concede vem da tabela (`progression` em `classes.ts`). Poder de
  classe só nos níveis com "poder de <classe>" — o 1º nível de nenhuma classe concede poder. Habilidades
  automáticas de todos os níveis (Durão, Ataque Extra, Fúria Titânica...) estão em `abilities`.
- **Magias por nível:** 1º nível da classe → magias iniciais; arcanista e clérigo → uma por nível;
  bardo e druida → uma nos níveis pares, só das três escolas escolhidas (págs. 37, 44, 57 e 61).
- **Magias por classe:** arcanista e clérigo — 2º círculo no 5º nível, 3º no 9º, 4º no 13º, 5º no 17º;
  bardo e druida — 2º no 6º, 3º no 10º, 4º no 14º (máximo 4º); bardo e druida escolhem **três escolas**.
  Magias iniciais: arcanista 3 (Mago 4), bardo 2, clérigo 3, druida 2.
- Habilidades de 1º nível e progressão em `src/data/classes.ts` (texto do livro).

## 4. Origens (Cap. 1, págs. 85–95)

- Itens da origem gratuitos + **dois benefícios** entre perícias e poderes da lista.
- "Você recebe o poder escolhido, mas ainda precisa cumprir seus pré-requisitos." (pág. 85)
- Amnésico: uma perícia e um poder escolhidos pelo mestre + Lembranças Graduais (pág. 86).
- Herança (Herdeiro): item de até T$ 1.000; escolhido duas vezes, até T$ 2.000 (pág. 91).

## 5. Divindades (Cap. 1, págs. 96–105)

- Para ser devoto, sua **raça ou classe** deve constar em "Devotos" do deus; humanos e clérigos são exceção.
- Devoto escolhe **um** poder concedido; clérigos e druidas recebem **dois**.
- Clérigos, druidas e paladinos são devotos automaticamente; druidas só de Allihanna, Megalokk ou Oceano;
  paladinos de Azgher, Khalmyr, Lena, Lin-Wu, Marah, Tanna-Toh, Thyatis ou Valkaria (ou cultuar o bem).
- Violar Obrigações & Restrições: perde todos os PM até o dia seguinte.

## 6. Perícias (Cap. 2, págs. 114–115)

- Valor = metade do nível + atributo-chave + treino (+2; +4 no 7º; +6 no 15º) + outros.
- Uma perícia é treinada ou não (o bônus não se repete).
- **Penalidade de armadura** só em Acrobacia, Furtividade e Ladinagem (e Atletismo para nadar) —
  Tabela 2-1 e Cap. 3, pág. 153. Pilotagem **não** tem penalidade.
- **Sem proficiência** em armadura/escudo: a penalidade se aplica a todas as perícias de For e Des (pág. 152).
- **Tamanho** (Tabela 1-21, pág. 107): Minúsculo +5 / Pequeno +2 em Furtividade (manobras –5/–2).
  **Tamanho não altera a Defesa.**

## 7. Defesa (Cap. 1, pág. 106; Cap. 3, pág. 152)

- Defesa = 10 + Destreza + armadura + escudo + outros bônus.
- Armadura pesada: não aplica Destreza e deslocamento –3m.
- Nobre (Autoconfiança): pode usar Car **em vez de** Des. Bucaneiro (Insolência): soma Car, limitado
  pelo nível, sem armadura pesada. Lutador (Casca Grossa, 3º nível): soma Con, limitado pelo nível.
- Armaduras e escudos (Tabela 3-5, pág. 153): ex. armadura completa T$ 3.000, +10, –5, 5 espaços.

## 8. Carga e sobrecarga (Cap. 3, pág. 141)

- Capacidade = **10 espaços +2 por ponto de Força (ou –1 por ponto de Força negativo)**.
- **Sobrecarregado** (acima do limite): **penalidade de armadura –5 e deslocamento –3m**
  (Apêndice, pág. 395). Máximo absoluto: o dobro do limite.
- A mochila comum não ocupa nem concede espaço; a **mochila de aventureiro** vestida dá +2 espaços (pág. 157).
- Anão e golem: deslocamento não reduzido por armadura nem por carga.

## 9. Equipamento inicial (Cap. 3, pág. 140)

Itens da origem + mochila, saco de dormir e traje de viajante + uma arma simples (e uma marcial, se
proficiente) + armadura de couro, couro batido ou gibão de peles (brunea com proficiência em armaduras
pesadas; escudo leve com proficiência em escudos; arcanistas sem armadura) + **T$ 4d6**.
Nobre: Espólio, item de até T$ 2.000 (pág. 79). Inventor: Protótipo, até T$ 500 (pág. 68).

## 10. Ataque e dano (Cap. 3, págs. 142–143; Cap. 5)

- Ataque corpo a corpo: teste de **Luta**; à distância: **Pontaria**; CD = Defesa do alvo.
- Arma sem proficiência: **–5** no ataque (pág. 142).
- Força no dano: corpo a corpo e arremesso somam; disparo não soma, **exceto arco longo e funda**.
- Crítico: multiplica apenas os dados. Passos de dano: Tabela 3-2 (pág. 143).

## 11. Magias (Cap. 4)

- Custo por círculo (Tabela 4-1, pág. 170): 1 / 3 / 6 / 10 / 15 PM.
- CD = 10 + metade do nível + atributo-chave (pág. 173).
- Limite de PM por uso = nível na classe que fornece a habilidade; para raça, origem, poderes gerais e
  outras fontes, nível de personagem; sempre se pode usar o custo mínimo (Cap. 5, pág. 224). Magia
  Ilimitada soma o atributo-chave. Cada magia de classe guarda `sourceClassId`.
- **Poderes que concedem magias** (`src/data/powerSpellGrants.ts`): magia fixa (Dedo Verde, Elo com a
  Natureza...) ou à escolha (Centelha Mágica, Conhecimento Mágico, Orar, Truque Mágico, Aspectos,
  Totem Espiritual). Sem magia definida: qualquer magia de tipo e círculo que a classe possa lançar
  (Cap. 4, pág. 170). Poderes concedidos usam Sabedoria como atributo-chave (Cap. 2, pág. 132).
- **Truque:** custo zero e não combina com outros aprimoramentos (pág. 171).

## 12. Poderes (Cap. 1, pág. 33; Cap. 2)

- "Para escolhê-los e usá-los, você deve possuir todos os requerimentos." Escolhe-se no nível em que
  se atinge o pré-requisito. Não se escolhe o mesmo poder duas vezes, salvo indicação (repetíveis:
  Foco em Arma, Foco em Magia, Foco em Perícia, Proficiência, Treinamento em Perícia).
- Poderes de magia exigem lançar magias (pág. 131); concedidos exigem ser devoto do deus (pág. 132).
- Um poder escolhido em qualquer benefício (raça, origem, divindade) conta como pré-requisito dos demais.
- **Poderes da Tormenta:** –1 Car pelo primeiro e –1 a cada dois outros (pág. 136).

## 13. Condições (Apêndice, págs. 394–395)

- "Condições com os mesmos efeitos não se acumulam; aplique apenas os mais severos."
  Ex.: desprevenido + vulnerável = –5 na Defesa.
- Condições compostas: exausto = debilitado + lento + vulnerável; fatigado = fraco + vulnerável;
  agarrado = desprevenido + imóvel; cego = desprevenido + lento; inconsciente = indefeso; etc.
- Imóvel só zera o deslocamento (não altera a Defesa).

## 14. Itens superiores e mágicos (Cap. 3, págs. 164–167; Cap. 8, pág. 334)

- Até 4 melhorias; preço pelo **número** de melhorias: 1 → +T$ 300; 2 → +T$ 3.000; 3 → +T$ 9.000;
  4 → +T$ 18.000. Material especial ocupa uma melhoria e soma o preço da Tabela 3-9.
- Encantos: 1 → +T$ 18.000; 2 → +T$ 36.000; 3 → +T$ 72.000. Encantos marcados com * contam como dois.
