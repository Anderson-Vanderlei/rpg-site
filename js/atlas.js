/* ============================================================
   ATLAS DE ARTON v3 — atlas.js
   Motor: Leaflet.js (CRS.Simple, mapa fictício por pixel — sem
   coordenadas geográficas reais) sobre a pirâmide de tiles gerada
   em tiles/<mapa>/<z>/<x>/<y>.jpg. Efeitos atmosféricos (nuvens,
   tormenta, bioluminescência) via PixiJS (WebGL). Transições via
   GSAP. Som ambiente (infraestrutura, sem arquivos ainda) via
   Howler.js.

   Sistema de coordenadas: os dados em locais.js continuam em % (x,y
   de 0 a 100), exatamente como antes — só a CAMADA DE RENDERIZAÇÃO
   converte %  pixel nativo do mapa (pctParaLatLng/latLngParaPct) na
   hora de desenhar. Isso evita ter que migrar locais.js pra um novo
   sistema de coordenadas agora (fica pra quando as posições reais
   forem corrigidas, que é um trabalho separado).
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 0. BLINDAGEM CONTRA FALHA DE CDN ─────────────────────────
  // Se alguma dessas libs não carregar (rede instável, CDN fora do ar,
  // bloqueio de conexão), o resto do script não pode simplesmente
  // quebrar em silêncio. Leaflet é essencial (sem ele não existe mapa);
  // GSAP/PixiJS/Howler são degradáveis — a página segue funcionando,
  // só sem a animação/efeito/som correspondente.
  const CDN_OK = {
    gsap: typeof gsap !== 'undefined',
    pixi: typeof PIXI !== 'undefined',
    leaflet: typeof L !== 'undefined',
    howler: typeof Howl !== 'undefined',
  };

  if (!CDN_OK.leaflet) {
    const erro = document.createElement('div');
    erro.style.cssText = 'position:fixed;inset:0;z-index:99999;background:#080505;color:#e8dcc8;display:flex;align-items:center;justify-content:center;text-align:center;font-family:Georgia,serif;padding:32px;';
    erro.innerHTML = '<div style="max-width:420px"><h2 style="color:#c9a84c;margin-bottom:12px;font-size:18px;">Não foi possível carregar o mapa</h2><p style="font-size:13px;line-height:1.6;opacity:.85">Uma biblioteca essencial (Leaflet) não foi carregada — verifique sua conexão com a internet e recarregue a página.</p></div>';
    document.body.appendChild(erro);
    return; // sem Leaflet não dá pra montar nada do Atlas — para aqui.
  }

  // ── 1. INTRO ───────────────────────────────────────────────
  const intro = document.getElementById('introScreen');
  if (intro) {
    if (CDN_OK.gsap) {
      gsap.to(intro, {
        opacity: 0, duration: 1, delay: 1.8, ease: 'power1.out',
        onComplete: () => intro.remove(),
      });
    } else {
      // Sem GSAP: mesmo efeito, via CSS transition simples.
      setTimeout(() => {
        intro.style.transition = 'opacity 1s ease';
        intro.style.opacity = '0';
        setTimeout(() => intro.remove(), 1000);
      }, 1800);
    }
  }

  // ── 2. CURSOR ──────────────────────────────────────────────
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (dot && ring) {
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove', e => {
      mx=e.clientX; my=e.clientY;
      dot.style.left=mx+'px'; dot.style.top=my+'px';
    });
    const animRing = () => {
      rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
      ring.style.left=rx+'px'; ring.style.top=ry+'px';
      requestAnimationFrame(animRing);
    };
    animRing();
    // Delegado (não um forEach fixo) — cobre marcadores do Leaflet,
    // que são criados dinamicamente depois deste ponto.
    document.addEventListener('mouseover', e => {
      if (e.target.closest('button,a,.map-point,.regiao-shape,.fp-item,.search-item,.z-btn,.camada-btn')) {
        dot.classList.add('hover'); ring.classList.add('hover');
      }
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest('button,a,.map-point,.regiao-shape,.fp-item,.search-item,.z-btn,.camada-btn')) {
        dot.classList.remove('hover'); ring.classList.remove('hover');
      }
    });
  }

  // Converte hex (#rrggbb ou #rgb) em rgba() com alpha customizado
  function hexParaRgba(hex, alpha) {
    const h = (hex || '#8B0000').replace('#', '');
    const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
    const r = parseInt(full.slice(0, 2), 16), g = parseInt(full.slice(2, 4), 16), b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  function hexParaInt(hex) { return parseInt((hex || '#8B0000').replace('#', ''), 16); }

  // ── 3. MAPA (Leaflet, CRS.Simple) ───────────────────────────
  let mapaAtual = 'arton';
  let map = null;
  let tileLayer = null;
  let boundsAtual = null;
  const mapWrapEl = document.getElementById('mapWrap');
  const vignetteFixed = document.querySelector('.map-vignette-fixed');
  const tilePaneFiltroEl = document.documentElement; // --map-filtro é lido em .leaflet-tile-pane via var global

  // % (0-100, como sempre foi em locais.js) → LatLng do Leaflet.
  // IMPORTANTE: L.CRS.Simple escala cada nível de zoom por 2^zoom — não dá
  // pra usar o pixel nativo como LatLng direto (isso pede tiles nas
  // coordenadas erradas). Tem que passar pelo par project/unproject do
  // Leaflet fixando o zoom de referência em cfg.maxZoom (o zoom em que os
  // tiles têm a resolução nativa da imagem).
  function pctParaLatLng(mapaId, xPct, yPct) {
    const cfg = MAPAS[mapaId];
    const [nw, nh] = cfg.nativo;
    return map.unproject([ (xPct / 100) * nw, (yPct / 100) * nh ], cfg.maxZoom);
  }
  // LatLng → % (usado ao criar um ponto novo / modo criação)
  function latLngParaPct(mapaId, latlng) {
    const cfg = MAPAS[mapaId];
    const [nw, nh] = cfg.nativo;
    const p = map.project(latlng, cfg.maxZoom);
    return { x: Math.round((p.x / nw) * 1000) / 10, y: Math.round((p.y / nh) * 1000) / 10 };
  }

  // Tinge a névoa fixa das bordas + os tiles com a cor/filtro de atmosfera
  // do mapa atual (campo `neblina`/`neblinaFiltro` de MAPAS em locais.js).
  function atualizarNevoaBorda(id) {
    const cfg = window.MAPAS?.[id];
    if (vignetteFixed) vignetteFixed.style.setProperty('--fog-cor', cfg?.neblina || 'rgba(8,5,5,1)');
    document.documentElement.style.setProperty('--map-filtro', cfg?.neblinaFiltro || 'none');
  }

  function criarMapa(id) {
    const cfg = window.MAPAS[id];
    const [nw, nh] = cfg.nativo;

    if (map) { map.remove(); map = null; }
    // map.remove() já destrói todos os layers/markers da instância anterior —
    // só precisamos limpar nossa própria contabilidade (senão marcadores[]
    // acumula referências mortas a cada troca de mapa).
    marcadores = [];
    regiaoLayers = {};
    if (vcAnimId) { cancelAnimationFrame(vcAnimId); vcAnimId = null; }
    vectoraMarker = null;

    map = L.map('mapWrap', {
      crs: L.CRS.Simple,
      minZoom: 0,
      maxZoom: cfg.maxZoom,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      wheelPxPerZoomLevel: 100,
      attributionControl: false,
      zoomControl: false,
      maxBoundsViscosity: 0.8,
    });

    // unproject converte o retângulo em pixel NATIVO (na resolução do
    // maxZoom, onde os tiles foram gerados) pro espaço de LatLng do
    // Leaflet — precisa ser feito depois que `map` já existe.
    boundsAtual = L.latLngBounds(
      map.unproject([0, 0], cfg.maxZoom),
      map.unproject([nw, nh], cfg.maxZoom)
    );
    tileLayer = L.tileLayer(cfg.tiles, {
      tileSize: 256, minZoom: 0, maxZoom: cfg.maxZoom,
      noWrap: true, bounds: boundsAtual,
    }).addTo(map);

    map.setMaxBounds(boundsAtual.pad(0.1));
    map.fitBounds(boundsAtual);

    map.on('click', aoClicarMapa);
    map.on('mousemove', aoMoverMouse);
    map.on('move zoom', aoMoverOuZoom);

    atualizarNevoaBorda(id);
    renderPontos(id);
    renderRegioes(id);
    trocarAtmosfera(id);
    aoMoverOuZoom();
  }

  // Transição suave ao trocar de mapa (fade + leve "zoom pulse" via GSAP,
  // com fallback direto — sem animação — se o GSAP não tiver carregado)
  window.trocarMapa = (id) => {
    if (id === mapaAtual || !window.MAPAS[id]) return;
    const trocar = () => {
      mapaAtual = id;
      criarMapa(id);
      fecharPainel();
    };
    if (CDN_OK.gsap) {
      gsap.to(mapWrapEl, {
        opacity: 0, scale: 1.04, duration: .4, ease: 'power2.in',
        onComplete: () => {
          trocar();
          gsap.fromTo(mapWrapEl, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: .6, ease: 'power2.out' });
        },
      });
    } else {
      trocar();
    }
    document.querySelectorAll('.camada-btn').forEach(b => b.classList.toggle('ativo', b.dataset.mapa === id));
  };

  // ── 4. ZOOM / COORDENADAS ───────────────────────────────────
  window.zmIn    = () => map && map.zoomIn(0.5);
  window.zmOut   = () => map && map.zoomOut(0.5);
  window.zmReset = () => map && map.fitBounds(boundsAtual);

  const coordsEl = document.getElementById('mapCoords');
  function aoMoverMouse(e) {
    if (!coordsEl) return;
    const { x, y } = latLngParaPct(mapaAtual, e.latlng);
    coordsEl.textContent = `${Math.round(x)}° L · ${Math.round(y)}° S`;
  }

  // ── 5. ATMOSFERA (PixiJS) — nuvens / tormenta / bioluminescência ──
  let pixiApp = null, gAtmosfera = null, blurFiltro = null;
  let particulas = [], nuvens = [];
  let modoAtmosferaAtiva = null; // 'nuvens' | 'bio' | null
  let tormentaAtiva = false;
  let localTormentaAtual = null;

  async function initPixi() {
    const container = document.getElementById('pixiEfeitos');
    pixiApp = new PIXI.Application();
    await pixiApp.init({ resizeTo: container, backgroundAlpha: 0, antialias: true, autoDensity: true, resolution: Math.min(devicePixelRatio || 1, 2) });
    container.appendChild(pixiApp.canvas);
    gAtmosfera = new PIXI.Graphics();
    blurFiltro = new PIXI.BlurFilter({ strength: 14, quality: 3 });
    gAtmosfera.filters = [blurFiltro];
    pixiApp.stage.addChild(gAtmosfera);
    pixiApp.ticker.add(quadroAtmosfera);
  }

  function trocarAtmosfera(id) {
    const cfg = window.MAPAS[id];
    particulas = []; nuvens = [];
    tormentaAtiva = false;
    localTormentaAtual = (window.LOCAIS?.[id] || []).find(l => l.tipo === 'tormenta' && l.destaque)
                       || (window.LOCAIS?.[id] || []).find(l => l.tipo === 'tormenta');

    if (cfg.atmosfera === 'subterraneo') {
      modoAtmosferaAtiva = 'bio';
      for (let i = 0; i < 60; i++) particulas.push(criarEsporo());
    } else {
      modoAtmosferaAtiva = 'nuvens';
      const n = cfg.atmosfera === 'mistico' ? 12 : 9;
      for (let i = 0; i < n; i++) nuvens.push(criarNuvem());
      if (localTormentaAtual) {
        tormentaAtiva = true;
        for (let i = 0; i < 50; i++) particulas.push(criarParticulaTormenta());
      }
    }
  }

  function criarNuvem() {
    if (!pixiApp) return { x: 0, y: 0, r: 60, vx: .1, op: .05 };
    return {
      x: Math.random() * pixiApp.screen.width,
      y: Math.random() * pixiApp.screen.height * .65,
      r: 50 + Math.random() * 90,
      vx: .05 + Math.random() * .12,
      op: .05 + Math.random() * .09,
    };
  }

  function criarParticulaTormenta() {
    const ancora = ancoraTelaDoLocal(localTormentaAtual);
    const ang = Math.random() * Math.PI * 2, dist = Math.random() * 34;
    return {
      tipo: 'tormenta',
      x: ancora.x + Math.cos(ang) * dist, y: ancora.y + Math.sin(ang) * dist,
      vx: (Math.random() - .5) * 1.2, vy: -(Math.random() * .9 + .3),
      life: 0, maxLife: 60 + Math.random() * 90, size: 1.6 + Math.random() * 2.6,
    };
  }

  function criarEsporo() {
    if (!pixiApp) return { x: 0, y: 0, vy: -.1, vx: 0, life: 0, maxLife: 150, size: 1, cor: 0x44c8aa };
    const cores = [0x44c8aa, 0x64b4ff, 0xb4ffb4];
    return {
      tipo: 'esporo',
      x: Math.random() * pixiApp.screen.width, y: Math.random() * pixiApp.screen.height,
      vy: -(Math.random() * .3 + .05), vx: (Math.random() - .5) * .2,
      life: 0, maxLife: 120 + Math.random() * 180, size: .9 + Math.random() * 2.2,
      cor: cores[Math.floor(Math.random() * cores.length)],
    };
  }

  // Posição em tela (px) do ponto real da Tormenta, considerando o
  // pan/zoom atual do Leaflet — assim o brilho fica "grudado" no lugar
  // certo do mapa em vez de fixo na tela.
  function ancoraTelaDoLocal(local) {
    if (!map || !local) return { x: 0, y: 0 };
    const latlng = pctParaLatLng(mapaAtual, local.x, local.y);
    const p = map.latLngToContainerPoint(latlng);
    return { x: p.x, y: p.y };
  }

  function quadroAtmosfera() {
    if (!gAtmosfera) return;
    gAtmosfera.clear();

    if (modoAtmosferaAtiva === 'nuvens') {
      nuvens.forEach(n => {
        gAtmosfera.circle(n.x, n.y, n.r).fill({ color: 0xf0e6d2, alpha: n.op });
        n.x += n.vx;
        if (n.x - n.r > pixiApp.screen.width) n.x = -n.r;
      });
    }

    if (tormentaAtiva && localTormentaAtual) {
      const ancora = ancoraTelaDoLocal(localTormentaAtual);
      gAtmosfera.circle(ancora.x, ancora.y, 55).fill({ color: 0x8b0000, alpha: .1 });
      if (Math.random() < .02) {
        const sx = ancora.x + (Math.random() - .5) * 20, sy = ancora.y + (Math.random() - .5) * 20;
        let px = sx, py = sy;
        gAtmosfera.moveTo(px, py);
        for (let i = 0; i < 4; i++) { px += (Math.random() - .5) * 40; py -= Math.random() * 28 + 10; gAtmosfera.lineTo(px, py); }
        gAtmosfera.stroke({ color: 0xff5050, width: 1.4, alpha: .75 });
      }
    }

    particulas.forEach((p, i) => {
      p.life++;
      p.x += p.vx; p.y += p.vy;
      if (p.tipo === 'tormenta') p.vx += (Math.random() - .5) * .15;
      const prog = p.life / p.maxLife;
      const op = prog < .3 ? prog / .3 : 1 - ((prog - .3) / .7);
      if (p.tipo === 'tormenta') {
        gAtmosfera.circle(p.x, p.y, p.size).fill({ color: 0xb40000, alpha: op * .8 });
      } else {
        gAtmosfera.circle(p.x, p.y, p.size * 2.4).fill({ color: p.cor, alpha: op * .85 });
      }
      if (p.life >= p.maxLife) particulas[i] = p.tipo === 'tormenta' ? criarParticulaTormenta() : criarEsporo();
    });
  }

  // ── 6. HOWLER — som ambiente (infraestrutura; sem arquivos ainda) ──
  let somLigado = false;
  let howlAtual = null;
  const CAMINHO_AUDIO = id => `../audio/atmosfera-${window.MAPAS?.[id]?.atmosfera || 'medieval'}.mp3`;

  function tocarAmbiente(id) {
    if (howlAtual) { howlAtual.stop(); howlAtual.unload(); howlAtual = null; }
    if (!somLigado || typeof Howl === 'undefined') return;
    howlAtual = new Howl({
      src: [CAMINHO_AUDIO(id)], loop: true, volume: 0, html5: true,
      onload: () => howlAtual.fade(0, .35, 1200),
      onloaderror: () => { /* sem arquivo de áudio ainda — silencioso, não quebra nada */ },
    });
    howlAtual.play();
  }

  window.toggleSom = () => {
    somLigado = !somLigado;
    const btn = document.getElementById('btnSom');
    const icon = btn?.querySelector('i');
    if (btn) btn.classList.toggle('ativo', somLigado);
    if (icon) icon.className = somLigado ? 'ti ti-volume' : 'ti ti-volume-3';
    if (somLigado) tocarAmbiente(mapaAtual);
    else if (howlAtual) { howlAtual.fade(howlAtual.volume(), 0, 500); setTimeout(() => { howlAtual?.unload(); howlAtual = null; }, 550); }
  };

  // ── 7. VECTORA FLUTUANTE ─────────────────────────────────────
  let vcAtual = { x: 52, y: 37 };
  let vcIndex = 0, vcProg = 0, vcAnimId = null, vectoraMarker = null;

  function iniciarVectora() {
    const local = (window.LOCAIS?.arton || []).find(l => l.id === 'vectora');
    if (!local?.rota || !vectoraMarker) return;
    if (vcAnimId) cancelAnimationFrame(vcAnimId);
    const rota = local.rota;
    const VEL = 0.0008;
    const frame = () => {
      const a = rota[vcIndex], b = rota[(vcIndex + 1) % rota.length];
      vcProg += VEL;
      if (vcProg >= 1) { vcProg = 0; vcIndex = (vcIndex + 1) % (rota.length - 1); }
      vcAtual.x = a.x + (b.x - a.x) * vcProg;
      vcAtual.y = a.y + (b.y - a.y) * vcProg;
      vectoraMarker.setLatLng(pctParaLatLng('arton', vcAtual.x, vcAtual.y));
      vcAnimId = requestAnimationFrame(frame);
    };
    frame();
  }

  // ── 8. PONTOS (L.marker + divIcon) ───────────────────────────
  const corMap = {
    capital:   {cor:'#c9a84c',glow:'rgba(201,168,76,.35)',  icone:'ti-crown'},
    cidade:    {cor:'#cc8844',glow:'rgba(204,136,68,.3)',   icone:'ti-building'},
    magico:    {cor:'#8888ff',glow:'rgba(136,136,255,.35)', icone:'ti-sparkles'},
    fortaleza: {cor:'#5588aa',glow:'rgba(85,136,170,.3)',   icone:'ti-shield'},
    perigo:    {cor:'#cc2222',glow:'rgba(204,34,34,.4)',    icone:'ti-skull'},
    tormenta:  {cor:'#8B0000',glow:'rgba(139,0,0,.5)',      icone:'ti-storm'},
    masmorra:  {cor:'#664466',glow:'rgba(102,68,102,.35)',  icone:'ti-flame'},
    ruinas:    {cor:'#886644',glow:'rgba(136,102,68,.3)',   icone:'ti-building-community'},
    regiao:    {cor:'#44aa66',glow:'rgba(68,170,102,.3)',   icone:'ti-map-pin'},
  };

  let marcadores = []; // { layer, local }

  function htmlPonto(local, info) {
    const grande = local.destaque ? ' grande' : '';
    const vcClass = local.id === 'vectora' ? ' vectora-ponto' : '';
    const torClass = local.tipo === 'tormenta' ? ' tormenta-ring' : '';
    return `<div class="map-point${grande}${vcClass}" data-id="${local.id}" data-tipo="${local.tipo}" style="--pc:${info.cor};--pc-g:${info.glow}">
      <div class="point-ring${torClass}"><div class="point-dot"></div></div>
      <div class="point-label">${local.nome}</div>
      <div class="point-tooltip" style="--pc:${info.cor}">
        <div class="pt-nome">${local.nome}</div>
        <div class="pt-tipo">${local.subtitulo||''}</div>
      </div>
    </div>`;
  }

  function renderPontos(mapaId) {
    const lista = window.LOCAIS?.[mapaId] || [];
    lista.forEach(local => {
      const info = corMap[local.tipo] || corMap.cidade;
      const icon = L.divIcon({ html: htmlPonto(local, info), className: '', iconSize: [0, 0], iconAnchor: [0, 0] });
      const marker = L.marker(pctParaLatLng(mapaId, local.x, local.y), { icon, interactive: true, keyboard: false }).addTo(map);
      marker.on('click', () => abrirPainel(local));
      marcadores.push({ layer: marker, local });
      if (local.id === 'vectora') vectoraMarker = marker;
    });
    if (mapaId === 'arton') iniciarVectora();
  }

  // ── 9. REGIÕES (L.polygon) + labels (L.marker) ───────────────
  let regiaoLayers = {}; // id -> { shape, label }

  function renderRegioes(mapaId) {
    const lista = window.REGIOES?.[mapaId] || [];
    lista.forEach(reg => {
      const pontosPct = reg.pontos.trim().split(/\s+/).map(par => {
        const [x, y] = par.split(',').map(Number);
        return pctParaLatLng(mapaId, x, y);
      });
      const shape = L.polygon(pontosPct, {
        className: 'regiao-shape', color: reg.stroke, weight: 1, fillColor: reg.fill, fillOpacity: 0,
        opacity: 0, interactive: true,
      }).addTo(map);

      const label = L.marker(pctParaLatLng(mapaId, reg.labelX, reg.labelY), {
        icon: L.divIcon({ html: `<div class="regiao-label" id="lbl-${reg.id}">${reg.labelTexto}</div>`, className: '', iconSize: [0, 0], iconAnchor: [0, 0] }),
        interactive: false,
      }).addTo(map);

      regiaoLayers[reg.id] = { shape, label, reg };

      shape.on('mouseover', () => { shape.setStyle({ opacity: 1 }); labelEl(reg.id)?.classList.add('visivel'); });
      shape.on('mouseout', () => { if (!shape._ativa) { shape.setStyle({ opacity: 0 }); labelEl(reg.id)?.classList.remove('visivel'); } });
      shape.on('click', e => {
        L.DomEvent.stopPropagation(e);
        // Se o modo criação ou medição de distância estiver ativo, o clique
        // deve alimentar essa ferramenta (mesmo caindo dentro de uma região),
        // não abrir o painel da região.
        if (modoCriacao || modoDistancia) { aoClicarMapa(e); return; }
        ativarRegiao(reg.id); abrirPainelRegiao(reg);
      });
    });
  }

  function labelEl(id) { return document.getElementById('lbl-' + id); }

  function ativarRegiao(id) {
    Object.entries(regiaoLayers).forEach(([rid, { shape }]) => {
      shape._ativa = rid === id;
      shape.setStyle({ opacity: rid === id ? .85 : 0 });
      labelEl(rid)?.classList.toggle('visivel', rid === id);
    });
  }

  // ── 10. PAINEL LATERAL ───────────────────────────────────────
  const painelEl = document.getElementById('painel');
  const perigoLabel = { baixo:'Perigo Baixo', medio:'Perigo Médio', alto:'Perigo Alto', extremo:'Perigo Extremo' };

  function abrirPainel(local) {
    const info = corMap[local.tipo] || corMap.cidade;
    const painel = local.painel || 'generico';

    const pTipoEl = document.getElementById('pTipo');
    pTipoEl.innerHTML = `<i class="ti ${info.icone}" aria-hidden="true"></i> ${local.subtitulo||''}`;
    pTipoEl.style.setProperty('--pt-cor', info.cor);
    pTipoEl.style.setProperty('--pt-bg', hexParaRgba(info.cor, .12));
    pTipoEl.style.setProperty('--pt-border', hexParaRgba(info.cor, .35));
    document.getElementById('pNome').textContent = local.nome;

    const perigoEl = document.getElementById('pPerigo');
    perigoEl.className = `p-perigo perigo-${local.perigo || 'medio'}`;
    perigoEl.innerHTML = `<i class="ti ti-alert-triangle" aria-hidden="true"></i> ${perigoLabel[local.perigo || 'medio']}`;

    if (painel === 'rico') {
      document.getElementById('painelRico').style.display = 'block';
      document.getElementById('painelGenerico').style.display = 'none';
      preencherRico(local);
    } else {
      document.getElementById('painelRico').style.display = 'none';
      document.getElementById('painelGenerico').style.display = 'block';
      preencherGenerico(local);
    }

    document.getElementById('pDesc').textContent = local.descricao || '';
    document.getElementById('pTags').innerHTML = (local.tags || []).map(t => `<span class="p-tag">${t}</span>`).join('');
    document.getElementById('pRegiao').textContent = local.regiao || '—';
    document.getElementById('pPagina').textContent = local.pagina ? `p. ${local.pagina}` : '—';
    document.getElementById('btnWiki').textContent = local.pagina ? `Ver no Atlas — p.${local.pagina}` : 'Ver na Wiki';

    painelEl.classList.add('aberto');
  }

  function preencherRico(local) {
    document.getElementById('pHeroBrasao').innerHTML = `<i class="ti ${corMap[local.tipo]?.icone||'ti-map-pin'}" aria-hidden="true"></i>`;
    document.getElementById('pLema').textContent = local.lema || '';
    document.getElementById('pGoverno').textContent = local.governo || '—';
    document.getElementById('pGentilico').textContent = local.gentilico || '—';
    document.getElementById('pCapital').textContent = local.capital || '—';
    document.getElementById('pPopulacao').textContent = local.populacao || '—';
    document.getElementById('pRegente').textContent = local.regente || '—';
    document.getElementById('pRacas').textContent = local.racas || '—';
    document.getElementById('pDivindades').textContent = local.divindades || '—';

    const pEl = document.getElementById('pPersonagens');
    const pers = local.personagens || [];
    if (pers.length) {
      document.getElementById('pSecaoPersonagens').style.display = 'block';
      pEl.innerHTML = pers.map(p => `
        <div class="p-personagem">
          <div class="p-pers-avatar ${p.alinhamento||'neutro'}"><i class="ti ${p.icone||'ti-user'}" aria-hidden="true"></i></div>
          <div class="p-pers-nome">${p.nome}</div>
        </div>`).join('');
    } else {
      document.getElementById('pSecaoPersonagens').style.display = 'none';
    }
  }

  function preencherGenerico(local) {
    document.getElementById('pNota').textContent = local.descricao || 'Informações não disponíveis.';
  }

  function abrirPainelRegiao(reg) {
    const info = { cor: reg.cor || '#c9a84c' };
    const pTipoEl = document.getElementById('pTipo');
    pTipoEl.innerHTML = `<i class="ti ti-map" aria-hidden="true"></i> ${reg.tipo}`;
    pTipoEl.style.setProperty('--pt-cor', info.cor);
    pTipoEl.style.setProperty('--pt-bg', hexParaRgba(info.cor, .12));
    pTipoEl.style.setProperty('--pt-border', hexParaRgba(info.cor, .35));
    document.getElementById('pNome').textContent = reg.nome;
    document.getElementById('pPerigo').className = '';
    document.getElementById('pPerigo').innerHTML = '';

    document.getElementById('painelRico').style.display = 'none';
    document.getElementById('painelGenerico').style.display = 'block';
    document.getElementById('pNota').textContent = reg.descricao || '';
    document.getElementById('pDesc').textContent = '';
    document.getElementById('pTags').innerHTML = (reg.tags || []).map(t => `<span class="p-tag">${t}</span>`).join('');
    document.getElementById('pRegiao').textContent = 'Arton';
    document.getElementById('pPagina').textContent = reg.pagina ? `p. ${reg.pagina}` : '—';
    document.getElementById('btnWiki').textContent = reg.pagina ? `Ver no Atlas — p.${reg.pagina}` : 'Ver na Wiki';

    painelEl.classList.add('aberto');
  }

  window.fecharPainel = () => {
    painelEl.classList.remove('aberto');
    Object.keys(regiaoLayers).forEach(id => {
      regiaoLayers[id].shape._ativa = false;
      regiaoLayers[id].shape.setStyle({ opacity: 0 });
      labelEl(id)?.classList.remove('visivel');
    });
  };

  // ── 11. SIDEBAR / FILTROS ────────────────────────────────────
  const filtrosPanel = document.getElementById('filtrosPanel');
  window.toggleFiltros = (btn) => { btn.classList.toggle('ativo'); filtrosPanel.classList.toggle('aberto'); };

  window.toggleTipo = (el, tipo) => {
    el.classList.toggle('on');
    el.querySelector('.fp-check').classList.toggle('on');
    const ativo = el.classList.contains('on');
    document.querySelectorAll(`.map-point[data-tipo="${tipo}"]`).forEach(p => {
      p.style.opacity = ativo ? '1' : '0.06';
      p.style.pointerEvents = ativo ? 'all' : 'none';
    });
  };

  window.toggleRegiao = (el, id) => {
    el.classList.toggle('on');
    el.querySelector('.fp-check').classList.toggle('on');
    const ativo = el.classList.contains('on');
    const rl = regiaoLayers[id];
    if (rl) {
      map[ativo ? 'addLayer' : 'removeLayer'](rl.shape);
      map[ativo ? 'addLayer' : 'removeLayer'](rl.label);
    }
  };

  // ── 12. BUSCA ──────────────────────────────────────────────
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const val = searchInput.value.trim().toLowerCase();
      if (!val) { searchResults.classList.remove('visivel'); return; }
      const lista = window.LOCAIS?.[mapaAtual] || [];
      const found = lista.filter(l => l.nome.toLowerCase().includes(val) || (l.tags||[]).some(t => t.toLowerCase().includes(val))).slice(0, 8);
      if (!found.length) { searchResults.classList.remove('visivel'); return; }
      const cmap = {capital:'#c9a84c',cidade:'#cc8844',magico:'#8888ff',fortaleza:'#5588aa',perigo:'#cc2222',tormenta:'#8B0000',masmorra:'#664466',ruinas:'#886644',regiao:'#44aa66'};
      searchResults.innerHTML = found.map(l => `
        <div class="search-item" onclick="irParaPonto('${l.id}')" style="--sc:${cmap[l.tipo]||'#888'}">
          <div class="search-dot"></div>
          <div><div class="search-nome">${l.nome}</div><div class="search-tipo">${l.subtitulo||''}</div></div>
        </div>`).join('');
      searchResults.classList.add('visivel');
    });
    document.addEventListener('click', e => { if (!e.target.closest('.topbar-busca')) searchResults.classList.remove('visivel'); });
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey||e.metaKey) && e.key==='k') { e.preventDefault(); searchInput.focus(); }
      if (e.key==='Escape') { searchResults.classList.remove('visivel'); searchInput.blur(); }
    });
  }

  window.irParaPonto = (id) => {
    const lista = window.LOCAIS?.[mapaAtual] || [];
    const local = lista.find(l => l.id === id);
    if (!local || !map) return;
    searchResults.classList.remove('visivel');
    if (searchInput) searchInput.value = '';
    map.flyTo(pctParaLatLng(mapaAtual, local.x, local.y), Math.max(map.getZoom(), map.getMaxZoom() - 1), { duration: .9 });
    setTimeout(() => abrirPainel(local), 500);
  };

  // ── 13. MODO CRIAÇÃO DE PONTOS ────────────────────────────────
  let modoCriacao = false;
  let coordsCriacao = { x: 50, y: 50 };
  let previewMarker = null;
  const banner = document.getElementById('modocriacaoBanner');
  const btnNovoPonto = document.getElementById('btnNovoPonto');

  window.toggleModoCriacao = () => {
    modoCriacao = !modoCriacao;
    mapWrapEl.classList.toggle('modo-criacao', modoCriacao);
    btnNovoPonto.classList.toggle('ativo', modoCriacao);
    if (banner) banner.classList.toggle('visivel', modoCriacao);
    if (!modoCriacao && previewMarker) { map.removeLayer(previewMarker); previewMarker = null; }
  };

  function aoMoverOuZoom() {
    // Recoloca overlays que dependem de posição em tela (nada obrigatório
    // aqui hoje — o PixiJS já recalcula a âncora da Tormenta a cada frame
    // do próprio ticker — mas fica como hook central pra futuras camadas).
  }

  // ── 14. CLIQUE NO MAPA (modo criação / medição / painel de região) ──
  let modoDistancia = false;
  let pontosDistancia = [];
  let linhaDistancia = null;
  const distUI = document.getElementById('distanciaUI');

  function aoClicarMapa(e) {
    if (modoCriacao) {
      coordsCriacao = latLngParaPct(mapaAtual, e.latlng);
      if (previewMarker) map.removeLayer(previewMarker);
      previewMarker = L.marker(e.latlng, {
        icon: L.divIcon({ html: '<div class="map-point point-preview"><div class="point-ring"><div class="point-dot"></div></div></div>', className:'', iconSize:[0,0], iconAnchor:[0,0] }),
        interactive: false,
      }).addTo(map);
      document.getElementById('novoCoordsInfo').textContent = `Coordenadas: ${coordsCriacao.x}% · ${coordsCriacao.y}%`;
      abrirModal();
      return;
    }
    if (modoDistancia) {
      const pct = latLngParaPct(mapaAtual, e.latlng);
      pontosDistancia.push({ ...pct, latlng: e.latlng });
      if (pontosDistancia.length === 2) calcularDistancia();
      else if (pontosDistancia.length > 2) { pontosDistancia = [pontosDistancia[pontosDistancia.length - 1]]; limparDistancia(); }
    }
  }

  window.toggleDistancia = () => {
    modoDistancia = !modoDistancia;
    pontosDistancia = [];
    const btn = document.getElementById('btnDistancia');
    if (btn) btn.classList.toggle('ativo', modoDistancia);
    if (!modoDistancia) { limparDistancia(); distUI.classList.remove('visivel'); }
  };

  function calcularDistancia() {
    const [a, b] = pontosDistancia;
    const pxDist = map.distance(a.latlng, b.latlng); // CRS.Simple = distância euclidiana em pixels
    const [nw] = MAPAS[mapaAtual].nativo;
    const leguas = Math.round((pxDist / nw) * 5000); // 100% da largura do mapa ≈ 5000 léguas
    const pe = Math.round(leguas / 7), cv = Math.round(leguas / 15), nv = Math.round(leguas / 25);

    distUI.classList.add('visivel');
    distUI.innerHTML = `<i class="ti ti-ruler" style="color:#c9a84c"></i> ${leguas} léguas · ${pe}d a pé · ${cv}d a cavalo · ${nv}d de navio`;

    if (linhaDistancia) map.removeLayer(linhaDistancia);
    linhaDistancia = L.polyline([a.latlng, b.latlng], { color: '#c9a84c', weight: 1.5, dashArray: '8,5', opacity: .7 }).addTo(map);
  }

  function limparDistancia() {
    if (linhaDistancia) { map.removeLayer(linhaDistancia); linhaDistancia = null; }
  }

  // ── 15. MODAL NOVO PONTO ────────────────────────────────────
  const modalOverlay = document.getElementById('modalOverlay');
  window.abrirModal = () => { modalOverlay.classList.add('aberto'); };
  window.fecharModal = () => { modalOverlay.classList.remove('aberto'); if (previewMarker) { map.removeLayer(previewMarker); previewMarker = null; } };
  modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) fecharModal(); });
  window.selTipo = (el) => { document.querySelectorAll('.tipo-opt').forEach(t => t.classList.remove('sel')); el.classList.add('sel'); };

  document.getElementById('btnSalvarPonto')?.addEventListener('click', () => {
    const nome = document.getElementById('novoPontoNome')?.value.trim();
    const desc = document.getElementById('novoPontoDesc')?.value.trim();
    const tipoEl = document.querySelector('.tipo-opt.sel');
    const tipo = tipoEl?.dataset.tipo || 'cidade';
    if (!nome) { document.getElementById('novoPontoNome')?.focus(); return; }

    const pontos = JSON.parse(localStorage.getItem(`t20-pontos-${mapaAtual}`) || '[]');
    const novoLocal = {
      id: 'custom-' + Date.now(), nome, subtitulo: 'Ponto personalizado',
      tipo, regiao: 'Meu Mapa', descricao: desc || '',
      perigo: 'medio', x: coordsCriacao.x, y: coordsCriacao.y,
      pagina: null, tags: ['Personalizado'], personagens: [],
      painel: 'generico', destaque: false,
    };
    pontos.push(novoLocal);
    localStorage.setItem(`t20-pontos-${mapaAtual}`, JSON.stringify(pontos));
    window.LOCAIS[mapaAtual] = window.LOCAIS[mapaAtual] || [];
    window.LOCAIS[mapaAtual].push(novoLocal);

    const info = corMap[tipo] || corMap.cidade;
    const marker = L.marker(pctParaLatLng(mapaAtual, coordsCriacao.x, coordsCriacao.y), {
      icon: L.divIcon({ html: htmlPonto(novoLocal, info), className:'', iconSize:[0,0], iconAnchor:[0,0] }),
    }).addTo(map);
    marker.on('click', () => abrirPainel(novoLocal));
    marcadores.push({ layer: marker, local: novoLocal });

    fecharModal();
    if (modoCriacao) toggleModoCriacao();
    document.getElementById('novoPontoNome').value = '';
    document.getElementById('novoPontoDesc').value = '';
  });

  // ── 16. EXPORTAR PONTOS ──────────────────────────────────────
  window.exportarPontos = () => {
    const pontos = localStorage.getItem(`t20-pontos-${mapaAtual}`) || '[]';
    const blob = new Blob([pontos], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `meus-pontos-${mapaAtual}.json`;
    a.click();
  };

  // ── 17. INICIALIZAÇÃO ────────────────────────────────────────
  // Se o PixiJS não carregou (CDN fora do ar), a página segue sem os
  // efeitos atmosféricos em vez de travar — o mapa e toda a interatividade
  // continuam funcionando normalmente.
  const iniciarPixiSeguro = CDN_OK.pixi ? initPixi() : Promise.resolve();

  iniciarPixiSeguro.then(() => {
    // Carrega os pontos personalizados salvos de TODOS os mapas antes do
    // primeiro render — antes só o Arton era restaurado ao recarregar a
    // página, então pontos criados em Lamnor/Tamura/Moreania/Doherimm
    // "sumiam" depois de um F5 (ficavam salvos no localStorage, só não
    // eram lidos de volta).
    Object.keys(window.MAPAS || {}).forEach(id => {
      const pontosSalvos = JSON.parse(localStorage.getItem(`t20-pontos-${id}`) || '[]');
      if (pontosSalvos.length) {
        window.LOCAIS[id] = window.LOCAIS[id] || [];
        window.LOCAIS[id].push(...pontosSalvos);
      }
    });
    criarMapa('arton');
  });
});
