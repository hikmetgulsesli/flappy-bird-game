import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CitySearchAutocomplete } from "@/components/city-search-autocomplete";

// Mock fetch
global.fetch = jest.fn();

const mockCities = [
  { name: "London", lat: 51.5074, lon: -0.1278, country: "GB", state: "England" },
  { name: "New York", lat: 40.7128, lon: -74.006, country: "US", state: "New York" },
  { name: "Paris", lat: 48.8566, lon: 2.3522, country: "FR" },
];

describe("CitySearchAutocomplete", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockCities,
    });
  });

  it("renders search input with placeholder", () => {
    render(<CitySearchAutocomplete placeholder="Search for a city..." />);
    expect(screen.getByLabelText("Search for a city")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search for a city...")).toBeInTheDocument();
  });

  it("shows suggestions after typing 2+ characters with debounce", async () => {
    render(<CitySearchAutocomplete />);
    const input = screen.getByLabelText("Search for a city");
    
    await act(async () => {
      await userEvent.type(input, "Lon");
    });

    // Wait for debounce
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/geo/1.0/direct?q=Lon")
      );
    }, { timeout: 500 });

    await waitFor(() => {
      expect(screen.getByText("London")).toBeInTheDocument();
      expect(screen.getByText("New York")).toBeInTheDocument();
      expect(screen.getByText("Paris")).toBeInTheDocument();
    });
  });

  it("calls onCitySelect when clicking a suggestion", async () => {
    const handleSelect = jest.fn();
    render(<CitySearchAutocomplete onCitySelect={handleSelect} />);
    const input = screen.getByLabelText("Search for a city");
    
    await act(async () => {
      await userEvent.type(input, "Lon");
    });

    await waitFor(() => {
      expect(screen.getByText("London")).toBeInTheDocument();
    }, { timeout: 500 });

    await act(async () => {
      fireEvent.click(screen.getByText("London"));
    });

    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "London",
        lat: 51.5074,
        lon: -0.1278,
        country: "GB",
        state: "England",
      })
    );
  });

  it("shows loading spinner while fetching suggestions", async () => {
    let resolveJson: (value: unknown) => void;
    (fetch as jest.Mock).mockImplementation(() =>
      new Promise((resolve) => {
        resolve({
          ok: true,
          json: () => new Promise((r) => { resolveJson = r; }),
        });
      })
    );

    render(<CitySearchAutocomplete />);
    const input = screen.getByLabelText("Search for a city");
    
    await act(async () => {
      await userEvent.type(input, "Lon");
    });

    // Spinner should appear
    await waitFor(() => {
      expect(document.querySelector("svg.animate-spin")).toBeInTheDocument();
    });

    // Resolve the fetch
    resolveJson!(mockCities);

    await waitFor(() => {
      expect(screen.getByText("London")).toBeInTheDocument();
    });
  });

  it("shows empty state when no results found", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    render(<CitySearchAutocomplete />);
    const input = screen.getByLabelText("Search for a city");
    
    await act(async () => {
      await userEvent.type(input, "Xyzabc");
    });

    await waitFor(() => {
      expect(screen.getByText("No cities found")).toBeInTheDocument();
      expect(screen.getByText("Try a different search term")).toBeInTheDocument();
    }, { timeout: 500 });
  });

  it("supports keyboard navigation with arrow keys", async () => {
    render(<CitySearchAutocomplete />);
    const input = screen.getByLabelText("Search for a city");
    
    await act(async () => {
      await userEvent.type(input, "Lon");
    });

    await waitFor(() => {
      expect(screen.getByText("London")).toBeInTheDocument();
    }, { timeout: 500 });

    // Press arrow down to highlight first item
    await act(async () => {
      fireEvent.keyDown(input, { key: "ArrowDown" });
    });

    const firstOption = screen.getByRole("option", { name: /London/i });
    expect(firstOption).toHaveAttribute("aria-selected", "true");

    // Press arrow down again
    await act(async () => {
      fireEvent.keyDown(input, { key: "ArrowDown" });
    });

    const secondOption = screen.getByRole("option", { name: /New York/i });
    expect(secondOption).toHaveAttribute("aria-selected", "true");
  });

  it("selects highlighted item with Enter key", async () => {
    const handleSelect = jest.fn();
    render(<CitySearchAutocomplete onCitySelect={handleSelect} />);
    const input = screen.getByLabelText("Search for a city");
    
    await act(async () => {
      await userEvent.type(input, "Lon");
    });

    await waitFor(() => {
      expect(screen.getByText("London")).toBeInTheDocument();
    }, { timeout: 500 });

    // Navigate to first item
    await act(async () => {
      fireEvent.keyDown(input, { key: "ArrowDown" });
    });

    // Press Enter to select
    await act(async () => {
      fireEvent.keyDown(input, { key: "Enter" });
    });

    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({ name: "London" })
    );
  });

  it("closes dropdown with Escape key", async () => {
    render(<CitySearchAutocomplete />);
    const input = screen.getByLabelText("Search for a city");
    
    await act(async () => {
      await userEvent.type(input, "Lon");
    });

    await waitFor(() => {
      expect(screen.getByText("London")).toBeInTheDocument();
    }, { timeout: 500 });

    await act(async () => {
      fireEvent.keyDown(input, { key: "Escape" });
    });

    await waitFor(() => {
      expect(screen.queryByText("London")).not.toBeInTheDocument();
    });
  });

  it("closes dropdown when clicking outside", async () => {
    render(<CitySearchAutocomplete />);
    const input = screen.getByLabelText("Search for a city");
    
    await act(async () => {
      await userEvent.type(input, "Lon");
    });

    await waitFor(() => {
      expect(screen.getByText("London")).toBeInTheDocument();
    }, { timeout: 500 });

    // Click outside
    await act(async () => {
      fireEvent.mouseDown(document.body);
    });

    await waitFor(() => {
      expect(screen.queryByText("London")).not.toBeInTheDocument();
    });
  });

  it("does not fetch suggestions for queries under min length", async () => {
    render(<CitySearchAutocomplete minQueryLength={3} />);
    const input = screen.getByLabelText("Search for a city");
    
    await act(async () => {
      await userEvent.type(input, "Lo");
    });

    // Wait a bit
    await new Promise((r) => setTimeout(r, 400));

    expect(fetch).not.toHaveBeenCalled();
  });
});
