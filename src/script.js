let current = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[current.getDay()];

let hours = current.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = current.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = `${hours}:${minutes}`;

let currentDayAndTime = document.querySelector("#current-date-time");
currentDayAndTime.innerHTML = `${day} ${time}`;

function displayCurrentCityTemp(response) {
  let currentButton = document.querySelector("#current-button");
  let tempNowCity = document.querySelector("#current-temp");
  let currentCity = document.querySelector(".currentCity");
  let temperature = Math.round(response.data.main.temp);
  tempNowCity.innerHTML = `${temperature}`;
  currentCity.innerHTML = `${response.data.name}`;
}

function displayCurrentCityPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  console.log(lat);

  let apiKey = `63973b3dd42078dd4f4c85b0f03dee62`;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayCurrentCityTemp);
}

function showCurrentCity() {
  navigator.geolocation.getCurrentPosition(displayCurrentCityPosition);
}

function displaySearchCityTemp(response) {
  let tempNowCity = document.querySelector("#current-temp");
  let temperature = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  let describeSky = response.data.weather[0].main;
  tempNowCity.innerHTML = `${temperature}`;
  description.innerHTML = describeSky;
}
function displaySearchCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector(".form-control");
  let inputCurrentCity = document.querySelector(".currentCity");
  inputCurrentCity.innerHTML = `${inputCity.value}`;

  let city = `${inputCity.value}`;
  let apiKey = `63973b3dd42078dd4f4c85b0f03dee62`;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displaySearchCityTemp);
}

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", displaySearchCity);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showCurrentCity);
// let tempNow = document.querySelector("#current-temp");
// tempNow.innerHTML = 32;

// function showCelTemp(event) {
//   event.preventDefault;
//   let currentTemp = 32;
//   let degreesC = document.querySelector("#degree-cel");
//   let currentTemperature = document.querySelector("#current-temp");
//   currentTemperature.innerHTML = currentTemp;
// }

// let degreesCel = document.querySelector("#degrees-cel");
// degreesCel.addEventListener("click", showCelTemp);

//function showFarTemp(event) {
//event.preventDefault;
//let currentTemp = 32;
//let currentTempFar = Math.round((currentTemp * 9) / 5 + 32);
//let degreesF = document.querySelector("#degree-far");
//let currentTemperature = document.querySelector("#current-temp");
//currentTemperature.innerHTML = currentTempFar;
//}

//let degreesFar = document.querySelector("#degrees-far");
//degreesFar.addEventListener("click", showFarTemp);
