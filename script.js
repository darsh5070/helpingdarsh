// Get references to the HTML elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfoDiv = document.getElementById('weather-info');
const errorMessageP = document.getElementById('error-message');

const cityNameH2 = document.getElementById('city-name');
const temperatureP = document.getElementById('temperature');
const weatherIconImg = document.getElementById('weather-icon');
const descriptionP = document.getElementById('description');
const humidityP = document.getElementById('humidity');

// --- IMPORTANT ---
// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const API_KEY = '6047143ef75c575cb0195684929af62a';

// Add event listeners for the button click and 'Enter' key press
searchBtn.addEventListener('click', () => {
    getWeather(cityInput.value);
});

cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getWeather(cityInput.value);
    }
});

// The main function to fetch and display weather data
async function getWeather(city) {
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    // Hide previous results and errors
    weatherInfoDiv.classList.add('hidden');
    errorMessageP.classList.add('hidden');

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('City not found. Please check the spelling.');
        }

        const data = await response.json();
        displayWeather(data);

    } catch (error) {
        // Display the error message to the user
        errorMessageP.textContent = error.message;
        errorMessageP.classList.remove('hidden');
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    // Extract the needed information from the data object
    const { name, main, weather } = data;
    const temperature = main.temp;
    const humidity = main.humidity;
    const weatherDescription = weather[0].description;
    const iconCode = weather[0].icon;

    // Construct the URL for the weather icon
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Update the HTML elements with the new data
    cityNameH2.textContent = name;
    temperatureP.textContent = `Temperature: ${temperature.toFixed(1)}°C`;
    humidityP.textContent = `Humidity: ${humidity}%`;
    weatherIconImg.src = iconUrl;
    weatherIconImg.alt = weatherDescription;
    descriptionP.textContent = weatherDescription;

    // Make the weather info section visible
    weatherInfoDiv.classList.remove('hidden');
}