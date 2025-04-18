// App.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Button } from 'react-native';
import { getWeatherData } from './src/services/weatherService';
import { shouldWater } from './src/utils/shouldWater';
import cities from './src/data/cities.json';

export default function App() {
  const [shouldWaterPlants, setShouldWaterPlants] = useState(null);
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [decisionExplanation, setDecisionExplanation] = useState('');

  const reloadCity = async () => {
    setLoading(true);
    setErrorMessage('');
    
    try {
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const { lat, lon, name } = randomCity;
      setSelectedCity(name);

      const data = await getWeatherData(lat, lon);

      if (!data?.main || !data?.weather) {
        console.error('Incomplete weather data.');
        setErrorMessage('Unable to fetch complete weather data. Please try again later.');
        return;
      }

      const { decision, reason } = shouldWater(data);

      setWeatherDetails({
        temp: data.main.temp,
        humidity: data.main.humidity,
        sky: data.weather[0].main,
      });
      setShouldWaterPlants(decision);
      setDecisionExplanation(reason);

    } catch (error) {
      console.error(error);
      setErrorMessage('Unable to fetch weather data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      setErrorMessage('');

      try {
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const { lat, lon, name } = randomCity;
        setSelectedCity(name);

        const data = await getWeatherData(lat, lon);

        if (!data?.main || !data?.weather) {
          console.error('Incomplete weather data.');
          setErrorMessage('Unable to fetch complete weather data. Please try again later.');
          return;
        }

        const { decision, reason } = shouldWater(data);

        setWeatherDetails({
          temp: data.main.temp,
          humidity: data.main.humidity,
          sky: data.weather[0].main,
        });
        setShouldWaterPlants(decision);
        setDecisionExplanation(reason);

      } catch (error) {
        console.error(error);
        setErrorMessage('Unable to fetch weather data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  
    fetchWeather();
  }, []);

  if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading weather data...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.mainText, { color: shouldWaterPlants ? 'green' : 'orange' }]}>
        {shouldWaterPlants ? 'Yes, water your plants! 🌱' : 'No need to water today! ☀️'}
      </Text>

      <Text style={styles.subText}>
        {decisionExplanation}
      </Text>

      <Text style={styles.cityText}>
        Checking weather in: {selectedCity}
      </Text>

      <Text style={styles.reportText}>Current temperature: {weatherDetails.temp}°C</Text>
      <Text style={styles.reportText}>Current humidity: {weatherDetails.humidity}%</Text>
      <Text style={styles.reportText}>Sky conditions: {weatherDetails.sky}</Text>

      <Button title="Reload City 🌎" onPress={reloadCity} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  mainText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  cityText: {
    fontSize: 20,
    color: '#666',
    marginBottom: 30,
  },
  reportContainer: {
    alignItems: 'center',
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#888',
  },
  reportText: {
    fontSize: 16,
    color: '#aaa',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    padding: 20,
  },
  subText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
});
