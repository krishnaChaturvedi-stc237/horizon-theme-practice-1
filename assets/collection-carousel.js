function initCollectionCarousel(section) {
  if (!(section instanceof HTMLElement)) return;

  const swiperEl = section.querySelector('.swiper');
  if (!swiperEl) return;

  // Prevent double init
  if (swiperEl.classList.contains('swiper-initialized')) return;

  const showPagination = section.dataset.showPagination === 'true';

  // Swiper attaches itself to window.Swiper when loaded via a regular script tag
  const SwiperCtor = window.Swiper;
  if (typeof SwiperCtor !== 'function') {
    console.warn('Swiper library not found for collection carousel section', section.dataset.sectionId);
    return;
  }

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
