let currentDate = document.querySelector("#current-date");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  daysforEach(function(day) {
    forecastHTML = forecastHTML +
    `
    <div class="col-2">
      <div class="weather-forecast-date">${day}</div>
      <img src="https://openweathermap.org/img/wn/01d@2x.png"
      alt=""
      width="42"/>
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperatures-max">
          18° </span>
          <span class="weather-forecast-temperatures-min">
            12° </span>
      </div>
    </div>
   `;
  });
        forecastHTML = forecastHTML + `</div>`;
        forecastElement.innerHTML = forecastHTML;        
}

function searchEngine(city) {
  let apiKey = `8740228fba90a854cea90d4f0155d9e9`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayData);
  displayForecast();
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#site-search").value;
  searchEngine(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let celsiusTemp = null;

function convertToC(event) {
  event.preventDefault();
  let celsius = document.querySelector("#valueTemp");
  celsius.innerHTML = Math.round(celsiusTemp);
}
let temperatureC = document.querySelector("#link-celsius");
temperatureC.addEventListener("click", convertToC);

function convertToF(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#valueTemp");
  fahrenheit.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
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

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].main; //weather[0].description =two words//

  let sunriseElement = document.querySelector("#sunrise");
  let sunriseTime = new Date(response.data.sys.sunrise * 1000);
  sunriseElement.innerHTML = ` ${sunriseTime.getHours()}:${String(
    sunriseTime.getMinutes()
  ).padStart(2, "0")}`;

  let sunsetElement = document.querySelector("#sunset");
  let sunsetTime = new Date(response.data.sys.sunset * 1000);
  sunsetElement.innerHTML = ` ${sunsetTime.getHours()}:${String(
    sunsetTime.getMinutes()
  ).padStart(2, "0")}`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  celsiusTemp = response.data.main.temp;
}

function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", showCurrentLocation);

let currentButton = document.querySelector("#local");
currentButton.addEventListener("click", getLocal);
