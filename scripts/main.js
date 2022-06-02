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

const editButton = document.querySelector('.button__edit');
const closePopupEdit = document.querySelector('.button__close-edit');
const popupProfile = document.querySelector('.popup-profile');

const popupNewImage = document.querySelector('.popup-image');
const addButton = document.querySelector('.button__add');
const closePopupAdd = document.querySelector('.button__close-add');

const formEdit = document.querySelector('.form__edit');
const nameInput = document.querySelector('.name__input');
const jobInput = document.querySelector('.job__input');
const editSaveButton = document.querySelector('.button__edit-save');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__type-image');
const popupPic = popupImage.querySelector('.popup__big-image');
const popupCloseImage = document.querySelector('.button__close-image');
const popupBigTitle = document.querySelector('.popup__big-title');

const cardList = document.querySelector('.elements__list'); 
const cardTemplate = document.querySelector('#card-template').content.querySelector('.elements__item');

const formImage = document.querySelector('.form__image');
const inputNameImg = document.querySelector('.name__img');
const inputLinkImg = document.querySelector('.link__img');
const addSaveButton = document.querySelector('.button__add-save');
//закрытие попап
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}
//открытие попап
function openPopup(popup) {
    popup.classList.add('popup_opened');
}
//открытие и закрытие попап
editButton.addEventListener('click', function() {
    openPopup(popupProfile);
});

closePopupEdit.addEventListener('click', function() {
    closePopup(popupProfile);
});

//подключение кнопки открытия попап для добавления картинок
addButton.addEventListener('click', function() {
    openPopup(popupNewImage);
});

closePopupAdd.addEventListener('click', function() {
    closePopup(popupNewImage);
});

//редактирование имени и информации о себе
function SubmitProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupProfile);
}    

formEdit.addEventListener('submit', SubmitProfileForm);

//удаление карточки
const handleClickButtonDelete = function(evt) {
    evt.target.closest('.elements__item').remove();
}

//подключаю лайк
const handleClickButtonLike = function(evt) {
    evt.target.classList.toggle('button__like-active');
}

const handleClickImage = function(data) {
    popupPic.src = data.link;
    popupPic.alt = data.name;
    popupBigTitle.textContent = data.name; 
    openPopup(popupImage);
}

const handleClickImageClose = function() {
    closePopup(popupImage);
}

//создаем функцию, которая добавляет карточку
const createCard = function(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.elements__img');
    const cardName = cardElement.querySelector('.elements__title');
    const cardDelete = cardElement.querySelector('.button__del');
    const cardLike = cardElement.querySelector('.button__like'); 

    cardLike.addEventListener('click', handleClickButtonLike);
    cardDelete.addEventListener('click', handleClickButtonDelete);
    cardImage.addEventListener('click', () => handleClickImage(data));
   
    cardName.textContent = data.name; 
    cardImage.src = data.link; 
    cardImage.alt = data.name; 

    return cardElement;
}

popupCloseImage.addEventListener('click', handleClickImageClose);

const renderCard = function(data, container) {
    const card = createCard(data); 
    container.prepend(card); 
}

//рендерим карточки
initialCards.forEach(function(item) {
    renderCard(item, cardList); 
});

//подключение формы добывления картинки
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


