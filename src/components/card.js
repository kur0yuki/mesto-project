const cardField = document.querySelector('.photo-grid');

const cardTemplate = document.querySelector('#card').content;

function createCard(title, link) {
  const cardEl = cardTemplate.cloneNode(true);
  const cardImageEl = cardEl.querySelector('.card__image');
  cardEl.querySelector('.card__title').textContent = title;
  cardImageEl.alt = title;
  cardImageEl.src = link;
  return cardEl;
}

export default function renderCard(title, link) {
  cardField.prepend(createCard(title, link));
}
