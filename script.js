const creditCardNumber = document.querySelector(".credit-card-number");
const cardholderName = document.querySelector(".cardholder-name");
const expDate = document.querySelector(".date-of-expiration");
const cvc = document.querySelector(".cvc-text");
const monthText = document.querySelector(".month-text");
const yearText = document.querySelector(".year-text");
const form = document.querySelector(".card-form");
const submitBtn = document.querySelector(".submitBtn");
const input__cardholderName = document.querySelector("#input__cardholderName");
const input__cardNumber = document.querySelector("#input__cardNumber");
const input__expMonth = document.querySelector("#input__expMonth");
const input__expYear = document.querySelector("#input__expYear");
const input__cvc = document.querySelector("#input__cvc");

// form validation

submitBtn.addEventListener("click", validateForm);

function validateForm(e) {
  e.preventDefault();
  const isCardholderName = validateName(input__cardholderName);
  const isCardNumber = validateNumber(input__cardNumber, 16);
  const isExpMonth = validateExp(input__expMonth, "month");
  const isExpYear = validateExp(input__expYear, "year");
  const isCvc = validateNumber(input__cvc, 3);

  if (isCardholderName && isCardNumber && isExpMonth && isExpYear && isCvc) {
    const formSection = document.querySelector(".section-form");
    const successSection = document.querySelector(".section-success");
    formSection.classList.add("hide-section");
    successSection.classList.add("show-section");
  } else {
    e.preventDefault();
  }
}

function validateName(input) {
  const inputDataTarget = input.getAttribute("data-error");
  const errMsg = document.getElementById(inputDataTarget);

  let isValid = false;
  let regExp = /^[A-Za-z]+$/;
  let regExpFullName = /^[a-z ,.'-]+$/i;
  let regExpFullName2 = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+/;
  let formattedInput = input.value.trim();

  if (!input) {
    errMsg.textContent = "Can’t be blank";
  } else if (!regExpFullName.test(formattedInput)) {
    errMsg.textContent = "Name doesn't seem proper!!";
  } else {
    isValid = true;
  }
  toggleClass(
    { activeErr: "activeErr", active: "active" },
    isValid,
    input,
    errMsg
  );
  return isValid;
}
function validateNumber(input, numLength) {
  const inputDataTarget = input.getAttribute("data-error");
  const errMsg = document.getElementById(inputDataTarget);
  const regExp = /^[0-9]$/;
  let isValid = false;
  let formattedNumber = +input.value;
  if (!input.value.trim()) {
    errMsg.textContent = "Can't be blank";
  } else if (formattedNumber !== numLength) {
    errMsg.textContent = `Needs to be ${numLength} characters long!`;
  } else if (isNaN(formattedNumber)) {
    errMsg.textContent = "Wrong format, numbers only";
  } else {
    isValid = true;
  }

  toggleClass(
    { activeErr: "activeErr", active: "active" },
    isValid,
    input,
    errMsg
  );
  return isValid;
}

function validateExp(input, dataType) {
  const inputDataTarget = input.getAttribute("data-error");
  const errMsg = document.getElementById(inputDataTarget);
  let isValid = false;
  let formattedInput = input.value.trim();
  let convertedInput = Number(formattedInput);
  let isFormatted = checkFormat(convertedInput, dataType);

  console.log(inputDataTarget);
  if (!formattedInput) {
    errMsg.textContent = "Can't be blank";
  } else if (isNaN(convertedInput)) {
    errMsg.textContent = "Wrong format, numbers only";
  } else if (!isFormatted.isValid) {
    errMsg.textContent = isFormatted.errMsg;
  } else {
    isValid = true;
  }

  toggleClass(
    { activeErr: "activeErr", active: "active" },
    isValid,
    input,
    errMsg
  );

  return isValid;
}

function toggleClass(className, bool, input, textElement) {
  if (!bool) {
    input.classList.add(className.activeErr);
    textElement.classList.add(className.active);
  } else {
    input.classList.remove(className.activeErr);
    textElement.classList.remove(className.active);
  }
}
// card text changer

const dataChangers = [...document.querySelectorAll("[data-changer]")];

dataChangers.forEach((changer) => {
  const dataInitialValue = changer.getAttribute("data-initial");
  const dataTarget = changer.getAttribute("data-target");
  const dataText = document.getElementById(dataTarget);

  changer.addEventListener("input", (e) => {
    let inputValue = e.target.value.trim();
    if (changer.hasAttribute("data-separate")) {
      dataText.textContent = inputValue.replace(/(\d{4})(?!$)/g, "$1 ");
    } else {
      dataText.textContent = inputValue;
    }

    if (inputValue.length === 0) {
      dataText.textContent = dataInitialValue;
    }
  });
});

// helper functions

function checkFormat(convertedInput, dataType) {
  let status = {
    isValid: false,
    errMsg: "",
  };

  if (dataType === "month") {
    if (convertedInput < 1 || convertedInput > 12) {
      status.errMsg = "month needs to be between 1 and 12";
    } else {
      status.isValid = true;
    }
  } else if (dataType === "year") {
    if (getCurrentYear() > convertedInput) {
      status.errMsg = "expiration date needs to be in the future";
    } else {
      status.isValid = true;
    }
  }
  return status;
}
function getCurrentYear() {
  const currentYear = new Date().getFullYear();
  let currentYearArray = [...currentYear.toString()].reverse();
  let formattedYY = Number(currentYearArray[0] + currentYearArray[1]);

  return formattedYY;
}
function getCurrentMonth() {
  const currentMonth = new Date().getMonth() + 1;
}
getCurrentMonth();
