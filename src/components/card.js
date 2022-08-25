import {openPopup} from "./modal";

const popupCard = document.querySelector('.popup_type_card');
const popupCardImage = popupCard.querySelector('.popup__image');
const popupCardCaption = popupCard.querySelector('.popup__image-caption');

const cardField = document.querySelector('.photo-grid');

const cardTemplate = document.querySelector('#card').content;

function createCard(title, link) {
  const cardEl = cardTemplate.cloneNode(true);
  const cardImageEl = cardEl.querySelector('.card__image');

  cardEl.querySelector('.card__title').textContent = title;
  cardImageEl.alt = title;
  cardImageEl.src = link;

  cardEl.querySelector('.card__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active')
  });

  cardEl.querySelector('.card__trash').addEventListener('click', (evt) => {
    evt.target.closest('.card').remove();
  });

  cardImageEl.addEventListener('click', (evt) => {
    popupCardImage.src = evt.target.src;
    popupCardImage.alt = evt.target.alt;
    popupCardCaption.textContent = evt.target.alt;
    openPopup(popupCard);
  });

  return cardEl;
}

export function renderCard(title, link) {
  cardField.prepend(createCard(title, link));
}

export const renderCardArray = (initialCards) => {
  for (let i = 0; i < initialCards.length; i++) {
    renderCard(initialCards[i].name, initialCards[i].link);
  }
};
