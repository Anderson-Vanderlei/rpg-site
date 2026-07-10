/* ============================================================
   TORMENTA 20 — keywords.js
   Sistema de palavras-chave com tooltip
   Dados oficiais — Edição Jogo do Ano v1.3
============================================================ */

// ── DICIONÁRIO DE PALAVRAS-CHAVE ───────────────────────────
// Tipos: 'acao' | 'pericia' | 'cond' | 'alcance' | 'regra'
const KEYWORDS_T20 = {

  // ── TIPOS DE AÇÃO (cap. 5, p. 233) ──
  acao: [
    {
      padroes: ['ação completa', 'ações completas'],
      descricao: 'Ocupa todo o turno — equivale a usar a ação padrão e a de movimento juntas. Não é possível fazer reações nesse turno.',
    },
    {
      padroes: ['ação de movimento', 'ações de movimento'],
      descricao: 'Permite se mover até o deslocamento normal, sacar/guardar um item, levantar-se ou realizar outras ações menores.',
    },
    {
      padroes: ['ação padrão', 'ações padrão'],
      descricao: 'A ação principal do turno. Usada para atacar, lançar magias, usar habilidades e realizar a maioria das ações ofensivas.',
    },
    {
      padroes: ['ação livre', 'ações livres'],
      descricao: 'Pode ser realizada a qualquer momento, mesmo fora do turno. Não custa ação e múltiplas são permitidas por rodada.',
    },
    {
      padroes: ['reação', 'reações'],
      descricao: 'Feita fora do próprio turno, em resposta a um evento específico. Apenas uma reação por rodada é permitida.',
    },
  ],

  // ── ALCANCES (cap. 5, p. 221) ──
  alcance: [
    {
      padroes: ['alcance visual'],
      descricao: 'Qualquer alvo que você possa ver, sem limite de distância prática.',
    },
    {
      padroes: ['alcance longo'],
      descricao: 'Até 30m de distância do personagem.',
    },
    {
      padroes: ['alcance médio'],
      descricao: 'Até 15m de distância do personagem.',
    },
    {
      padroes: ['alcance curto'],
      descricao: 'Até 9m de distância do personagem.',
    },
    {
      padroes: ['alcance corpo a corpo', 'alcance de toque'],
      descricao: 'Até 1,5m de distância (uma casa no grid). Exige contato físico ou proximidade imediata.',
    },
  ],

  // ── PERÍCIAS (cap. 2, pp. 114–123) ──
  pericia: [
    { padroes: ['Acrobacia'],     descricao: 'Acrobacia (Des): equilíbrio, cambalhotas, movimentos acrobáticos e cair sem se machucar.' },
    { padroes: ['Adestramento'],  descricao: 'Adestramento (Car): acalmar, treinar e controlar animais. Também usada para montar animais selvagens.' },
    { padroes: ['Atletismo'],     descricao: 'Atletismo (For): escalar, nadar, saltar longas distâncias e realizar façanhas físicas.' },
    { padroes: ['Atuação'],       descricao: 'Atuação (Car): performance artística — música, dança, teatro, discurso — para entretenimento ou persuasão.' },
    { padroes: ['Cavalgar'],      descricao: 'Cavalgar (Des): montar e controlar montarias, inclusive em situações de combate ou terreno difícil.' },
    { padroes: ['Conhecimento'],  descricao: 'Conhecimento (Int): saber sobre história, natureza, arcano, engenharia ou outros tópicos intelectuais.' },
    { padroes: ['Cura'],          descricao: 'Cura (Sab): tratar ferimentos, curar doenças, estabilizar moribundos e fazer primeiros socorros.' },
    { padroes: ['Diplomacia'],    descricao: 'Diplomacia (Car): negociar, persuadir e mudar a atitude de NPCs por meio de argumentos e boa vontade.' },
    { padroes: ['Enganação'],     descricao: 'Enganação (Car): mentir, blefar, disfarçar-se e criar ilusões verbais para enganar outros.' },
    { padroes: ['Fortitude'],     descricao: 'Fortitude (Con): resistência física contra venenos, doenças, fadiga e outros efeitos corporais.' },
    { padroes: ['Furtividade'],   descricao: 'Furtividade (Des): mover-se silenciosamente e sem ser percebido por outros personagens.' },
    { padroes: ['Guerra'],        descricao: 'Guerra (Int): conhecimento tático e estratégico, identificar formações, histórico militar e armas.' },
    { padroes: ['Iniciativa'],    descricao: 'Iniciativa (Des): determina a ordem de ação no início do combate. Testada uma vez por cena.' },
    { padroes: ['Intimidação'],   descricao: 'Intimidação (Car): ameaçar, amedrontar e coagir criaturas por meio de presença e força de vontade.' },
    { padroes: ['Intuição'],      descricao: 'Intuição (Sab): detectar mentiras, perceber intenções ocultas e sentir a sinceridade de outros.' },
    { padroes: ['Investigação'],  descricao: 'Investigação (Int): encontrar pistas, analisar evidências e deduzir informações a partir de detalhes.' },
    { padroes: ['Jogatina'],      descricao: 'Jogatina (Car): jogos de azar, truques de cartas e blefe em situações competitivas.' },
    { padroes: ['Ladinagem'],     descricao: 'Ladinagem (Des): abrir fechaduras, desativar armadilhas, fazer prestidigitação e bater bolsos.' },
    { padroes: ['Luta'],          descricao: 'Luta (For): ataques corpo a corpo com armas ou desarmado.' },
    { padroes: ['Misticismo'],    descricao: 'Misticismo (Int): identificar magias, efeitos mágicos e criaturas sobrenaturais. Atributo-chave de muitas magias arcanas.' },
    { padroes: ['Nobreza'],       descricao: 'Nobreza (Int): conhecimento sobre protocolo, etiqueta, linhagens nobres e política de Arton.' },
    { padroes: ['Ofício'],        descricao: 'Ofício (Int): criar, reparar e avaliar itens com um ofício específico (ferreiro, carpinteiro, alquimista etc.).' },
    { padroes: ['Percepção'],     descricao: 'Percepção (Sab): notar detalhes do ambiente, detectar perigos, ouvir sons e detectar inimigos ocultos.' },
    { padroes: ['Pilotagem'],     descricao: 'Pilotagem (Des): controlar veículos aquáticos, aéreos ou outros meios de transporte complexos.' },
    { padroes: ['Pontaria'],      descricao: 'Pontaria (Des): ataques à distância com arcos, bestas, armas de arremesso e outros projéteis.' },
    { padroes: ['Reflexos'],      descricao: 'Reflexos (Des): resistência a ataques em área, esquivar de efeitos físicos e outros perigos rápidos.' },
    { padroes: ['Religião'],      descricao: 'Religião (Sab): conhecimento sobre deuses, rituais sagrados, criaturas sobrenaturais e textos religiosos.' },
    { padroes: ['Sobrevivência'], descricao: 'Sobrevivência (Sab): rastrear, navegar por terrenos selvagens, achar alimento e construir abrigos.' },
    { padroes: ['Vontade'],       descricao: 'Vontade (Sab): resistência mental contra magias de encantamento, ilusão, medo e outros efeitos psíquicos.' },
  ],

  // ── CONDIÇÕES (apêndice, pp. 394–395) ──
  cond: [
    { padroes: ['Abalado', 'abalado'],        descricao: 'Sofre –2 em testes de perícia. Se ficar abalado novamente, fica Apavorado. (Medo)' },
    { padroes: ['Agarrado', 'agarrado'],      descricao: 'Fica Desprevenido e Imóvel, sofre –2 em testes de ataque e só pode usar armas leves. (Movimento)' },
    { padroes: ['Alquebrado', 'alquebrado'],  descricao: 'O custo em PM das habilidades aumenta em +1. (Mental)' },
    { padroes: ['Apavorado', 'apavorado'],    descricao: 'Sofre –5 em testes de perícia e não pode se aproximar voluntariamente da fonte do medo. (Medo)' },
    { padroes: ['Atordoado', 'atordoado'],    descricao: 'Fica Desprevenido e não pode fazer ações. (Mental)' },
    { padroes: ['Caído', 'caído'],            descricao: 'Sofre –5 na Defesa contra ataques corpo a corpo e –5 em ataques corpo a corpo. +5 contra ataques à distância. Deslocamento 1,5m.' },
    { padroes: ['Cego', 'cego'],              descricao: 'Fica Desprevenido e Lento. –5 em perícias de For/Des. Todos os alvos têm camuflagem total. (Sentidos)' },
    { padroes: ['Confuso', 'confuso'],        descricao: 'Age de modo aleatório: role 1d6 no início do turno para determinar a ação. (Mental)' },
    { padroes: ['Debilitado', 'debilitado'],  descricao: 'Sofre –5 em testes de Força, Destreza e Constituição e perícias baseadas neles. Se ficar debilitado novamente, fica Inconsciente.' },
    { padroes: ['Desprevenido', 'desprevenido'], descricao: 'Sofre –5 na Defesa e em Reflexos. Fica desprevenido contra inimigos que não consiga perceber.' },
    { padroes: ['Doente', 'doente'],          descricao: 'Sob efeito de uma doença com efeitos variáveis. (Metabolismo)' },
    { padroes: ['Em Chamas', 'em chamas'],    descricao: 'Sofre 1d6 de dano de fogo no início de cada turno. Gaste uma ação padrão para apagar as chamas.' },
    { padroes: ['Enfeitiçado', 'enfeitiçado'], descricao: 'Torna-se prestativo em relação à fonte. A fonte recebe +10 em Diplomacia com o personagem. (Mental)' },
    { padroes: ['Enjoado', 'enjoado'],        descricao: 'Só pode realizar uma ação padrão ou de movimento (não ambas) por rodada. (Metabolismo)' },
    { padroes: ['Enredado', 'enredado'],      descricao: 'Fica Lento e Vulnerável e sofre –2 em testes de ataque. (Movimento)' },
    { padroes: ['Envenenado', 'envenenado'],  descricao: 'Sob efeito de um veneno. Efeito varia conforme o veneno — pode ser perda de PV recorrente ou outras condições. (Veneno)' },
    { padroes: ['Esmorecido', 'esmorecido'],  descricao: 'Sofre –5 em testes de Inteligência, Sabedoria e Carisma e perícias baseadas neles. (Mental)' },
    { padroes: ['Exausto', 'exausto'],        descricao: 'Fica Debilitado, Lento e Vulnerável. Se ficar exausto novamente, fica Inconsciente. (Cansaço)' },
    { padroes: ['Fascinado', 'fascinado'],    descricao: 'Sofre –5 em Percepção e não pode fazer ações — apenas observar o que o fascinou. Anulado por ações hostis. (Mental)' },
    { padroes: ['Fatigado', 'fatigado'],      descricao: 'Fica Fraco e Vulnerável. Se ficar fatigado novamente, fica Exausto. (Cansaço)' },
    { padroes: ['Fraco', 'fraco'],            descricao: 'Sofre –2 em testes de Força, Destreza e Constituição e perícias baseadas neles. Se ficar fraco novamente, fica Debilitado.' },
    { padroes: ['Frustrado', 'frustrado'],    descricao: 'Sofre –2 em testes de Inteligência, Sabedoria e Carisma. Se ficar frustrado novamente, fica Esmorecido. (Mental)' },
    { padroes: ['Imóvel', 'imóvel'],          descricao: 'Todas as formas de deslocamento são reduzidas a 0m. (Movimento)' },
    { padroes: ['Inconsciente', 'inconsciente'], descricao: 'Fica Indefeso e não pode fazer ações (nem reações). Para acordar gasta uma ação padrão de quem estiver adjacente.' },
    { padroes: ['Indefeso', 'indefeso'],      descricao: 'Fica Desprevenido com –10 na Defesa, falha automaticamente em Reflexos e pode sofrer golpes de misericórdia.' },
    { padroes: ['Lento', 'lento'],            descricao: 'Deslocamento reduzido à metade. Não pode correr nem fazer investidas. (Movimento)' },
    { padroes: ['Ofuscado', 'ofuscado'],      descricao: 'Sofre –2 em testes de ataque e de Percepção. (Sentidos)' },
    { padroes: ['Paralisado', 'paralisado'],  descricao: 'Fica Imóvel e Indefeso. Só pode realizar ações puramente mentais. (Movimento)' },
    { padroes: ['Pasmo', 'pasmo'],            descricao: 'Não pode fazer ações. (Mental)' },
    { padroes: ['Petrificado', 'petrificado'], descricao: 'Fica Inconsciente e recebe redução de dano 8. (Metamorfose)' },
    { padroes: ['Sangrando', 'sangrando'],    descricao: 'No início de cada turno, teste de Constituição (CD 15) ou perde 1d6 PV. Passar no teste remove a condição. (Metabolismo)' },
    { padroes: ['Sobrecarregado', 'sobrecarregado'], descricao: 'Sofre penalidade de armadura –5 e deslocamento reduzido em –3m. (Movimento)' },
    { padroes: ['Surdo', 'surdo'],            descricao: 'Não ouve. –5 em testes de Iniciativa. Condição ruim para lançar magias. (Sentidos)' },
    { padroes: ['Surpreendido', 'surpreendido'], descricao: 'Fica Desprevenido e não pode fazer ações no primeiro turno.' },
    { padroes: ['Vulnerável', 'vulnerável'],  descricao: 'Sofre –2 na Defesa.' },
  ],
};

