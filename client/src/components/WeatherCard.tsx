import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Sun, CloudRain, CloudSnow, Zap, Thermometer, Droplets, Wind, Eye, Gauge } from "lucide-react";
import AnimatedWeatherIcon from './AnimatedWeatherIcon';

interface WeatherCardProps {
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
  unit: 'metric' | 'imperial';
  className?: string;
  showAqiNumber?: boolean; // New prop to control AQI number display
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

const getUVColor = (uvIndex: number) => {
  if (uvIndex <= 2) return 'bg-green-500';
  if (uvIndex <= 5) return 'bg-yellow-500';
  if (uvIndex <= 7) return 'bg-orange-500';
  if (uvIndex <= 10) return 'bg-red-500';
  return 'bg-purple-500';
};

export default function WeatherCard({
  location,
  temperature,
  condition,
  description,
  feelsLike,
  humidity,
  windSpeed,
  precipitation,
  uvIndex,
  visibility,
  pressure,
  airQualityIndex,
  unit,
  className = "",
  showAqiNumber = true // Default to true for main weather view
}: WeatherCardProps) {
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const windUnit = unit === 'metric' ? 'km/h' : 'mph';
  const pressureUnit = unit === 'metric' ? 'hPa' : 'inHg';
  const visibilityUnit = unit === 'metric' ? 'km' : 'mi';

  // Air Quality Index interpretation
  const getAQILabel = (aqi: number) => {
    if (aqi <= 50) return { label: 'Good', color: 'bg-green-500', textColor: 'text-white' };
    if (aqi <= 100) return { label: 'Moderate', color: 'bg-yellow-500', textColor: 'text-white' };
    if (aqi <= 150) return { label: 'Unhealthy', color: 'bg-orange-500', textColor: 'text-white' };
    if (aqi <= 200) return { label: 'Very Unhealthy', color: 'bg-red-500', textColor: 'text-white' };
    return { label: 'Hazardous', color: 'bg-purple-500', textColor: 'text-white' };
  };

  const aqiInfo = getAQILabel(airQualityIndex);

  return (
    <Card className={`p-4 card-premium animate-fade-in glass-effect-enhanced hover-lift ${className}`} data-testid="card-weather-main">
      <div className="space-y-4">
        {/* Header with enhanced styling */}
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <h2 className="text-xl font-bold text-foreground text-gradient leading-tight" data-testid="text-location">
              {location}
            </h2>
            <p className="text-sm text-muted-foreground capitalize font-medium" data-testid="text-condition">
              {description}
            </p>
          </div>
          <div className="relative flex-shrink-0 ml-3">
            <AnimatedWeatherIcon
              condition={condition}
              className={`w-12 h-12 ${getWeatherColor(condition)}`}
              data-testid="icon-weather-main"
            />
            <div className="absolute -inset-2 bg-current opacity-10 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Main Temperature with enhanced styling */}
        <div className="flex items-baseline space-x-3">
          <span className="text-7xl font-light text-foreground" data-testid="text-temperature">
            {Math.round(temperature)}
          </span>
          <div className="space-y-0.5">
            <span className="text-2xl text-muted-foreground font-light">{tempUnit}</span>
            <div className="text-xs text-muted-foreground">
              Feels like {Math.round(feelsLike)}{tempUnit}
            </div>
          </div>
        </div>

        {/* Weather Metrics Grid with enhanced styling */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 weather-metrics-grid min-w-0">
          <div className="group relative flex items-center space-x-2 p-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            <Droplets className="w-4 h-4 text-blue-500 relative z-10" />
            <div className="relative z-10">
              <div className="text-xs text-muted-foreground">Humidity</div>
              <div className="text-sm font-semibold" data-testid="metric-humidity">{humidity}%</div>
            </div>
          </div>

          <div className="group relative flex items-center space-x-2 p-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            <Wind className="w-4 h-4 text-green-500 relative z-10" />
            <div className="relative z-10">
              <div className="text-xs text-muted-foreground">Wind</div>
              <div className="text-sm font-semibold" data-testid="metric-wind">{windSpeed} {windUnit}</div>
            </div>
          </div>

          <div className="group relative flex items-center space-x-2 p-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/20 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            <CloudRain className="w-4 h-4 text-blue-400 relative z-10" />
            <div className="relative z-10">
              <div className="text-xs text-muted-foreground">Rain</div>
              <div className="text-sm font-semibold" data-testid="metric-precipitation">{precipitation}mm</div>
            </div>
          </div>

          <div className="group relative flex items-center space-x-2 p-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            <Sun className="w-4 h-4 text-yellow-500 relative z-10" />
            <div className="relative z-10">
              <div className="text-xs text-muted-foreground">UV Index</div>
              <Badge className={`${getUVColor(uvIndex)} text-white text-xs px-1.5 py-0.5`} data-testid="metric-uv">
                {uvIndex}
              </Badge>
            </div>
          </div>

          <div className="group relative flex items-center space-x-2 p-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            <Eye className="w-4 h-4 text-purple-500 relative z-10" />
            <div className="relative z-10">
              <div className="text-xs text-muted-foreground">Visibility</div>
              <div className="text-sm font-semibold" data-testid="metric-visibility">{visibility}{visibilityUnit}</div>
            </div>
          </div>

          <div className="group relative flex items-center space-x-2 p-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/20 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            <Gauge className="w-4 h-4 text-gray-500 relative z-10" />
            <div className="relative z-10">
              <div className="text-xs text-muted-foreground">Pressure</div>
              <div className="text-sm font-semibold" data-testid="text-pressure">{pressure}{pressureUnit}</div>
            </div>
          </div>

          <div className="group relative flex items-center space-x-2 p-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            <Thermometer className="w-4 h-4 text-red-500 relative z-10 flex-shrink-0" />
            <div className="relative z-10 min-w-0">
              <div className="text-xs text-muted-foreground">Air Quality</div>
              <div className="flex items-center space-x-1 flex-wrap">
                <Badge className={`${aqiInfo.color} text-xs px-1.5 py-0.5 ${aqiInfo.textColor}`} data-testid="metric-aqi">
                  {aqiInfo.label}
                </Badge>
                {showAqiNumber && (
                  <span className="text-sm font-semibold" data-testid="metric-aqi-number">{airQualityIndex}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced bottom section */}
        <div className="pt-3 border-t border-border/30">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Last updated</span>
            <span className="text-foreground font-medium">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}