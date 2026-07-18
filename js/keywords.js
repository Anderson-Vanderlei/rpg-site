/* ============================================================
   TORMENTA 20 — keywords.js  (v2)
   Sistema de palavras-chave com tooltip
   Edição Jogo do Ano v1.3
============================================================ */

const KEYWORDS_T20 = {

  // ── TIPOS DE AÇÃO (cap. 5, p. 233) ──
  acao: [
    { padroes: ['ação completa', 'ações completas'],
      descricao: 'Ocupa todo o turno — equivale a usar a ação padrão e a de movimento juntas. Não é possível fazer reações nesse turno.' },
    { padroes: ['ação de movimento', 'ações de movimento'],
      descricao: 'Permite se mover até o deslocamento normal, sacar/guardar um item, levantar-se ou realizar outras ações menores.' },
    { padroes: ['ação padrão', 'ações padrão'],
      descricao: 'A ação principal do turno. Usada para atacar, lançar magias, usar habilidades e realizar a maioria das ações ofensivas.' },
    { padroes: ['ação livre', 'ações livres'],
      descricao: 'Pode ser realizada a qualquer momento, mesmo fora do turno. Não custa ação e múltiplas são permitidas por rodada.' },
    { padroes: ['reação', 'reações'],
      descricao: 'Feita fora do próprio turno, em resposta a um evento específico. Apenas uma reação por rodada é permitida.' },
  ],

  // ── ATRIBUTOS BASE (cap. 1, p. 17) ──
  atributo: [
    { padroes: ['sua Força', 'seu bônus de Força', 'modificador de Força'],
      descricao: 'Força: poder muscular. Afeta ataques corpo a corpo, dano, Atletismo e manobras físicas.' },
    { padroes: ['Força'],
      descricao: 'Força: poder muscular. Afeta ataques corpo a corpo, dano, Atletismo e manobras físicas.' },
    { padroes: ['sua Destreza', 'seu bônus de Destreza', 'modificador de Destreza'],
      descricao: 'Destreza: agilidade e reflexos. Afeta Defesa (sem armadura pesada), Reflexos, Acrobacia, Furtividade e ataques à distância.' },
    { padroes: ['Destreza'],
      descricao: 'Destreza: agilidade e reflexos. Afeta Defesa, Reflexos, Acrobacia, Furtividade e ataques à distância.' },
    { padroes: ['sua Constituição', 'seu bônus de Constituição', 'modificador de Constituição'],
      descricao: 'Constituição: resistência física. Afeta pontos de vida por nível e testes de Fortitude.' },
    { padroes: ['Constituição'],
      descricao: 'Constituição: resistência física. Afeta pontos de vida por nível e testes de Fortitude.' },
    { padroes: ['sua Inteligência', 'seu bônus de Inteligência', 'modificador de Inteligência'],
      descricao: 'Inteligência: raciocínio e memória. Atributo-chave do Arcanista (Bruxo/Mago) e Inventor. Afeta Conhecimento e Investigação.' },
    { padroes: ['Inteligência'],
      descricao: 'Inteligência: raciocínio e memória. Atributo-chave do Arcanista (Bruxo/Mago) e Inventor.' },
    { padroes: ['sua Sabedoria', 'seu bônus de Sabedoria', 'modificador de Sabedoria'],
      descricao: 'Sabedoria: percepção e discernimento. Atributo-chave do Clérigo e Druida. Afeta Percepção, Intuição e Vontade.' },
    { padroes: ['Sabedoria'],
      descricao: 'Sabedoria: percepção e discernimento. Atributo-chave do Clérigo e Druida.' },
    { padroes: ['seu Carisma', 'seu bônus de Carisma', 'modificador de Carisma'],
      descricao: 'Carisma: presença e força de vontade. Atributo-chave do Feiticeiro, Bardo, Bucaneiro, Nobre e Paladino.' },
    { padroes: ['Carisma'],
      descricao: 'Carisma: presença e força de vontade. Atributo-chave do Feiticeiro, Bardo, Bucaneiro, Nobre e Paladino.' },
  ],

  // ── ALCANCES (cap. 5, p. 221) ──
  alcance: [
    { padroes: ['alcance visual'],
      descricao: 'Alcance visual: qualquer alvo que você possa ver, sem limite de distância prática.' },
    { padroes: ['alcance longo'],
      descricao: 'Alcance longo: até 30m de distância.' },
    { padroes: ['alcance médio'],
      descricao: 'Alcance médio: até 15m de distância.' },
    { padroes: ['alcance curto'],
      descricao: 'Alcance curto: até 9m de distância.' },
    { padroes: ['alcance corpo a corpo', 'alcance de toque'],
      descricao: 'Alcance corpo a corpo / toque: até 1,5m — exige contato físico ou proximidade imediata.' },
  ],

  // ── TIPOS DE PARCEIRO (Cap. 6, pp. 260–261) ──
  parceiro: [
    {
      padroes: ['Adepto'],
      descricao: 'Parceiro Adepto — Conjurador que reduz custo de magias. Iniciante: –1 PM em magias de 1º círculo. Veterano: também reduz magias de 2º círculo. Mestre: redução cumulativa com outras fontes.',
    },
    {
      padroes: ['Ajudante'],
      descricao: 'Parceiro Ajudante — Bardo, nobre ou sábio encorajador. Iniciante: +2 em 2 perícias. Veterano: +2 em 3 perícias. Mestre: +4 em 3 perícias. Não fornece bônus em Luta ou Pontaria.',
    },
    {
      padroes: ['Assassino'],
      descricao: 'Parceiro Assassino — Ladino furtivo e letal. Iniciante: você pode usar Ataque Furtivo +1d6. Veterano: +1d6 e bônus por flanquear. Mestre: Ataque Furtivo +2d6.',
    },
    {
      padroes: ['Atirador'],
      descricao: 'Parceiro Atirador — Arqueiro ou besteiro. Iniciante: +1d6 em uma rolagem de dano à distância por rodada. Veterano: +1d10. Mestre: +2d8.',
    },
    {
      padroes: ['Combatente'],
      descricao: 'Parceiro Combatente — Guerreiro, paladino ou animal de caça. Iniciante: +2 em testes de ataque. Veterano: +3. Mestre: +4 em testes de ataque e pode gastar 5 PM para um ataque extra por rodada.',
    },
    {
      padroes: ['Destruidor'],
      descricao: 'Parceiro Destruidor — Arcanista ou inventor explosivo. Iniciante: gaste 1 PM → 2d6 de dano elemental em alcance curto. Veterano: 2 PM → 4d6. Mestre: 4 PM → 6d6 em área de 6m.',
    },
    {
      padroes: ['Fortão'],
      descricao: 'Parceiro Fortão — Bárbaro, lutador ou bruto. Iniciante: +1d8 em uma rolagem de dano corpo a corpo por rodada. Veterano: +1d12. Mestre: +3d6.',
    },
    {
      padroes: ['Guardião'],
      descricao: 'Parceiro Guardião — Cavaleiro, cão de guarda ou protetor. Iniciante: +2 na Defesa. Veterano: +3. Mestre: +4 na Defesa e +2 em testes de resistência.',
    },
    {
      padroes: ['Magivocador'],
      descricao: 'Parceiro Magivocador — Conjurador ofensivo. Iniciante: +1 dado de dano do mesmo tipo em suas magias. Veterano: +1 na CD. Mestre: dobra ambos os bônus.',
    },
    {
      padroes: ['Médico'],
      descricao: 'Parceiro Médico — Clérigo, druida ou herbalista. Iniciante: gaste 1 PM → cura 1d8+1 PV adjacente. Veterano: 3 PM → 3d8+3 PV ou remove condição. Mestre: 5 PM → 6d8+6 PV.',
    },
    {
      padroes: ['Perseguidor'],
      descricao: 'Parceiro Perseguidor — Caçador ou animal farejador. Iniciante: +2 em Percepção e Sobrevivência. Veterano: pode usar Sentidos Aguçados. Mestre: pode usar Percepção às Cegas.',
    },
    {
      padroes: ['Vigilante'],
      descricao: 'Parceiro Vigilante — Vigia ou animal de guarda. Iniciante: +2 em Percepção e Iniciativa. Veterano: pode usar Esquiva Sobrenatural. Mestre: pode usar Olhos nas Costas.',
    },
  ],

  // ── DURAÇÃO DE EFEITOS (cap. 5) ──
  duracao: [
    { padroes: ['até o fim da aventura', 'até o final da aventura'],
      descricao: 'Duração: aventura inteira. O efeito persiste por toda a aventura atual.' },
    { padroes: ['até o fim da cena', 'até o final da cena'],
      descricao: 'Duração: cena. O efeito termina quando a cena atual se encerra — geralmente ao fim de um combate ou situação dramática.' },
    { padroes: ['até o início do seu próximo turno', 'até o início de seu próximo turno'],
      descricao: 'Duração: até o início do próximo turno. O efeito dura até o começo da próxima ação do personagem.' },
    { padroes: ['até o fim do seu próximo turno', 'até o final do seu próximo turno'],
      descricao: 'Duração: até o fim do próximo turno. O efeito dura até o final da próxima ação do personagem.' },
    { padroes: ['por uma rodada'],
      descricao: 'Duração: 1 rodada (~6 segundos). O efeito dura até o início do próximo turno do personagem que o causou.' },
    { padroes: ['permanente', 'permanentemente'],
      descricao: 'Duração: permanente. O efeito não tem duração — dura para sempre, a menos que seja removido especificamente.' },
    { padroes: ['sustentado', 'efeito sustentado'],
      descricao: 'Duração: sustentado. O efeito continua enquanto você gastar uma ação livre por rodada para mantê-lo.' },
    { padroes: ['por um dia', 'até o próximo dia'],
      descricao: 'Duração: 1 dia. O efeito termina no próximo período de descanso longo.' },
  ],

  // ── TERMOS DE COMBATE (cap. 5, pp. 228–239) ──
  combate: [
    { padroes: ['acerto crítico', 'acertos críticos'],
      descricao: 'Acerto crítico: quando o d20 cai na margem de ameaça (normalmente 20). Multiplica o dano pelo multiplicador de crítico da arma.' },
    { padroes: ['redução de dano'],
      descricao: 'Redução de dano (RD): subtrai um valor fixo de todo dano físico sofrido. Ex: RD 5 reduz 10 de dano para 5. Não reduz abaixo de 0.' },
    { padroes: ['margem de ameaça'],
      descricao: 'Margem de ameaça: faixa de valores no d20 que geram acerto crítico (ex: 19-20, 18-20). Quanto maior, mais fácil acertar crítico.' },
    { padroes: ['multiplicador de crítico'],
      descricao: 'Multiplicador de crítico: define quantas vezes o dano é multiplicado num acerto crítico (x2, x3 ou x4).' },
    { padroes: ['PV temporários', 'pontos de vida temporários', 'ponto de vida temporário'],
      descricao: 'PV temporários: pontos de vida extras que servem como buffer — são perdidos antes dos PV reais e não curam PV ao desaparecer.' },
    { padroes: ['PM temporários', 'pontos de mana temporários', 'ponto de mana temporário'],
      descricao: 'PM temporários: pontos de mana extras que são gastos antes dos PM reais e desaparecem no fim da cena.' },
    { padroes: ['dano não letal'],
      descricao: 'Dano não letal: reduz PV mas leva o personagem a 0 PV inconsciente (em vez de morto). Cura mais rapidamente.' },
    { padroes: ['teste de ataque'],
      descricao: 'Teste de ataque: 1d20 + bônus de ataque vs. Defesa do alvo. Sucesso significa que o ataque acerta e você rola o dano.' },
    { padroes: ['golpe de misericórdia'],
      descricao: 'Golpe de misericórdia: ataque automático contra criatura indefesa. Causa dano máximo e força teste de Fortitude ou mata.' },
    { padroes: ['terreno difícil'],
      descricao: 'Terreno difícil: área que custa o dobro do deslocamento para atravessar (lama, escombros, água rasa etc.).' },
    { padroes: ['flanquear', 'flanqueando', 'flanqueado'],
      descricao: 'Flanquear: quando você e um aliado estão em lados opostos de um inimigo, ambos recebem +1 nos testes de ataque corpo a corpo contra ele.' },
    { padroes: ['teste de resistência', 'testes de resistência'],
      descricao: 'Teste de resistência: rolagem (Fortitude, Reflexos ou Vontade) para resistir a um efeito. A CD normalmente é definida por quem causa o efeito.' },
  ],

  // ── PERÍCIAS (cap. 2, pp. 114–123) ──
  pericia: [
    { padroes: ['Acrobacia'],     descricao: 'Acrobacia (Des): equilíbrio, cambalhotas, movimentos acrobáticos e cair sem se machucar.' },
    { padroes: ['Adestramento'],  descricao: 'Adestramento (Car): acalmar, treinar e controlar animais.' },
    { padroes: ['Atletismo'],     descricao: 'Atletismo (For): escalar, nadar, saltar longas distâncias e realizar façanhas físicas.' },
    { padroes: ['Atuação'],       descricao: 'Atuação (Car): performance artística — música, dança, teatro, discurso.' },
    { padroes: ['Cavalgar'],      descricao: 'Cavalgar (Des): montar e controlar montarias, inclusive em combate.' },
    { padroes: ['Conhecimento'],  descricao: 'Conhecimento (Int): saber sobre história, natureza, arcano, engenharia ou outros tópicos.' },
    { padroes: ['Cura'],          descricao: 'Cura (Sab): tratar ferimentos, curar doenças e estabilizar moribundos.' },
    { padroes: ['Diplomacia'],    descricao: 'Diplomacia (Car): negociar, persuadir e mudar a atitude de NPCs.' },
    { padroes: ['Enganação'],     descricao: 'Enganação (Car): mentir, blefar, disfarçar-se e iludir outros.' },
    { padroes: ['Fortitude'],     descricao: 'Fortitude (Con): resistência física contra venenos, doenças e efeitos corporais.' },
    { padroes: ['Furtividade'],   descricao: 'Furtividade (Des): mover-se silenciosamente e sem ser percebido.' },
    { padroes: ['Guerra'],        descricao: 'Guerra (Int): conhecimento tático, formações militares e histórico bélico.' },
    { padroes: ['Iniciativa'],    descricao: 'Iniciativa (Des): determina a ordem de ação no início do combate.' },
    { padroes: ['Intimidação'],   descricao: 'Intimidação (Car): ameaçar, amedrontar e coagir criaturas.' },
    { padroes: ['Intuição'],      descricao: 'Intuição (Sab): detectar mentiras e perceber intenções ocultas.' },
    { padroes: ['Investigação'],  descricao: 'Investigação (Int): encontrar pistas e analisar evidências.' },
    { padroes: ['Jogatina'],      descricao: 'Jogatina (Car): jogos de azar, truques de cartas e blefe competitivo.' },
    { padroes: ['Ladinagem'],     descricao: 'Ladinagem (Des): abrir fechaduras, desarmar armadilhas e bater bolsos.' },
    { padroes: ['Luta'],          descricao: 'Luta (For): ataques corpo a corpo com armas ou desarmado.' },
    { padroes: ['Misticismo'],    descricao: 'Misticismo (Int): identificar magias e efeitos mágicos. Atributo-chave de muitas magias arcanas.' },
    { padroes: ['Nobreza'],       descricao: 'Nobreza (Int): protocolo, etiqueta e política da nobreza de Arton.' },
    { padroes: ['Ofício'],        descricao: 'Ofício (Int): criar, reparar e avaliar itens com um ofício específico.' },
    { padroes: ['Percepção'],     descricao: 'Percepção (Sab): notar detalhes, detectar perigos e inimigos ocultos.' },
    { padroes: ['Pilotagem'],     descricao: 'Pilotagem (Des): controlar veículos aquáticos, aéreos ou complexos.' },
    { padroes: ['Pontaria'],      descricao: 'Pontaria (Des): ataques à distância com arcos, bestas e armas de arremesso.' },
    { padroes: ['Reflexos'],      descricao: 'Reflexos (Des): resistência a ataques em área e perigos físicos rápidos.' },
    { padroes: ['Religião'],      descricao: 'Religião (Sab): conhecimento sobre deuses, rituais e criaturas sobrenaturais.' },
    { padroes: ['Sobrevivência'], descricao: 'Sobrevivência (Sab): rastrear, navegar e sobreviver em ambientes selvagens.' },
    { padroes: ['Vontade'],       descricao: 'Vontade (Sab): resistência mental contra magias de encantamento, ilusão e medo.' },
  ],

  // ── CONDIÇÕES (apêndice, pp. 394–395) ──
  cond: [
    { padroes: ['Abalado', 'abalado'],           descricao: 'Sofre –2 em testes de perícia. Se ficar abalado novamente, fica Apavorado. (Medo)' },
    { padroes: ['Agarrado', 'agarrado'],          descricao: 'Fica Desprevenido e Imóvel, sofre –2 em testes de ataque e só pode usar armas leves. (Movimento)' },
    { padroes: ['Alquebrado', 'alquebrado'],      descricao: 'O custo em PM das habilidades aumenta em +1. (Mental)' },
    { padroes: ['Apavorado', 'apavorado'],        descricao: 'Sofre –5 em testes de perícia e não pode se aproximar voluntariamente da fonte do medo. (Medo)' },
    { padroes: ['Atordoado', 'atordoado'],        descricao: 'Fica Desprevenido e não pode fazer ações. (Mental)' },
    { padroes: ['Caído', 'caído'],               descricao: 'Sofre –5 na Defesa contra ataques corpo a corpo e –5 em ataques corpo a corpo. +5 contra ataques à distância.' },
    { padroes: ['Cego', 'cego'],                  descricao: 'Fica Desprevenido e Lento. –5 em perícias de For/Des. Todos os alvos têm camuflagem total. (Sentidos)' },
    { padroes: ['Confuso', 'confuso'],            descricao: 'Age de modo aleatório: role 1d6 no início do turno para determinar a ação. (Mental)' },
    { padroes: ['Debilitado', 'debilitado'],      descricao: 'Sofre –5 em For, Des e Con. Se ficar debilitado novamente, fica Inconsciente.' },
    { padroes: ['Desprevenido', 'desprevenido'],  descricao: 'Sofre –5 na Defesa e em Reflexos.' },
    { padroes: ['Doente', 'doente'],              descricao: 'Sob efeito de uma doença com efeitos variáveis. (Metabolismo)' },
    { padroes: ['Em Chamas', 'em chamas'],        descricao: 'Sofre 1d6 de dano de fogo no início de cada turno. Gaste uma ação padrão para apagar as chamas.' },
    { padroes: ['Enfeitiçado', 'enfeitiçado'],    descricao: 'Torna-se prestativo em relação à fonte. A fonte recebe +10 em Diplomacia. (Mental)' },
    { padroes: ['Enjoado', 'enjoado'],            descricao: 'Só pode realizar uma ação padrão ou de movimento (não ambas) por rodada. (Metabolismo)' },
    { padroes: ['Enredado', 'enredado'],          descricao: 'Fica Lento e Vulnerável, sofre –2 em testes de ataque. (Movimento)' },
    { padroes: ['Envenenado', 'envenenado'],      descricao: 'Sob efeito de um veneno — perda de PV recorrente ou outras condições. (Veneno)' },
    { padroes: ['Esmorecido', 'esmorecido'],      descricao: 'Sofre –5 em Int, Sab e Car. (Mental)' },
    { padroes: ['Exausto', 'exausto'],            descricao: 'Fica Debilitado, Lento e Vulnerável. Se ficar exausto novamente, fica Inconsciente. (Cansaço)' },
    { padroes: ['Fascinado', 'fascinado'],        descricao: 'Sofre –5 em Percepção e não pode fazer ações — apenas observar o que o fascinou. (Mental)' },
    { padroes: ['Fatigado', 'fatigado'],          descricao: 'Fica Fraco e Vulnerável. Se ficar fatigado novamente, fica Exausto. (Cansaço)' },
    { padroes: ['Fraco', 'fraco'],                descricao: 'Sofre –2 em For, Des e Con. Se ficar fraco novamente, fica Debilitado.' },
    { padroes: ['Frustrado', 'frustrado'],        descricao: 'Sofre –2 em Int, Sab e Car. Se ficar frustrado novamente, fica Esmorecido. (Mental)' },
    { padroes: ['Imóvel', 'imóvel'],             descricao: 'Todas as formas de deslocamento são reduzidas a 0m. (Movimento)' },
    { padroes: ['Inconsciente', 'inconsciente'],  descricao: 'Fica Indefeso e não pode fazer ações (nem reações).' },
    { padroes: ['Indefeso', 'indefeso'],          descricao: 'Fica Desprevenido com –10 na Defesa, falha automaticamente em Reflexos.' },
    { padroes: ['Lento', 'lento'],                descricao: 'Deslocamento reduzido à metade. Não pode correr nem fazer investidas. (Movimento)' },
    { padroes: ['Ofuscado', 'ofuscado'],          descricao: 'Sofre –2 em testes de ataque e de Percepção. (Sentidos)' },
    { padroes: ['Paralisado', 'paralisado'],      descricao: 'Fica Imóvel e Indefeso. Só pode realizar ações puramente mentais. (Movimento)' },
    { padroes: ['Pasmo', 'pasmo'],                descricao: 'Não pode fazer ações. (Mental)' },
    { padroes: ['Petrificado', 'petrificado'],    descricao: 'Fica Inconsciente e recebe redução de dano 8. (Metamorfose)' },
    { padroes: ['Sangrando', 'sangrando'],        descricao: 'Testa Con (CD 15) no início de cada turno ou perde 1d6 PV. Passar no teste remove a condição.' },
    { padroes: ['Sobrecarregado', 'sobrecarregado'], descricao: 'Penalidade de armadura –5 e deslocamento –3m. (Movimento)' },
    { padroes: ['Surdo', 'surdo'],                descricao: 'Não ouve. –5 em Iniciativa. Condição ruim para lançar magias. (Sentidos)' },
    { padroes: ['Surpreendido', 'surpreendido'],  descricao: 'Fica Desprevenido e não pode fazer ações no primeiro turno.' },
    { padroes: ['Vulnerável', 'vulnerável'],      descricao: 'Sofre –2 na Defesa.' },
  ],
};

