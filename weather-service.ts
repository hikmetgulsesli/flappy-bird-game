import { WeatherData, WeatherCondition } from "./types";

// Mock weather service - in production this would call OpenWeatherMap API
export async function fetchWeatherData(city: string): Promise<WeatherData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  // Mock data for demonstration
  const mockData: Record<string, WeatherData> = {
    "san francisco": {
      city: "San Francisco, CA",
      temperature: 72,
      humidity: 45,
      windSpeed: 8,
      condition: "partly-cloudy" as WeatherCondition,
      description: "Partly Cloudy",
      pressure: 1015,
      uvIndex: 6,
    },
    "new york": {
      city: "New York, NY",
      temperature: 65,
      humidity: 60,
      windSpeed: 12,
      condition: "rainy" as WeatherCondition,
      description: "Light Rain",
      pressure: 1008,
      uvIndex: 3,
    },
    "london": {
      city: "London, UK",
      temperature: 58,
      humidity: 75,
      windSpeed: 15,
      condition: "cloudy" as WeatherCondition,
      description: "Overcast",
      pressure: 1012,
      uvIndex: 2,
    },
    "tokyo": {
      city: "Tokyo, Japan",
      temperature: 78,
      humidity: 55,
      windSpeed: 6,
      condition: "sunny" as WeatherCondition,
      description: "Clear Sky",
      pressure: 1018,
      uvIndex: 8,
    },
  };
  
  const normalizedCity = city.toLowerCase().trim();
  
  if (mockData[normalizedCity]) {
    return mockData[normalizedCity];
  }
  
  // Generate deterministic mock data for unknown cities
  const hash = normalizedCity.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const conditions: WeatherCondition[] = ["sunny", "cloudy", "partly-cloudy", "rainy"];
  const condition = conditions[hash % conditions.length];
  
  return {
    city: city.charAt(0).toUpperCase() + city.slice(1),
    temperature: 50 + (hash % 40),
    humidity: 30 + (hash % 50),
    windSpeed: 5 + (hash % 20),
    condition,
    description: condition.charAt(0).toUpperCase() + condition.slice(1).replace("-", " "),
    pressure: 1000 + (hash % 30),
    uvIndex: 1 + (hash % 10),
  };
}

export function getWeatherIconColor(condition: WeatherCondition): string {
  switch (condition) {
    case "sunny":
      return "text-yellow-500";
    case "partly-cloudy":
      return "text-blue-500";
    case "cloudy":
      return "text-slate-400";
    case "rainy":
      return "text-blue-600";
    case "stormy":
      return "text-purple-600";
    case "snowy":
      return "text-cyan-400";
    case "foggy":
      return "text-gray-400";
    default:
      return "text-blue-500";
  }
}

export function getWeatherBgColor(condition: WeatherCondition): string {
  switch (condition) {
    case "sunny":
      return "bg-gradient-to-br from-yellow-100 to-orange-50";
    case "partly-cloudy":
      return "bg-gradient-to-br from-blue-50 to-indigo-50";
    case "cloudy":
      return "bg-gradient-to-br from-slate-100 to-gray-50";
    case "rainy":
      return "bg-gradient-to-br from-blue-100 to-slate-100";
    case "stormy":
      return "bg-gradient-to-br from-purple-100 to-slate-100";
    case "snowy":
      return "bg-gradient-to-br from-cyan-50 to-blue-50";
    case "foggy":
      return "bg-gradient-to-br from-gray-100 to-slate-50";
    default:
      return "bg-gradient-to-br from-blue-50 to-indigo-50";
  }
}
