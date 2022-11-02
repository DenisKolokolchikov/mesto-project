export class Popup {
    constructor(popupSelector) {
        this.popupSelector = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    
    open(){
        this.popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close(){
        this.popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
}