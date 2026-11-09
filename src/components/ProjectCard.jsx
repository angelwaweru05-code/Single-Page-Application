export default function ProjectCard({ project, onDeleteProject }) {
  return (
    <article className="project-card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      {project.tech?.length > 0 && (
        <div className="project-card__tech">
          <span className="project-card__tech-label">Built with:</span>
          <ul
            className="tech-list"
            aria-label={`${project.title} technologies`}
          >
            {project.tech.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
      )}
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
