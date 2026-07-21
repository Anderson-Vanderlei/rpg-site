# Tormenta 20 — Site Companion

> Documento de referência para o Claude Code (VS Code).
> Última atualização: julho de 2025 — todas as 14 classes revisadas.
> Planejamento e arquitetura feitos no claude.ai — implementação executada aqui.

---

## 1. Visão Geral do Projeto

Site companion para o sistema de RPG de mesa brasileiro **Tormenta 20** (Jambô Editora).
Ferramenta de consulta e interação entre jogadores e mestres — compêndio de regras,
criação de personagens e gerenciamento de campanhas.

**Stack:** HTML + CSS + JavaScript puro (sem frameworks).
**Hospedagem:** GitHub Pages (front-end estático).
**Repositório:** Anderson-Vanderlei/rpg-site
**Backend planejado (fase 2):** Firebase Auth + Firestore.

---

## 2. Identidade Visual

### Cores base (css/variables.css)
| Variável | Valor | Uso |
|---|---|---|
| --cor-fundo | #0a0a0a | Fundo global |
| --cor-primaria | #8B0000 | Carmesim |
| --cor-dourado | #c9a84c | Dourado |
| --cor-texto | #e8e8e8 | Texto principal |

### Sistema de cores por categoria
| Categoria | Cor | Hex | Seções |
|---|---|---|---|
| Personagens | Dourado | #c9a84c | Raças, Classes, Origens, Fichas |
| Magia | Roxo arcano | #7b4ccc | Magias Arcanas, Poderes de Magia |
| Combate | Carmesim | #8B0000 | Armas, Poderes de Combate, Ameaças |
| Natureza | Verde-musgo | #2d6a4f | Mundo, Atlas, Druida, Caçador |
| Divino | Azul celeste | #4a90d9 | Deuses, Magias Divinas, Clérigo, Paladino |
| Regras | Cinza | #555555 | Regras, Perícias, Condições |

### Convenções de highlight de texto (SEMPRE manter)
| Elemento | Estilo | Classe CSS |
|---|---|---|
| PV / Pontos de Vida | Negrito + vermelho vívido #e02020 | .pv-texto |
| PM / Pontos de Mana | Negrito + azul claro #44aaee | .pm-texto |
| Rolagem de dano (2d6) | Fundo laranja suave | .num-dano |
| Bônus (+2) | Fundo verde suave | .num-bonus |
| Custo PM (3 PM) | Fundo roxo suave | .num-pm |
| Penalidade (-5) | Fundo vermelho-laranja suave | .num-pen |

### Tipografia
- Títulos: Cinzel (serif medieval)
- Corpo: Crimson Text (serif literária)

---

## 3. Estrutura de Arquivos

```
rpg-site/
├── index.html
├── CLAUDE.md
├── css/
│   ├── variables.css
│   ├── style.css
│   ├── atlas.css
│   └── compendio.css
├── js/
│   ├── main.js
│   ├── atlas.js
│   ├── keywords.js                  ← sistema de keywords v2
│   ├── compendio.js                 ← lógica principal do compêndio
│   └── data/
│       ├── racas.js                 ✅ 17 raças completas
│       ├── locais.js                ✅ locais do atlas
│       ├── classes.js               ✅ 14 classes revisadas e completas
│       ├── poderes_classes.js       ✅ poderes das 14 classes revisados
│       ├── origens.js               ✅ 35 origens completas (Cap. 1, pp. 85–95)
│       ├── deuses.js                ✅ 20 divindades completas (Cap. 1, pp. 96–105)
│       ├── pericias.js              ✅ 29 perícias completas (Cap. 2, pp. 114–123)
│       ├── poderes_gerais.js        ✅ 162 poderes completos (5 categorias, Cap. 2, pp. 123–137)
│       ├── magias.js                ✅ 197 magias, Círculos 1-5 completos
│       ├── armas.js                 ✅ 40 armas + 4 munições (Cap. 3, pp. 141–151)
│       ├── armaduras.js             ✅ 12 armaduras/escudos (Cap. 3, pp. 152–154)
│       ├── itens_gerais.js          ✅ 121 itens, 9 categorias (Cap. 3, pp. 154–163)
│       ├── melhorias.js             ✅ 29 melhorias de item (Cap. 3, pp. 163–166)
│       ├── materiais_especiais.js   ✅ 6 materiais especiais (Cap. 3, pp. 166–167)
│       └── criaturas.js             ⏳ a criar
├── pages/
│   ├── atlas.html                   ✅ mapa interativo 5 camadas
│   ├── compendio.html               ✅ raças + classes + perícias + origens + deuses + poderes gerais + magias (completo) funcionando
│   ├── ficha.html                   ⏳ a criar
│   └── mestre.html                  ⏳ a criar
└── images/
    ├── mapa-arton.jpg / tamura / moreania / lamnor / doherimm
    └── hero-bg.jpg
```

---

## 4. Padrão dos Arquivos de Dados

### classes.js — campos obrigatórios
```js
{
  id, nome, subtitulo, icone, cor, imagem,
  fonte, pagina, papeis[], complexidade,
  pvInicial, pvPorNivel, pmBase,
  atributoChave, armaduraMax,
  periciasFixas[], periciasOpcoes[], periciasEscolher,
  proficiencias[], descricao, historia, quote,
  tabela: [{ nivel, habilidades }],          // 20 entradas fiéis ao livro
  habilidadesFixas: [{
    nivel, nome, descricao,
    variacaoIndex,  // OPCIONAL → renderiza banner inline abaixo desta habilidade
  }],
  variacoes: [{
    tipo, titulo, subtitulo, icone, nivel,
    opcoes: [{ id, nome, icone, chave, descricao }],
  }],
  poderes: [],    // extras além de poderes_classes.js
  escolhas: [],   // MANTER VAZIO se escolhas estão em opcoes[] de um poder
  explicacoes: [],
  racasRecomendadas[],
}
```

### poderes_classes.js — campos por objeto
```js
{
  id,
  nome,
  tipo,                  // 'ativo' | 'passivo' | 'explicacao' | 'variacao'
  custoPM,
  prerequisito,          // string legível — ex: 'Sab 1, 4º nível de bárbaro'
  descricao,
  categoriaEspecial,     // null ou string — ver §5
  condicaoAtivacao,      // string ou null — ver §7
  energiaDivina,         // 'positiva' | 'negativa' | 'dual' | null — ver §8
  opcoesModo,            // 'variacao' para banner roxo | undefined para painel verde
  opcoesTitulo,          // { icone, titulo, subtitulo } — usado com opcoesModo:'variacao'
  opcoes: [{             // painel verde (escolha) ou banner roxo (informativo)
    id, nome, icone, descricao,
    niveis: [{ label, descricao }],  // para variações com Base/Aprimorada/Superior
  }],
}
```

### pericias.js — campos por objeto
```js
{
  id, icone, nome, atributoChave,        // atributoChave: nome completo, ex: 'Destreza'
  somenteTreinada, penalidadeArmadura,   // booleans — Tabela 2-1 do livro
  descricao,                             // texto-base sempre visível (resumo de 1 linha no card)
  opcoes: [{ nome, icone, descricao }],  // painel verde reaproveitado — categorias (Ofício), SEM niveis[]
  notaGeral: {                           // painel dourado reaproveitado — regra de subsistema
    titulo, subtitulo, icone, itens[],
  },
  usos: [{                               // sub-habilidades nomeadas com CD própria
    nome, cd,                            // cd: number | 0 | null (null = "varia", não mostra badge)
    apenasTreinado,                      // true → mostra tag "Apenas treinado"
    descricao,
    tabela: { colunas[], linhas[][] },   // OPCIONAL — renderiza <table> em vez de só prosa (ex: Jogatina)
  }],
}
```
Regra: uma perícia só fica clicável/expansível (`per-expandivel`) se tiver `usos.length > 0`,
`opcoes.length > 0` OU `notaGeral` definido. Sem nenhum dos três, a linha é só informativa
(ex: Luta, Pontaria, Iniciativa).

