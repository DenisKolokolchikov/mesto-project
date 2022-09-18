import { closePopup, openPopup, changeLoading } from "./utils";
import { editInfoUser } from "./api";


export const profileAvatar = document.querySelector('.profile__avatar');
export const popupAvatar = document.querySelector('.popup__avatar');
export const avatarInput = document.querySelector('.avatar__input');
const nameInput = document.querySelector('.name__input');
const jobInput = document.querySelector('.job__input');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
export const popupProfile = document.querySelector('.popup-profile');
const popupImage = document.querySelector('.popup__type-image');
const popupPic = popupImage.querySelector('.popup__big-image');
const popupBigTitle = document.querySelector('.popup__big-title');
export const profileAvatarOverlay = document.querySelector('.profile__avatar-overlay');
const saveButton = document.querySelector('.button__edit-save');

//подключение кнопки открытия попап для добавления картинок
export function editPopupData() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

//редактирование имени и информации о себе
export function submitProfileForm(evt) {
    evt.preventDefault();   
    changeLoading(true, saveButton);
    editInfoUser(nameInput.value, jobInput.value)
    .then((res)=>{
        profileTitle.textContent = res.name;
        profileSubtitle.textContent = res.about;
        closePopup(popupProfile);
    })
    .catch((err)=> console.log(err))
    .finally(()=>changeLoading(false, saveButton));   
}

//открытие большой картинки
export const handleClickImage = function (data) {
    popupPic.src = data.link;
    popupPic.alt = data.name;
    popupBigTitle.textContent = data.name;
    openPopup(popupImage);
}

//открытие большой картинки
export const handleClickImageClose = function () {
    closePopup(popupImage);
}

//закрытие попапов кнопкой esc
export function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    } 
}

//получение данных о пользователе
export const setUserInfo = ({userName, userDescription, userAvatar}) => {
    if(userName) profileTitle.textContent = userName;
    if(userDescription) profileSubtitle.textContent = userDescription;
    if(userAvatar) profileAvatar.src = userAvatar;
};

