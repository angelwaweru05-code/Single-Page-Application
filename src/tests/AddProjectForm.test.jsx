import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddProjectForm from "../components/AddProjectForm";

function renderForm() {
  const onAddProject = jest.fn();

  render(<AddProjectForm onAddProject={onAddProject} />);

  return { onAddProject };
}

describe("AddProjectForm", () => {
  test("renders the title, description and button", () => {
    renderForm();

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Technologies used")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Project" }),
    ).toBeInTheDocument();
  });

  test("shows an error and does not submit empty fields", async () => {
    const user = userEvent.setup();
    const { onAddProject } = renderForm();

    await user.click(screen.getByRole("button", { name: "Add Project" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please enter a project title and description.",
    );
    expect(onAddProject).not.toHaveBeenCalled();
  });

  test("submits trimmed project data and clears the fields", async () => {
    const user = userEvent.setup();
    const { onAddProject } = renderForm();

    const titleInput = screen.getByLabelText("Title");
    const descriptionInput = screen.getByLabelText("Description");
    const techInput = screen.getByLabelText("Technologies used");

    await user.type(titleInput, "  New Project  ");
    await user.type(descriptionInput, "  A short description.  ");
    await user.type(techInput, " React, CSS ");
    await user.click(screen.getByRole("button", { name: "Add Project" }));

    expect(onAddProject).toHaveBeenCalledWith({
      title: "New Project",
      description: "A short description.",
      tech: ["React", "CSS"],
    });
    expect(titleInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
    expect(techInput).toHaveValue("");
  });
});
