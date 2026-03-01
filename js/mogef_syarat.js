/**
 * مظلات وسواتر القاسم الحديثة - alqasm.com
 * JavaScript محسن وموحد - نسخة فائقة السرعة
 * جميع الحقوق محفوظة 2026
 */

(function(w, d) {
    "use strict";
    
    // ===============================================
    // دوال عامة للاستخدام المباشر من HTML
    // ===============================================
    
    /**
     * دالة الاتصال الهاتفي
     */
    w.callNumber = function(phone) {
        if (confirm(`هل تريد الاتصال بالرقم ${phone}؟`)) {
            w.location.href = `tel:${phone}`;
        }
    };
    
    /**
     * دالة إرسال رسالة واتساب
     */
    w.whatsappMessage = function(phone) {
        const message = "مرحباً، أريد الاستفسار عن مواقف السيارات ساندوتش بانل";
        const cleanPhone = phone.replace('+', '').replace(/[^0-9]/g, '');
        w.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
    };

    // ===============================================
    // تهيئة الصفحة عند التحميل
    // ===============================================
    
    if (d.readyState === 'loading') {
        d.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ===============================================
    // الدالة الرئيسية - تحتوي على كل الوظائف
    // ===============================================
    
    function init() {
        // تهيئة Lazy Loading للصور
        initLazyLoading();
        
        // تهيئة سلايدر الهيدر
        initHeaderSlider();
        
        // تهيئة شجرة التنقل
        initNavTree();
        
        // تهيئة التنقل السلس
        initSmoothScroll();
        
        // تهيئة الأزرار والروابط
        initButtons();
        
        // تهيئة تحميل الصور المسبق
        initPreload();
    }

    // ===============================================
    // Lazy Loading للصور
    // ===============================================
    
    function initLazyLoading() {
        if (w.IntersectionObserver) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            }, { 
                rootMargin: '100px 0px',
                threshold: 0.01 
            });
            
            d.querySelectorAll('img.lazy-img').forEach(img => observer.observe(img));
        } else {
            // Fallback للمتصفحات القديمة
            d.querySelectorAll('img.lazy-img').forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        }
    }

    // ===============================================
    // سلايدر الهيدر المتحرك
    // ===============================================
    
    function initHeaderSlider() {
        const slides = d.querySelectorAll('.header-slide');
        if (!slides.length) return;
        
        let currentSlide = 0;
        
        // عرض الشريحة الأولى
        slides.forEach((slide, index) => {
            slide.style.opacity = index === 0 ? '1' : '0';
        });
        
        // تبديل الشرائح كل 3 ثواني
        setInterval(() => {
            slides.forEach(slide => slide.style.opacity = '0');
            slides[currentSlide].style.opacity = '0.80';
            currentSlide = (currentSlide + 1) % slides.length;
        }, 3000);
    }

    // ===============================================
    // شجرة التنقل
    // ===============================================
    
    function initNavTree() {
        const toggleBtn = d.getElementById('navTreeToggle');
        const navTree = d.getElementById('navTree');
        
        if (!toggleBtn || !navTree) return;
        
        // فتح/غلق شجرة التنقل
        toggleBtn.onclick = function(e) {
            e.stopPropagation();
            navTree.classList.toggle('active');
        };
        
        // إغلاق عند النقر خارجها
        d.addEventListener('click', function(e) {
            if (navTree.classList.contains('active') && 
                !navTree.contains(e.target) && 
                e.target !== toggleBtn) {
                navTree.classList.remove('active');
            }
        });
        
        // إغلاق عند النقر على أي رابط داخل الشجرة
        navTree.querySelectorAll('a').forEach(link => {
            link.onclick = function() {
                navTree.classList.remove('active');
            };
        });
    }

    // ===============================================
    // التنقل السلس للروابط الداخلية
    // ===============================================
    
    function initSmoothScroll() {
        d.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
            link.onclick = function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = d.getElementById(targetId);
                
                if (targetElement) {
                    w.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            };
        });
    }

    // ===============================================
    // تهيئة جميع الأزرار
    // ===============================================
    
    function initButtons() {
        // زر العودة للرئيسية
        const backBtn = d.querySelector('.back-to-home');
        if (backBtn) {
            backBtn.onclick = function(e) {
                e.preventDefault();
                w.location.href = 'index.html';
            };
        }
        
        // زر الاتصال العائم
        const floatPhone = d.querySelector('.floating-phone');
        if (floatPhone) {
            floatPhone.onclick = function(e) {
                e.preventDefault();
                if (confirm('هل تريد الاتصال بالرقم 0532228615؟')) {
                    w.location.href = 'tel:0532228615';
                }
            };
        }
        
        // أزرار الاتصال في معرض الصور
        d.querySelectorAll('.icon-btn.phone').forEach(btn => {
            btn.onclick = function() {
                if (confirm('هل تريد الاتصال بالرقم 0532228615؟')) {
                    w.location.href = 'tel:0532228615';
                }
            };
        });
        
        // أزرار الواتساب في معرض الصور
        d.querySelectorAll('.icon-btn.whatsapp').forEach(btn => {
            btn.onclick = function() {
                const message = encodeURIComponent('مرحباً، أريد الاستفسار عن مواقف السيارات ساندوتش بانل');
                w.open(`https://wa.me/966532228615?text=${message}`, '_blank');
            };
        });
        
        // زر الواتساب العائم (السفلي)
        const whatsappFloat = d.querySelector('[onclick*="wa.me"]');
        if (whatsappFloat) {
            whatsappFloat.onclick = function() {
                w.open('https://wa.me/966532228615?text=' + 
                    encodeURIComponent('مرحباً، أريد الاستفسار عن مواقف السيارات ساندوتش بانل'), '_blank');
            };
        }
    }

    // ===============================================
    // تحميل مسبق للصور المهمة
    // ===============================================
    
    function initPreload() {
        const criticalImages = [
            'img/logo.webp',
            'img/mogef_syarat1.webp',
            'img/mogef_syarat2.webp',
            'img/mogef_syarat3.webp'
        ];
        
        const preloadTask = function() {
            criticalImages.forEach(src => {
                const img = new Image();
                img.src = src;
            });
        };
        
        if (w.requestIdleCallback) {
            w.requestIdleCallback(preloadTask, { timeout: 2000 });
        } else if (w.requestAnimationFrame) {
            w.requestAnimationFrame(preloadTask);
        } else {
            setTimeout(preloadTask, 500);
        }
    }

    // ===============================================
    // دوال مساعدة (اختيارية)
    // ===============================================
    
    // دالة للبحث عن عنصر
    w.$ = function(selector) {
        return d.querySelector(selector);
    };
    
    // دالة للبحث عن عدة عناصر
    w.$$ = function(selector) {
        return d.querySelectorAll(selector);
    };

})(window, document);