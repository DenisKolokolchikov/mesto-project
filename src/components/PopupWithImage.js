import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        }

        open(data) {
            const imgElement = document.querySelector(".popup__big-image");
            const imgCaption = document.querySelector(".popup__big-title");
            imgElement.src = data.link;
            imgElement.alt = data.name;
            imgCaption.textContent = data.name;
            super.open();
        }
}