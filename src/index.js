import './sass/main.scss';
import galleryItems from './js/initialData';
import modalOpen from './js/modalInterface';

export const gallery = document.querySelector('.js-gallery');
export const lightbox = document.querySelector('.js-lightbox');
export const lightboxImage = lightbox.querySelector('.lightbox__image');
export const lightboxOverlay = lightbox.querySelector('.lightbox__overlay');
export const modalClsBtn = lightbox.querySelector('button[data-action="close-lightbox"]');

gallery.addEventListener('click', getOriginalImgData);
gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));

function createGalleryMarkup(arrayItems) {
  return arrayItems
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src='${preview}'
      data-source="${original}"
      alt='${description}'
    />
  </a>
</li>`;
    })
    .join('');
}

function getOriginalImgData(event) {
  event.preventDefault();

  if (event.target === event.currentTarget) {
    return;
  }

  modalOpen(event);
}
