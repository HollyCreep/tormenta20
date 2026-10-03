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
- [x] 4. Pré-requisitos — validador genérico que interpreta o texto do livro (sem switch manual)
- [x] 5. Motor — condições (Apêndice), registro de efeitos passivos, carga, sobrecarga, armadura, deslocamento, Defesa, PV, PM, perícias, magias, ataque
- [x] 6. Classes — PV/PM, perícias, proficiências, habilidades por nível, magias iniciais, kit (Espólio/Protótipo)
- [x] 7. Poderes de classe — textos e pré-requisitos
- [x] 8. Divindades — devotos, poderes concedidos, obrigações
- [x] 9. Magias — círculo, escola, execução, alcance, duração, resistência, aprimoramentos
- [x] 10. Equipamentos — Tabelas 3-x (armas, armaduras, itens), melhorias, materiais
- [ ] 11. Documentação: `.agents/rules/*.md`, `.agents/mcp_config.json`, `rulesCitations.ts`, CHANGELOG

## Divergências encontradas (livro × app)

| # | Área | App | Livro (citação) | Status |
|---|------|-----|-----------------|--------|
| 1 | Origens | Poderes únicos parafraseados/inventados (ex.: Herança "item ou item superior", Mochileiro "nunca sofre penalidade") | Texto literal das págs. 85–95 | corrigido (etapa 1) |
| 2 | Origens | Amnésico com lista de benefícios comum | Uma perícia + um poder (mestre) + Lembranças Graduais (pág. 86) | corrigido (etapa 1) |
| 3 | Carga | 10 + 3×For (mín. 10) + 2 da mochila | 10 + 2×For (–1 por ponto negativo); mochila não dá espaço (Cap. 3, pág. 141) | corrigido (etapa 5) |
| 4 | Sobrecarga | Doc: "−2 em todos os testes"; motor não aplica | Penalidade de armadura –5 e deslocamento –3m; máx. o dobro do limite (pág. 141) | corrigido (etapa 5) |
| 5 | Defesa | Tamanho dá +1/+2 (Goblin, Hynne, Sílfide) | Tamanho só altera Furtividade/manobras (Tabela 1-21, pág. 107) | corrigido (etapa 5) |
| 6 | Defesa | Nobre soma Car além de Des | Autoconfiança: Car EM VEZ de Des (Cap. 1, pág. 79) | corrigido (etapa 5) |
| 7 | PM | Conjuradores não somam atributo-chave | Arcanista/Bardo/Clérigo/Druida somam o atributo-chave; Paladino soma Car no 1º nível | corrigido (etapa 5) |
| 8 | Magias | Mesma progressão de círculos para todos | Bardo/Druida: 2º no 6º, 3º no 10º, 4º no 14º (máx. 4º) | etapa 5 |
| 9 | Perícias | Pilotagem com penalidade de armadura | Tabela 2-1: sem penalidade (pág. 115) | corrigido (etapa 5) |
| 10 | Condições | "Imóvel" dá –5 Defesa; penalidades de ataque somam | Imóvel só zera deslocamento; mesmos efeitos não acumulam (pág. 394) | corrigido (etapa 5) |
| 11 | Proficiências | Ladino com armas marciais; Arcanista sem armaduras leves | Ladino: nenhuma; todos usam armas simples e armaduras leves (pág. 32) | corrigido (etapa 6) |
| 12 | Raças | Habilidades parafraseadas/erradas (Goblin, Hynne, Kliren, Golem, Medusa, Sílfide, Sereia, Trog, Osteon...) | Cap. 1, págs. 19–31 | corrigido (etapa 2) |
| 13 | Poderes | Atlético +1,5m; Estilo de Arma e Escudo +1; Carapaça +2; Bênção do Mana +1/nível | +3m; +2; +1 (+1 a cada 2 outros poderes da Tormenta); +1 PM a cada nível ímpar | corrigido (etapa 5) |
| 14 | Poderes concedidos | Faltam vários (Escamas Dracônicas, Mente Vazia, Talento Artístico, Rejeição Divina, Voz da Civilização, Êxtase da Loucura...) | Cap. 2, págs. 132–135 | corrigido (etapa 3) |
| 15 | Equipamento | Armadura completa T$ 1.500 | T$ 3.000 (Tabela 3-5, pág. 153) | corrigido (etapa 10) |
| 16 | Raças | Kliren Des +1 | Int +2, Car +1, For –1 (Tabela 1-2, pág. 18) | corrigido (etapa 2) |
| 17 | Raças | Lefou: "2 perícias OU 1 poder" | +2 em 2 perícias; pode trocar UM bônus por poder da Tormenta (pág. 24) | corrigido (etapa 2) |
| 18 | Raças | Golem escolhe origem | Propósito de Criação: sem origem, +1 poder geral (pág. 27) | corrigido (etapa 2) |
| 19 | Raças | Sem escolhas de elemento/magias (Qareen, Golem, Sereia, Sílfide) e perícia do Kliren | Escolhas guardadas em racialChoices; magias raciais salvas com atributo-chave próprio | corrigido (etapa 2) |
| 20 | Poderes | Nomes divergentes (Enciclopédico, Amedrontador, Presas) e textos com ruído do PDF | Conhecimento Enciclopédico, Olhar Amedrontador, Presas Primordiais; textos literais | corrigido (etapa 3) |
| 21 | Pré-requisitos | Switch manual com requisitos errados (Acrobático pedia Acrobacia; Atlético For 1 + Atletismo...) e sem níveis, poderes, devoção | Texto do livro interpretado (atributo, treino, nível, poder, "ou", Tormenta, devoto); poderes de magia exigem lançar magias (pág. 131) e concedidos exigem devoção (pág. 132) | corrigido (etapa 4) |
| 22 | Magias | calculateSpellCircleUnlocked igual para todas as classes | Por classe (págs. 37, 44, 57, 61) | corrigido (etapa 4) |
| 23 | Motor | Efeitos de raça/poder espalhados no código, vários errados | Registro único com citação (src/utils/passiveEffects.ts) | corrigido (etapa 5) |
| 24 | Ataque | Sem –5 por não proficiência; sem +2 do Anão; arco longo/funda sem Força | Cap. 3, págs. 142, 146, 148; Cap. 1, pág. 20 | corrigido (etapa 5) |
| 25 | Magias | Magia racial usava atributo da classe; limite sempre pelo nível de personagem | Atributo da habilidade; limite pelo nível da classe que concede (Cap. 5, pág. 224) | corrigido (etapa 5) |

