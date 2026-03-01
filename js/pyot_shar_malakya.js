/**
 * ملف JavaScript المحسن لصفحة بيوت شعر ملكية
 * تم تحسين الأداء مع الحفاظ على جميع الوظائف
 * Web Performance Optimization - Alqasm.com
 */

// تهيئة المتغيرات العامة في نطاق واحد لتقليل استهلاك الذاكرة
(function() {
    'use strict';

    /**
     * تحميل الصور باستخدام Intersection Observer (Lazy Loading محسن)
     * تم تبسيط الكود وإزالة العمليات غير الضرورية
     */
    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if (!images.length) return;

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        // تحميل الصورة فقط إذا كانت لا تزال في طور التحميل
                        if (!img.complete) {
                            img.classList.add('loaded');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '100px 0px', // زيادة مسافة التحميل المسبق لتحسين تجربة المستخدم
                threshold: 0.01
            });

            // استخدام forEach بدلاً من for...of للتوافقية العالية والأداء
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback للمتصفحات القديمة - تحميل فوري
            images.forEach(img => {
                if (img.dataset.src) img.src = img.dataset.src;
            });
        }
    }

    /**
     * تبديل خلفيات الهيدر - محسنة للأداء
     * استخدام requestAnimationFrame لتحسين أداء الرسوم المتحركة
     */
    function initHeaderSlider() {
        const slides = document.querySelectorAll('.header-slide');
        if (!slides.length) return;

        let currentSlide = 0;
        const totalSlides = slides.length;

        // تحميل مسبق للصور (تم بالفعل في Preload)
        // دالة تغيير الخلفية محسنة
        function changeBackground() {
            // إخفاء جميع الشرائح في خطوة واحدة
            for (let i = 0; i < totalSlides; i++) {
                slides[i].style.opacity = '0';
            }
            
            // إظهار الشريحة الحالية
            slides[currentSlide].style.opacity = '0.80';
            
            // الانتقال للشريحة التالية
            currentSlide = (currentSlide + 1) % totalSlides;
            
            // جدولة التغيير التالي
            setTimeout(() => {
                requestAnimationFrame(changeBackground);
            }, 3000);
        }

        // بدء التبديل بعد تأخير بسيط لضمان تحميل الصفحة
        setTimeout(() => {
            requestAnimationFrame(changeBackground);
        }, 100);
    }

    /**
     * تهيئة جميع الأحداث - دالة موحدة
     */
    function initEventListeners() {
        // دوال الاتصال - معلنة كدوال مساعدة
        window.callNumber = function(phoneNumber) {
            if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`)) {
                window.location.href = `tel:${phoneNumber}`;
            }
        };

        window.whatsappMessage = function(phoneNumber) {
            const message = "مرحباً، أريد الاستفسار عن البيوت شعر ملكية من مظلات وسواتر القاسم الحديثة الرياض 0532228615";
            window.open(`https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
        };

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

        // زر العودة للرئيسية
        const backButton = document.querySelector('.back-to-home');
        if (backButton) {
            backButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'index.html';
            });
        }

        // شجرة التنقل
        const navTreeToggle = document.getElementById('navTreeToggle');
        const navTree = document.getElementById('navTree');

        if (navTreeToggle && navTree) {
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
                link.addEventListener('click', () => navTree.classList.remove('active'));
            });
        }
    }

    /**
     * تهيئة الصفحة بعد تحميل DOM
     */
    function init() {
        initLazyLoading();
        initHeaderSlider();
        initEventListeners();
    }

    // تشغيل التهيئة بعد تحميل DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM جاهز بالفعل
        init();
    }

})(); // نهاية النطاق المغلق