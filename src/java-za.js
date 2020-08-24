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
