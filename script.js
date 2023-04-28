document.addEventListener('DOMContentLoaded', function() {
  function updateCurrentDateTime() {
    var now = new Date();
    var formattedDateTime = now.toLocaleString();
    document.getElementById('currentDateTime').textContent = formattedDateTime;
  }
  updateCurrentDateTime();
  setInterval(updateCurrentDateTime, 1000);
});

const apiKey = "e6045ed476404c7301fa015e7d168a41";

// Load weather data for current location
window.addEventListener("load", () => {
  const searchButton = document.querySelector(".search button");
    searchButton.addEventListener("click", searchByCity);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lon = position.coords.longitude;
      const lat = position.coords.latitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          weatherReport(data);
        });
    });
  }
});

// Load weather data for city entered in search bar
function searchByCity() {
  const place = document.querySelector(".search input").value;
  const urlsearch = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=imperial&appid=${apiKey}`;

  fetch(urlsearch)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      weatherReport(data);
    });
  document.querySelector(".search input").value = "";
}

// Display weather data in HTML
function weatherReport(data) {
  const temperature = Math.round(data.main.temp);
  const city = data.name;
  const wind = data.wind.speed;
  const humidity = data.main.humidity;
  const weatherIcon = getWeatherIcon(data.weather[0].main);

  // Current weather
  document.querySelector(".temperature").textContent = `${temperature}°F`;
  document.querySelector(".city").textContent = city;
  document.querySelector(".weathericon").setAttribute("src", weatherIcon);
  document.querySelector(".wind").textContent = `${wind} mph`;
  document.querySelector(".humidity").textContent = `${humidity}%`;

  // Future weather
  const urlcast = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&units=imperial&appid=${apiKey}`;
  fetch(urlcast)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const forecastList = data.list;
      const futureForecast = document.querySelector(".week");
      futureForecast.innerHTML = "";

      // Loop through forecast data and display each day's forecast
      for (let i = 0; i < forecastList.length; i += 8) {
        const forecast = forecastList[i];
        const date = new Date(forecast.dt * 1000).toDateString();
        const tempMin = Math.round(forecast.main.temp_min);
        const tempMax = Math.round(forecast.main.temp_max);
        const forecastIcon = getWeatherIcon(forecast.weather[0].main);

        const dayForecast = document.createElement("div");
        dayForecast.className = "day";
        dayForecast.innerHTML = `
          <p class="date">${date}</p>
          <p>${tempMax} °F / ${tempMin} °F</p>
          <p class="weathericon">${forecastIcon}</p>
        `;
        futureForecast.appendChild(dayForecast);
      }
    });
}

// Map weather conditions to icons
function getWeatherIcon(weatherCondition) {
  let icon = "";
  switch (weatherCondition) {
    case "Clear":
      icon = "images/sun.png";
      break;
    case "Clouds":
      icon = "images/cloud.png";
      break;
    case "Drizzle":
      icon = "images/drizzle.png";
      break;
      case "Humidity":
      icon = "images/humidity.png";
      break;
    case "Mist":
      icon = "images/mist.png";
      break;
      case "Rain":
      icon = "images/rain.png";
      break;
      case "Snow":
      icon = "images/snow.png";
      break;
      case "Wind":
      icon = "images/wind.png";
      break;
  }
  return `<img src="${icon}">`;
}
