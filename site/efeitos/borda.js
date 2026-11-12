/**
 * borda.js - Nexvia Tech Efeito Feixe de Luz de Contorno
 * Cria um feixe de luz contínuo que percorre a borda arredondada de elementos [data-efeito="borda"].
 * Parâmetros CSS: --borda-tempo (ex: 11.7s), --borda-cor (ex: #6D4AFF), --borda-largura (ex: 2px)
 */
(function () {
  'use strict';

  function initBorda() {
    const elements = document.querySelectorAll('[data-efeito="borda"]');
    elements.forEach((el) => {
      if (el._bordaInitialized) return;
      el._bordaInitialized = true;

      // Assegurar posicionamento relativo no elemento hospedeiro
      const computedPos = window.getComputedStyle(el).position;
      if (computedPos === 'static') {
        el.style.position = 'relative';
      }

      // Criar container SVG de sobreposição
      const svgNs = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNs, 'svg');
      svg.setAttribute('class', 'efeito-borda-svg');
      svg.setAttribute('aria-hidden', 'true');
      svg.style.position = 'absolute';
      svg.style.inset = '0';
      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.style.pointerEvents = 'none';
      svg.style.zIndex = '3';
      svg.style.overflow = 'visible';

      // Gerar ID exclusivo para os gradientes e filtros
      const uniqueId = 'borda_' + Math.random().toString(36).substring(2, 9);

      const defs = document.createElementNS(svgNs, 'defs');

      // Gradiente linear que define o feixe de luz
      const gradient = document.createElementNS(svgNs, 'linearGradient');
      gradient.setAttribute('id', `${uniqueId}_grad`);
      gradient.setAttribute('gradientUnits', 'userSpaceOnUse');

      const stop1 = document.createElementNS(svgNs, 'stop');
      stop1.setAttribute('offset', '0%');
      stop1.setAttribute('stop-color', 'var(--borda-cor, #6D4AFF)');
      stop1.setAttribute('stop-opacity', '0');

      const stop2 = document.createElementNS(svgNs, 'stop');
      stop2.setAttribute('offset', '50%');
      stop2.setAttribute('stop-color', 'var(--borda-cor, #6D4AFF)');
      stop2.setAttribute('stop-opacity', '1');

      const stop3 = document.createElementNS(svgNs, 'stop');
      stop3.setAttribute('offset', '100%');
      stop3.setAttribute('stop-color', 'var(--borda-cor-secundaria, #38BDF8)');
      stop3.setAttribute('stop-opacity', '0');

      gradient.appendChild(stop1);
      gradient.appendChild(stop2);
      gradient.appendChild(stop3);

      // Filtro de brilho / glow
      const filter = document.createElementNS(svgNs, 'filter');
      filter.setAttribute('id', `${uniqueId}_glow`);
      filter.setAttribute('x', '-20%');
      filter.setAttribute('y', '-20%');
      filter.setAttribute('width', '140%');
      filter.setAttribute('height', '140%');

      const feGaussianBlur = document.createElementNS(svgNs, 'feGaussianBlur');
      feGaussianBlur.setAttribute('stdDeviation', '3');
      feGaussianBlur.setAttribute('result', 'blur');

      const feMerge = document.createElementNS(svgNs, 'feMerge');
      const feMergeNode1 = document.createElementNS(svgNs, 'feMergeNode');
      feMergeNode1.setAttribute('in', 'blur');
      const feMergeNode2 = document.createElementNS(svgNs, 'feMergeNode');
      feMergeNode2.setAttribute('in', 'SourceGraphic');

      feMerge.appendChild(feMergeNode1);
      feMerge.appendChild(feMergeNode2);
      filter.appendChild(feGaussianBlur);
      filter.appendChild(feMerge);

      defs.appendChild(gradient);
      defs.appendChild(filter);
      svg.appendChild(defs);

      // Retângulo com cantos arredondados
      const rect = document.createElementNS(svgNs, 'rect');
      rect.setAttribute('class', 'efeito-borda-rect');
      rect.setAttribute('fill', 'none');
      rect.setAttribute('stroke', `url(#${uniqueId}_grad)`);
      rect.setAttribute('stroke-width', 'var(--borda-largura, 2px)');
      rect.setAttribute('filter', `url(#${uniqueId}_glow)`);

      svg.appendChild(rect);
      el.appendChild(svg);

      function updateDimensions() {
        const width = el.offsetWidth || el.getBoundingClientRect().width;
        const height = el.offsetHeight || el.getBoundingClientRect().height;
        if (width === 0 || height === 0) return;

        const computed = window.getComputedStyle(el);
        const radius = parseFloat(computed.borderRadius) || 16;
        const strokeW = parseFloat(computed.getPropertyValue('--borda-largura')) || 2;
        const halfStroke = strokeW / 2;

        const drawW = Math.max(0, width - strokeW);
        const drawH = Math.max(0, height - strokeW);
        const drawR = Math.max(0, radius - halfStroke);

        rect.setAttribute('x', halfStroke.toFixed(1));
        rect.setAttribute('y', halfStroke.toFixed(1));
        rect.setAttribute('width', drawW.toFixed(1));
        rect.setAttribute('height', drawH.toFixed(1));
        rect.setAttribute('rx', drawR.toFixed(1));
        rect.setAttribute('ry', drawR.toFixed(1));

        // Calcular perímetro real com cantos arredondados
        // P = 2*(w - 2r) + 2*(h - 2r) + 2*PI*r
        const perimeter = Math.max(10, 2 * (drawW - 2 * drawR) + 2 * (drawH - 2 * drawR) + 2 * Math.PI * drawR);
        const beamLength = Math.max(40, Math.min(180, perimeter * 0.28));

        rect.style.strokeDasharray = `${beamLength.toFixed(1)} ${(perimeter - beamLength).toFixed(1)}`;
        rect.style.setProperty('--borda-perimetro', `${perimeter.toFixed(1)}px`);

        // Atualizar coordenadas do gradiente
        gradient.setAttribute('x1', '0');
        gradient.setAttribute('y1', '0');
        gradient.setAttribute('x2', drawW.toFixed(1));
        gradient.setAttribute('y2', drawH.toFixed(1));
      }

      updateDimensions();

      if (window.ResizeObserver) {
        const ro = new ResizeObserver(() => updateDimensions());
        ro.observe(el);
      } else {
        window.addEventListener('resize', updateDimensions);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBorda);
  } else {
    initBorda();
  }

  window.initBorda = initBorda;
})();

