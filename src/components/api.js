     

//ce578aeb-a49b-4df4-9aa2-77f24f46d839 старый токен когорта-13
export class Api {
    #onResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    }
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;
    }
    //отображаем карточки с сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        })
        .then(this.#onResponse)    
    }

    getAllUnfo() {
        return Promise.all([this.getInitialCards(), this.getInfoUser()])
    }

    
    //добавляем новую карточку
    addNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link,
            }) 
        })
        .then(this.#onResponse)
    } 

    //удаление карточки
    removeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this.#onResponse)
    }

    //редактирование инфо профиля
    editInfoUser(name, job) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers, 
            body: JSON.stringify({
                name: name,
                about: job
            })
        })
        .then(this.#onResponse)
    } 

}


