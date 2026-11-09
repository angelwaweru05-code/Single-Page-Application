import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { STORAGE_KEY } from "../data/projects";

beforeEach(() => {
  window.localStorage.clear();
});

describe("Project showcase", () => {
  test("renders the landing page and the seeded project list", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /my project showcase/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Aria Coffee Rebrand" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Northwind Banking App" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "FORM Design Festival" }),
    ).toBeInTheDocument();
  });

  test("filters projects by search term and shows an empty state", async () => {
    const user = userEvent.setup();
    render(<App />);

    const search = screen.getByLabelText("Search projects");
    await user.type(search, "packaging");

    expect(
      screen.getByRole("heading", { name: "Aria Coffee Rebrand" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Northwind Banking App" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("1 project");

    await user.clear(search);
    await user.type(search, "does-not-exist");

    expect(
      screen.getByRole("heading", {
        name: /no projects match that search/i,
      }),
    ).toBeInTheDocument();
  });

  test("filters projects by category chip", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Motion" }));

    expect(
      screen.getByRole("heading", { name: "Kinetic Type Studies" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Aria Coffee Rebrand" }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "All" }));
    expect(
      screen.getByRole("heading", { name: "Aria Coffee Rebrand" }),
    ).toBeInTheDocument();
  });

  test("adds a new project through the form and saves it locally", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole("button", { name: /^add project$/i }),
    );

    const dialog = screen.getByRole("dialog");
    expect(
      within(dialog).getByRole("heading", { name: "Add a project" }),
    ).toBeInTheDocument();

    await user.type(
      within(dialog).getByLabelText(/project title/i),
      "Neon Garden",
    );
    await user.type(
      within(dialog).getByLabelText(/^description$/i),
      "A living identity for a community garden in the city.",
    );
    await user.type(
      within(dialog).getByLabelText(/disciplines/i),
      "Identity, Digital",
    );
    await user.click(
      within(dialog).getByRole("button", { name: /add project/i }),
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    const newProject = screen
      .getByRole("heading", { name: "Neon Garden" })
      .closest("article");
    expect(newProject).not.toBeNull();
    expect(within(newProject).getByText("Identity")).toBeInTheDocument();

    await waitFor(() => {
      const stored = JSON.parse(
        window.localStorage.getItem(STORAGE_KEY),
      );
      expect(stored[0].title).toBe("Neon Garden");
      expect(stored[0].tags).toEqual(["Identity", "Digital"]);
    });
  });

  test("validates required fields before adding a project", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole("button", { name: /^add project$/i }),
    );
    const dialog = screen.getByRole("dialog");

    await user.click(
      within(dialog).getByRole("button", { name: /add project/i }),
    );

    expect(
      within(dialog).getByText("Give the project a title."),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByText("Add a short description of the work."),
    ).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("in-page navigation links point to the correct sections", () => {
    render(<App />);

    const navigation = screen.getByRole("navigation", {
      name: "Main navigation",
    });

    expect(within(navigation).getByRole("link", { name: "Work" })).toHaveAttribute(
      "href",
      "#work",
    );
    expect(
      within(navigation).getByRole("link", { name: "About" }),
    ).toHaveAttribute("href", "#studio");
    expect(
      within(navigation).getByRole("link", { name: "Contact" }),
    ).toHaveAttribute("href", "#contact");

    expect(document.querySelector("#work")).toBeInTheDocument();
    expect(document.querySelector("#studio")).toBeInTheDocument();
    expect(document.querySelector("#contact")).toBeInTheDocument();
  });

  test("removes a project from the list", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole("button", { name: "Remove Aria Coffee Rebrand" }),
    );

    expect(
      screen.queryByRole("heading", { name: "Aria Coffee Rebrand" }),
    ).not.toBeInTheDocument();
  });
});
