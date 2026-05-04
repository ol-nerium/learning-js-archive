import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';

import './css/main.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import ImageCardsService from './js/images-api-service';
import imageCardTpl from './templates/image-card.hbs';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const gallery = document.querySelector('.js-gallery');
const loadMoreBtn = document.querySelector('.load-more');
const searchForm = document.querySelector('.search-form');
let lightbox = new SimpleLightbox('.photo-card a');

const imageCardsService = new ImageCardsService();
let cardsCounter = null;
let isAllCardsLoaded = null;

const debouncedGetNewCards = debounce(getNewCards, DEBOUNCE_DELAY);
const debouncedUploadNewCards = debounce(uploadNewCards, DEBOUNCE_DELAY);
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  debouncedGetNewCards(e);
});
loadMoreBtn.addEventListener('click', e => {
  e.preventDefault();
  debouncedUploadNewCards(e);
});

function getNewCards(event) {
  loadMoreBtn.style.display = '';
  cardsCounter = 0;

  imageCardsService.query = event.target.elements.searchQuery.value;
  imageCardsService.resetPage();
  imageCardsService.fetchCards().then(imageCard => {
    clearGallery();
    if (imageCard.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
      return;
    }

    Notiflix.Notify.success(`Hooray! We found ${imageCard.totalHits} images.`);

    appendImageCards(imageCard);
    loadMoreBtn.style.display = 'block';
    checkCardsAmount(imageCard);
    lightbox.refresh();
  });
}

function uploadNewCards(event) {
  event.preventDefault();

  imageCardsService.increment();
  imageCardsService.fetchCards().then(imageCard => {
    checkCardsAmount(imageCard);
    appendImageCards(imageCard);
    lightbox.refresh();
  });
}

function appendImageCards(imageCard) {
  gallery.insertAdjacentHTML('beforeend', imageCardTpl(imageCard.hits));
}

function clearGallery() {
  gallery.innerHTML = '';
}

function checkCardsAmount(imageCard) {
  cardsCounter = cardsCounter + imageCard.hits.length;
  isAllCardsLoaded = cardsCounter < imageCard.totalHits;
  if (!isAllCardsLoaded) {
    loadMoreBtn.style.display = 'none';
  }

  if (!isAllCardsLoaded && cardsCounter > 40) {
    //cardsCounter > amount of pictures in api request ( per_page parameter )
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
  }
  return isAllCardsLoaded;
}
