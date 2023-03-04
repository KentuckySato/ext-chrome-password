/**
 * Generate Password
 *
 * @file popup.js
 * @description This file contains the code for the popup page
 * @author Kentucky SATO
 */
function generatePassword() {
    // Possibles characters for the password
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let passwordLength = document.getElementById("lenght_password").value; // Length of the password
    let password = "";

    // Loop to generate the password
    for(let i = 0; i < passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * characters.length);
        password += characters.substring(randomNumber, randomNumber + 1);
    }

    // Display the password in the text box
    document.getElementById("password").value = password;
}

// Execute the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const valueRange = document.querySelector("#value")
    const inputRange = document.querySelector("#lenght_password")
    valueRange.textContent = inputRange.value
    inputRange.addEventListener("input", (event) => {
        valueRange.textContent = event.target.value
    })

    // Call the function generatePassword() when we click on the "Generate" button
    document.getElementById("generate").addEventListener("click", generatePassword);

    // Call the function generatePassword() when we change the value of the range
    document.getElementById("lenght_password").addEventListener("input", generatePassword);

    // Call the function generatePassword() when we load the page
    generatePassword();
});
