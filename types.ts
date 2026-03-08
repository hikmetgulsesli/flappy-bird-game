export interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: WeatherCondition;
  description: string;
  pressure?: number;
  uvIndex?: number;
}

export type WeatherCondition = 
  | "sunny" 
  | "cloudy" 
  | "partly-cloudy" 
  | "rainy" 
  | "stormy" 
  | "snowy" 
  | "foggy";

export interface ForecastDay {
  day: string;
  high: number;
  low: number;
  condition: WeatherCondition;
}
