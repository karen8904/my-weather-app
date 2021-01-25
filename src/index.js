//let weather = {
//paris: {
//temp: 19.7,
//humidity: 80
//},
//tokyo: {
// temp: 17.3,
//humidity: 50
//},
//lisbon: {
// temp: 30.2,
//humidity: 20
//},
//"san francisco": {
//temp: 20.9,
//humidity: 100
//},
//moscow: {
//temp: -5,
//humidity: 20
//}
//};

//console.log(weather);

//let city = prompt("Enter your city?");

//if (weather[city]) {
//let humid = weather[city].humidity;
//let tempF = Math.round(weather[city].temp * 9) / 5 + 32;
//alert(
//`It is currently ${weather[city].temp}°C (${tempF}°F)🌥 in ${city} with a humidity of ${humid}💧`
//);
//} else {
//alert(
//  `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city} 🤓`
// );
//}

//Homework week 4
//challenge1
//⏰Feature #1
//In your project, display the current date and time using JavaScript: Tuesday 16:00

//function writeDate(){
//let now = new Date();
//now.innerHTML = (`Current time is ${now}`);
//}

//let current = document.querySelector("#current");
//writeDate(current);

//format date current location:
let now = new Date();
let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let current = document.querySelector("#current-time");
let currentDay = day[now.getDay()];
let currentHour = now.getHours();
let currentMinute = now.getMinutes();
current.innerHTML = `${currentDay}, ${currentHour}:${currentMinute}`;

//format date timestamp API
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day}`;
}

//Challenge 2

//function sendCity(event) {
//event.preventDefault();
//let cityWrote = document.querySelector("#city-input");
//let cityApp = document.querySelector("#city-card");
//cityApp.innerHTML = `${cityWrote.value}`;
//}

//let mainCity = document.querySelector("#city-form");
//mainCity.addEventListener("submit", sendCity);

//Challenge 3

//function selectCelcius(event) {
//event.preventDefault();
//let temperatureNowC = document.querySelector("#temperature-now");
//temperatureNowC.innerHTML = `19ºC`;
//}

//function selecFarenheit(event) {
//event.preventDefault();
//let temperatureNowF = document.querySelector("#temperature-now");
//temperatureNowF.innerHTML = `65ºF`
//}

//let celcius = document.querySelector("#celcius");
//celcius.addEventListener("click", selectCelcius);

//let farenheit = document.querySelector("#farenheit");
//farenheit.addEventListener("click", selecFarenheit);

// change current temperature (from current city)
function showTemperaturenow(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let temperatureNow = document.querySelector("#temperature-now");
  let city = response.data.name;
  let cityApp = document.querySelector("#city-card");
  let max = Math.round(response.data.main.temp_max);
  let maxNow = document.querySelector("#max-today");
  let min = Math.round(response.data.main.temp_min);
  let minNow = document.querySelector("#min-today");
  let humidity = document.querySelector("#humidity");
  let humidityNow = Math.round(response.data.main.humidity);
  let wind = document.querySelector("#wind");
  let windNow = Math.round(response.data.wind.speed);
  let icon = document.querySelector("#icon");

  cityApp.innerHTML = `${city}`;
  temperatureNow.innerHTML = `${temperature}ºC`;
  maxNow.innerHTML = `${max}ºC`;
  minNow.innerHTML = `${min}ºC`;
  humidity.innerHTML = `Humidity: ${humidityNow}%`;
  wind.innerHTML = `Wind: ${windNow} Km/H`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

//forecast current location
function showForecast(response) {
  console.log(response);
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily[0];

  for (let index = 1; index < 6; index++) {
    forecast = response.data.daily[index];
    forecastElement.innerHTML += `
  <div class="card">
    <img src="http://openweathermap.org/img/wn/${
      response.data.daily[index].weather[0].icon
    }@2x.png" />
    <div class="card-body">
      <h5 class="card-title">${formatDate(forecast.dt * 1000)}</h5>
      <p class="card-text next"> ${Math.round(forecast.temp.max)}º/${Math.round(
      forecast.temp.min
    )}º</p>
    </div>
  </div>`;
  }
}

//API current location
function handlePosition(position) {
  let apiKey = "6e940319b48b62d74ef7e3fa7777884d";
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperaturenow);

  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

//get current location
function showCurrentcity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureNow = document.querySelector("#temperature-now");
  let cityWrote = document.querySelector("#city-input");
  let cityApp = document.querySelector("#city-card");
  let max = Math.round(response.data.main.temp_max);
  let maxNow = document.querySelector("#max-today");
  let min = Math.round(response.data.main.temp_min);
  let minNow = document.querySelector("#min-today");
  let humidity = document.querySelector("#humidity");
  let humidityNow = Math.round(response.data.main.humidity);
  let wind = document.querySelector("#wind");
  let windNow = Math.round(response.data.wind.speed);
  let icon = document.querySelector("#icon");
  let weatherDescription = document.querySelector("#weatherDescription");

  cityApp.innerHTML = `${cityWrote.value}`;
  temperatureNow.innerHTML = `${temperature}ºC`;
  maxNow.innerHTML = `${max}ºC`;
  minNow.innerHTML = `${min}ºC`;
  humidity.innerHTML = `Humidity: ${humidityNow}%`;
  wind.innerHTML = `Wind: ${windNow} Km/H`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherDescription.innerHTML = response.data.weather[0].description;
}

function showCity(event) {
  event.preventDefault();
  let apiKey = "6e940319b48b62d74ef7e3fa7777884d";
  let city = document.querySelector("#city-input").value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

//start search city
let searchButton = document.querySelector("#search-city");
searchButton.addEventListener("click", showCity);

//start current city
let currentLocation = document.querySelector("#current-city");
currentLocation.addEventListener("click", showCurrentcity);
