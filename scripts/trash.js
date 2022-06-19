function addDeleteEvent(btn){
  btn.addEventListener('click', (evt)=>{
    const card = evt.target.closest('.card').remove();
  });
}
const trashBtns= document.querySelectorAll('.card__trash');
trashBtns.forEach(addDeleteEvent);
