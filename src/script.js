//date + forecast (ok)
function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

//forecast-card (ok?)
function displayForecast(response) {
  let forecastFirstElement = document.querySelector("#first-forecast");
  forecastFirstElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 3; index++) {
    forecast = response.data.list[index];
    forecastFirstElement.innerHTML = `<div class="card">
      <div class="card-body forecast">
        <p class="card-text forecast"><strong>${formatHours(
          forecast.dt * 1000
        )}</strong></p>
        <p class="card-text forecast">
          <span class="text-muted"><img src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" alt="forecast-icon"/></span>
        </p>
        <h5 class="card-title forecast" id="first-forecast">${Math.round(
          forecast.main.temp_max
        )}°</h5>
      </div>
    </div>`;
  }
}

//temperature now (ok)
function displayWeatherCondition(response) {
  celciusTemperature = response.data.main.temp;

  document.querySelector("#current-location").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(celciusTemperature);
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
}

//forecast  menu 5days
let daysshort = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
];
let forecastTomorrow = document.querySelector("#tomorrow");
forecastTomorrow.innerHTML = `${daysshort[now.getDay() + 1]}`;

let forecastAfter = document.querySelector("#after-tomorrow");
forecastAfter.innerHTML = `${daysshort[now.getDay() + 2]}`;

let forecastThree = document.querySelector("#in-three");
forecastThree.innerHTML = `${daysshort[now.getDay() + 3]}`;

let forecastFour = document.querySelector("#in-four");
forecastFour.innerHTML = `${daysshort[now.getDay() + 4]}`;

let forecastFive = document.querySelector("#in-five");
forecastFive.innerHTML = `${daysshort[now.getDay() + 5]}`;

//search-function (ok)
function search(city) {
  let apiKey = "0b04f7882b2a886e7942aa9e854e4071";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}
function handlesubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "0b04f7882b2a886e7942aa9e854e4071";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//Fahrenheit
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let form = document.querySelector("#btn-search");
form.addEventListener("submit", handlesubmit);

let currentLocationButton = document.querySelector("#btn-location");
currentLocationButton.addEventListener("submit", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");
