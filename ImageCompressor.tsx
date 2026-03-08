"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, Download, Image as ImageIcon, X, Loader2 } from "lucide-react";
import imageCompression from "browser-image-compression";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface CompressedImage {
  originalFile: File;
  originalUrl: string;
  originalSize: number;
  compressedUrl: string;
  compressedSize: number;
  compressedFile: File;
}

export default function ImageCompressorPage() {
  const [compressedImage, setCompressedImage] = useState<CompressedImage | null>(null);
  const [quality, setQuality] = useState(80);
  const [isCompressing, setIsCompressing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const calculateCompressionRatio = (original: number, compressed: number): number => {
    return Math.round(((original - compressed) / original) * 100);
  };

  const compressImage = async (file: File): Promise<CompressedImage> => {
    const options = {
      maxSizeMB: 10,
      maxWidthOrHeight: 4096,
      useWebWorker: true,
      initialQuality: quality / 100,
    };

    const compressedFile = await imageCompression(file, options);
    const originalUrl = URL.createObjectURL(file);
    const compressedUrl = URL.createObjectURL(compressedFile);

    return {
      originalFile: file,
      originalUrl,
      originalSize: file.size,
      compressedUrl,
      compressedSize: compressedFile.size,
      compressedFile,
    };
  };

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Lütfen bir görsel dosyası seçin.");
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Desteklenen formatlar: JPG, PNG, WebP");
      return;
    }

    setIsCompressing(true);
    try {
      const result = await compressImage(file);
      setCompressedImage(result);
    } catch (error) {
      console.error("Compression error:", error);
      alert("Görsel sıkıştırılırken bir hata oluştu.");
    } finally {
      setIsCompressing(false);
    }
  }, [quality]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  const handleQualityChange = useCallback(async () => {
    if (compressedImage) {
      setIsCompressing(true);
      try {
        const result = await compressImage(compressedImage.originalFile);
        setCompressedImage(result);
      } catch (error) {
        console.error("Recompression error:", error);
      } finally {
        setIsCompressing(false);
      }
    }
  }, [compressedImage, quality]);

  const handleDownload = useCallback(() => {
    if (!compressedImage) return;

    const link = document.createElement("a");
    link.href = compressedImage.compressedUrl;
    link.download = `compressed-${compressedImage.originalFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [compressedImage]);

  const handleReset = useCallback(() => {
    if (compressedImage) {
      URL.revokeObjectURL(compressedImage.originalUrl);
      URL.revokeObjectURL(compressedImage.compressedUrl);
    }
    setCompressedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [compressedImage]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header currentPath="/araclar/gorsel-sikistir" />

      <main className="flex-1">
        <section className="bg-white border-b border-slate-200 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Görsel Sıkıştırma
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Görsellerinizi kalite kaybı olmadan sıkıştırın. JPG, PNG ve WebP formatlarını destekler.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              {!compressedImage ? (
                <div
                  className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-colors cursor-pointer ${
                    dragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-300 hover:border-slate-400"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  data-testid="drop-zone"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {isCompressing ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                      <p className="text-slate-600">Görsel sıkıştırılıyor...</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-900 font-medium mb-2">
                        Görseli buraya sürükleyin veya tıklayarak seçin
                      </p>
                      <p className="text-sm text-slate-500">
                        Desteklenen formatlar: JPG, PNG, WebP
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Quality Slider */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label htmlFor="quality" className="text-sm font-medium text-slate-700">
                        Kalite: %{quality}
                      </label>
                      <span className="text-sm text-slate-500">
                        Daha düşük kalite = daha küçük dosya
                      </span>
                    </div>
                    <input
                      type="range"
                      id="quality"
                      min="10"
                      max="100"
                      step="5"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      onMouseUp={handleQualityChange}
                      onTouchEnd={handleQualityChange}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      data-testid="quality-slider"
                    />
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>En düşük</span>
                      <span>En yüksek</span>
                    </div>
                  </div>

                  {/* Image Preview */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-700">Orijinal</p>
                      <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                        <img
                          src={compressedImage.originalUrl}
                          alt="Original"
                          className="w-full h-auto max-h-64 object-contain"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 px-2">
                          {compressedImage.originalFile.name}
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 text-center">
                        {formatFileSize(compressedImage.originalSize)}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-700">Sıkıştırılmış</p>
                      <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                        {isCompressing ? (
                          <div className="h-48 flex items-center justify-center">
                            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                          </div>
                        ) : (
                          <img
                            src={compressedImage.compressedUrl}
                            alt="Compressed"
                            className="w-full h-auto max-h-64 object-contain"
                          />
                        )}
                      </div>
                      <p className="text-sm text-slate-500 text-center">
                        {formatFileSize(compressedImage.compressedSize)}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <p className="text-blue-900">
                      <span className="font-semibold">
                        %{calculateCompressionRatio(
                          compressedImage.originalSize,
                          compressedImage.compressedSize
                        )}
                      </span>{" "}
                      dosya boyutu azaltıldı
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      {formatFileSize(compressedImage.originalSize - compressedImage.compressedSize)} tasarruf
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleDownload}
                      disabled={isCompressing}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      data-testid="download-button"
                    >
                      <Download className="w-4 h-4" />
                      Sıkıştırılmış Görseli İndir
                    </button>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                      Sıfırla
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
