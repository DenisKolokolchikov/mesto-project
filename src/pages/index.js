import './index.css'; 

import { Section } from '../components/Section';
import { Api } from '../components/api';
import { UserInfo } from '../components/UserInfo';
import { Card } from '../components/Сard';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';
import { FormValidator } from '../components/FormValidator';
import { changeLoading } from '../utils/utils';
import { cardTemplate, popupImage, popupProfile, saveButton, editButton, nameInput, jobInput, popupAvatar, profileAvatarOverlay, popupNewImage,
    addButton, inputList, formEdit, formImage, formAvatar, buttonAddSave, buttonAvatarSave, 
    cardContainer, validationConfig, config} from '../utils/constants';

export const api = new Api(config);

//попап большой картинки
const popupBigImage = new PopupWithImage(popupImage);
popupBigImage.setEventListeners(); //подключаем к попапу закрытие крестиком и оверлай

/**--------------------отрисовка карточек и информации------------------ */
//функция отрисовки карточки
function createCard(data) {
    const card = new Card('#card-template', () => api.setLike(data._id), () => api.remLike(data._id),/* () => putDeleteLikes(data._id) */ 
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

//создание карточки - дабавление в DOM
const cardList = new Section({
    renderer: (item) => {
        const cardElement = createCard(item).generateCardElement();
        cardList.addItem(cardElement)
    }
}, cardContainer);

//данные для отображения инфо пользователя
const profileInfo = new UserInfo({
    profileName: document.querySelector('.profile__title'),
    profileDescription: document.querySelector('.profile__subtitle'),
    profileAvatar: document.querySelector('.profile__avatar'),
});

//отображение карточек и инфо пользователя
let userId = null 
api.getAllUnfo()
.then(([items, user]) => {
    items = items.reverse(); //add
    profileInfo.getInfoUser(user.name, user.about, user.avatar);
    profileInfo.setUserInfo(user);
    userId = user._id;
    cardList.renderItems(items);
}) 
.catch((err)=> console.log(err));

/**---------------------------------------------------------------------------------- */

/**------------попап редактирования профиля------------------------------------------- */
//форма редактирования профиля
const profileFormPopup = new PopupWithForm(popupProfile, { 
    handleSubmitForm: (user) => {
        changeLoading(popupProfile); //изменение 'Сохранить' на 'Сохранение...'
        api.editInfoUser(user.username, user.profession)
        .then((res) => {
            profileInfo.setUserInfo(res)
            profileFormPopup.close()
        })
        .catch((err)=> console.log(err))
    } 
});
profileFormPopup.setEventListeners(); //подключаем к попапу закрытие крестиком и оверлай


//открытие попапа редактирования профиля
const openProfileFormPopup = () => {
    saveButton.textContent = 'Сохранить';
    const userInfoEdit = profileInfo.getInfoUser();
    nameInput.value = userInfoEdit.name; //при открытие получаем данные с сервера в полях ввода
    jobInput.value = userInfoEdit.about;
    validProfile.clearError(formEdit); //отчищаем при открытие ошибки валидации
    validProfile.toggleButtonState(inputList, saveButton); //блокировка/разблокировка кнопки валидацией
    //дописать валидацию
    profileFormPopup.open();
}
//подключаем кнопку сохранить попапа редактирование инфо пользователя
editButton.addEventListener('click', () => openProfileFormPopup());

/**----------------------------------------------------------------------------------- */

/**---------------попап аватар--------------------------------------------------------- */
const openAvatarChange = new PopupWithForm(popupAvatar, {
    handleSubmitForm: (user) => {
        changeLoading(popupAvatar); //изменение 'Сохранить' на 'Сохранение...'
        api.patchAvatar(user.linkAvatar)
        .then((res) => {
            profileInfo.makeUserAvatar(res)  
            openAvatarChange.close();
        })
       .catch((err)=> console.log(err));
    }
})
openAvatarChange.setEventListeners(); //подключаем к попапу закрытие крестиком и оверлай

//открытие попап аватар
const openUserAvatar = () => {
    buttonAvatarSave.textContent = 'Сохранить';
    validNewAvatar.clearError(formAvatar); //блокировка/разблокировка кнопки валидацией
    validNewAvatar.toggleButtonState(inputList, buttonAvatarSave); //блокировка/разблокировка кнопки валидацией
    openAvatarChange.open();
}
//подключаем кнопку сохранить попапа аватар
profileAvatarOverlay.addEventListener('click', () => openUserAvatar())
/**---------------------------------------------------------------------------------- */

/**-----------------добавление картинки---------------------------------------------- */
const openFormPicture = new PopupWithForm(popupNewImage, {
    handleSubmitForm: (user) => {
        changeLoading(popupNewImage); //изменение 'Сохранить' на 'Сохранение...'
        api.addNewCard(user.imgname, user.link)
        .then((res) => {
            const cardElement = createCard(res).generateCardElement(); 
            cardList.addItem(cardElement); 
            openFormPicture.close();
        })
        .catch((err)=> console.log(err));
        
    }
});

openFormPicture.setEventListeners();//подключаем к попапу закрытие крестиком и оверлай

//открытие попап добавления картинки
const openFormCard = () => {
    buttonAddSave.textContent = 'Сохранить';
    validNewImage.clearError(formImage); //отчищаем при открытие ошибки валидации
    validNewImage.toggleButtonState(inputList, buttonAddSave); //блокировка/разблокировка кнопки валидацией
    openFormPicture.open();
}

addButton.addEventListener('click', () => openFormCard());
/**---------------------------------------------------------------------------------- */

/**---------------------------валидация форм___________________________________________ */
const validProfile = new FormValidator(validationConfig, popupProfile);
validProfile.enableValidation();

const validNewImage = new FormValidator(validationConfig, popupNewImage);
validNewImage.enableValidation();

const validNewAvatar = new FormValidator(validationConfig, popupAvatar);
validNewAvatar.enableValidation();