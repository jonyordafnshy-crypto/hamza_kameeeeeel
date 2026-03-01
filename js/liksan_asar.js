// ================================================
// [OPTIMIZED] مظلات وسواتر القاسم الحديثة - تحسين السرعة
// - تم دمج الوظائف المتكررة
// - إضافة Lazy Loading محسن للصور والخلفيات
// - تحسين أداء التبديل بين الخلفيات (Header Slider)
// - إزالة التكرار وتحسين معالجة الأحداث
// ================================================

(function() {
    'use strict';

    // --- Helper Functions (لتجنب تكرار الكود) ---
    const phoneNumberMain = '0532228615';
    const phoneNumberShort = '532228615';

    // دالة موحدة للاتصال
    window.callNumber = function(number) {
        const num = number || phoneNumberShort;
        if (confirm(`هل تريد الاتصال بالرقم ${num}؟`)) {
            window.location.href = `tel:${num}`;
        }
    };

    // دالة موحدة لواتساب
    window.whatsappMessage = function(number) {
        const num = number || phoneNumberShort;
        const message = "مرحباً، أريد الاستفسار عن أسعار ألواح اللكسان والخدمات - ورشة تركيب بالرياض 0532228615";
        window.open(`https://wa.me/${num.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
    };

    // --- تحميل الصفحة ---
    document.addEventListener('DOMContentLoaded', function() {
        // 1. تحسين التنقل السلس (Smooth Scroll)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({ top: targetElement.offsetTop - 100, behavior: 'smooth' });
                }
            });
        });

        // 2. زر الاتصال العائم
        const floatingPhone = document.querySelector('.floating-phone');
        if (floatingPhone) {
            floatingPhone.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('هل تريد الاتصال بالرقم 532228615؟')) {
                    window.location.href = 'tel:0532228615';
                }
            });
        }

        // 3. زر العودة للرئيسية
        const backButton = document.querySelector('.back-to-home');
        if (backButton) {
            backButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'index.html';
            });
        }

        // 4. شجرة التنقل
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
                link.addEventListener('click', () => navTree.classList.remove('active'));
            });
        }

        // 5. زر واتساب العائم (بدون onclick في HTML)
        const whatsappBtn = document.getElementById('whatsappButton');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', () => whatsappMessage(phoneNumberShort));
        }

        // 6. تهيئة خلفية الهيدر (Header Slider) مع Lazy Loading للخلفيات
        initHeaderSlider();

        // 7. تحميل الصور الثقيلة بعد الصفحة (لتحسين LCP)
        if ('requestIdleCallback' in window) {
            requestIdleCallback(preloadHeavyImages, { timeout: 2000 });
        } else {
            setTimeout(preloadHeavyImages, 1500);
        }
    });

    // --- وظائف محسنة للخلفية المتحركة (Header Slider) ---
    function initHeaderSlider() {
        const slides = document.querySelectorAll('.header-slide');
        if (!slides.length) return;

        // تطبيق Lazy Loading على الخلفيات
        slides.forEach(slide => {
            const bgUrl = slide.getAttribute('data-bg');
            if (bgUrl) {
                // تحميل الصورة في الخلفية
                const img = new Image();
                img.onload = () => {
                    slide.style.backgroundImage = `url('${bgUrl}')`;
                };
                img.src = bgUrl;
            }
        });

        // بدء التبديل بين الخلفيات
        let currentSlide = 0;
        const totalSlides = slides.length;

        // التأكد من أن الشريحة الأولى مرئية بعد تحميل الصورة
        if (slides[0]) {
            slides[0].style.opacity = '1';
        }

        setInterval(() => {
            slides.forEach(slide => slide.style.opacity = '0');
            slides[currentSlide].style.opacity = '0.80';
            currentSlide = (currentSlide + 1) % totalSlides;
        }, 3000);
    }

    // --- تحميل مسبق للصور الثقيلة (بعد تحميل الصفحة) ---
    function preloadHeavyImages() {
        const heavyImages = [
            'img/liksan_alwah6.webp',
            'img/liksan_alwah8.webp',
            'img/liksan_alwah10.webp',
            'img/liksan_index.webp',
            'img/asqf1.jpg',
            'img/liksan_taghtya11.webp'
        ];

        heavyImages.forEach(src => {
            const img = new Image();
            img.src = src;
            img.decoding = 'async';
        });
    }

    // --- تحسين Lazy Loading للصور باستخدام Intersection Observer ---
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        delete img.dataset.src;
                    }
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                        delete img.dataset.srcset;
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '100px 0px', threshold: 0.01 });

        // تجهيز الصور للتحميل البطيء
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            if (img.src && !img.dataset.src) {
                img.dataset.src = img.src;
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
            }
            if (img.srcset && !img.dataset.srcset) {
                img.dataset.srcset = img.srcset;
                img.srcset = '';
            }
            imageObserver.observe(img);
        });
    } else {
        // Fallback للمتصفحات القديمة
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            if (img.dataset.src) img.src = img.dataset.src;
        });
    }

    // --- تحسين أداء التمرير (Scroll) ---
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            document.querySelectorAll('img[data-src]').forEach(img => {
                const rect = img.getBoundingClientRect();
                if (rect.top < window.innerHeight + 150 && rect.bottom > -150) {
                    img.src = img.dataset.src;
                    delete img.dataset.src;
                }
            });
        }, 150);
    }, { passive: true }); // تحسين الأداء باستخدام passive

})();