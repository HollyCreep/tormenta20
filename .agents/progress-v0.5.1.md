# Progresso v0.5.1 — correções e melhorias pós-release

Branch: `fix/v0.5.1`. Cada etapa termina com um commit próprio; para retomar,
veja a primeira etapa sem `[x]` e o `git log` da branch.

## Etapas

- [x] 1. Bottom sheet sobreposto pela barra de navegação do Android (safe-area) + "Ler mais" da origem sem efeito
- [x] 2. Poder duplicado entre raça/origem/divindade (mesmo poder escolhido em dois benefícios)
- [x] 3. Revalidar pré-requisitos de poderes ao mudar perícias/atributos (remover poderes que deixam de ser válidos)
- [x] 4. Benefícios de origem na etapa de equipamento (itens da origem, Herdeiro, Guarda etc.)
- [x] 5. Compra de pontos: tabela de custo (Tabela 1-1) + botão "i" com as regras (Cap. 1, pág. 17)
- [x] 6. Indicador visual padronizado ("i") em tudo que abre o modal de detalhes
- [x] 7. Barra inferior do criador: botão central "Resumo"
- [ ] 8. Verificação final (tsc, testes, lint, build) e CHANGELOG (versão/release só quando pedido)

## Notas
- Etapa 4: kit em `src/data/startingKit.ts` + `src/utils/startingKitUtils.ts`; itens do kit marcados com `kitSlot`/`kitOption`.
  Dinheiro = T$ 4d6 (+2d6 Marujo), média por padrão com botão de rolar; bônus antigos não canônicos removidos.
  Fichas antigas (sem `kitSlot`) não recebem o kit automaticamente. Pendente/ideia: item superior via Herança.
- Etapa 6: classe CSS `.has-detail` (components.css) desenha o "i" no fim de linhas que abrem detalhes; botões "Regra" ganharam <Info>.
