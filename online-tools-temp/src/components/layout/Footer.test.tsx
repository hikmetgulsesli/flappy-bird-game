import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

// Mock next/link
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe("Footer", () => {
  it("renders the brand name", () => {
    render(<Footer />);
    expect(screen.getByText("Online Tools")).toBeInTheDocument();
  });

  it("renders tool links section", () => {
    render(<Footer />);
    
    expect(screen.getByText("Araçlar")).toBeInTheDocument();
    expect(screen.getByText("QR Kod")).toBeInTheDocument();
    expect(screen.getByText("Görsel Sıkıştırıcı")).toBeInTheDocument();
    expect(screen.getByText("Şifre Oluşturucu")).toBeInTheDocument();
    expect(screen.getByText("Base64")).toBeInTheDocument();
    expect(screen.getByText("URL Kısaltıcı")).toBeInTheDocument();
  });

  it("renders page links section", () => {
    render(<Footer />);
    
    expect(screen.getByText("Sayfalar")).toBeInTheDocument();
    expect(screen.getByText("Hakkımızda")).toBeInTheDocument();
    expect(screen.getByText("İletişim")).toBeInTheDocument();
    expect(screen.getByText("Gizlilik Politikası")).toBeInTheDocument();
  });

  it("renders copyright text with current year", () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear().toString();
    const copyrightText = screen.getByText(new RegExp(currentYear));
    expect(copyrightText).toBeInTheDocument();
  });

  it("has correct hrefs for footer links", () => {
    render(<Footer />);
    
    expect(screen.getByText("Hakkımızda").closest("a")).toHaveAttribute("href", "/hakkimizda");
    expect(screen.getByText("İletişim").closest("a")).toHaveAttribute("href", "/iletisim");
    expect(screen.getByText("Gizlilik Politikası").closest("a")).toHaveAttribute("href", "/gizlilik-politikasi");
  });
});
