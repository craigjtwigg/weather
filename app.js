const searchBar = document.getElementById('search');
const submitBtn = document.getElementById('submit');

const mobileSearch = document.getElementById('mobile-search');
const mobileSubmit = document.getElementById('mobile-submit');

const locationElement = document.querySelector('.location');
const tempElement = document.querySelector('.temperature');
const minElement = document.querySelector('.min');
const maxElement = document.querySelector('.max');
const feelsElement = document.querySelector('.feels');
const humidityElement = document.querySelector('.humidity');
const weatherElement = document.querySelector('.weather');
const descriptionElement = document.querySelector('.description');
const windElement = document.querySelector('.wind');

submitBtn.addEventListener('click', handleSearch);
mobileSubmit.addEventListener('click', handleMobileSearch)

async function getWeather(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=d8bb32a119bbf160e2545fa1ef9df520`
    );
    const weatherData = await response.json();
    // ... do something with the data, but for now:

    console.log(weatherData);

    processData(weatherData);

    return weatherData;
  } catch (error) {
    console.log('ERROR: uh oh, spagghetti-ohs');
  }
}

function processData(data) {

  class Weather {
    constructor(data) {
      this.location = data.name;
      this.temp = Math.round(data.main.temp);
      this.min = Math.round(data.main.temp_min);
      this.max = Math.round(data.main.temp_max);
      this.feels = Math.round(data.main.feels_like);
      this.humidity = data.main.humidity;
      this.weather = data.weather[0].main;
      this.description = data.weather[0].description;
      this.wind = Math.round(data.wind.speed);
    }
  }

  const newWeather = new Weather(data)

  displayData(newWeather)


}

function handleSearch(e) {
  e.preventDefault();
  const location = searchBar.value;
  getWeather(location);
  searchBar.value = '';
}

function handleMobileSearch(e) {
  e.preventDefault();
  const location = mobileSearch.value;
  getWeather(location);
  searchBar.value = '';
}

function displayData(data) {
  // ...


  // console logged the required data for the app

  // Temperature and humidity
  locationElement.textContent = `${data.location}`;
  tempElement.innerHTML = `${data.temp}<span class="degrees">°C</span>`;
  //minElement.textContent = `Maximum temperature is: ${data.max}°C`;
  //maxElement.textContent = `Minimum temperature is: ${data.min}°C`;
  feelsElement.textContent = `Feels like: ${data.feels}°C`;
  humidityElement.textContent = `Humidity: ${data.humidity}%`;


  // Weather and description
  //weatherElement.textContent = `Weather is: ${data.weather}`;
  descriptionElement.textContent = `${data.description} in...`;

  

  // Wind

  windElement.textContent = `Wind Speed: ${data.wind}m/s`;
}

getWeather('Widnes');
