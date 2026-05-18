// Parallax Scroll Engine v2 — Smooth lerp, depth tilt, GPU-accelerated
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const isMobile = () => window.innerWidth < 768;
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

  // Wait for reveal animation before applying parallax to .reveal elements
  const isReady = el =>
    !el.classList.contains('reveal') || el.classList.contains('revealed');

  let viewH = window.innerHeight;
  window.addEventListener('resize', () => { viewH = window.innerHeight; }, { passive: true });

  // ── Layer parallax  (data-parallax="speed") ──────────────────────────────
  // Negative speed  → element drifts UP as you scroll down (floats away faster)
  // Positive speed  → element drifts DOWN (lags behind the scroll)
  const layers = [...document.querySelectorAll('[data-parallax]')].map(el => {
    el.style.willChange = 'transform';
    return { el, speed: parseFloat(el.dataset.parallax || '0.1'), y: 0, targetY: 0 };
  });

  // ── Depth cards  (data-depth="intensity") ────────────────────────────────
  // Cards tilt on the X axis + scale up + fade in as they enter the viewport
  const cards = [...document.querySelectorAll('[data-depth]')].map(el => {
    el.style.willChange = 'transform, opacity';
    const init = { scale: 0.94, rotX: 6, opacity: 0.4 };
    return {
      el,
      intensity: parseFloat(el.dataset.depth || '1'),
      scale:   init.scale,   targetScale:   init.scale,
      rotX:    init.rotX,    targetRotX:    init.rotX,
      opacity: init.opacity, targetOpacity: init.opacity,
    };
  });

  // ── Read scroll state → compute targets ──────────────────────────────────
  function readTargets() {
    layers.forEach(item => {
      if (isMobile() || !isReady(item.el)) return;
      const rect = item.el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      item.targetY = (elCenter - viewH / 2) * item.speed;
    });

    cards.forEach(item => {
      if (isMobile() || !isReady(item.el)) return;
      const rect  = item.el.getBoundingClientRect();
      const progress = clamp(1 - rect.top / viewH, 0, 1);
      const k = item.intensity;
      item.targetScale   = clamp(0.93 + progress * 0.07 * k, 0.93, 1);
      item.targetRotX    = clamp((1 - progress) * 7 * k,     0, 7 * k);
      item.targetOpacity = clamp(0.35 + progress * 0.65,     0.35, 1);
    });
  }

  // ── RAF loop — runs until values settle ──────────────────────────────────
  let rafId = null;

  function tick() {
    let settled = true;

    layers.forEach(item => {
      if (isMobile() || !isReady(item.el)) return;
      item.y = lerp(item.y, item.targetY, 0.09);
      if (Math.abs(item.y - item.targetY) > 0.05) settled = false;
      item.el.style.transform = `translate3d(0, ${item.y.toFixed(2)}px, 0)`;
    });

    cards.forEach(item => {
      if (isMobile() || !isReady(item.el)) return;
      item.scale   = lerp(item.scale,   item.targetScale,   0.1);
      item.rotX    = lerp(item.rotX,    item.targetRotX,    0.1);
      item.opacity = lerp(item.opacity, item.targetOpacity, 0.1);
      if (Math.abs(item.scale - item.targetScale) > 0.001) settled = false;
      item.el.style.transform =
        `perspective(1000px) rotateX(${item.rotX.toFixed(2)}deg) scale(${item.scale.toFixed(4)})`;
      item.el.style.opacity = item.opacity.toFixed(3);
    });

    rafId = settled ? null : requestAnimationFrame(tick);
  }

  function onScroll() {
    readTargets();
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  // Re-check depth cards when reveal animations fire (they become ready)
  document.addEventListener('transitionend', e => {
    if (e.target.classList?.contains('reveal')) {
      readTargets();
      if (!rafId) rafId = requestAnimationFrame(tick);
    }
  });

  window.addEventListener('scroll', onScroll, { passive: true });

  // Boot
  readTargets();
  rafId = requestAnimationFrame(tick);
})();
