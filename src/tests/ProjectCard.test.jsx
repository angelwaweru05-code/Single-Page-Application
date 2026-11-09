import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectCard from "../components/ProjectCard";

const project = {
  id: "project-1",
  title: "Project 1",
  description: "This is the description of project 1.",
};

describe("ProjectCard", () => {
  test("renders the project title and description", () => {
    render(<ProjectCard project={project} onDeleteProject={jest.fn()} />);

    expect(
      screen.getByRole("heading", { name: "Project 1" }),
    ).toBeInTheDocument();
    expect(screen.getByText(project.description)).toBeInTheDocument();
  });

  test("calls onDeleteProject with the project ID", async () => {
    const user = userEvent.setup();
    const onDeleteProject = jest.fn();

    render(
      <ProjectCard project={project} onDeleteProject={onDeleteProject} />,
    );

    await user.click(
      screen.getByRole("button", { name: "Remove Project 1" }),
    );

    expect(onDeleteProject).toHaveBeenCalledWith("project-1");
  });
});
