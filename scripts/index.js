//открытие и закрытие попап

const editButton = document.querySelector('.profile__edit-button');
const closePopupEdit = document.querySelector('#profile__close-button');
const popupProfile = document.querySelector('#popup-profile');

editButton.addEventListener('click', function() {
    popupProfile.classList.add('popup_opened');

});

closePopupEdit.addEventListener('click', function() {
    popupProfile.classList.remove('popup_opened');
});

//подключаю кнопку открытия попап для добавления картинок

const popupNewImage = document.querySelector('#popup-new-image');
const addButton = document.querySelector('.profile__add-button');
const closePopupAdd = document.querySelector('#add__close-button');

addButton.addEventListener('click', function() {
    popupNewImage.classList.add('popup_opened');
});

closePopupAdd.addEventListener('click', function() {
    popupNewImage.classList.remove('popup_opened');
});

//редактирование имени и информации о себе

const formEdit = document.querySelector('#form-edit');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');
const editSaveButton = document.querySelector('#edit-save');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function formSublitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    editSaveButton.addEventListener('click', function() {
        popupProfile.classList.remove('popup_opened');
    });
}    

formEdit.addEventListener('submit', formSublitHandler);

//массив для добавления карточек
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

//удаление карточки
const handleClickButtonDelete = function (evt) {
    evt.target.closest('.elements__item').remove();
}

//подключаем лайк
const handleClickButtonLike = function (evt) {
    evt.target.classList.toggle('elements__like-active');
}

//добавляем карточки
const cardList = document.querySelector('.elements__list'); //контейнер для карточек <ul>
const cardTemplate = document.querySelector('#card-template').content.querySelector('.elements__item');
//const formImage = document.querySelector('#form-image');
//создаем функцию, которая создает карточку
//функция принимает данные (параметр data) из которых будет создавать разметку
const createCard = function(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.elements__img');// img из template
    const cardName = cardElement.querySelector('.elements__title');//<h2> из template
    const cardDelete = cardElement.querySelector('.elements__del');
    const cardLike = cardElement.querySelector('.elements__like'); 

    cardLike.addEventListener('click', handleClickButtonLike);
    cardDelete.addEventListener('click', handleClickButtonDelete);

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


//подключение формы добывления картинки
const formImage = document.querySelector('#form-image');
const inputNameImg = document.querySelector('#name-img');
const inputLinkImg = document.querySelector('#link-img');
const addSaveButton = document.querySelector('#add-save');

formImage.addEventListener('submit', function(evt) { //форма попапа
    evt.preventDefault();
    const data = {
        link: inputLinkImg.value,
        name: inputNameImg.value,
    }
    inputLinkImg.value = "";
    inputNameImg.value = "";
   addSaveButton.addEventListener('click', function (){  //закрытие попапа
         popupNewImage.classList.remove('popup_opened');         
    });
    renderCard(data, cardList); 
});
