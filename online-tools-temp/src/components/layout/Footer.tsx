import Link from "next/link";

const footerLinks = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
  { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
];

const toolLinks = [
  { href: "/tools/qr-code", label: "QR Kod" },
  { href: "/tools/image-compressor", label: "Görsel Sıkıştırıcı" },
  { href: "/tools/password-generator", label: "Şifre Oluşturucu" },
  { href: "/tools/base64", label: "Base64" },
  { href: "/tools/url-shortener", label: "URL Kısaltıcı" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">Online Tools</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Ücretsiz ve kullanışlı web araçları platformu. QR kod, görsel sıkıştırma, şifre oluşturma ve daha fazlası.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">Araçlar</h4>
            <ul className="space-y-2">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">Sayfalar</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} Online Tools. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
