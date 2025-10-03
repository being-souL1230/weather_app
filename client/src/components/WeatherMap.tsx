import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '@/components/ui/card';
import { Loader2, Layers } from 'lucide-react';
import type { Location } from '@/lib/weatherApi';
import L from 'leaflet';

// Fix Leaflet icon issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface WeatherMapProps {
  location: Location | null;
  isLoading?: boolean;
}

// Component to recenter map when location changes
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function WeatherMap({ location, isLoading = false }: WeatherMapProps) {
  // Default to a central position if no location is provided
  const position: [number, number] = location ? 
    [location.latitude, location.longitude] : 
    [40, 0]; // Default position

  // Map layer URL - Using free tile server that doesn't require API key
  const mapLayer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  // Attribution for map layer
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  if (isLoading) {
    return (
      <Card className="w-full h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Loading map...</p>
      </Card>
    );
  }

  if (!location) {
    return (
      <Card className="w-full h-[400px] flex items-center justify-center">
        <p>Select a location to view weather map</p>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">Weather Map</h3>
        <p className="text-sm text-muted-foreground">{location.name}, {location.country}</p>
      </div>
      
      <div className="px-4 pt-2">
        <div className="flex items-center">
          <Layers className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Standard Map</span>
        </div>
      </div>

        <div className="h-[400px] w-full">
          <MapContainer 
            center={position} 
            zoom={10} 
            style={{ height: '100%', width: '100%' }}
          >
            <ChangeView center={position} />
            <TileLayer
              url={mapLayer}
              attribution={attribution}
            />
            <Marker position={position}>
              <Popup>
                {location.name}, {location.country}
              </Popup>
            </Marker>
          </MapContainer>
        </div>

      <div className="p-4 text-xs text-muted-foreground">
        Map data © OpenStreetMap contributors
      </div>
    </Card>
  );
}