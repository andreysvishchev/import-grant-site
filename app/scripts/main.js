// import 'fslightbox'; // Lightbox: npm install fslightbox, site: https://fslightbox.com/javascript/documentation
// import Swiper from 'swiper'; // Slider: npm install swiper, site: https://swiperjs.com/get-started
// import AirDatepicker from 'air-datepicker'; // Datepicker: npm i air-datepicker -S, site: https://air-datepicker.com/ru

import Swiper, {
  Pagination
} from 'swiper';


const swiper = new Swiper('.slider', {
  modules: [Pagination],
  pagination: {
    el: ".slider__pagination",
    clickable: true,
  },
});


const subitem = document.querySelector(`[data-menu='subitem']`)
const submenu = document.querySelector(`[data-menu='submenu']`)

subitem.addEventListener('mouseover', (e) => {
  submenu.classList.add('open')
  e.currentTarget.classList.add('open')
})

subitem.addEventListener('mouseout', (e) => {
  submenu.classList.remove('open')
  e.currentTarget.classList.remove('open')
})
