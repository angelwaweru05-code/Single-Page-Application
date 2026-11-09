export default function ProjectCard({ project, onDeleteProject }) {
  return (
    <article className="project-card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <button
        type="button"
        className="project-card__delete"
        onClick={() => onDeleteProject(project.id)}
        aria-label={`Remove ${project.title}`}
      >
        Remove
      </button>
    </article>
  );
}
