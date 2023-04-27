// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js';
// Підключення списку активних модулів
import { flsModules } from './modules.js';
import ScrollReveal from 'scrollreveal';

// let marker = document.querySelector('.marker')
// let item = document.querySelectorAll('.menu__item')
// function indicator(navbarElement) {
// 	marker.style.left = navbarElement.offsetLeft + 'px'
// 	marker.style.width = navbarElement.offsetWidth + 'px'
// }
// item.forEach(link => {
// 	link.classList.remove('_active')
// 	link.addEventListener('click', e => {
// 		indicator(e.target)
// 		marker.querySelector('.marker__wrapper').classList.add('_active')
// 	})
// })

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

const sr = ScrollReveal({
  origin: 'bottom',
  distance: '30px',
  duration: 800,
  delay: 200,
});

sr.reveal(`.revenue, .benefits, .produce, section.callback, .portfolio, advantages, .team`, { reset: false });
sr.reveal('.revenue__step, .portfolio__item, .advantages__item, .team__item', { interval: 200 });
sr.reveal('.benefits__item, .work__step', { interval: 200, origin: 'right' });
sr.reveal('.revenue__decor', { origin: 'right', delay: 800 });
sr.reveal('.benefits__decor', { origin: 'left', delay: 800 });
