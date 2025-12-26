import { gallery, lightbox, lightboxImage, lightboxOverlay, modalClsBtn } from '../index';

function modalOpen(event) {
  const src = event.target.dataset.source;
  const alt = event.target.getAttribute('alt');
  changeLightboxImage(src, alt);
  lightbox.classList.add('is-open');

  modalClsBtn.addEventListener('click', modalClose);
  lightboxOverlay.addEventListener('click', modalClose);
  window.addEventListener('keydown', modalClose);
  window.addEventListener('keydown', modalKeyInterface);
}

function modalClose(event) {
  if (event.code !== 'Escape' && event.target !== event.currentTarget) {
    return;
  }

  modalClsBtn.removeEventListener('click', modalClose);
  lightbox.classList.remove('is-open');

  lightboxOverlay.removeEventListener('click', modalClose);
  window.removeEventListener('keydown', modalClose);
  window.removeEventListener('keydown', modalKeyInterface);

  lightboxImage.setAttribute('src', '');
  lightboxImage.setAttribute('alt', '');
}

function changeLightboxImage(src, alt) {
  lightboxImage.setAttribute('src', src);
  lightboxImage.setAttribute('alt', alt);
}

function modalKeyInterface(event) {
  const itemsArray = gallery.querySelectorAll('.gallery__image');
  const imgArray = [...itemsArray].map(element => element.dataset.source);

  const currentSrc = lightboxImage.getAttribute('src');
  let index = imgArray.indexOf(currentSrc);

  if (event.code === 'ArrowRight') {
    if (index >= itemsArray.length - 1) {
      index = -1;
    }
    index += 1;
  }

  if (event.code === 'ArrowLeft') {
    if (index <= 0) {
      index = itemsArray.length;
    }
    index -= 1;
  }

  const src = itemsArray[index].dataset.source;
  const alt = itemsArray[index].getAttribute('alt');
  changeLightboxImage(src, alt);
}

export default modalOpen;
