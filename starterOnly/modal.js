function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelectorAll(".close");
const form = document.getElementById("form");
const emailField = document.getElementById("email");
/**
 * @desc launch modal form
 */
function launchModal() {
  modalBg.style.display = "block";
}
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

/**
 * @desc: close modal form
 */
function closeModal() {
  modalBg.style.display = "none";
}
// close modal event
modalClose.forEach((btn) => btn.addEventListener("click", closeModal));

function submitForm() {
  form.submit();
}
