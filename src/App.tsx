import { useState } from 'react'
import { TodoList } from './components/TodoList'
import { TodoInput } from './components/TodoInput'
import { Terminal } from './components/Terminal'
import { Todo } from './types/todo'

type View = 'todo' | 'terminal'

function App() {
  const [currentView, setCurrentView] = useState<View>('todo')
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 dark:from-secondary-900 dark:to-secondary-950 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Navigation */}
        <nav className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setCurrentView('todo')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentView === 'todo'
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
            }`}
            aria-label="Switch to Todo view"
          >
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 00-2 2v6a2 2 0 002 2h2a1 1 0 100-2H6V7h5a1 1 0 011 1v5h2V8a3 3 0 00-3-3H6z" clipRule="evenodd" />
                <path d="M12 7a1 1 0 011-1h1a2 2 0 012 2v6a2 2 0 01-2 2h-1a1 1 0 110-2h1V8h-1a1 1 0 01-1-1z" />
              </svg>
              Todo
            </span>
          </button>
          <button
            onClick={() => setCurrentView('terminal')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentView === 'terminal'
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
            }`}
            aria-label="Switch to Terminal view"
          >
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              Terminal
            </span>
          </button>
        </nav>

        {/* Views */}
        {currentView === 'todo' ? (
          <div className="max-w-lg mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-secondary-800 dark:text-secondary-100">
              Todo App
            </h1>
            <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-soft p-6">
              <TodoInput onAdd={addTodo} />
              <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-4xl font-bold text-center mb-8 text-secondary-800 dark:text-secondary-100">
              Terminal
            </h1>
            <Terminal />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