**IMPORTANTE — todo arquivo de dados novo PRECISA terminar com:**
```js
if (typeof window !== 'undefined') window.NOME_DA_CONSTANTE = NOME_DA_CONSTANTE;
```
`const` no escopo global NÃO vira propriedade de `window` automaticamente — só `var` faz isso.
Sem essa linha, `compendio.js` não enxerga os dados e falha silenciosamente (sem erro no console).
*(Causou um bug real na primeira versão de pericias.js — vide histórico.)*

---

## 5. Mecânicas Expansíveis — categoriaEspecial

Agrupa poderes em sub-seções colapsáveis. Suplementos adicionam novos poderes
com o valor certo sem mudar o código.

### catLabels em compendio.js (registrados)
| Valor | Título | Ícone | Classes |
|---|---|---|---|
| musica | Músicas de Bardo | ti-music | Bardo |
| bravata | Bravatas | ti-speakerphone | Bucaneiro |
| brado | Brados | ti-speakerphone | Bárbaro |
| postura | Posturas de Combate | ti-shield | Cavaleiro |
| armadilha | Armadilhas | ti-tools | Caçador |
| missa | Missas | ti-candle | Clérigo |
| julgamento | Julgamentos Divinos | ti-gavel | Paladino |
| virtude | Virtudes Paladinescas | ti-star | Paladino |
| aura | Auras Sagradas | ti-sun | Paladino |
| linhagem | Linhagens Sobrenaturais | ti-dna | Arcanista |
| forma | Formas Selvagens | ti-paw | Druida |
| golpe-pessoal | Golpe Pessoal | ti-tool | Guerreiro |
| engenhoca | Engenhocas | ti-tool | Inventor |
| alquimia | Alquimia & Livro de Fórmulas | ti-flask | Inventor |
| automato | Autômato | ti-robot | Inventor |
| companheiro | Companheiro Animal | ti-paw | Druida, Caçador |
| parceiro | Tipos de Parceiro | - | Geral (keywords) |

### Objeto tipo 'explicacao' (painel dourado)
```js
{
  id: '_explicacao-categoria',
  tipo: 'explicacao',
  categoriaEspecial: 'valor',
  nome: 'Como Funciona...',
  subtitulo: '...',
  icone: 'ti-...',
  itens: ['Item 1', 'Item 2'],
}
```

### Objeto tipo 'variacao' (banner roxo dentro da seção)
```js
{
  id: '_variacao-formas',
  tipo: 'variacao',
  categoriaEspecial: 'forma',
  titulo: 'Formas Disponíveis',
  subtitulo: '...',
  icone: 'ti-paw',
  opcoes: [{ id, nome, icone, descricao ou niveis[] }],
}
```

---

## 6. Sistema de Painéis do Compêndio

| Tipo | Cor | CSS | Quando usar | Usado em |
|---|---|---|---|---|
| Variação inline | Roxo suave | .cp-var-inline | Caminho/Linhagem abaixo da habilidade fixa (variacaoIndex) | Classes |
| Variação em seção | Roxo suave | renderVariacaoEmSecao | Banner informativo dentro de categoriaEspecial | Classes |
| Escolha no poder | Verde suave | .cp-escolha via opcoes[] | Familiares, Totens, Companheiro, categorias (Ofício) — escolha permanente ou lista de exemplos | Classes, Perícias |
| Explicação | Dourado suave | .cp-explicacao | Regras de subsistemas (Músicas, Bravatas, Perícias de Resistência) | Classes, Perícias |

**`.cp-escolha` e `.cp-explicacao` são componentes genéricos, não exclusivos do painel de classe.**
Qualquer página nova pode reaproveitá-los — só precisa: (1) usar as mesmas classes CSS,
(2) garantir que o container pai (`.per-linha`, `.cp-poder` etc.) tenha uma regra
`display:none` → `.aberto .cp-escolha/.cp-explicacao { display:block }` pra sincronizar com o
estado de expansão local da página. Ver `js/data/pericias.js` (Ofício usa `.cp-escolha`,
as três perícias de resistência usam `.cp-explicacao` via `NOTA_RESISTENCIA` compartilhada).

### Kw-pericia é clicável (cross-page link)
Nomes de perícia destacados em qualquer descrição (`.kw-pericia`) chamam
`window.irParaPericia(nome)` no clique — troca pra seção Perícias, reseta filtros,
expande e rola até a linha correspondente. Modelo pra futuros links cruzados
(ex: `.kw-poder` → abrir o poder direto, quando Magias/Origens existirem).

### Regra do variacaoIndex
Habilidade fixa com `variacaoIndex: N` → banner renderizado inline abaixo da descrição.
A variação é marcada como já renderizada e não aparece na seção separada.

### Regra das opcoes[]
- `opcoesModo: 'variacao'` + `niveis[]` → banner roxo em coluna (Formas Selvagens, Golpe Pessoal)
- `opcoesModo: 'variacao'` sem `niveis[]` → banner roxo simples (Caminho do Arcanista inline)
- Sem `opcoesModo` → painel verde de escolha permanente (Familiar, Totem, Companheiro)

---

## 7. condicaoAtivacao — Catálogo Completo

Campo que indica em qual estado ativo o poder funciona.
**NÃO implementar lógica visual agora** — catalogar para a ficha interativa.

| Valor | Descrição | Poderes afetados |
|---|---|---|
| furia | Bárbaro em Fúria ativa | Frenesi, Espírito Inquebrável, Totem Espiritual |
| inspiracao | Bardo sob Inspiração ativa | Arte Mágica, Esgrima Mágica, Golpe Mágico, Golpe Elemental |
| marca-da-presa | Caçador com Marca da Presa ativa | Inimigo |
| agarrado-adversario | Lutador agarrando um adversário | Chave, Imobilização |
| ataque-furtivo | Ladino aplicando Ataque Furtivo | Assassinar, Ladrão Arcano, Roubo de Mana |
| golpe-relampago | Lutador usando Golpe Relâmpago | Golpe Imprudente |
| trocacao | Lutador usando Trocação | Sequência Destruidora |
| forma-selvagem | Druida em Forma Selvagem | Magia Natural, Presas Afiadas |
| estrategista | Nobre usando poder Estrategista | General |
| presenca-aristocratica | Nobre com Presença Aristocrática | Presença Majestosa |
| palavras-afiadas | Nobre usando Palavras Afiadas | Grito Tirânico |
| aura-sagrada | Paladino com Aura Sagrada ativa | Aura Antimagia, Aura Ardente, Aura de Cura, Aura de Invencibilidade, Aura Poderosa |
| golpe-divino | Paladino usando Golpe Divino | Fulgor Divino |

---

## 8. energiaDivina — Sistema de Energia Divina

Campo nos poderes do Clérigo e Paladino que identifica a polaridade energética.

