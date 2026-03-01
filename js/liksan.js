// liksan.min.js - نسخة محسنة ومصححة للسرعة مع الحفاظ على جميع الوظائف

// دوال الاتصال الأساسية
function callNumber(phoneNumber) {
    if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`)) {
        window.location.href = `tel:${phoneNumber}`;
    }
}

function whatsappMessage(phoneNumber) {
    var message = "أريد استشارة حول تركيب لكسان تغطية بالرياض";
    window.open('https://wa.me/' + phoneNumber.replace('+', '') + '?text=' + encodeURIComponent(message), '_blank');
}

// إعداد الروابط الرئيسية - تحسين الأداء
document.addEventListener('DOMContentLoaded', function() {
    // قائمة الروابط الرئيسية
    var mainNavLinks = document.querySelectorAll('.main-nav a');
    for (var i = 0; i < mainNavLinks.length; i++) {
        mainNavLinks[i].addEventListener('click', function(e) {
            e.preventDefault();
            alert('سيتم توجيهك إلى صفحة: ' + this.textContent + '\n\n(سيتم إنشاء هذه الصفحة لاحقاً)');
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
});

// شجرة التنقل
(function() {
    var navTreeToggle = document.getElementById('navTreeToggle');
    var navTree = document.getElementById('navTree');
    
    if (navTreeToggle && navTree) {
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
        
        var navLinks = navTree.querySelectorAll('a');
        for (var i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener('click', function() {
                navTree.classList.remove('active');
            });
        }
    }
})();

// تبديل خلفيات الهيدر - محسن
(function() {
    var slides = document.querySelectorAll('.header-slide');
    if (slides.length === 0) return;
    
    var currentSlide = 0;
    var totalSlides = slides.length;
    
    // تحميل مسبق للصور
    var imageUrls = ['img/liksan_taghtya10.webp', 'img/liksan_taghtya11.webp', 'img/liksan_taghtya12.webp'];
    for (var i = 0; i < imageUrls.length; i++) {
        var img = new Image();
        img.src = imageUrls[i];
    }
    
    function changeBackground() {
        for (var i = 0; i < slides.length; i++) {
            slides[i].style.opacity = '0';
        }
        slides[currentSlide].style.opacity = '0.80';
        currentSlide = (currentSlide + 1) % totalSlides;
    }
    
    changeBackground();
    setInterval(changeBackground, 3000);
})();

// Lazy Loading محسن باستخدام Intersection Observer
(function() {
    if ('IntersectionObserver' in window) {
        var images = document.querySelectorAll('img[loading="lazy"]');
        if (images.length === 0) return;
        
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                if (entry.isIntersecting) {
                    var img = entry.target;
                    var src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        img.style.opacity = '1';
                    }
                    if (img.complete) {
                        img.style.opacity = '1';
                    }
                    imageObserver.unobserve(img);
                }
            }
        }, { rootMargin: '100px 0px', threshold: 0.01 });
        
        for (var i = 0; i < images.length; i++) {
            var img = images[i];
            var src = img.getAttribute('src');
            if (src) {
                img.setAttribute('data-src', src);
                img.removeAttribute('src');
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease-in';
                
                if (img.complete) {
                    img.style.opacity = '1';
                } else {
                    img.addEventListener('load', function() {
                        this.style.opacity = '1';
                    }, { once: true });
                }
                
                imageObserver.observe(img);
            }
        }
    }
})();

// دالة الأسئلة الشائعة - تم إصلاحها بالكامل
window.toggleFAQAdv = function(button) {
    var answer = button.nextElementSibling;
    var icon = button.querySelector('i');
    
    if (!answer || !icon) return;
    
    var isHidden = answer.style.display === 'none' || answer.style.display === '';
    
    if (isHidden) {
        answer.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';
        button.style.background = '#e8f4fc';
    } else {
        answer.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
        button.style.background = '#f8f9fa';
    }
};

// فتح أول سؤال تلقائياً
(function() {
    var firstFAQ = document.querySelector('.faq-advanced button');
    if (firstFAQ) {
        setTimeout(function() {
            window.toggleFAQAdv(firstFAQ);
        }, 500);
    }
})();

// تحميل الصور المرئية فوراً للشاشات الصغيرة
window.addEventListener('load', function() {
    if ('IntersectionObserver' in window) {
        var lazyImages = document.querySelectorAll('img[loading="lazy"][data-src]');
        for (var i = 0; i < lazyImages.length; i++) {
            var img = lazyImages[i];
            if (img.getBoundingClientRect().top < window.innerHeight + 200) {
                var src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                    img.style.opacity = '1';
                }
            }
        }
    }
});