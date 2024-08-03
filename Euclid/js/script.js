let burger = document.querySelector('.burger');
let menu = document.querySelector('.header__nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('burger--active');
  menu.classList.toggle('header__nav--active');
  document.body.classList.toggle('stop-scroll');
});

document.querySelectorAll('.header__link').forEach((el) => {
  el.addEventListener('click', () => {
    burger.classList.remove('burger--active');
    menu.classList.remove('header__nav--active');
    document.body.classList.remove('stop-scroll');
  })
});


let search = document.querySelector('.header__search');
let searchForm = document.querySelector('.header__form');

search.addEventListener('click', () => {
  searchForm.classList.toggle('header__form--active');
});

searchForm.querySelector('.search__cancel').addEventListener('click', () => {
  searchForm.classList.remove('header__form--active');
})



document.querySelectorAll('.how__btn').forEach((tabsBtn) => {
  tabsBtn.addEventListener('click', (e) => {
    const path = e.currentTarget.dataset.path;

    document.querySelectorAll('.how__btn').forEach((btn) => { btn.classList.remove('how__btn--active') })
    e.currentTarget.classList.add('how__btn--active');

    document.querySelectorAll('.how__cards').forEach((tabsBtn) => { tabsBtn.classList.remove('how__cards--active') });
    document.querySelector(`[data-target="${path}"]`).classList.add('how__cards--active');
  });
});


acc = document.querySelectorAll('.faq__item');

acc.forEach((accordion) => {
  accordion.addEventListener('click', () => {
    acc.forEach((accRemove) => {
      accRemove.classList.remove('faq__item--active')
    });
    accordion.classList.toggle('faq__item--active');
  });
});

const swiper = new Swiper('.swiper', {

  loop: true,
  slideToClickedSlide: true,

  lazy: true,

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
});
