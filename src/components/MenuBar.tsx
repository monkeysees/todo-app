import styled from "styled-components";
import TextButton from "./TextButton";
import Todo, { StatusFilter } from "../models/Todo";

const MenuBarWrapper = styled.div<{ $width: string }>`
  width: ${(props) => props.$width};
  height: 4.8rem;
  background-color: #f5f5f5;
  color: #757575;
  border: 1px solid #e0e0e0;
  border-top: none;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 1.2rem;
  font-size: 1.2rem;
  line-height: 1;
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

export default function MenuBar({
  width,
  activeTodos,
  statusFilter,
  newStatusFilterHandler,
  completedTodosHandler,
}: {
  width: string;
  activeTodos: Todo[];
  statusFilter: StatusFilter;
  newStatusFilterHandler: (s: StatusFilter) => void;
  completedTodosHandler: () => void;
}) {
  return (
    <MenuBarWrapper $width={width}>
      <span>
        {activeTodos.length === 1 // for `0` it should also be "items"
          ? "1 item"
          : `${activeTodos.length.toString()} items`}{" "}
        left
      </span>
      <FilterButtons>
        <FilterButton
          $enabled={statusFilter === "all"}
          onClick={() => {
            newStatusFilterHandler("all");
          }}
        >
          All
        </FilterButton>
        <FilterButton
          $enabled={statusFilter === "active"}
          onClick={() => {
            newStatusFilterHandler("active");
          }}
        >
          Active
        </FilterButton>
        <FilterButton
          $enabled={statusFilter === "completed"}
          onClick={() => {
            newStatusFilterHandler("completed");
          }}
        >
          Completed
        </FilterButton>
      </FilterButtons>
      <CompleteTodosButtonWrapper>
        <TextButton
          onClick={() => {
            completedTodosHandler();
          }}
        >
          Clear completed
        </TextButton>
      </CompleteTodosButtonWrapper>
    </MenuBarWrapper>
  );
}
