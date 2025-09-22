import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Cloud, CloudRain, Zap } from "lucide-react";

type Theme = 'light' | 'dark' | 'dim' | 'enhanced';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Get initial theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('light');
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    // Remove all theme classes
    root.classList.remove('dark');

    // Apply new theme
    switch (newTheme) {
      case 'dark':
        root.classList.add('dark');
        root.classList.remove('weather-theme-default', 'weather-theme-dim-blue', 'weather-theme-enhanced');
        root.classList.add('weather-theme-default');
        break;
      case 'dim':
        root.classList.add('dark');
        root.classList.remove('weather-theme-default', 'weather-theme-dim-blue', 'weather-theme-enhanced');
        root.classList.add('weather-theme-dim-blue');
        break;
      case 'enhanced':
        root.classList.add('dark');
        root.classList.remove('weather-theme-default', 'weather-theme-dim-blue', 'weather-theme-enhanced');
        root.classList.add('weather-theme-enhanced');
        break;
      default: // light
        root.classList.remove('dark');
        root.classList.remove('weather-theme-default', 'weather-theme-dim-blue', 'weather-theme-enhanced');
        root.classList.add('weather-theme-default');
    }
  };

  const handleThemeChange = () => {
    const themeOrder: Theme[] = ['light', 'dark', 'dim', 'enhanced'];
    const currentIndex = themeOrder.indexOf(theme);
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];

    console.log('Theme changed to:', nextTheme);
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return Sun;
      case 'dark':
        return Moon;
      case 'dim':
        return Cloud;
      case 'enhanced':
        return CloudRain;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'dim':
        return 'Dim';
      case 'enhanced':
        return 'Enhanced';
    }
  };

  const ThemeIcon = getThemeIcon();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleThemeChange}
      className={`min-w-[100px] ${className}`}
      data-testid="button-theme-toggle"
      title="Toggle theme"
    >
      <div className="flex items-center space-x-2">
        <ThemeIcon className="w-4 h-4" />
        <span className="text-sm">{getThemeLabel()}</span>
      </div>
    </Button>
  );
}