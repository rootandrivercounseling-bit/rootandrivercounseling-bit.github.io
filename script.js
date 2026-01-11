// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
            if (mobileMenuToggle) {
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
});

// Set active link based on current page
function setActiveLinkByPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const hash = window.location.hash;
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Remove active class from all links first
        link.classList.remove('active');
        
        // If there's a hash in URL, prioritize that
        if (hash && href === hash) {
            link.classList.add('active');
        }
        // Otherwise, set active based on page
        else if (href === currentPage || (currentPage === 'index.html' && href === 'index.html' && !hash)) {
            link.classList.add('active');
        } else if (currentPage === 'about.html' && href === 'about.html') {
            link.classList.add('active');
        } else if (currentPage === 'contact.html' && href === 'contact.html') {
            link.classList.add('active');
        }
    });
}

// Initialize active link on page load
setActiveLinkByPage();

// Header Scroll Effect
const header = document.querySelector('.header');

if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
    });
}

// Smooth Scroll for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Handle hash links (same page navigation)
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection && header) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // Remove active from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active to clicked link
                link.classList.add('active');
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
        // Handle links to index.html with hash (cross-page navigation)
        else if (href.includes('index.html#')) {
            e.preventDefault();
            const hash = href.split('#')[1];
            if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/index.html')) {
                // Already on index page, just scroll
                const targetSection = document.getElementById(hash);
                if (targetSection && header) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    // Remove active from all links
                    navLinks.forEach(l => l.classList.remove('active'));
                    // Add active to clicked link
                    link.classList.add('active');
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            } else {
                // Navigate to index page first, then scroll after page loads
                window.location.href = href;
            }
        }
    });
});

// Active Navigation Link on Scroll (for same-page sections)
function setActiveNavLinkOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;
    
    const scrollY = window.pageYOffset;
    const headerHeight = header?.offsetHeight || 70;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - headerHeight - 50;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            // Remove active from all links
            navLinks.forEach(link => {
                // Only remove active from hash links, keep page links active
                if (link.getAttribute('href').startsWith('#')) {
                    link.classList.remove('active');
                }
            });
            // Add active to matching section link
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Update active link on scroll
window.addEventListener('scroll', () => {
    setActiveNavLinkOnScroll();
});

// Handle scroll to section on page load if hash is present
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) {
        const targetId = hash.substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection && header) {
            setTimeout(() => {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // In a real application, you would send this data to a server
        // For now, we'll just show a success message
        alert(`Thank you, ${name}! Your message has been received. We'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Enhanced scroll reveal for 2025-2026 trends
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about-text, .about-image, .service-card, .intro-text, .intro-image, .contact-info, .contact-form');
    
    animatedElements.forEach((el, index) => {
        el.classList.add('reveal-on-scroll');
        revealObserver.observe(el);
    });
    
    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
    
    // Add micro-interactions to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Hero Background Image Carousel
function initHeroCarousel() {
    const heroImages = document.querySelectorAll('.hero-bg-image');
    if (heroImages.length === 0) return;
    
    let currentIndex = 0;
    
    function showNextImage() {
        // Remove active class from current image
        heroImages[currentIndex].classList.remove('active');
        
        // Move to next image
        currentIndex = (currentIndex + 1) % heroImages.length;
        
        // Add active class to new image
        heroImages[currentIndex].classList.add('active');
    }
    
    // Start cycling every 6 seconds
    setInterval(showNextImage, 6000);
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', () => {
    initHeroCarousel();
});

// Add parallax effect to hero section and handle scroll indicator
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroPattern = document.querySelector('.hero-pattern');
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    if (heroPattern && scrolled < window.innerHeight) {
        heroPattern.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Hide scroll indicator when user scrolls
    if (scrollIndicator && scrolled > 50) {
        scrollIndicator.classList.add('hidden');
    } else if (scrollIndicator && scrolled <= 50) {
        scrollIndicator.classList.remove('hidden');
    }
});

// Make scroll indicator clickable to scroll to next section
document.addEventListener('DOMContentLoaded', () => {
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const introSection = document.getElementById('intro');
            if (introSection) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
                const targetPosition = introSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
});

