document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.collection-carousel-section').forEach(section => {
    if (!(section instanceof HTMLElement)) return;

    const swiperEl = section.querySelector('.swiper');
    if (!swiperEl) return;

    const showPagination = section.dataset.showPagination === 'true';

    new window.Swiper(swiperEl, {
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
          slidesPerView: 5
        }
      }
    });
  });
});
