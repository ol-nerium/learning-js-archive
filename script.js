const categoriesData = [
  { title: "Animals", list: ["cat", "hamster", "horse", "parrot"] },
  { title: "Products", list: ["Bread", "Parsley", "Cheese"] },
  { title: "Technologies", list: ["HTML", "CSS", "React", "Node.js"] },
];

const images = [
  {
    url: "https://images.pexels.com/photos/140134/pexels-photo-140134.jpeg?dpr=2&h=750&w=1260",
    alt: "White and Black Long Fur Cat",
  },
  {
    url: "https://images.pexels.com/photos/213399/pexels-photo-213399.jpeg?dpr=2&h=750&w=1260",
    alt: "Orange and White Koi Fish Near Yellow Koi Fish",
  },
  {
    url: "https://images.pexels.com/photos/219943/pexels-photo-219943.jpeg?dpr=2&h=750&w=1260",
    alt: "Group of Horses Running",
  },
  {
    url: "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    alt: "Alpine Spring Meadows",
  },
  {
    url: "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    alt: "Nature Landscape",
  },
  {
    url: "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    alt: "Lighthouse Coast Sea",
  },
];

const sectionRoot = document.querySelector(".list");
if (sectionRoot) {
  function createElement(inputObject) {
    const { title, list } = inputObject;
    const item = document.createElement("li");
    item.classList.add("list-item");
    sectionRoot.append(item);
    const listItems = document.createElement("ul");
    listItems.classList.add("list-item-list");
    listItems.innerHTML = list
      .map((item) => `<li class="list-item-list-item">${item}</li>`)
      .join("");
    item.innerHTML = `<h3 class="list-item-title title">${title}</h3>`;
    item.append(listItems);
  }

  categoriesData.forEach((element) => createElement(element));
  const categories = document.querySelectorAll(".list-item");

  console.log("Number of categories:", categories.length);
  categories.forEach((item) => {
    console.log("Category:", item.querySelector("h3").textContent);
    console.log("Elements:", item.querySelectorAll("li").length);
  });
}

const galleryRoot = document.querySelector(".gallery");
if (galleryRoot) {
  const gallery = document.createElement("ul");
  gallery.classList.add("gallery-list");
  gallery.innerHTML = images
    .map(
      (image) => `<li class="gallery-list-item">
    <div class="img-wrap">
      <img
        src="${image.url}"
        alt="${image.alt}"
         loading="lazy" />
    </div>
   </li>`
    )
    .join("");
  galleryRoot.append(gallery);
}

if (document.querySelector(".textField")) {
  const input = document.getElementById("name-input");
  const output = document.getElementById("name-output");

  input.addEventListener(
    "input",
    (event) => (output.textContent = event.target.value)
  );
}

const formRoot = document.querySelector(".form-section");
if (formRoot) {
  const form = formRoot.querySelector("form");
  form.addEventListener("submit", handleClick);
  function handleClick(event) {
    event.preventDefault();
    const { email, password } = event.currentTarget.elements;
    if (!email.value.trim() || !password.value.trim()) {
      alert("All form fields must be filled in");
      return;
    } else
      console.log({
        email: email.value.trim(),
        password: password.value.trim(),
      });
    form.reset();
  }
}

const wiget = document.querySelector(".wiget-section");
if (wiget) {
  wiget.querySelector("button").addEventListener("click", onColorChange);
  function onColorChange() {
    const randomColor = getRandomHexColor();
    wiget.querySelector("span").textContent = randomColor;
    document.querySelector("body").style.backgroundColor = randomColor;
  }
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  }
}

const counter = document.getElementById("counter");
if (counter) {
  let counterValue = Number(document.getElementById("value").textContent);

  counter.addEventListener("click", (event) => {
    if (event.target.dataset.action === "increment") counterValue += 1;
    if (event.target.dataset.action === "decrement") counterValue -= 1;
    document.getElementById("value").textContent = counterValue;
  });
}

if (document.querySelector("input")) {
  document.querySelectorAll("input").forEach((item) => {
    item.addEventListener("focus", (event) => {
      event.currentTarget.style.outline = "none";
      event.currentTarget.border = "1px solid black";
    });

    item.addEventListener("blur", (event) => {
      console.log(event.currentTarget.value);
      if (
        event.currentTarget.id === "email" &&
        event.currentTarget.value.includes("@")
      ) {
        event.currentTarget.classList.add("valid");
        event.currentTarget.classList.remove("invalid");
        return;
      }

      event.currentTarget.classList.remove("valid");
      event.currentTarget.classList.add("invalid");
    });
  });
}
