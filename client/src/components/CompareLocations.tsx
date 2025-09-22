import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Plus, Star, Search } from "lucide-react";
import WeatherCard from "./WeatherCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Location {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface WeatherData {
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
  airQualityIndex: number;
}

interface CompareLocationsProps {
  locations: Location[];
  weatherData: Record<string, WeatherData>;
  onAddLocation: () => void;
  onRemoveLocation: (locationId: string) => void;
  unit: 'metric' | 'imperial';
  className?: string;
  isLoading?: boolean;
  favorites?: Location[];
  onAddFavoriteToCompare?: (location: Location) => void;
  onAddAnyLocationToCompare?: (location: Location) => void;
}

export default function CompareLocations({
  locations,
  weatherData,
  onAddLocation,
  onRemoveLocation,
  unit,
  className = "",
  isLoading = false,
  favorites,
  onAddFavoriteToCompare,
  onAddAnyLocationToCompare,
}: CompareLocationsProps) {
  const maxLocations = 3;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  const handleAddFavoriteToCompare = (favorite: Location) => {
    if (onAddFavoriteToCompare) {
      onAddFavoriteToCompare(favorite);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.length < 3) return;

    setIsSearching(true);
    try {
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=5&language=en&format=json`);
      const data = await response.json();

      if (data.results) {
        const locations: Location[] = data.results.map((result: any) => ({
          id: `${result.latitude}_${result.longitude}_${Date.now()}`,
          name: result.name,
          country: result.country || result.country_code || '',
          latitude: result.latitude,
          longitude: result.longitude,
        }));
        setSearchResults(locations);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddSearchResult = (location: Location) => {
    if (onAddAnyLocationToCompare) {
      onAddAnyLocationToCompare(location);
      setSearchDialogOpen(false);
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const handleAddLocation = () => {
    console.log('Add location for comparison');
    onAddLocation();
  };

  const handleRemoveLocation = (locationId: string) => {
    console.log('Remove location from comparison:', locationId);
    onRemoveLocation(locationId);
  };

  if (locations.length === 0) {
    return (
      <Card className={`p-8 text-center hover-elevate gradient-bg border border-border/30 shadow-xl ${className}`} data-testid="card-compare-empty">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Compare Locations</h3>
          <p className="text-muted-foreground">Add locations to compare weather conditions side by side</p>
          <Button onClick={handleAddLocation} data-testid="button-add-first-location">
            <Plus className="w-4 h-4 mr-2" />
            Add Location
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h3 className="text-xl font-semibold text-foreground">Compare Locations</h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          {favorites && favorites.length > 0 && locations.length < maxLocations && (
            <Select onValueChange={(value) => {
              const favorite = favorites.find(fav => fav.id === value);
              if (favorite) handleAddFavoriteToCompare(favorite);
            }}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Add from favorites" />
              </SelectTrigger>
              <SelectContent>
                {favorites
                  .filter(fav => !locations.some(loc => loc.id === fav.id))
                  .map((favorite) => (
                    <SelectItem key={favorite.id} value={favorite.id}>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{favorite.name}</span>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          )}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            {locations.length < maxLocations && (
              <Button size="sm" onClick={handleAddLocation} data-testid="button-add-location">
                <Plus className="w-4 h-4 mr-2" />
                Add Current
              </Button>
            )}
            {locations.length < maxLocations && onAddAnyLocationToCompare && (
              <Dialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" data-testid="button-add-any-location">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Any Location
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Search Location</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Enter city name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        className="pl-10"
                      />
                    </div>
                    <Button
                      onClick={handleSearch}
                      disabled={isSearching || searchQuery.length < 3}
                      className="w-full"
                    >
                      {isSearching ? 'Searching...' : 'Search'}
                    </Button>

                    {searchResults.length > 0 && (
                      <div className="max-h-48 overflow-y-auto space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">Search Results:</h4>
                        {searchResults.map((result) => (
                          <div
                            key={result.id}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg border hover:bg-accent/50 cursor-pointer gap-2"
                            onClick={() => handleAddSearchResult(result)}
                          >
                            <div className="flex-1">
                              <div className="font-medium">{result.name}</div>
                              {result.country && (
                                <div className="text-sm text-muted-foreground">{result.country}</div>
                              )}
                            </div>
                            <Button size="sm" variant="outline" className="w-full sm:w-auto">
                              Add
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {searchQuery.length >= 3 && !isSearching && searchResults.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center">
                        No locations found. Try a different search term.
                      </p>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => {
          const weather = weatherData[location.id];
          
          if (!weather) {
            return (
              <Card key={location.id} className="p-6 hover-elevate gradient-bg border border-border/30 shadow-xl" data-testid={`card-loading-${location.id}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-6 bg-muted rounded animate-pulse w-2/3" />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleRemoveLocation(location.id)}
                    data-testid={`button-remove-${location.id}`}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="h-12 bg-muted rounded animate-pulse" />
                  <div className="h-8 bg-muted rounded animate-pulse" />
                </div>
              </Card>
            );
          }

          return (
            <div key={location.id} className="relative">
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background"
                onClick={() => handleRemoveLocation(location.id)}
                data-testid={`button-remove-${location.id}`}
              >
                <X className="w-4 h-4" />
              </Button>
              
              {/* Location Header */}
              <div className="absolute top-2 left-2 z-10 bg-background/80 rounded-lg px-2 py-1">
              </div>
              
              <WeatherCard
                location={location.name}
                temperature={weather.temperature}
                condition={weather.condition}
                description={weather.description}
                feelsLike={weather.feelsLike}
                humidity={weather.humidity}
                windSpeed={weather.windSpeed}
                precipitation={weather.precipitation}
                uvIndex={weather.uvIndex}
                visibility={weather.visibility}
                pressure={weather.pressure}
                airQualityIndex={weather.airQualityIndex}
                unit={unit}
                className="pt-10"
                showAqiNumber={false}
              />
            </div>
          );
        })}
      </div>

      {locations.length >= 2 && (
        <Card className="mt-6 p-4 gradient-bg border border-primary/20 shadow-lg" data-testid="card-comparison-summary">
          <h4 className="font-medium text-foreground mb-3">Quick Comparison</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Warmest:</span>
              <div className="font-medium">
                {(() => {
                  const temps = locations.map(loc => weatherData[loc.id]?.temperature || 0);
                  const maxTemp = Math.max(...temps);
                  const warmestLocation = locations.find(loc => weatherData[loc.id]?.temperature === maxTemp);
                  return `${warmestLocation?.name} (${Math.round(maxTemp)}°)`;
                })()}
              </div>
            </div>

            <div>
              <span className="text-muted-foreground">Coolest:</span>
              <div className="font-medium">
                {(() => {
                  const temps = locations.map(loc => weatherData[loc.id]?.temperature || 0);
                  const minTemp = Math.min(...temps);
                  const coolestLocation = locations.find(loc => weatherData[loc.id]?.temperature === minTemp);
                  return `${coolestLocation?.name} (${Math.round(minTemp)}°)`;
                })()}
              </div>
            </div>

            <div>
              <span className="text-muted-foreground">Most Humid:</span>
              <div className="font-medium">
                {(() => {
                  const humidities = locations.map(loc => weatherData[loc.id]?.humidity || 0);
                  const maxHumidity = Math.max(...humidities);
                  const humidLocation = locations.find(loc => weatherData[loc.id]?.humidity === maxHumidity);
                  return `${humidLocation?.name} (${maxHumidity}%)`;
                })()}
              </div>
            </div>

            <div>
              <span className="text-muted-foreground">Windiest:</span>
              <div className="font-medium">
                {(() => {
                  const winds = locations.map(loc => weatherData[loc.id]?.windSpeed || 0);
                  const maxWind = Math.max(...winds);
                  const windyLocation = locations.find(loc => weatherData[loc.id]?.windSpeed === maxWind);
                  const windUnit = unit === 'metric' ? 'km/h' : 'mph';
                  return `${windyLocation?.name} (${maxWind} ${windUnit})`;
                })()}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}