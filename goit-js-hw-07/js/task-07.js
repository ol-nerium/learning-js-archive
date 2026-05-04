const fontSizeControl=document.querySelector('#font-size-control');
const text=document.querySelector('#text');
text.style.fontSize='50px';

fontSizeControl.addEventListener('input', onFontSizeInput);

function onFontSizeInput(evt){
  text.style.fontSize=fontSizeControl.value+'px';
};

