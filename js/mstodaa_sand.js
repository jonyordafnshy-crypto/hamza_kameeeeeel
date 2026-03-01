// ========== مظلات وسواتر القاسم الحديثة - JavaScript محسّن للسرعة ==========

// دوال الاتصال الأساسية - معلقة على النافذة للوصول الشامل
window.callNumber = function(phoneNumber) {
    if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟ - مظلات وسواتر القاسم الحديثة`)) {
        window.location.href = `tel:${phoneNumber}`;
    }
};

window.whatsappMessage = function(phoneNumber) {
    var message = "مرحباً، أريد الاستفسار عن مستودعات الساندوتش بانل الجاهزة - مظلات وسواتر القاسم الحديثة";
    var whatsappURL = "https://wa.me/" + phoneNumber.replace('+', '') + "?text=" + encodeURIComponent(message);
    window.open(whatsappURL, '_blank');
};

// تهيئة الصفحة بعد تحميل DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== شجرة التنقل - الإصلاح الأساسي ==========
    var navTreeToggle = document.getElementById('navTreeToggle');
    var navTree = document.getElementById('navTree');
    
    if (navTreeToggle && navTree) {
        // فتح/إغلاق شجرة التنقل عند النقر على الزر
        navTreeToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            if (navTree.classList.contains('active')) {
                navTree.classList.remove('active');
            } else {
                navTree.classList.add('active');
            }
        });
        
        // إغلاق شجرة التنقل عند النقر خارجها
        document.addEventListener('click', function(event) {
            if (navTree.classList.contains('active') && 
                !navTree.contains(event.target) && 
                !navTreeToggle.contains(event.target)) {
                navTree.classList.remove('active');
            }
        });
        
        // إغلاق شجرة التنقل عند النقر على أي رابط داخلي
        var navLinks = navTree.querySelectorAll('a');
        for (var i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener('click', function() {
                navTree.classList.remove('active');
            });
        }
        
        // منع إغلاق الشجرة عند النقر داخل القائمة
        navTree.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
    
    // ========== معالجة روابط التنقل الداخلية ==========
    var navLinksInternal = document.querySelectorAll('.nav-links a');
    for (var i = 0; i < navLinksInternal.length; i++) {
        navLinksInternal[i].addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href').substring(1);
            var targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // ========== زر الاتصال العائم ==========
    var floatingPhone = document.querySelector('.floating-phone');
    if (floatingPhone) {
        floatingPhone.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('هل تريد الاتصال بنا؟ الرقم: 532228615')) {
                window.location.href = 'tel:0532228615';
            }
        });
    }
    
    // ========== زر العودة للرئيسية ==========
    var backButton = document.querySelector('.back-to-home');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
    
    // ========== تغيير خلفية الهيدر ==========
    var slides = document.querySelectorAll('.header-slide');
    if (slides.length > 0) {
        var currentSlide = 0;
        var totalSlides = slides.length;
        
        function changeBackground() {
            for (var i = 0; i < slides.length; i++) {
                slides[i].style.opacity = '0';
            }
            slides[currentSlide].style.opacity = '1';
            currentSlide = (currentSlide + 1) % totalSlides;
        }
        
        // تشغيل التغيير كل 3 ثواني
        setInterval(changeBackground, 3000);
        
        // تغيير فوري للصورة الأولى
        changeBackground();
    }
    
    // ========== تحميل مسبق للصور المستخدمة في الخلفية ==========
    var imageUrls = ['img/mostoudaa_sand6.webp', 'img/mostoudaa_sand7.webp', 'img/mostoudaa_sand8.webp'];
    for (var i = 0; i < imageUrls.length; i++) {
        var img = new Image();
        img.src = imageUrls[i];
    }
});

// ========== تحميل متقدم للصور (Lazy Loading محسّن) ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // استهداف جميع الصور مع خاصية loading="lazy"
    var lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    // إذا كان المتصفح يدعم IntersectionObserver
    if ('IntersectionObserver' in window) {
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                if (entry.isIntersecting) {
                    var img = entry.target;
                    img.classList.add('loaded');
                    
                    // التأكد من تحميل الصورة
                    if (!img.complete) {
                        // إعادة تعيين المصدر لضمان التحميل
                        var src = img.src;
                        img.src = '';
                        img.src = src;
                    }
                    
                    // إيقاف مراقبة هذه الصورة
                    imageObserver.unobserve(img);
                }
            }
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        // مراقبة كل صورة
        for (var i = 0; i < lazyImages.length; i++) {
            imageObserver.observe(lazyImages[i]);
        }
        
    } else {
        // للمتصفحات القديمة - تحميل جميع الصور فوراً
        for (var i = 0; i < lazyImages.length; i++) {
            lazyImages[i].classList.add('loaded');
        }
    }
    
    // معالجة الصور غير المحملة بعد 3 ثواني
    setTimeout(function() {
        var allLazyImages = document.querySelectorAll('img[loading="lazy"]');
        for (var i = 0; i < allLazyImages.length; i++) {
            if (!allLazyImages[i].complete) {
                // إعادة تحميل الصور المعطلة
                var src = allLazyImages[i].src;
                allLazyImages[i].src = '';
                allLazyImages[i].src = src;
            }
        }
    }, 3000);
});

// تحسينات إضافية بعد تحميل الصفحة بالكامل
window.addEventListener('load', function() {
    
    // إضافة كلاس للجسم للإشارة إلى اكتمال التحميل
    document.body.classList.add('page-loaded');
    
    // تحسين الصور باستخدام decode() إذا كان متاحاً
    var galleryImages = document.querySelectorAll('.gallery-item img');
    for (var i = 0; i < galleryImages.length; i++) {
        var img = galleryImages[i];
        if (img.decode) {
            img.decode().catch(function() {
                // تجاهل أخطاء فك التشفير
            });
        }
    }
    
    // إزالة أي أنماط غير ضرورية بعد التحميل
    setTimeout(function() {
        var elements = document.querySelectorAll('[style*="will-change"]');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.willChange = 'auto';
        }
    }, 1000);
});