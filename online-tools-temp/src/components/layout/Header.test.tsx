import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

// Mock next/link
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe("Header", () => {
  it("renders the logo and brand name", () => {
    render(<Header />);
    expect(screen.getByText("Online Tools")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(<Header />);
    
    expect(screen.getByText("Ana Sayfa")).toBeInTheDocument();
    expect(screen.getByText("Hakkımızda")).toBeInTheDocument();
    expect(screen.getByText("İletişim")).toBeInTheDocument();
    expect(screen.getByText("Gizlilik")).toBeInTheDocument();
  });

  it("has correct hrefs for navigation links", () => {
    render(<Header />);
    
    expect(screen.getByText("Ana Sayfa").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Hakkımızda").closest("a")).toHaveAttribute("href", "/hakkimizda");
    expect(screen.getByText("İletişim").closest("a")).toHaveAttribute("href", "/iletisim");
    expect(screen.getByText("Gizlilik").closest("a")).toHaveAttribute("href", "/gizlilik-politikasi");
  });

  it("renders mobile menu button", () => {
    render(<Header />);
    
    const menuButton = screen.getByLabelText("Menüyü aç");
    expect(menuButton).toBeInTheDocument();
  });
});
