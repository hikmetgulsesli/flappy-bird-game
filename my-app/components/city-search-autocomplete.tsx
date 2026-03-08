"use client";

import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Search, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCitySearch, type CitySuggestion } from "@/hooks/use-city-search";

export interface CitySearchAutocompleteProps {
  onCitySelect?: (city: CitySuggestion) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
  minQueryLength?: number;
}

export function CitySearchAutocomplete({
  onCitySelect,
  placeholder = "Search for a city...",
  className,
  debounceMs = 300,
  minQueryLength = 2,
}: CitySearchAutocompleteProps) {
  const { query, setQuery, suggestions, isLoading } = useCitySearch({
    debounceMs,
    minQueryLength,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length >= minQueryLength);
    setHighlightedIndex(-1);
  };

  const handleCitySelect = useCallback(
    (city: CitySuggestion) => {
      setQuery(city.name);
      setIsOpen(false);
      setHighlightedIndex(-1);
      onCitySelect?.(city);
    },
    [onCitySelect, setQuery]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
            handleCitySelect(suggestions[highlightedIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setHighlightedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    },
    [isOpen, suggestions, highlightedIndex, handleCitySelect]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatCityDisplay = (city: CitySuggestion): string => {
    const parts = [city.name];
    if (city.state) parts.push(city.state);
    parts.push(city.country);
    return parts.join(", ");
  };

  const showEmptyState = query.length >= minQueryLength && !isLoading && suggestions.length === 0;

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.length >= minQueryLength) setIsOpen(true);
          }}
          placeholder={placeholder}
          className="pl-10 pr-10"
          aria-label="Search for a city"
          aria-autocomplete="list"
          aria-controls={isOpen ? "city-suggestions" : undefined}
          aria-expanded={isOpen}
          aria-activedescendant={
            highlightedIndex >= 0 ? `city-option-${highlightedIndex}` : undefined
          }
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Spinner className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </div>

      {isOpen && (
        <div
          id="city-suggestions"
          role="listbox"
          className="absolute z-50 mt-1 max-h-72 w-full overflow-auto rounded-md border border-border bg-popover shadow-lg"
        >
          {showEmptyState ? (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              <MapPin className="mx-auto mb-2 h-8 w-8 opacity-50" />
              <p>No cities found</p>
              <p className="mt-1 text-xs">Try a different search term</p>
            </div>
          ) : (
            <ul className="py-1" role="list">
              {suggestions.map((city, index) => (
                <li
                  key={`${city.lat}-${city.lon}`}
                  id={`city-option-${index}`}
                  role="option"
                  aria-selected={index === highlightedIndex}
                  className={cn(
                    "cursor-pointer px-4 py-2 text-sm transition-colors",
                    index === highlightedIndex
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={() => handleCitySelect(city)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="font-medium">{city.name}</span>
                    {city.state && (
                      <span className="text-muted-foreground">, {city.state}</span>
                    )}
                    <span className="ml-auto text-xs text-muted-foreground">
                      {city.country}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
