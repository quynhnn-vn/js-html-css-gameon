/* DOM elements of the inscription modal */
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelector(".modal-btn");
const modalClose = document.querySelectorAll(".close");

/* DOM elements of all inputs */
const form = document.getElementById("form");
const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthdayInput = document.getElementById("birthdate");
const quantityInput = document.getElementById("quantity");
const checkboxInput = document.getElementById("checkbox1");
const radioInput = document.querySelectorAll("input[type=radio]");

/* DOM elements of the confirmation modal */
const alertBg = document.querySelector(".alert-bground");
const alertClose = document.querySelector(".btn-close");

/* DOM elements array of type text/email/date/number inputs */
const TEXT_INPUTS = [
  firstNameInput,
  lastNameInput,
  emailInput,
  birthdayInput,
  quantityInput,
];
const ALL_INPUTS = [...TEXT_INPUTS, checkboxInput, ...radioInput];
const EMAIL_PATTERN = ".+@.+..+";
const EMAIL_REGEX = /.+@.+..+/;

/* Set topnav responsive */
const editNav = () => {
  const x = document.getElementById("myTopnav");
  x.className === "topnav"
    ? (x.className += " responsive")
    : (x.className = "topnav");
};

/* Launch inscription modal */
modalBtn.addEventListener("click", () => {
  modalBg.style.display = "block";
});

/* Close inscription modal or confirmation modal */
modalClose.forEach((closeBtn) =>
  closeBtn.addEventListener("click", () => {
    modalBg.style.display = "none";
    alertBg.style.display = "none";
  })
);

/* Close confirmation modal */
alertClose.addEventListener("click", () => {
  alertBg.style.display = "none";
});

/* Set attributes for inputs */
ALL_INPUTS.forEach((input) => {
  input.setAttribute("required", "");
  if (input.type === "text") {
    input.setAttribute("minLength", "2");
  } else if (input.type === "email") {
    input.setAttribute("pattern", EMAIL_PATTERN);
  } else if (input.type === "number") {
    input.setAttribute("min", "0");
    input.setAttribute("max", "99");
  }
});

/* Check if text is long enough */
const isLongEnough = (currentLength, minLength) => {
  return Number(currentLength) >= Number(minLength);
};

/* Show error message */
const showErrorMessage = (input) => {
  // Assign message values to inputs
  let message = "";
  if (input.type === "email") message = "un email valid";
  else if (input.type === "date") message = "une date valide";
  else if (input.type === "number") message = "une valeur numérique";
  else message = "ce champ avec un minimum de 2 caractères";

  // Set attributes to change styles of the invalid input
  input.parentElement.setAttribute("data-error-visible", "true");
  input.parentElement.setAttribute(
    "data-error",
    `Veuillez renseigner ${message}`
  );
};

/* Hide error message */
const hideErrorMessage = (input) => {
  // Remove attributes to change styles of the valid input
  input.parentElement.removeAttribute("data-error-visible");
  input.parentElement.removeAttribute("data-error");
};

/* Check validity on blur before submit */
const checkValidityBeforeSubmit = (input) => {
  input.addEventListener("blur", () => {
    if (!input.checkValidity()) showErrorMessage(input);
    else {
      hideErrorMessage(input);
    }
  });
};
/* Apply checkValidityBeforeSubmit for each text inputs */
TEXT_INPUTS.forEach((input) => checkValidityBeforeSubmit(input));

/* Apply checkValidityAfterSubmit for all inputs */
const checkValidityAfterSubmit = () => {
  let isValid = [],
    isValidRadio = false;

  for (var i = 0, len = radioInput.length; i < len; i++) {
    if (radioInput[i].checked) {
      isValidRadio = true;
    }
  }
  isValid.push(isValidRadio);

  [...TEXT_INPUTS, checkboxInput].forEach((input) => {
    let validationValue = null;
    switch (input.type) {
      case "text":
        validationValue = isLongEnough(input.value.length, 2);
        break;
      case "email":
        validationValue = EMAIL_REGEX.test(
          String(input.value).toLocaleLowerCase()
        );
        break;
      case "date":
        validationValue = Boolean(Date.parse(input.value));
        break;
      case "number":
        validationValue = Number(input.value) >= 0 && Number(input.value) <= 99;
        break;
      case "checkbox":
        validationValue = input.checked;
        break;
      default:
        validationValue = input.checked;
    }
    isValid.push(validationValue);

    !validationValue && showErrorMessage(input);
  });

  return isValid.every((element) => element === true);
};

/* Check validity and submit form */
const submitForm = (e) => {
  e.preventDefault();

  // isValidText = true if every text inputs and checkbox are valid
  let isValidForm = checkValidityAfterSubmit();

  // Handle when the form is valid
  if (isValidForm) {
    // Hide the inscription modal
    modalBg.style.display = "none";
    // Show the confirmation modal
    alertBg.style.display = "block";
    // Reset the form
    form.reset();
  }
};
form.addEventListener("submit", submitForm);
