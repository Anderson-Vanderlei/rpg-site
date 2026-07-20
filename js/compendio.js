/* ============================================================
   TORMENTA 20 — compendio.js
   Nav hierárquico, cards de raças, painel de detalhes, busca
============================================================ */

let _cpTodosPoderes  = [];
let _cpPoderFiltro   = 'todos';
let _cpPoderBusca    = '';
let _cpNivelFiltro = 0; // 0 = sem filtro de nível

// ── SELEÇÃO DE PODERES PARA O PERSONAGEM ───────────────────
const T20_STORAGE_KEY = 't20_personagem_poderes';

function _carregarPoderesSelecionados() {
  try {
    return JSON.parse(localStorage.getItem(T20_STORAGE_KEY) || '[]');
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
const T20_OPCAO_STORAGE_KEY = 't20_personagem_opcoes';

function _carregarOpcoesSelecionadas() {
  try { return JSON.parse(localStorage.getItem(T20_OPCAO_STORAGE_KEY) || '[]'); }
  catch { return []; }
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

    if (alvo) {
      const grupo = alvo.closest('.nav-grupo');
      const grupoLabel = grupo?.querySelector('.grupo-label')?.textContent.trim();
      if (grupoLabel) partes.push(grupoLabel);

      const ehSubSub = alvo.classList.contains('nav-sub-sub-item');
      if (ehSubSub) {
        const subItemPai = alvo.closest('.nav-sub-sub')?.previousElementSibling;
        const subLabel = subItemPai?.querySelector('.sub-label')?.textContent.trim();
        if (subLabel) partes.push(subLabel);
      }

      const label = alvo.querySelector('.sub-label, span')?.textContent.trim();
      if (label) partes.push(label);
    }

    bcEl.innerHTML = partes.map((p, i) => `
      ${i > 0 ? '<i class="ti ti-chevron-right bc-sep" aria-hidden="true"></i>' : ''}
      <span class="bc-item${i === partes.length - 1 ? ' bc-atual' : ''}">${p}</span>
    `).join('');
  }

  function mostrarSecao(nome) {
    secaoAtual.nome = nome;
    document.querySelectorAll('.secao-conteudo').forEach(s => s.style.display = 'none');
    const el = document.getElementById('secao-' + nome);
    if (el) el.style.display = 'flex';
    fecharDetalhe();
    fecharDetalheClasse();
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
          <div class="rc-desc">${r.descricao}</div>
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
          <div class="cp-var-opt-desc">${op.descricao}</div>
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

    const LABEL_CATEGORIA_PODER = { combate: 'Combate', destino: 'Destino', magia: 'Magia', concedidos: 'Concedidos', tormenta: 'Tormenta' };
    const categoriaTag = p.categoria
      ? `<span class="cp-tag-categoria">${LABEL_CATEGORIA_PODER[p.categoria] || p.categoria}</span>`
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
      <div class="cp-poder"
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
    document.querySelectorAll(`#${grupoId} .filtro-btn`).forEach(b => b.classList.remove('a'));
    btn.classList.add('a');
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
    document.getElementById('magiaPainel').classList.remove('aberto');
    MAGIA_SECOES_TODAS.forEach(s => {
      document.getElementById(s)?.querySelector('.cards-area')?.classList.remove('encolhido');
    });
    document.querySelectorAll('.magia-card').forEach(c => c.classList.remove('selecionado'));
  };

  // Clique num nome de magia citado em qualquer descrição do site (kw-magia)
  // leva pra "Todas as Magias", com os filtros resetados e a busca já
  // preenchida, e abre o painel de detalhe direto — sem precisar de um
  // segundo clique no card.
  window.irParaMagia = function(nome) {
    const m = (window.MAGIAS || []).find(x => x.nome === nome);
    if (!m) return;

    mostrarSecao('magias-todas');

    _magiaEstado.todas.tipo = 'todos';
    _magiaEstado.todas.circulo = 'todos';
    _magiaEstado.todas.escola = 'todos';
    _magiaEstado.todas.busca = nome.toLowerCase();

    document.querySelectorAll('#magiasTodasFiltroTipo .filtro-btn, #magiasTodasFiltroCirculo .filtro-btn, #magiasTodasFiltroEscola .filtro-btn')
      .forEach(b => b.classList.remove('a'));
    document.querySelector('#magiasTodasFiltroTipo .filtro-btn')?.classList.add('a');
    document.querySelector('#magiasTodasFiltroCirculo .filtro-btn')?.classList.add('a');
    document.querySelector('#magiasTodasFiltroEscola .filtro-btn')?.classList.add('a');

    const buscaInput = document.getElementById('buscaMagiasTodas');
    if (buscaInput) buscaInput.value = nome;

    renderMagiasNaSecao('todas');
    setTimeout(() => abrirDetalheMagia(m.id), 50);
  };

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
    document.querySelectorAll(`#poderes${categoria.charAt(0).toUpperCase()}${categoria.slice(1)}Filtros .filtro-btn`).forEach(b => b.classList.remove('a'));
    btn.classList.add('a');
    _pgEstado[categoria].tipo = tipo;
    renderPoderesGeraisNaSecao(categoria);
  };

  // Filtro da página combinada — eixo (categoria|tipo) é independente do valor.
  window.setFiltroPoderTodos = (btn, eixo, valor) => {
    const grupoId = eixo === 'categoria' ? 'poderesTodosFiltrosCategoria' : 'poderesTodosFiltrosTipo';
    document.querySelectorAll(`#${grupoId} .filtro-btn`).forEach(b => b.classList.remove('a'));
    btn.classList.add('a');
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

  // Clique num chip de poder geral (ex: Poderes Concedidos no painel de um Deus)
  // leva até a categoria certa já filtrada só por aquele nome.
  window.irParaPoderGeral = function(nome, categoria) {
    mostrarSecao('poderes-' + categoria);
    setTimeout(() => {
      const cap = categoria.charAt(0).toUpperCase() + categoria.slice(1);
      const input = document.getElementById('buscaPoderes' + cap);
      if (input) input.value = nome;
      _pgEstado[categoria].busca = nome.toLowerCase();
      renderPoderesGeraisNaSecao(categoria);
    }, 50);
  };

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
    classePainelEl?.classList.remove('aberto');
    classesAreaEl?.classList.remove('encolhido');
    document.querySelectorAll('.class-card').forEach(c => c.classList.remove('selecionado'));
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
    document.querySelectorAll('#classesFiltros .filtro-btn').forEach(b => b.classList.remove('a'));
    btn.classList.add('a');
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
        <div class="dp-hab-desc">${h.descricao}</div>
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
    document.querySelector('.cards-area')?.classList.add('encolhido');
  };

  window.fecharDetalhe = () => {
    painelEl.classList.remove('aberto');
    document.querySelector('.cards-area')?.classList.remove('encolhido');
    document.querySelectorAll('.race-card').forEach(c => c.classList.remove('selecionado'));
  };

  // ── PAINEL DE DETALHE DE ORIGEM ─────────────────────────────
  const origemPainelEl = document.getElementById('origemPainel');

  window.abrirDetalheOrigem = function(o) {
    if (!o) return;
    const kw = typeof processarKeywords === 'function' ? processarKeywords : (t) => t;

    document.getElementById('opHeroIcon').className = `ti ${o.icone} dp-hero-icon`;
    document.getElementById('opNome').textContent = o.nome;
    document.getElementById('opSub').textContent = o.temas.join(' · ');

    const periciasHtml = o.periciasOferecidas.length
      ? `<div class="op-lista-chips">${o.periciasOferecidas.map(p => kw(p)).join('')}</div>` : '';
    const poderesGeraisHtml = o.poderesGeraisOferecidos.length
      ? `<div class="op-lista-chips">${o.poderesGeraisOferecidos.map(p => `<span class="op-poder-geral">${p}</span>`).join('')}</div>` : '';
    const escolhaLivreHtml = o.escolhaLivre
      ? `<div class="op-escolha-livre"><i class="ti ti-dice" aria-hidden="true"></i> ${kw(o.escolhaLivre.descricao)}</div>` : '';

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

      <div class="dp-secao">Benefícios · escolha 2</div>
      ${periciasHtml}
      ${poderesGeraisHtml}
      ${escolhaLivreHtml}

      <div class="op-poder-unico-painel">
        <div class="op-pu-hd">
          <div class="op-pu-ic"><i class="ti ti-award" aria-hidden="true"></i></div>
          <div>
            <div class="op-pu-legenda">Poder único · ${o.nome}</div>
            <div class="op-pu-nome">${o.poderUnico.nome}</div>
          </div>
        </div>
        <div class="op-pu-desc">${kw(o.poderUnico.descricao)}</div>
      </div>`;

    document.querySelectorAll('.origem-card').forEach(c => c.classList.remove('selecionado'));
    document.querySelector(`.origem-card[data-id="${o.id}"]`)?.classList.add('selecionado');

    origemPainelEl.classList.add('aberto');
    document.querySelector('#secao-origens .cards-area')?.classList.add('encolhido');
  };

  window.fecharDetalheOrigem = function() {
    origemPainelEl.classList.remove('aberto');
    document.querySelector('#secao-origens .cards-area')?.classList.remove('encolhido');
    document.querySelectorAll('.origem-card').forEach(c => c.classList.remove('selecionado'));
  };

  // ── PAINEL DE DETALHE DE DEUS ────────────────────────────────
  const deusPainelEl = document.getElementById('deusPainel');

  function chipsDevoto(nomes, tipo) {
    return nomes.map(nome => {
      const lista = tipo === 'raca' ? (window.RACAS || []) : (window.CLASSES || []);
      const alvo = lista.find(x => x.nome === nome);
      const fn = tipo === 'raca' ? 'irParaRaca' : 'irParaClasse';
      return alvo
        ? `<span class="dd-devoto-link" onclick="${fn}('${alvo.id}')">${nome}</span>`
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
      <div class="dd-poder-chips">
        ${d.poderesConcedidos.map(p => `<span class="op-poder-geral" style="cursor:pointer" onclick="irParaPoderGeral('${p.replace(/'/g, "\\'")}', 'concedidos')">${p}</span>`).join('')}
      </div>

      <div class="dp-secao">Obrigações e Restrições</div>
      <p class="dp-desc">${kw(d.obrigacoes)}</p>
      <p style="font-size:10.5px;color:#775; line-height:1.5">Violar = perde todos os PM até o próximo dia (penitência se violar de novo na mesma aventura).</p>`;

    document.querySelectorAll('.deus-card').forEach(c => c.classList.remove('selecionado'));
    document.querySelector(`.deus-card[data-id="${d.id}"]`)?.classList.add('selecionado');

    deusPainelEl.classList.add('aberto');
    document.querySelector('#secao-deuses .cards-area')?.classList.add('encolhido');
  };

  window.fecharDetalheDeus = function() {
    deusPainelEl.classList.remove('aberto');
    document.querySelector('#secao-deuses .cards-area')?.classList.remove('encolhido');
    document.querySelectorAll('.deus-card').forEach(c => c.classList.remove('selecionado'));
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
    document.querySelectorAll('#racasFiltros .filtro-btn').forEach(b => b.classList.remove('a'));
    btn.classList.add('a');
    filtroTipo = tipo;
    aplicarFiltros();
  };

  // Busca na toolbar inline
  const buscaInline = document.getElementById('buscaRacas');
  if (buscaInline) {
    buscaInline.addEventListener('input', () => {
      termoBusca = buscaInline.value.trim();
      aplicarFiltros();
    });
  }

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

  function renderPericiaLinha(p) {
    const kw = typeof processarKeywords === 'function' ? processarKeywords : (t) => t;
    const temUsos = p.usos && p.usos.length > 0;
    const temNota = !!p.notaGeral;
    const temOpcoes = p.opcoes && p.opcoes.length > 0;
    const temExpansao = temUsos || temNota || temOpcoes;

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
    document.querySelectorAll('#periciasFiltros .filtro-btn').forEach(b => b.classList.remove('a'));
    btn.classList.add('a');
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

  const buscaPericiasInline = document.getElementById('buscaPericias');
  if (buscaPericiasInline) {
    buscaPericiasInline.addEventListener('input', () => {
      termoBuscaPericia = buscaPericiasInline.value.trim();
      aplicarFiltrosPericias();
    });
  }

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
    document.querySelectorAll('#origensFiltros .filtro-btn').forEach(b => b.classList.remove('a'));
    btn.classList.add('a');
    filtroTemaOrigem = tema;
    aplicarFiltrosOrigens();
  };

  const buscaOrigensInline = document.getElementById('buscaOrigens');
  if (buscaOrigensInline) {
    buscaOrigensInline.addEventListener('input', () => {
      termoBuscaOrigem = buscaOrigensInline.value.trim();
      aplicarFiltrosOrigens();
    });
  }

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
    document.querySelectorAll('#deusesFiltros .filtro-btn').forEach(b => b.classList.remove('a'));
    btn.classList.add('a');
    filtroEnergiaDeus = energia;
    aplicarFiltrosDeuses();
  };

  const buscaDeusesInline = document.getElementById('buscaDeuses');
  if (buscaDeusesInline) {
    buscaDeusesInline.addEventListener('input', () => {
      termoBuscaDeus = buscaDeusesInline.value.trim();
      aplicarFiltrosDeuses();
    });
  }

  // ── BUSCA DE PODERES GERAIS (por categoria) ─────────────────
  // ── BUSCA DE MAGIAS (4 seções) ──────────────────────────────
  ['todas', 'arcana', 'divina', 'universal'].forEach(secaoTipo => {
    const ids = MAGIA_SECAO_IDS[secaoTipo];
    const input = document.getElementById(ids.busca);
    if (input) {
      input.addEventListener('input', () => {
        _magiaEstado[secaoTipo].busca = input.value.trim().toLowerCase();
        renderMagiasNaSecao(secaoTipo);
      });
    }
  });

  const buscaPoderesCombateInline = document.getElementById('buscaPoderesCombate');
  if (buscaPoderesCombateInline) {
    buscaPoderesCombateInline.addEventListener('input', () => {
      _pgEstado.combate.busca = buscaPoderesCombateInline.value.trim().toLowerCase();
      renderPoderesGeraisNaSecao('combate');
    });
  }

  const buscaPoderesDestinoInline = document.getElementById('buscaPoderesDestino');
  if (buscaPoderesDestinoInline) {
    buscaPoderesDestinoInline.addEventListener('input', () => {
      _pgEstado.destino.busca = buscaPoderesDestinoInline.value.trim().toLowerCase();
      renderPoderesGeraisNaSecao('destino');
    });
  }

  const buscaPoderesMagiaInline = document.getElementById('buscaPoderesMagia');
  if (buscaPoderesMagiaInline) {
    buscaPoderesMagiaInline.addEventListener('input', () => {
      _pgEstado.magia.busca = buscaPoderesMagiaInline.value.trim().toLowerCase();
      renderPoderesGeraisNaSecao('magia');
    });
  }

  const buscaPoderesConcedidosInline = document.getElementById('buscaPoderesConcedidos');
  if (buscaPoderesConcedidosInline) {
    buscaPoderesConcedidosInline.addEventListener('input', () => {
      _pgEstado.concedidos.busca = buscaPoderesConcedidosInline.value.trim().toLowerCase();
      renderPoderesGeraisNaSecao('concedidos');
    });
  }

  const buscaPoderesTormentaInline = document.getElementById('buscaPoderesTormenta');
  if (buscaPoderesTormentaInline) {
    buscaPoderesTormentaInline.addEventListener('input', () => {
      _pgEstado.tormenta.busca = buscaPoderesTormentaInline.value.trim().toLowerCase();
      renderPoderesGeraisNaSecao('tormenta');
    });
  }

  const buscaPoderesTodosInline = document.getElementById('buscaPoderesTodos');
  if (buscaPoderesTodosInline) {
    buscaPoderesTodosInline.addEventListener('input', () => {
      _pgEstado.todos.busca = buscaPoderesTodosInline.value.trim().toLowerCase();
      renderPoderesTodosNaSecao();
    });
  }

  // Busca global no topbar
  const buscaGlobal = document.getElementById('buscaGlobal');
  if (buscaGlobal) {
    buscaGlobal.addEventListener('input', () => {
      termoBusca = buscaGlobal.value.trim();
      if (termoBusca) mostrarSecao('racas');
      aplicarFiltros();
    });
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

});