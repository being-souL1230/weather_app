/**
 * Utility for caching weather data for offline use
 */

import type { Location, CurrentWeather, DayForecast, HourlyData } from './weatherApi';

const CACHE_PREFIX = 'aeroforecast-cache-';
const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour in milliseconds

interface CachedData<T> {
  data: T;
  timestamp: number;
}

/**
 * Save data to local storage with expiration
 */
export function saveToCache<T>(key: string, data: T): void {
  const cacheItem: CachedData<T> = {
    data,
    timestamp: Date.now(),
  };
  
  try {
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(cacheItem));
  } catch (error) {
    console.error('Error saving to cache:', error);
    // If storage is full, clear old items
    clearOldCacheItems();
  }
}

/**
 * Get data from cache if it exists and is not expired
 */
export function getFromCache<T>(key: string): T | null {
  try {
    const cachedItem = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    
    if (!cachedItem) return null;
    
    const parsedItem: CachedData<T> = JSON.parse(cachedItem);
    
    // Check if cache is expired
    if (Date.now() - parsedItem.timestamp > CACHE_EXPIRY) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
      return null;
    }
    
    return parsedItem.data;
  } catch (error) {
    console.error('Error retrieving from cache:', error);
    return null;
  }
}

/**
 * Clear old cache items when storage is full
 */
export function clearOldCacheItems(): void {
  try {
    const keysToRemove: string[] = [];
    const now = Date.now();
    
    // Find all cache keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      if (key && key.startsWith(CACHE_PREFIX)) {
        try {
          const item = JSON.parse(localStorage.getItem(key) || '{}');
          
          // Remove if expired or older than 24 hours
          if (item.timestamp && (now - item.timestamp > CACHE_EXPIRY || now - item.timestamp > 24 * 60 * 60 * 1000)) {
            keysToRemove.push(key);
          }
        } catch (e) {
          // If item can't be parsed, remove it
          keysToRemove.push(key);
        }
      }
    }
    
    // Remove old items
    keysToRemove.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}

/**
 * Cache keys for different types of weather data
 */
export const cacheKeys = {
  currentWeather: (lat: number, lon: number) => `current-${lat}-${lon}`,
  weeklyForecast: (lat: number, lon: number) => `weekly-${lat}-${lon}`,
  hourlyForecast: (lat: number, lon: number) => `hourly-${lat}-${lon}`,
  location: (query: string) => `location-${query}`,
};