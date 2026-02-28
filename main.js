// Carousel Logic
const slides = document.querySelectorAll('.carousel-slide');
let currentSlide = 0;

function nextSlide() {
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

if (slides.length > 0) {
    setInterval(nextSlide, 5000); // 5 seconds interval
}

// Header scroll effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for Scroll Reveal
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

// Testimonials Carousel Logic
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.testimonials-carousel .dot');
const prevBtn = document.querySelector('.nav-btn.prev');
const nextBtn = document.querySelector('.nav-btn.next');
let currentTestimonial = 0;

function updateTestimonials(index) {
    if (testimonialSlides.length === 0) return;

    testimonialSlides[currentTestimonial].classList.remove('active');
    testimonialDots[currentTestimonial].classList.remove('active');

    currentTestimonial = index;

    if (currentTestimonial < 0) currentTestimonial = testimonialSlides.length - 1;
    if (currentTestimonial >= testimonialSlides.length) currentTestimonial = 0;

    testimonialSlides[currentTestimonial].classList.add('active');
    testimonialDots[currentTestimonial].classList.add('active');
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => updateTestimonials(currentTestimonial - 1));
    nextBtn.addEventListener('click', () => updateTestimonials(currentTestimonial + 1));
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => updateTestimonials(index));
});

// Auto-play testimonials
setInterval(() => {
    updateTestimonials(currentTestimonial + 1);
}, 8000);
