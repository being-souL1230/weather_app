import { useState } from 'react';
import FavoriteLocations from '../FavoriteLocations';

export default function FavoriteLocationsExample() {
  const [favorites, setFavorites] = useState([
    { id: "1", name: "San Francisco", country: "United States", latitude: 37.7749, longitude: -122.4194 },
    { id: "2", name: "London", country: "United Kingdom", latitude: 51.5074, longitude: -0.1278 },
    { id: "3", name: "Tokyo", country: "Japan", latitude: 35.6762, longitude: 139.6503 },
  ]);

  const weatherData = {
    "1": { temperature: 22, condition: "partly cloudy", lastUpdated: "2024-01-01T12:00:00Z" },
    "2": { temperature: 15, condition: "rainy", lastUpdated: "2024-01-01T12:00:00Z" },
    "3": { temperature: 28, condition: "sunny", lastUpdated: "2024-01-01T12:00:00Z" },
  };

  const handleLocationSelect = (location: any) => {
    console.log('Selected favorite location:', location);
  };

  const handleRemoveFavorite = (locationId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== locationId));
  };

  return (
    <FavoriteLocations
      favorites={favorites}
      weatherData={weatherData}
      onLocationSelect={handleLocationSelect}
      onRemoveFavorite={handleRemoveFavorite}
      unit="metric"
    />
  );
}