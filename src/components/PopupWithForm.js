import Popup from "./Popup.js";
import FormValidator from "./FormValidator.js";
import { backgroundList, validateSelectors } from "../index";

export default class PopupWithForm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.popup = document.querySelector(popupSelector);
    }

    _getInputValues(){
        const formElement = this.popup.querySelectorAll('.popup__form-input')
        return formElement
    }

    setEventListeners(){
        backgroundList.forEach((background) => {
        background.addEventListener("click", () => {this.close(background.parentElement);});
        });
        this._handleEscClose();
        const exitButton = this.popup.querySelector('.popup__close');
        exitButton.addEventListener('click', () => {this.close()})

        this.popup.addEventListener("submit", (evt) => {
          evt.preventDefault();
        });
        const formValidation = new FormValidator(validateSelectors, this.popup);
        formValidation.enableValidation();
    }

    close(){
        const formElements = this._getInputValues()
        formElements[0].value = '';
        formElements[1].value = '';
        this.popup.classList.remove('popup_opened');
    }
}