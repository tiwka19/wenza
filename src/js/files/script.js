import { isMobile } from './functions.js';
import { flsModules } from './modules.js';
import ScrollReveal from 'scrollreveal';
import JustValidate from 'just-validate';

const mapFunc = () => {
  let map = document.querySelector('.map');
  let places = document.querySelectorAll('.map__box svg path.active');
  if (!map) return;

  map.addEventListener('mouseover', (e) => {
    let targetItem = e.target.closest('.map__place');
    if (targetItem) {
      places.forEach((place) => {
        if (targetItem.dataset.map === place.id) {
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

if (document.querySelector('.home-page')) {
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
}

window.addEventListener('load', () => {
  if (window.matchMedia('(min-width: 768px)').matches) {
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '30px',
      cleanup: true,
      duration: 800,
      delay: 200,
      reset: false,
    });
    sr.reveal(`.revenue, .benefits, .produce, section.callback, .portfolio, advantages, .team`);
    sr.reveal('.revenue__step, .portfolio__item, .advantages__item, .team__item', { interval: 200 });
    sr.reveal('.benefits__item, .work__step', {
      interval: 200,
      origin: 'right',
    });
    sr.reveal('.revenue__decor', { origin: 'right', delay: 800 });
    sr.reveal('.benefits__decor', { origin: 'left', delay: 800 });
  }
});

const requestForm = () => {
  const fileInputs = document.querySelectorAll('input[type="file"]');
  const form = document.querySelector('.request .wpcf7-form');
  if (!form) return;
  fileInputs.forEach((fileInput) => {
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        const maxLength = 15;
        const extension = fileName.substring(fileName.lastIndexOf('.'));

        let displayText = fileName;
        if (fileName.length > maxLength) {
          const truncatedName = fileName.substring(0, maxLength - 3);
          displayText = truncatedName + '...' + extension;
        }
        fileInput.nextElementSibling.classList.add('_active');
        fileInput.nextElementSibling.querySelector('span').textContent = displayText;
      } else {
        fileInput.nextElementSibling.classList.remove('remove');
        fileInput.nextElementSibling.textContent = fileInput.files[0].name;
        fileInput.nextElementSibling.querySelector('span').textContent = 'upload a photo';
      }
    });
    fileInput.nextElementSibling.querySelector('.remove-button').addEventListener('click', () => {
      fileInput.value = '';
      fileInput.nextElementSibling.classList.remove('_active');
      fileInput.nextElementSibling.querySelector('span').textContent = 'upload a photo';
    });
  });

  form.addEventListener(
    'wpcf7mailsent',
    (e) => {
      fileInputs.forEach((fileInput) => {
        fileInput.value = '';
        fileInput.nextElementSibling.classList.remove('_active');
        fileInput.nextElementSibling.querySelector('span').textContent = 'upload a photo';
      });
    },
    false,
  );

  const validator = new JustValidate(form);
  const inputs = document.querySelectorAll('.request__input');
  inputs.forEach((input) => {
    validator.addField(input, [{ rule: 'required' }]);
  });
  validator.addField('#email', [{ rule: 'email' }]);
};

requestForm();

document.getElementById('generateVCF').addEventListener('click', function () {
  const { firstname, position, company, phone, email, url } = this.dataset;
  const vCardContent = `BEGIN:VCARD\nVERSION:3.0\nFN:${firstname}\nORG:${company}\nTITLE:${position}\nEMAIL:${email}\nTEL;TYPE=WORK:${phone}\nURL:${url}\nEND:VCARD`;
  const blob = new Blob([vCardContent], { type: 'text/vcard' });

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'contact.vcf';

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
});
