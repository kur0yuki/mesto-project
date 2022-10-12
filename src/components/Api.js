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

  _request(url, options) {
    return fetch(url, options).then(this._checkStatus)
  }

  getUserInfo() {
    return this._request(this._baseUrl+'users/me', {
      headers: this._headers
    })
  };

  getCards() {
    return this._request(this._baseUrl + 'cards', {
      headers: this._headers
    })
  };

  setUserInfo({name, about}) {
    return this._request(this._baseUrl + 'users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
  };

  addCard({name, link}) {
    return this._request(this._baseUrl + 'cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
  };

  removeCard(cardId) {
    return this._request(this._baseUrl + 'cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers
    })
  };

  addLike(cardId) {
    return this._request(this._baseUrl + 'cards/likes/' + cardId, {
      method: 'PUT',
      headers: this._headers
    })
  };

  removeLike(cardId) {
    return this._request(this._baseUrl + 'cards/likes/' + cardId, {
      method: 'DELETE',
      headers: this._headers
    })
  };

  updateAvatar({link}) {
    return this._request(this._baseUrl + 'users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: link})
    })
  };
}


