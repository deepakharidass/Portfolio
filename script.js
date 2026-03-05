// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const subject = document.getElementById('subject')?.value;
        const message = document.getElementById('message')?.value;

        // Validate form
        if (!name || !email || !subject || !message) {
            showAlert('Please fill out all required fields', 'error');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }

        // Here you would typically send the form data to a backend service
        // For now, we'll just show a success message
        showAlert('Thank you for your message! I\'ll get back to you soon.', 'success');

        // Reset form
        contactForm.reset();
    });
}

// Show Alert Function
function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        z-index: 2000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        animation: slideInDown 0.3s ease;
    `;

    document.body.appendChild(alert);

    setTimeout(() => {
        alert.style.animation = 'slideInUp 0.3s ease reverse';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// Scroll to Top Button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #ec4899);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    display: none;
    z-index: 999;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.display = 'flex';
        scrollTopBtn.style.alignItems = 'center';
        scrollTopBtn.style.justifyContent = 'center';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Active Navigation Link on Current Page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

setActiveNavLink();

// Add active class style if not already in stylesheet
const style = document.createElement('style');
style.textContent = `
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Intersection Observer for Animations on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and items
document.querySelectorAll('.project-card, .skill-category, .stat, .education-card, .certification-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Keyboard Navigation for Accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

// Smooth Scroll Behavior (Fallback for older browsers)
if (!('scrollBehavior' in document.documentElement.style)) {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Add Loading State to Form Button
const submitBtn = document.querySelector('.contact-form .btn');
if (submitBtn) {
    contactForm.addEventListener('submit', function() {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

console.log('Portfolio website loaded successfully!');
