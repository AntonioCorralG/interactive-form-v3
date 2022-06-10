//focusing in on the first element of the form when the page loads
let fullName = document.getElementById("name");
fullName.focus();

//elements with variable names
const jobTitle = document.getElementById("title");
const otherJob = document.getElementById("other-job-role");
const colorSelection = document.getElementById("color");
const designSelection = document.getElementById("design");
const childColor = colorSelection.children;
const activities = document.getElementById("activities");
const costUpdate = document.querySelector("p#activities-cost");
const paymentOptions = document.getElementById("payment");
const creditCard = document.querySelector("div#credit-card");
const paypal = document.querySelector("div#paypal");
const bitcoin = document.querySelector("div#bitcoin");
const email = document.getElementById("email");
const cardNumber = document.getElementById("ccNum");
const zipCode = document.getElementById("zip");
const CVV = document.getElementById("cvv");
const formElement = document.querySelector("form");
const checkbox = document.querySelectorAll('input[type="checkbox"]');

let totalCost = 0;

// Job Role: Sets the otherjob element to hidden until a change is detected in the Job Title that is equal to other-job-role.
// If the other role is selected then an input box appears
otherJob.style.display = "none";

jobTitle.addEventListener("change", (e) => {
  if (e.target.value === "other") {
    otherJob.style.display = "block";
  } else {
    otherJob.style.display = "none";
  }
});

//T-Shift Info Section
//an event listener is created to determine when there is a change in the design element
// until there is a selection the color element is disabled
//within the event listener a for loop is used to loop through the color values and a conditional is used to determine correct shirt theme to be displayed
colorSelection.disabled = true;

designSelection.addEventListener("change", (e) => {
  colorSelection.disabled = false;
  for (let i = 0; i < childColor.length; i++) {
    let tValue = e.target.value; //either JS Puns or I heart JS
    let child = childColor[i];
    let shirtTheme = child.getAttribute("data-theme");
    //need clarification a bit here
    if (tValue === shirtTheme) {
      child.hidden = false;
      child.setAttribute("data-theme", shirtTheme);
      child.selected = true;
    } else {
      child.hidden = true;
      child.selected = false;
    }
  }
});

//Step 6: Register for Activities Section
//An event listener was created to listen for changes in the activities
//if an event is clicked that data cost attribute is targeted and added to the total cost
//this total cost then get selected and updated
activities.addEventListener("change", (e) => {
  let eventCost = +e.target.getAttribute("data-cost");
  const checkbox = e.target;
  const checked = checkbox.checked;
  if (checked) {
    totalCost += eventCost;
  } else {
    totalCost -= eventCost;
  }

  // const costUpdate = document.querySelector("p#activities-cost");
  costUpdate.innerHTML = `Total: $${totalCost}`;
});

//Payment Info Section
//in the payment info the paypal and bitcoin divs are hidden until they are selected in the payment options dropdown
//
paypal.style.display = "none";
bitcoin.style.display = "none";

paymentOptions[1].setAttribute("selected", "");

paymentOptions.addEventListener("change", (e) => {
  if (e.target.value === "paypal") {
    paypal.style.display = "block";
    bitcoin.style.display = "none";
    creditCard.style.display = "none";
  } else if (e.target.value === "bitcoin") {
    bitcoin.style.display = "block";
    paypal.style.display = "none";
    creditCard.style.display = "none";
  } else {
    creditCard.style.display = "block";
    paypal.style.display = "none";
    bitcoin.style.display = "none";
  }
});

//Part 8: Form Validation

