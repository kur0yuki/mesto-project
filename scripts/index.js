const cardTemplate = document.querySelector('#card').content;
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

function createCard(title, link) {
  const cardEl = cardTemplate.cloneNode(true);
  const cardImageEl = cardEl.querySelector('.card__image');
  cardEl.querySelector('.card__title').textContent = title;
  cardImageEl.alt = title;
  cardImageEl.src = link;
  return cardEl;
}

function renderCard(title, link) {
  cardField.prepend(createCard(title, link));
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
/*
popupCard.querySelector('.popup__close').addEventListener('click', () => closePopup(popupCard));
popupPlace.querySelector('.popup__close').addEventListener('click', () => closePopup(popupPlace));
popupUser.querySelector('.popup__close').addEventListener('click', () => closePopup(popupUser));
*/
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

cardField.addEventListener('click', evt=>{
  if (evt.target.classList.contains('card__like')){
    evt.target.classList.toggle('card__like_active')
  }
  if (evt.target.classList.contains('card__trash')){
    evt.target.closest('.card').remove();
  }
  if (evt.target.classList.contains('card__image')){
    popupCardImage.src = evt.target.src;
    popupCardImage.alt = evt.target.alt;
    popupCardCaption.textContent = evt.target.alt;
    openPopup(popupCard);
  }
})
document.addEventListener('click', evt => {
  if (evt.target.classList.contains('popup__close')){
    closePopup(evt.target.closest('.popup'));
  }
})
