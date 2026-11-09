import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects, onDeleteProject }) {
  if (projects.length === 0) {
    return (
      <div className="empty-state">
        <p>No projects found.</p>
      </div>
    );
  }

  return (
    <div className="project-list">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDeleteProject={onDeleteProject}
        />
      ))}
    </div>
  );
}
