# Changelog - Tormenta 20: Edição Jogo do Ano (v1.3)

Todas as alterações notáveis deste projeto serão documentadas neste arquivo.

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
