import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      title,
      link,
    });
    props.onClose();
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <label className="popup__field-container">
        <input
          type="text"
          value={title}
          onChange={handleTitle}
          minLength="2"
          maxLength="30"
          name="title"
          id="change-cards-name"
          className="popup__field popup__field_change_cards-name"
          placeholder="Название"
          required
        />
        <span className="popup__field-error change-cards-name-error"></span>
      </label>
      <label className="popup__field-container">
        <input
          type="url"
          value={link}
          onChange={handleLink}
          name="link"
          id="change-image"
          className="popup__field popup__field_change_image"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__field-error change-image-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
