import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shirt,
  Umbrella,
  Sun,
  Cloud,
  Thermometer,
  Wind,
  Eye,
  Car,
  Home,
  Activity,
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react";

interface WeatherSuggestionsProps {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  precipitation: number;
  airQualityIndex: number;
  className?: string;
}

interface Suggestion {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'clothing' | 'activity' | 'health' | 'travel' | 'precaution';
  priority: 'high' | 'medium' | 'low';
}

export default function WeatherSuggestions({
  temperature,
  condition,
  humidity,
  windSpeed,
  uvIndex,
  precipitation,
  airQualityIndex,
  className = ""
}: WeatherSuggestionsProps) {

  const getSuggestions = (): Suggestion[] => {
    const suggestions: Suggestion[] = [];

    // Temperature-based suggestions
    if (temperature >= 30) {
      suggestions.push({
        id: 'hot-clothing',
        title: 'Light & Breathable Clothing',
        description: 'Wear light-colored, loose-fitting clothes made of natural fabrics like cotton',
        icon: <Shirt className="w-5 h-5" />,
        category: 'clothing',
        priority: 'high'
      });
      suggestions.push({
        id: 'sun-protection',
        title: 'Sun Protection',
        description: 'Use sunscreen (SPF 30+), sunglasses, and hat to protect against UV rays',
        icon: <Sun className="w-5 h-5" />,
        category: 'health',
        priority: 'high'
      });
      suggestions.push({
        id: 'hydration',
        title: 'Stay Hydrated',
        description: 'Drink plenty of water and avoid caffeinated/alcoholic beverages',
        icon: <Thermometer className="w-5 h-5" />,
        category: 'health',
        priority: 'high'
      });
    } else if (temperature <= 10) {
      suggestions.push({
        id: 'cold-clothing',
        title: 'Layer Up',
        description: 'Wear multiple layers, thermal wear, gloves, scarf, and warm hat',
        icon: <Shirt className="w-5 h-5" />,
        category: 'clothing',
        priority: 'high'
      });
      suggestions.push({
        id: 'indoor-activities',
        title: 'Indoor Activities Preferred',
        description: 'Consider indoor workouts or activities due to cold weather',
        icon: <Home className="w-5 h-5" />,
        category: 'activity',
        priority: 'medium'
      });
    } else if (temperature >= 25 && temperature < 30) {
      suggestions.push({
        id: 'moderate-clothing',
        title: 'Comfortable Summer Wear',
        description: 'Light clothing, comfortable shoes for outdoor activities',
        icon: <Shirt className="w-5 h-5" />,
        category: 'clothing',
        priority: 'medium'
      });
    }

    // Rain suggestions
    if (precipitation > 50 || condition.toLowerCase().includes('rain')) {
      suggestions.push({
        id: 'rain-gear',
        title: 'Rain Protection',
        description: 'Carry umbrella, wear waterproof jacket and shoes',
        icon: <Umbrella className="w-5 h-5" />,
        category: 'precaution',
        priority: 'high'
      });
      suggestions.push({
        id: 'wet-roads',
        title: 'Drive Carefully',
        description: 'Reduce speed, maintain extra distance, use headlights',
        icon: <Car className="w-5 h-5" />,
        category: 'travel',
        priority: 'high'
      });
    }

    // Wind suggestions
    if (windSpeed > 20) {
      suggestions.push({
        id: 'wind-protection',
        title: 'Wind Protection',
        description: 'Secure loose objects, be careful with doors and windows',
        icon: <Wind className="w-5 h-5" />,
        category: 'precaution',
        priority: 'medium'
      });
    }

    // UV Index suggestions
    if (uvIndex >= 6) {
      suggestions.push({
        id: 'uv-protection',
        title: 'UV Protection Required',
        description: 'Seek shade, wear protective clothing and sunglasses',
        icon: <Eye className="w-5 h-5" />,
        category: 'health',
        priority: 'high'
      });
    }

    // Air Quality suggestions
    if (airQualityIndex > 100) {
      suggestions.push({
        id: 'air-quality',
        title: 'Air Quality Concern',
        description: 'Limit outdoor activities, use air purifiers indoors',
        icon: <AlertTriangle className="w-5 h-5" />,
        category: 'health',
        priority: 'high'
      });
    }

    // Activity suggestions based on weather
    if (temperature >= 20 && temperature <= 30 && precipitation < 30 && airQualityIndex <= 100) {
      suggestions.push({
        id: 'outdoor-activities',
        title: 'Perfect for Outdoor Activities',
        description: 'Great weather for walking, jogging, or outdoor sports',
        icon: <Activity className="w-5 h-5" />,
        category: 'activity',
        priority: 'medium'
      });
    }

    // Humidity suggestions
    if (humidity > 80) {
      suggestions.push({
        id: 'humidity-discomfort',
        title: 'High Humidity',
        description: 'Feels warmer than actual temperature, stay in air-conditioned areas',
        icon: <Thermometer className="w-5 h-5" />,
        category: 'health',
        priority: 'medium'
      });
    }

    return suggestions.slice(0, 6); // Limit to 6 suggestions
  };

  const suggestions = getSuggestions();
  const categories = ['clothing', 'activity', 'health', 'travel', 'precaution'];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'clothing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'activity': return 'bg-green-100 text-green-800 border-green-200';
      case 'health': return 'bg-red-100 text-red-800 border-red-200';
      case 'travel': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'precaution': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Info className="w-4 h-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  return (
    <Card className={`p-4 gradient-bg border border-border/30 shadow-xl ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Smart Suggestions</h3>
              <p className="text-xs text-muted-foreground">AI-powered recommendations</p>
            </div>
          </div>
        </div>

        {/* Suggestions Grid - More compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="p-3 rounded-lg border bg-card/50 hover:bg-card/70 transition-colors group"
            >
              <div className="flex items-start space-x-2">
                <div className={`p-1.5 rounded-md ${getCategoryColor(suggestion.category)} group-hover:scale-105 transition-transform`}>
                  {suggestion.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground text-xs">{suggestion.title}</h4>
                    {getPriorityIcon(suggestion.priority)}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {suggestion.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Summary */}
        <div className="p-2 rounded-lg bg-muted/20 border">
          <div className="flex items-center space-x-1 mb-1">
            <Info className="w-3 h-3 text-blue-500" />
            <span className="text-xs font-medium text-foreground">Summary</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Personalized recommendations based on current weather conditions.
          </div>
        </div>
      </div>
    </Card>
  );
}
