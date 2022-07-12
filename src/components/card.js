import { handleClickImage } from "./modal";
import { getInitialCards, removeCard, changeLikeStatus } from "./api";

const cardTemplate = document.querySelector('#card-template').content.querySelector('.elements__item');
export const cardList = document.querySelector('.elements__list');

//определяем все лайки
const isLiked = (likesArray, userId) => {
    return Boolean(likesArray.find((likeObj) => {
        return likeObj._id === userId
    }))
}

//добваляем визуал лайка
const updateLikeButton = (cardElement, likesArray, userId) => {
    const cardLike = cardElement.querySelector('.button__like');
    const likeCounter = cardElement.querySelector('.photo__like-counter');
    likeCounter.textContent = likesArray.length;
    if(isLiked(likesArray, userId)) {
        cardLike.classList.add('button__like-active');
    } else {
        cardLike.classList.remove('button__like-active');
    }  
}

 //подключаем лайк
 const handleChangeLikesStatus = (cardElement, cardId, isLiked, userId) => {
    changeLikeStatus(cardId, isLiked)
        .then((dataFromServer) => {
            updateLikeButton(cardElement, cardId, dataFromServer.likes, userId)
        })   
        .catch((err)=> console.log(err))  
}

//создаем функцию, которая добавляет карточку
const createCard = function (data, userId) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.elements__img');
    const cardName = cardElement.querySelector('.elements__title');
    const cardDelete = cardElement.querySelector('.button__del');
    const cardLike = cardElement.querySelector('.button__like');

    cardName.textContent = data.name;
    cardImage.src = data.link;
    cardImage.alt = data.name;
   
    updateLikeButton(cardElement, data.likes, userId)

    if(data.owner._id !== userId) {
        cardDelete.remove();
    }

    cardLike.addEventListener('click', ()=> 
        handleChangeLikesStatus(cardElement, data._id, cardLike.classList.contains('button__like-active'))
    );

    cardDelete.addEventListener('click', (evt) => {             
        removeCard(data._id)
            .then(()=> {
            evt.target.closest('.elements__item').remove();
            })
            .catch((err)=> console.log(err))
        });

    cardImage.addEventListener('click', () => handleClickImage(data));
    return cardElement;
}

//рендерим карточки
export const renderCard = function (data, container) {
    const card = createCard(data, handleChangeLikesStatus);
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

  

