"use client";

import { useState, useEffect } from "react";
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudFog, 
  CloudLightning,
  CloudSun,
  Droplets,
  Wind,
  Gauge,
  SunDim,
  MapPin,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { WeatherData, WeatherCondition } from "@/lib/types";
import { fetchWeatherData, getWeatherIconColor, getWeatherBgColor } from "@/lib/weather-service";

interface CurrentWeatherProps {
  city: string;
  className?: string;
}

function getWeatherIcon(condition: WeatherCondition, className?: string) {
  const iconProps = { className: cn("w-full h-full", className) };
  
  switch (condition) {
    case "sunny":
      return <Sun {...iconProps} />;
    case "partly-cloudy":
      return <CloudSun {...iconProps} />;
    case "cloudy":
      return <Cloud {...iconProps} />;
    case "rainy":
      return <CloudRain {...iconProps} />;
    case "stormy":
      return <CloudLightning {...iconProps} />;
    case "snowy":
      return <CloudSnow {...iconProps} />;
    case "foggy":
      return <CloudFog {...iconProps} />;
    default:
      return <Sun {...iconProps} />;
  }
}

function CurrentWeatherSkeleton() {
  return (
    <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-8">
      <div className="flex items-center gap-4">
        <Skeleton className="h-24 w-24 rounded-2xl" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-16 w-32" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full sm:w-auto">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CurrentWeatherError({ error, onRetry }: { error: string; onRetry?: () => void }) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500 mb-4">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
        Failed to load weather
      </h3>
      <p className="text-sm text-[var(--text-secondary)] max-w-xs mb-4">
        {error}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export function CurrentWeather({ city, className }: CurrentWeatherProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(city);
      setWeather(data);
    } catch (err) {
      setError("Unable to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, [city]);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)] ring-1 ring-[var(--border-color)] overflow-hidden",
        className
      )}
    >
      {/* Background gradient blob */}
      <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50 blur-3xl" />
      
      {/* Header */}
      <div className="relative z-10 flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="h-5 w-5 text-[var(--color-primary)]" />
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              {loading ? <Skeleton className="h-8 w-48 inline-block" /> : weather?.city}
            </h1>
          </div>
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            {currentDate} • {currentTime}
          </p>
        </div>
        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
          Live Updates
        </span>
      </div>

      {/* Content */}
      {error ? (
        <CurrentWeatherError error={error} onRetry={loadWeather} />
      ) : loading ? (
        <CurrentWeatherSkeleton />
      ) : weather ? (
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-8">
          {/* Main weather display */}
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "flex h-24 w-24 items-center justify-center rounded-2xl shadow-sm",
                getWeatherBgColor(weather.condition)
              )}
            >
              <div className={cn("h-16 w-16", getWeatherIconColor(weather.condition))}>
                {getWeatherIcon(weather.condition)}
              </div>
            </div>
            <div className="flex flex-col">
              <span 
                className="text-6xl font-bold tracking-tight text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-heading)" }}
                data-testid="temperature"
              >
                {weather.temperature}°
              </span>
              <span 
                className="text-lg font-medium text-[var(--text-secondary)]"
                style={{ fontFamily: "var(--font-body)" }}
                data-testid="condition"
              >
                {weather.description}
              </span>
            </div>
          </div>

          {/* Weather details grid */}
          <div 
            className="grid grid-cols-2 gap-x-8 gap-y-4 w-full sm:w-auto"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {/* Humidity */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-[var(--color-primary)]">
                <Droplets className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-[var(--text-secondary)]">Humidity</p>
                <p 
                  className="text-sm font-bold text-[var(--text-primary)]"
                  data-testid="humidity"
                >
                  {weather.humidity}%
                </p>
              </div>
            </div>

            {/* Wind */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <Wind className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-[var(--text-secondary)]">Wind</p>
                <p 
                  className="text-sm font-bold text-[var(--text-primary)]"
                  data-testid="wind-speed"
                >
                  {weather.windSpeed} mph
                </p>
              </div>
            </div>

            {/* Pressure */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                <Gauge className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-[var(--text-secondary)]">Pressure</p>
                <p className="text-sm font-bold text-[var(--text-primary)]">
                  {weather.pressure} hPa
                </p>
              </div>
            </div>

            {/* UV Index */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                <SunDim className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-[var(--text-secondary)]">UV Index</p>
                <p className="text-sm font-bold text-[var(--text-primary)]">
                  {weather.uvIndex && weather.uvIndex > 5 ? "High" : "Moderate"} ({weather.uvIndex})
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CurrentWeather;
