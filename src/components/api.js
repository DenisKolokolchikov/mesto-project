const config = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
    headers: {
        "Content-type": 'application/json',
        authorization: '2b8d2e32-f428-4578-8dc4-d80d04887d6e'
    },
}             

//ce578aeb-a49b-4df4-9aa2-77f24f46d839 старый токен когорта-13


export class Api {
    //отдельная функция для ответа ОК или не ОК
    #onResponse = (res) => { 
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    }
    
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    //отображаем карточки с сервера
    _getInitialCards() {
        return fetch(`${this.url}/cards`, {
            headers: this.headers,
        })
        .then(this.#onResponse)
    }

    _getAllUnfo() {
        return Promise.all([getInitialCards(), getInfoUser()])
    }

    //добавляем новую карточку
    _addNewCard(data) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data) 
        })
        .then(this.#onResponse)
} 

    //удаление карточки
    _removeCard(cardId) {
        return fetch(`${this.url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(this.#onResponse)
    }
    //редактирование инфо профиля
    _editInfoUser(name, job) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this.headers, 
            body: JSON.stringify({
                name: name,
                about: job
            })
        })
        .then(this.#onResponse)
    } 

    //загрузка информации о пользователе
    _getInfoUser() {
        return fetch(`${this.url}/users/me`, {
            headers: this.headers
        })
        .then(this.#onResponse)
    } 

    //обновдение аватара
    _patchAvatar(avatar) {
        return fetch(`${this.url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
        avatar: avatar
        })
        })
        .then(this.#onResponse)
    }

    //Добавляем и удаляем лайк
    _changeLikeStatus(cardId, isLike) {
        return fetch(`${this.url}/cards/likes/${cardId}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: this.headers
        })
        .then(this.#onResponse)
    }
}

//отдельная функция для ответа ОК или не ОК
/* export const onResponse = (res) => { 
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
} */

// //отображаем карточки с сервера
// export function getInitialCards() {
//     return fetch(`${this.url}/cards`, {
//         headers: this.headers,
//     })
//     .then(onResponse)    
// }

// export function getAllUnfo() {
//     return Promise.all([getInitialCards(), getInfoUser()])
// }

// //добавляем новую карточку
// export function addNewCard(data) {
//     return fetch(`${this.url}/cards`, {
//         method: 'POST',
//         headers: this.headers,
//         body: JSON.stringify(data) 
//     })
//     .then(onResponse)
// } 

// //удаление карточки
// export function removeCard(cardId) {
//     return fetch(`${this.url}/cards/${cardId}`, {
//         method: 'DELETE',
//         headers: this.headers
//     })
//     .then(onResponse)
// }

// //редактирование инфо профиля
// export function editInfoUser(name, job) {
//     return fetch(`${this.url}/users/me`, {
//         method: 'PATCH',
//         headers: this.headers, 
//         body: JSON.stringify({
//             name: name,
//             about: job
//         })
//     })
//     .then(onResponse)
// } 

// //загрузка информации о пользователе
// export function getInfoUser() {
//     return fetch(`${this.url}/users/me`, {
//         headers: this.headers
//     })
//     .then(onResponse)
// } 

// //обновдение аватара
// export function patchAvatar(avatar) {
//     return fetch(`${this.url}/users/me/avatar`, {
//       method: 'PATCH',
//       headers: this.headers,
//       body: JSON.stringify({
//       avatar: avatar
//       })
//     })
//     .then(onResponse)
//   }

// //Добавляем и удаляем лайк
// export function changeLikeStatus(cardId, isLike) {
//     return fetch(`${this.url}/cards/likes/${cardId}`, {
//         method: isLike ? "DELETE" : "PUT",
//         headers: this.headers
//     })
//     .then(onResponse)
// }