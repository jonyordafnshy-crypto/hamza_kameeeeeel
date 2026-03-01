(() => {
    'use strict';
    const d = document;
    d.addEventListener('DOMContentLoaded', () => {
        const imgs = d.querySelectorAll('img:not([loading])');
        for (let i = 0; i < imgs.length; i++) imgs[i].setAttribute('loading', 'lazy');
        const io = new IntersectionObserver((e, o) => {
            for (let i = 0; i < e.length; i++) {
                if (e[i].isIntersecting) {
                    const img = e[i].target;
                    if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); }
                    o.unobserve(img);
                }
            }
        }, { rootMargin: '50px 0px', threshold: .1 });
        const dsImgs = d.querySelectorAll('img[data-src]');
        for (let i = 0; i < dsImgs.length; i++) io.observe(dsImgs[i]);
    });

    const hamburgerMenu = d.getElementById('hamburgerMenu');
    const closeMenu = d.getElementById('closeMenu');
    const sidebarNav = d.getElementById('sidebarNav');
    const overlay = d.getElementById('overlay');
    if (hamburgerMenu && closeMenu && sidebarNav && overlay) {
        hamburgerMenu.addEventListener('click', () => { sidebarNav.classList.add('open'); overlay.classList.add('active'); });
        closeMenu.addEventListener('click', () => { sidebarNav.classList.remove('open'); overlay.classList.remove('active'); });
        overlay.addEventListener('click', () => { sidebarNav.classList.remove('open'); overlay.classList.remove('active'); });
    }

    const searchDB = {
        pages: [
            { id: 1, title: "صور مجالس خارجية واجهات زجاج", url: "mgls.html", content: "صور المجالس الجاهزة - واجهات زجاجية وتصاميم خارجية - مجالس زجاجية خارجية فاخرة - مجالس جاهزة بتصميم كلاسيكي - مجالس زجاجية كبيرة للمنازل - مجالس خارجية مظللة - مجالس جاهزة بأسعار اقتصادية - مجالس زجاجية مودرن - مجالس حدائق خشبية - مجالس خارجية بتصميم عربي - مجالس فلل فاخرة - مجالس مسبح زجاجية - مجالس زجاجية صغيرة - مجالس شتوية معزولة - مجالس زجاجية مطلة - مجالس معدنية صناعية - مجالس متعددة الاستخدام", keywords: "مجالس, زجاج, خارجية, واجهات, جاهزة, تصاميم, كلاسيكي, مظللة, اقتصادية, مودرن, خشبية, عربي, فلل, مسبح, شتوية, معدنية" },
            { id: 2, title: "صور ملاحق تشطيب", url: "mgls.html", content: "ملاحق تشطيب - ملاحق خارجية - تشطيب شقق - تشطيب بيوت - تشطيب غرف - تشطيب اقتصادي - ملاحق متكاملة - تشطيب الملاحق الخارجية - تصميم مقاوم للعوامل الجوية - تكامل بين الداخل والخارج - حلول مبتكرة للمساحات الصغيرة - تشطيب جميع المنازل - تشطيب فلل - تشطيب منازل - تشطيب غرف النوم - تشطيب المجالس - التشطيب الخارجي - التشطيب الكامل - جميع أنواع التشطيبات - تشطيبات مضمونة - ريادة في تشطيب الملاحق", keywords: "ملاحق, تشطيب, شقق, بيوت, غرف, اقتصادي, خارجي, فلل, منازل, غرف نوم, مجالس, خارجي, كامل, أنواع, مضمون" },
            { id: 3, title: "صور موقف السيارات", url: "mgls.html", content: "موقف سيارات ساندوتش بانل مظلات - أنواع وأشكال متنوعة - مقاول تركيب ساندوتش بانل - مميزات أفضل موقف سيارات - مقاول ساندوتش بانل بالرياض - استخدامات ساندوتش بانل - تكلفة ساندوتش بانل - مظلات وسواتر  القاسم المتطورة - طريقة تركيب ساندوتش بانل - الخاتمة - مواقف سيارات حديثة - مواقف تجارية - مواقف سكنية - عزل حراري - تحمل الأوزان", keywords: "موقف, سيارات, ساندوتش, بانل, مظلات, أنواع, مقاول, تركيب, مميزات, استخدامات, تكلفة, مؤسسة, طريقة, حديثة, تجارية, سكنية, عزل, أوزان" },
            { id: 4, title: "برجولات", url: "barjolat.html", content: "برجولات خشبية - برجولات معدنية - برجولات زجاجية - برجولات حديثة - تصميم برجولات", keywords: "برجولات, خشب, معدن, زجاج, حديثة, تصميم" },
            { id: 5, title: "بيوت شعر", url: "pyot_shar_malakya.html", content: "بيوت شعر تقليدية - بيوت شعر ملكية - بيوت شعر فخمة - تركيب بيوت شعر", keywords: "بيوت, شعر, تقليدية, ملكية, فخمة, تركيب" },
            { id: 6, title: "أبواب حديد", url: "abwab_haded.html", content: "أبواب حديد خارجية - أبواب حديد داخلية - أبواب حديد فخمة - أبواب أمنية", keywords: "أبواب, حديد, خارجية, داخلية, فخمة, أمنية" },
            { id: 7, title: "شبوك", url: "shbok.html", content: "شبوك مزارع - شبوك ملاعب - شبوك أمنية - شبوك حدائق", keywords: "شبوك, مزارع, ملاعب, أمنية, حدائق" },
            { id: 8, title: "قرميد", url: "grmed.html", content: "قرميد سقوف - قرميد واجهات - قرميد حدائق - تركيب قرميد", keywords: "قرميد, سقوف, واجهات, حدائق, تركيب" },
        ],
        images: [
            { id: 1, title: "مجالس زجاجية خارجية فاخرة", url: "mgls.html", image: "img/mgls1.webp", keywords: "مجالس, زجاجية, خارجية, فاخرة, مظلات, سواتر" },
            { id: 2, title: "مجالس جاهزة بتصميم كلاسيكي", url: "mgls.html", image: "img/mgls2.webp", keywords: "مجالس, جاهزة, كلاسيكي, تركيب, خارجية" },
            { id: 3, title: "مجالس زجاجية كبيرة للمنازل", url: "mgls.html", image: "img/mgls3.webp", keywords: "مجالس, زجاجية, كبيرة, منازل, مقاولات" },
            { id: 4, title: "مجالس خارجية مظللة", url: "mgls.html", image: "img/mgls4.webp", keywords: "مجالس, خارجية, مظللة, حدائق" },
            { id: 5, title: "مجالس جاهزة بأسعار اقتصادية", url: "mgls.html", image: "img/mgls5.webp", keywords: "مجالس, جاهزة, أسعار, اقتصادية, الرياض" },
            { id: 6, title: "ملاحق تشطيب خارجية", url: "mgls.html", image: "img/mlahek_tashtep1.webp", keywords: "ملاحق, تشطيب, خارجية, ملحقات" },
            { id: 7, title: "تشطيب شقق سكنية", url: "mgls.html", image: "img/mlahek_tashtep2.webp", keywords: "تشطيب, شقق, سكنية, أناقة, وظيفية" },
            { id: 8, title: "موقف سيارات حديث", url: "mgls.html", image: "img/mogef_syarat1.webp", keywords: "موقف, سيارات, حديث, ساندوتش, بانل" },
            { id: 9, title: "موقف سيارات تجاري", url: "mgls.html", image: "img/mogef_syarat2.webp", keywords: "موقف, سيارات, تجاري, مظلات" }
        ],
        articles: [
            { id: 1, title: "مجالس زجاجية خارجية: جمالية العصر مع خصوصية مثالية", url: "mgls.html", content: "تعتبر المجالس الزجاجية الخارجية من أبرز صيحات التصميم الحديث في المملكة العربية السعودية. تمزج هذه المجالس بين الأناقة العصرية والوظيفية العملية، حيث توفر إطلالات بانورامية رائعة مع الحفاظ على الخصوصية والعزل الحراري.", keywords: "مجالس, زجاجية, خارجية, جمالية, عصر, خصوصية, عزل, حراري, سعودية" },
            { id: 2, title: "مجالس خارجية جاهزة: الحل السريع مع الجودة العالية", url: "mgls.html", content: "تتميز المجالس الخارجية الجاهزة بسرعة التركيب وجودة التصنيع العالية. نحن في شركة القاسم نقدم حلولاً متكاملة تشمل: تركيب سريع خلال 48 ساعة، ضمان 5 سنوات على الهياكل، وألوان متعددة تزيد عن 25 لون.", keywords: "مجالس, خارجية, جاهزة, سريع, جودة, تركيب, ضمان, ألوان" },
            { id: 3, title: "تشطيب الملاحق الخارجية - رفع قيمة العقار", url: "mgls.html", content: "تشمل خدماتنا في تشطيب الملاحق الخارجية تقديم حلول متكاملة تبدأ من التصميم الهندسي المتقن وصولاً إلى التنفيذ بأعلى معايير الجودة. نستخدم مواد عزل حراري مقاومة للظروف الجوية القاسية.", keywords: "تشطيب, ملاحق, خارجية, قيمة, عقار, عزل, حراري, جودة" },
            { id: 4, title: "تشطيب الشقق السكنية - أناقة ووظيفية", url: "mgls.html", content: "تخصص شركة القاسم في تشطيب الشقق السكنية يمزج بين الأناقة المعاصرة والكفاءة الوظيفية. نقدم حلولاً ذكية لاستغلال المساحات الصغيرة والمتوسطة، مع التركيز على تخزين مبتكر وإضاءة محسنة.", keywords: "تشطيب, شقق, سكنية, أناقة, وظيفية, مساحات, صغيرة, تخزين, إضاءة" },
            { id: 5, title: "موقف سيارات ساندوتش بانل مظلات في الرياض", url: "mgls.html", content: "موقف سيارات ساندوتش بانل مظلات في الرياض وكافة مدن السعودية للتوريد والتركيب حيث نتميز بتركيب مواقف ساندوتش بانل بجودة عالية باستخدام الحديد، بالإضافة إلى توفير مادة عازلة ممتازة.", keywords: "موقف, سيارات, ساندوتش, بانل, مظلات, الرياض, توريد, تركيب, حديد, عازل" }
        ]
    };

    let searchTimeout = null;
    const searchToggle = d.getElementById('global-search-toggle');
    const searchModal = d.getElementById('search-modal');
    const searchOverlay = d.getElementById('search-overlay');
    const searchInput = d.getElementById('search-input');
    const clearBtn = d.getElementById('clear-search');
    const noResultsMsg = d.getElementById('no-results-message');
    const loadingResults = d.getElementById('loading-results');
    const pagesResults = d.getElementById('pages-results');
    const imagesResults = d.getElementById('images-results');
    const articlesResults = d.getElementById('articles-results');
    const pagesList = d.getElementById('pages-list');
    const imagesList = d.getElementById('images-list');
    const articlesList = d.getElementById('articles-list');

    const closeSearchModal = () => { searchModal.style.display = 'none'; searchOverlay.style.display = 'none'; };
    const clearAllResults = () => {
        pagesList.innerHTML = ''; imagesList.innerHTML = ''; articlesList.innerHTML = '';
        pagesResults.style.display = 'none'; imagesResults.style.display = 'none'; articlesResults.style.display = 'none';
    };
    const showNoResultsMessage = (term = '') => {
        noResultsMsg.style.display = 'block';
        noResultsMsg.innerHTML = term ? `<i class="fas fa-search" style="font-size:40px;margin-bottom:15px;opacity:.5"></i><p>لم يتم العثور على نتائج لـ "<strong>${term}</strong>"</p>` : `<i class="fas fa-search" style="font-size:40px;margin-bottom:15px;opacity:.5"></i><p>اكتب كلمة للبحث عنها في الموقع</p>`;
        loadingResults.style.display = 'none'; clearAllResults();
    };
    const highlightText = (t, s) => s ? t.replace(new RegExp(`(${s})`, 'gi'), '<span class="highlight">$1</span>') : t;

    if (searchToggle && searchModal && searchOverlay) {
        searchToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (searchModal.style.display === 'none' || !searchModal.style.display) {
                searchModal.style.display = 'block'; searchOverlay.style.display = 'block'; searchInput.focus();
            } else { closeSearchModal(); }
        });
        searchOverlay.addEventListener('click', closeSearchModal);
        d.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearchModal(); });
    }

    const performGlobalSearch = () => {
        const term = searchInput.value.trim().toLowerCase();
        clearBtn.style.display = term ? 'block' : 'none';
        if (!term) { showNoResultsMessage(); return; }
        loadingResults.style.display = 'block'; noResultsMsg.style.display = 'none'; clearAllResults();
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const pageResults = searchDB.pages.filter(i => i.title.toLowerCase().includes(term) || i.content.toLowerCase().includes(term) || i.keywords.toLowerCase().includes(term));
            const imageResults = searchDB.images.filter(i => i.title.toLowerCase().includes(term) || i.keywords.toLowerCase().includes(term));
            const articleResults = searchDB.articles.filter(i => i.title.toLowerCase().includes(term) || i.content.toLowerCase().includes(term) || i.keywords.toLowerCase().includes(term));
            loadingResults.style.display = 'none';
            if (pageResults.length) {
                pagesResults.style.display = 'block';
                for (let i = 0; i < pageResults.length; i++) {
                    const item = pageResults[i];
                    const div = d.createElement('div'); div.className = 'search-result-item'; div.onclick = () => { window.location.href = item.url; closeSearchModal(); };
                    div.innerHTML = `<h5>${highlightText(item.title, term)}</h5><p>${highlightText(item.content.substring(0, 150) + '...', term)}</p><span class="result-type">صفحة</span>`;
                    pagesList.appendChild(div);
                }
            }
            if (imageResults.length) {
                imagesResults.style.display = 'block';
                for (let i = 0; i < imageResults.length; i++) {
                    const item = imageResults[i];
                    const div = d.createElement('div'); div.className = 'image-result-item'; div.onclick = () => { window.location.href = item.url; closeSearchModal(); };
                    div.innerHTML = `<img src="${item.image}" alt="${item.title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiNFNUU1RTUiLz48cGF0aCBkPSJNMzAgMjBDMzMuMzEzNyAyMCAzNiAyMi42ODYzIDM2IDI2QzM2IDI5LjMxMzcgMzMuMzEzNyAzMiAzMCAzMkMyNi42ODYzIDMyIDI0IDI5LjMxMzcgMjQgMjZDMjQgMjIuNjg2MyAyNi42ODYzIDIwIDMwIDIwWk0zMCAzNEMyMS4xNjMgMzQgMTQgNDEuMTYzIDE0IDUwSDE4QzE4IDQzLjM3MjYgMjMuMzcyNiAzOCAzMCAzOEMzNi42Mjc0IDM4IDQyIDQzLjM3MjYgNDIgNTBINDZDNDYgNDEuMTYzIDM4LjgzNyAzNCAzMCAzNFoiIGZpbGw9IiM3RjhDOEQiLz48L3N2Zz4=';"><div class="image-info"><h5 style="margin:0 0 5px 0;color:#2c3e50">${highlightText(item.title, term)}</h5><span class="result-type">صورة</span></div>`;
                    imagesList.appendChild(div);
                }
            }
            if (articleResults.length) {
                articlesResults.style.display = 'block';
                for (let i = 0; i < articleResults.length; i++) {
                    const item = articleResults[i];
                    const div = d.createElement('div'); div.className = 'search-result-item'; div.onclick = () => { window.location.href = item.url; closeSearchModal(); };
                    div.innerHTML = `<h5>${highlightText(item.title, term)}</h5><p>${highlightText(item.content.substring(0, 150) + '...', term)}</p><span class="result-type">مقالة</span>`;
                    articlesList.appendChild(div);
                }
            }
            if (!pageResults.length && !imageResults.length && !articleResults.length) showNoResultsMessage(term);
        }, 300);
    };

    if (searchInput) {
        searchInput.addEventListener('keyup', performGlobalSearch);
        searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') performGlobalSearch(); });
    }
    if (clearBtn) clearBtn.addEventListener('click', () => { searchInput.value = ''; clearBtn.style.display = 'none'; showNoResultsMessage(); clearAllResults(); });

    showNoResultsMessage();

    const headerSlides = d.querySelectorAll('.header-slide');
    if (headerSlides.length) {
        let current = 0;
        const changeBg = () => {
            for (let i = 0; i < headerSlides.length; i++) headerSlides[i].style.opacity = '0';
            headerSlides[current].style.opacity = '.80';
            current = (current + 1) % headerSlides.length;
        };
        setInterval(changeBg, 3000);
        changeBg();
        ['img/hanger_index.webp', 'img/barjolat_index.webp'].forEach(url => { const img = new Image(); img.src = url; });
    }

    const phoneLink = d.querySelector('.phone-number');
    if (phoneLink) setInterval(() => { phoneLink.style.textShadow = '0 0 10px rgba(52,152,219,.5)'; setTimeout(() => { phoneLink.style.textShadow = 'none'; }, 500); }, 3000);
})();