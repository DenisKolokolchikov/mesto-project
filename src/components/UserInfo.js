export class UserInfo {
    constructor(info) {
      this._name = info.profileName;
      this._about = info.profileDescription;
      this._avatar = info.profileAvatar;
      this.userAvatar = document.querySelector('.profile__avatar');
    }
  
    getInfoUser() {
      const userInfo = {
        name: this._name.textContent,
        about: this._about.textContent,
        avatar: this._avatar.textContent,
      };
      return userInfo;
    }
  
    makeUserAvatar(data) {
      this._avatar.src = data.avatar;
    }
  
    setUserInfo(data) {
      this._name.textContent = data.name;
      this._about.textContent = data.about;
      this._avatar.src = data.avatar;
      this.userAvatar.src = data.avatar;
    }
  }