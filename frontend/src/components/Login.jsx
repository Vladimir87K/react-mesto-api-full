import React, { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({password, email});
  }



  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="container__form container__login">
        <h2 className="container__title">Вход</h2>
        <input onChange={handleChangeEmail} className="container__input container__email" type="email" id="login-email" name="login-email" placeholder="email" value={email} required />
        <input onChange={handleChangePassword} className="container__input container__password" type="password" id="login-password" name="login-password" placeholder="Пароль" value={password} required />
        <button  className="container__submit" type="submit" value="Войти">Войти</button>
      </form>
    </div>
  )
}

export default Login;