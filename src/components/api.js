const token = 'a14ef751-2e04-445b-9224-d88ea9b735c0';
const url = 'https://nomoreparties.co/v1/plus-cohort-14/';

export const checkStatus = res => {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res.status)
  }
};

export const getUserInfo = () => {
  return fetch(url + 'users/me', {
    headers: {
      authorization: token
    }
  })
};

export const getCards = () => {
  return fetch(url + 'cards', {
    headers: {
      authorization: token
    }
  })
};

export const setUserInfo = (name, about) => {
  return fetch(url + 'users/me', {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      about
    })
  })
};

export const addCard = (name, link) => {
  return fetch(url + 'cards', {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      link
    })
  })
};

export const removeCard = (cardId) => {
  return fetch(url + 'cards/' + cardId, {
    method: 'DELETE',
    headers: {
      authorization: token
    }
  })
};

export const addLike = (cardId) => {
  return fetch(url + 'cards/likes/' + cardId, {
    method: 'PUT',
    headers: {
      authorization: token
    }
  })
};

export const removeLike = (cardId) => {
  return fetch(url + 'cards/likes/' + cardId, {
    method: 'DELETE',
    headers: {
      authorization: token
    }
  })
};

export const updateAvatar = (avatar) => {
  return fetch(url + 'users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({avatar})
  })
};
