// التحسين: JavaScript محسن وخفيف
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // 1. Lazy Loading للصور
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.classList.add('lazy-image');
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });

    // 2. Intersection Observer للتحميل عند الظهور
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src && !img.src.includes(img.dataset.src)) {
                    img.src = img.dataset.src;
                }
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '50px', threshold: 0.1 });

    images.forEach(img => {
        if (!img.classList.contains('loaded')) {
            imageObserver.observe(img);
        }
    });

    // 3. التنقل السلس للروابط الداخلية
    const navLinks = document.querySelectorAll('.nav-links a');
    if (navLinks.length) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // 4. زر الاتصال العائم
    const floatingPhone = document.querySelector('.floating-phone');
    if (floatingPhone) {
        floatingPhone.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('هل تريد الاتصال بالرقم 0532228615؟')) {
                window.location.href = 'tel:0532228615';
            }
        });
    }

    // 5. زر العودة للرئيسية
    const backButton = document.querySelector('.back-to-home');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }

    // 6. شجرة التنقل
    const navTreeToggle = document.getElementById('navTreeToggle');
    const navTree = document.getElementById('navTree');

    if (navTreeToggle && navTree) {
        navTreeToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navTree.classList.toggle('active');
        });

        document.addEventListener('click', function(event) {
            if (navTree.classList.contains('active') &&
                !navTree.contains(event.target) &&
                !navTreeToggle.contains(event.target)) {
                navTree.classList.remove('active');
            }
        });

        navTree.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navTree.classList.remove('active');
            });
        });
    }

    // 7. تبادل الخلفيات
    const slides = document.querySelectorAll('.header-slide');
    if (slides.length) {
        let currentSlide = 0;
        const totalSlides = slides.length;

        function changeBackground() {
            slides.forEach(slide => slide.style.opacity = '0');
            slides[currentSlide].style.opacity = '0.80';
            currentSlide = (currentSlide + 1) % totalSlides;
        }

        setInterval(changeBackground, 3000);
        changeBackground();
    }

    // 8. تحسين أداء التمرير
    let lastScrollTime = 0;
    window.addEventListener('scroll', function() {
        const now = Date.now();
        if (now - lastScrollTime > 100) {
            lastScrollTime = now;
            const viewportHeight = window.innerHeight;
            const scrollPosition = window.scrollY;
            
            document.querySelectorAll('img.lazy-image:not(.loaded)').forEach(img => {
                const imgPosition = img.getBoundingClientRect().top + scrollPosition;
                if (imgPosition < scrollPosition + viewportHeight + 200) {
                    if (img.dataset.src && !img.src.includes(img.dataset.src)) {
                        img.src = img.dataset.src || img.src;
                    }
                }
            });
        }
    });

    // 9. تحميل مسبق للصور بعد تحميل الصفحة
    window.addEventListener('load', function() {
        setTimeout(function() {
            const imageUrls = [
                'img/mostoudaa_sand1.webp',
                'img/mostoudaa_sand2.webp',
                'img/mostoudaa_sand3.webp',
                'img/mostoudaa_sand4.webp',
                'img/mostoudaa_sand5.webp',
                'img/mostoudaa_sand6.webp',
                'img/mostoudaa_sand7.webp',
                'img/mostoudaa_sand8.webp',
                'img/mostoudaa_sand9.webp',
                'img/mostoudaa_sand10.webp'
            ];
            imageUrls.forEach(url => {
                const img = new Image();
                img.src = url;
            });
        }, 1000);
    });
});