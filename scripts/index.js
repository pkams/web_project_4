import {FormValidator} from "./FormValidator.js";
import {Card} from "./Card.js";
import "./utils.js";

export const validateSelectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "popup__form-input_error_active"
};
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
const elementContainer = document.querySelector('.elements');

export function updateCardsList(){
    elementContainer.innerHTML = "";
    initialCards.slice(0, 6).forEach(function(element, index){
    const cardElement = new Card(element.name, element.link, '#card-template', index).generateCard();
    elementContainer.append(cardElement);
});
}

export function resetValidation(form_obj) {
  const formList = Array.from(document.querySelectorAll(form_obj.formSelector));

  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(form_obj.inputSelector));
    const buttonElement = formElement.querySelector(form_obj.submitButtonSelector);
    inputList.forEach((inputElement) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(form_obj.inputErrorClass);
      errorElement.classList.remove(form_obj.errorClass);
      errorElement.textContent = "";
      buttonElement.classList.add(form_obj.inactiveButtonClass);
      inputElement.value = "";
    });
  });
}

export function enableValidation(form_obj){
  const formList = Array.from(document.querySelectorAll(form_obj.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const formValidation = new FormValidator(validateSelectors, formElement);
    formValidation.enableValidation();
  });
}

enableValidation(validateSelectors);
updateCardsList();