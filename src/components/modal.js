export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('click', clickHandler)
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('click', clickHandler)

}

const clickHandler = (evt) => {
  if (evt.target.classList.contains('popup__close')) {
    closePopup(evt.target.closest('.popup'));
    evt.stopPropagation();
  } else if (evt.target.classList.contains('popup__container')) {
    evt.stopPropagation();
  } else if (evt.target.classList.contains('popup_opened')){
    closePopup(evt.currentTarget.querySelector('.popup_opened'));
  }
}

export const setFormListeners = (form) => {

}
