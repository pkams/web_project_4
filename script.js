// Popup actions
let edit_button = document.querySelector('.profile__edit-button')
let close_button = document.querySelector('.popup__close')
let popup = document.querySelector('.popup')

let submit_button = document.querySelector('.popup__save-button')

function editButton(event){
    event.preventDefault();
    popup.classList.remove('popup__container_popup_opened')
}

function closeButton(event){
    event.preventDefault();
    popup.classList.add('popup__container_popup_opened')
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

    // Erase values in forms field
    name.value = ''
    job.value = ''
}

edit_button.addEventListener('click', editButton)
close_button.addEventListener('click', closeButton)
submit_button.addEventListener('click', submitButton)