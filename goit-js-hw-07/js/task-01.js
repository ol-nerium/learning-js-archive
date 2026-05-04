const categories=document.querySelector('#categories');

console.log(`В списке ${categories.children.length} категории.`);


[...categories.children].forEach(element => {
    console.log(` Категория: ${element.firstElementChild.textContent}`);
    console.log(`Количество элементов: ${element.querySelectorAll('li').length}`)
});

