/**
 * كود JavaScript المحسن لتحسين أداء التحميل
 * - تم إزالة الكود غير الضروري (Lazy Loading يتم التعامل معه عن طريق المتصفح)
 * - تم ترك الكود الأساسي فقط مع تحسينات للأداء
 */

// تعريف الدوال العامة المطلوبة من الصفحة
window.callNumber = function(number) {
    window.location.href = 'tel:+966' + number;
};

window.whatsappMessage = function(number) {
    window.open('https://wa.me/966' + number, '_blank');
};

// تهيئة العناصر عند تحميل DOM
document.addEventListener('DOMContentLoaded', function() {
    // إظهار وإخفاء شجرة التنقل
    const navTreeBtn = document.getElementById('navTreeToggle');
    const navTree = document.getElementById('navTree');

    if (navTreeBtn && navTree) {
        navTreeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navTree.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!navTree.contains(e.target) && !navTreeBtn.contains(e.target)) {
                navTree.classList.remove('active');
            }
        });
    }

    // تحسين التمرير السلس للروابط الداخلية
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // تحسين صور الخلفية في الهيدر (تأكد من تحميل الصورة الأولى فقط)
    const headerSlides = document.querySelectorAll('.header-slide');
    if (headerSlides.length > 1) {
        // إعداد مؤقت لتغيير الصور كل 5 ثواني
        let currentSlide = 0;
        setInterval(() => {
            headerSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % headerSlides.length;
            headerSlides[currentSlide].classList.add('active');
        }, 5000);
    }
});

// تحسين: استخدام requestIdleCallback للعمليات غير الحرجة
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // يمكن إضافة أي عمليات غير حرجة هنا إذا لزم الأمر
    }, { timeout: 2000 });
}