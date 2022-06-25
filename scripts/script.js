import {enableValidation} from "./validate.js";
import {resetValidation} from "./validate.js";

// Configuration object
const formObj = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "popup__form-input_error_active"
};

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupAddCard = document.querySelector('.popup_add-card');
const popupViewImage = document.querySelector('.popup_view-image');
const closeButton =  popup.querySelector('.popup__close');
const closeButtonAddCard =  popupAddCard.querySelector('.popup__close');
const closeButtonViewImage =  popupViewImage.querySelector('.popup__close_view-image');
const submitButton = document.querySelector('.popup__save-button');
const submitAddCard = document.querySelector('.popup__add-card-save-button');
let elementContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector("#card-template").content;
const backgroundList = document.querySelectorAll(".popup__background");

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
    enableValidation(formObj);
    // Load information from profile to form
    let name = document.querySelector('#name');
    let job = document.querySelector('#job');
    const profileName = document.querySelector('.profile__name');
    const profileJob = document.querySelector('.profile__job');
    name.value = profileName.innerText;
    job.value = profileJob.innerText;
}

function addCardButton(event){
    event.preventDefault();
    enableValidation(formObj);
    popupAddCard.classList.toggle('popup_opened');
}

function closePopupButton(popup){
    popup.classList.remove('popup_opened');
    resetValidation(formObj);
}

function updateProfileInformation(event){
    event.preventDefault();

    // Get forms and profile variables
    const name = document.querySelector('#name');
    const job = document.querySelector('#job');
    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__job');

    // Switch actual profile information for the new information
    profileName.innerText = name.value;
    profileJob.innerText = job.value;
}

function submitButtonAddCard(event){
    event.preventDefault();

    // Get forms and profile variables
    const title = document.querySelector('#title');
    const imageUrl = document.querySelector('#image-url');

    // Switch actual profile information for the new information
    initialCards.unshift({
    name: title.value,
    link: imageUrl.value
    });
    title.value = '';
    imageUrl.value = '';
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
    popupViewImage.classList.toggle('popup_opened');

    let popupImage = document.querySelector('.popup__image');
    let popupImageName = document.querySelector('.popup__image-name');
    popupImage.src = initialCards[index].link;
    popupImageName.textContent = initialCards[index].name;
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
    const trashsButton = document.querySelectorAll('.card__trash-button');
    trashsButton.forEach((item, i) => {
    item.addEventListener('click', function(){deleteCardButton(i);});
    });
}

function resetImage(){
    // View image
    const cardButtons = document.querySelectorAll('.card__image');
    cardButtons.forEach((item, i) => {
        item.addEventListener('click', function(){openImage(i);});
    });
}

function resetLikeButton() {
    const likeButtons = document.querySelectorAll('.card__like-button');
    likeButtons.forEach(item => {
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
editButton.addEventListener('click', openEditionForm);
addButton.addEventListener('click', addCardButton);
closeButton.addEventListener('click', function(){closePopupButton(popup);});
closeButtonAddCard.addEventListener('click', function(){closePopupButton(popupAddCard);});
closeButtonViewImage.addEventListener('click', function(){closePopupButton(popupViewImage );});
submitButton.addEventListener('click', updateProfileInformation);
submitAddCard.addEventListener('click', submitButtonAddCard);

// Close popups when clicking in the background
backgroundList.forEach((background) => {
    background.addEventListener("click", function(){closePopupButton(background.parentElement);});
    document.addEventListener("keydown", function escHandler(evt) {
      if (evt.key === "Escape") {
        closePopupButton(background.parentElement);
      }
});
});


// Add Cards and start interactive elements when starting
resetElementsState();