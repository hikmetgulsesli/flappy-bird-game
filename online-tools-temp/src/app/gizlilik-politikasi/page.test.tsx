import { render, screen } from "@testing-library/react";
import PrivacyPage from "./page";

describe("Privacy Page (/gizlilik-politikasi)", () => {
  it("renders the page heading", () => {
    render(<PrivacyPage />);
    expect(screen.getByText("Gizlilik Politikası")).toBeInTheDocument();
  });

  it("renders last update text", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/Son güncelleme:/)).toBeInTheDocument();
  });

  it("renders collected information section", () => {
    render(<PrivacyPage />);
    expect(screen.getByText("1. Toplanan Bilgiler")).toBeInTheDocument();
  });

  it("renders data usage section", () => {
    render(<PrivacyPage />);
    expect(screen.getByText("2. Bilgilerin Kullanımı")).toBeInTheDocument();
  });

  it("renders data security section", () => {
    render(<PrivacyPage />);
    expect(screen.getByText("3. Veri Güvenliği")).toBeInTheDocument();
  });

  it("renders third party services section", () => {
    render(<PrivacyPage />);
    expect(screen.getByText("4. Üçüncü Taraf Hizmetleri")).toBeInTheDocument();
  });

  it("renders user rights section", () => {
    render(<PrivacyPage />);
    expect(screen.getByText("5. Haklarınız")).toBeInTheDocument();
  });

  it("renders changes section", () => {
    render(<PrivacyPage />);
    expect(screen.getByText("6. Değişiklikler")).toBeInTheDocument();
  });

  it("renders contact section", () => {
    render(<PrivacyPage />);
    expect(screen.getByText("7. İletişim")).toBeInTheDocument();
  });

  it("renders main description", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/kullanıcılarımızın gizliliğine büyük önem veriyoruz/)).toBeInTheDocument();
  });
});
