//temperature + location
function displayWeatherCondition(response) {
  document.querySelector("#current-location").innerHTML = response.data.name;
  celciusTemperature = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(celciusTemperature);
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
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

function search(city) {
  let apiKey = "0b04f7882b2a886e7942aa9e854e4071";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function handlesubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
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

//time and date
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
let currentDay = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "Mai",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentMonth = months[now.getMonth()];
let currentYear = now.getFullYear();
let dayNumber = now.getDate();
let d1 = document.querySelector(".temperatureNowInfoDate");
d1.innerHTML = `${currentDay},  ${currentMonth} ${dayNumber}, ${currentYear}`;

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let d2 = document.querySelector(".temperatureNowInfoTime");
d2.innerHTML = `${hours}:${minutes}`;

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

let form = document.querySelector("#searching");
form.addEventListener("click", handlesubmit);

let currentLocationButton = document.querySelector("#btn-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let celciusTemperature = null;
search("New York");
