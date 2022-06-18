const editUserBtn = document.querySelector('.user-panel__edit-name');

editUserBtn.addEventListener('click', () => {
  const popup = document.querySelector('.popup');
  const name = document.querySelector('.user-panel__name').textContent;
  const desc = document.querySelector('.user-panel__description').textContent;
  const inputTemplate = document.querySelector('#input').content;
  const nameInput = inputTemplate.cloneNode(true);
  nameInput.querySelector('.form__item').name = 'name';
  nameInput.querySelector('.form__item').placeholder = 'Имя';
  nameInput.querySelector('.form__item').value = name;

  const descInput = inputTemplate.cloneNode(true);
  descInput.querySelector('.form__item').name = 'description';
  descInput.querySelector('.form__item').placeholder = "Описание";
  descInput.querySelector('.form__item').value = desc;
  const inputContainer = document.createElement('fieldset');
  inputContainer.classList.add('form__input-container');
  inputContainer.append(nameInput, descInput);
  popup.querySelector('.form__input-container').replaceWith(inputContainer);

  popup.classList.add('popup_opened');
  document.querySelector('.form__button').addEventListener('click', evt1 => {
    evt1.preventDefault();
    const nameEl = document.createElement('h1');
    nameEl.classList.add('user-panel__name');
    nameEl.textContent = evt1.target.closest('form').querySelector('.form__item[name="name"]').value;
    const descEl = document.createElement('p');
    descEl.classList.add('user-panel__description');
    descEl.textContent = evt1.target.closest('form').querySelector('.form__item[name="description"]').value;

    document.querySelector('.user-panel__name').replaceWith(nameEl);
    document.querySelector('.user-panel__description').replaceWith(descEl);
    evt1.target.closest('.popup').classList.remove('popup_opened');
  });

  document.querySelector('.popup__close').addEventListener('click', evt1 => {
    evt1.target.closest('.popup').classList.remove('popup_opened');
  })
});


