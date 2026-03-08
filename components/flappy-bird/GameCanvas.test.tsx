import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GameCanvas, GameCanvasProps } from './GameCanvas';

describe('GameCanvas', () => {
  const defaultProps: GameCanvasProps = {
    width: 288,
    height: 512,
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    // Clean up window controls
    if (typeof window !== 'undefined') {
      delete (window as any).__gameCanvasControls;
    }
  });

  it('renders canvas element with correct dimensions', () => {
    render(<GameCanvas {...defaultProps} />);
    
    const canvas = screen.getByTestId('game-canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('width', '288');
    expect(canvas).toHaveAttribute('height', '512');
  });

  it('renders with default dimensions when not specified', () => {
    render(<GameCanvas />);
    
    const canvas = screen.getByTestId('game-canvas');
    expect(canvas).toHaveAttribute('width', '288');
    expect(canvas).toHaveAttribute('height', '512');
  });

  it('applies custom width and height', () => {
    render(<GameCanvas width={400} height={600} />);
    
    const canvas = screen.getByTestId('game-canvas');
    expect(canvas).toHaveAttribute('width', '400');
    expect(canvas).toHaveAttribute('height', '600');
  });

  it('applies custom className', () => {
    render(<GameCanvas {...defaultProps} className="custom-class" />);
    
    const canvas = screen.getByTestId('game-canvas');
    expect(canvas).toHaveClass('custom-class');
  });

  it('initializes canvas with 2D rendering context', () => {
    const getContextSpy = vi.spyOn(HTMLCanvasElement.prototype, 'getContext');
    
    render(<GameCanvas {...defaultProps} />);
    
    expect(getContextSpy).toHaveBeenCalledWith('2d');
    getContextSpy.mockRestore();
  });

  it('maintains aspect ratio via inline styles', () => {
    render(<GameCanvas width={288} height={512} />);
    
    const canvas = screen.getByTestId('game-canvas');
    expect(canvas).toHaveStyle({
      width: '288px',
      height: '512px',
    });
  });

  it('calls requestAnimationFrame for game loop', () => {
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame');
    
    render(<GameCanvas {...defaultProps} />);
    
    expect(rafSpy).toHaveBeenCalled();
    rafSpy.mockRestore();
  });

  it('cancels animation frame on unmount', () => {
    const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame');
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(123);
    
    const { unmount } = render(<GameCanvas {...defaultProps} />);
    unmount();
    
    expect(cancelSpy).toHaveBeenCalledWith(123);
    
    cancelSpy.mockRestore();
    rafSpy.mockRestore();
  });

  it('exposes game controls on window for testing', () => {
    render(<GameCanvas {...defaultProps} />);
    
    expect((window as any).__gameCanvasControls).toBeDefined();
    expect(typeof (window as any).__gameCanvasControls.startGame).toBe('function');
    expect(typeof (window as any).__gameCanvasControls.pauseGame).toBe('function');
    expect(typeof (window as any).__gameCanvasControls.endGame).toBe('function');
    expect(typeof (window as any).__gameCanvasControls.getState).toBe('function');
  });

  it('initial state is not running and not game over', () => {
    render(<GameCanvas {...defaultProps} />);
    
    const state = (window as any).__gameCanvasControls.getState();
    expect(state.isRunning).toBe(false);
    expect(state.isPaused).toBe(false);
    expect(state.gameOver).toBe(false);
    expect(state.score).toBe(0);
  });

  it('startGame sets isRunning to true', () => {
    render(<GameCanvas {...defaultProps} />);
    
    (window as any).__gameCanvasControls.startGame();
    const state = (window as any).__gameCanvasControls.getState();
    
    expect(state.isRunning).toBe(true);
    expect(state.isPaused).toBe(false);
    expect(state.gameOver).toBe(false);
  });

  it('pauseGame toggles isPaused state', () => {
    render(<GameCanvas {...defaultProps} />);
    
    // Start game first
    (window as any).__gameCanvasControls.startGame();
    
    // Pause
    (window as any).__gameCanvasControls.pauseGame();
    let state = (window as any).__gameCanvasControls.getState();
    expect(state.isPaused).toBe(true);
    
    // Unpause
    (window as any).__gameCanvasControls.pauseGame();
    state = (window as any).__gameCanvasControls.getState();
    expect(state.isPaused).toBe(false);
  });

  it('endGame stops running and triggers callback', () => {
    const onGameOver = vi.fn();
    render(<GameCanvas {...defaultProps} onGameOver={onGameOver} />);
    
    // Start and then end game
    (window as any).__gameCanvasControls.startGame();
    (window as any).__gameCanvasControls.endGame();
    
    const state = (window as any).__gameCanvasControls.getState();
    expect(state.isRunning).toBe(false);
    expect(state.gameOver).toBe(true);
    expect(onGameOver).toHaveBeenCalledWith(0);
  });

  it('has pixelated image rendering for crisp graphics', () => {
    render(<GameCanvas {...defaultProps} />);
    
    const canvas = screen.getByTestId('game-canvas');
    expect(canvas).toHaveStyle({
      imageRendering: 'pixelated',
    });
  });

  it('maintains 288x512px as default dimensions', () => {
    render(<GameCanvas />);
    
    const canvas = screen.getByTestId('game-canvas');
    expect(canvas).toHaveAttribute('width', '288');
    expect(canvas).toHaveAttribute('height', '512');
    expect(canvas).toHaveStyle({
      width: '288px',
      height: '512px',
    });
  });
});
