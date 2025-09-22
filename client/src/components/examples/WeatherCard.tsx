import WeatherCard from '../WeatherCard';

export default function WeatherCardExample() {
  return (
    <WeatherCard
      location="San Francisco, CA"
      temperature={22}
      condition="partly cloudy"
      description="Partly cloudy with light breeze"
      feelsLike={24}
      humidity={65}
      windSpeed={12}
      precipitation={0}
      uvIndex={6}
      visibility={10}
      pressure={1013}
      unit="metric"
    />
  );
}