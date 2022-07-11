import { handleClickImage } from "./modal";
import { getInitialCards, removeCard, changeLikeStatus } from "./api";

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

//подключаю лайк
/*  const handleClickButtonLike = function (evt) {
    evt.target.classList.toggle('button__like-active');
}  */
 
//удаление карточки
/* const handleClickButtonDelete = function (evt) {  
        evt.target.closest('.elements__item').remove();   
} */





    //определяем все лайки
    const isLiked = (likesArray, userId) => {
        return Boolean(likesArray.find((likeObj) => {
            return likeObj._id === userId
        }))
    }

    //подключаем лайк
export const handleChangeLikeStatus = (cardId, isLiked) => {
    changeLikeStatus(cardId, isLiked)
        .then(() => console.log('LIKE'))
} 

//создаем функцию, которая добавляет карточку
const createCard = function (data, userId, handleChangeLikeStatus) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.elements__img');
    const cardName = cardElement.querySelector('.elements__title');
    const cardDelete = cardElement.querySelector('.button__del');
    const cardLike = cardElement.querySelector('.button__like');
    const likeCounter = cardElement.querySelector('.photo__like-counter');

    //cardLike.addEventListener('click', handleClickButtonLike);
    cardLike.addEventListener('click', () => { handleChangeLikeStatus(data._id, isLiked(data.likes, userId))});

    cardDelete.addEventListener('click', (evt) => {             //было handleClickButtonDelete
    removeCard(data._id)
        .then(()=> {
        evt.target.closest('.elements__item').remove();
        })
        .catch((err)=> console.log(err))
    });
    
    cardImage.addEventListener('click', () => handleClickImage(data));

    cardName.textContent = data.name;
    cardImage.src = data.link;
    cardImage.alt = data.name;
    likeCounter.textContent = data.likes.length;

    return cardElement;
}

//рендерим карточки
export const renderCard = function (data, container) {
    const card = createCard(data, handleChangeLikeStatus);
    container.prepend(card);
}

//отображение всех карточек
getInitialCards()
    .then((initialCards)=>{
        initialCards.forEach(function (item) {
            renderCard(item, cardList);
        }); 
    })
.catch((err)=> console.log(err))

  

