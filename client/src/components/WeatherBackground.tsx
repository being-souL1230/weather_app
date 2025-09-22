import { useEffect, useState } from "react";

interface WeatherBackgroundProps {
  condition: string;
  className?: string;
  children: React.ReactNode;
}

const getWeatherBackground = (condition: string, theme: string = 'light') => {
  const key = condition.toLowerCase();

  // Handle different themes
  switch (theme) {
    case 'dim':
      // Dim blue theme
      if (key.includes('sun') || key.includes('clear')) {
        return 'weather-dim-blue-clear';
      }
      if (key.includes('rain') || key.includes('storm')) {
        return 'weather-dim-blue-rainy';
      }
      if (key.includes('cloud')) {
        return 'weather-dim-blue-cloudy';
      }
      if (key.includes('snow')) {
        return 'weather-dim-blue-snow';
      }
      return 'weather-dim-blue';

    case 'enhanced':
      // Enhanced theme with effects
      if (key.includes('sun') || key.includes('clear')) {
        return 'weather-gradient-animated';
      }
      if (key.includes('rain') || key.includes('storm')) {
        return 'weather-dim-blue-rainy weather-rain-effect';
      }
      if (key.includes('cloud')) {
        return 'weather-dim-blue-cloudy weather-cloud-effect';
      }
      if (key.includes('snow')) {
        return 'weather-dim-blue-snow weather-snow-effect';
      }
      return 'weather-gradient-multi';

    case 'dark':
      // Standard dark theme
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
      return 'weather-cloudy';

    default: // light
      // Light theme - only default backgrounds
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
      return 'weather-cloudy';
  }
};

const getAnimatedElements = (condition: string, theme: string = 'light') => {
  const key = condition.toLowerCase();

  // Enhanced effects for enhanced theme
  if (theme === 'enhanced') {
    if (key.includes('rain') || key.includes('storm')) {
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden weather-rain-effect">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-10 bg-gradient-to-b from-blue-400/60 to-blue-600/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 0.5}s`,
                transform: `rotate(${Math.random() * 10 - 5}deg)`
              }}
            />
          ))}
        </div>
      );
    }

    if (key.includes('snow')) {
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden weather-snow-effect">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute text-blue-200/80"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
                opacity: Math.random() * 0.6 + 0.4,
                fontSize: `${Math.random() * 8 + 8}px`
              }}
            >
              ❄
            </div>
          ))}
        </div>
      );
    }

    if (key.includes('sun') || key.includes('clear')) {
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-20 h-0.5 bg-yellow-300/50 origin-left"
                style={{
                  transform: `rotate(${i * 22.5}deg)`,
                  animationDelay: `${i * 0.1}s`,
                  animation: `sun-rays ${3 + Math.random() * 2}s ease-in-out infinite`
                }}
              />
            ))}
          </div>
        </div>
      );
    }
  }

  // Dim blue theme effects (subtle)
  if (theme === 'dim') {
    if (key.includes('rain') || key.includes('storm')) {
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-6 bg-blue-300/50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 1}s`,
                transform: `rotate(${Math.random() * 15 - 7.5}deg)`
              }}
            />
          ))}
        </div>
      );
    }

    if (key.includes('snow')) {
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-100/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 3}s`,
                opacity: Math.random() * 0.5 + 0.3
              }}
            />
          ))}
        </div>
      );
    }
  }

  // Default theme effects (existing code)
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
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    setMounted(true);

    // Get current theme from document
    const updateTheme = () => {
      const root = document.documentElement;
      const savedTheme = localStorage.getItem('theme') || 'light';
      setCurrentTheme(savedTheme);
    };

    updateTheme();

    // Watch for theme changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
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
      <div className={`absolute inset-0 ${getWeatherBackground(condition, currentTheme)}`} />

      {/* Enhanced overlay gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/60" />

      {/* Weather-specific animated elements */}
      {getAnimatedElements(condition, currentTheme)}

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