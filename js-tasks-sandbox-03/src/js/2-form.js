// скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.

const form = document.querySelector('.feedback-form');
const key = 'message';

for (let item of form.elements) {
  if (item.name !== '')
    form.elements[item.name].value = localStorage.getItem(item.name) ?? '';
}

form.addEventListener('input', event => {
  localStorage.setItem(event.target.name, event.target.value);
});

form.addEventListener('submit', event => {
  event.preventDefault();
  for (let item of event.target.elements) {
    if (item.name !== '') localStorage.setItem(item.name, '');
  }
  form.reset();
});
