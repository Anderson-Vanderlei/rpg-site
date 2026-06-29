/* ============================================================
   TORMENTA 20 — main.js
   Cursor personalizado, navbar scroll, scroll reveal, abas
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. CURSOR PERSONALIZADO
  // ============================================================
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (dot && ring) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top  = mouseY + 'px';
    });

    // Ring segue com leve atraso
    function animarRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(animarRing);
    }
    animarRing();

    // Efeito hover em elementos interativos
    const interativos = document.querySelectorAll('a, button, .card-item, .aba, .nav-link, .recente-card');
    interativos.forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('hover');
        ring.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('hover');
        ring.classList.remove('hover');
      });
    });
  }

  // ============================================================
  // 2. NAVBAR — EFEITO SCROLL
  // ============================================================
  const navbar = document.getElementById('navbar');

  if (navbar) {
    const atualizarNavbar = () => {
      if (window.scrollY > 60) {
        navbar.classList.remove('transparente');
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.add('transparente');
        navbar.classList.remove('scrolled');
      }
    };

    // Estado inicial
    atualizarNavbar();
    window.addEventListener('scroll', atualizarNavbar, { passive: true });

    // Marcar link ativo ao clicar
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('ativo'));
        link.classList.add('ativo');
      });
    });
  }

  // ============================================================
  // 3. HERO — IMAGEM COM ANIMAÇÃO DE ENTRADA
  // ============================================================
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    setTimeout(() => heroBg.classList.add('loaded'), 100);
  }

  // ============================================================
  // 4. SCROLL REVEAL
  // ============================================================
  const elementos = document.querySelectorAll('.reveal');

  if (elementos.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visivel');
          observer.unobserve(entry.target); // para de observar após revelar
        }
      });
    }, { threshold: 0.12 });

    elementos.forEach(el => observer.observe(el));
  }

  // ============================================================
  // 5. ABAS DA WIKI
  // ============================================================
  const dadosAbas = {
    personagem: {
      icone: 'ti-user',
      label: 'Personagem',
      tooltip: 'Ver ficha completa',
      cards: ['Ivor, o Caçador', 'Lena, a Sábia', 'Tork, o Bárbaro', 'Syra, a Druida'],
      destaque: 'Khalmyr, o Justo',
      descricoes: ['Guerreiro errante do norte', 'Maga do Círculo Arcano', 'Bárbaro das Estepes', 'Druida da Floresta Negra'],
      descDestaque: 'O Deus da Justiça e protetor dos fracos de Arton.'
    },
    local: {
      icone: 'ti-map-pin',
      label: 'Local',
      tooltip: 'Explorar no Atlas',
      cards: ['Torre de Aslothia', 'Ruínas de Galrash', 'Porto de Vell', 'Cavernas do Gelo'],
      destaque: 'Vectora, a Cidade Mágica',
      descricoes: ['Reduto dos magos do sul', 'Antiga capital dos elfos', 'Principal porto de Arton', 'Lar dos anões do norte'],
      descDestaque: 'A maior cidade mágica do mundo, flutuando nos céus de Arton.'
    },
    org: {
      icone: 'ti-shield',
      label: 'Organização',
      tooltip: 'Ver detalhes',
      cards: ['Ordem da Luz', 'Guilda dos Ladrões', 'Clã do Trovão', 'Irmandade Sombria'],
      destaque: 'Inquisição de Thalis',
      descricoes: ['Paladinos da justiça divina', 'Mestres das sombras', 'Guerreiros do norte', 'Cultistas das trevas'],
      descDestaque: 'A temida ordem que caça hereges e criaturas das trevas.'
    },
    evento: {
      icone: 'ti-calendar-event',
      label: 'Evento',
      tooltip: 'Ver na Cronologia',
      cards: ['A Grande Tormenta', 'Queda de Galrash', 'Guerra dos Deuses', 'Ascensão de Volk'],
      destaque: 'O Cerco de Vectora',
      descricoes: ['O cataclismo que mudou tudo', 'Fim da era élfica', 'Conflito divino eterno', 'Surgimento do tirano'],
      descDestaque: 'O maior cerco da história de Arton, que durou três décadas.'
    },
    item: {
      icone: 'ti-diamond',
      label: 'Item',
      tooltip: 'Ver no Compêndio',
      cards: ['Espada da Aurora', 'Cajado Lunar', 'Anel de Fogo', 'Armadura das Sombras'],
      destaque: 'Lâmina do Caos',
      descricoes: ['Arma sagrada de Khalmyr', 'Foco arcano dos magos', 'Relíquia de Ignis', 'Equipamento dos assassinos'],
      descDestaque: 'Arma lendária forjada no coração da própria Tormenta.'
    },
    criatura: {
      icone: 'ti-paw',
      label: 'Criatura',
      tooltip: 'Ver no Bestiário',
      cards: ['Dragão Carmesim', 'Troll das Pedras', 'Goblin Sombrio', 'Hidra Negra'],
      destaque: 'O Devorador de Almas',
      descricoes: ['Terror alado do sul', 'Guardião das montanhas', 'Explorador das cavernas', 'Flagelo dos pântanos'],
      descDestaque: 'Uma das mais antigas e terríveis criaturas nascidas da Tormenta.'
    },
    divindade: {
      icone: 'ti-sparkles',
      label: 'Divindade',
      tooltip: 'Ver no Compêndio',
      cards: ['Khalmyr', 'Thyatis', 'Valkaria', 'Megalokk'],
      destaque: 'Tenebra, a Sombria',
      descricoes: ['Deus da Justiça', 'Deusa da Magia', 'Deusa da Aventura', 'Deus dos Monstros'],
      descDestaque: 'A deusa das trevas e senhora do submundo de Arton.'
    },
    raca: {
      icone: 'ti-users',
      label: 'Raça',
      tooltip: 'Ver Raças',
      cards: ['Humanos', 'Elfos', 'Anões', 'Goblins'],
      destaque: 'Lefou — Filhos da Tormenta',
      descricoes: ['Povo adaptável e expansionista', 'Guardiões das florestas eternas', 'Mestres das montanhas e forjas', 'Pequenos mas astutos'],
      descDestaque: 'Seres transformados pela magia caótica da Tormenta, carregando sua marca.'
    }
  };

  function atualizarGrid(tipo) {
    const dados = dadosAbas[tipo];
    if (!dados) return;

    const ids = ['c1', 'c2', 'c3', 'c4'];
    const idsDest = ['d1', 'd2', 'd3', 'd4'];
    const cf = document.getElementById('cf');
    const dfDest = document.getElementById('df');

    ids.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) el.textContent = dados.cards[i] || '';
    });

    idsDest.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) el.textContent = dados.descricoes[i] || '';
    });

    if (cf) cf.textContent = dados.destaque;
    if (dfDest) dfDest.textContent = dados.descDestaque;

    // Atualiza ícones e labels
    document.querySelectorAll('.card-tipo').forEach(ct => {
      ct.innerHTML = `<div class="card-emblema"><i class="ti ${dados.icone}" aria-hidden="true"></i></div>${dados.label}`;
    });

    document.querySelectorAll('.card-placeholder i, .card-icon-placeholder').forEach(ic => {
      ic.className = `ti ${dados.icone}`;
    });

    document.querySelectorAll('.card-tooltip').forEach((tt, i) => {
      tt.textContent = i < 4 ? (dados.descricoes[i] || dados.tooltip) : dados.descDestaque;
    });
  }

  window.definirAba = function(el) {
    document.querySelectorAll('.aba').forEach(a => a.classList.remove('ativa'));
    el.classList.add('ativa');
    atualizarGrid(el.dataset.tipo);
  };

  // ============================================================
  // 6. BUSCA — FOCO COM ATALHO
  // ============================================================
  const inputBusca = document.querySelector('.nav-search input');
  if (inputBusca) {
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputBusca.focus();
      }
      if (e.key === 'Escape') {
        inputBusca.blur();
      }
    });
  }

});