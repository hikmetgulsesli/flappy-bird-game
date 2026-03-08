import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası - Online Tools",
  description: "Online Tools gizlilik politikası. Kullanıcı verilerinizin nasıl işlendiği ve korunduğu hakkında bilgi.",
};

export default function PrivacyPage() {
  const currentDate = new Date().toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Gizlilik Politikası
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Son güncelleme: {currentDate}
        </p>

        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground mb-6">
            Online Tools olarak, kullanıcılarımızın gizliliğine büyük önem veriyoruz. 
            Bu gizlilik politikası, web sitemizi kullandığınızda hangi bilgilerin toplandığını, 
            nasıl kullanıldığını ve korunduğunu açıklar.
          </p>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-4">1. Toplanan Bilgiler</h2>
          <p className="text-muted-foreground mb-4">
            <strong className="text-foreground">İşlem verileri:</strong> Araçlarımızı kullandığınızda, 
            işlediğiniz veriler (örneğin QR kod için girilen metin, sıkıştırılan görseller) 
            tarayıcınızda yerel olarak işlenir ve sunucularımıza gönderilmez.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong className="text-foreground">Kullanım verileri:</strong> Web sitemizin 
            kullanımıyla ilgili anonim istatistikler (sayfa görüntüleme, ziyaret süresi vb.) 
            toplayabiliriz. Bu veriler kimliğinizi belirleyemez.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong className="text-foreground">Çerezler:</strong> Web sitemiz, 
            kullanıcı deneyimini iyileştirmek için çerezler kullanabilir. 
            Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz.
          </p>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-4">2. Bilgilerin Kullanımı</h2>
          <p className="text-muted-foreground mb-4">Toplanan bilgiler şu amaçlarla kullanılabilir:</p>
          <ul className="space-y-2 text-muted-foreground mb-6">
            <li>Web sitemizin işlevselliğini sağlamak</li>
            <li>Kullanıcı deneyimini iyileştirmek</li>
            <li>Teknik sorunları teşhis etmek ve çözmek</li>
            <li>Site kullanımını analiz etmek</li>
          </ul>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-4">3. Veri Güvenliği</h2>
          <p className="text-muted-foreground mb-6">
            Kullanıcı verilerinin güvenliği bizim için önceliklidir. Tüm araçlarımız 
            tarayıcı tabanlıdır ve hassas verilerinizi işlemek için sunucularımızı kullanmaz. 
            Bu sayede verileriniz cihazınızda kalır ve üçüncü taraflarla paylaşılmaz.
          </p>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-4">4. Üçüncü Taraf Hizmetleri</h2>
          <p className="text-muted-foreground mb-6">
            Web sitemiz, analiz ve reklam amaçlarıyla üçüncü taraf hizmetler 
            (örneğin Google AdSense, Google Analytics) kullanabilir. Bu hizmetlerin 
            kendi gizlilik politikaları bulunmaktadır.
          </p>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-4">5. Haklarınız</h2>
          <p className="text-muted-foreground mb-4">Kullanıcı olarak şu haklara sahipsiniz:</p>
          <ul className="space-y-2 text-muted-foreground mb-6">
            <li>Kişisel verilerinize erişim talep etme</li>
            <li>Yanlış verilerin düzeltilmesini isteme</li>
            <li>Verilerinizin silinmesini talep etme</li>
            <li>Veri işlemeye itiraz etme</li>
          </ul>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-4">6. Değişiklikler</h2>
          <p className="text-muted-foreground mb-6">
            Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler 
            olduğunda bu sayfada bildirim yapılacaktır.
          </p>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-4">7. İletişim</h2>
          <p className="text-muted-foreground">
            Gizlilik politikamız hakkında sorularınız varsa, <a href="/iletisim" className="text-primary hover:underline">İletişim</a>{" "}
            sayfamızdan bize ulaşabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
