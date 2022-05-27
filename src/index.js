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

function searchData(showResult) {
  let nameElement = document.querySelector("#current-city");
  let dateElement = document.querySelector("#day-time");
  let SearchedWeatherElement = document.querySelector("#weather-main");
  let tempElement = Math.round(showResult.data.main.temp);
  let weatherMainElement = showResult.data.weather[0].main;
  let searchedTempElement = document.querySelector("#degree");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");

  nameElement.innerHTML = showResult.data.name;
  dateElement.innerHTML = formattedTime(showResult.data.dt * 1000);
  SearchedWeatherElement.innerHTML = weatherMainElement;
  searchedTempElement.innerHTML = tempElement;
  windElement.innerHTML = Math.round(showResult.data.wind.speed);
  humidityElement.innerHTML = Math.round(showResult.data.main.humidity);
}

function search(city) {
  let units = "metric";
  let apiKey = "ceaf6bfc5bcf7b020bba053d944137d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(searchData);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#which-city");
  let searchedCity = document.querySelector("#current-city");
  search(cityInputElement.value);
  if (cityInputElement.value) {
    searchedCity.innerHTML = `${cityInputElement.value}`;
  } else {
    alert("Please enter a city!");
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Uppsala");

function changeToFahrenheit(event) {
  event.preventDefault();

  let degree = document.querySelector("#degree");
  degree.innerHTML = "tba";
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);

function changeToCelcius(event) {
  event.preventDefault();

  let degree = document.querySelector("#degree");
  degree.innerHTML = "tba";
}

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", changeToCelcius);

function getPosition(result) {
  let lat = result.coords.latitude;
  let lon = result.coords.longitude;

  function getData(showData) {
    let temp = Math.round(showData.data.main.temp);
    let cityName = showData.data.name;
    let weatherMain = showData.data.weather[0].main;

    function getLocation(locationData) {
      locationData.preventDefault();

      let locationName = document.querySelector("#current-city");
      let locationTemp = document.querySelector("#degree");
      let locationWeather = document.querySelector("#weather-main");
      let locationWind = document.querySelector("#wind");
      let locationHumidity = document.querySelector("#humidity");
      let dateElement = document.querySelector("#day-time");

      locationName.innerHTML = cityName;
      locationTemp.innerHTML = temp;
      locationWeather.innerHTML = weatherMain;
      locationWind.innerHTML = Math.round(showData.data.wind.speed);
      locationHumidity.innerHTML = Math.round(showData.data.main.humidity);
      dateElement.innerHTML = formattedTime(showData.data.dt * 1000);
    }

    let changeBtn = document.querySelector("#locateBtn");
    changeBtn.addEventListener("click", getLocation);
  }

  let units = "metric";
  let apiKey = "ceaf6bfc5bcf7b020bba053d944137d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&apiKey=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getData);
}

navigator.geolocation.getCurrentPosition(getPosition);
