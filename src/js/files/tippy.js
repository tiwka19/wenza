// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile, FLS } from './functions.js';
// Підключення списку активних модулів
import { flsModules } from './modules.js';

// Підключення з node_modules
import tippy from 'tippy.js';

// Підключення стилів з src/scss/libs
import '../../scss/libs/tippy.scss';
// Підключення стилів з node_modules
//import 'tippy.js/dist/tippy.css';

if (window.matchMedia('(max-width: 1300px)').matches) {
  flsModules.tippy = tippy('[data-tippy-content]', {
    trigger: 'click',
  });
}
