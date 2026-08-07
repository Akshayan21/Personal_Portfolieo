const confidentialCards = document.querySelectorAll<HTMLElement>('[data-confidential="true"]');
const toast = document.getElementById('confidential-toast');
let toastTimer: ReturnType<typeof setTimeout> | undefined;

const revealClassifiedMessage = () => {
  if (!toast) return;
  toast.textContent = 'CLASSIFIED: This project is still under lock and key. Nice try.';
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3600);
};

confidentialCards.forEach((card) => {
  card.addEventListener('click', (event) => { event.preventDefault(); revealClassifiedMessage(); });
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      revealClassifiedMessage();
    }
  });
});
