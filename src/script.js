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

//forecast-card (PROBLEM: loop does not work)
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-2">
        <h3>
        ${formatHours(forecast.dt * 1000)}
        </h3>
       <img src="https://openweathermap.org/img/wn/${
         forecast.weather[0].icon
       }@2x.png" alt="forecast icon" id="icon-forecast"/>
        <div class="weather-forecast-temperature"><strong>${Math.round(
          forecast.main.temp_max
        )}°</strong>
      </div></div>`;
  }
}
// background color temperature code (ok)
function tempColoring(response) {
  let temp = Math.round(response.data.main.temp);
  if (temp > -30 && temp <= -15) {
    temp = `l#9DBCF9`;
  } else if (temp > -15 && temp < -7.5) {
    temp = `#9ADEFA`;
  } else if (temp >= -7.5 && temp <= 0) {
    temp = `#99FBFC`;
  } else if (temp > 0 && temp <= 5) {
    temp = `#99F9DC`;
  } else if (temp > 0 && temp <= 5) {
    temp = `#99F9DC`;
  } else if (temp > 5 && temp <= 8) {
    temp = `#97F8BB`;
  } else if (temp > 8 && temp <= 11) {
    temp = `#B9F799`;
  } else if (temp > 11 && temp <= 15) {
    temp = `#FCFA9A`;
  } else if (temp > 15 && temp <= 20) {
    temp = `#F29798`;
  } else if (temp > 20 && temp <= 25) {
    temp = `#FBDC98`;
  } else if (temp > 25 && temp <= 30) {
    temp = `#F5B999`;
  } else {
    temp = `#39322C`;
  }

  return temp;
}

//take along function (ok)
function takeAlong(response) {
  let rememberItem = response.data.weather[0].main;
  if (rememberItem == "Rain") {
    rememberItem = ` your umbrella🌂. `;
  } else if (rememberItem == "Clear") {
    rememberItem = ` your  sunglasses.</br>🕶`;
  } else if (rememberItem == "Snow") {
    rememberItem = ` your scraf and gloves.</br>🧣🧤`;
  } else {
    rememberItem = ` to be a feminist </br>💜`;
  }
  return `${rememberItem}`;
}
//temperature now (ok)
function displayWeatherCondition(response) {
  celciusTemperature = response.data.main.temp;

  document.querySelector(
    "#current-location"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#temp").innerHTML = Math.round(celciusTemperature);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#take-along").innerHTML = takeAlong(response);
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#app").style.backgroundColor = tempColoring(response);
}

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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
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
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");
