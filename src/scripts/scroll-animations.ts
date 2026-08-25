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

type MotionOptions = {
  x?: number;
  y?: number;
  start?: string;
  delay?: number;
  onShown?: (element: HTMLElement) => void;
};

function revealElements(selector: string, options: MotionOptions = {}) {
  const targets = gsap.utils.toArray<HTMLElement>(selector);
  const { x = 0, y = 26, start = 'top 84%', delay = 0, onShown } = options;

  targets.forEach((target, index) => {
    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      gsap.to(target, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration: 0.58,
        delay: delay * index,
        ease: 'power3.out',
        overwrite: 'auto',
        clearProps: 'willChange',
        onComplete: () => onShown?.(target),
      });
    };

    gsap.set(target, { autoAlpha: 0, x, y, willChange: 'transform,opacity' });
    ScrollTrigger.create({
      trigger: target,
      start,
      once: true,
      onEnter: show,
      // Prevents a fast scroll, browser restore, or refresh from leaving content hidden.
      onRefresh: (trigger) => {
        if (trigger.progress > 0 || window.scrollY > trigger.start) show();
      },
    });
  });
}

function initSectionMotion() {
  if (reducedMotion) return;

  // A restrained parallax makes the portrait feel responsive to the reader's movement.
  const portrait = document.querySelector<HTMLElement>('.hero-photo-outer');
  if (portrait) {
    gsap.to(portrait, {
      y: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    });
  }

  // Project cards retain their own hover and grid transforms; animate only their media.
  revealElements('.deck-card .dc-right img', { y: 18, start: 'top 88%', delay: 0.04 });

  // Experience is a timeline: each role arrives first, then its rail draws in.
  revealElements('.dossier', {
    y: 36,
    start: 'top 83%',
    delay: 0.06,
    onShown: (dossier) => {
      const rail = dossier.querySelector<HTMLElement>('.rail-line');
      if (rail) {
        gsap.fromTo(rail, { scaleY: 0, transformOrigin: 'top center' }, {
          scaleY: 1,
          duration: 0.45,
          ease: 'power2.out',
        });
      }
    },
  });

  // Arsenal is an inventory: show the category, then let its tools scan into view.
  revealElements('.sk-col', {
    y: 22,
    start: 'top 84%',
    delay: 0.08,
    onShown: (column) => {
      gsap.from(column.querySelectorAll('.sk-list li'), {
        autoAlpha: 0,
        x: -10,
        duration: 0.28,
        ease: 'power2.out',
        stagger: 0.04,
      });
    },
  });

  // Belief reads as a progressive set of decisions.
  revealElements('.principle', { x: -20, y: 0, start: 'top 86%', delay: 0.055 });

  // Contact is the final assembled action.
  revealElements('.contact-left', { x: -30, y: 0, start: 'top 84%' });
  revealElements('.contact-right', { x: 30, y: 0, start: 'top 84%' });
}

document.addEventListener('DOMContentLoaded', () => {
  initProgressBar();
  initReveal();

  if (!reducedMotion) {
    initCounters();
    initSectionMotion();
  }

  ScrollTrigger.refresh();
});
