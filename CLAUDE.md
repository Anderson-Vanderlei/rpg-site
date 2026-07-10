# Tormenta 20 — Site Companion
> Documento de referência para o Claude Code (VS Code).
> Atualizado em: julho de 2025.
> Planejamento completo feito no claude.ai — só executar aqui.

---

## 1. Visão Geral do Projeto

Site companion para o sistema de RPG de mesa brasileiro **Tormenta 20** (Jambô Editora).
Ferramenta de consulta e interação entre jogadores e mestres para construir campanhas
e fichas personalizáveis, com foco em fluidez de informação e visual imersivo.

**Stack:** HTML + CSS + JavaScript puro (sem frameworks).
**Hospedagem:** GitHub Pages (front-end estático).
**Repositório:** Anderson-Vanderlei/rpg-site
**Backend planejado (fase 2):** Firebase Auth + Firestore (contas, fichas, campanhas em tempo real).

---

## 2. Identidade Visual

### Cores base (já em `css/variables.css`)
| Variável | Valor | Uso |
|---|---|---|
| `--cor-fundo` | `#0a0a0a` | Fundo global |
| `--cor-primaria` | `#8B0000` | Carmesim — alma do Tormenta |
| `--cor-dourado` | `#c9a84c` | Dourado — detalhe medieval |
| `--cor-texto` | `#e8e8e8` | Texto principal |

### Sistema de cores por categoria (novo — a implementar em cada seção)
| Categoria | Cor | Hex | Seções |
|---|---|---|---|
| Personagens | Dourado | `#c9a84c` | Raças, Classes, Origens, Fichas |
| Magia | Roxo arcano | `#7b4ccc` | Magias Arcanas, Poderes de Magia |
| Combate | Carmesim | `#8B0000` | Armas, Poderes de Combate, Ameaças |
| Natureza | Verde-musgo | `#2d6a4f` | Mundo, Atlas, Druida, Caçador |
| Divino | Azul celestial | `#4a90d9` | Deuses, Magias Divinas, Clérigo, Paladino |
| Neutro/Regras | Cinza | `#555555` | Regras, Perícias, Condições, Equipamentos |

### Tipografia
- **Títulos:** `Cinzel` (serif clássica, medieval)
- **Corpo:** `Crimson Text` (serif legível, literária)

### Referências visuais
- League of Legends Universe — cards cinemáticos, parallax, filtros visuais
- D&D Beyond — compêndio de regras, cards de magia, ficha interativa
- Demiplane Nexus — sidebar hierárquica, painel lateral, breadcrumb
- WorldCraft — dashboard de campanha, wiki integrada

---

## 3. Estrutura de Arquivos Atual

```
rpg-site/
├── index.html               # Página principal (home)
├── CLAUDE.md                # Este arquivo
├── css/
│   ├── variables.css        # Variáveis globais de tema
│   ├── style.css            # Estilos da home
│   ├── atlas.css            # Estilos do atlas/mapa
│   └── compendio.css        # Estilos do compêndio
├── js/
│   ├── main.js              # Scripts da home
│   ├── atlas.js             # Scripts do atlas
│   ├── compendio.js         # Scripts do compêndio
│   └── data/
│       ├── racas.js         # ✅ Dados das 17 raças (completo)
│       ├── locais.js        # ✅ Dados dos locais do mapa (completo)
│       ├── classes.js       # ⏳ A criar — 14 classes
│       ├── origens.js       # ⏳ A criar — origens de personagem
│       ├── deuses.js        # ⏳ A criar — 20 deuses do panteão
│       ├── pericias.js      # ⏳ A criar — 29 perícias
│       ├── poderes.js       # ⏳ A criar — poderes gerais e de classe
│       ├── magias.js        # ⏳ A criar — magias arcanas e divinas
│       ├── equipamentos.js  # ⏳ A criar — armas, armaduras, itens
│       └── criaturas.js     # ⏳ A criar — bestiário
├── pages/
│   ├── atlas.html           # Mapa interativo de Arton (5 camadas)
│   ├── compendio.html       # Compêndio de regras
│   ├── ficha.html           # ⏳ A criar — ficha de personagem digital
│   └── mestre.html          # ⏳ A criar — ferramentas do mestre
└── images/
    ├── mapa-arton.jpg
    ├── mapa-tamura.jpg
    ├── mapa-moreania.jpg
    ├── mapa-lamnor.jpg
    ├── mapa-doherimm.jpg
    └── hero-bg.jpg
```

