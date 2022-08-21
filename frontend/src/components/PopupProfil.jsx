import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from '../context/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

const PopupProfil = (props) => {
  const userContext = useContext(CurrentUserContext);

  const [name, setName] = useState(userContext.name);
  const [about, setAbout] = useState(userContext.about);

  useEffect(() => {
    setName(userContext.name);
    setAbout(userContext.about);
  }, [userContext, props.isOpen]); 

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleChangeAbout = (e) => {
    setAbout(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about
    })
  }

  return (
    <PopupWithForm isOpen={props.isOpen} title='Редактировать профиль' name='profil' onClose={props.onClose} onSubmit={handleSubmit} buttonText={"Сохранить"}>
      <fieldset className="popup__form-content">
        <input onChange={handleChangeName} id="popup__form-name" type="text" className="popup__form popup__form-name" name="userName" value={name || ""} minLength={2} maxLength={40} required />
        <span className="popup__form-error popup__form-name-error" />
        <input onChange={handleChangeAbout} id="popup__form-profetional" type="text" className="popup__form popup__form-profetional" name="userJob" value={about || ""} minLength={2} maxLength={200} required />
        <span className="popup__form-error popup__form-profetional-error" />
     </fieldset>
   </PopupWithForm>
  )
}


export default PopupProfil;