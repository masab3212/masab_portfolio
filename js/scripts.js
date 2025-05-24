/*!
* Enhanced Resume v7.0.12 - Layout Adjustments and Grey Neon Effects
* Copyright 2023
* Licensed under MIT
*/

// Scripts

window.addEventListener('DOMContentLoaded', event => {
    // Initialize AOS with 'once' set to false for repeated animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false, // Allows animations to occur every time elements come into view
        mirror: true // Whether elements should animate out while scrolling past them
    });

    // Activate Bootstrap scrollspy on the main nav element with smooth scroll effect
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Add smooth scrolling to all internal links for better navigation experience
    const scrollLinks = document.querySelectorAll('a.js-scroll-trigger');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // adjust scroll position to align with the top nav
                    behavior: 'smooth',
                });
            }
        });
    });

    // Variables to track scroll direction
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollDirection = 'down';

    // Detect scroll direction
    window.addEventListener('scroll', () => {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop){
            scrollDirection = 'down';
        } else {
            scrollDirection = 'up';
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }, false);

    // Adding dynamic fade-in animation based on scroll direction
    const elements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-down, .pop-in, .progress-bar');
    const observerOptions = {
        threshold: 0.2
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                if(scrollDirection === 'down'){
                    if(entry.target.classList.contains('fade-in-up')){
                        entry.target.classList.add('fade-visible');
                    }
                } else if(scrollDirection === 'up'){
                    if(entry.target.classList.contains('fade-in-down')){
                        entry.target.classList.add('fade-visible');
                    }
                }
                if(entry.target.classList.contains('fade-in')){
                    entry.target.classList.add('fade-visible');
                }
                if(entry.target.classList.contains('pop-in')){
                    entry.target.classList.add('fade-visible');
                }

                // Animate progress bars when they come into view
                if(entry.target.classList.contains('progress-bar')) {
                    let percentage = entry.target.getAttribute('data-percentage');
                    entry.target.style.width = percentage + '%';
                    entry.target.setAttribute('aria-valuenow', percentage);
                }
            } else {
                if(entry.target.classList.contains('fade-in-up') || 
                   entry.target.classList.contains('fade-in-down') || 
                   entry.target.classList.contains('fade-in') || 
                   entry.target.classList.contains('pop-in')){
                    entry.target.classList.remove('fade-visible');
                }

                // Reset progress bars when they go out of view
                if(entry.target.classList.contains('progress-bar')) {
                    entry.target.style.width = '0%';
                    entry.target.setAttribute('aria-valuenow', 0);
                }
            }
        });
    }, observerOptions);

    elements.forEach(el => {
        observer.observe(el);
    });

    // Back to top button animation and scroll-to-top functionality
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });

    // Custom animation for experience section (e.g., reveal work experience timeline with scroll)
    const experienceSections = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-visible');
            } else {
                entry.target.classList.remove('fade-visible');
            }
        });
    }, { threshold: 0.1 });

    experienceSections.forEach(item => {
        timelineObserver.observe(item);
    });

    // Add typing effect for text on landing page or other sections (e.g., job roles, skills, etc.)
    const typedElements = document.querySelectorAll('.typed-text');
    typedElements.forEach(element => {
        const text = element.getAttribute('data-text');
        let charIndex = 0;
        let isDeleting = false;
        let speed = 100;

        function typeText() {
            if (!isDeleting && charIndex <= text.length) {
                element.textContent = text.substring(0, charIndex);
                charIndex++;
                setTimeout(typeText, speed);
            } else if (isDeleting && charIndex >= 0) {
                element.textContent = text.substring(0, charIndex);
                charIndex--;
                setTimeout(typeText, speed / 2);
            } else if (charIndex > text.length) {
                isDeleting = true;
                setTimeout(typeText, speed);
            } else if (charIndex === 0) {
                isDeleting = false;
                setTimeout(typeText, speed);
            }
        }

        typeText();
    });

    // Parallax effect on background images
    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
            const offset = window.scrollY * speed;
            element.style.backgroundPosition = `center ${offset}px`;
        });
    });

    // Enable tooltips and popovers for better interactivity
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));

    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Add custom scroll effects for the side navigation menu
    const sideNavItems = document.querySelectorAll('#sideNav .nav-link');
    sideNavItems.forEach(item => {
        item.addEventListener('click', function () {
            sideNavItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Theme Toggle Functionality
    const themeSwitch = document.getElementById('themeSwitch');
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeSwitch.checked = true;
        }
    }

    themeSwitch.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', '');
        }
    });
});

// Additional JavaScript for elements that require extra interaction
document.addEventListener("DOMContentLoaded", function () {
    // Activate lightbox for images (optional)
    const lightboxModal = document.getElementById('lightboxModal');
    if (lightboxModal) {
        const lightbox = new bootstrap.Modal(lightboxModal);
        const imageLinks = document.querySelectorAll('.image-link');
        imageLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                const imgSrc = this.getAttribute('data-image');
                const imgAlt = this.getAttribute('data-title');
                const imgElement = document.getElementById('lightboxImage');
                imgElement.src = imgSrc;
                imgElement.alt = imgAlt;
                lightbox.show();
            });
        });
    }

    // Additional customization for modals (like contact form modal, etc.)
    const contactModal = document.getElementById('contactModal');
    if (contactModal) {
        contactModal.addEventListener('show.bs.modal', function () {
            document.querySelector('#contactName').focus();
        });
    }
});
