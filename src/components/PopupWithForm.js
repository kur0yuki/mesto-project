import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this._form = this._popup.querySelector('form');
    this._inputList = Array.from(this._popup.querySelectorAll('.form__item'))
    this._submitButton = this._form.querySelector('button')
    this._submitBtnText = this._submitButton.textContent
    this._callback = submitCallback
  }

  _getInputValues() {
    const values = {}
    this._inputList.forEach(item => {
      values[item.name]=item.value
    })
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', ()=>{
      const values = this._getInputValues()
      this._callback(values)
    })
  }


  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }


  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitBtnText;
    }
  }

  close() {
    super.close();
    this._form.reset()
  }
}
