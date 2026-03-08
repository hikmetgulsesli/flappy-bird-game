import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Hakkımızda | Online Araçlar",
  description: "Online Araçlar olarak günlük ihtiyaçlarınız için ücretsiz ve kullanışlı web araçları sunuyoruz. Misyonumuz ve değerlerimiz hakkında bilgi edinin.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header currentPath="/hakkimizda" />

      <main className="flex-1">
        <section className="bg-white border-b border-slate-200 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Hakkımızda
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Günlük dijital ihtiyaçlarınızı kolaylaştıran ücretsiz araçlar geliştiriyoruz.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Misyonumuz</h2>
              <p className="text-slate-600 leading-relaxed">
                Online Araçlar olarak amacımız, herkesin kolayca erişebileceği, 
                kullanımı basit ve tamamen ücretsiz web araçları sunmak. Teknolojinin 
                karmaşıklığını ortadan kaldırarak, günlük dijital görevlerinizi hızlı 
                ve verimli bir şekilde tamamlamanıza yardımcı oluyoruz.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Değerlerimiz</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-slate-900 mb-2">Basitlik</h3>
                  <p className="text-sm text-slate-600">
                    Karmaşık arayüzler yerine, anlaşılır ve kullanıcı dostu tasarımlar.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 mb-2">Gizlilik</h3>
                  <p className="text-sm text-slate-600">
                    Verileriniz bizim için değerli. Hiçbir kişisel veriyi saklamıyoruz.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 mb-2">Hız</h3>
                  <p className="text-sm text-slate-600">
                    Kayıt olmadan, anında kullanıma hazır araçlar.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 mb-2">Erişilebilirlik</h3>
                  <p className="text-sm text-slate-600">
                    Tüm araçlarımız ücretsiz ve herkes için açık.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
