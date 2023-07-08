function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_type_big-image ${card ? "popup_opened" : ""}`}
    >
      <div className="popup__container-big-image">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <figure className="popup__picture">
          <img src={card?.link} alt={card?.name} className="popup__big-image" />
          <figcaption className="popup__image-caption">{card?.name}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;
