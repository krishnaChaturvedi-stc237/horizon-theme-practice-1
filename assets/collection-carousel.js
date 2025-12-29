function initCollectionCarousel(section) {
  if (!(section instanceof HTMLElement)) return;

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

  // Swiper attaches itself to window.Swiper when loaded via a regular script tag
  const SwiperCtor = window.Swiper;
  if (typeof SwiperCtor !== 'function') {
    console.error('[CollectionCarousel]', section.dataset.sectionId, 'Swiper library not found');
    return;
  }

  const slides = swiperEl.querySelectorAll('.swiper-slide');
  console.debug('[CollectionCarousel]', section.dataset.sectionId, 'initializing swiper, slides:', slides.length);

  // Initialize Swiper instance
  new SwiperCtor(swiperEl, {
    slidesPerView: 1.2,
    spaceBetween: 16,
    pagination: showPagination
      ? {
          el: section.querySelector('.swiper-pagination'),
          clickable: true
        }
      : false,
    breakpoints: {
      640: {
        slidesPerView: 2.2
      },
      1024: {
        slidesPerView: 4
      }
    }
  });
}

// Initial page load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.collection-carousel-section').forEach((section) => {
    initCollectionCarousel(section);
  });
});

// Theme editor support
document.addEventListener('shopify:section:load', (event) => {
  const sectionId = event.detail && event.detail.sectionId;
  const section = sectionId
    ? document.querySelector(`[data-section-id="${sectionId}"]`)
    : event.target.querySelector('.collection-carousel-section');

  if (section) {
    initCollectionCarousel(section);
  }
});
