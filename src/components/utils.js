import { closeByEscape } from "./modal";

//закрытие попап
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape); 
}
//открытие попап
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape); 
}

//Улучшение UX форм
/* export function changeLoading(isLoading, place) {
    if(isLoading) {
        place.querySelector('.button__save').textContent = "Сохранение...";
    } else {
        place.querySelector('.button__save').textContent = "Сохраненить";
    }
} */

export function changeLoading(isLoading) {
    buttonSave.querySelector('.button__save').textContent = isLoading ? "Сохранение..." : "Сохраненить";
}