'use strict';

// UI variables
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search_input');
const weatherCard = document.querySelector('.weather-card');
const loadingModal = document.querySelector('.loading-modal');

const API_KEY = '2d6bea60bf274896f06c75ae8106f495';

const showLoading = () => {
    loadingModal.style.display = 'block';
}

const hideLoading = () => {
    loadingModal.style.display = 'none';
}

const showMessage = message => Swal.fire(message);

const kelvinToCelsius = (kelvin) => {
    const celsius = Math.floor(kelvin - 273.15);
    return celsius;
}

const displayWeatherCard = (cityName, iconURL, desc, temp, feels_like, humidity) => {
    weatherCard.innerHTML = `
        <div>
            <div class="card-header">
                <h2>${cityName}</h2> <img src="${iconURL}" alt="weather-icon">
            </div>
            <div class="card-body">
                <p>Description: ${desc}</p>
                <p>Temperature: ${temp} celsius</p>
                <p>Feels like: ${feels_like} celsius</p>
                <p>Humidity: ${humidity}</p>
            </div>
        </div>
    `;
}

const getWeahterData = async () => {
    try {
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${API_KEY}`;
        showLoading();
        const data = await fetch(API, {mode: 'cors'});
        const responseData = await data.json();
        hideLoading();
        searchInput.value = '';
        const cityName = responseData.name;
        const temp = kelvinToCelsius(responseData.main.temp);
        const feels_like = kelvinToCelsius(responseData.main.feels_like);
        const humidity = responseData.main.humidity;
        const icon = responseData.weather[0].icon;
        const iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
        const desc = responseData.weather[0].description;
        displayWeatherCard(
            cityName,
            iconURL,
            desc,
            temp,
            feels_like,
            humidity
        );
    } catch (err) {
        showMessage('Weather information not found, please type valid city name.');
    }
}

document.addEventListener('DOMContentLoaded', () => {

    searchForm.addEventListener('submit', e => {
        e.preventDefault();
    
        // validate
        if (!searchInput.value) {
            showMessage('Please enter a city name in the input field!');
            return;
        } else {
            getWeahterData();
        }
    
    });

});