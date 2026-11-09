import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddProjectForm from "../components/AddProjectForm";

function renderForm() {
  const onAddProject = jest.fn();
  const onClose = jest.fn();

  render(
    <AddProjectForm
      categories={["Branding", "Digital"]}
      onAddProject={onAddProject}
      onClose={onClose}
    />,
  );

  return { onAddProject, onClose };
}

describe("AddProjectForm", () => {
  test("renders the form fields and category options", () => {
    renderForm();

    expect(screen.getByLabelText(/project title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cover image url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/disciplines/i)).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Digital" })).toBeInTheDocument();
  });

  test("shows validation errors and does not submit empty fields", async () => {
    const user = userEvent.setup();
    const { onAddProject } = renderForm();

    await user.click(screen.getByRole("button", { name: "Add Project" }));

    expect(screen.getByText("Give the project a title.")).toBeInTheDocument();
    expect(
      screen.getByText("Add a short description of the work."),
    ).toBeInTheDocument();
    expect(onAddProject).not.toHaveBeenCalled();
  });

  test("submits cleaned project data", async () => {
    const user = userEvent.setup();
    const { onAddProject } = renderForm();

    await user.type(screen.getByLabelText(/project title/i), "  New Website  ");
    await user.selectOptions(screen.getByLabelText(/category/i), "Digital");
    await user.clear(screen.getByLabelText(/year/i));
    await user.type(screen.getByLabelText(/year/i), "2025");
    await user.type(
      screen.getByLabelText(/description/i),
      "  A simple website project.  ",
    );
    await user.type(
      screen.getByLabelText(/disciplines/i),
      "Web design, Development",
    );

    await user.click(screen.getByRole("button", { name: "Add Project" }));

    expect(onAddProject).toHaveBeenCalledWith({
      title: "New Website",
      category: "Digital",
      year: "2025",
      description: "A simple website project.",
      image: "",
      tags: ["Web design", "Development"],
    });
  });

  test("calls onClose when the cancel button is clicked", async () => {
    const user = userEvent.setup();
    const { onClose } = renderForm();

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onClose).toHaveBeenCalled();
  });

  test("calls onClose when Escape is pressed", async () => {
    const user = userEvent.setup();
    const { onClose } = renderForm();

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalled();
  });
});
