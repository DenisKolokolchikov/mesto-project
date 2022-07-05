import { closePopup, openPopup } from "./utils";

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
const popups = document.querySelectorAll('.popup');
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

//функция перебора попапов
function popupArr() {
    popups.forEach(function (popup) {
        closePopup(popup)
    });
}

//закрытие попапов кнопкой esc
export function keyHandler(evt) {
    if (evt.key === 'Escape') {
        popupArr()
    }
}

//Закрытие попапов кликом по оверлей
export function oneClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        document.removeEventListener('click', popupArr);
        popupArr();
    }
}