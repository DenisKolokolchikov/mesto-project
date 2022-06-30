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
const formPopup = document.querySelector('.form__popup');
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

const profileAvatar = document.querySelector('.profile__avatar');
const popupAvatar = document.querySelector('.popup__avatar');
const formAvatar = popupAvatar.querySelector('.form__avatar');
const buttonCloseAvatar = document.querySelector('.button__close-avatar');
const avatarInput = document.querySelector('.avatar__input');

const buttonSave = document.querySelector('.button__save');

const popups = document.querySelectorAll('.popup');

const activePopup = document.querySelector('.popup_opened');

//const formEditPopup = document.forms.form_edit;
//const userName = formEditPopup.elements.username;
//const profession = formEditPopup.elements.profession;

//const formImage = document.forms.form_image;
//const imgName = formImage.elements.imgname;
//const linkName = formImage.elements.link;

//закрытие попап
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}
//открытие попап
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

//открытие/закрытие попап аватар
profileAvatar.addEventListener('click', function () {
    openPopup(popupAvatar);
});
buttonCloseAvatar.addEventListener('click', function () {
    closePopup(popupAvatar);
});
function submitFormAvatar(evt) {
    evt.preventDefault();
    profileAvatar.src = avatarInput.value;
    closePopup(popupAvatar);
}
formAvatar.addEventListener('submit', submitFormAvatar);

//открытие и закрытие попап
editButton.addEventListener('click', function () {
    editPopupData(popupProfile);
    openPopup(popupProfile);
});

closePopupEdit.addEventListener('click', function () {
    closePopup(popupProfile);
});

//подключение кнопки открытия попап для добавления картинок
addButton.addEventListener('click', function () {
    openPopup(popupNewImage);
});

closePopupAdd.addEventListener('click', function () {
    closePopup(popupNewImage);
});

function editPopupData() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

//редактирование имени и информации о себе
function submitProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupProfile);
}

formEdit.addEventListener('submit', submitProfileForm);

//disabled кнопки сохранить
//function buttonSaveArr(isFormValid) {
//    buttonSave.forEach(function(buttonSave) {
//        if (isFormValid) {
//            buttonSave.removeAttribute('disabled');
//            buttonSave.classList.remove('button__save_disabled');
//        } else {
//            buttonSave.setAttribute('disabled', true);
//            buttonSave.classList.add('button__save_disabled');
//        } 
//    });  
//}

//disabled кнопки сохранить
//function setSubmitButtonState(isFormValid) {
//    if (isFormValid) {
//        buttonSave.removeAttribute('disabled');
//        buttonSave.classList.remove('button__save_disabled');
//    } else {
//        buttonSave.setAttribute('disabled', true);
//        buttonSave.classList.add('button__save_disabled');
//    }
//}

//удаление карточки
const handleClickButtonDelete = function (evt) {
    evt.target.closest('.elements__item').remove();
}

//подключаю лайк
const handleClickButtonLike = function (evt) {
    evt.target.classList.toggle('button__like-active');
}

//открытие большой картинки
const handleClickImage = function (data) {
    popupPic.src = data.link;
    popupPic.alt = data.name;
    popupBigTitle.textContent = data.name;
    openPopup(popupImage);
}

const handleClickImageClose = function () {
    closePopup(popupImage);
}

//создаем функцию, которая добавляет карточку
const createCard = function (data) {
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

//рендерим карточки
const renderCard = function (data, container) {
    const card = createCard(data);
    container.prepend(card);
}

initialCards.forEach(function (item) {
    renderCard(item, cardList);
});

//подключение формы добавления картинки
formImage.addEventListener('submit', function (evt) {
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

//функция перебора попапов
function popupArr() {
    popups.forEach(function (popup) {
        closePopup(popup)
    });
}

//закрытие попапов кнопкой esc
function keyHandler(evt) {
    if (evt.key === 'Escape') {
        popupArr()
    }
}

document.addEventListener('keydown', keyHandler);

//Закрытие попапов кликом по оверлей
function oneClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        document.removeEventListener('click', popupArr);
        popupArr()
    }
}

document.addEventListener('click', oneClick);

//события change и input для редактирования профиля
//formEditPopup.addEventListener('input', function (evt) {
//    isValid = nameInput.value.length > 1 && jobInput.value.length > 1;
//    buttonSaveArr(isValid);
//});

//события change и input для добавления карточки
//formImage.addEventListener('input', function (evt) {
//    isValid = inputNameImg.value.length > 1;
//    buttonSaveArr(isValid);
//});

//const showError = function (input) {
//    input.classList.add('form__input_type_error');
//}

//const hideError = (input) => {
//    input.classList.remove('form__input_type_error');
//}

//const checkInputValidity = function() {
//    if (!nameInput.validity.valid) {
//        showError(nameInput);
//      } else {
//        hideError(nameInput);
//      }
//};

//nameInput.addEventListener('input', function () {
//    checkInputValidity();
//  });

const validationConfig = {
    formSelector: '.form__popup',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__input_state_invalid',
  }

const showError = (errorElement, inputElement, config) => {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}

const hideError = (errorElement, inputElement, config) => {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}

const checkInputValidity = (inputElement, formElement, config) => {
    const isInputValid = inputElement.validity.valid; // false невалидно
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if(!isInputValid) {
        showError(errorElement, inputElement, config);
    } else {
        hideError(errorElement, inputElement, config);
    }
}

const toggleButtonState = (button, isActive = false, config) => {
        if(isActive) {
            button.classList.remove(config.inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(config.inactiveButtonClass);
            button.disabled = 'disabled';
        }             
}

//об
const setEventListener = (formElement, config) => {
    const inputList = formElement.querySelectorAll(config.inputSelector);
    const submitButton = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(submitButton, formElement.checkValidity(), config);

    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        console.log('Yes');
    });

    inputList.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(input, formElement, config)
            toggleButtonState(submitButton, formElement.checkValidity(), config);           
        });
    });
} 

//Запускаем валидацию
const enableValidation = (config) => {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach(form => {
        setEventListener(form, config) 
    });
}

enableValidation(validationConfig);

