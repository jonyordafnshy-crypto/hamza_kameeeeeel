// ✅ دالة للاتصال بالرقم - محسّنة
function callNumber(phoneNumber){confirm(`هل تريد الاتصال بالرقم ${phoneNumber}؟`)&&(window.location.href=`tel:${phoneNumber}`)}

// ✅ دالة لإرسال رسالة واتساب - محسّنة
function whatsappMessage(phoneNumber){const message="مرحباً، أريد الاستفسار عن غرف عمال ساندوتش بانل الجاهزة - مظلات وسواتر القاسم الحديثة الرياض 0532228615";window.open(`https://wa.me/${phoneNumber.replace('+','')}?text=${encodeURIComponent(message)}`,'_blank')}

// ✅ التنقل السلس للروابط الداخلية - محسّن
document.querySelectorAll('.nav-links a').forEach(link=>{link.addEventListener('click',function(e){e.preventDefault();const targetId=this.getAttribute('href').substring(1);const targetElement=document.getElementById(targetId);targetElement&&window.scrollTo({top:targetElement.offsetTop-100,behavior:'smooth'})})});

// ✅ زر الاتصال العائم - محسّن
const floatingPhone=document.querySelector('.floating-phone');floatingPhone.addEventListener('click',function(e){e.preventDefault();confirm('هل تريد الاتصال بالرقم 532228615؟')&&(window.location.href='tel:+966532228615')});

// ✅ زر العودة للرئيسية - محسّن
const backButton=document.querySelector('.back-to-home');backButton.addEventListener('click',function(e){e.preventDefault();window.location.href='index.html'});

// ✅ شجرة التنقل - محسّنة
(function(){const navTreeToggle=document.getElementById('navTreeToggle');const navTree=document.getElementById('navTree');if(navTreeToggle&&navTree){navTreeToggle.addEventListener('click',function(e){e.stopPropagation();navTree.classList.toggle('active')});document.addEventListener('click',function(event){navTree.classList.contains('active')&&!navTree.contains(event.target)&&!navTreeToggle.contains(event.target)&&navTree.classList.remove('active')});navTree.querySelectorAll('a').forEach(link=>{link.addEventListener('click',function(){navTree.classList.remove('active')})})}})();

// ✅ كود JavaScript لتبديل الخلفيات - محسّن
(function(){const slides=document.querySelectorAll('.header-slide');if(slides.length){let currentSlide=0;const totalSlides=slides.length;function changeBackground(){slides.forEach(slide=>{slide.style.opacity='0'});slides[currentSlide].style.opacity='0.80';currentSlide=(currentSlide+1)%totalSlides}setInterval(changeBackground,3000);changeBackground();const imageUrls=['img/ghoraf_ammal_sand3.webp','img/ghoraf_ammal_sand2.webp','img/ghoraf_ammal_sand1.webp'];imageUrls.forEach(url=>{const img=new Image();img.src=url})}})();

// ✅ كود JavaScript للـ Lazy Loading الذكي - محسّن
(function(){const lazyImages=document.querySelectorAll('.lazy-img');if(lazyImages.length){const imageObserver=new IntersectionObserver((entries,observer)=>{entries.forEach(entry=>{if(entry.isIntersecting){const image=entry.target;const src=image.getAttribute('src');if(src){const img=new Image();img.onload=function(){image.classList.add('loaded');image.style.opacity=1};img.src=src}observer.unobserve(image)}})},{root:null,rootMargin:'50px',threshold:0.1});lazyImages.forEach(image=>{imageObserver.observe(image)});window.addEventListener('load',function(){lazyImages.forEach(image=>{const rect=image.getBoundingClientRect();if(rect.top<window.innerHeight+100){const src=image.getAttribute('src');if(src){const img=new Image();img.onload=function(){image.classList.add('loaded');image.style.opacity=1};img.src=src}imageObserver.unobserve(image)}})})}})();

// ✅ كود لتحسين أداء التمرير - محسّن
let scrollTimeout;window.addEventListener('scroll',function(){clearTimeout(scrollTimeout);scrollTimeout=setTimeout(function(){document.querySelectorAll('.lazy-img:not(.loaded)').forEach(image=>{const rect=image.getBoundingClientRect();if(rect.top<window.innerHeight+300&&rect.bottom>-300){const src=image.getAttribute('src');if(src){const img=new Image();img.onload=function(){image.classList.add('loaded');image.style.opacity=1};img.src=src}}})},100)});

// ✅ كود لتحسين سرعة التحميل الأولي - محسّن
window.addEventListener('load',function(){const devToolsBar=document.querySelector('.dev-tools-bar');devToolsBar&&(devToolsBar.style.display='none');console.log('✅ صفحة غرف عمال ساندوتش بانل تم تحميلها بنجاح - مظلات وسواتر القاسم الحديثة')});

// ✅ كود لتحسين تجربة المستخدم على الأجهزة المحمولة - محسّن
if('ontouchstart' in window){document.body.classList.add('touch-device');document.querySelectorAll('.icon-btn').forEach(btn=>{btn.style.tapHighlightColor='transparent';btn.style.userSelect='none'})}