import { render, screen } from "@testing-library/react";
import ContactPage from "./page";

describe("Contact Page (/iletisim)", () => {
  it("renders the page heading", () => {
    render(<ContactPage />);
    expect(screen.getByText("İletişim")).toBeInTheDocument();
  });

  it("renders the form description", () => {
    render(<ContactPage />);
    expect(screen.getByText(/Sorularınız, önerileriniz veya geri bildirimleriniz mi var/)).toBeInTheDocument();
  });

  it("renders name input field", () => {
    render(<ContactPage />);
    expect(screen.getByLabelText("Adınız")).toBeInTheDocument();
  });

  it("renders email input field", () => {
    render(<ContactPage />);
    expect(screen.getByLabelText("E-posta Adresiniz")).toBeInTheDocument();
  });

  it("renders subject input field", () => {
    render(<ContactPage />);
    expect(screen.getByLabelText("Konu")).toBeInTheDocument();
  });

  it("renders message textarea field", () => {
    render(<ContactPage />);
    expect(screen.getByLabelText("Mesajınız")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ContactPage />);
    expect(screen.getByRole("button", { name: "Gönder" })).toBeInTheDocument();
  });

  it("renders alternative contact section", () => {
    render(<ContactPage />);
    expect(screen.getByText("Diğer İletişim Kanalları")).toBeInTheDocument();
  });

  it("has required attributes on form fields", () => {
    render(<ContactPage />);
    
    expect(screen.getByLabelText("Adınız")).toHaveAttribute("required");
    expect(screen.getByLabelText("E-posta Adresiniz")).toHaveAttribute("required");
    expect(screen.getByLabelText("Konu")).toHaveAttribute("required");
    expect(screen.getByLabelText("Mesajınız")).toHaveAttribute("required");
  });
});
