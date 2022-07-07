import './pages/index.css'; 
import { closePopup, openPopup } from './components/utils';
import { submitFormAvatar, editPopupData, popupAvatar, popupProfile, submitProfileForm, handleClickImageClose, profileAvatarOverlay, closeByEscape } from './components/modal';
import { cardList, renderCard } from './components/card';
import { validationConfig, setEventListener, toggleButtonState } from './components/validate';

const editButton = document.querySelector('.button__edit');
const popupNewImage = document.querySelector('.popup-image');
const addButton = document.querySelector('.button__add');
const formEdit = document.querySelector('.form__edit');
const popupCloseImage = document.querySelector('.button__close-image');
const formImage = document.querySelector('.form__image');
const inputNameImg = document.querySelector('.name__img');
const inputLinkImg = document.querySelector('.link__img');
const formAvatar = document.querySelector('.form__avatar');
export const popups = document.querySelectorAll('.popup');
const buttonAddSave = document.querySelector('.button__add-save');

//открытие/закрытие попап аватар
profileAvatarOverlay.addEventListener('click', function () {
    openPopup(popupAvatar);
});

//открытие/закрытие попап аватар
formAvatar.addEventListener('submit', submitFormAvatar);

//открытие и закрытие попап
editButton.addEventListener('click', function () {
    editPopupData(popupProfile);
    openPopup(popupProfile);
});


//подключение кнопки открытия попап для добавления картинок
addButton.addEventListener('click', function () {
    openPopup(popupNewImage);
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
    closePopup(popupNewImage); 
    renderCard(data, cardList);
    //Блокируем форму повторной отправки
    toggleButtonState(buttonAddSave, true, config.inactiveButtonClass);
});

//закрытие попапов кнопкой esc
document.addEventListener('keydown', closeByEscape);

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
