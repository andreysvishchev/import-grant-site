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

(function () {
  function mask(phone) {
    var code = '+7',
      find = /\+7/;
    code = '+';
    find = /\+/;
    phone.addEventListener('focus', function () {
      phone.value = code + " " + phone.value.replace(code + ' ', '');
    });
    phone.addEventListener('input', function () {
      var val = phone.value.replace(find, ''),
        res = code + " ";
      val = val.replace(/[^0-9]/g, '');

      for (var i = 0; i < val.length; i++) {
        //res+= i===0?' ':'';
        res += i === 1 ? ' (' : '';
        res += i == 4 ? ') ' : '';
        res += i == 7 || i == 9 ? ' ' : '';
        if (i == 11) break;
        res += val[i];
      }

      phone.value = res;
    });
    phone.addEventListener('blur', function () {
      var val = phone.value.replace(find, '');
      val = val.trim();
      if (!val) phone.value = null;
    });
  }

  var phone = document.querySelectorAll('.js-input');

  if (phone) {
    var i = phone.length;

    while (i--) {
      mask(phone[i]);
    }
  }

  return true;
})();

function closeModal() {
  const modalContainer = document.querySelector('.graph-modal')
  const modals = document.querySelectorAll('.graph-modal__container')
  modalContainer.classList.remove('is-open')
  modals.forEach(el => {
    el.classList.remove('animate-open');
    el.classList.remove('graph-modal-open');
  })
}


const modalForm = document.getElementById('modal-form')
const closeMidalBtn = document.querySelector('.js-close')
closeMidalBtn.addEventListener('click', closeModal)

modalForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const thisForm = event.target;
  const formData = new FormData(thisForm);
  const buttonSubmit = thisForm.querySelector('.js-btn');
  const buttonSubmitText = buttonSubmit.textContent
  buttonSubmit.setAttribute('disabled', 'true');
  buttonSubmit.classList.add('disabled')
  buttonSubmit.textContent = 'идет отправка...';

  fetch('/obrabotchik-formy', {
      method: 'POST',
      body: formData,
    })
    .then((response) => response.json())
    .then((result) => {
      const inputName = thisForm.querySelector('input[name="name"]');
      const inputPhone = thisForm.querySelector('input[name="phone"]');
      if (result.status == "success") {
        closeModal()
        new GraphModal().open('notice');
        const modal = document.querySelector(`[data-graph-target="notice"]`)
        const notice = modal.querySelector('.form__notice')
        notice.textContent = 'Сообщение успешно отправлено!'
        inputName.value = '';
        inputPhone.value = '';
      } else {
        if (result.name) {
          inputName.classList.add('error');
          inputName.setAttribute('title', result.name.trim());
        }
        if (result.phone) {
          inputPhone.classList.add('error');
          inputPhone.setAttribute('title', result.phone.trim());
        }
      }
      buttonSubmit.removeAttribute('disabled');
      buttonSubmit.classList.remove('disabled')
      buttonSubmit.textContent = buttonSubmitText;
    }).catch((error) => {
      closeModal()
      new GraphModal().open('notice');
      const modal = document.querySelector(`[data-graph-target="notice"]`)
      const notice = modal.querySelector('.form__notice')
      notice.textContent = 'При отправке произошла ошибка, попробуйте еще раз'

      buttonSubmit.removeAttribute('disabled');
      buttonSubmit.classList.remove('disabled')
      buttonSubmit.textContent = buttonSubmitText;
    });
});
