import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Online Araçlar",
  description: "Online Araçlar olarak kullanıcı gizliliğini önemsiyoruz. Veri toplama ve kullanım politikalarımız hakkında bilgi edinin.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header currentPath="/gizlilik-politikasi" />

      <main className="flex-1">
        <section className="bg-white border-b border-slate-200 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Gizlilik Politikası
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Kişisel verilerinizin güvenliği bizim için önemlidir.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                1. Veri Toplama
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Online Araçlar olarak, araçlarımızı kullanırken herhangi bir kişisel 
                verinizi toplamıyoruz. Kullandığınız araçlara (QR kod oluşturucu, şifre 
                oluşturucu vb.) girdiğiniz veriler tarayıcınızda işlenir ve herhangi bir 
                sunucuya gönderilmez.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                2. Çerezler (Cookies)
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Sitemiz, temel işlevsellik için gerekli olmayan çerezler kullanmaz. 
                Sitemizde oturum bilgisi veya kullanıcı takibi yapılmamaktadır.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                3. Üçüncü Taraf Hizmetleri
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Sitemizde reklam veya analitik hizmetler için üçüncü taraf 
                izleme kodları bulunmamaktadır. Kullanıcı davranışlarını izlemiyoruz.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                4. Harici Bağlantılar
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Sitemizdeki bazı bağlantılar üçüncü taraf sitelere yönlendirebilir. 
                Bu sitelerin gizlilik politikalarından sorumlu değiliz.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                5. Değişiklikler
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Bu gizlilik politikasını zaman zaman güncelleyebiliriz. 
                Herhangi bir değişiklik olması durumunda bu sayfayı güncelleyeceğiz. 
                Önemli değişiklikler için burayı düzenli olarak kontrol etmenizi öneririz.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                6. İletişim
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Bu gizlilik politikası hakkında sorularınız varsa, lütfen 
                <a href="/iletisim" className="text-blue-600 hover:underline mx-1">
                  iletişim sayfamız
                </a>
                üzerinden bizimle iletişime geçin.
              </p>
            </div>

            <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200 text-center">
              <p className="text-sm text-slate-500">
                Son güncelleme: {new Date().toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
