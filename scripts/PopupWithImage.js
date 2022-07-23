import Popup from "./Popup.js";

export default class popupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this.popup = document.querySelector(popupSelector);
    }

    open(name, link){
        const popupImage = this.popup.querySelector('.popup__image');
        const popupImageName = this.popup.querySelector('.popup__image-name');
        popupImage.src = link;
        popupImageName.textContent = name;
        this.popup.classList.add('popup_opened');
    }
}