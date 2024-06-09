import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<{ value: string; completed: boolean }[]>([
    { value: "Go shopping", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState<string>("");

  // const activeTodos = todos.filter((t) => !t.completed);
  // const completedTodos = todos.filter((t) => t.completed);

  function handleNewTodoCreation(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    setTodos([{ value: newTodo.trim(), completed: false }, ...todos]);
  }

  function handleTodoStatusChange(todo: string) {
    setTodos(
      todos.map((t) =>
        t.value === todo ? { ...t, completed: !t.completed } : t,
      ),
    );
  }

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
        onKeyDown={handleNewTodoCreation}
        placeholder="Что делать?"
        aria-label="Новая задача"
        aria-placeholder="Сходить в магазин"
      />
      <ul>
        {todos.map((t) => (
          <div key={t.value}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => {
                handleTodoStatusChange(t.value);
              }}
              aria-label="Завершить задачу"
            />
            <li>{t.value}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
