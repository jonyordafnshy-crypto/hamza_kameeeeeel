// تحسين الأداء: دالة اتصال واحدة
function callNumber(phoneNumber) {
    if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`)) {
        window.location.href = `tel:${phoneNumber}`;
    }
}

// تحسين الأداء: دالة واتساب واحدة
function whatsappMessage(phoneNumber) {
    const message = "مرحباً، أريد الاستفسار عن برجولات الجلسات والخدمات التي تقدمها مؤسسة القاسم 0532228615";
    window.open(`https://wa.me/${phoneNumber.replace('+','')}?text=${encodeURIComponent(message)}`, '_blank');
}

// تحسين الأداء: تهيئة المكونات بعد تحميل DOM
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة شجرة التنقل
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

    // تحسين الأداء: تغيير خلفيات الهيدر
    const slides = document.querySelectorAll('.header-slide');
    if (slides.length > 1) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        const changeBackground = () => {
            slides.forEach(slide => slide.style.opacity = '0');
            slides[currentSlide].style.opacity = '0.80';
            currentSlide = (currentSlide + 1) % totalSlides;
        };
        
        // تأخير بدء التغيير لتحسين الأداء
        setTimeout(() => {
            changeBackground();
            setInterval(changeBackground, 3000);
        }, 100);
    }

    // تحسين الأداء: Lazy Loading ذكي للصور
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // إزالة السمات غير الضرورية بعد التحميل
                    img.removeAttribute('loading');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px', // تحميل قبل ظهور الصورة بـ 50px
            threshold: 0.01
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            if (!img.complete) imageObserver.observe(img);
        });
    }

    // تحسين الأداء: تصحيح الأخطاء الإملائية في النصوص فقط
    const textNodes = [];
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walk.nextNode()) {
        if (node.nodeValue.includes('بانال') || node.nodeValue.includes('هنجار')) {
            textNodes.push(node);
        }
    }
    
    textNodes.forEach(node => {
        node.nodeValue = node.nodeValue.replace(/بانال/g, 'بانل').replace(/هنجار/g, 'هناجر');
    });
});

// تحسين الأداء: تحميل مسبق للصور المهمة فقط
const preloadImportantImages = () => {
    const importantImages = ['img/prjolat_jalasat10.webp', 'img/prjolat_jalasat11.webp', 'img/prjolat_jalasat12.webp'];
    importantImages.forEach(src => new Image().src = src);
};

// تأخير تحميل الصور المهمة حتى بعد تحميل الصفحة
if (document.readyState === 'complete') {
    setTimeout(preloadImportantImages, 2000);
} else {
    window.addEventListener('load', () => setTimeout(preloadImportantImages, 2000));
}