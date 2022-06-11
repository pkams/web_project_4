const edit_button = document.querySelector('.profile__edit-button')
const add_button = document.querySelector('.profile__add-button')
const popup = document.querySelector('.popup')
const popup_add_card = document.querySelector('.popup__add-card')
const popup_view_image = document.querySelector('.popup__view-image')
const popup_opened = document.querySelector('.popup_opened')
const popup_add_card_opened = document.querySelector('.popup__add-card_opened')
const popup_view_image_opened = document.querySelector('.popup__view-image_opened')
const close_button =  popup.querySelector('.popup__close')
const close_button_add_card =  popup_add_card.querySelector('.popup__close')
const close_button_view_image =  popup_view_image.querySelector('.popup__close_view-image')
const submit_button = document.querySelector('.popup__save-button')
const submit_button_add_card = document.querySelector('.popup__add-card-save-button')

let initialCards = [
    /*{
    name: "TESTE",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  },*/
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
    popup_opened.style.visibility = 'visible'
    popup_opened.style.opacity = '1'


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
    popup_add_card_opened.style.visibility = 'visible'
    popup_add_card_opened.style.opacity = '1';
}

function closeButton(popup){
    popup_opened.style.transition = 'visibility 0.3s, opacity 0.3s linear';
    popup_add_card_opened.style.transition = 'visibility 0.3s, opacity 0.3s linear';
    popup_view_image_opened.style.transition = 'visibility 0.3s, opacity 0.3s linear';
    popup_opened.style.visibility = 'hidden'
    popup_opened.style.opacity = '0'
    popup_add_card_opened.style.visibility = 'hidden'
    popup_add_card_opened.style.opacity = '0';
    popup_view_image_opened.style.visibility = 'hidden'
    popup_view_image_opened.style.opacity = '0';
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

function submitButtonAddCard(event){
    event.preventDefault()

    // Get forms and profile variables
    const title = document.querySelector('#title')
    const image_url = document.querySelector('#image-url')

    if ((title.value.length === 0) && (image_url.value.length === 0)){
        alert('Por favor, digite valores para Titulo e Link!')
    }
    else{
        // Switch actual profile information for the new information
        initialCards.unshift({
        name: title.value,
        link: image_url.value
        })

        resetElementsState()
        resetImage()
    }
}

function likeButton(event){
    event.preventDefault()
    this.classList.toggle('card__like-button_clicked')
}

function deleteButton(i){
    // Delete the i element
    initialCards.splice(i, 1)

    resetElementsState()
    resetImage()
}

function viewImage(i){
    popup_view_image_opened.style.visibility = 'visible'
    popup_view_image_opened.style.opacity = '1'

    let popup_image = document.querySelector('.popup__image')
    let popup_image_name = document.querySelector('.popup__image-name')
    popup_image.src = initialCards[i]['link']
    popup_image_name.textContent = initialCards[i]['name']
    //popup_view_image.classList.toggle('popup_opened')
}

function updateCards(){
    initialCards.slice(0, 6).forEach(function(element, index){
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__text-title").textContent = element['name'];
    cardElement.querySelector(".card__image").src = element['link'];
    elementContainer.append(cardElement)
})
}

function updateTrashs(){
    const trashs_button = document.querySelectorAll('.card__trash-button')
    trashs_button.forEach((item, i) => {
    item.addEventListener('click', function(){deleteButton(i)})
    })
}

function resetElementsState(){
    // Reset elementContainer
    elementContainer.innerHTML = '';
    // Update the elements in the elementContainer
    updateCards()
    // Rerun the for to assign the function to the trash elements again
    updateTrashs()
}

function resetImage(){
    // View image
    const card_buttons = document.querySelectorAll('.card__image')
    card_buttons.forEach((item, i) => {
        item.addEventListener('click', function(){viewImage(i)})
    })
}

// Event listeners
edit_button.addEventListener('click', editButton)
add_button.addEventListener('click', addButton)
close_button.addEventListener('click', function(){closeButton(popup);})
close_button_add_card.addEventListener('click', function(){closeButton(popup_add_card);})
close_button_view_image.addEventListener('click', function(){closeButton(popup_view_image );})
submit_button.addEventListener('click', submitButton)
submit_button_add_card.addEventListener('click', submitButtonAddCard)


// Add Cards
let elementContainer = document.querySelector('.elements')
let cardTemplate = document.querySelector("#card-template").content;
updateCards()


// Like button
let like_buttons = document.querySelectorAll('.card__like-button')
like_buttons.forEach(item => {
  item.addEventListener('click', likeButton)
})

// Trash button
let trash_buttons = document.querySelectorAll('.card__trash-button')
trash_buttons.forEach((item, i) => {
    item.addEventListener('click', function(){deleteButton(i)})
})

// View image
let card_buttons = document.querySelectorAll('.card__image')
card_buttons.forEach((item, i) => {
    item.addEventListener('click', function(){viewImage(i)})
})