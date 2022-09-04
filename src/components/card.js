import {closePopup, openPopup} from "./modal";
import {addLike, checkStatus, removeCard, removeLike} from "./api";

const popupCard = document.querySelector('.popup_type_card');
const popupCardImage = popupCard.querySelector('.popup__image');
const popupCardCaption = popupCard.querySelector('.popup__image-caption');

const cardField = document.querySelector('.photo-grid');
const popupCheck = document.querySelector('.popup_type_check');
const confirmDeleteBtn  = popupCheck.querySelector('.form__button');

const cardTemplate = document.querySelector('#card').content;

let delHandler;

function createCard(title, link, _id, likes = 0, liked = false, own = true) {
  const cardEl = cardTemplate.cloneNode(true);
  const cardImageEl = cardEl.querySelector('.card__image');
  const cardLikeEl = cardEl.querySelector('.card__like')
  const cardTrash = cardEl.querySelector('.card__trash')
  const likeNum = cardEl.querySelector('.card__like-num')


  cardEl.querySelector('.card__title').textContent = title;
  cardImageEl.alt = title;
  cardImageEl.src = link;
  if (likes>0) {
    likeNum.textContent = likes;
  } else {
    likeNum.remove()
  }
  if (liked){
    cardLikeEl.classList.add('card__like_active')
  }

  cardLikeEl.addEventListener('click', (evt) => {
    if (liked) {
      removeLike(_id)
        .then(checkStatus)
        .then(() => {
          evt.target.classList.remove('card__like_active');
          likeNum.textContent =  `${parseInt(likeNum.textContent)-1}`;
        })
        .catch(console.log)
    } else {
      addLike(_id)
        .then(checkStatus)
        .then(()=> {
          evt.target.classList.add('card__like_active')
          likeNum.textContent =  `${parseInt(likeNum.textContent)+1}`;
        })
        .catch(console.log)
    }
  });

  if (own) {
    cardTrash.addEventListener('click', ()=> {
      if (delHandler) {
        confirmDeleteBtn.removeEventListener('click', delHandler)
      }
      delHandler=clickDeleteHandler(_id, cardImageEl);
      confirmDeleteBtn.addEventListener('click', delHandler)
      openPopup(popupCheck);
    })
  } else {
    cardTrash.remove()
  }

  cardImageEl.addEventListener('click', (evt) => {
    popupCardImage.src = evt.target.src;
    popupCardImage.alt = evt.target.alt;
    popupCardCaption.textContent = evt.target.alt;
    openPopup(popupCard);
  });

  return cardEl;
}


export const renderCardObj = (card, _id) => {
  const own = card.owner._id === _id
  const liked = card.likes.map(user => user._id).includes(_id)
  cardField.prepend(createCard(card.name, card.link, card._id, card.likes.length, liked, own));
}

const clickDeleteHandler = (_id, card) => {
  return evt => {
    removeCard(_id)
      .then(checkStatus)
      .then(data => {
        card.closest('.card').remove();
      })
      .catch(console.log)
      .finally(()=>{
        closePopup(popupCheck)
      })
  }
}
