/* ============================================================
   TORMENTA 20 — acessibilidade.js
   Torna clicáveis não-nativos (div/span/tr com onclick) navegáveis
   por teclado, em TODAS as páginas do site — automático, cobre
   elementos já presentes no HTML e qualquer coisa renderizada
   depois via innerHTML (cards, painéis, novas seções).

   Por que isso existe: o site usa bastante <div onclick="..."> pra
   cards e filtros (mais rápido de estilizar que <button>), mas uma
   <div> não recebe foco de teclado nem é anunciada por leitor de
   tela por padrão. Em vez de converter tudo pra <button> (trabalho
   grande, mexe em CSS existente), este arquivo adiciona por cima:
   tabindex, role e o Enter/Espaço ativando o clique — sem mudar
   nada visualmente. Ver auditoria de acessibilidade, jul/2026.
============================================================ */

(function () {
  // Elementos que são só "pano de fundo" pra fechar drawer/sidebar no clique —
  // não são um controle de verdade, não precisam de foco de teclado.
  const SELETOR_IGNORAR = '.sidebar-overlay, .nav-overlay';

  // Classes que indicam "isto é um item de menu que expande/recolhe" —
  // usa aria-expanded em vez de aria-pressed.
  const CLASSE_ACORDEAO = 'nav-grupo-header';

  // Classes que, quando presentes, indicam o estado "ligado/selecionado"
  // de um toggle (filtro, opção marcada) — usadas pra manter aria-pressed
  // sincronizado com o visual já existente (classe .on/.sel/.ativo/.selecionado).
  const CLASSES_ESTADO_LIGADO = ['on', 'sel', 'ativo', 'selecionado'];

  function estaLigado(el) {
    return CLASSES_ESTADO_LIGADO.some(c => el.classList.contains(c));
  }

  function sincronizarEstadoAria(el) {
    if (el.classList.contains(CLASSE_ACORDEAO)) {
      el.setAttribute('aria-expanded', estaLigado(el) ? 'true' : 'false');
    } else if (el.hasAttribute('aria-pressed')) {
      el.setAttribute('aria-pressed', estaLigado(el) ? 'true' : 'false');
    }
  }

  function tornarClicavelAcessivel(el) {
    if (!el.hasAttribute || el.dataset.a11yOk) return;
    if (el.matches(SELETOR_IGNORAR)) return;

    const tag = el.tagName.toLowerCase();
    if (['button', 'a', 'input', 'select', 'textarea'].includes(tag)) return; // já são nativamente acessíveis

    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');

    if (el.classList.contains(CLASSE_ACORDEAO)) {
      el.setAttribute('role', 'button');
      el.setAttribute('aria-expanded', estaLigado(el) ? 'true' : 'false');
    } else if (CLASSES_ESTADO_LIGADO.some(c => el.classList.contains(c)) || el.dataset.toggle !== undefined) {
      el.setAttribute('role', 'button');
      el.setAttribute('aria-pressed', estaLigado(el) ? 'true' : 'false');
    } else {
      el.setAttribute('role', 'button');
    }

    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        el.click();
      }
    });

    el.dataset.a11yOk = '1';
  }

  function processar(root) {
    if (root.hasAttribute && root.hasAttribute('onclick')) tornarClicavelAcessivel(root);
    if (root.querySelectorAll) {
      root.querySelectorAll('[onclick]').forEach(tornarClicavelAcessivel);
    }
  }

  // Passada inicial, pro que já está no HTML estático.
  document.addEventListener('DOMContentLoaded', () => processar(document.body));

  // Observa o DOM inteiro: pega cards/painéis renderizados depois via innerHTML
  // (compêndio, atlas) e também mudanças de classe (pra manter aria-pressed/
  // aria-expanded sincronizados quando o próprio código do site liga/desliga
  // a classe de estado visual).
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'childList') {
        m.addedNodes.forEach(node => {
          if (node.nodeType === 1) processar(node);
        });
      } else if (m.type === 'attributes' && m.target.dataset && m.target.dataset.a11yOk) {
        sincronizarEstadoAria(m.target);
      }
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  });
})();
