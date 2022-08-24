import {initialCards} from './initialCards'
import '../pages/index.css'
import {closePopup, openPopup} from "./modal";
import {renderCard, renderCardArray, setCardListeners} from "./card";
import {enableValidation} from "./validate";


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

btnEditUser.addEventListener('click', (evt) => {
  popupUserName.value = name.textContent;
  popupUserDescription.value = desc.textContent;
  openPopup(popupUser);
});
btnAddPlace.addEventListener('click', (evt) => {
  popupPlaceForm.reset();
  openPopup(popupPlace);
});


popupUser.querySelector('.form').addEventListener('submit', evt => {
  name.textContent = popupUserName.value;
  desc.textContent = popupUserDescription.value;
  closePopup(popupUser);
});
popupPlaceForm.addEventListener('submit', evt => {
  renderCard(popupPlaceTitle.value, popupPlaceLink.value);
  closePopup(popupPlace);
});

renderCardArray(initialCards);
setCardListeners(cardField);

enableValidation();

