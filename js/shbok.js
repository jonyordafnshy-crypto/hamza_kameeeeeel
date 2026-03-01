// =============================================
// ملف JavaScript المحسن لصفحة الشبوك
// تم تحسينه بواسطة Web Performance Expert
// تاريخ التحسين: 2024
// التغييرات: 
// - إزالة الكود المكرر
// - تبسيط الوظائف
// - إزالة Lazy Loading المعطل (نستخدم native lazy loading)
// - تحسين أداء الأحداث
// - إضافة will-change للعناصر المتحركة
// =============================================

// تعريف الكائن العام لتجنب التعارضات
window.App = window.App || {};

// دالة للاتصال بالرقم
window.callNumber = function(phoneNumber) {
    if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`)) {
        window.location.href = `tel:${phoneNumber}`;
    }
};

// دالة لإرسال رسالة واتساب
window.whatsappMessage = function(phoneNumber) {
    const message = "مرحباً، أريد الاستفسار عن تركيب الشبوك بالرياض 0532228615 - مظلات وسواتر القاسم الحديثة";
    window.open(`https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
};

// تهيئة الصفحة بعد تحميل DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== زر الاتصال العائم =====
    const floatingPhone = document.querySelector('.floating-phone');
    if (floatingPhone) {
        floatingPhone.addEventListener('click', function(e) {
            e.preventDefault();
            window.callNumber('0532228615');
        });
    }

    // ===== زر العودة للرئيسية =====
    const backButton = document.querySelector('.back-to-home');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }

    // ===== شجرة التنقل =====
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

    // ===== تحميل مسبق للصور (Preloading) =====
    // تحسين: تحميل الصور الأكثر أهمية مسبقاً
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            const criticalImages = ['img/logo.webp', 'img/shbok1.webp', 'img/shbok2.webp', 'img/shbok3.webp'];
            criticalImages.forEach(url => {
                const img = new Image();
                img.src = url;
                img.fetchPriority = 'low';
            });
        }, { timeout: 2000 });
    } else {
        // Fallback للمتصفحات القديمة
        setTimeout(() => {
            const criticalImages = ['img/logo.webp', 'img/shbok1.webp', 'img/shbok2.webp', 'img/shbok3.webp'];
            criticalImages.forEach(url => {
                const img = new Image();
                img.src = url;
            });
        }, 2000);
    }

    // ===== تحسين الأداء: إزالة معالج الأحداث غير الضروري =====
    // تم إزالة كود Lazy Loading المعطل لأنه كان يسبب بطء
    
    // ===== تحسين: إضافة passive event listeners للتمرير =====
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // يمكن إضافة أي منطق للتمرير هنا إذا لزم الأمر
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    console.log('✅ تم تحميل shbok.js المحسن بنجاح');
});

// ===== تحسين الأداء العام =====
// إزالة معالج الأحداث القديم للروابط الرئيسية (كان يسبب alert مزعج)
// تم إزالة الكود التالي:
// document.querySelectorAll('.main-nav a').forEach(...)

// ===== تحسين الذاكرة: تنظيف المتغيرات غير المستخدمة =====
// تم إزالة المتغيرات والوظائف غير المستخدمة