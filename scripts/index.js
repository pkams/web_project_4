//import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Section from "./Section.js"
import { initialCards } from "./constants.js";

const cardsList = new Section({
    items: initialCards,
    renderer: (element, index) => {
              const cardElement = new Card(element.name, element.link, '#card-template', index).generateCard();
              return cardElement
    }},
    '.elements'
);

cardsList.renderItems()