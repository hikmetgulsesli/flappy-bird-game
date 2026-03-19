import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { Terminal } from './Terminal'

describe('Terminal', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  it('renders the terminal widget', () => {
    render(<Terminal />)
    expect(screen.getByTestId('terminal-widget')).toBeInTheDocument()
  })

  it('displays ASCII art', () => {
    render(<Terminal />)
    expect(screen.getByTestId('terminal-ascii-art')).toBeInTheDocument()
    // Check that the ASCII art contains "TERMINAL" (in stylized form)
    const asciiArt = screen.getByTestId('terminal-ascii-art')
    expect(asciiArt.textContent).toContain('╔')
    expect(asciiArt.textContent).toContain('╗')
  })

  it('displays initial logs', () => {
    render(<Terminal />)
    const logsContainer = screen.getByTestId('terminal-logs')
    expect(logsContainer).toBeInTheDocument()
    // Should have at least 2 initial log lines
    expect(logsContainer.children.length).toBeGreaterThanOrEqual(2)
  })

  it('adds new log lines over time', async () => {
    render(<Terminal />)
    const initialLogs = screen.getByTestId('terminal-logs').children.length

    // Advance time by 3 seconds (2 log messages should be added at 1.5s intervals)
    vi.advanceTimersByTime(3000)

    await waitFor(() => {
      const currentLogs = screen.getByTestId('terminal-logs').children.length
      expect(currentLogs).toBeGreaterThan(initialLogs)
    })
  })

  it('displays animated cursor', () => {
    render(<Terminal />)
    expect(screen.getByTestId('terminal-cursor')).toBeInTheDocument()
  })

  it('renders terminal header with window controls', () => {
    render(<Terminal />)
    // Check for the header text
    expect(screen.getByText(/terminal — bash/i)).toBeInTheDocument()
  })

  it('log line count increases over time', async () => {
    render(<Terminal />)

    // Get initial count
    const getLogCount = () => screen.getByTestId('terminal-logs').children.length
    const initialCount = getLogCount()

    // Advance by 5 seconds (should add ~3 logs)
    vi.advanceTimersByTime(5000)

    await waitFor(() => {
      expect(getLogCount()).toBeGreaterThan(initialCount)
    })
  })
})
