// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js';
// Підключення списку активних модулів
import { flsModules } from './modules.js';

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
}


const callbackInputs = document.querySelectorAll('.callback__input');
callbackInputs.forEach(input => {
  input.addEventListener('input', (e) => {
    if(input.value.trim() !== '') {
      input.parentNode.classList.add('_active')
    } else {
      input.parentNode.classList.remove('_active');
    }
  })
})