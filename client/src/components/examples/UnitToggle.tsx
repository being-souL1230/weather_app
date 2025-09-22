import { useState } from 'react';
import UnitToggle from '../UnitToggle';

export default function UnitToggleExample() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  return (
    <div className="p-4">
      <UnitToggle unit={unit} onUnitChange={setUnit} />
    </div>
  );
}