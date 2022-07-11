const config = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-13",
    headers: {
        "Content-type": 'application/json',
        authorization: 'ce578aeb-a49b-4df4-9aa2-77f24f46d839'
    },
}

//отдельная функция для ответа ОК или не ОК
const onResponse = (res) => { 
    return res.ok ? res.json() : Promise.reject('Сервер не доступен');
}
//отображаем карточки с сервера
export function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    })
    .then(onResponse)   /* второй аргумент возможно нужен, если promise вернул состояние rejected
                        catch используем в конце цепочки promise, иначе если выпадет исключение внутри .then, 
                        то код упадет, дальше выполняться не будет */ 
}

export function getAllUnfo() {
    return Promise.all([getInitialCards(), getInfoUser()])
}

//добавляем новую карточку
export function addNewCard(data) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(data) 
    })
    .then(onResponse)
} 

//удаление карточки
export function removeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(onResponse)
}

//редактирование инфо профиля
export function editInfoUser(name, job) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers, 
        body: JSON.stringify({
            name: name,
            about: job
        })
    })
    .then(onResponse)
} 

//загрузка информации о пользователе
export function getInfoUser() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(onResponse)
} 

//добавляем лайк
export function putLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
    });
  }

//удаляем лайк
export function deleteLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    });
  }

//обновдение аватара
export function patchAvatar(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
      avatar: avatar
      })
    });
  }
