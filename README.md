# Plant Watering Advisor 🌱

This is a simple React Native app that helps you decide whether you should water your plants based on the current weather in a random city.

## Features

- 🌎 Randomly selects a city from a local JSON file.
- 🌦️ Fetches and displays current temperature, humidity, and sky conditions.
- 💧 Advises whether or not to water your plants.
- 🔄 Allows reloading to check another city.
- ⚠️ Handles loading and error states.

## How It Works

1. Select a random city from `cities.json`.
2. Fetch weather data using `getWeatherData`.
3. Evaluate watering need with `shouldWater`.
4. Display recommendation and weather details.

## Dependencies
react

react-native

expo

## Customization
Add cities in /src/data/cities.json.

Modify decision logic in /src/utils/shouldWater.js.

Update weather fetching in /src/services/weatherService.js.

## Contributing
Pull requests are welcome. Please open an issue first to discuss what you would like to change.

## License
MIT License
