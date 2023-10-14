const form = document.querySelector('#form');

const h1 = document.querySelector('h1')

const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm_password');
const keep = document.querySelector('#keep');

const submitBtn = document.querySelector('#submit');

const ErrorClassNames = { ERROR_TEXT_CLASSNAME: 'error-text', BORDER_ERROR_STYLE_CLASSNAME: 'error' }

form.addEventListener('submit', (event) => {
  event.preventDefault();

  removeClassNames(ErrorClassNames.BORDER_ERROR_STYLE_CLASSNAME, username, email, password, confirmPassword)
  removeHTMLElementsByClassName(ErrorClassNames.ERROR_TEXT_CLASSNAME)

  const isNotEmptyFields = emptyCheck(username, email, password, confirmPassword);
  const isValidEmail = checkEmail(email)
  const isEqualPasswords = comparePassword(password, confirmPassword)

  const isValidForm = [isNotEmptyFields, isValidEmail, isEqualPasswords].every(el => el === true)

  if (isValidForm) {
    h1.style.color = 'green'
    submitBtn.style.background = 'green'

    setTimeout(() => {
      h1.style.color = 'black'
      submitBtn.style.background = '#c5322d'
    }, 2000)
  }
});

const checkEmail = (mailInput) => {
    if (mailInput.value !== '') {
      const isValid = String(mailInput.value)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|.('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if (isValid === null) {
        addErrorTextAfterInput(mailInput, 'Неверный формат', ErrorClassNames.ERROR_TEXT_CLASSNAME, ErrorClassNames.BORDER_ERROR_STYLE_CLASSNAME)
      }  
      return Boolean(isValid);
    } 
    return false
};

const emptyCheck = (...inputs) => {
  let emptyFields = 0
  for (const input of inputs) {
      if (input.value === '') {
        emptyFields += 1
        addErrorTextAfterInput(input, 'Это поле не должно быть пустым' ,ErrorClassNames.ERROR_TEXT_CLASSNAME, ErrorClassNames.BORDER_ERROR_STYLE_CLASSNAME)
      }
  }
  if (emptyFields === 0) {
    return true
  }
  return false
};

const comparePassword = (pw, confirmPw) => {
  if (confirmPw.value !== pw.value) {
    addErrorTextAfterInput(confirmPw, 'Пароли не совпадают' ,ErrorClassNames.ERROR_TEXT_CLASSNAME, ErrorClassNames.BORDER_ERROR_STYLE_CLASSNAME)
    return false
  }
  return true
}

const removeClassNames = (commonClassName, ...inputs) => {
  for (const input of inputs) {
    input.classList.remove(commonClassName)
  }
}

const removeHTMLElementsByClassName = (className) => {
  document.querySelectorAll(`.${className}`).forEach((el) => el.remove())
}

const addErrorTextAfterInput = (input, errorText, errorTextClassName, inputErrorClassName) => {
  const span = document.createElement('span');
  span.classList.add(errorTextClassName);
  span.setAttribute('style', 'color: red; font-size: 12px; position: absolute;');
  span.textContent = errorText;
  input.classList.add(inputErrorClassName);
  input.after(span);
}

