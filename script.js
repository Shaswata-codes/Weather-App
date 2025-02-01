const API_KEY = '1e6212177e88080c1c516efc509d174f';

document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('city').value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a valid city name!');
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    // Show loading effect
    document.getElementById('cityName').textContent = 'Fetching...';
    document.getElementById('temperature').textContent = '';
    document.getElementById('description').textContent = '';
    document.getElementById('humidity').textContent = '';
    document.getElementById('wind').textContent = '';
    document.getElementById('weatherIcon').className = 'fas fa-spinner fa-spin';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the spelling.');
            }
            throw new Error('Failed to fetch weather data.');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
        resetWeatherUI();
    }
}

function displayWeather(data) {
    const cityName = data.name;
    const temperature = `${Math.round(data.main.temp)}°C`;
    const description = data.weather[0].description;
    const humidity = `Humidity: ${data.main.humidity}%`;
    const wind = `Wind Speed: ${data.wind.speed} m/s`;

    document.getElementById('cityName').textContent = cityName;
    document.getElementById('temperature').textContent = temperature;
    document.getElementById('description').textContent = description;
    document.getElementById('humidity').textContent = humidity;
    document.getElementById('wind').textContent = wind;

    updateWeatherIcon(data.weather[0].main);
}

function updateWeatherIcon(weather) {
    const icon = document.getElementById('weatherIcon');
    switch (weather.toLowerCase()) {
        case 'clear':
            icon.className = 'fas fa-sun';
            break;
        case 'clouds':
            icon.className = 'fas fa-cloud';
            break;
        case 'rain':
            icon.className = 'fas fa-cloud-showers-heavy';
            break;
        case 'snow':
            icon.className = 'fas fa-snowflake';
            break;
        case 'thunderstorm':
            icon.className = 'fas fa-bolt';
            break;
        default:
            icon.className = 'fas fa-smog';
    }
}

function resetWeatherUI() {
    document.getElementById('cityName').textContent = '';
    document.getElementById('temperature').textContent = '';
    document.getElementById('description').textContent = '';
    document.getElementById('humidity').textContent = '';
    document.getElementById('wind').textContent = '';
    document.getElementById('weatherIcon').className = 'fas fa-question-circle';
}