| Valor | Badge | Cor | Quando usar |
|---|---|---|---|
| positiva | ☀️ Energia Positiva | #c9943a | Exclusivo de energia positiva |
| negativa | 🌙 Energia Negativa | #9060c8 | Exclusivo de energia negativa |
| dual | ☯ Positiva / Negativa | #998060 | Funciona em ambas, com efeitos diferentes |

**Clérigo:** escolhe ao se tornar devoto (depende da divindade). Alguns deuses permitem escolha livre.
**Paladino:** sempre energia positiva (sem exceção no livro básico).

Poderes com energiaDivina no dado atual:
- Clérigo: canalizar-energia (dual), expulsar-comandar-mortos-vivos (dual — poder único, efeito depende da energia canalizada), magia-sagrada-profana (dual), simbolo-sagrado-energizado (dual), canalizar-amplo (dual)
- Paladino: aura-ardente (positiva), cura-pelas-maos (positiva)

**Cross-link com Deuses:** a tag `.e-divina` nos poderes agora é clicável — chama
`irParaDeusesPorEnergia(energia)`, que troca pra seção Deuses e já aplica o filtro
correspondente. `deuses.js` usa as MESMAS classes CSS (`.e-positiva`/`.e-negativa`/`.e-dual`)
e o mesmo vocabulário (`dual` = "Qualquer" na UI de Deuses). O caminho inverso já existe
também: no painel de um Deus, cada nome em Devotos → Raças/Classes é clicável.

---

## 9. Sistema de Keywords (js/keywords.js v2)

`processarKeywords(texto)` — chamar SEMPRE em descrições antes de inserir no DOM.
NUNCA aplicar em: nomes, títulos, subtítulos, badges, tabelas.

### Auto-detecção numérica
| Padrão | Classe CSS | Cor |
|---|---|---|
| 2d6, 1d8 | .num-dano | Laranja |
| +2, +5 | .num-bonus | Verde |
| 3 PM | .num-pm | Roxo |
| -5, –2 | .num-pen | Vermelho-laranja |

### Tipos de keyword
| Tipo CSS | Cor | Inclui |
|---|---|---|
| .kw-acao | Laranja #e09050 | ação padrão/movimento/livre/completa, reação |
| .kw-atributo | Dourado #c9a84c | Força, Destreza, Constituição, Int, Sab, Car |
| .kw-alcance | Verde #88bb66 | alcance curto/médio/longo/visual/toque |
| .kw-duracao | Teal #5bb8b0 | até o fim da cena, permanente, sustentado... |
| .kw-combate | Roxo #a080d8 | acerto crítico, redução de dano, margem... |
| .kw-pericia | Azul #6090d0 | todas as 29 perícias |
| .kw-cond | Vermelho #d06060 | todas as 35 condições do apêndice |
| .kw-parceiro | Âmbar #c07a30 | Ajudante, Assassino, Atirador, Fortão, Guardião, Perseguidor, Montaria, Combatente, Destruidor, Médico, Magivocador, Vigilante |

---

## 10. Habilidades PM Escaláveis — Catálogo Completo

16 habilidades identificadas com padrão "gastar N PM → N bônus".
Na ficha de personagem precisarão de componente de input PM compartilhado.

| # | Habilidade | Classe | Padrão | Obs. |
|---|---|---|---|---|
| 1 | Fúria | Bárbaro | +1 PM / 5 níveis → +1 bônus | Ativa no turno |
| 2 | Inspiração | Bardo | +2 PM / 4 níveis → +1 bônus | Ativa no turno |
| 3 | Marca da Presa | Caçador | 1 PM base + escala por nível | Ativa no turno |
| 4 | Baluarte | Cavaleiro | 1 PM → +2; +1 PM / 4 níveis → +2 mais | **Reativa** (ao ser atacado) |
| 5 | Duelo | Cavaleiro | 2 PM base + +1 PM / 5 níveis → +1 mais | Ativa no turno |
| 6 | Canalizar Energia | Clérigo | N PM → N×1d6 | Input livre |
| 7 | Ataque Especial | Guerreiro | 1 PM → +4; +1 PM / 4 níveis → +4 mais | Ativa no turno |
| 8 | Engenhosidade | Inventor | 2 PM → +Int em perícia | Limitado por Int |
| 9 | Agite Antes de Usar | Inventor | N PM → N dados extras | Limitado por Int |
| 10 | Ajuste de Mira | Inventor | N PM → +N dano à distância | Limitado por Int |
| 11 | Farmacêutico | Inventor | N PM → N dados extras de cura | Limitado por Int |
| 12 | Pedra de Amolar | Inventor | N PM → +N dano corpo a corpo | Limitado por Int |
| 13 | Orgulho | Nobre | N PM → +2N em teste de perícia | Limitado por Car |
| 14 | Gritar Ordens | Nobre | N PM → +N em perícias de aliados | Limitado por Car |
| 15 | Golpe Divino | Paladino | 2 PM base + +1 PM / 4 níveis → +1d8 mais | Ativa no turno |
| 16 | Cura pelas Mãos | Paladino | 1 PM base + +1 PM / 4 níveis → +1d8+1 mais | Ativa no turno |

**Nota para a ficha:** Baluarte e Duelo (Cavaleiro) são **reativos** — o botão de ativação aparece quando o personagem é atacado, não no início do turno. Diferente dos demais.

---

## 11. Mecânicas Especiais por Classe — Notas para a Ficha

### Arcanista
- **Caminho** (Bruxo/Mago/Feiticeiro) define atributo-chave para magias.
- **Linhagens** (Feiticeiro): cadeia Básica → Aprimorada → Superior.
- **Raio Arcano**: poder standalone que escala com círculos de magia.

### Bárbaro
- **Fúria**: estado ativo. Proibição de ações que exijam concentração.
- **Totens**: em opcoes[] do poder Totem Espiritual.

### Bardo
- **Músicas**: requerem Atuação treinada + instrumento.
- **Magias**: 2 iniciais, aprende a cada nível par, 3 escolas, max 4º círculo.

### Bucaneiro
- **Audácia**: gastar 2 PM para +Car em teste de perícia (não ataque).
- **Insolência**: soma Car na Defesa, limitado por nível (sem armadura pesada).
- **Evasão/Esquiva/Evasão Aprimorada**: exigem liberdade de movimentos.

### Caçador
- **Marca da Presa**: PM escalável — 1 PM base + mais PM para mais dados.
- **Explorador**: repete em 5 níveis (3, 7, 11, 15, 19). Interface de terrenos.
- **Companheiro Animal**: 7 tipos com exemplos de animais (opcoes[]).

### Cavaleiro
- **Baluarte e Duelo**: PM escaláveis **reativos** — diferentes dos ativos.
- **Posturas**: só uma ativa por vez. "Assumir postura = ação de movimento + 2 PM."
- **Caminho** (Bastião/Montaria): banner inline no 5º nível.

### Clérigo
- **energiaDivina**: positiva ou negativa (depende da divindade). Ver §8.
- **Canalizar Energia**: PM escalável livre (N PM → N×1d6).
- **Missas**: regras próprias (1h + T$25, máx 1 + Sab pessoas, dura 1 dia).
- **Devoto Fiel**: 2 poderes concedidos (não 1 como outros devotos).

### Druida
- **Magias**: mesmo padrão do Bardo (2 iniciais, nível par, 3 escolas, max 4º círculo).
- **Devoto Fiel**: 3 deuses disponíveis (Allihanna, Megalokk, Oceano).
- **Forma Selvagem**: modo de combate — transforma atributos dinamicamente.
  - `opcoesModo: 'variacao'` com `niveis[]` (Base/Aprimorada/Superior).
  - `condicaoAtivacao: 'forma-selvagem'` em Magia Natural e Presas Afiadas.
