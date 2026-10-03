# Changelog - Tormenta 20: Edição Jogo do Ano (v1.3)

Todas as alterações notáveis deste projeto serão documentadas neste arquivo.

---

## [Não lançado] — Auditoria completa das regras (T20 JdA v1.3)

### 📖 Regras conferidas com o livro
- Catálogos regenerados a partir do texto do livro: origens, poderes gerais, classes (PV/PM, proficiências, habilidades e progressão), 298 poderes de classe, divindades, 198 magias, armas/armaduras/itens (Tabelas 3-3 a 3-6), melhorias e materiais (Tabela 3-9), encantos (Tabelas 8-8 e 8-10) e 35 condições (Apêndice, págs. 394–395).
- Motor de regras: carga 10 +2 por For (–1 por ponto negativo) e sobrecarga (–5 penalidade de armadura, –3m) — Cap. 3, pág. 141; Defesa sem bônus de tamanho (pág. 107); PM com atributo-chave dos conjuradores e Car do paladino; condições sem acúmulo (aplica a mais severa); –5 sem proficiência; arco longo e funda somam For.
- Pré-requisitos de poderes de classe validados; Aumento de Atributo uma vez por patamar; poderes da Tormenta reduzem Carisma (pág. 136).
- Devoção: raça/classe devem constar nos devotos; clérigo e druida recebem dois poderes concedidos.
- Magias: Truque custa 0 e é exclusivo; bardo e druida escolhem três escolas; limite de PM por nível da classe.
- Herança pode ser escolhida duas vezes (item de até T$ 2.000) e o item herdado pode ter melhorias, desde que o preço total caiba no limite — Cap. 1, pág. 91 (vale também para Espólio e Protótipo).
- Osteon: Memória Póstuma permite ser osteon de outra raça humanoide (exceto humano), herdando uma habilidade dela e o tamanho, se não for Médio — Cap. 1, pág. 29. Os efeitos raciais agora são ligados a cada habilidade.
- Pré-requisitos no criador consideram todos os poderes já escolhidos (ex.: Estilo de Arma e Escudo da raça libera Bloqueio com Escudo na origem) — Cap. 1, pág. 33.
- Subir de nível segue a tabela da classe: sem poder no 1º nível de uma nova classe; mostra a tabela e o texto das habilidades ganhas (Ataque Especial, Fúria, Durão...); magias iniciais ao entrar numa classe conjuradora, uma por nível (bardo e druida só nos níveis pares e das suas escolas); caminho do arcanista e escolas na multiclasse.
- Limite de PM por magia usa o nível na classe que fornece a magia (raça, origem e poderes: nível de personagem), com o custo mínimo sempre permitido — Cap. 5, pág. 224.
- Poderes que concedem magias (Centelha Mágica, Conhecimento Mágico, Aumentar Repertório, Orar, Truque Mágico, Aspectos do druida, Totem Espiritual e os de magia fixa) agora pedem/registram a magia no criador, na subida de nível e na ficha — Cap. 4, pág. 170; Cap. 2, pág. 132.
- Citações de `rulesCitations.ts` verificadas literalmente; servidor MCP e documentação `.agents/rules` atualizados.

---

## [0.5.1] - 2026-10-02 — Correções pós-0.5

### 🐛 Correções
- Bottom sheets não ficam mais sob a barra de navegação do Android (usa as áreas seguras injetadas pelo Capacitor).
- "Ler mais" só aparece quando o texto está cortado; a origem ganhou "Ver detalhes" com itens, perícias e poderes.
- O mesmo poder não pode ser escolhido em dois benefícios (raça, origem, divindade) — Cap. 1, pág. 33; poderes repetíveis respeitados.
- Poderes que deixam de cumprir pré-requisitos (ao desmarcar perícia ou mudar atributo) são removidos com aviso; a origem não aceita mais poder sem requisito — Cap. 1, pág. 85.
- Equipamento inicial conforme o livro (Cap. 3, pág. 140): kit de aventureiro por proficiência, itens de cada origem (págs. 85–95, ex.: arma marcial do Guarda), poder Herança com item de até T$ 1.000 (pág. 91) e T$ 4d6 (+2d6 do Marujo); bônus de dinheiro não canônicos removidos.

### 🎨 Interface
- Compra de pontos com a Tabela 1-1 (custo e rolagem) e botão "i" com as regras completas, incluindo o único atributo em −1 (Cap. 1, pág. 17).
- Ícone "i" padronizado em tudo que abre detalhes.
- Botão "Resumo" no centro da barra inferior do criador.

### 📦 Android
- APK assinado sempre com a mesma chave (`android/app/tormenta20-debug.keystore`): novas versões instalam por cima sem desinstalar. A primeira atualização para a 0.5.1 ainda exige desinstalar uma última vez.

---

## [0.5.0] - 2026-10-02 — Redesign mobile-first e novos temas

