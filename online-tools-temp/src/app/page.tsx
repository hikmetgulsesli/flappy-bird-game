import type { Metadata } from "next";
import Link from "next/link";
import { 
  QrCode, 
  Image as ImageIcon, 
  Key, 
  Code2, 
  Link as LinkIcon,
  ArrowRight 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Online Tools - Ücretsiz Web Araçları",
  description: "QR Kod Oluşturucu, Görsel Sıkıştırıcı, Şifre Oluşturucu, Base64 Encoder/Decoder, URL Kısaltıcı. Ücretsiz kullanışlı web araçları.",
};

const tools = [
  {
    id: "qr-code",
    title: "QR Kod Oluşturucu",
    description: "Metin, URL veya diğer veriler için özelleştirilebilir QR kodları oluşturun.",
    icon: QrCode,
    href: "/tools/qr-code",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    id: "image-compressor",
    title: "Görsel Sıkıştırıcı",
    description: "Görsellerinizi kalite kaybı olmadan sıkıştırın ve optimize edin.",
    icon: ImageIcon,
    href: "/tools/image-compressor",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    id: "password-generator",
    title: "Şifre Oluşturucu",
    description: "Güçlü ve güvenli rastgele şifreler oluşturun.",
    icon: Key,
    href: "/tools/password-generator",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    id: "base64",
    title: "Base64 Encoder/Decoder",
    description: "Metinleri Base64 formatına dönüştürün veya çözün.",
    icon: Code2,
    href: "/tools/base64",
    color: "bg-violet-500/10 text-violet-600",
  },
  {
    id: "url-shortener",
    title: "URL Kısaltıcı",
    description: "Uzun URL'leri kısa ve paylaşılabilir bağlantılara dönüştürün.",
    icon: LinkIcon,
    href: "/tools/url-shortener",
    color: "bg-rose-500/10 text-rose-600",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Ücretsiz Online Araçlar
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Günlük işlerinizi kolaylaştıran kullanışlı web araçları. 
              QR kod oluşturucu, görsel sıkıştırıcı, şifre oluşturucu ve daha fazlası.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight mb-4">
              Tüm Araçlar
            </h2>
            <p className="text-muted-foreground">
              İhtiyacınız olan aracı seçin ve hemen kullanmaya başlayın.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="group relative flex flex-col p-6 bg-card border border-border rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                >
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${tool.color} mb-4 transition-transform group-hover:scale-105`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {tool.description}
                  </p>
                  <div className="flex items-center text-sm font-medium text-primary">
                    Kullan
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
