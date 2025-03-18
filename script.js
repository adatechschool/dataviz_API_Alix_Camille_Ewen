const dateDuJour = document.querySelector("#date");
const joursDeLaSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
const listeMois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

const nouvelleDate = new Date();

// On récupère le jour de la semaine
const indexJour = nouvelleDate.getDay();
const jourDeLaSemaine = joursDeLaSemaine[indexJour];

// On récupère le jour du mois
const jourDuMois = nouvelleDate.getDate();


//On récupère le mois
const indexMois = nouvelleDate.getMonth();
const moisDelAnnee = listeMois[indexMois];

//On affiche la date du jour dans le header
dateDuJour.innerHTML = `${jourDeLaSemaine} ${jourDuMois} ${moisDelAnnee} chez`

// On récupère la class container dans le HTML
let messageJournee = document.querySelector("#message")

//  On recupère les heures de la date du jour
let heureActuelle = nouvelleDate.getHours()

function messageAccueil() {
    // On déclare la variable dans la fonction
    let greeting ;
    if (heureActuelle >= 8 && heureActuelle <12) {
        greeting = "Bon matin !"
    } else if (heureActuelle >=12 && heureActuelle <14) {
        greeting = "Bon appétit !"
    } else if (heureActuelle >=14 && heureActuelle <18){
        greeting = "Bon après-midi !"
    } else if (heureActuelle >=18 && heureActuelle <19){
        greeting = "Bonne soirée !"
    } else {
        console.log("c'est la nuit")
        greeting = ""
    }
    // On ajoute le txt au HTML
    messageJournee.innerHTML = `<h1>${greeting}</h1>`
}
messageAccueil()
//setInterval(messageAccueil, 60000);

// Horloge digitale
function afficherHeure() {

    let minutes = nouvelleDate.getMinutes();
    let secondes = nouvelleDate.getSeconds();
    
    if (heureActuelle < 10) {
      heureActuelle = "0" + heureActuelle;
    } else if (minutes < 10) {
      minutes = "0" + minutes;
    } else if (secondes < 10) {
      secondes = "0" + secondes;
    }
    
    document.getElementById("hour").innerHTML = `${heureActuelle}:`;
    document.getElementById("minute").innerHTML = `${minutes}:`;
    document.getElementById("second").innerHTML = `${secondes}`;
  }
  
  setInterval(afficherHeure, 500);