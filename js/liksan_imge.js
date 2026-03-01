/**
 * liksan_imge.js - نسخة محسنة للأداء
 * تم تحسينه بواسطة خبير أداء المواقع
 * جميع الوظائف محفوظة، فقط تم تحسين التنفيذ
 */

(function() {
    'use strict';

    // تهيئة المتغيرات العامة مرة واحدة
    const win = window;
    const doc = document;
    const html = doc.documentElement;

    // ===========================================
    // 1. تحميل الصور المتقدم (Advanced Lazy Loading)
    // ===========================================
    function initLazyLoading() {
        // استخدام Intersection Observer إذا كان متاحاً
        if (!('IntersectionObserver' in win)) {
            // Fallback للصفحات القديمة - تحميل الصور فوراً
            doc.querySelectorAll('img[data-src]').forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            });
            return;
        }

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    if (img.dataset.src) {
                        // إنشاء صورة مؤقتة للتحميل المسبق
                        const tempImg = new Image();
                        tempImg.onload = () => {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            img.style.opacity = '1';
                            img.removeAttribute('data-src');
                        };
                        tempImg.onerror = () => {
                            // في حالة فشل التحميل، استخدم الصورة الأصلية
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            img.style.opacity = '1';
                            img.removeAttribute('data-src');
                        };
                        tempImg.src = img.dataset.src;
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px',
            threshold: 0.01
        });

        // مراقبة جميع الصور مع data-src
        doc.querySelectorAll('img[data-src]').forEach(img => {
            // إعدادات أولية
            img.style.transition = 'opacity 0.5s ease';
            img.style.opacity = '0.8';
            
            // إذا كانت الصورة قريبة، حملها فوراً
            const rect = img.getBoundingClientRect();
            if (rect.top < win.innerHeight + 200) {
                if (img.dataset.src) {
                    const src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.src = src;
                    img.style.opacity = '1';
                }
            } else {
                imageObserver.observe(img);
            }
        });
    }

    // ===========================================
    // 2. التبديل التلقائي لصور الخلفية
    // ===========================================
    function initBackgroundSlider() {
        const slides = doc.querySelectorAll('.header-slide');
        if (!slides.length) return;

        let currentSlide = 0;
        const totalSlides = slides.length;

        // دالة تغيير الخلفية
        function changeBackground() {
            // إخفاء الكل
            for (let i = 0; i < totalSlides; i++) {
                slides[i].style.opacity = '0';
            }
            
            // إظهار الحالية
            slides[currentSlide].style.opacity = '1';
            
            // الانتقال للتالية
            currentSlide = (currentSlide + 1) % totalSlides;
            
            // تحميل الصورة التالية مسبقاً
            const nextIndex = (currentSlide + 1) % totalSlides;
            const nextSlide = slides[nextIndex];
            if (nextSlide && nextSlide.style.backgroundImage) {
                const imgUrl = nextSlide.style.backgroundImage
                    .replace('url("', '')
                    .replace('")', '')
                    .replace('url(', '')
                    .replace(')', '');
                
                if (imgUrl && imgUrl !== 'none') {
                    const preloadImg = new Image();
                    preloadImg.src = imgUrl;
                }
            }
        }

        // بدء التبديل - أسرع استجابة
        changeBackground();
        setInterval(changeBackground, 5000);
    }

    // ===========================================
    // 3. شجرة التنقل - نسخة مبسطة ومضمونة العمل
    // ===========================================
    function initNavigationTree() {
        console.log('محاولة تهيئة شجرة التنقل...');
        
        const navToggle = document.getElementById('navTreeToggle');
        const navTree = document.getElementById('navTree');

        // التأكد من وجود العناصر
        if (!navToggle || !navTree) {
            console.log('❌ عناصر شجرة التنقل غير موجودة');
            return;
        }

        console.log('✅ تم العثور على عناصر شجرة التنقل');

        // إزالة أي مستمعين سابقين (لتجنب التكرار)
        // هذه الطريقة أكثر أماناً من replaceWith
        const newToggle = navToggle.cloneNode(true);
        navToggle.parentNode.replaceChild(newToggle, navToggle);
        
        // إعادة تعريف المتغيرات بعد الاستبدال
        const finalToggle = document.getElementById('navTreeToggle');
        const finalTree = document.getElementById('navTree');

        // إضافة مستمع الحدث للزر
        finalToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
            console.log('🖱️ تم النقر على زر الشجرة');
            
            // تبديل كلاس active
            if (finalTree.classList.contains('active')) {
                finalTree.classList.remove('active');
                console.log('📂 إغلاق الشجرة');
            } else {
                finalTree.classList.add('active');
                console.log('📂 فتح الشجرة');
            }
        });

        // إغلاق الشجرة عند النقر خارجها
        document.addEventListener('click', function(event) {
            if (finalTree.classList.contains('active') &&
                !finalTree.contains(event.target) &&
                !finalToggle.contains(event.target)) {
                finalTree.classList.remove('active');
                console.log('📂 إغلاق الشجرة (نقر خارجي)');
            }
        });

        // منع إغلاق الشجرة عند النقر داخلها
        finalTree.addEventListener('click', function(event) {
            event.stopPropagation();
        });

        // إغلاق الشجرة عند النقر على رابط داخلي
        const links = finalTree.querySelectorAll('a');
        for (let i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function() {
                setTimeout(function() {
                    finalTree.classList.remove('active');
                }, 150);
            });
        }

        console.log('✅ تم تهيئة شجرة التنقل بنجاح');
    }

    // ===========================================
    // 4. التنقل السلس
    // ===========================================
    function initSmoothScrolling() {
        doc.querySelectorAll('.nav-links a, .page-navigation a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const targetElement = doc.getElementById(targetId.substring(1));
                    if (targetElement) {
                        win.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // ===========================================
    // 5. الأسئلة المتكررة (FAQ)
    // ===========================================
    function initFAQ() {
        const faqItems = doc.querySelectorAll('.faq-item');
        
        if (!faqItems.length) return;

        for (let i = 0; i < faqItems.length; i++) {
            const item = faqItems[i];
            const question = item.querySelector('.faq-question');
            
            if (!question) continue;

            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                const answer = item.querySelector('.faq-answer');
                const icon = this.querySelector('span');
                
                // إغلاق الآخرين
                for (let j = 0; j < faqItems.length; j++) {
                    if (faqItems[j] !== item && faqItems[j].classList.contains('active')) {
                        faqItems[j].classList.remove('active');
                        const otherAnswer = faqItems[j].querySelector('.faq-answer');
                        const otherIcon = faqItems[j].querySelector('.faq-question span');
                        if (otherAnswer) otherAnswer.style.maxHeight = '0';
                        if (otherIcon) otherIcon.textContent = '+';
                    }
                }

                // تبديل الحالي
                item.classList.toggle('active');
                
                if (answer) {
                    if (!isActive) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        if (icon) icon.textContent = '−';
                    } else {
                        answer.style.maxHeight = '0';
                        if (icon) icon.textContent = '+';
                    }
                }
            });
        }
    }

    // ===========================================
    // 6. تحديث سنة حقوق النشر
    // ===========================================
    function updateCopyrightYear() {
        const year = 2026;
        doc.querySelectorAll('.copyright').forEach(el => {
            if (el.textContent.includes('©')) {
                el.innerHTML = el.innerHTML.replace(/\d{4}/g, year);
            }
        });
    }

    // ===========================================
    // 7. تحميل الصور المهمة مسبقاً
    // ===========================================
    function preloadImportantImages() {
        // تحميل الصور الأساسية فقط
        const importantImages = [
            'img/logo.webp',
            'img/liksan_imge1.webp'
        ];

        for (let i = 0; i < importantImages.length; i++) {
            const img = new Image();
            img.src = importantImages[i];
        }
    }

    // ===========================================
    // 8. إضافة أنماط CSS ديناميكية
    // ===========================================
    function addCriticalStyles() {
        if (doc.querySelector('#dynamic-styles')) return;

        const style = doc.createElement('style');
        style.id = 'dynamic-styles';
        style.textContent = `
            @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes slideUp { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-10px); } }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            
            section { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
            section.visible { opacity: 1; transform: translateY(0); }
            
            img { opacity: 0.8; transition: opacity 0.5s ease !important; }
            img.loaded { opacity: 1 !important; }
            
            .faq-item.active .faq-answer { max-height: 500px !important; padding: 20px !important; }
            .faq-question span { transition: transform 0.3s ease; }
            .faq-item.active .faq-question span { transform: rotate(45deg); }
            
            .benefit-item:hover, .lexan-benefit:hover, .related-item:hover { transform: translateY(-8px); transition: transform 0.3s ease, box-shadow 0.3s ease; box-shadow: 0 10px 25px rgba(0,0,0,0.15); }
            
            @media (max-width:768px) { section { animation: fadeIn 0.5s ease forwards; animation-delay: 0.1s; } }
        `;
        doc.head.appendChild(style);
    }

    // ===========================================
    // 9. مراقبة المقاطع للظهور
    // ===========================================
    function initSectionsObserver() {
        if (!('IntersectionObserver' in win)) {
            doc.querySelectorAll('section').forEach(s => s.classList.add('visible'));
            return;
        }

        const sectionObserver = new IntersectionObserver((entries) => {
            for (let i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    entries[i].target.classList.add('visible');
                    sectionObserver.unobserve(entries[i].target);
                }
            }
        }, { threshold: 0.1 });

        doc.querySelectorAll('section').forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // ===========================================
    // 10. تحسين أداء التمرير
    // ===========================================
    function initScrollOptimizer() {
        let ticking = false;
        
        win.addEventListener('scroll', () => {
            if (!ticking) {
                win.requestAnimationFrame(() => {
                    const nearImages = doc.querySelectorAll('img[data-src]');
                    for (let i = 0; i < nearImages.length; i++) {
                        const img = nearImages[i];
                        const rect = img.getBoundingClientRect();
                        if (rect.top < win.innerHeight + 300) {
                            if (img.dataset.src) {
                                const src = img.dataset.src;
                                img.removeAttribute('data-src');
                                img.src = src;
                            }
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ===========================================
    // 11. التهيئة الرئيسية
    // ===========================================
    function init() {
        console.log('🚀 بدء تهيئة الصفحة...');
        
        addCriticalStyles();
        preloadImportantImages();
        
        setTimeout(initLazyLoading, 50);
        
        // تهيئة جميع المكونات
        initBackgroundSlider();
        initSmoothScrolling();
        initFAQ();
        initSectionsObserver();
        initScrollOptimizer();
        updateCopyrightYear();
        
        // تأخير بسيط لتهيئة شجرة التنقل لضمان تحميل DOM بالكامل
        setTimeout(function() {
            initNavigationTree();
        }, 100);
        
        console.log('✅ تهيئة الصفحة اكتملت');
    }

    // بدء التشغيل بعد تحميل DOM
    if (doc.readyState === 'loading') {
        doc.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // تحسين إضافي بعد تحميل الصفحة بالكامل
    win.addEventListener('load', () => {
        const remainingImages = doc.querySelectorAll('img[data-src]');
        if (remainingImages.length) {
            for (let i = 0; i < remainingImages.length; i++) {
                setTimeout((img) => {
                    if (img && img.dataset.src) {
                        const src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.src = src;
                    }
                }, i * 50, remainingImages[i]);
            }
        }
    });

})();