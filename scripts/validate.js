const showInputError = (form_obj, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(form_obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(form_obj.errorClass);
};

const hideInputError = (form_obj, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(form_obj.inputErrorClass);
  errorElement.classList.remove(form_obj.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (form_obj, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(form_obj, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(form_obj, formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (form_obj, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(form_obj.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(form_obj.inactiveButtonClass);
  }
};

const setEventListeners = (form_obj, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(form_obj.inputSelector));
  const buttonElement = formElement.querySelector(form_obj.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(form_obj, formElement, inputElement);
      toggleButtonState(form_obj, inputList, buttonElement);
    });
  });
};

export function enableValidation(form_obj){
  let formList = Array.from(document.querySelectorAll(form_obj.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
      setEventListeners(form_obj, formElement);
  });
}

export function resetValidation(form_obj) {
  let formList = Array.from(document.querySelectorAll(form_obj.formSelector));

  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(form_obj.inputSelector));
    const buttonElement = formElement.querySelector(form_obj.submitButtonSelector);
    inputList.forEach((inputElement) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(form_obj.inputErrorClass);
      errorElement.classList.remove(form_obj.errorClass);
      errorElement.textContent = "";
      buttonElement.classList.add(form_obj.inactiveButtonClass);
      //checkInputValidity(formElement, inputElement);
    });
  });

}

