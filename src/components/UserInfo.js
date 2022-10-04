export default class UserInfo {
  constructor({nameSelector, infoSelector}, infoCall) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this.updateInfo = infoCall
    //this.updateInfo()
  }


  getUserInfo(){
    return {name: this._name.textContent, info: this._info.textContent, _id: this._id}
  }

  setUserInfo({name, about, _id}) {
    this._name.textContent = name;
    this._info.textContent = about
    this._id = _id
  }
}
