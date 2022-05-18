let openPopup = document.querySelector(".profile__edit-button");
let closePopup = document.querySelector(".popup__close-button");
let popup = document.querySelector(".popup");
let popuoOpened = document.querySelector(".popup_opened");
let profileInfo = document.querySelector(".profile__info");

openPopup.addEventListener("click", function() {
    popup.classList.add("popup_opened");

});

closePopup.addEventListener("click", function() {
    popup.classList.remove("popup_opened");
});