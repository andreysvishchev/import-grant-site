// import 'fslightbox'; // Lightbox: npm install fslightbox, site: https://fslightbox.com/javascript/documentation
// import Swiper from 'swiper'; // Slider: npm install swiper, site: https://swiperjs.com/get-started
// import AirDatepicker from 'air-datepicker'; // Datepicker: npm i air-datepicker -S, site: https://air-datepicker.com/ru

import Swiper, {
  Pagination,
  Autoplay
} from 'swiper';

const modal = new GraphModal();

const swiper = new Swiper('.slider', {
  speed: 600,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  modules: [Pagination, Autoplay],
  pagination: {
    el: ".slider__pagination",
    clickable: true,
  },
});


const subBtn = document.querySelector(`[data-menu='sub-btn']`)
const submenu = document.querySelector(`[data-menu='sub-menu']`)

subBtn.addEventListener('click', () => {
  subBtn.classList.toggle('open')
  submenu.classList.toggle('open')
})

const burger = document.querySelector('.burger')
const menu = document.querySelector('.menu')

burger.addEventListener('click', () => {
  burger.classList.toggle('open')
  menu.classList.toggle('open')
})

const workemailList = document.querySelectorAll('.workemail');
workemailList.forEach((item) => {
  item.value = '';
  item.removeAttribute('required');
});
