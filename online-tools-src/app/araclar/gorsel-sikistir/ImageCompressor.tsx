"use client";

import { useState, useCallback, useRef } from "react";
import { Download, Upload, ImageIcon, X, Check, AlertCircle } from "lucide-react";
import imageCompression from "browser-image-compression";

interface CompressedImage {
  originalFile: File;
  compressedFile: File;
  originalSize: number;
  compressedSize: number;
  originalUrl: string;
  compressedUrl: string;
  compressionRatio: number;
}

const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_FORMATS = ["image/jpeg", "image/png", "image/webp"];

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function ImageCompressor() {
  const [compressedImage, setCompressedImage] = useState<CompressedImage | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState("");
  const [quality, setQuality] = useState(0.8);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_FORMATS.includes(file.type)) {
      return "Sadece JPG, PNG ve WebP formatları desteklenir.";
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return `Dosya boyutu ${MAX_FILE_SIZE_MB}MB'dan küçük olmalıdır.`;
    }
    return null;
  };

  const compressImage = useCallback(async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsCompressing(true);
    setError("");

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: quality,
        fileType: file.type,
      };

      const compressedFile = await imageCompression(file, options);

      const originalUrl = URL.createObjectURL(file);
      const compressedUrl = URL.createObjectURL(compressedFile);

      const compressionRatio = ((file.size - compressedFile.size) / file.size) * 100;

      setCompressedImage({
        originalFile: file,
        compressedFile,
        originalSize: file.size,
        compressedSize: compressedFile.size,
        originalUrl,
        compressedUrl,
        compressionRatio,
      });
    } catch {
      setError("Görsel sıkıştırılırken bir hata oluştu.");
    } finally {
      setIsCompressing(false);
    }
  }, [quality]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      compressImage(file);
    }
  }, [compressImage]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      compressImage(file);
    }
  }, [compressImage]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleQualityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuality = parseFloat(e.target.value);
    setQuality(newQuality);
    if (compressedImage?.originalFile) {
      compressImage(compressedImage.originalFile);
    }
  }, [compressedImage?.originalFile, compressImage]);

  const downloadCompressed = () => {
    if (!compressedImage) return;

    const link = document.createElement("a");
    link.href = compressedImage.compressedUrl;
    link.download = `compressed-${compressedImage.originalFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearImage = () => {
    if (compressedImage) {
      URL.revokeObjectURL(compressedImage.originalUrl);
      URL.revokeObjectURL(compressedImage.compressedUrl);
    }
    setCompressedImage(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
          >
            <ImageIcon className="w-6 h-6 text-blue-600" />
            <span className="font-semibold text-lg">Online Araçlar</span>
          </a>
          <nav className="hidden sm:flex items-center gap-6">
            <a
              href="/"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Ana Sayfa
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Title */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 mb-4">
            <ImageIcon className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Görsel Sıkıştırıcı
          </h1>
          <p className="text-slate-600 max-w-lg mx-auto">
            JPG, PNG ve WebP görsellerini kalite kaybı olmadan sıkıştırın. 
            Dosya boyutunu küçültün, web sitenizi hızlandırın.
          </p>
        </div>

        {/* Upload Area */}
        {!compressedImage && (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`
              relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer
              ${isDragging 
                ? "border-blue-500 bg-blue-50" 
                : "border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50"
              }
            `}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <Upload className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Görsel Yükleyin
            </h3>
            <p className="text-slate-500 mb-4">
              Dosyayı buraya sürükleyin veya seçmek için tıklayın
            </p>
            <p className="text-sm text-slate-400">
              JPG, PNG, WebP · Max {MAX_FILE_SIZE_MB}MB
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isCompressing && (
          <div className="mt-6 p-8 bg-white rounded-2xl border border-slate-200 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-3 border-slate-200 border-t-blue-500 animate-spin mb-4" />
            <p className="text-slate-600">Görsel sıkıştırılıyor...</p>
          </div>
        )}

        {/* Results */}
        {compressedImage && !isCompressing && (
          <div className="mt-6 space-y-6">
            {/* Quality Slider */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <label htmlFor="quality" className="text-sm font-medium text-slate-700">
                  Sıkıştırma Kalitesi
                </label>
                <span className="text-sm font-semibold text-slate-900">
                  {Math.round(quality * 100)}%
                </span>
              </div>
              <input
                id="quality"
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={quality}
                onChange={handleQualityChange}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between mt-2 text-xs text-slate-500">
                <span>Daha küçük dosya</span>
                <span>Daha iyi kalite</span>
              </div>
            </div>

            {/* Comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Original */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-slate-700">Orijinal</h3>
                  <span className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-600">
                    {formatBytes(compressedImage.originalSize)}
                  </span>
                </div>
                <div className="aspect-square bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={compressedImage.originalUrl}
                    alt="Orijinal görsel"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Compressed */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-slate-700">Sıkıştırılmış</h3>
                  <span className="text-xs px-2 py-1 bg-green-100 rounded-full text-green-700">
                    {formatBytes(compressedImage.compressedSize)}
                  </span>
                </div>
                <div className="aspect-square bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={compressedImage.compressedUrl}
                    alt="Sıkıştırılmış görsel"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Orijinal</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {formatBytes(compressedImage.originalSize)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Sıkıştırılmış</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {formatBytes(compressedImage.compressedSize)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Tasarruf</p>
                  <p className="text-lg font-semibold text-green-600">
                    %{compressedImage.compressionRatio.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={downloadCompressed}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all cursor-pointer active:scale-[0.98]"
              >
                <Download className="w-5 h-5" />
                Sıkıştırılmış Görseli İndir
              </button>
              <button
                onClick={clearImage}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-medium transition-all cursor-pointer active:scale-[0.98]"
              >
                <X className="w-5 h-5" />
                Yeni Görsel
              </button>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Gizlilik</h3>
            <p className="text-sm text-slate-600">
              Görselleriniz tarayıcınızda işlenir. Hiçbir veri sunucularımıza yüklenmez.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Hızlı</h3>
            <p className="text-sm text-slate-600">
              Web Worker teknolojisi ile arka planda sıkıştırma. Sayfa donmaz.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Kaliteli</h3>
            <p className="text-sm text-slate-600">
              Akıllı algoritmalar ile en iyi kalite/boyut oranı. Görsel kalitesi korunur.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © 2024 Online Araçlar. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="/hakkimizda"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Hakkımızda
              </a>
              <a
                href="/iletisim"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                İletişim
              </a>
              <a
                href="/gizlilik"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Gizlilik
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
