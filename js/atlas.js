/* ============================================================
   ATLAS DE ARTON — atlas.js
   Cursor, zoom/drag, nuvens, regiões, pontos, painel, modal
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. TELA DE INTRO ──────────────────────────────────────
  const intro = document.getElementById('introScreen');
  if (intro) {
    setTimeout(() => {
      intro.classList.add('saindo');
      setTimeout(() => intro.remove(), 900);
    }, 2200);
  }

  // ── 2. CURSOR PERSONALIZADO ───────────────────────────────
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (dot && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });
    const animRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    };
    animRing();
    document.querySelectorAll('button, a, .map-point, .regiao-shape, .fp-item, .search-item, .z-btn').forEach(el => {
      el.addEventListener('mouseenter', () => { dot.classList.add('hover'); ring.classList.add('hover'); });
      el.addEventListener('mouseleave', () => { dot.classList.remove('hover'); ring.classList.remove('hover'); });
    });
  }

  // ── 3. ZOOM E DRAG DO MAPA ────────────────────────────────
  const mapWrap = document.getElementById('mapWrap');
  const mapContainer = document.getElementById('mapContainer');
  let scale = 1, tx = 0, ty = 0;
  let dragging = false, startX, startY, startTX, startTY;

  function applyTransform() {
    mapContainer.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    mapContainer.style.transformOrigin = '0 0';
  }

  // Zoom com scroll
  mapWrap.addEventListener('wheel', e => {
    e.preventDefault();
    const rect = mapWrap.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const delta = e.deltaY > 0 ? -0.12 : 0.12;
    const novoScale = Math.max(0.5, Math.min(4, scale + delta));
    const ratio = novoScale / scale;
    tx = mouseX - ratio * (mouseX - tx);
    ty = mouseY - ratio * (mouseY - ty);
    scale = novoScale;
    applyTransform();
  }, { passive: false });

  // Drag
  mapWrap.addEventListener('mousedown', e => {
    if (e.target.closest('.painel, .modal-overlay, .z-btn, .sb-btn, .fp-item, .map-point, .regiao-shape, .topbar-search, .btn-novo-ponto')) return;
    dragging = true;
    startX = e.clientX; startY = e.clientY;
    startTX = tx; startTY = ty;
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    tx = startTX + (e.clientX - startX);
    ty = startTY + (e.clientY - startY);
    applyTransform();
  });
  window.addEventListener('mouseup', () => dragging = false);

  // Touch (mobile)
  let lastTouchDist = 0;
  mapWrap.addEventListener('touchstart', e => {
    if (e.touches.length === 2) {
      lastTouchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    } else {
      dragging = true;
      startX = e.touches[0].clientX; startY = e.touches[0].clientY;
      startTX = tx; startTY = ty;
    }
  }, { passive: true });
  mapWrap.addEventListener('touchmove', e => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      scale = Math.max(0.5, Math.min(4, scale * (dist / lastTouchDist)));
      lastTouchDist = dist;
      applyTransform();
    } else if (dragging) {
      tx = startTX + (e.touches[0].clientX - startX);
      ty = startTY + (e.touches[0].clientY - startY);
      applyTransform();
    }
  }, { passive: true });
  mapWrap.addEventListener('touchend', () => dragging = false);

  // Botões de zoom
  window.zmIn    = () => { scale = Math.min(4, scale + 0.25); applyTransform(); };
  window.zmOut   = () => { scale = Math.max(0.5, scale - 0.25); applyTransform(); };
  window.zmReset = () => { scale = 1; tx = 0; ty = 0; applyTransform(); };

  // Coordenadas
  const coordsEl = document.getElementById('mapCoords');
  mapWrap.addEventListener('mousemove', e => {
    if (!coordsEl) return;
    const rect = mapWrap.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left - tx) / scale / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top - ty) / scale / rect.height) * 100);
    coordsEl.textContent = `${x}° L · ${y}° S`;
  });

  // ── 4. NUVENS ANIMADAS ────────────────────────────────────
  const canvas = document.getElementById('cloudsCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width  = mapWrap.clientWidth;
      canvas.height = mapWrap.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const nuvens = Array.from({ length: 8 }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height * 0.6,
      r:  40 + Math.random() * 70,
      vx: 0.05 + Math.random() * 0.12,
      op: 0.02 + Math.random() * 0.05,
    }));

    const animNuvens = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nuvens.forEach(n => {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        g.addColorStop(0, `rgba(240,230,210,${n.op})`);
        g.addColorStop(1, 'rgba(240,230,210,0)');
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
        n.x += n.vx;
        if (n.x - n.r > canvas.width) n.x = -n.r;
      });
      requestAnimationFrame(animNuvens);
    };
    animNuvens();
  }

  // ── 5. RENDERIZAR PONTOS DO MAPA ─────────────────────────
  const mapContainer2 = document.getElementById('mapContainer');
  const corMap = {
    capital:   { cor: '#c9a84c', glow: 'rgba(201,168,76,0.35)',  icone: 'ti-crown'    },
    cidade:    { cor: '#cc8844', glow: 'rgba(204,136,68,0.3)',   icone: 'ti-building' },
    magico:    { cor: '#8888ff', glow: 'rgba(136,136,255,0.35)', icone: 'ti-sparkles' },
    fortaleza: { cor: '#5588aa', glow: 'rgba(85,136,170,0.3)',   icone: 'ti-shield'   },
    perigo:    { cor: '#cc2222', glow: 'rgba(204,34,34,0.4)',    icone: 'ti-skull'    },
    tormenta:  { cor: '#8B0000', glow: 'rgba(139,0,0,0.5)',      icone: 'ti-storm'    },
    masmorra:  { cor: '#664466', glow: 'rgba(102,68,102,0.35)',  icone: 'ti-flame'    },
    ruinas:    { cor: '#886644', glow: 'rgba(136,102,68,0.3)',   icone: 'ti-building-community' },
    regiao:    { cor: '#44aa66', glow: 'rgba(68,170,102,0.3)',   icone: 'ti-map-pin'  },
  };

  const perigoLabel = {
    baixo:   'Perigo Baixo',
    medio:   'Perigo Médio',
    alto:    'Perigo Alto',
    extremo: 'Perigo Extremo',
  };

  if (window.LOCAIS && mapContainer2) {
    window.LOCAIS.forEach(local => {
      const info = corMap[local.tipo] || corMap.cidade;
      const grande = local.destaque ? ' grande' : '';
      const isTormenta = local.tipo === 'tormenta' ? ' tormenta' : '';

      const el = document.createElement('div');
      el.className = `map-point${grande}`;
      el.dataset.id = local.id;
      el.dataset.tipo = local.tipo;
      el.style.cssText = `left:${local.x}%;top:${local.y}%;--pc:${info.cor};--pc-g:${info.glow}`;

      el.innerHTML = `
        <div class="point-ring${isTormenta}">
          <div class="point-dot"></div>
        </div>
        <div class="point-label">${local.nome}</div>
        <div class="point-tooltip" style="--pc:${info.cor}">
          <div class="pt-nome">${local.nome}</div>
          <div class="pt-tipo">${local.subtitulo}</div>
        </div>
      `;

      el.addEventListener('click', () => abrirPainel(local));
      mapContainer2.appendChild(el);
    });
  }

  // ── 6. RENDERIZAR REGIÕES SVG ────────────────────────────
  const svgEl = document.getElementById('regionsSvg');
  if (window.REGIOES && svgEl) {
    window.REGIOES.forEach(reg => {
      // Shape
      let shape;
      if (reg.ellipse) {
        shape = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        shape.setAttribute('cx', reg.ellipse.cx);
        shape.setAttribute('cy', reg.ellipse.cy);
        shape.setAttribute('rx', reg.ellipse.rx);
        shape.setAttribute('ry', reg.ellipse.ry);
      } else {
        shape = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        shape.setAttribute('points', reg.pontos);
      }
      shape.setAttribute('fill', reg.corFill);
      shape.setAttribute('stroke', reg.corStroke);
      shape.setAttribute('stroke-width', '0.15');
      shape.classList.add('regiao-shape');
      shape.dataset.id = reg.id;
      svgEl.appendChild(shape);

      // Label
      const lbl = document.getElementById('lbl-' + reg.id);

      shape.addEventListener('mouseenter', () => {
        if (lbl) lbl.classList.add('visivel');
      });
      shape.addEventListener('mouseleave', () => {
        if (!shape.classList.contains('ativa') && lbl) {
          lbl.classList.remove('visivel');
        }
      });
      shape.addEventListener('click', e => {
        e.stopPropagation();
        // Desativa outras regiões
        document.querySelectorAll('.regiao-shape').forEach(s => {
          s.classList.remove('ativa');
          const l = document.getElementById('lbl-' + s.dataset.id);
          if (l) l.classList.remove('visivel');
        });
        shape.classList.add('ativa');
        if (lbl) lbl.classList.add('visivel');
        abrirPainelRegiao(reg);
      });
    });
  }

  // ── 7. PAINEL LATERAL ────────────────────────────────────
  const painelEl = document.getElementById('painel');

  function abrirPainel(local) {
    const info = corMap[local.tipo] || corMap.cidade;
    const perigo = local.perigo || 'medio';

    document.getElementById('pTipo').innerHTML =
      `<i class="ti ${info.icone}" aria-hidden="true"></i> ${local.subtitulo}`;
    document.getElementById('pTipo').style.setProperty('--pt-cor', info.cor);
    document.getElementById('pNome').textContent = local.nome;
    document.getElementById('pSub').textContent  = local.regiao;
    document.getElementById('pDesc').textContent = local.descricao;
    document.getElementById('pRegiao').textContent   = local.regiao;
    document.getElementById('pTipoVal').textContent  = local.tipo.charAt(0).toUpperCase() + local.tipo.slice(1);
    document.getElementById('pGovern').textContent   = local.governante || '—';
    document.getElementById('pPagina').textContent   = local.pagina ? `p. ${local.pagina}` : '—';

    // Perigo badge
    const perigoEl = document.getElementById('pPerigo');
    perigoEl.className = `p-perigo perigo-${perigo}`;
    perigoEl.innerHTML = `<i class="ti ti-alert-triangle" aria-hidden="true"></i> ${perigoLabel[perigo] || perigo}`;

    // Tags
    const tagsEl = document.getElementById('pTags');
    tagsEl.innerHTML = (local.tags || []).map(t => `<span class="p-tag">${t}</span>`).join('');

    painelEl.classList.add('aberto');
  }

  function abrirPainelRegiao(reg) {
    document.getElementById('pTipo').innerHTML =
      `<i class="ti ti-map" aria-hidden="true"></i> ${reg.tipo}`;
    document.getElementById('pTipo').style.setProperty('--pt-cor', reg.cor);
    document.getElementById('pNome').textContent = reg.nome;
    document.getElementById('pSub').textContent  = reg.tipo;
    document.getElementById('pDesc').textContent = reg.descricao;
    document.getElementById('pRegiao').textContent   = 'Arton Norte';
    document.getElementById('pTipoVal').textContent  = reg.tipo;
    document.getElementById('pGovern').textContent   = reg.governante || '—';
    document.getElementById('pPagina').textContent   = reg.pagina ? `p. ${reg.pagina}` : '—';
    document.getElementById('pPerigo').className     = 'p-perigo perigo-medio';
    document.getElementById('pPerigo').innerHTML     = '';

    const tagsEl = document.getElementById('pTags');
    tagsEl.innerHTML = (reg.tags || []).map(t => `<span class="p-tag">${t}</span>`).join('');

    painelEl.classList.add('aberto');
  }

  window.fecharPainel = () => {
    painelEl.classList.remove('aberto');
    document.querySelectorAll('.regiao-shape').forEach(s => {
      s.classList.remove('ativa');
      const l = document.getElementById('lbl-' + s.dataset.id);
      if (l) l.classList.remove('visivel');
    });
  };

  // ── 8. SIDEBAR ────────────────────────────────────────────
  const filtrosPanel = document.getElementById('filtrosPanel');

  window.toggleFiltros = (btn) => {
    btn.classList.toggle('ativo');
    filtrosPanel.classList.toggle('aberto');
  };

  window.toggleBusca = () => {
    const sb = document.getElementById('topbarSearch');
    if (!sb) return;
    const visivel = sb.style.display !== 'none' && sb.style.display !== '';
    sb.style.display = visivel ? 'none' : 'flex';
    if (!visivel) sb.querySelector('input').focus();
  };

  // Filtros de tipo
  window.toggleTipo = (el, tipo) => {
    el.classList.toggle('on');
    el.querySelector('.fp-check').classList.toggle('on');
    const ativo = el.classList.contains('on');
    document.querySelectorAll(`.map-point[data-tipo="${tipo}"]`).forEach(p => {
      p.style.opacity = ativo ? '1' : '0.08';
      p.style.pointerEvents = ativo ? 'all' : 'none';
    });
  };

  // Filtros de região
  window.toggleRegiao = (el, id) => {
    el.classList.toggle('on');
    el.querySelector('.fp-check').classList.toggle('on');
    const ativo = el.classList.contains('on');
    const shape = document.querySelector(`.regiao-shape[data-id="${id}"]`);
    const lbl   = document.getElementById('lbl-' + id);
    if (shape) shape.style.display = ativo ? '' : 'none';
    if (lbl)   lbl.style.display   = ativo ? '' : 'none';
  };

  // ── 9. BUSCA ──────────────────────────────────────────────
  const searchInput   = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  if (searchInput && window.LOCAIS) {
    searchInput.addEventListener('input', () => {
      const val = searchInput.value.trim().toLowerCase();
      if (!val) { searchResults.classList.remove('visivel'); return; }

      const encontrados = window.LOCAIS.filter(l =>
        l.nome.toLowerCase().includes(val) ||
        l.regiao.toLowerCase().includes(val) ||
        (l.tags || []).some(t => t.toLowerCase().includes(val))
      ).slice(0, 8);

      if (!encontrados.length) {
        searchResults.classList.remove('visivel');
        return;
      }

      const info = { capital:'#c9a84c', cidade:'#cc8844', magico:'#8888ff', fortaleza:'#5588aa', perigo:'#cc2222', tormenta:'#8B0000', masmorra:'#664466', ruinas:'#886644', regiao:'#44aa66' };
      searchResults.innerHTML = encontrados.map(l => `
        <div class="search-item" onclick="irParaPonto('${l.id}')" style="--sc:${info[l.tipo]||'#888'}">
          <div class="search-item-dot"></div>
          <div>
            <div class="search-item-nome">${l.nome}</div>
            <div class="search-item-tipo">${l.subtitulo}</div>
          </div>
        </div>
      `).join('');
      searchResults.classList.add('visivel');
    });

    document.addEventListener('click', e => {
      if (!e.target.closest('#topbarSearch') && !e.target.closest('#searchResults')) {
        searchResults.classList.remove('visivel');
      }
    });

    // Atalho Ctrl+K
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
      }
      if (e.key === 'Escape') {
        searchResults.classList.remove('visivel');
        searchInput.blur();
      }
    });
  }

  // Ir para ponto no mapa
  window.irParaPonto = (id) => {
    const local = (window.LOCAIS || []).find(l => l.id === id);
    if (!local) return;
    searchResults.classList.remove('visivel');
    if (searchInput) searchInput.value = '';

    // Centraliza no ponto
    const rect = mapWrap.getBoundingClientRect();
    const centerX = rect.width  / 2;
    const centerY = rect.height / 2;
    const ptX = (local.x / 100) * rect.width  * scale;
    const ptY = (local.y / 100) * rect.height * scale;
    tx = centerX - ptX;
    ty = centerY - ptY;
    applyTransform();

    setTimeout(() => abrirPainel(local), 300);
  };

  // ── 10. MODAL NOVO PONTO ──────────────────────────────────
  const modalOverlay = document.getElementById('modalOverlay');

  window.abrirModal = () => modalOverlay.classList.add('aberto');
  window.fecharModal = () => modalOverlay.classList.remove('aberto');

  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) fecharModal();
  });

  window.selTipo = (el) => {
    document.querySelectorAll('.tipo-opt').forEach(t => t.classList.remove('sel'));
    el.classList.add('sel');
  };

  // Salvar ponto personalizado
  document.getElementById('btnSalvarPonto')?.addEventListener('click', () => {
    const nome = document.getElementById('novoPontoNome')?.value.trim();
    const desc = document.getElementById('novoPontoDesc')?.value.trim();
    const tipoEl = document.querySelector('.tipo-opt.sel');
    const tipo = tipoEl?.dataset.tipo || 'cidade';

    if (!nome) {
      document.getElementById('novoPontoNome')?.focus();
      return;
    }

    // Salva no localStorage
    const pontos = JSON.parse(localStorage.getItem('tormenta20-pontos') || '[]');
    const novoPonto = {
      id:       'custom-' + Date.now(),
      nome,
      subtitulo: 'Ponto personalizado',
      tipo,
      regiao:   'Meu Mapa',
      descricao: desc || 'Sem descrição.',
      perigo:   'medio',
      x: 50, y: 50, // centro — usuário pode arrastar depois
      cor: '#ffaa44',
      tags: ['Personalizado'],
      governante: null,
      destaque: false,
    };
    pontos.push(novoPonto);
    localStorage.setItem('tormenta20-pontos', JSON.stringify(pontos));

    fecharModal();
    alert(`Ponto "${nome}" salvo! Atualize a página para vê-lo no mapa.`);
  });

  // ── 11. CARREGAR PONTOS SALVOS ────────────────────────────
  const pontosSalvos = JSON.parse(localStorage.getItem('tormenta20-pontos') || '[]');
  if (pontosSalvos.length && window.LOCAIS) {
    window.LOCAIS.push(...pontosSalvos);
  }

});