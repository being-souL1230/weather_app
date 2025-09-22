import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Wind, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface AirQualityDetailsProps {
  pm25?: number;
  pm10?: number;
  ozone?: number;
  no2?: number;
  so2?: number;
  co?: number;
  className?: string;
}

interface PollutantInfo {
  name: string;
  value?: number;
  unit: string;
  description: string;
  getStatus: (value?: number) => {
    status: 'good' | 'moderate' | 'unhealthy' | 'very-unhealthy' | 'hazardous';
    color: string;
    icon: React.ReactNode;
  };
  getHealthAdvice: (value?: number) => string[];
}

const pollutants: Record<string, PollutantInfo> = {
  pm25: {
    name: "PM2.5",
    unit: "μg/m³",
    description: "Fine particulate matter",
    getStatus: (value) => {
      if (!value || value <= 12) return { status: 'good', color: 'bg-green-500', icon: <CheckCircle className="w-4 h-4" /> };
      if (value <= 35) return { status: 'moderate', color: 'bg-yellow-500', icon: <Info className="w-4 h-4" /> };
      if (value <= 55) return { status: 'unhealthy', color: 'bg-orange-500', icon: <AlertTriangle className="w-4 h-4" /> };
      if (value <= 150) return { status: 'very-unhealthy', color: 'bg-red-500', icon: <AlertTriangle className="w-4 h-4" /> };
      return { status: 'hazardous', color: 'bg-purple-500', icon: <AlertTriangle className="w-4 h-4" /> };
    },
    getHealthAdvice: (value) => {
      if (!value || value <= 12) return ["Air quality is good for most activities"];
      if (value <= 35) return ["Acceptable for most people", "Sensitive individuals may experience minor discomfort"];
      if (value <= 55) return ["Sensitive groups may experience health effects", "General public is not likely to be affected"];
      if (value <= 150) return ["Everyone may experience health effects", "Sensitive groups may experience more serious effects"];
      return ["Health warnings of emergency conditions", "Entire population is more likely to be affected"];
    }
  },
  pm10: {
    name: "PM10",
    unit: "μg/m³",
    description: "Coarse particulate matter",
    getStatus: (value) => {
      if (!value || value <= 54) return { status: 'good', color: 'bg-green-500', icon: <CheckCircle className="w-4 h-4" /> };
      if (value <= 154) return { status: 'moderate', color: 'bg-yellow-500', icon: <Info className="w-4 h-4" /> };
      if (value <= 254) return { status: 'unhealthy', color: 'bg-orange-500', icon: <AlertTriangle className="w-4 h-4" /> };
      if (value <= 354) return { status: 'very-unhealthy', color: 'bg-red-500', icon: <AlertTriangle className="w-4 h-4" /> };
      return { status: 'hazardous', color: 'bg-purple-500', icon: <AlertTriangle className="w-4 h-4" /> };
    },
    getHealthAdvice: (value) => {
      if (!value || value <= 54) return ["Air quality is satisfactory"];
      if (value <= 154) return ["May cause moderate health concern for sensitive people"];
      if (value <= 254) return ["May cause health effects in sensitive groups"];
      return ["May cause serious health effects"];
    }
  },
  ozone: {
    name: "Ozone",
    unit: "ppb",
    description: "Ground-level ozone",
    getStatus: (value) => {
      if (!value || value <= 54) return { status: 'good', color: 'bg-green-500', icon: <CheckCircle className="w-4 h-4" /> };
      if (value <= 70) return { status: 'moderate', color: 'bg-yellow-500', icon: <Info className="w-4 h-4" /> };
      if (value <= 85) return { status: 'unhealthy', color: 'bg-orange-500', icon: <AlertTriangle className="w-4 h-4" /> };
      if (value <= 105) return { status: 'very-unhealthy', color: 'bg-red-500', icon: <AlertTriangle className="w-4 h-4" /> };
      return { status: 'hazardous', color: 'bg-purple-500', icon: <AlertTriangle className="w-4 h-4" /> };
    },
    getHealthAdvice: (value) => {
      if (!value || value <= 54) return ["Air quality is good"];
      if (value <= 70) return ["Unusually sensitive people should consider reducing prolonged outdoor exertion"];
      if (value <= 85) return ["Active children and adults, and people with respiratory disease should limit prolonged outdoor exertion"];
      return ["Everyone should avoid all outdoor exertion"];
    }
  },
  no2: {
    name: "NO₂",
    unit: "ppb",
    description: "Nitrogen dioxide",
    getStatus: (value) => {
      if (!value || value <= 53) return { status: 'good', color: 'bg-green-500', icon: <CheckCircle className="w-4 h-4" /> };
      if (value <= 100) return { status: 'moderate', color: 'bg-yellow-500', icon: <Info className="w-4 h-4" /> };
      if (value <= 360) return { status: 'unhealthy', color: 'bg-orange-500', icon: <AlertTriangle className="w-4 h-4" /> };
      if (value <= 649) return { status: 'very-unhealthy', color: 'bg-red-500', icon: <AlertTriangle className="w-4 h-4" /> };
      return { status: 'hazardous', color: 'bg-purple-500', icon: <AlertTriangle className="w-4 h-4" /> };
    },
    getHealthAdvice: (value) => {
      if (!value || value <= 53) return ["Air quality is good"];
      if (value <= 100) return ["Susceptible individuals may experience minor health effects"];
      return ["May cause respiratory effects in sensitive individuals"];
    }
  }
};

