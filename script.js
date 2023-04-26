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
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
  const response = await fetch(apiUrl + city +`&appid=${apiKey}`);
  const data = await response.json();

  console.log(data);

  document.querySelector('.city').innerHTML = data.name;
  document.querySelector('.temperature').innerHTML = Math.round(data.main.temp) + "°F";
  document.querySelector('.humidity').innerHTML = data.main.humidity + "%" ;
  document.querySelector('.wind').innerHTML = data.wind.speed + "mph";

  if(data.weather[0].main == "Clouds"){
    weatherIcon.src = "images/clouds.png";
  }
  else if(data.weather[0].main == "Clear"){
    weatherIcon.src = "images/clear.png";
  }
  else if(data.weather[0].main == "Drizzle"){
    weatherIcon.src = "images/drizzle.png";
  }
  else if(data.weather[0].main == "Humidity"){
    weatherIcon.src = "images/humidity.png";
  }
  else if(data.weather[0].main == "Mist"){
    weatherIcon.src = "images/mist.png";
  }
  else if(data.weather[0].main == "Rain"){
    weatherIcon.src = "images/rain.png";
  }
  else if(data.weather[0].main == "Snow"){
    weatherIcon.src = "images/snow.png";
  }
  else if(data.weather[0].main == "Wind"){
    weatherIcon.src = "images/wind.png";
  }
}

searchBtn.addEventListener("click", ()=>{
  checkWeather(searchBox.value);
})