// ── UTILITÁRIOS ────────────────────────────────────────────

function _escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function _escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

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
  lista.sort((a, b) => b.padrao.length - a.padrao.length);

  // Pré-compila o regex e o HTML da descrição uma única vez por padrão aqui,
  // em vez de refazer isso a cada chamada de processarKeywords() — antes,
  // toda descrição de poder recompilava ~90 regex do zero.
  for (const kw of lista) {
    kw.regex = new RegExp(
      `(?<=[\\s,;:.!?()"'\\-]|^)(${_escapeRegex(kw.padrao)})(?=[\\s,;:.!?()"'\\-]|$)`,
      'g'
    );
    kw.descHtml = _escapeHtml(kw.descricao);
  }

  return lista;
}

const _KEYWORD_LIST = _buildKeywordList();

// Cache da lista de Poderes Gerais pra keyword — construída sob demanda na
// primeira vez que processarKeywords() rodar (ver função principal abaixo),
// porque depende de window.PODERES_GERAIS já estar carregado.
let _PODER_GERAL_LIST = null;

// ── DETECÇÃO NUMÉRICA AUTOMÁTICA ───────────────────────────

function _processarNumericos(texto, placeholders) {
  let r = texto;

  // 1. Dados de dano: 2d6, 1d8, 3d12 etc.  → laranja (num-dano)
  r = r.replace(/\b(\d+d\d+)\b/g, (m, dado) => {
    const idx = placeholders.length;
    placeholders.push(`<span class="num-dano">${dado}</span>`);
    return `\x00${idx}\x00`;
  });

  // 2. Custo de PM: "3 PM", "–1 PM", "+1 PM" → roxo (num-pm)
  r = r.replace(/([+\-–−]?\d+)\s*(PM)\b/g, (m, num, pm) => {
    const idx = placeholders.length;
    placeholders.push(`<span class="num-pm">${num} ${pm}</span>`);
    return `\x00${idx}\x00`;
  });

  // 3. Bônus: +N (não seguido de d ou PM) → verde (num-bonus)
  r = r.replace(/\+(\d+)(?!\s*d\d|\s*PM)/g, (m, n) => {
    const idx = placeholders.length;
    placeholders.push(`<span class="num-bonus">+${n}</span>`);
    return `\x00${idx}\x00`;
  });

  // 4. Penalidades: –N, -N (não seguido de d) → vermelho suave (num-pen)
  r = r.replace(/[–−-](\d+)(?!\s*d\d|\s*PM)/g, (m, n) => {
    const sinal = m[0];
    const idx = placeholders.length;
    placeholders.push(`<span class="num-pen">${sinal}${n}</span>`);
    return `\x00${idx}\x00`;
  });

  return r;
}

