import { initialCards, updateCardsList } from "./index.js";
import { popupViewImage } from "./utils.js";

export default class Card{
    constructor(name, link, cardSelector, index) {
        this.name = name;
        this.link = link;
        this._cardSelector = cardSelector;
        this.index = index;
    }

    _getTemplate() {
        return document
        .querySelector(this._cardSelector)
        .content
        .querySelector(".card")
        .cloneNode(true);
    }

    _buildCardElement() {
        this.cardElement.querySelector(".card__text-title").textContent = this.name;
        this.cardElement.querySelector(".card__image").src = this.link;
        return this.cardElement;
    }

    _likeCardButton(){
        this.classList.toggle('card__like-button_clicked');
    }

    _deleteCardButton(){
        // Delete the i element of the array
        initialCards.splice(this.index, 1);
        updateCardsList();
    }

    _openImage(){
        popupViewImage.classList.toggle('popup_opened');
        const popupImage = document.querySelector('.popup__image');
        const popupImageName = document.querySelector('.popup__image-name');
        popupImage.src = this.link;
        popupImageName.textContent = this.name;
    }

    _setEventListener(){
        const trashButton = this.cardElement.querySelector('.card__trash-button');
        const likeButton = this.cardElement.querySelector('.card__like-button');
        const cardButton = this.cardElement.querySelector('.card__image');

        trashButton.addEventListener('click', this._deleteCardButton.bind(this));
        likeButton.addEventListener('click', this._likeCardButton);
        cardButton.addEventListener('click', this._openImage.bind(this));
    }

    generateCard(){
        this.cardElement = this._getTemplate();
        this.cardElement = this._buildCardElement();
        this._setEventListener();
        return this.cardElement;
    }
}