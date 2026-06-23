document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Header Scroll Effect & Active Navigation Link
       ========================================================================== */
    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
        // Toggle sticky header styling
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        // Active link highlighting on scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger immediately to set initial state

    /* ==========================================================================
       Mobile Navigation Menu
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-active');
        
        // Toggle icon between hamburger and close cross
        if (navMenu.classList.contains('mobile-active')) {
            menuIcon.className = 'fa-solid fa-xmark';
        } else {
            menuIcon.className = 'fa-solid fa-bars-staggered';
        }
    });

    // Close menu when navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('mobile-active');
            menuIcon.className = 'fa-solid fa-bars-staggered';
        });
    });

    /* ==========================================================================
       Dynamic Typing Effect
       ========================================================================== */
    const typingSpan = document.querySelector('.typing-text');
    const roles = ['Data Engineer', 'Computer Science Student', 'Problem Solver'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeEffect = () => {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            typingSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        // Handle states transition
        if (!isDeleting && charIndex === currentRole.length) {
            // Stay on the full typed role for a short period
            typingSpeed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    };

    // Initialize typing effect
    if (typingSpan) {
        setTimeout(typeEffect, 1000);
    }

    /* ==========================================================================
       Scroll-Triggered Fade-In Animations (Intersection Observer)
       ========================================================================== */
    const animElements = document.querySelectorAll('.fade-in-element');

    const animObserverOptions = {
        root: null, // Viewport
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -40px 0px' // Offset trigger point slightly from bottom edge
    };

    const animObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-active');
                // Stop observing once animated to prevent repeat trigger
                observer.unobserve(entry.target);
            }
        });
    }, animObserverOptions);

    animElements.forEach(element => {
        animObserver.observe(element);
    });

    /* ==========================================================================
       Contact Form Submission Handling
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('btn-submit-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Disable submit button during processing
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            formFeedback.style.display = 'none';

            // Get form values for client simulation
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const message = document.getElementById('form-message').value;

            // Simulate form submission to backend (API call)
            setTimeout(() => {
                try {
                    // Success Simulation
                    formFeedback.className = 'form-feedback success';
                    formFeedback.innerHTML = `<strong>Thank you, ${name}!</strong> Your message has been sent successfully. I will get back to you shortly.`;
                    
                    // Reset Form
                    contactForm.reset();
                } catch (error) {
                    formFeedback.className = 'form-feedback error';
                    formFeedback.textContent = 'Oops! Something went wrong. Please try again later.';
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
                }
            }, 1200); // 1.2 second network lag simulation
        });
    }
});