export default function AirQualityDetails({
  pm25 = 25,
  pm10 = 45,
  ozone = 32,
  no2 = 15,
  so2 = 2,
  co = 0.5,
  className = ""
}: AirQualityDetailsProps) {
  const airQualityData = [
    { key: 'pm25', value: pm25 },
    { key: 'pm10', value: pm10 },
    { key: 'ozone', value: ozone },
    { key: 'no2', value: no2 },
  ];

  const getOverallStatus = () => {
    const statuses = airQualityData
      .map(({ key, value }) => pollutants[key].getStatus(value).status)
      .filter(status => status !== 'good');

    if (statuses.includes('hazardous')) return 'hazardous';
    if (statuses.includes('very-unhealthy')) return 'very-unhealthy';
    if (statuses.includes('unhealthy')) return 'unhealthy';
    if (statuses.includes('moderate')) return 'moderate';
    return 'good';
  };

  const overallStatus = getOverallStatus();
  const statusColors = {
    good: 'text-green-600 bg-green-50 border-green-200',
    moderate: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    unhealthy: 'text-orange-600 bg-orange-50 border-orange-200',
    'very-unhealthy': 'text-red-600 bg-red-50 border-red-200',
    hazardous: 'text-purple-600 bg-purple-50 border-purple-200'
  };

  return (
    <Card className={`p-4 gradient-bg border border-border/30 shadow-xl ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wind className="w-5 h-5 text-blue-500" />
            <div>
              <h3 className="text-base font-semibold text-foreground">Air Quality Details</h3>
              <p className="text-xs text-muted-foreground">Real-time pollutant breakdown</p>
            </div>
          </div>
          <Badge className={`${statusColors[overallStatus]} border text-xs`}>
            {overallStatus.replace('-', ' ').toUpperCase()}
          </Badge>
        </div>

        {/* Pollutant Grid - More compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {airQualityData.map(({ key, value }) => {
            const pollutant = pollutants[key];
            const status = pollutant.getStatus(value);

            return (
              <div key={key} className="p-3 rounded-lg border bg-card/50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                  <div className="flex items-center space-x-1">
                    <span className="font-medium text-foreground text-sm">{pollutant.name}</span>
                    <span className="text-xs text-muted-foreground">({pollutant.description})</span>
                  </div>
                  <div className={`flex items-center space-x-1 px-1.5 py-0.5 rounded-full ${status.color} text-white w-fit`}>
                    {status.icon}
                    <span className="text-xs font-medium capitalize">{status.status.replace('-', ' ')}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Current</span>
                    <span className="font-semibold">{value || 0} {pollutant.unit}</span>
                  </div>

                  <Progress
                    value={Math.min((value || 0) / 100 * 100, 100)}
                    className="h-1.5"
                  />

                  <div className="text-xs text-muted-foreground">
                    <div className="flex items-start space-x-1">
                      <span className="text-blue-500">•</span>
                      <span>{pollutant.getHealthAdvice(value)[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact Health Recommendations */}
        <div className="p-2 rounded-lg bg-muted/20 border">
          <h4 className="font-medium text-foreground text-sm mb-1">Health Recommendations</h4>
          <div className="text-xs text-muted-foreground">
            {overallStatus === 'good' && (
              <p>Great day for outdoor activities! Air quality is excellent.</p>
            )}
            {overallStatus === 'moderate' && (
              <p>Air quality is acceptable, but sensitive individuals should monitor symptoms.</p>
            )}
            {overallStatus === 'unhealthy' && (
              <p>Consider reducing outdoor activities, especially for sensitive groups.</p>
            )}
            {(overallStatus === 'very-unhealthy' || overallStatus === 'hazardous') && (
              <p>Limit outdoor activities and stay indoors when possible. Use air purifiers.</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
