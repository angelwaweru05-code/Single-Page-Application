import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectCard from "../components/ProjectCard";

const project = {
  id: "test-project",
  title: "Test Project",
  category: "Digital",
  year: "2025",
  description: "A short description of the test project.",
  image: "",
  tags: ["Web design", "Research"],
};

describe("ProjectCard", () => {
  test("renders the project details", () => {
    render(<ProjectCard project={project} onDeleteProject={jest.fn()} />);

    expect(
      screen.getByRole("heading", { name: "Test Project" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Year: 2025")).toBeInTheDocument();
    expect(screen.getByText(project.description)).toBeInTheDocument();
    expect(screen.getByText("Web design")).toBeInTheDocument();
    expect(screen.getByText("Digital")).toBeInTheDocument();
  });

  test("shows initials when there is no image", () => {
    render(<ProjectCard project={project} onDeleteProject={jest.fn()} />);

    expect(screen.getByText("TP")).toBeInTheDocument();
  });

  test("calls onDeleteProject with the project ID", async () => {
    const user = userEvent.setup();
    const onDeleteProject = jest.fn();

    render(
      <ProjectCard project={project} onDeleteProject={onDeleteProject} />,
    );

    await user.click(
      screen.getByRole("button", { name: "Remove Test Project" }),
    );

    expect(onDeleteProject).toHaveBeenCalledWith("test-project");
  });
});
