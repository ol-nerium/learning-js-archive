import { galleryItems } from "./js/data.js";

// window.addEventListener("load", () => {});

const gallery = document.querySelector(".js-gallery");
const lightbox = document.querySelector(".js-lightbox");
const lightboxImage = lightbox.querySelector(".lightbox__image");
const lightboxOverlay = lightbox.querySelector(".lightbox__overlay");
const modalClsBtn = lightbox.querySelector(
  'button[data-action="close-lightbox"]'
);

gallery.addEventListener("click", getOriginalImgData);
modalClsBtn.addEventListener("click", modalClose);

lightboxOverlay.addEventListener("click", modalClose);

const galleryMarkup = createGalleryMarkup(galleryItems);
gallery.insertAdjacentHTML("beforeend", galleryMarkup);

const itemsArray = gallery.querySelectorAll(".gallery__image");

// function reloadImageWithRetry(src, retry = 3) {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.src = src;

//     img.onload = () => resolve(src);
//     img.onerror = () => {
//       // return reject(preview);
//       console.log(retry, retry > 0);
//       if (retry > 0) {
//         setTimeout(
//           () =>
//             reloadImageWithRetry(src, retry - 1)
//               .then(resolve)
//               .catch(reject),
//           500
//         );
//       } else reject(src);
//     };
//   });
// }
// backend bug + it's kind of simulation of fetch in app so skip

function createGalleryMarkup(arrayItems) {
  return arrayItems
    .map(
      ({ preview, original, description }) => `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src='${preview}'
      data-source="${original}"
      alt='${description}'
    />
  </a>
</li>`
    )
    .join("");
}

function modalOpen() {
  lightbox.classList.add("is-open");

  window.addEventListener("keydown", modalClose);
  window.addEventListener("keydown", modalKeyInterface);
}

function modalClose(event) {
  if (event.code !== "Escape" && event.target !== event.currentTarget) {
    return;
  }

  lightbox.classList.remove("is-open");
  window.removeEventListener("keydown", modalClose);
  window.removeEventListener("keydown", modalKeyInterface);

  lightboxImage.setAttribute("src", "");
  lightboxImage.setAttribute("alt", "");
}

function changeLightboxImage(src, alt) {
  lightboxImage.setAttribute("src", src);
  lightboxImage.setAttribute("alt", alt);
}

function getOriginalImgData(event) {
  event.preventDefault();

  if (event.target === event.currentTarget) {
    return;
  }

  const src = event.target.dataset.source;
  const alt = event.target.getAttribute("alt");

  modalOpen(event);
  changeLightboxImage(src, alt);
}

function modalKeyInterface(event) {
  const imgArray = [...itemsArray].map((i) => i.dataset.source);

  const currentSrc = lightboxImage.getAttribute("src");
  let index = imgArray.indexOf(currentSrc);

  if (event.code === "ArrowRight") {
    if (index >= itemsArray.length - 1) {
      index = -1;
    }
    index += 1;
  }

  if (event.code === "ArrowLeft") {
    if (index <= 0) {
      index = itemsArray.length;
    }
    index -= 1;
  }

  const src = itemsArray[index].dataset.source;
  const alt = itemsArray[index].getAttribute("alt");
  changeLightboxImage(src, alt);
}
