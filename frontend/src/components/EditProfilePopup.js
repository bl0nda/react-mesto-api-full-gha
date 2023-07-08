import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
}, [currentUser, props.isOpen]);


  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
        name,
        about: description,
      });
}

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-info"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <label className="popup__field-container">
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          minLength="2"
          maxLength="40"
          name="name"
          id="change-name"
          className="popup__field popup__field_change_name"
          placeholder="Имя"
          required
        />
        <span className="popup__field-error change-name-error"></span>
      </label>
      <label className="popup__field-container">
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          minLength="2"
          maxLength="200"
          name="about"
          id="change-job"
          className="popup__field popup__field_change_job"
          placeholder="Вид деятельности"
          required
        />
        <span className="popup__field-error change-job-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
