import React from 'react';
import { Cloud, CloudRain, Sun, CloudSnow, Zap, Wind, CloudDrizzle } from 'lucide-react';

interface AnimatedWeatherIconProps {
  condition: string;
  className?: string;
}

export default function AnimatedWeatherIcon({ condition, className = "" }: AnimatedWeatherIconProps) {
  const getAnimationClass = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'rain':
      case 'light rain':
      case 'moderate rain':
      case 'heavy rain':
        return 'animate-rain';
      case 'snow':
      case 'light snow':
      case 'heavy snow':
        return 'animate-snow';
      case 'clear':
      case 'sunny':
        return 'animate-sun';
      case 'clouds':
      case 'overcast':
      case 'partly cloudy':
      case 'cloudy': // Add cloudy
        return 'animate-clouds';
      case 'thunderstorm':
        return 'animate-thunder';
      case 'wind':
      case 'windy':
        return 'animate-wind';
      case 'mist':
      case 'fog':
      case 'haze':
        return 'animate-mist';
      default:
        return 'animate-pulse-soft';
    }
  };

  const getWeatherIcon = (condition: string) => {
    const animationClass = getAnimationClass(condition);

    switch (condition.toLowerCase()) {
      case 'rain':
      case 'light rain':
      case 'moderate rain':
      case 'heavy rain':
        return <CloudRain className={`w-full h-full ${animationClass}`} />;
      case 'snow':
      case 'light snow':
      case 'heavy snow':
        return <CloudSnow className={`w-full h-full ${animationClass}`} />;
      case 'clear':
      case 'sunny':
        return <Sun className={`w-full h-full ${animationClass}`} />;
      case 'thunderstorm':
        return <Zap className={`w-full h-full ${animationClass}`} />;
      case 'wind':
      case 'windy':
        return <Wind className={`w-full h-full ${animationClass}`} />;
      case 'mist':
      case 'fog':
      case 'haze':
        return <CloudDrizzle className={`w-full h-full ${animationClass}`} />;
      default:
        // Default to Cloud icon for cloudy conditions
        return <Cloud className={`w-full h-full ${animationClass}`} />;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full animate-pulse-soft"></div>
      <div className="relative z-10">
        {getWeatherIcon(condition)}
      </div>

      {/* Animated particles based on weather */}
      {condition.toLowerCase().includes('rain') && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-3 bg-blue-300/60 rounded-full animate-rain-drop"
              style={{
                left: `${10 + i * 15}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${1.5 + Math.random() * 0.5}s`
              }}
            />
          ))}
        </div>
      )}

      {condition.toLowerCase().includes('snow') && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/80 rounded-full animate-snow-flake"
              style={{
                left: `${5 + i * 12}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + Math.random() * 1}s`
              }}
            />
          ))}
        </div>
      )}

      {condition.toLowerCase().includes('sunny') && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-yellow-400/30 rounded-full animate-sun-rays"></div>
        </div>
      )}
    </div>
  );
}
