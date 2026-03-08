import type { Metadata } from "next";
import { UrlShortener } from "./UrlShortener";

export const metadata: Metadata = {
  title: "URL Kısaltıcı - Ücretsiz Link Kısaltma Aracı",
  description: "Uzun URL'leri kısa ve paylaşılabilir bağlantılara dönüştürün. Ücretsiz, hızlı ve güvenli URL kısaltma aracı. Tüm veriler tarayıcınızda saklanır.",
  keywords: ["URL kısaltıcı", "link kısaltma", "URL shortener", "kısa link", "ücretsiz URL kısaltma"],
  openGraph: {
    title: "URL Kısaltıcı - Ücretsiz Link Kısaltma Aracı",
    description: "Uzun URL'leri kısa ve paylaşılabilir bağlantılara dönüştürün. Ücretsiz ve güvenli.",
    type: "website",
  },
};

export default function UrlKisaltPage() {
  return <UrlShortener />;
}
