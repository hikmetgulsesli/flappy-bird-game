export type Difficulty = "Kolay" | "Orta" | "Zor";

export interface Cell {
  value: number;
  isInitial: boolean;
  isValid: boolean;
}

export interface Position {
  row: number;
  col: number;
}

// Generate a complete valid Sudoku grid
function generateCompleteGrid(): number[][] {
  const grid: number[][] = Array(9)
    .fill(null)
    .map(() => Array(9).fill(0));

  // Helper to check if a number is valid in a position
  function isValid(grid: number[][], row: number, col: number, num: number): boolean {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
      if (grid[x][col] === num) return false;
    }

    // Check 3x3 box
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol] === num) return false;
      }
    }

    return true;
  }

  // Backtracking solver to fill the grid
  function solve(grid: number[][]): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
          for (const num of nums) {
            if (isValid(grid, row, col, num)) {
              grid[row][col] = num;
              if (solve(grid)) return true;
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  solve(grid);
  return grid;
}

// Remove cells based on difficulty
function removeCells(grid: number[][], difficulty: Difficulty): number[][] {
  const puzzle = grid.map((row) => [...row]);
  let cellsToRemove: number;

  switch (difficulty) {
    case "Kolay":
      cellsToRemove = 35;
      break;
    case "Orta":
      cellsToRemove = 45;
      break;
    case "Zor":
      cellsToRemove = 55;
      break;
    default:
      cellsToRemove = 45;
  }

  let removed = 0;
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removed++;
    }
  }

  return puzzle;
}

// Generate a puzzle
export function generatePuzzle(difficulty: Difficulty): Cell[][] {
  const solution = generateCompleteGrid();
  const puzzle = removeCells(solution, difficulty);

  return puzzle.map((row, rowIndex) =>
    row.map((value, colIndex) => ({
      value,
      isInitial: value !== 0,
      isValid: true,
    }))
  );
}

// Check if a move is valid
export function isValidMove(
  grid: Cell[][],
  row: number,
  col: number,
  num: number
): boolean {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (x !== col && grid[row][x].value === num) return false;
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (x !== row && grid[x][col].value === num) return false;
  }

  // Check 3x3 box
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const r = i + startRow;
      const c = j + startCol;
      if ((r !== row || c !== col) && grid[r][c].value === num) return false;
    }
  }

  return true;
}

// Check if the puzzle is complete and correct
export function isPuzzleComplete(grid: Cell[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = grid[row][col];
      if (cell.value === 0 || !cell.isValid) return false;
    }
  }
  return true;
}

// Validate entire grid and update isValid flags
export function validateGrid(grid: Cell[][]): Cell[][] {
  const newGrid = grid.map((row) =>
    row.map((cell) => ({ ...cell, isValid: true }))
  );

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (newGrid[row][col].value !== 0) {
        newGrid[row][col].isValid = isValidMove(
          newGrid,
          row,
          col,
          newGrid[row][col].value
        );
      }
    }
  }

  return newGrid;
}

// Format time as MM:SS
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
