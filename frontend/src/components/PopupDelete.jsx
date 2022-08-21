import React from "react";
import PopupWithForm from './PopupWithForm';

const PopupDelete = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.deleteCard();
  }

  return (
    <PopupWithForm isOpen={props.isOpen} title='Вы уверены?' name='delete' onClose={props.onClose} onSubmit={handleSubmit} buttonText={"Да"} />
  ); 
}

export default PopupDelete;