- **Aspectos das Estações**: cadeia de dependência:
  - Primavera + Outono → Espírito dos Equinócios
  - Inverno + Verão → Espírito dos Solstícios
- **Companheiro Animal**: 7 tipos com animais de exemplo (opcoes[]).

### Guerreiro
- **Ataque Especial**: PM escalável (+4 / +1 PM a cada 4 níveis).
- **Golpe Pessoal**: combinador de efeitos (14 positivos + 3 negativos).
  - `opcoesModo: 'variacao'` com todos os efeitos e custos PM.
  - Interface de "montagem de combo" na ficha.

### Inventor
- **5 PM escaláveis** ligados à Inteligência como limitador.
- **Engenhocas**: sistema complexo (fabricação, ativação, CD, limite = Int, enguiça).
- **Autômato**: parceiro mecânico com 7 tipos (opcoes[]).
- **Livro de Fórmulas**: regras de poções com círculos progressivos.
- **Fabricar Item Superior/Mágico**: progressão em níveis específicos — display ativo na ficha.

### Ladino
- **Ataque Furtivo**: só quando atinge (não apenas ataca). Imune a críticos = imune a AF.
- **Especialista**: não pode usar em testes de ataque.
- **Evasão**: exige liberdade de movimentos (igual ao Bucaneiro).

### Lutador
- **Briga**: pode causar dano letal ou não letal sem penalidade.
- **Golpe Relâmpago**: 1 PM (não 2) — ataque extra na ação agredir.
- **Casca Grossa**: bônus é Con na Defesa + 1 por 4 níveis (armadura PESADA veta).

### Nobre
- **Orgulho e Gritar Ordens**: PM escaláveis livres, limitados por Carisma.
- **Palavras Afiadas**: dano psíquico não letal; ao chegar a 0 PV, criatura obedece.
- **Virtudes Paladinescas do Nobre** → NÃO EXISTEM. Não confundir com o Paladino.
- **Grito Tirânico**: existe no livro — usa Palavras Afiadas como ação completa.

### Paladino
- **energiaDivina**: sempre positiva (sem exceção no livro básico).
- **Golpe Divino e Cura pelas Mãos**: ambos PM escaláveis (+1 PM / 4 níveis).
- **Bênção da Justiça** (Égide/Montaria): banner inline no 5º nível (variacaoIndex: 0).
- **Auras**: exigem Aura Sagrada ativa (condicaoAtivacao: 'aura-sagrada').
- **Virtudes Paladinescas**: bônus progressivo de PM (+1/+3/+6/+10/+15 por qtd de virtudes).
- **Julgamentos**: proferir = ação de movimento. Duram até o fim da cena.

---

## 12. Status do Compêndio

### Concluído ✅
- Sidebar hierárquica, hambúrguer mobile, breadcrumb, localStorage de navegação
- 17 raças com dados oficiais (Cap. 1, pp. 18–31)
- Atlas com 5 camadas de mapa
- keywords.js v2 — auto-detecção numérica + regex pré-compilados + 8 tipos + tipos de parceiro
- **14 classes revisadas e completas** em classes.js + poderes_classes.js
- Painel de classe: variação inline, filtros, busca, slider de nível,
  badge de duração, botão adicionar ao personagem, categorias colapsáveis,
  badge de energiaDivina, badge de condicaoAtivacao visual, tag Bônus (auto-detectada),
  tag de fonte/suplemento, estado de seleção persistente em opcoes[] (localStorage)
- **29 perícias completas** em pericias.js (Cap. 2, pp. 114–123) — lista compacta agrupada
  por atributo, grid responsivo (auto-fit), filtros por atributo + Treinada/Armadura,
  busca com auto-expansão de uso encontrado, painel de escolha (Ofício), painel de
  explicação (Perícias de Resistência), tabela renderizada (Jogatina), link cross-page
  poder → perícia via kw-pericia
- **35 origens completas** em origens.js (Cap. 1, pp. 85–95, Tabela 1-19) — grid de cards
  (não lista, por ter texto de sabor), painel de detalhe reaproveitando `.detalhe-painel`/
  `.dp-*` das raças, seção de Poder Único destacada (reaproveita linguagem visual dourada
  de `.cp-explicacao`), filtro por tema (13 temas, invenção nossa — livro não categoriza
  oficialmente), busca cobrindo nome/descrição/itens/perícias/poderes gerais/poder único/
  escolha livre, `poderesGeraisOferecidos[]` como strings soltas até `poderes_gerais.js`
  existir, nav lateral expansível (igual Raças/Classes) pra Origens e Perícias
- **17 raças corrigidas** contra o livro (14/jul) — as 9 raças raras (Golem, Hynne, Kliren,
  Medusa, Osteon, Sereia/Tritão, Sílfide, Suraggel, Trog) tinham habilidades com nomes e
  mecânicas **inventados/aproximados**, não extraídos do livro; todas as 9 foram reescritas
  com o texto oficial. Também corrigido: Elfo faltava a habilidade Sentidos Élficos por
  inteiro; Golem e Hynne tinham deslocamento errado (6m, não 9m); Kliren tinha tamanho
  errado (Médio, não Pequeno — nenhuma habilidade real dele muda tamanho); Sílfide tinha
  tamanho errado (Minúsculo, não Médio); Suraggel misturava bônus de atributo dentro do
  nome da habilidade em vez de usar os campos atributos/penalidade já existentes.
- **20 divindades completas** em deuses.js (Cap. 1, pp. 96–105, Tabela 1-20 — Panteão dos
  Vinte) — cards simples (ícone, nome, descrição curta, tag Tormenta 20 + tag de energia
  reaproveitando `.e-divina`/`.e-positiva`/`.e-negativa`/`.e-dual` já usada em Clérigo/
  Paladino), painel de detalhe largo (`#deusPainel { width:460px }`, override específico
  sobre `.detalhe-painel`) com texto narrativo completo (`lore`, paráfrase fiel — não
  verbatim do livro, por direitos autorais) + Crenças e Objetivos + Símbolo Sagrado + Arma
  Preferida + Devotos (separados em Raças/Classes, clicáveis via `irParaRaca`/`irParaClasse`
  já existentes) + Poderes Concedidos (strings soltas, mesma lógica do `poderesGeraisOferecidos`
  de Origens) + Obrigações e Restrições (texto padrão, sem caixa colorida). Casos especiais:
  Aharadak/Thwor/Valkaria sem lista fechada de devotos (`devotosNota`), Lena/Marah sem arma
  preferida (`armaPreferidaNota`, regra de não poder lançar Arma Espiritual). Link cross-page
  nos dois sentidos: card de Deus → Raça/Classe (Devotos clicáveis) e poder de Clérigo/
  Paladino → Deuses filtrado pela mesma energiaDivina (`irParaDeusesPorEnergia`).
- **Poderes Gerais — as 5 categorias completas** (162 poderes) em poderes_gerais.js
  (Cap. 2, pp. 123–137): Combate (40), Destino (20), Magia (8), Concedidos (72 nomes
  únicos — 80 "slots" nos 20 deuses, vários compartilhados), Tormenta (22). Mesmo schema
  de poderes_classes.js + campo novo `categoria`. Reaproveita `renderPoderHtml()` inteiro,
  sem nenhuma mudança nele — só usa `window._classeAtualId = 'geral'` como chave pseudo-
  classe pro botão "Adicionar ao Personagem" persistir no localStorage. Concedidos batido
  100% contra `poderesConcedidos[]` de deuses.js (nada faltando, nada sobrando). Extração
  teve bastante embaralhamento de coluna (pior que Raças) — validado cruzando com as
  tabelas oficiais do livro (Tabela 2-5 de Combate, etc.) e com o próprio deuses.js.
