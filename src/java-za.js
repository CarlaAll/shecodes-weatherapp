//forecast  menu 5days
function dayForecast(timestamp) {
  let date = new Date(timestamp);
}
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
let day = daysshort[date.getDay()];
document.querySelector("#tomorrow").innerHTML = dayForecast(
  `${daysshort[date.getDay() + 1]}`
);

document.querySelector("#after-tomorrow").innerHTML = dayForecast(
  `${daysshort[date.getDay() + 2]}`
);

document.querySelector("#in-three").innerHTML = dayForecast(
  `${daysshort[date.getDay() + 3]}`
);
document.querySelector("#in-five").innerHTML = dayForecast(
  `${daysshort[date.getDay() + 5]}`
);


// image
document.querySelector("#woman")
if (response.data.weather[0].icon === "02d") {
      .setAttribute("src", "images/takealong_sun.png");
}
if (
  response.data.weather[0].icon === "09d" ||
  response.data.weather[0].icon === "09n"
) {    
      .setAttribute("src", "images/takealong_rain.png");
}
if (response.data.weather[0].icon === "13d") {

      .setAttribute("src", "images/takealong_cold.png");
} else {
      .setAttribute("src", "images/takealong_wind.png");
}