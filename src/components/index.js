import {initialCards} from './initialCards'
import '../pages/index.css'
import {closePopup, openPopup} from "./modal";
import renderCard from "./card";


const cardField = document.querySelector('.photo-grid');

const btnAddPlace = document.querySelector('.user-panel__add');
const btnEditUser = document.querySelector('.user-panel__edit-name');

const popupPlace = document.querySelector('.popup_type_place');
const popupCard = document.querySelector('.popup_type_card');
const popupUser = document.querySelector('.form[name="user"]').closest('.popup');

const name = document.querySelector('.user-panel__name');
const desc = document.querySelector('.user-panel__description');

const popupUserName = popupUser.querySelector('.form__item[name="name"]');
const popupUserDescription = popupUser.querySelector('.form__item[name="description"]');

const popupPlaceForm = popupPlace.querySelector('.form');
const popupPlaceTitle = popupPlaceForm.querySelector('.form__item[name="title"]');
const popupPlaceLink = popupPlaceForm.querySelector('.form__item[name="link"]');

const popupCardImage = popupCard.querySelector('.popup__image');
const popupCardCaption = popupCard.querySelector('.popup__image-caption');


btnEditUser.addEventListener('click', () => {
  popupUserName.value = name.textContent;
  popupUserDescription.value = desc.textContent;
  openPopup(popupUser);
});
btnAddPlace.addEventListener('click', () => {
  popupPlaceForm.reset();
  openPopup(popupPlace);
});


popupUser.querySelector('.form').addEventListener('submit', evt => {
  evt.preventDefault();

  name.textContent = popupUserName.value;
  desc.textContent = popupUserDescription.value;

  closePopup(popupUser);
});
popupPlaceForm.addEventListener('submit', evt => {
  evt.preventDefault();
  renderCard(popupPlaceTitle.value, popupPlaceLink.value);
  closePopup(popupPlace);
});

for (let i = 0; i < initialCards.length; i++) {
  renderCard(initialCards[i].name, initialCards[i].link);
}

cardField.addEventListener('click', evt => {
  if (evt.target.classList.contains('card__like')) {
    evt.target.classList.toggle('card__like_active')
  }
  if (evt.target.classList.contains('card__trash')) {
    evt.target.closest('.card').remove();
  }
  if (evt.target.classList.contains('card__image')) {
    popupCardImage.src = evt.target.src;
    popupCardImage.alt = evt.target.alt;
    popupCardCaption.textContent = evt.target.alt;
    openPopup(popupCard);
  }
});
document.addEventListener('click', evt => {
  if (evt.target.classList.contains('popup__close')) {
    closePopup(evt.target.closest('.popup'));
  }
});
