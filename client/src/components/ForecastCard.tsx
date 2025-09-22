import { Card } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, CloudSnow, Zap } from "lucide-react";

interface DayForecast {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: string;
  precipitation: number;
  humidity: number;
}

interface ForecastCardProps {
  forecasts: DayForecast[];
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

export default function ForecastCard({ forecasts, unit, className = "" }: ForecastCardProps) {
  const tempUnit = unit === 'metric' ? '°C' : '°F';

  return (
    <Card className={`p-4 card-hover gradient-bg border-0 shadow-2xl w-full max-w-4xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md ${className}`} data-testid="card-forecast">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">7-Day Forecast</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-3 sm:gap-4">
          {forecasts.map((forecast, index) => {
            const WeatherIcon = getWeatherIcon(forecast.condition);
            const isToday = index === 0;

            return (
              <div
                key={forecast.date}
                className={`relative p-3 rounded-2xl transition-all duration-700 ease-out hover:shadow-2xl hover:scale-[1.03] backdrop-blur-md overflow-hidden group ${
                  isToday
                    ? 'bg-gradient-to-br from-blue-500/25 via-blue-600/15 to-blue-700/10 shadow-xl'
                    : 'bg-gradient-to-br from-white/15 via-white/8 to-white/5'
                }`}
                data-testid={`forecast-day-${index}`}
              >
                {/* Shiny glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-2xl"></div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out -translate-x-full group-hover:translate-x-full rounded-2xl"></div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-blue-400/5 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-2xl blur-sm"></div>

                <div className="relative z-10">
                  {/* Day and Weather Info */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`font-semibold text-sm ${isToday ? 'text-blue-400' : 'text-foreground'}`}>
                        {isToday ? 'Today' : forecast.day}
                      </div>
                      <WeatherIcon className={`w-4 h-4 ${getWeatherColor(forecast.condition)}`} />
                    </div>
                    <div className={`text-sm font-medium ${isToday ? 'text-blue-400' : 'text-muted-foreground'}`}>
                      {forecast.precipitation}%
                    </div>
                  </div>

                  {/* Temperature and Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`text-sm font-semibold ${isToday ? 'text-blue-400' : 'text-foreground'}`}>
                        {Math.round(forecast.high)}{tempUnit}
                      </div>
                      <div className={`text-sm ${isToday ? 'text-blue-300' : 'text-muted-foreground'}`}>
                        {Math.round(forecast.low)}{tempUnit}
                      </div>
                    </div>

                    {/* Glass Precipitation Bar */}
                    <div className="flex items-center space-x-2">
                      <div className="relative w-14 h-2 bg-gradient-to-r from-white/20 to-white/10 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
                        <div
                          className="h-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 rounded-full transition-all duration-500 shadow-lg relative"
                          style={{
                            width: `${Math.min(100, forecast.precipitation)}%`
                          }}
                        >
                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse opacity-50"></div>
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-sm"></div>
                      </div>
                    </div>
                  </div>

                  {/* Condition Text */}
                  <div className="mt-1 text-xs text-muted-foreground capitalize">
                    {forecast.condition}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}