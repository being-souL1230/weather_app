import { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  Location, 
  CurrentWeather, 
  DayForecast, 
  HourlyData,
  getCurrentWeather,
  getWeeklyForecast,
  getHourlyForecast,
  searchLocations,
  getCurrentLocation,
  convertTemperature,
  convertWindSpeed,
  convertPrecipitation
} from '@/lib/weatherApi';
import { useOnlineStatus } from './useOnlineStatus';

// Hook for managing favorites in localStorage
export function useFavorites() {
  const [favorites, setFavorites] = useState<Location[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('weather-favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  const saveFavorites = useCallback((newFavorites: Location[]) => {
    setFavorites(newFavorites);
    localStorage.setItem('weather-favorites', JSON.stringify(newFavorites));
  }, []);

  const addFavorite = useCallback((location: Location) => {
    setFavorites((prev: Location[]) => {
      if (prev.some((fav: Location) => fav.id === location.id)) return prev;
      const newFavorites = [...prev, location];
      localStorage.setItem('weather-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const removeFavorite = useCallback((locationId: string) => {
    setFavorites((prev: Location[]) => {
      const newFavorites = prev.filter((fav: Location) => fav.id !== locationId);
      localStorage.setItem('weather-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((locationId: string) => {
    return favorites.some(fav => fav.id === locationId);
  }, [favorites]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}

// Hook for location search
export function useLocationSearch() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const { data: suggestions = [], error } = useQuery({
    queryKey: ['locations', query],
    queryFn: () => searchLocations(query),
    enabled: query.length > 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const search = useCallback(async (searchQuery: string) => {
    setQuery(searchQuery);
    setIsSearching(true);
    
    try {
      const results = await searchLocations(searchQuery);
      setIsSearching(false);
      return results;
    } catch (error) {
      setIsSearching(false);
      throw error;
    }
  }, []);

  return {
    query,
    suggestions,
    isSearching,
    error,
    search,
    setQuery,
  };
}

// Hook for current location
export function useCurrentLocation() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentPos = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const position = await getCurrentLocation();
      setLocation(position);
      return position;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to get location';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    location,
    loading,
    error,
    getCurrentLocation: getCurrentPos,
  };
}

// Hook for weather data with unit conversion
export function useWeatherData(latitude?: number, longitude?: number, unit: 'metric' | 'imperial' = 'metric') {
  const queryClient = useQueryClient();
  const isOnline = useOnlineStatus();
  
  // Current weather
  const { data: currentWeather, isLoading: currentLoading, error: currentError } = useQuery({
    queryKey: ['current-weather', latitude, longitude],
    queryFn: () => getCurrentWeather(latitude!, longitude!),
    enabled: !!latitude && !!longitude,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: isOnline ? 10 * 60 * 1000 : false, // Auto-refresh every 10 minutes when online
  });

  // Weekly forecast
  const { data: weeklyForecast, isLoading: weeklyLoading, error: weeklyError } = useQuery({
    queryKey: ['weekly-forecast', latitude, longitude],
    queryFn: () => getWeeklyForecast(latitude!, longitude!),
    enabled: !!latitude && !!longitude,
    staleTime: 30 * 60 * 1000, // 30 minutes
    refetchInterval: isOnline ? 30 * 60 * 1000 : false, // Only refresh when online
  });

  // Hourly forecast
  const { data: hourlyForecast, isLoading: hourlyLoading, error: hourlyError } = useQuery({
    queryKey: ['hourly-forecast', latitude, longitude],
    queryFn: () => getHourlyForecast(latitude!, longitude!),
    enabled: !!latitude && !!longitude,
    staleTime: 15 * 60 * 1000, // 15 minutes
    refetchInterval: isOnline ? 15 * 60 * 1000 : false, // Only refresh when online
  });

  // Convert data based on unit preference
  const convertedCurrentWeather = currentWeather ? {
    ...currentWeather,
    temperature: unit === 'imperial' ? convertTemperature(currentWeather.temperature, 'metric', 'imperial') : currentWeather.temperature,
    feelsLike: unit === 'imperial' ? convertTemperature(currentWeather.feelsLike, 'metric', 'imperial') : currentWeather.feelsLike,
    windSpeed: unit === 'imperial' ? convertWindSpeed(currentWeather.windSpeed, 'metric', 'imperial') : currentWeather.windSpeed,
    precipitation: unit === 'imperial' ? convertPrecipitation(currentWeather.precipitation, 'metric', 'imperial') : currentWeather.precipitation,
  } : null;

  const convertedWeeklyForecast = weeklyForecast?.map(day => ({
    ...day,
    high: unit === 'imperial' ? convertTemperature(day.high, 'metric', 'imperial') : day.high,
    low: unit === 'imperial' ? convertTemperature(day.low, 'metric', 'imperial') : day.low,
  }));

  const convertedHourlyForecast = hourlyForecast?.map(hour => ({
    ...hour,
    temperature: unit === 'imperial' ? convertTemperature(hour.temperature, 'metric', 'imperial') : hour.temperature,
    windSpeed: unit === 'imperial' ? convertWindSpeed(hour.windSpeed, 'metric', 'imperial') : hour.windSpeed,
  }));

  const refetchAll = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['current-weather', latitude, longitude] });
    queryClient.invalidateQueries({ queryKey: ['weekly-forecast', latitude, longitude] });
    queryClient.invalidateQueries({ queryKey: ['hourly-forecast', latitude, longitude] });
  }, [queryClient, latitude, longitude]);

  return {
    currentWeather: convertedCurrentWeather,
    weeklyForecast: convertedWeeklyForecast,
    hourlyForecast: convertedHourlyForecast,
    isLoading: currentLoading || weeklyLoading || hourlyLoading,
    error: currentError || weeklyError || hourlyError,
    refetchAll,
  };
}

// Hook for compare weather data
export function useCompareWeatherData(locations: Location[], unit: 'metric' | 'imperial' = 'metric') {
  const [compareWeatherData, setCompareWeatherData] = useState<Record<string, CurrentWeather>>({});

  // Fetch weather data for each location
  const { data: weatherResults, isLoading, error } = useQuery({
    queryKey: ['compare-weather', locations.map(loc => `${loc.latitude}_${loc.longitude}`), unit],
    queryFn: async () => {
      const results: Record<string, CurrentWeather> = {};

      await Promise.all(
        locations.map(async (location) => {
          try {
            const weather = await getCurrentWeather(location.latitude, location.longitude);
            results[location.id] = weather;
          } catch (error) {
            console.error(`Failed to fetch weather for ${location.name}:`, error);
            // Keep existing data if available
          }
        })
      );

      return results;
    },
    enabled: locations.length > 0,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 10 * 60 * 1000, // Auto-refresh every 10 minutes
  });

  // Update local state when data changes
  useEffect(() => {
    if (weatherResults) {
      setCompareWeatherData(weatherResults);
    }
  }, [weatherResults]);

  // Convert data based on unit preference
  const convertedCompareWeatherData = Object.entries(compareWeatherData).reduce((acc, [locationId, weather]) => {
    acc[locationId] = {
      ...weather,
      temperature: unit === 'imperial' ? convertTemperature(weather.temperature, 'metric', 'imperial') : weather.temperature,
      feelsLike: unit === 'imperial' ? convertTemperature(weather.feelsLike, 'metric', 'imperial') : weather.feelsLike,
      windSpeed: unit === 'imperial' ? convertWindSpeed(weather.windSpeed, 'metric', 'imperial') : weather.windSpeed,
      precipitation: unit === 'imperial' ? convertPrecipitation(weather.precipitation, 'metric', 'imperial') : weather.precipitation,
    };
    return acc;
  }, {} as Record<string, CurrentWeather>);

  return {
    compareWeatherData: convertedCompareWeatherData,
    isLoading,
    error,
  };
}