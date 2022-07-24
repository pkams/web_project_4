import "./page/index.css"; //importing css trough webpack

import Card from "./components/Card.js";
import Section from "./components/Section.js"
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

export const initialCards = [
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
export const validateSelectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "popup__form-input_error_active"
};
export const backgroundList = document.querySelectorAll(".popup__background");
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const submitButton = document.querySelector('.popup__save-button');
const submitAddCard = document.querySelector('.popup__add-card-save-button');

const userInfo = new UserInfo({nameSelector:'.profile__name', jobSelector:".profile__job"})

export const cardsList = new Section({
    items: initialCards,
    renderer: (element, index) => {
              const cardElement = new Card(element.name, element.link, '#card-template', index).generateCard();
              return cardElement
    }},
    '.elements'
);

const popupEditProfile = new PopupWithForm('.popup')
const popupAddCard = new PopupWithForm('.popup_add-card');
popupEditProfile.setEventListeners()
popupAddCard.setEventListeners()

function openEditionForm(event){
    event.preventDefault();
    popupEditProfile.open();
    const userObj = userInfo.getUserInfo()
    const name = document.querySelector('#name')
    const job = document.querySelector('#job')
    name.value = userObj['name'].innerText;
    job.value = userObj['job'].innerText;
}

function openAddCardForm(event){
    event.preventDefault();
    //enableValidation(validateSelectors);
    popupAddCard.open();
}

function submitButtonAddCard(event){
    event.preventDefault();

    // Get forms and profile variables
    const formValues = popupAddCard._getInputValues()

    // Switch actual profile information for the new information
    initialCards.unshift({
    name: formValues[0].value,
    link: formValues[1].value
    });
    formValues[0].value = '';
    formValues[1].value = '';

    cardsList.renderItems()
    popupAddCard.setEventListeners()
}

function updateProfileInformation(event){
    event.preventDefault();

    // Get forms and profile variables
    const userObj = userInfo.getUserInfo()

    // Switch actual profile information for the new information
    const formValues = popupEditProfile._getInputValues()
    userObj['name'].innerText = formValues[0].value;
    userObj['job'].innerText = formValues[1].value;
}

editButton.addEventListener('click', openEditionForm);
addButton.addEventListener('click', openAddCardForm);
submitButton.addEventListener('click', updateProfileInformation);
submitAddCard.addEventListener('click', submitButtonAddCard);

cardsList.renderItems()

