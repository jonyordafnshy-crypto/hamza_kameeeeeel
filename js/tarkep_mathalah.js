/**
 * ملف: tarkep_mathalah.js
 * تحسين السرعة: 
 * 1. تقليل العمليات الحسابية غير الضرورية
 * 2. استخدام requestAnimationFrame للتحسين
 * 3. تحميل الأحداث بشكل أكثر كفاءة
 * 4. الحفاظ على كل الدوال كما هي
 * 5. إضافة caching للعناصر المتكررة
 */

// تحسين 1: استخدام IIFE لتجنب التصادم مع المتغيرات العالمية
(function() {
    'use strict';

    // تحسين 2: تخزين المراجع للعناصر المتكررة (caching)
    let cachedImages = null;
    let cachedFloatingPhone = null;
    let cachedBackButton = null;
    let cachedNavTreeToggle = null;
    let cachedNavTree = null;
    let cachedSlides = null;
    let currentSlide = 0;
    let totalSlides = 0;
    let slideInterval = null;

    // تحسين 3: تنفيذ الكود بعد تحميل DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM جاهز بالفعل
        init();
    }

    // تحسين 4: دالة التهيئة الرئيسية
    function init() {
        // تحميل الصور بال lazy loading
        initLazyLoading();
        
        // تعريف الدوال العامة (يجب أن تكون في window لتتوفر للأزرار)
        window.callNumber = callNumber;
        window.whatsappMessage = whatsappMessage;
        
        // تهيئة العناصر
        cacheElements();
        initFloatingPhone();
        initBackButton();
        initNavTree();
        initHeaderSlider();
        preloadHeaderImages();
        
        // تحسين الأداء عند تحميل الصفحة
        window.addEventListener('load', onPageLoad);
    }

    // تحسين 5: تخزين العناصر لتجنب البحث المتكرر في DOM
    function cacheElements() {
        cachedFloatingPhone = document.querySelector('.floating-phone');
        cachedBackButton = document.querySelector('.back-to-home');
        cachedNavTreeToggle = document.getElementById('navTreeToggle');
        cachedNavTree = document.getElementById('navTree');
        cachedSlides = document.querySelectorAll('.header-slide');
        
        if (cachedSlides) {
            totalSlides = cachedSlides.length;
        }
    }

    // تحسين 6: Lazy Loading محسّن للصور
    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if (!images.length) return;

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        // تحسين: التأكد من أن الصورة ليست محملة بالفعل
                        if (!img.classList.contains('loaded')) {
                            // الصورة لها src بالفعل - لا حاجة لتغيير
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            }, {
                rootMargin: '50px 0px', // تحميل الصور قبل ظهورها بـ 50px
                threshold: 0.01
            });

            images.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback للمتصفحات القديمة
            images.forEach(img => {
                img.classList.add('loaded');
            });
        }
    }

    // تحسين 7: دالة الاتصال بالرقم (مبقاة كما هي)
    function callNumber(phoneNumber) {
        if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`)) {
            window.location.href = `tel:${phoneNumber}`;
        }
    }

    // تحسين 8: دالة إرسال واتساب (مبقاة كما هي)
    function whatsappMessage(phoneNumber) {
        const message = "مرحباً، أريد الاستفسار عن تركيب مظلات وسواتر من مظلات وسواتر القاسم الحديثة الرياض";
        const whatsappURL = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    }

    // تحسين 9: زر الاتصال العائم
    function initFloatingPhone() {
        if (!cachedFloatingPhone) return;
        
        cachedFloatingPhone.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('هل تريد الاتصال بالرقم 0532228615؟')) {
                window.location.href = 'tel:0532228615';
            }
        });
    }

    // تحسين 10: زر العودة للرئيسية
    function initBackButton() {
        if (!cachedBackButton) return;
        
        cachedBackButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }

    // تحسين 11: شجرة التنقل
    function initNavTree() {
        if (!cachedNavTreeToggle || !cachedNavTree) return;

        cachedNavTreeToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            cachedNavTree.classList.toggle('active');
        });

        // إغلاق شجرة التنقل عند النقر خارجها
        document.addEventListener('click', function(event) {
            if (cachedNavTree.classList.contains('active') &&
                !cachedNavTree.contains(event.target) &&
                !cachedNavTreeToggle.contains(event.target)) {
                cachedNavTree.classList.remove('active');
            }
        });

        // إغلاق شجرة التنقل عند النقر على رابط داخلي
        const navLinks = cachedNavTree.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                cachedNavTree.classList.remove('active');
            });
        });
    }

    // تحسين 12: تغيير خلفية الهيدر
    function initHeaderSlider() {
        if (!cachedSlides || cachedSlides.length === 0) return;

        // إظهار الشريحة الأولى
        cachedSlides.forEach((slide, index) => {
            slide.style.opacity = index === 0 ? '1' : '0';
        });

        // تغيير الخلفية كل 3 ثواني
        slideInterval = setInterval(changeBackground, 3000);
    }

    function changeBackground() {
        if (!cachedSlides || cachedSlides.length === 0) return;

        // إخفاء كل الشرائح
        cachedSlides.forEach(slide => {
            slide.style.opacity = '0';
        });

        // إظهار الشريحة الحالية
        if (cachedSlides[currentSlide]) {
            cachedSlides[currentSlide].style.opacity = '0.80';
        }

        // الانتقال للشريحة التالية
        currentSlide = (currentSlide + 1) % totalSlides;
    }

    // تحسين 13: تحميل مسبق لصور الهيدر
    function preloadHeaderImages() {
        const imageUrls = [
            'img/tarkep_mathalah10.webp',
            'img/tarkep_mathalah11.webp',
            'img/tarkep_mathalah12.webp'
        ];

        // استخدام requestIdleCallback للتحميل عندما يكون المتصفح خاملاً
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                imageUrls.forEach(url => {
                    const img = new Image();
                    img.src = url;
                });
            }, { timeout: 2000 });
        } else {
            // Fallback
            setTimeout(() => {
                imageUrls.forEach(url => {
                    const img = new Image();
                    img.src = url;
                });
            }, 1000);
        }
    }

    // تحسين 14: عند تحميل الصفحة بالكامل
    function onPageLoad() {
        // إضافة فئة لتحسين الأداء
        document.body.classList.add('page-loaded');
        
        // إيقاف الأنيميشن إذا كانت الصفحة مخفية (تحسين البطارية)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                if (slideInterval) {
                    clearInterval(slideInterval);
                    slideInterval = null;
                }
            } else {
                if (!slideInterval && cachedSlides && cachedSlides.length > 0) {
                    slideInterval = setInterval(changeBackground, 3000);
                }
            }
        });
    }

    // تحسين 15: استخدام requestAnimationFrame للتمرير
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                // يمكن إضافة كود هنا إذا لزم الأمر
                ticking = false;
            });
            ticking = true;
        }
    });

})();