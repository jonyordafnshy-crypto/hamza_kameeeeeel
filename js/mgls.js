// مظلات وسواتر القاسم الحديثة - كود محسن للسرعة والأداء
// جميع الوظائف محفوظة مع تحسين الأداء

// تعريف الدوال العامة (مطلوبة للأزرار)
window.callNumber = function(phoneNumber) {
    if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`)) {
        window.location.href = `tel:${phoneNumber}`;
    }
};

window.whatsappMessage = function(phoneNumber) {
    const message = "مرحباً، أريد الاستفسار عن المجالس الجاهزة من مظلات وسواتر القاسم الحديثة - أفضل مجالس خارجية بالرياض";
    window.open(`https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
};

// تنفيذ الكود بعد تحميل DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. شجرة التنقل
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
            link.addEventListener('click', function() {
                navTree.classList.remove('active');
            });
        });
    }
    
    // 2. سلايدر الخلفية - محسن الأداء
    const slides = document.querySelectorAll('.header-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        // تحميل الصور مسبقاً
        const imageUrls = ['img/mgls10.jpg', 'img/mgls11.webp', 'img/mgls12.webp'];
        imageUrls.forEach(url => { new Image().src = url; });
        
        // دالة تغيير الخلفية - محسنة
        function changeBackground() {
            slides.forEach(slide => { slide.style.opacity = '0'; });
            slides[currentSlide].style.opacity = '0.80';
            currentSlide = (currentSlide + 1) % totalSlides;
        }
        
        changeBackground(); // تشغيل أول مرة
        setInterval(changeBackground, 3000);
    }
    
    // 3. زر الاتصال العائم
    const floatingPhone = document.querySelector('.floating-phone');
    if (floatingPhone) {
        floatingPhone.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('هل تريد الاتصال بالرقم 532228615؟ مظلات وسواتر القاسم الحديثة - أفضل مجالس خارجية بالرياض')) {
                window.location.href = 'tel:0532228615';
            }
        });
    }
    
    // 4. زر العودة للرئيسية
    const backButton = document.querySelector('.back-to-home');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
    
    // 5. تحسين اللمس للهواتف
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.style.transition = 'transform 0.2s ease';
        });
        
        document.querySelectorAll('button, a').forEach(element => {
            element.style.touchAction = 'manipulation';
        });
    }
    
    // 6. تصحيح كلمة "بانال" إلى "بانل" (وظيفة محفوظة)
    document.querySelectorAll('*').forEach(element => {
        if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
            const text = element.childNodes[0].nodeValue;
            if (text && text.includes('بانال')) {
                element.childNodes[0].nodeValue = text.replace(/بانال/g, 'بانل');
            }
        }
    });
    
});

// 7. تحميل الصور الحرجة بعد الصفحة (محسن)
window.addEventListener('load', function() {
    const criticalImages = ['img/logo.webp', 'img/mgls10.jpg', 'img/mgls1.webp'];
    criticalImages.forEach(src => { new Image().src = src; });
});