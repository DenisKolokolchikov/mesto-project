import { closeByEscape } from "./modal";

//закрытие попап
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.addEventListener('keydown', closeByEscape); 
}
//открытие попап
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.removeEventListener('keydown', closeByEscape); 
}

