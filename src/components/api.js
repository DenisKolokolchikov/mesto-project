const config = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-13",
    headers: {
        "Content-type": 'application/json',
        authorization: 'ce578aeb-a49b-4df4-9aa2-77f24f46d839'
    },
}

//отдельная функция для ответа ОК или не ОК
const onResponse = (res) => { 
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
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

//добавляем новую карточку
/* function addCard(cardName, cardLink) {
    return fetch(config.baseUrl, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ //обязательно в строку в data!
            name: cardName,
            link: cardLink
        }) 
    })
    .then(onResponse)
} */

//удаление карточки
export function removeCard(cardID) {
    return fetch(`${config.baseUrl}/cards/${cardID}`, {
        method: 'DELETE'
    })
    .then(onResponse)
}

