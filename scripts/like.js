function addLikeEvent(btn){
  btn.addEventListener('click', e=>{
    btn.classList.toggle('card__like_active')
  });
}
const likeBtns= document.querySelectorAll('.card__like');
likeBtns.forEach(addLikeEvent);
