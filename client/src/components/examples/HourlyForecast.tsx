import { useState } from 'react';
import HourlyForecast from '../HourlyForecast';

export default function HourlyForecastExample() {
  const [selectedDay, setSelectedDay] = useState('Today');
  
  const mockHourlyData = [
    { time: "12 PM", temperature: 22, condition: "sunny", precipitation: 0, windSpeed: 8 },
    { time: "1 PM", temperature: 24, condition: "sunny", precipitation: 0, windSpeed: 10 },
    { time: "2 PM", temperature: 25, condition: "partly cloudy", precipitation: 5, windSpeed: 12 },
    { time: "3 PM", temperature: 26, condition: "partly cloudy", precipitation: 10, windSpeed: 14 },
    { time: "4 PM", temperature: 24, condition: "cloudy", precipitation: 20, windSpeed: 16 },
    { time: "5 PM", temperature: 22, condition: "rainy", precipitation: 60, windSpeed: 18 },
    { time: "6 PM", temperature: 20, condition: "rainy", precipitation: 80, windSpeed: 20 },
    { time: "7 PM", temperature: 19, condition: "cloudy", precipitation: 30, windSpeed: 15 },
  ];

  const availableDays = ['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri'];

  return (
    <HourlyForecast
      hourlyData={mockHourlyData}
      selectedDay={selectedDay}
      availableDays={availableDays}
      onDayChange={setSelectedDay}
      unit="metric"
    />
  );
}