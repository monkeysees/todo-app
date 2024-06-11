import { useState } from "react";
import styled from "styled-components";
import Todo, { StatusFilter } from "./models/Todo";
import Input from "./components/Input";
import TodoList from "./components/TodoList";
import MenuBar from "./components/MenuBar";

const AppWrapper = styled.main`
  display: grid;
  place-items: start center;
  padding-top: 3.2rem;
`;

const AppTitle = styled.h1`
  font-size: 4.8rem;
  line-height: 1;
  margin: 0 0 1.6rem;
`;

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  // We need to calculate it always because it is used for statistics
  const activeTodos = todos.filter((t) => !t.isCompleted);

  const completedTodos =
    statusFilter === "all" || statusFilter === "completed"
      ? todos.filter((t) => t.isCompleted)
      : [];

  const todosToShow =
    statusFilter === "completed"
      ? completedTodos
      : activeTodos.concat(completedTodos);

  function handleNewTodoCreation(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    const todoToSave = newTodo.trim();

    if (!todoToSave) return;

    setTodos([{ value: todoToSave, isCompleted: false }, ...todos]);
    setNewTodo("");
  }

  function handleTodoStatusChange(todo: string) {
    setTodos(
      todos.map((t) =>
        t.value === todo ? { ...t, isCompleted: !t.isCompleted } : t,
      ),
    );
  }

  function handleCompletedTodos() {
    setTodos(todos.filter((t) => !t.isCompleted));
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
        placeholder="What needs to be done?"
        aria-label="New todo"
        aria-placeholder="Go shopping"
      />
      <TodoList
        todos={todosToShow}
        statusChangeHandler={handleTodoStatusChange}
        statusFilter={statusFilter}
      />
      <MenuBar
        activeTodos={activeTodos}
        statusFilter={statusFilter}
        newStatusFilterHandler={setStatusFilter}
        completedTodosHandler={handleCompletedTodos}
      ></MenuBar>
    </AppWrapper>
  );
}
