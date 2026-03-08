"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Moon, Sun, Clock, Grid3X3, RotateCcw, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

type CellValue = number | null;
type Notes = Set<number>;
type Difficulty = "Kolay" | "Orta" | "Zor";

interface Cell {
  value: CellValue;
  isFixed: boolean;
  notes: Notes;
}

interface Position {
  row: number;
  col: number;
}

// Sample puzzles for each difficulty
const SAMPLE_PUZZLES: Record<Difficulty, number[][]> = {
  Kolay: [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ],
  Orta: [
    [0, 0, 0, 6, 0, 0, 4, 0, 0],
    [7, 0, 0, 0, 0, 3, 6, 0, 0],
    [0, 0, 0, 0, 9, 1, 0, 8, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 0, 1, 8, 0, 0, 0, 3],
    [0, 0, 0, 3, 0, 6, 0, 4, 5],
    [0, 4, 0, 2, 0, 0, 0, 6, 0],
    [9, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 1, 0, 0],
  ],
  Zor: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 8, 5],
    [0, 0, 1, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 7, 0, 0, 0],
    [0, 0, 4, 0, 0, 0, 1, 0, 0],
    [0, 9, 0, 0, 0, 0, 0, 0, 0],
    [5, 0, 0, 0, 0, 0, 0, 7, 3],
    [0, 0, 2, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0, 9],
  ],
};

// Solutions for validation
const SOLUTIONS: Record<Difficulty, number[][]> = {
  Kolay: [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
  ],
  Orta: [
    [5, 8, 1, 6, 7, 2, 4, 3, 9],
    [7, 9, 2, 8, 4, 3, 6, 5, 1],
    [3, 6, 4, 5, 9, 1, 7, 8, 2],
    [4, 3, 8, 9, 5, 7, 2, 1, 6],
    [2, 5, 6, 1, 8, 4, 9, 7, 3],
    [1, 7, 9, 3, 2, 6, 8, 4, 5],
    [8, 4, 5, 2, 3, 9, 7, 6, 1],
    [9, 1, 3, 7, 6, 8, 5, 2, 4],
    [6, 2, 7, 4, 1, 5, 3, 9, 8],
  ],
  Zor: [
    [9, 8, 7, 6, 5, 4, 3, 2, 1],
    [2, 4, 6, 1, 7, 3, 9, 8, 5],
    [3, 5, 1, 9, 2, 8, 7, 4, 6],
    [1, 2, 8, 5, 3, 7, 6, 9, 4],
    [6, 3, 4, 8, 9, 2, 1, 5, 7],
    [7, 9, 5, 4, 6, 1, 8, 3, 2],
    [5, 1, 9, 2, 8, 6, 4, 7, 3],
    [4, 7, 2, 3, 1, 9, 5, 6, 8],
    [8, 6, 3, 7, 4, 5, 2, 1, 9],
  ],
};

