// [محسن 2025] JavaScript محسن بالكامل - أداء عالي واستهلاك منخفض للذاكرة
(function() {
    'use strict';

    // [محسن] دالة آمنة للاتصال
    window.callNumber = function(phoneNumber) {
        if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`)) {
            window.location.href = `tel:${phoneNumber}`;
        }
    };

    // [محسن] دالة آمنة للواتساب
    window.whatsappMessage = function(phoneNumber) {
        const message = "مرحباً، أريد الاستفسار عن خدمات البرجولات والجلسات الخارجية من مظلات وسواتر القاسم الحديثة الحديثة في الرياض 0532228615";
        window.open(`https://wa.me/966${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    // [محسن] انتظار تحميل DOM بالكامل
    document.addEventListener('DOMContentLoaded', function() {
        
        // [محسن] التنقل السلس - محسن
        const navLinks = document.querySelectorAll('.nav-links a');
        if (navLinks.length) {
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        window.scrollTo({ top: targetElement.offsetTop - 100, behavior: 'smooth' });
                    }
                });
            });
        }

        // [محسن] زر الاتصال العائم
        const floatingPhone = document.querySelector('.floating-phone');
        if (floatingPhone) {
            floatingPhone.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('هل تريد الاتصال بالرقم 0532228615؟')) {
                    window.location.href = 'tel:0532228615';
                }
            });
        }

        // [محسن] زر العودة للرئيسية
        const backButton = document.querySelector('.back-to-home');
        if (backButton) {
            backButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'index.html';
            });
        }

        // [محسن] شجرة التنقل - محسنة
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

        // [محسن] Intersection Observer محسن للأنيميشن
        const animateElements = document.querySelectorAll('[data-animate="fade-up"]');
        if (animateElements.length) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
            
            animateElements.forEach(element => observer.observe(element));
        }

        // [محسن] تأثيرات التمرير للبطاقات
        const cards = document.querySelectorAll('.service-card, .reason-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => card.style.transition = 'all 0.3s ease');
        });

        // [محسن] تأثيرات الأزرار
        const buttons = document.querySelectorAll('.cta-button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-3px)'; });
            button.addEventListener('mouseleave', function() { this.style.transform = 'translateY(0)'; });
            button.addEventListener('click', function(e) {
                this.style.animation = 'subtleShake 0.5s ease';
                setTimeout(() => this.style.animation = '', 500);
            });
        });

        // [محسن] تأثير العنوان
        const title = document.querySelector('.title-animation');
        if (title) {
            setInterval(() => {
                title.style.animation = 'subtleFloat 3s ease-in-out';
            }, 3000);
        }

        // [محسن] تحميل الصفحة
        document.body.style.opacity = '1';

        // [محسن] Lazy Loading ذكي للصور
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        if (lazyImages.length && 'IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            delete img.dataset.src;
                        }
                        img.style.opacity = '0';
                        img.style.transition = 'opacity 0.3s ease';
                        setTimeout(() => img.style.opacity = '1', 50);
                        observer.unobserve(img);
                    }
                });
            }, { rootMargin: '50px 0px', threshold: 0.1 });

            lazyImages.forEach(img => {
                if (!img.dataset.src && img.src) {
                    img.dataset.src = img.src;
                    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+';
                }
                imageObserver.observe(img);
            });
        }

        // [محسن] Scroll optimization
        let isScrolling;
        window.addEventListener('scroll', () => {
            clearTimeout(isScrolling);
            isScrolling = setTimeout(() => {
                const visibleImages = document.querySelectorAll('img[data-src]');
                visibleImages.forEach(img => {
                    const rect = img.getBoundingClientRect();
                    if (rect.top < window.innerHeight + 100 && rect.bottom > -100 && img.dataset.src) {
                        img.src = img.dataset.src;
                        delete img.dataset.src;
                    }
                });
            }, 100);
        });

        // [محسن] تتبع التمرير
        window.addEventListener('scroll', () => {
            const articleSection = document.querySelector('.full-article');
            if (articleSection) {
                const scrollPosition = window.scrollY;
                const articleTop = articleSection.offsetTop;
                const articleHeight = articleSection.offsetHeight;
                if (scrollPosition > articleTop - 300 && scrollPosition < articleTop + articleHeight) {
                    articleSection.style.transform = 'translateY(0)';
                }
            }
        });

        console.log('✅ [محسن] تم تحميل جميع التحسينات بنجاح!');
    });
})();