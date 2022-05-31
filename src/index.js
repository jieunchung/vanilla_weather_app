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
  return `Last Updated: ${day}, ${hour}:${minute}`;
}

function formattedDays(newDays) {
  let date = new Date(newDays * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(display) {
  let forecast = display.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (dailyForecast, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col forecastCol">
                     <p> ${formattedDays(dailyForecast.dt)} </p>
                      <img class="forecastIcon" src="https://openweathermap.org/img/wn/${
                        dailyForecast.weather[0].icon
                      }.png" alt="${dailyForecast.weather[0].description}">
                      <p class="forecastTemp">
                          <span class="highTemp">${Math.round(
                            dailyForecast.temp.max
                          )}</span>
                          <span>/</span>  
                        <span class="lowTemp">${Math.round(
                          dailyForecast.temp.min
                        )}</span>
                    </p>
                    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coords) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function searchData(showResult) {
  celsiusTemp = showResult.data.main.temp;
  let nameElement = document.querySelector("#current-city");
  let dateElement = document.querySelector("#day-time");
  let SearchedWeatherElement = document.querySelector("#weather-main");
  let tempElement = Math.round(celsiusTemp);
  let weatherMainElement = showResult.data.weather[0].description;
  let searchedTempElement = document.querySelector("#degree");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#current-icon");

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

let locationButton = document.querySelector("#locate-btn");
locationButton.addEventListener("click", getLocation);

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

search("Stockholm");
