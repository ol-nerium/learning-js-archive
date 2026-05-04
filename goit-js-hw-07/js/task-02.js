const ingredients = [
  'Картошка',
  'Грибы',
  'Чеснок',
  'Помидоры',
  'Зелень',
  'Приправы',
];

const ulIngridients=[];

ingredients.forEach(element => {
  const item=document.createElement('li');
  item.textContent=element;
  ulIngridients.push(item);
});

document.querySelector('#ingredients').append(...ulIngridients);