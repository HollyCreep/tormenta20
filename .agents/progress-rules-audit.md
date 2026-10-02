# Auditoria de regras — fidelidade ao T20 JdA v1.3

Branch: `fix/rules-audit`. Cada etapa termina com um commit. Para retomar, veja a primeira
etapa sem `[x]`, as notas e o `git log` da branch.

Ferramenta de consulta ao livro (cópia em `.agents/tools/q.py`):
`python .agents/tools/q.py find "<regex>" [ctx] [pdf_ini] [pdf_fim]` · `page <pdf>` · `sec "<trecho>"`.

## Etapas

Ferramentas: `.agents/tools/book_extract.py` (extrai blocos do livro por título) e
`.agents/tools/export_data.cjs` (exporta `src/data/*.ts` para JSON).

- [x] 1. Origens — reconstruir de "Itens./Benefícios." + poder único (Cap. 1, págs. 85–95)
- [x] 2. Raças — reescrever atributos, tamanho, deslocamento e habilidades (Cap. 1, págs. 18–31)
- [x] 3. Poderes gerais — combate, destino, magia, concedidos e Tormenta (Cap. 2, págs. 124–137)
- [ ] 4. Pré-requisitos — validador genérico que interpreta o texto do livro (sem switch manual)
- [ ] 5. Motor — condições (Apêndice), registro de efeitos passivos, carga, sobrecarga, armadura, deslocamento, Defesa, PV, PM, perícias, magias, ataque
- [ ] 6. Classes — PV/PM, perícias, proficiências, habilidades por nível, magias iniciais, kit (Espólio/Protótipo)
- [ ] 7. Poderes de classe — textos e pré-requisitos
- [ ] 8. Divindades — devotos, poderes concedidos, obrigações
- [ ] 9. Magias — círculo, escola, execução, alcance, duração, resistência, aprimoramentos
- [ ] 10. Equipamentos — Tabelas 3-x (armas, armaduras, itens), melhorias, materiais
- [ ] 11. Documentação: `.agents/rules/*.md`, `.agents/mcp_config.json`, `rulesCitations.ts`, CHANGELOG

## Divergências encontradas (livro × app)

| # | Área | App | Livro (citação) | Status |
|---|------|-----|-----------------|--------|
| 1 | Origens | Poderes únicos parafraseados/inventados (ex.: Herança "item ou item superior", Mochileiro "nunca sofre penalidade") | Texto literal das págs. 85–95 | corrigido (etapa 1) |
| 2 | Origens | Amnésico com lista de benefícios comum | Uma perícia + um poder (mestre) + Lembranças Graduais (pág. 86) | corrigido (etapa 1) |
| 3 | Carga | 10 + 3×For (mín. 10) + 2 da mochila | 10 + 2×For (–1 por ponto negativo); mochila não dá espaço (Cap. 3, pág. 141) | etapa 5 |
| 4 | Sobrecarga | Doc: "−2 em todos os testes"; motor não aplica | Penalidade de armadura –5 e deslocamento –3m; máx. o dobro do limite (pág. 141) | etapa 5 |
| 5 | Defesa | Tamanho dá +1/+2 (Goblin, Hynne, Sílfide) | Tamanho só altera Furtividade/manobras (Tabela 1-21, pág. 107) | etapa 5 |
| 6 | Defesa | Nobre soma Car além de Des | Autoconfiança: Car EM VEZ de Des (Cap. 1, pág. 79) | etapa 5 |
| 7 | PM | Conjuradores não somam atributo-chave | Arcanista/Bardo/Clérigo/Druida somam o atributo-chave; Paladino soma Car no 1º nível | etapa 5 |
| 8 | Magias | Mesma progressão de círculos para todos | Bardo/Druida: 2º no 6º, 3º no 10º, 4º no 14º (máx. 4º) | etapa 5 |
| 9 | Perícias | Pilotagem com penalidade de armadura | Tabela 2-1: sem penalidade (pág. 115) | etapa 5 |
| 10 | Condições | "Imóvel" dá –5 Defesa; penalidades de ataque somam | Imóvel só zera deslocamento; mesmos efeitos não acumulam (pág. 394) | etapa 5 |
| 11 | Proficiências | Ladino com armas marciais; Arcanista sem armaduras leves | Ladino: nenhuma; todos usam armas simples e armaduras leves (pág. 32) | etapa 6 |
| 12 | Raças | Habilidades parafraseadas/erradas (Goblin, Hynne, Kliren, Golem, Medusa, Sílfide, Sereia, Trog, Osteon...) | Cap. 1, págs. 19–31 | corrigido (etapa 2) |
| 13 | Poderes | Atlético +1,5m; Estilo de Arma e Escudo +1; Carapaça +2; Bênção do Mana +1/nível | +3m; +2; +1 (+1 a cada 2 outros poderes da Tormenta); +1 PM a cada nível ímpar | etapa 5 |
| 14 | Poderes concedidos | Faltam vários (Escamas Dracônicas, Mente Vazia, Talento Artístico, Rejeição Divina, Voz da Civilização, Êxtase da Loucura...) | Cap. 2, págs. 132–135 | corrigido (etapa 3) |
| 15 | Equipamento | Armadura completa T$ 1.500 | T$ 3.000 (Tabela 3-5, pág. 153) | etapa 10 |
| 16 | Raças | Kliren Des +1 | Int +2, Car +1, For –1 (Tabela 1-2, pág. 18) | corrigido (etapa 2) |
| 17 | Raças | Lefou: "2 perícias OU 1 poder" | +2 em 2 perícias; pode trocar UM bônus por poder da Tormenta (pág. 24) | corrigido (etapa 2) |
| 18 | Raças | Golem escolhe origem | Propósito de Criação: sem origem, +1 poder geral (pág. 27) | corrigido (etapa 2) |
| 19 | Raças | Sem escolhas de elemento/magias (Qareen, Golem, Sereia, Sílfide) e perícia do Kliren | Escolhas guardadas em racialChoices; magias raciais salvas com atributo-chave próprio | corrigido (etapa 2) |
| 20 | Poderes | Nomes divergentes (Enciclopédico, Amedrontador, Presas) e textos com ruído do PDF | Conhecimento Enciclopédico, Olhar Amedrontador, Presas Primordiais; textos literais | corrigido (etapa 3) |
