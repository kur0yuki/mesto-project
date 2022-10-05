export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector)
    this._handleEscClose = this._handleEscape.bind(this)
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt)=>{this._handlePopupClose(evt)})
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handlePopupClose(evt){
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  };

  _handleEscape(evt){
    if (evt.key === 'Escape') {
      this.close()
    }
  }
}
