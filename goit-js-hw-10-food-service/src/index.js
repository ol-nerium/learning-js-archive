import '../node_modules/normalize.css/normalize.css';

import upcominEvents from './menu.json';
import eventsTemplate from './templates/events.hbs';
import './sass/main.scss';

const menuBoard = document.querySelector('.js-menu');
const themeToggle = document.querySelector('#theme-switch-toggle');
const body = document.querySelector('body');
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
let currentTheme = localStorage.getItem('theme');

themeToggle.addEventListener('change', onThemeChange);
menuBoard.innerHTML = eventsTemplate({ items: upcominEvents });

if (!currentTheme) {
  currentTheme = Theme.LIGHT;
}

body.classList.add(currentTheme);

themeToggle.checked = body.classList.contains(Theme.DARK);

function onThemeChange() {
  if (themeToggle.checked) {
    body.classList.replace(Theme.LIGHT, Theme.DARK);
  } else body.classList.replace(Theme.DARK, Theme.LIGHT);

  localStorage.setItem('theme', body.classList);
}
