// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js'
// Підключення списку активних модулів
import { flsModules } from './modules.js'

let marker = document.querySelector('.marker')
let item = document.querySelectorAll('.menu__item')

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
