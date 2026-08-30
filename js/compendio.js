/* ============================================================
   TORMENTA 20 — compendio.js
   Nav hierárquico, cards de raças, painel de detalhes, busca
============================================================ */

let _cpTodosPoderes  = [];
let _cpPoderFiltro   = 'todos';
let _cpPoderBusca    = '';
let _cpNivelFiltro = 0; // 0 = sem filtro de nível

// ── SELEÇÃO DE PODERES PARA O PERSONAGEM ───────────────────
// Padronizado em kebab-case (mesmo padrão de `t20-pontos-*` no atlas.js).
// Migra automaticamente de quem já tinha dados salvos na chave antiga.
const T20_STORAGE_KEY = 't20-personagem-poderes';
const T20_STORAGE_KEY_LEGADO = 't20_personagem_poderes';

function _carregarPoderesSelecionados() {
  try {
    const atual = localStorage.getItem(T20_STORAGE_KEY);
    if (atual !== null) return JSON.parse(atual);
    const legado = localStorage.getItem(T20_STORAGE_KEY_LEGADO);
    if (legado !== null) {
      localStorage.setItem(T20_STORAGE_KEY, legado);
      localStorage.removeItem(T20_STORAGE_KEY_LEGADO);
      return JSON.parse(legado);
    }
    return [];
  } catch { return []; }
}

function _salvarPoderesSelecionados(lista) {
  try { localStorage.setItem(T20_STORAGE_KEY, JSON.stringify(lista)); }
  catch (e) { console.warn('localStorage indisponível:', e); }
}

function _poderEstaSelecionado(classeId, poderId) {
  return _carregarPoderesSelecionados()
    .some(p => p.classeId === classeId && p.poderId === poderId);
}

window.togglePoderPersonagem = function(classeId, poderId, btn) {
  let lista = _carregarPoderesSelecionados();
  const idx = lista.findIndex(p => p.classeId === classeId && p.poderId === poderId);

  if (idx >= 0) {
    lista.splice(idx, 1);
    if (btn) {
      btn.classList.remove('selecionado');
      btn.innerHTML = '<i class="ti ti-plus" aria-hidden="true"></i> Adicionar ao personagem';
    }
  } else {
    lista.push({ classeId, poderId, nome: btn?.dataset.nome || poderId });
    if (btn) {
      btn.classList.add('selecionado');
      btn.innerHTML = '<i class="ti ti-check" aria-hidden="true"></i> Selecionado';
    }
  }
  _salvarPoderesSelecionados(lista);
};

// ── SELEÇÃO DE OPÇÃO DENTRO DE UM PODER (Familiar, Companheiro Animal, Autômato...) ──
const T20_OPCAO_STORAGE_KEY = 't20-personagem-opcoes';
const T20_OPCAO_STORAGE_KEY_LEGADO = 't20_personagem_opcoes';

function _carregarOpcoesSelecionadas() {
  try {
    const atual = localStorage.getItem(T20_OPCAO_STORAGE_KEY);
    if (atual !== null) return JSON.parse(atual);
    const legado = localStorage.getItem(T20_OPCAO_STORAGE_KEY_LEGADO);
    if (legado !== null) {
      localStorage.setItem(T20_OPCAO_STORAGE_KEY, legado);
      localStorage.removeItem(T20_OPCAO_STORAGE_KEY_LEGADO);
      return JSON.parse(legado);
    }
    return [];
  } catch { return []; }
}

function _salvarOpcoesSelecionadas(lista) {
  try { localStorage.setItem(T20_OPCAO_STORAGE_KEY, JSON.stringify(lista)); }
  catch (e) { console.warn('localStorage indisponível:', e); }
}

function _opcaoEstaSelecionada(classeId, poderId, opcaoNome) {
  return _carregarOpcoesSelecionadas()
    .some(o => o.classeId === classeId && o.poderId === poderId && o.opcaoNome === opcaoNome);
}

window.selecionarOpcaoPoder = function(classeId, poderId, opcaoNome, el) {
  let lista = _carregarOpcoesSelecionadas();
  const idx = lista.findIndex(o => o.classeId === classeId && o.poderId === poderId);
  const jaEra = idx >= 0 && lista[idx].opcaoNome === opcaoNome;

  if (idx >= 0) lista.splice(idx, 1);
  if (!jaEra) lista.push({ classeId, poderId, opcaoNome });
  _salvarOpcoesSelecionadas(lista);

  const painel = el.closest('.cp-esc-opcoes');
  if (painel) painel.querySelectorAll('.cp-esc-opt').forEach(o => o.classList.remove('selecionado'));
  if (!jaEra) el.classList.add('selecionado');
};

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. CURSOR ──────────────────────────────────────────────
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (dot && ring) {
    let mx=0, my=0, rx=0, ry=0;
    document.addEventListener('mousemove', e => {
      mx=e.clientX; my=e.clientY;
      dot.style.left=mx+'px'; dot.style.top=my+'px';
    });
    const anim = () => {
      rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
      ring.style.left=rx+'px'; ring.style.top=ry+'px';
      requestAnimationFrame(anim);
    };
    anim();
    document.querySelectorAll('a,button,.race-card,.nav-grupo-header,.nav-sub-item,.nav-raca-item,.nav-sub-sub-item').forEach(el => {
      el.addEventListener('mouseenter', () => { dot.classList.add('hover'); ring.classList.add('hover'); });
      el.addEventListener('mouseleave', () => { dot.classList.remove('hover'); ring.classList.remove('hover'); });
    });
  }

  // ── 1B. SIDEBAR MOBILE (hambúrguer + overlay) ──────────────
  const sidebarEl     = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const btnHamburguer  = document.getElementById('btnHamburguer');

  window.toggleSidebarMobile = (forcar) => {
    const abrir = typeof forcar === 'boolean' ? forcar : !sidebarEl.classList.contains('mobile-aberta');
    sidebarEl.classList.toggle('mobile-aberta', abrir);
    sidebarOverlay?.classList.toggle('visivel', abrir);
    btnHamburguer?.classList.toggle('ativo', abrir);
  };

  // ── 2. NAV HIERÁRQUICO ─────────────────────────────────────
  // Toggle grupo principal
  window.toggleGrupo = (el) => {
    const grupo = el.closest('.nav-grupo');
    const jaAberto = grupo.classList.contains('expandido');

    // Fecha todos
    document.querySelectorAll('.nav-grupo').forEach(g => {
      g.classList.remove('expandido');
      g.querySelector('.nav-grupo-header').classList.remove('ativo');
    });

    // Abre o clicado (se estava fechado)
    if (!jaAberto) {
      grupo.classList.add('expandido');
      el.classList.add('ativo');
    }
  };

  // Toggle sub-item com filhos (ex: Raças → expande lista)
  window.toggleSubItem = (el, secao) => {
    const temFilhos = el.classList.contains('tem-filhos');

    // Marca como ativo
    document.querySelectorAll('.nav-sub-item').forEach(i => i.classList.remove('ativo'));
    el.classList.add('ativo');

    if (temFilhos) {
      el.classList.toggle('expandido');
      const sub = el.nextElementSibling;
      if (sub && sub.classList.contains('nav-sub-sub')) {
        sub.style.display = el.classList.contains('expandido') ? 'block' : 'none';
      }
    }

    // Mostra o conteúdo da seção
    mostrarSecao(secao);
  };

  // Clique em item de raça individual na nav
  window.irParaRaca = (id) => {
    document.querySelectorAll('.nav-raca-item').forEach(i => i.classList.remove('ativo'));
    document.querySelector(`.nav-raca-item[data-raca="${id}"]`)?.classList.add('ativo');
    mostrarSecao('racas');

    // Abre o detalhe da raça diretamente
    const raca = (window.RACAS||[]).find(r => r.id === id);
    if (raca) setTimeout(() => abrirDetalhe(raca), 100);
  };

  // ── 3. SEÇÕES ──────────────────────────────────────────────
  const secaoAtual = { nome: '' };
  const LS_SECAO = 't20-compendio-ultima-secao';

  // Monta o breadcrumb (Compêndio › Grupo › Seção[ › Sub-seção]) a partir
  // do próprio item de nav clicado, sem duplicar os rótulos em outro lugar.
  function atualizarBreadcrumb(nome) {
    const bcEl = document.getElementById('breadcrumb');
    if (!bcEl) return;

    const partes = ['Compêndio'];
    const alvo = document.querySelector(`[data-secao="${nome}"]`);
    // Quando a seção atual é um "neto" (nav-sub-sub-item, ex: Perigos Simples),
    // o item do meio no breadcrumb (o pai tem-filhos, ex: Perigos) tem uma
    // seção própria de verdade — guardamos o id dele aqui pra deixar esse
    // segmento clicável, voltando direto pra visão geral sem passar pelo menu.
    let idMeioClicavel = null;

    if (alvo) {
      const grupo = alvo.closest('.nav-grupo');
      const grupoLabel = grupo?.querySelector('.grupo-label')?.textContent.trim();
      if (grupoLabel) partes.push(grupoLabel);

      const ehSubSub = alvo.classList.contains('nav-sub-sub-item');
      if (ehSubSub) {
        const subItemPai = alvo.closest('.nav-sub-sub')?.previousElementSibling;
        const subLabel = subItemPai?.querySelector('.sub-label')?.textContent.trim();
        if (subLabel) { partes.push(subLabel); idMeioClicavel = subItemPai?.dataset.secao || null; }
      }

      const label = alvo.querySelector('.sub-label, span')?.textContent.trim();
      if (label) partes.push(label);
    }

    bcEl.innerHTML = partes.map((p, i) => {
      const ehUltimo = i === partes.length - 1;
      // Só o penúltimo segmento pode ser clicável (o pai tem-filhos), e só
      // quando de fato temos uma seção válida pra levar de volta — nunca
      // inventamos destino pros outros níveis (Compêndio / grupo do menu).
      const clicavel = !ehUltimo && i === partes.length - 2 && idMeioClicavel;
      const item = clicavel
        ? `<span class="bc-item bc-item-link" onclick="mostrarSecao('${idMeioClicavel}')" role="button" tabindex="0">${p}</span>`
        : `<span class="bc-item${ehUltimo ? ' bc-atual' : ''}">${p}</span>`;
      return `${i > 0 ? '<i class="ti ti-chevron-right bc-sep" aria-hidden="true"></i>' : ''}${item}`;
    }).join('');
  }

  function mostrarSecao(nome) {
    if (secaoAtual.nome === 'pocoes-pergaminhos' && nome !== 'pocoes-pergaminhos' && typeof resetItensCriadosPocoes === 'function') {
      resetItensCriadosPocoes();
    }
    secaoAtual.nome = nome;
    document.querySelectorAll('.secao-conteudo').forEach(s => s.style.display = 'none');
    const el = document.getElementById('secao-' + nome);
    if (el) el.style.display = 'flex';
    // Fecha todo painel de detalhe aberto (qualquer seção) e limpa a pilha de
    // referências — antes só fechava Raça/Classe (hardcoded, de antes da
    // pilha existir), o que deixava outros painéis flutuando por cima da
    // seção nova ao trocar de aba pela sidebar. Corrigido em 23/ago.
    if (typeof window.fecharTodosPaineisDetalhe === 'function') window.fecharTodosPaineisDetalhe();
    atualizarBreadcrumb(nome);
    localStorage.setItem(LS_SECAO, nome);
    if (window.innerWidth <= 768) toggleSidebarMobile(false);
  }
  window.mostrarSecao = mostrarSecao;

  // Reproduz o clique num item de nav (grupo + sub-item + seção) a partir
  // de um id de seção salvo — usado para restaurar a última seção visitada.
  function ativarSecaoNav(nome) {
    const alvo = document.querySelector(`[data-secao="${nome}"]`);
    if (!alvo) { mostrarSecao('racas'); return; }

    const ehSubSub = alvo.classList.contains('nav-sub-sub-item');
    const subItem = ehSubSub ? alvo.closest('.nav-sub-sub')?.previousElementSibling : alvo;
    const grupo = alvo.closest('.nav-grupo');

    document.querySelectorAll('.nav-grupo').forEach(g => {
      g.classList.remove('expandido');
      g.querySelector('.nav-grupo-header').classList.remove('ativo');
    });
    if (grupo) {
      grupo.classList.add('expandido');
      grupo.querySelector('.nav-grupo-header').classList.add('ativo');
    }

    document.querySelectorAll('.nav-sub-item').forEach(i => i.classList.remove('ativo'));
    if (subItem) {
      subItem.classList.add('ativo');
      if (subItem.classList.contains('tem-filhos')) {
        subItem.classList.add('expandido');
        const sub = subItem.nextElementSibling;
        if (sub) sub.style.display = 'block';
      }
    }

    mostrarSecao(nome);
  }

  // ── 4. RENDERIZAR CARDS DE RAÇAS ───────────────────────────
  const corPorTipo = {
    'Humanoide': '#c9a84c',
    'Espírito':  '#44aa66',
    'Monstro':   '#cc6644',
    'Construto': '#6688aa',
    'Morto-vivo':'#aaaaaa',
  };

  function tagClass(tag) {
    const mapa = {
      'Humanoide':'humanoide','Espírito':'espirito','Monstro':'monstro',
      'Construto':'construto','Morto-vivo':'morto',
      'Comum':'comum','Raro':'rara',
    };
    return 'rc-tag tag-' + (mapa[tag] || 'outros');
  }

  function renderRacas(lista) {
    const grid = document.getElementById('racasGrid');
    if (!grid) return;
    document.getElementById('racasCount').textContent = lista.length + ' raça' + (lista.length !== 1 ? 's' : '');
    grid.innerHTML = '';

    lista.forEach(r => {
      const cor = corPorTipo[r.tipo] || '#888';
      const card = document.createElement('div');
      card.className = 'race-card';
      card.dataset.id = r.id;
      card.innerHTML = `
        <div class="rc-img" style="background:linear-gradient(135deg,${cor}15,#0a0707)">
          <i class="ti ${r.icone} rc-img-icon" style="color:${cor}33" aria-hidden="true"></i>
          <div class="rc-img-badges">
            <span class="rc-badge badge-${r.raridade}">${r.raridade === 'comum' ? 'Comum' : 'Rara'}</span>
            <span class="rc-badge badge-fonte">${r.fonte}</span>
          </div>
        </div>
        <div class="rc-body">
          <div class="rc-nome">${r.nome}</div>
          <div class="rc-subtitulo">${r.subtitulo}</div>
          <div class="rc-tags">
            ${[r.tipo, ...r.tags.filter(t => t !== r.tipo && t !== 'Comum' && t !== 'Raro' && t !== 'Tormenta 20')].slice(0,3).map(t =>
              `<span class="${tagClass(t)}">${t}</span>`).join('')}
          </div>
          <div class="rc-campo">
            <div class="rc-campo-l">Atributos</div>
            <div class="rc-campo-v">${r.atributos}${r.penalidade ? ' · ' + r.penalidade : ''}</div>
          </div>
          <div class="rc-campo">
            <div class="rc-campo-l">Tamanho · Deslocamento</div>
            <div class="rc-campo-v">${r.tamanho} · ${r.deslocamento}</div>
          </div>
          <div class="rc-desc">${processarKeywords(r.descricao)}</div>
          <div class="rc-footer">
            <button class="btn-ver" onclick="abrirDetalhe(window.RACAS.find(x=>x.id==='${r.id}'))">
              <i class="ti ti-eye" aria-hidden="true"></i> Ver Raça
            </button>
          </div>
        </div>`;
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-ver')) return;
        abrirDetalhe(r);
      });
      grid.appendChild(card);
    });
  }

  // ── 4B. RENDERIZAR CARDS DE ORIGENS ─────────────────────────

  function renderOrigens(lista) {
    const grid = document.getElementById('origensGrid');
    if (!grid) return;
    const kw = typeof processarKeywords === 'function' ? processarKeywords : (t) => t;
    document.getElementById('origensCount').textContent = lista.length + (lista.length !== 1 ? ' origens' : ' origem');
    grid.innerHTML = '';

    // Popula lista na sidebar (igual ao de raças/classes)
    const navListaO = document.getElementById('navListaOrigens');
    if (navListaO) {
      navListaO.innerHTML = lista.map(o => `
        <div class="nav-sub-sub-item nav-origem-item" data-origem="${o.id}"
             onclick="irParaOrigem('${o.id}')">
          <i class="ti ${o.icone}" aria-hidden="true" style="font-size:11px"></i>
          <span>${o.nome}</span>
        </div>`).join('');
    }

    lista.forEach(o => {
      const card = document.createElement('div');
      card.className = 'origem-card';
      card.dataset.id = o.id;
      card.innerHTML = `
        <div class="oc-top">
          <span class="badge-fonte">${o.fonte}</span>
          <div class="oc-temas">
            ${o.temas.slice(0, 2).map(t => `<span class="oc-tema-tag">${t}</span>`).join('')}
          </div>
        </div>
        <div class="oc-icon-wrap">
          <i class="ti ${o.icone} oc-icon" aria-hidden="true"></i>
        </div>
        <div class="oc-body">
          <div class="oc-nome">${o.nome}</div>
          <div class="oc-hook">${kw(o.descricao)}</div>
          <div class="oc-campo">
            <div class="oc-campo-l">Itens</div>
            <div class="oc-campo-v">${o.itens.join(', ')}</div>
          </div>
          ${o.periciasOferecidas.length ? `<div class="oc-pericias">${kw(o.periciasOferecidas.join(', '))}</div>` : ''}
          <div class="oc-poder-unico">
            <i class="ti ti-award" aria-hidden="true"></i>
            <span>Poder único: ${o.poderUnico.nome}</span>
          </div>
          <div class="oc-footer">
            <button class="btn-ver" onclick="abrirDetalheOrigem(window.ORIGENS.find(x=>x.id==='${o.id}'))">
              <i class="ti ti-eye" aria-hidden="true"></i> Ver Origem
            </button>
          </div>
        </div>`;
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-ver') || e.target.closest('.kw')) return;
        abrirDetalheOrigem(o);
      });
      grid.appendChild(card);
    });
  }

  // ── 4B2. RENDERIZAR CARDS DE DEUSES ─────────────────────────

  const LABEL_ENERGIA = { positiva: 'Positiva', negativa: 'Negativa', dual: 'Qualquer' };

  function renderDeuses(lista) {
    const grid = document.getElementById('deusesGrid');
    if (!grid) return;
    const kw = typeof processarKeywords === 'function' ? processarKeywords : (t) => t;
    document.getElementById('deusesCount').textContent = lista.length + (lista.length !== 1 ? ' divindades' : ' divindade');
    grid.innerHTML = '';

    const navListaD = document.getElementById('navListaDeuses');
    if (navListaD) {
      navListaD.innerHTML = lista.map(d => `
        <div class="nav-sub-sub-item nav-deus-item" data-deus="${d.id}"
             onclick="irParaDeus('${d.id}')">
          <i class="ti ${d.icone}" aria-hidden="true" style="font-size:11px"></i>
          <span>${d.nome}</span>
        </div>`).join('');
    }

    lista.forEach(d => {
      const card = document.createElement('div');
      card.className = 'deus-card';
      card.dataset.id = d.id;
      card.innerHTML = `
        <div class="dc-top">
          <span class="rc-badge badge-fonte">${d.fonte}</span>
          <span class="e-divina e-${d.energia}">${LABEL_ENERGIA[d.energia]}</span>
        </div>
        <div class="dc-icon-wrap dc-icon-wrap-${d.energia}">
          <i class="ti ${d.icone} dc-icon" aria-hidden="true"></i>
        </div>
        <div class="dc-body">
          <div class="dc-nome">${d.nome}</div>
          <div class="dc-desc">${kw(d.descricao)}</div>
          <div class="dc-footer">
            <button class="btn-ver" onclick="abrirDetalheDeus(window.DEUSES.find(x=>x.id==='${d.id}'))">
              <i class="ti ti-eye" aria-hidden="true"></i> Ver Divindade
            </button>
          </div>
        </div>`;
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-ver')) return;
        abrirDetalheDeus(d);
      });
      grid.appendChild(card);
    });
  }

  // ── 4C. RENDERIZAR CARDS DE CLASSES ────────────────────────

  function cmplxDots(n) {
    return [1,2,3].map(i =>
      `<div class="cc-dot ${i<=n?'on':'off'}"></div>`
    ).join('');
  }

  function renderClasses(lista) {
    const grid = document.getElementById('classesGrid');
    if (!grid) return;
    document.getElementById('classesCount').textContent =
      lista.length + ' classe' + (lista.length !== 1 ? 's' : '');
    grid.innerHTML = '';

    // Popula lista na sidebar (igual ao de raças)
    const navLista = document.getElementById('navListaClasses');
    if (navLista) {
      navLista.innerHTML = lista.map(c => `
        <div class="nav-sub-sub-item nav-classe-item" data-classe="${c.id}"
             onclick="irParaClasse('${c.id}')">
          <i class="ti ${c.icone}" aria-hidden="true" style="color:${c.cor};font-size:11px"></i>
          <span>${c.nome}</span>
        </div>`).join('');
    }

    lista.forEach(c => {
      const papeisTags = (c.papeis||[]).map(p =>
        `<span class="cc-papel papel-${p.toLowerCase()}">${p}</span>`
      ).join('');

      const imgHtml = c.imagem
        ? `<img src="../${c.imagem}" alt="${c.nome}" class="cc-img-foto" loading="lazy">`
        : `<i class="ti ${c.icone} cc-img-icon" style="color:${c.cor}" aria-hidden="true"></i>`;

      const card = document.createElement('div');
      card.className = 'class-card';
      card.dataset.id = c.id;
      card.innerHTML = `
        <div class="cc-img" style="background:linear-gradient(160deg,${c.cor}18,#0a0707 70%)">
          ${imgHtml}
          <div class="cc-img-accent" style="background:${c.cor}"></div>
          <div class="cc-img-badges">
            <span class="rc-badge badge-fonte">${c.fonte}</span>
          </div>
          <div class="cc-papeis">${papeisTags}</div>
          <div class="cc-cmplx">${cmplxDots(c.complexidade||1)}</div>
        </div>
        <div class="cc-body">
          <div class="cc-nome">${c.nome}</div>
          <div class="cc-subtitulo">${c.subtitulo||''}</div>
          <div class="cc-campo">
            <div class="cc-campo-l">
              <i class="ti ti-heart" style="font-size:14px;color:#e02020" aria-hidden="true"></i>
              <strong class="pv-texto">Pontos de Vida</strong>
            </div>
            <div class="cc-campo-v">
              Começa com <strong class="pv-texto">${c.pvInicial}</strong> PV + Con
              e ganha <strong class="pv-texto">${c.pvPorNivel > 0 ? '+' : ''}${c.pvPorNivel} PV</strong> + Con por nível
            </div>
          </div>
          <div class="cc-campo">
            <div class="cc-campo-l">
              <i class="ti ti-sparkles" style="font-size:14px;color:#44aaee" aria-hidden="true"></i>
              <strong class="pm-texto">Pontos de Mana</strong>
            </div>
            <div class="cc-campo-v">
              <strong class="pm-texto">${c.pmBase} PM</strong> por nível
            </div>
          </div>
          <div class="cc-campo">
            <div class="cc-campo-l">Perícias</div>
            <div class="cc-campo-v">
              ${(c.periciasFixas||[]).join(', ')}${c.periciasEscolher ? ` · +${c.periciasEscolher} a escolher` : ''}
            </div>
          </div>
          <div class="cc-campo">
            <div class="cc-campo-l">Proficiências</div>
            <div class="cc-profs">
              ${(c.proficiencias||[]).map(p => `<span class="cc-prof-tag">${p}</span>`).join('')}
            </div>
          </div>
          <div class="cc-desc">${c.descricao||''}</div>
          <div class="cc-footer">
            <button class="btn-ver" onclick="abrirDetalheClasse(window.CLASSES.find(x=>x.id==='${c.id}'))">
              <i class="ti ti-eye" aria-hidden="true"></i> Ver Classe
            </button>
          </div>
        </div>`;
      card.addEventListener('click', e => {
        if (e.target.closest('.btn-ver')) return;
        abrirDetalheClasse(c);
      });
      grid.appendChild(card);
    });
  }

  // ── RITUAL COMPARTILHADO DE FECHAR PAINEL DE DETALHE ────────────────
  // Todo painel de detalhe (Raça, Classe, Origem, Deus, Criatura, Perigo,
  // Perigo Complexo, Ambiente, Equipamento, Magia) fecha do MESMO jeito:
  // tira 'aberto' do painel, tira 'encolhido' da(s) área(s) de cards da(s)
  // seção(ões) dona(s) (que encolheu(ram) pra abrir espaço pro painel), e —
  // pros que vêm de uma grade com card "selecionado" — tira essa classe de
  // todo card. Antes cada fecharDetalheX() reescrevia esse ritual na mão,
  // igual mostrarSecao() reescrevia (mal, só pra 2 dos 10 painéis) a lista
  // de quem fechar — mesma classe de bug, corrigida em 23/ago (ver
  // fecharTodosPaineisDetalhe() mais abaixo). Centralizando o ritual aqui,
  // uma correção futura nele (não no conteúdo específico de cada painel —
  // isso continua em cada abrirDetalheX) só precisa acontecer neste lugar,
  // em vez de arriscar corrigir 9 dos 10 e esquecer o décimo.
  function _fecharPainelDetalhe(painelEl, areasSelector, cardSelector) {
    painelEl?.classList.remove('aberto');
    if (areasSelector) {
      document.querySelectorAll(areasSelector).forEach(el => el.classList.remove('encolhido'));
    }
    if (cardSelector) {
      document.querySelectorAll(cardSelector).forEach(c => c.classList.remove('selecionado'));
    }
  }

  // Mesma ideia, pro outro ritual repetido pelo site inteiro: os grupos de
  // botão-filtro (categoria, tipo, ND, círculo...) em toda seção com listagem
  // (Armas, Armaduras, Criaturas, Magias, Poderes, Raças, Classes...) fazem
  // sempre a mesma coisa quando um botão é clicado — tira '.a' de todo botão
  // irmão no grupo, bota '.a' só no clicado. Cada setFiltroX() reescrevia
  // essas 2 linhas na mão (17 ocorrências no arquivo); centralizado aqui pelo
  // mesmo motivo do ritual de painel acima: uma correção futura no "como
  // marcar botão de filtro ativo" só precisa acontecer neste lugar. O que
  // continua específico de cada setFiltroX() é decidir QUAL grupo (o
  // seletor) e o que fazer com o valor escolhido (estado + re-render).
  function _ativarFiltroBtn(grupoSelector, btnEl) {
    document.querySelectorAll(`${grupoSelector} .filtro-btn`).forEach(b => b.classList.remove('a'));
    btnEl?.classList.add('a');
  }

  // Terceiro ritual repetido que achamos pelo site inteiro (24/ago): quase
  // toda seção com busca fazia a MESMA coisa pra ligar o campo de texto —
  // pegar o elemento por id, checar se existe, escutar 'input', tirar
  // espaço nas pontas do valor. Só o que cada seção faz DEPOIS (guardar
  // lowercase ou não, em qual variável de estado, qual função re-renderiza)
  // varia. `_ligarBusca(inputId, aoDigitar)` cobre só a parte comum —
  // `aoDigitar` recebe o valor já com `.trim()` feito, e decide o resto.
  function _ligarBusca(inputId, aoDigitar) {
    const el = document.getElementById(inputId);
    if (!el) return;
    el.addEventListener('input', () => aoDigitar(el.value.trim()));
  }

  // ── 4C. PAINEL DE DETALHES DE CLASSE ───────────────────────
  const classePainelEl = document.getElementById('classePainel');
  const classesAreaEl  = document.getElementById('classesArea');

  window.abrirDetalheClasse = (c) => {
    if (!c) return;

    window._classeAtualId = c.id;

    // Hero
    document.getElementById('cpHeroBg').style.background =
      `linear-gradient(135deg, ${c.cor}30, #080505 70%)`;
    const iconEl = document.getElementById('cpHeroIcon');
    iconEl.className = `ti ${c.icone} cp-hero-icon`;
    iconEl.style.color = c.cor;

    // Se tiver imagem substitui o ícone pela foto
    const imgWrap = document.getElementById('cpHeroImgWrap');
    if (c.imagem) {
      imgWrap.innerHTML = `<img src="../${c.imagem}" alt="${c.nome}" style="width:100%;height:100%;object-fit:cover;object-position:top center;position:absolute;inset:0;opacity:.3;">`;
    }

    document.getElementById('cpTipo').innerHTML =
      `<i class="ti ti-sword" aria-hidden="true"></i> Classe`;
    document.getElementById('cpNome').textContent = c.nome;
    document.getElementById('cpSub').textContent  = c.subtitulo || '';

    // Badges: papeis + complexidade
    const cmplxLabel = ['','Simples','Moderada','Complexa'][c.complexidade||1];
    document.getElementById('cpBadges').innerHTML =
      (c.papeis||[]).map(p =>
        `<span class="cc-papel papel-${p.toLowerCase()}">${p}</span>`
      ).join('') +
      `<span style="font-family:'Cinzel',serif;font-size:7px;padding:2px 6px;border-radius:2px;border:.5px solid #2a2a2a;color:#555">${cmplxLabel}</span>` +
      `<span style="font-family:'Cinzel',serif;font-size:7px;padding:2px 6px;border-radius:2px;border:.5px solid rgba(139,0,0,.3);color:#cc4444;background:rgba(139,0,0,.08)">T20 p.${c.pagina||'?'}</span>`;

    // Stats bar
    document.getElementById('cpStatsBar').innerHTML = `
      <div class="cp-stat">
        <div class="cp-stat-val">
          <i class="ti ti-heart pv-icon" aria-hidden="true"></i>
          <strong class="pv-texto">${c.pvInicial}</strong>
        </div>
        <div class="cp-stat-lbl">PV Iniciais</div>
      </div>
      <div class="cp-stat">
        <div class="cp-stat-val">
          <i class="ti ti-heart pv-icon" aria-hidden="true"></i>
          <strong class="pv-texto">+${c.pvPorNivel} PV</strong>
        </div>
        <div class="cp-stat-lbl">por nível</div>
      </div>
      <div class="cp-stat">
        <div class="cp-stat-val">
          <i class="ti ti-sparkles pm-icon" aria-hidden="true"></i>
          <strong class="pm-texto">${c.pmBase} PM</strong>
        </div>
        <div class="cp-stat-lbl">por nível</div>
      </div>
      <div class="cp-stat">
        <div class="cp-stat-val" style="font-size:11px">${c.atributoChave || '—'}</div>
        <div class="cp-stat-lbl">Atributo-chave</div>
      </div>`;

    // Body
    let html = '';

    // Quote
    if (c.quote) {
      html += `<div class="cp-quote">${c.quote}</div>`;
    }

    // Descrição
    if (c.descricao) {
      html += `<div class="cp-secao">Descrição</div>
        <p style="font-size:13px;color:#666;line-height:1.75;font-style:italic;margin-bottom:.9rem">${processarKeywords(c.descricao)}</p>`;
    }

    // Habilidades fixas
    const variacoesRenderizadas = new Set();

    if ((c.habilidadesFixas || []).length > 0) {
      html += `<div class="cp-secao"><i class="ti ti-list-check" aria-hidden="true"></i> Habilidades de Classe</div>`;
      c.habilidadesFixas.forEach(h => {
        html += `
          <div class="cp-hab-row">
            <div class="cp-lv-badge">${h.nivel}</div>
            <div style="flex:1">
              <div class="cp-hab-nome">${h.nome}</div>
              <div class="cp-hab-desc">${processarKeywords(h.descricao || '')}</div>
              ${typeof h.variacaoIndex !== 'undefined' && c.variacoes?.[h.variacaoIndex]
                ? renderVariacaoInline(c.variacoes[h.variacaoIndex], variacoesRenderizadas)
                : ''}
            </div>
          </div>`;
      });
    }

    // Variações (caminhos, linhagens...)
    (c.variacoes||[]).forEach(v => {
      if (variacoesRenderizadas && variacoesRenderizadas.has(v.titulo)) return;
      const opcoesHtml = (v.opcoes||[]).map(op => `
        <div class="cp-var-opt">
          <div class="cp-var-opt-nome">${op.nome}</div>
          <div class="cp-var-opt-desc">${processarKeywords(op.descricao)}</div>
        </div>`).join('');

      // Poderes do primeiro caminho como preview
      const poderesVariacao = (c.poderes||[]).filter(p => p.variacaoId === (v.opcoes[0]||{}).id);
      const branchHtml = poderesVariacao.length > 0 ? `
        <div class="cp-var-branch">
          <div class="cp-var-branch-title">
            <i class="ti ti-chevrons-right" aria-hidden="true"></i>
            Poderes de ${(v.opcoes[0]||{}).nome||''}
          </div>
          ${poderesVariacao.map(p => renderPoderHtml(p)).join('')}
        </div>` : '';

      html += `
        <div class="cp-secao"><i class="ti ${v.icone||'ti-arrows-split-2'}" aria-hidden="true"></i> ${v.titulo}</div>
        <div class="cp-variacao">
          <div class="cp-var-hd">
            <div class="cp-var-ic"><i class="ti ${v.icone||'ti-arrows-split-2'}" aria-hidden="true"></i></div>
            <div>
              <div class="cp-var-titulo">${v.titulo}</div>
              <div class="cp-var-sub">${v.subtitulo||''}</div>
            </div>
          </div>
          <div class="cp-var-opcoes">${opcoesHtml}</div>
          ${branchHtml}
        </div>`;
    });

    // ── Poderes — armazena globalmente para filtro/busca
    const poderesOficiais = (window.PODERES_CLASSES && window.PODERES_CLASSES[c.id]) || [];
    const poderesExtras   = (c.poderes || []).filter(p => !p.variacaoId);
    _cpTodosPoderes  = [...poderesOficiais, ...poderesExtras];
    _cpPoderFiltro   = 'todos';
    _cpPoderBusca    = '';

    if (_cpTodosPoderes.length > 0) {
      html += `
        <div class="cp-secao">
          <i class="ti ti-bolt" aria-hidden="true"></i>
          Poderes de ${c.nome}
          <span class="cp-selecionados-badge" id="cpSelecionadosBadge"></span>
        </div>
        <div class="cp-poderes-controles">
          <span class="cp-poder-count" id="cpPoderCount"></span>
          <div class="cp-filtros">
            <button class="cp-filtro-btn on"
              onclick="filtrarPoderesPainel('todos', this)">Todos</button>
            <button class="cp-filtro-btn"
              onclick="filtrarPoderesPainel('ativo', this)">Ativos</button>
            <button class="cp-filtro-btn"
              onclick="filtrarPoderesPainel('passivo', this)">Passivos</button>
          </div>
          <input type="text" class="cp-busca-poder" id="cpBuscaPoder"
            placeholder="Buscar poder…"
            oninput="buscarPoderesPainel(this.value)">
        </div>
        <div class="cp-nivel-filtro-wrap">
          <i class="ti ti-trending-up" aria-hidden="true" style="font-size:12px;color:#555"></i>
          <span class="cp-nivel-label">Nível do personagem</span>
          <input type="range" min="0" max="20" value="0" step="1"
            class="cp-nivel-slider" id="cpNivelSlider"
            oninput="filtrarPoderesPorNivel(this.value)">
          <span class="cp-nivel-valor" id="cpNivelLabel">Todos os níveis</span>
        </div>
        <div id="cpPoderesContainer"></div>`;
    }

    // Painéis de escolha
    (c.escolhas||[]).forEach(e => {
      const optsHtml = (e.opcoes||[]).map(op => `
        <div class="cp-esc-opt">
          <div class="cp-esc-opt-nome">${op.nome}</div>
          <div class="cp-esc-opt-desc">${processarKeywords(op.descricao || '')}</div>
        </div>`).join('');
      html += `
        <div class="cp-escolha">
          <div class="cp-esc-hd">
            <div class="cp-esc-ic"><i class="ti ${e.icone||'ti-list'}" aria-hidden="true"></i></div>
            <div>
              <div class="cp-esc-titulo">${e.titulo}</div>
              <div class="cp-esc-sub">${e.subtitulo||''}</div>
            </div>
          </div>
          <div class="cp-esc-opcoes">${optsHtml}</div>
        </div>`;
    });

    // Painéis de explicação
    (c.explicacoes||[]).forEach(exp => {
      const itensHtml = (exp.itens||[]).map(item =>
        `<div class="cp-exp-item"><span class="cp-exp-bul">→</span><span>${processarKeywords(item || '')}</span></div>`
      ).join('');
      html += `
        <div class="cp-explicacao">
          <div class="cp-exp-hd">
            <div class="cp-exp-ic"><i class="ti ${exp.icone||'ti-book'}" aria-hidden="true"></i></div>
            <div>
              <div class="cp-exp-titulo">${exp.titulo}</div>
              <div class="cp-exp-sub">${exp.subtitulo||''}</div>
            </div>
          </div>
          <div class="cp-exp-body">${itensHtml}</div>
        </div>`;
    });

    // Raças recomendadas
    if ((c.racasRecomendadas||[]).length > 0) {
      html += `<div class="cp-secao">Raças Recomendadas</div>
        <div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:.9rem">
          ${c.racasRecomendadas.map(r =>
            `<span class="dp-classe-tag">${r}</span>`
          ).join('')}
        </div>`;
    }

    // Tabela de progressão — sempre no final do painel
    if ((c.tabela||[]).length > 0) {
      html += `<div class="cp-secao"><i class="ti ti-table" aria-hidden="true"></i> Tabela de Progressão</div>
        <div class="cp-tabela-wrap">
          <table class="cp-tabela">
            <thead>
              <tr>
                <th>Nível</th>
                <th>Habilidades de Classe</th>
              </tr>
            </thead>
            <tbody>
              ${c.tabela.map(row => `
                <tr>
                  <td>${row.nivel}º</td>
                  <td style="font-size:11px;color:#888">${row.habilidades}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>`;
    }

    // Botões
    html += `
      <div class="dp-btns" style="margin-top:1rem">
        <button class="btn-pdf">
          <i class="ti ti-book" aria-hidden="true"></i>
          Ver no Livro — p.${c.pagina||'?'}
        </button>
        <button class="btn-ghost">
          <i class="ti ti-notes" aria-hidden="true"></i>
          Adicionar à Ficha
        </button>
      </div>`;

    document.getElementById('cpBody').innerHTML = html;
    if (_cpTodosPoderes.length > 0) renderPoderesNoPainel();
    _atualizarBadgeSelecionados(c.id);

    // Abre o painel
    classePainelEl.classList.add('aberto');
    classesAreaEl.classList.add('encolhido');

    // Marca card como selecionado
    document.querySelectorAll('.class-card').forEach(c => c.classList.remove('selecionado'));
    document.querySelector(`.class-card[data-id="${c.id}"]`)?.classList.add('selecionado');
  };

  function extrairNivelMin(prerequisito) {
    if (!prerequisito) return null;
    const m = prerequisito.match(/(\d+)[oº°]\s*n[ií]vel/i);
    return m ? parseInt(m[1]) : null;
  }

  function poderEhBonus(p) {
    if (!p.prerequisito || !_cpTodosPoderes.length) return false;
    const nomes = _cpTodosPoderes
      .filter(x => x.nome && x.id !== p.id)
      .map(x => x.nome.toLowerCase());
    return p.prerequisito.split(',').some(seg => {
      const limpo = seg.trim().toLowerCase().replace(/\s*\([^)]*\)\s*/g, '').trim();
      return nomes.includes(limpo);
    });
  }

  function renderPoderHtml(p) {
    const kw = typeof processarKeywords === 'function' ? processarKeywords : (t) => t;

    const tipoTag = p.tipo === 'ativo'
      ? `<span class="tag-ativo"><i class="ti ti-player-play" aria-hidden="true"></i> Ativo</span>`
      : `<span class="tag-passivo"><i class="ti ti-circle-check" aria-hidden="true"></i> Passivo</span>`;

    const pmTag = p.custoPM > 0
      ? `<span class="tag-custo-pm"><strong class="pm-texto">${p.custoPM} PM</strong></span>` : '';

    const nivelMin = extrairNivelMin(p.prerequisito);
    const nivelTag = nivelMin
      ? `<span class="cp-poder-nivel">Nív. ${nivelMin}+</span>` : '';

    const energiaIcons = {
      positiva: 'ti-sun',
      negativa: 'ti-moon',
      dual:     'ti-yin-yang',
    };
    const energiaLabels = {
      positiva: 'Energia Positiva',
      negativa: 'Energia Negativa',
      dual:     'Positiva / Negativa',
    };
    const energiaTag = p.energiaDivina
      ? `<span class="e-divina e-${p.energiaDivina}" onclick="event.stopPropagation(); window.irParaDeusesPorEnergia && window.irParaDeusesPorEnergia('${p.energiaDivina}')" style="cursor:pointer">
           <i class="ti ${energiaIcons[p.energiaDivina]}"
              aria-hidden="true" style="font-size:9px"></i>
           ${energiaLabels[p.energiaDivina]}
         </span>`
      : '';

    const duracaoInfo = typeof detectarDuracao === 'function'
      ? detectarDuracao(p.descricao) : null;
    const duracaoTag = duracaoInfo
      ? `<span class="badge-dur ${duracaoInfo.classe}">${duracaoInfo.label}</span>`
      : '';

    const bonusTag = poderEhBonus(p)
      ? `<span class="tag-bonus"><i class="ti ti-arrow-big-up-lines" aria-hidden="true"></i> Bônus</span>`
      : '';

    const fonteTag = `<span class="cp-tag-fonte">${p.fonte || 'Tormenta 20'}</span>`;

    const LABEL_CATEGORIA_PODER = { combate: 'Combate', destino: 'Destino', magia: 'Magia', concedidos: 'Concedidos', tormenta: 'Tormenta', origem: 'Origem' };
    const categoriaTag = p.categoria
      ? `<span class="cp-tag-categoria cp-tag-categoria-${p.categoria}">${LABEL_CATEGORIA_PODER[p.categoria] || p.categoria}</span>`
      : '';

    const prereqHtml = p.prerequisito
      ? `<div class="cp-prereq">
          <span class="cp-prereq-label">Pré-req:</span>
          ${p.prerequisito.split(',').map(r =>
            `<span class="cp-prereq-node">${r.trim()}</span>`
          ).join('<span class="cp-prereq-arrow">→</span>')}
         </div>` : '';

    const opcoesHtml = (p.opcoes && p.opcoes.length > 0)
      ? p.opcoesModo === 'variacao'
        ? renderOpcoesVariacaoNoPoder(p)
        : (() => {
            const temNiveis = p.opcoes.some(op => op.niveis && op.niveis.length > 0);
            const classeAtualOpc = window._classeAtualId || '';
            return `<div class="cp-escolha" style="margin-top:10px">
             <div class="cp-esc-hd">
               <div class="cp-esc-ic">
                 <i class="ti ti-list-check" aria-hidden="true"></i>
               </div>
               <div>
                 <div class="cp-esc-titulo">Escolha um ${p.nome}</div>
                 <div class="cp-esc-sub">${p.opcoes.length} opções disponíveis</div>
               </div>
             </div>
             <div class="cp-esc-opcoes"${temNiveis ? ' style="grid-template-columns:1fr"' : ''}>
               ${p.opcoes.map(op => {
                 const nivelDesbloqueio = { veterano: 'Nv. 7', mestre: 'Nv. 15' };
                 const niveisHtml = (op.niveis && op.niveis.length > 0)
                   ? op.niveis.map(n => {
                       const suf = nivelDesbloqueio[n.label.toLowerCase()];
                       return `
                     <div class="cp-var-nivel">
                       <span class="cp-var-nivel-badge cp-var-nivel-${n.label.toLowerCase()}">${n.label}${suf ? ' · ' + suf : ''}</span>
                       <span class="cp-var-nivel-desc">${processarKeywords(n.descricao || '')}</span>
                     </div>`;
                     }).join('')
                   : '';
                 const opcaoSelecionada = classeAtualOpc
                   ? _opcaoEstaSelecionada(classeAtualOpc, p.id, op.nome) : false;
                 return `
                 <div class="cp-esc-opt${opcaoSelecionada ? ' selecionado' : ''}"
                      onclick="selecionarOpcaoPoder('${classeAtualOpc}', '${p.id}', '${(op.nome||'').replace(/'/g, "\\'")}', this)">
                   <div class="cp-esc-opt-hd">
                     <div class="cp-esc-ic"><i class="ti ${op.icone || 'ti-star'}" aria-hidden="true"></i></div>
                     <div style="flex:1">
                       <div class="cp-esc-opt-nome">${op.nome}</div>
                       <div class="cp-esc-opt-desc">${processarKeywords(op.descricao || '')}</div>
                     </div>
                     <i class="ti ti-check cp-esc-opt-check" aria-hidden="true"></i>
                   </div>
                   ${niveisHtml}
                 </div>`;
               }).join('')}
             </div>
           </div>`;
          })()
      : '';

    const classeAtual = window._classeAtualId || '';
    const jaSelecionado = classeAtual
      ? _poderEstaSelecionado(classeAtual, p.id) : false;
    const btnLabel = jaSelecionado
      ? '<i class="ti ti-check" aria-hidden="true"></i> Selecionado'
      : '<i class="ti ti-plus"  aria-hidden="true"></i> Adicionar ao personagem';
    const addBtn = p.id ? `
      <button
        class="cp-poder-add-btn${jaSelecionado ? ' selecionado' : ''}"
        data-nome="${_escapeHtml ? _escapeHtml(p.nome || '') : (p.nome || '')}"
        onclick="togglePoderPersonagem('${classeAtual}', '${p.id}', this)"
        aria-label="${jaSelecionado ? 'Remover' : 'Adicionar'} ${p.nome} ao personagem">
        ${btnLabel}
      </button>` : '';

    return `
      <div class="cp-poder cp-poder-cat-${p.categoria || ''}"
           data-tipo="${p.tipo}"
           data-nome="${(p.nome || '').toLowerCase()}"
           data-desc="${(p.descricao || '').toLowerCase().substring(0, 120)}">
        <div class="cp-poder-head">
          <span class="cp-poder-nome">${p.nome}</span>
          ${tipoTag}${pmTag}${nivelTag}${bonusTag}${energiaTag}${duracaoTag}
        </div>
        <div class="cp-poder-desc">${kw(p.descricao || '')}</div>
        ${p.tabela ? renderTabelaUso(p.tabela) : ''}
        ${prereqHtml}
        ${opcoesHtml}
        <div class="cp-poder-footer">
          ${addBtn}
          <div class="cp-poder-footer-direita">
            ${categoriaTag}
            ${fonteTag}
          </div>
        </div>
      </div>`;
  }

  function renderOpcoesVariacaoNoPoder(p) {
    const optsHtml = (p.opcoes || []).map(op => {
      const conteudo = (op.niveis && op.niveis.length > 0)
        ? op.niveis.map(n => `
            <div class="cp-var-nivel">
              <span class="cp-var-nivel-badge cp-var-nivel-${n.label.toLowerCase()}">${n.label}</span>
              <span class="cp-var-nivel-desc">${processarKeywords(n.descricao || '')}</span>
            </div>`).join('')
        : `<div class="cp-var-nivel-desc" style="margin-top:2px">${processarKeywords(op.descricao || '')}</div>`;
      return `
        <div class="cp-var-opt-row">
          <div class="cp-var-opt-row-ic">
            <i class="ti ${op.icone || 'ti-star'}" aria-hidden="true"></i>
          </div>
          <div style="flex:1">
            <div class="cp-var-opt-row-nome">${op.nome}</div>
            ${conteudo}
          </div>
        </div>`;
    }).join('');

    return `
      <div class="cp-var-inline" style="margin-top:10px">
        <div class="cp-var-inline-hd">
          <div class="cp-var-inline-ic">
            <i class="ti ${p.opcoesTitulo?.icone || 'ti-list'}" aria-hidden="true"></i>
          </div>
          <div>
            <div class="cp-var-inline-titulo">
              ${p.opcoesTitulo?.titulo || 'Opções Disponíveis'}
            </div>
            ${p.opcoesTitulo?.subtitulo
              ? `<div class="cp-var-sub" style="font-size:10px;color:#4a3878;margin-top:1px">
                   ${p.opcoesTitulo.subtitulo}
                 </div>` : ''}
          </div>
        </div>
        ${optsHtml}
      </div>`;
  }

  function renderVariacaoInline(v, renderedSet) {
    if (!v) return '';
    if (renderedSet) renderedSet.add(v.titulo);
    const optsHtml = (v.opcoes || []).map(op => `
      <div class="cp-var-opt-row">
        <div class="cp-var-opt-row-ic">
          <i class="ti ${op.icone || 'ti-star'}" aria-hidden="true"></i>
        </div>
        <div>
          <div class="cp-var-opt-row-nome">${op.nome}</div>
          ${op.chave ? `<span class="cp-var-opt-row-chave">Atrib.-chave: ${op.chave}</span>` : ''}
          <div class="cp-var-opt-row-desc">${processarKeywords(op.descricao || '')}</div>
        </div>
      </div>`).join('');
    return `
      <div class="cp-var-inline">
        <div class="cp-var-inline-hd">
          <div class="cp-var-inline-ic">
            <i class="ti ${v.icone || 'ti-arrows-split-2'}" aria-hidden="true"></i>
          </div>
          <div>
            <div class="cp-var-inline-titulo">Escolha seu ${v.titulo} — ${v.subtitulo || 'nível ' + (v.nivel || 1)}</div>
          </div>
        </div>
        ${optsHtml}
      </div>`;
  }

  function renderExplicacaoInline(p) {
    if (!p || !p.itens) return '';
    const itensHtml = p.itens.map(item => `
      <div class="cp-exp-item">
        <span class="cp-exp-bul">→</span>
        <span>${processarKeywords(item)}</span>
      </div>`).join('');
    return `
      <div class="cp-explicacao" style="margin-bottom:10px">
        <div class="cp-exp-hd">
          <div class="cp-exp-ic">
            <i class="ti ${p.icone || 'ti-book'}" aria-hidden="true"></i>
          </div>
          <div>
            <div class="cp-exp-titulo">${p.nome}</div>
            <div class="cp-exp-sub">${p.subtitulo || ''}</div>
          </div>
        </div>
        <div class="cp-exp-body">${itensHtml}</div>
      </div>`;
  }

  function renderVariacaoEmSecao(p) {
    if (!p || !p.opcoes) return '';
    const optsHtml = (p.opcoes || []).map(op => `
      <div class="cp-var-opt-row">
        <div class="cp-var-opt-row-ic">
          <i class="ti ${op.icone || 'ti-star'}" aria-hidden="true"></i>
        </div>
        <div>
          <div class="cp-var-opt-row-nome">${op.nome}</div>
          <div class="cp-var-opt-row-desc">${processarKeywords(op.descricao || '')}</div>
        </div>
      </div>`).join('');
    return `
      <div class="cp-var-inline" style="margin-bottom:10px">
        <div class="cp-var-inline-hd">
          <div class="cp-var-inline-ic">
            <i class="ti ${p.icone || 'ti-list'}" aria-hidden="true"></i>
          </div>
          <div>
            <div class="cp-var-inline-titulo">${p.titulo || p.nome}</div>
            ${p.subtitulo ? `<div class="cp-var-sub" style="font-size:10px;color:#4a3878;margin-top:1px">${p.subtitulo}</div>` : ''}
          </div>
        </div>
        ${optsHtml}
      </div>`;
  }

  function renderPoderesNoPainel() {
    const container = document.getElementById('cpPoderesContainer');
    if (!container) return;

    const busca = _cpPoderBusca.toLowerCase();

    const filtrados = _cpTodosPoderes.filter(p => {
      const okTipo  = _cpPoderFiltro === 'todos' || p.tipo === _cpPoderFiltro;
      const okBusca = !_cpPoderBusca
        || (p.nome || '').toLowerCase().includes(_cpPoderBusca)
        || (p.descricao || '').toLowerCase().includes(_cpPoderBusca);
      const nivelMin = extrairNivelMin(p.prerequisito);
      const okNivel  = _cpNivelFiltro === 0
        || !nivelMin
        || nivelMin <= _cpNivelFiltro;
      return okTipo && okBusca && okNivel;
    });

    const countEl = document.getElementById('cpPoderCount');
    if (countEl) {
      countEl.textContent = `${filtrados.length} poder${filtrados.length !== 1 ? 'es' : ''}`;
    }

    if (filtrados.length === 0) {
      container.innerHTML = `<div class="cp-poderes-vazio">Nenhum poder encontrado.</div>`;
      return;
    }

    const catLabels = {
      musica:     { titulo: 'Músicas de Bardo',       icone: 'ti-music' },
      bravata:    { titulo: 'Bravatas',               icone: 'ti-speakerphone' },
      postura:    { titulo: 'Posturas de Combate',    icone: 'ti-shield' },
      armadilha:  { titulo: 'Armadilhas',             icone: 'ti-tools' },
      missa:      { titulo: 'Missas',                 icone: 'ti-candle' },
      julgamento: { titulo: 'Julgamentos Divinos',    icone: 'ti-gavel' },
      virtude:    { titulo: 'Virtudes Paladinescas',  icone: 'ti-star' },
      linhagem:   { titulo: 'Linhagens Sobrenaturais',icone: 'ti-dna' },
      brado:      { titulo: 'Brados',                 icone: 'ti-speakerphone' },
      companheiro: { titulo: 'Companheiro Animal', icone: 'ti-paw' },
      forma:       { titulo: 'Forma Selvagem',      icone: 'ti-paw' },
      'golpe-pessoal': { titulo: 'Golpe Pessoal', icone: 'ti-tool' },
      engenhoca: { titulo: 'Engenhocas', icone: 'ti-tool' },
      alquimia: { titulo: 'Alquimia & Livro de Fórmulas', icone: 'ti-flask' },
      automato:  { titulo: 'Autômato',                    icone: 'ti-robot' },
      aura: { titulo: 'Auras Sagradas', icone: 'ti-sun' },
    };

    const grupos = {};
    const gerais = [];
    for (const p of filtrados) {
      const cat = p.categoriaEspecial;
      if (cat && catLabels[cat]) {
        if (!grupos[cat]) grupos[cat] = [];
        grupos[cat].push(p);
      } else {
        gerais.push(p);
      }
    }

    let html = '';

    for (const p of gerais) html += renderPoderHtml(p);

    for (const [cat, itens] of Object.entries(grupos)) {
      const { titulo, icone } = catLabels[cat] || { titulo: cat, icone: 'ti-bookmark' };
      const catId = `cat-${cat}`;
      html += `
        <div class="cp-secao-sub" id="${catId}-hd"
             onclick="toggleCategoriaPoderes('${catId}')">
          <i class="ti ${icone}" aria-hidden="true"></i>
          ${titulo}
          <i class="ti ti-chevron-down cp-collapse-icon" id="${catId}-icon" aria-hidden="true"></i>
        </div>
        <div class="cp-categoria-body" id="${catId}-body">
          ${itens.map(p =>
            p.tipo === 'explicacao'
              ? renderExplicacaoInline(p)
              : p.tipo === 'variacao'
                ? renderVariacaoEmSecao(p)
                : renderPoderHtml(p)
          ).join('')}
        </div>`;
    }

    container.innerHTML = html;
  }

  // ══════════════════ EQUIPAMENTOS ══════════════════

  const CATEGORIA_ARMA_INFO = {
    simples: { label: 'Simples' }, marcial: { label: 'Marcial' },
    exotica: { label: 'Exótica' }, fogo: { label: 'Arma de Fogo' },
  };
  const HABILIDADE_ARMA_LABEL = {
    'ágil': 'Ágil', alongada: 'Alongada', adaptável: 'Adaptável',
    desbalanceada: 'Desbalanceada', dupla: 'Dupla', versátil: 'Versátil',
  };
  const CATEGORIA_ARMADURA_INFO = {
    leve: { label: 'Leve' }, pesada: { label: 'Pesada' }, escudo: { label: 'Escudo' },
  };
  const CATEGORIA_ITEM_GERAL_INFO = {
    aventura: 'Equipamento de Aventura', ferramentas: 'Ferramentas', vestuario: 'Vestuário',
    esotericos: 'Esotéricos', 'alquimicos-preparados': 'Alquímico — Preparado',
    'alquimicos-catalisadores': 'Alquímico — Catalisador', 'alquimicos-venenos': 'Alquímico — Veneno',
    alimentacao: 'Alimentação', animais: 'Animais', veiculos: 'Veículos', servicos: 'Serviços',
  };

  function precoParaNumero(preco) {
    if (!preco) return 0;
    const match = String(preco).replace(/\./g, '').match(/[\d,]+/);
    if (!match) return 0;
    return parseFloat(match[0].replace(',', '.'));
  }

  // ── Ordenação genérica das tabelas de equipamento (clique no cabeçalho) ──
  // Reaproveitada por Armas, Armaduras, Armas Mágicas, Armaduras Mágicas e
  // Acessórios — cada tabela só declara suas colunas (label + como extrair
  // o valor de ordenação de cada linha) e usa esses 3 helpers.
  function _compararOrdenacao(va, vb) {
    if (typeof va === 'string') va = va.toLowerCase();
    if (typeof vb === 'string') vb = vb.toLowerCase();
    if (va == null) va = '';
    if (vb == null) vb = '';
    if (va < vb) return -1;
    if (va > vb) return 1;
    return 0;
  }

  function _ordenarLinhas(lista, colunas, estado) {
    if (!estado.ordenarCampo) return lista;
    const col = colunas.find(c => c.campo === estado.ordenarCampo);
    if (!col) return lista;
    const arr = lista.slice();
    arr.sort((a, b) => _compararOrdenacao(col.valor(a), col.valor(b)) * (estado.ordenarAsc ? 1 : -1));
    return arr;
  }

  function _theadOrdenavel(colunas, estado, funcNome) {
    return '<tr>' + colunas.map(c => {
      if (!c.campo) return `<th>${c.label}</th>`;
      const ativo = estado.ordenarCampo === c.campo;
      const icone = ativo
        ? `<i class="ti ${estado.ordenarAsc ? 'ti-arrow-up' : 'ti-arrow-down'}" aria-hidden="true"></i>`
        : '';
      return `<th class="${ativo ? 'eq-th-ativo' : ''}" onclick="event.stopPropagation(); ${funcNome}('${c.campo}')" title="Ordenar por ${c.label}">${c.label}${icone}</th>`;
    }).join('') + '</tr>';
  }

  function _ordenarTabelaEquip(estado, campo, renderFn) {
    if (estado.ordenarCampo === campo) estado.ordenarAsc = !estado.ordenarAsc;
    else { estado.ordenarCampo = campo; estado.ordenarAsc = true; }
    renderFn();
  }

  // ── ARMAS ──────────────────────────────────────────
  const _armaEstado = { categoria: 'todos', tipoAtaque: 'todos', busca: '', modo: 'cards', ordenarCampo: null, ordenarAsc: true };

  function renderArmaCard(a) {
    const card = document.createElement('div');
    card.className = 'eq-card';
    card.dataset.id = a.id;
    const habsHtml = a.habilidades.length
      ? `<div class="eq-habilidades-mini">${a.habilidades.map(h => `<span class="eq-hab-tag">${HABILIDADE_ARMA_LABEL[h] || h}</span>`).join('')}</div>` : '';
    card.innerHTML = `
      <div class="eq-card-top">
        <span class="eq-categoria-tag">${CATEGORIA_ARMA_INFO[a.categoria].label}</span>
        <span class="eq-preco-tag">${a.preco || 'Grátis'}</span>
      </div>
      <div class="eq-nome">${a.nome}</div>
      <div class="eq-footer">
        <span class="eq-stat-mini"><i class="ti ti-swords" aria-hidden="true"></i>${a.dano || '—'}</span>
        <span class="eq-stat-mini"><i class="ti ti-target" aria-hidden="true"></i>${a.critico || '—'}</span>
        ${a.alcance ? `<span class="eq-stat-mini"><i class="ti ti-arrows-horizontal" aria-hidden="true"></i>${a.alcance}</span>` : ''}
        <span class="rc-badge badge-fonte">Tormenta 20</span>
      </div>
      ${habsHtml}`;
    card.addEventListener('click', () => abrirDetalheEquip('arma', a.id));
    return card;
  }

  function renderArmasNaSecao() {
    const grid = document.getElementById('armasGrid');
    if (!grid) return;
    let lista = window.ARMAS || [];
    if (_armaEstado.categoria !== 'todos') lista = lista.filter(a => a.categoria === _armaEstado.categoria);
    if (_armaEstado.tipoAtaque !== 'todos') lista = lista.filter(a => a.tipoAtaque === _armaEstado.tipoAtaque);
    if (_armaEstado.busca) {
      const t = _armaEstado.busca;
      lista = lista.filter(a => a.nome.toLowerCase().includes(t) || a.descricao.toLowerCase().includes(t));
    }
    const countEl = document.getElementById('armasCount');
    if (countEl) countEl.textContent = lista.length + (lista.length !== 1 ? ' armas' : ' arma');

    if (_armaEstado.modo === 'tabela') {
      document.getElementById('armasGrid').style.display = 'none';
      document.getElementById('armasTabelaWrap').style.display = '';
      document.getElementById('armasTabelaWrap').innerHTML = renderArmasTabela(lista);
      return;
    }
    document.getElementById('armasGrid').style.display = '';
    document.getElementById('armasTabelaWrap').style.display = 'none';
    grid.innerHTML = '';
    if (!lista.length) {
      grid.innerHTML = `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nenhuma arma encontrada.</div>`;
      return;
    }
    lista.forEach(a => grid.appendChild(renderArmaCard(a)));
  }

  const ARMAS_COLUNAS = [
    { label: 'Nome', campo: 'nome', valor: a => a.nome },
    { label: 'Categoria', campo: 'categoria', valor: a => CATEGORIA_ARMA_INFO[a.categoria].label },
    { label: 'Dano', campo: 'dano', valor: a => a.dano || '' },
    { label: 'Crítico', campo: 'critico', valor: a => a.critico || '' },
    { label: 'Alcance', campo: 'alcance', valor: a => a.alcance || '' },
    { label: 'Tipo', campo: 'tipoDano', valor: a => a.tipoDano || '' },
    { label: 'Espaços', campo: 'espacos', valor: a => a.espacos },
    { label: 'Preço', campo: 'preco', valor: a => precoParaNumero(a.preco) },
  ];

  function renderArmasTabela(lista) {
    const ordenada = _ordenarLinhas(lista, ARMAS_COLUNAS, _armaEstado);
    const linhas = ordenada.map(a => `
      <tr onclick="abrirDetalheEquip('arma','${a.id}')">
        <td>${a.nome}</td>
        <td>${CATEGORIA_ARMA_INFO[a.categoria].label}</td>
        <td>${a.dano || '—'}</td>
        <td>${a.critico || '—'}</td>
        <td>${a.alcance || '—'}</td>
        <td>${a.tipoDano || '—'}</td>
        <td>${a.espacos}</td>
        <td>${a.preco || 'Grátis'}</td>
      </tr>`).join('');
    return `
      <div class="eq-tabela-scroll">
        <table class="eq-tabela">
          <thead>${_theadOrdenavel(ARMAS_COLUNAS, _armaEstado, 'ordenarTabelaArmas')}</thead>
          <tbody>${linhas}</tbody>
        </table>
      </div>`;
  }

  window.ordenarTabelaArmas = campo => _ordenarTabelaEquip(_armaEstado, campo, renderArmasNaSecao);

  window.setFiltroArma = (eixo, btn, valor) => {
    const grupoId = eixo === 'categoria' ? 'armasFiltroCategoria' : 'armasFiltroTipo';
    _ativarFiltroBtn(`#${grupoId}`, btn);
    _armaEstado[eixo] = valor;
    renderArmasNaSecao();
  };

  window.setModoVisualArmas = (modo) => {
    _armaEstado.modo = modo;
    document.getElementById('armasModoCards').classList.toggle('a', modo === 'cards');
    document.getElementById('armasModoTabela').classList.toggle('a', modo === 'tabela');
    renderArmasNaSecao();
  };

  // ── ARMADURAS ──────────────────────────────────────────
  const _armaduraEstado = { categoria: 'todos', busca: '', modo: 'cards', ordenarCampo: null, ordenarAsc: true };

  function renderArmaduraCard(a) {
    const card = document.createElement('div');
    card.className = 'eq-card';
    card.dataset.id = a.id;
    card.innerHTML = `
      <div class="eq-card-top">
        <span class="eq-categoria-tag">${CATEGORIA_ARMADURA_INFO[a.categoria].label}</span>
        <span class="eq-preco-tag">${a.preco}</span>
      </div>
      <div class="eq-nome">${a.nome}</div>
      <div class="eq-footer">
        <span class="eq-stat-mini"><i class="ti ti-shield-check" aria-hidden="true"></i>+${a.bonusDefesa} Defesa</span>
        <span class="eq-stat-mini"><i class="ti ti-alert-triangle" aria-hidden="true"></i>${a.penalidadeArmadura}</span>
        <span class="eq-stat-mini"><i class="ti ti-briefcase" aria-hidden="true"></i>${a.espacos} esp.</span>
        <span class="rc-badge badge-fonte">Tormenta 20</span>
      </div>`;
    card.addEventListener('click', () => abrirDetalheEquip('armadura', a.id));
    return card;
  }

  function renderArmadurasNaSecao() {
    const grid = document.getElementById('armadurasGrid');
    if (!grid) return;
    let lista = window.ARMADURAS || [];
    if (_armaduraEstado.categoria !== 'todos') lista = lista.filter(a => a.categoria === _armaduraEstado.categoria);
    if (_armaduraEstado.busca) {
      const t = _armaduraEstado.busca;
      lista = lista.filter(a => a.nome.toLowerCase().includes(t) || a.descricao.toLowerCase().includes(t));
    }
    const countEl = document.getElementById('armadurasCount');
    if (countEl) countEl.textContent = lista.length + (lista.length !== 1 ? ' itens' : ' item');

    if (_armaduraEstado.modo === 'tabela') {
      document.getElementById('armadurasGrid').style.display = 'none';
      document.getElementById('armadurasTabelaWrap').style.display = '';
      document.getElementById('armadurasTabelaWrap').innerHTML = renderArmadurasTabela(lista);
      return;
    }
    document.getElementById('armadurasGrid').style.display = '';
    document.getElementById('armadurasTabelaWrap').style.display = 'none';
    grid.innerHTML = '';
    if (!lista.length) {
      grid.innerHTML = `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nenhuma armadura ou escudo encontrado.</div>`;
      return;
    }
    lista.forEach(a => grid.appendChild(renderArmaduraCard(a)));
  }

  const ARMADURAS_COLUNAS = [
    { label: 'Nome', campo: 'nome', valor: a => a.nome },
    { label: 'Categoria', campo: 'categoria', valor: a => CATEGORIA_ARMADURA_INFO[a.categoria].label },
    { label: 'Defesa', campo: 'bonusDefesa', valor: a => a.bonusDefesa },
    { label: 'Penalidade', campo: 'penalidadeArmadura', valor: a => a.penalidadeArmadura },
    { label: 'Espaços', campo: 'espacos', valor: a => a.espacos },
    { label: 'Preço', campo: 'preco', valor: a => precoParaNumero(a.preco) },
  ];

  function renderArmadurasTabela(lista) {
    const ordenada = _ordenarLinhas(lista, ARMADURAS_COLUNAS, _armaduraEstado);
    const linhas = ordenada.map(a => `
      <tr onclick="abrirDetalheEquip('armadura','${a.id}')">
        <td>${a.nome}</td>
        <td>${CATEGORIA_ARMADURA_INFO[a.categoria].label}</td>
        <td>+${a.bonusDefesa}</td>
        <td>${a.penalidadeArmadura}</td>
        <td>${a.espacos}</td>
        <td>${a.preco}</td>
      </tr>`).join('');
    return `
      <div class="eq-tabela-scroll">
        <table class="eq-tabela">
          <thead>${_theadOrdenavel(ARMADURAS_COLUNAS, _armaduraEstado, 'ordenarTabelaArmaduras')}</thead>
          <tbody>${linhas}</tbody>
        </table>
      </div>`;
  }

  window.ordenarTabelaArmaduras = campo => _ordenarTabelaEquip(_armaduraEstado, campo, renderArmadurasNaSecao);

  window.setFiltroArmadura = (btn, valor) => {
    _ativarFiltroBtn('#armadurasFiltroCategoria', btn);
    _armaduraEstado.categoria = valor;
    renderArmadurasNaSecao();
  };

  window.setModoVisualArmaduras = (modo) => {
    _armaduraEstado.modo = modo;
    document.getElementById('armadurasModoCards').classList.toggle('a', modo === 'cards');
    document.getElementById('armadurasModoTabela').classList.toggle('a', modo === 'tabela');
    renderArmadurasNaSecao();
  };

  // ── ITENS GERAIS ──────────────────────────────────────────
  const _itemGeralEstado = { categoria: 'todos', preco: 'todos', busca: '' };

  function renderItemGeralCard(it) {
    const card = document.createElement('div');
    card.className = 'eq-card';
    card.dataset.id = it.id;
    card.innerHTML = `
      <div class="eq-card-top">
        <span class="eq-categoria-tag">${CATEGORIA_ITEM_GERAL_INFO[it.categoria] || it.categoria}</span>
        <span class="eq-preco-tag">${it.preco}</span>
      </div>
      <div class="eq-nome">${it.nome}</div>
      <div class="eq-desc">${truncarTexto(it.descricao, 90)}</div>
      <div class="eq-footer">
        ${it.espacos != null ? `<span class="eq-stat-mini"><i class="ti ti-briefcase" aria-hidden="true"></i>${it.espacos} esp.</span>` : ''}
        <span class="rc-badge badge-fonte">Tormenta 20</span>
      </div>`;
    card.addEventListener('click', () => abrirDetalheEquip('item-geral', it.id));
    return card;
  }

  function renderItensGeraisNaSecao() {
    const grid = document.getElementById('itensGeraisGrid');
    if (!grid) return;
    let lista = window.ITENS_GERAIS || [];
    if (_itemGeralEstado.categoria !== 'todos') lista = lista.filter(i => i.categoria === _itemGeralEstado.categoria);
    if (_itemGeralEstado.preco !== 'todos') {
      lista = lista.filter(i => {
        const p = precoParaNumero(i.preco);
        if (_itemGeralEstado.preco === 'ate-1') return p <= 1;
        if (_itemGeralEstado.preco === 'ate-10') return p <= 10;
        if (_itemGeralEstado.preco === 'ate-100') return p <= 100;
        if (_itemGeralEstado.preco === 'acima-100') return p > 100;
        return true;
      });
    }
    if (_itemGeralEstado.busca) {
      const t = _itemGeralEstado.busca;
      lista = lista.filter(i => i.nome.toLowerCase().includes(t) || i.descricao.toLowerCase().includes(t));
    }
    const countEl = document.getElementById('itensGeraisCount');
    if (countEl) countEl.textContent = lista.length + (lista.length !== 1 ? ' itens' : ' item');
    grid.innerHTML = '';
    if (!lista.length) {
      grid.innerHTML = `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nenhum item encontrado.</div>`;
      return;
    }
    lista.forEach(i => grid.appendChild(renderItemGeralCard(i)));
  }

  window.setFiltroItemGeral = (eixo, btn, valor) => {
    const grupoId = eixo === 'categoria' ? 'itensGeraisFiltroCategoria' : 'itensGeraisFiltroPreco';
    _ativarFiltroBtn(`#${grupoId}`, btn);
    _itemGeralEstado[eixo] = valor;
    renderItensGeraisNaSecao();
  };

  // ── ARMAS MÁGICAS (armas específicas) ──────────────────────
  const _armasMagicasEstado = { busca: '', modo: 'cards', ordenarCampo: null, ordenarAsc: true };
  function _armaBaseDe(a) { return (window.ARMAS || []).find(x => x.id === a.baseId); }

  function renderArmaEspecificaCard(a) {
    const base = (window.ARMAS || []).find(x => x.id === a.baseId);
    const card = document.createElement('div');
    card.className = 'eq-card';
    card.dataset.id = a.id;
    card.innerHTML = `
      <div class="eq-card-top">
        <span class="eq-categoria-tag">Base: ${base ? base.nome : '—'}</span>
        <span class="eq-preco-tag">${a.preco}</span>
      </div>
      <div class="eq-nome">${a.nome}</div>
      <div class="eq-desc">${truncarTexto(a.descricao, 100)}</div>
      <div class="eq-footer"><span class="rc-badge badge-fonte">Tormenta 20</span></div>`;
    card.addEventListener('click', () => abrirDetalheEquip('arma-especifica', a.id));
    return card;
  }

  const ARMAS_ESPECIFICAS_COLUNAS = [
    { label: 'Nome', campo: 'nome', valor: a => a.nome },
    { label: 'Base', campo: 'base', valor: a => (_armaBaseDe(a) || {}).nome || '' },
    { label: 'Dano', campo: 'dano', valor: a => (_armaBaseDe(a) || {}).dano || '' },
    { label: 'Crítico', campo: 'critico', valor: a => (_armaBaseDe(a) || {}).critico || '' },
    { label: 'Alcance', campo: 'alcance', valor: a => (_armaBaseDe(a) || {}).alcance || '' },
    { label: 'Tipo', campo: 'tipoDano', valor: a => (_armaBaseDe(a) || {}).tipoDano || '' },
    { label: 'Espaços', campo: 'espacos', valor: a => (_armaBaseDe(a) || {}).espacos ?? '' },
    { label: 'Preço', campo: 'preco', valor: a => precoParaNumero(a.preco) },
  ];

  function renderArmasEspecificasTabela(lista) {
    const ordenada = _ordenarLinhas(lista, ARMAS_ESPECIFICAS_COLUNAS, _armasMagicasEstado);
    const linhas = ordenada.map(a => {
      const base = _armaBaseDe(a);
      return `
      <tr onclick="abrirDetalheEquip('arma-especifica','${a.id}')">
        <td>${a.nome}</td>
        <td>${base ? base.nome : '—'}</td>
        <td>${base ? (base.dano || '—') : '—'}</td>
        <td>${base ? (base.critico || '—') : '—'}</td>
        <td>${base ? (base.alcance || '—') : '—'}</td>
        <td>${base ? (base.tipoDano || '—') : '—'}</td>
        <td>${base ? base.espacos : '—'}</td>
        <td>${a.preco}</td>
      </tr>`;
    }).join('');
    return `
      <div class="eq-tabela-scroll">
        <table class="eq-tabela">
          <thead>${_theadOrdenavel(ARMAS_ESPECIFICAS_COLUNAS, _armasMagicasEstado, 'ordenarTabelaArmasMagicas')}</thead>
          <tbody>${linhas}</tbody>
        </table>
      </div>`;
  }

  window.ordenarTabelaArmasMagicas = campo => _ordenarTabelaEquip(_armasMagicasEstado, campo, renderArmasMagicasNaSecao);

  function renderArmasMagicasNaSecao() {
    const grid = document.getElementById('armasMagicasGrid');
    if (!grid) return;
    let lista = window.ARMAS_ESPECIFICAS || [];
    if (_armasMagicasEstado.busca) {
      const t = _armasMagicasEstado.busca;
      lista = lista.filter(x => x.nome.toLowerCase().includes(t) || x.descricao.toLowerCase().includes(t));
    }
    const countEl = document.getElementById('armasMagicasCount');
    if (countEl) countEl.textContent = lista.length + ' armas específicas';

    if (_armasMagicasEstado.modo === 'tabela') {
      document.getElementById('armasMagicasGrid').style.display = 'none';
      document.getElementById('armasMagicasTabelaWrap').style.display = '';
      document.getElementById('armasMagicasTabelaWrap').innerHTML = renderArmasEspecificasTabela(lista);
      return;
    }
    document.getElementById('armasMagicasGrid').style.display = '';
    document.getElementById('armasMagicasTabelaWrap').style.display = 'none';
    grid.innerHTML = '';
    if (!lista.length) {
      grid.innerHTML = `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nada encontrado.</div>`;
      return;
    }
    lista.forEach(x => grid.appendChild(renderArmaEspecificaCard(x)));
  }

  window.setModoVisualArmasMagicas = (modo) => {
    _armasMagicasEstado.modo = modo;
    document.getElementById('armasMagicasModoCards').classList.toggle('a', modo === 'cards');
    document.getElementById('armasMagicasModoTabela').classList.toggle('a', modo === 'tabela');
    renderArmasMagicasNaSecao();
  };

  // ── ARMADURAS MÁGICAS (só itens específicos — encantos foram pra Modificadores) ──
  const _armadurasMagicasEstado = { busca: '', modo: 'cards', ordenarCampo: null, ordenarAsc: true };
  function _armaduraBaseDe(a) { return (window.ARMADURAS || []).find(x => x.id === a.baseId); }

  function renderArmaduraEspecificaCard(a) {
    const base = (window.ARMADURAS || []).find(x => x.id === a.baseId);
    const card = document.createElement('div');
    card.className = 'eq-card';
    card.dataset.id = a.id;
    card.innerHTML = `
      <div class="eq-card-top">
        <span class="eq-categoria-tag">Base: ${base ? base.nome : '—'}</span>
        <span class="eq-preco-tag">${a.preco}</span>
      </div>
      <div class="eq-nome">${a.nome}</div>
      <div class="eq-desc">${truncarTexto(a.descricao, 100)}</div>
      <div class="eq-footer"><span class="rc-badge badge-fonte">Tormenta 20</span></div>`;
    card.addEventListener('click', () => abrirDetalheEquip('armadura-especifica', a.id));
    return card;
  }

  const ARMADURAS_ESPECIFICAS_COLUNAS = [
    { label: 'Nome', campo: 'nome', valor: a => a.nome },
    { label: 'Base', campo: 'base', valor: a => (_armaduraBaseDe(a) || {}).nome || '' },
    { label: 'Defesa', campo: 'bonusDefesa', valor: a => (_armaduraBaseDe(a) || {}).bonusDefesa ?? '' },
    { label: 'Penalidade', campo: 'penalidadeArmadura', valor: a => (_armaduraBaseDe(a) || {}).penalidadeArmadura ?? '' },
    { label: 'Espaços', campo: 'espacos', valor: a => (_armaduraBaseDe(a) || {}).espacos ?? '' },
    { label: 'Preço', campo: 'preco', valor: a => precoParaNumero(a.preco) },
  ];

  function renderArmadurasEspecificasTabela(lista) {
    const ordenada = _ordenarLinhas(lista, ARMADURAS_ESPECIFICAS_COLUNAS, _armadurasMagicasEstado);
    const linhas = ordenada.map(a => {
      const base = _armaduraBaseDe(a);
      return `
      <tr onclick="abrirDetalheEquip('armadura-especifica','${a.id}')">
        <td>${a.nome}</td>
        <td>${base ? base.nome : '—'}</td>
        <td>${base ? '+' + base.bonusDefesa : '—'}</td>
        <td>${base ? base.penalidadeArmadura : '—'}</td>
        <td>${base ? base.espacos : '—'}</td>
        <td>${a.preco}</td>
      </tr>`;
    }).join('');
    return `
      <div class="eq-tabela-scroll">
        <table class="eq-tabela">
          <thead>${_theadOrdenavel(ARMADURAS_ESPECIFICAS_COLUNAS, _armadurasMagicasEstado, 'ordenarTabelaArmadurasMagicas')}</thead>
          <tbody>${linhas}</tbody>
        </table>
      </div>`;
  }

  window.ordenarTabelaArmadurasMagicas = campo => _ordenarTabelaEquip(_armadurasMagicasEstado, campo, renderArmadurasMagicasNaSecao);

  function renderArmadurasMagicasNaSecao() {
    const grid = document.getElementById('armadurasMagicasGrid');
    if (!grid) return;
    let lista = window.ARMADURAS_ESCUDOS_ESPECIFICOS || [];
    if (_armadurasMagicasEstado.busca) {
      const t = _armadurasMagicasEstado.busca;
      lista = lista.filter(x => x.nome.toLowerCase().includes(t) || x.descricao.toLowerCase().includes(t));
    }
    const countEl = document.getElementById('armadurasMagicasCount');
    if (countEl) countEl.textContent = lista.length + ' itens específicos';

    if (_armadurasMagicasEstado.modo === 'tabela') {
      document.getElementById('armadurasMagicasGrid').style.display = 'none';
      document.getElementById('armadurasMagicasTabelaWrap').style.display = '';
      document.getElementById('armadurasMagicasTabelaWrap').innerHTML = renderArmadurasEspecificasTabela(lista);
      return;
    }
    document.getElementById('armadurasMagicasGrid').style.display = '';
    document.getElementById('armadurasMagicasTabelaWrap').style.display = 'none';
    grid.innerHTML = '';
    if (!lista.length) {
      grid.innerHTML = `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nada encontrado.</div>`;
      return;
    }
    lista.forEach(x => grid.appendChild(renderArmaduraEspecificaCard(x)));
  }

  window.setModoVisualArmadurasMagicas = (modo) => {
    _armadurasMagicasEstado.modo = modo;
    document.getElementById('armadurasMagicasModoCards').classList.toggle('a', modo === 'cards');
    document.getElementById('armadurasMagicasModoTabela').classList.toggle('a', modo === 'tabela');
    renderArmadurasMagicasNaSecao();
  };

  // ── MODIFICADORES (melhorias + encantamentos + materiais especiais + maldições) ──────────────────────
  const _modificadorEstado = { categoria: 'melhoria', tipo: 'todos', busca: '' };

  const MOD_TAG_CLASSE = {
    melhoria: 'mod-tag-melhoria',
    encantamento: 'mod-tag-encantamento',
    material: 'mod-tag-material',
    maldicao: 'mod-tag-maldicao',
  };

  const MOD_TIPO_FILTROS = {
    melhoria: [],
    encantamento: [
      { valor: 'todos', label: 'Todos' },
      { valor: 'arma', label: 'Armas' },
      { valor: 'armadura', label: 'Armaduras' },
    ],
    material: [],
    maldicao: [],
  };

  function listaModificadoresPorCategoria(categoria) {
    if (categoria === 'melhoria') return window.MELHORIAS || [];
    if (categoria === 'material') return window.MATERIAIS_ESPECIAIS || [];
    if (categoria === 'encantamento') {
      const armas = (window.ENCANTOS_ARMA || []).map(e => ({ ...e, _tipoEncanto: 'arma' }));
      const armaduras = (window.ENCANTOS_ARMADURA || []).map(e => ({ ...e, _tipoEncanto: 'armadura' }));
      let lista = armas.concat(armaduras);
      if (_modificadorEstado.tipo !== 'todos') {
        lista = lista.filter(e => e._tipoEncanto === _modificadorEstado.tipo);
      }
      return lista;
    }
    return [];
  }

  const MOD_BORDA_CLASSE = { melhoria: 'mod-borda-melhoria', encantamento: 'mod-borda-encantamento', material: 'mod-borda-material', maldicao: 'mod-borda-maldicao' };
  const BADGE_T20 = '<span class="rc-badge badge-fonte">Tormenta 20</span>';

  function renderModificadorCard(item, categoria) {
    const card = document.createElement('div');
    card.className = `eq-card ${MOD_BORDA_CLASSE[categoria]}`;
    card.dataset.id = item.id;
    if (categoria === 'melhoria') {
      card.innerHTML = `
        <div class="eq-card-top">
          <span class="eq-categoria-tag ${MOD_TAG_CLASSE.melhoria}">Melhoria</span>
        </div>
        <div class="eq-nome">${item.nome}</div>
        <div class="eq-desc">${item.efeito}</div>
        <div class="eq-footer">
          ${item.preRequisito ? `<span class="eq-hab-tag">Requer: ${item.preRequisito}</span>` : ''}
          ${BADGE_T20}
        </div>`;
      card.addEventListener('click', () => abrirDetalheEquip('melhoria', item.id));
    } else if (categoria === 'encantamento') {
      const soTag = item.aplicavel && item.aplicavel.length === 1 ? `<span class="eq-hab-tag">Só ${item.aplicavel[0] === 'escudo' ? 'escudos' : 'armaduras'}</span>` : '';
      card.innerHTML = `
        <div class="eq-card-top">
          <span class="eq-categoria-tag ${MOD_TAG_CLASSE.encantamento}">Encantamento</span>
          <span class="eq-preco-tag">${item.custoEncantos === 2 ? '2 encantos' : '1 encanto'}</span>
        </div>
        <div class="eq-nome">${item.nome}</div>
        <div class="eq-desc">${item.efeito}</div>
        <div class="eq-footer">
          ${item.preRequisito ? `<span class="eq-hab-tag">Requer: ${item.preRequisito}</span>` : soTag}
          ${BADGE_T20}
        </div>`;
      card.addEventListener('click', () => abrirDetalheEquip(item._tipoEncanto === 'armadura' ? 'encanto-armadura' : 'encanto-arma', item.id));
    } else if (categoria === 'material') {
      card.innerHTML = `
        <div class="eq-card-top">
          <span class="eq-categoria-tag ${MOD_TAG_CLASSE.material}">Material Especial</span>
        </div>
        <div class="eq-nome">${item.nome}</div>
        <div class="eq-desc">${truncarTexto(item.descricao, 110)}</div>
        <div class="eq-footer">${BADGE_T20}</div>`;
      card.addEventListener('click', () => abrirDetalheEquip('material', item.id));
    }
    return card;
  }

  function renderModificadoresNaSecao() {
    const grid = document.getElementById('modificadoresGrid');
    if (!grid) return;
    const categoria = _modificadorEstado.categoria;
    let lista = listaModificadoresPorCategoria(categoria);
    if (_modificadorEstado.busca) {
      const t = _modificadorEstado.busca;
      lista = lista.filter(x => x.nome.toLowerCase().includes(t) || (x.descricao || x.efeito || '').toLowerCase().includes(t));
    }
    const countEl = document.getElementById('modificadoresCount');
    const label = { melhoria: 'melhorias', encantamento: 'encantamentos', material: 'materiais especiais', maldicao: 'maldições' }[categoria];
    if (countEl) countEl.textContent = lista.length + ' ' + label;
    grid.innerHTML = '';
    if (!lista.length) {
      grid.innerHTML = `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nenhum modificador encontrado.</div>`;
      return;
    }
    lista.forEach(item => grid.appendChild(renderModificadorCard(item, categoria)));
  }

  function renderTipoFiltroModificador() {
    const container = document.getElementById('modificadoresTipoFiltro');
    if (!container) return;
    const filtros = MOD_TIPO_FILTROS[_modificadorEstado.categoria] || [];
    container.innerHTML = '';
    if (!filtros.length) return;
    filtros.forEach(f => {
      const btn = document.createElement('button');
      btn.className = 'filtro-btn' + (f.valor === _modificadorEstado.tipo ? ' a' : '');
      btn.textContent = f.label;
      btn.addEventListener('click', () => window.setTipoFiltroModificador(btn, f.valor));
      container.appendChild(btn);
    });
  }

  // Clique num sub-item do menu expansível "Modificadores" (Melhorias/
  // Encantamentos/Materiais Especiais) leva direto pra Modificadores já
  // com aquela categoria selecionada, sem precisar clicar de novo lá dentro.
  window.irParaModificadorCategoria = function(categoria) {
    mostrarSecao('modificadores');
    const grupo = document.getElementById('modificadoresCategoriaFiltro');
    const btn = grupo?.querySelector(`[onclick*="'${categoria}'"]`);
    if (btn) setCategoriaModificador(btn, categoria);
  };

  window.setCategoriaModificador = (btn, categoria) => {
    _ativarFiltroBtn('#modificadoresCategoriaFiltro', btn);
    _modificadorEstado.categoria = categoria;
    _modificadorEstado.tipo = 'todos';
    renderTipoFiltroModificador();
    renderModificadoresNaSecao();
  };

  window.setTipoFiltroModificador = (btn, tipo) => {
    _ativarFiltroBtn('#modificadoresTipoFiltro', btn);
    _modificadorEstado.tipo = tipo;
    renderModificadoresNaSecao();
  };

  // _renderModificadorPorCategoriaFixa() foi removida em 23/ago — existia só
  // pra 4 campos `render` de ITEM_TIPO_CONFIG (melhoria/material/
  // encanto-arma/encanto-armadura) que, na varredura de duplicação daquele
  // dia, se confirmaram DEAD CODE: nada no site lia `.render` de
  // ITEM_TIPO_CONFIG (só `.lista()` é usado, por
  // BLOCO_REF_TIPOS.item.buscar). Removidos os campos junto (ver
  // ITEM_TIPO_CONFIG mais abaixo).

  // ── POÇÕES & PERGAMINHOS (catálogo + gerador dinâmico) ──────────────────────
  const _pocoesEstado = { modo: 'catalogo' };
  const FORMATO_ICONE = { 'óleo': 'ti-droplet', granada: 'ti-bomb', 'poção': 'ti-flask' };

  function renderPocaoCatalogoCard(entry) {
    const m = entry.magiaId ? (window.MAGIAS || []).find(x => x.id === entry.magiaId) : null;
    const card = document.createElement('div');
    card.className = 'eq-card';
    card.dataset.id = entry.id;
    card.innerHTML = `
      <div class="eq-card-top">
        <span class="eq-categoria-tag"><i class="ti ${FORMATO_ICONE[entry.formato] || 'ti-flask'}" aria-hidden="true"></i> ${entry.formato}</span>
        <span class="eq-preco-tag">${entry.preco}</span>
      </div>
      <div class="eq-nome">${m ? m.nome : '(magia não identificada)'}</div>
      ${entry.notaAprimoramento ? `<div class="eq-desc">Aprimoramento: ${entry.notaAprimoramento}</div>` : ''}
      <div class="eq-footer">
        ${m ? `<span class="eq-stat-mini"><i class="ti ti-circle-dot" aria-hidden="true"></i>${m.circulo}º círculo</span>` : ''}
        <span class="rc-badge badge-fonte">Tormenta 20</span>
      </div>`;
    card.addEventListener('click', () => abrirDetalheEquip('pocao-catalogo', entry.id));
    return card;
  }

  function renderPocoesCatalogoNaSecao() {
    const grid = document.getElementById('pocoesCatalogoGrid');
    if (!grid) return;
    const lista = window.POCOES_CATALOGO || [];
    const countEl = document.getElementById('pocoesCount');
    if (countEl) countEl.textContent = lista.length + ' no catálogo';
    grid.innerHTML = '';
    lista.forEach(entry => grid.appendChild(renderPocaoCatalogoCard(entry)));
  }

  window.setModoPocoes = (btn, modo) => {
    _ativarFiltroBtn('#pocoesModoFiltro', btn);
    _pocoesEstado.modo = modo;
    fecharDetalheEquip();
    document.getElementById('pocoesCatalogoArea').style.display = modo === 'catalogo' ? '' : 'none';
    document.getElementById('pocoesGeradorArea').style.display = modo === 'gerador' ? 'flex' : 'none';
  };

  // ── Gerador dinâmico: qualquer uma das 197 magias vira poção/pergaminho ──
  const _pocaoGerador = { magiaId: null, selecionados: {} }; // selecionados[i] = qtd (aumenta) ou true (muda/truque)

  window.buscarMagiaGerador = function(termo) {
    const resultadosEl = document.getElementById('pocaoGeradorResultados');
    if (!termo || termo.length < 2) { resultadosEl.innerHTML = ''; return; }
    const t = termo.toLowerCase();
    const achados = (window.MAGIAS || []).filter(m => m.nome.toLowerCase().includes(t)).slice(0, 8);
    resultadosEl.innerHTML = achados.map(m => `
      <div class="eq-melhoria-linha" onclick="selecionarMagiaGerador('${m.id}')">
        <div class="eq-melhoria-corpo">
          <div class="eq-melhoria-nome">${m.nome}</div>
          <div class="eq-melhoria-texto">${m.circulo}º círculo · ${m.tipo}</div>
        </div>
      </div>`).join('') || '<div class="eq-melhoria-texto">Nenhuma magia encontrada.</div>';
  };

  window.selecionarMagiaGerador = function(magiaId) {
    _pocaoGerador.magiaId = magiaId;
    _pocaoGerador.selecionados = {};
    document.getElementById('pocaoGeradorResultados').innerHTML = '';
    document.getElementById('buscaMagiaGerador').value = '';
    renderCorpoGerador();
  };

  function calcularPMGerador() {
    const m = (window.MAGIAS || []).find(x => x.id === _pocaoGerador.magiaId);
    if (!m) return 0;
    let pm = (window.CUSTO_POR_CIRCULO || {})[m.circulo] || 1;
    m.aprimoramentos.forEach((a, i) => {
      const sel = _pocaoGerador.selecionados[i];
      if (!sel) return;
      if (a.tipo === 'aumenta') pm += a.custoPM * sel;
      else pm += a.custoPM;
    });
    return pm;
  }

  window.toggleAprimGerador = function(i) {
    const atual = _pocaoGerador.selecionados[i];
    _pocaoGerador.selecionados[i] = atual ? false : true;
    renderCorpoGerador();
  };

  window.alterarAprimGerador = function(i, delta) {
    const atual = _pocaoGerador.selecionados[i] || 0;
    _pocaoGerador.selecionados[i] = Math.max(0, atual + delta);
    renderCorpoGerador();
  };

  function renderCorpoGerador() {
    const corpo = document.getElementById('pocaoGeradorCorpo');
    const m = (window.MAGIAS || []).find(x => x.id === _pocaoGerador.magiaId);
    if (!m) { corpo.innerHTML = ''; return; }
    const kw = typeof processarKeywords === 'function' ? processarKeywords : (t) => t;

    const aprimHtml = m.aprimoramentos.map((a, i) => {
      const sel = _pocaoGerador.selecionados[i];
      if (a.tipo === 'aumenta') {
        const qtd = sel || 0;
        return `
          <div class="mg-aprim ${qtd ? 'selecionado' : ''}">
            <div class="mg-aprim-stepper">
              <button onclick="alterarAprimGerador(${i}, -1)" ${qtd === 0 ? 'disabled' : ''}>−</button>
              <span class="mg-aprim-qtd">${qtd}</span>
              <button onclick="alterarAprimGerador(${i}, 1)">+</button>
            </div>
            <div class="mg-aprim-corpo">
              <span class="mg-aprim-custo">+${a.custoPM} PM</span>
              <span class="mg-aprim-texto">${kw(a.efeito)}</span>
            </div>
          </div>`;
      }
      return `
        <div class="mg-aprim ${sel ? 'selecionado' : ''}">
          <div class="mg-aprim-check" onclick="toggleAprimGerador(${i})">${sel ? '<i class="ti ti-check" aria-hidden="true"></i>' : ''}</div>
          <div class="mg-aprim-corpo">
            <span class="mg-aprim-custo">+${a.custoPM} PM</span>
            <span class="mg-aprim-texto">${kw(a.efeito)}</span>
          </div>
        </div>`;
    }).join('');

    const pm = calcularPMGerador();
    const preco = window.calcularPrecoPocaoPergaminho(pm);
    const cd = window.calcularCDPocaoPergaminho(pm);
    const categoria = window.categoriaPorCirculo(m.circulo);

    corpo.innerHTML = `
      <div class="dp-secao" style="margin-top:16px;">Magia escolhida</div>
      <div class="eq-nome" style="margin-bottom:10px;">${m.nome} <span class="eq-categoria-tag">${m.circulo}º círculo</span></div>
      <p class="dp-desc">${kw(m.descricao)}</p>
      ${m.aprimoramentos.length ? `
      <div class="dp-secao">Aprimoramentos (opcional)</div>
      <div>${aprimHtml}</div>` : ''}
      <div class="dp-secao">Formato</div>
      <div style="display:flex;gap:8px;margin-bottom:12px;">
        <button class="mg-opcao-pill ${_pocaoGerador.formato === 'pocao' ? 'ativa' : ''}" onclick="setFormatoGerador('pocao')"><i class="ti ti-flask" aria-hidden="true"></i> Poção</button>
        <button class="mg-opcao-pill ${_pocaoGerador.formato === 'pergaminho' ? 'ativa' : ''}" onclick="setFormatoGerador('pergaminho')"><i class="ti ti-scroll" aria-hidden="true"></i> Pergaminho</button>
      </div>
      <div class="eq-total-box">
        <span>${pm} PM total · categoria ${categoria} · CD ${cd}</span>
        <span class="valor">T$ ${preco.toLocaleString('pt-BR')}</span>
      </div>
      <button class="pg-modo-btn" style="width:100%;margin-top:10px;padding:9px;" onclick="criarItemGerado()">
        <i class="ti ti-plus" aria-hidden="true"></i> Criar item
      </button>`;
  }

  window.setFormatoGerador = function(formato) {
    _pocaoGerador.formato = formato;
    renderCorpoGerador();
  };

  window.criarItemGerado = function() {
    const m = (window.MAGIAS || []).find(x => x.id === _pocaoGerador.magiaId);
    if (!m) return;
    const pm = calcularPMGerador();
    const item = {
      id: _proximoIdItemCriado++,
      magiaId: m.id,
      magiaNome: m.nome,
      circulo: m.circulo,
      formato: _pocaoGerador.formato,
      pm,
      preco: window.calcularPrecoPocaoPergaminho(pm),
      cd: window.calcularCDPocaoPergaminho(pm),
      categoria: window.categoriaPorCirculo(m.circulo),
    };
    _itensCriadosPocoes.push(item);
    renderItensCriadosArea();
  };

  window.removerItemCriado = function(id) {
    _itensCriadosPocoes = _itensCriadosPocoes.filter(x => x.id !== id);
    renderItensCriadosArea();
  };

  function resetItensCriadosPocoes() {
    _itensCriadosPocoes = [];
    renderItensCriadosArea();
  }

  function renderItensCriadosArea() {
    const wrap = document.getElementById('pocoesItensCriadosWrap');
    const grid = document.getElementById('pocoesItensCriadosGrid');
    if (!wrap || !grid) return;
    if (!_itensCriadosPocoes.length) {
      wrap.style.display = 'none';
      grid.innerHTML = '';
      return;
    }
    wrap.style.display = '';
    grid.innerHTML = _itensCriadosPocoes.map(item => `
      <div class="eq-card" onclick="abrirDetalheEquip('pocao-criada', ${item.id})">
        <div class="eq-card-top">
          <span class="eq-categoria-tag"><i class="ti ${item.formato === 'pergaminho' ? 'ti-scroll' : 'ti-flask'}" aria-hidden="true"></i> ${item.formato === 'pergaminho' ? 'Pergaminho' : 'Poção'}</span>
          <span class="eq-preco-tag">T$ ${item.preco.toLocaleString('pt-BR')}</span>
        </div>
        <div class="eq-nome">${item.magiaNome}</div>
        <div class="eq-desc">${item.circulo}º círculo · ${item.pm} PM · categoria ${item.categoria} · CD ${item.cd}</div>
        <div class="eq-footer">
          <span class="rc-badge badge-fonte">Tormenta 20</span>
          <button class="mg-opcao-pill" style="margin-left:auto;" onclick="event.stopPropagation(); removerItemCriado(${item.id})"><i class="ti ti-x" aria-hidden="true"></i></button>
        </div>
      </div>`).join('');
  }

  // ── ACESSÓRIOS ──────────────────────────────────────────
  const _acessorioEstado = { categoria: 'todos', busca: '', modo: 'cards', ordenarCampo: null, ordenarAsc: true };
  const CATEGORIA_ACESSORIO_INFO = { menor: 'Menor', medio: 'Médio', maior: 'Maior' };

  function renderAcessorioCard(a) {
    const card = document.createElement('div');
    card.className = 'eq-card';
    card.dataset.id = a.id;
    card.innerHTML = `
      <div class="eq-card-top">
        <span class="eq-categoria-tag">${CATEGORIA_ACESSORIO_INFO[a.categoria]}</span>
        <span class="eq-preco-tag">${a.preco}</span>
      </div>
      <div class="eq-nome">${a.nome}</div>
      <div class="eq-desc">${truncarTexto(a.descricao, 100)}</div>
      <div class="eq-footer"><span class="rc-badge badge-fonte">Tormenta 20</span></div>`;
    card.addEventListener('click', () => abrirDetalheEquip('acessorio', a.id));
    return card;
  }

  const ACESSORIOS_COLUNAS = [
    { label: 'Nome', campo: 'nome', valor: a => a.nome },
    { label: 'Categoria', campo: 'categoria', valor: a => CATEGORIA_ACESSORIO_INFO[a.categoria] || '' },
    { label: 'Preço', campo: 'preco', valor: a => precoParaNumero(a.preco) },
  ];

  function renderAcessoriosTabela(lista) {
    const ordenada = _ordenarLinhas(lista, ACESSORIOS_COLUNAS, _acessorioEstado);
    const linhas = ordenada.map(a => `
      <tr onclick="abrirDetalheEquip('acessorio','${a.id}')">
        <td>${a.nome}</td>
        <td>${CATEGORIA_ACESSORIO_INFO[a.categoria]}</td>
        <td>${a.preco}</td>
      </tr>`).join('');
    return `
      <div class="eq-tabela-scroll">
        <table class="eq-tabela">
          <thead>${_theadOrdenavel(ACESSORIOS_COLUNAS, _acessorioEstado, 'ordenarTabelaAcessorios')}</thead>
          <tbody>${linhas}</tbody>
        </table>
      </div>`;
  }

  window.ordenarTabelaAcessorios = campo => _ordenarTabelaEquip(_acessorioEstado, campo, renderAcessoriosNaSecao);

  function renderAcessoriosNaSecao() {
    const grid = document.getElementById('acessoriosGrid');
    if (!grid) return;
    let lista = window.ACESSORIOS || [];
    if (_acessorioEstado.categoria !== 'todos') lista = lista.filter(a => a.categoria === _acessorioEstado.categoria);
    if (_acessorioEstado.busca) {
      const t = _acessorioEstado.busca;
      lista = lista.filter(a => a.nome.toLowerCase().includes(t) || a.descricao.toLowerCase().includes(t));
    }
    const countEl = document.getElementById('acessoriosCount');
    if (countEl) countEl.textContent = lista.length + (lista.length !== 1 ? ' acessórios' : ' acessório');

    if (_acessorioEstado.modo === 'tabela') {
      document.getElementById('acessoriosGrid').style.display = 'none';
      document.getElementById('acessoriosTabelaWrap').style.display = '';
      document.getElementById('acessoriosTabelaWrap').innerHTML = renderAcessoriosTabela(lista);
      return;
    }
    document.getElementById('acessoriosGrid').style.display = '';
    document.getElementById('acessoriosTabelaWrap').style.display = 'none';
    grid.innerHTML = '';
    if (!lista.length) {
      grid.innerHTML = `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nenhum acessório encontrado.</div>`;
      return;
    }
    lista.forEach(a => grid.appendChild(renderAcessorioCard(a)));
  }

  window.setModoVisualAcessorios = (modo) => {
    _acessorioEstado.modo = modo;
    document.getElementById('acessoriosModoCards').classList.toggle('a', modo === 'cards');
    document.getElementById('acessoriosModoTabela').classList.toggle('a', modo === 'tabela');
    renderAcessoriosNaSecao();
  };

  window.setFiltroAcessorio = (btn, valor) => {
    _ativarFiltroBtn('#acessoriosFiltro', btn);
    _acessorioEstado.categoria = valor;
    renderAcessoriosNaSecao();
  };

  // ── ARTEFATOS ──────────────────────────────────────────
  function renderArtefatoCard(a) {
    const card = document.createElement('div');
    card.className = 'eq-card';
    card.dataset.id = a.id;
    card.innerHTML = `
      <div class="eq-nome">${a.nome}</div>
      <div class="eq-desc">${truncarTexto(a.descricao, 130)}</div>
      <div class="eq-footer"><span class="rc-badge badge-fonte">Tormenta 20</span></div>`;
    card.addEventListener('click', () => abrirDetalheEquip('artefato', a.id));
    return card;
  }

  function renderArtefatosNaSecao() {
    const grid = document.getElementById('artefatosGrid');
    if (!grid) return;
    grid.innerHTML = '';
    (window.ARTEFATOS || []).forEach(a => grid.appendChild(renderArtefatoCard(a)));
  }

  // ── CRIATURAS (Bestiário) ──────────────────────────────────────────
  const _criaturaEstado = { nd: 'todos', grupo: 'todos', papel: 'todos', busca: '', modo: 'cards', ordenarCampo: null, ordenarAsc: true };

  const PAPEL_ICONE = { solo: 'ti-shield-lock', lacaio: 'ti-users', especial: 'ti-star' };
  const PAPEL_LABEL = { solo: 'Solo', lacaio: 'Lacaio', especial: 'Especial' };

  function ndNaFaixa(ndValor, faixa) {
    if (faixa === 'todos') return true;
    if (faixa === '0-1') return ndValor <= 1;
    if (faixa === '2-5') return ndValor >= 2 && ndValor <= 5;
    if (faixa === '6-10') return ndValor >= 6 && ndValor <= 10;
    if (faixa === '11-15') return ndValor >= 11 && ndValor <= 15;
    if (faixa === '16-20') return ndValor >= 16 && ndValor <= 20;
    return true;
  }

  // Monta (e guarda em cache no próprio objeto) um texto único com todos os
  // campos relevantes da criatura, para a busca cobrir tipo, ataques,
  // habilidades, magias, resistências e perícias — não só nome/descrição.
  function textoBuscavelCriatura(c) {
    if (c._buscaCache) return c._buscaCache;
    const partes = [
      c.nome, c.descricao, c.tipo, c.tamanho, c.papel,
      (window.GRUPOS_CRIATURAS && window.GRUPOS_CRIATURAS[c.grupo]) ? window.GRUPOS_CRIATURAS[c.grupo].label : c.grupo,
      ...(c.ataques || []).map(a => a._naoExtraido ? a.textoOriginal : `${a.arma} ${a.extra || ''}`),
      ...(c.habilidades || []).map(h => `${h.titulo} ${h.texto}`),
      ...(c.magias ? [c.magias.conjurador, ...c.magias.lista.map(m => `${m.titulo} ${m.texto}`)] : []),
      ...(c.resistencias || []).map(r => r._naoExtraido ? r.textoOriginal : `${r.categoria} ${r.alvo || ''}`),
      ...(c.pericias || []).map(p => p.nome),
      c.equipamento, c.tesouro,
    ];
    c._buscaCache = partes.filter(Boolean).join(' | ').toLowerCase();
    return c._buscaCache;
  }

  function renderCriaturaCard(c) {
    const card = document.createElement('div');
    card.className = 'eq-card criatura-card' + (c.papel === 'solo' ? ' cr-card-solo' : '');
    card.dataset.id = c.id;
    card.innerHTML = `
      <div class="eq-card-top">
        <span class="eq-categoria-tag cr-nd-tag">ND ${c.nd}</span>
        <span class="eq-preco-tag"><i class="ti ${PAPEL_ICONE[c.papel] || 'ti-paw'}" aria-hidden="true"></i> ${PAPEL_LABEL[c.papel] || ''}</span>
      </div>
      <div class="eq-nome">${c.nome}</div>
      <div class="cr-tags-tipo">
        <span class="cr-tag">${c.tipo}</span>
        ${c.tamanho ? `<span class="cr-tag">${c.tamanho}</span>` : ''}
        ${c.magias ? `<span class="cr-tag cr-tag-conjurador"><i class="ti ti-wand" aria-hidden="true"></i> Conjurador</span>` : ''}
      </div>
      <div class="eq-footer">
        <span class="eq-stat-mini cr-stat-pv"><i class="ti ti-heart" aria-hidden="true"></i>${c.pv} PV</span>
        <span class="eq-stat-mini cr-stat-defesa"><i class="ti ti-shield" aria-hidden="true"></i>${c.defesa}</span>
        <span class="rc-badge badge-fonte">Tormenta 20</span>
      </div>`;
    card.addEventListener('click', () => abrirDetalheCriatura(c.id));
    return card;
  }

  function renderCriaturasNaSecao() {
    const grid = document.getElementById('criaturasGrid');
    if (!grid) return;
    let lista = window.CRIATURAS || [];
    if (_criaturaEstado.nd !== 'todos') lista = lista.filter(c => ndNaFaixa(c.ndValor, _criaturaEstado.nd));
    if (_criaturaEstado.grupo !== 'todos') lista = lista.filter(c => c.grupo === _criaturaEstado.grupo);
    if (_criaturaEstado.papel !== 'todos') lista = lista.filter(c => c.papel === _criaturaEstado.papel);
    if (_criaturaEstado.busca) {
      const t = _criaturaEstado.busca;
      lista = lista.filter(c => textoBuscavelCriatura(c).includes(t));
    }
    // Ordenação padrão por ND (como no livro); se o usuário clicou num
    // cabeçalho, essa ordenação assume o lugar da ordenação padrão.
    lista = _criaturaEstado.ordenarCampo
      ? _ordenarLinhas(lista, CRIATURAS_COLUNAS, _criaturaEstado)
      : [...lista].sort((a, b) => a.ndValor - b.ndValor);

    const countEl = document.getElementById('criaturasCount');
    if (countEl) countEl.textContent = lista.length + (lista.length !== 1 ? ' criaturas' : ' criatura');

    if (_criaturaEstado.modo === 'tabela') {
      document.getElementById('criaturasGrid').style.display = 'none';
      document.getElementById('criaturasTabelaWrap').style.display = '';
      document.getElementById('criaturasTabelaWrap').innerHTML = renderCriaturasTabela(lista);
      return;
    }
    document.getElementById('criaturasGrid').style.display = '';
    document.getElementById('criaturasTabelaWrap').style.display = 'none';
    grid.innerHTML = '';
    if (!lista.length) {
      grid.innerHTML = `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nenhuma criatura encontrada.</div>`;
      return;
    }
    lista.forEach(c => grid.appendChild(renderCriaturaCard(c)));
  }

  function _grupoCriaturaDe(c) { return (window.GRUPOS_CRIATURAS || {})[c.grupo] || { label: c.grupo }; }

  const CRIATURAS_COLUNAS = [
    { label: 'Nome', campo: 'nome', valor: c => c.nome },
    { label: 'ND', campo: 'nd', valor: c => c.ndValor },
    { label: 'Grupo', campo: 'grupo', valor: c => _grupoCriaturaDe(c).label },
    { label: 'Papel', campo: 'papel', valor: c => PAPEL_LABEL[c.papel] || '' },
    { label: 'PV', campo: 'pv', valor: c => c.pv },
    { label: 'Defesa', campo: 'defesa', valor: c => c.defesa },
    { label: 'Tipo', campo: 'tipo', valor: c => c.tipo },
    { label: 'Tamanho', campo: 'tamanho', valor: c => c.tamanho || '' },
  ];

  function renderCriaturasTabela(lista) {
    const linhas = lista.map(c => {
      const grupoInfo = _grupoCriaturaDe(c);
      return `
      <tr onclick="abrirDetalheCriatura('${c.id}')">
        <td>${c.nome}${c.magias ? ' <i class="ti ti-wand" title="Conjurador" aria-hidden="true"></i>' : ''}</td>
        <td>${c.nd}</td>
        <td>${grupoInfo.label}</td>
        <td>${PAPEL_LABEL[c.papel] || ''}</td>
        <td>${c.pv}</td>
        <td>${c.defesa}</td>
        <td>${c.tipo}</td>
        <td>${c.tamanho || ''}</td>
      </tr>`;
    }).join('');
    return `
      <div class="eq-tabela-scroll">
        <table class="eq-tabela">
          <thead>${_theadOrdenavel(CRIATURAS_COLUNAS, _criaturaEstado, 'ordenarTabelaCriaturas')}</thead>
          <tbody>${linhas}</tbody>
        </table>
      </div>`;
  }

  window.ordenarTabelaCriaturas = campo => _ordenarTabelaEquip(_criaturaEstado, campo, renderCriaturasNaSecao);

  window.setFiltroCriatura = (eixo, btn, valor) => {
    const grupoId = eixo === 'nd' ? 'criaturasFiltroND' : eixo === 'grupo' ? 'criaturasFiltroGrupo' : 'criaturasFiltroPapel';
    _ativarFiltroBtn(`#${grupoId}`, btn);
    _criaturaEstado[eixo] = valor;
    renderCriaturasNaSecao();
  };

  window.setModoVisualCriaturas = (modo) => {
    _criaturaEstado.modo = modo;
    document.getElementById('criaturasModoCards').classList.toggle('a', modo === 'cards');
    document.getElementById('criaturasModoTabela').classList.toggle('a', modo === 'tabela');
    renderCriaturasNaSecao();
  };

  let _criaturaAtual = null;

  function blocoHabilidades(lista) {
    if (!lista || !lista.length) return '';
    return lista.map(h => `
      <div class="dp-habilidade">
        <div class="dp-hab-nome">${h.titulo}</div>
        <div class="dp-hab-desc">${processarKeywords(h.texto)}</div>
      </div>`).join('');
  }

  // Ataques agora chegam ESTRUTURADOS (um item por arma/golpe, ex: { categoria,
  // arma, bonus, dano, tipoDano, critico, extra }), para permitir busca avançada
  // futura por bônus de ataque, tipo de dano etc. Aqui eles são reagrupados por
  // categoria (Corpo a Corpo / À Distância) e recompostos em texto legível —
  // o dado estruturado por trás continua segmentado.
  function formatarAtaque(a) {
    if (a._naoExtraido) return processarKeywords(a.textoOriginal);
    let texto = `${a.arma} +${a.bonus} (${a.dano}`;
    if (a.extra) texto += ` mais ${a.extra}`;
    if (a.critico) texto += `, ${a.critico}`;
    texto += ')';
    return processarKeywords(texto);
  }

  function blocoAtaques(lista) {
    if (!lista || !lista.length) return '';
    const grupos = {};
    const ordem = [];
    lista.forEach(a => {
      const cat = a.categoria || 'Ataque';
      if (!grupos[cat]) { grupos[cat] = []; ordem.push(cat); }
      grupos[cat].push(a);
    });
    return ordem.map(cat => `
      <div class="dp-habilidade">
        <div class="dp-hab-nome">${cat}</div>
        <div class="dp-hab-desc">${grupos[cat].map(formatarAtaque).join(' e ')}.</div>
      </div>`).join('');
  }

  // Resistências agora chegam ESTRUTURADAS (categoria/alvo/valor). Aqui são
  // recompostas em texto legível para exibição, mantendo o dado segmentado.
  const RESIST_CATEGORIA_LABEL = { imunidade: 'Imunidade', reducao: 'Redução de dano', vulnerabilidade: 'Vulnerabilidade', resistencia: 'Resistência', cura_acelerada: 'Cura acelerada', resistencia_magia: 'Resistência a magia' };
  function formatarResistencia(r) {
    if (r._naoExtraido) return processarKeywords(r.textoOriginal);
    if (r.categoria === 'reducao') {
      return processarKeywords(`${RESIST_CATEGORIA_LABEL.reducao} ${r.valor}${r.alvo ? '/' + r.alvo : ''}`);
    }
    if (r.categoria === 'cura_acelerada') {
      return processarKeywords(`${RESIST_CATEGORIA_LABEL.cura_acelerada} ${r.valor}${r.alvo ? ' (' + r.alvo + ')' : ''}`);
    }
    if (r.categoria === 'resistencia_magia') {
      return processarKeywords(`${RESIST_CATEGORIA_LABEL.resistencia_magia} +${r.valor}${r.alvo ? ' (' + r.alvo + ')' : ''}`);
    }
    return processarKeywords(`${RESIST_CATEGORIA_LABEL[r.categoria] || r.categoria} a ${r.alvo}`);
  }

  // Grupo de estatísticas do mesmo tipo (ex: Resistências, Atributos, Perícias) —
  // uma div "container" com um rótulo, e dentro dela cada item em sua própria
  // div "chip". Feito assim (em vez de um texto único) para permitir busca
  // avançada futura por estatística individual.
  function grupoChips(titulo, itens) {
    if (!itens || !itens.length) return '';
    const chips = itens.map(it => it.label
      ? `<div class="dp-grupo-item"><span class="lbl">${it.label}</span>${it.valor}</div>`
      : `<div class="dp-grupo-item">${it.valor}</div>`
    ).join('');
    return `<div class="dp-grupo"><div class="dp-grupo-titulo">${titulo}</div><div class="dp-grupo-itens">${chips}</div></div>`;
  }

  // Quando a própria criatura do Bestiário também serve de parceiro (campo
  // opcional `parceiro`, ver cabeçalho de criaturas.js — ex.: Urso das
  // Neves) mostra o bônus por patamar aqui mesmo, com um link pra página
  // de Parceiros. `renderNiveisParceiro` é definida mais abaixo (seção
  // PARCEIROS) mas, sendo function declaration, já está disponível aqui.
  function blocoParceiroDaCriatura(c) {
    if (!c.parceiro) return '';
    return `
      <div class="dp-secao">Parceiro</div>
      <p class="dp-desc">Esta criatura também serve de parceiro${c.parceiro.tamanho ? ` (${c.parceiro.tamanho})` : ''}.</p>
      ${renderNiveisParceiro(c.parceiro.niveis)}
      <button class="btn-ghost" style="margin-top:8px" onclick="irParaParceiro('bestiario', '${c.id}')">
        <i class="ti ti-arrow-right" aria-hidden="true"></i> Ver na página de Parceiros
      </button>`;
  }

  window.abrirDetalheCriatura = (id) => {
    const c = (window.CRIATURAS || []).find(x => x.id === id);
    if (!c) return;
    _criaturaAtual = c;
    const grupoInfo = (window.GRUPOS_CRIATURAS || {})[c.grupo] || { label: c.grupo };

    document.getElementById('crTipo').innerHTML = `<i class="ti ${PAPEL_ICONE[c.papel] || 'ti-paw'}" aria-hidden="true"></i> ${grupoInfo.label} · ${PAPEL_LABEL[c.papel] || ''}`;
    document.getElementById('crNome').textContent = c.nome;
    document.getElementById('crSub').textContent = `${c.tipo}${c.tamanho ? ' ' + c.tamanho : ''}`;
    document.getElementById('crNdFixoValor').textContent = `ND ${c.nd}`;

    // Destaque visual para criaturas "solo" — ameaças pra serem enfrentadas
    // sozinhas, que merecem chamar mais atenção que lacaios/especiais comuns.
    const crHero = document.getElementById('crHero');
    crHero.classList.toggle('cr-hero-solo', c.papel === 'solo');
    let seloSolo = crHero.querySelector('.cr-selo-solo');
    if (c.papel === 'solo') {
      if (!seloSolo) {
        seloSolo = document.createElement('span');
        seloSolo.className = 'cr-selo-solo';
        seloSolo.innerHTML = '<i class="ti ti-skull" aria-hidden="true"></i> Ameaça Solo';
        crHero.appendChild(seloSolo);
      }
    } else if (seloSolo) {
      seloSolo.remove();
    }

    const magiasHtml = c.magias ? `
      <div class="dp-secao">Magias</div>
      <p class="dp-desc">O conjurador lança magias como um ${c.magias.conjurador}.</p>
      ${blocoHabilidades(c.magias.lista)}` : '';

    // Resistências: Fortitude/Reflexos/Vontade sempre existem; imunidades,
    // reduções de dano e vulnerabilidades (array c.resistencias) entram como
    // itens extras do mesmo grupo.
    const itensResistencia = [
      { label: 'Fortitude', valor: c.fort },
      { label: 'Reflexos', valor: c.reflexos },
      { label: 'Vontade', valor: c.vontade },
      ...(c.resistencias || []).map(r => ({ label: null, valor: formatarResistencia(r) })),
    ];

    // Atributos: objeto { For, Des, Con, Int, Sab, Car } — null vira "—".
    const ORDEM_ATRIB = ['For', 'Des', 'Con', 'Int', 'Sab', 'Car'];
    const itensAtributos = ORDEM_ATRIB.map(k => ({
      label: k, valor: (c.atributos && c.atributos[k] !== null && c.atributos[k] !== undefined) ? c.atributos[k] : '—',
    }));

    const itensPericias = (c.pericias || []).map(p => ({ label: p.nome, valor: p.valor }));

    document.getElementById('crBody').innerHTML = `
      <p class="dp-desc">${processarKeywords(c.descricao || '')}</p>

      <div class="dp-secao">Estatísticas</div>
      <div class="dp-atribs">
        <div class="dp-atrib"><div class="dp-atrib-l">Iniciativa</div><div class="dp-atrib-v cr-v-ini">${c.iniciativa}</div></div>
        <div class="dp-atrib"><div class="dp-atrib-l">Percepção</div><div class="dp-atrib-v cr-v-ini">${c.percepcao}</div></div>
        <div class="dp-atrib"><div class="dp-atrib-l">Defesa</div><div class="dp-atrib-v cr-v-defesa">${c.defesa}</div></div>
        <div class="dp-atrib"><div class="dp-atrib-l">Pontos de Vida</div><div class="dp-atrib-v cr-v-pv">${c.pv}</div></div>
        <div class="dp-atrib"><div class="dp-atrib-l">Deslocamento</div><div class="dp-atrib-v cr-v-desloc">${c.deslocamento}</div></div>
        ${c.pm !== null && c.pm !== undefined ? `<div class="dp-atrib"><div class="dp-atrib-l">Pontos de Mana</div><div class="dp-atrib-v cr-v-pm">${c.pm}</div></div>` : ''}
      </div>

      ${grupoChips('Resistências', itensResistencia)}
      ${grupoChips('Atributos', itensAtributos)}
      ${grupoChips('Perícias', itensPericias)}

      <div class="dp-secao">Ataques &amp; Habilidades</div>
      ${blocoAtaques(c.ataques)}
      ${blocoHabilidades(c.habilidades)}
      ${magiasHtml}

      ${c.equipamento ? `<div class="dp-secao">Equipamento</div><p class="dp-desc">${processarKeywords(c.equipamento)}</p>` : ''}

      <div class="dp-secao">Tesouro</div>
      <p class="dp-desc">${processarKeywords(c.tesouro || 'Nenhum')}</p>

      ${blocoParceiroDaCriatura(c)}

      <div class="dp-fonte-pagina">Tormenta 20, p. ${c.pagina || '—'}</div>
    `;

    document.getElementById('criaturaPainel').classList.add('aberto');
    // O painel pode ser aberto tanto da grade de Criaturas quanto da
    // Calculadora de Combate — encolhe a área visível de quem estiver ativa.
    document.querySelectorAll('#secao-criaturas .cards-area, #secao-calc-combate .cards-area')
      .forEach(el => el.classList.add('encolhido'));
  };

  window.fecharDetalheCriatura = () => {
    _fecharPainelDetalhe(document.getElementById('criaturaPainel'), '#secao-criaturas .cards-area, #secao-calc-combate .cards-area');
  };

  // ── PARCEIROS ──────────────────────────────────────────
  // Três coleções, mesmo formato de "niveis" (Iniciante/Veterano/Mestre)
  // — por isso reaproveitam o mesmo card, o mesmo painel de detalhe e o
  // mesmo helper renderNiveisParceiro, só trocando rótulo/ícone/link:
  //   'tipos'     → TIPOS_PARCEIRO (js/data/parceiros.js, os 12 tipos)
  //   'montarias' → MONTARIAS_PARCEIRO (as 6 montarias nomeadas do livro,
  //                 sem ficha de criatura própria)
  //   'bestiario' → criaturas de CRIATURAS que têm o campo opcional
  //                 `.parceiro` (ex.: Urso das Neves) — a ficha completa
  //                 mora no Bestiário; aqui só lemos o campo, sem copiar.
  const _parceiroEstado = { grupo: 'tipos', tamanho: 'todos', busca: '' };

  // Criaturas que também servem de parceiro — lidas direto de CRIATURAS,
  // nunca duplicadas aqui. Cada uma expõe { id, nome, descricao, ...,
  // parceiro: {tipo, tamanho, niveis} } — ver cabeçalho de criaturas.js.
  function criaturasComParceiro() {
    return (window.CRIATURAS || []).filter(c => c.parceiro);
  }

  function _listaParceiroPorGrupo(grupo) {
    if (grupo === 'montarias') return window.MONTARIAS_PARCEIRO || [];
    if (grupo === 'bestiario') return criaturasComParceiro();
    return window.TIPOS_PARCEIRO || [];
  }

  // Tamanho só existe pra montarias/bestiario (item.tamanho ou
  // item.parceiro.tamanho) — tipos abstratos não têm tamanho físico.
  function _tamanhoDoParceiro(item, grupo) {
    return grupo === 'bestiario' ? (item.parceiro && item.parceiro.tamanho) : item.tamanho;
  }

  function renderNiveisParceiro(niveis) {
    if (!niveis || !niveis.length) return '';
    return `<div class="dp-niveis-parceiro">
      ${niveis.map(n => `
        <div class="cp-var-nivel">
          <span class="cp-var-nivel-badge cp-var-nivel-${n.label.toLowerCase()}">${n.label}</span>
          <span class="cp-var-nivel-desc">${processarKeywords(n.descricao || '')}</span>
        </div>`).join('')}
    </div>`;
  }

  function renderParceiroCard(item, grupo) {
    const card = document.createElement('div');
    card.className = 'eq-card';
    card.dataset.id = item.id;
    const tamanho = _tamanhoDoParceiro(item, grupo);
    const categoriaTag = grupo === 'tipos' ? 'Tipo de Parceiro' : (tamanho || '—');
    const fichaTag = grupo === 'bestiario' ? `<span class="eq-hab-tag">ND ${item.nd} · Ficha no Bestiário</span>` : '';
    card.innerHTML = `
      <div class="eq-card-top">
        <span class="eq-categoria-tag">${categoriaTag}</span>
      </div>
      <div class="eq-nome"><i class="ti ${item.icone || 'ti-paw'}" aria-hidden="true"></i> ${item.nome}</div>
      <div class="eq-desc">${truncarTexto(item.descricao, 110)}</div>
      <div class="eq-footer">${fichaTag}<span class="rc-badge badge-fonte">Tormenta 20</span></div>`;
    card.addEventListener('click', () => abrirDetalheParceiro(grupo, item.id));
    return card;
  }

  function renderFiltroTamanhoParceiro(grupo, lista) {
    const wrap = document.getElementById('parceirosFiltroTamanho');
    if (!wrap) return;
    if (grupo === 'tipos') { wrap.style.display = 'none'; wrap.innerHTML = ''; return; }
    const tamanhos = [...new Set(lista.map(i => _tamanhoDoParceiro(i, grupo)).filter(Boolean))];
    if (tamanhos.length < 2) { wrap.style.display = 'none'; return; }
    wrap.style.display = 'flex';
    wrap.innerHTML = `<button class="filtro-btn${_parceiroEstado.tamanho === 'todos' ? ' a' : ''}" onclick="setFiltroTamanhoParceiro(this,'todos')">Qualquer tamanho</button>` +
      tamanhos.map(t => `<button class="filtro-btn${_parceiroEstado.tamanho === t ? ' a' : ''}" onclick="setFiltroTamanhoParceiro(this,'${t}')">${t}</button>`).join('');
  }

  function renderParceirosNaSecao() {
    const grid = document.getElementById('parceirosGrid');
    if (!grid) return;
    const grupo = _parceiroEstado.grupo;
    let lista = _listaParceiroPorGrupo(grupo);

    renderFiltroTamanhoParceiro(grupo, lista);

    if (grupo !== 'tipos' && _parceiroEstado.tamanho !== 'todos') {
      lista = lista.filter(i => _tamanhoDoParceiro(i, grupo) === _parceiroEstado.tamanho);
    }
    if (_parceiroEstado.busca) {
      const t = _parceiroEstado.busca;
      lista = lista.filter(i => i.nome.toLowerCase().includes(t) || (i.descricao || '').toLowerCase().includes(t));
    }

    const countEl = document.getElementById('parceirosCount');
    if (countEl) {
      const rotulo = grupo === 'montarias' ? ' montarias' : grupo === 'bestiario' ? ' parceiros do bestiário' : ' tipos';
      countEl.textContent = lista.length + rotulo;
    }

    const notaEl = document.getElementById('parceirosNota');
    if (notaEl && window.PARCEIROS_REGRAS) {
      notaEl.textContent = grupo === 'montarias' ? window.PARCEIROS_REGRAS.montaria
        : grupo === 'bestiario' ? window.PARCEIROS_REGRAS.bestiario
        : window.PARCEIROS_REGRAS.resumo;
    }

    grid.innerHTML = '';
    if (!lista.length) {
      grid.innerHTML = grupo === 'bestiario'
        ? `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nenhuma criatura do Bestiário está marcada como parceiro ainda.</div>`
        : `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nenhum parceiro encontrado.</div>`;
      return;
    }
    lista.forEach(item => grid.appendChild(renderParceiroCard(item, grupo)));
  }

  window.setGrupoParceiro = (btn, grupo) => {
    _ativarFiltroBtn('#parceirosFiltroGrupo', btn);
    _parceiroEstado.grupo = grupo;
    _parceiroEstado.tamanho = 'todos';
    renderParceirosNaSecao();
  };

  window.setFiltroTamanhoParceiro = (btn, tamanho) => {
    _ativarFiltroBtn('#parceirosFiltroTamanho', btn);
    _parceiroEstado.tamanho = tamanho;
    renderParceirosNaSecao();
  };

  // Navegação cruzada: chamado a partir do painel de detalhe de uma
  // criatura do Bestiário (link "Também é um Parceiro") — troca de seção,
  // ativa o grupo certo e já abre o detalhe, tudo num só clique.
  window.irParaParceiro = (grupo, id) => {
    mostrarSecao('parceiros');
    const btn = document.querySelector(`#parceirosFiltroGrupo .filtro-btn[data-grupo="${grupo}"]`);
    if (btn) window.setGrupoParceiro(btn, grupo);
    abrirDetalheParceiro(grupo, id);
  };

  window.abrirDetalheParceiro = (grupo, id) => {
    const item = _listaParceiroPorGrupo(grupo).find(x => x.id === id);
    if (!item) return;
    const tamanho = _tamanhoDoParceiro(item, grupo);
    const niveis = grupo === 'bestiario' ? item.parceiro.niveis : item.niveis;

    document.getElementById('parceiroHeroIcon').className = `ti ${item.icone || 'ti-paw'} dp-hero-icon`;
    document.getElementById('parceiroTipo').innerHTML = grupo === 'montarias'
      ? '<i class="ti ti-horse" aria-hidden="true"></i> Montaria Nomeada'
      : grupo === 'bestiario'
        ? '<i class="ti ti-paw" aria-hidden="true"></i> Parceiro do Bestiário'
        : '<i class="ti ti-users" aria-hidden="true"></i> Tipo de Parceiro';
    document.getElementById('parceiroNome').textContent = item.nome;
    document.getElementById('parceiroSub').textContent = tamanho ? `Tamanho ${tamanho}` : '';

    const fichaBtn = grupo === 'bestiario' ? `
      <button class="btn-pdf" style="margin-top:10px" onclick="fecharDetalheParceiro(); abrirDetalheCriatura('${item.id}')">
        <i class="ti ti-book" aria-hidden="true"></i> Ver Ficha Completa no Bestiário
      </button>` : '';
    const fontePagina = grupo === 'bestiario'
      ? `Tormenta 20, p. ${item.pagina || '—'} (ficha completa no Bestiário)`
      : 'Tormenta 20, Cap. 6, pp. 260-262';

    document.getElementById('parceiroBody').innerHTML = `
      <p class="dp-desc">${processarKeywords(item.descricao || '')}</p>
      <div class="dp-secao">Bônus por Patamar</div>
      ${renderNiveisParceiro(niveis)}
      ${fichaBtn}
      <div class="dp-fonte-pagina">${fontePagina}</div>
    `;

    document.getElementById('parceiroPainel').classList.add('aberto');
    document.querySelectorAll('#secao-parceiros .cards-area').forEach(el => el.classList.add('encolhido'));
  };

  window.fecharDetalheParceiro = () => {
    _fecharPainelDetalhe(document.getElementById('parceiroPainel'), '#secao-parceiros .cards-area');
  };

  _ligarBusca('buscaParceiros', v => { _parceiroEstado.busca = v.toLowerCase(); renderParceirosNaSecao(); });

  // Mini-calculadora "Quantos Parceiros Posso Ter?" — usa
  // PARCEIRO_LIMITE_POR_NIVEL (patamar do PERSONAGEM, não do parceiro).
  window.calcularLimiteParceiros = () => {
    const el = document.getElementById('parceiroCalcNivel');
    const resEl = document.getElementById('parceiroCalcResultado');
    if (!el || !resEl || !window.PARCEIRO_LIMITE_POR_NIVEL) return;
    const nivel = Math.max(1, Math.min(20, parseInt(el.value, 10) || 1));
    el.value = nivel;
    const faixa = window.PARCEIRO_LIMITE_POR_NIVEL.find(f => nivel >= f.min && nivel <= f.max);
    if (!faixa) return;
    resEl.innerHTML = `Nível ${nivel} (patamar <strong>${faixa.patamar}</strong>): até <strong>${faixa.limite}</strong> parceiro${faixa.limite > 1 ? 's' : ''} simultâneo${faixa.limite > 1 ? 's' : ''}.`;
  };

  // ── CALCULADORA DE COMBATE ──────────────────────────────────────────
  // Fórmula do livro (Cap. 7, "Construindo Combates", p. 282):
  // ND < 1: ND do combate = ND da criatura × quantidade.
  // ND ≥ 1: ND do combate = ND da criatura + 2 a cada dobra da quantidade.
  let _combateGrupos = []; // { nome, ndValor, ndTexto, qtd }

  function ndCombateGrupo(ndValor, qtd) {
    if (qtd <= 1) return ndValor;
    if (ndValor < 1) return Math.round(ndValor * qtd * 100) / 100;
    const dobras = Math.floor(Math.log2(qtd));
    return ndValor + dobras * 2;
  }

  function formatarNd(valor) {
    if (valor === 0.25) return '¼';
    if (valor === 0.5) return '½';
    return String(Math.round(valor * 100) / 100);
  }

  // Busca de criatura para a calculadora: dropdown próprio (em vez de
  // <datalist>) porque o datalist nativo, em boa parte dos navegadores, só
  // sugere opções depois que o usuário digita algo — clicar num campo
  // vazio não abre a lista. Aqui o clique/foco já mostra todas as
  // criaturas (ordenadas por ND), e digitar filtra por nome.
  let _listaCalculadoraOrdenada = null;
  let _calcOpcaoSelecionadaId = null;

  function obterListaCalculadoraOrdenada() {
    if (!_listaCalculadoraOrdenada) {
      _listaCalculadoraOrdenada = [...(window.CRIATURAS || [])].sort((a, b) => a.ndValor - b.ndValor);
    }
    return _listaCalculadoraOrdenada;
  }

  function renderDropdownCalculadora(filtro) {
    const dd = document.getElementById('calcCombateDropdown');
    if (!dd) return;
    const termo = (filtro || '').trim().toLowerCase();
    const lista = obterListaCalculadoraOrdenada().filter(c => !termo || c.nome.toLowerCase().includes(termo));
    dd.innerHTML = lista.length
      ? lista.map(c => `<div class="calc-busca-opcao" onmousedown="selecionarOpcaoCalculadora('${c.id}')">
          <span>${c.nome}</span><span class="calc-busca-nd">ND ${c.nd}</span>
        </div>`).join('')
      : `<div class="calc-busca-vazio">Nenhuma criatura encontrada.</div>`;
    dd.classList.add('aberto');
  }

  // onmousedown (não onclick) porque o blur do input dispara antes do
  // click — sem isso, o dropdown some antes do clique na opção registrar.
  window.selecionarOpcaoCalculadora = (id) => {
    const c = obterListaCalculadoraOrdenada().find(x => x.id === id);
    if (!c) return;
    const inputEl = document.getElementById('calcCombateInput');
    if (inputEl) inputEl.value = c.nome;
    _calcOpcaoSelecionadaId = id;
    fecharDropdownCalculadora();
  };

  window.abrirDropdownCalculadora = () => {
    renderDropdownCalculadora(document.getElementById('calcCombateInput')?.value || '');
  };

  window.filtrarDropdownCalculadora = () => {
    _calcOpcaoSelecionadaId = null;
    renderDropdownCalculadora(document.getElementById('calcCombateInput')?.value || '');
  };

  window.fecharDropdownCalculadora = () => {
    document.getElementById('calcCombateDropdown')?.classList.remove('aberto');
  };

  window.adicionarGrupoCombate = () => {
    const inputEl = document.getElementById('calcCombateInput');
    const qtdEl = document.getElementById('calcCombateQtd');
    if (!inputEl || !inputEl.value.trim()) return;
    const texto = inputEl.value.trim().toLowerCase();
    const lista = obterListaCalculadoraOrdenada();
    // Prioriza a criatura escolhida no dropdown; se o usuário só digitou o
    // nome sem clicar numa opção, cai para o match exato por nome.
    let c = _calcOpcaoSelecionadaId ? lista.find(x => x.id === _calcOpcaoSelecionadaId) : null;
    if (!c) c = lista.find(x => x.nome.toLowerCase() === texto);
    if (!c) return;
    const qtd = Math.max(1, parseInt(qtdEl.value, 10) || 1);
    _combateGrupos.push({ id: c.id, nome: c.nome, ndValor: c.ndValor, ndTexto: c.nd, qtd });
    inputEl.value = '';
    _calcOpcaoSelecionadaId = null;
    fecharDropdownCalculadora();
    renderCalculadoraCombate();
  };

  window.removerGrupoCombate = (i) => {
    _combateGrupos.splice(i, 1);
    renderCalculadoraCombate();
  };

  // Resolve o objeto completo da criatura a partir de um grupo montado —
  // pelo id salvo (formato atual) ou, se faltar (combate salvo de uma
  // versão anterior sem id), por nome. Centraliza essa busca porque ela é
  // usada tanto pra abrir o painel de detalhe quanto pra ler o papel de
  // combate (solo/lacaio/especial) na hora de renderizar o card do grupo.
  function obterCriaturaDoGrupo(g) {
    let c = g.id ? (window.CRIATURAS || []).find(x => x.id === g.id) : null;
    if (!c) c = (window.CRIATURAS || []).find(x => x.nome === g.nome);
    return c || null;
  }

  // Clique no nome da criatura dentro de um grupo montado → abre o painel
  // lateral de detalhes (mesmo painel usado no Bestiário).
  window.abrirDetalheGrupoCombate = (i) => {
    const g = _combateGrupos[i];
    if (!g) return;
    const c = obterCriaturaDoGrupo(g);
    if (c) abrirDetalheCriatura(c.id);
  };

  // Edição de quantidade direto no card do grupo, sem precisar remover e
  // adicionar de novo. O re-render adia pro próximo tick (setTimeout 0):
  // disparar innerHTML no wrapper ainda durante o evento "change" do
  // próprio <input> (que dispara no blur) faz o navegador tentar remover
  // um nó que ainda está processando o evento, e quebra.
  window.atualizarQtdGrupoCombate = (i, valor) => {
    const g = _combateGrupos[i];
    if (!g) return;
    g.qtd = Math.max(1, parseInt(valor, 10) || 1);
    setTimeout(renderCalculadoraCombate, 0);
  };

  function renderCalculadoraCombate() {
    const wrap = document.getElementById('calcCombateGrupos');
    if (!wrap) return;
    if (!_combateGrupos.length) {
      wrap.innerHTML = '';
      renderResumoCombate();
      atualizarPainelHerois();
      return;
    }
    wrap.innerHTML = _combateGrupos.map((g, i) => {
      const ndCombate = ndCombateGrupo(g.ndValor, g.qtd);
      const c = obterCriaturaDoGrupo(g);
      const papel = c ? c.papel : null;
      return `<div class="calc-grupo-card${papel === 'solo' ? ' calc-grupo-solo' : ''}">
        ${papel ? `<span class="calc-grupo-tag calc-grupo-tag-${papel}"><i class="ti ${PAPEL_ICONE[papel] || 'ti-paw'}" aria-hidden="true"></i> ${PAPEL_LABEL[papel] || ''}</span>` : '<span class="calc-grupo-tag calc-grupo-tag-vazio"></span>'}
        <span class="calc-grupo-nome calc-nome-link" onclick="abrirDetalheGrupoCombate(${i})">${g.nome}</span>
        <label class="calc-grupo-qtd">Qtd
          <input type="number" min="1" value="${g.qtd}" onchange="atualizarQtdGrupoCombate(${i}, this.value)" />
        </label>
        <span class="calc-grupo-nd">ND ${g.ndTexto} cada → <strong>ND do grupo: ${formatarNd(ndCombate)}</strong></span>
        <button class="calc-x-btn" onclick="removerGrupoCombate(${i})" title="Remover grupo"><i class="ti ti-x" aria-hidden="true"></i></button>
      </div>`;
    }).join('');
    renderResumoCombate();
    atualizarPainelHerois();
  }

  // ── Resumo do combate montado ────────────────────────────────────────
  // ND do maior grupo, ND combinado (soma simples) e total de criaturas
  // aparecem numa barra horizontal logo abaixo da busca — só quando há
  // pelo menos um grupo montado (a classe "ativo" controla isso; sem ela
  // a barra fica com display:none, sem ocupar espaço vazio na tela).
  // Também avisa quando há 2+ criaturas "solo" no mesmo combate — o livro
  // pensa em "solo" como ameaça pra enfrentar sozinha, então juntar duas
  // foge bastante do ND sugerido (não é uma regra do livro, é só um
  // alerta de bom senso).
  function renderResumoCombate() {
    const el = document.getElementById('calcCombateResumo');
    if (!el) return;
    if (!_combateGrupos.length) {
      el.innerHTML = '';
      el.classList.remove('ativo');
      return;
    }

    const maior = Math.max(..._combateGrupos.map(g => ndCombateGrupo(g.ndValor, g.qtd)));
    const combinado = _combateGrupos.reduce((soma, g) => soma + ndCombateGrupo(g.ndValor, g.qtd), 0);
    const totalCriaturas = _combateGrupos.reduce((soma, g) => soma + g.qtd, 0);
    const totalGruposSolo = _combateGrupos.reduce((soma, g) => {
      const c = obterCriaturaDoGrupo(g);
      return soma + (c && c.papel === 'solo' ? 1 : 0);
    }, 0);

    el.innerHTML = `
      <div class="calc-resumo-linha-topo">
        <div class="calc-resumo-item-linha">
          <span class="calc-resumo-label">ND do maior grupo</span>
          <span class="calc-resumo-valor">${formatarNd(maior)}</span>
        </div>
        <div class="calc-resumo-item-linha">
          <span class="calc-resumo-label">ND combinado</span>
          <span class="calc-resumo-valor">${formatarNd(combinado)}</span>
        </div>
        <div class="calc-resumo-item-linha">
          <span class="calc-resumo-label">Criaturas no combate</span>
          <span class="calc-resumo-valor">${totalCriaturas}</span>
        </div>
      </div>
      ${totalGruposSolo >= 2 ? `<div class="calc-resumo-aviso"><i class="ti ti-alert-triangle" aria-hidden="true"></i> ${totalGruposSolo} criaturas "solo" nesse combate — o livro pensa em "solo" como ameaça pra enfrentar sozinha; juntar duas ou mais deixa o combate bem mais difícil que o ND sugere.</div>` : ''}
      <div class="calc-resumo-nota"><i class="ti ti-info-circle" aria-hidden="true"></i> O livro só define a fórmula pra grupos idênticos — misturando grupos diferentes, use o maior ND (${formatarNd(maior)}) como referência principal; o combinado é só soma simples, não é regra oficial.</div>
    `;
    el.classList.add('ativo');
  }

  // ── Comparar com o grupo de heróis ──────────────────────────────────
  // Usa a própria definição do livro: "uma criatura de ND X fornece um
  // combate equilibrado para personagens de nível X" (Cap.7, p.282), sempre
  // comparando com o MAIOR ND de grupo montado (não o ND combinado, que é
  // apenas uma soma de referência). O livro também pressupõe grupos de 4
  // personagens e não dá fórmula para outros tamanhos — quando o número de
  // heróis é diferente de 4, isso é avisado em texto, sem inventar fórmula.
  function renderComparacaoHerois() {
    const compEl = document.getElementById('calcCombateComparacao');
    if (!compEl) return;
    if (!_combateGrupos.length) { compEl.innerHTML = ''; return; }

    const qtdEl = document.getElementById('calcHeroisQtd');
    const nivelEl = document.getElementById('calcHeroisNivel');
    const qtdHerois = Math.max(1, parseInt(qtdEl?.value, 10) || 4);
    const nivelHerois = Math.max(1, parseInt(nivelEl?.value, 10) || 1);

    const maior = Math.max(..._combateGrupos.map(g => ndCombateGrupo(g.ndValor, g.qtd)));
    const combinado = _combateGrupos.reduce((soma, g) => soma + ndCombateGrupo(g.ndValor, g.qtd), 0);

    let classe, texto;
    if (maior < nivelHerois) {
      classe = 'calc-comp-facil';
      texto = `Abaixo do desafio justo — o livro define ND ${formatarNd(maior)} como equilibrado para personagens de nível ${formatarNd(maior)}, então para um grupo de nível ${nivelHerois} este combate tende a ser mais fácil que o padrão.`;
    } else if (maior === nivelHerois) {
      classe = 'calc-comp-justo';
      texto = `Desafio justo — o livro define ND ${formatarNd(maior)} como um combate equilibrado para personagens de nível ${nivelHerois}.`;
    } else {
      classe = 'calc-comp-dificil';
      texto = `Acima do desafio justo — o livro define ND ${formatarNd(maior)} como equilibrado para nível ${formatarNd(maior)}, então para um grupo de nível ${nivelHerois} este combate tende a ser mais difícil que o padrão.`;
    }

    let notaGrupo = '';
    if (qtdHerois !== 4) {
      notaGrupo = ` O livro pressupõe grupos de 4 personagens; com ${qtdHerois} herói${qtdHerois !== 1 ? 's' : ''}, ajuste essa expectativa — grupos menores devem enfrentar ND mais baixo, maiores podem enfrentar ND mais alto (o livro não dá uma fórmula exata para esse ajuste).`;
    }

    compEl.innerHTML = `<div class="calc-comparacao-box ${classe}">
      <div class="calc-comparacao-nds">ND do maior grupo: <strong>${formatarNd(maior)}</strong> · ND combinado: <strong>${formatarNd(combinado)}</strong> · Nível do grupo: <strong>${nivelHerois}</strong> (${qtdHerois} herói${qtdHerois !== 1 ? 's' : ''})</div>
      <div class="calc-comparacao-texto">${texto}${notaGrupo}</div>
    </div>`;
  }
  window.renderComparacaoHerois = renderComparacaoHerois;

  // ── Sugestões de criaturas para o nível do grupo ────────────────────
  // Filtra o próprio Bestiário pela mesma regra do livro usada acima
  // (ND == nível dos heróis é "desafio justo"): nada de fórmula nova, só
  // aproximação por ND. Criaturas já adicionadas ao combate não repetem
  // na lista de sugestões. Poucas sugestões por faixa (até 2), não uma
  // lista extensa.
  function sugerirCriaturasParaGrupo(nivelHerois) {
    const lista = window.CRIATURAS || [];
    const jaNoCombate = new Set(_combateGrupos.map(g => g.nome));
    const candidatas = lista.filter(c => !jaNoCombate.has(c.nome));

    const justo = candidatas.filter(c => c.ndValor === nivelHerois);
    const facil = candidatas.filter(c => c.ndValor < nivelHerois).sort((a, b) => b.ndValor - a.ndValor);
    const dificil = candidatas.filter(c => c.ndValor > nivelHerois).sort((a, b) => a.ndValor - b.ndValor);

    const sugestoes = [];
    justo.slice(0, 2).forEach(c => sugestoes.push({ c, tag: 'justo' }));
    facil.slice(0, 2).forEach(c => sugestoes.push({ c, tag: 'facil' }));
    dificil.slice(0, 2).forEach(c => sugestoes.push({ c, tag: 'dificil' }));
    return sugestoes;
  }

  const SUGESTAO_TAG_LABEL = { facil: 'Fácil', justo: 'Desafio justo', dificil: 'Difícil' };
  const SUGESTAO_TAG_CLASSE = { facil: 'calc-comp-facil', justo: 'calc-comp-justo', dificil: 'calc-comp-dificil' };

  function renderSugestoesCriaturas() {
    const wrap = document.getElementById('calcCombateSugestoes');
    if (!wrap) return;
    const nivelEl = document.getElementById('calcHeroisNivel');
    const nivelHerois = Math.max(1, parseInt(nivelEl?.value, 10) || 1);
    const sugestoes = sugerirCriaturasParaGrupo(nivelHerois);

    if (!sugestoes.length) {
      wrap.innerHTML = `<div class="calc-combate-header"><span><i class="ti ti-bulb" aria-hidden="true"></i> Sugestões de criaturas</span></div>
        <p class="calc-combate-nota">Nenhuma criatura do Bestiário sobrou para sugerir nesse nível (ou todas já estão no combate).</p>`;
      return;
    }

    wrap.innerHTML = `
      <div class="calc-combate-header"><span><i class="ti ti-bulb" aria-hidden="true"></i> Sugestões de criaturas para nível ${nivelHerois}</span></div>
      <p class="calc-combate-nota">Baseadas na mesma regra do livro usada acima (ND ${nivelHerois} = desafio justo para personagens de nível ${nivelHerois}), pressupondo grupo de 4 personagens — ajuste pelo bom senso se o seu grupo for diferente.</p>
      <div class="calc-sugestoes-grid">
        ${sugestoes.map(({ c, tag }) => `
          <div class="calc-sugestao-card ${SUGESTAO_TAG_CLASSE[tag]}">
            <span class="calc-sugestao-selo">${SUGESTAO_TAG_LABEL[tag]}</span>
            <div class="calc-sugestao-nome calc-nome-link" onclick="abrirDetalheCriatura('${c.id}')">${c.nome}</div>
            <div class="calc-sugestao-info">ND ${c.nd} · ${PAPEL_LABEL[c.papel] || ''}</div>
            <button class="calc-btn-acao" onclick="adicionarSugestaoCombate('${c.id}')"><i class="ti ti-plus" aria-hidden="true"></i> Adicionar</button>
          </div>`).join('')}
      </div>`;
  }
  window.renderSugestoesCriaturas = renderSugestoesCriaturas;

  window.adicionarSugestaoCombate = (id) => {
    const c = (window.CRIATURAS || []).find(x => x.id === id);
    if (!c) return;
    _combateGrupos.push({ id: c.id, nome: c.nome, ndValor: c.ndValor, ndTexto: c.nd, qtd: 1 });
    renderCalculadoraCombate();
  };

  function atualizarPainelHerois() {
    renderComparacaoHerois();
    renderSugestoesCriaturas();
  }
  window.atualizarPainelHerois = atualizarPainelHerois;

  // ── Salvar / carregar / limpar o combate montado (localStorage) ─────
  const LS_COMBATE = 't20-compendio-combate-salvo';

  function atualizarInfoSalvo(isoData) {
    const info = document.getElementById('calcCombateSalvoInfo');
    if (!info) return;
    if (!isoData) { info.textContent = ''; return; }
    const d = new Date(isoData);
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    info.textContent = `Salvo às ${hh}:${mm}`;
  }

  window.salvarCombateCalculadora = () => {
    const heroisQtd = document.getElementById('calcHeroisQtd')?.value || 4;
    const heroisNivel = document.getElementById('calcHeroisNivel')?.value || 1;
    const dados = { grupos: _combateGrupos, heroisQtd, heroisNivel, salvoEm: new Date().toISOString() };
    try {
      localStorage.setItem(LS_COMBATE, JSON.stringify(dados));
      atualizarInfoSalvo(dados.salvoEm);
    } catch (e) {
      const info = document.getElementById('calcCombateSalvoInfo');
      if (info) info.textContent = 'Não foi possível salvar (armazenamento local indisponível).';
    }
  };

  window.limparCombateCalculadora = () => {
    _combateGrupos = [];
    try { localStorage.removeItem(LS_COMBATE); } catch (e) { /* ignora */ }
    renderCalculadoraCombate();
    atualizarInfoSalvo(null);
  };

  function carregarCombateSalvo() {
    try {
      const bruto = localStorage.getItem(LS_COMBATE);
      if (!bruto) return;
      const dados = JSON.parse(bruto);
      if (Array.isArray(dados.grupos)) _combateGrupos = dados.grupos;
      const qtdEl = document.getElementById('calcHeroisQtd');
      const nivelEl = document.getElementById('calcHeroisNivel');
      if (qtdEl && dados.heroisQtd) qtdEl.value = dados.heroisQtd;
      if (nivelEl && dados.heroisNivel) nivelEl.value = dados.heroisNivel;
      renderCalculadoraCombate();
      atualizarInfoSalvo(dados.salvoEm);
    } catch (e) { /* dados salvos corrompidos — ignora e mantém calculadora vazia */ }
  }

  // ── PERIGOS (Perigos Simples + Perigos Complexos, Cap. 7, p. 317-321) ──
  const PERIGO_CATEGORIA_LABEL = { ambiental: 'Ambiental', armadilha: 'Armadilha', doenca: 'Doença' };
  const PERIGO_CATEGORIA_ICONE = { ambiental: 'ti-cloud-storm', armadilha: 'ti-bomb', doenca: 'ti-virus' };

  function textoBuscavelPerigo(p) {
    if (p._buscaCache) return p._buscaCache;
    const partes = [p.nome, PERIGO_CATEGORIA_LABEL[p.categoria], p.descricao, p.dano, p.resistencia, p.transmissao, ...(p.progressao || []), ...extrairCondicoesPerigo(p)];
    p._buscaCache = partes.filter(Boolean).join(' | ').toLowerCase();
    return p._buscaCache;
  }

  // Detecta, sem inventar nada, quais Condições oficiais (apêndice, cf.
  // KEYWORDS_T20.cond em keywords.js) aparecem num texto — usado tanto pra
  // busca livre quanto pro filtro dedicado "Condição". Compartilhado entre
  // Perigos Simples e Perigos Complexos (mesmo padrão de detecção pros dois),
  // pra manter os dados padronizados conforme o site cresce.
  function extrairCondicoesDeTexto(texto) {
    const lista = (typeof KEYWORDS_T20 !== 'undefined' && KEYWORDS_T20.cond) ? KEYWORDS_T20.cond : [];
    const encontradas = new Set();
    lista.forEach(item => {
      const padroes = Array.isArray(item.padroes) ? item.padroes : [item.padroes];
      const achou = padroes.some(pad => new RegExp(`(?<=[\\s,;:.!?()"'\\-]|^)${pad.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=[\\s,;:.!?()"'\\-]|$)`, 'i').test(texto));
      if (achou) encontradas.add(padroes[0]);
    });
    return Array.from(encontradas);
  }

  function extrairCondicoesPerigo(p) {
    if (p._condicoesCache) return p._condicoesCache;
    const texto = [p.descricao, p.dano, p.resistencia, ...(p.progressao || [])].filter(Boolean).join(' ');
    p._condicoesCache = extrairCondicoesDeTexto(texto);
    return p._condicoesCache;
  }

  function extrairCondicoesPerigoComplexo(pc) {
    if (pc._condicoesCache) return pc._condicoesCache;
    const texto = [pc.objetivo, pc.efeito, pc.notas, ...(pc.acoes || []).map(a => a.texto || '')].filter(Boolean).join(' ');
    pc._condicoesCache = extrairCondicoesDeTexto(texto);
    return pc._condicoesCache;
  }

  let _filtroPerigoCategoria = 'todos';
  let _filtroPerigoCondicao = 'todas';
  let _buscaPerigos = '';

  window.setFiltroPerigo = (el, valor) => {
    _ativarFiltroBtn('#perigosFiltroCategoria', el);
    _filtroPerigoCategoria = valor;
    renderPerigosNaSecao();
  };

  window.setFiltroCondicaoPerigo = (valor) => {
    _filtroPerigoCondicao = valor;
    renderPerigosNaSecao();
  };

  function preencherFiltroCondicoesPerigo() {
    const selectEl = document.getElementById('perigosFiltroCondicao');
    if (!selectEl || selectEl.dataset.preenchido) return;
    const condsSet = new Set();
    (window.PERIGOS_SIMPLES || []).forEach(p => extrairCondicoesPerigo(p).forEach(c => condsSet.add(c)));
    const condsOrdenadas = Array.from(condsSet).sort((a, b) => a.localeCompare(b, 'pt-BR'));
    selectEl.innerHTML = `<option value="todas">Filtrar por condição…</option>` +
      condsOrdenadas.map(c => `<option value="${c}">${c}</option>`).join('');
    selectEl.dataset.preenchido = '1';
  }

  // ── "Usado na mesa" — marcador puramente local (não afeta o livro nem
  // nenhuma regra), pra ajudar o mestre a não repetir armadilha/perigo numa
  // campanha longa. Guardado por tipo+id em localStorage. ──
  const LS_PERIGOS_USADOS = 't20-perigos-usados';
  function carregarPerigosUsados() {
    try { return new Set(JSON.parse(localStorage.getItem(LS_PERIGOS_USADOS) || '[]')); }
    catch (e) { return new Set(); }
  }
  function salvarPerigosUsados() {
    try { localStorage.setItem(LS_PERIGOS_USADOS, JSON.stringify([..._perigosUsados])); } catch (e) { /* ignora */ }
  }
  let _perigosUsados = carregarPerigosUsados();
  function chaveUsadoPerigo(tipo, id) { return `${tipo}:${id}`; }
  function perigoEstaUsado(tipo, id) { return _perigosUsados.has(chaveUsadoPerigo(tipo, id)); }

  window.toggleUsadoPerigo = (tipo, id, evt) => {
    if (evt) evt.stopPropagation();
    const chave = chaveUsadoPerigo(tipo, id);
    if (_perigosUsados.has(chave)) _perigosUsados.delete(chave); else _perigosUsados.add(chave);
    salvarPerigosUsados();
    if (window.PERIGOS_SIMPLES) renderPerigosNaSecao();
    if (window.PERIGOS_COMPLEXOS) renderPerigosComplexosNaSecao();
    if (document.getElementById('perigosVisaoGrid')) renderPerigosVisaoGeral();
    // Se o painel de detalhe do item alternado estiver aberto, atualiza o botão nele também.
    const usadoAgora = perigoEstaUsado(tipo, id);
    const btnDetalhe = document.getElementById(tipo === 'complexo' ? 'pgcUsadoBtn' : 'pgUsadoBtn');
    if (btnDetalhe && btnDetalhe.dataset.id === id) {
      btnDetalhe.classList.toggle('a', usadoAgora);
      btnDetalhe.innerHTML = `<i class="ti ${usadoAgora ? 'ti-check' : 'ti-circle'}" aria-hidden="true"></i> ${usadoAgora ? 'Usado nesta campanha' : 'Marcar como usado'}`;
    }
  };

  function botaoUsadoCard(tipo, id) {
    const usado = perigoEstaUsado(tipo, id);
    return `<button class="perigo-usado-btn${usado ? ' a' : ''}" onclick="toggleUsadoPerigo('${tipo}','${id}', event)" title="${usado ? 'Marcado como usado' : 'Marcar como usado'}">
      <i class="ti ${usado ? 'ti-check' : 'ti-circle'}" aria-hidden="true"></i>
    </button>`;
  }

  function renderPerigoCard(p) {
    const card = document.createElement('div');
    const usado = perigoEstaUsado('simples', p.id);
    card.className = 'eq-card perigo-card' + (usado ? ' usado' : '');
    card.dataset.id = p.id;
    const tagPrincipal = p.nd ? `<span class="eq-categoria-tag cr-nd-tag">ND ${p.nd}</span>`
      : (p.cd ? `<span class="eq-categoria-tag cr-nd-tag">CD ${p.cd}</span>` : '<span class="eq-categoria-tag cr-nd-tag">—</span>');
    card.innerHTML = `
      <div class="eq-card-top">
        ${tagPrincipal}
        <div class="eq-card-top-right">
          <span class="eq-preco-tag"><i class="ti ${PERIGO_CATEGORIA_ICONE[p.categoria] || 'ti-alert-triangle'}" aria-hidden="true"></i> ${PERIGO_CATEGORIA_LABEL[p.categoria] || ''}</span>
          ${botaoUsadoCard('simples', p.id)}
        </div>
      </div>
      <div class="eq-nome">${p.nome}</div>
      <div class="eq-footer">
        <span class="rc-badge badge-fonte">Tormenta 20</span>
      </div>`;
    card.addEventListener('click', () => abrirDetalhePerigo(p.id));
    return card;
  }

  function renderPerigosNaSecao() {
    const grid = document.getElementById('perigosGrid');
    if (!grid) return;
    let lista = window.PERIGOS_SIMPLES || [];
    if (_filtroPerigoCategoria !== 'todos') lista = lista.filter(p => p.categoria === _filtroPerigoCategoria);
    if (_filtroPerigoCondicao !== 'todas') lista = lista.filter(p => extrairCondicoesPerigo(p).includes(_filtroPerigoCondicao));
    if (_buscaPerigos) lista = lista.filter(p => textoBuscavelPerigo(p).includes(_buscaPerigos));
    const countEl = document.getElementById('perigosCount');
    if (countEl) countEl.textContent = lista.length + (lista.length !== 1 ? ' perigos' : ' perigo');
    grid.innerHTML = '';
    if (!lista.length) {
      grid.innerHTML = `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nenhum perigo encontrado.</div>`;
      return;
    }
    lista.forEach(p => grid.appendChild(renderPerigoCard(p)));
  }

  // ── CONDIÇÕES (Apêndice, pp. 394-395) ───────────────────────
  // Página própria pras 35 condições oficiais. Não têm painel de detalhe
  // grande dedicado — reaproveita o miniPainel compartilhado (mesmo usado
  // por Perícia/Poder Geral/Poder de Classe), então um clique num card
  // aqui usa o mesmo abrirBlocoReferencia() que já cobre as menções em
  // texto (KEYWORDS_T20.cond, ver keywords.js).
  const CONDICAO_CATEGORIA_LABEL = {
    medo: 'Medo', mental: 'Mental', movimento: 'Movimento', sentidos: 'Sentidos',
    metabolismo: 'Metabolismo', veneno: 'Veneno', cansaco: 'Cansaço',
    metamorfose: 'Metamorfose', geral: 'Geral',
  };
  const CONDICAO_CATEGORIA_ICONE = {
    medo: 'ti-mood-crazy-happy', mental: 'ti-brain', movimento: 'ti-walk',
    sentidos: 'ti-eye-off', metabolismo: 'ti-heartbeat', veneno: 'ti-flask',
    cansaco: 'ti-battery-1', metamorfose: 'ti-transform', geral: 'ti-alert-octagon',
  };

  function textoBuscavelCondicao(c) {
    if (c._buscaCache) return c._buscaCache;
    const partes = [c.nome, CONDICAO_CATEGORIA_LABEL[c.categoria], c.descricao];
    c._buscaCache = partes.filter(Boolean).join(' | ').toLowerCase();
    return c._buscaCache;
  }

  let _filtroCondicaoCategoria = 'todos';
  let _buscaCondicoes = '';

  window.setFiltroCondicao = (el, valor) => {
    _ativarFiltroBtn('#condicoesFiltro', el);
    _filtroCondicaoCategoria = valor;
    renderCondicoesNaSecao();
  };

  function renderCondicaoCard(c) {
    const card = document.createElement('div');
    card.className = 'eq-card';
    card.dataset.id = c.id;
    card.innerHTML = `
      <div class="eq-card-top">
        <span class="eq-categoria-tag"><i class="ti ${CONDICAO_CATEGORIA_ICONE[c.categoria] || 'ti-alert-octagon'}" aria-hidden="true"></i> ${CONDICAO_CATEGORIA_LABEL[c.categoria] || 'Geral'}</span>
      </div>
      <div class="eq-nome">${c.nome}</div>
      <p class="dp-desc" style="font-size:12.5px;margin:4px 0 0;">${c.descricao}</p>
      <div class="eq-footer">
        <span class="rc-badge badge-fonte">Tormenta 20</span>
      </div>`;
    card.addEventListener('click', (e) => {
      // stopPropagation é obrigatório aqui: o miniPainel tem um listener
      // global no document que fecha ele quando o clique não aconteceu
      // dentro dele (ver "Clicar FORA do mini-painel fecha ele" perto do
      // fim do arquivo) — sem isso, o clique no card abre e o mesmo evento,
      // ao borbulhar até o document, fecha de novo na mesma interação.
      e.stopPropagation();
      window.abrirBlocoReferencia('condicao', c.nome);
    });
    return card;
  }

  function renderCondicoesNaSecao() {
    const grid = document.getElementById('condicoesGrid');
    if (!grid) return;
    let lista = window.CONDICOES || [];
    if (_filtroCondicaoCategoria !== 'todos') lista = lista.filter(c => c.categoria === _filtroCondicaoCategoria);
    if (_buscaCondicoes) lista = lista.filter(c => textoBuscavelCondicao(c).includes(_buscaCondicoes));
    const countEl = document.getElementById('condicoesCount');
    if (countEl) countEl.textContent = lista.length + (lista.length !== 1 ? ' condições' : ' condição');
    grid.innerHTML = '';
    if (!lista.length) {
      grid.innerHTML = `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nenhuma condição encontrada.</div>`;
      return;
    }
    lista.forEach(c => grid.appendChild(renderCondicaoCard(c)));
  }

  // Corpo do mini-painel pra uma Condição — mesmo template compacto usado
  // por renderPericiaMiniHtml, adaptado ao schema mais simples de Condição
  // (sem "usos", só categoria + descrição).
  function renderCondicaoMiniHtml(c) {
    const kw = typeof processarKeywords === 'function' ? processarKeywords : (t) => t;
    return `
      <div class="dp-badges">
        <span class="dp-badge">${CONDICAO_CATEGORIA_LABEL[c.categoria] || 'Geral'}</span>
      </div>
      <p class="dp-desc">${kw(c.descricao)}</p>
    `;
  }

  // ── TOQUES FINAIS (Cap. 1, pp. 106-111) ─────────────────────
  // Página de referência pura (sem busca/filtro — não é uma lista de
  // itens, são regras e tabelas fixas), com duas ferramentas
  // interativas: roletor de idade inicial e calculadora de recuperação
  // de PV/PM. Pensada como base pra quando a ficha de personagem
  // (ficha.html) existir de verdade — os mesmos dados (RECUPERACAO_
  // DESCANSO, TAMANHOS, IDADE_INICIAL_GRUPOS, ENVELHECIMENTO,
  // ALINHAMENTOS) servem tanto pra essa página de consulta quanto pra
  // uma futura calculadora de ficha, sem duplicar nada.

  // Rolagem de dados genérica — reaproveitável por qualquer ferramenta
  // futura que precise de NdM (idade inicial é o primeiro caso; sorteio
  // de perigo e calculadora de combate ainda usam Math.random() cru
  // porque vieram antes dessa função existir).
  function _rolarNdM(n, m) {
    let total = 0;
    const rolagens = [];
    for (let i = 0; i < n; i++) {
      const r = 1 + Math.floor(Math.random() * m);
      rolagens.push(r);
      total += r;
    }
    return { rolagens, total };
  }

  // Seleção única visual (card em vez de botão de filtro) — mesmo
  // princípio do `_ativarFiltroBtn` (remove `.selecionado` de todo mundo
  // no grupo, adiciona só no clicado), mas genérico o bastante pra
  // qualquer card marcado com `.tf-selecionavel`, já que aqui o card tem
  // conteúdo grande (título + descrição), não cabe na classe `.filtro-btn`
  // (que é fixa em 30px de altura). Pensado pra crescer: outras opções
  // "de configuração do mestre" que essa página ganhar no futuro (regras
  // de suplementos, variantes de mesa) podem reaproveitar o mesmo padrão.
  function _selecionarCardUnico(grupoSelector, cardEl) {
    document.querySelectorAll(`${grupoSelector} .tf-selecionavel`).forEach(c => c.classList.remove('selecionado'));
    cardEl?.classList.add('selecionado');
  }

  // Condição de descanso selecionada na Calculadora de Recuperação —
  // 'normal' por padrão. Vive junto de Características Derivadas (union
  // pedida pelo usuário: selecionar o card já recalcula, sem precisar de
  // um <select> e um botão "Calcular" separados).
  let _tfCondicaoSelecionada = 'normal';
  // Alinhamento marcado no card (recurso visual, nada persistido ainda —
  // quando a ficha de personagem existir, esse é o gancho natural).
  let _tfAlinhamentoSelecionado = null;
  // Classe marcada no Roletor de Idade Inicial — primeira classe do
  // primeiro grupo por padrão (equivalente ao <select> antigo, que
  // sempre vinha com a 1ª opção já selecionada).
  let _tfClasseIdadeSelecionada = null;

  window.selecionarCondicaoRecuperacao = function(el, condId) {
    _tfCondicaoSelecionada = condId;
    _selecionarCardUnico('#tfRecuperacaoGrid', el);
    calcularRecuperacaoPvPm();
  };

  window.selecionarAlinhamento = function(el, alinId) {
    _tfAlinhamentoSelecionado = alinId;
    _selecionarCardUnico('#tfAlinhamentoGrid', el);
  };

  window.selecionarClasseIdade = function(el, classeId) {
    _tfClasseIdadeSelecionada = classeId;
    _selecionarCardUnico('#tfIdadeClasseGrupos', el);
  };

  function renderToquesFinais() {
    // Recuperação de PV/PM por condição de descanso — cards selecionáveis
    // (só um ativo por vez), a seleção já dispara o recálculo abaixo.
    const recGrid = document.getElementById('tfRecuperacaoGrid');
    if (recGrid && window.RECUPERACAO_DESCANSO) {
      recGrid.innerHTML = window.RECUPERACAO_DESCANSO.map(r => `
        <div class="tf-mini-card tf-selecionavel${r.id === _tfCondicaoSelecionada ? ' selecionado' : ''}"
             onclick="selecionarCondicaoRecuperacao(this, '${r.id}')">
          <div class="tf-mini-titulo">${r.nome}</div>
          <div class="tf-mini-valor">${r.formula}</div>
          <div class="tf-mini-desc">${r.descricao}</div>
        </div>`).join('');
    }

    // Tabela de Tamanho
    const tamNota = document.getElementById('tfTamanhoNota');
    if (tamNota && window.TAMANHO_NOTA) tamNota.textContent = window.TAMANHO_NOTA;
    const tamTabela = document.getElementById('tfTamanhoTabela');
    if (tamTabela && window.TAMANHOS) {
      tamTabela.innerHTML = `
        <thead><tr><th>Categoria</th><th>Exemplos</th><th>Espaço/Alcance</th><th>Furtividade/Manobras</th></tr></thead>
        <tbody>${window.TAMANHOS.map(t => `
          <tr>
            <td>${t.categoria}</td>
            <td>${t.exemplos}</td>
            <td>${t.espaco}</td>
            <td>${t.modFurtividade >= 0 ? '+' : ''}${t.modFurtividade}/${t.modManobras >= 0 ? '+' : ''}${t.modManobras}</td>
          </tr>`).join('')}</tbody>
      `;
    }

    // Mini-cards de classe pro roletor de idade, um grupo por fórmula de
    // dado (substituiu um <select> — ver comentário em
    // window.selecionarClasseIdade). Primeira classe do primeiro grupo
    // fica pré-selecionada, igual o <select> nativo sempre vinha com a
    // 1ª opção marcada.
    const gruposEl = document.getElementById('tfIdadeClasseGrupos');
    if (gruposEl && window.IDADE_INICIAL_GRUPOS && window.CLASSES) {
      if (!_tfClasseIdadeSelecionada) _tfClasseIdadeSelecionada = window.IDADE_INICIAL_GRUPOS[0]?.classes[0] || null;
      gruposEl.innerHTML = window.IDADE_INICIAL_GRUPOS.map(g => `
        <div class="tf-idade-grupo">
          <div class="tf-idade-grupo-label"><strong>${g.dado}</strong> — ${g.faixa}</div>
          <div class="tf-classe-grid">
            ${g.classes.map(id => {
              const c = window.CLASSES.find(x => x.id === id);
              const ativo = id === _tfClasseIdadeSelecionada;
              return `
              <div class="tf-classe-card tf-selecionavel${ativo ? ' selecionado' : ''}" onclick="selecionarClasseIdade(this, '${id}')">
                <i class="ti ${c && c.icone ? c.icone : 'ti-user'}" aria-hidden="true"></i>
                <span>${c ? c.nome : id}</span>
              </div>`;
            }).join('')}
          </div>
        </div>`).join('');
    }

    // Envelhecimento — 3 cards (Maduro/Velho/Ancião). Ancião não é
    // categoria oficial separada do livro (ver comentário em
    // window.ENVELHECIMENTO, toques_finais.js) — sinalizada com um selo
    // discreto "casa" pra não passar como regra do livro.
    const envGrid = document.getElementById('tfEnvelhecimentoGrid');
    if (envGrid && window.ENVELHECIMENTO) {
      const fmtMod = (m) => `For ${m.for >= 0 ? '+' : ''}${m.for}, Des ${m.des >= 0 ? '+' : ''}${m.des}, Con ${m.con >= 0 ? '+' : ''}${m.con}, Int ${m.int >= 0 ? '+' : ''}${m.int}, Sab ${m.sab >= 0 ? '+' : ''}${m.sab}, Car ${m.car >= 0 ? '+' : ''}${m.car}`;
      envGrid.innerHTML = window.ENVELHECIMENTO.map(e => `
        <div class="tf-mini-card">
          <div class="tf-mini-titulo">${e.categoria} (${e.idade})${e.oficial === false ? ' <span class="tf-casa-selo" title="Reorganização do site, não é uma categoria separada no livro">casa</span>' : ''}</div>
          <div class="tf-mini-desc">${fmtMod(e.mod)}</div>
          ${e.nota ? `<div class="tf-mini-desc" style="margin-top:4px;color:#666;font-style:italic;">${e.nota}</div>` : ''}
        </div>`).join('');
    }
    const longEl = document.getElementById('tfLongevidadeFormula');
    if (longEl && window.LONGEVIDADE_MAXIMA_FORMULA) longEl.textContent = window.LONGEVIDADE_MAXIMA_FORMULA;

    // Grid de Alinhamentos — cards selecionáveis (só um ativo por vez),
    // recurso puramente visual por enquanto (nada persiste, ver
    // _tfAlinhamentoSelecionado acima).
    const alinGrid = document.getElementById('tfAlinhamentoGrid');
    if (alinGrid && window.ALINHAMENTOS) {
      alinGrid.innerHTML = window.ALINHAMENTOS.map(a => {
        const corClasse = a.etico === 'bondade' ? 'tf-bom' : (a.etico === 'maldade' ? 'tf-mau' : 'tf-neutro');
        const ativo = a.id === _tfAlinhamentoSelecionado;
        return `
        <div class="tf-alinhamento-card tf-selecionavel ${corClasse}${ativo ? ' selecionado' : ''}"
             onclick="selecionarAlinhamento(this, '${a.id}')">
          <span class="tf-alin-sigla">${a.id}</span>
          <div class="tf-alin-nome">${a.nome}</div>
          <p class="tf-alin-desc">${a.descricao}</p>
          <p class="tf-alin-exemplo">${a.exemploPao}</p>
        </div>`;
      }).join('');
    }

    // Resultado inicial da calculadora de recuperação, já com a condição
    // padrão ('normal') selecionada acima.
    calcularRecuperacaoPvPm();
  }

  // Roletor de Idade Inicial — rola a fórmula de dado do grupo da classe
  // marcada no mini-card e mostra o resultado (idade final = total dos
  // dados + 15, igual à regra do livro).
  window.rolarIdadeInicial = function() {
    const resultEl = document.getElementById('tfIdadeResultado');
    if (!resultEl || !window.IDADE_INICIAL_GRUPOS) return;
    const classeId = _tfClasseIdadeSelecionada;
    if (!classeId) { resultEl.innerHTML = `<div class="tf-resultado-box">Escolha uma classe primeiro.</div>`; return; }
    const grupo = window.IDADE_INICIAL_GRUPOS.find(g => g.classes.includes(classeId));
    if (!grupo) return;
    const m = grupo.dado.match(/^(\d+)d(\d+)\+(\d+)$/);
    if (!m) return;
    const [, nStr, ladoStr, bonusStr] = m;
    const { rolagens, total } = _rolarNdM(Number(nStr), Number(ladoStr));
    const idadeFinal = total + Number(bonusStr);
    const classeInfo = (window.CLASSES || []).find(c => c.id === classeId);
    resultEl.innerHTML = `
      <div class="tf-resultado-box">
        <strong>${classeInfo ? classeInfo.nome : classeId}</strong> — ${grupo.dado} → rolou [${rolagens.join(', ')}] + 15 =
        <strong>${idadeFinal} anos</strong> <span style="color:#777">(faixa esperada: ${grupo.faixa})</span>
      </div>`;
  };

  // Calculadora de Recuperação de PV/PM — soma a recuperação da condição
  // de descanso selecionada (card logo abaixo) ao PV/PM atual, sem nunca
  // ultrapassar o máximo. Reativa: roda tanto ao trocar o card de condição
  // quanto ao digitar em qualquer um dos campos. Escreve direto nas
  // caixas "Recuperado"/"Final" de PV e PM (`.tf-recup-valor`, mesma
  // aparência de um <input>, só que são <div> — o rótulo já em cima
  // ("PV final"/"PM final") diz o que é, então aqui só o número).
  window.calcularRecuperacaoPvPm = function() {
    const pvSomaEl = document.getElementById('tfPvSoma');
    if (!pvSomaEl || !window.RECUPERACAO_DESCANSO) return;
    const nivel = Number(document.getElementById('tfCalcNivel').value) || 0;
    const pvMax = Number(document.getElementById('tfCalcPvMax').value) || 0;
    const pvAtual = Number(document.getElementById('tfCalcPvAtual').value) || 0;
    const pmMax = Number(document.getElementById('tfCalcPmMax').value) || 0;
    const pmAtual = Number(document.getElementById('tfCalcPmAtual').value) || 0;
    const cond = window.RECUPERACAO_DESCANSO.find(r => r.id === _tfCondicaoSelecionada);
    if (!cond) return;
    const recuperado = Math.floor(nivel * cond.multiplicador);
    const pvNovo = Math.min(pvMax, pvAtual + recuperado);
    const pmNovo = Math.min(pmMax, pmAtual + recuperado);

    pvSomaEl.textContent = `+${recuperado}`;
    const pvFinalEl = document.getElementById('tfPvFinal');
    pvFinalEl.textContent = pvNovo;
    pvFinalEl.title = `Máximo: ${pvMax} PV`;
    document.getElementById('tfPmSoma').textContent = `+${recuperado}`;
    const pmFinalEl = document.getElementById('tfPmFinal');
    pmFinalEl.textContent = pmNovo;
    pmFinalEl.title = `Máximo: ${pmMax} PM`;
  };

  // ── ATRIBUTOS BÁSICOS — Compra de Atributos (Tabela 1-1, p.17) +
  // modificadores raciais (Tabela 1-2, p.18, via `atributosCalc` de cada
  // raça em racas.js). Página nova (23/ago), separada de Toques Finais
  // por ser "um recurso muito utilizado e bastante importante" (palavras
  // do usuário) — por isso persiste em localStorage, ao contrário do
  // resto de Toques Finais (que ainda é só em memória, ver Backlog 0).
  const LS_ATRIBUTOS = 't20-atributos-basicos';

  function carregarConfigAtributos() {
    const base = { valores: {}, bonus: {}, racaId: '', varianteId: null, escolhaLivre: [], permitirExcecao: false };
    try {
      const salvo = JSON.parse(localStorage.getItem(LS_ATRIBUTOS) || 'null');
      if (salvo && typeof salvo === 'object') return { ...base, ...salvo };
    } catch (e) { /* ignora, usa o padrão */ }
    return base;
  }
  function salvarConfigAtributos() {
    try {
      localStorage.setItem(LS_ATRIBUTOS, JSON.stringify({
        valores: _atribValores, bonus: _atribBonus, racaId: _atribRacaId || '', varianteId: _atribVarianteId,
        escolhaLivre: [..._atribEscolhaLivre], permitirExcecao: _atribPermitirExcecao,
      }));
    } catch (e) { /* ignora */ }
  }

  const _atribConfigSalva = carregarConfigAtributos();
  let _atribValores = { for: 0, des: 0, con: 0, int: 0, sab: 0, car: 0, ..._atribConfigSalva.valores };
  // "Bônus" — pontos avulsos que não vêm da compra por pontos nem da raça
  // (poder/habilidade que dá +1 num atributo, aumento por nível, item
  // mágico etc.) — pedido do usuário depois de ver a tabela: "incluir outra
  // coluna para somar chamada bônus". Soma direto no Total, não conta no
  // custo em pontos (ver `recalcularAtributos`).
  let _atribBonus = { for: 0, des: 0, con: 0, int: 0, sab: 0, car: 0, ..._atribConfigSalva.bonus };
  let _atribRacaId = _atribConfigSalva.racaId || '';
  let _atribVarianteId = _atribConfigSalva.varianteId || null;
  let _atribEscolhaLivre = new Set(_atribConfigSalva.escolhaLivre || []);
  let _atribPermitirExcecao = !!_atribConfigSalva.permitirExcecao;

  function _atribRacaAtual() {
    if (!_atribRacaId || !window.RACAS) return null;
    return window.RACAS.find(r => r.id === _atribRacaId) || null;
  }

  // Modificador racial de UM atributo — soma bônus fixo (ou de escolha
  // livre, ou da variante escolhida) + penalidade, se houver.
  function _atribModRaca(atribId) {
    const raca = _atribRacaAtual();
    const calc = raca && raca.atributosCalc;
    if (!calc) return 0;
    let mod = 0;
    if (calc.variantes) {
      const v = calc.variantes.find(x => x.id === _atribVarianteId);
      if (v) {
        mod += (v.fixos && v.fixos[atribId]) || 0;
        mod += (v.penalidade && v.penalidade[atribId]) || 0;
      }
    } else if (calc.escolhaLivre) {
      if (_atribEscolhaLivre.has(atribId)) mod += 1;
      mod += (calc.penalidade && calc.penalidade[atribId]) || 0;
    } else if (calc.fixos) {
      mod += calc.fixos[atribId] || 0;
      mod += (calc.penalidade && calc.penalidade[atribId]) || 0;
    }
    return mod;
  }

  // Custo em pontos pra um valor comprado — null quando o valor está fora
  // da Tabela 1-1 (só possível com o checkbox "permitir exceção" ligado).
  function _atribCustoPara(valor) {
    if (!window.ATRIBUTOS_CUSTO) return null;
    const linha = window.ATRIBUTOS_CUSTO.find(l => l.valor === valor);
    return linha ? linha.custo : null;
  }

  // Linha de resumo abaixo do <select> de raça — reaproveita os campos de
  // texto livre `atributos`/`penalidade` que já existem em cada raça (os
  // mesmos usados na página Raças), só pra dar um resumo legível sem
  // precisar ler a tabela inteira linha por linha (melhoria pedida pelo
  // usuário: "consegue colocar alguma melhoria nessa página?").
  function atualizarResumoRaca() {
    const el = document.getElementById('atribRacaResumo');
    if (!el) return;
    const raca = _atribRacaAtual();
    if (!raca) { el.style.display = 'none'; return; }
    el.style.display = '';
    el.innerHTML = `<strong>${raca.nome}:</strong> ${raca.atributos}${raca.penalidade ? ' · ' + raca.penalidade : ''}`;
  }

  window.selecionarRacaAtributos = function(racaId) {
    _atribRacaId = racaId || '';
    _atribVarianteId = null;
    _atribEscolhaLivre.clear();
    const raca = _atribRacaAtual();
    const calc = raca && raca.atributosCalc;
    if (calc && calc.variantes) _atribVarianteId = calc.variantes[0].id;
    renderAtribEscolhas();
    atualizarResumoRaca();
    recalcularAtributos();
  };

  // Botão "Zerar" — volta atributos, raça e checkbox de exceção ao padrão
  // (todos os valores em 0, sem raça, sem escolha livre/variante), sem
  // precisar recarregar a página. Melhoria pedida junto com o conserto do
  // alinhamento da tabela.
  window.zerarAtributos = function() {
    _atribValores = { for: 0, des: 0, con: 0, int: 0, sab: 0, car: 0 };
    _atribBonus = { for: 0, des: 0, con: 0, int: 0, sab: 0, car: 0 };
    _atribRacaId = '';
    _atribVarianteId = null;
    _atribEscolhaLivre.clear();
    _atribPermitirExcecao = false;
    renderAtributosBasicos();
  };

  window.selecionarVarianteAtributo = function(varianteId) {
    _atribVarianteId = varianteId;
    renderAtribEscolhas();
    recalcularAtributos();
  };

  window.toggleEscolhaLivreAtributo = function(atribId) {
    const raca = _atribRacaAtual();
    const calc = raca && raca.atributosCalc;
    if (!calc || !calc.escolhaLivre) return;
    if (_atribEscolhaLivre.has(atribId)) {
      _atribEscolhaLivre.delete(atribId);
    } else if (_atribEscolhaLivre.size < calc.escolhaLivre) {
      _atribEscolhaLivre.add(atribId);
    }
    renderAtribEscolhas();
    recalcularAtributos();
  };

  // Renderiza os chips de escolha livre (Humano/Lefou/Osteon/Sereia) e/ou
  // de variante (Suraggel) conforme a raça selecionada — os dois blocos
  // são mutuamente exclusivos (nenhuma raça tem os dois ao mesmo tempo).
  function renderAtribEscolhas() {
    const raca = _atribRacaAtual();
    const calc = raca && raca.atributosCalc;
    const wrapLivre = document.getElementById('atribEscolhaLivreWrap');
    const wrapVar = document.getElementById('atribVarianteWrap');
    if (!wrapLivre || !wrapVar || !window.ATRIBUTOS_LISTA) return;

    if (calc && calc.escolhaLivre) {
      wrapLivre.style.display = '';
      wrapVar.style.display = 'none';
      document.getElementById('atribEscolhaLivreQtd').textContent = calc.escolhaLivre;
      const excecao = calc.escolhaExceto || [];
      document.getElementById('atribEscolhaLivreChips').innerHTML = window.ATRIBUTOS_LISTA.map(a => {
        if (excecao.includes(a.id)) return '';
        const ativo = _atribEscolhaLivre.has(a.id);
        const cheio = !ativo && _atribEscolhaLivre.size >= calc.escolhaLivre;
        return `<div class="tf-atrib-chip${ativo ? ' selecionado' : ''}${cheio ? ' desabilitado' : ''}"
                     onclick="toggleEscolhaLivreAtributo('${a.id}')">${a.sigla}</div>`;
      }).join('');
    } else if (calc && calc.variantes) {
      wrapLivre.style.display = 'none';
      wrapVar.style.display = '';
      document.getElementById('atribVarianteChips').innerHTML = calc.variantes.map(v => `
        <div class="tf-atrib-chip${v.id === _atribVarianteId ? ' selecionado' : ''}"
             onclick="selecionarVarianteAtributo('${v.id}')">${v.nome}</div>
      `).join('');
    } else {
      wrapLivre.style.display = 'none';
      wrapVar.style.display = 'none';
    }
  }

  // Recalcula raça/total/custo de todos os atributos a partir dos <input>
  // de valor, atualiza a linha de resumo (pontos gastos/restantes) e
  // persiste tudo em localStorage.
  window.recalcularAtributos = function() {
    if (!window.ATRIBUTOS_LISTA) return;
    _atribPermitirExcecao = !!document.getElementById('atribPermitirExcecao')?.checked;
    const min = window.ATRIBUTOS_VALOR_MIN, max = window.ATRIBUTOS_VALOR_MAX;
    let pontosGastos = 0;
    let temValorIndefinido = false;

    const totaisFinais = [];

    window.ATRIBUTOS_LISTA.forEach(a => {
      const input = document.getElementById('atribValor_' + a.id);
      if (!input) return;
      let valor = Math.round(Number(input.value)) || 0;
      if (!_atribPermitirExcecao) valor = Math.min(max, Math.max(min, valor));
      input.value = valor;
      _atribValores[a.id] = valor;

      const inputBonus = document.getElementById('atribBonus_' + a.id);
      const bonus = inputBonus ? (Math.round(Number(inputBonus.value)) || 0) : 0;
      _atribBonus[a.id] = bonus;

      const foraPadrao = valor < min || valor > max;
      input.classList.toggle('atrib-fora-padrao', foraPadrao);

      const modRaca = _atribModRaca(a.id);
      const total = valor + modRaca + bonus;
      const custo = _atribCustoPara(valor);
      if (custo === null) temValorIndefinido = true; else pontosGastos += custo;
      totaisFinais.push({ sigla: a.sigla, total });

      const racaEl = document.getElementById('atribRaca_' + a.id);
      if (racaEl) {
        racaEl.textContent = (modRaca > 0 ? '+' : '') + modRaca;
        racaEl.classList.toggle('positivo', modRaca > 0);
        racaEl.classList.toggle('negativo', modRaca < 0);
      }
      const totalEl = document.getElementById('atribTotal_' + a.id);
      if (totalEl) {
        totalEl.textContent = (total > 0 ? '+' : '') + total;
        totalEl.title = `Valor ${valor >= 0 ? '+' : ''}${valor} · Raça ${modRaca >= 0 ? '+' : ''}${modRaca} · Bônus ${bonus >= 0 ? '+' : ''}${bonus}`;
      }
      const custoEl = document.getElementById('atribCusto_' + a.id);
      if (custoEl) {
        custoEl.textContent = custo === null ? '—' : custo;
        custoEl.classList.toggle('atrib-custo-indefinido', custo === null);
      }
    });

    const pontosRestantes = window.ATRIBUTOS_PONTOS_INICIAIS - pontosGastos;
    const resumoEl = document.getElementById('atribPontosResumo');
    if (resumoEl) {
      resumoEl.innerHTML = `Pontos: <strong>${pontosRestantes}</strong> / ${window.ATRIBUTOS_PONTOS_INICIAIS}` +
        (temValorIndefinido ? ' <span style="color:#666;font-style:italic;">(valores fora da tabela não têm custo oficial)</span>' : '');
      resumoEl.classList.toggle('atrib-pontos-estourou', pontosRestantes < 0);
    }

    // Linha final compacta ("FOR +2 · DES +1 · ...") — melhoria pedida
    // pelo usuário junto com o conserto do botão Zerar: um resumo pra
    // copiar/consultar rápido sem precisar olhar linha por linha da
    // tabela, pensando já na futura ficha de personagem (Backlog 0).
    const resumoFinalEl = document.getElementById('atribResumoFinal');
    if (resumoFinalEl) {
      resumoFinalEl.textContent = totaisFinais.map(t => `${t.sigla} ${t.total >= 0 ? '+' : ''}${t.total}`).join(' · ');
    }
    salvarConfigAtributos();
  };

  // Monta a tabela (6 linhas fixas) e o <select> de raças uma única vez;
  // os valores em si são recarregados do localStorage nesta função.
  function renderAtributosBasicos() {
    if (!window.ATRIBUTOS_LISTA) return;
    const tbody = document.getElementById('atribTabelaBody');
    if (tbody) {
      tbody.innerHTML = window.ATRIBUTOS_LISTA.map(a => `
        <tr>
          <td>${a.nome}${a.descricao ? ` <i class="ti ti-info-circle atrib-info-icone" aria-hidden="true" title="${a.descricao}"></i>` : ''}</td>
          <td><input type="number" id="atribValor_${a.id}" class="atrib-input-valor"
                     value="${_atribValores[a.id] || 0}" oninput="recalcularAtributos()" /></td>
          <td class="atrib-raca-valor" id="atribRaca_${a.id}">+0</td>
          <td><input type="number" id="atribBonus_${a.id}" class="atrib-input-bonus"
                     title="Pontos avulsos de habilidade, aumento por nível, item mágico etc. — não conta no custo em pontos"
                     value="${_atribBonus[a.id] || 0}" oninput="recalcularAtributos()" /></td>
          <td class="atrib-total-valor" id="atribTotal_${a.id}">0</td>
          <td class="atrib-custo-valor" id="atribCusto_${a.id}">0</td>
        </tr>`).join('');
    }
    const selectRaca = document.getElementById('atribRaca');
    if (selectRaca && window.RACAS) {
      selectRaca.innerHTML = '<option value="">Nenhuma (sem modificador)</option>' +
        window.RACAS.map(r => `<option value="${r.id}">${r.nome}</option>`).join('');
      selectRaca.value = _atribRacaId;
    }
    const checkExcecao = document.getElementById('atribPermitirExcecao');
    if (checkExcecao) checkExcecao.checked = _atribPermitirExcecao;

    renderAtribEscolhas();
    atualizarResumoRaca();
    recalcularAtributos();
  }

  // Página "Perigos" (item pai do menu, sem filhos selecionados) — visão
  // geral com os dois grupos juntos, pra não carregar vazia pedindo pra
  // escolher Perigos Simples ou Perigos Complexos no menu.
  let _buscaPerigosVisao = '';
  let _filtroPerigoCondicaoVisao = 'todas';
  let _excluirUsadosVisao = false;

  window.setFiltroCondicaoPerigoVisao = (valor) => {
    _filtroPerigoCondicaoVisao = valor;
    renderPerigosVisaoGeral();
  };

  window.setExcluirUsadosVisao = (checked) => {
    _excluirUsadosVisao = !!checked;
    renderPerigosVisaoGeral();
  };

  // Lista combinada (Simples + Complexos) — reaproveita a mesma detecção de
  // condições dos dois tipos, então cobre os perigos complexos também.
  function preencherFiltroCondicoesPerigoVisao() {
    const selectEl = document.getElementById('perigosVisaoFiltroCondicao');
    if (!selectEl || selectEl.dataset.preenchido) return;
    const condsSet = new Set();
    (window.PERIGOS_SIMPLES || []).forEach(p => extrairCondicoesPerigo(p).forEach(c => condsSet.add(c)));
    (window.PERIGOS_COMPLEXOS || []).forEach(pc => extrairCondicoesPerigoComplexo(pc).forEach(c => condsSet.add(c)));
    const condsOrdenadas = Array.from(condsSet).sort((a, b) => a.localeCompare(b, 'pt-BR'));
    selectEl.innerHTML = `<option value="todas">Filtrar por condição…</option>` +
      condsOrdenadas.map(c => `<option value="${c}">${c}</option>`).join('');
    selectEl.dataset.preenchido = '1';
  }

  function renderPerigosVisaoGeral() {
    const gridSimples = document.getElementById('perigosVisaoGrid');
    const gridComplexos = document.getElementById('perigosComplexosVisaoGrid');
    if (!gridSimples || !gridComplexos) return;

    let simples = window.PERIGOS_SIMPLES || [];
    let complexos = window.PERIGOS_COMPLEXOS || [];
    if (_buscaPerigosVisao) {
      simples = simples.filter(p => textoBuscavelPerigo(p).includes(_buscaPerigosVisao));
      complexos = complexos.filter(pc => textoBuscavelPerigoComplexo(pc).includes(_buscaPerigosVisao));
    }
    if (_filtroPerigoCondicaoVisao !== 'todas') {
      simples = simples.filter(p => extrairCondicoesPerigo(p).includes(_filtroPerigoCondicaoVisao));
      complexos = complexos.filter(pc => extrairCondicoesPerigoComplexo(pc).includes(_filtroPerigoCondicaoVisao));
    }
    if (_excluirUsadosVisao) {
      simples = simples.filter(p => !perigoEstaUsado('simples', p.id));
      complexos = complexos.filter(pc => !perigoEstaUsado('complexo', pc.id));
    }

    const tituloSimplesEl = document.getElementById('perigosVisaoTituloSimples');
    if (tituloSimplesEl) tituloSimplesEl.textContent = `Perigos Simples (${simples.length})`;
    gridSimples.innerHTML = '';
    if (!simples.length) gridSimples.innerHTML = `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nenhum perigo encontrado.</div>`;
    else simples.forEach(p => gridSimples.appendChild(renderPerigoCard(p)));

    const tituloComplexosEl = document.getElementById('perigosVisaoTituloComplexos');
    if (tituloComplexosEl) tituloComplexosEl.textContent = `Perigos Complexos (${complexos.length})`;
    gridComplexos.innerHTML = '';
    if (!complexos.length) gridComplexos.innerHTML = `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nenhum perigo complexo encontrado.</div>`;
    else complexos.forEach(pc => gridComplexos.appendChild(renderPerigoComplexoCard(pc)));
  }

  // Cadeia visual de progressão (fatigado → exausto → inconsciente...) —
  // reaproveitada por doenças e por ambientais que tenham progressao preenchida.
  function blocoProgressaoPerigo(progressao) {
    if (!progressao || !progressao.length) return '';
    return `
      <div class="dp-secao">Progressão</div>
      <div class="dp-progressao">
        ${progressao.map((passo, i) => `${i > 0 ? '<i class="ti ti-arrow-right dp-progressao-seta" aria-hidden="true"></i>' : ''}<span class="dp-progressao-passo">${passo}</span>`).join('')}
      </div>`;
  }

  function botaoUsadoDetalhe(tipo, id, elId) {
    const usado = perigoEstaUsado(tipo, id);
    return `<button class="filtro-btn perigo-usado-detalhe${usado ? ' a' : ''}" id="${elId}" data-id="${id}" onclick="toggleUsadoPerigo('${tipo}','${id}')">
      <i class="ti ${usado ? 'ti-check' : 'ti-circle'}" aria-hidden="true"></i> ${usado ? 'Usado nesta campanha' : 'Marcar como usado'}
    </button>`;
  }

  window.abrirDetalhePerigo = (id) => {
    const p = (window.PERIGOS_SIMPLES || []).find(x => x.id === id);
    if (!p) return;

    document.getElementById('pgTipo').innerHTML = `<i class="ti ${PERIGO_CATEGORIA_ICONE[p.categoria] || 'ti-alert-triangle'}" aria-hidden="true"></i> ${PERIGO_CATEGORIA_LABEL[p.categoria] || 'Perigo'}`;
    document.getElementById('pgNome').textContent = p.nome;
    document.getElementById('pgSub').textContent = p.nd ? `ND ${p.nd}` : (p.cd ? `CD ${p.cd}` : '—');

    let corpo;
    if (p.categoria === 'armadilha') {
      const itensArmadilha = [];
      if (p.resistencia) itensArmadilha.push({ label: null, valor: p.resistencia });
      if (p.investigacaoCD) itensArmadilha.push({ label: 'Percepção/Investigação', valor: `CD ${p.investigacaoCD}` });
      if (p.ladinagemCD) itensArmadilha.push({ label: 'Ladinagem (desarmar)', valor: `CD ${p.ladinagemCD}` });
      corpo = `
        ${p.dano ? `<div class="dp-secao">Efeito</div><p class="dp-desc">${processarKeywords(p.dano)}</p>` : ''}
        ${grupoChips('Testes', itensArmadilha)}
      `;
    } else if (p.categoria === 'doenca') {
      const itensDoenca = [];
      if (p.transmissao) itensDoenca.push({ label: 'Transmissão', valor: p.transmissao });
      if (p.cd) itensDoenca.push({ label: 'CD de Resistência', valor: p.cd });
      corpo = `
        <p class="dp-desc">${processarKeywords(p.descricao || '')}</p>
        ${grupoChips('Contágio', itensDoenca)}
        ${blocoProgressaoPerigo(p.progressao)}
      `;
    } else {
      const itensAmbiental = [];
      if (p.resistencia) itensAmbiental.push({ label: null, valor: p.resistencia });
      corpo = `
        <p class="dp-desc">${processarKeywords(p.descricao || '')}</p>
        ${grupoChips('Testes', itensAmbiental)}
        ${blocoProgressaoPerigo(p.progressao)}
      `;
    }

    document.getElementById('pgBody').innerHTML = `
      ${botaoUsadoDetalhe('simples', p.id, 'pgUsadoBtn')}
      ${corpo}
      <div class="dp-fonte-pagina">Tormenta 20, p. ${p.pagina || '—'}</div>`;

    document.getElementById('perigoPainel').classList.add('aberto');
    document.querySelectorAll('#secao-perigos-simples .cards-area, #secao-perigos .cards-area').forEach(el => el.classList.add('encolhido'));
  };

  window.fecharDetalhePerigo = () => {
    _fecharPainelDetalhe(document.getElementById('perigoPainel'), '#secao-perigos-simples .cards-area, #secao-perigos .cards-area');
  };

  // ── Sortear Perigo (utilidade rápida pra mestre montar masmorra ou
  // improvisar uma cena) — cobre qualquer perigo simples (ambiental,
  // armadilha ou doença) ou um perigo complexo, com faixa de ND opcional
  // quando o tipo escolhido tiver ND numérico (armadilha/complexo). ──
  const ND_ARMADILHA_OPCOES = [0.25, 0.5, 1, 2, 3, 4, 5, 6, 8];
  function formatarNdArmadilha(v) {
    if (v === 0.25) return '1/4';
    if (v === 0.5) return '1/2';
    return String(v);
  }

  function preencherSelectsSortearPorTipo(tipo) {
    const minEl = document.getElementById('sortearNdMin');
    const maxEl = document.getElementById('sortearNdMax');
    if (!minEl || !maxEl) return;
    const opcoes = tipo === 'complexo'
      ? Array.from(new Set((window.PERIGOS_COMPLEXOS || []).map(pc => pc.ndValor))).sort((a, b) => a - b)
      : ND_ARMADILHA_OPCOES;
    if (!opcoes.length) return;
    const opcoesHtml = opcoes.map(v => `<option value="${v}">${formatarNdArmadilha(v)}</option>`).join('');
    minEl.innerHTML = opcoesHtml;
    maxEl.innerHTML = opcoesHtml;
    maxEl.value = String(opcoes[opcoes.length - 1]);
  }

  window.atualizarVisibilidadeNdSortear = () => {
    const tipoEl = document.getElementById('sortearTipoPerigo');
    const wrap = document.getElementById('sortearNdWrap');
    const usarNdEl = document.getElementById('sortearUsarNd');
    const filtrarNdWrap = document.getElementById('sortearFiltrarNdWrap');
    if (!tipoEl || !wrap) return;
    // Ambiental e Doença não têm ND no livro — o checkbox "Filtrar por ND"
    // some nesses dois casos (não tem o que filtrar). Qualquer/Armadilha/
    // Complexo têm itens com ND numérico, então mostram o checkbox.
    const ndDisponivel = tipoEl.value !== 'ambiental' && tipoEl.value !== 'doenca';
    if (filtrarNdWrap) filtrarNdWrap.style.display = ndDisponivel ? '' : 'none';
    if (!ndDisponivel && usarNdEl) usarNdEl.checked = false;
    const mostrarFaixa = ndDisponivel && usarNdEl && usarNdEl.checked;
    wrap.style.display = mostrarFaixa ? '' : 'none';
    if (mostrarFaixa) preencherSelectsSortearPorTipo(tipoEl.value);
  };

  // O widget "Sortear Perigo" é um único elemento no DOM, reaproveitado nas
  // três páginas de Perigos (Simples, Complexos e Visão Geral) — em vez de
  // duplicar o markup/IDs três vezes, ele "muda de casa" pro .cards-area da
  // seção de onde foi aberto, o que preserva o mesmo comportamento de
  // encolher junto com o painel de detalhe em qualquer uma delas.
  const SORTEAR_BOTAO_POR_SECAO = {
    'secao-perigos-simples': 'btnSortearArmadilha',
    'secao-perigos-complexos': 'btnSortearArmadilhaPC',
    'secao-perigos': 'btnSortearArmadilhaVisao',
  };

  window.toggleSortearArmadilha = (secaoId) => {
    secaoId = secaoId || 'secao-perigos-simples';
    const box = document.getElementById('sortearArmadilha');
    const areaAlvo = document.querySelector(`#${secaoId} .cards-area`);
    if (!box || !areaAlvo) return;

    const trocouDeSecao = box.parentElement !== areaAlvo;
    if (trocouDeSecao) {
      areaAlvo.insertBefore(box, areaAlvo.firstChild);
      box.style.display = 'none';
      // Ao abrir a partir da aba de Perigos Complexos, já sugere esse tipo
      // no seletor em vez de deixar em "Qualquer perigo simples".
      const tipoEl = document.getElementById('sortearTipoPerigo');
      if (tipoEl && secaoId === 'secao-perigos-complexos') tipoEl.value = 'complexo';
    }

    const abrir = box.style.display === 'none';
    box.style.display = abrir ? '' : 'none';
    Object.values(SORTEAR_BOTAO_POR_SECAO).forEach(btnId => {
      const b = document.getElementById(btnId);
      if (b) b.classList.toggle('a', abrir && btnId === SORTEAR_BOTAO_POR_SECAO[secaoId]);
    });
    if (abrir) atualizarVisibilidadeNdSortear();
  };

  // Lista acumulada de sorteios — cada roda de "Sortear" entra aqui em vez
  // de substituir o resultado anterior, pra dar pra montar uma lista de
  // armadilhas/perigos de uma masmorra numa sessão de preparo. Vive só em
  // memória (não persiste no localStorage) — reseta ao recarregar a página.
  let _sorteioLista = [];
  const SORTEIO_LISTA_MAX = 20;

  function renderSorteioLista() {
    const resultEl = document.getElementById('sortearArmadilhaResultado');
    if (!resultEl) return;
    if (!_sorteioLista.length) { resultEl.innerHTML = ''; return; }
    const itensHtml = _sorteioLista.map((item, i) => `
      <div class="calc-grupo-card sortear-item">
        <span class="calc-grupo-tag">${item.tag}</span>
        <a href="javascript:void(0)" class="calc-grupo-nome" onclick="${item.tipo === 'complexo' ? 'abrirDetalhePerigoComplexo' : 'abrirDetalhePerigo'}('${item.id}')">${item.nome}</a>
        <button class="calc-x-btn" onclick="removerDaListaSorteio(${i})" title="Remover da lista"><i class="ti ti-x" aria-hidden="true"></i></button>
      </div>`).join('');
    resultEl.innerHTML = `
      <div class="sortear-lista-header">
        <span>Sorteados nesta sessão (${_sorteioLista.length}${_sorteioLista.length >= SORTEIO_LISTA_MAX ? `, máx. ${SORTEIO_LISTA_MAX}` : ''})</span>
        <button class="calc-x-btn" onclick="limparListaSorteio()">Limpar lista</button>
      </div>
      <div class="sortear-lista">${itensHtml}</div>`;
  }
  window.removerDaListaSorteio = (i) => { _sorteioLista.splice(i, 1); renderSorteioLista(); };
  window.limparListaSorteio = () => { _sorteioLista = []; renderSorteioLista(); };
  function adicionarNaListaSorteio(item) {
    _sorteioLista.unshift(item);
    if (_sorteioLista.length > SORTEIO_LISTA_MAX) _sorteioLista.length = SORTEIO_LISTA_MAX;
    renderSorteioLista();
  }

  window.sortearPerigo = () => {
    const tipoEl = document.getElementById('sortearTipoPerigo');
    const avisoEl = document.getElementById('sortearArmadilhaAviso');
    const excluirUsadosEl = document.getElementById('sortearExcluirUsados');
    const usarNdEl = document.getElementById('sortearUsarNd');
    if (!tipoEl) return;
    if (avisoEl) avisoEl.innerHTML = '';
    const tipo = tipoEl.value;
    const excluirUsados = !!(excluirUsadosEl && excluirUsadosEl.checked);
    const usarNd = !!(usarNdEl && usarNdEl.checked);

    if (tipo === 'complexo') {
      let candidatas = window.PERIGOS_COMPLEXOS || [];
      const minEl = document.getElementById('sortearNdMin');
      const maxEl = document.getElementById('sortearNdMax');
      if (usarNd && minEl && maxEl && minEl.options.length) {
        let ndMin = parseFloat(minEl.value), ndMax = parseFloat(maxEl.value);
        if (ndMin > ndMax) { const tmp = ndMin; ndMin = ndMax; ndMax = tmp; }
        candidatas = candidatas.filter(pc => pc.ndValor >= ndMin && pc.ndValor <= ndMax);
      }
      if (excluirUsados) candidatas = candidatas.filter(pc => !perigoEstaUsado('complexo', pc.id));
      if (!candidatas.length) {
        if (avisoEl) avisoEl.innerHTML = `<p class="calc-combate-nota">${excluirUsados ? 'Todos os perigos complexos desse filtro já foram marcados como usados.' : 'Nenhum perigo complexo nessa faixa de ND.'}</p>`;
        return;
      }
      const escolhida = candidatas[Math.floor(Math.random() * candidatas.length)];
      adicionarNaListaSorteio({ tipo: 'complexo', id: escolhida.id, nome: escolhida.nome, tag: `ND ${escolhida.nd}` });
      return;
    }

    let candidatas = window.PERIGOS_SIMPLES || [];
    if (tipo !== 'qualquer') candidatas = candidatas.filter(p => p.categoria === tipo);
    // ND só existe em armadilhas — no filtro "qualquer" com a faixa ativada
    // isso naturalmente restringe o sorteio às armadilhas dentro da faixa
    // (ambientais/doenças não têm ND pra comparar, então ficam de fora).
    if (usarNd && (tipo === 'armadilha' || tipo === 'qualquer')) {
      const minEl = document.getElementById('sortearNdMin');
      const maxEl = document.getElementById('sortearNdMax');
      if (minEl && maxEl && minEl.options.length) {
        let ndMin = parseFloat(minEl.value), ndMax = parseFloat(maxEl.value);
        if (ndMin > ndMax) { const tmp = ndMin; ndMin = ndMax; ndMax = tmp; }
        candidatas = candidatas.filter(p => typeof p.ndValor === 'number' && p.ndValor >= ndMin && p.ndValor <= ndMax);
      }
    }
    if (excluirUsados) candidatas = candidatas.filter(p => !perigoEstaUsado('simples', p.id));
    if (!candidatas.length) {
      if (avisoEl) avisoEl.innerHTML = `<p class="calc-combate-nota">${excluirUsados ? 'Todos os perigos desse filtro já foram marcados como usados.' : 'Nenhum perigo encontrado com esse filtro.'}</p>`;
      return;
    }
    const escolhida = candidatas[Math.floor(Math.random() * candidatas.length)];
    const tagResultado = escolhida.nd ? `ND ${escolhida.nd}` : (escolhida.cd ? `CD ${escolhida.cd}` : (PERIGO_CATEGORIA_LABEL[escolhida.categoria] || ''));
    adicionarNaListaSorteio({ tipo: 'simples', id: escolhida.id, nome: escolhida.nome, tag: tagResultado });
  };

  // ── Perigos Complexos (cenas de teste estendido, p. 320-321) ──
  function textoBuscavelPerigoComplexo(pc) {
    if (pc._buscaCache) return pc._buscaCache;
    const partes = [pc.nome, pc.objetivo, pc.efeito, pc.notas, ...(pc.acoes || []).map(a => `${a.nome} ${a.pericia || ''} ${a.texto || ''}`), ...extrairCondicoesPerigoComplexo(pc)];
    pc._buscaCache = partes.filter(Boolean).join(' | ').toLowerCase();
    return pc._buscaCache;
  }

  let _buscaPerigosComplexos = '';

  function renderPerigoComplexoCard(pc) {
    const card = document.createElement('div');
    const usado = perigoEstaUsado('complexo', pc.id);
    card.className = 'eq-card perigo-card' + (usado ? ' usado' : '');
    card.dataset.id = pc.id;
    const nAcoes = (pc.acoes || []).length;
    card.innerHTML = `
      <div class="eq-card-top">
        <span class="eq-categoria-tag cr-nd-tag">ND ${pc.nd}</span>
        <div class="eq-card-top-right">
          <span class="eq-preco-tag"><i class="ti ti-flame" aria-hidden="true"></i> Cena</span>
          ${botaoUsadoCard('complexo', pc.id)}
        </div>
      </div>
      <div class="eq-nome">${pc.nome}</div>
      <div class="eq-footer">
        ${nAcoes ? `<span class="eq-stat-mini"><i class="ti ti-list-check" aria-hidden="true"></i>${nAcoes} ${nAcoes !== 1 ? 'ações' : 'ação'}</span>` : ''}
        <span class="rc-badge badge-fonte">Tormenta 20</span>
      </div>`;
    card.addEventListener('click', () => abrirDetalhePerigoComplexo(pc.id));
    return card;
  }

  function renderPerigosComplexosNaSecao() {
    const grid = document.getElementById('perigosComplexosGrid');
    if (!grid) return;
    let lista = window.PERIGOS_COMPLEXOS || [];
    if (_buscaPerigosComplexos) lista = lista.filter(pc => textoBuscavelPerigoComplexo(pc).includes(_buscaPerigosComplexos));
    const countEl = document.getElementById('perigosComplexosCount');
    if (countEl) countEl.textContent = lista.length + (lista.length !== 1 ? ' perigos complexos' : ' perigo complexo');
    grid.innerHTML = '';
    if (!lista.length) {
      grid.innerHTML = `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nenhum perigo complexo encontrado.</div>`;
      return;
    }
    lista.forEach(pc => grid.appendChild(renderPerigoComplexoCard(pc)));
  }

  let _contadorPerigoComplexo = { sucessos: 0, falhas: 0 };

  function renderContadorPerigoComplexo() {
    const sEl = document.getElementById('pgcContadorSucessos');
    const fEl = document.getElementById('pgcContadorFalhas');
    if (sEl) sEl.textContent = _contadorPerigoComplexo.sucessos;
    if (fEl) fEl.textContent = _contadorPerigoComplexo.falhas;
  }

  window.ajustarContadorPerigoComplexo = (campo, delta) => {
    _contadorPerigoComplexo[campo] = Math.max(0, _contadorPerigoComplexo[campo] + delta);
    renderContadorPerigoComplexo();
  };

  window.zerarContadorPerigoComplexo = () => {
    _contadorPerigoComplexo = { sucessos: 0, falhas: 0 };
    renderContadorPerigoComplexo();
  };

  window.abrirDetalhePerigoComplexo = (id) => {
    const pc = (window.PERIGOS_COMPLEXOS || []).find(x => x.id === id);
    if (!pc) return;
    _contadorPerigoComplexo = { sucessos: 0, falhas: 0 };

    document.getElementById('pgcNome').textContent = pc.nome;
    const ndFixoEl = document.getElementById('pgcNdFixo');
    if (ndFixoEl) ndFixoEl.classList.add('ativo');
    document.getElementById('pgcNdFixoValor').textContent = `ND ${pc.nd}`;

    const acoesHtml = (pc.acoes || []).map(a => `
      <div class="dp-habilidade">
        <div class="dp-hab-nome">${a.nome}${a.pericia ? ` <span style="font-weight:400;color:#888;">— ${a.pericia}${a.cd ? ` CD ${a.cd}` : ''}</span>` : ''}</div>
        <div class="dp-hab-desc">${processarKeywords(a.texto || '')}</div>
      </div>`).join('');

    document.getElementById('pgcBody').innerHTML = `
      ${botaoUsadoDetalhe('complexo', pc.id, 'pgcUsadoBtn')}
      ${pc.objetivo ? `<div class="dp-secao">Objetivo</div><p class="dp-desc">${processarKeywords(pc.objetivo)}</p>` : ''}
      ${pc.efeito ? `<div class="dp-secao">Efeito</div><p class="dp-desc">${processarKeywords(pc.efeito)}</p>` : ''}
      ${pc.notas ? `<div class="dp-secao">Notas</div><p class="dp-desc">${processarKeywords(pc.notas)}</p>` : ''}

      ${acoesHtml ? `<div class="dp-secao">Ações</div>${acoesHtml}` : ''}

      <div class="dp-secao">Contador de Testes</div>
      <div class="pgc-contador">
        <div class="pgc-contador-linha">
          <div class="pgc-contador-item">
            <span class="pgc-contador-label">Sucessos</span>
            <div class="pgc-contador-controles">
              <button onclick="ajustarContadorPerigoComplexo('sucessos',-1)"><i class="ti ti-minus" aria-hidden="true"></i></button>
              <span id="pgcContadorSucessos">0</span>
              <button onclick="ajustarContadorPerigoComplexo('sucessos',1)"><i class="ti ti-plus" aria-hidden="true"></i></button>
            </div>
          </div>
          <div class="pgc-contador-item">
            <span class="pgc-contador-label">Falhas</span>
            <div class="pgc-contador-controles">
              <button onclick="ajustarContadorPerigoComplexo('falhas',-1)"><i class="ti ti-minus" aria-hidden="true"></i></button>
              <span id="pgcContadorFalhas">0</span>
              <button onclick="ajustarContadorPerigoComplexo('falhas',1)"><i class="ti ti-plus" aria-hidden="true"></i></button>
            </div>
          </div>
          <button class="calc-x-btn" onclick="zerarContadorPerigoComplexo()" title="Zerar"><i class="ti ti-refresh" aria-hidden="true"></i></button>
        </div>
        ${pc.contadorNota ? `<p class="calc-combate-nota">${processarKeywords(pc.contadorNota)}</p>` : ''}
      </div>

      <div class="dp-fonte-pagina">Tormenta 20, p. ${pc.pagina || '—'}</div>
    `;

    document.getElementById('perigoComplexoPainel').classList.add('aberto');
    document.querySelectorAll('#secao-perigos-complexos .cards-area, #secao-perigos .cards-area').forEach(el => el.classList.add('encolhido'));
  };

  window.fecharDetalhePerigoComplexo = () => {
    _fecharPainelDetalhe(document.getElementById('perigoComplexoPainel'), '#secao-perigos-complexos .cards-area, #secao-perigos .cards-area');
  };

  // ── AMBIENTE (Clima, Terrenos, Masmorras, Ermos, Urbano, Viagens — Cap.
  // 6 "O Mestre", seção "Ambientes de Aventura", p. 263-275) ──────────────
  // Todas as sub-abas (exceto Viagens, que é só uma tabela/calculadora)
  // compartilham o mesmo shape de card e o mesmo painel de detalhe
  // (#ambientePainel) — abrirDetalheAmbiente(colecao, id) resolve o item
  // certo em qualquer uma das coleções abaixo e monta o painel genérico.
  const AMBIENTE_SECOES_TODAS = ['secao-ambiente', 'secao-clima', 'secao-terrenos', 'secao-masmorras', 'secao-ermos', 'secao-urbano'];
  const AMBIENTE_ICONE = { clima: 'ti-cloud-rain', terreno: 'ti-mountain', masmorra: 'ti-door', ermo: 'ti-trees', 'urbano-assentamento': 'ti-building-community', 'urbano-elemento': 'ti-building-community' };
  const AMBIENTE_TIPO_LABEL = { clima: 'Clima', terreno: 'Terreno', masmorra: 'Masmorra', ermo: 'Ermo', 'urbano-assentamento': 'Assentamento', 'urbano-elemento': 'Urbano' };

  function ambienteBuscarItem(colecao, id) {
    const mapa = {
      clima: window.AMBIENTE_CLIMA,
      terreno: window.AMBIENTE_TERRENO,
      masmorra: window.AMBIENTE_MASMORRA_ELEMENTO,
      ermo: window.AMBIENTE_ERMO_ELEMENTO,
      'urbano-assentamento': window.AMBIENTE_URBANO_ASSENTAMENTO,
      'urbano-elemento': window.AMBIENTE_URBANO_ELEMENTO,
    };
    return (mapa[colecao] || []).find(x => x.id === id);
  }

  function textoBuscavelAmbiente(item) {
    if (item._buscaCache) return item._buscaCache;
    const partes = [item.nome, item.efeito, item.populacao, item.governo, item.guarda, item.justica, item.economia,
      ...(item.stats || []).map(s => `${s.label || ''} ${s.valor}`),
      ...(item.subtabela || []).map(s => s.resultado)];
    item._buscaCache = partes.filter(Boolean).join(' | ').toLowerCase();
    return item._buscaCache;
  }

  function renderAmbienteCard(colecao, item, tagPrincipal) {
    const card = document.createElement('div');
    card.className = 'eq-card';
    card.dataset.id = item.id;
    card.innerHTML = `
      <div class="eq-card-top">
        <span class="eq-categoria-tag cr-nd-tag">${tagPrincipal}</span>
      </div>
      <div class="eq-nome">${item.nome}</div>
      <div class="eq-footer">
        <span class="rc-badge badge-fonte">Tormenta 20</span>
      </div>`;
    card.addEventListener('click', () => abrirDetalheAmbiente(colecao, item.id));
    return card;
  }

  window.abrirDetalheAmbiente = (colecao, id) => {
    const item = ambienteBuscarItem(colecao, id);
    if (!item) return;

    document.getElementById('ambTipo').innerHTML = `<i class="ti ${AMBIENTE_ICONE[colecao] || 'ti-cloud'}" aria-hidden="true"></i> ${AMBIENTE_TIPO_LABEL[colecao] || 'Ambiente'}`;
    document.getElementById('ambNome').textContent = item.nome;

    let stats = item.stats || null;
    let subEl = '';
    let corpoExtra = '';

    if (colecao === 'terreno') {
      subEl = TERRENO_LABEL[item.terreno] || '';
    } else if (colecao === 'clima') {
      subEl = CLIMA_CATEGORIA_LABEL[item.categoria] || '';
    } else if (colecao === 'masmorra') {
      subEl = MASMORRA_TIPO_LABEL[item.tipo] || '';
    } else if (colecao === 'urbano-assentamento') {
      subEl = 'Tipo de Comunidade';
      stats = [
        { label: 'População', valor: item.populacao },
        { label: 'Governo', valor: item.governo },
        { label: 'Guarda', valor: item.guarda },
        { label: 'Justiça', valor: item.justica },
        { label: 'Economia', valor: item.economia },
      ];
    }

    document.getElementById('ambSub').textContent = subEl;

    if (item.subtabela) {
      corpoExtra = `<div class="dp-secao">Tabela</div><div class="dp-tabela">${item.subtabela.map(s => `<div class="dp-tabela-linha"><span class="dp-tabela-faixa">${s.faixa}</span><span>${s.resultado}</span></div>`).join('')}</div>`;
    }

    document.getElementById('ambBody').innerHTML = `
      ${item.efeito ? `<p class="dp-desc">${processarKeywords(item.efeito)}</p>` : ''}
      ${grupoChips('Estatísticas', (stats || []).filter(s => s.valor))}
      ${corpoExtra}
      <div class="dp-fonte-pagina">Tormenta 20, p. ${item.pagina || '—'}</div>`;

    document.getElementById('ambientePainel').classList.add('aberto');
    document.querySelectorAll(AMBIENTE_SECOES_TODAS.map(s => `#${s} .cards-area`).join(', ')).forEach(el => el.classList.add('encolhido'));
  };

  window.fecharDetalheAmbiente = () => {
    _fecharPainelDetalhe(document.getElementById('ambientePainel'), AMBIENTE_SECOES_TODAS.map(s => `#${s} .cards-area`).join(', '));
  };

  // ── Clima ──
  const CLIMA_CATEGORIA_LABEL = { temperatura: 'Temperatura', visibilidade: 'Visibilidade', precipitacao: 'Precipitação', vento: 'Vento' };
  let _filtroClima = 'todos';
  let _buscaClima = '';

  window.setFiltroClima = (el, valor) => {
    _ativarFiltroBtn('#climaFiltroCategoria', el);
    _filtroClima = valor;
    renderClimaNaSecao();
  };

  function renderClimaNaSecao() {
    const grid = document.getElementById('climaGrid');
    if (!grid) return;
    let lista = window.AMBIENTE_CLIMA || [];
    if (_filtroClima !== 'todos') lista = lista.filter(c => c.categoria === _filtroClima);
    if (_buscaClima) lista = lista.filter(c => textoBuscavelAmbiente(c).includes(_buscaClima));
    const countEl = document.getElementById('climaCount');
    if (countEl) countEl.textContent = lista.length + (lista.length !== 1 ? ' efeitos' : ' efeito');
    grid.innerHTML = '';
    if (!lista.length) { grid.innerHTML = `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nenhum efeito encontrado.</div>`; return; }
    lista.forEach(c => grid.appendChild(renderAmbienteCard('clima', c, CLIMA_CATEGORIA_LABEL[c.categoria] || '')));
  }

  // ── Terrenos ──
  const TERRENO_LABEL = { geral: 'Geral', colinas: 'Colinas', desertos: 'Desertos', florestas: 'Florestas', montanhas: 'Montanhas', pantanos: 'Pântanos', planicies: 'Planícies', artico: 'Ártico', aquatico: 'Aquático' };
  let _filtroTerreno = 'todos';
  let _buscaTerrenos = '';

  window.setFiltroTerreno = (el, valor) => {
    _ativarFiltroBtn('#terrenosFiltroTipo', el);
    _filtroTerreno = valor;
    renderTerrenosNaSecao();
  };

  function renderTerrenosNaSecao() {
    const grid = document.getElementById('terrenosGrid');
    if (!grid) return;
    let lista = window.AMBIENTE_TERRENO || [];
    if (_filtroTerreno !== 'todos') lista = lista.filter(t => t.terreno === _filtroTerreno);
    if (_buscaTerrenos) lista = lista.filter(t => textoBuscavelAmbiente(t).includes(_buscaTerrenos));
    const countEl = document.getElementById('terrenosCount');
    if (countEl) countEl.textContent = lista.length + (lista.length !== 1 ? ' elementos' : ' elemento');
    grid.innerHTML = '';
    if (!lista.length) { grid.innerHTML = `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nenhum elemento encontrado.</div>`; return; }
    lista.forEach(t => grid.appendChild(renderAmbienteCard('terreno', t, TERRENO_LABEL[t.terreno] || '')));
  }

  // ── Masmorras ──
  const MASMORRA_TIPO_LABEL = { piso: 'Piso', parede: 'Parede', porta: 'Porta', pilar: 'Pilar', outro: 'Outro' };
  let _filtroMasmorra = 'todos';
  let _buscaMasmorras = '';

  window.setFiltroMasmorra = (el, valor) => {
    _ativarFiltroBtn('#masmorrasFiltroTipo', el);
    _filtroMasmorra = valor;
    renderMasmorrasNaSecao();
  };

  function renderMasmorrasNaSecao() {
    const grid = document.getElementById('masmorrasGrid');
    if (!grid) return;
    let lista = window.AMBIENTE_MASMORRA_ELEMENTO || [];
    if (_filtroMasmorra !== 'todos') lista = lista.filter(m => m.tipo === _filtroMasmorra);
    if (_buscaMasmorras) lista = lista.filter(m => textoBuscavelAmbiente(m).includes(_buscaMasmorras));
    const countEl = document.getElementById('masmorrasCount');
    if (countEl) countEl.textContent = lista.length + (lista.length !== 1 ? ' elementos' : ' elemento');
    grid.innerHTML = '';
    if (!lista.length) { grid.innerHTML = `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nenhum elemento encontrado.</div>`; return; }
    lista.forEach(m => grid.appendChild(renderAmbienteCard('masmorra', m, MASMORRA_TIPO_LABEL[m.tipo] || '')));
  }

  window.toggleSortearMasmorra = () => {
    const box = document.getElementById('sortearMasmorra');
    if (!box) return;
    const abrir = box.style.display === 'none';
    box.style.display = abrir ? '' : 'none';
    const btn = document.getElementById('btnSortearMasmorra');
    if (btn) btn.classList.toggle('a', abrir);
  };

  window.sortearIdeiaMasmorra = () => {
    const lista = window.AMBIENTE_MASMORRA_IDEIAS || [];
    if (!lista.length) return;
    const resultEl = document.getElementById('sortearMasmorraResultado');
    const escolhida = lista[Math.floor(Math.random() * lista.length)];
    resultEl.innerHTML = `
      <div class="calc-grupo-card">
        <span class="calc-grupo-tag">d20 = ${escolhida.numero}</span>
        <span class="calc-grupo-nome">${escolhida.ideia}</span>
      </div>`;
  };

  // ── Ermos ──
  let _buscaErmos = '';

  function renderErmosNaSecao() {
    const grid = document.getElementById('ermosGrid');
    if (!grid) return;
    let lista = window.AMBIENTE_ERMO_ELEMENTO || [];
    if (_buscaErmos) lista = lista.filter(e => textoBuscavelAmbiente(e).includes(_buscaErmos));
    const countEl = document.getElementById('ermosCount');
    if (countEl) countEl.textContent = lista.length + (lista.length !== 1 ? ' elementos' : ' elemento');
    grid.innerHTML = '';
    if (!lista.length) { grid.innerHTML = `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nenhum elemento encontrado.</div>`; return; }
    lista.forEach(e => grid.appendChild(renderAmbienteCard('ermo', e, 'Ermo')));
  }

  // ── Urbano (Assentamentos + Elementos + Perseguição) ──
  let _buscaUrbano = '';

  function renderUrbanoNaSecao() {
    const gridAssentamento = document.getElementById('urbanoAssentamentoGrid');
    const gridElemento = document.getElementById('urbanoElementoGrid');
    if (!gridAssentamento || !gridElemento) return;
    let assentamentos = window.AMBIENTE_URBANO_ASSENTAMENTO || [];
    let elementos = window.AMBIENTE_URBANO_ELEMENTO || [];
    if (_buscaUrbano) {
      assentamentos = assentamentos.filter(a => textoBuscavelAmbiente(a).includes(_buscaUrbano));
      elementos = elementos.filter(e => textoBuscavelAmbiente(e).includes(_buscaUrbano));
    }
    gridAssentamento.innerHTML = '';
    if (!assentamentos.length) gridAssentamento.innerHTML = `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nenhum assentamento encontrado.</div>`;
    else assentamentos.forEach(a => gridAssentamento.appendChild(renderAmbienteCard('urbano-assentamento', a, 'Assentamento')));
    gridElemento.innerHTML = '';
    if (!elementos.length) gridElemento.innerHTML = `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nenhum elemento encontrado.</div>`;
    else elementos.forEach(e => gridElemento.appendChild(renderAmbienteCard('urbano-elemento', e, 'Urbano')));
  }

  window.toggleSortearPerseguicao = () => {
    const box = document.getElementById('sortearPerseguicao');
    if (!box) return;
    const abrir = box.style.display === 'none';
    box.style.display = abrir ? '' : 'none';
    const btn = document.getElementById('btnSortearPerseguicao');
    if (btn) btn.classList.toggle('a', abrir);
  };

  window.sortearEventoPerseguicao = () => {
    const lista = window.AMBIENTE_PERSEGUICAO_EVENTOS || [];
    if (!lista.length) return;
    const resultEl = document.getElementById('sortearPerseguicaoResultado');
    const d20 = 1 + Math.floor(Math.random() * 20);
    const evento = lista.find(e => d20 >= e.faixaMin && d20 <= e.faixaMax);
    if (!evento) return;
    resultEl.innerHTML = `
      <div class="calc-grupo-card sortear-item" style="flex-direction:column;align-items:flex-start;gap:4px;">
        <span class="calc-grupo-tag">d20 = ${d20} · ${evento.evento}</span>
        ${evento.teste ? `<span class="calc-grupo-nome" style="font-size:12px;">Teste: ${evento.teste}</span>` : ''}
        ${evento.exemplo ? `<span class="calc-combate-nota" style="margin:0;">${evento.exemplo}</span>` : ''}
      </div>`;
  };

  // ── Viagens ──
  function preencherSelectViagem() {
    const el = document.getElementById('viagemDeslocamento');
    if (!el || el.dataset.preenchido) return;
    const lista = window.AMBIENTE_VIAGEM_TABELA || [];
    el.innerHTML = lista.map(v => `<option value="${v.deslocamentoM}">${v.deslocamentoM}m</option>`).join('');
    el.dataset.preenchido = '1';
  }

  window.calcularViagem = () => {
    const el = document.getElementById('viagemDeslocamento');
    const resultEl = document.getElementById('viagemResultado');
    if (!el || !resultEl) return;
    const valor = parseFloat(el.value);
    const linha = (window.AMBIENTE_VIAGEM_TABELA || []).find(v => v.deslocamentoM === valor);
    if (!linha) { resultEl.innerHTML = ''; return; }
    resultEl.innerHTML = grupoChips('Velocidade de viagem', [
      { label: 'Por hora', valor: `${linha.porHoraKm} km` },
      { label: 'Por dia', valor: `${linha.porDiaKm} km` },
    ]);
  };

  function renderViagemRegras() {
    const el = document.getElementById('viagemRegras');
    if (!el) return;
    const lista = window.AMBIENTE_VIAGEM_REGRAS || [];
    el.innerHTML = lista.map(r => `<div class="dp-grupo"><div class="dp-grupo-titulo">${r.titulo}</div><p class="dp-desc" style="margin-top:6px">${r.texto}</p></div>`).join('');
  }

  // ── Ambiente — visão geral (hub com atalhos + busca combinada) ──
  const AMBIENTE_HUB = [
    { secao: 'clima', icone: 'ti-cloud-rain', titulo: 'Clima', desc: 'Calor, frio, chuva, vento e tempestades.', colecao: () => window.AMBIENTE_CLIMA || [] },
    { secao: 'terrenos', icone: 'ti-mountain', titulo: 'Terrenos', desc: 'Colinas, florestas, montanhas, água e mais.', colecao: () => window.AMBIENTE_TERRENO || [] },
    { secao: 'masmorras', icone: 'ti-door', titulo: 'Masmorras', desc: 'Pisos, paredes, portas e outros elementos.', colecao: () => window.AMBIENTE_MASMORRA_ELEMENTO || [] },
    { secao: 'ermos', icone: 'ti-trees', titulo: 'Ermos', desc: 'Covis, ruínas e santuários pelo caminho.', colecao: () => window.AMBIENTE_ERMO_ELEMENTO || [] },
    { secao: 'urbano', icone: 'ti-building-community', titulo: 'Urbano', desc: 'Aldeias, vilas, cidades, metrópoles e perseguições.', colecao: () => [...(window.AMBIENTE_URBANO_ASSENTAMENTO || []), ...(window.AMBIENTE_URBANO_ELEMENTO || [])] },
    { secao: 'viagens', icone: 'ti-route', titulo: 'Viagens', desc: 'Velocidade de viagem por hora e por dia.', colecao: () => [] },
  ];

  function renderAmbienteHub() {
    const el = document.getElementById('ambienteVisaoAtalhos');
    if (!el) return;
    el.innerHTML = AMBIENTE_HUB.map(h => {
      const n = h.colecao().length;
      return `
        <div class="amb-hub-card" onclick="mostrarSecao('${h.secao}')">
          <i class="ti ${h.icone}" aria-hidden="true"></i>
          <div class="amb-hub-titulo">${h.titulo}</div>
          <div class="amb-hub-desc">${h.desc}</div>
          ${n ? `<span class="amb-hub-count">${n}</span>` : ''}
        </div>`;
    }).join('');
  }

  let _buscaAmbienteVisao = '';
  const AMBIENTE_VISAO_COLECOES = [
    { colecao: 'clima', lista: () => window.AMBIENTE_CLIMA || [], tag: (i) => CLIMA_CATEGORIA_LABEL[i.categoria] || '' },
    { colecao: 'terreno', lista: () => window.AMBIENTE_TERRENO || [], tag: (i) => TERRENO_LABEL[i.terreno] || '' },
    { colecao: 'masmorra', lista: () => window.AMBIENTE_MASMORRA_ELEMENTO || [], tag: (i) => MASMORRA_TIPO_LABEL[i.tipo] || '' },
    { colecao: 'ermo', lista: () => window.AMBIENTE_ERMO_ELEMENTO || [], tag: () => 'Ermo' },
    { colecao: 'urbano-assentamento', lista: () => window.AMBIENTE_URBANO_ASSENTAMENTO || [], tag: () => 'Assentamento' },
    { colecao: 'urbano-elemento', lista: () => window.AMBIENTE_URBANO_ELEMENTO || [], tag: () => 'Urbano' },
  ];

  function renderAmbienteVisaoBusca() {
    const atalhosEl = document.getElementById('ambienteVisaoAtalhos');
    const tituloEl = document.getElementById('ambienteVisaoBuscaTitulo');
    const gridEl = document.getElementById('ambienteVisaoBuscaGrid');
    if (!gridEl) return;

    if (!_buscaAmbienteVisao) {
      if (atalhosEl) atalhosEl.style.display = '';
      if (tituloEl) tituloEl.style.display = 'none';
      gridEl.innerHTML = '';
      return;
    }

    if (atalhosEl) atalhosEl.style.display = 'none';
    if (tituloEl) tituloEl.style.display = '';

    const encontrados = [];
    AMBIENTE_VISAO_COLECOES.forEach(c => {
      c.lista().forEach(item => {
        if (textoBuscavelAmbiente(item).includes(_buscaAmbienteVisao)) encontrados.push({ item, colecao: c.colecao, tag: c.tag(item) });
      });
    });
    if (tituloEl) tituloEl.textContent = `Resultados da busca (${encontrados.length})`;
    gridEl.innerHTML = '';
    if (!encontrados.length) { gridEl.innerHTML = `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nenhum resultado encontrado.</div>`; return; }
    encontrados.forEach(r => gridEl.appendChild(renderAmbienteCard(r.colecao, r.item, r.tag)));
  }

  // ── PAINEL DE DETALHE (compartilhado) ──────────────────────────────
  let _equipAtual = null; // { tipo, item }

  const EQUIP_SECOES_TODAS = ['secao-armas', 'secao-armaduras', 'secao-itens-gerais', 'secao-modificadores', 'secao-armas-magicas', 'secao-armaduras-magicas', 'secao-pocoes-pergaminhos', 'secao-acessorios', 'secao-artefatos'];

  // ── CALCULADORA DE ITEM SUPERIOR (melhorias + material especial) ──
  let _equipMelhoriasSelecionadas = new Set();
  let _equipMateriaisSelecionados = new Set();
  let _equipEncantosSelecionados = new Set();
  let _equipModCalcTab = 'melhorias';

  const LIMITE_MELHORIAS = 4;
  const LIMITE_ENCANTOS = 3; // Tabela 8-7 oficial só vai até 3

  function limiteMateriais(tipo, item) {
    return (tipo === 'arma' && item.habilidades && item.habilidades.includes('dupla')) ? 2 : 1;
  }

  function melhoriasCompativeis(tipo, item) {
    return (window.MELHORIAS || []).filter(m => {
      if (m.id === 'material-especial') return false;
      const categoriaOk = m.categorias.includes('qualquer')
        || (tipo === 'arma' && m.categorias.includes('arma'))
        || (tipo === 'armadura' && item.categoria === 'escudo' && m.categorias.includes('escudo'))
        || (tipo === 'armadura' && item.categoria !== 'escudo' && m.categorias.includes('armadura'));
      if (!categoriaOk) return false;
      const r = m.restricao;
      if (!r) return true;
      if (r.requerTipoAtaque && item.tipoAtaque !== r.requerTipoAtaque) return false;
      if (r.excluirArmaIds && r.excluirArmaIds.includes(item.id)) return false;
      if (r.requerCategoriaArmadura && item.categoria !== r.requerCategoriaArmadura) return false;
      return true;
    });
  }

  function encantosCompativeis(tipo, item) {
    if (tipo === 'arma') return window.ENCANTOS_ARMA || [];
    return (window.ENCANTOS_ARMADURA || []).filter(e =>
      item.categoria === 'escudo' ? e.aplicavel.includes('escudo') : e.aplicavel.includes('armadura')
    );
  }

  function encantoHabilitado(e, lista) {
    if (e.preRequisito) {
      const prereq = lista.find(x => x.nome === e.preRequisito);
      if (prereq && !_equipEncantosSelecionados.has(prereq.id)) return false;
    }
    return true;
  }

  function melhoriaHabilitada(m) {
    if (m.preRequisito && m.preRequisito !== 'outra melhoria qualquer') {
      const prereqMelhoria = (window.MELHORIAS || []).find(x => x.nome === m.preRequisito);
      if (prereqMelhoria && !_equipMelhoriasSelecionadas.has(prereqMelhoria.id)) return false;
    }
    if (m.restricao?.requerQualquerOutra && _equipMelhoriasSelecionadas.size === 0) return false;
    return true;
  }

  function precoAdicionalMaterial(materialId, tipo, item) {
    const mat = (window.MATERIAIS_ESPECIAIS || []).find(x => x.id === materialId);
    if (!mat) return 0;
    if (tipo === 'arma') return mat.precoAdicional.arma || 0;
    if (item.categoria === 'escudo') return mat.precoAdicional.escudo || 0;
    if (item.categoria === 'leve') return mat.precoAdicional.armaduraLeve || 0;
    if (item.categoria === 'pesada') return mat.precoAdicional.armaduraPesada || 0;
    return 0;
  }

  function calcularTotalItemSuperior(tipo, item) {
    const precoBase = precoParaNumero(item.preco);
    const nMelhoriasPuras = _equipMelhoriasSelecionadas.size;
    const nMateriais = _equipMateriaisSelecionados.size;
    const nMelhorias = nMelhoriasPuras + nMateriais; // material especial conta como melhoria pro limite e pra faixa de preço
    const listaEncantos = tipo === 'arma' ? (window.ENCANTOS_ARMA || []) : (window.ENCANTOS_ARMADURA || []);
    const nEncantos = [..._equipEncantosSelecionados].reduce((soma, id) => {
      const e = listaEncantos.find(x => x.id === id);
      return soma + (e ? e.custoEncantos : 1);
    }, 0);

    const faixaM = nMelhorias > 0 ? PRECO_POR_MELHORIA[Math.min(nMelhorias, 4) - 1] : null;
    const melhoriaAdicional = faixaM ? faixaM.aumentoPreco : 0;
    const melhoriaCd = faixaM ? faixaM.aumentoCD : 0;

    const faixaE = nEncantos > 0 ? PRECO_POR_ENCANTO[Math.min(nEncantos, 3) - 1] : null;
    const encantoAdicional = faixaE ? faixaE.aumentoPreco : 0;
    const encantoCd = faixaE ? faixaE.aumentoCD : 0;

    const materialAdicional = [..._equipMateriaisSelecionados].reduce((soma, id) => soma + precoAdicionalMaterial(id, tipo, item), 0);

    const adicional = melhoriaAdicional + encantoAdicional + materialAdicional;
    return {
      precoTotal: precoBase + adicional, precoAdicional: adicional,
      cdAdicional: melhoriaCd + encantoCd, n: nMelhorias, nEnc: nEncantos, nMat: nMateriais,
    };
  }

  function renderLinhaMelhoria(m) {
    const sel = _equipMelhoriasSelecionadas.has(m.id);
    const noLimite = !sel && (_equipMelhoriasSelecionadas.size + _equipMateriaisSelecionados.size) >= LIMITE_MELHORIAS;
    const habilitada = sel || (melhoriaHabilitada(m) && !noLimite);
    return `
      <div class="eq-melhoria-linha ${sel ? 'selecionada' : ''}" style="${habilitada ? '' : 'opacity:.4;cursor:not-allowed;'}" onclick="${habilitada ? `toggleMelhoriaEquip('${m.id}')` : ''}">
        <div class="eq-melhoria-check">${sel ? '<i class="ti ti-check" aria-hidden="true"></i>' : ''}</div>
        <div class="eq-melhoria-corpo">
          <div class="eq-melhoria-nome">${m.nome}${m.preRequisito ? `<span class="eq-melhoria-prereq">Requer: ${m.preRequisito}</span>` : ''}</div>
          <div class="eq-melhoria-texto">${m.efeito}</div>
        </div>
      </div>`;
  }

  function renderLinhaEncanto(e, lista) {
    const sel = _equipEncantosSelecionados.has(e.id);
    const pesoAtual = [..._equipEncantosSelecionados].reduce((soma, id) => {
      const x = lista.find(y => y.id === id);
      return soma + (x ? x.custoEncantos : 1);
    }, 0);
    const estouraLimite = !sel && (pesoAtual + e.custoEncantos > LIMITE_ENCANTOS);
    const habilitada = sel || (encantoHabilitado(e, lista) && !estouraLimite);
    return `
      <div class="eq-melhoria-linha ${sel ? 'selecionada' : ''}" style="${habilitada ? '' : 'opacity:.4;cursor:not-allowed;'}" onclick="${habilitada ? `toggleEncantoEquip('${e.id}')` : ''}">
        <div class="eq-melhoria-check">${sel ? '<i class="ti ti-check" aria-hidden="true"></i>' : ''}</div>
        <div class="eq-melhoria-corpo">
          <div class="eq-melhoria-nome">${e.nome}${e.custoEncantos === 2 ? ' <span class="eq-hab-tag">2 encantos</span>' : ''}${e.preRequisito ? `<span class="eq-melhoria-prereq">Requer: ${e.preRequisito}</span>` : ''}</div>
          <div class="eq-melhoria-texto">${e.efeito}</div>
        </div>
      </div>`;
  }

  function materialAplicavel(mat, tipo, item) {
    if (tipo === 'arma') return mat.precoAdicional.arma != null;
    if (item.categoria === 'escudo') return mat.precoAdicional.escudo != null;
    if (item.categoria === 'leve') return mat.precoAdicional.armaduraLeve != null;
    if (item.categoria === 'pesada') return mat.precoAdicional.armaduraPesada != null;
    return false;
  }

  function renderSeletorMaterialTab(tipo, item) {
    const materiais = (window.MATERIAIS_ESPECIAIS || []).filter(mat => materialAplicavel(mat, tipo, item));
    const limite = limiteMateriais(tipo, item);
    const combinadoNoLimite = (_equipMelhoriasSelecionadas.size + _equipMateriaisSelecionados.size) >= LIMITE_MELHORIAS;
    const pills = materiais.map(mat => {
      const ativa = _equipMateriaisSelecionados.has(mat.id);
      const noLimite = !ativa && (_equipMateriaisSelecionados.size >= limite || combinadoNoLimite);
      return `<button class="mg-opcao-pill ${ativa ? 'ativa' : ''}" style="${noLimite ? 'opacity:.4;cursor:not-allowed;' : ''}" onclick="${noLimite ? '' : `selecionarMaterialEquip('${mat.id}')`}">${mat.nome}</button>`;
    }).join('');
    const selecionados = [..._equipMateriaisSelecionados].map(id => materiais.find(m => m.id === id)).filter(Boolean);
    const notaDupla = limite === 2 ? ' Esta arma tem a habilidade dupla — pode escolher até 2 materiais (um pra cada ponta).' : '';
    const linhaTexto = selecionados.length
      ? selecionados.map(m => `${m.nome} (+T$ ${precoAdicionalMaterial(m.id, tipo, item).toLocaleString('pt-BR')})`).join(' + ')
      : 'Nenhum material selecionado.';
    return `
      <div class="mg-opcoes-pills">${pills}</div>
      <div class="eq-melhoria-texto" style="margin-top:8px;">${linhaTexto}${notaDupla} <span style="color:#666">(conta como melhoria)</span></div>`;
  }

  window.setModCalcTab = function(btn, cat) {
    if (cat === 'maldicoes') return;
    _equipModCalcTab = cat;
    renderCorpoEquip();
  };

  window.toggleEncantoEquip = function(encantoId) {
    const lista = _equipAtual.tipo === 'arma' ? (window.ENCANTOS_ARMA || []) : (window.ENCANTOS_ARMADURA || []);
    const e = lista.find(x => x.id === encantoId);
    if (_equipEncantosSelecionados.has(encantoId)) {
      _equipEncantosSelecionados.delete(encantoId);
    } else {
      if (e && !encantoHabilitado(e, lista)) return;
      const pesoAtual = [..._equipEncantosSelecionados].reduce((soma, id) => {
        const x = lista.find(y => y.id === id);
        return soma + (x ? x.custoEncantos : 1);
      }, 0);
      if (pesoAtual + (e ? e.custoEncantos : 1) > LIMITE_ENCANTOS) return;
      _equipEncantosSelecionados.add(encantoId);
    }
    renderCorpoEquip();
  };

  function renderCalculadoraItemSuperior(tipo, item) {
    const totais = calcularTotalItemSuperior(tipo, item);
    const limiteMat = limiteMateriais(tipo, item);

    const tabsHtml = `
      <div class="eq-modtabs">
        <button class="eq-modtab-btn ${_equipModCalcTab === 'melhorias' ? 'a' : ''}" data-cat="melhorias" onclick="setModCalcTab(this,'melhorias')">Melhorias <span class="eq-modtab-contador">${totais.n}/${LIMITE_MELHORIAS}</span></button>
        <button class="eq-modtab-btn ${_equipModCalcTab === 'encantamentos' ? 'a' : ''}" data-cat="encantamentos" onclick="setModCalcTab(this,'encantamentos')">Encantamentos <span class="eq-modtab-contador">${totais.nEnc}/${LIMITE_ENCANTOS}</span></button>
        <button class="eq-modtab-btn ${_equipModCalcTab === 'materiais' ? 'a' : ''}" data-cat="materiais" onclick="setModCalcTab(this,'materiais')">Materiais Especiais <span class="eq-modtab-contador">${totais.nMat}/${limiteMat}</span></button>
        <button class="eq-modtab-btn desabilitado" data-cat="maldicoes" title="Em breve">Maldições</button>
      </div>`;

    let corpoAba;
    if (_equipModCalcTab === 'encantamentos') {
      const lista = tipo === 'arma' ? (window.ENCANTOS_ARMA || []) : (window.ENCANTOS_ARMADURA || []);
      const compat = encantosCompativeis(tipo, item);
      const notaDuplaEncanto = (tipo === 'arma' && item.habilidades && item.habilidades.includes('dupla'))
        ? '<div class="eq-melhoria-texto" style="margin-bottom:8px;">Esta arma tem a habilidade dupla — você pode aplicar encantamentos diferentes em cada ponta, mas o total ainda conta pro mesmo limite de 3 encantamentos.</div>'
        : '';
      corpoAba = notaDuplaEncanto + (compat.length ? compat.map(e => renderLinhaEncanto(e, lista)).join('') : '<div class="eq-melhoria-texto">Nenhum encantamento aplicável a este item.</div>');
    } else if (_equipModCalcTab === 'materiais') {
      corpoAba = renderSeletorMaterialTab(tipo, item);
    } else if (_equipModCalcTab === 'maldicoes') {
      corpoAba = '<div class="eq-melhoria-texto">Em breve.</div>';
    } else {
      const compat = melhoriasCompativeis(tipo, item);
      corpoAba = compat.length ? compat.map(m => renderLinhaMelhoria(m)).join('') : '<div class="eq-melhoria-texto">Nenhuma melhoria aplicável a este item.</div>';
    }

    return `
      <div class="dp-secao">Modificar Item</div>
      ${tabsHtml}
      <div class="eq-melhorias-wrap" id="eqMelhoriasWrap">${corpoAba}</div>
      <div class="eq-total-box">
        <span>+${totais.cdAdicional} CD de fabricação</span>
        <span class="valor">T$ ${totais.precoTotal.toLocaleString('pt-BR')}</span>
      </div>`;
  }

  window.toggleMelhoriaEquip = function(melhoriaId) {
    const m = (window.MELHORIAS || []).find(x => x.id === melhoriaId);
    if (_equipMelhoriasSelecionadas.has(melhoriaId)) {
      _equipMelhoriasSelecionadas.delete(melhoriaId);
    } else {
      if (_equipMelhoriasSelecionadas.size + _equipMateriaisSelecionados.size >= LIMITE_MELHORIAS) return;
      if (m && !melhoriaHabilitada(m)) return;
      if (m?.restricao?.exclusivaCom) _equipMelhoriasSelecionadas.delete(m.restricao.exclusivaCom);
      _equipMelhoriasSelecionadas.add(melhoriaId);
    }
    renderCorpoEquip();
  };

  window.selecionarMaterialEquip = function(materialId) {
    const { tipo, item } = _equipAtual;
    if (_equipMateriaisSelecionados.has(materialId)) {
      _equipMateriaisSelecionados.delete(materialId);
    } else {
      const mat = (window.MATERIAIS_ESPECIAIS || []).find(x => x.id === materialId);
      if (mat && !materialAplicavel(mat, tipo, item)) return;
      if (_equipMateriaisSelecionados.size >= limiteMateriais(tipo, item)) return;
      if (_equipMelhoriasSelecionadas.size + _equipMateriaisSelecionados.size >= LIMITE_MELHORIAS) return;
      _equipMateriaisSelecionados.add(materialId);
    }
    renderCorpoEquip();
  };

  function renderCorpoEquip() {
    const { tipo, item } = _equipAtual;
    const kw = typeof processarKeywords === 'function' ? processarKeywords : (t) => t;
    const body = document.getElementById('eqBody');
    const precoFixoEl = document.getElementById('eqPrecoFixo');
    if (precoFixoEl) {
      if (tipo === 'arma' || tipo === 'armadura') {
        const totais = calcularTotalItemSuperior(tipo, item);
        precoFixoEl.classList.toggle('ativo', totais.precoAdicional > 0);
        document.getElementById('eqPrecoFixoValor').textContent = `T$ ${totais.precoTotal.toLocaleString('pt-BR')}`;
        document.getElementById('eqPrecoFixoBase').textContent = `(base ${item.preco || 'Grátis'})`;
      } else {
        precoFixoEl.classList.remove('ativo');
      }
    }

    if (tipo === 'arma') {
      const municaoInfo = item.municao ? (window.MUNICOES || []).find(m => m.id === item.municao) : null;
      body.innerHTML = `
        <div class="dp-linha"></div>
        <div class="dp-badges">
          <span class="dp-badge" style="background:rgba(139,0,0,.1);color:#cc4444;border:.5px solid rgba(139,0,0,.3)">Tormenta 20</span>
          <span class="eq-categoria-tag">${CATEGORIA_ARMA_INFO[item.categoria].label}</span>
          ${item.habilidades.map(h => `<span class="eq-hab-tag">${HABILIDADE_ARMA_LABEL[h] || h}</span>`).join('')}
        </div>
        <div class="eq-stats-grid">
          <div><div class="eq-stat-l">Preço</div><div class="eq-stat-v preco">${item.preco || 'Grátis'}</div></div>
          <div><div class="eq-stat-l">Espaços</div><div class="eq-stat-v">${item.espacos}</div></div>
          <div><div class="eq-stat-l">Dano</div><div class="eq-stat-v">${item.dano || '—'}</div></div>
          <div><div class="eq-stat-l">Crítico</div><div class="eq-stat-v">${item.critico || '—'}</div></div>
          <div><div class="eq-stat-l">Alcance</div><div class="eq-stat-v">${item.alcance || 'Corpo a corpo'}</div></div>
          <div><div class="eq-stat-l">Tipo de Dano</div><div class="eq-stat-v">${item.tipoDano || '—'}</div></div>
        </div>
        ${municaoInfo ? `
        <div class="eq-municao-box">
          <i class="ti ti-package" aria-hidden="true"></i>
          <span>Usa <strong>${municaoInfo.nome}</strong> (${municaoInfo.preco}, ${municaoInfo.espacos} espaço) — clique pra ver detalhes</span>
        </div>` : ''}
        <p class="dp-desc">${kw(item.descricao)}</p>
        ${renderCalculadoraItemSuperior('arma', item)}
      `;
      if (municaoInfo) {
        body.querySelector('.eq-municao-box').style.cursor = 'pointer';
        body.querySelector('.eq-municao-box').onclick = () => abrirDetalheEquip('item-geral', municaoInfo.id, true);
      }
      return;
    }

    if (tipo === 'armadura') {
      body.innerHTML = `
        <div class="dp-linha"></div>
        <div class="dp-badges">
          <span class="dp-badge" style="background:rgba(139,0,0,.1);color:#cc4444;border:.5px solid rgba(139,0,0,.3)">Tormenta 20</span>
          <span class="eq-categoria-tag">${CATEGORIA_ARMADURA_INFO[item.categoria].label}</span>
        </div>
        <div class="eq-stats-grid">
          <div><div class="eq-stat-l">Preço</div><div class="eq-stat-v preco">${item.preco}</div></div>
          <div><div class="eq-stat-l">Espaços</div><div class="eq-stat-v">${item.espacos}</div></div>
          <div><div class="eq-stat-l">Bônus na Defesa</div><div class="eq-stat-v">+${item.bonusDefesa}</div></div>
          <div><div class="eq-stat-l">Penalidade de Armadura</div><div class="eq-stat-v">${item.penalidadeArmadura}</div></div>
        </div>
        <p class="dp-desc">${kw(item.descricao)}</p>
        ${renderCalculadoraItemSuperior('armadura', item)}
      `;
      return;
    }

    if (tipo === 'item-geral') {
      body.innerHTML = `
        <div class="dp-linha"></div>
        <div class="dp-badges">
          <span class="dp-badge" style="background:rgba(139,0,0,.1);color:#cc4444;border:.5px solid rgba(139,0,0,.3)">Tormenta 20</span>
          <span class="eq-categoria-tag">${CATEGORIA_ITEM_GERAL_INFO[item.categoria] || item.categoria}</span>
        </div>
        <div class="eq-stats-grid">
          <div><div class="eq-stat-l">Preço</div><div class="eq-stat-v preco">${item.preco}</div></div>
          <div><div class="eq-stat-l">Espaços</div><div class="eq-stat-v">${item.espacos != null ? item.espacos : '—'}</div></div>
        </div>
        <p class="dp-desc">${kw(item.descricao)}</p>
      `;
      return;
    }

    if (tipo === 'melhoria') {
      body.innerHTML = `
        <div class="dp-linha"></div>
        <div class="dp-badges">
          <span class="dp-badge" style="background:rgba(139,0,0,.1);color:#cc4444;border:.5px solid rgba(139,0,0,.3)">Tormenta 20</span>
          ${item.categorias.map(c => `<span class="eq-categoria-tag">${c === 'qualquer' ? 'Qualquer categoria' : (CATEGORIA_ARMA_INFO[c]?.label || CATEGORIA_ARMADURA_INFO[c]?.label || c)}</span>`).join('')}
        </div>
        ${item.preRequisito ? `<div class="eq-melhoria-prereq" style="margin-bottom:10px;">Pré-requisito: ${item.preRequisito}</div>` : ''}
        <p class="dp-desc">${kw(item.descricao)}</p>
      `;
      return;
    }

    if (tipo === 'material') {
      body.innerHTML = `
        <div class="dp-linha"></div>
        <p class="dp-desc">${kw(item.descricao)}</p>
        <div class="dp-secao">Efeito em Armas</div>
        <p class="dp-desc" style="margin-bottom:10px;">${kw(item.efeitos.arma)} <span class="eq-hab-tag">+T$ ${item.precoAdicional.arma}</span></p>
        <div class="dp-secao">Efeito em Armaduras &amp; Escudos</div>
        <p class="dp-desc" style="margin-bottom:10px;">${kw(item.efeitos.armaduraEscudo)} <span class="eq-hab-tag">Leve/Escudo +T$ ${item.precoAdicional.armaduraLeve ?? '—'} · Pesada +T$ ${item.precoAdicional.armaduraPesada ?? '—'}</span></p>
        <div class="dp-secao">Efeito em Esotéricos</div>
        <p class="dp-desc">${kw(item.efeitos.esoterico)} <span class="eq-hab-tag">+T$ ${item.precoAdicional.esoterico}</span></p>
      `;
      return;
    }

    if (tipo === 'encanto-arma') {
      body.innerHTML = `
        <div class="dp-linha"></div>
        <div class="dp-badges">
          <span class="dp-badge" style="background:rgba(139,0,0,.1);color:#cc4444;border:.5px solid rgba(139,0,0,.3)">Tormenta 20</span>
          <span class="eq-categoria-tag">${item.custoEncantos === 2 ? 'Conta como 2 encantos' : '1 encanto'}</span>
        </div>
        <div class="eq-stats-grid" style="grid-template-columns:1fr;">
          <div><div class="eq-stat-l">Efeito resumido</div><div class="eq-stat-v">${item.efeito}</div></div>
        </div>
        ${item.preRequisito ? `<div class="eq-melhoria-prereq" style="margin-bottom:10px;">Pré-requisito: ${item.preRequisito}</div>` : ''}
        <p class="dp-desc">${kw(item.descricao)}</p>
      `;
      return;
    }

    function renderTagsFixas(item, tipoBase) {
      const encantosLista = tipoBase === 'arma' ? (window.ENCANTOS_ARMA || []) : (window.ENCANTOS_ARMADURA || []);
      const tagsEncantos = (item.encantosFixos || []).map(id => {
        const e = encantosLista.find(x => x.id === id);
        return e ? `<span class="eq-categoria-tag mod-tag-encantamento">${e.nome}</span>` : '';
      }).join('');
      const tagsMelhorias = (item.melhoriasFixas || []).map(id => {
        const m = (window.MELHORIAS || []).find(x => x.id === id);
        return m ? `<span class="eq-categoria-tag mod-tag-melhoria">${m.nome}</span>` : '';
      }).join('');
      const mat = item.materialFixo ? (window.MATERIAIS_ESPECIAIS || []).find(x => x.id === item.materialFixo) : null;
      const tagMaterial = mat ? `<span class="eq-categoria-tag mod-tag-material">${mat.nome}</span>` : '';
      return tagsEncantos + tagsMelhorias + tagMaterial;
    }

    if (tipo === 'arma-especifica') {
      const base = (window.ARMAS || []).find(x => x.id === item.baseId);
      const tagsFixas = renderTagsFixas(item, 'arma');
      body.innerHTML = `
        <div class="dp-linha"></div>
        <div class="dp-badges">
          <span class="dp-badge" style="background:rgba(139,0,0,.1);color:#cc4444;border:.5px solid rgba(139,0,0,.3)">Tormenta 20</span>
          <span class="eq-categoria-tag">Base: ${base ? base.nome : '—'}</span>
        </div>
        <div class="eq-stats-grid">
          <div><div class="eq-stat-l">Preço</div><div class="eq-stat-v preco">${item.preco}</div></div>
          <div><div class="eq-stat-l">Espaços</div><div class="eq-stat-v">${base ? base.espacos : '—'}</div></div>
          <div><div class="eq-stat-l">Dano</div><div class="eq-stat-v">${base ? (base.dano || '—') : '—'}</div></div>
          <div><div class="eq-stat-l">Crítico</div><div class="eq-stat-v">${base ? (base.critico || '—') : '—'}</div></div>
          <div><div class="eq-stat-l">Alcance</div><div class="eq-stat-v">${base ? (base.alcance || 'Corpo a corpo') : '—'}</div></div>
          <div><div class="eq-stat-l">Tipo de Dano</div><div class="eq-stat-v">${base ? (base.tipoDano || '—') : '—'}</div></div>
        </div>
        <p class="dp-desc">${kw(item.descricao)}</p>
        ${tagsFixas ? `<div class="eq-tags-fixas" style="margin:2px 0 12px;">${tagsFixas}</div>` : ''}
        ${item.especial ? `<div class="dp-secao">Especial</div><p class="dp-desc">${kw(item.especial)}</p>` : ''}
      `;
      return;
    }

    if (tipo === 'encanto-armadura') {
      body.innerHTML = `
        <div class="dp-linha"></div>
        <div class="dp-badges">
          <span class="dp-badge" style="background:rgba(139,0,0,.1);color:#cc4444;border:.5px solid rgba(139,0,0,.3)">Tormenta 20</span>
          <span class="eq-categoria-tag">${item.custoEncantos === 2 ? 'Conta como 2 encantos' : '1 encanto'}</span>
          ${item.aplicavel.length === 1 ? `<span class="eq-categoria-tag">Só ${item.aplicavel[0] === 'escudo' ? 'escudos' : 'armaduras'}</span>` : ''}
        </div>
        <div class="eq-stats-grid" style="grid-template-columns:1fr;">
          <div><div class="eq-stat-l">Efeito resumido</div><div class="eq-stat-v">${item.efeito}</div></div>
        </div>
        ${item.preRequisito ? `<div class="eq-melhoria-prereq" style="margin-bottom:10px;">Pré-requisito: ${item.preRequisito}</div>` : ''}
        <p class="dp-desc">${kw(item.descricao)}</p>
      `;
      return;
    }

    if (tipo === 'armadura-especifica') {
      const base = (window.ARMADURAS || []).find(x => x.id === item.baseId);
      const tagsFixas = renderTagsFixas(item, 'armadura');
      body.innerHTML = `
        <div class="dp-linha"></div>
        <div class="dp-badges">
          <span class="dp-badge" style="background:rgba(139,0,0,.1);color:#cc4444;border:.5px solid rgba(139,0,0,.3)">Tormenta 20</span>
          <span class="eq-categoria-tag">${item.tipo === 'escudo' ? 'Escudo' : 'Armadura'}</span>
          <span class="eq-categoria-tag">Base: ${base ? base.nome : '—'}</span>
        </div>
        <div class="eq-stats-grid">
          <div><div class="eq-stat-l">Preço</div><div class="eq-stat-v preco">${item.preco}</div></div>
          <div><div class="eq-stat-l">Espaços</div><div class="eq-stat-v">${base ? base.espacos : '—'}</div></div>
          <div><div class="eq-stat-l">Bônus na Defesa</div><div class="eq-stat-v">+${base ? base.bonusDefesa : '—'}</div></div>
          <div><div class="eq-stat-l">Penalidade de Armadura</div><div class="eq-stat-v">${base ? base.penalidadeArmadura : '—'}</div></div>
        </div>
        <p class="dp-desc">${kw(item.descricao)}</p>
        ${tagsFixas ? `<div class="eq-tags-fixas" style="margin:2px 0 12px;">${tagsFixas}</div>` : ''}
        ${item.especial ? `<div class="dp-secao">Especial</div><p class="dp-desc">${kw(item.especial)}</p>` : ''}
      `;
      return;
    }

    if (tipo === 'pocao-catalogo') {
      const m = (window.MAGIAS || []).find(x => x.id === item.magiaId);
      body.innerHTML = `
        <div class="dp-linha"></div>
        <div class="dp-badges">
          <span class="dp-badge" style="background:rgba(139,0,0,.1);color:#cc4444;border:.5px solid rgba(139,0,0,.3)">Tormenta 20</span>
          <span class="eq-categoria-tag"><i class="ti ${FORMATO_ICONE[item.formato] || 'ti-flask'}" aria-hidden="true"></i> ${item.formato}</span>
          ${m ? `<span class="eq-categoria-tag">${m.circulo}º círculo</span>` : ''}
        </div>
        <div class="eq-stats-grid" style="grid-template-columns:1fr;">
          <div><div class="eq-stat-l">Preço</div><div class="eq-stat-v preco">${item.preco}</div></div>
        </div>
        ${item.notaAprimoramento ? `<div class="eq-melhoria-prereq" style="margin-bottom:10px;">Aprimoramento aplicado: ${item.notaAprimoramento}</div>` : ''}
        ${m ? `<p class="dp-desc">${kw(m.descricao)}</p>` : `<p class="dp-desc">Esta magia ainda não foi localizada na nossa base — pendência de extração, sem afetar o resto do catálogo.</p>`}
      `;
      return;
    }

    if (tipo === 'acessorio') {
      body.innerHTML = `
        <div class="dp-linha"></div>
        <div class="dp-badges">
          <span class="dp-badge" style="background:rgba(139,0,0,.1);color:#cc4444;border:.5px solid rgba(139,0,0,.3)">Tormenta 20</span>
          <span class="eq-categoria-tag">${CATEGORIA_ACESSORIO_INFO[item.categoria]}</span>
        </div>
        <div class="eq-stats-grid" style="grid-template-columns:1fr;">
          <div><div class="eq-stat-l">Preço</div><div class="eq-stat-v preco">${item.preco}</div></div>
        </div>
        <p class="dp-desc">${kw(item.descricao)}</p>
      `;
      return;
    }

    if (tipo === 'artefato') {
      const paragrafos = item.descricao.split('\n\n').map(p => `<p class="dp-desc" style="margin-bottom:10px;">${kw(p)}</p>`).join('');
      body.innerHTML = `
        <div class="dp-linha"></div>
        <div class="dp-badges">
          <span class="dp-badge" style="background:rgba(139,0,0,.1);color:#cc4444;border:.5px solid rgba(139,0,0,.3)">Tormenta 20</span>
          <span class="eq-categoria-tag">Artefato</span>
        </div>
        ${paragrafos}
        ${item.tabela ? renderTabelaUso(item.tabela) : ''}
      `;
      return;
    }

    if (tipo === 'pocao-criada') {
      const m = (window.MAGIAS || []).find(x => x.id === item.magiaId);
      body.innerHTML = `
        <div class="dp-linha"></div>
        <div class="dp-badges">
          <span class="dp-badge" style="background:rgba(94,200,216,.1);color:#5ec8d8;border:.5px solid rgba(94,200,216,.3)">Simulação da sessão</span>
          <span class="eq-categoria-tag"><i class="ti ${item.formato === 'pergaminho' ? 'ti-scroll' : 'ti-flask'}" aria-hidden="true"></i> ${item.formato === 'pergaminho' ? 'Pergaminho' : 'Poção'}</span>
          <span class="eq-categoria-tag">${item.circulo}º círculo</span>
        </div>
        <div class="eq-stats-grid">
          <div><div class="eq-stat-l">Preço</div><div class="eq-stat-v preco">T$ ${item.preco.toLocaleString('pt-BR')}</div></div>
          <div><div class="eq-stat-l">PM total</div><div class="eq-stat-v">${item.pm}</div></div>
          <div><div class="eq-stat-l">Categoria</div><div class="eq-stat-v">${item.categoria}</div></div>
          <div><div class="eq-stat-l">CD de fabricação</div><div class="eq-stat-v">${item.cd}</div></div>
        </div>
        ${m ? `<p class="dp-desc">${kw(m.descricao)}</p>` : `<p class="dp-desc">Esta magia não foi encontrada na nossa base.</p>`}
        <button class="pg-modo-btn" style="width:100%;margin-top:10px;padding:9px;" onclick="removerItemCriado(${item.id}); fecharDetalheEquip();">
          <i class="ti ti-trash" aria-hidden="true"></i> Remover este item
        </button>
      `;
      return;
    }
  }

  window.abrirDetalheEquip = function(tipo, id) {
    let item = null;
    let icone = 'ti-diamond', tipoLabel = 'Equipamento';
    if (tipo === 'arma') { item = (window.ARMAS || []).find(x => x.id === id); icone = 'ti-sword'; tipoLabel = 'Arma'; }
    else if (tipo === 'armadura') { item = (window.ARMADURAS || []).find(x => x.id === id); icone = 'ti-shield'; tipoLabel = 'Armadura/Escudo'; }
    else if (tipo === 'item-geral') { item = (window.ITENS_GERAIS || []).find(x => x.id === id); icone = 'ti-backpack'; tipoLabel = 'Item Geral'; }
    else if (tipo === 'melhoria') { item = (window.MELHORIAS || []).find(x => x.id === id); icone = 'ti-star'; tipoLabel = 'Melhoria'; }
    else if (tipo === 'material') { item = (window.MATERIAIS_ESPECIAIS || []).find(x => x.id === id); icone = 'ti-atom'; tipoLabel = 'Material Especial'; }
    else if (tipo === 'encanto-arma') { item = (window.ENCANTOS_ARMA || []).find(x => x.id === id); icone = 'ti-wand'; tipoLabel = 'Encanto de Arma'; }
    else if (tipo === 'arma-especifica') { item = (window.ARMAS_ESPECIFICAS || []).find(x => x.id === id); icone = 'ti-sword'; tipoLabel = 'Arma Específica'; }
    else if (tipo === 'encanto-armadura') { item = (window.ENCANTOS_ARMADURA || []).find(x => x.id === id); icone = 'ti-shield-half'; tipoLabel = 'Encanto de Armadura/Escudo'; }
    else if (tipo === 'armadura-especifica') { item = (window.ARMADURAS_ESCUDOS_ESPECIFICOS || []).find(x => x.id === id); icone = 'ti-shield'; tipoLabel = 'Armadura/Escudo Específico'; }
    else if (tipo === 'pocao-catalogo') { item = (window.POCOES_CATALOGO || []).find(x => x.id === id); icone = 'ti-flask'; tipoLabel = 'Poção/Pergaminho'; }
    else if (tipo === 'acessorio') { item = (window.ACESSORIOS || []).find(x => x.id === id); icone = 'ti-jewelry'; tipoLabel = 'Acessório'; }
    else if (tipo === 'artefato') { item = (window.ARTEFATOS || []).find(x => x.id === id); icone = 'ti-flame'; tipoLabel = 'Artefato'; }
    else if (tipo === 'pocao-criada') { item = _itensCriadosPocoes.find(x => x.id === id); icone = item?.formato === 'pergaminho' ? 'ti-scroll' : 'ti-flask'; tipoLabel = item?.formato === 'pergaminho' ? 'Pergaminho Criado' : 'Poção Criada'; }
    if (!item) return;

    _equipAtual = { tipo, item };
    _equipMelhoriasSelecionadas = new Set();
    _equipMateriaisSelecionados = new Set();
    _equipEncantosSelecionados = new Set();
    _equipModCalcTab = 'melhorias';

    document.getElementById('eqHeroIcon').className = `ti ${icone} dp-hero-icon`;
    document.getElementById('eqTipo').innerHTML = `<i class="ti ${icone}" aria-hidden="true"></i> ${tipoLabel}`;
    const nomeExibido = tipo === 'pocao-catalogo'
      ? ((window.MAGIAS || []).find(m => m.id === item.magiaId)?.nome || '(magia não identificada)')
      : tipo === 'pocao-criada' ? item.magiaNome : item.nome;
    document.getElementById('eqNome').textContent = nomeExibido;
    document.getElementById('eqSub').textContent = (tipo === 'arma' || tipo === 'armadura') ? '' : (tipo === 'pocao-criada' ? `T$ ${item.preco.toLocaleString('pt-BR')}` : (item.preco || item.efeito || (item.categorias ? item.categorias.join(', ') : '')));

    renderCorpoEquip();

    document.querySelectorAll('.eq-card').forEach(c => c.classList.remove('selecionado'));
    document.querySelector(`.eq-card[data-id="${id}"]`)?.classList.add('selecionado');

    document.getElementById('equipPainel').classList.add('aberto');
    EQUIP_SECOES_TODAS.forEach(s => {
      const el = document.getElementById(s);
      if (el && el.style.display !== 'none') {
        el.querySelector('.cards-area')?.classList.add('encolhido');
      }
    });
  };

  window.fecharDetalheEquip = function() {
    _fecharPainelDetalhe(
      document.getElementById('equipPainel'),
      EQUIP_SECOES_TODAS.map(s => `#${s} .cards-area`).join(', '),
      '.eq-card'
    );
  };

  // Clique num nome de equipamento citado em qualquer descrição do site
  // (kw-item) leva pra seção certa, com a busca já preenchida, e abre o
  // painel de detalhe direto — mesmo padrão do irParaMagia/irParaPoderGeral.
  // Só o campo `lista` é usado de verdade (por BLOCO_REF_TIPOS.item.buscar,
  // em abrirBlocoReferencia — ver compendio.js mais abaixo). Os campos
  // `secao`, `estado`, `render`, `buscaId` e `filtroGrupos` que existiam
  // aqui eram sobra de um design mais antigo, de antes de
  // abrirBlocoReferencia existir, quando uma referência a item navegava pra
  // a seção (via irParaItem, removida em 23/ago — ver comentário logo
  // abaixo) e por isso precisava saber pra qual seção ir, qual filtro
  // ativar etc. Confirmado com grep (23/ago) que nada no site lê mais
  // esses campos — removidos. Se um dia precisarmos native navegar pra a
  // seção de novo, é só adicionar de volta aqui, não precisa reinventar.
  const ITEM_TIPO_CONFIG = {
    'arma': { lista: () => window.ARMAS },
    'armadura': { lista: () => window.ARMADURAS },
    'item-geral': { lista: () => (window.ITENS_GERAIS || []).concat(window.MUNICOES || []) },
    'melhoria': { lista: () => window.MELHORIAS },
    'material': { lista: () => window.MATERIAIS_ESPECIAIS },
    'encanto-arma': { lista: () => window.ENCANTOS_ARMA },
    'encanto-armadura': { lista: () => window.ENCANTOS_ARMADURA },
    'arma-especifica': { lista: () => window.ARMAS_ESPECIFICAS },
    'armadura-especifica': { lista: () => window.ARMADURAS_ESCUDOS_ESPECIFICOS },
    'acessorio': { lista: () => window.ACESSORIOS },
    'artefato': { lista: () => window.ARTEFATOS },
  };

  // irParaItem() foi removida em 23/ago — navegava pra fora (mostrarSecao +
  // filtro) quando um item era citado em texto; substituída por
  // abrirBlocoReferencia('item', nome, tipo), que usa a mesma
  // ITEM_TIPO_CONFIG acima só pra achar o item, sem navegar. Sem nenhum
  // caller restante (confirmado com grep antes de remover).

  // ══════════════════ MAGIAS ══════════════════

  const ESCOLA_INFO = {
    abjuracao:    { label: 'Abjuração',    icone: 'ti-shield',   cor: '#5090c0' },
    adivinhacao:  { label: 'Adivinhação',  icone: 'ti-eye',      cor: '#c9a84c' },
    convocacao:   { label: 'Convocação',   icone: 'ti-transfer', cor: '#44aaee' },
    encantamento: { label: 'Encantamento', icone: 'ti-brain',    cor: '#cc66cc' },
    evocacao:     { label: 'Evocação',     icone: 'ti-flame',    cor: '#e09050' },
    ilusao:       { label: 'Ilusão',       icone: 'ti-mask',     cor: '#8888ff' },
    necromancia:  { label: 'Necromancia',  icone: 'ti-skull',    cor: '#9060c8' },
    transmutacao: { label: 'Transmutação', icone: 'ti-atom-2',   cor: '#50b870' },
  };
  const TIPO_MAGIA_INFO = {
    arcana:    { label: 'Arcana' },
    divina:    { label: 'Divina' },
    universal: { label: 'Universal' },
  };
  const MAGIA_SECAO_IDS = {
    todas:     { grid: 'magiasTodasGrid',     count: 'magiasTodasCount',     busca: 'buscaMagiasTodas',     filtroTipo: 'magiasTodasFiltroTipo', filtroCirculo: 'magiasTodasFiltroCirculo', filtroEscola: 'magiasTodasFiltroEscola' },
    arcana:    { grid: 'magiasArcanasGrid',   count: 'magiasArcanasCount',   busca: 'buscaMagiasArcanas',   filtroCirculo: 'magiasArcanasFiltroCirculo', filtroEscola: 'magiasArcanasFiltroEscola' },
    divina:    { grid: 'magiasDivinasGrid',   count: 'magiasDivinasCount',   busca: 'buscaMagiasDivinas',   filtroCirculo: 'magiasDivinasFiltroCirculo', filtroEscola: 'magiasDivinasFiltroEscola' },
    universal: { grid: 'magiasUniversalGrid', count: 'magiasUniversalCount', busca: 'buscaMagiasUniversal', filtroCirculo: 'magiasUniversalFiltroCirculo', filtroEscola: 'magiasUniversalFiltroEscola' },
  };
  const _magiaEstado = {
    todas:     { tipo: 'todos', circulo: 'todos', escola: 'todos', busca: '' },
    arcana:    { circulo: 'todos', escola: 'todos', busca: '' },
    divina:    { circulo: 'todos', escola: 'todos', busca: '' },
    universal: { circulo: 'todos', escola: 'todos', busca: '' },
  };

  function truncarTexto(txt, max) {
    if (!txt) return '';
    return txt.length > max ? txt.slice(0, max).trim() + '…' : txt;
  }

  function renderMagiaCard(m) {
    const esc = ESCOLA_INFO[m.escola] || { label: m.escola, icone: 'ti-sparkles', cor: '#888' };
    const card = document.createElement('div');
    card.className = 'magia-card';
    card.dataset.id = m.id;
    card.innerHTML = `
      <div class="mgc-top">
        <span class="mgc-escola" style="color:${esc.cor}"><i class="ti ${esc.icone}" aria-hidden="true"></i> ${esc.label}</span>
        <span class="mgc-tipo mgc-tipo-${m.tipo}">${TIPO_MAGIA_INFO[m.tipo].label}</span>
      </div>
      <div class="mgc-nome">${m.nome}</div>
      <div class="mgc-desc">${truncarTexto(m.descricao, 90)}</div>
      <div class="mgc-footer">
        <span class="mgc-stat"><i class="ti ti-orbit" aria-hidden="true"></i>${m.circulo}º</span>
        <span class="mgc-stat"><i class="ti ti-bolt" aria-hidden="true"></i>${m.execucao}</span>
        <span class="mgc-stat"><i class="ti ti-adjustments" aria-hidden="true"></i>${m.aprimoramentos.length}</span>
        <span class="rc-badge badge-fonte">Tormenta 20</span>
      </div>`;
    card.addEventListener('click', () => abrirDetalheMagia(m.id));
    return card;
  }

  function renderMagiasNaSecao(secaoTipo) {
    const ids = MAGIA_SECAO_IDS[secaoTipo];
    const grid = document.getElementById(ids.grid);
    if (!grid) return;

    const estado = _magiaEstado[secaoTipo];
    let lista = window.MAGIAS || [];

    if (secaoTipo !== 'todas') {
      lista = lista.filter(m => m.tipo === secaoTipo);
    } else if (estado.tipo !== 'todos') {
      lista = lista.filter(m => m.tipo === estado.tipo);
    }
    if (estado.circulo !== 'todos') {
      lista = lista.filter(m => m.circulo === parseInt(estado.circulo, 10));
    }
    if (estado.escola !== 'todos') {
      lista = lista.filter(m => m.escola === estado.escola);
    }
    if (estado.busca) {
      const t = estado.busca;
      lista = lista.filter(m =>
        m.nome.toLowerCase().includes(t) ||
        m.descricao.toLowerCase().includes(t) ||
        (m.alcance || '').toLowerCase().includes(t) ||
        (m.execucao || '').toLowerCase().includes(t) ||
        (m.resistencia || '').toLowerCase().includes(t)
      );
    }

    const countEl = document.getElementById(ids.count);
    if (countEl) countEl.textContent = lista.length + (lista.length !== 1 ? ' magias' : ' magia');

    grid.innerHTML = '';
    if (!lista.length) {
      grid.innerHTML = `<div class="cp-poderes-vazio" style="grid-column:1/-1">Nenhuma magia encontrada — lembre-se que só o 1º Círculo está completo por enquanto.</div>`;
      return;
    }
    lista.forEach(m => grid.appendChild(renderMagiaCard(m)));
  }

  window.setFiltroMagia = (secaoTipo, eixo, btn, valor) => {
    const ids = MAGIA_SECAO_IDS[secaoTipo];
    const grupoId = eixo === 'tipo' ? ids.filtroTipo : (eixo === 'circulo' ? ids.filtroCirculo : ids.filtroEscola);
    _ativarFiltroBtn(`#${grupoId}`, btn);
    _magiaEstado[secaoTipo][eixo] = valor;
    renderMagiasNaSecao(secaoTipo);
  };

  // ── Painel de detalhe de Magia (compartilhado pelas 4 seções) ──────
  let _magiaAtual = null;
  let _magiaSelecoes = []; // paralelo a aprimoramentos: quantidade selecionada (0 = não selecionado)

  function calcularPMTotalMagia() {
    const m = _magiaAtual;
    if (!m) return 0;
    const truqueIdx = m.aprimoramentos.findIndex(a => a.tipo === 'truque');
    if (truqueIdx !== -1 && _magiaSelecoes[truqueIdx] > 0) return 0;
    let total = CUSTO_POR_CIRCULO[m.circulo] || 0;
    m.aprimoramentos.forEach((a, i) => { total += (a.custoPM || 0) * _magiaSelecoes[i]; });
    return total;
  }

  // Detecta e separa "Requer Nº círculo." do texto do aprimoramento, pra
  // virar uma tag visual própria em vez de ficar perdido no meio da frase.
  function extrairRequerCirculo(efeito) {
    const match = efeito.match(/\s*Requer (\d)º círculo\.?\s*$/);
    if (!match) return { texto: efeito, circuloExigido: null };
    return { texto: efeito.slice(0, match.index).trim(), circuloExigido: parseInt(match[1], 10) };
  }

  function renderLinhaAprimoramento(a, i) {
    const qtd = _magiaSelecoes[i];
    const restricaoTag = a.restricao ? `<span class="mg-restricao">Apenas ${a.restricao === 'arcana' ? 'Arcanos' : 'Divinos'}</span>` : '';
    const { texto: efeitoLimpo, circuloExigido } = extrairRequerCirculo(a.efeito);
    const requerTag = circuloExigido ? `<span class="mg-requer"><i class="ti ti-lock" aria-hidden="true"></i>Requer ${circuloExigido}º Círculo</span>` : '';
    if (a.tipo === 'aumenta') {
      return `
        <div class="mg-aprim ${qtd ? 'selecionado' : ''}">
          <div class="mg-aprim-stepper">
            <button onclick="alterarAprimoramentoMagia(${i}, -1)" ${qtd === 0 ? 'disabled' : ''}>−</button>
            <span class="mg-aprim-qtd">${qtd}</span>
            <button onclick="alterarAprimoramentoMagia(${i}, 1)">+</button>
          </div>
          <div class="mg-aprim-corpo">
            <span class="mg-aprim-custo">+${a.custoPM} PM</span>${restricaoTag}${requerTag}
            <span class="mg-aprim-texto">${efeitoLimpo}</span>
          </div>
        </div>`;
    }
    const custoTag = a.tipo === 'truque'
      ? `<span class="mg-aprim-custo mg-aprim-truque">Truque</span>`
      : `<span class="mg-aprim-custo">+${a.custoPM} PM</span>`;
    const onclickFn = a.tipo === 'truque' ? `toggleAprimoramentoTruqueMagia(${i})` : `toggleAprimoramentoMudaMagia(${i})`;
    return `
      <div class="mg-aprim ${qtd ? 'selecionado' : ''}">
        <div class="mg-aprim-check" onclick="${onclickFn}">${qtd ? '<i class="ti ti-check" aria-hidden="true"></i>' : ''}</div>
        <div class="mg-aprim-corpo">
          ${custoTag}${restricaoTag}${requerTag}
          <span class="mg-aprim-texto">${efeitoLimpo}</span>
        </div>
      </div>`;
  }

  // Renderiza o seletor de "Efeitos à Escolha" (magias como Controlar Água,
  // Rogar Maldição, Aprisionamento etc. que oferecem vários efeitos nomeados
  // pra escolher ao lançar). Abas clicáveis, mostrando um efeito por vez.
  function renderOpcoesEscolha(opcoes) {
    const kw = typeof processarKeywords === 'function' ? processarKeywords : (t) => t;
    const pills = opcoes.map((o, i) =>
      `<button class="mg-opcao-pill ${i === 0 ? 'ativa' : ''}" data-oi="${i}" onclick="selecionarOpcaoMagia(this, ${i})">${o.nome}</button>`
    ).join('');
    const textos = opcoes.map((o, i) =>
      `<div class="mg-opcao-texto" data-oi="${i}" style="${i === 0 ? '' : 'display:none'}">${kw(o.descricao)}</div>`
    ).join('');
    return `
      <div class="dp-secao">Efeitos à Escolha</div>
      <div class="mg-opcoes-wrap">
        <div class="mg-opcoes-pills">${pills}</div>
        <div class="mg-opcoes-corpo">${textos}</div>
      </div>`;
  }

  window.selecionarOpcaoMagia = function(btn, i) {
    const wrap = btn.closest('.mg-opcoes-wrap');
    if (!wrap) return;
    wrap.querySelectorAll('.mg-opcao-pill').forEach(b => b.classList.remove('ativa'));
    btn.classList.add('ativa');
    wrap.querySelectorAll('.mg-opcao-texto').forEach(t => {
      t.style.display = t.dataset.oi === String(i) ? '' : 'none';
    });
  };

  function renderCorpoMagia() {
    const m = _magiaAtual;
    if (!m) return;
    const kw = typeof processarKeywords === 'function' ? processarKeywords : (t) => t;
    const esc = ESCOLA_INFO[m.escola] || { label: m.escola, cor: '#888' };
    const tipoInfo = TIPO_MAGIA_INFO[m.tipo];
    const pmFixoEl = document.getElementById('mgPmFixo');
    if (pmFixoEl) {
      const pmTotal = calcularPMTotalMagia();
      pmFixoEl.classList.add('ativo');
      document.getElementById('mgPmFixoValor').textContent = `${pmTotal} PM`;
    }

    const aprimHtml = m.aprimoramentos.map((a, i) => renderLinhaAprimoramento(a, i)).join('');

    document.getElementById('mgBody').innerHTML = `
      <div class="dp-linha"></div>
      <div class="dp-badges">
        <span class="dp-badge" style="background:rgba(139,0,0,.1);color:#cc4444;border:.5px solid rgba(139,0,0,.3)">Tormenta 20</span>
        <span class="dp-badge" style="color:${esc.cor};border-color:${esc.cor}55;background:${esc.cor}18">${esc.label}</span>
        <span class="mgc-tipo mgc-tipo-${m.tipo}">${tipoInfo.label}</span>
      </div>

      <div class="mg-stats-grid">
        <div><div class="mg-stat-l">Círculo</div><div class="mg-stat-v">${m.circulo}º Círculo</div></div>
        <div><div class="mg-stat-l">Execução</div><div class="mg-stat-v">${m.execucao}</div></div>
        <div><div class="mg-stat-l">Alcance</div><div class="mg-stat-v">${m.alcance}</div></div>
        <div><div class="mg-stat-l">Alvo/Área</div><div class="mg-stat-v">${m.alvoArea}</div></div>
        <div><div class="mg-stat-l">Duração</div><div class="mg-stat-v">${m.duracao}</div></div>
        <div><div class="mg-stat-l">Resistência</div><div class="mg-stat-v">${m.resistencia || '—'}</div></div>
      </div>

      <p class="dp-desc">${kw(m.descricao)}</p>
      ${m.tabela ? renderTabelaUso(m.tabela) : ''}
      ${m.opcoes ? renderOpcoesEscolha(m.opcoes) : ''}

      ${m.aprimoramentos.length ? `
      <div class="dp-secao">Aprimoramentos Disponíveis</div>
      <div id="mgAprimList">${aprimHtml}</div>
      <div class="mg-pm-total">
        <i class="ti ti-sparkles" aria-hidden="true"></i>
        <span>Custo total: <strong id="mgPmTotal">${calcularPMTotalMagia()}</strong> PM</span>
      </div>` : ''}
    `;
  }

  window.toggleAprimoramentoTruqueMagia = function(i) {
    const jaSelecionado = _magiaSelecoes[i] > 0;
    _magiaSelecoes = _magiaSelecoes.map(() => 0);
    if (!jaSelecionado) _magiaSelecoes[i] = 1;
    renderCorpoMagia();
  };

  window.toggleAprimoramentoMudaMagia = function(i) {
    const truqueIdx = _magiaAtual.aprimoramentos.findIndex(a => a.tipo === 'truque');
    if (truqueIdx !== -1) _magiaSelecoes[truqueIdx] = 0;
    _magiaSelecoes[i] = _magiaSelecoes[i] > 0 ? 0 : 1;
    renderCorpoMagia();
  };

  window.alterarAprimoramentoMagia = function(i, delta) {
    if (delta > 0) {
      const truqueIdx = _magiaAtual.aprimoramentos.findIndex(a => a.tipo === 'truque');
      if (truqueIdx !== -1) _magiaSelecoes[truqueIdx] = 0;
    }
    _magiaSelecoes[i] = Math.max(0, _magiaSelecoes[i] + delta);
    renderCorpoMagia();
  };

  const MAGIA_SECOES_TODAS = ['secao-magias-todas', 'secao-magias-arcanas', 'secao-magias-divinas', 'secao-magias-universal'];

  window.abrirDetalheMagia = function(id) {
    const m = (window.MAGIAS || []).find(x => x.id === id);
    if (!m) return;
    _magiaAtual = m;
    _magiaSelecoes = m.aprimoramentos.map(() => 0);

    const esc = ESCOLA_INFO[m.escola] || { label: m.escola, icone: 'ti-sparkles' };
    document.getElementById('mgHeroIcon').className = `ti ${esc.icone} dp-hero-icon`;
    document.getElementById('mgNome').textContent = m.nome;
    document.getElementById('mgSub').textContent = esc.label + ' · ' + m.circulo + 'º Círculo';

    renderCorpoMagia();

    document.querySelectorAll('.magia-card').forEach(c => c.classList.remove('selecionado'));
    document.querySelector(`.magia-card[data-id="${id}"]`)?.classList.add('selecionado');

    document.getElementById('magiaPainel').classList.add('aberto');
    MAGIA_SECOES_TODAS.forEach(s => {
      const el = document.getElementById(s);
      if (el && el.style.display !== 'none') {
        el.querySelector('.cards-area')?.classList.add('encolhido');
      }
    });
  };

  window.fecharDetalheMagia = function() {
    _fecharPainelDetalhe(
      document.getElementById('magiaPainel'),
      MAGIA_SECOES_TODAS.map(s => `#${s} .cards-area`).join(', '),
      '.magia-card'
    );
  };

  // irParaMagia() foi removida em 23/ago — navegava pra "Todas as Magias"
  // (mostrarSecao + filtro) quando uma magia era citada em texto; substituída
  // por abrirBlocoReferencia('magia', nome), que abre o mesmo #magiaPainel
  // empilhado por cima, sem trocar de seção. Sem nenhum caller restante
  // (confirmado com grep antes de remover).

  // ── PODERES GERAIS (Combate/Destino/Magia/Concedidos/Tormenta) ─────
  // Reaproveita renderPoderHtml() e togglePoderPersonagem() sem mudar nada
  // neles — só usa um "classeId" fixo ('geral') pra persistência no
  // localStorage, já que esses poderes não pertencem a nenhuma classe.
  const _pgEstado = {
    combate:    { tipo: 'todos', busca: '' },
    destino:    { tipo: 'todos', busca: '' },
    magia:      { tipo: 'todos', busca: '' },
    concedidos: { tipo: 'todos', busca: '' },
    tormenta:   { tipo: 'todos', busca: '' },
    todos:      { tipo: 'todos', categoria: 'todos', busca: '' },
  };

  function renderPoderesGeraisNaSecao(categoria) {
    const container = document.getElementById(`poderes${categoria.charAt(0).toUpperCase()}${categoria.slice(1)}Lista`);
    if (!container) return;

    const estado = _pgEstado[categoria];
    const todosDaCategoria = (window.PODERES_GERAIS || []).filter(p => p.categoria === categoria);

    // _cpTodosPoderes precisa estar pronto ANTES do filtro, porque o filtro
    // "bonus" usa poderEhBonus(), que depende dela.
    _cpTodosPoderes = todosDaCategoria;
    window._classeAtualId = 'geral';

    const filtrados = todosDaCategoria.filter(p => {
      const okTipo = estado.tipo === 'todos'
        || (estado.tipo === 'bonus' ? poderEhBonus(p) : p.tipo === estado.tipo);
      const okBusca = !estado.busca
        || (p.nome || '').toLowerCase().includes(estado.busca)
        || (p.descricao || '').toLowerCase().includes(estado.busca)
        || (p.prerequisito || '').toLowerCase().includes(estado.busca);
      return okTipo && okBusca;
    });

    const countEl = document.getElementById(`poderes${categoria.charAt(0).toUpperCase()}${categoria.slice(1)}Count`);
    if (countEl) countEl.textContent = `${filtrados.length} poder${filtrados.length !== 1 ? 'es' : ''}`;

    container.innerHTML = filtrados.length
      ? filtrados.map(p => renderPoderHtml(p)).join('')
      : `<div class="cp-poderes-vazio">Nenhum poder encontrado.</div>`;
  }

  // Página combinada: todas as 5 categorias juntas, com filtro extra por categoria.
  // Agrupada por categoria (igual Perícias por atributo) e num grid que se
  // reorganiza sozinho — em tela normal os grupos empilham, em tela larga
  // ficam lado a lado, evitando a coluna única esticada em ultrawide.
  function renderPoderesTodosNaSecao() {
    const container = document.getElementById('poderesTodosLista');
    if (!container) return;

    const estado = _pgEstado.todos;
    const todos = window.PODERES_GERAIS || [];

    _cpTodosPoderes = todos;
    window._classeAtualId = 'geral';

    const filtrados = todos.filter(p => {
      const okCategoria = estado.categoria === 'todos' || p.categoria === estado.categoria;
      const okTipo = estado.tipo === 'todos'
        || (estado.tipo === 'bonus' ? poderEhBonus(p) : p.tipo === estado.tipo);
      const okBusca = !estado.busca
        || (p.nome || '').toLowerCase().includes(estado.busca)
        || (p.descricao || '').toLowerCase().includes(estado.busca)
        || (p.prerequisito || '').toLowerCase().includes(estado.busca);
      return okCategoria && okTipo && okBusca;
    });

    const countEl = document.getElementById('poderesTodosCount');
    if (countEl) countEl.textContent = `${filtrados.length} poder${filtrados.length !== 1 ? 'es' : ''}`;

    const ORDEM_CATEGORIAS = ['combate', 'destino', 'magia', 'concedidos', 'tormenta'];
    const LABEL_CATEGORIA = { combate: 'Combate', destino: 'Destino', magia: 'Magia', concedidos: 'Concedidos', tormenta: 'Tormenta' };
    const grupos = {};
    filtrados.forEach(p => {
      if (!grupos[p.categoria]) grupos[p.categoria] = [];
      grupos[p.categoria].push(p);
    });

    let html = '';
    ORDEM_CATEGORIAS.forEach(cat => {
      const itens = grupos[cat];
      if (!itens || !itens.length) return;
      itens.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
      html += `
        <div class="pg-grupo">
          <div class="pg-grupo-hd">
            <span class="pg-grupo-linha"></span>
            <span class="pg-grupo-titulo">${LABEL_CATEGORIA[cat]}</span>
            <span class="pg-grupo-count">${itens.length} poder${itens.length !== 1 ? 'es' : ''}</span>
          </div>
          ${itens.map(p => renderPoderHtml(p)).join('')}
        </div>`;
    });

    container.innerHTML = html || `<div class="cp-poderes-vazio">Nenhum poder encontrado.</div>`;
  }

  window.setFiltroPoderGeral = (btn, categoria, tipo) => {
    _ativarFiltroBtn(`#poderes${categoria.charAt(0).toUpperCase()}${categoria.slice(1)}Filtros`, btn);
    _pgEstado[categoria].tipo = tipo;
    renderPoderesGeraisNaSecao(categoria);
  };

  // Filtro da página combinada — eixo (categoria|tipo) é independente do valor.
  window.setFiltroPoderTodos = (btn, eixo, valor) => {
    const grupoId = eixo === 'categoria' ? 'poderesTodosFiltrosCategoria' : 'poderesTodosFiltrosTipo';
    _ativarFiltroBtn(`#${grupoId}`, btn);
    _pgEstado.todos[eixo] = valor;
    renderPoderesTodosNaSecao();
  };

  // Alterna entre lista única centralizada e duas colunas — a classe fica no
  // próprio container, então sobrevive a re-renders (innerHTML só troca o
  // conteúdo de dentro, não a classe do elemento).
  window.setModoPoderesTodos = (modo) => {
    const container = document.getElementById('poderesTodosLista');
    if (!container) return;
    container.classList.remove('pg-modo-lista', 'pg-modo-colunas');
    container.classList.add(modo === 'lista' ? 'pg-modo-lista' : 'pg-modo-colunas');
    document.getElementById('pgModoLista')?.classList.toggle('a', modo === 'lista');
    document.getElementById('pgModoColunas')?.classList.toggle('a', modo === 'colunas');
  };

  // irParaPoderGeral() foi removida em 23/ago — navegava pra categoria
  // certa (mostrarSecao + filtro) quando um poder geral era citado em texto
  // ou clicado num chip do painel de Deus; substituída por
  // abrirBlocoReferencia('poderGeral', nome, categoria), que abre o
  // mini-painel compartilhado em cima, sem trocar de seção. Sem nenhum
  // caller restante (confirmado com grep antes de remover).

  window.filtrarPoderesPainel = (tipo, btn) => {
    _cpPoderFiltro = tipo;
    document.querySelectorAll('.cp-filtro-btn').forEach(b => b.classList.remove('on'));
    if (btn) btn.classList.add('on');
    renderPoderesNoPainel();
  };

  window.buscarPoderesPainel = (termo) => {
    _cpPoderBusca = termo;
    renderPoderesNoPainel();
  };

  window.filtrarPoderesPorNivel = function(valor) {
    _cpNivelFiltro = parseInt(valor) || 0;
    const label = document.getElementById('cpNivelLabel');
    if (label) label.textContent = _cpNivelFiltro > 0
      ? `Nível ${_cpNivelFiltro}`
      : 'Todos os níveis';
    renderPoderesNoPainel();
  };

  window.toggleCategoriaPoderes = (catId) => {
    const body = document.getElementById(catId + '-body');
    const hd   = document.getElementById(catId + '-hd');
    if (!body) return;
    body.classList.toggle('collapsed');
    hd.classList.toggle('collapsed');
  };

  function _atualizarBadgeSelecionados(classeId) {
    const badge = document.getElementById('cpSelecionadosBadge');
    if (!badge) return;
    const total = _carregarPoderesSelecionados()
      .filter(p => p.classeId === classeId).length;
    badge.textContent = total > 0 ? `${total} selecionado${total > 1 ? 's' : ''}` : '';
    badge.style.display = total > 0 ? 'inline-flex' : 'none';
  }

  // Atualiza o badge após toggle
  const _toggleOriginal = window.togglePoderPersonagem;
  window.togglePoderPersonagem = function(classeId, poderId, btn) {
    _toggleOriginal(classeId, poderId, btn);
    _atualizarBadgeSelecionados(classeId);
  };

  window.fecharDetalheClasse = () => {
    _cpNivelFiltro = 0;
    _fecharPainelDetalhe(classePainelEl, '#classesArea', '.class-card');
  };

  window.irParaClasse = (id) => {
    document.querySelectorAll('.nav-classe-item').forEach(i => i.classList.remove('ativo'));
    document.querySelector(`.nav-classe-item[data-classe="${id}"]`)?.classList.add('ativo');
    mostrarSecao('classes');
    const classe = (window.CLASSES||[]).find(c => c.id === id);
    if (classe) setTimeout(() => abrirDetalheClasse(classe), 100);
  };

  // Clique em item de origem individual na nav
  window.irParaOrigem = (id) => {
    document.querySelectorAll('.nav-origem-item').forEach(i => i.classList.remove('ativo'));
    document.querySelector(`.nav-origem-item[data-origem="${id}"]`)?.classList.add('ativo');
    mostrarSecao('origens');
    const origem = (window.ORIGENS||[]).find(o => o.id === id);
    if (origem) setTimeout(() => abrirDetalheOrigem(origem), 100);
  };

  // Filtro e busca de classes
  let filtroClasseAtivo = 'todos';
  window.setFiltroClasse = (btn, val) => {
    _ativarFiltroBtn('#classesFiltros', btn);
    filtroClasseAtivo = val;
    aplicarFiltroClasses();
  };

  function aplicarFiltroClasses() {
    const busca = (document.getElementById('buscaClasses')?.value || '').toLowerCase();
    const lista = (window.CLASSES||[]).filter(c => {
      const matchFiltro = filtroClasseAtivo === 'todos'
        || (filtroClasseAtivo === 'Simples'  && c.complexidade === 1)
        || (filtroClasseAtivo === 'Complexa' && c.complexidade === 3)
        || (c.papeis||[]).includes(filtroClasseAtivo);
      const matchBusca = !busca
        || c.nome.toLowerCase().includes(busca)
        || (c.descricao||'').toLowerCase().includes(busca);
      return matchFiltro && matchBusca;
    });
    renderClasses(lista);
  }

  document.getElementById('buscaClasses')?.addEventListener('input', aplicarFiltroClasses);

  // ── 5. PAINEL DE DETALHES ──────────────────────────────────
  const painelEl = document.getElementById('detalhePainel');

  window.abrirDetalhe = (r) => {
    if (!r) return;
    const cor = corPorTipo[r.tipo] || '#888';

    // Hero
    document.getElementById('dpHeroBg').style.background =
      `linear-gradient(135deg, ${cor}25, #080505)`;
    document.getElementById('dpHeroIcon').className = `ti ${r.icone} dp-hero-icon`;
    document.getElementById('dpHeroIcon').style.color = cor;
    document.getElementById('dpTipo').innerHTML =
      `<i class="ti ti-users" aria-hidden="true"></i> ${r.tipo}`;
    document.getElementById('dpNome').textContent = r.nome;
    document.getElementById('dpSub').textContent  = r.subtitulo;

    // Badges
    document.getElementById('dpBadges').innerHTML = `
      <span class="dp-badge badge-${r.raridade}" style="background:rgba(201,168,76,.1);color:#c9a84c;border:.5px solid rgba(201,168,76,.3)">
        ${r.raridade === 'comum' ? 'Comum' : 'Rara'}
      </span>
      <span class="dp-badge" style="background:rgba(139,0,0,.1);color:#cc4444;border:.5px solid rgba(139,0,0,.3)">
        ${r.fonte}
      </span>
      <span class="dp-badge" style="background:rgba(255,255,255,.04);color:#555;border:.5px solid #2a2a2a">
        p. ${r.pagina}
      </span>`;

    // Atributos
    const atribsEl = document.getElementById('dpAtribs');
    atribsEl.innerHTML = `
      <div class="dp-atrib">
        <div class="dp-atrib-l">Bônus</div>
        <div class="dp-atrib-v">${r.atributos}</div>
      </div>
      ${r.penalidade ? `<div class="dp-atrib dp-penalidade"><div class="dp-atrib-l">Penalidade</div><div class="dp-atrib-v">${r.penalidade}</div></div>` : ''}
      <div class="dp-atrib">
        <div class="dp-atrib-l">Tamanho</div>
        <div class="dp-atrib-v">${r.tamanho}</div>
      </div>
      <div class="dp-atrib">
        <div class="dp-atrib-l">Deslocamento</div>
        <div class="dp-atrib-v">${r.deslocamento}</div>
      </div>`;

    // Descrição e história
    document.getElementById('dpDesc').textContent    = r.descricao;
    document.getElementById('dpHistoria').textContent = r.historia || '';

    // Habilidades
    const habEl = document.getElementById('dpHabilidades');
    habEl.innerHTML = r.habilidades.map(h => `
      <div class="dp-habilidade ${h.tipo === 'penalidade' ? 'penalidade' : ''}"
           style="--hc:${h.tipo === 'penalidade' ? '#8B0000' : cor}">
        <div class="dp-hab-nome">${h.nome}</div>
        <div class="dp-hab-desc">${processarKeywords(h.descricao)}</div>
      </div>`).join('');

    // Classes recomendadas
    const classesEl = document.getElementById('dpClasses');
    if (r.classesRecomendadas?.length) {
      classesEl.innerHTML = r.classesRecomendadas
        .map(c => `<span class="dp-classe-tag">${c}</span>`).join('');
    }

    // Página
    document.getElementById('dpBtnPdf').textContent = `Ver no Livro — p.${r.pagina}`;

    // Destaca card selecionado
    document.querySelectorAll('.race-card').forEach(c => c.classList.remove('selecionado'));
    document.querySelector(`.race-card[data-id="${r.id}"]`)?.classList.add('selecionado');

    // Destaca nav item
    document.querySelectorAll('.nav-raca-item').forEach(i => i.classList.remove('ativo'));
    document.querySelector(`.nav-raca-item[data-raca="${r.id}"]`)?.classList.add('ativo');

    painelEl.classList.add('aberto');
    document.querySelector('#secao-racas .cards-area')?.classList.add('encolhido');
  };

  window.fecharDetalhe = () => {
    // Antes usava o seletor global '.cards-area' (sem escopo em
    // #secao-racas) — só "funcionava" por coincidência de Raça ser a
    // primeira seção no HTML, então document.querySelector('.cards-area')
    // sem querer batia na área certa. Corrigido em 23/ago pra escopo
    // explícito, igual todo outro painel já fazia (Classe, Origem, Deus...).
    _fecharPainelDetalhe(painelEl, '#secao-racas .cards-area', '.race-card');
  };

  // ── PAINEL DE DETALHE DE ORIGEM ─────────────────────────────
  const origemPainelEl = document.getElementById('origemPainel');
  let _origemAtual = null;
  // Escolha ÚNICA de "escolha 2 dos benefícios" — perícias, poderes gerais,
  // o Poder Único e a Escolha Livre competem pelo MESMO limite (regra real:
  // é uma lista combinada, não "2 perícias + 1 poder" separados).
  let _origemSelecoes = { escolhidos: new Set() };

  function limiteEscolhaOrigem() { return 2; }

  window.toggleEscolhaOrigem = function(chave) {
    if (!_origemAtual) return;
    if (_origemSelecoes.escolhidos.has(chave)) {
      _origemSelecoes.escolhidos.delete(chave);
    } else {
      if (_origemSelecoes.escolhidos.size >= limiteEscolhaOrigem()) return;
      _origemSelecoes.escolhidos.add(chave);
    }
    renderCorpoOrigem(_origemAtual);
  };

  function renderPericiaOrigemLinha(nomePericia) {
    const kw = typeof processarKeywords === 'function' ? processarKeywords : (t) => t;
    const sel = _origemSelecoes.escolhidos.has(nomePericia);
    const noLimite = !sel && _origemSelecoes.escolhidos.size >= limiteEscolhaOrigem();
    return `
      <div class="eq-melhoria-linha ${sel ? 'selecionada' : ''}" style="${noLimite ? 'opacity:.4;cursor:not-allowed;' : ''}" onclick="${noLimite ? '' : `toggleEscolhaOrigem('${nomePericia.replace(/'/g, "\\'")}')`}">
        <div class="eq-melhoria-check">${sel ? '<i class="ti ti-check" aria-hidden="true"></i>' : ''}</div>
        <div class="eq-melhoria-corpo"><div class="eq-melhoria-nome">${kw(nomePericia)}</div></div>
      </div>`;
  }

  // Reaproveita renderPoderHtml (a mesma função da página de Poderes Gerais)
  // pra não duplicar código nem manter dois jeitos de mostrar a mesma coisa
  // — só embrulha num wrapper clicável de seleção. Poder Único e Escolha
  // Livre não existem em PODERES_GERAIS, então viram um objeto "normalizado"
  // com os mesmos campos (sem id → o botão "Adicionar ao personagem" nem
  // aparece pra esses dois, evitando confundir com o sistema de ficha).
  function renderPoderOrigemCard(chave, poderObj) {
    const sel = _origemSelecoes.escolhidos.has(chave);
    const noLimite = !sel && _origemSelecoes.escolhidos.size >= limiteEscolhaOrigem();
    const htmlPoder = renderPoderHtml(poderObj);
    return `
      <div class="op-poder-wrap ${sel ? 'selecionada' : ''}" style="${noLimite ? 'opacity:.45;cursor:not-allowed;' : 'cursor:pointer;'}"
           onclick="${noLimite ? '' : `if (!event.target.closest('.cp-poder-add-btn')) toggleEscolhaOrigem('${chave}')`}">
        ${htmlPoder}
      </div>`;
  }

  function normalizarPoderEspecial(nome, descricao, prerequisito, fonte) {
    return { id: null, nome, categoria: 'origem', tipo: 'passivo', custoPM: 0, prerequisito: prerequisito || null, descricao, fonte };
  }

  function renderCorpoOrigem(o) {
    const kw = typeof processarKeywords === 'function' ? processarKeywords : (t) => t;

    document.getElementById('opHeroIcon').className = `ti ${o.icone} dp-hero-icon`;
    document.getElementById('opNome').textContent = o.nome;
    document.getElementById('opSub').textContent = o.temas.join(' · ');

    const limite = limiteEscolhaOrigem();
    const periciasHtml = o.periciasOferecidas.map(p => renderPericiaOrigemLinha(p)).join('');

    const cardsPoder = [];
    o.poderesGeraisOferecidos.forEach(nomePoder => {
      const poderReal = (window.PODERES_GERAIS || []).find(p => p.nome === nomePoder);
      if (poderReal) cardsPoder.push(renderPoderOrigemCard(nomePoder, poderReal));
    });
    cardsPoder.push(renderPoderOrigemCard('__unico__', normalizarPoderEspecial(o.poderUnico.nome, o.poderUnico.descricao, o.poderUnico.prerequisito, o.fonte)));
    if (o.escolhaLivre) cardsPoder.push(renderPoderOrigemCard('__livre__', normalizarPoderEspecial('Escolha Livre', o.escolhaLivre.descricao, null, o.fonte)));

    document.getElementById('opBody').innerHTML = `
      <div class="dp-linha"></div>
      <div class="dp-badges">
        <span class="dp-badge" style="background:rgba(139,0,0,.1);color:#cc4444;border:.5px solid rgba(139,0,0,.3)">${o.fonte}</span>
        ${o.temas.map(t => `<span class="dp-badge" style="background:rgba(201,168,76,.08);color:#c9a84c;border:.5px solid rgba(201,168,76,.25)">${t}</span>`).join('')}
      </div>

      <div class="dp-secao">Descrição</div>
      <p class="dp-desc">${kw(o.descricao)}</p>

      <div class="dp-secao">Itens</div>
      <p style="font-size:12px;color:#888;line-height:1.7;margin-bottom:.9rem">${o.itens.join(', ')}</p>

      <div class="dp-secao">Benefícios · escolha ${limite} (${_origemSelecoes.escolhidos.size}/${limite})</div>
      ${periciasHtml ? `<div class="eq-melhorias-wrap" style="margin-bottom:12px;">${periciasHtml}</div>` : ''}
      <div style="display:flex;flex-direction:column;">${cardsPoder.join('')}</div>`;
  }

  window.abrirDetalheOrigem = function(o) {
    if (!o) return;
    _origemAtual = o;
    _origemSelecoes = { escolhidos: new Set() };

    renderCorpoOrigem(o);

    document.querySelectorAll('.origem-card').forEach(c => c.classList.remove('selecionado'));
    document.querySelector(`.origem-card[data-id="${o.id}"]`)?.classList.add('selecionado');

    origemPainelEl.classList.add('aberto');
    document.querySelector('#secao-origens .cards-area')?.classList.add('encolhido');
  };

  window.fecharDetalheOrigem = function() {
    _fecharPainelDetalhe(origemPainelEl, '#secao-origens .cards-area', '.origem-card');
  };

  // ── PAINEL DE DETALHE DE DEUS ────────────────────────────────
  const deusPainelEl = document.getElementById('deusPainel');

  function chipsDevoto(nomes, tipo) {
    // Mesmo bug que corrigimos em Poderes Concedidos: isso usava
    // irParaRaca/irParaClasse (navega pra fora, fecha o painel do Deus) —
    // trocado por abrirBlocoReferencia, que já tem 'raca'/'classe'
    // registrados em BLOCO_REF_TIPOS, pra abrir empilhado por cima
    // igual toda outra referência do site.
    return nomes.map(nome => {
      const lista = tipo === 'raca' ? (window.RACAS || []) : (window.CLASSES || []);
      const alvo = lista.find(x => x.nome === nome);
      return alvo
        ? `<span class="dd-devoto-link" onclick="event.stopPropagation(); window.abrirBlocoReferencia && window.abrirBlocoReferencia('${tipo}', '${alvo.id}')">${nome}</span>`
        : `<span class="dd-devoto-link dd-devoto-sem-link">${nome}</span>`;
    }).join('');
  }

  window.abrirDetalheDeus = function(d) {
    if (!d) return;
    const kw = typeof processarKeywords === 'function' ? processarKeywords : (t) => t;

    document.getElementById('ddHeroIcon').className = `ti ${d.icone} dp-hero-icon`;
    document.getElementById('ddNome').textContent = d.nome;
    document.getElementById('ddSub').textContent = 'Energia ' + LABEL_ENERGIA[d.energia];

    const devotosHtml = d.devotosNota
      ? `<div class="dd-devoto-nota"><i class="ti ti-info-circle" aria-hidden="true"></i> ${kw(d.devotosNota)}</div>`
      : `${d.devotosRacas.length ? `
         <div class="dd-devoto-grupo">Raças</div>
         <div class="dd-devoto-chips">${chipsDevoto(d.devotosRacas, 'raca')}</div>` : ''}
         ${d.devotosClasses.length ? `
         <div class="dd-devoto-grupo">Classes</div>
         <div class="dd-devoto-chips">${chipsDevoto(d.devotosClasses, 'classe')}</div>` : ''}`;

    const armaHtml = d.armaPreferida
      ? `<p style="font-size:12px;color:#888;line-height:1.6;margin-bottom:.9rem">${d.armaPreferida}</p>`
      : `<p style="font-size:11px;color:#8a7440;line-height:1.6;margin-bottom:.9rem;font-style:italic">${kw(d.armaPreferidaNota)}</p>`;

    // Poderes Concedidos: antes eram só chips de texto que navegavam pra
    // fora (irParaPoderGeral) — mesmo bug que já tínhamos corrigido em
    // outras referências. Agora cada um vira um card completo (mesma
    // renderPoderHtml usada em Poderes Gerais e em Origem), mostrando
    // categoria/PM/pré-req direto, sem precisar clicar em nada. Diferente
    // de Origem, aqui NÃO tem seleção com limite — um devoto recebe TODOS
    // os poderes concedidos listados, não escolhe um subconjunto — por
    // isso os cards não têm o wrapper de toggle/seleção.
    const poderesConcedidosHtml = (d.poderesConcedidos || []).map(nomePoder => {
      const poderReal = (window.PODERES_GERAIS || []).find(p => p.nome === nomePoder);
      return poderReal
        ? renderPoderHtml(poderReal)
        : `<div class="cp-poder"><div class="cp-poder-head"><span class="cp-poder-nome">${nomePoder}</span></div></div>`;
    }).join('');

    document.getElementById('ddBody').innerHTML = `
      <div class="dp-linha"></div>
      <div class="dp-badges">
        <span class="dp-badge" style="background:rgba(139,0,0,.1);color:#cc4444;border:.5px solid rgba(139,0,0,.3)">${d.fonte}</span>
        <span class="e-divina e-${d.energia}">${LABEL_ENERGIA[d.energia]}</span>
      </div>

      <p class="dp-desc">${kw(d.lore)}</p>

      <div class="dp-secao">Crenças e Objetivos</div>
      <p class="dp-desc">${kw(d.crencas)}</p>

      <div class="dp-secao">Símbolo Sagrado</div>
      <p style="font-size:12px;color:#888;line-height:1.6;margin-bottom:.9rem">${kw(d.simboloSagrado)}</p>

      <div class="dp-secao">Arma Preferida</div>
      ${armaHtml}

      <div class="dp-secao">Devotos</div>
      ${devotosHtml}

      <div class="dp-secao">Poderes Concedidos</div>
      <div style="display:flex;flex-direction:column;">${poderesConcedidosHtml}</div>

      <div class="dp-secao">Obrigações e Restrições</div>
      <p class="dp-desc">${kw(d.obrigacoes)}</p>
      <p style="font-size:10.5px;color:#775; line-height:1.5">Violar = perde todos os PM até o próximo dia (penitência se violar de novo na mesma aventura).</p>`;

    document.querySelectorAll('.deus-card').forEach(c => c.classList.remove('selecionado'));
    document.querySelector(`.deus-card[data-id="${d.id}"]`)?.classList.add('selecionado');

    deusPainelEl.classList.add('aberto');
    document.querySelector('#secao-deuses .cards-area')?.classList.add('encolhido');
  };

  window.fecharDetalheDeus = function() {
    _fecharPainelDetalhe(deusPainelEl, '#secao-deuses .cards-area', '.deus-card');
  };

  window.irParaDeus = (id) => {
    document.querySelectorAll('.nav-deus-item').forEach(i => i.classList.remove('ativo'));
    document.querySelector(`.nav-deus-item[data-deus="${id}"]`)?.classList.add('ativo');
    mostrarSecao('deuses');
    const deus = (window.DEUSES||[]).find(x => x.id === id);
    if (deus) setTimeout(() => abrirDetalheDeus(deus), 100);
  };

  // Clique na tag de energiaDivina de um poder (Clérigo/Paladino) leva pra
  // Deuses já filtrado pela mesma energia — fecha o ciclo do link Deus → Classe.
  window.irParaDeusesPorEnergia = function(energia) {
    mostrarSecao('deuses');
    setTimeout(() => {
      const btn = document.querySelector(`#deusesFiltros .filtro-btn[data-energia="${energia}"]`);
      if (btn) setFiltroDeus(btn, energia);
    }, 50);
  };

  // ── 6. FILTROS E BUSCA ─────────────────────────────────────
  let filtroTipo = 'todos';
  let termoBusca = '';

  function aplicarFiltros() {
    let lista = window.RACAS || [];

    // Filtro por tipo
    if (filtroTipo !== 'todos') {
      lista = lista.filter(r => r.tipo.toLowerCase() === filtroTipo ||
        (filtroTipo === 'comum' && r.raridade === 'comum') ||
        (filtroTipo === 'raro'  && r.raridade === 'rara'));
    }

    // Filtro por busca
    if (termoBusca) {
      const t = termoBusca.toLowerCase();
      lista = lista.filter(r =>
        r.nome.toLowerCase().includes(t) ||
        r.subtitulo.toLowerCase().includes(t) ||
        r.descricao.toLowerCase().includes(t) ||
        r.tags.some(tag => tag.toLowerCase().includes(t)) ||
        r.habilidades.some(h => h.nome.toLowerCase().includes(t))
      );
    }

    renderRacas(lista);
  }

  window.setFiltroRaca = (btn, tipo) => {
    _ativarFiltroBtn('#racasFiltros', btn);
    filtroTipo = tipo;
    aplicarFiltros();
  };

  // Busca na toolbar inline
  _ligarBusca('buscaRacas', v => { termoBusca = v; aplicarFiltros(); });

  // ── PERÍCIAS ────────────────────────────────────────────────
  function renderTabelaUso(tabela) {
    if (!tabela || !tabela.linhas || !tabela.linhas.length) return '';
    const cols = tabela.colunas || [];
    return `
      <table class="per-uso-tabela">
        ${cols.length ? `<thead><tr>${cols.map(c => `<th>${c}</th>`).join('')}</tr></thead>` : ''}
        <tbody>
          ${tabela.linhas.map(linha => `<tr>${linha.map(cel => `<td>${cel}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>`;
  }

  function renderOpcoesPericia(p) {
    const kw = typeof processarKeywords === 'function' ? processarKeywords : (t) => t;
    if (!p.opcoes || !p.opcoes.length) return '';
    return `
      <div class="cp-escolha" style="margin:0 12px 10px 34px">
        <div class="cp-esc-hd">
          <div class="cp-esc-ic"><i class="ti ti-list-check" aria-hidden="true"></i></div>
          <div>
            <div class="cp-esc-titulo">Tipos de ${p.nome}</div>
            <div class="cp-esc-sub">${p.opcoes.length} exemplos</div>
          </div>
        </div>
        <div class="cp-esc-opcoes">
          ${p.opcoes.map(op => `
            <div class="cp-esc-opt">
              <div class="cp-esc-opt-hd">
                <div class="cp-esc-ic"><i class="ti ${op.icone || 'ti-star'}" aria-hidden="true"></i></div>
                <div style="flex:1">
                  <div class="cp-esc-opt-nome">${op.nome}</div>
                  <div class="cp-esc-opt-desc">${kw(op.descricao || '')}</div>
                </div>
              </div>
            </div>`).join('')}
        </div>
      </div>`;
  }

  // Link reverso: qual classe (fixa ou opcional) e qual origem concede
  // treinamento nesta perícia — o compêndio já tinha o caminho contrário
  // (poder → perícia via kw-pericia), faltava esse.
  function quemConcedePericia(nomePericia) {
    const bateNome = (str) => str === nomePericia || str.startsWith(nomePericia + ' (');
    const classesFixas = (window.CLASSES || []).filter(c => (c.periciasFixas || []).some(bateNome));
    const classesOpcoes = (window.CLASSES || [])
      .filter(c => (c.periciasOpcoes || []).some(bateNome))
      .filter(c => !classesFixas.includes(c));
    const origens = (window.ORIGENS || []).filter(o => (o.periciasOferecidas || []).includes(nomePericia));
    return { classesFixas, classesOpcoes, origens };
  }

  function renderConcedidaPor(p) {
    const { classesFixas, classesOpcoes, origens } = quemConcedePericia(p.nome);
    if (!classesFixas.length && !classesOpcoes.length && !origens.length) return '';
    const linha = (label, nomes) => nomes.length
      ? `<div class="per-concedida-linha"><span class="per-concedida-label">${label}</span> ${nomes.join(', ')}</div>` : '';
    return `
      <div class="per-concedida-por" style="margin:0 12px 10px 34px">
        <div class="per-concedida-titulo"><i class="ti ti-arrow-back-up" aria-hidden="true"></i> Concedida por</div>
        ${linha('Classe (fixa):', classesFixas.map(c => c.nome))}
        ${linha('Classe (opcional):', classesOpcoes.map(c => c.nome))}
        ${linha('Origem:', origens.map(o => o.nome))}
      </div>`;
  }

  function renderPericiaLinha(p) {
    const kw = typeof processarKeywords === 'function' ? processarKeywords : (t) => t;
    const temUsos = p.usos && p.usos.length > 0;
    const temNota = !!p.notaGeral;
    const temOpcoes = p.opcoes && p.opcoes.length > 0;
    const concedidaHtml = renderConcedidaPor(p);
    const temExpansao = temUsos || temNota || temOpcoes || !!concedidaHtml;

    const tagTreinada = p.somenteTreinada
      ? '<span class="per-tag per-tag-treinada">Treinada</span>' : '';
    const tagArmadura = p.penalidadeArmadura
      ? '<span class="per-tag per-tag-armadura">Armadura</span>' : '';

    const notaHtml = temNota ? `
      <div class="cp-explicacao" style="margin:0 12px 10px 34px">
        <div class="cp-exp-hd">
          <div class="cp-exp-ic"><i class="ti ${p.notaGeral.icone || 'ti-book'}" aria-hidden="true"></i></div>
          <div>
            <div class="cp-exp-titulo">${p.notaGeral.titulo}</div>
            <div class="cp-exp-sub">${p.notaGeral.subtitulo || ''}</div>
          </div>
        </div>
        <div class="cp-exp-body">
          ${(p.notaGeral.itens || []).map(item =>
            `<div class="cp-exp-item"><span class="cp-exp-bul">→</span><span>${kw(item || '')}</span></div>`
          ).join('')}
        </div>
      </div>` : '';

    const usosHtml = temUsos ? `
      <div class="per-usos">
        ${p.usos.map(u => `
          <div class="per-uso">
            <div class="per-uso-hd">
              <span class="per-uso-nome">${u.nome}</span>
              ${u.cd !== null && u.cd !== undefined ? `<span class="per-uso-cd">CD ${u.cd}</span>` : ''}
              ${u.apenasTreinado ? `<span class="per-uso-treinado">Apenas treinado</span>` : ''}
            </div>
            <div class="per-uso-desc">${kw(u.descricao || '')}</div>
            ${renderTabelaUso(u.tabela)}
          </div>`).join('')}
      </div>` : '';

    return `
      <div class="per-linha${temExpansao ? ' per-expandivel' : ''}" data-id="${p.id}"
           onclick="${temExpansao ? `togglePericia('${p.id}')` : ''}">
        <div class="per-linha-hd">
          <i class="ti ${p.icone || 'ti-star'} per-icone" aria-hidden="true"></i>
          <div class="per-txt">
            <div class="per-nome">${p.nome}</div>
            <div class="per-resumo">${kw(p.descricao || '')}</div>
          </div>
          ${tagTreinada}${tagArmadura}
          ${temExpansao ? '<i class="ti ti-chevron-right per-chevron" aria-hidden="true"></i>' : ''}
        </div>
        ${notaHtml}
        ${renderOpcoesPericia(p)}
        ${usosHtml}
        ${concedidaHtml}
      </div>`;
  }

  function renderPericias(lista) {
    const cont = document.getElementById('periciasLista');
    if (!cont) return;
    const countEl = document.getElementById('periciasCount');
    if (countEl) countEl.textContent = lista.length + ' perícia' + (lista.length !== 1 ? 's' : '');

    // Popula lista na sidebar (igual ao de raças/classes/origens)
    const navListaP = document.getElementById('navListaPericias');
    if (navListaP) {
      navListaP.innerHTML = lista.map(p => `
        <div class="nav-sub-sub-item nav-pericia-item" data-pericia="${p.id}"
             onclick="irParaPericia('${p.nome.replace(/'/g, "\\'")}')">
          <i class="ti ${p.icone || 'ti-star'}" aria-hidden="true" style="font-size:11px"></i>
          <span>${p.nome}</span>
        </div>`).join('');
    }

    const ordemAtributos = ['Força', 'Destreza', 'Constituição', 'Inteligência', 'Sabedoria', 'Carisma'];
    const grupos = {};
    lista.forEach(p => {
      if (!grupos[p.atributoChave]) grupos[p.atributoChave] = [];
      grupos[p.atributoChave].push(p);
    });

    let html = '';
    ordemAtributos.forEach(atr => {
      const itens = grupos[atr];
      if (!itens || !itens.length) return;
      html += `
        <div class="per-grupo">
          <div class="per-grupo-hd">
            <span class="per-grupo-linha"></span>
            <span class="per-grupo-titulo">${atr}</span>
            <span class="per-grupo-count">${itens.length} perícia${itens.length !== 1 ? 's' : ''}</span>
          </div>
          <div class="per-lista">
            ${itens.map(p => renderPericiaLinha(p)).join('')}
          </div>
        </div>`;
    });

    cont.innerHTML = html || '<p style="padding:2rem;color:#555;font-size:13px">Nenhuma perícia encontrada.</p>';
  }

  window.togglePericia = function(id) {
    const el = document.querySelector(`.per-linha[data-id="${id}"]`);
    if (el) el.classList.toggle('aberto');
  };

  let filtroAtributoPericia = 'todos';
  let termoBuscaPericia = '';
  let filtrosFlagPericia = { treinada: false, armadura: false };

  function aplicarFiltrosPericias() {
    let lista = window.PERICIAS || [];

    if (filtroAtributoPericia !== 'todos') {
      lista = lista.filter(p => p.atributoChave === filtroAtributoPericia);
    }

    if (filtrosFlagPericia.treinada) lista = lista.filter(p => p.somenteTreinada);
    if (filtrosFlagPericia.armadura) lista = lista.filter(p => p.penalidadeArmadura);

    // Perícias cujo termo de busca só bateu dentro de um uso nomeado
    // (essas devem abrir automaticamente, senão o resultado fica escondido)
    let idsParaExpandir = [];

    if (termoBuscaPericia) {
      const t = termoBuscaPericia.toLowerCase();
      lista = lista.filter(p => {
        const bateBase = p.nome.toLowerCase().includes(t) || p.descricao.toLowerCase().includes(t);
        const bateUso = (p.usos || []).some(u =>
          u.nome.toLowerCase().includes(t) || u.descricao.toLowerCase().includes(t));
        if (bateUso) idsParaExpandir.push(p.id);
        return bateBase || bateUso;
      });
    }

    renderPericias(lista);

    idsParaExpandir.forEach(id => {
      const linha = document.querySelector(`.per-linha[data-id="${id}"]`);
      if (linha) linha.classList.add('aberto');
    });
  }

  window.setFiltroPericia = (btn, atributo) => {
    _ativarFiltroBtn('#periciasFiltros', btn);
    filtroAtributoPericia = atributo;
    aplicarFiltrosPericias();
  };

  window.toggleFiltroFlagPericia = (flag, btn) => {
    filtrosFlagPericia[flag] = !filtrosFlagPericia[flag];
    btn.classList.toggle('a', filtrosFlagPericia[flag]);
    aplicarFiltrosPericias();
  };

  // Clique num nome de perícia destacado (kw-pericia) em qualquer descrição
  // de poder leva até a página de Perícias e abre a linha correspondente.
  window.irParaPericia = function(nome) {
    const alvo = (window.PERICIAS || []).find(p => p.nome.toLowerCase() === nome.toLowerCase());
    if (!alvo) return;

    filtroAtributoPericia = 'todos';
    termoBuscaPericia = '';
    filtrosFlagPericia = { treinada: false, armadura: false };
    const buscaInputP = document.getElementById('buscaPericias');
    if (buscaInputP) buscaInputP.value = '';
    document.querySelectorAll('#periciasFiltros .filtro-btn, #periciasFiltrosFlags .filtro-btn')
      .forEach(b => b.classList.remove('a'));
    const btnTodos = document.querySelector('#periciasFiltros .filtro-btn');
    if (btnTodos) btnTodos.classList.add('a');
    renderPericias(window.PERICIAS || []);

    mostrarSecao('pericias');

    setTimeout(() => {
      const linha = document.querySelector(`.per-linha[data-id="${alvo.id}"]`);
      if (linha) {
        linha.classList.add('aberto');
        linha.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  };

  _ligarBusca('buscaPericias', v => { termoBuscaPericia = v; aplicarFiltrosPericias(); });

  // ── FILTROS E BUSCA DE ORIGENS ──────────────────────────────
  let filtroTemaOrigem = 'todos';
  let termoBuscaOrigem = '';

  function aplicarFiltrosOrigens() {
    let lista = window.ORIGENS || [];

    if (filtroTemaOrigem !== 'todos') {
      lista = lista.filter(o => o.temas.includes(filtroTemaOrigem));
    }

    if (termoBuscaOrigem) {
      const t = termoBuscaOrigem.toLowerCase();
      lista = lista.filter(o =>
        o.nome.toLowerCase().includes(t) ||
        o.descricao.toLowerCase().includes(t) ||
        o.itens.some(i => i.toLowerCase().includes(t)) ||
        o.periciasOferecidas.some(p => p.toLowerCase().includes(t)) ||
        o.poderesGeraisOferecidos.some(p => p.toLowerCase().includes(t)) ||
        o.poderUnico.nome.toLowerCase().includes(t) ||
        o.poderUnico.descricao.toLowerCase().includes(t) ||
        (o.escolhaLivre && o.escolhaLivre.descricao.toLowerCase().includes(t))
      );
    }

    renderOrigens(lista);
  }

  window.setFiltroOrigem = (btn, tema) => {
    _ativarFiltroBtn('#origensFiltros', btn);
    filtroTemaOrigem = tema;
    aplicarFiltrosOrigens();
  };

  _ligarBusca('buscaOrigens', v => { termoBuscaOrigem = v; aplicarFiltrosOrigens(); });

  // ── FILTROS E BUSCA DE DEUSES ────────────────────────────────
  let filtroEnergiaDeus = 'todos';
  let termoBuscaDeus = '';

  function aplicarFiltrosDeuses() {
    let lista = window.DEUSES || [];

    if (filtroEnergiaDeus !== 'todos') {
      lista = lista.filter(d => d.energia === filtroEnergiaDeus);
    }

    if (termoBuscaDeus) {
      const t = termoBuscaDeus.toLowerCase();
      lista = lista.filter(d =>
        d.nome.toLowerCase().includes(t) ||
        d.descricao.toLowerCase().includes(t) ||
        d.crencas.toLowerCase().includes(t) ||
        d.obrigacoes.toLowerCase().includes(t) ||
        d.devotosRacas.some(r => r.toLowerCase().includes(t)) ||
        d.devotosClasses.some(c => c.toLowerCase().includes(t)) ||
        (d.devotosNota && d.devotosNota.toLowerCase().includes(t)) ||
        d.poderesConcedidos.some(p => p.toLowerCase().includes(t))
      );
    }

    renderDeuses(lista);
  }

  window.setFiltroDeus = (btn, energia) => {
    _ativarFiltroBtn('#deusesFiltros', btn);
    filtroEnergiaDeus = energia;
    aplicarFiltrosDeuses();
  };

  _ligarBusca('buscaDeuses', v => { termoBuscaDeus = v; aplicarFiltrosDeuses(); });

  // ── BUSCA DE PODERES GERAIS (por categoria) ─────────────────
  // ── BUSCA DE EQUIPAMENTOS ──────────────────────────────
  _ligarBusca('buscaArmasMagicas', v => { _armasMagicasEstado.busca = v.toLowerCase(); renderArmasMagicasNaSecao(); });
  _ligarBusca('buscaArmadurasMagicas', v => { _armadurasMagicasEstado.busca = v.toLowerCase(); renderArmadurasMagicasNaSecao(); });
  _ligarBusca('buscaMagiaGerador', v => buscarMagiaGerador(v));
  _ligarBusca('buscaAcessorios', v => { _acessorioEstado.busca = v.toLowerCase(); renderAcessoriosNaSecao(); });
  _ligarBusca('buscaCriaturas', v => { _criaturaEstado.busca = v.toLowerCase(); renderCriaturasNaSecao(); });
  _ligarBusca('buscaPerigos', v => { _buscaPerigos = v.toLowerCase(); renderPerigosNaSecao(); });
  _ligarBusca('buscaCondicoes', v => { _buscaCondicoes = v.toLowerCase(); renderCondicoesNaSecao(); });
  _ligarBusca('buscaPerigosComplexos', v => { _buscaPerigosComplexos = v.toLowerCase(); renderPerigosComplexosNaSecao(); });
  _ligarBusca('buscaPerigosVisao', v => { _buscaPerigosVisao = v.toLowerCase(); renderPerigosVisaoGeral(); });
  _ligarBusca('buscaClima', v => { _buscaClima = v.toLowerCase(); renderClimaNaSecao(); });
  _ligarBusca('buscaTerrenos', v => { _buscaTerrenos = v.toLowerCase(); renderTerrenosNaSecao(); });
  _ligarBusca('buscaMasmorras', v => { _buscaMasmorras = v.toLowerCase(); renderMasmorrasNaSecao(); });
  _ligarBusca('buscaErmos', v => { _buscaErmos = v.toLowerCase(); renderErmosNaSecao(); });
  _ligarBusca('buscaUrbano', v => { _buscaUrbano = v.toLowerCase(); renderUrbanoNaSecao(); });
  _ligarBusca('buscaAmbienteVisao', v => { _buscaAmbienteVisao = v.toLowerCase(); renderAmbienteVisaoBusca(); });
  _ligarBusca('buscaArmas', v => { _armaEstado.busca = v.toLowerCase(); renderArmasNaSecao(); });
  _ligarBusca('buscaArmaduras', v => { _armaduraEstado.busca = v.toLowerCase(); renderArmadurasNaSecao(); });
  _ligarBusca('buscaItensGerais', v => { _itemGeralEstado.busca = v.toLowerCase(); renderItensGeraisNaSecao(); });
  _ligarBusca('buscaModificadores', v => { _modificadorEstado.busca = v.toLowerCase(); renderModificadoresNaSecao(); });

  // ── BUSCA DE MAGIAS (4 seções) ──────────────────────────────
  ['todas', 'arcana', 'divina', 'universal'].forEach(secaoTipo => {
    _ligarBusca(MAGIA_SECAO_IDS[secaoTipo].busca, v => { _magiaEstado[secaoTipo].busca = v.toLowerCase(); renderMagiasNaSecao(secaoTipo); });
  });

  _ligarBusca('buscaPoderesCombate', v => { _pgEstado.combate.busca = v.toLowerCase(); renderPoderesGeraisNaSecao('combate'); });
  _ligarBusca('buscaPoderesDestino', v => { _pgEstado.destino.busca = v.toLowerCase(); renderPoderesGeraisNaSecao('destino'); });
  _ligarBusca('buscaPoderesMagia', v => { _pgEstado.magia.busca = v.toLowerCase(); renderPoderesGeraisNaSecao('magia'); });
  _ligarBusca('buscaPoderesConcedidos', v => { _pgEstado.concedidos.busca = v.toLowerCase(); renderPoderesGeraisNaSecao('concedidos'); });
  _ligarBusca('buscaPoderesTormenta', v => { _pgEstado.tormenta.busca = v.toLowerCase(); renderPoderesGeraisNaSecao('tormenta'); });
  _ligarBusca('buscaPoderesTodos', v => { _pgEstado.todos.busca = v.toLowerCase(); renderPoderesTodosNaSecao(); });

  // Busca global no topbar
  const buscaGlobal = document.getElementById('buscaGlobal');
  _ligarBusca('buscaGlobal', v => {
    termoBusca = v;
    if (termoBusca) mostrarSecao('racas');
    aplicarFiltros();
  });
  if (buscaGlobal) {
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey||e.metaKey) && e.key==='k') { e.preventDefault(); buscaGlobal.focus(); }
      if (e.key==='Escape') { fecharDetalhe(); toggleSidebarMobile(false); buscaGlobal.blur(); }
    });
  }

  // ── 7. INICIALIZAÇÃO ───────────────────────────────────────
  // Renderiza raças
  if (window.RACAS) {
    renderRacas(window.RACAS);

    // Popular nav com nomes das raças
    const navRacas = document.getElementById('navListaRacas');
    if (navRacas) {
      window.RACAS.forEach(r => {
        const cor = corPorTipo[r.tipo] || '#888';
        const item = document.createElement('div');
        item.className = 'nav-raca-item';
        item.dataset.raca = r.id;
        item.style.setProperty('--rc', cor);
        item.innerHTML = `<i class="ti ${r.icone}" aria-hidden="true" style="font-size:11px;color:${cor}"></i><span>${r.nome}</span>`;
        item.addEventListener('click', () => irParaRaca(r.id));
        navRacas.appendChild(item);
      });
    }
  }

  if (window.CLASSES) renderClasses(window.CLASSES);
  if (window.PERICIAS) renderPericias(window.PERICIAS);
  if (window.ORIGENS) renderOrigens(window.ORIGENS);
  if (window.DEUSES) renderDeuses(window.DEUSES);
  if (window.CRIATURAS) { renderCriaturasNaSecao(); carregarCombateSalvo(); atualizarPainelHerois(); }
  if (window.CONDICOES) renderCondicoesNaSecao();
  if (window.ALINHAMENTOS) renderToquesFinais();
  if (window.ATRIBUTOS_CUSTO) renderAtributosBasicos();
  if (window.TIPOS_PARCEIRO) { renderParceirosNaSecao(); calcularLimiteParceiros(); }
  if (window.PERIGOS_SIMPLES) { preencherFiltroCondicoesPerigo(); renderPerigosNaSecao(); }
  if (window.PERIGOS_COMPLEXOS) renderPerigosComplexosNaSecao();
  if (window.PERIGOS_SIMPLES || window.PERIGOS_COMPLEXOS) { preencherFiltroCondicoesPerigoVisao(); renderPerigosVisaoGeral(); }
  if (window.AMBIENTE_CLIMA) renderClimaNaSecao();
  if (window.AMBIENTE_TERRENO) renderTerrenosNaSecao();
  if (window.AMBIENTE_MASMORRA_ELEMENTO) renderMasmorrasNaSecao();
  if (window.AMBIENTE_ERMO_ELEMENTO) renderErmosNaSecao();
  if (window.AMBIENTE_URBANO_ASSENTAMENTO || window.AMBIENTE_URBANO_ELEMENTO) renderUrbanoNaSecao();
  if (window.AMBIENTE_VIAGEM_TABELA) { preencherSelectViagem(); calcularViagem(); renderViagemRegras(); }
  renderAmbienteHub();
  if (window.ARMAS) renderArmasNaSecao();
  if (window.ARMADURAS) renderArmadurasNaSecao();
  if (window.ITENS_GERAIS) renderItensGeraisNaSecao();
  if (window.ARMAS_ESPECIFICAS) renderArmasMagicasNaSecao();
  if (window.ARMADURAS_ESCUDOS_ESPECIFICOS) renderArmadurasMagicasNaSecao();
  if (window.MELHORIAS) { renderModificadoresNaSecao(); renderTipoFiltroModificador(); }
  if (window.POCOES_CATALOGO) renderPocoesCatalogoNaSecao();
  if (window.ACESSORIOS) renderAcessoriosNaSecao();
  if (window.ARTEFATOS) renderArtefatosNaSecao();
  if (window.MAGIAS) {
    renderMagiasNaSecao('todas');
    renderMagiasNaSecao('arcana');
    renderMagiasNaSecao('divina');
    renderMagiasNaSecao('universal');
  }
  if (window.PODERES_GERAIS) renderPoderesGeraisNaSecao('combate');
  if (window.PODERES_GERAIS) renderPoderesGeraisNaSecao('destino');
  if (window.PODERES_GERAIS) renderPoderesGeraisNaSecao('magia');
  if (window.PODERES_GERAIS) renderPoderesGeraisNaSecao('concedidos');
  if (window.PODERES_GERAIS) renderPoderesGeraisNaSecao('tormenta');
  if (window.PODERES_GERAIS) renderPoderesTodosNaSecao();

  // Restaura a última seção visitada (ou Raças, na primeira visita)
  ativarSecaoNav(localStorage.getItem(LS_SECAO) || 'racas');

  // ── SISTEMA DE TOOLTIP DE KEYWORDS ─────────────────────────
  (function iniciarTooltipKeywords() {
    const tooltipEl = document.getElementById('tooltip-kw');
    if (!tooltipEl) return;

    const tipoLabel = {
      acao:    'Ação',
      alcance: 'Alcance',
      pericia: 'Perícia',
      cond:    'Condição',
      regra:   'Poder / Regra',
      parceiro: 'Tipo de Parceiro',
    };

    // Mostrar ao entrar
    document.addEventListener('mouseover', (e) => {
      const kw = e.target.closest('.kw[data-tooltip]');
      if (!kw) return;

      const tipo  = kw.dataset.kwTipo  || '';
      const nome  = kw.dataset.kwNome  || kw.textContent;
      const desc  = kw.dataset.tooltip || '';

      tooltipEl.dataset.tipo = tipo;
      tooltipEl.querySelector('.tooltip-kw-tipo').textContent = tipoLabel[tipo] || tipo;
      tooltipEl.querySelector('.tooltip-kw-nome').textContent = nome;
      tooltipEl.querySelector('.tooltip-kw-desc').textContent = desc;
      tooltipEl.classList.add('visivel');
    });

    // Esconder ao sair
    document.addEventListener('mouseout', (e) => {
      if (!e.target.closest('.kw[data-tooltip]')) return;
      tooltipEl.classList.remove('visivel');
    });

    // Seguir o mouse com ajuste de borda de tela
    document.addEventListener('mousemove', (e) => {
      if (!tooltipEl.classList.contains('visivel')) return;

      const pad = 14;
      const tw  = tooltipEl.offsetWidth  || 280;
      const th  = tooltipEl.offsetHeight || 80;
      const vw  = window.innerWidth;
      const vh  = window.innerHeight;

      let x = e.clientX + pad;
      let y = e.clientY - th - pad;

      // Evita sair pela direita
      if (x + tw > vw - pad) x = e.clientX - tw - pad;
      // Evita sair pelo topo
      if (y < pad) y = e.clientY + pad;
      // Evita sair pelo rodapé
      if (y + th > vh - pad) y = vh - th - pad;

      tooltipEl.style.left = x + 'px';
      tooltipEl.style.top  = y + 'px';
    });
  })();

  // ══════════════════ PILHA DE REFERÊNCIAS CRUZADAS ══════════════════
  // Quando um nome citado dentro de um texto (via processarKeywords, ver
  // keywords.js) é clicado, o painel do alvo abre flutuando por cima da
  // seção atual, SEM navegar pra seção dele — diferente de irParaX(), que
  // os botões do menu lateral usam pra navegação de verdade.
  //
  // Os painéis (todos .detalhe-painel, mesma largura padronizada) são
  // position:absolute ancorados no .main (o container comum, nunca escondido por troca de
  // seção) — então basta mover o painel-alvo pra ser filho direto de
  // .main pra ele aparecer por cima de qualquer seção ativa, mesmo que a
  // seção "dona" dele esteja com display:none. Mesmo princípio já usado
  // no site pro reaproveitamento do widget de Sortear Perigo/Masmorra/
  // Perseguição entre seções.
  //
  // Todo tipo de bloco clicável em texto tem função de abrir registrada
  // aqui — padronizado pra todos os painéis de detalhe do site. `buscar`
  // recebe (chave, extra) — chave é id ou nome dependendo do tipo (segue
  // a mesma convenção que cada tipo já usava antes: raça/classe/origem/
  // deus/criatura/perigo por id, magia/item por nome, igual ao resto do
  // site); `extra` só é usado por item (tipo do equipamento) e ambiente
  // (coleção). `abrir` chama a função de abrir já existente de cada
  // painel — nenhuma delas foi reescrita, só reaproveitada.
  // Conteúdo do mini-painel — versão pequena/flutuante pra referências que
  // não têm painel grande próprio: Poder Geral, Poder de Classe e Perícia.
  // Reaproveita renderPoderHtml() (mesma função usada nas listas de
  // poderes) pros dois primeiros; Perícia ganha um template compacto
  // próprio, já que o schema é diferente (atributo-chave, usos[], etc.).
  function renderPericiaMiniHtml(p) {
    const kw = typeof processarKeywords === 'function' ? processarKeywords : (t) => t;
    const usosHtml = (p.usos || []).map(u => `
      <div class="mini-uso">
        <div class="mini-uso-nome">${u.nome}${u.cd ? ` <span class="mini-uso-cd">CD ${u.cd}</span>` : ''}</div>
        ${u.descricao ? `<div class="mini-uso-desc">${kw(u.descricao)}</div>` : ''}
      </div>`).join('');
    return `
      <div class="dp-badges">
        <span class="dp-badge">${p.atributoChave}</span>
        ${p.somenteTreinada ? `<span class="dp-badge">Só Treinada</span>` : ''}
        ${p.penalidadeArmadura ? `<span class="dp-badge">Penalidade de Armadura</span>` : ''}
      </div>
      <p class="dp-desc">${kw(p.descricao)}</p>
      ${usosHtml ? `<div class="dp-secao">Usos</div>${usosHtml}` : ''}
    `;
  }

  window.abrirMiniPainel = function(tipoLabel, corpoHtml, nome) {
    document.getElementById('miniTipo').textContent = tipoLabel;
    document.getElementById('miniNome').textContent = nome;
    document.getElementById('miniBody').innerHTML = corpoHtml;
    document.getElementById('miniPainel').classList.add('aberto');
  };
  window.fecharMiniPainel = function() {
    document.getElementById('miniPainel').classList.remove('aberto');
  };

  const BLOCO_REF_TIPOS = {
    raca:   { painelId: 'detalhePainel', buscar: id => (window.RACAS   || []).find(x => x.id === id), abrir: obj => window.abrirDetalhe(obj) },
    classe: { painelId: 'classePainel',  buscar: id => (window.CLASSES || []).find(x => x.id === id), abrir: obj => window.abrirDetalheClasse(obj) },
    origem: { painelId: 'origemPainel',  buscar: id => (window.ORIGENS || []).find(x => x.id === id), abrir: obj => window.abrirDetalheOrigem(obj) },
    deus:   { painelId: 'deusPainel',    buscar: id => (window.DEUSES  || []).find(x => x.id === id), abrir: obj => window.abrirDetalheDeus(obj) },
    magia:  { painelId: 'magiaPainel',   buscar: nome => (window.MAGIAS || []).find(x => x.nome === nome), abrir: obj => window.abrirDetalheMagia(obj.id) },
    item:   {
      painelId: 'equipPainel',
      buscar: (nome, tipo) => {
        const cfg = (typeof ITEM_TIPO_CONFIG !== 'undefined') ? ITEM_TIPO_CONFIG[tipo] : null;
        return cfg ? (cfg.lista() || []).find(x => x.nome === nome) : null;
      },
      abrir: (obj, tipo) => window.abrirDetalheEquip(tipo, obj.id),
    },
    criatura: { painelId: 'criaturaPainel', buscar: id => (window.CRIATURAS || []).find(x => x.id === id), abrir: obj => window.abrirDetalheCriatura(obj.id) },
    perigo:   { painelId: 'perigoPainel',   buscar: id => (window.PERIGOS_SIMPLES || []).find(x => x.id === id), abrir: obj => window.abrirDetalhePerigo(obj.id) },
    perigoComplexo: { painelId: 'perigoComplexoPainel', buscar: id => (window.PERIGOS_COMPLEXOS || []).find(x => x.id === id), abrir: obj => window.abrirDetalhePerigoComplexo(obj.id) },
    ambiente: {
      painelId: 'ambientePainel',
      buscar: (id, colecao) => (typeof ambienteBuscarItem === 'function') ? ambienteBuscarItem(colecao, id) : null,
      abrir: (obj, colecao) => window.abrirDetalheAmbiente(colecao, obj.id),
    },
    // Os três abaixo compartilham o MESMO painel físico (miniPainel) — não
    // têm painel grande próprio no site. Ver tratamento especial dentro de
    // abrirBlocoReferencia() pra troca de conteúdo em vez de empilhamento
    // quando o topo atual já é o mini-painel.
    poderGeral: {
      painelId: 'miniPainel',
      buscar: nome => (window.PODERES_GERAIS || []).find(x => x.nome === nome),
      abrir: obj => window.abrirMiniPainel('Poder Geral', renderPoderHtml(obj), obj.nome),
    },
    poderClasse: {
      painelId: 'miniPainel',
      buscar: (nome, classeId) => ((window.PODERES_CLASSES && window.PODERES_CLASSES[classeId]) || []).find(x => x.nome === nome),
      abrir: (obj, classeId) => {
        // Marca a classe como "contexto atual" (mesma variável que
        // abrirDetalheClasse usa) — assim, se a descrição deste poder
        // citar outro poder de nome repetido entre classes (ex: "Aumento
        // de Atributo"), keywords.js prioriza esta classe em vez de cair
        // sempre na primeira classe que tem aquele nome.
        window._classeAtualId = classeId;
        const classeInfo = (window.CLASSES || []).find(c => c.id === classeId);
        window.abrirMiniPainel(`Poder de ${classeInfo ? classeInfo.nome : 'Classe'}`, renderPoderHtml(obj), obj.nome);
      },
    },
    pericia: {
      painelId: 'miniPainel',
      buscar: nome => (window.PERICIAS || []).find(x => x.nome === nome),
      abrir: obj => window.abrirMiniPainel('Perícia', renderPericiaMiniHtml(obj), obj.nome),
    },
    condicao: {
      painelId: 'miniPainel',
      buscar: nome => (window.CONDICOES || []).find(x => x.nome === nome),
      abrir: obj => window.abrirMiniPainel('Condição', renderCondicaoMiniHtml(obj), obj.nome),
    },
  };

  // Todo painel de detalhe conhecido no site — usado só pra achar/rotular
  // o que já estava aberto quando uma referência é clicada, mesmo que seja
  // de um tipo ainda sem função de abrir registrada acima.
  const _TODOS_PAINEIS_REF = [
    { painelId: 'detalhePainel',       nomeSel: '#dpNome' },
    { painelId: 'classePainel',        nomeSel: '#cpNome' },
    { painelId: 'origemPainel',        nomeSel: '#opNome' },
    { painelId: 'deusPainel',          nomeSel: '#ddNome' },
    { painelId: 'criaturaPainel',      nomeSel: '#crNome' },
    { painelId: 'perigoPainel',        nomeSel: '#pgNome' },
    { painelId: 'perigoComplexoPainel',nomeSel: '#pgcNome' },
    { painelId: 'ambientePainel',      nomeSel: '#ambNome' },
    { painelId: 'equipPainel',         nomeSel: '#eqNome' },
    { painelId: 'magiaPainel',         nomeSel: '#mgNome' },
    { painelId: 'miniPainel',          nomeSel: '#miniNome' },
  ];

  // [{ painelId, nome, chave }] — índice 0 é a base, o último é o topo
  // visível. `chave` identifica o CONTEÚDO (não só o painel), necessário
  // porque miniPainel é um único elemento físico reaproveitado por 3
  // tipos diferentes — duas referências pro mini-painel em sequência não
  // empilham duas vezes o mesmo elemento, só trocam o conteúdo nele.
  let _pilhaRef = [];

  function _aplicarEmpilhamentoVisual() {
    _pilhaRef.forEach((item, i) => {
      const el = document.getElementById(item.painelId);
      if (!el) return;
      const profundidade = _pilhaRef.length - 1 - i; // 0 = topo (na frente)
      el.style.zIndex = String(200 + i);
      el.classList.toggle('ref-empilhado', profundidade > 0);
      el.style.setProperty('--ref-prof', profundidade);

      // Etiqueta vertical na tira visível de painéis grandes recuados —
      // mostra o nome de quem está atrás e pula direto pra ele ao
      // clicar (efeito baralho: dá pra reconhecer e escolher qualquer
      // painel visível na pilha, não só voltar um nível de cada vez). O
      // mini-painel não entra aqui — ele recua com um "pop" pequeno, não
      // faz sentido nele.
      if (item.painelId === 'miniPainel') return;
      let label = el.querySelector(':scope > .ref-prof-label');
      if (profundidade > 0) {
        if (!label) {
          label = document.createElement('div');
          label.className = 'ref-prof-label';
          el.insertBefore(label, el.firstChild);
        }
        label.textContent = item.nome;
        label.title = `Voltar para ${item.nome}`;
        label.onclick = (e) => { e.stopPropagation(); window.voltarReferencia(i + 1); };
      } else if (label) {
        label.remove();
      }
    });
  }

  function _renderTrilhaReferencia() {
    document.querySelectorAll('.ref-trilha').forEach(el => el.remove());
    if (_pilhaRef.length < 2) return; // só mostra a trilha quando há empilhamento de verdade
    const topo = _pilhaRef[_pilhaRef.length - 1];
    const painelTopoEl = document.getElementById(topo.painelId);
    if (!painelTopoEl) return;
    const trilha = document.createElement('div');
    trilha.className = 'ref-trilha';
    trilha.innerHTML = _pilhaRef.map((item, i) => {
      const ultimo = i === _pilhaRef.length - 1;
      return `<span class="ref-trilha-item ${ultimo ? 'ref-trilha-atual' : ''}"
                    ${ultimo ? '' : `onclick="event.stopPropagation(); window.voltarReferencia(${i + 1})"`}>${item.nome}</span>${
        !ultimo ? '<i class="ti ti-chevron-right ref-trilha-sep" aria-hidden="true"></i>' : ''
      }`;
    }).join('');
    painelTopoEl.insertBefore(trilha, painelTopoEl.firstChild);
  }

  // Bolinha no canto do painel do topo mostrando quantos níveis tem por
  // baixo — atalho visual pra quem não quer ler a trilha inteira. Clicar
  // nela volta um nível (igual clicar no penúltimo item da trilha).
  function _renderBadgeProfundidade() {
    document.querySelectorAll('.ref-prof-badge').forEach(el => el.remove());
    if (_pilhaRef.length < 2) return;
    const topo = _pilhaRef[_pilhaRef.length - 1];
    const painelTopoEl = document.getElementById(topo.painelId);
    if (!painelTopoEl) return;
    const badge = document.createElement('div');
    badge.className = 'ref-prof-badge';
    const qtd = _pilhaRef.length - 1;
    badge.textContent = String(qtd);
    badge.title = `${qtd} painel${qtd > 1 ? 'éis' : ''} aberto${qtd > 1 ? 's' : ''} por trás — clique pra voltar um nível`;
    badge.onclick = (e) => { e.stopPropagation(); window.voltarReferencia(_pilhaRef.length - 1); };
    painelTopoEl.appendChild(badge);
  }

  // Abre o painel de uma referência citada em texto, empilhando sobre o
  // que já estiver aberto (sem navegar de seção). Chamada pelos links
  // gerados em processarKeywords() (keywords.js).
  window.abrirBlocoReferencia = function(tipo, id, extra) {
    const info = BLOCO_REF_TIPOS[tipo];
    if (!info) return;
    const obj = info.buscar(id, extra);
    if (!obj) return;

    const el = document.getElementById(info.painelId);
    if (!el) return;

    const chave = `${tipo}::${id}::${extra || ''}`;
    const topoAtual = _pilhaRef[_pilhaRef.length - 1];

    // Já é o topo atual (clicou de novo na mesma referência) — não faz nada.
    if (topoAtual && topoAtual.chave === chave) return;

    // O topo atual já usa o MESMO painel físico (caso do mini-painel,
    // compartilhado por Poder Geral/Poder de Classe/Perícia) — troca o
    // conteúdo no lugar em vez de tentar empilhar o mesmo elemento duas
    // vezes (fisicamente só existe UM miniPainel no DOM).
    if (topoAtual && topoAtual.painelId === info.painelId) {
      info.abrir(obj, extra);
      topoAtual.nome = obj.nome;
      topoAtual.chave = chave;
      _renderTrilhaReferencia();
      _renderBadgeProfundidade();
      return;
    }

    // Primeira referência clicada nesta sessão de navegação: registra
    // como base da pilha qualquer painel que já estivesse aberto (de
    // qualquer tipo, mesmo sem função de abrir registrada acima).
    if (_pilhaRef.length === 0) {
      const abertoAntes = _TODOS_PAINEIS_REF.find(p => {
        if (p.painelId === info.painelId) return false;
        const pEl = document.getElementById(p.painelId);
        return pEl && pEl.classList.contains('aberto');
      });
      if (abertoAntes) {
        const nomeEl = document.querySelector(abertoAntes.nomeSel);
        _pilhaRef.push({ painelId: abertoAntes.painelId, nome: nomeEl ? nomeEl.textContent : '…', chave: `base::${abertoAntes.painelId}` });
      }
    }

    // Se o alvo já estava em algum ponto da pilha, só volta pra ele (evita
    // duplicar a mesma referência duas vezes empilhada).
    const idxExistente = _pilhaRef.findIndex(item => item.chave === chave);
    if (idxExistente !== -1) {
      window.voltarReferencia(idxExistente + 1);
      return;
    }

    // Move o painel-alvo pra ser filho direto de .main — garante que ele
    // apareça por cima da seção ativa mesmo que sua seção "dona" esteja
    // com display:none.
    const mainEl = document.querySelector('.main');
    if (mainEl && el.parentElement !== mainEl) mainEl.appendChild(el);

    info.abrir(obj, extra);
    el.classList.add('aberto');
    _pilhaRef.push({ painelId: info.painelId, nome: obj.nome, chave });
    _aplicarEmpilhamentoVisual();
    _renderBadgeProfundidade();
    _renderTrilhaReferencia();
  };

  // Volta a pilha até restar `nivelAlvo` painéis (1-based). Os painéis
  // acima nunca foram fechados de verdade — só empilhados visualmente por
  // trás — então "voltar" é apenas revelar de novo, sem reabrir nada.
  // BUG corrigido em 23/ago (relatado pelo usuário: "às vezes, quando fecho
  // um painel, a grade não volta pro layout dinâmico — e não sei o
  // gatilho"). A causa: voltarReferencia() é chamada por Esc, pelos itens
  // da trilha, pelo badge de profundidade E por clicar fora do
  // mini-painel — mas ela mesma tirava só a classe '.aberto' do painel na
  // mão, sem passar pelo fechar NATIVO de cada painel (fecharDetalheX(),
  // que é quem tira '.encolhido' da área de cards e '.selecionado' do
  // card — ver _fecharPainelDetalhe() lá em cima). Resultado: fechar pelo
  // X do painel funcionava certo, mas fechar por Esc/trilha/badge deixava
  // a grade da seção de baixo travada "encolhida" — parecia aleatório
  // porque dependia de QUAL caminho a pessoa usava pra fechar, não de
  // quando. Corrigido delegando pro fechar nativo de cada painel (mesmo
  // _PAINEL_FECHAR_FN que fecharTodosPaineisDetalhe usa, mais abaixo) —
  // agora TODO caminho de fechar (X, Esc, trilha, badge, clique fora do
  // mini-painel, troca de seção) passa pelo mesmo ritual único.
  window.voltarReferencia = function(nivelAlvo) {
    while (_pilhaRef.length > nivelAlvo) {
      const tamanhoAntes = _pilhaRef.length;
      const topo = _pilhaRef[_pilhaRef.length - 1];
      const fecharFn = _PAINEL_FECHAR_FN[topo.painelId];
      if (fecharFn && typeof window[fecharFn] === 'function') {
        window[fecharFn](); // já tira da pilha sozinho, via monkey-patch mais abaixo
      }
      // Segurança: painel sem fechar nativo mapeado (não deveria acontecer,
      // _TODOS_PAINEIS_REF e _PAINEL_FECHAR_FN sempre andam juntos) — tira
      // na mão só pra não travar o loop.
      if (_pilhaRef.length >= tamanhoAntes) {
        _pilhaRef.pop();
        document.getElementById(topo.painelId)?.classList.remove('aberto', 'ref-empilhado');
      }
    }
    _aplicarEmpilhamentoVisual();
    _renderTrilhaReferencia();
    _renderBadgeProfundidade();
  };

  // fecharPilhaReferencias() foi removida em 23/ago — nunca teve nenhum
  // caller (nem literal, nem via string dinâmica); equivalente a
  // voltarReferencia(0), que continua disponível pra quem precisar fechar a
  // pilha inteira de uma vez.

  // Esc fecha só o painel do topo da pilha de referências (um nível por
  // vez), em vez de fechar tudo de uma vez.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && _pilhaRef.length > 0) {
      window.voltarReferencia(_pilhaRef.length - 1);
    }
  });

  // Clicar FORA do mini-painel fecha ele (um nível, igual Esc/badge) —
  // ele é pequeno e flutuante, então se comporta como um pop-up de
  // verdade em vez de exigir achar o X. Só entra em ação quando o
  // mini-painel é realmente o topo da pilha; todo link kw (raça, classe,
  // poder etc.) já dá stopPropagation() no próprio clique, então nunca
  // chega aqui — isso só pega clique em espaço vazio, num card, na
  // sidebar etc.
  document.addEventListener('click', (e) => {
    const mini = document.getElementById('miniPainel');
    if (!mini || !mini.classList.contains('aberto') || mini.contains(e.target)) return;
    const topo = _pilhaRef[_pilhaRef.length - 1];
    if (!topo || topo.painelId !== 'miniPainel') return;
    window.voltarReferencia(_pilhaRef.length - 1);
  });

  // ── CORREÇÃO: fechar pelo X nativo do painel também tira da pilha ──
  // Bug: cada painel tem seu próprio botão de fechar (fecharDetalheDeus,
  // fecharDetalheMagia etc.), que sempre existiu ANTES da pilha de
  // referências e só sabe fechar a si mesmo — não sabia que existia uma
  // pilha. Se um painel empilhado (ex: Magia aberta por cima de Classe)
  // for fechado pelo X em vez de pela trilha/Esc, o painel de baixo
  // (Classe) ficava com a classe .ref-empilhado presa pra sempre —
  // recuado e com pointer-events:none, ou seja, travado, sem reação a
  // clique. Corrige interceptando o fechar nativo de cada painel: além
  // de fazer o que sempre fez, agora também tira aquele painel (e
  // qualquer coisa acima dele) da pilha e restaura a interatividade de
  // quem ficar exposto de novo.
  const _PAINEL_FECHAR_FN = {
    detalhePainel: 'fecharDetalhe',
    classePainel: 'fecharDetalheClasse',
    origemPainel: 'fecharDetalheOrigem',
    deusPainel: 'fecharDetalheDeus',
    criaturaPainel: 'fecharDetalheCriatura',
    perigoPainel: 'fecharDetalhePerigo',
    perigoComplexoPainel: 'fecharDetalhePerigoComplexo',
    ambientePainel: 'fecharDetalheAmbiente',
    equipPainel: 'fecharDetalheEquip',
    magiaPainel: 'fecharDetalheMagia',
    miniPainel: 'fecharMiniPainel',
  };

  // Fecha TODO painel de detalhe conhecido (usado por mostrarSecao() ao
  // trocar de seção pela sidebar). Bug real corrigido em 23/ago:
  // mostrarSecao() só fechava Raça/Classe (hardcoded, de antes da pilha de
  // referências existir) — como agora qualquer painel pode ficar reparentado
  // em .main (fora da sua seção "dona"), trocar de seção sem fechar os
  // outros 8 deixava painel de uma seção flutuando por cima de outra
  // completamente diferente. Reaproveita _PAINEL_FECHAR_FN — chamar cada
  // fechar nativo já limpa a pilha sozinho via o monkey-patch abaixo.
  window.fecharTodosPaineisDetalhe = function() {
    Object.values(_PAINEL_FECHAR_FN).forEach(nomeFn => {
      if (typeof window[nomeFn] === 'function') window[nomeFn]();
    });
  };

  function _removerDaPilhaRef(painelId) {
    const idx = _pilhaRef.findIndex(item => item.painelId === painelId);
    if (idx === -1) return;
    // Tira esse painel e qualquer coisa empilhada ACIMA dele (não deveria
    // existir nada acima já que só o topo tem o X clicável, mas cobre o
    // caso mesmo assim). O painel que disparou o fechar (painelId) já tem
    // sua própria classe 'aberto' (e 'encolhido'/'selecionado', pelo ritual
    // de _fecharPainelDetalhe) removida pela função nativa original — aqui
    // só limpamos o que sobra do estado de EMPILHAMENTO (visual de pilha,
    // não o painel em si).
    const removidos = _pilhaRef.splice(idx);
    // Mesma limpeza que voltarReferencia() fazia na mão antes de 23/ago —
    // centralizada aqui porque agora voltarReferencia() também passa por
    // este caminho (ver comentário lá). Sem isso, um painel fechado por
    // Esc/trilha ficava com '.ref-empilhado' + zIndex + '--ref-prof'
    // grudados (invisível enquanto fechado, mas reaparecia torto —
    // recuado e com pointer-events:none — se reaberto do zero depois).
    removidos.forEach(item => {
      const el = document.getElementById(item.painelId);
      if (el) {
        el.classList.remove('ref-empilhado');
        el.style.zIndex = '';
        el.style.removeProperty('--ref-prof');
        el.querySelector(':scope > .ref-prof-label')?.remove();
      }
    });
    _aplicarEmpilhamentoVisual();
    _renderTrilhaReferencia();
    _renderBadgeProfundidade();
  }

  Object.entries(_PAINEL_FECHAR_FN).forEach(([painelId, nomeFn]) => {
    const original = window[nomeFn];
    if (typeof original !== 'function') return;
    window[nomeFn] = function (...args) {
      const resultado = original.apply(this, args);
      _removerDaPilhaRef(painelId);
      return resultado;
    };
  });

});