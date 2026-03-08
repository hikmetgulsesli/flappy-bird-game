import { render, screen } from "@testing-library/react";
import AboutPage from "./page";

describe("About Page (/hakkimizda)", () => {
  it("renders the page heading", () => {
    render(<AboutPage />);
    expect(screen.getByText("Hakkımızda")).toBeInTheDocument();
  });

  it("renders mission section", () => {
    render(<AboutPage />);
    expect(screen.getByText("Misyonumuz")).toBeInTheDocument();
  });

  it("renders why us section", () => {
    render(<AboutPage />);
    expect(screen.getByText("Neden Biz?")).toBeInTheDocument();
  });

  it("renders tools section", () => {
    render(<AboutPage />);
    expect(screen.getByText("Sunduğumuz Araçlar")).toBeInTheDocument();
  });

  it("renders contact section", () => {
    render(<AboutPage />);
    expect(screen.getByText("İletişim")).toBeInTheDocument();
  });

  it("renders description text", () => {
    render(<AboutPage />);
    expect(screen.getByText(/günlük dijital işlemlerinizi kolaylaştırmak/)).toBeInTheDocument();
  });

  it("renders list items", () => {
    render(<AboutPage />);
    expect(screen.getByText(/Tamamen ücretsiz/)).toBeInTheDocument();
    expect(screen.getByText(/Kullanıcı verilerini işlemeyen/)).toBeInTheDocument();
    expect(screen.getByText(/Mobil uyumlu/)).toBeInTheDocument();
  });
});
