const refs = {
  controls: document.querySelector('#controls'),
  renderBtn: controls.querySelector('[data-action="render"]'),
  destroyBtn: controls.querySelector('[data-action="destroy"]'),

  input: controls.querySelector('input'),

  boxes: document.querySelector('#boxes'),
};

refs.renderBtn.addEventListener('click', event => {
  createBoxes(refs.input.value);
});
refs.destroyBtn.addEventListener('click', destroyBoxes);

function createBoxes(amount) {
  const divBoxes = [];

  function getRandomRgb() {
    const result = [];
    for (let i = 0; i < 3; i += 1) {
      result.push(Math.floor(Math.random() * (255 - 0)));
    }
    return result;
  }

  for (let i = 0; i < Number(amount); i += 1) {
    const newDiv = document.createElement('div');
    const randomRGB = `rgb(${getRandomRgb().join(',')})`;

    newDiv.style.backgroundColor = randomRGB;
    newDiv.style.height = 30 + i * 10 + 'px';
    newDiv.style.width = 30 + i * 10 + 'px';

    divBoxes.push(newDiv);
  }

  refs.boxes.append(...divBoxes);
}

function destroyBoxes(event) {
  const allNewBoxes = refs.boxes.querySelectorAll('div');
  allNewBoxes.forEach(elem => refs.boxes.removeChild(elem));

  // refs.boxes.innerHTML = '';
}
