'use client';

import React, { useRef, useEffect, useCallback } from 'react';

export interface GameState {
  isRunning: boolean;
  isPaused: boolean;
  score: number;
  gameOver: boolean;
}

export interface GameCanvasProps {
  width?: number;
  height?: number;
  onGameUpdate?: (state: GameState) => void;
  onGameOver?: (finalScore: number) => void;
  className?: string;
}

const DEFAULT_WIDTH = 288;
const DEFAULT_HEIGHT = 512;
const TARGET_FPS = 60;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

export const GameCanvas: React.FC<GameCanvasProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  onGameUpdate,
  onGameOver,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const gameStateRef = useRef<GameState>({
    isRunning: false,
    isPaused: false,
    score: 0,
    gameOver: false,
  });

  // Initialize canvas context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) {
      console.error('Failed to get 2D context from canvas');
      return;
    }

    contextRef.current = context;

    // Set canvas internal dimensions (not CSS dimensions)
    canvas.width = width;
    canvas.height = height;

    return () => {
      // Cleanup animation on unmount
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [width, height]);

  // Clear canvas
  const clearCanvas = useCallback(() => {
    const context = contextRef.current;
    const canvas = canvasRef.current;
    if (!context || !canvas) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Update game logic (placeholder for actual game logic)
  const update = useCallback((deltaTime: number) => {
    const state = gameStateRef.current;
    
    if (!state.isRunning || state.isPaused || state.gameOver) {
      return;
    }

    // Game logic will be implemented in future stories
    // For now, this is a placeholder for the game loop structure
    
    // Notify parent of state updates
    onGameUpdate?.({ ...state });
  }, [onGameUpdate]);

  // Draw game (placeholder for actual rendering)
  const draw = useCallback(() => {
    const context = contextRef.current;
    if (!context) return;

    // Draw background
    context.fillStyle = '#4FC3F7';
    context.fillRect(0, 0, width, height);

    // Draw ground
    context.fillStyle = '#8D6E63';
    context.fillRect(0, height - 20, width, 20);

    // Draw score placeholder
    context.fillStyle = '#FFFFFF';
    context.font = '24px Arial';
    context.textAlign = 'center';
    context.fillText(`Score: ${gameStateRef.current.score}`, width / 2, 40);
  }, [width, height]);

  // Main game loop
  const gameLoop = useCallback((currentTime: number) => {
    const deltaTime = currentTime - lastTimeRef.current;

    if (deltaTime >= FRAME_INTERVAL) {
      lastTimeRef.current = currentTime - (deltaTime % FRAME_INTERVAL);

      // Clear → Update → Draw
      clearCanvas();
      update(deltaTime);
      draw();
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [clearCanvas, update, draw]);

  // Start the game loop
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameLoop]);

  // Game control methods (exposed via ref if needed in future)
  const startGame = useCallback(() => {
    gameStateRef.current.isRunning = true;
    gameStateRef.current.isPaused = false;
    gameStateRef.current.gameOver = false;
    gameStateRef.current.score = 0;
  }, []);

  const pauseGame = useCallback(() => {
    gameStateRef.current.isPaused = !gameStateRef.current.isPaused;
  }, []);

  const endGame = useCallback(() => {
    gameStateRef.current.isRunning = false;
    gameStateRef.current.gameOver = true;
    onGameOver?.(gameStateRef.current.score);
  }, [onGameOver]);

  // Expose methods via window for testing (only in development)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__gameCanvasControls = {
        startGame,
        pauseGame,
        endGame,
        getState: () => ({ ...gameStateRef.current }),
      };
    }
  }, [startGame, pauseGame, endGame]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`block ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        imageRendering: 'pixelated',
      }}
      data-testid="game-canvas"
    />
  );
};

export default GameCanvas;
