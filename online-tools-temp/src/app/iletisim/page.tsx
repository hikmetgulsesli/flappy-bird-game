import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim - Online Tools",
  description: "Online Tools ile iletişime geçin. Sorularınız, önerileriniz ve geri bildirimleriniz için bize ulaşın.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4">
          İletişim
        </h1>
        <p className="text-muted-foreground mb-8">
          Sorularınız, önerileriniz veya geri bildirimleriniz mi var? 
          Aşağıdaki formu kullanarak bize ulaşabilirsiniz.
        </p>

        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Adınız
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Adınızı girin"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                E-posta Adresiniz
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="ornek@email.com"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Konu
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Mesajınızın konusu"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Mesajınız
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Mesajınızı buraya yazın..."
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 active:scale-[0.98] transition-all cursor-pointer"
          >
            Gönder
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="font-heading text-lg font-semibold mb-4">Diğer İletişim Kanalları</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              <strong className="text-foreground">E-posta:</strong>{" "}
              contact@onlinetools.example.com
            </p>
            <p className="text-sm">
              Not: Bu bir demo formudur. Gerçek bir iletişim formu için backend entegrasyonu gereklidir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
