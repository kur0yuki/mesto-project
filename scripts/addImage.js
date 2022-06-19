const addBtn = document.querySelector('.user-panel__add');
const popupPlace = document.querySelector('.form[name="new-place"]').closest('.popup');

popupPlace.querySelector('.form').addEventListener('submit', evt1 => {
    evt1.preventDefault();
    const cardTemplate = document.querySelector('#card').content;
    const cardField = document.querySelector('.photo-grid');

    const cardEl = cardTemplate.cloneNode(true);
    cardEl.querySelector('.card__title').textContent = evt1.target.closest('form').querySelector('.form__item[name="title"]').value;
    cardEl.querySelector('.card__image').src = evt1.target.closest('form').querySelector('.form__item[name="link"]').value;
    addLikeEvent(cardEl.querySelector('.card__like'));
    addDeleteEvent(cardEl.querySelector('.card__trash'));
    cardField.prepend(cardEl);

    evt1.target.closest('.popup').classList.remove('popup_opened');
  });
addBtn.addEventListener('click', () => {
  popupPlace.querySelectorAll('.form__item').forEach(item=>{item.value=""});
      popupPlace.classList.add('popup_opened');
});


popupPlace.querySelector('.popup__close').addEventListener('click', evt1 => {
    evt1.target.closest('.popup').classList.remove('popup_opened');
  });
