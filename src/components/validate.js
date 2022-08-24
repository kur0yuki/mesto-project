/*
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: '.form__button_disabled',
  inputErrorClass: '.form__input_type_error',
  errorClass: '.form__input-error_active'
});
*/


export const enableValidation = (obj) => {
  const forms = Array.from(document.querySelectorAll(obj.formSelector));

  forms.forEach(form => {
    const inputs = Array.from(form.querySelectorAll(obj.inputSelector));
    const formButton= form.querySelector(obj.submitButtonSelector)
    inputs.forEach(input => {
      input.addEventListener('input', evt =>{
        checkInputValidity(form, input, obj.inputErrorClass, obj.errorClass)
      })
    })
    form.addEventListener('input', evt=>{
      if (inputs.some(input => !input.validity.valid)){
        formButton.classList.add(obj.inactiveButtonClass)
      } else {
        formButton.classList.remove(obj.inactiveButtonClass)
      }
    })
  })
}


const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};



const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};
