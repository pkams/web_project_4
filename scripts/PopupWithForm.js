import {Popup} from "./Popup";

class PopupWithForm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.popup = document.querySelector(popupSelector);
    }

    _getInputValues(){
        const name = this.popup.querySelector('#name');
        const job = this.popup.querySelector('#job');
        const profileName = this.popup.querySelector('.profile__name');
        const profileJob = this.popup.querySelector('.profile__job');
        name.value = profileName.innerText;
        job.value = profileJob.innerText;
    }

    setEventListeners(){

    }

    close(){

    }
}