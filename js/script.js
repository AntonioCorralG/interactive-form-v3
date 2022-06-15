//focusing in on the first element of the form when the page loads
let fullName = document.getElementById("name");
fullName.focus();

//elements assigned to variable names
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
//event listener that listens for the submit button
//if there is an error in the validation the efault is prevented

formElement.addEventListener("submit", (e) => {
  const nameError = isValidName(fullName);
  if (!nameError) {
    e.preventDefault();
  }

  const emailError = isValidEmail(email);
  if (!emailError) {
    e.preventDefault();
  }

  const activitiesError = isValidActivities(activities);
  if (!activitiesError) {
    e.preventDefault();
  }

  //groups the credit card into nested if staments to allows for the submission through bitcoin or paypal
  const ccError = isValidCardNumber(cardNumber);
  const zipError = isValidZipCode(zipCode);
  const CVVError = isValidCVV(CVV);
  if (paymentOptions.value === paymentOptions[1].value) {
    if (!ccError) {
      e.preventDefault();
    }
    if (!zipError) {
      e.preventDefault();
    }

    if (!CVVError) {
      e.preventDefault();
    }
  }
});




//each function below tests whether the input by the user meets the regex requirement
//if it does then it returns true to the event listener above and
//if it does not pass then it returns false and prevents the default loading--in this case it also adds not valid so the user can easily identify the error
function isValidName(fullName) {
  let nameRegEx = /^[a-z]|\\Sd*$/i.test(fullName.value);
  if (nameRegEx === true) {
    fullName.parentNode.className = "valid";
    fullName.parentNode.lastElementChild.style.display = "none";
    fullName.parentNode.className.remove = "not-valid";
    return true;
  } else {
    fullName.parentNode.className = "not-valid";
    fullName.parentNode.className.remove = "valid";
    fullName.parentNode.lastElementChild.style.display = "initial";
    return false;
  }
}

function isValidEmail(email) {
  let emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email.value);
  if (emailRegEx) {
    email.parentNode.className = "valid";
    email.parentNode.lastElementChild.style.display = "none";
    email.parentNode.className.remove = "not-valid";
    return true;
  } else {
    email.parentNode.className = "not-valid";
    email.parentNode.className.remove = "valid";
    email.parentNode.lastElementChild.style.display = "initial";
    return false;
  }
}
function isValidActivities(activities) {
  if (totalCost > 0) {
    activities.className = "valid activities";
    activities.lastElementChild.style.display = "none";
    activities.className.remove = "not-valid";
    return true;
  } else {
    activities.className = "not-valid activities ";
    activities.className.remove = "valid";
    activities.lastElementChild.style.display = "initial";
    return false;
  }
}

function isValidCardNumber(cardNumber) {
  let cardNumRegEx = /^\d{13,16}$/.test(cardNumber.value);
  if (cardNumRegEx) {
    cardNumber.parentNode.className = "valid";
    cardNumber.parentNode.lastElementChild.style.display = "none";
    cardNumber.parentNode.className.remove = "not-valid";
    return true;
  } else {
    cardNumber.parentNode.className = "not-valid";
    cardNumber.parentNode.className.remove = "valid";
    cardNumber.parentNode.lastElementChild.style.display = "initial";
    return false;
  }
}
function isValidZipCode(zipCode) {
  let zipRegEx = /^\d{5}$/.test(zipCode.value);
  if (zipRegEx) {
    zipCode.parentNode.className = "valid";
    zipCode.parentNode.lastElementChild.style.display = "none";
    zipCode.parentNode.className.remove = "not-valid";
    return true;
  } else {
    zipCode.parentNode.className = "not-valid";
    zipCode.parentNode.className.remove = "valid";
    zipCode.parentNode.lastElementChild.style.display = "initial";
    return false;
  }
}
function isValidCVV(CVV) {
  let CVVRegEx = /^\d{3}$/.test(CVV.value);
  if (CVVRegEx) {
    CVV.parentNode.className = "valid";
    CVV.parentNode.lastElementChild.style.display = "none";
    CVV.parentNode.className.remove = "not-valid";
    return true;
  } else {
    CVV.parentNode.className = "not-valid";
    CVV.parentNode.className.remove = "valid";
    CVV.parentNode.lastElementChild.style.display = "initial";
    return false;
  }
}

//Step 9: Accesibility
//Runs a loop for the clicked checkbox to ad a focus and help the user see selections
for (let i = 0; i < checkbox.length; i++) {
  checkbox[i].addEventListener("focus", (e) => {
    e.target.parentElement.classList.add("focus");
  });
  checkbox[i].addEventListener("blur", (e) => {
    e.target.parentElement.classList.remove("focus");
  });
}



