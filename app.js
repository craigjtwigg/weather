// DOM ELEMENTS

const locationElement = document.querySelector('.location');
const tempElement = document.querySelector('.temperature');
const minElement = document.querySelector('.min');
const maxElement = document.querySelector('.max');
const feelsElement = document.querySelector('.feels');
const humidityElement = document.querySelector('.humidity');
const weatherElement = document.querySelector('.weather');
const descriptionElement = document.querySelector('.description');
const windElement = document.querySelector('.wind');

// SEARCH FORM ELEMENTS

  //DESKTOP
const searchBar = document.getElementById('search');
const submitBtn = document.getElementById('submit');

  //MOBILE
const mobileSearch = document.getElementById('mobile-search');
const mobileSubmit = document.getElementById('mobile-submit');


// METRIC / IMPERIAL UNIT SWITCH

const unitSwitch = document.getElementById('switch');

let degUnit = '°C';
let speedUnit = 'm/s';
let activeUnits = 'metric';

// EVENT LISTENERS

submitBtn.addEventListener('click', handleSearch);
mobileSubmit.addEventListener('click', handleMobileSearch);
unitSwitch.addEventListener('click', unitSwitchFunc);

// ACTIVE LOCATION
let activeLocation = 'Widnes'


async function getWeather(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${activeUnits}&APPID=d8bb32a119bbf160e2545fa1ef9df520`
    );
    const weatherData = await response.json();
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
  const newWeather = new Weather(data);
  displayData(newWeather);
}

function handleSearch(e) {
  e.preventDefault();
  activeLocation = searchBar.value;
  getWeather(activeLocation);
  searchBar.value = '';
}

function handleMobileSearch(e) {
  e.preventDefault();
  const location = mobileSearch.value;
  getWeather(location);
  searchBar.value = '';
}

function displayData(data) {
  locationElement.textContent = `${data.location}`;
  tempElement.innerHTML = `${data.temp}<span class="degrees">${degUnit}</span>`;
  feelsElement.textContent = `Feels like: ${data.feels}${degUnit}`;
  humidityElement.textContent = `Humidity: ${data.humidity}%`;
  descriptionElement.textContent = `${data.description} in...`;
  windElement.textContent = `Wind Speed: ${data.wind}${speedUnit}`;
}

function unitSwitchFunc() {
  unitSwitch.checked ? imperial() : metric();
}

function metric() {
  degUnit = '°C';
  speedUnit = 'm/s';
  activeUnits = 'metric';
  getWeather(activeLocation)
}

function imperial() {
  degUnit = '°F';
  speedUnit = 'mph';
  activeUnits = 'imperial';
  getWeather(activeLocation)
}

getWeather(activeLocation);
