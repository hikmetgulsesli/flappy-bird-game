"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Link2, Copy, Check, Trash2, ExternalLink, Clock, Hash } from "lucide-react";

interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: number;
  clicks: number;
}

const generateShortCode = (): string => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
};

const STORAGE_KEY = "url-shortener-history";

export function UrlShortener() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setShortenedUrls(parsed);
        } catch {
          // Invalid JSON, ignore
        }
      }
    }
  }, []);

  // Save to localStorage when shortenedUrls changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(shortenedUrls));
    }
  }, [shortenedUrls]);

  const shortenUrl = useCallback(async () => {
    setError("");
    
    if (!url.trim()) {
      setError("Lütfen bir URL girin");
      return;
    }

    // Add protocol if missing
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
      normalizedUrl = "https://" + normalizedUrl;
    }

    if (!isValidUrl(normalizedUrl)) {
      setError("Geçerli bir URL girin (örn: https://example.com)");
      return;
    }

    setIsLoading(true);

    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));

    const shortCode = generateShortCode();
    const newUrl: ShortenedUrl = {
      id: Date.now().toString(),
      originalUrl: normalizedUrl,
      shortCode,
      createdAt: Date.now(),
      clicks: 0,
    };

    setShortenedUrls(prev => [newUrl, ...prev]);
    setUrl("");
    setIsLoading(false);
  }, [url]);

  const copyToClipboard = async (shortUrl: string, id: string) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const deleteUrl = (id: string) => {
    setShortenedUrls(prev => prev.filter(u => u.id !== id));
  };

  const clearHistory = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
    setShortenedUrls([]);
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getShortUrl = (code: string): string => {
    // In a real app, this would be your domain
    return `${typeof window !== "undefined" ? window.location.origin : ""}/s/${code}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      shortenUrl();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
          >
            <Link2 className="w-6 h-6 text-blue-600" />
            <span className="font-semibold text-lg">Online Araçlar</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Ana Sayfa
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 mb-4">
            <Link2 className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            URL Kısaltıcı
          </h1>
          <p className="text-slate-600 max-w-lg mx-auto">
            Uzun URL&apos;leri kısa ve paylaşılabilir bağlantılara dönüştürün.
            Tüm veriler tarayıcınızda saklanır.
          </p>
        </div>

        {/* URL Input Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="https://example.com/uzun-url-adresi..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled={isLoading}
              />
            </div>
            <button
              onClick={shortenUrl}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-all cursor-pointer active:scale-[0.98] whitespace-nowrap flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Kısaltılıyor...
                </>
              ) : (
                <>
                  <Link2 className="w-5 h-5" />
                  Kısalt
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <Hash className="w-4 h-4" />
            <span>Protokol (https://) otomatik eklenir</span>
          </div>
        </div>

        {/* Shortened URLs List */}
        {shortenedUrls.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Kısaltılmış URL&apos;ler
              </h2>
              <button
                onClick={clearHistory}
                className="text-sm text-red-600 hover:text-red-700 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Temizle
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {shortenedUrls.map((item) => {
                const shortUrl = getShortUrl(item.shortCode);
                const isCopied = copiedId === item.id;

                return (
                  <div key={item.id} className="p-4 sm:p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col gap-3">
                      {/* Original URL */}
                      <div className="flex items-start gap-2">
                        <ExternalLink className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                        <a
                          href={item.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-slate-600 hover:text-slate-900 transition-colors truncate"
                          title={item.originalUrl}
                        >
                          {item.originalUrl}
                        </a>
                      </div>

                      {/* Short URL and Actions */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex-1 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2.5">
                          <code className="text-blue-700 font-mono text-sm">
                            {shortUrl}
                          </code>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyToClipboard(shortUrl, item.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                              isCopied
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-4 h-4" />
                                Kopyalandı
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                Kopyala
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => deleteUrl(item.id)}
                            className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                            title="Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Meta info */}
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(item.createdAt)}
                        </span>
                        <span>Kod: {item.shortCode}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {shortenedUrls.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 mb-4">
              <Link2 className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">
              Henüz URL kısaltılmadı
            </h3>
            <p className="text-sm text-slate-600">
              Yukarıdaki alana bir URL girerek kısaltmaya başlayın.
            </p>
          </div>
        )}

        {/* Info Cards */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Güvenli</h3>
            <p className="text-sm text-slate-600">
              Tüm veriler tarayıcınızda saklanır. URL&apos;leriniz sunucularımıza gönderilmez.
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Kolay Paylaşım</h3>
            <p className="text-sm text-slate-600">
              Tek tıklamayla kısa URL&apos;yi kopyalayın ve istediğiniz yerde paylaşın.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © 2024 Online Araçlar. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/hakkimizda"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Hakkımızda
              </Link>
              <Link
                href="/iletisim"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                İletişim
              </Link>
              <Link
                href="/gizlilik"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Gizlilik
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
