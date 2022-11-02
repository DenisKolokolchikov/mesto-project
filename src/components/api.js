     

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


}


