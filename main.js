/* ===========================
   MAIN JAVASCRIPT
   =========================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize smooth scrolling
    initSmoothScroll();

    // Mobile menu toggle
    initMobileMenu();

    // Animate elements on scroll
    observeElements();
});

/* ===========================
   SMOOTH SCROLLING
   =========================== */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ===========================
   INTERSECTION OBSERVER
   =========================== */

function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all service cards, features, and pricing cards
    document.querySelectorAll(
        '.service-card, .feature, .pricing-card, .service-detail'
    ).forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

/* ===========================
   MOBILE MENU
   =========================== */

function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');

    // Add mobile menu button if it doesn't exist
    if (!document.querySelector('.mobile-menu-btn')) {
        const mobileBtn = document.createElement('button');
        mobileBtn.className = 'mobile-menu-btn';
        mobileBtn.innerHTML = '☰';
        navbar.querySelector('.container').appendChild(mobileBtn);

        mobileBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileBtn.classList.toggle('active');
        });

        // Close menu when link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileBtn.classList.remove('active');
            });
        });
    }
}

/* ===========================
   SCROLL ANIMATIONS
   =========================== */

const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }

    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }

    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--primary-color);
        }

        .mobile-menu-btn.active {
            color: var(--primary-dark);
        }

        .nav-menu {
            display: none !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: white;
            padding: 1rem;
            box-shadow: var(--shadow-md);
            z-index: 1000;
        }

        .nav-menu.active {
            display: flex !important;
        }

        .nav-menu li {
            padding: 0.5rem 0;
            border-bottom: 1px solid var(--border-color);
        }

        .nav-menu li:last-child {
            border: none;
        }
    }
`;
document.head.appendChild(style);

/* ===========================
   UTILITY FUNCTIONS
   =========================== */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

/* ===========================
   ANALYTICS (Optional)
   =========================== */

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const trackingData = {
            event: 'button_click',
            button_text: this.textContent,
            button_class: this.className,
            timestamp: new Date().toISOString()
        };
        console.log('Tracking:', trackingData);
    });
});

/* ===========================
   PERFORMANCE OPTIMIZATION
   =========================== */

// Lazy load images if needed
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}
