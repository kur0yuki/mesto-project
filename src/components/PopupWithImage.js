import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector){
    super(selector);
    this._image = this._popup.querySelector('.popup__image')
    this._caption = this._popup.querySelector('.popup__image-caption')
  }
  open(image, caption){
    this._image.src = image
    this._caption.textContent = caption
    this._image.alt = caption
    super.open()
  }
}
