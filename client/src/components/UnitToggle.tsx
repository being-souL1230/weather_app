import { Button } from "@/components/ui/button";
import { Thermometer, Wind } from "lucide-react";

interface UnitToggleProps {
  unit: 'metric' | 'imperial';
  onUnitChange: (unit: 'metric' | 'imperial') => void;
  className?: string;
}

export default function UnitToggle({ unit, onUnitChange, className = "" }: UnitToggleProps) {
  const handleToggle = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    console.log('Unit changed to:', newUnit);
    onUnitChange(newUnit);
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
        <Thermometer className="w-4 h-4" />
        <span>Units:</span>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleToggle}
        className="min-w-[80px]"
        data-testid="button-unit-toggle"
      >
        <div className="flex items-center space-x-1">
          {unit === 'metric' ? (
            <>
              <span>°C</span>
              <Wind className="w-3 h-3" />
              <span>km/h</span>
            </>
          ) : (
            <>
              <span>°F</span>
              <Wind className="w-3 h-3" />
              <span>mph</span>
            </>
          )}
        </div>
      </Button>
    </div>
  );
}