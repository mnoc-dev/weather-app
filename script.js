import { cityConfig } from './config.js';

const cityElement = document.getElementById("city");
const tempElement = document.getElementById("temperature");
const windElement = document.getElementById("wind");
const conditionElement = document.getElementById("condition");
const updateElement = document.getElementById("update-time");

const weatherCodes = {
  0: "Ciel dégagé",
  1: "Peu nuageux",
  2: "Nuageux",
  3: "Couvert",
  45: "Brouillard",
  48: "Brouillard givrant",
  51: "Bruine légère",
  53: "Bruine modérée",
  55: "Bruine dense",
  61: "Pluie faible",
  63: "Pluie modérée",
  65: "Pluie forte",
  71: "Neige faible",
  73: "Neige modérée",
  75: "Neige forte",
  80: "Averses faibles",
  81: "Averses modérées",
  82: "Averses fortes"
};

// Fonction pour récupérer le nom de la ville depuis latitude/longitude
async function getCityName(lat, lon) {
  const url = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&language=fr&count=1`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].name;
    } else {
      return "Inconnue";
    }
  } catch (error) {
    console.error("Erreur géocodage :", error);
    return "Inconnue";
  }
}

// Fonction pour récupérer la météo
async function updateWeather() {
  // Récupérer le nom de la ville dynamiquement
  const cityName = await getCityName(cityConfig.latitude, cityConfig.longitude);
  cityElement.textContent = cityName;

  // URL Open-Meteo
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&current_weather=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const weather = data.current_weather;

    tempElement.textContent = weather.temperature;
    windElement.textContent = weather.windspeed;
    conditionElement.textContent = weatherCodes[weather.weathercode] || "Inconnu";
    updateElement.textContent = new Date().toLocaleTimeString('fr-FR');
  } catch (error) {
    console.error("Erreur météo :", error);
    tempElement.textContent = "Erreur";
    windElement.textContent = "-";
    conditionElement.textContent = "-";
    updateElement.textContent = "-";
  }
}

// Premier chargement
updateWeather();

// Rafraîchissement toutes les heures
setInterval(updateWeather, 3600000);