import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

describe("Header Component", () => {
  it("renders logo and navigation links", () => {
    render(<Header currentPath="/" />);
    
    expect(screen.getByTestId("header-logo")).toBeInTheDocument();
    expect(screen.getByText("Online Araçlar")).toBeInTheDocument();
  });

  it("renders desktop navigation with links", () => {
    render(<Header currentPath="/" />);
    
    expect(screen.getByTestId("desktop-nav")).toBeInTheDocument();
    expect(screen.getByText("Ana Sayfa")).toBeInTheDocument();
    expect(screen.getByText("Hakkımızda")).toBeInTheDocument();
    expect(screen.getByText("İletişim")).toBeInTheDocument();
    expect(screen.getByText("Gizlilik")).toBeInTheDocument();
  });

  it("renders mobile menu button", () => {
    render(<Header currentPath="/" />);
    
    expect(screen.getByTestId("mobile-menu-button")).toBeInTheDocument();
  });

  it("highlights active navigation item", () => {
    render(<Header currentPath="/hakkimizda" />);
    
    const hakkimizdaLink = screen.getByText("Hakkımızda");
    expect(hakkimizdaLink).toHaveClass("text-blue-600");
  });
});

describe("Footer Component", () => {
  it("renders footer with brand information", () => {
    render(<Footer />);
    
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByText("Online Araçlar")).toBeInTheDocument();
  });

  it("renders tool links in footer", () => {
    render(<Footer />);
    
    expect(screen.getByText("QR Kod Oluşturucu")).toBeInTheDocument();
    expect(screen.getByText("Görsel Sıkıştırma")).toBeInTheDocument();
    expect(screen.getByText("Şifre Oluşturucu")).toBeInTheDocument();
  });

  it("renders corporate links in footer", () => {
    render(<Footer />);
    
    // Check that corporate links exist - use getAllByText for Hakkımızda and get specific one
    const corporateSection = screen.getByText("Kurumsal").closest("div");
    expect(corporateSection).toBeInTheDocument();
    
    // Get links within the corporate section
    const hakkimizdaLink = screen.getAllByText("Hakkımızda");
    expect(hakkimizdaLink.length).toBeGreaterThan(0);
    
    // Check gizlilik link
    expect(screen.getByText("Gizlilik Politikası")).toBeInTheDocument();
  });

  it("renders contact section", () => {
    render(<Footer />);
    
    expect(screen.getByText(/Sorularınız veya önerileriniz/)).toBeInTheDocument();
  });

  it("renders copyright notice", () => {
    render(<Footer />);
    
    expect(screen.getByText(/Tüm hakları saklıdır/)).toBeInTheDocument();
  });
});
