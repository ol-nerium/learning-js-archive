const input = document.querySelector('#validation-input');
const inputLength = Number(input.getAttribute('data-length'));

input.addEventListener('input', OnborderColorInput);

function OnborderColorInput(event) {
  input.classList.remove('valid', 'invalid');
  const inputClass = input.value.length === inputLength ? 'valid' : 'invalid';
  input.classList.add(inputClass);

  // if (input.value.length===inputLength){
  //     input.classList.add('valid');
  // } else input.classList.add('invalid');
}
