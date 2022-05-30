//открытие и закрытие попап

let editButton = document.querySelector('.profile__edit-button');
let closePopupEdit = document.querySelector('#profile__close-button');
let popupProfile = document.querySelector('#popup-profile');

editButton.addEventListener('click', function() {
    popupProfile.classList.add('popup_opened');

});

closePopupEdit.addEventListener('click', function() {
    popupProfile.classList.remove('popup_opened');
});

//подключаю кнопку открытия попап для добавления картинок

let popupNewImage = document.querySelector('#popup-new-image');
let addButton = document.querySelector('.profile__add-button');
let closePopupAdd = document.querySelector('#add__close-button');

addButton.addEventListener('click', function() {
    popupNewImage.classList.add('popup_opened');
});

closePopupAdd.addEventListener('click', function() {
    popupNewImage.classList.remove('popup_opened');
});

//редактирование имени и информации о себе

let formEdit = document.querySelector('#form-edit');
let nameInput = document.querySelector('#name-input');
let jobInput = document.querySelector('#job-input');
let editSaveButton = document.querySelector('#edit-save');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function formSublitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    editSaveButton.addEventListener('click', function() {
        popupProfile.classList.remove('popup_opened');
    });
}    

formEdit.addEventListener('submit', formSublitHandler);

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

//const formImage = document.querySelector('#form-image');//получаем форму
const cardList = document.querySelector('.elements__list'); //контейнер для карточек <ul>
const cardTemplate = document.querySelector('#card-template').content.querySelector('.elements__item');

//создаем функцию, которая создает карточку
//функция принимает данные (параметр data) из которых будет создавать разметку
const createCard = function(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.elements__img');// img из template
    const cardName = cardElement.querySelector('.elements__title');//<h2> из template
    const cardLike = cardElement.querySelector('.elements__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like-active');
    });
    cardName.textContent = data.name; //с массива
    cardImage.src = data.link; //с массива

    return cardElement;
}

//выносим функцию добавления карточки на страницу в отдельную функцию
//функция принимает данные и место куда добавляем карточки - некий контейнер
const renderCard = function(data, container) {
    const card = createCard(data); //item меняем на data
    //вставляем нашу карточку card в контейнер
    container.prepend(card); //меняем на контейнер
}

//рендерим карточки
//параметры функции: сам объект, его индекс, ссылка на массив
//перебираем только элементы
initialCards.forEach(function(item) {
    //вызываем функцию render
    renderCard(item, cardList); //указываем элементы и контейнер <ul>
});
// теперь можно функцию renderCard переиспользовать
