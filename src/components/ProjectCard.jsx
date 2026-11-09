import { useState } from "react";

export default function ProjectCard({ project, onDeleteProject }) {
  const [imageFailed, setImageFailed] = useState(false);
  const initials = project.title
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <article className="project-card">
      <div className="project-card__media">
        {project.image && !imageFailed ? (
          <img
            src={project.image}
            alt={`${project.title} project cover`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="project-card__monogram" aria-hidden="true">
            {initials}
          </span>
        )}
        <span className="project-card__category">{project.category}</span>
      </div>

      <div className="project-card__body">
        <p className="project-card__meta">Year: {project.year}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.tags?.length > 0 && (
          <ul className="tag-list" aria-label={`${project.title} tags`}>
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
        <button
          type="button"
          className="project-card__delete"
          onClick={() => onDeleteProject(project.id)}
          aria-label={`Remove ${project.title}`}
        >
          Remove
        </button>
      </div>
    </article>
  );
}
