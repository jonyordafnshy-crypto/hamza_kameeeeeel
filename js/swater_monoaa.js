// دالة للاتصال بالرقم
function callNumber(phoneNumber) {
    if (confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`)) {
        window.location.href = `tel:${phoneNumber}`;
    }
}

// دالة لإرسال رسالة واتساب
function whatsappMessage(phoneNumber) {
    const message = "مرحباً، أريد الاستفسار عن السواتر المنوعة من مظلات وسواتر القاسم الحديثة الرياض 0532228615";
    const whatsappURL = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// انتظار تحميل الصفحة
window.onload = function() {
    
    // ===== شجرة التنقل - نسخة مبسطة ومضمونة =====
    var treeBtn = document.getElementById('navTreeToggle');
    var treeMenu = document.getElementById('navTree');
    
    if (treeBtn && treeMenu) {
        console.log('تم العثور على العناصر'); // للتأكد
        
        // عند النقر على الزر
        treeBtn.onclick = function(event) {
            event.stopPropagation();
            console.log('تم النقر على الزر'); // للتأكد
            
            if (treeMenu.classList.contains('active')) {
                treeMenu.classList.remove('active');
            } else {
                treeMenu.classList.add('active');
            }
        };
        
        // عند النقر في أي مكان آخر
        document.onclick = function(event) {
            if (treeMenu.classList.contains('active')) {
                if (!treeMenu.contains(event.target) && event.target !== treeBtn) {
                    treeMenu.classList.remove('active');
                }
            }
        };
        
        // منع إغلاق القائمة عند النقر داخلها
        treeMenu.onclick = function(event) {
            event.stopPropagation();
        };
    } else {
        console.log('لم يتم العثور على العناصر'); // للتأكد
    }
    
    // ===== خلفيات الهيدر المتحركة =====
    var slides = document.querySelectorAll('.header-slide');
    var currentSlide = 0;
    
    if (slides.length > 0) {
        function changeSlide() {
            // إخفاء كل الشرائح
            for (var i = 0; i < slides.length; i++) {
                slides[i].style.opacity = '0';
            }
            
            // إظهار الشريحة الحالية
            slides[currentSlide].style.opacity = '1';
            
            // التالي
            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
        }
        
        // تشغيل التغيير كل 3 ثواني
        changeSlide(); // تشغيل مرة واحدة فوراً
        setInterval(changeSlide, 3000);
    }
};