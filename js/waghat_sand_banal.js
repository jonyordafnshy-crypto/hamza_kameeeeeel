/**
 * waghat_sand_banal.js - نسخة محسنة للأداء
 * جميع الوظائف محفوظة كما هي، تم تحسين الأداء فقط
 */

// تهيئة الصفحة عند اكتمال تحميل DOM
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // تهيئة Lazy Loading المحسن
    initOptimizedLazyLoading();
    
    // تهيئة السلايدر
    initHeaderSlider();
    
    // تهيئة شجرة التنقل
    initNavTree();
    
    // تهيئة الأزرار التفاعلية
    initInteractiveButtons();
    
    // تحسين تجربة اللمس للأجهزة المحمولة
    initTouchOptimizations();
});

/**
 * تهيئة Lazy Loading محسن باستخدام Intersection Observer
 * مع دعم المتصفحات القديمة
 */
function initOptimizedLazyLoading() {
    // التحقق من وجود IntersectionObserver
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px', // تحميل الصور قبل 200px من ظهورها
            threshold: 0.01
        });

        // مراقبة جميع الصور مع lazy loading
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            if (img.dataset.src || img.src) {
                imageObserver.observe(img);
            }
        });
    } else {
        // Fallback للمتصفحات القديمة
        loadImagesLegacy();
    }
}

/**
 * تحميل صورة واحدة
 */
function loadImage(img) {
    if (img.dataset.src && img.src !== img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    }
}

/**
 * طريقة بديلة للمتصفحات القديمة
 */
function loadImagesLegacy() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    function lazyLoad() {
        lazyImages.forEach(img => {
            if (img.getBoundingClientRect().top <= window.innerHeight + 200) {
                loadImage(img);
            }
        });
    }
    
    // تحميل الصور الظاهرة حالياً
    lazyLoad();
    
    // مراقبة التمرير
    window.addEventListener('scroll', throttle(lazyLoad, 200));
    window.addEventListener('resize', throttle(lazyLoad, 200));
}

/**
 * دالة throttle لتقليل عدد مرات تنفيذ الدالة
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * تهيئة سلايدر الهيدر
 */
function initHeaderSlider() {
    const slides = document.querySelectorAll('.header-slide');
    if (!slides.length) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // دالة تغيير الخلفية
    function changeSlide() {
        // إخفاء كل الشرائح
        slides.forEach(slide => {
            slide.style.opacity = '0';
        });
        
        // إظهار الشريحة الحالية
        slides[currentSlide].style.opacity = '0.80';
        
        // الانتقال للشريحة التالية
        currentSlide = (currentSlide + 1) % totalSlides;
    }
    
    // بدء التشغيل
    changeSlide();
    setInterval(changeSlide, 3000);
    
    // تحميل مسبق لصور السلايدر (بعد تحميل الصفحة)
    window.addEventListener('load', function() {
        preloadImages([
            'img/sand_banal10.webp',
            'img/sand_banal11.webp',
            'img/sand_banal12.webp'
        ]);
    });
}

/**
 * تحميل مسبق للصور
 */
function preloadImages(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

/**
 * تهيئة شجرة التنقل
 */
function initNavTree() {
    const toggleBtn = document.getElementById('navTreeToggle');
    const navTree = document.getElementById('navTree');
    
    if (!toggleBtn || !navTree) return;
    
    // فتح/إغلاق شجرة التنقل
    toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navTree.classList.toggle('active');
    });
    
    // إغلاق عند النقر خارجها
    document.addEventListener('click', function(event) {
        if (navTree.classList.contains('active') &&
            !navTree.contains(event.target) &&
            !toggleBtn.contains(event.target)) {
            navTree.classList.remove('active');
        }
    });
    
    // إغلاق عند النقر على رابط داخلي
    navTree.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navTree.classList.remove('active');
        });
    });
}

/**
 * تهيئة الأزرار التفاعلية
 */
function initInteractiveButtons() {
    // زر الاتصال العائم
    const phoneBtn = document.querySelector('.floating-phone');
    if (phoneBtn) {
        phoneBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('هل تريد الاتصال بالرقم 0532228615؟')) {
                window.location.href = 'tel:0532228615';
            }
        });
    }
    
    // زر العودة للرئيسية
    const backBtn = document.querySelector('.back-to-home');
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
}

/**
 * تحسين تجربة اللمس للأجهزة المحمولة
 */
function initTouchOptimizations() {
    if ('ontouchstart' in window) {
        const buttons = document.querySelectorAll('.floating-phone, .nav-tree-btn, .back-to-home, .icon-btn');
        buttons.forEach(btn => {
            btn.style.touchAction = 'manipulation';
            btn.style.userSelect = 'none';
            btn.style.webkitTapHighlightColor = 'transparent';
        });
    }
}

/**
 * دوال مساعدة (محفوظة للتوافق)
 */
function callNumber(phoneNumber) {
    if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`)) {
        window.location.href = `tel:${phoneNumber}`;
    }
}

function whatsappMessage(phoneNumber) {
    const message = "مرحباً، أريد الاستفسار عن واجهات الساندوتش بانل الجاهزة - مظلات وسواتر القاسم الحديثة";
    const whatsappURL = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// تنفيذ التمرير السلس للروابط الداخلية (إذا وجدت)
document.addEventListener('DOMContentLoaded', function() {
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
});