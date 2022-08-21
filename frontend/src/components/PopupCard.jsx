import React, {useState, useEffect} from "react";
import PopupWithForm from './PopupWithForm';

const PopupCard = (props) => {
  const [imageName, setImageName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const handleChangeImageName = (e) => {
    setImageName(e.target.value)
  }

  const handleChangeImageUrl = (e) => {
    setImageUrl(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleNewCard({
      name: imageName,
      link: imageUrl
    })
  }

  useEffect(() => {
    setImageName('');
    setImageUrl('');
  }, [props.isOpen]);


  return (
    <PopupWithForm isOpen={props.isOpen} title='Новое место' name='card' onClose={props.onClose} onSubmit={handleSubmit} buttonText={"Сохранить"}>
      <fieldset className="popup__form-content">
        <input onChange={handleChangeImageName} id="popup__form-name-image" type="text" className="popup__form popup__form-name-image" name="imageName" value={imageName} placeholder="Название" minLength={2} maxLength={30} required />
        <span className="popup__form-error popup__form-name-image-error" />
        <input onChange={handleChangeImageUrl} id="popup__form-url-image" type="url" className="popup__form popup__form-url-image" name="urlName" value={imageUrl} placeholder="Ссылка на место" required />
        <span className="popup__form-error popup__form-url-image-error" />
      </fieldset>
    </PopupWithForm>
  )
}

export default PopupCard;