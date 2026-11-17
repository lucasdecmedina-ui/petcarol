const dialog = document.querySelector('#contact-dialog');
function contact(service) {
  const message = service ? `Olá! Gostaria de informações sobre ${service.toLowerCase()}.` : 'Olá! Gostaria de saber mais sobre os cuidados da Ana Carol para meu pet.';
  document.querySelector('#dialog-ponta').href = `https://wa.me/5513974094330?text=${encodeURIComponent(message)}`;
  document.querySelector('#dialog-boqueirao').href = `https://wa.me/5513974077452?text=${encodeURIComponent(message)}`;
  dialog.showModal();
}
document.querySelectorAll('[data-contact]').forEach(el => el.addEventListener('click', () => contact()));
document.querySelectorAll('[data-service]').forEach(el => el.addEventListener('click', () => contact(el.dataset.service)));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {if (event.target === dialog) {const r = dialog.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();}});
document.querySelectorAll('.dialog-unit').forEach(el => el.addEventListener('click', () => dialog.close()));
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navlinks');
menu.addEventListener('click', () => {const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu'); nav.classList.toggle('open', open);});
nav.querySelectorAll('a,button').forEach(el => el.addEventListener('click', () => {nav.classList.remove('open'); menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');}));
document.querySelector('#booking-form').addEventListener('submit', event => {
 event.preventDefault();
 const name = document.querySelector('#pet-name').value.trim();
 const service = document.querySelector('#service').value;
 const unit = document.querySelector('#unit');
 const message = `Olá, equipe Ana Carol! Gostaria de informações sobre ${service.toLowerCase()} na unidade ${unit.selectedOptions[0].text}.${name ? ` Meu pet se chama ${name}.` : ''} Podemos conversar?`;
 window.open(`https://wa.me/${unit.value}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});
document.querySelector('#year').textContent = new Date().getFullYear();