- **Nova página "Todos os Poderes"** (`#secao-poderes-todos`) — clicar no cabeçalho
  "Poderes" do menu (não numa das 5 subcategorias) mostra as 5 categorias juntas
  (162 poderes), agrupadas com cabeçalho por categoria (igual Perícias por atributo),
  ordem alfabética dentro de cada grupo, filtro por categoria + tipo + busca. Botões de
  alternância lista única / duas colunas (`pg-modo-lista`/`pg-modo-colunas`) no canto
  direito, porque grid automático (auto-fit) tinha ficado estranho em tela ultrawide —
  usuário preferiu controle manual explícito em vez de reflow automático.
- **4 melhorias aplicadas em Poderes Gerais** (14/jul), depois de todas as 5 categorias
  prontas (adiadas de propósito até esse ponto):
  - Busca em `renderPoderesGeraisNaSecao()` agora cobre `prerequisito` também
  - `kw-poder-geral`: nomes dos 162 poderes viram link clicável em QUALQUER descrição
    do site (poderes de classe, outras origens etc.) — construído dinamicamente a partir
    de `window.PODERES_GERAIS` dentro de `processarKeywords()` (não duplica os 162
    nomes em keywords.js, só lê o arquivo de dados uma vez e cacheia)
  - Tag cinza de categoria (Combate/Destino/.../Tormenta) no rodapé de cada card de
    poder geral — não aparece em poderes de classe, que não têm o campo `categoria`
  - Filtro "Bônus" (reaproveita `poderEhBonus()` já existente) nas 5 páginas + na
    combinada
  - Bônus: chips de Poderes Concedidos no painel de um Deus agora são clicáveis,
    levando direto pro poder filtrado em Poderes Concedidos (`irParaPoderGeral`)
- **Bug de CSS corrigido:** `.num-pen` (penalidades tipo –2, gerado pelo `keywords.js`
  desde sempre) nunca teve regra de estilo — só `.num-bonus`/`.num-dano`/`.num-pm`
  existiam. Penalidades apareciam sem cor nenhuma em TODO o site. Uma linha de CSS
  resolveu globalmente (achado do usuário, 14/jul).
- **Magias — capítulo inteiro completo, 197 magias** (Cap. 4, pp. 168–211): Círculo 1
  (53), 2 (48), 3 (40), 4 (30), 5 (25). Extraído círculo por círculo com o mesmo padrão
  de Poderes Gerais (embaralhamento de coluna intenso — bastante conteúdo de uma magia
  contaminando outra, resolvido com cross-check linha a linha). Página com 4 seções
  (Todas/Arcanas/Divinas/Universais), painel de detalhe único, grade de estatísticas,
  seletor interativo de aprimoramentos com stepper/checkbox e Truque exclusivo, PM total
  ao vivo. Depois de completo, 3 melhorias aplicadas:
  - Busca cobrindo alcance/execução/resistência, além de nome/descrição
  - `kw-magia`: nomes das 197 magias viram link clicável em qualquer descrição do site,
    igual `kw-poder-geral` (mesmo esquema dinâmico, sem duplicar nomes)
  - Tag "Requer Nº círculo" extraída do texto do aprimoramento em tempo de render
    (`extrairRequerCirculo()`) e destacada como badge dourada com cadeado — 143 dos 508
    aprimoramentos do capítulo (quase 30%) têm essa exigência
  - **21 magias com seletor de "Efeitos à Escolha"** (`opcoes: [{nome, descricao}]`,
    abas clicáveis) pra magias com múltiplos efeitos nomeados à escolha ao lançar
    (Controlar Água/Fogo/Terra/Madeira, Rogar Maldição, Aprisionamento, Desejo,
    Intervenção Divina, Manto do Cruzado, Terremoto, Palavra Primordial, Criar/Conjurar
    Elemental(al) etc.) — mesmo padrão de campo já usado em `poderes_classes.js`
  - **2 magias com `tabela`** (Vidência — modificador por grau de conhecimento; Animar
    Objetos — estatísticas por tamanho) reaproveitando `renderTabelaUso()` de Poderes
  - Achados de bônus durante a extração (magias que faltavam e apareceram contaminando
    outras): Hipnotismo (Círculo 1), Globo da Verdade de Gwen (Círculo 2), Segunda Chance
    (Círculo 5, nome confirmado pelo usuário conferindo o livro)
  - Uma pendência real restou: um fragmento sem nome nem descrição (só stats + 2
    aprimoramentos de dano) não identificado — ver cabeçalho de `magias.js`

### 🔑 Lição aprendida — qualidade de extração de PDF
A extração raw (`pdftotext` sem `-layout`) de capítulos com diagramação em 2 colunas e
muitas caixas de texto (Raças, com boxes de citação e arte espalhados) embaralha a ordem
do texto de forma que sentenças de uma seção aparecem coladas em outra, sem aviso. Isso já
causou dados fabricados sem querer numa extração anterior a este projeto. Mitigação que
funcionou bem: extrair página a página (`-f N -l N`) em vez do capítulo inteiro de uma vez,
e SEMPRE cross-checar contra pelo menos duas fontes (raw + layout) quando o conteúdo não
bater com o que já existe no site. O capítulo de Poderes Gerais teve o pior embaralhamento
até agora — várias descrições apareciam sob o cabeçalho errado, só foi possível resolver
cruzando cada texto com as tabelas oficiais (nome + pré-requisito) e, no caso de Concedidos,
cruzando também com `poderesConcedidos[]` já existente em deuses.js.

### 🔑 Lição aprendida — prompts aplicados parcialmente
Em Poderes Concedidos (14/jul), 3 prompts seguidos entraram só parcialmente (faltou a
inicialização automática, depois a busca) sem erro nenhum aparecer — só sintoma silencioso
(lista vazia até clicar num filtro; busca sem efeito). Criamos um checklist de `grep -c`
pra rodar depois de aplicar qualquer prompt de uma categoria nova, conferindo de uma vez
que TODAS as peças entraram (dado, HTML, busca, inicialização, script). Vale reaproveitar
esse checklist sempre que uma seção nova tiver mais de 2-3 prompts.

### 📋 Melhorias futuras anotadas (não é falta de tempo, é decisão de fazer depois)
- **Poderes Gerais / Todos os Poderes:** em telas pequenas, os filtros (6 de categoria +
  4 de tipo + busca = a página com mais filtros do site) ficam "achatados"/apertados
  mesmo com quebra de linha automática. Precisa de uma solução melhor pra mobile
  (dropdown? sheet deslizante? colapsar num menu "Mais filtros"?) — ainda não decidido.
### Revisão Final Pendente ⚠️
Após inspeção do usuário, aplicar os ajustes apontados:
1. Verificar hierarquia de níveis em todas as habilidades fixas
2. Confirmar que toda classe tem habilidade fixa no nível 20
3. Verificar condicaoAtivacao em todos os poderes que dependem de estado ativo
4. Verificar energiaDivina em todos os poderes relevantes do Clérigo e Paladino
5. Verificar categoriaEspecial de todos os poderes expansíveis
6. Verificar keywords em todas as descrições
7. Preparar prerequisitoValidacao[] para as mecânicas da ficha
8. **pericias.js não passou pelo ciclo normal de verificação** (IA rascunha → usuário
   confere linha por linha contra o livro) — foi extraído e escrito direto do PDF.
   Números (CD, dados) foram conferidos com cuidado; vale reler as descrições mais
   longas (Acrobacia, Enganação, Misticismo) contra o livro quando houver tempo.
