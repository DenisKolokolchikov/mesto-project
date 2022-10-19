export class UserInfo {
    constuctor({nameElSelector, jobElSelector, avatarElSelector}) {
        this._name = document.querySelector(nameElSelector);
        this._about = document.querySelector(jobElSelector);
        this._avatar = document.querySelector(avatarElSelector);
    }

    getInfoUser() {
        return {
            name: this._name.textContent,
            about: this._about.textContent,
            avatar: this._avatar.src 
        }
        
    }

    setUserInfo(user) {
        this._name.textContent = user.name,
        this._about.textContent = user.about,
        this._avatar.src = user.avatar
    }
}