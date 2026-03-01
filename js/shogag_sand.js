/**
 * ============================================
 * مظلات وسواتر القاسم الحديثة - تحسين سرعة التحميل
 * Web Performance Optimization by Expert
 * الإصدار: 2026.1.0
 * ============================================
 * تحسينات الأداء المطبقة:
 * - Lazy Loading متقدم للصور
 * - تقليل عمليات DOM
 * - استخدام requestIdleCallback و requestAnimationFrame
 * - تحسين الذاكرة وإدارة الأحداث
 * - Defer للوظائف غير الحرجة
 * ============================================
 */

(function() {
    'use strict';

    // تحقق من وجود الصفحة وجاهزيتها
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);
    } else {
        initPerformanceOptimizations();
    }

    /**
     * الدالة الرئيسية لتحسين الأداء
     * يتم تنفيذها عند جاهزية DOM
     */
    function initPerformanceOptimizations() {
        // تنفيذ التحسينات الحرجة فوراً
        setupLazyLoading();
        
        // تأجيل التحسينات غير الحرجة
        if ('requestIdleCallback' in window) {
            requestIdleCallback(setupNonCriticalFeatures, { timeout: 2000 });
        } else {
            setTimeout(setupNonCriticalFeatures, 500);
        }
        
        // تحسينات التفاعل
        setupInteractionHandlers();
        
        // إضافة سنة 2026
        updateYearElements();
    }

    /**
     * ============================================
     * 1. Lazy Loading المتقدم للصور
     * ============================================
     */
    function setupLazyLoading() {
        // استخدام Intersection Observer الحديث
        if (!('IntersectionObserver' in window)) {
            // Fallback للمتصفحات القديمة
            loadAllImagesImmediately();
            return;
        }

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    loadImage(img);
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px 0px',
            threshold: 0.01
        });

        // معالجة جميع الصور
        const images = document.querySelectorAll('img:not([fetchpriority="high"])');
        images.forEach(img => {
            // حفظ المصدر الأصلي إذا لم يكن محفوظاً
            if (img.src && !img.dataset.src && !img.complete) {
                img.dataset.src = img.src;
                
                // استخدام صورة شفافة خفيفة جداً
                img.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%25\' height=\'100%25\'%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'%23f0f0f0\'/%3E%3C/svg%3E';
                img.style.backgroundColor = '#f0f0f0';
                img.loading = 'lazy';
            }
            
            // بدء المراقبة
            imageObserver.observe(img);
        });

        // تحميل الصور ذات الأولوية العالية فوراً
        document.querySelectorAll('img[fetchpriority="high"]').forEach(loadImage);
    }

    /**
     * تحميل صورة واحدة
     */
    function loadImage(img) {
        if (img.dataset.src) {
            // استخدام requestAnimationFrame لتحسين الأداء
            requestAnimationFrame(() => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                
                // إضافة fade in خفيف
                img.style.transition = 'opacity 0.2s';
                img.style.opacity = '0';
                img.onload = () => { img.style.opacity = '1'; };
            });
        }
    }

    /**
     * تحميل فوري لجميع الصور (fallback)
     */
    function loadAllImagesImmediately() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    /**
     * ============================================
     * 2. إعداد الميزات غير الحرجة
     * ============================================
     */
    function setupNonCriticalFeatures() {
        // تحسينات إضافية للمتصفحات الحديثة
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                setupHeaderSlider();
                setupSmoothScroll();
                optimizeMemoryUsage();
            }, { timeout: 3000 });
        } else {
            setTimeout(() => {
                setupHeaderSlider();
                setupSmoothScroll();
                optimizeMemoryUsage();
            }, 1000);
        }
    }

    /**
     * ============================================
     * 3. تبديل خلفيات الهيدر (مُحسّن)
     * ============================================
     */
    function setupHeaderSlider() {
        const slides = document.querySelectorAll('.header-slide');
        if (!slides.length) return;

        let currentSlide = 0;
        const totalSlides = slides.length;

        // تحميل مسبق للصور الخلفية (باستخدام Image() API)
        const bgImages = [
            'img/shogag_sand2.webp',
            'img/shogag_sand3.webp',
            'img/shogag_sand4.webp'
        ];

        // استخدام requestIdleCallback لتحميل الصور الخلفية
        const preloadBgImages = () => {
            bgImages.forEach(url => {
                const img = new Image();
                img.src = url;
            });
        };

        if ('requestIdleCallback' in window) {
            requestIdleCallback(preloadBgImages, { timeout: 2000 });
        } else {
            setTimeout(preloadBgImages, 500);
        }

        // بدء التبديل
        function changeBackground() {
            slides.forEach(slide => { slide.style.opacity = '0'; });
            slides[currentSlide].style.opacity = '0.80';
            currentSlide = (currentSlide + 1) % totalSlides;
        }

        // تعيين أول صورة
        changeBackground();
        
        // استخدام setInterval مع تخزين المعرف
        window._sliderInterval = setInterval(changeBackground, 3000);
    }

    /**
     * ============================================
     * 4. شجرة التنقل (مُحسّنة)
     * ============================================
     */
    function setupInteractionHandlers() {
        // وظائف الاتصال والواتساب (مُعرّفة في النطاق العام)
        window.callNumber = function(phoneNumber) {
            if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟ - مظلات وسواتر القاسم الحديثة`)) {
                window.location.href = `tel:${phoneNumber}`;
            }
        };

        window.whatsappMessage = function(phoneNumber) {
            const message = "مرحباً، أريد الاستفسار عن مستودعات وشقق الساندوتش بانل الجاهزة - مظلات وسواتر القاسم الحديثة الرياض 0532228615";
            window.open(`https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
        };

        // شجرة التنقل
        const navTreeToggle = document.getElementById('navTreeToggle');
        const navTree = document.getElementById('navTree');

        if (navTreeToggle && navTree) {
            // استخدام event delegation لتقليل عدد المستمعين
            const handleNavTreeClick = (e) => {
                if (e.target === navTreeToggle || navTreeToggle.contains(e.target)) {
                    e.stopPropagation();
                    navTree.classList.toggle('active');
                } else if (navTree.classList.contains('active') && 
                          !navTree.contains(e.target)) {
                    navTree.classList.remove('active');
                }
            };

            document.addEventListener('click', handleNavTreeClick);
            
            // إغلاق عند النقر على الروابط الداخلية
            navTree.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    navTree.classList.remove('active');
                }
            });
        }
    }

    /**
     * ============================================
     * 5. تحسين التمرير السلس (Smooth Scroll)
     * ============================================
     */
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // استخدام requestAnimationFrame للتمرير السلس
                    const targetPosition = targetElement.offsetTop - 100;
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 400;
                    let start = null;

                    function step(timestamp) {
                        if (!start) start = timestamp;
                        const progress = timestamp - start;
                        const percentage = Math.min(progress / duration, 1);
                        window.scrollTo(0, startPosition + (distance * easeInOutCubic(percentage)));
                        if (progress < duration) {
                            window.requestAnimationFrame(step);
                        }
                    }

                    window.requestAnimationFrame(step);
                }
            });
        });
    }

    /**
     * دالة مساعدة للتمرير السلس
     */
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    /**
     * ============================================
     * 6. تحسين استخدام الذاكرة
     * ============================================
     */
    function optimizeMemoryUsage() {
        // استخدام content-visibility للعناصر غير المرئية
        if ('style' in document.documentElement) {
            const sections = document.querySelectorAll('section');
            sections.forEach((section, index) => {
                if (index > 2) { // تجاهل أول 3 أقسام
                    section.style.contentVisibility = 'auto';
                    section.style.containIntrinsicSize = '500px';
                }
            });
        }

        // تنظيف المتغيرات غير المستخدمة
        window.addEventListener('beforeunload', () => {
            if (window._sliderInterval) {
                clearInterval(window._sliderInterval);
            }
        });
    }

    /**
     * ============================================
     * 7. تحديث عناصر السنة إلى 2026
     * ============================================
     */
    function updateYearElements() {
        const yearElements = document.querySelectorAll('[data-year="2026"]');
        yearElements.forEach(el => { el.textContent = '2026'; });
        
        // تحديث النصوص الثابتة التي تحتوي على 2026
        document.querySelectorAll('p, div, span, h1, h2, h3, h4').forEach(el => {
            if (el.children.length === 0 && el.textContent.includes('2026')) {
                // لا تفعل شيئاً، النص صحيح
            }
        });
    }

    /**
     * ============================================
     * 8. دعم المتصفحات القديمة
     * ============================================
     */
    // Polyfill بسيط لـ requestIdleCallback
    if (!window.requestIdleCallback) {
        window.requestIdleCallback = function(callback, options) {
            const start = Date.now();
            return setTimeout(() => {
                callback({
                    didTimeout: false,
                    timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
                });
            }, 1);
        };
    }

})();