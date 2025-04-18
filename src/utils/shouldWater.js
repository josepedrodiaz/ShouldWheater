// src/utils/shouldWater.js

export function shouldWater(weatherData) {
  if (!weatherData) return false;

  const { main, weather } = weatherData;

  const currentTemp = main?.temp; // Current temperature
  const humidity = main?.humidity; // Current humidity
  const isClearSky = weather?.[0]?.main === 'Clear';

  const isMidday = new Date().getHours() >= 11 && new Date().getHours() <= 15;

  if (isMidday && isClearSky) {
    return false;
  }

  const isDry = humidity < 50;

  if (currentTemp > 20 && isDry) {
    return true;
  }

  return false;
}