formElement.addEventListener("submit", (e) => {
  const nameField = fullName.value;
  const nameError = isValidName(nameField);
  if (!nameError) {
    e.preventDefault();
  }

  const emailField = email.value;
  const emailError = isValidEmail(emailField);
  if (!emailError) {
    e.preventDefault();
  }

  //const activitiesField = activities.value;
  const activitiesError = areActivitesMarked(totalCost);
  if (!activitiesError) {
    e.preventDefault();
  }

  const ccField = cardNumber.value;
  const ccError = isValidCardNumber(ccField);
  if (paymentOptions === creditCard) {
    if (!ccError) {
      e.preventDefault();
    }

    const zipCodeField = zipCode.value;
    const zipError = isValidZipCode(zipCodeField);
    if (!zipError) {
      e.preventDefault();
    }

    const CVVField = CVV.value;
    const CVVError = isValidCVV(CVVField);
    if (!CVVError) {
      e.preventDefault();
    }
  }
  //debugger;
  // results =
  //     // if (
  //     //     isValidName() &&
  //     //     isValidEmail() &&
  //     //     isValidActivities() &&
  //     //      isValidCardNumber()
  //     //   ) {

  //     //     console.log("correct");
  //     //     alert("Thank you for your submission!");
  //     //   } else {
  //     //     e.preventDefault();
  //     //     isValidName();
  //     //     isValidEmail();
  //     //     isValidCardNumber();
  //     //     // isValidActivities();
  //     //     isValidCVV();
  //     //     isValidZipCode();
  //     //     //  alert("Incorrect user inputs");

  //     //     creditCard.className = 'not-valid';
  //     //     creditCard.className.remove = 'valid';
  //     //     creditCard.lastElementChild.style.display = 'initial';
  //     //     activities.className = 'not-valid';
  //     //     activities.className.remove = 'valid';
  //     //     activities.lastElementChild.style.display = 'initial';
  //     //   }
});

function isValidName(name) {
  console.log("name received is", name);

  return /^[a-z]|\d*$/i.test(name);
}

function isValidEmail(email) {
  console.log("Email received is ", email);
  return /^\[a-z]|\d|[A-Z]/.test(email);
}

function isValidActivities(activities) {
  // let activitiesBox = document.getElementById("activities-box")
  if (totalCost > 0) {
    activities.className = "valid";
    activities.lastElementChild.style.display = "none";
    activities.className.remove = "not-valid";
  } else {
    activities.className = "not-valid activities";
    activities.className.remove = "valid";
    activities.lastElementChild.style.display = "initial";
  }
}

function areActivitesMarked(totalCost) {
  return totalCost > 0 ? true : false;
}

function isValidCardNumber(ccNum) {
  console.log("credit card number is ", ccNum);
  return /^\d{4}\d{4}\d{4}\d{4}$/.test(ccNum);
}
function isValidZipCode(zip) {
  console.log("zip code is ", zip);
  return /^\d{5}$/.test(zip);
}

function isValidCVV(CVV) {
  console.log("CVV is ", CVV);
  return /^\d{3}$/.test(CVV);
}

function showOrHideTip(show, element) {
  // show element when show is true, hide when false
  if (show) {
    element.style.display = "inherit";
  } else {
    element.style.display = "none";
  }
}
//Borrowed this closure function from treehouse. Link below:
//https://teamtreehouse.com/library/validating-a-username
// function createListener(validator) {
//     return e => {
//       const text = e.target.value;
//       const valid = validator(text);
//       const showTip = text !== "" && !valid;
//       const tooltip = e.target.nextElementSibling;
//       showOrHideTip(showTip, tooltip);
//     };
//   }

// fullName.addEventListener('input',createListener(isValidName));
// email.addEventListener('input',createListener(isValidEmail));
// // activities.addEventListener('change',createListener(isValidActivity));
// cardNumber.addEventListener('input', createListener(isValidCardNumber));
// zipCode.addEventListener('input', createListener(isValidZipCode))
// CVV.addEventListener('input', createListener(isValidCVV));

//Step 9: Accesibility

for (let i = 0; i < checkbox.length; i++) {
  checkbox[i].addEventListener("focus", (e) => {
    e.target.parentElement.classList.add("focus");
  });
  checkbox[i].addEventListener("blur", (e) => {
    e.target.parentElement.classList.remove("focus");
  });
}
