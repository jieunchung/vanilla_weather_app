let apiKey = "ceaf6bfc5bcf7b020bba053d944137d0";

function formattedTime(time) {
  let today = new Date(time);
  let hour = today.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = today.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today.getDay()];
  return `${day}, ${hour}:${minute}`;
}

function displayForecast(display) {
  console.log(display);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col forecastCol">
                     <p> ${day} </p>
                      <img class="forecastIcon" src="https://openweathermap.org/img/wn/01d@2x.png" alt="sunny-weather">
                      <p class="forecastTemp">
                          <span class="highTemp">20˚</span>
                          /
                        <span class="lowTemp">3˚</span>
                    </p>
                    </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(getCoords) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${getCoords.lat}&lon=${getCoords.lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function searchData(showResult) {
  celsiusTemp = showResult.data.main.temp;
  let nameElement = document.querySelector("#current-city");
  let dateElement = document.querySelector("#day-time");
  let SearchedWeatherElement = document.querySelector("#weather-main");
  let tempElement = Math.round(celsiusTemp);
  let weatherMainElement = showResult.data.weather[0].main;
  let searchedTempElement = document.querySelector("#degree");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#current-icon");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  getForecast(showResult.data.coord);

  nameElement.innerHTML = showResult.data.name;
  dateElement.innerHTML = formattedTime(showResult.data.dt * 1000);
  SearchedWeatherElement.innerHTML = weatherMainElement;
  searchedTempElement.innerHTML = tempElement;
  windElement.innerHTML = Math.round(showResult.data.wind.speed);
  humidityElement.innerHTML = Math.round(showResult.data.main.humidity);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${showResult.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", showResult.data.weather[0].description);
}

function getPosition(result) {
  let lat = result.coords.latitude;
  let lon = result.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&apiKey=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(searchData);
}

function getLocation(locationData) {
  locationData.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let locationButton = document.querySelector("#locateBtn");
locationButton.addEventListener("click", getLocation);

function changeToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#degree");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  tempElement.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
}

function changeToCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#degree");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

function search(city) {
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(searchData);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#which-city");
  let searchedCity = document.querySelector("#current-city");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", changeToFahrenheit);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", changeToCelsius);

let celsiusTemp = null;
search("Stockholm");
