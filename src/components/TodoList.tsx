import styled from "styled-components";
import Todo, { StatusFilter } from "../models/Todo";
import Checkbox from "./Checkbox";

const TodoItemsList = styled.ul<{ $width: string }>`
  list-style: none;
  width: ${(props) => props.$width};
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

export default function TodoList({
  todos,
  statusChangeHandler,
  width,
}: {
  todos: Todo[];
  statusChangeHandler: (todo: string) => void;
  statusFilter: StatusFilter;
  width: string;
}) {
  // Styling a list with list-style: none; in CSS removes the list semantics.
  // Hence, list roles are added manually.
  return (
    <TodoItemsList $width={width} role="list">
      {todos.map((t) => (
        <TodoItem $completed={t.isCompleted} role="listitem" key={t.value}>
          <Checkbox
            type="checkbox"
            checked={t.isCompleted}
            onChange={() => {
              statusChangeHandler(t.value);
            }}
            aria-label="Завершить задачу"
          />
          <span>{t.value}</span>
        </TodoItem>
      ))}
    </TodoItemsList>
  );
}
