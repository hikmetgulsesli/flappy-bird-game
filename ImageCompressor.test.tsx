import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ImageCompressor from "./ImageCompressor";

describe("ImageCompressor", () => {
  beforeEach(() => {
    vi.stubGlobal("URL", {
      createObjectURL: vi.fn(() => "blob:http://localhost/mock-url"),
      revokeObjectURL: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders page heading", () => {
    render(<ImageCompressor />);
    expect(screen.getByText("Görsel Sıkıştırma")).toBeInTheDocument();
  });

  it("renders drop zone", () => {
    render(<ImageCompressor />);
    expect(screen.getByTestId("drop-zone")).toBeInTheDocument();
    expect(screen.getByText(/Görseli buraya sürükleyin/)).toBeInTheDocument();
  });

  it("renders quality slider", () => {
    render(<ImageCompressor />);
    const slider = screen.getByTestId("quality-slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveValue("80");
  });

  it("accepts file upload via input", async () => {
    const mockFile = new File(["test"], "test.png", { type: "image/png" });
    
    vi.mock("browser-image-compression", () => ({
      default: vi.fn().mockResolvedValue({
        name: "compressed-test.png",
        size: 50000,
        type: "image/png",
      }),
    }));

    render(<ImageCompressor />);
    
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [mockFile] } });

    await waitFor(() => {
      expect(screen.getByTestId("download-button")).toBeInTheDocument();
    });
  });

  it("shows error for invalid file type", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    
    const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
    
    render(<ImageCompressor />);
    
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [mockFile] } });

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Desteklenen formatlar: JPG, PNG, WebP");
    });
    
    alertMock.mockRestore();
  });

  it("handles drag and drop", async () => {
    const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
    
    vi.mock("browser-image-compression", () => ({
      default: vi.fn().mockResolvedValue({
        name: "compressed-test.jpg",
        size: 50000,
        type: "image/jpeg",
      }),
    }));

    render(<ImageCompressor />);
    
    const dropZone = screen.getByTestId("drop-zone");
    fireEvent.drop(dropZone, {
      dataTransfer: {
        files: [mockFile],
      },
    });

    await waitFor(() => {
      expect(screen.getByTestId("download-button")).toBeInTheDocument();
    });
  });

  it("displays download button after compression", async () => {
    vi.mock("browser-image-compression", () => ({
      default: vi.fn().mockResolvedValue({
        name: "test.jpg",
        size: 50000,
        type: "image/jpeg",
      }),
    }));

    const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
    
    render(<ImageCompressor />);
    
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [mockFile] } });

    await waitFor(() => {
      expect(screen.getByTestId("download-button")).toBeInTheDocument();
      expect(screen.getByText("Sıkıştırılmış Görseli İndir")).toBeInTheDocument();
    });
  });

  it("shows compression stats after processing", async () => {
    vi.mock("browser-image-compression", () => ({
      default: vi.fn().mockResolvedValue({
        name: "test.jpg",
        size: 50000,
        type: "image/jpeg",
      }),
    }));

    const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
    
    render(<ImageCompressor />);
    
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [mockFile] } });

    await waitFor(() => {
      expect(screen.getByText(/dosya boyutu azaltıldı/)).toBeInTheDocument();
    });
  });

  it("has reset button after compression", async () => {
    vi.mock("browser-image-compression", () => ({
      default: vi.fn().mockResolvedValue({
        name: "test.jpg",
        size: 50000,
        type: "image/jpeg",
      }),
    }));

    const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
    
    render(<ImageCompressor />);
    
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [mockFile] } });

    await waitFor(() => {
      expect(screen.getByText("Sıfırla")).toBeInTheDocument();
    });
  });
});
