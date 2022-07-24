import { backgroundList } from "../index";

export default class Popup{
    constructor(popupSelector){
        this.popup = document.querySelector(popupSelector);
    }

    open(){
        this.popup.classList.add('popup_opened');
    }

    close(){
        this.popup.classList.remove('popup_opened');
    }

    _handleEscClose(){
    document.addEventListener("keydown", function escHandler(evt) {
          if (evt.key === "Escape") {
            this.close(this.popup);
          }
        }.bind(this));
    }

    setEventListeners(){
    backgroundList.forEach((background) => {
        background.addEventListener("click", () => {this.close(background.parentElement);});
    });
    this._handleEscClose();
    const exitButton = this.popup.querySelector('.popup__close');
    exitButton.addEventListener('click', () => {this.close()})
    }
}