import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the todo app heading', () => {
    render(<App />)
    expect(screen.getByText('Yapılacaklar')).toBeInTheDocument()
  })

  it('renders the todo input', () => {
    render(<App />)
    expect(screen.getByPlaceholderText('Yeni görev ekle...')).toBeInTheDocument()
  })

  it('shows empty state when no todos', () => {
    render(<App />)
    expect(screen.getByText('Henüz görev yok. Yukarıdan ekleyin!')).toBeInTheDocument()
  })
})