// ── FUNÇÃO PRINCIPAL ────────────────────────────────────────

function processarKeywords(texto) {
  if (!texto || typeof texto !== 'string') return texto;

  const placeholders = [];
  let resultado = texto;

  // Passo 1: padrões numéricos automáticos
  resultado = _processarNumericos(resultado, placeholders);

  // Passo 2: palavras-chave do dicionário
  for (const kw of _KEYWORD_LIST) {
    resultado = resultado.replace(kw.regex, (_, capture) => {
      const idx = placeholders.length;
      const nomeEscapado = _escapeHtml(capture);
      // Perícias linkam para a página de Perícias (abre e expande a linha)
      const clickAttr = kw.tipo === 'pericia'
        ? ` onclick="event.stopPropagation(); window.irParaPericia && window.irParaPericia('${nomeEscapado.replace(/'/g, "\\'")}')" style="cursor:pointer"`
        : '';
      placeholders.push(
        `<span class="kw kw-${kw.tipo}"` +
        ` data-kw-nome="${nomeEscapado}"` +
        ` data-kw-tipo="${kw.tipo}"` +
        clickAttr +
        ` data-tooltip="${kw.descHtml}">${capture}</span>`
      );
      return `\x00${idx}\x00`;
    });
  }

  // Passo 3: nomes de Poderes Gerais (Combate/Destino/Magia/Concedidos/Tormenta) —
  // construído sob demanda a partir de window.PODERES_GERAIS (já carregado nesse
  // ponto, pois só roda quando algo é efetivamente renderizado). Não duplica os
  // 162 nomes aqui: lê direto do arquivo de dados, uma vez só, e cacheia.
  if (!_PODER_GERAL_LIST && typeof window !== 'undefined' && window.PODERES_GERAIS) {
    _PODER_GERAL_LIST = window.PODERES_GERAIS
      .filter(p => p.nome)
      .map(p => ({
        nome: p.nome,
        categoria: p.categoria,
        regex: new RegExp(
          `(?<=[\\s,;:.!?()"'\\-]|^)(${_escapeRegex(p.nome)})(?=[\\s,;:.!?()"'\\-]|$)`,
          'g'
        ),
      }))
      .sort((a, b) => b.nome.length - a.nome.length);
  }
  if (_PODER_GERAL_LIST) {
    for (const pg of _PODER_GERAL_LIST) {
      resultado = resultado.replace(pg.regex, (_, capture) => {
        const idx = placeholders.length;
        const nomeEscapado = _escapeHtml(capture).replace(/'/g, "\\'");
        placeholders.push(
          `<span class="kw kw-poder-geral"` +
          ` onclick="event.stopPropagation(); window.irParaPoderGeral && window.irParaPoderGeral('${nomeEscapado}', '${pg.categoria}')"` +
          ` style="cursor:pointer">${capture}</span>`
        );
        return `\x00${idx}\x00`;
      });
    }
  }

  // Passo 3: restaura placeholders
  resultado = resultado.replace(/\x00(\d+)\x00/g, (_, i) => placeholders[+i] || '');
  return resultado;
}

// ── DETECÇÃO DE DURAÇÃO (para badge nos cards) ─────────────

function detectarDuracao(descricao) {
  if (!descricao) return null;
  const d = descricao.toLowerCase();
  if (d.includes('permanente') || d.includes('permanentemente'))
    return { label: 'Permanente', classe: 'bd-perm' };
  if (d.includes('sustentado') || d.includes('efeito sustentado'))
    return { label: 'Sustentado', classe: 'bd-sust' };
  if (d.includes('até o fim da aventura') || d.includes('até o final da aventura'))
    return { label: 'Aventura', classe: 'bd-dia' };
  if (d.includes('até o fim da cena') || d.includes('até o final da cena'))
    return { label: 'Cena', classe: 'bd-cena' };
  if (d.includes('até o início') && d.includes('próximo turno'))
    return { label: 'Próximo turno', classe: 'bd-turno' };
  if (d.includes('por uma rodada') || d.includes('por 1 rodada'))
    return { label: '1 rodada', classe: 'bd-rodada' };
  if (d.includes('por um dia') || d.includes('até o próximo dia'))
    return { label: '1 dia', classe: 'bd-dia' };
  return null;
}

window.processarKeywords  = processarKeywords;
window.detectarDuracao    = detectarDuracao;
