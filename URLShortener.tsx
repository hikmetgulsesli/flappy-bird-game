"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  Link2,
  Copy,
  Check,
  ExternalLink,
  Trash2,
  History,
  AlertCircle,
} from "lucide-react";

interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: number;
  clickCount: number;
}

const STORAGE_KEY = "url-shortener-history";
const MAX_HISTORY = 20;

function generateShortCode(): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
}

export function URLShortener() {
  const [inputUrl, setInputUrl] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);
  const [currentShortUrl, setCurrentShortUrl] = useState<ShortenedUrl | null>(
    null
  );
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setShortenedUrls(parsed);
      }
    } catch {
      // Silently fail if localStorage is not available
    }
  }, []);

  // Save history to localStorage
  const saveToStorage = useCallback((urls: ShortenedUrl[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
    } catch {
      // Silently fail if localStorage is not available
    }
  }, []);

  const shortenUrl = useCallback(() => {
    setError("");
    setCurrentShortUrl(null);

    const trimmedUrl = inputUrl.trim();

    if (!trimmedUrl) {
      setError("Lütfen bir URL girin");
      return;
    }

    // Add protocol if missing
    let urlToValidate = trimmedUrl;
    if (!urlToValidate.startsWith("http://") && !urlToValidate.startsWith("https://")) {
      urlToValidate = "https://" + urlToValidate;
    }

    if (!isValidUrl(urlToValidate)) {
      setError("Geçersiz URL formatı. Örnek: https://example.com");
      return;
    }

    // Generate short code
    const shortCode = generateShortCode();
    const newShortUrl: ShortenedUrl = {
      id: Date.now().toString(),
      originalUrl: urlToValidate,
      shortCode,
      createdAt: Date.now(),
      clickCount: 0,
    };

    setCurrentShortUrl(newShortUrl);

    // Add to history
    setShortenedUrls((prev) => {
      const updated = [newShortUrl, ...prev].slice(0, MAX_HISTORY);
      saveToStorage(updated);
      return updated;
    });
  }, [inputUrl, saveToStorage]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const deleteUrl = (id: string) => {
    setShortenedUrls((prev) => {
      const updated = prev.filter((url) => url.id !== id);
      saveToStorage(updated);
      return updated;
    });

    if (currentShortUrl?.id === id) {
      setCurrentShortUrl(null);
    }
  };

  const clearHistory = () => {
    setShortenedUrls([]);
    saveToStorage([]);
    setCurrentShortUrl(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      shortenUrl();
    }
  };

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
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
        {/* Page Title */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 mb-4">
            <Link2 className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            URL Kısaltıcı
          </h1>
          <p className="text-slate-600 max-w-lg mx-auto">
            Uzun URL'leri kısa ve paylaşılabilir bağlantılara dönüştürün.
            Geçmişinizi tarayıcınızda saklayın.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <label
            htmlFor="url-input"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Uzun URL
          </label>
          <div className="flex gap-3">
            <input
              id="url-input"
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="https://example.com/uzun-bir-url..."
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-slate-700 placeholder:text-slate-400 transition-all"
            />
            <button
              onClick={shortenUrl}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all cursor-pointer active:scale-[0.98] whitespace-nowrap"
            >
              Kısalt
            </button>
          </div>
          {error && (
            <div className="mt-3 flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Result Section */}
        {currentShortUrl && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Kısaltılmış URL
            </h2>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-500 mb-1">Orijinal URL:</p>
                  <p className="text-sm text-slate-700 truncate">
                    {currentShortUrl.originalUrl}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-500 mb-2">Kısa URL:</p>
                <div className="flex items-center gap-3">
                  <code className="flex-1 px-4 py-3 bg-white rounded-lg border border-slate-200 font-mono text-sm text-slate-800 break-all">
                    {typeof window !== "undefined"
                      ? `${window.location.origin}/s/${currentShortUrl.shortCode}`
                      : `/s/${currentShortUrl.shortCode}`}
                  </code>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        typeof window !== "undefined"
                          ? `${window.location.origin}/s/${currentShortUrl.shortCode}`
                          : `/s/${currentShortUrl.shortCode}`
                      )
                    }
                    className="p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all cursor-pointer active:scale-[0.98]"
                    title="Kopyala"
                  >
                    {copied ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History Section */}
        {shortenedUrls.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <History className="w-5 h-5 text-slate-500" />
                <span className="font-semibold text-slate-900">
                  Geçmiş ({shortenedUrls.length})
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearHistory();
                  }}
                  className="text-sm text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                >
                  Temizle
                </button>
                <span
                  className={`text-slate-400 transition-transform ${
                    showHistory ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
            </button>

            {showHistory && (
              <div className="border-t border-slate-200">
                <div className="divide-y divide-slate-100">
                  {shortenedUrls.map((url) => (
                    <div
                      key={url.id}
                      className="px-6 py-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-500 truncate mb-1">
                            {url.originalUrl}
                          </p>
                          <div className="flex items-center gap-2">
                            <code className="text-sm font-mono text-blue-600">
                              {typeof window !== "undefined"
                                ? `${window.location.origin}/s/${url.shortCode}`
                                : `/s/${url.shortCode}`}
                            </code>
                            <span className="text-xs text-slate-400">
                              • {formatDate(url.createdAt)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              copyToClipboard(
                                typeof window !== "undefined"
                                  ? `${window.location.origin}/s/${url.shortCode}`
                                  : `/s/${url.shortCode}`
                              )
                            }
                            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
                            title="Kopyala"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <a
                            href={url.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
                            title="Orijinali Aç"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => deleteUrl(url.id)}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                            title="Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Güvenli</h3>
            <p className="text-sm text-slate-600">
              Tüm veriler tarayıcınızda saklanır. Hiçbir bilgi sunucularımıza
              gönderilmez.
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Hızlı</h3>
            <p className="text-sm text-slate-600">
              Anında URL kısaltma. Kopyala ve paylaş.
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Geçmiş</h3>
            <p className="text-sm text-slate-600">
              Kısalttığınız URL'leri tarayıcınızda saklayın.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
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
