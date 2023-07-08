export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
  }

    // кнопки открытия и закрытия попапов данные профиля и карточки
export const popupOpenButtonForProfile = document.querySelector(
  ".profile__edit-button"
);
export const popupOpenButtonForCard = document.querySelector(".profile__add-button");

export const popupOpenButtonAvatar = document.querySelector('.profile__change-avatar-button');

// контейнеры попапов данные профиля и карточки
export const popupEditProfileContainer = document.querySelector(
  ".popup__form_type_profile-info"
);
export const popupAddCardContainer = document.querySelector(
  ".popup__form_type_card"
);

export const popupChangeAvatarContainer = document.querySelector('.popup__form_type_change-avatar');