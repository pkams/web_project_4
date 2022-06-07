// Popup actions
let edit_button = document.querySelector('.profile__edit-button')
let add_button = document.querySelector('.profile__add-button')
let popup = document.querySelector('.popup')
let popup_add_card = document.querySelector('.popup_add-card')
let close_button =  popup.querySelector('.popup__close')
let close_button_add_card =  popup_add_card.querySelector('.popup__close')
let submit_button = document.querySelector('.popup__save-button')

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Montanhas Carecas",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

function editButton(event){
    event.preventDefault();
    popup.classList.remove('popup_opened')

    // Load information from profile to form
    let name = document.querySelector('#name')
    let job = document.querySelector('#job')
    let profile_name = document.querySelector('.profile__name')
    let profile_job = document.querySelector('.profile__job')
    name.value = profile_name.innerText
    job.value = profile_job.innerText
}

function addButton(event){
    event.preventDefault();
    popup_add_card.classList.remove('popup_opened')
}

function closeButton(popup){
    popup.classList.add('popup_opened')
}

function submitButton(event){
    event.preventDefault()

    // Get forms and profile variables
    let name = document.querySelector('#name')
    let job = document.querySelector('#job')
    let profile_name = document.querySelector('.profile__name')
    let profile_job = document.querySelector('.profile__job')

    // Switch actual profile information for the new information
    profile_name.innerText = name.value
    profile_job.innerText = job.value
}

edit_button.addEventListener('click', editButton)
add_button.addEventListener('click', addButton)
close_button.addEventListener('click', function(){closeButton(popup);})
close_button_add_card.addEventListener('click', function(){closeButton(popup_add_card);})
submit_button.addEventListener('click', submitButton)
