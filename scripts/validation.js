const validationConfig = {
    formSelector: '.form__popup',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__input_state_invalid',
  }

const showError = (errorElement, inputElement, config) => {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}

const hideError = (errorElement, inputElement, config) => {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}

const checkInputValidity = (inputElement, formElement, config) => {
    const isInputValid = inputElement.validity.valid; // false невалидно
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if(!isInputValid) {
        showError(errorElement, inputElement, config);
    } else {
        hideError(errorElement, inputElement, config);
    }
}

const toggleButtonState = (button, isActive = false, config) => {
        if(isActive) {
            button.classList.remove(config.inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(config.inactiveButtonClass);
            button.disabled = 'disabled';
        }             
}

//об
const setEventListener = (formElement, config) => {
    const inputList = formElement.querySelectorAll(config.inputSelector);
    const submitButton = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(submitButton, formElement.checkValidity(), config);

    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        console.log('Yes');
    });

    inputList.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(input, formElement, config)
            toggleButtonState(submitButton, formElement.checkValidity(), config);           
        });
    });
} 

//Запускаем валидацию
const enableValidation = (config) => {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach(form => {
        setEventListener(form, config) 
    });
}

enableValidation(validationConfig);