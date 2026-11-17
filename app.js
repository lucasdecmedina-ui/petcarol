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

// Decorations never capture input or interfere with the contact controls.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let revealObserver;
let pawEvents;
function configureMotion() {
  revealObserver?.disconnect();
  pawEvents?.abort();
  document.querySelectorAll('.paw-particle').forEach(paw => paw.remove());
  const elements = document.querySelectorAll('.service, .about-photo, .about-copy, .unit, .booking form, .instagram');
  if (motionPreference.matches || !('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.remove('reveal-ready'));
    return;
  }
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold: 0.1});
  elements.forEach((el, index) => {
    el.classList.add('reveal-ready');
    el.style.setProperty('--reveal-delay', `${(index % 3) * 65}ms`);
    revealObserver.observe(el);
  });
  pawEvents = new AbortController();
  let previousPoint = null;
  let previousTime = 0;
  let step = 0;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  function leavePaw(event) {
    if (document.querySelectorAll('.paw-particle').length >= 10 || dialog.open) return;
    const paw = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', '#paw');
    paw.appendChild(use);
    paw.classList.add('paw-particle');
    paw.setAttribute('aria-hidden', 'true');
    paw.style.left = `${event.clientX + (step++ % 2 ? 9 : -9)}px`;
    paw.style.top = `${event.clientY + 13}px`;
    paw.style.setProperty('--paw-angle', `${step % 2 ? -22 : 17}deg`);
    document.body.appendChild(paw);
    paw.addEventListener('animationend', () => paw.remove(), {once:true});
    // Also clean up when a background tab pauses animation events.
    window.setTimeout(() => paw.remove(), 1600);
  }
  document.addEventListener('pointermove', event => {
    if (!finePointer.matches || event.pointerType === 'touch') return;
    if (performance.now() - previousTime < 150) return;
    if (previousPoint && Math.hypot(event.clientX - previousPoint.x, event.clientY - previousPoint.y) < 85) return;
    previousTime = performance.now();
    previousPoint = {x:event.clientX,y:event.clientY};
    leavePaw(event);
  }, {passive:true,signal:pawEvents.signal});
  document.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'touch') leavePaw(event);
  }, {passive:true,signal:pawEvents.signal});
}
configureMotion();
motionPreference.addEventListener('change', configureMotion);

const header = document.querySelector('header');
window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 20), {passive:true});
if ('IntersectionObserver' in window) {
  const navigationObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        nav.querySelectorAll('a[href^="#"]').forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, {rootMargin:'-15% 0px -60% 0px'});
  document.querySelectorAll('#inicio, #servicos, #sobre, #unidades, #contato').forEach(section => navigationObserver.observe(section));
}
