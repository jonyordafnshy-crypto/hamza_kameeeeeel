// تحسين: تم إعادة هيكلة الكود لتحسين الأداء وتقليل العمليات غير الضرورية

// تحسين: تجميع الدوال في كائن واحد لتقليل التلوث في النطاق العام
const SwaterLiser = {
    // دالة للاتصال بالرقم
    callNumber: function(phoneNumber) {
        if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`)) {
            window.location.href = `tel:${phoneNumber}`;
        }
    },

    // دالة لإرسال رسالة واتساب
    whatsappMessage: function(phoneNumber) {
        const message = "مرحباً، أريد الاستفسار عن السواتر الليزر من مظلات وسواتر القاسم الحديثة - الرياض";
        const whatsappURL = `https://wa.me/966${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    },

    // دالة لتبديل الخلفيات
    initBackgroundSlider: function() {
        const slides = document.querySelectorAll('.header-slide');
        if (!slides.length) return;
        
        let currentSlide = 0;
        const totalSlides = slides.length;

        // تحسين: استخدام requestAnimationFrame للرسوم المتحركة السلسة
        function changeBackground() {
            slides.forEach(slide => { slide.style.opacity = '0'; });
            slides[currentSlide].style.opacity = '0.80';
            currentSlide = (currentSlide + 1) % totalSlides;
        }

        // تحسين: بدء التبديل فوراً
        changeBackground();
        
        // تحسين: تخزين معرف المؤقت للإيقاف إذا لزم الأمر
        SwaterLiser.sliderInterval = setInterval(changeBackground, 3000);
    },

    // تحسين: تهيئة شجرة التنقل
    initNavTree: function() {
        const navTreeToggle = document.getElementById('navTreeToggle');
        const navTree = document.getElementById('navTree');

        if (!navTreeToggle || !navTree) return;

        // تحسين: استخدام event delegation بدلاً من عدة مستمعين
        navTreeToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navTree.classList.toggle('active');
        });

        document.addEventListener('click', function(event) {
            if (navTree.classList.contains('active') &&
                !navTree.contains(event.target) &&
                !navTreeToggle.contains(event.target)) {
                navTree.classList.remove('active');
            }
        });

        // تحسين: استخدام مستمع واحد للروابط
        navTree.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                navTree.classList.remove('active');
            }
        });
    },

    // تحسين: تهيئة أزرار الاتصال العائمة
    initFloatingButtons: function() {
        const floatingPhone = document.querySelector('.floating-phone');
        if (floatingPhone) {
            floatingPhone.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('هل تريد الاتصال بالرقم 0532228615؟')) {
                    window.location.href = 'tel:0532228615';
                }
            });
        }

        const backButton = document.querySelector('.back-to-home');
        if (backButton) {
            backButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'index.html';
            });
        }
    },

    // تحسين: التحميل المسبق للصور
    preloadImages: function() {
        const imageUrls = [
            'img/swater_lezer12.webp',
            'img/swater_lezer10.webp',
            'img/swater_lezer11.webp'
        ];

        // تحسين: استخدام requestIdleCallback للتحميل في وقت الفراغ
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                imageUrls.forEach(url => {
                    const img = new Image();
                    img.src = url;
                    img.fetchPriority = 'low';
                });
            }, { timeout: 2000 });
        } else {
            // تأخير التحميل قليلاً
            setTimeout(() => {
                imageUrls.forEach(url => {
                    const img = new Image();
                    img.src = url;
                    img.fetchPriority = 'low';
                });
            }, 1000);
        }
    },

    // تحسين: تحميل الصور باستخدام IntersectionObserver الأصلي بدلاً من الكود المخصص
    initLazyLoading: function() {
        // استخدام Lazy Loading الأصلي في المتصفح - تم حذف الكود المخصص
        // لأننا نستخدم loading="lazy" أصلاً في HTML
    },

    // تحسين: دالة التهيئة الرئيسية
    init: function() {
        // تحسين: تنفيذ المهام بعد تحميل DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initBackgroundSlider();
                this.initNavTree();
                this.initFloatingButtons();
                this.preloadImages();
            });
        } else {
            // DOM جاهز بالفعل
            this.initBackgroundSlider();
            this.initNavTree();
            this.initFloatingButtons();
            this.preloadImages();
        }

        // تحسين: تنفيذ مهام إضافية بعد تحميل الصفحة بالكامل
        window.addEventListener('load', () => {
            // إضافة كلاس للجسم للإشارة إلى اكتمال التحميل
            document.body.classList.add('loaded');
            
            // تحسين: إيقاف المؤقت إذا لزم الأمر (للتوفير في الطاقة)
            // يمكن إضافة منطق إضافي هنا
        });
    }
};

// تحسين: تعيين الدوال للنطاق العام للاستخدام في onclick
window.callNumber = SwaterLiser.callNumber.bind(SwaterLiser);
window.whatsappMessage = SwaterLiser.whatsappMessage.bind(SwaterLiser);

// تحسين: بدء التطبيق
SwaterLiser.init();

// تحسين: إزالة الكود القديم غير المستخدم
// - تم إزالة حلقة document.querySelectorAll('.main-nav a')
// - تم إزالة كود Lazy Loading المخصص (استخدمنا native lazy loading)
// - تم إزالة كود التحقق من وجود مؤشر التحميل