9. **origens.js também não passou pelo ciclo normal de verificação**, mesma situação
   do item 8. Validação cruzada automática confirmou as contagens de perícias/poderes
   de 34 das 35 origens contra a Tabela 1-19 (Amnésico tem regra própria, diverge por
   design), mas a leitura humana linha a linha ainda não rolou.
10. **Melhorias visuais/UX da página de Origens** apontadas em revisão (13/jul):
    - Menu lateral não fecha os outros grupos ao expandir um novo (Raças/Classes/
      Perícias/Origens juntos = ~95 itens visíveis de uma vez) — um acordeão de
      verdade resolveria
    - Cards de origem sem `line-clamp` na descrição (`.oc-hook`) — cards na mesma
      fileira do grid podem ficar com alturas bem desiguais, já que a lista de
      Itens também varia muito (1 a 5 itens)
    - Retomar a taxonomia de temas — "Cura", "Acadêmico" e "Magia" hoje têm só 1
      origem cada, pode valer consolidar com outros temas maiores
11. **Melhorias sugeridas na página de Deuses** apontadas em revisão (14/jul) — duas
    aplicadas, duas ficaram em aberto por decisão do usuário (não é falta de tempo,
    é incerteza genuína sobre se vale a pena):
    - ⏸️ **Busca cobrir o campo `lore`** — hoje a busca em `aplicarFiltrosDeuses()` não
      inclui o texto narrativo completo (`lore`), só o resumo curto (`descricao`).
      Usuário decidiu não fazer por preocupação de deixar a busca/site "pesado" —
      vale reconsiderar se performance não for problema na prática (o texto já está
      carregado em memória de qualquer forma, buscar nele é só mais um `.includes()`).
    - ⏸️ **Filtro por Devoto (raça/classe)** — ex: "só me mostra deuses que anões podem
      cultuar". Dados já existem estruturados (`devotosRacas[]`/`devotosClasses[]`),
      mas o usuário está inseguro se isso vira poluição visual de filtros (17 raças +
      14 classes = muitas opções). Precisa de um desenho de UI melhor antes de tentar
      de novo (talvez dropdown/busca em vez de botões, diferente do padrão de filtro-btn
      já usado nas outras páginas).
    - ✅ Link Classe → Deus: tag de `energiaDivina` nos poderes de Clérigo/Paladino agora
      é clicável, leva pra Deuses já filtrado pela mesma energia (`irParaDeusesPorEnergia`)
    - ✅ Gradiente de fundo radial por energia na área do ícone dos cards (dourado/roxo/
      terroso, preparando visualmente pro dia que imagens de verdade substituírem os ícones)
12. **Melhorias sugeridas em Poderes Gerais/Combate** (14/jul) — usuário decidiu
    deliberadamente esperar até TODAS as 5 categorias existirem antes de aplicar,
    pra fazer de uma vez só em vez de retrabalhar por categoria:
    - Busca em `renderPoderesGeraisNaSecao()` não cobre o campo `prerequisito` — buscar
      "Combate Defensivo" não acha Derrubar/Desarmar Aprimorado, que dependem dele
    - `kw-poder-geral` — mesmo padrão do `kw-pericia`, deixaria clicável qualquer menção
      a um poder geral em QUALQUER lugar do site (poderes de classe, origens, etc.).
      Só faz sentido pleno depois que Destino existir, já que a maioria dos poderes
      gerais citados em Origens (Sortudo, Lobo Solitário, Vontade de Ferro...) é
      categoria Destino, não Combate
    - Filtro rápido "só Bônus" (17 dos 40 poderes de Combate citam outro poder da
      lista como pré-requisito — mesmo padrão dos filtros Treinada/Armadura de Perícias)

