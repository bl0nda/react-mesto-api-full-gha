class Api {
  constructor({baseUrl}) {
    this._url = baseUrl;
  }

  _getResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._getResult);
  }

  pushNewCard(obj) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: obj.title,
        link: obj.link,
      }),
    }).then(this._getResult);
  }

  setProfileData(data) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getResult);
  }

  getProfileData() {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._getResult);
  }

  setNewAvatar(avatar) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(avatar)
    }).then(this._getResult);
  }

  _setLike(cardId) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._getResult);
  }

  _deleteLike(cardId) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then(this._getResult);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this._deleteLike(cardId) : this._setLike(cardId)
  }

  deleteCard(cardId){
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then(this._getResult);
  }
}

const api = new Api({
  baseUrl: "http://localhost:4000",
});

export default api;