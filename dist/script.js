'use strict';

// Mobile navigation stays keyboard-accessible and closes after an anchor is chosen.
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open', open);
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menu.focus(); } });

// Native dialog supplies focus trapping and Escape-to-close without a library.
const gallery = [...document.querySelectorAll('[data-index]')];
const dialog = document.querySelector('#gallery-dialog');
const photo = document.querySelector('#gallery-image');
const caption = document.querySelector('#gallery-caption');
let currentPhoto = 0;
function displayPhoto(index) {
  currentPhoto = (index + gallery.length) % gallery.length;
  const source = gallery[currentPhoto].querySelector('img');
  photo.src = source.src; photo.alt = source.alt;
  caption.textContent = `${currentPhoto + 1} / ${gallery.length} · ${source.alt}`;
}
gallery.forEach((button, index) => button.addEventListener('click', () => {
  displayPhoto(index); dialog.showModal(); document.body.classList.add('modal-open');
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('#previous-photo').addEventListener('click', () => displayPhoto(currentPhoto - 1));
document.querySelector('#next-photo').addEventListener('click', () => displayPhoto(currentPhoto + 1));
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); displayPhoto(currentPhoto + (event.key === 'ArrowLeft' ? -1 : 1)); }
});
dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); gallery[currentPhoto].focus(); });

// A static assessment has no MLS feed: summarize preferences, never invent listings.
const search = document.querySelector('#search-form');
const maxPrice = search.elements.max;
const minPrice = search.elements.min;
function validatePrice() {
  maxPrice.setCustomValidity(minPrice.value && maxPrice.value && Number(minPrice.value) > Number(maxPrice.value) ? 'Maximum price must be greater than or equal to minimum price.' : '');
}
minPrice.addEventListener('input', validatePrice); maxPrice.addEventListener('input', validatePrice);
search.addEventListener('submit', event => {
  event.preventDefault(); validatePrice(); if (!search.reportValidity()) return;
  const data = new FormData(search);
  const currency = value => value ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(value)) : 'Any';
  const result = document.querySelector('#search-result');
  result.textContent = `Your search: ${data.get('location')} · ${data.get('type')}\nBedrooms: ${data.get('beds')} · Baths: ${data.get('baths')}\nPrice: ${currency(data.get('min'))} – ${currency(data.get('max'))} · Sort: ${data.get('sort')}\n\nThis preview is not connected to live listings. These filters are not transferred to the original website. `;
  const link = document.createElement('a'); link.href = 'https://marcimetzger.com/listings'; link.target = '_blank'; link.rel = 'noopener'; link.textContent = 'Visit original listings '; const arrow = document.querySelector('.about-cta .button-arrow').cloneNode(true); link.append(arrow); result.append(link); result.hidden = false;
});

// Keep personal data in the page only; never claim a message has been delivered.
document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const result = document.querySelector('#contact-result');
  result.textContent = `Message preview — not sent\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}\n\nTo reach Marci, call (206) 919-6886 or use the original website.`;
  result.hidden = false;
});
