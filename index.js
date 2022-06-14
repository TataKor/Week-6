let currentDate = document.querySelector("#current-date");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentDate.innerHTML = `${day} ${hours}:${minutes}`;

function searchEngine(city) {
  let apiKey = `8740228fba90a854cea90d4f0155d9e9`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayData);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#site-search").value;
  searchEngine(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function convertToC(event) {
  event.preventDefault();
  let celsius = document.querySelector("#valueTemp");
  celsius.innerHTML = +8;
}
let temperatureC = document.querySelector("#link-celsius");
temperatureC.addEventListener("click", convertToC);

function convertToF(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#valueTemp");
  fahrenheit.innerHTML = Math.round((9 * 8 + 160) / 5);
}
let temperatureF = document.querySelector("#link-fahrenheit");
temperatureF.addEventListener("click", convertToF);

function showPosition(position) {
  let apiKey = `8740228fba90a854cea90d4f0155d9e9`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayData);
}
console.log(showPosition);

function displayData(response) {
  let cityName = response.data.name;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = cityName;

  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#valueTemp");
  temperature.innerHTML = `${temp}`;

  let descriptionElement = document.querySelector("sunny");
  descriptionElement.innerHTML = response.data.weather[0].description;
}

function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", showCurrentLocation);