---

## 4. Padrão dos Arquivos de Dados

Todos os arquivos em `js/data/` seguem o **mesmo padrão** de `racas.js`.
Sempre que criar um novo arquivo de dados, replicar essa estrutura:

```js
/* ============================================================
   TORMENTA 20 — [nome].js  (dados oficiais do livro de regras)
   Edição Jogo do Ano v1.3 — Capítulo X, pp. XX–XX
============================================================ */

const NOME_CONSTANTE = [
  {
    id: 'identificador-unico',       // kebab-case, sem espaços
    nome: 'Nome Exibido',
    subtitulo: 'Subtítulo descritivo',
    tipo: 'Categoria',
    fonte: 'Tormenta 20',
    pagina: 00,                      // página de referência no livro
    // ... campos específicos de cada tipo
  },
];
```

### Campos específicos por tipo de dado

**Classes** (`classes.js`) — campos obrigatórios:
- `id`, `nome`, `subtitulo`, `descricao`, `historia`
- `atributoChave` — atributo principal da classe
- `vidaPorNivel` — pontos de vida ganhos por nível
- `pmPorNivel` — pontos de mana por nível
- `periciasDisponiveis[]` — lista de perícias que a classe pode treinar
- `proficiencias[]` — armas e armaduras
- `habilidades[]` — array com `{nivel, nome, descricao}`
- `tabela[]` — progressão nível 1–20
- `papel[]` — tags: `'Dano'`, `'Tanque'`, `'Suporte'`, `'Magia'`
- `complexidade` — `'Simples'`, `'Moderada'`, `'Complexa'`
- `classesRecomendadasRacas[]`

**Magias** (`magias.js`) — campos obrigatórios:
- `id`, `nome`, `tipo` (`'arcana'` | `'divina'`)
- `circulo` — número de 1 a 5 (ou `'truque'`)
- `escola` — escola de magia
- `atributoChave`
- `custopm` — custo em PM
- `alcance`, `duracao`, `alvo`, `execucao`
- `descricao`, `aprimoramentos[]`

**Poderes** (`poderes.js`) — campos obrigatórios:
- `id`, `nome`, `tipo` — (`'combate'` | `'destino'` | `'magia'` | `'concedido'` | `'tormenta'` | `'classe'`)
- `classe` — se for poder de classe, qual classe
- `prerequisito`, `descricao`

**Deuses** (`deuses.js`) — campos obrigatórios:
- `id`, `nome`, `subtitulo`, `dominio`, `alinhamento`
- `simbolo`, `armaFavorita`
- `poderesConcedidos[]`
- `classesAfins[]`
- `descricao`, `historia`

---

## 5. Hierarquia de Navegação do Compêndio

A estrutura da sidebar segue a organização dos capítulos do livro:

```
Compêndio
├── 🧑 Personagens
│   ├── Raças          (Cap. 1, pp. 18–31) ✅ feito
│   ├── Classes        (Cap. 1, pp. 32–84) ⏳ próximo
│   ├── Origens        (Cap. 1, pp. 85–95)
│   └── Atributos & Características
│
├── ✨ Magias & Poderes
│   ├── Magias Arcanas  (Cap. 4, pp. 174–176)
│   ├── Magias Divinas  (Cap. 4, pp. 176–177)
│   ├── Poderes de Combate (Cap. 2, pp. 124–128)
│   ├── Poderes de Destino (Cap. 2, pp. 129–130)
│   └── Poderes da Tormenta (Cap. 2, pp. 136)
│
├── ⚔️ Equipamentos
│   ├── Armas           (Cap. 3, pp. 142–151)
│   ├── Armaduras       (Cap. 3, pp. 152–154)
│   ├── Itens Gerais    (Cap. 3, pp. 155–163)
│   └── Itens Superiores (Cap. 3, pp. 164–167)
│
├── 📋 Regras
│   ├── Perícias        (Cap. 2, pp. 114–123)
│   ├── Combate         (Cap. 5, pp. 230–239)
│   └── Condições       (Apêndice, pp. 394–395)
│
├── 🌟 Deuses & Fé
│   └── Panteão         (Cap. 1, pp. 96–105)
│
└── 💀 Ameaças
    ├── Criaturas       (Cap. 7, pp. 282–316)
    ├── Perigos         (Cap. 7, pp. 317–321)
    └── Fichas de NPC   (Cap. 7, pp. 322–323)
```

