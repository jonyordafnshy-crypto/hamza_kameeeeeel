/**
 * ملف JavaScript المحسن لصفحة أبواب حديد
 * تم تحسين الأداء عن طريق:
 * 1. دمج الوظائف المتشابهة
 * 2. تقليل عمليات DOM غير الضرورية
 * 3. تحسين معالجة الأحداث
 * 4. تخزين المراجع للعناصر لتقليل الاستعلامات
 * 5. تحسين Lazy Loading
 */

// تنفيذ بعد تحميل DOM بالكامل
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ================ تهيئة المتغيرات العامة ================
    const phoneNumber = '0532228615';
    const fullPhoneNumber = '+966532228615';
    
    // ================ Lazy Loading محسن للصور ================
    function initLazyLoading() {
        const images = document.querySelectorAll('img.lazy-img, img[loading="lazy"]');
        
        if (images.length === 0) return;
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            img.classList.add('loaded');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            }, { rootMargin: '100px 0px', threshold: 0.05 });
            
            images.forEach(img => {
                // تخزين المصدر الأصلي إذا لم يكن موجوداً
                if (!img.dataset.src && img.src && !img.src.includes('data:image')) {
                    img.dataset.src = img.src;
                    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"%3E%3Crect width="600" height="400" fill="%23f0f0f0"/%3E%3C/svg%3E';
                }
                
                if (img.dataset.src) {
                    imageObserver.observe(img);
                }
            });
        } else {
            // Fallback للمتصفحات القديمة
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.loading = 'eager';
            });
        }
    }
    
    // ================ خلفية متحركة محسنة ================
    function initBackgroundSlider() {
        const slides = document.querySelectorAll('.header-slide');
        if (slides.length === 0) return;
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        // تحميل مسبق للصور
        const imageUrls = ['img/abwab_haded9.webp', 'img/abwab_22.webp', 'img/abwab_25.webp'];
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
        
        // دالة تغيير الخلفية
        function changeBackground() {
            slides.forEach(slide => { slide.style.opacity = '0'; });
            slides[currentSlide].style.opacity = '0.80';
            currentSlide = (currentSlide + 1) % totalSlides;
        }
        
        // بدء التبديل
        changeBackground();
        setInterval(changeBackground, 3000);
    }
    
    // ================ دوال الاتصال ================
    window.callNumber = function(number) {
        if (confirm(`هل تريد الاتصال بالرقم ${number}؟`)) {
            window.location.href = `tel:${number}`;
        }
    };
    
    window.whatsappMessage = function(number) {
        const message = "مرحباً، أريد الاستفسار عن خدمات ابواب - مظلات وسواتر القاسم الحديثة بالرياض";
        window.open(`https://wa.me/966${number}?text=${encodeURIComponent(message)}`, '_blank');
    };
    
    // ================ التنقل السلس ================
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-links a');
        
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
    
    // ================ أزرار عائمة ================
    function initFloatingButtons() {
        // زر الاتصال العائم
        const floatingPhone = document.querySelector('.floating-phone');
        if (floatingPhone) {
            floatingPhone.addEventListener('click', function(e) {
                e.preventDefault();
                window.callNumber(fullPhoneNumber);
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
    }
    
    // ================ شجرة التنقل ================
    function initNavTree() {
        const navTreeToggle = document.getElementById('navTreeToggle');
        const navTree = document.getElementById('navTree');
        
        if (!navTreeToggle || !navTree) return;
        
        navTreeToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navTree.classList.toggle('active');
        });
        
        // إغلاق عند النقر خارجاً
        document.addEventListener('click', function(event) {
            if (navTree.classList.contains('active') && 
                !navTree.contains(event.target) && 
                !navTreeToggle.contains(event.target)) {
                navTree.classList.remove('active');
            }
        });
        
        // إغلاق عند النقر على رابط
        navTree.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navTree.classList.remove('active'));
        });
    }
    
    // ================ تنفيذ جميع الوظائف ================
    initLazyLoading();
    initBackgroundSlider();
    initSmoothScroll();
    initFloatingButtons();
    initNavTree();
});

// إضافة دعم للواتساب خارج DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.querySelector('div[onclick*="wa.me"]');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            window.open('https://wa.me/966532228615', '_blank');
        });
    }
});