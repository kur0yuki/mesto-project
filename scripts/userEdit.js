const editUserBtn = document.querySelector('.user-panel__edit-name');

editUserBtn.addEventListener('click', () => {
  const body = document.querySelector('.page');
  const name = document.querySelector('.user-panel__name').textContent;
  const desc = document.querySelector('.user-panel__description').textContent;
  body.insertAdjacentHTML("beforeEnd", `
  <div class="popup popup_opened">
  <div class="popup__container">
    <h2 class="popup__title">Редактировать профиль</h2>
    <button class="popup__close button" aria-label="закрыть"></button>
  <form class="form" name="user">
    <fieldset class="form__input-container">
      <input class="form-item" name="name" placeholder="Имя" type="text" value="${name}">
      <input class="form-item" name="description" placeholder="Описание" type="text" value="${desc}">
    </fieldset>
    <button class="form__button button" type="submit">Сохранить</button>
  </form>
    </div>
</div>
  `);
  document.querySelector('.form__button').addEventListener('click', evt1 => {
    evt1.preventDefault();
    const nameEl = document.createElement('h1');
    nameEl.classList.add('user-panel__name');
    nameEl.textContent = evt1.target.closest('form').querySelector('.form-item[name="name"]').value;
    const descEl = document.createElement('p');
    descEl.classList.add('user-panel__description');
    descEl.textContent = evt1.target.closest('form').querySelector('.form-item[name="description"]').value;

    document.querySelector('.user-panel__name').replaceWith(nameEl);
    document.querySelector('.user-panel__description').replaceWith(descEl);
    evt1.target.closest('.popup').remove();
  });

  document.querySelector('.popup__close').addEventListener('click', evt1 => {
    evt1.target.closest('.popup').remove();
  })
});


