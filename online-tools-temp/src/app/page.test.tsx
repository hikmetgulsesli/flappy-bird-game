import { render, screen } from "@testing-library/react";
import Home from "./page";

// Mock next/link
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe("Home Page", () => {
  it("renders the main heading", () => {
    render(<Home />);
    expect(screen.getByText("Ücretsiz Online Araçlar")).toBeInTheDocument();
  });

  it("renders the subheading", () => {
    render(<Home />);
    expect(screen.getByText(/Günlük işlerinizi kolaylaştıran/)).toBeInTheDocument();
  });

  it("renders all 5 tool cards", () => {
    render(<Home />);
    
    expect(screen.getByText("QR Kod Oluşturucu")).toBeInTheDocument();
    expect(screen.getByText("Görsel Sıkıştırıcı")).toBeInTheDocument();
    expect(screen.getByText("Şifre Oluşturucu")).toBeInTheDocument();
    expect(screen.getByText("Base64 Encoder/Decoder")).toBeInTheDocument();
    expect(screen.getByText("URL Kısaltıcı")).toBeInTheDocument();
  });

  it("renders tool descriptions", () => {
    render(<Home />);
    
    expect(screen.getByText(/QR kodları oluşturun/)).toBeInTheDocument();
    expect(screen.getByText(/Görsellerinizi kalite kaybı olmadan sıkıştırın/)).toBeInTheDocument();
    expect(screen.getByText(/Güçlü ve güvenli rastgele şifreler oluşturun/)).toBeInTheDocument();
  });

  it("renders 'Kullan' links for each tool", () => {
    render(<Home />);
    
    const useLinks = screen.getAllByText("Kullan");
    expect(useLinks).toHaveLength(5);
  });

  it("has correct hrefs for tool cards", () => {
    render(<Home />);
    
    expect(screen.getByText("QR Kod Oluşturucu").closest("a")).toHaveAttribute("href", "/tools/qr-code");
    expect(screen.getByText("Görsel Sıkıştırıcı").closest("a")).toHaveAttribute("href", "/tools/image-compressor");
    expect(screen.getByText("Şifre Oluşturucu").closest("a")).toHaveAttribute("href", "/tools/password-generator");
    expect(screen.getByText("Base64 Encoder/Decoder").closest("a")).toHaveAttribute("href", "/tools/base64");
    expect(screen.getByText("URL Kısaltıcı").closest("a")).toHaveAttribute("href", "/tools/url-shortener");
  });
});
