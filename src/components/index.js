import '../pages/index.css'
import {closePopup, openPopup, setPopupListeners} from "./modal";
import {renderCardObj} from "./card";
import {enableValidation, resetForm} from "./validate";
import {conf} from "./utils";
import {addCard, checkStatus, getCards, getUserInfo, setUserInfo, updateAvatar} from "./api";

const btnAddPlace = document.querySelector('.user-panel__add');
const btnEditUser = document.querySelector('.user-panel__edit-name');

const popupPlace = document.querySelector('.popup_type_place');
const popupUser = document.querySelector('.popup_type_profile');
const popupAvatar = document.querySelector('.popup_type_avatar');

const popupUserBtn = popupUser.querySelector('.form__button')
const popupPlaceBtn = popupPlace.querySelector('.form__button');
const popupAvatarBtn = popupAvatar.querySelector('.form__button');

const name = document.querySelector('.user-panel__name');
const desc = document.querySelector('.user-panel__description');
const avatarContainer = document.querySelector('.user-panel__avatar-container');
const avatar = document.querySelector('.user-panel__avatar');

const popupUserForm = popupUser.querySelector('.form');
const popupUserName = popupUser.querySelector('.form__item[name="name"]');
const popupUserDescription = popupUser.querySelector('.form__item[name="description"]');

const popupPlaceForm = popupPlace.querySelector('.form');
const popupPlaceTitle = popupPlaceForm.querySelector('.form__item[name="title"]');
const popupPlaceLink = popupPlaceForm.querySelector('.form__item[name="link"]');

let _id;

btnEditUser.addEventListener('click', (evt) => {
  popupUserName.value = name.textContent;
  popupUserDescription.value = desc.textContent;
  resetForm(popupUserForm, conf);
  openPopup(popupUser);
});
btnAddPlace.addEventListener('click', (evt) => {
  popupPlaceForm.reset();
  resetForm(popupPlaceForm, conf);
  openPopup(popupPlace);
});
avatarContainer.addEventListener('click', evt => {
  document.forms.avatar.reset();
  resetForm(document.forms.avatar, conf);
  openPopup(popupAvatar);
});

popupUser.querySelector('.form').addEventListener('submit', evt => {
  popupUserBtn.textContent = "Сохранение..."
  setUserInfo(popupUserName.value, popupUserDescription.value)
    .then(checkStatus)
    .then(data => {
      name.textContent = data.name;
      desc.textContent = data.about;
    })
    .catch(console.log)
    .finally(()=>{
      closePopup(popupUser);
      popupUserBtn.textContent = "Сохранить"
    });

});
popupPlaceForm.addEventListener('submit', evt => {
  popupPlaceBtn.textContent = "Сохранение..."
  addCard(popupPlaceTitle.value, popupPlaceLink.value)
    .then(checkStatus)
    .then(card => renderCardObj(card, _id))
    .catch(console.log)
    .finally(()=>{
      closePopup(popupPlace);
      popupPlaceBtn.textContent = "Создать"
    });
});
document.forms.avatar.addEventListener('submit', evt => {
  popupAvatarBtn.textContent = "Сохранение..."
  updateAvatar(evt.target.elements.link.value)
    .then(checkStatus)
    .then(data => {
      avatar.src = data.avatar;
    })
    .catch(console.log)
    .finally(()=>{
      closePopup(popupAvatar)
      popupAvatarBtn.textContent = "Сохранить"
    })
})

setPopupListeners();
enableValidation(conf);

getUserInfo().then(checkStatus)
  .then(data => {
    name.textContent = data.name;
    desc.textContent = data.about;
    avatar.src = data.avatar;
    _id = data._id;
  })
  .catch(status => {
    console.log(status)
  });

getCards().then(checkStatus)
  .then(data => {
    data.forEach(card => renderCardObj(card, _id));
  })
  .catch(console.log);
