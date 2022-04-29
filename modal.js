// DOM Elements
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelector(".modal-btn");
const modalClose = document.querySelectorAll(".close");

const form = document.getElementById("form");
const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthdayInput = document.getElementById("birthdate");
const quantityInput = document.getElementById("quantity");
const checkboxInput = document.getElementById("checkbox1");
const radioInput = document.querySelectorAll("input[type=radio]");

const alertBg = document.querySelector(".alert-bground");
const alertClose = document.querySelector(".btn-close");

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

/* Launch form modal */
modalBtn.addEventListener("click", () => {
  modalBg.style.display = "block";
});

/* Close form modal or alert modal */
modalClose.forEach((closeBtn) =>
  closeBtn.addEventListener("click", () => {
    modalBg.style.display = "none";
    alertBg.style.display = "none";
  })
);

/* Close alert modal */
alertClose.addEventListener("click", () => {
  alertBg.style.display = "none";
});

/* Show error message */
const showErrorMessage = (input) => {
  let message = "";
  if (input === emailInput) message = "un email valid";
  else if (input === birthdayInput) message = "une date valide";
  else if (input === quantityInput) message = "une valeur numérique";
  else message = "ce champ avec un minimum de 2 caractères";

  input.parentElement.setAttribute("data-error-visible", "true");
  input.parentElement.setAttribute(
    "data-error",
    `Veuillez renseigner ${message}`
  );
};

/* Hide error message */
const hideErrorMessage = (input) => {
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
TEXT_INPUTS.forEach((input) => checkValidityBeforeSubmit(input));

/* Check validity and submit form */
const submitForm = (e) => {
  e.preventDefault();
  const isValidText = [...TEXT_INPUTS, checkboxInput].every((input) =>
    input.checkValidity()
  );

  let isValidRadio = false;
  for (var i = 0, len = radioInput.length; i < len; i++) {
    if (radioInput[i].checked) {
      isValidRadio = true;
    }
  }

  if (isValidText && isValidRadio) {
    modalBg.style.display = "none";
    alertBg.style.display = "block";
    form.reset();
  }
};
form.addEventListener("submit", submitForm);
