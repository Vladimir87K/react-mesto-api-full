import React from "react";

const ImagePopup = (props) => {
  return (
    <div className={`popup popup-image ${props.card && 'popup_opened'}`}>
    <div className="popup-image__container">
        <img className="popup-image__img" src={props.card ? props.card.link : "#"} alt={props.card ? props.card.name : '#'} />
        <button onClick={props.onCardClick} className="popup__container-btn  btn-cursor" type="button" aria-label="закрытие окна" />
        <h2 className="popup-image__title">{props.card ? props.card.name : ''}</h2>
    </div>
 </div>
  );
}

export default ImagePopup;