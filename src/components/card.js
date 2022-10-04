export default class Card {
  constructor({
                likes,
                name, link,
                _id, owner
              },
              elementSelector,
              {
                addLike,
                removeLike,
                removeCard,
                openCard
              },
              own_id) {
    this._title = name;
    this._link = link;
    this._selector = elementSelector;
    this._likes = likes;
    this._id = _id;
    this._own = owner._id === own_id;
    this._handleAddLike = addLike;
    this._handleRemoveLike = removeLike;
    this._handleRemoveCard = removeCard;
    this._handleOpenCard = openCard;
    this._isLiked = this._liked()
    this._myId = own_id
    //console.log(this._myId)
  }

  _getElement() {
    return document.querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true)
  }

  _setEventListeners() {
    this._imageEL.addEventListener('click', () => {
      this._handleOpenCard()
    });

    this._likesEL.addEventListener('click', () => {
      if (this._isLiked) {
        this._handleRemoveLike(this._id)
      } else {
        this._handleAddLike(this._id)
      }
      this._setLikes()
    });

    if (this._cardTrash) {
      this._cardTrash.addEventListener('click', () => {
          this._handleRemoveCard(this._id, this._element)
        }
      )
    }

  }

  _fillLayout() {
    this._element.querySelector('.card__title').textContent = this._title;
    this._imageEL = this._element.querySelector('.card__image');
    this._imageEL.src = this._link;
    this._imageEL.alt = this._title;

    this._likesEL = this._element.querySelector('.card__like');
    this._likesNum = this._element.querySelector('.card__like-num');
    this._setLikes();

    this._cardTrash = this._element.querySelector('.card__trash');
    if (!this._own) {
      this._cardTrash.remove();
      delete this._cardTrash
    }
  }

  _setLikes() {
    if (this._likes.length > 0) {
      if (!this._element.querySelector('.card__like-num')) {
        this._likesEL.insertAdjacentElement('afterend', this._likesNum)
      }
      this._likesNum.textContent = this._likes.length;

    } else {
      this._likesNum.remove()
    }
    this._isLiked = this._liked();
    if (this._isLiked) {
      this._likesEL.classList.add('card__like_active')
    } else {
      this._likesEL.classList.remove('card__like_active')
    }
  };
  setLikes(likes){
    this._likes=likes
    this._setLikes()
  }

  _liked() {
    return this._likes.some(like => like._id === this._myId)
  }

  generate() {
    this._element = this._getElement();
    this._fillLayout();

    this._setEventListeners();

    return this._element
  }

}
