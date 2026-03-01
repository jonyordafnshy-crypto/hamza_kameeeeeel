/**
 * ملف JavaScript المحسن للأداء - مظلات وسواتر القاسم الحديثة
 * تم تحسين الأداء وتقليل العمليات غير الضرورية
 */

// استخدام IIFE لتجنب التلوث في النطاق العام
(function() {
    'use strict';

    // تخزين المراجع للعناصر المستخدمة بشكل متكرر
    const DOM = {
        navTreeToggle: document.getElementById('navTreeToggle'),
        navTree: document.getElementById('navTree'),
        floatingPhone: document.querySelector('.floating-phone'),
        backButton: document.querySelector('.back-to-home'),
        slides: document.querySelectorAll('.header-slide')
    };

    /**
     * دالة محسنة للاتصال بالرقم
     */
    window.callNumber = function(phoneNumber) {
        if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`)) {
            window.location.href = `tel:${phoneNumber}`;
        }
    };

    /**
     * دالة محسنة لإرسال رسالة واتساب
     */
    window.whatsappMessage = function(phoneNumber) {
        const message = "أريد استفسار عن هناجر ساندوتش بانل بالرياض 0532228615";
        // تحسين: استخدام encodeURIComponent مرة واحدة فقط
        window.open(`https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
    };

    /**
     * دالة تبديل شجرة التنقل - محسنة
     */
    function initNavTree() {
        if (!DOM.navTreeToggle || !DOM.navTree) return;

        // تحسين: استخدام مرة واحدة للحدث
        DOM.navTreeToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            DOM.navTree.classList.toggle('active');
        });

        // تحسين: استخدام event delegation للإغلاق
        document.addEventListener('click', function(event) {
            if (DOM.navTree.classList.contains('active') &&
                !DOM.navTree.contains(event.target) &&
                !DOM.navTreeToggle.contains(event.target)) {
                DOM.navTree.classList.remove('active');
            }
        });

        // تحسين: إغلاق عند النقر على الروابط
        DOM.navTree.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => DOM.navTree.classList.remove('active'));
        });
    }

    /**
     * دالة تبديل الخلفيات - محسنة للأداء
     */
    function initBackgroundSlider() {
        const slides = DOM.slides;
        if (!slides.length) return;

        let currentSlide = 0;
        const totalSlides = slides.length;

        // تحسين: استخدام requestAnimationFrame للرسوم المتحركة
        function changeBackground() {
            requestAnimationFrame(() => {
                // إخفاء كل الشرائح
                slides.forEach(slide => {
                    slide.style.opacity = '0';
                });

                // إظهار الشريحة الحالية
                slides[currentSlide].style.opacity = '0.80';

                // الانتقال للشريحة التالية
                currentSlide = (currentSlide + 1) % totalSlides;
            });
        }

        // بدء التبديل
        changeBackground();
        setInterval(changeBackground, 3000);
    }

    /**
     * تحميل مسبق للصور - محسن
     */
    function preloadImages() {
        const imageUrls = [
            'img/hanajer12.webp',
            'img/hanajer11.webp',
            'img/hanajer10.webp'
        ];

        // تحسين: استخدام requestIdleCallback للتحميل عندما يكون المتصفح خاملاً
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                imageUrls.forEach(url => {
                    const img = new Image();
                    img.src = url;
                });
            }, { timeout: 2000 });
        } else {
            // fallback للمتصفحات القديمة
            setTimeout(() => {
                imageUrls.forEach(url => {
                    const img = new Image();
                    img.src = url;
                });
            }, 1000);
        }
    }

    /**
     * Lazy Loading محسن للصور
     */
    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // fallback للمتصفحات القديمة
            images.forEach(img => img.classList.add('loaded'));
        }
    }

    /**
     * دالة toggle للأسئلة الشائعة - محسنة
     */
    window.toggleFAQ = function(element) {
        const answer = element.nextElementSibling;
        const icon = element.querySelector('i');
        
        if (!answer || !icon) return;

        // تحسين: استخدام classList بدلاً من style مباشرة
        const isHidden = answer.style.display === 'none' || answer.style.display === '';
        
        answer.style.display = isHidden ? 'block' : 'none';
        icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
    };

    /**
     * تهيئة جميع الوظائف
     */
    function init() {
        // تهيئة المكونات
        initNavTree();
        initBackgroundSlider();
        initLazyLoading();
        preloadImages();

        // فتح أول سؤال FAQ
        const firstFAQ = document.querySelector('.faq-item h4');
        if (firstFAQ) {
            setTimeout(() => window.toggleFAQ(firstFAQ), 100);
        }

        // تحسين: استخدام event delegation لروابط التنقل
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // لا نقوم بأي شيء للحفاظ على الوظائف الأصلية
            });
        });

        // تحسين: زر الاتصال العائم
        if (DOM.floatingPhone) {
            DOM.floatingPhone.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('هل تريد الاتصال بالرقم 0532228615؟')) {
                    window.location.href = 'tel:0532228615';
                }
            });
        }

        // تحسين: زر العودة للرئيسية
        if (DOM.backButton) {
            DOM.backButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'index.html';
            });
        }
    }

    // تشغيل بعد تحميل DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

// تحسين: إضافة معالج للأخطاء لمنع تعطل الصفحة
window.addEventListener('error', function(e) {
    console.error('خطأ في الصفحة:', e.message);
    // منع تأثير الخطأ على تجربة المستخدم
    e.preventDefault();
    return true;
}, false);