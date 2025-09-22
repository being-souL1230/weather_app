import ForecastCard from '../ForecastCard';

export default function ForecastCardExample() {
  const mockForecasts = [
    { date: "2024-01-01", day: "Today", high: 24, low: 16, condition: "partly cloudy", precipitation: 10, humidity: 65 },
    { date: "2024-01-02", day: "Tomorrow", high: 26, low: 18, condition: "sunny", precipitation: 0, humidity: 55 },
    { date: "2024-01-03", day: "Wed", high: 22, low: 14, condition: "rainy", precipitation: 80, humidity: 75 },
    { date: "2024-01-04", day: "Thu", high: 20, low: 12, condition: "cloudy", precipitation: 20, humidity: 70 },
    { date: "2024-01-05", day: "Fri", high: 25, low: 17, condition: "sunny", precipitation: 5, humidity: 60 },
    { date: "2024-01-06", day: "Sat", high: 23, low: 15, condition: "partly cloudy", precipitation: 15, humidity: 65 },
    { date: "2024-01-07", day: "Sun", high: 21, low: 13, condition: "rainy", precipitation: 70, humidity: 80 },
  ];

  return (
    <ForecastCard forecasts={mockForecasts} unit="metric" />
  );
}