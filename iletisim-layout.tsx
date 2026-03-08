import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim | Online Araçlar",
  description: "Online Araçlar ekibiyle iletişime geçin. Sorularınız, önerileriniz veya geri bildirimleriniz için bize ulaşabilirsiniz.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
