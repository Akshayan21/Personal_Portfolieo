import '../styles/aura-comic.css';

function initAuraReactions() {
  const root = document.querySelector<HTMLElement>('.aura');
  const pet = root?.querySelector<HTMLElement>('.aura-character');
  if (!root || !pet || root.dataset.reactiveReady === 'true') return;
  root.dataset.reactiveReady = 'true';

  let frame = 0;
  let lastScroll = window.scrollY;
  let scrollTimer = 0;

  const updateGaze = (clientX: number, clientY: number) => {
    const rect = pet.getBoundingClientRect();
    const x = clientX - (rect.left + rect.width / 2);
    const y = clientY - (rect.top + rect.height / 2);
    const length = Math.max(1, Math.hypot(x, y));
    const strength = Math.min(3, length / 90);
    root.style.setProperty('--gaze-x', `${(x / length) * strength}px`);
    root.style.setProperty('--gaze-y', `${(y / length) * strength}px`);
  };

  window.addEventListener('pointermove', event => {
    if (root.classList.contains('is-dragging')) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => updateGaze(event.clientX, event.clientY));
  }, { passive: true });

  window.addEventListener('pointerleave', () => {
    root.style.setProperty('--gaze-x', '0px');
    root.style.setProperty('--gaze-y', '0px');
  });

  window.addEventListener('scroll', () => {
    const nextScroll = window.scrollY;
    root.classList.toggle('scroll-down', nextScroll > lastScroll);
    root.classList.toggle('scroll-up', nextScroll < lastScroll);
    lastScroll = nextScroll;
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => {
      root.classList.remove('scroll-down', 'scroll-up');
    }, 160);
  }, { passive: true });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAuraReactions);
else initAuraReactions();
