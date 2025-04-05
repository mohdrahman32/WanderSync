// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-out-quad',
    once: true
});

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    // Header animations
    gsap.from('header h1', { x: -100, opacity: 0, duration: 1, ease: 'power2.out' });
    gsap.from('header p', { x: 100, opacity: 0, duration: 1, delay: 0.2, ease: 'power2.out' });

    // Hero section animations
    gsap.to('.hero-content', { opacity: 1, duration: 0.5, ease: 'power2.out' }); // Ensure content is visible
    gsap.from('.hero-content h2', { y: -50, opacity: 0, duration: 1, delay: 0.2, ease: 'power2.out' });
    gsap.from('.hero-content p', { y: 20, opacity: 0, duration: 1, delay: 0.4, ease: 'power2.out' });
    gsap.from('.hero-content a', { scale: 0.8, opacity: 0, duration: 0.8, delay: 0.6, ease: 'back.out(1.7)' });

    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            gsap.fromTo('.nav-menu ul li', 
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
            );
        }
    });
});