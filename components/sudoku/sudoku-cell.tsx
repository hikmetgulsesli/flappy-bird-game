"use client";

import { Cell, Position } from "@/lib/sudoku";

interface SudokuCellProps {
  cell: Cell;
  position: Position;
  isSelected: boolean;
  isHighlighted: boolean;
  onClick: () => void;
}

export function SudokuCell({
  cell,
  position,
  isSelected,
  isHighlighted,
  onClick,
}: SudokuCellProps) {
  const { row, col } = position;

  // Determine cell styling based on state
  let bgClass = "bg-background-light dark:bg-stitch-bg-dark";
  let textClass = "text-slate-400 dark:text-slate-500";

  if (cell.isInitial) {
    textClass = "text-slate-400 dark:text-slate-500";
  } else if (!cell.isValid && cell.value !== 0) {
    bgClass = "bg-red-100 dark:bg-red-900/30";
    textClass = "text-red-600 dark:text-red-400";
  } else if (cell.value !== 0) {
    textClass = "text-stitch-primary";
  }

  if (isSelected) {
    bgClass = "bg-stitch-accent-blue/40";
    textClass = "text-stitch-primary";
  } else if (isHighlighted) {
    bgClass = "bg-stitch-accent-blue/20";
  }

  return (
    <button
      onClick={onClick}
      className={`
        sudoku-cell flex items-center justify-center 
        text-xl sm:text-2xl font-display font-bold
        cursor-pointer transition-colors duration-150
        hover:bg-stitch-accent-blue/30
        focus:outline-none focus:ring-2 focus:ring-stitch-primary/50
        ${bgClass} ${textClass}
      `}
      aria-label={`Satır ${row + 1}, Sütun ${col + 1}`}
      aria-selected={isSelected}
    >
      {cell.value !== 0 ? cell.value : ""}
    </button>
  );
}
