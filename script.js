let edit_button = document.querySelector('.profile__edit-button')
let close_button = document.querySelector('.popup__close')
let popup = document.querySelector('.popup')

function editButton(event){
    event.preventDefault();
    popup.classList.remove('popup__container_popup_opened')
}

function closeButton(event){
    event.preventDefault();
    popup.classList.add('popup__container_popup_opened')
}

edit_button.addEventListener('click', editButton)
close_button.addEventListener('click', closeButton)