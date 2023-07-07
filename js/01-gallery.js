import { galleryItems } from "./gallery-items.js";
// Change code below this line

const listGallery = document.querySelector(".gallery");

listGallery.insertAdjacentHTML("afterbegin", galleryItemsMarkup(galleryItems));

function galleryItemsMarkup(items) {
  const contentMarkup = items.map(({ preview, original, description }) => {
    return `
        <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`;
  });
  return contentMarkup.join("");
}

// 1. Create modal basicLightbox

listGallery.addEventListener("click", openDelegationImages);

// function openDelegationImages(event) {
//   event.preventDefault();
//   if (event.target.nodeName !== "IMG") return;

//   const instance = basicLightbox.create(
//     `
//     <img  
//     src="${event.target.dataset.source}"
//     width="1280" 
//     height="auto"
//   />
// `,
//     {
//       onShow: (instance) => {
//         instance.element().querySelector("img").onclick = instance.close;
//       },
//     }
//   );

//   instance.show();
// }

// 2. Create modal basicLightbox with close Escape

function openDelegationImages(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") return;

  const instance = basicLightbox.create(
    `
		<img src="${event.target.dataset.source}" width="1280" height="auto"/>
        `,
    {
      onShow: (instance) => {
        window.addEventListener('keydown', onEscKeyPress);
      },
      onClose: (instance) => {
        window.removeEventListener('keydown', onEscKeyPress);
      },
    }
  );
  instance.show();

  function onEscKeyPress(event) {
  if (event.code !== 'Escape') return;
  instance.close();
}
}

console.log(galleryItems);
