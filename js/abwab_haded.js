/**
 * ملف JavaScript المحسن لصفحة أبواب حديد
 * تم تحسينه لسرعة الأداء مع الحفاظ على جميع الوظائف
 */

(function() {
    'use strict';

    // تحسين: استخدام DOMContentLoaded بشكل أسرع
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // إذا كان DOM جاهزاً بالفعل، نفذ مباشرة
        init();
    }

    function init() {
        // تهيئة Lazy Loading للصور
        initLazyLoading();

        // تهيئة شجرة التنقل
        initNavTree();

        // تهيئة خلفية الشعار المتحركة
        initLogoSlider();

        // تهيئة خلفية الهيدر المتحركة
        initHeaderSlider();

        // تهيئة تأثيرات التمرير
        initScrollEffects();

        // تهيئة تأثيرات الأزرار
        initButtonEffects();

        // تحسين: استخدام requestIdleCallback للعمليات غير الحرجة
        if ('requestIdleCallback' in window) {
            requestIdleCallback(preloadImages, { timeout: 2000 });
        } else {
            setTimeout(preloadImages, 1000);
        }
    }

    /**
     * تحسين: Lazy Loading ذكي للصور
     */
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img.lazy-img');
        
        if (lazyImages.length === 0) return;

        // تحسين: استخدام Intersection Observer
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        
                        // إضافة onload لإزالة placeholder
                        img.onload = () => {
                            img.style.backgroundColor = 'transparent';
                        };
                        
                        // إزالة المراقبة بعد التحميل
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '200px 0px', // تحسين: تحميل قبل ظهور الصورة بـ 200px
            threshold: 0.01
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    /**
     * تحسين: شجرة التنقل
     */
    function initNavTree() {
        const navTreeToggle = document.getElementById('navTreeToggle');
        const navTree = document.getElementById('navTree');

        if (!navTreeToggle || !navTree) return;

        // تحسين: استخدام event delegation
        navTreeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navTree.classList.toggle('active');
        });

        // إغلاق عند النقر خارجاً
        document.addEventListener('click', (event) => {
            if (navTree.classList.contains('active') &&
                !navTree.contains(event.target) &&
                !navTreeToggle.contains(event.target)) {
                navTree.classList.remove('active');
            }
        });

        // إغلاق عند النقر على رابط
        navTree.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navTree.classList.remove('active');
            });
        });
    }

    /**
     * تحسين: خلفية الشعار المتحركة
     */
    function initLogoSlider() {
        const logoSlides = document.querySelectorAll('.logo-slide');
        if (logoSlides.length === 0) return;

        let currentSlide = 0;

        function changeLogoBackground() {
            // تحسين: استخدام classList بدلاً من forEach
            for (let i = 0; i < logoSlides.length; i++) {
                logoSlides[i].classList.remove('active');
            }
            
            logoSlides[currentSlide].classList.add('active');
            currentSlide = (currentSlide + 1) % logoSlides.length;
        }

        // تحسين: استخدام setInterval مع وقت مناسب
        setInterval(changeLogoBackground, 5000);
    }

    /**
     * تحسين: خلفية الهيدر المتحركة
     */
    function initHeaderSlider() {
        const slides = document.querySelectorAll('.header-slide');
        if (slides.length === 0) return;

        let currentHeaderSlide = 0;
        const totalSlides = slides.length;

        function changeBackground() {
            // تحسين: استخدام for loop بدلاً من forEach
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.opacity = '0';
            }

            slides[currentHeaderSlide].style.opacity = '0.80';
            currentHeaderSlide = (currentHeaderSlide + 1) % totalSlides;
        }

        // بدء التبديل فوراً
        changeBackground();
        
        // تحسين: وقت أطول لتقليل الحمل
        setInterval(changeBackground, 4000);
    }

    /**
     * تحسين: تأثيرات التمرير
     */
    function initScrollEffects() {
        const backButton = document.querySelector('.back-to-home');
        if (!backButton) return;

        // تحسين: استخدام passive event listener
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backButton.style.opacity = '1';
                backButton.style.transform = 'scale(1)';
            } else {
                backButton.style.opacity = '0.8';
                backButton.style.transform = 'scale(0.95)';
            }
        }, { passive: true });

        // تحسين: تأثير ظهور العناصر عند التمرير
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

        document.querySelectorAll('.article-card').forEach(card => {
            observer.observe(card);
        });
    }

    /**
     * تحسين: تأثيرات الأزرار
     */
    function initButtonEffects() {
        document.querySelectorAll('.read-more, .floating-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                // تأثير النقر - خفيف وسريع
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150); // تحسين: وقت أقل
            });
        });
    }

    /**
     * تحسين: تحميل مسبق للصور الخلفية
     */
    function preloadImages() {
        const imageUrls = [
            'img/abwab_haded9.webp',
            'img/abwab_22.webp',
            'img/abwab_25.webp'
        ];

        // تحسين: استخدام requestAnimationFrame للتحميل
        requestAnimationFrame(() => {
            imageUrls.forEach(url => {
                const img = new Image();
                img.src = url;
            });
        });
    }

    /**
     * تحسين: تهيئة سريعة عند تحميل الصفحة
     */
    // إضافة تأثير بسيط عند التحميل
    setTimeout(() => {
        const header = document.querySelector('.main-header h1');
        if (header) {
            header.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                header.style.animation = '';
            }, 500);
        }
    }, 800); // تحسين: تأخير أقل
})();