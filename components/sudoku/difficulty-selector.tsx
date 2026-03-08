"use client";

import { Difficulty } from "@/lib/sudoku";

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

const difficulties: { value: Difficulty; label: string }[] = [
  { value: "Kolay", label: "Kolay" },
  { value: "Orta", label: "Orta" },
  { value: "Zor", label: "Zor" },
];

export function DifficultySelector({
  difficulty,
  onChange,
}: DifficultySelectorProps) {
  return (
    <div className="flex w-full mb-6">
      <div className="flex h-14 flex-1 items-center justify-center rounded-2xl bg-white dark:bg-stitch-bg-dark p-1.5 shadow-sm border-2 border-stitch-primary/20">
        {difficulties.map((diff) => (
          <label
            key={diff.value}
            className={`
              flex cursor-pointer h-full grow items-center justify-center 
              rounded-xl px-4 transition-all text-sm font-bold tracking-wide
              ${
                difficulty === diff.value
                  ? "bg-stitch-primary text-white shadow-md"
                  : "text-slate-500 dark:text-slate-400 hover:text-stitch-primary"
              }
            `}
          >
            <span className="truncate">{diff.label}</span>
            <input
              type="radio"
              name="difficulty"
              value={diff.value}
              checked={difficulty === diff.value}
              onChange={() => onChange(diff.value)}
              className="invisible w-0"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
