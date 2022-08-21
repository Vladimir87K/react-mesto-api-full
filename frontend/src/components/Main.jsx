import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import avatar from "../image/image.jpg";
import api from "../utils/api";
import Card from './Card';

const Main = (props) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="main">
      <section className="profil">
        <button onClick={props.onEditAvatar} className="profil__btn-avatar"><img src={currentUser.avatar ? currentUser.avatar : avatar} className="profil__avatar" alt="аватарка пользователь" /></button>
        <div className="profil-content">
          <div className="profil-content__information">
            <h1 className="profil-content__name content-overflow">{currentUser.name ? currentUser.name : 'Жак-Ив Кусто'}</h1>
            <button onClick={props.onEditProfile} className="profil-content__btn btn-cursor" type="button" aria-label="изменение данных профиля" />
          </div>
          <p className="profil-content__profethional content-overflow">{currentUser.about ? currentUser.about : 'Исследователь океана'}</p>
        </div>
        <button onClick={props.onAddPlace} className="profil__btn btn-cursor" type="button" aria-label="добавление картинки" />
      </section>
      <section className="cards">
      {props.cards.map((card) => 
        (<Card handleCardClick={props.handleCardClick} 
              onCardClick={props.onCardClick} 
              key={card._id} 
              card={card} 
              onCardLike={props.handleCardLike}
              onCardDelete={props.handleDeleteClick} /> 
              ))}
      </section>
    </div>
  )
}

export default Main;