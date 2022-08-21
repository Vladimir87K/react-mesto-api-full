import React, { useState } from "react";

function Register(props) {

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
    props.onSubmit({password, email})
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="container__form container__login">
        <h2 className="container__title">Регистрация</h2>
        <input onChange={handleChangeEmail} className="container__input container__email" type="email" id="register-email" name="register-email" placeholder="email" value={email} required />
        <input onChange={handleChangePassword} className="container__input container__password" type="password" id="register-password" name="login-password" placeholder="Пароль" value={password} required />
        <button  className="container__submit" type="submit" value="Зарегистрироваться">{"Зарегистрироваться"}</button>
      </form>
      <p onClick={props.handleLogin} className="container__paragraph">Уже зарегистрированы? Войти</p>
    </div>
  )
}

export default Register;