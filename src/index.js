import './pages/index.css'; 
import { closePopup, openPopup, changeLoading } from './components/utils';
import { editPopupData, popupAvatar, popupProfile, submitProfileForm, profileAvatarOverlay, setUserInfo, avatarInput } from './components/modal';
import { cardsContainer, renderCard } from './components/card';
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

//закрытие попап аватар после редактирования 
formAvatar.addEventListener('submit', function(evt){
    evt.preventDefault(); 
    const saveButton = document.querySelector('.button__avatar-save');
    changeLoading(true, saveButton);
    patchAvatar(avatarInput.value)
        .then((userAvatar)=>{
            setUserInfo({userAvatar: userAvatar.avatar})
            formAvatar.reset();
            closePopup(popupAvatar);
        })
        .catch((err)=> console.log(err))   
        .finally(()=>changeLoading(false, saveButton));                  
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
            renderCard(item, cardsContainer, userId);  
        });
    })
    .catch((err)=> console.log(err));

//подключение формы добавления картинки
formImage.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const saveButton = document.querySelector('.button__add-save');
    changeLoading(true, saveButton)         
    const newCard = {
        link: inputLinkImg.value,
        name: inputNameImg.value
    }
addNewCard(newCard)
.then((data) => {
    renderCard(data, cardsContainer, userId); 
    formImage.reset();
    closePopup(popupNewImage);
})
.catch((err)=> console.log(err))
.finally(()=>changeLoading(false, saveButton));            
});

//объединение закрытие попав крестиком и мышкой
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if ((evt.target.classList.contains('popup_opened')) || (evt.target.classList.contains('button__close'))) {
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

