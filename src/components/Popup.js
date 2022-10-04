export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector)
  }

  setEventListeners() {
    document.addEventListener('mousedown', (evt)=>{this._clickHandler(evt)})
    document.addEventListener('keydown', (evt)=>{this._keyHandler(evt)});
  }

  open() {
    this._popup.classList.add('popup_opened');

  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._keyHandler);
  }

  _clickHandler(evt){
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  };

  _keyHandler(evt){
    if (evt.key === 'Escape') {
      this.close()
    }
  }
}
