/*
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_state_error',
  errorClass: 'form__input-error_active'
});
*/


export const enableValidation = (obj) => {
  const forms = Array.from(document.querySelectorAll(obj.formSelector));

  forms.forEach(form => {
    const inputs = getInputs(form, obj);
    const formButton = form.querySelector(obj.submitButtonSelector);
    toggleButton(formButton, inputs, obj);

    form.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    inputs.forEach(input => {
      input.addEventListener('input', evt => {
        checkInputValidity(form, input, obj);
        toggleButton(formButton, inputs, obj)
      })
    });
  })
};


const showInputError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};

const hideInputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = '';
};


const checkInputValidity = (formElement, inputElement, obj) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
};
export const toggleButton = (formButton, inputs, obj) => {
  if (inputs.some(input => !input.validity.valid)) {
    formButton.classList.add(obj.inactiveButtonClass);
    formButton.setAttribute('disabled', true)
  } else {
    formButton.classList.remove(obj.inactiveButtonClass);
    formButton.removeAttribute('disabled')
  }
};

export const resetForm = (form, obj) => {
  const inputs = getInputs(form, obj);
  inputs.forEach(input => {
    hideInputError(form, input, obj);
  });
  toggleButton(form.querySelector(obj.submitButtonSelector), inputs, obj)
};

const getInputs = (form, obj) => {
  return Array.from(form.querySelectorAll(obj.inputSelector));
};
