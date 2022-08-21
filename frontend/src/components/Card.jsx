import React from "react";
import {CurrentUserContext} from '../context/CurrentUserContext';  

const Card = (props) =>   {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  return (
    <article className="card">
      <div>
        <img onClick={() => props.handleCardClick(props.card)} className="card__img" src={props.card.link} alt={props.card.name} />
        <div className="card__content content-overflow">
          <h2 className="card__title content-overflow">{props.card.name}</h2>
          <div className="card__like">
            <button onClick={() => {props.onCardLike(props.card, isLiked)}} className={`card__like-img btn-cursor ${isLiked  && 'card__like-img_active'}`} type="button" aria-label="сердечко" />
            <p className="card__like-number">{props.card.likes.length}</p>
          </div>
        </div>
        <button onClick={() => props.onCardDelete(props.card)} className={`${isOwn ? 'card__delete btn-cursor' : 'card__delete_none'} `} type="button" aria-label="корзина" />
      </div>
    </article>
  )
}

export default Card;