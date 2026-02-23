// Parallax Scroll Engine — Multi-layer depth effect
document.addEventListener('DOMContentLoaded', () => {
    // Parallax elements with data-parallax attribute
    const parallaxEls = document.querySelectorAll('[data-parallax]');

    // Throttle scroll for performance
    let ticking = false;

    function updateParallax() {
        const scrollY = window.scrollY;
        const viewH = window.innerHeight;

        parallaxEls.forEach(el => {
            const speed = parseFloat(el.dataset.parallax || '0.1');
            const rect = el.getBoundingClientRect();
            const elCenter = rect.top + rect.height / 2;
            const offset = (elCenter - viewH / 2) * speed;

            el.style.transform = `translate3d(0, ${offset}px, 0)`;
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });

    // Initial call
    updateParallax();
});

// 3D perspective scroll — card depth on scroll
document.addEventListener('DOMContentLoaded', () => {
    const depthCards = document.querySelectorAll('[data-depth]');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const ratio = entry.intersectionRatio;
                    const el = entry.target;
                    const intensity = parseFloat(el.dataset.depth || '1');

                    // Scale and rotate based on visibility
                    const scale = 0.92 + (ratio * 0.08);
                    const rotateX = (1 - ratio) * 4 * intensity;
                    const opacity = 0.4 + (ratio * 0.6);

                    el.style.transform = `perspective(1200px) scale(${scale}) rotateX(${rotateX}deg)`;
                    el.style.opacity = `${opacity}`;
                }
            });
        },
        {
            threshold: Array.from({ length: 20 }, (_, i) => i / 20),
            rootMargin: '0px'
        }
    );

    depthCards.forEach(el => {
        el.style.transition = 'transform 0.15s ease-out, opacity 0.15s ease-out';
        el.style.willChange = 'transform, opacity';
        observer.observe(el);
    });
});
