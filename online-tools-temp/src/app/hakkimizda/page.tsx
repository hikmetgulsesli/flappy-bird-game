import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda - Online Tools",
  description: "Online Tools hakkında bilgi edinin. Ücretsiz web araçları platformumuzun misyonu ve hikayesi.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-8">
          Hakkımızda
        </h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-muted-foreground mb-6">
            Online Tools, günlük dijital işlemlerinizi kolaylaştırmak için tasarlanmış 
            ücretsiz bir web araçları platformudur. Amacımız, kullanıcılarımıza pratik, 
            hızlı ve güvenilir çözümler sunmaktır.
          </p>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-4">Misyonumuz</h2>
          <p className="text-muted-foreground mb-6">
            Teknolojiyi herkes için erişilebilir kılmak ve dijital araçların karmaşıklığını 
            ortadan kaldırmak. Kullanıcı dostu arayüzlerle, herkesin kolayca kullanabileceği 
            araçlar geliştiriyoruz.
          </p>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-4">Neden Biz?</h2>
          <ul className="space-y-3 text-muted-foreground mb-6">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Tamamen ücretsiz ve reklam dostu deneyim</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Kullanıcı verilerini işlemeyen, gizlilik odaklı yaklaşım</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Mobil uyumlu ve modern tasarım</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Sürekli güncellenen ve geliştirilen araçlar</span>
            </li>
          </ul>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-4">Sunduğumuz Araçlar</h2>
          <p className="text-muted-foreground mb-6">
            Platformumuzda QR kod oluşturucu, görsel sıkıştırıcı, şifre oluşturucu, 
            Base64 encoder/decoder ve URL kısaltıcı gibi çeşitli araçlar bulunmaktadır. 
            Tüm araçlarımız tarayıcınızda çalışır ve verilerinizi sunucularımıza göndermez.
          </p>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-4">İletişim</h2>
          <p className="text-muted-foreground">
            Sorularınız, önerileriniz veya geri bildirimleriniz için 
            İletişim sayfamızdan bize ulaşabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
