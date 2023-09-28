const apiKey = '5005aa30a2f759ff6d694c86e4241b9f'; // Get an API key from a weather API provider like OpenWeatherMap

const locationInput = document.getElementById('locationInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherDisplay = document.querySelector('.weather-display');
const errorMessage = document.querySelector('.error-message');
const unitToggle = document.getElementById('unitToggle');

getWeatherBtn.addEventListener('click', function(){
    const location = locationInput.value;
    const unit = unitToggle.value;

   
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.cod === '404') {
                //  location not found error
                showError('Location not found. Please check your input.');
            } else {
                // Display weather data
                showWeatherData(data);
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            showError('An error occurred while fetching data. Please try again later.');
        });
});

function showWeatherData(data) {
    errorMessage.style.display = 'none';
    weatherDisplay.innerHTML = `
        <h2>Weather in ${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Weather Description: ${data.weather[0].description}</p>
    `;
}

function showError(message) {
    weatherDisplay.innerHTML = '';
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}
