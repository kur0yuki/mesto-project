export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res.status)
    }
  }

  getUserInfo() {
    return fetch(this._baseUrl+'users/me', {
      headers: this._headers
    }).then(this._checkStatus)
  };

  getCards() {
    return fetch(this._baseUrl + 'cards', {
      headers: this._headers
    }).then(this._checkStatus)
  };

  setUserInfo({name, about}) {
    return fetch(this._baseUrl + 'users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    }).then(this._checkStatus)
  };

  addCard({name, link}) {
    return fetch(this._baseUrl + 'cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    }).then(this._checkStatus)
  };

  removeCard(cardId) {
    return fetch(this._baseUrl + 'cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkStatus)
  };

  addLike(cardId) {
    return fetch(this._baseUrl + 'cards/likes/' + cardId, {
      method: 'PUT',
      headers: this._headers
    }).then(this._checkStatus)
  };

  removeLike(cardId) {
    return fetch(this._baseUrl + 'cards/likes/' + cardId, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkStatus)
  };

  updateAvatar({link}) {
    return fetch(this._baseUrl + 'users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: link})
    }).then(this._checkStatus)
  };
}


