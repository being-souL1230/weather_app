import { useEffect, useState } from "react";

interface WeatherBackgroundProps {
  condition: string;
  className?: string;
  children: React.ReactNode;
}

const getWeatherBackground = (condition: string) => {
  const key = condition.toLowerCase();
  if (key.includes('sun') || key.includes('clear')) {
    return 'weather-sunny';
  }
  if (key.includes('rain') || key.includes('storm')) {
    return 'weather-rainy';
  }
  if (key.includes('cloud')) {
    return 'weather-cloudy';
  }
  if (key.includes('snow')) {
    return 'weather-snow';
  }
  return 'weather-cloudy'; // default
};

const getAnimatedElements = (condition: string) => {
  const key = condition.toLowerCase();

  if (key.includes('rain') || key.includes('storm')) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-8 bg-blue-400/40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1.5 + Math.random() * 0.5}s`,
              transform: `rotate(${Math.random() * 10 - 5}deg)`
            }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={`splash-${i}`}
            className="absolute w-1 h-1 bg-blue-300/60 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random()}s`
            }}
          />
        ))}
      </div>
    );
  }

  if (key.includes('snow')) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/70 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              opacity: Math.random() * 0.7 + 0.3
            }}
          />
        ))}
      </div>
    );
  }

  if (key.includes('sun') || key.includes('clear')) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Sun rays */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-yellow-400/30 origin-left animate-pulse"
              style={{
                transform: `rotate(${i * 30}deg)`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    );
  }

  // Default cloudy effect
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute w-16 h-8 bg-gray-400/20 rounded-full animate-pulse-soft"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random()}s`
          }}
        />
      ))}
    </div>
  );
};

export default function WeatherBackground({ condition, className = "", children }: WeatherBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`min-h-screen bg-background ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative overflow-hidden ${className}`}>
      {/* Base gradient background */}
      <div className={`absolute inset-0 ${getWeatherBackground(condition)}`} />

      {/* Enhanced overlay gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/60" />

      {/* Weather-specific animated elements */}
      {getAnimatedElements(condition)}

      {/* Floating animated blocks - always visible */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={`block-${i}`}
            className="absolute w-20 h-20 bg-gradient-to-br from-blue-400/10 via-purple-500/8 to-pink-500/10 rounded-lg animate-float backdrop-blur-sm border border-white/5"
            style={{
              left: `${Math.random() * 120 - 10}%`,
              top: `${Math.random() * 120 - 10}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
              opacity: Math.random() * 0.3 + 0.1
            }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={`block-small-${i}`}
            className="absolute w-12 h-12 bg-gradient-to-br from-cyan-400/12 via-blue-500/10 to-indigo-500/8 rounded-xl animate-float backdrop-blur-sm border border-white/5"
            style={{
              left: `${Math.random() * 120 - 10}%`,
              top: `${Math.random() * 120 - 10}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 3}s`,
              opacity: Math.random() * 0.2 + 0.05
            }}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <div
            key={`block-large-${i}`}
            className="absolute w-32 h-32 bg-gradient-to-br from-violet-400/8 via-blue-500/6 to-purple-500/4 rounded-3xl animate-float backdrop-blur-sm border border-white/3"
            style={{
              left: `${Math.random() * 120 - 10}%`,
              top: `${Math.random() * 120 - 10}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 5}s`,
              opacity: Math.random() * 0.15 + 0.03
            }}
          />
        ))}
      </div>

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}