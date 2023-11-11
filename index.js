const apiKey = 'fa37e2580c3dfbc77dc7c86315471dd7'; // Podstaw swój klucz API tutaj
let city = 'Warsaw'; // Możesz zmienić miasto na dowolne inne

const wyszukaj = document.getElementById("wyszukaj");
const miasto = document.getElementById("miasto");
const found = document.getElementsByClassName("notfound")[0];
const weatherElements = document.getElementsByClassName("weather")[0];
weatherElements.style.display = "none";
wyszukaj.addEventListener("click", () => {
  city = document.getElementById("lokalizacjia").value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  found.style.visibility = "hidden";
  weatherElements.style.display = "none";
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Błąd zapytania: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      // Pobierz temperaturę w stopniach Celsiusza
      const temperatureCelsius = data.main.temp - 273.15;
      // Pobierz informacje o stanie pogody
      const weatherData = data.weather[0];
      // Pobierz wilgotność w procentach
      const humidity = data.main.humidity;

      // Pobierz prędkość wiatru w m/s (możesz przeliczyć na km/h, mnożąc przez 3.6)
      const windSpeed = data.wind.speed;

      // Sprawdź czy w miejscowości jest deszcz
      if (weatherData.main === 'Rain') {
        var zdjecie = document.getElementById("sunny");
        zdjecie.src = "zdjecia/rain.png";
      } else {
        var zdjecie = document.getElementById("sunny");
        zdjecie.src = "zdjecia/clear.png";
      }

      // Wstaw te informacje do odpowiednich elementów HTML
      const temperatureElement = document.getElementById('temperatura');
      const humidityElement = document.getElementById('humiditytext'); // Dodane dla wilgotności
      const windSpeedElement = document.getElementById('windspeed'); // Dodane dla prędkości wiatru

      miasto.innerHTML = city;
      temperatureElement.textContent = `${Math.round(temperatureCelsius.toFixed(2))}°C`;
      humidityElement.textContent = `${humidity}%`; // Dodane dla wilgotności
      windSpeedElement.textContent = `${windSpeed}m/s`; // Dodane dla prędkości wiatru
      weatherElements.style.display = "block";
    })
    .catch(error => {
      
      if (error.message.includes("404 Not Found")) {
        found.style.visibility = "visible";
      }
    });
});
