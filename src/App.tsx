import { useState } from "react";
import styled from "styled-components";

const AppWrapper = styled.div`
  display: grid;
  place-items: start center;
  padding-top: 3.2rem;
`;

const AppTitle = styled.h1`
  font-size: 3.2em;
  line-height: 1.1;
  margin: 0 0 1.6rem;
`;

const Input = styled.input`
  width: 36rem;
  height: 4.8rem;
  font-size: 2rem;
  font-family: inherit;
  padding: 0 4.8rem;
  background-color: #fff;
  border: 0.1rem solid #eee;
  box-shadow: inset 0 -0.4rem 0.8rem -0.5rem rgb(0 0 0 / 10%);
  line-height: 1;
  transition: 180ms border ease-in-out;

  &::placeholder {
    color: #bdbdbd;
    font-style: italic;
  }

  &:focus {
    border-color: #bdbdbd;

    /* Windows High Contrast Mode */
    outline: 3px solid transparent;
  }
`;

const TodoItemsList = styled.ul`
  list-style: none;
  width: 36rem;
  padding: 0;
  margin: 0;
`;

const TodoItem = styled.li<{ $completed?: boolean }>`
  width: 100%;
  height: 4.8rem;
  display: grid;
  grid-template-columns: 4.8rem 1fr;
  align-items: center;
  font-size: 2rem;
  background-color: #fff;
  border: 0.1rem solid #eee;
  border-top: none;
  color: ${(props) => (props.$completed ? "#BDBDBD" : "inherited")};
  text-decoration: ${(props) => (props.$completed ? "line-through" : "none")};
`;

const Checkbox = styled.input`
  appearance: none;

  /* For iOS < 15 to remove gradient background */
  background-color: #fff;

  /* Not removed via appearance */
  margin: 0;
  margin-top: 2px;
  font: inherit;
  color: currentcolor;
  width: 2.4rem;
  height: 2.4rem;
  border: 0.1rem solid #e0e0e0;
  border-radius: 50%;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  place-self: center;

  &::before {
    content: "";
    margin-top: 2px;
    width: 1.2rem;
    height: 1.2rem;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1rem 1rem #4caf50;
    transform-origin: bottom left;
    clip-path: polygon(41% 87%, 94% 1%, 98% 5%, 42% 95%, 0 56%, 0 49%);
  }

  &:checked {
    border-color: #4caf50;
  }

  &:checked::before {
    transform: scale(1);

    /* Windows High Contrast Mode */
    background-color: CanvasText;
  }

  &:focus {
    outline: 1px solid #e0e0e0;
    outline-offset: 2px;
  }

  &:checked:focus {
    outline-color: #4caf50;
  }
`;

function App() {
  const [todos, setTodos] = useState<{ value: string; completed: boolean }[]>([
    { value: "Go shopping", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [statusToShow, setStatusToShow] = useState<
    "all" | "active" | "completed"
  >("all");

  const activeTodos =
    statusToShow === "all" || statusToShow === "active"
      ? todos.filter((t) => !t.completed)
      : [];

  const completedTodos =
    statusToShow === "all" || statusToShow === "completed"
      ? todos.filter((t) => t.completed)
      : [];

  const todosToShow = activeTodos.concat(completedTodos);

  function handleNewTodoCreation(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    const todoToSave = newTodo.trim();

    if (!todoToSave) return;

    setTodos([{ value: todoToSave, completed: false }, ...todos]);
    setNewTodo("");
  }

  function handleTodoStatusChange(todo: string) {
    setTodos(
      todos.map((t) =>
        t.value === todo ? { ...t, completed: !t.completed } : t,
      ),
    );
  }

  return (
    <AppWrapper>
      <AppTitle>ToDos</AppTitle>
      <Input
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
      <TodoItemsList>
        {todosToShow.map((t) => (
          <div key={t.value}>
            <TodoItem $completed={t.completed}>
              <Checkbox
                type="checkbox"
                checked={t.completed}
                onChange={() => {
                  handleTodoStatusChange(t.value);
                }}
                aria-label="Завершить задачу"
              />
              <span>{t.value}</span>
            </TodoItem>
          </div>
        ))}
      </TodoItemsList>
      <button
        onClick={() => {
          setStatusToShow("all");
        }}
      >
        All
      </button>
      <button
        onClick={() => {
          setStatusToShow("active");
        }}
      >
        Active
      </button>
      <button
        onClick={() => {
          setStatusToShow("completed");
        }}
      >
        Completed
      </button>
    </AppWrapper>
  );
}

export default App;
