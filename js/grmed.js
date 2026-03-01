
    // ===== دالة للاتصال =====
    function callNumber(phoneNumber) {
        if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`)) { window.location.href = `tel:${phoneNumber}` }
    }

    // ===== دالة للواتساب =====
    function whatsappMessage(phoneNumber) {
        const message = "مرحباً، أريد الاستفسار عن قرميد من مظلات وسواتر القاسم الحديثة للقرميد والمظلات والسواتر - الرياض 0532228615";
        const whatsappURL = `https://wa.me/966${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank')
    }

    // ===== Lazy Loading الذكي للصور =====
    document.addEventListener('DOMContentLoaded', function () {
        // 1. Lazy Loading للصور
        const images = document.querySelectorAll('img[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) { img.src = img.dataset.src }
                        img.classList.add('loaded');
                        imageObserver.unobserve(img)
                    }
                })
            }, { rootMargin: '100px 0px', threshold: 0.01 });

            images.forEach(img => {
                if (!img.dataset.src && !img.src.includes('data:image/svg+xml')) {
                    img.dataset.src = img.src;
                    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNhcnJlZ2FuZG8gZGUgaW1hZ2VuPC90ZXh0Pjwvc3ZnPg=='
                }
                imageObserver.observe(img)
            })
        }

        // 2. تحسين تجربة تحميل الصور
        images.forEach(img => {
            img.onload = function () { this.style.opacity = '1'; this.style.transition = 'opacity 0.5s ease' };
            if (img.complete) { img.style.opacity = '1' }
        });

        // 3. شجرة التنقل
        const navTreeToggle = document.getElementById('navTreeToggle');
        const navTree = document.getElementById('navTree');

        if (navTreeToggle && navTree) {
            navTreeToggle.addEventListener('click', function (e) { e.stopPropagation(); navTree.classList.toggle('active') });
            document.addEventListener('click', function (event) { if (navTree.classList.contains('active') && !navTree.contains(event.target) && !navTreeToggle.contains(event.target)) { navTree.classList.remove('active') } })
        }

        // 4. خلفية الهيدر المتغيرة
        const slides = document.querySelectorAll('.header-slide');
        if (slides.length > 0) {
            let currentSlide = 0;
            function changeBackground() {
                slides.forEach((slide, index) => { slide.style.opacity = index === currentSlide ? '1' : '0' });
                currentSlide = (currentSlide + 1) % slides.length
            }
            setTimeout(() => { setInterval(changeBackground, 3000); changeBackground() }, 2000)
        }

        // 5. تصحيح "بانال" إلى "بانل" و"هنجار" إلى "هناجر"
        setTimeout(() => {
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
            let node;
            const replacements = [{ from: /بانال/g, to: 'بانل' }, { from: /هنجار/g, to: 'هناجر' }];
            while (node = walker.nextNode()) {
                let text = node.nodeValue;
                replacements.forEach(replacement => { text = text.replace(replacement.from, replacement.to) });
                if (text !== node.nodeValue) { node.nodeValue = text }
            }
        }, 1000);

        // 6. إضافة تأثيرات التمرير
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollBtn = document.querySelector('.scroll-top-btn');
            if (scrollBtn) { scrollBtn.style.display = scrollTop > 500 ? 'block' : 'none' }
        });

        // 7. تحسين الأداء - تعطيل بعض الرسوم المتحركة على الأجهزة البطيئة
        const isLowEndDevice = () => { return navigator.hardwareConcurrency <= 4 || (navigator.deviceMemory && navigator.deviceMemory <= 4) };
        if (isLowEndDevice()) { document.body.classList.add('low-performance') }

        console.log('✅ تم تحميل الصفحة وتحسين الأداء - مظلات وسواتر القاسم الحديثة للقرميد والمظلات والسواتر 0532228615')
    });

    // ===== دالة إنشاء زر التمرير للأعلى =====
    function createScrollTopButton() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollBtn.className = 'scroll-top-btn';
        scrollBtn.style.cssText = 'position:fixed;bottom:100px;right:30px;width:45px;height:45px;background:#3498db;color:white;border:none;border-radius:50%;cursor:pointer;display:none;align-items:center;justify-content:center;font-size:18px;z-index:1000;box-shadow:0 3px 10px rgba(52,152,219,0.3);transition:all 0.3s';
        scrollBtn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }) });
        document.body.appendChild(scrollBtn);
        return scrollBtn
    }

    // إنشاء زر التمرير للأعلى بعد تحميل الصفحة
    setTimeout(createScrollTopButton, 1000)
