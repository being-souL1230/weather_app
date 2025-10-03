// Open-Meteo API utilities for weather data
import { saveToCache, getFromCache, cacheKeys } from './offlineCache';

export interface Location {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  admin1?: string;
}

export interface CurrentWeather {
  location: string;
  temperature: number;
  condition: string;
  description: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  uvIndex: number;
  visibility: number;
  pressure: number;
  weatherCode: number;
  airQualityIndex: number;
}

export interface DayForecast {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: string;
  precipitation: number;
  humidity: number;
  weatherCode: number;
}

export interface HourlyData {
  time: string;
  temperature: number;
  condition: string;
  precipitation: number;
  windSpeed: number;
  weatherCode: number;
}

// Weather code to condition mapping
const getWeatherCondition = (code: number): { condition: string; description: string } => {
  const weatherCodes: Record<number, { condition: string; description: string }> = {
    0: { condition: 'clear', description: 'Clear sky' },
    1: { condition: 'partly cloudy', description: 'Mainly clear' },
    2: { condition: 'partly cloudy', description: 'Partly cloudy' },
    3: { condition: 'cloudy', description: 'Overcast' },
    45: { condition: 'cloudy', description: 'Fog' },
    48: { condition: 'cloudy', description: 'Depositing rime fog' },
    51: { condition: 'light rain', description: 'Light drizzle' },
    53: { condition: 'light rain', description: 'Moderate drizzle' },
    55: { condition: 'rainy', description: 'Dense drizzle' },
    56: { condition: 'light rain', description: 'Light freezing drizzle' },
    57: { condition: 'rainy', description: 'Dense freezing drizzle' },
    61: { condition: 'light rain', description: 'Slight rain' },
    63: { condition: 'rainy', description: 'Moderate rain' },
    65: { condition: 'heavy rain', description: 'Heavy rain' },
    66: { condition: 'light rain', description: 'Light freezing rain' },
    67: { condition: 'rainy', description: 'Heavy freezing rain' },
    71: { condition: 'snow', description: 'Slight snow fall' },
    73: { condition: 'snow', description: 'Moderate snow fall' },
    75: { condition: 'snow', description: 'Heavy snow fall' },
    77: { condition: 'snow', description: 'Snow grains' },
    80: { condition: 'light rain', description: 'Slight rain showers' },
    81: { condition: 'rainy', description: 'Moderate rain showers' },
    82: { condition: 'heavy rain', description: 'Violent rain showers' },
    85: { condition: 'snow', description: 'Slight snow showers' },
    86: { condition: 'snow', description: 'Heavy snow showers' },
    95: { condition: 'thunderstorm', description: 'Thunderstorm' },
    96: { condition: 'thunderstorm', description: 'Thunderstorm with slight hail' },
    99: { condition: 'thunderstorm', description: 'Thunderstorm with heavy hail' },
  };
  
  return weatherCodes[code] || { condition: 'cloudy', description: 'Unknown' };
};

import { saveToCache, getFromCache, cacheKeys } from './offlineCache';

// Geocoding API - Search for locations
export async function searchLocations(query: string): Promise<Location[]> {
  if (query.length < 2) return [];
  
  // Try to get from cache first
  const cachedLocations = getFromCache<Location[]>(cacheKeys.location(query));
  if (cachedLocations) {
    return cachedLocations;
  }
  
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search locations');
    }
    
    const data = await response.json();
    
    if (!data.results) return [];
    
    const locations = data.results.map((result: any) => ({
      id: `${result.latitude}_${result.longitude}`,
      name: result.name,
      country: result.country,
      latitude: result.latitude,
      longitude: result.longitude,
      admin1: result.admin1,
    }));
    
    // Save to cache
    saveToCache(cacheKeys.location(query), locations);
    
    return locations;
  } catch (error) {
    console.error('Error searching locations:', error);
    return [];
  }
}

// Get current weather data
export async function getCurrentWeather(latitude: number, longitude: number): Promise<CurrentWeather> {
  // Try to get from cache first
  const cachedWeather = getFromCache<CurrentWeather>(cacheKeys.currentWeather(latitude, longitude));
  if (cachedWeather) {
    return cachedWeather;
  }
  
  try {
    // Fetch weather data
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m,uv_index&daily=sunrise,sunset&timezone=auto`
    );

    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch current weather');
    }

    const weatherData = await weatherResponse.json();
    const current = weatherData.current;
    const { condition, description } = getWeatherCondition(current.weather_code);

    // Fetch air quality data
    let airQualityIndex = undefined;
    try {
      const aqiResponse = await fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=us_aqi`
      );

      if (aqiResponse.ok) {
        const aqiData = await aqiResponse.json();
        airQualityIndex = aqiData.current?.us_aqi;
      }
    } catch (error) {
      console.warn('Failed to fetch air quality data:', error);
    }

    const weatherResult = {
      location: 'Current Location', // This will be updated with reverse geocoding
      temperature: Math.round(current.temperature_2m),
      condition,
      description,
      feelsLike: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m * 3.6), // Convert m/s to km/h
      precipitation: current.precipitation || 0,
      uvIndex: current.uv_index || 0,
      visibility: 10, // Open-Meteo doesn't provide visibility, using default
      pressure: Math.round(current.surface_pressure),
      weatherCode: current.weather_code,
      airQualityIndex,
    };
    
    // Save to cache
    saveToCache(cacheKeys.currentWeather(latitude, longitude), weatherResult);
    
    return weatherResult;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw new Error('Failed to fetch weather data');
  }
}

