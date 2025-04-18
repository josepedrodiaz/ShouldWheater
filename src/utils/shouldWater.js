export function shouldWater(data) {
  const avgTemp = data.main.temp;
  const humidity = data.main.humidity;
  const skyCondition = data.weather[0].main;

  if (avgTemp > 25 && humidity < 50 && skyCondition !== 'Rain') {
    return {
      decision: true,
      reason: 'It has been hot and dry recently, so watering is recommended.'
    };
  }

  if (humidity > 70 || skyCondition === 'Rain') {
    return {
      decision: false,
      reason: 'There was enough humidity or rain recently, so watering is not needed.'
    };
  }

  return {
    decision: false,
    reason: 'Mild temperatures and normal humidity levels mean no extra watering needed.'
  };
}
