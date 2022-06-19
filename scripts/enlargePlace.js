const popupImage=document.querySelector('.popup_type_dark');
popupImage.querySelector('.popup__close').addEventListener('click', evt1 => {
    evt1.target.closest('.popup').classList.remove('popup_opened');
  });

function addEnlargeEvent(image) {
  image.addEventListener('click', evt=>{
    const card = evt.target.closest('.card');

    popupImage.querySelector('.popup__image').src=image.src;
    popupImage.querySelector('.popup__image-caption').textContent=card.querySelector('.card__title').textContent;
    popupImage.classList.add('popup_opened');
  });
}

const images=document.querySelectorAll('.card__image');
images.forEach(addEnlargeEvent);
