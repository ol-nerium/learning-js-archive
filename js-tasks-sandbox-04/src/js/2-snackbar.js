import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onCreatePromise);
// form.addEventListener('input', onChange);

function onCreatePromise(evt) {
  evt.preventDefault();

  const delay = Number(evt.currentTarget.elements.delay.value);
  const state = evt.currentTarget.elements.state.value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      }
      if (state === 'rejected') {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  })
    .then(value =>
      iziToast.success({
        title: 'OK',
        message: value,
      })
    )
    .catch(error =>
      iziToast.error({
        title: 'Error',
        message: error,
      })
    );
}
