import { closePopup, openPopup } from "./utils";
import { editInfoUser } from "./api";

export const profileAvatar = document.querySelector('.profile__avatar');
export const popupAvatar = document.querySelector('.popup__avatar');
const avatarInput = document.querySelector('.avatar__input');
const nameInput = document.querySelector('.name__input');
const jobInput = document.querySelector('.job__input');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
export const popupProfile = document.querySelector('.popup-profile');
const popupImage = document.querySelector('.popup__type-image');
const popupPic = popupImage.querySelector('.popup__big-image');
const popupBigTitle = document.querySelector('.popup__big-title');
export const profileAvatarOverlay = document.querySelector('.profile__avatar-overlay');

//открытие/закрытие попап аватар
export function submitFormAvatar(evt) {
    evt.preventDefault();
    profileAvatar.src = avatarInput.value;
    closePopup(popupAvatar);   
}

//подключение кнопки открытия попап для добавления картинок
export function editPopupData() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

//редактирование имени и информации о себе
export function submitProfileForm(evt) {
    editInfoUser(nameInput.value, jobInput.value)
    .catch((err)=> console.log(err))
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupProfile);
    
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

//Улучшение UX форм
/* function changeLoading(isLoading, place) {
    if(isLoading) {
        place.querySelector('.form__submit').textContent = "Сохранение...";
    } else {
        place.querySelector('.form__submit').textContent = "Сохраненить";
    }
} */