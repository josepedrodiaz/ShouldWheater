// App.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { getWeatherData } from './src/services/weatherService';
import { shouldWater } from './src/utils/shouldWater';
import { cities } from './src/data/cities';

export default function App() {
  const [shouldWaterPlants, setShouldWaterPlants] = useState(null);
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [decisionExplanation, setDecisionExplanation] = useState('');

  useEffect(() => {
    async function fetchWeather() {
      try {
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const { lat, lon, name } = randomCity;
        setSelectedCity(name);
  
        const data = await getWeatherData(lat, lon);
  
        if (!data?.main || !data?.weather) {
          console.error('Incomplete weather data.');
          setErrorMessage('Unable to fetch complete weather data. Please try again later.');
          setLoading(false);
          return;
        }
  
        const decision = shouldWater(data);
  
        setWeatherDetails({
          temp: data.main.temp,
          humidity: data.main.humidity,
          sky: data.weather[0].main,
        });
  
        setShouldWaterPlants(decision);

        // Prepare friendly explanation
        if (decision) {
          if (data.main.temp > 25 && data.main.humidity < 50) {
            setDecisionExplanation('It has been hot and dry recently, so watering is recommended.');
          } else {
            setDecisionExplanation('Recent conditions suggest your plants could use some extra water.');
          }
        } else {
          if (data.main.humidity > 60 || data.weather[0].main === 'Rain') {
            setDecisionExplanation('There was enough humidity or rain recently, so watering is not needed.');
          } else {
            setDecisionExplanation('Mild temperatures and normal humidity levels mean no extra watering needed.');
          }
        }


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
});
