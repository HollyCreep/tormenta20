# Tormenta 20 — Edição Jogo do Ano (v1.3)
## Pacote de Release: Versão 0.1.0

Data de Lançamento: Outubro de 2026  
Status: **Versão Inicial Estável (0.1.0)**  
Compatibilidade de Regras: **Tormenta 20 Edição Jogo do Ano (v1.3)**

---

## 🗡️ Visão Geral

O **App Tormenta 20** é uma suíte completa, moderna e reativa para criação, gerenciamento e consulta de personagens de RPG para o sistema *Tormenta 20: Edição Jogo do Ano (v1.3)*. 

Desenvolvido com foco em estética premium (paleta temática artoniana, tipografia moderna e microinterações fluidas), o aplicativo implementa estritamente o manual oficial de regras, garantindo validação em tempo real de pré-requisitos, cálculos matemáticos automatizados, rastreamento de fontes de bônus e acesso instantâneo a citações do livro com capítulo e número de página.

---

## 🌟 Principais Recursos & Funcionalidades da Versão 0.1.0

### 1. Wizard Guiado de Criação de Personagens (8 Etapas)
- **Passo 1: Raças Artonianas (17 Raças Oficiais)**
  - Suporte completo a todas as raças do manual: Humano, Anão, Elfo, Dahllan, Lefou, Qareen, Minotauro, Medusa, Osteon, Golem, Hynne, Kliren, Goblin, Moreau, Silfo, Aggelus e Sulfure.
  - Seleção reativa de atributos variáveis (ex: humanos, lefeus, qareen), perícias adicionais e poderes raciais com validação de duplicidade.
- **Passo 2: Classes Heroicas (14 Classes Oficiais)**
  - Arcanista (com especialização em Bruxo, Feiticeiro com linhagens e Mago), Bárbaro, Bardo, Bucaneiro, Caçador, Cavaleiro, Clérigo, Druida, Guerreiro, Inventor, Ladino, Lutador, Nobre e Paladino.
  - Cálculo automático de PV e PM iniciais, proficiências em armas e armaduras e perícias de classe.
- **Passo 3: Origens do Povo de Arton (35 Origens)**
  - Validação inteligente contra duplicidade de perícias já treinadas por classe ou raça.
  - Seleção de poderes gerais concedidos pela origem e equipamentos iniciais temáticos gratuitos.
- **Passo 4: Deuses do Panteão Artoniano (20 Divindades)**
  - Os 20 deuses oficiais com suas crenças, restrições e lista de poderes concedidos.
  - Opção para personagens devotos do Panteão ou Não-Devotos.
- **Passo 5: Geração e Compra de Atributos**
  - Sistema de Compra por Pontos oficial (10 pontos base com tabela de custos progressivos).
  - Soma reativa com modificadores raciais e desdobramentos em tempo real (Defesa, Carga, PV, PM).
- **Passo 6: Treinamento de Perícias**
  - Rastreamento completo da origem do treino (*"Já treinada por Classe"*, *"Já treinada por Raça"*).
  - Cálculo automático do bônus de perícia (Metade do nível + Bônus de Atributo + Treino + Outros).
- **Passo 7: Poderes & Magias**
  - Seleção de poderes gerais e de classe com validação estrita de requisitos (nível, atributos mínimos e perícias treinadas).
  - Seleção de magias iniciais respeitando círculos e tradição (Arcana/Divina).
- **Passo 8: Equipamento & Dinheiro Inicial**
  - Cálculo automático do dinheiro inicial com base na classe e rolagem de 4d6 tibares.
  - Controle de carga e inventário (espaços máximos baseados em Força).
  - Acesso à **Oficina de Customização** para compra de itens modificados e superiores.

---

### 2. Oficina & Customização de Itens (Itens Superiores e Encantos)
- **Melhorias Mecânicas (Capítulo 3, Tabela 3-8, pág. 165)**:
  - Aplicação de até 4 melhorias (*Certeira, Pungente, Cruel, Atroz, Maciça, Precisa, Equilibrada, Alongada, Harmonizada, Injetora, Recarregável, Discreta, Reforçada, Ajustada, Sob Medida, Polida, Selada, etc.*).
  - Remoção em cascata de pré-requisitos (desmarcar *Cruel* remove automaticamente *Atroz*; desmarcar *Certeira* remove *Pungente*, etc.).
  - Efeitos aplicados reativamente no card do item:
    - *Cruel*: Eleva o dano para `1d6 + 1`.
    - *Atroz*: Substitui o dano para `1d6 + 2`.
    - *Certeira / Pungente*: Adiciona coluna de ataque `ATQ: +1` ou `ATQ: +2`.
    - *Maciça*: Eleva o multiplicador de crítico (`x3`).
    - *Precisa*: Amplia a margem de ameaça (`18/x2`).
    - *Reforçada / Ajustada*: Atualiza Defesa e Penalidade de Armadura.
