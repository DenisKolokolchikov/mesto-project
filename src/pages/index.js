import './index.css'; 

import { Section } from '../components/Section';
import { Api } from '../components/api';
import { UserInfo } from '../components/UserInfo';
import { Card } from '../components/card';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';
import { FormValidator } from '../components/FormValidator';
import { changeLoading } from '../components/utils/utils';

const cardTemplate = document.querySelector('#card-template'); 
const popupImage = document.querySelector('.popup__type-image');
const popupProfile = document.querySelector('.popup-profile');
const saveButton = document.querySelector('.button__edit-save');
const editButton = document.querySelector('.button__edit');
const nameInput = document.querySelector('.name__input');
const jobInput = document.querySelector('.job__input');
const popupAvatar = document.querySelector('.popup__avatar');
const profileAvatarOverlay = document.querySelector('.profile__avatar-overlay');
const popupNewImage = document.querySelector('.popup-image');
const addButton = document.querySelector('.button__add');
const inputList = Array.from(document.querySelectorAll('.popup__input'));
const formEdit = document.querySelector('.form__edit');
const formImage = document.querySelector('.form__image');
const formAvatar = document.querySelector('.form__avatar');
const buttonAddSave = document.querySelector('.button__add-save');
const buttonAvatarSave = document.querySelector('.button__avatar-save');
const cardContainer = document.querySelector('.elements__list');

export const validationConfig = {
    formSelector: '.form__popup',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'button__popup_invalid',
    inputErrorClass: 'popup__input_state_invalid',
};

export const config = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
    headers: {
        "Content-type": 'application/json',
        authorization: '2b8d2e32-f428-4578-8dc4-d80d04887d6e'
    }
};

export const api = new Api(config);

//попап большой картинки
const popupBigImage = new PopupWithImage(popupImage);
popupBigImage.setEventListeners(); //подключаем к попапу закрытие крестиком и оверлай

/**--------------------отрисовка карточек и информации------------------ */
//функция отрисовки карточки
function createCard(data) {
    const card = new Card(cardTemplate, () => api.setLike(data._id), () => api.remLike(data._id),/* () => putDeleteLikes(data._id) */ 
    {data,
        handleCardClick: () => {
            popupBigImage.open(data); //открытие большой картинки
        }
    }, 
    () =>  handleDeleteCard(data._id), 
    {userId});
    return card;
}

/**---------------------------удаление карточки с сервера___________________________________________ */
function handleDeleteCard(id)  {
    api.removeCard(id)
        .then(() => {
        })
        .catch((err) => console.log(err));
};
/**---------------------------------------------------------------------------------- */
