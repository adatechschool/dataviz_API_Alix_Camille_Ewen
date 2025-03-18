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
dateDuJour.innerHTML = `${jourDeLaSemaine} ${jourDuMois} ${moisDelAnnee} chez Ada !`