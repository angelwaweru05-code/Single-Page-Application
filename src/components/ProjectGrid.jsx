import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects, onDeleteProject }) {
  if (projects.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state__mark" aria-hidden="true">
          ?
        </span>
        <h3>No projects match that search.</h3>
        <p>Try a different word or choose another category.</p>
      </div>
    );
  }

  return (
    <div className="project-grid">
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
