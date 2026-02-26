function getCityLatLng(cityName) {
const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=en&format=json`;

  return fetch(url)
    .then(response => response.json())
    .then(json => ({
      latitude: json.results[0].latitude,
      longitude: json.results[0].longitude,
    }))
}

async function Weather() {
const latLng = await getCityLatLng(CONFIG.city)
const url = `https://api.open-meteo.com/v1/forecast?latitude=${latLng.latitude}&longitude=${latLng.longitude}&current_weather=true&hourly=weather_code&timezone=auto`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weather = data.current_weather;
      console.log(data.current_weather);
      document.getElementById("city-name").textContent = CONFIG.city;
      document.getElementById("event").textContent = CONFIG.event;
      document.getElementById("event-time").textContent = CONFIG.eventTime;
      document.getElementById("event-date").textContent = CONFIG.eventDate;
      document.getElementById("event-place").textContent = CONFIG.eventPlace;
      
      document.getElementById("temperature").textContent = (Math.ceil(weather.temperature));
      document.getElementById("windspeed").textContent = weather.windspeed;
      document.getElementById("time").textContent = weather.time.split("T")[1];
      const date = weather.time.split("T")[0];
      const dateDuJour = new Date (date);
      document.getElementById("date").textContent = dateDuJour.toLocaleDateString("fr-FR");
      const weatherCode = weather.weathercode;
      const dayNight = Number(weather.is_day);
     if (weatherCode === 0 ){
      document.getElementById("code-meteo-info").textContent = "Ciel clair";
      document.getElementById("day-night-icon").src = "icons/01d.svg";
        if(dayNight === 0){
          document.getElementById("code-meteo-info").textContent = "Ciel clair";
          document.getElementById("day-night-icon").src = "icons/01n.svg";
      }
     }
     else if (weatherCode === 1 ){
      document.getElementById("code-meteo-info").textContent = "Ciel généralement dégagé";
      document.getElementById("day-night-icon").src = "icons/02d.svg";
           if(dayNight === 0){
            document.getElementById("code-meteo-info").textContent = "Ciel généralement dégagé";
            document.getElementById("day-night-icon").src = "icons/02n.svg";
      }
     }
     else if (weatherCode === 2){
      document.getElementById("code-meteo-info").textContent = "Partiellement nuageux";
      document.getElementById("day-night-icon").src = "icons/02d.svg";
           if(dayNight === 0){
            document.getElementById("code-meteo-info").textContent = "Partiellement nuageux";
            document.getElementById("day-night-icon").src = "icons/02n.svg";
      }
     }
     else if (weatherCode === 3){
      document.getElementById("code-meteo-info").textContent = "Nuageux";
      document.getElementById("day-night-icon").src = "icons/03d.svg";
     }
     else if (weatherCode >= 45 && weatherCode <= 48){
      document.getElementById("code-meteo-info").textContent = "Brouillard";
      document.getElementById("day-night-icon").src = "icons/50d.svg";
      }
       else if (weatherCode >=51 && weatherCode <= 55){
      document.getElementById("code-meteo-info").textContent = "Bruine";
      document.getElementById("day-night-icon").src = "icons/10d.svg";
     }
       else if (weatherCode >=56 && weatherCode <= 57){
      document.getElementById("code-meteo-info").textContent = "Bruine et verglas";
      document.getElementById("day-night-icon").src = "icons/10d.svg";
     }
       else if (weatherCode >=61 && weatherCode <= 65){
      document.getElementById("code-meteo-info").textContent = "Pluie";
      document.getElementById("day-night-icon").src = "icons/10d.svg";
     }
       else if (weatherCode >=66 && weatherCode <= 67){
      document.getElementById("code-meteo-info").textContent = "Pluie et verglas";
      document.getElementById("day-night-icon").src = "icons/10d.svg";
     }
       else if (weatherCode >=71 && weatherCode <= 75){
      document.getElementById("code-meteo-info").textContent = "Neige";
      document.getElementById("day-night-icon").src = "icons/13d.svg";
     }
       else if (weatherCode ===77){
      document.getElementById("code-meteo-info").textContent = "Neige";
      document.getElementById("day-night-icon").src = "icons/13d.svg";
     }
       else if (weatherCode >=80 && weatherCode <= 82){
      document.getElementById("code-meteo-info").textContent = "Forte pluie";
      document.getElementById("day-night-icon").src = "icons/10d.svg";
     }
       else if (weatherCode >=85 && weatherCode <= 86){
      document.getElementById("code-meteo-info").textContent = "Forte neige";
      document.getElementById("day-night-icon").src = "icons/13d.svg";
     }
       else if (weatherCode ===95){
      document.getElementById("code-meteo-info").textContent = "Orages";
      document.getElementById("day-night-icon").src = "icons/11d.svg";
     }
       else{
      document.getElementById("code-meteo-info").textContent = "Orages et grêles";
      document.getElementById("day-night-icon").src = "icons/11d.svg";
     }
      const windyWeather = Number(weather.windspeed);
      if(windyWeather >= 30){
      document.getElementById("windy-weather").src = "icons/wind.png";
      }
    })
    .catch(error => {
      console.error("Erreur météo :", error);
    });
}
Weather();
setInterval(Weather, 3600000);
