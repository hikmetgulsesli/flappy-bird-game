import { renderHook, act, waitFor } from "@testing-library/react";
import { useCitySearch } from "@/hooks/use-city-search";

// Mock fetch
global.fetch = jest.fn();

describe("useCitySearch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("initializes with empty query and no suggestions", () => {
    const { result } = renderHook(() => useCitySearch());
    
    expect(result.current.query).toBe("");
    expect(result.current.suggestions).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("updates query when setQuery is called", () => {
    const { result } = renderHook(() => useCitySearch());
    
    act(() => {
      result.current.setQuery("London");
    });
    
    expect(result.current.query).toBe("London");
  });

  it("fetches suggestions after debounce delay", async () => {
    const mockCities = [
      { name: "London", lat: 51.5074, lon: -0.1278, country: "GB" },
    ];
    
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCities,
    });

    const { result } = renderHook(() => useCitySearch({ debounceMs: 300 }));
    
    act(() => {
      result.current.setQuery("Lon");
    });

    // Should not fetch immediately
    expect(fetch).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);

    // Fast-forward past debounce
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Now should be loading
    expect(result.current.isLoading).toBe(true);

    // Wait for fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/geo/1.0/direct?q=Lon")
    );
    expect(result.current.suggestions).toEqual(mockCities);
  });

  it("does not fetch for queries under minQueryLength", () => {
    const { result } = renderHook(() => useCitySearch({ minQueryLength: 3 }));
    
    act(() => {
      result.current.setQuery("Lo");
    });

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(fetch).not.toHaveBeenCalled();
    expect(result.current.suggestions).toEqual([]);
  });

  it("clears suggestions when query is cleared", async () => {
    const mockCities = [{ name: "London", lat: 51.5074, lon: -0.1278, country: "GB" }];
    
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCities,
    });

    const { result } = renderHook(() => useCitySearch());
    
    // Set query and get suggestions
    act(() => {
      result.current.setQuery("Lon");
    });

    act(() => {
      jest.advanceTimersByTime(400);
    });

    await waitFor(() => {
      expect(result.current.suggestions).toEqual(mockCities);
    });

    // Clear query
    act(() => {
      result.current.setQuery("");
    });

    expect(result.current.suggestions).toEqual([]);
  });

  it("handles fetch errors gracefully", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useCitySearch());
    
    act(() => {
      result.current.setQuery("Lon");
    });

    act(() => {
      jest.advanceTimersByTime(400);
    });

    await waitFor(() => {
      expect(result.current.error).toBe("Network error");
      expect(result.current.isLoading).toBe(false);
      expect(result.current.suggestions).toEqual([]);
    });
  });

  it("handles non-ok response", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useCitySearch());
    
    act(() => {
      result.current.setQuery("Lon");
    });

    act(() => {
      jest.advanceTimersByTime(400);
    });

    await waitFor(() => {
      expect(result.current.error).toBe("Failed to fetch city suggestions");
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("uses custom apiKey if provided", async () => {
    const customKey = "my-custom-api-key";
    
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const { result } = renderHook(() => useCitySearch({ apiKey: customKey }));
    
    act(() => {
      result.current.setQuery("Lon");
    });

    act(() => {
      jest.advanceTimersByTime(400);
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`appid=${customKey}`)
      );
    });
  });

  it("uses demo key when no apiKey provided and env var not set", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const { result } = renderHook(() => useCitySearch());
    
    act(() => {
      result.current.setQuery("Lon");
    });

    act(() => {
      jest.advanceTimersByTime(400);
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("appid=demo")
      );
    });
  });
});
