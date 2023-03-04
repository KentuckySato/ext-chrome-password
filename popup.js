// Génère un mot de passe aléatoire sécurisé
function generatePassword() {
    // Caractères possibles pour le mot de passe
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let passwordLength = 20; // Longueur du mot de passe
    let password = "";

    // Boucle pour générer chaque caractère du mot de passe
    for(let i = 0; i < passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * characters.length);
        password += characters.substring(randomNumber, randomNumber + 1);
    }

    // Affiche le mot de passe généré dans le champ de texte
    document.getElementById("password").value = password;
}

document.addEventListener("DOMContentLoaded", function() {
    // Code à exécuter une fois que la page est entièrement chargée
    // Ajoutez ici votre code pour ajouter des écouteurs d'événements
    // Appelle la fonction generatePassword() lorsqu'on clique sur le bouton "Générer"
    document.getElementById("generate").addEventListener("click", generatePassword);
});
