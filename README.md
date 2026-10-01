# ⚔️ App Tormenta 20 — Edição Jogo do Ano (v1.3)

[![Version](https://img.shields.io/badge/version-0.2.0-gold.svg)](./RELEASE.md)
[![Tormenta 20](https://img.shields.io/badge/T20-Edição%20Jogo%20do%20Ano%20v1.3-crimson.svg)](./RELEASE.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-cyan.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vitejs.dev/)

Aplicativo web moderno, intuitivo e completo para **criação de personagens, gerenciamento de fichas interativas e consulta de regras** de **Tormenta 20 — Edição Jogo do Ano (v1.3)**.

---

## 🚀 Principais Funcionalidades

- **🧙‍♂️ Wizard Guiado em 8 Passos**:
  1. **Raças (17 raças oficiais)**: Humano, Anão, Elfo, Dahllan, Lefou, Qareen, Minotauro, Medusa, Osteon, Golem, Hynne, Kliren, Goblin, Moreau, Silfo, Aggelus e Sulfure com bônus e perícias dinâmicas.
  2. **Classes (14 classes)**: Arcanista (Bruxo/Feiticeiro/Mago), Bárbaro, Bardo, Bucaneiro, Caçador, Cavaleiro, Clérigo, Druida, Guerreiro, Inventor, Ladino, Lutador, Nobre e Paladino.
  3. **Origens (35 origens)**: Proteção contra treino duplicado e escolha de poderes e equipamentos gratuitos.
  4. **Divindades (20 deuses do Panteão)**: Crenças, restrições e poderes concedidos.
  5. **Atributos**: Sistema oficial de compra por pontos (10 pontos base com tabela progressiva) e rolagem.
  6. **Perícias**: Rastreamento de origem do treino (*Classe*, *Raça*, *Origem*), bônus calculados em tempo real.
  7. **Poderes & Magias**: Validação estrita de pré-requisitos para mais de 300 poderes e magias.
  8. **Equipamento & Dinheiro**: Cálculo de tibares iniciais, limite de carga (Força) e oficina de itens.

- **🛠️ Oficina de Itens Superiores & Encantos (Capítulos 3 e 8)**:
  - Aplicação de até 4 melhorias mecânicas (*Certeira, Cruel, Atroz, Maciça, Precisa, Reforçada, Ajustada, etc.*).
  - Remoção em cascata de pré-requisitos (desmarcar *Cruel* remove automaticamente *Atroz*).
  - Reatividade no card do item (*Dano 1d6 + 1, Dano 1d8 + 2 com Adamante, Bônus de Ataque ATQ: +1, Crítico 18/x3*).
  - Materiais especiais (*Adamante, Gelo Eterno, Madeira Tollon, Matéria Vermelha, Mitral*).
  - Encantos mágicos para armas, armaduras e escudos.

- **📚 Compêndios e Catálogos Oficiais**:
  - **Catálogo de Magias (Grimório Artoniano)**: 197 magias canônicas completas (1º ao 5º círculo, Arcanas, Divinas e Universais) com filtros por escola, tipo e círculo.
  - **Catálogo de Poderes**: Centenas de poderes gerais e de classe com filtro *"Somente os que posso aprender"*.
  - **Catálogo de Itens**: Consulta de estatísticas e botão *"Oficina & Melhorias"* direto no card.

- **📜 Ficha de Personagem Interativa**:
  - Barras dinâmicas de PV e PM, cálculo de Defesa detalhado com discriminador de fontes, rastreador de condições e inventário equipado.
  - Armazenamento em `LocalStorage` com suporte para salvar múltiplos heróis e exportar/importar em JSON.

- **🎲 Rolador de Dados & 🎨 Temas**:
  - Widget retrátil flutuante de dados (d4 a d100) com modificadores e histórico.
  - 3 Temas imersivos: *T20 Clássico*, *Escuro Moderno* e *Claro*.
  - Citações de regras com livro, capítulo e página oficial do manual.

- **🔮 Oráculo de Regras MCP Server & Indexador FTS Oficial**:
  - Servidor **Model Context Protocol (MCP)** integrado para contextualização e assistência de IA sem alucinações.
  - Busca Full-Text instantânea nas 407 páginas de *Tormenta 20: Edição Jogo do Ano (v1.3)* com capítulo e página de referência.
  - Ferramentas nativas de validação determinística de regras, cálculos canônicos e catálogo de dados.

---

## 🛠️ Tecnologias

- **React 19** + **TypeScript**
- **Vite** (Build ultrarrápido)
- **Vanilla CSS** com Design System e Variáveis Customizadas
- **Lucide Icons** + **Canvas Confetti**

---

## 💻 Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/usuario/app-tormenta20.git

# Acesse o diretório
cd app-tormenta20

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173) no seu navegador.

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor local com hot-reload.
- `npm run build`: Valida o TypeScript e compila o bundle de produção.
- `npm run lint`: Executa a verificação rápida de linter com Oxlint.
- `npm run preview`: Executa localmente o bundle de produção.

---

## 📄 Notas de Release
Para consultar todos os detalhes técnicos, histórico de mudanças e compatibilidade com o sistema, confira o arquivo [RELEASE.md](./RELEASE.md).
