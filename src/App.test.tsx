import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the todo app heading', () => {
    render(<App />)
    expect(screen.getByText('Todo App')).toBeInTheDocument()
  })

  it('renders the todo input', () => {
    render(<App />)
    expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument()
  })

  it('shows empty state when no todos', () => {
    render(<App />)
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument()
  })
})