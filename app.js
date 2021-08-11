async function getWeather(location){
    try {
        const response = await fetch (`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=d8bb32a119bbf160e2545fa1ef9df520`)
        const weatherData = await response.json();
        // ... do something with the data, but for now:

        console.log(weatherData)

        processData(weatherData)

        return weatherData

    } catch (error) {
        console.log('ERROR: uh oh, spagghetti-ohs')
    }
} 


function processData(data) {
    // console logged the required data for the app

    // Temperature and humidity
    console.log(`Location is: ${data.name}`)
    console.log(`Temperature is: ${data.main.temp}°C`)
    console.log(`Maximum temperature is: ${data.main.temp_max}°C`)
    console.log(`Minimum temperature is: ${data.main.temp_min}°C`)
    console.log(`Feels like: ${data.main.feels_like}°C`)
    console.log(`Humidity is: ${data.main.humidity}%`)

    // Weather and description
    console.log(`Weather is: ${data.weather[0].main}`)
    console.log(`Weather description: ${data.weather[0].description}`)

    // Wind

    console.log(`Wind speed is: ${data.wind.speed}mph`)
}



getWeather('Widnes')

