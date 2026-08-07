import '../styles/aura-character.css';
import '../styles/aura-comic-v2.css';

const STORAGE_KEY = 'aura-pet-position-v1';

function initOpenAuraDrag() {
  const root = document.querySelector<HTMLElement>('.aura');
  const pet = root?.querySelector<HTMLElement>('.aura-orb');
  const handle = root?.querySelector<HTMLElement>('.aura-panel > header');
  if (!root || !pet || !handle || root.dataset.panelDragReady === 'true') return;
  root.dataset.panelDragReady = 'true';

  let pointerId: number | null = null;
  let startX = 0;
  let startY = 0;
  let originX = 0;
  let originY = 0;

  const place = (left: number, top: number) => {
    const clampedLeft = Math.max(8, Math.min(left, window.innerWidth - pet.offsetWidth - 8));
    const clampedTop = Math.max(8, Math.min(top, window.innerHeight - pet.offsetHeight - 8));
    root.style.left = `${clampedLeft}px`;
    root.style.top = `${clampedTop}px`;
    root.style.right = 'auto';
    root.style.bottom = 'auto';
    root.classList.toggle('panel-left', clampedLeft < window.innerWidth / 2);
    root.classList.toggle('panel-below', clampedTop < window.innerHeight / 2);
  };

  handle.addEventListener('pointerdown', event => {
    if (event.button !== 0 || (event.target as HTMLElement).closest('.aura-close')) return;
    const rect = root.getBoundingClientRect();
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    originX = rect.left;
    originY = rect.top;
    handle.setPointerCapture(event.pointerId);
    root.classList.add('is-dragging-panel');
    event.preventDefault();
  });

  handle.addEventListener('pointermove', event => {
    if (event.pointerId !== pointerId) return;
    place(originX + event.clientX - startX, originY + event.clientY - startY);
  });

  const finish = (event: PointerEvent) => {
    if (event.pointerId !== pointerId) return;
    pointerId = null;
    root.classList.remove('is-dragging-panel');
    if (handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId);
    const rect = root.getBoundingClientRect();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ left: rect.left, top: rect.top }));
  };

  handle.addEventListener('pointerup', finish);
  handle.addEventListener('pointercancel', finish);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initOpenAuraDrag);
else initOpenAuraDrag();
