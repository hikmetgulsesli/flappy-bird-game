"use client";

import { CitySearchAutocomplete } from "@/components/city-search-autocomplete";
import { type CitySuggestion } from "@/hooks/use-city-search";

export default function Home() {
  const handleCitySelect = (city: CitySuggestion) => {
    console.log("Selected city:", city);
    // This will trigger weather fetch in future stories
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] font-[var(--font-body)]">
      <header className="border-b border-[var(--border-color)] bg-[var(--bg-card)]">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
              Weather Dashboard
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-medium text-[var(--text-primary)]">
              Search Location
            </h2>
            <CitySearchAutocomplete
              onCitySelect={handleCitySelect}
              placeholder="Search for a city..."
            />
          </div>
        </div>
      </main>
    </div>
  );
}
