let userName = document.getElementById("txtUserName");
let email = document.getElementById("txtEmail");
let phone = document.getElementById("txtPhone");
let pwd = document.getElementById("txtPwd");
let conPwd = document.getElementById("txtConPwd");
let form = document.querySelector("form");


document.addEventListener("DOMContentLoaded", function () {
    // Set initial visibility of error messages to hidden
    document.querySelectorAll(".text-danger").forEach(function (small) {
        small.style.visibility = "hidden";
    });
});
// Event listener for form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();
    validateInput();
});

// Event listeners for input changes
userName.addEventListener("input", function () {
    validateSingleInput(userName);
});

email.addEventListener("input", function () {
    validateSingleInput(email);
});

phone.addEventListener("input", function () {
    validateSingleInput(phone);
});

pwd.addEventListener("input", function () {
    validateSingleInput(pwd);
});

conPwd.addEventListener("input", function () {
    validateSingleInput(conPwd);
});

// Function to validate a single input field
function validateSingleInput(input) {
    if (input === conPwd) {
        // If validating confirm password, check if it matches password
        if (pwd.value.trim() !== conPwd.value.trim()) {
            onError(conPwd, "Password & Confirm password not matching");
        } 
        else if(conPwd.value.trim()===""){
            onError(conPwd,"Confirm Password cannot be empty");
        }
        else {
            onSuccess(conPwd);
        }
    } else {
        // For other input fields, perform generic validation
        if (input.value.trim() === "") {
            onError(input, `${getFieldName(input)} cannot be empty`);
        } else {
            const validationFunction = getValidationFunction(input);
            if (!validationFunction(input.value.trim())) {
                onError(input, getErrorMessage(input));
            } else {
                onSuccess(input);
            }
        }
    }
}

// Function to validate all input fields
function validateInput() {
    const inputFields = [userName, email, phone, pwd, conPwd];
    inputFields.forEach(validateSingleInput);
}

// Function to get the field name for error messages
function getFieldName(input) {
    return input.getAttribute("name");
}

// Function to get the validation function based on the input field
function getValidationFunction(input) {
    switch (input) {
        case userName:
            return isValidUserName;
        case email:
            return isValidEmail;
        case phone:
            return isValidPhone;
        case pwd:
            return isValidPassword;
        default:
            return null;
    }
}

// Function to get the error message for the input field
function getErrorMessage(input) {
    switch (input) {
        case userName:
            return "Full Name must not be less than 5 characters";
        case email:
            return "Email is not valid";
        case phone:
            return "Phone number is not valid";
        case pwd:
            return "Password cannot be 'password' or 'name of the user' or less than 8 characters.";
        default:
            return "";
    }
}

// Function to handle success
function onSuccess(input) {
    let parent = input.parentElement;
    let messageEle = parent.querySelector("small");
    messageEle.style.visibility = "hidden";
    input.classList.remove("error");
    input.classList.add("success");
}

// Function to handle errors
function onError(input, message) {
    let parent = input.parentElement;
    let messageEle = parent.querySelector("small");
    messageEle.style.visibility = "visible";
    messageEle.innerText = message;
    input.classList.add("error");
    input.classList.remove("success");
}

// Validation functions

function isValidUserName(userName) {
    return userName.length > 5;
}

function isValidEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isValidPhone(phone) {
    return /^\d{10}$/.test(phone);
}

function isValidPassword(pwd) {
    return pwd !== "password" && pwd !== userName.value.trim() && pwd.length >= 8;
}