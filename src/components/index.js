import {initialCards} from './initialCards'
import '../pages/index.css'
import {closePopup, openPopup, setPopupListeners} from "./modal";
import {renderCard, renderCardArray} from "./card";
import {enableValidation, resetForm} from "./validate";
import {conf} from "./utils";

const btnAddPlace = document.querySelector('.user-panel__add');
const btnEditUser = document.querySelector('.user-panel__edit-name');

const popupPlace = document.querySelector('.popup_type_place');
const popupUser = document.querySelector('.popup_type_profile');

const name = document.querySelector('.user-panel__name');
const desc = document.querySelector('.user-panel__description');

const popupUserForm = popupUser.querySelector('.form');
const popupUserName = popupUser.querySelector('.form__item[name="name"]');
const popupUserDescription = popupUser.querySelector('.form__item[name="description"]');

const popupPlaceForm = popupPlace.querySelector('.form');
const popupPlaceTitle = popupPlaceForm.querySelector('.form__item[name="title"]');
const popupPlaceLink = popupPlaceForm.querySelector('.form__item[name="link"]');



btnEditUser.addEventListener('click', (evt) => {
  popupUserName.value = name.textContent;
  popupUserDescription.value = desc.textContent;
  resetForm(popupUserForm, conf);
  openPopup(popupUser);
});
btnAddPlace.addEventListener('click', (evt) => {
  popupPlaceForm.reset();
  resetForm(popupPlaceForm, conf)
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
setPopupListeners();
enableValidation(conf);

