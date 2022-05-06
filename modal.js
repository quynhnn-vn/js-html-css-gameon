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

/* Show error message */
const showErrorMessage = (input) => {
  // Assign message values to inputs
  let message = "";
  if (input === emailInput) message = "un email valid";
  else if (input === birthdayInput) message = "une date valide";
  else if (input === quantityInput) message = "une valeur numérique";
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

/* Check validity and submit form */
const submitForm = (e) => {
  e.preventDefault();

  // isValidText = true if every text inputs and checkbox are valid
  const isValidText = [...TEXT_INPUTS, checkboxInput].every((input) =>
    input.checkValidity()
  );

  // isValidRadio = true if at least one radio input is checked
  let isValidRadio = false;
  for (var i = 0, len = radioInput.length; i < len; i++) {
    if (radioInput[i].checked) {
      isValidRadio = true;
    }
  }

  // Handle when the form is valid
  if (isValidText && isValidRadio) {
    // Hide the inscription modal
    modalBg.style.display = "none";
    // Show the confirmation modal
    alertBg.style.display = "block";
    // Reset the form
    form.reset();
  }
};
form.addEventListener("submit", submitForm);
