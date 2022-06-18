const addBtn = document.querySelector('.user-panel__add');
addBtn.addEventListener('click', () => {
  const popup = document.querySelector('.popup');
  const inputTemplate = document.querySelector('#input').content;
  const nameInput = inputTemplate.cloneNode(true);
  nameInput.querySelector('.form__item').name = 'title';
  nameInput.querySelector('.form__item').placeholder = 'Название';

  const descInput = inputTemplate.cloneNode(true);
  descInput.querySelector('.form__item').name = 'link';
  descInput.querySelector('.form__item').placeholder = "Ссылка на картинку";

  const inputContainer = document.createElement('fieldset');
  inputContainer.classList.add('form__input-container');
  inputContainer.append(nameInput, descInput);
  popup.querySelector('.form__input-container').replaceWith(inputContainer);
  popup.querySelector('.popup__title').textContent="Новое место";

  popup.classList.add('popup_opened');
  document.querySelector('.form__button').addEventListener('click', evt1 => {
    evt1.preventDefault();
    const cardTemplate = document.querySelector('#card').content;
    const cardField = document.querySelector('.photo-grid');

    const cardEl = cardTemplate.cloneNode(true);
    cardEl.querySelector('.card__title').textContent = evt1.target.closest('form').querySelector('.form__item[name="title"]').value;
    cardEl.querySelector('.card__image').src = evt1.target.closest('form').querySelector('.form__item[name="link"]').value;
    addLikeEvent(cardEl.querySelector('.card__like'));
    cardField.prepend(cardEl);

    evt1.target.closest('.popup').classList.remove('popup_opened');
  });

  document.querySelector('.popup__close').addEventListener('click', evt1 => {
    evt1.target.closest('.popup').classList.remove('popup_opened');
  })
});

