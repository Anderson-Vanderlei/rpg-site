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
│       ├── origens.js               ⏳ a criar
│       ├── deuses.js                ⏳ a criar
│       ├── pericias.js              ⏳ a criar
│       ├── magias.js                ⏳ a criar
│       ├── equipamentos.js          ⏳ a criar
│       └── criaturas.js             ⏳ a criar
├── pages/
│   ├── atlas.html                   ✅ mapa interativo 5 camadas
│   ├── compendio.html               ✅ raças + classes funcionando
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

| Tipo | Cor | CSS | Quando usar |
|---|---|---|---|
| Variação inline | Roxo suave | .cp-var-inline | Caminho/Linhagem abaixo da habilidade fixa (variacaoIndex) |
| Variação em seção | Roxo suave | renderVariacaoEmSecao | Banner informativo dentro de categoriaEspecial |
| Escolha no poder | Verde suave | via opcoes[] | Familiares, Totens, Companheiro — escolha permanente |
| Explicação | Dourado suave | .cp-explicacao | Regras de subsistemas |

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
- Clérigo: canalizar-energia (dual), expulsar-mortos-vivos (positiva), comandar-mortos-vivos (negativa), magia-sagrada-profana (dual), simbolo-sagrado-energizado (dual), canalizar-amplo (dual)
- Paladino: aura-ardente (positiva), cura-pelas-maos (positiva)

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
- keywords.js v2 — auto-detecção numérica + 8 tipos + tipos de parceiro
- **14 classes revisadas e completas** em classes.js + poderes_classes.js
- Painel de classe: variação inline, filtros, busca, slider de nível,
  badge de duração, botão adicionar ao personagem, categorias colapsáveis,
  badge de energiaDivina, badge de condicaoAtivacao visual

### Revisão Final Pendente ⚠️
Após inspeção do usuário, aplicar os ajustes apontados:
1. Verificar hierarquia de níveis em todas as habilidades fixas
2. Confirmar que toda classe tem habilidade fixa no nível 20
3. Verificar condicaoAtivacao em todos os poderes que dependem de estado ativo
4. Verificar energiaDivina em todos os poderes relevantes do Clérigo e Paladino
5. Verificar categoriaEspecial de todos os poderes expansíveis
6. Verificar keywords em todas as descrições
7. Preparar prerequisitoValidacao[] para as mecânicas da ficha

### Backlog 📋 (ordem)
1. Revisão final das 14 classes (detalhes apontados pelo usuário)
2. Magias (Cap. 4, pp. 168–211)
3. Origens (Cap. 1, pp. 85–95)
4. Deuses — panteão dos 20 + energiaDivina por divindade (Cap. 1, pp. 96–105)
5. Perícias (Cap. 2, pp. 114–123)
6. Equipamentos (Cap. 3, pp. 138–167)
7. Criaturas / Bestiário (Cap. 7, pp. 282–316)
8. Ficha de personagem (pages/ficha.html)
9. Ferramentas do Mestre (pages/mestre.html)
10. Firebase Auth + Firestore

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

7. **prerequisitoValidacao[]** (a adicionar quando iniciar a ficha):
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

---

## 15. Fluxo de Trabalho

claude.ai → planejamento, extração de dados do PDF, decisões de arquitetura,
geração de prompts prontos para colar no Claude Code.

Claude Code (VS Code) → execução dos prompts, edição direta nos arquivos.

Modelo padrão: Sonnet 4.6.
Usar Opus apenas para: refatoração multi-arquivo complexa ou bug difícil.

Formato de prompt para correção pontual:
  Em [arquivo], ENCONTRE [trecho único identificável] e SUBSTITUA/ADICIONE [novo trecho]

Nunca reescrever arquivos inteiros para correções pequenas.