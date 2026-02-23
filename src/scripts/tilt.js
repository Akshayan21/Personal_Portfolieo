// 3D Tilt Effect on hover
document.addEventListener('DOMContentLoaded', () => {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach((el) => {
        const intensity = parseFloat(el.dataset.tiltIntensity || '10');

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -intensity;
            const rotateY = ((x - centerX) / centerX) * intensity;

            el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            el.style.transition = 'transform 0.1s ease';
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            el.style.transition = 'transform 0.5s ease';
        });
    });
});
