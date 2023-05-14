// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js';
// Підключення списку активних модулів
import { flsModules } from './modules.js';
import Toastify from 'toastify-js';

const mapFunc = () => {
  let map = document.querySelector('.map');
  let places = document.querySelectorAll('.map__box svg path.active');

  if (!map) return;

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
        document.querySelectorAll('.map__place').forEach((mapPlace) => mapPlace.classList.remove('active'));
        targetItem.classList.add('active');
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
      }
    });
  }
};
mapFunc();

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

const forms = document.querySelectorAll('form');
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

const formSubmitting = () => {
  let forms = document.querySelectorAll('.wpcf7');
  forms.forEach((form) => {
    let submitBtn = form.querySelector('input[type="submit"]');
    submitBtn.addEventListener('click', () => {
      submitBtn.value = 'Please, wait...';
    });
    form.querySelector('input[name="email"]').setAttribute('data-required', 'email');
    form.querySelector('input[name="email"]').setAttribute('data-error', 'Invalid email');
    form.addEventListener(
      'wpcf7mailsent',
      (e) => {
        submitBtn.value = 'contact us';
        document.querySelectorAll('.callback__label').forEach((label) => label.classList.remove('_active'));
        Toastify({
          text: 'Application accepted, thank you!',
          duration: 6000,
          fontSize: 30,
          gravity: 'bottom',
          position: 'center',
          style: {
            background: '#4D64AA',
          },
        }).showToast();
      },
      false,
    );
    form.addEventListener(
      'wpcf7invalid',
      () => {
        submitBtn.value = 'contact us';
        submitBtn.disabled = false;
      },
      false,
    );
  });
};
formSubmitting();

// window.addEventListener('load', () => {
//   if (window.matchMedia('(min-width: 768px)').matches) {
//     const sr = ScrollReveal({
//       origin: 'bottom',
//       distance: '30px',
//       cleanup: true,
//       duration: 800,
//       delay: 200,
//       reset: false,
//     });
//     sr.reveal(`.revenue, .benefits, .produce, section.callback, .portfolio, advantages, .team`);
//     sr.reveal('.revenue__step, .portfolio__item, .advantages__item, .team__item', { interval: 200 });
//     sr.reveal('.benefits__item, .work__step', { interval: 200, origin: 'right' });
//     sr.reveal('.revenue__decor', { origin: 'right', delay: 800 });
//     sr.reveal('.benefits__decor', { origin: 'left', delay: 800 });
//   }
// });
