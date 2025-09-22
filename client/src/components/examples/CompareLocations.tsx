import { useState } from 'react';
import CompareLocations from '../CompareLocations';

export default function CompareLocationsExample() {
  const [locations, setLocations] = useState([
    { id: "1", name: "San Francisco", country: "United States", latitude: 37.7749, longitude: -122.4194 },
    { id: "2", name: "New York", country: "United States", latitude: 40.7128, longitude: -74.0060 },
  ]);

  const weatherData = {
    "1": {
      location: "San Francisco, CA",
      temperature: 22,
      condition: "partly cloudy",
      description: "Partly cloudy with light breeze",
      feelsLike: 24,
      humidity: 65,
      windSpeed: 12,
      precipitation: 0,
      uvIndex: 6,
      visibility: 10,
      pressure: 1013,
    },
    "2": {
      location: "New York, NY",
      temperature: 18,
      condition: "rainy",
      description: "Light rain with overcast skies",
      feelsLike: 16,
      humidity: 85,
      windSpeed: 8,
      precipitation: 2,
      uvIndex: 3,
      visibility: 8,
      pressure: 1008,
    },
  };

  const handleAddLocation = () => {
    // Simulate adding a new location
    const newLocation = { id: "3", name: "London", country: "United Kingdom", latitude: 51.5074, longitude: -0.1278 };
    setLocations(prev => [...prev, newLocation]);
  };

  const handleRemoveLocation = (locationId: string) => {
    setLocations(prev => prev.filter(loc => loc.id !== locationId));
  };

  return (
    <CompareLocations
      locations={locations}
      weatherData={weatherData}
      onAddLocation={handleAddLocation}
      onRemoveLocation={handleRemoveLocation}
      unit="metric"
    />
  );
}