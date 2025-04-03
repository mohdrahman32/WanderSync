// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-out-quad',
    once: true
});

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    // Welcome Fade Effect
    const welcomeOverlay = document.getElementById('welcome-overlay');
    gsap.to(welcomeOverlay, {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.in',
        delay: 1,
        onComplete: () => {
            welcomeOverlay.style.display = 'none';
        }
    });

    // Hero Section Animation
    gsap.from('#hero-headline', {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 1.5
    });
    gsap.from('.hero-overlay p', {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 1.8,
        ease: 'power2.out'
    });
    gsap.from('.hero-overlay a', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: 2.1,
        ease: 'back.out(1.7)'
    });

    // Header Logo Animation
    gsap.from('header h1', {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 1.5
    });
    gsap.from('header p', {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 1.7,
        ease: 'power2.out'
    });

    // Hamburger Menu Toggle
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
        } else {
            gsap.to('.nav-menu ul li', {
                y: -20,
                opacity: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: 'power2.in'
            });
        }
    });

    // Loading Circle for Navigation Links
    const loadingOverlay = document.getElementById('loading-overlay');
    const navigationLinks = document.querySelectorAll('.navigation-link');
    navigationLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');

            loadingOverlay.style.display = 'flex';
            gsap.fromTo(loadingOverlay, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.5, ease: 'power2.out' }
            );

            setTimeout(() => {
                gsap.to(loadingOverlay, {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.in',
                    onComplete: () => {
                        loadingOverlay.style.display = 'none';
                        window.location.href = href;
                    }
                });
            }, 3000);
        });
    });
});