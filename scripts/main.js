//открытие и закрытие попап
const editButton = document.querySelector('.button__edit');
const closePopupEdit = document.querySelector('#button__close');
const popupProfile = document.querySelector('#popup-profile');

editButton.addEventListener('click', function() {
    popupProfile.classList.add('popup_opened');

});

closePopupEdit.addEventListener('click', function() {
    popupProfile.classList.remove('popup_opened');
});

//подключение кнопки открытия попап для добавления картинок
const popupNewImage = document.querySelector('#popup-new-image');
const addButton = document.querySelector('.button__add');
const closePopupAdd = document.querySelector('#button__close-add');

addButton.addEventListener('click', function() {
    popupNewImage.classList.add('popup_opened');
});

closePopupAdd.addEventListener('click', function() {
    popupNewImage.classList.remove('popup_opened');
});

//редактирование имени и информации о себе
const formEdit = document.querySelector('#form-edit');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');
const editSaveButton = document.querySelector('#edit-save');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function formSublitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    editSaveButton.addEventListener('click', function() {
        popupProfile.classList.remove('popup_opened');
    });
}    

formEdit.addEventListener('submit', formSublitHandler);

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('#popup-type-image');
const popupPic = popupImage.querySelector('.popup__big-image');
const popupCloseImage = document.querySelector('.button__close-image');
const popupBigTitle = document.querySelector('.popup__big-title');
//удаление карточки
const handleClickButtonDelete = function(evt) {
    evt.target.closest('.elements__item').remove();
}

//подключаю лайк
const handleClickButtonLike = function(evt) {
    evt.target.classList.toggle('button__like-active');
}

//открываю большую картинку и подключение figcaption
const openPopup = function(popupTypeImage) {
    popupTypeImage.classList.add('popup_opened');
}
const handleClickImage = function(data) {
    popupPic.src = data.link;
    popupBigTitle.textContent = data.name; 
    openPopup(popupImage);
}

//закрываю большую картинку
const closePopup = function(popupTypeImage) {
    popupTypeImage.classList.remove('popup_opened')
}
const handleClickImageClose = function() {
    closePopup(popupImage);
}

//добавляю карточку
const cardList = document.querySelector('.elements__list'); 
const cardTemplate = document.querySelector('#card-template').content.querySelector('.elements__item');
//создаем функцию, которая создает карточку
const createCard = function(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.elements__img');
    const cardName = cardElement.querySelector('.elements__title');
    const cardDelete = cardElement.querySelector('.button__del');
    const cardLike = cardElement.querySelector('.button__like'); 

    cardLike.addEventListener('click', handleClickButtonLike);
    cardDelete.addEventListener('click', handleClickButtonDelete);
    cardImage.addEventListener('click', () => handleClickImage(data));
    popupCloseImage.addEventListener('click', handleClickImageClose);
   
    cardName.textContent = data.name; 
    cardImage.src = data.link; 
    cardImage.alt = data.name; 

    return cardElement;
}

const renderCard = function(data, container) {
    const card = createCard(data); 
    container.prepend(card); 
}

//рендерим карточки
initialCards.forEach(function(item) {
    renderCard(item, cardList); 
});

//подключение формы добывления картинки
const formImage = document.querySelector('#form-image');
const inputNameImg = document.querySelector('#name-img');
const inputLinkImg = document.querySelector('#link-img');
const addSaveButton = document.querySelector('#add-save');

formImage.addEventListener('submit', function(evt) { 
    evt.preventDefault();
    const data = {
        link: inputLinkImg.value,
        name: inputNameImg.value,
    }
    inputLinkImg.value = "";
    inputNameImg.value = "";
    popupNewImage.classList.remove('popup_opened'); 
    renderCard(data, cardList); 
});


