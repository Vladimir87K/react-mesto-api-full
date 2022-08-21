import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

const PopupAvatar = (props) => {
  const textInputAvatar = useRef('');

  useEffect(() => {
    textInputAvatar.current.value = '';
  }, [props.isOpen])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(textInputAvatar.current.value)
    props.onUpdateAvatar({
      avatar: textInputAvatar.current.value
    });
  } 
  
  return (
    <PopupWithForm isOpen={props.isOpen} title='Обновить аватар' name='avatar' onClose={props.onClose} onSubmit={handleSubmit} buttonText={"Сохранить"}>
    <fieldset className="popup__form-content">
      <input ref={textInputAvatar}  id="popup__form-url-avatar" type="url" className="popup__form popup__form-url-avatar" name="urlAvatar" placeholder='Ссылка на аватарку' required />
      <span className="popup__form-error popup__form-url-avatar-error" />
    </fieldset>
    </PopupWithForm>
  );
}

export default PopupAvatar;