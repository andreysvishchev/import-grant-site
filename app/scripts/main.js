// import 'fslightbox'; // Lightbox: npm install fslightbox, site: https://fslightbox.com/javascript/documentation
// import Swiper from 'swiper'; // Slider: npm install swiper, site: https://swiperjs.com/get-started
// import AirDatepicker from 'air-datepicker'; // Datepicker: npm i air-datepicker -S, site: https://air-datepicker.com/ru

import Swiper, {
  Pagination,
  Autoplay
} from 'swiper';

const modals = new GraphModal();

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



const modalForm = document.querySelectorAll('.js-form')
const closeModalBtn = document.querySelector('.js-close')
const formAllInputs = document.querySelectorAll('.form__input, .form__textarea')
closeModalBtn.addEventListener('click', modals.close.bind(modals))

modalForm.forEach(el => {
  el.addEventListener('submit', (event) => {
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
        const inputEmail = thisForm.querySelector('input[name="email"]');
        const inputMessage = thisForm.querySelector('textarea[name="message"]');
        if (result.status == "success") {
          modals.close()
          modals.open('notice');
          const modal = document.querySelector(`[data-graph-target="notice"]`)
          const notice = modal.querySelector('.form__notice')
          notice.textContent = 'Сообщение успешно отправлено!'
          if (inputName) {
            inputName.value = '';
          }
          if (inputPhone) {
            inputPhone.value = '';
          }
          if (inputEmail) {
            inputEmail.value = '';
          }
          if (inputMessage) {
            inputMessage.value = '';
          }
        } else {
          if (result.name) {
            inputName.classList.add('error');
            inputName.setAttribute('title', result.name.trim());
          }
          if (result.phone) {
            inputPhone.classList.add('error');
            inputPhone.setAttribute('title', result.phone.trim());
          }
          if (result.email) {
            inputPhone.classList.add('error');
            inputPhone.setAttribute('title', result.email.trim());
          }
          if (result.message) {
            inputMessage.setAttribute('title', result.message.trim());
          }
        }
        buttonSubmit.removeAttribute('disabled');
        buttonSubmit.classList.remove('disabled')
        buttonSubmit.textContent = buttonSubmitText;
      }).catch((error) => {
        modals.close()
        modals.open('notice');
        const modal = document.querySelector(`[data-graph-target="notice"]`)
        const notice = modal.querySelector('.form__notice')
        notice.textContent = 'При отправке произошла ошибка, попробуйте еще раз'
        buttonSubmit.removeAttribute('disabled');
        buttonSubmit.classList.remove('disabled')
        buttonSubmit.textContent = buttonSubmitText;
      });
  })
})

formAllInputs.forEach((item) => {
  const removeErrorClass = (event) => {
    if (!event.target.classList.contains('error')) {
      return false;
    }
    event.target.classList.remove('error');
  };
  item.addEventListener('input', removeErrorClass);
  item.addEventListener('change', removeErrorClass);
});

const categoryBtn = document.querySelector('.category__btn')
const categoryList = document.querySelector('.category__anchors-list')
const categoryAnchor = document.querySelectorAll('.category__anchor')

if (categoryBtn) {
  categoryBtn.addEventListener('click', () => {
    categoryList.classList.toggle('active')
  })
}

if (categoryAnchor) {
  categoryAnchor.forEach(el => {
    el.addEventListener('click', () => {
      categoryList.classList.remove('active')
    })
  })
}
