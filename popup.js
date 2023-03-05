/**
 * Generate Password
 *
 * @file popup.js
 * @description This file contains the code for the popup page
 * @author Kentucky SATO
 */
function generatePassword() {
    // Possibles characters for the password
    let lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    let uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numberChars = "0123456789";
    let symbolChars = "!@#$%^&*()_+-=[]{}|;':\"<>,.?/";

    let characters = lowercaseChars + uppercaseChars + numberChars + symbolChars;

    let passwordLength = document.getElementById("lenght_password").value; // Length of the password
    let password = "";

    // Loop to generate the password
    for(let i = 0; i < passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * characters.length);
        password += characters.substring(randomNumber, randomNumber + 1);
    }

    // Store the password in the local storage
    storeInLocalStorage(password);

    // Display the password in the text box
    document.getElementById("password").value = password;
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
function storeInLocalStorage(password) {
    // Stockage du mot de passe dans le localStorage
    localStorage.setItem('copiedPassword', password);
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

    // Call the function generatePassword() when we click on the "Generate" button
    document.getElementById("generate").addEventListener("click", generatePassword);

    // Call the function generatePassword() when we change the value of the range
    document.getElementById("lenght_password").addEventListener("input", generatePassword);

    // Call the function copyPasswordToClipboard() when we click on the "Copy" button
    document.getElementById("copy").addEventListener("click", copyPasswordToClipboard);

    // Call the function generatePassword() when we load the page
    // if the password doesn't exist in the local storage
    if (! storedPassword) {
        generatePassword();
    }
});
