import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import CurrentWeather from "../components/current-weather";
import * as weatherService from "../lib/weather-service";

// Mock the weather service
vi.mock("../lib/weather-service", () => ({
  fetchWeatherData: vi.fn(),
  getWeatherIconColor: vi.fn(() => "text-yellow-500"),
  getWeatherBgColor: vi.fn(() => "bg-gradient-to-br from-yellow-100 to-orange-50"),
}));

describe("CurrentWeather", () => {
  const mockWeatherData = {
    city: "San Francisco, CA",
    temperature: 72,
    humidity: 45,
    windSpeed: 8,
    condition: "partly-cloudy" as const,
    description: "Partly Cloudy",
    pressure: 1015,
    uvIndex: 6,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("displays loading skeleton while fetching data", async () => {
    vi.mocked(weatherService.fetchWeatherData).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    render(<CurrentWeather city="san francisco" />);

    // Should show skeleton elements
    const skeletons = document.querySelectorAll("[class*='animate-pulse']");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("displays current temperature prominently", async () => {
    vi.mocked(weatherService.fetchWeatherData).mockResolvedValue(mockWeatherData);

    render(<CurrentWeather city="san francisco" />);

    await waitFor(() => {
      expect(screen.getByTestId("temperature")).toHaveTextContent("72°");
    });
  });

  it("displays humidity with droplet icon", async () => {
    vi.mocked(weatherService.fetchWeatherData).mockResolvedValue(mockWeatherData);

    render(<CurrentWeather city="san francisco" />);

    await waitFor(() => {
      expect(screen.getByTestId("humidity")).toHaveTextContent("45%");
    });

    // Check for humidity label
    expect(screen.getByText("Humidity")).toBeInTheDocument();
  });

  it("displays wind speed with wind icon", async () => {
    vi.mocked(weatherService.fetchWeatherData).mockResolvedValue(mockWeatherData);

    render(<CurrentWeather city="san francisco" />);

    await waitFor(() => {
      expect(screen.getByTestId("wind-speed")).toHaveTextContent("8 mph");
    });

    // Check for wind label
    expect(screen.getByText("Wind")).toBeInTheDocument();
  });

  it("displays weather condition text and icon", async () => {
    vi.mocked(weatherService.fetchWeatherData).mockResolvedValue(mockWeatherData);

    render(<CurrentWeather city="san francisco" />);

    await waitFor(() => {
      expect(screen.getByTestId("condition")).toHaveTextContent("Partly Cloudy");
    });
  });

  it("displays city name in header", async () => {
    vi.mocked(weatherService.fetchWeatherData).mockResolvedValue(mockWeatherData);

    render(<CurrentWeather city="san francisco" />);

    await waitFor(() => {
      expect(screen.getByText("San Francisco, CA")).toBeInTheDocument();
    });
  });

  it("displays error state when weather fetch fails", async () => {
    vi.mocked(weatherService.fetchWeatherData).mockRejectedValue(new Error("API Error"));

    render(<CurrentWeather city="invalid-city" />);

    await waitFor(() => {
      expect(screen.getByText("Failed to load weather")).toBeInTheDocument();
    });

    expect(screen.getByText("Unable to fetch weather data. Please try again.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try Again" })).toBeInTheDocument();
  });

  it("displays pressure information", async () => {
    vi.mocked(weatherService.fetchWeatherData).mockResolvedValue(mockWeatherData);

    render(<CurrentWeather city="san francisco" />);

    await waitFor(() => {
      expect(screen.getByText("Pressure")).toBeInTheDocument();
      expect(screen.getByText("1015 hPa")).toBeInTheDocument();
    });
  });

  it("displays UV index information", async () => {
    vi.mocked(weatherService.fetchWeatherData).mockResolvedValue(mockWeatherData);

    render(<CurrentWeather city="san francisco" />);

    await waitFor(() => {
      expect(screen.getByText("UV Index")).toBeInTheDocument();
      expect(screen.getByText(/High \(6\)/)).toBeInTheDocument();
    });
  });

  it("displays live updates badge", async () => {
    vi.mocked(weatherService.fetchWeatherData).mockResolvedValue(mockWeatherData);

    render(<CurrentWeather city="san francisco" />);

    await waitFor(() => {
      expect(screen.getByText("Live Updates")).toBeInTheDocument();
    });
  });

  it("displays current date and time", async () => {
    vi.mocked(weatherService.fetchWeatherData).mockResolvedValue(mockWeatherData);

    render(<CurrentWeather city="san francisco" />);

    // Check that date/time is displayed (format varies by locale)
    await waitFor(() => {
      const dateTimeRegex = /\w+, \d+ \w+.*\d+:\d+/;
      const elements = screen.getAllByText(dateTimeRegex);
      expect(elements.length).toBeGreaterThan(0);
    });
  });
});