### Backlog 📋 (ordem)
1. Revisão final das 14 classes (detalhes apontados pelo usuário)
2. **Magias — COMPLETO** (Cap. 4, pp. 168–211, não confundir com "Poderes de Magia",
   que já é uma das 5 categorias de poderes gerais, completa). Capítulo maior e mais
   complexo do livro. **197 magias no total**, Círculos 1 a 5, todos fechados
   (53 + 48 + 40 + 30 + 25 = 196, mais "Segunda Chance" identificada por conferência
   manual com o livro = 197).

   **Schema final** (`js/data/magias.js`):
   `{ id, nome, tipo: 'arcana'|'divina'|'universal', escola, circulo, execucao, alcance,
   alvoArea, duracao, resistencia, descricao, tabela?, opcoes?, aprimoramentos: [{ custoPM,
   efeito, tipo: 'aumenta'|'muda'|'truque', restricao? }] }`.
   `tipo` é STRING ÚNICA, não array — "Universal" é tag OFICIAL do próprio livro (achado
   durante a extração, não dedução nossa): magias que funcionam igual pra arcanistas e
   divinos ganham uma entrada ÚNICA marcada "Universal" no livro, em vez de duplicada.
   `aprimoramentos[].restricao` (opcional, 'arcana'|'divina') existe pra magias universais
   com upgrades exclusivos de um dos dois lados (ex: Luz tem aprimoramentos "Apenas
   Arcanos" e "Apenas Divinos").
   `tabela` (opcional) — mesmo formato de Poderes Gerais (`{colunas, linhas}`, renderizado
   com `renderTabelaUso()` reaproveitada), pra listas de consulta tipo "modificador por
   grau de conhecimento" (Vidência) ou "estatísticas por tamanho" (Animar Objetos) — NÃO
   é uma escolha de efeito, é só referência.
   `opcoes` (opcional) — `[{nome, descricao}]`, pra magias com efeitos nomeados à escolha
   ao lançar (Controlar Água/Fogo/Terra/Madeira, Rogar Maldição, Aprisionamento, Desejo,
   Intervenção Divina, Manto do Cruzado, Terremoto, Palavra Primordial etc. — 21 magias no
   total). Renderizado como abas clicáveis (`renderOpcoesEscolha()` + `selecionarOpcaoMagia()`
   em compendio.js), mostrando uma descrição por vez. Mesmo nome de campo (`opcoes`/`nome`/
   `descricao`) já usado em `poderes_classes.js` — mantivemos consistência ao perceber a
   divergência (tínhamos usado `efeitos`/`efeito` numa primeira tentativa, corrigido).

   **Regras de mecânica confirmadas:**
   - Tabela 4-1 (custo-base por círculo): 1º=1PM, 2º=3PM, 3º=6PM, 4º=10PM, 5º=15PM
     (`window.CUSTO_POR_CIRCULO`, exportado junto com `window.MAGIAS`)
   - Truque: custo 0, EXCLUSIVO — selecionar zera/desabilita todos os outros aprimoramentos
     da mesma magia (e vice-versa). UI: `toggleAprimoramentoTruqueMagia()`.
   - Aprimoramentos "aumenta" são cumuláveis (stepper +/−, `alterarAprimoramentoMagia()`).
     Aprimoramentos "muda" são checkbox único, não acumulam (`toggleAprimoramentoMudaMagia()`).
   - PM total = custo-base do círculo + soma dos aprimoramentos selecionados (0 se Truque
     ativo) — calculado ao vivo em `calcularPMTotalMagia()`.
   - "Requer Nº círculo" aparece em 143 dos 508 aprimoramentos (quase 30%) — extraído do
     texto do `efeito` em tempo de render (`extrairRequerCirculo()`) e mostrado como tag
     dourada com cadeado, sem precisar duplicar o dado num campo estruturado à parte.

   **Página:** grupo "Magias" no menu (igual "Poderes") expande pra "Todas as Magias",
   "Magias Arcanas", "Magias Divinas", "Magias Universais". Painel de detalhe ÚNICO
   compartilhado pelas 4 seções (`#magiaPainel`, 460px, desktop-only). Ícones por escola:
   Abjuração=escudo, Adivinhação=olho, Convocação=transferência, Encantamento=cérebro,
   Evocação=chama, Ilusão=máscara, Necromancia=caveira, Transmutação=átomo.
   Busca cobre nome + descrição + alcance + execução + resistência (ex: buscar "toque"
   acha as ~36 magias com esse alcance).
   `kw-magia` ativo — nomes de magias citados em qualquer descrição do site (inclusive
   dentro de outras magias, poderes, deuses etc.) viram links clicáveis que levam direto
   pro painel da magia citada (`window.irParaMagia()`), igual `kw-poder-geral` já fazia
   pra poderes. Cache dinâmico a partir de `window.MAGIAS`, sem duplicar os 197 nomes em
   `keywords.js`.

   **Achado de auditoria (revisão pós-conclusão, pedido do usuário):** ao testar `kw-magia`
   em citações fora do capítulo de Magias (ex: Dahllan tem a habilidade "Amiga das Plantas"
   citando a magia Controlar Plantas), descobrimos que 3 lugares no site exibiam descrição
   SEM passar por `processarKeywords()` nenhuma — não era só falta de `kw-magia`, era o
   sistema de keywords inteiro (cores de número, `kw-pericia`, `kw-poder-geral`, tooltips
   de atributo etc.) faltando nesses pontos: habilidades de Raça (`dp-hab-desc`), descrição
   curta do card de Raças (`rc-desc`) e descrição de opção de variação de Classe
   (`cp-var-opt-desc`). Corrigido nos três — confirmado que **não sobra mais nenhum** lugar
   no site exibindo `.descricao` sem `processarKeywords()` (varredura com grep confirmou).
   Habilidades de Classe (`cp-hab-desc`) já processavam corretamente desde antes, não
   precisou de correção.

   **Auditoria de qualidade dos dados (pós-conclusão, pedido do usuário) — tudo OK:**
   IDs/nomes únicos, campos obrigatórios completos, enums válidos (tipo/escola/círculo/
   tipo de aprimoramento), os 12 pares "X anula Y" recíprocos e existentes, nenhum
   aprimoramento duplicado, nenhuma exigência de círculo inconsistente, renderização
   testada nas 197 magias (cards + painéis) sem nenhum erro de execução, risco de falso
   positivo em nomes curtos de magia (Luz/Voo/Sono/Teia/Névoa) investigado e descartado
   (regex sensível a maiúsculas protege bem — só captura referências reais e capitalizadas).

   **Adiado de propósito (não é esquecimento):**
   - "Grimório Pessoal" (favoritar magias) — usuário decidiu focar primeiro em conteúdo
   - Seleções de aprimoramento não persistem entre aberturas do painel (reseta zerado
     toda vez) — ok pra ferramenta de consulta; se quiser lembrar a última escolha por
     magia, dá pra guardar no localStorage depois
   - **Melhoria futura sugerida pelo usuário:** trocar o layout de `opcoes` de abas
     clicáveis (uma descrição visível por vez) para lista empilhada (todas as opções e
     descrições visíveis ao mesmo tempo, sem clique nenhum) — mais fácil de comparar as
     opções antes de escolher, ao custo de painéis mais compridos em magias com muitas
     opções (Intervenção Divina tem 7). Troca simples: só mexe em `renderOpcoesEscolha()`,
     não precisa mudar nada nos dados (`opcoes: [{nome, descricao}]` continua igual).

   **Pendências de verificação que restaram** (as demais já foram resolvidas):
   - Um fragmento SEM NOME e SEM DESCRIÇÃO apareceu entre "Soco de Arsenal" e "Sombra
     Assassina" (extração do Círculo 2), com só a linha de estatísticas e dois
     aprimoramentos sobrevivendo: "Execução: padrão; Alcance: curto; Alvo: 1 humanoide;
     Duração: cena; Resistência: Vontade parcial." + "+2 PM: aumenta o dano em +1d6." +
     "+5 PM: muda o tipo do dano para essência." Não sabemos a que magia pertence — não
     incluído em lugar nenhum ainda, não descartado.
3. **Equipamentos — página em andamento** (Cap. 3, pp. 138–167). Os 5 data
   files (armas, armaduras, itens_gerais, melhorias, materiais_especiais —
   212 entradas no total) estão extraídos e validados. Página construída:
   menu "Equipamentos" com 5 sub-abas (Armas, Armaduras & Escudos, Itens
   Gerais, Melhorias, Materiais Especiais) + "Itens Mágicos"/"Artefatos"
   como placeholders pra capítulos futuros. Painel de detalhe único
   compartilhado (`#equipPainel`, 460px, desktop-only, mesmo padrão de
   Magias) — auditado e testado tanto em Armas quanto em Armaduras.

   **Recursos já implementados** (pedido do usuário, 4 das 5 ideias originais
   + 1 melhoria adicional):
   - Toggle cards/tabela em Armas e Armaduras (`setModoVisualArmas/Armaduras`)
     — tabela com `max-width:900px` centralizada (evita esticar em ultrawide)
   - Filtro de preço em Itens Gerais (até T$1/T$10/T$100/acima de T$100)
   - Munição aparece direto no painel da arma que a usa (clicável, abre o
     item na aba Itens Gerais)
   - **Calculadora de Item Superior** dentro do painel de arma/armadura:
     marca melhorias compatíveis (`melhoriasCompativeis()`), preço e CD
     atualizam ao vivo seguindo a Tabela 3-7 por QUANTIDADE de melhorias
     (não por melhoria individual). Restrições reais do livro aplicadas de
     verdade, não só como texto: Mira Telescópica só em armas de disparo
     exceto funda; Precisa/Maciça mutuamente exclusivas; Delicada/Reforçada
     mutuamente exclusivas; Delicada/Selada só em armadura pesada;
     Pungente/Atroz/Sob Medida ficam desabilitadas (opacas, sem clique) até
     o pré-requisito nomeado ser marcado primeiro; Harmonizada exige
     qualquer outra melhoria já selecionada. Cada melhoria mostra só nome +
     efeito curto no painel (campo `efeito`, extraído da Tabela 3-8) — a
     descrição completa em prosa fica reservada pra página dedicada de
     Melhorias. Seleção de Material Especial vira abas clicáveis
     (`mg-opcao-pill`, reaproveitado das opções de magia), não dropdown.
   - Auditoria de Armas (40) e Armaduras (12) feitas com o mesmo rigor da
     de Magias — dados, renderização e a calculadora testados um por um,
     zero problemas encontrados nas duas.

   **Falta:**
   - Auditoria de Itens Gerais (121), Melhorias (29) e Materiais (6)
   - `kw-item`: nomes de arma/armadura/item citados em qualquer descrição
     do site virarem link clicável, igual `kw-magia`/`kw-poder-geral` —
     **decidido de propósito fazer por último**, depois de todas as
     categorias de Equipamentos estarem revisadas (mesma lógica de esperar
     todos os círculos de Magias prontos antes de ativar `kw-magia`)
4. Criaturas / Bestiário (Cap. 7, pp. 282–316)
5. Ficha de personagem (pages/ficha.html)
6. Ferramentas do Mestre (pages/mestre.html)
7. Firebase Auth + Firestore
8. Link reverso perícia → classe/poder ("concedida por: Ladino, Cigano...") na própria
   linha da perícia — hoje o link só existe de poder para perícia (kw-pericia), não o
   contrário. Não é urgente; fica melhor depois que Classes e Origens estiverem fechadas.
9. Botões "Ver no Livro" e "Adicionar à Ficha" no painel de classe ainda não têm ação
   (decisão pendente: linkar PDF, remover, ou desabilitar com tooltip "em breve")
10. Revisão geral de UX/polimento acumulada — passar por tudo isso de uma vez só, quando
    o conteúdo principal estiver fechado (decisão deliberada do usuário, não esquecimento):

    **Pontuais, já apontados em páginas específicas:**
    - Acordeão no menu lateral (fechar outros grupos ao abrir um novo — Raças/Classes/
      Perícias/Origens/Deuses/Poderes juntos já são bastante item)
    - Cards de origem sem `line-clamp` na descrição — alturas desiguais na mesma fileira
    - Taxonomia de temas de Origens ("Cura", "Acadêmico", "Magia" têm só 1 origem cada)
    - Filtros de Poderes Gerais/Todos os Poderes apertados em tela pequena

    **Gerais, pro site inteiro (lista do usuário, 14/jul — vai crescendo com o tempo):**
    - Organização em ordem alfabética (em todo lugar que hoje não tem, não só Poderes)
    - Personalização de exibição dos cards (o usuário poder escolher como os cards
      aparecem — layout, densidade de informação etc.; provavelmente estender a ideia
      do toggle lista/colunas de Poderes Gerais pras outras páginas de card)
    - Melhorias nos filtros pré-selecionados (qual filtro já vem ativo por padrão)
    - Mini botão dentro da caixa de busca pra limpar o texto digitado (um "×")
    - Botão de voltar pra facilitar navegação em telas pequenas, deixando mais intuitivo
    - Corrigir Poderes Gerais pra adicionar mais uma categoria a todos os poderes
      (usuário não detalhou qual categoria ainda — perguntar quando chegar a vez)
    - Voltar e corrigir o Atlas (pendências não detalhadas ainda)
    - Uma caixa de busca única pra pesquisar o site inteiro (hoje cada página tem a
      própria busca local; isso seria uma busca global cruzando todo o conteúdo)
    - "Pin" de seleção fixa nos painéis laterais, pra manter destacado o item aberto
      mesmo navegando entre diferentes categorias/painéis

### Estratégia de Suplementos
PDFs de suplementos serão anexados DEPOIS do livro básico completo.
Novos conteúdos entram nos arrays existentes com os campos certos
(categoriaEspecial, condicaoAtivacao, energiaDivina, prerequisito) — sem mudanças no código.

---

## 13. Notas para a Ficha de Personagem (pages/ficha.html)

Prioridades de implementação baseadas nas mecânicas mapeadas:

1. **Componente PM variável** (16 habilidades): slider ou input numérico.
   - Ativos (Fúria, Golpe Divino...): botão de ativação no turno.
   - Reativos (Baluarte, Duelo): botão ao ser atacado.
   - Livres (Canalizar Energia, Orgulho): input numérico sem restrição.

2. **Modo de combate da Forma Selvagem**: painel que muda os atributos do
   personagem dinamicamente enquanto ativo. O mais complexo da ficha.

3. **Gerenciador de Engenhocas**: listar engenhocas ativas, rastrear
   enguiçadas, mostrar limite atual (igual à Inteligência).

4. **Progresso de Fabricação**: Inventor mostra "você pode fabricar itens
   com X melhorias" baseado no nível atual.

5. **Interface de Explorador** (Caçador): lista de terrenos escolhidos
   com o bônus atual em cada um.

6. **Sistema de Virtudes Paladinescas**: contador de virtudes → bônus PM
   automático (+1/+3/+6/+10/+15).

7. **Limites de Uso de Equipamento — "empunhado" vs. "vestido"** (observação
   do usuário, 20/jul, durante a revisão de Armaduras): o Cap. 3 do livro
   (p. 141) tem uma regra de "Limites de Uso" que o compêndio de Equipamentos
   NÃO precisa aplicar (é só catálogo de consulta), mas a FICHA vai precisar
   simular de verdade — quantas mãos livres o personagem tem, quais itens
   exigem estar vestido (vestuário, esotéricos) vs. empunhado (armas,
   escudos, alguns itens gerais como bandoleira/organizador de pergaminhos)
   simultaneamente, e as penalidades de ocupar as duas mãos. Não implementar
   agora — só nota pra quando a ficha começar.

8. **prerequisitoValidacao[]** (a adicionar quando iniciar a ficha):
```js
prerequisitoValidacao: [
  { tipo: 'atributo', atributo: 'Sab', valor: 1 },
  { tipo: 'nivel', valor: 4 },
  { tipo: 'poder', poderId: 'forma-selvagem' },
  { tipo: 'classe', classeId: 'druida' },
]
```

8. **Tracker de condições por estado ativo** (condicaoAtivacao): ao
   ativar Fúria, Forma Selvagem ou Aura Sagrada, os poderes dependentes
   "iluminam" na ficha indicando disponibilidade.

9. **Interface Deuses → energiaDivina**: ao selecionar divindade do
   Clérigo, o campo energiaDivina do personagem é definido
   automaticamente, filtrando quais versões dos poderes aparecem.

---

## 14. Regras de Código

- Nunca usar frameworks — HTML, CSS e JS puros
- Sempre usar variáveis CSS de variables.css para cores
- SEMPRE chamar processarKeywords() em descrições antes de inserir no DOM
- Mobile-first em todo CSS novo
- Comentários de seção: // ── NOME DA SEÇÃO ──
- IDs e classes: kebab-case
- Constantes de dados: SCREAMING_SNAKE_CASE
- Ícones: Tabler outline webfont (ti-nome) — NUNCA sufixo -filled
- Todo arquivo novo em js/data/ TERMINA com `if (typeof window !== 'undefined') window.X = X;` (ver §4)

---

## 15. Fluxo de Trabalho

claude.ai → planejamento, extração de dados do PDF, decisões de arquitetura,
geração de prompts prontos para colar no Claude Code.

Claude Code (VS Code) → execução dos prompts, edição direta nos arquivos.

Modelo padrão: Sonnet 4.6.
Usar Opus apenas para: refatoração multi-arquivo complexa ou bug difícil.

Formato de prompt para correção pontual em arquivo que já existe:
  Em [arquivo], ENCONTRE [trecho único identificável] e SUBSTITUA/ADICIONE [novo trecho]

Nunca reescrever arquivos inteiros para correções pequenas.

Formato de prompt para ARQUIVO NOVO (ainda não existe no projeto):
  Entrega o conteúdo completo do arquivo — inline se for pequeno, como
  arquivo pra baixar (present_files) se for grande. NÃO forçar um
  ENCONTRE/SUBSTITUA artificial quando não há nada pra encontrar ainda —
  isso só atrapalha. Decidido em 20/jul durante a extração dos data
  files de Equipamentos (armas.js, armaduras.js, itens_gerais.js,
  melhorias.js, materiais_especiais.js — todos entregues como arquivo
  completo, não como prompt de edição).