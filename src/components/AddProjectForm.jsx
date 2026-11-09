import { useState } from "react";

export default function AddProjectForm({ onAddProject }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    // The project needs both a title and a description.
    if (!cleanTitle || !cleanDescription) {
      setError("Please enter a project title and description.");
      return;
    }

    const cleanTech = tech
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    onAddProject({
      title: cleanTitle,
      description: cleanDescription,
      tech: cleanTech,
    });

    setTitle("");
    setDescription("");
    setTech("");
    setError("");
  }

  return (
    <form className="project-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="project-title">Title</label>
        <input
          id="project-title"
          name="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter project title"
        />
      </div>

      <div className="form-field">
        <label htmlFor="project-description">Description</label>
        <textarea
          id="project-description"
          name="description"
          rows="3"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter project description"
        />
      </div>

      <div className="form-field">
        <label htmlFor="project-tech">Technologies used</label>
        <input
          id="project-tech"
          name="tech"
          type="text"
          value={tech}
          onChange={(event) => setTech(event.target.value)}
          placeholder="e.g. React, JavaScript, CSS"
        />
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="button">
        Add Project
      </button>
    </form>
  );
}
