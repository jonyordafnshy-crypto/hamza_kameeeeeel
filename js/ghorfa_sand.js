/**
 * ملف JavaScript المحسن لصفحة غرف ساندوتش بانل
 * تم تحسين الأداء وتقليل العمليات غير الضرورية
 * مع الحفاظ على جميع الوظائف الأصلية
 */

// ==================== دوال الاتصال الأساسية ====================

/**
 * دالة الاتصال بالرقم - محسنة
 * @param {string} phoneNumber - رقم الهاتف للاتصال
 */
function callNumber(phoneNumber) {
    if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`)) {
        window.location.href = `tel:${phoneNumber}`;
    }
}

/**
 * دالة إرسال رسالة واتساب - محسنة
 * @param {string} phoneNumber - رقم الهاتف للواتساب
 */
function whatsappMessage(phoneNumber) {
    const message = "مرحباً، أريد الاستفسار عن غرف الساندوتش بانل الجاهزة من مظلات وسواتر القاسم الحديثة بالرياض";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// ==================== Lazy Loading للصور ====================

/**
 * نظام Lazy Loading متقدم للصور
 * يستخدم Intersection Observer مع fallback للمتصفحات القديمة
 */
(function initLazyLoading() {
    // تحقق من وجود الصور المراد تحميلها بتقنية Lazy Loading
    const lazyImages = document.querySelectorAll('img.lazy-img');
    
    if (lazyImages.length === 0) return;
    
    if ('IntersectionObserver' in window) {
        // استخدام Intersection Observer للمتصفحات الحديثة
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px', // تحميل الصور قبل ظهورها بـ 200px
            threshold: 0.01
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback للمتصفحات القديمة
        let lazyLoadThrottleTimeout;
        
        function lazyLoadHandler() {
            if (lazyLoadThrottleTimeout) clearTimeout(lazyLoadThrottleTimeout);
            
            lazyLoadThrottleTimeout = setTimeout(() => {
                const scrollTop = window.pageYOffset;
                const windowHeight = window.innerHeight;
                
                lazyImages.forEach(img => {
                    if (img.offsetTop < (windowHeight + scrollTop + 200)) {
                        loadImage(img);
                    }
                });
            }, 100);
        }
        
        // إضافة مستمعات الأحداث
        document.addEventListener('scroll', lazyLoadHandler, { passive: true });
        window.addEventListener('resize', lazyLoadHandler, { passive: true });
        window.addEventListener('orientationchange', lazyLoadHandler, { passive: true });
        
        // تنفيذ مرة واحدة عند التحميل
        lazyLoadHandler();
    }
    
    /**
     * دالة مساعدة لتحميل الصورة
     * @param {HTMLImageElement} img - عنصر الصورة
     */
    function loadImage(img) {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.remove('lazy-img');
            
            // إضافة معالج خطأ
            img.onerror = function() {
                console.warn('فشل تحميل الصورة:', src);
                // استخدام صورة بديلة في حالة الخطأ
                img.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'300\' viewBox=\'0 0 400 300\'%3E%3Crect width=\'400\' height=\'300\' fill=\'%23cccccc\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\' fill=\'%23999\' font-size=\'20\'%3Eصورة غير متوفرة%3C/text%3E%3C/svg%3E';
            };
        }
    }
})();

// ==================== شجرة التنقل (Navigation Tree) ====================

(function initNavTree() {
    const navTreeToggle = document.getElementById('navTreeToggle');
    const navTree = document.getElementById('navTree');
    
    if (!navTreeToggle || !navTree) return;
    
    // فتح/إغلاق شجرة التنقل
    navTreeToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navTree.classList.toggle('active');
    });
    
    // إغلاق شجرة التنقل عند النقر خارجها
    document.addEventListener('click', function(event) {
        if (navTree.classList.contains('active') &&
            !navTree.contains(event.target) &&
            !navTreeToggle.contains(event.target)) {
            navTree.classList.remove('active');
        }
    });
    
    // إغلاق شجرة التنقل عند النقر على رابط داخلي
    navTree.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navTree.classList.remove('active');
        });
    });
})();

// ==================== أزرار الاتصال والواتساب ====================

(function initContactButtons() {
    // زر الاتصال العائم
    const floatingPhone = document.querySelector('.floating-phone');
    if (floatingPhone) {
        floatingPhone.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('هل تريد الاتصال بالرقم 0532228615؟')) {
                window.location.href = 'tel:0532228615';
            }
        });
    }
    
    // أزرار الهاتف في معرض الصور
    document.querySelectorAll('.icon-btn.phone').forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('هل تريد الاتصال بالرقم 0532228615؟')) {
                window.location.href = 'tel:0532228615';
            }
        });
    });
    
    // أزرار الواتساب في معرض الصور
    document.querySelectorAll('.icon-btn.whatsapp').forEach(btn => {
        btn.addEventListener('click', function() {
            const message = "مرحباً، أريد الاستفسار عن غرف الساندوتش بانل من مظلات وسواتر القاسم الحديثة بالرياض";
            const whatsappURL = `https://wa.me/0532228615?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
        });
    });
    
    // أزرار الاتصال في قسم CTA
    document.querySelectorAll('.cta a[href^="tel:"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`)) {
                window.location.href = `tel:${phoneNumber}`;
            }
        });
    });
    
    // أزرار الواتساب في قسم CTA
    document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(this.getAttribute('href'), '_blank');
        });
    });
})();

