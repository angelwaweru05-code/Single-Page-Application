import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../components/SearchBar";

function renderSearchBar(overrides = {}) {
  const props = {
    query: "",
    onQueryChange: jest.fn(),
    resultCount: 3,
    ...overrides,
  };

  render(<SearchBar {...props} />);
  return props;
}

describe("SearchBar", () => {
  test("renders the search input and result count", () => {
    renderSearchBar();

    expect(screen.getByLabelText("Search projects")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("3 projects found");
  });

  test("calls onQueryChange when the user types", async () => {
    const user = userEvent.setup();
    const props = renderSearchBar();

    await user.type(screen.getByLabelText("Search projects"), "x");

    expect(props.onQueryChange).toHaveBeenLastCalledWith("x");
  });

  test("clears the search when the clear button is clicked", async () => {
    const user = userEvent.setup();
    const props = renderSearchBar({ query: "project" });

    await user.click(screen.getByRole("button", { name: "Clear search" }));

    expect(props.onQueryChange).toHaveBeenCalledWith("");
  });

  test("uses singular text for one result", () => {
    renderSearchBar({ resultCount: 1 });

    expect(screen.getByRole("status")).toHaveTextContent("1 project found");
  });
});
