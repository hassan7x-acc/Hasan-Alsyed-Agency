/* ============================================
   SMOOTH SCROLL & NAVIGATION
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation Link on Scroll
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);

    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href === '#' + section.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
});

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-animate class
    const elements = document.querySelectorAll('.service-card, .benefit-card, .process-step, .pricing-card');
    elements.forEach(element => {
        element.classList.add('scroll-animate');
        observer.observe(element);
    });
}

// Initialize scroll animations
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeElements);
} else {
    observeElements();
}

/* ============================================
   FORM HANDLING
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;
            
            // Validate form
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // In a real application, you would send this data to a server
                console.log({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                });
                
                // Reset form
                contactForm.reset();
                
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});

/* ============================================
   NOTIFICATION SYSTEM
   ============================================ */

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.3s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

/* ============================================
   BUTTON HOVER EFFECTS & INTERACTIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

/* ============================================
   PARALLAX EFFECT ON HERO SECTION
   ============================================ */

window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const heroSection = document.querySelector('.hero');
    
    if (heroSection && scrollPosition < window.innerHeight) {
        const parallaxBg = document.querySelector('.animated-bg');
        if (parallaxBg) {
            parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    }
});

/* ============================================
   CARD HOVER EFFECTS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card, .benefit-card, .pricing-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            // Subtle 3D effect
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
});

/* ============================================
   COUNTER ANIMATION (Optional Enhancement)
   ============================================ */

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 100;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

/* ============================================
   LAZY LOADING FOR IMAGES (Performance)
   ============================================ */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ============================================
   WHATSAPP LINK ENHANCEMENT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        // Add WhatsApp greeting message
        if (!link.href.includes('?')) {
            link.href += '?text=Hi%20Hasan%2C%20I%27m%20interested%20in%20your%20web%20design%20services.';
        }
    });
});

/* ============================================
   ACCESSIBILITY IMPROVEMENTS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Add focus visible styles for keyboard navigation
    const style = document.createElement('style');
    style.textContent = `
        *:focus-visible {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
    
    // Add keyboard navigation for buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.setAttribute('role', 'button');
    });
});

/* ============================================
   PERFORMANCE OPTIMIZATION
   ============================================ */

// Debounce function for scroll and resize events
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll animations
window.addEventListener('scroll', throttle(() => {
    // Scroll event handlers here
}, 100));

/* ============================================
   PRELOAD CRITICAL RESOURCES
   ============================================ */

window.addEventListener('load', function() {
    // Add any post-load optimizations here
    console.log('Website loaded successfully');
});

/* ============================================
   ERROR HANDLING & FALLBACKS
   ============================================ */

window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Send error to tracking service if needed
});

/* ============================================
   THEME PERSISTENCE (Future Enhancement)
   ============================================ */

// You can add localStorage-based theme switching here
// For now, we keep the dark theme as default

/* ============================================
   CUSTOM CURSOR EFFECT (Optional)
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Create custom cursor elements
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    
    cursor.style.cssText = `
        width: 30px;
        height: 30px;
        border: 2px solid rgba(0, 212, 255, 0.5);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        display: none;
    `;
    
    cursorDot.style.cssText = `
        width: 8px;
        height: 8px;
        background: rgba(0, 212, 255, 0.8);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        display: none;
    `;
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    
    // Update cursor position on mouse move
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Show custom cursor
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';
        
        // Update cursor dot position
        cursorDot.style.left = (mouseX - 4) + 'px';
        cursorDot.style.top = (mouseY - 4) + 'px';
    });
    
    // Smooth cursor ring following
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        cursor.style.left = (cursorX - 15) + 'px';
        cursor.style.top = (cursorY - 15) + 'px';
        
        // Grow cursor on hover over interactive elements
        const hoveredElement = document.elementFromPoint(mouseX, mouseY);
        if (hoveredElement && (hoveredElement.tagName === 'A' || hoveredElement.tagName === 'BUTTON' || hoveredElement.classList.contains('btn'))) {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.borderWidth = '3px';
        } else {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursor.style.borderWidth = '2px';
        }
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hide custom cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';
    });
});

console.log('✨ Hasan Alsyed Agency - Portfolio Website Loaded');
