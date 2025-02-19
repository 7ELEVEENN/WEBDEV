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

// Carousel functionality
class Carousel {
    constructor(element) {
        this.carousel = element;
        this.slides = element.querySelectorAll('.carousel-slide');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;

        // Initialize carousel
        this.initCarousel();
    }

    initCarousel() {
        // Show first slide
        this.showSlide(0);
        
        // Add event listeners for controls
        document.querySelector('.carousel-next').addEventListener('click', () => this.nextSlide());
        document.querySelector('.carousel-prev').addEventListener('click', () => this.prevSlide());
        
        // Start autoplay
        this.startAutoPlay();
    }

    showSlide(index) {
        this.slides.forEach(slide => {
            slide.classList.add('opacity-0');
            slide.classList.remove('opacity-100');
        });
        
        this.slides[index].classList.remove('opacity-0');
        this.slides[index].classList.add('opacity-100');
        this.currentSlide = index;
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.totalSlides;
        this.showSlide(next);
    }

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(prev);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        new Carousel(carousel);
    }

    // Add animation classes to elements when they become visible
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