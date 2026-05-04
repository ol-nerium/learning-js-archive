const input = document.querySelector('#name-input');
let output = document.querySelector('#name-output');

input.addEventListener('input', onInputChange);

function onInputChange(event) {
  output.textContent = input.value;
  if (input.value === '') output.textContent = 'незнакомец';
}
