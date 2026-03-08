import type { Metadata } from "next";
import { ImageCompressor } from "./ImageCompressor";

export const metadata: Metadata = {
  title: "Görsel Sıkıştırıcı - Ücretsiz Image Compressor",
  description: "JPG, PNG ve WebP görsellerini kalite kaybı olmadan sıkıştırın. Dosya boyutunu küçültün, web sitenizi hızlandırın. Ücretsiz ve tamamen tarayıcıda çalışır.",
  keywords: ["görsel sıkıştırıcı", "image compressor", "jpg sıkıştırma", "png optimize", "web optimize", "fotoğraf küçültme"],
  openGraph: {
    title: "Görsel Sıkıştırıcı - Ücretsiz Image Compressor",
    description: "JPG, PNG ve WebP görsellerini kalite kaybı olmadan sıkıştırın.",
    type: "website",
  },
};

export default function GorselSikistirPage() {
  return <ImageCompressor />;
}
