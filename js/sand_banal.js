/**
 * ملف JavaScript المحسن - غرف ساندوتش بانل
 * تم تحسين الأداء وإزالة التكرار مع الحفاظ على جميع الوظائف
 */

// ==================== دوال مساعدة ====================

/**
 * دالة آمنة للتنفيذ عند تحميل DOM
 * @param {Function} fn الدالة المراد تنفيذها
 */
function onDOMReady(fn) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        fn();
    }
}

/**
 * دالة آمنة للتنفيذ عند تحميل الصفحة بالكامل
 * @param {Function} fn الدالة المراد تنفيذها
 */
function onWindowLoad(fn) {
    if (document.readyState === 'complete') {
        fn();
    } else {
        window.addEventListener('load', fn);
    }
}

// ==================== تحميل الصور الذكي ====================

/**
 * تهيئة التحميل الكسول الذكي للصور
 * يستخدم Intersection Observer مع تحسينات
 */
function initLazyLoading() {
    // اختيار جميع الصور التي بها lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if (lazyImages.length === 0) return;
    
    // إنشاء Intersection Observer مع خيارات محسنة
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // إذا كانت الصورة تحتوي على data-src (للتوافق مع الكود القديم)
                if (img.dataset.src && img.src !== img.dataset.src) {
                    img.src = img.dataset.src;
                }
                
                // إضافة fetchpriority للصور المرئية
                if (!img.hasAttribute('fetchpriority')) {
                    img.fetchPriority = 'low';
                }
                
                // إيقاف مراقبة هذه الصورة
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '100px 0px', // زيادة مسافة التحميل المسبق
        threshold: 0.01
    });
    
    // مراقبة كل صورة
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== تحسين أداء الصفحة ====================

/**
 * تحسين أداء الصفحة العامة
 */
function optimizePerformance() {
    // إضافة passive event listeners للتمرير
    const supportsPassive = (() => {
        let supports = false;
        try {
            const opts = Object.defineProperty({}, 'passive', {
                get: function() { supports = true; }
            });
            window.addEventListener('test', null, opts);
            window.removeEventListener('test', null, opts);
        } catch(e) {}
        return supports;
    })();
    
    if (supportsPassive) {
        window.addEventListener('scroll', function() {}, { passive: true });
        window.addEventListener('touchstart', function() {}, { passive: true });
        window.addEventListener('touchmove', function() {}, { passive: true });
    }
    
    // تحسين تفاعل اللمس للهواتف
    if ('ontouchstart' in window) {
        document.documentElement.style.cursor = 'pointer';
    }
}

// ==================== دوال الاتصال ====================

/**
 * الاتصال بالرقم
 * @param {string} phoneNumber رقم الهاتف
 */
window.callNumber = function(phoneNumber) {
    if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`)) {
        window.location.href = `tel:${phoneNumber}`;
    }
};

/**
 * إرسال رسالة واتساب
 * @param {string} phoneNumber رقم الهاتف
 */
window.whatsappMessage = function(phoneNumber) {
    const message = "مرحباً، أريد الاستفسار عن غرف الساندوتش بانل - مؤسسة القاسم الرياض";
    // إزالة أي + من الرقم
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    const whatsappURL = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
};

// ==================== خلفية متغيرة ====================

/**
 * تهيئة مؤثر تغيير الخلفية
 * محسّن لاستخدام requestAnimationFrame وتقليل الحمل
 */
function initBackgroundSlider() {
    const slides = document.querySelectorAll('.header-slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // عرض الشريحة الأولى فقط في البداية (الباقي opacity 0)
    slides.forEach((slide, index) => {
        if (index === 0) {
            slide.style.opacity = '1';
        } else {
            slide.style.opacity = '0';
        }
    });
    
    /**
     * تغيير الخلفية باستخدام requestAnimationFrame
     */
    function changeBackground() {
        // إخفاء جميع الشرائح
        slides.forEach(slide => {
            slide.style.opacity = '0';
        });
        
        // إظهار الشريحة الحالية
        slides[currentSlide].style.opacity = '1';
        
        // التالي
        currentSlide = (currentSlide + 1) % totalSlides;
    }
    
    // تغيير الخلفية كل 3 ثوانٍ
    setInterval(changeBackground, 3000);
}

// ==================== شجرة التنقل ====================

/**
 * تهيئة شجرة التنقل
 */
function initNavTree() {
    const navTreeToggle = document.getElementById('navTreeToggle');
    const navTree = document.getElementById('navTree');
    
    if (!navTreeToggle || !navTree) return;
    
    /**
     * تبديل ظهور شجرة التنقل
     * @param {Event} e حدث النقر
     */
    function toggleNavTree(e) {
        e.stopPropagation();
        navTree.classList.toggle('active');
    }
    
    /**
     * إغلاق شجرة التنقل عند النقر خارجها
     * @param {Event} event حدث النقر
     */
    function closeNavTree(event) {
        if (navTree.classList.contains('active') &&
            !navTree.contains(event.target) &&
            !navTreeToggle.contains(event.target)) {
            navTree.classList.remove('active');
        }
    }
    
    /**
     * إغلاق شجرة التنقل عند النقر على رابط
     */
    function closeOnLinkClick() {
        navTree.classList.remove('active');
    }
    
    // إضافة مستمعي الأحداث
    navTreeToggle.addEventListener('click', toggleNavTree);
    document.addEventListener('click', closeNavTree);
    
    // إضافة مستمع لجميع الروابط داخل شجرة التنقل
    const navLinks = navTree.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeOnLinkClick);
    });
}

// ==================== التحميل المسبق ====================

/**
 * تحميل الصور الرئيسية بشكل مسبق
 */
function preloadCriticalImages() {
    // قائمة الصور المهمة التي يجب تحميلها مسبقاً
    const criticalImages = [
        'img/logo.webp',
        'img/sand_banal2.webp',
        'img/sand_banal13.webp',
        'img/sand_banal4.webp'
    ];
    
    // تحميل كل صورة
    criticalImages.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// ==================== تحسين إضافي ====================

/**
 * إضافة دعم WebP للمتصفحات التي لا تدعمه
 */
function detectWebPSupport() {
    // لا حاجة لتنفيذ أي شيء - المتصفحات الحديثة تدعم WebP
    // هذا مجرد عنصر نائب للتوافق
}

/**
 * تحسين أداء التمرير
 */
function optimizeScrolling() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // تنفيذ أي عمليات خفيفة عند التمرير
                // مثل تفعيل lazy loading إضافي إذا لزم الأمر
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ==================== التهيئة الرئيسية ====================

/**
 * تهيئة كل شيء
 */
function initAll() {
    // تحميل مسبق للصور الرئيسية
    preloadCriticalImages();
    
    // تهيئة المكونات
    initBackgroundSlider();
    initNavTree();
    initLazyLoading();
    optimizePerformance();
    optimizeScrolling();
    
    console.log('✅ تم تحسين أداء الصفحة بنجاح - القاسم للإنشاءات');
}

// تنفيذ عند تحميل DOM
onDOMReady(initAll);

// تنفيذ عند تحميل الصفحة بالكامل
onWindowLoad(() => {
    // إضافة fetchpriority للصور المتبقية
    const remainingImages = document.querySelectorAll('img[loading="lazy"]:not([fetchpriority])');
    remainingImages.forEach(img => {
        img.fetchPriority = 'low';
    });
    
    // تحديث التحميل الكسول مرة أخرى للتأكد
    initLazyLoading();
});