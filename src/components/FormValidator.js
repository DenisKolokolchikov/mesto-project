export class FormValidator {
    constructor(config, element) {
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._element = element;
    }

    //показываем ошибку
    _showError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;   
    }

    //убираем ошибку
    _hideError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
    }

    // Функция проверки валидности поля
    _isInputValid (formElement, inputElement) {
        if (!inputElement.validity.valid) {
        this._showError(formElement, inputElement, inputElement.validationMessage);
        } else {
        this._hideError(formElement, inputElement);
        }
    };
}

