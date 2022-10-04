import './index.css'

import {conf} from "../utils/utils";
import {
  config,
  btnEditUser,
  btnAddPlace,
  avatarContainer,
  avatar,
  deleteBtn
} from '../utils/constants'
import Api from "../components/api";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import FormValidator from "../components/FormValidator";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Popup from "../components/Popup";
import Card from "../components/card";

const cardCreator = function(id, cardFunctions){
  return function(data) {
    return new Card(data, '#card', cardFunctions, id);
  }
}



let section;
let deleteHandler;

const api = new Api(config);

const imagePopup = new PopupWithImage('.popup_type_card')
imagePopup.setEventListeners()

const deletePopup = new Popup('.popup_type_check')
deletePopup.setEventListeners()
deleteBtn.addEventListener('click', ()=>{deleteHandler()})

const cardFunctions = {
  addLike: function(id){
    api.addLike(id)
      .then(({likes})=> {this.setLikes(likes)})
      .catch(console.log)
  },
  removeLike: function(id){
    api.removeLike(id)
      .then(({likes})=> {this.setLikes(likes)})
      .catch(console.log)
  },
  removeCard: function(id, card){
    deleteHandler = ()=> {
      console.log(deleteBtn)
      api.removeCard(id)
        .then(()=>{
          card.remove()
          deletePopup.close()
        })
        .catch(console.log)
    }
    deletePopup.open()
  },
  openCard: function(){
    imagePopup.open(this._link, this._title)
  }
}


const userInfo = new UserInfo({nameSelector: '.user-panel__name', infoSelector: '.user-panel__description'},
  function(){
    api.getUserInfo()
      .then(({name, about, _id}) => {
        this.setUserInfo({name, about, _id})
      })
      .catch(console.log)
  })


//const section = new Section('.photo-grid', cardCreator(_id, cardFunctions))

Promise.all([
  api.getUserInfo(),
  api.getCards()
]).then(([info, cards]) => {
  userInfo.setUserInfo(info);
  avatar.src = info.avatar;

  section = new Section('.photo-grid', cardCreator(info._id, cardFunctions))
  section.addArray(cards)
}).catch(console.log);

const userPopup = new PopupWithForm('.popup_type_profile', function(values){
  this.setFormButtonText("Сохранение...");
  api.setUserInfo(values)
    .then(data => {
    userInfo.setUserInfo(data)
  }).catch(console.log)
    .finally(()=>{
      this.close()
      this.setFormButtonText("Сохранить");
  })

})
userPopup.setEventListeners()

const placePopup = new PopupWithForm('.popup_type_place', function(values){
   this.setFormButtonText("Сохранение...");
  api.addCard(values)
    .then(data => {
      section.setItem(data)
    }).catch(console.log).finally(()=>{
      this.close()
      this.setFormButtonText("Сохранить");
  })
})
placePopup.setEventListeners()

const avatarPopup = new PopupWithForm('.popup_type_avatar', function(values){
  this.setFormButtonText("Сохранение...");
  api.updateAvatar(values).then(data=> {
    avatar.src = data.avatar
  }).catch(console.log).finally(()=>{
      this.close()
      this.setFormButtonText("Сохранить");
  })
})
avatarPopup.setEventListeners()

const userForm = new FormValidator(conf, '#user-form')
userForm.enableValidation()
const newPlaceForm = new FormValidator(conf, 'form[name=new-place]')
newPlaceForm.enableValidation()
const avatarForm = new FormValidator(conf,'form[name=avatar]')
avatarForm.enableValidation()

btnEditUser.addEventListener('click', (evt) => {
  userForm.setFieldValue('#name', userInfo.getUserInfo().name);
  userForm.setFieldValue('#desc', userInfo.getUserInfo().info);
  userForm.resetForm();
  userPopup.open()
});

btnAddPlace.addEventListener('click', (evt) => {
  newPlaceForm.resetForm();
  placePopup.open()
});

avatarContainer.addEventListener('click', evt => {
  document.forms.avatar.reset();
  avatarForm.resetForm();
  avatarPopup.open();
});
