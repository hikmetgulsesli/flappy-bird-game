import Link from "next/link";

const tools = [
  { id: "qr-kod", name: "QR Kod Oluşturucu", href: "/araclar/qr-kod" },
  { id: "gorsel-sikistirma", name: "Görsel Sıkıştırma", href: "#" },
  { id: "sifre-olusturucu", name: "Şifre Oluşturucu", href: "#" },
];

const corporateLinks = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
  { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200" data-testid="footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">OA</span>
              </div>
              <span className="font-semibold">Online Araçlar</span>
            </div>
            <p className="text-sm text-slate-600">
              Günlük ihtiyaçlarınız için ücretsiz web araçları.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Araçlar</h4>
            <ul className="space-y-2">
              {tools.map((tool) => (
                <li key={tool.id}>
                  <Link
                    href={tool.href}
                    className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Kurumsal</h4>
            <ul className="space-y-2">
              {corporateLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">İletişim</h4>
            <p className="text-sm text-slate-600">
              Sorularınız veya önerileriniz için bize ulaşın.
            </p>
            <Link
              href="/iletisim"
              className="inline-block mt-3 text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              Bize Yazın →
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Online Araçlar. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
