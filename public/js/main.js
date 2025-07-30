document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel();
    initializeScrollAnimation();
    initializeMobileMenu();
});

function initializeCarousel() {
    const carousel = document.querySelector('.carousel-list');
    if (!carousel) return;

    let currentSlide = 0;
    const slides = carousel.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    function updateCarousel() {
        const offset = -currentSlide * 100;
        carousel.style.transform = `translateX(${offset}%)`;
    }

    setInterval(nextSlide, 5000);
}

function initializeScrollAnimation() {
    const cards = document.querySelectorAll('.info-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navButtons = document.getElementById('nav-buttons');
    const menuOverlay = document.getElementById('menu-overlay');

    if (!hamburger || !navButtons || !menuOverlay) return;

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navButtons.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = navButtons.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navButtons.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // Fechar menu ao clicar em um link
    const navLinks = navButtons.querySelectorAll('.nav-button');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Fechar menu ao redimensionar a tela para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
} 