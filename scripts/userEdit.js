const editUserBtn = document.querySelector('.user-panel__edit-name');
const popupUser = document.querySelector('.form[name="user"]').closest('.popup');

editUserBtn.addEventListener('click', () => {
  const name = document.querySelector('.user-panel__name').textContent;
  const desc = document.querySelector('.user-panel__description').textContent;

  popupUser.querySelector('.form__item[name="name"]').value = name;
  popupUser.querySelector('.form__item[name="description"]').value = desc;


  popupUser.classList.add('popup_opened');


});


popupUser.querySelector('.form').addEventListener('submit', evt1 => {
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

popupUser.querySelector('.popup__close').addEventListener('click', evt1 => {
    evt1.target.closest('.popup').classList.remove('popup_opened');
  });
