// تحسين: JavaScript محسّن بالكامل مع تقليل العمليات الحسابية غير الضرورية

// تحسين: دوال الاتصال الأساسية (موجودة في inline script ولكن نحتفظ بها للتوافق)
function callNumber(phoneNumber) {
    if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`)) {
        window.location.href = `tel:${phoneNumber}`;
    }
}

function whatsappMessage(phoneNumber) {
    const cleanedNumber = phoneNumber.startsWith('0') ? phoneNumber.substring(1) : phoneNumber;
    const message = "مرحباً، أريد الاستفسار عن شقق الساندوتش بانل الجاهزة في الرياض - مظلات وسواتر القاسم الحديثة";
    const whatsappURL = `https://wa.me/966${cleanedNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// تحسين: التنقل السلس للروابط الداخلية
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({ top: targetElement.offsetTop - 100, behavior: 'smooth' });
        }
    });
});

// تحسين: زر الاتصال العائم
const floatingPhone = document.querySelector('.floating-phone');
if (floatingPhone) {
    floatingPhone.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('هل تريد الاتصال بالرقم +966532228615')) {
            window.location.href = 'tel:+966532228615';
        }
    });
}

// تحسين: زر العودة للرئيسية
const backButton = document.querySelector('.back-to-home');
if (backButton) {
    backButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'index.html';
    });
}

// تحسين: شجرة التنقل
const navTreeToggle = document.getElementById('navTreeToggle');
const navTree = document.getElementById('navTree');

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

    navTree.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navTree.classList.remove('active'));
    });
}

// تحسين: كود تبديل الخلفيات
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.header-slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // تحسين: تغيير الخلفية كل 3 ثواني
    function changeBackground() {
        slides.forEach(slide => slide.style.opacity = '0');
        slides[currentSlide].style.opacity = '0.80';
        currentSlide = (currentSlide + 1) % totalSlides;
    }
    
    changeBackground();
    setInterval(changeBackground, 3000);
    
    // تحسين: تحميل مسبق للصور
    const imageUrls = ['img/shogag_sand8.webp', 'img/shogag_sand4.webp', 'img/shogag_sand6.webp'];
    imageUrls.forEach(url => new Image().src = url);
});

// تحسين: تفعيل الأسئلة الشائعة (FAQ)
function initFaq() {
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            document.querySelectorAll('.faq-answer').forEach(item => {
                if (item !== answer) {
                    item.style.display = 'none';
                    const prevIcon = item.previousElementSibling.querySelector('i');
                    if (prevIcon) prevIcon.className = 'fas fa-chevron-down';
                }
            });
            
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                if (icon) icon.className = 'fas fa-chevron-down';
            } else {
                answer.style.display = 'block';
                if (icon) icon.className = 'fas fa-chevron-up';
            }
        });
    });
}

// تحسين: Lazy Loading الذكي باستخدام IntersectionObserver
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src && img.src !== img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            if (!img.dataset.src) {
                img.dataset.src = img.src;
            }
            if (!img.src.includes('data:image/svg+xml')) {
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="' + img.width + '" height="' + img.height + '"%3E%3C/svg%3E';
            }
            imageObserver.observe(img);
        });
    } else {
        // حل بديل للمتصفحات القديمة
        let lazyLoadThrottleTimeout;
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        function lazyLoad() {
            if (lazyLoadThrottleTimeout) clearTimeout(lazyLoadThrottleTimeout);
            
            lazyLoadThrottleTimeout = setTimeout(() => {
                const scrollTop = window.pageYOffset;
                lazyImages.forEach(img => {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        if (img.dataset.src && img.src !== img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                    }
                });
            }, 20);
        }
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationChange', lazyLoad);
        lazyLoad();
    }
}

// تحسين: تحميل جميع الوظائف بعد DOM
document.addEventListener('DOMContentLoaded', function() {
    initFaq();
    initLazyLoading();
});

// تحسين: تحميل الصور المتبقية بعد تحميل الصفحة
window.addEventListener('load', function() {
    setTimeout(() => {
        document.querySelectorAll('img[loading="lazy"]:not([data-loaded])').forEach(img => {
            if (img.dataset.src && !img.src.includes('data:image/svg+xml')) {
                img.src = img.dataset.src;
                img.setAttribute('data-loaded', 'true');
            }
        });
    }, 2000);
});

// تحسين: إزالة أي كود غير مستخدم أو متكرر
// تحسين: دمج جميع الوظائف المتشابهة