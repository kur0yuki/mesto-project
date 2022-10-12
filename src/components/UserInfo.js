export default class UserInfo {
  constructor({nameSelector, infoSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }


  getUserInfo(){
    return {name: this._name.textContent, info: this._info.textContent, _id: this._id}
  }

  setUserInfo({name, about, avatar, _id}) {
    this._name.textContent = name;
    this._info.textContent = about
    this._id = _id
    this._avatar.src = avatar
  }
}
