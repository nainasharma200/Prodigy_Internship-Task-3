// script.js

const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeather API key
const weatherDisplay = document.getElementById('weatherDisplay');

// Fetch weather data by city name
async function getWeatherByCity() {
  const city = document.getElementById('cityInput').value;
  if (!city) {
    alert("Please enter a city name!");
    return;
  }
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeatherData(apiURL);
}

// Fetch weather data by user's current location
function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      fetchWeatherData(apiURL);
    }, () => {
      alert("Unable to retrieve your location.");
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Fetch and display weather data
async function fetchWeatherData(apiURL) {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherDisplay.innerHTML = `<div class="error">${error.message}</div>`;
  }
}

// Display weather data on the page
function displayWeather(data) {
  const { name } = data;
  const { temp, humidity } = data.main;
  const { description, icon } = data.weather[0];
  const { speed } = data.wind;

  weatherDisplay.innerHTML = `
    <h2>${name}</h2>
    <div><img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}"></div>
    <div>Temperature: ${temp.toFixed(1)}°C</div>
    <div>Description: ${description.charAt(0).toUpperCase() + description.slice(1)}</div>
    <div>Humidity: ${humidity}%</div>
    <div>Wind Speed: ${speed} m/s</div>
  `;
}
