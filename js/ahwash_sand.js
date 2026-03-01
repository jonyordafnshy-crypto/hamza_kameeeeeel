// [محسن] ملف JavaScript - تم تحسين الأداء مع الحفاظ على كل الوظائف

// دالة للاتصال بالرقم
function callNumber(phoneNumber) {
    if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`)) {
        window.location.href = `tel:${phoneNumber}`;
    }
}

// دالة لإرسال رسالة واتساب
function whatsappMessage(phoneNumber) {
    const message = "مرحباً، أريد الاستفسار عن سواتر الأحواش والسواتر الرياض 0532228615 - مظلات وسواتر القاسم الحديثة أفضل تركيب سواتر بالرياض";
    const whatsappURL = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// [تحسين] انتظار تحميل DOM قبل تنفيذ الأوامر
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // --- التنقل السلس للروابط الداخلية ---
    const navLinks = document.querySelectorAll('.nav-links a');
    if (navLinks.length > 0) {
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

    // --- زر الاتصال العائم ---
    const floatingPhone = document.querySelector('.floating-phone');
    if (floatingPhone) {
        floatingPhone.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('هل تريد الاتصال بالرقم 0532228615؟ - مظلات وسواتر القاسم الحديثة أفضل تركيب سواتر بالرياض')) {
                window.location.href = 'tel:+966532228615';
            }
        });
    }

    // --- زر العودة للرئيسية ---
    const backButton = document.querySelector('.back-to-home');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }

    // --- شجرة التنقل ---
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
            link.addEventListener('click', function() {
                navTree.classList.remove('active');
            });
        });
    }

    // --- تبديل الخلفيات المتغيرة في الرأس ---
    const slides = document.querySelectorAll('.header-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;

        // دالة لتغيير الخلفية
        function changeBackground() {
            // إخفاء كل الشرائح
            slides.forEach(slide => {
                slide.style.opacity = '0';
            });

            // إظهار الشريحة الحالية
            slides[currentSlide].style.opacity = '1';

            // الانتقال للشريحة التالية
            currentSlide = (currentSlide + 1) % totalSlides;
        }

        // تغيير الخلفية كل 3 ثواني
        setInterval(changeBackground, 3000);

        // بدء التبديل فور تحميل الصفحة
        changeBackground();

        // تحميل مسبق للصور الخلفية (بدون حظر)
        const imageUrls = [
            'img/ahwash_sand12.webp',
            'img/ahwash_sand10.webp',
            'img/ahwash_sand11.webp'
        ];

        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    // --- تحسين Lazy Loading للصور (دعم إضافي للمتصفحات القديمة) ---
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if (lazyImages.length > 0) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        // المتصفح الحديث سيتولى التحميل تلقائياً بفضل loading="lazy"
                        // نضيف فقط class للتأثيرات البصرية
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });

            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
    } else {
        // للمتصفحات القديمة جداً - نضيف class مباشرة
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.classList.add('loaded');
        });
    }

    // --- تحسين الأداء: إزالة المستمعات غير الضرورية عند مغادرة الصفحة ---
    window.addEventListener('beforeunload', function() {
        // يمكن إضافة كود لتنظيف المستمعات إذا لزم الأمر
        // هذا تحسين للمتصفحات القديمة
    });

    // --- رسالة تأكيد في الكونسول (اختياري) ---
    console.log('✅ تم تحسين أداء الصفحة - مظلات وسواتر القاسم الحديثة الرياض 0532228615');
});

// [تحسين] المتغيرات القديمة للتوافق - تم الحفاظ عليها
const performanceConfig2026 = {
    lazyLoadThreshold: 0.1,
    loadDelay: 100,
    batchSize: 3
};

// [تحسين] دوال Lazy Loading القديمة - محذوفة لأننا نستخدم native lazy-loading
// ولكن نحتفظ بها كدوال فارغة للتوافق مع أي كود آخر يعتمد عليها
function smartLazyLoad() {
    // تم الاستغناء عنها لصالح native lazy-loading
}

function optimizeScrollLoading() {
    // تم الاستغناء عنها لصالح native lazy-loading
}