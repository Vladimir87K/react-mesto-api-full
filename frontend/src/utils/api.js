class Api {
  constructor(options) {
      this._urlBase = options.urlBase;
      this._headers = options.headers;

  }

  _checkError(res) {
      if (res.ok) {
       // Promise.reject(`Произошла ошибка: ${res.status}`);
          return res.json();
      }  else {
          Promise.reject(`Произошла ошибка: ${res.status}`);
      }
    }

  getInitialCards(token) {
      return fetch(`${this._urlBase}/cards`, {
              method: 'GET',
              headers: {
                "Authorization" : `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
          })
          .then(this._checkError)
          .then((res) => res.data)
  }

  getInitialProfil(token) {
      return fetch(`${this._urlBase}/users/me`, {
              method: 'GET',
              headers: {
                "Authorization" : `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
          })
          .then(this._checkError)
          .then((res) => res.data)
  }

  addNewCards(data, token) {
    console.log(data, token, 'клик!')
      return fetch(`${this._urlBase}/cards`, {
              method: 'POST',
              headers: {
                "Authorization" : `Bearer ${token}`,
                'Content-Type': 'application/json'
                },
              body: JSON.stringify({
                  name: data.name,
                  link: data.link
              })
          })
          .then(this._checkError)
          .then((res) => res.data)
  }

  deleteCard(cardId, token) {
      return fetch(`${ this._urlBase}/cards/${cardId}`, {
              method: 'DELETE',
              headers: {
                "Authorization" : `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
          })
          .then(this._checkError)
          .then((res) => res.data)
  }

  correctUserInfo(data, token) {
    console.log(data, token);
      return fetch(`${this._urlBase}/users/me`, {
              method: 'PATCH',
              headers: {
                "Authorization" : `Bearer ${token}`,
                'Content-Type': 'application/json'
                },
              body: JSON.stringify({
                  name: data.name,
                  about: data.about
              })
          })
          .then(this._checkError)
          .then((res) => res.data)
  }

  correctUserAvatar(data, token) {
      return fetch(`${this._urlBase}/users/me/avatar`, {
              method: 'PATCH',
              headers: {
                "Authorization" : `Bearer ${token}`,
                'Content-Type': 'application/json'
                },
              body: JSON.stringify({
                  avatar: data.avatar
              })
          })
          .then(this._checkError)
          .then((res) => res.data)
  }

//   addLikeCard(idCard) {
//       return fetch(`${this._urlBase}/cards/${idCard}/likes`, {
//               method: 'PUT',
//               headers: this._headers,
//           })
//           .then(this._checkError)
//   }

  changeLikeCardStatus(idCard, isLiked, token) {
      return fetch(`${this._urlBase}/cards/${idCard}/likes`, {
              method: isLiked ? 'DELETE' : 'PUT',
              headers: {
                "Authorization" : `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
          })
          .then(this._checkError)
          .then((res) => res.data)
  }
}

const api = new Api({
    urlBase: 'http://158.160.10.208',
    headers: {
        //authorization: 'd2b53e42-b171-4a97-abd9-e550272a84f9',
        'Content-Type': 'application/json'
    }
  });

  export default api;