import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initProgressBar() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress-bar';
  document.body.appendChild(bar);

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      bar.style.transform = `scaleX(${self.progress})`;
    },
  });
}

function initReveal() {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (reducedMotion) {
    elements.forEach((element) => element.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });

  elements.forEach((element) => observer.observe(element));
}

function initCounters() {
  document.querySelectorAll<HTMLElement>('.stat-num').forEach((element) => {
    const original = element.textContent?.trim() ?? '';
    const match = original.match(/([\d.]+)/);
    if (!match) return;

    const value = Number.parseFloat(match[1]);
    const decimal = match[1].includes('.');
    const prefix = original.slice(0, match.index ?? 0);
    const suffix = original.slice((match.index ?? 0) + match[1].length);
    const state = { value: 0 };

    gsap.to(state, {
      value,
      duration: 1.2,
      ease: 'power2.out',
      onUpdate() {
        element.textContent = `${prefix}${decimal ? state.value.toFixed(1) : Math.round(state.value)}${suffix}`;
      },
      scrollTrigger: { trigger: element, start: 'top 90%', once: true },
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initProgressBar();
  initReveal();
  if (!reducedMotion) initCounters();
  ScrollTrigger.refresh();
});