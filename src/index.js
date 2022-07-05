import './pages/index.css'; 
import { closePopup, openPopup } from './components/utils';
import { submitFormAvatar, editPopupData, popupAvatar, popupProfile, submitProfileForm, handleClickImageClose, keyHandler, oneClick, profileAvatarOverlay } from './components/modal';
import { cardList, renderCard } from './components/card';
import { validationConfig, setEventListener } from './components/validate';

const editButton = document.querySelector('.button__edit');
const closePopupEdit = document.querySelector('.button__close-edit');
const popupNewImage = document.querySelector('.popup-image');
const addButton = document.querySelector('.button__add');
const closePopupAdd = document.querySelector('.button__close-add');
const formEdit = document.querySelector('.form__edit');
const popupCloseImage = document.querySelector('.button__close-image');
const formImage = document.querySelector('.form__image');
const inputNameImg = document.querySelector('.name__img');
const inputLinkImg = document.querySelector('.link__img');
const formAvatar = document.querySelector('.form__avatar');
const buttonCloseAvatar = document.querySelector('.button__close-avatar');


//открытие/закрытие попап аватар
profileAvatarOverlay.addEventListener('click', function () {
    openPopup(popupAvatar);
});
buttonCloseAvatar.addEventListener('click', function () {
    closePopup(popupAvatar);
});

//открытие/закрытие попап аватар
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

//редактирование имени и информации о себе
formEdit.addEventListener('submit', submitProfileForm);

//создаем функцию, которая добавляет карточку
popupCloseImage.addEventListener('click', handleClickImageClose);

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

//закрытие попапов кнопкой esc
document.addEventListener('keydown', keyHandler);

//Закрытие попапов кликом по оверлей
document.addEventListener('click', oneClick);

//Запускаем валидацию
const enableValidation = (config) => {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach(form => {
        setEventListener(form, config) 
    });
}

//Валидация 
enableValidation(validationConfig); 
  
  
 




