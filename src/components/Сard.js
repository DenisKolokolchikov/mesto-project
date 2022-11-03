export class Card {
    constructor(cardTemplate, setLike, remLike, { data, handleCardClick}, removeCard, {userId}) {
        this._handleCardClick = handleCardClick;
        this._cardTemplate = cardTemplate;
        this._removeCard = removeCard;
        this._userId = userId; 
        this._owner = data.owner._id;
        this._id = data._id;
        this._likesArray = data.likes;
        this._image = data.link;
        this._name = data.name;
        this._setLike = setLike;
        this._remLike = remLike;
        
    }

    // клонировать темлейт из html в DOM
    _getTemplate() {
        return document.querySelector(this._cardTemplate).content.cloneNode(true);   
    }

    //определить владельца карточки
    _cardOwner(_owner){    //если не владелец, корзинка удаления не отображается
        if(this._owner !== this._userId) {
            const cardDelete = this._element.querySelector('.button__del');
            cardDelete.remove(); 
        }
    }

    // сгенерировать карточку, т.е. наполнить темплейт содержимым
    generateCardElement() {
        this._element = this._getTemplate();
        this._setEventListener();
        const cardImage = this._element.querySelector('.elements__img');
        const cardName = this._element.querySelector('.elements__title');
        cardImage.src = this._image;
        cardImage.alt = this._name;
        cardName.textContent = this._name;
        this._cardOwner(this._owner);
        //сравниваем id текущего объекта с id пользователя. А метод find вернет объект, если объект пустой будет null
        if(this._likesArray.find(likeObj => likeObj._id === this._userId)) { 
            this._element.querySelector('.button__like').classList.toggle('button__like-active'); 
        }  
        return this._element
    }
    
    //удалить карточку
     _deleteCard(){
        this._removeCard();
    }
    
    _cardClickHandler(evt) {
        if(evt.target.classList.contains('button__del')) {
           this._deleteCard(); 
        }
    }

    //отображаем лайки
    _likeHandler(likeButton, likeCounter) {
        if (likeButton.classList.contains('button__like-active')) {
            likeButton.classList.remove('button__like-active');
            likeCounter.textContent = this._likesArray.length -= 1;
            this._remLike(this._id);
            return;
        }
        likeButton.classList.add('button__like-active');
        this._setLike(this._id);
        likeCounter.textContent = this._likesArray.length += 1;
    }

    //слушатели событий
    _setEventListener() {
        this._cardHandler = this._cardClickHandler.bind(this);
        this._element.addEventListener('click', this._cardHandler);

       //ставим лайк 
       const likeButton = this._element.querySelector('.button__like');
       const likeCounter = this._element.querySelector('.photo__like-counter');
       likeButton.addEventListener('click', () => this._likeHandler(likeButton, likeCounter));

        //открываем большую картинку
        this._element.querySelector('.elements__img').addEventListener('click', () => {
            this._handleCardClick();
        });

        //удаляем свою карточку
        if(this._owner == this._userId) {
            const cardDelete = this._element.querySelector('.button__del');
            cardDelete.addEventListener('click', () => this._deleteCard(cardDelete));
        } 
    }
}