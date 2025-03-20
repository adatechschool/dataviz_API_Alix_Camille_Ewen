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
let messageJournee = document.querySelector("#messageAccueil")


function messageAccueil() {
  const aujourdhui = new Date()
  let heureActuelle = aujourdhui.getHours()
  // On déclare la variable dans la fonction
  let message ;
  if (heureActuelle >= 8 && heureActuelle <12) {
    message = "Bon matin !"
  } else if (heureActuelle >=12 && heureActuelle <14) {
    message = "Bon appétit !"
  } else if (heureActuelle >=14 && heureActuelle <18){
    message = "Bon après-midi !"
  } else if (heureActuelle >=18 && heureActuelle <19){
    message = "Bonne soirée !"
  } else {
    console.log("c'est la nuit")
    message = ""
  }
  // On ajoute le txt au HTML
  messageJournee.innerHTML = `${message}`
}
messageAccueil()
setInterval(messageAccueil, 1000);

// Horloge digitale
function afficherHeure() {
  const aujourdhui = new Date()
  let heures = aujourdhui.getHours()
  let minutes = aujourdhui.getMinutes();
  let secondes = aujourdhui.getSeconds();
  
  if (heures < 10) {
    heures = "0" + heures;
  } 
  if (minutes < 10) {
    minutes = "0" + minutes;
  } 
  if (secondes < 10) {
    secondes = "0" + secondes;
  }
  
  document.getElementById("hour").innerHTML = `${heures}:`;
  document.getElementById("minute").innerHTML = `${minutes}:`;
  document.getElementById("second").innerHTML = `${secondes}`;
}  
setInterval(afficherHeure, 500);

// Barre de progression
function barreProgression(){
  const aujourdhui = new Date()
  const heureOuverture = new Date()
  heureOuverture.setHours(8, 30)
  let taux = aujourdhui-heureOuverture
  let heures = aujourdhui.getHours()
  let minutes = aujourdhui.getMinutes();
  
  if((heures >=8 && minutes >=30) || (heures <=18 && minutes <=30)) {
    let barreProgression = 0;
    barreProgression = Math.round(100*taux/36000000)
    document.getElementById("progressBar").style.width = barreProgression + "%";
  } 
}
barreProgression()
setInterval(barreProgression, 1000)

// Requête API
const station = document.querySelector("#station")
const adresseStation = document.querySelector("#adresseStation")
const velosDispo = document.querySelector("#velosDispo")
const placesDispo = document.querySelector("#placesDispo")

async function appelApi() {
  let requete = "https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_disponibilite-temps-reel-velos-libre-service-naolib-nantes-metropole/records?where=name%3D%22MOUTONNERIE%22&limit=1"; 
  let data = await fetch(requete)
  let response = await data.json()

  const { name, available_bike_stands, available_bikes, address } = response.results[0];

  station.textContent = `Station : ${name}`
  adresseStation.textContent = `Adresse : ${address}`
  velosDispo.textContent = `👉${available_bikes} vélos disponibles !`
  placesDispo.textContent = `👉${available_bike_stands} places disponibles !`
}
setInterval(appelApi, 1000)