import WeatherBackground from '../WeatherBackground';

export default function WeatherBackgroundExample() {
  return (
    <WeatherBackground condition="rainy">
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Weather Background Demo</h1>
        <p className="text-lg text-muted-foreground">
          This background adapts to different weather conditions with animated overlays.
        </p>
      </div>
    </WeatherBackground>
  );
}