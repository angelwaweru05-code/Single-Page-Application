import { useEffect, useRef, useState } from "react";

function createEmptyForm(categories) {
  return {
    title: "",
    category: categories[0],
    year: String(new Date().getFullYear()),
    description: "",
    image: "",
    tags: "",
  };
}

export default function AddProjectForm({ categories, onAddProject, onClose }) {
  const [form, setForm] = useState(() => createEmptyForm(categories));
  const [errors, setErrors] = useState({});
  const titleRef = useRef(null);

  // Focus the first field, close on Escape, and stop the page behind
  // the modal from scrolling while the form is open.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    titleRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  function updateField(field) {
    return (event) => {
      const { value } = event.target;
      setForm((current) => ({ ...current, [field]: value }));
      setErrors((current) => {
        if (!current[field]) return current;
        const next = { ...current };
        delete next[field];
        return next;
      });
    };
  }

  // Validate the form before creating the project object. The form only
  // closes when there are no validation errors.
  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    const title = form.title.trim();
    const description = form.description.trim();

    if (!title) nextErrors.title = "Give the project a title.";
    if (!description) {
      nextErrors.description = "Add a short description of the work.";
    }
    if (form.year && !/^\d{4}$/.test(form.year.trim())) {
      nextErrors.year = "Use a four-digit year, like 2025.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onAddProject({
      title,
      category: form.category,
      year: form.year.trim() || String(new Date().getFullYear()),
      description,
      image: form.image.trim(),
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-project-title"
      >
        <div className="modal__header">
          <div>
            <p className="eyebrow">New Project</p>
            <h2 id="add-project-title">Add a project</h2>
          </div>
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            aria-label="Close form"
          >
            ×
          </button>
        </div>

        <form className="project-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field form-field--wide">
            <label htmlFor="project-title">Project title</label>
            <input
              ref={titleRef}
              id="project-title"
              name="title"
              type="text"
              value={form.title}
              onChange={updateField("title")}
              placeholder="e.g. Aria Coffee Rebrand"
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? "title-error" : undefined}
            />
            {errors.title && (
              <p className="form-error" id="title-error">
                {errors.title}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="project-category">Category</label>
            <select
              id="project-category"
              name="category"
              value={form.category}
              onChange={updateField("category")}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="project-year">Year</label>
            <input
              id="project-year"
              name="year"
              type="text"
              inputMode="numeric"
              value={form.year}
              onChange={updateField("year")}
              aria-invalid={Boolean(errors.year)}
              aria-describedby={errors.year ? "year-error" : undefined}
            />
            {errors.year && (
              <p className="form-error" id="year-error">
                {errors.year}
              </p>
            )}
          </div>

          <div className="form-field form-field--wide">
            <label htmlFor="project-description">Description</label>
            <textarea
              id="project-description"
              name="description"
              rows="3"
              value={form.description}
              onChange={updateField("description")}
              placeholder="What did you make, and why does it matter?"
              aria-invalid={Boolean(errors.description)}
              aria-describedby={
                errors.description ? "description-error" : undefined
              }
            />
            {errors.description && (
              <p className="form-error" id="description-error">
                {errors.description}
              </p>
            )}
          </div>

          <div className="form-field form-field--wide">
            <label htmlFor="project-image">Cover image URL (optional)</label>
            <input
              id="project-image"
              name="image"
              type="url"
              value={form.image}
              onChange={updateField("image")}
              placeholder="https://images.example.com/project.jpg"
            />
            <p className="form-hint">
              Leave empty and the card will use a generated type cover.
            </p>
          </div>

          <div className="form-field form-field--wide">
            <label htmlFor="project-tags">Disciplines (optional)</label>
            <input
              id="project-tags"
              name="tags"
              type="text"
              value={form.tags}
              onChange={updateField("tags")}
              placeholder="Identity, Packaging, Art direction"
            />
            <p className="form-hint">Separate each discipline with a comma.</p>
          </div>

          <div className="modal__actions">
            <button
              type="button"
              className="button button--ghost"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="button button--dark">
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
