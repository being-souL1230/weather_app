import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud, Sun, CloudRain, CloudSnow, Zap, ChevronLeft, ChevronRight } from "lucide-react";

interface HourlyData {
  time: string;
  temperature: number;
  condition: string;
  precipitation: number;
  windSpeed: number;
}

interface HourlyForecastProps {
  hourlyData: HourlyData[];
  selectedDay: string;
  availableDays: string[];
  onDayChange: (day: string) => void;
  unit: 'metric' | 'imperial';
  className?: string;
}

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  snow: CloudSnow,
  storm: Zap,
  clear: Sun,
  'partly cloudy': Cloud,
  'light rain': CloudRain,
  'heavy rain': CloudRain,
  thunderstorm: Zap,
};

const getWeatherIcon = (condition: string) => {
  const key = condition.toLowerCase() as keyof typeof weatherIcons;
  return weatherIcons[key] || Cloud;
};

const getWeatherColor = (condition: string) => {
  const key = condition.toLowerCase();
  if (key.includes('sun') || key.includes('clear')) return 'text-weather-sunny';
  if (key.includes('rain')) return 'text-weather-rainy';
  if (key.includes('cloud')) return 'text-weather-cloudy';
  if (key.includes('snow')) return 'text-weather-snow';
  if (key.includes('storm') || key.includes('thunder')) return 'text-weather-storm';
  return 'text-muted-foreground';
};

export default function HourlyForecast({
  hourlyData,
  selectedDay,
  availableDays,
  onDayChange,
  unit,
  className = ""
}: HourlyForecastProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const getTotalPages = () => {
    const filteredData = filterDataByDay(hourlyData, selectedDay);
    return Math.ceil(filteredData.length / itemsPerPage);
  };
  
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const windUnit = unit === 'metric' ? 'km/h' : 'mph';

  const handleDayChange = (day: string) => {
    console.log('Day changed to:', day);
    onDayChange(day);
    setCurrentPage(0); // Reset to first page when day changes
  };

  const filterDataByDay = (data: HourlyData[], day: string) => {
    if (day === 'Today') {
      const now = new Date();
      const currentHour = now.getHours();

      // For today, show hours from current hour onwards
      return data.slice(currentHour, currentHour + 24);
    } else {
      // For future days, calculate which 24-hour block to show
      const dayIndex = availableDays.indexOf(day);
      if (dayIndex === -1) return [];

      // Skip today (0) and get the right day
      const hoursFromNow = (dayIndex) * 24;
      const startHour = hoursFromNow;
      const endHour = startHour + 24;

      return data.slice(startHour, endHour);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    const totalPages = getTotalPages();
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  const getCurrentPageData = () => {
    const filteredData = filterDataByDay(hourlyData, selectedDay);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  return (
    <Card className={`p-6 transition-all duration-300 gradient-bg border border-border/30 shadow-xl ${className}`} data-testid="card-hourly-forecast">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">Hourly Forecast</h3>
          
          {/* Day Selector */}
          <div className="flex space-x-1">
            {availableDays.map((day, index) => (
              <Button
                key={day}
                size="sm"
                variant={selectedDay === day ? "default" : "outline"}
                onClick={() => handleDayChange(day)}
                className="text-xs"
                data-testid={`button-day-${index}`}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>

        {/* Hourly Data with Pagination */}
        <div className="space-y-4">
          {/* Pagination Controls */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="flex items-center space-x-1"
              data-testid="button-prev-page"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>
            
            <div className="text-sm text-muted-foreground">
              Page {currentPage + 1} of {getTotalPages()}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === getTotalPages() - 1}
              className="flex items-center space-x-1"
              data-testid="button-next-page"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Current Page Data */}
          <div className="grid grid-cols-5 gap-4">
            {getCurrentPageData().map((hour: HourlyData, index: number) => {
              const actualIndex = currentPage * itemsPerPage + index;
              const WeatherIcon = getWeatherIcon(hour.condition);
              
              return (
                <div
                  key={hour.time}
                  className="flex flex-col items-center space-y-2 p-3 rounded-md bg-muted/20 transition-colors"
                  data-testid={`hourly-item-${actualIndex}`}
                >
                  <div className="text-xs text-muted-foreground font-medium">
                    {hour.time}
                  </div>
                  
                  <WeatherIcon className={`w-6 h-6 ${getWeatherColor(hour.condition)}`} />
                  
                  <div className="text-sm font-medium text-foreground" data-testid={`hourly-temp-${actualIndex}`}>
                    {Math.round(hour.temperature)}{tempUnit}
                  </div>
                  
                  {hour.precipitation > 0 && (
                    <div className="text-xs text-blue-500">
                      {hour.precipitation}%
                    </div>
                  )}
                  
                  <div className="text-xs text-muted-foreground">
                    {hour.windSpeed} {windUnit}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Temperature Trend Chart for Current Page */}
        <div className="pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground mb-2">Temperature trend (current page)</div>
          <div className="h-16 flex items-end space-x-1">
            {getCurrentPageData().map((hour: HourlyData, index: number) => {
              const pageData = getCurrentPageData();
              const maxTemp = Math.max(...pageData.map((h: HourlyData) => h.temperature));
              const minTemp = Math.min(...pageData.map((h: HourlyData) => h.temperature));
              const normalizedHeight = ((hour.temperature - minTemp) / (maxTemp - minTemp)) * 100;
              
              return (
                <div
                  key={index}
                  className="flex-1 bg-primary/20 rounded-t-sm min-h-[4px] transition-colors"
                  style={{ height: `${Math.max(4, normalizedHeight)}%` }}
                  data-testid={`temp-bar-${currentPage * itemsPerPage + index}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}