### 🎨 Interface
- Novo design system em `src/styles/` (tokens, base, componentes, layout e telas) e primitivos em `src/components/ui/` (Sheet, Segmented, SearchField, SelectField, Switch, NumberStepper, MenuSheet, Feedback).
- Três temas reconstruídos com identidades próprias: **Clássico** ("Tomo de Arton"), **Escuro** ("Obsidiana") e **Claro** ("Pergaminho"), com prévias reais na tela de Ajustes, sem "flash" ao abrir e barra de status do Android acompanhando o tema.
- Navegação com barra inferior de 5 destinos e botão central de dados (d20); trilho lateral no desktop.
- Bandeja de dados (d4–d100, quantidade, modificador, histórico), toast de rolagem e confete no 20 natural.
- Todos os modais viraram bottom sheets (diálogos no desktop) com Esc, arrastar para fechar e botão voltar do Android.
- Ficha: vitais com teclado numérico (dano, cura e PV temporários), sheet com as 21 condições, testes rápidos de resistência, abas fixas.
- Compêndio: busca fixa, filtros em sheet com selects/segmentados e chips removíveis, listas compactas.
- Criador: escolhas em pickers com busca, barra de ação fixa, progresso por etapas e resumo vivo.
- `alert()`/`confirm()` substituídos por toasts e confirmações em sheet.

### 🐛 Correções
- Ataque com arma não aplica de novo penalidades de condição já descontadas em Luta/Pontaria; soma bônus da arma (Certeira/Pungente) — Cap. 5, pág. 230; Cap. 3, pág. 164.
- Dano corpo a corpo/arremesso soma Força (Cap. 5, pág. 230).
- Oficina na ficha cobra apenas a diferença ao melhorar um item já possuído (Cap. 3, pág. 167) e preserva o bônus de ataque.
- Magias iniciais limitadas ao 1º círculo; removidas magias padrão inexistentes; perícias/magias resetadas ao trocar de classe.
- Compra de pontos permite apenas um atributo em −1 (Cap. 1, pág. 17); conjunto padrão e rolagem permitem trocar valores entre atributos.
- Condições 11–21 inacessíveis; rodapé do criador escondido pela navegação; estado obsoleto em Subir de Nível/Adicionar Item; rótulo "Classe" em poderes de raça/origem; editar no criador perdia as anotações.

---

## [0.3.0] - 2026-10-01

### ⚔️ Novas Funcionalidades (Features)
- **Padronização de Iconografia:**
  - Alinhamento visual 1:1 entre os badges do `ItemCard` e os cartões de propriedades mecânicas do `DetailModal` (Moedas `Coins`, Carga `Weight`, Defesa `Shield`, Penalidade `ArrowDown`, Dano `Sparkles`, Crítico `Target`, Alcance `Crosshair`, etc.).
  - Botão **Detalhes** adicionado aos itens do inventário da ficha para consulta canônica imediata.
- **Auditoria de Magias Canônica:**
  - Registro explícito de conjurações como `"Lançamento da magia [Nome da Magia]"` no ChangeLog, discriminando custo de PM, aprimoramentos aplicados e saldo restante.
- **Oficina / Forja no Inventário & Edição de Riqueza:**
  - Edição de equipamentos existentes diretamente na ficha via modal de oficina (melhorias superiores, materiais especiais como Adamante e Mitral, e encantos).
  - Modal interativo para gerenciar Tibares (`T$`), com operações de recebimento (+), gasto (-) e definição manual (=), com justificativa auditada.
- **Aplicação Canônica de Condições nas Rolagens:**
  - Implementação integral do Apêndice de Condições de T20 JDA (págs. 394–395).
  - `Esmorecido` (-5 em INT, SAB, CAR e perícias mentais), `Frustrado` (-2 mental), `Debilitado/Exausto` (-5 em testes físicos e ataques), `Fraco/Fatigado` (-2), `Abalado/Apavorado`, `Desprevenido` e `Indefeso`.
  - Recálculo dinâmico em tempo real de bônus de perícias, defesas, deslocamento e penalidades discriminadas em fórmulas de rolagem.
- **Pontos de Vida Temporários (PV Temp) Auditáveis:**
  - Adição de PV Temporários na ficha com badge em ciano brilhante (`+X Temp`).
  - Absorção prioritária de dano conforme as regras oficiais (PV temporários absorvem o dano antes de afetar o PV normal).
  - Modal para somar, definir e zerar PV temporários com justificativa no histórico de auditoria.
- **Subida de Nível & Multiclasse:**
  - Modal completo de Level Up respeitando as regras de PV/PM por classe, atributos e escolha de poderes e magias.
- **Sistema de Histórico de Rolagens & Auditoria (ChangeLog):**
  - Histórico persistente de todas as rolagens com fórmulas discriminadas, filtros por categoria, tipo de dado e personagem.
  - Registro de auditoria completo para alterações de atributos, recursos, inventário, poderes, magias e condições.

### 🐛 Correções de Bugs (Bug Fixes)
- Correção de quebra de palavras e hifens soltos nos textos canônicos (`instantâ- nea`, `per- mite`).
- Correção de poderes espúrios e filtragem rigorosa de poderes gerais e de classe.
- Correção de falha ao lançar magias padrão e aprimoradas na ficha de conjuradores.
- Ajuste de compatibilidade para suporte a JSX/React em utilitários de detalhe de equipamentos.

---

## [0.2.0] - 2026-10-01
- Lançamento do Oráculo MCP (`tormenta20-oracle`) com indexação full-text do manual Tormenta 20 JDA v1.3.
- Inspeção canônica de equipamentos e validação de regras canônicas anti-alucinação.

## [0.1.0] - 2026-10-01
- Criador e gerenciador inicial de fichas de personagens de Tormenta 20.
