/* ============================================================
   TORMENTA 20 — compendio.js
   Nav hierárquico, cards de raças, painel de detalhes, busca
============================================================ */

let _cpTodosPoderes  = [];
let _cpPoderFiltro   = 'todos';
let _cpPoderBusca    = '';

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

  // ── 4B. RENDERIZAR CARDS DE CLASSES ────────────────────────

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
              Começa com <strong class="pv-texto">${c.pvInicial}</strong> PV
              + <strong class="pv-texto">${c.pvPorNivel > 0 ? '+' : ''}${c.pvPorNivel} PV</strong> por nível
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
        <div class="cp-secao"><i class="ti ti-bolt" aria-hidden="true"></i> Poderes de ${c.nome}</div>
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
            placeholder="Buscar poder…" oninput="buscarPoderesPainel(this.value)">
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

    // Legenda de keywords
    html += `
      <div class="cp-legenda">
        <div class="cp-leg-item"><span class="kw-acao">ação</span><span>tipo de ação</span></div>
        <div class="cp-leg-item"><span class="kw-pericia">perícia</span><span>perícia</span></div>
        <div class="cp-leg-item"><span class="kw-poder">poder</span><span>poder/regra</span></div>
        <div class="cp-leg-item"><span class="num-dano">+2d6</span><span>dano</span></div>
        <div class="cp-leg-item"><span class="num-bonus">+2</span><span>bônus</span></div>
        <div class="cp-leg-item"><span class="num-pm">3 PM</span><span>custo PM</span></div>
      </div>`;

    document.getElementById('cpBody').innerHTML = html;
    if (_cpTodosPoderes.length > 0) renderPoderesNoPainel();

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

    const duracaoInfo = typeof detectarDuracao === 'function'
      ? detectarDuracao(p.descricao) : null;
    const duracaoTag = duracaoInfo
      ? `<span class="badge-dur ${duracaoInfo.classe}">${duracaoInfo.label}</span>`
      : '';

    const prereqHtml = p.prerequisito
      ? `<div class="cp-prereq">
          <span class="cp-prereq-label">Pré-req:</span>
          ${p.prerequisito.split(',').map(r =>
            `<span class="cp-prereq-node">${r.trim()}</span>`
          ).join('<span class="cp-prereq-arrow">→</span>')}
         </div>` : '';

    const opcoesHtml = (p.opcoes && p.opcoes.length > 0)
      ? `<div class="cp-escolha" style="margin-top:10px">
          <div class="cp-esc-hd">
            <div class="cp-esc-ic">
              <i class="ti ti-list-check" aria-hidden="true"></i>
            </div>
            <div>
              <div class="cp-esc-titulo">Escolha um ${p.nome}</div>
              <div class="cp-esc-sub">${p.opcoes.length} opções disponíveis</div>
            </div>
          </div>
          <div class="cp-esc-opcoes">
            ${p.opcoes.map(op => `
              <div class="cp-esc-opt">
                <div class="cp-esc-opt-nome">${op.nome}</div>
                <div class="cp-esc-opt-desc">${processarKeywords(op.descricao || '')}</div>
              </div>`).join('')}
          </div>
        </div>`
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
          ${tipoTag}${pmTag}${nivelTag}${duracaoTag}
        </div>
        <div class="cp-poder-desc">${kw(p.descricao || '')}</div>
        ${prereqHtml}
        ${opcoesHtml}
        ${addBtn}
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

  function renderPoderesNoPainel() {
    const container = document.getElementById('cpPoderesContainer');
    if (!container) return;

    const busca = _cpPoderBusca.toLowerCase();

    const filtrados = _cpTodosPoderes.filter(p => {
      const okTipo = _cpPoderFiltro === 'todos' || p.tipo === _cpPoderFiltro;
      const okBusca = !busca
        || (p.nome || '').toLowerCase().includes(busca)
        || (p.descricao || '').toLowerCase().includes(busca);
      return okTipo && okBusca;
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
          ${itens.map(p => renderPoderHtml(p)).join('')}
        </div>`;
    }

    container.innerHTML = html;
  }

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

  window.toggleCategoriaPoderes = (catId) => {
    const body = document.getElementById(catId + '-body');
    const hd   = document.getElementById(catId + '-hd');
    if (!body) return;
    body.classList.toggle('collapsed');
    hd.classList.toggle('collapsed');
  };

  window.fecharDetalheClasse = () => {
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
        item.innerHTML = `<div class="raca-dot"></div><span>${r.nome}</span>`;
        item.addEventListener('click', () => irParaRaca(r.id));
        navRacas.appendChild(item);
      });
    }
  }

  if (window.CLASSES) renderClasses(window.CLASSES);

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