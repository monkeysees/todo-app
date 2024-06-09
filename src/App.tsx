import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<string[]>(["Go shopping"]);
  const [newTodo, setNewTodo] = useState<string>("");

  function handleNewTodoCreation(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    setTodos([newTodo.trim(), ...todos]);
  }

  console.log(todos);

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
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
