"use client";

import { useState, useEffect, useCallback } from "react";

export interface CitySuggestion {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

interface UseCitySearchOptions {
  debounceMs?: number;
  minQueryLength?: number;
  apiKey?: string;
}

export function useCitySearch(options: UseCitySearchOptions = {}) {
  const {
    debounceMs = 300,
    minQueryLength = 2,
    apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
  } = options;

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = useCallback(
    async (searchQuery: string) => {
      if (searchQuery.length < minQueryLength) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
            searchQuery
          )}&limit=5&appid=${apiKey || "demo"}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch city suggestions");
        }

        const data = await response.json();
        setSuggestions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    },
    [minQueryLength, apiKey]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs, fetchSuggestions]);

  return {
    query,
    setQuery,
    suggestions,
    isLoading,
    error,
  };
}