- **Materiais Especiais (Tabela 3-9, pág. 166)**:
  - *Adamante* (aumenta o passo de dano da arma, ex: 1d6 ➔ 1d8, e concede RD).
  - *Gelo Eterno* (+1d6 de dano de frio e Resistência a Frio).
  - *Madeira Tollon* (-1 PM em habilidades/magias).
  - *Matéria Vermelha* (+2 ataque e dano ou +2 Defesa).
  - *Mitral* (+1 na margem de ameaça e redução drástica de penalidade/espaço).
- **Encantos Mágicos (Capítulo 8, Tabelas 8-7 a 8-10, pág. 340-344)**:
  - Aplicação de até 3 encantos mágicos com cálculo oficial de custos por patamar (+T$ 18.000 / +T$ 36.000 / +T$ 72.000).
  - Suporte a encantos ofensivos, defensivos e utilitários (*Flamejante, Congelante, Trovejante, Sagrada, Profana, Formidável, Magnífica, Defensora, Guardiã, etc.*).

---

### 3. Três Catálogos e Compêndios Oficiais
- **Catálogo de Magias (Grimório Artoniano)**:
  - 197 magias canônicas completas (1º ao 5º círculo, Arcanas, Divinas e Universais).
  - Filtros instantâneos por círculo, tipo e todas as 8 escolas de magia (*Abjuração, Adivinhação, Convocação, Encantamento, Evocação, Ilusão, Necromancia, Transmutação*).
  - Chaves compostas e IDs 100% únicos que eliminam duplicações de renderização.
  - Visualização de custos em PM, aprimoramentos oficiais e regras de conjuração.
- **Catálogo de Poderes**:
  - Centenas de poderes gerais (Combate, Destino, Magia, Tormenta) e poderes de classe.
  - Filtro exclusivo: *"Somente os que posso aprender"*.
- **Catálogo de Itens & Equipamento**:
  - Armas, armaduras, escudos, itens gerais, ferramentas e itens esotéricos.
  - Botão integrado **"Oficina & Melhorias"** diretamente no card para testar customizações.

---

### 4. Ficha de Personagem Interativa & Gestão de Dados
- **Painel de Combate**:
  - Barras dinâmicas de Pontos de Vida (PV) e Pontos de Mana (PM) com botões rápidos de dano e cura.
  - Inspetor detalhado da Defesa com fórmula passo a passo: `10 + Metade do Nível + Modificador de Destreza + Armadura + Escudo + Outros`.
- **Rastreador de Condições**:
  - Aplicação e visualização rápida de condições de combate (Abalado, Cego, Imobilizado, etc.).
- **Persistência Local**:
  - Armazenamento em `LocalStorage` com suporte para salvar múltiplos heróis.
  - Exportação e importação de fichas em formato JSON.
  - Personagens pré-cadastrados para teste rápido.

---

### 5. Utilidades e Customização de Interface
- **Rolador de Dados Flutuante**:
  - Widget retrátil com botões para d4, d6, d8, d10, d12, d20 e d100.
  - Entrada de modificadores customizados, histórico das últimas rolagens e destaque de acertos/falhas críticas.
- **Seletor de Temas**:
  - **T20 Clássico**: Dourado heróico, rubi e couro escuro tradicional.
  - **Escuro Moderno**: Cinzas profundos, azul neon e alta legibilidade.
  - **Claro**: Estilo pergaminho suave para leitura sob claridade.
- **Citações de Regras Oficiais**:
  - Ícones de informação com modal exibindo citação literal do livro, capítulo, seção, página e explicação detalhada da mecânica.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| **Linguagem** | TypeScript 5.8+ |
| **Framework UI** | React 19 (com hooks modernos `useMemo`, `useState`, `useCallback`) |
| **Build & Dev Server** | Vite 6 / Vite 8 |
| **Estilização** | Vanilla CSS Modular com Variáveis CSS / Design System Próprio |
| **Ícones** | Lucide React |
| **Efeitos Visuais** | Canvas Confetti |
| **Linter & Validação** | Oxlint & TypeScript Strict Mode (`tsc -b`) |

---

## 📦 Como Executar o Projeto

```bash
# 1. Instalar dependências
npm install

# 2. Executar o servidor de desenvolvimento
npm run dev

# 3. Validar tipagem e compilação
npx tsc --noEmit

# 4. Criar o build de produção
npm run build
```

---

## 📜 Licença e Créditos
*Tormenta 20* é uma criação de Marcelo Cassaro, Guilherme Dei Svaldi, Leonel Caldela, J.M. Trevisan e Rogério Saladino, publicado pela **Editora Jambô**. Este aplicativo é um software complementar não-comercial para suporte a jogadores e mestres.
