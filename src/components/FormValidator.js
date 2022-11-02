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

     //проверяем на валидность
     _checkInputValidity(inputList) {
        return inputList.every((inputElement) => {
            return inputElement.validity.valid;
        })  
    }

    //блокируем/разблокируем кнопку сохранить
    toggleButtonState(inputList, button) {
        if(this._checkInputValidity(inputList)) {
            button.classList.remove(this._inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(this._inactiveButtonClass);
            button.disabled = true;
        } 
    }

    //очищаем поля
    clearError(element) {
        element.querySelectorAll('.error').forEach((span) => {
            span.textContent = '';
        })
        element.querySelectorAll('.popup__input').forEach((input) => {
            input.classList.remove('popup__input_state_invalid');
          });
    }

    _setEventListener(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        const submitButton = formElement.querySelector(this._submitButtonSelector);
        this.toggleButtonState(inputList, submitButton); 

        inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._isInputValid(formElement, input)
                this.toggleButtonState(inputList, submitButton);           
            });
        });
    }

    enableValidation() {
        this._setEventListener(this._element);
    }
}