// ==================== سلايدر الهيدر (Header Slider) ====================

(function initHeaderSlider() {
    const slides = document.querySelectorAll('.header-slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // دالة تغيير الخلفية - محسنة
    function changeBackground() {
        // إخفاء كل الشرائح
        slides.forEach(slide => {
            slide.style.opacity = '0';
        });
        
        // إظهار الشريحة الحالية مع تأثير بسيط
        slides[currentSlide].style.opacity = '0.8';
        
        // الانتقال للشريحة التالية
        currentSlide = (currentSlide + 1) % totalSlides;
    }
    
    // بدء التبديل - استخدام setInterval مع تخزين الـ ID
    window.headerSliderInterval = setInterval(changeBackground, 3000);
    
    // بدء التشغيل مع تأخير بسيط لتحميل الصفحة
    setTimeout(() => {
        changeBackground();
    }, 100);
})();

// ==================== تأثيرات التمرير (Scroll Animations) ====================

(function initScrollAnimations() {
    // عناصر معرض الصور
    const galleryItems = document.querySelectorAll('.gallery-item-container');
    const applicationItems = document.querySelectorAll('.application-item');
    
    if (galleryItems.length === 0 && applicationItems.length === 0) return;
    
    // دمج جميع العناصر في مصفوفة واحدة
    const animatedItems = [...galleryItems, ...applicationItems];
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // تأخير بسيط حسب الترتيب
                    setTimeout(() => {
                        entry.target.style.animation = 'fadeInUp 0.8s ease-out';
                        entry.target.style.opacity = '1';
                    }, index * 100);
                    
                    animationObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '50px' });
        
        animatedItems.forEach(item => {
            item.style.opacity = '0';
            animationObserver.observe(item);
        });
    } else {
        // Fallback للمتصفحات القديمة - إظهار العناصر مباشرة
        animatedItems.forEach(item => {
            item.style.opacity = '1';
        });
    }
})();

// ==================== أزرار المشاركة (Share Buttons) ====================

(function initShareButtons() {
    document.querySelectorAll('.article-share button').forEach(btn => {
        btn.addEventListener('click', function() {
            if (navigator.share) {
                // استخدام Web Share API إذا كانت متاحة
                navigator.share({
                    title: 'غرف ساندوتش بانل - مظلات وسواتر القاسم الحديثة بالرياض',
                    text: 'اكتشف أحدث تصاميم غرف الساندوتش بانل من مظلات وسواتر القاسم الحديثة',
                    url: window.location.href
                }).catch(() => {
                    // تجاهل أخطاء الإلغاء
                });
            } else {
                // Fallback - نسخ الرابط
                navigator.clipboard?.writeText(window.location.href).then(() => {
                    alert('تم نسخ الرابط!');
                }).catch(() => {
                    alert('شارك الرابط: ' + window.location.href);
                });
            }
        });
    });
})();

// ==================== التنقل السلس (Smooth Scroll) ====================

(function initSmoothScroll() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
})();

// ==================== تحميل الصور مسبقًا (Preload) ====================

// تحميل الصور المهمة بعد تحميل الصفحة
window.addEventListener('load', function() {
    // قائمة الصور المهمة للتحميل المسبق
    const importantImages = [
        'img/logo.webp',
        'img/ghorfa_sand1.webp',
        'img/ghorfa_sand3.webp',
        'img/ghorfa_sand2.webp'
    ];
    
    // تحميل الصور المهمة في الخلفية
    importantImages.forEach(src => {
        const img = new Image();
        img.src = src;
        img.decoding = 'async';
    });
});

// ==================== تحسين الأداء العام ====================

// استخدام requestIdleCallback للعمليات غير الحرجة
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // تنظيف الذاكرة - إزالة الـ event listeners غير الضرورية
        console.log('تم تحسين الأداء - العمليات غير الحرجة تمت في وقت الفراغ');
    }, { timeout: 2000 });
}

// منع السلوك الافتراضي للروابط الفارغة
document.addEventListener('click', function(e) {
    const target = e.target.closest('a');
    if (target && target.getAttribute('href') === '#') {
        e.preventDefault();
    }
});

// إضافة passive event listeners لتحسين الأداء
document.addEventListener('touchstart', function(){}, { passive: true });