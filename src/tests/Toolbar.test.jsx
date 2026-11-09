import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toolbar from "../components/Toolbar";

function renderToolbar(overrides = {}) {
  const props = {
    query: "",
    onQueryChange: jest.fn(),
    categories: ["All", "Branding", "Digital"],
    activeCategory: "All",
    onCategoryChange: jest.fn(),
    resultCount: 6,
    ...overrides,
  };

  render(<Toolbar {...props} />);
  return props;
}

describe("Toolbar", () => {
  test("renders the search box, filters, and result count", () => {
    renderToolbar();

    expect(screen.getByLabelText("Search projects")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Branding" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("6 projects");
  });

  test("calls onQueryChange when the user types", async () => {
    const user = userEvent.setup();
    const props = renderToolbar();

    await user.type(screen.getByLabelText("Search projects"), "x");

    expect(props.onQueryChange).toHaveBeenLastCalledWith("x");
  });

  test("clears the search when the clear button is clicked", async () => {
    const user = userEvent.setup();
    const props = renderToolbar({ query: "coffee" });

    await user.click(screen.getByRole("button", { name: "Clear search" }));

    expect(props.onQueryChange).toHaveBeenCalledWith("");
  });

  test("calls onCategoryChange when a category is clicked", async () => {
    const user = userEvent.setup();
    const props = renderToolbar();

    await user.click(screen.getByRole("button", { name: "Digital" }));

    expect(props.onCategoryChange).toHaveBeenCalledWith("Digital");
  });

  test("marks the active category as pressed", () => {
    renderToolbar({ activeCategory: "Branding" });

    expect(screen.getByRole("button", { name: "Branding" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });
});
