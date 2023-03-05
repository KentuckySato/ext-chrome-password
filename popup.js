/**
 * Generate Password
 *
 * @file popup.js
 * @description This file contains the code for the popup page
 * @author Kentucky SATO
 */
function generatePassword() {
    let characters = optionsChoosed();

    let passwordLength = document.getElementById("lenght_password").value; // Length of the password
    let password = "";

    // Loop to generate the password
    for(let i = 0; i < passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * characters.length);
        password += characters.substring(randomNumber, randomNumber + 1);
    }

    // Store the password in the local storage
    storePwdInLocalStorage(password);

    // Display the password in the text box
    document.getElementById("password").value = password;
}

/**
 * Check the options selected by the user
 *
 * @returns {string} - The characters to use for the password
 */
function optionsChoosed() {
    let characters = '';
    // Possibles characters for the password
    let optionsTypes = {
        lowercaseChars: "abcdefghijklmnopqrstuvwxyz",
        uppercaseChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        numberChars: "0123456789",
        symbolChars: "!@#$%^&*()_+-=[]{}|;':\"<>,.?/"
    }

    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (Array.from(checkboxes).every(cb => cb.checked)) {
        characters = optionsTypes.lowercaseChars + optionsTypes.uppercaseChars + optionsTypes.numberChars + optionsTypes.symbolChars;
    } else {
        if (document.getElementById("lowercase").checked) {
            characters += optionsTypes.lowercaseChars;
        }
        if (document.getElementById("uppercase").checked) {
            characters += optionsTypes.uppercaseChars;
        }
        if (document.getElementById("numbers").checked) {
            characters += optionsTypes.numberChars;
        }
        if (document.getElementById("specialChars").checked) {
            characters += optionsTypes.symbolChars;
        }
    }

    storeOptionsInLocalStorage();

    return characters;
}

function checkOptions() {
    let checked = 0;
    // Check options if they are checked in the local storage
    if (localStorage.getItem("useLowercase") == "true") {
        document.getElementById("lowercase").checked = true;
        checked++;
    }
    if (localStorage.getItem("useUppercase") == "true") {
        document.getElementById("uppercase").checked = true;
        checked++;
    }
    if (localStorage.getItem("useNumbers") == "true") {
        document.getElementById("numbers").checked = true;
        checked++;
    }
    if (localStorage.getItem("useSpecialChars") == "true") {
        document.getElementById("specialChars").checked = true;
        checked++;
    }

    // If checked === 0 then checked lowercase and uppercase
    if (checked === 0) {
        document.getElementById("lowercase").checked = true;
        document.getElementById("uppercase").checked = true;
    }
}

/**
 * Check if at least one option is checked
 *
 * @returns {boolean} - True if at least one option is checked, false otherwise
 */
function isOptionChecked() {
    let lowercaseChecked = document.getElementById("lowercase").checked;
    let uppercaseChecked = document.getElementById("uppercase").checked;
    let numbersChecked = document.getElementById("numbers").checked;
    let specialCharsChecked = document.getElementById("specialChars").checked;

    return lowercaseChecked || uppercaseChecked || numbersChecked || specialCharsChecked;
}

/**
 * Copy the password to the clipboard
 */
function copyPasswordToClipboard() {
    let password = document.getElementById("password").value;
    navigator.clipboard.writeText(password);

    // Display the tooltip "Copied!"
    displayTooltip('Copied!');
}

/**
 * Display the tooltip "Copied!"
 * @param {string} message - The message to display
 */
function displayTooltip(message) {
    let tooltip = document.getElementById('tooltip');
    tooltip.innerHTML = message;
    tooltip.classList.add('show');

    // Hide the tooltip after a few seconds
    setTimeout(function() {
        tooltip.classList.remove('show');
    }, 2000);
}

/**
 * Store the password in the local storage
 */
function storePwdInLocalStorage(password) {
    // Store the password in the local storage
    localStorage.setItem('copiedPassword', password);
}

/**
 * Store the options in the local storage
 */
function storeOptionsInLocalStorage() {
    // Stocker les options cochées dans le localStorage
    if (document.getElementById("lowercase").checked) {
        localStorage.setItem("useLowercase", "true");
    } else {
        localStorage.removeItem("useLowercase");
    }

    if (document.getElementById("uppercase").checked) {
        localStorage.setItem("useUppercase", "true");
    } else {
        localStorage.removeItem("useUppercase");
    }

    if (document.getElementById("numbers").checked) {
        localStorage.setItem("useNumbers", "true");
    } else {
        localStorage.removeItem("useNumbers");
    }

    if (document.getElementById("specialChars").checked) {
        localStorage.setItem("useSpecialChars", "true");
    } else {
        localStorage.removeItem("useSpecialChars");
    }

    localStorage.setItem("lenghtPassword", document.getElementById("lenght_password").value);

}

// Execute the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById('password');
    const passwordLengthInput = document.getElementById('lenght_password');
    const passwordValueInput = document.getElementById('value');

    // Get the password from the local storage
    const storedPassword = localStorage.getItem('copiedPassword');

    // If the password exists in the local storage, we display it
    if (storedPassword) {
        passwordInput.value = storedPassword;
        passwordLengthInput.value = storedPassword.length;
        passwordValueInput.textContent = storedPassword.length;
    }

    // Display the value of the range
    const valueRange = document.querySelector("#value")
    const inputRange = document.querySelector("#lenght_password")
    valueRange.textContent = inputRange.value
    inputRange.addEventListener("input", (event) => {
        valueRange.textContent = event.target.value
    });

    checkOptions();

    // Call the function generatePassword() when we click on the "Generate" button
    document.getElementById("generate").addEventListener("click", generatePassword);

    // Call the function generatePassword() when we change the value of the range
    document.getElementById("lenght_password").addEventListener("input", generatePassword);

    // Call the function generatePassword() when we change the value of the checkboxes
    let options = document.querySelectorAll('input[type="checkbox"]');
    options.forEach(function (option) {
        option.addEventListener("change", generatePassword);
    });

    // Call the function copyPasswordToClipboard() when we click on the "Copy" button
    document.getElementById("copy").addEventListener("click", copyPasswordToClipboard);

    // Call the function generatePassword() when we load the page
    // if the password doesn't exist in the local storage
    if (! storedPassword) {
        generatePassword();
    }
});
