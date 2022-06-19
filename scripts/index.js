const cardTemplate = document.querySelector('#card').content;
const cardField = document.querySelector('.photo-grid');

const btnAddPlace = document.querySelector('.user-panel__add');
const btnEditUser = document.querySelector('.user-panel__edit-name');

const popupPlace = document.querySelector('.popup_type_place');
const popupCard=document.querySelector('.popup_type_card');
const popupUser = document.querySelector('.form[name="user"]').closest('.popup');

const name = document.querySelector('.user-panel__name');
const desc = document.querySelector('.user-panel__description');

const popupUserName = popupUser.querySelector('.form__item[name="name"]');
const popupUserDescription = popupUser.querySelector('.form__item[name="description"]');

const popupPlaceTitle = popupPlace.querySelector('.form__item[name="title"]');
const popupPlaceLink = popupPlace.querySelector('.form__item[name="link"]');

const popupCardImage=popupCard.querySelector('.popup__image');
const popupCardCaption =popupCard.querySelector('.popup__image-caption');

function renderCard(title, link){
  const cardEl = cardTemplate.cloneNode(true);
  cardEl.querySelector('.card__title').textContent = title;
  cardEl.querySelector('.card__image').alt = title;
  cardEl.querySelector('.card__image').src = link;
  cardEl.querySelector('.card__trash').addEventListener('click', evt=>{
    const card = evt.target.closest('.card').remove();
  });
  cardEl.querySelector('.card__image').addEventListener('click', evt=>{
    const card = evt.target.closest('.card');

    popupCardImage.src=card.querySelector('.card__image').src;
    popupCardImage.alt=card.querySelector('.card__title').textContent;
    popupCardCaption.textContent = popupCardImage.alt;
    openPopup(popupCard);
  });
  cardEl.querySelector('.card__like').addEventListener('click', evt =>{evt.target.classList.toggle('card__like_active')});

  cardField.prepend(cardEl);
}
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

popupCard.querySelector('.popup__close').addEventListener('click', () => closePopup(popupCard));
popupPlace.querySelector('.popup__close').addEventListener('click', () => closePopup(popupPlace));
popupUser.querySelector('.popup__close').addEventListener('click', () => closePopup(popupUser));

btnEditUser.addEventListener('click', ()=>{
  popupUserName.value = name.textContent;
  popupUserDescription.value = desc.textContent;
  openPopup(popupUser);
});
btnAddPlace.addEventListener('click', ()=>{
  popupPlaceTitle.value="";
  popupPlaceLink.value="";
  openPopup(popupPlace);
});


popupUser.querySelector('.form').addEventListener('submit', evt => {
    evt.preventDefault();

    name.textContent = popupUserName.value;
    desc.textContent = popupUserDescription.value;

    closePopup(popupUser);
  });
popupPlace.querySelector('.form').addEventListener('submit', evt=>{
  evt.preventDefault();
  renderCard(popupPlaceTitle.value, popupPlaceLink.value);
  closePopup(popupPlace);
});

for (let i = 0; i < initialCards.length; i++) {
  renderCard(initialCards[i].name,initialCards[i].link);
}
