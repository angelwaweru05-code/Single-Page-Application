import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { STORAGE_KEY } from "../data/projects";

beforeEach(() => {
  window.localStorage.clear();
});

describe("Personal showcase app", () => {
  test("renders the heading and the starter projects", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Software Engineering" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Project 1" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Project 2" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Project 3" }),
    ).toBeInTheDocument();
  });

  test("searches projects by title or description", async () => {
    const user = userEvent.setup();
    render(<App />);

    const search = screen.getByLabelText("Search projects");
    await user.type(search, "description of project 2");

    expect(
      screen.getByRole("heading", { name: "Project 2" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Project 1" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("1 project found");

    await user.clear(search);
    await user.type(search, "does-not-exist");

    expect(screen.getByText("No projects found.")).toBeInTheDocument();
  });

  test("adds a new project and saves it to localStorage", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("Title"), "New Project");
    await user.type(
      screen.getByLabelText("Description"),
      "This is a new project description.",
    );
    await user.click(screen.getByRole("button", { name: "Add Project" }));

    expect(
      screen.getByRole("heading", { name: "New Project" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("This is a new project description."),
    ).toBeInTheDocument();

    await waitFor(() => {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
      expect(stored[0].title).toBe("New Project");
      expect(stored[0].description).toBe(
        "This is a new project description.",
      );
    });
  });

  test("shows an error when the add form is empty", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Add Project" }));

    expect(
      screen.getByRole("alert"),
    ).toHaveTextContent("Please enter a project title and description.");
    expect(
      screen.getByRole("heading", { name: "Project 1" }),
    ).toBeInTheDocument();
  });

  test("removes a project from the list", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole("button", { name: "Remove Project 1" }),
    );

    expect(
      screen.queryByRole("heading", { name: "Project 1" }),
    ).not.toBeInTheDocument();
  });
});
