import { useState } from "react";
import styled from "styled-components";

const AppWrapper = styled.main`
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
  width: 48rem;
  height: 4.8rem;
  font-size: 2rem;
  font-family: inherit;
  padding: 0 4.8rem;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  box-shadow: inset 0 -0.4rem 0.8rem -0.5rem rgb(0 0 0 / 10%);
  line-height: 1;
  transition: 180ms border ease-in-out;

  &::placeholder {
    color: #bdbdbd;
    font-style: italic;
  }

  &:focus-visible {
    border-color: #9e9e9e;

    /* Windows High Contrast Mode */
    outline: 3px solid transparent;
  }
`;

const TodoItemsList = styled.ul`
  list-style: none;
  width: 48rem;
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
  border: 1px solid #e0e0e0;
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
  border: 1px solid #e0e0e0;
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

  &:focus-visible {
    outline: 1px solid #e0e0e0;
    outline-offset: 2px;
  }

  &:checked:focus-visible {
    outline-color: #4caf50;
  }
`;

const MenuBar = styled.div`
  background-color: #f5f5f5;
  width: 48rem;
  height: 4.8rem;
  border: 1px solid #e0e0e0;
  border-top: none;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 1.2rem;
  font-size: 1.2rem;
  line-height: 1;
  color: #757575;
`;

const TextButton = styled.button`
  max-width: max-content;
  display: grid;
  place-content: center;
  padding: 0.4rem 0.8rem;
  background: transparent;
  border: none;
  border-radius: 0.2rem;
  outline: none;
  color: inherit;
  font-size: inherit;
  transition: 150ms opacity ease-in-out;

  &:hover {
    opacity: 0.7;
  }

  &:focus-visible {
    outline: 1px solid #bdbdbd;
    outline-offset: 2px;
  }
`;

const FilterButton = styled(TextButton)<{ $enabled?: boolean }>`
  border: ${(props) => (props.$enabled ? "1px solid #FFCDD2" : "none")};
`;

const FilterButtons = styled.div`
  justify-self: center;
  display: flex;
  align-items: center;
  column-gap: 0.8rem;
`;

const CompleteTodosButtonWrapper = styled.div`
  justify-self: end;
`;

function App() {
  const [todos, setTodos] = useState<{ value: string; completed: boolean }[]>([
    { value: "Go shopping", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [statusToShow, setStatusToShow] = useState<
    "all" | "active" | "completed"
  >("all");

  // We need to calculate it always because it is used for statistics
  const activeTodos = todos.filter((t) => !t.completed);

  const completedTodos =
    statusToShow === "all" || statusToShow === "completed"
      ? todos.filter((t) => t.completed)
      : [];

  const todosToShow =
    statusToShow === "completed"
      ? completedTodos
      : activeTodos.concat(completedTodos);

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

  function clearCompletedTodos() {
    setTodos(todos.filter((t) => !t.completed));
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
      <MenuBar>
        <span>
          {activeTodos.length === 1 // for `0` it should also be "items"
            ? "1 item"
            : `${activeTodos.length.toString()} items`}{" "}
          left
        </span>
        <FilterButtons>
          <FilterButton
            $enabled={statusToShow === "all"}
            onClick={() => {
              setStatusToShow("all");
            }}
          >
            All
          </FilterButton>
          <FilterButton
            $enabled={statusToShow === "active"}
            onClick={() => {
              setStatusToShow("active");
            }}
          >
            Active
          </FilterButton>
          <FilterButton
            $enabled={statusToShow === "completed"}
            onClick={() => {
              setStatusToShow("completed");
            }}
          >
            Completed
          </FilterButton>
        </FilterButtons>
        <CompleteTodosButtonWrapper>
          <TextButton
            onClick={() => {
              clearCompletedTodos();
            }}
          >
            Clear completed
          </TextButton>
        </CompleteTodosButtonWrapper>
      </MenuBar>
    </AppWrapper>
  );
}

export default App;
