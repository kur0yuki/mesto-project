import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector){
    super(selector);
  }
  open(image, caption){
    this._popup.querySelector('.popup__image').src = image
    this._popup.querySelector('.popup__image-caption').textContent = caption
    super.open()
  }
}
