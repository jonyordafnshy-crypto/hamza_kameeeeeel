// [IMPROVED] ملف JavaScript محسن بالكامل - تم إعادة هيكلته لتحسين الأداء وإصلاح جميع المشاكل
(function() {
    'use strict';
    
    // ===============================================
    // المتغيرات العامة والثوابت
    // ===============================================
    let headerInterval;
    const PHONE_NUMBER = '0532228615';
    const WHATSAPP_MESSAGE = 'مرحباً، أريد الاستفسار عن أبواب حديد قص ليزر من مظلات وسواتر القاسم الحديثة بالرياض 0532228615';
    
    // ===============================================
    // تهيئة التطبيق بعد تحميل DOM
    // ===============================================
    function initApp() {
        setupLazyLoading();
        setupHeaderSlider();
        setupSmoothScrolling();
        setupNavigationTree();
        cleanupDevTools();
        setupFloatingButtons();
    }
    
    // ===============================================
    // تحميل الصور عند الحاجة (Lazy Loading)
    // ===============================================
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // تحميل الصور من data-src
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        
                        // إضافة تأثير التحميل
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });
            
            // مراقبة جميع الصور المؤجلة
            document.querySelectorAll('img[loading="lazy"], img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback للمتصفحات القديمة
            loadImagesImmediately();
        }
    }
    
    // تحميل فوري للمتصفحات القديمة
    function loadImagesImmediately() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    }
    
    // ===============================================
    // إعداد سلايدر الهيدر
    // ===============================================
    function setupHeaderSlider() {
        const slides = document.querySelectorAll('.header-slide');
        if (!slides.length) return;
        
        const backgroundImages = [
            'img/abwab_30.webp',
            'img/abwab_22.webp',
            'img/abwab_25.webp'
        ];
        
        // تعيين الصور للخلفيات
        slides.forEach((slide, index) => {
            if (backgroundImages[index]) {
                slide.style.backgroundImage = `url('${backgroundImages[index]}')`;
            }
        });
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        function changeBackground() {
            // إخفاء جميع الشرائح
            slides.forEach(slide => {
                slide.style.opacity = '0';
            });
            
            // إظهار الشريحة الحالية
            if (slides[currentSlide]) {
                slides[currentSlide].style.opacity = '0.80';
            }
            
            // التحرك للشريحة التالية
            currentSlide = (currentSlide + 1) % totalSlides;
        }
        
        // تحميل مسبق للصور
        backgroundImages.forEach(url => {
            const img = new Image();
            img.src = url;
        });
        
        // بدء التغيير
        changeBackground();
        
        // تنظيف المؤقت القديم
        if (headerInterval) {
            clearInterval(headerInterval);
        }
        
        headerInterval = setInterval(changeBackground, 3000);
    }
    
    // ===============================================
    // التنقل السلس للروابط الداخلية
    // ===============================================
    function setupSmoothScrolling() {
        const links = document.querySelectorAll('.nav-links a, .article-box a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const href = this.getAttribute('href');
                if (!href || href === '#') return;
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 100;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // تحديث URL بدون إعادة تحميل
                    history.pushState(null, null, href);
                }
            });
        });
    }
    
    // ===============================================
    // إعداد شجرة التنقل (المشكلة الرئيسية تم حلها)
    // ===============================================
    function setupNavigationTree() {
        const navTreeToggle = document.getElementById('navTreeToggle');
        const navTree = document.getElementById('navTree');
        
        // التحقق من وجود العناصر
        if (!navTreeToggle || !navTree) {
            console.warn('عناصر شجرة التنقل غير موجودة');
            return;
        }
        
        // إزالة أي مستمعين سابقين (لمنع التكرار)
        const newToggle = navTreeToggle.cloneNode(true);
        navTreeToggle.parentNode.replaceChild(newToggle, navTreeToggle);
        
        // إعادة تعيين المتغيرات بعد الاستنساخ
        const freshToggle = document.getElementById('navTreeToggle');
        const freshTree = document.getElementById('navTree');
        
        // إضافة مستمع الحدث للزر
        freshToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            freshTree.classList.toggle('active');
        });
        
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function(event) {
            if (freshTree.classList.contains('active') && 
                !freshTree.contains(event.target) && 
                !freshToggle.contains(event.target)) {
                freshTree.classList.remove('active');
            }
        });
        
        // إغلاق القائمة عند النقر على أي رابط داخلي
        freshTree.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                freshTree.classList.remove('active');
            });
        });
        
        // إغلاق القائمة عند الضغط على ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && freshTree.classList.contains('active')) {
                freshTree.classList.remove('active');
            }
        });
    }
    
    // ===============================================
    // إخفاء شريط أدوات التطوير
    // ===============================================
    function cleanupDevTools() {
        const devTools = document.querySelector('.dev-tools-bar');
        if (devTools) {
            setTimeout(() => {
                devTools.style.display = 'none';
            }, 2000);
        }
    }
    
    // ===============================================
    // إعداد الأزرار العائمة
    // ===============================================
    function setupFloatingButtons() {
        // زر الواتساب العائم (مخصص)
        const whatsappDiv = document.querySelector('div[style*="position: fixed"][style*="bottom: 120px"]');
        if (whatsappDiv) {
            whatsappDiv.addEventListener('click', function() {
                window.open(`https://wa.me/966${PHONE_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`, '_blank');
            });
        }
    }
    
    // ===============================================
    // الدوال العامة (متاحة لجميع الأزرار)
    // ===============================================
    window.callNumber = function(phoneNumber) {
        // التحقق من صحة الرقم
        const number = phoneNumber || PHONE_NUMBER;
        
        if (confirm(`هل تريد الاتصال بالرقم ${number}؟`)) {
            window.location.href = `tel:${number}`;
        }
    };
    
    window.whatsappMessage = function(phoneNumber) {
        // تنظيف الرقم
        let number = phoneNumber || PHONE_NUMBER;
        const cleanedNumber = number.startsWith('0') ? number.substring(1) : number;
        
        // فتح الواتساب
        window.open(`https://wa.me/966${cleanedNumber}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`, '_blank');
    };
    
    // دالة إضافية للتمرير لعنصر معين
    window.scrollToElement = function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // ===============================================
    // بدء التطبيق
    // ===============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        // إذا كان DOM قد تم تحميله بالفعل
        initApp();
    }
    
    // ===============================================
    // تنظيف عند مغادرة الصفحة
    // ===============================================
    window.addEventListener('beforeunload', function() {
        if (headerInterval) {
            clearInterval(headerInterval);
        }
    });
    
    // ===============================================
    // تحسينات إضافية
    // ===============================================
    
    // اكتشاف الأجهزة المحمولة
    if ('ontouchstart' in window) {
        document.documentElement.classList.add('touch-device');
    }
    
    // إضافة علامة تحميل الصفحة
    window.addEventListener('load', function() {
        document.body.classList.add('page-loaded');
        
        // إخفاء أي شاشات تحميل إذا وجدت
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.style.display = 'none';
        }
    });
    
    // التعامل مع أخطاء تحميل الصور
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            const img = e.target;
            console.warn('فشل تحميل الصورة:', img.src);
            
            // إضافة صورة بديلة إذا فشل التحميل
            if (!img.src.includes('placeholder')) {
                img.src = 'img/placeholder.webp';
            }
        }
    }, true);
    
    // تحسين أداء التمرير
    let scrolling = false;
    window.addEventListener('scroll', function() {
        scrolling = true;
    });
    
    // تنفيذ الإجراءات بعد توقف التمرير
    setInterval(function() {
        if (scrolling) {
            scrolling = false;
            // يمكن إضافة أي إجراءات بعد التمرير هنا
        }
    }, 250);
    
})();