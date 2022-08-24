import {conf} from "./utils";
import {resetForm} from "./validate";

let handler;

export function openPopup(popup) {
  const form = popup.querySelector(conf.formSelector);
  if (form) {
    resetForm(form);
  }
  popup.classList.add('popup_opened');
  document.addEventListener('click', clickHandler);
  handler = keyHandler(popup);
  document.addEventListener('keydown', handler);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('click', clickHandler);
  document.removeEventListener('keydown', handler);
}

const clickHandler = (evt) => {
  if (evt.target.classList.contains('popup__close')) {
    closePopup(evt.target.closest('.popup'));
    evt.stopPropagation();
  } else if (evt.target.classList.contains('popup__container')) {
    evt.stopPropagation();
  } else if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.currentTarget.querySelector('.popup_opened'));
  }
};

const keyHandler = popup => {
  return function (evt) {
    if (evt.code === 'Escape') {
      closePopup(popup)
    }
  }
};
