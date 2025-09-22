import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Star, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocationSearch } from "@/hooks/useWeatherData";
import type { Location } from "@/lib/weatherApi";

interface SearchBarProps {
  onLocationSelect: (location: Location) => void;
  onCurrentLocation: () => void;
  favorites: Location[];
  onToggleFavorite: (location: Location) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  onLocationSelect,
  onCurrentLocation,
  favorites,
  onToggleFavorite,
  placeholder = "Search for a city...",
  className = ""
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { suggestions, isSearching, search } = useLocationSearch();

  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true);
      search(query).finally(() => setIsLoading(false));
    }
  }, [query, search]);

  const handleLocationSelect = (location: Location) => {
    console.log('Location selected:', location);
    onLocationSelect(location);
    setQuery(location.name);
    setIsOpen(false);
  };

  const handleCurrentLocation = () => {
    console.log('Current location requested');
    onCurrentLocation();
    setQuery("Current Location");
    setIsOpen(false);
  };

  const handleToggleFavorite = (location: Location, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Toggle favorite:', location);
    onToggleFavorite(location);
  };

  const isFavorite = (location: Location) => {
    return favorites.some(fav => fav.id === location.id);
  };

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className={`relative w-full max-w-lg ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground animate-pulse-soft" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-24 glass-effect-enhanced hover-lift border-0 bg-background/50 backdrop-blur-sm"
          data-testid="input-search-location"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {query && (
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6 hover:bg-destructive/20 hover:text-destructive"
              onClick={clearSearch}
              data-testid="button-clear-search"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 hover:bg-primary/20 hover:text-primary"
            onClick={handleCurrentLocation}
            data-testid="button-current-location"
          >
            <MapPin className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (query.length > 0 || favorites.length > 0) && (
        <Card className="absolute top-full mt-2 w-full z-50 p-2 animate-slide-up glass-effect-enhanced border-border/30 shadow-2xl" data-testid="dropdown-suggestions">
          {/* Current Location Option */}
          {query.length <= 2 && (
            <div
              className="flex items-center space-x-3 p-3 hover:bg-primary/10 cursor-pointer rounded-md transition-colors hover-lift"
              onClick={handleCurrentLocation}
              data-testid="option-current-location"
            >
              <MapPin className="w-4 h-4 text-primary animate-pulse-soft" />
              <span className="text-sm font-medium">Use current location</span>
            </div>
          )}

          {/* Favorites */}
          {query.length <= 2 && favorites.length > 0 && (
            <>
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                ⭐ Favorites
              </div>
              {favorites.map((location) => (
                <div
                  key={location.id}
                  className="flex items-center justify-between p-3 hover:bg-accent/50 cursor-pointer rounded-md transition-colors hover-lift"
                  onClick={() => handleLocationSelect(location)}
                  data-testid={`option-favorite-${location.id}`}
                >
                  <div className="flex items-center space-x-3">
                    <Star className="w-4 h-4 text-yellow-500 fill-current animate-pulse-soft" />
                    <div>
                      <div className="text-sm font-medium">{location.name}</div>
                      <div className="text-xs text-muted-foreground">{location.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Search Results */}
          {query.length > 2 && (
            <>
              {isLoading || isSearching ? (
                <div className="p-3 text-sm text-muted-foreground flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </div>
              ) : suggestions.length > 0 ? (
                suggestions.map((location) => (
                  <div
                    key={location.id}
                    className="flex items-center justify-between p-3 hover:bg-accent/50 cursor-pointer rounded-md transition-colors hover-lift"
                    onClick={() => handleLocationSelect(location)}
                    data-testid={`option-suggestion-${location.id}`}
                  >
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">{location.name}</div>
                        <div className="text-xs text-muted-foreground">{location.country}</div>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 hover:bg-yellow-500/20 hover:text-yellow-500"
                      onClick={(e) => handleToggleFavorite(location, e)}
                      data-testid={`button-toggle-favorite-${location.id}`}
                    >
                      <Star className={`w-3 h-3 ${isFavorite(location) ? 'text-yellow-500 fill-current animate-pulse-soft' : 'text-muted-foreground'}`} />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="p-3 text-sm text-muted-foreground flex items-center space-x-2">
                  <Search className="w-4 h-4" />
                  <span>No locations found</span>
                </div>
              )}
            </>
          )}
        </Card>
      )}
    </div>
  );
}