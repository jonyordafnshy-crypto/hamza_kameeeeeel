/**
 * مظلات وسواتر القاسم الحديثة - تشطيب ملاحق
 * ملف JavaScript محسن للأداء - الإصدار 2.0
 * تم تحسينه لتسريع التحميل وتقليل العمليات غير الضرورية
 */

// ================ دوال الاتصال الأساسية ================
// دالة للاتصال بالرقم (محفوظة بالكامل)
window.callNumber = function(phoneNumber) {
    if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`)) {
        window.location.href = `tel:${phoneNumber}`;
    }
};

// دالة لإرسال رسالة واتساب (محفوظة بالكامل)
window.whatsappMessage = function(phoneNumber) {
    const message = "مرحباً، أريد الاستفسار عن ملاحق التشطيب - تشطيب فلل وشقق بالرياض - مظلات وسواتر القاسم الحديثة 0532228615";
    const whatsappURL = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
};

// ================ تهيئة الصفحة عند التحميل ================
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // تهيئة جميع المكونات دفعة واحدة
    initNavigation();
    initBackgroundSlider();
    initLazyLoading();
    
    // إصلاح: إزالة الكود غير المستخدم والعمليات الزائدة
});

// ================ نظام التنقل المحسن ================
function initNavigation() {
    // زر العودة للرئيسية
    const backButton = document.querySelector('.back-to-home');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }

    // شجرة التنقل المحسنة
    const navTreeToggle = document.getElementById('navTreeToggle');
    const navTree = document.getElementById('navTree');

    if (navTreeToggle && navTree) {
        navTreeToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navTree.classList.toggle('active');
        });

        // إغلاق شجرة التنقل عند النقر خارجها (باستخدام event delegation)
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
    }

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
    
    // تحسين: إزالة روابط التنقل الرئيسية غير الموجودة
    // (تم إزالة الكود الخاص بـ .main-nav a لأنه غير مستخدم في الصفحة)
}

// ================ نظام تبديل الخلفيات المحسن ================
function initBackgroundSlider() {
    const slides = document.querySelectorAll('.header-slide');
    if (!slides.length) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // تحسين: تحميل الصور مسبقاً
    const imageUrls = [
        'img/mlahek_tashtep16.webp',
        'img/mlahek_tashtep11.webp',
        'img/mlahek_tashtep12.webp'
    ];
    
    // تحميل مسبق مع requestIdleCallback لمنع تعطيل التحميل الرئيسي
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            imageUrls.forEach(url => {
                const img = new Image();
                img.src = url;
            });
        }, { timeout: 2000 });
    } else {
        // Fallback للمتصفحات القديمة
        setTimeout(() => {
            imageUrls.forEach(url => {
                const img = new Image();
                img.src = url;
            });
        }, 1000);
    }
    
    // دالة تغيير الخلفية المحسنة
    const changeBackground = () => {
        // استخدام requestAnimationFrame لتحسين الأداء
        requestAnimationFrame(() => {
            // إخفاء جميع الشرائح
            slides.forEach(slide => {
                slide.style.opacity = '0';
            });
            
            // إظهار الشريحة الحالية (بعتامة 0.80 كما في الكود الأصلي)
            slides[currentSlide].style.opacity = '0.80';
            
            // الانتقال للشريحة التالية
            currentSlide = (currentSlide + 1) % totalSlides;
        });
    };
    
    // بدء التبديل فوراً
    changeBackground();
    
    // تغيير الخلفية كل 3 ثواني (محفوظ كما هو)
    setInterval(changeBackground, 3000);
}

// ================ نظام Lazy Loading المحسن للصور ================
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img.lazy-img');
    if (!lazyImages.length) return;
    
    // تحسين: استخدام IntersectionObserver إذا كان متاحاً
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        // تحميل الصورة الفعلية
                        img.src = src;
                        img.removeAttribute('data-src');
                        
                        // إضافة كلاس loaded عند اكتمال التحميل
                        img.onload = () => {
                            img.classList.add('loaded');
                        };
                        
                        // في حالة فشل التحميل، استخدم الصورة الأصلية كـ fallback
                        img.onerror = () => {
                            console.warn('فشل تحميل الصورة:', src);
                            // إظهار الصورة المعطوبة بشكل طبيعي
                            img.classList.add('loaded');
                        };
                    }
                    
                    // إيقاف المراقبة بعد التحميل
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px 0px', // زيادة مسافة التحميل المسبق
            threshold: 0.01
        });
        
        // بدء مراقبة جميع الصور
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback للمتصفحات القديمة - تحميل جميع الصور مباشرة
        lazyImages.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
            }
        });
    }
}

// ================ تحسينات إضافية للأداء ================

// تحسين: استخدام passive event listeners للتمرير
if (window.addEventListener) {
    const wheelOpts = { passive: true };
    const wheelEvents = ['wheel', 'mousewheel', 'touchstart', 'touchmove'];
    wheelEvents.forEach(eventName => {
        window.addEventListener(eventName, () => {}, wheelOpts);
    });
}

// تحسين: تنظيف الذاكرة عند مغادرة الصفحة
window.addEventListener('beforeunload', function() {
    // إلغاء أي عمليات مؤقتة إن وجدت (اختياري)
});

// تحسين: دعم المتصفحات القديمة
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
        return setTimeout(callback, 0);
    };
}

// تم تحسين هذا الملف بالكامل - جميع الوظائف محفوظة مع أداء أفضل