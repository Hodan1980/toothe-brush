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

    // Modal & Discount Logic
    const modalOverlay = document.getElementById('orderModal');
    const openModalBtns = document.querySelectorAll('.open-order-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const orderForm = document.getElementById('orderForm');

    // Global variable to store discount from wheel
    let currentDiscount = 0;

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modalOverlay.classList.add('active');

            // Check if we need to inject price info
            let summary = document.getElementById('order-summary');
            if (!summary) {
                summary = document.createElement('div');
                summary.id = 'order-summary';
                summary.style.marginBottom = '20px';
                summary.style.padding = '15px';
                summary.style.backgroundColor = '#f0faff';
                summary.style.borderRadius = '8px';
                summary.style.border = '1px solid #b3e5fc';

                const form = document.getElementById('orderForm');
                form.parentNode.insertBefore(summary, form);
            }

            if (currentDiscount > 0) {
                const originalPrice = 99;
                const discountAmount = originalPrice * currentDiscount;
                const finalPrice = originalPrice - discountAmount;

                summary.innerHTML = `
                    <p style="margin-bottom: 5px; color: #666;">Цена: <span style="text-decoration: line-through;">${originalPrice.toFixed(2)}€</span></p>
                    <p style="margin-bottom: 5px; color: #e91e63; font-weight: bold;">Отстъпка: -${(currentDiscount * 100).toFixed(0)}% (-${discountAmount.toFixed(2)}€)</p>
                    <p style="font-size: 1.2rem; font-weight: 800; color: #00ACC1;">Крайна цена: ${finalPrice.toFixed(2)}€</p>
                `;
                summary.style.display = 'block';
            } else {
                summary.style.display = 'none';
            }
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

    /* --- SALES FEATURES LOGIC --- */

    // 1. Countdown Timer
    function startCountdown() {
        const now = new Date();
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

        if (endOfDay.getTime() - now.getTime() < 1000 * 60 * 60) {
            endOfDay.setDate(endOfDay.getDate() + 1);
        }

        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        function updateTimer() {
            const currentTime = new Date();
            const diff = endOfDay - currentTime;

            if (diff <= 0) return;

            const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((diff / 1000 / 60) % 60);
            const s = Math.floor((diff / 1000) % 60);

            hoursEl.innerText = h < 10 ? '0' + h : h;
            minutesEl.innerText = m < 10 ? '0' + m : m;
            secondsEl.innerText = s < 10 ? '0' + s : s;
        }

        setInterval(updateTimer, 1000);
        updateTimer();
    }
    startCountdown();

    // 2. Live Counter
    function startLiveCounter() {
        const counterEl = document.getElementById('current-viewers');
        let viewers = 24;

        setInterval(() => {
            const change = Math.floor(Math.random() * 5) - 2;
            viewers += change;
            if (viewers < 15) viewers = 15;
            if (viewers > 45) viewers = 45;
            counterEl.innerText = viewers;
        }, 3000);
    }
    startLiveCounter();

    // 3. Sales Popup
    const buyerNames = ['Иван', 'Мария', 'Георги', 'Елена', 'Димитър', 'Петя', 'Николай', 'Силвия', 'Александър', 'Виктория'];
    const cities = ['София', 'Пловдив', 'Варна', 'Бургас', 'Русе', 'Стара Загора', 'Плевен', 'Благоевград'];
    const times = ['1 мин', '2 мин', '5 мин', '10 мин', 'току-що'];

    const popup = document.getElementById('sales-popup');
    const closePopupBtn = document.querySelector('.close-sales');
    const nameEl = document.getElementById('buyer-name');
    const cityEl = document.getElementById('buyer-city');
    const timeEl = document.getElementById('buyer-time');

    function showPopup() {
        const name = buyerNames[Math.floor(Math.random() * buyerNames.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const time = times[Math.floor(Math.random() * times.length)];

        nameEl.innerText = name;
        cityEl.innerText = city;
        timeEl.innerText = time;

        popup.classList.add('active');

        setTimeout(() => {
            popup.classList.remove('active');
        }, 5000);

        const nextInterval = Math.random() * 10000 + 10000;
        setTimeout(showPopup, nextInterval);
    }

    setTimeout(showPopup, 5000);

    closePopupBtn.addEventListener('click', () => {
        popup.classList.remove('active');
    });

    // 4. Spinning Wheel Logic
    const wheelModal = document.getElementById('wheel-modal');
    const closeWheelBtn = document.querySelector('.close-wheel');
    const spinBtn = document.getElementById('spin-btn');
    const wheel = document.getElementById('wheel');
    const resultDiv = document.getElementById('wheel-result');
    let hasSpun = false;

    // Show wheel after 10 seconds
    setTimeout(() => {
        if (!hasSpun && !wheelModal.classList.contains('active')) {
            wheelModal.classList.add('active');
        }
    }, 10000);

    closeWheelBtn.addEventListener('click', () => {
        wheelModal.classList.remove('active');
    });

    spinBtn.addEventListener('click', () => {
        if (hasSpun) return;
        hasSpun = true;
        spinBtn.disabled = true;
        spinBtn.innerText = 'Късмет!';

        const randomDeg = Math.floor(Math.random() * 360) + 1800;
        wheel.style.transform = `rotate(${randomDeg}deg)`;

        setTimeout(() => {
            const discounts = ['5%', '10%', '15%', '20%', '30%', '45%', '5%', '10%'];
            const result = discounts[Math.floor(Math.random() * discounts.length)];

            // Parse discount
            currentDiscount = parseInt(result) / 100;

            resultDiv.innerHTML = `Честито! Спечели <span style="color: #e91e63; font-size: 2rem;">${result}</span> отстъпка!`;

            spinBtn.innerText = 'Използвай отстъпката';
            spinBtn.disabled = false;
            spinBtn.onclick = () => {
                wheelModal.classList.remove('active');
                document.querySelector('.open-order-modal').click();
            };
        }, 5000);
    });
});
