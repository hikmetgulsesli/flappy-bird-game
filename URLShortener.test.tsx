import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { URLShortener } from "../URLShortener";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
});

describe("URLShortener", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the URL shortener page", () => {
    render(<URLShortener />);

    expect(screen.getByText("URL Kısaltıcı")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/https:\/\/example\.com/)
    ).toBeInTheDocument();
  });

  it("has URL input field", () => {
    render(<URLShortener />);

    const input = screen.getByPlaceholderText(/https:\/\/example\.com/);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("has shorten button", () => {
    render(<URLShortener />);

    const shortenButton = screen.getByText("Kısalt");
    expect(shortenButton).toBeInTheDocument();
  });

  it("shows error for empty URL", () => {
    render(<URLShortener />);

    const shortenButton = screen.getByText("Kısalt");
    fireEvent.click(shortenButton);

    expect(screen.getByText("Lütfen bir URL girin")).toBeInTheDocument();
  });

  it("shows error for invalid URL format", () => {
    render(<URLShortener />);

    const input = screen.getByPlaceholderText(/https:\/\/example\.com/);
    fireEvent.change(input, { target: { value: "not-a-valid-url" } });

    const shortenButton = screen.getByText("Kısalt");
    fireEvent.click(shortenButton);

    expect(
      screen.getByText(/Geçersiz URL formatı/)
    ).toBeInTheDocument();
  });

  it("accepts valid URL with http protocol", () => {
    render(<URLShortener />);

    const input = screen.getByPlaceholderText(/https:\/\/example\.com/);
    fireEvent.change(input, { target: { value: "http://example.com" } });

    const shortenButton = screen.getByText("Kısalt");
    fireEvent.click(shortenButton);

    // Should not show error for valid URL
    expect(screen.queryByText(/Geçersiz URL formatı/)).not.toBeInTheDocument();
  });

  it("accepts valid URL with https protocol", () => {
    render(<URLShortener />);

    const input = screen.getByPlaceholderText(/https:\/\/example\.com/);
    fireEvent.change(input, { target: { value: "https://example.com" } });

    const shortenButton = screen.getByText("Kısalt");
    fireEvent.click(shortenButton);

    // Should not show error for valid URL
    expect(screen.queryByText(/Geçersiz URL formatı/)).not.toBeInTheDocument();
  });

  it("auto-adds https protocol if missing", () => {
    render(<URLShortener />);

    const input = screen.getByPlaceholderText(/https:\/\/example\.com/);
    fireEvent.change(input, { target: { value: "example.com" } });

    const shortenButton = screen.getByText("Kısalt");
    fireEvent.click(shortenButton);

    // Should not show error - protocol will be auto-added
    expect(screen.queryByText(/Geçersiz URL formatı/)).not.toBeInTheDocument();
  });

  it("generates shortened URL on valid input", () => {
    render(<URLShortener />);

    const input = screen.getByPlaceholderText(/https:\/\/example\.com/);
    fireEvent.change(input, { target: { value: "https://example.com/very/long/url" } });

    const shortenButton = screen.getByText("Kısalt");
    fireEvent.click(shortenButton);

    // Should show result section
    expect(screen.getByText("Kısaltılmış URL")).toBeInTheDocument();
    expect(screen.getByText("Orijinal URL:")).toBeInTheDocument();
  });

  it("has copy button for shortened URL", async () => {
    render(<URLShortener />);

    const input = screen.getByPlaceholderText(/https:\/\/example\.com/);
    fireEvent.change(input, { target: { value: "https://example.com" } });

    const shortenButton = screen.getByText("Kısalt");
    fireEvent.click(shortenButton);

    // Wait for result to appear
    await waitFor(() => {
      expect(screen.getByText("Kısa URL:")).toBeInTheDocument();
    });

    // Find copy button by title
    const copyButton = screen.getByTitle("Kopyala");
    expect(copyButton).toBeInTheDocument();
  });

  it("triggers shorten on Enter key", () => {
    render(<URLShortener />);

    const input = screen.getByPlaceholderText(/https:\/\/example\.com/);
    fireEvent.change(input, { target: { value: "https://example.com" } });
    fireEvent.keyDown(input, { key: "Enter" });

    // Should show result
    expect(screen.getByText("Kısaltılmış URL")).toBeInTheDocument();
  });

  it("loads history from localStorage on mount", () => {
    const mockHistory = JSON.stringify([
      {
        id: "123",
        originalUrl: "https://example.com",
        shortCode: "abc123",
        createdAt: Date.now(),
        clickCount: 0,
      },
    ]);
    localStorageMock.getItem.mockReturnValue(mockHistory);

    render(<URLShortener />);

    // Should show history section
    expect(screen.getByText(/Geçmiş/)).toBeInTheDocument();
  });

  it("saves to localStorage when shortening URL", () => {
    render(<URLShortener />);

    const input = screen.getByPlaceholderText(/https:\/\/example\.com/);
    fireEvent.change(input, { target: { value: "https://example.com" } });

    const shortenButton = screen.getByText("Kısalt");
    fireEvent.click(shortenButton);

    // Should save to localStorage
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it("has clear history button", () => {
    const mockHistory = JSON.stringify([
      {
        id: "123",
        originalUrl: "https://example.com",
        shortCode: "abc123",
        createdAt: Date.now(),
        clickCount: 0,
      },
    ]);
    localStorageMock.getItem.mockReturnValue(mockHistory);

    render(<URLShortener />);

    const clearButton = screen.getByText("Temizle");
    expect(clearButton).toBeInTheDocument();
  });

  it("is responsive on mobile", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<URLShortener />);

    // Page should still render correctly
    expect(screen.getByText("URL Kısaltıcı")).toBeInTheDocument();
  });

  it("renders main title and description for page content", () => {
    render(<URLShortener />);

    // Check for page title element
    expect(screen.getByText("URL Kısaltıcı")).toBeInTheDocument();

    // Check for description
    expect(
      screen.getByText(/Uzun URL'leri kısa ve paylaşılabilir/)
    ).toBeInTheDocument();
  });

  it("renders with responsive container classes", () => {
    render(<URLShortener />);

    // Check that main container has responsive classes
    const main = document.querySelector("main");
    expect(main).toHaveClass("max-w-2xl");
    expect(main).toHaveClass("px-4");
    expect(main).toHaveClass("sm:px-6");
    expect(main).toHaveClass("lg:px-8");
  });

  it("has links to other pages in footer", () => {
    render(<URLShortener />);

    expect(screen.getByText("Hakkımızda")).toBeInTheDocument();
    expect(screen.getByText("İletişim")).toBeInTheDocument();
    expect(screen.getByText("Gizlilik")).toBeInTheDocument();
  });

  it("renders info cards", () => {
    render(<URLShortener />);

    expect(screen.getByText("Güvenli")).toBeInTheDocument();
    expect(screen.getByText("Hızlı")).toBeInTheDocument();
    expect(screen.getByText("Geçmiş")).toBeInTheDocument();
  });
});
