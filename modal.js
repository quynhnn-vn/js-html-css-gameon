// DOM Elements
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");
const form = document.getElementById("form");

const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthdayInput = document.getElementById("birthdate");
const quantityInput = document.getElementById("quantity");
const checkboxInput = document.getElementById("checkbox1");
const radioInput = document.querySelectorAll("input[type=radio]");
const submitBtn = document.querySelector("input[type=submit]");

/**
 * @desc Set topnav responsive
 */
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/**
 * @desc Launch modal form
 */
function launchModal() {
  modalBg.style.display = "block";
}
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

/**
 * @desc Close modal form
 */
function closeModal() {
  modalBg.style.display = "none";
}
modalClose.addEventListener("click", closeModal);

function submitForm() {
  const isValidText = [
    firstNameInput,
    lastNameInput,
    emailInput,
    birthdayInput,
    quantityInput,
    checkboxInput,
  ].every((input) => input.checkValidity());

  let isValidRadio = false;
  for (var i = 0, len = radioInput.length; i < len; i++) {
    if (radioInput[i].checked) {
      isValidRadio = true;
    }
  }

  if (isValidText && isValidRadio) {
    alert("Merci ! Votre réservation a été reçue.");
    form.reset();
  }
}
