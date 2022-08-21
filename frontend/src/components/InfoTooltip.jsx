import React from "react";
import { useNavigate } from "react-router-dom";
import error from '../image/Error.svg';
import goodinput from '../image/Goodinput.svg'

function InfoTooltip(props) {
  const navigate = useNavigate()

  

  const onClose = () => {
    props.onClose();
    props.user ? navigate("/sign-in") : navigate("/sign-up");
  }

  return (
    <div className={`popup popup-${props.name} ${props.isOpen && 'popup_opened'}`} >
      <div className="popup__container">
        <button onClick={onClose} className="popup__container-btn  btn-cursor" type="button" aria-label="закрытие окна" />
        <h2 className="popup__title">{props.title}</h2>
        <form onSubmit={props.onSubmit} name={props.name} className="popup-information popup-profil-form">
          <img src={props.user ? goodinput : error} alt="" className="log-in__image" />
          <h2 className="log-in__paragraph">{props.user ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
        </form>
      </div>
    </div>

  )
}

export default InfoTooltip;