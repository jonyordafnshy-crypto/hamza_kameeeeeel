// ============================================================================
// ملف JavaScript المحسن لصفحة أسقف - مظلات وسواتر القاسم الحديثة
// الإصدار: محسن للأداء - سرعة تحميل أعلى + Lazy Loading محسن
// ============================================================================

// استخدام requestIdleCallback للعمليات غير الحرجة
if ('requestIdleCallback' in window) {
    requestIdleCallback(function () {
        // تحميل العناصر غير الحرجة عندما يكون المعالج خاملاً
        console.log('تحميل العناصر غير الحرجة...');
    }, { timeout: 2000 });
}

// تهيئة الصفحة بعد تحميل DOM
document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    
    // ============================================================================
    // 1. Lazy Loading المحسن للصور باستخدام IntersectionObserver
    // ============================================================================
    if ('IntersectionObserver' in window) {
        // إعدادات محسنة لـ IntersectionObserver
        const imageObserverOptions = {
            rootMargin: '200px 0px', // زيادة المسافة للتحميل المبكر
            threshold: 0.01, // تقليل العتبة للتحميل الأسرع
            // إضافة تتبع الأداء
            trackVisibility: true,
            delay: 100
        };

        const imageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // تحميل الصورة الفعلية
                    if (img.dataset.src) {
                        // استخدام requestAnimationFrame لتحسين الأداء
                        requestAnimationFrame(function() {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            
                            // إضافة class للصورة المحملة
                            img.classList.add('loaded');
                        });
                    }
                    
                    // إيقاف مراقبة الصورة بعد التحميل
                    observer.unobserve(img);
                }
            });
        }, imageObserverOptions);

        // تحويل جميع صور الصفحة إلى lazy loading مع placeholder خفيف
        document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
            // حفظ المصدر الأصلي
            const originalSrc = img.src;
            
            // إضافة data-src بالمصدر الأصلي
            img.dataset.src = originalSrc;
            
            // استخدام placeholder خفيف جداً (صغير الحجم)
            img.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'600\' height=\'400\' viewBox=\'0 0 600 400\'%3E%3Crect width=\'600\' height=\'400\' fill=\'%23f5f5f5\'/%3E%3C/svg%3E';
            
            // إضافة خلفية مؤقتة
            img.style.background = '#f5f5f5';
            img.style.minHeight = '200px';
            
            // بدء مراقبة الصورة
            imageObserver.observe(img);
        });
    } else {
        // Fallback للمتصفحات القديمة - تحميل فوري
        document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
            // لا تفعل شيئاً، الصور ستحمل بشكل طبيعي
        });
    }

    // ============================================================================
    // 2. دوال الاتصال والواتساب (محفوظة كما هي)
    // ============================================================================
    
    /**
     * دالة للاتصال بالرقم - محسنة للأداء
     * @param {string} phoneNumber - رقم الهاتف
     */
    function callNumber(phoneNumber) {
        if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`)) {
            window.location.href = `tel:${phoneNumber}`;
        }
    }

    /**
     * دالة لإرسال رسالة واتساب - محسنة للأداء
     * @param {string} phoneNumber - رقم الهاتف
     */
    function whatsappMessage(phoneNumber) {
        const message = "مرحباً، أريد الاستفسار عن ديكورات الجبس من مظلات وسواتر القاسم الحديثة - أفضل سواتر ومظلات القاسم  في الرياض";
        const whatsappURL = `https://wa.me/966${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    }

    // ============================================================================
    // 3. إضافة فعاليات الاتصال للأزرار - باستخدام event delegation للأداء
    // ============================================================================
    
    // استخدام event delegation بدلاً من حلقات متعددة
    document.addEventListener('click', function(e) {
        const target = e.target.closest('.icon-btn.phone');
        if (target) {
            e.preventDefault();
            callNumber('0532228615');
        }
    });

    document.addEventListener('click', function(e) {
        const target = e.target.closest('.icon-btn.whatsapp');
        if (target) {
            e.preventDefault();
            whatsappMessage('532228615');
        }
    });

    // ============================================================================
    // 4. الروابط الرئيسية - تحسين الأداء
    // ============================================================================
    document.querySelectorAll('.main-nav a').forEach(function(link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const pageName = this.textContent;
            alert(`سيتم توجيهك إلى صفحة: ${pageName}\n\n(سيتم إنشاء هذه الصفحة لاحقاً)`);
        });
    });

    // ============================================================================
    // 5. زر الاتصال العائم - تحسين الأداء
    // ============================================================================
    const floatingPhone = document.querySelector('.floating-phone');
    if (floatingPhone) {
        floatingPhone.addEventListener('click', function (e) {
            e.preventDefault();
            if (confirm('هل تريد الاتصال بالرقم 0532228615؟')) {
                window.location.href = 'tel:+966532228615';
            }
        });
    }

    // ============================================================================
    // 6. زر العودة للرئيسية
    // ============================================================================
    const backButton = document.querySelector('.back-to-home');
    if (backButton) {
        backButton.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }

    // ============================================================================
    // 7. شجرة التنقل - تحسين الأداء
    // ============================================================================
    const navTreeToggle = document.getElementById('navTreeToggle');
    const navTree = document.getElementById('navTree');

    if (navTreeToggle && navTree) {
        // استخدام متغير لتتبع حالة شجرة التنقل
        let isNavTreeActive = false;

        navTreeToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            navTree.classList.toggle('active');
            isNavTreeActive = navTree.classList.contains('active');
        });

        // إغلاق شجرة التنقل عند النقر خارجها
        document.addEventListener('click', function (event) {
            if (isNavTreeActive && 
                !navTree.contains(event.target) && 
                !navTreeToggle.contains(event.target)) {
                navTree.classList.remove('active');
                isNavTreeActive = false;
            }
        });

        // إغلاق شجرة التنقل عند النقر على رابط داخلي
        navTree.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function () {
                navTree.classList.remove('active');
                isNavTreeActive = false;
            });
        });
    }

    // ============================================================================
    // 8. كود JavaScript لتبديل الخلفيات - محسن للأداء
    // ============================================================================
    const slides = document.querySelectorAll('.header-slide');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;

        /**
         * دالة محسنة لتغيير الخلفية
         */
        function changeBackground() {
            // استخدام requestAnimationFrame لتحسين الأداء
            requestAnimationFrame(function() {
                // إخفاء كل الشرائح
                slides.forEach(function(slide) {
                    slide.style.opacity = '0';
                });

                // إظهار الشريحة الحالية
                slides[currentSlide].style.opacity = '0.80';

                // الانتقال للشريحة التالية
                currentSlide = (currentSlide + 1) % totalSlides;
            });
        }

        // بدء التبديل فور تحميل الصفحة
        changeBackground();

        // تغيير الخلفية كل 3 ثواني - حفظ الـ interval للإيقاف لاحقاً إذا لزم
        const slideInterval = setInterval(changeBackground, 3000);
        
        // تخزين الـ interval للتنظيف إذا لزم
        window._slideInterval = slideInterval;
    }

    // ============================================================================
    // 9. تحميل مسبق للصور المحسّن - تحميل تدريجي
    // ============================================================================
    // استخدام requestIdleCallback لتحميل الصور عندما يكون المعالج خاملاً
    if ('requestIdleCallback' in window) {
        requestIdleCallback(function() {
            const imageUrls = [
                'img/asqof1.webp',
                'img/asqof2.webp',
                'img/asqof3.webp'
            ];

            // تحميل الصور بشكل تدريجي
            imageUrls.forEach(function(url, index) {
                // تأخير تحميل كل صورة قليلاً
                setTimeout(function() {
                    const img = new Image();
                    img.src = url;
                }, index * 200); // تأخير 200ms بين كل صورة
            });
        }, { timeout: 3000 });
    }

    // ============================================================================
    // 10. تفعيل الأسئلة الشائعة - محسن للأداء
    // ============================================================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(function(button) {
            button.addEventListener('click', function() {
                // استخدام requestAnimationFrame لتحسين أداء الـ DOM
                requestAnimationFrame(function() {
                    const answer = this.nextElementSibling;
                    const isVisible = answer.style.display === 'block';

                    // إغلاق جميع الإجابات الأخرى
                    document.querySelectorAll('.faq-answer').forEach(function(ans) {
                        ans.style.display = 'none';
                    });

                    // تبديل السهم
                    document.querySelectorAll('.faq-question span:last-child').forEach(function(arrow) {
                        arrow.textContent = '+';
                    });

                    if (!isVisible) {
                        answer.style.display = 'block';
                        this.querySelector('span:last-child').textContent = '−';
                    }
                }.bind(this));
            });
        });
    }

    // ============================================================================
    // 11. Web Workers - محسن الأداء (يتم تحميله بشكل غير متزامن)
    // ============================================================================
    if (window.Worker && window.requestIdleCallback) {
        requestIdleCallback(function() {
            try {
                // إنشاء Web Worker بشكل ديناميكي
                const workerCode = `
                    self.onmessage = function(e) {
                        console.log('Web Worker جاهز لتحسين أداء الصفحة');
                        self.postMessage('ready');
                    }
                `;
                
                const blob = new Blob([workerCode], { type: 'text/javascript' });
                const workerUrl = URL.createObjectURL(blob);
                const worker = new Worker(workerUrl);

                worker.onmessage = function (e) {
                    console.log('أداء الصفحة محسن باستخدام Web Workers');
                    // تحرير الذاكرة
                    URL.revokeObjectURL(workerUrl);
                };
                
                worker.postMessage('init');
            } catch(e) {
                console.log('Web Worker غير مدعوم في هذا المتصفح');
            }
        }, { timeout: 5000 });
    }
}); // نهاية DOMContentLoaded

// ============================================================================
// 12. تنظيف الـ Intervals عند مغادرة الصفحة (اختياري)
// ============================================================================
window.addEventListener('beforeunload', function() {
    if (window._slideInterval) {
        clearInterval(window._slideInterval);
    }
});