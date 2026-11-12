/**
 * carrossel-3d.js - Nexvia Tech Carrossel Orbital 3D
 * Posiciona os cartões em anel tridimensional giratório ao redor do centro planetário.
 * Suporta rotação contínua automática, pausa ao passar o mouse, arrasto tátil/mouse com inércia
 * e sincronização de clique com o seletor do portfólio.
 */
(function () {
  'use strict';

  function initCarrossel3D() {
    const containers = document.querySelectorAll('[data-efeito="carrossel-3d"]');

    containers.forEach((container) => {
      if (container._carrosselInitialized) return;
      container._carrosselInitialized = true;

      // Leitura de parâmetros de configuração
      const velocidadeBase = parseFloat(container.dataset.velocidade ?? '0.8');
      const inclinacaoBase = parseFloat(container.dataset.inclinacao ?? '-10');
      const folgaBase = parseFloat(container.dataset.folga ?? '24');

      // Estrutura de montagem
      container.classList.add('c3d-container');
      container.style.perspective = '1400px';
      container.style.position = 'relative';
      container.style.userSelect = 'none';
      container.style.touchAction = 'pan-y';

      // Capturar cartões filhos
      // Se houver um centro planetário (.c3d-centro), preservamos separado
      const centroEl = container.querySelector('.c3d-centro');
      const rawCards = Array.from(container.children).filter((el) => el !== centroEl && !el.classList.contains('c3d-stage'));

      // Criar palco giratório 3D
      const stage = document.createElement('div');
      stage.className = 'c3d-stage';
      stage.style.position = 'absolute';
      stage.style.left = '50%';
      stage.style.top = '50%';
      stage.style.width = '0';
      stage.style.height = '0';
      stage.style.transformStyle = 'preserve-3d';
      stage.style.willChange = 'transform';

      container.appendChild(stage);

      if (centroEl) {
        // O núcleo planetário fica DENTRO do palco 3D em Z=0
        // Assim, cartões com Z > 0 passam na frente dele, e cartões com Z < 0 passam atrás!
        centroEl.style.position = 'absolute';
        centroEl.style.left = '0px';
        centroEl.style.top = '0px';
        centroEl.style.transformStyle = 'preserve-3d';
        centroEl.style.zIndex = '50';
        stage.appendChild(centroEl);
      }

      // Preparar cada cartão
      const cards = rawCards.map((card, idx) => {
        card.classList.add('c3d-card');
        card.style.position = 'absolute';
        card.style.transformOrigin = '50% 50%';
        card.style.backfaceVisibility = 'visible';
        card.style.willChange = 'transform, opacity';
        stage.appendChild(card);
        return card;
      });

      const totalCards = cards.length;
      if (totalCards === 0) return;

      let rotation = 0;
      let velocity = velocidadeBase * 0.28;
      let targetVelocity = velocidadeBase * 0.28;
      let isHovered = false;
      let isDragging = false;
      let startX = 0;
      let lastX = 0;
      let dragDistance = 0;
      let lastTime = 0;
      let dragVelocity = 0;
      let radius = 320;

      function updateCardGeometry() {
        const computed = window.getComputedStyle(container);
        const isMobile = window.innerWidth <= 640;
        const cardW = parseFloat(computed.getPropertyValue('--carrossel-3d-largura')) || (isMobile ? 115 : 200);
        const folga = isMobile ? Math.max(folgaBase, 26) : folgaBase;

        // Calcular raio necessário para acomodar N cartões com folga
        // 2 * PI * R >= N * (cardW + folga)
        const containerW = container.getBoundingClientRect().width || 800;
        const minRadius = (totalCards * (cardW + folga)) / (2 * Math.PI);
        // Ajustar raio para caber harmoniosamente na largura do container
        radius = isMobile
          ? Math.max(170, Math.min(minRadius, containerW * 0.48))
          : Math.max(220, Math.min(minRadius, containerW * 0.42));

        // Ajustar posicionamento base dos cartões
        const step = 360 / totalCards;
        cards.forEach((card, i) => {
          card._angle = i * step;
          card.style.left = `${-cardW / 2}px`;
          const cardH = parseFloat(computed.getPropertyValue('--carrossel-3d-altura')) || 240;
          card.style.top = `${-cardH / 2}px`;
        });
      }

      updateCardGeometry();
      window.addEventListener('resize', updateCardGeometry);

      // Render loop
      let animId;
      function render() {
        if (!isDragging) {
          if (isHovered) {
            velocity *= 0.88; // Desaceleração suave ao pausar
          } else {
            // Suavizar retorno à velocidade de rotação padrão
            velocity += (targetVelocity - velocity) * 0.05;
          }
          rotation += velocity;
        }

        // Aplicar inclinação e rotação no palco 3D (mais inclinado no mobile para exibir a logo central)
        const activeInclinacao = window.innerWidth <= 640 ? -18 : inclinacaoBase;
        stage.style.transform = `rotateX(${activeInclinacao}deg) rotateY(${rotation}deg)`;

        // O centro planetário sempre compensa a rotação para encarar a câmera
        if (centroEl) {
          centroEl.style.transform = `translate(-50%, -50%) rotateY(${-rotation}deg) translateZ(0px)`;
          centroEl.style.zIndex = '50';
        }

        // Atualizar profundidade e ordenação dos cartões
        const step = 360 / totalCards;
        cards.forEach((card, i) => {
          const cardAngle = (card._angle + rotation) % 360;
          const rad = (cardAngle * Math.PI) / 180;
          // z vai de +radius (frente do planeta) a -radius (atrás do planeta)
          const z = Math.cos(rad) * radius;
          // Normalizar opacidade e escala para profundidade visual
          const depthNorm = (z + radius) / (2 * radius); // 0 (fundo) a 1 (frente)
          const scale = 0.82 + depthNorm * 0.22; // 0.82 a 1.04
          const opacity = 0.52 + depthNorm * 0.48; // 0.52 a 1.0

          card.style.transform = `rotateY(${card._angle}deg) translateZ(${radius}px) scale(${scale.toFixed(3)})`;
          card.style.opacity = opacity.toFixed(2);

          // Se o cartão está à frente do centro (z > 0), passa na frente do planeta (z-index > 50)
          // Se o cartão está atrás do centro (z < 0), passa atrás do planeta (z-index < 50)
          if (z >= 0) {
            card.style.zIndex = String(Math.round(55 + (z / radius) * 40));
          } else {
            card.style.zIndex = String(Math.round(10 + ((z + radius) / radius) * 35));
          }

          if (depthNorm > 0.8) {
            card.classList.add('is-front');
          } else {
            card.classList.remove('is-front');
          }
        });

        animId = requestAnimationFrame(render);
      }

      animId = requestAnimationFrame(render);

      // Interações de Mouse e Touch
      container.addEventListener('mouseenter', () => {
        isHovered = true;
      });

      container.addEventListener('mouseleave', () => {
        isHovered = false;
        targetVelocity = velocidadeBase * 0.28;
      });

      container.addEventListener('pointerdown', (e) => {
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        isDragging = true;
        startX = e.clientX;
        lastX = e.clientX;
        dragDistance = 0;
        lastTime = performance.now();
        dragVelocity = 0;
        targetVelocity = 0;
        container.setPointerCapture?.(e.pointerId);
      });

      window.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const currentX = e.clientX;
        const now = performance.now();
        const deltaX = currentX - lastX;
        const dt = Math.max(1, now - lastTime);

        rotation += deltaX * 0.35;
        dragDistance += Math.abs(deltaX);
        dragVelocity = (deltaX / dt) * 16; // normalizado para ~60fps

        lastX = currentX;
        lastTime = now;
      });

      function finishDrag(e) {
        if (!isDragging) return;
        isDragging = false;
        if (e && container.hasPointerCapture?.(e.pointerId)) {
          container.releasePointerCapture(e.pointerId);
        }

        // Inércia
        if (Math.abs(dragVelocity) > 0.2) {
          velocity = Math.max(-4, Math.min(4, dragVelocity * 0.45));
        } else {
          velocity = 0;
        }
      }

      window.addEventListener('pointerup', finishDrag);
      window.addEventListener('pointercancel', finishDrag);

      // Prevenir clique acidental durante arrasto
      cards.forEach((card) => {
        card.addEventListener(
          'click',
          (e) => {
            if (dragDistance > 8) {
              e.preventDefault();
              e.stopImmediatePropagation();
              return;
            }
            // Disparar evento de seleção para sincronizar com o projeto ativo
            const projKey = card.dataset.project;
            if (projKey && window.selectProject) {
              window.selectProject(projKey);
            }
          },
          true
        );
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarrossel3D);
  } else {
    initCarrossel3D();
  }

  window.initCarrossel3D = initCarrossel3D;
})();

