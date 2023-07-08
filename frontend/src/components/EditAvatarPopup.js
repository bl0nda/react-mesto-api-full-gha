import { useRef, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const avatarRef = useRef(currentUser.avatar);

    function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="change-avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <label className="popup__field-container">
        <input
          type="url"
          name="avatar"
          id="change-avatar"
          ref={avatarRef}
          className="popup__field popup__field_change_avatar"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__field-error change-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
