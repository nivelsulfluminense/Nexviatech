/**
 * Motion Design & Micro-interações Premium — Nexvia Tech
 * 
 * - Ambient Spotlight que segue o cursor e ilumina as bordas de vidro
 * - Reflexo especular dinâmico em cards translúcidos (glare shift)
 * - Contadores numéricos animados com easing cúbico
 * - Revelação coreografada na rolagem (IntersectionObserver)
 * - Micro-movimento magnético nos botões principais
 * - Anéis de telemetria orbital
 */

(function initMotionDesign() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Ambient Spotlight dinâmico que segue o ponteiro
  let spotlight = document.querySelector(".ambient-spotlight");
  if (!spotlight) {
    spotlight = document.createElement("div");
    spotlight.className = "ambient-spotlight";
    spotlight.setAttribute("aria-hidden", "true");
    document.body.appendChild(spotlight);
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let spotX = mouseX;
  let spotY = mouseY;
  let isMoving = false;

  window.addEventListener("pointermove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isMoving) {
      isMoving = true;
      requestAnimationFrame(updateSpotlight);
    }
  }, { passive: true });

  function updateSpotlight() {
    spotX += (mouseX - spotX) * 0.12;
    spotY += (mouseY - spotY) * 0.12;
    spotlight.style.transform = `translate(${spotX.toFixed(1)}px, ${spotY.toFixed(1)}px)`;

    if (Math.abs(mouseX - spotX) > 0.5 || Math.abs(mouseY - spotY) > 0.5) {
      requestAnimationFrame(updateSpotlight);
    } else {
      isMoving = false;
    }
  }

  // 2. Reflexo Especular Dinâmico (Glare) nos Cards de Vidro
  if (!isReduced) {
    const glassCards = document.querySelectorAll(
      ".prism-slab, .cap-face, .moon-card, .project-tab, .project-inspector, .metric-card"
    );

    glassCards.forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--glare-x", `${x.toFixed(1)}%`);
        card.style.setProperty("--glare-y", `${y.toFixed(1)}%`);
      }, { passive: true });

      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--glare-x", "30%");
        card.style.setProperty("--glare-y", "20%");
      }, { passive: true });
    });
  }

  // 3. Contadores Numéricos Animados (Stats)
  const counterElements = document.querySelectorAll("[data-count-target]");
  if (counterElements.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });

    counterElements.forEach((el) => observer.observe(el));
  }

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute("data-count-target") || "0");
    const decimals = parseInt(el.getAttribute("data-count-decimals") || "0", 10);
    const suffix = el.getAttribute("data-count-suffix") || "";
    const duration = 1800;
    const start = performance.now();

    function frame(now) {
      const elapsed = Math.min(now - start, duration);
      const progress = elapsed / duration;
      // Easing cúbico out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = current.toFixed(decimals) + suffix;

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = target.toFixed(decimals) + suffix;
      }
    }
    requestAnimationFrame(frame);
  }

  // 4. Revelação Coreografada de Elementos (Motion Reveal)
  if (!isReduced) {
    const revealTargets = document.querySelectorAll(
      ".hero-prismatic-grid, .capabilities-strip, .metrics-strip, .portfolio-header, .portfolio-workbench, .scrubber-lab, .closing-cta-box"
    );

    revealTargets.forEach((target) => {
      target.classList.add("motion-reveal");
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in-view");
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });

    revealTargets.forEach((el) => revealObserver.observe(el));
  }

  // 5. Micro-Movimento Magnético em Botões de Ação
  if (!isReduced && window.matchMedia("(hover: hover)").matches) {
    const magneticButtons = document.querySelectorAll(".btn, .btn-secondary");
    magneticButtons.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }
})();
