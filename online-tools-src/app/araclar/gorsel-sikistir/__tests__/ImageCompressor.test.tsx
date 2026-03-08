import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ImageCompressor } from "../ImageCompressor";

// Mock browser-image-compression
vi.mock("browser-image-compression", () => ({
  default: vi.fn(),
}));

import imageCompression from "browser-image-compression";

describe("ImageCompressor", () => {
  const mockCompressedFile = new File(["compressed"], "test-compressed.jpg", {
    type: "image/jpeg",
  });

  beforeEach(() => {
    vi.clearAllMocks();
    (imageCompression as ReturnType<typeof vi.fn>).mockResolvedValue(mockCompressedFile);
    global.URL.createObjectURL = vi.fn(() => "blob:test-url");
    global.URL.revokeObjectURL = vi.fn();
  });

  it("renders upload area initially", () => {
    render(<ImageCompressor />);
    
    expect(screen.getByText("Görsel Yükleyin")).toBeInTheDocument();
    expect(screen.getByText(/Dosyayı buraya sürükleyin/)).toBeInTheDocument();
    expect(screen.getByText(/JPG, PNG, WebP/)).toBeInTheDocument();
  });

  it("shows error for unsupported file type", async () => {
    render(<ImageCompressor />);
    
    const input = document.querySelector('input[type="file"]');
    
    const invalidFile = new File(["test"], "test.txt", { type: "text/plain" });
    
    if (input) {
      fireEvent.change(input, { target: { files: [invalidFile] } });
    }
    
    await waitFor(() => {
      expect(screen.getByText(/Sadece JPG, PNG ve WebP formatları desteklenir/)).toBeInTheDocument();
    });
  });

  it("shows error for file too large", async () => {
    render(<ImageCompressor />);
    
    const input = document.querySelector('input[type="file"]');
    
    // Create a mock file that appears to be 11MB
    const largeFile = new File(["x".repeat(11 * 1024 * 1024)], "large.jpg", { 
      type: "image/jpeg" 
    });
    Object.defineProperty(largeFile, "size", { value: 11 * 1024 * 1024 });
    
    if (input) {
      fireEvent.change(input, { target: { files: [largeFile] } });
    }
    
    await waitFor(() => {
      expect(screen.getByText(/Dosya boyutu.*MB'dan küçük olmalıdır/)).toBeInTheDocument();
    });
  });

  it("compresses image on valid file upload", async () => {
    render(<ImageCompressor />);
    
    const input = document.querySelector('input[type="file"]');
    const validFile = new File(["test-image"], "test.jpg", { type: "image/jpeg" });
    
    if (input) {
      fireEvent.change(input, { target: { files: [validFile] } });
    }
    
    await waitFor(() => {
      expect(screen.getAllByText("Orijinal").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Sıkıştırılmış").length).toBeGreaterThan(0);
    });
  });

  it("displays quality slider when image is loaded", async () => {
    render(<ImageCompressor />);
    
    const input = document.querySelector('input[type="file"]');
    const validFile = new File(["test-image"], "test.jpg", { type: "image/jpeg" });
    
    if (input) {
      fireEvent.change(input, { target: { files: [validFile] } });
    }
    
    await waitFor(() => {
      expect(screen.getByText(/Sıkıştırma Kalitesi/)).toBeInTheDocument();
      expect(screen.getByRole("slider")).toBeInTheDocument();
    });
  });

  it("shows download button when compression is complete", async () => {
    render(<ImageCompressor />);
    
    const input = document.querySelector('input[type="file"]');
    const validFile = new File(["test-image"], "test.jpg", { type: "image/jpeg" });
    
    if (input) {
      fireEvent.change(input, { target: { files: [validFile] } });
    }
    
    await waitFor(() => {
      expect(screen.getByText(/Sıkıştırılmış Görseli İndir/)).toBeInTheDocument();
    });
  });

  it("shows 'Yeni Görsel' button to reset", async () => {
    render(<ImageCompressor />);
    
    const input = document.querySelector('input[type="file"]');
    const validFile = new File(["test-image"], "test.jpg", { type: "image/jpeg" });
    
    if (input) {
      fireEvent.change(input, { target: { files: [validFile] } });
    }
    
    await waitFor(() => {
      expect(screen.getByText(/Yeni Görsel/)).toBeInTheDocument();
    });
  });

  it("resets to upload area when 'Yeni Görsel' is clicked", async () => {
    render(<ImageCompressor />);
    
    const input = document.querySelector('input[type="file"]');
    const validFile = new File(["test-image"], "test.jpg", { type: "image/jpeg" });
    
    if (input) {
      fireEvent.change(input, { target: { files: [validFile] } });
    }
    
    await waitFor(() => {
      expect(screen.getByText(/Yeni Görsel/)).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText(/Yeni Görsel/));
    
    await waitFor(() => {
      expect(screen.getByText("Görsel Yükleyin")).toBeInTheDocument();
    });
  });

  it("displays file size stats correctly", async () => {
    render(<ImageCompressor />);
    
    const input = document.querySelector('input[type="file"]');
    const validFile = new File(["test-image"], "test.jpg", { type: "image/jpeg" });
    Object.defineProperty(validFile, "size", { value: 1024 * 1024 }); // 1MB
    
    if (input) {
      fireEvent.change(input, { target: { files: [validFile] } });
    }
    
    await waitFor(() => {
      expect(screen.getByText("Tasarruf")).toBeInTheDocument();
    });
  });
});
