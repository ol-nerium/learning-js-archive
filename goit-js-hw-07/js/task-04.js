const counter = document.querySelector('#counter');

let counterValue = Number(counter.querySelector('#value').textContent);

const incrBtn = counter.querySelector('button[data-action="increment"]');
const dcrBtn = counter.querySelector('button[data-action="decrement"]');

incrBtn.addEventListener('click', onIncrementClick);
dcrBtn.addEventListener('click', onDecrementClick);

function onIncrementClick(event) {
  counterValue += 1;
  counter.querySelector('#value').textContent = counterValue;
}

function onDecrementClick(event) {
  counterValue -= 1;
  counter.querySelector('#value').textContent = counterValue;
}