// ── FUNÇÃO DE PROCESSAMENTO ─────────────────────────────────

function _escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function _escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Constrói lista plana de keywords ordenada por comprimento (maior primeiro)
function _buildKeywordList() {
  const lista = [];
  for (const [tipo, itens] of Object.entries(KEYWORDS_T20)) {
    for (const item of itens) {
      const padroes = Array.isArray(item.padroes) ? item.padroes : [item.padroes];
      for (const padrao of padroes) {
        lista.push({ padrao, tipo, descricao: item.descricao });
      }
    }
  }
  // Mais longos primeiro para evitar match parcial
  lista.sort((a, b) => b.padrao.length - a.padrao.length);
  return lista;
}

const _KEYWORD_LIST = _buildKeywordList();

/**
 * Processa texto plano e envolve palavras-chave em <span class="kw kw-TIPO">
 * Usa sistema de placeholders para evitar re-processamento.
 * @param {string} texto - texto da descrição (sem HTML)
 * @returns {string} - HTML com spans de keywords
 */
function processarKeywords(texto) {
  if (!texto || typeof texto !== 'string') return texto;

  const placeholders = [];
  let resultado = texto;

  for (const kw of _KEYWORD_LIST) {
    // \b não funciona bem com acentos em pt-BR; usamos lookbehind/lookahead de espaço/pontuação
    const regex = new RegExp(
      `(?<=[\\s,;:.!?()\\-"']|^)(${_escapeRegex(kw.padrao)})(?=[\\s,;:.!?()\\-"']|$)`,
      'g'
    );
    resultado = resultado.replace(regex, (match, capture) => {
      const idx = placeholders.length;
      const desc = _escapeHtml(kw.descricao);
      placeholders.push(
        `<span class="kw kw-${kw.tipo}" data-kw-nome="${_escapeHtml(capture)}" data-kw-tipo="${kw.tipo}" data-tooltip="${desc}">${capture}</span>`
      );
      return `\x00${idx}\x00`;
    });
  }

  // Restaura placeholders
  resultado = resultado.replace(/\x00(\d+)\x00/g, (_, idx) => placeholders[+idx] || '');
  return resultado;
}

// Expõe globalmente
window.processarKeywords = processarKeywords;
