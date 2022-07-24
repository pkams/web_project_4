import { initialCards } from "../index";
import PopupWithImage from "./PopupWithImage.js";
import { cardsList } from "../index";

export default class Card{
    constructor(name, link, cardSelector, index) {
        this.name = name;
        this.link = link;
        this._cardSelector = cardSelector;
        this.index = index;
        this.popupElement = new PopupWithImage('.popup_view-image')
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
        cardsList.renderItems()
    }

    _openImage(){
        this.popupElement.open(this.name, this.link)
    }

    _setEventListener(){
        this.popupElement.setEventListeners()
        const trashButton = this.cardElement.querySelector('.card__trash-button');
        const likeButton = this.cardElement.querySelector('.card__like-button');
        const cardButton = this.cardElement.querySelector('.card__image');
        const exitButton = this.popupElement.popup.querySelector('.popup__close_view-image')
        trashButton.addEventListener('click', this._deleteCardButton.bind(this));
        likeButton.addEventListener('click', this._likeCardButton);
        cardButton.addEventListener('click', this._openImage.bind(this));
        exitButton.addEventListener('click', () => {this.popupElement.close()})
    }

    generateCard(){
        this.cardElement = this._getTemplate();
        this.cardElement = this._buildCardElement();
        this._setEventListener();
        return this.cardElement;
    }
}