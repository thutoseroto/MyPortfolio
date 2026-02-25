// ========================================
// MAIN.JS - Complete Interactive Portfolio
// ========================================

// Test to verify loading
console.log('✅ script.js is loaded!');

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM fully loaded');

    // ========================================
    // 1. MOBILE MENU TOGGLE
    // ========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
            navLinks.classList.toggle('active');
            document.body.style.overflow = expanded ? 'auto' : 'hidden';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close menu on resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ========================================
    // 2. CONTACT FORM HANDLING WITH FORMSPREE
    // ========================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent page reload

            // Get form data as FormData (not JSON)
            const formData = new FormData(contactForm);

            // Show loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'SENDING...';
            submitBtn.disabled = true;

            // Clear any previous status messages
            if (formStatus) {
                formStatus.innerHTML = '';
            }

            try {
                // REPLACE THIS URL WITH YOUR FORMSPREE ENDPOINT
                const response = await fetch('https://formspree.io/f/xqedwgjv', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success!
                    contactForm.reset(); // Clear the form

                    // Show success message in form status div
                    if (formStatus) {
                        formStatus.innerHTML = '<div class="success-message">✅ Message sent successfully! I\'ll get back to you within 24 hours.</div>';
                    }

                    // Show notification popup
                    showNotification('✅ Message sent successfully! I\'ll get back to you soon.', 'success');

                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        if (formStatus) {
                            formStatus.innerHTML = '';
                        }
                    }, 5000);

                } else {
                    // Formspree returned an error
                    const data = await response.json();
                    let errorMessage = 'Failed to send message';

                    if (data.errors) {
                        errorMessage = data.errors.map(error => error.message).join(', ');
                    }

                    throw new Error(errorMessage);
                }
            } catch (error) {
                // Show error message
                if (formStatus) {
                    formStatus.innerHTML = `<div class="error-message">❌ ${error.message}. Please try again or email me directly.</div>`;
                }

                // Show error notification
                showNotification('❌ ' + error.message, 'error');
                console.error('Form error:', error);
            } finally {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // ========================================
    // 3. NOTIFICATION SYSTEM
    // ========================================
    function showNotification(message, type = 'success') {
        // Remove existing notification
        const existingNotif = document.querySelector('.notification');
        if (existingNotif) {
            existingNotif.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✓' : '⚠️'}</span>
                <p>${message}</p>
                <button class="notification-close" aria-label="Close">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Show notification with animation
        setTimeout(() => notification.classList.add('show'), 10);

        // Auto-hide after 5 seconds
        const timeout = setTimeout(() => {
            hideNotification(notification);
        }, 5000);

        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(timeout);
            hideNotification(notification);
        });
    }

    function hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }

    // ========================================
    // 4. SCROLL ANIMATIONS
    // ========================================
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.project-card, .skill-category, .preview-card, .numbered-card, .card-with-image, .academic-card');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    };

    animateOnScroll();

    // ========================================
    // 5. SCROLL TO TOP BUTTON
    // ========================================
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========================================
    // 6. COPY EMAIL TO CLIPBOARD
    // ========================================
    const copyEmailBtn = document.querySelector('.copy-email');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', function() {
            const email = 'thutoseroto@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                showNotification('✅ Email copied to clipboard!', 'success');
            }).catch(() => {
                showNotification('❌ Failed to copy email', 'error');
            });
        });
    }

    // ========================================
    // 7. ACTIVE NAVIGATION HIGHLIGHTING
    // ========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');

    navItems.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // ========================================
    // 8. PAGE LOAD ANIMATIONS
    // ========================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');

        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');

        if (heroContent) {
            heroContent.style.animation = 'fadeInUp 1s ease';
        }
        if (heroImage) {
            heroImage.style.animation = 'fadeIn 1s ease';
        }
    });

});