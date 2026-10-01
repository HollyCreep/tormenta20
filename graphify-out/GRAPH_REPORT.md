# Graph Report - .  (2026-10-01)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 309 nodes · 762 edges · 27 communities (25 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7cf4d21d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- WizardContainer.tsx
- react
- character.ts
- rules.ts
- devDependencies
- compilerOptions
- compilerOptions
- package.json
- t20_oracle_server.py
- DetailModalData
- ThemeContext.tsx
- generate_full_spells.py
- tsconfig.json

## God Nodes (most connected - your core abstractions)
1. `react` - 25 edges
2. `DetailModalData` - 24 edges
3. `WizardContainer()` - 19 edges
4. `compilerOptions` - 18 edges
5. `SKILLS_LIST` - 16 edges
6. `CLASSES_LIST` - 15 edges
7. `CharacterSheet` - 15 edges
8. `compilerOptions` - 15 edges
9. `RACES_LIST` - 13 edges
10. `createSampleCharacters()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `plugins` --extends--> `typescript`  [EXTRACTED]
  .oxlintrc.json → package.json
- `StepEquipment()` --references--> `react`  [EXTRACTED]
  src/components/wizard/StepEquipment.tsx → package.json
- `StepRace()` --references--> `react`  [EXTRACTED]
  src/components/wizard/StepRace.tsx → package.json
- `CharacterSheetViewProps` --references--> `CharacterSheet`  [EXTRACTED]
  src/components/sheet/CharacterSheetView.tsx → src/types/character.ts
- `DetailModalData` --references--> `RuleCitation`  [EXTRACTED]
  src/components/common/DetailModal.tsx → src/data/rulesCitations.ts

## Import Cycles
- None detected.

## Communities (27 total, 2 thin omitted)

### Community 0 - "WizardContainer.tsx"
Cohesion: 0.15
Nodes (36): react, react, database, outputPath, StepClass(), StepDeity(), StepEquipment(), StepFinal() (+28 more)

### Community 1 - "react"
Cohesion: 0.12
Nodes (32): react, DetailModal(), DetailModalProps, DetailStat, ItemCard(), ItemCardProps, StatChipProps, ItemModifierModal() (+24 more)

### Community 2 - "character.ts"
Cohesion: 0.11
Nodes (23): DiceRollerWidget(), DiceRollerWidgetProps, RollResult, StatBreakdownBadge(), StatBreakdownBadgeProps, PowersCompendium(), PowersCompendiumProps, SpellsCompendium() (+15 more)

### Community 3 - "rules.ts"
Cohesion: 0.12
Nodes (19): CharacterSheetView(), CharacterSheetViewProps, StepAttributes(), ATTRIBUTES_LIST, POINT_BUY_COSTS, STANDARD_ARRAY, CLASS_POWERS_LIST, CONDITIONS_LIST (+11 more)

### Community 4 - "devDependencies"
Cohesion: 0.08
Nodes (24): oxlint, plugins, rules, react/only-export-components, react/rules-of-hooks, $schema, devDependencies, oxlint (+16 more)

### Community 5 - "compilerOptions"
Cohesion: 0.08
Nodes (23): DOM, src, vite/client, compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx (+15 more)

### Community 6 - "compilerOptions"
Cohesion: 0.10
Nodes (19): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+11 more)

### Community 7 - "package.json"
Cohesion: 0.11
Nodes (17): canvas-confetti, lucide-react, dependencies, canvas-confetti, lucide-react, react-dom, description, name (+9 more)

### Community 8 - "t20_oracle_server.py"
Cohesion: 0.16
Nodes (17): Connection, get_db_connection(), Retorna o conteúdo textual completo de uma página do manual oficial Tormenta 20…, Retorna uma citação canônica formal com referência oficial de livro, capítulo,…, Lista todas as citações e referências canônicas cadastradas no compêndio do…, Valida estritamente uma ficha ou dados de personagem de Tormenta 20 (v1.3).…, Calcula as estatísticas canônicas de um personagem segundo o T20 Edição Jogo do…, Consulta os catálogos oficiais do sistema Tormenta 20: - category: 'spells',… (+9 more)

### Community 9 - "DetailModalData"
Cohesion: 0.18
Nodes (12): DetailModalData, StepAttributesProps, StepClassProps, StepDeityProps, StepOriginProps, StepSkills(), StepSkillsProps, StepSpells() (+4 more)

### Community 10 - "ThemeContext.tsx"
Cohesion: 0.33
Nodes (6): ThemeSelector(), AppTheme, ThemeContext, ThemeContextType, ThemeProvider(), useTheme()

## Knowledge Gaps
- **78 isolated node(s):** `$schema`, `oxc`, `react/rules-of-hooks`, `warn`, `name` (+73 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `WizardContainer.tsx`, `character.ts`, `rules.ts`, `devDependencies`, `DetailModalData`, `ThemeContext.tsx`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Why does `react` connect `WizardContainer.tsx` to `package.json`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Why does `dependencies` connect `package.json` to `WizardContainer.tsx`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **What connects `$schema`, `oxc`, `react/rules-of-hooks` to the rest of the system?**
  _78 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `WizardContainer.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1493212669683258 - nodes in this community are weakly interconnected._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.12439024390243902 - nodes in this community are weakly interconnected._
- **Should `character.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11088709677419355 - nodes in this community are weakly interconnected._