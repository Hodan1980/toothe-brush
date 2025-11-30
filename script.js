document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active'); // Close menu on click

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = header.classList.contains('active');

            // Close all others
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.style.maxHeight = null;
            });

            if (!isActive) {
                header.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Modal
    const modalOverlay = document.getElementById('orderModal');
    const openModalBtns = document.querySelectorAll('.open-order-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const orderForm = document.getElementById('orderForm');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modalOverlay.classList.add('active');
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

    // Form Submission
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulate submission
        const btn = orderForm.querySelector('button[type="submit"]');
        const originalText = btn.innerText;

        btn.innerText = 'Изпращане...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerText = 'Успешно изпратено!';
            btn.style.backgroundColor = '#4CAF50';

            setTimeout(() => {
                modalOverlay.classList.remove('active');
                orderForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
                btn.style.backgroundColor = ''; // Reset to default
            }, 2000);
        }, 1500);
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .step, .review-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add class for animation
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