---

## 6. Status de Implementação

### ✅ Concluído
- `index.html` — home funcional (ajuste mobile resolvido)
- `pages/atlas.html` — mapa com 5 camadas (Arton, Tamura, Moreania, Lamnor, Doherimm)
- `pages/compendio.html` — raças completas, painel lateral funcional (bug do grid corrigido)
- `js/data/racas.js` — 17 raças com dados oficiais (Cap. 1, pp. 18–31)
- `js/data/locais.js` — locais do mapa com NPCs, alinhamentos e descrições
- `js/compendio.js` — nav hierárquica, hambúrguer mobile, breadcrumb, localStorage

### ⏳ Em progresso / próximo
- `js/data/classes.js` — 14 classes (Alta prioridade — base do criador de personagem)

### 📋 Backlog (ordem de prioridade)
1. Classes (14 classes, Cap. 1 pp. 32–84)
2. Poderes gerais e de classe (Cap. 2 pp. 124–136)
3. Magias arcanas e divinas (Cap. 4 pp. 174–211)
4. Origens (Cap. 1 pp. 85–95)
5. Deuses — panteão dos 20 (Cap. 1 pp. 96–105)
6. Perícias (Cap. 2 pp. 114–123)
7. Equipamentos (Cap. 3 pp. 138–167)
8. Criaturas / Bestiário (Cap. 7 pp. 282–316)
9. Itens Mágicos e Artefatos (Cap. 8 pp. 333–349)
10. Ficha de personagem digital (`pages/ficha.html`)
11. Ferramentas do Mestre (`pages/mestre.html`)

---

## 7. Regras de Código

- **Nunca usar frameworks** — HTML, CSS e JS puros.
- **Sempre usar variáveis CSS** de `variables.css` para cores, nunca hardcodar hex.
- **Seguir o padrão de `racas.js`** ao criar qualquer novo arquivo de dados.
- **Mobile-first** em todo CSS novo.
- **Comentários de seção** em todo JS: `// ── NOME DA SEÇÃO ──`.
- IDs e classes em **kebab-case** (ex: `race-card`, `nav-grupo`).
- Constantes de dados em **SCREAMING_SNAKE_CASE** (ex: `RACAS`, `CLASSES`, `MAGIAS`).
- Todo arquivo de dados começa com o cabeçalho padrão com referência de página do livro.

---

## 8. Features Planejadas (Fase 2 — após compêndio completo)

- **Criador de Personagem guiado** — fluxo passo a passo (Raça → Classe → Origem → Atributos → Perícias → Poderes)
- **Ficha digital interativa** — auto-calculada, exportável em PDF
- **Grimório interativo** — cards de magia filtráveis por círculo, tipo, escola
- **Panteão visual** — os 20 deuses em layout de grid com filtro por alinhamento
- **Tabela de progressão interativa** — clicar numa habilidade na tabela abre o painel com descrição
- **Sistema de condições visual** — badges coloridos com ícone para cada condição
- **Compêndio cruzado** — toda menção a uma regra é clicável e abre o painel correspondente
- **Ferramenta do Mestre** — gerenciador de combate (iniciativa, HP, condições, rounds)
- **Mapa reimaginado** — zoom em 3 níveis, pins por tipo, painel lateral ao clicar em cidade
- **Contas e dados persistentes** — Firebase Auth + Firestore (usuários, fichas, campanhas)

---

## 9. Fluxo de Trabalho

O planejamento e as decisões de arquitetura são feitos no **claude.ai** (acesso ao PDF do livro, diagramas, análise de dados). A implementação é executada aqui no **Claude Code (VS Code)**.

Sempre que receber um prompt de implementação, ele virá com:
- O arquivo a criar ou editar
- A estrutura exata do dado ou código
- O padrão a seguir (geralmente referenciando `racas.js` ou outro arquivo existente)

Se houver dúvida sobre estrutura ou dados, consultar a referência do livro indicada no cabeçalho do arquivo de dados.