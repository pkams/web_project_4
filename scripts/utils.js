import { initialCards, updateCardsList, enableValidation, resetValidation, validateSelectors } from "./index.js";

export const popupViewImage = document.querySelector('.popup_view-image');
const popup = document.querySelector('.popup');
const popupAddCard = document.querySelector('.popup_add-card');
const backgroundList = document.querySelectorAll(".popup__background");
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButton =  popup.querySelector('.popup__close');
const closeButtonAddCard =  popupAddCard.querySelector('.popup__close');
const closeButtonViewImage =  popupViewImage.querySelector('.popup__close_view-image');
const submitButton = document.querySelector('.popup__save-button');
const submitAddCard = document.querySelector('.popup__add-card-save-button');

function openEditionForm(event){
    event.preventDefault();
    popup.classList.toggle('popup_opened');
    enableValidation(validateSelectors);
    // Load information from profile to form
    const name = document.querySelector('#name');
    const job = document.querySelector('#job');
    const profileName = document.querySelector('.profile__name');
    const profileJob = document.querySelector('.profile__job');
    name.value = profileName.innerText;
    job.value = profileJob.innerText;
}

function updateProfileInformation(event){
    event.preventDefault();

    // Get forms and profile variables
    const name = document.querySelector('#name');
    const job = document.querySelector('#job');
    const profileName = document.querySelector('.profile__name');
    const profileJob = document.querySelector('.profile__job');

    // Switch actual profile information for the new information
    profileName.innerText = name.value;
    profileJob.innerText = job.value;
}

function addCardButton(event){
    event.preventDefault();
    enableValidation(validateSelectors);
    popupAddCard.classList.toggle('popup_opened');
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
    resetValidation(validateSelectors);
    updateCardsList();
}

function closePopupButton(popup){
    popup.classList.remove('popup_opened');
    resetValidation(validateSelectors);
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