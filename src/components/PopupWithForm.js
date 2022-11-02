import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor(popupSelector, {handleSubmitForm}) {
        super(popupSelector);
        this.handleSubmitForm = handleSubmitForm; //обработчик сабмита формы
        
      }

      _setSubmitForm(evt) {
        evt.preventDefault();
        this.handleSubmitForm(this._getInputValues())
      }

      //собираем данные полей формы
      _getInputValues() { 
        this._inputList = this.popupSelector.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => { //перепрали инпуты и закинули в пустой объект
          this._formValues[input.name] = input.value;
        });
        return this._formValues;
      }

      //закрытие попапа - всё сбрасываем
      close() {
        this.popupSelector.removeEventListener('submit', this.handleSubmitForm);
        this.popupSelector.querySelector('.form__popup').reset(); //сбросили поля
        super.close();
      }

      setEventListeners() {
        this._submit = this._setSubmitForm.bind(this);
        this.popupSelector.addEventListener('submit', this._submit);
        super.setEventListeners();
      }     
}