function createInitialGrid(difficulty: Difficulty): Cell[][] {
  const puzzle = SAMPLE_PUZZLES[difficulty];
  return puzzle.map((row) =>
    row.map((value) => ({
      value: value === 0 ? null : value,
      isFixed: value !== 0,
      notes: new Set<number>(),
    }))
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export default function SudokuGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>("Kolay");
  const [grid, setGrid] = useState<Cell[][]>(() => createInitialGrid("Kolay"));
  const [selectedCell, setSelectedCell] = useState<Position | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isNotesMode, setIsNotesMode] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);

  // Timer effect
  useEffect(() => {
    if (isGameComplete) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isGameComplete]);

  // Check if game is complete
  useEffect(() => {
    const solution = SOLUTIONS[difficulty];
    const isComplete = grid.every((row, rowIndex) =>
      row.every((cell, colIndex) => cell.value === solution[rowIndex][colIndex])
    );
    if (isComplete && !isGameComplete) {
      setIsGameComplete(true);
    }
  }, [grid, difficulty, isGameComplete]);

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell) return;

      const { row, col } = selectedCell;

      // Number keys 1-9
      if (e.key >= "1" && e.key <= "9") {
        const num = parseInt(e.key, 10);
        handleNumberInput(num);
        return;
      }

      // Backspace or Delete to clear
      if (e.key === "Backspace" || e.key === "Delete") {
        handleClear();
        return;
      }

      // Arrow keys for navigation
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedCell({ row: Math.max(0, row - 1), col });
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedCell({ row: Math.min(8, row + 1), col });
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setSelectedCell({ row, col: Math.max(0, col - 1) });
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setSelectedCell({ row, col: Math.min(8, col + 1) });
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCell, grid, isNotesMode]);

  const handleNumberInput = useCallback(
    (num: number) => {
      if (!selectedCell) return;
      const { row, col } = selectedCell;

      // Don't modify fixed cells
      if (grid[row][col].isFixed) return;

      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((r) => r.map((c) => ({ ...c, notes: new Set(c.notes) })));

        if (isNotesMode) {
          // Toggle note
          if (newGrid[row][col].notes.has(num)) {
            newGrid[row][col].notes.delete(num);
          } else {
            newGrid[row][col].notes.add(num);
          }
          newGrid[row][col].value = null;
        } else {
          // Set value
          newGrid[row][col].value = num;
          newGrid[row][col].notes.clear();
        }

        return newGrid;
      });
    },
    [selectedCell, grid, isNotesMode]
  );

  const handleClear = useCallback(() => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;

    // Don't modify fixed cells
    if (grid[row][col].isFixed) return;

    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r) => r.map((c) => ({ ...c, notes: new Set(c.notes) })));
      newGrid[row][col].value = null;
      newGrid[row][col].notes.clear();
      return newGrid;
    });
  }, [selectedCell, grid]);

  const handleCellClick = useCallback((row: number, col: number) => {
    setSelectedCell({ row, col });
  }, []);

  const handleNewGame = useCallback(() => {
    setGrid(createInitialGrid(difficulty));
    setTimer(0);
    setIsGameComplete(false);
    setSelectedCell(null);
  }, [difficulty]);

  const handleDifficultyChange = useCallback((newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    setGrid(createInitialGrid(newDifficulty));
    setTimer(0);
    setIsGameComplete(false);
    setSelectedCell(null);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  }, []);

  // Check if a cell value is incorrect
  const isCellError = useCallback(
    (row: number, col: number): boolean => {
      const cell = grid[row][col];
      if (cell.value === null || cell.isFixed) return false;
      return cell.value !== SOLUTIONS[difficulty][row][col];
    },
    [grid, difficulty]
  );

  // Render notes in a 3x3 grid
  const renderNotes = useCallback((notes: Set<number>) => {
    const notesArray = Array.from(notes).sort();
    return (
      <div className="notes">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <span
            key={num}
            className={`text-[0.5rem] sm:text-xs ${
              notesArray.includes(num) ? "text-primary opacity-70" : "opacity-0"
            }`}
          >
            {notesArray.includes(num) ? num : ""}
          </span>
        ))}
      </div>
    );
  }, []);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5 px-4 sm:px-8">
          <div className="flex flex-col max-w-[600px] flex-1 w-full mx-auto">
            {/* Header */}
            <header className="flex items-center justify-between whitespace-nowrap border-b-2 border-dashed border-primary/30 px-4 sm:px-6 py-4 mb-6">
              <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                <div className="size-8 text-primary">
                  <Grid3X3 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold font-display tracking-wider text-primary">
                  Sudoku
                </h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="rounded-full h-10 w-10 bg-secondary/10 text-secondary hover:bg-secondary/20 transition-all hover:rotate-12"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
            </header>

            {/* Game Complete Banner */}
            {isGameComplete && (
              <div className="mb-4 p-4 bg-gradient-to-r from-primary to-secondary rounded-2xl text-white text-center animate-in fade-in slide-in-from-top-4">
                <h3 className="text-xl font-bold font-display">Tebrikler! 🎉</h3>
                <p className="text-sm opacity-90">Sudoku'yu {formatTime(timer)} sürede tamamladınız!</p>
              </div>
            )}

            <div className="flex flex-col items-center w-full">
              {/* Difficulty Selector */}
              <div className="flex w-full mb-6">
                <div className="flex h-14 flex-1 items-center justify-center rounded-2xl bg-white dark:bg-background-dark p-1.5 shadow-sm border-2 border-primary/20">
                  {(["Kolay", "Orta", "Zor"] as Difficulty[]).map((diff) => (
                    <label
                      key={diff}
                      className="difficulty-label flex cursor-pointer h-full grow items-center justify-center rounded-xl px-4 has-[:checked]:bg-primary has-[:checked]:shadow-md has-[:checked]:text-white text-slate-500 dark:text-slate-400 hover:text-primary text-sm font-bold tracking-wide"
                    >
                      <span className="truncate">{diff}</span>
                      <input
                        type="radio"
                        name="difficulty"
                        value={diff}
                        checked={difficulty === diff}
                        onChange={() => handleDifficultyChange(diff)}
                        className="invisible w-0"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 w-full items-start justify-center">
                {/* Sudoku Grid */}
                <div className="w-full aspect-square max-w-[450px] p-2 bg-white dark:bg-background-dark shadow-2xl dark:shadow-[0_0_30px_rgba(138,43,226,0.15)] rounded-2xl">
                  <div className="sudoku-grid grid grid-cols-9 grid-rows-9 h-full w-full bg-background-light dark:bg-background-dark rounded-md overflow-hidden">
                    {grid.map((row, rowIndex) => (
                      <div key={rowIndex} className="sudoku-row contents">
                        {row.map((cell, colIndex) => {
                          const isSelected =
                            selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                          const isError = isCellError(rowIndex, colIndex);
                          const cellClasses = `
                            sudoku-cell flex items-center justify-center text-xl sm:text-2xl font-display font-bold
                            cursor-pointer select-none
                            ${isSelected ? "selected" : ""}
                            ${cell.isFixed ? "fixed" : cell.value ? "user-value" : ""}
                            ${isError ? "error" : ""}
                            ${!cell.isFixed && !isError ? "hover:bg-primary/10" : ""}
                            transition-colors duration-150
                          `;

                          return (
                            <div
                              key={`${rowIndex}-${colIndex}`}
                              className={cellClasses}
                              onClick={() => handleCellClick(rowIndex, colIndex)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  handleCellClick(rowIndex, colIndex);
                                }
                              }}
                            >
                              {cell.value ? (
                                cell.value
                              ) : cell.notes.size > 0 ? (
                                renderNotes(cell.notes)
                              ) : (
                                ""
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop Number Selector */}
                <div className="hidden md:grid grid-cols-3 gap-2 w-full max-w-[120px] self-start">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleNumberInput(num)}
                      className="number-btn flex items-center justify-center aspect-square rounded-xl text-white text-xl font-display font-bold shadow-md"
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Number Selector */}
              <div className="md:hidden grid grid-cols-9 gap-1 w-full mt-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleNumberInput(num)}
                    className="number-btn flex items-center justify-center aspect-square rounded-lg text-white text-lg font-display font-bold shadow-md"
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between w-full mt-8 bg-white dark:bg-primary/5 p-4 rounded-2xl border-2 border-dashed border-primary/20">
                <div className="flex items-center gap-2 timer-display font-display font-bold text-xl sm:text-2xl">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8" />
                  <span>{formatTime(timer)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsNotesMode(!isNotesMode)}
                    className={`rounded-full h-10 w-10 transition-all ${
                      isNotesMode
                        ? "bg-primary text-white border-primary"
                        : "border-primary/30 text-primary hover:bg-primary/10"
                    }`}
                    title="Not Modu"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleClear}
                    disabled={!selectedCell || grid[selectedCell?.row]?.[selectedCell?.col]?.isFixed}
                    className="rounded-full h-10 w-10 border-primary/30 text-primary hover:bg-primary/10 disabled:opacity-50"
                    title="Temizle (Delete)"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>

                  <Button
                    onClick={handleNewGame}
                    className="px-6 py-3 rounded-full bg-tertiary text-white font-bold tracking-wider hover:bg-tertiary/90 transition-all shadow-lg hover:shadow-tertiary/50 hover:-translate-y-0.5"
                  >
                    Yeni Oyun
                  </Button>
                </div>
              </div>

              {/* Notes Mode Indicator */}
              {isNotesMode && (
                <div className="mt-4 text-center text-sm text-primary font-medium animate-pulse">
                  Not Modu Aktif - Sayıları not olarak ekleyin
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
