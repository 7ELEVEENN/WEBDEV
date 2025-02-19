// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Theme toggle functionality
function initTheme() {
    const html = document.documentElement;
    const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
        html.classList.add('dark');
    }

    // Theme toggle event listeners
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
        });
    });
}

// Carousel functionality
class Carousel {
    constructor(element) {
        this.carousel = element;
        this.slides = Array.from(element.querySelectorAll('.carousel-slide'));
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        this.isTransitioning = false;

        this.initCarousel();
    }

    initCarousel() {
        if (this.slides.length === 0) return;

        // Show first slide
        this.showSlide(0);
        
        // Add event listeners for controls
        const nextButton = this.carousel.querySelector('.carousel-next');
        const prevButton = this.carousel.querySelector('.carousel-prev');
        
        if (nextButton) {
            nextButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextSlide();
            });
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.prevSlide();
            });
        }
        
        // Start autoplay
        this.startAutoPlay();

        // Pause autoplay on hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    showSlide(index) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('opacity-100');
            slide.classList.add('opacity-0');
        });
        
        // Show selected slide
        setTimeout(() => {
            this.slides[index].classList.remove('opacity-0');
            this.slides[index].classList.add('opacity-100');
            this.currentSlide = index;
            this.isTransitioning = false;
        }, 500); // Match this with CSS transition duration
    }

    nextSlide() {
        if (this.isTransitioning) return;
        const next = (this.currentSlide + 1) % this.totalSlides;
        this.showSlide(next);
    }

    prevSlide() {
        if (this.isTransitioning) return;
        const prev = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(prev);
    }

    startAutoPlay() {
        if (this.autoPlayInterval) this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme first
    initTheme();

    // Initialize carousel
    const carouselElement = document.querySelector('.carousel');
    if (carouselElement) {
        new Carousel(carouselElement);
    }

    // Initialize animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    });

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
        observer.observe(element);
    });
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        document.documentElement.classList.toggle('dark', e.matches);
    }
}); 