function PopupWithForm(props) {
  return (
    <section
      className={
        "popup popup_type_card" + (props.isOpen ? " popup_opened" : "")
      }
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          name={props.name}
          onSubmit={props.onSubmit}
          className={`popup__form popup__form_${props.name}`}
          noValidate
        >
          {props.children}
          <button
            type="submit"
            className={`popup__submit-button popup__submit-button_type_${props.name}`}
            // disabled
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
