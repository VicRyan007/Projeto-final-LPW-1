document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel();
    initializeScrollAnimation();
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

function handleMobileMenu() {
    const navButtons = document.querySelector('.nav-buttons');
    if (window.innerWidth <= 768) {
        navButtons.classList.add('mobile-menu');
    } else {
        navButtons.classList.remove('mobile-menu');
    }
}

window.addEventListener('resize', handleMobileMenu);
handleMobileMenu(); 