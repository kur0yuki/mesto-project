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


import {conf as obj} from "./utils";

export const enableValidation = () => {
  const forms = Array.from(document.querySelectorAll(obj.formSelector));

  forms.forEach(form => {
    const inputs = getInputs(form);
    const formButton = form.querySelector(obj.submitButtonSelector);
    toggleButton(formButton, inputs);

    form.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    inputs.forEach(input => {
      input.addEventListener('input', evt => {
        checkInputValidity(form, input);
        toggleButton(formButton, inputs)
      })
    });
  })
};


const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = '';
};


const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
export const toggleButton = (formButton, inputs) => {
  if (inputs.some(input => !input.validity.valid)) {
    formButton.classList.add(obj.inactiveButtonClass);
    formButton.setAttribute('disabled', true)
  } else {
    formButton.classList.remove(obj.inactiveButtonClass);
    formButton.removeAttribute('disabled')
  }
};

export const resetForm = (form) => {
  const inputs = getInputs(form);
  inputs.forEach(input => {
    hideInputError(form, input, obj.inputErrorClass, obj.errorClass);
  });
  toggleButton(form.querySelector(obj.submitButtonSelector), inputs)
};

const getInputs = form => {
  return Array.from(form.querySelectorAll(obj.inputSelector));
};
