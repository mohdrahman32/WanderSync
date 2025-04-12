// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-out-quad',
    once: true
});

// Welcome Animation (Netflix-style letter-by-letter reveal)
document.addEventListener('DOMContentLoaded', () => {
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const welcomeText = document.getElementById('welcome-text');
    const text = 'WanderSync';
    let html = '';

    // Split text into individual letters and add spans
    for (let i = 0; i < text.length; i++) {
        html += `<span class="welcome-letter" style="animation-delay: ${i * 0.1}s">${text[i]}</span>`;
    }
    welcomeText.innerHTML = html;

    // Trigger fade-out after all letters are visible (delay based on total animation time)
    setTimeout(() => {
        welcomeOverlay.classList.add('fade-out');
        setTimeout(() => {
            welcomeOverlay.style.display = 'none';
        }, 1500); // Match the 1.5s fade-out duration
    }, text.length * 100 + 1000); // Total delay: 1s initial + 0.1s per letter

    // Hero Section Animation (without GSAP)
    const headline = document.getElementById('hero-headline');
    const heroParagraph = document.querySelector('.hero-overlay p');
    const heroLink = document.querySelector('.hero-overlay a');

    setTimeout(() => {
        headline.style.opacity = '1';
        headline.style.transform = 'translateY(0)';
    }, 1500);

    setTimeout(() => {
        heroParagraph.style.opacity = '1';
        heroParagraph.style.transform = 'translateY(0)';
    }, 1800);

    setTimeout(() => {
        heroLink.style.opacity = '1';
        heroLink.style.transform = 'scale(1)';
    }, 2100);

    // Header Logo Animation (without GSAP)
    const headerLogo = document.querySelector('header h1');
    const headerSubtext = document.querySelector('header p');

    setTimeout(() => {
        headerLogo.style.opacity = '1';
        headerLogo.style.transform = 'translateX(0)';
    }, 1500);

    setTimeout(() => {
        headerSubtext.style.opacity = '1';
        headerSubtext.style.transform = 'translateX(0)';
    }, 1700);

    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        if (navMenu.classList.contains('active')) {
            let delay = 0;
            navMenu.querySelectorAll('li').forEach(item => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, delay);
                delay += 100;
            });
        } else {
            let delay = 0;
            navMenu.querySelectorAll('li').forEach(item => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-20px)';
                }, delay);
                delay += 50;
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
            loadingOverlay.style.opacity = '1';

            setTimeout(() => {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                    window.location.href = href;
                }, 500);
            }, 3000);
        });
    });
});