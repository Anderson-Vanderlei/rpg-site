/* ============================================================
   ATLAS DE ARTON v2 — atlas.js
   Corrigido: nuvens, névoa bordas, Vectora, Tormenta,
   parallax separado do drag, criação intuitiva de pontos
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. INTRO ───────────────────────────────────────────────
  const intro = document.getElementById('introScreen');
  if (intro) {
    setTimeout(() => {
      intro.classList.add('saindo');
      setTimeout(() => intro.remove(), 1000);
    }, 2800);
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
    document.querySelectorAll('button,a,.map-point,.regiao-shape,.fp-item,.search-item,.z-btn,.camada-btn').forEach(el=>{
      el.addEventListener('mouseenter',()=>{dot.classList.add('hover');ring.classList.add('hover');});
      el.addEventListener('mouseleave',()=>{dot.classList.remove('hover');ring.classList.remove('hover');});
    });
  }

  // ── 3. MAPA — ZOOM E DRAG ─────────────────────────────────
  const mapWrap      = document.getElementById('mapWrap');
  const mapContainer = document.getElementById('mapContainer');
  let scale=1, tx=0, ty=0;
  let dragging=false, startX, startY, startTX, startTY;

  function applyTransform() {
    mapContainer.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`;
    mapContainer.style.transformOrigin = '0 0';
  }

  mapWrap.addEventListener('wheel', e => {
    e.preventDefault();
    if (modoCriacao) return;
    const rect = mapWrap.getBoundingClientRect();
    const mx2 = e.clientX - rect.left;
    const my2 = e.clientY - rect.top;
    const delta = e.deltaY > 0 ? -0.12 : 0.12;
    const novoScale = Math.max(0.5, Math.min(5, scale+delta));
    const ratio = novoScale/scale;
    tx = mx2 - ratio*(mx2-tx);
    ty = my2 - ratio*(my2-ty);
    scale = novoScale;
    applyTransform();
    atualizarVectora();
  }, { passive:false });

  mapWrap.addEventListener('mousedown', e => {
    if (modoCriacao) return;
    if (e.target.closest('.painel,.modal-overlay,.z-btn,.sb-btn,.fp-item,.map-point,.regiao-shape,.topbar-search,.btn-novo-ponto,.camadas-seletor')) return;
    dragging=true;
    startX=e.clientX; startY=e.clientY; startTX=tx; startTY=ty;
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    tx=startTX+(e.clientX-startX);
    ty=startTY+(e.clientY-startY);
    applyTransform();
  });
  window.addEventListener('mouseup', () => dragging=false);

  // Scroll / Pinch mobile
  let lastDist=0;
  mapWrap.addEventListener('touchstart',e=>{
    if(e.touches.length===2) lastDist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
    else { dragging=true; startX=e.touches[0].clientX; startY=e.touches[0].clientY; startTX=tx; startTY=ty; }
  },{passive:true});
  mapWrap.addEventListener('touchmove',e=>{
    if(e.touches.length===2){
      const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
      scale=Math.max(.5,Math.min(5,scale*(d/lastDist))); lastDist=d; applyTransform();
    } else if(dragging){
      tx=startTX+(e.touches[0].clientX-startX); ty=startTY+(e.touches[0].clientY-startY); applyTransform();
    }
  },{passive:true});
  mapWrap.addEventListener('touchend',()=>dragging=false);

  window.zmIn    = ()=>{ scale=Math.min(5,scale+.25); applyTransform(); atualizarVectora(); };
  window.zmOut   = ()=>{ scale=Math.max(.5,scale-.25); applyTransform(); atualizarVectora(); };
  window.zmReset = ()=>{ scale=1;tx=0;ty=0; applyTransform(); atualizarVectora(); };

  // Coordenadas
  const coordsEl = document.getElementById('mapCoords');
  mapWrap.addEventListener('mousemove', e=>{
    if(!coordsEl) return;
    const r=mapWrap.getBoundingClientRect();
    const x=Math.round(((e.clientX-r.left-tx)/scale/r.width)*100);
    const y=Math.round(((e.clientY-r.top-ty)/scale/r.height)*100);
    coordsEl.textContent=`${x}° L · ${y}° S`;
  });

  // ── 4. SISTEMA DE CAMADAS ──────────────────────────────────
  let mapaAtual = 'arton';
  const mapImg  = document.getElementById('mapImg');

  window.trocarMapa = (id) => {
    if (id === mapaAtual) return;
    const cfg = window.MAPAS[id];
    if (!cfg) return;

    // Fade out
    mapImg.style.opacity = '0';
    document.getElementById('mapContainer').style.opacity = '0';

    setTimeout(()=>{
      mapaAtual = id;
      mapImg.src = cfg.arquivo;
      mapImg.style.filter = cfg.neblinaFiltro;
      document.getElementById('mapContainer').style.opacity = '1';
      mapImg.style.opacity = '1';
      limparPontos();
      limparRegioes();
      renderPontos(id);
      renderRegioes(id);
      trocarAtmosfera(id);
      fecharPainel();
      zmReset();
    }, 400);

    // Atualiza botões
    document.querySelectorAll('.camada-btn').forEach(b=>{
      b.classList.toggle('ativo', b.dataset.mapa===id);
    });
  };

  // ── 5. ATMOSFERA POR MAPA ──────────────────────────────────
  const cloudsCanvas   = document.getElementById('cloudsCanvas');
  const particlesCanvas = document.getElementById('particlesCanvas');

  function trocarAtmosfera(id) {
    // Para animações anteriores
    animNuvensAtiva = false;
    animPartsAtiva  = false;

    setTimeout(()=>{
      const atm = window.MAPAS[id]?.atmosfera;
      if (atm === 'subterraneo') {
        cloudsCanvas.classList.remove('visivel');
        iniciarBioluminescencia();
      } else {
        cloudsCanvas.classList.add('visivel');
        iniciarNuvens();
        if (atm === 'mistico') cloudsCanvas.style.opacity = '0.55';
        else cloudsCanvas.style.opacity = '0.42';
        limparParticulas();
      }
      if (id === 'arton') iniciarTormenta();
    }, 500);
  }

  // ── 6. NUVENS ──────────────────────────────────────────────
  let animNuvensAtiva = false;
  let nuvens = [];

  function iniciarNuvens() {
    animNuvensAtiva = true;
    const ctx = cloudsCanvas.getContext('2d');
    const resize = ()=>{ cloudsCanvas.width=mapWrap.clientWidth; cloudsCanvas.height=mapWrap.clientHeight; };
    resize();
    window.addEventListener('resize', resize);

    nuvens = Array.from({length:9},()=>({
      x: Math.random()*cloudsCanvas.width,
      y: Math.random()*cloudsCanvas.height*.65,
      r: 45+Math.random()*75,
      vx:.05+Math.random()*.1,
      op:.022+Math.random()*.048,
    }));

    const frame = ()=>{
      if(!animNuvensAtiva) return;
      ctx.clearRect(0,0,cloudsCanvas.width,cloudsCanvas.height);
      nuvens.forEach(n=>{
        const g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r);
        g.addColorStop(0,`rgba(240,230,210,${n.op})`);
        g.addColorStop(1,'rgba(240,230,210,0)');
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2);
        ctx.fillStyle=g; ctx.fill();
        n.x+=n.vx; if(n.x-n.r>cloudsCanvas.width) n.x=-n.r;
      });
      requestAnimationFrame(frame);
    };
    frame();
  }

  // ── 7. PARTÍCULAS DA TORMENTA ──────────────────────────────
  let animPartsAtiva = false;

  function iniciarTormenta() {
    const ponto = document.querySelector('.map-point[data-id="tormenta"]');
    if (!ponto) return;
    animPartsAtiva = true;
    const ctx = particlesCanvas.getContext('2d');
    const resize = ()=>{ particlesCanvas.width=mapWrap.clientWidth; particlesCanvas.height=mapWrap.clientHeight; };
    resize();

    const MAX = 40;
    const parts = Array.from({length:MAX},()=>criarParticula());

    function criarParticula() {
      // Posição centrada no ponto da Tormenta
      const cx = .43*particlesCanvas.width;
      const cy = .48*particlesCanvas.height;
      const ang = Math.random()*Math.PI*2;
      const dist = Math.random()*30;
      return {
        x: cx+Math.cos(ang)*dist, y: cy+Math.sin(ang)*dist,
        vx:(Math.random()-.5)*1.2, vy:-(Math.random()*.8+.3),
        life:0, maxLife:60+Math.random()*80,
        size:1.5+Math.random()*2.5,
        op:0,
      };
    }

    const frame = ()=>{
      if(!animPartsAtiva) return;
      ctx.clearRect(0,0,particlesCanvas.width,particlesCanvas.height);

      // Brilho central da Tormenta
      const cx=.43*particlesCanvas.width, cy=.48*particlesCanvas.height;
      const glow = ctx.createRadialGradient(cx,cy,0,cx,cy,50);
      glow.addColorStop(0,'rgba(139,0,0,0.12)');
      glow.addColorStop(.5,'rgba(139,0,0,0.05)');
      glow.addColorStop(1,'rgba(139,0,0,0)');
      ctx.beginPath(); ctx.arc(cx,cy,50,0,Math.PI*2);
      ctx.fillStyle=glow; ctx.fill();

      // Raios ocasionais
      if(Math.random()<.015){
        ctx.beginPath();
        const sx=cx+(Math.random()-.5)*20, sy=cy+(Math.random()-.5)*20;
        ctx.moveTo(sx,sy);
        for(let i=0;i<4;i++) ctx.lineTo(sx+(Math.random()-.5)*40, sy-(Math.random()*30+10));
        ctx.strokeStyle='rgba(255,80,80,0.7)'; ctx.lineWidth=1;
        ctx.shadowColor='rgba(255,0,0,0.5)'; ctx.shadowBlur=6;
        ctx.stroke(); ctx.shadowBlur=0;
      }

      parts.forEach((p,i)=>{
        p.life++;
        p.x+=p.vx; p.y+=p.vy;
        p.vx+=(Math.random()-.5)*.15;
        const prog=p.life/p.maxLife;
        p.op = prog<.3 ? prog/.3 : 1-((prog-.3)/.7);
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        ctx.fillStyle=`rgba(180,0,0,${p.op*.8})`;
        ctx.fill();
        if(p.life>=p.maxLife) parts[i]=criarParticula();
      });
      requestAnimationFrame(frame);
    };
    frame();
  }

  // ── 8. BIOLUMINESCÊNCIA (Doherimm) ─────────────────────────
  function iniciarBioluminescencia() {
    animPartsAtiva = true;
    const ctx = particlesCanvas.getContext('2d');
    const resize = ()=>{ particlesCanvas.width=mapWrap.clientWidth; particlesCanvas.height=mapWrap.clientHeight; };
    resize();

    const esporos = Array.from({length:60},()=>criarEsporo());
    function criarEsporo() {
      return {
        x:Math.random()*particlesCanvas.width, y:Math.random()*particlesCanvas.height,
        vy:-(Math.random()*.3+.05), vx:(Math.random()-.5)*.2,
        life:0, maxLife:120+Math.random()*180,
        size:.8+Math.random()*2, op:0,
        cor: Math.random()<.6 ? '68,200,170' : Math.random()<.5 ? '100,180,255' : '180,255,180',
      };
    }

    const frame = ()=>{
      if(!animPartsAtiva) return;
      ctx.clearRect(0,0,particlesCanvas.width,particlesCanvas.height);
      esporos.forEach((e,i)=>{
        e.life++; e.x+=e.vx; e.y+=e.vy;
        const prog=e.life/e.maxLife;
        e.op=prog<.3?prog/.3:1-((prog-.3)/.7);
        const g=ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,e.size*3);
        g.addColorStop(0,`rgba(${e.cor},${e.op*.9})`);
        g.addColorStop(1,`rgba(${e.cor},0)`);
        ctx.beginPath(); ctx.arc(e.x,e.y,e.size*3,0,Math.PI*2);
        ctx.fillStyle=g; ctx.fill();
        if(e.life>=e.maxLife) esporos[i]=criarEsporo();
      });
      requestAnimationFrame(frame);
    };
    frame();
  }

  function limparParticulas() {
    animPartsAtiva = false;
    const ctx = particlesCanvas.getContext('2d');
    ctx.clearRect(0,0,particlesCanvas.width,particlesCanvas.height);
  }

  // ── 9. VECTORA FLUTUANTE ───────────────────────────────────
  let vcAtual = { x:52, y:37 };
  let vcIndex = 0;
  let vcProg  = 0;
  let vcAnimId = null;

  function iniciarVectora() {
    const local = (window.LOCAIS?.arton||[]).find(l=>l.id==='vectora');
    if (!local?.rota) return;
    const el = document.querySelector('.map-point[data-id="vectora"]');
    if (!el) return;

    if (vcAnimId) cancelAnimationFrame(vcAnimId);
    const rota = local.rota;
    const VEL = 0.0008;

    const frame = ()=>{
      const a=rota[vcIndex], b=rota[(vcIndex+1)%rota.length];
      vcProg+=VEL;
      if(vcProg>=1){ vcProg=0; vcIndex=(vcIndex+1)%(rota.length-1); }
      vcAtual.x=a.x+(b.x-a.x)*vcProg;
      vcAtual.y=a.y+(b.y-a.y)*vcProg;
      el.style.left=vcAtual.x+'%';
      el.style.top =vcAtual.y+'%';
      vcAnimId=requestAnimationFrame(frame);
    };
    frame();
  }

  function atualizarVectora() { /* posição já é % — não precisa recalcular */ }

  // ── 10. RENDERIZAR PONTOS ──────────────────────────────────
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

  function renderPontos(mapaId) {
    const lista = window.LOCAIS?.[mapaId] || [];
    lista.forEach(local=>{
      const info = corMap[local.tipo] || corMap.cidade;
      const el   = document.createElement('div');
      const grande = local.destaque ? ' grande' : '';
      const vcClass = local.id==='vectora' ? ' vectora-ponto' : '';
      const torClass = local.tipo==='tormenta' ? ' tormenta-ring' : '';
      el.className=`map-point${grande}${vcClass}`;
      el.dataset.id   = local.id;
      el.dataset.tipo = local.tipo;
      el.style.cssText=`left:${local.x}%;top:${local.y}%;--pc:${info.cor};--pc-g:${info.glow}`;
      el.innerHTML=`
        <div class="point-ring${torClass}"><div class="point-dot"></div></div>
        <div class="point-label">${local.nome}</div>
        <div class="point-tooltip" style="--pc:${info.cor}">
          <div class="pt-nome">${local.nome}</div>
          <div class="pt-tipo">${local.subtitulo}</div>
        </div>`;
      el.addEventListener('click',()=>abrirPainel(local));
      mapContainer.appendChild(el);
    });

    // Inicia Vectora depois de criar o ponto
    if (mapaId==='arton') iniciarVectora();
  }

  function limparPontos() {
    if (vcAnimId) cancelAnimationFrame(vcAnimId);
    document.querySelectorAll('.map-point').forEach(el=>el.remove());
  }

  // ── 11. RENDERIZAR REGIÕES SVG ─────────────────────────────
  const svgEl = document.getElementById('regionsSvg');

  function renderRegioes(mapaId) {
    const lista = window.REGIOES?.[mapaId] || [];
    lista.forEach(reg=>{
      const shape=document.createElementNS('http://www.w3.org/2000/svg','polygon');
      shape.setAttribute('points',reg.pontos);
      shape.setAttribute('fill',reg.fill);
      shape.setAttribute('stroke',reg.stroke);
      shape.setAttribute('stroke-width','0.15');
      shape.classList.add('regiao-shape');
      shape.dataset.id=reg.id;
      svgEl.appendChild(shape);

      const lbl=document.getElementById('lbl-'+reg.id);
      shape.addEventListener('mouseenter',()=>{ if(lbl) lbl.classList.add('visivel'); });
      shape.addEventListener('mouseleave',()=>{ if(!shape.classList.contains('ativa')&&lbl) lbl.classList.remove('visivel'); });
      shape.addEventListener('click',e=>{ e.stopPropagation(); ativarRegiao(shape,reg); abrirPainelRegiao(reg); });
    });
  }

  function limparRegioes() {
    document.querySelectorAll('.regiao-shape').forEach(el=>el.remove());
    document.querySelectorAll('.regiao-label').forEach(l=>l.classList.remove('visivel'));
  }

  function ativarRegiao(shape, reg) {
    document.querySelectorAll('.regiao-shape').forEach(s=>{
      s.classList.remove('ativa');
      const l=document.getElementById('lbl-'+s.dataset.id);
      if(l) l.classList.remove('visivel');
    });
    shape.classList.add('ativa');
    const lbl=document.getElementById('lbl-'+reg.id);
    if(lbl) lbl.classList.add('visivel');
  }

  // ── 12. PAINEL LATERAL ─────────────────────────────────────
  const painelEl = document.getElementById('painel');
  const perigoLabel = { baixo:'Perigo Baixo', medio:'Perigo Médio', alto:'Perigo Alto', extremo:'Perigo Extremo' };

  function abrirPainel(local) {
    const info = corMap[local.tipo]||corMap.cidade;
    const painel = local.painel || 'generico';

    document.getElementById('pTipo').innerHTML=`<i class="ti ${info.icone}" aria-hidden="true"></i> ${local.subtitulo}`;
    document.getElementById('pTipo').style.setProperty('--pt-cor',info.cor);
    document.getElementById('pNome').textContent=local.nome;

    const perigoEl=document.getElementById('pPerigo');
    perigoEl.className=`p-perigo perigo-${local.perigo||'medio'}`;
    perigoEl.innerHTML=`<i class="ti ti-alert-triangle" aria-hidden="true"></i> ${perigoLabel[local.perigo||'medio']}`;

    if (painel==='rico') {
      document.getElementById('painelRico').style.display='block';
      document.getElementById('painelGenerico').style.display='none';
      preencherRico(local);
    } else {
      document.getElementById('painelRico').style.display='none';
      document.getElementById('painelGenerico').style.display='block';
      preencherGenerico(local);
    }

    document.getElementById('pDesc').textContent = local.descricao||'';
    document.getElementById('pTags').innerHTML=(local.tags||[]).map(t=>`<span class="p-tag">${t}</span>`).join('');
    document.getElementById('pRegiao').textContent=local.regiao||'—';
    document.getElementById('pPagina').textContent=local.pagina?`p. ${local.pagina}`:'—';
    document.getElementById('btnWiki').textContent=local.pagina?`Ver no Atlas — p.${local.pagina}`:'Ver na Wiki';

    painelEl.classList.add('aberto');
  }

  function preencherRico(local) {
    document.getElementById('pHeroBrasao').innerHTML=`<i class="ti ${corMap[local.tipo]?.icone||'ti-map-pin'}" aria-hidden="true"></i>`;
    document.getElementById('pLema').textContent=local.lema||'';
    document.getElementById('pGoverno').textContent=local.governo||'—';
    document.getElementById('pGentilico').textContent=local.gentilico||'—';
    document.getElementById('pCapital').textContent=local.capital||'—';
    document.getElementById('pPopulacao').textContent=local.populacao||'—';
    document.getElementById('pRegente').textContent=local.regente||'—';
    document.getElementById('pRacas').textContent=local.racas||'—';
    document.getElementById('pDivindades').textContent=local.divindades||'—';

    // Personagens
    const pEl=document.getElementById('pPersonagens');
    const pers=local.personagens||[];
    if(pers.length){
      document.getElementById('pSecaoPersonagens').style.display='block';
      pEl.innerHTML=pers.map(p=>`
        <div class="p-personagem">
          <div class="p-pers-avatar ${p.alinhamento||'neutro'}"><i class="ti ${p.icone||'ti-user'}" aria-hidden="true"></i></div>
          <div class="p-pers-nome">${p.nome}</div>
        </div>`).join('');
    } else {
      document.getElementById('pSecaoPersonagens').style.display='none';
    }
  }

  function preencherGenerico(local) {
    document.getElementById('pNota').textContent=local.descricao||'Informações não disponíveis.';
  }

  function abrirPainelRegiao(reg) {
    const info={cor:reg.cor||'#c9a84c',icone:'ti-map'};
    document.getElementById('pTipo').innerHTML=`<i class="ti ti-map" aria-hidden="true"></i> ${reg.tipo}`;
    document.getElementById('pTipo').style.setProperty('--pt-cor',reg.cor||'#c9a84c');
    document.getElementById('pNome').textContent=reg.nome;
    document.getElementById('pPerigo').className='';
    document.getElementById('pPerigo').innerHTML='';

    document.getElementById('painelRico').style.display='none';
    document.getElementById('painelGenerico').style.display='block';
    document.getElementById('pNota').textContent=reg.descricao||'';
    document.getElementById('pDesc').textContent='';
    document.getElementById('pTags').innerHTML=(reg.tags||[]).map(t=>`<span class="p-tag">${t}</span>`).join('');
    document.getElementById('pRegiao').textContent='Arton';
    document.getElementById('pPagina').textContent=reg.pagina?`p. ${reg.pagina}`:'—';
    document.getElementById('btnWiki').textContent=reg.pagina?`Ver no Atlas — p.${reg.pagina}`:'Ver na Wiki';

    painelEl.classList.add('aberto');
  }

  window.fecharPainel = ()=>{
    painelEl.classList.remove('aberto');
    document.querySelectorAll('.regiao-shape').forEach(s=>{
      s.classList.remove('ativa');
      const l=document.getElementById('lbl-'+s.dataset.id);
      if(l) l.classList.remove('visivel');
    });
  };

  // ── 13. SIDEBAR ────────────────────────────────────────────
  const filtrosPanel=document.getElementById('filtrosPanel');

  window.toggleFiltros = (btn)=>{
    btn.classList.toggle('ativo');
    filtrosPanel.classList.toggle('aberto');
  };

  window.toggleTipo = (el,tipo)=>{
    el.classList.toggle('on');
    el.querySelector('.fp-check').classList.toggle('on');
    const ativo=el.classList.contains('on');
    document.querySelectorAll(`.map-point[data-tipo="${tipo}"]`).forEach(p=>{
      p.style.opacity=ativo?'1':'0.06';
      p.style.pointerEvents=ativo?'all':'none';
    });
  };

  window.toggleRegiao=(el,id)=>{
    el.classList.toggle('on');
    el.querySelector('.fp-check').classList.toggle('on');
    const ativo=el.classList.contains('on');
    const shape=document.querySelector(`.regiao-shape[data-id="${id}"]`);
    const lbl=document.getElementById('lbl-'+id);
    if(shape) shape.style.display=ativo?'':'none';
    if(lbl)   lbl.style.display=ativo?'':'none';
  };

  // ── 14. BUSCA ──────────────────────────────────────────────
  const searchInput  =document.getElementById('searchInput');
  const searchResults=document.getElementById('searchResults');

  if (searchInput) {
    searchInput.addEventListener('input',()=>{
      const val=searchInput.value.trim().toLowerCase();
      if(!val){ searchResults.classList.remove('visivel'); return; }
      const lista=window.LOCAIS?.[mapaAtual]||[];
      const found=lista.filter(l=>
        l.nome.toLowerCase().includes(val)||
        (l.tags||[]).some(t=>t.toLowerCase().includes(val))
      ).slice(0,8);
      if(!found.length){ searchResults.classList.remove('visivel'); return; }
      const cmap={capital:'#c9a84c',cidade:'#cc8844',magico:'#8888ff',fortaleza:'#5588aa',perigo:'#cc2222',tormenta:'#8B0000',masmorra:'#664466',ruinas:'#886644',regiao:'#44aa66'};
      searchResults.innerHTML=found.map(l=>`
        <div class="search-item" onclick="irParaPonto('${l.id}')" style="--sc:${cmap[l.tipo]||'#888'}">
          <div class="search-dot"></div>
          <div>
            <div class="search-nome">${l.nome}</div>
            <div class="search-tipo">${l.subtitulo}</div>
          </div>
        </div>`).join('');
      searchResults.classList.add('visivel');
    });

    document.addEventListener('click',e=>{
      if(!e.target.closest('.topbar-busca')) searchResults.classList.remove('visivel');
    });
    document.addEventListener('keydown',e=>{
      if((e.ctrlKey||e.metaKey)&&e.key==='k'){ e.preventDefault(); searchInput.focus(); }
      if(e.key==='Escape'){ searchResults.classList.remove('visivel'); searchInput.blur(); }
    });
  }

  window.irParaPonto=(id)=>{
    const lista=window.LOCAIS?.[mapaAtual]||[];
    const local=lista.find(l=>l.id===id);
    if(!local) return;
    searchResults.classList.remove('visivel');
    if(searchInput) searchInput.value='';
    const rect=mapWrap.getBoundingClientRect();
    tx=rect.width/2-(local.x/100)*rect.width*scale;
    ty=rect.height/2-(local.y/100)*rect.height*scale;
    applyTransform();
    setTimeout(()=>abrirPainel(local),300);
  };

  // ── 15. MODO CRIAÇÃO DE PONTOS ─────────────────────────────
  let modoCriacao=false;
  let coordsCriacao={x:50,y:50};
  const banner=document.getElementById('modocriacaoBanner');
  const btnNovoPonto=document.getElementById('btnNovoPonto');
  let preview=null;

  window.toggleModoCriacao=()=>{
    modoCriacao=!modoCriacao;
    mapWrap.classList.toggle('modo-criacao',modoCriacao);
    btnNovoPonto.classList.toggle('ativo',modoCriacao);
    if(banner) banner.classList.toggle('visivel',modoCriacao);
    if(!modoCriacao && preview){ preview.remove(); preview=null; }
  };

  mapWrap.addEventListener('mousemove',e=>{
    if(!modoCriacao) return;
    const rect=mapWrap.getBoundingClientRect();
    const px=((e.clientX-rect.left-tx)/scale/rect.width)*100;
    const py=((e.clientY-rect.top-ty)/scale/rect.height)*100;
    coordsCriacao={x:Math.round(px*10)/10,y:Math.round(py*10)/10};
    if(!preview){
      preview=document.createElement('div');
      preview.className='map-point point-preview';
      preview.innerHTML='<div class="point-ring" style="--pc:#ffaa44"><div class="point-dot" style="background:#ffaa44"></div></div>';
      mapContainer.appendChild(preview);
    }
    preview.style.left=coordsCriacao.x+'%';
    preview.style.top =coordsCriacao.y+'%';
  });

  mapWrap.addEventListener('click',e=>{
    if(!modoCriacao) return;
    if(e.target.closest('.map-point,.regiao-shape,.painel,.z-btn,.sb-btn')) return;
    document.getElementById('novoCoordsInfo').textContent=`Coordenadas: ${coordsCriacao.x}% · ${coordsCriacao.y}%`;
    abrirModal();
  });

  // ── 16. MODAL ──────────────────────────────────────────────
  const modalOverlay=document.getElementById('modalOverlay');
  window.abrirModal=()=>{ modalOverlay.classList.add('aberto'); };
  window.fecharModal=()=>{ modalOverlay.classList.remove('aberto'); };
  modalOverlay.addEventListener('click',e=>{ if(e.target===modalOverlay) fecharModal(); });
  window.selTipo=(el)=>{ document.querySelectorAll('.tipo-opt').forEach(t=>t.classList.remove('sel')); el.classList.add('sel'); };

  document.getElementById('btnSalvarPonto')?.addEventListener('click',()=>{
    const nome=document.getElementById('novoPontoNome')?.value.trim();
    const desc=document.getElementById('novoPontoDesc')?.value.trim();
    const tipoEl=document.querySelector('.tipo-opt.sel');
    const tipo=tipoEl?.dataset.tipo||'cidade';
    if(!nome){ document.getElementById('novoPontoNome')?.focus(); return; }

    const pontos=JSON.parse(localStorage.getItem(`t20-pontos-${mapaAtual}`)||'[]');
    pontos.push({
      id:'custom-'+Date.now(), nome, subtitulo:'Ponto personalizado',
      tipo, regiao:'Meu Mapa', descricao:desc||'',
      perigo:'medio', x:coordsCriacao.x, y:coordsCriacao.y,
      pagina:null, tags:['Personalizado'], personagens:[],
      painel:'generico', destaque:false,
    });
    localStorage.setItem(`t20-pontos-${mapaAtual}`,JSON.stringify(pontos));

    // Adiciona ao mapa imediatamente
    const info=corMap[tipo]||corMap.cidade;
    const el=document.createElement('div');
    el.className='map-point';
    el.dataset.id='custom-'+Date.now();
    el.dataset.tipo=tipo;
    el.style.cssText=`left:${coordsCriacao.x}%;top:${coordsCriacao.y}%;--pc:${info.cor};--pc-g:${info.glow}`;
    el.innerHTML=`<div class="point-ring"><div class="point-dot"></div></div><div class="point-label">${nome}</div>`;
    el.addEventListener('click',()=>abrirPainel(pontos[pontos.length-1]));
    mapContainer.appendChild(el);

    fecharModal();
    if(modoCriacao) toggleModoCriacao();
    document.getElementById('novoPontoNome').value='';
    document.getElementById('novoPontoDesc').value='';
  });

  // ── 17. MEDIDOR DE DISTÂNCIA ───────────────────────────────
  let modoDistancia=false;
  let pontosDistancia=[];
  const distCanvas=document.getElementById('distanciaCanvas');
  const distUI=document.getElementById('distanciaUI');

  window.toggleDistancia=()=>{
    modoDistancia=!modoDistancia;
    pontosDistancia=[];
    const btn=document.getElementById('btnDistancia');
    if(btn) btn.classList.toggle('ativo',modoDistancia);
    if(!modoDistancia){ limparDistancia(); distUI.classList.remove('visivel'); }
  };

  mapWrap.addEventListener('click',e=>{
    if(!modoDistancia||modoCriacao) return;
    if(e.target.closest('.painel,.z-btn,.sb-btn,.btn-novo-ponto,.camadas-seletor,.topbar-search')) return;
    const rect=mapWrap.getBoundingClientRect();
    const px=((e.clientX-rect.left-tx)/scale/rect.width)*100;
    const py=((e.clientY-rect.top-ty)/scale/rect.height)*100;
    pontosDistancia.push({x:px,y:py,cx:e.clientX-rect.left,cy:e.clientY-rect.top});
    if(pontosDistancia.length===2) calcularDistancia();
    else if(pontosDistancia.length>2){ pontosDistancia=[pontosDistancia[pontosDistancia.length-1]]; limparDistancia(); }
  });

  function calcularDistancia(){
    const a=pontosDistancia[0],b=pontosDistancia[1];
    const dx=(b.x-a.x), dy=(b.y-a.y);
    const dist=Math.sqrt(dx*dx+dy*dy);
    // Escala aproximada: 100% do mapa ≈ 5000 léguas
    const leguas=Math.round(dist*50);
    const pe=Math.round(leguas/7);
    const cv=Math.round(leguas/15);
    const nv=Math.round(leguas/25);

    distUI.classList.add('visivel');
    distUI.innerHTML=`<i class="ti ti-ruler" style="color:#c9a84c"></i> ${leguas} léguas · ${pe}d a pé · ${cv}d a cavalo · ${nv}d de navio`;

    const ctx=distCanvas.getContext('2d');
    distCanvas.width=mapWrap.clientWidth; distCanvas.height=mapWrap.clientHeight;
    ctx.clearRect(0,0,distCanvas.width,distCanvas.height);
    ctx.beginPath(); ctx.moveTo(a.cx,a.cy); ctx.lineTo(b.cx,b.cy);
    ctx.strokeStyle='rgba(201,168,76,0.7)'; ctx.lineWidth=1.5;
    ctx.setLineDash([8,5]); ctx.stroke(); ctx.setLineDash([]);
    [a,b].forEach(p=>{
      ctx.beginPath(); ctx.arc(p.cx,p.cy,5,0,Math.PI*2);
      ctx.fillStyle='#c9a84c'; ctx.fill();
    });
    const mx=(a.cx+b.cx)/2, my=(a.cy+b.cy)/2;
    ctx.font='500 11px Cinzel,serif'; ctx.fillStyle='#c9a84c';
    ctx.textAlign='center';
    ctx.fillText(`${leguas} léguas`,mx,my-10);
  }

  function limparDistancia(){
    if(!distCanvas) return;
    const ctx=distCanvas.getContext('2d');
    ctx.clearRect(0,0,distCanvas.width,distCanvas.height);
  }

  // ── 18. EXPORTAR PONTOS ────────────────────────────────────
  window.exportarPontos=()=>{
    const pontos=localStorage.getItem(`t20-pontos-${mapaAtual}`)||'[]';
    const blob=new Blob([pontos],{type:'application/json'});
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download=`meus-pontos-${mapaAtual}.json`;
    a.click();
  };

  // ── 19. INICIALIZAÇÃO ──────────────────────────────────────
  // Carrega pontos salvos do localStorage
  const pontosSalvos=JSON.parse(localStorage.getItem(`t20-pontos-arton`)||'[]');
  if(pontosSalvos.length && window.LOCAIS?.arton){
    window.LOCAIS.arton.push(...pontosSalvos);
  }

  // Render inicial
  renderPontos('arton');
  renderRegioes('arton');
  trocarAtmosfera('arton');

  // Imagem carregada
  mapImg.addEventListener('load',()=>{
    trocarAtmosfera(mapaAtual);
  });
});