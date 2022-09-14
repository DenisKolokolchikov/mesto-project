import './pages/index.css'; 
import { closePopup, openPopup } from './components/utils';
import { /* submitFormAvatar, */ editPopupData, popupAvatar, popupProfile, submitProfileForm, profileAvatarOverlay, closeByEscape, setUserInfo, avatarInput } from './components/modal';
import { cardList, renderCard } from './components/card';
import { validationConfig, setEventListener, toggleButtonState } from './components/validate';
import { addNewCard, getAllUnfo, patchAvatar } from './components/api';

const editButton = document.querySelector('.button__edit');
const popupNewImage = document.querySelector('.popup-image');
const addButton = document.querySelector('.button__add');
const formEdit = document.querySelector('.form__edit');
const formImage = document.querySelector('.form__image');
const inputNameImg = document.querySelector('.name__img');
const inputLinkImg = document.querySelector('.link__img');
const formAvatar = document.querySelector('.form__avatar');
const popups = document.querySelectorAll('.popup');
const buttonAddSave = document.querySelector('.button__add-save');
const buttonAvatarSave = document.querySelector('.button__avatar-save');

//открытие/закрытие попап аватар
profileAvatarOverlay.addEventListener('click', function () {
    openPopup(popupAvatar);
    toggleButtonState(buttonAvatarSave, false, validationConfig);
});


/* function submitFormAvatar(evt) {
    evt.preventDefault();
    patchAvatar(avatarInput.value)
        .then((userAvatar)=>{
            setUserInfo({userAvatar: userAvatar.avatar})
        })
        .catch((err)=> console.log(err));
        formAvatar.reset();
        closePopup(popupAvatar);         
} */ 

//закрытие попап аватар после редактирования  
/* formAvatar.addEventListener('submit', submitFormAvatar); */

//закрытие попап аватар после редактирования 
formAvatar.addEventListener('submit', function(evt){
    evt.preventDefault();
    patchAvatar(avatarInput.value)
        .then((userAvatar)=>{
            setUserInfo({userAvatar: userAvatar.avatar})
        })
        .catch((err)=> console.log(err));
        formAvatar.reset();
        closePopup(popupAvatar);         
});

//открытие и закрытие попап 
editButton.addEventListener('click', function () {
    editPopupData(popupProfile);
    openPopup(popupProfile);
});

//подключение кнопки открытия попап для добавления картинок
addButton.addEventListener('click', function () {
    openPopup(popupNewImage);
    toggleButtonState(buttonAddSave, false, validationConfig);
});

//редактирование имени и информации о себе
formEdit.addEventListener('submit', submitProfileForm);

let userId = null;

getAllUnfo()
    .then(([initialCards, user]) => {
        setUserInfo({
            userName: user.name,
            userDescription: user.about,
            userAvatar: user.avatar
        });
        userId = user._id;
        initialCards.forEach(function (item) {
            renderCard(item, cardList, userId);
        });
    })
    .catch((err)=> console.log(err));

//подключение формы добавления картинки
formImage.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const newCard = {
        link: inputLinkImg.value,
        name: inputNameImg.value
    }
addNewCard(newCard)
.then((data) => {
    renderCard(data, cardList, userId); 
})
.catch((err)=> console.log(err));
    formImage.reset();
    closePopup(popupNewImage);        
});

//закрытие попапов кнопкой esc
document.addEventListener('keydown', closeByEscape);

//объединение закрытие попав крестиком и мышкой
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('button__close')) {
          closePopup(popup)
        }
    });
});

//Запускаем валидацию
const enableValidation = (config) => {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach(form => {
        setEventListener(form, config); 
    });
}

//Валидация 
enableValidation(validationConfig); 

