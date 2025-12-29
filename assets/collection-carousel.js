console.log('[CollectionCarousel] script loaded');

function initCollectionCarousel(section) {
    if (!(section instanceof HTMLElement)) {
        console.warn('[CollectionCarousel] init called with non-HTMLElement', section);
        return;
    }

    console.log('[CollectionCarousel] init section', section.dataset.sectionId, {
        showPagination: section.dataset.showPagination,
        showNavigation: section.dataset.showNavigation,
    });

    const swiperEl = section.querySelector('.swiper');
    if (!swiperEl) {
        console.warn('[CollectionCarousel]', section.dataset.sectionId, 'no .swiper element found');
        return;
    }

    // Prevent double init
    if (swiperEl.classList.contains('swiper-initialized')) {
        console.debug('[CollectionCarousel]', section.dataset.sectionId, 'already initialized');
        return;
    }

    const showPagination = section.dataset.showPagination === 'true';
    const showNavigation = section.dataset.showNavigation === 'true';

    // Swiper attaches itself to window.Swiper when loaded via a regular script tag
    const SwiperCtor = window.Swiper;
    console.log('[CollectionCarousel] window.Swiper type', typeof SwiperCtor);
    if (typeof SwiperCtor !== 'function') {
        console.error('[CollectionCarousel]', section.dataset.sectionId, 'Swiper library not found');
        return;
    }

    const slides = swiperEl.querySelectorAll('.swiper-slide');
    console.log('[CollectionCarousel]', section.dataset.sectionId, 'initializing swiper, slides:', slides.length);

    // Initialize Swiper instance
    new SwiperCtor(swiperEl, {
        slidesPerView: 1.2,
        slidesPerGroup: 1,
        spaceBetween: 16,
        watchOverflow: true,
        pagination: {
            el: section.querySelector('.swiper-pagination'),
            clickable: true,
            enabled: showPagination,
        },
        navigation: {
            nextEl: section.querySelector('.swiper-button-next'),
            prevEl: section.querySelector('.swiper-button-prev'),
            enabled: showNavigation,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            1024: {
                slidesPerView: 5,
                slidesPerGroup: 5,
            },
        },
    });
}

// Initial page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('[CollectionCarousel] DOMContentLoaded');
    const sections = document.querySelectorAll('.collection-carousel-section');
    console.log('[CollectionCarousel] found sections on load:', sections.length);
    sections.forEach((section) => {
        initCollectionCarousel(section);
    });
});

// Theme editor support
document.addEventListener('shopify:section:load', (event) => {
    const sectionId = event.detail && event.detail.sectionId;
    console.log('[CollectionCarousel] shopify:section:load', sectionId, event);
    const section = sectionId
        ? document.querySelector(`[data-section-id="${sectionId}"]`)
        : event.target.querySelector('.collection-carousel-section');

    if (section) {
        initCollectionCarousel(section);
    } else {
        console.warn('[CollectionCarousel] no section element found for section load event');
    }
});
