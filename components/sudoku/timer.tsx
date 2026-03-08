"use client";

import { useState, useEffect } from "react";
import { formatTime } from "@/lib/sudoku";
import { Clock } from "lucide-react";

interface TimerProps {
  running: boolean;
}

export function Timer({ running }: TimerProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (running) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [running]);

  return (
    <div className="flex items-center gap-2 text-stitch-tertiary font-display font-bold text-xl sm:text-2xl">
      <Clock className="w-6 h-6 sm:w-8 sm:h-8" />
      <span>{formatTime(seconds)}</span>
    </div>
  );
}
