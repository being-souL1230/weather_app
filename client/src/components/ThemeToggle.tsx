import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Monitor } from "lucide-react";

type Theme = 'light' | 'dark' | 'auto';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>('auto');

  useEffect(() => {
    // Get initial theme from localStorage or default to auto
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('auto');
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === 'auto') {
      // Check time of day for automatic switching
      const hour = new Date().getHours();
      const isDarkTime = hour < 6 || hour > 18; // Dark from 6 PM to 6 AM
      
      if (isDarkTime) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } else if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const handleThemeChange = () => {
    const themeOrder: Theme[] = ['light', 'dark', 'auto'];
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
      case 'auto':
        return Monitor;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'auto':
        return 'Auto';
    }
  };

  const ThemeIcon = getThemeIcon();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleThemeChange}
      className={`min-w-[80px] ${className}`}
      data-testid="button-theme-toggle"
    >
      <div className="flex items-center space-x-2">
        <ThemeIcon className="w-4 h-4" />
        <span className="text-sm">{getThemeLabel()}</span>
      </div>
    </Button>
  );
}