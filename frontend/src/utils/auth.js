class Auth {
  constructor(options) {
    this._urlBase = options.urlBase;
    this._headers = options.headers;
  }


  _checkError(res) {
    console.log(res)
    if (res.ok) {
        return res.json();
    } else {
        Promise.reject(`Произошла ошибка: ${res.status}`);
        return false;
    }
  }

  getRegistration(data) {
    return fetch(`${this._urlBase}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "password": data.password,
        "email": data.email})
    })
    .then(this._checkError)
  }
  
  getAutorization(data) {
    return fetch(`${this._urlBase}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "password": data.password,
        "email": data.email})
    })
    .then(this._checkError)
  }

  getControl(JWT) {
    return fetch(`${this._urlBase}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${JWT}`
    }    
    })
    .then(this._checkError)
  }
}

const register = new Auth({
  urlBase: 'https://auth.nomoreparties.co',
  headers: {
    "Content-Type": "application/json" 
  }
});

export default register;