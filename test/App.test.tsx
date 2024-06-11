/// <reference types="vitest" />
import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import App from "../src/App";

function setup() {
  return {
    user: userEvent.setup(),
    ...render(<App />),
    input: screen.getByPlaceholderText("What needs to be done?"),
    todoItems: screen.findAllByRole("listitem"),
  };
}

function retrieveTodoItems() {
  return screen.queryAllByRole("listitem");
}

async function createTodos(
  user: UserEvent,
  input: HTMLElement,
  amount: number,
) {
  for (let i = 1; i <= amount; i++) {
    await user.type(input, `New todo #${i.toString()}`);
    await user.keyboard("{Enter}");
  }
}

describe("App's new todo input", () => {
  it("is shown", () => {
    const { input } = setup();

    expect(input).toBeInTheDocument();
  });

  it("saves what user types", async () => {
    const { user, input } = setup();

    await user.type(input, "New task");
    expect(input).toHaveValue("New task");
  });

  it("is empty after user creates a todo", async () => {
    const { user, input } = setup();

    await createTodos(user, input, 1);
    expect(input).toHaveValue("");
  });

  it("creates a todo when todo list is empty", async () => {
    const { user, input } = setup();

    await createTodos(user, input, 1);
    expect(retrieveTodoItems().length).toEqual(1);
  });

  it("creates a todo when todo list is not empty", async () => {
    const { user, input } = setup();

    await createTodos(user, input, 2);
    expect(retrieveTodoItems().length).toEqual(2);
  });

  it("creates a todo without surrounding whitespace", async () => {
    const { user, input } = setup();

    await user.type(input, "  New task ");
    await user.keyboard("{Enter}");
    expect(retrieveTodoItems()[0]).toHaveTextContent("New task");
  });

  it("does not create a todo with empty content", async () => {
    const { user, input } = setup();

    await user.click(input);
    await user.keyboard("{Enter}");
    expect(retrieveTodoItems().length).toEqual(0);
  });

  it("does not create a todo with only whitespace", async () => {
    const { user, input } = setup();

    await user.type(input, "  ");
    await user.keyboard("{Enter}");
    expect(retrieveTodoItems().length).toEqual(0);
  });

  it("creates a todo when retrying after refusal", async () => {
    const { user, input } = setup();

    await user.type(input, "  ");
    await user.keyboard("{Enter}");
    await user.type(input, "New task");
    await user.keyboard("{Enter}");
    expect(retrieveTodoItems().length).toEqual(1);
  });
});

describe("App's statistic", () => {
  it("is there for zero todos", () => {
    setup();
    expect(screen.getByText(/item[s]? left/)).toHaveTextContent("0 items left");
  });

  it("is there for a one todo", async () => {
    const { user, input } = setup();

    await createTodos(user, input, 1);
    expect(screen.getByText(/item[s]? left/)).toHaveTextContent("1 item left");
  });

  it("is there for more than one todo", async () => {
    const { user, input } = setup();

    await createTodos(user, input, 5);
    expect(screen.getByText(/item[s]? left/)).toHaveTextContent("5 items left");
  });
});

describe("App's todos", () => {
  it("can be completed", async () => {
    const { user, input } = setup();

    await createTodos(user, input, 5);
    const todoToggles = screen.getAllByRole("checkbox");
    expect(todoToggles.length).toEqual(5);

    await user.click(todoToggles[0]);
    await user.click(todoToggles[3]);

    const completedTodosFilterButton = screen.getByRole("button", {
      name: /^completed$/i,
    });
    await user.click(completedTodosFilterButton);
    const shownTodos = screen.queryAllByRole("listitem");
    expect(shownTodos.length).toEqual(2);
  });

  it("can be filtered by their completion status", async () => {
    const { user, input } = setup();

    await createTodos(user, input, 5);
    const todoToggles = screen.getAllByRole("checkbox");
    expect(todoToggles.length).toEqual(5);

    await user.click(todoToggles[0]);
    await user.click(todoToggles[3]);

    const activeTodosFilterButton = screen.getByRole("button", {
      name: /^active$/i,
    });
    await user.click(activeTodosFilterButton);
    let shownTodos = screen.queryAllByRole("listitem");
    expect(shownTodos.length).toEqual(3);

    const completedTodosFilterButton = screen.getByRole("button", {
      name: /^completed$/i,
    });
    await user.click(completedTodosFilterButton);
    shownTodos = screen.queryAllByRole("listitem");
    expect(shownTodos.length).toEqual(2);
  });

  it("can be shown all at once, regardless of a completion status", async () => {
    const { user, input } = setup();

    await createTodos(user, input, 5);
    const todoToggles = screen.getAllByRole("checkbox");
    expect(todoToggles.length).toEqual(5);

    await user.click(todoToggles[0]);
    await user.click(todoToggles[3]);

    const activeTodosFilterButton = screen.getByRole("button", {
      name: /^all$/i,
    });
    await user.click(activeTodosFilterButton);
    const shownTodos = screen.queryAllByRole("listitem");
    expect(shownTodos.length).toEqual(5);
  });

  it("can be cleared of all completed when active todos are still present", async () => {
    const { user, input } = setup();

    await createTodos(user, input, 5);
    const todoToggles = screen.getAllByRole("checkbox");
    expect(todoToggles.length).toEqual(5);

    await user.click(todoToggles[0]);
    await user.click(todoToggles[3]);

    const clearCompletedButton = screen.getByRole("button", {
      name: /^clear completed$/i,
    });
    await user.click(clearCompletedButton);

    const allTodosFilterButton = screen.getByRole("button", {
      name: /^all$/i,
    });
    await user.click(allTodosFilterButton);
    let shownTodos = screen.queryAllByRole("listitem");
    expect(shownTodos.length).toEqual(3);

    const completedTodosFilterButton = screen.getByRole("button", {
      name: /^completed$/i,
    });
    await user.click(completedTodosFilterButton);
    shownTodos = screen.queryAllByRole("listitem");
    expect(shownTodos.length).toEqual(0);
  });

  it("can be cleared of all completed when no active todos are present", async () => {
    const { user, input } = setup();

    await createTodos(user, input, 5);
    const todoToggles = screen.getAllByRole("checkbox");
    expect(todoToggles.length).toEqual(5);

    await user.click(todoToggles[0]);
    await user.click(todoToggles[1]);
    await user.click(todoToggles[2]);
    await user.click(todoToggles[3]);
    await user.click(todoToggles[4]);

    const clearCompletedButton = screen.getByRole("button", {
      name: /^clear completed$/i,
    });
    await user.click(clearCompletedButton);

    const allTodosFilterButton = screen.getByRole("button", {
      name: /^all$/i,
    });
    await user.click(allTodosFilterButton);
    const shownTodos = screen.queryAllByRole("listitem");
    expect(shownTodos.length).toEqual(0);
  });
});

describe("App's filter buttons", () => {
  it("show which one is active", async () => {
    const { user } = setup();

    const allTodosFilterButton = screen.getByRole("button", {
      name: /^all$/i,
      current: true,
    });
    expect(allTodosFilterButton).toBeInTheDocument();

    const completedTodosFilterButton = screen.getByRole("button", {
      name: /^completed$/i,
    });
    await user.click(completedTodosFilterButton);
    const currentFilterButton = screen.getByRole("button", {
      current: true,
    });
    expect(currentFilterButton).toHaveTextContent(/completed/i);
  });
});
