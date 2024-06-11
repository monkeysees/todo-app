interface Todo {
  value: string;
  isCompleted: boolean;
}

type StatusFilter = "all" | "active" | "completed";

export default Todo;
export type { StatusFilter };
