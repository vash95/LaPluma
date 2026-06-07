const form = document.querySelector('.contact-form');
const formNote = document.querySelector('.form-note');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  formNote.textContent = '¡Gracias! Hemos preparado tu solicitud de ejemplo. Sustituye este mensaje por tu integración real de contacto.';
  form.reset();
});
