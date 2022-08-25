import {conf} from "./utils";
import {resetForm} from "./validate";

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown',keyHandler);
}

const clickHandler = (evt) => {
  if (evt.target.classList.contains('popup__close')||evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target.closest('.popup'));

  }
};

const keyHandler = evt => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector(".popup_opened"))
  }
};

export const setPopupListeners = () => {
  document.querySelectorAll('.popup').forEach( popup => {
  popup.addEventListener('mousedown', clickHandler);
});
}
