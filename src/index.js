function formattedTime(time) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[time.getDay()];
  let hour = time.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minute = time.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day}, ${hour}:${minute}`;
}
let dayTime = document.querySelector("#day-time");
let today = new Date();
dayTime.innerHTML = formattedTime(today);

function searchData(showResult) {
  let temp = Math.round(showResult.data.main.temp);
  console.log(showResult);
  console.log(temp);
  console.log(showResult.data.weather[0].main);
  let weatherMain = showResult.data.weather[0].main;

  let searchedWeather = document.querySelector("#weather-main");
  searchedWeather.innerHTML = weatherMain;

  let searchedTemp = document.querySelector("#degree");
  searchedTemp.innerHTML = temp;

  document.querySelector("#wind").innerHTML = Math.round(
    showResult.data.wind.speed
  );

  document.querySelector("#humidity").innerHTML = Math.round(
    showResult.data.main.humidity
  );
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#which-city");
  let searchedCity = document.querySelector("#current-city");

  if (cityInput.value) {
    searchedCity.innerHTML = `${cityInput.value}`;
  } else {
    alert("Please type a city!");
  }

  let units = "metric";
  let apiKey = "ceaf6bfc5bcf7b020bba053d944137d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(searchData);
}

let searchBtn = document.querySelector("#search-button");
searchBtn.addEventListener("click", searchCity);

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
    console.log(showData.data.main.temp);
    console.log(showData.data.name);
    let temp = Math.round(showData.data.main.temp);
    let cityName = showData.data.name;
    let weatherMain = showData.data.weather[0].main;

    function getLocation(locationData) {
      locationData.preventDefault();

      let locationName = document.querySelector("#current-city");
      locationName.innerHTML = cityName;

      let locationTemp = document.querySelector("#degree");
      locationTemp.innerHTML = temp;

      let locationWeather = document.querySelector("#weather-main");
      locationWeather.innerHTML = weatherMain;

      document.querySelector("#wind").innerHTML = Math.round(
        showData.data.wind.speed
      );

      document.querySelector("#humidity").innerHTML = Math.round(
        showData.data.main.humidity
      );
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
