// read form element
let ALL_INPUT_VALID;

const form = document.getElementById('form');
const email = document.getElementById('email');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');
const phoneNumber = document.getElementById('phoneNumber');
const password = document.getElementById('password');


// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
        ALL_INPUT_VALID = false;
    }
}

//Age restriction
function checkAge(input){
    if (input.value >= 12){
        showSuccess(input);
    }
    else {
        showError(input,'Sie müssen mind. 12 Jahre alt sein um sich registrieren zu können');
        ALL_INPUT_VALID = false;
    }
}

//Check Phonenumber
function checkNumber(input) {
    const re = /^0(2[1-246-7]|3[1-4]|4[13-4]|5[25-6]|6[1-2]|7[15-68-9]|8[17]|91)[0-9]{7}/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Telefonnummer ist nicht korrekt. Tipp: Schreibe sie ohne Leerzeichen');
        ALL_INPUT_VALID = false;
    }
}

//Validate password
function checkPassword(input){
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    }
    else {
        showError(input, 'Passwort muss zwischen 7 bis 15 Zeichen lang sein und mind. eine Nummer und ein Spezialzeichen beinhalten');
        ALL_INPUT_VALID = false;
    }
}

// Check required fields
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            isRequired = true;
            ALL_INPUT_VALID = false;
        } else {
            showSuccess(input);
        }
    });

    return isRequired;
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
        ALL_INPUT_VALID = false;
    } else if (input.value.length > max) {
        showError(input,
            `${getFieldName(input)} must be less than ${max} characters`
        );
        ALL_INPUT_VALID = false;
    } else {
        showSuccess(input);
    }
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Validate form input elements
function validateForm() {
    if (!checkRequired([email, firstName, lastName, age, phoneNumber, password ])) {
        checkLength(firstName, 3, 20);
        checkLength(lastName, 3, 20);
        checkEmail(email);
        checkAge(age);
        checkNumber(phoneNumber);
        checkPassword(password);
    }
}

/**
 * Make a testcall after the page is loaded
 */
window.onload = () => {
    console.log(`Make test call to the server ...`);
    getWelcome().then(
        result => {
            console.log(`Response from server: ${result}`);
        },
        error => {
            console.log(error)
        });
}


// Event listeners
form.addEventListener('submit', function (e) {
    ALL_INPUT_VALID = true;
    //https://www.w3schools.com/jsref/event_preventdefault.asp
    e.preventDefault();
    //First validate form
    validateForm();
    //Send data
    if (ALL_INPUT_VALID) {
        let formData = {
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value,
            age: age.value,
            phoneNumber: phoneNumber.value,
            password: password.value
        }
        console.log(`All input is valid. Send data to server: 
      ${JSON.stringify(formData)}`);

        //Variant 1
        sendForm1(formData);
        //Variant 2
        sendForm2(formData).then(
            result => {
                console.log(`Response from server: ${result}`);
                window.location.href = './confirm.html';
            }).catch(err => {
            console.log(`Error occurred: ${err}`)
        });
    } else {
        console.log("At least one validation failed. No data sent to contact-server.");
    }

});