// Get 7-day forecast
export async function getWeeklyForecast(latitude: number, longitude: number): Promise<DayForecast[]> {
  // Try to get from cache first
  const cachedForecast = getFromCache<DayForecast[]>(cacheKeys.weeklyForecast(latitude, longitude));
  if (cachedForecast) {
    return cachedForecast;
  }
  
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,relative_humidity_2m_mean&timezone=auto`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weekly forecast');
    }
    
    const data = await response.json();
    const daily = data.daily;
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const forecast = daily.time.map((date: string, index: number) => {
      const dateObj = new Date(date);
      const dayName = index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : days[dateObj.getDay()];
      const { condition } = getWeatherCondition(daily.weather_code[index]);
      
      return {
        date,
        day: dayName,
        high: Math.round(daily.temperature_2m_max[index]),
        low: Math.round(daily.temperature_2m_min[index]),
        condition,
        precipitation: daily.precipitation_probability_max[index] || 0,
        humidity: daily.relative_humidity_2m_mean[index] || 0,
        weatherCode: daily.weather_code[index],
      };
    });
    
    // Save to cache
    saveToCache(cacheKeys.weeklyForecast(latitude, longitude), forecast);
    
    return forecast;
  } catch (error) {
    console.error('Error fetching weekly forecast:', error);
    throw new Error('Failed to fetch forecast data');
  }
}

// Get hourly forecast
export async function getHourlyForecast(latitude: number, longitude: number): Promise<HourlyData[]> {
  // Try to get from cache first
  const cachedHourly = getFromCache<HourlyData[]>(cacheKeys.hourlyForecast(latitude, longitude));
  if (cachedHourly) {
    return cachedHourly;
  }
  
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,weather_code,wind_speed_10m&timezone=auto&forecast_days=7`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch hourly forecast');
    }
    
    const data = await response.json();
    const hourly = data.hourly;
    
    const now = new Date();
    const currentHour = now.getHours();
    
    // Get next 7 days (168 hours) starting from current hour
    const hourlyData = hourly.time.slice(currentHour, currentHour + 168).map((time: string, index: number) => {
      const date = new Date(time);
      const hour = date.getHours();
      const timeString = hour === 0 ? '12 AM' : hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
      const { condition } = getWeatherCondition(hourly.weather_code[currentHour + index]);
      
      return {
        time: timeString,
        temperature: Math.round(hourly.temperature_2m[currentHour + index]),
        condition,
        precipitation: hourly.precipitation_probability[currentHour + index] || 0,
        windSpeed: Math.round(hourly.wind_speed_10m[currentHour + index] * 3.6), // Convert m/s to km/h
        weatherCode: hourly.weather_code[currentHour + index],
      };
    });
    
    // Save to cache
    saveToCache(cacheKeys.hourlyForecast(latitude, longitude), hourlyData);
    
    return hourlyData;
  } catch (error) {
    console.error('Error fetching hourly forecast:', error);
    throw new Error('Failed to fetch hourly data');
  }
}

// Get user's current location using geolocation API
export async function getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        let message = 'Failed to get current location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable';
            break;
          case error.TIMEOUT:
            message = 'Location request timed out';
            break;
        }
        reject(new Error(message));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
}

// Convert temperature between units
export function convertTemperature(temp: number, fromUnit: 'metric' | 'imperial', toUnit: 'metric' | 'imperial'): number {
  if (fromUnit === toUnit) return temp;
  
  if (fromUnit === 'metric' && toUnit === 'imperial') {
    return (temp * 9/5) + 32;
  } else {
    return (temp - 32) * 5/9;
  }
}

// Convert wind speed between units
export function convertWindSpeed(speed: number, fromUnit: 'metric' | 'imperial', toUnit: 'metric' | 'imperial'): number {
  if (fromUnit === toUnit) return speed;
  
  if (fromUnit === 'metric' && toUnit === 'imperial') {
    return speed * 0.621371; // km/h to mph
  } else {
    return speed / 0.621371; // mph to km/h
  }
}

// Convert precipitation between units  
export function convertPrecipitation(precip: number, fromUnit: 'metric' | 'imperial', toUnit: 'metric' | 'imperial'): number {
  if (fromUnit === toUnit) return precip;
  
  if (fromUnit === 'metric' && toUnit === 'imperial') {
    return precip * 0.0393701; // mm to inches
  } else {
    return precip / 0.0393701; // inches to mm
  }
}