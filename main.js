let d = document;
let minusBtn = d.querySelector(".input__minus");
let plusBtn = d.querySelector(".input__plus");
let userInput = d.querySelector(".input__number");

let userInputNumber = 0;

plusBtn.addEventListener("click", () => {
  userInputNumber++;

  userInput.value = userInputNumber;

  // console.log('Presionaste el btn +');
  // console.log(userInputNumber);
});

minusBtn.addEventListener("click", () => {
  userInputNumber--;

  if (userInputNumber <= 0) {
    userInputNumber = 0;
  }

  userInput.value = userInputNumber;

  // console.log('Presionaste el btn -');
  // console.log(userInputNumber);
});

//Agregar el total de product al cart cuando se presiona el btn ADD TO CART.

const addToCartBtn = d.querySelector(".details__button");
let cartNotification = d.querySelector(".header__cart--notification");
let lastValue = parseInt(cartNotification.innerText);

addToCartBtn.addEventListener("click", () => {
  lastValue = lastValue + userInputNumber;

  // console.log(lastValue);

  cartNotification.innerText = lastValue;
  cartNotification.style.display = "block";

  // console.log(cartNotification);

  drawProductInModal();
});

//Mostrar el modal con el detalle del cart.

const cartIconBtn = d.querySelector(".header__cart");
const cartModal = d.querySelector(".cart-modal");
// let priceModal = d.querySelector(".cart-modal__price");
const productContainer = d.querySelector(".cart-modal__checkout-container");

cartIconBtn.addEventListener("click", () => {
  // cartModal.style.display = 'block';

  //toggle: Lo que hace es que si ya esta la clase la quita pero si la clase no esta la agrega.

  cartModal.classList.toggle("show");

  if(lastValue ===0) {
    productContainer.innerHTML = '<p class="cart-empy">Your cart is empy</p>';
  } else {
    drawProductInModal();
  }
});

//Cambiar imagenes cuando se presione los btns flecha.

const imageContainer = d.querySelector('.gallery__image-container');
const previousGalleryBtn = d.querySelector('.gallery__previous');
const nextGalleryBtn = d.querySelector('.gallery__next');
let imgIndex = 1;

nextGalleryBtn.addEventListener('click', () => {
    changeNextImage(imageContainer);
});

previousGalleryBtn.addEventListener('click', () => {
    changePreviousImage(imageContainer);
});


//Mostrar el modal de imgs cuando hago click en la img principal.

const imagesModal = d.querySelector('.modal-gallery__background'); 
const closeModalBtn = d.querySelector('.modal-gallery__close');

imageContainer.addEventListener('click', ()=>{
    if(window.innerWidth >= 1115){
        imagesModal.style.display = 'grid';
    }
    
});

closeModalBtn.addEventListener('click', ()=>{
    imagesModal.style.display = 'none';
});



//Cambiar las imgs principales desde las thumnails.

let thumbnails = d.querySelectorAll('.gallery__thumnail');
// console.log(thumbnails);

thumbnails = [...thumbnails];
// console.log(thumbnails);

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', (event) => {
        // console.log(event);
        // console.log(event.target.id);

        imageContainer.style.backgroundImage = `url('../images/image-product-${event.target.id}.jpg')`;
    });
});

//Cambiar las imgs principales desde las thumnails en el modal.
let modalThumbnails = d.querySelectorAll('.modal-gallery__thumnail');
// console.log(modalThumbnails);

const modalImageContainer = d.querySelector('.modal-gallery__image-container');

modalThumbnails = [...modalThumbnails];
// console.log(modalThumbnails);

modalThumbnails.forEach(modalThumbnail => {
    modalThumbnail.addEventListener('click', (event) => {
        // console.log(event);
        // console.log(event.target.id.slice(-1)); //Esto se hace parqa recortar la 'm' del id.

        modalImageContainer.style.backgroundImage = `url('../images/image-product-${event.target.id.slice(-1)}.jpg')`;
    });
});

//Cambiar img principal de modal desde flechas en el modal.

const previousModalBtn = d.querySelector('.modal-gallery__previous');
const nextModalBtn = d.querySelector('.modal-gallery__next');

nextModalBtn.addEventListener('click', () => {
    changeNextImage(modalImageContainer);
});

previousModalBtn.addEventListener('click', () => {
    changePreviousImage(modalImageContainer);
});


//Mostrar el navbar cuando preciono el menú hamburguesa.

const hamburgerMenu = document.querySelector('.header__menu');
const modalNavbar = document.querySelector('.modal-navbar__background');
const closeModalNavbar = document.querySelector('.modal-navbar__close-icon');

modalNavbar.style.display = 'none'

hamburgerMenu.addEventListener('click', ()=>{
    console.log('abrir modal');
    modalNavbar.style.display = 'block';
});

closeModalNavbar.addEventListener('click', ()=>{
    modalNavbar.style.display = 'none';
});


//Funciones.

function deleteProduct() {
    const deleteProductBtn = d.querySelector(".cart-modal__delete");

deleteProductBtn.addEventListener("click", () => {
  productContainer.innerHTML = '<p class="cart-empy">Your cart is empy</p>';

  lastValue = 0;

  cartNotification.innerText = lastValue;
});
};


function drawProductInModal(){
    productContainer.innerHTML = `
    <div class="cart-modal__details-container">
            <img
              src="./images/image-product-1-thumbnail.jpg"
              alt="Thumbnail 1"
              class="cart-modal__image"
            />
            <div>
              <p class="cart-modal__product">Autumn Limeted Edition...</p>
              <p class="cart-modal__price">$125.00 x3 <span>$375.00</span></p>
            </div>
            <img
              class="cart-modal__delete"
              src="./images/icon-delete.svg"
              alt="Delete icon"
              title="Delete Icon"
            />
          </div>
          <button class="cart-modal__checkout">Checkout</button>
    `;

    deleteProduct();

    let priceModal = d.querySelector(".cart-modal__price");

    priceModal.innerHTML = `$125.00 x${lastValue} <span>$${
        lastValue * 125
      }.00</span>`;
}

function changeNextImage(imgContainer) {
    if (imgIndex === 4) {
        imgIndex = 1;
    } else {
        imgIndex++;
    }

    imgContainer.style.backgroundImage = `url('../images/image-product-${imgIndex}.jpg')`;
}

function changePreviousImage(imgContainer) {
    if (imgIndex === 1) {
        imgIndex = 4;
    } else {
        imgIndex--;
    }

    imgContainer.style.backgroundImage = `url('../images/image-product-${imgIndex}.jpg')`;
}