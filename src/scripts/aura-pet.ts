import '../styles/aura-pet.css';
import '../styles/aura-pet-panel.css';

const STORAGE_KEY = 'aura-pet-position-v1';

function initAuraPet() {
  const root = document.querySelector<HTMLElement>('.aura');
  const pet = root?.querySelector<HTMLButtonElement>('.aura-orb');
  if (!root || !pet || root.dataset.petReady === 'true') return;
  root.dataset.petReady = 'true';

  let startX = 0;
  let startY = 0;
  let originX = 0;
  let originY = 0;
  let activePointer: number | null = null;
  let dragged = false;

  const clamp = (left: number, top: number) => ({
    left: Math.max(8, Math.min(left, window.innerWidth - pet.offsetWidth - 8)),
    top: Math.max(8, Math.min(top, window.innerHeight - pet.offsetHeight - 8)),
  });

  const place = (left: number, top: number) => {
    const point = clamp(left, top);
    root.style.left = `${point.left}px`;
    root.style.top = `${point.top}px`;
    root.style.right = 'auto';
    root.style.bottom = 'auto';
    root.classList.toggle('panel-left', point.left < window.innerWidth / 2);
    const panelBelow = point.top < window.innerHeight / 2;
    root.classList.toggle('panel-below', panelBelow);
    const availableHeight = panelBelow
      ? window.innerHeight - point.top - pet.offsetHeight - 28
      : point.top - 28;
    root.style.setProperty('--aura-panel-height', `${Math.max(240, availableHeight)}px`);
    return point;
  };

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved && Number.isFinite(saved.left) && Number.isFinite(saved.top)) place(saved.left, saved.top);
  } catch {}

  pet.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    const rect = root.getBoundingClientRect();
    startX = event.clientX;
    startY = event.clientY;
    originX = rect.left;
    originY = rect.top;
    activePointer = event.pointerId;
    dragged = false;
    pet.setPointerCapture(event.pointerId);
  });

  pet.addEventListener('pointermove', event => {
    if (activePointer !== event.pointerId) return;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    if (!dragged && Math.hypot(dx, dy) < 5) return;
    dragged = true;
    root.classList.add('is-dragging');
    place(originX + dx, originY + dy);
  });

  const finishDrag = (event: PointerEvent) => {
    if (activePointer !== event.pointerId) return;
    activePointer = null;
    root.classList.remove('is-dragging');
    if (pet.hasPointerCapture(event.pointerId)) pet.releasePointerCapture(event.pointerId);
    if (dragged) {
      const rect = root.getBoundingClientRect();
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ left: rect.left, top: rect.top }));
    }
  };

  pet.addEventListener('pointerup', finishDrag);
  pet.addEventListener('pointercancel', finishDrag);
  pet.addEventListener('click', event => {
    const rect = root.getBoundingClientRect();
    root.classList.toggle('panel-left', rect.left < window.innerWidth / 2);
    root.classList.toggle('panel-below', rect.top < window.innerHeight / 2);
    if (dragged) {
      event.preventDefault();
      event.stopImmediatePropagation();
      dragged = false;
    }
  }, true);

  window.addEventListener('resize', () => {
    const rect = root.getBoundingClientRect();
    if (root.style.left) place(rect.left, rect.top);
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAuraPet);
else initAuraPet();
