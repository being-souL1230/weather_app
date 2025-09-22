import { useState } from 'react';
import SearchBar from '../SearchBar';

export default function SearchBarExample() {
  const [favorites, setFavorites] = useState([
    { id: "1", name: "San Francisco", country: "United States", latitude: 37.7749, longitude: -122.4194 },
    { id: "3", name: "London", country: "United Kingdom", latitude: 51.5074, longitude: -0.1278 },
  ]);

  const handleLocationSelect = (location: any) => {
    console.log('Selected location:', location);
  };

  const handleCurrentLocation = () => {
    console.log('Requesting current location');
  };

  const handleToggleFavorite = (location: any) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === location.id);
      if (exists) {
        return prev.filter(fav => fav.id !== location.id);
      } else {
        return [...prev, location];
      }
    });
  };

  return (
    <div className="p-4">
      <SearchBar
        onLocationSelect={handleLocationSelect}
        onCurrentLocation={handleCurrentLocation}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}