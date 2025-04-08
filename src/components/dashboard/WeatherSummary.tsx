
import React, { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain, Snowflake } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface WeatherData {
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
}

export const WeatherSummary = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetching weather data
    const fetchWeather = async () => {
      try {
        // This would be replaced with actual API call
        // const response = await fetch('https://weather-api.example/current');
        // const data = await response.json();
        
        // Mock data for now
        const mockWeather: WeatherData = {
          temperature: 72,
          condition: 'sunny',
        };
        
        setWeather(mockWeather);
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const renderWeatherIcon = () => {
    if (!weather) return null;

    switch (weather.condition) {
      case 'sunny':
        return <Sun size={32} className="text-yellow-400" />;
      case 'cloudy':
        return <Cloud size={32} className="text-gray-400" />;
      case 'rainy':
        return <CloudRain size={32} className="text-blue-400" />;
      case 'snowy':
        return <Snowflake size={32} className="text-blue-200" />;
      default:
        return <Sun size={32} className="text-yellow-400" />;
    }
  };

  if (loading) {
    return (
      <Card className="w-full mb-4">
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">Loading weather data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full mb-4">
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <h3 className="font-medium">Today's Weather</h3>
          <p className="text-sm text-gray-500">
            {weather?.temperature}°F, {weather?.condition}
          </p>
          <p className="text-sm font-medium text-clos8-primary mt-1">
            Perfect for light layers
          </p>
        </div>
        <div>{renderWeatherIcon()}</div>
      </CardContent>
    </Card>
  );
};
