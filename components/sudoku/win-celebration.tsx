"use client";

import { useEffect, useState } from "react";
import { Trophy, X } from "lucide-react";

interface WinCelebrationProps {
  show: boolean;
}

export function WinCelebration({ show }: WinCelebrationProps) {
  const [confetti, setConfetti] = useState<
    Array<{ id: number; color: string; left: number; delay: number }>
  >([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      // Generate confetti pieces
      const colors = ["#8A2BE2", "#FF69B4", "#00CED1", "#FFD700", "#FF6347"];
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: Math.random() * 100,
        delay: Math.random() * 2,
      }));
      setConfetti(pieces);
    }
  }, [show]);

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            backgroundColor: piece.color,
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            top: "-10px",
          }}
        />
      ))}

      {/* Win Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
        <div className="bg-white dark:bg-stitch-bg-dark rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border-4 border-stitch-primary animate-in zoom-in-95 duration-300">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-stitch-primary/10 transition-colors cursor-pointer"
            aria-label="Kapat"
          >
            <X className="w-6 h-6 text-stitch-primary" />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-stitch-primary to-stitch-secondary flex items-center justify-center mb-6 shadow-lg shadow-stitch-primary/30">
              <Trophy className="w-12 h-12 text-white" />
            </div>

            <h2 className="text-3xl font-display font-bold text-stitch-primary mb-2">
              Tebrikler!
            </h2>

            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Sudoku bulmacasını başarıyla tamamladınız!
            </p>

            <div className="bg-stitch-accent-blue/20 rounded-2xl p-4 w-full mb-6">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                Kazanma Süreniz
              </p>
              <p className="text-2xl font-display font-bold text-stitch-tertiary">
                Harika İş!
              </p>
            </div>

            <button
              onClick={handleClose}
              className="
                w-full py-4 rounded-xl bg-gradient-to-r from-stitch-primary to-stitch-secondary 
                text-white font-bold text-lg tracking-wide
                hover:shadow-lg hover:shadow-stitch-primary/30 hover:-translate-y-0.5
                transition-all cursor-pointer
              "
            >
              Devam Et
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
