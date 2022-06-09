
//focusing in on the first element of the form when the page loads
let firstName = document.getElementById('name')
firstName.focus();

//elements with variable names
const jobTitle = document.getElementById('title');
const otherJob = document.getElementById('other-job-role');
const colorSelection = document.getElementById('color');
const designSelection = document.getElementById('design');
const childColor = colorSelection.children;
const activities = document.getElementById('activities');
const activitiesCost = document.getElementById('activities-cost');
let totalCost = 0;




//Job Role: Sets the otherjob element to hidden until a change is detected in the Job Title that is equal to other-job-role.
//If the other role is selected then an input box appears
 otherJob.style.display = 'none';

jobTitle.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJob.style.display='block';
    } else {
        otherJob.style.display='none';
    }
});

//T-Shift Info Section
//
colorSelection.disabled=true;

designSelection.addEventListener('change', (e) => {
    colorSelection.disabled=false;
    for (let i = 0; i < childColor.length; i++ ) {
        let tValue = e.target.value;//either JS Puns or I heart JS
        let child = childColor[i];
        let shirtTheme = child.getAttribute('data-theme');
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

activities.addEventListener('change', (e) => {
    // eventCost = parseInt(e.target.getAttribute("data-cost"),10);
    eventCost = +e.target.getAttribute("data-cost");
    console.log(eventCost)
    const checked = eventCost.checked;
    if (checked === true) {
        totalCost += eventCost;

    } else {
        totalCost -= eventCost;
    }

    console.log(totalCost)
    console.log(checked);


});


// const checkbox = e.target;
// const checked = checkbox.checked;
// const listItem = checkbox.parentNode.parentNode;

// if (checked) {
//   listItem.className = 'responded';
// } else {
//   listItem.className = '';
// }