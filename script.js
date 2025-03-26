const DATE_DU_JOUR = document.querySelector("#date");

// Const API Bicloo
const STATION = document.querySelector("#station");
const ADRESSE_STATION = document.querySelector("#adresseStation");
const VELOS_DISPO = document.querySelector("#velosDispo");
const PLACES_DISPO = document.querySelector("#placesDispo");

// Const API Météo
const TEMPERATURE_LOCALE = document.querySelector("#temperature");
const ZONE_COUCHER_SOLEIL = document.querySelector("#coucherSoleil");
const TEXTE_COUCHER_SOLEIL = document.querySelector("#texteCoucherSoleil");

// Const API Tram
const LIGNE_TRAM = document.querySelector("#ligne");
const TERMINUS_TRAM = document.querySelector("#terminus");
const TEMPS_TRAM = document.querySelector("#temps");

const JOURS_DE_LA_SEMAINE = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];
const LISTE_MOIS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

function afficherDate() {
  const aujourdhui = new Date();
  const indexJour = aujourdhui.getDay();
  const jourDeLaSemaine = JOURS_DE_LA_SEMAINE[indexJour];
  const jourDuMois = aujourdhui.getDate();
  const indexMois = aujourdhui.getMonth();
  const moisDelAnnee = LISTE_MOIS[indexMois];

  //On affiche la date du jour dans le header
  DATE_DU_JOUR.innerHTML = `${jourDeLaSemaine} ${jourDuMois} ${moisDelAnnee} chez`;
}

function messageAccueil() {
  let messageJournee = document.querySelector("#messageAccueil");
  const aujourdhui = new Date();
  let heureActuelle = aujourdhui.getHours();

  let message;
  if (heureActuelle >= 8 && heureActuelle < 12) {
    message = "Bon matin !";
  } else if (heureActuelle >= 12 && heureActuelle < 14) {
    message = "Bon appétit !";
  } else if (heureActuelle >= 14 && heureActuelle < 18) {
    message = "Bon après-midi !";
  } else if (heureActuelle >= 18 && heureActuelle < 19) {
    message = "Bonne soirée !";
  } else {
    message = "";
  }
  // On ajoute le txt au HTML
  messageJournee.innerHTML = `${message}`;
}

// Horloge digitale
function afficherHeure() {
  const aujourdhui = new Date();
  let heures = aujourdhui.getHours();
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

  document.querySelector("#horloge").innerHTML =  `${heures}:${minutes}:${secondes}`;
}

// Barre de progression
function barreProgression() {
  const aujourdhui = new Date();
  const heureOuverture = new Date();
  heureOuverture.setHours(8, 30);

  
  const taux = aujourdhui - heureOuverture;
  const heures = aujourdhui.getHours();
  const minutes = aujourdhui.getMinutes();

  if ((heures >= 8 && minutes >= 30) || (heures <= 18 && minutes <= 30)) {
    let barreProgression = 0;
    barreProgression = Math.round((100 * taux) / 36000000);
    document.getElementById("progressBar").style.width = barreProgression + "%";
  }
}

// Requête API Bicloo
async function appelApiBicloo() {
  let requete =
    "https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_disponibilite-temps-reel-velos-libre-service-naolib-nantes-metropole/records?where=name%3D%22MOUTONNERIE%22&limit=1";
  let data = await fetch(requete);
  let response = await data.json();

  const { name, available_bike_stands, available_bikes, address } =
    response.results[0];

  STATION.textContent = `Station : ${name}`;
  ADRESSE_STATION.textContent = `Adresse : ${address}`;
  available_bikes <= 1
    ? (VELOS_DISPO.textContent = `👉 ${available_bikes} vélo disponible !`)
    : (VELOS_DISPO.textContent = `👉 ${available_bikes} vélos disponibles !`);
  PLACES_DISPO <= 1
    ? (PLACES_DISPO.textContent = `👉 ${available_bike_stands} place disponible !`)
    : (PLACES_DISPO.textContent = `👉 ${available_bike_stands} places disponibles !`);
}

//Requête API Météo
async function appelApiMeteo() {
  //Lien pour coordonnées ADA, heure sunset, température actuelle, probabilité de précipitation par 15mins
  let address =
    "https://api.open-meteo.com/v1/forecast?latitude=47.2199&longitude=-1.5325&daily=sunset&models=meteofrance_seamless&current=temperature_2m&minutely_15=precipitation_probability&timezone=Europe%2FLondon&forecast_days=1";
  let promise = await fetch(address);
  let data = await promise.json();

  const { current, current_units, daily } = data;

  //J'affiche la température locale et son unité
  TEMPERATURE_LOCALE.textContent = `🌡 ${current.temperature_2m}${current_units.temperature_2m}`;

  //Je récupère l'heure du coucher de soleil et transforme le format en Date, puis calcule la durée d'ensoleillement restant.
  const coucherSoleil = daily.sunset[0];

  let formatDateCoucherSoleil = new Date();
  formatDateCoucherSoleil.setHours(coucherSoleil[11] + coucherSoleil[12]);
  formatDateCoucherSoleil.setMinutes(coucherSoleil[14] + coucherSoleil[15]);

  let dureeSoleilMilliS = formatDateCoucherSoleil - new Date();

  if (dureeSoleilMilliS <= 0){
    ZONE_COUCHER_SOLEIL.textContent = "🌛";
    TEXTE_COUCHER_SOLEIL.textContent = "";
  } else {  
    let heuresSoleil = Math.floor(dureeSoleilMilliS / 1000 / 60 / 60) % 24;
    let minutesSoleil = Math.floor(dureeSoleilMilliS / 1000 / 60) % 60;
  
    if (minutesSoleil < 10) {
      ZONE_COUCHER_SOLEIL.textContent = `🌆 ${heuresSoleil}h0${minutesSoleil}`;
    } else {
      ZONE_COUCHER_SOLEIL.textContent = `🌆 ${heuresSoleil}h${minutesSoleil}`;
    }
  }

}

// Requête API Tram
async function appelApiTram() {
  let requete = "https://open.tan.fr/ewp/tempsattente.json/MOUT";
  let data = await fetch(requete);
  let response = await data.json();

  const { terminus, temps, ligne } = response[0];

  LIGNE_TRAM.textContent = `Ligne : ${ligne.numLigne}`;
  TERMINUS_TRAM.textContent = `Terminus : ${terminus}`;
  temps === ""
    ? (TEMPS_TRAM.textContent = "A venir...")
    : (TEMPS_TRAM.textContent = `👉 ${temps}`);
}

function lancerAdaApp() {
  afficherDate();
  barreProgression();
  appelApiBicloo();
  appelApiMeteo();

  setInterval(messageAccueil, 1000);
  setInterval(afficherHeure, 1000);
  setInterval(barreProgression, 1000);
  setInterval(appelApiBicloo, 300000);
  setInterval(appelApiMeteo, 3600000);
  setInterval(appelApiTram, 1000);
}
lancerAdaApp();
