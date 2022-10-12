import Popup from "./Popup";

export default class ConfirmationPopup extends Popup{
  constructor(selector, handleSubmit = ()=>{}){
    super(selector);
    this._submitBtn = this._popup.querySelector('button[type=submit]')
    this._handleSubmit = handleSubmit
  }

  changeEventListener(handler){
    this._submitBtn.removeEventListener('click', this._handleSubmit)
    this._handleSubmit = handler
    this._submitBtn.addEventListener('click', this._handleSubmit)
  }

  setEventListeners() {
    super.setEventListeners();
    console.log(this._submitBtn)
    this._submitBtn.addEventListener('click', this._handleSubmit)
  }
}
