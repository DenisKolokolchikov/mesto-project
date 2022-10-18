export class Popup {
  constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
  }

  _hadldeEscUp = (evt) => {
      if(evt.key === 'Escape'){
          this.close();
      }
  }

  open(){
      this._popup.classList.add('popup_opened');
      document.addEventListener('keyup', this._hadldeEscUp)
  }

  close(){
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keyup', this._hadldeEscUp)
  }

  setEventListener(){
      console.log(this);
      this._popup.addEventListener('mousedown', (evt) => {
        if ((evt.target.classList.contains('popup_opened')) || (evt.target.classList.contains('button__close'))) {
            this.close();
        }
      })
  }

}