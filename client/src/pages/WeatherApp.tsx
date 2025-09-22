import { useState, useEffect } from "react";
import WeatherBackground from "@/components/WeatherBackground";
import WeatherSuggestions from "@/components/WeatherSuggestions";
import AirQualityDetails from "@/components/AirQualityDetails";
import WeatherCard from "@/components/WeatherCard";
import SearchBar from "@/components/SearchBar";
import ForecastCard from "@/components/ForecastCard";
import HourlyForecast from "@/components/HourlyForecast";
import FavoriteLocations from "@/components/FavoriteLocations";
import CompareLocations from "@/components/CompareLocations";
import UnitToggle from "@/components/UnitToggle";
import ThemeToggle from "@/components/ThemeToggle";
import CustomCursor from "@/components/CustomCursor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Star, BarChart3, Clock, Sun, Moon, Loader2, AlertCircle, Brain, Wind, Menu, X } from "lucide-react";
import { useFavorites, useCurrentLocation, useWeatherData, useCompareWeatherData } from "@/hooks/useWeatherData";
import type { Location } from "@/lib/weatherApi";

export default function WeatherApp() {
  const { toast } = useToast();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { location: userLocation, loading: locationLoading, getCurrentLocation } = useCurrentLocation();

  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [compareLocations, setCompareLocations] = useState<Location[]>([]);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [activeView, setActiveView] = useState<'weather' | 'forecast' | 'hourly' | 'suggestions' | 'air-quality' | 'compare' | 'favorites'>('weather');

  // Mobile menu state for header
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get weather data for current location
  const {
    currentWeather,
    weeklyForecast,
    hourlyForecast,
    isLoading: weatherLoading,
    error: weatherError,
    refetchAll
  } = useWeatherData(currentLocation?.latitude, currentLocation?.longitude, unit);

  // Get weather data for compare locations
  const { compareWeatherData, isLoading: compareLoading } = useCompareWeatherData(compareLocations, unit);

  // Initialize with user's current location on first load
  useEffect(() => {
    if (!currentLocation) {
      handleCurrentLocation();
    }
  }, []);

  const [selectedDay, setSelectedDay] = useState('Today');
  const availableDays = ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5'];

  // Generate better day names
  const getDayNames = () => {
    const days = ['Today', 'Tomorrow'];
    const today = new Date();

    for (let i = 2; i < 5; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      const dayName = futureDate.toLocaleDateString('en-US', { weekday: 'short' });
      days.push(dayName);
    }

    return days;
  };

  const dayNames = getDayNames();

  // Mock data for features not yet implemented with real API
  const favoriteWeatherData = favorites.reduce((acc: any, fav: any) => {
    acc[fav.id] = {
      temperature: 20, // This would come from batch API calls
      condition: "partly cloudy",
      lastUpdated: new Date().toISOString(),
      airQualityIndex: Math.floor(Math.random() * 100) + 1 // Mock AQI data
    };
    return acc;
  }, {} as Record<string, any>);

  const handleLocationSelect = (location: Location) => {
    setCurrentLocation(location);
    setActiveView('weather');
    setSelectedDay('Today'); // Reset to Today when location changes
    toast({
      title: "Location updated",
      description: `Now showing weather for ${location.name}`,
    });
  };

  const handleCurrentLocation = async () => {
    try {
      const position = await getCurrentLocation();

      // Create a location object for current position
      const currentLoc: Location = {
        id: `${position.latitude}_${position.longitude}`,
        name: "Current Location",
        country: "",
        latitude: position.latitude,
        longitude: position.longitude,
      };

      setCurrentLocation(currentLoc);
      setActiveView('weather');
      setSelectedDay('Today'); // Reset to Today when location changes

      toast({
        title: "Location detected",
        description: "Now showing weather for your current location",
      });
    } catch (error) {
      toast({
        title: "Location Error",
        description: error instanceof Error ? error.message : "Failed to get your location",
        variant: "destructive",
      });
    }
  };

  const handleToggleFavorite = (location: Location) => {
    if (isFavorite(location.id)) {
      removeFavorite(location.id);
      toast({
        title: "Removed from favorites",
        description: `${location.name} has been removed from your favorites`,
      });
    } else {
      addFavorite(location);
      toast({
        title: "Added to favorites",
        description: `${location.name} has been added to your favorites`,
      });
    }
  };

  const handleAddToCompare = () => {
    // Add current location to compare if not already there
    if (currentLocation && !compareLocations.find(loc => loc.id === currentLocation.id)) {
      setCompareLocations(prev => [...prev, currentLocation]);
      toast({
        title: "Location added",
        description: `${currentLocation.name} has been added to comparison`,
      });
    } else if (currentLocation && compareLocations.find(loc => loc.id === currentLocation.id)) {
      toast({
        title: "Already added",
        description: `${currentLocation.name} is already in comparison`,
      });
    } else {
      toast({
        title: "No location",
        description: "Please select a location first",
        variant: "destructive",
      });
    }
  };

  const handleRemoveFromCompare = (locationId: string) => {
    setCompareLocations(prev => prev.filter(loc => loc.id !== locationId));
    toast({
      title: "Location removed",
      description: "Location has been removed from comparison",
    });
  };

  const getSunriseSunset = () => {
    // This would come from the daily API data, for now using mock
    return {
      sunrise: "6:42 AM",
      sunset: "7:18 PM"
    };
  };

  const { sunrise, sunset } = getSunriseSunset();

  // Show loading state
  if (!currentLocation && locationLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Getting your location...</p>
        </div>
      </div>
    );
  }

  // Show error state if no location and failed to get current location
  if (!currentLocation && !locationLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 max-w-md mx-auto text-center">
          <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">Location Required</h2>
          <p className="text-muted-foreground mb-4">
            Please allow location access or search for a city to get weather data.
          </p>
          <Button onClick={handleCurrentLocation} className="mr-2">
            <MapPin className="w-4 h-4 mr-2" />
            Get Current Location
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <CustomCursor>
      <WeatherBackground condition={currentWeather?.condition || 'cloudy'}>
        <div className="min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-50 glass-effect-enhanced border-b border-border/50">
            <div className="max-w-7xl mx-auto px-3 py-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <h1 className="text-lg sm:text-xl font-bold text-shimmer animate-float">🌤️ AeroForecast</h1>
                  <Badge variant="outline" className="hidden sm:flex border-primary/30 text-primary animate-pulse-soft text-xs">
                    {weatherLoading ? 'Loading...' : 'Live Data'}
                  </Badge>
                </div>

                {/* Desktop Header */}
                <div className="hidden sm:flex items-center gap-4">
                  <div className="flex-1 max-w-md">
                    <SearchBar
                      onLocationSelect={handleLocationSelect}
                      onCurrentLocation={handleCurrentLocation}
                      favorites={favorites}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  </div>

                  <div className="flex items-center space-x-1">
                    <UnitToggle unit={unit} onUnitChange={setUnit} />
                    <ThemeToggle />
                  </div>
                </div>

                {/* Mobile Header */}
                <div className="sm:hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="flex items-center space-x-2"
                  >
                    <Menu className="w-4 h-4" />
                    <span className="text-sm">Menu</span>
                  </Button>
                </div>
              </div>

              {/* Mobile Dropdown Menu */}
              {isMobileMenuOpen && (
                <div className="sm:hidden mt-3 py-3 border-t border-border/50 bg-background/95 backdrop-blur-md rounded-lg">
                  <div className="space-y-3">
                    {/* Search Bar for Mobile */}
                    <div className="px-3">
                      <SearchBar
                        onLocationSelect={handleLocationSelect}
                        onCurrentLocation={handleCurrentLocation}
                        favorites={favorites}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between px-3">
                      <div className="flex items-center space-x-2">
                        <UnitToggle unit={unit} onUnitChange={setUnit} />
                        <ThemeToggle />
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* Navigation */}
          <nav className="sticky top-[73px] z-40 glass-effect-subtle border-b border-border/30">
            <div className="max-w-7xl mx-auto px-3">
              <div className="flex space-x-1 py-1.5">
                {[
                  { id: 'weather', label: 'Current', icon: MapPin },
                  { id: 'forecast', label: '7-Day', icon: BarChart3 },
                  { id: 'hourly', label: 'Hourly', icon: Clock },
                  { id: 'suggestions', label: 'AI Tips', icon: Brain },
                  { id: 'air-quality', label: 'Air Quality', icon: Wind },
                  { id: 'compare', label: 'Compare', icon: BarChart3 },
                  { id: 'favorites', label: 'Favorites', icon: Star },
                ].map(({ id, label, icon: Icon }) => (
                  <Button
                    key={id}
                    variant={activeView === id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveView(id as any)}
                    className="flex items-center space-x-1.5 hover-lift animate-scale-in px-3 py-1.5 text-sm"
                    data-testid={`nav-${id}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden xs:inline">{label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="space-y-8">
              {/* Current Weather View */}
              {activeView === 'weather' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    {weatherLoading ? (
                      <Card className="p-6 gradient-bg border border-border/30 shadow-xl">
                        <div className="flex items-center justify-center h-48">
                          <Loader2 className="w-8 h-8 animate-spin" />
                        </div>
                      </Card>
                    ) : weatherError ? (
                      <Card className="p-6 gradient-bg border border-border/30 shadow-xl">
                        <div className="text-center">
                          <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Weather Data Unavailable</h3>
                          <p className="text-muted-foreground mb-4">
                            {weatherError instanceof Error ? weatherError.message : 'Failed to load weather data'}
                          </p>
                          <Button onClick={refetchAll}>
                            Try Again
                          </Button>
                        </div>
                      </Card>
                    ) : currentWeather ? (
                      <WeatherCard
                        location={currentWeather.location}
                        temperature={currentWeather.temperature}
                        condition={currentWeather.condition}
                        description={currentWeather.description}
                        feelsLike={currentWeather.feelsLike}
                        humidity={currentWeather.humidity}
                        windSpeed={currentWeather.windSpeed}
                        precipitation={currentWeather.precipitation}
                        uvIndex={currentWeather.uvIndex}
                        visibility={currentWeather.visibility}
                        pressure={currentWeather.pressure}
                        unit={unit}
                        airQualityIndex={currentWeather.airQualityIndex || 50}
                      />
                    ) : null}

                    {/* Sunrise/Sunset */}
                    <Card className="p-6 card-hover gradient-bg border border-border/30 shadow-xl">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Sun & Moon</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-center space-x-3">
                          <Sun className="w-6 h-6 text-weather-sunny" />
                          <div>
                            <div className="text-sm text-muted-foreground">Sunrise</div>
                            <div className="text-lg font-medium" data-testid="text-sunrise">{sunrise}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Moon className="w-6 h-6 text-muted-foreground" />
                          <div>
                            <div className="text-sm text-muted-foreground">Sunset</div>
                            <div className="text-lg font-medium" data-testid="text-sunset">{sunset}</div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className="space-y-6">
                    <FavoriteLocations
                      favorites={favorites}
                      weatherData={favoriteWeatherData}
                      onLocationSelect={handleLocationSelect}
                      onRemoveFavorite={removeFavorite}
                      unit={unit}
                    />
                  </div>
                </div>
              )}

              {/* AI Suggestions View */}
              {activeView === 'suggestions' && (
                <div className="max-w-4xl mx-auto">
                  <Card className="p-6 gradient-bg border border-border/30 shadow-xl">
                    {currentWeather ? (
                      <WeatherSuggestions
                        temperature={currentWeather.temperature}
                        condition={currentWeather.condition}
                        humidity={currentWeather.humidity}
                        windSpeed={currentWeather.windSpeed}
                        uvIndex={currentWeather.uvIndex}
                        precipitation={currentWeather.precipitation}
                        airQualityIndex={currentWeather.airQualityIndex || 50}
                      />
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">No weather data available for suggestions</p>
                      </div>
                    )}
                  </Card>
                </div>
              )}

              {/* Air Quality Details View */}
              {activeView === 'air-quality' && (
                <div className="max-w-4xl mx-auto">
                  <Card className="p-6 gradient-bg border border-border/30 shadow-xl">
                    {currentWeather ? (
                      <AirQualityDetails
                        pm25={25}
                        pm10={45}
                        ozone={32}
                        no2={15}
                      />
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">No weather data available for air quality details</p>
                      </div>
                    )}
                  </Card>
                </div>
              )}

              {/* 7-Day Forecast View */}
              {activeView === 'forecast' && (
                <>
                  {weatherLoading ? (
                    <Card className="p-6 gradient-bg border border-border/30 shadow-xl">
                      <div className="flex items-center justify-center h-48">
                        <Loader2 className="w-8 h-8 animate-spin" />
                      </div>
                    </Card>
                  ) : weeklyForecast ? (
                    <ForecastCard forecasts={weeklyForecast} unit={unit} />
                  ) : (
                    <Card className="p-6 gradient-bg border border-border/30 shadow-xl text-center">
                      <p className="text-muted-foreground">No forecast data available</p>
                    </Card>
                  )}
                </>
              )}

              {/* Hourly Forecast View */}
              {activeView === 'hourly' && (
                <>
                  {weatherLoading ? (
                    <Card className="p-6 gradient-bg border border-border/30 shadow-xl">
                      <div className="flex items-center justify-center h-48">
                        <Loader2 className="w-8 h-8 animate-spin" />
                      </div>
                    </Card>
                  ) : hourlyForecast ? (
                    <HourlyForecast
                      hourlyData={hourlyForecast}
                      selectedDay={selectedDay}
                      availableDays={dayNames}
                      onDayChange={setSelectedDay}
                      unit={unit}
                    />
                  ) : (
                    <Card className="p-6 gradient-bg border border-border/30 shadow-xl text-center">
                      <p className="text-muted-foreground">No hourly data available</p>
                    </Card>
                  )}
                </>
              )}

              {/* Compare Locations View */}
              {activeView === 'compare' && (
                <CompareLocations
                  locations={compareLocations}
                  weatherData={compareWeatherData}
                  onAddLocation={handleAddToCompare}
                  onRemoveLocation={handleRemoveFromCompare}
                  unit={unit}
                  isLoading={compareLoading}
                  favorites={favorites}
                  onAddFavoriteToCompare={(favorite) => {
                    if (!compareLocations.find(loc => loc.id === favorite.id)) {
                      setCompareLocations(prev => [...prev, favorite]);
                      toast({
                        title: "Location added",
                        description: `${favorite.name} has been added to comparison`,
                      });
                    } else {
                      toast({
                        title: "Already added",
                        description: `${favorite.name} is already in comparison`,
                      });
                    }
                  }}
                  onAddAnyLocationToCompare={(location) => {
                    if (!compareLocations.find(loc => loc.id === location.id)) {
                      setCompareLocations(prev => [...prev, location]);
                      toast({
                        title: "Location added",
                        description: `${location.name} has been added to comparison`,
                      });
                    } else {
                      toast({
                        title: "Already added",
                        description: `${location.name} is already in comparison`,
                      });
                    }
                  }}
                />
              )}

              {/* Favorites View */}
              {activeView === 'favorites' && (
                <div className="max-w-2xl mx-auto">
                  <FavoriteLocations
                    favorites={favorites}
                    weatherData={favoriteWeatherData}
                    onLocationSelect={handleLocationSelect}
                    onRemoveFavorite={removeFavorite}
                    unit={unit}
                  />
                </div>
              )}
            </div>
          </main>

          {/* Footer */}
          <footer className="mt-4 glass-effect-subtle border-t border-border/30">
            <div className="max-w-7xl mx-auto px-3 py-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-gradient">🌤️ AeroForecast</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Your premium weather companion with accurate forecasts, beautiful animations, and real-time data.
                  </p>
                  <div className="flex space-x-1">
                    <Badge variant="outline" className="animate-pulse-soft text-xs px-1.5 py-0.5">
                      Open-Meteo API
                    </Badge>
                    <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                      Free & Open Source
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-foreground text-xs">Data Source</h4>
                  <p className="text-xs text-muted-foreground">
                    Weather data provided by{' '}
                    <a
                      href="https://open-meteo.com"
                      className="text-primary hover:underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open-Meteo
                    </a>
                    {' '}— a free and reliable weather API.
                  </p>
                  <div className="flex space-x-1">
                    <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                      No API Keys Required
                    </Badge>
                    <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                      Always Free
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-border/30 text-center text-xs text-muted-foreground">
                &copy; 2024 AeroForecast. Built with &hearts; using React, TypeScript, and Tailwind CSS.
              </div>
            </div>
          </footer>
        </div>
      </WeatherBackground>
    </CustomCursor>
  );
}