/* function enableValidation(){

}

// Habilitando a validação chamando enableValidation()
// Valide todas as configurações

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}); */


const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__form-input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__form-input_error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__form-input_type_error");
  errorElement.classList.remove("popup__form-input_error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  console.log(inputElement)
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__save-button_inactive");
  } else {
    buttonElement.classList.remove("popup__save-button_inactive");
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__form-input"));
  const buttonElement = formElement.querySelector(".popup__save-button");
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export function enableValidation(){
  let formList = Array.from(document.querySelectorAll(".popup__form"));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
      setEventListeners(formElement);
  });
}

export function resetValidation(){
  let formList = Array.from(document.querySelectorAll(".popup__form"));

  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__form-input"));
    const buttonElement = formElement.querySelector(".popup__save-button");
    inputList.forEach((inputElement) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove("popup__form-input_type_error");
      errorElement.classList.remove("popup__form-input_error_active");
      errorElement.textContent = "";
      buttonElement.classList.add("popup__save-button_inactive");
      //checkInputValidity(formElement, inputElement);
    });
  });

}

enableValidation()