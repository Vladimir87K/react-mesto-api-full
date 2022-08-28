/* eslint-disable jsx-a11y/anchor-is-valid */
import React  from 'react';
import logo from '../image/logo.svg';

const Header = (props) => {

  return (
    <header className="header">
      <a href="#" className="header__link">
        <img src={logo} alt="логотип Место" className="header__logo" />
      </a>
      <p className='header__email'>{props.email}</p>
      <p onClick={props.handleClick} className='header__paragraph'>{props.user && props.loggedIn ? "Выйти" : props.user ? "Регистрация" : "Вход"}</p>
    </header>

  );
}

export default Header;