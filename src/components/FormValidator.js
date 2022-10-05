export default class FormValidator {
  constructor(conf, form) {
    this._form = document.querySelector(form);
    this._conf = conf;
    this._inputs = Array.from(this._form.querySelectorAll(conf.inputSelector));
    this._formButton = this._form.querySelector(conf.submitButtonSelector);
  }

  enableValidation() {
    this._toggleButton();

    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    this._inputs.forEach(input => {
      input.addEventListener('input', evt => {
        this._checkInputValidity(input);
        this._toggleButton()
      })
    });
  }

  _toggleButton() {
    if (this._inputs.some(input => !input.validity.valid)) {
      this._formButton.classList.add(this._conf.inactiveButtonClass);
      this._formButton.setAttribute('disabled', true)
    } else {
      this._formButton.classList.remove(this._conf.inactiveButtonClass);
      this._formButton.removeAttribute('disabled')
    }
  }

  _checkInputValidity(input) {
    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity("");
    }

    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _showInputError(input, validationMessage) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._conf.inputErrorClass);
    errorElement.textContent = validationMessage;
    errorElement.classList.add(this._conf.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._conf.inputErrorClass);
    errorElement.classList.remove(console.errorClass);
    errorElement.textContent = '';
  }

  resetValidation() {
    this._inputs.forEach(input => {
      this._hideInputError(input);
    });
    this._toggleButton()
  };
}
