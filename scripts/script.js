import {enableValidation} from "./validate.js";
import {resetValidation} from "./validate.js";

// Configuration object
const form_obj = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "popup__form-input_error_active"
}

const edit_button = document.querySelector('.profile__edit-button');
const add_button = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popup_add_card = document.querySelector('.popup_add-card');
const popup_view_image = document.querySelector('.popup_view-image');
const close_button =  popup.querySelector('.popup__close');
const close_button_add_card =  popup_add_card.querySelector('.popup__close');
const close_button_view_image =  popup_view_image.querySelector('.popup__close_view-image');
const submit_button = document.querySelector('.popup__save-button');
const submit_button_add_card = document.querySelector('.popup__add-card-save-button');
let elementContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector("#card-template").content;
const background_list = document.querySelectorAll(".popup__background")

let initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Montanhas Carecas",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

function openEditionForm(event){
    event.preventDefault();
    popup.classList.toggle('popup_opened');
    enableValidation(form_obj);
    // Load information from profile to form
    let name = document.querySelector('#name');
    let job = document.querySelector('#job');
    const profile_name = document.querySelector('.profile__name');
    const profile_job = document.querySelector('.profile__job');
    name.value = profile_name.innerText;
    job.value = profile_job.innerText;
}

function addCardButton(event){
    event.preventDefault();
    enableValidation(form_obj)
    popup_add_card.classList.toggle('popup_opened');
}

function closePopupButton(popup){
    popup.classList.remove('popup_opened');
    resetValidation(form_obj)
}

function updateProfileInformation(event){
    event.preventDefault();

    // Get forms and profile variables
    const name = document.querySelector('#name');
    const job = document.querySelector('#job');
    let profile_name = document.querySelector('.profile__name');
    let profile_job = document.querySelector('.profile__job');

    // Switch actual profile information for the new information
    profile_name.innerText = name.value;
    profile_job.innerText = job.value;
}

function submitButtonAddCard(event){
    event.preventDefault();

    // Get forms and profile variables
    const title = document.querySelector('#title');
    const image_url = document.querySelector('#image-url');

    // Switch actual profile information for the new information
    initialCards.unshift({
    name: title.value,
    link: image_url.value
    });
    title.value = ''
    image_url.value = ''
    resetElementsState();
}

function likeCardButton(event){
    event.preventDefault();
    this.classList.toggle('card__like-button_clicked');
}

function deleteCardButton(index){
    // Delete the i element of the array
    initialCards.splice(index, 1);
    resetElementsState();
}

function openImage(index){
    popup_view_image.classList.toggle('popup_opened');

    let popup_image = document.querySelector('.popup__image');
    let popup_image_name = document.querySelector('.popup__image-name');
    popup_image.src = initialCards[index].link;
    popup_image_name.textContent = initialCards[index].name;
}

function updateCardsList(){
    initialCards.slice(0, 6).forEach(function(element){
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__text-title").textContent = element.name;
    cardElement.querySelector(".card__image").src = element.link;
    elementContainer.append(cardElement);
});
}

function resetTrashButton(){
    const trashs_button = document.querySelectorAll('.card__trash-button');
    trashs_button.forEach((item, i) => {
    item.addEventListener('click', function(){deleteCardButton(i);});
    });
}

function resetImage(){
    // View image
    const card_buttons = document.querySelectorAll('.card__image');
    card_buttons.forEach((item, i) => {
        item.addEventListener('click', function(){openImage(i);});
    });
}

function resetLikeButton() {
    const like_buttons = document.querySelectorAll('.card__like-button');
    like_buttons.forEach(item => {
        item.addEventListener('click', likeCardButton);
    });
}

function resetElementsState(){
    // Reset elementContainer
    elementContainer.innerHTML = '';
    // Update the elements in the elementContainer
    updateCardsList();
    // Rerun the for to assign the function to the trash elements again
    resetLikeButton();
    resetTrashButton();
    resetImage();
}

// Event listeners
edit_button.addEventListener('click', openEditionForm);
add_button.addEventListener('click', addCardButton);
close_button.addEventListener('click', function(){closePopupButton(popup);});
close_button_add_card.addEventListener('click', function(){closePopupButton(popup_add_card);});
close_button_view_image.addEventListener('click', function(){closePopupButton(popup_view_image );});
submit_button.addEventListener('click', updateProfileInformation);
submit_button_add_card.addEventListener('click', submitButtonAddCard);

// Close popups when clicking in the background
background_list.forEach((background) => {
    background.addEventListener("click", function(){closePopupButton(background.parentElement);})
    document.addEventListener("keydown", function escHandler(evt) {
      if (evt.key === "Escape") {
        closePopupButton(background.parentElement);
      }
})
})


// Add Cards and start interactive elements when starting
resetElementsState();