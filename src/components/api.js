const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14/',
  headers: {
    authorization: 'a14ef751-2e04-445b-9224-d88ea9b735c0',
    'Content-Type': 'application/json'
  }

}

export const checkStatus = res => {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res.status)
  }
};

export const getUserInfo = () => {
  return fetch(config.baseUrl + 'users/me', {
    headers: config.headers
  }).then(checkStatus)
};

export const getCards = () => {
  return fetch(config.baseUrl + 'cards', {
    headers: config.headers
  }).then(checkStatus)
};

export const setUserInfo = (name, about) => {
  return fetch(config.baseUrl + 'users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about
    })
  }).then(checkStatus)
};

export const addCard = (name, link) => {
  return fetch(config.baseUrl + 'cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  }).then(checkStatus)
};

export const removeCard = (cardId) => {
  return fetch(config.baseUrl + 'cards/' + cardId, {
    method: 'DELETE',
    headers: config.headers
  }).then(checkStatus)
};

export const addLike = (cardId) => {
  return fetch(config.baseUrl + 'cards/likes/' + cardId, {
    method: 'PUT',
    headers: config.headers
  }).then(checkStatus)
};

export const removeLike = (cardId) => {
  return fetch(config.baseUrl + 'cards/likes/' + cardId, {
    method: 'DELETE',
    headers: config.headers
  }).then(checkStatus)
};

export const updateAvatar = (avatar) => {
  return fetch(config.baseUrl + 'users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({avatar})
  }).then(checkStatus)
};
