export class FormValidator{
    constructor(formValidatorConfigObj, formElement) {
        this.formValidatorConfigObj = formValidatorConfigObj;
        this.formElement = formElement;
    }

    _showInputError(form_obj, formElement, inputElement, errorMessage){
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(form_obj.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(form_obj.errorClass);
    };

    _hideInputError(form_obj, formElement, inputElement){
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(form_obj.inputErrorClass);
      errorElement.classList.remove(form_obj.errorClass);
      errorElement.textContent = "";
    };

    _checkInputValidity(form_obj, formElement, inputElement){
      if (!inputElement.validity.valid) {
        this._showInputError(form_obj, formElement, inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(form_obj, formElement, inputElement);
      }
    };

    _hasInvalidInput(inputList){
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    };

    _toggleSubmitButtonState(form_obj, inputList, buttonElement){
      if (this._hasInvalidInput(inputList)) {
        buttonElement.classList.add(form_obj.inactiveButtonClass);
      } else {
        buttonElement.classList.remove(form_obj.inactiveButtonClass);
      }
    };

    _setEventListeners(form_obj, formElement){
      const inputList = Array.from(formElement.querySelectorAll(form_obj.inputSelector));
      const buttonElement = formElement.querySelector(form_obj.submitButtonSelector);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(form_obj, formElement, inputElement);
          this._toggleSubmitButtonState(form_obj, inputList, buttonElement);
        });
      });
    };

    enableValidation(){
        this.formElement.addEventListener("submit", (evt) => {
          evt.preventDefault();
        });
        this._setEventListeners(this.formValidatorConfigObj, this.formElement);
    }
}