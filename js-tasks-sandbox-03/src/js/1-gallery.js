// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import images from './data';
// console.log(images);
const galleryRoot = document.querySelector('.gallery');
console.log(SimpleLightbox);
if (galleryRoot) {
  const data = images
    .map(image => {
      const { description, original, preview } = image;
      return `<li class="gallery-item">
	<a class="gallery-link" href="${original}">
		<img 
		  class="gallery-image" 
		  src="${preview}" 
		  alt="${description}"
		/>
	</a>
</li>`;
    })
    .join('');
  galleryRoot.insertAdjacentHTML('beforeend', data);

  let gallery = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: '250',
    captionClass: 'caption-text',
    // captions: true,
    // Нехай підпис буде знизу
    // і з'являється через 250 мілісекунд після відкриття модального вікна.
  });
}
