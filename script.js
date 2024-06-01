const url = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "251bb4ad75855941ec8b1d1873ebd359";

let temprature = document.querySelector(".temprature-title");
let city = document.querySelector(".city");
let wind = document.querySelector(".wind");
let humidity = document.querySelector(".humidity");
let searchBox = document.querySelector(".search-box");
let searchBtn = document.querySelector(".search-btn");
let errorMsg = document.querySelector(".temprature-container");
let weatherImg = document.querySelector(".weather-img");

const checkWeather = async function () {
  let cityName = searchBox.value.trim();

  if (!cityName) {
    errorMsg.innerText = "Please Enter a city Name";
    errorMsg.style.paddingBlock = "50px";
    errorMsg.style.fontWeight = "600";
    return;
  }

  let response = await fetch(`${url}${cityName}&appid=${apiKey}`);
  let data = await response.json();
  console.log(data);

  temprature.innerText = Math.floor(data.main.temp - 273.15);
  city.innerText = data.name;
  wind.innerText = Math.floor((data.wind.speed * 18) / 5) + " Km/h";
  humidity.innerText = data.main.humidity + "%";

  if (data.weather[0].main == "Clouds") {
    weatherImg.src = "weather_Svg/cloudy-day-3.svg";
  } else if (data.weather[0].main == "Rain") {
    weatherImg.src = "weather_Svg/rainy-2.svg";
  } else if (data.weather[0].main == "Clear") {
    weatherImg.src = "weather_Svg/cloudy-day-1.svg";
  } else if (data.weather[0].main == "Haze") {
    weatherImg.src = "weather_Svg/cloudy.svg";
  }

  searchBox.value = "";
};

searchBtn.addEventListener("click", checkWeather);

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather();
  }
});
