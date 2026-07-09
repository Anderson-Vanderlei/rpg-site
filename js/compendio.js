/* ============================================================
   TORMENTA 20 — compendio.js
   Nav hierárquico, cards de raças, painel de detalhes, busca
============================================================ */

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

  // Restaura a última seção visitada (ou Raças, na primeira visita)
  ativarSecaoNav(localStorage.getItem(LS_SECAO) || 'racas');

});