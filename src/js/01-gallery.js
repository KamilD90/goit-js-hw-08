// Opisany w dokumentacji
import SimpleLightbox from './simple-lightbox.js';

import 'simplelightbox/dist/simple-lightbox.min.css';

// Change code below this line
import { galleryItems } from './gallery-items.js';
// Change code below this line

let gallery__list = document.querySelector('.gallery');

galleryItems.forEach(item => {
  let list__element = document.createElement('li');
  list__element.classList.add('gallery__item');

  list__element.innerHTML = `<a class="gallery__link" href="${item.original}">
        <img
        class="gallery__image"
       src="${item.preview}"
       data-source="${item.original}"
        alt="${item.description}"
        title=""
     />
      </a>`;
  gallery__list.appendChild(list__element);
});

document.addEventListener('DOMContentLoaded', function () {
  const lightbox = new SimpleLightbox('.gallery li a  ', {
    captions: true,
    captionsData: 'alt',
    captionsPosition: 'bottom',
    captionDeley: 250,
  });
});
console.log(galleryItems);
