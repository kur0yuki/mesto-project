import './index.css'

import {conf} from "../utils/utils";
import {avatarContainer, btnAddPlace, btnEditUser, config} from '../utils/constants'
import Api from "../components/Api";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import FormValidator from "../components/FormValidator";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Card from "../components/Card";
import ConfirmationPopup from "../components/ConfirmationPopup";

const createCard = function (id, cardFunctions) {
  return function (data) {
    return new Card(data, '#card', cardFunctions, id).generate();
  }
};


let section;
let deleteHandler;

const api = new Api(config);

const imagePopup = new PopupWithImage('.popup_type_card');
imagePopup.setEventListeners();

const deletePopup = new ConfirmationPopup('.popup_type_check', deleteHandler);
deletePopup.setEventListeners();
//deleteBtn.addEventListener('click', ()=>{deleteHandler()})

const cardFunctions = {
  addLike: function (card) {
    api.addLike(card.getData().id)
      .then(({likes}) => {
        card.setLikes(likes)
      })
      .catch(console.log)
  },
  removeLike: function (card) {
    api.removeLike(card.getData().id)
      .then(({likes}) => {
        card.setLikes(likes)
      })
      .catch(console.log)
  },
  removeCard: function (card) {
    const data = card.getData();
    deleteHandler = () => {
      api.removeCard(data.id)
        .then(() => {
          data.el.remove();
          deletePopup.close()
        })
        .catch(console.log)
    };
    deletePopup.changeEventListener(deleteHandler);
    deletePopup.open()
  },
  openCard: function (card) {
    const data = card.getData();
    imagePopup.open(data.link, data.title)
  }
};


const userInfo = new UserInfo({
    nameSelector: '.user-panel__name',
    infoSelector: '.user-panel__description',
    avatarSelector: '.user-panel__avatar'
  },
  function () {
    api.getUserInfo()
      .then(({name, about, _id}) => {
        this.setUserInfo({name, about, _id})
      })
      .catch(console.log)
  });


//const section = new Section('.photo-grid', cardCreator(_id, cardFunctions))

Promise.all([
  api.getUserInfo(),
  api.getCards()
]).then(([info, cards]) => {
  userInfo.setUserInfo(info);

  section = new Section('.photo-grid', createCard(info._id, cardFunctions));
  section.addArray(cards)
}).catch(console.log);

const userPopup = new PopupWithForm('.popup_type_profile', function (values) {
  userPopup.renderLoading(true);
  api.setUserInfo(values)
    .then(data => {
      userInfo.setUserInfo(data)
    }).then(() => {
    userPopup.close()
  })
    .catch(console.log)
    .finally(() => {
      userPopup.renderLoading(false);
    })

});
userPopup.setEventListeners();

const placePopup = new PopupWithForm('.popup_type_place', function (values) {
  placePopup.renderLoading(true);
  api.addCard(values)
    .then(data => {
      section.setItem(data);
      placePopup.close()
    }).catch(console.log).finally(() => {
    placePopup.renderLoading(false);
  })
});
placePopup.setEventListeners();

const avatarPopup = new PopupWithForm('.popup_type_avatar', function (values) {
  avatarPopup.renderLoading(true);
  api.updateAvatar(values).then(data => {
    userInfo.setUserInfo(data);
    avatarPopup.close()
  }).catch(console.log).finally(() => {
    avatarPopup.renderLoading(false);
  })
});
avatarPopup.setEventListeners();

const userForm = new FormValidator(conf, '#user-form');
userForm.enableValidation();
const newPlaceForm = new FormValidator(conf, 'form[name=new-place]');
newPlaceForm.enableValidation();
const avatarForm = new FormValidator(conf, 'form[name=avatar]');
avatarForm.enableValidation();

btnEditUser.addEventListener('click', (evt) => {
  userPopup.setInputValues({
    'name': userInfo.getUserInfo().name,
    'about': userInfo.getUserInfo().info
  });
  userForm.resetValidation();
  userPopup.open()
});

btnAddPlace.addEventListener('click', (evt) => {
  newPlaceForm.resetValidation();
  placePopup.open()
});

avatarContainer.addEventListener('click', evt => {
  avatarForm.resetValidation();
  avatarPopup.open();
});
