// src/services/weatherService.js

const API_KEY = '100ebf4ca6360f3a30ed6a8550a45e18'.trim(); // tu key real
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getWeatherData(lat, lon) {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}