## Notas
| 26 | Classes | Perícias "Luta ou Pontaria" contadas como escolha livre; habilidades de 1º nível parafraseadas | Campo skillAlternative validado; textos e progressão por nível do livro | corrigido (etapa 6) |
| 27 | Classes | Mago começava com 3 magias; Espólio/Protótipo ausentes; Rastreador sem efeito | Mago 4 (pág. 37); Espólio até T$ 2.000 (pág. 79); Protótipo até T$ 500 (pág. 68); +2 Sobrevivência (pág. 50) | corrigido (etapa 6) |
| 28 | Perícias | Descrições parafraseadas | Texto de abertura de cada perícia (Cap. 2, págs. 115–123) | corrigido (etapa 6) |
| 29 | Poderes de classe | 349 entradas com habilidades automáticas e notas misturadas; pré-requisitos dentro da descrição | 298 poderes do livro (págs. 37–84), pré-requisito em campo próprio e validado | corrigido (etapa 7) |
| 30 | Subir de nível | Aumento de Atributo não alterava atributo; requisito não cumprido só avisava | +1 no atributo, uma vez por patamar (págs. 35 e 38); poderes sem requisito bloqueados (pág. 33) | corrigido (etapa 7) |
| 31 | Subir de nível | Poder da Tormenta não reduzia Carisma | Perda de Carisma aplicada (Cap. 2, pág. 136) | corrigido (etapa 7) |
| 32 | Poderes de classe | Efeitos passivos ignorados (Pele de Ferro, Totem Espiritual, Sarado...) | Registrados em passiveEffects.ts com citação | corrigido (etapa 7) |
| 33 | Divindades | Poderes concedidos com textos inventados (ex.: Afinidade com a Tormenta) e descrições/obrigações parafraseadas | Texto do livro; poderes vinculados aos de generalPowers (Cap. 1, págs. 96–105) | corrigido (etapa 8) |
| 34 | Devoção | Clérigo recebia todos os poderes; sem checagem de quem pode ser devoto | 2 poderes para clérigo/druida, 1 para os demais; raça/classe em Devotos (humanos e clérigos exceção); druida/paladino com deuses próprios (pág. 96) | corrigido (etapa 8) |
| 35 | Magias | Nomes truncados (Fantasmagórico, Mortos-Vivos, Caleidoscópica...); Manto de Sombras ausente; textos parafraseados | 198 magias com execução, alcance, alvo, duração, resistência, texto e aprimoramentos do livro (Cap. 4) | corrigido (etapa 9) |
| 36 | Magias | Truque somava custo mínimo de 1 PM e combinava com aprimoramentos | Custo zero e exclusivo (Cap. 4, pág. 171) | corrigido (etapa 9) |
| 37 | Magias | Bardo/Druida sem escolha das três escolas | Escolas escolhidas no criador e magias restritas a elas (págs. 44 e 61) | corrigido (etapa 9) |
| 38 | Armas | Armas de suplementos (Adaga táurica, Katar, Nunchaku, Espada de duas lâminas, Escudo leve golpe); faltavam Katana, Machado anão, Marreta, Gadanho; Chicote/Rede marciais; Besta leve 2 espaços | Tabela 3-3 (págs. 144–145) | corrigido (etapa 10) |
| 39 | Itens gerais | Nomes e preços inventados (Kit de Ladrão, Tenda, Odre; Cajado arcano T$ 100, Orbe T$ 75, Tomo T$ 150...) | Tabela 3-6 e descrições (págs. 156–163); Mochila de aventureiro +2 espaços | corrigido (etapa 10) |
| 40 | Melhorias/materiais | Melhorias inexistentes (Alongada, Recarregável, Macia, Abundante, Resistente), faltavam 11; preços de materiais e efeitos errados (Matéria Vermelha +2/+2, Gelo Eterno +1d6, Reforçada sem penalidade) | Tabelas 3-8 e 3-9 e textos (págs. 164–167) | corrigido (etapa 10) |
| 41 | Encantos | "Guardiã" inventada; faltavam Lancinante e Piedosa; encantos que contam como dois | Tabelas 8-8 e 8-10 (Cap. 8, págs. 336–339) | corrigido (etapa 10) |
