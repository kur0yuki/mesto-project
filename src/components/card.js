import {closePopup, openPopup} from "./modal";
import {addLike, removeCard, removeLike} from "./api";

const popupCard = document.querySelector('.popup_type_card');
const popupCardImage = popupCard.querySelector('.popup__image');
const popupCardCaption = popupCard.querySelector('.popup__image-caption');

const cardField = document.querySelector('.photo-grid');
const popupCheck = document.querySelector('.popup_type_check');
const confirmDeleteBtn = popupCheck.querySelector('.form__button');

const cardTemplate = document.querySelector('#card').content;

let delHandler;
confirmDeleteBtn.addEventListener('click', delHandler);

function createCard(title, link, _id, likes, own, userId) {
  const cardEl = cardTemplate.cloneNode(true);
  const cardImageEl = cardEl.querySelector('.card__image');
  const cardLikeEl = cardEl.querySelector('.card__like');
  const cardTrash = cardEl.querySelector('.card__trash');
  const likeNum = cardEl.querySelector('.card__like-num');

  const setLikes = (likes) => {
    if (likes.length > 0) {
      if (!cardEl.querySelector('.card__like-num')){
        cardLikeEl.insertAdjacentElement('afterend', likeNum)
      }
      likeNum.textContent = likes.length;

    } else {
      likeNum.remove()
    }
    if (likes.some(like => like._id===userId)){
      cardLikeEl.classList.add('card__like_active')
    } else {
      cardLikeEl.classList.remove('card__like_active')
    }
  };

  cardEl.querySelector('.card__title').textContent = title;
  cardImageEl.alt = title;
  cardImageEl.src = link;
  setLikes(likes);
  /*if (likes.length > 0) {
    likeNum.textContent = likes;
  } else {
    likeNum.remove()
  }
  if (liked) {
    cardLikeEl.classList.add('card__like_active')
  }
*/
  cardLikeEl.addEventListener('click', (evt) => {
    if (Array.from(cardLikeEl.classList).includes('card__like_active')) {
      removeLike(_id)
        .then((data) => {
          setLikes(data.likes)
        })
        .catch(console.log)
    } else {
      addLike(_id)
        .then((data) => {
          setLikes(data.likes)
        })
        .catch(console.log)
    }
  });

  if (own) {
    cardTrash.addEventListener('click', () => {
      delHandler = clickDeleteHandler(_id, cardImageEl);
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
  const own = card.owner._id === _id;
  const liked = card.likes.map(user => user._id).includes(_id);
  cardField.prepend(createCard(card.name, card.link, card._id, card.likes, own, _id));
};

const clickDeleteHandler = (_id, card) => {
  return evt => {
    removeCard(_id)
      .then(data => {
        card.closest('.card').remove();
        closePopup(popupCheck)
      })
      .catch(console.log)
  }
};
