/**
 * ملف JavaScript المحسن - مظلات وسواتر القاسم الحديثة
 * تم تحسينه لسرعة التحميل مع الحفاظ على جميع الوظائف
 */

(function() {
    'use strict';

    // تنفيذ الكود بعد تحميل الصفحة بالكامل
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // دالة الاتصال بالرقم
        window.callNumber = function(phoneNumber) {
            if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`)) {
                window.location.href = `tel:${phoneNumber}`;
            }
        };

        // دالة إرسال واتساب
        window.whatsappMessage = function(phoneNumber) {
            var message = "مرحباً، أريد الاستفسار عن ألواح اللكسان والخدمات في الرياض";
            var whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
        };

        // التنقل السلس للروابط الداخلية (الأزرار العلوية)
        var navLinks = document.querySelectorAll('.nav-links a');
        for (var i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener('click', function(e) {
                e.preventDefault();
                var targetId = this.getAttribute('href').substring(1);
                var targetElement = document.getElementById(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                } else {
                    console.log('العنصر غير موجود:', targetId);
                    alert('القسم المطلوب غير موجود في الصفحة حالياً');
                }
            });
        }

        // زر الاتصال العائم
        var floatingPhone = document.querySelector('.floating-phone');
        if (floatingPhone) {
            floatingPhone.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('هل تريد الاتصال بالرقم 0532228615؟')) {
                    window.location.href = 'tel:0532228615';
                }
            });
        }

        // زر العودة للرئيسية
        var backButton = document.querySelector('.back-to-home');
        if (backButton) {
            backButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'index.html';
            });
        }

        // شجرة التنقل
        var navTreeToggle = document.getElementById('navTreeToggle');
        var navTree = document.getElementById('navTree');

        if (navTreeToggle && navTree) {
            navTreeToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                navTree.classList.toggle('active');
            });

            document.addEventListener('click', function(e) {
                if (navTree.classList.contains('active') && 
                    !navTree.contains(e.target) && 
                    !navTreeToggle.contains(e.target)) {
                    navTree.classList.remove('active');
                }
            });

            var navTreeLinks = navTree.querySelectorAll('a');
            for (var j = 0; j < navTreeLinks.length; j++) {
                navTreeLinks[j].addEventListener('click', function() {
                    navTree.classList.remove('active');
                });
            }
        }

        // تغيير الخلفيات
        var slides = document.querySelectorAll('.header-slide');
        if (slides.length > 0) {
            var currentSlide = 0;
            var totalSlides = slides.length;

            function changeBackground() {
                for (var i = 0; i < slides.length; i++) {
                    slides[i].style.opacity = '0';
                }
                if (slides[currentSlide]) {
                    slides[currentSlide].style.opacity = '0.80';
                }
                currentSlide = (currentSlide + 1) % totalSlides;
            }

            setInterval(changeBackground, 3000);
            changeBackground();
        }

        // تحميل مسبق للصور
        var imageUrls = [
            'img/liksan_alwah1.webp',
            'img/liksan_alwah2.webp',
            'img/liksan_alwah3.webp'
        ];
        
        for (var k = 0; k < imageUrls.length; k++) {
            var img = new Image();
            img.src = imageUrls[k];
        }

        // Lazy Loading للصور
        var lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            var imageObserver = new IntersectionObserver(function(entries, observer) {
                for (var l = 0; l < entries.length; l++) {
                    var entry = entries[l];
                    if (entry.isIntersecting) {
                        var img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        } else {
                            img.src = img.src;
                        }
                        imageObserver.unobserve(img);
                    }
                }
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });

            for (var m = 0; m < lazyImages.length; m++) {
                var img = lazyImages[m];
                if (!img.src && img.getAttribute('src')) {
                    img.dataset.src = img.getAttribute('src');
                    img.removeAttribute('src');
                }
                imageObserver.observe(img);
            }
        } else {
            // Fallback للمتصفحات القديمة
            for (var n = 0; n < lazyImages.length; n++) {
                var img = lazyImages[n];
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            }
        }
    }
})();