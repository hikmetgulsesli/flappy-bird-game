"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Cell,
  Position,
  Difficulty,
  generatePuzzle,
  isValidMove,
  isPuzzleComplete,
  validateGrid,
} from "@/lib/sudoku";
import { SudokuCell } from "./sudoku-cell";
import { Timer } from "./timer";
import { DifficultySelector } from "./difficulty-selector";
import { WinCelebration } from "./win-celebration";

export function SudokuGrid() {
  const [difficulty, setDifficulty] = useState<Difficulty>("Orta");
  const [grid, setGrid] = useState<Cell[][]>(() => generatePuzzle("Orta"));
  const [selectedCell, setSelectedCell] = useState<Position | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [hasWon, setHasWon] = useState(false);

  // Handle cell selection
  const handleCellClick = useCallback((row: number, col: number) => {
    if (hasWon) return;
    setSelectedCell({ row, col });
    if (!timerRunning) {
      setTimerRunning(true);
    }
  }, [hasWon, timerRunning]);

  // Handle number input
  const handleNumberInput = useCallback(
    (num: number) => {
      if (!selectedCell || hasWon) return;
      const { row, col } = selectedCell;
      const cell = grid[row][col];

      if (cell.isInitial) return;

      const newGrid = grid.map((r) => r.map((c) => ({ ...c })));
      newGrid[row][col].value = num;
      newGrid[row][col].isValid = isValidMove(newGrid, row, col, num);

      setGrid(newGrid);

      // Check for win
      if (isPuzzleComplete(newGrid)) {
        setHasWon(true);
        setTimerRunning(false);
      }
    },
    [selectedCell, grid, hasWon]
  );

  // Handle cell clear
  const handleClearCell = useCallback(() => {
    if (!selectedCell || hasWon) return;
    const { row, col } = selectedCell;
    const cell = grid[row][col];

    if (cell.isInitial) return;

    const newGrid = grid.map((r) => r.map((c) => ({ ...c })));
    newGrid[row][col].value = 0;
    newGrid[row][col].isValid = true;

    setGrid(newGrid);
  }, [selectedCell, grid, hasWon]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (hasWon) return;

      // Number keys 1-9
      if (e.key >= "1" && e.key <= "9") {
        handleNumberInput(parseInt(e.key, 10));
        return;
      }

      // Arrow keys for navigation
      if (selectedCell) {
        const { row, col } = selectedCell;
        switch (e.key) {
          case "ArrowUp":
            e.preventDefault();
            setSelectedCell({ row: Math.max(0, row - 1), col });
            if (!timerRunning) setTimerRunning(true);
            break;
          case "ArrowDown":
            e.preventDefault();
            setSelectedCell({ row: Math.min(8, row + 1), col });
            if (!timerRunning) setTimerRunning(true);
            break;
          case "ArrowLeft":
            e.preventDefault();
            setSelectedCell({ row, col: Math.max(0, col - 1) });
            if (!timerRunning) setTimerRunning(true);
            break;
          case "ArrowRight":
            e.preventDefault();
            setSelectedCell({ row, col: Math.min(8, col + 1) });
            if (!timerRunning) setTimerRunning(true);
            break;
          case "Backspace":
          case "Delete":
            handleClearCell();
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCell, handleNumberInput, handleClearCell, timerRunning, hasWon]);

  // Start new game
  const handleNewGame = useCallback(() => {
    setGrid(generatePuzzle(difficulty));
    setSelectedCell(null);
    setTimerRunning(false);
    setTimerKey((prev) => prev + 1);
    setHasWon(false);
  }, [difficulty]);

  // Handle difficulty change
  const handleDifficultyChange = useCallback((newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    setGrid(generatePuzzle(newDifficulty));
    setSelectedCell(null);
    setTimerRunning(false);
    setTimerKey((prev) => prev + 1);
    setHasWon(false);
  }, []);

  // Check if a cell should be highlighted (same row, col, or box)
  const isHighlighted = useCallback(
    (row: number, col: number): boolean => {
      if (!selectedCell) return false;
      const { row: selRow, col: selCol } = selectedCell;

      // Same row or column
      if (row === selRow || col === selCol) return true;

      // Same 3x3 box
      const boxRow = Math.floor(row / 3);
      const boxCol = Math.floor(col / 3);
      const selBoxRow = Math.floor(selRow / 3);
      const selBoxCol = Math.floor(selCol / 3);

      return boxRow === selBoxRow && boxCol === selBoxCol;
    },
    [selectedCell]
  );

  return (
    <>
      <WinCelebration show={hasWon} />

      <div className="flex flex-col items-center w-full">
        {/* Difficulty Selector */}
        <DifficultySelector
          difficulty={difficulty}
          onChange={handleDifficultyChange}
        />

        <div className="flex flex-col md:flex-row gap-6 w-full items-start justify-center mt-6">
          {/* Sudoku Grid */}
          <div
            className={`
              w-full aspect-square max-w-[450px] p-2 
              bg-white dark:bg-stitch-bg-dark 
              shadow-2xl dark:shadow-[0_0_30px_rgba(138,43,226,0.15)] 
              rounded-2xl
              ${hasWon ? "win-animation" : ""}
            `}
          >
            <div className="sudoku-grid grid grid-cols-9 grid-rows-9 h-full w-full bg-background-light dark:bg-stitch-bg-dark rounded-md overflow-hidden">
              {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="sudoku-row contents">
                  {row.map((cell, colIndex) => (
                    <SudokuCell
                      key={`${rowIndex}-${colIndex}`}
                      cell={cell}
                      position={{ row: rowIndex, col: colIndex }}
                      isSelected={
                        selectedCell?.row === rowIndex &&
                        selectedCell?.col === colIndex
                      }
                      isHighlighted={isHighlighted(rowIndex, colIndex)}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Number Pad */}
          <div className="hidden md:grid grid-cols-3 gap-2 w-full max-w-[120px] self-start">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberInput(num)}
                disabled={hasWon}
                className="
                  flex items-center justify-center aspect-square 
                  rounded-xl bg-gradient-to-br from-stitch-primary to-stitch-secondary 
                  text-white text-xl font-display font-bold 
                  transition-transform hover:-translate-y-1 hover:shadow-lg 
                  shadow-md shadow-stitch-primary/30
                  disabled:opacity-50 disabled:cursor-not-allowed
                  cursor-pointer
                "
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Number Pad */}
        <div className="md:hidden grid grid-cols-9 gap-1 w-full mt-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberInput(num)}
              disabled={hasWon}
              className="
                flex items-center justify-center aspect-square 
                rounded-lg bg-gradient-to-br from-stitch-primary to-stitch-secondary 
                text-white text-lg font-display font-bold shadow-md
                disabled:opacity-50 disabled:cursor-not-allowed
                cursor-pointer
              "
            >
              {num}
            </button>
          ))}
        </div>

        {/* Timer and New Game */}
        <div className="flex items-center justify-between w-full mt-8 bg-white dark:bg-stitch-primary/5 p-4 rounded-2xl border-2 border-dashed border-stitch-primary/20">
          <Timer key={timerKey} running={timerRunning} />
          <button
            onClick={handleNewGame}
            className="
              px-6 py-3 rounded-full bg-stitch-tertiary text-white 
              font-bold tracking-wider hover:bg-stitch-tertiary/90 
              transition-all shadow-lg hover:shadow-stitch-tertiary/50 
              hover:-translate-y-0.5 cursor-pointer
            "
          >
            Yeni Oyun
          </button>
        </div>
      </div>
    </>
  );
}
