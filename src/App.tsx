import { useState } from 'react'
import { TodoList } from './components/TodoList'
import { TodoInput } from './components/TodoInput'
import { Todo } from './types/todo'

function App() {
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
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-secondary-800 dark:text-secondary-100">
          Yapılacaklar
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
    </div>
  )
}

export default App