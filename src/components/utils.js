import { closeByEscape } from "./modal";

export const saveButton = document.querySelector('.button__save');

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
export function changeLoading(isLoading, saveButton) {   
        if(isLoading) {
            saveButton.textContent = "Сохранение...";
        } else {
            saveButton.textContent = "Сохранить";
        }    
}


