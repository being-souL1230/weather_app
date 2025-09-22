import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, X, MapPin, Thermometer } from "lucide-react";

interface Location {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface LocationWeather {
  temperature: number;
  condition: string;
  lastUpdated: string;
  airQualityIndex?: number;
}

interface FavoriteLocationsProps {
  favorites: Location[];
  weatherData: Record<string, LocationWeather>;
  onLocationSelect: (location: Location) => void;
  onRemoveFavorite: (locationId: string) => void;
  unit: 'metric' | 'imperial';
  className?: string;
}

export default function FavoriteLocations({
  favorites,
  weatherData,
  onLocationSelect,
  onRemoveFavorite,
  unit,
  className = ""
}: FavoriteLocationsProps) {
  const tempUnit = unit === 'metric' ? '°C' : '°F';

  // Air Quality Index interpretation
  const getAQILabel = (aqi?: number) => {
    if (!aqi) return { label: 'N/A', color: 'bg-gray-500', textColor: 'text-gray-100' };
    if (aqi <= 50) return { label: 'Good', color: 'bg-green-500', textColor: 'text-white' };
    if (aqi <= 100) return { label: 'Moderate', color: 'bg-yellow-500', textColor: 'text-white' };
    if (aqi <= 150) return { label: 'Unhealthy', color: 'bg-orange-500', textColor: 'text-white' };
    if (aqi <= 200) return { label: 'Very Unhealthy', color: 'bg-red-500', textColor: 'text-white' };
    return { label: 'Hazardous', color: 'bg-purple-500', textColor: 'text-white' };
  };

  const handleLocationSelect = (location: Location) => {
    console.log('Favorite location selected:', location);
    onLocationSelect(location);
  };

  const handleRemoveFavorite = (locationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Remove from favorites:', locationId);
    onRemoveFavorite(locationId);
  };

  if (favorites.length === 0) {
    return (
      <Card className={`p-6 text-center card-hover gradient-bg border border-border/30 shadow-xl ${className}`} data-testid="card-favorites-empty">
        <div className="space-y-3">
          <Star className="w-8 h-8 text-muted-foreground mx-auto" />
          <h3 className="text-lg font-medium text-foreground">No Favorite Locations</h3>
          <p className="text-sm text-muted-foreground">
            Star locations in search results to add them to your favorites
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-6 card-hover gradient-bg border border-border/30 shadow-xl ${className}`} data-testid="card-favorites">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-500 fill-current" />
          <h3 className="text-lg font-semibold text-foreground">Favorite Locations</h3>
          <Badge variant="secondary" className="ml-auto">
            {favorites.length}
          </Badge>
        </div>

        <div className="space-y-2">
          {favorites.map((location) => {
            const weather = weatherData[location.id];
            
            return (
              <div
                key={location.id}
                className="flex items-center justify-between p-3 rounded-md transition-colors hover:bg-muted/20 cursor-pointer border border-transparent hover:border-border"
                onClick={() => handleLocationSelect(location)}
                data-testid={`favorite-item-${location.id}`}
              >
                <div className="flex items-center space-x-3 flex-1">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">
                      {location.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {location.country}
                    </div>
                  </div>
                  
                  {weather && (
                    <div className="flex items-center space-x-2">
                      <Thermometer className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm font-medium" data-testid={`temp-${location.id}`}>
                        {Math.round(weather.temperature)}{tempUnit}
                      </span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {weather.condition}
                      </span>
                      {weather.airQualityIndex && (
                        <Badge
                          className={`${getAQILabel(weather.airQualityIndex).color} text-xs px-1 py-0.5 ${getAQILabel(weather.airQualityIndex).textColor}`}
                          data-testid={`aqi-${location.id}`}
                        >
                          {getAQILabel(weather.airQualityIndex).label}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 ml-2"
                  onClick={(e) => handleRemoveFavorite(location.id, e)}
                  data-testid={`button-remove-favorite-${location.id}`}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            );
          })}
        </div>

        {favorites.length > 0 && (
          <div className="pt-3 border-t border-border">
            <div className="text-xs text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}