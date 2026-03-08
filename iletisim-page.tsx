"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "İsim alanı zorunludur";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "E-posta alanı zorunludur";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi girin";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Konu alanı zorunludur";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Mesaj alanı zorunludur";
    } else if (formData.message.length < 10) {
      newErrors.message = "Mesaj en az 10 karakter olmalıdır";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header currentPath="/iletisim" />

      <main className="flex-1">
        <section className="bg-white border-b border-slate-200 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              İletişim
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Sorularınız, önerileriniz veya geri bildirimleriniz için bize ulaşın.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">E-posta</h3>
                      <p className="text-sm text-slate-600">
                        info@onlinearaclar.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Adres</h3>
                      <p className="text-sm text-slate-600">
                        Türkiye
                        <br />
                        Online hizmet vermekteyiz
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                  <h3 className="font-semibold text-slate-900 mb-2">Yanıt Süresi</h3>
                  <p className="text-sm text-slate-600">
                    Mesajlarınıza genellikle 24-48 saat içinde yanıt veriyoruz.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-8 border border-slate-200">
                  {submitted ? (
                    <div className="text-center py-12" data-testid="success-message">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-slate-900 mb-2">
                        Mesajınız Gönderildi!
                      </h2>
                      <p className="text-slate-600 mb-6">
                        Mesajınız için teşekkür ederiz. En kısa sürede size dönüş yapacağız.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors cursor-pointer"
                      >
                        Yeni Mesaj Gönder
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                            İsim *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              errors.name ? "border-red-300" : "border-slate-300"
                            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            placeholder="Adınız Soyadınız"
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-600" data-testid="name-error">{errors.name}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                            E-posta *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              errors.email ? "border-red-300" : "border-slate-300"
                            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            placeholder="ornek@email.com"
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600" data-testid="email-error">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                          Konu *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.subject ? "border-red-300" : "border-slate-300"
                          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        >
                          <option value="">Konu seçin</option>
                          <option value="general">Genel Soru</option>
                          <option value="bug">Hata Bildirimi</option>
                          <option value="feature">Özellik Önerisi</option>
                          <option value="business">İş Birliği</option>
                          <option value="other">Diğer</option>
                        </select>
                        {errors.subject && (
                          <p className="mt-1 text-sm text-red-600" data-testid="subject-error">{errors.subject}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                          Mesaj *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.message ? "border-red-300" : "border-slate-300"
                          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
                          placeholder="Mesajınızı buraya yazın..."
                        />
                        {errors.message && (
                          <p className="mt-1 text-sm text-red-600" data-testid="message-error">{errors.message}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors cursor-pointer active:scale-[0.98]"
                      >
                        <Send className="w-4 h-4" />
                        Mesaj Gönder
                      </button>
                    </form>
                  )}
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
