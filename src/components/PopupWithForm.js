import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this._form = this._popup.querySelector('form');
    this._callback = submitCallback
  }

  _getInputValues() {
    const values = {}
    Array.from(this._popup.querySelectorAll('.form__item')).forEach(item => {
      values[item.name]=item.value
    })
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', ()=>{
      const values = this._getInputValues()
      console.log(values)
      this._callback(values)
    })
  }

  setFormButtonText(value){
    this._form.querySelector('button').textContent = value
  }

  close() {
    super.close();
    this._form.reset()
  }
}
