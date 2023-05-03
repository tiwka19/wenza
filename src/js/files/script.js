// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js';
// Підключення списку активних модулів
import { flsModules } from './modules.js';
import ScrollReveal from 'scrollreveal';
import Toastify from 'toastify-js';
import JustValidate from 'just-validate';

let map = document.querySelector('.map');
let places = document.querySelectorAll('.map__box svg path.active');

map.addEventListener('mouseover', (e) => {
  let targetItem = e.target;
  if (targetItem.classList.contains('map__place')) {
    places.forEach((place) => {
      if (targetItem.dataset.map == place.id) {
        place.classList.add('filled');
      } else {
        place.classList.remove('filled');
      }
    });
  } else {
    places.forEach((place) => place.classList.remove('filled'));
  }
});

if (window.matchMedia('(max-width: 1300px)').matches) {
  map.addEventListener('click', (e) => {
    let targetItem = e.target;
    if (targetItem.classList.contains('map__place')) {
      places.forEach((place) => {
        if (targetItem.dataset.map === place.id) {
          place.classList.add('filled');
          let event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
          });
          place.dispatchEvent(event);
        } else {
          place.classList.remove('filled');
        }
      });
    } else {
      places.forEach((place) => place.classList.remove('filled'));
    }
  });
}

const callbackInputs = document.querySelectorAll('.callback__input');
callbackInputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    if (input.value.trim() !== '') {
      input.parentNode.classList.add('_active');
    } else {
      input.parentNode.classList.remove('_active');
    }
  });
});

// получаем все формы на странице
const forms = document.querySelectorAll('form');

// обходим каждую форму и добавляем обработчики событий на каждый инпут
forms.forEach((form) => {
  const formInputs = form.querySelectorAll('.callback__input');
  const formButton = form.querySelector('.callback__button');
  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      const isFormFilled = Array.from(formInputs).every((input) => input.value !== '');
      if (isFormFilled) {
        document.querySelector('.callback__inputs').classList.add('_success');
        formButton.classList.add('_active');
      } else {
        document.querySelector('.callback__inputs').classList.remove('_success');
        formButton.classList.remove('_active');
      }
      if (input.name === 'phone') {
        const input = document.getElementById('phone');
        input.addEventListener('input', () => {
          let phoneNumber = input.value.replace(/\D/g, '');
          if (phoneNumber.length > 0 && phoneNumber[0] !== '+') {
            phoneNumber = '+' + phoneNumber;
          }
          phoneNumber = phoneNumber.slice(0, 2) + ' (' + phoneNumber.slice(2, 5) + ') ' + phoneNumber.slice(5, 8) + '-' + phoneNumber.slice(8, 12);
          input.value = phoneNumber;
        });

        input.addEventListener('keydown', (event) => {
          if (
            isNaN(event.key) &&
            event.key !== 'Backspace' &&
            event.key !== 'Delete' &&
            event.key !== 'ArrowLeft' &&
            event.key !== 'ArrowRight' &&
            event.key !== 'Tab'
          ) {
            event.preventDefault();
          }
        });
      }
    });
  });
});

const contactForms = document.querySelectorAll('.wpcf7');
contactForms.forEach((form) => {
  form.querySelector('button[type="submit"]').addEventListener('click', function () {
    this.textContent = 'Please, wait...';
  });
  form.addEventListener('wpcf7mailsent', (e) => {
    Toastify({
      text: 'Application sent',
      duration: 6000,
      fontSize: 30,
      gravity: 'bottom',
      position: 'center',
      style: {
        background: '#4d64aa',
      },
    }).showToast();
    form.querySelector('button[type="submit"]').textContent = 'Contact us';
  });

  form.addEventListener('wpcf7mailfailed', (e) => {
    Toastify({
      text: 'Application failed',
      duration: 6000,
      fontSize: 30,
      gravity: 'top',
      position: 'right',
      style: {
        background: '#080708',
      },
    }).showToast();
  });
});

window.addEventListener('load', () => {
  if (window.matchMedia('(min-width: 768px)').matches) {
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '30px',
      duration: 800,
      delay: 200,
      reset: false,
    });

    sr.reveal(`.revenue, .benefits, .produce, section.callback, .portfolio, advantages, .team`);
    sr.reveal('.revenue__step, .portfolio__item, .advantages__item, .team__item', { interval: 200 });
    sr.reveal('.benefits__item, .work__step', { interval: 200, origin: 'right' });
    sr.reveal('.revenue__decor', { origin: 'right', delay: 800 });
    sr.reveal('.benefits__decor', { origin: 'left', delay: 800 });
  }
});
