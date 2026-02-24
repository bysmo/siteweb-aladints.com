// ===================================
// Initialize AOS (Animate On Scroll)
// ===================================
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

// ===================================
// Navigation Bar Scroll Effect
// ===================================
const navbar = document.getElementById('navbar');
const scrollTopButton = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    // Add scrolled class to navbar (hide top bar when scrolling)
    if (window.scrollY > 56) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide scroll to top button
    if (window.scrollY > 500) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
});

// ===================================
// Hero Carousel Functionality
// ===================================
let currentHeroSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
const heroIndicators = document.querySelectorAll('.hero-indicator');
const totalHeroSlides = heroSlides.length;

function showHeroSlide(index) {
    // Remove active class from all slides and indicators
    heroSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    heroIndicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Add active class to current slide and indicator
    if (heroSlides[index]) {
        heroSlides[index].classList.add('active');
    }
    if (heroIndicators[index]) {
        heroIndicators[index].classList.add('active');
    }
}

function nextHeroSlide() {
    currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
    showHeroSlide(currentHeroSlide);
}

function prevHeroSlide() {
    currentHeroSlide = (currentHeroSlide - 1 + totalHeroSlides) % totalHeroSlides;
    showHeroSlide(currentHeroSlide);
}

// Event listeners for hero carousel buttons
const heroNextBtn = document.getElementById('heroNext');
const heroPrevBtn = document.getElementById('heroPrev');

if (heroNextBtn && heroPrevBtn) {
    heroNextBtn.addEventListener('click', () => {
        nextHeroSlide();
        clearInterval(heroCarouselInterval);
        heroCarouselInterval = setInterval(nextHeroSlide, 6000);
    });
    
    heroPrevBtn.addEventListener('click', () => {
        prevHeroSlide();
        clearInterval(heroCarouselInterval);
        heroCarouselInterval = setInterval(nextHeroSlide, 6000);
    });
}

// Event listeners for hero indicators
heroIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentHeroSlide = index;
        showHeroSlide(currentHeroSlide);
        clearInterval(heroCarouselInterval);
        heroCarouselInterval = setInterval(nextHeroSlide, 6000);
    });
});

// Auto-play hero carousel every 6 seconds
let heroCarouselInterval = setInterval(nextHeroSlide, 6000);

// Pause auto-play on hover
const heroCarousel = document.querySelector('.hero-carousel');
if (heroCarousel) {
    heroCarousel.addEventListener('mouseenter', () => {
        clearInterval(heroCarouselInterval);
    });
    
    heroCarousel.addEventListener('mouseleave', () => {
        heroCarouselInterval = setInterval(nextHeroSlide, 6000);
    });
}

// Keyboard navigation for hero carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevHeroSlide();
        clearInterval(heroCarouselInterval);
        heroCarouselInterval = setInterval(nextHeroSlide, 6000);
    } else if (e.key === 'ArrowRight') {
        nextHeroSlide();
        clearInterval(heroCarouselInterval);
        heroCarouselInterval = setInterval(nextHeroSlide, 6000);
    }
});

// ===================================
// Mobile Navigation Toggle
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===================================
// Smooth Scroll to Top
// ===================================
scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Contact Form Submission
// ===================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value,
        date: new Date().toISOString()
    };
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitButton.disabled = true;
    
    try {
        // Here you can add your form submission logic
        // For now, we'll simulate a successful submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        showNotification('Message envoyé avec succès! Nous vous contacterons bientôt.', 'success');
        
        // Reset form
        contactForm.reset();
    } catch (error) {
        // Show error message
        showNotification('Une erreur s\'est produite. Veuillez réessayer.', 'error');
    } finally {
        // Restore button state
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    }
});

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        padding: 20px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 16px;
        min-width: 300px;
        max-width: 500px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
    }
    
    .notification-content i {
        font-size: 24px;
    }
    
    .notification-content span {
        font-size: 15px;
        font-weight: 500;
    }
    
    .notification-close {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.1);
    }
    
    @media (max-width: 768px) {
        .notification {
            top: 80px !important;
            right: 20px !important;
            left: 20px !important;
            min-width: auto !important;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Parallax Effect for Hero Section
// ===================================
const heroShapes = document.querySelectorAll('.hero-shapes .shape');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroHeight = document.querySelector('.hero').offsetHeight;
    
    if (scrolled < heroHeight) {
        heroShapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = scrolled * speed;
            shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    }
});

// ===================================
// Number Counter Animation
// ===================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counter animation when hero stats are in view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
        }
    });
}, observerOptions);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===================================
// Lazy Loading for Images
// ===================================
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ===================================
// Form Validation Enhancement
// ===================================
const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateInput(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateInput(input);
        }
    });
});

function validateInput(input) {
    const value = input.value.trim();
    
    // Remove previous error
    input.classList.remove('error');
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    let isValid = true;
    let errorMessage = '';
    
    // Check if required field is empty
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Ce champ est requis';
    }
    
    // Validate email
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Adresse email invalide';
        }
    }
    
    // Validate phone
    if (input.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 8) {
            isValid = false;
            errorMessage = 'Numéro de téléphone invalide';
        }
    }
    
    if (!isValid) {
        input.classList.add('error');
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        errorElement.style.cssText = `
            color: #EF4444;
            font-size: 13px;
            margin-top: 4px;
            display: block;
        `;
        input.parentElement.appendChild(errorElement);
    }
    
    return isValid;
}

// Add error styling
const errorStyle = document.createElement('style');
errorStyle.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #EF4444 !important;
    }
`;
document.head.appendChild(errorStyle);

// ===================================
// Prevent Form Submission if Invalid
// ===================================
contactForm.addEventListener('submit', (e) => {
    let isFormValid = true;
    
    formInputs.forEach(input => {
        if (!validateInput(input)) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        e.preventDefault();
        showNotification('Veuillez corriger les erreurs dans le formulaire', 'error');
    }
});

// ===================================
// Add Loading Animation
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===================================
// Log Initialization
// ===================================
console.log('%c🚀 ALTES Website Loaded Successfully', 'color: #2563EB; font-size: 16px; font-weight: bold;');
console.log('%c✨ Aladin Technologies Solutions - Innovation for Africa', 'color: #FCD34D; font-size: 14px;');