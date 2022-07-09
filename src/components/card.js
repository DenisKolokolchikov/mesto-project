import { handleClickImage } from "./modal";
import { getInitialCards, removeCard } from "./api";

/* const initialCards = [
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
]; */

const cardTemplate = document.querySelector('#card-template').content.querySelector('.elements__item');
export const cardList = document.querySelector('.elements__list');

//удаление карточки
const handleClickButtonDelete = function (evt) {
//удаление карточки внутри then, а не за ним, потому что сервер может ответить ошибкой, а элемент уже из DOM удален
removeCard(data._id).then(()=>{
    evt.target.closest('.elements__item').remove();
})
}

//подключаю лайк
const handleClickButtonLike = function (evt) {
    evt.target.classList.toggle('button__like-active');
}

//создаем функцию, которая добавляет карточку
const createCard = function (data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.elements__img');
    const cardName = cardElement.querySelector('.elements__title');
    const cardDelete = cardElement.querySelector('.button__del');
    const cardLike = cardElement.querySelector('.button__like');

    cardLike.addEventListener('click', handleClickButtonLike);
    cardDelete.addEventListener('click', handleClickButtonDelete);
    cardImage.addEventListener('click', () => handleClickImage(data));

    cardName.textContent = data.name;
    cardImage.src = data.link;
    cardImage.alt = data.name;

    return cardElement;
}

//рендерим карточки
export const renderCard = function (data, container) {
    const card = createCard(data);
    container.prepend(card);
}

getInitialCards()
    .then((initialCards)=>{
        initialCards.forEach(function (item) {
            renderCard(item, cardList);
        });
    })


